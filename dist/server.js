(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("preact"), require("cheerio"), require("node-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["preact", "cheerio", "node-fetch"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("preact"), require("cheerio"), require("node-fetch")) : factory(root["preact"], root["cheerio"], root["node-fetch"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

  render(props, state) {

    const titleBar = props.titleBar || props.title ? `${props.title} - Presterity` : '';

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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { property: 'og:title', content: '${title}' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { property: 'og:url', content: '${url}' }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('meta', { property: 'og:image', content: '${baseUrl}/static/facebookShare.png' })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'body',
        null,
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PageTemplate__ = __webpack_require__(5);
 // jshint ignore:line


/**
 * Test page
 */
class Hello extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  static get asyncProperties() {
    return __WEBPACK_IMPORTED_MODULE_1__PageTemplate__["a" /* default */].asyncProperties;
  }

  render(props, state) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      __WEBPACK_IMPORTED_MODULE_1__PageTemplate__["a" /* default */],
      {
        ancestors: props.ancestors,
        footer: props.footer,
        navigation: props.navigation,
        title: props.title
      },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        props.message
      )
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hello;


/***/ }),
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

  static get asyncProperties() {
    return __WEBPACK_IMPORTED_MODULE_3__SideNavigation__["a" /* default */].asyncProperties;
  }

  render(props, state) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': 'pageWrapper' },
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
              null,
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

  static get asyncProperties() {
    return navigationPane().then(html => {
      return {
        navigation: html
      };
    });
  }

  render(props, state) {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { id: "linkVolunteering", href: "/Volunteering" },
      "VOLUNTEER"
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      "a",
      { id: "linkSearch", href: "/search" },
      "SEARCH"
    ),
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Hello__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AppShell", function() { return __WEBPACK_IMPORTED_MODULE_0__AppShell__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Hello", function() { return __WEBPACK_IMPORTED_MODULE_1__Hello__["a"]; });





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

  render(props, state) {

    // TODO: Add ' / ' ::before the breadcrumbs.
    const ancestors = props.ancestors || [];
    const breadcrumbs = ancestors.map(ancestor => {
      const title = ancestor.title;
      const siteUrl = wiki.pageTitleToSiteUrl(title);
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'a',
        { href: siteUrl },
        title
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
 // jshint ignore:line


/**
 * Standard template footer
 */
class Footer extends __WEBPACK_IMPORTED_MODULE_0_preact__["Component"] {

  render(props, state) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'footer',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'p',
        null,
        'tweetHtml...'
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

  render(props, state) {

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
        'There are only',
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=server.js.map