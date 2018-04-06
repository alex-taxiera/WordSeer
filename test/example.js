/* global describe it */
const assert = require('assert')
const command = require('../modules/commands')

describe('Example', function () {
  it('should return embed object with definitionsand corresponding example sentences', async function () {
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
        title: 'fast',
        fields:
        [
          {
            name: '1',
            value: 'a: firmly fixed \nroots fast in the ground\nb: tightly shut \nthe drawers were fast\nd: not easily freed : \na ball fast in the mouth of the cannon\ne: \nmovable items were made fast to the deck'
          },
          {
            name: '2', value: ': firmly loyal \nbecame fast friends'
          },
          {
            name: '4',
            value: 'a: securely attached \na rope fast to the wharf\nb: \na fast hold on her purse'
          },
          {
            name: '7', value: 'a: \na pretty fast crowd'
          },
          {
            name: '8',
            value: ': resistant to change (as from destructive action or fading)  often used in combination sunfast acid-fast bacteria\nfast dyes'
          }
        ]
      }
    }
    await command.example.run({ msg: msg1, params: ['fast'] })
    .then((actual) => assert.deepEqual(actual, expected))
  })
})
