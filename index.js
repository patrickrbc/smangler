#!/usr/bin/env node

const modules = require('./modules')
const {parseArgs} = require('node:util')

module.exports = modules

function commandLine() {
  const options = {
    words: {
      type: 'string',
      short: 'w',
    },
    min: {
      type: 'string',
      short: 'm',
      default: '0',
    },
    max: {
      type: 'string',
      short: 'M',
      default: '80',
    },
    output: {
      type: 'string',
      short: 'o',
    },
  }

  const {values} = parseArgs({options})

  if (!values.words) {
    return console.log(`
      You need to provide at least one word as a parameter with -w.
      Use --help or -h to learn more.
      `)
  }

  modules.output(values)
}

if (require.main === module) commandLine()
