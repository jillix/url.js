window.addEventListener("popstate", function (e) {
    Url.triggerPopStateCb(e)
});

const Url = module.exports = {

    _onPopStateCbs: []
  , _isHash: false

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
  , queryString (name, notDecoded) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
          , results = regex.exec(location.search)
          , encoded = null
          ;

        if (results === null) {
            regex = new RegExp("[\\?&]" + name + "(\\&([^&#]*)|$)");
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
  , parseQuery (search) {
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
  , stringify (queryObj) {

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
     * @param {Boolean} push If `true`, the page will be kept in the history,
     * otherwise the location will be changed but by pressing the back button
     * will not bring you to the old location.
     * @param {Boolean} triggerPopState Triggers the popstate handlers (by default falsly).
     * @return {Url} The `Url` object.
     */
  , updateSearchParam (param, value, push, triggerPopState) {

        var searchParsed = this.parseQuery();

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

        var newSearch = "?" + this.stringify(searchParsed);
        this._updateAll(window.location.pathname + newSearch + location.hash, push, triggerPopState);

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
  , getLocation () {
        return window.location.pathname + window.location.search + window.location.hash;
    }

    /**
     * hash
     * Sets/gets the hash value.
     *
     * @name hash
     * @function
     * @param {String} newHash The hash to set.
     * @param {Boolean} triggerPopState Triggers the popstate handlers (by default falsly).
     * @return {String} The location hash.
     */
  , hash (newHash, triggerPopState) {
        if (newHash === undefined) {
            return location.hash.substring(1);
        }
        if (!triggerPopState) {
            setTimeout(function () {
                Url._isHash = false;
            }, 0);
            Url._isHash = true;
        }
        return location.hash = newHash;
    }

    /**
     * _updateAll
     * Update the full url (pathname, search, hash).
     *
     * @name _updateAll
     * @function
     * @param {String} newHash The hash to set.
     * @param {Boolean} triggerPopState Triggers the popstate handlers (by default falsly).
     * @return {String} The set url.
     */
  , _updateAll (s, push, triggerPopState) {
        window.history[push ? "pushState" : "replaceState"](null, "", s);
        if (triggerPopState) {
            Url.triggerPopStateCb({});
        }
        return s;
    }

    /**
     * pathname
     * Sets/gets the pathname.
     *
     * @name getLocation
     * @function
     * @param {String} pathname The pathname to set.
     * @param {Boolean} push If `true`, the page will be kept in the history,
     * otherwise the location will be changed but by pressing the back button
     * will not bring you to the old location.
     * @param {Boolean} triggerPopState Triggers the popstate handlers (by default falsly).
     * @return {String} The set url.
     */
  , pathname (pathname, push, triggerPopState) {
        if (pathname === undefined) {
            return location.pathname;
        }
        return this._updateAll(pathname + window.location.search + window.location.hash, push, triggerPopState);
    }

    /**
     * triggerPopStateCb
     * Calls the popstate handlers.
     *
     * @name triggerPopStateCb
     * @function
     */
  , triggerPopStateCb (e) {
        if (this._isHash) { return; }
        this._onPopStateCbs.forEach(function (c) {
            c(e)
        });
    }

    /**
     * onPopState
     * Adds a popstate handler.
     *
     * @name onPopState
     * @function
     * @param {Function} cb The callback function.
     */
  , onPopState (cb) {
        this._onPopStateCbs.push(cb);
    }

    /**
     * removeHash
     * Removes the hash from the url.
     *
     * @name removeHash
     * @function
     */
  , removeHash () {
        this._updateAll(window.location.pathname + window.location.search, false, false);
    }
   
    /**
     * removeQuery
     * Removes the querystring parameters from the url.
     *
     * @name removeQuery
     * @function
     */
  , removeQuery () {
        this._updateAll(window.location.pathname + window.location.hash, false, false);
    }

  , version: "2.3.1"
};
