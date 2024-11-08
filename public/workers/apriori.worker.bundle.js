!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var r = t();
    for (var n in r) ("object" == typeof exports ? exports : e)[n] = r[n];
  }
})(self, () =>
  (() => {
    var e = {
        46: (e) => {
          function t() {
            (this._events = this._events || {}),
              (this._maxListeners = this._maxListeners || void 0);
          }
          function r(e) {
            return "function" == typeof e;
          }
          function n(e) {
            return "object" == typeof e && null !== e;
          }
          function i(e) {
            return void 0 === e;
          }
          (e.exports = t),
            (t.EventEmitter = t),
            (t.prototype._events = void 0),
            (t.prototype._maxListeners = void 0),
            (t.defaultMaxListeners = 10),
            (t.prototype.setMaxListeners = function (e) {
              if ("number" != typeof e || e < 0 || isNaN(e))
                throw TypeError("n must be a positive number");
              return (this._maxListeners = e), this;
            }),
            (t.prototype.emit = function (e) {
              var t, s, o, u, a, c;
              if (
                (this._events || (this._events = {}),
                "error" === e &&
                  (!this._events.error ||
                    (n(this._events.error) && !this._events.error.length)))
              ) {
                if ((t = arguments[1]) instanceof Error) throw t;
                var f = new Error(
                  'Uncaught, unspecified "error" event. (' + t + ")",
                );
                throw ((f.context = t), f);
              }
              if (i((s = this._events[e]))) return !1;
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
                    o = (c = s.slice()).length,
                    a = 0;
                  a < o;
                  a++
                )
                  c[a].apply(this, u);
              return !0;
            }),
            (t.prototype.addListener = function (e, s) {
              var o;
              if (!r(s)) throw TypeError("listener must be a function");
              return (
                this._events || (this._events = {}),
                this._events.newListener &&
                  this.emit("newListener", e, r(s.listener) ? s.listener : s),
                this._events[e]
                  ? n(this._events[e])
                    ? this._events[e].push(s)
                    : (this._events[e] = [this._events[e], s])
                  : (this._events[e] = s),
                n(this._events[e]) &&
                  !this._events[e].warned &&
                  (o = i(this._maxListeners)
                    ? t.defaultMaxListeners
                    : this._maxListeners) &&
                  o > 0 &&
                  this._events[e].length > o &&
                  ((this._events[e].warned = !0),
                  console.error(
                    "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                    this._events[e].length,
                  ),
                  "function" == typeof console.trace && console.trace()),
                this
              );
            }),
            (t.prototype.on = t.prototype.addListener),
            (t.prototype.once = function (e, t) {
              if (!r(t)) throw TypeError("listener must be a function");
              var n = !1;
              function i() {
                this.removeListener(e, i),
                  n || ((n = !0), t.apply(this, arguments));
              }
              return (i.listener = t), this.on(e, i), this;
            }),
            (t.prototype.removeListener = function (e, t) {
              var i, s, o, u;
              if (!r(t)) throw TypeError("listener must be a function");
              if (!this._events || !this._events[e]) return this;
              if (
                ((o = (i = this._events[e]).length),
                (s = -1),
                i === t || (r(i.listener) && i.listener === t))
              )
                delete this._events[e],
                  this._events.removeListener &&
                    this.emit("removeListener", e, t);
              else if (n(i)) {
                for (u = o; u-- > 0; )
                  if (i[u] === t || (i[u].listener && i[u].listener === t)) {
                    s = u;
                    break;
                  }
                if (s < 0) return this;
                1 === i.length
                  ? ((i.length = 0), delete this._events[e])
                  : i.splice(s, 1),
                  this._events.removeListener &&
                    this.emit("removeListener", e, t);
              }
              return this;
            }),
            (t.prototype.removeAllListeners = function (e) {
              var t, n;
              if (!this._events) return this;
              if (!this._events.removeListener)
                return (
                  0 === arguments.length
                    ? (this._events = {})
                    : this._events[e] && delete this._events[e],
                  this
                );
              if (0 === arguments.length) {
                for (t in this._events)
                  "removeListener" !== t && this.removeAllListeners(t);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = {}),
                  this
                );
              }
              if (r((n = this._events[e]))) this.removeListener(e, n);
              else if (n)
                for (; n.length; ) this.removeListener(e, n[n.length - 1]);
              return delete this._events[e], this;
            }),
            (t.prototype.listeners = function (e) {
              return this._events && this._events[e]
                ? r(this._events[e])
                  ? [this._events[e]]
                  : this._events[e].slice()
                : [];
            }),
            (t.prototype.listenerCount = function (e) {
              if (this._events) {
                var t = this._events[e];
                if (r(t)) return 1;
                if (t) return t.length;
              }
              return 0;
            }),
            (t.listenerCount = function (e, t) {
              return e.listenerCount(t);
            });
        },
        644: function (e, t, r) {
          "use strict";
          var n,
            i = r(907),
            s =
              (this && this.__extends) ||
              ((n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t;
                  }) ||
                function (e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                }),
              function (e, t) {
                function r() {
                  this.constructor = e;
                }
                n(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((r.prototype = t.prototype), new r()));
              });
          Object.defineProperty(t, "__esModule", { value: !0 });
          var o = (function (e) {
            function t(t) {
              var r = e.call(this) || this;
              return (r._support = t), r;
            }
            return (
              s(t, e),
              (t.prototype.exec = function (e, t) {
                var r = this;
                return (
                  (this._transactions = e),
                  new Promise(function (e, n) {
                    for (
                      var s = i.hrtime(),
                        o = [r.getFrequentOneItemsets(r._transactions)],
                        u = 0;
                      o[u].length > 0;

                    )
                      o.push(r.getFrequentKItemsets(o[u])), u++;
                    var a = i.hrtime(s),
                      c = {
                        itemsets: [].concat.apply([], o),
                        executionTime: Math.round(1e3 * a[0] + a[1] / 1e6),
                      };
                    t && t(c), e(c);
                  })
                );
              }),
              (t.prototype.getFrequentOneItemsets = function (e) {
                var t = this,
                  r = this._getDistinctItemsCount(e);
                return Object.keys(r).reduce(function (n, i) {
                  if (r[i] >= e.length * t._support) {
                    var s = { support: r[i], items: [JSON.parse(i)] };
                    n.push(s), t.emit("data", s);
                  }
                  return n;
                }, []);
              }),
              (t.prototype.getFrequentKItemsets = function (e) {
                var t = this;
                if (!e.length) return [];
                var r = e[0].items.length + 1,
                  n = e
                    .reduce(function (e, t) {
                      return e.concat(t.items);
                    }, [])
                    .filter(function (e, t, r) {
                      return r.indexOf(e) === t;
                    });
                return this._getCandidatesCount(
                  this._generateKCandidates(n, r),
                ).filter(function (e) {
                  var r = e.support >= t._transactions.length * t._support;
                  return r && t.emit("data", e), r;
                });
              }),
              (t.prototype._generateKCandidates = function (e, t) {
                if (t > e.length || t <= 0) return [];
                if (t == e.length) return [{ items: e, support: 0 }];
                if (1 == t)
                  return e.map(function (e) {
                    return { items: [e], support: 0 };
                  });
                for (
                  var r = [],
                    n = function (n) {
                      var s = e.slice(n, n + 1);
                      i._generateKCandidates(e.slice(n + 1), t - 1).forEach(
                        function (e) {
                          return r.push({
                            items: s.concat(e.items),
                            support: 0,
                          });
                        },
                      );
                    },
                    i = this,
                    s = 0;
                  s < e.length - t + 1;
                  s++
                )
                  n(s);
                return r;
              }),
              (t.prototype._getCandidatesCount = function (e) {
                return (
                  this._transactions.forEach(function (t) {
                    e.forEach(function (e) {
                      e.items.every(function (e) {
                        return -1 !== t.indexOf(e);
                      }) && (e.support += 1);
                    });
                  }),
                  e
                );
              }),
              (t.prototype._getDistinctItemsCount = function (e) {
                return e.reduce(function (e, t) {
                  return t.reduce(function (e, t) {
                    return (
                      (e[JSON.stringify(t)] = (e[JSON.stringify(t)] || 0) + 1),
                      e
                    );
                  }, e);
                }, {});
              }),
              t
            );
          })(r(46).EventEmitter);
          t.Apriori = o;
        },
        907: (e) => {
          var t,
            r,
            n = (e.exports = {});
          function i() {
            throw new Error("setTimeout has not been defined");
          }
          function s() {
            throw new Error("clearTimeout has not been defined");
          }
          function o(e) {
            if (t === setTimeout) return setTimeout(e, 0);
            if ((t === i || !t) && setTimeout)
              return (t = setTimeout), setTimeout(e, 0);
            try {
              return t(e, 0);
            } catch (r) {
              try {
                return t.call(null, e, 0);
              } catch (r) {
                return t.call(this, e, 0);
              }
            }
          }
          !(function () {
            try {
              t = "function" == typeof setTimeout ? setTimeout : i;
            } catch (e) {
              t = i;
            }
            try {
              r = "function" == typeof clearTimeout ? clearTimeout : s;
            } catch (e) {
              r = s;
            }
          })();
          var u,
            a = [],
            c = !1,
            f = -1;
          function h() {
            c &&
              u &&
              ((c = !1),
              u.length ? (a = u.concat(a)) : (f = -1),
              a.length && l());
          }
          function l() {
            if (!c) {
              var e = o(h);
              c = !0;
              for (var t = a.length; t; ) {
                for (u = a, a = []; ++f < t; ) u && u[f].run();
                (f = -1), (t = a.length);
              }
              (u = null),
                (c = !1),
                (function (e) {
                  if (r === clearTimeout) return clearTimeout(e);
                  if ((r === s || !r) && clearTimeout)
                    return (r = clearTimeout), clearTimeout(e);
                  try {
                    return r(e);
                  } catch (t) {
                    try {
                      return r.call(null, e);
                    } catch (t) {
                      return r.call(this, e);
                    }
                  }
                })(e);
            }
          }
          function p(e, t) {
            (this.fun = e), (this.array = t);
          }
          function v() {}
          (n.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            a.push(new p(e, t)), 1 !== a.length || c || o(l);
          }),
            (p.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (n.title = "browser"),
            (n.browser = !0),
            (n.env = {}),
            (n.argv = []),
            (n.version = ""),
            (n.versions = {}),
            (n.on = v),
            (n.addListener = v),
            (n.once = v),
            (n.off = v),
            (n.removeListener = v),
            (n.removeAllListeners = v),
            (n.emit = v),
            (n.prependListener = v),
            (n.prependOnceListener = v),
            (n.listeners = function (e) {
              return [];
            }),
            (n.binding = function (e) {
              throw new Error("process.binding is not supported");
            }),
            (n.cwd = function () {
              return "/";
            }),
            (n.chdir = function (e) {
              throw new Error("process.chdir is not supported");
            }),
            (n.umask = function () {
              return 0;
            });
        },
      },
      t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var s = (t[n] = { exports: {} });
      return e[n].call(s.exports, s, s.exports, r), s.exports;
    }
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
      (r.d = (e, t) => {
        for (var n in t)
          r.o(t, n) &&
            !r.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var n = {};
    return (
      (() => {
        "use strict";
        r.r(n);
        var e = r(644),
          t = r(907);
        void 0 === t
          ? (window.process = {
              hrtime: function (e) {
                const t = Date.now() / 1e3;
                if (e) {
                  const r = t - e[0],
                    n = 1e9 * (r - Math.floor(r));
                  return [Math.floor(r), Math.floor(n)];
                }
                return [Math.floor(t), (t % 1) * 1e9];
              },
            })
          : void 0 === t.hrtime &&
            (t.hrtime = function (e) {
              const t = Date.now() / 1e3;
              if (e) {
                const r = t - e[0],
                  n = 1e9 * (r - Math.floor(r));
                return [Math.floor(r), Math.floor(n)];
              }
              return [Math.floor(t), (t % 1) * 1e9];
            }),
          (self.onmessage = (t) => {
            const { support: r, transactionsFile: n } = t.data,
              i = new FileReader();
            (i.onload = () => {
              const t = i.result
                .trim()
                .split("\n")
                .map((e) => e.split(" ").map((e) => e.trim()));
              new e.Apriori(r)
                .exec(t)
                .then((e) => {
                  const t = e.itemsets.map((e) => e.items.join(" ")).join("\n"),
                    r = new Blob([t], { type: "text/plain" }),
                    n = new File([r], "frequent-itemsets.txt", {
                      type: "text/plain",
                    });
                  self.postMessage({
                    quantity: e.itemsets.length,
                    itemsetsFile: n,
                  });
                })
                .catch((e) => {
                  self.postMessage({ error: e.message });
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
