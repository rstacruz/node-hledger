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

  describe('errors', function () {
    before(function () {
      process.env.HLEDGER_BIN = 'nonexistentexecutable'
    })

    after(function () {
      delete process.env.HLEDGER_BIN
    })

    it('are handled', function () {
      return hl(['...'])
      .catch((err) => {
        expect(err.message).toEqual('spawn nonexistentexecutable ENOENT')
      })
    })
  })
})
