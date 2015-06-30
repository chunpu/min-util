var _ = require('../')
var assert = require('assert')

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

	it('work like jQuery proxy', function() {
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

describe('before', function() {
	it('should return function which can be called less than n', function() {
		var sum = 0
		var fn = _.before(4, function() {
			sum += 1
		})
		for (var i = 0; i < 100; i++) {
			fn()
		}
		assert(3 == sum)
	})
})

describe('once', function() {
	it('should return function which can be called only once', function() {
		var sum = 0
		var fn = _.once(function() {
			sum += 1
		})
		for (var i = 0; i < 100; i++) {
			fn()
		}
		assert(1 == sum)
	})
})

describe('after', function() {
	it('should return function which can be called after exec n times', function() {
		var sum = 0
		var fn = _.after(3, function() {
			sum += 1
		})
		fn()
		assert(0 == sum)
		fn()
		assert(0 == sum)
		fn()
		assert(1 == sum)
		fn()
		assert(2 == sum)
	})
})


