const { CollegiateDictionary } = require('mw-dict')
const { MW_KEY } = require('../config.json')

const mw = new CollegiateDictionary(MW_KEY)

function search (query) {
  return mw.lookup(query)
  .then((hits) => {
    return hits
  })
  .catch((e) => {
    if (!e.suggestions[0]) return undefined
    return { suggestions: e.suggestions }
  })
}

module.exports = { search }
