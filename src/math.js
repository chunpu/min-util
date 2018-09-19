module.exports = function(_) {

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

}
