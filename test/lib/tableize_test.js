const tableize = require('../../lib/tableize')

describe('tableize', function () {
  it('works', function () {
    const input = [
      ['account', 'amount'],
      ['Savings', '$100'],
      ['Checking', '$150']
    ]
 
    expect(tableize(input)).toEqual([
      { account: 'Savings', amount: '$100' },
      { account: 'Checking', amount: '$150' }
    ])
  })
})
