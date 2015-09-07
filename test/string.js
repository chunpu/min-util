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

describe('decapitalize', function() {
	it('should ok', function() {
		assert(_.decapitalize('Foo') == 'foo')
		assert(_.decapitalize('BAr') == 'bAr')
	})
	it('should work with shit', function() {
		assert(_.decapitalize() == '')
		assert(_.decapitalize('') == '')
		assert(_.decapitalize(NaN) == '')
		assert(_.decapitalize(0) == '0')
		assert(_.decapitalize(_.decapitalize).length > 10)
	})
})

describe('camelCase', function() {
	it('should ok', function() {
		var str = _.camelCase('__foo_bar__ foo2 bar2* ')
		assert.equal('fooBarFoo2Bar2', str)
		var str = _.camelCase(' Foo BAR')
		assert.equal('fooBAR', str)
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

describe('padLeft', function() {
	it('should pad left', function() {
		assert(_.padLeft('abc', 6) == '   abc')
		assert(_.padLeft('abc', 6, '') == '   abc')
		assert(_.padLeft('abc', 6, 0) == '000abc')
		assert(_.padLeft('abc', 6, '_-') == '_-_abc')
		assert(_.padLeft('abc', 3) == 'abc')
	})
})

describe('padRight', function() {
	it('should pad right', function() {
		assert(_.padRight('abc', 6) == 'abc   ')
		assert(_.padRight('abc', 6, '') == 'abc   ')
		assert(_.padRight('abc', 6, 0) == 'abc000')
		assert(_.padRight('abc', 6, '_-') == 'abc_-_')
		assert(_.padRight('abc', 3) == 'abc')
	})
})
