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
      const { date, text } = parseLinkTitle(item.title);

      // Construct list of all tags except the one matching the topic.
      const tags = item.tags
          .filter(tag => tag !== topic)
          .map(tag => `<a href="/reference/${tag}">${tag}</a>`);
      let tagsHtml = tags.join(', ');
      if (tagsHtml.trim().length > 0) {
        tagsHtml = `(See also ${tagsHtml})`;
      }

      return `<tr>
        <td>${date}</td>
        <td>
          ${text}
          <a href="${item.link}">${domain}</a>
          ${tagsHtml}
        </td>
      </tr>`;
    });
    const linksHtml = links.join('\n');
    return `<table class="topicLinks">
      ${linksHtml}
    </table>`;
  })
  .catch(exception => {
    console.log(`Exception: ${exception}`);
  });
};


function parseLinkTitle(title) {
  const linkPartsRegex = /([\d-]+) (.*)/;
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
