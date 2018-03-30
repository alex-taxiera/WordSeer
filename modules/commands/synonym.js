const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'synonym',
  description: 'Find and display synonyms for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    let word = params.join(' ')
    return new Promise(async (resolve, reject) => {
      let results = await mw.search(word) // returns a list of words, object { suggestions: [] }, or undefined
      if (!results) {
        resolve('Word does not exist')
      } else {
        if (results.suggestions) resolve(`Word does not exist, try ${results.suggestions.join(', ')}`)
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
            resolve(`No synonyms for ${word}`)
          } else {
            resolve({
              content: '',
              embed: {
                title: `Synonyms for: ${results[0].word}`,
                description: synonyms.join(', ')
              }
            })
          }
        }
        if (results.length > 1) {
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
          const specify = await msg.channel.createMessage({
            content: `${msg.author.mention} Select a number 1-${results.length}`,
            embed
          })
          let count = 0
          let loop = setInterval(function () {
            count++
            let last = msg.channel.messages.filter((m) => m.author.id === msg.author.id)
            last = last[last.length - 1]
            if (last && last.timestamp > msg.timestamp) {
              clearInterval(loop)
              specify.delete()
              let response = parseInt(last.content)
              if (isNaN(response) || response < 1 || response > results.length + 1) {
                resolve('Bad response')
              } else {
                const final = results[response - 1]
                let synonyms = []
                for (let i = 0; i < final.definition.length; i++) {
                  let definition = final.definition[i]
                  if (definition.senses) {
                    for (let j = 0; j < definition.senses.length; j++) {
                      if (definition.senses[j].synonyms) synonyms = synonyms.concat(definition.senses[j].synonyms)
                    }
                  } else if (definition.synonyms) synonyms = synonyms.concat(definition.synonyms)
                }
                if (synonyms.length === 0) {
                  resolve(`No synonyms for ${word}`)
                } else {
                  resolve({
                    content: '',
                    embed: {
                      title: `Synonyms for: ${results[0].word}`,
                      description: synonyms.join(', ')
                    }
                  })
                }
              }
            }
            if (count > 30) {
              clearInterval(loop)
              specify.delete()
              resolve(undefined)
            }
          }, 1000)
        }
      }
    })
  }
})
