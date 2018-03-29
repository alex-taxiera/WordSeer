const assert = require('assert')
const command = require('../modules/commands')

describe('Define', function () {
  it('should return error message if word doesn\'t exist', async function () {
    assert.equal(await command.wordSearch.run({ params: ['sssssssnake'] }), 'Word does not exist')
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
    const actual = await command.synonym.run({ params })
    assert.equal(actual.content, expected.content)
    assert.equal(actual.embed.title, expected.embed.title)
    assert.equal(actual.embed.description, expected.embed.description)
  })
  // TODO: Error handling
  // it('', async function () {
  //   assert.equal(await command.l.execute('ssssssssssssnake'), '')
  // })
})
