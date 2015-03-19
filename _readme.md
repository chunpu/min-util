Usage
---

```js
var _ = require('min-util')
```

#### Type Check

`_.is` equals [min-is](https://github.com/chunpu/min-is)

```js
assert(_.is.arraylike({0: 'foo', length: 1}))
```

#### Array like

- `_.each`
- `_.map`
- `_.filter`
- `_.find`
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
- `_.difference`
- `_.without`
- `_.asyncMap` just like async.map

#### String

- `_.trim`
- `_.indexOf`
- `_.tostr`
- `_.camelCase`
- `_.capitalize`
- `_.decapitalize`
- `_.has`
- `_.capitalize`

#### Object

- `_.extend`
- `_.keys`
- `_.create`
- `_.inherits`

#### Function

- `_.bind`

#### Other

- `_.noop`
- `_.now`
- `_.identity` return arguments[0]

Support
---

- all browsers even `IE6+`
- node.js

Try
---

Try in [console](http://chunpu.github.io/min-util/browser), exports as `util`
