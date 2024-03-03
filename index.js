#!/usr/bin/env node

const modules = require('./modules')
const {parseArgs} = require('node:util')
const version = require('./package.json').version
const readline = require('readline')

module.exports = modules

function commandLine() {
  const options = {
    version: {
      type: 'boolean',
      short: 'v',
    },
    help: {
      type: 'boolean',
      short: 'h',
    },
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

  if (values.version) {
    console.log(version)
    return
  }

  if (values.help) {
    console.log(`
      Usage: smangler [options]

      Options:
        -h, --help      Show this help message and exit.
        -v, --version   Show the version and exit.
        -w, --words [string]   One or multiple words comma separated
        -m, --min [number]     Minimum length (default: ${options.min.default})
        -M, --max [number]     Max length (default: ${options.max.default})
      `)
    return
  }

  if (values.words) {
    modules.run(values)
    return
  }

  processFromStdin(values)
}

function processFromStdin(values) {
  const rl = readline.createInterface({
    input: process.stdin,
  })

  rl.on('line', line => {
    modules.run({
      ...values,
      words: line.trim(),
    })
  })
}

if (require.main === module) commandLine()
