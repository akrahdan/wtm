import { Injectable, HostListener } from '@angular/core';
import * as _ from "lodash";





@Injectable()
export class ClientService {
  @HostListener('window:resize', ['$event'])
  throttle(event) {
     this.onResize_()
    
  }

  
 
  private document_ = document;
  private window_ = window;
  private lodash_ = _;
  private mobileWidth = 640;
  private tabletWidth = 960;

  public responsiveMode = "desktop";
  public isDesktopMode = !0;
  public isMobileMode = !1;
  public isTabletMode = !1;
  public isSmallTouchDeviceMode = !1;
  private ios = /\/iPad|iPhone|iPod\//;
  private android = /\/android\/i/;
  private winphone = /\/windows phone\/i/;
  private isIOS = this.testUserAgent_(this.ios);
  private isAndroid = this.testUserAgent_(this.android);
  private isWindowsPhone = this.testUserAgent_(this.winphone);
  private viewportMinimalDimensionSize_ = this.getViewportMinimalDimensionSize_();
  private isGvizLoading = !1;
  private windowInnerWidth = 0;
  constructor() { }

  testUserAgent_(client) {
    return client.test((navigator.userAgent || navigator.vendor).toLowerCase())
  }

  getResponsiveMode() {
    return (this.window_ as any).innerWidth > this.mobileWidth ? "desktop" : "mobile"
  }

  isTabletMode_() {
    return (<any>this.window_).innerWidth > this.mobileWidth && (this.window_ as any).innerWidth <= this.tabletWidth
  }

  getViewportMinimalDimensionSize_() {
    return Math.min((this.window_ as any).innerWidth, (this.window_ as any).innerHeight)
  }

  isTouchDevice() {
    return !!("ontouchstart" in window || (window as any).DocumentTouch && document instanceof (window as any).DocumentTouch)
  }
  ;
  isSmallTouchDevice_() {
    return this.isIOS || this.isAndroid || this.isWindowsPhone ? !0 : this.isTouchDevice() && this.viewportMinimalDimensionSize_ <= this.tabletWidth
  }
  ;
  getDomainSuffix(a) {
    if (a.match(/localhost/))
      return "com";
    a = a.split(".");
    a.splice(0, a.indexOf("google") + 1);
    return a[0].split("/")[0]
  }
  ;
  onResize_() {
    var b = this.getResponsiveMode();
    this.responsiveMode = b;
    this.isDesktopMode = "desktop" == b;
    this.isMobileMode = "mobile" == b;
    this.isTabletMode = this.isTabletMode_();
    this.isSmallTouchDeviceMode = this.isSmallTouchDevice_();

  }
}
