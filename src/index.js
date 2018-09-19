var cou = require('cou')

module.exports = cou.extend(_, cou)

require('./lang')(_)
require('./util')(_)
require('./array')(_)
require('./object')(_)
require('./function')(_)
require('./string')(_)
require('./math')(_)

_.mixin(_, _)

function _(val) {
  if (!(this instanceof _)) return new _(val)
  this.__value = val
  this.__chain = false
}
