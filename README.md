url.js
======

A lightweight JavaScript library that modifies the page url without refresh.

## Methods

#### `parseSearchQuery(@search)`

 - `@search`: if provided, this string will be parsed (e.g. "?param=value"), if not provided, the `location.search` will be taken

The function will return an object representing the parsed search query.

e.g.:

```js
{
   param: "value"
}
```

#### `queryString (@param, @notDecoded)`
 - `@param`: the parameter name
 - `@notDecoded`: if true, the returned value is not decoded

Returns the value of `@param` parameter from `location.search`.

#### `updateSearchParam (@param, @value)`
Adds, updates or remove a search parameter without page refresh.

 - `@param`: the parameter name
 - `@value`: the parameter value (if value not provided, the parameter is **deleted** and url updated)

#### `getLocation()`
Returns a string built from `{pathname}{search}{hash}`.

## Changelog

#### v0.1.0
 - Initial release

## License
See LICENSE file.
