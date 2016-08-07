'use strict'

var Promise = require('pinkie-promise')
var spawn = require('child_process').spawn
var csvParse = require('csv-parse')
var tableize = require('./tableize')
var toArgs = require('./to_args')

/**
 * Invokes hledger and returns a promise. It resolves into the CSV output as a
 * 2D array.
 *
 *     var hledger = require('hledger')
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
  var HLEDGER_BIN = process.env['HLEDGER_BIN'] || 'hledger'
  var mode = (options && options.mode) || 'csv'
  args = toArgs(args)

  if (mode === 'csv') {
    args = args.concat(['-O', 'csv'])
  }

  return new Promise(function (resolve, reject) {
    var child = spawn(HLEDGER_BIN, args)
    var stderr = ''
    var stdout = ''

    child.stdout.on('data', function (data) { stdout += data.toString() })
    child.stderr.on('data', function (data) { stderr += data.toString() })
    child.on('error', (err) => reject(err))

    child.on('close', function (code) {
      if (code !== 0) {
        var err = new Error(stderr.trim())
        err.code = code
        reject(err)
      } else if (mode === 'csv') {
        csvParse(stdout, function (err, data) {
          if (err) throw reject(err)
          resolve(data)
        })
      } else {
        resolve(stdout.trim().split('\n'))
      }
    })
  })
}

//
// Exports
//

hledger.tableize = require('./tableize')

module.exports = hledger
