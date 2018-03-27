const assert = require('assert')
const command = require('../modules/commands')

describe('Synonyms', function () {
  it('should return error message if word doesn\'t exist', async function () {
    assert.equal(await command.synonym.execute('sssssssnake'), 'Word does not exist')
  })
  it('should return embed object with synonym data', async function () {
    let word = 'snake'
    assert.equal(await command.synonym.execute(word), {
      title: `Synonyms for: ${word}`,
      description: 'beast, boor, cad, churl, clown, creep, cur, dog, heel, jerk, joker, louse, lout, pill, rat, reptile, scum, skunk, slob, stinker, swine, varmint, vermin'
    })
  })
  // TODO: Error handling
  // it('', async function () {
  //   assert.equal(await command.l.execute('ssssssssssssnake'), '')
  // })
})
