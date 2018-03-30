const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'synonym',
  description: 'Find and display synonyms for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    let word = params.join(' ')
    let promise = new Promise()
    const results = await mw.search(word) // returns a list of words, object { suggestions: [] }, or undefined
    if (!results) promise.resolve('Word does not exist')
    if (results.suggestions) promise.resolve(`Word does not exist, try ${results.suggestions.join(', ')}`)
    if (results.length === 1) {
      let synonyms = []

      for (let i = 0; i < results[0].definition.length; i++) {
        let definition = results[0].definition[i]
        if (definition.senses) {
          for (let j = 0; j < definition.senses.length; j++) {
            if (definition.senses[j].synonyms) synonyms = synonyms.concat(definition.senses[j].synonyms)
          }
        } else if (definition.synonyms) synonyms = synonyms.concat(definition.synonyms)
      }
      if (synonyms.length === 0) {
        promise.resolve(`No synonyms for ${word}`)
      } else {
        promise.resolve({
          content: '',
          embed: {
            title: `Synonyms for: ${results[0].word}`,
            description: synonyms.join(', ')
          }
        })
      }
    }
    // if results.length > 1, multiple possible words by this name
    if (results.length > 1) {
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
    }
    return promise
  }
})
