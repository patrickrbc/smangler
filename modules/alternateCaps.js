function alternate(string) {

  string = string.split('')
  for (var i = 0, len = string.length; i < len; i++) {
    if (i % 2 !== 0)
      string[i] = string[i].toUpperCase()
  }
  return string.join('')
}


module.exports = function (string) {

  if (process.env.DEBUG)
    return 'alternateCaps : ' + alternate(string)

  return alternate(string)
}
