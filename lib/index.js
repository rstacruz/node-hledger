'use strict'

const Promise = require('pinkie-promise')
const spawn = require('child_process').spawn
const csvParse = require('csv-parse')
const tableize = require('./tableize')
const toArgs = require('./to_args')

/**
 * Invokes hledger and returns a promise. It resolves into the CSV output as a
 * 2D array.
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
 *     [ { account: 'Assets', balance: '$200' },
 *       { account: 'Assets:Savings', balance: '$150' },
 *       ... ]
 */

function hledger (args, options) {
  const HLEDGER_BIN = process.env['HLEDGER_BIN'] || 'hledger'
  args = toArgs(args).concat(['-O', 'csv'])

  return new Promise((resolve, reject) => {
    const child = spawn(HLEDGER_BIN, args)
    let stderr = ''
    let stdout = ''

    child.stdout.on('data', (data) => { stdout += data.toString() })
    child.stderr.on('data', (data) => { stderr += data.toString() })
    child.on('error', (err) => reject(err))

    child.on('close', (code) => {
      if (code !== 0) {
        const err = new Error(stderr.trim())
        err.code = code
        reject(err)
      } else {
        csvParse(stdout, (err, data) => {
          if (err) throw reject(err)
          resolve(data)
        })
      }
    })
  })
}

//
// Exports
//

hledger.tableize = require('./tableize')

module.exports = hledger
