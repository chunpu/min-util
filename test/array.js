var _ = require('../')
var assert = require('assert')

// Iteration

describe('each', function() {
  it('never run empty', function() {
    var arr = [{}, [], 0, false, NaN]
    for (var i = 0; i < arr.length; i++) {
      _.each(arr[i], function() {
        assert(false, 'never access')
      })
    }
  })
  it('should iterate all', function() {
    var ret = []
    var arr = [1, 2, 3]
    _.each(arr, function(x, i, arr2) {
      assert(arr === arr2)
      assert(arr[i] === x)
      ret.push(x)
    })
    assert.deepEqual(ret, arr)
  })
  it('cannot crash when fn is shit', function() {
    _.each([1, 2, 3])
    assert(true)
  })
  it('run belong 0 ~ arr.length', function() {
    var arr = []
    _.each([1, 2, 3], function(val) {
      arr.push(val)
    }, {
      start: -100,
      end: 100
    })
    assert.deepEqual([1, 2, 3], arr)
  })
})

describe('map', function() {
  it('should map array', function() {
    var arr = _.map([1, 2, 3], function(x) {
      return 2 * x
    })
    assert.deepEqual([2, 4, 6], arr)
  })
})

describe('filter', function() {
  it('should filter unmatch', function() {
    assert.deepEqual(_.filter([1, 2, 3, 4, 5], function(x) {
      return x > 3
    }), [4, 5])
  })
})

describe('reject', function() {
  it('should be opposite of filter', function() {
    assert.deepEqual([1, 3], _.reject([1, 2, 3, 4], function(val) {
      return 0 == val % 2
    }))
  })
})

describe('some', function() {
  it('should return true', function() {
    assert(true === _.some([1, 2, 3, 4, 5], function(x) {
      return x > 3
    }))
  })
  it('should return false', function() {
    assert(false === _.some([1, 2, 3, 4, 5], function(x) {
      return x > 6
    }))
  })
})

describe('findIndex', function() {
  it('should find first matched item', function() {
    assert.equal(2, _.findIndex([1, 2, 3, 4, 5], function(x) {
      return x >= 3
    }))
  })
  it('should find nothing', function() {
    assert.equal(-1, _.findIndex([1, 2, 3, 4, 5], function(x) {
      return x >= 10
    }))
  })
})

describe('find', function() {
  it('should find first matched item', function() {
    assert.equal(3, _.find([1, 2, 3, 4, 5], function(x) {
      return x >= 3
    }))
  })
  it('should find nothing', function() {
    assert.equal(undefined, _.find([1, 2, 3, 4, 5], function(x) {
      return x >= 10
    }))
  })
})

describe('every', function() {
  it('should return true', function() {
    assert(true === _.every([1, 2, 3, 4, 5], function(x) {
      return x > 0
    }))
  })
  it('should return false', function() {
    assert(false === _.every([1, 2, 3, 4, 5], function(x) {
      return x > 3
    }))
  })
})

describe('difference', function() {
  it('should return new array without other', function() {
    var arr = _.difference([1, 2, 3, 1, 2, 3], [1, 2])
    assert.deepEqual([3, 3], arr)
  })
})

describe('without', function() {
  it('should return new array without args', function() {
    var arr = _.without([1, 2, 3, 1, 2], 1)
    assert.deepEqual([2, 3, 2], arr)
  })
})

describe('pluck', function() {
  it('should pluck value of each item', function() {
    var users = [{
      foo: 1,
      bar: 2
    }, {
      foo: 3,
      bar: 4
    }]
    assert.deepEqual([2, 4], _.pluck(users, 'bar'))

    assert.deepEqual([], _.without(_.pluck([null, 0, undefined], 'foo'), undefined))
  })
})

describe('size', function() {
  it('should return size of array', function() {
    var size = _.size([1, 2, 3])
    assert(3 == size)
  })
  it('should return length of array like', function(done) {
    var size = _.size({length: 1024})
    assert(1024 == size)

    var fn = function() {
      assert(3 == _.size(arguments))
      done()
    }
    fn(1, 2, 3)
  })
  it('should return size of object', function() {
    var size = _.size({a: 1, b: 2})
    assert(2 == size)
  })
  it('should return size of string', function() {
    var size = _.size('foo')
    assert(3 == size)
  })
  it('should return 0 of shit', function() {
    var arr = [null, NaN, 0, '', 1024, false, true, undefined]
    _.each(arr, function(val) {
      assert(0 == _.size(val))
    })
  })
})

describe('nth', function() {
  it('return nth of iteraton', function() {
    assert(_.nth(['a', 'b', 'c', 'd'], 1) === 'b')
    assert(_.nth(['a', 'b', 'c', 'd'], -2) === 'c')
  })
})

