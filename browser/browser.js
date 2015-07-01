(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g._ = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var is = require('min-is')

var slice = [].slice

var _ = exports

_.is = is

_.extend = extend

_.each = each

_.map = function(arr, fn) {
	var ret = []
	each(arr, function(item, i, arr) {
		ret[i] = fn(item, i, arr)
	})
	return ret
}

_.filter = function(arr, fn) {
	var ret = []
	each(arr, function(item, i, arr) {
		var val = fn(item, i, arr)
		if (val) ret.push(item)
	})
	return ret
}

_.some = function(arr, fn) {
	return -1 != findIndex(arr, fn)
}

_.every = function(arr, fn) {
	return -1 == findIndex(arr, negate(fn))
}

_.reduce = reduce

_.findIndex = findIndex

_.find = function(arr, fn) {
	var index = _.findIndex(arr, fn)
	if (-1 != index) {
		return arr[index]
	}
}

_.indexOf = indexOf

_.has = function(val, sub) {
	return -1 != indexOf(val, sub)
}

_.toArray = toArray

_.slice = function(arr, start, end) {
	var ret = []
	var len = getLength(arr)
	if (len) {
		start = start || 0
		end = end || len
		if (!(arr instanceof Object)) {
			// IE8- dom object
			arr = toArray(arr)
		}
		ret = slice.call(arr, start, end)
	}
	return ret
}

_.negate = negate

_.keys = function(hash) {
	var ret = []
	if (hash) {
		for (var key in hash) {
			if (is.owns(hash, key)) {
				ret.push(key)
			}
		}
	}
	return ret
}

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

_.trim = function(str) {
	if (null == str) return ''
	return ('' + str).replace(rtrim, '')
}

_.noop = function() {}

function getLength(arr) {
	if (null != arr) return arr.length
}

function each(arr, fn) {
	var len = getLength(arr)
	if (len && is.fn(fn)) {
		for (var i = 0; i < len; i++) {
			if (false === fn(arr[i], i, arr)) break
		}
	}
	return arr
}

function findIndex(arr, fn) {
	var ret = -1
	each(arr, function(item, i, arr) {
		if (fn(item, i, arr)) {
			ret = i
			return false
		}
	})
	return ret
}

function toArray(arr) {
	var ret = []
	each(arr, function(item) {
		ret.push(item)
	})
	return ret
}


function extend(target) {
	var sources = slice.call(arguments, 1)
	if (target) {
		each(sources, function(src) {
			each(_.keys(src), function(key) {
				var val = src[key]
				if (!is.undef(val)) {
					target[key] = val
				}
			})
		})
	}
	return target
}

function negate(fn) {
	return function() {
		return !fn.apply(this, arguments)
	}
}

function indexOf(val, sub) {
	if (is.str(val)) return val.indexOf(sub)

	return findIndex(val, function(item) {
		// important!
		return sub === item
	})
}

function reduce(arr, fn, prev) {
	each(arr, function(item, i) {
		prev = fn(prev, item, i, arr)
	})
	return prev
}


},{"min-is":2}],2:[function(require,module,exports){
(function (global){
var is = exports

var obj = Object.prototype

is.browser = (function() {
	return global.window == global
})()

// simple modern browser detect
is.h5 = (function() {
	if (is.browser && navigator.geolocation) {
		return true
	}
	return false
})()

function _class(val) {
	var name = obj.toString.call(val)
	// [object Class]
	return name.substring(8, name.length - 1).toLowerCase()
}

function _type(val) {
	// undefined object boolean number string symbol function
	return typeof val
}

function owns(owner, key) {
	return obj.hasOwnProperty.call(owner, key)
}

is._class = _class

is._type = _type

is.owns = owns

// not a number
is.nan = function(val) {
	return !is.num(val)
}

is.infinite = function(val) {
	return val == Infinity || val == -Infinity
}

is.num = is.number = function(num) {
	return !isNaN(num) && 'number' == _class(num)
}

// int or decimal
is.iod = function(val) {
	if (is.num(val) && !is.infinite(val)) {
		return true
	}
	return false
}

is.decimal = function(val) {
	if (is.iod(val)) {
		return 0 != val % 1
	}
	return false
}

is.int = function(val) {
	if (is.iod(val)) {
		return 0 == val % 1
	}
	return false
}

// object or function
is.oof = function(val) {
	if (val) {
		var tp = _type(val)
		return 'object' == tp || 'function' == tp
	}
	return false
}

// regexp should return object
is.obj = is.object = function(obj) {
	return is.oof(obj) && 'function' != _class(obj)
}

is.hash = is.plainObject = function(hash) {
	if (hash) {
		if ('object' == _class(hash)) {
			// old window is object
			if (hash.nodeType || hash.setInterval) {
				return false
			}
			return true
		}
	}
	return false
}

is.undef = function(val) {
	return 'undefined' == _type(val)
}

// host function should return function, e.g. alert
is.fn = function(fn) {
	return 'function' == _class(fn)
}

is.str = is.string = function(str) {
	return 'string' == _class(str)
}

// number or string
is.nos = function(val) {
	return is.iod(val) || is.str(val)
}

is.array = function(arr) {
	return 'array' == _class(arr)
}

is.arraylike = function(arr) {
	// window has length for iframe too, but it is not arraylike
	if (!is.window(arr) && is.obj(arr)) {
		var len = arr.length
		if (is.int(len) && len >= 0) {
			return true
		}
	}
	return false
}

is.window = function(val) {
	if (val && val.window == val) {
		return true
	}
	return false
}

is.empty = function(val) {
	if (is.str(val) || is.arraylike(val)) {
		return 0 === val.length
	}
	if (is.hash(val)) {
		for (var key in val) {
			if (owns(val, key)) {
				return false
			}
		}
	}
	return true
}

is.element = function(elem) {
	if (elem && 1 === elem.nodeType) {
		return true
	}
	return false
}

is.regexp = function(val) {
	return 'regexp' == _class(val)
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var _ = module.exports = require('./')

var each = _.each
var has = _.has
var is = _.is

_.reject = function(arr, fn) {
	return _.filter(arr, function(val, i, arr) {
		return !fn(val, i, arr)
	})
}

_.without = function(arr) {
	var other = _.slice(arguments, 1)
	return _.difference(arr, other)
}

_.difference = function(arr, other) {
	var ret = []
	_.each(arr, function(val) {
		if (!_.has(other, val)) {
			ret.push(val)
		}
	})
	return ret
}

_.pluck = function(arr, key) {
	return _.map(arr, function(item) {
		if (item) return item[key]
	})
}

_.asyncMap = function(arr, fn, cb) {
	var ret = []
	var count = 0
	var hasDone, hasStart

	each(arr, function(arg, i) {
		hasStart = true
		fn(arg, function(err, val) {
			if (hasDone) return
			count++
			if (err) {
				hasDone = true
				return cb(err)
			}
			ret[i] = val
			if (count == arr.length) {
				hasDone = true
				cb(null, ret)
			}
		})
	})

	if (!hasStart) cb(null) // empty
}

_.uniq = function(arr) {
	var ret = []
	each(arr, function(item) {
		if (!has(ret, item)) ret.push(item)
	})
	return ret
}

_.flatten = function(arrs) {
	var ret = []
	each(arrs, function(arr) {
		if (is.arraylike(arr)) {
			each(arr, function(item) {
				ret.push(item)
			})
		} else ret.push(arr)
	})
	return ret
}

_.union = function() {
	return _.uniq(_.flatten(arguments))
}

_.sample = function(arr, n) {
	var ret = _.toArray(arr)
	var len = ret.length
	var need = Math.min(n || 1, len)
	for (var i = 0; i < len; i++) {
		var rand = _.random(i, len - 1)
		var tmp = ret[rand]
		ret[rand] = ret[i]
		ret[i] = tmp
	}
	ret.length = need
	if (null == n) {
		return ret[0]
	}
	return ret
}

_.shuffle = function(arr) {
	return _.sample(arr, Infinity)
}

},{"./":5}],4:[function(require,module,exports){
var _ = module.exports = require('./')

var is = _.is
var slice = _.slice

_.bind = function(fn, ctx) {
	if (is.str(ctx)) {
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

},{"./":5}],5:[function(require,module,exports){
var cou = require('cou')

module.exports = cou.extend(_, cou)

require('./array')
require('./object')
require('./function')
require('./util')
require('./string')

_.mixin(_, _)

function _(val) {
	if (!(this instanceof _)) return new _(val)
	this.__value = val
	this.__chain = false
}


},{"./array":3,"./function":4,"./object":6,"./string":7,"./util":8,"cou":1}],6:[function(require,module,exports){
var _ = module.exports = require('./')

var is = _.is
var each = _.each

_.only = function(obj, keys) {
	obj = obj || {}
	if (is.str(keys)) keys = keys.split(/ +/)
	return _.reduce(keys, function(ret, key) {
		if (null != obj[key]) ret[key] = obj[key]
		return ret
	}, {})
}

_.values = function(obj) {
	return _.map(_.keys(obj), function(key) {
		return obj[key]
	})
}

_.functions = function(obj) {
	return _.filter(_.keys(obj), function(key) {
		return is.fn(obj[key])
	})
}

_.mapObject = function(obj, fn) {
	var ret = {}
	each(_.keys(obj), function(key) {
		ret[key] = fn(obj[key], key, obj)
	})
	return ret
}

_.get = function(obj, arr) {
	var hasStart = false
	var flag = _.every(arr, function(key) {
		hasStart = true
		if (null != obj && key in Object(obj)) {
			obj = obj[key]
			return true
		}
	})
	if (hasStart && flag) return obj
}

_.create = (function() {
	function Object() {} // so it seems like Object.create
	return function(proto, property) {
		// not same as Object.create, Object.create(proto, propertyDescription)
		if ('object' != typeof proto) {
			// null is ok
			proto = null
		}
		Object.prototype = proto
		return _.extend(new Object, property)
	}
})()


},{"./":5}],7:[function(require,module,exports){
var _ = module.exports = require('./')

_.tostr = tostr

_.capitalize = function(str) {
	str = tostr(str)
	return str.charAt(0).toUpperCase() + str.substr(1)
}

_.decapitalize = function(str) {
	str = tostr(str)
	return str.charAt(0).toLowerCase() + str.substr(1)
}

_.camelCase = function(str) {
	str = tostr(str)
	var arr = str.split(/[^\w]|_+/)
	arr = _.map(arr, function(val) {
		return _.capitalize(val)
	})
	return _.decapitalize(arr.join(''))
}

function tostr(str) {
	if (str || 0 == str) return str + ''
	return ''
}

},{"./":5}],8:[function(require,module,exports){
var _ = module.exports = require('./')
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
			var isChain = !!opt.chain
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

},{"./":5}],9:[function(require,module,exports){
module.exports = require('./src')

},{"./src":5}]},{},[9])(9)
});