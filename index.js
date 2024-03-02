#!/usr/bin/env node

const modules = require('./modules')
const {parseArgs} = require('node:util')
const version = require('./package.json').version

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

  if (!values.words) {
    console.log(`
      You need to provide at least one word as a parameter with -w.
      Use --help or -h to learn more.
      `)
    return
  }

  modules.run(values)
}

if (require.main === module) commandLine()
