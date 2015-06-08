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
