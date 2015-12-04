var hl = require('../index')

describe('my project', function () {
  it('works', function () {
    return hl(['bal'])
      .then((data) => {
        console.log('return', JSON.stringify(data, null, 2))
      })
  })
})
