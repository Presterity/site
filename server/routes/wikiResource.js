const fetch = require('node-fetch');
const wiki = require('../connectors/wiki');

module.exports = (request) => {
  const url = `${wiki.BASE_URL}${request.url}`;
  console.log(`Download: ${url}`);
  return fetch(url)
  .then(result => result.buffer());
};
