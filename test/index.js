const tester = require("tester")
    , ghosty = require("ghosty")
    , Lien = require("lien")
    ;

tester.describe("url.js", test => {
    var _page = null
      , app = null
      , _ph = null
      ;

    test.it("start a server", cb => {
        app = new Lien({
            port: 9000
          , root: `${__dirname}/..`
        });
        app.on("load", cb);
        app.page.add("/", "test/index.html");
    });

    test.it("start the phantom browser", cb => {
        ghosty.create(ph => {
            _ph = ph;
            ph.createPage(page => {
                page.open("http://localhost:9000", status => {
                    _page = page;
                    test.expect(status).toBe("success");
                    cb();
                });
            });
        });
    });

    test.it("get location", cb => {
        _page.evaluate(function () {
            return Url.getLocation();
        }, result => {
            test.expect(result).toBe("/");
            cb();
        });
    });

    test.it("get non-existing querystring", cb => {
        _page.evaluate(function () {
            return Url.queryString("foo");
        }, result => {
            test.expect(result).toBe(null);
            cb();
        });
    });

    test.it("update search param", cb => {
        _page.evaluate(function () {
            return Url.updateSearchParam("foo", 42);
        }, () => {
            _page.evaluate(function () {
                return Url.getLocation();
            }, result => {
                test.expect(result).toBe("/?foo=42");
                cb();
            });
        });
    });

    test.it("update search param to be boolean", cb => {
        _page.evaluate(function () {
            return Url.updateSearchParam("foo", true);
        }, () => {
            _page.evaluate(function () {
                return Url.queryString("foo")
            }, result => {
                test.expect(result).toBe(true);
                _page.evaluate(function () {
                    return location.search;
                }, result => {
                    test.expect(result).toBe("?foo");
                    cb();
                });
            });
        });
    });

    test.it("set hash", cb => {
        _page.evaluate(function () {
            return Url.hash("foo");
        }, () => {
            _page.evaluate(function () {
                return Url.hash()
            }, result => {
                test.expect(result).toBe("foo");
                _page.evaluate(function () {
                    return Url.getLocation();
                }, result => {
                    test.expect(result).toBe("/?foo#foo");
                    cb();
                });
            });
        });
    });

    test.it("set pathname", cb => {
        _page.evaluate(function () {
            return Url.pathname("/foo");
        }, () => {
            _page.evaluate(function () {
                return Url.pathname()
            }, result => {
                try {
                    test.expect(result).toBe("/foo");
                } catch (e) { return cb(e); }
                _page.evaluate(function () {
                    return location.pathname;
                }, result => {
                    test.expect(result).toBe("/foo");
                    cb();
                });
            });
        });
    });


    test.should("close the server", (cb) => {
        _ph.exit();
        app._server.close(cb);
    });
});
