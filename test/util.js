var _ = require('../')
var assert = require('assert')

// Util
describe('basic', function() {
	it('noop should do nothing', function() {
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
