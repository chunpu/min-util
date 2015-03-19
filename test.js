var _ = require('./')
var assert = require('assert')

describe('basic', function() {
	it('noop should do nothing', function() {
		assert(undefined === _.noop())
	})

	it('now should return a date in ms', function() {
		assert(_.now() > 1000)
	})
})

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
	it('should work on this', function() {
		var obj = {
			add: function(val) {
				_.extend(this, val)
			}
		}
		obj.add({foo: true})
		assert(true == obj.foo)
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
	it('cannot crash when fn is shit', function() {
		_.each([1, 2, 3])
		assert(true)
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

describe('capitalize', function() {
	it('should ok', function() {
		assert(_.capitalize('foo') == 'Foo')
		assert(_.capitalize('bAr') == 'BAr')
	})
	it('should work with shit', function() {
		assert(_.capitalize() == '')
		assert(_.capitalize('') == '')
		assert(_.capitalize(NaN) == '')
		assert(_.capitalize(0) == '0')
		assert(_.capitalize(_.capitalize).length > 10)
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

	it('work like jQuery', function() {
		var obj = {
			sum: function(x) {
				return this.val + x
			},
			val: 10
		}
		var fn = _.bind(obj, 'sum', 5)
		assert(fn() == 15)
	})
})

describe('keys', function() {
	it('should return key in hash, and hash owns key', function() {
		function Ctor() {}
		Ctor.prototype.foo = 'bar'
		var hash = new Ctor
		hash.key = 'val'
		assert.deepEqual(_.keys(hash), ['key'])
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

describe('inherits', function() {
	it('should be instance', function() {
		function SonCtor() {}
		function ParentCtor() {}
		_.inherits(SonCtor, ParentCtor)
		var instance = new SonCtor
		assert(instance instanceof SonCtor)
		assert(instance instanceof ParentCtor)
	})
})
