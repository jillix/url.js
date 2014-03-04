url.js
======

A lightweight JavaScript library that modifies the page url without refresh.

## How to use

After importing this library in the page you can do:

```js
// `?param=value`
Url.addSearch("param", "value");
// `?param=value&param1=value1`
Url.addSearch("param1", "value1");
// `?param=foo&param1=value1`
Url.addSearch("param", "foo");
```

## Methods

#### `addSearch (@param, @value`)
Adds or modifies a parameter.

 - `@param` is the parameter that you want to add
 - `@value` is the value of the added parameter

#### `queryString(@param)`
Returns the value of `@param`. If `@param` doesn't exist, an empty string (`""`) will be returned.

#### `getLocation()`
Returns a string built from `{pathname}{search}{hash}`.

## Changelog

#### v0.1.0
 - Initial release

## License
See LICENSE file.
