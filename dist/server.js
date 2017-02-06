(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("preact"), require("cheerio"), require("node-fetch"), require("preact-render-to-string"));
	else if(typeof define === 'function' && define.amd)
		define(["preact", "cheerio", "node-fetch", "preact-render-to-string"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("preact"), require("cheerio"), require("node-fetch"), require("preact-render-to-string")) : factory(root["preact"], root["cheerio"], root["node-fetch"], root["preact-render-to-string"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_21__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("preact");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
 // jshint ignore:line


class AppShell extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {

    const titleBar = props.titleBar || props.title && `${props.title} - Presterity` || '';

    // JSX gets confused by JavaScript inside a script tag, so we define it as
    // as a string and inject it below.
    const analytics = `
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', 'UA-90582272-1', 'auto');
      ga('send', 'pageview');
    `;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'html',
      { lang: 'en' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'head',
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { charset: 'utf-8' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { name: 'viewport', content: 'width=device-width,initial-scale=1.0' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'title',
          null,
          titleBar
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('link', { rel: 'stylesheet', href: '/static/main.css' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('link', { rel: 'shortcut icon', href: '/static/favicon.ico', type: 'image/x-icon' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('link', { rel: 'apple-touch-icon', sizes: '144x144', href: '/static/appIcon.png' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('link', { rel: 'manifest', href: '/static/manifest.json' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { name: 'google-site-verification', content: '4TmUwdRDIEbTE65Bw8HwEyVZqJthy2MvT0S327h_Gdg' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { property: 'og:title', content: props.title }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { property: 'og:url', content: props.url }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { property: 'og:image', content: `${props.baseUrl}/static/facebookShare.png` }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('script', { dangerouslySetInnerHTML: { __html: analytics } }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('script', { async: true, src: 'https://www.google-analytics.com/analytics.js' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'body',
        { area: props.area },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { id: 'root' },
          props.children
        )
      )
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AppShell;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BreadcrumbBar__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SideNavigation__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TopNavigation__ = __webpack_require__(7);
 // jshint ignore:line





/**
 * Template for a standard page on the site.
 */
class StandardPage extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  get asyncProperties() {
    return __WEBPACK_IMPORTED_MODULE_3__SideNavigation__["a" /* default */].prototype.asyncProperties; // Same for all instances.
  }

  render(props) {
    const area = getArea(props);

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': 'pageWrapper', area: area },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__SideNavigation__["a" /* default */], { navigation: props.navigation }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': 'main' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__TopNavigation__["a" /* default */], null),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'breadcrumbBar' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { 'class': 'gutter' }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__BreadcrumbBar__["a" /* default */], { ancestors: props.ancestors }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { 'class': 'gutter' })
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'articleContainer' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { 'class': 'gutter' }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'article',
            { 'class': 'wikiContent' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { id: 'mobileHomeLogo', src: '/static/appIcon.png', alt: 'Presterity logo: a torch and a book' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'h1',
              { 'class': 'pageTitle' },
              props.title
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'div',
              null,
              props.children
            ),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              __WEBPACK_IMPORTED_MODULE_2__Footer__["a" /* default */],
              { title: props.title, url: props.url },
              props.footer
            )
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { 'class': 'gutter' })
        )
      )
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = StandardPage;


// Return the site area in which this page is shown under.
function getArea(props) {
  const ancestors = props.ancestors;
  if (!ancestors) {
    // Unknown
    return '';
  } else if (ancestors.length === 0 && props.title === 'Presterity') {
    // Home page is in the "Home" area.
    return 'Home';
  } else if (ancestors.length === 0) {
    // Top-level pages (Search, Volunteering, Submissions) are their own areas.
    return props.title;
  } else if (ancestors[0].title === 'Home') {
    // Pages beneath Home area in the "Reference" area.
    return 'Reference';
  } else if (ancestors.length > 0) {
    // Other pages fall under their top ancestor.
    return ancestors[0].title;
  } else {
    // Unknown.
    return '';
  }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
 // jshint ignore:line
const navigationPane = __webpack_require__(9);

/**
 * Side navigation pane
 */
class SideNavigation extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  get asyncProperties() {
    return navigationPane().then(html => {
      return {
        navigation: html
      };
    });
  }

  render(props) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'nav',
      { 'class': 'sideNavigation' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { id: 'logoBlock' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { id: 'linkHome', href: '/' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { id: 'logo', src: '/static/presterity.png', alt: 'Presterity logo: a torch and a book' })
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        { id: 'tableOfContentsCaption' },
        'TABLE ',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'em',
          null,
          'of'
        ),
        ' CONTENTS'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { id: 'captionSeparatorContainer' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { id: 'captionSeparator' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { 'class': 'sideNavigation', dangerouslySetInnerHTML: { __html: props.navigation } })
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SideNavigation;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
 // jshint ignore:line


/**
 * Top navigation links
 */
/* harmony default export */ __webpack_exports__["a"] = props => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  "header",
  { id: "topNavigation" },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("div", { "class": "gutter" }),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "div",
    { id: "topLinks" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { id: "linkAbout", href: "/About" },
      "ABOUT"
    ),
    "\xA0",
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { id: "linkVolunteering", href: "/Volunteering" },
      "VOLUNTEER"
    ),
    "\xA0",
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { id: "linkSearch", href: "/search" },
      "SEARCH"
    ),
    "\xA0",
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { id: "linkSubmissions", href: "/Submissions" },
      "SUBMIT NEWS"
    )
  ),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("div", { "class": "gutter" })
);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * The site's connection to, and representation of, the Atlassian Confluence wiki.
 *
 * The general principle is that this module isolates anything specific to
 * Confluence. If we were to change to a different wiki back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 */

// Cheerio is a server-side HTML jQuery-style parser/manipulator.
const cheerio = __webpack_require__(1);
const fetch = __webpack_require__(2);

const BASE_URL = 'https://presterity.atlassian.net';
const REST_URL = `${BASE_URL}/wiki/rest/api/content`;
const SEARCH_URL = `${REST_URL}/search?cql=space=DB and `;

const HOME_PAGE_TITLE = 'Home';
const LINKS_PLACEHOLDER = `(Topic links will automatically appear here.)`;

// Replace links to label pages with equivalent site URLs.
const labelUrlRegex = new RegExp(`${BASE_URL}/wiki/label/DB/([^"]+)`);

// Replace links to regular pages with equivalent site URLs.
const pageUrlRegex = /\/wiki\/display\/DB\/([^"]+)/;

// Replace links to viewpage.action URLs.
// Confluence uses such links if a page's title contains odd characters.
const viewpageUrlRegex = /\/wiki\/pages\/viewpage\.action\?pageId=(\d+)/;

// Map certain wiki page titles -> site URLs by hand.
const mapPageTitleToSiteUrl = {
  'About': '/About',
  'Development+volunteers': '/Volunteering/Development+volunteers',
  'Home': '/',
  'Submissions': '/Submissions',
  'Volunteering': '/Volunteering',
  'Code+of+Conduct': '/Volunteering/Code+of+Conduct'
};

/*
 * Format a page title for use in a wiki URL.
 */
function escapePageTitle(title) {
  return title.replace(/ /g, '+');
}

/*
 * Return a promise for the title for the page with the given ID.
 */
function getTitleForPageWithId(pageId) {
  const query = `${REST_URL}/${pageId}`;
  return fetch(query).then(response => response.json()).then(json => {
    const title = escapePageTitle(json.title);
    return title;
  });
}

/*
 * Return the site URL for the label page for the given label.
 */
function labelToSiteUrl(label) {
  // Use hand-mapped URL if it exists.
  return `/reference/label/${label}`;
}

/*
 * Return the site URL for the regular page with the given title.
 */
function pageTitleToSiteUrl(title) {
  // Use hand-mapped URL if it exists.
  // All other pages are presented in the "/reference" area of the site.
  const escaped = escapePageTitle(title);
  return mapPageTitleToSiteUrl[escaped] || `/reference/${escaped}`;
}

function replacePlaceholderWithLinks(html, linksHtml) {
  const placeholder = `<em>${LINKS_PLACEHOLDER}</em>`;
  return html.replace(placeholder, linksHtml);
}

/*
 * Rewrite the indicated attribute of the given element if necessary.
 */
function rewriteElementAttribute($element, attributeName) {

  const attributeValue = $element.attr(attributeName);

  const labelUrlMatch = labelUrlRegex.exec(attributeValue);
  if (labelUrlMatch) {
    const label = labelUrlMatch[1];
    const rewritten = labelToSiteUrl(label);
    $element.attr(attributeName, rewritten);
    return; // No more processing necessary.
  }

  const pageUrlMatch = pageUrlRegex.exec(attributeValue);
  if (pageUrlMatch) {
    const title = pageUrlMatch[1];
    const rewritten = pageTitleToSiteUrl(title);
    $element.attr(attributeName, rewritten);
    return;
  }

  const viewpageUrlMatch = viewpageUrlRegex.exec(attributeValue);
  if (viewpageUrlMatch) {
    const pageId = viewpageUrlMatch[1];
    const rewritten = `/reference/id/${pageId}`;
    $element.attr(attributeName, rewritten);
  }
}

// Rewrite HTML for public consumption.
function rewriteHtml(html) {
  const $ = cheerio.load(html); // Parse HTML

  // Rewrite wiki-relative links in `href` attributes.
  $('a[href]').each((index, element) => {
    rewriteElementAttribute($(element), 'href');
  });

  // Remove internal project notes.
  // These are indicated as `em` (italics) nodes that begin and end with
  // parentheses.
  $('em').each((index, element) => {
    const $element = $(element);
    const text = $element.text().trim();
    if (text === LINKS_PLACEHOLDER) {
      // Leave links placeholder alone; it'll be handled separately.
      return;
    }
    const isInternalNote = text.startsWith('(') && text.endsWith(')');
    if (isInternalNote) {
      $element.remove();
    }
  });

  return $.html(); // Return rewritten HTML
}

function unescapePageTitle(escapedPageTitle) {
  return escapedPageTitle.replace(/\+/g, ' ');
}

// Return a promise for the wiki page with the given title.
// The result is a JSON structured returned by Confluence. Wiki-relative paths
// in the result will be modified to refer to URLs on our site instead.
function wikiPageWithTitle(title) {
  const query = `${REST_URL}?spaceKey=DB&title=${title}&expand=space,ancestors,body.view`;
  console.log(`Page: ${query}`);
  return fetch(query).then(response => response.json()).then(json => {

    // Usually we get a single result, but under some conditions (can't recall
    // which) it's an array.
    const pageJson = json.results instanceof Array ? json.results[0] : json;

    if (!pageJson) {
      return null;
    }

    const ancestors = pageJson.ancestors;
    const title = pageJson.title;
    const wikiBody = pageJson.body.view.value;

    // The body will include link which are relative to the wiki.
    // We fix those up so they refer to URLs on our site instead.
    const body = rewriteHtml(wikiBody);

    return { ancestors, body, title };
  });
}

module.exports = {
  BASE_URL,
  escapePageTitle,
  getTitleForPageWithId,
  HOME_PAGE_TITLE,
  labelToSiteUrl,
  pageTitleToSiteUrl,
  replacePlaceholderWithLinks,
  REST_URL,
  rewriteHtml,
  SEARCH_URL,
  unescapePageTitle,
  wikiPageWithTitle
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const cheerio = __webpack_require__(1);
const fetch = __webpack_require__(2);
const wiki = __webpack_require__(8);

// Time in milliseconds we should cache the navigation.
const NAVIGATION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// The Date.now() timestamp of our last request for the navgation.
let navigationTimestamp = 0;

// The cached navigation HTML.
let cachedNavigationHtml;

/*
 * Return a promise for the HTML that should be used in the navigation pane.
 *
 * The content for the pane is maintained on a special page on the wiki with
 * the title "Navigation". That page isn't directly accessible through the
 * site navigation, and is only used here to construct the navigation UI.
 *
 * Because the navigation outline doesn't change often, we cache the result for
 * a period before asking for it again. The same navigation pane is shared
 * across all pages that use the pane.
 */
module.exports = () => {
  const needsRefresh = cachedNavigationHtml == null || Date.now() - navigationTimestamp > NAVIGATION_CACHE_DURATION;
  if (needsRefresh) {
    // Get navigation from server.
    return getNavigationFromWiki().then(html => {
      cachedNavigationHtml = html;
      return html;
    });
  } else {
    // Return cached result.
    return Promise.resolve(cachedNavigationHtml);
  }
};

// Returns a promise to get the navigation HTML from the wiki.
function getNavigationFromWiki() {
  const title = 'Navigation';
  const query = `${wiki.REST_URL}?spaceKey=DB&title=${title}&expand=body.view`;
  console.log(`Navigation: ${query}`);
  return fetch(query).then(response => response.json()).then(wikiResults => {
    navigationTimestamp = Date.now(); // Note the time we got this response.

    const wikiPageJson = wikiResults.results[0];
    const body = wikiPageJson.body.view.value;

    // Map wiki-relative URLs to our own routes.
    const rewrittenHtml = wiki.rewriteHtml(body);

    // For each list item in the navigation pane, add an attribute on it that
    // will help us reflect the user's current position in the outline using
    // styling applied with CSS that matches that attribute. The goal of this
    // is to avoid having to update the navigation links for individual pages.
    const $ = cheerio.load(rewrittenHtml); // Parse HTML
    // Find all list items.
    $('li').each((index, li) => {
      const $li = $(li); // Get list item.
      const $a = $($li.children('a')[0]); // Get the anchor tag within it.
      if ($a) {
        // Get the anchor's text. This will be the page title.
        const text = $a.text();
        // Expose that text on the list item as an attribute.
        $li.attr('navigation-item', text);
      }
    });

    const navigationPaneHtml = $.html();
    return navigationPaneHtml;
  });
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppShell__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AppShell", function() { return __WEBPACK_IMPORTED_MODULE_0__AppShell__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return __WEBPACK_IMPORTED_MODULE_1__routes__["a"]; });



/**
 * Single export for all components.
 */


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
 // jshint ignore:line
const wiki = __webpack_require__(8);

/**
 * Breadcrumb bar
 */
class BreadcrumbBar extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {

    // Pages without known ancestors get "Home" as their default ancestor.
    const ancestors = props.ancestors || [{ title: 'Home' }];

    const breadcrumbs = ancestors.map((ancestor, index) => {
      const title = ancestor.title;
      const siteUrl = wiki.pageTitleToSiteUrl(title);
      const separator = index > 0 ? ' / ' : '';
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        null,
        separator,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { href: siteUrl },
          title
        )
      );
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': 'breadcrumbs' },
      breadcrumbs
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BreadcrumbBar;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DaysRemaining__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TweetButton__ = __webpack_require__(14);
 // jshint ignore:line



/**
 * Standard template footer
 */
class Footer extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'footer',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__TweetButton__["a" /* default */], { text: props.title, url: props.url })
      ),
      props.children,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__DaysRemaining__["a" /* default */], null)
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Footer;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
 // jshint ignore:line


/**
 * Show a count of the days remaining in the administration.
 */
class DaysRemaining extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {

    const today = new Date(Date.now());
    const inaugurationDate = new Date(Date.parse('Mon, Jan 20 2021 12:00:00 EST'));

    // From "a more correct solution" for date diff math:
    // http://stackoverflow.com/a/15289883/76472.
    const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utc2 = Date.UTC(inaugurationDate.getFullYear(), inaugurationDate.getMonth(), inaugurationDate.getDate());
    const diffMilliseconds = utc2 - utc1;
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor(diffMilliseconds / MILLISECONDS_PER_DAY);

    let message;
    if (diffDays === 0) {
      message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'strong',
        null,
        'This is the last day of the Trump administration!'
      );
    } else if (diffDays > 0) {
      const days = diffDays === 1 ? 'day' : 'days';
      message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        null,
        'There are only ',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'strong',
          null,
          diffDays
        ),
        ' ',
        days,
        ' to go in the Trump administration.'
      );
    } else {
      // Administration is over. Whew.
      message = '';
    }

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'p',
      { id: 'daysRemainingMessage' },
      message
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DaysRemaining;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TwitterIcon__ = __webpack_require__(15);
 // jshint ignore:line


class TweetButton extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {
    const encodedText = encodeURIComponent(props.text);
    const encodedUrl = encodeURIComponent(props.url);
    const href = `https://twitter.com/intent/tweet?via=presterity&text=${encodedText}&url=${encodedUrl}`;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { 'class': 'tweetButton', href: href },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__TwitterIcon__["a" /* default */], { fill: '#fff' }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        null,
        'Share'
      )
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TweetButton;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
 // jshint ignore:line


/**
 * Top navigation links
 */
/* harmony default export */ __webpack_exports__["a"] = props => {
  const fill = props.fill || 'black';
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'svg',
    { viewBox: '0 0 182.66667 150.66667', style: `fill: ${fill};` },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'g',
      { xmlns: 'http://www.w3.org/2000/svg', id: 'g10', transform: 'matrix(1.3333 0 0 -1.3333 0 150.67)' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'g',
        { transform: 'scale(.1)' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('path', { d: 'm1366.9 989.39c-50.27-22.309-104.33-37.387-161.05-44.18 57.89 34.723 102.34 89.679 123.28 155.15-54.18-32.15-114.18-55.47-178.09-68.04-51.13 54.49-124.02 88.55-204.68 88.55-154.89 0-280.43-125.55-280.43-280.43 0-21.988 2.457-43.398 7.258-63.91-233.08 11.68-439.72 123.36-578.04 293.01-24.141-41.4-37.969-89.567-37.969-140.97 0-97.308 49.489-183.13 124.76-233.44-45.969 1.437-89.218 14.058-127.03 35.078-0.043-1.18-0.043-2.348-0.043-3.52 0-135.9 96.68-249.22 224.96-275-23.512-6.41-48.281-9.8-73.86-9.8-18.089 0-35.628 1.711-52.781 5 35.711-111.41 139.26-192.5 262-194.77-96.058-75.23-216.96-120.04-348.36-120.04-22.621 0-44.961 1.332-66.918 3.91 124.16-79.568 271.55-125.98 429.94-125.98 515.82 0 797.86 427.31 797.86 797.93 0 12.153-0.28 24.223-0.79 36.25 54.77 39.571 102.31 88.95 139.93 145.2' })
      )
    )
  );
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorPage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HomePage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFoundPage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WikiPage__ = __webpack_require__(19);





/**
 * Map routes to components.
 */
/* harmony default export */ __webpack_exports__["a"] = {
  '/error': __WEBPACK_IMPORTED_MODULE_0__ErrorPage__["a" /* default */],
  '/notfound': __WEBPACK_IMPORTED_MODULE_2__NotFoundPage__["a" /* default */], // TODO: Remove
  '/:title': __WEBPACK_IMPORTED_MODULE_3__WikiPage__["a" /* default */],
  '/:area/:title': __WEBPACK_IMPORTED_MODULE_3__WikiPage__["a" /* default */],
  '/': __WEBPACK_IMPORTED_MODULE_1__HomePage__["a" /* default */]
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PageTemplate__ = __webpack_require__(5);
 // jshint ignore:line


/**
 * Error page.
 */
class ErrorPage extends __WEBPACK_IMPORTED_MODULE_1__PageTemplate__["a" /* default */] {

  render(props) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      __WEBPACK_IMPORTED_MODULE_1__PageTemplate__["a" /* default */],
      {
        navigation: props.navigation,
        title: this.title,
        url: props.url
      },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'Sorry, something went wrong. \uD83D\uDE1E'
      )
    );
  }

  get title() {
    return "Oops";
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ErrorPage;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PageTemplate__ = __webpack_require__(5);
 // jshint ignore:line


/**
 * "Not Found" page.
 */
class NotFoundPage extends __WEBPACK_IMPORTED_MODULE_1__PageTemplate__["a" /* default */] {

  render(props) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      __WEBPACK_IMPORTED_MODULE_1__PageTemplate__["a" /* default */],
      {
        ancestors: props.ancestors,
        footer: props.footer,
        navigation: props.navigation,
        title: this.title,
        url: props.url
      },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'We don\u2019t have a page for \u201C',
        this.title,
        '\u201D yet!'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'Would you consider ',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { href: '/Volunteering' },
          'volunteering'
        ),
        ' and helping us make one?'
      )
    );
  }

  get title() {
    // TODO: Pass in title when constructing page.
    // return this.props.title;
    return "Not Found";
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NotFoundPage;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BookmarkList__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PageTemplate__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_render_to_string__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_render_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_preact_render_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki__);
 // jshint ignore:line






/**
 * A page that renders content from the Atlassian wiki.
 */
class WikiPage extends __WEBPACK_IMPORTED_MODULE_3__PageTemplate__["a" /* default */] {

  get asyncProperties() {

    const title = this.title;

    // Load the wiki page with the given title.
    const pagePromise = __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default.a.wikiPageWithTitle(title).then(wikiPage => {
      return {
        ancestors: wikiPage.ancestors,
        body: wikiPage.body
      };
    });

    // Load the bookmarks tagged with the same title.
    const bookmarksPromise = __WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks___default.a.bookmarksForTopic(title).then(bookmarks => {
      return { bookmarks };
    });

    // Merge the above with the base class' async properties.
    return Promise.all([super.asyncProperties, pagePromise, bookmarksPromise]).then(results => {
      return Object.assign.apply({}, results);
    });
  }

  render(props) {

    // Merge the bookmark list into the wiki page body to construct the final
    // page body.
    const bookmarkList = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__BookmarkList__["a" /* default */], { bookmarks: props.bookmarks, excludeTag: this.title });
    const bookmarkListHtml = __WEBPACK_IMPORTED_MODULE_4_preact_render_to_string___default()(bookmarkList);
    const body = __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default.a.replacePlaceholderWithLinks(props.body, bookmarkListHtml);

    const footer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'You can ',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { href: '/Submissions' },
          'submit news'
        ),
        ' on this topic. If something\'s wrong on this page, ',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { href: '/Volunteering' },
          'help us fix it'
        ),
        '.'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'This work is licensed under a ',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { rel: 'license', href: 'https://creativecommons.org/licenses/by/4.0/' },
          'Creative Commons Attribution 4.0 International License'
        ),
        '.'
      )
    );

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      __WEBPACK_IMPORTED_MODULE_3__PageTemplate__["a" /* default */],
      {
        ancestors: props.ancestors,
        navigation: props.navigation,
        title: this.title,
        url: props.url,
        footer: footer
      },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { dangerouslySetInnerHTML: { __html: body } })
    );
  }

  get title() {
    const requestTitle = this.props.request.params.title;
    const title = __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default.a.unescapePageTitle(requestTitle);
    return title;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = WikiPage;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bookmark__ = __webpack_require__(23);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

 // jshint ignore:line


/**
 * A list (actually, a table) of bookmarks whose tags include a given title.
 */
class BookmarkList extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {
    const bookmarks = props.bookmarks.map(bookmarkProps => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__Bookmark__["a" /* default */], _extends({}, bookmarkProps, { excludeTag: props.excludeTag })));
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'table',
      { 'class': 'topicLinks' },
      bookmarks
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BookmarkList;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("preact-render-to-string");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * The site's connection to, and representation of, the Raindrop bookmark API.
 *
 * The general principle is that this module isolates anything specific to
 * Raindrop. If we were to change to a different bookmarks back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 *
 * Raindrop bookmark results are paginated: http://raindrop.io/dev/docs#bookmarks.
 * The first page of results includes a `count` property indicating how many
 * total results there are. Once we have that, we know how many more pages of
 * results to ask for.
 *
 * To keep the client as simple as possible, we get *all* bookmarks for a given
 * topic at once. This works at a small scale, but will become slow as we gather
 * 100s of bookmarks per topic. On the plus side:
 *
 * * Since we have server-side caching, once someone visits a page, subsequent
 *   visitors within the cache interval will immediately get a complete page of
 *   results.
 *
 * * This also means that only our server is hitting Raindrop, reducing the
 *   degree to which we may annoy them.
 *
 * At some point, we'd like to have our own DB of bookmarks, and at that point
 * should add infinite-scrolling to the client so the client can request only
 * those results it actually needs to fill the page.
 */

const fetch = __webpack_require__(2);

const PRESTERITY_BOOKMARK_COLLECTION_ID = 2021037;
const RAINDROP_REST_URL = `https://raindrop.io/api/raindrops/${PRESTERITY_BOOKMARK_COLLECTION_ID}`;
const MAX_BOOKMARKS_PER_PAGE = 40; // Limit imposed by Raindrop.


/*
 * Return a promise for the complete set of bookmarks on the given topic.
 * The topic is identified with a string: "Trump Cabinet".
 *
 * The bookmarks are returned sorted by bookmark title. Since we start bookmark
 * titles with a date in YYYY.MM.DD format, the bookmarks will also be sorted
 * by date.
 */
function bookmarksForTopic(topic) {

  let bookmarks;

  // Fetch the initial results: page 0.
  return getResultsForPage(topic, 0).then(resultPage0 => {

    // Save the page 0 bookmarks.
    bookmarks = resultPage0.items;

    // The results include a `count` property that gives the total number of
    // bookmarks. Use this to calculate how many more pages we need fetch.
    const bookmarkCount = resultPage0.count;
    const pageCount = Math.ceil(bookmarkCount / MAX_BOOKMARKS_PER_PAGE);

    // Now get pages 1..pageCount.
    return getResultsForPages(topic, pageCount);
  }).then(additionalResultPages => {

    // Combine bookmarks from additional pages (if any) with set from page 0.
    additionalResultPages.forEach(resultPage => {
      bookmarks = bookmarks.concat(resultPage.items);
    });

    // Raindrop's sorting facilities are limited, so we sort ourselves.
    const sorted = bookmarks.sort(compareBookmarks);

    return sorted;
  });
}

// Sort two bookmarks by title.
// Since the title should start with a date like 2017.01.13, sorting by title
// should produce a chronological sort.
function compareBookmarks(bookmark1, bookmark2) {
  if (bookmark1.title < bookmark2.title) {
    return -1;
  }
  if (bookmark1.title > bookmark2.title) {
    return 1;
  }
  return 0;
}

// Return a promise for the indicated page of results for the given topic.
function getResultsForPage(topic, pageNumber) {
  const escapedTopic = encodeURIComponent(topic);
  const url = `${RAINDROP_REST_URL}?search=[{"key":"tag","val":"${escapedTopic}"}]&perpage=${MAX_BOOKMARKS_PER_PAGE}&page=${pageNumber}`;
  console.log(`Bookmarks: ${url}`);
  return fetch(url).then(response => response.json());
}

// Return the latest bookmarks, up to a maximum of count (but no more than 40).
// The default count is 10.
function mostRecentBookmarks(count = 10) {
  const url = `${RAINDROP_REST_URL}?perpage=${count}`;
  console.log(`Latest bookmarks: ${url}`);
  return fetch(url).then(response => response.json()).then(json => json.items);
}

// Return a promise for pages 1..pageCount of bookmarks for the given topic.
// This does *not* get the bookmarks on page 0. We handle those separately.
// Accordingly, if pageCount is 0 or 1, this returns a resolved promise for
// an empty array.
function getResultsForPages(topic, pageCount) {
  let promises = [];
  for (let page = 1; page < pageCount; page++) {
    promises = promises.concat(getResultsForPage(topic, page));
  }
  return Promise.all(promises);
}

module.exports = {
  bookmarksForTopic,
  mostRecentBookmarks
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_connectors_wiki__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_connectors_wiki___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__server_connectors_wiki__);
 // jshint ignore:line


/**
 * Return a bookmark from the server as HTML for presentation to the user.
 * This will be a row intended for display in a table.
 *
 * The result will include "See also" links to topics tagged on the bookmark. If
 * an "excludeTag" property has been supplied, a "See also" link will *not* be
 * included for the indicated topic (since the user will already be looking at
 * that page).
 */
class Bookmark extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props) {

    let domain = props.domain;
    if (domain.startsWith('www.')) {
      domain = domain.slice(4); // Remove "www."
    }

    // Our bookmark format has writers put the date of an event in the bookmark
    // title. Parse that out.
    const { date, text } = parseLinkTitle(props.title);

    // Construct list of bookmark tags. If a current title has been supplied,
    // *don't* include that tag. Otherwise, include all tags.
    const tags = props.tags.filter(tag => tag !== props.excludeTag).map((tag, index) => {
      const url = `/reference/${__WEBPACK_IMPORTED_MODULE_1__server_connectors_wiki___default.a.escapePageTitle(tag)}`;
      const comma = index > 0 ? ', ' : '';
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        null,
        comma,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { href: url },
          tag
        )
      );
    });

    let seeAlsoSection = null;
    if (tags.length > 0) {
      const seeLabel = props.excludeTag ? 'See also' : 'See';
      seeAlsoSection = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        null,
        '(',
        seeLabel,
        ' ',
        tags,
        ')'
      );
    }

    // The bookmark may have an optional description ("excerpt").
    const excerpt = props.excerpt ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': 'excerpt' },
        props.excerpt
      )
    ) : null;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'tr',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'td',
        null,
        date
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'td',
        null,
        text,
        '\xA0',
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { href: props.link },
          domain
        ),
        '\xA0',
        seeAlsoSection,
        excerpt
      )
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bookmark;


