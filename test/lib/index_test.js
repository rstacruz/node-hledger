var hl = require('../../index')

describe('my project', function () {
  it('works', function () {
    return hl(['bal'])
      .then(hl.tableize)
      .then((data) => {
        console.log('return', JSON.stringify(data, null, 2))
      })
  })
})
