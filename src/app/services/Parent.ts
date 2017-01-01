import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { stripTrailingSlash } from './utils';

// Need to import interfaces dependencies
// Bug TypeScript https://github.com/Microsoft/TypeScript/issues/5938
import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { Response } from '@angular/http/src/static_response';

//import { WpApiAppConfig } from './wp-api-angular';

export interface WpApiAppConfig {
  baseUrl: string;
  namespace?: string;
}

export interface IParent {
  httpGet(url: string, options?: RequestOptionsArgs): Observable<Response>;
  httpHead(url: string, options?: RequestOptionsArgs): Observable<Response>;
  httpDelete(url: string, options?: RequestOptionsArgs): Observable<Response>;
  httpPost(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
  httpPut(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
  httpPatch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;

}

@Injectable()
export class WpApiParent implements IParent {

  private _config: WpApiAppConfig
  constructor(
    
    public http: Http
  ) { 

   
  }

  init(config: WpApiAppConfig){
      let configdefault: WpApiAppConfig = {
        baseUrl: "https://whitethroneministries.com/wp-json/",
        namespace: '/wp/v2'

      };
      
      this._config = (<any>Object).assign(configdefault, config);
      this._config.baseUrl = stripTrailingSlash(this._config.baseUrl);
  }

  getFullUrl(postfix: string): string {
    return `${this._config.baseUrl}${this._config.namespace}${postfix}`;
  }
  httpGet(url: string, options = {}) {
    return this.http.get(this.getFullUrl(url), options);
  }
  httpHead(url: string, options = {}) {
    return this.http.head(this.getFullUrl(url), options);
  }
  httpDelete(url: string, options = {}) {
    return this.http.delete(this.getFullUrl(url), options);
  }
  httpPost(url: string, body = {}, options = {}) {
    return this.http.post(this.getFullUrl(url), body, options);
  }
  httpPut(url: string, body = {}, options = {}) {
    return this.http.put(this.getFullUrl(url), body, options);
  }
  httpPatch(url: string, body = {}, options = {}) {
    return this.http.patch(this.getFullUrl(url), body, options);
  }
}
