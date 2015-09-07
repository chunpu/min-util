var _ = module.exports = require('./')

_.tostr = tostr

var indexOf = _.indexOf

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
	return tostr(str).toLowerCase()
}

_.upper = function(str) {
	return tostr(str).toUpperCase()
}

_.repeat = function(str, count) {
	return _.map(_.range(count), function() {
		return str
	}).join('')
}

_.padLeft = function(str, len, chars) {
	str = _.tostr(str)
	len = len || 0
	var delta = len - str.length
	return getPadStr(chars, delta) + str
}

_.padRight = function(str, len, chars) {
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
