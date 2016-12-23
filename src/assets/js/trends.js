var e, aa = this, ba = function(a) {
    return void 0 !== a
}, k = function(a, b, c) {
    a = a.split(".");
    c = c || aa;
    a[0]in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift()); )
        !a.length && ba(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
}, ca = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array)
                return "array";
            if (a instanceof Object)
                return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)
                return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                return "function"
        } else
            return "null";
    else if ("function" == b && "undefined" == typeof a.call)
        return "object";
    return b
}, da = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
}, ea = function(a, b, c) {
    if (!a)
        throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}, fa = function(a, b, c) {
    fa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? da : ea;
    return fa.apply(null, arguments)
}, p = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, g) {
        for (var d = Array(arguments.length - 2), f = 2; f < arguments.length; f++)
            d[f - 2] = arguments[f];
        return b.prototype[c].apply(a, d)
    }
};
var ga = function(a, b) {
    this.lodash_ = a;
    this.timeout_ = b
};
k("$jscomp.scope.ClipboardService", ga, void 0);
ga.$inject = ["lodash", "$timeout"];
ga.prototype.copyWidgetData = function(a) {
    a = a || [];
    this.copyToClipboard_(this.parseWidgetData_(a))
}
;
ga.prototype.parseWidgetData_ = function(a) {
    var b = a[1].values;
    a = a[0].value + "\r\n";
    for (var c = 0; c < b.length; ++c)
        a += c + 1 + ") " + b[c] + "\r\n";
    return a
}
;
ga.prototype.copyToClipboard_ = function(a) {
    var b = document.createElement("div");
    b.textContent = a;
    b.style.opacity = "0";
    document.body.appendChild(b);
    a = document.createRange();
    a.selectNode(b);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(a);
    document.execCommand("copy");
    b.remove();
    this.onCopyNotify_()
}
;
ga.prototype.onCopyNotify_ = function() {
    if (0 === document.getElementsByClassName("copy-notification").length) {
        var a = document.createElement("div");
        a.textContent = document.getElementsByClassName("translate-patch")[0].textContent;
        a.className = "copy-notification";
        document.body.appendChild(a);
        this.timeout_(this.lodash_.bind(function() {
            a.remove()
        }, a), 2E3)
    }
}
;
var ha, ia = function(a, b, c) {
    c || (c = {});
    c.guestPath || (c.guestPath = "https://www.google.com/trends/embed/");
    this.url_ = a || "";
    this.params_ = b || {};
    this.config_ = c
}, ja = function(a, b, c) {
    return new ia(a + "/" + b,{},c)
}, ka = function(a, b) {
    return new ia("yis/2016/" + (b.geo || "GLOBAL") + "/" + a,{},b)
}, la = function(a, b, c) {
    return new ia("explore/" + a,{
        req: b,
        tz: (new Date).getTimezoneOffset()
    },c)
};
e = ia.prototype;
e.createIframe_ = function(a) {
    var b = document.createElement("iframe"), c;
    for (c in a)
        b.setAttribute(c, a[c]);
    return b
}
;
e.createIframeCycle_ = function(a, b) {
    this.socketHandshake_(a, b, function(b) {
        b.data.isReady && (a.style.borderRadius = "2px",
        a.style.boxShadow = "0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)");
        b.data.height && (a.style.height = b.data.height + "px")
    })
}
;
e.generate_ = function() {
    if (!/^(https?:\/\/)?([a-z0-9\.]+)?(\.google\.com)?/i.test(this.config_.guestPath) && /^[^.]+\.[a-z]{2,4}\/?/i.test(this.config_.guestPath))
        console.error("Iframe caller domain name not allowed!");
    else if (this.config_.width && !/^\d{1,4}(px|\%)?$/i.test(this.config_.width))
        console.error("Width parameter contain illegal value!");
    else {
        var a = this.config_.guestPath + this.url_, b = [], c = "trends-widget-" + this.generateSeed_(), d;
        for (d in this.params_)
            Object.prototype.hasOwnProperty.call(this.params_, d) && b.push(d + "=" + encodeURIComponent(JSON.stringify(this.params_[d])));
        this.config_.timeStamp && b.push("ts=" + this.config_.timeStamp);
        this.config_.forceMobileMode && b.push("forceMobileMode=true");
        this.config_.exploreQuery && b.push("eq=" + encodeURIComponent(this.config_.exploreQuery));
        this.config_.locale && b.push("hl=" + this.config_.locale.replace(/[^a-z]/ig, ""));
        b.length && (a += "?" + b.join("&"));
        a = this.createIframe_({
            id: c,
            src: a,
            width: this.config_.width || "100%",
            frameBorder: 0,
            scrolling: 0
        });
        return {
            id: c,
            element: a
        }
    }
}
;
e.generateSeed_ = function() {
    return ha ? ++ha : ha = 1
}
;
e.render = function() {
    var a = this.generate_(), b;
    a && (document.write(a.element.outerHTML),
    b = document.getElementById(a.id),
    this.createIframeCycle_(b, a.id));
    return b
}
;
e.renderTo = function(a) {
    var b = this.generate_(), c;
    b && (c = b.element,
    a.appendChild(c),
    this.createIframeCycle_(c, b.id));
    return c
}
;
e.socketHandshake_ = function(a, b, c) {
    a.addEventListener("load", function() {
        a.contentWindow.postMessage({
            uniqueID: b
        }, "*")
    });
    window.addEventListener("message", function(a) {
        a.data.uniqueID === b && c(a)
    }, !1)
}
;
k("trends.embed.renderWidget", function(a, b, c) {
    return (new ja(a,b,c)).render()
}, void 0);
k("trends.embed.renderTopChartsWidget", function(a, b) {
    return (new ka(a,b)).render()
}, void 0);
var ma = function(a, b, c, d) {
    return (new ja(b,c,d)).renderTo(a)
};
k("trends.embed.renderWidgetTo", ma, void 0);
var na = function(a, b, c) {
    return (new ka(b,c)).renderTo(a)
};
k("trends.embed.renderTopChartsWidgetTo", na, void 0);
k("trends.embed.renderExploreWidget", function(a, b, c) {
    return (new la(a,b,c)).render()
}, void 0);
var oa = function(a, b, c, d) {
    return (new la(b,c,d)).renderTo(a)
};
k("trends.embed.renderExploreWidgetTo", oa, void 0);
var pa = angular.module("narratorAppViews", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    function c(a) {
        return a.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    }
    b() && (a.put("/components/embed/embed-code-preview-directive.html", '<textarea readonly class="embed-dialog-textarea" ng-if="exploreParams">\n  <script type="text/javascript" src="{{loaderScriptPathPrefix}}/embed_loader.js">\x3c/script>\n  <script type="text/javascript">\n    trends.embed.renderExploreWidget("{{widgetId}}", {{exploreParams}}, {{getWidgetConfig()}});\n  \x3c/script>\n</textarea>\n\n<textarea readonly class="embed-dialog-textarea" ng-if="!exploreParams && !isYIS2016">\n  <script type="text/javascript" src="{{loaderScriptPathPrefix}}/embed_loader.js">\x3c/script>\n  <script type="text/javascript">\n    trends.embed.renderWidget("{{storyId}}", "{{widgetId}}", {{getWidgetConfig()}});\n  \x3c/script>\n</textarea>\n\n<textarea readonly class="embed-dialog-textarea" ng-if="!exploreParams && isYIS2016">\n  <script type="text/javascript" src="{{loaderScriptPathPrefix}}/embed_loader.js">\x3c/script>\n  <script type="text/javascript">\n    trends.embed.renderTopChartsWidget("{{widgetId}}", {{getWidgetConfig()}});\n  \x3c/script>\n</textarea>\n'),
    a.put("/components/embed/embed-dialog.html", '<md-dialog class="embed-dialog-wrapper">\n  <div class="dialog-content-wrapper">\n    <div class="customize-wrapper">\n      <div class="embed-dialog-header-text">\n        Embed\n      </div>\n      <md-checkbox ng-show="ctrl.hasLiveData"\n                   class="embed-dialog-text md-primary"\n                   ng-model="ctrl.keepDataUpdated"\n                   aria-label="Keep data updated">\n        Keep data updated\n      </md-checkbox>\n      <div class="embed-dialog-text"\n           ng-class="{\'curated-story-text\': !ctrl.hasLiveData}"\n           ng-if="!(ctrl.keepDataUpdated && ctrl.hasLiveData)">\n        This data is static and will not update\n      </div>\n      <div class="embed-dialog-text"\n           ng-if="ctrl.keepDataUpdated && ctrl.hasLiveData">\n        This data is live and will keep updating\n      </div>\n      <div class="embed-dialog-text instruction-text">\n        Paste this into any HTML page:\n      </div>\n      <md-content class="embed-dialog-content">\n        <div class="embed-dialog-textarea-wrapper">\n          <embed-code-preview story-id="ctrl.storyId"\n                              widget-id="ctrl.widgetId"\n                              explore-params="ctrl.exploreParams"\n                              keep-data-updated="ctrl.keepDataUpdated"\n                              timestamp="ctrl.timestamp"\n                              explore-query="ctrl.exploreQuery">\n          </embed-code-preview>\n        </div>\n      </md-content>\n    </div>\n    <div class="preview-wrapper">\n      <div class="embed-dialog-header-text">\n        Preview\n      </div>\n      <md-content class="tabs-wrapper">\n        <md-tabs ng-switch on="ctrl.activeTab">\n          <md-tab label="' + c("DESKTOP") + '"\n                  md-on-select="ctrl.setSelectedTab(\'desktop\')">\n            <md-content class="md-padding tab-content" ng-switch-when="desktop">\n              <embed-widget-preview class="embed-widget-preview-container"\n                                    story-id="ctrl.storyId"\n                                    widget-id="ctrl.widgetId"\n                                    explore-params="ctrl.exploreParams"\n                                    explore-query="ctrl.exploreQuery"\n                                    timestamp="ctrl.timestamp"\n                                    force-mobile-mode="false"\n                                    ng-if="isDialogComplete">\n              </embed-widget-preview>\n            </md-content>\n          </md-tab>\n          <md-tab label="' + c("MOBILE") + '"\n                  md-on-select="ctrl.setSelectedTab(\'mobile\')">\n            <md-content class="md-padding tab-content mobile-tab" ng-switch-when="mobile">\n              <embed-widget-preview class="embed-widget-preview-container"\n                                    story-id="ctrl.storyId"\n                                    widget-id="ctrl.widgetId"\n                                    explore-params="ctrl.exploreParams"\n                                    timestamp="ctrl.timestamp"\n                                    force-mobile-mode="true"\n                                    ng-if="isDialogComplete">\n              </embed-widget-preview>\n            </md-content>\n        </md-tabs>\n      </md-content>\n    </div>\n    <div class="bottom-wrapper">\n      <md-button ng-click="ctrl.cancelDialog()" class="embed-dialog-button">\n        DONE\n      </md-button>\n    </div>\n  </div>\n</md-dialog>\n'),
    a.put("/components/filter/filter-dialog.html", '<md-dialog class="filter-dialog">\n  <md-toolbar layout="row" layout-align="start center" class="filter-dialog-toolbar">\n    <a class="filter-dialog-menu-button-wrapper" ng-click="ctrl.cancelDialog()">\n      <md-icon class="filter-dialog-menu-button flip-rtl"\n               md-svg-src="{{ctrl.config.staticPathPrefix}}/ic_arrow_back_24px.svg">\n      </md-icon>\n    </a>\n    <div class="filter-dialog-title">\n      <span ng-if="!ctrl.filteringCategories && !ctrl.filteringGeos">\n        Filter\n      </span>\n      <span ng-if="ctrl.filteringCategories">\n        Filter category\n      </span>\n      <span ng-if="ctrl.filteringGeos">\n        Filter country\n      </span>\n    </div>\n  </md-toolbar>\n  <md-content class="filter-dialog-content">\n    <md-list ng-if="!ctrl.filteringCategories && !ctrl.filteringGeos">\n      <md-item ng-click="ctrl.setFilteringGeos()" class="filter-dialog-menu-item">\n        <div class="filter-dialog-menu-item-title">\n          Country\n        </div>\n        <div class="filter-dialog-menu-item-selection">\n          {{ ctrl.storiesFilter.geo.name }}\n        </div>\n      </md-item>\n      <md-item ng-click="ctrl.setFilteringCategories()" class="filter-dialog-menu-item">\n        <div class="filter-dialog-menu-item-title">\n          Category\n        </div>\n        <div class="filter-dialog-menu-item-selection">\n          {{ ctrl.storiesFilter.category.name }}\n        </div>\n      </md-item>\n    </md-list>\n\n    <md-list ng-if="ctrl.filteringCategories">\n      <md-item ng-click="ctrl.updateCategoryFilter(cat)"\n               ng-repeat="cat in ctrl.categories">\n        <div class="filter-dialog-menu-option"\n             ng-class="{\'filter-dialog-selected\':cat.name === ctrl.storiesFilter.category.name}">\n          {{ cat.name }}\n        </div>\n      </md-item>\n    </md-list>\n\n    <md-list ng-if="ctrl.filteringGeos">\n      <md-item ng-click="ctrl.updateGeoFilter(geo)" ng-repeat="geo in ctrl.geos">\n        <div class="filter-dialog-menu-option"\n             ng-class="{\'filter-dialog-selected\':geo.name === ctrl.storiesFilter.geo.name}">\n          {{ geo.name }}\n        </div>\n      </md-item>\n    </md-list>\n  </md-content>\n</md-dialog>\n'),
    a.put("/components/filter/filter-directive.html", '<div class="selectors-wrapper">\n  \x3c!-- START Mobile - this section is only visible on mobile using CSS media query. --\x3e\n  <md-button class="md-icon-button md-no-ink filter-menu-button" id="homepage-filters"\n           ng-click="showMobileFilterDialog()"\n           aria-label="' + c("Filter") + '">\n    <md-icon md-svg-icon="{{config.staticPathPrefix}}/ic_filter_list_24px.svg">\n    </md-icon>\n  </md-button>\n  \x3c!-- END Mobile - this section is only visible on mobile using CSS media query. --\x3e\n\n  \x3c!-- START Desktop - this section is only visible on desktop using CSS media query. --\x3e\n  <md-select ng-model="storiesFilter.category"\n             ng-change="routeWithNewFilter()"\n             class="top-selector" aria-label="Select stories category">\n    <md-option class="top-selector-option" ng-value="category"\n               ng-repeat="category in categories | OrderBySelectedOptionFilter:storiesFilter.category.id">\n      {{ category.name }}\n    </md-option>\n  </md-select>\n\n  <md-select ng-model="storiesFilter.geo"\n             ng-change="routeWithNewFilter()"\n             class="top-selector" aria-label="Select stories location">\n    <md-option class="top-selector-option" ng-value="geo" ng-repeat="geo in geos | OrderBySelectedOptionFilter:storiesFilter.geo.id">\n      {{ geo.name }}\n    </md-option>\n  </md-select>\n  \x3c!-- END Desktop - this section is only visible on desktop using CSS media query. --\x3e\n</div>\n'),
    a.put("/components/filter/yis-filter-dialog.html", '<md-dialog>\n  <div class="yis-filter-container">\n    <div class="yis-filter-title">\n      \x3c!-- TODO(gmeir): make sure this title is correct. --\x3e\n      Select a country\n    </div>\n    <div class="separator"></div>\n    <md-content class="yis-filter-content">\n      <md-item class="yis-filter-options"\n               ng-repeat="geo in ctrl.yis2016SGeoOptions"\n               ng-click="ctrl.setSelectedGeo(geo)">\n        {{ geo.name }}\n      </md-item>\n    </md-content>\n    <div class="separator"></div>\n    <div class="dialog-buttons">\n      <md-button ng-click="ctrl.hideModal()"\n                 class="dialog-button">\n        CANCEL\n      </md-button>\n    </div>\n  </div>\n</md-dialog>\n'),
    a.put("/components/filter/yis-filter-directive.html", '<md-button class="yis-open-filter-dialog-button"\n    ng-click="showYisCountryFilterDialogBind($event)">\n  {{selectedGeo.name}}\n    <div class="chev-wrapper">\n      <md-icon class="yis-filter-chev-icon down"\n               md-svg-src="{{staticPathPrefix}}/chev-down.svg"\n               alt="' + c("Open country picker") + '">\n      </md-icon>\n      <md-icon class="yis-filter-chev-icon up"\n               md-svg-src="{{staticPathPrefix}}/chev-up.svg"\n               alt="' + c("Open country picker") + '">\n      </md-icon>\n    </div>\n</md-button>\n'),
    a.put("/components/layout/error-directive.html", '<div class="error-container">\n  <div ng-if="errorMessage" class="server-error-wrapper">\n    <div class="error-title">Oops! There was a problem displaying this page.</div>\n    <div class="error-suggest">\n      Please try again\n    </div>\n  </div>\n  <div ng-if="isEmptyState" class="empty-state-wrapper">\n    <div class="error-title">\n      Hmm, your search doesn\'t have enough data to show this page.\n    </div>\n    <div class="error-suggest">Please make sure everything is spelled correctly, or try a more general term.</div>\n  </div>\n</div>\n'),
    a.put("/components/layout/error-state.html", '<div class="error-message">\n  <p class="error-message-title">\n    Error loading page\n  </p>\n  <p class="error-message-desc">\n    Please try again later\n  </p>\n</div>\n'),
    a.put("/components/layout/grid-directive.html", '<div class="grid-container">\n  <div class="grid-column" ng-repeat="row in gridContentMatrix track by $index">\n    <div class="grid-cell" ng-repeat="cell in row">\n      <trends-widget\n          story-id="{{storyId}}"\n          data="cell"\n          share-title-getter="generateYis2016WidgetShareTitleBind(widgetTitle)">\n      </trends-widget>\n    </div>\n  </div>\n</div>\n'),
    a.put("/components/layout/header-directive.html", "<div class=\"header-wrapper\"\n     ng-class=\"{'empty-story': isEmptyStory,\n                'yis-header-wrapper': isYisHub || isYisStory}\">\n  <div class=\"header-background\"\n      ng-class=\"{'has-custom-image': backgroundImage && imageLoaded,\n                 'has-overlaying-gradient': !isYisGoobers}\"\n      ng-style=\"{'background-image': imageLoaded ? 'url(' + backgroundImage + ')' : 'none',\n                 'background-color': backColorRulesBind()}\">\n    <img ng-src=\"{{backgroundImage}}\" ng-show=\"false\" />\n  </div>\n\n  <div class=\"header-background opacity-mask\"\n       ng-style=\"{'opacity': imageOpacityPercentage,\n                  'background-color': backColorRulesBind()}\">\n  </div>\n\n  <div class=\"header-content\"\n       ng-style=\"{'margin-bottom': bottomMargin + 'px'}\">\n    <div class=\"header-topbar\"\n         ng-class=\"{'header-topbar-grow': isOneGoogleEmailMode || !enableSearch,\n                    'header-with-search': enableSearch,\n                    'toolbar-shadow': showShadow,\n                    'ie10': isIE10}\"\n         ng-style=\"{'background-color': backColorRulesBind()}\">\n      <div class=\"header-topbar-left\">\n        <button ng-click=\"toggleSidenav('Open')\" track=\"['General', 'Menu', 'Open']\"\n           class=\"menu-btn\" id=\"sidenav-menu-btn\">\n          <div class=\"sidenav-container\"\n               title=\"" + c("Open menu") + '">\n            <md-icon md-svg-src="{{ $root.config.staticPathPrefix }}/ic_menu_24px.svg"></md-icon>\n          </div>\n        </button>\n\n        <div class="logo-container">\n          <a class="header-title" target="_self"\n             href="{{ $root.config.pathPrefix }}" ng-click="homeClickHandler()"\n             track="[\'General\', \'Logo\', \'Click\']">\n            <md-icon class="google-logo header-logo generic-hide-in-mobile"></md-icon>\n            <h1>{{ pageTitle || \'Trends\' }}</h1>\n          </a>\n\n          <h2 class="header-sub-title" ng-if="pageSubTitle">\n            <a href="{{ $root.config.pathPrefix }}/explore"\n               track="[\'General\', \'Explore\', \'Click\']">\n              {{ pageSubTitle }}</a>\n          </h2>\n        </div>\n      </div>\n\n      <md-button ng-if="isYisHub"\n                 class="md-icon-button md-no-ink story-version-mobile"\n                 aria-label="' + c("Story geo") + '">\n        <md-icon class="flip-rtl"\n                 md-svg-src="{{ $root.config.staticPathPrefix }}/globe-image.svg"\n                 ng-click="showMobileStoryVersionDialog()">\n        </md-icon>\n      </md-button>\n\n      <div class="header-topbar-center search-container"\n           ng-class="{\'yis-hub-header\': isYisHub}"\n           ng-if="enableSearch">\n        <search></search>\n      </div>\n\n      <div class="header-topbar-right onebar-container generic-hide-in-mobile">\n        <share ng-if="shareConfig" config="shareConfig"></share>\n\n        <filter ng-if="!$root.globals.isDesktopMode && isHomePage"></filter>\n      </div>\n    </div>\n\n    <ng-transclude class="opacity-anim"\n                   ng-class="{\'has-opacity\': enableScrollOpacity && hideHeaderContent}">\n    </ng-transclude>\n\n    <div class="header-display-overlay"\n         ng-if="enableScrollOpacity && hideHeaderContent && blockButtonsInHeaderOnScroll"\n         ng-style="{\'top\': (64 + bodyScroll) + \'px\',\n                    \'bottom\': ((isDesktopWidth ? 46 : 38) - bottomMargin) + \'px\'}">\n    </div>\n  </div>\n</div>\n\n<sidenav></sidenav>\n'),
    a.put("/components/layout/loader-directive.html", '<div class="loader-desktop" ng-if="!isMobile">\n  <svg class="circular">\n    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>\n  </svg>\n</div>\n<div class="loader-tablet" ng-if="isMobile">\n  <div class="circular">\n    <md-progress-circular md-mode="indeterminate"\n                          md-diameter="30px">\n    </md-progress-circular>\n  </div>\n</div>\n'),
    a.put("/components/layout/sidenav-directive.html", '<md-sidenav class="fe-sidenav-left"\n            ng-style="{minWidth: sideNavWidth + \'px\'}"\n            md-component-id="left">\n  <div class="fe-sidenav-header"\n       layout="row"\n       layout-align="start center">\n    <a ng-click="toggleSidenav(\'Close\')"\n            track="[\'General\', \'Menu\', \'Close\']"\n            class="menu-btn">\n      <div class="sidenav-container"\n           title="' + c("Close menu") + '">\n        <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_menu_24px.svg">\n        </md-icon>\n      </div>\n    </a>\n\n    <div class="logo-container menu-logo" dir="ltr">\n      <md-icon class="google-logo sidenav-logo">\n      </md-icon>\n    </div>\n  </div>\n\n  <md-list class="fe-sidenav-list-wrapper"\n           ng-style="{minWidth: sideNavWidth + \'px\'}">\n    <div class="fe-sidenav-list-group" id="sidenav-list-group-trends">\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="{{config.pathPrefix}}"\n                     ng-click="homeClickHandler();toggleSidenav(\'Close\')"\n                     track="[\'General\', \'Menu\', \'Home\']">\n            Home\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="{{config.pathPrefix}}/explore"\n                     track="[\'General\', \'Menu\', \'Explore\']">\n            Explore\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="{{config.pathPrefix}}/hottrends"\n                     track="[\'General\', \'Menu\', \'Trending Searches\']">\n            Trending Searches\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="{{config.pathPrefix}}/hotvideos"\n                     track="[\'General\', \'Menu\', \'Trending on YouTube\']">\n            Trending on YouTube\n          </md-button>\n        </md-item-content>\n      </md-item>      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="{{config.pathPrefix}}/topcharts"\n                     track="[\'General\', \'Menu\', \'Top Charts\']">\n            Top Charts\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="{{config.pathPrefix}}/subscriptions"\n                     track="[\'General\', \'Menu\', \'Subscriptions\']">\n            Subscriptions\n          </md-button>\n        </md-item-content>\n      </md-item>\n    </div>\n    <div class="fe-sidenav-list-group" id="sidenav-list-group-partners">\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="//www.google.com/trends/correlate"\n                     target="_blank"\n                     track="[\'General\', \'Menu\', \'Google Correlate\']">\n            Google Correlate\n          </md-button>\n        </md-item-content>\n      </md-item>\n    </div>\n    <div class="fe-sidenav-list-group" id="sidenav-list-group-terms">\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="//{{google_host}}/intl/{{config.locale}}/policies/privacy/"\n                     target="_blank"\n                     track="[\'General\', \'Menu\', \'Privacy\']">\n            Privacy\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="//{{google_host}}/intl/{{config.locale}}/policies/terms/"\n                     target="_blank"\n                     track="[\'General\', \'Menu\', \'Terms\']">\n            Terms\n          </md-button>\n          </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     href="//support.google.com/trends/?hl={{config.locale}}#topic=6248052"\n                     target="_blank"\n                     track="[\'General\', \'Menu\', \'Help Center\']">\n            Help Center\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n                     ng-click="sendFeedback(); toggleSidenav(\'Close\')"\n                     track="[\'General\', \'Menu\', \'Send Feedback\']">\n            Send Feedback\n          </md-button>\n        </md-item-content>\n      </md-item>\n      <md-item>\n        <md-item-content>\n          <md-button class="fe-sidenav-menu-item"\n              href="//{{google_host}}/intl/{{config.locale}}/about/" target="_blank"\n              track="[\'General\', \'Menu\', \'About\']">\n            About\n          </md-button>\n        </md-item-content>\n      </md-item>\n    </div>\n  </md-list>\n  <div class="fe-sidenav-footer">\n    <md-button aria-label="' + c("Sign in") + '"\n        href="//accounts.google.com" target="_blank"\n        track="[\'General\', \'Menu\', \'Sign in\']">\n        <span ng-if="!config.userEmail">Sign in</span>\n        <span ng-if="config.userEmail">{{config.userEmail}}</span>\n     </md-button>\n  </div>\n</md-sidenav>\n'),
    a.put("/components/layout/yis-2016-front-door.html", '<div class="yis-landing">\n  <div class="yis-landing__terms-row">\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Hodor\n      </li>\n      <li class="yis-landing__term">Altruismo\n      </li>\n      <li class="yis-landing__term">General relativity\n      </li>\n      <li class="yis-landing__term">\u6c17\u5019\n      </li>\n      <li class="yis-landing__term">Banjo\n      </li>\n      <li class="yis-landing__term">Full moon\n      </li>\n      <li class="yis-landing__term">\u7368\u89d2\u7378\n      </li>\n      <li class="yis-landing__term">Kugelschreiber\n      </li>\n      <li class="yis-landing__term">International Women\u2019s Day\n      </li>\n      <li class="yis-landing__term">Hi-top fade\n      </li>\n      <li class="yis-landing__term">T\u00e9 de hierbas\n      </li>\n      <li class="yis-landing__term">\u679c\u6c41\n      </li>\n      <li class="yis-landing__term">Curry\n      </li>\n      <li class="yis-landing__term">Blood donation\n      </li>\n      <li class="yis-landing__term">\uc724\ub144\n      </li>\n    </ul>\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Hodor\n      </li>\n      <li class="yis-landing__term">Altruismo\n      </li>\n      <li class="yis-landing__term">General relativity\n      </li>\n      <li class="yis-landing__term">\u6c17\u5019\n      </li>\n      <li class="yis-landing__term">Banjo\n      </li>\n      <li class="yis-landing__term">Full moon\n      </li>\n      <li class="yis-landing__term">\u7368\u89d2\u7378\n      </li>\n      <li class="yis-landing__term">Kugelschreiber\n      </li>\n      <li class="yis-landing__term">International Women\u2019s Day\n      </li>\n      <li class="yis-landing__term">Hi-top fade\n      </li>\n      <li class="yis-landing__term">T\u00e9 de hierbas\n      </li>\n      <li class="yis-landing__term">\u679c\u6c41\n      </li>\n      <li class="yis-landing__term">Curry\n      </li>\n      <li class="yis-landing__term">Blood donation\n      </li>\n      <li class="yis-landing__term">\uc724\ub144\n      </li>\n    </ul>\n  </div>\n  <div class="yis-landing__terms-row">\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Olly olly oxen free\n      </li>\n      <li class="yis-landing__term">Kimchi\n      </li>\n      <li class="yis-landing__term">Voli pantai\n      </li>\n      <li class="yis-landing__term">Corrupci\u00f3n\n      </li>\n      <li class="yis-landing__term">LGBT\n      </li>\n      <li class="yis-landing__term">Oposto\n      </li>\n      <li class="yis-landing__term">Flache Erde\n      </li>\n      <li class="yis-landing__term">\u5c0f\u4e11\n      </li>\n      <li class="yis-landing__term">Mosquito\n      </li>\n      <li class="yis-landing__term">R\u00e9f\u00e9rendum\n      </li>\n      <li class="yis-landing__term">Demagogo\n      </li>\n      <li class="yis-landing__term">\u041a\u043e\u0431\u0438 \u0411\u0440\u0430\u0439\u0430\u043d\u0442\n      </li>\n      <li class="yis-landing__term">Fidel Castro\n      </li>\n      <li class="yis-landing__term">Promesa\n      </li>\n    </ul>\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Olly olly oxen free\n      </li>\n      <li class="yis-landing__term">Kimchi\n      </li>\n      <li class="yis-landing__term">Voli pantai\n      </li>\n      <li class="yis-landing__term">Corrupci\u00f3n\n      </li>\n      <li class="yis-landing__term">LGBT\n      </li>\n      <li class="yis-landing__term">Oposto\n      </li>\n      <li class="yis-landing__term">Flache Erde\n      </li>\n      <li class="yis-landing__term">\u5c0f\u4e11\n      </li>\n      <li class="yis-landing__term">Mosquito\n      </li>\n      <li class="yis-landing__term">R\u00e9f\u00e9rendum\n      </li>\n      <li class="yis-landing__term">Demagogo\n      </li>\n      <li class="yis-landing__term">\u041a\u043e\u0431\u0438 \u0411\u0440\u0430\u0439\u0430\u043d\u0442\n      </li>\n      <li class="yis-landing__term">Fidel Castro\n      </li>\n      <li class="yis-landing__term">Promesa\n      </li>\n    </ul>\n  </div>\n  <div class="yis-landing__terms-row">\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Bruxelas\n      </li>\n      <li class="yis-landing__term">Orlando\n      </li>\n      <li class="yis-landing__term">Cachorrinho\n      </li>\n      <li class="yis-landing__term">G\u00e9n\u00e9ration Y\n      </li>\n      <li class="yis-landing__term">14 juillet\n      </li>\n      <li class="yis-landing__term">Havana\n      </li>\n      <li class="yis-landing__term">Medalha\n      </li>\n      <li class="yis-landing__term">Chicago Cubs\n      </li>\n      <li class="yis-landing__term">Daredevil\n      </li>\n      <li class="yis-landing__term">\uc624\ud06c\ub77c\n      </li>\n      <li class="yis-landing__term">D\u00eda de la Bastilla\n      </li>\n      <li class="yis-landing__term">\u041c\u0438\u043b\u043b\u0438\u043e\u043d\n      </li>\n      <li class="yis-landing__term">Alchemy\n      </li>\n    </ul>\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Bruxelas\n      </li>\n      <li class="yis-landing__term">Orlando\n      </li>\n      <li class="yis-landing__term">Cachorrinho\n      </li>\n      <li class="yis-landing__term">G\u00e9n\u00e9ration Y\n      </li>\n      <li class="yis-landing__term">14 juillet\n      </li>\n      <li class="yis-landing__term">Havana\n      </li>\n      <li class="yis-landing__term">Medalha\n      </li>\n      <li class="yis-landing__term">Chicago Cubs\n      </li>\n      <li class="yis-landing__term">Daredevil\n      </li>\n      <li class="yis-landing__term">\uc624\ud06c\ub77c\n      </li>\n      <li class="yis-landing__term">D\u00eda de la Bastilla\n      </li>\n      <li class="yis-landing__term">\u041c\u0438\u043b\u043b\u0438\u043e\u043d\n      </li>\n      <li class="yis-landing__term">Alchemy\n      </li>\n    </ul>\n  </div>\n  <div class="yis-landing__terms-row">\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Hi-top fade\n      </li>\n      <li class="yis-landing__term">T\u00e9 de hierbas\n      </li>\n      <li class="yis-landing__term">\u679c\u6c41\n      </li>\n      <li class="yis-landing__term">Curry\n      </li>\n      <li class="yis-landing__term">Blood donation\n      </li>\n      <li class="yis-landing__term">\uc724\ub144\n      </li>\n      <li class="yis-landing__term">Taufe\n      </li>\n      <li class="yis-landing__term">Olly olly oxen free\n      </li>\n      <li class="yis-landing__term">Kimchi\n      </li>\n      <li class="yis-landing__term">Voli pantai\n      </li>\n      <li class="yis-landing__term">Corrupci\u00f3n\n      </li>\n      <li class="yis-landing__term">LGBT\n      </li>\n      <li class="yis-landing__term">Oposto\n      </li>\n      <li class="yis-landing__term">Flache Erde\n      </li>\n      <li class="yis-landing__term">\u5c0f\u4e11\n      </li>\n    </ul>\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">Hi-top fade\n      </li>\n      <li class="yis-landing__term">T\u00e9 de hierbas\n      </li>\n      <li class="yis-landing__term">\u679c\u6c41\n      </li>\n      <li class="yis-landing__term">Curry\n      </li>\n      <li class="yis-landing__term">Blood donation\n      </li>\n      <li class="yis-landing__term">\uc724\ub144\n      </li>\n      <li class="yis-landing__term">Taufe\n      </li>\n      <li class="yis-landing__term">Olly olly oxen free\n      </li>\n      <li class="yis-landing__term">Kimchi\n      </li>\n      <li class="yis-landing__term">Voli pantai\n      </li>\n      <li class="yis-landing__term">Corrupci\u00f3n\n      </li>\n      <li class="yis-landing__term">LGBT\n      </li>\n      <li class="yis-landing__term">Oposto\n      </li>\n      <li class="yis-landing__term">Flache Erde\n      </li>\n      <li class="yis-landing__term">\u5c0f\u4e11\n      </li>\n    </ul>\n  </div>\n  <div class="yis-landing__terms-row yis-landing__extra-row">\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">R\u00e9f\u00e9rendum\n      </li>\n      <li class="yis-landing__term">Demagogo\n      </li>\n      <li class="yis-landing__term">\u041a\u043e\u0431\u0438 \u0411\u0440\u0430\u0439\u0430\u043d\u0442\n      </li>\n      <li class="yis-landing__term">Fidel Castro\n      </li>\n      <li class="yis-landing__term">Promesa\n      </li>\n      <li class="yis-landing__term">Clown\n      </li>\n      <li class="yis-landing__term">Bruxelas\n      </li>\n      <li class="yis-landing__term">Orlando\n      </li>\n      <li class="yis-landing__term">Cachorrinho\n      </li>\n      <li class="yis-landing__term">G\u00e9n\u00e9ration Y\n      </li>\n      <li class="yis-landing__term">14 juillet\n      </li>\n      <li class="yis-landing__term">Havana\n      </li>\n      <li class="yis-landing__term">Medalha\n      </li>\n      <li class="yis-landing__term">Chicago Cubs\n      </li>\n    </ul>\n    <ul class="yis-landing__block">\n      <li class="yis-landing__term">R\u00e9f\u00e9rendum\n      </li>\n      <li class="yis-landing__term">Demagogo\n      </li>\n      <li class="yis-landing__term">\u041a\u043e\u0431\u0438 \u0411\u0440\u0430\u0439\u0430\u043d\u0442\n      </li>\n      <li class="yis-landing__term">Fidel Castro\n      </li>\n      <li class="yis-landing__term">Promesa\n      </li>\n      <li class="yis-landing__term">Clown\n      </li>\n      <li class="yis-landing__term">Bruxelas\n      </li>\n      <li class="yis-landing__term">Orlando\n      </li>\n      <li class="yis-landing__term">Cachorrinho\n      </li>\n      <li class="yis-landing__term">G\u00e9n\u00e9ration Y\n      </li>\n      <li class="yis-landing__term">14 juillet\n      </li>\n      <li class="yis-landing__term">Havana\n      </li>\n      <li class="yis-landing__term">Medalha\n      </li>\n      <li class="yis-landing__term">Chicago Cubs\n      </li>\n    </ul>\n  </div>\n</div>\n'),
    a.put("/components/pickers/custom-date-picker-desktop.html", '<md-select ng-model="$parent.$parent.selectedOption"\n           ng-change="changeHandler()"\n           aria-label="Select time period"\n           ng-model-options="{trackBy: \'$value.id\'}"\n           md-container-class="custom-date-picker-select-container {{ mdContainerClass }}">\n  <md-option class="custom-date-picker-select-option"\n             ng-repeat="option in sortedOptions"\n             ng-value="option"\n             ng-show="option.id != (isWebSearch ? \'all_2008\' : \'all\')">\n    {{ option.name }}\n  </md-option>\n</md-select>\n'),
    a.put("/components/pickers/custom-date-picker-dialog.html", '<md-dialog ng-class="{\'rtl-custom-date-picker-dialog\': ctrl.isPageRtl}">\n  <div class="custom-date-picker-dialog-title">\n    Custom time range\n  </div>\n  <md-tabs md-selected="ctrl.selectedTabIndex"\n           md-dynamic-height="true"\n           class="custom-date-picker-dialog-tabs">\n    <md-tab label="' + c("ARCHIVE") + '">\n      <md-content class="custom-date-picker-dialog-archive-content">\n        <form name="archive">\n          <md-radio-group ng-model="ctrl.archiveRadioGroup"\n                          class="custom-date-picker-dialog-radio-group">\n            <md-radio-button value="date_range"\n                             class="md-primary"\n                             aria-label="Date range selection">\n            </md-radio-button>\n            <md-radio-button value="full_year"\n                             class="md-primary"\n                             aria-label="Full year selection">\n            </md-radio-button>\n          </md-radio-group>\n          <div class="custom-date-picker-dialog-range-from">\n            <span>From</span>\n            <md-datepicker ng-model="ctrl.rangeFrom"\n                           md-min-date="ctrl.minDate"\n                           md-max-date="ctrl.rangeTo"\n                           ng-disabled="ctrl.archiveRadioGroup !== \'date_range\'">\n            </md-datepicker>\n          </div>\n          <div class="custom-date-picker-dialog-range-to">\n            <span>To</span>\n            <md-datepicker ng-model="ctrl.rangeTo"\n                           md-min-date="ctrl.rangeFrom"\n                           md-max-date="ctrl.today"\n                           ng-disabled="ctrl.archiveRadioGroup !== \'date_range\'">\n            </md-datepicker>\n          </div>\n          <div class="custom-date-picker-dialog-year">\n            <span>Full year</span>\n            <md-select ng-model="ctrl.fullYear"\n                       ng-disabled="ctrl.archiveRadioGroup !== \'full_year\'"\n                       aria-label="Select full year">\n              <md-option class="custom-date-picker-dialog-select-option"\n                         ng-repeat="year in ctrl.years | OrderBySelectedOptionFilter:ctrl.fullYear"\n                         ng-value="year">\n                {{ year }}\n              </md-option>\n            </md-select>\n          </div>\n        </form>\n      </md-content>\n    </md-tab>\n    <md-tab label="' + c("PAST WEEK") + '">\n      <md-content class="custom-date-picker-dialog-week-content">\n        <div class="custom-date-picker-dialog-datetime-from">\n          <span>From</span>\n          <md-select ng-model="ctrl.fromDay"\n                     md-on-close="ctrl.validatePastWeekSelection()"\n                     class="custom-date-picker-dialog-datetime-from-day"\n                     aria-label="Select day">\n            <md-option class="custom-date-picker-dialog-select-option"\n                       ng-repeat="day in ctrl.pastWeek | OrderBySelectedOptionFilter:ctrl.fromDay"\n                       ng-value="day.id">\n              {{ day.name }}\n            </md-option>\n          </md-select>\n          <md-select ng-model="ctrl.fromTime"\n                     md-on-close="ctrl.validatePastWeekSelection()"\n                     class="custom-date-picker-dialog-datetime-from-time"\n                     aria-label="Select time">\n            <md-option class="custom-date-picker-dialog-select-option"\n                       ng-repeat="hour in ctrl.hours | OrderBySelectedOptionFilter:ctrl.fromTime"\n                       ng-value="hour.id">\n              {{ hour.name }}\n            </md-option>\n          </md-select>\n        </div>\n        <div class="custom-date-picker-dialog-datetime-to">\n          <span>To</span>\n          <md-select ng-model="ctrl.toDay"\n                     md-on-close="ctrl.validatePastWeekSelection()"\n                     class="custom-date-picker-dialog-datetime-to-day"\n                     aria-label="Select day">\n            <md-option class="custom-date-picker-dialog-select-option"\n                       ng-repeat="day in ctrl.pastWeek | OrderBySelectedOptionFilter:ctrl.toDay"\n                       ng-value="day.id">\n              {{ day.name }}\n            </md-option>\n          </md-select>\n          <md-select ng-model="ctrl.toTime"\n                     md-on-close="ctrl.validatePastWeekSelection()"\n                     class="custom-date-picker-dialog-datetime-to-time"\n                     aria-label="Select time">\n            <md-option class="custom-date-picker-dialog-select-option"\n                       ng-repeat="hour in ctrl.hours | OrderBySelectedOptionFilter:ctrl.toTime"\n                       ng-value="hour.id">\n              {{ hour.name }}\n            </md-option>\n          </md-select>\n        </div>\n        <div ng-if="ctrl.pastWeekInvalid"\n             class="custom-date-picker-dialog-past-week-invalid-wrapper">\n          <div class="custom-date-picker-dialog-past-week-invalid-text">\n            End date must follow the start date\n          </div>\n          <md-icon class="custom-date-picker-dialog-past-week-invalid-icon"\n                   md-svg-src="{{ctrl.config.staticPathPrefix}}/ic_warning_googred_18dp.svg">\n          </md-icon>\n        </div>\n      </md-content>\n    </md-tab>\n  </md-tabs>\n  <md-dialog-actions class="custom-date-picker-dialog-actions"\n                     layout="row">\n    <span flex></span>\n    <md-button ng-click="ctrl.mdDialog.cancel()"\n               class="custom-date-picker-dialog-button">\n      CANCEL\n    </md-button>\n    <md-button ng-click="ctrl.mdDialog.hide(ctrl.getSelection())"\n               ng-disabled="!ctrl.isDialogValid(archive)"\n               class="custom-date-picker-dialog-button">\n      OK\n    </md-button>\n  </md-dialog-actions>\n</md-dialog>\n'),
    a.put("/components/pickers/custom-date-picker-directive.html", '<ng-include src="\'/components/pickers/custom-date-picker-desktop.html\'"\n            ng-if="$root.globals.isDesktopMode">\n</ng-include>\n\n<ng-include src="\'/components/pickers/custom-date-picker-mobile.html\'"\n            ng-if="$root.globals.isMobileMode">\n</ng-include>\n'),
    a.put("/components/pickers/custom-date-picker-mobile.html", '<md-item ng-repeat="option in sortedOptions"\n         ng-click="changeHandler(option)"\n         ng-show="option.id != (isWebSearch ? \'all_2008\' : \'all\')">\n  {{ option.name }}\n</md-item>\n'),
    a.put("/components/pickers/hierarchy-picker-desktop.html", '<div class="hierarchy-select ng-pristine ng-valid"\n     ng-click="focus()"\n     ng-style="{\'visibility\': hasFocus ? \'hidden\' : \'visible\'}">\n  <div class="_md-select-value _md-select-placeholder">\n    <span>{{ ctrl.getSelectedNode().name }}</span>\n    <span class="_md-select-icon" aria-hidden="true"></span>\n  </div>\n</div>\n\n<div class="hierarchy-autocomplete" ng-show="hasFocus">\n  <md-autocomplete\n      md-no-cache="true"\n      md-search-text="ctrl.searchQuery"\n      md-items="node in ctrl.getResults(ctrl.searchQuery)"\n      md-selected-item-change="node && (ctrl.setSelectedNode(node.id) || blur())"\n      md-item-text="node.name"\n      md-min-length="0">\n    <md-item-template>\n      <div class="hierarchy-picker-root"\n           ng-if="node.isRoot">\n        <md-icon\n            class="hierarchy-picker-back flip-rtl"\n            md-svg-src="{{ $root.config.staticPathPrefix }}/ic_arrow_back_24px.svg"\n            ng-click="ctrl.zoomIntoNode(node.parent.id, $event);">\n        </md-icon>\n\n        <div class="hierarchy-picker-label">{{ node.name }}</div>\n      </div>\n\n      <div class="hierarchy-picker-node"\n           ng-if="!node.isRoot">\n        <div class="hierarchy-picker-label">\n          <span ng-repeat="parentID in node.parentsIds"\n                ng-if="showBreadcrumbs && ctrl.searchQuery">\n            {{ parentID }}\n\n            <md-icon\n                class="hierarchy-picker-label-separator flip-rtl"\n                md-svg-src="{{ $root.config.staticPathPrefix }}/ic_keyboard_arrow_right_24px.svg">\n            </md-icon>\n          </span>\n\n          <span md-highlight-text="ctrl.searchQuery"\n                md-highlight-flags="^i">\n            {{ node[\'name\'] }}\n          </span>\n        </div>\n\n        <md-icon\n            class="hierarchy-picker-zoom flip-rtl"\n            md-svg-src="{{ $root.config.staticPathPrefix }}/ic_keyboard_arrow_right_24px.svg"\n            ng-click="ctrl.zoomIntoNode(node.id, $event);"\n            ng-if="!$root.globals.isTouchDevice() && node.id && node.children.length > 0">\n        </md-icon>\n      </div>\n    </md-item-template>\n  </md-autocomplete>\n</div>\n'),
    a.put("/components/pickers/hierarchy-picker-directive.html", '<ng-include src="\'/components/pickers/hierarchy-picker-desktop.html\'"\n            ng-if="$root.globals.isDesktopMode">\n</ng-include>\n\n<ng-include src="\'/components/pickers/hierarchy-picker-mobile.html\'"\n            ng-if="$root.globals.isMobileMode">\n</ng-include>\n'),
    a.put("/components/pickers/hierarchy-picker-mobile.html", '<md-item ng-repeat="node in ctrl.dataTree.iterator()"\n         ng-click="ctrl.setSelectedNode(node.id, true)">\n  {{ node.name }}\n</md-item>\n'),
    a.put("/components/search/autocomplete-directive.html", '<md-icon class="search-button search-button-desktop"\n         md-svg-src="{{config.staticPathPrefix}}/ic_search_24px.svg">\n</md-icon>\n<md-autocomplete\n    placeholder="' + c("Explore topics") + '"\n    md-selected-item="acSelectedItem"\n    md-search-text="searchServ.lastInput"\n    md-items="item in getAutoCompleteList(searchServ.lastInput)"\n    md-item-text="item.title"\n    md-min-length="2"\n    md-no-cache="disableCache"\n    md-search-text-change="textChangeHandler()"\n    md-menu-class="{{::menuClass}}"\n    md-delay="300">\n  <md-item-template>\n    <div class="autocomplete-entity autocomplete-title">{{ item.title }}</div>\n    <div class="autocomplete-entity autocomplete-desc">{{ item.type }}</div>\n  </md-item-template>\n</md-autocomplete>\n<md-icon class="search-button search-clear-button" ng-if="searchServ.lastInput"\n         md-svg-src="{{config.staticPathPrefix}}/ic_close_24px.svg"\n         ng-click="clearInput()">\n</md-icon>\n'),
    a.put("/components/search/search-dialog.html", '\x3c!-- The click-close attribute is used to identify event target elements that close\n     the md-dialog, see search-dialog-controller.js --\x3e\n<md-dialog class="search-dialog" ng-click="ctrl.cancelDialog($event)"\n           click-close aria-label="Explore topics dialog">\n  <div class="search-dialog-wrapper search-autocomplete">\n    \x3c!-- The mobileSearchAutocomplete id is used to do an element query in search-directive.js --\x3e\n    <autocomplete></autocomplete>\n  </div>\n\n  \x3c!-- The click-close attribute is used to identify event target elements that close\n       the md-dialog, see search-dialog-controller.js --\x3e\n  <a class="search-button search-dialog-button" ng-click="ctrl.cancelDialog($event)">\n    <md-icon class="flip-rtl" click-close md-svg-src="{{ctrl.config.staticPathPrefix}}/ic_arrow_back_24px.svg"></md-icon>\n  </a>\n</md-dialog>\n'),
    a.put("/components/search/search-directive.html", '\x3c!-- START Desktop - this section is only visible on desktop using CSS media query. --\x3e\n<autocomplete></autocomplete>\n\x3c!-- END Desktop - this section is only visible on desktop using CSS media query. --\x3e\n\x3c!-- START Mobile - this section is only visible on mobile using CSS media query. --\x3e\n<md-button class="md-icon-button md-no-ink search-button search-button-mobile"\n           aria-label="' + c("Search") + '"\n           ng-click="showMobileSearchDialog()">\n  <md-icon md-svg-icon="{{config.staticPathPrefix}}/ic_search_24px.svg">\n  </md-icon>\n</md-button>\n\x3c!-- END Mobile - this section is only visible on mobile using CSS media query. --\x3e\n'),
    a.put("/components/share/item-action-modal-yis.html", '<md-bottom-sheet class="share-dialog">\n  <md-content class="yis-content-wrapper">\n    <md-subheader class="share-dialog-title yis-2016-title">\n     {{ctrl.selectedWidgetItem}}\n    </md-subheader>\n    <div class="share-dialog-content">\n      <button class="share-dialog-content-element" ng-click="ctrl.exploreItem()">\n        <md-icon md-svg-src="{{ctrl.config.staticPathPrefix}}/timeline_icon.svg"\n                 class="story-share-social-icon"\n                 alt="' + c("Explore") + '">\n        </md-icon>\n        <span>Explore\n        </span>\n      </button>\n      <button class="share-dialog-content-element"\n              ng-click="ctrl.searchItem()">\n        <md-icon md-svg-src="{{ctrl.config.staticPathPrefix}}/search_icon.svg"\n                 class="story-share-social-icon"\n                 alt="' + c("Search on Google") + '">\n        </md-icon>\n        <span>Search on Google\n        </span>\n      </button>\n    </div>\n  </md-content>\n</md-bottom-sheet>\n'),
    a.put("/components/share/share-directive.html", '<md-button class="story-share md-icon-button"\n           aria-label="' + c("Share") + '"\n           ng-click="openDialog()" md-no-ink="true"\n           track="[\'Story\', \'Share\', \'Open\']">\n  <md-icon md-svg-src="{{ $root.config.staticPathPrefix }}/ic_share_white_24dp.svg"\n           class="story-share-image"\n           alt="' + c("Share") + '">\n  </md-icon>\n</md-button>\n'),
    a.put("/components/share/share-modal-desktop.html", '<md-dialog class="share-dialog" ng-init="track = ctrl.track">\n  <md-content>\n    <md-subheader class="share-dialog-title">\n      Share\n    </md-subheader>\n\n    <loader ng-if="ctrl.isQuerying"></loader>\n\n    <ng-include ng-if="!ctrl.isQuerying"\n                src="\'/components/share/share-networks.html\'">\n    </ng-include>\n  </md-content>\n\n  <div class="md-dialog-actions" layout="row">\n    <a ng-click="ctrl.hideModal()" class="share-dialog-button">\n      Cancel\n    </a>\n  </div>\n</md-dialog>\n'),
    a.put("/components/share/share-modal-mobile-yis.html", '<md-bottom-sheet class="share-dialog" ng-init="track = ctrl.track">\n  <md-content class="yis-content-wrapper">\n    <md-subheader class="share-dialog-title yis-2016-title">\n      {{ctrl.widgetTitle}}\n    </md-subheader>\n    <loader ng-if="ctrl.isQuerying"></loader>\n    <div class="share-dialog-content" ng-if="!ctrl.isShareClicked">\n      <button class="share-dialog-content-element"\n              ng-click="ctrl.isShareClicked =! ctrl.isShareClicked">\n        <md-icon md-svg-src="{{ctrl.config.staticPathPrefix}}/ic_share_grey.svg"\n                 class="story-share-social-icon">\n        </md-icon>\n        <span>Share</span>\n      </button>\n      <button class="share-dialog-content-element"\n              ng-click="ctrl.copyToClipBoardDialog()">\n        <md-icon md-svg-src="{{ctrl.config.staticPathPrefix}}/copy-content.svg"\n                 class="story-share-social-icon">\n        </md-icon>\n        <span>Copy to clipboard</span>\n      </button>\n    </div>\n    <ng-include ng-if="!ctrl.isQuerying && ctrl.isShareClicked"\n                src="\'/components/share/share-networks.html\'">\n    </ng-include>\n  </md-content>\n</md-bottom-sheet>\n'),
    a.put("/components/share/share-modal-mobile.html", '<md-bottom-sheet class="share-dialog" ng-init="track = ctrl.track">\n  <md-content>\n    <md-subheader class="share-dialog-title">\n      Share\n    </md-subheader>\n\n    <loader ng-if="ctrl.isQuerying"></loader>\n\n    <ng-include ng-if="!ctrl.isQuerying"\n                src="\'/components/share/share-networks.html\'">\n    </ng-include>\n  </md-content>\n</md-bottom-sheet>\n'),
    a.put("/components/share/share-networks.html", '<div ng-repeat="network in ctrl.networks"\n     ng-init="displayName = network.config.displayName"\n     class="share-dialog-content">\n  <button class="share-dialog-content-element"\n          ng-click="ctrl.dispatchNetwork(network)"\n          track="[\'Story\', \'Desktop Share\', displayName]">\n    <md-icon md-svg-src="{{:: network.getIconAbsPath()}}"\n        class="story-share-social-icon"\n        alt="' + c("Share") + '">\n    </md-icon>\n    <span bidi="displayName"></span>\n  </button>\n</div>\n'),
    a.put("/components/stories/featured-story-directive.html", '<div class="featured-story-container"\n     ng-style="{\'direction\': getFeaturedDirection()}">\n  <a href="story/{{::id}}" class="featured-story">\n    <div class="featured-story-title-container">\n      <div class="featured-story-title-text"\n           bidi="storyTitleArray.length ? storyTitleArray : storyTitle"></div>\n    </div>\n    <div class="featured-story-mobile-link">\n      <md-icon md-svg-src="{{::config.staticPathPrefix}}/ic_arrow_forward_24px.svg"\n               class="featured-story-mobile-arrow flip-rtl">\n      </md-icon>\n      Explore story\n    </div>\n    <trends-widget data="widget"\n                   template="fe_featured"\n                   story-id="{{::id}}"\n                   ng-if="globals.isDesktopMode">\n    </trends-widget>\n  </a>\n</div>\n'),
    a.put("/components/stories/trending-story-directive.html", '<div class="trending-story-wrapper">\n  <a class="trending-story"\n     ng-href="{{::$root.config.pathPrefix}}/story/{{::id}}{{isEmbedStories? \'?utm_source=crowdtangle\' : \'\'}}"\n     track="[\'Home\', \'Trending\', \'Click\', $parent.$index + 1]"\n     target="{{isEmbedStories ? \'_blank\' : \'\'}}">\n    <div class="index"></div>\n    <div class="title" bidi="storyTitleArray.length ? storyTitleArray : storyTitle"></div>\n    <div class="article-data"\n         ng-if="showNewsSnippet && storyArticles.length > 0">\n      <div class="article-item"\n           ng-repeat="article in storyArticles | limitTo: 1"\n           ng-init="articleTitle = htmlToPlainText(article.articleTitle)">\n        <span class="article-data-title" bidi="articleTitle"></span><span>, {{ article.source }}</span><span>, {{ article.time }}</span>\n      </div>\n    </div>\n    <sparkline\n        service-bind="sparklineService.getSparkline(id)"\n        thickness="{{ $root.globals.isDesktopMode ? 2 : 1.5 }}"\n        width="{{ sparklineSize[0] }}"\n        height="{{ sparklineSize[1] }}"\n        ng-class="{\'no-image\': hideImage}">\n      <p class="fe-atoms-generic-hide-in-mobile spark-line-label">\n        Past 24h\n      </p>\n    </sparkline>\n  </a>\n  <a class="image-wrapper"\n     ng-class="::{\'empty-url\': !newsUrl}"\n     ng-href="{{::newsUrl}}"\n     target="_blank"\n     ng-if="$root.globals.isDesktopMode && !hideImage">\n    <img class="image fe-atoms-generic-hide-in-mobile"\n         ng-src="{{::imageUrl}}"\n         alt="{{::storyTitle}}"\n         width="96"\n         height="96"\n         ng-if="imageUrl"/>\n    <div class="image image-placeholder-wrapper"\n         ng-if="!imageUrl">\n      <div class="image-placeholder"></div>\n    </div>\n\n    <div class="image-source-label fe-atoms-generic-hide-in-mobile"\n         bidi="imageSource" ng-if="imageUrl">\n      {{imageSource}}\n    </div>\n  </a>\n</div>\n'),
    a.put("/components/video/video-directive.html", '<button class="video-overlay-play-button"\n   ng-click="play()"\n   track="[\'Story\', \'Video\', \'Play\']">\n  <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_play_circle_outline_white_24dp.svg"\n      alt="' + c("Play.") + '">\n  </md-icon>\n</button>\n'),
    a.put("/components/video/video.html", '<div class="video-overlay-dialog video-overlay-dialog-closed">\n  <div class="video-overlay-dialog-content">\n    <md-button class="video-overlay-close-button md-icon-button md-no-ink"\n               aria-label="' + c("Close") + '"\n               ng-click="$event.stopPropagation();$event.preventDefault();close();"\n               track="[\'Story\', \'Video\', \'Close\']">\n      <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_close_white_24dp.svg"\n               alt="' + c("Close") + '">\n      </md-icon>\n    </md-button>\n    <div id="player" width="100%" height="100%"></div>\n  </div>\n</div>\n'),
    a.put("/components/widgets/types/fe-expandable-list.html", '<widget\n    type="{{type}}"\n    version="{{version}}"\n    template="{{template}}"\n    on-event="onEvent({\'event\': event})"\n    id="{{anchorName}}"\n    embed="embed"\n    share="share"\n    is-prefetched="true"\n    generic-action="genericAction"\n    fields="[\n        {\'name\': \'topic\', \'value\': listTitle},\n        {\'name\': \'bullets\', \'values\': listItems}\n    ]"\n    story-id="storyId"\n    story-title="storyTitle"\n    story-title-array="storyTitleArray"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    story-number-of-items="storyNumberOfItems"\n    palette="widgetPalette"\n    forced-color="{{::forcedColor}}">\n</widget>\n'),
    a.put("/components/widgets/types/fe-generic.html", '<widget\n    type="{{widgetType}}"\n    version="{{version}}"\n    template="{{template}}"\n    fields="widgetFields"\n    apis="widgetExternalApis"\n    on-event="onEvent({\'event\': event})"\n    story-id="storyId"\n    story-title="storyTitle"\n    story-title-array="storyTitleArray"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    story-number-of-items="storyNumberOfItems"\n    show-mode-picker="false"\n    widget-is-curated="data.isCurated"\n    embed="embed"\n    share="share"\n    generic-action="genericAction"\n    palette="widgetPalette"\n    forced-color="{{::forcedColor}}">\n</widget>\n'),
    a.put("/components/widgets/types/fe-geo-chart-explore.html", "<widget\n    type=\"fe_geo_chart\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    embed=\"embed\"\n    share=\"share\"\n    export=\"export\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'region', 'value': geo},\n        {'name': 'resolution', 'value': resolution},\n        {'name': 'searchVolumeIndexLabel', 'value': searchInterestLabel},\n        {'name': 'color', 'value': color},\n        {'name': 'displayMode', 'value': displayMode}\n    ]\"\n    apis=\"[\n        {\n          'name': 'fe_geo_compared_map',\n          'url': config.pathPrefix + '/api/widgetdata/comparedgeo',\n          'params': {'req': request, 'token': token}\n        }\n    ]\"\n    story-title=\"storyTitle\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    palette=\"widgetPalette\"\n    forced-color=\"{{::forcedColor}}\"\n    help-dialog=\"helpDialog\">\n</widget>\n"),
    a.put("/components/widgets/types/fe-geo-chart.html", "<widget\n    type=\"{{type}}\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    embed=\"embed\"\n    share=\"share\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'region', 'value': geo},\n        {'name': 'resolution', 'value': resolution},\n        {'name': 'searchVolumeIndexLabel', 'value': searchInterestLabel},\n        {'name': 'displayMode', 'value': displayMode}\n    ]\"\n    apis=\"[\n        {\n          'name': 'fe_geomap',\n          'url': config.pathPrefix + '/api/widgetdata/geomap',\n          'params': {'req': request, 'token': token}\n        }\n    ]\"\n    story-id=\"storyId\"\n    story-title=\"storyTitle\"\n    story-title-array=\"storyTitleArray\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    story-number-of-items=\"storyNumberOfItems\"\n    palette=\"widgetPalette\"\n    forced-color=\"{{::forcedColor}}\">\n</widget>\n"),
    a.put("/components/widgets/types/fe-geo-color-chart.html", "<widget\n    type=\"{{type}}\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    embed=\"embed\"\n    share=\"share\"\n    export=\"export\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'region', 'value': geo},\n        {'name': 'resolution', 'value': resolution},\n        {'name': 'searchVolumeIndexLabel', 'value': searchInterestLabel},\n        {'name': 'displayMode', 'value': displayMode},\n        {'name': 'showLegend', 'value': showLegend},\n        {'name': 'bullets', 'value': bullets}\n    ]\"\n    apis=\"[\n        {\n          'name': 'fe_geo_color_map',\n          'url': config.pathPrefix + '/api/widgetdata/comparedgeo',\n          'params': {'req': request, 'token': token}\n        }\n    ]\"\n    story-title=\"storyTitle\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    palette=\"widgetPalette\"\n    forced-color=\"{{::forcedColor}}\"\n    help-dialog=\"helpDialog\">\n</widget>\n"),
    a.put("/components/widgets/types/fe-int-over-time.html", "<widget\n    type=\"{{type}}\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    embed=\"embed\"\n    share=\"share\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'barAnnotationText', 'value': barAnnotationText},\n        {'name': 'lineAnnotationText', 'value': lineAnnotationText},\n        {'name': 'sumAnnotationText', 'value': sumAnnotationText},\n        {'name': 'barData', 'value': barData}\n    ]\"\n    apis=\"[\n        {\n          'name': 'fe_intovertime',\n          'url': config.pathPrefix + '/api/widgetdata/timeline',\n          'params': {'req': request, 'tz': config.userTimezoneOffset, 'token': token}\n        }\n    ]\"\n    story-id=\"storyId\"\n    story-title=\"storyTitle\"\n    story-title-array=\"storyTitleArray\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    story-number-of-items=\"storyNumberOfItems\"\n    palette=\"widgetPalette\"\n    forced-color=\"{{::forcedColor}}\">\n</widget>\n"),
    a.put("/components/widgets/types/fe-line-chart.html", "<widget\n    type=\"fe_line_chart\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    embed=\"embed\"\n    share=\"share\"\n    export=\"export\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'lineAnnotationText', 'value': lineAnnotationText},\n        {'name': 'bullets', 'value': bullets},\n        {'name': 'showLegend', 'value': showLegend},\n        {'name': 'showAverages', 'value': showAverages},\n        {'name': 'color', 'value': color},\n    ]\"\n    apis=\"[\n        {\n          'name': 'fe_line',\n          'url': config.pathPrefix + '/api/widgetdata/multiline',\n          'params': {'req': request, 'tz': config.userTimezoneOffset, 'token': token}\n        }\n    ]\"\n    story-title=\"storyTitle\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    palette=\"widgetPalette\"\n    forced-color=\"{{::forcedColor}}\"\n    help-dialog=\"helpDialog\">\n</widget>\n\n"),
    a.put("/components/widgets/types/fe-list.html", '<widget\n    type="{{type}}"\n    version="{{version}}"\n    template="{{template}}"\n    on-event="onEvent({\'event\': event})"\n    embed="embed"\n    share="share"\n    fields="[\n        {\'name\': \'topic\', \'value\': list.title},\n        {\'name\': \'subTopic\', \'value\': list.subtitle},\n        {\'name\': \'bullets\', \'values\': list.item}\n    ]"\n    story-id="storyId"\n    story-title="storyTitle"\n    story-title-array="storyTitleArray"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    story-number-of-items="storyNumberOfItems"\n    palette="widgetPalette"\n    forced-color="{{::forcedColor}}">\n</widget>\n'),
    a.put("/components/widgets/types/fe-multi-range-chart.html", "<widget\n    type=\"fe_line_chart\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    embed=\"embed\"\n    share=\"share\"\n    export=\"export\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'lineAnnotationText', 'value': lineAnnotationText},\n        {'name': 'bullets', 'value': bullets},\n        {'name': 'showLegend', 'value': showLegend},\n        {'name': 'showAverages', 'value': showAverages},\n    ]\"\n    apis=\"[\n        {\n          'name': 'fe_line_multi_range',\n          'url': config.pathPrefix + '/api/widgetdata/multirange',\n          'params': {'req': request, 'tz': config.userTimezoneOffset, 'token': token}\n        }\n    ]\"\n    story-title=\"storyTitle\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    palette=\"widgetPalette\"\n    forced-color=\"{{::forcedColor}}\"\n    help-dialog=\"helpDialog\">\n</widget>\n\n"),
    a.put("/components/widgets/types/fe-related-queries.html", '<widget\n    type="{{type}}"\n    version="{{version}}"\n    template="{{template}}"\n    on-event="onEvent({\'event\': event})"\n    embed="embed"\n    share="share"\n    export="export"\n    fields="[\n        {\'name\': \'topic\', \'value\': title},\n    ]"\n    apis="[\n        {\n          \'name\': \'fe_relatedqueries\',\n          \'url\': config.pathPrefix + \'/api/widgetdata/relatedqueries\' + \'?token=\' + token,\n          \'params\': request\n        }\n    ]"\n    story-id="storyId"\n    story-title="storyTitle"\n    story-title-array="storyTitleArray"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    story-number-of-items="storyNumberOfItems"\n    show-mode-picker="false"\n    palette="palette"\n    forced-color="{{::forcedColor}}">\n</widget>\n'),
    a.put("/components/widgets/types/fe-related-searches.html", '<widget\n    type="fe_related_queries"\n    version="{{version}}"\n    template="{{template}}"\n    on-event="onEvent({\'event\': event})"\n    embed="embed"\n    share="share"\n    export="export"\n    fields="[\n        {\'name\': \'topic\', \'value\': title},\n        {\'name\': \'color\', \'value\': color}\n    ]"\n    apis="[\n        {\n          \'name\': \'fe_relatedsearches\',\n          \'url\': config.pathPrefix + \'/api/widgetdata/relatedsearches\',\n          \'params\': {\'req\': request, \'token\': token}\n        }\n    ]"\n    story-title="storyTitle"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    show-mode-picker="true"\n    palette="palette"\n    forced-color="{{::forcedColor}}"\n    help-dialog="helpDialog">\n</widget>\n'),
    a.put("/components/widgets/types/fe-related-topics.html", '<widget\n    type="{{type}}"\n    version="{{version}}"\n    template="{{template}}"\n    on-event="onEvent({\'event\': event})"\n    fields="[\n        {\'name\': \'topic\', \'value\': title}\n    ]"\n    apis="[\n        {\n          \'name\': \'fe_relatedtopics\',\n          \'url\': config.pathPrefix + \'/api/widgetdata/relatedtopics\',\n          \'params\': {\'req\': request, \'token\': token}\n        }\n    ]"\n    story-id="storyId"\n    story-title="storyTitle"\n    story-title-array="storyTitleArray"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    story-number-of-items="storyNumberOfItems">\n</widget>\n'),
    a.put("/components/widgets/types/fe-text.html", '<widget\n    type="{{type}}"\n    version="{{version}}"\n    template="{{template}}"\n    on-event="onEvent({\'event\': event})"\n    fields="[\n        {\'name\': \'content\', \'value\': text.text},\n        {\'name\': \'url\', \'value\': url}\n\n    ]"\n    story-id="storyId"\n    story-title="storyTitle"\n    story-title-array="storyTitleArray"\n    story-country="storyCountry"\n    story-time-range="storyTimeRange"\n    story-number-of-items="storyNumberOfItems">\n</widget>\n'),
    a.put("/components/widgets/types/fe-top-news.html", "<widget\n    type=\"{{type}}\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'more_articles_link', 'value': newsClusterLinkUrl},\n        {'name': 'bullets', 'values': arrayMap(articles, {\n            'title': 'title',\n            'imageUrl': 'image',\n            'source': 'source',\n            'time': 'time',\n            'url': 'link'\n        })}\n    ]\"\n    story-id=\"storyId\"\n    story-title=\"storyTitle\"\n    story-title-array=\"storyTitleArray\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    story-number-of-items=\"storyNumberOfItems\">\n</widget>\n"),
    a.put("/components/widgets/types/fe-video.html", "<widget\n    type=\"{{type}}\"\n    version=\"{{version}}\"\n    template=\"{{template}}\"\n    on-event=\"onEvent({'event': event})\"\n    fields=\"[\n        {'name': 'topic', 'value': title},\n        {'name': 'description', 'value': videoTitle},\n        {'name': 'videoUrl', 'value': embedUrl},\n        {'name': 'imageUrl', 'values': imageUrl},\n        {'name': 'owner', 'values': owner},\n        {'name': 'ownerUrl', 'values': ownerUrl},\n        {'name': 'localViews', 'values': localViews},\n        {'name': 'date', 'values': date},\n        {'name': 'globalViews', 'values': globalViews}\n    ]\"\n    story-id=\"storyId\"\n    story-title=\"storyTitle\"\n    story-title-array=\"storyTitleArray\"\n    story-country=\"storyCountry\"\n    story-time-range=\"storyTimeRange\"\n    story-number-of-items=\"storyNumberOfItems\">\n</widget>\n"),
    a.put("/explorepage/explore-mobile-hub-dialog.html", '<md-dialog class="explore-hub-dialog">\n  <md-toolbar class="explore-hub-dialog-toolbar" layout="row" layout-align="start center">\n    <a class="explore-hub-dialog-close"\n       ng-click="ctrl.activeFilter ? ctrl.activeFilter = \'\' : ctrl.closeDialog()">\n      <md-icon class="flip-rtl"\n               md-svg-src="{{ $root.config.staticPathPrefix }}/ic_arrow_back_24px.svg">\n      </md-icon>\n    </a>\n\n    <div ng-hide="ctrl.activeFilter" class="explore-hub-dialog-title">\n      Filter\n      <span ng-if="individualSearchTerm"\n            class="search-term-title">\n        {{ individualSearchTerm }}\n      </span>\n    </div>\n\n    <span ng-if="ctrl.activeFilter">\n      {{ ctrl.getTitleByPicker(ctrl.activeFilter) }}\n    </span>\n  </md-toolbar>\n\n  <md-content class="explore-hub-dialog-content">\n    <md-list class="explore-hub-dialog-list" ng-hide="ctrl.activeFilter">\n      <md-item\n          ng-repeat="pickerName in visiblePickers"\n          ng-click="ctrl.activeFilter = pickerName"\n          ng-if="ctrl.pickersData[pickerName]">\n        {{ ctrl.messages[\'MSG_\' + pickerName.toUpperCase()] }}\n        <span>{{ ctrl.getTitleByPicker(pickerName) }}</span>\n      </md-item>\n    </md-list>\n\n    <md-list class="explore-hub-dialog-list" ng-show="ctrl.activeFilter">\n      <hierarchy-picker\n          data="ctrl.pickersData.category"\n          ng-model="ctrl.scope.ngModelCategory"\n          on-change="ctrl.applyChanges()"\n          ng-show="ctrl.activeFilter == \'category\'"\n          ng-if="ctrl.pickersData.category">\n      </hierarchy-picker>\n\n      <hierarchy-picker\n          data="ctrl.pickersData.geo"\n          ng-model="ctrl.scope.ngModelGeo"\n          on-change="ctrl.applyChanges()"\n          ng-show="ctrl.activeFilter == \'geo\'"\n          ng-if="ctrl.pickersData.geo">\n      </hierarchy-picker>\n\n      <custom-date-picker\n          is-web-search="isWebSearch"\n          ng-show="ctrl.activeFilter == \'period\'"\n          ng-model="ctrl.scope.ngModelPeriod"\n          on-change="ctrl.applyChanges()"\n          options="ctrl.pickersData.period"\n          ng-if="ctrl.pickersData.period">\n      </custom-date-picker>\n\n      <md-item\n          ng-show="ctrl.activeFilter == \'property\'"\n          ng-repeat="property in ctrl.pickersData.property.iterator()"\n          ng-if="ctrl.pickersData.property"\n          ng-click="ctrl.checkClick(!hasRealTime || property.id == \'\', ctrl.scope, property.id)">\n        {{ property.name }}\n      </md-item>\n    </md-list>\n  </md-content>\n</md-dialog>\n'),
    a.put("/explorepage/explore-mobile-hub-directive.html", '<div class="explore-hub-toolbar" ng-click="ctrl.openDialog()">\n  <md-button class="explore-hub-button md-icon-button md-no-ink">\n    <md-icon md-svg-icon="{{ $root.config.staticPathPrefix }}/ic_filter_list_24px.svg"></md-icon>\n  </md-button>\n\n  <div class="explore-hub-legend">\n    <div class="explore-hub-legend-item"\n         ng-repeat="pickerName in visibleLegendPickers"\n         ng-if="visibleLegendPickers && visibleLegendPickers.length > 0 && ctrl.pickersData[pickerName]">\n      <span ng-if="$index > 0">, </span>\n      {{ ctrl.getTitleByPicker(pickerName) }}\n    </div>\n\n    <span ng-if="visibleLegendPickers && visibleLegendPickers.length == 0 && !individualSearchTerm">\n      More filters\n    </span>\n    <span ng-if="individualSearchTerm">\n      Change filters\n    </span>\n  </div>\n</div>\n'),
    a.put("/explorepage/explore-pills-directive.html", '<div class="content-wrap">\n  <div class="compare-term-container"\n       ng-repeat="term in terms">\n    <explore-search-term\n        ng-class="{\'small-pill\': ctrl.isSmallPill()}"\n        term="term"\n        term-change-handler="ctrl.updateSearchTerm(entity, $index)"\n        reset-filters-handler="resetFiltersHandler()"\n        is-global-filters-mode="isGlobalFiltersMode"\n        is-web-search="isWebSearch"\n        is-small-pills-mode="ctrl.isSmallPill()"\n        is-single="terms.length === 1"\n        tab-handler="ctrl.handleTabKey($index)"\n        color="{{ colors[$index] }}">\n    </explore-search-term>\n  </div>\n  <md-button class="compare-term-container add-term-button pill-outline"\n             aria-label="' + c("Add a search term for comparison") + '"\n             ng-class="{\'centered-add-term-button\': !($root.globals.isMobileMode || ctrl.showTextOnAddTermButton())}"\n             ng-click="ctrl.addSearchTerm()"\n             ng-if="ctrl.showAddTermButton()">\n    <md-icon class="add-term-icon"\n             md-svg-src="{{config.staticPathPrefix}}/ic_plus_sign_grey.svg">\n    </md-icon>\n      <span class="add-term-text"\n            ng-if="$root.globals.isMobileMode || ctrl.showTextOnAddTermButton()">\n        <span ng-show="terms.length <= 1">\n          Compare\n        </span>\n        <span ng-show="terms.length > 1">\n          Add comparison\n        </span>\n      </span>\n  </md-button>\n</div>\n'),
    a.put("/explorepage/explorepage.html", '<header class="explore-header"\n        background-image="{{::ctrl.bannerImgUrl}}"\n        page-sub-title="{{ ctrl.model.terms.length > 1 ?\n            ctrl.messages.MSG_COMPARE : ctrl.messages.MSG_EXPLORE }}"\n        enable-search="false"\n        share-config="ctrl.shareConfig">\n  <div class="explore-back-button-wrapper"\n       class="olympics-carousel-link" ng-if="ctrl.storyId">\n    <a class="back-button-link-wrapper"\n       href="{{::config.pathPrefix }}/story/{{ctrl.storyId}}">\n      <md-icon md-svg-src="{{::config.staticPathPrefix}}/ic_arrow_back_24px.svg"\n               class="explore-back-button-arrow flip-rtl">\n      </md-icon>\n      <div class="explore-back-button-text">{{ctrl.storyTitle}}</div>\n    </a>\n  </div>\n  <div class="explore-internal-note"\n       ng-if="ctrl.showExploreInternalNote">\n    CONFIDENTIAL: Google Only.  Do not share externally, do not screenshot.\n  </div>\n  <div class="explorepage-content-header">\n    <explore-pills\n      ng-if="!(ctrl.model.isDefaultData && ctrl.model.terms.length &&\n              ctrl.model.terms[0].selectedTerm.mid)"\n      class="compare-terms explore-header-wrapper"\n      ng-keypress="ctrl.showExamples = false"\n      terms="ctrl.model.terms"\n      reset-filters-handler="ctrl.resetFilters()"\n      is-global-filters-mode="ctrl.isGlobalFiltersMode"\n      create-term-object="ctrl.createTermObject(term, geo, date, isFocus)"\n      pill-filters-change-handler="ctrl.handlePillFiltersUpdate(entity)"\n      is-web-search="ctrl.isWebSearch">\n    </explore-pills>\n    <div class="explorepage-examples-wrapper"\n          ng-if="globals.isDesktopMode && ctrl.showExamples && ctrl.examples.length">\n      <div class="explorepage-examples-container">\n        <div class="explorepage-examples-toolbar">\n          <div class="explorepage-examples-arrow"></div>\n          Start with an example\n          <md-icon class="explorepage-examples-close"\n                    ng-click="ctrl.showExamples = false"\n                    md-svg-src="{{config.staticPathPrefix}}/ic_close_white_24dp.svg"\n                    alt="' + c("Close") + '">\n          </md-icon>\n        </div>\n        <carousel tracking-name="Explorepage Examples"\n                  class="explorepage-examples-carousel"\n                  layout="row">\n          <a class="explorepage-examples-carousel-widget-wrapper"\n              ng-repeat="example in ctrl.examples"\n              ng-href="{{::config.pathPrefix + example.url}}">\n            <trends-widget data="example.widget"\n                            story-title-array="::example.bullets"\n                            template="fe_explore_example">\n            </trends-widget>\n          </a>\n        </carousel>\n      </div>\n    </div>\n\n    <div class="compare-pickers-wrapper explore-header-wrapper"\n          ng-if="globals.isDesktopMode && ctrl.geoOptions && ctrl.categoryOptions">\n      <div class="compare-pickers content-wrap">\n        \x3c!--Geo picker--\x3e\n        <hierarchy-picker\n            class="compare-picker"\n            data="ctrl.geoOptions"\n            ng-model="ctrl.model.geo"\n            on-change="ctrl.onGlobalFilterChange()"\n            show-breadcrumbs="true"\n            ng-if="ctrl.isGlobalFiltersMode">\n        </hierarchy-picker>\n\n        \x3c!--Time period picker--\x3e\n        <custom-date-picker\n            class="compare-picker"\n            is-web-search="ctrl.isWebSearch"\n            md-container-class="explore-select-dropdown"\n            append-custom="true"\n            ng-if="ctrl.isGlobalFiltersMode"\n            ng-model="ctrl.model.period"\n            on-change="ctrl.onGlobalFilterChange()"\n            options="ctrl.periodOptions">\n        </custom-date-picker>\n\n        \x3c!--Category picker--\x3e\n        <hierarchy-picker\n            class="compare-picker"\n            data="ctrl.categoryOptions"\n            ng-model="ctrl.model.category">\n        </hierarchy-picker>\n\n        \x3c!--Search property picker--\x3e\n        <md-select\n            class="explore-select compare-picker"\n            md-container-class="explore-select-dropdown"\n            ng-model="ctrl.model.property"\n            aria-label="Select stories location">\n          <md-option class="top-selector-option" ng-value="search.id"\n                    ng-repeat="search in ctrl.propertyOptions.iterator() |\n                        OrderBySelectedOptionFilter: ctrl.model.property"\n                    ng-disabled="ctrl.hasRealTime && search.id != \'\'">\n            {{ search.name }}\n          </md-option>\n        </md-select>\n      </div>\n    </div>\n\n    <explore-mobile-hub\n        is-web-search="ctrl.isWebSearch"\n        has-real-time="ctrl.hasRealTime"\n        ng-model-geo="ctrl.model.geo"\n        ng-model-period="ctrl.model.period"\n        ng-model-category="ctrl.model.category"\n        ng-model-property="ctrl.model.property"\n        visible-pickers="ctrl.mobileHubVisiblePickers"\n        visible-legend-pickers="ctrl.mobileHubLegendPickers"\n        show-legend="true"\n        ng-if="globals.isMobileMode"\n        on-change="ctrl.onGlobalFilterChange()">\n    </explore-mobile-hub>\n  </div>\n</header>\n\n<loader ng-if="ctrl.isQuerying"></loader>\n\n<error error-message="ctrl.errorMessage"\n       is-empty-state="ctrl.isEmptyState">\n</error>\n\n<md-content class="explorepage-content content" ng-if="ctrl.widgets.length && !ctrl.isQuerying">\n  <div class="content-wrap">\n    <div class="widget-container-wrapper" layout="row" layout-wrap>\n      <div ng-repeat="widget in ctrl.widgets"\n           flex="{{::widget.isLong ? 100 : 50}}"\n           class="widget-container">\n        <div id="{{::widget.id}}" class="widget-anchor"></div>\n\n        <trends-widget\n            data="widget"\n            explore-params-getter="ctrl.createRequestParams()"\n            share-title-getter="ctrl.generateWidgetShareTitle(widgetTitle)"\n            on-event="ctrl.onWidgetEvent(event, widget.index)"\n            export="ctrl.exploreService.exportAsCSV(widget.request, widget.token, widget.type)"\n            explore-query="ctrl.exploreUrl">\n        </trends-widget>\n      </div>\n    </div>\n  </div>\n</md-content>\n'),
    a.put("/explorepage/pills-autocomplete-template.html", '<md-autocomplete\n    ng-class="{\'show-filters\': showFilters}"\n    class="pill-outline"\n    placeholder="' + c("Add a search term") + '"\n    md-selected-item-change="onAutoCompleteSelect(item)"\n    md-search-text="$parent.acInputTextItem"\n    md-items="item in getAutoCompleteListBind(acInputTextItem, true)"\n    md-item-text="item && item.title"\n    md-min-length="2"\n    md-delay="300"\n    md-no-cache="false">\n  <md-item-template>\n    <div class="autocomplete-entity autocomplete-title">{{ item.title }}</div>\n    <div class="autocomplete-entity autocomplete-desc">{{ item.type }}</div>\n  </md-item-template>\n</md-autocomplete>\n'),
    a.put("/explorepage/search-term-autocomplete-mobile-dialog.html", '<md-dialog class="search-term-autocomplete-mobile-dialog"\n           aria-label="Search term autocomplete dialog">\n  <md-toolbar class="search-term-autocomplete-mobile-dialog-toolbar"\n              layout="row"\n              layout-align="start center">\n    \x3c!-- The click-close attribute is used to identify event target elements that close\n     the md-dialog, see search-term-autocomplete-mobile-dialog-controller.js --\x3e\n    <a class="search-term-autocomplete-mobile-dialog-close"\n       ng-click="ctrl.backArrowClickHandler($event)">\n      <md-icon class="flip-rtl"\n               md-svg-src="{{ctrl.config.staticPathPrefix}}/ic_arrow_back_24px.svg">\n      </md-icon>\n    </a>\n    <div class="search-term-autocomplete-mobile-dialog-title">\n      Compare\n    </div>\n  </md-toolbar>\n  <div class="search-term-autocomplete-mobile-dialog-autocomplete">\n    <ng-include src="\'/explorepage/pills-autocomplete-template.html\'">\n    </ng-include>\n  </div>\n</md-dialog>\n'),
    a.put("/explorepage/search-term-directive.html", '<div class="pill-mobile-overlay"\n     ng-if="$root.globals.isMobileMode"\n     ng-click="showSearchTermAutocompleteDialog()">\n</div>\n<div class="search-term-wrapper"\n     ng-class="{\'individual-filters-on\': !isGlobalFiltersMode, \'term-not-selected\': !term.selectedTerm.mid}">\n  <span ng-style="{\'color\': \' \' + color}"\n        class="search-term-bullet">\n    &bull;\n  </span>\n  <ng-include src="\'/explorepage/pills-autocomplete-template.html\'">\n  </ng-include>\n  \x3c!--Clear text button.--\x3e\n  <md-icon class="search-clear-button"\n           ng-if="$root.globals.isDesktopMode && acInputTextItem"\n           md-svg-src="{{config.staticPathPrefix}}/ic_close_24px.svg"\n           ng-click="clearInputBind()">\n  </md-icon>\n  <md-menu md-offset="{{optionsMenuOffset}}">\n    <div class="search-terms-options-menu-icon-button"\n         ng-click="openOptionsMenuBind($mdOpenMenu, $event)">\n      <md-icon class="search-term-actions"\n               ng-class="{\'show-search-term-actions\': isTouchDevice}"\n               md-menu-origin=""\n               ng-show="term.selectedTerm.mid"\n               md-svg-src="{{config.staticPathPrefix}}/more-vert.svg">\n      </md-icon>\n    </div>\n    <md-menu-content width="2"\n                     class="search-term-options-menu">\n      <md-menu-item>\n        <md-button ng-click="clearTermBind()">\n          <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_close_24px.svg"\n                   md-menu-align-target="">\n          </md-icon>\n          Remove\n        </md-button>\n      </md-menu-item>\n      <md-menu-item>\n        <md-button ng-click="editTermBind()">\n          <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_pencil_edit_sign_grey.svg"\n                   md-menu-align-target="">\n          </md-icon>\n          Edit\n        </md-button>\n      </md-menu-item>\n      <md-menu-item ng-if="!isSingle()">\n        <md-button ng-click="showFilterDialogBind($event)"\n                   ng-if="$root.globals.isDesktopMode">\n          <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_filter_list_24px.svg"\n                   md-menu-align-target="">\n          </md-icon>\n          Change filters\n        </md-button>\n        <explore-mobile-hub\n            class="individual-search-term-hub"\n            is-web-search="isWebSearch"\n            ng-model-geo="term.selectedGeo.geo"\n            ng-model-period="term.selectedPeriod.period"\n            ng-if="$root.globals.isMobileMode"\n            show-legend="!isGlobalFiltersMode"\n            visible-pickers="[\'geo\', \'period\']"\n            individual-search-term="{{ term.selectedTerm.title }}"\n            on-change="termChangeHandler({\'entity\': term})">\n        </explore-mobile-hub>\n      </md-menu-item>\n      <md-menu-item ng-if="!isGlobalFiltersMode">\n        <md-button ng-click="resetFiltersHandler()">\n          <md-icon md-svg-src="{{config.staticPathPrefix}}/RemoveFilters.svg"\n                   md-menu-align-target="">\n          </md-icon>\n          Reset all filters\n        </md-button>\n      </md-menu-item>\n    </md-menu-content>\n  </md-menu>\n  <div class="search-term-entity-wrapper"\n       ng-if="term.selectedTerm.mid">\n    <div class="search-term-entity-desc">\n      {{ term.selectedTerm.type }}\n    </div>\n    <div class="search-term-entity-filters"\n         ng-if="!isGlobalFiltersMode && term.selectedTerm.mid">\n      <span ng-show="term.selectedGeo.geo">{{geoOptions.getNodeByID(term.selectedGeo.geo).name}}</span>\n      <span ng-show="!term.selectedGeo.geo">\n        Worldwide\n      </span>\n      <span ng-show="term.selectedPeriod.period.name">\n        , {{term.selectedPeriod.period.name}}\n      </span>\n      <span ng-show="!term.selectedPeriod.period.name">\n        , {{periodOptions.getNodeByID(term.selectedPeriod.period.id).name}}\n      </span>\n    </div>\n  </div>\n</div>\n'),
    a.put("/explorepage/search-term-filter-dialog.html", '<div class="individual-search-term-pickers">\n  <div class="filters-wrapper">\n    <div class="filter-title">\n      Filter\n      <span class="filter-term-title">{{ ctrl.searchTermTitle }}</span>\n    </div>\n    <div class="individual-filter">\n      \x3c!--Geo picker--\x3e\n      <md-icon class="filter-icon"\n               md-svg-src="{{ config.staticPathPrefix }}/globe-image.svg">\n      </md-icon>\n      <hierarchy-picker\n          class="search-term-filter"\n          data="ctrl.geoOptions"\n          ng-model="ctrl.selectedGeo"\n          show-breadcrumbs="true">\n      </hierarchy-picker>\n    </div>\n   <div class="individual-filter">\n     \x3c!--Time period picker--\x3e\n     <md-icon class="filter-icon"\n              md-svg-src="{{ config.staticPathPrefix }}/ic_clock_grey.svg">\n     </md-icon>\n     \x3c!-- To reshow dialog on change use:\n     on-change="!isPreset && ctrl.showModal()" --\x3e\n     <custom-date-picker\n        class="search-term-filter"\n        is-web-search="ctrl.isWebSearch"\n        append-custom="true"\n        ng-model="ctrl.selectedPeriod"\n        on-change="!isPreset && ctrl.okClickHandle()"\n        on-cancel="ctrl.showModal()"\n        options="ctrl.periodOptions">\n     </custom-date-picker>\n   </div>\n  </div>\n  <div class="dialog-buttons">\n    <md-button ng-click="ctrl.hideModal()"\n               class="dialog-button">\n      CANCEL\n    </md-button>\n    <md-button ng-click="ctrl.okClickHandle()"\n        class="dialog-button">\n      OK\n    </md-button>\n  </div>\n</div>\n'),
    a.put("/fullscreenpage/fullscreenpage.html", '<div class="page-top"></div>\n<div class="header-wrapper header-wrapper-fs"\n     ng-class="{\'header-shadow-fs\' : ctrl.isTitleShadow}">\n  <div class="header-background-fs">\n  </div>\n  <div class="header-container-fs">\n    <div class="logo-container logo-container-fs" dir="ltr">\n      <div ng-class="{\'line-separator\' : ctrl.category}">\n        <a class="logo-wrapper-fs"\n           href="{{::config.pathPrefix}}/{{ctrl.categoryHomeUrl}}/{{ctrl.geoHomeUrl}}"\n           track="[\'General\', \'Logo\', \'Click\']">\n          <md-icon class="google-logo header-logo header-logo-fs">\n          </md-icon>\n        </a>\n      </div>\n      <span class="category-fs"\n            ng-if="ctrl.category">\n        {{ctrl.category}}\n      </span>\n    </div>\n    <div class="page-index-bullets"\n         ng-if="ctrl.realNumberOfPages > 1">\n      <span ng-repeat="i in ctrl.pageBulletsArray track by $index"\n            ng-class="{\'selected-page-index-bullets\' : ctrl.currentPageNumber === $index,\n                       \'pointer\' : ctrl.isPageScrollInProgress,\n                       \'bulletDisable\' : !ctrl.isPageScrollInProgress}"\n            ng-click="!ctrl.isPageScrollInProgress || ctrl.bulletClick($index)">\n        &bull;\n      </span>\n    </div>\n    <div class="toggle-page-scroll">\n      <md-switch ng-model="autoScrollPause"\n                 switch switch-value="ctrl.isPageScrollInProgress" switch-on="\'pause-button-svg.svg\'"  switch-off="\'play-button-svg.svg\'"\n                 aria-label="' + c("Toggle auto page scroll") + '"\n                 md-no-ink="false"\n                 ng-change="ctrl.togglePageScroll(autoScrollPause)">\n      </md-switch>\n    </div>\n    <a class="exit-full-screen"\n       ng-href="{{::config.pathPrefix}}/{{ctrl.categoryHomeUrl}}/{{ctrl.geoHomeUrl}}">\n      <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_fullscreen_exit_white_24dp.svg"\n               class="exit-full-screen-img"\n               alt="' + c("Exit Full Screen") + '">\n      </md-icon>\n    </a>\n  </div>\n</div>\n\n\x3c!-- refreshLatestTrendingStoriesFS_() loader & error message --\x3e\n<loader ng-if="ctrl.isQuerying && !(ctrl.trendingDataFullscreen.length)"></loader>\n\n<ng-include src="\'/components/layout/error-state.html\'"\n            ng-if="ctrl.errorMessage && !(ctrl.trendingDataFullscreen.length)">\n</ng-include>\n\n<div ng-if="!(ctrl.isQuerying || ctrl.errorMessage) || ctrl.trendingDataFullscreen.length">\n  <div class="content-wrap-full-screen">\n    <div class="homepage-trending-stories-fs generic-container"\n         ng-if="!ctrl.isQuerying || ctrl.trendingDataFullscreen.length">\n      <div class="error-message"\n           ng-if="ctrl.showErrorMessage && !ctrl.trendingDataFullscreen.length">\n        <p class="error-message-title">\n          No stories are trending on Google in this category\n        </p>\n      </div>\n\n      <md-list class="md-list-block"\n               ng-if="ctrl.trendingDataFullscreen.length">\n        <md-list-item class="md-list-item-full-screen"\n                      ng-class="{\'new-list-item-full-screen\' : story.positionFlag === \'new\'}"\n                      ng-repeat="story in ctrl.trendingDataFullscreen"\n                      class="trending-list-item"\n                      ng-init="storyIndex=$index">\n          <div class="trending-story-container-fs">\n            <trending-story class="trending-story-full-screen"\n                            id="{{::story.id}}"\n                            sparkline="story.sparkline"\n                            story-index="storyIndex + 1"\n                            story-title="{{::story.title}}"\n                            story-articles="story.articles"\n                            story-title-array="story.entityNames"\n                            image-url="{{::story.image.imgUrl}}"\n                            news-url="{{::story.image.newsUrl}}"\n                            image-source="{{::story.image.source}}"\n                            hide-image="ctrl.hideAllImages"\n                            show-news-snippet="true"\n                            sparkline-size="ctrl.sparklineSize"\n                            ng-class="{\'disable-border-bottom\':$last}">\n            </trending-story>\n            <md-icon class="trending-story-label-fs trending-up"\n                     md-svg-src="{{config.staticPathPrefix}}/ic_keyboard_arrow_up_black_48px.svg"\n                     ng-if="story.positionFlag === \'up\'"\n                     alt="[[]]">\n            </md-icon>\n            <md-icon class="trending-story-label-fs trending-down"\n                     md-svg-src="{{config.staticPathPrefix}}/ic_keyboard_arrow_down_black_48px.svg"\n                     ng-if="story.positionFlag === \'down\'"\n                     alt="[[]]">\n            </md-icon>\n          </div>\n        </md-list-item>\n      </md-list>\n    </div>\n  </div>\n</div>\n'),
    a.put("/homepage/homepage-header.html", '<div class="homepage-content-header content-wrap"\n     ng-if="!ctrl.isQuerying || ctrl.trendingIdentifiers.length || ctrl.featuredData.length">\n  <div class="hompage-hero" ng-if="ctrl.banner.text">\n    <h1 ng-bind-html="ctrl.banner.text"></h1>\n    <md-button href="{{ ctrl.banner.linkUrl }}"\n               class="md-raised homepage-hero-link">\n      Explore story\n    </md-button>\n  </div>\n\n  <div class="homepage-toolbar" layout="row" layout-align="space-between center">\n    <h2>{{ ctrl.currentDate }}</h2>\n\n    <filter></filter>\n  </div>\n</div>\n'),
    a.put("/homepage/homepage.html", '<header is-story-page="false"\n        background-image="{{ctrl.banner.imgUrl}}"\n        body-scroll="ctrl.bodyScroll"\n        enable-scroll-opacity="true"\n        content-overlap="47"\n        is-home-page="true">\n  <ng-include src="\'/homepage/homepage-header.html\'"/>\n</header>\n\n\x3c!-- refreshLatestStories() loader & error message --\x3e\n<loader ng-if="ctrl.isQuerying && !(ctrl.trendingIdentifiers.length || ctrl.featuredData.length)"></loader>\n\n<ng-include src="\'/components/layout/error-state.html\'"\n            ng-if="ctrl.showErrorMessage && !(ctrl.trendingIdentifiers.length || ctrl.featuredData.length)">\n</ng-include>\n\n<md-content class="content home"\n            ng-attr-id="{{ctrl.banner.text ? \'hero-home-content\' : \'\'}}"\n            ng-if="!(ctrl.isQuerying || ctrl.showErrorMessage) || ctrl.trendingIdentifiers.length || ctrl.featuredData.length">\n  <pull-to-refresh on-trigger="ctrl.refreshLatestStories()"></pull-to-refresh>\n\n  <div class="content-wrap">\n    <div class="generic-container-wrapper"  id="featured-stories-container" ng-if="ctrl.featuredData.length">\n      <div class="generic-container" ng-if="ctrl.featuredData.length">\n        <div class="generic-header-container generic-separator">\n          <div class="generic-title featured-stories-header opacity-anim" layout="row"\n               ng-class="{\'has-opacity\': ctrl.bodyScroll > 0 && !ctrl.globalsService.isDesktopMode}">\n            Featured insights\n          </div>\n        </div>\n\n        <carousel tracking-name="Featured Stories" class="featured-stories" layout="row">\n          <featured-story\n              ng-repeat="story in ctrl.featuredData"\n              id="{{::story.id}}"\n              story-title="{{::story.title}}"\n              story-title-array="story.entityNames"\n              widget="story.widget"\n              ng-if="story.widget">\n          </featured-story>\n        </carousel>\n      </div>\n    </div>\n    \x3c!-- refreshLatestTrendingStories() loader & error message --\x3e\n    <md-progress-circular class="md-default-theme main-loader"\n                          md-diameter="30px"\n                          md-mode="indeterminate"\n                          ng-if="ctrl.isQuerying && !ctrl.trendingIdentifiers.length">\n    </md-progress-circular>\n\n    <ng-include\n        src="\'/components/layout/error-state.html\'"\n        ng-if="ctrl.showErrorMessage">\n    </ng-include>\n    <div class="generic-container-wrapper"  id="trending-stories-container">\n      <div class="homepage-trending-stories generic-container"\n           ng-if="!ctrl.isQuerying || ctrl.trendingIdentifiers.length">\n        <div class="generic-header-container generic-separator trending-stories-header-content opacity-anim"\n             id="trending-stories-header"\n             ng-class="{\'has-opacity\': ctrl.bodyScroll > 0 && !ctrl.globalsService.isDesktopMode && !ctrl.featuredData.length}">\n          <div class="generic-title trending-stories-title" ng-attr-id="{{ctrl.featuredData.length ? \'\' : \'home-no-featured\'}}">\n            Stories trending now\n            <button class="trending-refresh trending-icons"\n               title="' + c("Refresh") + '"\n               ng-click="ctrl.refreshLatestTrendingStories()"\n               track="[\'Home\', \'Trending\', \'Refresh\']">\n              <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_refresh_24px.svg"\n                       alt="' + c("Refresh") + '">\n              </md-icon>\n            </button>\n            \x3c!--This feature is not finished. It can be accessed using the url: google.com/trends/fullscreen --\x3e\n            <a class="trending-full-screen trending-icons"\n               ng-if="ctrl.globalsService.isDesktopMode && !ctrl.isTouchDevice && ctrl.enableFullScreenPage"\n               title="' + c("Full Screen") + '"\n               ng-href="{{::config.pathPrefix}}/fullscreen{{ctrl.categoryFullScreenUrl}}{{ctrl.geoFullScreenUrl}}">\n              <md-icon md-svg-src="{{config.staticPathPrefix}}/ic_fullscreen_grey600_24dp.svg"\n                       alt="' + c("Full Screen") + '">\n              </md-icon>\n            </a>\n          </div>\n        </div>\n\n        <div class="error-message"\n             ng-if="ctrl.showErrorMessage && !ctrl.trendingIdentifiers.length">\n          <p class="error-message-title">\n            No stories are trending on Google in this category\n          </p>\n        </div>\n\n        <md-list class="md-list-block"\n                 ng-if="ctrl.trendingIdentifiers.length"\n                 ng-repeat="page in ctrl.trendingDataByPage"\n                 ng-init="pageIndex=$index">\n          <md-list-item class="md-list-item-block"\n                        ng-repeat="story in ::page"\n                        class="trending-list-item"\n                        ng-init="storyIndex=$index">\n              <trending-story id="{{::story.id}}"\n                            sparkline="story.sparkline"\n                            story-index="(pageIndex * ctrl.trendingStoriesPerPage) + storyIndex + 1"\n                            story-title="{{::story.title}}"\n                            story-title-array="story.entityNames"\n                            image-url="{{::story.image.imgUrl}}"\n                            news-url="{{::story.image.newsUrl}}"\n                            image-source="{{::story.image.source}}"\n                            hide-image="ctrl.hideAllImages"\n                            show-news-snippet="false"\n                            sparkline-size="ctrl.sparklineSize">\n            </trending-story>\n          </md-list-item>\n        </md-list>\n      </div>\n    </div>\n\n    <scroll-to class="homepage-pagination"\n               offset="-100"\n               on-trigger="ctrl.getNextPage()"\n               ng-if="ctrl.getCurrentPageNumber() < ctrl.trendingPagesCount">\n      \x3c!-- getNextPage() loader --\x3e\n      <div class="trending-stories-loader-wrapper">\n        <md-progress-circular class="md-default-theme scroll-loader"\n                              md-diameter="30px"\n                              md-mode="indeterminate"\n                              ng-show="ctrl.isQuerying">\n        </md-progress-circular>\n      </div>\n    </scroll-to>\n  </div>\n</md-content>\n'),
    a.put("/modules/embed_stories/embed-stories.html", '<loader ng-if="ctrl.isQuerying && !ctrl.trendingData.length"></loader>\n\n<div class="embed-stories-wrapper">\n  <div class="trendingData"\n       ng-if="ctrl.showErrorMessage && !ctrl.trendingData.length">\n    <p class="embed-stories-error-message">\n      No stories are trending on Google in this category\n    </p>\n  </div>\n\n  <md-list class="md-list-block"\n           ng-if="ctrl.trendingData.length">\n    <md-list-item class="md-list-item-embed-stories"\n                  ng-class="{\'new-list-item-full-screen\' : story.positionFlag === \'new\'}"\n                  ng-repeat="story in ctrl.trendingData"\n                  class="trending-list-item"\n                  ng-init="storyIndex=$index">\n      <div class="trending-story-container-fs">\n        <trending-story class="trending-story-embed-stories"\n                        id="{{::story.id}}"\n                        sparkline="story.sparkline"\n                        story-index="storyIndex + 1"\n                        story-title="{{::story.title}}"\n                        story-articles="story.articles"\n                        story-title-array="story.entityNames"\n                        image-url="{{::story.image.imgUrl}}"\n                        news-url="{{::story.image.newsUrl}}"\n                        image-source="{{::story.image.source}}"\n                        hide-image="false"\n                        show-news-snippet="true"\n                        sparkline-size="ctrl.sparklineSize",\n                        is-embed-stories="true"\n                        ng-class="{\'disable-border-bottom\':$last}">\n        </trending-story>\n        <md-icon class="trending-story-label-embed-stories trending-up"\n                 md-svg-src="{{config.staticPathPrefix}}/ic_keyboard_arrow_up_black_48px.svg"\n                 ng-if="story.positionFlag === \'up\'"\n                 alt="[[]]">\n        </md-icon>\n        <md-icon class="trending-story-label-embed-stories trending-down"\n                 md-svg-src="{{config.staticPathPrefix}}/ic_keyboard_arrow_down_black_48px.svg"\n                 ng-if="story.positionFlag === \'down\'"\n                 alt="[[]]">\n        </md-icon>\n      </div>\n    </md-list-item>\n  </md-list>\n</div>\n'),
    a.put("/modules/yis2015/share-embed-dialog.html", '<md-dialog class="share-dialog">\n  <md-content>\n    <md-subheader class="share-dialog-title">Share and embed</md-subheader>\n\n    <div class="share-dialog-content-element-wrapper">\n      <div class="share-dialog-content-element"\n           ng-repeat="network in ctrl.networks"\n           ng-init="displayName = network.config.displayName"\n           ng-click="ctrl.dispatchNetwork(network)"\n           track="[\'YIS\', \'Share\', displayName]">\n        <md-icon md-svg-src="{{ctrl.config.staticPathPrefix}}/{{icons[network.identifier]}}"\n                 class="story-share-social-icon"\n                 alt="Share">\n        </md-icon>\n      </div>\n    </div>\n\n    <div class="embed-textarea-description">\n      Paste this into any HTML page:\n    </div>\n\n    <textarea readonly class="embed-textarea"><iframe frameborder="0" scrolling="no" width="100%" height="510" src="{{::ctrl.getSitePath()}}{{::ctrl.config.pathPrefix}}/2015/viz?embed=true"></iframe></textarea>\n  </md-content>\n\n  <div class="md-dialog-actions" layout="row">\n    <a ng-click="ctrl.hideModal()" class="share-dialog-button">Cancel</a>\n  </div>\n</md-dialog>\n'),
    a.put("/modules/yis2015/viz.html", '<div class="trends-wrapper">\n  <div class="yis-viz-header">\n    <a href="/trends/"\n       ng-if="!isEmbed"\n       target="_blank"\n       class="yis-viz-header-logo-wrapper">\n      <img ng-src="{{::config.staticPathPrefix}}/lockup_trends_clr_24px.svg">\n    </a>\n    <a href="/trends/"\n       ng-if="isEmbed"\n       target="_blank"\n       class="yis-viz-header-logo-wrapper">\n      <img ng-src="{{::config.staticPathPrefix}}/lockup_trends_clr_20px.svg">\n    </a>\n    <div class="yis-viz-embed-header-rule"\n         ng-if="isEmbed"></div>\n    <div class="yis-viz-embed-header-title"\n          ng-if="isEmbed">\n      Year in Search 2015 Timeline\n    </div>\n    <md-icon class="yis-viz-embed-header-share flip-rtl"\n             ng-if="isEmbed"\n             ng-click="showShareAndEmbedDialog()"\n             md-svg-src="{{::config.staticPathPrefix}}/i-share.svg"\n             aria-label="Share and embed"\n             alt="Share and embed">\n    </md-icon>\n  </div>\n  <trends-widget template="fe_embed">\n  </trends-widget>\n  <button class="yis-viz-share-button"\n             ng-if="!isEmbed"\n             aria-label="Share and embed"\n             ng-click="showShareAndEmbedDialog()"\n             track="[\'YIS 2015 VIZ\', \'Share and embed\', \'Open\']">\n    <md-icon md-svg-src="{{::config.staticPathPrefix}}/ic_googleplus_reshare_24px.svg"\n             class="story-share-image flip-rtl"\n             alt="Share and embed">\n    </md-icon>\n  </button>\n</div>\n'),
    a.put("/storypage/ELECTIONS_2016_CANDIDATE_STORY.html", '<div class="elections-str-story-header-content content-wrap" ng-if="ctrl.numberOfWidgets">\n  <div class="elections-str-story-header-content-wrapper">\n    <div class="elections-str-story-header-content-cell">\n      <a ng-if="ctrl.eventName"\n         href="{{ctrl.backToStoryURL}}"\n         class="elections-str-story-header-back-button md-button ng-scope ng-isolate-scope md-ink-ripple"\n         aria-label="{{ctrl.eventName}}"\n         track="ctrl.candidatesTrackArray">\n        <md-icon class="flip-rtl"\n                 md-svg-src="{{ctrl.arrowBackPath}}">\n        </md-icon>\n        <span class="elections-str-story-header-back-text">{{ctrl.eventName}}</span>\n      </a>\n      <h1 id="storyTitle"\n          bidi="ctrl.entityNames"></h1>\n      <h2 id="storySubTitle"\n          bidi="ctrl.subTitle"\n          ng-show="ctrl.subTitle"></h2>\n    </div>\n  </div>\n</div>\n'),
    a.put("/storypage/ELECTIONS_2016_STATE_STORY.html", '<div class="elections-story-header-content content-wrap" ng-if="ctrl.numberOfWidgets">\n  <div class="elections-story-header-content-wrapper">\n    <div class="elections-story-header-content-cell">\n      <a ng-if="ctrl.eventName"\n         href="{{ctrl.backToStoryURL}}"\n         class="elections-story-header-back-button md-button ng-scope ng-isolate-scope md-ink-ripple"\n         aria-label="{{ctrl.eventName}}"\n         track="ctrl.stateTrackArray">\n        <md-icon class="flip-rtl"\n                 md-svg-src="{{ctrl.arrowBackPath}}">\n        </md-icon>\n        <span class="elections-story-header-back-text">{{ctrl.eventName}}</span>\n      </a>\n      <h1 id="storyTitle"\n          bidi="ctrl.entityNames"></h1>\n      <h2 id="storySubTitle"\n          bidi="ctrl.subTitle"\n          ng-show="ctrl.subTitle"></h2>\n    </div>\n  </div>\n</div>\n'),
    a.put("/storypage/OLYMPICS_2016_FEATURED_STORIES.html", '<div class="oly-story-header-content content-wrap" ng-if="ctrl.numberOfWidgets">\n  <div class="oly-story-header-content-wrapper">\n    <div class="oly-story-header-content-cell">\n      <a ng-if="ctrl.eventName"\n         href="{{ctrl.backToStoryURL}}"\n         class="oly-story-header-back-button md-button ng-scope ng-isolate-scope md-ink-ripple"\n         aria-label="{{ctrl.eventName}}"\n         track="[\'Story-OLY\', \'Header Back\', \'Click\']">\n        <md-icon class="flip-rtl"\n                 md-svg-src="{{ctrl.arrowBackPath}}">\n        </md-icon>\n        <span class="oly-story-header-back-text">{{ctrl.eventName}}</span>\n      </a>\n      <h1 id="storyTitle"\n          bidi="ctrl.entityNames.length ? ctrl.entityNames : ctrl.title"></h1>\n      <h2 id="storySubTitle"\n          bidi="ctrl.subTitle"\n          ng-show="ctrl.subTitle"></h2>\n    </div>\n  </div>\n</div>\n'),
    a.put("/storypage/OLYMPICS_2016_HUB.html", '<div class="olympics-content-header-container">\n  <div class="storypage-content-header olympics-content-header content-wrap"\n       ng-if="ctrl.numberOfWidgets">\n    <div class="vertical-middle">\n      <h1 class="olympics-story-title"\n          bidi="ctrl.title | typography"></h1>\n      <h2 class="olympics-story-subtitle"\n          bidi="ctrl.subTitle | typography"\n          ng-if="ctrl.subTitle"></h2>\n    </div>\n  </div>\n</div>\n'),
    a.put("/storypage/REGULAR_STORY.html", '<div class="storypage-content-header content-wrap" ng-if="ctrl.numberOfWidgets">\n  <h1 bidi="ctrl.entityNames"></h1>\n  <h2>{{ctrl.timeRange}}</h2>\n</div>\n'),
    a.put("/storypage/YEAR_IN_SEARCH_2015_HUB.html", '<div class="yis-content-header-container">\n  <div class="storypage-content-header yis-content-header content-wrap"\n       ng-if="ctrl.numberOfWidgets">\n    <div class="vertical-middle">\n      <h1 class="yis-story-title" bidi="ctrl.entityNames"></h1>\n      <video-overlay video-url="ctrl.bannerVideoUrl"></video-overlay>\n    </div>\n    <share config="ctrl.shareConfig" icon-only="true" ng-if="ctrl.shareConfig"></share>\n  </div>\n</div>\n'),
    a.put("/storypage/YEAR_IN_SEARCH_2015_STORY.html", '<div class="yis-story-header-content content-wrap" ng-if="ctrl.numberOfWidgets">\n  <div class="yis-story-header-content-wrapper">\n    <div class="yis-story-header-content-cell">\n      <a ng-if="ctrl.eventName"\n         href="{{ctrl.backToStoryURL}}"\n         class="yis-story-header-back-button md-button ng-scope ng-isolate-scope md-ink-ripple"\n         aria-label="{{ctrl.eventName}}"\n         track="[\'Story-YIS\', \'Header Back\', \'Click\']">\n        <md-icon class="flip-rtl"\n                 md-svg-src="{{ ctrl.arrowBackPath }}">\n        </md-icon>\n        <span class="yis-story-header-back-text">{{ctrl.eventName}}</span>\n      </a>\n      <h1 id="storyTitle"\n          bidi="ctrl.entityNames"></h1>\n      <h2 id="storySubTitle"\n          bidi="ctrl.subTitle"\n          ng-show="ctrl.subTitle"></h2>\n    </div>\n  </div>\n  <h3>{{ctrl.timeRange}}</h3>\n  <share config="ctrl.shareConfig"\n         ng-if="ctrl.shareConfig"\n         icon-only="true"></share>\n</div>\n'),
    a.put("/storypage/YEAR_IN_SEARCH_2016_HUB.html", '<div class="yis-content-header-container">\n  <div class="storypage-content-header yis-content-header">\n    <div class="vertical-middle">\n      <h1 class="yis-story-title">\n        Year in Search 2016\n      </h1>\n      <video-overlay video-url="ctrl.model.bannerVideoUrl"></video-overlay>\n    </div>\n    <share config="ctrl.shareConfig"\n           class="yis-2016-share"\n           icon-only="true"\n           ng-if="ctrl.shareConfig">\n    </share>\n  </div>\n</div>\n'),
    a.put("/storypage/elections-hub.html", '<div class="elections-content-header-container">\n  <div class="storypage-content-header elections-content-header content-wrap"\n       ng-if="ctrl.numberOfWidgets">\n    <div class="vertical-middle">\n      <h1 bidi="ctrl.title | typography"></h1>\n      <h2 bidi="ctrl.subTitle | typography"\n          ng-if="ctrl.subTitle"></h2>\n      <div class="elections-content-header-disclaimer">\n        Search data is an indication of curiosity in the subject or candidate. It should not be considered an indication of voter intent.\n        <a href="https://support.google.com/trends/answer/4355213?hl=en&ref_topic=4365599">\n          Learn more</a>\n      </div>\n    </div>\n  </div>\n</div>\n'),
    a.put("/storypage/elections-tabs.html", '<md-tabs md-border-bottom\n         md-center-tabs\n         md-no-pagination\n         md-no-ink\n         md-stretch-tabs="always">\n  <md-tab ng-repeat="tabName in ctrl.getTabNames()"\n          ng-init="tabStoryId = ctrl.electionsTabsStoriesIds[$index]"\n          md-active="ctrl.storyId == tabStoryId">\n    <md-tab-label>\n      <a href="{{ ::$root.config.pathPrefix }}/story/{{ ::tabStoryId }}"\n          ng-click="$event.ctrlKey && $event.stopPropagation()"\n          ng-if="ctrl.storyId != tabStoryId">\n        {{ ::tabName }}\n      </a>\n\n      <span ng-if="ctrl.storyId == tabStoryId">{{ ::tabName }}</span>\n    </md-tab-label>\n  </md-tab>\n</md-tabs>\n'),
    a.put("/storypage/olympics-featured-story.html", '<div class="oly-str-story-header-content content-wrap" ng-if="ctrl.numberOfWidgets">\n  <div class="oly-str-story-header-content-wrapper"\n       ng-class="{\'oly-goobers\': ctrl.isOlympics2016GoobersLayout}">\n    <div class="oly-str-story-header-content-cell">\n      <a ng-if="ctrl.eventName"\n         href="{{ctrl.backToStoryURL}}"\n         class="oly-str-story-header-back-button md-button ng-scope ng-isolate-scope md-ink-ripple"\n         aria-label="{{ctrl.eventName}}"\n         track="[\'Story-OLY-STR\', \'Header Back\', \'Click\']">\n        <md-icon class="flip-rtl"\n                 md-svg-src="{{ctrl.arrowBackPath}}">\n        </md-icon>\n        <span class="oly-str-story-header-back-text">{{ctrl.eventName}}</span>\n      </a>\n      <h1 id="storyTitle"\n          bidi="ctrl.entityNames.length ? ctrl.entityNames : ctrl.title"></h1>\n      <h2 id="storySubTitle"\n          bidi="ctrl.subTitle"\n          ng-show="ctrl.subTitle"></h2>\n    </div>\n  </div>\n  <h3 ng-show="ctrl.isOlympics2016StoryLayout">{{ctrl.timeRange}}</h3>\n</div>\n'),
    a.put("/storypage/storypage-version-mobile-dialog.html", '<md-dialog class="story-version-mobile-dialog">\n  <md-toolbar layout="row" layout-align="start center"\n              class="story-version-mobile-dialog-toolbar">\n    <a class="story-version-mobile-dialog-button-wrapper"\n       ng-click="ctrl.mdDialog.cancel()">\n      <md-icon class="story-version-mobile-dialog-button flip-rtl"\n               md-svg-src="{{ctrl.arrowBackPath}}">\n      </md-icon>\n    </a>\n    <div class="story-version-mobile-dialog-title">\n      Select country\n    </div>\n  </md-toolbar>\n  <md-content class="story-version-mobile-dialog-content">\n    <md-list>\n      <md-item ng-repeat="el in ctrl.storyVersions"\n               ng-click="ctrl.selectionHandler(el.id)"\n               class="story-version-mobile-dialog-item">\n        <div class="story-version-mobile-dialog-item-text">\n          {{el.name}}\n        </div>\n      </md-item>\n    </md-list>\n  </md-content>\n</md-dialog>\n'),
    a.put("/storypage/storypage.html", '<header share-config="ctrl.shareConfig"\n        body-scroll="ctrl.bodyScroll"\n        enable-scroll-opacity="true"\n        background-image="{{ ctrl.model.bannerImgUrl }}"\n        page-layout="ctrl.model.pageLayout"\n        story-promise="ctrl.storyPromise"\n        parent-story-id="ctrl.model.parentStoryId"\n        content-overlap="ctrl.setContentOverlap()"\n        back-color="{{ ctrl.palette && ctrl.palette[0].hexvalue }}"\n        ng-class="{\'yis-2016-hub\': ctrl.isYis2016HubLayout}">\n  <ng-include ng-if="ctrl.headerTemplate && ctrl.headerTemplate !== \'EMPTY_STORY\'"\n              src="\'/storypage/\' + ctrl.headerTemplate + \'.html\'">\n  </ng-include>\n</header>\n\n<div class="content" ng-if="ctrl.components.length">\n  <div class="content-wrap">\n    <div ng-repeat="comp in ctrl.components">\n      <div class="olympics-carousel-wrapper" ng-if="comp.component.type === \'IMAGE_CAROUSEL\'">\n        <div ng-class="{\'carousel-item-shadow\': ctrl.globalsService.isMobileMode}">\n          <carousel tracking-name="olympics carousel" class="olympics-carousel"\n                    layout="row">\n            <a class="olympics-carousel-widget-wrapper"\n               ng-repeat="widget in comp.widgets"\n               ng-href="{{ctrl.config.pathPrefix + \'/story/\' + comp.component.id}}">\n              <trends-widget data="widget" template="fe_goober_featured"></trends-widget>\n              <div class="olympics-carousel-link-wrapper"\n                   ng-if="ctrl.globalsService.isMobileMode">\n                <div ng-href="{{ctrl.config.pathPrefix + \'/story/\' + comp.component.id}}"\n                   class="olympics-carousel-link">\n                  see more\n                  <md-icon md-svg-src="{{::config.staticPathPrefix}}/ic_arrow_forward_24px.svg"\n                           class="olympics-carousel-link-arrow flip-rtl">\n                  </md-icon>\n                </div>\n              </div>\n            </a>\n          </carousel>\n          <div class="olympics-carousel-link-wrapper"\n               ng-if="ctrl.globalsService.isDesktopMode">\n            <a ng-href="{{ctrl.config.pathPrefix + \'/story/\' + comp.component.id}}"\n               class="olympics-carousel-link">\n                see more\n              <md-icon md-svg-src="{{::config.staticPathPrefix}}/ic_arrow_forward_24px.svg"\n                       class="olympics-carousel-link-arrow flip-rtl">\n              </md-icon>\n            </a>\n          </div>\n        </div>\n      </div>\n      <div ng-if="comp.component.type === \'TOP_FEATURED\'" class="olympics-featured-widgets">\n        <div class="widget-container-wrapper" layout="row" layout-wrap>\n          <div flex="100" class="widget-container">\n            <div class="olympics-featured-insights-title">\n              featured insights\n            </div>\n          </div>\n        </div>\n        <div class="widget-container-wrapper olympics-widget-container" layout="row"\n             layout-wrap>\n          <div flex="50" class="widget-container"\n               ng-repeat="widget in comp.widgets">\n            <div id="{{::widget.id}}" class="widget-anchor"></div>\n            <trends-widget data="widget"\n                           has-live-data="!widget.isCurated"\n                           on-event="ctrl.onWidgetEvent(event)"\n                           story-id="{{::ctrl.storyId}}"\n                           story-parent-id="{{::ctrl.model.parentStoryId}}"\n                           story-timestamp="{{::ctrl.model.timestamp}}"\n                           story-title="{{::ctrl.model.title}}"\n                           palette="ctrl.palette">\n            </trends-widget>\n          </div>\n        </div>\n        <div class="olympics-featured-insights-link-wrapper">\n          <a ng-href="{{ctrl.config.pathPrefix + \'/story/\' + comp.component.id}}"\n             class=" olympics-featured-insights-button-wrapper">\n            <md-button class="md-raised md-primary olympics-featured-insights-button">\n              all featured insights\n            </md-button>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="content-wrap" ng-if="ctrl.isYis2015HubLayout">\n  <div class="widget-container-wrapper"\n       layout="row" layout-wrap>\n    <div flex="100" class="widget-container yis-subtitle-container">\n      <div class="yis-hub-subtitle-text">\n        {{ctrl.subTitle}}\n      </div>\n    </div>\n  </div>\n</div>\n\n\x3c!-- refresh_() loader & error message --\x3e\n<div ng-if="!ctrl.numberOfWidgets">\n  <loader ng-if="ctrl.isQuerying"></loader>\n\n  <ng-include class="floating"\n              src="\'/components/layout/error-state.html\'"\n              ng-if="ctrl.showErrorMessage">\n  </ng-include>\n</div>\n\n<md-content class="content {{ctrl.pageLayoutType}}"\n            ng-class="{\'firstAtomIsText\': ctrl.firstAtomIsFeText}"\n            ng-if="ctrl.showContent && !ctrl.isYis2016HubLayout">\n  <ng-include class="elections-hub-tabs"\n              src="\'/storypage/elections-tabs.html\'"\n              ng-if="ctrl.pageLayoutType === \'elections-content\'">\n  </ng-include>\n\n  <div class="content-wrap">\n    <div class="widget-container-wrapper" layout="row" layout-wrap>\n      <div flex="100"\n           class="widget-container yis-story-country-selector"\n           ng-if="ctrl.isYisHubLayout">\n        <md-select class="top-selector" aria-label="Select stories location"\n                   ng-model="ctrl.selectedCountry"\n                   ng-change="ctrl.routeToSelectedYisCountryPage()">\n          <md-option ng-value="opt"\n                     class="top-selector-option"\n                     ng-repeat="opt in ctrl.storyVersions | OrderBySelectedOptionFilter:ctrl.selectedCountry.id">\n            {{opt.name}}\n          </md-option>\n        </md-select>\n      </div>\n\n      <div flex="{{::widget.isLong ? 100 : 50}}"\n           class="widget-container"\n           ng-class="{\'hub-page-content-container\': ctrl.model.pageLayout == \'YEAR_IN_SEARCH_2015_HUB\'}"\n           ng-repeat="widget in ctrl.widgets track by $index">\n        <div id="{{::widget.id}}" class="widget-anchor"></div>\n\n        <trends-widget\n            data="widget"\n            has-live-data="!widget.isCurated"\n            on-event="ctrl.onWidgetEvent(event)"\n            story-id="{{::ctrl.storyId}}"\n            story-parent-id="{{::ctrl.model.parentStoryId}}"\n            story-timestamp="{{::ctrl.model.timestamp}}"\n            story-title="{{::ctrl.model.title}}"\n            palette="ctrl.palette">\n        </trends-widget>\n      </div>\n    </div>\n  </div>\n\n  <scroll-to class="storypage-pagination"\n             offset="-100"\n             on-trigger="ctrl.getNextPage()"\n             ng-if="ctrl.getCurrentPageNumber() < ctrl.widgetsPagesCount">\n    \x3c!-- getNextPage() loader --\x3e\n    <div class="storypage-pagination-loader-wrapper">\n      <md-progress-circular class="md-default-theme scroll-loader"\n                            md-diameter="30px"\n                            md-mode="indeterminate"\n                            ng-show="ctrl.isQuerying">\n      </md-progress-circular>\n\n      <md-button ng-hide="ctrl.isQuerying"\n                  ng-click="ctrl.getNextPage()">\n        Load More\n      </md-button>\n    </div>\n  </scroll-to>\n</md-content>\n<div ng-if="ctrl.isYis2016HubLayout"\n     class="yis-2016-content">\n  <a class="yis-2016-interactive" href="{{ctrl.yis2016FrontDoorLink}}">\n    <ng-include src="\'/components/layout/yis-2016-front-door.html\'">\n    </ng-include>\n  </a>\n  <div class="yis-2016-paragraph-container">\n    <div class="yis-2016-paragraph">\n      <a class="yis-2016-paragraph-text" href="{{ctrl.yis2016FrontDoorLink}}">\n        This year, many topics set a new all-time high in search interest. Some were expected while others were a bit more surprising.\n          <div class="records-wrapper">\n            <div class="yis-2016-record-title" ng-if="ctrl.isLocaleSupportedForYis2016Interactive()">\n              See 2016\'s breakout searches\n            </div>\n            <div class="yis-2016-record-title" ng-if="!ctrl.isLocaleSupportedForYis2016Interactive()">\n              See 2016\'s breakout searches (English)\n            </div>\n          </div>\n        </a>\n    </div>\n  </div>\n  <div class="yis-2016-content-container">\n    <div class="yis-2016-filters-container">\n      See what was trending in 2016 -\n      <yis-country-filter selected-geo="ctrl.selectedGeoYis2016">\n      </yis-country-filter>\n    </div>\n    <grid class="yis-2016-grid"\n          grid-content-array="ctrl.widgets"\n          story-id="2016">\n    </grid>\n  </div>\n</div>\n'))
}
]);
angular.module("ddmLocalization", []);
var qa = function(a) {
    if (Error.captureStackTrace)
        Error.captureStackTrace(this, qa);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
};
p(qa, Error);
qa.prototype.name = "CustomError";
var ra = function(a, b) {
    for (var c = a.split("%s"), d = "", f = Array.prototype.slice.call(arguments, 1); f.length && 1 < c.length; )
        d += c.shift() + f.shift();
    return d + c.join("%s")
}
  , q = function(a, b) {
    if (b)
        a = a.replace(sa, "&amp;").replace(ua, "&lt;").replace(va, "&gt;").replace(wa, "&quot;").replace(xa, "&#39;").replace(ya, "&#0;");
    else {
        if (!Aa.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(sa, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(ua, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(va, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(wa, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(xa, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(ya, "&#0;"))
    }
    return a
}
  , sa = /&/g
  , ua = /</g
  , va = />/g
  , wa = /"/g
  , xa = /'/g
  , ya = /\x00/g
  , Aa = /[\x00&<>"']/;
var Ba = function(a, b) {
    b.unshift(a);
    qa.call(this, ra.apply(null, b));
    b.shift();
    this.messagePattern = a
};
p(Ba, qa);
Ba.prototype.name = "AssertionError";
var Ca = function(a, b, c, d) {
    var f = "Assertion failed";
    if (c)
        var f = f + (": " + c)
          , g = d;
    else
        a && (f += ": " + a,
        g = b);
    throw new Ba("" + f,g || []);
}
  , Da = function(a, b, c) {
    a || Ca("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
}
  , r = function(a, b) {
    throw new Ba("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
}
  , Ea = function(a, b, c) {
    "string" == typeof a || Ca("Expected string but got %s: %s.", [ca(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
  , Fa = function(a, b, c) {
    "array" == ca(a) || Ca("Expected array but got %s: %s.", [ca(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
var Ga = {
    COMPACT_DECIMAL_SHORT_PATTERN: {
        1E3: {
            other: "0K"
        },
        1E4: {
            other: "00K"
        },
        1E5: {
            other: "000K"
        },
        1E6: {
            other: "0M"
        },
        1E7: {
            other: "00M"
        },
        1E8: {
            other: "000M"
        },
        1E9: {
            other: "0B"
        },
        1E10: {
            other: "00B"
        },
        1E11: {
            other: "000B"
        },
        1E12: {
            other: "0T"
        },
        1E13: {
            other: "00T"
        },
        1E14: {
            other: "000T"
        }
    },
    COMPACT_DECIMAL_LONG_PATTERN: {
        1E3: {
            other: "0 thousand"
        },
        1E4: {
            other: "00 thousand"
        },
        1E5: {
            other: "000 thousand"
        },
        1E6: {
            other: "0 million"
        },
        1E7: {
            other: "00 million"
        },
        1E8: {
            other: "000 million"
        },
        1E9: {
            other: "0 billion"
        },
        1E10: {
            other: "00 billion"
        },
        1E11: {
            other: "000 billion"
        },
        1E12: {
            other: "0 trillion"
        },
        1E13: {
            other: "00 trillion"
        },
        1E14: {
            other: "000 trillion"
        }
    }
}
  , Ha = Ga
  , Ha = Ga;
var Ja = function(a, b) {
    var c = ["0"];
    b = Ia[b][0] & 7;
    if (0 < b) {
        c.push(".");
        for (var d = 0; d < b; d++)
            c.push("0")
    }
    return a.replace(/0.00/g, c.join(""))
}
  , Ia = {
    AED: [2, "dh", "\u062f.\u0625.", "DH"],
    ALL: [0, "Lek", "Lek"],
    AUD: [2, "$", "AU$"],
    BDT: [2, "\u09f3", "Tk"],
    BGN: [2, "lev", "lev"],
    BRL: [2, "R$", "R$"],
    CAD: [2, "$", "C$"],
    CDF: [2, "FrCD", "CDF"],
    CHF: [2, "CHF", "CHF"],
    CLP: [0, "$", "CL$"],
    CNY: [2, "\u00a5", "RMB\u00a5"],
    COP: [32, "$", "COL$"],
    CRC: [0, "\u20a1", "CR\u20a1"],
    CZK: [50, "K\u010d", "K\u010d"],
    DKK: [50, "kr.", "kr."],
    DOP: [2, "RD$", "RD$"],
    EGP: [2, "\u00a3", "LE"],
    ETB: [2, "Birr", "Birr"],
    EUR: [2, "\u20ac", "\u20ac"],
    GBP: [2, "\u00a3", "GB\u00a3"],
    HKD: [2, "$", "HK$"],
    HRK: [2, "kn", "kn"],
    HUF: [34, "Ft", "Ft"],
    IDR: [0, "Rp", "Rp"],
    ILS: [34, "\u20aa", "IL\u20aa"],
    INR: [2, "\u20b9", "Rs"],
    IRR: [0, "Rial", "IRR"],
    ISK: [0, "kr", "kr"],
    JMD: [2, "$", "JA$"],
    JPY: [0, "\u00a5", "JP\u00a5"],
    KRW: [0, "\u20a9", "KR\u20a9"],
    LKR: [2, "Rs", "SLRs"],
    LTL: [2, "Lt", "Lt"],
    MNT: [0, "\u20ae", "MN\u20ae"],
    MVR: [2, "Rf", "MVR"],
    MXN: [2, "$", "Mex$"],
    MYR: [2, "RM", "RM"],
    NOK: [50, "kr", "NOkr"],
    PAB: [2, "B/.", "B/."],
    PEN: [2, "S/.", "S/."],
    PHP: [2, "\u20b1", "PHP"],
    PKR: [0, "Rs", "PKRs."],
    PLN: [50, "z\u0142", "z\u0142"],
    RON: [2, "RON", "RON"],
    RSD: [0, "din", "RSD"],
    RUB: [50, "\u20bd", "RUB"],
    SAR: [2, "Rial", "Rial"],
    SEK: [50, "kr", "kr"],
    SGD: [2, "$", "S$"],
    THB: [2, "\u0e3f", "THB"],
    TRY: [2, "TL", "YTL"],
    TWD: [2, "NT$", "NT$"],
    TZS: [0, "TSh", "TSh"],
    UAH: [2, "\u0433\u0440\u043d.", "UAH"],
    USD: [2, "$", "US$"],
    UYU: [2, "$", "$U"],
    VND: [48, "\u20ab", "VN\u20ab"],
    YER: [0, "Rial", "Rial"],
    ZAR: [2, "R", "ZAR"]
};
var Ka = {
    DECIMAL_SEP: ".",
    GROUP_SEP: ",",
    PERCENT: "%",
    ZERO_DIGIT: "0",
    PLUS_SIGN: "+",
    MINUS_SIGN: "-",
    EXP_SYMBOL: "E",
    PERMILL: "\u2030",
    INFINITY: "\u221e",
    NAN: "NaN",
    DECIMAL_PATTERN: "#,##0.###",
    SCIENTIFIC_PATTERN: "#E0",
    PERCENT_PATTERN: "#,##0%",
    CURRENCY_PATTERN: "\u00a4#,##0.00",
    DEF_CURRENCY_CODE: "USD"
}
  , v = Ka
  , v = Ka;
var La = function(a, b, c) {
    this.intlCurrencyCode_ = b || v.DEF_CURRENCY_CODE;
    this.currencyStyle_ = c || 0;
    this.maximumIntegerDigits_ = 40;
    this.minimumIntegerDigits_ = 1;
    this.significantDigits_ = 0;
    this.maximumFractionDigits_ = 3;
    this.minExponentDigits_ = this.minimumFractionDigits_ = 0;
    this.showTrailingZeros_ = this.useSignForPositiveExponent_ = !1;
    this.positiveSuffix_ = this.positivePrefix_ = "";
    this.negativePrefix_ = "-";
    this.negativeSuffix_ = "";
    this.multiplier_ = 1;
    this.negativePercentSignExpected_ = !1;
    this.groupingArray_ = [];
    this.useExponentialNotation_ = this.decimalSeparatorAlwaysShown_ = !1;
    this.compactStyle_ = 0;
    this.baseFormattingNumber_ = null;
    "number" == typeof a ? this.applyStandardPattern_(a) : this.applyPattern_(a)
};
e = La.prototype;
e.setMinimumFractionDigits = function(a) {
    if (0 < this.significantDigits_ && 0 < a)
        throw Error("Can't combine significant digits and minimum fraction digits");
    this.minimumFractionDigits_ = a;
    return this
}
;
e.setMaximumFractionDigits = function(a) {
    this.maximumFractionDigits_ = a;
    return this
}
;
e.setSignificantDigits = function(a) {
    if (0 < this.minimumFractionDigits_ && 0 <= a)
        throw Error("Can't combine significant digits and minimum fraction digits");
    this.significantDigits_ = a;
    return this
}
;
e.getSignificantDigits = function() {
    return this.significantDigits_
}
;
e.setShowTrailingZeros = function(a) {
    this.showTrailingZeros_ = a;
    return this
}
;
e.setBaseFormatting = function(a) {
    Da(null === a || isFinite(a));
    this.baseFormattingNumber_ = a;
    return this
}
;
e.getBaseFormatting = function() {
    return this.baseFormattingNumber_
}
;
e.applyPattern_ = function(a) {
    this.pattern_ = a.replace(/ /g, "\u00a0");
    var b = [0];
    this.positivePrefix_ = this.parseAffix_(a, b);
    var c = b[0];
    this.parseTrunk_(a, b);
    c = b[0] - c;
    this.positiveSuffix_ = this.parseAffix_(a, b);
    b[0] < a.length && ";" == a.charAt(b[0]) ? (b[0]++,
    1 != this.multiplier_ && (this.negativePercentSignExpected_ = !0),
    this.negativePrefix_ = this.parseAffix_(a, b),
    b[0] += c,
    this.negativeSuffix_ = this.parseAffix_(a, b)) : (this.negativePrefix_ = this.positivePrefix_ + this.negativePrefix_,
    this.negativeSuffix_ += this.positiveSuffix_)
}
;
e.applyStandardPattern_ = function(a) {
    switch (a) {
    case 1:
        this.applyPattern_(v.DECIMAL_PATTERN);
        break;
    case 2:
        this.applyPattern_(v.SCIENTIFIC_PATTERN);
        break;
    case 3:
        this.applyPattern_(v.PERCENT_PATTERN);
        break;
    case 4:
        this.applyPattern_(Ja(v.CURRENCY_PATTERN, this.intlCurrencyCode_));
        break;
    case 5:
        this.applyCompactStyle_(1);
        break;
    case 6:
        this.applyCompactStyle_(2);
        break;
    default:
        throw Error("Unsupported pattern type.");
    }
}
;
e.applyCompactStyle_ = function(a) {
    this.compactStyle_ = a;
    this.applyPattern_(v.DECIMAL_PATTERN);
    this.setMinimumFractionDigits(0);
    this.setMaximumFractionDigits(2);
    this.setSignificantDigits(2)
}
;
e.parse = function(a, b) {
    b = b || [0];
    if (0 != this.compactStyle_)
        throw Error("Parsing of compact numbers is unimplemented");
    var c;
    a = a.replace(/ /g, "\u00a0");
    var d = a.indexOf(this.positivePrefix_, b[0]) == b[0]
      , f = a.indexOf(this.negativePrefix_, b[0]) == b[0];
    d && f && (this.positivePrefix_.length > this.negativePrefix_.length ? f = !1 : this.positivePrefix_.length < this.negativePrefix_.length && (d = !1));
    d ? b[0] += this.positivePrefix_.length : f && (b[0] += this.negativePrefix_.length);
    a.indexOf(v.INFINITY, b[0]) == b[0] ? (b[0] += v.INFINITY.length,
    c = Infinity) : c = this.parseNumber_(a, b);
    if (d) {
        if (a.indexOf(this.positiveSuffix_, b[0]) != b[0])
            return NaN;
        b[0] += this.positiveSuffix_.length
    } else if (f) {
        if (a.indexOf(this.negativeSuffix_, b[0]) != b[0])
            return NaN;
        b[0] += this.negativeSuffix_.length
    }
    return f ? -c : c
}
;
e.parseNumber_ = function(a, b) {
    var c = !1
      , d = !1
      , f = !1
      , g = 1
      , h = v.DECIMAL_SEP
      , m = v.GROUP_SEP
      , l = v.EXP_SYMBOL;
    if (0 != this.compactStyle_)
        throw Error("Parsing of compact style numbers is not implemented");
    for (var n = ""; b[0] < a.length; b[0]++) {
        var t = a.charAt(b[0])
          , u = this.getDigit_(t);
        if (0 <= u && 9 >= u)
            n += u,
            f = !0;
        else if (t == h.charAt(0)) {
            if (c || d)
                break;
            n += ".";
            c = !0
        } else if (t == m.charAt(0) && ("\u00a0" != m.charAt(0) || b[0] + 1 < a.length && 0 <= this.getDigit_(a.charAt(b[0] + 1)))) {
            if (c || d)
                break
        } else if (t == l.charAt(0)) {
            if (d)
                break;
            n += "E";
            d = !0
        } else if ("+" == t || "-" == t)
            n += t;
        else if (1 == this.multiplier_ && t == v.PERCENT.charAt(0)) {
            if (1 != g)
                break;
            g = 100;
            if (f) {
                b[0]++;
                break
            }
        } else if (1 == this.multiplier_ && t == v.PERMILL.charAt(0)) {
            if (1 != g)
                break;
            g = 1E3;
            if (f) {
                b[0]++;
                break
            }
        } else
            break
    }
    1 != this.multiplier_ && (g = this.multiplier_);
    return parseFloat(n) / g
}
;
e.format = function(a) {
    if (isNaN(a))
        return v.NAN;
    var b = []
      , c = this.getUnitAfterRounding_(null === this.baseFormattingNumber_ ? a : this.baseFormattingNumber_, a);
    a /= Math.pow(10, c.divisorBase);
    b.push(c.prefix);
    var d = 0 > a || 0 == a && 0 > 1 / a;
    b.push(d ? this.negativePrefix_ : this.positivePrefix_);
    isFinite(a) ? (a = a * (d ? -1 : 1) * this.multiplier_,
    this.useExponentialNotation_ ? this.subformatExponential_(a, b) : this.subformatFixed_(a, this.minimumIntegerDigits_, b)) : b.push(v.INFINITY);
    b.push(d ? this.negativeSuffix_ : this.positiveSuffix_);
    b.push(c.suffix);
    return b.join("")
}
;
e.roundNumber_ = function(a) {
    var b = Math.pow(10, this.maximumFractionDigits_)
      , c = 0 >= this.significantDigits_ ? Math.round(a * b) : Math.round(this.roundToSignificantDigits_(a * b, this.significantDigits_, this.maximumFractionDigits_));
    isFinite(c) ? (a = Math.floor(c / b),
    b = Math.floor(c - a * b)) : b = 0;
    return {
        intValue: a,
        fracValue: b
    }
}
;
e.subformatFixed_ = function(a, b, c) {
    if (this.minimumFractionDigits_ > this.maximumFractionDigits_)
        throw Error("Min value must be less than max value");
    c || (c = []);
    a = this.roundNumber_(a);
    var d = Math.pow(10, this.maximumFractionDigits_)
      , f = a.intValue
      , g = a.fracValue
      , h = 0 == f ? 0 : this.intLog10_(f) + 1
      , m = 0 < this.minimumFractionDigits_ || 0 < g || this.showTrailingZeros_ && h < this.significantDigits_;
    a = this.minimumFractionDigits_;
    m && (a = this.showTrailingZeros_ && 0 < this.significantDigits_ ? this.significantDigits_ - h : this.minimumFractionDigits_);
    for (var l = "", h = f; 1E20 < h; )
        l = "0" + l,
        h = Math.round(h / 10);
    var l = h + l
      , n = v.DECIMAL_SEP
      , h = v.ZERO_DIGIT.charCodeAt(0)
      , t = l.length
      , u = 0;
    if (0 < f || 0 < b) {
        for (f = t; f < b; f++)
            c.push(String.fromCharCode(h));
        if (2 <= this.groupingArray_.length)
            for (b = 1; b < this.groupingArray_.length; b++)
                u += this.groupingArray_[b];
        b = t - u;
        if (0 < b)
            for (var f = this.groupingArray_, u = t = 0, x, K = v.GROUP_SEP, za = l.length, ta = 0; ta < za; ta++) {
                if (c.push(String.fromCharCode(h + 1 * Number(l.charAt(ta)))),
                1 < za - ta)
                    if (x = f[u],
                    ta < b) {
                        var Ui = b - ta;
                        (1 === x || 0 < x && 1 === Ui % x) && c.push(K)
                    } else
                        u < f.length && (ta === b ? u += 1 : x === ta - b - t + 1 && (c.push(K),
                        t += x,
                        u += 1))
            }
        else {
            b = l;
            l = this.groupingArray_;
            f = v.GROUP_SEP;
            x = b.length;
            K = [];
            for (t = l.length - 1; 0 <= t && 0 < x; t--) {
                u = l[t];
                for (za = 0; za < u && 0 <= x - za - 1; za++)
                    K.push(String.fromCharCode(h + 1 * Number(b.charAt(x - za - 1))));
                x -= u;
                0 < x && K.push(f)
            }
            c.push.apply(c, K.reverse())
        }
    } else
        m || c.push(String.fromCharCode(h));
    (this.decimalSeparatorAlwaysShown_ || m) && c.push(n);
    d = "" + (g + d);
    for (g = d.length; "0" == d.charAt(g - 1) && g > a + 1; )
        g--;
    for (f = 1; f < g; f++)
        c.push(String.fromCharCode(h + 1 * Number(d.charAt(f))))
}
;
e.addExponentPart_ = function(a, b) {
    b.push(v.EXP_SYMBOL);
    0 > a ? (a = -a,
    b.push(v.MINUS_SIGN)) : this.useSignForPositiveExponent_ && b.push(v.PLUS_SIGN);
    a = "" + a;
    for (var c = v.ZERO_DIGIT, d = a.length; d < this.minExponentDigits_; d++)
        b.push(c);
    b.push(a)
}
;
e.getMantissa_ = function(a, b) {
    var c = Math.pow(10, b);
    if (isFinite(c) && 0 !== c)
        return a / c;
    c = Math.pow(10, Math.floor(b / 2));
    a = a / c / c;
    1 == b % 2 && (a = 0 < b ? a / 10 : 10 * a);
    return a
}
;
e.subformatExponential_ = function(a, b) {
    if (0 == a)
        this.subformatFixed_(a, this.minimumIntegerDigits_, b),
        this.addExponentPart_(0, b);
    else {
        var c;
        c = Math.log(a) / Math.log(10);
        Da(!ba(void 0) || !1);
        c = Math.floor(c + 2E-15);
        a = this.getMantissa_(a, c);
        var d = this.minimumIntegerDigits_;
        if (1 < this.maximumIntegerDigits_ && this.maximumIntegerDigits_ > this.minimumIntegerDigits_) {
            for (; 0 != c % this.maximumIntegerDigits_; )
                a *= 10,
                c--;
            d = 1
        } else
            1 > this.minimumIntegerDigits_ ? (c++,
            a /= 10) : (c -= this.minimumIntegerDigits_ - 1,
            a *= Math.pow(10, this.minimumIntegerDigits_ - 1));
        this.subformatFixed_(a, d, b);
        this.addExponentPart_(c, b)
    }
}
;
e.getDigit_ = function(a) {
    a = a.charCodeAt(0);
    if (48 <= a && 58 > a)
        return a - 48;
    var b = v.ZERO_DIGIT.charCodeAt(0);
    return b <= a && a < b + 10 ? a - b : -1
}
;
e.parseAffix_ = function(a, b) {
    for (var c = "", d = !1, f = a.length; b[0] < f; b[0]++) {
        var g = a.charAt(b[0]);
        if ("'" == g)
            b[0] + 1 < f && "'" == a.charAt(b[0] + 1) ? (b[0]++,
            c += "'") : d = !d;
        else if (d)
            c += g;
        else
            switch (g) {
            case "#":
            case "0":
            case ",":
            case ".":
            case ";":
                return c;
            case "\u00a4":
                if (b[0] + 1 < f && "\u00a4" == a.charAt(b[0] + 1))
                    b[0]++,
                    c += this.intlCurrencyCode_;
                else
                    switch (this.currencyStyle_) {
                    case 0:
                        c += Ia[this.intlCurrencyCode_][1];
                        break;
                    case 2:
                        var g = this.intlCurrencyCode_
                          , h = Ia[g]
                          , c = c + (g == h[1] ? g : g + " " + h[1]);
                        break;
                    case 1:
                        c += Ia[this.intlCurrencyCode_][2]
                    }
                break;
            case "%":
                if (!this.negativePercentSignExpected_ && 1 != this.multiplier_)
                    throw Error("Too many percent/permill");
                if (this.negativePercentSignExpected_ && 100 != this.multiplier_)
                    throw Error("Inconsistent use of percent/permill characters");
                this.multiplier_ = 100;
                this.negativePercentSignExpected_ = !1;
                c += v.PERCENT;
                break;
            case "\u2030":
                if (!this.negativePercentSignExpected_ && 1 != this.multiplier_)
                    throw Error("Too many percent/permill");
                if (this.negativePercentSignExpected_ && 1E3 != this.multiplier_)
                    throw Error("Inconsistent use of percent/permill characters");
                this.multiplier_ = 1E3;
                this.negativePercentSignExpected_ = !1;
                c += v.PERMILL;
                break;
            default:
                c += g
            }
    }
    return c
}
;
e.parseTrunk_ = function(a, b) {
    for (var c = -1, d = 0, f = 0, g = 0, h = -1, m = a.length, l = !0; b[0] < m && l; b[0]++)
        switch (a.charAt(b[0])) {
        case "#":
            0 < f ? g++ : d++;
            0 <= h && 0 > c && h++;
            break;
        case "0":
            if (0 < g)
                throw Error('Unexpected "0" in pattern "' + a + '"');
            f++;
            0 <= h && 0 > c && h++;
            break;
        case ",":
            0 < h && this.groupingArray_.push(h);
            h = 0;
            break;
        case ".":
            if (0 <= c)
                throw Error('Multiple decimal separators in pattern "' + a + '"');
            c = d + f + g;
            break;
        case "E":
            if (this.useExponentialNotation_)
                throw Error('Multiple exponential symbols in pattern "' + a + '"');
            this.useExponentialNotation_ = !0;
            this.minExponentDigits_ = 0;
            b[0] + 1 < m && "+" == a.charAt(b[0] + 1) && (b[0]++,
            this.useSignForPositiveExponent_ = !0);
            for (; b[0] + 1 < m && "0" == a.charAt(b[0] + 1); )
                b[0]++,
                this.minExponentDigits_++;
            if (1 > d + f || 1 > this.minExponentDigits_)
                throw Error('Malformed exponential pattern "' + a + '"');
            l = !1;
            break;
        default:
            b[0]--,
            l = !1
        }
    0 == f && 0 < d && 0 <= c && (f = c,
    0 == f && f++,
    g = d - f,
    d = f - 1,
    f = 1);
    if (0 > c && 0 < g || 0 <= c && (c < d || c > d + f) || 0 == h)
        throw Error('Malformed pattern "' + a + '"');
    a = d + f + g;
    this.maximumFractionDigits_ = 0 <= c ? a - c : 0;
    0 <= c && (this.minimumFractionDigits_ = d + f - c,
    0 > this.minimumFractionDigits_ && (this.minimumFractionDigits_ = 0));
    this.minimumIntegerDigits_ = (0 <= c ? c : a) - d;
    this.useExponentialNotation_ && (this.maximumIntegerDigits_ = d + this.minimumIntegerDigits_,
    0 == this.maximumFractionDigits_ && 0 == this.minimumIntegerDigits_ && (this.minimumIntegerDigits_ = 1));
    this.groupingArray_.push(Math.max(0, h));
    this.decimalSeparatorAlwaysShown_ = 0 == c || c == a
}
;
var Ma = {
    prefix: "",
    suffix: "",
    divisorBase: 0
};
e = La.prototype;
e.getUnitFor_ = function(a, b) {
    var c = 1 == this.compactStyle_ ? Ha.COMPACT_DECIMAL_SHORT_PATTERN : Ha.COMPACT_DECIMAL_LONG_PATTERN;
    null == c && (c = Ha.COMPACT_DECIMAL_SHORT_PATTERN);
    if (3 > a)
        return Ma;
    a = Math.min(14, a);
    var d = c[Math.pow(10, a)];
    for (--a; !d && 3 <= a; )
        d = c[Math.pow(10, a)],
        a--;
    if (!d)
        return Ma;
    b = d[b];
    return b && "0" != b ? (b = /([^0]*)(0+)(.*)/.exec(b)) ? {
        prefix: b[1],
        suffix: b[3],
        divisorBase: a + 1 - (b[2].length - 1)
    } : Ma : Ma
}
;
e.getUnitAfterRounding_ = function(a, b) {
    if (0 == this.compactStyle_)
        return Ma;
    a = Math.abs(a);
    b = Math.abs(b);
    var c = this.getUnitFor_(1 >= a ? 0 : this.intLog10_(a), this.pluralForm_(a)).divisorBase;
    b = this.roundNumber_(b / Math.pow(10, c));
    return this.getUnitFor_(c + this.intLog10_(this.roundNumber_(a / Math.pow(10, c)).intValue), this.pluralForm_(b.intValue + b.fracValue))
}
;
e.intLog10_ = function(a) {
    for (var b = 0; 1 <= (a /= 10); )
        b++;
    return b
}
;
e.roundToSignificantDigits_ = function(a, b, c) {
    if (!a)
        return a;
    b = b - this.intLog10_(a) - 1;
    if (b < -c)
        return c = Math.pow(10, c),
        Math.round(a / c) * c;
    c = Math.pow(10, b);
    return Math.round(a * c) / c
}
;
e.pluralForm_ = function() {
    return "other"
}
;
e.isCurrencyCodeBeforeValue = function() {
    var a = this.pattern_.indexOf("\u00a4")
      , b = this.pattern_.indexOf("#")
      , c = this.pattern_.indexOf("0")
      , d = Number.MAX_VALUE;
    0 <= b && b < d && (d = b);
    0 <= c && c < d && (d = c);
    return a < d
}
;
var Na = function(a) {
    return 1 == a % 10 && 11 != a % 100 ? "one" : 2 == a % 10 && 12 != a % 100 ? "two" : 3 == a % 10 && 13 != a % 100 ? "few" : "other"
}
  , Oa = Na
  , Oa = Na;
var Pa = function(a, b) {
    if (void 0 === b) {
        b = a + "";
        var c = b.indexOf(".");
        b = Math.min(-1 == c ? 0 : b.length - c - 1, 3)
    }
    return 1 == (a | 0) && 0 == b ? "one" : "other"
}
  , Qa = Pa
  , Qa = Pa;
var Ra = function(a) {
    this.literals_ = [];
    this.parsedPattern_ = [];
    this.numberFormatter_ = new La(1);
    this.parsePattern_(a)
}
  , Sa = /'([{}#].*?)'/g
  , Ta = /''/g;
e = Ra.prototype;
e.format = function(a) {
    return this.format_(a, !1)
}
;
e.formatIgnoringPound = function(a) {
    return this.format_(a, !0)
}
;
e.format_ = function(a, b) {
    if (0 == this.parsedPattern_.length)
        return "";
    var c = [];
    this.formatBlock_(this.parsedPattern_, a, b, c);
    a = c.join("");
    for (b || Da(-1 == a.search("#"), "Not all # were replaced."); 0 < this.literals_.length; )
        a = a.replace(this.buildPlaceholder_(this.literals_), this.literals_.pop());
    return a
}
;
e.formatBlock_ = function(a, b, c, d) {
    for (var f = 0; f < a.length; f++)
        switch (a[f].type) {
        case 4:
            d.push(a[f].value);
            break;
        case 3:
            var g = a[f].value;
            this.formatSimplePlaceholder_(g, b, d);
            break;
        case 2:
            g = a[f].value;
            this.formatSelectBlock_(g, b, c, d);
            break;
        case 0:
            g = a[f].value;
            this.formatPluralOrdinalBlock_(g, b, Qa, c, d);
            break;
        case 1:
            g = a[f].value;
            this.formatPluralOrdinalBlock_(g, b, Oa, c, d);
            break;
        default:
            r("Unrecognized block type: " + a[f].type)
        }
}
;
e.formatSimplePlaceholder_ = function(a, b, c) {
    b = b[a];
    ba(b) ? (this.literals_.push(b),
    c.push(this.buildPlaceholder_(this.literals_))) : c.push("Undefined parameter - " + a)
}
;
e.formatSelectBlock_ = function(a, b, c, d) {
    var f = a.argumentIndex;
    ba(b[f]) ? (f = a[b[f]],
    ba(f) || (f = a.other,
    Fa(f, "Invalid option or missing other option for select block.")),
    this.formatBlock_(f, b, c, d)) : d.push("Undefined parameter - " + f)
}
;
e.formatPluralOrdinalBlock_ = function(a, b, c, d, f) {
    var g = a.argumentIndex
      , h = a.argumentOffset
      , m = +b[g];
    isNaN(m) ? f.push("Undefined or invalid parameter - " + g) : (h = m - h,
    g = a[b[g]],
    ba(g) || (Da(0 <= h, "Argument index smaller than offset."),
    c = this.numberFormatter_.getMinimumFractionDigits ? c(h, this.numberFormatter_.getMinimumFractionDigits()) : c(h),
    Ea(c, "Invalid plural key."),
    g = a[c],
    ba(g) || (g = a.other),
    Fa(g, "Invalid option or missing other option for plural block.")),
    a = [],
    this.formatBlock_(g, b, d, a),
    b = a.join(""),
    Ea(b, "Empty block in plural."),
    d ? f.push(b) : (d = this.numberFormatter_.format(h),
    f.push(b.replace(/#/g, d))))
}
;
e.parsePattern_ = function(a) {
    a && (a = this.insertPlaceholders_(a),
    this.parsedPattern_ = this.parseBlock_(a))
}
;
e.insertPlaceholders_ = function(a) {
    var b = this.literals_
      , c = fa(this.buildPlaceholder_, this);
    a = a.replace(Ta, function() {
        b.push("'");
        return c(b)
    });
    return a = a.replace(Sa, function(a, f) {
        b.push(f);
        return c(b)
    })
}
;
e.extractParts_ = function(a) {
    var b = 0
      , c = []
      , d = []
      , f = /[{}]/g;
    f.lastIndex = 0;
    for (var g; g = f.exec(a); ) {
        var h = g.index;
        "}" == g[0] ? (g = c.pop(),
        Da(ba(g) && "{" == g, "No matching { for }."),
        0 == c.length && (g = {
            type: 1
        },
        g.value = a.substring(b, h),
        d.push(g),
        b = h + 1)) : (0 == c.length && (b = a.substring(b, h),
        "" != b && d.push({
            type: 0,
            value: b
        }),
        b = h + 1),
        c.push("{"))
    }
    Da(0 == c.length, "There are mismatched { or } in the pattern.");
    b = a.substring(b);
    "" != b && d.push({
        type: 0,
        value: b
    });
    return d
}
;
var Ua = /^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/
  , Va = /^\s*(\w+)\s*,\s*selectordinal\s*,/
  , Wa = /^\s*(\w+)\s*,\s*select\s*,/;
e = Ra.prototype;
e.parseBlockType_ = function(a) {
    return Ua.test(a) ? 0 : Va.test(a) ? 1 : Wa.test(a) ? 2 : /^\s*\w+\s*/.test(a) ? 3 : 5
}
;
e.parseBlock_ = function(a) {
    var b = [];
    a = this.extractParts_(a);
    for (var c = 0; c < a.length; c++) {
        var d = {};
        if (0 == a[c].type)
            d.type = 4,
            d.value = a[c].value;
        else if (1 == a[c].type)
            switch (this.parseBlockType_(a[c].value)) {
            case 2:
                d.type = 2;
                d.value = this.parseSelectBlock_(a[c].value);
                break;
            case 0:
                d.type = 0;
                d.value = this.parsePluralBlock_(a[c].value);
                break;
            case 1:
                d.type = 1;
                d.value = this.parseOrdinalBlock_(a[c].value);
                break;
            case 3:
                d.type = 3;
                d.value = a[c].value;
                break;
            default:
                r("Unknown block type for pattern: " + a[c].value)
            }
        else
            r("Unknown part of the pattern.");
        b.push(d)
    }
    return b
}
;
e.parseSelectBlock_ = function(a) {
    var b = "";
    a = a.replace(Wa, function(a, c) {
        b = c;
        return ""
    });
    var c = {};
    c.argumentIndex = b;
    a = this.extractParts_(a);
    for (var d = 0; d < a.length; ) {
        var f = a[d].value;
        Ea(f, "Missing select key element.");
        d++;
        Da(d < a.length, "Missing or invalid select value element.");
        if (1 == a[d].type)
            var g = this.parseBlock_(a[d].value);
        else
            r("Expected block type.");
        c[f.replace(/\s/g, "")] = g;
        d++
    }
    Fa(c.other, "Missing other key in select statement.");
    return c
}
;
e.parsePluralBlock_ = function(a) {
    var b = ""
      , c = 0;
    a = a.replace(Ua, function(a, d, f) {
        b = d;
        f && (c = parseInt(f, 10));
        return ""
    });
    var d = {};
    d.argumentIndex = b;
    d.argumentOffset = c;
    a = this.extractParts_(a);
    for (var f = 0; f < a.length; ) {
        var g = a[f].value;
        Ea(g, "Missing plural key element.");
        f++;
        Da(f < a.length, "Missing or invalid plural value element.");
        if (1 == a[f].type)
            var h = this.parseBlock_(a[f].value);
        else
            r("Expected block type.");
        d[g.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = h;
        f++
    }
    Fa(d.other, "Missing other key in plural statement.");
    return d
}
;
e.parseOrdinalBlock_ = function(a) {
    var b = "";
    a = a.replace(Va, function(a, c) {
        b = c;
        return ""
    });
    var c = {};
    c.argumentIndex = b;
    c.argumentOffset = 0;
    a = this.extractParts_(a);
    for (var d = 0; d < a.length; ) {
        var f = a[d].value;
        Ea(f, "Missing ordinal key element.");
        d++;
        Da(d < a.length, "Missing or invalid ordinal value element.");
        if (1 == a[d].type)
            var g = this.parseBlock_(a[d].value);
        else
            r("Expected block type.");
        c[f.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = g;
        d++
    }
    Fa(c.other, "Missing other key in selectordinal statement.");
    return c
}
;
e.buildPlaceholder_ = function(a) {
    Da(0 < a.length, "Literal array is empty.");
    return "\ufddf_" + (a.length - 1).toString(10) + "_"
}
;
var Ya = function() {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = Xa
};
Ya.prototype.implementsGoogStringTypedString = !0;
Ya.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
}
;
Ya.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
}
;
var Za = function(a) {
    if (a instanceof Ya && a.constructor === Ya && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === Xa)
        return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    r("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
}
  , Xa = {}
  , $a = function(a) {
    var b = new Ya;
    b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
    return b
};
$a("");
var bb = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = ab
};
bb.prototype.implementsGoogStringTypedString = !0;
var ab = {};
bb.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
}
;
bb.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
}
;
var cb = function(a) {
    if (a instanceof bb && a.constructor === bb && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === ab)
        return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    r("expected object of type SafeScript, got '" + a + "' of type " + ca(a));
    return "type_error:SafeScript"
};
bb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
    return this
}
;
var eb = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = db
};
eb.prototype.implementsGoogStringTypedString = !0;
var db = {};
eb.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
}
;
eb.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
}
;
var fb = function(a) {
    if (a instanceof eb && a.constructor === eb && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === db)
        return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    r("expected object of type SafeStyle, got '" + a + "' of type " + ca(a));
    return "type_error:SafeStyle"
};
eb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    return this
}
;
var hb = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = gb
};
e = hb.prototype;
e.implementsGoogStringTypedString = !0;
e.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}
;
e.implementsGoogI18nBidiDirectionalString = !0;
e.getDirection = function() {
    return 1
}
;
e.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}
;
var ib = function(a) {
    if (a instanceof hb && a.constructor === hb && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === gb)
        return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    r("expected object of type SafeUrl, got '" + a + "' of type " + ca(a));
    return "type_error:SafeUrl"
}
  , gb = {};
var kb = function() {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = jb
};
e = kb.prototype;
e.implementsGoogStringTypedString = !0;
e.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
}
;
e.implementsGoogI18nBidiDirectionalString = !0;
e.getDirection = function() {
    return 1
}
;
e.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
}
;
var lb = function(a) {
    if (a instanceof kb && a.constructor === kb && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === jb)
        return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    r("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ca(a));
    return "type_error:TrustedResourceUrl"
}
  , jb = {};
var nb = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = mb;
    this.dir_ = null
};
e = nb.prototype;
e.implementsGoogI18nBidiDirectionalString = !0;
e.getDirection = function() {
    return this.dir_
}
;
e.implementsGoogStringTypedString = !0;
e.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}
;
e.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}
;
var ob = function(a) {
    if (a instanceof nb && a.constructor === nb && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === mb)
        return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    r("expected object of type SafeHtml, got '" + a + "' of type " + ca(a));
    return "type_error:SafeHtml"
}
  , mb = {};
nb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    this.dir_ = b;
    return this
}
;
k("ng.safehtml.googSceHelper.isGoogHtmlType", function(a) {
    return a && a.implementsGoogStringTypedString ? !0 : !1
}, void 0);
k("ng.safehtml.googSceHelper.isCOMPILED", function() {
    return !0
}, void 0);
k("ng.safehtml.googSceHelper.unwrapAny", function(a) {
    if (a instanceof kb)
        return lb(a);
    if (a instanceof nb)
        return ob(a);
    if (a instanceof hb)
        return ib(a);
    if (a instanceof eb)
        return fb(a);
    if (a instanceof bb)
        return cb(a);
    throw Error();
}, void 0);
k("ng.safehtml.googSceHelper.unwrapGivenContext", function(a, b) {
    if ("html" == a)
        return ob(b);
    if ("resourceUrl" == a || "templateUrl" == a)
        return lb(b);
    if ("url" == a)
        return b instanceof kb ? lb(b) : ib(b);
    if ("css" == a)
        return fb(b);
    if ("js" == a)
        return cb(b);
    throw Error();
}, void 0);
angular.module("publishAppFrameworkViews", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    function c(a) {
        return a.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    }
    b() && (a.put("/framework/views/carousel-arrow-next.html", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>\n'),
    a.put("/framework/views/carousel-arrow-prev.html", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>\n'),
    a.put("/framework/views/carousel-directive.html", "<div class=\"carousel\" ng-class=\"{'is-touch': isTouch}\">\n  <button class=\"carousel-prev\" aria-label=\"Prev\" tabindex=\"-1\"\n      ng-click=\"navigate(-1)\"\n      track=\"['Widget', trackingName, (isRtl() ? 'Next' : 'Prev')]\"\n      ng-if=\"currentItemOffset > 0\"\n      ng-show=\"!hideButtons\">\n    <ng-include src=\"'/framework/views/carousel-arrow-' + (isRtl() ? 'next' : 'prev') + '.html'\"></ng-include>\n  </button>\n\n  <div class=\"carousel-wrapper\">\n    <ng-transclude\n        class=\"carousel-items\"\n        ng-class=\"{'browser-ie': isBrowserIE}\"\n        ng-style=\"{\n          'transform': 'translate(' + xTransform + 'px, 0px)',\n          '-webkit-transform': 'translate(' + xTransform + 'px, 0px)'\n        }\">\n    </ng-transclude>\n  </div>\n\n  <button class=\"carousel-next\" aria-label=\"Next\" tabindex=\"-1\"\n      ng-click=\"navigate(1)\"\n      track=\"['Widget', trackingName, (isRtl() ? 'Prev' : 'Next')]\"\n      ng-if=\"currentItemOffset < itemsCount - 1 && isBelowMaxTransform()\"\n      ng-show=\"!hideButtons\">\n    <ng-include src=\"'/framework/views/carousel-arrow-' + (isRtl() ? 'prev' : 'next') + '.html'\"></ng-include>\n  </button>\n</div>\n"),
    a.put("/framework/views/embed-footer.html", '<div class="embed-footer">\n  <div class="embed-title-wrapper">\n    <div class="embed-title" bidi="getEmbedHeaderText(widgetIsCurated !== true)"></div>\n  </div>\n\n  <div class="embed-logo">\n    <a href="/trends/{{ storyId ? \'story/\' + storyId : \'\'}}" target="_blank">\n      <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n    </a>\n  </div>\n</div>\n'),
    a.put("/framework/views/embed-header.html", '<div class="embed-header">\n  <div class="embed-title"\n       bidi="storyTitleArray && storyTitleArray.length ? storyTitleArray : storyTitle">\n  </div>\n\n  <div class="embed-subtitle" bidi="getEmbedHeaderText(widgetIsCurated !== true)"></div>\n\n  <div class="embed-logo">\n    <a href="/trends/{{ storyId ? \'story/\' + storyId : \'\'}}" target="_blank" ng-if="!exploreUrlBack">\n      <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n    </a>\n\n    <a href="/trends/{{ exploreUrlBack ? \'explore?\' + exploreUrlBack : \'\'}}" target="_blank" ng-if="exploreUrlBack">\n      <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n    </a>\n  </div>\n</div>\n'),
    a.put("/framework/views/help_dialog.html", '<div class="help-dialog">\n  <div class="help-dialog-title">{{data.title}}</div>\n  <div class="help-dialog-cancel">\n    <md-icon class="close-dialog" ng-click="cancelDialog()"></md-icon>\n  </div>\n  <div class="help-dialog-content" ng-bind-html="data.content"></div>\n  <div class="help-dialog-link" ng-show="data.url">\n    <a href="{{data.url}}" target="_blank">\n      Learn More</a>\n  </div>\n</div>\n'),
    a.put("/framework/views/help_icon.html", '<a class="help-icon-button" ng-click="openDialog()"\n   title="' + c("Help") + '">\n  <md-icon class="help-icon widget-actions-item-icon"></md-icon>\n  <div class="widget-actions-item-text" ng-show="showAnnotation">\n    Help\n  </div>\n</a>\n'),
    a.put("/framework/views/line_chart_directive.html", '<div class="line-chart"></div>\n<div class="chart-cover"></div>\n<div class="chart-cover right"></div>\n<div class="grid-line l1"></div>\n<div class="grid-line l2"></div>\n<div class="grid-line l3"></div>\n<div class="grid-line l4"></div>\n<div class="chart-labels">\n  <div class="label" ng-repeat="label in displayLabels track by $index"\n       ng-style="{\'left\': label.left + \'px\'}">\n    <div class="center">\n      <div class="tick"></div>\n      <div class="text">{{ label.text }}</div>\n    </div>\n  </div>\n</div>\n'),
    a.put("/framework/views/list-item-actions.html", '<button class="list-item more-vert-googblue"\n        title="' + c("Actions menu") + '"\n        track="[\'Widget\', type, \'Actions\']"\n        ng-click="setupClickOutside()">\n</button>\n<div class="list-item-actions-content" ng-show="listActions.menuOpen" ng-mouseleave="hoverOut()">\n  <div class="list-item-actions-item"\n       ng-click="onExploreItemClick()"\n       title="' + c("Explore item") + '">\n    <span class="list-item-actions-item-icon timeline-image flip-rtl"></span>\n    <div class="list-item-actions-item-text">\n      Explore\n    </div>\n  </div>\n  <div class="list-item-actions-item"\n     ng-click="onSearchItemClick()"\n     title="' + c("Search item") + '">\n    <span class="list-item-actions-item-icon search-image flip-rtl"></span>\n    <div class="list-item-actions-item-text">Search on Google</div>\n  </div>\n</div>\n'),
    a.put("/framework/views/sparkline-directive.html", '<div class="sparkline-chart" ng-if="width && height && svgPath">\n  <svg ng-attr-width="{{ width }}"\n       ng-attr-height="{{ height }}"\n       viewBox="0 0 200 100"\n       preserveAspectRatio="none">\n    <g fill="transparent">\n      \x3c!-- Line path. --\x3e\n      <path ng-attr-d="M{{ ::svgPath }}"\n            ng-attr-stroke-width="{{ thickness }}"\n            stroke="{{ ::color }}"\n            vector-effect="non-scaling-stroke" />\n\n      \x3c!-- Area path. --\x3e\n      <path ng-if="drawArea !== false"\n            ng-attr-d="M1,100L{{ ::svgPath }}L200,100"\n            fill="{{ ::color }}"\n            opacity="0.2" />\n    </g>\n  </svg>\n</div>\n\n<ng-transclude ng-if="width && height && svgPath"></ng-transclude>\n'),
    a.put("/framework/views/tv-broadcast-directive.html", '<div class="tv-wrapper">\n  <div class="tv-video">\n  </div>\n  <div class="tv-content">\n    <div class="tv-title-text">\n      <div class="topic-label tv-title" ng-bind-html="markBold(mainTitle)"></div>\n      <div class="tv-sub-title" ng-bind-html="markBold(subTitle)"></div>\n    </div>\n    <div class="tv-trends-logo"></div>\n    <div class="tv-inner-widget" ng-transclude>\n    </div>\n  </div>\n</div>\n'),
    a.put("/framework/views/widget-actions-flatten.html", '<button class="widget-actions-menu more-vert-googblue"\n        title="' + c("Actions menu") + '"\n        track="[\'Widget\', type, \'openYisModal\',]"\n        ng-click="genericAction(\'openYisModal\')"\n        ng-if="globals.isMobileMode">\n</button>\n\n<div ng-if="globals.isDesktopMode" class="flatten-items-wrapper">\n  <button class="flatten-item"\n          ng-class="{\'copy-content-image-small\': ctrl.isSmallTouchDevice,\n                    \'copy-content-image-small-googblue\': !ctrl.isSmallTouchDevice}"\n          ng-click="genericAction(\'copy\')"\n          title="' + c("Copy") + '"\n          track="[\'Widget\', type, \'Copy\']">\n  </button>\n  <button class="flatten-item"\n          ng-class="{\'embed-image-small\': ctrl.isSmallTouchDevice,\n                    \'embed-image-small-googblue\': !ctrl.isSmallTouchDevice}"\n          ng-click="embed()"\n          title="' + c("Embed") + '"\n          track="[\'Widget\', type, \'Embed\']">\n  </button>\n  <button class="flatten-item"\n          ng-class="{\'share-image-small\': ctrl.isSmallTouchDevice,\n                    \'share-image-small-googblue\': !ctrl.isSmallTouchDevice}"\n          ng-if="isEditor || share" ng-click="share()"\n          title="' + c("Share") + '"\n          track="[\'Widget\', type, \'Share\']">\n  </button>\n</div>\n<div class="translate-patch">\n  Copied to clipboard.\n</div>\n'),
    a.put("/framework/views/widget-actions.html", '<button class="widget-actions-menu more-vert"\n   title="' + c("Actions menu") + '"\n   track="[\'Widget\', type, \'Actions\']"\n   ng-click="setupClickOutside()">\n</button>\n<div class="widget-actions-content" ng-show="widgetActions.menuOpen">\n  <button class="widget-actions-item"\n     ng-if="globals.isDesktopMode && screenWidth >= 1024"\n     ng-click="embed()"\n     title="' + c("Embed") + '"\n     track="[\'Widget\', type, \'Embed\']">\n    <span class="widget-actions-item-icon embed-image flip-rtl"></span>\n    <div class="widget-actions-item-text">Embed</div>\n  </button>\n  <button class="widget-actions-item"\n     ng-if="isEditor || share" ng-click="share()"\n     title="' + c("Share") + '"\n     track="[\'Widget\', type, \'Share\']">\n    <span class="widget-actions-item-icon share-image flip-rtl"></span>\n    <div class="widget-actions-item-text">Share</div>\n  </button>\n  <button class="widget-actions-item"\n          ng-if="isEditor || (export && globals.isDesktopMode && screenWidth >= 1024)"\n          ng-click="export()"\n          title="' + c("CSV") + '"\n          track="[\'Widget\', type, \'Export\']">\n    <span class="widget-actions-item-icon csv-image flip-rtl"></span>\n    <div class="widget-actions-item-text">\n      CSV\n    </div>\n  </button>\n  <help-dialog ng-show="!$root.globals.isDesktopMode && helpDialog"\n               class="widget-actions-item" show-annotation="true"\n               data="helpDialog"></help-dialog>\n</div>\n'),
    a.put("/framework/views/widget-directive.html", '<scroll-to offset="widget.offset"\n           on-trigger="onScrollToBind()"\n           ng-if="!isScrolledInto">\n</scroll-to>\n\n<div class="widget-loader-wrapper fe-atoms-generic-container"\n     ng-if="widget.displayLoader || widget.errorMessage ||\n        (!isPrefetched && !isScrolledInto)">\n  <md-progress-circular class="md-default-theme ng-hide"\n                        md-diameter="30px"\n                        md-mode="indeterminate"\n                        ng-show="widget.displayLoader"\n                        aria-valuemin="0"\n                        aria-valuemax="100">\n  </md-progress-circular>\n\n  <ng-include src="widget.errorTemplateUrl"\n              ng-if="!widget.displayLoader && widget.errorMessage">\n  </ng-include>\n</div>\n\n<div class="widget-template"\n     ng-include="widget.templateUrl"\n     ng-if="(isPrefetched || isScrolledInto) && !(widget.displayLoader ||\n        widget.errorMessage) && template">\n</div>\n'),
    a.put("/framework/views/widget-error.html", '\x3c!--TODO(sdimenstein): Organize different error messages in all the widgets.--\x3e\n<div class="widget-error">\n  <p class="widget-error-title">Oops! Something went wrong.</p>\n  <p class="widget-error-desc">Please try again in a bit.</p>\n</div>\n'),
    a.put("/framework/views/widget_loader_template.html", '<div ng-class="{\'widget-loader\': isQuerying}">\n  <widget\n      type="{{model.type}}"\n      version="{{model.version}}"\n      template="{{model.template}}"\n      fields="model.fields"\n      apis="model.external_apis"\n      on-load="onLoad({\'$scope\': $scope, \'controller\': controller})"\n      is-editor="isEditor"\n      ng-if="model">\n  </widget>\n</div>\n'))
}
]);
var qb = function() {
    this.restrict = "E";
    this.template = '<div class="bar-chart-content"></div>';
    this.scope = {
        data: "=?",
        options: "=?",
        watchOptions: "=?"
    };
    this.link = pb.bind(this.link, this)
}, pb, rb, sb;
qb.prototype.redraw_ = function(a) {
    this.scopeDestroy_(a);
    a.data && a.data.length && rb.applyGViz(function(b) {
        var c = google.visualization.arrayToDataTable(a.data);
        (a.barChart_ = new b.ColumnChart(a.gvizElement)).draw(c, a.options)
    })
}
;
qb.prototype.scopeDestroy_ = function(a) {
    a.barChart_ && a.barChart_.clearChart();
    a.barChart_ = null
}
;
qb.prototype.link = function(a, b) {
    var c = this
      , d = pb.debounce(pb.bindKey(this, "redraw_", a), 50);
    a.element = b;
    a.gvizElement = b[0].firstChild;
    a.$watch("data", d);
    a.watchOptions && a.$watch("options", d, !0);
    sb.bind("resize", d);
    a.$on("$destroy", function() {
        c.scopeDestroy_(a)
    })
}
;
var tb = function(a, b, c, d) {
    sb = angular.element(a);
    pb = c;
    rb = d;
    return new qb
};
k("$jscomp.scope.directiveInjector", tb, void 0);
tb.$inject = ["$window", "$timeout", "lodash", "globalsService"];
var ub, vb, wb = function() {
    this.restrict = "A";
    this.scope = {
        bidi: "="
    };
    this.template = '<span ng-bind="bidiText"></span>';
    this.link = ub.bind(this.link, this)
};
wb.prototype.link = function(a, b) {
    b = ub.bind(this.updateDirectionality_, this, a, b);
    a.$watch("bidi", b)
}
;
wb.prototype.updateDirectionality_ = function(a, b) {
    if (ub.isArray(a.bidi))
        b = vb.arrayToWrappedTextHelper(a.bidi);
    else {
        var c = vb.isRtlThreshold(a.bidi);
        b.attr("dir", c ? "rtl" : "ltr");
        b = a.bidi
    }
    a.bidiText = b
}
;
var xb = function(a, b) {
    ub = a;
    vb = b;
    return new wb
};
k("$jscomp.scope.directiveInjector$jscomp$1", xb, void 0);
xb.$inject = ["lodash", "bidiService"];
var yb, zb, Ab, Bb, Cb, Db = function() {
    this.restrict = "E";
    this.templateUrl = "/framework/views/carousel-directive.html";
    this.transclude = !0;
    this.scope = {
        stepSize: "@",
        trackingName: "@",
        hideButtons: "=?"
    };
    this.replace = !0;
    this.isBrowserIE_ = /(msie|trident)/gi.test(yb.navigator.userAgent);
    this.isTouchDevice_ = zb.isTouchDevice();
    this.link = Ab.bind(this.link, this)
};
e = Db.prototype;
e.applyPagination = function(a) {
    "mobile" == zb.getResponsiveMode() ? a.isMobile_ = !0 : a.isMobile_ && (a.element[0].querySelector(".carousel-wrapper").scrollLeft = 0,
    a.currentItemOffset = 0,
    a.isMobile_ = !1);
    var b = this.getItemsElements_(a, !1).length
      , c = this.sumItemsWidth_(a, 0, b)
      , d = a.element[0].offsetWidth;
    a.itemsCount = b;
    a.maxTransform = Math.max(c - d, 0);
    this.applyTransform_(a)
}
;
e.applyTransform_ = function(a) {
    var b = this.isRtl() ? 1 : -1;
    a.xTransform = b * this.sumItemsWidth_(a, 0, a.currentItemOffset)
}
;
e.calcNewItemOffset_ = function(a, b) {
    var c = a.currentItemOffset;
    0 != b && (0 > b || this.isBelowMaxTransform(a)) && (c = Math.min(Math.max(c + a.stepSize * b, 0), a.itemsCount - 1));
    return c
}
;
e.isBelowMaxTransform = function(a) {
    return Math.abs(a.xTransform) < a.maxTransform
}
;
e.link = function(a, b) {
    var c = angular.element(yb)
      , d = Ab.bindKey(this, "onResize_", a);
    Ab.defaults(a, {
        stepSize: 1,
        currentItemOffset: 0,
        xTransform: 0
    });
    a.element = b;
    a.isBrowserIE = this.isBrowserIE_;
    a.isTouch = this.isTouchDevice_;
    a.applyPagination = Ab.bindKey(this, "applyPagination", a);
    a.isBelowMaxTransform = Ab.bindKey(this, "isBelowMaxTransform", a);
    a.navigate = Ab.bindKey(this, "navigate", a);
    c.bind("resize", d);
    a.isRtl = Ab.bindKey(this, "isRtl");
    a.$on("$destroy", function() {
        c.unbind("resize", d)
    });
    d()
}
;
e.getItemsElements_ = function(a, b) {
    var c = a.itemsElements;
    c && !0 !== b || (c = a.itemsElements = a.element.find("ng-transclude").children());
    return c
}
;
e.navigate = function(a, b) {
    0 != b && (b = this.calcNewItemOffset_(a, b),
    a.currentItemOffset = b,
    this.applyTransform_(a))
}
;
e.onResize_ = function(a) {
    a.resizeTimeout && Bb.cancel(a.resizeTimeout);
    a.resizeTimeout = Bb(a.applyPagination, 25)
}
;
e.sumItemsWidth_ = function(a, b, c) {
    var d = this.getItemsElements_(a);
    a = Ab.range(b, c, b < c ? 1 : -1);
    var f = 0;
    Ab.forEach(a, function(a) {
        f += d[a].offsetWidth
    });
    return f
}
;
e.isRtl = function() {
    return "rtl" == angular.element(Cb[0].documentElement).attr("dir")
}
;
var Eb = function(a, b, c, d, f) {
    yb = a;
    Bb = b;
    Ab = c;
    Cb = d;
    zb = f;
    return new Db
};
k("$jscomp.scope.directiveInjector$jscomp$2", Eb, void 0);
Eb.$inject = ["$window", "$timeout", "lodash", "$document", "globalsService"];
var Gb = function() {
    this.restrict = "E";
    this.template = '<div class="donut-directive"></div>';
    this.scope = {
        columns: "=",
        chartData: "=data",
        options: "="
    };
    this.link = Fb.bind(this.link, this)
}, Fb, Hb;
Gb.prototype.drawDonutChart_ = function(a) {
    Hb.applyGViz(function(b) {
        var c = b.arrayToDataTable([a.columns].concat(a.chartData));
        a.donutChart_ = new b.PieChart(a.element[0].firstChild);
        a.donutChart_.draw(c, a.options)
    })
}
;
Gb.prototype.renderTable = function(a) {
    var b = function() {
        angular.element(a.element[0].querySelectorAll("svg g path:not(:first-child)")).remove()
    };
    Hb.applyGViz(Fb.bind(function(c) {
        this.destroy_(a);
        this.drawDonutChart_(a);
        a.columns && "tooltip" === a.columns[2].role && (this.donutMouseOverEvent = c.events.addListener(a.donutChart_, "onmouseover", b),
        this.donutMouseOutEvent = c.events.addListener(a.donutChart_, "onmouseout", b));
        this.donutSelectEvent = c.events.addListener(a.donutChart_, "select", b)
    }, this))
}
;
Gb.prototype.destroy_ = function(a) {
    a.donutChart_ && (a.donutChart_.clearChart(),
    Hb.applyGViz(Fb.bind(function(a) {
        this.donutMouseOverEvent && a.events.removeListener(this.donutMouseOverEvent);
        this.donutMouseOutEvent && a.events.removeListener(this.donutMouseOverEvent);
        this.donutSelectEvent && a.events.removeListener(this.donutSelectEvent)
    }, this)));
    a.donutChart_ = null
}
;
Gb.prototype.link = function(a, b) {
    a.element = b;
    b = Fb.bindKey(this, "destroy_", a);
    a.$on("$destroy", b);
    b = Fb.bindKey(this, "renderTable", a);
    a.$watch("chartData", b, !0)
}
;
var Ib = function(a, b) {
    Fb = a;
    Hb = b;
    return new Gb
};
k("$jscomp.scope.directiveInjector$jscomp$3", Ib, void 0);
Ib.$inject = ["lodash", "globalsService"];
var Kb = function() {
    this.restrict = "E";
    this.template = "<div></div>";
    this.scope = {
        columns: "=",
        data: "=",
        options: "=",
        watchOptions: "@",
        onRegionClick: "&?"
    };
    this.link = Jb.bind(this.link, this)
}, Jb, Lb, Mb;
e = Kb.prototype;
e.redraw_ = function(a) {
    this.scopeDestroy_(a);
    a.data && a.data.length && Lb.applyGViz(function(b) {
        for (var c = new b.DataTable, d = 0; d < a.columns.length; d++)
            c.addColumn(a.columns[d]);
        c.addRows(a.data);
        d = a.geoChart_ = new b.GeoChart(a.gvizElement);
        a.regionClickListener = b.events.addListener(d, "regionClick", a.onRegionClick);
        d.draw(c, a.options)
    })
}
;
e.scopeDestroy_ = function(a) {
    a.geoChart_ && (Lb.applyGViz(function(b) {
        b.events.removeListener(a.regionClickListener)
    }),
    a.geoChart_.clearChart());
    a.geoChart_ = null
}
;
e.link = function(a, b) {
    var c = this
      , d = Jb.bindKey(this, "resizeHandler_", a);
    a.element = b;
    a.gvizElement = b[0].firstChild;
    a.redrawBind = Jb.debounce(Jb.bindKey(this, "redraw_", a), 50);
    a.$watch("data", a.redrawBind);
    "true" === a.watchOptions && a.$watch("options", a.redrawBind, !0);
    Mb.bind("resize", d);
    a.$on("$destroy", function() {
        c.scopeDestroy_(a);
        Mb.unbind("resize", d)
    })
}
;
e.storeContainerWidth_ = function(a) {
    var b = a.element.prop("offsetWidth");
    return a.containerWidth = b
}
;
e.resizeHandler_ = function(a) {
    a.containerWidth !== this.storeContainerWidth_(a) && a.redrawBind()
}
;
var Nb = function(a, b, c, d) {
    Mb = angular.element(a);
    Jb = c;
    Lb = d;
    return new Kb
};
k("$jscomp.scope.directiveInjector$jscomp$4", Nb, void 0);
Nb.$inject = ["$window", "$timeout", "lodash", "globalsService"];
var Ob, Pb, Qb = function() {
    this.restrict = "E";
    this.templateUrl = "/framework/views/help_icon.html";
    this.scope = {
        showAnnotation: "=?",
        data: "="
    };
    this.link = Ob.bind(this.link, this)
};
Qb.prototype.showDialog_ = function(a) {
    Pb.show({
        clickOutsideToClose: !0,
        scope: a,
        preserveScope: !0,
        templateUrl: "/framework/views/help_dialog.html"
    })
}
;
Qb.prototype.cancelDialog_ = function() {
    Pb.hide()
}
;
Qb.prototype.link = function(a) {
    a.openDialog = Ob.bindKey(this, "showDialog_", a);
    a.cancelDialog = Ob.bindKey(this, "cancelDialog_", a)
}
;
var Rb = function(a, b) {
    Ob = a;
    Pb = b;
    return new Qb
};
k("$jscomp.scope.directiveInjector$jscomp$5", Rb, void 0);
Rb.$inject = ["lodash", "$mdDialog"];
var Sb = function() {
    this.restrict = "E";
    this.templateUrl = "/framework/views/line_chart_directive.html";
    this.scope = {
        data: "=",
        options: "=",
        xaxisLabelsArray: "=",
        widgetCsv: "=",
        watchOptions: "=",
        tooltipRow: "=",
        onSelect: "&?"
    };
    this.link = w.bind(this.link, this)
}, w, Tb, Ub, Vb, Wb = ["right", "bottom", "left", "top"];
e = Sb.prototype;
e.redraw_ = function(a) {
    var b = this;
    this.scopeDestroy_(a);
    a.data && a.data.length && Tb.applyGViz(function(c) {
        var d = c.arrayToDataTable(a.data);
        c.events.removeListener(a.selectListener_);
        a.lineChart_ = new c.LineChart(a.gvizElement_);
        a.lineChart_.draw(d, a.options);
        a.onSelect ? (b.setListenerToTVTooltipSelect_(a, c),
        a.tooltipRow || a.lineChart_.setSelection([])) : a.xaxisLabelsArray && (a.displayLabels = b.getDisplayLabels_(a),
        b.setAnnotations_(a));
        c = w.bindKey(b, "setSelectListener_", a, c);
        Ub(c, 100)
    })
}
;
e.setAnnotations_ = function(a) {
    a.selectionArr = [];
    w.forEach(a.widgetCsv.getValues(), function(b, c) {
        for (var d = 1; d <= a.options.colors.length; d++)
            b["tooltip" + d] && a.selectionArr.push({
                column: d + 2 * (d - 1),
                row: c
            })
    }, this)
}
;
e.setSelectListener_ = function(a, b) {
    var c = w.bind(this.activateSelections_, this, a);
    a.selectListener_ = b.events.addListener(a.lineChart_, "select", c);
    a.chartRenderWaitTimer_ && Ub.cancel(a.chartRenderWaitTimer_);
    a.chartRenderWaitTimer_ = Ub(c, 0)
}
;
e.setListenerToTVTooltipSelect_ = function(a, b) {
    a.selectListener_ = b.events.addListener(a.lineChart_, "select", function() {
        a.onSelect(a.lineChart_.getSelection()[0])
    })
}
;
e.scopeDestroy_ = function(a) {
    a.chartRenderWaitTimer_ && Ub.cancel(a.chartRenderWaitTimer_);
    a.lineChart_ && a.lineChart_.clearChart();
    a.lineChart_ = null
}
;
e.resizeHandler_ = function(a) {
    a.containerWidth !== this.storeContainerWidth_(a) && a.redrawBind()
}
;
e.storeContainerWidth_ = function(a) {
    var b = a.element.prop("offsetWidth");
    return a.containerWidth = b
}
;
e.activateSelections_ = function(a) {
    if (a.lineChart_) {
        a.tooltipRow ? a.lineChart_.setSelection([{
            column: 1,
            row: a.tooltipRow
        }]) : a.lineChart_.setSelection(a.selectionArr);
        var b = a.lineChart_.getContainer();
        w.forEach(a.displayLabels, function(c) {
            var d = document.createElement("div")
              , f = a.element[0].querySelector(".tooltip_" + c.index);
            f && (f = f.getAttribute("data-position"),
            d.style.left = c.left + "px",
            d.style.top = c.top + "px",
            d.className = "triangle " + f,
            b.appendChild(d))
        })
    }
}
;
e.getDisplayLabels_ = function(a) {
    var b = a.lineChart_.getChartLayoutInterface()
      , c = []
      , d = a.widgetCsv.getValues();
    w.forEach(a.xaxisLabelsArray, function(a, g) {
        if (a) {
            var f;
            d[g].tooltip1 ? f = "1" : d[g].tooltip2 ? f = "2" : d[g].tooltip3 ? f = "3" : d[g].tooltip4 ? f = "4" : d[g].tooltip5 && (f = "5");
            c.push({
                left: b.getXLocation(g),
                top: b.getYLocation(d[g]["y" + f]),
                text: a,
                index: g + "_" + f
            })
        }
    });
    return c
}
;
e.setNextPosition_ = function(a) {
    3 === a.position && (a.position = -1);
    var b = Wb[a.position + 1];
    a.position += 1;
    var c = "top" === b || "right" === b ? 1 : -1
      , b = "top" === b || "bottom" === b ? 93 : 107;
    a.left += b * c;
    a.right += b * c
}
;
e.handleTooltipClick_ = function(a, b) {
    var c = b.getAttribute("name").replace("tooltip_", "").split("_")
      , d = a.widgetCsv.items[c[0]]
      , f = w.indexOf(Wb, d.value["tooltipPos" + c[1]])
      , g = angular.element(a.gvizElement_).find("svg")[0].getBoundingClientRect()
      , h = b.getBoundingClientRect();
    b = !1;
    f = {
        left: h.left,
        right: h.right,
        position: f
    };
    do
        this.setNextPosition_(f),
        g.left < f.left && g.right > f.right && (b = !0);
    while (!b);d.value["tooltipPos" + c[1]] = Wb[f.position];
    a.$apply()
}
;
e.link = function(a, b) {
    a.element = b;
    a.gvizElement_ = b[0].firstChild;
    a.chartRenderWaitTimer_ = null;
    a.selectionArr = null;
    a.redrawBind = w.debounce(w.bindKey(this, "redraw_", a), 50);
    a.$watch("data", a.redrawBind);
    a.watchOptions && a.$watch("options", a.redrawBind, !0);
    var c = w.bind(this.resizeHandler_, this, a);
    Vb.bind("resize", c);
    b = w.bind(this.scopeDestroy_, this, a);
    a.$on("$destroy", b);
    a.handleTooltipClick = w.bind(this.handleTooltipClick_, this, a);
    var d = this;
    a.$on("$destroy", function() {
        d.scopeDestroy_(a);
        Vb.unbind("resize", c)
    })
}
;
var Xb = function(a, b, c, d) {
    Vb = angular.element(a);
    Ub = b;
    w = c;
    Tb = d;
    return new Sb
};
k("$jscomp.scope.directiveInjector$jscomp$6", Xb, void 0);
Xb.$inject = ["$window", "$timeout", "lodash", "globalsService"];
var Yb, Zb, $b, ac, bc, cc, dc = function() {
    this.restrict = "E";
    this.scope = {
        item: "="
    };
    this.templateUrl = "/framework/views/list-item-actions.html";
    this.link = Yb.bind(this.link, this)
};
e = dc.prototype;
e.setupClickOutside_ = function(a) {
    a.listActions.menuOpen ? this.closeActionsMenu_(a) : a.listActions.menuSetup || (a.listActions.menuOpen = !0,
    a.listActions.menuSetup = !0,
    Zb.bind("click", a.clickOutsideHandler))
}
;
e.clickOutsideHandler_ = function(a) {
    a.listActions.menuSetup ? a.listActions.menuSetup = !1 : (this.closeActionsMenu_(a),
    a.$digest())
}
;
e.closeActionsMenu_ = function(a) {
    a.listActions.menuOpen = !1;
    Zb.unbind("click", a.clickOutsideHandler)
}
;
e.exploreItem_ = function(a) {
    $b.redirectToExplorePage(a.item)
}
;
e.searchItem_ = function(a, b) {
    a = "https://www.google." + a.globals.getDomainSuffix(b.absUrl()) + "/search?q=" + encodeURI(a.item);
    ac.location.href = a
}
;
e.scopeDestroy_ = function(a) {
    Zb.unbind("click", a.clickOutsideHandler)
}
;
e.hoverOut_ = function(a) {
    this.closeActionsMenu_(a)
}
;
e.link = function(a) {
    a.listActions = {};
    a.globals = bc;
    a.setupClickOutside = Yb.bindKey(this, "setupClickOutside_", a);
    a.clickOutsideHandler = Yb.bindKey(this, "clickOutsideHandler_", a);
    a.onSearchItemClick = Yb.bindKey(this, "searchItem_", a, cc);
    a.onExploreItemClick = Yb.bindKey(this, "exploreItem_", a, cc);
    a.hoverOut = Yb.bindKey(this, "hoverOut_", a);
    a.$on("$destroy", Yb.bindKey(this, "scopeDestroy_", a))
}
;
var ec = function(a, b, c, d, f, g) {
    Zb = a;
    Yb = b;
    bc = c;
    cc = d;
    ac = f;
    $b = g;
    return new dc
};
k("$jscomp.scope.directiveInjector$jscomp$7", ec, void 0);
ec.$inject = "$document lodash globalsService $location $window yis2016Service".split(" ");
var fc, gc, hc, ic = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.template = "<ng-transclude></ng-transclude>";
    this.transclude = !0;
    this.scope = {
        offset: "=?",
        onTrigger: "&"
    };
    this.controller = function(c) {
        return b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"];
    this.link = fc.bind(this.link, this)
};
ic.prototype.calcScrollOffset_ = function(a) {
    var b = this.getWindowProperties_("innerHeight")
      , c = a.element[0].getBoundingClientRect();
    return Math.max(c.top - b.innerHeight + a.offset, 0)
}
;
ic.prototype.controller = function(a) {
    fc.defaults(a, {
        offset: 0
    })
}
;
ic.prototype.controller.$inject = ["$scope"];
ic.prototype.getWindowProperties_ = function(a) {
    return fc.pick.apply(fc, [gc].concat(arguments))
}
;
ic.prototype.link = function(a, b) {
    a.element = b;
    a.onScrollBind = fc.debounce(fc.bindKey(this, "onScroll_", a), 25);
    hc.bind("scroll", a.onScrollBind);
    a.onScrollBind();
    a.$on("$destroy", function() {
        hc.unbind("scroll", a.onScrollBind)
    })
}
;
ic.prototype.onScroll_ = function(a) {
    if (0 === this.calcScrollOffset_(a)) {
        var b = a.onTrigger();
        a.$applyAsync();
        b && b["finally"] && b["finally"](a.onScrollBind)
    }
}
;
var jc = function(a, b, c) {
    hc = a;
    gc = b;
    fc = c;
    return new ic
};
k("$jscomp.scope.directiveInjector$jscomp$8", jc, void 0);
jc.$inject = ["$document", "$window", "lodash"];
var kc, lc = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/framework/views/sparkline-directive.html";
    this.transclude = !0;
    this.scope = {
        color: "@?",
        drawArea: "=",
        height: "@?",
        serviceBind: "&?",
        thickness: "@?",
        ticks: "=?",
        width: "@?"
    };
    this.controller = function(c) {
        return b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"]
};
lc.prototype.controller = function(a) {
    var b = a.serviceBind && a.serviceBind()
      , c = kc.bindKey(this, "generate_", a);
    kc.defaults(a, {
        color: "#4284f3",
        height: 22,
        thickness: 2,
        width: 100
    });
    b && (b.then(c),
    a.$on("$destroy", b.cancel));
    a.$watch("ticks", c)
}
;
lc.prototype.controller.$inject = ["$scope"];
lc.prototype.createSVGPath_ = function(a) {
    var b = parseInt(a[0].time)
      , c = parseInt(a[a.length - 1].time);
    return kc.map(a, function(a) {
        var d = (parseInt(a.time) - b) / (c - b);
        return [d ? 200 * d : 0, ",", 100 - a.value].join("")
    }).join("L")
}
;
lc.prototype.generate_ = function(a, b) {
    a.svgPath = kc.isEmpty(b) ? "" : this.createSVGPath_(b)
}
;
var mc = function(a) {
    kc = a;
    return new lc
};
k("$jscomp.scope.directiveInjector$jscomp$9", mc, void 0);
mc.$inject = ["lodash"];
var nc, oc, pc = function() {
    this.restrict = "A";
    this.priority = 1;
    this.scope = {
        track: "=?",
        trackType: "@?"
    };
    this.link = nc.bind(this.link, this)
};
pc.prototype.link = function(a, b) {
    var c = a.track || [];
    if ("load" == a.trackType)
        a.$applyAsync(function() {
            oc.trackEvent.apply(oc, a.track)
        });
    else {
        for (var d = nc.bindKey(this, "onClick_", c, a), f = c.length; 4 > f; f++)
            c[f] = void 0;
        b.bind("click", d)
    }
}
;
pc.prototype.onClick_ = function(a, b, c) {
    var d = c.currentTarget || c.target
      , f = !!d.href
      , g = f ? "trackEventAndRedirect" : "trackEvent"
      , h = a.concat(c);
    /A/i.test(d.tagName) && !f && console.warn("Due to conflict with htmlAnchorDirective anchor links can't have a track attribute without href attribute.");
    b.$apply(function() {
        c.defaultPrevented || oc[g].apply(oc, h)
    })
}
;
var qc = function(a, b) {
    nc = a;
    oc = b;
    return new pc
};
k("$jscomp.scope.directiveInjector$jscomp$10", qc, void 0);
qc.$inject = ["lodash", "trackingService"];
var rc, sc = function() {
    this.restrict = "E";
    this.templateUrl = "/framework/views/tv-broadcast-directive.html";
    this.transclude = !0;
    this.scope = {
        mainTitle: "@",
        subTitle: "@"
    };
    this.link = rc.bind(this.link, this)
};
sc.prototype.markBold = function(a) {
    return a.replace(/#([^#]+)#/g, "<b>$1</b>")
}
;
sc.prototype.link = function(a) {
    a.markBold = rc.bindKey(this, "markBold")
}
;
var tc = function(a) {
    rc = a;
    return new sc
};
k("$jscomp.scope.directiveInjector$jscomp$11", tc, void 0);
tc.$inject = ["lodash"];
var uc, vc, wc = function() {
    this.restrict = "E";
    this.scope = {
        font: "=",
        text: "@",
        displayedText: "="
    };
    this.template = "<div>{{displayedText}}</div>";
    this.canvasElement_ = null;
    this.link = uc.bind(this.link, this)
};
e = wc.prototype;
e.link = function(a, b) {
    var c = angular.element(vc);
    this.scope.displayedText = a.text;
    this.scope.text = a.text;
    this.scope.font = a.font;
    this.canvasElement_ = this.createCanvas_();
    b = uc.bindKey(this, "setTitleWithEllipsis_", a, b);
    a.$watchGroup(["text", "font"], b, !0);
    c.bind("resize", b)
}
;
e.setTitleWithEllipsis_ = function(a, b) {
    a.displayedText = this.getTitleWithEllipsis_(a, b)
}
;
e.createCanvas_ = function() {
    var a = document.createElement("canvas");
    document.body.appendChild(a);
    var b = a.getContext("2d");
    b.font = this.scope.font;
    document.body.removeChild(a);
    return b
}
;
e.getTextWidth_ = function(a, b) {
    this.canvasElement_.font = b.font;
    return this.canvasElement_.measureText(a).width
}
;
e.getTitleWithEllipsis_ = function(a, b) {
    var c = a.text
      , d = b[0].clientWidth
      , f = 2 * d
      , g = this.getTextWidth_("...", a);
    b = this.getTextWidth_(c, a);
    if (b <= d)
        return c;
    d = this.calculateFirstLineBreakDelta_(c, d, a);
    if (b + d <= f)
        return c;
    for (var h = c.length, f = f - g - 50; b + d >= f && 0 < h; )
        h--,
        c = c.substring(0, h),
        b = this.getTextWidth_(c, a);
    return c + "..."
}
;
e.calculateFirstLineBreakDelta_ = function(a, b, c) {
    var d = this
      , f = 0
      , g = "";
    uc.forEach(a.split(" "), function(a) {
        if (d.getTextWidth_(g + " " + a, c) > b)
            return f = b - d.getTextWidth_(g, c),
            !1;
        g += a + " "
    });
    return f
}
;
var xc = function(a, b) {
    vc = b;
    uc = a;
    return new wc
};
k("$jscomp.scope.directiveInjector$jscomp$12", xc, void 0);
xc.$inject = ["lodash", "$window"];
var y, yc, zc, Ac, Bc, Cc, Dc = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/framework/views/widget-directive.html";
    this.scope = {
        template: "@",
        type: "@",
        version: "@",
        fields: "=",
        apis: "=",
        isEditor: "=",
        onLoad: "&?",
        onEvent: "&?",
        isScrolledInto: "=?",
        storyId: "=?",
        isPrefetched: "@?",
        storyTitle: "=?",
        storyTitleArray: "=?",
        storyCountry: "=?",
        storyTimeRange: "=?",
        storyNumberOfItems: "=?",
        showModePicker: "=?",
        widgetIsCurated: "=?",
        embed: "=",
        share: "=",
        "export": "=",
        genericAction: "=",
        palette: "=",
        forcedColor: "@",
        helpDialog: "=?",
        exploreQuery: "=?",
        exploreUrlBack: "@"
    };
    this.controller = function(c, d) {
        return b.call(a, c, d)
    }
    ;
    this.controller.$inject = ["$scope", "$attrs"];
    this.link = y.bind(this.link, this)
};
Dc.prototype.activateApis_ = function(a) {
    y.forIn(a.apis, function(b) {
        a.ctrl.widget.activateAPI(b.name, b.url, b.params, b.autoRefreshTimeout || b.auto_refresh_timeout)
    })
}
;
Dc.prototype.link = function(a, b) {
    window.embedWidgetGlobals = window.embedWidgetGlobals || {};
    a.exploreUrlBack = window.embedWidgetGlobals.exploreUrlBack;
    a.widgetDirectiveElement = b;
    this.onScrollTo(a)
}
;
Dc.prototype.controller = function(a, b) {
    "timeline_chart" === a.type ? a.type = "horserace_chart" : "county_chart" === a.type && (a.type = "svg_map");
    var c = this.getWidgetController_(a);
    a.ctrl = c;
    a.widget = c.widget;
    a.screenWidth = yc.screen.width;
    (a.isPrefetched || a.isScrolledInto) && this.activateApis_(a);
    y.defaults(a, {
        isScrolledInto: !1
    });
    "undefined" === typeof a.storyNumberOfItems && (a.storyNumberOfItems = Infinity);
    a.getHeaderDirection = y.bindKey(this, "getHeaderDirection_", a);
    a.getEmbedHeaderText = y.bindKey(this, "getEmbedHeaderText", a);
    a.getWidgetTemplate = y.bindKey(this, "getWidgetTemplate_", a);
    a.onScrollToBind = y.bindKey(this, "onScrollTo", a);
    a.triggerEvent = y.bindKey(this, "triggerEvent", a);
    if (b.onLoad)
        a.onLoad({
            $scope: a,
            controller: c
        });
    return c
}
;
Dc.prototype.controller.$inject = ["$scope", "$attrs"];
e = Dc.prototype;
e.getHeaderDirection_ = function(a) {
    if (!a.widget.fields.topic)
        return "auto";
    var b = zc.isRtlThreshold(a.widget.fields.topic.value || "");
    return a.widgetIsCurated ? b ? "rtl" : "ltr" : "auto"
}
;
e.getEmbedHeaderText = function(a, b) {
    var c = [];
    a.widget.fields.topic && a.widget.fields.topic.value !== a.storyTitle && c.push(a.widget.fields.topic.value);
    b && (a.storyCountry && c.push(a.storyCountry),
    a.storyTimeRange && c.push(a.storyTimeRange));
    return c.join(". ") + ". "
}
;
e.createControllerByName_ = function(a, b) {
    return Ac(a, {
        $scope: b
    })
}
;
e.getWidgetController_ = function(a) {
    var b = y.template("<%= type %>V<%= version %>Ctrl")({
        type: Bc.titleizeString(Bc.camelizeString(a.type)),
        version: parseInt(a.version) || 1
    })
      , b = this.createControllerByName_(b, a);
    a.fields && b.widget.resetFields(a.fields);
    b.widget.templateUrl = this.getWidgetTemplate_(a);
    return b
}
;
e.getWidgetTemplate_ = function(a) {
    a = {
        type: a.type.replace(/[^-_a-z0-9]/ig, ""),
        version: parseInt(a.version, 10) || 1,
        template: a.template.replace(/[^-_a-z0-9]/ig, "")
    };
    return Bc.underscoreString(y.template("/widgets_library/<%= type %>_v<%= version %>/views/<%=template %>.html")(a))
}
;
e.loadingContent_ = function() {
    this.scope.isPrefetched ? (this.scope.isScrolledInto = !0,
    this.that.activateApis_(this.scope)) : this.that.isWidgetInViewPort_(this.element[0]) && !this.scope.isScrolledInto && (this.scope.isScrolledInto = !0,
    this.that.activateApis_(this.scope))
}
;
e.onScrollTo = function(a) {
    this.onAfterRendering_(this.loadingContent_.bind({
        that: this,
        scope: a,
        element: a.widgetDirectiveElement
    }))
}
;
e.onAfterRendering_ = function(a) {
    "function" === typeof a && Cc(a, 0)
}
;
e.isWidgetInViewPort_ = function(a) {
    if ("fe_featured" === a.parentNode.parentNode.getAttribute("template"))
        return !0;
    for (var b = a.offsetTop, c = a.offsetLeft, d = a.offsetWidth, f = a.offsetHeight; a.offsetParent; )
        a = a.offsetParent,
        b += a.offsetTop,
        c += a.offsetLeft;
    return b < window.pageYOffset + window.innerHeight && c < window.pageXOffset + window.innerWidth && b + f > window.pageYOffset && c + d > window.pageXOffset
}
;
e.triggerEvent = function(a, b, c, d) {
    a.onEvent && (b = y.defaults({
        name: b,
        widget: y.pick(a, "type", "version", "template")
    }, c),
    !1 === a.onEvent({
        event: b
    }) && d && d.preventDefault && d.preventDefault())
}
;
var Ec = function(a, b, c, d, f, g) {
    yc = a;
    Ac = b;
    y = c;
    Bc = d;
    zc = f;
    Cc = g;
    return new Dc
};
k("$jscomp.scope.directiveInjector$jscomp$13", Ec, void 0);
Ec.$inject = "$window $controller lodash helpersFactory bidiService $timeout".split(" ");
var Fc, Gc, Hc, Ic = function() {
    this.restrict = "E";
    this.templateUrl = function(a, b) {
        return "/framework/views/" + ("false" === b.isActionMenu ? "widget-actions-flatten.html" : "widget-actions.html")
    }
    ;
    this.isTouchDevice = Fc.isTouchDevice();
    this.link = Gc.bind(this.link, this)
};
e = Ic.prototype;
e.setupClickOutside_ = function(a) {
    a.widgetActions.menuOpen ? this.closeActionsMenu_(a) : a.widgetActions.menuSetup || (a.widgetActions.menuOpen = !0,
    a.widgetActions.menuSetup = !0,
    Hc.bind("click", a.clickOutsideHandler))
}
;
e.clickOutsideHandler_ = function(a) {
    a.widgetActions.menuSetup ? a.widgetActions.menuSetup = !1 : (this.closeActionsMenu_(a),
    a.$digest())
}
;
e.closeActionsMenu_ = function(a) {
    a.widgetActions.menuOpen = !1;
    Hc.unbind("click", a.clickOutsideHandler)
}
;
e.scopeDestroy_ = function(a) {
    Hc.unbind("click", a.clickOutsideHandler)
}
;
e.link = function(a) {
    a.widgetActions = {};
    a.globals = Fc;
    a.setupClickOutside = Gc.bindKey(this, "setupClickOutside_", a);
    a.clickOutsideHandler = Gc.bindKey(this, "clickOutsideHandler_", a);
    a.$on("$destroy", Gc.bindKey(this, "scopeDestroy_", a))
}
;
var Jc = function(a, b, c) {
    Hc = a;
    Gc = b;
    Fc = c;
    return new Ic
};
k("$jscomp.scope.directiveInjector$jscomp$14", Jc, void 0);
Jc.$inject = ["$document", "lodash", "globalsService", "$timeout"];
var Kc, Lc = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/framework/views/widget_loader_template.html";
    this.scope = {
        templateUrl: "=",
        identifier: "=",
        baseURL: "=baseUrl",
        isEditor: "=",
        onLoad: "&?",
        onSuccess: "&?"
    };
    this.controller = function(c, d) {
        return b.call(a, c, d)
    }
    ;
    this.controller.$inject = ["$scope", "$attrs"]
};
Lc.prototype.controller = function(a) {
    var b = Kc.get(a.identifier, {
        baseURL: a.baseURL
    });
    a.isQuerying = !0;
    b.success(function(b) {
        a.model = b;
        if (a.onSuccess)
            a.onSuccess({
                model: b
            })
    });
    b["finally"](function() {
        a.isQuerying = !1
    })
}
;
Lc.prototype.controller.$inject = ["$scope"];
var Mc = function(a, b, c) {
    Kc = c;
    return new Lc
};
k("$jscomp.scope.directiveInjector$jscomp$15", Mc, void 0);
Mc.$inject = ["$controller", "lodash", "widgetService"];
var Nc, z = function(a) {
    this.palette_ = a || Oc;
    this.hexValues_ = this.paletteDict_ = null
};
k("$jscomp.scope.Colors", z, void 0);
z.$inject = ["palette"];
z.SOCIAL_PALETTE = [{
    name: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "Red",
    hexvalue: "#DB4437"
}, {
    name: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "Teal",
    hexvalue: "#00ACC1"
}, {
    name: "Orange",
    hexvalue: "#FF7043"
}, {
    name: "Olive",
    hexvalue: "#9E9D24"
}, {
    name: "Dark Blue",
    hexvalue: "#5C6BC0"
}, {
    name: "Pink",
    hexvalue: "#F06292"
}, {
    name: "Dark Green",
    hexvalue: "#00796B"
}, {
    name: "Cherry",
    hexvalue: "#C2185B"
}, {
    name: "Grey 1",
    hexvalue: "#424242"
}, {
    name: "Grey 2",
    hexvalue: "#616161"
}, {
    name: "Grey 3",
    hexvalue: "#757575"
}];
var Oc = [{
    name: "PALETTE_COLOR_1",
    caption: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Red",
    hexvalue: "#DB4437"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#E0E0E0"
}, {
    name: "PALETTE_COLOR_7",
    caption: "Blue Grey",
    hexvalue: "#607D8B"
}, {
    name: "PALETTE_COLOR_8",
    caption: "Deep Orange",
    hexvalue: "#FF5722"
}];
z.DEFAULT_PALETTE = Oc;
z.OLYMPICS_PALETTE = [{
    name: "White",
    hexvalue: "#FFFFFF"
}, {
    name: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "Red",
    hexvalue: "#EA4335"
}, {
    name: "Yellow",
    hexvalue: "#FABB05"
}, {
    name: "Green",
    hexvalue: "#34A853"
}];
z.TV_PALETTE = Oc;
z.WIDGET_BACKGROUND_COLOR = "#FDFDFD";
var Pc = {
    Blue: "PALETTE_COLOR_1",
    Red: "PALETTE_COLOR_2",
    Green: "PALETTE_COLOR_3",
    Yellow: "PALETTE_COLOR_4",
    Purple: "PALETTE_COLOR_5",
    Grey: "PALETTE_COLOR_6",
    "Blue Grey": "PALETTE_COLOR_7"
};
z.COLOR_RANGES = {
    "#4285F4": ["#B2CDF9", "#0058EB"],
    "#DB4437": ["#F0C4C0", "#C11203"],
    "#F4B400": ["#EFD8A6", "#CF8D00"],
    "#0F9D58": ["#C1DFD1", "#047F44"],
    "#AB47BC": ["#DDC4E1", "#751086"],
    "#3F51B5": ["#C5CAE9", "#303F9F"],
    "#FF5722": ["#FFCCBC", "#E64A19"],
    "#009688": ["#B2DFDB", "#00796B"],
    "#673AB7": ["#D1C4E9", "#512DA8"],
    "#00BCD4": ["#B2EBF2", "#0097A7"]
};
z.prototype.getPaletteDict_ = function() {
    this.paletteDict_ || (this.paletteDict_ = {},
    Nc.forIn(this.palette_, function(a) {
        this.paletteDict_[a.name] = a
    }, this));
    return this.paletteDict_
}
;
z.prototype.getConfigByName = function(a) {
    var b = this.getPaletteDict_()
      , c = Pc[a];
    c && b[c] && (a = c);
    return b[a]
}
;
z.prototype.getHexValue = function(a) {
    return (a = this.getConfigByName(a)) && a.hexvalue
}
;
z.prototype.getHexValues = function(a) {
    var b;
    arguments.length ? b = Nc.map(arguments, this.getHexValue, this) : (this.hexValues_ || (this.hexValues_ = Nc.pluck(this.palette_, "hexvalue")),
    b = this.hexValues_);
    return b
}
;
var Qc = function(a) {
    Nc = a;
    return {
        Colors: z
    }
};
k("$jscomp.scope.factoryInjector", Qc, void 0);
Qc.$inject = ["lodash"];
var A = {}
  , Rc = function(a, b) {
    this.x = a;
    this.y = b
}
  , Sc = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d;
    this.right = a + c;
    this.bottom = b + d
};
Sc.prototype.divide = function() {
    var a = this.getCenterPoint();
    return [A.createRectFromCoordinates(this.top, a.x, a.y, this.left), A.createRectFromCoordinates(this.top, this.right, a.y, a.x), A.createRectFromCoordinates(a.y, a.x, this.bottom, this.left), A.createRectFromCoordinates(a.y, this.right, this.bottom, a.x)]
}
;
Sc.prototype.getCenterPoint = function() {
    return A.createPoint(this.left + this.width / 2, this.top + this.height / 2)
}
;
Sc.prototype.isPointInside = function(a) {
    return a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
}
;
A.Point = Rc;
A.Rect = Sc;
A.createPoint = function(a, b) {
    return new Rc(a,b)
}
;
A.createRect = function(a, b, c, d) {
    return new Sc(a,b,c,d)
}
;
k("$jscomp.scope.GeometryFactory.createRect", A.createRect, void 0);
A.createRectFromDOM = function(a) {
    a = a.getBoundingClientRect();
    return A.createRect(a.left, a.top, a.width, a.height)
}
;
k("$jscomp.scope.GeometryFactory.createRectFromDOM", A.createRectFromDOM, void 0);
A.createRectFromCoordinates = function(a, b, c, d) {
    return A.createRect(d, a, b - d, c - a)
}
;
k("$jscomp.scope.GeometryFactory.createRectFromCoordinates", A.createRectFromCoordinates, void 0);
var Tc = function() {
    return A
};
k("$jscomp.scope.factoryInjector$jscomp$1", Tc, void 0);
var Uc, Vc, Wc, B = {}, Xc = {
    "<": "lt",
    ">": "gt",
    "&": "amp",
    '"': "quot",
    "'": "apos"
};
B.imagesRegexCreator = function(a) {
    return new RegExp("\\.(" + a.join("|") + ")$")
}
;
B.IMAGE_FORMATS = ["png", "jpg", "jpeg", "gif"];
B.QUERY_STRINGS_RE_ = /[?&]{0,1}([^=&]+)\=?([^=&]*)/g;
B.TIME_ZONES = [{
    name: "GMT-12",
    value: "720"
}, {
    name: "GMT-11",
    value: "660"
}, {
    name: "GMT-10",
    value: "600"
}, {
    name: "GMT-9",
    value: "540"
}, {
    name: "GMT-8",
    value: "480"
}, {
    name: "GMT-7",
    value: "420"
}, {
    name: "GMT-6",
    value: "360"
}, {
    name: "GMT-5",
    value: "300"
}, {
    name: "GMT-4",
    value: "240"
}, {
    name: "GMT-3",
    value: "180"
}, {
    name: "GMT-2",
    value: "120"
}, {
    name: "GMT-1",
    value: "60"
}, {
    name: "GMT-0",
    value: "0"
}, {
    name: "GMT+1",
    value: "-60"
}, {
    name: "GMT+2",
    value: "-120"
}, {
    name: "GMT+3",
    value: "-180"
}, {
    name: "GMT+4",
    value: "-240"
}, {
    name: "GMT+5",
    value: "-300"
}, {
    name: "GMT+6",
    value: "-360"
}, {
    name: "GMT+7",
    value: "-420"
}, {
    name: "GMT+8",
    value: "-480"
}, {
    name: "GMT+9",
    value: "-540"
}, {
    name: "GMT+10",
    value: "-600"
}, {
    name: "GMT+11",
    value: "-660"
}, {
    name: "GMT+12",
    value: "-720"
}, {
    name: "GMT+13",
    value: "-780"
}, {
    name: "GMT+14",
    value: "-840"
}];
B.FIELD_VALIDATION = {
    isHttps: {
        pattern: /^(https:\/\/)/,
        message: "Enter only secured link, please use https:// only."
    },
    isGstatic: {
        pattern: /(gstatic\.com)/,
        message: "Please use images which were uploaded to gstatic.com only."
    },
    isImageFormat: {
        pattern: B.imagesRegexCreator(B.IMAGE_FORMATS),
        message: "Insert only allowed image files:" + B.IMAGE_FORMATS.join(", ")
    }
};
B.camelizeString = function(a) {
    return a = String(a).replace(/[-_\s]+(.)?/g, function(a, c) {
        return c ? c.toUpperCase() : ""
    })
}
;
B.domDebounce = function(a, b, c) {
    var d, f = Uc.debounce(function() {
        d = !1;
        a.apply(this, arguments)
    }, b, c);
    Vc.bind("keydown keypress keyup", function(a) {
        a = a.target.tagName;
        !d || "INPUT" != a && "TEXTAREA" != a || f()
    });
    return function() {
        d = !0;
        return f()
    }
}
;
B.escapeChar = function(a) {
    var b = a || "";
    a in Xc && (b = "&" + Xc[a] + ";");
    return b
}
;
B.escapeHTML = function(a) {
    Uc.isNull(a) || Uc.isUndefined(a) || "" === a || (a = String(a).replace(/[&<>"']/g, B.escapeChar));
    return a || ""
}
;
B.openWindow = function(a, b, c) {
    c || (c = {});
    var d = c.width, f = c.height, g;
    c = Uc.extend({
        height: f,
        left: d ? window.screen.width / 2 - d / 2 : void 0,
        location: "no",
        menubar: "no",
        status: "no",
        toolbar: "no",
        top: f ? window.screen.height / 2 - f / 2 : void 0,
        width: d
    }, c);
    c = Uc.map(c, function(a, b) {
        return b + "=" + a
    }).join(",");
    g = window.open(a, b, c);
    g.onLoad = function(a) {
        g.addEventListener ? g.addEventListener("load", a, !1) : g.attachEvent("load", a)
    }
    ;
    return g
}
;
B.parseQueryStrings = function(a) {
    for (var b = B.QUERY_STRINGS_RE_, c = {}, d; null !== (d = b.exec(a)); )
        c[d[1]] = d[2];
    return c
}
;
B.slugifyString = function(a) {
    return a = String(a).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
}
;
B.titleizeString = function(a) {
    return a = String(a).replace(/(?:^|\s|-)\S/g, function(a) {
        return a.toUpperCase()
    })
}
;
B.underscoreString = function(a) {
    return a = String(a).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
}
;
B.isBreakLineTitle = function(a, b) {
    var c = document.createElement("canvas");
    document.body.appendChild(c);
    var d = c.getContext("2d");
    d.font = "38px Roboto Condensed";
    b && (b = (b = b.replace(/#/g, "")) ? b.toUpperCase() : "");
    d.fillText(b, 0, 0);
    a = d.measureText(b).width > a;
    document.body.removeChild(c);
    return a
}
;
B.isRTL = function(a) {
    return Wc.isRtlThreshold(a)
}
;
k("$jscomp.scope.helpersFactory.isRTL", B.isRTL, void 0);
var Yc = function(a, b, c) {
    Vc = a;
    Uc = b;
    Wc = c;
    return B
};
k("$jscomp.scope.factoryInjector$jscomp$2", Yc, void 0);
Yc.$inject = ["$document", "lodash", "bidiService"];
var Zc = window._.noConflict()
  , $c = function() {
    return Zc
};
k("$jscomp.scope.factoryInjector$jscomp$3", $c, void 0);
var ad, bd, cd, dd = function(a) {
    this.q_ = ad.defer();
    this.data = a;
    this.isActive = !0;
    this.promise = this.q_.promise;
    this.promise.cancel = bd.bindKey(this, "cancel")
};
dd.prototype.cancel = function() {
    this.isActive = !1;
    return this
}
;
dd.prototype.reject = function() {
    this.isActive && this.q_.reject.apply(this, arguments);
    return this
}
;
dd.prototype.resolve = function() {
    this.isActive && this.q_.resolve.apply(this, arguments);
    return this
}
;
var ed = function(a, b) {
    b = bd.defaults(b || {}, {
        batchSize: 1,
        delayTime: 0,
        isActive: !0,
        parallelBatches: 1
    });
    this.batchSize_ = Math.max(b.batchSize, 1);
    this.delayPromise_ = void 0;
    this.delayTime_ = Math.max(b.delayTime, 0);
    this.isActive = !!b.isActive;
    this.items_ = [];
    this.iterationCallback_ = bd.isFunction(a) ? a : bd.noop;
    this.parallelBatches_ = Math.max(b.parallelBatches, 1);
    this.pendingBatches_ = {};
    this.pendingCount_ = 0;
    this.processItemsBind_ = bd.bindKey(this, "processItems_")
};
e = ed.prototype;
e.cycle_ = function() {
    this.delayPromise_ && cd.cancel(this.delayPromise_);
    this.isActive && (this.delayPromise_ = cd(this.processItemsBind_, this.delayTime_))
}
;
e.next_ = function(a) {
    a in this.pendingBatches_ && (delete this.pendingBatches_[a],
    this.pendingCount_--);
    this.cycle_()
}
;
e.processItems_ = function() {
    if (this.isActive && this.pendingCount_ < this.parallelBatches_) {
        var a = this.takeBatch_();
        if (a && a.length) {
            var b = bd.uniqueId()
              , c = bd.bindKey(this, "next_", b);
            this.pendingBatches_[b] = a;
            this.pendingCount_++;
            this.iterationCallback_(a, c);
            this.processItems_()
        }
    }
}
;
e.push = function(a) {
    a = new dd(a);
    this.items_.push(a);
    this.cycle_();
    return a
}
;
e.start = function() {
    this.isActive = !0;
    this.cycle_();
    return this
}
;
e.stop = function() {
    this.isActive = !1;
    return this
}
;
e.takeBatch_ = function() {
    for (var a = []; this.items_.length && a.length < this.batchSize_; ) {
        var b = this.items_.shift();
        b.isActive && a.push(b)
    }
    return a
}
;
var fd = function(a, b, c) {
    ad = a;
    cd = b;
    bd = c;
    return {
        Queue: ed,
        QueueItem: dd
    }
};
k("$jscomp.scope.factoryInjector$jscomp$4", fd, void 0);
fd.$inject = ["$q", "$timeout", "lodash"];
var gd, hd, id, jd, kd = function(a, b) {
    this.isEditor = !!b;
    this.apis = {};
    this.fields = {};
    this.fieldsList = [];
    this.isShowLoader = this.isRender = this.displayLoader = this.isQuerying = !1;
    this.templateUrl = "";
    this.errorTemplateUrl = "/framework/views/widget-error.html";
    this.errorMessage = null;
    this.isShowErrorMsg = !1;
    this.offset = gd.isDesktopMode ? -184 : -110;
    hd.forEach(a, this.addFieldData.bind(this))
};
e = kd.prototype;
e.addFieldData = function(a) {
    this.isEditor || (hd.isString(a.value) ? a.value = "" : hd.isArray(a.values) && (a.values = []));
    this.addField(a)
}
;
e.activateAPI = function(a, b, c, d) {
    if (a = this.apis[a])
        b && (a.url = b),
        c && (a.isActive = !1,
        a.setParams(c)),
        a.isActive = !0,
        d && a.setAutoRefreshTimeout(d),
        a.dispatch(),
        a.dispatchToggles(!0);
    return a
}
;
e.addField = function(a) {
    a = hd.isPlainObject(a) ? id.create(a) : a;
    this.fields[a.name] = a;
    this.fieldsList.push(a);
    return a
}
;
e.reduce = function(a) {
    var b = hd.chain(this.apis).filter("isActive", !0).invoke("reduce").value()
      , c = a ? hd.filter(this.fieldsList, function(b) {
        return b.isTemplateSupported(a)
    }) : this.fieldsList;
    return {
        apis: b,
        fields: hd.invoke(c, "reduce")
    }
}
;
e.registerAPI = function(a, b, c, d, f, g, h) {
    b = new jd(this,a,b,c,d,f,g,h);
    return this.apis[a] = b
}
;
e.resetFields = function(a) {
    var b = this;
    hd.forEach(a, function(a) {
        var c = a.name
          , f = b.fields[c];
        f && (hd.extend(f.config, a.config),
        b.setFieldValue(c, a.value || a.values))
    })
}
;
e.serialize = function() {
    return JSON.stringify(this.reduce())
}
;
e.setFieldValue = function(a, b) {
    (a = this.fields[a]) && a["list" == a.type ? "setValues" : "setValue"].call(a, b);
    return a
}
;
var ld = function(a, b, c, d) {
    hd = a;
    id = b;
    jd = c;
    gd = d;
    return kd
};
k("$jscomp.scope.factoryInjector$jscomp$5", ld, void 0);
ld.$inject = ["lodash", "widgetFieldFactory", "widgetAPIFactory", "globalsService"];
var C, md, nd, od = function(a, b, c, d, f, g, h, m, l, n) {
    this.widget = a;
    this.name = b;
    this.url = c;
    this.params = {};
    this.paramsSettings = C.map(f, function(a) {
        a.path = a.path.split(".");
        return a
    });
    this.paramsSerialized_ = "";
    this.isActive = !!g;
    this.service_ = h;
    this.middlewares_ = [];
    this.runInBackground_ = !!l;
    this.toggles_ = [];
    this.showInEditor = !0;
    this.autoRefreshTimeout = n;
    this.dataRefreshTimeoutPromise_ = void 0;
    this.setParams(d);
    C.forIn(m, C.bindKey(this, "middleware"));
    this.paramsGetterSetter = C.bind(this.paramsGetterSetter, this)
};
e = od.prototype;
e.dispatch = function(a) {
    if (this.isActive) {
        a = !0 === a;
        var b = this, c = C.clone(this.params), d;
        d = this.service_ ? this.service_(this.url, c) : md.get(this.url, {
            params: c
        });
        this.widget.errorMessage = null;
        this.widget.isQuerying = !0;
        this.runInBackground_ || (this.widget.displayLoader = !0,
        d.then(null, function() {
            b.widget.errorMessage = "Server error"
        }));
        d["finally"](function() {
            b.widget.isQuerying = !1;
            b.widget.displayLoader = !1
        });
        d.then(C.bindKey(this, "onSuccess_", c, a), null);
        nd.cancel(this.dataRefreshTimeoutPromise_);
        C.isNumber(this.autoRefreshTimeout) && 1 <= this.autoRefreshTimeout && (this.dataRefreshTimeoutPromise_ = nd(C.bindKey(this, "dispatch", !0), 6E4 * this.autoRefreshTimeout));
        return d
    }
}
;
e.dispatchToggles = function(a) {
    C.invoke(this.toggles_, C.call, this, a)
}
;
e.middleware = function(a) {
    C.isFunction(a) && this.middlewares_.push(a);
    return this
}
;
e.toggle = function(a) {
    C.isFunction(a) && this.toggles_.push(a);
    return this
}
;
e.setAutoRefreshTimeout = function(a) {
    this.autoRefreshTimeout = a;
    return this
}
;
e.setShowInEditor = function(a) {
    this.showInEditor = a;
    return this
}
;
e.onSuccess_ = function(a, b, c) {
    var d = this.widget;
    c && c.data && (c = c.data);
    C.forIn(this.middlewares_, function(d) {
        c = d(c, a, b)
    });
    C.forIn(c, function(a, b) {
        d.setFieldValue(b, a)
    })
}
;
e.paramsGetterSetter = function(a) {
    if (!C.isUndefined(a)) {
        var b;
        try {
            b = JSON.parse(a)
        } catch (c) {}
        this.setParams(b);
        this.paramsSerialized_ = a
    }
    return this.paramsSerialized_
}
;
e.reduce = function() {
    return {
        name: this.name,
        url: this.url,
        params: this.params,
        autoRefreshTimeout: this.autoRefreshTimeout
    }
}
;
e.runInBackground = function() {
    this.runInBackground_ = !0;
    return this
}
;
e.setService = function(a) {
    this.service_ = a;
    return this
}
;
e.setParams = function(a) {
    a && !C.isEqual(a, this.params) && (this.params = a,
    this.paramsSerialized_ = JSON.stringify(a),
    this.isActive && this.dispatch());
    return this
}
;
e.onChange = function() {
    this.dispatch();
    this.dispatchToggles(this.isActive)
}
;
var pd = function(a, b, c) {
    md = a;
    nd = b;
    C = c;
    return od
};
k("$jscomp.scope.factoryInjector$jscomp$6", pd, void 0);
pd.$inject = ["$http", "$timeout", "lodash"];
var D, E = {}, F = function(a, b, c, d) {
    this.name = a;
    this.type = b || "string";
    this.value = c;
    this.config = d || {};
    this.templatesByKey_ = {};
    D.forEach(this.config.templates, function(a) {
        this.templatesByKey_[a] = !0
    }, this);
    this.setValue = D.bind(this.setValue, this)
};
F.prototype.isEmpty = function() {
    return D.isEmpty(this.value)
}
;
F.prototype.isTemplateSupported = function(a) {
    return this.config.templates ? !!this.templatesByKey_[a] : !0
}
;
F.prototype.reduce = function() {
    return D.pick(this, "name", "type", "value", "config")
}
;
F.prototype.setValue = function(a) {
    "" === a && (a = void 0);
    D.isFunction(this.castValue_) && (a = this.castValue_(a));
    return this.value = a
}
;
var qd = function(a, b, c) {
    F.call(this, a, "integer", b, c)
};
p(qd, F);
qd.prototype.castValue_ = function(a) {
    a = parseInt(a);
    var b = void 0;
    D.isNaN(a) || (b = a);
    return b
}
;
var rd = function(a, b, c) {
    F.call(this, a, "boolean", b, c)
};
p(rd, F);
rd.prototype.castValue_ = function(a) {
    return D.isString(a) ? "true" == a.toLowerCase() : !!a
}
;
var sd = function(a, b, c) {
    F.call(this, a, "map", b || {}, c)
};
p(sd, F);
sd.prototype.isEmpty = function() {
    var a = this.config.keys ? D.pick(this.value, this.config.keys) : this.value;
    return !D.values(a).join("")
}
;
sd.prototype.getKeyConfig = function(a) {
    var b = this.config
      , c = D.clone(b);
    D.has(b.keysConfig, a) && D.extend(c, b.keysConfig[a]);
    return c
}
;
sd.prototype.focus = function(a, b) {
    a.field.config.isFocused = !0;
    b.target.onblur = function() {
        a.field.config.isFocused = !1;
        a.$apply()
    }
    ;
    b.target.onchange = function() {
        a.field.config.isFocused = !0;
        a.$apply()
    }
}
;
sd.prototype.setValue = function(a) {
    try {
        this.value = D.isPlainObject(a) ? a : JSON.parse(a)
    } catch (b) {
        this.value = {}
    }
    return this.value
}
;
var td = function(a, b, c, d, f) {
    F.call(this, a, "list", void 0, f);
    this.subtype = b || "string";
    this.maxLimit = d;
    this.items = [];
    this.setValues(c)
};
p(td, F);
e = td.prototype;
e.exportAsCSV = function() {
    var a = this.reduce();
    "map" !== this.subtype && (a.values = D.map(a.values, function(a) {
        return {
            value: a
        }
    }),
    a.config.keys = ["value"]);
    D.isFunction(this.config.csvSetter) && (a = this.config.csvSetter(a));
    return a
}
;
e.getItem = function(a) {
    var b;
    0 <= a && (!this.maxLimit || a < this.maxLimit) && ((b = this.items[a]) || (b = this.items[a] = E.create(D.extend({
        name: this.name,
        type: this.subtype
    }, this.config))));
    return b
}
;
e.getValue = function(a) {
    return (a = this.getItem(a)) && a.value
}
;
e.getValues = function() {
    var a = [];
    D.forEachRight(this.items, function(b) {
        !a.length && b.isEmpty() || a.unshift(b.value)
    });
    return a
}
;
e.importAsCSV = function(a) {
    "map" !== this.subtype && (a = D.map(a, function(a) {
        return a.value
    }));
    D.isFunction(this.config.csvGetter) && (a = this.config.csvGetter(a));
    this.setValues(a)
}
;
e.reduce = function() {
    var a = D.pick(this, "name", "type", "subtype", "maxLimit", "config");
    a.values = this.getValues();
    return a
}
;
e.setValue = function(a, b) {
    a = this.getItem(a);
    var c;
    a && (c = a.setValue(b));
    return c
}
;
e.setValues = function(a) {
    var b = this;
    this.items = [];
    D.forEach(a, function(a, d) {
        b.setValue(d, a)
    })
}
;
E.Base = F;
E.Integer = qd;
E.Map = sd;
E.List = td;
E.Boolean = rd;
E.create = function(a) {
    a || (a = {});
    var b = D.pick(a, "csvGetter csvKeys csvSetter editable gridSpan keys keysConfig options placeholder textarea visible notification translation validation colorPalette templates imageUpload".split(" "))
      , c = a.name;
    switch (a.type) {
    case "integer":
        a = new E.Integer(c,a.value,b);
        break;
    case "map":
        a = new E.Map(c,a.value,b);
        break;
    case "list":
        a = new E.List(c,a.subtype,a.values,a.maxLimit,b);
        break;
    case "boolean":
        a = new E.Boolean(c,a.value,b);
        break;
    default:
        a = new E.Base(c,"string",a.value,b)
    }
    return a
}
;
var ud = function(a) {
    D = a;
    return E
};
k("$jscomp.scope.factoryInjector$jscomp$7", ud, void 0);
ud.$inject = ["lodash"];
var vd = function(a, b) {
    return "M" + a.map(function(a, d) {
        return d * b + "," + a
    }).join(" L")
}
  , wd = function() {
    return vd
};
k("$jscomp.scope.filterInjector", wd, void 0);
wd.$inject = ["lodash"];
var yd = function(a, b, c, d) {
    b = xd.range(b, c, d);
    a.push.apply(a, b);
    return a
}, xd, zd = function(a) {
    xd = a;
    return yd
};
k("$jscomp.scope.filterInjector$jscomp$1", zd, void 0);
zd.$inject = ["lodash"];
var Bd = function(a) {
    return Ad.titleizeString(a)
}, Ad, Cd = function(a) {
    Ad = a;
    return Bd
};
k("$jscomp.scope.filterInjector$jscomp$2", Cd, void 0);
Cd.$inject = ["helpersFactory"];
var Dd = function(a) {
    return a ? a.replace(/\s([^\s]+)$/, "\u00a0$1") : a
}
  , Ed = function() {
    return Dd
};
k("$jscomp.scope.filterInjector$jscomp$3", Ed, void 0);
var Fd = function() {
    this.htmlDir_ = document.documentElement.getAttribute("dir")
};
k("$jscomp.scope.BidiService", Fd, void 0);
var Gd = /^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/
  , Hd = /^[\x00- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff]*$|^http:\/\//;
e = Fd.prototype;
e.arrayToWrappedTextHelper = function(a, b) {
    a = this.wrapTextArrayUnicode_(a).join(b || ", ");
    return this.wrapTextUnicodeByPageDirection(a)
}
;
e.wrapTextArrayUnicode_ = function(a) {
    for (var b = [], c = 0; c < a.length; c++)
        b.push(this.wrapTextUnicode_(a[c]));
    return b
}
;
e.wrapTextUnicode_ = function(a) {
    return this.isRtlThreshold(a) ? this.wrapRtlUnicode_(a) + (this.isPageRtl() ? "" : "\u200e") : this.wrapLtrUnicode_(a) + (this.isPageRtl() ? "\u200f" : "")
}
;
e.wrapRtlUnicode_ = function(a) {
    return "\u202b" + a + "\u202c"
}
;
e.wrapLtrUnicode_ = function(a) {
    return "\u202a" + a + "\u202c"
}
;
e.wrapTextUnicodeByPageDirection = function(a) {
    return this.isPageRtl() ? this.wrapRtlUnicode_(a) : this.wrapLtrUnicode_(a)
}
;
e.isTextRtl_ = function(a) {
    return Gd.test(a)
}
;
e.isNeutralText_ = function(a) {
    return Hd.test(a)
}
;
e.isPageRtl = function() {
    return "rtl" == this.htmlDir_
}
;
e.rtlWordRatio_ = function(a) {
    var b = 0
      , c = 0;
    a = a.split(" ");
    for (var d = 0; d < a.length; d++)
        this.isTextRtl_(a[d]) ? (b++,
        c++) : this.isNeutralText_(a[d]) || c++;
    return 0 == c ? 0 : b / c
}
;
e.isRtlThreshold = function(a) {
    return .4 < this.rtlWordRatio_(a || "")
}
;
var Id = function() {
    this.json_ = {
        max_bucket: 897,
        stories: [{
            subtitle: "Remembering the ones we lost in 2015",
            name: "Farewell",
            color: "#3F51B5",
            bucket: 123,
            date: "Jan 04 2015",
            peak_index: 2,
            data: [5.1621354555679995, 29.114195047392, 1.1346299910816, .6389360483791999, .5078963894576, .5730408603296, .4674564404432, 1.4338401756432, 25.543678786912, 7.457387373695999, 1.4137848320959998, .8148606922352, .6775946904064, .5669429295712, .6116106016384, .4959408891424, .525353856456, 1.008002441888, 4.093976860895999, 1.3055926578032, .730253549272, .6363743906416, 8.543655373968, 2.128052715152, .6075475095455999, .561836077192, .5472234331824, .5592579563584, .8269511899376, .6004617930271999, .5854573273328, .6048903658512, 14.574910593568, 4.282841498208, .917208467448, 13.831865218704, 1.5895744785648, 1.0810426136015998, 8.419260220592, 1.3831404252016, .8352584681792, .7112419660112, .9197075654208, 1.6210947221663998, 1.2333558851744, .60765287336, .5332396794400001, 1.1203531942304, .6628602194864, .7124404794],
            max_volume: 8.84226,
            link: "/trends/story/US_cu_ZQp2IVEBAABCqM_en"
        }, {
            subtitle: "The world doubts its eyes",
            name: "The Dress",
            color: "#009688",
            bucket: 73,
            date: "Feb 28 2015",
            peak_index: 9,
            data: [.306058178136, .32204907036, .320037006312, .326324046336, .328111667544, .307436521224, .335050912056, .349370365248, 44.8719328248, 16.382267726880002, 3.70861427304, 1.714051485552, 1.071189100704, 1.002541277712, .943853435808, .7817713787760001, .709469098248, .6880308462720001, .646173576864, .665821567128, .624568973136, .586286946144, .569018049984, .56832887844, .601512092208, .519820179456, .519233987568, .522592708656, .5004916901759999, .49160111320800004, .485200531512, .4882291896, .479481199848, .48296666512799996, .481556635992, .490439291448, .474720371136, .47436918410400003, .512566714968, .50976249972, .48881010048, .534488179176, .526339583832, .52408723392, .5031982067759999, .584536291992, .57059971188, .63894915792, .6631520175839999, .670698578016],
            max_volume: 16.9937,
            link: "/trends/story/US_cu_9wXO1FABAABpUM_en"
        }, {
            subtitle: "Hollywood honors the cinematic achievements of the past year in film",
            name: "Oscars 2015",
            color: "#FF5722",
            bucket: 406,
            date: "Feb 22 2015",
            peak_index: 8,
            data: [2.2458869999999997, 2.041893, 7.156683, 4.356333, 3.3620310000000004, 3.225105, 3.789927, 7.161435000000001, 47.33055, 4.424841, 2.7147959999999998, 2.117772, 1.919691, 1.8066239999999998, 1.754298, 1.549062, 1.540116, 1.4548230000000002, 1.413504, 1.3795469999999999, 1.392678, 1.386819, 1.3445909999999999, 1.328859, 1.340874, 1.329723, 1.265481, 1.239012, 1.286469, 1.256634, 1.198611, 1.209402, 1.238625, 1.248993, 1.2678660000000002, 1.252593, 1.2761280000000002, 1.384452, 1.4114790000000002, 1.250559, 1.274337, 1.291617, 1.304181, 1.263069, 1.253232, 1.354932, 1.26108, 1.3523580000000002, 1.419642, 1.501956],
            max_volume: 52.5895,
            link: "/trends/story/US_cu__pK4HFEBAAAXDM_en"
        }, {
            subtitle: "The 11th Cricket World Cup: jointly hosted by Australia and New Zealand",
            name: "Cricket World Cup",
            color: "#9C27B0",
            bucket: 323,
            date: "Mar 15 2015",
            peak_index: 11,
            data: [2.33668327572, 5.4882913671999995, 4.6196622604, 4.1351325088, 4.1918608615999995, 7.7736607748, 26.157182405999997, 39.669870604, 36.77008908, 34.564318852, 43.050456192, 43.529356619999994, 33.06751706, 12.4740915912, 1.78780518836, 1.44797080912, 1.27177298044, 1.13349014192, 1.12943539724, 1.15819117876, 1.1505847932, 1.150000105, 1.2956826486, 2.210801266, 1.74062221036, 1.9177256258799997, 1.89171923864, 2.2851246544, 1.01931821308, .8480562406, .66908454232, .58872934728, .59950120756, .5631526378799999, .66735767252, .72263110352, .72625888984, 1.0343406205999999, 1.04534907564, .92218654592, .9056194737599998, .90971229116, .91320954244, .94062462032, .71296063264, .5975703767599999, .5104028843199999, .5693095405999999, .52519413604, .6843462640799999],
            max_volume: 16.0065,
            link: "/trends/story/US_cu_Lh5L2lABAAA1RM_en"
        }, {
            subtitle: "How the world wanted to help",
            name: "Nepal earthquake",
            color: "#0F9D58",
            bucket: 85,
            date: "Apr 26 2015",
            peak_index: 17,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8.900909782400001, 41.802637539200006, 6.991954325280001, 11.55974679856, 3.4215312996800007, 2.5780297478880003, 1.9120040988000004, 1.755051033728, 1.5266108335200002, 1.3242006946240001, 1.1419256398560003, .79894080672, .6197031544, .72686923152, .50818187488, .49912024408, .5925660287360001, .45183398524800006, .394800502464, .37163925512, .33723034635200005, .37376066016000004, .30284672585600003, .23397215019840004, .24034676160800003, .19501388129760003, .2008959333648, .430218132304, .19664413189920002, .17831715921920002, .2569552557152, .19407175267520002, .1939897062816, .21593852147360001],
            max_volume: 14.8774,
            link: "/trends/story/US_cu_nmOD1lABAABNNM_en"
        }, {
            subtitle: "World football's governing body rocked by scandal",
            name: "FIFA in crisis",
            color: "#F4B400",
            bucket: 42,
            date: "May 31 2015",
            peak_index: 22,
            data: [.32181510128800006, .3921462382848, .6004213326528, .36403445228864, .5362742275648, .37311248564160004, .36096107516512005, .3903081912, .3854325683104, .36121463708224, .3752458013344, .4016280514592, .444859066528, .37591384656, .4367613249536, .488282006192, .5179380470080001, .5391309513472, .6310296147296001, .7104421068512, .7554521152832, 11.989529462144, 14.262507206528001, 2.4853681449760003, 1.2494623324704002, .9385850876800002, .8655836152096, .8748735037888, .6673365809408001, 2.5515636760320004, .8146608529024001, .6587553370208, .607256800928, .5189050516992, .5200676718432, .5190157774272001, .49489602301120006, .6071054757664001, 1.0416633587328, .9982182739232001, 1.3395377121984, .7906333699264, .7439071127104001, .8304171239968, .6847574288128, .6564116424448001, .4872005849152001, .5362963727104, .4759988320992, .47482883024],
            max_volume: 3.86428,
            link: "/trends/story/US_cu_jHQFBVEBAADY8M_en"
        }, {
            subtitle: "The world's best fight it out in Canada",
            name: "Women's World Cup",
            color: "#673AB7",
            bucket: 113,
            date: "Jun 07 2015",
            peak_index: 23,
            data: [.8466001544671999, .8670017381088, 1.0416678673408, .8725990602784001, .7873382471808, .7953373796032001, .9137197082272, .8970071118848, .9697515948288, 1.0700961904192, 1.1265594366208, .9676707161184, 1.0125804267936, 1.0811804067008, 1.1578623400736001, 1.0132878565376, 1.030949444, 1.2079138571808, 1.0976824995584, 1.3534718406047999, 1.3637243955776, 2.269520890672, 6.794120752608, 23.686956390272, 15.823408917344, 19.150606292832, 18.335440175136, 14.9276303176, 1.6150759090592002, 1.5642479446720001, 1.320702314512, 1.273735881264, 1.1186983392704002, 1.2229251712608, 1.4043274120064, 1.438463485312, 1.3756299205376, 1.3289568118176, 1.3216064442336, 1.1805829129248, 1.1887683926944, 1.178112085136, 1.2277184391359999, 1.1800790849120002, 1.0488871016064, 1.1169970570080001, .9830616266464, .9533495773984, .94459125208, 1.2652156664448],
            max_volume: 6.86404,
            link: "/trends/story/US_cu_J7446VABAABP1M_en"
        }, {
            subtitle: "An economy nears collapse",
            name: "Greece on the brink",
            color: "#4285F4",
            bucket: 35,
            date: "Jun 28 2015",
            peak_index: 26,
            data: [.17761747697936, .505316877052, .32955363711288, .35846237417312, .7187395986232, .5964264908296, .6855438226976, 1.0014600798216, .5054239478648, .38184855166744, .4968238672224, .4949845436168, .4251781976288, .36706245481551997, .4515635050688, .5208689126111999, .6316298444952, .5097106043344, .50294602334, .5345472089464, .4425810286664, .5930805279296001, .7541456220416, .8562758816224, 2.4131925705471997, 2.7246003816608, 8.414733417528, 8.106063560056, 4.33617672052, 1.1864707964248, .7014438383984001, .5700450073472, .5050759677232, .5263715875975999, .5463211743968, .9452173114408, .939775819776, .872875681564, .6966753632711999, .5290407100023999, .4684998132792, .4392809532576, .4486572972928, .4654980065632, .4332391002496, .4547297419616, .4345315979184, .35129015929856, .35119532515008, .30116687026504],
            max_volume: 2.20053,
            link: "/trends/story/US_cu_jEuM21ABAABQEM_en"
        }, {
            subtitle: "An agreement reached",
            name: "Iran Nuclear deal",
            color: "#00BCD4",
            bucket: 20,
            date: "Jul 12 2015",
            peak_index: 28,
            data: [0, .06909669359712, .091345627248, .11190132488160001, .11807702411360001, .11200842245056, .11481211172847999, .13491987573424002, .22394570709984002, .5970142255663999, .4254470470288, .3463980968592, .38980818118864, 2.1755815793216, 1.1414724689344, .5075447601104, .29887413693376, .23839058943008, .25070915506272, .22235956865152, .18287222593552002, .15083402726784, .14689995051024002, .14092554780384, .12847291477648, .23504046803024, .38767170194800005, .8039783232464001, 4.462216302048001, 1.71268165252, 1.1422151163104, 1.3517393931024, 1.0709874156112, .9613140328576, .7865065665584, 1.4779738123408, 2.2939517537152, 1.2198100410912, .5182740603584, .433061136968, .30736572337775997, .36074448069536, .27451882080432, .21746982198112, .19505750590752, .18818762681248, .21452932923919998, .15419157514144, .16961753374208002, 0],
            max_volume: 1.14162,
            link: "/trends/story/US_cu_owaCAlEBAABwhM_en"
        }, {
            subtitle: "Death of an icon",
            name: "Cecil the Lion",
            color: "#009688",
            bucket: 32,
            date: "Jul 26 2015",
            peak_index: 30,
            data: [.11080501903072, .097776906848, .10197380324079999, .09742154412112, .09239813383223999, .09094330247288, .09882630480272, .09345761546512, .0890249696312, .09154797544944, .10284204270168, .09459046454944, .10482192075143999, .10188305013736, .09711764292416, .10010971363336, .09770666881392001, .10181350752936, .08944987496608, .09883847475912, .09305913632128, .08488822759431999, .7236986272824001, .28777530930392, .13611713749056, .10826775697784001, .10590122202760001, .1133388039532, .11321049784144001, .155636356704, 22.726072267448, 6.391452473456001, 1.8849836840135998, .9861732926568001, .6921123747288, .495612781564, .9163525142248001, .4148355652416, .3705438782064, .3541213913272, .505192275816, .5456869364544, .34975063841439996, .39821835906, .28715568466664, .22791164148536003, .20770429816576, .20080880086952, .22107490769288002, 0],
            max_volume: 6.53587,
            link: "/trends/story/US_cu_yfLOAlEBAABWcM_en"
        }, {
            subtitle: "The Shanghai stock market falls 30%",
            name: "China crisis",
            color: "#DB4437",
            bucket: 12,
            date: "Jul 12 2015",
            peak_index: 27,
            data: [0, .053659819195359997, .07478658954424, .09591296684424, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .058572537146479996, .08745298275112, .0803568782716, .04866456097944, .07441869579256001, .066022385618, .05748968748208, .11610663915200001, .08554276519432, .0773362976288, .11317331536056, .24016937373296, .5916918534632001, 2.9654398154248, .7994771438752, .34348541623199996, 1.277428512444, .5272357676320001, .4493295491272, .6559710672984, 3.415162413432, 1.1049822468328, .8717942073064, .6136554248775999, .4154801795816, .3596240032448, .28379347587528003, .24747182887447997, .22610176126888, .17916504316592002, .15084783660632, .15881611655056002, .13934329588872, .14196886240712, .16406882178288, 0],
            max_volume: .86889,
            link: "/trends/story/US_cu_N83g21ABAACHlM_en"
        }, {
            subtitle: "A human tragedy",
            name: "Migrant crisis",
            color: "#FF5722",
            bucket: 23,
            date: "Sep 01 2015",
            peak_index: 35,
            data: [.11485488389040001, .14650412473896, .16112433389232, .13954482526656, .13044818056920002, .13711053948432, .14907904595664, .1619912592924, .13788893115623999, .13778746993680002, .14709996456432, .13850279112096, .14353354393968, .11539470458688, .131223830046, .17567011203528002, .40985631747839996, .25039414557096, .23167905561912, .2632252682796, .2668371309948, .24639249940656, .22274811785544, .23594238554639999, .27472172544912, .25211311016904, .18441771446808, .16531597500432, .15742237048031998, .1796568719976, .2549242519092, .29783686334208, .28357039735920003, .4328476648488, .7612764569496, 3.409175321616, 4.043680098168, 3.5448826406831997, 2.3959969035216, 1.5591416316432, 1.1960710803336, 1.0954834459104, 1.2834570039648, 1.2981199130136, 1.1666708312256, 1.3353980969591999, 1.6648571709408, .9301839240768, .902730633504, .7029264622176],
            max_volume: 1.03223,
            link: "/trends/story/US_cu_iQ-fCFEBAABHhM_en"
        }, {
            subtitle: "Elizabeth II reaches a special milestone",
            name: "The longest reigning Queen",
            color: "#9C27B0",
            bucket: 100,
            date: "Sep 06 2015",
            peak_index: 36,
            data: [2.703510438464, 2.4986764845328002, 2.4073175711024, 2.5602562765823995, 2.5800334522336, 2.4333823318288, 2.3681373008831996, 2.2814638474848, 2.3471585314495997, 2.5637779288, 2.5406264662063998, 2.458846295664, 2.5356500542208, 2.3443963771888, 2.4718786760272, 2.3858173553104, 3.7093955782048, 3.8720037128960003, 5.70813725592, 3.1399119186864, 2.759055811424, 3.1326570128304, 3.5097685306639996, 3.5596460084239996, 3.0263008487008, 4.144893973792, 2.5731677418479997, 2.8754970504128, 2.9119416165488, 3.0451824969104, 2.3288852373248, 2.4388121754304, 2.8782289758992, 2.5196968185312, 2.3685340535472, 2.9941978902879995, 10.457417787872, 3.5220262986832, 2.8774127989904, 2.4562315066784, 2.4618276085392, 2.4549959055248, 2.6285959783072, 2.4457270075744, 2.5591831550912, 3.1459198875984002, 2.559073575784, 2.6861137787967997, 2.5356160468496, 2.3145643554528],
            max_volume: 2.76754,
            link: "/trends/story/US_cu_oBs23FABAADGRM_en"
        }, {
            subtitle: "The popular auto brand under fire",
            name: "Volkswagen emissions scandal",
            color: "#3F51B5",
            bucket: 13,
            date: "Sep 20 2015",
            peak_index: 38,
            data: [.15687901121759998, .0618353952048, .051129988398719996, .07309533952224, .056628796331519994, .055496437718399995, .0488101666752, .045569090891519996, .05481306434015999, .052465302308159996, .05173070503104, .05451231796416, .04990915214208, .04754703189599999, .054662109062399995, .04997124171648, .05869870751807999, .04360085138304, .04629088219392, .041775805955519996, .07693790805792, .053151004045439994, .049897898406719994, .04564437450048, .050588256862079996, .04959754009055999, .04090693997375999, .047168673551999996, .050599510597439994, .05437028806272, .053062914461759994, .054766497159359995, .12401267112864, .10408114162656, .06100494714719999, .04568395660416, .05049162996192, .37180750584096, 5.791870723968, 2.899117452672, 2.05662013704, 1.2962983731264, .6839515874015999, .562279305168, .9061468905887999, .6100145460863999, .4491132946272, .4329079157088, .3922470056736, .2987148827376],
            max_volume: 1.49252,
            link: "/trends/story/US_cu_dJrG-FABAADi4M_en"
        }, {
            subtitle: "20 teams slug it out for victory",
            name: "Rugby World Cup",
            color: "#0F9D58",
            bucket: 246,
            date: "Sep 18 2015",
            peak_index: 37,
            data: [.685017118968, .655417201296, .690456507, .737519417232, .732117802728, 1.421644499808, 1.1804198443440002, .99842698644, .9612520235759999, 1.203758073336, 1.127356754472, 1.5781111697519998, 1.399613816016, 1.3056913914719999, .6750623415120001, .620348839032, .6948353305920001, .88241867064, .7271462253119999, .7701354058319999, .956998143192, 1.203848148672, 1.304180450352, 1.640701905648, 1.54620125556, 1.50581263716, 1.1885091906479999, 1.3410328854, 1.41021655476, 1.617924468264, 1.981517920512, 2.104677055728, 2.82083990136, 3.08592289824, 3.3954043188, 4.587304410000001, 5.895314514960001, 28.907964752159998, 39.7473401208, 30.364105199999997, 26.041128316320002, 22.162339065359998, 20.77026833232, 24.635575339440003, 5.13042962952, 1.0642546231199999, .8890726228799999, .644657557128, .579381995088, .602717318424],
            max_volume: 13.6793,
            link: "/trends/story/US_cu_ggT_ElEBAAAslM_en"
        }, {
            subtitle: "Life on the Red Planet?",
            name: "Water on Mars",
            color: "#F4B400",
            bucket: 10,
            date: "Sep 27 2015",
            peak_index: 39,
            data: [0, .05981480315616, .061591419847680004, .05783955138, .05995756016304, .05184069527856, .05887941944352, .08794635349584, .08608936422671999, .0991223517744, .08861229771024, .07280454260256, .07463665464527999, .060676320642719994, .065274014808, .21250394699472, .0885763214136, .07291515057839999, .06545159993184, .06785435727552, .06851264695872, .05830992232224, .04671522118704, .05117015834544, .043949256337920004, .0548332342512, .04473346305936, .15340713886512, .07058893854672, .06324058859472, .04540361726592, .05924875057392, .06177704222928, .060111416240160004, .06422840584608, .05391009778848, .05085593983968, .05775573426336, .08388677287391999, 8.263755338208, 1.131186620736, .5057884581024, .31769863837008, .24228007336272003, .20935372467936, .16996542075696, .15815371366224001, .11084947629936, .11730454246032, 0],
            max_volume: 2.15918,
            link: "/trends/story/US_cu_smvIDlEBAAAr5M_en"
        }, {
            subtitle: "The epic saga continues with Episode VII: The Force Awakens in December",
            name: "Star Wars",
            color: "#DB4437",
            bucket: 155,
            date: "Oct 18 2015",
            peak_index: 42,
            data: [3.153382572424, 2.388438578184, 2.12830606308, 2.0363750721439997, 1.925903890216, 2.092718122376, 2.02470011104, 2.210614199672, 1.9134589650879998, 2.043138544672, 2.324796133328, 1.944983395216, 1.966671280544, 2.0009499432160003, 2.145821896648, 11.15874601672, 5.68623519592, 3.1346286909759997, 4.05594661224, 2.429867391352, 2.138149391704, 2.1040776356640003, 1.9766842047679998, 1.992361622032, 2.125324572432, 2.094814323992, 1.957991377736, 2.709808672536, 2.984655301896, 2.228157168536, 2.070402733328, 2.150475599912, 3.59990404384, 3.6745600269599996, 3.8092867716000005, 5.24827151848, 4.883132191680001, 3.84340940632, 3.7140758017600004, 3.63490857568, 3.87827826168, 4.29599222448, 25.7822623032, 7.98425557592, 8.02641704208, 8.553011380080001, 7.72318010928, 10.04545266008, 11.90818897312, 15.7187985904],
            max_volume: 7.6011,
            link: "/trends/story/US_cu_mahWFlEBAACePM_en"
        }, {
            subtitle: "Terror in the heart of Europe",
            name: "Paris under attack",
            color: "#4285F4",
            bucket: 897,
            date: "Nov 08 2015",
            peak_index: 45,
            data: [.04684608, 62.56548, 40.59792, 9.9864, 1.485036, .8767107, .6298704, .6552027, .7423704000000001, .5158250999999999, .4447962, .4364289, .3930741, .3652587, .3503493, .3509559, .34877430000000004, .3071646, .30344760000000004, .249372, .2899737, .2192598, .18459720000000002, .1834308, .238221, .48332159999999996, .2763, .1524024, .1494549, .1462428, .12381750000000001, .1174581, .1286361, .1740978, .283644, .1536606, .29288430000000004, .5895549, .22527450000000002, .2183418, .24130260000000003, .1844316, .1869372, .2006505, .4359888, 90, 66.33261, 10.34667, 1.310526, .9755370000000001],
            max_volume: 100,
            link: "/trends/story/US_cu_j1EhJ1EBAAD_9M_en"
        }],
        max_volume: 100
    }
};
k("$jscomp.scope.BubbleService", Id, void 0);
Id.prototype.getBubbleData = function() {
    return this.json_
}
;
var Jd = function(a, b) {
    this.http_ = a;
    this.lodash_ = b
};
k("$jscomp.scope.DriveService", Jd, void 0);
Jd.$inject = ["$http", "lodash"];
Jd.prototype.getSpreadsheet = function(a, b) {
    b = this.lodash_.template("<%= basePath %>sheets/<%= fileID %>/")({
        basePath: "/api/v1/drive/",
        fileID: b
    });
    return this.http_.get(b, {
        params: {
            access_token: a
        }
    })
}
;
Jd.prototype.updateSpreadsheet = function(a, b, c, d) {
    b = this.lodash_.template("<%= basePath %>sheets/<%= fileID %>/")({
        basePath: "/api/v1/drive/",
        fileID: b
    });
    return this.http_.put(b, {
        access_token: a,
        keys: d,
        rows: c
    })
}
;
var Nd = function(a, b, c, d) {
    c = d.bind(this.onResize_, this, c);
    var f = d.throttle(c, 50, {
        trailing: !0
    });
    this.window_ = a;
    this.document_ = b;
    this.lodash_ = d;
    this.mobileWidth = 640;
    this.tabletWidth = 960;
    this.testStoryID = "US_lnk_e95d0c16_e75c_41e8_8b40_a48ad76863bc";
    this.responsiveMode = "desktop";
    this.isDesktopMode = !0;
    this.isMobileMode = !1;
    this.isIOS = this.testUserAgent_(Kd);
    this.isAndroid = this.testUserAgent_(Ld);
    this.isWindowsPhone = this.testUserAgent_(Md);
    this.viewportMinimalDimensionSize_ = this.getViewportMinimalDimensionSize_();
    this.isGvizLoading = !1;
    this.windowInnerWidth = 0;
    angular.element(a).bind("resize", f);
    c()
};
k("$jscomp.scope.GlobalsService", Nd, void 0);
Nd.$inject = ["$window", "$document", "$rootScope", "lodash"];
var Kd = /\/iPad|iPhone|iPod\//
  , Ld = /\/android\/i/
  , Md = /\/windows phone\/i/;
e = Nd.prototype;
e.getResponsiveMode = function() {
    return this.window_.innerWidth > this.mobileWidth ? "desktop" : "mobile"
}
;
e.isTabletMode_ = function() {
    return this.window_.innerWidth > this.mobileWidth && this.window_.innerWidth <= this.tabletWidth
}
;
e.getViewportMinimalDimensionSize_ = function() {
    return Math.min(this.window_.innerWidth, this.window_.innerHeight)
}
;
e.testUserAgent_ = function(a) {
    return a.test((navigator.userAgent || navigator.vendor || window.opera).toLowerCase())
}
;
e.applyGViz = function(a) {
    google.visualization ? a(google.visualization) : (this.isGvizLoading || (this.isGvizLoading = !0,
    google.charts.load("44", {
        packages: ["corechart"]
    })),
    google.charts.setOnLoadCallback(function() {
        a(google.visualization)
    }))
}
;
e.isTouchDevice = function() {
    return !!("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch)
}
;
e.isSmallTouchDevice_ = function() {
    return this.isIOS || this.isAndroid || this.isWindowsPhone ? !0 : this.isTouchDevice() && this.viewportMinimalDimensionSize_ <= this.tabletWidth
}
;
e.getDomainSuffix = function(a) {
    if (a.match(/localhost/))
        return "com";
    a = a.split(".");
    a.splice(0, a.indexOf("google") + 1);
    return a[0].split("/")[0]
}
;
e.onResize_ = function(a) {
    var b = this.getResponsiveMode();
    this.responsiveMode = b;
    this.isDesktopMode = "desktop" == b;
    this.isMobileMode = "mobile" == b;
    this.isTabletMode = this.isTabletMode_();
    this.isSmallTouchDeviceMode = this.isSmallTouchDevice_();
    a.$applyAsync()
}
;
var Od = function(a, b, c) {
    this.http_ = a;
    this.lodash_ = b;
    this.helpers_ = c
};
k("$jscomp.scope.OAuthService", Od, void 0);
Od.$inject = ["$http", "lodash", "helpersFactory"];
var Pd = {
    drive: {
        width: 450,
        height: 600
    }
};
Od.prototype.login = function(a, b) {
    var c = "/oauth/" + a;
    a = Pd[a] || {};
    this.popupWindow_ && this.popupWindow_.close();
    window.oauthLoginBind = b;
    return this.popupWindow_ = this.helpers_.openWindow(c, "oauth", a)
}
;
var Qd = function(a, b, c, d, f) {
    this.window_ = a;
    this.location_ = b;
    this.injector_ = c;
    this.lodash_ = d;
    this.q_ = f
};
k("$jscomp.scope.TrackingService", Qd, void 0);
Qd.$inject = ["$window", "$location", "$injector", "lodash", "$q"];
e = Qd.prototype;
e.changeWindowLocation_ = function(a) {
    this.window_.location = a
}
;
e.eventCallback_ = function(a) {
    a.isNewWindow ? this.window_.open(a.url, "_blank") : this.changeWindowLocation_(a.url)
}
;
e.isInternalURL_ = function(a) {
    var b = this.injector_.get("$route")
      , c = a.match(/trends(\/?.*)$/);
    c && (a = c[1] || "/");
    return this.lodash_.some(b.routes, function(b) {
        return (b = b.regexp) && b.test(a)
    })
}
;
e.parseUrl_ = function(a) {
    return (a = a.match(/^(https?:)\/\/(([^:\/?#]*)(?::([0-9]+))?)([\/]?[^?#]*)(\?[^#]*|)(#.*|)$/)) && {
        protocol: a[1],
        host: a[2],
        hostname: a[3],
        port: a[4],
        pathname: a[5],
        search: a[6],
        hash: a[7]
    }
}
;
e.parseEvent_ = function(a) {
    var b = a.currentTarget || a.target
      , c = b.href || "";
    a = !("_blank" != b.target && !a.ctrlKey && !a.metaKey && 2 !== a.which);
    try {
        var d = this.parseUrl_(c)
          , f = d.pathname.match(/^\/trends/)
          , g = "support.google.com" === d.hostname
          , h = d.pathname.match(/^\/trends\/correlate/);
        !f || h || g || (c = d.pathname + d.search + d.hash)
    } catch (m) {}
    return {
        url: c,
        isNewWindow: a
    }
}
;
e.trackPageview = function(a) {
    this.window_._gaq && this.window_._gaq.push(["_trackPageview", a])
}
;
e.trackEvent = function(a, b, c, d) {
    var f = this.q_.defer();
    this.window_._gaq && (a = ["_trackEvent", a, b, c],
    this.lodash_.isUndefined(d) || a.push(d),
    this.window_._gaq.push(a),
    this.window_._gaq.push(f.resolve));
    return f.promise
}
;
e.trackEventAndRedirect = function(a, b, c, d, f) {
    a = this.trackEvent(a, b, c, d);
    this.window_._gaq && this.window_._gaq._getAsyncTracker && (b = this.parseEvent_(f),
    this.isInternalURL_(b.url) || (b = this.lodash_.bindKey(this, "eventCallback_", b),
    a.then(b),
    f.preventDefault()));
    return a
}
;
var Rd = function(a, b) {
    this.http_ = a;
    this.lodash_ = b
};
k("$jscomp.scope.WidgetService", Rd, void 0);
Rd.$inject = ["$http", "lodash"];
e = Rd.prototype;
e.convertParams_ = function(a, b, c, d, f) {
    f || (f = {});
    return {
        type: a,
        version: b,
        template: c,
        fields: d,
        external_apis: this.lodash_.map(f.apis, function(a) {
            return {
                name: a.name,
                url: a.url,
                params: a.params,
                auto_refresh_timeout: a.autoRefreshTimeout
            }
        }),
        name: f.name,
        is_active: f.isActive,
        is_public: f.isPublic,
        expires_on: f.expiresOn,
        short_url: f.shortUrl
    }
}
;
e.create = function(a, b, c, d, f) {
    a = this.convertParams_(a, b, c, d, f);
    return this.http_.post("/api/v1/widgets/", a)
}
;
e.get = function(a, b) {
    b || (b = {});
    a = this.lodash_.template("<%= baseURL %><%= widgetID %>/")({
        baseURL: b.baseURL || "/api/v1/widgets/",
        widgetID: a
    });
    return this.http_(this.lodash_.extend({
        method: "GET",
        url: a
    }, b))
}
;
e.getWidgetList = function(a) {
    a || (a = {});
    return this.http_.get("/api/v1/widgets/", {
        params: {
            is_active: a.isActive,
            is_public: a.isPublic,
            owner_email: a.ownerEmail,
            type: a.widgetType,
            template: a.template,
            order_by: a.orderBy,
            offset: a.offset,
            batch_size: a.batchSize,
            name: a.searchText,
            short_url: a.shortUrlSearchText
        }
    })
}
;
e.getOwnerList = function(a) {
    a || (a = {});
    return this.http_.get("/api/v1/widgets/owners/", {
        params: {
            is_active: a.isActive,
            is_public: a.isPublic
        }
    })
}
;
e.download = function(a, b, c) {
    a = this.lodash_.template("<%= baseURL %><%= widgetID %>/?mimetype=<%= mimetype %>&scale=<%= scale %>&as_attachment=true")({
        baseURL: "/api/v1/widgets/",
        mimetype: b,
        scale: c,
        widgetID: a
    });
    window.location = a
}
;
e.remove = function(a) {
    a = this.lodash_.template("<%= baseURL %><%= widgetID %>/")({
        baseURL: "/api/v1/widgets/",
        widgetID: a
    });
    return this.http_["delete"](a)
}
;
e.update = function(a, b, c, d, f, g) {
    a = this.lodash_.template("<%= baseURL %><%= widgetID %>/")({
        baseURL: "/api/v1/widgets/",
        widgetID: a
    });
    b = this.convertParams_(b, c, d, f, g);
    return this.http_.put(a, b)
}
;
var Sd = function() {};
k("$jscomp.scope.Yis2016Service", Sd, void 0);
Sd.prototype.redirectToExplorePage = function(a) {
    a = "/trends/explore?date=2016-01-01%202016-12-31&q=" + this.encode_(a);
    var b = this.getSafeGeo_();
    "GLOBAL" !== b && (a += "&geo=" + b);
    window.open(a, "_self")
}
;
Sd.prototype.getSafeGeo_ = function() {
    var a = window.location.pathname.match(/\/trends(\/beta\/\w+)?\/yis\/2016\/(GLOBAL|[A-Za-z]{2})/i)
      , b = window.defaultGeo || "GLOBAL";
    return a ? a[2] : b
}
;
Sd.prototype.encode_ = function(a) {
    a = a.replace(/\?/g, "");
    return encodeURIComponent(String(a))
}
;
var G = angular.module("publishAppFramework", ["ngSanitize", "publishAppFrameworkViews"])
  , Td = function(a) {
    var b = function(a) {
        var b = (a = a[0].getElementById("tpt-csrf-token")) && a.getAttribute("data-token");
        return {
            request: function(a) {
                b && /^(?!http)/.test(a.url) && (a.headers["X-CSRF-Token"] = b);
                return a
            }
        }
    };
    b.$inject = ["$document"];
    a.interceptors.push(b)
};
k("$jscomp.scope.csrfMiddleware", Td, void 0);
Td.$inject = ["$httpProvider"];
var Ud = function(a, b) {
    a.globals = b
};
k("$jscomp.scope.rootScopeConfig", Ud, void 0);
Ud.$inject = ["$rootScope", "globalsService"];
G.config(Td);
G.run(Ud);
G.directive("barChart", tb);
G.directive("bidi", xb);
G.directive("carousel", Eb);
G.directive("donutChartDirective", Ib);
G.directive("geoChart", Nb);
G.directive("helpDialog", Rb);
G.directive("lineChartDirective", Xb);
G.directive("listItemActions", ec);
G.directive("scrollTo", jc);
G.directive("sparkline", mc);
G.directive("track", qc);
G.directive("tvBroadcast", tc);
G.directive("widget", Ec);
G.directive("widgetActions", Jc);
G.directive("widgetLoader", Mc);
G.directive("widgetTitleEllipsis", xc);
G.factory("colorsFactory", Qc);
G.factory("geometryFactory", Tc);
G.factory("helpersFactory", Yc);
G.factory("lodash", $c);
G.factory("queueFactory", fd);
G.factory("widgetAPIFactory", pd);
G.factory("widgetFactory", ld);
G.factory("widgetFieldFactory", ud);
G.filter("path", wd);
G.filter("range", zd);
G.filter("titleize", Cd);
G.filter("typography", Ed);
G.service("bubbleService", Id);
G.service("bidiService", Fd);
G.service("yis2016Service", Sd);
G.service("globalsService", Nd);
G.service("driveService", Jd);
G.service("oauthService", Od);
G.service("trackingService", Qd);
G.service("widgetService", Rd);
angular.module("publishAppWidgetsFeBubbleChartV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_bubble_chart_v1/views/bubble-chart-directive.html", '<div class="bubble-container {{mediaQueryClass}}" ng-class="{\'is-embed\': isEmbed}">\n  <div class="type" ng-if="stories">\n    <div class="titles brand" ng-show="isIdle">\n      <div class="title-date" ng-if="mediaQueryClass == \'viz-size-small\'">&nbsp;</div>\n      <h2>{{data.topic.value | typography}}</h2>\n      <h5>{{data.subtitle.value}}</h5>\n    </div>\n    <div class="titles" ng-show="currentStory">\n      <div class="title-date" ng-if="currentStory && mediaQueryClass == \'viz-size-small\'">{{currentStory.date | date:"MMMM d"}}</div>\n      <h2 ng-attr-style="color:{{currentStory.color}}">{{currentStory.name | typography}}</h2>\n      <h5>{{currentStory.subtitle | typography}}</h5>\n      <div class="title-tooltip" ng-style="{\'color\': currentStory.color}" ng-if="currentStory && mediaQueryClass == \'viz-size-small\'">{{currentStory.bucket}}M+ SEARCHES</div>\n    </div>\n  </div>\n\n  <svg ng-if="stories"\n       ng-mouseleave="onMouseLeave()"\n       ng-mousemove="onMouseMove()">\n\n    <defs>\n      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="shadow">\n        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>\n        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>\n        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.35 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix>\n        <feMerge>\n          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>\n          <feMergeNode in="SourceGraphic"></feMergeNode>\n        </feMerge>\n      </filter>\n    </defs>\n\n    <g class="timeline-not-idle" id="timeline_back" ng-if="!isIdle">\n      <path class="timeline-path"\n            ng-attr-d="{{points | path:pointWidth}}"\n            stroke-width="1"\n            ng-attr-transform="translate({{padding}}, 0)"\n            fill-opacity="1" fill="none" stroke="{{currentStory ? currentStory.color : \'#000\'}}" ng-style="{\'opacity\': currentStory ? \'1\' : \'0.2\'}"></path>\n      <text class="month-label"\n            ng-repeat="tick in monthTicks track by $index"\n            ng-hide="mediaQueryClass == \'viz-size-small\' && !($first || $last)"\n            text-anchor="middle"\n            ng-attr-x="{{$index * pointWidth * 4 + pointWidth * 2 + padding}}"\n            ng-attr-y="{{points[$index*4+2] + 30}}">{{tick.name}}</text>\n    </g>\n\n    <g class="story"\n       ng-attr-transform="translate({{pointWidth * story.peak_index + padding - story.radius}}, 0)"\n       ng-repeat="story in stories | orderBy: \'-radius\'"\n       ng-mouseenter="onStoryHover(story)"\n       ng-mouseleave="onStoryOut()"\n       ng-click="onStoryClick($event)">\n      <circle class="bubble"\n              ng-class="{idle: isIdle}"\n              ng-attr-r="{{(story == currentStory) && (story.radius + 3) || story.radius}}"\n              ng-attr-cx="{{story.radius}}"\n              ng-attr-cy="{{getYAxisCoordinations(0)}}"\n              ng-attr-filter="{{(story == currentStory) && \'url(#shadow)\' || \'none\'}}"\n              ng-attr-fill-opacity="{{(isIdle || story == currentStory) && 1 || 0.06}}"\n              ng-attr-fill="{{(isIdle || story == currentStory) && story.color || \'rgba(0,0,0,1)\'}}">\n      </circle>\n      <circle r="3"\n              ng-attr-cx="{{story.radius}}"\n              ng-attr-cy="{{getYAxisCoordinations(0)}}"\n              ng-if="story == currentStory"\n              fill-opacity="0.3"\n              fill="black">\n      </circle>\n    </g>\n\n    <g class="timeline" id="timeline_front" ng-if="isIdle">\n      <path class="timeline-path"\n            ng-attr-d="{{points | path:pointWidth}}"\n            stroke-width="1"\n            ng-attr-transform="translate({{padding}}, 0)"\n            fill-opacity="1" fill="none" stroke="#000"></path>\n      <text class="month-label"\n            ng-repeat="tick in monthTicks track by $index"\n            ng-hide="mediaQueryClass == \'viz-size-small\' && !($first || $last)"\n            text-anchor="middle"\n            ng-attr-x="{{$index * pointWidth * 4 + pointWidth * 2 + padding}}"\n            ng-attr-y="{{points[$index*4+2] + 30}}">{{tick.name}}</text>\n    </g>\n  </svg>\n\n  <div class="tooltip"\n       ng-if="currentStory"\n       ng-style="{\'top\': getYAxisCoordinations(0) + currentStory.radius + 24 + \'px\',\n                  \'left\': padding + pointWidth * currentStory.peak_index - 150 / 2 + \'px\'}">\n    <div class="value" ng-style="{\'color\': currentStory.color}">{{currentStory.bucket}}M+</div>\n    <div class="desc" ng-style="{\'color\': currentStory.color}">Searches in {{currentStory.date.getFullYear()}}</div>\n    <div class="link">click to explore story<span class="link-out"></span></div>\n  </div>\n\n  <div class="legend">\n    <div><span class="legend-line"></span>Story life cycle</div>\n    <div><span class="legend-circle"></span>Story search volume</div>\n  </div>\n  <div class="explore">\n    <a href="https://www.google.com/trends/2015" class="link-out-dark" target="_blank">EXPLORE ALL STORIES</a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_bubble_chart_v1/views/fe_embed.html", '<bubble-chart data="ctrl.widget.fields" is-editor="isEditor"></bubble-chart>\n'))
}
]);
var Vd = function() {
    this.restrict = "E";
    this.templateUrl = "/widgets_library/fe_bubble_chart_v1/views/bubble-chart-directive.html";
    this.scope = {
        data: "=",
        isEditor: "="
    };
    this.link = H.bind(this.link, this)
}, H, Wd, Xd, I;
e = Vd.prototype;
e.MIN_BUBBLE_RADIUS = 5;
e.MAX_WIDTH = 1300;
e.PADDING = 64;
e.BUBBLE_RADIUS_MULTIPLIER = 120;
e.IDLE_TIMEOUT = 1500;
e.NORMALIZE_VALUE = 800;
e.link = function(a, b) {
    a.isTouchDevice_ = Wd.isTouchDevice();
    Xd.animationFrame_ = this.getAnimationFrame_();
    a.bubbleContainer = b.children()[0];
    a.bubbleRadiusMultiplier_ = Vd.prototype.BUBBLE_RADIUS_MULTIPLIER;
    a.padding = Vd.prototype.PADDING;
    a.isEmbed = a.isEditor ? /embed\=true/.test(window.location.href) : /embed\=true/.test(window.location.search);
    a.onResize = H.bindKey(this, "onResize_", a);
    a.getYAxisCoordinations = H.bindKey(this, "getYAxisCoordinations_", a);
    a.morph = H.bindKey(this, "morph_", a);
    a.onMouseLeave = H.bindKey(this, "onMouseLeave_", a);
    a.onStoryHover = H.bindKey(this, "onStoryHover_", a);
    a.onStoryOut = H.bindKey(this, "onStoryOut_", a);
    a.onDateMouseEnter = H.bindKey(this, "onDateMouseEnter_", a);
    a.onDateMouseLeave = H.bindKey(this, "onDateMouseLeave_", a);
    a.onStoryClick = H.bindKey(this, "onStoryClick_", a);
    this.init_(a);
    a.$watch("bubbleContainer.clientWidth", function() {
        a.onResize()
    });
    a.$watch("bubbleContainer.clientHeight", function() {
        a.onResize()
    });
    var c = this;
    a.isEditor && a.$watch("data", function(b) {
        a.startDate_ = a.data.start_date.value;
        a.points = [];
        a.maxVolume_ = a.data.max_volume.value;
        a.pointsTotal = a.data.stories.items[0].value.data.length;
        c.initDates_(a);
        c.initLinePoints_(a);
        H.forEach(b.stories.items, function(b) {
            b = b.value;
            b.radius = c.calculateRadius_(a, b);
            b.date = a.dates[b.peak_index]
        })
    }, !0)
}
;
e.init_ = function(a) {
    var b = this;
    a.startDate_ = a.data.start_date.value;
    a.points = [];
    a.monthTicks = [];
    a.isIdle = !0;
    a.maxVolume_ = a.data.max_volume.value;
    a.pointsTotal = a.data.stories.items[0].value.data.length;
    a.stories = [];
    this.initDates_(a);
    this.initLinePoints_(a);
    this.initMonthTicks_(a);
    a.data.stories.items.forEach(function(c) {
        c = c.value;
        a.stories.push(c);
        c.radius = b.calculateRadius_(a, c);
        c.date = a.dates[c.peak_index]
    });
    I(a.morph, 50)
}
;
e.setMediaQueryClass_ = function(a) {
    var b = Vd.prototype.MAX_WIDTH
      , c = Vd.prototype.PADDING;
    a.bubbleContainer.clientWidth > b + 2 * c ? (a.mediaQueryClass = "viz-size-large",
    a.padding = (a.bubbleContainer.clientWidth - b) / 2) : 640 < a.bubbleContainer.clientWidth ? (a.mediaQueryClass = "viz-size-large",
    a.padding = c) : 480 < a.bubbleContainer.clientWidth ? (a.mediaQueryClass = "viz-size-medium",
    a.padding = 48) : (a.mediaQueryClass = "viz-size-small",
    a.padding = 16)
}
;
e.onStoryClick_ = function(a) {
    a.isTouchDevice_ ? a.currentStoryTouched == a.currentStory ? Xd.open(a.currentStory.link, "_blank") : a.currentStoryTouched = a.currentStory : Xd.open(a.currentStory.link, "_blank")
}
;
e.onMouseLeave_ = function(a) {
    I.cancel(a.idleTimeout_);
    a.idleTimeout_ = I(function() {
        a.isIdle = !0
    }, Vd.prototype.IDLE_TIMEOUT);
    a.currentStory = null;
    a.currentStoryTouched = null
}
;
e.onStoryHover_ = function(a, b) {
    I.cancel(a.leaveTimeout_);
    I.cancel(a.idleTimeout_);
    a.isIdle = !1;
    a.currentStory = b;
    a.activeDate = a.dates[b.peak_index];
    I(a.morph, 50)
}
;
e.onStoryOut_ = function(a) {
    I.cancel(a.leaveTimeout_);
    I.cancel(a.idleTimeout_);
    a.currentStory = null;
    a.currentStoryTouched = null;
    a.idleTimeout_ = I(function() {
        a.isIdle = !0
    }, Vd.prototype.IDLE_TIMEOUT);
    I(a.morph, 50)
}
;
e.onDateMouseEnter_ = function(a, b) {
    a.activeDate = b
}
;
e.onDateMouseLeave_ = function(a) {
    a.activeDate = null
}
;
e.initLinePoints_ = function(a) {
    for (var b = 0; b <= a.pointsTotal; b++)
        a.points.push(a.getYAxisCoordinations(0))
}
;
e.initMonthTicks_ = function(a) {
    H.forEach("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), function(b) {
        var c = {};
        c.name = b;
        a.monthTicks.push(c)
    })
}
;
e.initDates_ = function(a) {
    a.dates = [];
    for (var b = 0; b < a.pointsTotal; b++)
        a.dates.push(this.indexToDate_(a, b))
}
;
e.morph_ = function(a) {
    for (var b = 0, c = 0; c < a.pointsTotal; c++) {
        var d = a.currentStory ? a.getYAxisCoordinations(a.currentStory.data[c]) : a.getYAxisCoordinations(0);
        .5 < Math.abs(d - a.points[c]) ? a.points[c] += .4 * (d - a.points[c]) : (a.points[c] = d,
        b++)
    }
    a.$$phase || a.$apply();
    c != b && Xd.animationFrame_(a.morph)
}
;
e.getAnimationFrame_ = function() {
    return Xd.requestAnimationFrame || Xd.webkitRequestAnimationFrame || Xd.mozRequestAnimationFrame || Xd.oRequestAnimationFrame || Xd.msRequestAnimationFrame || function(a) {
        I(a, 1E3 / 60)
    }
}
;
e.getYAxisCoordinations_ = function(a, b) {
    return (a.maxVolume_ - b) / a.maxVolume_ * (a.bubbleContainer.clientHeight / 2)
}
;
e.calculateRadius_ = function(a, b) {
    return b.bucket / Vd.prototype.NORMALIZE_VALUE * a.bubbleRadiusMultiplier_ + Vd.prototype.MIN_BUBBLE_RADIUS
}
;
e.indexToDate_ = function(a, b) {
    a = new Date(a.startDate_);
    a.setDate(a.getDate() + 7 * b);
    return a
}
;
e.onResize_ = function(a) {
    var b = this;
    this.setMediaQueryClass_(a);
    a.pointWidth = Math.min(a.bubbleContainer.clientWidth - 2 * a.padding, Vd.prototype.MAX_WIDTH) / a.pointsTotal;
    a.bubbleRadiusMultiplier_ = 5 * a.pointWidth;
    a.stories && a.stories.forEach(function(c) {
        c.radius = b.calculateRadius_(a, c)
    });
    a.points = [];
    this.initLinePoints_(a)
}
;
var Yd = function(a, b, c, d, f, g) {
    H = a;
    Xd = c;
    I = d;
    Wd = g;
    return new Vd
};
k("$jscomp.scope.directiveInjector$jscomp$16", Yd, void 0);
Yd.$inject = "lodash $http $window $timeout bubbleService globalsService".split(" ");
var J = {}
  , Zd = function(a, b, c, d, f, g) {
    this.availableColors_ = [];
    b.forEach(d.Colors.SOCIAL_PALETTE, function(a) {
        this.availableColors_.push({
            name: a.name,
            value: a.hexvalue
        })
    }, this);
    this.lodash_ = b;
    b = [{
        name: "topic",
        type: "string",
        placeholder: "YIS Title",
        value: "A Year in Search 2015 Timeline",
        translation: {
            translate: !0,
            description: "Year in search title."
        }
    }, {
        name: "subtitle",
        type: "string",
        placeholder: "YIS Subtitle",
        value: "See the biggest news this year in search. Click to explore the stories in more detail",
        translation: {
            translate: !0,
            description: "Year in search subtitle."
        }
    }, {
        name: "start_date",
        type: "string",
        placeholder: "Start date",
        value: "Dec 28 2014"
    }, {
        name: "max_volume",
        type: "number",
        placeholder: "Max volume",
        value: g.getBubbleData().max_volume
    }, {
        name: "stories",
        type: "list",
        subtype: "map",
        maxLimit: 50,
        keys: "name subtitle color bucket peak_index date link data".split(" "),
        translation: {
            translate: !0,
            keys: [{
                name: "name",
                description: "Story title."
            }, {
                name: "subtitle",
                description: "Story subtitle."
            }]
        },
        keysConfig: {
            name: {
                gridSpan: 12
            },
            subtitle: {
                gridSpan: 12
            },
            color: {
                gridSpan: 6,
                options: b.values(this.availableColors_)
            },
            bucket: {
                gridSpan: 3
            },
            date: {
                gridSpan: 12
            },
            peak_index: {
                gridSpan: 3
            },
            link: {
                gridSpan: 12
            },
            data: {
                gridSpan: 12
            }
        },
        values: g.getBubbleData().stories
    }];
    this.widget = new c(b,a.isEditor)
};
k("$jscomp.scope.FeBubbleChartV1Ctrl", Zd, void 0);
Zd.$inject = "$scope lodash widgetFactory colorsFactory globalsService bubbleService".split(" ");
Zd.DISPLAY_TYPE = "Bubble Chart";
Zd.SUBTITLE = "See the biggest news this year in search. Click to explore the stories in more detail";
Zd.START_DATE = "Dec 28 2014";
Zd.GROUP_TYPE = "YIS";
Zd.FULL_WIDTH = !0;
Zd.TYPE = "fe_bubble_chart";
Zd.VERSION = 1;
Zd.TEMPLATES = ["fe_embed"];
J.FeBubbleChartV1 = Zd;
var $d = angular.module("publishAppFeBubbleChartV1", ["publishAppFramework", "publishAppWidgetsFeBubbleChartV1Views"]);
$d.controller("FeBubbleChartV1Ctrl", J.FeBubbleChartV1);
$d.directive("bubbleChart", Yd);
angular.module("publishAppWidgetsFeCircularProgressV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_circular_progress_v1/views/circular-progress-atom.html", '<div class="fe-circular-progress-atom">\n  <svg viewBox="3 3 38 38">\n    <g fill="transparent" transform="rotate(270, 22, 22)">\n      <circle class="circular-progress-background" r="15.915507752" cx="22" cy="22">\n      </circle>\n      \x3c!-- In order to calculate real percentage values (0-100), we are using Circumference\n        of a Circle formula (C=2\u03c0r) in our case (100=2\u03c0r) meaning that r value is r=15.915507752 --\x3e\n      <circle class="circular-progress-stroke" stroke={{colors.getHexValue(atomData.color)}}\n              r="15.915507752" cx="22" cy="22" stroke-dasharray="100"\n              ng-style="{\'stroke-dashoffset\': atomData.percentage ? (afterWidgetLoadDelay ? 100 - atomData.percentage : 100) : 0}">\n      </circle>\n      <circle class="circular-progress-image-mask" r="28" cx="22" cy="22" stroke="white">\n      </circle>\n    </g>\n  </svg>\n  <img class="circular-image" src="{{atomData.imageUrl}}" ng-if="atomData.imageUrl"></img>\n  <div class="title-wrapper">\n    <div class="circular-progress-title"\n         ng-if="!isSmallTabletBreakpoint"\n         ng-class="{\'circular-progress-large-title\': isLargeTitle}">{{atomData.title}}</div>\n    <div class="circular-progress-title"\n         ng-if="isSmallTabletBreakpoint"\n         ng-class="{\'circular-progress-large-title\': isLargeTitle}">\n      {{getSeparatedTitleBind(atomData.title).firstName}}\n      </br>\n      {{getSeparatedTitleBind(atomData.title).lastName}}\n    </div>\n    <div class="circular-progress-subtitle">{{atomData.subtitle}}</div>\n    <div class="circular-progress-percentage-text" ng-if="isMobileMode && atomData.percentage">\n      {{atomData.percentage}}% {{atomData.description}}\n    </div>\n  </div>\n  <div ng-if="!isMobileMode && atomData.percentage">\n    <div ng-style="{color: colors.getHexValue(atomData.color)}"\n         class="circular-progress-percentage">\n      {{atomData.percentage}}%\n    </div>\n    <div class="circular-progress-percentage-caption">\n      {{atomData.description}}\n    </div>\n  </div>\n  <div class="circular-progress-link" href="{{atomData.link}}" ng-if="!isEmbedTemplate">\n    <span ng-if="!isMobileMode && !isSmallTabletBreakpoint">\n      EXPLORE\n    </span>\n    <div class="arrow-forward"></div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_circular_progress_v1/views/circular-progress-directive.html", '<carousel ng-if="!isMobileMode" hide-buttons="true">\n  <a class="fe-circular-progress-atom-wrapper"\n     ng-repeat="atomData in data"\n     ng-include="\'/widgets_library/fe_circular_progress_v1/views/circular-progress-atom.html\'"\n     ng-style="{\'width\': atomWidthArray[$index]}"\n     href="{{atomData.link}}">\n  </a>\n</carousel>\n\n<a class="fe-circular-progress-atom-wrapper fe-circular-progress-mobile"\n   ng-repeat="atomData in data"\n   ng-include="\'/widgets_library/fe_circular_progress_v1/views/circular-progress-atom.html\'"\n   ng-if="isMobileMode"\n   href="{{atomData.link}}">\n</a>\n'),
    a.put("/widgets_library/fe_circular_progress_v1/views/content.html", '<div class="small-atom">\n  <circular-progress-directive\n    colors="ctrl.colors"\n    class="block-container"\n    data="ctrl.circularProgressData">\n  </circular-progress-directive>\n</div>\n'),
    a.put("/widgets_library/fe_circular_progress_v1/views/fe.html", '<div class="fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields"\n     ng-class="{\'circular-progress-with-data\': fields.topics.items[0].value.percentage}">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       ng-if="fields.topics.items[0].value.percentage">\n    <div class="fe-atoms-generic-title">\n      {{fields.topic.value}}\n    </div>\n  </div>\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       ng-if="ctrl.globals.isMobileMode && !fields.topics.items[0].value.percentage">\n    <div class="fe-atoms-generic-title">\n      Tap on presidential candidate to explore more.\n    </div>\n  </div>\n  <ng-include src="\'/widgets_library/fe_circular_progress_v1/views/content.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_circular_progress_v1/views/fe_embed.html", '<div class="embed-container fe-circular-embed-container" ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include src="\'/widgets_library/fe_circular_progress_v1/views/fe_embed_content.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_circular_progress_v1/views/fe_embed_content.html", '<div class=\'embed-atom\'>\n  <circular-progress-directive\n    colors="ctrl.colors"\n    class="block-container embed"\n    data="ctrl.circularProgressData"\n    is-embed-template="true">\n  </circular-progress-directive>\n</div>\n'),
    a.put("/widgets_library/fe_circular_progress_v1/views/now_card.html", '<div class="now-card-circular-progress small-atom"\n     ng-init="fields = ctrl.widget.fields">\n  <circular-progress-directive colors="ctrl.colors"\n                               class="block-container"\n                               data="ctrl.circularProgressData"\n                               disable-carousel="true">\n  </circular-progress-directive>\n</div>\n'))
}
]);
var ae = function() {
    this.restrict = "E";
    this.templateUrl = "/widgets_library/fe_circular_progress_v1/views/circular-progress-directive.html";
    this.scope = {
        colors: "=",
        data: "=",
        disableCarousel: "=?",
        isEmbedTemplate: "=?"
    };
    this.link = L.lodash.bind(this.link, this)
}
  , L = {};
e = ae.prototype;
e.link = function(a, b) {
    a.isSmallTabletBreakpoint = !1;
    var c = L.lodash.bindKey(this, "isSmallTabletBreakpoint_", a);
    a.deps = L;
    a.$watch("deps.window.innerWidth", c);
    a.getSeparatedTitleBind = L.lodash.bindKey(this, "getSeparatedTitle_");
    var d = angular.element(L.window)
      , f = L.lodash.bindKey(this, "onResize_", a, b);
    d.bind("resize", f);
    this.onResize_(a, b);
    L.timeout(function() {
        a.afterWidgetLoadDelay = !0
    }, 500);
    a.getColorValue = L.lodash.bindKey(this, "getColorValue_", a);
    a.$on("$destroy", function() {
        d.unbind("resize", f)
    })
}
;
e.isSmallTabletBreakpoint_ = function(a) {
    var b = L.window.innerWidth;
    a.isSmallTabletBreakpoint = 640 <= b && 859 >= b
}
;
e.getSeparatedTitle_ = function(a) {
    var b = a.split(" ");
    2 < b.length && L.lodash.forEach(b, function(a, d) {
        1 < d && (b[1] += " " + a)
    });
    return {
        firstName: b[0],
        lastName: b[1]
    }
}
;
e.onResize_ = function(a, b) {
    a.isMobileMode = !0 === a.disableCarousel || "mobile" == L.globals.getResponsiveMode();
    a.atomWidthArray = this.getCardWidthArray_(a, b);
    a.isLargeTitle = 1200 < L.window.innerWidth
}
;
e.getCardWidthArray_ = function(a, b) {
    a = a.data.length;
    var c = Math.floor(b[0].clientWidth / a)
      , d = L.lodash.times(a, L.lodash.constant(c));
    b = Math.floor(b[0].clientWidth - c * a);
    1 <= b && L.lodash.times(b, function(a) {
        d[a]++
    });
    L.lodash.forEach(d, function(a, b) {
        d[b] += "px"
    });
    return d
}
;
e.isTabletMode_ = function() {
    return 1024 > L.window.innerWidth && 639 < L.window.innerWidth
}
;
var be = function(a, b, c, d) {
    L.window = c;
    L.lodash = a;
    L.globals = b;
    L.timeout = d;
    return new ae
};
k("$jscomp.scope.directiveInjector$jscomp$17", be, void 0);
be.$inject = ["lodash", "globalsService", "$window", "$timeout"];
var M = function(a, b, c, d, f) {
    this.lodash_ = b;
    this.globals = f;
    this.colors = new d.Colors(a.palette || d.Colors.DEFAULT_PALETTE);
    this.isSmallMode = !1;
    this.atomHeight = "";
    d = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Circular Progress",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/9aeIiB"
        }
    }, {
        name: "topics",
        type: "list",
        subtype: "map",
        maxLimit: 5,
        colorPalette: this.colors,
        keys: "title subtitle percentage description color link imageUrl".split(" "),
        keysConfig: {
            title: {
                gridSpan: 12
            },
            subtitle: {
                gridSpan: 8
            },
            percentage: {
                gridSpan: 4
            },
            description: {
                gridSpan: 12
            },
            color: {
                gridSpan: 12,
                options: b.map(this.colors.palette_, function(a) {
                    return {
                        name: a.caption,
                        value: a.name
                    }
                })
            },
            link: {
                gridSpan: 12
            },
            imageUrl: {
                gridSpan: 12
            }
        },
        values: ce,
        translation: {
            translate: !0,
            keys: [{
                name: "title",
                description: "The title of the atom. http://goo.gl/51y9TW"
            }, {
                name: "subtitle",
                description: "The subtitle of the atom. http://goo.gl/51y9TW"
            }, {
                name: "description",
                description: "The percentages description. http://goo.gl/51y9TW"
            }]
        }
    }];
    this.widget = new c(d,a.isEditor);
    this.widget.registerAPI("fe_circular_progress", "/trends/api/widgetdata/totals/" + this.globals.testStoryID, {
        req: {
            requestOptions: {
                backend: "IZG"
            },
            comparisonItem: [{
                geo: {
                    country: "US"
                },
                time: "2011-08-28 2016-08-28",
                phrase: "clinton"
            }, {
                geo: {
                    country: "US"
                },
                time: "2011-08-28 2016-08-28",
                phrase: "trump"
            }, {
                geo: {
                    country: "US"
                },
                time: "2011-08-28 2016-08-28",
                phrase: "stein"
            }],
            locale: "en-US"
        }
    }, [{
        path: "req.comparisonItem.0.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercaseenglish letters or set empty for worldwide."
    }, {
        path: "req.comparisonItem.0.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "list",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b.push(a[c].phrase);
            return b
        },
        setValue: function(a, b) {
            for (var c = [], d = 0; d < a.length; d++)
                c.push({
                    phrase: a[d],
                    time: b.req.comparisonItem[0].time,
                    geo: b.req.comparisonItem[0].geo
                });
            return c
        }
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).middleware(b.bindKey(this, "middleware_"));
    b = b.bind(this.onTopicsChange_, this);
    a.$watch("ctrl.widget.fields.topics.items", b, !0);
    this.circularProgressData = null
};
k("$jscomp.scope.FeCircularProgressV1Ctrl", M, void 0);
M.$inject = ["$scope", "lodash", "widgetFactory", "colorsFactory", "globalsService"];
M.TYPE = "fe_circular_progress";
M.DISPLAY_TYPE = "Circular Progress";
M.GROUP_TYPE = {
    ELE: ["fe", "fe_embed"],
    NOW_CARD: ["now_card"]
};
M.TEMPLATES = ["fe", "now_card", "fe_embed"];
M.VERSION = 1;
M.HIDE_IN_EDITOR = !1;
M.FULL_WIDTH_BY_TEMPLATE = {
    "*": !0,
    now_card: !1
};
var ce = [{
    title: "Yosemite Sam",
    subtitle: "Buckaroo",
    color: "PALETTE_COLOR_1",
    percentage: null,
    description: "of searches"
}, {
    title: "Yosemite Sam",
    subtitle: "Buckaroo",
    color: "PALETTE_COLOR_2",
    percentage: null,
    description: "of searches"
}, {
    title: "Yosemite Sam",
    subtitle: "Buckaroo",
    color: "PALETTE_COLOR_3",
    percentage: null,
    description: "of searches"
}, {
    title: "Yosemite Sam",
    subtitle: "Buckaroo",
    color: "PALETTE_COLOR_4",
    percentage: null,
    description: "of searches"
}, {
    title: "Yosemite Sam",
    subtitle: "Buckaroo",
    color: "PALETTE_COLOR_5",
    percentage: null,
    description: "of searches"
}];
M.prototype.onTopicsChange_ = function() {
    var a = this.widget.fields.topics.getValues();
    this.circularProgressData = this.lodash_.filter(a, function(a) {
        return "" !== a.title
    });
    this.isSmallMode = 3 < this.circularProgressData.length
}
;
M.prototype.middleware_ = function(a) {
    var b = this.widget.fields.topics.getValues();
    this.lodash_.forEach(a["default"].value, function(a, d) {
        b[d].percentage = a
    });
    return {
        topics: b
    }
}
;
J.FeCircularProgressV1 = M;
var de = angular.module("publishAppFeCircularProgressV1", ["publishAppFramework", "publishAppWidgetsFeCircularProgressV1Views"]);
de.controller("FeCircularProgressV1Ctrl", J.FeCircularProgressV1);
de.directive("circularProgressDirective", be);
angular.module("publishAppWidgetsFeDonutChartV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_donut_chart_v1/views/content.html", '<div class="fe-donut-chart-content">\n  <div class="fe-donut-chart-directive-wrapper">\n    <donut-chart-directive class="fe-donut-chart-directive"\n                           data="ctrl.donutData"\n                           options="ctrl.donutOptions"\n                           columns="ctrl.chartColumns">\n    </donut-chart-directive>\n  </div>\n  <div class="fe-donut-chart-legend">\n    <div class="fe-donut-chart-legend-items-wrapper">\n      <div ng-repeat="value in ctrl.donutLegendData | limitTo: 5"\n           class="fe-donut-chart-legend-item">\n        <div class="fe-donut-chart-legend-item-circle"\n             ng-style="{\'background-color\': ctrl.legendColors[$index]}">\n        </div>\n        <div class="fe-donut-chart-legend-item-text" bidi="value">{{value}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_donut_chart_v1/views/fe.html", '<div class="fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">\n      {{fields.topic.value}}\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_donut_chart_v1/views/content.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_donut_chart_v1/views/fe_embed.html", '<div class="embed-container fe-donut-chart-embed-wrapper"\n    ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content"\n              src="\'/widgets_library/fe_donut_chart_v1/views/content.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_donut_chart_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container fe-featured-donut-chart-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-featured-donut-chart-directive-wrapper">\n    <donut-chart-directive class="fe-featured-donut-directive"\n                              data="ctrl.donutData"\n                              options="ctrl.donutOptions"\n                              columns="ctrl.chartColumns">\n    </donut-chart-directive>\n  </div>\n  <div class="fe-featured-donut-chart-legend">\n    <div class="fe-featured-donut-chart-legend-items-wrapper">\n      <div ng-repeat="value in ctrl.donutLegendData | limitTo: 5"\n           class="fe-featured-donut-chart-legend-item-container">\n        <div class="fe-featured-donut-chart-legend-item-circle"\n             ng-style="{\'background-color\':ctrl.legendColors[$index]}">\n        </div>\n        <div class="fe-featured-donut-chart-legend-item-text" bidi="value">{{value}}</div>\n      </div>\n    </div>\n  </div>\n  <div class="fe-featured-atoms-generic-container-title fe-featured-container-title">\n    {{fields.topic.value | typography}}\n  </div>\n</div>\n\n'))
}
]);
var fe = function(a, b, c, d, f) {
    this.lodash_ = b;
    this.globals = f;
    this.colors_ = new d.Colors(a.palette);
    this.widget = new c([{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Donut FE",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/PpmHsz"
        }
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        maxLimit: 5,
        keys: ["text", "percentage"],
        translation: {
            translate: !0,
            keys: [{
                name: "text",
                description: "Legend item text of donut chart widget in the Trends website. http://goo.gl/PpmHsz"
            }]
        },
        keysConfig: {
            text: {
                gridSpan: 9
            },
            percentage: {
                placeholder: "%",
                gridSpan: 3
            }
        },
        values: ee
    }],a.isEditor);
    b = b.bind(this.onBulletsChange_, this);
    a.$watch("ctrl.widget.fields.bullets.items", b, !0);
    this.legendColors = this.colors_.getHexValues();
    this.donutData = null;
    this.donutLegendData = [];
    this.donutOptions = {
        tooltip: {
            isHtml: !0,
            showTitle: !1
        },
        colors: this.legendColors,
        legend: "none",
        pieHole: .6,
        backgroundColor: {
            fill: "transparent"
        },
        pieSliceBorderColor: "none",
        pieSliceText: "none",
        chartArea: {
            height: "160",
            width: "160"
        }
    };
    "fe_featured" === a.template || f.isMobileMode ? (this.donutOptions.enableInteractivity = !1,
    this.chartColumns = [{
        type: "string"
    }, {
        type: "number",
        label: "bullets.percentage"
    }, {}]) : (this.donutOptions.tooltip.slices = {
        0: {
            color: "black"
        },
        3: {
            color: "red"
        }
    },
    this.donutOptions.tooltip.isHtml = !0,
    this.donutOptions.crosshair = {
        orientation: "vertical",
        trigger: "focus",
        opacity: .3
    },
    this.chartColumns = [{
        type: "string"
    }, {
        type: "number",
        label: "bullets.percentage"
    }, {
        type: "string",
        role: "tooltip",
        p: {
            html: !0
        }
    }])
};
k("$jscomp.scope.FeDonutChartV1Ctrl", fe, void 0);
fe.$inject = ["$scope", "lodash", "widgetFactory", "colorsFactory", "globalsService"];
fe.DISPLAY_TYPE = "Donut FE";
fe.GROUP_TYPE = "FE";
fe.HIDE_IN_EDITOR = !1;
fe.FULL_WIDTH = !0;
e = fe.prototype;
e.onBulletsChange_ = function() {
    var a = this.widget.fields.bullets
      , b = this.parseDonutData_(a.getValues());
    a.config.notification = this.isInputValid_(b) ? "" : "WARNING: sum of all weights is not equal to 100%!";
    this.donutData = b;
    this.donutLegendData = this.parseLegendData_(a.getValues())
}
;
e.parseLegendData_ = function(a) {
    return this.lodash_.map(a, function(a) {
        return a.text
    })
}
;
e.parseDonutData_ = function(a) {
    var b = this;
    return this.lodash_.map(a, function(a, d) {
        var c = a.percentage.match(/^(\d{1,3})\%?$/);
        return ["", c ? parseInt(c[1]) : 0, b.createCustomTooltipData_(a, d)]
    })
}
;
e.isInputValid_ = function(a) {
    var b = 0;
    this.lodash_.forEach(a, function(a) {
        b += a[1]
    });
    return 100 === b
}
;
e.createCustomTooltipData_ = function(a, b) {
    return '<div class="fe-donut-tooltip"><div class="fe-donut-tooltip-label">' + q(a.text) + '</div><div class="fe-donut-tooltip-percentage" style="color:' + this.legendColors[b] + ';">' + q(a.percentage) + "</div></div>"
}
;
var ee = [{
    text: "ISIL terrorist group",
    percentage: "60%"
}, {
    text: "Iraq-Syrian border",
    percentage: "20%"
}, {
    text: "American people security",
    percentage: "10%"
}, {
    text: "Jim",
    percentage: "9%"
}, {
    text: "David",
    percentage: "1%"
}];
fe.TYPE = "fe_donut_chart";
fe.VERSION = 1;
fe.TEMPLATES = ["fe", "fe_featured", "fe_embed"];
J.FeDonutChartV1 = fe;
var ge = angular.module("publishAppFeDonutChartV1", ["publishAppFramework", "publishAppWidgetsFeDonutChartV1Views"]);
ge.controller("FeDonutChartV1Ctrl", J.FeDonutChartV1);
angular.module("publishAppWidgetsFeGeoChartV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    function c(a) {
        return a.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    }
    b() && (a.put("/widgets_library/fe_geo_chart_v1/views/content.html", '<div class="fe-atoms-generic-content-container"\n     ng-class="{\'has-error\': !ctrl.chartRows.length}">\n  <div class="widget-error" ng-if="!ctrl.chartRows.length">\n    <p class="widget-error-title">Hmm, your search doesn\'t have enough data to show here.</p>\n    <p class="widget-error-desc">Please make sure everything is spelled correctly, or try a more general term.</p>\n  </div>\n\n  <div class="geo-widget-wrapper geo-resolution-{{ ctrl.geoResolution }}"\n       ng-if="ctrl.chartRows.length">\n    <div class="geo-chart-wrapper"\n         ng-class="{\'side-by-side\': sideBySide}">\n      <geo-chart class="chart-directive"\n                 watch-options="{{::isEditor}}"\n                 options="ctrl.geoOptions"\n                 show-tooltip="true"\n                 columns="ctrl.chartColumnsConfig"\n                 data="ctrl.chartRows"\n                 on-region-click="triggerEvent(\'regionClick\', {\'region\': region})"\n                 ng-if="sideBySide || !ctrl.showRelatedView || ctrl.globalsService.isMobileMode"\n                 ng-show="ctrl.chartRows.length | limitTo:storyNumberOfItems">\n      </geo-chart>\n    </div><div class="related-queries-combo-wrapper"\n               ng-class="{\'side-by-side\': sideBySide}"\n               ng-if="sideBySide || ctrl.showRelatedView || ctrl.globalsService.isMobileMode">\n      <widget type="fe_related_queries"\n              version="1"\n              template="{{ctrl.template}}"\n              fields="ctrl.relatedFields"\n              on-event="onEvent({\'event\': event});"\n              is-editor="isEditor"\n              story-id="storyId"\n              story-title="storyTitle"\n              story-title-array="storyTitleArray"\n              story-country="storyCountry"\n              story-time-range="storyTimeRange"\n              story-number-of-items="storyNumberOfItems"\n              palette="palatte"\n              forced-color="{{::forcedColor}}"\n              is-scrolled-into="true"\n              ng-if="ctrl.relatedFields">\n      </widget>\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/embed_map_resolution_selector.html", '<div class="embed-map-resolution-selector-wrapper">\n  <md-menu class="embed-map-resolution-selector"\n           ng-if="widget.apis.fe_geo_compared_map.isActive"\n           md-offset="{{ctrl.globalsService_.isDesktopMode ? \'-132 -67\' : \'-132 8\'}}">\n    <md-button class="bottom-button md-icon-button"\n               ng-click="$mdOpenMenu($event)">\n      <md-icon class="more-vert"> </md-icon>\n    </md-button>\n    <md-menu-content width="3">\n      <md-menu-item ng-if="fields.region.value === \'world\'">\n        <md-button ng-click="ctrl.setSelectedResolution(\'region\')">\n          <div layout="row">\n            <p class="md-menu-item-text">\n              Region\n            </p>\n          </div>\n        </md-button>\n      </md-menu-item>\n      <md-menu-item ng-if="fields.region.value.length === 2">\n        <md-button ng-click="ctrl.setSelectedResolution(\'subregion\')">\n          <div layout="row">\n            <p class="md-menu-item-text">\n              Subregion\n            </p>\n          </div>\n        </md-button>\n      </md-menu-item>\n      <md-menu-item ng-if="fields.region.value === \'US\'">\n        <md-button ng-click="ctrl.setSelectedResolution(\'metro\')">\n          <div layout="row">\n            <p class="md-menu-item-text">\n              Metro\n            </p>\n          </div>\n        </md-button>\n      </md-menu-item>\n      <md-menu-item>\n        <md-button ng-click="ctrl.setSelectedResolution(\'city\')">\n          <div layout="row">\n            <p class="md-menu-item-text">\n              City\n            </p>\n          </div>\n        </md-button>\n      </md-menu-item>\n    </md-menu-content>\n  </md-menu>\n</div>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/fe.html", '<div class="fe-geo-chart-generated fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields;hideSubregion = fields.displayMode.value == \'markers\'"\n     side-by-side="">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">{{fields.topic.value}}\n      <help-dialog ng-show="$root.globals.isDesktopMode && helpDialog"\n                   data="helpDialog"></help-dialog>\n    </div>\n    <div class="resolution-selector-container"\n         ng-if="ctrl.chartRows.length"\n         ng-include="\'/widgets_library/fe_geo_chart_v1/views/resolution_selector.html\'">\n    </div>\n    <div class="fe-atoms-generic-toggle-button"\n         ng-if="ctrl.chartRows.length"\n         ng-include="\'/widgets_library/fe_geo_chart_v1/views/toggle_button.html\'">\n    </div>\n    <widget-actions ng-if="ctrl.template === \'fe\'"></widget-actions>\n  </div>\n  <div ng-if="ctrl.widget.isQuerying"\n       class="fe-geo-chart-loader">\n    <md-progress-circular class="md-default-theme"\n                          md-diameter="30px"\n                          md-mode="indeterminate"\n                          aria-valuemin="0" aria-valuemax="100">\n    </md-progress-circular>\n  </div>\n  <ng-include src="\'/widgets_library/fe_geo_chart_v1/views/content.html\'"\n              ng-if="ctrl.chartRows !== null && !ctrl.widget.isQuerying"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/fe_embed.html", '<div class="fe-geo-chart-generated-embed embed-container"\n     ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n\n  <div ng-if="ctrl.widget.isQuerying"\n       class="fe-geo-chart-loader">\n    <md-progress-circular class="md-default-theme"\n                          md-diameter="30px"\n                          md-mode="indeterminate"\n                          aria-valuemin="0" aria-valuemax="100">\n    </md-progress-circular>\n  </div>\n\n  <ng-include class="embed-content"\n              src="\'/widgets_library/fe_geo_chart_v1/views/content.html\'"\n              ng-if="ctrl.chartRows !== null && !ctrl.widget.isQuerying">\n  </ng-include>\n\n  <div class="embed-icons-wrapper">\n    <ng-include src="\'/widgets_library/fe_geo_chart_v1/views/toggle_button.html\'"></ng-include>\n    <ng-include src="\'/widgets_library/fe_geo_chart_v1/views/embed_map_resolution_selector.html\'">\n    </ng-include>\n  </div>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/fe_explore_example.html", '<div class="fe-explore-example-legend">\n  <div class="fe-explore-example-legend-item-wrapper">\n    <div class="fe-explore-example-legend-circle circle"\n         ng-style="{\'background-color\': ctrl.hexColor}">\n    </div>\n    <div class="fe-explore-example-legend-text">\n      {{ ::storyTitleArray[0] }}\n    </div>\n  </div>\n</div>\n<ng-include src="\'/widgets_library/fe_geo_chart_v1/views/fe_featured.html\'">\n</ng-include>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <geo-chart class="fe-featured-generic-container-content"\n             watch-options="{{::isEditor}}"\n             options="ctrl.geoOptions"\n             columns="[{type: \'string\'},\n                      {type: \'number\', label: \'annotation\'}]"\n             show-tooltip="false"\n             data="ctrl.chartRows">\n  </geo-chart>\n  <div class="fe-featured-atoms-generic-container-title">{{fields.topic.value | typography}}</div>\n</div>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/resolution_selector.html", '<md-select class="resolution-selector"\n           aria-label="Select resolution"\n           ng-model="ctrl.geoResolution"\n           placeholder="Resolution"\n           md-container-class="geo-resolution"\n           ng-change="ctrl.updateResolution()"\n           ng-if="widget.apis.fe_geo_compared_map.isActive">\n  <md-option value="region"\n             ng-if="fields.region.value === \'world\'">\n    Region\n  </md-option>\n  <md-option value="subregion"\n             ng-if="!hideSubregion && fields.region.value.length === 2">\n    Subregion\n  </md-option>\n  <md-option value="metro"\n             ng-if="ctrl.enableMetroResolution(fields.region.value)">\n    Metro\n  </md-option>\n  <md-option value="city">\n    City\n  </md-option>\n</md-select>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/toggle_button.html", '<div class="fe-atoms-generic-hide-in-mobile toggle-button-wrapper">\n   <button class="toggle-button list-image"\n      title="' + c("List view") + '"\n      track="[\'Widget\', type, \'List\']"\n      ng-click="ctrl.showRelatedView = !ctrl.showRelatedView"\n      ng-if="!sideBySide && !ctrl.showRelatedView">\n   </button>\n   <button class="toggle-button globe-image"\n      title="' + c("Map view") + '"\n      track="[\'Widget\', type, \'Map\']"\n      ng-click="ctrl.showRelatedView = !ctrl.showRelatedView"\n      ng-if="!sideBySide && ctrl.showRelatedView">\n   </button>\n</div>\n'),
    a.put("/widgets_library/fe_geo_chart_v1/views/us_states.html", '<geo-chart class="fe-geo-chart-directive"\n           watch-options="{{::isEditor}}"\n           options="ctrl.geoOptions"\n           show-tooltip="true"\n           columns="ctrl.chartColumnsConfig"\n           data="ctrl.chartRows"\n           on-region-click="triggerEvent(\'regionClick\', {\'region\': region})">\n</geo-chart>\n'))
}
]);
angular.module("publishAppWidgetsFeRelatedQueriesV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_related_queries_v1/views/bullets_view_selector.html", '<md-select class="bullets-view-selector"\n           aria-label="Select bullets view"\n           ng-model="ctrl.viewField"\n           placeholder="Bullets view"\n           md-container-class="queries-bullets-view"\n           ng-if="showModePicker &&\n                  ($parent.fields.risingBullets.getValues().length ||\n                  $parent.fields.bullets.getValues().length)">\n  <md-option value="risingBullets"\n             ng-show="$parent.fields.risingBullets.getValues().length">\n    Rising\n  </md-option>\n  <md-option value="bullets"\n             ng-show="$parent.fields.bullets.getValues().length">\n    Top\n  </md-option>\n</md-select>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/content.html", '<div class="fe-atoms-generic-content-container"\n     ng-class="{\'show-expended\': ctrl.showMoreExpanded,\n                \'has-error\': !fields.bullets.getValues().length}">\n  <div class="widget-error" ng-if="!fields.bullets.getValues().length">\n    <p class="widget-error-title">Hmm, your search doesn\'t have enough data to show here.</p>\n    <p class="widget-error-desc">Please make sure everything is spelled correctly, or try a more general term.</p>\n  </div>\n\n  <a class="item" href="{{item.value.link}}"\n     target="{{template === \'fe_embed\' ? \'_blank\' : \'_self\'}}"\n     track="[\'Widget\', type, item.value.text]"\n     ng-click="triggerEvent(\'itemClick\', {\'item\': item.value}, $event)"\n     ng-repeat="item in fields[ctrl.viewField].items | limitTo:ctrl.getItemsLimit() track by $index"\n     ng-if="item.value.text && item.value.link">\n    <div ng-include="\'/widgets_library/fe_related_queries_v1/views/item_view.html\'"></div>\n  </a>\n  <div class="item"\n       ng-click="triggerEvent(\'itemClick\', {\'item\': item.value})"\n       ng-repeat="item in fields[ctrl.viewField].items | limitTo:ctrl.getItemsLimit() track by $index"\n       ng-if="item.value.text && !item.value.link">\n    <div ng-include="\'/widgets_library/fe_related_queries_v1/views/item_view.html\'"></div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/embed_bullets_view_selector.html", '<md-menu ng-if="showModePicker &&\n                ($parent.fields.risingBullets.getValues().length ||\n                $parent.fields.bullets.getValues().length)"\n         md-offset="{{ctrl.globalsService_.isDesktopMode ? \'-132 -67\' : \'-132 8\'}}">\n  <md-button class="bottom-button md-icon-button"\n             ng-click="$mdOpenMenu($event)">\n    <md-icon class="more-vert"> </md-icon>\n  </md-button>\n  <md-menu-content width="3">\n    <md-menu-item>\n      <md-button ng-click="ctrl.setViewField(\'risingBullets\')">\n        <div layout="row">\n          <p class="md-menu-item-text">\n            Rising\n          </p>\n        </div>\n      </md-button>\n    </md-menu-item>\n    <md-menu-item>\n      <md-button ng-click="ctrl.setViewField(\'bullets\')">\n        <div layout="row">\n          <p class="md-menu-item-text">\n            Top\n          </p>\n        </div>\n      </md-button>\n    </md-menu-item>\n  </md-menu-content>\n</md-menu>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/fe.html", '<div class="fe-related-queries fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">{{fields.topic.value}}\n      <help-dialog ng-show="$root.globals.isDesktopMode && helpDialog"\n                   data="helpDialog"></help-dialog>\n    </div>\n    <ng-include class="bullets-view-selector-container"\n      src="\'/widgets_library/fe_related_queries_v1/views/bullets_view_selector.html\'"></ng-include>\n    <widget-actions></widget-actions>\n  </div>\n\n  <ng-include src="\'/widgets_library/fe_related_queries_v1/views/content.html\'"></ng-include>\n\n  <div class="show-more"\n       ng-click="ctrl.showHideFields()"\n       ng-if="ctrl.isDisplayShowMoreButton()">\n    <div class="show-hide-position"\n         ng-class="{\'arrow-up\': ctrl.showMoreExpanded, \'arrow-down\': !ctrl.showMoreExpanded}">\n    </div>\n\n    <div class="show-hide-label" ng-show="!ctrl.showMoreExpanded">\n      Show more\n    </div>\n\n    <div class="show-hide-label" ng-show="ctrl.showMoreExpanded">\n      Show less\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/fe_embed.html", '<div class="fe-related-queries embed-container"\n     ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content" src="\'/widgets_library/fe_related_queries_v1/views/content.html\'"></ng-include>\n  <ng-include class="bullets-view-selector-container bullets-view-embed-selector-container"\n              src="\'/widgets_library/fe_related_queries_v1/views/embed_bullets_view_selector.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/fe_explore_example.html", '<div class="fe-explore-example-legend">\n  <div class="fe-explore-example-legend-item-wrapper"\n       ng-repeat="title in storyTitleArray">\n    <div class="fe-explore-example-legend-circle circle"\n         ng-style="{\'background-color\': ctrl.colors.getHexValues()[$index]}">\n    </div>\n    <div class="fe-explore-example-legend-text">\n      {{ title }}\n    </div>\n  </div>\n</div>\n<ng-include src="\'/widgets_library/fe_related_queries_v1/views/fe_featured.html\'">\n</ng-include>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-featured-generic-container-content fe-featured-related-content">\n    <div class="fe-featured-related-item"\n         ng-repeat="item in fields.bullets.items | limitTo:5 track by $index"\n         ng-if="item.value.volume && item.value.text">\n      <div class="list-item-number">{{$index+1}}</div>\n      <div class="list-item-text">{{item.value.text}}</div>\n    </div>\n  </div>\n  <div class="fe-featured-atoms-generic-container-title">{{fields.topic.value | typography}}</div>\n</div>\n'),
    a.put("/widgets_library/fe_related_queries_v1/views/item_view.html", '<div class="progress-label">\n  <div class="label-line-number">{{$index + 1}}</div>\n  <div class="label-text" bidi="item.value.text"></div>\n</div>\n<div class="{{ctrl.viewField === \'risingBullets\' ? \'rising\' : \'progress\'}}-value">\n  {{item.value.volume}}\n</div>\n<div class="progress-bar-wrapper"\n     ng-if="ctrl.viewField !== \'risingBullets\'">\n  <div class="progress-bar"\n       ng-style="{\'background-color\' : forcedColor || ctrl.colors.getHexValue(fields.color.value),\n                  \'width\' : item.value.volume < 100 ? item.value.volume + \'%\' : \'100%\'}">\n  </div>\n</div>\n'))
}
]);
var ie = function(a, b, c, d, f, g, h, m) {
    var l = this;
    this.lodash_ = b;
    this.http_ = f;
    this.q_ = g;
    this.colors = new h.Colors(a.palette);
    this.globalsService_ = m;
    this.template = a.template;
    f = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Trending Queries",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/9dEdGs"
        }
    }, {
        name: "color",
        type: "string",
        value: "PALETTE_COLOR_1",
        colorPalette: this.colors,
        options: b.map(h.Colors.DEFAULT_PALETTE, function(a) {
            return {
                name: a.caption,
                value: a.name
            }
        })
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        keys: ["text", "link", "volume"],
        notification: "",
        keysConfig: {
            text: {
                gridSpan: 12
            },
            link: {
                gridSpan: 9
            },
            volume: {
                placeholder: "#",
                gridSpan: 3
            }
        },
        values: he,
        translation: {
            translate: !0,
            keys: [{
                name: "text",
                description: "The text items of the widget. http://goo.gl/9dEdGs"
            }]
        }
    }, {
        name: "risingBullets",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["text", "link", "volume"],
        values: [],
        translation: {
            translate: !0,
            keys: [{
                name: "text",
                description: "The text items of the widget. http://goo.gl/9dEdGs"
            }]
        }
    }];
    this.widget = new c(f,a.isEditor);
    this.storyNumberOfItems = a.storyNumberOfItems;
    this.trackingService = d;
    this.csvField = this.widget.fields.bullets;
    this.viewField = "bullets";
    a = b.bindKey(this, "setService_");
    c = b.bindKey(this, "middleware_");
    b = b.bindKey(this, "oldMiddleware_");
    this.widget.registerAPI("fe_relatedsearches", "/trends/api/widgetdata/relatedsearches/" + this.globalsService_.testStoryID, {
        req: {
            requestOptions: {
                backend: "CM"
            },
            metric: ["RISING", "TOP"],
            keywordType: "QUERY",
            restriction: {
                phrase: "OBAMA",
                time: "now 7-d",
                geo: {
                    country: "US"
                }
            },
            trendinessSettings: {
                compareTime: "2016-04-28T12\\:00\\:00 2016-04-28T14\\:00\\:00"
            }
        }
    }, [{
        path: "req.restriction.phrase",
        title: "Query",
        type: "text",
        invalidMessage: "Query is required."
    }, {
        path: "req.restriction.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.restriction.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.metric",
        title: "Metric",
        type: "list",
        hidden: !0
    }, {
        path: "req.keywordType",
        title: "Keyword type",
        type: "text",
        invalidMessage: "Keyword type is required.",
        hidden: !0
    }]).middleware(c).toggle(function(a) {
        l.widget.fields.bullets.config.translation.translate = !a
    }).setShowInEditor(!1);
    this.widget.registerAPI("fe_relatedqueries", "/trends/api/widgetdata/relatedqueries/" + this.globalsService_.testStoryID, {
        geo: {
            country: "US"
        },
        locale: "en",
        mid: ["/m/015nr6"],
        term: ["barbara bush 90th birthday", "barbara bush birthday", "barbara bush", "george hw bush"],
        time: "2015-06-06T17\\:00\\:00 2015-06-08T12\\:55\\:00",
        trendinessSettings: {
            compareTime: "2015-06-03T20\\:00\\:00 2015-06-07T17\\:00\\:00",
            jumpThreshold: 2
        }
    }, [{
        path: "geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "trendinessSettings.compareTime",
        title: "Compare time",
        type: "text",
        invalidMessage: "Compare time is required."
    }, {
        path: "mid",
        title: "Mid",
        type: "list",
        group: "midOrQuery",
        groupValue: "mid",
        invalidMessage: "Mid is required."
    }, {
        path: "query",
        title: "Query",
        type: "text",
        group: "midOrQuery",
        groupValue: "query",
        invalidMessage: "Query is required."
    }, {
        path: "term",
        title: "Terms",
        type: "list"
    }, {
        path: "trendinessSettings.jumpThreshold",
        title: "Jump threshold",
        type: "number",
        matchValidation: /^(0\.\d*[1-9]|[1-9]\d*(\.\d+)?)$/,
        invalidMessage: "Jump threshold must be a valid positive number."
    }, {
        path: "locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).setService(a).middleware(b).toggle(function(a) {
        l.widget.fields.bullets.config.translation.translate = !a
    });
    this.showMoreExpanded = !1
};
k("$jscomp.scope.FeRelatedQueriesV1Ctrl", ie, void 0);
ie.$inject = "$scope lodash widgetFactory trackingService $http $q colorsFactory globalsService".split(" ");
e = ie.prototype;
e.showHideFields = function() {
    this.showMoreExpanded = !this.showMoreExpanded
}
;
e.setService_ = function(a, b) {
    return this.q_.when(this.http_.post(a, b))
}
;
e.mapKeywords_ = function(a) {
    var b = a.query || a.topic.title
      , b = a.topic && a.topic.type ? [b, a.topic.type].join(" - ") : b;
    return this.lodash_.assign({
        text: b,
        link: a.link,
        volume: a.formattedValue || a.value
    }, a.topic)
}
;
e.setViewField = function(a) {
    this.viewField = a
}
;
e.middleware_ = function(a) {
    var b = a["default"].rankedList;
    a = this.lodash_.map(b[0].rankedKeyword, this.mapKeywords_, this);
    b = this.lodash_.map(b[1].rankedKeyword, this.mapKeywords_, this);
    this.viewField = 0 < b.length ? "risingBullets" : "bullets";
    return {
        risingBullets: b,
        bullets: a
    }
}
;
e.oldMiddleware_ = function(a) {
    this.viewField = "bullets";
    return {
        risingBullets: {},
        bullets: this.lodash_.map(a["default"].queries, this.mapKeywords_, this)
    }
}
;
e.getItemsLimit = function() {
    return this.globalsService_.isMobileMode && "fe_embed" === this.template ? this.storyNumberOfItems ? this.storyNumberOfItems : 5 : Infinity
}
;
e.isDisplayShowMoreButton = function() {
    return 5 < this.lodash_.compact(this.widget.fields.bullets.getValues()).length
}
;
var he = [{
    text: "ISIL terrorist group",
    link: "/trends/explore#q=ISIL%20terrorist%20group",
    volume: "60"
}, {
    text: "Iraq-Syrian border",
    link: "/trends/explore#q=Iraq-Syrian%20border",
    volume: "20"
}, {
    text: "american people security",
    link: "/trends/explore#q=american%20people%20security",
    volume: "10"
}, {
    text: "Jim Fuley",
    link: "/trends/explore#q=Jim%20Fuley",
    volume: "9"
}, {
    text: "David Fuley",
    link: "/trends/explore#q=David%20Fuley",
    volume: "1"
}];
ie.TYPE = "fe_related_queries";
ie.VERSION = 1;
ie.DISPLAY_TYPE = "Trending Queries";
ie.FULL_WIDTH = !0;
ie.HIDE_IN_EDITOR = !1;
ie.GROUP_TYPE = "FE";
ie.TEMPLATES = ["fe", "fe_featured", "fe_embed"];
J.FeRelatedQueriesV1 = ie;
var je = angular.module("publishAppFeRelatedQueriesV1", ["publishAppFramework", "publishAppWidgetsFeRelatedQueriesV1Views"]);
je.controller("FeRelatedQueriesV1Ctrl", J.FeRelatedQueriesV1);
var me = function(a, b, c, d, f, g, h) {
    var m = this;
    this.scope_ = a;
    this.lodash_ = c;
    this.window_ = b;
    this.globalsService = f;
    this.colors_ = new g.Colors(a.palette);
    this.colorsFactory_ = g;
    this.trackingService = h;
    this.template = a.template;
    f = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Interest by Country",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/NJ5EXs"
        }
    }, {
        name: "displayMode",
        type: "string",
        placeholder: "Display mode",
        value: "regions",
        options: ["regions", "markers"]
    }, {
        name: "region",
        type: "string",
        placeholder: "Region",
        value: "world"
    }, {
        name: "resolution",
        type: "string",
        placeholder: "Resolution",
        value: "countries",
        options: ["none", "countries", "provinces", "metros"]
    }, {
        name: "geoData",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["geoCode", "geoName", "value", "formattedValue"],
        values: ke,
        translation: {
            translate: !0,
            keys: [{
                name: "geoName",
                description: "The tooltip text that holds the country name. http://goo.gl/NJ5EXs"
            }]
        }
    }, {
        name: "color",
        type: "string",
        value: "PALETTE_COLOR_1",
        colorPalette: this.colors_,
        options: c.map(g.Colors.DEFAULT_PALETTE, function(a) {
            return {
                name: a.caption,
                value: a.name
            }
        })
    }, {
        name: "searchVolumeIndexLabel",
        type: "string",
        placeholder: "Search interest",
        value: "Search interest:",
        translation: {
            translate: !0,
            description: "The text label that holds the title of the searchinterest volume. http://goo.gl/NJ5EXs"
        }
    }];
    this.widget = new d(f,a.isEditor);
    d = c.debounce(c.bindKey(this, "onGeoDataChange_"), 50);
    a.$watch("ctrl.widget.fields.geoData.items", d);
    a.isEditor && a.$watchGroup(["ctrl.widget.fields.displayMode.value", "ctrl.widget.fields.region.value", "ctrl.widget.fields.resolution.value", "ctrl.widget.fields.color.value", "ctrl.widget.fields.searchVolumeIndexLabel.value"], d);
    this.csvField = this.widget.fields.geoData;
    this.widget.registerAPI("fe_geo_compared_map", "/trends/api/widgetdata/comparedgeo/" + this.globalsService.testStoryID, {
        req: {
            requestOptions: {
                backend: "CM"
            },
            resolution: "COUNTRY",
            comparisonItem: [{
                phrase: "OBAMA",
                time: "now 7-d"
            }],
            locale: "en"
        }
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        options: ["DMA", "CITY", "COUNTRY", "REGION"],
        invalidMessage: "Resolution is required."
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem.0.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "text",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            return a[0].phrase
        },
        setValue: function(a, b) {
            return [{
                phrase: a,
                time: b.req.comparisonItem[0].time
            }]
        }
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).middleware(c.bindKey(this, "middleware_")).toggle(function(a) {
        m.widget.fields.geoData.config.translation.translate = !a
    }).setShowInEditor(!1);
    this.widget.registerAPI("fe_geomap", "/trends/api/widgetdata/geomap/" + this.globalsService.testStoryID, {
        req: {
            time: "now 7-d",
            resolution: "COUNTRY",
            isRealTime: !0,
            mid: ["/m/0d063v"],
            locale: "en"
        }
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        options: ["DMA", "CITY", "COUNTRY", "REGION"],
        invalidMessage: "Resolution is required."
    }, {
        path: "req.mid",
        title: "Mid",
        type: "list",
        group: "midOrQuery",
        groupValue: "mid",
        invalidMessage: "Mid is required."
    }, {
        path: "req.query",
        title: "Query",
        type: "text",
        group: "midOrQuery",
        groupValue: "query",
        invalidMessage: "Query is required."
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }, {
        path: "req.isRealTime",
        title: "Real time",
        type: "boolean"
    }]).middleware(c.bindKey(this, "middleware_")).toggle(function(a) {
        m.widget.fields.geoData.config.translation.translate = !a
    });
    this.geoOptions = {
        backgroundColor: {
            fill: "transparent"
        },
        datalessRegionColor: this.colors_.getHexValue("PALETTE_COLOR_6"),
        legend: "none",
        colorAxis: {
            minValue: 0,
            maxValue: 100
        },
        sizeAxis: {
            minValue: 0,
            maxValue: 100
        },
        tooltip: {
            isHtml: !0,
            showTitle: !1
        }
    };
    b.gvizMapDomain && (this.geoOptions.domain = b.gvizMapDomain);
    this.geoOptions.tooltip.trigger = "focus";
    if ("fe_featured" == a.template || "fe_explore_example" == a.template)
        this.geoOptions.enableRegionInteractivity = !1,
        this.geoOptions.height = 168,
        this.geoOptions.tooltip.trigger = "none";
    else if ("us_states" !== a.template) {
        var l = angular.element(b);
        b = c.bindKey(this, "setMobileView_", a);
        var n = c.throttle(b, 50, {
            trailing: !0
        });
        b();
        l.bind("resize", n);
        a.$on("$destroy", function() {
            l.unbind("resize", n)
        })
    }
    this.chartRows = null;
    this.showRelatedView = !1;
    this.relatedFields = null;
    this.chartColumnsConfig = le;
    this.hexColor = this.geoResolution = ""
};
k("$jscomp.scope.FeGeoChartV1Ctrl", me, void 0);
me.$inject = "$scope $window lodash widgetFactory globalsService colorsFactory trackingService".split(" ");
me.TYPE = "fe_geo_chart";
me.DISPLAY_TYPE = "Interest By Region";
me.VERSION = 1;
me.TEMPLATES = ["fe", "fe_featured", "fe_embed", "us_states"];
me.FULL_WIDTH = !0;
me.HIDE_IN_EDITOR = !1;
me.GROUP_TYPE = "FE";
var ke = [{
    geoCode: "IS",
    geoName: "Iceland",
    value: 10,
    formattedValue: "10.00"
}, {
    geoCode: "BJ",
    geoName: "Benin",
    value: 52,
    formattedValue: "52"
}, {
    geoCode: "GA",
    geoName: "Gabon",
    value: 42,
    formattedValue: "42"
}, {
    geoCode: "LS",
    geoName: "Lesotho",
    value: 21,
    formattedValue: "21"
}, {
    geoCode: "AO",
    geoName: "Angola",
    value: 15,
    formattedValue: "15"
}, {
    geoCode: "ZW",
    geoName: "Zimbabwe",
    value: 14,
    formattedValue: "14"
}, {
    geoCode: "IE",
    geoName: "Ireland",
    value: 14,
    formattedValue: "14"
}, {
    geoCode: "US",
    geoName: "United States",
    value: 13,
    formattedValue: "13"
}, {
    geoCode: "JM",
    geoName: "Jamaica",
    value: 12,
    formattedValue: "12"
}, {
    geoCode: "SN",
    geoName: "Senegal",
    value: 12,
    formattedValue: "12"
}, {
    geoCode: "CA",
    geoName: "Canada",
    value: 10,
    formattedValue: "10"
}, {
    geoCode: "DK",
    geoName: "Denmark",
    value: 9,
    formattedValue: "9"
}, {
    geoCode: "KW",
    geoName: "Kuwait",
    value: 8,
    formattedValue: "8"
}, {
    geoCode: "SE",
    geoName: "Sweden",
    value: 7,
    formattedValue: "7"
}, {
    geoCode: "GB",
    geoName: "United Kingdom",
    value: 7,
    formattedValue: "7"
}, {
    geoCode: "FI",
    geoName: "Finland",
    value: 7,
    formattedValue: "7"
}, {
    geoCode: "AU",
    geoName: "Australia",
    value: 6,
    formattedValue: "6"
}, {
    geoCode: "FR",
    geoName: "France",
    value: 6,
    formattedValue: "6"
}]
  , le = [{
    type: "string"
}, {
    type: "number"
}, {
    type: "string",
    role: "tooltip",
    p: {
        html: !0
    }
}]
  , ne = [{
    type: "number"
}, {
    type: "number"
}, {
    type: "number"
}, {
    type: "string",
    role: "tooltip",
    p: {
        html: !0
    }
}]
  , oe = {
    region: ["COUNTRY", "countries", "regions"],
    subregion: ["REGION", "provinces", "regions"],
    metro: ["DMA", "metros", "regions"],
    city: ["CITY", "provinces", "markers"]
};
e = me.prototype;
e.setSelectedResolution = function(a) {
    this.geoResolution = a;
    this.updateResolution()
}
;
e.updateResolution = function() {
    if (this.geoResolution) {
        var a = oe[this.geoResolution]
          , b = a[0]
          , c = "world" === this.geoOptions.region ? "none" : a[1]
          , a = a[2]
          , d = this.widget.apis.fe_geo_compared_map;
        d.params.req.resolution !== b && (this.widget.fields.resolution.setValue(c),
        this.widget.fields.displayMode.setValue(a),
        d.params.req.resolution = b,
        this.chartRows = this.relatedFields = null,
        d.runInBackground().dispatch())
    }
}
;
e.middleware_ = function(a) {
    return {
        geoData: a["default"].geoMapData
    }
}
;
e.getResolutionByFieldValue_ = function(a, b) {
    if ("markers" === b)
        return "city";
    var c = "";
    this.lodash_.forEach(oe, function(b, f) {
        if (b[1] === a)
            return c = f,
            !1
    });
    return c
}
;
e.enableMetroResolution = function(a) {
    return /^US(-[a-z]{2})?$/i.test(a)
}
;
e.onGeoDataChange_ = function() {
    if (!this.widget.isQuerying && this.scope_.isScrolledInto && Object.keys(this.widget.fields).length) {
        var a = this.widget.fields.geoData.getValues();
        this.geoResolution = this.getResolutionByFieldValue_(this.widget.fields.resolution.value, this.widget.fields.displayMode.value);
        this.hexColor = this.scope_.forcedColor || this.colors_.getHexValue(this.widget.fields.color.value);
        this.chartRows = [];
        this.chartColumnsConfig = a[0] && a[0].coordinates ? ne : le;
        var b, c, d, f;
        for (b = 0; b < a.length; b++) {
            d = a[b];
            f = d.coordinates ? [d.coordinates.lat, d.coordinates.lng] : [d.geoCode];
            d.value[0] ? (c = !1,
            f.push(parseInt(d.value[0]))) : (c = !0,
            f.push(parseInt(d.value)));
            if ("fe" == this.template || "fe_embed" == this.template || "us_states" == this.template)
                c = c ? d.formattedValue : d.formattedValue[0],
                f.push(this.createCustomTooltipData_(d.geoName, c, this.hexColor));
            this.chartRows.push(f)
        }
        this.resetRelatedFields_();
        this.geoOptions.displayMode = this.widget.fields.displayMode.value;
        this.geoOptions.region = this.widget.fields.region.value;
        this.geoOptions.resolution = this.widget.fields.resolution.value;
        this.geoOptions.colorAxis.colors = this.colorsFactory_.Colors.COLOR_RANGES[this.hexColor];
        this.scope_.$applyAsync()
    }
}
;
e.createCustomTooltipData_ = function(a, b, c) {
    a = '<div class="fe-geo-custom-tooltip"><div class="fe-geo-state-label">' + q(a);
    a = a + '</div><div class="fe-geo-volume-text-label">' + q(this.widget.fields.searchVolumeIndexLabel.value);
    a = a + '</div><div class="fe-geo-volume-number-label" ' + ('style="color: ' + c + '">') + q(b);
    return a + "</div></div>"
}
;
e.resetRelatedFields_ = function() {
    var a = this.widget.fields.geoData.getValues();
    this.relatedFields = [{
        name: "topic",
        value: ""
    }, {
        name: "bullets",
        values: this.lodash_.chain(a).take(25).map(function(a) {
            return {
                text: a.geoName,
                geoCode: a.geoCode,
                volume: a.value.length ? a.value[0] : a.value,
                link: !1
            }
        }).value()
    }, {
        name: "color",
        value: this.widget.fields.color.value
    }]
}
;
e.setMobileView_ = function() {
    this.geoOptions.height = "mobile" == this.globalsService.getResponsiveMode() ? 180 : "fe_embed" == this.template ? 216 : 273
}
;
J.FeGeoChartV1 = me;
var qe = function() {
    this.restrict = "A";
    this.link = pe.bind(this.link, this)
}, pe, re;
qe.prototype.link = function(a, b) {
    a.widgetElement = b;
    var c = pe.bind(this.resizeHandler_, this, a);
    re.bind("resize", c);
    this.resizeHandler_(a);
    a.$on("$destroy", function() {
        re.unbind("resize", c)
    })
}
;
qe.prototype.resizeHandler_ = function(a) {
    a.sideBySide = 960 <= a.widgetElement[0].getBoundingClientRect().width
}
;
var se = function(a, b) {
    re = angular.element(a);
    pe = b;
    return new qe
};
k("$jscomp.scope.directiveInjector$jscomp$18", se, void 0);
se.$inject = ["$window", "lodash"];
var te = angular.module("publishAppFeGeoChartV1", ["publishAppFramework", "publishAppWidgetsFeGeoChartV1Views", je.name]);
te.controller("FeGeoChartV1Ctrl", J.FeGeoChartV1);
te.directive("sideBySide", se);
angular.module("publishAppWidgetsFeGeoColorChartV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_geo_color_chart_v1/views/content.html", '<div class="fe-geo-color-chart-content">\n  <div class="fe-geo-color-chart-directive-wrapper">\n    <geo-chart class="fe-geo-color-chart-directive"\n               watch-options="{{::isEditor}}"\n               options="ctrl.geoOptions"\n               columns="[{type: \'string\'},\n                          {type: \'number\', label: \'annotation\'},\n                          {type: \'string\', role: \'tooltip\', \'p\': {\'html\': true}}]"\n               data="ctrl.chartRows">\n    </geo-chart>\n  </div><div class="fe-geo-color-chart-legend">\n    <div class="fe-geo-color-chart-legend-items-wrapper">\n      <div ng-repeat="value in ctrl.stateObjValues | limitTo: 5"\n           class="fe-geo-color-chart-legend-item">\n        <div class="fe-geo-color-chart-legend-item-circle"\n             ng-style="{\'background-color\': ctrl.geoOptions.colorAxis.colors[$index]}">\n        </div>\n        <div class="fe-geo-color-chart-legend-item-text" bidi="value">{{value}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v1/views/fe.html", '<div class="fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-curated-atoms-header fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-curated-atoms-title">{{fields.topic.value | typography}}</div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_geo_color_chart_v1/views/content.html\'"></ng-include>\n</div>\n\n'),
    a.put("/widgets_library/fe_geo_color_chart_v1/views/fe_embed.html", '<div class="embed-container" ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content"\n              src="\'/widgets_library/fe_geo_color_chart_v1/views/content.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container fe-featured-geo-color-chart-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-geo-color-chart-directive-wrapper">\n    <geo-chart class="fe-geo-color-chart-directive"\n               watch-options="{{::isEditor}}"\n               options="ctrl.geoOptions"\n               columns="[{type: \'string\'},\n                        {type: \'number\', label: \'annotation\'},\n                        {type: \'string\', role: \'tooltip\', \'p\': {\'html\': true}}]"\n               data="ctrl.chartRows">\n    </geo-chart>\n  </div>\n  <div class="fe-featured-geo-color-chart-legend">\n    <div class="fe-featured-geo-color-chart-legend-items-wrapper">\n      <div ng-repeat="value in ctrl.stateObjValues | limitTo: 5"\n           class="fe-featured-geo-color-chart-legend-item-container">\n        <div class="fe-featured-geo-color-chart-legend-item-circle"\n             ng-style="{\'background-color\':ctrl.geoOptions.colorAxis.colors[$index]}">\n        </div>\n        <div class="fe-featured-geo-color-chart-legend-item-text" bidi="value">{{value}}</div>\n      </div>\n    </div>\n  </div>\n  <div class="fe-featured-atoms-generic-container-title fe-featured-container-title">\n    {{fields.topic.value | typography}}\n  </div>\n</div>\n'))
}
]);
var ve = function(a, b, c, d, f) {
    this.lodash_ = c;
    this.colors_ = new f.Colors(a.palette);
    this.availableColors_ = {};
    c.forEach(c.difference(c.pluck(f.Colors.DEFAULT_PALETTE, "name"), ["PALETTE_COLOR_6"]), function(a) {
        this.availableColors_[a] = {
            name: this.colors_.getConfigByName(a).caption,
            value: a
        }
    }, this);
    f = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Geo Color Coded",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/9aeIiB"
        }
    }, {
        name: "states",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["state", "value", "color"],
        values: ue,
        translation: {
            translate: !0,
            keys: [{
                name: "state",
                description: "The tooltip text that holds the state name. http://goo.gl/9aeIiB"
            }, {
                name: "value",
                description: "The tooltip text that holds the value. http://goo.gl/9aeIiB"
            }]
        }
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        keys: ["value", "color"],
        colorPalette: this.colors_,
        keysConfig: {
            value: {
                gridSpan: 12,
                editable: !1
            },
            color: {
                gridSpan: 12,
                options: c.values(this.availableColors_)
            }
        }
    }];
    this.widget = new d(f,a.isEditor);
    d = c.bind(this.onBulletsChange_, this);
    a.isEditor ? a.$watch("ctrl.widget.fields.bullets.items", d, !0) : a.$watch("ctrl.widget.fields.bullets.items", d);
    c = c.bind(this.onStatesChange_, this);
    a.$watch("ctrl.widget.fields.states.items", c, !0);
    this.csvField = this.widget.fields.states;
    this.geoOptions = {
        region: "US",
        resolution: "provinces",
        backgroundColor: {
            fill: "transparent"
        },
        datalessRegionColor: this.colors_.getHexValue("PALETTE_COLOR_6"),
        legend: "none",
        tooltip: {
            isHtml: !0,
            showTitle: !1,
            trigger: "focus"
        }
    };
    b.gvizMapDomain && (this.geoOptions.domain = b.gvizMapDomain);
    "fe_featured" == a.template && (this.geoOptions.enableRegionInteractivity = !1);
    this.mappedValues_ = {};
    this.stateObjValues = [];
    this.chartRows = []
};
k("$jscomp.scope.FeGeoColorChartV1Ctrl", ve, void 0);
ve.$inject = ["$scope", "$window", "lodash", "widgetFactory", "colorsFactory"];
ve.TYPE = "fe_geo_color_chart";
ve.DISPLAY_TYPE = "Geo Color Coded";
ve.VERSION = 1;
ve.TEMPLATES = ["fe", "fe_featured", "fe_embed"];
ve.FULL_WIDTH = !0;
ve.HIDE_IN_EDITOR = !1;
ve.GROUP_TYPE = "FE";
var ue = [{
    state: "Massachusetts",
    value: "Anise Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Ohio",
    value: "Buckeye Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Illinois",
    value: "Butter Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Alaska",
    value: "Gingerbread Cookies",
    color: "PALETTE_COLOR_2"
}, {
    state: "Connecticut",
    value: "Gingerbread Cookies",
    color: "PALETTE_COLOR_2"
}, {
    state: "New Hampshire",
    value: "Gingerbread Cookies",
    color: "PALETTE_COLOR_2"
}, {
    state: "Rhode Island",
    value: "Gingerbread Cookies",
    color: "PALETTE_COLOR_2"
}, {
    state: "South Carolina",
    value: "Gingerbread Cookies",
    color: "PALETTE_COLOR_2"
}, {
    state: "Vermont",
    value: "Gingerbread Cookies",
    color: "PALETTE_COLOR_2"
}, {
    state: "Washington",
    value: "Gingersnap Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Indiana",
    value: "M&M Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Michigan",
    value: "Molasses Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Iowa",
    value: "Monster Cookies",
    color: "PALETTE_COLOR_4"
}, {
    state: "Missouri",
    value: "Monster Cookies",
    color: "PALETTE_COLOR_4"
}, {
    state: "Nebraska",
    value: "Monster Cookies",
    color: "PALETTE_COLOR_4"
}, {
    state: "South Dakota",
    value: "Monster Cookies",
    color: "PALETTE_COLOR_4"
}, {
    state: "North Carolina",
    value: "Moravian Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Arizona",
    value: "Oatmeal Cookies",
    color: "PALETTE_COLOR_3"
}, {
    state: "District of Columbia",
    value: "Oatmeal Cookies",
    color: "PALETTE_COLOR_3"
}, {
    state: "Hawaii",
    value: "Oatmeal Cookies",
    color: "PALETTE_COLOR_3"
}, {
    state: "New Mexico",
    value: "Oatmeal Cookies",
    color: "PALETTE_COLOR_3"
}, {
    state: "California",
    value: "Persimmon Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "New Jersey",
    value: "Pignoli Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Virginia",
    value: "Preacher Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Colorado",
    value: "Pumpkin Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Oregon",
    value: "Pumpkin Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "New York",
    value: "Rainbow Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Pennsylvania",
    value: "Ricotta Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Kansas",
    value: "Snickerdoodle Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Oklahoma",
    value: "Snickerdoodle Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Texas",
    value: "Snickerdoodle Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Minnesota",
    value: "Spritz Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "North Dakota",
    value: "Spritz Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Wisconsin",
    value: "Spritz Cookies",
    color: "PALETTE_COLOR_6"
}, {
    state: "Alabama",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Arkansas",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Delaware",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Florida",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Georgia",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Idaho",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Kentucky",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Louisiana",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Maine",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Maryland",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Mississippi",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Montana",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Nevada",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Tennessee",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Utah",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "West Virginia",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}, {
    state: "Wyoming",
    value: "Sugar Cookies",
    color: "PALETTE_COLOR_1"
}];
e = ve.prototype;
e.onStatesChange_ = function() {
    var a = this.widget.fields.states.getValues();
    if (!this.lodash_.isEqual(a, this.oldRawData)) {
        this.oldRawData = this.lodash_.clone(a, !0);
        var b = [], c = {
            colors: [],
            values: []
        }, d = this.lodash_.clone(this.availableColors_), f, g, h = this.lodash_.chain(a).groupBy("value").sortBy().reverse().value();
        this.mappedValues_ = {};
        this.stateObjValues = [];
        this.chartRows = [];
        for (g = 0; g < h.length; g++)
            f = h[g][0],
            this.mappedValues_[f.value] = h[g],
            this.updateStateObjColor_(f, g, h, d),
            this.updateColorAxis_(f, b, c, g),
            this.stateObjValues.push(f.value),
            this.setGroupData_(f, h[g], g, a);
        this.geoOptions.colorAxis = c;
        this.setBulletsOthers_(b, d)
    }
}
;
e.updateStateObjColor_ = function(a, b, c, d) {
    var f = this.colors_.getConfigByName(a.color);
    3 < b && 5 !== c.length ? a.color = "PALETTE_COLOR_6" : "PALETTE_COLOR_6" === f.name || d[f.name] || (a.color = this.lodash_.findKey(d));
    delete d[a.color]
}
;
e.updateColorAxis_ = function(a, b, c, d) {
    "PALETTE_COLOR_6" !== a.color ? (b.push({
        value: a.value,
        color: a.color
    }),
    c.colors.push(this.colors_.getHexValue(a.color))) : c.colors.push(this.colors_.getHexValue("PALETTE_COLOR_6"));
    c.values.push(d)
}
;
e.setGroupData_ = function(a, b, c, d) {
    for (var f = 0; f < b.length; f++)
        this.chartRows.push([b[f].state, c, this.createCustomTooltipData_(b[f].state, a.value)]),
        this.lodash_.where(d, {
            state: b[f].state
        })[0].color = a.color
}
;
e.setBulletsOthers_ = function(a) {
    6 < this.stateObjValues.length ? this.stateObjValues[4] = "Others" : 5 < this.stateObjValues.length && (this.stateObjValues[4] = "Others (" + this.stateObjValues[4] + ", " + this.stateObjValues[5] + ")");
    var b = this.widget.fields.bullets;
    b.items = [];
    b.setValues(a)
}
;
e.onBulletsChange_ = function(a, b) {
    if (a && b) {
        var c, d, f;
        for (c = 0; c < b.length; c++)
            if (d = a[c].value,
            f = b[c].value,
            d.color !== f.color) {
                this.updateStateObjGroupColor_(f.value, d.color);
                break
            }
    }
}
;
e.updateStateObjGroupColor_ = function(a, b) {
    for (var c = this.mappedValues_[a] ? this.mappedValues_[a].length : 0, d = 0; d < c; d++)
        this.mappedValues_[a][d].color = b
}
;
e.createCustomTooltipData_ = function(a, b) {
    a = '<div class="fe-geo-color-custom-tooltip"><div class="fe-geo-color-state-label">' + q(a);
    a = a + '</div><div class="fe-geo-color-search-term-label">' + q(b);
    return a + "</div></div>"
}
;
J.FeGeoColorChartV1 = ve;
var we = angular.module("publishAppFeGeoColorChartV1", ["publishAppFramework", "publishAppWidgetsFeGeoColorChartV1Views"]);
we.controller("FeGeoColorChartV1Ctrl", J.FeGeoColorChartV1);
angular.module("publishAppWidgetsFeGeoColorChartV2Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_geo_color_chart_v2/views/content.html", '<div class="fe-geo-color-chart-content-flex"\n     ng-class="{\'has-error\': !ctrl.chartRows.length}"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="widget-error" ng-if="!ctrl.chartRows.length">\n    <p class="widget-error-title">Hmm, your search doesn\'t have enough data to show here.</p>\n    <p class="widget-error-desc">Please make sure everything is spelled correctly, or try a more general term.</p>\n  </div>\n  <div class="fe-geo-color-chart-directive-wrapper-flex"\n       ng-if="ctrl.chartRows.length">\n    <geo-chart class="fe-geo-color-chart-directive"\n               ng-class="{\'no-legend\': !fields.showLegend.value}"\n               watch-options="{{::isEditor}}"\n               options="ctrl.geoOptions"\n               columns="ctrl.chartColumnsConfig"\n               data="ctrl.chartRows"\n               on-region-click="triggerEvent(\'regionClick\', {\'region\': region})">\n    </geo-chart>\n  </div>\n  <div class="fe-geo-color-chart-legend centered-legend" ng-if="fields.showLegend.value">\n    <div class="fe-geo-color-chart-legend-items-wrapper">\n      <div ng-repeat="bullet in fields.bullets.getValues() | limitTo: 5"\n           ng-if="bullet.value && bullet.color"\n           class="fe-geo-color-chart-legend-item">\n        <div class="fe-geo-color-chart-legend-item-bullet"\n             ng-style="{\'background-color\': ctrl.colors.getHexValue(bullet.color)}">\n        </div>\n        <div class="fe-geo-color-chart-legend-item-text" bidi="bullet.value">{{bullet.value}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/fe.html", '<div class="fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">{{fields.topic.value}}\n      <help-dialog ng-show="$root.globals.isDesktopMode && helpDialog"\n                   data="helpDialog"></help-dialog>\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_geo_color_chart_v2/views/content.html\'"\n              ng-if="ctrl.chartRows !== null">\n  </ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/fe_embed.html", '<div class="embed-container" ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content"\n              src="\'/widgets_library/fe_geo_color_chart_v2/views/content.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/fe_explore_example.html", '<div class="fe-explore-example-legend">\n  <div class="fe-explore-example-legend-item-wrapper"\n       ng-repeat="title in storyTitleArray">\n    <div class="fe-explore-example-legend-circle circle"\n         ng-style="{\'background-color\': ctrl.geoOptions.colorAxis.colors[$index]}">\n    </div>\n    <div class="fe-explore-example-legend-text">\n      {{ title }}\n    </div>\n  </div>\n</div>\n<ng-include src="\'/widgets_library/fe_geo_color_chart_v2/views/fe_featured.html\'">\n</ng-include>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container fe-featured-geo-color-chart-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-geo-color-chart-directive-wrapper">\n    <geo-chart class="fe-geo-color-chart-directive"\n               watch-options="{{::isEditor}}"\n               options="ctrl.geoOptions"\n               columns="[{type: \'string\'},\n                        {type: \'number\', label: \'annotation\'},\n                        {type: \'string\', role: \'tooltip\', \'p\': {\'html\': true}}]"\n               data="ctrl.chartRows">\n    </geo-chart>\n  </div>\n  <div class="fe-featured-geo-color-chart-legend"\n       ng-if="template != \'fe_explore_example\'">\n    <div class="fe-featured-geo-color-chart-legend-items-wrapper">\n      <div ng-repeat="bullet in fields.bullets.getValues() | limitTo: 5"\n           ng-if="bullet.value && bullet.color"\n           class="fe-featured-geo-color-chart-legend-item-container">\n        <div class="fe-featured-geo-color-chart-legend-item-circle"\n             ng-style="{\'background-color\': ctrl.colors.getHexValue(bullet.color)}">\n        </div>\n        <div class="fe-featured-geo-color-chart-legend-item-text" bidi="bullet.value">{{bullet.value}}</div>\n      </div>\n    </div>\n  </div>\n  <div class="fe-featured-atoms-generic-container-title fe-featured-container-title">\n    {{fields.topic.value | typography}}\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/now_card.html", '<div class="now-card-geo-color" ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/widgets_library/fe_geo_color_chart_v2/views/content.html\'"\n              ng-if="ctrl.chartRows !== null">\n  </ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/tv_broadcast.html", '<tv-broadcast main-title="{{ctrl.widget.fields.topic.value}}"\n               sub-title="{{ctrl.widget.fields.subTopic.value}}">\n  <div class="fe-geo-color-chart-content" ng-init="fields = ctrl.widget.fields">\n    <ul class="tv-geo-color-chart-legend">\n      <li ng-repeat="bullet in fields.bullets.getValues()"\n          ng-if="bullet.value && bullet.color">\n        <span ng-style="{\'background-color\': ctrl.colors.getHexValue(bullet.color)}"></span>\n        {{ bullet.value }}\n      </li>\n    </ul>\n    <div class="fe-geo-color-chart-directive-wrapper">\n      <geo-chart class="fe-geo-color-chart-directive"\n                 watch-options="{{::isEditor}}"\n                 options="ctrl.geoOptions"\n                 columns="[{type: \'string\'},\n                          {type: \'number\', label: \'annotation\'},\n                          {type: \'string\', role: \'tooltip\', \'p\': {\'html\': true}}]"\n                 data="ctrl.chartRows">\n      </geo-chart>\n    </div>\n  </div>\n</tv-broadcast>\n'),
    a.put("/widgets_library/fe_geo_color_chart_v2/views/us_states.html", '<geo-chart class="fe-geo-color-chart-directive"\n           ng-class="{\'no-legend\': !fields.showLegend.value}"\n           watch-options="{{::isEditor}}"\n           options="ctrl.geoOptions"\n           columns="ctrl.chartColumnsConfig"\n           data="ctrl.chartRows"\n           on-region-click="triggerEvent(\'regionClick\', {\'region\': region})">\n</geo-chart>\n'))
}
]);
var ze = function(a, b, c, d, f, g) {
    this.scope_ = a;
    this.lodash_ = c;
    var h;
    h = "tv_broadcast" === a.template ? f.Colors.TV_PALETTE : f.Colors.DEFAULT_PALETTE;
    this.colors = new f.Colors(a.palette || h);
    this.globals = g;
    f = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Obama vs Bush",
        translation: {
            translate: !0,
            description: "Title of the widget."
        }
    }, {
        name: "subTopic",
        type: "string",
        placeholder: "Description",
        value: "in last 24 hours",
        translation: {
            translate: !0,
            description: "Subtitle of the widget."
        }
    }, {
        name: "region",
        type: "string",
        placeholder: "Region",
        value: "US"
    }, {
        name: "resolution",
        type: "string",
        placeholder: "Resolution",
        value: "provinces",
        options: ["countries", "provinces", "metros"]
    }, {
        name: "geoData",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["geoName", "maxValueIndex", "value", "formattedValue"],
        csvKeys: ["geoName", "maxValueIndex"].concat(c.flatten(c.times(5, function(a) {
            return ["value" + (a + 1), "formattedValue" + (a + 1)]
        }))),
        csvGetter: c.bindKey(this, "csvGetter_"),
        csvSetter: c.bindKey(this, "csvSetter_"),
        values: xe,
        translation: {
            translate: !0,
            keys: [{
                name: "geoName",
                description: "The tooltip text that holds the geo name."
            }, {
                name: "value",
                description: "The tooltip text that holds the value."
            }]
        }
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        keys: ["value", "color"],
        maxLimit: 5,
        colorPalette: this.colors,
        keysConfig: {
            value: {
                gridSpan: 12
            },
            color: {
                gridSpan: 12,
                options: c.map(this.colors.palette_, function(a) {
                    return {
                        name: a.caption,
                        value: a.name
                    }
                })
            }
        },
        values: [{
            value: "OBAMA",
            color: "PALETTE_COLOR_1"
        }, {
            value: "BUSH",
            color: "PALETTE_COLOR_2"
        }, {
            value: "",
            color: "PALETTE_COLOR_3"
        }, {
            value: "",
            color: "PALETTE_COLOR_4"
        }, {
            value: "",
            color: "PALETTE_COLOR_5"
        }]
    }, {
        name: "showLegend",
        type: "boolean",
        value: !0,
        visible: !1
    }];
    this.widget = new d(f,a.isEditor);
    d = c.bind(this.onGeoOptionsChange_, this);
    f = c.debounce(c.bindKey(this, "onGeoDataChange_"), 50);
    a.$watchGroup(["ctrl.widget.fields.region.value", "ctrl.widget.fields.resolution.value"], d);
    a.$watch("ctrl.widget.fields.geoData.items", f);
    a.isEditor ? a.$watch("ctrl.widget.fields.bullets.items", f, !0) : a.$watch("ctrl.widget.fields.bullets.items", f);
    this.csvField = this.widget.fields.geoData;
    this.widget.registerAPI("fe_geo_color_map", "/trends/api/widgetdata/comparedgeo/" + this.globals.testStoryID, {
        req: {
            requestOptions: {
                backend: "CM"
            },
            geo: {
                country: "US"
            },
            resolution: "REGION",
            comparisonItem: [{
                phrase: "OBAMA",
                time: "now 7-d"
            }, {
                phrase: "BUSH",
                time: "now 7-d"
            }],
            locale: "en"
        }
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        options: ["DMA", "CITY", "COUNTRY", "REGION"],
        invalidMessage: "Resolution is required."
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem.0.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "list",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b.push(a[c].phrase);
            return b
        },
        setValue: function(a, b) {
            for (var c = [], d = 0; d < a.length; d++)
                c.push({
                    phrase: a[d],
                    time: b.req.comparisonItem[0].time
                });
            return c
        }
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).middleware(c.bindKey(this, "middleware_"));
    this.tooltipTrigger = "tv_broadcast" === a.template ? "none" : "focus";
    this.geoOptions = {
        backgroundColor: {
            fill: "transparent"
        },
        datalessRegionColor: this.colors.getHexValue("PALETTE_COLOR_6"),
        legend: "none",
        sizeAxis: {
            maxSize: 6,
            minSize: 6
        },
        tooltip: {
            isHtml: !0,
            showTitle: !1,
            trigger: this.tooltipTrigger
        }
    };
    b.gvizMapDomain && (this.geoOptions.domain = b.gvizMapDomain);
    this.geoOptions.enableRegionInteractivity = !1;
    "fe_explore_example" == a.template ? this.geoOptions.height = 168 : "now_card" == a.template ? (this.geoOptions.height = 119,
    this.geoOptions.width = 188) : "fe_featured" != a.template && (this.geoOptions.enableRegionInteractivity = !0);
    this.chartRows = null;
    this.chartColumnsConfig = ye
};
k("$jscomp.scope.FeGeoColorChartV2Ctrl", ze, void 0);
ze.$inject = "$scope $window lodash widgetFactory colorsFactory globalsService".split(" ");
ze.TYPE = "fe_geo_color_chart";
ze.DISPLAY_TYPE = "Geo Color Coded";
ze.VERSION = 2;
ze.TEMPLATES = "fe fe_featured fe_embed now_card tv_broadcast us_states".split(" ");
ze.FULL_WIDTH_BY_TEMPLATE = {
    "*": !0,
    now_card: !1
};
ze.HIDE_IN_EDITOR = !1;
ze.GROUP_TYPE = {
    ELE: ["us_states"],
    FE: ["fe", "fe_featured", "fe_embed"],
    NOW_CARD: ["now_card"],
    TV: ["tv_broadcast"]
};
var xe = [{
    geoName: "Massachusetts",
    value: [20, 40],
    formattedValue: ["20", "40"],
    maxValueIndex: 1
}, {
    geoName: "Ohio",
    value: [20, 40],
    formattedValue: ["20", "40"],
    maxValueIndex: 1
}, {
    geoName: "Illinois",
    value: [20, 40],
    formattedValue: ["20", "40"],
    maxValueIndex: 1
}, {
    geoName: "Alaska",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Connecticut",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "New Hampshire",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Rhode Island",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "South Carolina",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Vermont",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Washington",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Indiana",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Michigan",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Iowa",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Missouri",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Nebraska",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "South Dakota",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "North Carolina",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Arizona",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "District of Columbia",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "Hawaii",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "New Mexico",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "California",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "New Jersey",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "Virginia",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Colorado",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Oregon",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "New York",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Pennsylvania",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Kansas",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Oklahoma",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Texas",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Minnesota",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "North Dakota",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "Wisconsin",
    value: [5, 15],
    formattedValue: ["5", "15"],
    maxValueIndex: 1
}, {
    geoName: "Alabama",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Arkansas",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Delaware",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Florida",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Georgia",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Idaho",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Kentucky",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Louisiana",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Maine",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Maryland",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Mississippi",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Montana",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Nevada",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Tennessee",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Utah",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "West Virginia",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoName: "Wyoming",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}]
  , ye = [{
    type: "string"
}, {
    type: "number"
}, {
    type: "string",
    role: "tooltip",
    p: {
        html: !0
    }
}]
  , Ae = [{
    type: "number"
}, {
    type: "number"
}, {
    type: "number"
}, {
    type: "string",
    role: "tooltip",
    p: {
        html: !0
    }
}];
e = ze.prototype;
e.csvGetter_ = function(a) {
    return a = this.lodash_.map(a, function(a) {
        for (var b = {
            formattedValue: [],
            geoName: a.geoName,
            maxValueIndex: parseInt(a.maxValueIndex),
            value: []
        }, d = 0; 5 > d; d++) {
            var f = a["value" + (d + 1)];
            f && (b.value[d] = parseInt(f),
            b.formattedValue[d] = a["formattedValue" + (d + 1)])
        }
        return b
    })
}
;
e.csvSetter_ = function(a) {
    var b = this;
    a.values = this.lodash_.map(a.values, function(a) {
        var c = {
            geoName: a.geoName,
            maxValueIndex: a.maxValueIndex
        };
        b.lodash_.forEach(a.value, function(b, d) {
            c["value" + (d + 1)] = b;
            c["formattedValue" + (d + 1)] = a.formattedValue[d]
        });
        return c
    });
    return a
}
;
e.middleware_ = function(a) {
    return {
        geoData: a["default"].geoMapData
    }
}
;
e.onGeoDataChange_ = function() {
    if (!this.widget.isQuerying && this.scope_.isScrolledInto) {
        var a = this.widget.fields.geoData.getValues();
        this.chartRows = [];
        this.chartColumnsConfig = a[0] && a[0].coordinates ? Ae : ye;
        var b = this.widget.fields.bullets.getValues(), c = {
            colors: [],
            values: []
        }, d;
        this.lodash_.forEach(a, function(a) {
            d = a.coordinates ? [a.coordinates.lat, a.coordinates.lng] : [a.geoCode || a.geoName];
            d.push(a.maxValueIndex, this.createCustomTipData_(a, b));
            this.chartRows.push(d)
        }, this);
        for (var f = 0; f < (a[0] ? a[0].value.length : 0); f++)
            b[f] && b[f].color && c.colors.push(this.colors.getHexValue(b[f].color)),
            c.values.push(f);
        this.geoOptions.colorAxis = c;
        this.onGeoOptionsChange_();
        this.scope_.$applyAsync()
    }
}
;
e.onGeoOptionsChange_ = function() {
    this.geoOptions.region = this.widget.fields.region.value;
    this.geoOptions.resolution = this.widget.fields.resolution.value
}
;
e.createCustomTipData_ = function(a, b) {
    for (var c = '<div class="fe-geo-color-chart-tip"><div class="fe-geo-color-chart-tip-title">' + q(a.geoName) + "</div>", d = 0; d < b.length; d++)
        b[d].value && (c += '<div class="fe-geo-color-chart-tip-item-wrapper"><span class="fe-geo-color-chart-tip-label fe-atoms-generic-elipssis">' + b[d].value + '</span><span class="fe-geo-color-chart-tip-value" style="color:' + this.colors.getHexValue(b[d].color) + '">' + q(a.formattedValue[d]) + "</span></div>");
    return c + "</div>"
}
;
J.FeGeoColorChartV2 = ze;
var Be = angular.module("publishAppFeGeoColorChartV2", ["publishAppFramework", "publishAppWidgetsFeGeoColorChartV2Views"]);
Be.controller("FeGeoColorChartV2Ctrl", J.FeGeoColorChartV2);
angular.module("publishAppWidgetsFeIntOverTimeV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_int_over_time_v1/views/content.html", '<div class="fe-atoms-generic-content-container fe-init-over-time-content-container">\n  <div class="legend fe-atoms-generic-hide-in-desktop">\n   <div class="fe-int-over-time-legend-item-wrapper">\n     <div class="circle"\n          ng-style="{\'background-color\': forcedColor || ctrl.colors.getHexValue(fields.color.value)}">\n     </div>\n     <div class="text">{{fields.lineAnnotationText.value}}</div>\n   </div>\n    <div class="fe-int-over-time-legend-item-wrapper"\n         ng-if="ctrl.hasArticlesData">\n      <div class="circle legend-gray"></div>\n      <div class="text">\n        {{fields.barAnnotationText.value}}\n      </div>\n    </div>\n  </div>\n  <fe-combo-chart-directive class="fe-combo-chart-directive"\n                            options="ctrl.options"\n                            columns="ctrl.chartColumns"\n                            data="ctrl.chartRows">\n  </fe-combo-chart-directive>\n</div>\n'),
    a.put("/widgets_library/fe_int_over_time_v1/views/fe.html", '<div class="fe-int-over-time-generated fe-atoms-generic-container"\n    ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">\n      {{fields.topic.value}}\n    </div>\n    <div class="fe-int-over-time-legend-container">\n      <div class="circle"\n           ng-style="{\n             \'background-color\': forcedColor || ctrl.colors.getHexValue(fields.color.value)\n           }">\n      </div>\n      <div class="text">{{fields.lineAnnotationText.value}}</div>\n      <div class="circle legend-gray" ng-if="ctrl.hasArticlesData"></div>\n      <div class="text" ng-if="ctrl.hasArticlesData">\n        {{fields.barAnnotationText.value}}\n      </div>\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_int_over_time_v1/views/content.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_int_over_time_v1/views/fe_embed.html", '<div class="fe-int-over-time-generated embed-container"\n    ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content" src="\'/widgets_library/fe_int_over_time_v1/views/content.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_int_over_time_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <fe-combo-chart-directive class="fe-featured-generic-container-content"\n                            options="ctrl.options"\n                            columns="[{type: \'string\'},\n                {type: \'number\', label: fields.lineAnnotationText.value}]"\n                            data="ctrl.chartRows">\n  </fe-combo-chart-directive>\n  <div class="fe-featured-atoms-generic-container-title">{{fields.topic.value | typography}}</div>\n</div>\n'))
}
]);
var N = function(a, b, c, d, f, g, h, m) {
    this.scope_ = a;
    this.window_ = b;
    this.lodash_ = c;
    this.colors = new g.Colors(a.palette);
    this.globalsService_ = f;
    this.bidiService_ = h;
    f = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Interest over time",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/NJ5EXs"
        }
    }, {
        name: "barAnnotationText",
        type: "string",
        placeholder: "Bar annotation text",
        value: "News articles",
        translation: {
            translate: !0,
            description: "The legend text of the bar annotations. http://goo.gl/NJ5EXs"
        }
    }, {
        name: "lineAnnotationText",
        type: "string",
        placeholder: "Line annotation text",
        value: "Search interest",
        translation: {
            translate: !0,
            description: "The legend text of the line annotations. http://goo.gl/NJ5EXs"
        }
    }, {
        name: "sumAnnotationText",
        type: "string",
        placeholder: "Accumulative annotation text",
        value: "Accumulative",
        translation: {
            translate: !0,
            description: "The bold text of the tooltip, refer to the accumulative data. http://goo.gl/NJ5EXs"
        }
    }, {
        name: "lineData",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["time", "formattedTime", "formattedAxisTime", "value", "formattedValue"],
        values: Ce
    }, {
        name: "barData",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["startTime", "articles", "accumulative", "formattedArticles", "formattedAccumulative"],
        values: []
    }, {
        name: "color",
        type: "string",
        value: "PALETTE_COLOR_1",
        colorPalette: this.colors,
        options: c.map(g.Colors.DEFAULT_PALETTE, function(a) {
            return {
                name: a.caption,
                value: a.name
            }
        })
    }];
    this.widget = new d(f,a.isEditor);
    this.csvField = this.widget.fields.lineData;
    d = c.bind(this.onDataChange_, this);
    a.$watch("ctrl.widget.fields.lineData.items", d, !0);
    a.isEditor && a.$watchGroup(["ctrl.widget.fields.barAnnotationText.value", "ctrl.widget.fields.lineAnnotationText.value", "ctrl.widget.fields.sumAnnotationText.value", "ctrl.widget.fields.color.value"], d);
    this.widget.registerAPI("fe_intovertime", "/trends/api/widgetdata/timeline/" + this.globalsService_.testStoryID, {
        req: {
            geo: {
                country: "US"
            },
            time: "2015-06-05T17\\:00\\:00 2015-06-08T11\\:25\\:00",
            resolution: "HOUR",
            mid: ["/m/01jddz", "/m/05fjf"],
            locale: "en"
        },
        tz: "300"
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        options: ["MINUTE", "HOUR", "FOUR_HOUR", "DAY"],
        invalidMessage: "Resolution is required."
    }, {
        path: "req.mid",
        title: "Mid",
        type: "list",
        group: "midOrQuery",
        groupValue: "mid",
        invalidMessage: "Mid is required."
    }, {
        path: "req.query",
        title: "Query",
        type: "text",
        group: "midOrQuery",
        groupValue: "query",
        invalidMessage: "Query is required."
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }, {
        path: "tz",
        title: "Timezone",
        type: "select",
        options: m.TIME_ZONES,
        invalidMessage: "Timezone is required."
    }]).middleware(this.middleware_);
    this.options = {
        backgroundColor: {
            fill: "transparent"
        },
        legend: "none",
        baselineColor: "9E9E9E",
        focusTarget: "category",
        hAxis: {
            maxAlternation: 1,
            maxTextLines: 1,
            slantedText: !1,
            textStyle: {
                color: "#9E9E9E",
                fontName: "Roboto"
            }
        },
        vAxes: {
            0: {
                textStyle: {
                    fontName: "Roboto",
                    fontSize: 12
                },
                viewWindow: {
                    min: .01
                },
                baseline: .01
            },
            1: {
                textStyle: {
                    color: "#BDBDBD",
                    fontName: "Roboto",
                    fontSize: 12
                },
                gridlines: {
                    color: "#E0E0E0"
                },
                viewWindow: {
                    min: .01
                }
            }
        },
        connectSteps: !1,
        areaOpacity: 1,
        series: {
            0: {
                type: "steppedArea",
                targetAxisIndex: 1,
                color: "#EEE"
            },
            1: {
                type: "line",
                targetAxisIndex: 0,
                color: "#4285F4"
            }
        },
        tooltip: {
            isHtml: !0,
            showTitle: !1
        }
    };
    if ("fe_featured" == a.template)
        this.options.series = {
            0: {
                type: "line",
                targetAxisIndex: 0,
                color: "#4285F4",
                lineWidth: 4
            }
        },
        this.options.baselineColor = "transparent",
        this.options.hAxis.textPosition = "none",
        this.options.hAxis.gridlines = {
            color: "transparent"
        },
        this.options.vAxis = {
            textPosition: "none",
            gridlines: {
                color: "transparent"
            }
        },
        this.options.height = 168,
        this.options.chartArea = {
            height: "168",
            width: "100%"
        },
        this.options.enableInteractivity = !1;
    else {
        this.options.crosshair = {
            orientation: "vertical",
            trigger: "focus",
            opacity: .3
        };
        var l = angular.element(b);
        b = c.bindKey(this, "updateOptions_", a);
        var n = c.throttle(b, 50, {
            trailing: !0
        });
        this.chartColumns = [{
            type: "string"
        }, {
            type: "string",
            role: "tooltip",
            p: {
                html: !0
            }
        }, {
            type: "number",
            label: "barAnnotationText"
        }, {
            type: "number",
            label: "lineAnnotationText"
        }];
        b();
        l.bind("resize", n);
        a.$on("$destroy", function() {
            l.unbind("resize", n)
        })
    }
    this.chartRows = [];
    this.hasArticlesData = !0
};
k("$jscomp.scope.FeIntOverTimeV1Ctrl", N, void 0);
N.$inject = "$scope $window lodash widgetFactory globalsService colorsFactory bidiService helpersFactory".split(" ");
N.TYPE = "fe_int_over_time";
N.DATA_POINT_DENSITY_LIMIT = 100;
N.DISPLAY_TYPE = "Interest Over Time";
N.VERSION = 1;
N.TEMPLATES = ["fe", "fe_featured", "fe_embed"];
N.FULL_WIDTH = !0;
N.HIDE_IN_EDITOR = !1;
N.GROUP_TYPE = "FE";
var Ce = [{
    time: 0,
    value: 18,
    formattedTime: "May 15, 2015 at 00:00",
    formattedAxisTime: "May 15 at 00:00",
    formattedValue: "18"
}, {
    time: 8,
    value: 23,
    formattedTime: "May 15, 2015 at 08:00",
    formattedAxisTime: "May 15 at 08:00",
    formattedValue: "23"
}, {
    time: 16,
    value: 29,
    formattedTime: "May 15, 2015 at 16:00",
    formattedAxisTime: "May 15 at 16:00",
    formattedValue: "29"
}, {
    time: 24,
    value: 35,
    formattedTime: "May 16, 2015 at 00:00",
    formattedAxisTime: "May 16 at 00:00",
    formattedValue: "35"
}, {
    time: 32,
    value: 18,
    formattedTime: "May 16, 2015 at 08:00",
    formattedAxisTime: "May 16 at 08:00",
    formattedValue: "18"
}, {
    time: 40,
    value: 18,
    formattedTime: "May 16, 2015 at 16:00",
    formattedAxisTime: "May 16 at 16:00",
    formattedValue: "18"
}, {
    time: 48,
    value: 18,
    formattedTime: "May 17, 2015 at 00:00",
    formattedAxisTime: "May 17 at 00:00",
    formattedValue: "18"
}, {
    time: 56,
    value: 21,
    formattedTime: "May 17, 2015 at 08:00",
    formattedAxisTime: "May 17 at 08:00",
    formattedValue: "21"
}, {
    time: 64,
    value: 25,
    formattedTime: "May 17, 2015 at 16:00",
    formattedAxisTime: "May 17 at 16:00",
    formattedValue: "25"
}, {
    time: 72,
    value: 29,
    formattedTime: "May 18, 2015 at 00:00",
    formattedAxisTime: "May 18 at 00:00",
    formattedValue: "29"
}, {
    time: 80,
    value: 32,
    formattedTime: "May 18, 2015 at 08:00",
    formattedAxisTime: "May 18 at 08:00",
    formattedValue: "32"
}, {
    time: 88,
    value: 36,
    formattedTime: "May 18, 2015 at 16:00",
    formattedAxisTime: "May 18 at 16:00",
    formattedValue: "36"
}, {
    time: 96,
    value: 18,
    formattedTime: "May 19, 2015 at 00:00",
    formattedAxisTime: "May 19 at 00:00",
    formattedValue: "18"
}];
e = N.prototype;
e.middleware_ = function(a) {
    return {
        lineData: a["default"].timelineData
    }
}
;
e.getColor_ = function() {
    return this.scope_.forcedColor || this.colors.getHexValue(this.widget.fields.color.value)
}
;
e.onDataChange_ = function() {
    if (!this.widget.isQuerying) {
        var a = this.widget.fields.barData.getValues();
        this.hasArticlesData = 0 !== a.length && !this.lodash_.every(a, function(a) {
            return 0 == a.articles
        });
        "fe_featured" == this.scope_.template ? (a = this.widget.fields.lineData.getValues(),
        this.options.series[0].lineWidth = 100 <= a.length ? 3 : 4,
        this.options.series[0].color = this.getColor_(),
        this.chartRows = this.lodash_.map(a, function(a) {
            return [a.formattedAxisTime, parseInt(a.value)]
        })) : this.hasArticlesData ? this.setupLineAndBarChartData_() : this.setupLineOnlyChartData_()
    }
}
;
e.setupLineOnlyChartData_ = function() {
    var a = this
      , b = this.getColor_();
    this.options.crosshair.color = b;
    this.options.series = {
        0: {
            type: "line",
            targetAxisIndex: 0,
            color: b,
            lineWidth: this.options.series[0].lineWidth
        }
    };
    this.options.vAxes[0].textStyle.color = b;
    this.chartColumns = [{
        type: "string"
    }, {
        type: "string",
        role: "tooltip",
        p: {
            html: !0
        }
    }, {
        type: "number",
        label: "lineAnnotationText"
    }];
    this.chartRows = this.lodash_.map(this.widget.fields.lineData.getValues(), function(b) {
        var c = a.bidiService_.wrapTextUnicodeByPageDirection(b.formattedTime)
          , f = a.bidiService_.wrapTextUnicodeByPageDirection(b.formattedAxisTime)
          , c = this.createCustomTooltipData_(c, b.formattedValue);
        return [f, c, parseInt(b.value)]
    }, this)
}
;
e.setupLineAndBarChartData_ = function() {
    var a = this
      , b = this.getColor_();
    this.options.crosshair.color = b;
    this.options.vAxes[0].textStyle.color = b;
    var c = this.lodash_.indexBy(this.widget.fields.lineData.getValues(), "time");
    this.chartRows = this.lodash_.map(this.widget.fields.barData.getValues(), function(b) {
        var d = c[b.startTime]
          , g = a.bidiService_.wrapTextUnicodeByPageDirection(d ? d.formattedTime : "")
          , h = a.bidiService_.wrapTextUnicodeByPageDirection(d ? d.formattedAxisTime : "")
          , g = this.createCustomTooltipData_(g, d ? d.formattedValue : "", b.formattedArticles, b.formattedAccumulative);
        return [h, g, parseInt(b.articles), parseInt(d ? d.value : "")]
    }, this)
}
;
e.createCustomTooltipData_ = function(a, b, c, d) {
    var f = this.widget.fields
      , g = this.getColor_();
    a = '<div class="fe-over-time-tooltip"><div class="fe-over-time-tooltip-title">' + q(a) + '</div><div class="fe-over-time-tooltip-item-wrapper"><span class="fe-over-time-tooltip-label">' + q(f.lineAnnotationText.value) + '</span><span class="fe-over-time-tooltip-value" style="color:' + g + '">' + q(b) + "</span></div>";
    this.hasArticlesData && (a += '<div class="fe-over-time-tooltip-item-wrapper"><span class="fe-over-time-tooltip-label">' + q(f.barAnnotationText.value) + '</span><span class="fe-over-time-tooltip-value" style="color:' + g + '">' + q(c) + '</span></div><div class="fe-over-time-tooltip-sum-label">' + q(f.sumAnnotationText.value) + '</div><div class="fe-over-time-tooltip-item-wrapper"><span class="fe-over-time-tooltip-label">' + q(f.barAnnotationText.value) + '</span><span class="fe-over-time-tooltip-value"  style="color:' + g + '">' + q(d) + "</span></div>");
    return a + "</div>"
}
;
e.updateOptions_ = function(a) {
    "desktop" == this.globalsService_.getResponsiveMode() ? (this.options.series[0].lineWidth = 4,
    this.options.series[1] && (this.options.series[1].lineWidth = 4),
    this.options.vAxis = null,
    this.options.hAxis.minTextSpacing = 250,
    this.options.hAxis.textStyle.fontSize = 12,
    this.options.height = "fe_embed" === a.template ? 250 : 350,
    this.options.chartArea = {
        top: 47,
        width: "90%"
    }) : (this.options.series[0].lineWidth = 2,
    this.options.series[1] && (this.options.series[1].lineWidth = 2),
    this.options.vAxis = {
        textPosition: "none"
    },
    this.options.hAxis.minTextSpacing = 60,
    this.options.hAxis.textStyle.fontSize = 10,
    this.options.height = 230,
    this.options.chartArea = {
        width: "95%"
    })
}
;
J.FeIntOverTimeV1 = N;
var Ee = function() {
    this.restrict = "E";
    this.template = "<div></div>";
    this.scope = {
        columns: "&",
        data: "=",
        options: "="
    };
    this.link = De.bind(this.link, this)
}, De, Fe, Ge, He;
e = Ee.prototype;
e.redraw_ = function(a) {
    this.scopeDestroy_(a);
    Fe.applyGViz(function(b) {
        for (var c = new b.DataTable, d = a.columns(), f = 0; f < d.length; f++)
            c.addColumn(d[f]);
        c.addRows(a.data);
        var g = a.comboChart_ = new b.ComboChart(a.gvizElement);
        Ge(function() {
            g.draw(c, a.options)
        }, 50)
    })
}
;
e.scopeDestroy_ = function(a) {
    Ge.cancel(a.resizeTimer);
    a.comboChart_ && a.comboChart_.clearChart();
    a.comboChart_ = null
}
;
e.link = function(a, b) {
    var c = this
      , d = De.bind(this.redraw_, this, a)
      , f = De.bind(this.resizeHandler_, this, a);
    a.element = b;
    a.gvizElement = b[0].firstChild;
    a.$watch("data", d, !0);
    He.bind("resize", f);
    this.storeContainerWidth_(a);
    a.$on("$destroy", function() {
        c.scopeDestroy_(a);
        He.unbind("resize", f)
    })
}
;
e.storeContainerWidth_ = function(a) {
    var b = a.element.prop("offsetWidth");
    return a.containerWidth = b
}
;
e.resizeHandler_ = function(a) {
    var b = De.bind(this.redraw_, this, a);
    Ge.cancel(a.resizeTimer);
    a.containerWidth !== this.storeContainerWidth_(a) && (a.resizeTimer = Ge(b, 100))
}
;
var Ie = function(a, b, c, d) {
    He = angular.element(a);
    Ge = b;
    De = c;
    Fe = d;
    return new Ee
};
k("$jscomp.scope.directiveInjector$jscomp$19", Ie, void 0);
Ie.$inject = ["$window", "$timeout", "lodash", "globalsService"];
var Je = angular.module("publishAppFeIntOverTimeV1", ["publishAppFramework", "publishAppWidgetsFeIntOverTimeV1Views"]);
Je.controller("FeIntOverTimeV1Ctrl", J.FeIntOverTimeV1);
Je.directive("feComboChartDirective", Ie);
angular.module("publishAppWidgetsFeLineChartV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_line_chart_v1/views/annotation_markup.html", '<div class="fe-line-chart-annotation">\n  <div class="fe-line-chart-annotation-title">\n    <img src="{{annotationIcon}}"/>\n    <span> {{annotationTitle}} </span></div>\n  <div>{{annotationSubtitle}}</div>\n</div>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/content.html", '<div class="fe-line-chart-legend" ng-if="ctrl.widget.fields.showLegend.value">\n  <div ng-repeat="color in ctrl.chartOptions.colors"\n       class="fe-line-chart-legend-item">\n    <div class="fe-line-chart-legend-circle"\n         ng-style="{\'background-color\': color}"></div>\n    <div class="fe-line-chart-legend-text fe-atoms-generic-elipssis">\n      {{fields.bullets.items[$index].value.text || \'-\'}}\n    </div>\n  </div>\n</div>\n\n<bar-chart ng-if="ctrl.showBarChart"\n           class="fe-bar-chart-directive"\n           ng-class="{\'no-legend\': !ctrl.widget.fields.showLegend.value}"\n           options="ctrl.barChartOptions"\n           watch-options="::isEditor"\n           data="ctrl.barChartData">\n</bar-chart>\n\n<line-chart-directive\n    class="fe-line-chart-directive"\n    on-select="ctrl.onChartSelect(row, column)"\n    tooltip-row="true"\n    ng-class="{\'no-legend\': !ctrl.widget.fields.showLegend.value,\n               \'bar-chart\': ctrl.showBarChart}"\n    watch-options="::isEditor"\n    data="ctrl.chartData"\n    options="ctrl.chartOptions">\n</line-chart-directive>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/fe.html", '<div class="fe-atoms-generic-container fe-line-chart"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-line-chart-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-line-chart-header-title">{{fields.topic.value | typography}}\n      <help-dialog ng-show="$root.globals.isDesktopMode && helpDialog"\n                   data="helpDialog"></help-dialog>\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n\n  <div class="fe-atoms-generic-content-container fe-line-chart-content-container"\n       ng-class="{\'has-error\': !(ctrl.chartData && ctrl.chartData.length)}">\n    <div class="widget-error" ng-if="!(ctrl.chartData && ctrl.chartData.length) && ctrl.errorTimeout">\n      <p class="widget-error-title">\n        Hmm, your search doesn\'t have enough data to show here.\n      </p>\n      <p class="widget-error-desc">\n        Please make sure everything is spelled correctly, or try a more general term.\n      </p>\n    </div>\n    <ng-include class="fe-line-chart-content"\n                ng-if="ctrl.chartData && ctrl.chartData.length"\n                ng-class="{\'no-legend\': !ctrl.widget.fields.showLegend.value}"\n                src="\'/widgets_library/fe_line_chart_v1/views/content.html\'">\n    </ng-include>\n\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/fe_embed.html", '<div class="fe-line-chart embed-container"\n     ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n\n  <ng-include class="fe-line-chart-content embed-content"\n              src="\'/widgets_library/fe_line_chart_v1/views/content.html\'">\n  </ng-include>\n\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/fe_explore_example.html", '<div class="fe-explore-example-legend">\n  <div class="fe-explore-example-legend-item-wrapper"\n       ng-repeat="title in storyTitleArray">\n    <div class="fe-explore-example-legend-circle circle"\n         ng-style="{\'background-color\': ctrl.barChartOptions.colors[$index]}">\n    </div>\n    <div class="fe-explore-example-legend-text">\n      {{ title }}\n    </div>\n  </div>\n</div>\n<ng-include src="\'/widgets_library/fe_line_chart_v1/views/fe_featured.html\'">\n</ng-include>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <line-chart-directive class="fe-featured-generic-container-content"\n              watch-options="::isEditor"\n              data="ctrl.chartData"\n              options="ctrl.chartOptions">\n  </line-chart-directive>\n  <div class="fe-featured-atoms-generic-container-title">{{fields.topic.value | typography}}</div>\n</div>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/now_card.html", '<div class="fe-line-chart now-card-fe-line"\n     ng-init="fields = ctrl.widget.fields">\n  <ng-include class="fe-line-chart-content"\n              ng-class="{\'no-legend\': !ctrl.widget.fields.showLegend.value}"\n              src="\'/widgets_library/fe_line_chart_v1/views/content.html\'">\n  </ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/tv_broadcast.html", '<tv-broadcast main-title="{{ctrl.widget.fields.topic.value}}" sub-title="{{ctrl.widget.fields.subTopic.value}}">\n  <div class="tv-line-chart-bg">\n    <line-chart-directive class="fe-line-chart-directive"\n                watch-options="::isEditor"\n                data="ctrl.chartData"\n                options="ctrl.chartOptions"\n                tooltip-row="ctrl.tooltipXAxisIndexValue"\n                on-select="ctrl.selectHandlerBind(row)">\n    </line-chart-directive>\n  </div>\n</tv-broadcast>\n'),
    a.put("/widgets_library/fe_line_chart_v1/views/tv_broadcast_tooltip.html", '<div class="tv-line-chart-tooltip-wrapper">\n  <div class="tv-line-chart-tooltip-container position-{{tooltipPosition}}">\n    <div class="tv-line-chart-tooltip">\n      {{tooltipAnnotation}}\n    </div>\n  </div>\n</div>\n'))
}
]);
var Me = function(a, b, c, d, f, g, h, m, l, n, t) {
    var u = this;
    this.window_ = b;
    this.lodash_ = f;
    this.helpers_ = n;
    this.colors_ = new h.Colors(a.palette);
    this.template_ = a.template;
    this.scope_ = a;
    this.globalsService_ = g;
    this.bidiService_ = l;
    this.templateCache_ = c;
    this.interpolate_ = d;
    this.tooltipXAxisIndexValue = null;
    this.widget = new m([{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Interest over time hour after attack",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/aH9hb6"
        }
    }, {
        name: "subTopic",
        type: "string",
        placeholder: "Sub Title",
        value: "Binders of woman spiked by 300%",
        templates: ["tv_broadcast"]
    }, {
        name: "tooltipPosition",
        type: "string",
        placeholder: "Tooltip Position",
        options: ["top", "right", "bottom", "left"],
        value: "bottom",
        templates: ["tv_broadcast"]
    }, {
        name: "tooltipAnnotation",
        type: "string",
        placeholder: "Tooltip Annotation",
        value: "97%",
        templates: ["tv_broadcast"]
    }, {
        name: "tooltipXValue",
        type: "string",
        placeholder: "Tooltip X Value",
        value: "",
        templates: ["tv_broadcast"]
    }, {
        name: "XAxisLines",
        type: "number",
        value: 2,
        options: [{
            value: 1,
            name: "One line X axis"
        }, {
            value: 2,
            name: "Two lines X axis"
        }],
        templates: ["tv_broadcast"]
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        maxLimit: 10,
        keys: ["text"],
        keysConfig: {
            text: {
                placeholder: "Legend text",
                gridSpan: 12
            }
        },
        values: [{
            text: "Charlie Hebdo"
        }, {
            text: "Paris"
        }],
        translation: {
            translate: !0,
            keys: [{
                name: "text",
                description: "The text of the tooltip and legend. http://goo.gl/aH9hb6"
            }]
        }
    }, {
        name: "csv",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: "x formattedXAxis formattedX y1 formattedY1 annotation1 annotationIcon1 annotationTitle1 annotationSubtitle1 y2 formattedY2 annotation2 annotationIcon2 annotationTitle2 annotationSubtitle2 annotationSubtitle2 y3 formattedY3 annotation3 annotationIcon3 annotationTitle3 annotationSubtitle3 y4 formattedY4 annotation4 annotationIcon4 annotationTitle4 annotationSubtitle4 y5 formattedY5 annotation5 annotationIcon5 annotationTitle5 annotationSubtitle5".split(" "),
        values: "tv_broadcast" == a.template ? Ke : Le
    }, {
        name: "showLegend",
        type: "boolean",
        value: !0,
        visible: !1
    }, {
        name: "showAverages",
        type: "boolean",
        value: !1,
        visible: !1
    }],a.isEditor);
    this.csvField = this.widget.fields.csv;
    this.onCSVChangeBind_ = f.debounce(f.bindKey(this, "onCSVChange_"), 50);
    a.$watch("ctrl.widget.fields.csv.items", this.onCSVChangeBind_);
    a.isEditor && a.$watch("ctrl.widget.fields.bullets.items", this.onCSVChangeBind_, !0);
    c = !!Object.keys(this.widget.fields).length;
    "tv_broadcast" == a.template && c && (a.$watchGroup(["ctrl.widget.fields.tooltipAnnotation.value", "ctrl.widget.fields.tooltipPosition.value", "ctrl.widget.fields.XAxisLines.value"], this.onCSVChangeBind_),
    this.widget.fields.bullets.config.visible = !1,
    this.widget.fields.tooltipXValue.config.visible = !1,
    this.widget.fields.tooltipXValue.value = this.widget.fields.csv.items[3].value.formattedXAxis,
    d = f.bind(this.onTooltipXChange_, this),
    a.$watch("ctrl.widget.fields.tooltipXValue.value", d));
    c && (this.widget.registerAPI("fe_line_multi_range", "/trends/api/widgetdata/multirange/" + this.globalsService_.testStoryID, {
        req: {
            requestOptions: {
                backend: "IZG"
            },
            comparisonItem: [{
                phrase: "OBAMA",
                time: "2013-05-18 2015-05-18"
            }, {
                phrase: "CLINTON",
                time: "2011-05-18 2013-05-18"
            }],
            resolution: "WEEK",
            locale: "en-US"
        },
        tz: "300"
    }, [{
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        invalidMessage: "Resolution is required.",
        options: "MINUTE EIGHT_MINUTE SIXTEEN_MINUTE HOUR FOUR_HOUR DAY WEEK MONTH YEAR".split(" ")
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem.0.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.comparisonItem.0.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "list",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b.push(a[c].phrase);
            return b
        },
        setValue: function(a, b) {
            for (var c = [], d = 0; d < a.length; d++)
                c.push({
                    geo: b.req.comparisonItem[0].geo,
                    phrase: a[d],
                    time: b.req.comparisonItem[0].time
                });
            return c
        }
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }, {
        path: "tz",
        title: "Timezone",
        type: "select",
        options: n.TIME_ZONES,
        invalidMessage: "Timezone is required."
    }]).middleware(f.bindKey(this, "middleware_")).toggle(function(a) {
        a && (u.chartData = []);
        u.widget.fields.bullets.config.translation.translate = !0
    }).setShowInEditor(!1),
    this.widget.registerAPI("fe_line", "/trends/api/widgetdata/multiline/" + this.globalsService_.testStoryID, {
        req: {
            requestOptions: {
                backend: "CM"
            },
            geo: {
                country: "US"
            },
            time: "2015-06-14T17\\:00\\:00 2015-06-18T11\\:25\\:00",
            resolution: "FOUR_HOUR",
            term: ["Benedict Cumberbatch"],
            locale: "en-US"
        },
        tz: "300"
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        invalidMessage: "Resolution is required.",
        options: "MINUTE EIGHT_MINUTE SIXTEEN_MINUTE HOUR FOUR_HOUR DAY WEEK MONTH YEAR".split(" ")
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.term",
        title: "Terms",
        type: "list",
        invalidMessage: "Terms is required.",
        maxLimit: 10
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }, {
        path: "tz",
        title: "Timezone",
        type: "select",
        options: n.TIME_ZONES,
        invalidMessage: "Timezone is required."
    }]).middleware(f.bindKey(this, "middleware_")).toggle(function(a) {
        a && (u.chartData = []);
        u.widget.fields.bullets.config.translation.translate = !0
    }));
    this.numberOfLines = 2;
    this.chartOptions = {
        backgroundColor: {
            fill: "transparent"
        },
        pointsVisible: !1,
        legend: "none",
        vAxis: {
            viewWindow: {
                max: 100,
                min: .01
            },
            baseline: .01
        },
        hAxis: {
            gridlines: {
                color: "transparent"
            },
            baselineColor: "white"
        }
    };
    this.barChartOptions = {
        legend: "none",
        vAxis: {
            textStyle: {
                color: "#BDBDBD",
                fontName: "Roboto, Arial, sans-serif"
            },
            gridlines: {
                color: "white"
            },
            baselineColor: "#9E9E9E",
            viewWindow: {
                max: 100,
                min: .01
            },
            baseline: .01
        },
        hAxis: {
            textStyle: {
                color: "#9E9E9E",
                fontName: "Roboto, Arial, sans-serif"
            },
            gridlines: {
                color: "#E0E0E0"
            },
            baselineColor: "#9E9E9E"
        },
        tooltip: {
            isHtml: !0
        },
        colors: this.colors_.getHexValues()
    };
    if ("fe_featured" == a.template || "fe_explore_example" == a.template)
        this.chartOptions.enableInteractivity = !1,
        this.chartOptions.vAxis.baselineColor = "transparent",
        this.chartOptions.vAxis.gridlines = {
            color: "transparent"
        },
        this.chartOptions.height = 168,
        this.chartOptions.chartArea = {
            width: "100%",
            height: 168
        };
    else if ("now_card" == a.template)
        this.chartOptions.crosshair = {
            color: "#E0E0E0",
            opacity: .3,
            orientation: "vertical",
            trigger: "focus"
        },
        this.chartOptions.focusTarget = "category",
        this.chartOptions.hAxis.minTextSpacing = 80,
        this.chartOptions.hAxis.textStyle = {
            color: "#BDBDBD",
            fontName: "Roboto, Arial, sans-serif",
            fontSize: 10
        },
        this.chartOptions.hAxis.maxAlternation = 1,
        this.chartOptions.hAxis.maxTextLines = 1,
        this.chartOptions.hAxis.slantedText = !1,
        this.chartOptions.vAxis.baselineColor = "#9E9E9E",
        this.chartOptions.vAxis.gridlines = {
            color: "#E0E0E0",
            count: 3
        },
        this.chartOptions.vAxis.textPosition = "none",
        this.chartOptions.height = 103,
        this.chartOptions.width = 312,
        this.chartOptions.enableInteractivity = !1,
        this.chartOptions.annotations = {
            stemColor: "none",
            textStyle: {
                opacity: 0
            }
        },
        this.chartOptions.chartArea = {
            left: 0,
            right: 0,
            width: "100%"
        };
    else if ("tv_broadcast" == a.template)
        this.chartOptions.tooltip = {
            isHtml: !0,
            showTitle: !1,
            trigger: "selection"
        },
        this.chartOptions.enableInteractivity = !0,
        this.chartOptions.pointsVisible = !0,
        this.chartOptions.pointSize = 30,
        this.chartOptions.series = {
            0: {
                type: "linear",
                color: "#4285F4",
                lineWidth: 10
            }
        },
        this.chartOptions.height = 760,
        this.chartOptions.width = 1600,
        this.chartOptions.chartArea = {
            left: 90,
            top: 80,
            width: 1353,
            height: 462
        },
        this.chartOptions.vAxis.gridlines = {
            color: "transparent"
        },
        this.chartOptions.vAxis.baselineColor = "transparent",
        this.chartOptions.vAxis.textStyle = {
            fontSize: 35,
            color: "transparent",
            fontName: "FuturaBold",
            bold: !0
        },
        this.chartOptions.vAxis.viewWindow = {
            max: 101,
            min: -1
        },
        this.chartOptions.hAxis.maxAlternation = 1,
        this.chartOptions.hAxis.slantedText = !1,
        this.chartOptions.hAxis.textStyle = {
            fontSize: 24,
            color: "#434343",
            fontName: "FuturaBold",
            bold: !0
        };
    else {
        this.chartOptions.tooltip = {
            isHtml: !0,
            showTitle: !1
        };
        this.chartOptions.vAxis.gridlines = {
            color: "#E0E0E0"
        };
        this.chartOptions.vAxis.baselineColor = "#9E9E9E";
        this.chartOptions.vAxis.textStyle = {
            fontSize: 12,
            color: "#BDBDBD",
            fontName: "Roboto, Arial, sans-serif"
        };
        this.chartOptions.hAxis.maxAlternation = 1;
        this.chartOptions.hAxis.maxTextLines = 1;
        this.chartOptions.hAxis.slantedText = !1;
        this.chartOptions.hAxis.textStyle = {
            color: "#9E9E9E",
            fontName: "Roboto, Arial, sans-serif"
        };
        this.chartOptions.crosshair = {
            color: "#E0E0E0",
            orientation: "vertical",
            trigger: "focus",
            opacity: .3
        };
        this.chartOptions.focusTarget = "category";
        var x = angular.element(b);
        b = f.bindKey(this, "updateOptions_", a);
        var K = f.throttle(b, 50, {
            trailing: !0
        });
        a.$watch("ctrl.widget.fields.showAverages.value", b, !0);
        a.$watch("ctrl.widget.fields.showLegend.value", b, !0);
        b();
        x.bind("resize", K);
        a.$on("$destroy", function() {
            x.unbind("resize", K)
        })
    }
    this.chartData = [];
    this.barChartData = this.setBarChartDataTable_([70, 40]);
    this.showBarChart = !1;
    this.selectHandlerBind = f.bindKey(this, "selectHandler_");
    this.errorTimeout = !1;
    u = this;
    t(function() {
        u.errorTimeout = !0
    }, 1E3)
};
k("$jscomp.scope.FeLineChartV1Ctrl", Me, void 0);
Me.$inject = "$scope $window $templateCache $interpolate lodash globalsService colorsFactory widgetFactory bidiService helpersFactory $timeout".split(" ");
var Ke = [{
    x: "7:00",
    formattedXAxis: "7:00 AM",
    formattedX: "7:00 AM",
    y1: "0",
    formattedY1: "0"
}, {
    x: "8:00",
    formattedXAxis: "8:00 AM",
    formattedX: "8:00 AM",
    y1: "5",
    formattedY1: "5"
}, {
    x: "9:00",
    formattedXAxis: "9:00 AM",
    formattedX: "9:00 AM",
    y1: "20",
    formattedY1: "20"
}, {
    x: "10:00",
    formattedXAxis: "10:00 AM",
    formattedX: "10:00 AM",
    y1: "100",
    formattedY1: "100"
}, {
    x: "11:00",
    formattedXAxis: "11:00 AM",
    formattedX: "11:00 AM",
    y1: "40",
    formattedY1: "40"
}, {
    x: "12:00",
    formattedXAxis: "12:00 AM",
    formattedX: "12:00 AM",
    y1: "32",
    formattedY1: "32"
}, {
    x: "13:00",
    formattedXAxis: "1:00 PM",
    formattedX: "1:00 PM",
    y1: "30",
    formattedY1: "30"
}, {
    x: "14:00",
    formattedXAxis: "2:00 PM",
    formattedX: "2:00 PM",
    y1: "30",
    formattedY1: "30"
}, {
    x: "15:00",
    formattedXAxis: "3:00 PM",
    formattedX: "3:00 PM",
    y1: "40",
    formattedY1: "40"
}]
  , Le = [{
    x: "10:00",
    formattedXAxis: "10:00",
    formattedX: "10:00",
    y1: "5",
    formattedY1: "5",
    y2: "35",
    formattedY2: "35",
    annotation1: null,
    annotationIcon1: null,
    annotationTitle1: null,
    annotationSubtitle1: null,
    annotation2: "A",
    annotationIcon2: "https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_16dp.png",
    annotationTitle2: "test",
    annotationSubtitle2: "test"
}, {
    x: "11:00",
    formattedXAxis: "11:00",
    formattedX: "11:00",
    y1: "5",
    formattedY1: "5",
    y2: "25",
    formattedY2: "25",
    annotation1: "B",
    annotationIcon1: "https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_16dp.png",
    annotationTitle1: "test",
    annotationSubtitle1: "test",
    annotation2: null,
    annotationIcon2: null,
    annotationTitle2: null,
    annotationSubtitle2: null
}, {
    x: "12:00",
    formattedXAxis: "12:00",
    formattedX: "12:00",
    y1: "20",
    formattedY1: "20",
    y2: "20",
    formattedY2: "20",
    annotation1: null,
    annotationIcon1: null,
    annotationTitle1: null,
    annotationSubtitle1: null,
    annotation2: null,
    annotationIcon2: null,
    annotationTitle2: null,
    annotationSubtitle2: null
}, {
    x: "13:00",
    formattedXAxis: "13:00",
    formattedX: "13:00",
    y1: "100",
    formattedY1: "100",
    y2: "12",
    formattedY2: "12",
    annotation1: "C",
    annotationIcon1: "https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_16dp.png",
    annotationTitle1: "test",
    annotationSubtitle1: "test",
    annotation2: null,
    annotationIcon2: null,
    annotationTitle2: null,
    annotationSubtitle2: null
}, {
    x: "14:00",
    formattedXAxis: "14:00",
    formattedX: "14:00",
    y1: "40",
    formattedY1: "40",
    y2: "14",
    formattedY2: "14",
    annotation1: null,
    annotationIcon1: null,
    annotationTitle1: null,
    annotationSubtitle1: null,
    annotation2: "D",
    annotationIcon2: "https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_16dp.png",
    annotationTitle2: "test",
    annotationSubtitle2: "test"
}, {
    x: "15:00",
    formattedXAxis: "15:00",
    formattedX: "15:00",
    y1: "32",
    formattedY1: "32",
    y2: "10",
    formattedY2: "10",
    annotation1: null,
    annotationIcon1: null,
    annotationTitle1: null,
    annotationSubtitle1: null,
    annotation2: null,
    annotationIcon2: null,
    annotationTitle2: null,
    annotationSubtitle2: null
}, {
    x: "16:00",
    formattedXAxis: "16:00",
    formattedX: "16:00",
    y1: "30",
    formattedY1: "30",
    y2: "20",
    formattedY2: "20",
    annotation1: "E",
    annotationIcon1: "https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_16dp.png",
    annotationTitle1: "test",
    annotationSubtitle1: "test",
    annotation2: null,
    annotationIcon2: null,
    annotationTitle2: null,
    annotationSubtitle2: null
}, {
    x: "17:00",
    formattedXAxis: "17:00",
    formattedX: "17:00",
    y1: "30",
    formattedY1: "30",
    y2: "35",
    formattedY2: "35",
    annotation1: "F",
    annotationIcon1: "https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_16dp.png",
    annotationTitle1: "test",
    annotationSubtitle1: "test",
    annotation2: null,
    annotationIcon2: null,
    annotationTitle2: null,
    annotationSubtitle2: null
}];
Me.TYPE = "fe_line_chart";
Me.DISPLAY_TYPE = "Multi Line";
Me.VERSION = 1;
Me.TEMPLATES = ["fe", "fe_featured", "fe_embed", "now_card", "tv_broadcast"];
Me.FULL_WIDTH_BY_TEMPLATE = {
    "*": !0,
    now_card: !1
};
Me.HIDE_IN_EDITOR = !1;
Me.GROUP_TYPE = {
    FE: ["fe", "fe_featured", "fe_embed"],
    NOW_CARD: ["now_card"],
    TV: ["tv_broadcast"]
};
e = Me.prototype;
e.parseMultiRangeLineData_ = function(a) {
    for (var b = {
        x: a.columnData[0].time,
        formattedX: this.bidiService_.wrapTextUnicodeByPageDirection(a.columnData[0].formattedTime),
        formattedXAxis: null
    }, c = 0; c < a.columnData.length; c++) {
        var d = c + 1;
        b["y" + d] = a.columnData[c].value;
        b["formattedY" + d] = a.columnData[c].formattedValue;
        b["formattedTime" + d] = a.columnData[c].formattedTime
    }
    return b
}
;
e.parseLineData_ = function(a) {
    for (var b = this.bidiService_.wrapTextUnicodeByPageDirection(a.formattedTime), c = this.bidiService_.wrapTextUnicodeByPageDirection(a.formattedAxisTime), b = {
        x: a.time,
        formattedX: b,
        formattedXAxis: c,
        note: a.axisNote
    }, c = 0; c < a.value.length; c++) {
        var d = c + 1;
        b["y" + d] = a.value[c];
        b["formattedY" + d] = a.formattedValue[c]
    }
    return b
}
;
e.middleware_ = function(a) {
    var b = a["default"].timelineData;
    a = a["default"].averages;
    if (0 === b.length)
        this.widget.errorMessage = "fe" !== this.template_;
    else
        return this.barChartData = this.widget.fields.showAverages.value ? this.setBarChartDataTable_(a) : [],
        a = b[0] && b[0].columnData ? this.lodash_.bindKey(this, "parseMultiRangeLineData_") : this.lodash_.bindKey(this, "parseLineData_"),
        b = this.lodash_.map(b, a),
        this.widget.fields.tooltipXValue && this.tooltipXAxisIndexValue && (b.length <= this.tooltipXAxisIndexValue ? this.tooltipXAxisIndexValue = null : this.widget.fields.tooltipXValue.value = b[this.tooltipXAxisIndexValue].formattedXAxis),
        {
            csv: b,
            showAverages: this.widget.fields.showAverages.value
        }
}
;
e.getLineData_ = function(a) {
    var b, c, d = [], f = this, g = null, h = null;
    if ("tv_broadcast" === f.template_) {
        this.scope_.tooltipPosition = this.widget.fields.tooltipPosition.value;
        this.scope_.tooltipAnnotation = this.widget.fields.tooltipAnnotation.value;
        g = this.interpolate_(this.templateCache_.get("/widgets_library/fe_line_chart_v1/views/tv_broadcast_tooltip.html"));
        d.push(["x", "y", {
            type: "string",
            role: "style"
        }, {
            type: "string",
            role: "tooltip",
            p: {
                html: !0
            }
        }]);
        var m = !1
    } else
        h = this.interpolate_(this.templateCache_.get("/widgets_library/fe_line_chart_v1/views/annotation_markup.html")),
        d.push(["x", {
            role: "annotation",
            type: "string"
        }, {
            role: "annotationText",
            type: "string",
            p: {
                html: !0
            }
        }, {
            type: "string",
            role: "tooltip",
            p: {
                html: !0
            }
        }]);
    this.lodash_.forEach(a, function(a, n) {
        if ("tv_broadcast" === f.template_)
            c = [a.formattedXAxis, parseFloat(a.y1), "point { size:0; }", ""],
            a.formattedXAxis == f.widget.fields.tooltipXValue.value && (c[2] = null,
            c[3] = g(this.scope_),
            m = !0);
        else
            for (c = [a.formattedXAxis, a.note ? "Note" : null, a.note ? this.getNoteTipTemplate_(a.note.text) : null, this.getTipTemplate_(n)],
            b = 1; (a["y" + b] || 0 === a["y" + b]) && 6 > b; )
                c.push(parseFloat(a["y" + b])),
                c.push(a["annotation" + b] || null),
                c.push(this.getAnnotationTemplate_(n, b, h)),
                b++;
        d.push(c)
    }, this);
    "tv_broadcast" !== f.template_ || m || (this.tooltipXAxisIndexValue = null);
    this.numberOfLines = b - 1;
    for (b = 1; b <= this.numberOfLines; b++)
        d[0].push("y" + b),
        d[0].push({
            type: "string",
            role: "annotation"
        }),
        d[0].push({
            type: "string",
            role: "annotationText",
            p: {
                html: !0
            }
        });
    this.setLineWidth_();
    this.chartOptions.colors = this.colors_.getHexValues().slice(0, this.numberOfLines);
    return d
}
;
e.onCSVChange_ = function() {
    if (!this.widget.isQuerying && this.scope_.isScrolledInto && this.widget.fields.XAxisLines) {
        this.widget.fields.XAxisLines && (this.chartOptions.hAxis.maxTextLines = this.widget.fields.XAxisLines.value);
        var a = this.widget.fields.csv.getValues();
        this.chartData = this.getLineData_(a);
        this.scope_.$applyAsync()
    }
}
;
e.setLineWidth_ = function() {
    this.chartOptions.lineWidth = "fe_featured" == this.scope_.template || "fe_explore_example" == this.scope_.template ? 3 : "desktop" == this.globalsService_.getResponsiveMode() ? 2 < this.numberOfLines ? 3 : 4 : 2
}
;
e.selectHandler_ = function(a) {
    if (a) {
        var b = this.widget.fields.csv.getValues();
        this.widget.fields.tooltipXValue.value = b[a].formattedXAxis;
        this.scope_.$apply()
    }
}
;
e.onTooltipXChange_ = function() {
    this.tooltipXAxisIndexValue = null;
    var a = this.widget.fields.tooltipXValue.value
      , b = this.widget.fields.csv.getValues();
    this.lodash_.forEach(b, function(b, d) {
        b.formattedXAxis === a && (this.tooltipXAxisIndexValue = d)
    }, this);
    this.onCSVChangeBind_()
}
;
e.getTipTemplate_ = function(a) {
    var b = this.widget.fields
      , c = b.bullets.items;
    a = b.csv.items[a].value;
    b = '<div class="fe-line-chart-tooltip">';
    a.formattedXAxis && (b += '<div class="fe-line-chart-tooltip-title">' + q(a.formattedX) + "</div>");
    for (var d = 1, f; !isNaN(parseFloat(a["y" + d])) && 6 > d; )
        f = a.formattedXAxis ? "" : q(a["formattedTime" + d]),
        d <= c.length && c[d - 1].value.text && (f += (f ? ", " : "") + q(c[d - 1].value.text)),
        b += '<div class="fe-line-chart-tooltip-item-wrapper"><span class="fe-line-chart-tooltip-label fe-atoms-generic-elipssis">' + f + '</span><span class="fe-line-chart-tooltip-value" style="color:' + this.colors_.getHexValues()[d - 1] + '">' + q(a["formattedY" + d]) + "</span></div>",
        d++;
    return b + "</div>"
}
;
e.getNoteTipTemplate_ = function(a) {
    return '<div class="fe-line-chart-tooltip note-tooltip">' + a + "</div>"
}
;
e.getAnnotationTemplate_ = function(a, b, c) {
    a = this.widget.fields.csv.items[a].value;
    this.scope_.annotationIcon = a["annotationIcon" + b];
    this.scope_.annotationTitle = q(a["annotationTitle" + b]);
    this.scope_.annotationSubtitle = q(a["annotationSubtitle" + b]);
    return c(this.scope_)
}
;
e.onChartSelect = function(a, b) {
    1 == b && (a = this.widget.fields.csv.getValue(a),
    a.note && window.open(a.note.url, "_blank"))
}
;
e.updateOptions_ = function() {
    Object.keys(this.widget.fields).length && ("desktop" == this.globalsService_.getResponsiveMode() ? (this.chartOptions.hAxis.minTextSpacing = 250,
    this.chartOptions.hAxis.textStyle.fontSize = 12,
    this.chartOptions.vAxis.textPosition = "out",
    this.chartOptions.height = 220,
    this.chartOptions.chartArea = {
        left: 30,
        right: 6,
        width: "100%",
        height: this.widget.fields.showLegend.value ? 180 : 186
    }) : (this.chartOptions.hAxis.minTextSpacing = 60,
    this.chartOptions.hAxis.textStyle.fontSize = 10,
    this.chartOptions.height = 180,
    this.chartOptions.chartArea = {
        left: 30,
        width: "100%",
        height: 150
    }),
    this.setLineWidth_(),
    this.widget.fields.showAverages.value && 530 <= this.window_.innerWidth ? ("desktop" == this.globalsService_.getResponsiveMode() ? (this.chartOptions.height = 220,
    this.chartOptions.chartArea = {
        left: 32,
        width: "100%",
        height: this.widget.fields.showLegend.value ? 180 : 186,
        right: 8
    },
    this.barChartOptions.width = 112,
    this.barChartOptions.height = 220,
    this.barChartOptions.chartArea = {
        left: 0,
        bottom: 20,
        width: 112,
        height: this.widget.fields.showLegend.value ? 180 : 186
    },
    this.barChartOptions.vAxis.textStyle.fontSize = 12,
    this.barChartOptions.hAxis.textStyle.fontSize = 12) : (this.chartOptions.chartArea = {
        left: 30,
        width: "100%",
        height: 150
    },
    this.barChartOptions.width = 60,
    this.barChartOptions.height = 180,
    this.barChartOptions.chartArea = {
        left: 0,
        bottom: 20,
        width: "100%",
        height: 150
    },
    this.barChartOptions.vAxis.textStyle.fontSize = 10,
    this.barChartOptions.hAxis.textStyle.fontSize = 10),
    this.showBarChart = !0) : this.showBarChart = !1)
}
;
e.setBarChartDataTable_ = function(a) {
    if (this.widget.fields.bullets) {
        var b = this
          , c = {
            type: "string",
            role: "tooltip",
            p: {
                html: !0
            }
        }
          , d = []
          , f = [];
        d.push("x1");
        f.push("Average");
        var g = this.widget.fields.bullets.getValues();
        if (g.length) {
            var h = [];
            this.lodash_.forEach(a, function(b, c) {
                h.push({
                    name: g[c].text,
                    value: a[c]
                })
            });
            this.lodash_.forEach(h, function(a, g) {
                d.push(a.name);
                d.push(c);
                f.push(a.value);
                f.push(b.createBarChartToolTip_(a, g))
            });
            return [d, f]
        }
    }
}
;
e.createBarChartToolTip_ = function(a, b) {
    return '<div class="fe-bar-chart-tooltip"><div class="fe-bar-chart-tooltip-title">Average</div><div class="fe-bar-chart-tooltip-item-wrapper"><span class="fe-bar-chart-tooltip-label">' + a.name + '</span><span class="fe-bar-chart-tooltip-value" style="color:' + this.colors_.getHexValues()[b] + '">' + a.value + "</span></div>"
}
;
J.FeLineChartV1 = Me;
var Ne = angular.module("publishAppFeLineChartV1", ["publishAppFramework", "publishAppWidgetsFeLineChartV1Views"]);
Ne.controller("FeLineChartV1Ctrl", J.FeLineChartV1);
angular.module("publishAppWidgetsFeListV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_list_v1/views/content.html", '<div class="fe-list-content"\n     ng-style="{\'background-color\': forcedColor || ctrl.colors.getHexValue(fields.color.value)}"\n     ng-class="{\'show-expended\': ctrl.showMoreExpanded, \'mobile-elastic\': fields.bullets.getValues().length < 5}">\n  <div class="fe-list-item"\n       ng-repeat="value in fields.bullets.getValues() | limitTo:ctrl.getItemsLimit() track by $index">\n    <span ng-if="ctrl.widget.fields.bulletSelector.value == \'Bullets\'"\n          class="fe-list-question-bullet">\n      &bull;\n    </span>\n    <span ng-if="ctrl.widget.fields.bulletSelector.value == \'Numbers\'"\n          class="fe-list-question-index">\n      {{$index + 1}}\n    </span>\n    <span class="fe-list-item-text">\n      <a href="https://www.google.com/search?q={{ctrl.encode(value)}}" target="_blank">{{value}}</a>\n    </span>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_list_v1/views/fe.html", '<div class="fe-atoms-generic-container fe-list-container"\n     ng-init="fields = ctrl.widget.fields"\n     dir="{{getHeaderDirection()}}">\n  <div class="fe-atoms-generic-header-container"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">\n      {{fields.topic.value}}\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_list_v1/views/content.html\'"></ng-include>\n  <div class="show-more"  ng-click="ctrl.showHideFields()"\n       ng-click="ctrl.showHideFields()" ng-if="fields.bullets.getValues().length > 5"\n       ng-style="{\'background-color\': forcedColor || ctrl.colors.getHexValue(fields.color.value)}">\n    <div class="show-hide-position"\n         ng-class="{\'transparent-arrow-up\': ctrl.showMoreExpanded, \'transparent-arrow-down\': !ctrl.showMoreExpanded}">\n    </div>\n\n    <div class="show-hide-label" ng-show="!ctrl.showMoreExpanded">\n      Show more\n    </div>\n\n    <div class="show-hide-label" ng-show="ctrl.showMoreExpanded">\n      Show less\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_list_v1/views/fe_embed.html", '<div class="fe-list-container embed-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="embed-header">\n    <div class="embed-title">\n      {{fields.topic.value}}. {{widgetIsCurated || isEditor ? \'\' : storyCountry + \'. \' + storyTimeRange}}\n    </div>\n    <div class="embed-subtitle">{{storyTitleArray.length ? storyTitleArrayWrapped : storyTitle}}</div>\n    <div class="embed-logo">\n      <a href="/trends/story/{{storyId}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n  <ng-include class="embed-content" src="\'/widgets_library/fe_list_v1/views/content.html\'"></ng-include>\n  <div class="embed-footer">\n    <div class="embed-title-wrapper">\n      <div class="embed-title">{{storyTitleArray.length ? storyTitleArrayWrapped : storyTitle}}</div>\n    </div>\n    <div class="embed-logo">\n      <a href="/trends/{{ storyId ? \'story/\' + storyId : \'\'}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_list_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields"\n     dir="{{getHeaderDirection()}}">\n  <div class="fe-featured-generic-container-content fe-featured-list-content">\n    <div class="fe-featured-list-item"\n        ng-repeat="value in fields.bullets.getValues() | limitTo: 5">\n      <div class="list-item-number">{{$index+1}}</div>\n      <div class="list-item-text">{{value}}</div>\n    </div>\n  </div>\n  <div class="fe-featured-atoms-generic-container-title">{{fields.topic.value | typography}}</div>\n</div>\n'))
}
]);
var O = function(a, b, c, d, f) {
    this.lodash_ = b;
    this.colors = new d.Colors(a.palette);
    this.globals = f;
    this.template = a.template;
    b = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Top Questions",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/CnRV2e"
        }
    }, {
        name: "bullets",
        type: "list",
        placeholder: "New list item",
        values: ["Jennifer Lawrence", "Renee Zellweger", "Betty White", "Ellen Page", "Kim Novak"],
        translation: {
            translate: !0,
            description: "The list content of text of the widget. http://goo.gl/CnRV2e"
        }
    }, {
        name: "bulletSelector",
        type: "string",
        value: "Numbers",
        options: ["Bullets", "Numbers"]
    }, {
        name: "color",
        type: "string",
        value: "PALETTE_COLOR_1",
        colorPalette: this.colors,
        options: b.map(d.Colors.DEFAULT_PALETTE, function(a) {
            return {
                name: a.caption,
                value: a.name
            }
        })
    }];
    this.widget = new c(b,a.isEditor);
    this.csvField = this.widget.fields.bullets;
    this.showMoreExpanded = !1;
    this.storyNumberOfItems = a.storyNumberOfItems
};
k("$jscomp.scope.FeListV1Ctrl", O, void 0);
O.$inject = ["$scope", "lodash", "widgetFactory", "colorsFactory", "globalsService"];
O.TYPE = "fe_list";
O.VERSION = 1;
O.DISPLAY_TYPE = "Top Questions";
O.FULL_WIDTH = !0;
O.HIDE_IN_EDITOR = !1;
O.GROUP_TYPE = "FE";
O.TEMPLATES = ["fe", "fe_featured", "fe_embed"];
O.prototype.getItemsLimit = function() {
    return this.globals.isMobileMode && "fe_embed" === this.template ? this.storyNumberOfItems ? this.storyNumberOfItems : 5 : this.globals.isMobileMode && "fe" === this.template ? this.showMoreExpanded ? Infinity : 5 : Infinity
}
;
O.prototype.exploreItemByValue = function(a) {
    a && (window.location = "/trends/explore#q=" + encodeURIComponent(a))
}
;
O.prototype.showHideFields = function() {
    this.showMoreExpanded = !this.showMoreExpanded
}
;
O.prototype.encode = function(a) {
    return encodeURIComponent(String(a))
}
;
J.FeListV1 = O;
var Oe = angular.module("publishAppFeListV1", ["publishAppFramework", "publishAppWidgetsFeListV1Views"]);
Oe.controller("FeListV1Ctrl", J.FeListV1);
angular.module("publishAppWidgetsFeListV2Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_list_v2/views/content.html", '<div class="fe-list-content-v2"\n     ng-class="{\'show-expended\': ctrl.showMoreExpanded, \'mobile-elastic\': fields.bullets.getValues().length < 5}">\n  <div class="fe-list-item-v2"\n       ng-repeat="value in fields.bullets.getValues() | limitTo:ctrl.getItemsLimit() track by $index">\n    <div class="fe-list-question-index-v2 number-surrounding-circle"\n         ng-style="{\'background-color\': forcedColor || ctrl.colors.getHexValue(fields.color.value)}">\n      {{$index + 1}}\n    </div>\n    <span class="fe-list-item-text-v2">\n      <a href="https://www.google.com/search?q={{ctrl.encode(value)}}" target="_blank">{{value}}</a>\n    </span>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_list_v2/views/fe.html", '<div class="fe-atoms-generic-container fe-list-container"\n     ng-init="fields = ctrl.widget.fields"\n     dir="{{getHeaderDirection()}}">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">\n      {{fields.topic.value}}\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_list_v2/views/content.html\'"></ng-include>\n  <div class="show-more"  ng-click="ctrl.showHideFields()"\n       ng-click="ctrl.showHideFields()" ng-if="fields.bullets.getValues().length > 5">\n    <div class="show-hide-position"\n         ng-class="{\'arrow-up\': ctrl.showMoreExpanded, \'arrow-down\': !ctrl.showMoreExpanded}">\n    </div>\n\n    <div class="show-hide-label-v2" ng-show="!ctrl.showMoreExpanded">\n      Show more\n    </div>\n\n    <div class="show-hide-label-v2" ng-show="ctrl.showMoreExpanded">\n      Show less\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_list_v2/views/fe_embed.html", '<div class="fe-list-container embed-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="embed-header">\n    <div class="embed-title">\n      {{fields.topic.value}}. {{widgetIsCurated || isEditor ? \'\' : storyCountry + \'. \' + storyTimeRange}}\n    </div>\n    <div class="embed-subtitle">\n      {{storyTitleArray.length ? storyTitleArrayWrapped : storyTitle}}\n    </div>\n    <div class="embed-logo">\n      <a href="/trends/story/{{storyId}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n  <ng-include class="embed-content" src="\'/widgets_library/fe_list_v2/views/content.html\'">\n  </ng-include>\n  <div class="embed-footer">\n    <div class="embed-title-wrapper">\n      <div class="embed-title">\n        {{storyTitleArray.length ? storyTitleArrayWrapped : storyTitle}}\n      </div>\n    </div>\n    <div class="embed-logo">\n      <a href="/trends/{{ storyId ? \'story/\' + storyId : \'\'}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n</div>\n'))
}
]);
var P = function(a, b, c, d, f) {
    this.lodash_ = b;
    this.colors = new d.Colors(a.palette);
    this.globals = f;
    this.template = a.template;
    b = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Top Questions",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/CnRV2e"
        }
    }, {
        name: "bullets",
        type: "list",
        placeholder: "New list item",
        values: ["Jennifer Lawrence", "Renee Zellweger", "Betty White", "Ellen Page", "Kim Novak"],
        translation: {
            translate: !0,
            description: "The list content of text of the widget. http://goo.gl/CnRV2e"
        }
    }, {
        name: "color",
        type: "string",
        value: "PALETTE_COLOR_1",
        colorPalette: this.colors,
        options: b.map(d.Colors.DEFAULT_PALETTE, function(a) {
            return {
                name: a.caption,
                value: a.name
            }
        })
    }];
    this.widget = new c(b,a.isEditor);
    this.csvField = this.widget.fields.bullets;
    this.showMoreExpanded = !1;
    this.storyNumberOfItems = a.storyNumberOfItems
};
k("$jscomp.scope.FeListV2Ctrl", P, void 0);
P.$inject = ["$scope", "lodash", "widgetFactory", "colorsFactory", "globalsService"];
P.TYPE = "fe_list";
P.VERSION = 2;
P.DISPLAY_TYPE = "Top Questions";
P.FULL_WIDTH = !0;
P.HIDE_IN_EDITOR = !1;
P.GROUP_TYPE = {
    FE: ["fe"],
    ELE: ["fe"]
};
P.TEMPLATES = ["fe", "fe_embed"];
P.prototype.getItemsLimit = function() {
    var a = Infinity;
    this.globals.isMobileMode && ("fe_embed" === this.template && this.storyNumberOfItems || ("fe_embed" === this.template ? a = this.storyNumberOfItems ? this.storyNumberOfItems : 5 : "fe" !== this.template || this.showMoreExpanded || (a = 5)));
    return a
}
;
P.prototype.exploreItemByValue = function(a) {
    a && (window.location = "/trends/explore#q=" + encodeURIComponent(a))
}
;
P.prototype.showHideFields = function() {
    this.showMoreExpanded = !this.showMoreExpanded
}
;
P.prototype.encode = function(a) {
    return encodeURIComponent(String(a))
}
;
J.FeListV2 = P;
var Pe = angular.module("publishAppFeListV2", ["publishAppFramework", "publishAppWidgetsFeListV2Views"]);
Pe.controller("FeListV2Ctrl", J.FeListV2);
angular.module("publishAppWidgetsFeExpandableListV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_expandable_list_v1/views/content.html", '<div class="fe-expandable-list-content">\n  <div class="fe-expandable-list-item"\n       ng-click="genericAction(\'openListItemModal\', $index)"\n       ng-repeat="value in fields.bullets.getValues() | limitTo: ctrl.numberOfItemsToDisplay()">\n    <div class="fe-expandable-list-question-index number-surrounding-circle">\n      {{$index + 1}}\n    </div>\n    <list-item-actions class="fe-expandable-list-item-actions"\n                       ng-if="!ctrl.isSmallTouchDevice"\n                       item="value">\n    </list-item-actions>\n    <a ng-if="!ctrl.isSmallTouchDevice"\n       class="fe-expandable-item-text"\n       ng-click="ctrl.yis2016Service.redirectToExplorePage(value)">\n      {{value}}\n    </a>\n    <div ng-if="ctrl.isSmallTouchDevice" class="fe-expandable-item-text">{{value}}</div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_expandable_list_v1/views/content_embed.html", '<div class="fe-expandable-content-v1"\n     ng-class="{\'show-expended\': ctrl.showMoreExpanded, \'mobile-elastic\': fields.bullets.getValues().length < 5}">\n  <div class="fe-expandable-item-v1"\n       ng-repeat="value in fields.bullets.getValues() | limitTo:ctrl.getItemsLimit() track by $index">\n    <div class="fe-expandable-question-index-v1 number-surrounding-circle"\n         ng-style="{\'background-color\': ctrl.colors.getHexValue(fields.color.value) || ctrl.defaultNumbersColor}">\n      {{$index + 1}}\n    </div>\n    <span class="fe-expandable-item-text-v1">\n      <a href="https://www.google.com/search?q={{ctrl.encode(value)}}" target="_blank">{{value}}</a>\n    </span>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_expandable_list_v1/views/fe.html", '<div class="fe-atoms-generic-container fe-expandable-list-container"\n     ng-class="{\'touch-device\': ctrl.isSmallTouchDevice}"\n     ng-init="fields = ctrl.widget.fields"\n     dir="{{getHeaderDirection()}}">\n  <div class="expandable-list-header-text"\n       dir="{{getHeaderDirection()}}" bidi="fields.topic.value">\n  </div>\n  <widget-actions is-action-menu="false">\n  </widget-actions>\n\n  <ng-include src="\'/widgets_library/fe_expandable_list_v1/views/content.html\'"></ng-include>\n\n  <div class="show-more"\n       ng-click="ctrl.showHideFields()"\n       ng-show="ctrl.showExpandButton()">\n    <div class="show-hide-position"\n         ng-class="{\'show-less-icon\': ctrl.showMoreExpanded && ctrl.isSmallTouchDevice,\n                    \'show-more-icon\': !ctrl.showMoreExpanded && ctrl.isSmallTouchDevice,\n                    \'show-less-icon-blue\': ctrl.showMoreExpanded && !ctrl.isSmallTouchDevice,\n                    \'show-more-icon-blue\': !ctrl.showMoreExpanded && !ctrl.isSmallTouchDevice}">\n    </div>\n\n    <div class="show-hide-label" ng-show="!ctrl.showMoreExpanded">\n      Show {{ctrl.getNumberOfHiddenItems()}} more\n    </div>\n\n    <div class="show-hide-label" ng-show="ctrl.showMoreExpanded">\n      Show less\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_expandable_list_v1/views/fe_embed.html", '<div class="fe-expandable-container embed-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="embed-header">\n    <div class="embed-title">\n      {{fields.topic.value}}. {{widgetIsCurated || isEditor ? \'\' : storyCountry + \'. \' + storyTimeRange}}\n    </div>\n    <div class="embed-subtitle">\n      {{storyTitleArray.length ? storyTitleArrayWrapped : storyTitle}}\n    </div>\n    <div class="embed-logo">\n      <a href="/trends/story/{{storyId}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n  <ng-include class="embed-content" src="\'/widgets_library/fe_expandable_list_v1/views/content_embed.html\'">\n  </ng-include>\n  <div class="embed-footer">\n    <div class="embed-title-wrapper">\n      <div class="embed-title">\n        {{storyTitleArray.length ? storyTitleArrayWrapped : storyTitle}}\n      </div>\n    </div>\n    <div class="embed-logo">\n      <a href="/trends/{{ storyId ? \'story/\' + storyId : \'\'}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n</div>\n'))
}
]);
var Qe = function(a, b, c, d, f, g, h) {
    this.lodash_ = b;
    this.colors = new d.Colors(a.palette);
    this.globals = f;
    this.isSmallTouchDevice = f.isSmallTouchDeviceMode;
    this.yis2016Service = h;
    this.template = a.template;
    b = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Expandable List",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/CnRV2e"
        }
    }, {
        name: "bullets",
        type: "list",
        placeholder: "New list item",
        values: ["Jennifer Lawrence", "Renee Zellweger", "Betty White", "Ellen Page", "Kim Novak"],
        translation: {
            translate: !0,
            description: "The list content of text of the widget. http://goo.gl/CnRV2e"
        }
    }, {
        name: "color",
        type: "string",
        value: "PALETTE_COLOR_1",
        colorPalette: this.colors,
        options: b.map(d.Colors.DEFAULT_PALETTE, function(a) {
            return {
                name: a.caption,
                value: a.name
            }
        })
    }];
    this.widget = new c(b,a.isEditor);
    this.csvField = this.widget.fields.bullets;
    this.isWidgetOnHover = this.showMoreExpanded = !1;
    this.storyNumberOfItems = a.storyNumberOfItems;
    this.defaultNumbersColor = d.Colors.DEFAULT_PALETTE[0].hexvalue
};
k("$jscomp.scope.FeExpandableListV1Ctrl", Qe, void 0);
Qe.$inject = "$scope lodash widgetFactory colorsFactory globalsService $location yis2016Service".split(" ");
Qe.TYPE = "fe_expandable_list";
Qe.VERSION = 1;
Qe.DISPLAY_TYPE = "Expandable List";
Qe.FULL_WIDTH = !1;
Qe.HIDE_IN_EDITOR = !1;
Qe.GROUP_TYPE = {
    YIS: ["fe", "fe_embed"]
};
Qe.TEMPLATES = ["fe", "fe_embed"];
e = Qe.prototype;
e.exploreItemByValue = function(a) {
    a && (window.location = "/trends/explore#q=" + encodeURIComponent(a))
}
;
e.showHideFields = function() {
    this.showMoreExpanded = !this.showMoreExpanded
}
;
e.numberOfItemsToDisplay = function() {
    return this.showMoreExpanded ? 10 : this.numberOfItemsToDisplayWhenNotExpanded()
}
;
e.showExpandButton = function() {
    return this.widget.fields.bullets.getValues().length > this.numberOfItemsToDisplayWhenNotExpanded()
}
;
e.getNumberOfHiddenItems = function() {
    return this.widget.fields.bullets.getValues().length - this.numberOfItemsToDisplayWhenNotExpanded()
}
;
e.numberOfItemsToDisplayWhenNotExpanded = function() {
    return this.globals.isMobileMode ? 3 : 5
}
;
e.encode = function(a) {
    return encodeURIComponent(String(a))
}
;
J.FeExpandableListV1 = Qe;
var Re = angular.module("publishAppFeExpandableListV1", ["publishAppFramework", "publishAppWidgetsFeExpandableListV1Views"]);
Re.controller("FeExpandableListV1Ctrl", J.FeExpandableListV1);
angular.module("publishAppWidgetsFeTopNewsV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_top_news_v1/views/country_list.html", '<md-select class="fe-top-news-olympics-country-selector"\n           ng-if="ctrl.athletesAPI.isActive"\n           ng-model="ctrl.selectedCountry"\n           ng-change="ctrl.onSelectedCountryChange()">\n  <md-option value="{{ ::country.id }}" ng-repeat="country in ctrl.countriesList">\n    {{ ::country.name }}\n  </md-option>\n</md-select>\n'),
    a.put("/widgets_library/fe_top_news_v1/views/fe.html", '<div class="fe-top-news fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-top-news-header fe-atoms-generic-header-container fe-atoms-generic-separator"\n       ng-if="ctrl.globalsService.isDesktopMode"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">Most relevant articles</div>\n    <a class="more-articles-link fe-atoms-generic-link fe-atoms-generic-hide-in-mobile"\n       ng-href="{{fields.more_articles_link.value}}" target="_blank"\n       track="[\'Widget\', type, \'More news\']"\n       ng-if="fields.more_articles_link.value">\n      More news articles\n    </a>\n  </div>\n  <div class="fe-atoms-generic-content-container">\n    <carousel tracking-name="Top News">\n      <div class="article-container"\n           ng-init="itemTitle = ctrl.htmlToPlainText(item.value.title);\n                    itemTitleDecoded = ctrl.decodeArticleTitle(itemTitle);"\n           ng-repeat="item in fields.bullets.items track by $index"\n           ng-if="item.value.title">\n        <a class="article article-item"\n             href="{{item.value.link}}" target="_blank">\n          <div class="article-content">\n            <div class="article-title"\n                 title="{{itemTitle}}"\n                 bidi="isEditor ?\n                    ctrl.decodeArticleTitle(ctrl.htmlToPlainText(item.value.title)) :\n                    itemTitleDecoded">\n            </div>\n            <div class="article-source-time fe-atoms-generic-hide-in-mobile">\n              <div class="article-source" bidi="item.value.source">\n                {{item.value.source}}\n              </div><div class="article-time">, {{item.value.time}}</div>\n            </div>\n            <div class="article-source-time fe-atoms-generic-hide-in-desktop">\n              <div bidi="item.value.source">{{item.value.source}}</div>\n              <div>{{item.value.time}}</div>\n            </div>\n          </div>\n\n          <div class="article-media">\n            <div class="image-placeholder-wrapper " ng-if="!item.value.image">\n              <div class="image-placeholder"></div>\n            </div>\n\n            <div bidi="item.value.source"\n                 class="article-image-source" ng-if="item.value.image">\n              {{item.value.source}}\n            </div>\n\n            <img class="article-image"\n                 alt="{{itemTitleDecoded}}"\n                 title="{{itemTitleDecoded}}"\n                 width="96"\n                 height="96"\n                 ng-src="{{item.value.image}}"\n                 ng-if="item.value.image"/>\n          </div>\n        </a>\n      </div><div class="article-container">\n        <a class="more-articles article"\n           ng-href="{{fields.more_articles_link.value}}" target="_blank"\n           track="[\'Widget\', type, \'More news\']"\n           ng-if="!ctrl.globalsService.isDesktopMode && fields.more_articles_link.value">\n          <div class="arrow-forward flip-rtl"></div>\n          <div class="more-articles-link">More news articles</div>\n        </a>\n      </div>\n    </carousel>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_top_news_v1/views/fe_olympics.html", '<div class="fe-top-news-olympics fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-top-news-olympics-header fe-atoms-generic-header-container\n              fe-atoms-generic-separator">\n    <div class="fe-atoms-generic-title fe-top-news-olympics-title">{{fields.topic.value}}</div>\n    <ng-include ng-if="ctrl.globalsService.isDesktopMode"\n                src="\'/widgets_library/fe_top_news_v1/views/country_list.html\'">\n    </ng-include>\n  </div>\n  <div class="fe-atoms-generic-content-container">\n    <carousel tracking-name="fields.topic.value">\n      <div class="article-container"\n           ng-repeat="item in fields.bullets.items track by $index"\n           ng-if="item.value.title">\n        <a class="article article-item" ng-href="{{ctrl.createItemLink(item)}}"\n           track="[\'Widget\', type + \' \' + template, item.value.mid + \' \' + ctrl.selectedCountry]">\n          <div class="article-content">\n            <div class="article-image"\n                 ng-style="item.value.image &&\n                     {\'background-image\': \'url(\\\'{{item.value.image}}\\\')\'}">\n            </div>\n            <div class="article-text">\n              <div class="article-title">{{item.value.title}}</div>\n              <div class="article-subtitle">{{item.value.source}}</div>\n              <div class="article-country">\n                <img class="article-country-image" src="{{item.value.countryImage}}"></img>\n                <div class="article-country-name">{{item.value.countryName}}</div>\n              </div>\n            </div>\n          </div>\n        </a>\n      </div>\n    </carousel>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_top_news_v1/views/fe_olympics_sports.html", '<div class="fe-top-news-olympics fe-top-news-olympics-sports fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-top-news-olympics-header fe-atoms-generic-header-container fe-atoms-generic-separator">\n    <div class="fe-atoms-generic-title fe-top-news-olympics-title">{{fields.topic.value}}</div>\n  </div>\n  <div class="fe-atoms-generic-content-container">\n    <carousel tracking-name="fields.topic.value">\n      <div class="article-container"\n           ng-repeat="item in fields.bullets.items track by $index"\n           ng-if="item.value.title">\n        <a class="article article-item"\n           ng-href="{{ctrl.createItemLink(item)}}"\n           track="[\'Widget\', type + \' \' + template, item.value.mid]">\n          <div class="article-content">\n            <div class="article-image"\n                 ng-style="item.value.image &&\n                     {\'background-image\': \'url(\\\'{{item.value.image}}\\\')\'}">\n            </div>\n            <div class="article-text">\n              <div class="article-title">{{item.value.title}}</div>\n            </div>\n          </div>\n        </a>\n      </div>\n    </carousel>\n  </div>\n</div>\n'))
}
]);
var Te = function(a, b, c, d, f, g) {
    this.lodash_ = b;
    this.globalsService = d;
    this.widget = new c([{
        name: "topic",
        type: "string",
        placeholder: "Widget name",
        value: "News widget",
        translation: {
            translate: !0,
            description: "Title of the widget. https://goo.gl/F4lYA5"
        }
    }, {
        name: "more_articles_link",
        type: "string",
        placeholder: "More articles link",
        value: "http://www.google.com/trends/hottrends",
        templates: ["fe"]
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        keys: "title source time image countryImage countryName mid".split(" "),
        notification: "",
        translation: {
            translate: !0,
            keys: [{
                name: "title",
                description: "Title of the entity (name of athlete or sport). https://goo.gl/F4lYA5"
            }, {
                name: "source",
                description: "Sub title of the entity. https://goo.gl/F4lYA5"
            }, {
                name: "countryName",
                description: "Country name. https://goo.gl/F4lYA5"
            }]
        },
        keysConfig: {
            title: {
                gridSpan: 12
            },
            source: {
                gridSpan: 12
            },
            time: {
                gridSpan: 12
            },
            image: {
                gridSpan: 12
            },
            link: {
                gridSpan: 12
            },
            countryImage: {
                gridSpan: 12
            },
            countryName: {
                gridSpan: 12
            }
        },
        values: Se
    }],a.isEditor);
    "fe_olympics" == a.template ? (this.athletesAPI = this.widget.registerAPI("fe_top_news_athletes", "/trends/api/olympics/trendingathletes", {
        geo: ""
    }, [{
        path: "geo",
        title: "Geo",
        type: "text",
        invalidMessage: "Geo is required."
    }]).middleware(b.bindKey(this, "middlewareAthletes_")).toggle(b.bindKey(this, "toggleAPI_")),
    this.countriesList = g.getSortedList()) : "fe_olympics_sports" == a.template && this.widget.registerAPI("fe_top_news_sports", "/trends/api/olympics/trendingsports").middleware(b.bindKey(this, "middlewareSports_")).toggle(b.bindKey(this, "toggleAPI_"));
    this.trackingService = f;
    this.csvField = this.widget.fields.bullets;
    this.storyId = a.storyId;
    this.storyTitle = a.storyTitle;
    this.selectedCountry = "";
    b = b.bind(this.onBulletsChange_, this);
    a.$watch("ctrl.widget.fields.bullets.items", b, !0);
    this.topNewsData = null
};
k("$jscomp.scope.FeTopNewsV1Ctrl", Te, void 0);
Te.$inject = "$scope lodash widgetFactory globalsService trackingService feTopNewsCountries".split(" ");
Te.TYPE = "fe_top_news";
Te.VERSION = 1;
Te.DISPLAY_TYPE = "News widget";
Te.FULL_WIDTH = !0;
Te.HIDE_IN_EDITOR = !1;
Te.GROUP_TYPE = {
    FE: ["fe"],
    OLY: ["fe_olympics", "fe_olympics_sports"]
};
Te.TEMPLATES = ["fe", "fe_olympics", "fe_olympics_sports"];
var Se = [{
    title: "Nam fringilla turpis <b>non neque</b> egestas, egestas hendrerit mauris venenatis. Nulla porta mi nisl, <i>luctus tincidunt</i> velit egestas at. Etiam aliquet blandit rutrum.",
    source: "Nam fringilla",
    time: "1 hour ago",
    image: "",
    link: "https://www.google.com"
}, {
    title: "Nullam quis pharetra felis. Nunc vel dui malesuada, vehicula ante vel, dapibus mauris. Cras tempus quam eget dolor dapibus accumsan.",
    source: "Nullam quis",
    time: "2 hours ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Google_favicon.png",
    link: "https://www.google.com"
}, {
    title: "Integer venenatis rhoncus erat, nec feugiat ante. Proin nec risus nunc. Phasellus egestas neque commodo leo aliquet, ac imperdiet lectus laoreet.",
    source: "Integer venenatis",
    time: "1 day ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Google_favicon.png",
    link: "https://www.google.com"
}, {
    title: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    source: "Cum sociis",
    time: "3 days ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Google_favicon.png",
    link: "https://www.google.com"
}, {
    title: "Proin sodales orci nec ex iaculis dapibus. Quisque suscipit imperdiet massa, et elementum justo eleifend id. Nam quis tempus arcu. Mauris volutpat est sed lacinia tincidunt.",
    source: "Proin sodales",
    time: "1 week ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Google_favicon.png",
    link: "https://www.google.com"
}];
e = Te.prototype;
e.decodeArticleTitle = function(a) {
    return this.lodash_.unescape(a)
}
;
e.htmlToPlainText = function(a) {
    return a.replace(/<[^>]+>/gm, "")
}
;
e.middlewareAthletes_ = function(a) {
    return {
        bullets: this.lodash_.map(a["default"].athlete, function(a) {
            return {
                title: a.name,
                source: a.sport,
                countryName: a.country,
                countryImage: a.countryFlagImageUrl,
                image: a.image,
                mid: a.mid
            }
        })
    }
}
;
e.middlewareSports_ = function(a) {
    return {
        bullets: this.lodash_.map(a["default"].sport, function(a) {
            return {
                title: a.name,
                image: a.image,
                mid: a.mid
            }
        })
    }
}
;
e.onBulletsChange_ = function() {
    this.topNewsData = this.widget.fields.bullets.getValues()
}
;
e.onSelectedCountryChange = function() {
    var a = this.widget.apis.fe_top_news_athletes;
    a.params.geo = this.selectedCountry;
    a.dispatch()
}
;
e.toggleAPI_ = function(a) {
    this.widget.fields.bullets.config.translation.translate = !a
}
;
e.createItemLink = function(a) {
    var b = "explore?q=" + a.value.mid + "&e=" + this.storyTitle + "&s=" + this.storyId + "&date=now 7-d";
    return encodeURI((this.widget.apis.fe_top_news_sports || this.widget.apis.fe_top_news_athletes).isActive ? b : a.value.link)
}
;
J.FeTopNewsV1 = Te;
var Ue = function(a) {
    this.lodash_ = a
};
k("$jscomp.scope.FeTopNewsCountries", Ue, void 0);
Ue.$inject = ["lodash"];
var Ve = function(a, b) {
    return {
        id: b.replace(/^MSG_COUNTRY_/, ""),
        name: a
    }
};
Ue.prototype.getSortedList = function() {
    var a = Ve("Worldwide", "")
      , b = this.lodash_.chain(We).map(Ve).sortBy("name").value();
    return [a].concat(b)
}
;
var We = {
    MSG_COUNTRY_AF: "Afghanistan",
    MSG_COUNTRY_AL: "Albania",
    MSG_COUNTRY_DZ: "Algeria",
    MSG_COUNTRY_AS: "American Samoa",
    MSG_COUNTRY_AD: "Andorra",
    MSG_COUNTRY_AO: "Angola",
    MSG_COUNTRY_AG: "Antigua and Barbuda",
    MSG_COUNTRY_AR: "Argentina",
    MSG_COUNTRY_AM: "Armenia",
    MSG_COUNTRY_AW: "Aruba",
    MSG_COUNTRY_AU: "Australia",
    MSG_COUNTRY_AT: "Austria",
    MSG_COUNTRY_AZ: "Azerbaijan",
    MSG_COUNTRY_BS: "Bahamas",
    MSG_COUNTRY_BH: "Bahrain",
    MSG_COUNTRY_BD: "Bangladesh",
    MSG_COUNTRY_BB: "Barbados",
    MSG_COUNTRY_BY: "Belarus",
    MSG_COUNTRY_BE: "Belgium",
    MSG_COUNTRY_BZ: "Belize",
    MSG_COUNTRY_BJ: "Benin",
    MSG_COUNTRY_BM: "Bermuda",
    MSG_COUNTRY_BT: "Bhutan",
    MSG_COUNTRY_BO: "Bolivia",
    MSG_COUNTRY_BA: "Bosnia and Herzegovina",
    MSG_COUNTRY_BW: "Botswana",
    MSG_COUNTRY_BR: "Brazil",
    MSG_COUNTRY_VG: "British Virgin Islands",
    MSG_COUNTRY_BN: "Brunei",
    MSG_COUNTRY_BG: "Bulgaria",
    MSG_COUNTRY_BF: "Burkina Faso",
    MSG_COUNTRY_BI: "Burundi",
    MSG_COUNTRY_KH: "Cambodia",
    MSG_COUNTRY_CM: "Cameroon",
    MSG_COUNTRY_CA: "Canada",
    MSG_COUNTRY_CV: "Cape Verde",
    MSG_COUNTRY_KY: "Cayman Islands",
    MSG_COUNTRY_CF: "Central African Republic",
    MSG_COUNTRY_TD: "Chad",
    MSG_COUNTRY_CL: "Chile",
    MSG_COUNTRY_CN: "China",
    MSG_COUNTRY_CO: "Colombia",
    MSG_COUNTRY_KM: "Comoros",
    MSG_COUNTRY_CG: "Congo",
    MSG_COUNTRY_CK: "Cook Islands",
    MSG_COUNTRY_CR: "Costa Rica",
    MSG_COUNTRY_CI: "C\u00f4te d\u2019Ivoire",
    MSG_COUNTRY_HR: "Croatia",
    MSG_COUNTRY_CU: "Cuba",
    MSG_COUNTRY_CY: "Cyprus",
    MSG_COUNTRY_CZ: "Czech Republic",
    MSG_COUNTRY_CD: "Democratic Republic of the Congo",
    MSG_COUNTRY_DK: "Denmark",
    MSG_COUNTRY_DJ: "Djibouti",
    MSG_COUNTRY_DM: "Dominica",
    MSG_COUNTRY_DO: "Dominican Republic",
    MSG_COUNTRY_EC: "Ecuador",
    MSG_COUNTRY_EG: "Egypt",
    MSG_COUNTRY_SV: "El Salvador",
    MSG_COUNTRY_GQ: "Equatorial Guinea",
    MSG_COUNTRY_ER: "Eritrea",
    MSG_COUNTRY_EE: "Estonia",
    MSG_COUNTRY_ET: "Ethiopia",
    MSG_COUNTRY_FM: "Federated States of Micronesia",
    MSG_COUNTRY_FJ: "Fiji",
    MSG_COUNTRY_FI: "Finland",
    MSG_COUNTRY_FR: "France",
    MSG_COUNTRY_GA: "Gabon",
    MSG_COUNTRY_GM: "Gambia",
    MSG_COUNTRY_GE: "Georgia",
    MSG_COUNTRY_DE: "Germany",
    MSG_COUNTRY_GH: "Ghana",
    MSG_COUNTRY_GR: "Greece",
    MSG_COUNTRY_GD: "Grenada",
    MSG_COUNTRY_GU: "Guam",
    MSG_COUNTRY_GT: "Guatemala",
    MSG_COUNTRY_GN: "Guinea",
    MSG_COUNTRY_GW: "Guinea-Bissau",
    MSG_COUNTRY_GY: "Guyana",
    MSG_COUNTRY_HT: "Haiti",
    MSG_COUNTRY_HN: "Honduras",
    MSG_COUNTRY_HK: "Hong Kong",
    MSG_COUNTRY_HU: "Hungary",
    MSG_COUNTRY_IS: "Iceland",
    MSG_COUNTRY_IN: "India",
    MSG_COUNTRY_ID: "Indonesia",
    MSG_COUNTRY_IR: "Iran",
    MSG_COUNTRY_IQ: "Iraq",
    MSG_COUNTRY_IL: "Israel",
    MSG_COUNTRY_IT: "Italy",
    MSG_COUNTRY_JM: "Jamaica",
    MSG_COUNTRY_JP: "Japan",
    MSG_COUNTRY_JO: "Jordan",
    MSG_COUNTRY_KZ: "Kazakhstan",
    MSG_COUNTRY_KE: "Kenya",
    MSG_COUNTRY_KI: "Kiribati",
    MSG_COUNTRY_XK: "Kosovo",
    MSG_COUNTRY_KG: "Kyrgyzstan",
    MSG_COUNTRY_LA: "Laos",
    MSG_COUNTRY_LV: "Latvia",
    MSG_COUNTRY_LB: "Lebanon",
    MSG_COUNTRY_LS: "Lesotho",
    MSG_COUNTRY_LR: "Liberia",
    MSG_COUNTRY_LY: "Libya",
    MSG_COUNTRY_LI: "Liechtenstein",
    MSG_COUNTRY_LT: "Lithuania",
    MSG_COUNTRY_LU: "Luxembourg",
    MSG_COUNTRY_MG: "Madagascar",
    MSG_COUNTRY_MW: "Malawi",
    MSG_COUNTRY_MY: "Malaysia",
    MSG_COUNTRY_MV: "Maldives",
    MSG_COUNTRY_ML: "Mali",
    MSG_COUNTRY_MT: "Malta",
    MSG_COUNTRY_MH: "Marshall Islands",
    MSG_COUNTRY_MR: "Mauritania",
    MSG_COUNTRY_MU: "Mauritius",
    MSG_COUNTRY_MX: "Mexico",
    MSG_COUNTRY_MD: "Moldova",
    MSG_COUNTRY_MC: "Monaco",
    MSG_COUNTRY_MN: "Mongolia",
    MSG_COUNTRY_ME: "Montenegro",
    MSG_COUNTRY_MA: "Morocco",
    MSG_COUNTRY_MZ: "Mozambique",
    MSG_COUNTRY_MM: "Myanmar",
    MSG_COUNTRY_NA: "Namibia",
    MSG_COUNTRY_NR: "Nauru",
    MSG_COUNTRY_NP: "Nepal",
    MSG_COUNTRY_NL: "Netherlands",
    MSG_COUNTRY_NZ: "New Zealand",
    MSG_COUNTRY_NI: "Nicaragua",
    MSG_COUNTRY_NE: "Niger",
    MSG_COUNTRY_NG: "Nigeria",
    MSG_COUNTRY_KP: "North Korea",
    MSG_COUNTRY_NO: "Norway",
    MSG_COUNTRY_OM: "Oman",
    MSG_COUNTRY_PK: "Pakistan",
    MSG_COUNTRY_PW: "Palau",
    MSG_COUNTRY_PA: "Panama",
    MSG_COUNTRY_PG: "Papua New Guinea",
    MSG_COUNTRY_PY: "Paraguay",
    MSG_COUNTRY_PE: "Peru",
    MSG_COUNTRY_PH: "Philippines",
    MSG_COUNTRY_PL: "Poland",
    MSG_COUNTRY_PT: "Portugal",
    MSG_COUNTRY_PR: "Puerto Rico",
    MSG_COUNTRY_QA: "Qatar",
    MSG_COUNTRY_IE: "Republic of Ireland",
    MSG_COUNTRY_MK: "Republic of Macedonia",
    MSG_COUNTRY_RO: "Romania",
    MSG_COUNTRY_RU: "Russia",
    MSG_COUNTRY_RW: "Rwanda",
    MSG_COUNTRY_KN: "Saint Kitts and Nevis",
    MSG_COUNTRY_LC: "Saint Lucia",
    MSG_COUNTRY_VC: "Saint Vincent and the Grenadines",
    MSG_COUNTRY_WS: "Samoa",
    MSG_COUNTRY_SM: "San Marino",
    MSG_COUNTRY_ST: "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
    MSG_COUNTRY_SA: "Saudi Arabia",
    MSG_COUNTRY_SN: "Senegal",
    MSG_COUNTRY_RS: "Serbia",
    MSG_COUNTRY_SC: "Seychelles",
    MSG_COUNTRY_SL: "Sierra Leone",
    MSG_COUNTRY_SG: "Singapore",
    MSG_COUNTRY_SK: "Slovakia",
    MSG_COUNTRY_SI: "Slovenia",
    MSG_COUNTRY_SB: "Solomon Islands",
    MSG_COUNTRY_SO: "Somalia",
    MSG_COUNTRY_ZA: "South Africa",
    MSG_COUNTRY_KR: "South Korea",
    MSG_COUNTRY_SS: "South Sudan",
    MSG_COUNTRY_ES: "Spain",
    MSG_COUNTRY_LK: "Sri Lanka",
    MSG_COUNTRY_PS: "State of Palestine",
    MSG_COUNTRY_SD: "Sudan",
    MSG_COUNTRY_SR: "Suriname",
    MSG_COUNTRY_SZ: "Swaziland",
    MSG_COUNTRY_SE: "Sweden",
    MSG_COUNTRY_CH: "Switzerland",
    MSG_COUNTRY_SY: "Syria",
    MSG_COUNTRY_TW: "Taiwan",
    MSG_COUNTRY_TJ: "Tajikistan",
    MSG_COUNTRY_TZ: "Tanzania",
    MSG_COUNTRY_TH: "Thailand",
    MSG_COUNTRY_TL: "Timor-Leste",
    MSG_COUNTRY_TG: "Togo",
    MSG_COUNTRY_TO: "Tonga",
    MSG_COUNTRY_TT: "Trinidad and Tobago",
    MSG_COUNTRY_TN: "Tunisia",
    MSG_COUNTRY_TR: "Turkey",
    MSG_COUNTRY_TM: "Turkmenistan",
    MSG_COUNTRY_TV: "Tuvalu",
    MSG_COUNTRY_UG: "Uganda",
    MSG_COUNTRY_UA: "Ukraine",
    MSG_COUNTRY_AE: "United Arab Emirates",
    MSG_COUNTRY_GB: "United Kingdom",
    MSG_COUNTRY_US: "United States of America",
    MSG_COUNTRY_VI: "United States Virgin Islands",
    MSG_COUNTRY_UY: "Uruguay",
    MSG_COUNTRY_UZ: "Uzbekistan",
    MSG_COUNTRY_VU: "Vanuatu",
    MSG_COUNTRY_VE: "Venezuela",
    MSG_COUNTRY_VN: "Vietnam",
    MSG_COUNTRY_YE: "Yemen",
    MSG_COUNTRY_ZM: "Zambia",
    MSG_COUNTRY_ZW: "Zimbabwe"
};
var Xe = angular.module("publishAppFeTopNewsV1", ["publishAppFramework", "publishAppWidgetsFeTopNewsV1Views"]);
Xe.controller("FeTopNewsV1Ctrl", J.FeTopNewsV1);
Xe.service("feTopNewsCountries", Ue);
angular.module("publishAppWidgetsFeUsStatesV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_us_states_v1/views/content.html", '<div class="fe-us-states-content"\n     ng-class="{\'has-error\': !fields.data.items.length, \'single-term\': ctrl.singleTermMode}"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="widget-error" ng-if="!fields.data.items.length">\n    <p class="widget-error-title">Hmm, your search doesn\'t have enough data to show here.</p>\n    <p class="widget-error-desc">Please make sure everything is spelled correctly, or try a more general term.</p>\n  </div>\n  <div class="fe-us-states-chart-content">\n    <div class="fe-us-states-chart-wrapper">\n      <widget class="fe-us-states-svg-map-widget"\n              ng-if="ctrl.showHexChart && ctrl.svgMapFields.length"\n              type="svg_map"\n              version="1"\n              template="hex_states"\n              fields="ctrl.svgMapFields"\n              on-event="ctrl.onMapClickEvent(event);"\n              is-editor="isEditor"\n              palette="palatte"\n              forced-color="{{::forcedColor}}"\n              is-scrolled-into="true">\n      </widget>\n      <widget class="fe-us-states-geo-chart-widget"\n              ng-if="!ctrl.showHexChart && !ctrl.singleTermMode && ctrl.geoChartFields.length"\n              type="fe_geo_color_chart"\n              version="2"\n              template="us_states"\n              fields="ctrl.geoColorChartFields"\n              on-event="ctrl.onMapClickEvent(event);"\n              is-editor="isEditor"\n              palette="palatte"\n              forced-color="{{::forcedColor}}"\n              is-scrolled-into="true">\n      </widget>\n      <widget class="fe-us-states-geo-chart-widget"\n              ng-if="!ctrl.showHexChart && ctrl.singleTermMode && ctrl.geoChartFields.length"\n              type="fe_geo_chart"\n              version="1"\n              template="us_states"\n              fields="ctrl.geoChartFields"\n              on-event="ctrl.onMapClickEvent(event);"\n              is-editor="isEditor"\n              palette="palatte"\n              forced-color="{{::forcedColor}}"\n              is-scrolled-into="true">\n      </widget>\n    </div>\n  </div>\n  <span class="fe-us-states-chart-msg"\n        ng-class="{\'single-term\': ctrl.singleTermMode}">\n    CLICK ON THE MAP TO SEE STATE LEVEL COMPARISON\n  </span>\n  <div class="fe-us-states-legend-wrapper">\n    <div class="fe-us-states-legend"\n         ng-if="!ctrl.singleTermMode && this.widget.fields.showLegend.value">\n      <div class="fe-us-states-legend-items-wrapper">\n        <div ng-repeat="bullet in fields.bullets.getValues() | limitTo: 5"\n             ng-if="bullet.value && bullet.color"\n             class="fe-us-states-legend-item">\n          <div class="fe-us-states-legend-item-bullet"\n               ng-style="{\'background-color\': ctrl.colors.getHexValue(bullet.color)}">\n          </div>\n          <div class="fe-us-states-legend-item-text"\n               bidi="bullet.value">\n            {{bullet.value}}\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="fe-us-states-legend"\n         ng-if="ctrl.singleTermMode && this.widget.fields.showLegend.value">\n      <div class="fe-us-states-legend-items-wrapper">\n        <div class="fe-us-states-legend-bar-wrapper">\n          <div class="fe-us-states-legend-bar-title">Search interest</div>\n          <div class="fe-us-states-legend-bar-values">Lowest</div>\n          <div class="fe-us-states-legend-bar-values high-value">Highest</div>\n          <div class="fe-us-states-legend-bar"\n               ng-style="{\'background\': \'linear-gradient(to right, \' + ctrl.getColorRange().low + \', \' + ctrl.getColorRange().high + \')\'}">\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="fe-us-states-chart-switch-wrapper"\n         ng-click="ctrl.showHexChart = !ctrl.showHexChart">\n      <div class="fe-us-states-chart-switch-icon"\n           ng-class="{\'hex-button\': !ctrl.showHexChart, \'geo-button\': ctrl.showHexChart}"></div>\n      <span ng-if="!ctrl.showHexChart && $root.globals.isDesktopMode">\n        SWITCH TO HEX MAP\n      </span>\n      <span ng-if="ctrl.showHexChart && $root.globals.isDesktopMode">\n        SWITCH TO GEO MAP\n      </span>\n      <span ng-if="!ctrl.showHexChart && $root.globals.isMobileMode">\n        HEX MAP\n      </span>\n      <span ng-if="ctrl.showHexChart && $root.globals.isMobileMode">\n        GEO MAP\n      </span>\n    </div>\n    <div class="fe-us-states-dialog-msg"\n         ng-click="ctrl.showStateDialog()">\n      CLICK TO SEE STATE DATA\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_us_states_v1/views/fe.html", '<div class="fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">{{fields.topic.value}}\n      <help-dialog ng-show="$root.globals.isDesktopMode && helpDialog"\n                   data="helpDialog"></help-dialog>\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include src="\'/widgets_library/fe_us_states_v1/views/content.html\'">\n  </ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_us_states_v1/views/fe_embed.html", '<div class="embed-container" ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content"\n              src="\'/widgets_library/fe_us_states_v1/views/content.html\'"></ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/fe_us_states_v1/views/state_dialog.html", '<md-dialog class="fe-us-states-region-dialog">\n  <md-toolbar layout="row" layout-align="start center"\n              class="fe-us-states-region-dialog-toolbar">\n    <a class="fe-us-states-region-dialog-button-wrapper"\n       ng-click="ctrl.cancelDialog()">\n      <div class="fe-us-states-region-dialog-button arrow-backward flip-rtl">\n      </div>\n    </a>\n    <div class="fe-us-states-region-dialog-title">\n      Explore state level\n    </div>\n  </md-toolbar>\n  <md-content class="fe-us-states-region-dialog-content">\n    <md-list>\n      <md-item ng-repeat="geo in ctrl.csvField.getValues() | orderBy:\'geoName\'"\n               ng-click="ctrl.onMapClickEvent({region: geo.geoCode, dialog: true})"\n               class="fe-us-states-region-dialog-item">\n        <div class="fe-us-states-region-dialog-item-text">\n          {{ geo.geoName }}\n        </div>\n      </md-item>\n    </md-list>\n  </md-content>\n</md-dialog>\n'))
}
]);
angular.module("publishAppWidgetsSvgMapV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/svg_map_v1/views/content.html", '<div class="region-legend-container">\n  <ul class="region-legend">\n    <li ng-repeat="legendItem in fields.legend.items"\n        ng-if="legendItem.value.caption">\n    <span ng-style="{\'background-color\':\n        ctrl.colors.getHexValue(legendItem.value.color)}"></span>\n\n      {{ legendItem.value.caption }}\n    </li>\n  </ul>\n  <div class="multi-heatmap-legend-text"\n       ng-if="ctrl.isMultiHeatMap">\n    Darker colors represent higher search interest\n  </div>\n</div>\n<svg-map map-name="{{ fields.mapName.value }}"\n         colors="ctrl.colors"\n         legend="fields.legend.items"\n         data="fields.data.items"\n         default-color="PALETTE_COLOR_6"\n         enable-tooltip="ctrl.isFeOrEmbedTemplate"\n         center-tooltip="ctrl.isFeTemplate"\n         is-editor="isEditor"\n         is-multi-heat-map="ctrl.isMultiHeatMap">\n</svg-map>\n'),
    a.put("/widgets_library/svg_map_v1/views/fe.html", '<div class="fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator">\n    <p class="fe-atoms-generic-title">{{fields.topic.value}}</p>\n    <widget-actions ng-if="ctrl.isFeTemplate"></widget-actions>\n  </div>\n\n  <ng-include\n       class="region-chart-fe region-chart-wrapper"\n       ng-class="{\'multi-heatmap-region-chart-fe\': ctrl.isMultiHeatMap}"\n       src="\'/widgets_library/svg_map_v1/views/content.html\'">\n  </ng-include>\n</div>\n'),
    a.put("/widgets_library/svg_map_v1/views/fe_embed.html", '<div class="embed-container" ng-init="fields = ctrl.widget.fields">\n  <ng-include src="\'/framework/views/embed-header.html\'"></ng-include>\n  <ng-include class="embed-content region-chart-fe region-chart-wrapper"\n              src="\'/widgets_library/svg_map_v1/views/content.html\'">\n  </ng-include>\n  <ng-include src="\'/framework/views/embed-footer.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/svg_map_v1/views/fe_featured.html", '<div class="fe-featured-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <ng-include\n       class="region-chart-fe region-chart-wrapper"\n       src="\'/widgets_library/svg_map_v1/views/content.html\'">\n  </ng-include>\n  <div class="fe-featured-atoms-generic-container-title fe-featured-container-title">\n    {{fields.topic.value | typography}}\n  </div>\n</div>\n'),
    a.put("/widgets_library/svg_map_v1/views/hex_states.html", '<svg-map ng-init="fields = ctrl.widget.fields"\n         map-name="{{ $root.globals.isMobileMode ? \'hex_states_small\' : \'hex_states\' }}"\n         colors="ctrl.colors"\n         legend="fields.legend.items"\n         data="fields.data.items"\n         default-color="PALETTE_COLOR_6"\n         enable-tooltip="true"\n         center-tooltip="true"\n         on-region-click="triggerEvent(\'regionClick\', {\'region\': region})"\n         is-editor="isEditor">\n</svg-map>\n'),
    a.put("/widgets_library/svg_map_v1/views/region_tooltip.html", '<div>{{ tooltipConfig.data.name }}</div>\n\n<div class="region-tooltip-items">\n  <div class="region-tooltip-item"\n      ng-repeat="value in tooltipConfig.data.values track by $index"\n      ng-if="value >= 0">\n    <div class="region-tooltip-label">{{ legend[$index].value.caption }}</div>\n    <span class="region-tooltip-value"\n          ng-style="{\'color\': colors.getHexValue(legend[$index].value.color)}">\n      {{ value }}\n    </span>\n  </div>\n</div>\n'),
    a.put("/widgets_library/svg_map_v1/views/svg_map_directive.html", "<div class=\"region-svg-container\"></div>\n\n<ng-include\n    src=\"'/widgets_library/svg_map_v1/views/region_tooltip.html'\"\n    class=\"region-tooltip region-tooltip-{{ tooltipConfig.position }}\"\n    ng-show=\"tooltipConfig\"\n    ng-style=\"{'top': tooltipConfig.top + 'px', 'left': tooltipConfig.left + 'px'}\">\n</ng-include>\n"),
    a.put("/widgets_library/svg_map_v1/views/tv_broadcast.html", '<tv-broadcast ng-init="fields = ctrl.widget.fields"\n              main-title="{{fields.topic.value}}"\n              sub-title="{{fields.subTopic.value}}">\n  <ng-include\n       class="region-chart-tv region-chart-wrapper"\n       src="\'/widgets_library/svg_map_v1/views/content.html\'">\n  </ng-include>\n</tv-broadcast>\n'))
}
]);
var Q = function(a, b, c, d, f) {
    var g = "tv_broadcast" == a.template ? d.Colors.TV_PALETTE : d.Colors.DEFAULT_PALETTE;
    this.lodash_ = b;
    this.colors = new d.Colors(g);
    d = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Top Searched"
    }, {
        name: "subTopic",
        type: "string",
        placeholder: "Subtitle",
        value: "Candidates by county",
        templates: ["tv_broadcast"]
    }, {
        name: "mapName",
        type: "string",
        placeholder: "Map",
        value: "california",
        options: b.map(Ye, function(a) {
            return {
                name: a.replace(/_/g, " "),
                value: a
            }
        })
    }, {
        name: "mapType",
        type: "string",
        value: "Regular Map",
        options: ["Regular Map", "Multi Heatmap"]
    }, {
        name: "legend",
        type: "list",
        subtype: "map",
        keys: ["caption", "color"],
        values: b.times(5, function(a) {
            return {
                caption: "Item " + (a + 1),
                color: g[a].name
            }
        }),
        maxLimit: 5,
        colorPalette: this.colors,
        keysConfig: {
            caption: {
                gridSpan: 12
            },
            color: {
                gridSpan: 12,
                options: b.map(g, function(a) {
                    return {
                        name: a.caption,
                        value: a.name
                    }
                })
            }
        }
    }, {
        name: "data",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["code", "maxValueIndex", "name", "values"],
        csvKeys: ["code", "maxValueIndex", "name"].concat(b.map(b.range(1, 6), function(a) {
            return "value" + a
        })),
        csvGetter: b.bindKey(this, "csvGetter_"),
        csvSetter: b.bindKey(this, "csvSetter_"),
        values: Ze
    }];
    this.widget = new f(d,a.isEditor);
    this.widget.registerAPI("svg_map", "/trends/api/widgetdata/comparedgeo/" + c.testStoryID, $e, [{
        path: "req.geo.region",
        title: "Region",
        type: "text",
        matchValidation: /^US-([A-Z]{2})$/,
        invalidMessage: 'Region must contain the prefix "US-" and exactly 2 uppercase english letters.'
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        options: ["DMA", "COUNTY", "CITY", "COUNTRY", "REGION"],
        invalidMessage: "Resolution is required."
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem.0.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "list",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            return b.map(a, function(a) {
                return a.phrase
            })
        },
        setValue: function(a, c) {
            return b.map(a, function(a) {
                return {
                    phrase: a,
                    time: c.req.comparisonItem[0].time
                }
            })
        }
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).middleware(b.bindKey(this, "middleware_"));
    this.csvField = this.widget.fields.data;
    this.isMultiHeatMap = !1;
    this.isFeTemplate = "fe" === a.template;
    this.isFeOrEmbedTemplate = "fe" === a.template || "fe_embed" === a.template;
    a.$watch("ctrl.widget.fields.mapType.value", b.bindKey(this, "setMultiHeatMap_"))
};
k("$jscomp.scope.SvgMapV1Ctrl", Q, void 0);
Q.$inject = ["$scope", "lodash", "globalsService", "colorsFactory", "widgetFactory"];
var $e = {
    req: {
        requestOptions: {
            backend: "IZG"
        },
        geo: {
            region: "US-CA"
        },
        resolution: "COUNTY",
        comparisonItem: [{
            time: "2004-01-01 2016-08-18",
            phrase: "clinton"
        }, {
            time: "2004-01-01 2016-08-18",
            phrase: "trump"
        }],
        locale: "en-GB"
    }
};
Q.TYPE = "svg_map";
Q.DISPLAY_TYPE = "SVG Map";
Q.VERSION = 1;
Q.TEMPLATES = ["fe", "fe_embed", "fe_featured", "hex_states", "tv_broadcast"];
Q.FULL_WIDTH = !0;
Q.GROUP_TYPE = {
    ELE: ["hex_states"],
    FE: ["fe", "fe_embed", "fe_featured"],
    TV: ["tv_broadcast"]
};
var Ye = "alabama alaska arizona arkansas california colorado connecticut delaware district_of_columbia florida georgia hawaii hex_states hex_states_small idaho illinois indiana iowa kansas kentucky louisiana maine maryland massachusetts michigan minnesota mississippi missouri montana nebraska nevada new_hampshire new_jersey new_mexico new_york north_carolina north_dakota ohio oklahoma oregon pennsylvania rhode_island south_carolina south_dakota tennessee texas utah vermont virginia washington west_virginia wisconsin wyoming".split(" ")
  , Ze = [{
    code: "US-OR",
    name: "Orlando",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: "US-RI",
    name: "Rhode Island",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: "US-HI",
    name: "Hawaii",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: "US-TX",
    name: "Texas",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 6019,
    name: "Fresno",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 6025,
    name: "Imperial",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 6061,
    name: "Placer",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 6107,
    name: "Tulare",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 8125,
    name: "Yuma",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 8073,
    name: "Lincoln",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 8027,
    name: "Custer",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 8049,
    name: "Grand",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 12053,
    name: "Hernando",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 12029,
    name: "Dixie",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 12073,
    name: "Leon",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 12013,
    name: "Calhoun",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 19167,
    name: "Sioux",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 19029,
    name: "Cass",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 19175,
    name: "Union",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 19013,
    name: "Black Hawk",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 32510,
    name: "Carson City",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 32001,
    name: "Churchill",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 32031,
    name: "Washoe",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 32033,
    name: "White Pine",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 33015,
    name: "Rockingham",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 33013,
    name: "Merrimack",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 33011,
    name: "Hillsborough",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 33009,
    name: "Grafton",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 36005,
    name: "Bronx",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 36023,
    name: "Cortland",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 36043,
    name: "Herkimer",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 36097,
    name: "Schuyler",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 39017,
    name: "Butler",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 39095,
    name: "Lucas",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 39171,
    name: "Williams",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 39141,
    name: "Ross",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 42127,
    name: "Wayne",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 42099,
    name: "Perry",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 42107,
    name: "Schuylkill",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 42011,
    name: "Berks",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 45003,
    name: "Aiken",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 45051,
    name: "Horry",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 45075,
    name: "Orangeburg",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 45077,
    name: "Pickens",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 51191,
    name: "Washington",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 51071,
    name: "Giles",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 51143,
    name: "Pittsylvania",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 51079,
    name: "Greene",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 55083,
    name: "Oconto",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 55037,
    name: "Florence",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 55031,
    name: "Douglas",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 55067,
    name: "Langlade",
    values: [100, 10, 0],
    maxValueIndex: 0
}, {
    code: 56019,
    name: "Johnson",
    values: [50, 20, 40],
    maxValueIndex: 0
}, {
    code: 56023,
    name: "Lincoln",
    values: [10, 0, 90],
    maxValueIndex: 2
}, {
    code: 56035,
    name: "Sublette",
    values: [5, 40, 30],
    maxValueIndex: 1
}, {
    code: 56017,
    name: "Hot Springs",
    values: [100, 10, 0],
    maxValueIndex: 0
}];
Q.prototype.middleware_ = function(a) {
    return {
        data: this.lodash_.map(a["default"].geoMapData, function(a) {
            return {
                code: a.geoCode.replace(/(?:US-)?(?:0*)(\d+)/, "$1"),
                maxValueIndex: a.maxValueIndex,
                name: a.geoName,
                values: a.value
            }
        })
    }
}
;
Q.prototype.csvGetter_ = function(a) {
    return a = this.lodash_.map(a, function(a) {
        for (var b = parseInt(a.code), b = {
            code: this.lodash_.isNaN(b) ? null : b,
            maxValueIndex: a.maxValueIndex,
            name: a.name,
            values: []
        }, d = 0; 5 > d; d++) {
            var f = a["value" + (d + 1)];
            this.lodash_.isUndefined(f) || (b.values[d] = parseInt(f))
        }
        return b
    }, this)
}
;
Q.prototype.csvSetter_ = function(a) {
    a.values = this.lodash_.map(a.values, function(a) {
        var b = this.lodash_.pick(a, "code", "maxValueIndex", "name");
        this.lodash_.forEach(a.values, function(a, c) {
            b["value" + (c + 1)] = a
        });
        return b
    }, this);
    return a
}
;
Q.prototype.setMultiHeatMap_ = function() {
    var a = this.widget.fields;
    this.isMultiHeatMap = "Multi Heatmap" === a.mapType.value && 1 < a.data.items[0].value.values.length
}
;
J.SvgMapV1 = Q;
var R, af, bf, cf, df, ef, ff, gf, hf = function() {
    this.restrict = "E";
    this.templateUrl = "/widgets_library/svg_map_v1/views/svg_map_directive.html";
    this.scope = {
        mapName: "@",
        colors: "=",
        legend: "=",
        data: "=",
        defaultColor: "@",
        enableTooltip: "=?",
        centerTooltip: "=?",
        isEditor: "=",
        onRegionClick: "&?",
        isMultiHeatMap: "=?"
    };
    this.isNarrator_ = /\/trends\//.test(window.location.pathname);
    this.link = R.bind(this.link, this)
};
e = hf.prototype;
e.applyTooltip_ = function(a, b) {
    a.tooltipConfig = b;
    a.$applyAsync()
}
;
e.bindTooltipEvents_ = function(a) {
    var b = af.isTouchDevice()
      , c = R.bindKey(this, "applyTooltip_", a)
      , d = R.debounce(R.bindKey(this, "onTooltipEvent_", a), 10)
      , f = R.bindKey(this, "onClickEvent_", a)
      , g = b ? this.getDocumentElement_() : a.containerElement
      , h = b ? ["click"] : ["mouseover", "mousemove", "mouseout"];
    a.tooltipConfig = null;
    a.applyTooltip = R.throttle(c, 10, {
        leading: !1
    });
    R.forEach(h, function(a) {
        g.bind(a, d)
    });
    g.bind("click", f);
    a.$on("$destroy", function() {
        R.forEach(h, function(a) {
            g.unbind(a, d)
        });
        g.unbind("click", f)
    })
}
;
e.fillColors_ = function(a) {
    if (a.svgContent) {
        var b = {}
          , c = a.colors.getHexValue(a.defaultColor);
        a.isMultiHeatMap ? this.fillMultiHeatMap_(a, b) : 1 < a.data[0].value.values.length ? this.fillColorMap_(a, b) : this.fillHeatMap_(a, b);
        a.svgContainerElement.innerHTML = a.svgContent.replace(/id="(\d+|US-[a-z]{2})"/gi, function(a, f) {
            a = b[f];
            return R.isUndefined(a) ? 'class="region-data-less" fill="' + c + '"' : 'class="region-' + a.index + '" fill="' + a.color + '"'
        })
    }
}
;
e.fillColorMap_ = function(a, b) {
    b = R.bindKey(this, "setDataByHighest_", a, b);
    R.forEach(a.data, b)
}
;
e.fillHeatMap_ = function(a, b) {
    var c = this.getColorRange_(a.colors.getHexValue(a.legend[0].value.color));
    b = R.bindKey(this, "setDataByValue_", b, c.startColorObj, c.endColorObj);
    R.forEach(a.data, b)
}
;
e.setDataByHighest_ = function(a, b, c, d) {
    b[c.value.code] = {
        color: a.colors.getHexValue(a.legend[c.value.maxValueIndex].value.color),
        index: d
    }
}
;
e.setDataByValue_ = function(a, b, c, d, f) {
    a[d.value.code] = {
        color: this.rgbRatio_(b, c, d.value.values[0] / 100),
        index: f
    }
}
;
e.fillMultiHeatMap_ = function(a, b) {
    this.fillColorMap_(a, b);
    b = R.bindKey(this, "setDataByValueAndHighest_", b);
    R.forEach(a.data, b)
}
;
e.setDataByValueAndHighest_ = function(a, b, c) {
    var d = this.getColorRange_(a[b.value.code].color);
    a[b.value.code] = {
        color: this.rgbRatio_(d.startColorObj, d.endColorObj, b.value.values[b.value.maxValueIndex] / 100),
        index: c
    }
}
;
e.getColorRange_ = function(a) {
    a = bf.Colors.COLOR_RANGES[a];
    return {
        startColorObj: this.buildRGBColor_(a[0]),
        endColorObj: this.buildRGBColor_(a[1])
    }
}
;
e.buildRGBColor_ = function(a) {
    a = a.replace("#", "");
    a = parseInt(a, 16);
    return {
        r: a >> 16 & 255,
        g: a >> 8 & 255,
        b: a & 255
    }
}
;
e.rgbRatio_ = function(a, b, c) {
    c = 1 - c;
    return "rgb(" + Math.round(b.r - (b.r - a.r) * c) + ", " + Math.round(b.g - (b.g - a.g) * c) + ", " + Math.round(b.b - (b.b - a.b) * c) + ")"
}
;
e.getConfigService_ = function() {
    return cf.get("configService")
}
;
e.getDocumentElement_ = function() {
    return angular.element(df)
}
;
e.getStaticMapPath_ = function(a) {
    a += ".svg";
    return this.isNarrator_ ? this.getConfigService_().countiesStaticPathPrefix + "/" + a : "/static/widgets_library/svg_map_v1/images/" + a
}
;
e.getTooltipPosition_ = function(a, b) {
    var c = ef.createRectFromDOM(a.containerElement[0]), d = a.centerTooltip ? ef.createRectFromDOM(b.target).getCenterPoint() : ef.createPoint(b.clientX, b.clientY), f;
    R.forEach(c.divide(), function(a, b) {
        if (a.isPointInside(d))
            return f = b,
            !1
    });
    return ["top-left", "top-right", "bottom-left", "bottom-right"][3 - f]
}
;
e.link = function(a, b) {
    a.containerElement = b;
    a.svgContainerElement = b[0].querySelector(".region-svg-container");
    a.$watch("mapName", R.bindKey(this, "loadSvg_", a));
    a.enableTooltip && this.bindTooltipEvents_(a);
    a.isEditor && (b = R.bindKey(this, "fillColors_", a),
    a.$watch("data", b, !0),
    a.$watch("legend", b, !0),
    a.$watch("isMultiHeatMap", b))
}
;
e.loadSvg_ = function(a) {
    var b = this;
    ff.get(this.getStaticMapPath_(a.mapName)).success(function(c) {
        a.svgContent = c;
        b.fillColors_(a)
    })
}
;
e.getRegionIndex_ = function(a, b) {
    var c = angular.element(b.target).attr("class")
      , d = /^region-([\d]+)$/;
    return d.test(c) && a.containerElement[0].contains(b.target) ? c.match(d)[1] : -1
}
;
e.onTooltipEvent_ = function(a, b) {
    var c = this.getRegionIndex_(a, b);
    if (-1 === c || "mouseout" === b.type)
        a.tooltipConfig && a.applyTooltip(null);
    else {
        b.target.parentElement.appendChild(b.target);
        var d = a.containerElement[0].getBoundingClientRect()
          , f = this.getTooltipPosition_(a, b);
        a.applyTooltip({
            data: a.data[c].value,
            position: f,
            top: b.clientY - d.top - ("click" == b.type ? gf.scrollY : 0),
            left: b.clientX - d.left - ("click" == b.type ? gf.scrollX : 0)
        })
    }
}
;
e.onClickEvent_ = function(a, b) {
    if (a.onRegionClick && (b = this.getRegionIndex_(a, b),
    -1 != b))
        a.onRegionClick({
            region: a.data[b].value.code
        })
}
;
var jf = function(a, b, c, d, f, g, h, m, l) {
    df = document;
    gf = window;
    ff = c;
    cf = d;
    R = f;
    af = g;
    ef = m;
    bf = l;
    return new hf
};
k("$jscomp.scope.directiveInjector$jscomp$20", jf, void 0);
jf.$inject = "$document $window $http $injector lodash globalsService helpersFactory geometryFactory colorsFactory".split(" ");
var kf = angular.module("publishAppSvgMapV1", ["publishAppFramework", "publishAppWidgetsSvgMapV1Views"]);
kf.controller("SvgMapV1Ctrl", J.SvgMapV1);
kf.directive("svgMap", jf);
var nf = function(a, b, c, d, f, g) {
    this.scope_ = a;
    this.lodash_ = c;
    this.colors = new f.Colors(a.palette || f.Colors.DEFAULT_PALETTE);
    this.colorsFactory_ = f;
    this.globals = g;
    this.showHexChart = !0;
    this.geoColorChartFields = [];
    this.svgMapFields = [];
    f = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Obama vs Bush",
        translation: {
            translate: !0,
            description: "Title of the widget."
        }
    }, {
        name: "data",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["geoCode", "geoName", "maxValueIndex", "value", "formattedValue"],
        csvKeys: ["geoCode", "geoName", "maxValueIndex"].concat(c.flatten(c.times(5, function(a) {
            return ["value" + (a + 1), "formattedValue" + (a + 1)]
        }))),
        csvGetter: c.bindKey(this, "csvGetter_"),
        csvSetter: c.bindKey(this, "csvSetter_"),
        values: lf,
        translation: {
            translate: !0,
            keys: [{
                name: "geoName",
                description: "The tooltip text that holds the geo name."
            }, {
                name: "value",
                description: "The tooltip text that holds the value."
            }]
        }
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        keys: ["value", "color"],
        maxLimit: 5,
        colorPalette: this.colors,
        keysConfig: {
            value: {
                gridSpan: 12
            },
            color: {
                gridSpan: 12,
                options: c.map(this.colors.palette_, function(a) {
                    return {
                        name: a.caption,
                        value: a.name
                    }
                })
            }
        },
        values: [{
            value: "OBAMA",
            color: "PALETTE_COLOR_1"
        }, {
            value: "BUSH",
            color: "PALETTE_COLOR_2"
        }, {
            value: "",
            color: "PALETTE_COLOR_3"
        }, {
            value: "",
            color: "PALETTE_COLOR_4"
        }, {
            value: "",
            color: "PALETTE_COLOR_5"
        }]
    }, {
        name: "showLegend",
        type: "boolean",
        value: !0,
        visible: !1
    }, {
        name: "regionStoryIds",
        type: "list",
        subtype: "map",
        keys: ["region", "storyId"],
        keysConfig: {
            region: {
                gridSpan: 4
            },
            storyId: {
                placeholder: "Story Id",
                gridSpan: 8
            }
        },
        values: mf
    }];
    this.widget = new d(f,a.isEditor);
    this.mdDialog = b;
    this.cancelDialog = c.bindKey(this, "cancelDialog_", a);
    this.showStateDialog = c.bindKey(this, "showStateDialog_", a);
    this.onMapClickEvent = c.bindKey(this, "onMapClickEvent_");
    b = c.bindKey(this, "onDataChange_");
    a.$watch("ctrl.widget.fields.data.items", b);
    a.$watch("ctrl.widget.fields.bullets.items", b, a.isEditor);
    this.csvField = this.widget.fields.data;
    var h = this;
    this.widget.registerAPI("fe_geo_color_map", "/trends/api/widgetdata/comparedgeo/" + this.globals.testStoryID, {
        req: {
            requestOptions: {
                backend: "IZG"
            },
            geo: {
                country: "US"
            },
            resolution: "REGION",
            comparisonItem: [{
                phrase: "OBAMA",
                time: "today 7-d"
            }],
            locale: "en"
        }
    }, [{
        path: "req.geo.country",
        hidden: !0
    }, {
        path: "req.resolution",
        hidden: !0
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem.0.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "list",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b.push(a[c].phrase);
            return b
        },
        setValue: function(a, b) {
            for (var c = [], d = 0; d < a.length; d++)
                c.push({
                    phrase: a[d],
                    time: b.req.comparisonItem[0].time
                });
            return c
        }
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).middleware(c.bindKey(this, "middleware_")).toggle(function(a) {
        a && (h.geoChartFields = [],
        h.svgMapFields = [])
    })
};
k("$jscomp.scope.FeUsStatesV1Ctrl", nf, void 0);
nf.$inject = "$scope $mdDialog lodash widgetFactory colorsFactory globalsService".split(" ");
nf.TYPE = "fe_us_states";
nf.DISPLAY_TYPE = "US states";
nf.VERSION = 1;
nf.TEMPLATES = ["fe", "fe_embed"];
nf.FULL_WIDTH = !0;
nf.HIDE_IN_EDITOR = !1;
nf.GROUP_TYPE = {
    ELE: ["fe"]
};
var mf = [{
    region: "US-AK",
    storyId: "US_cu_QyZ6IVEBAABohM_en"
}, {
    region: "US-CT",
    storyId: "US_cu_lLsuIVEBAADrGM_en"
}, {
    region: "US-IL",
    storyId: "c5c95ce9-6b74-4939-b112-57e405ef0109"
}, {
    region: "US-MA",
    storyId: "olympics"
}, {
    region: "US-OH",
    storyId: "2015"
}]
  , lf = [{
    geoCode: "US-AK",
    geoName: "Alaska",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoCode: "US-CT",
    geoName: "Connecticut",
    value: [25, 10],
    formattedValue: ["25", "10"],
    maxValueIndex: 0
}, {
    geoCode: "US-IL",
    geoName: "Illinois",
    value: [20, 40],
    formattedValue: ["20", "40"],
    maxValueIndex: 1
}, {
    geoCode: "US-MA",
    geoName: "Massachusetts",
    value: [20, 40],
    formattedValue: ["20", "40"],
    maxValueIndex: 1
}, {
    geoCode: "US-OH",
    geoName: "Ohio",
    value: [20, 40],
    formattedValue: ["20", "40"],
    maxValueIndex: 1
}];
e = nf.prototype;
e.csvGetter_ = function(a) {
    return a = this.lodash_.map(a, function(a) {
        for (var b = {
            formattedValue: [],
            geoCode: a.geoCode,
            geoName: a.geoName,
            maxValueIndex: parseInt(a.maxValueIndex),
            value: []
        }, d = 0; 5 > d; d++) {
            var f = a["value" + (d + 1)];
            f && (b.value[d] = parseInt(f),
            b.formattedValue[d] = a["formattedValue" + (d + 1)])
        }
        return b
    })
}
;
e.csvSetter_ = function(a) {
    var b = this;
    a.values = this.lodash_.map(a.values, function(a) {
        var c = {
            geoCode: a.geoCode,
            geoName: a.geoName,
            maxValueIndex: a.maxValueIndex
        };
        b.lodash_.forEach(a.value, function(b, d) {
            c["value" + (d + 1)] = b;
            c["formattedValue" + (d + 1)] = a.formattedValue[d]
        });
        return c
    });
    return a
}
;
e.middleware_ = function(a) {
    return {
        data: a["default"].geoMapData
    }
}
;
e.onDataChange_ = function() {
    if (!this.widget.isQuerying) {
        this.singleTermMode = 1 === this.widget.fields.data.getValues()[0].value.length;
        this.geoChartFields = [{
            name: "bullets",
            values: this.widget.fields.bullets.getValues()
        }, {
            name: "geoData",
            values: this.widget.fields.data.getValues()
        }, {
            name: "region",
            value: "US"
        }, {
            name: "resolution",
            value: "provinces"
        }];
        if (this.singleTermMode) {
            var a = this.widget.fields.bullets.getValues()[0];
            this.geoChartFields = this.geoChartFields.concat([{
                name: "color",
                value: a.color
            }, {
                name: "searchVolumeIndexLabel",
                value: a.value
            }, {
                name: "displayMode",
                value: "regions"
            }])
        }
        this.svgMapFields = [{
            name: "data",
            values: this.lodash_.map(this.widget.fields.data.getValues(), function(a) {
                return {
                    code: a.geoCode,
                    maxValueIndex: a.maxValueIndex,
                    name: a.geoName,
                    values: a.value
                }
            })
        }, {
            name: "legend",
            values: this.lodash_.map(this.widget.fields.bullets.getValues(), function(a) {
                return {
                    caption: a.value,
                    color: a.color
                }
            })
        }]
    }
}
;
e.showStateDialog_ = function(a) {
    this.mdDialog.show({
        preserveScope: !0,
        scope: a,
        templateUrl: "/widgets_library/fe_us_states_v1/views/state_dialog.html"
    })
}
;
e.cancelDialog_ = function() {
    this.mdDialog.cancel()
}
;
e.onMapClickEvent_ = function(a) {
    (a.dialog || !this.globals.isMobileMode) && (a = this.lodash_.find(this.widget.fields.regionStoryIds.getValues(), {
        region: a.region
    })) && this.scope_.triggerEvent("storyIdRedirect", {
        storyId: a.storyId
    })
}
;
e.getColorRange = function() {
    var a = this.colorsFactory_.Colors.COLOR_RANGES[this.colors.getHexValue(this.widget.fields.bullets.getValues()[0].color)];
    return {
        low: a[0],
        high: a[1]
    }
}
;
J.FeUsStatesV1 = nf;
var of = angular.module("publishAppFeUsStatesV1", ["publishAppFramework", "publishAppWidgetsFeUsStatesV1Views", te.name, Be.name, kf.name]);
of.controller("FeUsStatesV1Ctrl", J.FeUsStatesV1);
angular.module("publishAppWidgetsFeVideoV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_video_v1/views/fe.html", '<div class="fe-video-container fe-atoms-generic-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-atoms-generic-title">{{fields.topic.value}}</div>\n  </div>\n  <div class="fe-atoms-generic-content-container fe-atoms-generic-flex-container">\n    <div class="fe-video-media fe-atoms-generic-flex-item fe-atoms-generic-flex-order-second">\n      <iframe ng-if="ctrl.isPlayClicked"\n              ng-src="{{ ctrl.videoURL }}"\n              frameborder="0"\n              allowfullscreen>\n      </iframe>\n      <img class="fe-video-preview"\n           ng-src="{{fields.imageUrl.value}}"\n           ng-if="!ctrl.isPlayClicked"\n           alt="{{fields.description.value}}"/>\n      <div class="play-button"\n           ng-click="ctrl.isPlayClicked =! ctrl.isPlayClicked"\n           ng-show="!ctrl.isPlayClicked"></div>\n    </div>\n    <div class="fe-video-text-container fe-atoms-generic-flex-item">\n      <div class="fe-video-description" bidi="fields.description.value">\n        {{fields.description.value}}\n      </div>\n      <div class="fe-video-reference">\n        <div class="fe-video-publisher">\n          <a href="{{fields.ownerUrl.value}}"\n             target="_blank" bidi="fields.owner.value">\n            {{fields.owner.value}}\n          </a>\n        </div>\n        <div class="fe-video-date">{{fields.date.value}}</div>\n      </div>\n      <div class="fe-video-views">\n        <div class="fe-video-local-views">{{fields.localViews.value}}</div>\n        <div class="fe-video-global-views">{{fields.globalViews.value}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_video_v1/views/play_button.html", '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48">\n  <path d="M0 0h48v48H0z" fill="none"/>\n  <path d="M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"/>\n</svg>\n'))
}
]);
var pf = function(a, b, c, d) {
    this.helpers_ = d;
    this.widget = new b([{
        name: "topic",
        type: "string",
        value: "Trending YouTube video",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/mmeMYD"
        }
    }, {
        name: "description",
        type: "string",
        value: "Lorem Ipsum is simply dummy text of the printing",
        translation: {
            translate: !0,
            description: "The description text of the widget. http://goo.gl/mmeMYD"
        }
    }, {
        name: "videoUrl",
        type: "string",
        placeholder: "Youtube video url",
        value: "https://www.youtube.com/embed/DVwHCGAr_OE"
    }, {
        name: "imageUrl",
        type: "string",
        placeholder: "Image url",
        imageUpload: !0,
        value: "https://img.youtube.com/vi/DVwHCGAr_OE/maxresdefault.jpg",
        validation: [d.FIELD_VALIDATION.isHttps, d.FIELD_VALIDATION.isGstatic, d.FIELD_VALIDATION.isImageFormat]
    }, {
        name: "owner",
        type: "string",
        placeholder: "Video owner",
        value: "By Google",
        translation: {
            translate: !0,
            description: "Owner prefix text. http://goo.gl/mmeMYD"
        }
    }, {
        name: "ownerUrl",
        type: "string",
        placeholder: "Video owner URL",
        value: "https://www.google.com"
    }, {
        name: "date",
        type: "string",
        placeholder: "Video date",
        value: "Published on Dec 15, 2014",
        translation: {
            translate: !0,
            description: "The date text of the widget. http://goo.gl/mmeMYD"
        }
    }, {
        name: "localViews",
        type: "string",
        placeholder: "Local views",
        value: "new local views 500,000+",
        translation: {
            translate: !0,
            description: "The local views text of the widget. http://goo.gl/mmeMYD"
        }
    }, {
        name: "globalViews",
        type: "string",
        placeholder: "Global views",
        value: "new global views 32,335,821+",
        translation: {
            translate: !0,
            description: "The globals views text of the widget. http://goo.gl/mmeMYD"
        }
    }],a.isEditor);
    this.isPlayClicked = !1;
    this.videoURL = "";
    this.isEditor = a.isEditor;
    b = c.bind(this.onVideoUrlChange_, this);
    a.$watch("ctrl.widget.fields.videoUrl.value", b, !0)
};
k("$jscomp.scope.FeVideoV1Ctrl", pf, void 0);
pf.$inject = ["$scope", "widgetFactory", "lodash", "helpersFactory"];
pf.TYPE = "fe_video";
pf.VERSION = 1;
pf.DISPLAY_TYPE = "Trending Video";
pf.FULL_WIDTH = !0;
pf.HIDE_IN_EDITOR = !1;
pf.GROUP_TYPE = "FE";
pf.TEMPLATES = ["fe"];
var qf = /(?:(?:embed\/)|(?:watch\?v=))(.+)$/i
  , rf = /^[-_\w]{10,12}$/;
pf.prototype.createVideoUrl = function(a) {
    a = "https://www.youtube.com/embed/" + a.replace(/[^-_\w]/g, "") + "?autoplay=1";
    var b = $a("Fixed domain, encoded path");
    Ea(Za(b), "must provide justification");
    Da(!/^[\s\xa0]*$/.test(Za(b)), "must provide non-empty justification");
    b = new kb;
    b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
    return b
}
;
pf.prototype.onVideoUrlChange_ = function(a) {
    var b = this.widget.fields.videoUrl;
    a = qf.test(a) ? a.match(qf)[1] : a;
    this.isPlayClicked = !1;
    rf.test(a) ? (b.config.notification = [],
    this.videoURL = this.createVideoUrl(a)) : (b.config.notification = ["Invalid youtube video ID/URL. Video identifier must be between 10 to 12 characters. Use the following template: https://www.youtube.com/embed/{VIDEO-ID}"],
    this.videoURL = "")
}
;
J.FeVideoV1 = pf;
var sf = angular.module("publishAppFeVideoV1", ["publishAppFramework", "publishAppWidgetsFeVideoV1Views"]);
sf.controller("FeVideoV1Ctrl", J.FeVideoV1);
angular.module("publishAppWidgetsFeYisStoryCardV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    function c(a) {
        return a.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    }
    b() && (a.put("/widgets_library/fe_yis_story_card_v1/views/content.html", '<div class="fe-story-card-text">\n  <div class="fe-story-card-title" bidi="fields.topic.value | typography"></div>\n  <div class="fe-story-card-sub-title" bidi="fields.subTitle.value | typography"></div>\n  <div class="fe-story-card-publish-date" bidi="fields.publishDate.value | typography"></div>\n</div>\n<div class="fe-story-card-search-data-container"\n     ng-if="fields.SearchVolume.value">\n  <div class="fe-story-card-search-volume-container"\n       ng-class="{\'fe-story-card-separator-line\' : ctrl.sparklineAPI.isActive && ctrl.sparklineTicks.length}">\n    <div class="fe-story-card-search-volume">\n      <div class="fe-story-card-search-text">\n        {{fields.SearchVolume.value}}\n      </div>\n      <div class="fe-story-card-search-label">\n        Searches\n      </div>\n    </div>\n  </div>\n  <div class="fe-story-card-search-sparkline-container"\n       ng-if="ctrl.sparklineAPI.isActive && ctrl.sparklineTicks.length">\n    <div class="fe-story-card-search-sparkline">\n      <div class="fe-story-card-search-sparkline-placeholder">\n        <sparkline\n            ticks="ctrl.sparklineTicks"\n            thickness="2.5"\n            draw-area="false"\n            color="#ffffff"\n            width="{{ $root.globals.isDesktopMode ? 84 : 78 }}"\n            height="{{ $root.globals.isDesktopMode ? 40 : 28 }}">\n        </sparkline>\n      </div>\n    </div>\n  </div>\n</div>\n\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe.html", '<div class="fe-atoms-generic-container fe-story-card"\n     ng-init="fields = ctrl.widget.fields">\n  <a class="fe-story-card-container"\n     ng-href="{{ fields.storyLinkURL.value }}"\n     ng-style="{\'background-image\': \'url(\' + fields.storyImageURL.value + \')\'}">\n    <ng-include src="\'/widgets_library/fe_yis_story_card_v1/views/content.html\'">\n    </ng-include>\n  </a>\n  <button class="fe-story-card-share-wrapper"\n     ng-class="{\'fe-story-card-share-desktop\' : !$root.globals.isTouchDevice()}"\n     id="story-link"\n     track="[\'Widget\', type, \'Share\']"\n     ng-if="isEditor || share" ng-click="share()"\n     title="' + c("Share") + '">\n    <div class="fe-story-card-share share-image-white flip-rtl"></div>\n  </button>\n</div>\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_embed.html", '<div class="fe-atoms-generic-container fe-story-card"\n     ng-init="fields = ctrl.widget.fields">\n  <a class="fe-story-card-container"\n     ng-href="{{fields.storyLinkURL.value}}"\n     ng-style = "{ \'background-image\': \'url(\' +fields.storyImageURL.value + \')\'}">\n    <div class="logo-for-sharing"></div>\n    <ng-include class="embed-content"\n      src="\'/widgets_library/fe_yis_story_card_v1/views/content.html\'">\n    </ng-include>\n  </a>\n</div>\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_goober.html", '<div class="fe-atoms-generic-container fe-goober-card {{ctrl.className}}"\n     ng-init="fields = ctrl.widget.fields"\n     track="[\'Goober Card\', \'Card Load\', fields.topic.value]"\n     track-type="load"\n     ng-style="{\'background-color\': ctrl.colors.getHexValue(fields.backgroundColor.value)}">\n  <button class="fe-goober-card-share-wrapper"\n     ng-class="{\'fe-goober-card-share-desktop\' : !$root.globals.isTouchDevice()}"\n     id="story-link"\n     track="[\'Widget\', type, \'Share\']"\n     ng-if="isEditor || share"\n     ng-click="share()"\n     title="' + c("Share") + "\">\n    <div class=\"fe-goober-card-share flip-rtl\"\n         ng-class=\"{'share-image': (fields.backgroundColor.value == 'White'),\n          'share-b-white-image': !(fields.backgroundColor.value == 'White')}\">\n    </div>\n  </button>\n  <ng-include src=\"'/widgets_library/fe_yis_story_card_v1/views/goober_content.html'\">\n  </ng-include>\n</div>\n"),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_goober_embed.html", '<div class="fe-atoms-generic-container fe-goober-card fe-goober-embed-card {{ctrl.className}}"\n     ng-init="fields = ctrl.widget.fields"\n     ng-style="{\'background-color\': ctrl.colors.getHexValue(fields.backgroundColor.value)}">\n  <div class="fe-goober-embed-card-container">\n    <ng-include src="\'/widgets_library/fe_yis_story_card_v1/views/goober_content.html\'">\n    </ng-include>\n    <div class="goober-embed-card-logo-image"></div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_goober_featured.html", '<div class="fe-atoms-generic-container fe-goober-featured-card"\n     ng-init="fields = ctrl.widget.fields"\n     track="[\'Goober Card\', \'Card Load\', fields.topic.value]"\n     track-type="load">\n  <div class="fe-goober-featured-card-text">\n    <div class="fe-goober-featured-card-title"\n         ng-style="{\'color\': ctrl.featuredGooberTitleColor()}">\n      {{fields.topic.value}}\n    </div>\n  </div>\n  <div class="fe-goober-featured-image-wrapper">\n    <div class="fe-goober-featured-card-image-container"\n         ng-style="{\'background-image\': \'url(\' + fields.storyImageURL.value + \')\'}">\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_olympics.html", '<div class="fe-atoms-generic-container fe-olympics-card"\n     ng-init="fields = ctrl.widget.fields">\n  <a class="link-wrapper" href="{{ fields.storyLinkURL.value }}">\n    <div class="fe-olympics-card-img"\n         ng-style="{\'background-image\': \'url(\' + fields.storyImageURL.value + \')\'}">\n    </div>\n    <div class="fe-olympics-card-wrapper">\n      <div class="fe-olympics-card-title" bidi="fields.topic.value | typography"></div>\n      <div class="fe-olympics-card-info" bidi="fields.publishDate.value | typography"></div>\n      <div class="fe-olympics-card-graph">\n        <sparkline ticks="ctrl.sparklineTicks"\n                   thickness="{{ $root.globals.isDesktopMode ? 4 : 3 }}"\n                   draw-area="false"\n                   color="#4284F3"\n                   width="{{ $root.globals.isDesktopMode ? 144 : 128 }}"\n                   height="{{ $root.globals.isDesktopMode ? 48 : 32 }}">\n          <div bidi="fields.subTitle.value"></div>\n        </sparkline>\n      </div>\n    </div>\n  </a>\n  <button class="fe-story-card-share-wrapper"\n     ng-class="{\'fe-story-card-share-desktop\' : !$root.globals.isTouchDevice()}"\n     id="story-link"\n     track="[\'Widget\', type, \'Share\']"\n     ng-if="isEditor || share"\n     ng-click="share()"\n     title="' + c("Share") + '">\n    <div class="fe-story-card-share share-b-white-image flip-rtl"></div>\n  </button>\n</div>\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_olympics_embed.html", '<div class="fe-atoms-generic-container fe-olympics-embed-card"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-olympics-embed-image-mask"></div>\n  <a class="fe-olympics-embed-card-img"\n     href="{{ fields.storyLinkURL.value }}"\n     ng-style="{\'background-image\': \'url(\' + fields.storyImageURL.value + \')\'}">\n\n    <div class="fe-olympics-embed-trends-logo"></div>\n    <div class="fe-olympics-embed-card-info">\n      <div class="fe-olympics-embed-card-title" bidi="fields.topic.value | typography"></div>\n      <div class="fe-olympics-embed-card-date" bidi="fields.publishDate.value | typography"></div>\n    </div>\n\n    <div class="fe-olympics-embed-card-graph-wrapper">\n      <sparkline\n        ticks="ctrl.sparklineTicks"\n        thickness="3"\n        draw-area="false"\n        color="#ffffff"\n        width="123"\n        height="39">\n      </sparkline>\n      <div class="fe-olympics-embed-card-subtitle"\n           bidi="fields.subTitle.value | typography">\n      </div>\n    </div>\n  </a>\n</div>\n\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/fe_olympics_interactive.html", '<div class="fe-atoms-generic-container fe-olympics-interactive-card"\n     ng-init="fields = ctrl.widget.fields">\n  <a class="link-wrapper" href="{{ fields.storyLinkURL.value }}" target="_blank">\n    <div class="fe-olympics-interactive-card-img"\n         ng-style="{\'background-image\': \'url(\' + fields.storyImageURL.value + \')\'}">\n    </div>\n    <div class="fe-olympics-interactive-card-wrapper">\n      <div class="fe-olympics-interactive-card-title" bidi="fields.topic.value | typography"></div>\n      <div class="fe-olympics-interactive-card-info" bidi="fields.subTitle.value | typography"></div>\n    </div>\n    <div class="explore-button">\n      <div class="link-text">\n        CLICK TO EXPLORE\n        <div class="open-new-window link-button"></div>\n      </div>\n    </div>\n  </a>\n</div>\n'),
    a.put("/widgets_library/fe_yis_story_card_v1/views/goober_content.html", '<div class="fe-goober-container fe-goober-text-container">\n  <div class="fe-goober-card-title"\n       ng-style="{\'color\': ctrl.colors.getHexValue(fields.color.value)}">\n    {{fields.topic.value}}\n  </div>\n</div><div class="fe-goober-container fe-goober-image-container">\n  <div class="fe-goober-image-top-space">\n  </div>\n  <div class="fe-goober-card-image-wrapper">\n    \x3c!--TODO(sdimenstein): See if we can do this with ng-if.--\x3e\n    <div class="fe-goober-card-image big-image"\n         ng-style="{\'background-image\': \'url(\' + fields.largeImageUrl.value + \')\'}">\n    </div>\n    <div class="fe-goober-card-image small-image"\n         ng-style="{\'background-image\': \'url(\' + fields.storyImageURL.value + \')\'}">\n    </div>\n  </div>\n</div>\n'))
}
]);
var tf = function(a, b, c, d, f, g, h, m, l, n) {
    this.sparklineTicks = [];
    this.palette = "fe_goober" == a.template || "fe_goober_embed" == a.template || "fe_goober_featured" == a.template ? n.Colors.OLYMPICS_PALETTE : n.Colors.DEFAULT_PALETTE;
    this.colors = new n.Colors(this.palette);
    this.className = "";
    this.cardContainerElement = null;
    n = "fe_goober" == a.template || "fe_goober_embed" == a.template || "fe_goober_featured" == a.template ? "https://ssl.gstatic.com/trends_tpt/cf2ffb2da25b8b7f34caa878d72871fcae956865e943dd198578e7d27d968f44.png" : "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_520x172dp.png";
    this.document_ = c;
    c = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Nepal earthquake",
        translation: {
            translate: !0,
            description: "The main title text of the widget. http://goo.gl/s4kCJr"
        }
    }, {
        name: "color",
        type: "string",
        value: "Blue",
        templates: ["fe_goober", "fe_goober_featured", "fe_goober_embed"],
        colorPalette: this.colors,
        options: f.pluck(this.palette, "name")
    }, {
        name: "backgroundColor",
        type: "string",
        value: "White",
        templates: ["fe_goober", "fe_goober_featured", "fe_goober_embed"],
        colorPalette: this.colors,
        options: f.pluck(this.palette, "name")
    }, {
        name: "subTitle",
        type: "string",
        placeholder: "Sub title",
        value: "How did the world care about Nepal",
        templates: ["fe", "fe_embed", "fe_olympics", "fe_olympics_embed", "fe_olympics_interactive"],
        translation: {
            translate: !0,
            description: "The sub title text of the widget. http://goo.gl/s4kCJr"
        }
    }, {
        name: "publishDate",
        type: "string",
        placeholder: "Publish Date",
        value: "April 25",
        templates: ["fe", "fe_embed", "fe_olympics", "fe_olympics_embed"],
        translation: {
            translate: !0,
            description: "The date in which this story got published. http://goo.gl/s4kCJr"
        }
    }, {
        name: "SearchVolume",
        type: "string",
        placeholder: "Search volume",
        value: "80M+",
        templates: ["fe", "fe_embed"],
        translation: {
            translate: !0,
            description: "The total search volume short number. http://goo.gl/s4kCJr"
        }
    }, {
        name: "storyImageURL",
        type: "string",
        placeholder: "Image URL",
        imageUpload: !0,
        value: n,
        validation: [l.FIELD_VALIDATION.isHttps, l.FIELD_VALIDATION.isGstatic, l.FIELD_VALIDATION.isImageFormat]
    }, {
        name: "largeImageUrl",
        type: "string",
        placeholder: "Large Image URL",
        imageUpload: !0,
        value: "https://ssl.gstatic.com/trends_tpt/4b7ca29ff080fbb43bd95b7a80baa0333be46b1f62b0a1942182911058fcc8a7.png",
        templates: ["fe_goober", "fe_goober_embed"],
        validation: [l.FIELD_VALIDATION.isHttps, l.FIELD_VALIDATION.isGstatic, l.FIELD_VALIDATION.isImageFormat]
    }, {
        name: "storyLinkURL",
        type: "string",
        placeholder: "Link to the story",
        value: "https://google.com",
        templates: ["fe", "fe_embed", "fe_olympics", "fe_olympics_embed", "fe_olympics_interactive"]
    }];
    this.widget = new g(c,a.isEditor);
    f.contains(["fe_goober", "fe_goober_featured", "fe_goober_embed", "fe_olympics_interactive"], a.template) || (this.sparklineAPI = this.widget.registerAPI("fe_yis_story_card_sparkline", "/trends/api/widgetdata/timeline/" + h.testStoryID, {
        req: {
            geo: {
                country: "US"
            },
            time: "2015-06-05T17\\:00\\:00 2015-06-08T11\\:25\\:00",
            isRealTime: !0,
            resolution: "FOUR_HOUR",
            mid: ["/m/01jddz", "/m/05fjf"],
            locale: "en"
        },
        tz: "300"
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        invalidMessage: "Resolution is required.",
        options: "MINUTE HOUR FOUR_HOUR DAY WEEK MONTH YEAR".split(" "),
        setValue: function(a, b) {
            b.req.isRealTime = f.contains(["MINUTE", "HOUR", "FOUR_HOUR"], a);
            return a
        }
    }, {
        path: "req.mid",
        title: "Mid",
        type: "list",
        group: "midOrQuery",
        groupValue: "mid",
        invalidMessage: "Mid is required."
    }, {
        path: "req.query",
        title: "Query",
        type: "text",
        group: "midOrQuery",
        groupValue: "query",
        invalidMessage: "Query is required."
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }, {
        path: "tz",
        title: "Timezone",
        type: "select",
        options: l.TIME_ZONES,
        invalidMessage: "Timezone is required."
    }]).runInBackground().setService(f.bind(function(a, b) {
        this.sparklineTicks = [];
        return m.getSparkline(a, b)
    }, this)).middleware(f.bind(function(a) {
        this.sparklineTicks = a
    }, this)));
    if ("fe_goober" == a.template || "fe_goober_embed" == a.template)
        a = f.bindKey(this, "onResize_", a),
        angular.element(b).bind("resize", a),
        d(a, 200)
};
k("$jscomp.scope.FeYisStoryCardV1Ctrl", tf, void 0);
tf.$inject = "$scope $window $document $timeout lodash widgetFactory globalsService storyCardSparklineService helpersFactory colorsFactory".split(" ");
tf.TYPE = "fe_yis_story_card";
tf.DISPLAY_TYPE = "Story Card";
tf.VERSION = 1;
tf.TEMPLATES = "fe fe_embed fe_goober fe_goober_featured fe_goober_embed fe_olympics fe_olympics_embed fe_olympics_interactive".split(" ");
tf.FULL_WIDTH = !0;
tf.GROUP_TYPE = {
    YIS: ["fe", "fe_embed"],
    OLY: ["fe_olympics", "fe_olympics_embed", "fe_olympics_interactive"],
    OLY_GOOBERS: ["fe_goober", "fe_goober_featured", "fe_goober_embed"]
};
tf.prototype.onResize_ = function(a) {
    this.className = 960 >= a.widgetDirectiveElement[0].clientWidth ? "fe-goober-small-card" : ""
}
;
tf.prototype.featuredGooberTitleColor = function() {
    var a = this.widget.fields;
    return this.colors.getHexValue("White" == a.backgroundColor.value ? a.color.value : a.backgroundColor.value)
}
;
J.FeYisStoryCardV1 = tf;
var uf = function(a, b, c, d) {
    var f = c.bindKey(this, "queueIteration_");
    this.http_ = a;
    this.q_ = b;
    this.lodash_ = c;
    this.queue_ = new d.Queue(f,{
        batchSize: 1,
        delayTime: 0,
        parallelBatches: 4
    })
};
k("$jscomp.scope.SparklineService", uf, void 0);
uf.$inject = ["$http", "$q", "lodash", "queueFactory"];
e = uf.prototype;
e.responseMiddleware_ = function(a) {
    this.lodash_.isObject(a) && a["default"] && (a = a["default"].timelineData);
    return a
}
;
e.responseTransform_ = function(a) {
    return this.http_.defaults.transformResponse.concat(a)
}
;
e.timelineQuery_ = function(a, b) {
    var c = this.responseTransform_(this.lodash_.bindKey(this, "responseMiddleware_"));
    a = this.http_.get(a, {
        params: b,
        transformResponse: c
    });
    return this.q_.when(a)
}
;
e.getSparkline = function(a, b) {
    return this.queue_.push({
        url: a,
        req: b
    }).promise
}
;
e.queueIteration_ = function(a, b) {
    a = a[0];
    this.timelineQuery_(a.data.url, a.data.req).then(this.lodash_.bindKey(a, "resolve"), this.lodash_.bindKey(a, "reject"))["finally"](b)
}
;
var vf = angular.module("publishAppFeYisStoryCardV1", ["publishAppFramework", "publishAppWidgetsFeYisStoryCardV1Views"]);
vf.controller("FeYisStoryCardV1Ctrl", J.FeYisStoryCardV1);
vf.service("storyCardSparklineService", uf);
angular.module("publishAppWidgetsHorseraceChartV1Views", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/horserace_chart_v1/views/chart_directive.html", '<svg class="timeline-svg"\n     preserveAspectRatio="none">\n  <g class="timeline-svg-bg-lines"\n     ng-attr-stroke-width="{{ strokeSize - 0.1 }}">\n    <polyline\n        ng-repeat="i in [] | range:1:6"\n        ng-attr-points="{{ [0, i].join(\',\') }} {{ [chartSizeX, i].join(\',\') }}" />\n  </g>\n\n  <svg ng-attr-height="{{ maxViewportY + strokeSize / 2 + belowLineHeight}}"\n       ng-if="pointsSeries.length">\n    <g class="timeline-svg-color-lines"\n       ng-attr-stroke-width="{{ strokeSize }}">\n      <path ng-repeat="points in pointsSeries"\n            ng-attr-d="M{{ ::lodash.pluck(points, \'svgPoint\').join(\'L\') }}"\n            ng-attr-stroke="{{ colors.getHexValue(legend.getValue($index).color) }}" />\n    </g>\n  </svg>\n\n  <g class="timeline-svg-labels">\n    <text ng-repeat="label in xAxisLabels"\n          ng-attr-x="{{ label.x }}"\n          ng-attr-y="{{ maxViewportY + 0.8 }}">\n      {{ label.text }}\n    </text>\n  </g>\n</svg>\n\n<div class="timeline-legend-item"\n    ng-repeat="legendItem in legend.items | limitTo:pointsSeries.length">\n  <span ng-style="{\'background-color\':\n      colors.getHexValue(legendItem.value.color)}"></span>\n  {{ legendItem.value.value }}\n</div>\n'),
    a.put("/widgets_library/horserace_chart_v1/views/content.html", '<div class="timeline-chart-fe">\n  <div class="timeline-chart-content-top-fe fe-atoms-generic-separator">\n    <ul class="timeline-y-axis-labels">\n      <li ng-repeat="legendItem in fields.legend.items | limitTo: 5"\n          ng-if="legendItem.value.value">\n        #{{ $index + 1 }}\n      </li>\n    </ul>\n    <horserace-chart\n      colors="ctrl.colors"\n      legend="fields.legend"\n      data="fields.data"\n      anchor="ctrl.anchor"\n      velocity="ctrl.velocity"\n      on-generate="ctrl.onChartGenerate(pointsSeries)">\n    </horserace-chart>\n  </div>\n  <div>\n    <div ng-show="ctrl.velocity === 0"\n         ng-click="ctrl.anchor = ctrl.anchor === 100 ? 0 : ctrl.anchor; ctrl.velocity = 1"\n         class="timeline-chart-fe-play-pause play-circle"></div>\n    <div ng-show="ctrl.velocity !== 0"\n         ng-click="ctrl.velocity = 0"\n         class="timeline-chart-fe-play-pause pause-circle"></div>\n    <div class="timeline-chart-fe-slider-wrapper">\n      <div class="timeline-chart-fe-slider-label">{{ ctrl.sliderLabels[0] }}</div>\n      <md-slider class="timeline-chart-fe-slider"\n                 aria-label="Position slider"\n                 min="1"\n                 max="{{ ctrl.maxSteps }}"\n                 ng-model="ctrl.sliderGetterSetter"\n                 ng-model-options="{ getterSetter: true }"\n                 ng-if="ctrl.step && ctrl.maxSteps">\n      </md-slider>\n      <div class="timeline-chart-fe-slider-label">{{ ctrl.sliderLabels[1] }}</div>\n    </div>\n  </div>\n</div>\n'),
    a.put("/widgets_library/horserace_chart_v1/views/fe.html", '<div class="fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-header-container fe-atoms-generic-separator">\n    <div class="fe-atoms-generic-title">\n      {{fields.topic.value}}\n    </div>\n    <widget-actions></widget-actions>\n  </div>\n  <ng-include class="embed-content" src="\'/widgets_library/horserace_chart_v1/views/content.html\'"></ng-include>\n</div>\n'),
    a.put("/widgets_library/horserace_chart_v1/views/fe_embed.html", '<div class="embed-container timeline-embed" ng-init="fields = ctrl.widget.fields">\n  <div class="embed-header timeline-embed-header">\n    <div class="embed-title">\n      {{fields.topic.value}}\n    </div>\n    <div class="embed-logo">\n      <a href="/trends/{{ storyId ? \'story/\' + storyId : \'\'}}" target="_blank">\n        <img src="https://www.gstatic.com/images/branding/lockups/1x/lockup_trends_color_142x24dp.png" />\n      </a>\n    </div>\n  </div>\n  <ng-include class="embed-content" src="\'/widgets_library/horserace_chart_v1/views/content.html\'"></ng-include>\n</div>\n'))
}
]);
var wf, xf, yf, zf = function() {
    this.restrict = "E";
    this.templateUrl = "/widgets_library/horserace_chart_v1/views/chart_directive.html";
    this.scope = {
        colors: "=",
        legend: "=",
        data: "=",
        anchor: "=?",
        velocity: "=?",
        onGenerate: "&?"
    };
    this.viewportTemplate_ = wf.template("<%= left %> <%= top %> <%= right %> <%= bottom %>");
    this.link = wf.bind(this.link, this)
};
e = zf.prototype;
e.animationCycle_ = function(a, b, c) {
    a.isAnimationRequested = !1;
    this.isPaused(a) || (b && c && this.changeAnchor_(a, a.anchor + (c - b) / 18E3 * 100 * a.velocity),
    this.requestAnimation_(a, c))
}
;
e.changeAnchor_ = function(a, b) {
    b = Math.max(0, Math.min(b, 100));
    a.anchor != b && (a.skipInputChangeCallback = !0,
    a.anchor = b,
    a.$applyAsync(),
    this.updateViewport_(a))
}
;
e.createLabels_ = function(a) {
    var b = a[0].length
      , c = Math.min(80 / 3.5, b)
      , b = b / c
      , d = Math.ceil(b)
      , f = [];
    d != b && (c = c * b / d,
    b = d);
    for (d = 0; d < c; d++) {
        var g = a[0][d * b];
        f.push({
            x: g.x,
            text: g.text
        })
    }
    return f
}
;
e.createPointsSeries_ = function(a) {
    var b = [];
    wf.forEach(a, function(c, d) {
        var f = d / (a.length - 1) * 80
          , g = c.displayDate || c.date;
        wf.forEach(c.values, function(a, c) {
            b[c] || (b[c] = []);
            b[c].push({
                x: f,
                y: a,
                svgPoint: [f, a].join(),
                text: g
            })
        })
    });
    return b
}
;
e.createHorserace_ = function(a) {
    var b = this
      , c = a.data.getValues()
      , c = this.createPointsSeries_(c);
    a.pointsSeries = c;
    a.xAxisLabels = this.createLabels_(c);
    a.elements = null;
    if (a.onGenerate)
        a.onGenerate(a);
    xf(function() {
        b.updateViewport_(a);
        b.requestAnimation_(a)
    }, 0)
}
;
e.isPaused = function(a) {
    return 0 == a.velocity
}
;
e.link = function(a, b) {
    var c = angular.element(yf)
      , d = wf.bindKey(this, "updateViewport_", a);
    a.lodash = wf;
    a.containerElement = b;
    a.elements = null;
    a.chartSizeX = 80;
    a.chartSizeY = 10;
    a.maxViewportX = 24;
    a.maxViewportY = 5;
    a.belowLineHeight = .26;
    a.strokeSize = .12;
    a.skipInputChangeCallback = !0;
    a.isAnimationRequested = !1;
    a.svgPaths = [];
    a.xAxisLabels = [];
    wf.defaults(a, {
        anchor: 0,
        velocity: 0
    });
    a.$watch("data.items", wf.bindKey(this, "createHorserace_", a));
    a.$watchGroup(["anchor", "velocity"], wf.bindKey(this, "onInputChange_", a));
    c.bind("resize", d);
    a.$on("$destroy", function() {
        c.unbind("resize", d)
    })
}
;
e.onInputChange_ = function(a, b, c) {
    a.skipInputChangeCallback ? a.skipInputChangeCallback = !1 : 0 == a.velocity ? this.updateViewport_(a) : 0 == c[1] && 0 != b[1] && this.requestAnimation_(a)
}
;
e.requestAnimation_ = function(a, b) {
    if (!a.isAnimationRequested && 0 < a.velocity && 100 > a.anchor || 0 > a.velocity && 0 < a.anchor)
        b = wf.bindKey(this, "animationCycle_", a, b),
        a.isAnimationRequested = !0,
        yf.requestAnimationFrame(b)
}
;
e.updateViewport_ = function(a) {
    var b = this.getDomElements_(a)
      , c = 24 * Math.min(b.container[0].offsetWidth / 888, 1)
      , d = 80 * a.anchor / 100
      , c = {
        top: .28,
        left: Math.max(0, d - c),
        bottom: 5.84,
        right: c
    };
    b.innerSvg.attr("width", d);
    b.outerSvg.attr("viewBox", this.viewportTemplate_(c));
    this.updateLegendPosition_(a, c)
}
;
e.updateLegendPosition_ = function(a, b) {
    var c = this.getDomElements_(a)
      , d = c.container[0].offsetWidth
      , f = c.container[0].offsetHeight;
    wf.forEach(c.paths, function(g, h) {
        if (h = c.legend[h]) {
            g = this.getPathPointByAnchor_(g, a.anchor);
            var m = ""
              , l = "";
            5.38 >= g.y && (m = f * (g.y - b.top) / b.bottom + "px",
            l = (b.right - b.left > g.x ? d * (g.x - b.left) / b.right : d) + "px");
            h.style.top = m;
            h.style.left = l
        }
    }, this)
}
;
e.getDomElements_ = function(a) {
    if (!a.elements) {
        var b = a.containerElement
          , c = b.find("svg").eq(0);
        a.elements = {
            container: b,
            innerSvg: c.find("svg"),
            legend: b[0].querySelectorAll(".timeline-legend-item"),
            outerSvg: c,
            paths: c[0].querySelectorAll("path")
        }
    }
    return a.elements
}
;
e.getPathPointByAnchor_ = function(a, b) {
    var c = a.getTotalLength(), d;
    if (0 == b)
        d = a.getPointAtLength(0);
    else if (100 == b)
        d = a.getPointAtLength(c);
    else {
        var f = b / 100 * 80;
        d = c - 80;
        b = Math.max(0, b / 100 * c);
        var c = d / 500
          , g = b - d
          , h = b + d;
        do {
            b = (g + h) / 2;
            d = a.getPointAtLength(b);
            if (Math.abs(d.x - f) <= c)
                break;
            d.x < f ? g = b : d.x > f && (h = b)
        } while (g < h)
    }
    return d
}
;
var Af = function(a, b, c, d) {
    yf = b;
    xf = c;
    wf = d;
    return new zf
};
k("$jscomp.scope.directiveInjector$jscomp$21", Af, void 0);
Af.$inject = "$document $window $timeout lodash globalsService helpersFactory".split(" ");
var Cf = function(a, b, c, d, f, g) {
    this.lodash_ = b;
    this.colors = new c.Colors(a.palette || c.Colors.SOCIAL_PALETTE);
    c = [{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Oscars 2016 - Top best picture searches",
        translation: {
            translate: !0,
            description: "Title of the horse race widget."
        }
    }, {
        name: "legend",
        type: "list",
        subtype: "map",
        keys: ["value", "color"],
        maxLimit: 10,
        colorPalette: this.colors,
        keysConfig: {
            value: {
                gridSpan: 12
            },
            color: {
                gridSpan: 12,
                options: b.map(this.colors.palette_, function(a) {
                    return {
                        name: a.name,
                        value: a.name
                    }
                })
            }
        },
        values: [{
            value: "Bridge of Spies",
            color: "Blue"
        }, {
            value: "The Revenant",
            color: "Red"
        }, {
            value: "The Big Short",
            color: "Yellow"
        }, {
            value: "The Martian",
            color: "Green"
        }, {
            value: "Mad Max: Fury Road",
            color: "Purple"
        }, {
            value: "Brooklyn",
            color: "Teal"
        }, {
            value: "Room",
            color: "Orange"
        }, {
            value: "Spotlight",
            color: "Olive"
        }, {
            value: "",
            color: "Dark Blue"
        }, {
            value: "",
            color: "Pink"
        }]
    }, {
        name: "data",
        type: "list",
        subtype: "map",
        visible: !1,
        keys: ["date", "displayDate", "values"],
        csvKeys: ["date", "displayDate"].concat(b.map(b.range(1, 11), function(a) {
            return "value" + a
        })),
        csvGetter: b.bindKey(this, "csvGetter_"),
        csvSetter: b.bindKey(this, "csvSetter_"),
        values: Bf
    }];
    this.widget = new f(c,a.isEditor);
    this.widgetAPI_ = this.widget.registerAPI("horse_race", "/trends/api/widgetdata/multiline/" + g.testStoryID, {
        req: {
            requestOptions: {
                backend: "CM"
            },
            time: "now 60-M",
            resolution: "MINUTE",
            locale: "en-US",
            dataMode: "RANKINGS",
            comparisonItem: [{
                phrase: "Bridge of Spies",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "The Revenant",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "The Big Short",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "The Martian",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "Mad Max Fury Road",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "Brooklyn",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "Room",
                geo: {
                    country: "US"
                }
            }, {
                phrase: "Spotlight",
                geo: {
                    country: "US"
                }
            }]
        },
        tz: "300"
    }, [{
        path: "req.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.resolution",
        title: "Resolution",
        type: "select",
        invalidMessage: "Resolution is required.",
        options: "MINUTE EIGHT_MINUTE SIXTEEN_MINUTE HOUR FOUR_HOUR DAY WEEK MONTH YEAR".split(" ")
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }, {
        path: "req.dataMode",
        title: "DataMode",
        type: "text",
        invalidMessage: "DataMode is required.",
        hidden: !0
    }, {
        path: "req.requestOptions.backend",
        title: "Backend",
        type: "select",
        invalidMessage: "Backend is required.",
        options: ["IZG", "CM", "FRESH"]
    }, {
        path: "req.comparisonItem.0.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.comparisonItem",
        title: "Phrase",
        type: "list",
        invalidMessage: "Phrase is required.",
        getValue: function(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b.push(a[c].phrase);
            return b
        },
        setValue: function(a, b) {
            var c = [];
            b = b.req.comparisonItem ? b.req.comparisonItem[0].geo.country : !1;
            for (var d = 0; d < a.length; d++)
                c.push(!1 === b ? {
                    phrase: a[d]
                } : {
                    phrase: a[d],
                    geo: {
                        country: b
                    }
                });
            return c
        }
    }, {
        path: "tz",
        title: "Timezone",
        type: "select",
        options: d.TIME_ZONES,
        invalidMessage: "Timezone is required."
    }]).middleware(b.bindKey(this, "middleware_"));
    this.csvField = this.widget.fields.data;
    this.initialAnchor_ = 100;
    this.initialVelocity_ = 0;
    this.velocity = this.maxSteps = this.step = this.anchor = this.previousData_ = null;
    this.sliderLabels = [];
    this.seriesPoints_ = [];
    a.$watch("ctrl.anchor", b.bindKey(this, "anchorChangeHandler_"))
};
k("$jscomp.scope.HorseraceChartV1Ctrl", Cf, void 0);
Cf.$inject = "$scope lodash colorsFactory helpersFactory widgetFactory globalsService".split(" ");
Cf.TYPE = "horserace_chart";
Cf.DISPLAY_TYPE = "Horse Race";
Cf.VERSION = 1;
Cf.TEMPLATES = ["fe", "fe_embed"];
Cf.FULL_WIDTH = !0;
Cf.GROUP_TYPE = "FE";
var Bf = [{
    date: "Feb 22 2015",
    displayDate: "Feb 2015",
    values: [8, 5, 6, 1, 2, 4, 3, 7]
}, {
    date: "Mar 01 2015",
    values: [8, 5, 6, 1, 2, 4, 3, 7]
}, {
    date: "Mar 08 2015",
    values: [8, 5, 6, 1, 2, 4, 3, 7]
}, {
    date: "Mar 15 2015",
    values: [7, 6, 5, 2, 1, 4, 3, 8]
}, {
    date: "Mar 22 2015",
    values: [8, 6, 5, 2, 1, 4, 3, 7]
}, {
    date: "Mar 29 2015",
    values: [7, 6, 5, 2, 1, 4, 3, 8]
}, {
    date: "Apr 05 2015",
    values: [7, 6, 5, 2, 1, 4, 3, 8]
}, {
    date: "Apr 12 2015",
    values: [7, 6, 5, 2, 1, 4, 3, 8]
}, {
    date: "Apr 19 2015",
    values: [7, 5, 6, 2, 1, 4, 3, 8]
}, {
    date: "Apr 26 2015",
    values: [8, 5, 6, 2, 1, 4, 3, 7]
}, {
    date: "May 03 2015",
    values: [8, 5, 6, 2, 1, 4, 3, 7]
}, {
    date: "May 10 2015",
    values: [8, 6, 5, 2, 1, 4, 3, 7]
}, {
    date: "May 17 2015",
    values: [8, 6, 5, 2, 1, 4, 3, 7]
}, {
    date: "May 24 2015",
    values: [8, 6, 5, 2, 1, 4, 3, 7]
}, {
    date: "May 31 2015",
    values: [3, 7, 6, 2, 1, 5, 4, 8]
}, {
    date: "Jun 07 2015",
    values: [4, 6, 7, 2, 1, 5, 3, 8]
}, {
    date: "Jun 14 2015",
    values: [6, 7, 5, 2, 1, 4, 3, 8]
}, {
    date: "Jun 21 2015",
    values: [7, 6, 5, 2, 1, 4, 3, 8]
}, {
    date: "Jun 28 2015",
    values: [7, 6, 5, 2, 1, 4, 3, 8]
}, {
    date: "Jul 05 2015",
    values: [7, 5, 6, 2, 1, 4, 3, 8]
}, {
    date: "Jul 12 2015",
    values: [7, 2, 6, 3, 1, 5, 4, 8]
}, {
    date: "Jul 19 2015",
    values: [6, 2, 7, 3, 1, 5, 4, 8]
}, {
    date: "Jul 26 2015",
    values: [8, 4, 7, 2, 1, 5, 3, 6]
}, {
    date: "Aug 02 2015",
    values: [5, 4, 8, 2, 1, 6, 3, 7]
}, {
    date: "Aug 09 2015",
    values: [6, 4, 7, 2, 1, 5, 3, 8]
}, {
    date: "Aug 16 2015",
    values: [6, 4, 7, 2, 1, 5, 3, 8]
}, {
    date: "Aug 23 2015",
    values: [7, 4, 6, 3, 1, 5, 2, 8]
}, {
    date: "Aug 30 2015",
    values: [6, 4, 7, 3, 1, 5, 2, 8]
}, {
    date: "Sep 06 2015",
    values: [4, 5, 7, 3, 1, 6, 2, 8]
}, {
    date: "Sep 13 2015",
    values: [4, 5, 8, 2, 1, 6, 3, 7]
}, {
    date: "Sep 20 2015",
    values: [5, 6, 4, 2, 1, 7, 3, 8]
}, {
    date: "Sep 27 2015",
    values: [5, 4, 6, 1, 2, 7, 3, 8]
}, {
    date: "Oct 04 2015",
    values: [4, 5, 7, 1, 2, 6, 3, 8]
}, {
    date: "Oct 11 2015",
    values: [2, 5, 7, 1, 3, 6, 4, 8]
}, {
    date: "Oct 18 2015",
    values: [2, 5, 8, 1, 3, 6, 4, 7]
}, {
    date: "Oct 25 2015",
    values: [2, 5, 8, 1, 3, 7, 4, 6]
}, {
    date: "Nov 01 2015",
    values: [2, 7, 8, 1, 3, 6, 4, 5]
}, {
    date: "Nov 08 2015",
    values: [2, 7, 8, 1, 3, 6, 5, 4]
}, {
    date: "Nov 15 2015",
    values: [2, 7, 8, 1, 3, 5, 6, 4]
}, {
    date: "Nov 22 2015",
    values: [5, 6, 8, 1, 4, 2, 7, 3]
}, {
    date: "Nov 29 2015",
    values: [7, 2, 5, 1, 3, 4, 8, 6]
}, {
    date: "Dec 06 2015",
    values: [8, 3, 1, 2, 4, 5, 6, 7]
}, {
    date: "Dec 13 2015",
    values: [8, 1, 2, 3, 4, 5, 6, 7]
}, {
    date: "Dec 20 2015",
    values: [7, 1, 2, 3, 4, 6, 5, 8]
}, {
    date: "Dec 27 2015",
    values: [7, 2, 1, 3, 4, 6, 5, 8]
}, {
    date: "Jan 03 2016",
    values: [7, 1, 2, 3, 4, 6, 5, 8]
}, {
    date: "Jan 10 2016",
    values: [8, 1, 3, 2, 4, 6, 5, 7]
}, {
    date: "Jan 17 2016",
    values: [7, 1, 3, 2, 4, 6, 5, 8]
}, {
    date: "Jan 24 2016",
    values: [7, 1, 3, 2, 4, 6, 5, 8]
}, {
    date: "Jan 31 2016",
    values: [4, 1, 2, 3, 5, 8, 6, 7]
}, {
    date: "Feb 07 2016",
    values: [3, 1, 4, 2, 5, 7, 6, 8]
}, {
    date: "Feb 14 2016",
    displayDate: "Feb 2016",
    values: [1, 2, 3, 4, 5, 6, 7, 8]
}];
e = Cf.prototype;
e.anchorChangeHandler_ = function(a) {
    100 === a && (this.velocity = 0);
    this.updateSlider_(a)
}
;
e.csvGetter_ = function(a) {
    return a = this.lodash_.map(a, function(a) {
        for (var b = {
            date: a.date,
            displayDate: a.displayDate,
            values: []
        }, d = 0; 10 > d; d++) {
            var f = a["value" + (d + 1)];
            f && (b.values[d] = parseInt(f))
        }
        return b
    })
}
;
e.csvSetter_ = function(a) {
    var b = this;
    a.values = this.lodash_.map(a.values, function(a) {
        var c = this.lodash_.pick(a, "date", "displayDate");
        b.lodash_.forEach(a.values, function(a, b) {
            c["value" + (b + 1)] = a
        });
        return c
    }, this);
    return a
}
;
e.middleware_ = function(a, b, c) {
    a = a["default"].timelineData;
    var d = c && this.previousData_ ? this.lodash_.last(this.previousData_).date : 0
      , f = [];
    this.lodash_.forEach(a, function(a) {
        a.time > d && f.push({
            date: a.time,
            displayDate: a.formattedAxisTime,
            values: a.value
        })
    });
    c = f.length;
    if (d) {
        if (0 == c)
            return;
        f = this.lodash_.rest(this.previousData_, c).concat(f);
        this.initialAnchor_ = Math.max(0, Math.min(100, (this.anchor / 100 * (f.length - 1) - c) / (f.length - 1) * 100));
        this.initialVelocity_ = 100 == this.anchor ? 1 : this.velocity
    } else
        this.initialAnchor_ = 100,
        this.initialVelocity_ = 0;
    this.previousData_ = f;
    this.widgetAPI_.runInBackground();
    return {
        data: f
    }
}
;
e.onChartGenerate = function(a) {
    var b = a[0];
    this.seriesPoints_ = a;
    this.maxSteps = 10 * b.length;
    this.sliderLabels = [b[0].text, b[b.length - 1].text];
    this.anchor = this.initialAnchor_;
    this.velocity = this.initialVelocity_;
    this.updateSlider_(this.anchor)
}
;
e.setAnchorByStep_ = function(a) {
    var b = this.seriesPoints_[0];
    this.anchor = 100 * b[Math.ceil(a / 10) - 1].x / b[b.length - 1].x
}
;
e.sliderGetterSetter = function(a) {
    this.lodash_.isUndefined(a) || (this.step = a,
    this.velocity = 0,
    this.setAnchorByStep_(a));
    return this.step
}
;
e.updateSlider_ = function(a) {
    this.maxSteps && (this.step = Math.max(1, a / 100 * this.maxSteps))
}
;
J.HorseraceChartV1 = Cf;
var Df = angular.module("publishAppHorseraceChartV1", ["publishAppFramework", "publishAppWidgetsHorseraceChartV1Views"]);
Df.controller("HorseraceChartV1Ctrl", J.HorseraceChartV1);
Df.directive("horseraceChart", Af);
angular.module("publishAppWidgetsViews", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
        return !b && !0
    }
}
]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/widgets_library/fe_image_v1/views/fe.html", '<div class="fe-atoms-generic-container fe-image"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-image-header-container fe-atoms-generic-separator"\n       dir="{{getHeaderDirection()}}">\n    <div class="fe-image-header-title">{{fields.topic.value | typography}}</div>\n  </div>\n  <div class="fe-image-container"\n       ng-style = "{ \'background-image\': \'url(\' +fields.imageURL.value + \')\'}">\n    <div class="fe-image-text">\n      <div class="fe-image-title" id="image-title">{{fields.title.value}}</div>\n      <div class="fe-image-detail-container">\n        <div id="image-createdBy">{{fields.createdBy.value}}</div>\n        <div id="image-publishDate">{{fields.publishDate.value}}</div>\n      </div>\n    </div>\n    <a class="fe-image-link" id= "image-link" ng-href="{{fields.interactLink.value}}"\n       target = "_blank">\n      {{fields.btnLabel.value}}\n    </a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_related_topics_v1/views/fe.html", '<div class="fe-related-topics-wrapper"\n     ng-init="fields = ctrl.widget.fields"\n     ng-if="ctrl.widget.fields.bullets.getValues().length">\n  <div class="fe-related-topics-header">\n    {{fields.topic.value}}\n  </div>\n  <div class="fe-related-topics-content">\n    <a class="fe-related-topics-item"\n        href="{{item.value.link}}"\n        track="[\'Widget\', type, item.value.text]"\n        ng-repeat="item in fields.bullets.items track by $index"\n        ng-if="item.value.text && item.value.desc">\n      <div class="fe-related-topics-title"\n           title="{{item.value.text}}">\n        {{item.value.text}}\n      </div>\n      <div class="fe-related-topics-subtitle"\n           title="{{item.value.desc}}">{{item.value.desc}}</div>\n    </a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe.html", '<div class="fe-text fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-content-container">\n    <pre bidi="fields.content.value">{{fields.content.value}}</pre>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe_centered_note.html", '<div class="fe-text fe-atoms-generic-container fe-centered-note-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-content-container">\n    <span class="fe-centered-note-container-content" bidi="fields.content.value">\n    {{fields.content.value}}</span>\n    <a ng-if="fields.url.value" href="{{fields.url.value}}" target="_blank">\n      LEARN MORE</a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe_elections_compare.html", '<div class="fe-text fe-atoms-generic-container fe-elections-compare-container"\n     ng-init="fields = ctrl.widget.fields">\n  <a class="fe-atoms-generic-content-container"\n     ng-href="{{fields.url.value}}"\n     target="_blank">\n    <span class="fe-elections-compare-container-content"\n          bidi="fields.content.value">\n      {{fields.content.value}}\n    </span>\n    <div ng-if="fields.url.value"\n         class="arrow-forward">\n    </div>\n  </a>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe_explore.html", '<div class="fe-text fe-atoms-generic-container fe-explore-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-content-container">\n    <span class="fe-explore-container-content" bidi="fields.content.value">\n    {{fields.content.value}}</span>\n    <a ng-if="fields.url.value" href="{{fields.url.value}}" target="_blank">\n    Learn More</a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe_explore_note.html", '<div class="fe-text fe-atoms-generic-container fe-explore-note-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-content-container">\n    <span class="fe-explore-note-container-content" bidi="fields.content.value">\n    {{fields.content.value}}</span>\n    <a ng-if="fields.url.value" href="{{fields.url.value}}" target="_blank">\n      Learn more</a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe_yis.html", '<div class="fe-text fe-atoms-generic-container fe-yis-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-content-container">\n    <pre bidi="fields.content.value" ng-bind-html="fields.content.value"></pre>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_text_v1/views/fe_yis_related.html", '<div class="fe-text fe-yis-related-container"\n     ng-init="fields = ctrl.widget.fields">\n  <div>\n    <pre bidi="fields.content.value">{{fields.content.value}}</pre>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_top_charts_v1/views/fe.html", '<div class="fe-text fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <div class="fe-atoms-generic-content-container fe-top-charts-container">\n    <div class="title-text-wrapper">\n      <h1>{{fields.topic.value}}</h1>\n    </div>\n    <a class="fe-top-charts-btn save" href="{{fields.url.value}}"\n        track="[\'Widget\', type]">\n      {{fields.buttonText.value}}\n    </a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_top_charts_v1/views/fe_olympics.html", '<div ng-init="fields = ctrl.widget.fields">\n  <div class="fe-top-charts-olympics-container">\n    <a class="fe-top-charts-btn save" href="{{fields.url.value}}" track="[\'Widget\', type]">\n      {{fields.buttonText.value}}\n    </a>\n  </div>\n</div>\n'),
    a.put("/widgets_library/fe_yis_download_v1/views/fe.html", '<div class="fe-download fe-atoms-generic-container" ng-init="fields = ctrl.widget.fields">\n  <a class="block-link" ng-href="{{fields.download_url.value}}" target="_blank">\n    <div class="download-button inline-block-image"></div>\n    <div class="download-text">{{fields.topic.value}}</div>\n  </a>\n</div>\n'))
}
]);
var Ef = function(a, b, c) {
    this.helpers_ = c;
    this.widget = new b([{
        name: "topic",
        type: "string",
        placeholder: "Topic",
        value: "Interactive Map",
        translation: {
            translate: !0,
            description: "The topic text of the widget. http://goo.gl/0i9psE"
        }
    }, {
        name: "title",
        type: "string",
        placeholder: "Title",
        value: "Most searched candidate by area: last six months",
        translation: {
            translate: !0,
            description: "The title text of the widget. http://goo.gl/0i9psE"
        }
    }, {
        name: "interactLink",
        type: "string",
        placeholder: "Link for interact",
        value: "https://www.google.com"
    }, {
        name: "createdBy",
        type: "string",
        placeholder: "Created By",
        value: "Created by the Google News lab using CartoDB",
        translation: {
            translate: !0,
            description: "The created by text of the widget. http://goo.gl/0i9psE"
        }
    }, {
        name: "publishDate",
        type: "string",
        placeholder: "Publish Date",
        value: "Published on Jul 6, 2015",
        translation: {
            translate: !0,
            description: "The publish date text of the widget. http://goo.gl/0i9psE"
        }
    }, {
        name: "imageURL",
        type: "string",
        placeholder: "Image URL",
        value: "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_520x172dp.png",
        imageUpload: !0,
        validation: [c.FIELD_VALIDATION.isHttps, c.FIELD_VALIDATION.isGstatic, c.FIELD_VALIDATION.isImageFormat]
    }, {
        name: "btnLabel",
        type: "string",
        placeholder: "Button Label",
        value: "CLICK HERE TO INTERACT",
        translation: {
            translate: !0,
            description: "The interaction button text of the widget. http://goo.gl/0i9psE"
        }
    }],a.isEditor)
};
k("$jscomp.scope.FeImageV1Ctrl", Ef, void 0);
Ef.$inject = ["$scope", "widgetFactory", "helpersFactory"];
Ef.TYPE = "fe_image";
Ef.DISPLAY_TYPE = "Image FE";
Ef.VERSION = 1;
Ef.TEMPLATES = ["fe"];
Ef.FULL_WIDTH = !0;
Ef.HIDE_IN_EDITOR = !1;
Ef.GROUP_TYPE = "FE";
J.FeImageV1 = Ef;
var Gf = function(a, b, c, d, f, g, h) {
    var m = this;
    this.http_ = f;
    this.q_ = g;
    this.lodash_ = b;
    this.globalsService_ = h;
    this.widget = new c([{
        name: "topic",
        type: "string",
        placeholder: "Title",
        value: "Related Topics",
        translation: {
            translate: !0,
            description: "Title of the widget. http://goo.gl/5kJG0y"
        }
    }, {
        name: "bullets",
        type: "list",
        subtype: "map",
        maxLimit: 5,
        keys: ["text", "desc", "link"],
        notification: "",
        keysConfig: {
            text: {
                gridSpan: 12
            },
            desc: {
                gridSpan: 12
            },
            link: {
                gridSpan: 12
            }
        },
        values: Ff,
        translation: {
            translate: !0,
            keys: [{
                name: "text",
                description: "The title text of each list item.http://goo.gl/5kJG0y"
            }, {
                name: "desc",
                description: "The subtitle text of each list item.http://goo.gl/5kJG0y"
            }]
        }
    }],a.isEditor);
    this.trackingService = d;
    this.csvField = this.widget.fields.bullets;
    a = b.bindKey(this, "setService_");
    b = b.bindKey(this, "middleware_");
    this.widget.registerAPI("fe_relatedtopics", "/trends/api/widgetdata/relatedtopics/" + this.globalsService_.testStoryID, {
        req: {
            geo: {
                country: "US"
            },
            mid: ["/m/015nr6"],
            time: "2015-06-06T17\\:00\\:00 2015-06-08T12\\:55\\:00",
            locale: "en"
        }
    }, [{
        path: "req.geo.country",
        title: "Country",
        type: "text",
        matchValidation: /^([A-Z]{2})?$/,
        optional: !0,
        invalidMessage: "Country must contain exactly 2 uppercase english letters or set empty for worldwide."
    }, {
        path: "req.time",
        title: "Time",
        type: "text",
        invalidMessage: "Time is required."
    }, {
        path: "req.mid",
        title: "Mid",
        type: "list",
        group: "midOrQuery",
        groupValue: "mid",
        invalidMessage: "Mid is required."
    }, {
        path: "req.query",
        title: "Query",
        type: "text",
        group: "midOrQuery",
        groupValue: "query",
        invalidMessage: "Query is required."
    }, {
        path: "req.locale",
        title: "Locale",
        type: "text",
        invalidMessage: "Locale is required."
    }]).setService(a).middleware(b).toggle(function(a) {
        m.widget.fields.bullets.config.translation.translate = !a
    })
};
k("$jscomp.scope.FeRelatedTopicsV1Ctrl", Gf, void 0);
Gf.$inject = "$scope lodash widgetFactory trackingService $http $q globalsService".split(" ");
Gf.prototype.setService_ = function(a, b) {
    return this.q_.when(this.http_.get(a, {
        params: b
    }))
}
;
Gf.prototype.middleware_ = function(a) {
    a = this.lodash_.map(a["default"].topics, function(a) {
        return {
            text: a.topic.title,
            desc: a.topic.type,
            link: a.link
        }
    });
    this.widget.fields.bullets.maxLimit = Math.min(a.length, 5);
    return {
        bullets: a
    }
}
;
var Ff = [{
    text: "Paris",
    desc: "Capital of France",
    link: "/trends/explore#q=paris"
}, {
    text: "Magazine",
    desc: "Website category",
    link: "/trends/explore#q=magazine"
}, {
    text: "Shooting",
    desc: "Disaster type",
    link: "/trends/explore#q=shooting"
}, {
    text: "Francois Hollande",
    desc: "President of France",
    link: "/trends/explore#q=Francois%20Hollande"
}, {
    text: "Terrorism Massacre",
    desc: "Type of criminal act",
    link: "/trends/explore#q=Terrorism%20Massacre"
}];
Gf.TYPE = "fe_related_topics";
Gf.VERSION = 1;
Gf.DISPLAY_TYPE = "Related Topics";
Gf.FULL_WIDTH = !0;
Gf.HIDE_IN_EDITOR = !1;
Gf.GROUP_TYPE = "FE";
Gf.TEMPLATES = ["fe"];
J.FeRelatedTopicsV1 = Gf;
var Hf = function(a, b) {
    this.widget = new b([{
        name: "topic",
        type: "string",
        placeholder: "Widget name",
        value: "Text widget"
    }, {
        name: "content",
        type: "string",
        placeholder: "Content",
        textarea: !0,
        value: "Cupcake ipsum dolor sit. Amet I love liquorice jujubes pudding croissant I love pudding. Apple pie macaroon toffee jujubes pie tart cookie applicake caramels. Halvah macaroon I love lollipop. Wypas I love pudding brownie cheesecake tart jelly-o. Bear claw cookie chocolate bar jujubes toffee.",
        translation: {
            translate: !0,
            description: "The content of text widget. http://goo.gl/F1l3uP"
        }
    }, {
        name: "url",
        type: "string",
        placeholder: "Link URL",
        value: "",
        templates: ["fe_explore", "fe_elections_compare", "fe_centered_note"]
    }],a.isEditor)
};
k("$jscomp.scope.FeTextV1Ctrl", Hf, void 0);
Hf.$inject = ["$scope", "widgetFactory"];
Hf.TYPE = "fe_text";
Hf.VERSION = 1;
Hf.DISPLAY_TYPE = "Text widget";
Hf.FULL_WIDTH = !0;
Hf.GROUP_TYPE = {
    ELE: ["fe_elections_compare", "fe_centered_note"],
    FE: ["fe", "fe_explore", "fe_explore_note"],
    OLY: ["fe_explore", "fe_yis"],
    YIS: ["fe_yis", "fe_yis_related"]
};
Hf.TEMPLATES = "fe fe_elections_compare fe_centered_note fe_explore fe_explore_note fe_yis fe_yis_related".split(" ");
J.FeTextV1 = Hf;
var If = function(a, b) {
    this.widget = new b([{
        name: "topic",
        type: "string",
        placeholder: "",
        value: "Top Charts",
        translation: {
            translate: !0,
            description: "The title text of the widget. https://goo.gl/AOOYil"
        }
    }, {
        name: "buttonText",
        type: "string",
        placeholder: "",
        value: "VIEW THE LISTS",
        translation: {
            translate: !0,
            description: "The link button text. https://goo.gl/AOOYil"
        }
    }, {
        name: "url",
        type: "string",
        placeholder: "",
        value: "/trends/topcharts"
    }],a.isEditor)
};
k("$jscomp.scope.FeTopChartsV1Ctrl", If, void 0);
If.$inject = ["$scope", "widgetFactory"];
If.TYPE = "fe_top_charts";
If.VERSION = 1;
If.DISPLAY_TYPE = "Top Charts";
If.FULL_WIDTH = !0;
If.GROUP_TYPE = {
    YIS: ["fe"],
    OLY: ["fe_olympics"]
};
If.TEMPLATES = ["fe", "fe_olympics"];
J.FeTopChartsV1 = If;
var Jf = function(a, b) {
    this.widget = new b([{
        name: "topic",
        type: "string",
        placeholder: "",
        value: "DOWNLOAD THIS DATA",
        translation: {
            translate: !0,
            description: "The download action text of the widget. http://goo.gl/YnXwI7"
        }
    }, {
        name: "download_url",
        type: "string",
        placeholder: "",
        textarea: !0,
        value: "https://www.google.com"
    }],a.isEditor)
};
k("$jscomp.scope.FeYisDownloadV1Ctrl", Jf, void 0);
Jf.$inject = ["$scope", "widgetFactory"];
Jf.TYPE = "fe_yis_download";
Jf.VERSION = 1;
Jf.DISPLAY_TYPE = "Download";
Jf.FULL_WIDTH = !0;
Jf.GROUP_TYPE = "YIS";
Jf.TEMPLATES = ["fe"];
J.FeYisDownloadV1 = Jf;
var Kf = angular.module("publishAppWidgets", ["ngRoute", "ngSanitize", "ngAnimate", "ngMaterial", "publishAppFramework", $d.name, de.name, ge.name, Re.name, te.name, we.name, Be.name, Je.name, Ne.name, Oe.name, Pe.name, je.name, Xe.name, of.name, sf.name, vf.name, Df.name, kf.name, "publishAppWidgetsViews"]);
Kf.controller("FeImageV1Ctrl", J.FeImageV1);
Kf.controller("FeRelatedTopicsV1Ctrl", J.FeRelatedTopicsV1);
Kf.controller("FeTextV1Ctrl", J.FeTextV1);
Kf.controller("FeTopChartsV1Ctrl", J.FeTopChartsV1);
Kf.controller("FeYisDownloadV1Ctrl", J.FeYisDownloadV1);
Kf.factory("widgetsControllers", function() {
    return J
});
var Lf = /^[\w+/]+[=]{0,2}$/;
k("userfeedback.api.startFeedback", function(a, b, c) {
    a.timeOfStartCall = (new Date).getTime();
    var d = c || aa, f = d.document, g;
    g = (g = (g = (d || aa).document.querySelector("script[nonce]")) && g.getAttribute("nonce")) && Lf.test(g) ? g : void 0;
    g && (a.nonce = g);
    if ("help" == a.flow) {
        var h;
        a: {
            h = ["document", "location", "href"];
            for (var m = d || aa, l; l = h.shift(); )
                if (null != m[l])
                    m = m[l];
                else {
                    h = null;
                    break a
                }
            h = m
        }
        !a.helpCenterContext && h && (a.helpCenterContext = h.substring(0, 1200));
        h = !0;
        b && JSON && JSON.stringify && (m = JSON.stringify(b),
        (h = 1200 >= m.length) && (a.psdJson = m));
        h || (b = {
            invalidPsd: !0
        })
    }
    b = [a, b, c];
    d.GOOGLE_FEEDBACK_START_ARGUMENTS = b;
    c = a.serverUri || "//www.google.com/tools/feedback";
    if (h = d.GOOGLE_FEEDBACK_START)
        h.apply(d, b);
    else {
        var d = c + "/load.js?", n;
        for (n in a) {
            b = a[n];
            if (c = null != b)
                c = typeof b,
                c = !("object" == c && null != b || "function" == c);
            c && (d += encodeURIComponent(n) + "=" + encodeURIComponent(b) + "&")
        }
        a = f.createElement("script");
        g && a.setAttribute("nonce", g);
        a.src = d;
        f.body.appendChild(a)
    }
}, void 0);
var S, Mf = function(a) {
    this.nodesByID_ = {};
    this.rawData_ = [];
    a && this.generate(a)
};
Mf.prototype.generate = function(a) {
    if (S.isArray(a)) {
        var b = {};
        S.forEach(a, function(a) {
            S.isObject(a) && (S.isString(a.id) || S.isNumber(a.id)) && (b[a.id] = a)
        });
        this.nodesByID_ = b;
        this.rawData_ = a
    } else
        console.warn("OrderedDict: called generate with invalid input")
}
;
Mf.prototype.iterator = function() {
    return this.rawData_
}
;
Mf.prototype.getNodeByID = function(a) {
    return this.nodesByID_[a]
}
;
var Nf = function(a) {
    this.nodesByID_ = {};
    this.searchRegexString_ = "";
    this.rootNodes_ = [];
    this.rootNode = null;
    a && this.generate(a)
};
p(Nf, Mf);
var Of = /^(?:(\w+)-)(?:\w+-)?(\d+)$/;
Nf.prototype.generate = function(a) {
    if (S.isPlainObject(a)) {
        var b = {}
          , c = []
          , d = [];
        this.iterateTree_(a, function(a) {
            var f = S.isString(a.id) ? a.id.match(Of) : null;
            a.parent || c.push(a);
            b[a.id] = a;
            f && (b[f[2]] = a,
            b[[f[1], f[2]].join("-")] = a);
            d.push(a.id + ":" + a.name)
        });
        this.nodesByID_ = b;
        this.searchRegexString_ = d.join(";");
        this.rootNodes_ = c;
        this.rootNode = a
    } else
        console.warn("DataTree: called generate with invalid input")
}
;
Nf.prototype.getNodesByQuery = function(a, b) {
    a = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = new RegExp("([^;]*):(" + a + "|([^;]*\\s" + a + "))","gi");
    for (var c = [], d = {}, f; null !== (f = a.exec(this.searchRegexString_)) && (c.length < b || !S.isNumber(b)); )
        if (f = f[1],
        !d[f]) {
            var g = this.nodesByID_[f];
            g ? (c.push(g),
            d[f] = !0) : console.warn("DataTree: Node " + f + " is missing.")
        }
    return c
}
;
Nf.prototype.iterator = function(a) {
    S.isString(a) && (a = this.getNodeByID(a));
    if (!a || a === this.rootNode)
        return this.rootNodes_;
    a = S.clone(a);
    a.isRoot = !0;
    return [a].concat(a.children)
}
;
Nf.prototype.iterateTree_ = function(a, b) {
    var c = [{
        nodes: [a],
        parent: null,
        parentsIds: []
    }];
    a = 0;
    do {
        var d = c[a++]
          , f = d.parent
          , g = d.parentsIds;
        S.forEach(d.nodes, function(a) {
            var d = a.id;
            a.favorite || (a.parent = f,
            a.parentsIds = g,
            S.isString(d) && (a.id = f && f.id ? [f.id, d].join("-") : d),
            b(a),
            a.children && c.push({
                nodes: a.children,
                parent: d ? a : null,
                parentsIds: d ? g.concat([d]) : g
            }))
        })
    } while (a < c.length)
}
;
var Pf = function(a) {
    S = a;
    return {
        DataTree: Nf,
        OrderedDict: Mf
    }
};
k("$jscomp.scope.CollectionsService", Pf, void 0);
Pf.$inject = ["lodash"];
var Qf = function(a, b, c, d, f) {
    this.injector_ = c;
    this.enableWidgetShare = !!a.enableWidgetShare;
    this.pathPrefix = a.pathPrefix || "/trends";
    this.staticPathPrefix = a.staticPathPrefix || "/trends/static";
    this.staticResourceVersion = a.staticResourceVersion || "1";
    this.countiesStaticPathPrefix = a.countiesStaticPathPrefix || "/trends/static";
    this.jsResourcePathPrefix = a.jsResourcePathPrefix || "/trends/js";
    this.cssResourcePathPrefix = a.cssResourcePathPrefix || "/trends/css";
    this.searchApiPath = a.searchApiPath || "/trends/api/autocomplete/";
    this.locale = a.locale || "en-US";
    this.userTimezoneOffset = (new Date).getTimezoneOffset();
    this.userEmail = a.userEmail;
    this.yis2016DefaultGeo = a.yis2016DefaultGeo || "GLOBAL";
    this.defaultGeo = a.defaultGeo || "US";
    this.dialogOpen = !1;
    this.docElement = angular.element(b[0].documentElement);
    this.lodash_ = f;
    d.$watch("pageTitle", function(a) {
        b[0].title = a ? [a, "Google Trends"].join(" - ") : "Google Trends"
    })
};
k("$jscomp.scope.ConfigService", Qf, void 0);
Qf.$inject = ["$window", "$document", "$injector", "$rootScope", "lodash"];
var Rf = [{
    name: "Global",
    id: "GLOBAL"
}, {
    name: "United States",
    id: "US"
}, {
    name: "Israel",
    id: "IL"
}, {
    name: "Argentina",
    id: "AR"
}, {
    name: "Brazil",
    id: "BR"
}, {
    name: "Canada",
    id: "CA"
}, {
    name: "Chile",
    id: "CHI"
}];
e = Qf.prototype;
e.toggleDocClass = function(a, b) {
    this.docElement.toggleClass(a, b)
}
;
e.appendLocaleToURI = function(a) {
    return this.appendQueryStringToURI(a, "hl", this.locale)
}
;
e.appendQueryStringToURI = function(a, b, c) {
    var d = /\?([^#]*)(#.*)?$/;
    return d.test(a) ? a.replace(d, "?$1&" + b + "=" + c + "$2") : a + "?" + b + "=" + c
}
;
e.requestInterceptor = function(a, b) {
    -1 < b.url.indexOf("/api/") && (b.url = this.appendLocaleToURI(b.url),
    b.url = this.appendQueryStringToURI(b.url, "tz", this.userTimezoneOffset));
    return b
}
;
e.embedRequestInterceptor = function(a, b) {
    -1 < b.url.indexOf("/api/") && (a = this.injector_.get("helpersFactory").parseQueryStrings(a.location.search).ts) && (b.url += "?ts=" + a);
    return b
}
;
e.getDomainSuffix = function(a) {
    if (a.match(/localhost/))
        return "com";
    a = a.split(".");
    a.splice(0, a.indexOf("google") + 1);
    return a[0].split("/")[0]
}
;
e.isYIS2016 = function(a) {
    a || (a = window.location.pathname);
    return !!a.match(/yis\/2016/)
}
;
e.getYIS2016GeoLocation = function() {
    return window.yis2016DefaultGeo || this.getYIS2016GeoLocationData()[0].id
}
;
e.getYIS2016GeoLocationData = function() {
    return window.yis2016ListsPicker || Rf
}
;
e.getYIS2016Locale = function() {
    return window.locale || "en"
}
;
e.getSafeGeo = function(a) {
    var b = /\/trends(\/beta\/\w+)?\/yis\/2016\/(GLOBAL|[A-Za-z]{2})/i;
    a = a ? a : window.location.pathname.match(b);
    b = this.getYIS2016GeoLocation();
    return a ? a[2] : b
}
;
e.getSafeGeoName = function(a) {
    var b = this.getSafeGeo(a);
    if ("GLOBAL" === b)
        return null;
    a = this.lodash_.filter(this.getYIS2016GeoLocationData(), function(a) {
        return a.id === b
    });
    return a[0] && a[0].name || null
}
;
var Sf, Tf, Uf, Vf = function() {
    this.restrict = "E";
    this.templateUrl = "/components/embed/embed-code-preview-directive.html";
    this.scope = {
        storyId: "=",
        widgetId: "=",
        exploreParams: "=",
        exploreQuery: "=?",
        keepDataUpdated: "=",
        timestamp: "="
    };
    this.link = Sf.bind(this.link, this)
};
Vf.prototype.link = function(a, b) {
    var c = Tf.jsResourcePathPrefix
      , d = /^https?\:\/\//i.test(c);
    a.loaderScriptPathPrefix = (d ? "" : this.getSitePath_()) + c;
    a.$applyAsync(function() {
        var a = b.find("textarea");
        a.bind("click", function() {
            a[0].select()
        })
    });
    a.isYIS2016 = Tf.isYIS2016();
    a.getWidgetConfig = Sf.bindKey(this, "getWidgetConfig_", a)
}
;
Vf.prototype.getWidgetConfig_ = function(a) {
    var b = {};
    a.keepDataUpdated || (b.timeStamp = a.timestamp);
    a.exploreQuery && (b.exploreQuery = a.exploreQuery);
    a.isYIS2016 && (b.geo = Tf.getSafeGeo());
    /www\.google\.com$/.test(Uf.host()) || (b.guestPath = this.getSitePath_() + Tf.pathPrefix + "/embed/");
    return b
}
;
Vf.prototype.getSitePath_ = function() {
    var a = 80 === Uf.port() ? "" : ":" + Uf.port();
    return Uf.protocol() + "://" + Uf.host() + a
}
;
var Wf = function(a, b, c) {
    Uf = a;
    Sf = b;
    Tf = c;
    return new Vf
};
k("$jscomp.scope.directiveInjector$jscomp$22", Wf, void 0);
Wf.$inject = ["$location", "lodash", "configService"];
var Xf = function(a, b, c, d, f, g, h) {
    this.mdDialog_ = a;
    this.storyId = b;
    this.widgetId = c;
    this.exploreParams = d;
    this.timestamp = f;
    this.hasLiveData = g;
    this.keepDataUpdated = !0;
    this.exploreQuery = h
};
k("$jscomp.scope.EmbedDialogCtrl", Xf, void 0);
Xf.$inject = "$mdDialog storyId widgetId exploreParams timestamp hasLiveData exploreQuery".split(" ");
Xf.prototype.cancelDialog = function() {
    this.mdDialog_.cancel()
}
;
Xf.prototype.setSelectedTab = function(a) {
    this.activeTab = a
}
;
var Yf, Zf, $f, ag, bg = function() {
    this.restrict = "E";
    this.template = "<div></div>";
    this.scope = {
        storyId: "=",
        widgetId: "=",
        exploreParams: "=",
        timestamp: "=",
        forceMobileMode: "=",
        exploreQuery: "=?"
    };
    this.isIE_ = -1 !== Yf.navigator.userAgent.search("MSIE") || -1 !== Yf.navigator.userAgent.search("Trident");
    this.link = Zf.bind(this.link, this)
};
bg.prototype.link = function(a, b) {
    var c = {
        forceMobileMode: a.forceMobileMode,
        guestPath: $f.pathPrefix + "/embed/",
        locale: $f.locale,
        timestamp: a.timestamp,
        exploreQuery: a.exploreQuery
    };
    ag(function() {
        a.exploreParams ? oa(b[0], a.widgetId, a.exploreParams, c) : $f.isYIS2016() ? (c.geo = $f.getSafeGeo(),
        na(b[0], a.widgetId, c)) : ma(b[0], a.storyId, a.widgetId, c)
    }, this.isIE_ ? 2E3 : 1)
}
;
var cg = function(a, b, c, d) {
    Yf = a;
    ag = b;
    Zf = c;
    $f = d;
    return new bg
};
k("$jscomp.scope.directiveInjector$jscomp$23", cg, void 0);
cg.$inject = ["$window", "$timeout", "lodash", "configService"];
var dg = function(a, b, c, d, f, g, h) {
    this.htmlAngularElement_ = angular.element(a[0].documentElement);
    this.mdDialog_ = b;
    this.config = c;
    this.categories = d;
    this.geos = f;
    this.storiesFilter = g;
    this.selectionCallback_ = h;
    this.htmlAngularElement_.addClass("no-scroll")
};
k("$jscomp.scope.FilterDialogCtrl", dg, void 0);
dg.$inject = "$document $mdDialog configService categories geos storiesFilter selectionCallback".split(" ");
e = dg.prototype;
e.CancelDialogWithCallback_ = function() {
    this.htmlAngularElement_.removeClass("no-scroll");
    this.mdDialog_.cancel();
    this.selectionCallback_()
}
;
e.updateGeoFilter = function(a) {
    this.storiesFilter.geo = a;
    this.CancelDialogWithCallback_()
}
;
e.updateCategoryFilter = function(a) {
    this.storiesFilter.category = a;
    this.CancelDialogWithCallback_()
}
;
e.setFilteringGeos = function() {
    this.filteringGeos = !0
}
;
e.setFilteringCategories = function() {
    this.filteringCategories = !0
}
;
e.cancelDialog = function() {
    this.filteringGeos ? this.filteringGeos = !1 : this.filteringCategories ? this.filteringCategories = !1 : (this.htmlAngularElement_.removeClass("no-scroll"),
    this.mdDialog_.cancel())
}
;
var eg, fg, gg, hg, ig, jg, kg = function() {
    this.restrict = "E";
    this.templateUrl = "/components/filter/filter-directive.html";
    this.scope = {};
    this.categories = eg.catPicker;
    this.geos = eg.geoPicker;
    this.link = fg.bind(this.link, this)
};
kg.prototype.showMobileFilterDialog_ = function(a) {
    gg.show({
        controller: "FilterDialogCtrl",
        controllerAs: "ctrl",
        templateUrl: "/components/filter/filter-dialog.html",
        locals: {
            categories: a.categories,
            geos: a.geos,
            storiesFilter: a.storiesFilter,
            selectionCallback: a.routeWithNewFilter
        }
    })
}
;
kg.prototype.link = function(a) {
    a.config = hg;
    var b = ig.geo || a.config.defaultGeo;
    a.storiesFilter = {
        category: fg.find(this.categories, {
            id: ig.category || "all"
        }),
        geo: fg.find(this.geos, {
            id: b
        })
    };
    a.categories = this.categories;
    a.geos = this.geos;
    a.routeWithNewFilter = fg.bindKey(this, "routeWithNewFilter_", a);
    a.showMobileFilterDialog = fg.bindKey(this, "showMobileFilterDialog_", a)
}
;
kg.prototype.routeWithNewFilter_ = function(a) {
    jg.path("/home/" + a.storiesFilter.category.id + "/" + a.storiesFilter.geo.id)
}
;
var lg = function(a, b, c, d, f, g) {
    eg = a;
    ig = c;
    jg = b;
    gg = d;
    fg = f;
    hg = g;
    return new kg
};
k("$jscomp.scope.directiveInjector$jscomp$24", lg, void 0);
lg.$inject = "$window $location $routeParams $mdDialog lodash configService".split(" ");
var mg = function(a, b, c, d, f, g, h) {
    this.scope_ = a;
    this.configService_ = d;
    this.modalService_ = b;
    this.lodash_ = c;
    this.selectedGeo = f;
    this.onFiltersPick_ = g;
    this.location_ = h
};
k("$jscomp.scope.YisFilterDialogCtrl", mg, void 0);
mg.$inject = "$scope $mdDialog lodash configService currentSelectedGeo onFiltersPick $location".split(" ");
mg.prototype.hideModal = function() {
    this.modalService_.hide();
    this.scope_.$destroy()
}
;
mg.prototype.setSelectedGeo = function(a) {
    this.selectedGeo = a;
    this.onFiltersPick_(a);
    this.hideModal()
}
;
mg.prototype.showModal = function() {
    this.yis2016SGeoOptions = this.configService_.getYIS2016GeoLocationData();
    this.modalService_.show({
        controller: this.lodash_.constant(this),
        controllerAs: "ctrl",
        scope: this.scope_,
        templateUrl: "/components/filter/yis-filter-dialog.html",
        clickOutsideToClose: !0,
        preserveScope: !0
    })
}
;
var og, pg, qg, rg = function() {
    this.restrict = "E";
    this.templateUrl = "/components/filter/yis-filter-directive.html";
    this.scope = {
        selectedGeo: "="
    };
    this.yis2016DefaultGeoId = window.yis2016DefaultGeo || "GLOBAL";
    this.link = og.bind(this.link, this)
};
rg.prototype.link = function(a) {
    a.staticPathPrefix = pg.staticPathPrefix;
    a.selectedGeo = this.getSelectedGeo();
    a.showYisCountryFilterDialogBind = og.bindKey(this, "showYisCountryFilterDialog", a)
}
;
rg.prototype.getSelectedGeo = function() {
    return this.getSelectedGeoById(this.scope.selectedGeo.id || this.yis2016DefaultGeoId)
}
;
rg.prototype.getSelectedGeoById = function(a) {
    return og.find(pg.getYIS2016GeoLocationData(), {
        id: a
    })
}
;
rg.prototype.showYisCountryFilterDialog = function(a) {
    qg("YisFilterDialogCtrl", {
        $scope: a.$new(),
        onFiltersPick: function(b) {
            a.selectedGeo = b
        },
        currentSelectedGeo: a.selectedGeo
    }).showModal()
}
;
var sg = function(a, b, c, d, f) {
    qg = a;
    og = b;
    pg = f;
    return new rg
};
k("$jscomp.scope.directiveInjector$jscomp$25", sg, void 0);
sg.$inject = ["$controller", "lodash", "$mdDialog", "$location", "configService"];
var tg, ug = function() {
    this.restrict = "E";
    this.scope = {
        errorMessage: "=",
        isEmptyState: "="
    };
    this.templateUrl = "/components/layout/error-directive.html";
    this.link = tg.bind(this.link, this)
};
ug.prototype.link = function() {}
;
var vg = function(a) {
    tg = a;
    return new ug
};
k("$jscomp.scope.directiveInjector$jscomp$26", vg, void 0);
vg.$inject = ["lodash"];
var wg, xg, yg, zg = function() {
    this.restrict = "E";
    this.templateUrl = "/components/layout/grid-directive.html";
    this.scope = {
        gridContentArray: "=",
        storyId: "="
    };
    this.numberOfColumns = 3;
    this.link = wg.bind(this.link, this)
};
zg.prototype.generateYis2016WidgetShareTitle = function(a) {
    var b = xg.getSafeGeoName()
      , c = {
        widgetTitle: a
    };
    b ? (a = "See the top trending {widgetTitle} in {countryName} for 2016, from Google Trends.",
    c.countryName = b) : a = "See the top trending {widgetTitle} globally for 2016, from Google Trends.";
    return (new Ra(a)).format(c)
}
;
zg.prototype.link = function(a) {
    a.generateYis2016WidgetShareTitleBind = wg.bind(this.generateYis2016WidgetShareTitle, this);
    var b = wg.bindKey(this, "updateNumberOfColumnsByScreenWidth_", a);
    angular.element(yg).bind("resize", b);
    this.updateNumberOfColumnsByScreenWidth_(a);
    a.$watch("gridContentArray", wg.bindKey(this, "createGridContentMatrix_", a), !0)
}
;
zg.prototype.updateNumberOfColumnsByScreenWidth_ = function(a) {
    var b = yg.innerWidth
      , c = 3;
    808 > b ? c = 1 : 808 <= b && 1211 >= b && (c = 2);
    this.numberOfColumns = c;
    this.createGridContentMatrix_(a)
}
;
zg.prototype.createGridContentMatrix_ = function(a) {
    var b = this
      , c = [];
    wg.forEach(a.gridContentArray, function(a, f) {
        f %= b.numberOfColumns;
        c[f] = c[f] || [];
        c[f].push(a)
    });
    a.gridContentMatrix = c
}
;
var Ag = function(a, b, c) {
    yg = a;
    wg = b;
    xg = c;
    return new zg
};
k("$jscomp.scope.directiveInjector$jscomp$27", Ag, void 0);
Ag.$inject = ["$window", "lodash", "configService"];
var Bg, Cg, Dg, Eg, Fg, Gg, Hg, Ig = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/components/layout/header-directive.html";
    this.transclude = !0;
    this.scope = {
        pageTitle: "@?",
        pageSubTitle: "@?",
        backgroundImage: "@?",
        enableSearch: "=?",
        enableScrollOpacity: "=?",
        bodyScroll: "=?",
        shareConfig: "=?",
        isHomePage: "=",
        pageLayout: "=?",
        storyPromise: "=?",
        parentStoryId: "=?",
        contentOverlap: "=?",
        backColor: "@?"
    };
    this.oneGoogleElement_ = null;
    this.isOneGoogleEmailMode_ = !1;
    this.isIE10_ = /msie/gi.test(Bg.navigator.userAgent) && 10 == document.documentMode;
    this.controller = function(c) {
        b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"];
    this.link = Cg.bind(this.link, this)
};
e = Ig.prototype;
e.controller = function(a) {
    a.isIE10 = this.isIE10_;
    a.homeClickHandler = this.homeClickHandler_;
    a.imageLoaded = !1;
    a.showShadow = !1;
    a.hideHeaderContent = !1;
    a.blockButtonsInHeaderOnScroll = !0;
    a.showMobileStoryVersionDialog = Cg.bindKey(this, "showMobileStoryVersionDialog_");
    Cg.defaults(a, {
        bodyScroll: 0,
        contentOverlap: 0,
        enableSearch: !0,
        enableScrollOpacity: !1
    })
}
;
e.link = function(a, b) {
    var c = b.find("img")
      , d = Cg.bindKey(this, "onImageLoad_", a)
      , f = Cg.bindKey(this, "onScroll_", a, b);
    a.backColorRulesBind = Cg.bindKey(this, "backColorRules_", a);
    angular.element(b[0].querySelector(".onebar-container")).append(this.detachOneGoogleElement_());
    a.isOneGoogleEmailMode = this.isOneGoogleEmailMode_;
    c.bind("load", d);
    Dg.bind("scroll", f);
    a.$on("$destroy", function() {
        c.unbind("load", d);
        Dg.unbind("scroll", f)
    });
    a.storyPromise && a.storyPromise.then(function(b) {
        b = b.data.pageLayout;
        var c = Eg;
        a.isEmptyStory = b === c.EMPTY_STORY;
        a.isYisHub = b === c.YEAR_IN_SEARCH_2015_HUB || b === c.YEAR_IN_SEARCH_2016_HUB;
        a.isYisStory = b === c.YEAR_IN_SEARCH_2015_STORY;
        a.isYisGoobers = b === c.OLYMPICS_2016_GOOBERS
    })
}
;
e.homeClickHandler_ = function() {
    Fg.homeClickHandler && Fg.homeClickHandler()
}
;
e.getIsDesktopMode_ = function() {
    return Gg.isDesktopMode
}
;
e.getPageYOffset_ = function() {
    var a = Bg.pageYOffset;
    1 === a && (a = 0);
    return a
}
;
e.onScroll_ = function(a, b) {
    if (!Fg.dialogOpen) {
        var c = b[0].offsetHeight;
        a.isDesktopWidth = this.getIsDesktopMode_();
        a.bodyScroll = this.getPageYOffset_();
        var d = Dg[0].querySelector(".header-topbar").offsetHeight;
        b = c - (a.isDesktopWidth ? d : a.contentOverlap);
        c && (a.showShadow = c - d <= a.bodyScroll);
        a.hideHeaderContent = this.isHideHeaderContent_(a, c);
        a.blockButtonsInHeaderOnScroll = this.shouldBlockButtonsInHeader_(a);
        121 >= c && c && (b = c - 9,
        a.showShadow = c - 9 <= a.bodyScroll);
        c = a.contentOverlap / b * a.bodyScroll;
        a.imageOpacityPercentage = a.bodyScroll / b;
        a.bottomMargin = c < a.contentOverlap ? c : a.contentOverlap;
        a.$$phase || a.$apply()
    }
}
;
e.onImageLoad_ = function(a) {
    a.imageLoaded = !0;
    a.$applyAsync()
}
;
e.isHideHeaderContent_ = function(a, b) {
    var c = a.pageLayout
      , d = Eg;
    return a.bodyScroll > (c === d.YEAR_IN_SEARCH_2015_STORY || c === d.YEAR_IN_SEARCH_2015_HUB ? b / 5 : 0)
}
;
e.isElectionsStory_ = function(a) {
    a = a.pageLayout;
    var b = Eg;
    return a === b.ELECTIONS_2016_HUB_PRESIDENT || a === b.ELECTIONS_2016_HUB_VP || a === b.ELECTIONS_2016_HUB_TICKET || a === b.ELECTIONS_2016_STATE_STORY || a === b.ELECTIONS_2016_CANDIDATE_STORY
}
;
e.shouldBlockButtonsInHeader_ = function(a) {
    return !this.isElectionsStory_(a)
}
;
e.backColorRules_ = function(a) {
    return this.isElectionsStory_(a) ? "#607D8B" : a.backColor ? a.backColor : "#4285F4"
}
;
e.detachOneGoogleElement_ = function() {
    if (!this.oneGoogleElement_ && (this.oneGoogleElement_ = angular.element(Dg[0].getElementById("one-google")).detach(),
    this.oneGoogleElement_.length)) {
        var a = angular.element(this.oneGoogleElement_[0].querySelector("#gb > div > div > div:last-child > div:first-child a"));
        this.isOneGoogleEmailMode_ = !(!a.find("span") || !a.text())
    }
    return this.oneGoogleElement_
}
;
e.showMobileStoryVersionDialog_ = function() {
    Hg.show({
        controller: "StoryVersionDialogCtrl",
        controllerAs: "ctrl",
        templateUrl: "/storypage/storypage-version-mobile-dialog.html"
    })
}
;
var Jg = function(a, b, c, d, f, g, h) {
    Bg = a;
    Dg = b;
    Hg = c;
    Cg = d;
    Fg = f;
    Gg = g;
    Eg = h.pageLayouts;
    return new Ig
};
k("$jscomp.scope.directiveInjector$jscomp$28", Jg, void 0);
Jg.$inject = "$window $document $mdDialog lodash configService globalsService storyService".split(" ");
var Kg, Lg, Mg = function() {
    this.restrict = "E";
    this.templateUrl = "/components/layout/loader-directive.html";
    this.link = Kg.bind(this.link, this)
};
Mg.prototype.link = function(a) {
    a.isMobile = this.isMobile_()
}
;
Mg.prototype.isMobile_ = function() {
    return /iP(hone|od|ad)|Android/.test(Lg.navigator.userAgent)
}
;
var Ng = function(a, b) {
    Lg = a;
    Kg = b;
    return new Mg
};
k("$jscomp.scope.directiveInjector$jscomp$29", Ng, void 0);
Ng.$inject = ["$window", "lodash"];
var Og, Pg, Qg, Rg, Sg = function() {
    this.restrict = "E";
    this.template = "<div></div>";
    this.scope = {
        onTrigger: "&"
    };
    this.isTouchDevice_ = !!("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    this.link = Og.bind(this.link, this)
};
e = Sg.prototype;
e.bindTouchEvents_ = function(a) {
    var b = Pg
      , c = Og.bindKey(this, "onTouchStart_", a)
      , d = Og.bindKey(this, "onTouchMove_", a)
      , f = Og.bindKey(this, "onTouchEnd_", a);
    b.bind("touchstart", c);
    b.bind("touchmove", d);
    b.bind("touchend", f);
    a.$on("$destroy", function() {
        b.unbind("touchstart", c);
        b.unbind("touchmove", d);
        b.unbind("touchend", f)
    })
}
;
e.getViewportTop_ = function() {
    return Qg.pageYOffset
}
;
e.link = function(a) {
    a.config = Rg;
    a.isScrollAtTop = !1;
    a.threshold = 0;
    this.isTouchDevice_ && this.bindTouchEvents_(a)
}
;
e.calcTouchRatio_ = function(a, b) {
    return Math.abs((a.clientY - b.clientY) / (a.clientX - b.clientX || 1E-4))
}
;
e.onTouchStart_ = function(a, b) {
    a.isScrollAtTop = 0 === this.getViewportTop_();
    a.threshold = 0;
    a.startTouch = b.touches[0]
}
;
e.onTouchMove_ = function(a) {
    0 === this.getViewportTop_() ? a.threshold++ : (a.isScrollAtTop = !1,
    a.threshold = 0)
}
;
e.onTouchEnd_ = function(a, b) {
    b = this.calcTouchRatio_(a.startTouch, b.changedTouches[0]);
    if (0 === this.getViewportTop_() && a.isScrollAtTop && 1 <= b && 20 <= a.threshold)
        a.onTrigger()
}
;
var Tg = function(a, b, c, d) {
    Pg = a;
    Qg = b;
    Og = c;
    Rg = d;
    return new Sg
};
k("$jscomp.scope.directiveInjector$jscomp$30", Tg, void 0);
Tg.$inject = ["$document", "$window", "lodash", "configService"];
var Ug, Vg, Wg, Xg, Yg, Zg, $g, ah, bh = function() {
    this.restrict = "E";
    this.templateUrl = "/components/layout/sidenav-directive.html";
    this.link = Ug.bind(this.link, this)
};
e = bh.prototype;
e.getHostName_ = function() {
    return window.location.hostname
}
;
e.getDomainSuffix_ = function(a) {
    a = a.split(".");
    a.splice(0, a.indexOf("google") + 1);
    return a.join(".")
}
;
e.getGoogleHost = function(a) {
    if (a.match(/localhost/))
        return "www.google.com";
    var b = this.getDomainSuffix_(a);
    return -1 < a.indexOf(".corp.google.") || -1 < a.indexOf(".sandbox.google.") ? "www.google." + b : a
}
;
e.link = function(a, b) {
    var c = angular.element(Vg)
      , d = Ug.bindKey(this, "onResize_", a)
      , f = Ug.bindKey(this, "onScroll_", a)
      , g = Ug.bindKey(this, "isWindowScrollOpen_")
      , h = Ug.bind(this.sideNavEventHandler_, this, a);
    a.config = Wg;
    a.google_host = this.getGoogleHost(this.getHostName_());
    a.htmlSelector = this.getDocumentElement_();
    a.sidenavListWrapper = angular.element(b[0].querySelector(".fe-sidenav-list-wrapper"));
    a.sidenavListHeader = angular.element(b[0].querySelector(".fe-sidenav-header"));
    a.sidenavListFooter = angular.element(b[0].querySelector(".fe-sidenav-footer"));
    a.sendFeedback = Ug.bind(this.sendFeedback_, this, a);
    a.$watch(g, h);
    a.toggleSidenav = function() {
        Xg("left").toggle()
    }
    ;
    c.bind("resize", d);
    a.sidenavListWrapper.bind("scroll", f);
    a.$on("$destroy", function() {
        c.unbind("resize", d);
        a.sidenavListWrapper.unbind("scroll", f)
    })
}
;
e.isWindowScrollOpen_ = function() {
    return Yg.get("left") ? Xg("left").isOpen() : !1
}
;
e.getDocumentElement_ = function() {
    return angular.element(Zg[0].documentElement)
}
;
e.onResize_ = function(a) {
    this.setSideNavWidth_(a);
    this.onScroll_(a)
}
;
e.onScroll_ = function(a) {
    a.scrollTimeout && $g.cancel(a.scrollTimeout);
    a.scrollTimeout = $g(Ug.bindKey(this, "setListBoxShadow_", a), 50)
}
;
e.sendFeedback_ = function(a) {
    try {
        window.userfeedback.api.startFeedback({
            productId: "84900",
            productVersion: "narrator v1.0",
            locale: a.config.locale
        })
    } catch (b) {}
    return !1
}
;
e.setListBoxShadow_ = function(a) {
    0 != a.sidenavListWrapper[0].scrollTop ? a.sidenavListHeader.addClass("scrollable-items-above") : a.sidenavListHeader.removeClass("scrollable-items-above");
    a.sidenavListWrapper[0].scrollHeight > a.sidenavListWrapper[0].scrollTop + a.sidenavListWrapper[0].offsetHeight ? a.sidenavListFooter.addClass("scrollable-items-below") : a.sidenavListFooter.removeClass("scrollable-items-below")
}
;
e.setSideNavWidth_ = function(a) {
    var b = a.htmlSelector[0].offsetWidth - 56;
    a.sideNavWidth = a.htmlSelector[0].offsetWidth < ah.mobileWidth ? b : 288
}
;
e.sideNavEventHandler_ = function(a, b) {
    b ? (this.onResize_(a),
    a.htmlSelector.addClass("no-scroll")) : a.htmlSelector.removeClass("no-scroll")
}
;
var ch = function(a, b, c, d, f, g, h, m) {
    Vg = a;
    Zg = b;
    $g = c;
    Xg = d;
    Yg = f;
    Ug = g;
    Wg = h;
    ah = m;
    return new bh
};
k("$jscomp.scope.directiveInjector$jscomp$31", ch, void 0);
ch.$inject = "$window $document $timeout $mdSidenav $mdComponentRegistry lodash configService globalsService".split(" ");
ch.cls = bh;
var dh, eh, fh = function() {
    this.restrict = "A";
    this.scope = {
        switchOn: "=",
        switchOff: "=",
        switchValue: "="
    };
    this.link = dh.bind(this.link, this)
};
fh.prototype.link = function(a, b) {
    b = dh.bindKey(this, "setSwitchImages_", a, b);
    b();
    a.$watch("switchValue", b)
}
;
fh.prototype.setSwitchImages_ = function(a, b) {
    a = a.switchValue ? a.switchOff : a.switchOn;
    angular.element(b[0].querySelector("._md-thumb")).css("background-image", "url(" + eh.staticPathPrefix + "/" + a + ")")
}
;
var gh = function(a, b) {
    dh = a;
    eh = b;
    return new fh
};
k("$jscomp.scope.directiveInjector$jscomp$32", gh, void 0);
gh.$inject = ["lodash", "configService"];
var hh = function(a, b) {
    this.isDeviceSupported_(b) || (a.showUnsupportedMsg = !0)
};
k("$jscomp.scope.UnsupportedDeviceCtrl", hh, void 0);
hh.$inject = ["$scope", "$window"];
hh.prototype.isDeviceSupported_ = function(a) {
    a = a.navigator.userAgent;
    var b = !0;
    /iP(hone|od|ad)/.test(a) ? 7 > parseInt(a.match(/OS ([\d_]+)/)[1]) && (b = !1) : /Android/.test(a) && 4.4 > parseFloat(a.match(/Android ([\d.]+)/)[1]) && (b = !1);
    return b
}
;
var ih = function(a) {
    return function(b, c) {
        var d = [];
        a.forEach(b, function(a) {
            a.id == c || a == c ? d.unshift(a) : d.push(a)
        });
        return d
    }
};
k("$jscomp.scope.OrderBySelectedOptionFilter", ih, void 0);
ih.$inject = ["lodash"];
var T = function() {};
k("$jscomp.scope.PaletteService", T, void 0);
T.$inject = ["$window", "lodash"];
T.COLOR_PALETTE_1_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Red",
    hexvalue: "#DB4437"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_2_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Red",
    hexvalue: "#DB4437"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_3_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Red",
    hexvalue: "#DB4437"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_4_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Red",
    hexvalue: "#DB4437"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_5_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Purple",
    hexvalue: "#AB47BC"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Yellow",
    hexvalue: "#F4B400"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Blue",
    hexvalue: "#4285F4"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Green",
    hexvalue: "#0F9D58"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Red",
    hexvalue: "#DB4437"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_6_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Indigo",
    hexvalue: "#3F51B5"
}, {
    name: "PALETTE_COLOR_2",
    caption: "DeepOrange",
    hexvalue: "#FF5722"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Teal",
    hexvalue: "#009688"
}, {
    name: "PALETTE_COLOR_4",
    caption: "DeepPurple",
    hexvalue: "#673AB7"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Cyan",
    hexvalue: "#00BCD4"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_7_ = [{
    name: "PALETTE_COLOR_1",
    caption: "DeepOrange",
    hexvalue: "#FF5722"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Indigo",
    hexvalue: "#3F51B5"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Teal",
    hexvalue: "#009688"
}, {
    name: "PALETTE_COLOR_4",
    caption: "DeepPurple",
    hexvalue: "#673AB7"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Cyan",
    hexvalue: "#00BCD4"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_8_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Teal",
    hexvalue: "#009688"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Indigo",
    hexvalue: "#3F51B5"
}, {
    name: "PALETTE_COLOR_3",
    caption: "DeepOrange",
    hexvalue: "#FF5722"
}, {
    name: "PALETTE_COLOR_4",
    caption: "DeepPurple",
    hexvalue: "#673AB7"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Cyan",
    hexvalue: "#00BCD4"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_9_ = [{
    name: "PALETTE_COLOR_1",
    caption: "DeepPurple",
    hexvalue: "#673AB7"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Teal",
    hexvalue: "#009688"
}, {
    name: "PALETTE_COLOR_3",
    caption: "DeepOrange",
    hexvalue: "#FF5722"
}, {
    name: "PALETTE_COLOR_4",
    caption: "Indigo",
    hexvalue: "#3F51B5"
}, {
    name: "PALETTE_COLOR_5",
    caption: "Cyan",
    hexvalue: "#00BCD4"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.COLOR_PALETTE_10_ = [{
    name: "PALETTE_COLOR_1",
    caption: "Cyan",
    hexvalue: "#00BCD4"
}, {
    name: "PALETTE_COLOR_2",
    caption: "Teal",
    hexvalue: "#009688"
}, {
    name: "PALETTE_COLOR_3",
    caption: "Indigo",
    hexvalue: "#3F51B5"
}, {
    name: "PALETTE_COLOR_4",
    caption: "DeepPurple",
    hexvalue: "#673AB7"
}, {
    name: "PALETTE_COLOR_5",
    caption: "DeepOrange",
    hexvalue: "#FF5722"
}, {
    name: "PALETTE_COLOR_6",
    caption: "Grey",
    hexvalue: "#9E9E9E"
}];
T.prototype.getByThemeName = function(a) {
    a = (a || "").match(/^Color([0-9]{1,2})$/);
    var b;
    a && (b = T["COLOR_PALETTE_" + a[1] + "_"]);
    return b
}
;
var jh = function(a, b, c, d, f, g) {
    this.lodash_ = a;
    this.mdDialog = b;
    this.config = c;
    this.selectedTabIndex = 0;
    this.isPageRtl = g.isPageRtl();
    this.archiveRadioGroup = "date_range";
    this.minDate = new Date(f ? 2004 : 2008,0,1);
    b = new Date;
    b.setMinutes(0);
    b.setSeconds(0);
    this.today = b;
    this.years = a.range(b.getFullYear(), (f ? 2004 : 2008) - 1, -1);
    this.pastWeek = this.getPastWeekOptions_(b);
    this.hours = this.getHoursOptions_();
    this.rangeFrom = new Date(b);
    this.rangeFrom.setMonth(b.getMonth() - 1);
    this.rangeTo = b;
    this.fullYear = b.getFullYear();
    this.fromDay = this.pastWeek[6].id;
    this.fromTime = 1;
    this.toDay = this.pastWeek[0].id;
    this.toTime = 1;
    this.setSelection_(d)
};
k("$jscomp.scope.CustomDatePickerDialogCtrl", jh, void 0);
jh.$inject = "lodash $mdDialog configService selectedOptionId isWebSearch bidiService".split(" ");
e = jh.prototype;
e.getSelection = function() {
    var a, b;
    0 === this.selectedTabIndex ? this.isDateRangeRadioSelected_() ? b = a = this.formatDate_(this.rangeFrom) + " " + this.formatDate_(this.rangeTo) : (a = this.fullYear + "-01-01 " + this.fullYear + "-12-31",
    b = this.fullYear) : b = a = this.formatDateTime_(this.fromDay, this.fromTime) + " " + this.formatDateTime_(this.toDay, this.toTime);
    return {
        id: a,
        name: b
    }
}
;
e.setSelection_ = function(a) {
    if (a) {
        var b = [];
        a.replace(/(2\d{3})-([0-1]\d)-([0-3]\d)(?:T([0-2]\d))?/g, function(a, d, f, g, h) {
            b.push({
                year: d,
                month: f,
                day: g,
                hours: h
            })
        });
        2 === b.length && (b[0].hours && b[1].hours ? (a = new Date(Date.UTC(b[0].year, b[0].month - 1, b[0].day, b[0].hours)),
        this.fromDay = this.getDateOfWeek_(a, this.pastWeek),
        this.fromTime = a.getHours(),
        a = new Date(Date.UTC(b[1].year, b[1].month - 1, b[1].day, b[1].hours)),
        this.toDay = this.getDateOfWeek_(a, this.pastWeek),
        this.toTime = a.getHours(),
        this.selectedTabIndex = 1) : b[0].year === b[1].year && "01" === b[0].month && "01" === b[0].day && "12" === b[1].month && "31" === b[1].day ? (this.fullYear = b[0].year,
        this.selectedTabIndex = 0,
        this.archiveRadioGroup = "full_year") : (this.rangeFrom = new Date(b[0].year,b[0].month - 1,b[0].day),
        this.rangeTo = new Date(b[1].year,b[1].month - 1,b[1].day),
        this.selectedTabIndex = 0))
    }
}
;
e.padTime_ = function(a) {
    return (10 > a ? "0" : "") + a
}
;
e.formatDate_ = function(a) {
    return [a.getFullYear(), this.padTime_(a.getMonth() + 1), this.padTime_(a.getDate())].join("-")
}
;
e.formatDateTime_ = function(a, b) {
    a = new Date(a);
    a.setHours(b);
    return a.toJSON().split(":", 1)[0]
}
;
e.getDateOfWeek_ = function(a, b) {
    for (var c = 0; c < b.length; c++)
        if (b[c].id.getDate() === a.getDate())
            return b[c].id;
    return null
}
;
e.getPastWeekOptions_ = function(a) {
    var b = new Date(a)
      , c = /^([a-z]{3}) ([a-z]{3}) (\d{1,2}).*/i;
    return this.lodash_.times(7, function() {
        var a = {
            id: new Date(b),
            name: b.toDateString().replace(c, "$1, $2 $3")
        };
        b.setDate(b.getDate() - 1);
        return a
    })
}
;
e.getHoursOptions_ = function() {
    for (var a = [], b = 1; 24 > b; b++)
        a.push({
            id: b,
            name: this.padTime_(b) + ":00"
        });
    a.push({
        id: 0,
        name: "00:00"
    });
    return a
}
;
e.isDateRangeRadioSelected_ = function() {
    return "date_range" === this.archiveRadioGroup
}
;
e.validatePastWeekSelection = function() {
    this.pastWeekInvalid = this.fromDay > this.toDay || this.fromDay === this.toDay && this.fromTime >= this.toTime ? !0 : !1
}
;
e.isDialogValid = function(a) {
    return 1 === this.selectedTabIndex && !this.pastWeekInvalid || 0 === this.selectedTabIndex && ("date_range" !== this.archiveRadioGroup || a && !a.$invalid)
}
;
var kh, lh, mh, nh = function() {
    this.restrict = "E";
    this.templateUrl = "/components/pickers/custom-date-picker-directive.html";
    this.scope = {
        appendCustom: "=?",
        isWebSearch: "=",
        mdContainerClass: "@?",
        onChange: "&?",
        onCancel: "&?",
        ngModel: "=?",
        onCreate: "&?",
        options: "&"
    };
    this.link = kh.bind(this.link, this)
};
e = nh.prototype;
e.link = function(a) {
    a.$watch("ngModel", kh.bindKey(this, "modelSetter_", a));
    a.$watch("options", kh.bindKey(this, "optionsSetter_", a));
    a.changeHandler = kh.bindKey(this, "changeHandler_", a);
    a.addDialogContainerClass = kh.bindKey(this, "addDialogContainerClass_")
}
;
e.modelSetter_ = function(a) {
    var b = a.ngModel && a.ngModel.id ? a.ngModel : {
        id: ""
    };
    a.selectedOption && a.selectedOption.id === b.id ? a.selectedOption.name = b.name : (b.name || this.setupOptionName_(a, b),
    a.prevSelectedOption = b,
    a.selectedOption = a.prevSelectedOption,
    this.sortOptions_(a))
}
;
e.setupOptionName_ = function(a, b) {
    var c = b.id.match(/(2\d{3})-01-01 (\1)-12-31/);
    c ? b.name = c[1] : (a = a.options().getNodeByID(b.id),
    b.name = a && a.name)
}
;
e.optionsSetter_ = function(a) {
    var b = a.options().iterator();
    if (a.onCreate)
        a.onCreate(a.selectedOption);
    a.completeOptions = a.appendCustom ? b.concat({
        id: "CUSTOM",
        name: "Custom time range..."
    }) : kh.clone(b);
    this.sortOptions_(a)
}
;
e.changeHandler_ = function(a, b) {
    a.selectedOption = b || a.selectedOption;
    if (a.selectedOption.id !== a.prevSelectedOption.id)
        if ("CUSTOM" === a.selectedOption.id)
            a.selectedOption = a.prevSelectedOption,
            lh(kh.bindKey(this, "showDialog_", a), 250);
        else if (a.prevSelectedOption = a.selectedOption,
        a.ngModel.id = a.selectedOption.id,
        a.ngModel.name = a.selectedOption.name,
        this.sortOptions_(a),
        a.onChange)
            a.onChange(kh.assign({
                isPreset: !0
            }, b))
}
;
e.showDialog_ = function(a) {
    mh.show({
        clickOutsideToClose: !0,
        controller: "CustomDatePickerDialogCtrl",
        controllerAs: "ctrl",
        locals: {
            selectedOptionId: a.selectedOption.id,
            isWebSearch: a.isWebSearch
        },
        onComplete: a.addDialogContainerClass,
        templateUrl: "/components/pickers/custom-date-picker-dialog.html"
    }).then(kh.bindKey(this, "dialogChangeHandler_", a), a.onCancel)
}
;
e.dialogChangeHandler_ = function(a, b) {
    a.selectedOption = {
        id: b.id
    };
    a.prevSelectedOption = a.selectedOption;
    a.sortedOptions = kh.clone(a.completeOptions);
    a.sortedOptions.unshift(a.selectedOption);
    a.ngModel = b;
    if (a.onChange)
        a.onChange({
            isPreset: !1
        })
}
;
e.sortOptions_ = function(a) {
    var b = []
      , c = !1;
    kh.forEach(a.completeOptions, function(d) {
        a.selectedOption && d.id === a.selectedOption.id ? (b.unshift(a.selectedOption),
        c = !0) : b.push(d)
    }, a);
    c || b.unshift(a.selectedOption);
    a.sortedOptions = b
}
;
e.addDialogContainerClass_ = function(a, b) {
    b.addClass("fix-dialog-z-index")
}
;
var oh = function(a, b, c, d) {
    kh = a;
    mh = b;
    lh = d;
    return new nh
};
k("$jscomp.scope.directiveInjector$jscomp$33", oh, void 0);
oh.$inject = ["lodash", "$mdDialog", "$document", "$timeout"];
var ph, qh, rh, sh, th = function(a) {
    this.scope_ = a;
    this.zoomedNode = this.searchQuery = this.dataTree = null;
    a.$watch("data", ph.bindKey(this, "onInputChange_"))
};
e = th.prototype;
e.getNodeOrRoot_ = function(a) {
    return ph.isUndefined(a) || ph.isNull(a) ? this.dataTree.rootNode : this.dataTree.getNodeByID(a)
}
;
e.getResults = function(a) {
    if (a)
        return this.dataTree.getNodesByQuery(a, 20);
    a = this.getSelectedNode();
    return this.dataTree.iterator(this.zoomedNode ? this.zoomedNode : a && a.parent)
}
;
e.getSelectedNode = function() {
    return this.getNodeOrRoot_(this.scope_.ngModel)
}
;
e.onInputChange_ = function(a) {
    if (a && (this.dataTree = a,
    this.scope_.onCreate))
        this.scope_.onCreate(this.getSelectedNode())
}
;
e.setSelectedNode = function(a, b) {
    this.scope_.ngModel !== a && (this.scope_.ngModel = a,
    b = !0);
    b && this.scope_.onChange && this.scope_.$applyAsync(ph.bind(function() {
        this.scope_.onChange(this.getSelectedNode())
    }, this))
}
;
e.zoomIntoNode = function(a, b) {
    this.searchQuery = "";
    this.zoomedNode = this.getNodeOrRoot_(a);
    b && (b.preventDefault(),
    b.stopPropagation())
}
;
var uh = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/components/pickers/hierarchy-picker-directive.html";
    this.scope = {
        data: "=",
        ngModel: "=?",
        onChange: "&?",
        onCreate: "&?",
        showBreadcrumbs: "=?"
    };
    this.controller = function(c) {
        return b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"];
    this.link = ph.bind(this.link, this)
};
e = uh.prototype;
e.bindDesktopUI_ = function(a, b) {
    var c = this
      , d = b.find("md-autocomplete-wrap").scope().$mdAutocompleteCtrl
      , f = qh[0].querySelector("md-virtual-repeat-container #ul-" + d.id).parentNode.parentNode.parentNode;
    a.inputElement = b.find("input");
    a.mdAutocompleteCtrl = d;
    a.focus = ph.bindKey(this, "focus", a);
    f.classList.add("hierarchy-repeat");
    a.mdAutocompleteCtrl.focus = ph.wrap(a.mdAutocompleteCtrl.focus, function(b) {
        a.$applyAsync(b)
    });
    a.$watch(function() {
        return d.hidden && a.inputElement[0] !== document.activeElement
    }, function(b) {
        b && c.blur(a)
    })
}
;
e.blur = function(a) {
    a.hasFocus && (a.hasFocus = !1,
    a.ctrl.zoomedNode = null,
    a.$applyAsync(),
    a.ctrl.searchQuery && rh(function() {
        a.mdAutocompleteCtrl.clear()
    }, 250))
}
;
e.controller = function(a) {
    ph.defaults(a, {
        showBreadcrumbs: !1
    });
    var b = new th(a);
    return a.ctrl = b
}
;
e.focus = function(a) {
    a.hasFocus || (a.hasFocus = !0,
    a.$applyAsync(),
    rh(function() {
        a.inputElement.focus()
    }, 250))
}
;
e.link = function(a, b) {
    a.hasFocus = !1;
    a.blur = ph.bindKey(this, "blur", a);
    sh.isDesktopMode && rh(ph.bindKey(this, "bindDesktopUI_", a, b), 250)
}
;
var vh = function(a, b, c, d) {
    qh = a;
    rh = b;
    ph = c;
    sh = d;
    return new uh
};
k("$jscomp.scope.directiveInjector$jscomp$34", vh, void 0);
vh.$inject = ["$document", "$timeout", "lodash", "globalsService"];
var U, wh, xh, yh, zh, Ah, Bh = function() {
    this.restrict = "E";
    this.templateUrl = "/components/search/autocomplete-directive.html";
    this.scope = {
        disableCache: "@"
    };
    this.link = U.bind(this.link, this)
};
e = Bh.prototype;
e.getAutoCompleteList = function(a, b) {
    return a.searchServ.getAutoCompleteList(a, b)
}
;
e.link = function(a, b) {
    a.config = wh;
    a.searchServ = xh;
    a.element = b;
    a.mdAutocompleteCtrl = b.find("md-autocomplete-wrap").scope().$mdAutocompleteCtrl;
    U.delay(U.bindKey(this, "updateModalClassName_", a), 250);
    U.defaults(a, {
        disableCache: !1
    });
    a.clearInput = U.bindKey(this, "clearInput_", a);
    a.textChangeHandler = U.bind(this.setInputClass_, this, a);
    this.setInputClass_(a);
    U.delay(this.bindInputEvents_, 300, this, a);
    a.$watch("acSelectedItem", U.bindKey(this, "onSelectedItemClick_"));
    a.getAutoCompleteList = U.bindKey(this, "getAutoCompleteList", a);
    a.navigateByEntity = U.bindKey(this, "navigateByEntity")
}
;
e.updateModalClassName_ = function(a) {
    yh[0].querySelector("md-virtual-repeat-container #ul-" + a.mdAutocompleteCtrl.id).parentNode.parentNode.parentNode.classList.add("search-repeat")
}
;
e.bindInputEvents_ = function(a, b) {
    var c = b.element.find("input")
      , d = U.bindKey(a, "onInputBlur_", b);
    c.bind("blur", d);
    var f = U.bindKey(a, "onInputFocus_", b);
    c.bind("focus", f);
    var g = U.bindKey(a, "onInputKeyEvent_", b);
    c.bind("keyup", g);
    b.$on("$destroy", function() {
        c.unbind("blur", d);
        c.unbind("focus", f);
        c.unbind("keyup", g)
    })
}
;
e.navigateByEntity = function(a) {
    if (a) {
        var b = zh.trackEvent("General", "Search", a);
        b ? b.then(this.navigate_(a)) : this.navigate_(a)
    }
}
;
e.navigate_ = function(a) {
    window.location = wh.pathPrefix + "/explore?q=" + encodeURIComponent(a);
    Ah.hide()
}
;
e.setInputClass_ = function(a) {
    0 < a.searchServ.lastInput.length ? a.element.addClass("has-input") : a.element.removeClass("has-input")
}
;
e.onSelectedItemClick_ = function(a) {
    a && this.navigateByEntity(a.mid)
}
;
e.onInputFocus_ = function(a) {
    a.element.addClass("has-focus");
    if (0 < a.searchServ.lastInput.length) {
        a.element.addClass("has-input");
        a.mdAutocompleteCtrl.hidden = !1;
        var b = a.$root.$$phase;
        "$apply" !== b && "$digest" !== b && a.$apply()
    }
}
;
e.onInputBlur_ = function(a) {
    U.delay(function() {
        a.element.removeClass("has-focus");
        a.mdAutocompleteCtrl.hidden = !0;
        a.$apply()
    }, 200)
}
;
e.clearInput_ = function(a) {
    a.mdAutocompleteCtrl.clear()
}
;
e.onInputKeyEvent_ = function(a, b) {
    13 == b.which && 1 > a.mdAutocompleteCtrl.index && this.navigateByEntity(a.searchServ.lastInput)
}
;
var Ch = function(a, b, c, d, f, g) {
    yh = a;
    Ah = b;
    U = c;
    wh = d;
    xh = f;
    zh = g;
    return new Bh
};
k("$jscomp.scope.directiveInjector$jscomp$35", Ch, void 0);
Ch.$inject = "$document $mdDialog lodash configService searchService trackingService".split(" ");
var Dh = function(a, b, c) {
    this.mdDialog_ = b;
    this.htmlAngularElement_ = angular.element(a[0].documentElement);
    this.config = c
};
k("$jscomp.scope.SearchDialogCtrl", Dh, void 0);
Dh.$inject = ["$document", "$mdDialog", "configService"];
Dh.prototype.cancelDialog = function(a) {
    a.target.hasAttribute("click-close") && this.mdDialog_.cancel()
}
;
var Eh, Fh, Gh, Hh = function() {
    this.restrict = "E";
    this.templateUrl = "/components/search/search-directive.html";
    this.scope = {};
    this.link = Eh.bind(this.link, this)
};
Hh.prototype.link = function(a) {
    a.config = Fh;
    a.showMobileSearchDialog = Eh.bindKey(this, "showMobileSearchDialog_", a)
}
;
Hh.prototype.showMobileSearchDialog_ = function() {
    Gh.show({
        clickOutsideToClose: !0,
        controller: "SearchDialogCtrl",
        controllerAs: "ctrl",
        templateUrl: "/components/search/search-dialog.html",
        onComplete: function(a, b) {
            b.find("input").focus()
        }
    })
}
;
var Ih = function(a, b, c) {
    Gh = a;
    Eh = b;
    Fh = c;
    return new Hh
};
k("$jscomp.scope.directiveInjector$jscomp$36", Ih, void 0);
Ih.$inject = ["$mdDialog", "lodash", "configService"];
var Jh = function(a, b, c, d) {
    this.http_ = a;
    this.lodash_ = b;
    this.apiPathPrefix_ = c.searchApiPath;
    this.q_ = d;
    this.lastInput = ""
};
k("$jscomp.scope.SearchService", Jh, void 0);
Jh.$inject = ["$http", "lodash", "configService", "$q"];
Jh.prototype.responseTransform_ = function(a) {
    return this.http_.defaults.transformResponse.concat(a)
}
;
Jh.prototype.getAutoComplete = function(a, b) {
    a = a.replace(/[|~\t\n:=(){}[\]<>*\\.;\/]/g, " ");
    a = a.replace(/[\']/g, "").trim();
    if ("" !== a)
        return this.http_.get(this.apiPathPrefix_ + a, this.lodash_.extend({
            transformResponse: this.responseTransform_(function(a) {
                return a ? a["default"].topics : a
            })
        }, b))
}
;
Jh.prototype.getAutoCompleteList = function(a, b, c) {
    var d = [];
    b && d.push({
        title: b + (c ? "" : " "),
        mid: b,
        type: "Search term"
    });
    1 < b.length && (a = this.queryAutoComplete_(a, b)) && a.then(function(a) {
        d.push.apply(d, a)
    });
    return d
}
;
Jh.prototype.queryAutoComplete_ = function(a, b) {
    var c = this.q_.defer();
    a.abortDeferred && a.abortDeferred.resolve();
    a.abortDeferred = this.q_.defer();
    a = this.getAutoComplete(b, {
        timeout: a.abortDeferred.promise
    });
    a.success(c.resolve);
    a.error(c.reject);
    return c.promise
}
;
var Kh, Lh, Mh = function() {
    this.restrict = "E";
    this.templateUrl = "/components/share/share-directive.html";
    this.scope = {
        title: "@shareTitle",
        shareURI: "@shareUri",
        shareConfig: "=?config",
        iconOnly: "=?"
    };
    this.link = Kh.bind(this.link, this)
};
Mh.prototype.link = function(a) {
    a.openDialog = Kh.bindKey(Lh, "openModal", a.shareURI, a.shareConfig)
}
;
var Nh = function(a, b) {
    Kh = a;
    Lh = b;
    return new Mh
};
k("$jscomp.scope.directiveInjector$jscomp$37", Nh, void 0);
Nh.$inject = ["lodash", "shareService"];
var Qh = function(a, b, c, d, f, g, h, m, l, n, t) {
    this.window_ = t;
    this.clipboardService_ = n;
    this.q_ = b;
    this.lodash_ = c;
    this.shareNetworkFactory_ = g;
    this.modalService_ = h;
    this.config = d;
    this.shareConfig = l;
    this.shareURI = m || a.absUrl();
    this.location_ = a;
    this.isShareClicked = this.isQuerying = !1;
    l.widgetData && (this.widgetTitle = c.find(l.widgetData, {
        name: "topic"
    }).value);
    this.selectedWidgetItem = l.widgetItem;
    this.networks = this.createNetworks_(l && l.networks || (f.isMobileMode ? Oh : Ph), l)
};
k("$jscomp.scope.ShareModalCtrl", Qh, void 0);
Qh.$inject = "$location $q lodash configService globalsService shareNetworkFactory modalService shareURI shareConfig clipboardService $window".split(" ");
var Ph = ["GooglePlus", "Facebook", "Twitter", "LinkedIn", "Tumblr"]
  , Oh = "GooglePlus Facebook Twitter LinkedIn Tumblr WhatsApp".split(" ");
e = Qh.prototype;
e.createNetworks_ = function(a, b) {
    var c = []
      , d = [];
    this.lodash_.forEach(a, function(a) {
        (a = this.shareNetworkFactory_.create(a, b)) && a.shortUriPromise && d.push(a.shortUriPromise);
        c.push(a)
    }, this);
    d.length && (this.isQuerying = !0,
    this.q_.all(d)["finally"](this.lodash_.bind(function() {
        this.isQuerying = !1
    }, this)));
    return c
}
;
e.dispatchNetwork = function(a) {
    a.dispatch(this.shareURI);
    this.hideModal()
}
;
e.hideModal = function() {
    this.modalService_.hide()
}
;
e.copyToClipBoardDialog = function() {
    this.clipboardService_.copyWidgetData(this.shareConfig.widgetData);
    this.modalService_.hide()
}
;
e.exploreItem = function() {
    this.modalService_.hide();
    var a = this.getExplorePageLink_(this.selectedWidgetItem);
    this.window_.location.href = a
}
;
e.getExplorePageLink_ = function(a) {
    a = "/trends/explore?date=2016-01-01%202016-12-31&q=" + encodeURI(a);
    var b = this.config.getSafeGeo();
    "GLOBAL" !== b && (a += "&geo=" + b);
    return a
}
;
e.searchItem = function() {
    this.modalService_.hide();
    var a = "https://www.google." + this.config.getDomainSuffix(this.location_.absUrl()) + "/search?q=" + encodeURI(this.selectedWidgetItem);
    this.window_.location.href = a
}
;
var Rh, Sh, Th, Uh, Vh, Wh, V = {}, Xh = function(a, b, c) {
    a = !1 !== c ? Rh.pick(a, Rh.keys(b)) : Rh.clone(a || {});
    return Rh.defaults(a, b)
}, Yh = function(a, b) {
    this.uri_ = a;
    this.config_ = Xh(b, {
        modifyURI: !0
    })
};
Yh.prototype.encode = function(a) {
    return encodeURIComponent(this.resolve(a))
}
;
Yh.prototype.resolve = function(a) {
    if (!this.config_.modifyURI)
        return this.uri_;
    var b = Sh.appendLocaleToURI(this.uri_);
    a && (b = Sh.appendQueryStringToURI(b, "sni", a));
    return b
}
;
var W = function(a, b, c) {
    this.identifier = a;
    this.actionURI = b;
    this.config = Xh(c, {
        displayName: "",
        icon: ""
    }, !1)
};
W.prototype.createFinalURI = function(a, b) {
    b = b || this.actionURI;
    a instanceof Yh || (a = new Yh(a,void 0));
    return b + a.encode(this.identifier)
}
;
W.prototype.dispatch = function(a) {
    a = this.createFinalURI(a);
    Th.isDesktopMode ? Uh.openWindow(a, null, {
        width: 500,
        height: 400
    }) : Vh.open(a)
}
;
W.prototype.getIconAbsPath = function() {
    return Sh.staticPathPrefix + "/" + this.config.icon
}
;
var Zh = function(a, b, c) {
    c = Xh(c, {
        displayName: "",
        icon: "",
        title: "",
        exploreParams: null,
        storyID: null,
        widgetType: null,
        widgetID: null
    }, !1);
    W.call(this, a, b, c);
    this.shortURI_ = null;
    this.shortUriPromise = c.storyID || c.exploreParams ? this.getShortURI_() : null
};
p(Zh, W);
Zh.prototype.createFinalURI = function(a) {
    return W.prototype.createFinalURI.call(this, this.shortURI_ || a, this.actionURI + encodeURIComponent(this.config.title + " - "))
}
;
Zh.prototype.getShortURI_ = function() {
    var a = this
      , b = this.config.exploreParams ? Wh.getExploreShortURI(this.config.exploreParams, this.config.widgetID, this.identifier) : Wh.getStoryShortURI(this.config.storyID, this.config.widgetID, this.identifier, this.config.widgetType);
    b.success(function(b) {
        b = new Yh(b.shorturl,{
            modifyURI: !1
        });
        a.shortURI_ = b
    });
    return b
}
;
var $h = function(a) {
    a = Xh(a, {
        displayName: "Google+",
        widgetType: null,
        icon: "ic_post_gplus_24px.svg"
    });
    W.call(this, 1, "https://plus.google.com/share?url=", a)
};
p($h, W);
var ai = function(a) {
    a = Xh(a, {
        displayName: "Facebook",
        widgetType: null,
        icon: "ic_post_facebook_24px.svg"
    });
    W.call(this, 2, "https://www.facebook.com/sharer/sharer.php?u=", a)
};
p(ai, W);
var bi = function(a) {
    a = Xh(a, {
        displayName: "Twitter",
        icon: "ic_post_twitter_24px.svg",
        title: "",
        exploreParams: null,
        storyID: null,
        widgetType: null,
        widgetID: null
    });
    Zh.call(this, 3, "https://twitter.com/intent/tweet?text=", a)
};
p(bi, Zh);
var ci = function(a) {
    a = Xh(a, {
        displayName: "LinkedIn",
        widgetType: null,
        icon: "ic_post_linkedin_24px.svg"
    });
    W.call(this, 4, "https://www.linkedin.com/cws/share?isFramed=true&url=", a)
};
p(ci, W);
var di = function(a) {
    a = Xh(a, {
        displayName: "Tumblr",
        widgetType: null,
        icon: "ic_post_tumblr_24px.svg"
    });
    W.call(this, 5, "https://www.tumblr.com/widgets/share/tool?canonicalUrl=", a)
};
p(di, W);
var ei = function(a) {
    a = Xh(a, {
        displayName: "WhatsApp",
        icon: "ic_post_whatsapp_24px.svg",
        title: "",
        exploreParams: null,
        storyID: null,
        widgetType: null,
        widgetID: null
    });
    Zh.call(this, 6, "whatsapp://send?text=", a)
};
p(ei, Zh);
V.ShareURI = Yh;
V.SocialNetwork = W;
V.SocialNetworkWithShortURI = Zh;
V.GooglePlus = $h;
V.Facebook = ai;
V.Twitter = bi;
V.LinkedIn = ci;
V.Tumblr = di;
V.WhatsApp = ei;
V.create = function(a, b) {
    return (a = V[a]) && new a(b)
}
;
V.createURI = function(a, b) {
    return new Yh(a,b)
}
;
var fi = function(a, b, c, d, f, g) {
    Vh = a;
    Rh = b;
    Sh = c;
    Th = d;
    Wh = f;
    Uh = g;
    return V
};
k("$jscomp.scope.factoryInjector$jscomp$8", fi, void 0);
fi.$inject = "$window lodash configService globalsService shareService helpersFactory".split(" ");
var gi = function(a, b, c, d, f, g, h) {
    this.http_ = a;
    this.mdDialog_ = c;
    this.mdBottomSheet_ = d;
    this.lodash_ = f;
    this.configService_ = g;
    this.globalsService_ = h
};
k("$jscomp.scope.ShareService", gi, void 0);
gi.$inject = "$http $routeParams $mdDialog $mdBottomSheet lodash configService globalsService".split(" ");
var hi = function() {
    var a = new Date
      , b = a.getMinutes();
    a.setSeconds(0);
    a.setMinutes(b - b % 10);
    return parseInt(a.getTime() / 1E3)
};
e = gi.prototype;
e.getExploreShortURI = function(a, b, c) {
    var d = this.configService_.pathPrefix + "/api/explore/shorturl";
    b && (d += "/" + b);
    return this.http_.get(d, {
        params: {
            req: a,
            sni: c,
            ts: b ? hi() : null
        }
    })
}
;
e.getStoryShortURI = function(a, b, c) {
    var d = this.configService_.pathPrefix + "/api/shorturl/"
      , d = this.configService_.isYIS2016() ? d + ("yis/" + a + "/" + this.configService_.getSafeGeo()) : d + a;
    b && (d += "/" + b);
    return this.http_.get(d, {
        params: {
            sni: c,
            ts: b ? hi() : null
        }
    })
}
;
e.openModal = function(a, b) {
    var c = this.globalsService_.isDesktopMode
      , d = c ? this.mdDialog_ : this.mdBottomSheet_;
    d.show({
        controller: "ShareModalCtrl",
        controllerAs: "ctrl",
        templateUrl: "/components/share/share-modal-" + (c ? "desktop" : "mobile") + ".html",
        shareURI: a,
        shareConfig: b,
        modalService: d,
        clickOutsideToClose: !0
    })
}
;
e.openYisBottomSheet = function(a, b) {
    this.mdBottomSheet_.show({
        controller: "ShareModalCtrl",
        controllerAs: "ctrl",
        templateUrl: "/components/share/share-modal-mobile-yis.html",
        shareURI: a,
        shareConfig: b,
        modalService: this.mdBottomSheet_,
        clickOutsideToClose: !0
    })
}
;
e.openListItemBottomSheet = function(a, b) {
    this.mdBottomSheet_.show({
        controller: "ShareModalCtrl",
        controllerAs: "ctrl",
        templateUrl: "/components/share/item-action-modal-yis.html",
        shareURI: a,
        shareConfig: b,
        modalService: this.mdBottomSheet_,
        clickOutsideToClose: !0
    })
}
;
var ii, ji, ki, li, mi, ni = function() {
    this.restrict = "E";
    this.templateUrl = "/components/stories/featured-story-directive.html";
    this.scope = {
        id: "@",
        storyTitle: "@",
        storyTitleArray: "=",
        widget: "="
    };
    this.replace = !0;
    this.link = ii.bind(this.link, this)
};
ni.prototype.link = function(a) {
    a.location = ji;
    a.config = ki;
    a.globals = li;
    a.getFeaturedDirection = ii.bindKey(this, "getFeaturedDirection_", a)
}
;
ni.prototype.getFeaturedDirection_ = function(a) {
    var b = mi.isRtlThreshold(a.storyTitle || "");
    return "undefined" !== typeof a.widget && a.widget.isCurated && "fe_list" == a.widget.widgetType ? b ? "rtl" : "ltr" : "initial"
}
;
var oi = function(a, b, c, d, f, g) {
    ji = b;
    ii = c;
    ki = d;
    li = f;
    mi = g;
    return new ni
};
k("$jscomp.scope.directiveInjector$jscomp$38", oi, void 0);
oi.$inject = "$http $location lodash configService globalsService bidiService".split(" ");
var qi = function(a, b, c) {
    this.http_ = a;
    this.lodash_ = b;
    this.apiPathPrefix_ = c.pathPrefix + "/api/";
    this.pageLayouts = pi
};
k("$jscomp.scope.StoryService", qi, void 0);
qi.$inject = ["$http", "lodash", "configService"];
var pi = {
    EMPTY_STORY: "EMPTY_STORY",
    YEAR_IN_SEARCH_2015_HUB: "YEAR_IN_SEARCH_2015_HUB",
    YEAR_IN_SEARCH_2016_HUB: "YEAR_IN_SEARCH_2016_HUB",
    YEAR_IN_SEARCH_2015_STORY: "YEAR_IN_SEARCH_2015_STORY",
    OLYMPICS_2016_HUB: "OLYMPICS_2016_HUB",
    OLYMPICS_2016_STORY: "OLYMPICS_2016_STORY",
    OLYMPICS_2016_GOOBERS: "OLYMPICS_2016_GOOBERS",
    OLYMPICS_2016_FEATURED_STORIES: "OLYMPICS_2016_FEATURED_STORIES",
    ELECTIONS_2016_HUB_PRESIDENT: "ELECTIONS_2016_HUB_PRESIDENT",
    ELECTIONS_2016_HUB_VP: "ELECTIONS_2016_HUB_VP",
    ELECTIONS_2016_HUB_TICKET: "ELECTIONS_2016_HUB_TICKET",
    ELECTIONS_2016_CANDIDATE_STORY: "ELECTIONS_2016_CANDIDATE_STORY",
    ELECTIONS_2016_STATE_STORY: "ELECTIONS_2016_STATE_STORY"
};
e = qi.prototype;
e.getLatest = function(a) {
    a = this.lodash_.defaults(a || {}, {
        geo: "",
        category: "",
        featuredSize: 3,
        trendingSize: 200,
        featuredPrefetchSize: 3,
        sort: 0,
        trendingPrefetchSize: 20,
        userTimezoneOffset: 0
    });
    return this.http_.get(this.apiPathPrefix_ + "stories/latest", {
        params: {
            geo: a.geo,
            cat: a.category,
            fi: a.featuredSize,
            ri: a.trendingSize,
            fs: a.featuredPrefetchSize,
            rs: a.trendingPrefetchSize,
            sort: a.sort
        }
    })
}
;
e.getLatestTrending = function(a) {
    a = this.lodash_.extend(a, {
        featuredSize: 0,
        featuredPrefetchSize: 0
    });
    return this.getLatest(a)
}
;
e.getSummaries = function(a) {
    return this.http_.get(this.apiPathPrefix_ + "stories/summary", {
        params: {
            id: a
        }
    })
}
;
e.getStory = function(a, b) {
    b = this.lodash_.defaults(b || {}, {
        widgetsSize: null,
        widgetsPrefetchSize: null,
        hideNews: null
    });
    a = this.apiPathPrefix_ + "stories/" + (a || "").replace(/[^-_a-z0-9]/ig, "");
    return this.http_.get(a, {
        params: {
            swi: b.widgetsSize,
            sw: b.widgetsPrefetchSize,
            hn: b.hideNews
        }
    })
}
;
e.getStoryWidgets = function(a, b) {
    return this.http_.get(this.apiPathPrefix_ + "stories/widgets", {
        params: {
            id: a.replace(/[^-_a-z0-9]/ig, ""),
            wid: b
        }
    })
}
;
e.getYis2016Lists = function(a) {
    return this.http_.get(this.apiPathPrefix_ + "topcharts", {
        params: {
            geo: a,
            date: 2016
        }
    })
}
;
var ri, si, ti, ui = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/components/stories/trending-story-directive.html";
    this.scope = {
        id: "@",
        storyTitle: "@",
        storyTitleArray: "=",
        storyArticles: "=",
        imageUrl: "@",
        imageSource: "@",
        hideImage: "=",
        newsUrl: "@",
        showNewsSnippet: "=",
        sparklineSize: "=",
        isEmbedStories: "="
    };
    this.controller = function(c) {
        b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"];
    this.link = ri.bind(this.link, this)
};
ui.prototype.controller = function(a) {
    a.sparklineService = si
}
;
ui.prototype.controller.$inject = ["$scope"];
ui.prototype.link = function(a) {
    a.getArticleDataArray = ri.bindKey(this, "getArticleDataArray", a);
    a.htmlToPlainText = ri.bindKey(this, "htmlToPlainText");
    if (a.storyArticles && 1 < a.storyArticles.length) {
        var b = this.computeArticleChangeTime_(a);
        a.articleDataChangeTimeout = ri.bindKey(this, "articleDataChange_", a);
        a.articleDataChangeTimeoutPromise = ti(a.articleDataChangeTimeout, b)
    }
    a.$on("$destroy", function() {
        a.articleDataChangeTimeoutPromise && ti.cancel(a.articleDataChangeTimeoutPromise)
    })
}
;
ui.prototype.articleDataChange_ = function(a) {
    a.storyArticles.push(a.storyArticles.shift());
    a.articleDataChangeTimeoutPromise = ti(a.articleDataChangeTimeout, this.computeArticleChangeTime_(a))
}
;
ui.prototype.computeArticleChangeTime_ = function(a) {
    return 5E3 + a.storyArticles[0].articleTitle.length / 140 * 3E3
}
;
ui.prototype.htmlToPlainText = function(a) {
    return ri.unescape(a.replace(/<[^>]+>/gm, ""))
}
;
var vi = function(a, b, c) {
    ti = a;
    ri = b;
    si = c;
    return new ui
};
k("$jscomp.scope.directiveInjector$jscomp$39", vi, void 0);
vi.$inject = ["$timeout", "lodash", "trendingStorySparklineService"];
var wi = function(a, b, c, d) {
    this.queueIterationBind_ = b.bindKey(this, "queueIteration_");
    this.http_ = a;
    this.lodash_ = b;
    this.queue_ = new c.Queue(this.queueIterationBind_,{
        batchSize: 4,
        delayTime: 25,
        parallelBatches: 2
    });
    this.apiPathPrefix_ = d.pathPrefix + "/api/"
};
k("$jscomp.scope.SparklineService$jscomp$1", wi, void 0);
wi.$inject = ["$http", "lodash", "queueFactory", "configService"];
e = wi.prototype;
e.getStoryIdsFromItems_ = function(a) {
    return this.lodash_.map(a, function(a) {
        return a.data
    })
}
;
e.invokeItems_ = function(a, b, c) {
    this.lodash_.forEach(a, function(a, f) {
        var d = a[b];
        d && d.call(a, c[f])
    })
}
;
e.responseMiddleware_ = function(a) {
    this.lodash_.isObject(a) && a["default"] && (a = this.lodash_.map(a["default"].response, function(a) {
        return a.timelineResponse ? a.timelineResponse.timelineData : []
    }));
    return a
}
;
e.responseTransform_ = function(a) {
    return this.http_.defaults.transformResponse.concat(a)
}
;
e.getSparklines_ = function(a) {
    var b = this.apiPathPrefix_ + "widgetdata/sparkline"
      , c = this.responseTransform_(this.lodash_.bindKey(this, "responseMiddleware_"));
    return this.http_.get(b, {
        params: {
            id: a
        },
        transformResponse: c
    })
}
;
e.getSparkline = function(a) {
    return this.queue_.push(a).promise
}
;
e.queueIteration_ = function(a, b) {
    var c = this.lodash_.bindKey(this, "invokeItems_", a);
    a = this.getStoryIdsFromItems_(a);
    return this.getSparklines_(a).success(this.lodash_.bind(c, null, "resolve")).error(this.lodash_.bind(c, null, "reject"))["finally"](b)
}
;
var xi, yi, zi, Ai, Bi, Ci, Di = function() {
    this.restrict = "E";
    this.templateUrl = "/components/video/video-directive.html";
    this.scope = {
        videoUrl: "="
    };
    this.videoElement_ = this.player_ = void 0;
    this.link = xi.bind(this.link, this)
};
e = Di.prototype;
e.link = function(a) {
    a.config = yi;
    a.play = xi.bindKey(this, "play_", a);
    a.close = xi.bindKey(this, "close_", a);
    zi.onYouTubeIframeAPIReady = xi.bindKey(this, "onYouTubeIframeAPIReady_", a);
    a.$watch("videoUrl", xi.bindKey(this, "updateVideoUrl_", a));
    this.videoElement_ || this.embed_(a)
}
;
e.updateVideoUrl_ = function(a) {
    this.player_ && (this.player_.loadVideoByUrl(a.videoUrl),
    this.postMessage("stopVideo"))
}
;
e.postMessage = function(a) {
    this.player_.getIframe().contentWindow.postMessage('{"event":"command","func":"' + a + '","args":""}', "*")
}
;
e.embed_ = function(a) {
    var b = angular.element(document.body)
      , c = Ai.get("/components/video/video.html");
    this.videoElement_ = Bi(c)(a);
    b.append(this.videoElement_);
    this.loadYoutubeApi_();
    b.bind("keydown keypress keyup", function(b) {
        27 === b.which && (a.close(),
        b.preventDefault())
    })
}
;
e.play_ = function() {
    this.player_ && (angular.element(document.body).addClass("video-dialog-opened"),
    this.videoElement_.addClass("video-overlay-dialog-opened").removeClass("video-overlay-dialog-closed"),
    this.postMessage("playVideo"))
}
;
e.close_ = function() {
    this.postMessage("stopVideo");
    angular.element(document.body).removeClass("video-dialog-opened");
    this.videoElement_.addClass("video-overlay-dialog-closed").removeClass("video-overlay-dialog-opened")
}
;
e.getVideoId_ = function(a) {
    return (a = (a.videoUrl || "").match(/https\:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]*)/i)) ? a[1] : void 0
}
;
e.loadYoutubeApi_ = function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = "https://www.youtube.com/iframe_api";
    angular.element(document.body).append(a)
}
;
e.onYouTubeIframeAPIReady_ = function(a) {
    var b = {
        enablejsapi: 1,
        autohide: 1,
        autoplay: 0,
        controls: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
    };
    0 !== yi.locale.indexOf("en") && (b.cc_lang_pref = yi.locale,
    b.cc_load_policy = 1);
    var c = this.getVideoId_(a);
    c && (zi.player = new zi.YT.Player("player",{
        height: "100%",
        width: "100%",
        videoId: c,
        events: {
            onReady: xi.bindKey(this, "onPlayerReady_", a),
            onStateChange: xi.bindKey(this, "onPlayerStateChange_", a)
        },
        playerVars: b
    }))
}
;
e.onPlayerReady_ = function(a, b) {
    this.player_ = b.target;
    "1" === Ci.autoplay && a.play()
}
;
e.onPlayerStateChange_ = function(a, b) {
    b.data === zi.YT.PlayerState.ENDED && (a.close(),
    this.player_.seekTo(0));
    0 > angular.element(document.body)[0].getAttribute("class").indexOf("video-dialog-opened") && b.data !== zi.YT.PlayerState.UNSTARTED && this.postMessage("stopVideo")
}
;
var Ei = function(a, b, c, d, f, g, h, m, l, n) {
    xi = c;
    yi = d;
    Bi = f;
    Ai = g;
    Ci = l;
    zi = n;
    return new Di
};
k("$jscomp.scope.directiveInjector$jscomp$40", Ei, void 0);
Ei.$inject = "$mdDialog $mdBottomSheet lodash configService $compile $templateCache $timeout $sce $routeParams $window".split(" ");
var X, Fi, Gi, Hi, Ii, Ji, Ki, Li, Mi, Ni, Oi = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.template = '<ng-include src="getTemplate()"></ng-include>';
    this.scope = {
        type: "@",
        version: "@",
        template: "@",
        onEvent: "&?",
        exploreParamsGetter: "&?",
        shareTitleGetter: "&?",
        storyId: "@",
        storyParentId: "@",
        storyTitle: "@",
        storyTitleArray: "=?",
        storyCountry: "@",
        storyTimeRange: "@",
        storyNumberOfItems: "@",
        storyTimestamp: "@",
        widgetIsCurated: "@",
        colorTheme: "@",
        palette: "=?",
        data: "=?",
        hasLiveData: "=?",
        showLegend: "=?",
        showModePicker: "=?",
        "export": "&?",
        helpDialog: "=?",
        exploreQuery: "=?",
        anchorName: "=?",
        exploreUrlBack: "@"
    };
    this.controller = function(c) {
        b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"]
};
e = Oi.prototype;
e.arrayMap_ = function(a, b) {
    b || (b = {});
    return X.map(a, function(a) {
        var c = {};
        X.forIn(a, function(a, d) {
            c[b[d] || d] = a
        });
        return c
    })
}
;
e.controller = function(a) {
    var b = this.getColorPalette_(a);
    Fi.embedWidgetGlobals && X.assign(a, Fi.embedWidgetGlobals);
    X.defaults(a, a.data, {
        hasLiveData: !1
    });
    a.config = Gi;
    a.widgetPalette = b;
    a.forcedColor = b ? b[0].hexvalue : "";
    a.arrayMap = X.bindKey(this, "arrayMap_");
    a.getTemplate = X.bindKey(this, "getTemplate_", a);
    a.embed = X.bindKey(this, "showEmbedDialog_", a);
    Gi.isYIS2016() && (this.adaptSharingOptionsForYIS2016(a),
    this.updateWidgetAnchorNameForYIS2016(a));
    Gi.enableWidgetShare && (a.share = X.bindKey(this, "showShareDialog_", a));
    X.forEach(a.widgetExternalApis, X.bindKey(this, "updateApiConfig_", a.token))
}
;
e.updateWidgetAnchorNameForYIS2016 = function(a) {
    a.anchorName = a.id;
    a.id === Hi.hash() && setTimeout(function() {
        Ii()
    }, 0)
}
;
e.adaptSharingOptionsForYIS2016 = function(a) {
    a.genericAction = X.bindKey(this, "fireGenericAction_", a);
    a.widgetFields || (a.widgetFields = [],
    a.widgetFields[0] = {
        name: "topic",
        type: "string",
        value: a.listTitle
    },
    a.widgetFields[1] = {
        name: "bullets",
        subtype: "string",
        type: "list",
        values: a.listItems
    })
}
;
e.getSiteBasePath_ = function() {
    return window.location.protocol + "//" + window.location.host + Gi.pathPrefix
}
;
e.generateExploreShareURI_ = function(a) {
    return this.getSiteBasePath_() + "/explore/" + a + window.location.search
}
;
e.generateStoryShareURI_ = function(a, b) {
    a = this.getSiteBasePath_() + "/story/" + a;
    b && (a += "/" + b);
    return a
}
;
e.generateTopChartsShareURI_ = function(a) {
    var b = Gi.getSafeGeo()
      , b = this.getSiteBasePath_() + "/yis/2016/" + b;
    a && (b += "/" + a);
    return b
}
;
e.getColorPalette_ = function(a) {
    var b = a.palette;
    a.colorTheme && (b = Ji.get("paletteService").getByThemeName(a.colorTheme));
    return b
}
;
e.getDefaultShareTitle_ = function(a, b) {
    return a.storyTitle ? [a.storyTitle, b].join(", ") : b
}
;
e.getTemplate_ = function(a) {
    return (a = Ki.slugifyString(a.type).replace(/[^-_a-z0-9]/ig, "")) ? "/components/widgets/types/" + a + ".html" : ""
}
;
e.fireGenericAction_ = function(a, b, c) {
    var d = Li.isSmallTouchDeviceMode
      , f = Li.isMobileMode;
    switch (b) {
    case "openYisModal":
        f && this.showShareDialogYis_(a);
        break;
    case "openListItemModal":
        d && this.showListItemModal_(a, c);
        break;
    case "copy":
        Mi.copyWidgetData(a.widgetFields)
    }
}
;
e.showEmbedDialog_ = function(a) {
    Ni.show({
        controller: "EmbedDialogCtrl",
        controllerAs: "ctrl",
        templateUrl: "/components/embed/embed-dialog.html",
        clickOutsideToClose: !0,
        locals: {
            storyId: a.storyId,
            widgetId: a.id,
            exploreParams: a.exploreParamsGetter && a.exploreParamsGetter(),
            timestamp: a.storyTimestamp,
            hasLiveData: a.hasLiveData,
            exploreQuery: a.exploreQuery
        },
        onComplete: function(a) {
            a.isDialogComplete = !0;
            a.$applyAsync()
        }
    })
}
;
e.getWidgetFields_ = function() {
    return this.widgetFields ? this.widgetFields : []
}
;
e.showShareDialogYis_ = function(a) {
    var b = Ji.get("shareService")
      , c = a.storyId
      , d = a.id
      , f = this.generateTopChartsShareURI_(d)
      , g = a.widgetFields ? X.find(a.widgetFields, {
        name: "topic"
    }).value : a.title;
    b.openYisBottomSheet(f, {
        title: a.shareTitleGetter && a.shareTitleGetter({
            widgetTitle: g
        }) || g,
        exploreParams: a.exploreParamsGetter && a.exploreParamsGetter(),
        storyID: c,
        widgetID: d,
        widgetData: a.widgetFields
    })
}
;
e.showListItemModal_ = function(a, b) {
    var c = Ji.get("shareService")
      , d = a.storyId
      , f = a.id
      , g = d ? this.generateStoryShareURI_(d, f) : this.generateExploreShareURI_(f)
      , h = this.getWidgetFields_.bind(a)()
      , h = h[1] ? h[1].values : [];
    c.openListItemBottomSheet(g, {
        exploreParams: a.exploreParamsGetter && a.exploreParamsGetter(),
        storyID: d,
        widgetID: f,
        widgetItem: h.length ? h[b] : "",
        widgetData: a.widgetFields
    })
}
;
e.showShareDialog_ = function(a) {
    var b = Ji.get("shareService")
      , c = a.storyId
      , d = a.id
      , f = a.widgetFields ? X.find(a.widgetFields, {
        name: "topic"
    }).value : a.title;
    if ("fe_yis_story_card" == a.widgetType && a.storyParentId && "fe_goober" != a.template) {
        var g = X.find(a.widgetFields, function(a) {
            return "storyLinkURL" == a.name
        });
        g && (c = g.value.match(/story\/(.+)/)[1],
        d = null)
    }
    g = "";
    g = Gi.isYIS2016() ? this.generateTopChartsShareURI_(d) : c ? this.generateStoryShareURI_(c, d) : this.generateExploreShareURI_(d);
    b.openModal(g, {
        title: a.shareTitleGetter && a.shareTitleGetter({
            widgetTitle: f
        }) || this.getDefaultShareTitle_(a, f),
        exploreParams: a.exploreParamsGetter && a.exploreParamsGetter(),
        storyID: c,
        widgetID: d,
        widgetType: a.widgetType,
        widgetData: a.widgetFields
    })
}
;
e.updateApiConfig_ = function(a, b) {
    X.isString(b.url) && (b.url = b.url.replace(/^\/trends/, Gi.pathPrefix));
    X.isObject(b.params) && (b.params.tz = Gi.userTimezoneOffset,
    b.params.token = a)
}
;
var Pi = function(a, b, c, d, f, g, h, m, l, n, t) {
    Ji = a;
    Fi = b;
    Ni = c;
    X = d;
    Ki = f;
    Gi = g;
    Li = m;
    Mi = l;
    Ii = n;
    Hi = t;
    return new Oi
};
k("$jscomp.scope.directiveInjector$jscomp$41", Pi, void 0);
Pi.$inject = "$injector $window $mdDialog lodash helpersFactory configService bidiService globalsService clipboardService $anchorScroll $location".split(" ");
var Qi, Ri, Si, Ti, Vi, Wi, Xi, Zi = function(a) {
    this.htmlElement_ = angular.element(Qi[0].documentElement);
    this.scope = a;
    this.pickersData = {};
    this.activeFilter = null;
    this.messages = Yi;
    this.loadData_()
}, $i = {
    category: "getCategoryPicker",
    geo: "getGeoPicker",
    period: "getPeriodOptions",
    property: "getPropertyOptions"
}, Yi = {
    MSG_CATEGORY: "Category",
    MSG_GEO: "Country",
    MSG_PROPERTY: "Google Property",
    MSG_PERIOD: "Period"
};
e = Zi.prototype;
e.applyChanges = function() {
    Ri(Si.bind(function() {
        if (this.scope.onChange)
            this.scope.onChange();
        this.closeDialog()
    }, this), 50)
}
;
e.checkClick = function(a, b, c) {
    a && (b.ngModelProperty = c,
    this.applyChanges())
}
;
e.closeDialog = function() {
    Ti.cancel();
    this.htmlElement_.removeClass("no-scroll")
}
;
e.getTitleByPicker = function(a) {
    var b = this.pickersData[a];
    a = this.scope["ngModel" + Vi.titleizeString(a)];
    return a.name ? a.name : (b = b.getNodeByID(a.id ? a.id : a)) && b.name
}
;
e.loadData_ = function() {
    var a = {};
    Si.forEach($i, function(b, c) {
        a[c] = Wi[b]()
    }, this);
    Xi.all(a).then(Si.bind(function(a) {
        this.pickersData = a
    }, this))
}
;
e.openDialog = function() {
    this.activeFilter = null;
    Ti.show({
        controller: Si.constant(this),
        controllerAs: "ctrl",
        scope: this.scope,
        preserveScope: !0,
        templateUrl: "/explorepage/explore-mobile-hub-dialog.html"
    });
    this.htmlElement_.addClass("no-scroll")
}
;
var aj = function() {
    var a = this
      , b = this.controller;
    this.restrict = "E";
    this.templateUrl = "/explorepage/explore-mobile-hub-directive.html";
    this.scope = {
        isWebSearch: "=",
        hasRealTime: "=",
        visiblePickers: "=",
        visibleLegendPickers: "=?",
        ngModelCategory: "=?",
        ngModelGeo: "=?",
        ngModelPeriod: "=?",
        ngModelProperty: "=?",
        onChange: "&?",
        individualSearchTerm: "@?"
    };
    this.controller = function(c) {
        return b.call(a, c)
    }
    ;
    this.controller.$inject = ["$scope"]
};
k("$jscomp.scope.ExploreMobileHubDirective", aj, void 0);
aj.prototype.controller = function(a) {
    var b = new Zi(a);
    return a.ctrl = b
}
;
var bj = function(a, b, c, d, f, g, h) {
    Qi = a;
    Xi = b;
    Ri = c;
    Ti = d;
    Si = f;
    Vi = g;
    Wi = h;
    return new aj
};
k("$jscomp.scope.directiveInjector$jscomp$42", bj, void 0);
bj.$inject = "$document $q $timeout $mdDialog lodash helpersFactory exploreService".split(" ");
var cj, dj, ej, fj, gj, hj = function(a) {
    this.scope_ = a
}, ij = function() {
    var a = this.controller;
    this.restrict = "E";
    this.templateUrl = "/explorepage/explore-pills-directive.html";
    this.scope = {
        terms: "=",
        resetFiltersHandler: "&",
        isGlobalFiltersMode: "=",
        isWebSearch: "=",
        createTermObject: "&",
        pillFiltersChangeHandler: "&"
    };
    this.controller = function(b) {
        return a.call(self, b)
    }
    ;
    this.controller.$inject = ["$scope"];
    this.link = cj.bind(this.link, this)
};
ij.prototype.link = function(a, b) {
    a.element = b;
    a.config = dj;
    a.colors = ej
}
;
e = hj.prototype;
e.addSearchTerm = function() {
    var a = this.scope_.createTermObject({
        term: {
            title: "",
            mid: ""
        },
        geo: null,
        date: null,
        isFocus: !0
    });
    a.pillJustAdded = !0;
    this.scope_.terms.push(a)
}
;
e.showAddTermButton = function() {
    var a = this.scope_.terms.length
      , b = this.scope_.terms[a - 1];
    return 5 > a && b.selectedTerm && b.selectedTerm.mid
}
;
e.showTextOnAddTermButton = function() {
    return this.scope_ && this.scope_.element ? 252 < this.scope_.element[0].querySelector(".add-term-button").clientWidth : !1
}
;
e.handleTabKey = function(a) {
    5 != this.scope_.terms.length && (this.scope_.terms.length - 1 === a ? this.addSearchTerm(this.scope_) : this.scope_.terms[a + 1].isFocus = !0)
}
;
e.isSmallPill = function() {
    var a = this.getScreenWidth();
    return 3 < this.scope_.terms.length || 640 < a && 961 > a
}
;
e.getScreenWidth = function() {
    return angular.element(fj)[0].body.clientWidth
}
;
e.updateSearchTerm = function(a, b) {
    a.selectedTerm && a.selectedTerm.mid || (1 < this.scope_.terms.length ? this.scope_.terms.splice(b, 1) : this.scope_.terms[b] = {
        selectedTerm: {
            title: null,
            mid: null
        },
        isFocus: !1,
        selectedGeo: {
            geo: gj.defaultGeo
        },
        selectedPeriod: {
            period: {
                id: gj.defaultPeriod
            }
        }
    });
    this.scope_.pillFiltersChangeHandler({
        entity: a
    })
}
;
ij.prototype.controller = function(a) {
    var b = new hj(a);
    return a.ctrl = b
}
;
var jj = function(a, b, c, d, f) {
    cj = a;
    ej = (new b.Colors).getHexValues();
    fj = c;
    gj = d;
    dj = f;
    return new ij
};
k("$jscomp.scope.directiveInjector$jscomp$43", jj, void 0);
jj.$inject = ["lodash", "colorsFactory", "$document", "exploreService", "configService"];
var kj = function(a, b, c, d) {
    this.location_ = a;
    this.lodash_ = b;
    this.locationHash_ = decodeURIComponent(c.replace(/^#/, "").replace(/\+/g, " "));
    this.helpers_ = d
};
k("$jscomp.scope.ExploreCompatibilityService", kj, void 0);
kj.$inject = ["$location", "lodash", "locationHash", "helpersFactory"];
e = kj.prototype;
e.convertDateParam_ = function(a) {
    if ("" === a)
        return "all";
    a = a.replace(/\+/g, " ");
    if (/now|today/.test(a))
        return a;
    var b = null
      , c = /(\d{1,2})\/(\d{4}) (\d*)M/i
      , d = /(\d{4}-\d{2}-\d{2})T(\d{2})([\d\\:]*) (\d+)H/i;
    c.test(a) ? b = this.convertDateWithMonth_(a, c) : d.test(a) && (b = this.convertDateWithHours_(a, d));
    return b
}
;
e.convertDateWithHours_ = function(a, b) {
    var c = a.match(b);
    b = c[1];
    a = c[2];
    var c = c[4]
      , d = new Date(b);
    d.setHours(a);
    b = new Date(b);
    b.setHours(parseInt(a) + parseInt(c));
    return this.dateTimeStringFormat_(d) + " " + this.dateTimeStringFormat_(b)
}
;
e.convertDateWithMonth_ = function(a, b) {
    a = a.match(b);
    var c = a[2] + "-" + a[1] + "-1";
    b = new Date(c);
    c = new Date(c);
    c.setMonth(parseInt(a[1]) + parseInt(a[3]) - 1, 0);
    return this.dateStringFormat_(b) + " " + this.dateStringFormat_(c)
}
;
e.dateStringFormat_ = function(a) {
    var b = function(a) {
        return 10 > a ? "0" + a : a
    };
    return a.getFullYear() + "-" + b(a.getMonth() + 1) + "-" + b(a.getDate())
}
;
e.dateTimeStringFormat_ = function(a) {
    var b = this.dateStringFormat_(a);
    a = a.getHours().toString();
    1 === a.length && (a = "0" + a);
    return b + ("T" + a)
}
;
e.getHashQueryStringParams = function() {
    var a = this
      , b = this.lodash_.pick(this.helpers_.parseQueryStrings(this.locationHash_), "q", "geo", "cat", "date", "gprop");
    if (!this.lodash_.isEmpty(b))
        return this.lodash_.isString(b.geo) && (b.geo = b.geo.replace(/(\w+,?)\s?/g, "$1")),
        this.lodash_.isString(b.date) ? b.date = this.lodash_.map(b.date.split(","), function(b) {
            return a.convertDateParam_(b)
        }).join(",") : b.date = "all",
        this.lodash_.isString(b.cat) && (b.cat = b.cat.replace(/(.*-)?(\d+)$/, "$2")),
        this.clearHashQueryStringParams_(b),
        b
}
;
e.clearHashQueryStringParams_ = function(a) {
    var b = this.location_.hash();
    a = this.lodash_.keys(a).concat("cmpt", "tz").join("|");
    this.location_.hash(b.replace(new RegExp("[?&]?(" + a + ")=?([^=&]*)","g"), ""))
}
;
var mj = function(a, b, c, d, f, g, h, m, l, n, t, u, x, K, za, ta) {
    this.http_ = b;
    this.location_ = c;
    this.storyId = a.storyId;
    this.storyTitle = a.storyTitle;
    this.showExploreInternalNote = window.showExploreInternalNote;
    this.rootScope_ = d;
    this.q_ = f;
    this.route_ = g;
    this.timeout_ = m;
    this.mdDialog_ = l;
    this.lodash_ = t;
    this.exploreService = u;
    this.exploreCompatibilityService_ = K;
    this.trackingService_ = za;
    this.document_ = n;
    this.searchService_ = x;
    this.routeParams_ = h;
    this.location_ = c;
    this.examples = [];
    this.widgets = [];
    this.errorMessage = this.isQuerying = !1;
    this.geoOptions = null;
    this.periodOptions = u.getPeriodOptions();
    this.categoryOptions = null;
    this.exploreUrl = "";
    this.propertyOptions = u.getPropertyOptions();
    this.messages = lj;
    this.showExamples = !0;
    this.model = t.defaults({}, this.getModelFromQueryString_(), {
        terms: [this.createTermObject(null, null, null, !d.globals.isMobileMode)],
        geo: this.exploreService.defaultGeo,
        period: {
            id: this.exploreService.defaultPeriod
        },
        category: 0,
        property: "",
        isDefaultData: !0
    });
    this.isGlobalFiltersMode = !0;
    this.mobileHubVisiblePickers = [];
    this.mobileHubLegendPickers = [];
    this.compareContainerElement_ = this.requestParamsCache_ = null;
    this.getAutoCompleteListBind = this.lodash_.bindKey(x, "getAutoCompleteList", this);
    this.shareConfig = {};
    this.isWebSearch = !0;
    this.isEmptyState = this.hasRealTime = !1;
    n[0].body.style["background-color"] = "#eee";
    this.refreshDebounce_ = ta.domDebounce(t.bindKey(this, "refresh_"), 500);
    a.$watch("ctrl.model", t.bindKey(this, "onModelChange_"), !0);
    a.$on("$routeUpdate", t.bind(function() {
        var a = this.location_.state();
        a ? this.model = a : this.route_.reload()
    }, this));
    this.location_.state(this.lodash_.clone(this.model)).replace();
    this.loadPickers_()
};
k("$jscomp.scope.ExploreCtrl", mj, void 0);
mj.$inject = "$scope $http $location $rootScope $q $route $routeParams $timeout $mdDialog $document lodash exploreService searchService exploreCompatibilityService trackingService helpersFactory".split(" ");
var nj = ["geo", "period", "category", "property"]
  , oj = ["category", "property"]
  , lj = {
    MSG_COMPARE: "Compare",
    MSG_EXPLORE: "Explore",
    MSG_WIDGET_SHARE_GLOBAL: "See {widgetTitle} on Google Trends for {keywords} - {geo}, {time}",
    MSG_WIDGET_SHARE_GLOBAL_2: "See {widgetTitle} on Google Trends for {geo}, {time}",
    MSG_WIDGET_SHARE_GENERIC: "See {widgetTitle} on Google Trends for {keywords}",
    MSG_CUSTOM_SEARCH_TERM_TYPE: "Search term"
};
e = mj.prototype;
e.loadPickers_ = function() {
    var a = this
      , b = this.exploreService.getGeoPicker()
      , c = this.exploreService.getCategoryPicker();
    this.q_.all([b, c]).then(function(b) {
        a.geoOptions = b[0];
        a.categoryOptions = b[1]
    }, null)
}
;
e.onModelChange_ = function() {
    var a = this.model.geo === this.exploreService.defaultGeo
      , b = this.model.period && this.model.period.id === this.exploreService.defaultPeriod
      , c = 0 === this.model.category
      , d = "" === this.model.property;
    a && b && c && d || (this.showExamples = !1);
    !this.isGlobalFiltersMode && 1 === this.model.terms.length && this.model.terms[0].selectedTerm.mid && (this.model.terms[0].selectedGeo.geo || this.model.terms[0].selectedPeriod.period.id) && this.resetFilters(this.model.terms[0].selectedGeo.geo, this.model.terms[0].selectedPeriod.period);
    var f = null !== this.model.geo && null !== this.model.period
      , g = f ? nj : oj;
    this.isGlobalFiltersMode = f;
    this.mobileHubVisiblePickers = g;
    this.isWebSearch = "" === this.model.property;
    this.hasRealTime = !1;
    f ? (this.checkPeriod_(this.model.period),
    this.mobileHubLegendPickers = this.lodash_.filter(g, function(a) {
        return "geo" == a || "period" == a || "category" == a && !c || "property" == a && !d ? !0 : !1
    }, this)) : (this.model.terms.forEach(function(a) {
        this.checkPeriod_(a.selectedPeriod.period)
    }, this),
    this.mobileHubLegendPickers = c && d ? [] : g);
    this.setPageTitle_();
    this.setQueryStringParams_();
    if (this.isGlobalFiltersMode && (!a || !b))
        this.onGlobalFilterChange();
    this.model.isDefaultData ? this.refresh_() : this.refreshDebounce_()
}
;
e.onGlobalFilterChange = function() {
    this.isGlobalFiltersMode && this.lodash_.forEach(this.model.terms, function(a) {
        a.selectedGeo.geo = this.model.geo;
        a.selectedPeriod.period = this.lodash_.clone(this.model.period)
    }, this)
}
;
e.checkPeriod_ = function(a) {
    "CM" === this.getPeriodBackend_(a.id) && (this.hasRealTime = !0,
    this.model.property = "");
    this.isWebSearch && "all_2008" === a.id ? a.id = "all" : this.isWebSearch || "all" !== a.id && !/^2\d{2}[4-7]/.test(a.id) || (a.id = "all_2008")
}
;
e.getPeriodBackend_ = function(a) {
    var b = /(2\d{3})-([0-1]\d)-([0-3]\d)(T([0-2]\d))/
      , c = this.periodOptions.getNodeByID(a);
    return c ? c.backend : b.test(a) ? "CM" : "IZG"
}
;
e.getTermsTitles_ = function() {
    var a = [];
    this.lodash_.forEachRight(this.model.terms, function(b) {
        (b.selectedTerm && b.selectedTerm.title || a.length) && a.unshift(b.selectedTerm.title)
    });
    return a
}
;
e.setPageTitle_ = function() {
    var a = this.getTermsTitles_()
      , b = this.messages.MSG_EXPLORE;
    a.length && (b = [a.join(", "), b].join(" - "));
    this.rootScope_.pageTitle = b
}
;
e.generateWidgetShareTitle = function(a) {
    var b = this.messages.MSG_WIDGET_SHARE_GENERIC;
    a = {
        keywords: this.getTermsTitles_().join(", "),
        widgetTitle: a
    };
    this.isGlobalFiltersMode && (this.lodash_.assign(a, {
        geo: this.geoOptions.getNodeByID(this.model.geo).name,
        time: this.model.period.name
    }),
    b = a.keywords ? this.messages.MSG_WIDGET_SHARE_GLOBAL : this.messages.MSG_WIDGET_SHARE_GLOBAL_2);
    return (new Ra(b)).format(a)
}
;
e.onWidgetEvent = function(a, b) {
    switch (a.name) {
    case "itemClick":
        this.lodash_.has(a.item, "geoCode") ? this.lodash_.isUndefined(a.item.geoCode) || this.comparisonItemDrillDown_(a.item.geoCode, b) : this.model.terms = [this.createTermObject(a.item.mid ? this.lodash_.pick(a.item, "mid", "title", "type") : a.item.text)];
        break;
    case "regionClick":
        0 <= b ? this.comparisonItemDrillDown_(a.region, b) : this.isGlobalFiltersMode ? (this.model.geo = this.getGeoByRegion_(a.region, this.model.geo),
        this.onGlobalFilterChange()) : this.model.terms.forEach(function(b) {
            b.selectedGeo.geo = this.getGeoByRegion_(a.region, b.selectedGeo.geo)
        }, this);
        break;
    default:
        return !0
    }
    this.rootScope_.$applyAsync();
    return !1
}
;
e.getGeoByRegion_ = function(a, b) {
    var c = a.match(/\w+-(\d+)$/);
    return c && /^US-\w{2}$/.test(b) ? [b, c[1]].join("-") : this.geoOptions.getNodeByID(a).id
}
;
e.comparisonItemDrillDown_ = function(a, b) {
    if (this.isGlobalFiltersMode)
        this.model.geo = this.getGeoByRegion_(a, this.model.geo);
    else {
        var c = this.getGeoByRegion_(a, this.model.terms[b].selectedGeo.geo);
        this.model.terms.forEach(function(a) {
            a.selectedGeo.geo = c
        })
    }
}
;
e.createRequestParams = function() {
    var a = []
      , b = this.model.geo
      , c = this.model.period && this.model.period.id;
    this.lodash_.forEachRight(this.model.terms, function(d) {
        var f = d.selectedTerm.mid;
        (f || a.length) && a.unshift({
            keyword: f,
            geo: this.isGlobalFiltersMode ? b : d.selectedGeo.geo,
            time: this.isGlobalFiltersMode ? c : d.selectedPeriod.period.id
        })
    }, this);
    a.length || a.push({
        geo: b,
        time: c
    });
    return {
        comparisonItem: a,
        category: this.model.category,
        property: this.model.property
    }
}
;
e.refresh_ = function() {
    var a = this
      , b = void 0
      , b = this.createRequestParams();
    if (!this.lodash_.isEqual(this.requestParamsCache_, b))
        return this.requestParamsCache_ = b,
        this.isQuerying = !0,
        this.shareConfig.exploreParams = b,
        b = this.exploreService.getExploreReport(b),
        b.success(this.lodash_.bindKey(this, "applyRefreshData_")),
        b.error(function() {
            a.errorMessage = !0;
            a.widgets = []
        }),
        b["finally"](function() {
            a.isQuerying = !1
        }),
        b
}
;
e.applyRefreshData_ = function(a) {
    this.errorMessage = !1;
    this.examples = a.examples;
    this.widgets = a.widgets;
    this.isEmptyState = !a.widgets.length;
    this.shareConfig.title = a.shareText;
    this.storyId = this.location_.search().s;
    this.storyTitle = this.location_.search().e;
    this.exploreUrl = this.location_.url().replace(/explore(\?|\/\?)?/, "").replace(/^\//, "");
    this.model.isDefaultData && (this.model.terms = this.lodash_.map(a.keywords, function(a, c) {
        c = this.model.terms[c];
        return this.createTermObject({
            title: a.name,
            mid: a.keyword,
            type: a.type
        }, c.selectedGeo.geo, c.selectedPeriod.period.id, !a.keyword && !this.rootScope_.globals.isMobileMode)
    }, this),
    this.model.isDefaultData = !1);
    this.resetPeriodNames_(a.timeRanges)
}
;
e.resetPeriodNames_ = function(a) {
    if (this.isGlobalFiltersMode)
        this.model.period = {
            id: this.model.period.id,
            name: a[0]
        };
    else
        for (var b = 0; b < a.length; b++)
            this.model.terms[b].selectedPeriod.period = {
                id: this.model.terms[b].selectedPeriod.period.id,
                name: a[b]
            }
}
;
e.getModelFromQueryString_ = function() {
    var a = this
      , b = this.exploreCompatibilityService_.getHashQueryStringParams() || this.location_.search()
      , c = function(c) {
        return a.lodash_.isString(b[c]) ? b[c].split(",") : []
    }
      , d = parseInt(b.cat)
      , f = c("q")
      , g = c("geo")
      , h = c("date")
      , c = {
        category: this.lodash_.isNaN(d) ? void 0 : d,
        property: b.gprop
    };
    0 < f.length && (1 < g.length || 1 < h.length) ? this.lodash_.assign(c, {
        geo: null,
        period: null,
        terms: this.lodash_.map(this.lodash_.zip(f, g, h), function(a) {
            return this.createTermObject(a[0] || f[0], a[1] || g[0], a[2] || h[0])
        }, this)
    }) : (!f.length && 1 < g.length && (b.geo = g[0]),
    this.lodash_.assign(c, {
        geo: this.lodash_.isString(b.geo) ? b.geo : "",
        period: this.lodash_.isString(b.date) ? {
            id: b.date
        } : void 0,
        terms: this.lodash_.map(f, function(a) {
            return this.createTermObject(a)
        }, this)
    }));
    0 == c.terms.length && delete c.terms;
    return c
}
;
e.setQueryStringParams_ = function() {
    var a = this.location_.search()
      , b = this.model.period && this.model.period.id !== this.exploreService.defaultPeriod ? this.model.period.id : void 0
      , c = []
      , d = []
      , f = [];
    this.lodash_.forEachRight(this.model.terms, function(a) {
        if (a.selectedTerm.mid || c.length)
            c.unshift(a.selectedTerm.mid),
            d.unshift(a.selectedGeo.geo),
            f.unshift(a.selectedPeriod.period.id)
    });
    b = this.lodash_.assign({
        cat: 0 < this.model.category ? "" + this.model.category : "",
        date: this.isGlobalFiltersMode ? b : f.join(","),
        geo: this.isGlobalFiltersMode ? this.model.geo : d.join(","),
        gprop: this.model.property,
        q: c.join(",")
    }, this.lodash_.pick(a, "hl", "tz", "e", "s"));
    b = this.lodash_.pick(b, this.lodash_.identity);
    this.lodash_.isEqual(b, a) || (this.location_.search(b).state(this.lodash_.clone(this.model)),
    this.trackingService_.trackPageview(this.location_.url()))
}
;
e.resetFilters = function(a, b) {
    var c = this;
    this.model.geo = a || this.exploreService.defaultGeo;
    this.model.period = b || {
        id: this.exploreService.defaultPeriod
    };
    this.lodash_.forEach(c.model.terms, function(a) {
        a.selectedGeo.geo = c.exploreService.defaultGeo;
        a.selectedPeriod.period = {
            id: c.exploreService.defaultPeriod
        }
    })
}
;
e.handlePillFiltersUpdate = function(a) {
    a.selectedGeo && a.selectedPeriod && (a.selectedGeo.geo !== this.model.geo || a.selectedPeriod.period.id !== this.model.period.id) && (this.model.geo = null,
    this.model.period = null);
    a.selectedTerm && a.selectedTerm.mid || !(1 < !this.model.terms.length) || this.isGlobalFiltersMode || (this.model.geo = this.exploreService.defaultGeo,
    this.model.period = {
        id: this.exploreService.defaultPeriod
    })
}
;
e.createTermObject = function(a, b, c, d) {
    b || (b = this.model && this.model.geo || this.exploreService.defaultGeo);
    c || (c = this.model && this.model.period && this.model.period.id || this.exploreService.defaultPeriod);
    d || (d = !1);
    return {
        selectedTerm: this.exploreService.createSearchTerm(a),
        selectedGeo: {
            geo: b
        },
        selectedPeriod: {
            period: {
                id: c
            }
        },
        isFocus: d,
        pillJustAdded: !1
    }
}
;
var pj = function(a, b, c, d, f, g) {
    this.window_ = a;
    this.http_ = b;
    this.q_ = c;
    this.lodash_ = d;
    this.collectionsService_ = f;
    this.configService_ = g;
    this.apiPathPrefix_ = g.pathPrefix + "/api/explore";
    this.promisesCache_ = {};
    this.dataCache_ = {};
    this.defaultGeo = "";
    this.defaultPeriod = "today 5-y"
};
k("$jscomp.scope.ExploreService", pj, void 0);
pj.$inject = "$window $http $q lodash collectionsService configService".split(" ");
var qj = [{
    id: "",
    name: "Web Search"
}, {
    id: "images",
    name: "Image Search"
}, {
    id: "news",
    name: "News Search"
}, {
    id: "froogle",
    name: "Google Shopping"
}, {
    id: "youtube",
    name: "YouTube Search"
}]
  , rj = {
    fe_geo_chart_explore: "comparedgeo",
    fe_geo_color_chart: "comparedgeo",
    fe_line_chart: "multiline",
    fe_multi_range_chart: "multirange",
    fe_related_searches: "relatedsearches"
};
e = pj.prototype;
e.exportAsCSV = function(a, b, c) {
    a = encodeURIComponent(JSON.stringify(a));
    c = "/trends/api/widgetdata" + ("/" + this.convertWidgetTypeToApiName_(c) + "/csv");
    c = c + ("?req=" + a + "&token=" + b) + ("&tz=" + this.configService_.userTimezoneOffset);
    this.downloadCsvFile_(c)
}
;
e.downloadCsvFile_ = function(a) {
    this.window_.location.href = a
}
;
e.convertWidgetTypeToApiName_ = function(a) {
    return rj[a]
}
;
e.getPeriodOptions = function() {
    this.dataCache_.period || (this.dataCache_.period = new this.collectionsService_.OrderedDict(this.window_.exploreTimePicker));
    return this.dataCache_.period
}
;
e.getPropertyOptions = function() {
    this.dataCache_.property || (this.dataCache_.property = new this.collectionsService_.OrderedDict(qj));
    return this.dataCache_.property
}
;
e.getCategoryPicker = function() {
    return this.getDataTreeResource_("/pickers/category")
}
;
e.getDataTreeResource_ = function(a) {
    var b = this
      , c = this.promisesCache_[a];
    c || (c = this.http_.get(this.apiPathPrefix_ + a),
    c = this.q_.when(c, function(a) {
        return new b.collectionsService_.DataTree(a.data)
    }, function() {
        delete b.promisesCache_[a]
    }),
    this.promisesCache_[a] = c);
    return c
}
;
e.getExploreReport = function(a) {
    a = {
        req: JSON.stringify(a),
        tz: this.configService_.userTimezoneOffset
    };
    return this.http_.get(this.apiPathPrefix_, {
        params: a
    })
}
;
e.getGeoPicker = function() {
    return this.getDataTreeResource_("/pickers/geo")
}
;
e.createSearchTerm = function(a) {
    a ? a.title && (a.title = a.title.trim()) : a = null;
    return this.lodash_.isObject(a) ? a : {
        title: a,
        mid: a,
        type: a ? "Search term" : ""
    }
}
;
var sj = function(a, b, c, d, f, g, h, m, l, n, t) {
    this.scope = c;
    this.setSelectedTerm = a;
    this.clearTerm = b;
    this.mdDialog_ = d;
    this.config = f;
    this.lodash = g;
    this.document = h;
    this.searchService = m;
    this.timeout_ = l;
    this.mdUtil_ = n;
    this.autoCompleteCtrl = null;
    this.exploreService_ = t;
    c.onAutoCompleteSelect = g.bindKey(this, "setTermByTouch", c)
};
k("$jscomp.scope.SearchTermAutocompleteMobileDialogCtrl", sj, void 0);
sj.$inject = "setSelectedTerm clearTerm $scope $mdDialog configService lodash $document searchService $timeout $mdUtil exploreService".split(" ");
e = sj.prototype;
e.bindUI = function(a, b) {
    var c = this
      , d = this.lodash.bindKey(this, "onMobileInputKeyEvent_");
    a.$applyAsync(function() {
        c.autoCompleteCtrl = b.find("md-autocomplete-wrap").scope().$mdAutocompleteCtrl;
        var a = c.document[0].querySelector("md-virtual-repeat-container #ul-" + c.autoCompleteCtrl.id).parentNode.parentNode.parentNode.classList;
        a.add("term-repeat");
        c.timeout_(function() {
            a.add("show-dropdown")
        }, 350);
        var g = b.find("input")
          , h = g[0];
        h.focus();
        /iPhone/.test(window.navigator.userAgent) && (h.click(),
        h.click());
        h.setSelectionRange && h.setSelectionRange(0, h.value.length);
        g.bind("keydown", d);
        0 < c.scope.acInputTextItem.length && (c.autoCompleteCtrl.matches = c.searchService.getAutoCompleteList(c.scope, c.scope.acInputTextItem, !0))
    })
}
;
e.setTermByTouch = function(a, b) {
    b && b.title && (b.title = b.title.trim(),
    this.setSelectedTerm(b, b.title),
    this.cancelDialog_())
}
;
e.onMobileInputKeyEvent_ = function(a) {
    13 == a.which && ((a = a.target.value.trim()) && this.setSelectedTerm(this.exploreService_.createSearchTerm(a), a),
    this.cancelDialog_())
}
;
e.backArrowClickHandler = function() {
    var a = this.scope.term.selectedTerm;
    a && a.mid || this.clearTerm();
    this.cancelDialog_()
}
;
e.cancelDialog_ = function() {
    var a = this;
    this.timeout_(function() {
        a.scope.inputElement.blur();
        a.mdDialog_.cancel();
        a.timeout_(function() {
            a.mdUtil_.disableScrollAround._count = 0
        }, 100)
    }, 100)
}
;
var Y, tj, uj, vj, wj, xj, yj, zj, Aj, Bj, Cj = function() {
    this.restrict = "E";
    this.templateUrl = "/explorepage/search-term-directive.html";
    this.scope = {
        term: "=",
        termChangeHandler: "&",
        resetFiltersHandler: "&",
        tabHandler: "&",
        isGlobalFiltersMode: "=",
        isSmallPillsMode: "=",
        isSingle: "&",
        isWebSearch: "=",
        color: "@"
    };
    this.link = Y.bind(this.link, this)
};
e = Cj.prototype;
e.link = function(a, b) {
    var c = Y.bindKey(this, "setSmallPill_", a);
    a.config = tj;
    a.showFilters = !1;
    a.changingSearchText = !0;
    a.acInputTextItem = a.term.selectedTerm.title;
    a.openOptionsMenuBind = Y.bindKey(this, "openOptionsMenu");
    a.getAutoCompleteListBind = Y.bindKey(uj, "getAutoCompleteList", a);
    a.clearTermBind = Y.bindKey(this, "clearTerm", a);
    a.editTermBind = Y.bindKey(this, "editTerm", a);
    a.showFilterDialogBind = Y.bindKey(this, "showFilterDialog", a);
    a.addDialogContainerClass = Y.bindKey(this, "addDialogContainerClass_");
    a.showSearchTermAutocompleteDialog = Y.bindKey(this, "showSearchTermAutocompleteDialog_", a);
    a.onAutoCompleteSelect = Y.bindKey(this, "onAutoCompleteSelect", a);
    a.clearInputBind = Y.bindKey(this, "clearInput_", a);
    a.$applyAsync(Y.bindKey(this, "bindUI_", a, b));
    a.$watch("isSmallPillsMode", c);
    a.isTermSelected = !1;
    a.periodOptions = vj.getPeriodOptions();
    this.loadGeoPicker_(a);
    a.term.pillJustAdded && a.$root.globals.isMobileMode && a.showSearchTermAutocompleteDialog();
    a.term.pillJustAdded = !1;
    a.isTouchDevice = wj.isTouchDevice();
    a.isPageRtl = xj.isPageRtl();
    a.optionsMenuOffset = a.isPageRtl ? "140 0" : "-140 0"
}
;
e.loadGeoPicker_ = function(a) {
    vj.getGeoPicker().then(function(b) {
        a.geoOptions = b
    }, null)
}
;
e.onInputKeyEvent_ = function(a, b) {
    if (!(13 == b.which && 0 <= a.mdAutocompleteCtrl.index || 13 != b.which && 9 != b.which && "," != b.key)) {
        var c = b.target.value.trim();
        c ? this.setSelectedTerm(a, vj.createSearchTerm(c)) : this.clearTerm(a);
        a.inputElement[0].blur();
        9 != b.which && "," != b.key || !c || a.$applyAsync(a.tabHandler);
        b.preventDefault()
    }
}
;
e.bindUI_ = function(a, b) {
    var c = b.find("md-autocomplete-wrap").scope().$mdAutocompleteCtrl
      , d = yj[0].querySelector("md-virtual-repeat-container #ul-" + c.id)
      , f = Y.bindKey(this, "setAutocompleteCss_", a)
      , g = Y.bindKey(this, "toggleFocus_", a);
    a.repeatElement = d.parentNode.parentNode.parentNode;
    a.element = b;
    a.inputElement = b.find("input");
    a.mdAutocompleteCtrl = c;
    a.$watch("mdAutocompleteCtrl.hidden", f);
    angular.element(d).bind("mousedown", function() {
        a.preventBlur = !0
    });
    a.$watch("term.isFocus", g);
    a.mdAutocompleteCtrl.focus = Y.wrap(a.mdAutocompleteCtrl.focus, function(b) {
        a.$applyAsync(b)
    });
    a.repeatElement.classList.add("term-repeat");
    this.setSmallPill_(a);
    a.onInputKeyEventBind = Y.bindKey(this, "onInputKeyEvent_", a);
    a.inputElement.bind("keydown", a.onInputKeyEventBind);
    var h = Y.bindKey(this, "onBlurEvent_", a);
    a.inputElement.bind("blur", h);
    var m = Y.bindKey(this, "onFocusEvent_", a);
    a.inputElement.bind("focus", m);
    a.$on("$destroy", function() {
        a.inputElement.unbind("keydown", a.onInputKeyEventBind);
        a.inputElement.unbind("blur", h);
        a.inputElement.unbind("focus", m)
    })
}
;
e.setSelectedTerm = function(a, b, c) {
    b && (a.isTermSelected = !0,
    b.title = b.title.trim(),
    a.term.selectedTerm = b,
    c && (a.acInputTextItem = c),
    a.termChangeHandler({
        entity: a.term
    }))
}
;
e.onAutoCompleteSelect = function(a, b) {
    b && (this.setSelectedTerm(a, b),
    a.preventFocus = !0,
    a.inputElement[0].blur())
}
;
e.onFocusEvent_ = function(a) {
    a.preventFocus ? (a.preventFocus = !1,
    a.inputElement[0].blur()) : (a.element.addClass("pill-selected"),
    a.inputElement[0].select(),
    a.acInputTextItem && 0 < a.acInputTextItem.length && (a.mdAutocompleteCtrl.scope.selectedItem = void 0,
    a.mdAutocompleteCtrl.matches = uj.getAutoCompleteList(a, a.acInputTextItem, !0),
    a.mdAutocompleteCtrl.focus()))
}
;
e.onBlurEvent_ = function(a) {
    if (a.preventBlur)
        a.preventBlur = !1;
    else {
        if (!a.isTermSelected) {
            var b = a.term.selectedTerm && a.term.selectedTerm.title || "";
            a.isSingle() || b ? a.acInputTextItem = b : this.clearTerm(a)
        }
        zj(function() {
            document.activeElement !== a.inputElement[0] && (a.element.removeClass("pill-selected"),
            a.isTermSelected = !1)
        }, 100)
    }
}
;
e.toggleFocus_ = function(a, b) {
    !a.$root.globals.isMobileMode && b && a.inputElement[0].focus();
    a.term.isFocus = !1
}
;
e.setAutocompleteCss_ = function(a) {
    a.element.toggleClass("autocomplete-open", !a.mdAutocompleteCtrl.hidden)
}
;
e.setSmallPill_ = function(a) {
    a.repeatElement && (a.isSmallPillsMode ? a.repeatElement.classList.add("small-pill") : a.repeatElement.classList.remove("small-pill"))
}
;
e.clearTerm = function(a) {
    zj(function() {
        a.termChangeHandler({
            entity: {
                selectedTerm: void 0
            }
        })
    }, 750)
}
;
e.editTerm = function(a) {
    a.$root.globals.isMobileMode ? this.showSearchTermAutocompleteDialog_(a) : a.inputElement[0].focus()
}
;
e.clearInput_ = function(a) {
    a.inputElement[0].value && a.mdAutocompleteCtrl.clear()
}
;
e.openOptionsMenu = function(a, b) {
    a(b)
}
;
e.showFilterDialog = function(a) {
    Aj("SearchTermFilterDialogCtrl", {
        $scope: a.$new(),
        onFiltersPick: function(b, c) {
            a.term.selectedGeo.geo = b;
            a.term.selectedPeriod.period = c;
            a.termChangeHandler({
                entity: a.term
            })
        },
        currentSelectedGeo: a.term.selectedGeo.geo,
        currentSelectedPeriod: Y.clone(a.term.selectedPeriod.period),
        searchTermTitle: a.term.selectedTerm.title,
        isWebSearch: a.isWebSearch
    }).showModal()
}
;
e.showSearchTermAutocompleteDialog_ = function(a) {
    Bj.show({
        scope: a.$new(),
        clickOutsideToClose: !0,
        controller: "SearchTermAutocompleteMobileDialogCtrl",
        controllerAs: "ctrl",
        templateUrl: "/explorepage/search-term-autocomplete-mobile-dialog.html",
        onShowing: Y.bindKey(this, "onDialogShow_"),
        focusOnOpen: !1,
        setSelectedTerm: Y.bindKey(this, "setSelectedTerm", a),
        clearTerm: Y.bindKey(this, "clearTerm", a),
        getAutoCompleteListBind: a.getAutoCompleteListBind
    })
}
;
e.onDialogShow_ = function(a, b, c, d) {
    d.bindUI(a, b)
}
;
var Dj = function(a, b, c, d, f, g, h, m, l, n) {
    yj = a;
    Aj = b;
    Y = c;
    uj = d;
    zj = f;
    vj = g;
    tj = h;
    Bj = m;
    wj = l;
    xj = n;
    return new Cj
};
k("$jscomp.scope.directiveInjector$jscomp$44", Dj, void 0);
Dj.$inject = "$document $controller lodash searchService $timeout exploreService configService $mdDialog globalsService bidiService".split(" ");
var Ej = function(a, b, c, d, f, g, h, m, l) {
    this.scope_ = a;
    this.modalService_ = b;
    this.lodash_ = c;
    this.onFiltersPick_ = d;
    this.selectedGeo = f;
    this.selectedPeriod = g;
    this.geoOptions = null;
    this.periodOptions = m.getPeriodOptions();
    this.searchTermTitle = h;
    this.exploreService_ = m;
    this.isWebSearch = l;
    this.loadGeoPicker_()
};
k("$jscomp.scope.SearchTermFilterDialogCtrl", Ej, void 0);
Ej.$inject = "$scope $mdDialog lodash onFiltersPick currentSelectedGeo currentSelectedPeriod searchTermTitle exploreService isWebSearch".split(" ");
e = Ej.prototype;
e.hideModal = function() {
    this.modalService_.hide();
    this.scope_.$destroy()
}
;
e.loadGeoPicker_ = function() {
    var a = this;
    this.exploreService_.getGeoPicker().then(function(b) {
        a.geoOptions = b
    }, null)
}
;
e.okClickHandle = function() {
    var a = this;
    this.scope_.$applyAsync(function() {
        a.onFiltersPick_(a.selectedGeo, a.selectedPeriod);
        a.hideModal()
    })
}
;
e.showModal = function() {
    this.modalService_.show({
        controller: this.lodash_.constant(this),
        controllerAs: "ctrl",
        scope: this.scope_,
        templateUrl: "/explorepage/search-term-filter-dialog.html",
        clickOutsideToClose: !0,
        preserveScope: !0,
        onComplete: this.lodash_.bindKey(this, "addDialogContainerClass_")
    })
}
;
e.addDialogContainerClass_ = function(a, b) {
    b.addClass("fix-dialog-z-index")
}
;
var Fj = function(a, b, c, d, f, g, h, m, l) {
    this.scope_ = a;
    this.routeParams_ = b;
    this.document_ = c;
    this.timeout_ = m;
    this.oldStories_ = void 0;
    this.lodash_ = f;
    this.storyService_ = g;
    this.configService_ = h;
    this.errorMessage = void 0;
    this.showErrorMessage = !1;
    this.category = this.getCategory_();
    this.location_ = l;
    this.categoryHomeUrl = this.routeParams_.category && "all" !== this.routeParams_.category ? "home/" + this.routeParams_.category : "home/all";
    this.geoHomeUrl = this.routeParams_.geo || "US";
    this.isQuerying = !1;
    this.trendingDataFullscreen = [];
    this.hideAllImages = !1;
    this.window_ = d;
    this.sparklineSize = [];
    this.currentDate = "";
    this.isPageScrollInProgress = !0;
    this.isHighResolution_ = this.isHighRes_();
    this.currentPageNumber = 0;
    this.isTitleShadow = !1;
    this.refreshLatestTrendingStoriesFS_();
    this.scrollDownTimeoutCallback_ = this.lodash_.bind(this.scrollDown_, this);
    this.onScrollEventTimeoutPromise_ = void 0;
    this.realNumberOfPages = 4;
    this.pageBulletsArray = [0, 1, 2, 3];
    this.scrollDownTimeoutPromise_ = this.timeout_(this.scrollDownTimeoutCallback_, 3E4);
    angular.element(this.document_[0].documentElement).addClass("no-scroll");
    this.scrollStepTimeoutPromise_ = void 0;
    this.onResizeBind = this.lodash_.bind(this.onResize_, this);
    this.onResize_();
    var n = angular.element(d);
    n.bind("resize", this.onResizeBind);
    this.onScrollBind = this.lodash_.bind(this.onScroll_, this);
    n.bind("scroll", this.onScrollBind);
    this.onKeyupBind = this.lodash_.bind(this.keyUpHandler_, this);
    n.bind("keyup", this.onKeyupBind);
    this.scope_.$on("$destroy", this.lodash_.bind(function() {
        n.unbind("resize", this.onResizeBind);
        n.unbind("scroll", this.onScrollBind);
        n.unbind("keyup", this.onKeyupBind);
        this.timeout_.cancel(this.scrollDownTimeoutPromise_);
        this.timeout_.cancel(this.scrollStepTimeoutPromise_);
        this.timeout_.cancel(this.onScrollEventTimeoutPromise_)
    }, this))
};
k("$jscomp.scope.FullScreenPageCtrl", Fj, void 0);
Fj.$inject = "$scope $routeParams $document $window lodash storyService configService $timeout $location".split(" ");
var Gj = [97, 33]
  , Hj = [120, 44];
e = Fj.prototype;
e.applyLatestResponse_ = function(a) {
    a = this.lodash_.bindKey(this, "applyLatestResponseCallback_", a);
    this.timeout_(a, 0)
}
;
e.applyLatestResponseCallback_ = function(a) {
    var b = a.storySummaries.trendingStories
      , c = b.length
      , d = this.numOfStoriesPerPage_()
      , f = 4 * d;
    f > c ? this.realNumberOfPages = Math.ceil(c / d) : (this.realNumberOfPages = 4,
    b = b.slice(0, f));
    this.pageBulletsArray = this.lodash_.range(this.realNumberOfPages);
    this.oldStories_ && (b = this.setArrows_(this.oldStories_, b));
    this.hideAllImages = a.hideAllImages;
    this.trendingDataFullscreen = b;
    this.currentDate = a.date;
    this.trendingDataFullscreen.length || (this.showErrorMessage = !0);
    this.oldStories_ = b
}
;
e.refreshLatestTrendingStoriesFS_ = function() {
    var a = this
      , b = this.storyService_.getLatestTrending({
        geo: this.routeParams_.geo || this.configService_.defaultGeo,
        category: this.routeParams_.category || "all",
        trendingSize: 200,
        trendingPrefetchSize: 200
    });
    this.isQuerying = !0;
    b.success(this.lodash_.bindKey(this, "applyLatestResponse_"));
    b.error(function(b) {
        this.showErrorMessage = !0;
        a.errorMessage = b
    });
    b["finally"](function() {
        a.isQuerying = !1
    });
    return b
}
;
e.scrollDown_ = function() {
    var a = this.getTrendingStoriesElement_();
    a.children.length > this.numOfStoriesPerPage_() && (a = this.calcDeltaPixels_(a),
    this.scrollWithDuration_(a, 750));
    this.scrollDownTimeoutPromise_ = this.timeout_(this.scrollDownTimeoutCallback_, 3E4)
}
;
e.getTrendingStoriesElement_ = function() {
    return this.document_[0].querySelector(".homepage-trending-stories-fs").children[0]
}
;
e.calcDeltaPixels_ = function(a) {
    var b = this.realNumberOfPages;
    this.currentPageNumber = (this.currentPageNumber + 1) % b;
    0 === this.currentPageNumber && this.refreshLatestTrendingStoriesFS_();
    a = a.children[Math.floor(a.children.length / b) * this.currentPageNumber].getBoundingClientRect().top;
    return a -= this.isHighRes_() ? 128 : 64
}
;
e.scrollWithDuration_ = function(a, b) {
    if (0 !== a) {
        var c = !1;
        0 > a && (c = !0,
        a = -a);
        var d = 10;
        2400 <= a && (d = 15);
        this.scrollStep_(a, b / Math.floor(a / d), d, c, a % d)
    }
}
;
e.scrollStep_ = function(a, b, c, d, f) {
    a -= c;
    0 < a ? (this.window_.scrollBy(0, d ? -c : c),
    a = this.lodash_.bindKey(this, "scrollStep_", a, b, c, d, f),
    this.scrollStepTimeoutPromise_ = this.timeout_(a, b)) : 0 < f && this.window_.scrollBy(0, d ? -f : f)
}
;
e.togglePageScroll = function(a) {
    this.isPageScrollInProgress = !a;
    var b = angular.element(this.document_[0].documentElement);
    a ? (this.timeout_.cancel(this.scrollDownTimeoutPromise_),
    this.timeout_.cancel(this.scrollStepTimeoutPromise_),
    b.removeClass("no-scroll"),
    this.currentPageNumber = void 0) : (b.addClass("no-scroll"),
    this.currentPageNumber = -1,
    this.scrollDown_())
}
;
e.bulletClick = function(a) {
    this.timeout_.cancel(this.scrollDownTimeoutPromise_);
    this.timeout_.cancel(this.scrollStepTimeoutPromise_);
    this.currentPageNumber = a - 1;
    this.scrollDown_()
}
;
e.setArrows_ = function(a, b) {
    for (var c = {}, d = 0; d < a.length; d++)
        c[a[d].id.toString()] = d;
    for (a = 0; a < b.length; a++)
        d = c[b[a].id.toString()],
        b[a].positionFlag = 0 === d || d ? a < d ? "up" : d < a ? "down" : "" : "new";
    return b
}
;
e.numOfStoriesPerPage_ = function() {
    return Math.floor((this.getDocumentHeight_() - (this.isHighRes_() ? 128 : 64)) / (this.isHighResolution_ ? 141 : 113))
}
;
e.getDocumentHeight_ = function() {
    var a = this.document_[0].documentElement
      , b = this.document_[0].body;
    return Math.max(a.offsetHeight, a.clientHeight, b.offsetHeight, b.clientHeight)
}
;
e.onResize_ = function() {
    this.isHighRes_() ? (this.sparklineSize = Hj,
    this.isHighResolution_ = !0) : (this.sparklineSize = Gj,
    this.isHighResolution_ = !1)
}
;
e.isHighRes_ = function() {
    return 1980 <= this.window_.innerWidth
}
;
e.onScroll_ = function() {
    this.timeout_.cancel(this.onScrollEventTimeoutPromise_);
    this.onScrollEventTimeoutPromise_ = this.scrollEventHandlerHelper_(this, function() {
        this.isTitleShadow = this.window_.pageYOffset >= this.document_[0].querySelector(".page-top").offsetHeight - this.document_[0].querySelector(".header-wrapper-fs").offsetHeight;
        this.scope_.$apply()
    })
}
;
e.scrollEventHandlerHelper_ = function(a, b) {
    b = a.lodash_.bind(b, a);
    return a.timeout_(b, 5)
}
;
e.getCategory_ = function() {
    var a = this.routeParams_.category
      , b = "";
    a && "all" !== a && this.lodash_.forEach(catPicker, function(c) {
        c.id === a && (b = c.name)
    });
    return b
}
;
e.keyUpHandler_ = function(a) {
    27 === a.keyCode && this.location_.path("/" + this.categoryHomeUrl + "/" + this.geoHomeUrl + "/")
}
;
var Kj = function(a, b, c, d, f, g, h, m, l, n, t) {
    this.scope_ = a;
    this.routeParams_ = b;
    this.categoryFullScreenUrl = this.routeParams_.category && "all" !== this.routeParams_.category ? "/" + this.routeParams_.category : "/all";
    this.geoFullScreenUrl = this.routeParams_.geo ? "/" + this.routeParams_.geo : "/US";
    this.timeout_ = n;
    this.lodash_ = f;
    this.storyService_ = g;
    this.configService_ = h;
    this.trackingService_ = l;
    this.enableFullScreenPage = d.enableFullScreenPage;
    this.globalsService = m;
    this.showErrorMessage = !1;
    this.featuredData = [];
    this.isQuerying = !1;
    this.trendingDataByPage = [];
    this.pagedStoryIdsForDedup_ = {};
    this.trendingItemsPerPage_ = this.trendingPagesCount = 0;
    this.trendingIdentifiers = [];
    this.hideAllImages = !1;
    this.isTouchDevice = !!("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    this.banner = {
        text: d.bannerText,
        linkUrl: d.bannerLinkUrl,
        imgUrl: d.bannerImgUrl
    };
    this.currentDate = "";
    this.sparklineSize = [];
    c.pageTitle = "";
    !f.isEqual(b, Ij.lastRouteParams) || 216E5 < new Date - Ij.lastRefresh ? this.refreshLatestStories(!1) : (this.featuredData = Ij.featuredData,
    this.trendingDataByPage = Ij.trendingDataByPage,
    this.pagedStoryIdsForDedup_ = Ij.pagedStoryIdsForDedup_,
    this.trendingIdentifiers = Ij.trendingIdentifiers,
    this.trendingItemsPerPage_ = Ij.trendingItemsPerPage_,
    this.trendingPagesCount = Ij.trendingPagesCount,
    this.banner = Ij.banner,
    this.currentDate = Ij.currentDate,
    h.homeClickHandler = Jj);
    t[0].body.style["background-color"] = "#eee";
    var u = this.lodash_.bind(this.onResize_, this);
    this.onResize_();
    var x = angular.element(d);
    x.bind("resize", u);
    this.scope_.$on("$destroy", function() {
        x.unbind("resize", u)
    })
};
k("$jscomp.scope.HomeCtrl", Kj, void 0);
Kj.$inject = "$scope $routeParams $rootScope $window lodash storyService configService globalsService trackingService $timeout $document".split(" ");
var Ij = {}
  , Lj = [96, 32]
  , Mj = [48, 24]
  , Jj = function() {
    delete Ij.lastRouteParams
};
e = Kj.prototype;
e.applyLatestResponse_ = function(a) {
    a = this.lodash_.bindKey(this, "applyLatestResponseCallback_", a);
    this.timeout_(a, 0)
}
;
e.applyLatestResponseCallback_ = function(a) {
    var b = this
      , c = a.storySummaries;
    c.featuredStories && 2 <= c.featuredStories.length && (this.featuredData = c.featuredStories);
    this.hideAllImages = a.hideAllImages;
    this.trendingDataByPage = [c.trendingStories];
    var d = this.lodash_;
    d.forEach(c.trendingStories, function(a) {
        d.forEach(a.idsForDedup, function(a) {
            b.pagedStoryIdsForDedup_[a] = !0
        })
    });
    this.trendingIdentifiers = a.trendingStoryIds;
    this.trendingPagesCount = Math.ceil(a.trendingStoryIds.length / this.trendingItemsPerPage_);
    this.banner = a.banner;
    this.currentDate = a.date;
    this.trendingIdentifiers.length || (this.showErrorMessage = !0);
    Ij = {
        featuredData: this.featuredData,
        trendingDataByPage: this.trendingDataByPage,
        pagedStoryIdsForDedup_: this.pagedStoryIdsForDedup_,
        trendingIdentifiers: this.trendingIdentifiers,
        trendingItemsPerPage_: this.trendingItemsPerPage_,
        trendingPagesCount: this.trendingPagesCount,
        banner: this.banner,
        currentDate: this.currentDate,
        lastRefresh: new Date,
        lastRouteParams: d.clone(this.routeParams_)
    }
}
;
e.getCurrentPageNumber = function() {
    return this.trendingDataByPage.length
}
;
e.getIdentifiersByPage_ = function(a) {
    a = Math.max(a - 1, 0) * this.trendingItemsPerPage_;
    return this.trendingIdentifiers.slice(a, a + this.trendingItemsPerPage_)
}
;
e.getNextPage = function() {
    var a = this, b = this.getCurrentPageNumber(), c;
    !this.isQuerying && b < this.trendingPagesCount && (c = this.queryService_("getSummaries", this.getIdentifiersByPage_(b + 1)),
    this.trackingService_.trackEvent("Home", "Trending", "Scroll", b + 1),
    c.success(function(b) {
        b = a.getFilteredTrendingStories_(b.trendingStories);
        a.trendingDataByPage.push(b)
    }));
    return c
}
;
e.getFilteredTrendingStories_ = function(a) {
    var b = this.pagedStoryIdsForDedup_
      , c = []
      , d = this.lodash_;
    d.forEach(a, function(a) {
        d.some(a.idsForDedup, function(a) {
            return a in b
        }) || (c.push(a),
        d.forEach(a.idsForDedup, function(a) {
            b[a] = !0
        }))
    });
    return c
}
;
e.queryService_ = function(a, b) {
    var c = this
      , d = this.lodash_.rest(arguments)
      , d = this.storyService_[a].apply(this.storyService_, d);
    this.isQuerying = !0;
    d["finally"](function() {
        c.isQuerying = !1
    });
    return d
}
;
e.refreshLatestStories = function(a) {
    var b = this;
    !0 === this.routeParams_.geo && (this.routeParams_.geo = !1);
    var c = this.globalsService.isMobileMode ? 10 : 15
      , d = this.globalsService.isMobileMode ? 9 : 15
      , d = this.queryService_("getLatest", {
        geo: this.routeParams_.geo || this.configService_.defaultGeo,
        category: this.routeParams_.category || "all",
        featuredSize: d,
        featuredPrefetchSize: d,
        sort: this.routeParams_.sort || "0",
        trendingSize: this.globalsService.isMobileMode ? 150 : 300,
        trendingPrefetchSize: c
    });
    this.trendingItemsPerPage_ = c;
    !1 !== a && this.reset_();
    d.success(this.lodash_.bindKey(this, "applyLatestResponse_"));
    d.error(function() {
        b.showErrorMessage = !0
    });
    return d
}
;
e.refreshLatestTrendingStories = function(a) {
    var b = this;
    !0 === this.routeParams_.geo && (this.routeParams_.geo = !1);
    var c = this.globalsService.isMobileMode ? 10 : 15
      , d = this.queryService_("getLatestTrending", {
        geo: this.routeParams_.geo || this.configService_.defaultGeo,
        category: this.routeParams_.category || "all",
        trendingSize: this.globalsService.isMobileMode ? 150 : 300,
        trendingPrefetchSize: c
    });
    this.trendingItemsPerPage_ = c;
    !1 !== a && this.resetTrendingStories_();
    d.success(this.lodash_.bindKey(this, "applyLatestResponse_"));
    d.error(function() {
        b.showErrorMessage = !0
    });
    return d
}
;
e.reset_ = function() {
    this.resetTrendingStories_();
    this.featuredData = [];
    this.banner = {};
    this.currentDate = ""
}
;
e.resetTrendingStories_ = function() {
    this.showErrorMessage = !1;
    this.trendingDataByPage = [];
    this.trendingIdentifiers = [];
    this.trendingPagesCount = 0;
    this.pagedStoryIdsForDedup_ = {}
}
;
e.onResize_ = function() {
    this.sparklineSize = this.globalsService.isMobileMode ? Mj : Lj
}
;
var Nj = function(a, b, c, d, f, g, h, m, l, n, t, u, x, K) {
    this.document_ = a;
    this.lodash_ = f;
    this.window_ = d;
    this.timeout_ = n;
    this.storyService_ = g;
    this.pageLayouts_ = g.pageLayouts;
    this.config = h;
    this.globalsService = m;
    this.bidiService_ = t;
    this.location_ = u;
    this.route_ = x;
    this.paletteService_ = l;
    this.rootScope_ = c;
    this.showErrorMessage = !1;
    this.storyId = b.id;
    this.hideNews = b.hn;
    this.model = {
        bannerImgUrl: "",
        bannerVideoUrl: "",
        entityNames: [],
        eventName: "",
        pageLayout: "EMPTY_STORY",
        parentStoryId: "",
        subTitle: "",
        timeRange: "",
        timestamp: null,
        title: ""
    };
    this.widgetsIds = [];
    this.widgets = [];
    this.widgetsPerPage_ = this.widgetsPagesCount = this.numberOfWidgets = 0;
    this.components = [];
    this.palette = void 0;
    this.storyVersions = d.yisHubPicker;
    this.selectedCountry = this.getSelectedCountry_();
    this.selectedAlternative = f.result(f.find(d.yisHubPicker, "id", b.id), "name");
    this.firstAtomIsFeText = !1;
    this.shareConfig = null;
    this.electionsTabsStoriesIds = [d.electionsPresidentStoryId, d.electionsVpStoryId, d.electionsTicketStoryId];
    this.storyPromise = this.refresh_();
    this.backToStoryURL = this.headerTemplate = this.pageLayoutType = "";
    this.arrowBackPath = h.staticPathPrefix + "/ic_arrow_back_24px.svg";
    this.bannerVideoUrl = this.timeRange = this.subTitle = this.title = this.eventName = "";
    this.entityNames = null;
    this.isYisHubLayout = this.isYis2015HubLayout = this.isYis2016HubLayout = this.isOlympics2016StoryLayout = this.isOlympics2016GoobersLayout = !1;
    this.yearInSearch2016VideoEmbedUrl = d.yearInSearch2016VideoEmbedUrl;
    this.yearInSearch2016VideoEmbedUrlIndonesia = d.yearInSearch2016VideoEmbedUrlIndonesia;
    this.yearInSearch2016VideoEmbedUrlRussia = d.yearInSearch2016VideoEmbedUrlRussia;
    this.showContent = !0;
    this.candidatesTrackArray = ["Candidates-Elections", "Header Back", "Click"];
    this.stateTrackArray = ["State-Elections", "Header Back", "Click"];
    this.currentLocale = h.getYIS2016Locale();
    this.yis2016FrontDoorLink = this.getYis2016FrontDoorLink_();
    this.yis2016SGeoOptions = this.config.getYIS2016GeoLocationData();
    this.selectedGeoYis2016 = "";
    K.$watch("ctrl.selectedGeoYis2016", f.bindKey(this, "onYis2016GeoChange_"));
    K.$watch("ctrl.widgets", f.bindKey(this, "getCurrentWidgetsList_"))
};
k("$jscomp.scope.StoryCtrl", Nj, void 0);
Nj.$inject = "$document $routeParams $rootScope $window lodash storyService configService globalsService paletteService $timeout bidiService $location $route $scope".split(" ");
var Oj = ["PRESIDENT", "VICE PRESIDENT", "PRESIDENTIAL TICKET"]
  , Pj = ["PRESIDENT", "VICE PRESIDENT", "TICKET"]
  , Qj = ["PRESIDENT", "VP", "TICKET"];
e = Nj.prototype;
e.focusByHash_ = function(a) {
    (a = this.document_[0].getElementById(a)) && a.scrollIntoView()
}
;
e.getCurrentPageNumber = function() {
    return Math.ceil(this.widgets.length / this.widgetsPerPage_)
}
;
e.getIdentifiersByPage_ = function(a) {
    a = Math.max(a - 1, 0) * this.widgetsPerPage_;
    return this.widgetsIds.slice(a, a + this.widgetsPerPage_)
}
;
e.getCurrentWidgetsList_ = function() {
    return this.widgets
}
;
e.loadYis2016Widgets = function() {
    var a = this;
    if ((this.selectedGeoYis2016 || {}).id) {
        var b = this.queryService_("getYis2016Lists", this.selectedGeoYis2016.id);
        b.success(function(b) {
            a.widgets = b;
            var c = a.location_.hash();
            if (c && b.length) {
                var f = a.lodash_.findIndex(b, function(a) {
                    return a.id === c
                });
                b.unshift(b[f]);
                b.splice(f + 1, 1)
            }
        });
        return b
    }
}
;
e.getNextPage = function() {
    var a = this.getCurrentPageNumber(), b, c = this;
    !this.isQuerying && a < this.widgetsPagesCount && (b = this.queryService_("getStoryWidgets", this.storyId, this.getIdentifiersByPage_(a + 1)),
    b.success(function(a) {
        c.widgets = c.widgets || [];
        Array.prototype.push.apply(c.widgets, a)
    }));
    return b
}
;
e.getSelectedCountry_ = function() {
    var a = this
      , b = this.lodash_.findIndex(this.storyVersions, function(b) {
        return b.id === a.storyId
    });
    return -1 === b ? {} : this.storyVersions[b]
}
;
e.refresh_ = function() {
    var a, b;
    this.widgetsPerPage_ = this.globalsService.isDesktopMode ? 10 : 6;
    this.hideNews_ = this.hideNews ? !0 : null;
    this.updateYis2016HubLayout_();
    this.isYis2016HubLayout ? (this.storyId = a = "2016",
    b = "refreshSuccessCallback2016_") : (a = this.storyId,
    b = "refreshSuccessCallback_");
    a = this.queryService_("getStory", a, {
        widgetsPrefetchSize: this.widgetsPerPage_,
        hideNews: this.hideNews_
    });
    a.success(this.lodash_.bindKey(this, b));
    return a
}
;
e.getTopFeaturedComponent_ = function(a) {
    for (var b = 0; b < a.length; b++)
        if ("TOP_FEATURED" === a[b].component.type)
            return a[b];
    return null
}
;
e.updateYis2016HubLayout_ = function() {
    this.isYis2016HubLayout = -1 < this.location_.path().indexOf("/yis/2016")
}
;
e.refreshSuccessCallback2016_ = function(a) {
    var b = this.config.getSafeGeo();
    this.selectedGeoYis2016 = this.lodash_.find(this.yis2016SGeoOptions, {
        id: b
    });
    this.selectedGeoYis2016 || (this.selectedGeoYis2016 = this.yis2016SGeoOptions[0]);
    this.updateYis2016HubLayout_();
    this.document_[0].body.style["background-color"] = "#fff";
    a.entityNames && a.entityNames.length || (a.entityNames = [a.title]);
    this.lodash_.assign(this.model, a);
    this.eventName = this.model.eventName;
    this.widgetsIds = a.widgetIds;
    this.widgets = a.widgets;
    this.numberOfWidgets = this.widgets.length;
    this.widgetsPagesCount = Math.ceil(a.widgetIds.length / this.widgetsPerPage_);
    this.components = a.components;
    this.palette = this.paletteService_.getByThemeName(a.colorTheme);
    this.shareConfig = {
        title: a.title + (a.parentStoryId ? " - " + a.subTitle : ""),
        storyID: this.storyId
    };
    this.setPageTitle_();
    this.headerTemplate = this.getPageHeaderTemplate();
    this.pageLayoutType = "yis-content";
    this.title = this.model.title;
    this.subTitle = this.model.subTitle;
    this.timeRange = this.model.timeRange;
    this.model.bannerVideoUrl = this.getCustomBannerVideoUrl();
    this.entityNames = this.model.entityNames
}
;
e.refreshSuccessCallback_ = function(a) {
    var b = this.location_.hash();
    a.entityNames && a.entityNames.length || (a.entityNames = [a.title]);
    this.lodash_.assign(this.model, a);
    var c = this.location_.search().backToStoryId;
    this.model.backToStoryId = c || this.model.parentStoryId;
    this.backToStoryURL = this.config.pathPrefix + "/story/" + this.model.backToStoryId;
    this.model.pageLayout === this.pageLayouts_.OLYMPICS_2016_HUB ? (c = this.getTopFeaturedComponent_(a.components),
    null != c && c.widgets.forEach(function(a) {
        this.lodash_.find(a.widgetFields, {
            name: "storyLinkURL"
        }).value += "?backToStoryId=" + this.storyId + "&backToStoryTitle=" + this.model.title
    }, this)) : c && this.model.pageLayout === this.pageLayouts_.OLYMPICS_2016_STORY && (this.model.eventName = this.location_.search().backToStoryTitle);
    this.eventName = this.model.eventName;
    this.widgetsIds = a.widgetIds;
    this.widgets = a.widgets;
    this.numberOfWidgets = this.widgets.length;
    this.widgetsPagesCount = Math.ceil(a.widgetIds.length / this.widgetsPerPage_);
    this.components = a.components;
    this.palette = this.paletteService_.getByThemeName(a.colorTheme);
    this.shareConfig = {
        title: a.title + (a.parentStoryId ? " - " + a.subTitle : ""),
        storyID: this.storyId
    };
    this.firstAtomIsFeText = a.widgets && a.widgets.length && "fe_text" === a.widgets[0].widgetType && "fe_yis" === a.widgets[0].template;
    b && setTimeout(this.lodash_.bindKey(this, "focusByHash_", b), 250);
    this.setPageTitle_();
    this.pageLayoutType = this.getPageType();
    this.headerTemplate = this.getPageHeaderTemplate();
    this.isOlympics2016GoobersLayout = "OLYMPICS_2016_GOOBERS" === this.model.pageLayout;
    this.isOlympics2016StoryLayout = "OLYMPICS_2016_STORY" === this.model.pageLayout;
    this.isYis2015HubLayout = "YEAR_IN_SEARCH_2015_HUB" === this.model.pageLayout;
    this.isYisHubLayout = "YEAR_IN_SEARCH_2015_HUB" === this.model.pageLayout;
    this.showContent = "YEAR_IN_SEARCH_2016_HUB" !== this.model.pageLayout && (this.numberOfWidgets || !(this.isQuerying || this.showErrorMessage));
    this.title = this.model.title;
    this.subTitle = this.model.subTitle;
    this.timeRange = this.model.timeRange;
    this.bannerVideoUrl = this.model.bannerVideoUrl;
    this.entityNames = this.model.entityNames
}
;
e.queryService_ = function(a, b) {
    var c = this
      , d = this.storyService_[a].apply(this.storyService_, this.lodash_.rest(arguments));
    this.isQuerying = !0;
    this.showErrorMessage = !1;
    d.error(function() {
        c.showErrorMessage = !0
    });
    d["finally"](function() {
        c.isQuerying = !1
    });
    return d
}
;
e.onWidgetEvent = function(a) {
    "storyIdRedirect" === a.name && (this.location_.path("/story/" + a.storyId),
    this.rootScope_.$applyAsync())
}
;
e.routeToSelectedYisCountryPage = function() {
    this.location_.path("/story/" + this.selectedCountry.id)
}
;
e.setPageTitle_ = function() {
    this.rootScope_.pageTitle = this.bidiService_.arrayToWrappedTextHelper(this.model.entityNames)
}
;
e.getTabNames = function() {
    return this.globalsService.isMobileMode ? Qj : this.globalsService.isTabletMode ? Pj : Oj
}
;
e.setContentOverlap = function() {
    var a = this.model.pageLayout;
    return a === this.pageLayouts_.ELECTIONS_2016_HUB_PRESIDENT || a === this.pageLayouts_.ELECTIONS_2016_CANDIDATE_STORY || a === this.pageLayouts_.ELECTIONS_2016_STATE_STORY ? 47 : this.model.parentStoryId ? 0 : 47
}
;
e.getPageHeaderTemplate = function() {
    var a = this.model.pageLayout;
    return a === this.pageLayouts_.OLYMPICS_2016_STORY || a === this.pageLayouts_.OLYMPICS_2016_GOOBERS ? "olympics-featured-story" : a === this.pageLayouts_.ELECTIONS_2016_HUB_PRESIDENT || a === this.pageLayouts_.ELECTIONS_2016_HUB_VP || a === this.pageLayouts_.ELECTIONS_2016_HUB_TICKET ? "elections-hub" : a
}
;
e.isLocaleSupportedForYis2016Interactive = function() {
    return -1 !== this.lodash_.indexOf("de;en;en-AU;en-GB;en-US;es;es-419;fr;hi;id;ja;ko;pt-BR;ru; zh-HK;zh-TW".split(";"), this.currentLocale)
}
;
e.getCurrentSupportedYis2016Locale_ = function() {
    return this.isLocaleSupportedForYis2016Interactive() ? this.currentLocale : "en"
}
;
e.getYis2016FrontDoorLink_ = function() {
    return "https://www.google.com/intl/" + this.getCurrentSupportedYis2016Locale_() + "/trends/2016records"
}
;
e.getCustomBannerVideoUrl = function() {
    var a = this.yearInSearch2016VideoEmbedUrl;
    "RU" === this.selectedGeoYis2016.id ? a = this.yearInSearch2016VideoEmbedUrlRussia : "ID" === this.selectedGeoYis2016.id && (a = this.yearInSearch2016VideoEmbedUrlIndonesia);
    return a
}
;
e.getPageType = function() {
    var a = this.model.pageLayout;
    return a === this.pageLayouts_.OLYMPICS_2016_STORY || a === this.pageLayouts_.OLYMPICS_2016_GOOBERS || a === this.pageLayouts_.OLYMPICS_2016_FEATURED_STORIES ? "olympics-content" : a === this.pageLayouts_.ELECTIONS_2016_HUB_PRESIDENT || a === this.pageLayouts_.ELECTIONS_2016_HUB_VP || a === this.pageLayouts_.ELECTIONS_2016_HUB_TICKET ? "elections-content" : a === this.pageLayouts_.YEAR_IN_SEARCH_2015_HUB || a === this.pageLayouts_.YEAR_IN_SEARCH_2016_HUB || a === this.pageLayouts_.YEAR_IN_SEARCH_2015_STORY ? "yis-content" : ""
}
;
e.onYis2016GeoChange_ = function() {
    this.model.bannerVideoUrl = this.getCustomBannerVideoUrl();
    this.setGeoInPath_();
    this.loadYis2016Widgets()
}
;
e.setGeoInPath_ = function() {
    if (this.selectedGeoYis2016 && this.selectedGeoYis2016.id) {
        var a = this
          , b = this.route_.current
          , c = this.rootScope_.$on("$locationChangeSuccess", function() {
            a.route_.current = b;
            c();
            a = b = c = null
        });
        this.location_.path("yis/2016/" + this.selectedGeoYis2016.id)
    }
}
;
var Rj = function(a, b, c, d, f, g) {
    this.location_ = c;
    this.mdDialog = d;
    this.config = g;
    this.storyVersions = b.yisHubPicker;
    this.selectedVersionIndex = f.find(b.yisHubPicker, "id", a.id)
};
k("$jscomp.scope.StoryVersionDialogCtrl", Rj, void 0);
Rj.$inject = "$routeParams $window $location $mdDialog lodash configService".split(" ");
Rj.prototype.selectionHandler = function(a) {
    this.mdDialog.cancel();
    this.location_.path("/story/" + a)
}
;
var Z = angular.module("trendsApp", ["ddmLocalization", "ngMaterial", "ngRoute", "publishAppFramework", "publishAppWidgets", "ngAnimate", pa.name])
  , Sj = {
    templateUrl: "/homepage/homepage.html",
    controller: "HomeCtrl",
    controllerAs: "ctrl"
}
  , Tj = {
    templateUrl: "/fullscreenpage/fullscreenpage.html",
    controller: "FullScreenPageCtrl",
    controllerAs: "ctrl"
}
  , Uj = {
    templateUrl: "/explorepage/explorepage.html",
    controller: "ExploreCtrl",
    reloadOnSearch: !1,
    controllerAs: "ctrl"
}
  , Vj = function(a, b) {
    a.html5Mode(!0);
    a.hashPrefix("!");
    b.when("/", Sj);
    b.when("/home/:category/:geo", Sj);
    b.when("/explore", Uj);
    b.when("/explorenew", Uj);
    b.when("/story/:id?", {
        templateUrl: "/storypage/storypage.html",
        controller: "StoryCtrl",
        controllerAs: "ctrl"
    });
    b.when("/yis/2016/:geo?/:id?", {
        templateUrl: "/storypage/storypage.html",
        controller: "StoryCtrl",
        controllerAs: "ctrl"
    });
    b.when("/fullscreen", Tj);
    b.when("/fullscreen/:category/:geo", Tj);
    b.otherwise({
        redirectTo: "/"
    })
};
k("$jscomp.scope.routeConfig", Vj, void 0);
Vj.$inject = ["$locationProvider", "$routeProvider"];
var Wj = function(a) {
    var b = function(a, b, f) {
        return {
            request: b.bindKey(f, "requestInterceptor", a)
        }
    };
    b.$inject = ["$location", "lodash", "configService"];
    a.interceptors.push(b)
};
k("$jscomp.scope.interceptorConfig", Wj, void 0);
Wj.$inject = ["$httpProvider"];
var Xj = function(a, b, c, d, f) {
    a.$watch(function() {
        return c.disableScrollAround._count
    }, function(a) {
        d.dialogOpen = 0 < a
    });
    a.config = d;
    a.$on("$viewContentLoaded", function() {
        f.trackPageview(b.url())
    })
};
k("$jscomp.scope.runCallback", Xj, void 0);
Xj.$inject = ["$rootScope", "$location", "$mdUtil", "configService", "trackingService"];
Z.value("forceCachedTemplates", !0);
Z.constant("locationHash", window.location.hash);
Z.config(Vj);
Z.config(Wj);
Z.run(Xj);
Z.controller("CustomDatePickerDialogCtrl", jh);
Z.controller("ExploreCtrl", mj);
Z.controller("SearchTermAutocompleteMobileDialogCtrl", sj);
Z.controller("SearchTermFilterDialogCtrl", Ej);
Z.controller("EmbedDialogCtrl", Xf);
Z.controller("FilterDialogCtrl", dg);
Z.controller("HomeCtrl", Kj);
Z.controller("SearchDialogCtrl", Dh);
Z.controller("ShareModalCtrl", Qh);
Z.controller("StoryCtrl", Nj);
Z.controller("StoryVersionDialogCtrl", Rj);
Z.controller("FullScreenPageCtrl", Fj);
Z.controller("UnsupportedDeviceCtrl", hh);
Z.controller("YisFilterDialogCtrl", mg);
Z.directive("autocomplete", Ch);
Z.directive("customDatePicker", oh);
Z.directive("embedCodePreview", Wf);
Z.directive("embedWidgetPreview", cg);
Z.directive("exploreMobileHub", bj);
Z.directive("featuredStory", oi);
Z.directive("filter", lg);
Z.directive("yisCountryFilter", sg);
Z.directive("hierarchyPicker", vh);
Z.directive("error", vg);
Z.directive("grid", Ag);
Z.directive("header", Jg);
Z.directive("loader", Ng);
Z.directive("pullToRefresh", Tg);
Z.directive("search", Ih);
Z.directive("explorePills", jj);
Z.directive("exploreSearchTerm", Dj);
Z.directive("share", Nh);
Z.directive("sidenav", ch);
Z.directive("switch", gh);
Z.directive("trendingStory", vi);
Z.directive("trendsWidget", Pi);
Z.directive("videoOverlay", Ei);
Z.factory("shareNetworkFactory", fi);
Z.filter("OrderBySelectedOptionFilter", ih);
Z.service("collectionsService", Pf);
Z.service("configService", Qf);
Z.service("exploreCompatibilityService", kj);
Z.service("exploreService", pj);
Z.service("paletteService", T);
Z.service("clipboardService", ga);
Z.service("searchService", Jh);
Z.service("shareService", gi);
Z.service("storyService", qi);
Z.service("trendingStorySparklineService", wi);
