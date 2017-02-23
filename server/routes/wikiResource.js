const fetch = require('node-fetch');
const wiki = require('../../connectors/wiki');

module.exports = async (request) => {
  const url = `${wiki.BASE_URL}${request.url}`;
  console.log(`Download: ${url}`);
  const result = await fetch(url);
  return result.buffer();
};
