const assert = require('assert')
const command = require('../modules/commands')

describe('Synonyms', function () {
  it('should return error message if word doesn\'t exist', async function () {
    assert.equal(await command.synonym.run({ params: ['sssssssnake'] }), 'Word does not exist')
  })
  it('should return embed object with synonym data', async function () {
    const params = ['snake']
    const expected = {
      content: '',
      embed: {
        title: `Synonyms for: ${params[0]}`,
        description: 'beast, boor, cad, churl, clown, creep, cur, dog, heel, jerk, joker, louse, lout, pill, rat, reptile, scum, skunk, slob, stinker, swine, varmint, vermin'
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
