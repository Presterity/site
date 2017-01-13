/*
 * The site's connection to, and represetation of, the Raindrop bookmark API.
 *
 * The general principle is that this module isolates anything specific to
 * Raindrop. If we were to change to a different wiki back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 */


const fetch = require('node-fetch');

const RAINDROP_REST_URL = `https://raindrop.io/api/raindrops/2021037`;


function bookmarksForTopic(topic) {
  const url = `${RAINDROP_REST_URL}?search=[{"key":"tag","val":"${topic}"}]&sort="title"`;
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    // Results come sorted reverse chronologically; flip that.
    return json.items.reverse();
  });
}

module.exports = {
  bookmarksForTopic
};
