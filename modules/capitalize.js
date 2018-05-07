function capitalize(string) {
  if (string && string !== '')
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function (string) {

  if (process.env.DEBUG)
    return 'capitalize : ' + capitalize(string)

  return capitalize(string)
}
