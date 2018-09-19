module.exports = function(_) {

var is = _.is
var forIn = _.forIn

_.only = function(obj, keys) {
  obj = obj || {}
  if (is.string(keys)) keys = keys.split(/ +/)
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
  _.toString(val).replace(rePropName, function(match, number, quote, string) {
    var item = number || match
    if (quote) {
      item = string.replace(reEscapeChar, '$1')
    }
    ret.push(item)
  })
  return ret
}

}
