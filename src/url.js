/**
 *  url.js JavaScript library
 *  =========================
 *  A lightweight JavaScript library that modifies the page url without refresh.
 *  Check out the documentation at: https://github.com/jillix/url.js
 *
 *  Copyright (c) 2014 jillix
 */
(function (window) {

    /**
     * queryString
     * Finds the value of parameter passed in first argument.
     *
     * @name queryString
     * @function
     * @param {String} name The parameter name
     * @param {Boolean} notDecoded If true, the result will be encoded.
     * @return {String} The value of the parameter name (`name` parameter)
     */
    function queryString (name, notDecoded) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        if (results == null) {
            return "";
        } else {
            var encoded = results[1].replace(/\+/g, " ");
            if (notDecoded) {
                return encoded;
            }
            return decodeURIComponent(encoded)
        }
    }

    /**
     * parseQuery
     * Parses the string from `search` parameter or the location search
     *
     * @name parseQuery
     * @function
     * @param {String} search Optional string that should be parsed
     * @return {Object} The parsed search query
     */
    function parseQuery (search) {
        var query = {};
        search = search || window.location.search
        if (!search) {
            return {};
        }
        var a = search.split('&');
        for (var i in a) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
        }

        return query;
    }

    /**
     * queryToString
     * Stringifies a query object
     *
     * @name queryToString
     * @function
     * @param {Object} queryObj The object that should be stringified
     * @return {String} The stringified value of `queryObj` object
     */
    function queryToString (queryObj) {
        if (!queryObj || queryObj.constructor.name !== "Object") {
            throw new Error ("Query object sohuld be an object");
        }
        var stringified = "";
        for (var param in queryObj) {
            if (!queryObj.hasOwnProperty(param)) continue;
            stringified += param + "=" + queryObj[param] + "&";
        }
        stringified = stringified.substring(0, stringified.length - 1);
        return stringified;
    }

    /**
     * updateSearchParam
     * Adds a parameter=value to the url (without page refresh)
     *
     * @name updateSearchParam
     * @function
     * @param {String} param The parameter name
     * @param {String|undefined} value The parameter value. If undefined, the parameter will be removed.
     * @return
     */
    function updateSearchParam (param, value) {

        // parse query
        var searchParsed = parseQuery();

        // no value means delete
        if (value === undefined) {
            delete searchParsed[param];
        } else {
            // verify if old param has the same
            value = encodeURIComponent(value);
            if (searchParsed[param] === value) {
                return;
            }
            // set the new value
            searchParsed[param] = value;
        }

        // stringify the search object
        var newSearch = "?" + queryToString(searchParsed);

        // TODO When no parameter, "?" will be displayed because replaceState
        //      requires a non empty string
        // if (newSearch.length === 1) {
        //     newSearch = "";
        // }

        // and finally replace the state
        window.history.replaceState(null, "", newSearch + location.hash);
    }

    /**
     * getLocation
     * Returns the page url, but not including the domain name
     *
     * @name getLocation
     * @function
     * @return {String} The page url (without domain)
     */
    function getLocation () {
        return window.location.pathname + window.location.search + window.location.hash;
    }

    window.Url = {
        getLocation: getLocation,
        updateSearchParam: updateSearchParam,
        queryString: queryString,
        parseSearchQuery: parseQuery
    };
})(window);
