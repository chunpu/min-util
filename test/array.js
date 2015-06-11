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
		assert(true === _.has('qwer', 'we'))
		assert(true === _.has([1, 2, 3], 2))
	})
	it('should return false', function() {
		assert(false === _.has('qwer', 'ew'))
		assert(false === _.has([1, 2, 3], 4))
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