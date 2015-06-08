var is = require('min-is')

var _ = exports
_.is = is


// Iteration

var stopKey = 'stopOnFalse'

function each(arr, fn, custom) {
	if (!is.fn(fn)) fn = identity
	if (!is.arraylike(arr)) arr = []

	var len = arr.length
	var opt = extend({}, custom)

	if (custom) {
		var ints = ['from', 'end', 'step']
		for (var i = 0; i < ints.length; i++) {
			var val = +opt[ints[i]]
			if (!is.int(val)) val = undefined
			opt[ints[i]] = val
		}
	}

	var from = opt.from || 0
	var end = opt.end || len
	var step = opt.step || 1

	if (custom) {
		if (from < 0) from = 0
		if (end > len) end = len
		if (from + step * Infinity <= end) return arr // cannot finish
	}

	for (var i = from; i < end; i += step) {
		var ret
		if (opt.context) {
			ret = fn.call(opt.context, arr[i], i, arr)
		} else {
			ret = fn(arr[i], i, arr)
		}
		// default is stop on false
		if (false !== opt[stopKey] && false === ret) break
	}

	return arr
}

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

_.reject = function(arr, fn) {
	return _.filter(arr, function(val, i, arr) {
		return !fn(val, i, arr)
	})
}

_.some = function(arr, fn) {
	var ret = false
	each(arr, function(item, i, arr) {
		if (fn(item, i, arr)) {
			ret = true
			return false
		}
	})
	return ret
}

_.every = function(arr, fn) {
	var ret = true
	each(arr, function(item, i, arr) {
		if (!fn(item, i, arr)) {
			ret = false
			return false
		}
	})
	return ret
}

_.findIndex = function(arr, fn) {
	var ret = -1
	each(arr, function(item, i, arr) {
		if (fn(item, i, arr)) {
			ret = i
			return false
		}
	})
	return ret
}

_.find = function(arr, fn) {
	var index = _.findIndex(arr, fn)
	if (-1 != index) {
		return arr[index]
	}
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

function slice(arr, from, end) {
	var ret = []
	each(arr, function(item) {
		ret.push(item)
	}, {
		  from: from
		, end: end
	})
	return ret
}

_.slice = slice

function indexOf(val, sub) {
	if (is.str(val)) return val.indexOf(sub)
	var ret = -1
	each(val, function(item, i) {
		if (item == sub) {
			ret = i
			return false
		}
	})
	return ret
}

_.indexOf = indexOf

function has(val, sub) {
	return -1 != indexOf(val, sub)
}

_.has = has

_.uniq = function(arr) {
	var ret = []
	each(arr, function(item) {
		if (!has(ret, item)) ret.push(item)
	})
	return ret
}

function reduce(arr, fn, prev) {
	each(arr, function(item, i) {
		prev = fn(prev, item, i, arr)
	})
	return prev
}

_.reduce = reduce

_.only = function(obj, keys) {
	obj = obj || {}
	if (is.str(keys)) keys = keys.split(/ +/)
	return reduce(keys, function(ret, key) {
		if (null != obj[key]) ret[key] = obj[key]
		return ret
	}, {})
}


// Object

function extend(dst) {
	var len = arguments.length
	if (dst && len > 1) {
		for (var i = 1; i < len; i++) {
			var hash = arguments[i]
			if (hash) {
				for (var key in hash) {
					if (is.owns(hash, key)) {
						var val = hash[key]
						if (is.undef(val) || val === dst[key] || val === dst) continue
						dst[key] = val
					}
				}
			}
		}
	}
	return dst
}


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

_.values = function(hash) {
	return _.map(_.keys(hash), function(key) {
		return hash[key]
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

_.extend = extend


// Function

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


// String

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

_.trim = function(str) {
	if (null == str) return ''
	return ('' + str).replace(rtrim, '')
}

_.tostr = tostr

function tostr(str) {
	if (str || 0 == str) return str + ''
	return ''
}

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

_.inherits = function(ctor, superCtor) {
	ctor.super_ = superCtor
	ctor.prototype = _.create(superCtor.prototype, {
		constructor: ctor
	})
}


// Util

_.noop = function() {}

_.now = function() {
	return +new Date
}

_.constant = function(val) {
	return function() {
		return val
	}
}

function identity(val) {
	return val
}

_.identity = identity
