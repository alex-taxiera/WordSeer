const Command = require('./Command.js')
const mw = require('../mwapi.js')

module.exports = new Command({
  name: 'define',
  description: 'Find and display definition, functional label, popularity, and pronunciation for a specific word',
  parameters: ['word'],
  permission: 'Anyone',
  run: async ({ msg, params }) => {
    const word = params.join()
    return new Promise(async (resolve, reject) => {
      let results = await mw.search(word) // returns a list of words, object { suggestions: [] }, or undefined
      if (!results) {
        resolve('Word does not exist')
      } else {
        if (results.suggestions) resolve(`Word does not exist, try ${results.suggestions.join(', ')}`)
        if (results.length === 1) {
          let embed = {
            title: word,
            description: `*${results[0].functional_label}*, [link to sound](${results[0].pronunciation[0]})`,
            fields: []
          }
          for (let i = 0; i < results[0].definition.length; i++) {
            let definition = results[0].definition[i]
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
          embed.fields.push({ name: 'Popularity', value: results[0].popularity })
        }
        if (results.length > 1) {
          // send embed message, showing words and their functional labels, etymology?
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
              if (isNaN(response) || response < 1 || response > results.length) {
                resolve('Bad response')
              } else {
                const final = results[response - 1]
                let embed = {
                  title: final.word,
                  fields: [],
                  description: `*${final.functional_label}*, [link to sound](${final.pronunciation[0]})`
                }
                for (let i = 0; i < final.definition.length; i++) {
                  let definition = final.definition[i]
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
                embed.fields.push({
                  name: 'Popularity',
                  value: final.popularity
                })
                resolve({ content: '', embed })
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
