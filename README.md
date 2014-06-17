url.js
======

A lightweight JavaScript library that modifies the page url without refresh.

# Methods
## `queryString(name, notDecoded)`
Finds the value of parameter passed in first argument.

### Params:
* **String** *name* The parameter name
* **Boolean** *notDecoded* If true, the result will be encoded.

### Return:
* **String** The value of the parameter name (`name` parameter)

## `parseQuery(search)`
Parses the string from `search` parameter or the location search

### Params:
* **String** *search* Optional string that should be parsed

### Return:
* **Object** The parsed search query

## `queryToString(queryObj)`
Stringifies a query object

### Params:
* **Object** *queryObj* The object that should be stringified

### Return:
* **String** The stringified value of `queryObj` object

## `updateSearchParam(param, value)`
Adds a parameter=value to the url (without page refresh)

### Params:
* **String** *param* The parameter name
* **String|undefined** *value* The parameter value. If undefined, the parameter will be removed.

### Return:
* **undefined**

## `getLocation()`
Returns the page url, but not including the domain name

### Return:
* **String** The page url (without domain)

# Changelog

## `v0.3.0`
 - Fixed a bug in the `parseQuery` method
 - Updated comments
 - Minor syntax change
 - Encode values when stringifying the query

## `v0.2.0`
 - Fixed a lot of bugs from initial release and simplified the code that sets, updates or delete the parameter.
 - Some of the method names are changed. See the REAMDE file for more details.
 - Added delete parameter feature.

## `v0.1.0`
 - Initial release

# License
See LICENSE file.
