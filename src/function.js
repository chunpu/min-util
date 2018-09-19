module.exports = function(_) {

var is = _.is
var slice = _.slice

_.bind = function(fn, ctx) {
  if (is.string(ctx)) {
    var obj = fn
    fn = obj[ctx]
    ctx = obj
  }
  if (!is.fn(fn)) return fn
  var args = slice(arguments, 2)
  ctx = ctx || this
  return function() {
    return fn.apply(ctx, _.flatten([args, arguments]))
  }
}

// from lang.js `Function.prototype.inherits`
// so belong to function
_.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor
  ctor.prototype = _.create(superCtor.prototype, {
    constructor: ctor
  })
}

_.delay = function(fn, wait) {
  var args = _.slice(arguments, 2)
  return setTimeout(function() {
    fn.apply(this, args)
  }, wait)
}

_.before = function(n, fn) {
  return function() {
    if (n > 1) {
      n--
      return fn.apply(this, arguments)
    }
  }
}

_.once = function(fn) {
  return _.before(2, fn)
}

_.after = function(n, fn) {
  return function() {
    if (n > 1) {
      n--
    } else {
      return fn.apply(this, arguments)
    }
  }
}

_.throttle = function(fn, wait, opt) {
  wait = wait || 0
  opt = _.extend({
    leading: true,
    trailing: true,
    maxWait: wait
  }, opt)
  return _.debounce(fn, wait, opt)
}

_.debounce = function(fn, wait, opt) {
  wait = wait || 0
  opt = _.extend({
    leading: false,
    trailing: true
  }, opt)
  var maxWait = opt.maxWait
  var lastExec = 0 // wait
  var lastCall = 0 // just for maxWait
  var now = _.now()
  var timer

  if (!opt.leading) {
    lastExec = now
  }

  function ifIsCD() {
    if (now - lastExec > wait) return false
    if (maxWait && now - lastCall > maxWait) return false
    return true
  }

  function exec(fn, ctx, args) {
    lastExec = _.now() // update last exec
    return fn.apply(ctx, args)
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function debounced() {
    now = _.now() // update now
    var isCD = ifIsCD()
    lastCall = now // update last call
    var me = this
    var args = arguments

    cancel()

    if (!isCD) {
      exec(fn, me, args)
    } else {
      if (opt.trailing) {
        timer = _.delay(function() {
          exec(fn, me, args)
        }, wait)
      }
    }
  }

  debounced.cancel = cancel

  return debounced
}

function memoize(fn) {
  var cache = new memoize.Cache
  function memoized() {
    var args = arguments
    var key = args[0]
    if (!cache.has(key)) {
      var ret = fn.apply(this, args)
      cache.set(key, ret)
    }
    return cache.get(key)
  }
  memoized.cache = cache
  return memoized
}

memoize.Cache = require('./cache')

_.memoize = memoize

_.wrap = function(val, fn) {
  return function() {
    var args = [val]
    args.push.apply(args, arguments)
    return fn.apply(this, args)
  }
}

_.curry = function(fn) {
  var len = fn.length
  return setter([])

  function setter(args) {
    return function() {
      var arr = args.concat(_.slice(arguments))
      if (arr.length >= len) {
        arr.length = len
        return fn.apply(this, arr)
      }
      return setter(arr)
    }
  }
}

}
