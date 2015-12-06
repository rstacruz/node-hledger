/*
 * Internal: helper to convert `args` into an arguments array.
 * Takes in an array or a string.
 */

module.exports = function toArgs (args) {
  if (typeof args === 'string') {
    return args.split(' ')
  }

  return args
}
