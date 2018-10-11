var _ = require('../')
var assert = require('assert')

// Util
describe('basic', function() {
  it('noop should do nothing', function() {
    // throw 111
    assert(undefined === _.noop())
  })

  it('now should return a date in ms', function() {
    assert(_.now() > 1000)
  })
})

describe('constant', function() {
  it('return function return same val', function() {
    var obj = {
      foo: 'bar'
    }
    var getter = _.constant(obj)
    assert(obj === getter())
  })
})

describe('chain', function() {
  it('can run as chain', function() {
    var ret = _.chain([1, 0, 2, 4])
      .map(function(val) {
        return 2 * val
      })
      .filter(function(val) {
        return val < 6
      })
      .value()

    assert.deepEqual([2, 0, 4], ret)
  })
})

describe('random', function() {
  it('return random number', function() {
    var ret = _.random(0, 1)
    assert(ret == 0 || ret == 1)
    var arr = []
    for (var i = 0; i < 10; i++) {
      arr.push(_.random(3, 6))
    }
    for (var i = 0; i < arr.length; i++) {
      assert(arr[i] >= 3 && arr[i] <= 6)
    }
  })
})

describe('uniqueId', function() {
  it('return uniqueId', function() {
    assert.deepEqual(_.uniqueId('contact_'), 'contact_1')
    assert.deepEqual(_.uniqueId(), '2')
  })
})
