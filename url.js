/*
 *  url.js
 *
 *  A lightweight JavaScript library that modifies the page url without refresh.
 *  Example:
 *
 *    Url.addSearch("param", "value");
 *
 *  Copyright (c) 2014 jillix GmbH
 *
 * */
(function (window) {

    /**
     * queryString
     * Util query string function
     *
     * Thanks: http://stackoverflow.com/a/901144/1420197
     *
     * @param name: the parameter name
     * @param notDecoded: if true, the returned value is not decoded
     * @return: the value of search parameter
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
     * This function parses the query from url
     *
     * @param search: if provided, this string will be parsed
     * @return: an object containing all fields and values from search url
     */
    function parseQuery (search) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        var result = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return result;
    }

    /**
     * queryToString
     * Converts a query objecto to string.
     *
     * Example: {
     *     param1: "value1",
     *     param2: "value2"
     * }
     *
     * is converted in "param1=value1&param2=value2"
     *
     * @param queryObj: the query object (see example above)
     * @return: the stringified query object
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
     * replaceAt
     * Replaces a character at known index
     * Thanks! http://stackoverflow.com/a/1431113/1420197
     *
     * @param word: that word that should be modified
     * @param start: start index
     * @param end: end index
     * @param character: string that should replace the index
     * @return: the modified string
     */
    function replaceAt (word, start, end, character) {
        return word.substr(0, start) + character + word.substr(end + character.length);
    }

    /**
     * updateSearchParam
     * Adds a parameter=value to the url (without page refresh)
     *
     * @param param: the parameter name
     * @param value: the parameter value (if value not provided,
     * the parameter is deleted and url updated)
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
     * Returns the page url (without domaain and protocol)
     *
     * @return: the page url (without domaain and protocol)
     */
    function getLocation () {
        return window.location.pathname + window.location.search + window.location.hash;
    }

    // export the Url object
    window.Url = {
        getLocation: getLocation
      , updateSearchParam: updateSearchParam
      , queryString: queryString
      , parseSearchQuery: parseQuery
    };
})(window);
