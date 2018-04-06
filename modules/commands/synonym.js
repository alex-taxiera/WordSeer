const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'synonym',
  description: 'Find and display synonyms for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    const word = params.join()
    return mw.discordInterface(msg, word)
    .then((results) => {
      if (results.suggestions) return 'Word does not exist, try ' + results.suggestions.join(', ')
      let synonyms = []
      for (let i = 0; i < results.definition.length; i++) {
        let definition = results.definition[i]
        if (definition.senses) {
          for (let j = 0; j < definition.senses.length; j++) {
            if (definition.senses[j].synonyms) synonyms = synonyms.concat(definition.senses[j].synonyms)
          }
        } else if (definition.synonyms) synonyms = synonyms.concat(definition.synonyms)
      }
      if (synonyms.length === 0) {
        return 'No synonyms for ' + word
      } else {
        return {
          content: '',
          embed: {
            title: `Synonyms for: ${results.word}`,
            description: synonyms.join(', ')
          }
        }
      }
    })
    .catch((error) => {
      if (error.message === 'NOWORD') return 'Word does not exist'
    })
  }
})
