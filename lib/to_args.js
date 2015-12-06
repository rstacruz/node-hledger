/*
 * Internal: helper to convert `args` into an arguments array.
 * Takes in an array or a string.
 */

module.exports = function toArgs (args) {
  if (typeof args === 'string') {
    var shellquote = require('shell-quote')
    return shellquote.parse(args)
  }

  return args
}
