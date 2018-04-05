const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'define',
  description: 'Find and display definition, functional label, popularity, and pronunciation for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    const word = params.join()
    return mw.discordInterface(msg, word)
    .then((results) => {
      if (results.suggestions) return 'Word does not exist, try ' + results.suggestions.join(', ')
      let embed = {
        title: word,
        description: `*${results.functional_label}*, [link to sound](${results.pronunciation[0]})`,
        fields: []
      }
      for (let i = 0; i < results.definition.length; i++) {
        let definition = results.definition[i]
        embed.fields.push({
          name: definition.number,
          value: ''
        })
        if (definition.senses) {
          let temp = []
          for (let j = 0; j < definition.senses.length; j++) {
            if (definition.senses[j].meanings) temp.push(definition.senses[j].number + definition.senses[j].meanings.join(', '))
          }
          embed.fields[i].value = temp.join('\n')
        } else if (definition.meanings) embed.fields[i].value = definition.meanings.join(', ')
      }
      embed.fields.push({ name: 'Popularity', value: results.popularity })
      return { content: '', embed }
    })
    .catch((error) => {
      if (error.message === 'NOWORD') return 'Word does not exist'
    })
  }
})
