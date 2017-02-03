import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WpApiPosts, WpApiTerms } from '../../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { ClientService } from '../../../services/client/client.service';
import { SeriesService } from '../../../services/series/series.service';
import * as _ from "lodash";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnChanges, OnInit {

  private stepSize: any;
  private rtl: number;
  private trackingName: any;
  private posts: any
  private hideButtons: boolean;
  private current: any
  private replace: boolean;
  private isTouchDevice_: boolean;
  private default: any
  private currentItemOffset: any
  private xTransform: any
  private maxTransform: any;
  private itemsCount: any;
  private itemNext: boolean = true;
  private itemsElements: any;
  private mouseIn: boolean = false;
  private mouse(mouseIn: boolean) {
    this.mouseIn = mouseIn;
  }


  @HostListener('mouseenter') onMouseenter() {
    this.mouse(true);
  }


  @HostListener('mouseleave') onMouseLeave() {
    this.mouse(false);
  }

  @Input() slug: any

  @Input() post: any

  @ViewChild('itemlist') itemlist: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  applyPagination() {
    this.currentItemOffset = 0;
    var elem = this.getItemsElements(!1).length;
    var c = this.sumItemsWidth_(0, elem);
    this.element = this.carousel;
    var cal = this.element.nativeElement.offsetWidth;
    this.itemsCount = elem;
    console.log(this.itemsCount);
    this.maxTransform = Math.max(c, 0);
    this.applyTransform_();


  }

  calcNewItemOffset_(b) {
    var c = this.currentItemOffset;
    (this.isBelowMaxTransform()) && (c = Math.min(Math.max(c + this.stepSize * b, 0), this.itemsCount - 1));
    return c;
  }

  isBelowMaxTransform() {
    return Math.abs(this.xTransform) < this.maxTransform
  }

  getItemsElements(elem) {
    if (this.itemlist) {
      var items = this.itemsElements;

      items && !0 !== elem || (items = this.itemsElements = this.itemlist.nativeElement.children)

      return items as HTMLCollection;
    }


  }

  navigate(b) {
    if (!this.maxTransform) {
      this.getItemsElements(!1);
      this.applyPagination()
    }
    this.rtl = b;
    var offset = this.calcNewItemOffset_(b)
    this.currentItemOffset = offset;
    this.applyTransform_();
    console.log(this.currentItemOffset);
   
   
  }

  sumItemsWidth_(elemA, elemB) {
    var itemsElements = this.getItemsElements(null);
    let elemlist = _.range(elemA, elemB, elemA < elemB ? 1 : -1);
    var sum = 0;
    _.forEach(elemlist, function (item) {
      sum += (itemsElements[item] as HTMLElement).offsetWidth;
    });

    return sum;
  }

  applyTransform_() {
    var offset = -1;
    this.xTransform = offset * this.sumItemsWidth_(0, this.currentItemOffset)
  }


  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private _client: ClientService, private wpApiPosts: WpApiPosts, private _tags: WpApiTerms, private _series: SeriesService, private element: ElementRef) {
    iconRegistry.addSvgIcon(
      'arrow-next',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_arrow_forward_24px.svg'));
    this._series.isLoading = false;

    _.defaults(this, {
      stepSize: 1,
      currentItemOffset: 0,
      xTransform: 0,
      itemsCount: 2
    });
   this.fetchInitData();
  }

  fetchTag(options) {
    this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post = body.reverse();
        this._series.isLoading = false;
        console.log(this._series.isLoading)
      })
  }


  fetchInitData() {
    this.slug = null;
    let tagparams = new URLSearchParams('categories=63&per_page=100&_embed');
    let tagoptions: RequestOptionsArgs = {
      url: null,
      method: null,
      search: tagparams,
      body: null,
      withCredentials: false


    }


    this.wpApiPosts.getList(tagoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post = body.filter((item) => item.content.rendered.length > 0).reverse();
        let current = this.post[0];
        this.current = current._embedded['wp:term'][1][0].slug;
        this._series.hcurrent = this.current;
        this.slug = this.current;

      })

  }


  fetchPost() {
    if (this.slug) {
      this._series.isLoading = true;
      console.log(this._series.isLoading)
    }

    const taxonomy = "tags";
    let tagId: any;

    let taxparams = new URLSearchParams('slug=' + this.slug + '&per_page=30');

    let taxoptions: RequestOptionsArgs = {
      url: null,
      method: null,
      search: taxparams,
      body: null,
      withCredentials: false

    }

    this._tags.getList(taxonomy, taxoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        for (let tag of body) {
          tagId = tag.id;

        }
        let urlparams = new URLSearchParams('tags=' + tagId + '&per_page=30&_embed');
        let options: RequestOptionsArgs = {
          url: null,
          method: null,
          search: urlparams,
          body: null,
          withCredentials: false

        }

        if (tagId) {
          this.fetchTag(options)
        }

      })





  }

  ngOnInit() {
    

  }

  ngOnChanges(): void {

    this.fetchPost();


  }



}