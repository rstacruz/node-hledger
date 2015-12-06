var toArgs = require('../../lib/to_args')

describe('to args', function () {
  it('works with arrays', function () {
    expect(toArgs(['a', 'b'])).toEqual(['a', 'b'])
  })

  it('works with strings', function () {
    expect(toArgs('a b')).toEqual(['a', 'b'])
  })

  it('works with strings with quotes', function () {
    expect(toArgs('a "b c" d')).toEqual(['a', 'b c', 'd'])
  })

  it('works with strings with control chars', function () {
    expect(toArgs('a "b c" > d')).toEqual(['a', 'b c', '>', 'd'])
  })
})
