
const modules = require('../modules')

test('Loading modules', () => {
  expect(modules.load())
    .toEqual(expect.arrayContaining([
      'alternateCaps.js',
      'capitalize.js',
      'leetConsonants.js',
      'leetVowels.js'
    ]))

  expect(modules.load())
    .toEqual(expect.not.arrayContaining([
      'index.js'
    ]))
})

test('Generating mangled variants', () => {
  expect(Array.from(modules.mangle(modules.load(), 'leet')))
    .toEqual(expect.arrayContaining([
      'leet',
      'l33t',
      'LEET',
      'L33T'
    ]))
})

test('Generating mangled variants of multiple words', () => {
  expect(Array.from(modules.mangle(modules.load(), 'leet,nerd,banana')))
    .toEqual(expect.arrayContaining([
      'leet',
      'l33t',
      'LEET',
      'L33T',
      'N3RD',
      'nerd',
      'b4n4n4',
      'BANANA'
    ]))
})

test('Generating final words with appended sequences w/o errors', () => {
  expect(modules.output({ words: 'leet', test: true }))
})
