const fs           = require('fs')
const combinations = require('../util/combinations')
const debug        = require('debug')('string-mangler:modules')

/*
 * @return an array with all module names from this folder
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
 * @param {Object} array of strings (seed)
 * @return {Object} Set of strings that will be used to concat
 */
function mangle (moduleArr, words = 'leet') {

  var core = new Set()
  var words = words.split(',')

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
 * Generate variants of given strings appending common sequences to them
 * @param {Object} array of strings
 * @return {Object} Set with final wordlist
 */
function generate (core) {

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
 * Print to file if [output] option is given, otherwise print to stdout
 * @param {Object} Set with generated wordlist
 * @param {Object} program options
 */
function generateOutput (wordlist, opts) {

  if (opts.test)
    return

  if (!opts || !opts.output) {
    for (let item of wordlist)
      console.log(item)
    return
  }

  var stream = fs.createWriteStream(opts.output)

  for (let item of wordlist)
    stream.write(item + '\n')

  stream.end()
}


module.exports = function (opts) {
  let modules  = load()
  let core     = mangle(modules, opts.words)
  let wordlist = generate(core, opts)

  generateOutput(wordlist, opts)

  return {
    load,
    mangle,
    generate
  }
}
