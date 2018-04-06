/* global describe it */
const assert = require('assert')
const command = require('../modules/commands')

describe('Define', function () {
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
    const expected = 'Word does not exist'

    await command.define.run({ msg, params: ['sssssssnake'] })
    .then((actual) => assert.equal(actual, expected))
  })

  it('should return suggestions if word is similar to, but not actually a word', async function () {
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
    const expected = 'Word does not exist, try ' + [
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
    ].join(', ')

    await command.define.run({ msg, params: ['ssnake'] })
    .then((actual) => assert.equal(actual, expected))
  })

  it('should return embed object with definition(s), functional label, popularity, and pronunciation', async function () {
    const author = {
      id: '123',
      mention: ''
    }
    const channel = {
      id: '123',
      messages: []
    }
    const msg1 = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    const msg2 = {
      id: '3',
      author,
      channel,
      content: '1',
      timestamp: 1
    }
    channel.messages.push(msg1, msg2)
    const expected = {
      content: '',
      embed: {
        title: 'snake',
        description: '*noun*, [link to sound](http://media.merriam-webster.com/soundc11/s/snake001.wav)',
        fields: [
          {
            name: '1',
            value: ': any of numerous limbless scaled reptiles (suborder Serpentes syn. Ophidia) with a long tapering body and with salivary glands often modified to produce venom which is injected through grooved or tubular fangs'
          },
          {
            name: '2',
            value: ': a worthless or treacherous fellow'
          },
          {
            name: '3',
            value: ": something (as a plumber's snake) resembling a snake"
          },
          {
            name: 'Popularity',
            value: 'Bottom 40% of words'
          }
        ]
      }
    }
    await command.define.run({ msg: msg1, params: ['snake'] })
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
    const expected = undefined
    channel.messages.push(msg)

    await command.define.run({ msg, params: ['snake'] })
    .then((actual) => assert.equal(actual, expected))
  })
})
