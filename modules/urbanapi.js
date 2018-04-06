// Documentation: https://github.com/NightfallAlicorn/urban-dictionary
const ud = require('urban-dictionary')
const getUrban = require('util').promisify(ud.term)

function search (query) {
  return getUrban(query)
  .then((entries, tags, sounds) => {
    // console.log(entries[0])
    return entries[0]
  })
  .catch((error) => {
    throw error
  })
}

module.exports = { search }
