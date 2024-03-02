const fs = require('fs')
const path = require('path')

const combinations = require('../util/combinations')

/*
 * Load all modules from this folder
 * @return {Object} an array with all modules
 */
function load() {
  const normalizedPath = path.join(__dirname, '.')

  const files = fs
    .readdirSync(normalizedPath)
    .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))

  // Create an array with all modules
  const moduleArr = []
  files.forEach(function (file) {
    if (
      !fs.statSync(normalizedPath + '/' + file).isDirectory() &&
      file !== 'index.js'
    )
      moduleArr.push(file)
  })

  return moduleArr
}

/*
 * Generate variants of given strings according to a set of modules
 * @param {Object} array of modules
 * @param {Object} options
 * @return {Object} Set of strings that will be used to concat
 */
function mangle(moduleArr, opts) {
  const core = new Set()
  const words = opts.words ? opts.words.split(',') : ['leet']

  words.forEach(function (word) {
    core.add(word)
    combinations(moduleArr).forEach(function (executionList) {
      core.add(executionList.reduce(reducer, word))
    })
  })

  function reducer(word, script) {
    return require('./' + script)(word)
  }

  return core
}

/*
 * Generate variants of given strings appending/prepending
 * common sequences to them
 * @param {Object} array of strings
 * @return {Object} Set with final wordlist
 */
function addSequences(core) {
  const wordlist = new Set(core)

  for (const string of core) {
    const sequences = fs
      .readFileSync(__dirname + '/../sequences.txt')
      .toString()
      .split('\n')

    // append
    sequences.map(x => {
      wordlist.add(string.concat(x))
    })

    // prepend
    sequences.map(x => {
      wordlist.add(x.toString().concat(string))
    })
  }

  return wordlist
}

/*
 * Generate variants of given strings appending common separators
 * @param {Object} array of strings
 * @return {Object} Set with final wordlist
 */
function addSeparators(core) {
  const wordlist = new Set(core)

  for (const string of core) {
    const separators = fs
      .readFileSync(__dirname + '/../separators.txt')
      .toString()
      .split('\n')

    // append
    separators.map(x => {
      wordlist.add(string.concat(x))
    })
  }

  return wordlist
}

/*
 * @param {Object} opts
 */
function run(opts) {
  const modules = load()

  let wordlist = mangle(modules, opts)

  wordlist = addSeparators(wordlist)
  wordlist = addSequences(wordlist)

  for (const item of wordlist) {
    if (item.length >= opts.min && item.length <= opts.max) {
      console.log(item)
    }
  }
}

module.exports = {
  addSequences,
  load,
  mangle,
  run,
}
