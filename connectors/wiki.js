/*
 * The site's connection to, and representation of, the Atlassian Confluence wiki.
 *
 * The general principle is that this module isolates anything specific to
 * Confluence. If we were to change to a different wiki back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 */


// Cheerio is a server-side HTML jQuery-style parser/manipulator.
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const BASE_URL = 'https://presterity.atlassian.net';
const REST_URL = `${BASE_URL}/wiki/rest/api/content`;
const SEARCH_URL = `${REST_URL}/search?cql=space=DB and `;

const HOME_PAGE_TITLE = 'Home';
const LINKS_PLACEHOLDER = `(Topic links will automatically appear here.)`;

// Replace links to label pages with equivalent site URLs.
const labelUrlRegex = new RegExp(`${BASE_URL}/wiki/label/DB/([^"]+)`);

// Replace links to regular pages with equivalent site URLs.
const pageUrlRegex = /\/wiki\/display\/DB\/([^"]+)/;

// Replace image downloads with equivalent site URLs.
const downloadUrlRegex = new RegExp(`${BASE_URL}/wiki/download/([^"]+)`);

// Replace links to viewpage.action URLs.
// Confluence uses such links if a page's title contains odd characters.
const viewpageUrlRegex = /\/wiki\/pages\/viewpage\.action\?pageId=(\d+)/;

// Time in milliseconds we should cache the navigation.
const NAVIGATION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// The Date.now() timestamp of our last request for the navgation.
let navigationTimestamp = 0;

// The cached navigation HTML.
let cachedNavigationHtml;


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
 * Returns a promise to get the latest navigation HTML.
 */
function getLatestNavigation() {
  const title = 'Navigation';
  const query = `${REST_URL}?spaceKey=DB&title=${title}&expand=body.view`;
  console.log(`Navigation: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(wikiResults => {
    navigationTimestamp = Date.now(); // Note the time we got this response.

    const wikiPageJson = wikiResults.results[0];
    const body = wikiPageJson.body.view.value;

    // Map wiki-relative URLs to our own routes.
    const rewrittenHtml = rewriteHtml(body);

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

/*
 * Return a promise for the title for the page with the given ID.
 */
function getTitleForPageWithId(pageId) {
  const query = `${REST_URL}/${pageId}`;
  return fetch(query)
  .then(response => response.json())
  .then(json => {
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
function navigation() {
  const needsRefresh = cachedNavigationHtml == null ||
      (Date.now() - navigationTimestamp) > NAVIGATION_CACHE_DURATION;
  if (needsRefresh) {
    // Get navigation from server.
    return getLatestNavigation()
    .then(html => {
      cachedNavigationHtml = html;
      return html;
    });
  } else {
    // Return cached result.
    return Promise.resolve(cachedNavigationHtml);
  }
}

/*
 * Return a promise for a list of pages tagged with the indicated label.
 */
function pagesWithLabel(label) {
  const query = `${SEARCH_URL}label=${label}`;
  console.log(`Label page: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => json.results);
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

  const downloadUrlMatch = downloadUrlRegex.exec(attributeValue);
  if (downloadUrlMatch) {
    const path = downloadUrlMatch[1];
    const rewritten = `/wiki/download/${path}`;
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

/*
 * Rewrite HTML for public consumption.
 */
function rewriteHtml(html) {
  const $ = cheerio.load(html); // Parse HTML

  // Rewrite wiki-relative links in `href` attributes.
  $('a[href]').each((index, element) => {
    rewriteElementAttribute($(element), 'href');
  });

  // Rewrite wiki-relative download links.
  $('img[src]').each((index, element) => {
    rewriteElementAttribute($(element), 'src');
  });

  // Remove unnecessary data attributes that expose our wiki URL.
  $('[data-base-url]').each((index, element) => {
    $(element).removeAttr('data-base-url');
  });
  $('[data-image-src]').each((index, element) => {
    $(element).removeAttr('data-image-src');
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

/*
 * Return a promise for an array of wiki pages containing the given search text.
 *
 * This constructs a search query in Atlassian Confluence CQL:
 * https://developer.atlassian.com/confdev/confluence-server-rest-api/advanced-searching-using-cql
 */
function search(searchText) {
  const escapedText = encodeURIComponent(searchText);
  const query = `${SEARCH_URL}text~"${escapedText}"`;
  console.log(`Search for: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => json.results);
}

function unescapePageTitle(escapedPageTitle) {
  return escapedPageTitle.replace(/\+/g, ' ');
}

/*
 * Return a promise for the wiki page with the given title.
 *
 * The result is a JSON structured returned by Confluence. Wiki-relative paths
 * in the result will be modified to refer to URLs on our site instead.
 */
function wikiPageWithTitle(title) {
  const query = `${REST_URL}?spaceKey=DB&title=${title}&expand=space,ancestors,body.view`;
  console.log(`Page: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => {

    // Usually we get a single result, but under some conditions (can't recall
    // which) it's an array.
    const pageJson = json.results instanceof Array ?
      json.results[0] :
      json;

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
  navigation,
  pagesWithLabel,
  pageTitleToSiteUrl,
  replacePlaceholderWithLinks,
  REST_URL,
  rewriteHtml,
  search,
  unescapePageTitle,
  wikiPageWithTitle
};
