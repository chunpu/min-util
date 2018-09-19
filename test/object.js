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

describe('mapKeys', function() {
  it('should return a new object map by raw', function() {
    var raw = {a: 1, b: 2}
    var ret = _.mapKeys(raw, function(val, key, obj) {
      assert(raw === obj)
      assert(val === obj[key])
      return key + val
    })
    assert(raw != ret)
    assert.deepEqual({
      a1: 1,
      b2: 2
    }, ret)
    /*
    assert.deepEqual({}, _.mapObject(null, function(val) {
      return val * 2
    }))
    */
  })

  it('should support any return, even undefined', function() {
    var raw = {a: null, b: undefined, c: false, d: 1024}
    var ret = _.mapKeys(raw, function(val, key) {
      return val
    })
    assert.deepEqual(ret, {
      'null': null,
      'undefined': undefined,
      'false': false,
      '1024': 1024
    })
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
    assert.equal(3, _.get(obj, 'a.0.b.c'))
    assert.equal(3, _.get(obj, 'a[0]b.c'))
    assert.equal(3, _.get(obj, 'a.0.["b"].[\'c\']'))
    assert.equal(undefined, _.get(obj, ['a', 0, 'b', 'c', 'x']))
    assert.equal(undefined, _.get(obj, ['x']))
    assert.equal(undefined, _.get(obj, null))
    assert.equal(undefined, _.get(null, [1, 2, 3]))
  })
})

describe('has', function() {
  it('is short for hasOwnProperty and support path', function() {
    assert(_.has({a: 1}, 'a'))
    var obj = {a: [{b: {c: 3}}]}
    assert(_.has(obj, 'a.0.b.c'))

    assert(!_.has({}, []))
    assert(!_.has(null, []))
    assert(!_.has(0, []))
    assert(!_.has(0, 'toString'))

    function A() {}
    A.prototype.foo = 'bar'
    assert(!_.has(new A, 'foo'))
  })
})

describe('set', function() {
  it('can set value to target by path', function() {
    var obj = {a: [{b: {c: 3}}]}
    assert(obj === _.set(obj, 'a.0.b.c', 4))
    assert(4 == obj.a[0].b.c)

    assert(null === _.set(null, 'a.b.c', 1))
    assert(undefined === _.set(undefined, 'a.b.c', 1))
    assert(123 === _.set(123, 'a.b.c', 1))
    var obj = {a: 1}
    assert(obj === _.set(obj, 'a.b.c', 3))
    assert(1 === obj.a)
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

describe('defaults', function() {
  it('should assign value to undefined target value', function() {
    var target = {
      foo: 'bar',
      foo1: undefined,
      foo2: null
    }
    var ret = _.defaults(target, {
      foo: 'bar2',
      foo1: 'foo1',
    }, {
      foo3: 'foo3',
      foo2: 'foo2'
    })

    assert(target === ret)
    assert.deepEqual(ret, {
      foo: 'bar',
      foo1: 'foo1',
      foo2: null,
      foo3: 'foo3'
    })
  })
})

describe('isMatch', function() {
  it('should return if target contains source', function() {
    assert(true === _.isMatch({a: 1}, {a: 1}))
    assert(true === _.isMatch({a: 1, b: 2}, {a: 1}))
    assert(true === _.isMatch())
    assert(true === _.isMatch(null))
    assert(true === _.isMatch(null, {}))
    assert(false === _.isMatch(null, {a: 1}))
    assert(false === _.isMatch({a: 1}, {a: 2}))
  })
})

describe('toPlainObject', function() {
  it('should return pure object', function() {
    function Ctor() {
      this.foo = 1
    }
    Ctor.prototype.bar = '2'
    var ret = _.toPlainObject(new Ctor)
    assert.deepEqual({foo: 1}, ret)
  })
})

describe('pick', function() {
  it('should act like filter for object', function() {
    var obj = {
      foo: 'bar',
      foo2: 2
    }
    var ret = _.pick(obj, _.isString)
    assert.deepEqual({foo: 'bar'}, ret)
  })
  it('should direct pick key', function() {
    var obj = {
      foo: 'bar',
      foo2: 2
    }
    var ret = _.pick(obj, 'foo')
    assert.deepEqual({foo: 'bar'}, ret)
  })
})

describe('invert', function() {
  it('should invert key and value', function() {
    var arr = [10, 20, 30]
    var expect = {10: '0', 20: '1', 30: '2'}
    assert.deepEqual(_.invert(arr), expect)
  })
})
