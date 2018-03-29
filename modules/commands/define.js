const Command = require('./Command.js')

module.exports = new Command({
  name: 'define',
  description: 'Find and display definition, functional label, popularity, and pronunciation for a specific word',
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
