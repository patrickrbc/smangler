#!/usr/bin/node

const opts    = require('commander')
const fs      = require('fs')

opts
  .version('1.0.0')
  .option('-w, --words [string]', 'Words')
  .option('-o, --output [string]', 'Output file')
  .parse(process.argv);

if (!opts.words)
  return console.log(`
    You need to provide at least one word as a parameter with -w.
    Use --help or -h to learn more.
    `)

const modules = require('./modules')(opts)
