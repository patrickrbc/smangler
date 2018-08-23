const fs           = require('fs')
const combinations = require('../util/combinations')

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

core.map(string => console.log(string))

core.map(string => {
  let sequences = fs.readFileSync(__dirname + '/../sequences.txt')
  sequences = sequences.toString().split('\n')
  sequences.splice(-1,1)
  sequences.map((x) => {
    console.log(string.concat(x))
  })

  sequences.map((x) => {
    console.log(x.toString().concat(string))
  })
})
