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
    function queryString (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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


        // get location search string
        var cSearch     = location.search

            // get current parameter value
          , cParamValue = queryString(param)

            // new search string will be modified
          , newSearch   = cSearch;

        // the parameter already exists and it is equal with the value
        if (cParamValue === value) {
            return;

        // the parameter already exists BUT it is NOT equal with the value
        } else if (cParamValue) {

            // get the index
            var cSearchIndex = cSearch.indexOf("?" + param + "=");

            // nothing found
            if (cSearchIndex < 0) {

                // try again with '&'
                cSearchIndex = cSearch.indexOf("&" + param + "=");
            }

            // get old value
            var oldValue = cSearch.substring(cSearchIndex + 2 + param.length)
              , indexOfAnd = oldValue.indexOf("&");

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
        } else {

            // add the new parameter
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
