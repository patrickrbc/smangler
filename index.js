/*
 * This script will generate a wordlist of approximately 90k words
 * based in a given string
 */
const opts    = require('commander')
const fs      = require('fs')

opts
  .version('0.0.1')
  .option('-w, --word', 'Word')
  .parse(process.argv);

if (!opts.args[0])
  return console.log('You need to provide a word as a parameter')

const modules = require('./modules')
