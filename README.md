# url.js
A lightweight JavaScript library to manipulate the page url.

## Demo
Browse the demos on https://jillix.github.io/url.js/

[![](http://i.imgur.com/ubzAGqL.png)](https://jillix.github.io/url.js/)

## Usage

```html
<script src="path/to/url.js"></script>
<script>
    Url.updateSearchParam("answer", 42);
</script>
```

## Documentation

### `queryString(name, notDecoded)`
Finds the value of parameter passed in first argument.

#### Params
- **String** `name`: The parameter name.
- **Boolean** `notDecoded`: If `true`, the result will be encoded.

#### Return
- **String** The parameter value.

### `parseQuery(search)`
Parses a string as querystring.

#### Params
- **String** `search`: An optional string that should be parsed (default: `window.location.search`).

#### Return
- **Object** The parsed querystring.

### `stringify(queryObj)`
Stringifies a query object.

#### Params
- **Object** `queryObj`: The object that should be stringified.

#### Return
- **String** The stringified value of `queryObj` object.

### `updateSearchParam(param, value)`
Adds, updates or deletes a parameter (without page refresh).

#### Params
- **String** `param`: The parameter name.
- **String** `value`: The parameter value. If `undefined`, the parameter will be removed.

#### Return
- **Url** The `Url` object.

### `getLocation()`
Returns the page url, but not including the domain name.

#### Return
- **String** The page url (without domain).

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
