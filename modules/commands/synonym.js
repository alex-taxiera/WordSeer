const Command = require('./Command.js')

module.exports = new Command({
  name: 'synonym',
  description: 'Find and display synonyms for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    return {
      content: '',
      embed: {
        title: 'Not yet implemented',
        description: 'Not yet implemented'
      }
    }
  }
})
