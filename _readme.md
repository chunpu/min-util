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

#### String

- `_.trim`

#### Object

- `_.extend`
- `_.keys`
- `_.create`
- `_.inherits`

#### Function

- `_.bind`

Support
---

- all browsers even `IE6+`
- node.js

Try
---

Try in [console](http://chunpu.github.io/min-util/browser), exports as `util`
