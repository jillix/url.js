## Documentation

You can see below the API reference of this module.

### `queryString(name, notDecoded)`
Finds the value of parameter passed in first argument.

#### Params
- **String** `name`: The parameter name.
- **Boolean** `notDecoded`: If `true`, the result will be encoded.

#### Return
- **String|Boolean|Undefined** The parameter value (as string), `true` if the parameter is there, but doesn't have a value, or
`undefined` if it is missing.

### `parseQuery(search)`
Parses a string as querystring. Like the `queryString` method does, if
the parameter is there, but it doesn't have a value, the value will
be `true`.

#### Params
- **String** `search`: An optional string that should be parsed (default: `window.location.search`).

#### Return
- **Object** The parsed querystring. Note this will contain empty strings for

### `stringify(queryObj)`
Stringifies a query object.

#### Params
- **Object** `queryObj`: The object that should be stringified.

#### Return
- **String** The stringified value of `queryObj` object.

### `updateSearchParam(param, value, push, triggerPopState)`
Adds, updates or deletes a parameter (without page refresh).

#### Params
- **String** `param`: The parameter name.
- **String** `value`: The parameter value. If `undefined`, the parameter will be removed.
- **Boolean** `push`: If `true`, the page will be kept in the history, otherwise the location will be changed but by pressing the back button
will not bring you to the old location.
- **Boolean** `triggerPopState`: Triggers the popstate handlers (by default falsly).

#### Return
- **Url** The `Url` object.

### `getLocation()`
Returns the page url, but not including the domain name.

#### Return
- **String** The page url (without domain).

### `hash(newHash, triggerPopState)`
Sets/gets the hash value.

#### Params
- **String** `newHash`: The hash to set.
- **Boolean** `triggerPopState`: Triggers the popstate handlers (by default falsly).

#### Return
- **String** The location hash.

### `_updateAll(newHash, triggerPopState)`
Update the full url (pathname, search, hash).

#### Params
- **String** `newHash`: The hash to set.
- **Boolean** `triggerPopState`: Triggers the popstate handlers (by default falsly).

#### Return
- **String** The set url.

### `getLocation(pathname, push, triggerPopState)`
pathname
Sets/gets the pathname.

#### Params
- **String** `pathname`: The pathname to set.
- **Boolean** `push`: If `true`, the page will be kept in the history, otherwise the location will be changed but by pressing the back button
will not bring you to the old location.
- **Boolean** `triggerPopState`: Triggers the popstate handlers (by default falsly).

#### Return
- **String** The set url.

### `triggerPopStateCb()`
Calls the popstate handlers.

### `onPopState(cb)`
Adds a popstate handler.

#### Params
- **Function** `cb`: The callback function.

### `removeHash()`
Removes the hash from the url.

### `removeQuery()`
Removes the querystring parameters from the url.

