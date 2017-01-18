function highlightSideNavigation(pageTitle) {

  // Find our side navigation panel.
  var sideNavigation = document.querySelector('.sideNavigation');
  if (!sideNavigation) {
    console.warn("Couldn't find side navigation panel.");
    return;
  }

  // Find the link in the side navigation for the given page.
  var element = sideNavigation.querySelector('li[navigation-item="' + pageTitle + '"');

  // Mark that link (if found) and all its ancestors as current.
  while (element && element !== sideNavigation) {
    element.classList.add('current');
    element = element.parentNode;
  }
}


window.addEventListener('load', function() {
  // For reference pages, highlight the current page in the side navigation.
  var pageTitle = document.body.getAttribute('page');
  highlightSideNavigation(pageTitle);
});

