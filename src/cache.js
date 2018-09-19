var cou = require('cou')
var is = cou.is

module.exports = Cache

function Cache() {
  this.data = {}
}

var proto = Cache.prototype

proto.has = function(key) {
  return is.owns(this.data, key)
}

proto.get = function(key) {
  return this.data[key]
}

proto.set = function(key, val) {
  this.data[key] = val
}

proto['delete'] = function(key) {
  delete this.data[key]
}
