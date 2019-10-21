#!/usr/bin/env node

const opts    = require('commander')
const fs      = require('fs')
const modules = require('./modules')

module.exports = function () {
  return modules
}()

function commandLine () {
  opts
    .version('1.1.0')
    .option('-w, --words [string]', 'One or multiple words comma separated')
    .option('-o, --output [string]', 'Output file')
    .option('-m, --min [number]', 'Minimum length', 0)
    .option('-M, --max [number]', 'Max length', 80)
    .parse(process.argv);

  if (!opts.words) {
    return console.log(`
      You need to provide at least one word as a parameter with -w.
      Use --help or -h to learn more.
      `)
  }

  modules.output(opts)
}

if (require.main === module)
  commandLine()
