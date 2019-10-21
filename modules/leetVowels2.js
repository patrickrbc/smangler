function leetvowels (string) {
  if (string && string !== '')
    return string
      .replace(/a/ig, 4)
      .replace(/e/ig, '&')
      .replace(/i/ig, 1)
      .replace(/o/ig, 0);
}

module.exports = function (string) {

  if (process.env.debug)
    return 'leetvowels : ' + leetvowels(string)

  return leetvowels(string)
}
