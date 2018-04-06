/* global describe it */
const assert = require('assert')
const command = require('../modules/commands')

describe('Urban', function () {
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
    assert.equal(await command.urban.run({ msg, params: ['sssssssnake'] }), 'Word does not exist')
  })

  it('should return embed object with definition(s)', async function () {
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
    const params = ['kek']
    const expected = {
      content: '',
      embed: {
        title: 'kek',
        description: '[permalink](http://kek.urbanup.com/1668182)',
        fields: [
          {
            name: 'Definition',
            value: 'Kek literally translates to lol on World of Warcraft. When someone from the Horde side types lol in /say, members of the alliance side see kek instead. Not specific to Orcs.',
            inline: true
          },
          {
            name: 'Example',
            value: 'Human Paladin: Dude, that Orc totally just pwned you.\r\nOrc: Kek.\r\nHuman: Dude, now he\'s laughing at you. Kick his ass.',
            inline: true
          },
          {
            name: 'Author',
            value: 'evapor8ed',
            inline: true
          },
          {
            name: 'Popularity',
            value: 'thumbs up: 5485, thumbs down: 2784',
            inline: true
          }
        ]
      }
    }
    await command.urban.run({ msg, params }).then((actual) => {
      assert.deepEqual(actual, expected)
    })
  })
})
