function leetVowels (string) {
  if (string && string !== '')
    return string
      .replace(/a/ig, 4)
      .replace(/e/ig, 3)
      .replace(/i/ig, 1)
      .replace(/o/ig, 0);
}

module.exports = function (string) {

  if (process.env.DEBUG)
    return 'leetVowels : ' + leetVowels(string)

  return leetVowels(string)
}