describe('first', function() {
  it('return first of iteraton', function() {
    assert(undefined === _.first())
    assert(undefined === _.first(null))
    assert(undefined === _.first(''))
    assert('f' === _.first('foo'))
    assert(undefined === _.first([]))
    assert(1 === _.first([1, 2, 3]))
  })
})

describe('last', function() {
  it('return last of iteraton', function() {
    assert(undefined === _.last())
    assert(undefined === _.last(null))
    assert(undefined === _.last(''))
    assert('o' === _.last('foo'))
    assert(undefined === _.last([]))
    assert(3 === _.last([1, 2, 3]))
  })
})

/*
describe('async map', function() {
  function delay(time, cb) {
    var ok = true
    if ('number' != typeof time) {
      time = 10
      ok = false
    }
    setTimeout(function() {
      if (ok) return cb(null, time)
      cb(new Error('time should be number: ' + time))
    }, time)
  }
  it('should work all ok tasks', function(done) {
    var start = +new Date
    var hasDone = false
    _.asyncMap([20, 10, 30], delay, function(err, rets) {
      if (hasDone) assert(false, 'has done')
      hasDone = true
      assert(!err)
      assert.deepEqual([20, 10, 30], rets)
      var duration = +new Date - start
      assert(duration < 35 && duration > 25)
      done()
    })
  })
  it('should cb error when one task os error', function(done) {
    var hasDone = false
    _.asyncMap([20, '30', 10], delay, function(err, rets) {
      if (hasDone) assert(false, 'has done')
      hasDone = true
      assert(err)
      done()
    })
  })
  it('should work on empty', function(done) {
    _.asyncMap(null, delay, function(err) {
      assert(!err)
      done()
    })
  })
})
*/

describe('slice', function() {
  it('should create a new array', function() {
    var arr = [1, 2, 3, 4]
    var slice = _.slice(arr)
    assert(arr !== slice)
    assert.deepEqual(arr, slice)
  })
  it('should return empty array when param is shit', function() {
    assert.deepEqual(_.slice(), [])
    assert.deepEqual(_.slice([1, 2, 3], 3, 2), [])
  })
  it('should auto adjust when out of range', function() {
    assert.deepEqual(_.slice([1, 2, 3], -1, 100), [3])
  })
})

describe('has', function() {
  it('should return true', function() {
    assert(true === _.includes('qwer', 'we'))
    assert(true === _.includes([1, 2, 3], 2))
  })
  it('should return false', function() {
    assert(false === _.includes('qwer', 'ew'))
    assert(false === _.includes([1, 2, 3], 4))
  })
})

describe('uniq', function() {
  it('basic uniq', function() {
    assert.deepEqual(_.uniq([1, 2, 4, 2, 4, 3]), [1, 2, 4, 3])
  })
  it('can uniq obj', function() {
    var a = {}, b = {a: 1}, c = {}
    assert.deepEqual(_.uniq([c, b, c, b, a]), [c, b, a])
  })
})

describe('uniqBy', function() {
  it('basic uniqBy', function() {
    assert.deepEqual(_.uniqBy([2.1, 1.2, 2.3], Math.floor), [2.1, 1.2])
    assert.deepEqual(_.uniqBy([1, 2, 4, 2, 4, 3], null), [1, 2, 4, 3])
  })
})

describe('flatten', function() {
  it('should flatten nested array', function() {
    assert.deepEqual([1, 2, 3, [[4]]], _.flatten([1, [2], [3, [[4]]]]))
  })
})

describe('union', function() {
  it('should create a uniq array including all value in array', function() {
    assert.deepEqual([1, 2, 4], _.union([1, 2], [4, 2], [2, 1]))
  })
})

describe('sample', function() {
  it('should return one random element from array', function() {
    var ret = _.sample([1, 2, 3, 4])
    assert(-1 != _.indexOf([1, 2, 3, 4], ret))

    var ret2 = _.sample([1, 2, 3, 4], 2)
    assert(_.isNumber(ret2))
  })
})

describe('sampleSize', function() {
  it('should return n random elements from array', function() {
    var arr1 = _.sampleSize([1, 2, 3, 4])
    assert(arr1.length === 1)
    assert(-1 != _.indexOf([1, 2, 3, 4], arr1[0]))

    var arr2 = _.sampleSize([1, 2, 3, 4], 2)
    assert(2 == arr2.length)
    assert(2 == _.difference([1, 2, 3, 4], arr2).length)

    assert(4 == _.sampleSize([1, 2, 3, 4], 1000).length)
  })
})

