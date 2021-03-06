/* global describe it */
const assert = require('assert')
const command = require('../modules/commands')

describe('Synonyms', function () {
  it('should return error message if word does not exist', async function () {
    const author = {
      id: '123',
      mention: ''
    }
    const channel = {
      id: '123',
      messages: []
    }
    const msg = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    await command.synonym.run({ msg, params: ['sssssssnake'] })
    .then((actual) => assert.equal(actual, 'Word does not exist'))
  })

  it('should return suggestions if word is similar to, but not actually a word', async function () {
    const suggestions = [
      'snake',
      'sneak',
      'snaky',
      'sneaky',
      'snack',
      'Sankt',
      'snook',
      'sneck',
      'Snead',
      'senate',
      'sante',
      'snick',
      'Sainte',
      'snide',
      'Santee',
      'sundae',
      'Santa',
      'Sankhya',
      'Hsinkao',
      'snag'
    ]
    const author = {
      id: '123',
      mention: ''
    }
    const channel = {
      id: '123',
      messages: []
    }
    const msg = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    await command.synonym.run({ msg, params: ['ssnake'] })
    .then((actual) => assert.equal(actual, `Word does not exist, try ${suggestions.join(', ')}`))
  })

  it('should return embed object with synonym data', async function () {
    const author = {
      id: '123',
      mention: ''
    }
    const channel = {
      id: '123',
      messages: []
    }
    channel.messages.push({ id: '3', content: '1', author, timestamp: 1 })
    const msg = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    const params = ['fast']
    const expected = {
      content: '',
      embed: {
        title: `Synonyms for: ${params[0]}`,
        description: 'stuck, stable, tenacious, wild'
      }
    }
    await command.synonym.run({ msg, params })
    .then((actual) => assert.deepEqual(actual, expected))
  })

  it('should return undefined if user does not respond to specify message', async function () {
    const author = {
      id: '123',
      mention: ''
    }
    const channel = {
      id: '123',
      messages: []
    }
    const msg = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    channel.messages.push(msg)
    await command.synonym.run({ msg, params: ['snake'] })
    .then((actual) => assert.equal(actual, undefined))
  })

  it('should return message that word has no synonyms if no synonyms exist', async function () {
    const author = {
      id: '123',
      mention: ''
    }
    const channel = {
      id: '123',
      messages: []
    }
    channel.messages.push({ id: '3', content: '1', author, timestamp: 1 })
    const msg = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    await command.synonym.run({ msg, params: ['snake'] })
    .then((actual) => assert.equal(actual, 'No synonyms for snake'))
  })
})
