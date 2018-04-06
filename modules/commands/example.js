const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'example',
  description: 'Find and display example sentences',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    const word = params.join()
    return mw.discordInterface(msg, word)
    .then((results) => {
      if (results.suggestions) return 'Word does not exist, try ' + results.suggestions.join(', ')
      let embed = {
        title: word,
        fields: []
      }
      for (let i = 0; i < results.definition.length; i++) {
        let definition = results.definition[i]
        let name, value
        if (definition.senses) {
          name = definition.number
          let temp = []
          for (let j = 0; j < definition.senses.length; j++) {
            if (definition.senses[j].meanings) {
              const sense = definition.senses[j]
              if (sense.illustrations) temp.push(`${sense.number}${sense.meanings.join(', ')}\n${sense.illustrations.join(', ')}`)
            }
          }
          value = temp.join('\n')
        } else if (definition.illustrations) {
          name = definition.number
          value = definition.meanings.join(', ') + '\n' + definition.illustrations.join(', ')
        }
        if (name && value) embed.fields.push({ name, value })
      }
      return { content: '', embed }
    })
    .catch((error) => {
      if (error.message === 'NOWORD') return 'Word does not exist'
    })
  }
})
