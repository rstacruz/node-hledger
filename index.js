var Promise = require('pinkie-promise')
var spawn = require('child_process').spawn

var HLEDGER_BIN = process.env['HLEDGER_BIN'] || 'hledger'

/*
 * Invokes hledger
 *
 *     hledger(['bal', 'Assets'])
 *     .then((d) => ...)
 *
 *     {
 *       format: 'balance',
 *       entries: [
 *         { amount: '$ 2,000.00', account: 'Assets' },
 *         { amount: '$ 1,300.00', account: 'Assets:Savings' }
 *       ]
 *     }
 */

function hledger (args, options) {
  args = toArgs(args)

  return new Promise((resolve, reject) => {
    var child = spawn(HLEDGER_BIN, args)
    var stdout = ''
    var stderr = ''

    child.stdout.on('data', (data) => { stdout += data.toString() })
    child.stderr.on('data', (data) => { stderr += data.toString() })

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('Exit with code ' + code + '\n' + stderr))
      } else {
        resolve(prepare(stdout))
      }
    })
  })
}

/*
 * Internal: prepares data for JSONification.
 */

function prepare (output) {
  return output
}

/*
 * Internal: helper to convert `args` into an arguments array.
 * Takes in an array or a string.
 */

function toArgs (args) {
  if (typeof args === 'string') {
    return args.split(' ')
  }

  return args
}

module.exports = hledger
