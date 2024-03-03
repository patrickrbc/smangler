const {test} = require('node:test')
const {expect} = require('expect')
const smangler = require('../index')

const modules = require('../modules')

const opts = {
  words: 'leet',
  min: 0,
  max: 80,
}

test('Loading modules', () => {
  expect(modules.load()).toEqual(
    expect.arrayContaining([
      'alternateCaps.js',
      'capitalize.js',
      'leetConsonants.js',
      'leetVowels.js',
    ])
  )

  expect(modules.load()).toEqual(expect.not.arrayContaining(['index.js']))
})

test('Generating mangled variants', () => {
  expect(Array.from(modules.mangle(modules.load(), opts))).toEqual(
    expect.arrayContaining(['leet', 'l33t', 'LEET', 'L33T', 'l&&t'])
  )
})

test('Generating mangled variants of multiple words', () => {
  opts.words = 'leet,nerd,banana'
  expect(Array.from(modules.mangle(modules.load(), opts))).toEqual(
    expect.arrayContaining([
      'leet',
      'l33t',
      'LEET',
      'L33T',
      'l&&t',
      'N3RD',
      'nerd',
      'b4n4n4',
      'BANANA',
    ])
  )
})

test('Generating final words with appended sequences w/o errors', () => {
  expect(modules.run({words: 'leet', test: true}))
})

test('Using as a library', () => {
  const result = smangler({words: 'test', max: 4})

  expect(Array.isArray(result)).toBeTruthy()
  expect(result.includes('test')).toBeTruthy()
  expect(result.includes('t3st')).toBeTruthy()

  for (const line of result) {
    expect(line).toBeDefined()
    expect(line.length).toBeLessThanOrEqual(4)
  }
})
