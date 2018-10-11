module.exports = function(_) {

var is = _.is

_.now = function() {
  return +new Date
}

_.constant = function(val) {
  return function() {
    return val
  }
}

_.identity = function(val) {
  return val
}

_.random = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

_.mixin = function(dst, src, opt) {
  var keys = _.functions(src)
  if (dst) {
    if (is.fn(dst)) {
      opt = opt || {}
      // add to prototype
      var proto = dst.prototype
      _.each(keys, function(key) {
        var fn = src[key]
        proto[key] = function() {
          var me = this
          var args = [me.__value]
          args.push.apply(args, arguments)
          var ret = fn.apply(me, args)
          if (me.__chain) {
            me.__value = ret
            return me
          }
          return ret
        }
      })
    } else {
      _.each(keys, function(key) {
        dst[key] = src[key]
      })
    }
  }
  return dst
}

_.chain = function(val) {
  var ret = _(val)
  ret.__chain = true
  return ret
}

_.value = function() {
  this.__chain = false
  return this.__value
}

var uniqueId = 0

_.uniqueId = function(prefix) {
  uniqueId++
  return _.toString(prefix) + uniqueId
}

}