function parseLinkTitle(title) {
  // Find link parts:
  // * optional whitespace to start
  // * date in 2017.01.17 format, can also use hyphens
  // * whitespace
  // * remaining text
  const linkPartsRegex = /^\s*([\d\.-]+)\s+(.*)/;
  const match = linkPartsRegex.exec(title);
  let date;
  let text;
  if (match) {
    date = match[1];
    text = match[2];
  } else {
    date = '';
    text = title;
  }
  return { date, text };
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BookmarkList__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PageTemplate__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_render_to_string__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_render_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_preact_render_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki__);
 // jshint ignore:line






/**
 * The Home page.
 *
 * This is a variant of the usual wiki page that shows the latest links
 * instead of links based on their tags.
 */
class HomePage extends __WEBPACK_IMPORTED_MODULE_3__PageTemplate__["a" /* default */] {

  get asyncProperties() {

    const title = this.title;

    // Load the wiki page with the given title.
    const pagePromise = __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default.a.wikiPageWithTitle(title).then(wikiPage => {
      if (!wikiPage) {
        // If we can't find the Home page, it's an error.
        throw `Couldn't find the wiki content for a page titled "${title}".`;
      }
      return {
        ancestors: wikiPage.ancestors,
        body: wikiPage.body
      };
    });

    // Load the most recent bookmarks.
    const requestBookmarkCount = 5;
    const bookmarksPromise = __WEBPACK_IMPORTED_MODULE_1__server_connectors_bookmarks___default.a.mostRecentBookmarks(requestBookmarkCount).then(bookmarks => {
      return { bookmarks };
    });

    // Merge the above with the base class' async properties.
    return Promise.all([super.asyncProperties, pagePromise, bookmarksPromise]).then(results => {
      return Object.assign.apply({}, results);
    });
  }

  render(props) {

    // Merge the bookmark list into the wiki page body to construct the final
    // page body.
    const bookmarkList = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__BookmarkList__["a" /* default */], { bookmarks: props.bookmarks, excludeTag: this.title });
    const bookmarkListHtml = __WEBPACK_IMPORTED_MODULE_4_preact_render_to_string___default()(bookmarkList);
    const body = __WEBPACK_IMPORTED_MODULE_5__server_connectors_wiki___default.a.replacePlaceholderWithLinks(props.body, bookmarkListHtml);

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      __WEBPACK_IMPORTED_MODULE_3__PageTemplate__["a" /* default */],
      {
        ancestors: props.ancestors,
        navigation: props.navigation,
        title: 'Presterity',
        url: props.url
      },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', { dangerouslySetInnerHTML: { __html: body } })
    );
  }

  get title() {
    return 'Home';
  }

  get titleBar() {
    return 'Presterity';
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = HomePage;


/***/ })
/******/ ]);
});
//# sourceMappingURL=server.js.map