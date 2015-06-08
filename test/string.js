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
