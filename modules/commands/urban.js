const Command = require('./Command.js')
const ud = require('../urbanapi.js')

module.exports = new Command({
  name: 'urban',
  description: 'Find and display author, definition, permalink, and popularity for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    const word = params.join()
    return ud.search(word)
    .then((results) => {
      let embed = {
        title: results.word,
        description: `[permalink](${results.permalink})`,
        fields: [
          {
            name: 'Definition',
            value: results.definition,
            inline: true
          },
          {
            name: 'Example',
            value: results.example,
            inline: true
          },
          {
            name: 'Author',
            value: results.author,
            inline: true
          },
          {
            name: 'Popularity',
            value: `thumbs up: ${results.thumbs_up}, thumbs down: ${results.thumbs_down}`,
            inline: true
          }
        ]
      }
      return { content: '', embed }
    })
    .catch((error) => {
      if (error.message === `${word} is undefined.`) return 'Word does not exist'
    })
  }
})
