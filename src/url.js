/*!
 *  url.js
 *  ======
 *  A lightweight JavaScript library to manipulate the page url.
 *  Check out the documentation at: https://github.com/jillix/url.js
 *
 *  Created with <3 by the jillix develeopers.
 */
(function(window) {

    var Url = window.Url = {};

    /**
     * queryString
     * Finds the value of parameter passed in first argument.
     *
     * @name queryString
     * @function
     * @param {String} name The parameter name.
     * @param {Boolean} notDecoded If `true`, the result will be encoded.
     * @return {String|Boolean|Undefined} The parameter value (as string),
     * `true` if the parameter is there, but doesn't have a value, or
     * `undefined` if it is missing.
     */
    function queryString(name, notDecoded) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        var encoded = null;

        if (results === null) {
            regex = new RegExp("[\\?&]" + name + "\\&([^&#]*)");
            if (regex.test(location.search)) {
                return true;
            }
            return undefined;
        } else {
            encoded = results[1].replace(/\+/g, " ");
            if (notDecoded) {
                return encoded;
            }
            return decodeURIComponent(encoded);
        }
    }

    /**
     * parseQuery
     * Parses a string as querystring. Like the `queryString` method does, if
     * the parameter is there, but it doesn't have a value, the value will
     * be `true`.
     *
     * @name parseQuery
     * @function
     * @param {String} search An optional string that should be parsed
     * (default: `window.location.search`).
     * @return {Object} The parsed querystring. Note this will contain empty
     * strings for
     */
    function parseQuery(search) {
        var query = {};

        if (typeof search !== "string") {
            search = window.location.search;
        }

        search = search.replace(/^\?/g, "");

        if (!search) {
            return {};
        }

        var a = search.split("&")
          , i = 0
          , iequ
          , value = null
          ;

        for (; i < a.length; ++i) {
            iequ = a[i].indexOf("=");

            if (iequ < 0) {
                iequ = a[i].length;
                value = true;
            } else {
                value = decodeURIComponent(a[i].slice(iequ+1))
            }

            query[decodeURIComponent(a[i].slice(0, iequ))] = value;
        }

        return query;
    }

    /**
     * stringify
     * Stringifies a query object.
     *
     * @name stringify
     * @function
     * @param {Object} queryObj The object that should be stringified.
     * @return {String} The stringified value of `queryObj` object.
     */
    function stringify(queryObj) {

        if (!queryObj || queryObj.constructor !== Object) {
            throw new Error("Query object should be an object.");
        }

        var stringified = "";
        Object.keys(queryObj).forEach(function(c) {
            var value = queryObj[c];
            stringified += c;
            if (value !== true) {
                stringified += "=" + encodeURIComponent(queryObj[c]);
            }
            stringified += "&";
        });

        stringified = stringified.replace(/\&$/g, "");
        return stringified;
    }

    /**
     * updateSearchParam
     * Adds, updates or deletes a parameter (without page refresh).
     *
     * @name updateSearchParam
     * @function
     * @param {String} param The parameter name.
     * @param {String|undefined} value The parameter value. If `undefined`, the parameter will be removed.
     * @return {Url} The `Url` object.
     */
    function updateSearchParam(param, value) {

        var searchParsed = parseQuery();

        // Delete the parameter
        if (value === undefined) {
            delete searchParsed[param];
        } else {
            // Update or add
            if (searchParsed[param] === value) {
                return Url;
            }
            searchParsed[param] = value;
        }

        var newSearch = "?" + stringify(searchParsed);
        window.history.replaceState(null, "", window.location.pathname + newSearch + location.hash);

        return Url;
    }

    /**
     * getLocation
     * Returns the page url, but not including the domain name.
     *
     * @name getLocation
     * @function
     * @return {String} The page url (without domain).
     */
    function getLocation() {
        return window.location.pathname + window.location.search + window.location.hash;
    }

    // Append the methods
    Url.getLocation = getLocation;
    Url.updateSearchParam = updateSearchParam;
    Url.queryString = queryString;
    Url.parseQuery = parseQuery;
    Url.stringify = stringify;

    // Version
    Url.version = "1.3.0";
})(window);
