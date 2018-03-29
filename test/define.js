const assert = require('assert')
const command = require('../modules/commands')

const author = {
  id: '123',
  mention: ''
}
const channel = {
  id: '123'
}

describe('Define', function () {
  it('should return error message if word doesn\'t exist', async function () {
    assert.equal(await command.wordSearch.run({ msg: { author, channel }, params: ['sssssssnake'] }), 'Word does not exist')
  })
  it('should return embed object with definition(s), functional label, popularity, and pronunciation', async function () {
    const params = ['snake']
    const expected = {
      content: '',
      embed: {
        title: params[0],
        description: '*noun*, [link to sound](http://media.merriam-webster.com/soundc11/s/snake001.wav)',
        fields: [
          {
            name: '1',
            value: ': any of numerous limbless scaled reptiles (suborder Serpentes synonym Ophidia) with a long tapering body and with salivary glands often modified to produce venom which is injected through grooved or tubular fangs'
          },
          {
            name: '2',
            value: ': a worthless or treacherous fellow'
          },
          {
            name: '3',
            value: ": something (such as a plumber's snake) resembling a snake"
          },
          {
            name: 'Popularity',
            value: 'Bottom 40% of words'
          }
        ]
      }
    }
    command.synonym.run({ msg: { author, channel }, params }).then((actual) => {
      assert.equal(actual.content, expected.content)
      assert.equal(actual.embed.title, expected.embed.title)
      assert.equal(actual.embed.description, expected.embed.description)
    })
    require('../bot.js').emit('messageCreate', { content: '1', author, channel })
  })
  it('should return undefined if user does not respond to specify message', async function () {
    assert.equal(await command.define.run({ msg: { author, channel }, params: ['ssnake'] }), undefined)
  })
})
