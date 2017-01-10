/*! min-util@2.2.0 by chunpu */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["_"] = factory();
	else
		root["_"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

	/* webpack only
	if (DEBUG && global.console) {
		console.debug('debug mode')
	}
	*/


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var cou = __webpack_require__(2)

	module.exports = cou.extend(_, cou)

	__webpack_require__(4)
	__webpack_require__(5)
	__webpack_require__(6)
	__webpack_require__(8)
	__webpack_require__(9)
	__webpack_require__(10)

	_.mixin(_, _)

	function _(val) {
		if (!(this instanceof _)) return new _(val)
		this.__value = val
		this.__chain = false
	}



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(3)

	var slice = [].slice

	var _ = exports

	_.is = is

	_.extend = _.assign = extend

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

	_.includes = function(val, sub) {
		return -1 != indexOf(val, sub)
	}

	_.toArray = toArray

	_.slice = function(arr, start, end) {
		// support array and string
		var ret = [] // default return array
		var len = getLength(arr)
		if (len >= 0) {
			start = start || 0
			end = end || len
			// raw array and string use self slice
			if (!is.fn(arr.slice)) {
				arr = toArray(arr)
			}
			ret = arr.slice(start, end)
		}
		return ret
	}

	_.negate = negate

	_.forIn = forIn

	_.keys = keys

	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

	_.trim = function(str) {
		if (null == str) return ''
		return ('' + str).replace(rtrim, '')
	}

	_.noop = function() {}

	_.len = getLength

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
		if (target) {
			var sources = slice.call(arguments, 1)
			each(sources, function(src) {
				forIn(src, function(val, key) {
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

	function forIn(hash, fn) {
		if (hash) {
			for (var key in hash) {
				if (is.owns(hash, key)) {
					if (false === fn(hash[key], key, hash)) break
				}
			}
		}
		return hash
	}

	function keys(hash) {
		var ret = []
		forIn(hash, function(val, key) {
			ret.push(key)
		})
		return ret
	}



/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var is = exports

	var obj = Object.prototype

	var navigator = global.navigator

	// reserved words in es3
	// instanceof null undefined arguments boolean false true function int

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

	is.mobile = (function() {
		if (is.browser && /mobile/i.test(navigator.userAgent)) {
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
		return val !== val
	}

	is.bool = function(val) {
		return 'boolean' == _class(val)
	}

	is.infinite = function(val) {
		return val == Infinity || val == -Infinity
	}

	is.num = is.number = function(num) {
		return !isNaN(num) && 'number' == _class(num)
	}

	// integer or decimal
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

	is.integer = function(val) {
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
			if (is.integer(len) && len >= 0) {
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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(1)

	var each = _.each
	var includes = _.includes
	var is = _.is
	var proto = Array.prototype

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
			if (!includes(other, val)) {
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

	_.size = function(arr) {
		var len = _.len(arr)
		if (null == len) {
			len = _.keys(arr).length
		}
		return len
	}

	_.first = function(arr) {
		if (arr) return arr[0]
	}

	_.last = function(arr) {
		var len = _.len(arr)
		if (len) {
			return arr[len - 1]
		}
	}

	_.asyncMap = function(arr, fn, cb) {
		// desperate
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
		return _.uniqBy(arr)
	}

	_.uniqBy = function(arr, fn) {
		var ret = []
		var pool = []
		if (!is.fn(fn)) {
			fn = null
		}
		each(arr, function(item) {
			var val = item
			if (fn) {
				val = fn(item)
			}
			if (!includes(pool, val)) {
				pool.push(val)
				ret.push(item)
			}
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

	_.compact = function(arr) {
		return _.filter(arr, _.identity)
	}

	_.rest = function(arr) {
		return _.slice(arr, 1)
	}

	_.invoke = function() {
		var args = arguments
		var arr = args[0]
		var fn = args[1]
		var isFunc = is.fn(fn)
		args = _.slice(args, 2)

		return _.map(arr, function(item) {
			if (isFunc) {
				return fn.apply(item, args)
			}
			if (null != item) {
				var method = item[fn]
				if (is.fn(method)) {
					return method.apply(item, args)
				}
			}
		})
	}

	_.partition = function(arr, fn) {
		var hash = _.groupBy(arr, function(val, i, arr) {
			var ret = fn(val, i, arr)
			if (ret) return 1
			return 2
		})
		return [hash[1] || [], hash[2] || []]
	}

	_.groupBy = function(arr, fn) {
		var hash = {}
		_.each(arr, function(val, i, arr) {
			var ret = fn(val, i, arr)
			hash[ret] = hash[ret] || []
			hash[ret].push(val)
		})
		return hash
	}

	_.range = function() {
		var args = arguments
		if (args.length < 2) {
			return _.range(args[1], args[0])
		}
		var start = args[0] || 0
		var last = args[1] || 0
		var step = args[2]
		if (!is.num(step)) {
			step = 1
		}
		var count = last - start
		if (0 != step) {
			count = count / step
		}
		var ret = []
		var val = start
		for (var i = 0; i < count; i++) {
			ret.push(val)
			val += step
		}
		return ret
	}

	_.pullAt = function(arr) {
		// `_.at` but mutate
		var indexes = _.slice(arguments, 1)
		return mutateDifference(arr, indexes)
	}

	function mutateDifference(arr, indexes) {
		var ret = []
		var len = _.len(indexes)
		if (len) {
			indexes = indexes.sort(function(a, b) {
				return a - b
			})
			while (len--) {
				var index = indexes[len]
				ret.push(proto.splice.call(arr, index, 1)[0])
			}
		}
		ret.reverse()
		return ret
	}

	_.remove = function(arr, fn) {
		// `_.filter` but mutate
		var len = _.len(arr) || 0
		var indexes = []
		while (len--) {
			if (fn(arr[len], len, arr)) {
				indexes.push(len)
			}
		}
		return mutateDifference(arr, indexes)
	}

	_.fill = function(val, start, end) {
		// TODO
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(1)

	var is = _.is
	var each = _.each
	var forIn = _.forIn

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

	_.pick = function(obj, fn) {
		if (!is.fn(fn)) {
			return _.pick(obj, function(val, key) {
				return key == fn
			})
		}
		var ret = {}
		forIn(obj, function(val, key, obj) {
			if (fn(val, key, obj)) {
				ret[key] = val
			}
		})
		return ret
	}

	_.functions = function(obj) {
		return _.keys(_.pick(obj, function(val) {
			return is.fn(val)
		}))
	}

	_.mapKeys = function(obj, fn) {
		var ret = {}
		forIn(obj, function(val, key, obj) {
			var newKey = fn(val, key, obj)
			ret[newKey] = val
		})
		return ret
	}

	_.mapObject = _.mapValues = function(obj, fn) {
		var ret = {}
		forIn(obj, function(val, key, obj) {
			ret[key] = fn(val, key, obj)
		})
		return ret
	}

	// return value when walk through path, otherwise return empty
	_.get = function(obj, path) {
		path = toPath(path)
		if (path.length) {
			var flag = _.every(path, function(key) {
				if (null != obj) { // obj can be indexed
					obj = obj[key]
					return true
				}
			})
			if (flag) return obj
		}
	}

	_.has = function(obj, path) {
		path = toPath(path)
		if (path.length) {
			var flag = _.every(path, function(key) {
				if (null != obj && is.owns(obj, key)) {
					obj = obj[key]
					return true
				}
			})
			if (flag) return true
		}
		return false
	}

	_.set = function(obj, path, val) {
		path = toPath(path)
		var cur = obj
		_.every(path, function(key, i) {
			if (is.oof(cur)) {
				if (i + 1 == path.length) {
					cur[key] = val
				} else {
					var item = cur[key]
					if (null == item) {
						// fill value with {} or []
						var item = {}
						if (~~key == key) {
							item = []
						}
					}
					cur = cur[key] = item
					return true
				}
			}
		})
		return obj
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

	_.defaults = function() {
		var args = arguments
		var target = args[0]
		var sources = _.slice(args, 1)
		if (target) {
			_.each(sources, function(src) {
				_.mapObject(src, function(val, key) {
					if (is.undef(target[key])) {
						target[key] = val
					}
				})
			})
		}
		return target
	}

	_.isMatch = function(obj, src) {
		var ret = true
		obj = obj || {}
		forIn(src, function(val, key) {
			if (val !== obj[key]) {
				ret = false
				return false
			}
		})
		return ret
	}

	_.toPlainObject = function(val) {
		var ret = {}
		forIn(val, function(val, key) {
			ret[key] = val
		})
		return ret
	}

	_.invert = function(obj) {
		var ret = {}
		forIn(obj, function(val, key) {
			ret[val] = key
		})
		return ret
	}

	// topath, copy from lodash

	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g
	var reEscapeChar = /\\(\\)?/g;

	function toPath(val) {
		if (is.array(val)) return val
		var ret = []
		_.tostr(val).replace(rePropName, function(match, number, quote, string) {
			var item = number || match
			if (quote) {
				item = string.replace(reEscapeChar, '$1')
			}
			ret.push(item)
		})
		return ret
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(1)

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

	memoize.Cache = __webpack_require__(7)

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var is = _.is

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(1)
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(1)

	_.tostr = tostr // lodash toString

	var indexOf = _.indexOf

	_.split = function(str, separator, limit) {
		str = tostr(str)
		return str.split(separator, limit)
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

	_.startsWith = function(str, val) {
		return 0 == indexOf(str, val)
	}

	_.endsWith = function(str, val) {
		val += '' // null => 'null'
		return val == _.slice(str, _.len(str) - _.len(val))
	}

	_.lower = function(str) {
		// lodash toLower
		return tostr(str).toLowerCase()
	}

	_.upper = function(str) {
		// lodash toUpper
		return tostr(str).toUpperCase()
	}

	_.repeat = function(str, count) {
		return _.map(_.range(count), function() {
			return str
		}).join('')
	}

	_.padStart = function(str, len, chars) {
		str = _.tostr(str)
		len = len || 0
		var delta = len - str.length
		return getPadStr(chars, delta) + str
	}

	_.padEnd = function(str, len, chars) {
		str = _.tostr(str)
		len = len || 0
		var delta = len - str.length
		return str + getPadStr(chars, delta)
	}

	function getPadStr(chars, len) {
		chars = _.tostr(chars) || ' ' // '' will never end
		var count = Math.floor(len / chars.length) + 1
		return _.repeat(chars, count).slice(0, len)
	}

	function tostr(str) {
		if (str || 0 == str) return str + ''
		return ''
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(1)

	_.sum = function(arr) {
		return _.reduce(arr, function(sum, val) {
			return sum + val
		}, 0)
	}

	_.max = function(arr, fn) {
		var index = -1
		var data = -Infinity
		fn = fn || _.identity
		_.each(arr, function(val, i) {
			val = fn(val)
			if (val > data) {
				data = val
				index = i
			}
		})
		if (index > -1) {
			return arr[index]
		}
		return data
	}

	_.min = function(arr, fn) {
		var index = -1
		var data = Infinity
		fn = fn || _.identity
		_.each(arr, function(val, i) {
			val = fn(val)
			if (val < data) {
				data = val
				index = i
			}
		})
		if (index > -1) {
			return arr[index]
		}
		return data
	}


/***/ }
/******/ ])
});
;