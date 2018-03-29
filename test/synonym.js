const assert = require('assert')
const command = require('../modules/commands')

const author = {
  id: '123',
  mention: ''
}
const channel = {
  id: '123'
}

describe('Synonyms', function () {
  it('should return error message if word doesn\'t exist', async function () {
    assert.equal(await command.synonym.run({ msg: { author, channel }, params: ['sssssssnake'] }), 'Word does not exist')
  })
  it('should return embed object with synonym data', function () {
    const params = ['snake']
    const expected = {
      content: '',
      embed: {
        title: `Synonyms for: ${params[0]}`,
        description: 'beast, boor, cad, churl, clown, creep, cur, dog, heel, jerk, joker, louse, lout, pill, rat, reptile, scum, skunk, slob, stinker, swine, varmint, vermin'
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
    assert.equal(await command.synonym.run({ msg: { author, channel }, params: ['ssnake'] }), undefined)
  })
})
