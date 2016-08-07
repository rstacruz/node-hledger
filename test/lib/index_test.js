var hl = require('../../index')

describe('hledger', function () {
  describe('basic test', function () {
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

  describe('errors when hledger is not found', function () {
    before(function () {
      process.env.HLEDGER_BIN = 'nonexistentexecutable'
    })

    after(function () {
      delete process.env.HLEDGER_BIN
    })

    it('are handled', function () {
      return invert(hl(['...']))
      .then((err) => {
        expect(err.message).toEqual('spawn nonexistentexecutable ENOENT')
      })
    })
  })

  describe('handles accounts', function () {
    it('works', function () {
      return hl(['-f', 'test/fixtures/test.ledger', 'accounts'], { mode: 'list' })
      .then((data) => {
        expect(data).toEqual([
          'Assets:Checking',
          'Assets:Savings',
          'Equity:Opening balances'
        ])
      })
    })
  })

  describe('errors with unknown flags', function () {
    it('are handled', function () {
      return invert(hl(['-X']))
      .then((err) => {
        expect(err.message).toInclude('hledger: Unknown flag: -X')
      })
    })

    it('includes the code', function () {
      return invert(hl(['-X']))
      .then((err) => {
        expect(err.code).toEqual(1)
      })
    })
  })
})

/*
 * Inverts a promise
 */

function invert (promise) {
  return new Promise((resolve, reject) => {
    promise
      .then((data) => {
        reject(new Error('Promise succeeded when expected to fail'))
      })
      .catch((err) => {
        resolve(err)
      })
  })
}
