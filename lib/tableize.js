/*
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
 */

module.exports = function tableize (list) {
  const keys = list[0]
  return list.slice(1).map((row) => {
    return keys.reduce((item, key, idx) => {
      item[key] = row[idx]
      return item
    }, {})
  })
}
