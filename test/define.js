const assert = require('assert')
const command = require('../modules/commands')

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
    assert.equal(await command.define.run({ msg, params: ['sssssssnake'] }), 'Word does not exist')
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
    assert.equal(await command.define.run({ msg, params: ['ssnake'] }), `Word does not exist, try ${suggestions.join(', ')}`)
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
    channel.messages.push({ id: '3', author, channel, content: '1', timestamp: 1 })
    const msg = {
      id: '2',
      author,
      channel,
      timestamp: 0
    }
    const params = ['snake']
    const expected = {
      content: '',
      embed: {
        title: params[0],
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
    command.define.run({ msg, params }).then((actual) => {
      assert.deepEqual(actual, expected)
      // assert.equal(actual.content, expected.content)
      // assert.equal(actual.embed.description, expected.embed.description)
      // assert.equal(actual.embed.title, expected.embed.title)
      // for (let i = 0; i < expected.embed.fields.length; i++) {
      //   console.log('actual: ', actual.embed.fields[i].value)
      //   console.log('expected: ', expected.embed.fields[i].value)
      //   assert.equal(actual.embed.fields[i].name, expected.embed.fields[i].name)
      //   assert.equal(actual.embed.fields[i].value, expected.embed.fields[i].value)
      // }
    })
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
    assert.equal(await command.define.run({ msg, params: ['snake'] }), undefined)
  })
})
