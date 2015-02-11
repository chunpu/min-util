min-util
===

[![Build status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Javascript Util Lib

Installation
---

```sh
npm install min-util
```

Usage
---

```js
var _ = require('min-util')
```

#### Type Check

`_.is` equal [min-is](https://github.com/chunpu/min-is)

```js
assert(_.is.arraylike({0: 'foo', length: 1}))
```

#### Array like

- `_.each`
- `_.map`
- `_.filter`
- `_.some`
- `_.every`
- `_.slice`
- `_.indexOf`
- `_.has`
- `_.uniq`
- `_.reduce`
- `_.only`
- `_.flatten`
- `_.union`


#### String

- `_.trim`


#### Util

- `_.extend`
- `_.keys`
- `_.inherit` TODO

#### Function

- `_.bind`


Support
---


even `IE6+`

License
---

ISC

[npm-image]: https://img.shields.io/npm/v/min-util.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-util
[travis-image]: https://img.shields.io/travis/chunpu/min-util.svg?style=flat-square
[travis-url]: https://travis-ci.org/chunpu/min-util
[downloads-image]: http://img.shields.io/npm/dm/min-util.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-util
