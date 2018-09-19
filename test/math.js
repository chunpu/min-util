var _ = require('../')
var assert = require('assert')

// math

describe('sum', function() {
  it('should ok', function() {
    assert.equal(_.sum([1, 2, 3, 4]), 10)
    assert.equal(_.sum([]), 0)
  })
})

describe('max', function() {
  it('should ok', function() {
    assert.equal(_.max(), -Infinity)
    assert.equal(_.max([1, 2, 3]), 3)
    assert.equal(_.max([1, 5, 2]), 5)
    assert.deepEqual(_.max([{a: 2}, {a: 1}], function(item) {
      return item.a
    }), {a: 2})
  })
})

describe('max', function() {
  it('should ok', function() {
    assert.equal(_.min(), Infinity)
    assert.equal(_.min([1, 2, 3]), 1)
    assert.equal(_.min([1, -5, 2]), -5)
    assert.deepEqual(_.min([{a: 2}, {a: 1}], function(item) {
      return item.a
    }), {a: 1})
  })
})

