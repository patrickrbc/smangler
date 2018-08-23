const fs           = require('fs')
const combinations = require('../util/combinations')

function loadModules () {

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

function loadStrings (moduleArr) {

  var core = []

  // Process words
  var words = process.argv[2].split(',')
  words.forEach(function (word, i) {
    core.push(word)
    combinations(moduleArr).forEach(function (executionList, i) {
      core.push(executionList.reduce(reducer, word))
    })
  })

  function reducer (word, script, index, array) {
    return require('./' + script)(word)
  }

  return core
}

function generate (core) {

  core.map(string => console.log(string))

  core.map(string => {

    let sequences = fs
      .readFileSync(__dirname + '/../sequences.txt')
      .toString()
      .split('\n')

    // append
    sequences.map((x) => {
      console.log(string.concat(x))
    })

    // prepend
    sequences.map((x) => {
      console.log(x.toString().concat(string))
    })
  })
}

generate(loadStrings(loadModules))
