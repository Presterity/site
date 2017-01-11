const fetch = require('node-fetch');


const RAINDROP_REST_URL = `https://raindrop.io/api/raindrops/2021037`;

module.exports = (topic) => {
  const url = `${RAINDROP_REST_URL}?search=[{"key":"tag","val":"${topic}"}]&sort="title"`;
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    // Results come sorted reverse chronologically; flip that.
    const items = json.items.reverse();

    const links = items.map(item => {
      let domain = item.domain;
      if (domain.startsWith('www.')) {
        domain = domain.slice(4); // Remove "www."
      }
      return `<li>${item.title} <a href="${item.link}">${domain}</a></li>`;
    });
    const linksHtml = links.join('\n');
    return `<ul>
      ${linksHtml}
    </ul>`;
  })
  .catch(exception => {
    console.log(`Exception: ${exception}`);
  });
};
