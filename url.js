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
     * @return: an object containing all fields and values from search url
     */
    function parseQuery () {
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
     * addSearch
     * Adds a parameter=value to the url (without page refresh)
     *
     * @param param: the parameter name
     * @param value: the parameter value
     * @return
     */
    function addSearch(param, value) {

        // current search, old parameter value
        var cSearch     = location.search
          , newSearch   = cSearch
          , cParamValue = queryString(param, true)
          ;

        // encode value
        value = encodeURIComponent(value);

        // the parameter already exists and it is equal with the value
        if (cParamValue === value) {
            return;
        }

        // the parameter already exists BUT it is NOT equal with the value
        if (cParamValue) {

            // /?param=value%20anotherword&param2=1

            // get the index
            var cSearchIndex = cSearch.indexOf("?" + param + "=");
            if (cSearchIndex < 0) {
                cSearchIndex = cSearch.indexOf("&" + param + "=");
            }

            // get old value
            var oldValue = cSearch.substring(cSearchIndex + 2 + param.length)
              , indexOfAnd = oldValue.indexOf("&")
              ;

            if (indexOfAnd !== -1) {
                oldValue = oldValue.substring(0, indexOfAnd);
            }

            // set the new search parameter value
            newSearch = replaceAt(
                newSearch
              , cSearchIndex + 2 + param.length
              , cSearchIndex - 1 + param.length + oldValue.length
              , value
            );
        // the parameter DOESN'T exist
        // add the new parameter
        } else {
            newSearch = cSearch + (!cSearch ? "?" : "&") + param + "=" + value;
        }

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
      , addSearch:   addSearch
      , queryString: queryString
    };
})(window);
