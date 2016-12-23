import { Injectable } from '@angular/core';

import {
  Http,
  Response,
  Headers,
  Request,
  RequestMethod,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

import {
  UserData,
  AuthData,
  Card,
  StripeData,
  UserType,
  StripeTokenOptions
} from './stripe-model';

export * from './stripe-model';

@Injectable()
export class CustomeStripeService {

  get currentUserData(): UserData {
    return this._currentUserData;
  }

  get currentAuthData(): AuthData {
    return this._currentAuthData;
  }

  private _options: StripeTokenOptions;
  private _currentAuthData: AuthData;
  private _currentUserData: UserData;
  private _currentUserType: UserType;

  constructor(private _http: Http) { }

  submitPayments(stripeData: StripeData): Observable<Response> {
      let body = JSON.stringify({
         token : stripeData.token,
         amount: stripeData.amount,
         card_brand: stripeData.card_brand,
         card_last4: stripeData.card_last4,
         card_exp_month: stripeData.card_exp_month,
         card_exp_year: stripeData.card_exp_year
      })

  return  this.post(this._constructUserPath() + this._options.stripeChargePath, body);
  }

  userSignedIn(): boolean {
    return !!this._currentAuthData;
  }

  init(options: StripeTokenOptions) {
    let defaultOptions: StripeTokenOptions = {

      apiPath: null,

      signInPath: 'auth/sign_in',
      stripeChargePath: null,

      validateTokenPath: 'auth/validate_token',

      signInStoredUrlStorageKey: null,
      signOutFailedValidate: false,
      signOutPath: 'auth/sign_out',

      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    };

    this._options = (<any>Object).assign(defaultOptions, options);
    this._tryLoadAuthData();
  }

  // Sign out request and delete storage
  signOut(): Observable<Response> {
    let observ = this.delete(this._constructUserPath() + this._options.signOutPath);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('uid');

    this._currentAuthData = null;
    this._currentUserType = null;
    this._currentUserData = null;

    return observ;
  }

  // Try to load user config from storage
  private _tryLoadAuthData() {



    this._getAuthDataFromStorage();


    if (this._currentAuthData != null)
      this.validateToken();
  }


  // Validate token request
  validateToken(): Observable<Response> {
    let observ = this.get(this._constructUserPath() + this._options.validateTokenPath);

    observ.subscribe(
      res => this._currentUserData = res.json().data,
      error => {
        if (error.status === 401 && this._options.signOutFailedValidate) {
          this.signOut();
        }
      });

    return observ;
  }

  // Try to get auth data from storage.
  private _getAuthDataFromStorage() {

    let authData: AuthData = {
      accessToken: localStorage.getItem('accessToken'),
      client: localStorage.getItem('client'),
      expiry: localStorage.getItem('expiry'),
      tokenType: localStorage.getItem('tokenType'),
      uid: localStorage.getItem('uid')
    };

    if (this._checkIfComplete(authData))
      this._currentAuthData = authData;
  }

  // Check if auth data complete
  private _checkIfComplete(authData: AuthData): boolean {
    if (
      authData.accessToken != null &&
      authData.client != null &&
      authData.expiry != null &&
      authData.tokenType != null &&
      authData.uid != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  private _constructUserPath(): string {
    if (this._currentUserType == null)
      return '';
    else
      return this._currentUserType.path + '/';
  }

  private _constructApiPath(): string {
    if (this._options.apiPath == null)
      return '';
    else
      return this._options.apiPath + '/';
  }

  // Standard HTTP requests
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(this._mergeRequestOptionsArgs({
      url: this._constructApiPath() + url,
      method: RequestMethod.Get
    }, options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(this._mergeRequestOptionsArgs({
      url: this._constructApiPath() + url,
      method: RequestMethod.Post,
      body: body
    }, options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(this._mergeRequestOptionsArgs({
      url: this._constructApiPath() + url,
      method: RequestMethod.Put,
      body: body
    }, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(this._mergeRequestOptionsArgs({
      url: this._constructApiPath() + url,
      method: RequestMethod.Delete
    }, options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(this._mergeRequestOptionsArgs({
      url: this._constructApiPath() + url,
      method: RequestMethod.Patch,
      body: body
    }, options));
  }

  head(path: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request({
      method: RequestMethod.Head,
      url: this._constructApiPath() + path
    });
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(this._mergeRequestOptionsArgs({
      url: this._constructApiPath() + url,
      method: RequestMethod.Options
    }, options));
  }

  // Construct and send Http request
  request(options: RequestOptionsArgs): Observable<Response> {

    let baseRequestOptions: RequestOptions;
    let baseHeaders: { [key: string]: string; } = this._options.globalOptions.headers;

    // Merge auth headers to request if set
    if (this._currentAuthData != null) {
      (<any>Object).assign(baseHeaders, {
        'access-token': this._currentAuthData.accessToken,
        'client': this._currentAuthData.client,
        'expiry': this._currentAuthData.expiry,
        'token-type': this._currentAuthData.tokenType,
        'uid': this._currentAuthData.uid
      });
    }

    baseRequestOptions = new RequestOptions({
      headers: new Headers(baseHeaders)
    });

    // Merge standard and custom RequestOptions
    baseRequestOptions = baseRequestOptions.merge(options);

    let response = this._http.request(new Request(baseRequestOptions)).share();

    this._handleResponse(response);

    return response;
  }

  private _mergeRequestOptionsArgs(options: RequestOptionsArgs, addOptions?: RequestOptionsArgs): RequestOptionsArgs {

    let returnOptions: RequestOptionsArgs = options;

    if (options)
      (<any>Object).assign(returnOptions, addOptions);

    return returnOptions;
  }

  // Check if response is complete and newer, then update storage
  private _handleResponse(response: Observable<Response>) {
    response.subscribe(res => {
      this._parseAuthHeadersFromResponse(<any>res);
    }, error => {
      this._parseAuthHeadersFromResponse(<any>error);
    });
  }

  private _parseAuthHeadersFromResponse(data: any) {
    let headers = data.headers;

    let authData: AuthData = {
      accessToken: headers.get('access-token'),
      client: headers.get('client'),
      expiry: headers.get('expiry'),
      tokenType: headers.get('token-type'),
      uid: headers.get('uid')
    };

    this._setAuthData(authData);
  }

  // Write auth data to storage
  private _setAuthData(authData: AuthData) {

    if (this._checkIfComplete(authData) && this._checkIfNewer(authData)) {

      this._currentAuthData = authData;

      localStorage.setItem('accessToken', authData.accessToken);
      localStorage.setItem('client', authData.client);
      localStorage.setItem('expiry', authData.expiry);
      localStorage.setItem('tokenType', authData.tokenType);
      localStorage.setItem('uid', authData.uid);

      if (this._currentUserType != null)
        localStorage.setItem('userType', this._currentUserType.name);

    }
  }

  // Check if response token is newer
  private _checkIfNewer(authData: AuthData): boolean {
    if (this._currentAuthData != null)
      return authData.expiry >= this._currentAuthData.expiry;
    else
      return true;
  }

  
}
