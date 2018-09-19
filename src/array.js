module.exports = function(_) {

var each = _.forEach = _.each
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

_.nth = function(arr, n) {
  n = getRealIndex(n, arr)
  n = n || 0
  var ret
  if (_.isString(arr)) {
    ret = arr.charAt(n)
  } else {
    ret = arr[n]
  }
  return ret
}

_.first = function(arr) {
  if (arr) return _.nth(arr, 0)
}

_.last = function(arr) {
  var len = _.len(arr)
  if (len) {
    return _.nth(arr, len - 1)
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

_.sampleSize = function(arr, n) {
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
  return ret
}

_.sample = function(arr) {
  return _.first(_.sampleSize(arr, 1))
}

_.shuffle = function(arr) {
  return _.sampleSize(arr, Infinity)
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
  if (!is.number(step)) {
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

_.fill = function(arr, val, start, end) {
  var size = _.size(arr)
  start = getRealIndex(start, arr) || 0
  end = getRealIndex(end, arr) || size
  for (var i = start; i < end; i++) {
    arr[i] = val
  }
  return arr
}

_.size = function(val) {
  // size is safe length
  var size = 0
  if (val) {
    var len = val.length
    if (_.isInteger(len) && len >= 0) {
      size = len
    } else if (_.isObject(val)) {
      size = _.keys(val).length
    }
  }
  return size
}

// support negative
function getRealIndex(index, arr) {
  var size = _.size(arr)
  if (index < 0) {
    index += size
  }
  if (index < 0) {
    index = 0 // smallest is zero
  }
  if (index > size) {
    index = size // biggest is size, because [start, end)
  }
  return index || 0 // default zero
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

}
