
const modules = require('../modules')

var opts = {
  words: 'leet',
  min: 0,
  max: 80
}

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
  expect(Array.from(modules.mangle(modules.load(), opts)))
    .toEqual(expect.arrayContaining([
      'leet',
      'l33t',
      'LEET',
      'L33T'
    ]))
})

test('Generating mangled variants of multiple words', () => {
  opts.words = 'leet,nerd,banana'
  expect(Array.from(modules.mangle(modules.load(), opts)))
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
