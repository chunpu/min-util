module.exports = function(_) {

_.tostr = _.toString = tostr // lodash toString

var indexOf = _.indexOf

_.split = function(str, separator, limit) {
  str = tostr(str)
  return str.split(separator, limit)
}

_.capitalize = function(str) {
  str = tostr(str)
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
}

_.upperFirst = function(str) {
  str = tostr(str)
  return str.charAt(0).toUpperCase() + str.substr(1)
}

_.lowerFirst = function(str) {
  str = tostr(str)
  return str.charAt(0).toLowerCase() + str.substr(1)
}

_.camelCase = function(str) {
  str = tostr(str)
  var arr = str.split(/[^\w]|_+/)
  arr = _.map(arr, function(val) {
    return _.capitalize(val)
  })
  return _.lowerFirst(arr.join(''))
}

_.startsWith = function(str, val) {
  return 0 == indexOf(str, val)
}

_.endsWith = function(str, val) {
  val += '' // null => 'null'
  return val == _.slice(str, _.len(str) - _.len(val))
}

_.toLower = _.lower = function(str) {
  // lodash toLower
  return tostr(str).toLowerCase()
}

_.toUpper = _.upper = function(str) {
  // lodash toUpper
  return tostr(str).toUpperCase()
}

_.repeat = function(str, count) {
  return _.map(_.range(count), function() {
    return str
  }).join('')
}

_.padStart = function(str, len, chars) {
  str = tostr(str)
  len = len || 0
  var delta = len - str.length
  return getPadStr(chars, delta) + str
}

_.padEnd = function(str, len, chars) {
  str = tostr(str)
  len = len || 0
  var delta = len - str.length
  return str + getPadStr(chars, delta)
}


var htmlEscapes = {
  '&': '&amp',
  '<': '&lt',
  '>': '&gt',
  '"': '&quot',
  "'": '&#39'
}

_.escape = function(str) {
    return tostr(str).replace(/[&<>"']/g, function(item) {
        return htmlEscapes[item] || item
    })
}

// 不支持定制 templateSettings
_.template = function(str) {
  var arr = ['with(data) {var ret = ""']
  _.each(_.split(str, '<%'), function(x, i) {
    var two = x.split('%>')
    if (two[1]) {
      genJS(_.trim(two[0]))
      return filter(two[1])
    }
    filter(two[0])
  })

  arr.push('return ret}')
  var func = new Function('data', arr.join('\n'))
  var internalData = {
    _: _
  }
  var ret = function(data) {
    return func(_.extend({}, internalData, data))
  }
  return ret

  function genJS(jsstr) {
    var first = _.first(jsstr)
    if (first === '=' || first === '-') {
      var text = _.slice(jsstr, 1)
      if (first === '-') {
        text = '_.escape(' + text + ')'
      }
      arr.push('ret += ' + text) // 插入文本
    } else {
      arr.push(jsstr)
    }
  }

  function filter(html) {
    arr.push('ret += "' + html.replace(/('|"|\\)/g, '\\$1').replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '"')
  }
}

function getPadStr(chars, len) {
  chars = tostr(chars) || ' ' // '' will never end
  var count = Math.floor(len / chars.length) + 1
  return _.repeat(chars, count).slice(0, len)
}

function tostr(str) {
  if (str || 0 == str) return str + ''
  return ''
}

}
