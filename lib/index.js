const Promise = require('pinkie-promise')
const spawn = require('child_process').spawn
const csvParse = require('csv-parse')
const tableize = require('./tableize')
const toArgs = require('./to_args')

const HLEDGER_BIN = process.env['HLEDGER_BIN'] || 'hledger'

/*
 * Invokes hledger and resolves into the CSV output of hledger.
 *
 *     hledger(['bal', 'Assets'])
 *       .then((data) => ...)
 *
 *     [ [ 'account', 'balance' ],
 *       [ 'Assets', '$200' ],
 *       [ 'Assets:Savings', '$150' ],
 *       [ 'Assets:Checking', '$50' ] ]
 *
 * You can invoke it with a string:
 *
 *     hledger('bal Assets')
 *
 * You can then use functions to make better sense of them:
 *
 *     hledger(['bal', 'Assets'])
 *       .then(hledger.tableize)
 *       .then((data) => ...)
 *
 *    [ { account: 'Assets', balance: '$200' },
 *      { account: 'Assets:Savings', balance: '$150' },
 *      ... ]
 */

function fetch (args, options) {
  args = toArgs(args).concat(['-O', 'csv'])

  return new Promise((resolve, reject) => {
    var child = spawn(HLEDGER_BIN, args)
    var stderr = ''
    var stdout = ''

    child.stdout.on('data', (data) => { stdout += data.toString() })
    child.stderr.on('data', (data) => { stderr += data.toString() })

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('Exit with code ' + code + '\n' + stderr))
      } else {
        csvParse(stdout, (err, data) => {
          if (err) throw reject(err)
          resolve(data)
        })
      }
    })
  })
}

/*
 * Exports
 */

function hledger (args, options) {
  return fetch(args, options)
}

hledger.tableize = tableize

module.exports = hledger
