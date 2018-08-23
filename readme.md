min-util
===

[![Build status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/min-util.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-util
[downloads-image]: http://img.shields.io/npm/dm/min-util.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-util
[david-image]: http://img.shields.io/david/chunpu/min-util.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/min-util


Mini Javascript Util Lib

Installation
---

```sh
npm i min-util
```

Usage
---

```js
var _ = require(&#39;min-util&#39;)
```

Inspired by [lodash](https://github.com/lodash/lodash) and [underscore](https://github.com/jashkenas/underscore)


Try
---

Try in [console](http://chunpu.github.io/min-util/docs), exports as `_`

Check [Unit Tests](http://chunpu.github.io/min-util/test/public)


#### Type Check

`_.is` equals [min-is](https://github.com/chunpu/min-is)

```js
assert(_.is.arraylike({0: &#39;foo&#39;, length: 1}))
```

#### Array like

- `_.each` -&gt; `forEach`
- `_.map`
- `_.filter`
- `_.some`
- `_.every`
- `_.reduce`
- `_.reject`
- `_.invoke`
- `_.findIndex`
- `_.find`
- `_.slice`
- `_.indexOf`
- `_.includes`
- `_.uniq`
- `_.uniqBy`
- `_.flatten`
- `_.union`
- `_.sample`
- `_.shuffle`
- `_.difference`
- `_.without`
- `_.asyncMap` just like `async.map`, deprecated
- `_.rest`
- `_.compact`
- `_.size` safe length for every thing
- `_.first`
- `_.last`
- `_.groupBy`
- `_.partition`
- `_.range`
- `_.pullAt`
- `_.remove`
- `_.fill`
- `_.nth`


#### Object

- `_.keys`
- `_.forIn`
- `_.extend`
- `_.defaults`
- `_.values`
- `_.pick`
- `_.functions`
- `_.only`
- `_.mapKeys`
- `_.mapObject`
- `_.create`
- `_.has`
- `_.get`
- `_.set`
- `_.pick`
- `_.isMatch`
- `_.toPlainObject`
- `_.size`
- `_.invert`


#### Function

- `_.bind`
- `_.once`
- `_.memoize`
- `_.throttle`
- `_.debounce`
- `_.flow` TODO
- `_.flowRight` `_.compose` TODO
- `_.delay`
- `_.defer` TODO
- `_.after`
- `_.before`
- `_.spread` TODO
- `_.ary` TODO
- `_.curry` TODO
- `_.curryRight` TODO
- `_.wrap`
- `_.negate`


#### String

- `_.trim`
- `_.split`
- `_.indexOf`
- `_.slice`
- `_.toString`
- `_.camelCase`
- `_.capitalize`
- `_.decapitalize`
- `_.includes`
- `_.size`
- `_.startsWith`
- `_.endsWith`
- `_.repeat`
- `_.padLeft`
- `_.padRight`
- `_.template` not support templateSettings


#### Utility

- `_.noop`
- `_.now`
- `_.chain`
- `_.value`
- `_.constant`
- `_.identity` return arguments[0]
- `_.mixin`
- `_.inherits`
- `_.random`
- `_.uniqueId` TODO


#### Lang

- `_.isString`
- `_.isArray`
- `_.isArrayLike`
- `_.isBoolean`
- `_.isElement`
- `_.isEmpty`
- `_.isFunction`
- `_.isInteger`
- `_.isNaN`
- `_.isNumber`
- `_.isObject`
- `_.isPlainObject`
- `_.isRegExp`
- `_.isString`
- `_.isUndefined`


Support
---

- all browsers even `IE6+`
- node.js

License
---

[![License][license-image]][license-url]

[travis-image]: https://img.shields.io/travis/chunpu/min-util.svg?style=flat-square
[travis-url]: https://travis-ci.org/chunpu/min-util
[license-image]: http://img.shields.io/npm/l/min-util.svg?style=flat-square
[license-url]: #
