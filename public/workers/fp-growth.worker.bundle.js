!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var r = e();
    for (var n in r) ("object" == typeof exports ? exports : t)[n] = r[n];
  }
})(self, () =>
  (() => {
    var t = {
        46: (t) => {
          function e() {
            (this._events = this._events || {}),
              (this._maxListeners = this._maxListeners || void 0);
          }
          function r(t) {
            return "function" == typeof t;
          }
          function n(t) {
            return "object" == typeof t && null !== t;
          }
          function i(t) {
            return void 0 === t;
          }
          (t.exports = e),
            (e.EventEmitter = e),
            (e.prototype._events = void 0),
            (e.prototype._maxListeners = void 0),
            (e.defaultMaxListeners = 10),
            (e.prototype.setMaxListeners = function (t) {
              if ("number" != typeof t || t < 0 || isNaN(t))
                throw TypeError("n must be a positive number");
              return (this._maxListeners = t), this;
            }),
            (e.prototype.emit = function (t) {
              var e, s, o, u, h, a;
              if (
                (this._events || (this._events = {}),
                "error" === t &&
                  (!this._events.error ||
                    (n(this._events.error) && !this._events.error.length)))
              ) {
                if ((e = arguments[1]) instanceof Error) throw e;
                var p = new Error(
                  'Uncaught, unspecified "error" event. (' + e + ")",
                );
                throw ((p.context = e), p);
              }
              if (i((s = this._events[t]))) return !1;
              if (r(s))
                switch (arguments.length) {
                  case 1:
                    s.call(this);
                    break;
                  case 2:
                    s.call(this, arguments[1]);
                    break;
                  case 3:
                    s.call(this, arguments[1], arguments[2]);
                    break;
                  default:
                    (u = Array.prototype.slice.call(arguments, 1)),
                      s.apply(this, u);
                }
              else if (n(s))
                for (
                  u = Array.prototype.slice.call(arguments, 1),
                    o = (a = s.slice()).length,
                    h = 0;
                  h < o;
                  h++
                )
                  a[h].apply(this, u);
              return !0;
            }),
            (e.prototype.addListener = function (t, s) {
              var o;
              if (!r(s)) throw TypeError("listener must be a function");
              return (
                this._events || (this._events = {}),
                this._events.newListener &&
                  this.emit("newListener", t, r(s.listener) ? s.listener : s),
                this._events[t]
                  ? n(this._events[t])
                    ? this._events[t].push(s)
                    : (this._events[t] = [this._events[t], s])
                  : (this._events[t] = s),
                n(this._events[t]) &&
                  !this._events[t].warned &&
                  (o = i(this._maxListeners)
                    ? e.defaultMaxListeners
                    : this._maxListeners) &&
                  o > 0 &&
                  this._events[t].length > o &&
                  ((this._events[t].warned = !0),
                  console.error(
                    "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                    this._events[t].length,
                  ),
                  "function" == typeof console.trace && console.trace()),
                this
              );
            }),
            (e.prototype.on = e.prototype.addListener),
            (e.prototype.once = function (t, e) {
              if (!r(e)) throw TypeError("listener must be a function");
              var n = !1;
              function i() {
                this.removeListener(t, i),
                  n || ((n = !0), e.apply(this, arguments));
              }
              return (i.listener = e), this.on(t, i), this;
            }),
            (e.prototype.removeListener = function (t, e) {
              var i, s, o, u;
              if (!r(e)) throw TypeError("listener must be a function");
              if (!this._events || !this._events[t]) return this;
              if (
                ((o = (i = this._events[t]).length),
                (s = -1),
                i === e || (r(i.listener) && i.listener === e))
              )
                delete this._events[t],
                  this._events.removeListener &&
                    this.emit("removeListener", t, e);
              else if (n(i)) {
                for (u = o; u-- > 0; )
                  if (i[u] === e || (i[u].listener && i[u].listener === e)) {
                    s = u;
                    break;
                  }
                if (s < 0) return this;
                1 === i.length
                  ? ((i.length = 0), delete this._events[t])
                  : i.splice(s, 1),
                  this._events.removeListener &&
                    this.emit("removeListener", t, e);
              }
              return this;
            }),
            (e.prototype.removeAllListeners = function (t) {
              var e, n;
              if (!this._events) return this;
              if (!this._events.removeListener)
                return (
                  0 === arguments.length
                    ? (this._events = {})
                    : this._events[t] && delete this._events[t],
                  this
                );
              if (0 === arguments.length) {
                for (e in this._events)
                  "removeListener" !== e && this.removeAllListeners(e);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = {}),
                  this
                );
              }
              if (r((n = this._events[t]))) this.removeListener(t, n);
              else if (n)
                for (; n.length; ) this.removeListener(t, n[n.length - 1]);
              return delete this._events[t], this;
            }),
            (e.prototype.listeners = function (t) {
              return this._events && this._events[t]
                ? r(this._events[t])
                  ? [this._events[t]]
                  : this._events[t].slice()
                : [];
            }),
            (e.prototype.listenerCount = function (t) {
              if (this._events) {
                var e = this._events[t];
                if (r(e)) return 1;
                if (e) return e.length;
              }
              return 0;
            }),
            (e.listenerCount = function (t, e) {
              return t.listenerCount(e);
            });
        },
        924: function (t, e, r) {
          "use strict";
          var n,
            i =
              (this && this.__extends) ||
              ((n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                }),
              function (t, e) {
                function r() {
                  this.constructor = t;
                }
                n(t, e),
                  (t.prototype =
                    null === e
                      ? Object.create(e)
                      : ((r.prototype = e.prototype), new r()));
              });
          Object.defineProperty(e, "__esModule", { value: !0 });
          var s = r(46),
            o = r(47),
            u = (function (t) {
              function e(e) {
                var r = t.call(this) || this;
                return (r._support = e), (r._itemsets = []), r;
              }
              return (
                i(e, t),
                (e.prototype.exec = function (t, e) {
                  var r = this;
                  (this._transactions = t),
                    (this._support = Math.ceil(this._support * t.length));
                  var n = this._getDistinctItemsCount(this._transactions);
                  return new Promise(function (t, i) {
                    var s = new o.FPTree(n, r._support).fromTransactions(
                        r._transactions,
                      ),
                      u = r._fpGrowth(s, r._transactions.length);
                    e && e(u), t(u);
                  });
                }),
                (e.prototype._fpGrowth = function (t, e, r) {
                  var n = this;
                  return (
                    void 0 === r && (r = []),
                    t.headers.reduce(function (i, s) {
                      var o = Math.min(t.supports[JSON.stringify(s)], e),
                        u = r.slice(0);
                      u.push(s), i.push(n._getFrequentItemset(u, o));
                      var h = t.getConditionalFPTree(s);
                      return h ? i.concat(n._fpGrowth(h, o, u)) : i;
                    }, [])
                  );
                }),
                (e.prototype._handleSinglePath = function (t, e) {
                  return [];
                }),
                (e.prototype._getFrequentItemset = function (t, e) {
                  var r = { items: t, support: e };
                  return this.emit("data", r), r;
                }),
                (e.prototype._getDistinctItemsCount = function (t) {
                  return t.reduce(function (t, e) {
                    return e.reduce(function (t, e) {
                      return (
                        (t[JSON.stringify(e)] =
                          (t[JSON.stringify(e)] || 0) + 1),
                        t
                      );
                    }, t);
                  }, {});
                }),
                e
              );
            })(s.EventEmitter);
          e.FPGrowth = u;
        },
        795: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 });
          var r = (function () {
            function t(t, e) {
              void 0 === t && (t = null),
                void 0 === e && (e = null),
                (this.item = t),
                (this.parent = e),
                (this.support = 1),
                (this.nextSameItemNode = null),
                (this._children = []);
            }
            return (
              Object.defineProperty(t.prototype, "children", {
                get: function () {
                  return this._children;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.upsertChild = function (e, r, n) {
                void 0 === n && (n = 1);
                var i = this.getChild(e);
                return (
                  i
                    ? (i.support += n)
                    : (((i = new t(e, this)).support = n),
                      this._children.push(i),
                      r && r(i)),
                  i
                );
              }),
              (t.prototype.getChild = function (t) {
                return this._children.find(function (e) {
                  return e.item == t;
                });
              }),
              t
            );
          })();
          e.FPNode = r;
        },
        47: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 });
          var n = r(795),
            i = (function () {
              function t(t, e) {
                (this.supports = t),
                  (this._support = e),
                  (this._isInit = !1),
                  (this.root = new n.FPNode()),
                  (this._firstInserted = {}),
                  (this._lastInserted = {});
              }
              return (
                Object.defineProperty(t.prototype, "headers", {
                  get: function () {
                    return this._headers;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (t.prototype.fromTransactions = function (t) {
                  var e = this;
                  if (this._isInit)
                    throw new Error("Error building the FPTree");
                  return (
                    t.forEach(function (t) {
                      var r = t
                        .filter(function (t) {
                          return e.supports[JSON.stringify(t)] >= e._support;
                        })
                        .sort(function (t, r) {
                          var n =
                            e.supports[JSON.stringify(r)] -
                            e.supports[JSON.stringify(t)];
                          return 0 == n
                            ? JSON.stringify(r).localeCompare(JSON.stringify(t))
                            : n;
                        });
                      e._addItems(r);
                    }),
                    (this._headers = this._getHeaderList()),
                    (this._isInit = !0),
                    this
                  );
                }),
                (t.prototype.fromPrefixPaths = function (t) {
                  var e = this;
                  if (this._isInit)
                    throw new Error("Error building the FPTree");
                  return (
                    t.forEach(function (t) {
                      var r = t.path
                        .filter(function (t) {
                          return e.supports[JSON.stringify(t)] >= e._support;
                        })
                        .sort(function (t, r) {
                          var n =
                            e.supports[JSON.stringify(r)] -
                            e.supports[JSON.stringify(t)];
                          return 0 == n
                            ? JSON.stringify(r).localeCompare(JSON.stringify(t))
                            : n;
                        });
                      e._addItems(r, t.support);
                    }),
                    (this._headers = this._getHeaderList()),
                    (this._isInit = !0),
                    this
                  );
                }),
                (t.prototype.getConditionalFPTree = function (e) {
                  var r = this._firstInserted[JSON.stringify(e)];
                  if (!r) return null;
                  var n = this.supports[JSON.stringify(e)],
                    i = {},
                    s = this._getPrefixPaths(r, n, function (t, e) {
                      i[JSON.stringify(t)] = (i[JSON.stringify(t)] || 0) + e;
                    }),
                    o = new t(i, this._support).fromPrefixPaths(s);
                  return o.root.children.length ? o : null;
                }),
                (t.prototype.getPrefixPaths = function (t) {
                  if (!this._isInit)
                    throw new Error("Error building the FPTree");
                  var e = this._firstInserted[JSON.stringify(t)];
                  return e ? this._getPrefixPaths(e, e.support) : [];
                }),
                (t.prototype.getPrefixPath = function (t, e) {
                  if (!this._isInit)
                    throw new Error("Error building the FPTree");
                  var r = this._getPrefixPath(t, t.support, e);
                  if (0 !== r.length) return { support: t.support, path: r };
                }),
                (t.prototype.isSinglePath = function () {
                  if (!this._isInit)
                    throw new Error("Error building the FPTree");
                  return !!this.getSinglePath();
                }),
                (t.prototype.getSinglePath = function () {
                  if (!this._isInit)
                    throw new Error("Error building the FPTree");
                  return this._getSinglePath(this.root);
                }),
                (t.prototype._addItems = function (t, e) {
                  var r = this;
                  void 0 === e && (e = 1);
                  var n = this.root;
                  t.forEach(function (t) {
                    n = n.upsertChild(
                      t,
                      function (e) {
                        var n = JSON.stringify(t);
                        r._updateLastInserted(n, e),
                          r._updateFirstInserted(n, e);
                      },
                      e,
                    );
                  });
                }),
                (t.prototype._getPrefixPaths = function (t, e, r, n) {
                  void 0 === n && (n = []);
                  var i = this.getPrefixPath(t, r);
                  return (
                    i && n.push(i),
                    t.nextSameItemNode
                      ? this._getPrefixPaths(t.nextSameItemNode, e, r, n)
                      : n
                  );
                }),
                (t.prototype._getPrefixPath = function (t, e, r) {
                  return t.parent && t.parent.parent
                    ? (r && r(t.parent.item, e),
                      [t.parent.item].concat(
                        this._getPrefixPath(t.parent, e, r),
                      ))
                    : [];
                }),
                (t.prototype._getSinglePath = function (t, e) {
                  return (
                    void 0 === e && (e = []),
                    0 == t.children.length
                      ? e
                      : t.children.length > 1
                        ? null
                        : (e.push(t.children[0]),
                          this._getSinglePath(t.children[0], e))
                  );
                }),
                (t.prototype._updateLastInserted = function (t, e) {
                  var r = this._lastInserted[t];
                  r && (r.nextSameItemNode = e), (this._lastInserted[t] = e);
                }),
                (t.prototype._updateFirstInserted = function (t, e) {
                  this._firstInserted[t] || (this._firstInserted[t] = e);
                }),
                (t.prototype._getHeaderList = function () {
                  var t = this;
                  return Object.keys(this._firstInserted)
                    .sort(function (e, r) {
                      return t.supports[e] - t.supports[r];
                    })
                    .map(function (t) {
                      return JSON.parse(t);
                    });
                }),
                t
              );
            })();
          e.FPTree = i;
        },
        907: (t) => {
          var e,
            r,
            n = (t.exports = {});
          function i() {
            throw new Error("setTimeout has not been defined");
          }
          function s() {
            throw new Error("clearTimeout has not been defined");
          }
          function o(t) {
            if (e === setTimeout) return setTimeout(t, 0);
            if ((e === i || !e) && setTimeout)
              return (e = setTimeout), setTimeout(t, 0);
            try {
              return e(t, 0);
            } catch (r) {
              try {
                return e.call(null, t, 0);
              } catch (r) {
                return e.call(this, t, 0);
              }
            }
          }
          !(function () {
            try {
              e = "function" == typeof setTimeout ? setTimeout : i;
            } catch (t) {
              e = i;
            }
            try {
              r = "function" == typeof clearTimeout ? clearTimeout : s;
            } catch (t) {
              r = s;
            }
          })();
          var u,
            h = [],
            a = !1,
            p = -1;
          function f() {
            a &&
              u &&
              ((a = !1),
              u.length ? (h = u.concat(h)) : (p = -1),
              h.length && c());
          }
          function c() {
            if (!a) {
              var t = o(f);
              a = !0;
              for (var e = h.length; e; ) {
                for (u = h, h = []; ++p < e; ) u && u[p].run();
                (p = -1), (e = h.length);
              }
              (u = null),
                (a = !1),
                (function (t) {
                  if (r === clearTimeout) return clearTimeout(t);
                  if ((r === s || !r) && clearTimeout)
                    return (r = clearTimeout), clearTimeout(t);
                  try {
                    return r(t);
                  } catch (e) {
                    try {
                      return r.call(null, t);
                    } catch (e) {
                      return r.call(this, t);
                    }
                  }
                })(t);
            }
          }
          function l(t, e) {
            (this.fun = t), (this.array = e);
          }
          function d() {}
          (n.nextTick = function (t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++)
                e[r - 1] = arguments[r];
            h.push(new l(t, e)), 1 !== h.length || a || o(c);
          }),
            (l.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (n.title = "browser"),
            (n.browser = !0),
            (n.env = {}),
            (n.argv = []),
            (n.version = ""),
            (n.versions = {}),
            (n.on = d),
            (n.addListener = d),
            (n.once = d),
            (n.off = d),
            (n.removeListener = d),
            (n.removeAllListeners = d),
            (n.emit = d),
            (n.prependListener = d),
            (n.prependOnceListener = d),
            (n.listeners = function (t) {
              return [];
            }),
            (n.binding = function (t) {
              throw new Error("process.binding is not supported");
            }),
            (n.cwd = function () {
              return "/";
            }),
            (n.chdir = function (t) {
              throw new Error("process.chdir is not supported");
            }),
            (n.umask = function () {
              return 0;
            });
        },
      },
      e = {};
    function r(n) {
      var i = e[n];
      if (void 0 !== i) return i.exports;
      var s = (e[n] = { exports: {} });
      return t[n].call(s.exports, s, s.exports, r), s.exports;
    }
    (r.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, { a: e }), e;
    }),
      (r.d = (t, e) => {
        for (var n in e)
          r.o(e, n) &&
            !r.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
      }),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      });
    var n = {};
    return (
      (() => {
        "use strict";
        r.r(n);
        var t = r(924),
          e = r(907);
        void 0 === e
          ? (window.process = {
              hrtime: function (t) {
                const e = Date.now() / 1e3;
                if (t) {
                  const r = e - t[0],
                    n = 1e9 * (r - Math.floor(r));
                  return [Math.floor(r), Math.floor(n)];
                }
                return [Math.floor(e), (e % 1) * 1e9];
              },
            })
          : void 0 === e.hrtime &&
            (e.hrtime = function (t) {
              const e = Date.now() / 1e3;
              if (t) {
                const r = e - t[0],
                  n = 1e9 * (r - Math.floor(r));
                return [Math.floor(r), Math.floor(n)];
              }
              return [Math.floor(e), (e % 1) * 1e9];
            }),
          (self.onmessage = (e) => {
            const { support: r, transactionsFile: n } = e.data,
              i = new FileReader();
            (i.onload = () => {
              const e = i.result
                  .trim()
                  .split("\n")
                  .map((t) => t.split(" ").map((t) => t.trim())),
                n = performance.now();
              new t.FPGrowth(r)
                .exec(e)
                .then((t) => {
                  const e = performance.now(),
                    i = Math.round(e - n),
                    s = t
                      .map((t) => `${t.items.join(" ")} : ${t.support}`)
                      .join("\n"),
                    o = new Blob([s], { type: "text/plain" }),
                    u = new File([o], `fp-growth-${r}-${i}.txt`, {
                      type: "text/plain",
                    });
                  self.postMessage({
                    quantity: t.length,
                    runTime: i,
                    itemsetsFile: u,
                  });
                })
                .catch((t) => {
                  self.postMessage({ error: t.message });
                });
            }),
              (i.onerror = () => {
                self.postMessage({
                  error: "Failed to read the transactions file.",
                });
              }),
              i.readAsText(n);
          });
      })(),
      n
    );
  })(),
);
