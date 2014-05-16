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

    /*
     *  Util query string function
     *  Thanks: http://stackoverflow.com/a/901144/1420197
     *
     * */
    function queryString (name, notDecoded) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
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

    /*
     *  Replaces a character at known index
     *  http://stackoverflow.com/a/1431113/1420197
     *
     * */
    function replaceAt (word, start, end, character) {
        return word.substr(0, start) + character + word.substr(end + character.length);
    }

    /*
     * Adds a parameter=value to the url
     *
     * */
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

    /*
     *  Returns the location
     *
     * */
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
