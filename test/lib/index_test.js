var hl = require('../../index')

describe('my project', function () {
  before(function () {
    return hl(['-f', 'test/fixtures/test.ledger', 'bal'])
      .then(hl.tableize)
      .then((data) => {
        this.data = data
      })
  })

  it('parses 1st account', function () {
    expect(this.data[0])
      .toEqual({ account: 'Assets', balance: '$250' })
  })

  it('parses 2nd account', function () {
    expect(this.data[1])
      .toEqual({ account: 'Assets:Checking', balance: '$150' })
  })
})
