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