describe('shuffle', function() {
  it('return shuffle array', function() {
    var raw = [1, 2, 3, 4]
    var hash = {}
    for (var i = 0; i < 10; i++) {
      var ret = _.shuffle(raw)
      assert(ret.length == raw.length)
      hash[ret] = true
    }
    var len = _.keys(hash).length
    assert(len > 1)
  })
})

describe('compact', function() {
  it('can filter falsy value', function() {
    var ret = _.compact([0, 1, false, 2, '', 3])
    assert.deepEqual([1, 2, 3], ret)
  })
})

describe('rest', function() {
  it('should return all but first element', function() {
    var ret = _.rest([1, 2, 3])
    assert.deepEqual([2, 3], ret)
  })
})

describe('invoke', function() {
  it('should return invoke method value of each element', function() {
    var ret = _.invoke([[5, 1, 7], [3, 2, 1]], 'sort')
    assert.deepEqual([[1, 5, 7], [1, 2, 3]], ret)
  })
  it('should return invoke simple function', function() {
    var ret = _.invoke([1, 2, 3], function(x, y) {
      assert(2 == arguments.length)
      return this + x + y
    }, 2, 3)
    assert.deepEqual([6, 7, 8], ret)
  })
  it('should support function and args and ctx', function() {
    var ret = _.invoke([123, 456], String.prototype.split, '')
    assert.deepEqual([['1', '2', '3'], ['4', '5', '6']], ret)
  })
})

describe('groupBy', function() {
  it('should return a map group elements by ret value', function() {
    var ret = _.groupBy([4.2, 6.1, 6.4], function(n) {
      return Math.floor(n)
    })
    assert.deepEqual({'4': [4.2], '6': [6.1, 6.4]}, ret)
  })
})

describe('partition', function() {
  it('return an array with eleements group two groups', function() {
    var ret = _.partition([1, 2, 3], function(n) {
      return n % 2
    })
    assert.deepEqual(ret, [[1, 3], [2]])

    var ret = _.partition([1, 2, 3], function(n) {
      return n < 0
    })
    assert.deepEqual(ret, [[], [1, 2, 3]])
  })
})

describe('range', function() {
  it('return an array with numbers', function() {
    assert.deepEqual(_.range(4), [0, 1, 2, 3])
    assert.deepEqual(_.range(), [])
    assert.deepEqual(_.range(0), [])
    assert.deepEqual(_.range(1), [0])
    assert.deepEqual(_.range(1, 5), [1, 2, 3, 4])
    assert.deepEqual(_.range(0, -4, -1), [0, -1, -2, -3])
    assert.deepEqual(_.range(1, 4, 0), [1, 1, 1])
  })
})

describe('pullAt', function() {
  it('should act like `_.at` but mutate', function() {
    var arr = [5, 10, 15, 20]
    var evens = _.pullAt(arr, 1, 3)
    assert.deepEqual(arr, [5, 15])
    assert.deepEqual(evens, [10, 20])
  })

  it('support unordered indexes', function() {
    var arr = [5, 10, 15, 20]
    var evens = _.pullAt(arr, 3, 1)
    assert.deepEqual(arr, [5, 15])
    assert.deepEqual(evens, [10, 20])
  })
})

describe('remove', function() {
  it('should act like `_.filter` but mutate', function() {
    var arr = [1, 2, 3, 4]
    var evens = _.remove(arr, function(n) {
      return n % 2 == 0
    })
    assert.deepEqual(arr, [1, 3])
    assert.deepEqual(evens, [2, 4])
  })
})

describe('fill', function() {
  it('should fill array with start end', function() {
    var arr = [4, 6, 8, 10]
    var arr2 = _.fill(arr, '*', 1, 3)
    assert(arr === arr2, 'fill is inplace')
    assert.deepEqual(arr, [4, '*', '*', 10])

    assert.deepEqual(_.fill([1, 2, 3], 'a'), ['a', 'a', 'a'])
    assert.deepEqual(_.fill([0, 0, 0, 0, 0], 8, undefined, 4), [8, 8, 8, 8, 0])
    assert.deepEqual(_.fill([], 8), [])

    assert.deepEqual(_.fill([0, 0, 0, 0, 0], 8, -3, 100), [0, 0, 8, 8, 8], 'big end')
    assert.deepEqual(_.fill([0, 0, 0], 8, -100, 2), [8, 8, 0], 'big negative start')
    assert.deepEqual(_.fill([0, 0, 0], 8, -100, 2), [8, 8, 0], 'big negative start')
    assert.deepEqual(_.fill([0, 0, 0], 8, 2, 1), [0, 0, 0], 'nothing should happen')
  })
})
