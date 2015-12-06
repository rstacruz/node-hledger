/**
 * hledger.tableize:
 * Turns a CSV-based array into an table list.
 *
 *     input = [
 *       ['account', 'amount'],
 *       ['Savings', '$100'],
 *       ['Checking', '$150']
 *     ]
 *
 *     tableize(input)
 *     // [ { account: 'Savings', amount: '$100' },
 *     //   { account: 'Checking', amount: '$200' } ]
 *
 * Used for piping into `hledger()`'s promise output:
 *
 *     hledger('...')
 *       .then(hledger.tableize)
 *       .then((data) => ...)
 */

function tableize (list) {
  if (!Array.isArray(list)) throw new Error('tableize: expected an array')

  const keys = list[0]
  return list.slice(1).map((row) => {
    return keys.reduce((item, key, idx) => {
      item[key] = row[idx]
      return item
    }, {})
  })
}

module.exports = tableize
