var cou = require('cou')

module.exports = cou.extend(_, cou)

require('./lang')
require('./util')
require('./array')
require('./object')
require('./function')
require('./string')
require('./math')

_.mixin(_, _)

function _(val) {
	if (!(this instanceof _)) return new _(val)
	this.__value = val
	this.__chain = false
}
