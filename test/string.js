var _ = require('../')
var assert = require('assert')

// String

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

describe('split', function() {
  it('should ok', function() {
    assert.deepEqual(_.split('a-b-c', '-'), ['a', 'b', 'c'])
    assert.deepEqual(_.split('a-b-c', '-', 2), ['a', 'b'])
    assert.deepEqual(_.split(null), ['']) // use to string
    assert.deepEqual(_.split('abc'), ['abc']) // use to string
  })
})

describe('capitalize', function() {
  it('should ok', function() {
    assert(_.capitalize('foo') == 'Foo')
    assert(_.capitalize('bAr') == 'Bar')
  })
  it('should work with shit', function() {
    assert(_.capitalize() == '')
    assert(_.capitalize('') == '')
    assert(_.capitalize(NaN) == '')
    assert(_.capitalize(0) == '0')
    assert(_.capitalize(_.capitalize).length > 10)
  })
})

describe('upperFirst', function() {
  it('should ok', function() {
    assert(_.upperFirst('foo') == 'Foo')
    assert(_.upperFirst('bAr') == 'BAr')
  })
  it('should work with shit', function() {
    assert(_.upperFirst() == '')
    assert(_.upperFirst('') == '')
    assert(_.upperFirst(NaN) == '')
    assert(_.upperFirst(0) == '0')
    assert(_.upperFirst(_.upperFirst).length > 10)
  })
})

describe('lowerFirst', function() {
  it('should ok', function() {
    assert(_.lowerFirst('Foo') == 'foo')
    assert(_.lowerFirst('BAr') == 'bAr')
  })
  it('should work with shit', function() {
    assert(_.lowerFirst() == '')
    assert(_.lowerFirst('') == '')
    assert(_.lowerFirst(NaN) == '')
    assert(_.lowerFirst(0) == '0')
    assert(_.lowerFirst(_.lowerFirst).length > 10)
  })
})

describe('camelCase', function() {
  it('should ok', function() {
    var str = _.camelCase('__foo_bar__ foo2 bar2* ')
    assert.equal('fooBarFoo2Bar2', str)
    var str = _.camelCase(' Foo BAR')
    assert.equal('fooBar', str)
  })
})

describe('startsWith', function() {
  it('should true', function() {
    assert(true === _.startsWith('1234', 12))
    assert(true === _.startsWith('1234', '12'))
    assert(true === _.startsWith('1234', ''))
    assert(true === _.startsWith('', ''))
    assert(true === _.startsWith('null1234', null))
  })
  it('should false', function() {
    assert(false === _.startsWith(null, null))
    assert(false === _.startsWith('', null))
    assert(false === _.startsWith('123', 13))
    assert(false === _.startsWith('123', '2'))
  })
})

describe('endsWith', function() {
  it('should true', function() {
    assert(true === _.endsWith('1234', 34))
    assert(true === _.endsWith('1234', '34'))
    assert(true === _.endsWith('1234', ''))
    assert(true === _.endsWith('', ''))
    assert(true === _.endsWith('1234null', null))
  })
  it('should false', function() {
    assert(false === _.endsWith(null, null))
    assert(false === _.endsWith('', null))
    assert(false === _.endsWith('123', 13))
    assert(false === _.endsWith('123', '2'))
  })
})

describe('upper', function() {
  it('should return uppercase', function() {
    assert('FOO' === _.upper('fOo'))
    assert('' === _.upper(null))
    assert('' === _.upper(undefined))
    assert('0' === _.upper(0))
  })
})

describe('lower', function() {
  it('should return uppercase', function() {
    assert('foo' === _.lower('fOo'))
    assert('' === _.lower(null))
    assert('' === _.lower(undefined))
    assert('0' === _.lower(0))
  })
})

describe('padStart', function() {
  it('should pad start', function() {
    assert(_.padStart('abc', 6) == '   abc')
    assert(_.padStart('abc', 6, '') == '   abc')
    assert(_.padStart('abc', 6, 0) == '000abc')
    assert(_.padStart('abc', 6, '_-') == '_-_abc')
    assert(_.padStart('abc', 3) == 'abc')
  })
})

describe('padEnd', function() {
  it('should pad end', function() {
    assert(_.padEnd('abc', 6) == 'abc   ')
    assert(_.padEnd('abc', 6, '') == 'abc   ')
    assert(_.padEnd('abc', 6, 0) == 'abc000')
    assert(_.padEnd('abc', 6, '_-') == 'abc_-_')
    assert(_.padEnd('abc', 3) == 'abc')
  })
})

describe('template', function() {
  it('should parse template', function() {
    var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% });  %>!');
    var ret = compiled({ 'users': ['fred', 'barney', '<script>'] })
    assert.deepEqual(ret, '<li>fred</li><li>barney</li><li>&ltscript&gt</li>!')
  })
  it('should auto trim', function() {
    var compiled = _.template('123<%=a%>567<%=  b %>9')
    assert.deepEqual(compiled({a: 4, b: 8}), '123456789')
  })
})
