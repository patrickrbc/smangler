function leetConsonants (string) {
  if (string && string !== '')
    return string
      .replace(/s/ig, 5)
      .replace(/b/ig, 3)
      .replace(/z/ig, 2)
      .replace(/l/ig, 1);
}

module.exports = function (string) {

  if (process.env.DEBUG)
    return 'leetConsonants : ' + leetConsonants(string)

  return leetConsonants(string)
}

