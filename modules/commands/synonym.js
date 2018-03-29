const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'synonym',
  description: 'Find and display synonyms for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    let promise = new Promise()
    const results = await mw.search(params.join()) // returns a list of words, object { suggestions: [] }, or undefined
    // if undefined:
      promise.resolve('does not exist')
    // if results.suggestions: send message embed asking user to select a word
      promise.resolve('not found, did you mean one of these?') // with list of words appended as test spec
    // if results.length > 1, multiple possible words by this name
      // send embed message, showing words and their functional labels
      let count = 0
      let loop = setInterval(function () {
        count++
        let last = msg.channel.messages.filter((m) => m.author.id === msg.author.id)
        last = last[last.length - 1]
        if (last.id !== msg.id) {
          let response = last.content
          if (isNaN(response) || response < 1 || response > results.length + 1) {
            clearInterval(loop)
            // bad response, delete message
          } else {
            clearInterval(loop)
            // input was proper, create response inside promise.resolve() as spec, correct word is word[response - 1]
            // delete message
            promise.resolve({})
          }
        }
        if (count > 30) {
          clearInterval(loop)
        }
      }, 1000)
    // else only one word
    // resolve promise with object made with results[0]
    promise.resolve({})
    return promise
  }
})
