var _ = require('./')
var assert = require('assert')

describe('extend', function() {
	it('should basic extend', function() {
		var a = {a: 1, b: 2}
		var ret = _.extend(a, {b: 3, c: undefined}, {d: 5})
		assert(ret === a)
		assert.deepEqual(ret, {a: 1, b: 3, d: 5})
	})
	it('always return first', function() {
		var arr = [0, null, {}, false]
		for (var i = 0; i < arr.length; i++) {
			assert.deepEqual(_.extend(arr[i]), arr[i])
		}
	})
})

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
})

describe('filter', function() {
	it('should filter unmatch', function() {
		assert.deepEqual(_.filter([1, 2, 3, 4, 5], function(x) {
			return x > 3
		}), [4, 5])
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
		assert.deepEqual(_.slice([1, 2, 3], -1, 100), [1, 2, 3])
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

describe('trim', function() {
	it('should ok', function() {
		assert(_.trim('  qq  ') == 'qq')
		assert(_.trim('   ') === '')
		assert(_.trim('') === '')
		assert(_.trim(true) === 'true')
		assert.equal(_.trim(NaN), 'NaN')
	})
	it('should return empty when meet null', function() {
		assert(_.trim() === '')
		assert(_.trim(null) === '')
	})
})

describe('flatten', function() {
	it('should flatten nested array', function() {
		assert.deepEqual([1, 2, 3, [[4]]], _.flatten([1, [2], [3, [[4]]]]))
	})
})

describe('bind', function() {
	it('should support args', function(done) {
		var fn = _.bind(function(a, b, c, d) {
			assert.deepEqual(this, {a: 1})
			assert.equal(a, 2)
			assert(b, 3)
			assert.equal(c, 4)
			assert.equal(d, undefined)
			done()
		}, {a: 1}, 2, 3)

		fn(4)
	})
})

describe('only', function() {
	it('should support string', function() {
		assert.deepEqual(_.only({
			  a: 1
			, b: 2
			, c: 3
			, d: 4
		}, 'a c     d'), {
			  a: 1
			, c: 3
			, d: 4
		})
	})
})
