var _ = require('../')
var assert = require('assert')

// Object

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
	it('not crash when get shit', function() {
		var ret = _.extend(null, {foo: true})
		assert.deepEqual(ret, null)
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

describe('mapObject', function() {
	it('should return a new object map by raw', function() {
		var raw = {a: 1, b: 2}
		var ret = _.mapObject(raw, function(val, key, obj) {
			assert(raw === obj)
			assert(val === obj[key])
			return val * 2
		})
		assert.deepEqual({
			a: 2,
			b: 4
		}, ret)

		assert.deepEqual({}, _.mapObject(null, function(val) {
			return val * 2
		}))
	})
})

describe('get', function() {
	it('should get value at path array', function() {
		var obj = {a: [{b: {c: 3}}]}
		assert.equal(3, _.get(obj, ['a', 0, 'b', 'c']))
		assert.equal(undefined, _.get(obj, ['a', 0, 'b', 'c', 'x']))
		assert.equal(undefined, _.get(obj, ['x']))
		assert.equal(undefined, _.get(obj, null))
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

describe('create', function() {
	it('not crash when meet null', function() {
		var ret = _.create(null)
		assert.deepEqual([], _.keys(ret))
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

describe('values', function() {
	it('should return value in hash', function() {
		assert.deepEqual([1, 2], _.values({
			a: 1,
			b: 2
		}))
	})
})

describe('functions', function() {
	it('should return all keys map to function', function() {
		var obj = {
			a: 1,
			b: _.noop,
			c: _.noop
		}
		assert.deepEqual(['b', 'c'], _.functions(obj))
	})
})
