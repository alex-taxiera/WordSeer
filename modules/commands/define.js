const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'define',
  description: 'Find and display definition, functional label, popularity, and pronunciation for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    let promise = new Promise()
    let results = await mw.search(params.join()) // returns a list of words, object { suggestions: [] }, or undefined
    if (!results) promise.resolve('Word does not exist')
    if (results.suggestions) promise.resolve(`Word does not exist, try ${results.suggestions.join(', ')}`)
    if (results.length === 1) {
      // use results[0], iterate, resolve
    }
    if (results.length > 1) {
      // send embed message, showing words and their functional labels, etymology?
      results = results.filter((val, i) => i < 10)
      let embed = {
        title: 'What we found:',
        fields: []
      }
      for (let i = 0; i < results.length; i++) {
        const entry = results[0]
        embed.fields.push({
          name: entry.word,
          value: `Function: ${entry.functional_label}`
        })
        if (entry.etymology) embed.fields[i].value = embed.fields[i].value + `\nEtymology: ${entry.etymology}`
      }
      console.log({content: `${msg.author.mention} Select a number 1-${results.length + 1}`, embed})
      // const specify = await msg.channel.createMessage({
      //   content: `${msg.author.mention} Select a number 1-${results.length + 1}`,
      //   embed
      // })
      let count = 0
      let loop = setInterval(function () {
        count++
        let last = msg.channel.messages.filter((m) => m.author.id === msg.author.id)
        last = last[last.length - 1]
        if (last.id !== msg.id) {
          let response = last.content
          if (isNaN(response) || response < 1 || response > results.length + 1) {
            clearInterval(loop)
            // specify.delete()
            promise.reject('Bad response')
          } else {
            clearInterval(loop)
            // specify.delete()
            const final = results[response - 1]
            let embed = {
              title: final.word,
              fields: []
            }
            // iterate through definition/senses and push them to fields
            if (final.etymology) embed.description = final.etymology
            promise.resolve({ content: '', embed })
          }
        }
        if (count > 30) {
          clearInterval(loop)
          // specify.delete()
          promise.reject('No response')
        }
      }, 1000)
    }
    return promise
  }
})
