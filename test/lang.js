var _ = require('../')
var assert = require('assert')

// Lang
describe('basic', function() {
  it('isString', function() {
    assert(_.isString('foo'))
    assert(!_.isString(123))
    assert(!_.isString())
    assert(!_.isString(null))
  })

  it('isEmpty', function() {
    assert(_.isEmpty(null))
    assert(_.isEmpty([]))
    assert(_.isEmpty(''))
    assert(_.isEmpty({}))
    assert(!_.isEmpty([1]))
  })
})
