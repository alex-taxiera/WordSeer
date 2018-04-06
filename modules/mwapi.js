const { CollegiateDictionary } = require('mw-dict')
const { MW_KEY } = require('../config.json')

const mw = new CollegiateDictionary(MW_KEY)

async function discordInterface (msg, word) {
  return new Promise(async (resolve, reject) => {
    let results = await search(word) // returns a list of words, object { suggestions: [] }, or undefined
    if (!results) {
      reject(new Error('NOWORD'))
    } else {
      if (results.suggestions) resolve(results)
      if (results.length === 1) {
        resolve(results[0])
      }
      if (results.length > 1) {
        // send embed message, showing words and their functional labels, etymology?
        results = results.filter((val, i) => i < 10)
        let embed = {
          title: 'What we found:',
          fields: []
        }
        for (let i = 0; i < results.length; i++) {
          const entry = results[i]
          embed.fields.push({
            name: entry.word,
            value: `Function: ${entry.functional_label}`
          })
        }
        // console.log({content: `${msg.author.mention} Select a number 1-${results.length + 1}`, embed})
        // const specify = await msg.channel.createMessage({
        //   content: `${msg.author.mention} Select a number 1-${results.length}`,
        //   embed
        // })
        let count = 0
        let loop = setInterval(function () {
          count++
          let last = msg.channel.messages.filter((m) => m.author.id === msg.author.id)
          last = last[last.length - 1]
          if (last && last.timestamp > msg.timestamp) {
            clearInterval(loop)
            // specify.delete()
            let response = parseInt(last.content)
            if (isNaN(response) || response < 1 || response > results.length) {
              reject(new Error('NORESPONSE'))
            } else {
              resolve(results[response - 1])
            }
          }
          if (count > 5) {
            clearInterval(loop)
            // specify.delete()
            reject(new Error('TIMEOUT'))
          }
        }, 200)
      }
    }
  })
}

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

module.exports = { discordInterface }
