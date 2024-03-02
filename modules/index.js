const fs           = require('fs')
const combinations = require('../util/combinations')

/*
 * Load all modules from this folder
 * @return {Object} an array with all modules
 */
function load () {

  var normalizedPath = require('path').join(__dirname, '.')

  var files = require('fs')
    .readdirSync(normalizedPath)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))

  // Create an array with all modules
  var moduleArr = []
  files.forEach(function(file) {
    if (!fs.statSync(normalizedPath + '/' + file).isDirectory() &&
        file !== 'index.js')
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
function mangle (moduleArr, opts) {

  var core = new Set()
  var words = opts.words ? opts.words.split(',') : ['leet']

  words.forEach(function (word, i) {
    core.add(word)
    combinations(moduleArr).forEach(function (executionList, i) {
      core.add(executionList.reduce(reducer, word))
    })
  })

  function reducer (word, script, index, array) {
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
function addSequences (core) {

  var wordlist = new Set(core)

  for (let string of core) {

    let sequences = fs
      .readFileSync(__dirname + '/../sequences.txt')
      .toString()
      .split('\n')

    // append
    sequences.map((x) => {
      wordlist.add(string.concat(x))
    })

    // prepend
    sequences.map((x) => {
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
function addSeparators (core) {

  var wordlist = new Set(core)

  for (let string of core) {

    let separators = fs
      .readFileSync(__dirname + '/../separators.txt')
      .toString()
      .split('\n')

    // append
    separators.map((x) => {
      wordlist.add(string.concat(x))
    })
  }

  return wordlist
}

/*
 * Print to file if [output] option is given, otherwise print to stdout
 * @param {Object} program options
 */
function output (opts) {
  let modules  = load()
  let wordlist = mangle(modules, opts)

  wordlist = addSeparators(wordlist)
  wordlist = addSequences(wordlist)

  _generateOutput(wordlist, opts)
}

/*
 * Write output from a wordlist
 * @param {Object} Set with generated wordlist
 * @param {Object} program options
 */
function _generateOutput (wordlist, opts) {

  if (opts.test)
    return

  if (!opts || !opts.output) {
    for (let item of wordlist)
      if (item.length >= opts.min && item.length <= opts.max)
        console.log(item)
    return
  }

  var stream = fs.createWriteStream(opts.output)

  for (let item of wordlist)
    stream.write(item + '\n')

  stream.end()
}

module.exports = {
  addSequences,
  load,
  mangle,
  output,
}
