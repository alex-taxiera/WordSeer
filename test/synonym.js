const assert = require('assert')
const command = require('../modules/commands')

const author = {
  id: '123',
  mention: ''
}
const channel = {
  id: '123'
}

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

describe('Synonyms', function () {
  it('should return error message if word does not exist', async function () {
    assert.equal(await command.synonym.run({ msg: { author, channel }, params: ['sssssssnake'] }), 'Word does not exist')
  })
  it('should return suggestions if word is similar to, but not actually a word', async function () {
    assert.equal(await command.synonym.run({ msg: { author, channel }, params: ['ssnake'] }), `Word does not exist, try ${suggestions.join(' ,')}`)
  })
  it('should return embed object with synonym data', function () {
    const params = ['fast']
    const expected = {
      content: '',
      embed: {
        title: `Synonyms for: ${params[0]}`,
        description: 'stuck, stable, tenacious, wild'
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
    assert.equal(await command.synonym.run({ msg: { author, channel }, params: ['snake'] }), undefined)
  })
  it('should return message that word has no synonyms if no synonyms exist', async function () {
    assert.equal(await command.synonym.run({ msg: { author, channel }, params: ['snake'] }), `No synonyms for snake`)
  })
})
