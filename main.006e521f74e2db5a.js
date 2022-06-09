(self.webpackChunkchat_angular_app =
  self.webpackChunkchat_angular_app || []).push([
  [179],
  {
    470: (U, v, V) => {
      "use strict";
      function H(e) {
        return "function" == typeof e;
      }
      function N(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const w = N(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, a) => `${a + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function b(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class _ {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (H(r))
              try {
                r();
              } catch (i) {
                t = i instanceof w ? i.errors : [i];
              }
            const { _finalizers: a } = this;
            if (a) {
              this._finalizers = null;
              for (const i of a)
                try {
                  h(i);
                } catch (o) {
                  (t = t ?? []),
                    o instanceof w ? (t = [...t, ...o.errors]) : t.push(o);
                }
            }
            if (t) throw new w(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) h(t);
            else {
              if (t instanceof _) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && b(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && b(n, t), t instanceof _ && t._removeParent(this);
        }
      }
      _.EMPTY = (() => {
        const e = new _();
        return (e.closed = !0), e;
      })();
      const z = _.EMPTY;
      function S(e) {
        return (
          e instanceof _ ||
          (e && "closed" in e && H(e.remove) && H(e.add) && H(e.unsubscribe))
        );
      }
      function h(e) {
        H(e) ? e() : e.unsubscribe();
      }
      const M = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        m = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = m;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = m;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function p(e) {
        m.setTimeout(() => {
          const { onUnhandledError: t } = M;
          if (!t) throw e;
          t(e);
        });
      }
      function u() {}
      const L = E("C", void 0, void 0);
      function E(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let R = null;
      function Q(e) {
        if (M.useDeprecatedSynchronousErrorHandling) {
          const t = !R;
          if ((t && (R = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = R;
            if (((R = null), n)) throw r;
          }
        } else e();
      }
      class P extends _ {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), S(t) && t.add(this))
              : (this.destination = V2);
        }
        static create(t, n, r) {
          return new J(t, n, r);
        }
        next(t) {
          this.isStopped
            ? L2(
                (function B(e) {
                  return E("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? L2(
                (function D(e) {
                  return E("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? L2(L, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const j = Function.prototype.bind;
      function Y(e, t) {
        return j.call(e, t);
      }
      class X {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              l2(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              l2(r);
            }
          else l2(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              l2(n);
            }
        }
      }
      class J extends P {
        constructor(t, n, r) {
          let a;
          if ((super(), H(t) || !t))
            a = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && M.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (a = {
                  next: t.next && Y(t.next, i),
                  error: t.error && Y(t.error, i),
                  complete: t.complete && Y(t.complete, i),
                }))
              : (a = t);
          }
          this.destination = new X(a);
        }
      }
      function l2(e) {
        M.useDeprecatedSynchronousErrorHandling
          ? (function b2(e) {
              M.useDeprecatedSynchronousErrorHandling &&
                R &&
                ((R.errorThrown = !0), (R.error = e));
            })(e)
          : p(e);
      }
      function L2(e, t) {
        const { onStoppedNotification: n } = M;
        n && m.setTimeout(() => n(e, t));
      }
      const V2 = {
          closed: !0,
          next: u,
          error: function M2(e) {
            throw e;
          },
          complete: u,
        },
        G2 =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function T2(e) {
        return e;
      }
      let N2 = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, a) {
            const i = (function zH(e) {
              return (
                (e && e instanceof P) ||
                ((function HH(e) {
                  return e && H(e.next) && H(e.error) && H(e.complete);
                })(e) &&
                  S(e))
              );
            })(n)
              ? n
              : new J(n, r, a);
            return (
              Q(() => {
                const { operator: o, source: s } = this;
                i.add(
                  o
                    ? o.call(i, s)
                    : s
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = pi(r))((a, i) => {
              const o = new J({
                next: (s) => {
                  try {
                    n(s);
                  } catch (c) {
                    i(c), o.unsubscribe();
                  }
                },
                error: i,
                complete: a,
              });
              this.subscribe(o);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [G2]() {
            return this;
          }
          pipe(...n) {
            return (function x3(e) {
              return 0 === e.length
                ? T2
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, a) => a(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = pi(n))((r, a) => {
              let i;
              this.subscribe(
                (o) => (i = o),
                (o) => a(o),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function pi(e) {
        var t;
        return null !== (t = e ?? M.Promise) && void 0 !== t ? t : Promise;
      }
      const wH = N(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let _3 = (() => {
        class e extends N2 {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new mi(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new wH();
          }
          next(n) {
            Q(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Q(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Q(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: a, observers: i } = this;
            return r || a
              ? z
              : ((this.currentObservers = null),
                i.push(n),
                new _(() => {
                  (this.currentObservers = null), b(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: a, isStopped: i } = this;
            r ? n.error(a) : i && n.complete();
          }
          asObservable() {
            const n = new N2();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new mi(t, n)), e;
      })();
      class mi extends _3 {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : z;
        }
      }
      function gi(e) {
        return H(e?.lift);
      }
      function g1(e) {
        return (t) => {
          if (gi(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function p1(e, t, n, r, a) {
        return new bH(e, t, n, r, a);
      }
      class bH extends P {
        constructor(t, n, r, a, i, o) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = o),
            (this._next = n
              ? function (s) {
                  try {
                    n(s);
                  } catch (c) {
                    t.error(c);
                  }
                }
              : super._next),
            (this._error = a
              ? function (s) {
                  try {
                    a(s);
                  } catch (c) {
                    t.error(c);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (s) {
                    t.error(s);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function S2(e, t) {
        return g1((n, r) => {
          let a = 0;
          n.subscribe(
            p1(r, (i) => {
              r.next(e.call(t, i, a++));
            })
          );
        });
      }
      function O4(e) {
        return this instanceof O4 ? ((this.v = e), this) : new O4(e);
      }
      function xH(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var a,
          r = n.apply(e, t || []),
          i = [];
        return (
          (a = {}),
          o("next"),
          o("throw"),
          o("return"),
          (a[Symbol.asyncIterator] = function () {
            return this;
          }),
          a
        );
        function o(d) {
          r[d] &&
            (a[d] = function (g) {
              return new Promise(function (y, x) {
                i.push([d, g, y, x]) > 1 || s(d, g);
              });
            });
        }
        function s(d, g) {
          try {
            !(function c(d) {
              d.value instanceof O4
                ? Promise.resolve(d.value.v).then(l, C)
                : f(i[0][2], d);
            })(r[d](g));
          } catch (y) {
            f(i[0][3], y);
          }
        }
        function l(d) {
          s("next", d);
        }
        function C(d) {
          s("throw", d);
        }
        function f(d, g) {
          d(g), i.shift(), i.length && s(i[0][0], i[0][1]);
        }
      }
      function _H(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Li(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (o) {
              return new Promise(function (s, c) {
                !(function a(i, o, s, c) {
                  Promise.resolve(c).then(function (l) {
                    i({ value: l, done: s });
                  }, o);
                })(s, c, (o = e[i](o)).done, o.value);
              });
            };
        }
      }
      const Vi = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function yi(e) {
        return H(e?.then);
      }
      function Hi(e) {
        return H(e[G2]);
      }
      function zi(e) {
        return Symbol.asyncIterator && H(e?.[Symbol.asyncIterator]);
      }
      function wi(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const bi = (function AH() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Si(e) {
        return H(e?.[bi]);
      }
      function Di(e) {
        return xH(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: a } = yield O4(n.read());
              if (a) return yield O4(void 0);
              yield yield O4(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function xi(e) {
        return H(e?.getReader);
      }
      function N3(e) {
        if (e instanceof N2) return e;
        if (null != e) {
          if (Hi(e))
            return (function EH(e) {
              return new N2((t) => {
                const n = e[G2]();
                if (H(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Vi(e))
            return (function kH(e) {
              return new N2((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (yi(e))
            return (function TH(e) {
              return new N2((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, p);
              });
            })(e);
          if (zi(e)) return _i(e);
          if (Si(e))
            return (function FH(e) {
              return new N2((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (xi(e))
            return (function IH(e) {
              return _i(Di(e));
            })(e);
        }
        throw wi(e);
      }
      function _i(e) {
        return new N2((t) => {
          (function PH(e, t) {
            var n, r, a, i;
            return (function SH(e, t, n, r) {
              return new (n || (n = Promise))(function (i, o) {
                function s(C) {
                  try {
                    l(r.next(C));
                  } catch (f) {
                    o(f);
                  }
                }
                function c(C) {
                  try {
                    l(r.throw(C));
                  } catch (f) {
                    o(f);
                  }
                }
                function l(C) {
                  C.done
                    ? i(C.value)
                    : (function a(i) {
                        return i instanceof n
                          ? i
                          : new n(function (o) {
                              o(i);
                            });
                      })(C.value).then(s, c);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = _H(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (o) {
                a = { error: o };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (a) throw a.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function X3(e, t, n, r = 0, a = !1) {
        const i = t.schedule(function () {
          n(), a ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !a)) return i;
      }
      function v1(e, t, n = 1 / 0) {
        return H(t)
          ? v1((r, a) => S2((i, o) => t(r, i, a, o))(N3(e(r, a))), n)
          : ("number" == typeof t && (n = t),
            g1((r, a) =>
              (function RH(e, t, n, r, a, i, o, s) {
                const c = [];
                let l = 0,
                  C = 0,
                  f = !1;
                const d = () => {
                    f && !c.length && !l && t.complete();
                  },
                  g = (x) => (l < r ? y(x) : c.push(x)),
                  y = (x) => {
                    i && t.next(x), l++;
                    let F = !1;
                    N3(n(x, C++)).subscribe(
                      p1(
                        t,
                        (k) => {
                          a?.(k), i ? g(k) : t.next(k);
                        },
                        () => {
                          F = !0;
                        },
                        void 0,
                        () => {
                          if (F)
                            try {
                              for (l--; c.length && l < r; ) {
                                const k = c.shift();
                                o ? X3(t, o, () => y(k)) : y(k);
                              }
                              d();
                            } catch (k) {
                              t.error(k);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    p1(t, g, () => {
                      (f = !0), d();
                    })
                  ),
                  () => {
                    s?.();
                  }
                );
              })(r, a, e, n)
            ));
      }
      function u6(e = 1 / 0) {
        return v1(T2, e);
      }
      const J3 = new N2((e) => e.complete());
      function wt(e) {
        return e[e.length - 1];
      }
      function Ni(e) {
        return H(wt(e)) ? e.pop() : void 0;
      }
      function d5(e) {
        return (function BH(e) {
          return e && H(e.schedule);
        })(wt(e))
          ? e.pop()
          : void 0;
      }
      function Ai(e, t = 0) {
        return g1((n, r) => {
          n.subscribe(
            p1(
              r,
              (a) => X3(r, e, () => r.next(a), t),
              () => X3(r, e, () => r.complete(), t),
              (a) => X3(r, e, () => r.error(a), t)
            )
          );
        });
      }
      function Ei(e, t = 0) {
        return g1((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function ki(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new N2((n) => {
          X3(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            X3(
              n,
              t,
              () => {
                r.next().then((a) => {
                  a.done ? n.complete() : n.next(a.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function c1(e, t) {
        return t
          ? (function YH(e, t) {
              if (null != e) {
                if (Hi(e))
                  return (function jH(e, t) {
                    return N3(e).pipe(Ei(t), Ai(t));
                  })(e, t);
                if (Vi(e))
                  return (function GH(e, t) {
                    return new N2((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (yi(e))
                  return (function $H(e, t) {
                    return N3(e).pipe(Ei(t), Ai(t));
                  })(e, t);
                if (zi(e)) return ki(e, t);
                if (Si(e))
                  return (function qH(e, t) {
                    return new N2((n) => {
                      let r;
                      return (
                        X3(n, t, () => {
                          (r = e[bi]()),
                            X3(
                              n,
                              t,
                              () => {
                                let a, i;
                                try {
                                  ({ value: a, done: i } = r.next());
                                } catch (o) {
                                  return void n.error(o);
                                }
                                i ? n.complete() : n.next(a);
                              },
                              0,
                              !0
                            );
                        }),
                        () => H(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (xi(e))
                  return (function WH(e, t) {
                    return ki(Di(e), t);
                  })(e, t);
              }
              throw wi(e);
            })(e, t)
          : N3(e);
      }
      function h5(e) {
        return e <= 0
          ? () => J3
          : g1((t, n) => {
              let r = 0;
              t.subscribe(
                p1(n, (a) => {
                  ++r <= e && (n.next(a), e <= r && n.complete());
                })
              );
            });
      }
      function Ti(e = {}) {
        const {
          connector: t = () => new _3(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: a = !0,
        } = e;
        return (i) => {
          let o = null,
            s = null,
            c = null,
            l = 0,
            C = !1,
            f = !1;
          const d = () => {
              s?.unsubscribe(), (s = null);
            },
            g = () => {
              d(), (o = c = null), (C = f = !1);
            },
            y = () => {
              const x = o;
              g(), x?.unsubscribe();
            };
          return g1((x, F) => {
            l++, !f && !C && d();
            const k = (c = c ?? t());
            F.add(() => {
              l--, 0 === l && !f && !C && (s = bt(y, a));
            }),
              k.subscribe(F),
              o ||
                ((o = new J({
                  next: (O) => k.next(O),
                  error: (O) => {
                    (f = !0), d(), (s = bt(g, n, O)), k.error(O);
                  },
                  complete: () => {
                    (C = !0), d(), (s = bt(g, r)), k.complete();
                  },
                })),
                c1(x).subscribe(o));
          })(i);
        };
      }
      function bt(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(h5(1))
              .subscribe(() => e());
      }
      function I2(e) {
        for (let t in e) if (e[t] === I2) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function St(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function P2(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(P2).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Dt(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const QH = I2({ __forward_ref__: I2 });
      function O2(e) {
        return (
          (e.__forward_ref__ = O2),
          (e.toString = function () {
            return P2(this());
          }),
          e
        );
      }
      function c2(e) {
        return xt(e) ? e() : e;
      }
      function xt(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(QH) &&
          e.__forward_ref__ === O2
        );
      }
      class p2 extends Error {
        constructor(t, n) {
          super(
            (function Ge(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function f2(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function qe(e, t) {
        throw new p2(-201, !1);
      }
      function q1(e, t) {
        null == e &&
          (function A2(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function e2(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function V1(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function _t(e) {
        return Fi(e, We) || Fi(e, Pi);
      }
      function Fi(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Ii(e) {
        return e && (e.hasOwnProperty(Nt) || e.hasOwnProperty(az))
          ? e[Nt]
          : null;
      }
      const We = I2({ ɵprov: I2 }),
        Nt = I2({ ɵinj: I2 }),
        Pi = I2({ ngInjectableDef: I2 }),
        az = I2({ ngInjectorDef: I2 });
      var r2 = (() => (
        ((r2 = r2 || {})[(r2.Default = 0)] = "Default"),
        (r2[(r2.Host = 1)] = "Host"),
        (r2[(r2.Self = 2)] = "Self"),
        (r2[(r2.SkipSelf = 4)] = "SkipSelf"),
        (r2[(r2.Optional = 8)] = "Optional"),
        r2
      ))();
      let At;
      function A3(e) {
        const t = At;
        return (At = e), t;
      }
      function Ri(e, t, n) {
        const r = _t(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & r2.Optional
          ? null
          : void 0 !== t
          ? t
          : void qe(P2(e));
      }
      function V4(e) {
        return { toString: e }.toString();
      }
      var f3 = (() => (
          ((f3 = f3 || {})[(f3.OnPush = 0)] = "OnPush"),
          (f3[(f3.Default = 1)] = "Default"),
          f3
        ))(),
        E3 = (() => {
          return (
            ((e = E3 || (E3 = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            E3
          );
          var e;
        })();
      const F2 = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        d6 = {},
        x2 = [],
        Ye = I2({ ɵcmp: I2 }),
        Et = I2({ ɵdir: I2 }),
        kt = I2({ ɵpipe: I2 }),
        Oi = I2({ ɵmod: I2 }),
        e4 = I2({ ɵfac: I2 }),
        p5 = I2({ __NG_ELEMENT_ID__: I2 });
      let oz = 0;
      function k3(e) {
        return V4(() => {
          const n = !0 === e.standalone,
            r = {},
            a = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === f3.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || x2,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || E3.Emulated,
              id: "c",
              styles: e.styles || x2,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            o = e.features;
          return (
            (a.id += oz++),
            (a.inputs = ji(e.inputs, r)),
            (a.outputs = ji(e.outputs)),
            o && o.forEach((s) => s(a)),
            (a.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Bi).filter(Ui)
              : null),
            (a.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(N1).filter(Ui)
              : null),
            a
          );
        });
      }
      function Bi(e) {
        return R2(e) || _1(e);
      }
      function Ui(e) {
        return null !== e;
      }
      const cz = {};
      function x1(e) {
        return V4(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || x2,
            declarations: e.declarations || x2,
            imports: e.imports || x2,
            exports: e.exports || x2,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (cz[e.id] = e.type), t;
        });
      }
      function ji(e, t) {
        if (null == e) return d6;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let a = e[r],
              i = a;
            Array.isArray(a) && ((i = a[1]), (a = a[0])),
              (n[a] = r),
              t && (t[a] = i);
          }
        return n;
      }
      const a2 = k3;
      function R2(e) {
        return e[Ye] || null;
      }
      function _1(e) {
        return e[Et] || null;
      }
      function N1(e) {
        return e[kt] || null;
      }
      function W1(e, t) {
        const n = e[Oi] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${P2(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function U1(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function d3(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function It(e) {
        return 0 != (8 & e.flags);
      }
      function Je(e) {
        return 2 == (2 & e.flags);
      }
      function Ze(e) {
        return 1 == (1 & e.flags);
      }
      function h3(e) {
        return null !== e.template;
      }
      function dz(e) {
        return 0 != (256 & e[2]);
      }
      function G4(e, t) {
        return e.hasOwnProperty(e4) ? e[e4] : null;
      }
      class mz {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function E1() {
        return qi;
      }
      function qi(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = vz), gz;
      }
      function gz() {
        const e = Yi(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === d6) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function vz(e, t, n, r) {
        const a =
            Yi(e) ||
            (function Mz(e, t) {
              return (e[Wi] = t);
            })(e, { previous: d6, current: null }),
          i = a.current || (a.current = {}),
          o = a.previous,
          s = this.declaredInputs[n],
          c = o[s];
        (i[s] = new mz(c && c.currentValue, t, o === d6)), (e[r] = t);
      }
      E1.ngInherit = !0;
      const Wi = "__ngSimpleChanges__";
      function Yi(e) {
        return e[Wi] || null;
      }
      let Ut;
      function jt() {
        return void 0 !== Ut ? Ut : typeof document < "u" ? document : void 0;
      }
      function X2(e) {
        return !!e.listen;
      }
      const Ki = { createRenderer: (e, t) => jt() };
      function r1(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function e8(e, t) {
        return r1(t[e]);
      }
      function i3(e, t) {
        return r1(t[e.index]);
      }
      function $t(e, t) {
        return e.data[t];
      }
      function K1(e, t) {
        const n = t[e];
        return U1(n) ? n : n[0];
      }
      function Qi(e) {
        return 4 == (4 & e[2]);
      }
      function Gt(e) {
        return 64 == (64 & e[2]);
      }
      function y4(e, t) {
        return null == t ? null : e[t];
      }
      function Xi(e) {
        e[18] = 0;
      }
      function qt(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const C2 = { lFrame: oo(null), bindingsEnabled: !0 };
      function Zi() {
        return C2.bindingsEnabled;
      }
      function I() {
        return C2.lFrame.lView;
      }
      function z2() {
        return C2.lFrame.tView;
      }
      function M5(e) {
        return (C2.lFrame.contextLView = e), e[8];
      }
      function L5(e) {
        return (C2.lFrame.contextLView = null), e;
      }
      function l1() {
        let e = eo();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function eo() {
        return C2.lFrame.currentTNode;
      }
      function T3(e, t) {
        const n = C2.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Wt() {
        return C2.lFrame.isParent;
      }
      function Yt() {
        C2.lFrame.isParent = !1;
      }
      function M6() {
        return C2.lFrame.bindingIndex++;
      }
      function Fz(e, t) {
        const n = C2.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Kt(t);
      }
      function Kt(e) {
        C2.lFrame.currentDirectiveIndex = e;
      }
      function ro() {
        return C2.lFrame.currentQueryIndex;
      }
      function Xt(e) {
        C2.lFrame.currentQueryIndex = e;
      }
      function Pz(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function ao(e, t, n) {
        if (n & r2.SkipSelf) {
          let a = t,
            i = e;
          for (
            ;
            !((a = a.parent),
            null !== a ||
              n & r2.Host ||
              ((a = Pz(i)), null === a || ((i = i[15]), 10 & a.type)));

          );
          if (null === a) return !1;
          (t = a), (e = i);
        }
        const r = (C2.lFrame = io());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function n8(e) {
        const t = io(),
          n = e[1];
        (C2.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function io() {
        const e = C2.lFrame,
          t = null === e ? null : e.child;
        return null === t ? oo(e) : t;
      }
      function oo(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function so() {
        const e = C2.lFrame;
        return (
          (C2.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const co = so;
      function r8() {
        const e = so();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function T1() {
        return C2.lFrame.selectedIndex;
      }
      function H4(e) {
        C2.lFrame.selectedIndex = e;
      }
      function J2() {
        const e = C2.lFrame;
        return $t(e.tView, e.selectedIndex);
      }
      function a8(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: s,
              ngAfterViewInit: c,
              ngAfterViewChecked: l,
              ngOnDestroy: C,
            } = i;
          o && (e.contentHooks || (e.contentHooks = [])).push(-n, o),
            s &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, s),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, s)),
            c && (e.viewHooks || (e.viewHooks = [])).push(-n, c),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != C && (e.destroyHooks || (e.destroyHooks = [])).push(n, C);
        }
      }
      function i8(e, t, n) {
        lo(e, t, 3, n);
      }
      function o8(e, t, n, r) {
        (3 & e[2]) === n && lo(e, t, n, r);
      }
      function Jt(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function lo(e, t, n, r) {
        const i = r ?? -1,
          o = t.length - 1;
        let s = 0;
        for (let c = void 0 !== r ? 65535 & e[18] : 0; c < o; c++)
          if ("number" == typeof t[c + 1]) {
            if (((s = t[c]), null != r && s >= r)) break;
          } else
            t[c] < 0 && (e[18] += 65536),
              (s < i || -1 == i) &&
                (Wz(e, n, t, c), (e[18] = (4294901760 & e[18]) + c + 2)),
              c++;
      }
      function Wz(e, t, n, r) {
        const a = n[r] < 0,
          i = n[r + 1],
          s = e[a ? -n[r] : n[r]];
        if (a) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(s);
            } finally {
            }
          }
        } else
          try {
            i.call(s);
          } finally {
          }
      }
      class y5 {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function s8(e, t, n) {
        const r = X2(e);
        let a = 0;
        for (; a < n.length; ) {
          const i = n[a];
          if ("number" == typeof i) {
            if (0 !== i) break;
            a++;
            const o = n[a++],
              s = n[a++],
              c = n[a++];
            r ? e.setAttribute(t, s, c, o) : t.setAttributeNS(o, s, c);
          } else {
            const o = i,
              s = n[++a];
            en(o)
              ? r && e.setProperty(t, o, s)
              : r
              ? e.setAttribute(t, o, s)
              : t.setAttribute(o, s),
              a++;
          }
        }
        return a;
      }
      function Co(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function en(e) {
        return 64 === e.charCodeAt(0);
      }
      function c8(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const a = t[r];
              "number" == typeof a
                ? (n = a)
                : 0 === n ||
                  fo(e, n, a, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function fo(e, t, n, r, a) {
        let i = 0,
          o = e.length;
        if (-1 === t) o = -1;
        else
          for (; i < e.length; ) {
            const s = e[i++];
            if ("number" == typeof s) {
              if (s === t) {
                o = -1;
                break;
              }
              if (s > t) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const s = e[i];
          if ("number" == typeof s) break;
          if (s === n) {
            if (null === r) return void (null !== a && (e[i + 1] = a));
            if (r === e[i + 1]) return void (e[i + 2] = a);
          }
          i++, null !== r && i++, null !== a && i++;
        }
        -1 !== o && (e.splice(o, 0, t), (i = o + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== a && e.splice(i++, 0, a);
      }
      function uo(e) {
        return -1 !== e;
      }
      function L6(e) {
        return 32767 & e;
      }
      function V6(e, t) {
        let n = (function Jz(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let tn = !0;
      function l8(e) {
        const t = tn;
        return (tn = e), t;
      }
      let Zz = 0;
      const F3 = {};
      function z5(e, t) {
        const n = rn(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          nn(r.data, e),
          nn(t, null),
          nn(r.blueprint, null));
        const a = C8(e, t),
          i = e.injectorIndex;
        if (uo(a)) {
          const o = L6(a),
            s = V6(a, t),
            c = s[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = s[o + l] | c[o + l];
        }
        return (t[i + 8] = a), i;
      }
      function nn(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function rn(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function C8(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          a = t;
        for (; null !== a; ) {
          if (((r = yo(a)), null === r)) return -1;
          if ((n++, (a = a[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function f8(e, t, n) {
        !(function ew(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(p5) && (r = n[p5]),
            null == r && (r = n[p5] = Zz++);
          const a = 255 & r;
          t.data[e + (a >> 5)] |= 1 << a;
        })(e, t, n);
      }
      function mo(e, t, n) {
        if (n & r2.Optional) return e;
        qe();
      }
      function go(e, t, n, r) {
        if (
          (n & r2.Optional && void 0 === r && (r = null),
          0 == (n & (r2.Self | r2.Host)))
        ) {
          const a = e[9],
            i = A3(void 0);
          try {
            return a ? a.get(t, r, n & r2.Optional) : Ri(t, r, n & r2.Optional);
          } finally {
            A3(i);
          }
        }
        return mo(r, 0, n);
      }
      function vo(e, t, n, r = r2.Default, a) {
        if (null !== e) {
          if (1024 & t[2]) {
            const o = (function iw(e, t, n, r, a) {
              let i = e,
                o = t;
              for (
                ;
                null !== i && null !== o && 1024 & o[2] && !(256 & o[2]);

              ) {
                const s = Mo(i, o, n, r | r2.Self, F3);
                if (s !== F3) return s;
                let c = i.parent;
                if (!c) {
                  const l = o[21];
                  if (l) {
                    const C = l.get(n, F3, r);
                    if (C !== F3) return C;
                  }
                  (c = yo(o)), (o = o[15]);
                }
                i = c;
              }
              return a;
            })(e, t, n, r, F3);
            if (o !== F3) return o;
          }
          const i = Mo(e, t, n, r, F3);
          if (i !== F3) return i;
        }
        return go(t, n, r, a);
      }
      function Mo(e, t, n, r, a) {
        const i = (function rw(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(p5) ? e[p5] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : aw) : t;
        })(n);
        if ("function" == typeof i) {
          if (!ao(t, e, r)) return r & r2.Host ? mo(a, 0, r) : go(t, n, r, a);
          try {
            const o = i(r);
            if (null != o || r & r2.Optional) return o;
            qe();
          } finally {
            co();
          }
        } else if ("number" == typeof i) {
          let o = null,
            s = rn(e, t),
            c = -1,
            l = r & r2.Host ? t[16][6] : null;
          for (
            (-1 === s || r & r2.SkipSelf) &&
            ((c = -1 === s ? C8(e, t) : t[s + 8]),
            -1 !== c && Vo(r, !1)
              ? ((o = t[1]), (s = L6(c)), (t = V6(c, t)))
              : (s = -1));
            -1 !== s;

          ) {
            const C = t[1];
            if (Lo(i, s, C.data)) {
              const f = nw(s, t, n, o, r, l);
              if (f !== F3) return f;
            }
            (c = t[s + 8]),
              -1 !== c && Vo(r, t[1].data[s + 8] === l) && Lo(i, s, t)
                ? ((o = C), (s = L6(c)), (t = V6(c, t)))
                : (s = -1);
          }
        }
        return a;
      }
      function nw(e, t, n, r, a, i) {
        const o = t[1],
          s = o.data[e + 8],
          C = u8(
            s,
            o,
            n,
            null == r ? Je(s) && tn : r != o && 0 != (3 & s.type),
            a & r2.Host && i === s
          );
        return null !== C ? w5(t, o, C, s) : F3;
      }
      function u8(e, t, n, r, a) {
        const i = e.providerIndexes,
          o = t.data,
          s = 1048575 & i,
          c = e.directiveStart,
          C = i >> 20,
          d = a ? s + C : e.directiveEnd;
        for (let g = r ? s : s + C; g < d; g++) {
          const y = o[g];
          if ((g < c && n === y) || (g >= c && y.type === n)) return g;
        }
        if (a) {
          const g = o[c];
          if (g && h3(g) && g.type === n) return c;
        }
        return null;
      }
      function w5(e, t, n, r) {
        let a = e[n];
        const i = t.data;
        if (
          (function Yz(e) {
            return e instanceof y5;
          })(a)
        ) {
          const o = a;
          o.resolving &&
            (function XH(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new p2(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function D2(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : f2(e);
              })(i[n])
            );
          const s = l8(o.canSeeViewProviders);
          o.resolving = !0;
          const c = o.injectImpl ? A3(o.injectImpl) : null;
          ao(e, r, r2.Default);
          try {
            (a = e[n] = o.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function qz(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: a,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const o = qi(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o);
                  }
                  a &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, a),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== c && A3(c), l8(s), (o.resolving = !1), co();
          }
        }
        return a;
      }
      function Lo(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Vo(e, t) {
        return !(e & r2.Self || (e & r2.Host && t));
      }
      class y6 {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return vo(this._tNode, this._lView, t, r, n);
        }
      }
      function aw() {
        return new y6(l1(), I());
      }
      function an(e) {
        return xt(e)
          ? () => {
              const t = an(c2(e));
              return t && t();
            }
          : G4(e);
      }
      function yo(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const z6 = "__parameters__";
      function b6(e, t, n) {
        return V4(() => {
          const r = (function on(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const a in r) this[a] = r[a];
              }
            };
          })(t);
          function a(...i) {
            if (this instanceof a) return r.apply(this, i), this;
            const o = new a(...i);
            return (s.annotation = o), s;
            function s(c, l, C) {
              const f = c.hasOwnProperty(z6)
                ? c[z6]
                : Object.defineProperty(c, z6, { value: [] })[z6];
              for (; f.length <= C; ) f.push(null);
              return (f[C] = f[C] || []).push(o), c;
            }
          }
          return (
            n && (a.prototype = Object.create(n.prototype)),
            (a.prototype.ngMetadataName = e),
            (a.annotationCls = a),
            a
          );
        });
      }
      class s2 {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = e2({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const sw = new s2("AnalyzeForEntryComponents");
      function Q1(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), Q1(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function r4(e, t) {
        e.forEach((n) => (Array.isArray(n) ? r4(n, t) : t(n)));
      }
      function zo(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function d8(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function x5(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function X1(e, t, n) {
        let r = S6(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Cw(e, t, n, r) {
                let a = e.length;
                if (a == t) e.push(n, r);
                else if (1 === a) e.push(r, e[0]), (e[0] = n);
                else {
                  for (a--, e.push(e[a - 1], e[a]); a > t; )
                    (e[a] = e[a - 2]), a--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function cn(e, t) {
        const n = S6(e, t);
        if (n >= 0) return e[1 | n];
      }
      function S6(e, t) {
        return (function So(e, t, n) {
          let r = 0,
            a = e.length >> n;
          for (; a !== r; ) {
            const i = r + ((a - r) >> 1),
              o = e[i << n];
            if (t === o) return i << n;
            o > t ? (a = i) : (r = i + 1);
          }
          return ~(a << n);
        })(e, t, 1);
      }
      const _5 = {},
        Cn = "__NG_DI_FLAG__",
        p8 = "ngTempTokenPath",
        vw = /\n/gm,
        Do = "__source";
      let N5;
      function m8(e) {
        const t = N5;
        return (N5 = e), t;
      }
      function Lw(e, t = r2.Default) {
        if (void 0 === N5) throw new p2(-203, "");
        return null === N5
          ? Ri(e, void 0, t)
          : N5.get(e, t & r2.Optional ? null : void 0, t);
      }
      function W(e, t = r2.Default) {
        return (
          (function iz() {
            return At;
          })() || Lw
        )(c2(e), t);
      }
      function fn(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = c2(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new p2(900, "");
            let a,
              i = r2.Default;
            for (let o = 0; o < r.length; o++) {
              const s = r[o],
                c = yw(s);
              "number" == typeof c
                ? -1 === c
                  ? (a = s.token)
                  : (i |= c)
                : (a = s);
            }
            t.push(W(a, i));
          } else t.push(W(r));
        }
        return t;
      }
      function A5(e, t) {
        return (e[Cn] = t), (e.prototype[Cn] = t), e;
      }
      function yw(e) {
        return e[Cn];
      }
      const g8 = A5(
          b6("Inject", (e) => ({ token: e })),
          -1
        ),
        a4 = A5(b6("Optional"), 8),
        E5 = A5(b6("SkipSelf"), 4);
      let L8, V8;
      function x6(e) {
        return (
          (function un() {
            if (void 0 === L8 && ((L8 = null), F2.trustedTypes))
              try {
                L8 = F2.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return L8;
          })()?.createHTML(e) || e
        );
      }
      function Io(e) {
        return (
          (function dn() {
            if (void 0 === V8 && ((V8 = null), F2.trustedTypes))
              try {
                V8 = F2.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return V8;
          })()?.createHTML(e) || e
        );
      }
      class q4 {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class Fw extends q4 {
        getTypeName() {
          return "HTML";
        }
      }
      class Iw extends q4 {
        getTypeName() {
          return "Style";
        }
      }
      class Pw extends q4 {
        getTypeName() {
          return "Script";
        }
      }
      class Rw extends q4 {
        getTypeName() {
          return "URL";
        }
      }
      class Ow extends q4 {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function J1(e) {
        return e instanceof q4 ? e.changingThisBreaksApplicationSecurity : e;
      }
      function I3(e, t) {
        const n = Oo(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(
            `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
          );
        }
        return n === t;
      }
      function Oo(e) {
        return (e instanceof q4 && e.getTypeName()) || null;
      }
      class qw {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const n = new window.DOMParser().parseFromString(
              x6(t),
              "text/html"
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class Ww {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const n = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(n);
            const r = this.inertDocument.createElement("body");
            n.appendChild(r);
          }
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement("template");
          if ("content" in n) return (n.innerHTML = x6(t)), n;
          const r = this.inertDocument.createElement("body");
          return (
            (r.innerHTML = x6(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(r),
            r
          );
        }
        stripCustomNsAttrs(t) {
          const n = t.attributes;
          for (let a = n.length - 1; 0 < a; a--) {
            const o = n.item(a).name;
            ("xmlns:ns1" === o || 0 === o.indexOf("ns1:")) &&
              t.removeAttribute(o);
          }
          let r = t.firstChild;
          for (; r; )
            r.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(r),
              (r = r.nextSibling);
        }
      }
      const Kw =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        Qw =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function F5(e) {
        return (e = String(e)).match(Kw) || e.match(Qw) ? e : "unsafe:" + e;
      }
      function P3(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function I5(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const jo = P3("area,br,col,hr,img,wbr"),
        $o = P3("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Go = P3("rp,rt"),
        hn = I5(
          jo,
          I5(
            $o,
            P3(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          I5(
            Go,
            P3(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          I5(Go, $o)
        ),
        pn = P3("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        mn = P3("srcset"),
        qo = I5(
          pn,
          mn,
          P3(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          P3(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Xw = P3("script,style,template");
      class Jw {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let a = this.checkClobberedElement(n, n.nextSibling);
                if (a) {
                  n = a;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!hn.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !Xw.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = t.attributes;
          for (let a = 0; a < r.length; a++) {
            const i = r.item(a),
              o = i.name,
              s = o.toLowerCase();
            if (!qo.hasOwnProperty(s)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let c = i.value;
            pn[s] && (c = F5(c)),
              mn[s] &&
                ((e = c),
                (c = (e = String(e))
                  .split(",")
                  .map((t) => F5(t.trim()))
                  .join(", "))),
              this.buf.push(" ", o, '="', Wo(c), '"');
          }
          var e;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          hn.hasOwnProperty(n) &&
            !jo.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Wo(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const Zw = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        eb = /([^\#-~ |!])/g;
      function Wo(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(Zw, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(eb, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let y8;
      function Yo(e, t) {
        let n = null;
        try {
          y8 =
            y8 ||
            (function Bo(e) {
              const t = new Ww(e);
              return (function Yw() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    x6(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new qw(t)
                : t;
            })(e);
          let r = t ? String(t) : "";
          n = y8.getInertBodyElement(r);
          let a = 5,
            i = r;
          do {
            if (0 === a)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            a--, (r = i), (i = n.innerHTML), (n = y8.getInertBodyElement(r));
          } while (r !== i);
          return x6(new Jw().sanitizeChildren(gn(n) || n));
        } finally {
          if (n) {
            const r = gn(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function gn(e) {
        return "content" in e &&
          (function tb(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var U2 = (() => (
        ((U2 = U2 || {})[(U2.NONE = 0)] = "NONE"),
        (U2[(U2.HTML = 1)] = "HTML"),
        (U2[(U2.STYLE = 2)] = "STYLE"),
        (U2[(U2.SCRIPT = 3)] = "SCRIPT"),
        (U2[(U2.URL = 4)] = "URL"),
        (U2[(U2.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        U2
      ))();
      function Ko(e) {
        const t = (function P5() {
          const e = I();
          return e && e[12];
        })();
        return t
          ? Io(t.sanitize(U2.HTML, e) || "")
          : I3(e, "HTML")
          ? Io(J1(e))
          : Yo(jt(), f2(e));
      }
      const Mn = new Map();
      let cb = 0;
      const Vn = "__ngContext__";
      function z1(e, t) {
        U1(t)
          ? ((e[Vn] = t[20]),
            (function Cb(e) {
              Mn.set(e[20], e);
            })(t))
          : (e[Vn] = t);
      }
      function R5(e) {
        const t = e[Vn];
        return "number" == typeof t
          ? (function Xo(e) {
              return Mn.get(e) || null;
            })(t)
          : t || null;
      }
      function H8(e) {
        const t = R5(e);
        return t ? (U1(t) ? t : t.lView) : null;
      }
      function Hn(e) {
        return e.ngOriginalError;
      }
      function yb(e, ...t) {
        e.error(...t);
      }
      class _6 {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function Vb(e) {
              return (e && e.ngErrorLogger) || yb;
            })(t);
          r(this._console, "ERROR", t),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Hn(t);
          for (; n && Hn(n); ) n = Hn(n);
          return n || null;
        }
      }
      const Ab = (() =>
        (
          (typeof requestAnimationFrame < "u" && requestAnimationFrame) ||
          setTimeout
        ).bind(F2))();
      function i4(e) {
        return e instanceof Function ? e() : e;
      }
      var Z1 = (() => (
        ((Z1 = Z1 || {})[(Z1.Important = 1)] = "Important"),
        (Z1[(Z1.DashCase = 2)] = "DashCase"),
        Z1
      ))();
      function wn(e, t) {
        return undefined(e, t);
      }
      function O5(e) {
        const t = e[3];
        return d3(t) ? t[3] : t;
      }
      function bn(e) {
        return ss(e[13]);
      }
      function Sn(e) {
        return ss(e[4]);
      }
      function ss(e) {
        for (; null !== e && !d3(e); ) e = e[4];
        return e;
      }
      function A6(e, t, n, r, a) {
        if (null != r) {
          let i,
            o = !1;
          d3(r) ? (i = r) : U1(r) && ((o = !0), (r = r[0]));
          const s = r1(r);
          0 === e && null !== n
            ? null == a
              ? ds(t, n, s)
              : W4(t, n, s, a || null, !0)
            : 1 === e && null !== n
            ? W4(t, n, s, a || null, !0)
            : 2 === e
            ? (function Vs(e, t, n) {
                const r = z8(e, t);
                r &&
                  (function Wb(e, t, n, r) {
                    X2(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, s, o)
            : 3 === e && t.destroyNode(s),
            null != i &&
              (function Qb(e, t, n, r, a) {
                const i = n[7];
                i !== r1(n) && A6(t, e, r, i, a);
                for (let s = 10; s < n.length; s++) {
                  const c = n[s];
                  B5(c[1], c, e, t, r, i);
                }
              })(t, e, i, n, a);
        }
      }
      function xn(e, t, n) {
        if (X2(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function Hz(e) {
                  const t = e.toLowerCase();
                  return "svg" === t
                    ? "http://www.w3.org/2000/svg"
                    : "math" === t
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? e.createElement(t) : e.createElementNS(r, t);
        }
      }
      function ls(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          a = t[3];
        512 & t[2] && ((t[2] &= -513), qt(a, -1)), n.splice(r, 1);
      }
      function _n(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const a = r[17];
          null !== a && a !== e && ls(a, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = d8(e, 10 + t);
          !(function Rb(e, t) {
            B5(e, t, t[11], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const o = i[19];
          null !== o && o.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Cs(e, t) {
        if (!(128 & t[2])) {
          const n = t[11];
          X2(n) && n.destroyNode && B5(e, t, n, 3, null, null),
            (function Ub(e) {
              let t = e[13];
              if (!t) return Nn(e[1], e);
              for (; t; ) {
                let n = null;
                if (U1(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    U1(t) && Nn(t[1], t), (t = t[3]);
                  null === t && (t = e), U1(t) && Nn(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Nn(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function qb(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const a = t[n[r]];
                  if (!(a instanceof y5)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let o = 0; o < i.length; o += 2) {
                        const s = a[i[o]],
                          c = i[o + 1];
                        try {
                          c.call(s);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(a);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Gb(e, t) {
              const n = e.cleanup,
                r = t[7];
              let a = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const o = n[i + 1],
                      s = "function" == typeof o ? o(t) : r1(t[o]),
                      c = r[(a = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? s.removeEventListener(n[i], c, l)
                      : l >= 0
                      ? r[(a = l)]()
                      : r[(a = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const o = r[(a = n[i + 1])];
                    n[i].call(o);
                  }
              if (null !== r) {
                for (let i = a + 1; i < r.length; i++) r[i]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && X2(t[11]) && t[11].destroy();
          const n = t[17];
          if (null !== n && d3(t[3])) {
            n !== t[3] && ls(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function fb(e) {
            Mn.delete(e[20]);
          })(t);
        }
      }
      function fs(e, t, n) {
        return (function us(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const a = e.data[r.directiveStart].encapsulation;
            if (a === E3.None || a === E3.Emulated) return null;
          }
          return i3(r, n);
        })(e, t.parent, n);
      }
      function W4(e, t, n, r, a) {
        X2(e)
          ? e.insertBefore(t, n, r, a)
          : (ps(t) ? t.content : t).insertBefore(n, r, a);
      }
      function ds(e, t, n) {
        X2(e) ? e.appendChild(t, n) : (ps(t) ? t.content : t).appendChild(n);
      }
      function hs(e, t, n, r, a) {
        null !== r ? W4(e, t, n, r, a) : ds(e, t, n);
      }
      function ps(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      function z8(e, t) {
        return X2(e) ? e.parentNode(t) : t.parentNode;
      }
      function ms(e, t, n) {
        return vs(e, t, n);
      }
      let vs = function gs(e, t, n) {
        return 40 & e.type ? i3(e, n) : null;
      };
      function w8(e, t, n, r) {
        const a = fs(e, r, t),
          i = t[11],
          s = ms(r.parent || t[6], r, t);
        if (null != a)
          if (Array.isArray(n))
            for (let c = 0; c < n.length; c++) hs(i, a, n[c], s, !1);
          else hs(i, a, n, s, !1);
      }
      function b8(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return i3(t, e);
          if (4 & n) return En(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return b8(e, r);
            {
              const a = e[t.index];
              return d3(a) ? En(-1, a) : r1(a);
            }
          }
          if (32 & n) return wn(t, e)() || r1(e[t.index]);
          {
            const r = Ls(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : b8(O5(e[16]), r)
              : b8(e, t.next);
          }
        }
        return null;
      }
      function Ls(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function En(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            a = r[1].firstChild;
          if (null !== a) return b8(r, a);
        }
        return t[7];
      }
      function kn(e, t, n, r, a, i, o) {
        for (; null != n; ) {
          const s = r[n.index],
            c = n.type;
          if (
            (o && 0 === t && (s && z1(r1(s), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & c) kn(e, t, n.child, r, a, i, !1), A6(t, e, a, s, i);
            else if (32 & c) {
              const l = wn(n, r);
              let C;
              for (; (C = l()); ) A6(t, e, a, C, i);
              A6(t, e, a, s, i);
            } else 16 & c ? ys(e, t, r, n, a, i) : A6(t, e, a, s, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function B5(e, t, n, r, a, i) {
        kn(n, r, e.firstChild, t, a, i, !1);
      }
      function ys(e, t, n, r, a, i) {
        const o = n[16],
          c = o[6].projection[r.projection];
        if (Array.isArray(c))
          for (let l = 0; l < c.length; l++) A6(t, e, a, c[l], i);
        else kn(e, t, c, o[3], a, i, !0);
      }
      function Hs(e, t, n) {
        X2(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function Tn(e, t, n) {
        X2(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function zs(e, t, n) {
        let r = e.length;
        for (;;) {
          const a = e.indexOf(t, n);
          if (-1 === a) return a;
          if (0 === a || e.charCodeAt(a - 1) <= 32) {
            const i = t.length;
            if (a + i === r || e.charCodeAt(a + i) <= 32) return a;
          }
          n = a + 1;
        }
      }
      const ws = "ng-template";
      function Jb(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let a = e[r++];
          if (n && "class" === a) {
            if (((a = e[r]), -1 !== zs(a.toLowerCase(), t, 0))) return !0;
          } else if (1 === a) {
            for (; r < e.length && "string" == typeof (a = e[r++]); )
              if (a.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function bs(e) {
        return 4 === e.type && e.value !== ws;
      }
      function Zb(e, t, n) {
        return t === (4 !== e.type || n ? e.value : ws);
      }
      function eS(e, t, n) {
        let r = 4;
        const a = e.attrs || [],
          i = (function rS(e) {
            for (let t = 0; t < e.length; t++) if (Co(e[t])) return t;
            return e.length;
          })(a);
        let o = !1;
        for (let s = 0; s < t.length; s++) {
          const c = t[s];
          if ("number" != typeof c) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== c && !Zb(e, c, n)) || ("" === c && 1 === t.length))
                ) {
                  if (p3(r)) return !1;
                  o = !0;
                }
              } else {
                const l = 8 & r ? c : t[++s];
                if (8 & r && null !== e.attrs) {
                  if (!Jb(e.attrs, l, n)) {
                    if (p3(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const f = tS(8 & r ? "class" : c, a, bs(e), n);
                if (-1 === f) {
                  if (p3(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== l) {
                  let d;
                  d = f > i ? "" : a[f + 1].toLowerCase();
                  const g = 8 & r ? d : null;
                  if ((g && -1 !== zs(g, l, 0)) || (2 & r && l !== d)) {
                    if (p3(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !p3(r) && !p3(c)) return !1;
            if (o && p3(c)) continue;
            (o = !1), (r = c | (1 & r));
          }
        }
        return p3(r) || o;
      }
      function p3(e) {
        return 0 == (1 & e);
      }
      function tS(e, t, n, r) {
        if (null === t) return -1;
        let a = 0;
        if (r || !n) {
          let i = !1;
          for (; a < t.length; ) {
            const o = t[a];
            if (o === e) return a;
            if (3 === o || 6 === o) i = !0;
            else {
              if (1 === o || 2 === o) {
                let s = t[++a];
                for (; "string" == typeof s; ) s = t[++a];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                a += 4;
                continue;
              }
            }
            a += i ? 1 : 2;
          }
          return -1;
        }
        return (function aS(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Ss(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (eS(e, t[r], n)) return !0;
        return !1;
      }
      function iS(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let a = 0; a < e.length; a++) if (e[a] !== r[a]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Ds(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function oS(e) {
        let t = e[0],
          n = 1,
          r = 2,
          a = "",
          i = !1;
        for (; n < e.length; ) {
          let o = e[n];
          if ("string" == typeof o)
            if (2 & r) {
              const s = e[++n];
              a += "[" + o + (s.length > 0 ? '="' + s + '"' : "") + "]";
            } else 8 & r ? (a += "." + o) : 4 & r && (a += " " + o);
          else
            "" !== a && !p3(o) && ((t += Ds(i, a)), (a = "")),
              (r = o),
              (i = i || !p3(r));
          n++;
        }
        return "" !== a && (t += Ds(i, a)), t;
      }
      const u2 = {};
      function f1(e) {
        xs(z2(), I(), T1() + e, !1);
      }
      function xs(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && i8(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && o8(t, i, 0, n);
          }
        H4(n);
      }
      const Es = new s2("ENVIRONMENT_INITIALIZER"),
        ks = new s2("INJECTOR_DEF_TYPES");
      function hS(...e) {
        return { ɵproviders: Ts(0, e) };
      }
      function Ts(e, ...t) {
        const n = [],
          r = new Set();
        let a;
        return (
          r4(t, (i) => {
            const o = i;
            Fn(o, n, [], r) && (a || (a = []), a.push(o));
          }),
          void 0 !== a && Fs(a, n),
          n
        );
      }
      function Fs(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: a } = e[n];
          r4(a, (i) => {
            t.push(i);
          });
        }
      }
      function Fn(e, t, n, r) {
        if (!(e = c2(e))) return !1;
        let a = null,
          i = Ii(e);
        const o = !i && R2(e);
        if (i || o) {
          if (o && !o.standalone) return !1;
          a = e;
        } else {
          const c = e.ngModule;
          if (((i = Ii(c)), !i)) return !1;
          a = c;
        }
        const s = r.has(a);
        if (o) {
          if (s) return !1;
          if ((r.add(a), o.dependencies)) {
            const c =
              "function" == typeof o.dependencies
                ? o.dependencies()
                : o.dependencies;
            for (const l of c) Fn(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !s) {
              let l;
              r.add(a);
              try {
                r4(i.imports, (C) => {
                  Fn(C, t, n, r) && (l || (l = []), l.push(C));
                });
              } finally {
              }
              void 0 !== l && Fs(l, t);
            }
            if (!s) {
              const l = G4(a) || (() => new a());
              t.push(
                { provide: a, useFactory: l, deps: x2 },
                { provide: ks, useValue: a, multi: !0 },
                { provide: Es, useValue: () => W(a), multi: !0 }
              );
            }
            const c = i.providers;
            null == c ||
              s ||
              r4(c, (C) => {
                t.push(C);
              });
          }
        }
        return a !== e && void 0 !== e.providers;
      }
      const pS = I2({ provide: String, useValue: I2 });
      function In(e) {
        return null !== e && "object" == typeof e && pS in e;
      }
      function Y4(e) {
        return "function" == typeof e;
      }
      const Pn = new s2("INJECTOR", -1);
      class Rs {
        get(t, n = _5) {
          if (n === _5) {
            const r = new Error(`NullInjectorError: No provider for ${P2(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Rn = new s2("Set Injector scope."),
        S8 = {},
        gS = {};
      let On;
      function Bn() {
        return void 0 === On && (On = new Rs()), On;
      }
      class K4 {}
      class Os extends K4 {
        constructor(t, n, r, a) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = a),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            jn(t, (o) => this.processProvider(o)),
            this.records.set(Pn, E6(void 0, this)),
            a.has("environment") && this.records.set(K4, E6(void 0, this));
          const i = this.records.get(Rn);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(ks.multi, x2, r2.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        get(t, n = _5, r = r2.Default) {
          this.assertNotDestroyed();
          const a = m8(this),
            i = A3(void 0);
          try {
            if (!(r & r2.SkipSelf)) {
              let s = this.records.get(t);
              if (void 0 === s) {
                const c =
                  (function yS(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof s2)
                    );
                  })(t) && _t(t);
                (s = c && this.injectableDefInScope(c) ? E6(Un(t), S8) : null),
                  this.records.set(t, s);
              }
              if (null != s) return this.hydrate(t, s);
            }
            return (r & r2.Self ? Bn() : this.parent).get(
              t,
              (n = r & r2.Optional && n === _5 ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[p8] = o[p8] || []).unshift(P2(t)), a)) throw o;
              return (function Hw(e, t, n, r) {
                const a = e[p8];
                throw (
                  (t[Do] && a.unshift(t[Do]),
                  (e.message = (function zw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let a = P2(t);
                    if (Array.isArray(t)) a = t.map(P2).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let o in t)
                        if (t.hasOwnProperty(o)) {
                          let s = t[o];
                          i.push(
                            o +
                              ":" +
                              ("string" == typeof s ? JSON.stringify(s) : P2(s))
                          );
                        }
                      a = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${a}]: ${e.replace(
                      vw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, a, n, r)),
                  (e.ngTokenPath = a),
                  (e[p8] = null),
                  e)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            A3(i), m8(a);
          }
        }
        resolveInjectorInitializers() {
          const t = m8(this),
            n = A3(void 0);
          try {
            const r = this.get(Es.multi, x2, r2.Self);
            for (const a of r) a();
          } finally {
            m8(t), A3(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(P2(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new p2(205, !1);
        }
        processProvider(t) {
          let n = Y4((t = c2(t))) ? t : c2(t && t.provide);
          const r = (function MS(e) {
            return In(e) ? E6(void 0, e.useValue) : E6(Bs(e), S8);
          })(t);
          if (Y4(t) || !0 !== t.multi) this.records.get(n);
          else {
            let a = this.records.get(n);
            a ||
              ((a = E6(void 0, S8, !0)),
              (a.factory = () => fn(a.multi)),
              this.records.set(n, a)),
              (n = t),
              a.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === S8 && ((n.value = gS), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function VS(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = c2(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Un(e) {
        const t = _t(e),
          n = null !== t ? t.factory : G4(e);
        if (null !== n) return n;
        if (e instanceof s2) throw new p2(204, !1);
        if (e instanceof Function)
          return (function vS(e) {
            const t = e.length;
            if (t > 0) throw (x5(t, "?"), new p2(204, !1));
            const n = (function nz(e) {
              const t = e && (e[We] || e[Pi]);
              if (t) {
                const n = (function rz(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new p2(204, !1);
      }
      function Bs(e, t, n) {
        let r;
        if (Y4(e)) {
          const a = c2(e);
          return G4(a) || Un(a);
        }
        if (In(e)) r = () => c2(e.useValue);
        else if (
          (function Ps(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...fn(e.deps || []));
        else if (
          (function Is(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => W(c2(e.useExisting));
        else {
          const a = c2(e && (e.useClass || e.provide));
          if (
            !(function LS(e) {
              return !!e.deps;
            })(e)
          )
            return G4(a) || Un(a);
          r = () => new a(...fn(e.deps));
        }
        return r;
      }
      function E6(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function HS(e) {
        return !!e.ɵproviders;
      }
      function jn(e, t) {
        for (const n of e)
          Array.isArray(n) ? jn(n, t) : HS(n) ? jn(n.ɵproviders, t) : t(n);
      }
      function Us(e, t = null, n = null, r) {
        const a = js(e, t, n, r);
        return a.resolveInjectorInitializers(), a;
      }
      function js(e, t = null, n = null, r, a = new Set()) {
        const i = [n || x2, hS(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : P2(e))),
          new Os(i, t || Bn(), r || null, a)
        );
      }
      let w1 = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Us({ name: "" }, r, n, "");
            {
              const a = n.name ?? "";
              return Us({ name: a }, n.parent, n.providers, a);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = _5),
          (e.NULL = new Rs()),
          (e.ɵprov = e2({ token: e, providedIn: "any", factory: () => W(Pn) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function T(e, t = r2.Default) {
        const n = I();
        return null === n ? W(e, t) : vo(l1(), n, c2(e), t);
      }
      function Yn() {
        throw new Error("invalid");
      }
      function x8(e, t) {
        return (e << 17) | (t << 2);
      }
      function m3(e) {
        return (e >> 17) & 32767;
      }
      function Kn(e) {
        return 2 | e;
      }
      function o4(e) {
        return (131068 & e) >> 2;
      }
      function Qn(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Xn(e) {
        return 1 | e;
      }
      function oc(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const a = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const o = e.data[i];
              Xt(a), o.contentQueries(2, t[i], i);
            }
          }
      }
      function U5(e, t, n, r, a, i, o, s, c, l, C) {
        const f = t.blueprint.slice();
        return (
          (f[0] = a),
          (f[2] = 76 | r),
          (null !== C || (e && 1024 & e[2])) && (f[2] |= 1024),
          Xi(f),
          (f[3] = f[15] = e),
          (f[8] = n),
          (f[10] = o || (e && e[10])),
          (f[11] = s || (e && e[11])),
          (f[12] = c || (e && e[12]) || null),
          (f[9] = l || (e && e[9]) || null),
          (f[6] = i),
          (f[20] = (function lb() {
            return cb++;
          })()),
          (f[21] = C),
          (f[16] = 2 == t.type ? e[16] : f),
          f
        );
      }
      function T6(e, t, n, r, a) {
        let i = e.data[t];
        if (null === i)
          (i = (function s7(e, t, n, r, a) {
            const i = eo(),
              o = Wt(),
              c = (e.data[t] = (function JS(e, t, n, r, a, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: a,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, t, r, a));
            return (
              null === e.firstChild && (e.firstChild = c),
              null !== i &&
                (o
                  ? null == i.child && null !== c.parent && (i.child = c)
                  : null === i.next && (i.next = c)),
              c
            );
          })(e, t, n, r, a)),
            (function Tz() {
              return C2.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = a);
          const o = (function V5() {
            const e = C2.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return T3(i, !0), i;
      }
      function F6(e, t, n, r) {
        if (0 === n) return -1;
        const a = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return a;
      }
      function j5(e, t, n) {
        n8(t);
        try {
          const r = e.viewQuery;
          null !== r && m7(1, r, n);
          const a = e.template;
          null !== a && Cc(e, t, a, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && oc(e, t),
            e.staticViewQueries && m7(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function KS(e, t) {
              for (let n = 0; n < t.length; n++) gD(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), r8();
        }
      }
      function I6(e, t, n, r) {
        const a = t[2];
        if (128 != (128 & a)) {
          n8(t);
          try {
            Xi(t),
              (function to(e) {
                return (C2.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Cc(e, t, n, 2, r);
            const o = 3 == (3 & a);
            if (o) {
              const l = e.preOrderCheckHooks;
              null !== l && i8(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && o8(t, l, 0, null), Jt(t, 0);
            }
            if (
              ((function pD(e) {
                for (let t = bn(e); null !== t; t = Sn(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const a = n[r],
                      i = a[3];
                    0 == (512 & a[2]) && qt(i, 1), (a[2] |= 512);
                  }
                }
              })(t),
              (function hD(e) {
                for (let t = bn(e); null !== t; t = Sn(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      a = r[1];
                    Gt(r) && I6(a, r, a.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && oc(e, t),
              o)
            ) {
              const l = e.contentCheckHooks;
              null !== l && i8(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && o8(t, l, 1), Jt(t, 1);
            }
            !(function WS(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const a = n[r];
                    if (a < 0) H4(~a);
                    else {
                      const i = a,
                        o = n[++r],
                        s = n[++r];
                      Fz(o, i), s(2, t[i]);
                    }
                  }
                } finally {
                  H4(-1);
                }
            })(e, t);
            const s = e.components;
            null !== s &&
              (function YS(e, t) {
                for (let n = 0; n < t.length; n++) mD(e, t[n]);
              })(t, s);
            const c = e.viewQuery;
            if ((null !== c && m7(2, c, r), o)) {
              const l = e.viewCheckHooks;
              null !== l && i8(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && o8(t, l, 2), Jt(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), qt(t[3], -1));
          } finally {
            r8();
          }
        }
      }
      function QS(e, t, n, r) {
        const a = t[10],
          o = Qi(t);
        try {
          !o && a.begin && a.begin(), o && j5(e, t, r), I6(e, t, n, r);
        } finally {
          !o && a.end && a.end();
        }
      }
      function Cc(e, t, n, r, a) {
        const i = T1(),
          o = 2 & r;
        try {
          H4(-1), o && t.length > 22 && xs(e, t, 22, !1), n(r, a);
        } finally {
          H4(i);
        }
      }
      function fc(e, t, n) {
        if (It(t)) {
          const a = t.directiveEnd;
          for (let i = t.directiveStart; i < a; i++) {
            const o = e.data[i];
            o.contentQueries && o.contentQueries(1, n[i], i);
          }
        }
      }
      function c7(e, t, n) {
        !Zi() ||
          ((function oD(e, t, n, r) {
            const a = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || z5(n, t), z1(r, t);
            const o = n.initialInputs;
            for (let s = a; s < i; s++) {
              const c = e.data[s],
                l = h3(c);
              l && fD(t, n, c);
              const C = w5(t, e, s, n);
              z1(C, t),
                null !== o && uD(0, s - a, C, c, 0, o),
                l && (K1(n.index, t)[8] = C);
            }
          })(e, t, n, i3(n, t)),
          128 == (128 & n.flags) &&
            (function sD(e, t, n) {
              const r = n.directiveStart,
                a = n.directiveEnd,
                i = n.index,
                o = (function Iz() {
                  return C2.lFrame.currentDirectiveIndex;
                })();
              try {
                H4(i);
                for (let s = r; s < a; s++) {
                  const c = e.data[s],
                    l = t[s];
                  Kt(s),
                    (null !== c.hostBindings ||
                      0 !== c.hostVars ||
                      null !== c.hostAttrs) &&
                      Mc(c, l);
                }
              } finally {
                H4(-1), Kt(o);
              }
            })(e, t, n));
      }
      function l7(e, t, n = i3) {
        const r = t.localNames;
        if (null !== r) {
          let a = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              s = -1 === o ? n(t, e) : e[o];
            e[a++] = s;
          }
        }
      }
      function uc(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = A8(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function A8(e, t, n, r, a, i, o, s, c, l) {
        const C = 22 + r,
          f = C + a,
          d = (function XS(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : u2);
            return n;
          })(C, f),
          g = "function" == typeof l ? l() : l;
        return (d[1] = {
          type: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: s,
          declTNode: t,
          data: d.slice().fill(null, C),
          bindingStartIndex: C,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: c,
          consts: g,
          incompleteFirstPass: !1,
        });
      }
      function pc(e, t, n, r) {
        const a = wc(t);
        null === n
          ? a.push(r)
          : (a.push(n), e.firstCreatePass && bc(e).push(r, a.length - 1));
      }
      function mc(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const a = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, a)
              : (n[r] = [t, a]);
          }
        return n;
      }
      function e3(e, t, n, r, a, i, o, s) {
        const c = i3(t, n);
        let C,
          l = t.inputs;
        !s && null != l && (C = l[r])
          ? (xc(e, n, C, r, a),
            Je(t) &&
              (function tD(e, t) {
                const n = K1(t, e);
                16 & n[2] || (n[2] |= 32);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function eD(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (a = null != o ? o(a, t.value || "", r) : a),
            X2(i)
              ? i.setProperty(c, r, a)
              : en(r) || (c.setProperty ? c.setProperty(r, a) : (c[r] = a)));
      }
      function C7(e, t, n, r) {
        let a = !1;
        if (Zi()) {
          const i = (function cD(e, t, n) {
              const r = e.directiveRegistry;
              let a = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  Ss(n, o.selectors, !1) &&
                    (a || (a = []),
                    f8(z5(n, t), e, o.type),
                    h3(o) ? (Lc(e, n), a.unshift(o)) : a.push(o));
                }
              return a;
            })(e, t, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            (a = !0), Vc(n, e.data.length, i.length);
            for (let C = 0; C < i.length; C++) {
              const f = i[C];
              f.providersResolver && f.providersResolver(f);
            }
            let s = !1,
              c = !1,
              l = F6(e, t, i.length, null);
            for (let C = 0; C < i.length; C++) {
              const f = i[C];
              (n.mergedAttrs = c8(n.mergedAttrs, f.hostAttrs)),
                yc(e, n, t, l, f),
                CD(l, f, o),
                null !== f.contentQueries && (n.flags |= 8),
                (null !== f.hostBindings ||
                  null !== f.hostAttrs ||
                  0 !== f.hostVars) &&
                  (n.flags |= 128);
              const d = f.type.prototype;
              !s &&
                (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (s = !0)),
                !c &&
                  (d.ngOnChanges || d.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (c = !0)),
                l++;
            }
            !(function ZS(e, t) {
              const r = t.directiveEnd,
                a = e.data,
                i = t.attrs,
                o = [];
              let s = null,
                c = null;
              for (let l = t.directiveStart; l < r; l++) {
                const C = a[l],
                  f = C.inputs,
                  d = null === i || bs(t) ? null : dD(f, i);
                o.push(d), (s = mc(f, l, s)), (c = mc(C.outputs, l, c));
              }
              null !== s &&
                (s.hasOwnProperty("class") && (t.flags |= 16),
                s.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = o),
                (t.inputs = s),
                (t.outputs = c);
            })(e, n);
          }
          o &&
            (function lD(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let a = 0; a < t.length; a += 2) {
                  const i = n[t[a + 1]];
                  if (null == i) throw new p2(-301, !1);
                  r.push(t[a], i);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = c8(n.mergedAttrs, n.attrs)), a;
      }
      function vc(e, t, n, r, a, i) {
        const o = i.hostBindings;
        if (o) {
          let s = e.hostBindingOpCodes;
          null === s && (s = e.hostBindingOpCodes = []);
          const c = ~t.index;
          (function iD(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(s) != c && s.push(c),
            s.push(r, a, o);
        }
      }
      function Mc(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Lc(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function CD(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          h3(t) && (n[""] = e);
        }
      }
      function Vc(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function yc(e, t, n, r, a) {
        e.data[r] = a;
        const i = a.factory || (a.factory = G4(a.type)),
          o = new y5(i, h3(a), T);
        (e.blueprint[r] = o),
          (n[r] = o),
          vc(e, t, 0, r, F6(e, n, a.hostVars, u2), a);
      }
      function fD(e, t, n) {
        const r = i3(t, e),
          a = uc(n),
          i = e[10],
          o = E8(
            e,
            U5(
              e,
              a,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = o;
      }
      function R3(e, t, n, r, a, i) {
        const o = i3(e, t);
        !(function f7(e, t, n, r, a, i, o) {
          if (null == i)
            X2(e) ? e.removeAttribute(t, a, n) : t.removeAttribute(a);
          else {
            const s = null == o ? f2(i) : o(i, r || "", a);
            X2(e)
              ? e.setAttribute(t, a, s, n)
              : n
              ? t.setAttributeNS(n, a, s)
              : t.setAttribute(a, s);
          }
        })(t[11], o, i, e.value, n, r, a);
      }
      function uD(e, t, n, r, a, i) {
        const o = i[t];
        if (null !== o) {
          const s = r.setInput;
          for (let c = 0; c < o.length; ) {
            const l = o[c++],
              C = o[c++],
              f = o[c++];
            null !== s ? r.setInput(n, f, l, C) : (n[C] = f);
          }
        }
      }
      function dD(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const a = t[r];
          if (0 !== a)
            if (5 !== a) {
              if ("number" == typeof a) break;
              e.hasOwnProperty(a) &&
                (null === n && (n = []), n.push(a, e[a], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Hc(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function mD(e, t) {
        const n = K1(t, e);
        if (Gt(n)) {
          const r = n[1];
          48 & n[2] ? I6(r, n, r.template, n[8]) : n[5] > 0 && u7(n);
        }
      }
      function u7(e) {
        for (let r = bn(e); null !== r; r = Sn(r))
          for (let a = 10; a < r.length; a++) {
            const i = r[a];
            if (512 & i[2]) {
              const o = i[1];
              I6(o, i, o.template, i[8]);
            } else i[5] > 0 && u7(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const a = K1(n[r], e);
            Gt(a) && a[5] > 0 && u7(a);
          }
      }
      function gD(e, t) {
        const n = K1(t, e),
          r = n[1];
        (function vD(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          j5(r, n, n[8]);
      }
      function E8(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function d7(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = O5(e);
          if (dz(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function zc(e) {
        !(function h7(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = H8(n);
            if (null !== r) {
              const a = r[1];
              QS(a, r, a.template, n);
            }
          }
        })(e[8]);
      }
      function m7(e, t, n) {
        Xt(0), t(e, n);
      }
      const LD = (() => Promise.resolve(null))();
      function wc(e) {
        return e[7] || (e[7] = []);
      }
      function bc(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Dc(e, t) {
        const n = e[9],
          r = n ? n.get(_6, null) : null;
        r && r.handleError(t);
      }
      function xc(e, t, n, r, a) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            s = n[i++],
            c = t[o],
            l = e.data[o];
          null !== l.setInput ? l.setInput(c, a, r, s) : (c[s] = a);
        }
      }
      function s4(e, t, n) {
        const r = e8(t, e);
        !(function cs(e, t, n) {
          X2(e) ? e.setValue(t, n) : (t.textContent = n);
        })(e[11], r, n);
      }
      function k8(e, t, n) {
        let r = n ? e.styles : null,
          a = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (i = s)
              : 1 == i
              ? (a = Dt(a, s))
              : 2 == i && (r = Dt(r, s + ": " + t[++o] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = a) : (e.classesWithoutHost = a);
      }
      function ND(e, t) {
        a8(H8(e)[1], l1());
      }
      function E2(e) {
        let t = (function Bc(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let a;
          if (h3(e)) a = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new p2(903, "");
            a = t.ɵdir;
          }
          if (a) {
            if (n) {
              r.push(a);
              const o = e;
              (o.inputs = v7(e.inputs)),
                (o.declaredInputs = v7(e.declaredInputs)),
                (o.outputs = v7(e.outputs));
              const s = a.hostBindings;
              s && TD(e, s);
              const c = a.viewQuery,
                l = a.contentQueries;
              if (
                (c && ED(e, c),
                l && kD(e, l),
                St(e.inputs, a.inputs),
                St(e.declaredInputs, a.declaredInputs),
                St(e.outputs, a.outputs),
                h3(a) && a.data.animation)
              ) {
                const C = e.data;
                C.animation = (C.animation || []).concat(a.data.animation);
              }
            }
            const i = a.features;
            if (i)
              for (let o = 0; o < i.length; o++) {
                const s = i[o];
                s && s.ngInherit && s(e), s === E2 && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function AD(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const a = e[r];
            (a.hostVars = t += a.hostVars),
              (a.hostAttrs = c8(a.hostAttrs, (n = c8(n, a.hostAttrs))));
          }
        })(r);
      }
      function v7(e) {
        return e === d6 ? {} : e === x2 ? [] : e;
      }
      function ED(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, a) => {
              t(r, a), n(r, a);
            }
          : t;
      }
      function kD(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, a, i) => {
              t(r, a, i), n(r, a, i);
            }
          : t;
      }
      function TD(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, a) => {
              t(r, a), n(r, a);
            }
          : t;
      }
      let T8 = null;
      function Q4() {
        if (!T8) {
          const e = F2.Symbol;
          if (e && e.iterator) T8 = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (T8 = r);
            }
          }
        }
        return T8;
      }
      function $5(e) {
        return (
          !!(function M7(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Q4() in e))
        );
      }
      function b1(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function v3(e, t, n, r) {
        const a = I();
        return b1(a, M6(), t) && (z2(), R3(J2(), a, e, t, n, r)), v3;
      }
      function S4(e, t, n, r, a, i, o, s) {
        const c = I(),
          l = z2(),
          C = e + 22,
          f = l.firstCreatePass
            ? (function UD(e, t, n, r, a, i, o, s, c) {
                const l = t.consts,
                  C = T6(t, e, 4, o || null, y4(l, s));
                C7(t, n, C, y4(l, c)), a8(t, C);
                const f = (C.tViews = A8(
                  2,
                  C,
                  r,
                  a,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, C),
                    (f.queries = t.queries.embeddedTView(C))),
                  C
                );
              })(C, l, c, t, n, r, a, i, o)
            : l.data[C];
        T3(f, !1);
        const d = c[11].createComment("");
        w8(l, c, d, f),
          z1(d, c),
          E8(c, (c[C] = Hc(d, c, d, f))),
          Ze(f) && c7(l, c, f),
          null != o && l7(c, f, s);
      }
      function L7(e) {
        return (function v6(e, t) {
          return e[t];
        })(
          (function kz() {
            return C2.lFrame.contextLView;
          })(),
          22 + e
        );
      }
      function s3(e, t, n) {
        const r = I();
        return b1(r, M6(), t) && e3(z2(), J2(), r, e, t, r[11], n, !1), s3;
      }
      function V7(e, t, n, r, a) {
        const o = a ? "class" : "style";
        xc(e, n, t.inputs[o], o, r);
      }
      function k2(e, t, n, r) {
        const a = I(),
          i = z2(),
          o = 22 + e,
          s = a[11],
          c = (a[o] = xn(
            s,
            t,
            (function Gz() {
              return C2.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function $D(e, t, n, r, a, i, o) {
                const s = t.consts,
                  l = T6(t, e, 2, a, y4(s, i));
                return (
                  C7(t, n, l, y4(s, o)),
                  null !== l.attrs && k8(l, l.attrs, !1),
                  null !== l.mergedAttrs && k8(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(o, i, a, 0, t, n, r)
            : i.data[o];
        T3(l, !0);
        const C = l.mergedAttrs;
        null !== C && s8(s, c, C);
        const f = l.classes;
        null !== f && Tn(s, c, f);
        const d = l.styles;
        return (
          null !== d && Hs(s, c, d),
          64 != (64 & l.flags) && w8(i, a, c, l),
          0 ===
            (function xz() {
              return C2.lFrame.elementDepthCount;
            })() && z1(c, a),
          (function _z() {
            C2.lFrame.elementDepthCount++;
          })(),
          Ze(l) && (c7(i, a, l), fc(i, l, a)),
          null !== r && l7(a, l),
          k2
        );
      }
      function _2() {
        let e = l1();
        Wt() ? Yt() : ((e = e.parent), T3(e, !1));
        const t = e;
        !(function Nz() {
          C2.lFrame.elementDepthCount--;
        })();
        const n = z2();
        return (
          n.firstCreatePass && (a8(n, e), It(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Qz(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            V7(n, t, I(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Xz(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            V7(n, t, I(), t.stylesWithoutHost, !1),
          _2
        );
      }
      function M3(e, t, n, r) {
        return k2(e, t, n, r), _2(), M3;
      }
      function W6(e, t, n) {
        const r = I(),
          a = z2(),
          i = e + 22,
          o = a.firstCreatePass
            ? (function GD(e, t, n, r, a) {
                const i = t.consts,
                  o = y4(i, r),
                  s = T6(t, e, 8, "ng-container", o);
                return (
                  null !== o && k8(s, o, !0),
                  C7(t, n, s, y4(i, a)),
                  null !== t.queries && t.queries.elementStart(t, s),
                  s
                );
              })(i, a, r, t, n)
            : a.data[i];
        T3(o, !0);
        const s = (r[i] = r[11].createComment(""));
        return (
          w8(a, r, s, o),
          z1(s, r),
          Ze(o) && (c7(a, r, o), fc(a, o, r)),
          null != n && l7(r, o),
          W6
        );
      }
      function Y6() {
        let e = l1();
        const t = z2();
        return (
          Wt() ? Yt() : ((e = e.parent), T3(e, !1)),
          t.firstCreatePass && (a8(t, e), It(e) && t.queries.elementEnd(e)),
          Y6
        );
      }
      function q5(e) {
        return !!e && "function" == typeof e.then;
      }
      const H7 = function Zc(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Y2(e, t, n, r) {
        const a = I(),
          i = z2(),
          o = l1();
        return (
          (function tl(e, t, n, r, a, i, o, s) {
            const c = Ze(r),
              C = e.firstCreatePass && bc(e),
              f = t[8],
              d = wc(t);
            let g = !0;
            if (3 & r.type || s) {
              const F = i3(r, t),
                k = s ? s(F) : F,
                O = d.length,
                A = s ? (q) => s(r1(q[r.index])) : r.index;
              if (X2(n)) {
                let q = null;
                if (
                  (!s &&
                    c &&
                    (q = (function qD(e, t, n, r) {
                      const a = e.cleanup;
                      if (null != a)
                        for (let i = 0; i < a.length - 1; i += 2) {
                          const o = a[i];
                          if (o === n && a[i + 1] === r) {
                            const s = t[7],
                              c = a[i + 2];
                            return s.length > c ? s[c] : null;
                          }
                          "string" == typeof o && (i += 2);
                        }
                      return null;
                    })(e, t, a, r.index)),
                  null !== q)
                )
                  ((q.__ngLastListenerFn__ || q).__ngNextListenerFn__ = i),
                    (q.__ngLastListenerFn__ = i),
                    (g = !1);
                else {
                  i = z7(r, t, f, i, !1);
                  const n2 = n.listen(k, a, i);
                  d.push(i, n2), C && C.push(a, A, O, O + 1);
                }
              } else
                (i = z7(r, t, f, i, !0)),
                  k.addEventListener(a, i, o),
                  d.push(i),
                  C && C.push(a, A, O, o);
            } else i = z7(r, t, f, i, !1);
            const y = r.outputs;
            let x;
            if (g && null !== y && (x = y[a])) {
              const F = x.length;
              if (F)
                for (let k = 0; k < F; k += 2) {
                  const w2 = t[x[k]][x[k + 1]].subscribe(i),
                    n3 = d.length;
                  d.push(i, w2), C && C.push(a, r.index, n3, -(n3 + 1));
                }
            }
          })(i, a, a[11], o, e, t, !!n, r),
          Y2
        );
      }
      function nl(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (a) {
          return Dc(e, a), !1;
        }
      }
      function z7(e, t, n, r, a) {
        return function i(o) {
          if (o === Function) return r;
          d7(2 & e.flags ? K1(e.index, t) : t);
          let c = nl(t, 0, r, o),
            l = i.__ngNextListenerFn__;
          for (; l; ) (c = nl(t, 0, l, o) && c), (l = l.__ngNextListenerFn__);
          return a && !1 === c && (o.preventDefault(), (o.returnValue = !1)), c;
        };
      }
      function L3(e = 1) {
        return (function Rz(e) {
          return (C2.lFrame.contextLView = (function Oz(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, C2.lFrame.contextLView))[8];
        })(e);
      }
      function WD(e, t) {
        let n = null;
        const r = (function nS(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (0 == (1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let a = 0; a < t.length; a++) {
          const i = t[a];
          if ("*" !== i) {
            if (null === r ? Ss(e, i, !0) : iS(r, i)) return a;
          } else n = a;
        }
        return n;
      }
      function hl(e, t, n, r, a) {
        const i = e[n + 1],
          o = null === t;
        let s = r ? m3(i) : o4(i),
          c = !1;
        for (; 0 !== s && (!1 === c || o); ) {
          const C = e[s + 1];
          QD(e[s], t) && ((c = !0), (e[s + 1] = r ? Xn(C) : Kn(C))),
            (s = r ? m3(C) : o4(C));
        }
        c && (e[n + 1] = r ? Kn(i) : Xn(i));
      }
      function QD(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && S6(e, t) >= 0)
        );
      }
      function I8(e, t) {
        return (
          (function V3(e, t, n, r) {
            const a = I(),
              i = z2(),
              o = (function n4(e) {
                const t = C2.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function Hl(e, t, n, r) {
                const a = e.data;
                if (null === a[n + 1]) {
                  const i = a[T1()],
                    o = (function yl(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Sl(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(i, r) &&
                    null === t &&
                    !o &&
                    (t = !1),
                    (t = (function ix(e, t, n, r) {
                      const a = (function Qt(e) {
                        const t = C2.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === a)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = W5((n = b7(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const o = t.directiveStylingLast;
                        if (-1 === o || e[o] !== a)
                          if (((n = b7(a, e, t, n, r)), null === i)) {
                            let c = (function ox(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== o4(r)) return e[m3(r)];
                            })(e, t, r);
                            void 0 !== c &&
                              Array.isArray(c) &&
                              ((c = b7(null, e, t, c[1], r)),
                              (c = W5(c, t.attrs, r)),
                              (function sx(e, t, n, r) {
                                e[m3(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, c));
                          } else
                            i = (function cx(e, t, n) {
                              let r;
                              const a = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < a;
                                i++
                              )
                                r = W5(r, e[i].hostAttrs, n);
                              return W5(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(a, i, t, r)),
                    (function YD(e, t, n, r, a, i) {
                      let o = i ? t.classBindings : t.styleBindings,
                        s = m3(o),
                        c = o4(o);
                      e[r] = n;
                      let C,
                        l = !1;
                      if (Array.isArray(n)) {
                        const f = n;
                        (C = f[1]), (null === C || S6(f, C) > 0) && (l = !0);
                      } else C = n;
                      if (a)
                        if (0 !== c) {
                          const d = m3(e[s + 1]);
                          (e[r + 1] = x8(d, s)),
                            0 !== d && (e[d + 1] = Qn(e[d + 1], r)),
                            (e[s + 1] = (function IS(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[s + 1], r));
                        } else
                          (e[r + 1] = x8(s, 0)),
                            0 !== s && (e[s + 1] = Qn(e[s + 1], r)),
                            (s = r);
                      else
                        (e[r + 1] = x8(c, 0)),
                          0 === s ? (s = r) : (e[c + 1] = Qn(e[c + 1], r)),
                          (c = r);
                      l && (e[r + 1] = Kn(e[r + 1])),
                        hl(e, C, r, !0),
                        hl(e, C, r, !1),
                        (function KD(e, t, n, r, a) {
                          const i = a ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            S6(i, t) >= 0 &&
                            (n[r + 1] = Xn(n[r + 1]));
                        })(t, C, e, r, i),
                        (o = x8(s, c)),
                        i ? (t.classBindings = o) : (t.styleBindings = o);
                    })(a, i, t, n, o, r);
                }
              })(i, e, o, r),
              t !== u2 &&
                b1(a, o, t) &&
                (function wl(e, t, n, r, a, i, o, s) {
                  if (!(3 & t.type)) return;
                  const c = e.data,
                    l = c[s + 1];
                  P8(
                    (function Js(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? bl(c, t, n, a, o4(l), o)
                      : void 0
                  ) ||
                    (P8(i) ||
                      ((function Xs(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = bl(c, null, n, a, s, o))),
                    (function Xb(e, t, n, r, a) {
                      const i = X2(e);
                      if (t)
                        a
                          ? i
                            ? e.addClass(n, r)
                            : n.classList.add(r)
                          : i
                          ? e.removeClass(n, r)
                          : n.classList.remove(r);
                      else {
                        let o = -1 === r.indexOf("-") ? void 0 : Z1.DashCase;
                        if (null == a)
                          i
                            ? e.removeStyle(n, r, o)
                            : n.style.removeProperty(r);
                        else {
                          const s =
                            "string" == typeof a && a.endsWith("!important");
                          s && ((a = a.slice(0, -10)), (o |= Z1.Important)),
                            i
                              ? e.setStyle(n, r, a, o)
                              : n.style.setProperty(r, a, s ? "important" : "");
                        }
                      }
                    })(r, o, e8(T1(), n), a, i));
                })(
                  i,
                  i.data[T1()],
                  a,
                  a[11],
                  e,
                  (a[o + 1] = (function fx(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = P2(J1(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  o
                );
          })(e, t, null, !0),
          I8
        );
      }
      function b7(e, t, n, r, a) {
        let i = null;
        const o = n.directiveEnd;
        let s = n.directiveStylingLast;
        for (
          -1 === s ? (s = n.directiveStart) : s++;
          s < o && ((i = t[s]), (r = W5(r, i.hostAttrs, a)), i !== e);

        )
          s++;
        return null !== e && (n.directiveStylingLast = s), r;
      }
      function W5(e, t, n) {
        const r = n ? 1 : 2;
        let a = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const o = t[i];
            "number" == typeof o
              ? (a = o)
              : a === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                X1(e, o, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function bl(e, t, n, r, a, i) {
        const o = null === t;
        let s;
        for (; a > 0; ) {
          const c = e[a],
            l = Array.isArray(c),
            C = l ? c[1] : c,
            f = null === C;
          let d = n[a + 1];
          d === u2 && (d = f ? x2 : void 0);
          let g = f ? cn(d, r) : C === r ? d : void 0;
          if ((l && !P8(g) && (g = cn(c, r)), P8(g) && ((s = g), o))) return s;
          const y = e[a + 1];
          a = o ? m3(y) : o4(y);
        }
        if (null !== t) {
          let c = i ? t.residualClasses : t.residualStyles;
          null != c && (s = cn(c, r));
        }
        return s;
      }
      function P8(e) {
        return void 0 !== e;
      }
      function d1(e, t = "") {
        const n = I(),
          r = z2(),
          a = e + 22,
          i = r.firstCreatePass ? T6(r, a, 1, t, null) : r.data[a],
          o = (n[a] = (function Dn(e, t) {
            return X2(e) ? e.createText(t) : e.createTextNode(t);
          })(n[11], t));
        w8(r, n, o, i), T3(i, !1);
      }
      function j3(e) {
        return Y5("", e, ""), j3;
      }
      function Y5(e, t, n) {
        const r = I(),
          a = (function R6(e, t, n, r) {
            return b1(e, M6(), n) ? t + f2(n) + r : u2;
          })(r, e, t, n);
        return a !== u2 && s4(r, T1(), a), Y5;
      }
      function S7(e, t, n) {
        const r = I();
        return b1(r, M6(), t) && e3(z2(), J2(), r, e, t, r[11], n, !0), S7;
      }
      const X6 = "en-US";
      let Yl = X6;
      function _7(e, t, n, r, a) {
        if (((e = c2(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) _7(e[i], t, n, r, a);
        else {
          const i = z2(),
            o = I();
          let s = Y4(e) ? e : c2(e.provide),
            c = Bs(e);
          const l = l1(),
            C = 1048575 & l.providerIndexes,
            f = l.directiveStart,
            d = l.providerIndexes >> 20;
          if (Y4(e) || !e.multi) {
            const g = new y5(c, a, T),
              y = A7(s, t, a ? C : C + d, f);
            -1 === y
              ? (f8(z5(l, o), i, s),
                N7(i, e, t.length),
                t.push(s),
                l.directiveStart++,
                l.directiveEnd++,
                a && (l.providerIndexes += 1048576),
                n.push(g),
                o.push(g))
              : ((n[y] = g), (o[y] = g));
          } else {
            const g = A7(s, t, C + d, f),
              y = A7(s, t, C, C + d),
              x = g >= 0 && n[g],
              F = y >= 0 && n[y];
            if ((a && !F) || (!a && !x)) {
              f8(z5(l, o), i, s);
              const k = (function x_(e, t, n, r, a) {
                const i = new y5(e, n, T);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  MC(i, a, r && !n),
                  i
                );
              })(a ? D_ : S_, n.length, a, r, c);
              !a && F && (n[y].providerFactory = k),
                N7(i, e, t.length, 0),
                t.push(s),
                l.directiveStart++,
                l.directiveEnd++,
                a && (l.providerIndexes += 1048576),
                n.push(k),
                o.push(k);
            } else N7(i, e, g > -1 ? g : y, MC(n[a ? y : g], c, !a && r));
            !a && r && F && n[y].componentProviders++;
          }
        }
      }
      function N7(e, t, n, r) {
        const a = Y4(t),
          i = (function mS(e) {
            return !!e.useClass;
          })(t);
        if (a || i) {
          const c = (i ? c2(t.useClass) : t).prototype.ngOnDestroy;
          if (c) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!a && t.multi) {
              const C = l.indexOf(n);
              -1 === C ? l.push(n, [r, c]) : l[C + 1].push(r, c);
            } else l.push(n, c);
          }
        }
      }
      function MC(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function A7(e, t, n, r) {
        for (let a = n; a < r; a++) if (t[a] === e) return a;
        return -1;
      }
      function S_(e, t, n, r) {
        return E7(this.multi, []);
      }
      function D_(e, t, n, r) {
        const a = this.multi;
        let i;
        if (this.providerFactory) {
          const o = this.providerFactory.componentProviders,
            s = w5(n, n[1], this.providerFactory.index, r);
          (i = s.slice(0, o)), E7(a, i);
          for (let c = o; c < s.length; c++) i.push(s[c]);
        } else (i = []), E7(a, i);
        return i;
      }
      function E7(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function W2(e, t = []) {
        return (n) => {
          n.providersResolver = (r, a) =>
            (function b_(e, t, n) {
              const r = z2();
              if (r.firstCreatePass) {
                const a = h3(e);
                _7(n, r.data, r.blueprint, a, !0),
                  _7(t, r.data, r.blueprint, a, !1);
              }
            })(r, a ? a(e) : e, t);
        };
      }
      class N_ {
        resolveComponentFactory(t) {
          throw (function __(e) {
            const t = Error(
              `No component factory found for ${P2(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Z5 = (() => {
        class e {}
        return (e.NULL = new N_()), e;
      })();
      class D4 {}
      class VC {}
      class yC {}
      function E_() {
        return Z6(l1(), I());
      }
      function Z6(e, t) {
        return new j1(i3(e, t));
      }
      let j1 = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = E_), e;
      })();
      function k_(e) {
        return e instanceof j1 ? e.nativeElement : e;
      }
      class HC {}
      let $3 = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function F_() {
                const e = I(),
                  n = K1(l1().index, e);
                return (function T_(e) {
                  return e[11];
                })(U1(n) ? n : e);
              })()),
            e
          );
        })(),
        I_ = (() => {
          class e {}
          return (
            (e.ɵprov = e2({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class ee {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const P_ = new ee("14.0.0"),
        k7 = {};
      function j8(e, t, n, r, a = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(r1(i)), d3(i)))
            for (let s = 10; s < i.length; s++) {
              const c = i[s],
                l = c[1].firstChild;
              null !== l && j8(c[1], c, l, r);
            }
          const o = n.type;
          if (8 & o) j8(e, t, n.child, r);
          else if (32 & o) {
            const s = wn(n, t);
            let c;
            for (; (c = s()); ) r.push(c);
          } else if (16 & o) {
            const s = Ls(t, n);
            if (Array.isArray(s)) r.push(...s);
            else {
              const c = O5(t[16]);
              j8(c[1], c, s, r, !0);
            }
          }
          n = a ? n.projectionNext : n.next;
        }
        return r;
      }
      class te {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return j8(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (d3(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (_n(t, r), d8(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Cs(this._lView[1], this._lView);
        }
        onDestroy(t) {
          pc(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          d7(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          !(function p7(e, t, n) {
            const r = t[10];
            r.begin && r.begin();
            try {
              I6(e, t, e.template, n);
            } catch (a) {
              throw (Dc(t, a), a);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new p2(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Bb(e, t) {
              B5(e, t, t[11], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new p2(902, "");
          this._appRef = t;
        }
      }
      class R_ extends te {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          zc(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class T7 extends Z5 {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = R2(t);
          return new F7(n, this.ngModule);
        }
      }
      function zC(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class B_ {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const a = this.injector.get(t, k7, r);
          return a !== k7 || n === k7 ? a : this.parentInjector.get(t, n, r);
        }
      }
      class F7 extends yC {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function sS(e) {
              return e.map(oS).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return zC(this.componentDef.inputs);
        }
        get outputs() {
          return zC(this.componentDef.outputs);
        }
        create(t, n, r, a) {
          let i = (a = a || this.ngModule) instanceof K4 ? a : a?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const o = i ? new B_(t, i) : t,
            s = o.get(HC, Ki),
            c = o.get(I_, null),
            l = s.createRenderer(null, this.componentDef),
            C = this.componentDef.selectors[0][0] || "div",
            f = r
              ? (function hc(e, t, n) {
                  if (X2(e)) return e.selectRootElement(t, n === E3.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(l, r, this.componentDef.encapsulation)
              : xn(
                  s.createRenderer(null, this.componentDef),
                  C,
                  (function O_(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(C)
                ),
            d = this.componentDef.onPush ? 288 : 272,
            g = (function Oc(e, t) {
              return {
                components: [],
                scheduler: e || Ab,
                clean: LD,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            y = A8(0, null, null, 1, 0, null, null, null, null, null),
            x = U5(null, y, g, d, null, null, s, l, c, o, null);
          let F, k;
          n8(x);
          try {
            const O = (function Pc(e, t, n, r, a, i) {
              const o = n[1];
              n[22] = e;
              const c = T6(o, 22, 2, "#host", null),
                l = (c.mergedAttrs = t.hostAttrs);
              null !== l &&
                (k8(c, l, !0),
                null !== e &&
                  (s8(a, e, l),
                  null !== c.classes && Tn(a, e, c.classes),
                  null !== c.styles && Hs(a, e, c.styles)));
              const C = r.createRenderer(e, t),
                f = U5(
                  n,
                  uc(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  c,
                  r,
                  C,
                  i || null,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (f8(z5(c, n), o, t.type), Lc(o, c), Vc(c, n.length, 1)),
                E8(n, f),
                (n[22] = f)
              );
            })(f, this.componentDef, x, s, l);
            if (f)
              if (r) s8(l, f, ["ng-version", P_.full]);
              else {
                const { attrs: A, classes: q } = (function cS(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    a = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === a
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === a && n.push(i);
                    else {
                      if (!p3(a)) break;
                      a = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                A && s8(l, f, A), q && q.length > 0 && Tn(l, f, q.join(" "));
              }
            if (((k = $t(y, 22)), void 0 !== n)) {
              const A = (k.projection = []);
              for (let q = 0; q < this.ngContentSelectors.length; q++) {
                const n2 = n[q];
                A.push(null != n2 ? Array.from(n2) : null);
              }
            }
            (F = (function Rc(e, t, n, r, a) {
              const i = n[1],
                o = (function aD(e, t, n) {
                  const r = l1();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    yc(e, r, t, F6(e, t, 1, null), n));
                  const a = w5(t, e, r.directiveStart, r);
                  z1(a, t);
                  const i = i3(r, t);
                  return i && z1(i, t), a;
                })(i, n, t);
              if (
                (r.components.push(o),
                (e[8] = o),
                a && a.forEach((c) => c(o, t)),
                t.contentQueries)
              ) {
                const c = l1();
                t.contentQueries(1, o, c.directiveStart);
              }
              const s = l1();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (H4(s.index),
                  vc(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  Mc(t, o)),
                o
              );
            })(O, this.componentDef, x, g, [ND])),
              j5(y, x, null);
          } finally {
            r8();
          }
          return new j_(this.componentType, F, Z6(k, x), x, k);
        }
      }
      class j_ extends class A_ {} {
        constructor(t, n, r, a, i) {
          super(),
            (this.location = r),
            (this._rootLView = a),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new R_(a)),
            (this.componentType = t);
        }
        get injector() {
          return new y6(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class wC extends D4 {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new T7(this));
          const r = W1(t);
          (this._bootstrapComponents = i4(r.bootstrap)),
            (this._r3Injector = js(
              t,
              n,
              [
                { provide: D4, useValue: this },
                { provide: Z5, useValue: this.componentFactoryResolver },
              ],
              P2(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this.get(t));
        }
        get(t, n = w1.THROW_IF_NOT_FOUND, r = r2.Default) {
          return t === w1 || t === D4 || t === Pn
            ? this
            : this._r3Injector.get(t, n, r);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class I7 extends VC {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new wC(this.moduleType, t);
        }
      }
      class G_ extends D4 {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new T7(this)),
            (this.instance = null);
          const a = new Os(
            [
              ...t,
              { provide: D4, useValue: this },
              { provide: Z5, useValue: this.componentFactoryResolver },
            ],
            n || Bn(),
            r,
            new Set(["environment"])
          );
          (this.injector = a), a.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function $8(e, t = null, n = null) {
        return new G_(e, t, n).injector;
      }
      function P7(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const e1 = class uN extends _3 {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let a = t,
            i = n || (() => null),
            o = r;
          if (t && "object" == typeof t) {
            const c = t;
            (a = c.next?.bind(c)),
              (i = c.error?.bind(c)),
              (o = c.complete?.bind(c));
          }
          this.__isAsync && ((i = P7(i)), a && (a = P7(a)), o && (o = P7(o)));
          const s = super.subscribe({ next: a, error: i, complete: o });
          return t instanceof _ && t.add(s), s;
        }
      };
      function dN() {
        return this._results[Q4()]();
      }
      class R7 {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = Q4(),
            r = R7.prototype;
          r[n] || (r[n] = dN);
        }
        get changes() {
          return this._changes || (this._changes = new e1());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const a = Q1(t);
          (this._changesDetected = !(function cw(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let a = e[r],
                i = t[r];
              if ((n && ((a = n(a)), (i = n(i))), i !== a)) return !1;
            }
            return !0;
          })(r._results, a, n)) &&
            ((r._results = a),
            (r.length = a.length),
            (r.last = a[this.length - 1]),
            (r.first = a[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let c4 = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = mN), e;
      })();
      const hN = c4,
        pN = class extends hN {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              a = U5(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            a[17] = this._declarationLView[this._declarationTContainer.index];
            const o = this._declarationLView[19];
            return (
              null !== o && (a[19] = o.createEmbeddedView(r)),
              j5(r, a, t),
              new te(a)
            );
          }
        };
      function mN() {
        return G8(l1(), I());
      }
      function G8(e, t) {
        return 4 & e.type ? new pN(t, e, Z6(e, t)) : null;
      }
      let H3 = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = gN), e;
      })();
      function gN() {
        return EC(l1(), I());
      }
      const vN = H3,
        NC = class extends vN {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Z6(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new y6(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = C8(this._hostTNode, this._hostLView);
            if (uo(t)) {
              const n = V6(t, this._hostLView),
                r = L6(t);
              return new y6(n[1].data[r + 8], n);
            }
            return new y6(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = AC(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let a, i;
            "number" == typeof r
              ? (a = r)
              : null != r && ((a = r.index), (i = r.injector));
            const o = t.createEmbeddedView(n || {}, i);
            return this.insert(o, a), o;
          }
          createComponent(t, n, r, a, i) {
            const o =
              t &&
              !(function D5(e) {
                return "function" == typeof e;
              })(t);
            let s;
            if (o) s = n;
            else {
              const f = n || {};
              (s = f.index),
                (r = f.injector),
                (a = f.projectableNodes),
                (i = f.environmentInjector || f.ngModuleRef);
            }
            const c = o ? t : new F7(R2(t)),
              l = r || this.parentInjector;
            if (!i && null == c.ngModule) {
              const d = (o ? l : this.parentInjector).get(K4, null);
              d && (i = d);
            }
            const C = c.create(l, a, void 0, i);
            return this.insert(C.hostView, s), C;
          }
          insert(t, n) {
            const r = t._lView,
              a = r[1];
            if (
              (function Dz(e) {
                return d3(e[3]);
              })(r)
            ) {
              const C = this.indexOf(t);
              if (-1 !== C) this.detach(C);
              else {
                const f = r[3],
                  d = new NC(f, f[6], f[3]);
                d.detach(d.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              o = this._lContainer;
            !(function jb(e, t, n, r) {
              const a = 10 + r,
                i = n.length;
              r > 0 && (n[a - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[a]), zo(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const o = t[17];
              null !== o &&
                n !== o &&
                (function $b(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(o, t);
              const s = t[19];
              null !== s && s.insertView(e), (t[2] |= 64);
            })(a, r, o, i);
            const s = En(i, o),
              c = r[11],
              l = z8(c, o[7]);
            return (
              null !== l &&
                (function Ob(e, t, n, r, a, i) {
                  (r[0] = a), (r[6] = t), B5(e, r, n, 1, a, i);
                })(a, o[6], c, r, l, s),
              t.attachToViewContainerRef(),
              zo(O7(o), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = AC(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = _n(this._lContainer, n);
            r && (d8(O7(this._lContainer), n), Cs(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = _n(this._lContainer, n);
            return r && null != d8(O7(this._lContainer), n) ? new te(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function AC(e) {
        return e[8];
      }
      function O7(e) {
        return e[8] || (e[8] = []);
      }
      function EC(e, t) {
        let n;
        const r = t[e.index];
        if (d3(r)) n = r;
        else {
          let a;
          if (8 & e.type) a = r1(r);
          else {
            const i = t[11];
            a = i.createComment("");
            const o = i3(e, t);
            W4(
              i,
              z8(i, o),
              a,
              (function Yb(e, t) {
                return X2(e) ? e.nextSibling(t) : t.nextSibling;
              })(i, o),
              !1
            );
          }
          (t[e.index] = n = Hc(r, t, a, e)), E8(t, n);
        }
        return new NC(n, e, t);
      }
      class B7 {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new B7(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class U7 {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              a = [];
            for (let i = 0; i < r; i++) {
              const o = n.getByIndex(i);
              a.push(this.queries[o.indexInDeclarationView].clone());
            }
            return new U7(a);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== RC(t, n).matches && this.queries[n].setDirty();
        }
      }
      class kC {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class j7 {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const a = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, a);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new j7(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class $7 {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new $7(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let a = 0; a < r.length; a++) {
              const i = r[a];
              this.matchTNodeWithReadOption(t, n, VN(n, i)),
                this.matchTNodeWithReadOption(t, n, u8(n, t, i, !1, !1));
            }
          else
            r === c4
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, u8(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const a = this.metadata.read;
            if (null !== a)
              if (a === j1 || a === H3 || (a === c4 && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = u8(n, t, a, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function VN(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function HN(e, t, n, r) {
        return -1 === n
          ? (function yN(e, t) {
              return 11 & e.type ? Z6(e, t) : 4 & e.type ? G8(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function zN(e, t, n) {
              return n === j1
                ? Z6(t, e)
                : n === c4
                ? G8(t, e)
                : n === H3
                ? EC(t, e)
                : void 0;
            })(e, t, r)
          : w5(e, e[1], n, t);
      }
      function TC(e, t, n, r) {
        const a = t[19].queries[r];
        if (null === a.matches) {
          const i = e.data,
            o = n.matches,
            s = [];
          for (let c = 0; c < o.length; c += 2) {
            const l = o[c];
            s.push(l < 0 ? null : HN(t, i[l], o[c + 1], n.metadata.read));
          }
          a.matches = s;
        }
        return a.matches;
      }
      function G7(e, t, n, r) {
        const a = e.queries.getByIndex(n),
          i = a.matches;
        if (null !== i) {
          const o = TC(e, t, a, n);
          for (let s = 0; s < i.length; s += 2) {
            const c = i[s];
            if (c > 0) r.push(o[s / 2]);
            else {
              const l = i[s + 1],
                C = t[-c];
              for (let f = 10; f < C.length; f++) {
                const d = C[f];
                d[17] === d[3] && G7(d[1], d, l, r);
              }
              if (null !== C[9]) {
                const f = C[9];
                for (let d = 0; d < f.length; d++) {
                  const g = f[d];
                  G7(g[1], g, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function q8(e) {
        const t = I(),
          n = z2(),
          r = ro();
        Xt(r + 1);
        const a = RC(n, r);
        if (e.dirty && Qi(t) === (2 == (2 & a.metadata.flags))) {
          if (null === a.matches) e.reset([]);
          else {
            const i = a.crossesNgTemplate ? G7(n, t, r, []) : TC(n, t, a, r);
            e.reset(i, k_), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function FC(e, t, n) {
        const r = z2();
        r.firstCreatePass &&
          ((function PC(e, t, n) {
            null === e.queries && (e.queries = new j7()),
              e.queries.track(new $7(t, n));
          })(r, new kC(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function IC(e, t, n) {
            const r = new R7(4 == (4 & n));
            pc(e, t, r, r.destroy),
              null === t[19] && (t[19] = new U7()),
              t[19].queries.push(new B7(r));
          })(r, I(), t);
      }
      function RC(e, t) {
        return e.queries.getByIndex(t);
      }
      function W7(e, t) {
        return G8(e, t);
      }
      function K8(...e) {}
      const J7 = new s2("Application Initializer");
      let Q8 = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = K8),
              (this.reject = K8),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, a) => {
                (this.resolve = r), (this.reject = a);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let a = 0; a < this.appInits.length; a++) {
                const i = this.appInits[a]();
                if (q5(i)) n.push(i);
                else if (H7(i)) {
                  const o = new Promise((s, c) => {
                    i.subscribe({ complete: s, error: c });
                  });
                  n.push(o);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((a) => {
                this.reject(a);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(J7, 8));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ie = new s2("AppId", {
        providedIn: "root",
        factory: function af() {
          return `${Z7()}${Z7()}${Z7()}`;
        },
      });
      function Z7() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const of = new s2("Platform Initializer"),
        er = new s2("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        sf = new s2("appBootstrapListener");
      let qN = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const l4 = new s2("LocaleId", {
        providedIn: "root",
        factory: () =>
          (function Vw(e, t = r2.Default) {
            return W(e, t);
          })(l4, r2.Optional | r2.SkipSelf) ||
          (function WN() {
            return (typeof $localize < "u" && $localize.locale) || X6;
          })(),
      });
      class KN {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let tr = (() => {
        class e {
          compileModuleSync(n) {
            return new I7(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = i4(W1(n).declarations).reduce((o, s) => {
                const c = R2(s);
                return c && o.push(new F7(c)), o;
              }, []);
            return new KN(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const XN = (() => Promise.resolve(0))();
      function nr(e) {
        typeof Zone > "u"
          ? XN.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class a1 {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new e1(!1)),
            (this.onMicrotaskEmpty = new e1(!1)),
            (this.onStable = new e1(!1)),
            (this.onError = new e1(!1)),
            typeof Zone > "u")
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const a = this;
          (a._nesting = 0),
            (a._outer = a._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (a._inner = a._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (a._inner = a._inner.fork(Zone.longStackTraceZoneSpec)),
            (a.shouldCoalesceEventChangeDetection = !r && n),
            (a.shouldCoalesceRunChangeDetection = r),
            (a.lastRequestAnimationFrameId = -1),
            (a.nativeRequestAnimationFrame = (function JN() {
              let e = F2.requestAnimationFrame,
                t = F2.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function tA(e) {
              const t = () => {
                !(function eA(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(F2, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                ar(e),
                                (e.isCheckStableRunning = !0),
                                rr(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    ar(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, a, i, o, s) => {
                  try {
                    return cf(e), n.invokeTask(a, i, o, s);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      lf(e);
                  }
                },
                onInvoke: (n, r, a, i, o, s, c) => {
                  try {
                    return cf(e), n.invoke(a, i, o, s, c);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), lf(e);
                  }
                },
                onHasTask: (n, r, a, i) => {
                  n.hasTask(a, i),
                    r === a &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          ar(e),
                          rr(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, a, i) => (
                  n.handleError(a, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(a);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!a1.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (a1.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, a) {
          const i = this._inner,
            o = i.scheduleEventTask("NgZoneEvent: " + a, t, ZN, K8, K8);
          try {
            return i.runTask(o, n, r);
          } finally {
            i.cancelTask(o);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const ZN = {};
      function rr(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function ar(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function cf(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function lf(e) {
        e._nesting--, rr(e);
      }
      class nA {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new e1()),
            (this.onMicrotaskEmpty = new e1()),
            (this.onStable = new e1()),
            (this.onError = new e1());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, a) {
          return t.apply(n, r);
        }
      }
      const Cf = new s2(""),
        X8 = new s2("");
      let sr,
        ir = (() => {
          class e {
            constructor(n, r, a) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                sr ||
                  ((function rA(e) {
                    sr = e;
                  })(a),
                  a.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      a1.assertNotInAngularZone(),
                        nr(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                nr(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, a) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: a });
            }
            whenStable(n, r, a) {
              if (a && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, a), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, a) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(a1), W(or), W(X8));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        or = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return sr?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = e2({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        x4 = null;
      const ff = new s2("AllowMultipleToken"),
        uf = new s2("PlatformOnDestroy");
      class df {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function pf(e, t, n = []) {
        const r = `Platform: ${t}`,
          a = new s2(r);
        return (i = []) => {
          let o = cr();
          if (!o || o.injector.get(ff, !1)) {
            const s = [...n, ...i, { provide: a, useValue: !0 }];
            e
              ? e(s)
              : (function oA(e) {
                  if (x4 && !x4.get(ff, !1)) throw new p2(400, "");
                  x4 = e;
                  const t = e.get(gf);
                  (function hf(e) {
                    const t = e.get(of, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function mf(e = [], t) {
                    return w1.create({
                      name: t,
                      providers: [
                        { provide: Rn, useValue: "platform" },
                        { provide: uf, useValue: () => (x4 = null) },
                        ...e,
                      ],
                    });
                  })(s, r)
                );
          }
          return (function cA(e) {
            const t = cr();
            if (!t) throw new p2(401, "");
            return t;
          })();
        };
      }
      function cr() {
        return x4?.get(gf) ?? null;
      }
      let gf = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function lA(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new nA()
                      : ("zone.js" === e ? void 0 : e) || new a1(t)),
                  n
                );
              })(
                r?.ngZone,
                (function vf(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: a1, useValue: a }];
            return a.run(() => {
              const o = w1.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                s = n.create(o),
                c = s.injector.get(_6, null);
              if (!c) throw new p2(402, "");
              return (
                a.runOutsideAngular(() => {
                  const l = a.onError.subscribe({
                    next: (C) => {
                      c.handleError(C);
                    },
                  });
                  s.onDestroy(() => {
                    Z8(this._modules, s), l.unsubscribe();
                  });
                }),
                (function Mf(e, t, n) {
                  try {
                    const r = n();
                    return q5(r)
                      ? r.catch((a) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(a)), a)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(c, a, () => {
                  const l = s.injector.get(Q8);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Kl(e) {
                          q1(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Yl = e.toLowerCase().replace(/_/g, "-"));
                        })(s.injector.get(l4, X6) || X6),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const a = Lf({}, r);
            return (function aA(e, t, n) {
              const r = new I7(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, a));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(J8);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((a) => r.bootstrap(a));
            else {
              if (!n.instance.ngDoBootstrap) throw new p2(403, "");
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new p2(404, "");
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r()),
              this._injector.get(uf, null)?.(),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(w1));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Lf(e, t) {
        return Array.isArray(t) ? t.reduce(Lf, e) : { ...e, ...t };
      }
      let J8 = (() => {
        class e {
          constructor(n, r, a, i) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = a),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new N2((c) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    c.next(this._stable), c.complete();
                  });
              }),
              s = new N2((c) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    a1.assertNotInAngularZone(),
                      nr(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), c.next(!0));
                      });
                  });
                });
                const C = this._zone.onUnstable.subscribe(() => {
                  a1.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        c.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), C.unsubscribe();
                };
              });
            this.isStable = (function KH(...e) {
              const t = d5(e),
                n = (function UH(e, t) {
                  return "number" == typeof wt(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? N3(r[0])
                  : u6(n)(c1(r, t))
                : J3;
            })(o, s.pipe(Ti()));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const a = n instanceof yC;
            if (!this._initStatus.done)
              throw (
                (!a &&
                  (function t5(e) {
                    const t = R2(e) || _1(e) || N1(e);
                    return null !== t && t.standalone;
                  })(n),
                new p2(405, false))
              );
            let i;
            (i = a ? n : this._injector.get(Z5).resolveComponentFactory(n)),
              this.componentTypes.push(i.componentType);
            const o = (function iA(e) {
                return e.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(D4),
              c = i.create(w1.NULL, [], r || i.selector, o),
              l = c.location.nativeElement,
              C = c.injector.get(Cf, null);
            return (
              C?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  Z8(this.components, c),
                  C?.unregisterApplication(l);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new p2(101, "");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Z8(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(sf, [])
                .concat(this._bootstrapListeners)
                .forEach((a) => a(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Z8(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new p2(406, false);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(a1), W(w1), W(_6), W(Q8));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Z8(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let yf = !0,
        e0 = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = uA), e;
        })();
      function uA(e) {
        return (function dA(e, t, n) {
          if (Je(e) && !n) {
            const r = K1(e.index, t);
            return new te(r, r);
          }
          return 47 & e.type ? new te(t[16], t) : null;
        })(l1(), I(), 16 == (16 & e));
      }
      class Sf {
        constructor() {}
        supports(t) {
          return $5(t);
        }
        create(t) {
          return new MA(t);
        }
      }
      const vA = (e, t) => t;
      class MA {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || vA);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            a = 0,
            i = null;
          for (; n || r; ) {
            const o = !r || (n && n.currentIndex < xf(r, a, i)) ? n : r,
              s = xf(o, a, i),
              c = o.currentIndex;
            if (o === r) a--, (r = r._nextRemoved);
            else if (((n = n._next), null == o.previousIndex)) a++;
            else {
              i || (i = []);
              const l = s - a,
                C = c - a;
              if (l != C) {
                for (let d = 0; d < l; d++) {
                  const g = d < i.length ? i[d] : (i[d] = 0),
                    y = g + d;
                  C <= y && y < l && (i[d] = g + 1);
                }
                i[o.previousIndex] = C - l;
              }
            }
            s !== c && t(o, s, c);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !$5(t))) throw new p2(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let a,
            i,
            o,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let s = 0; s < this.length; s++)
              (i = t[s]),
                (o = this._trackByFn(s, i)),
                null !== n && Object.is(n.trackById, o)
                  ? (r && (n = this._verifyReinsertion(n, i, o, s)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, o, s)), (r = !0)),
                (n = n._next);
          } else
            (a = 0),
              (function OD(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Q4()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (s) => {
                (o = this._trackByFn(a, s)),
                  null !== n && Object.is(n.trackById, o)
                    ? (r && (n = this._verifyReinsertion(n, s, o, a)),
                      Object.is(n.item, s) || this._addIdentityChange(n, s))
                    : ((n = this._mismatch(n, s, o, a)), (r = !0)),
                  (n = n._next),
                  a++;
              }),
              (this.length = a);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, a) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, a))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, a))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, a))
              : (t = this._addAfter(new LA(n, r), i, a)),
            t
          );
        }
        _verifyReinsertion(t, n, r, a) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, a))
              : t.currentIndex != a &&
                ((t.currentIndex = a), this._addToMoves(t, a)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const a = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === a ? (this._removalsHead = i) : (a._nextRemoved = i),
            null === i ? (this._removalsTail = a) : (i._prevRemoved = a),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const a = null === n ? this._itHead : n._next;
          return (
            (t._next = a),
            (t._prev = n),
            null === a ? (this._itTail = t) : (a._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Df()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Df()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class LA {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class VA {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Df {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new VA()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const a = this.map.get(t);
          return a ? a.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function xf(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let a = 0;
        return n && r < n.length && (a = n[r]), r + t + a;
      }
      function Nf() {
        return new r0([new Sf()]);
      }
      let r0 = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const a = r.factories.slice();
              n = n.concat(a);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Nf()),
              deps: [[e, new E5(), new a4()]],
            };
          }
          find(n) {
            const r = this.factories.find((a) => a.supports(n));
            if (null != r) return r;
            throw new p2(901, "");
          }
        }
        return (e.ɵprov = e2({ token: e, providedIn: "root", factory: Nf })), e;
      })();
      const bA = pf(null, "core", []);
      let SA = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(J8));
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({})),
            e
          );
        })(),
        a0 = null;
      function q3() {
        return a0;
      }
      const M1 = new s2("DocumentToken");
      let se = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({
            token: e,
            factory: function () {
              return (function NA() {
                return W(Ef);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const AA = new s2("Location Initialized");
      let Ef = (() => {
        class e extends se {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return q3().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = q3().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = q3().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, a) {
            kf() ? this._history.pushState(n, r, a) : (this.location.hash = a);
          }
          replaceState(n, r, a) {
            kf()
              ? this._history.replaceState(n, r, a)
              : (this.location.hash = a);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(M1));
          }),
          (e.ɵprov = e2({
            token: e,
            factory: function () {
              return (function EA() {
                return new Ef(W(M1));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function kf() {
        return !!window.history.pushState;
      }
      function dr(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Tf(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function f4(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let r5 = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({
            token: e,
            factory: function () {
              return (function kA() {
                const e = W(M1).location;
                return new Ff(W(se), (e && e.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const hr = new s2("appBaseHref");
      let Ff = (() => {
          class e extends r5 {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return dr(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  f4(this._platformLocation.search),
                a = this._platformLocation.hash;
              return a && n ? `${r}${a}` : r;
            }
            pushState(n, r, a, i) {
              const o = this.prepareExternalUrl(a + f4(i));
              this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, a, i) {
              const o = this.prepareExternalUrl(a + f4(i));
              this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(se), W(hr, 8));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        TA = (() => {
          class e extends r5 {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = dr(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, a, i) {
              let o = this.prepareExternalUrl(a + f4(i));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, a, i) {
              let o = this.prepareExternalUrl(a + f4(i));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(se), W(hr, 8));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        pr = (() => {
          class e {
            constructor(n) {
              (this._subject = new e1()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = Tf(If(r))),
                this._locationStrategy.onPopState((a) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: a.state,
                    type: a.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + f4(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function IA(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, If(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", a = null) {
              this._locationStrategy.pushState(a, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + f4(r)),
                  a
                );
            }
            replaceState(n, r = "", a = null) {
              this._locationStrategy.replaceState(a, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + f4(r)),
                  a
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((a) => a(n, r));
            }
            subscribe(n, r, a) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: a,
              });
            }
          }
          return (
            (e.normalizeQueryParams = f4),
            (e.joinWithSlash = dr),
            (e.stripTrailingSlash = Tf),
            (e.ɵfac = function (n) {
              return new (n || e)(W(r5));
            }),
            (e.ɵprov = e2({
              token: e,
              factory: function () {
                return (function FA() {
                  return new pr(W(r5));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function If(e) {
        return e.replace(/\/index.html$/, "");
      }
      function qf(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [a, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (a.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class yE {
        constructor(t, n, r, a) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = a);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Yf = (() => {
        class e {
          constructor(n, r, a) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = a),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((a, i, o) => {
              if (null == a.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new yE(a.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                );
              else if (null == o) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const s = r.get(i);
                r.move(s, o), Kf(s, a);
              }
            });
            for (let a = 0, i = r.length; a < i; a++) {
              const s = r.get(a).context;
              (s.index = a), (s.count = i), (s.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((a) => {
              Kf(r.get(a.currentIndex), a);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(H3), T(c4), T(r0));
          }),
          (e.ɵdir = a2({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          e
        );
      })();
      function Kf(e, t) {
        e.context.$implicit = t.item;
      }
      let wr = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new HE()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Qf("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Qf("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(H3), T(c4));
          }),
          (e.ɵdir = a2({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          e
        );
      })();
      class HE {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Qf(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${P2(t)}'.`
          );
      }
      let QE = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = x1({ type: e })),
          (e.ɵinj = V1({})),
          e
        );
      })();
      let ek = (() => {
        class e {}
        return (
          (e.ɵprov = e2({
            token: e,
            providedIn: "root",
            factory: () => new tk(W(M1), window),
          })),
          e
        );
      })();
      class tk {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function nk(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let a = r.currentNode;
              for (; a; ) {
                const i = a.shadowRoot;
                if (i) {
                  const o =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (o) return o;
                }
                a = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            a = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], a - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              eu(this.window.history) ||
              eu(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function eu(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class tu {}
      class _r extends class rk extends class _A {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function xA(e) {
            a0 || (a0 = e);
          })(new _r());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function ak() {
            return (
              (Ce = Ce || document.querySelector("base")),
              Ce ? Ce.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function ik(e) {
                (p0 = p0 || document.createElement("a")),
                  p0.setAttribute("href", e);
                const t = p0.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ce = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return qf(document.cookie, t);
        }
      }
      let p0,
        Ce = null;
      const nu = new s2("TRANSITION_ID"),
        sk = [
          {
            provide: J7,
            useFactory: function ok(e, t, n) {
              return () => {
                n.get(Q8).donePromise.then(() => {
                  const r = q3(),
                    a = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < a.length; i++) r.remove(a[i]);
                });
              };
            },
            deps: [nu, M1, w1],
            multi: !0,
          },
        ];
      let lk = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const m0 = new s2("EventManagerPlugins");
      let g0 = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((a) => (a.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, a) {
            return this._findPluginFor(r).addEventListener(n, r, a);
          }
          addGlobalEventListener(n, r, a) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, a);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const a = this._plugins;
            for (let i = 0; i < a.length; i++) {
              const o = a[i];
              if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(m0), W(a1));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ru {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const a = q3().getGlobalEventTarget(this._doc, t);
          if (!a)
            throw new Error(`Unsupported event target ${a} for event ${n}`);
          return this.addEventListener(a, n, r);
        }
      }
      let au = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((a) => {
                this._stylesSet.has(a) || (this._stylesSet.add(a), r.add(a));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        fe = (() => {
          class e extends au {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, a) {
              n.forEach((i) => {
                const o = this._doc.createElement("style");
                (o.textContent = i), a.push(r.appendChild(o));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(iu), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, a) => {
                this._addStylesToHost(n, a, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(iu));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(M1));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function iu(e) {
        q3().remove(e);
      }
      const Nr = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ar = /%COMP%/g;
      function v0(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let a = t[r];
          Array.isArray(a) ? v0(e, a, n) : ((a = a.replace(Ar, e)), n.push(a));
        }
        return n;
      }
      function cu(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Er = (() => {
        class e {
          constructor(n, r, a) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = a),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new kr(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case E3.Emulated: {
                let a = this.rendererByCompId.get(r.id);
                return (
                  a ||
                    ((a = new pk(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, a)),
                  a.applyToHost(n),
                  a
                );
              }
              case 1:
              case E3.ShadowDom:
                return new mk(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const a = v0(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(a),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(g0), W(fe), W(ie));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class kr {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Nr[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Cu(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Cu(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, a) {
          if (a) {
            n = a + ":" + n;
            const i = Nr[a];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const a = Nr[r];
            a ? t.removeAttributeNS(a, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, a) {
          a & (Z1.DashCase | Z1.Important)
            ? t.style.setProperty(n, r, a & Z1.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Z1.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, cu(r))
            : this.eventManager.addEventListener(t, n, cu(r));
        }
      }
      function Cu(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class pk extends kr {
        constructor(t, n, r, a) {
          super(t), (this.component = r);
          const i = v0(a + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function uk(e) {
              return "_ngcontent-%COMP%".replace(Ar, e);
            })(a + "-" + r.id)),
            (this.hostAttr = (function dk(e) {
              return "_nghost-%COMP%".replace(Ar, e);
            })(a + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class mk extends kr {
        constructor(t, n, r, a) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = v0(a.id, a.styles, []);
          for (let o = 0; o < i.length; o++) {
            const s = document.createElement("style");
            (s.textContent = i[o]), this.shadowRoot.appendChild(s);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let gk = (() => {
        class e extends ru {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, a) {
            return (
              n.addEventListener(r, a, !1),
              () => this.removeEventListener(n, r, a)
            );
          }
          removeEventListener(n, r, a) {
            return n.removeEventListener(r, a);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(M1));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const fu = ["alt", "control", "meta", "shift"],
        Mk = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        uu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Lk = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let Vk = (() => {
        class e extends ru {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, a) {
            const i = e.parseEventName(r),
              o = e.eventCallback(i.fullKey, a, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => q3().onAndCancel(n, i.domEventName, o));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              a = r.shift();
            if (0 === r.length || ("keydown" !== a && "keyup" !== a))
              return null;
            const i = e._normalizeKey(r.pop());
            let o = "";
            if (
              (fu.forEach((c) => {
                const l = r.indexOf(c);
                l > -1 && (r.splice(l, 1), (o += c + "."));
              }),
              (o += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const s = {};
            return (s.domEventName = a), (s.fullKey = o), s;
          }
          static getEventFullKey(n) {
            let r = "",
              a = (function yk(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && uu.hasOwnProperty(t) && (t = uu[t]));
                }
                return Mk[t] || t;
              })(n);
            return (
              (a = a.toLowerCase()),
              " " === a ? (a = "space") : "." === a && (a = "dot"),
              fu.forEach((i) => {
                i != a && Lk[i](n) && (r += i + ".");
              }),
              (r += a),
              r
            );
          }
          static eventCallback(n, r, a) {
            return (i) => {
              e.getEventFullKey(i) === n && a.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(M1));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bk = pf(bA, "browser", [
          { provide: er, useValue: "browser" },
          {
            provide: of,
            useValue: function Hk() {
              _r.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: M1,
            useFactory: function wk() {
              return (
                (function zz(e) {
                  Ut = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        hu = new s2(""),
        pu = [
          {
            provide: X8,
            useClass: class ck {
              addToWindow(t) {
                (F2.getAngularTestability = (r, a = !0) => {
                  const i = t.findTestabilityInTree(r, a);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (F2.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (F2.getAllAngularRootElements = () => t.getAllRootElements()),
                  F2.frameworkStabilizers || (F2.frameworkStabilizers = []),
                  F2.frameworkStabilizers.push((r) => {
                    const a = F2.getAllAngularTestabilities();
                    let i = a.length,
                      o = !1;
                    const s = function (c) {
                      (o = o || c), i--, 0 == i && r(o);
                    };
                    a.forEach(function (c) {
                      c.whenStable(s);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? q3().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Cf, useClass: ir, deps: [a1, or, X8] },
          { provide: ir, useClass: ir, deps: [a1, or, X8] },
        ],
        mu = [
          { provide: Rn, useValue: "root" },
          {
            provide: _6,
            useFactory: function zk() {
              return new _6();
            },
            deps: [],
          },
          { provide: m0, useClass: gk, multi: !0, deps: [M1, a1, er] },
          { provide: m0, useClass: Vk, multi: !0, deps: [M1] },
          { provide: Er, useClass: Er, deps: [g0, fe, ie] },
          { provide: HC, useExisting: Er },
          { provide: au, useExisting: fe },
          { provide: fe, useClass: fe, deps: [M1] },
          { provide: g0, useClass: g0, deps: [m0, a1] },
          { provide: tu, useClass: lk, deps: [] },
          [],
        ];
      let Sk = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: ie, useValue: n.appId },
                  { provide: nu, useExisting: ie },
                  sk,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(hu, 12));
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({ providers: [...mu, ...pu], imports: [QE, SA] })),
            e
          );
        })(),
        gu = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(M1));
            }),
            (e.ɵprov = e2({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function xk() {
                        return new gu(W(M1));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      let Lu = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = e2({
              token: e,
              factory: function (n) {
                let r = null;
                return (r = n ? new (n || e)() : W(Vu)), r;
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Vu = (() => {
          class e extends Lu {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case U2.NONE:
                  return r;
                case U2.HTML:
                  return I3(r, "HTML")
                    ? J1(r)
                    : Yo(this._doc, String(r)).toString();
                case U2.STYLE:
                  return I3(r, "Style") ? J1(r) : r;
                case U2.SCRIPT:
                  if (I3(r, "Script")) return J1(r);
                  throw new Error("unsafe value used in a script context");
                case U2.URL:
                  return Oo(r), I3(r, "URL") ? J1(r) : F5(String(r));
                case U2.RESOURCE_URL:
                  if (I3(r, "ResourceURL")) return J1(r);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${n} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function Bw(e) {
                return new Fw(e);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function Uw(e) {
                return new Iw(e);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function jw(e) {
                return new Pw(e);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function $w(e) {
                return new Rw(e);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function Gw(e) {
                return new Ow(e);
              })(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(M1));
            }),
            (e.ɵprov = e2({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Ik(e) {
                        return new Vu(e.get(M1));
                      })(W(w1))),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      var yu = V(38),
        Hu = V.n(yu);
      class Ir {
        constructor(t) {
          (this.config = t),
            (this.subscribersCounter = {}),
            (this.eventObservables$ = {}),
            (this.emptyConfig = { url: "", options: {} }),
            void 0 === t && (t = this.emptyConfig);
          const n = t.url,
            r = t.options,
            a = Hu() ? Hu() : yu;
          this.ioSocket = a(n, r);
        }
        of(t) {
          this.ioSocket.of(t);
        }
        on(t, n) {
          this.ioSocket.on(t, n);
        }
        once(t, n) {
          this.ioSocket.once(t, n);
        }
        connect() {
          return this.ioSocket.connect();
        }
        disconnect(t) {
          return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
        }
        emit(t, ...n) {
          return this.ioSocket.emit.apply(this.ioSocket, arguments);
        }
        removeListener(t, n) {
          return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
        }
        removeAllListeners(t) {
          return this.ioSocket.removeAllListeners.apply(
            this.ioSocket,
            arguments
          );
        }
        fromEvent(t) {
          return (
            this.subscribersCounter[t] || (this.subscribersCounter[t] = 0),
            this.subscribersCounter[t]++,
            this.eventObservables$[t] ||
              (this.eventObservables$[t] = new N2((n) => {
                const r = (a) => {
                  n.next(a);
                };
                return (
                  this.ioSocket.on(t, r),
                  () => {
                    this.subscribersCounter[t]--,
                      0 === this.subscribersCounter[t] &&
                        (this.ioSocket.removeListener(t, r),
                        delete this.eventObservables$[t]);
                  }
                );
              }).pipe(Ti())),
            this.eventObservables$[t]
          );
        }
        fromOneTimeEvent(t) {
          return new Promise((n) => this.once(t, n));
        }
      }
      function Pk(e) {
        return new Ir(e);
      }
      const zu = new s2("__SOCKET_IO_CONFIG__");
      let Rk = (() => {
        class e {
          static forRoot(n) {
            return {
              ngModule: e,
              providers: [
                { provide: zu, useValue: n },
                { provide: Ir, useFactory: Pk, deps: [zu] },
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = x1({ type: e })),
          (e.ɵinj = V1({})),
          e
        );
      })();
      const { isArray: Ok } = Array,
        { getPrototypeOf: Bk, prototype: Uk, keys: jk } = Object;
      function bu(e) {
        if (1 === e.length) {
          const t = e[0];
          if (Ok(t)) return { args: t, keys: null };
          if (
            (function $k(e) {
              return e && "object" == typeof e && Bk(e) === Uk;
            })(t)
          ) {
            const n = jk(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: Gk } = Array;
      function Su(e) {
        return S2((t) =>
          (function qk(e, t) {
            return Gk(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function Du(e, t) {
        return e.reduce((n, r, a) => ((n[r] = t[a]), n), {});
      }
      let xu = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (a) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T($3), T(j1));
            }),
            (e.ɵdir = a2({ type: e })),
            e
          );
        })(),
        e6 = (() => {
          class e extends xu {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (
                  t ||
                  (t = (function H1(e) {
                    return V4(() => {
                      const t = e.prototype.constructor,
                        n = t[e4] || an(t),
                        r = Object.prototype;
                      let a = Object.getPrototypeOf(e.prototype).constructor;
                      for (; a && a !== r; ) {
                        const i = a[e4] || an(a);
                        if (i && i !== n) return i;
                        a = Object.getPrototypeOf(a);
                      }
                      return (i) => new i();
                    });
                  })(e))
                )(r || e);
              };
            })()),
            (e.ɵdir = a2({ type: e, features: [E2] })),
            e
          );
        })();
      const W3 = new s2("NgValueAccessor"),
        Kk = { provide: W3, useExisting: O2(() => ue), multi: !0 },
        Xk = new s2("CompositionEventMode");
      let ue = (() => {
        class e extends xu {
          constructor(n, r, a) {
            super(n, r),
              (this._compositionMode = a),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function Qk() {
                  const e = q3() ? q3().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T($3), T(j1), T(Xk, 8));
          }),
          (e.ɵdir = a2({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Y2("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [W2([Kk]), E2],
          })),
          e
        );
      })();
      const S1 = new s2("NgValidators"),
        A4 = new s2("NgAsyncValidators");
      function Ou(e) {
        return null != e;
      }
      function Bu(e) {
        const t = q5(e) ? c1(e) : e;
        return H7(t), t;
      }
      function Uu(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function ju(e, t) {
        return t.map((n) => n(e));
      }
      function $u(e) {
        return e.map((t) =>
          (function Zk(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function Pr(e) {
        return null != e
          ? (function Gu(e) {
              if (!e) return null;
              const t = e.filter(Ou);
              return 0 == t.length
                ? null
                : function (n) {
                    return Uu(ju(n, t));
                  };
            })($u(e))
          : null;
      }
      function Rr(e) {
        return null != e
          ? (function qu(e) {
              if (!e) return null;
              const t = e.filter(Ou);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function Wk(...e) {
                      const t = Ni(e),
                        { args: n, keys: r } = bu(e),
                        a = new N2((i) => {
                          const { length: o } = n;
                          if (!o) return void i.complete();
                          const s = new Array(o);
                          let c = o,
                            l = o;
                          for (let C = 0; C < o; C++) {
                            let f = !1;
                            N3(n[C]).subscribe(
                              p1(
                                i,
                                (d) => {
                                  f || ((f = !0), l--), (s[C] = d);
                                },
                                () => c--,
                                void 0,
                                () => {
                                  (!c || !f) &&
                                    (l || i.next(r ? Du(r, s) : s),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? a.pipe(Su(t)) : a;
                    })(ju(n, t).map(Bu)).pipe(S2(Uu));
                  };
            })($u(e))
          : null;
      }
      function Wu(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Yu(e) {
        return e._rawValidators;
      }
      function Ku(e) {
        return e._rawAsyncValidators;
      }
      function Or(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function L0(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function Qu(e, t) {
        const n = Or(t);
        return (
          Or(e).forEach((a) => {
            L0(n, a) || n.push(a);
          }),
          n
        );
      }
      function Xu(e, t) {
        return Or(t).filter((n) => !L0(e, n));
      }
      class Ju {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Pr(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Rr(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class R1 extends Ju {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class E4 extends Ju {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Zu {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let Br = (() => {
          class e extends Zu {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(E4, 2));
            }),
            (e.ɵdir = a2({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  I8("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [E2],
            })),
            e
          );
        })(),
        Ur = (() => {
          class e extends Zu {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(R1, 10));
            }),
            (e.ɵdir = a2({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  I8("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [E2],
            })),
            e
          );
        })();
      const de = "VALID",
        y0 = "INVALID",
        a5 = "PENDING",
        he = "DISABLED";
      function qr(e) {
        return (H0(e) ? e.validators : e) || null;
      }
      function td(e) {
        return Array.isArray(e) ? Pr(e) : e || null;
      }
      function Wr(e, t) {
        return (H0(t) ? t.asyncValidators : e) || null;
      }
      function nd(e) {
        return Array.isArray(e) ? Rr(e) : e || null;
      }
      function H0(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      function rd(e, t, n) {
        const r = e.controls;
        if (!(t ? Object.keys(r) : r).length) throw new p2(1e3, "");
        if (!r[n]) throw new p2(1001, "");
      }
      function ad(e, t, n) {
        e._forEachChild((r, a) => {
          if (void 0 === n[a]) throw new p2(1002, "");
        });
      }
      class z0 {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = n),
            (this._composedValidatorFn = td(this._rawValidators)),
            (this._composedAsyncValidatorFn = nd(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === de;
        }
        get invalid() {
          return this.status === y0;
        }
        get pending() {
          return this.status == a5;
        }
        get disabled() {
          return this.status === he;
        }
        get enabled() {
          return this.status !== he;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = td(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = nd(t));
        }
        addValidators(t) {
          this.setValidators(Qu(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Qu(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(Xu(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(Xu(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return L0(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return L0(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = a5),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = he),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = de),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === de || this.status === a5) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? he : de;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = a5), (this._hasOwnPendingAsyncValidator = !0);
            const n = Bu(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, a) => r && r._find(a), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new e1()), (this.statusChanges = new e1());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? he
            : this.errors
            ? y0
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(a5)
            ? a5
            : this._anyControlsHaveStatus(y0)
            ? y0
            : de;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          H0(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
      }
      class w0 extends z0 {
        constructor(t, n, r) {
          super(qr(n), Wr(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          ad(this, 0, t),
            Object.keys(t).forEach((r) => {
              rd(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const a = this.controls[r];
              a && a.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, a) => {
            r.reset(t[a], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, a) => ((r.enabled || this.disabled) && (n[a] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((a, i) => {
              r = n(r, a, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      function pe(e, t) {
        Yr(e, t),
          t.valueAccessor.writeValue(e.value),
          e.disabled && t.valueAccessor.setDisabledState?.(!0),
          (function cT(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && id(e, t);
            });
          })(e, t),
          (function CT(e, t) {
            const n = (r, a) => {
              t.valueAccessor.writeValue(r), a && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function lT(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && id(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function sT(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function S0(e, t, n = !0) {
        const r = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(r),
          t.valueAccessor.registerOnTouched(r)),
          x0(e, t),
          e &&
            (t._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}));
      }
      function D0(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function Yr(e, t) {
        const n = Yu(e);
        null !== t.validator
          ? e.setValidators(Wu(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = Ku(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(Wu(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const a = () => e.updateValueAndValidity();
        D0(t._rawValidators, a), D0(t._rawAsyncValidators, a);
      }
      function x0(e, t) {
        let n = !1;
        if (null !== e) {
          if (null !== t.validator) {
            const a = Yu(e);
            if (Array.isArray(a) && a.length > 0) {
              const i = a.filter((o) => o !== t.validator);
              i.length !== a.length && ((n = !0), e.setValidators(i));
            }
          }
          if (null !== t.asyncValidator) {
            const a = Ku(e);
            if (Array.isArray(a) && a.length > 0) {
              const i = a.filter((o) => o !== t.asyncValidator);
              i.length !== a.length && ((n = !0), e.setAsyncValidators(i));
            }
          }
        }
        const r = () => {};
        return D0(t._rawValidators, r), D0(t._rawAsyncValidators, r), n;
      }
      function id(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function ld(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function Cd(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const ge = class extends z0 {
        constructor(t = null, n, r) {
          super(qr(n), Wr(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            H0(n) &&
              (n.nonNullable || n.initialValueIsDefault) &&
              (this.defaultValue = Cd(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          ld(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          ld(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          Cd(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      let Jr = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = a2({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        md = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({})),
            e
          );
        })();
      const Zr = new s2("NgModelWithFormControlWarning"),
        zT = { provide: R1, useExisting: O2(() => ve) };
      let ve = (() => {
        class e extends R1 {
          constructor(n, r) {
            super(),
              (this.validators = n),
              (this.asyncValidators = r),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new e1()),
              this._setValidators(n),
              this._setAsyncValidators(r);
          }
          ngOnChanges(n) {
            this._checkFormPresent(),
              n.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (x0(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(n) {
            const r = this.form.get(n.path);
            return (
              pe(r, n),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(n),
              r
            );
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            S0(n.control || null, n, !1),
              (function hT(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
              })(this.directives, n);
          }
          addFormGroup(n) {
            this._setUpFormContainer(n);
          }
          removeFormGroup(n) {
            this._cleanUpFormContainer(n);
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          addFormArray(n) {
            this._setUpFormContainer(n);
          }
          removeFormArray(n) {
            this._cleanUpFormContainer(n);
          }
          getFormArray(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            this.form.get(n.path).setValue(r);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function cd(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(n),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((n) => {
              const r = n.control,
                a = this.form.get(n.path);
              r !== a &&
                (S0(r || null, n),
                ((e) => e instanceof ge)(a) && (pe(a, n), (n.control = a)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(n) {
            const r = this.form.get(n.path);
            (function od(e, t) {
              Yr(e, t);
            })(r, n),
              r.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(n) {
            if (this.form) {
              const r = this.form.get(n.path);
              r &&
                (function fT(e, t) {
                  return x0(e, t);
                })(r, n) &&
                r.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Yr(this.form, this), this._oldForm && x0(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(S1, 10), T(A4, 10));
          }),
          (e.ɵdir = a2({
            type: e,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (n, r) {
              1 & n &&
                Y2("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [W2([zT]), E2, E1],
          })),
          e
        );
      })();
      const ST = { provide: E4, useExisting: O2(() => _0) };
      let _0 = (() => {
          class e extends E4 {
            constructor(n, r, a, i, o) {
              super(),
                (this._ngModelWarningConfig = o),
                (this._added = !1),
                (this.update = new e1()),
                (this._ngModelWarningSent = !1),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(a),
                (this.valueAccessor = (function Qr(e, t) {
                  if (!t) return null;
                  let n, r, a;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === ue
                        ? (n = i)
                        : (function dT(e) {
                            return Object.getPrototypeOf(e.constructor) === e6;
                          })(i)
                        ? (r = i)
                        : (a = i);
                    }),
                    a || r || n || null
                  );
                })(0, i));
            }
            set isDisabled(n) {}
            ngOnChanges(n) {
              this._added || this._setUpControl(),
                (function Kr(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            get path() {
              return (function b0(e, t) {
                return [...t.path, e];
              })(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                (this._added = !0);
            }
          }
          return (
            (e._ngModelWarningSentOnce = !1),
            (e.ɵfac = function (n) {
              return new (n || e)(
                T(R1, 13),
                T(S1, 10),
                T(A4, 10),
                T(W3, 10),
                T(Zr, 8)
              );
            }),
            (e.ɵdir = a2({
              type: e,
              selectors: [["", "formControlName", ""]],
              inputs: {
                name: ["formControlName", "name"],
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
              },
              outputs: { update: "ngModelChange" },
              features: [W2([ST]), E2, E1],
            })),
            e
          );
        })(),
        Ad = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({ imports: [md] })),
            e
          );
        })(),
        UT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({ imports: [Ad] })),
            e
          );
        })(),
        Ed = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Zr, useValue: n.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({ imports: [Ad] })),
            e
          );
        })();
      class kd extends z0 {
        constructor(t, n, r) {
          super(qr(n), Wr(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[this._adjustIndex(t)];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          let r = this._adjustIndex(t);
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          let a = this._adjustIndex(t);
          a < 0 && (a = 0),
            this.controls[a] &&
              this.controls[a]._registerOnCollectionChange(() => {}),
            this.controls.splice(a, 1),
            n && (this.controls.splice(a, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          ad(this, 0, t),
            t.forEach((r, a) => {
              rd(this, !1, a),
                this.at(a).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, a) => {
              this.at(a) &&
                this.at(a).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, a) => {
            r.reset(t[a], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => t.getRawValue());
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _adjustIndex(t) {
          return t < 0 ? t + this.length : t;
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(t) {
          return this.at(t) ?? null;
        }
      }
      function i9(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        );
      }
      let Td = (() => {
        class e {
          constructor() {
            this.useNonNullable = !1;
          }
          get nonNullable() {
            const n = new e();
            return (n.useNonNullable = !0), n;
          }
          group(n, r = null) {
            const a = this._reduceControls(n);
            let s,
              i = null,
              o = null;
            return (
              null !== r &&
                (i9(r)
                  ? ((i = null != r.validators ? r.validators : null),
                    (o = null != r.asyncValidators ? r.asyncValidators : null),
                    (s = null != r.updateOn ? r.updateOn : void 0))
                  : ((i = null != r.validator ? r.validator : null),
                    (o = null != r.asyncValidator ? r.asyncValidator : null))),
              new w0(a, { asyncValidators: o, updateOn: s, validators: i })
            );
          }
          control(n, r, a) {
            let i = {};
            return this.useNonNullable
              ? (i9(r)
                  ? (i = r)
                  : ((i.validators = r), (i.asyncValidators = a)),
                new ge(n, { ...i, nonNullable: !0 }))
              : new ge(n, r, a);
          }
          array(n, r, a) {
            const i = n.map((o) => this._createControl(o));
            return new kd(i, r, a);
          }
          _reduceControls(n) {
            const r = {};
            return (
              Object.keys(n).forEach((a) => {
                r[a] = this._createControl(n[a]);
              }),
              r
            );
          }
          _createControl(n) {
            return n instanceof ge || n instanceof z0
              ? n
              : Array.isArray(n)
              ? this.control(
                  n[0],
                  n.length > 1 ? n[1] : null,
                  n.length > 2 ? n[2] : null
                )
              : this.control(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: Ed })),
          e
        );
      })();
      var d9 = {
          prefix: "fas",
          iconName: "arrow-right-from-bracket",
          icon: [
            512,
            512,
            ["sign-out"],
            "f08b",
            "M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z",
          ],
        },
        b9 = {
          prefix: "fas",
          iconName: "face-smile",
          icon: [
            512,
            512,
            [128578, "smile"],
            "f118",
            "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM164.1 325.5C158.3 318.8 148.2 318.1 141.5 323.9C134.8 329.7 134.1 339.8 139.9 346.5C162.1 372.1 200.9 400 255.1 400C311.1 400 349.8 372.1 372.1 346.5C377.9 339.8 377.2 329.7 370.5 323.9C363.8 318.1 353.7 318.8 347.9 325.5C329.9 346.2 299.4 368 255.1 368C212.6 368 182 346.2 164.1 325.5H164.1zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z",
          ],
        },
        Vv = {
          prefix: "fas",
          iconName: "paper-plane",
          icon: [
            512,
            512,
            [61913],
            "f1d8",
            "M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z",
          ],
        };
      function d2(...e) {
        return c1(e, d5(e));
      }
      class b3 extends _3 {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function nV(...e) {
        const t = d5(e),
          n = Ni(e),
          { args: r, keys: a } = bu(e);
        if (0 === r.length) return c1([], t);
        const i = new N2(
          (function lt2(e, t, n = T2) {
            return (r) => {
              rV(
                t,
                () => {
                  const { length: a } = e,
                    i = new Array(a);
                  let o = a,
                    s = a;
                  for (let c = 0; c < a; c++)
                    rV(
                      t,
                      () => {
                        const l = c1(e[c], t);
                        let C = !1;
                        l.subscribe(
                          p1(
                            r,
                            (f) => {
                              (i[c] = f),
                                C || ((C = !0), s--),
                                s || r.next(n(i.slice()));
                            },
                            () => {
                              --o || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, a ? (o) => Du(a, o) : T2)
        );
        return n ? i.pipe(Su(n)) : i;
      }
      function rV(e, t, n) {
        e ? X3(n, e, t) : t();
      }
      function ze(e, t) {
        const n = H(e) ? e : () => e,
          r = (a) => a.error(n());
        return new N2(t ? (a) => t.schedule(r, 0, a) : r);
      }
      const we = N(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function ta(...e) {
        return (function Ct2() {
          return u6(1);
        })()(c1(e, d5(e)));
      }
      function aV(e) {
        return new N2((t) => {
          N3(e()).subscribe(t);
        });
      }
      function na() {
        return g1((e, t) => {
          let n = null;
          e._refCount++;
          const r = p1(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const a = e._connection,
              i = n;
            (n = null),
              a && (!i || a === i) && a.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class iV extends N2 {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            gi(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new _();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                p1(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = _.EMPTY));
          }
          return t;
        }
        refCount() {
          return na()(this);
        }
      }
      function n6(e, t) {
        return g1((n, r) => {
          let a = null,
            i = 0,
            o = !1;
          const s = () => o && !a && r.complete();
          n.subscribe(
            p1(
              r,
              (c) => {
                a?.unsubscribe();
                let l = 0;
                const C = i++;
                N3(e(c, C)).subscribe(
                  (a = p1(
                    r,
                    (f) => r.next(t ? t(c, f, C, l++) : f),
                    () => {
                      (a = null), s();
                    }
                  ))
                );
              },
              () => {
                (o = !0), s();
              }
            )
          );
        });
      }
      function ut2(e, t, n, r, a) {
        return (i, o) => {
          let s = n,
            c = t,
            l = 0;
          i.subscribe(
            p1(
              o,
              (C) => {
                const f = l++;
                (c = s ? e(c, C, f) : ((s = !0), C)), r && o.next(c);
              },
              a &&
                (() => {
                  s && o.next(c), o.complete();
                })
            )
          );
        };
      }
      function oV(e, t) {
        return g1(ut2(e, t, arguments.length >= 2, !0));
      }
      function r6(e, t) {
        return g1((n, r) => {
          let a = 0;
          n.subscribe(p1(r, (i) => e.call(t, i, a++) && r.next(i)));
        });
      }
      function k4(e) {
        return g1((t, n) => {
          let i,
            r = null,
            a = !1;
          (r = t.subscribe(
            p1(n, void 0, void 0, (o) => {
              (i = N3(e(o, k4(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (a = !0);
            })
          )),
            a && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function i5(e, t) {
        return H(t) ? v1(e, t, 1) : v1(e, 1);
      }
      function ra(e) {
        return e <= 0
          ? () => J3
          : g1((t, n) => {
              let r = [];
              t.subscribe(
                p1(
                  n,
                  (a) => {
                    r.push(a), e < r.length && r.shift();
                  },
                  () => {
                    for (const a of r) n.next(a);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function sV(e = dt2) {
        return g1((t, n) => {
          let r = !1;
          t.subscribe(
            p1(
              n,
              (a) => {
                (r = !0), n.next(a);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function dt2() {
        return new we();
      }
      function aa(e) {
        return g1((t, n) => {
          let r = !1;
          t.subscribe(
            p1(
              n,
              (a) => {
                (r = !0), n.next(a);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function a6(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? r6((a, i) => e(a, i, r)) : T2,
            h5(1),
            n ? aa(t) : sV(() => new we())
          );
      }
      function D1(e, t, n) {
        const r = H(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? g1((a, i) => {
              var o;
              null === (o = r.subscribe) || void 0 === o || o.call(r);
              let s = !0;
              a.subscribe(
                p1(
                  i,
                  (c) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, c),
                      i.next(c);
                  },
                  () => {
                    var c;
                    (s = !1),
                      null === (c = r.complete) || void 0 === c || c.call(r),
                      i.complete();
                  },
                  (c) => {
                    var l;
                    (s = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, c),
                      i.error(c);
                  },
                  () => {
                    var c, l;
                    s &&
                      (null === (c = r.unsubscribe) ||
                        void 0 === c ||
                        c.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : T2;
      }
      function ia(e) {
        return g1((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      class d4 {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class oa extends d4 {
        constructor(t, n, r = "imperative", a = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = a);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class be extends d4 {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class cV extends d4 {
        constructor(t, n, r) {
          super(t, n), (this.reason = r), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class mt2 extends d4 {
        constructor(t, n, r) {
          super(t, n), (this.error = r), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class gt2 extends d4 {
        constructor(t, n, r, a) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = a),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class vt2 extends d4 {
        constructor(t, n, r, a) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = a),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Mt2 extends d4 {
        constructor(t, n, r, a, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = a),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Lt2 extends d4 {
        constructor(t, n, r, a) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = a),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Vt2 extends d4 {
        constructor(t, n, r, a) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = a),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class yt2 {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Ht2 {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class zt2 {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class wt2 {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class bt2 {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class St2 {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class lV {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const v2 = "primary";
      class Dt2 {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function o5(e) {
        return new Dt2(e);
      }
      const CV = "ngNavigationCancelingError";
      function sa(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t[CV] = !0), t;
      }
      function _t2(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const a = {};
        for (let i = 0; i < r.length; i++) {
          const o = r[i],
            s = e[i];
          if (o.startsWith(":")) a[o.substring(1)] = s;
          else if (o !== s.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: a };
      }
      function Y3(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let a;
        for (let i = 0; i < n.length; i++)
          if (((a = n[i]), !fV(e[a], t[a]))) return !1;
        return !0;
      }
      function fV(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((a, i) => r[i] === a);
        }
        return e === t;
      }
      function uV(e) {
        return Array.prototype.concat.apply([], e);
      }
      function dV(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function L1(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function S3(e) {
        return H7(e) ? e : q5(e) ? c1(Promise.resolve(e)) : d2(e);
      }
      const Et2 = {
          exact: function mV(e, t, n) {
            if (
              !o6(e.segments, t.segments) ||
              !W0(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !mV(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: gV,
        },
        hV = {
          exact: function kt2(e, t) {
            return Y3(e, t);
          },
          subset: function Tt2(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => fV(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function pV(e, t, n) {
        return (
          Et2[n.paths](e.root, t.root, n.matrixParams) &&
          hV[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function gV(e, t, n) {
        return vV(e, t, t.segments, n);
      }
      function vV(e, t, n, r) {
        if (e.segments.length > n.length) {
          const a = e.segments.slice(0, n.length);
          return !(!o6(a, n) || t.hasChildren() || !W0(a, n, r));
        }
        if (e.segments.length === n.length) {
          if (!o6(e.segments, n) || !W0(e.segments, n, r)) return !1;
          for (const a in t.children)
            if (!e.children[a] || !gV(e.children[a], t.children[a], r))
              return !1;
          return !0;
        }
        {
          const a = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(o6(e.segments, a) && W0(e.segments, a, r) && e.children[v2]) &&
            vV(e.children[v2], t, i, r)
          );
        }
      }
      function W0(e, t, n) {
        return t.every((r, a) => hV[n](e[a].parameters, r.parameters));
      }
      class i6 {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = o5(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Pt2.serialize(this);
        }
      }
      class H2 {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            L1(n, (r, a) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Y0(this);
        }
      }
      class Se {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = o5(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return HV(this);
        }
      }
      function o6(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      class MV {}
      class LV {
        parse(t) {
          const n = new Wt2(t);
          return new i6(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${De(t.root, !0)}`,
            r = (function Bt2(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((a) => `${K0(n)}=${K0(a)}`).join("&")
                    : `${K0(n)}=${K0(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function Rt2(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const Pt2 = new LV();
      function Y0(e) {
        return e.segments.map((t) => HV(t)).join("/");
      }
      function De(e, t) {
        if (!e.hasChildren()) return Y0(e);
        if (t) {
          const n = e.children[v2] ? De(e.children[v2], !1) : "",
            r = [];
          return (
            L1(e.children, (a, i) => {
              i !== v2 && r.push(`${i}:${De(a, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function It2(e, t) {
            let n = [];
            return (
              L1(e.children, (r, a) => {
                a === v2 && (n = n.concat(t(r, a)));
              }),
              L1(e.children, (r, a) => {
                a !== v2 && (n = n.concat(t(r, a)));
              }),
              n
            );
          })(e, (r, a) =>
            a === v2 ? [De(e.children[v2], !1)] : [`${a}:${De(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[v2]
            ? `${Y0(e)}/${n[0]}`
            : `${Y0(e)}/(${n.join("//")})`;
        }
      }
      function VV(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function K0(e) {
        return VV(e).replace(/%3B/gi, ";");
      }
      function ca(e) {
        return VV(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Q0(e) {
        return decodeURIComponent(e);
      }
      function yV(e) {
        return Q0(e.replace(/\+/g, "%20"));
      }
      function HV(e) {
        return `${ca(e.path)}${(function Ot2(e) {
          return Object.keys(e)
            .map((t) => `;${ca(t)}=${ca(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const Ut2 = /^[^\/()?;=#]+/;
      function X0(e) {
        const t = e.match(Ut2);
        return t ? t[0] : "";
      }
      const jt2 = /^[^=?&#]+/,
        Gt2 = /^[^&#]+/;
      class Wt2 {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new H2([], {})
              : new H2([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) &&
              (r[v2] = new H2(t, n)),
            r
          );
        }
        parseSegment() {
          const t = X0(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Se(Q0(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = X0(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const a = X0(this.remaining);
            a && ((r = a), this.capture(r));
          }
          t[Q0(n)] = Q0(r);
        }
        parseQueryParam(t) {
          const n = (function $t2(e) {
            const t = e.match(jt2);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = (function qt2(e) {
              const t = e.match(Gt2);
              return t ? t[0] : "";
            })(this.remaining);
            o && ((r = o), this.capture(r));
          }
          const a = yV(n),
            i = yV(r);
          if (t.hasOwnProperty(a)) {
            let o = t[a];
            Array.isArray(o) || ((o = [o]), (t[a] = o)), o.push(i);
          } else t[a] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = X0(this.remaining),
              a = this.remaining[r.length];
            if ("/" !== a && ")" !== a && ";" !== a)
              throw new Error(`Cannot parse url '${this.url}'`);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = v2);
            const o = this.parseChildren();
            (n[i] = 1 === Object.keys(o).length ? o[v2] : new H2([], o)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class zV {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = la(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = la(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Ca(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((a) => a.value)
                .filter((a) => a !== t);
        }
        pathFromRoot(t) {
          return Ca(t, this._root).map((n) => n.value);
        }
      }
      function la(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = la(e, n);
          if (r) return r;
        }
        return null;
      }
      function Ca(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Ca(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class h4 {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function s5(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class wV extends zV {
        constructor(t, n) {
          super(t), (this.snapshot = n), fa(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function bV(e, t) {
        const n = (function Yt2(e, t) {
            const o = new J0([], {}, {}, "", {}, v2, t, null, e.root, -1, {});
            return new DV("", new h4(o, []));
          })(e, t),
          r = new b3([new Se("", {})]),
          a = new b3({}),
          i = new b3({}),
          o = new b3({}),
          s = new b3(""),
          c = new c5(r, a, o, s, i, v2, t, n.root);
        return (c.snapshot = n.root), new wV(new h4(c, []), n);
      }
      class c5 {
        constructor(t, n, r, a, i, o, s, c) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = a),
            (this.data = i),
            (this.outlet = o),
            (this.component = s),
            (this._futureSnapshot = c);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(S2((t) => o5(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(S2((t) => o5(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function SV(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const a = n[r],
              i = n[r - 1];
            if (a.routeConfig && "" === a.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function Kt2(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class J0 {
        constructor(t, n, r, a, i, o, s, c, l, C, f, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = a),
            (this.data = i),
            (this.outlet = o),
            (this.component = s),
            (this.routeConfig = c),
            (this._urlSegment = l),
            (this._lastPathIndex = C),
            (this._correctedLastPathIndex = d ?? C),
            (this._resolve = f);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = o5(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = o5(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class DV extends zV {
        constructor(t, n) {
          super(n), (this.url = t), fa(this, n);
        }
        toString() {
          return xV(this._root);
        }
      }
      function fa(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => fa(e, n));
      }
      function xV(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(xV).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function ua(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Y3(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Y3(t.params, n.params) || e.params.next(n.params),
            (function Nt2(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Y3(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Y3(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function da(e, t) {
        const n =
          Y3(e.params, t.params) &&
          (function Ft2(e, t) {
            return (
              o6(e, t) && e.every((n, r) => Y3(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || da(e.parent, t.parent))
        );
      }
      function xe(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const a = (function Xt2(e, t, n) {
            return t.children.map((r) => {
              for (const a of n.children)
                if (e.shouldReuseRoute(r.value, a.value.snapshot))
                  return xe(e, r, a);
              return xe(e, r);
            });
          })(e, t, n);
          return new h4(r, a);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const o = i.route;
              return (
                (o.value._futureSnapshot = t.value),
                (o.children = t.children.map((s) => xe(e, s))),
                o
              );
            }
          }
          const r = (function Jt2(e) {
              return new c5(
                new b3(e.url),
                new b3(e.params),
                new b3(e.queryParams),
                new b3(e.fragment),
                new b3(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            a = t.children.map((i) => xe(e, i));
          return new h4(r, a);
        }
      }
      function Z0(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function _e(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function ha(e, t, n, r, a) {
        let i = {};
        if (
          (r &&
            L1(r, (s, c) => {
              i[c] = Array.isArray(s) ? s.map((l) => `${l}`) : `${s}`;
            }),
          e === t)
        )
          return new i6(n, i, a);
        const o = _V(e, t, n);
        return new i6(o, i, a);
      }
      function _V(e, t, n) {
        const r = {};
        return (
          L1(e.children, (a, i) => {
            r[i] = a === t ? n : _V(a, t, n);
          }),
          new H2(e.segments, r)
        );
      }
      class NV {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Z0(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const a = r.find(_e);
          if (a && a !== dV(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class pa {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function AV(e, t, n) {
        if (
          (e || (e = new H2([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return et(e, t, n);
        const r = (function an2(e, t, n) {
            let r = 0,
              a = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; a < e.segments.length; ) {
              if (r >= n.length) return i;
              const o = e.segments[a],
                s = n[r];
              if (_e(s)) break;
              const c = `${s}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (a > 0 && void 0 === c) break;
              if (c && l && "object" == typeof l && void 0 === l.outlets) {
                if (!kV(c, l, o)) return i;
                r += 2;
              } else {
                if (!kV(c, {}, o)) return i;
                r++;
              }
              a++;
            }
            return { match: !0, pathIndex: a, commandIndex: r };
          })(e, t, n),
          a = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new H2(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[v2] = new H2(
              e.segments.slice(r.pathIndex),
              e.children
            )),
            et(i, 0, a)
          );
        }
        return r.match && 0 === a.length
          ? new H2(e.segments, {})
          : r.match && !e.hasChildren()
          ? ma(e, t, n)
          : r.match
          ? et(e, 0, a)
          : ma(e, t, n);
      }
      function et(e, t, n) {
        if (0 === n.length) return new H2(e.segments, {});
        {
          const r = (function rn2(e) {
              return _e(e[0]) ? e[0].outlets : { [v2]: e };
            })(n),
            a = {};
          return (
            L1(r, (i, o) => {
              "string" == typeof i && (i = [i]),
                null !== i && (a[o] = AV(e.children[o], t, i));
            }),
            L1(e.children, (i, o) => {
              void 0 === r[o] && (a[o] = i);
            }),
            new H2(e.segments, a)
          );
        }
      }
      function ma(e, t, n) {
        const r = e.segments.slice(0, t);
        let a = 0;
        for (; a < n.length; ) {
          const i = n[a];
          if (_e(i)) {
            const c = in2(i.outlets);
            return new H2(r, c);
          }
          if (0 === a && Z0(n[0])) {
            r.push(new Se(e.segments[t].path, EV(n[0]))), a++;
            continue;
          }
          const o = _e(i) ? i.outlets[v2] : `${i}`,
            s = a < n.length - 1 ? n[a + 1] : null;
          o && s && Z0(s)
            ? (r.push(new Se(o, EV(s))), (a += 2))
            : (r.push(new Se(o, {})), a++);
        }
        return new H2(r, {});
      }
      function in2(e) {
        const t = {};
        return (
          L1(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = ma(new H2([], {}), 0, n));
          }),
          t
        );
      }
      function EV(e) {
        const t = {};
        return L1(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function kV(e, t, n) {
        return e == n.path && Y3(t, n.parameters);
      }
      class on2 {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ne()),
            (this.attachRef = null);
        }
      }
      class Ne {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, n) {
          const r = this.getOrCreateContext(t);
          (r.outlet = n), this.contexts.set(t, r);
        }
        onChildOutletDestroyed(t) {
          const n = this.getContext(t);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let n = this.getContext(t);
          return n || ((n = new on2()), this.contexts.set(t, n)), n;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let ga = (() => {
        class e {
          constructor(n, r, a, i, o) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = i),
              (this.environmentInjector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new e1()),
              (this.deactivateEvents = new e1()),
              (this.attachEvents = new e1()),
              (this.detachEvents = new e1()),
              (this.name = a || v2),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const a = this.location,
              o = n._futureSnapshot.component,
              s = this.parentContexts.getOrCreateContext(this.name).children,
              c = new sn2(n, s, a.injector);
            if (
              r &&
              (function cn2(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(o);
              this.activated = a.createComponent(l, a.length, c);
            } else
              this.activated = a.createComponent(o, {
                index: a.length,
                injector: c,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              T(Ne),
              T(H3),
              (function b5(e) {
                return (function tw(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let a = 0;
                    for (; a < r; ) {
                      const i = n[a];
                      if (Co(i)) break;
                      if (0 === i) a += 2;
                      else if ("number" == typeof i)
                        for (a++; a < r && "string" == typeof n[a]; ) a++;
                      else {
                        if (i === t) return n[a + 1];
                        a += 2;
                      }
                    }
                  }
                  return null;
                })(l1(), e);
              })("name"),
              T(e0),
              T(K4)
            );
          }),
          (e.ɵdir = a2({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          e
        );
      })();
      class sn2 {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === c5
            ? this.route
            : t === Ne
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let TV = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = k3({
            type: e,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && M3(0, "router-outlet");
            },
            dependencies: [ga],
            encapsulation: 2,
          })),
          e
        );
      })();
      function FV(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = $8(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Ma(e) {
        const t = e.children && e.children.map(Ma),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== v2 &&
            (n.component = TV),
          n
        );
      }
      function C3(e) {
        return e.outlet || v2;
      }
      function IV(e, t) {
        const n = e.filter((r) => C3(r) === t);
        return n.push(...e.filter((r) => C3(r) !== t)), n;
      }
      function PV(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class dn2 {
        constructor(t, n, r, a) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = a);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            ua(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const a = s5(n);
          t.children.forEach((i) => {
            const o = i.value.outlet;
            this.deactivateRoutes(i, a[o], r), delete a[o];
          }),
            L1(a, (i, o) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const a = t.value,
            i = n ? n.value : null;
          if (a === i)
            if (a.component) {
              const o = r.getContext(a.outlet);
              o && this.deactivateChildRoutes(t, n, o.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            a = r && t.value.component ? r.children : n,
            i = s5(t);
          for (const o of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[o], a);
          if (r && r.outlet) {
            const o = r.outlet.detach(),
              s = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: o,
              route: t,
              contexts: s,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            a = r && t.value.component ? r.children : n,
            i = s5(t);
          for (const o of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[o], a);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const a = s5(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, a[i.value.outlet], r),
              this.forwardEvent(new St2(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new wt2(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const a = t.value,
            i = n ? n.value : null;
          if ((ua(a), a === i))
            if (a.component) {
              const o = r.getOrCreateContext(a.outlet);
              this.activateChildRoutes(t, n, o.children);
            } else this.activateChildRoutes(t, n, r);
          else if (a.component) {
            const o = r.getOrCreateContext(a.outlet);
            if (this.routeReuseStrategy.shouldAttach(a.snapshot)) {
              const s = this.routeReuseStrategy.retrieve(a.snapshot);
              this.routeReuseStrategy.store(a.snapshot, null),
                o.children.onOutletReAttached(s.contexts),
                (o.attachRef = s.componentRef),
                (o.route = s.route.value),
                o.outlet && o.outlet.attach(s.componentRef, s.route.value),
                ua(s.route.value),
                this.activateChildRoutes(t, null, o.children);
            } else {
              const s = PV(a.snapshot),
                c = s?.get(Z5) ?? null;
              (o.attachRef = null),
                (o.route = a),
                (o.resolver = c),
                (o.injector = s),
                o.outlet && o.outlet.activateWith(a, o.injector),
                this.activateChildRoutes(t, null, o.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      function T4(e) {
        return "function" == typeof e;
      }
      function s6(e) {
        return e instanceof i6;
      }
      const Ae = Symbol("INITIAL_VALUE");
      function Ee() {
        return n6((e) =>
          nV(
            e.map((t) =>
              t.pipe(
                h5(1),
                (function ft2(...e) {
                  const t = d5(e);
                  return g1((n, r) => {
                    (t ? ta(e, n, t) : ta(e, n)).subscribe(r);
                  });
                })(Ae)
              )
            )
          ).pipe(
            oV((t, n) => {
              let r = !1;
              return n.reduce(
                (a, i, o) =>
                  a !== Ae
                    ? a
                    : (i === Ae && (r = !0),
                      r || (!1 !== i && o !== n.length - 1 && !s6(i)) ? a : i),
                t
              );
            }, Ae),
            r6((t) => t !== Ae),
            S2((t) => (s6(t) ? t : !0 === t)),
            h5(1)
          )
        );
      }
      const RV = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function tt(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...RV }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const a = (t.matcher || _t2)(n, e, t);
        if (!a) return { ...RV };
        const i = {};
        L1(a.posParams, (s, c) => {
          i[c] = s.path;
        });
        const o =
          a.consumed.length > 0
            ? { ...i, ...a.consumed[a.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: a.consumed,
          remainingSegments: n.slice(a.consumed.length),
          parameters: o,
          positionalParamSegments: a.posParams ?? {},
        };
      }
      function nt(e, t, n, r, a = "corrected") {
        if (
          n.length > 0 &&
          (function Vn2(e, t, n) {
            return n.some((r) => rt(e, t, r) && C3(r) !== v2);
          })(e, n, r)
        ) {
          const o = new H2(
            t,
            (function Ln2(e, t, n, r) {
              const a = {};
              (a[v2] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && C3(i) !== v2) {
                  const o = new H2([], {});
                  (o._sourceSegment = e),
                    (o._segmentIndexShift = t.length),
                    (a[C3(i)] = o);
                }
              return a;
            })(e, t, r, new H2(n, e.children))
          );
          return (
            (o._sourceSegment = e),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function yn2(e, t, n) {
            return n.some((r) => rt(e, t, r));
          })(e, n, r)
        ) {
          const o = new H2(
            e.segments,
            (function Mn2(e, t, n, r, a, i) {
              const o = {};
              for (const s of r)
                if (rt(e, n, s) && !a[C3(s)]) {
                  const c = new H2([], {});
                  (c._sourceSegment = e),
                    (c._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (o[C3(s)] = c);
                }
              return { ...a, ...o };
            })(e, t, n, r, e.children, a)
          );
          return (
            (o._sourceSegment = e),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const i = new H2(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function rt(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function OV(e, t, n, r) {
        return (
          !!(C3(e) === r || (r !== v2 && rt(t, n, e))) &&
          ("**" === e.path || tt(t, e, n).matched)
        );
      }
      function BV(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      class at {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class UV {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ke(e) {
        return ze(new at(e));
      }
      function jV(e) {
        return ze(new UV(e));
      }
      class bn2 {
        constructor(t, n, r, a, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = a),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = nt(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new H2(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, v2)
            .pipe(
              S2((i) =>
                this.createUrlTree(
                  La(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              k4((i) => {
                if (i instanceof UV)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof at ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, v2)
            .pipe(
              S2((a) => this.createUrlTree(La(a), t.queryParams, t.fragment))
            )
            .pipe(
              k4((a) => {
                throw a instanceof at ? this.noMatchError(a) : a;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, n, r) {
          const a = t.segments.length > 0 ? new H2([], { [v2]: t }) : t;
          return new i6(a, n, r);
        }
        expandSegmentGroup(t, n, r, a) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(S2((i) => new H2([], i)))
            : this.expandSegment(t, r, n, r.segments, a, !0);
        }
        expandChildren(t, n, r) {
          const a = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? a.unshift(i) : a.push(i);
          return c1(a).pipe(
            i5((i) => {
              const o = r.children[i],
                s = IV(n, i);
              return this.expandSegmentGroup(t, s, o, i).pipe(
                S2((c) => ({ segment: c, outlet: i }))
              );
            }),
            oV((i, o) => ((i[o.outlet] = o.segment), i), {}),
            (function ht2(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? r6((a, i) => e(a, i, r)) : T2,
                  ra(1),
                  n ? aa(t) : sV(() => new we())
                );
            })()
          );
        }
        expandSegment(t, n, r, a, i, o) {
          return c1(r).pipe(
            i5((s) =>
              this.expandSegmentAgainstRoute(t, n, r, s, a, i, o).pipe(
                k4((l) => {
                  if (l instanceof at) return d2(null);
                  throw l;
                })
              )
            ),
            a6((s) => !!s),
            k4((s, c) => {
              if (s instanceof we || "EmptyError" === s.name)
                return BV(n, a, i) ? d2(new H2([], {})) : ke(n);
              throw s;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, a, i, o, s) {
          return OV(a, n, i, o)
            ? void 0 === a.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, a, i, o)
              : s && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, a, i, o)
              : ke(n)
            : ke(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, a, i, o) {
          return "**" === a.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, a, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                a,
                i,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, a) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? jV(i)
            : this.lineralizeSegments(r, i).pipe(
                v1((o) => {
                  const s = new H2(o, {});
                  return this.expandSegment(t, s, n, o, a, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, a, i, o) {
          const {
            matched: s,
            consumedSegments: c,
            remainingSegments: l,
            positionalParamSegments: C,
          } = tt(n, a, i);
          if (!s) return ke(n);
          const f = this.applyRedirectCommands(c, a.redirectTo, C);
          return a.redirectTo.startsWith("/")
            ? jV(f)
            : this.lineralizeSegments(a, f).pipe(
                v1((d) => this.expandSegment(t, n, r, d.concat(l), o, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, a, i) {
          if ("**" === r.path)
            return (
              (t = FV(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? d2({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    S2(
                      (f) => (
                        (r._loadedRoutes = f.routes),
                        (r._loadedInjector = f.injector),
                        new H2(a, {})
                      )
                    )
                  )
                : d2(new H2(a, {}))
            );
          const {
            matched: o,
            consumedSegments: s,
            remainingSegments: c,
          } = tt(n, r, a);
          return o
            ? ((t = FV(r, t)),
              this.getChildConfig(t, r, a).pipe(
                v1((C) => {
                  const f = C.injector ?? t,
                    d = C.routes,
                    { segmentGroup: g, slicedSegments: y } = nt(n, s, c, d),
                    x = new H2(g.segments, g.children);
                  if (0 === y.length && x.hasChildren())
                    return this.expandChildren(f, d, x).pipe(
                      S2((A) => new H2(s, A))
                    );
                  if (0 === d.length && 0 === y.length)
                    return d2(new H2(s, {}));
                  const F = C3(r) === i;
                  return this.expandSegment(f, x, d, y, F ? v2 : i, !0).pipe(
                    S2((O) => new H2(s.concat(O.segments), O.children))
                  );
                })
              ))
            : ke(n);
        }
        getChildConfig(t, n, r) {
          return n.children
            ? d2({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? d2({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : this.runCanLoadGuards(t, n, r).pipe(
                  v1((a) =>
                    a
                      ? this.configLoader.loadChildren(t, n).pipe(
                          D1((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function zn2(e) {
                          return ze(
                            sa(
                              `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                            )
                          );
                        })(n)
                  )
                )
            : d2({ routes: [], injector: t });
        }
        runCanLoadGuards(t, n, r) {
          const a = n.canLoad;
          return a && 0 !== a.length
            ? d2(
                a.map((o) => {
                  const s = t.get(o);
                  let c;
                  if (
                    (function pn2(e) {
                      return e && T4(e.canLoad);
                    })(s)
                  )
                    c = s.canLoad(n, r);
                  else {
                    if (!T4(s)) throw new Error("Invalid CanLoad guard");
                    c = s(n, r);
                  }
                  return S3(c);
                })
              ).pipe(
                Ee(),
                D1((o) => {
                  if (!s6(o)) return;
                  const s = sa(
                    `Redirecting to "${this.urlSerializer.serialize(o)}"`
                  );
                  throw ((s.url = o), s);
                }),
                S2((o) => !0 === o)
              )
            : d2(!0);
        }
        lineralizeSegments(t, n) {
          let r = [],
            a = n.root;
          for (;;) {
            if (((r = r.concat(a.segments)), 0 === a.numberOfChildren))
              return d2(r);
            if (a.numberOfChildren > 1 || !a.children[v2])
              return ze(
                new Error(
                  `Only absolute redirects can have named outlets. redirectTo: '${t.redirectTo}'`
                )
              );
            a = a.children[v2];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreatreUrlTree(t, n, r, a) {
          const i = this.createSegmentGroup(t, n.root, r, a);
          return new i6(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            L1(t, (a, i) => {
              if ("string" == typeof a && a.startsWith(":")) {
                const s = a.substring(1);
                r[i] = n[s];
              } else r[i] = a;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, a) {
          const i = this.createSegments(t, n.segments, r, a);
          let o = {};
          return (
            L1(n.children, (s, c) => {
              o[c] = this.createSegmentGroup(t, s, r, a);
            }),
            new H2(i, o)
          );
        }
        createSegments(t, n, r, a) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, a)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const a = r[n.path.substring(1)];
          if (!a)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${n.path}'.`
            );
          return a;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const a of n) {
            if (a.path === t.path) return n.splice(r), a;
            r++;
          }
          return t;
        }
      }
      function La(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = La(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function Sn2(e) {
          if (1 === e.numberOfChildren && e.children[v2]) {
            const t = e.children[v2];
            return new H2(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new H2(e.segments, t));
      }
      class $V {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class it {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function xn2(e, t, n) {
        const r = e._root;
        return Te(r, t ? t._root : null, n, [r.value]);
      }
      function ot(e, t, n) {
        return (PV(t) ?? n).get(e);
      }
      function Te(
        e,
        t,
        n,
        r,
        a = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = s5(t);
        return (
          e.children.forEach((o) => {
            (function Nn2(
              e,
              t,
              n,
              r,
              a = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                o = t ? t.value : null,
                s = n ? n.getContext(e.value.outlet) : null;
              if (o && i.routeConfig === o.routeConfig) {
                const c = (function An2(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !o6(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !o6(e.url, t.url) || !Y3(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !da(e, t) || !Y3(e.queryParams, t.queryParams);
                    default:
                      return !da(e, t);
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers);
                c
                  ? a.canActivateChecks.push(new $V(r))
                  : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  Te(e, t, i.component ? (s ? s.children : null) : n, r, a),
                  c &&
                    s &&
                    s.outlet &&
                    s.outlet.isActivated &&
                    a.canDeactivateChecks.push(new it(s.outlet.component, o));
              } else
                o && Fe(t, s, a),
                  a.canActivateChecks.push(new $V(r)),
                  Te(e, null, i.component ? (s ? s.children : null) : n, r, a);
            })(o, i[o.value.outlet], n, r.concat([o.value]), a),
              delete i[o.value.outlet];
          }),
          L1(i, (o, s) => Fe(o, n.getContext(s), a)),
          a
        );
      }
      function Fe(e, t, n) {
        const r = s5(e),
          a = e.value;
        L1(r, (i, o) => {
          Fe(i, a.component ? (t ? t.children.getContext(o) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new it(
              a.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              a
            )
          );
      }
      class Bn2 {}
      function qV(e) {
        return new N2((t) => t.error(e));
      }
      class jn2 {
        constructor(t, n, r, a, i, o) {
          (this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = a),
            (this.paramsInheritanceStrategy = i),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          const t = nt(
              this.urlTree.root,
              [],
              [],
              this.config.filter((o) => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, t, v2);
          if (null === n) return null;
          const r = new J0(
              [],
              Object.freeze({}),
              Object.freeze({ ...this.urlTree.queryParams }),
              this.urlTree.fragment,
              {},
              v2,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            a = new h4(r, n),
            i = new DV(this.url, a);
          return this.inheritParamsAndData(i._root), i;
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = SV(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((a) => this.inheritParamsAndData(a));
        }
        processSegmentGroup(t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, n)
            : this.processSegment(t, n, n.segments, r);
        }
        processChildren(t, n) {
          const r = [];
          for (const i of Object.keys(n.children)) {
            const o = n.children[i],
              s = IV(t, i),
              c = this.processSegmentGroup(s, o, i);
            if (null === c) return null;
            r.push(...c);
          }
          const a = WV(r);
          return (
            (function $n2(e) {
              e.sort((t, n) =>
                t.value.outlet === v2
                  ? -1
                  : n.value.outlet === v2
                  ? 1
                  : t.value.outlet.localeCompare(n.value.outlet)
              );
            })(a),
            a
          );
        }
        processSegment(t, n, r, a) {
          for (const i of t) {
            const o = this.processSegmentAgainstRoute(i, n, r, a);
            if (null !== o) return o;
          }
          return BV(n, r, a) ? [] : null;
        }
        processSegmentAgainstRoute(t, n, r, a) {
          if (t.redirectTo || !OV(t, n, r, a)) return null;
          let i,
            o = [],
            s = [];
          if ("**" === t.path) {
            const g = r.length > 0 ? dV(r).parameters : {},
              y = KV(n) + r.length;
            i = new J0(
              r,
              g,
              Object.freeze({ ...this.urlTree.queryParams }),
              this.urlTree.fragment,
              XV(t),
              C3(t),
              t.component ?? t._loadedComponent ?? null,
              t,
              YV(n),
              y,
              JV(t),
              y
            );
          } else {
            const g = tt(n, t, r);
            if (!g.matched) return null;
            (o = g.consumedSegments), (s = g.remainingSegments);
            const y = KV(n) + o.length;
            i = new J0(
              o,
              g.parameters,
              Object.freeze({ ...this.urlTree.queryParams }),
              this.urlTree.fragment,
              XV(t),
              C3(t),
              t.component ?? t._loadedComponent ?? null,
              t,
              YV(n),
              y,
              JV(t),
              y
            );
          }
          const c = (function Gn2(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedRoutes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: C } = nt(
              n,
              o,
              s,
              c.filter((g) => void 0 === g.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === C.length && l.hasChildren()) {
            const g = this.processChildren(c, l);
            return null === g ? null : [new h4(i, g)];
          }
          if (0 === c.length && 0 === C.length) return [new h4(i, [])];
          const f = C3(t) === a,
            d = this.processSegment(c, l, C, f ? v2 : a);
          return null === d ? null : [new h4(i, d)];
        }
      }
      function qn2(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function WV(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!qn2(r)) {
            t.push(r);
            continue;
          }
          const a = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== a ? (a.children.push(...r.children), n.add(a)) : t.push(r);
        }
        for (const r of n) {
          const a = WV(r.children);
          t.push(new h4(r.value, a));
        }
        return t.filter((r) => !n.has(r));
      }
      function YV(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function KV(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function XV(e) {
        return e.data || {};
      }
      function JV(e) {
        return e.resolve || {};
      }
      const Va = Symbol("RouteTitle");
      function ZV(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function st(e) {
        return n6((t) => {
          const n = e(t);
          return n ? c1(n).pipe(S2(() => t)) : d2(t);
        });
      }
      class t72 extends class e72 {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const ya = new s2("ROUTES");
      let Ha = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return d2(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = S3(n.loadComponent()).pipe(
                D1((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                ia(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              a = new iV(r, () => new _3()).pipe(na());
            return this.componentLoaders.set(n, a), a;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return d2({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                S2((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let c,
                    l,
                    C = !1;
                  Array.isArray(s)
                    ? (l = s)
                    : ((c = s.create(n).injector),
                      (l = uV(c.get(ya, [], r2.Self | r2.Optional))));
                  return { routes: l.map(Ma), injector: c };
                }),
                ia(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              o = new iV(i, () => new _3()).pipe(na());
            return this.childrenLoaders.set(r, o), o;
          }
          loadModuleFactoryOrRoutes(n) {
            return S3(n()).pipe(
              v1((r) =>
                r instanceof VC || Array.isArray(r)
                  ? d2(r)
                  : c1(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(w1), W(tr));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class r72 {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function i72(e) {
        throw e;
      }
      function o72(e, t, n) {
        return t.parse("/");
      }
      function ty(e, t) {
        return d2(null);
      }
      const s72 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        c72 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let O1 = (() => {
        class e {
          constructor(n, r, a, i, o, s, c) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = a),
              (this.location = i),
              (this.config = c),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new _3()),
              (this.errorHandler = i72),
              (this.malformedUriErrorHandler = o72),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: ty,
                afterPreactivation: ty,
              }),
              (this.urlHandlingStrategy = new r72()),
              (this.routeReuseStrategy = new t72()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = o.get(Ha)),
              (this.configLoader.onLoadEndListener = (d) =>
                this.triggerEvent(new Ht2(d))),
              (this.configLoader.onLoadStartListener = (d) =>
                this.triggerEvent(new yt2(d))),
              (this.ngModule = o.get(D4)),
              (this.console = o.get(qN));
            const f = o.get(a1);
            (this.isNgZoneEnabled = f instanceof a1 && a1.isInAngularZone()),
              this.resetConfig(c),
              (this.currentUrlTree = (function At2() {
                return new i6(new H2([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = bV(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new b3({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              r6((a) => 0 !== a.id),
              S2((a) => ({
                ...a,
                extractedUrl: this.urlHandlingStrategy.extract(a.rawUrl),
              })),
              n6((a) => {
                let i = !1,
                  o = !1;
                return d2(a).pipe(
                  D1((s) => {
                    this.currentNavigation = {
                      id: s.id,
                      initialUrl: s.rawUrl,
                      extractedUrl: s.extractedUrl,
                      trigger: s.source,
                      extras: s.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  n6((s) => {
                    const c = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        s.extractedUrl.toString() !== c ||
                        c !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl)
                    )
                      return (
                        ny(s.source) && (this.browserUrlTree = s.extractedUrl),
                        d2(s).pipe(
                          n6((f) => {
                            const d = this.transitions.getValue();
                            return (
                              r.next(
                                new oa(
                                  f.id,
                                  this.serializeUrl(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              d !== this.transitions.getValue()
                                ? J3
                                : Promise.resolve(f)
                            );
                          }),
                          (function Dn2(e, t, n, r) {
                            return n6((a) =>
                              (function wn2(e, t, n, r, a) {
                                return new bn2(e, t, n, r, a).apply();
                              })(e, t, n, a.extractedUrl, r).pipe(
                                S2((i) => ({ ...a, urlAfterRedirects: i }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          D1((f) => {
                            this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: f.urlAfterRedirects,
                            };
                          }),
                          (function Wn2(e, t, n, r, a) {
                            return v1((i) =>
                              (function Un2(
                                e,
                                t,
                                n,
                                r,
                                a = "emptyOnly",
                                i = "legacy"
                              ) {
                                try {
                                  const o = new jn2(
                                    e,
                                    t,
                                    n,
                                    r,
                                    a,
                                    i
                                  ).recognize();
                                  return null === o ? qV(new Bn2()) : d2(o);
                                } catch (o) {
                                  return qV(o);
                                }
                              })(
                                e,
                                t,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                a
                              ).pipe(S2((o) => ({ ...i, targetSnapshot: o })))
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (f) => this.serializeUrl(f),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          D1((f) => {
                            if ("eager" === this.urlUpdateStrategy) {
                              if (!f.extras.skipLocationChange) {
                                const g = this.urlHandlingStrategy.merge(
                                  f.urlAfterRedirects,
                                  f.rawUrl
                                );
                                this.setBrowserUrl(g, f);
                              }
                              this.browserUrlTree = f.urlAfterRedirects;
                            }
                            const d = new gt2(
                              f.id,
                              this.serializeUrl(f.extractedUrl),
                              this.serializeUrl(f.urlAfterRedirects),
                              f.targetSnapshot
                            );
                            r.next(d);
                          })
                        )
                      );
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: d,
                          extractedUrl: g,
                          source: y,
                          restoredState: x,
                          extras: F,
                        } = s,
                        k = new oa(d, this.serializeUrl(g), y, x);
                      r.next(k);
                      const O = bV(g, this.rootComponentType).snapshot;
                      return d2({
                        ...s,
                        targetSnapshot: O,
                        urlAfterRedirects: g,
                        extras: {
                          ...F,
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        },
                      });
                    }
                    return (this.rawUrlTree = s.rawUrl), s.resolve(null), J3;
                  }),
                  st((s) => {
                    const {
                      targetSnapshot: c,
                      id: l,
                      extractedUrl: C,
                      rawUrl: f,
                      extras: { skipLocationChange: d, replaceUrl: g },
                    } = s;
                    return this.hooks.beforePreactivation(c, {
                      navigationId: l,
                      appliedUrlTree: C,
                      rawUrlTree: f,
                      skipLocationChange: !!d,
                      replaceUrl: !!g,
                    });
                  }),
                  D1((s) => {
                    const c = new vt2(
                      s.id,
                      this.serializeUrl(s.extractedUrl),
                      this.serializeUrl(s.urlAfterRedirects),
                      s.targetSnapshot
                    );
                    this.triggerEvent(c);
                  }),
                  S2((s) => ({
                    ...s,
                    guards: xn2(
                      s.targetSnapshot,
                      s.currentSnapshot,
                      this.rootContexts
                    ),
                  })),
                  (function En2(e, t) {
                    return v1((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: a,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: o,
                        },
                      } = n;
                      return 0 === o.length && 0 === i.length
                        ? d2({ ...n, guardsResult: !0 })
                        : (function kn2(e, t, n, r) {
                            return c1(e).pipe(
                              v1((a) =>
                                (function On2(e, t, n, r, a) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? d2(
                                        i.map((s) => {
                                          const c = ot(s, t, a);
                                          let l;
                                          if (
                                            (function vn2(e) {
                                              return e && T4(e.canDeactivate);
                                            })(c)
                                          )
                                            l = S3(c.canDeactivate(e, t, n, r));
                                          else {
                                            if (!T4(c))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            l = S3(c(e, t, n, r));
                                          }
                                          return l.pipe(a6());
                                        })
                                      ).pipe(Ee())
                                    : d2(!0);
                                })(a.component, a.route, n, t, r)
                              ),
                              a6((a) => !0 !== a, !0)
                            );
                          })(o, r, a, e).pipe(
                            v1((s) =>
                              s &&
                              (function hn2(e) {
                                return "boolean" == typeof e;
                              })(s)
                                ? (function Tn2(e, t, n, r) {
                                    return c1(t).pipe(
                                      i5((a) =>
                                        ta(
                                          (function In2(e, t) {
                                            return (
                                              null !== e && t && t(new zt2(e)),
                                              d2(!0)
                                            );
                                          })(a.route.parent, r),
                                          (function Fn2(e, t) {
                                            return (
                                              null !== e && t && t(new bt2(e)),
                                              d2(!0)
                                            );
                                          })(a.route, r),
                                          (function Rn2(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function _n2(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  aV(() =>
                                                    d2(
                                                      o.guards.map((c) => {
                                                        const l = ot(
                                                          c,
                                                          o.node,
                                                          n
                                                        );
                                                        let C;
                                                        if (
                                                          (function gn2(e) {
                                                            return (
                                                              e &&
                                                              T4(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(l)
                                                        )
                                                          C = S3(
                                                            l.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          );
                                                        else {
                                                          if (!T4(l))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          C = S3(l(r, e));
                                                        }
                                                        return C.pipe(a6());
                                                      })
                                                    ).pipe(Ee())
                                                  )
                                                );
                                            return d2(i).pipe(Ee());
                                          })(e, a.path, n),
                                          (function Pn2(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return d2(!0);
                                            const a = r.map((i) =>
                                              aV(() => {
                                                const o = ot(i, t, n);
                                                let s;
                                                if (
                                                  (function mn2(e) {
                                                    return (
                                                      e && T4(e.canActivate)
                                                    );
                                                  })(o)
                                                )
                                                  s = S3(o.canActivate(t, e));
                                                else {
                                                  if (!T4(o))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  s = S3(o(t, e));
                                                }
                                                return s.pipe(a6());
                                              })
                                            );
                                            return d2(a).pipe(Ee());
                                          })(e, a.route, n)
                                        )
                                      ),
                                      a6((a) => !0 !== a, !0)
                                    );
                                  })(r, i, e, t)
                                : d2(s)
                            ),
                            S2((s) => ({ ...n, guardsResult: s }))
                          );
                    });
                  })(this.ngModule.injector, (s) => this.triggerEvent(s)),
                  D1((s) => {
                    if (s6(s.guardsResult)) {
                      const l = sa(
                        `Redirecting to "${this.serializeUrl(s.guardsResult)}"`
                      );
                      throw ((l.url = s.guardsResult), l);
                    }
                    const c = new Mt2(
                      s.id,
                      this.serializeUrl(s.extractedUrl),
                      this.serializeUrl(s.urlAfterRedirects),
                      s.targetSnapshot,
                      !!s.guardsResult
                    );
                    this.triggerEvent(c);
                  }),
                  r6(
                    (s) =>
                      !!s.guardsResult ||
                      (this.restoreHistory(s),
                      this.cancelNavigationTransition(s, ""),
                      !1)
                  ),
                  st((s) => {
                    if (s.guards.canActivateChecks.length)
                      return d2(s).pipe(
                        D1((c) => {
                          const l = new Lt2(
                            c.id,
                            this.serializeUrl(c.extractedUrl),
                            this.serializeUrl(c.urlAfterRedirects),
                            c.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        n6((c) => {
                          let l = !1;
                          return d2(c).pipe(
                            (function Yn2(e, t) {
                              return v1((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: a },
                                } = n;
                                if (!a.length) return d2(n);
                                let i = 0;
                                return c1(a).pipe(
                                  i5((o) =>
                                    (function Kn2(e, t, n, r) {
                                      const a = e.routeConfig,
                                        i = e._resolve;
                                      return (
                                        void 0 !== a?.title &&
                                          !ZV(a) &&
                                          (i[Va] = a.title),
                                        (function Qn2(e, t, n, r) {
                                          const a = (function Xn2(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === a.length) return d2({});
                                          const i = {};
                                          return c1(a).pipe(
                                            v1((o) =>
                                              (function Jn2(e, t, n, r) {
                                                const a = ot(e, t, r);
                                                return S3(
                                                  a.resolve
                                                    ? a.resolve(t, n)
                                                    : a(t, n)
                                                );
                                              })(e[o], t, n, r).pipe(
                                                a6(),
                                                D1((s) => {
                                                  i[o] = s;
                                                })
                                              )
                                            ),
                                            ra(1),
                                            (function pt2(e) {
                                              return S2(() => e);
                                            })(i),
                                            k4((o) =>
                                              o instanceof we ? J3 : ze(o)
                                            )
                                          );
                                        })(i, e, t, r).pipe(
                                          S2(
                                            (o) => (
                                              (e._resolvedData = o),
                                              (e.data = SV(e, n).resolve),
                                              a &&
                                                ZV(a) &&
                                                (e.data[Va] = a.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(o.route, r, e, t)
                                  ),
                                  D1(() => i++),
                                  ra(1),
                                  v1((o) => (i === a.length ? d2(n) : J3))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            D1({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(c),
                                  this.cancelNavigationTransition(
                                    c,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        D1((c) => {
                          const l = new Vt2(
                            c.id,
                            this.serializeUrl(c.extractedUrl),
                            this.serializeUrl(c.urlAfterRedirects),
                            c.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  st((s) => {
                    const {
                      targetSnapshot: c,
                      id: l,
                      extractedUrl: C,
                      rawUrl: f,
                      extras: { skipLocationChange: d, replaceUrl: g },
                    } = s;
                    return this.hooks.afterPreactivation(c, {
                      navigationId: l,
                      appliedUrlTree: C,
                      rawUrlTree: f,
                      skipLocationChange: !!d,
                      replaceUrl: !!g,
                    });
                  }),
                  st((s) => {
                    const c = (l) => {
                      const C = [];
                      l.routeConfig?.loadComponent &&
                        !l.routeConfig._loadedComponent &&
                        C.push(
                          this.configLoader.loadComponent(l.routeConfig).pipe(
                            D1((f) => {
                              l.component = f;
                            }),
                            S2(() => {})
                          )
                        );
                      for (const f of l.children) C.push(...c(f));
                      return C;
                    };
                    return nV(c(s.targetSnapshot.root)).pipe(aa(), h5(1));
                  }),
                  S2((s) => {
                    const c = (function Qt2(e, t, n) {
                      const r = xe(e, t._root, n ? n._root : void 0);
                      return new wV(r, t);
                    })(
                      this.routeReuseStrategy,
                      s.targetSnapshot,
                      s.currentRouterState
                    );
                    return { ...s, targetRouterState: c };
                  }),
                  D1((s) => {
                    (this.currentUrlTree = s.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        s.urlAfterRedirects,
                        s.rawUrl
                      )),
                      (this.routerState = s.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (s.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, s),
                        (this.browserUrlTree = s.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    S2(
                      (r) => (
                        new dn2(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (s) =>
                    this.triggerEvent(s)
                  ),
                  D1({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  ia(() => {
                    i ||
                      o ||
                      this.cancelNavigationTransition(
                        a,
                        `Navigation ID ${a.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      this.currentNavigation?.id === a.id &&
                        (this.currentNavigation = null);
                  }),
                  k4((s) => {
                    if (
                      ((o = !0),
                      (function xt2(e) {
                        return e && e[CV];
                      })(s))
                    ) {
                      const c = s6(s.url);
                      c || ((this.navigated = !0), this.restoreHistory(a, !0));
                      const l = new cV(
                        a.id,
                        this.serializeUrl(a.extractedUrl),
                        s.message
                      );
                      if ((r.next(l), c)) {
                        const C = this.urlHandlingStrategy.merge(
                            s.url,
                            this.rawUrlTree
                          ),
                          f = {
                            skipLocationChange: a.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              ny(a.source),
                          };
                        this.scheduleNavigation(C, "imperative", null, f, {
                          resolve: a.resolve,
                          reject: a.reject,
                          promise: a.promise,
                        });
                      } else a.resolve(!1);
                    } else {
                      this.restoreHistory(a, !0);
                      const c = new mt2(
                        a.id,
                        this.serializeUrl(a.extractedUrl),
                        s
                      );
                      r.next(c);
                      try {
                        a.resolve(this.errorHandler(s));
                      } catch (l) {
                        a.reject(l);
                      }
                    }
                    return J3;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const a = { replaceUrl: !0 },
                      i = n.state?.navigationId ? n.state : null;
                    if (i) {
                      const s = { ...i };
                      delete s.navigationId,
                        delete s.ɵrouterPageId,
                        0 !== Object.keys(s).length && (a.state = s);
                    }
                    const o = this.parseUrl(n.url);
                    this.scheduleNavigation(o, r, i, a);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(Ma)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: a,
                queryParams: i,
                fragment: o,
                queryParamsHandling: s,
                preserveFragment: c,
              } = r,
              l = a || this.routerState.root,
              C = c ? this.currentUrlTree.fragment : o;
            let f = null;
            switch (s) {
              case "merge":
                f = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                f = this.currentUrlTree.queryParams;
                break;
              default:
                f = i || null;
            }
            return (
              null !== f && (f = this.removeEmptyProps(f)),
              (function Zt2(e, t, n, r, a) {
                if (0 === n.length) return ha(t.root, t.root, t.root, r, a);
                const i = (function en2(e) {
                  if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new NV(!0, 0, e);
                  let t = 0,
                    n = !1;
                  const r = e.reduce((a, i, o) => {
                    if ("object" == typeof i && null != i) {
                      if (i.outlets) {
                        const s = {};
                        return (
                          L1(i.outlets, (c, l) => {
                            s[l] = "string" == typeof c ? c.split("/") : c;
                          }),
                          [...a, { outlets: s }]
                        );
                      }
                      if (i.segmentPath) return [...a, i.segmentPath];
                    }
                    return "string" != typeof i
                      ? [...a, i]
                      : 0 === o
                      ? (i.split("/").forEach((s, c) => {
                          (0 == c && "." === s) ||
                            (0 == c && "" === s
                              ? (n = !0)
                              : ".." === s
                              ? t++
                              : "" != s && a.push(s));
                        }),
                        a)
                      : [...a, i];
                  }, []);
                  return new NV(n, t, r);
                })(n);
                return i.toRoot()
                  ? ha(t.root, t.root, new H2([], {}), r, a)
                  : (function o(c) {
                      const l = (function tn2(e, t, n, r) {
                          return e.isAbsolute
                            ? new pa(t.root, !0, 0)
                            : -1 === r
                            ? new pa(n, n === t.root, 0)
                            : (function nn2(e, t, n) {
                                let r = e,
                                  a = t,
                                  i = n;
                                for (; i > a; ) {
                                  if (((i -= a), (r = r.parent), !r))
                                    throw new Error("Invalid number of '../'");
                                  a = r.segments.length;
                                }
                                return new pa(r, !1, a - i);
                              })(
                                n,
                                r + (Z0(e.commands[0]) ? 0 : 1),
                                e.numberOfDoubleDots
                              );
                        })(i, t, e.snapshot?._urlSegment, c),
                        C = l.processChildren
                          ? et(l.segmentGroup, l.index, i.commands)
                          : AV(l.segmentGroup, l.index, i.commands);
                      return ha(t.root, l.segmentGroup, C, r, a);
                    })(e.snapshot?._lastPathIndex);
              })(l, this.currentUrlTree, n, f, C ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const a = s6(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(a, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function l72(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${t}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (a) {
              r = this.malformedUriErrorHandler(a, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let a;
            if (
              ((a = !0 === r ? { ...s72 } : !1 === r ? { ...c72 } : r), s6(n))
            )
              return pV(this.currentUrlTree, n, a);
            const i = this.parseUrl(n);
            return pV(this.currentUrlTree, i, a);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, a) => {
              const i = n[a];
              return null != i && (r[a] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new be(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, a, i, o) {
            if (this.disposed) return Promise.resolve(!1);
            let s, c, l;
            o
              ? ((s = o.resolve), (c = o.reject), (l = o.promise))
              : (l = new Promise((d, g) => {
                  (s = d), (c = g);
                }));
            const C = ++this.navigationId;
            let f;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (a = this.location.getState()),
                  (f =
                    a && a.ɵrouterPageId
                      ? a.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (f = 0),
              this.setTransition({
                id: C,
                targetPageId: f,
                source: r,
                restoredState: a,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: s,
                reject: c,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const a = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(a) || r.extras.replaceUrl
              ? this.location.replaceState(a, "", i)
              : this.location.go(a, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const a = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === a
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === a &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(a);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const a = new cV(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(a), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            Yn();
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ny(e) {
        return "imperative" !== e;
      }
      class ry {
        buildTitle(t) {
          let n,
            r = t.root;
          for (; void 0 !== r; )
            (n = this.getResolvedTitleForRoute(r) ?? n),
              (r = r.children.find((a) => a.outlet === v2));
          return n;
        }
        getResolvedTitleForRoute(t) {
          return t.data[Va];
        }
      }
      let u72 = (() => {
        class e extends ry {
          constructor(n) {
            super(), (this.title = n);
          }
          updateTitle(n) {
            const r = this.buildTitle(n);
            void 0 !== r && this.title.setTitle(r);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(gu));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class ay {}
      class iy {
        preload(t, n) {
          return d2(null);
        }
      }
      let oy = (() => {
          class e {
            constructor(n, r, a, i, o) {
              (this.router = n),
                (this.injector = a),
                (this.preloadingStrategy = i),
                (this.loader = o);
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  r6((n) => n instanceof be),
                  i5(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              return this.processRoutes(this.injector, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const a = [];
              for (const i of r) {
                i.providers &&
                  !i._injector &&
                  (i._injector = $8(i.providers, n, `Route: ${i.path}`));
                const o = i._injector ?? n,
                  s = i._loadedInjector ?? o;
                (i.loadChildren && !i._loadedRoutes) ||
                (i.loadComponent && !i._loadedComponent)
                  ? a.push(this.preloadConfig(o, i))
                  : (i.children || i._loadedRoutes) &&
                    a.push(
                      this.processRoutes(s, i.children ?? i._loadedRoutes)
                    );
              }
              return c1(a).pipe(u6());
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () => {
                let a;
                a =
                  r.loadChildren && void 0 === r.canLoad
                    ? this.loader.loadChildren(n, r)
                    : d2(null);
                const i = a.pipe(
                  v1((o) =>
                    null === o
                      ? d2(void 0)
                      : ((r._loadedRoutes = o.routes),
                        (r._loadedInjector = o.injector),
                        this.processRoutes(o.injector ?? n, o.routes))
                  )
                );
                return r.loadComponent && !r._loadedComponent
                  ? c1([i, this.loader.loadComponent(r)]).pipe(u6())
                  : i;
              });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(O1), W(tr), W(K4), W(ay), W(Ha));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ba = (() => {
          class e {
            constructor(n, r, a = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = a),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (a.scrollPositionRestoration =
                  a.scrollPositionRestoration || "disabled"),
                (a.anchorScrolling = a.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof oa
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof be &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof lV &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new lV(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (e.ɵfac = function (n) {
              Yn();
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const c6 = new s2("ROUTER_CONFIGURATION"),
        sy = new s2("ROUTER_FORROOT_GUARD"),
        h72 = [
          pr,
          { provide: MV, useClass: LV },
          {
            provide: O1,
            useFactory: function M72(e, t, n, r, a, i, o = {}, s, c, l, C) {
              const f = new O1(null, e, t, n, r, a, uV(i));
              return (
                l && (f.urlHandlingStrategy = l),
                C && (f.routeReuseStrategy = C),
                (f.titleStrategy = c ?? s),
                (function L72(e, t) {
                  e.errorHandler && (t.errorHandler = e.errorHandler),
                    e.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
                    e.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = e.onSameUrlNavigation),
                    e.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        e.paramsInheritanceStrategy),
                    e.relativeLinkResolution &&
                      (t.relativeLinkResolution = e.relativeLinkResolution),
                    e.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = e.urlUpdateStrategy),
                    e.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        e.canceledNavigationResolution);
                })(o, f),
                f
              );
            },
            deps: [
              MV,
              Ne,
              pr,
              w1,
              tr,
              ya,
              c6,
              u72,
              [ry, new a4()],
              [class n72 {}, new a4()],
              [class Zn2 {}, new a4()],
            ],
          },
          Ne,
          {
            provide: c5,
            useFactory: function V72(e) {
              return e.routerState.root;
            },
            deps: [O1],
          },
          oy,
          iy,
          class d72 {
            preload(t, n) {
              return n().pipe(k4(() => d2(null)));
            }
          },
          { provide: c6, useValue: { enableTracing: !1 } },
          Ha,
        ];
      function p72() {
        return new df("Router", O1);
      }
      let cy = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                h72,
                ly(n),
                {
                  provide: sy,
                  useFactory: v72,
                  deps: [[O1, new a4(), new E5()]],
                },
                { provide: c6, useValue: r || {} },
                {
                  provide: r5,
                  useFactory: g72,
                  deps: [se, [new g8(hr), new a4()], c6],
                },
                { provide: ba, useFactory: m72, deps: [O1, ek, c6] },
                {
                  provide: ay,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : iy,
                },
                { provide: df, multi: !0, useFactory: p72 },
                [
                  Sa,
                  { provide: J7, multi: !0, useFactory: y72, deps: [Sa] },
                  { provide: Cy, useFactory: H72, deps: [Sa] },
                  { provide: sf, multi: !0, useExisting: Cy },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [ly(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(sy, 8), W(O1, 8));
          }),
          (e.ɵmod = x1({ type: e })),
          (e.ɵinj = V1({})),
          e
        );
      })();
      function m72(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new ba(e, t, n);
      }
      function g72(e, t, n = {}) {
        return n.useHash ? new TA(e, t) : new Ff(e, t);
      }
      function v72(e) {
        return "guarded";
      }
      function ly(e) {
        return [
          { provide: sw, multi: !0, useValue: e },
          { provide: ya, multi: !0, useValue: e },
        ];
      }
      let Sa = (() => {
        class e {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new _3());
          }
          appInitializer() {
            return this.injector.get(AA, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const a = new Promise((s) => (r = s)),
                i = this.injector.get(O1),
                o = this.injector.get(c6);
              return (
                "disabled" === o.initialNavigation
                  ? (i.setUpLocationChangeListener(), r(!0))
                  : "enabledBlocking" === o.initialNavigation
                  ? ((i.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? d2(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    i.initialNavigation())
                  : r(!0),
                a
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(c6),
              a = this.injector.get(oy),
              i = this.injector.get(ba),
              o = this.injector.get(O1),
              s = this.injector.get(J8);
            n === s.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                o.initialNavigation(),
              a.setUpPreloading(),
              i.init(),
              o.resetRootComponentType(s.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(w1));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function y72(e) {
        return e.appInitializer.bind(e);
      }
      function H72(e) {
        return e.bootstrapListener.bind(e);
      }
      const Cy = new s2("Router Initializer");
      let Ie = (() => {
        class e {
          constructor(n, r) {
            (this.socket = n),
              (this.router = r),
              (this.username = ""),
              (this.messageArray = []),
              this.initialChat();
          }
          ngOnInit() {}
          initialChat() {
            localStorage.getItem("username")?.length > 0
              ? ((this.username = localStorage.getItem("username")),
                this.router.navigate(["/", "chat"]))
              : this.router.navigate(["/"]);
          }
          sendMessage(n, r) {
            this.socket.emit(n, r);
          }
          getMessage(n) {
            return this.socket.fromEvent(n).pipe(S2((r) => r));
          }
          setUsername(n) {
            (this.username = n), localStorage.setItem("username", n);
          }
          getUsername() {
            return this.username;
          }
          getMessageArray() {
            return this.messageArray;
          }
          addToMessageArray(n) {
            this.messageArray.push(n);
          }
          logout() {
            (this.messageArray = []),
              this.socket.disconnect(),
              this.setUsername(""),
              this.initialChat();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(Ir), W(O1));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function fy(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function K(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? fy(Object(n), !0).forEach(function (r) {
                S72(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : fy(Object(n)).forEach(function (r) {
                Object.defineProperty(
                  e,
                  r,
                  Object.getOwnPropertyDescriptor(n, r)
                );
              });
        }
        return e;
      }
      function ct(e) {
        return (ct =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(e);
      }
      function uy(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function S72(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function Da(e, t) {
        return (
          (function _72(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function A72(e, t) {
            var n =
              null == e
                ? null
                : (typeof Symbol < "u" && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != n) {
              var o,
                s,
                r = [],
                a = !0,
                i = !1;
              try {
                for (
                  n = n.call(e);
                  !(a = (o = n.next()).done) &&
                  (r.push(o.value), !t || r.length !== t);
                  a = !0
                );
              } catch (c) {
                (i = !0), (s = c);
              } finally {
                try {
                  !a && null != n.return && n.return();
                } finally {
                  if (i) throw s;
                }
              }
              return r;
            }
          })(e, t) ||
          dy(e, t) ||
          (function k72() {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function Ct(e) {
        return (
          (function x72(e) {
            if (Array.isArray(e)) return xa(e);
          })(e) ||
          (function N72(e) {
            if (
              (typeof Symbol < "u" && null != e[Symbol.iterator]) ||
              null != e["@@iterator"]
            )
              return Array.from(e);
          })(e) ||
          dy(e) ||
          (function E72() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function dy(e, t) {
        if (e) {
          if ("string" == typeof e) return xa(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          if (
            ("Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n)
          )
            return Array.from(e);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return xa(e, t);
        }
      }
      function xa(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var hy = function () {},
        _a = {},
        py = {},
        my = null,
        gy = { mark: hy, measure: hy };
      try {
        typeof window < "u" && (_a = window),
          typeof document < "u" && (py = document),
          typeof MutationObserver < "u" && (my = MutationObserver),
          typeof performance < "u" && (gy = performance);
      } catch {}
      var vy = (_a.navigator || {}).userAgent,
        My = void 0 === vy ? "" : vy,
        F4 = _a,
        $2 = py,
        Ly = my,
        ft = gy,
        p4 =
          !!$2.documentElement &&
          !!$2.head &&
          "function" == typeof $2.addEventListener &&
          "function" == typeof $2.createElement,
        Vy = ~My.indexOf("MSIE") || ~My.indexOf("Trident/"),
        m4 = "___FONT_AWESOME___",
        Hy = "svg-inline--fa",
        l6 = "data-fa-i2svg",
        Aa = "data-fa-pseudo-element",
        Ea = "data-prefix",
        ka = "data-icon",
        zy = "fontawesome-i2svg",
        P72 = ["HTML", "HEAD", "STYLE", "SCRIPT"],
        wy = (function () {
          try {
            return !0;
          } catch {
            return !1;
          }
        })(),
        Ta = {
          fas: "solid",
          "fa-solid": "solid",
          far: "regular",
          "fa-regular": "regular",
          fal: "light",
          "fa-light": "light",
          fat: "thin",
          "fa-thin": "thin",
          fad: "duotone",
          "fa-duotone": "duotone",
          fab: "brands",
          "fa-brands": "brands",
          fak: "kit",
          "fa-kit": "kit",
          fa: "solid",
        },
        ut = {
          solid: "fas",
          regular: "far",
          light: "fal",
          thin: "fat",
          duotone: "fad",
          brands: "fab",
          kit: "fak",
        },
        by = {
          fab: "fa-brands",
          fad: "fa-duotone",
          fak: "fa-kit",
          fal: "fa-light",
          far: "fa-regular",
          fas: "fa-solid",
          fat: "fa-thin",
        },
        R72 = {
          "fa-brands": "fab",
          "fa-duotone": "fad",
          "fa-kit": "fak",
          "fa-light": "fal",
          "fa-regular": "far",
          "fa-solid": "fas",
          "fa-thin": "fat",
        },
        O72 = /fa[srltdbk\-\ ]/,
        Sy = "fa-layers-text",
        B72 =
          /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i,
        U72 = { 900: "fas", 400: "far", normal: "far", 300: "fal", 100: "fat" },
        Dy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        j72 = Dy.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
        $72 = [
          "class",
          "data-prefix",
          "data-icon",
          "data-fa-transform",
          "data-fa-mask",
        ],
        G72 = []
          .concat(Ct(Object.keys(ut)), [
            "2xs",
            "xs",
            "sm",
            "lg",
            "xl",
            "2xl",
            "beat",
            "border",
            "fade",
            "beat-fade",
            "bounce",
            "flip-both",
            "flip-horizontal",
            "flip-vertical",
            "flip",
            "fw",
            "inverse",
            "layers-counter",
            "layers-text",
            "layers",
            "li",
            "pull-left",
            "pull-right",
            "pulse",
            "rotate-180",
            "rotate-270",
            "rotate-90",
            "rotate-by",
            "shake",
            "spin-pulse",
            "spin-reverse",
            "spin",
            "stack-1x",
            "stack-2x",
            "stack",
            "ul",
            "duotone-group",
            "swap-opacity",
            "primary",
            "secondary",
          ])
          .concat(
            Dy.map(function (e) {
              return "".concat(e, "x");
            })
          )
          .concat(
            j72.map(function (e) {
              return "w-".concat(e);
            })
          ),
        xy = F4.FontAwesomeConfig || {};
      $2 &&
        "function" == typeof $2.querySelector &&
        [
          ["data-family-prefix", "familyPrefix"],
          ["data-style-default", "styleDefault"],
          ["data-replacement-class", "replacementClass"],
          ["data-auto-replace-svg", "autoReplaceSvg"],
          ["data-auto-add-css", "autoAddCss"],
          ["data-auto-a11y", "autoA11y"],
          ["data-search-pseudo-elements", "searchPseudoElements"],
          ["data-observe-mutations", "observeMutations"],
          ["data-mutate-approach", "mutateApproach"],
          ["data-keep-original-source", "keepOriginalSource"],
          ["data-measure-performance", "measurePerformance"],
          ["data-show-missing-icons", "showMissingIcons"],
        ].forEach(function (e) {
          var t = Da(e, 2),
            r = t[1],
            a = (function W72(e) {
              return "" === e || ("false" !== e && ("true" === e || e));
            })(
              (function q72(e) {
                var t = $2.querySelector("script[" + e + "]");
                if (t) return t.getAttribute(e);
              })(t[0])
            );
          null != a && (xy[r] = a);
        });
      var Re = K(
        K(
          {},
          {
            familyPrefix: "fa",
            styleDefault: "solid",
            replacementClass: Hy,
            autoReplaceSvg: !0,
            autoAddCss: !0,
            autoA11y: !0,
            searchPseudoElements: !1,
            observeMutations: !0,
            mutateApproach: "async",
            keepOriginalSource: !0,
            measurePerformance: !1,
            showMissingIcons: !0,
          }
        ),
        xy
      );
      Re.autoReplaceSvg || (Re.observeMutations = !1);
      var Z = {};
      Object.keys(Re).forEach(function (e) {
        Object.defineProperty(Z, e, {
          enumerable: !0,
          set: function (n) {
            (Re[e] = n),
              dt.forEach(function (r) {
                return r(Z);
              });
          },
          get: function () {
            return Re[e];
          },
        });
      }),
        (F4.FontAwesomeConfig = Z);
      var dt = [],
        K3 = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
      function Oe() {
        for (var e = 12, t = ""; e-- > 0; )
          t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
            (62 * Math.random()) | 0
          ];
        return t;
      }
      function l5(e) {
        for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
        return t;
      }
      function Fa(e) {
        return e.classList
          ? l5(e.classList)
          : (e.getAttribute("class") || "").split(" ").filter(function (t) {
              return t;
            });
      }
      function _y(e) {
        return ""
          .concat(e)
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function ht(e) {
        return Object.keys(e || {}).reduce(function (t, n) {
          return t + "".concat(n, ": ").concat(e[n].trim(), ";");
        }, "");
      }
      function Ia(e) {
        return (
          e.size !== K3.size ||
          e.x !== K3.x ||
          e.y !== K3.y ||
          e.rotate !== K3.rotate ||
          e.flipX ||
          e.flipY
        );
      }
      function Ny() {
        var e = "fa",
          t = Hy,
          n = Z.familyPrefix,
          r = Z.replacementClass,
          a =
            ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
        if (n !== e || r !== t) {
          var i = new RegExp("\\.".concat(e, "\\-"), "g"),
            o = new RegExp("\\--".concat(e, "\\-"), "g"),
            s = new RegExp("\\.".concat(t), "g");
          a = a
            .replace(i, ".".concat(n, "-"))
            .replace(o, "--".concat(n, "-"))
            .replace(s, ".".concat(r));
        }
        return a;
      }
      var Ay = !1;
      function Pa() {
        Z.autoAddCss &&
          !Ay &&
          ((function X72(e) {
            if (e && p4) {
              var t = $2.createElement("style");
              t.setAttribute("type", "text/css"), (t.innerHTML = e);
              for (
                var n = $2.head.childNodes, r = null, a = n.length - 1;
                a > -1;
                a--
              ) {
                var i = n[a],
                  o = (i.tagName || "").toUpperCase();
                ["STYLE", "LINK"].indexOf(o) > -1 && (r = i);
              }
              $2.head.insertBefore(t, r);
            }
          })(Ny()),
          (Ay = !0));
      }
      var rr2 = {
          mixout: function () {
            return { dom: { css: Ny, insertCss: Pa } };
          },
          hooks: function () {
            return {
              beforeDOMElementCreation: function () {
                Pa();
              },
              beforeI2svg: function () {
                Pa();
              },
            };
          },
        },
        g4 = F4 || {};
      g4[m4] || (g4[m4] = {}),
        g4[m4].styles || (g4[m4].styles = {}),
        g4[m4].hooks || (g4[m4].hooks = {}),
        g4[m4].shims || (g4[m4].shims = []);
      var D3 = g4[m4],
        Ey = [],
        pt = !1;
      function ir2(e) {
        !p4 || (pt ? setTimeout(e, 0) : Ey.push(e));
      }
      function Be(e) {
        var t = e.tag,
          n = e.attributes,
          r = void 0 === n ? {} : n,
          a = e.children,
          i = void 0 === a ? [] : a;
        return "string" == typeof e
          ? _y(e)
          : "<"
              .concat(t, " ")
              .concat(
                (function Z72(e) {
                  return Object.keys(e || {})
                    .reduce(function (t, n) {
                      return t + "".concat(n, '="').concat(_y(e[n]), '" ');
                    }, "")
                    .trim();
                })(r),
                ">"
              )
              .concat(i.map(Be).join(""), "</")
              .concat(t, ">");
      }
      function ky(e, t, n) {
        if (e && e[t] && e[t][n])
          return { prefix: t, iconName: n, icon: e[t][n] };
      }
      p4 &&
        ((pt = (
          $2.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/
        ).test($2.readyState)) ||
          $2.addEventListener("DOMContentLoaded", function e() {
            $2.removeEventListener("DOMContentLoaded", e),
              (pt = 1),
              Ey.map(function (t) {
                return t();
              });
          }));
      var Ra = function (t, n, r, a) {
        var c,
          l,
          C,
          i = Object.keys(t),
          o = i.length,
          s =
            void 0 !== a
              ? (function (t, n) {
                  return function (r, a, i, o) {
                    return t.call(n, r, a, i, o);
                  };
                })(n, a)
              : n;
        for (
          void 0 === r ? ((c = 1), (C = t[i[0]])) : ((c = 0), (C = r));
          c < o;
          c++
        )
          C = s(C, t[(l = i[c])], l, t);
        return C;
      };
      function Oa(e) {
        var t = (function sr2(e) {
          for (var t = [], n = 0, r = e.length; n < r; ) {
            var a = e.charCodeAt(n++);
            if (a >= 55296 && a <= 56319 && n < r) {
              var i = e.charCodeAt(n++);
              56320 == (64512 & i)
                ? t.push(((1023 & a) << 10) + (1023 & i) + 65536)
                : (t.push(a), n--);
            } else t.push(a);
          }
          return t;
        })(e);
        return 1 === t.length ? t[0].toString(16) : null;
      }
      function Ty(e) {
        return Object.keys(e).reduce(function (t, n) {
          var r = e[n];
          return r.icon ? (t[r.iconName] = r.icon) : (t[n] = r), t;
        }, {});
      }
      function Ba(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = n.skipHooks,
          a = void 0 !== r && r,
          i = Ty(t);
        "function" != typeof D3.hooks.addPack || a
          ? (D3.styles[e] = K(K({}, D3.styles[e] || {}), i))
          : D3.hooks.addPack(e, Ty(t)),
          "fas" === e && Ba("fa", t);
      }
      var Ue = D3.styles,
        lr2 = D3.shims,
        Cr2 = Object.values(by),
        Ua = null,
        Fy = {},
        Iy = {},
        Py = {},
        Ry = {},
        Oy = {},
        fr2 = Object.keys(Ta);
      function dr2(e, t) {
        var n = t.split("-"),
          r = n[0],
          a = n.slice(1).join("-");
        return r !== e ||
          "" === a ||
          (function ur2(e) {
            return ~G72.indexOf(e);
          })(a)
          ? null
          : a;
      }
      var By = function () {
        var t = function (i) {
          return Ra(
            Ue,
            function (o, s, c) {
              return (o[c] = Ra(s, i, {})), o;
            },
            {}
          );
        };
        (Fy = t(function (a, i, o) {
          return (
            i[3] && (a[i[3]] = o),
            i[2] &&
              i[2]
                .filter(function (c) {
                  return "number" == typeof c;
                })
                .forEach(function (c) {
                  a[c.toString(16)] = o;
                }),
            a
          );
        })),
          (Iy = t(function (a, i, o) {
            return (
              (a[o] = o),
              i[2] &&
                i[2]
                  .filter(function (c) {
                    return "string" == typeof c;
                  })
                  .forEach(function (c) {
                    a[c] = o;
                  }),
              a
            );
          })),
          (Oy = t(function (a, i, o) {
            var s = i[2];
            return (
              (a[o] = o),
              s.forEach(function (c) {
                a[c] = o;
              }),
              a
            );
          }));
        var n = "far" in Ue || Z.autoFetchSvg,
          r = Ra(
            lr2,
            function (a, i) {
              var o = i[0],
                s = i[1],
                c = i[2];
              return (
                "far" === s && !n && (s = "fas"),
                "string" == typeof o &&
                  (a.names[o] = { prefix: s, iconName: c }),
                "number" == typeof o &&
                  (a.unicodes[o.toString(16)] = { prefix: s, iconName: c }),
                a
              );
            },
            { names: {}, unicodes: {} }
          );
        (Py = r.names), (Ry = r.unicodes), (Ua = mt(Z.styleDefault));
      };
      function ja(e, t) {
        return (Fy[e] || {})[t];
      }
      function C5(e, t) {
        return (Oy[e] || {})[t];
      }
      function Uy(e) {
        return Py[e] || { prefix: null, iconName: null };
      }
      function P4() {
        return Ua;
      }
      function mt(e) {
        return ut[e] || ut[Ta[e]] || (e in D3.styles ? e : null) || null;
      }
      function gt(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = t.skipLookups,
          r = void 0 !== n && n,
          a = null,
          i = e.reduce(
            function (o, s) {
              var c = dr2(Z.familyPrefix, s);
              if (
                (Ue[s]
                  ? ((s = Cr2.includes(s) ? R72[s] : s),
                    (a = s),
                    (o.prefix = s))
                  : fr2.indexOf(s) > -1
                  ? ((a = s), (o.prefix = mt(s)))
                  : c
                  ? (o.iconName = c)
                  : s !== Z.replacementClass && o.rest.push(s),
                !r && o.prefix && o.iconName)
              ) {
                var l = "fa" === a ? Uy(o.iconName) : {},
                  C = C5(o.prefix, o.iconName);
                l.prefix && (a = null),
                  (o.iconName = l.iconName || C || o.iconName),
                  (o.prefix = l.prefix || o.prefix),
                  "far" === o.prefix &&
                    !Ue.far &&
                    Ue.fas &&
                    !Z.autoFetchSvg &&
                    (o.prefix = "fas");
              }
              return o;
            },
            { prefix: null, iconName: null, rest: [] }
          );
        return (
          ("fa" === i.prefix || "fa" === a) && (i.prefix = P4() || "fas"), i
        );
      }
      (function Q72(e) {
        dt.push(e);
      })(function (e) {
        Ua = mt(e.styleDefault);
      }),
        By();
      var mr2 = (function () {
          function e() {
            (function w72(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.definitions = {});
          }
          return (
            (function b72(e, t, n) {
              t && uy(e.prototype, t),
                n && uy(e, n),
                Object.defineProperty(e, "prototype", { writable: !1 });
            })(e, [
              {
                key: "add",
                value: function () {
                  for (
                    var n = this, r = arguments.length, a = new Array(r), i = 0;
                    i < r;
                    i++
                  )
                    a[i] = arguments[i];
                  var o = a.reduce(this._pullDefinitions, {});
                  Object.keys(o).forEach(function (s) {
                    (n.definitions[s] = K(K({}, n.definitions[s] || {}), o[s])),
                      Ba(s, o[s]);
                    var c = by[s];
                    c && Ba(c, o[s]), By();
                  });
                },
              },
              {
                key: "reset",
                value: function () {
                  this.definitions = {};
                },
              },
              {
                key: "_pullDefinitions",
                value: function (n, r) {
                  var a = r.prefix && r.iconName && r.icon ? { 0: r } : r;
                  return (
                    Object.keys(a).map(function (i) {
                      var o = a[i],
                        s = o.prefix,
                        c = o.iconName,
                        l = o.icon,
                        C = l[2];
                      n[s] || (n[s] = {}),
                        C.length > 0 &&
                          C.forEach(function (f) {
                            "string" == typeof f && (n[s][f] = l);
                          }),
                        (n[s][c] = l);
                    }),
                    n
                  );
                },
              },
            ]),
            e
          );
        })(),
        jy = [],
        f5 = {},
        u5 = {},
        gr2 = Object.keys(u5);
      function Ga(e, t) {
        for (
          var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2;
          a < n;
          a++
        )
          r[a - 2] = arguments[a];
        var i = f5[e] || [];
        return (
          i.forEach(function (o) {
            t = o.apply(null, [t].concat(r));
          }),
          t
        );
      }
      function f6(e) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
          r < t;
          r++
        )
          n[r - 1] = arguments[r];
        var a = f5[e] || [];
        a.forEach(function (i) {
          i.apply(null, n);
        });
      }
      function v4() {
        var e = arguments[0],
          t = Array.prototype.slice.call(arguments, 1);
        return u5[e] ? u5[e].apply(null, t) : void 0;
      }
      function qa(e) {
        "fa" === e.prefix && (e.prefix = "fas");
        var t = e.iconName,
          n = e.prefix || P4();
        if (t)
          return (
            (t = C5(n, t) || t), ky($y.definitions, n, t) || ky(D3.styles, n, t)
          );
      }
      var $y = new mr2(),
        Lr2 = {
          i2svg: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return p4
              ? (f6("beforeI2svg", t),
                v4("pseudoElements2svg", t),
                v4("i2svg", t))
              : Promise.reject("Operation requires a DOM of some kind.");
          },
          watch: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = t.autoReplaceSvgRoot;
            !1 === Z.autoReplaceSvg && (Z.autoReplaceSvg = !0),
              (Z.observeMutations = !0),
              ir2(function () {
                yr2({ autoReplaceSvgRoot: n }), f6("watch", t);
              });
          },
        },
        t3 = {
          noAuto: function () {
            (Z.autoReplaceSvg = !1), (Z.observeMutations = !1), f6("noAuto");
          },
          config: Z,
          dom: Lr2,
          parse: {
            icon: function (t) {
              if (null === t) return null;
              if ("object" === ct(t) && t.prefix && t.iconName)
                return {
                  prefix: t.prefix,
                  iconName: C5(t.prefix, t.iconName) || t.iconName,
                };
              if (Array.isArray(t) && 2 === t.length) {
                var n = 0 === t[1].indexOf("fa-") ? t[1].slice(3) : t[1],
                  r = mt(t[0]);
                return { prefix: r, iconName: C5(r, n) || n };
              }
              if (
                "string" == typeof t &&
                (t.indexOf("".concat(Z.familyPrefix, "-")) > -1 || t.match(O72))
              ) {
                var a = gt(t.split(" "), { skipLookups: !0 });
                return {
                  prefix: a.prefix || P4(),
                  iconName: C5(a.prefix, a.iconName) || a.iconName,
                };
              }
              if ("string" == typeof t) {
                var i = P4();
                return { prefix: i, iconName: C5(i, t) || t };
              }
            },
          },
          library: $y,
          findIconDefinition: qa,
          toHtml: Be,
        },
        yr2 = function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = t.autoReplaceSvgRoot,
            r = void 0 === n ? $2 : n;
          (Object.keys(D3.styles).length > 0 || Z.autoFetchSvg) &&
            p4 &&
            Z.autoReplaceSvg &&
            t3.dom.i2svg({ node: r });
        };
      function vt(e, t) {
        return (
          Object.defineProperty(e, "abstract", { get: t }),
          Object.defineProperty(e, "html", {
            get: function () {
              return e.abstract.map(function (r) {
                return Be(r);
              });
            },
          }),
          Object.defineProperty(e, "node", {
            get: function () {
              if (p4) {
                var r = $2.createElement("div");
                return (r.innerHTML = e.html), r.children;
              }
            },
          }),
          e
        );
      }
      function Wa(e) {
        var t = e.icons,
          n = t.main,
          r = t.mask,
          a = e.prefix,
          i = e.iconName,
          o = e.transform,
          s = e.symbol,
          c = e.title,
          l = e.maskId,
          C = e.titleId,
          f = e.extra,
          d = e.watchable,
          g = void 0 !== d && d,
          y = r.found ? r : n,
          x = y.width,
          F = y.height,
          k = "fak" === a,
          O = [
            Z.replacementClass,
            i ? "".concat(Z.familyPrefix, "-").concat(i) : "",
          ]
            .filter(function (Q3) {
              return -1 === f.classes.indexOf(Q3);
            })
            .filter(function (Q3) {
              return "" !== Q3 || !!Q3;
            })
            .concat(f.classes)
            .join(" "),
          A = {
            children: [],
            attributes: K(
              K({}, f.attributes),
              {},
              {
                "data-prefix": a,
                "data-icon": i,
                class: O,
                role: f.attributes.role || "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(x, " ").concat(F),
              }
            ),
          },
          q =
            k && !~f.classes.indexOf("fa-fw")
              ? { width: "".concat((x / F) * 16 * 0.0625, "em") }
              : {};
        g && (A.attributes[l6] = ""),
          c &&
            (A.children.push({
              tag: "title",
              attributes: {
                id:
                  A.attributes["aria-labelledby"] || "title-".concat(C || Oe()),
              },
              children: [c],
            }),
            delete A.attributes.title);
        var n2 = K(
            K({}, A),
            {},
            {
              prefix: a,
              iconName: i,
              main: n,
              mask: r,
              maskId: l,
              transform: o,
              symbol: s,
              styles: K(K({}, q), f.styles),
            }
          ),
          w2 =
            r.found && n.found
              ? v4("generateAbstractMask", n2) || {
                  children: [],
                  attributes: {},
                }
              : v4("generateAbstractIcon", n2) || {
                  children: [],
                  attributes: {},
                },
          L4 = w2.attributes;
        return (
          (n2.children = w2.children),
          (n2.attributes = L4),
          s
            ? (function zr2(e) {
                var n = e.iconName,
                  r = e.children,
                  a = e.attributes,
                  i = e.symbol,
                  o =
                    !0 === i
                      ? ""
                          .concat(e.prefix, "-")
                          .concat(Z.familyPrefix, "-")
                          .concat(n)
                      : i;
                return [
                  {
                    tag: "svg",
                    attributes: { style: "display: none;" },
                    children: [
                      {
                        tag: "symbol",
                        attributes: K(K({}, a), {}, { id: o }),
                        children: r,
                      },
                    ],
                  },
                ];
              })(n2)
            : (function Hr2(e) {
                var t = e.children,
                  n = e.main,
                  r = e.mask,
                  a = e.attributes,
                  i = e.styles,
                  o = e.transform;
                if (Ia(o) && n.found && !r.found) {
                  var l = { x: n.width / n.height / 2, y: 0.5 };
                  a.style = ht(
                    K(
                      K({}, i),
                      {},
                      {
                        "transform-origin": ""
                          .concat(l.x + o.x / 16, "em ")
                          .concat(l.y + o.y / 16, "em"),
                      }
                    )
                  );
                }
                return [{ tag: "svg", attributes: a, children: t }];
              })(n2)
        );
      }
      function Gy(e) {
        var t = e.content,
          n = e.width,
          r = e.height,
          a = e.transform,
          i = e.title,
          o = e.extra,
          s = e.watchable,
          c = void 0 !== s && s,
          l = K(
            K(K({}, o.attributes), i ? { title: i } : {}),
            {},
            { class: o.classes.join(" ") }
          );
        c && (l[l6] = "");
        var C = K({}, o.styles);
        Ia(a) &&
          ((C.transform = (function tr2(e) {
            var t = e.transform,
              n = e.width,
              a = e.height,
              i = void 0 === a ? 16 : a,
              o = e.startCentered,
              s = void 0 !== o && o,
              c = "";
            return (
              (c +=
                s && Vy
                  ? "translate("
                      .concat(t.x / 16 - (void 0 === n ? 16 : n) / 2, "em, ")
                      .concat(t.y / 16 - i / 2, "em) ")
                  : s
                  ? "translate(calc(-50% + "
                      .concat(t.x / 16, "em), calc(-50% + ")
                      .concat(t.y / 16, "em)) ")
                  : "translate("
                      .concat(t.x / 16, "em, ")
                      .concat(t.y / 16, "em) ")),
              (c += "scale("
                .concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
                .concat((t.size / 16) * (t.flipY ? -1 : 1), ") ")) +
                "rotate(".concat(t.rotate, "deg) ")
            );
          })({ transform: a, startCentered: !0, width: n, height: r })),
          (C["-webkit-transform"] = C.transform));
        var f = ht(C);
        f.length > 0 && (l.style = f);
        var d = [];
        return (
          d.push({ tag: "span", attributes: l, children: [t] }),
          i &&
            d.push({
              tag: "span",
              attributes: { class: "sr-only" },
              children: [i],
            }),
          d
        );
      }
      function wr2(e) {
        var t = e.content,
          n = e.title,
          r = e.extra,
          a = K(
            K(K({}, r.attributes), n ? { title: n } : {}),
            {},
            { class: r.classes.join(" ") }
          ),
          i = ht(r.styles);
        i.length > 0 && (a.style = i);
        var o = [];
        return (
          o.push({ tag: "span", attributes: a, children: [t] }),
          n &&
            o.push({
              tag: "span",
              attributes: { class: "sr-only" },
              children: [n],
            }),
          o
        );
      }
      var Ya = D3.styles;
      function Ka(e) {
        var t = e[0],
          n = e[1],
          i = Da(e.slice(4), 1)[0];
        return {
          found: !0,
          width: t,
          height: n,
          icon: Array.isArray(i)
            ? {
                tag: "g",
                attributes: {
                  class: "".concat(Z.familyPrefix, "-").concat("duotone-group"),
                },
                children: [
                  {
                    tag: "path",
                    attributes: {
                      class: "".concat(Z.familyPrefix, "-").concat("secondary"),
                      fill: "currentColor",
                      d: i[0],
                    },
                  },
                  {
                    tag: "path",
                    attributes: {
                      class: "".concat(Z.familyPrefix, "-").concat("primary"),
                      fill: "currentColor",
                      d: i[1],
                    },
                  },
                ],
              }
            : { tag: "path", attributes: { fill: "currentColor", d: i } },
        };
      }
      var br2 = { found: !1, width: 512, height: 512 };
      function Qa(e, t) {
        var n = t;
        return (
          "fa" === t && null !== Z.styleDefault && (t = P4()),
          new Promise(function (r, a) {
            if ((v4("missingIconAbstract"), "fa" === n)) {
              var o = Uy(e) || {};
              (e = o.iconName || e), (t = o.prefix || t);
            }
            if (e && t && Ya[t] && Ya[t][e]) return r(Ka(Ya[t][e]));
            (function Sr2(e, t) {
              !wy &&
                !Z.showMissingIcons &&
                e &&
                console.error(
                  'Icon with name "'
                    .concat(e, '" and prefix "')
                    .concat(t, '" is missing.')
                );
            })(e, t),
              r(
                K(
                  K({}, br2),
                  {},
                  {
                    icon:
                      (Z.showMissingIcons && e && v4("missingIconAbstract")) ||
                      {},
                  }
                )
              );
          })
        );
      }
      var qy = function () {},
        Xa =
          Z.measurePerformance && ft && ft.mark && ft.measure
            ? ft
            : { mark: qy, measure: qy },
        je = 'FA "6.1.1"',
        Ja_begin = function (t) {
          return (
            Xa.mark("".concat(je, " ").concat(t, " begins")),
            function () {
              return (function (t) {
                Xa.mark("".concat(je, " ").concat(t, " ends")),
                  Xa.measure(
                    "".concat(je, " ").concat(t),
                    "".concat(je, " ").concat(t, " begins"),
                    "".concat(je, " ").concat(t, " ends")
                  );
              })(t);
            }
          );
        },
        Mt = function () {};
      function Yy(e) {
        return "string" == typeof (e.getAttribute ? e.getAttribute(l6) : null);
      }
      function Ar2(e) {
        return $2.createElementNS("http://www.w3.org/2000/svg", e);
      }
      function Er2(e) {
        return $2.createElement(e);
      }
      function Ky(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = t.ceFn,
          r = void 0 === n ? ("svg" === e.tag ? Ar2 : Er2) : n;
        if ("string" == typeof e) return $2.createTextNode(e);
        var a = r(e.tag);
        Object.keys(e.attributes || []).forEach(function (o) {
          a.setAttribute(o, e.attributes[o]);
        });
        var i = e.children || [];
        return (
          i.forEach(function (o) {
            a.appendChild(Ky(o, { ceFn: r }));
          }),
          a
        );
      }
      var Lt = {
        replace: function (t) {
          var n = t[0];
          if (n.parentNode)
            if (
              (t[1].forEach(function (a) {
                n.parentNode.insertBefore(Ky(a), n);
              }),
              null === n.getAttribute(l6) && Z.keepOriginalSource)
            ) {
              var r = $2.createComment(
                (function kr2(e) {
                  var t = " ".concat(e.outerHTML, " ");
                  return "".concat(t, "Font Awesome fontawesome.com ");
                })(n)
              );
              n.parentNode.replaceChild(r, n);
            } else n.remove();
        },
        nest: function (t) {
          var n = t[0],
            r = t[1];
          if (~Fa(n).indexOf(Z.replacementClass)) return Lt.replace(t);
          var a = new RegExp("".concat(Z.familyPrefix, "-.*"));
          if ((delete r[0].attributes.id, r[0].attributes.class)) {
            var i = r[0].attributes.class.split(" ").reduce(
              function (s, c) {
                return (
                  c === Z.replacementClass || c.match(a)
                    ? s.toSvg.push(c)
                    : s.toNode.push(c),
                  s
                );
              },
              { toNode: [], toSvg: [] }
            );
            (r[0].attributes.class = i.toSvg.join(" ")),
              0 === i.toNode.length
                ? n.removeAttribute("class")
                : n.setAttribute("class", i.toNode.join(" "));
          }
          var o = r
            .map(function (s) {
              return Be(s);
            })
            .join("\n");
          n.setAttribute(l6, ""), (n.innerHTML = o);
        },
      };
      function Qy(e) {
        e();
      }
      function Xy(e, t) {
        var n = "function" == typeof t ? t : Mt;
        if (0 === e.length) n();
        else {
          var r = Qy;
          "async" === Z.mutateApproach && (r = F4.requestAnimationFrame || Qy),
            r(function () {
              var a = (function Nr2() {
                  return !0 === Z.autoReplaceSvg
                    ? Lt.replace
                    : Lt[Z.autoReplaceSvg] || Lt.replace;
                })(),
                i = Ja_begin("mutate");
              e.map(a), i(), n();
            });
        }
      }
      var Za = !1;
      function Jy() {
        Za = !0;
      }
      function ei() {
        Za = !1;
      }
      var Vt = null;
      function Zy(e) {
        if (Ly && Z.observeMutations) {
          var t = e.treeCallback,
            n = void 0 === t ? Mt : t,
            r = e.nodeCallback,
            a = void 0 === r ? Mt : r,
            i = e.pseudoElementsCallback,
            o = void 0 === i ? Mt : i,
            s = e.observeMutationsRoot,
            c = void 0 === s ? $2 : s;
          (Vt = new Ly(function (l) {
            if (!Za) {
              var C = P4();
              l5(l).forEach(function (f) {
                if (
                  ("childList" === f.type &&
                    f.addedNodes.length > 0 &&
                    !Yy(f.addedNodes[0]) &&
                    (Z.searchPseudoElements && o(f.target), n(f.target)),
                  "attributes" === f.type &&
                    f.target.parentNode &&
                    Z.searchPseudoElements &&
                    o(f.target.parentNode),
                  "attributes" === f.type &&
                    Yy(f.target) &&
                    ~$72.indexOf(f.attributeName))
                )
                  if (
                    "class" === f.attributeName &&
                    (function xr2(e) {
                      var t = e.getAttribute ? e.getAttribute(Ea) : null,
                        n = e.getAttribute ? e.getAttribute(ka) : null;
                      return t && n;
                    })(f.target)
                  ) {
                    var d = gt(Fa(f.target)),
                      y = d.iconName;
                    f.target.setAttribute(Ea, d.prefix || C),
                      y && f.target.setAttribute(ka, y);
                  } else
                    (function _r2(e) {
                      return (
                        e &&
                        e.classList &&
                        e.classList.contains &&
                        e.classList.contains(Z.replacementClass)
                      );
                    })(f.target) && a(f.target);
              });
            }
          })),
            p4 &&
              Vt.observe(c, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0,
              });
        }
      }
      function Fr2(e) {
        var t = e.getAttribute("style"),
          n = [];
        return (
          t &&
            (n = t.split(";").reduce(function (r, a) {
              var i = a.split(":"),
                o = i[0],
                s = i.slice(1);
              return o && s.length > 0 && (r[o] = s.join(":").trim()), r;
            }, {})),
          n
        );
      }
      function Ir2(e) {
        var t = e.getAttribute("data-prefix"),
          n = e.getAttribute("data-icon"),
          r = void 0 !== e.innerText ? e.innerText.trim() : "",
          a = gt(Fa(e));
        return (
          a.prefix || (a.prefix = P4()),
          t && n && ((a.prefix = t), (a.iconName = n)),
          (a.iconName && a.prefix) ||
            (a.prefix &&
              r.length > 0 &&
              (a.iconName =
                (function hr2(e, t) {
                  return (Iy[e] || {})[t];
                })(a.prefix, e.innerText) || ja(a.prefix, Oa(e.innerText)))),
          a
        );
      }
      function Pr2(e) {
        var t = l5(e.attributes).reduce(function (a, i) {
            return (
              "class" !== a.name && "style" !== a.name && (a[i.name] = i.value),
              a
            );
          }, {}),
          n = e.getAttribute("title"),
          r = e.getAttribute("data-fa-title-id");
        return (
          Z.autoA11y &&
            (n
              ? (t["aria-labelledby"] = ""
                  .concat(Z.replacementClass, "-title-")
                  .concat(r || Oe()))
              : ((t["aria-hidden"] = "true"), (t.focusable = "false"))),
          t
        );
      }
      function eH(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { styleParser: !0 },
          n = Ir2(e),
          r = n.iconName,
          a = n.prefix,
          i = n.rest,
          o = Pr2(e),
          s = Ga("parseNodeAttributes", {}, e),
          c = t.styleParser ? Fr2(e) : [];
        return K(
          {
            iconName: r,
            title: e.getAttribute("title"),
            titleId: e.getAttribute("data-fa-title-id"),
            prefix: a,
            transform: K3,
            mask: { iconName: null, prefix: null, rest: [] },
            maskId: null,
            symbol: !1,
            extra: { classes: i, styles: c, attributes: o },
          },
          s
        );
      }
      var Or2 = D3.styles;
      function tH(e) {
        var t =
          "nest" === Z.autoReplaceSvg ? eH(e, { styleParser: !1 }) : eH(e);
        return ~t.extra.classes.indexOf(Sy)
          ? v4("generateLayersText", e, t)
          : v4("generateSvgReplacementMutation", e, t);
      }
      function nH(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (!p4) return Promise.resolve();
        var n = $2.documentElement.classList,
          r = function (f) {
            return n.add("".concat(zy, "-").concat(f));
          },
          a = function (f) {
            return n.remove("".concat(zy, "-").concat(f));
          },
          i = Object.keys(Z.autoFetchSvg ? Ta : Or2),
          o = [".".concat(Sy, ":not([").concat(l6, "])")]
            .concat(
              i.map(function (C) {
                return ".".concat(C, ":not([").concat(l6, "])");
              })
            )
            .join(", ");
        if (0 === o.length) return Promise.resolve();
        var s = [];
        try {
          s = l5(e.querySelectorAll(o));
        } catch {}
        if (!(s.length > 0)) return Promise.resolve();
        r("pending"), a("complete");
        var c = Ja_begin("onTree"),
          l = s.reduce(function (C, f) {
            try {
              var d = tH(f);
              d && C.push(d);
            } catch (g) {
              wy || ("MissingIcon" === g.name && console.error(g));
            }
            return C;
          }, []);
        return new Promise(function (C, f) {
          Promise.all(l)
            .then(function (d) {
              Xy(d, function () {
                r("active"),
                  r("complete"),
                  a("pending"),
                  "function" == typeof t && t(),
                  c(),
                  C();
              });
            })
            .catch(function (d) {
              c(), f(d);
            });
        });
      }
      function Br2(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        tH(e).then(function (n) {
          n && Xy([n], t);
        });
      }
      var jr2 = function (t) {
          var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            r = n.transform,
            a = void 0 === r ? K3 : r,
            i = n.symbol,
            o = void 0 !== i && i,
            s = n.mask,
            c = void 0 === s ? null : s,
            l = n.maskId,
            C = void 0 === l ? null : l,
            f = n.title,
            d = void 0 === f ? null : f,
            g = n.titleId,
            y = void 0 === g ? null : g,
            x = n.classes,
            F = void 0 === x ? [] : x,
            k = n.attributes,
            O = void 0 === k ? {} : k,
            A = n.styles,
            q = void 0 === A ? {} : A;
          if (t) {
            var n2 = t.prefix,
              w2 = t.iconName,
              n3 = t.icon;
            return vt(K({ type: "icon" }, t), function () {
              return (
                f6("beforeDOMElementCreation", {
                  iconDefinition: t,
                  params: n,
                }),
                Z.autoA11y &&
                  (d
                    ? (O["aria-labelledby"] = ""
                        .concat(Z.replacementClass, "-title-")
                        .concat(y || Oe()))
                    : ((O["aria-hidden"] = "true"), (O.focusable = "false"))),
                Wa({
                  icons: {
                    main: Ka(n3),
                    mask: c
                      ? Ka(c.icon)
                      : { found: !1, width: null, height: null, icon: {} },
                  },
                  prefix: n2,
                  iconName: w2,
                  transform: K(K({}, K3), a),
                  symbol: o,
                  title: d,
                  maskId: C,
                  titleId: y,
                  extra: { attributes: O, styles: q, classes: F },
                })
              );
            });
          }
        },
        $r2 = {
          mixout: function () {
            return {
              icon:
                ((e = jr2),
                function (t) {
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = (t || {}).icon ? t : qa(t || {}),
                    a = n.mask;
                  return (
                    a && (a = (a || {}).icon ? a : qa(a || {})),
                    e(r, K(K({}, n), {}, { mask: a }))
                  );
                }),
            };
            var e;
          },
          hooks: function () {
            return {
              mutationObserverCallbacks: function (n) {
                return (n.treeCallback = nH), (n.nodeCallback = Br2), n;
              },
            };
          },
          provides: function (t) {
            (t.i2svg = function (n) {
              var r = n.node,
                i = n.callback;
              return nH(
                void 0 === r ? $2 : r,
                void 0 === i ? function () {} : i
              );
            }),
              (t.generateSvgReplacementMutation = function (n, r) {
                var a = r.iconName,
                  i = r.title,
                  o = r.titleId,
                  s = r.prefix,
                  c = r.transform,
                  l = r.symbol,
                  C = r.mask,
                  f = r.maskId,
                  d = r.extra;
                return new Promise(function (g, y) {
                  Promise.all([
                    Qa(a, s),
                    C.iconName
                      ? Qa(C.iconName, C.prefix)
                      : Promise.resolve({
                          found: !1,
                          width: 512,
                          height: 512,
                          icon: {},
                        }),
                  ])
                    .then(function (x) {
                      var F = Da(x, 2);
                      g([
                        n,
                        Wa({
                          icons: { main: F[0], mask: F[1] },
                          prefix: s,
                          iconName: a,
                          transform: c,
                          symbol: l,
                          maskId: f,
                          title: i,
                          titleId: o,
                          extra: d,
                          watchable: !0,
                        }),
                      ]);
                    })
                    .catch(y);
                });
              }),
              (t.generateAbstractIcon = function (n) {
                var l,
                  r = n.children,
                  a = n.attributes,
                  i = n.main,
                  o = n.transform,
                  c = ht(n.styles);
                return (
                  c.length > 0 && (a.style = c),
                  Ia(o) &&
                    (l = v4("generateAbstractTransformGrouping", {
                      main: i,
                      transform: o,
                      containerWidth: i.width,
                      iconWidth: i.width,
                    })),
                  r.push(l || i.icon),
                  { children: r, attributes: a }
                );
              });
          },
        },
        Gr2 = {
          mixout: function () {
            return {
              layer: function (n) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  a = r.classes,
                  i = void 0 === a ? [] : a;
                return vt({ type: "layer" }, function () {
                  f6("beforeDOMElementCreation", { assembler: n, params: r });
                  var o = [];
                  return (
                    n(function (s) {
                      Array.isArray(s)
                        ? s.map(function (c) {
                            o = o.concat(c.abstract);
                          })
                        : (o = o.concat(s.abstract));
                    }),
                    [
                      {
                        tag: "span",
                        attributes: {
                          class: ["".concat(Z.familyPrefix, "-layers")]
                            .concat(Ct(i))
                            .join(" "),
                        },
                        children: o,
                      },
                    ]
                  );
                });
              },
            };
          },
        },
        qr2 = {
          mixout: function () {
            return {
              counter: function (n) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  a = r.title,
                  i = void 0 === a ? null : a,
                  o = r.classes,
                  s = void 0 === o ? [] : o,
                  c = r.attributes,
                  l = void 0 === c ? {} : c,
                  C = r.styles,
                  f = void 0 === C ? {} : C;
                return vt({ type: "counter", content: n }, function () {
                  return (
                    f6("beforeDOMElementCreation", { content: n, params: r }),
                    wr2({
                      content: n.toString(),
                      title: i,
                      extra: {
                        attributes: l,
                        styles: f,
                        classes: [
                          "".concat(Z.familyPrefix, "-layers-counter"),
                        ].concat(Ct(s)),
                      },
                    })
                  );
                });
              },
            };
          },
        },
        Wr2 = {
          mixout: function () {
            return {
              text: function (n) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  a = r.transform,
                  i = void 0 === a ? K3 : a,
                  o = r.title,
                  s = void 0 === o ? null : o,
                  c = r.classes,
                  l = void 0 === c ? [] : c,
                  C = r.attributes,
                  f = void 0 === C ? {} : C,
                  d = r.styles,
                  g = void 0 === d ? {} : d;
                return vt({ type: "text", content: n }, function () {
                  return (
                    f6("beforeDOMElementCreation", { content: n, params: r }),
                    Gy({
                      content: n,
                      transform: K(K({}, K3), i),
                      title: s,
                      extra: {
                        attributes: f,
                        styles: g,
                        classes: [
                          "".concat(Z.familyPrefix, "-layers-text"),
                        ].concat(Ct(l)),
                      },
                    })
                  );
                });
              },
            };
          },
          provides: function (t) {
            t.generateLayersText = function (n, r) {
              var a = r.title,
                i = r.transform,
                o = r.extra,
                s = null,
                c = null;
              if (Vy) {
                var l = parseInt(getComputedStyle(n).fontSize, 10),
                  C = n.getBoundingClientRect();
                (s = C.width / l), (c = C.height / l);
              }
              return (
                Z.autoA11y && !a && (o.attributes["aria-hidden"] = "true"),
                Promise.resolve([
                  n,
                  Gy({
                    content: n.innerHTML,
                    width: s,
                    height: c,
                    transform: i,
                    title: a,
                    extra: o,
                    watchable: !0,
                  }),
                ])
              );
            };
          },
        },
        Yr2 = new RegExp('"', "ug"),
        rH = [1105920, 1112319];
      function aH(e, t) {
        var n = ""
          .concat("data-fa-pseudo-element-pending")
          .concat(t.replace(":", "-"));
        return new Promise(function (r, a) {
          if (null !== e.getAttribute(n)) return r();
          var o = l5(e.children).filter(function (w2) {
              return w2.getAttribute(Aa) === t;
            })[0],
            s = F4.getComputedStyle(e, t),
            c = s.getPropertyValue("font-family").match(B72),
            l = s.getPropertyValue("font-weight"),
            C = s.getPropertyValue("content");
          if (o && !c) return e.removeChild(o), r();
          if (c && "none" !== C && "" !== C) {
            var f = s.getPropertyValue("content"),
              d = ~[
                "Solid",
                "Regular",
                "Light",
                "Thin",
                "Duotone",
                "Brands",
                "Kit",
              ].indexOf(c[2])
                ? ut[c[2].toLowerCase()]
                : U72[l],
              g = (function Kr2(e) {
                var t = e.replace(Yr2, ""),
                  n = (function cr2(e, t) {
                    var a,
                      n = e.length,
                      r = e.charCodeAt(t);
                    return r >= 55296 &&
                      r <= 56319 &&
                      n > t + 1 &&
                      (a = e.charCodeAt(t + 1)) >= 56320 &&
                      a <= 57343
                      ? 1024 * (r - 55296) + a - 56320 + 65536
                      : r;
                  })(t, 0),
                  r = n >= rH[0] && n <= rH[1],
                  a = 2 === t.length && t[0] === t[1];
                return { value: Oa(a ? t[0] : t), isSecondary: r || a };
              })(f),
              y = g.value,
              x = g.isSecondary,
              F = c[0].startsWith("FontAwesome"),
              k = ja(d, y),
              O = k;
            if (F) {
              var A = (function pr2(e) {
                var t = Ry[e],
                  n = ja("fas", e);
                return (
                  t ||
                  (n ? { prefix: "fas", iconName: n } : null) || {
                    prefix: null,
                    iconName: null,
                  }
                );
              })(y);
              A.iconName && A.prefix && ((k = A.iconName), (d = A.prefix));
            }
            if (
              !k ||
              x ||
              (o && o.getAttribute(Ea) === d && o.getAttribute(ka) === O)
            )
              r();
            else {
              e.setAttribute(n, O), o && e.removeChild(o);
              var q = (function Rr2() {
                  return {
                    iconName: null,
                    title: null,
                    titleId: null,
                    prefix: null,
                    transform: K3,
                    symbol: !1,
                    mask: { iconName: null, prefix: null, rest: [] },
                    maskId: null,
                    extra: { classes: [], styles: {}, attributes: {} },
                  };
                })(),
                n2 = q.extra;
              (n2.attributes[Aa] = t),
                Qa(k, d)
                  .then(function (w2) {
                    var n3 = Wa(
                        K(
                          K({}, q),
                          {},
                          {
                            icons: {
                              main: w2,
                              mask: { prefix: null, iconName: null, rest: [] },
                            },
                            prefix: d,
                            iconName: O,
                            extra: n2,
                            watchable: !0,
                          }
                        )
                      ),
                      L4 = $2.createElement("svg");
                    "::before" === t
                      ? e.insertBefore(L4, e.firstChild)
                      : e.appendChild(L4),
                      (L4.outerHTML = n3
                        .map(function (Q3) {
                          return Be(Q3);
                        })
                        .join("\n")),
                      e.removeAttribute(n),
                      r();
                  })
                  .catch(a);
            }
          } else r();
        });
      }
      function Qr2(e) {
        return Promise.all([aH(e, "::before"), aH(e, "::after")]);
      }
      function Xr2(e) {
        return !(
          e.parentNode === document.head ||
          ~P72.indexOf(e.tagName.toUpperCase()) ||
          e.getAttribute(Aa) ||
          (e.parentNode && "svg" === e.parentNode.tagName)
        );
      }
      function iH(e) {
        if (p4)
          return new Promise(function (t, n) {
            var r = l5(e.querySelectorAll("*")).filter(Xr2).map(Qr2),
              a = Ja_begin("searchPseudoElements");
            Jy(),
              Promise.all(r)
                .then(function () {
                  a(), ei(), t();
                })
                .catch(function () {
                  a(), ei(), n();
                });
          });
      }
      var oH = !1,
        sH = function (t) {
          return t
            .toLowerCase()
            .split(" ")
            .reduce(
              function (r, a) {
                var i = a.toLowerCase().split("-"),
                  o = i[0],
                  s = i.slice(1).join("-");
                if (o && "h" === s) return (r.flipX = !0), r;
                if (o && "v" === s) return (r.flipY = !0), r;
                if (((s = parseFloat(s)), isNaN(s))) return r;
                switch (o) {
                  case "grow":
                    r.size = r.size + s;
                    break;
                  case "shrink":
                    r.size = r.size - s;
                    break;
                  case "left":
                    r.x = r.x - s;
                    break;
                  case "right":
                    r.x = r.x + s;
                    break;
                  case "up":
                    r.y = r.y - s;
                    break;
                  case "down":
                    r.y = r.y + s;
                    break;
                  case "rotate":
                    r.rotate = r.rotate + s;
                }
                return r;
              },
              { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 }
            );
        },
        ti = { x: 0, y: 0, width: "100%", height: "100%" };
      function cH(e) {
        var t =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return (
          e.attributes &&
            (e.attributes.fill || t) &&
            (e.attributes.fill = "black"),
          e
        );
      }
      !(function vr2(e, t) {
        var n = t.mixoutsTo;
        (jy = e),
          (f5 = {}),
          Object.keys(u5).forEach(function (r) {
            -1 === gr2.indexOf(r) && delete u5[r];
          }),
          jy.forEach(function (r) {
            var a = r.mixout ? r.mixout() : {};
            if (
              (Object.keys(a).forEach(function (o) {
                "function" == typeof a[o] && (n[o] = a[o]),
                  "object" === ct(a[o]) &&
                    Object.keys(a[o]).forEach(function (s) {
                      n[o] || (n[o] = {}), (n[o][s] = a[o][s]);
                    });
              }),
              r.hooks)
            ) {
              var i = r.hooks();
              Object.keys(i).forEach(function (o) {
                f5[o] || (f5[o] = []), f5[o].push(i[o]);
              });
            }
            r.provides && r.provides(u5);
          });
      })(
        [
          rr2,
          $r2,
          Gr2,
          qr2,
          Wr2,
          {
            hooks: function () {
              return {
                mutationObserverCallbacks: function (n) {
                  return (n.pseudoElementsCallback = iH), n;
                },
              };
            },
            provides: function (t) {
              t.pseudoElements2svg = function (n) {
                var r = n.node;
                Z.searchPseudoElements && iH(void 0 === r ? $2 : r);
              };
            },
          },
          {
            mixout: function () {
              return {
                dom: {
                  unwatch: function () {
                    Jy(), (oH = !0);
                  },
                },
              };
            },
            hooks: function () {
              return {
                bootstrap: function () {
                  Zy(Ga("mutationObserverCallbacks", {}));
                },
                noAuto: function () {
                  !(function Tr2() {
                    !Vt || Vt.disconnect();
                  })();
                },
                watch: function (n) {
                  var r = n.observeMutationsRoot;
                  oH
                    ? ei()
                    : Zy(
                        Ga("mutationObserverCallbacks", {
                          observeMutationsRoot: r,
                        })
                      );
                },
              };
            },
          },
          {
            mixout: function () {
              return {
                parse: {
                  transform: function (n) {
                    return sH(n);
                  },
                },
              };
            },
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var a = r.getAttribute("data-fa-transform");
                  return a && (n.transform = sH(a)), n;
                },
              };
            },
            provides: function (t) {
              t.generateAbstractTransformGrouping = function (n) {
                var r = n.main,
                  a = n.transform,
                  o = n.iconWidth,
                  s = {
                    transform: "translate(".concat(
                      n.containerWidth / 2,
                      " 256)"
                    ),
                  },
                  c = "translate("
                    .concat(32 * a.x, ", ")
                    .concat(32 * a.y, ") "),
                  l = "scale("
                    .concat((a.size / 16) * (a.flipX ? -1 : 1), ", ")
                    .concat((a.size / 16) * (a.flipY ? -1 : 1), ") "),
                  C = "rotate(".concat(a.rotate, " 0 0)"),
                  g = {
                    outer: s,
                    inner: {
                      transform: "".concat(c, " ").concat(l, " ").concat(C),
                    },
                    path: {
                      transform: "translate(".concat((o / 2) * -1, " -256)"),
                    },
                  };
                return {
                  tag: "g",
                  attributes: K({}, g.outer),
                  children: [
                    {
                      tag: "g",
                      attributes: K({}, g.inner),
                      children: [
                        {
                          tag: r.icon.tag,
                          children: r.icon.children,
                          attributes: K(K({}, r.icon.attributes), g.path),
                        },
                      ],
                    },
                  ],
                };
              };
            },
          },
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var a = r.getAttribute("data-fa-mask"),
                    i = a
                      ? gt(
                          a.split(" ").map(function (o) {
                            return o.trim();
                          })
                        )
                      : { prefix: null, iconName: null, rest: [] };
                  return (
                    i.prefix || (i.prefix = P4()),
                    (n.mask = i),
                    (n.maskId = r.getAttribute("data-fa-mask-id")),
                    n
                  );
                },
              };
            },
            provides: function (t) {
              t.generateAbstractMask = function (n) {
                var e,
                  r = n.children,
                  a = n.attributes,
                  i = n.main,
                  o = n.mask,
                  s = n.maskId,
                  C = i.icon,
                  d = o.icon,
                  g = (function er2(e) {
                    var t = e.transform,
                      r = e.iconWidth,
                      a = {
                        transform: "translate(".concat(
                          e.containerWidth / 2,
                          " 256)"
                        ),
                      },
                      i = "translate("
                        .concat(32 * t.x, ", ")
                        .concat(32 * t.y, ") "),
                      o = "scale("
                        .concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
                        .concat((t.size / 16) * (t.flipY ? -1 : 1), ") "),
                      s = "rotate(".concat(t.rotate, " 0 0)");
                    return {
                      outer: a,
                      inner: {
                        transform: "".concat(i, " ").concat(o, " ").concat(s),
                      },
                      path: {
                        transform: "translate(".concat((r / 2) * -1, " -256)"),
                      },
                    };
                  })({
                    transform: n.transform,
                    containerWidth: o.width,
                    iconWidth: i.width,
                  }),
                  y = {
                    tag: "rect",
                    attributes: K(K({}, ti), {}, { fill: "white" }),
                  },
                  x = C.children ? { children: C.children.map(cH) } : {},
                  F = {
                    tag: "g",
                    attributes: K({}, g.inner),
                    children: [
                      cH(
                        K(
                          {
                            tag: C.tag,
                            attributes: K(K({}, C.attributes), g.path),
                          },
                          x
                        )
                      ),
                    ],
                  },
                  k = { tag: "g", attributes: K({}, g.outer), children: [F] },
                  O = "mask-".concat(s || Oe()),
                  A = "clip-".concat(s || Oe()),
                  q = {
                    tag: "mask",
                    attributes: K(
                      K({}, ti),
                      {},
                      {
                        id: O,
                        maskUnits: "userSpaceOnUse",
                        maskContentUnits: "userSpaceOnUse",
                      }
                    ),
                    children: [y, k],
                  },
                  n2 = {
                    tag: "defs",
                    children: [
                      {
                        tag: "clipPath",
                        attributes: { id: A },
                        children: ((e = d), "g" === e.tag ? e.children : [e]),
                      },
                      q,
                    ],
                  };
                return (
                  r.push(n2, {
                    tag: "rect",
                    attributes: K(
                      {
                        fill: "currentColor",
                        "clip-path": "url(#".concat(A, ")"),
                        mask: "url(#".concat(O, ")"),
                      },
                      ti
                    ),
                  }),
                  { children: r, attributes: a }
                );
              };
            },
          },
          {
            provides: function (t) {
              var n = !1;
              F4.matchMedia &&
                (n = F4.matchMedia("(prefers-reduced-motion: reduce)").matches),
                (t.missingIconAbstract = function () {
                  var r = [],
                    a = { fill: "currentColor" },
                    i = {
                      attributeType: "XML",
                      repeatCount: "indefinite",
                      dur: "2s",
                    };
                  r.push({
                    tag: "path",
                    attributes: K(
                      K({}, a),
                      {},
                      {
                        d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
                      }
                    ),
                  });
                  var o = K(K({}, i), {}, { attributeName: "opacity" }),
                    s = {
                      tag: "circle",
                      attributes: K(
                        K({}, a),
                        {},
                        { cx: "256", cy: "364", r: "28" }
                      ),
                      children: [],
                    };
                  return (
                    n ||
                      s.children.push(
                        {
                          tag: "animate",
                          attributes: K(
                            K({}, i),
                            {},
                            { attributeName: "r", values: "28;14;28;28;14;28;" }
                          ),
                        },
                        {
                          tag: "animate",
                          attributes: K(
                            K({}, o),
                            {},
                            { values: "1;0;1;1;0;1;" }
                          ),
                        }
                      ),
                    r.push(s),
                    r.push({
                      tag: "path",
                      attributes: K(
                        K({}, a),
                        {},
                        {
                          opacity: "1",
                          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                        }
                      ),
                      children: n
                        ? []
                        : [
                            {
                              tag: "animate",
                              attributes: K(
                                K({}, o),
                                {},
                                { values: "1;0;0;0;0;1;" }
                              ),
                            },
                          ],
                    }),
                    n ||
                      r.push({
                        tag: "path",
                        attributes: K(
                          K({}, a),
                          {},
                          {
                            opacity: "0",
                            d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                          }
                        ),
                        children: [
                          {
                            tag: "animate",
                            attributes: K(
                              K({}, o),
                              {},
                              { values: "0;0;1;1;0;0;" }
                            ),
                          },
                        ],
                      }),
                    { tag: "g", attributes: { class: "missing" }, children: r }
                  );
                });
            },
          },
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (n, r) {
                  var a = r.getAttribute("data-fa-symbol");
                  return (n.symbol = null !== a && ("" === a || a)), n;
                },
              };
            },
          },
        ],
        { mixoutsTo: t3 }
      );
      var o92 = t3.parse,
        s92 = t3.icon;
      const c92 = ["*"],
        f92 = (e) => {
          const t = {
            "fa-spin": e.spin,
            "fa-pulse": e.pulse,
            "fa-fw": e.fixedWidth,
            "fa-border": e.border,
            "fa-inverse": e.inverse,
            "fa-layers-counter": e.counter,
            "fa-flip-horizontal": "horizontal" === e.flip || "both" === e.flip,
            "fa-flip-vertical": "vertical" === e.flip || "both" === e.flip,
            [`fa-${e.size}`]: null !== e.size,
            [`fa-rotate-${e.rotate}`]: null !== e.rotate,
            [`fa-pull-${e.pull}`]: null !== e.pull,
            [`fa-stack-${e.stackItemSize}`]: null != e.stackItemSize,
          };
          return Object.keys(t)
            .map((n) => (t[n] ? n : null))
            .filter((n) => n);
        };
      let h92 = (() => {
          class e {
            constructor() {
              (this.defaultPrefix = "fas"), (this.fallbackIcon = null);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        p92 = (() => {
          class e {
            constructor() {
              this.definitions = {};
            }
            addIcons(...n) {
              for (const r of n) {
                r.prefix in this.definitions ||
                  (this.definitions[r.prefix] = {}),
                  (this.definitions[r.prefix][r.iconName] = r);
                for (const a of r.icon[2])
                  "string" == typeof a && (this.definitions[r.prefix][a] = r);
              }
            }
            addIconPacks(...n) {
              for (const r of n) {
                const a = Object.keys(r).map((i) => r[i]);
                this.addIcons(...a);
              }
            }
            getIconDefinition(n, r) {
              return n in this.definitions && r in this.definitions[n]
                ? this.definitions[n][r]
                : null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        m92 = (() => {
          class e {
            constructor() {
              this.stackItemSize = "1x";
            }
            ngOnChanges(n) {
              if ("size" in n)
                throw new Error(
                  'fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.'
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = a2({
              type: e,
              selectors: [
                ["fa-icon", "stackItemSize", ""],
                ["fa-duotone-icon", "stackItemSize", ""],
              ],
              inputs: { stackItemSize: "stackItemSize", size: "size" },
              features: [E1],
            })),
            e
          );
        })(),
        g92 = (() => {
          class e {
            constructor(n, r) {
              (this.renderer = n), (this.elementRef = r);
            }
            ngOnInit() {
              this.renderer.addClass(this.elementRef.nativeElement, "fa-stack");
            }
            ngOnChanges(n) {
              "size" in n &&
                (null != n.size.currentValue &&
                  this.renderer.addClass(
                    this.elementRef.nativeElement,
                    `fa-${n.size.currentValue}`
                  ),
                null != n.size.previousValue &&
                  this.renderer.removeClass(
                    this.elementRef.nativeElement,
                    `fa-${n.size.previousValue}`
                  ));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T($3), T(j1));
            }),
            (e.ɵcmp = k3({
              type: e,
              selectors: [["fa-stack"]],
              inputs: { size: "size" },
              features: [E1],
              ngContentSelectors: c92,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n &&
                  ((function rl(e) {
                    const t = I()[16][6];
                    if (!t.projection) {
                      const r = (t.projection = x5(e ? e.length : 1, null)),
                        a = r.slice();
                      let i = t.child;
                      for (; null !== i; ) {
                        const o = e ? WD(i, e) : 0;
                        null !== o &&
                          (a[o] ? (a[o].projectionNext = i) : (r[o] = i),
                          (a[o] = i)),
                          (i = i.next);
                      }
                    }
                  })(),
                  (function al(e, t = 0, n) {
                    const r = I(),
                      a = z2(),
                      i = T6(a, 22 + e, 16, null, n || null);
                    null === i.projection && (i.projection = t),
                      Yt(),
                      64 != (64 & i.flags) &&
                        (function Kb(e, t, n) {
                          ys(
                            t[11],
                            0,
                            t,
                            n,
                            fs(e, n, t),
                            ms(n.parent || t[6], n, t)
                          );
                        })(a, r, i);
                  })(0));
              },
              encapsulation: 2,
            })),
            e
          );
        })(),
        lH = (() => {
          class e {
            constructor(n, r, a, i, o) {
              (this.sanitizer = n),
                (this.config = r),
                (this.iconLibrary = a),
                (this.stackItem = i),
                (this.classes = []),
                null != o &&
                  null == i &&
                  console.error(
                    'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.'
                  );
            }
            ngOnChanges(n) {
              if (null == this.icon && null == this.config.fallbackIcon)
                return (() => {
                  throw new Error(
                    "Property `icon` is required for `fa-icon`/`fa-duotone-icon` components."
                  );
                })();
              let r = null;
              if (((r = this.icon ?? this.config.fallbackIcon), n)) {
                const a = this.findIconDefinition(r);
                if (null != a) {
                  const i = this.buildParams();
                  this.renderIcon(a, i);
                }
              }
            }
            render() {
              this.ngOnChanges({});
            }
            findIconDefinition(n) {
              const r = ((e, t) =>
                ((e) => void 0 !== e.prefix && void 0 !== e.iconName)(e)
                  ? e
                  : Array.isArray(e) && 2 === e.length
                  ? { prefix: e[0], iconName: e[1] }
                  : "string" == typeof e
                  ? { prefix: t, iconName: e }
                  : void 0)(n, this.config.defaultPrefix);
              return "icon" in r
                ? r
                : this.iconLibrary.getIconDefinition(r.prefix, r.iconName) ??
                    (((e) => {
                      throw new Error(
                        `Could not find icon with iconName=${e.iconName} and prefix=${e.prefix} in the icon library.`
                      );
                    })(r),
                    null);
            }
            buildParams() {
              const n = {
                  flip: this.flip,
                  spin: this.spin,
                  pulse: this.pulse,
                  border: this.border,
                  inverse: this.inverse,
                  size: this.size || null,
                  pull: this.pull || null,
                  rotate: this.rotate || null,
                  fixedWidth:
                    "boolean" == typeof this.fixedWidth
                      ? this.fixedWidth
                      : this.config.fixedWidth,
                  stackItemSize:
                    null != this.stackItem
                      ? this.stackItem.stackItemSize
                      : null,
                },
                r =
                  "string" == typeof this.transform
                    ? o92.transform(this.transform)
                    : this.transform;
              return {
                title: this.title,
                transform: r,
                classes: [...f92(n), ...this.classes],
                mask:
                  null != this.mask ? this.findIconDefinition(this.mask) : null,
                styles: null != this.styles ? this.styles : {},
                symbol: this.symbol,
                attributes: { role: this.a11yRole },
              };
            }
            renderIcon(n, r) {
              const a = s92(n, r);
              this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(
                a.html.join("\n")
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Lu), T(h92), T(p92), T(m92, 8), T(g92, 8));
            }),
            (e.ɵcmp = k3({
              type: e,
              selectors: [["fa-icon"]],
              hostAttrs: [1, "ng-fa-icon"],
              hostVars: 2,
              hostBindings: function (n, r) {
                2 & n &&
                  (S7("innerHTML", r.renderedIconHTML, Ko),
                  v3("title", r.title));
              },
              inputs: {
                icon: "icon",
                title: "title",
                spin: "spin",
                pulse: "pulse",
                mask: "mask",
                styles: "styles",
                flip: "flip",
                size: "size",
                pull: "pull",
                border: "border",
                inverse: "inverse",
                symbol: "symbol",
                rotate: "rotate",
                fixedWidth: "fixedWidth",
                classes: "classes",
                transform: "transform",
                a11yRole: "a11yRole",
              },
              features: [E1],
              decls: 0,
              vars: 0,
              template: function (n, r) {},
              encapsulation: 2,
            })),
            e
          );
        })(),
        v92 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({})),
            e
          );
        })(),
        CH = (() => {
          class e {
            constructor(n) {
              (this.chatService = n),
                (this.participantsMessage = ""),
                (this.faArrowRightFromBracket = d9),
                (this.addParticipantsMessage = (r) => {
                  let a = "";
                  (a +=
                    1 === r.numUsers
                      ? "There's 1 participant"
                      : "There are " + r.numUsers + " participants"),
                    (this.participantsMessage = a);
                });
            }
            ngOnInit() {
              this.getMessage("user joined", (n) => {
                this.addParticipantsMessage(n);
              }),
                this.getMessage("user left", (n) => {
                  this.addParticipantsMessage(n);
                }),
                this.getMessage("login", (n) => this.addParticipantsMessage(n));
            }
            getMessage(n, r) {
              this.chatService.getMessage(n).subscribe((a) => r(a));
            }
            getUsername() {
              return this.chatService.getUsername();
            }
            logout() {
              this.chatService.logout();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ie));
            }),
            (e.ɵcmp = k3({
              type: e,
              selectors: [["app-top-bar-component"]],
              decls: 12,
              vars: 3,
              consts: [
                [1, "topBar"],
                [1, "logo"],
                [
                  "src",
                  "./assets/logo.png",
                  "alt",
                  "logo",
                ],
                [1, "info"],
                [3, "click"],
                [3, "icon"],
              ],
              template: function (n, r) {
                1 & n &&
                  (k2(0, "div", 0)(1, "div", 1)(2, "h1"),
                  d1(3, "Chat-app"),
                  _2(),
                  M3(4, "img", 2),
                  _2(),
                  k2(5, "div", 3)(6, "p"),
                  d1(7),
                  _2(),
                  k2(8, "p"),
                  d1(9),
                  _2()(),
                  k2(10, "button", 4),
                  Y2("click", function () {
                    return r.logout();
                  }),
                  M3(11, "fa-icon", 5),
                  _2()()),
                  2 & n &&
                    (f1(7),
                    Y5("User: ", r.getUsername(), ""),
                    f1(2),
                    j3(r.participantsMessage),
                    f1(2),
                    s3("icon", r.faArrowRightFromBracket));
              },
              dependencies: [lH],
              styles: [
                ".topBar[_ngcontent-%COMP%]{flex-wrap:wrap;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;width:100vw;font-size:1.5rem;color:#fff;background-color:#1b364e;padding:1rem}.topBar[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center;height:4.5rem;margin-left:1rem}.topBar[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:4.5rem}.topBar[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{flex-grow:1;padding-left:1rem;margin-left:1rem;border-left:2px solid white}.topBar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:4rem;height:4rem;border:none;border-radius:50%;cursor:pointer;color:#fff;font-size:1.4rem;background-color:#3cb1ff}.topBar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{filter:brightness(120%)}@media screen and (max-width: 700px){.topBar[_ngcontent-%COMP%]{font-size:1.1rem}.topBar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem}}@media screen and (max-width: 520px){.topBar[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{justify-content:flex-start;flex-grow:1}.topBar[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:3rem}.topBar[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{display:none}}",
              ],
            })),
            e
          );
        })();
      function M92(e, t) {
        if (1 & e) {
          const n = (function Jc() {
            return I();
          })();
          k2(0, "div", 5)(1, "div", 6),
            Y2("click", function (a) {
              return M5(n), L5(L3().addEmoji(a));
            }),
            d1(2, "\u{1f600}"),
            _2(),
            k2(3, "div", 6),
            Y2("click", function (a) {
              return M5(n), L5(L3().addEmoji(a));
            }),
            d1(4, "\u{1f601}"),
            _2(),
            k2(5, "div", 6),
            Y2("click", function (a) {
              return M5(n), L5(L3().addEmoji(a));
            }),
            d1(6, "\u{1f618}"),
            _2(),
            k2(7, "div", 6),
            Y2("click", function (a) {
              return M5(n), L5(L3().addEmoji(a));
            }),
            d1(8, "\u{1f923}"),
            _2()();
        }
      }
      let fH = (() => {
        class e {
          constructor(n, r) {
            (this.formBuilder = n),
              (this.chatService = r),
              (this.inputMsgForm = this.formBuilder.group({
                inputMessage: "",
              })),
              (this.faPaperPlane = Vv),
              (this.faFaceSmile = b9),
              (this.emojisActive = !1);
          }
          ngOnInit() {}
          onSubmit() {
            (this.emojisActive = !1),
              this.inputMsgForm.value.inputMessage &&
                (this.chatService.addToMessageArray({
                  username: this.chatService.getUsername(),
                  message: this.inputMsgForm.value.inputMessage,
                  type: "msg",
                }),
                this.chatService.sendMessage(
                  "new message",
                  this.inputMsgForm.value.inputMessage
                ),
                this.inputMsgForm.setValue({ inputMessage: "" }),
                this.scrollDownChatList());
          }
          scrollDownChatList() {
            let n = document.getElementsByClassName("messages")[0];
            setTimeout(() => {
              n.scroll({ top: n.scrollHeight, behavior: "smooth" });
            }, 500);
          }
          addEmoji(n) {
            this.inputMsgForm.setValue({
              inputMessage:
                this.inputMsgForm.value.inputMessage + n.target.innerHTML,
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Td), T(Ie));
          }),
          (e.ɵcmp = k3({
            type: e,
            selectors: [["app-chat-form-component"]],
            decls: 7,
            vars: 4,
            consts: [
              [3, "formGroup", "ngSubmit"],
              [
                "placeholder",
                "Type here...",
                "formControlName",
                "inputMessage",
                1,
                "inputMessage",
                3,
                "click",
              ],
              [1, "btn", 3, "click"],
              [3, "icon"],
              ["class", "emojis", 4, "ngIf"],
              [1, "emojis"],
              [1, "emoji", 3, "click"],
            ],
            template: function (n, r) {
              1 & n &&
                (k2(0, "form", 0),
                Y2("ngSubmit", function () {
                  return r.onSubmit();
                }),
                k2(1, "input", 1),
                Y2("click", function () {
                  return (r.emojisActive = !1);
                }),
                _2(),
                k2(2, "div", 2),
                Y2("click", function () {
                  return (r.emojisActive = !r.emojisActive);
                }),
                M3(3, "fa-icon", 3),
                _2(),
                k2(4, "button"),
                M3(5, "fa-icon", 3),
                _2(),
                S4(6, M92, 9, 0, "div", 4),
                _2()),
                2 & n &&
                  (s3("formGroup", r.inputMsgForm),
                  f1(3),
                  s3("icon", r.faFaceSmile),
                  f1(2),
                  s3("icon", r.faPaperPlane),
                  f1(1),
                  s3("ngIf", r.emojisActive));
            },
            dependencies: [wr, Jr, ue, Br, Ur, ve, _0, lH],
            styles: [
              "form[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center;border-radius:1rem;background-color:#1b364e;width:99vw;margin:.5vw;padding:.5rem;color:#fff}form[_ngcontent-%COMP%]   .inputMessage[_ngcontent-%COMP%]{flex-grow:1;border:none;font-size:1.5rem;background-color:#1b364e}form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:1rem;outline:none;color:#fff}form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;width:3.4rem;min-width:3.4rem;height:3.4rem;border-radius:50%;color:#fff;font-size:1.4rem;margin-left:1rem;background-color:#0084ff}form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{filter:brightness(120%)}form[_ngcontent-%COMP%]   .emojis[_ngcontent-%COMP%]{position:absolute;top:-6rem;right:1rem;height:5rem;width:15rem;z-index:100;border:#0084ff 4px solid;border-radius:1rem;background-color:#fff;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-evenly}form[_ngcontent-%COMP%]   .emojis[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:3rem;height:3rem;font-size:2rem;background-color:#f5f5f5}form[_ngcontent-%COMP%]   .emojis[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%]:hover{filter:brightness(60%);cursor:pointer}@media screen and (max-width: 610px){form[_ngcontent-%COMP%]   .inputMessage[_ngcontent-%COMP%]{font-size:1rem}}@media screen and (max-width: 410px){form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content}form[_ngcontent-%COMP%]   .inputMessage[_ngcontent-%COMP%]{padding:.5rem;font-size:.8rem;width:calc(100% - 8rem)}form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:.2rem}}",
            ],
          })),
          e
        );
      })();
      function L92(e, t) {
        if (
          (1 & e &&
            (W6(0),
            k2(1, "li", 8)(2, "span", 9),
            d1(3),
            _2(),
            k2(4, "span", 10),
            d1(5),
            _2()(),
            Y6()),
          2 & e)
        ) {
          const n = L3(2).$implicit;
          f1(3), j3(n.username), f1(2), j3(n.message);
        }
      }
      function V92(e, t) {
        if (
          (1 & e &&
            (k2(0, "li", 11)(1, "span", 12),
            d1(2),
            _2(),
            k2(3, "span", 13),
            d1(4),
            _2()()),
          2 & e)
        ) {
          const n = L3(2).$implicit;
          f1(2), j3(n.username), f1(2), j3(n.message);
        }
      }
      function y92(e, t) {
        if (
          (1 & e &&
            (W6(0),
            S4(1, L92, 6, 2, "ng-container", 5),
            S4(2, V92, 5, 2, "ng-template", null, 7, W7),
            Y6()),
          2 & e)
        ) {
          const n = L7(3),
            r = L3().$implicit,
            a = L3();
          f1(1), s3("ngIf", r.username == a.getUsername())("ngIfElse", n);
        }
      }
      function H92(e, t) {
        if (
          (1 & e &&
            (k2(0, "li", 2)(1, "span", 12),
            d1(2),
            _2(),
            k2(3, "span", 13),
            d1(4),
            _2()()),
          2 & e)
        ) {
          const n = L3().$implicit;
          f1(2), j3(n.username), f1(2), j3(n.message);
        }
      }
      function z92(e, t) {
        if (
          (1 & e &&
            (W6(0),
            S4(1, y92, 4, 2, "ng-container", 5),
            S4(2, H92, 5, 2, "ng-template", null, 6, W7),
            Y6()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = L7(3);
          f1(1), s3("ngIf", "msg" === n.type)("ngIfElse", r);
        }
      }
      function w92(e, t) {
        if (
          (1 & e &&
            (k2(0, "li", 14)(1, "span", 12),
            d1(2),
            _2(),
            k2(3, "span", 13),
            d1(4, "..."),
            _2()()),
          2 & e)
        ) {
          const n = L3();
          f1(2), j3(n.typingUser);
        }
      }
      let b92 = (() => {
        class e {
          constructor(n) {
            (this.chatService = n),
              (this.typingUser = null),
              this.chatService.socket.connect(),
              this.chatService.sendMessage("connect", this.getUsername()),
              this.chatService.sendMessage("add user", this.getUsername());
          }
          ngOnInit() {
            this.getMessage("new message", (n) => {
              this.chatService.addToMessageArray({
                username: n.username,
                message: n.message,
                type: "msg",
              }),
                this.scrollDownChatList();
            }),
              this.getMessage("user joined", (n) => {
                this.chatService.addToMessageArray({
                  username: n.username,
                  message: " joined",
                  type: "log",
                });
              }),
              this.getMessage("user left", (n) => {
                this.chatService.addToMessageArray({
                  username: n.username,
                  message: " left",
                  type: "log",
                });
              }),
              this.getMessage("typing", (n) => {
                (this.typingUser = n.username), this.scrollDownChatList();
              }),
              this.getMessage("stop typing", () => (this.typingUser = null));
          }
          getMessage(n, r) {
            this.chatService.getMessage(n).subscribe((a) => r(a));
          }
          getUsername() {
            return this.chatService.getUsername();
          }
          startTyping() {
            this.chatService.sendMessage("typing", "");
          }
          stopTyping() {
            this.chatService.sendMessage("stop typing", "");
          }
          scrollDownChatList() {
            let n = document.getElementsByClassName("messages")[0];
            setTimeout(() => {
              n.scroll({ top: n.scrollHeight, behavior: "smooth" });
            }, 500);
          }
          getMessageArray() {
            return this.chatService.getMessageArray();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Ie));
          }),
          (e.ɵcmp = k3({
            type: e,
            selectors: [["app-chat-component"]],
            decls: 8,
            vars: 3,
            consts: [
              [1, "chatArea"],
              [1, "messages"],
              [1, "log"],
              [4, "ngFor", "ngForOf"],
              ["class", "message typing", 4, "ngIf"],
              [4, "ngIf", "ngIfElse"],
              ["logTmp", ""],
              ["elseTemplate", ""],
              [1, "message", "right"],
              [1, "username", "right"],
              [1, "messageBody", "right"],
              [1, "message"],
              [1, "username"],
              [1, "messageBody"],
              [1, "message", "typing"],
            ],
            template: function (n, r) {
              1 & n &&
                (k2(0, "div", 0),
                M3(1, "app-top-bar-component"),
                k2(2, "ul", 1)(3, "li", 2),
                d1(4),
                _2(),
                S4(5, z92, 4, 2, "ng-container", 3),
                S4(6, w92, 5, 1, "li", 4),
                _2(),
                M3(7, "app-chat-form-component"),
                _2()),
                2 & n &&
                  (f1(4),
                  Y5("Welcome to Socket Chat ", r.getUsername(), ""),
                  f1(1),
                  s3("ngForOf", r.getMessageArray()),
                  f1(1),
                  s3("ngIf", r.typingUser));
            },
            dependencies: [Yf, wr, CH, fH],
            styles: [
              '.chatArea[_ngcontent-%COMP%]{width:100vw;height:100vh;display:flex;align-items:flex-start;justify-content:center;flex-direction:column}.chatArea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}.chatArea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f1f1f1}.chatArea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#0084ff;border-radius:5px}.chatArea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#0067c7}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;list-style:none;word-wrap:break-word;flex-grow:1;padding:1rem;overflow-y:scroll;overflow-x:hidden}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:1rem}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.log[_ngcontent-%COMP%]{color:gray;margin:5px;font-size:1.3rem;text-align:center;width:100%}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.typing[_ngcontent-%COMP%]{filter:blur(60%)}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message.right[_ngcontent-%COMP%]{align-items:flex-end;align-self:flex-end}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]{font-size:1.5rem;display:flex;flex-direction:column;align-items:flex-start;color:#fff;width:50%;min-width:360px}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .username[_ngcontent-%COMP%]{font-weight:700;overflow:hidden;padding-right:15px;color:#58dc00}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .username.right[_ngcontent-%COMP%]{text-align:right;padding:0}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;position:relative;word-wrap:break-word;color:#0067c7;background-color:#fff;border:4px solid #0084ff;padding:1rem;margin-top:1.5rem;border-bottom-left-radius:1rem;border-bottom-right-radius:1rem;border-top-right-radius:1rem;animation:getMessageAnim .6s ease-out}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody[_ngcontent-%COMP%]:before{content:"";width:1.5rem;height:1.5rem;position:absolute;top:calc(-1.5rem - 4px);left:-4px;background-color:#0084ff}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody[_ngcontent-%COMP%]:after{content:"";width:50vw;height:1.5rem;position:absolute;top:calc(-1.5rem - 4px);left:-4px;background-color:#fff;border-bottom-left-radius:1.5rem}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody.right[_ngcontent-%COMP%]{border-top-right-radius:0;border-top-left-radius:1rem;color:#fff;background-color:#fff;border:4px solid #0084ff;background-color:#0084ff}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody.right[_ngcontent-%COMP%]:after{top:-1.75rem;left:auto;right:-.2rem;background-color:#fff;border-bottom-left-radius:0;border-bottom-right-radius:1.5rem}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody.right[_ngcontent-%COMP%]:before{top:-1.7rem;left:auto;right:-.2rem}@keyframes getMessageAnim{0%{width:1rem;height:1rem;font-size:0px;color:#0000}20%{font-size:0px}}@media screen and (max-width: 610px){.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.log[_ngcontent-%COMP%]{font-size:1.1rem;margin:3px}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]{font-size:1.3rem;width:90%;min-width:100px}.chatArea[_ngcontent-%COMP%]   ul.messages[_ngcontent-%COMP%]   li.message[_ngcontent-%COMP%]   .messageBody[_ngcontent-%COMP%]{margin-top:1.3rem}}',
            ],
          })),
          e
        );
      })();
      const S92 = ["nameInput"],
        D92 = [
          {
            path: "",
            component: (() => {
              class e {
                constructor(n, r, a) {
                  (this.chatService = n),
                    (this.router = r),
                    (this.formBuilder = a),
                    (this.checkoutForm = this.formBuilder.group({ name: "" }));
                }
                ngOnInit() {}
                ngAfterViewInit() {
                  this.nameInputElement?.nativeElement.focus();
                }
                onBlur() {
                  this.nameInputElement?.nativeElement.focus();
                }
                onSubmit() {
                  this.checkoutForm.value.name &&
                    (this.chatService.setUsername(this.checkoutForm.value.name),
                    this.router.navigate(["/", "chat"]));
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(T(Ie), T(O1), T(Td));
                }),
                (e.ɵcmp = k3({
                  type: e,
                  selectors: [["app-start-component"]],
                  viewQuery: function (n, r) {
                    if ((1 & n && FC(S92, 5), 2 & n)) {
                      let a;
                      q8(
                        (a = (function W8() {
                          return (function wN(e, t) {
                            return e[19].queries[t].queryList;
                          })(I(), ro());
                        })())
                      ) && (r.nameInputElement = a.first);
                    }
                  },
                  decls: 9,
                  vars: 1,
                  consts: [
                    [3, "formGroup", "ngSubmit"],
                    ["type", "text", "formControlName", "name", 3, "blur"],
                    ["nameInput", ""],
                    ["type", "submit"],
                  ],
                  template: function (n, r) {
                    1 & n &&
                      (k2(0, "form", 0),
                      Y2("ngSubmit", function () {
                        return r.onSubmit();
                      }),
                      k2(1, "h1"),
                      d1(2, "Chat-app"),
                      _2(),
                      k2(3, "div")(4, "h2"),
                      d1(5, "What's your nickname?"),
                      _2(),
                      k2(6, "input", 1, 2),
                      Y2("blur", function () {
                        return r.onBlur();
                      }),
                      _2(),
                      M3(8, "input", 3),
                      _2()()),
                      2 & n && s3("formGroup", r.checkoutForm);
                  },
                  dependencies: [Jr, ue, Br, Ur, ve, _0],
                  styles: [
                    "form[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#1b364e;display:flex;align-items:center;justify-content:flex-start;padding-top:30vh;flex-direction:column;color:#fff}form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:5rem;padding-bottom:.5rem;color:#fff;margin-bottom:2rem}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{background-color:#0084ff;width:60vw;border-radius:1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.5rem}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-weight:100;font-size:2rem;margin-bottom:1rem}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{background-color:transparent;border:none;border-bottom:2px solid #fff;outline:none;padding-bottom:15px;text-align:center;width:100%;color:#fff;font-size:2rem}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[type=submit][_ngcontent-%COMP%]{visibility:hidden;height:0;width:0}@media screen and (max-width: 900px){form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:90vw}}@media screen and (max-width: 900px){form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:3rem;text-align:center}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.5rem;text-align:center}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{font-size:1.5rem}}",
                  ],
                })),
                e
              );
            })(),
          },
          { path: "chat", component: b92 },
          { path: "form", component: fH },
          { path: "top", component: CH },
        ];
      let x92 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({ imports: [cy.forRoot(D92), cy] })),
            e
          );
        })(),
        _92 = (() => {
          class e {
            constructor() {
              this.title = "chat-angular-app";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = k3({
              type: e,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && M3(0, "router-outlet");
              },
              dependencies: [ga],
              styles: [
                ".main[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}",
              ],
            })),
            e
          );
        })();
      class uH {}
      class dH {}
      class M4 {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const a = n.slice(0, r),
                                i = a.toLowerCase(),
                                o = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(a, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(o)
                                  : this.headers.set(i, [o]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const a = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(a, r),
                                this.maybeSetNormalizedName(n, a));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof M4
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new M4();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof M4
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const a = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              a.push(...r), this.headers.set(n, a);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let o = this.headers.get(n);
                if (!o) return;
                (o = o.filter((s) => -1 === i.indexOf(s))),
                  0 === o.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, o);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class N92 {
        encodeKey(t) {
          return hH(t);
        }
        encodeValue(t) {
          return hH(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const E92 = /%(\d[a-f0-9])/gi,
        k92 = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function hH(e) {
        return encodeURIComponent(e).replace(E92, (t, n) => k92[n] ?? t);
      }
      function yt(e) {
        return `${e}`;
      }
      class R4 {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new N92()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function A92(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((a) => {
                      const i = a.indexOf("="),
                        [o, s] =
                          -1 == i
                            ? [t.decodeKey(a), ""]
                            : [
                                t.decodeKey(a.slice(0, i)),
                                t.decodeValue(a.slice(i + 1)),
                              ],
                        c = n.get(o) || [];
                      c.push(s), n.set(o, c);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    a = Array.isArray(r) ? r.map(yt) : [yt(r)];
                  this.map.set(n, a);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const a = t[r];
              Array.isArray(a)
                ? a.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: a, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new R4({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(yt(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const a = r.indexOf(yt(t.value));
                      -1 !== a && r.splice(a, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class T92 {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function pH(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function mH(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function gH(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class $e {
        constructor(t, n, r, a) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function F92(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || a
              ? ((this.body = void 0 !== r ? r : null), (i = a))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new M4()),
            this.context || (this.context = new T92()),
            this.params)
          ) {
            const o = this.params.toString();
            if (0 === o.length) this.urlWithParams = n;
            else {
              const s = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === s ? "?" : s < n.length - 1 ? "&" : "") + o;
            }
          } else (this.params = new R4()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : pH(this.body) ||
              mH(this.body) ||
              gH(this.body) ||
              (function I92(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof R4
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || gH(this.body)
            ? null
            : mH(this.body)
            ? this.body.type || null
            : pH(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof R4
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            a = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            o =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            s =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let c = t.headers || this.headers,
            l = t.params || this.params;
          const C = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (c = Object.keys(t.setHeaders).reduce(
                (f, d) => f.set(d, t.setHeaders[d]),
                c
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (f, d) => f.set(d, t.setParams[d]),
                l
              )),
            new $e(n, r, i, {
              params: l,
              headers: c,
              context: C,
              reportProgress: s,
              responseType: a,
              withCredentials: o,
            })
          );
        }
      }
      var s1 = (() => (
        ((s1 = s1 || {})[(s1.Sent = 0)] = "Sent"),
        (s1[(s1.UploadProgress = 1)] = "UploadProgress"),
        (s1[(s1.ResponseHeader = 2)] = "ResponseHeader"),
        (s1[(s1.DownloadProgress = 3)] = "DownloadProgress"),
        (s1[(s1.Response = 4)] = "Response"),
        (s1[(s1.User = 5)] = "User"),
        s1
      ))();
      class ni {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new M4()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class ri extends ni {
        constructor(t = {}) {
          super(t), (this.type = s1.ResponseHeader);
        }
        clone(t = {}) {
          return new ri({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ht extends ni {
        constructor(t = {}) {
          super(t),
            (this.type = s1.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ht({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class vH extends ni {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function ai(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let P92 = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, a = {}) {
            let i;
            if (n instanceof $e) i = n;
            else {
              let c, l;
              (c = a.headers instanceof M4 ? a.headers : new M4(a.headers)),
                a.params &&
                  (l =
                    a.params instanceof R4
                      ? a.params
                      : new R4({ fromObject: a.params })),
                (i = new $e(n, r, void 0 !== a.body ? a.body : null, {
                  headers: c,
                  context: a.context,
                  params: l,
                  reportProgress: a.reportProgress,
                  responseType: a.responseType || "json",
                  withCredentials: a.withCredentials,
                }));
            }
            const o = d2(i).pipe(i5((c) => this.handler.handle(c)));
            if (n instanceof $e || "events" === a.observe) return o;
            const s = o.pipe(r6((c) => c instanceof Ht));
            switch (a.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return s.pipe(
                      S2((c) => {
                        if (null !== c.body && !(c.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return c.body;
                      })
                    );
                  case "blob":
                    return s.pipe(
                      S2((c) => {
                        if (null !== c.body && !(c.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return c.body;
                      })
                    );
                  case "text":
                    return s.pipe(
                      S2((c) => {
                        if (null !== c.body && "string" != typeof c.body)
                          throw new Error("Response is not a string.");
                        return c.body;
                      })
                    );
                  default:
                    return s.pipe(S2((c) => c.body));
                }
              case "response":
                return s;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${a.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new R4().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, a = {}) {
            return this.request("PATCH", n, ai(a, r));
          }
          post(n, r, a = {}) {
            return this.request("POST", n, ai(a, r));
          }
          put(n, r, a = {}) {
            return this.request("PUT", n, ai(a, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(uH));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class MH {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const LH = new s2("HTTP_INTERCEPTORS");
      let R92 = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const O92 = /^\)\]\}',?\n/;
      let VH = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new N2((r) => {
              const a = this.xhrFactory.build();
              if (
                (a.open(n.method, n.urlWithParams),
                n.withCredentials && (a.withCredentials = !0),
                n.headers.forEach((g, y) => a.setRequestHeader(g, y.join(","))),
                n.headers.has("Accept") ||
                  a.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const g = n.detectContentTypeHeader();
                null !== g && a.setRequestHeader("Content-Type", g);
              }
              if (n.responseType) {
                const g = n.responseType.toLowerCase();
                a.responseType = "json" !== g ? g : "text";
              }
              const i = n.serializeBody();
              let o = null;
              const s = () => {
                  if (null !== o) return o;
                  const g = a.statusText || "OK",
                    y = new M4(a.getAllResponseHeaders()),
                    x =
                      (function B92(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(a) || n.url;
                  return (
                    (o = new ri({
                      headers: y,
                      status: a.status,
                      statusText: g,
                      url: x,
                    })),
                    o
                  );
                },
                c = () => {
                  let { headers: g, status: y, statusText: x, url: F } = s(),
                    k = null;
                  204 !== y &&
                    (k = typeof a.response > "u" ? a.responseText : a.response),
                    0 === y && (y = k ? 200 : 0);
                  let O = y >= 200 && y < 300;
                  if ("json" === n.responseType && "string" == typeof k) {
                    const A = k;
                    k = k.replace(O92, "");
                    try {
                      k = "" !== k ? JSON.parse(k) : null;
                    } catch (q) {
                      (k = A), O && ((O = !1), (k = { error: q, text: k }));
                    }
                  }
                  O
                    ? (r.next(
                        new Ht({
                          body: k,
                          headers: g,
                          status: y,
                          statusText: x,
                          url: F || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new vH({
                          error: k,
                          headers: g,
                          status: y,
                          statusText: x,
                          url: F || void 0,
                        })
                      );
                },
                l = (g) => {
                  const { url: y } = s(),
                    x = new vH({
                      error: g,
                      status: a.status || 0,
                      statusText: a.statusText || "Unknown Error",
                      url: y || void 0,
                    });
                  r.error(x);
                };
              let C = !1;
              const f = (g) => {
                  C || (r.next(s()), (C = !0));
                  let y = { type: s1.DownloadProgress, loaded: g.loaded };
                  g.lengthComputable && (y.total = g.total),
                    "text" === n.responseType &&
                      !!a.responseText &&
                      (y.partialText = a.responseText),
                    r.next(y);
                },
                d = (g) => {
                  let y = { type: s1.UploadProgress, loaded: g.loaded };
                  g.lengthComputable && (y.total = g.total), r.next(y);
                };
              return (
                a.addEventListener("load", c),
                a.addEventListener("error", l),
                a.addEventListener("timeout", l),
                a.addEventListener("abort", l),
                n.reportProgress &&
                  (a.addEventListener("progress", f),
                  null !== i &&
                    a.upload &&
                    a.upload.addEventListener("progress", d)),
                a.send(i),
                r.next({ type: s1.Sent }),
                () => {
                  a.removeEventListener("error", l),
                    a.removeEventListener("abort", l),
                    a.removeEventListener("load", c),
                    a.removeEventListener("timeout", l),
                    n.reportProgress &&
                      (a.removeEventListener("progress", f),
                      null !== i &&
                        a.upload &&
                        a.upload.removeEventListener("progress", d)),
                    a.readyState !== a.DONE && a.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(W(tu));
          }),
          (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ii = new s2("XSRF_COOKIE_NAME"),
        oi = new s2("XSRF_HEADER_NAME");
      class yH {}
      let U92 = (() => {
          class e {
            constructor(n, r, a) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = a),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = qf(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(M1), W(er), W(ii));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        si = (() => {
          class e {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const a = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                a.startsWith("http://") ||
                a.startsWith("https://")
              )
                return r.handle(n);
              const i = this.tokenService.getToken();
              return (
                null !== i &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, i) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(yH), W(oi));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        j92 = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(LH, []);
                this.chain = r.reduceRight(
                  (a, i) => new MH(a, i),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(W(dH), W(w1));
            }),
            (e.ɵprov = e2({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        $92 = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: si, useClass: R92 }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: ii, useValue: n.cookieName } : [],
                  n.headerName ? { provide: oi, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({
              providers: [
                si,
                { provide: LH, useExisting: si, multi: !0 },
                { provide: yH, useClass: U92 },
                { provide: ii, useValue: "XSRF-TOKEN" },
                { provide: oi, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        G92 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = x1({ type: e })),
            (e.ɵinj = V1({
              providers: [
                P92,
                { provide: uH, useClass: j92 },
                VH,
                { provide: dH, useExisting: VH },
              ],
              imports: [
                $92.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            e
          );
        })();
      const q92 = { url: "wss://socketio-chat-h9jt.herokuapp.com" };
      let W92 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = x1({ type: e, bootstrap: [_92] })),
          (e.ɵinj = V1({
            providers: [Ie],
            imports: [Sk, x92, Ed, v92, UT, G92, Rk.forRoot(q92)],
          })),
          e
        );
      })();
      (function fA() {
        yf = !1;
      })(),
        bk()
          .bootstrapModule(W92)
          .catch((e) => console.error(e));
    },
    498: (U) => {
      function V() {}
      U.exports = function v(H, N, w) {
        var b = !1;
        return (w = w || V), (_.count = H), 0 === H ? N() : _;
        function _(z, S) {
          if (_.count <= 0) throw new Error("after called too many times");
          --_.count,
            z ? ((b = !0), N(z), (N = w)) : 0 === _.count && !b && N(null, S);
        }
      };
    },
    933: (U) => {
      U.exports = function (v, V, H) {
        var N = v.byteLength;
        if (((V = V || 0), (H = H || N), v.slice)) return v.slice(V, H);
        if (
          (V < 0 && (V += N),
          H < 0 && (H += N),
          H > N && (H = N),
          V >= N || V >= H || 0 === N)
        )
          return new ArrayBuffer(0);
        for (
          var w = new Uint8Array(v), b = new Uint8Array(H - V), _ = V, z = 0;
          _ < H;
          _++, z++
        )
          b[z] = w[_];
        return b.buffer;
      };
    },
    150: (U) => {
      function v(V) {
        (this.ms = (V = V || {}).min || 100),
          (this.max = V.max || 1e4),
          (this.factor = V.factor || 2),
          (this.jitter = V.jitter > 0 && V.jitter <= 1 ? V.jitter : 0),
          (this.attempts = 0);
      }
      (U.exports = v),
        (v.prototype.duration = function () {
          var V = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var H = Math.random(),
              N = Math.floor(H * this.jitter * V);
            V = 0 == (1 & Math.floor(10 * H)) ? V - N : V + N;
          }
          return 0 | Math.min(V, this.max);
        }),
        (v.prototype.reset = function () {
          this.attempts = 0;
        }),
        (v.prototype.setMin = function (V) {
          this.ms = V;
        }),
        (v.prototype.setMax = function (V) {
          this.max = V;
        }),
        (v.prototype.setJitter = function (V) {
          this.jitter = V;
        });
    },
    325: (U) => {
      var v =
          typeof v < "u"
            ? v
            : typeof WebKitBlobBuilder < "u"
            ? WebKitBlobBuilder
            : typeof MSBlobBuilder < "u"
            ? MSBlobBuilder
            : typeof MozBlobBuilder < "u" && MozBlobBuilder,
        V = (function () {
          try {
            return 2 === new Blob(["hi"]).size;
          } catch {
            return !1;
          }
        })(),
        H =
          V &&
          (function () {
            try {
              return 2 === new Blob([new Uint8Array([1, 2])]).size;
            } catch {
              return !1;
            }
          })(),
        N = v && v.prototype.append && v.prototype.getBlob;
      function w(z) {
        return z.map(function (S) {
          if (S.buffer instanceof ArrayBuffer) {
            var h = S.buffer;
            if (S.byteLength !== h.byteLength) {
              var M = new Uint8Array(S.byteLength);
              M.set(new Uint8Array(h, S.byteOffset, S.byteLength)),
                (h = M.buffer);
            }
            return h;
          }
          return S;
        });
      }
      function b(z, S) {
        S = S || {};
        var h = new v();
        return (
          w(z).forEach(function (M) {
            h.append(M);
          }),
          S.type ? h.getBlob(S.type) : h.getBlob()
        );
      }
      function _(z, S) {
        return new Blob(w(z), S || {});
      }
      typeof Blob < "u" &&
        ((b.prototype = Blob.prototype), (_.prototype = Blob.prototype)),
        (U.exports = V ? (H ? Blob : _) : N ? b : void 0);
    },
    213: (U) => {
      var v = [].slice;
      U.exports = function (V, H) {
        if (("string" == typeof H && (H = V[H]), "function" != typeof H))
          throw new Error("bind() requires a function");
        var N = v.call(arguments, 2);
        return function () {
          return H.apply(V, N.concat(v.call(arguments)));
        };
      };
    },
    264: (U) => {
      function v(H) {
        if (H)
          return (function V(H) {
            for (var N in v.prototype) H[N] = v.prototype[N];
            return H;
          })(H);
      }
      (U.exports = v),
        (v.prototype.on = v.prototype.addEventListener =
          function (H, N) {
            return (
              (this._callbacks = this._callbacks || {}),
              (this._callbacks["$" + H] = this._callbacks["$" + H] || []).push(
                N
              ),
              this
            );
          }),
        (v.prototype.once = function (H, N) {
          function w() {
            this.off(H, w), N.apply(this, arguments);
          }
          return (w.fn = N), this.on(H, w), this;
        }),
        (v.prototype.off =
          v.prototype.removeListener =
          v.prototype.removeAllListeners =
          v.prototype.removeEventListener =
            function (H, N) {
              if (
                ((this._callbacks = this._callbacks || {}),
                0 == arguments.length)
              )
                return (this._callbacks = {}), this;
              var w = this._callbacks["$" + H];
              if (!w) return this;
              if (1 == arguments.length)
                return delete this._callbacks["$" + H], this;
              for (var b, _ = 0; _ < w.length; _++)
                if ((b = w[_]) === N || b.fn === N) {
                  w.splice(_, 1);
                  break;
                }
              return 0 === w.length && delete this._callbacks["$" + H], this;
            }),
        (v.prototype.emit = function (H) {
          this._callbacks = this._callbacks || {};
          for (
            var N = new Array(arguments.length - 1),
              w = this._callbacks["$" + H],
              b = 1;
            b < arguments.length;
            b++
          )
            N[b - 1] = arguments[b];
          if (w) {
            b = 0;
            for (var _ = (w = w.slice(0)).length; b < _; ++b)
              w[b].apply(this, N);
          }
          return this;
        }),
        (v.prototype.listeners = function (H) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + H] || []
          );
        }),
        (v.prototype.hasListeners = function (H) {
          return !!this.listeners(H).length;
        });
    },
    471: (U) => {
      U.exports = function (v, V) {
        var H = function () {};
        (H.prototype = V.prototype),
          (v.prototype = new H()),
          (v.prototype.constructor = v);
      };
    },
    988: (U, v, V) => {
      var H = V(425),
        N = Object.prototype.toString,
        w =
          "function" == typeof Blob ||
          (typeof Blob < "u" && "[object BlobConstructor]" === N.call(Blob)),
        b =
          "function" == typeof File ||
          (typeof File < "u" && "[object FileConstructor]" === N.call(File));
      U.exports = function _(z) {
        if (!z || "object" != typeof z) return !1;
        if (H(z)) {
          for (var S = 0, h = z.length; S < h; S++) if (_(z[S])) return !0;
          return !1;
        }
        if (
          ("function" == typeof Buffer &&
            Buffer.isBuffer &&
            Buffer.isBuffer(z)) ||
          ("function" == typeof ArrayBuffer && z instanceof ArrayBuffer) ||
          (w && z instanceof Blob) ||
          (b && z instanceof File)
        )
          return !0;
        if (z.toJSON && "function" == typeof z.toJSON && 1 === arguments.length)
          return _(z.toJSON(), !0);
        for (var M in z)
          if (Object.prototype.hasOwnProperty.call(z, M) && _(z[M])) return !0;
        return !1;
      };
    },
    764: (U) => {
      try {
        U.exports =
          typeof XMLHttpRequest < "u" &&
          "withCredentials" in new XMLHttpRequest();
      } catch {
        U.exports = !1;
      }
    },
    68: (U) => {
      var v = [].indexOf;
      U.exports = function (V, H) {
        if (v) return V.indexOf(H);
        for (var N = 0; N < V.length; ++N) if (V[N] === H) return N;
        return -1;
      };
    },
    425: (U) => {
      var v = {}.toString;
      U.exports =
        Array.isArray ||
        function (V) {
          return "[object Array]" == v.call(V);
        };
    },
    958: (U, v) => {
      !(function (V) {
        "use strict";
        (v.encode = function (H) {
          var w,
            N = new Uint8Array(H),
            b = N.length,
            _ = "";
          for (w = 0; w < b; w += 3)
            (_ += V[N[w] >> 2]),
              (_ += V[((3 & N[w]) << 4) | (N[w + 1] >> 4)]),
              (_ += V[((15 & N[w + 1]) << 2) | (N[w + 2] >> 6)]),
              (_ += V[63 & N[w + 2]]);
          return (
            b % 3 == 2
              ? (_ = _.substring(0, _.length - 1) + "=")
              : b % 3 == 1 && (_ = _.substring(0, _.length - 2) + "=="),
            _
          );
        }),
          (v.decode = function (H) {
            var b,
              z,
              S,
              h,
              M,
              N = 0.75 * H.length,
              w = H.length,
              _ = 0;
            "=" === H[H.length - 1] && (N--, "=" === H[H.length - 2] && N--);
            var m = new ArrayBuffer(N),
              p = new Uint8Array(m);
            for (b = 0; b < w; b += 4)
              (z = V.indexOf(H[b])),
                (S = V.indexOf(H[b + 1])),
                (h = V.indexOf(H[b + 2])),
                (M = V.indexOf(H[b + 3])),
                (p[_++] = (z << 2) | (S >> 4)),
                (p[_++] = ((15 & S) << 4) | (h >> 2)),
                (p[_++] = ((3 & h) << 6) | (63 & M));
            return m;
          });
      })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    },
    462: (U, v, V) => {
      function _() {
        var S;
        try {
          S = v.storage.debug;
        } catch {}
        return (
          !S &&
            typeof process < "u" &&
            "env" in process &&
            (S = process.env.DEBUG),
          S
        );
      }
      ((v = U.exports = V(97)).log = function w() {
        return (
          "object" == typeof console &&
          console.log &&
          Function.prototype.apply.call(console.log, console, arguments)
        );
      }),
        (v.formatArgs = function N(S) {
          var h = this.useColors;
          if (
            ((S[0] =
              (h ? "%c" : "") +
              this.namespace +
              (h ? " %c" : " ") +
              S[0] +
              (h ? "%c " : " ") +
              "+" +
              v.humanize(this.diff)),
            h)
          ) {
            var M = "color: " + this.color;
            S.splice(1, 0, M, "color: inherit");
            var m = 0,
              p = 0;
            S[0].replace(/%[a-zA-Z%]/g, function (u) {
              "%%" !== u && (m++, "%c" === u && (p = m));
            }),
              S.splice(p, 0, M);
          }
        }),
        (v.save = function b(S) {
          try {
            null == S ? v.storage.removeItem("debug") : (v.storage.debug = S);
          } catch {}
        }),
        (v.load = _),
        (v.useColors = function H() {
          return (
            !!(
              typeof window < "u" &&
              window.process &&
              "renderer" === window.process.type
            ) ||
            (!(
              typeof navigator < "u" &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
            ) &&
              ((typeof document < "u" &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                (typeof window < "u" &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                (typeof navigator < "u" &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                (typeof navigator < "u" &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }),
        (v.storage =
          typeof chrome < "u" && typeof chrome.storage < "u"
            ? chrome.storage.local
            : (function z() {
                try {
                  return window.localStorage;
                } catch {}
              })()),
        (v.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33",
        ]),
        (v.formatters.j = function (S) {
          try {
            return JSON.stringify(S);
          } catch (h) {
            return "[UnexpectedJSONParseError]: " + h.message;
          }
        }),
        v.enable(_());
    },
    97: (U, v, V) => {
      function N(h) {
        var M;
        function m() {
          if (m.enabled) {
            var p = m,
              u = +new Date(),
              L = u - (M || u);
            (p.diff = L), (p.prev = M), (p.curr = u), (M = u);
            for (var D = new Array(arguments.length), B = 0; B < D.length; B++)
              D[B] = arguments[B];
            (D[0] = v.coerce(D[0])), "string" != typeof D[0] && D.unshift("%O");
            var E = 0;
            (D[0] = D[0].replace(/%([a-zA-Z%])/g, function (Q, b2) {
              if ("%%" === Q) return Q;
              E++;
              var P = v.formatters[b2];
              return (
                "function" == typeof P &&
                  ((Q = P.call(p, D[E])), D.splice(E, 1), E--),
                Q
              );
            })),
              v.formatArgs.call(p, D);
            var R = m.log || v.log || console.log.bind(console);
            R.apply(p, D);
          }
        }
        return (
          (m.namespace = h),
          (m.enabled = v.enabled(h)),
          (m.useColors = v.useColors()),
          (m.color = (function H(h) {
            var m,
              M = 0;
            for (m in h) (M = (M << 5) - M + h.charCodeAt(m)), (M |= 0);
            return v.colors[Math.abs(M) % v.colors.length];
          })(h)),
          (m.destroy = w),
          "function" == typeof v.init && v.init(m),
          v.instances.push(m),
          m
        );
      }
      function w() {
        var h = v.instances.indexOf(this);
        return -1 !== h && (v.instances.splice(h, 1), !0);
      }
      ((v = U.exports = N.debug = N.default = N).coerce = function S(h) {
        return h instanceof Error ? h.stack || h.message : h;
      }),
        (v.disable = function _() {
          v.enable("");
        }),
        (v.enable = function b(h) {
          v.save(h), (v.names = []), (v.skips = []);
          var M,
            m = ("string" == typeof h ? h : "").split(/[\s,]+/),
            p = m.length;
          for (M = 0; M < p; M++)
            !m[M] ||
              ("-" === (h = m[M].replace(/\*/g, ".*?"))[0]
                ? v.skips.push(new RegExp("^" + h.substr(1) + "$"))
                : v.names.push(new RegExp("^" + h + "$")));
          for (M = 0; M < v.instances.length; M++) {
            var u = v.instances[M];
            u.enabled = v.enabled(u.namespace);
          }
        }),
        (v.enabled = function z(h) {
          if ("*" === h[h.length - 1]) return !0;
          var M, m;
          for (M = 0, m = v.skips.length; M < m; M++)
            if (v.skips[M].test(h)) return !1;
          for (M = 0, m = v.names.length; M < m; M++)
            if (v.names[M].test(h)) return !0;
          return !1;
        }),
        (v.humanize = V(436)),
        (v.instances = []),
        (v.names = []),
        (v.skips = []),
        (v.formatters = {});
    },
    675: (U) => {
      U.exports =
        typeof self < "u"
          ? self
          : typeof window < "u"
          ? window
          : Function("return this")();
    },
    92: (U, v, V) => {
      (U.exports = V(557)), (U.exports.parser = V(337));
    },
    557: (U, v, V) => {
      var H = V(185),
        N = V(264),
        w = V(462)("engine.io-client:socket"),
        b = V(68),
        _ = V(337),
        z = V(312),
        S = V(164);
      function h(m, p) {
        if (!(this instanceof h)) return new h(m, p);
        (p = p || {}),
          m && "object" == typeof m && ((p = m), (m = null)),
          m
            ? ((m = z(m)),
              (p.hostname = m.host),
              (p.secure = "https" === m.protocol || "wss" === m.protocol),
              (p.port = m.port),
              m.query && (p.query = m.query))
            : p.host && (p.hostname = z(p.host).host),
          (this.secure =
            null != p.secure
              ? p.secure
              : typeof location < "u" && "https:" === location.protocol),
          p.hostname && !p.port && (p.port = this.secure ? "443" : "80"),
          (this.agent = p.agent || !1),
          (this.hostname =
            p.hostname ||
            (typeof location < "u" ? location.hostname : "localhost")),
          (this.port =
            p.port ||
            (typeof location < "u" && location.port
              ? location.port
              : this.secure
              ? 443
              : 80)),
          (this.query = p.query || {}),
          "string" == typeof this.query && (this.query = S.decode(this.query)),
          (this.upgrade = !1 !== p.upgrade),
          (this.path = (p.path || "/engine.io").replace(/\/$/, "") + "/"),
          (this.forceJSONP = !!p.forceJSONP),
          (this.jsonp = !1 !== p.jsonp),
          (this.forceBase64 = !!p.forceBase64),
          (this.enablesXDR = !!p.enablesXDR),
          (this.withCredentials = !1 !== p.withCredentials),
          (this.timestampParam = p.timestampParam || "t"),
          (this.timestampRequests = p.timestampRequests),
          (this.transports = p.transports || ["polling", "websocket"]),
          (this.transportOptions = p.transportOptions || {}),
          (this.readyState = ""),
          (this.writeBuffer = []),
          (this.prevBufferLen = 0),
          (this.policyPort = p.policyPort || 843),
          (this.rememberUpgrade = p.rememberUpgrade || !1),
          (this.binaryType = null),
          (this.onlyBinaryUpgrades = p.onlyBinaryUpgrades),
          (this.perMessageDeflate =
            !1 !== p.perMessageDeflate && (p.perMessageDeflate || {})),
          !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
          this.perMessageDeflate &&
            null == this.perMessageDeflate.threshold &&
            (this.perMessageDeflate.threshold = 1024),
          (this.pfx = p.pfx || void 0),
          (this.key = p.key || void 0),
          (this.passphrase = p.passphrase || void 0),
          (this.cert = p.cert || void 0),
          (this.ca = p.ca || void 0),
          (this.ciphers = p.ciphers || void 0),
          (this.rejectUnauthorized =
            void 0 === p.rejectUnauthorized || p.rejectUnauthorized),
          (this.forceNode = !!p.forceNode),
          (this.isReactNative =
            typeof navigator < "u" &&
            "string" == typeof navigator.product &&
            "reactnative" === navigator.product.toLowerCase()),
          (typeof self > "u" || this.isReactNative) &&
            (p.extraHeaders &&
              Object.keys(p.extraHeaders).length > 0 &&
              (this.extraHeaders = p.extraHeaders),
            p.localAddress && (this.localAddress = p.localAddress)),
          (this.id = null),
          (this.upgrades = null),
          (this.pingInterval = null),
          (this.pingTimeout = null),
          (this.pingIntervalTimer = null),
          (this.pingTimeoutTimer = null),
          this.open();
      }
      (U.exports = h),
        (h.priorWebsocketSuccess = !1),
        N(h.prototype),
        (h.protocol = _.protocol),
        (h.Socket = h),
        (h.Transport = V(910)),
        (h.transports = V(185)),
        (h.parser = V(337)),
        (h.prototype.createTransport = function (m) {
          w('creating transport "%s"', m);
          var p = (function M(m) {
            var p = {};
            for (var u in m) m.hasOwnProperty(u) && (p[u] = m[u]);
            return p;
          })(this.query);
          (p.EIO = _.protocol), (p.transport = m);
          var u = this.transportOptions[m] || {};
          return (
            this.id && (p.sid = this.id),
            new H[m]({
              query: p,
              socket: this,
              agent: u.agent || this.agent,
              hostname: u.hostname || this.hostname,
              port: u.port || this.port,
              secure: u.secure || this.secure,
              path: u.path || this.path,
              forceJSONP: u.forceJSONP || this.forceJSONP,
              jsonp: u.jsonp || this.jsonp,
              forceBase64: u.forceBase64 || this.forceBase64,
              enablesXDR: u.enablesXDR || this.enablesXDR,
              withCredentials: u.withCredentials || this.withCredentials,
              timestampRequests: u.timestampRequests || this.timestampRequests,
              timestampParam: u.timestampParam || this.timestampParam,
              policyPort: u.policyPort || this.policyPort,
              pfx: u.pfx || this.pfx,
              key: u.key || this.key,
              passphrase: u.passphrase || this.passphrase,
              cert: u.cert || this.cert,
              ca: u.ca || this.ca,
              ciphers: u.ciphers || this.ciphers,
              rejectUnauthorized:
                u.rejectUnauthorized || this.rejectUnauthorized,
              perMessageDeflate: u.perMessageDeflate || this.perMessageDeflate,
              extraHeaders: u.extraHeaders || this.extraHeaders,
              forceNode: u.forceNode || this.forceNode,
              localAddress: u.localAddress || this.localAddress,
              requestTimeout: u.requestTimeout || this.requestTimeout,
              protocols: u.protocols || void 0,
              isReactNative: this.isReactNative,
            })
          );
        }),
        (h.prototype.open = function () {
          var m;
          if (
            this.rememberUpgrade &&
            h.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
          )
            m = "websocket";
          else {
            if (0 === this.transports.length) {
              var p = this;
              return void setTimeout(function () {
                p.emit("error", "No transports available");
              }, 0);
            }
            m = this.transports[0];
          }
          this.readyState = "opening";
          try {
            m = this.createTransport(m);
          } catch {
            return this.transports.shift(), void this.open();
          }
          m.open(), this.setTransport(m);
        }),
        (h.prototype.setTransport = function (m) {
          w("setting transport %s", m.name);
          var p = this;
          this.transport &&
            (w("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            (this.transport = m),
            m
              .on("drain", function () {
                p.onDrain();
              })
              .on("packet", function (u) {
                p.onPacket(u);
              })
              .on("error", function (u) {
                p.onError(u);
              })
              .on("close", function () {
                p.onClose("transport close");
              });
        }),
        (h.prototype.probe = function (m) {
          w('probing transport "%s"', m);
          var p = this.createTransport(m, { probe: 1 }),
            u = !1,
            L = this;
          function D() {
            L.onlyBinaryUpgrades &&
              (u = u || (!this.supportsBinary && L.transport.supportsBinary)),
              u ||
                (w('probe transport "%s" opened', m),
                p.send([{ type: "ping", data: "probe" }]),
                p.once("packet", function (Y) {
                  if (!u)
                    if ("pong" === Y.type && "probe" === Y.data) {
                      if (
                        (w('probe transport "%s" pong', m),
                        (L.upgrading = !0),
                        L.emit("upgrading", p),
                        !p)
                      )
                        return;
                      (h.priorWebsocketSuccess = "websocket" === p.name),
                        w('pausing current transport "%s"', L.transport.name),
                        L.transport.pause(function () {
                          u ||
                            ("closed" !== L.readyState &&
                              (w(
                                "changing transport and sending upgrade packet"
                              ),
                              P(),
                              L.setTransport(p),
                              p.send([{ type: "upgrade" }]),
                              L.emit("upgrade", p),
                              (p = null),
                              (L.upgrading = !1),
                              L.flush()));
                        });
                    } else {
                      w('probe transport "%s" failed', m);
                      var X = new Error("probe error");
                      (X.transport = p.name), L.emit("upgradeError", X);
                    }
                }));
          }
          function B() {
            u || ((u = !0), P(), p.close(), (p = null));
          }
          function E(j) {
            var Y = new Error("probe error: " + j);
            (Y.transport = p.name),
              B(),
              w('probe transport "%s" failed because of error: %s', m, j),
              L.emit("upgradeError", Y);
          }
          function R() {
            E("transport closed");
          }
          function Q() {
            E("socket closed");
          }
          function b2(j) {
            p &&
              j.name !== p.name &&
              (w('"%s" works - aborting "%s"', j.name, p.name), B());
          }
          function P() {
            p.removeListener("open", D),
              p.removeListener("error", E),
              p.removeListener("close", R),
              L.removeListener("close", Q),
              L.removeListener("upgrading", b2);
          }
          (h.priorWebsocketSuccess = !1),
            p.once("open", D),
            p.once("error", E),
            p.once("close", R),
            this.once("close", Q),
            this.once("upgrading", b2),
            p.open();
        }),
        (h.prototype.onOpen = function () {
          if (
            (w("socket open"),
            (this.readyState = "open"),
            (h.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause)
          ) {
            w("starting upgrade probes");
            for (var m = 0, p = this.upgrades.length; m < p; m++)
              this.probe(this.upgrades[m]);
          }
        }),
        (h.prototype.onPacket = function (m) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
              (w('socket receive: type "%s", data "%s"', m.type, m.data),
              this.emit("packet", m),
              this.emit("heartbeat"),
              m.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(m.data));
                break;
              case "pong":
                this.setPing(), this.emit("pong");
                break;
              case "error":
                var p = new Error("server error");
                (p.code = m.data), this.onError(p);
                break;
              case "message":
                this.emit("data", m.data), this.emit("message", m.data);
            }
          else
            w('packet received with socket readyState "%s"', this.readyState);
        }),
        (h.prototype.onHandshake = function (m) {
          this.emit("handshake", m),
            (this.id = m.sid),
            (this.transport.query.sid = m.sid),
            (this.upgrades = this.filterUpgrades(m.upgrades)),
            (this.pingInterval = m.pingInterval),
            (this.pingTimeout = m.pingTimeout),
            this.onOpen(),
            "closed" !== this.readyState &&
              (this.setPing(),
              this.removeListener("heartbeat", this.onHeartbeat),
              this.on("heartbeat", this.onHeartbeat));
        }),
        (h.prototype.onHeartbeat = function (m) {
          clearTimeout(this.pingTimeoutTimer);
          var p = this;
          p.pingTimeoutTimer = setTimeout(function () {
            "closed" !== p.readyState && p.onClose("ping timeout");
          }, m || p.pingInterval + p.pingTimeout);
        }),
        (h.prototype.setPing = function () {
          var m = this;
          clearTimeout(m.pingIntervalTimer),
            (m.pingIntervalTimer = setTimeout(function () {
              w(
                "writing ping packet - expecting pong within %sms",
                m.pingTimeout
              ),
                m.ping(),
                m.onHeartbeat(m.pingTimeout);
            }, m.pingInterval));
        }),
        (h.prototype.ping = function () {
          var m = this;
          this.sendPacket("ping", function () {
            m.emit("ping");
          });
        }),
        (h.prototype.onDrain = function () {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }),
        (h.prototype.flush = function () {
          "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (w("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            (this.prevBufferLen = this.writeBuffer.length),
            this.emit("flush"));
        }),
        (h.prototype.write = h.prototype.send =
          function (m, p, u) {
            return this.sendPacket("message", m, p, u), this;
          }),
        (h.prototype.sendPacket = function (m, p, u, L) {
          if (
            ("function" == typeof p && ((L = p), (p = void 0)),
            "function" == typeof u && ((L = u), (u = null)),
            "closing" !== this.readyState && "closed" !== this.readyState)
          ) {
            (u = u || {}).compress = !1 !== u.compress;
            var D = { type: m, data: p, options: u };
            this.emit("packetCreate", D),
              this.writeBuffer.push(D),
              L && this.once("flush", L),
              this.flush();
          }
        }),
        (h.prototype.close = function () {
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var m = this;
            this.writeBuffer.length
              ? this.once("drain", function () {
                  this.upgrading ? L() : p();
                })
              : this.upgrading
              ? L()
              : p();
          }
          function p() {
            m.onClose("forced close"),
              w("socket closing - telling transport to close"),
              m.transport.close();
          }
          function u() {
            m.removeListener("upgrade", u),
              m.removeListener("upgradeError", u),
              p();
          }
          function L() {
            m.once("upgrade", u), m.once("upgradeError", u);
          }
          return this;
        }),
        (h.prototype.onError = function (m) {
          w("socket error %j", m),
            (h.priorWebsocketSuccess = !1),
            this.emit("error", m),
            this.onClose("transport error", m);
        }),
        (h.prototype.onClose = function (m, p) {
          ("opening" !== this.readyState &&
            "open" !== this.readyState &&
            "closing" !== this.readyState) ||
            (w('socket close with reason: "%s"', m),
            clearTimeout(this.pingIntervalTimer),
            clearTimeout(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            (this.readyState = "closed"),
            (this.id = null),
            this.emit("close", m, p),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
        }),
        (h.prototype.filterUpgrades = function (m) {
          for (var p = [], u = 0, L = m.length; u < L; u++)
            ~b(this.transports, m[u]) && p.push(m[u]);
          return p;
        });
    },
    910: (U, v, V) => {
      var H = V(337),
        N = V(264);
      function w(b) {
        (this.path = b.path),
          (this.hostname = b.hostname),
          (this.port = b.port),
          (this.secure = b.secure),
          (this.query = b.query),
          (this.timestampParam = b.timestampParam),
          (this.timestampRequests = b.timestampRequests),
          (this.readyState = ""),
          (this.agent = b.agent || !1),
          (this.socket = b.socket),
          (this.enablesXDR = b.enablesXDR),
          (this.withCredentials = b.withCredentials),
          (this.pfx = b.pfx),
          (this.key = b.key),
          (this.passphrase = b.passphrase),
          (this.cert = b.cert),
          (this.ca = b.ca),
          (this.ciphers = b.ciphers),
          (this.rejectUnauthorized = b.rejectUnauthorized),
          (this.forceNode = b.forceNode),
          (this.isReactNative = b.isReactNative),
          (this.extraHeaders = b.extraHeaders),
          (this.localAddress = b.localAddress);
      }
      (U.exports = w),
        N(w.prototype),
        (w.prototype.onError = function (b, _) {
          var z = new Error(b);
          return (
            (z.type = "TransportError"),
            (z.description = _),
            this.emit("error", z),
            this
          );
        }),
        (w.prototype.open = function () {
          return (
            ("closed" === this.readyState || "" === this.readyState) &&
              ((this.readyState = "opening"), this.doOpen()),
            this
          );
        }),
        (w.prototype.close = function () {
          return (
            ("opening" === this.readyState || "open" === this.readyState) &&
              (this.doClose(), this.onClose()),
            this
          );
        }),
        (w.prototype.send = function (b) {
          if ("open" !== this.readyState) throw new Error("Transport not open");
          this.write(b);
        }),
        (w.prototype.onOpen = function () {
          (this.readyState = "open"), (this.writable = !0), this.emit("open");
        }),
        (w.prototype.onData = function (b) {
          var _ = H.decodePacket(b, this.socket.binaryType);
          this.onPacket(_);
        }),
        (w.prototype.onPacket = function (b) {
          this.emit("packet", b);
        }),
        (w.prototype.onClose = function () {
          (this.readyState = "closed"), this.emit("close");
        });
    },
    185: (U, v, V) => {
      var H = V(304),
        N = V(776),
        w = V(385),
        b = V(687);
      (v.polling = function _(z) {
        var h = !1,
          M = !1,
          m = !1 !== z.jsonp;
        if (typeof location < "u") {
          var p = "https:" === location.protocol,
            u = location.port;
          u || (u = p ? 443 : 80),
            (h = z.hostname !== location.hostname || u !== z.port),
            (M = z.secure !== p);
        }
        if (
          ((z.xdomain = h),
          (z.xscheme = M),
          "open" in new H(z) && !z.forceJSONP)
        )
          return new N(z);
        if (!m) throw new Error("JSONP disabled");
        return new w(z);
      }),
        (v.websocket = b);
    },
    385: (U, v, V) => {
      var H = V(788),
        N = V(471),
        w = V(675);
      U.exports = h;
      var z,
        b = /\n/g,
        _ = /\\n/g;
      function S() {}
      function h(M) {
        H.call(this, M),
          (this.query = this.query || {}),
          z || (z = w.___eio = w.___eio || []),
          (this.index = z.length);
        var m = this;
        z.push(function (p) {
          m.onData(p);
        }),
          (this.query.j = this.index),
          "function" == typeof addEventListener &&
            addEventListener(
              "beforeunload",
              function () {
                m.script && (m.script.onerror = S);
              },
              !1
            );
      }
      N(h, H),
        (h.prototype.supportsBinary = !1),
        (h.prototype.doClose = function () {
          this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            this.form &&
              (this.form.parentNode.removeChild(this.form),
              (this.form = null),
              (this.iframe = null)),
            H.prototype.doClose.call(this);
        }),
        (h.prototype.doPoll = function () {
          var M = this,
            m = document.createElement("script");
          this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            (m.async = !0),
            (m.src = this.uri()),
            (m.onerror = function (L) {
              M.onError("jsonp poll error", L);
            });
          var p = document.getElementsByTagName("script")[0];
          p
            ? p.parentNode.insertBefore(m, p)
            : (document.head || document.body).appendChild(m),
            (this.script = m),
            typeof navigator < "u" &&
              /gecko/i.test(navigator.userAgent) &&
              setTimeout(function () {
                var L = document.createElement("iframe");
                document.body.appendChild(L), document.body.removeChild(L);
              }, 100);
        }),
        (h.prototype.doWrite = function (M, m) {
          var p = this;
          if (!this.form) {
            var B,
              u = document.createElement("form"),
              L = document.createElement("textarea"),
              D = (this.iframeId = "eio_iframe_" + this.index);
            (u.className = "socketio"),
              (u.style.position = "absolute"),
              (u.style.top = "-1000px"),
              (u.style.left = "-1000px"),
              (u.target = D),
              (u.method = "POST"),
              u.setAttribute("accept-charset", "utf-8"),
              (L.name = "d"),
              u.appendChild(L),
              document.body.appendChild(u),
              (this.form = u),
              (this.area = L);
          }
          function E() {
            R(), m();
          }
          function R() {
            if (p.iframe)
              try {
                p.form.removeChild(p.iframe);
              } catch (b2) {
                p.onError("jsonp polling iframe removal error", b2);
              }
            try {
              B = document.createElement(
                '<iframe src="javascript:0" name="' + p.iframeId + '">'
              );
            } catch {
              ((B = document.createElement("iframe")).name = p.iframeId),
                (B.src = "javascript:0");
            }
            (B.id = p.iframeId), p.form.appendChild(B), (p.iframe = B);
          }
          (this.form.action = this.uri()),
            R(),
            (M = M.replace(_, "\\\n")),
            (this.area.value = M.replace(b, "\\n"));
          try {
            this.form.submit();
          } catch {}
          this.iframe.attachEvent
            ? (this.iframe.onreadystatechange = function () {
                "complete" === p.iframe.readyState && E();
              })
            : (this.iframe.onload = E);
        });
    },
    776: (U, v, V) => {
      var H = V(304),
        N = V(788),
        w = V(264),
        b = V(471),
        _ = V(462)("engine.io-client:polling-xhr"),
        z = V(675);
      function S() {}
      function h(u) {
        if (
          (N.call(this, u),
          (this.requestTimeout = u.requestTimeout),
          (this.extraHeaders = u.extraHeaders),
          typeof location < "u")
        ) {
          var L = "https:" === location.protocol,
            D = location.port;
          D || (D = L ? 443 : 80),
            (this.xd =
              (typeof location < "u" && u.hostname !== location.hostname) ||
              D !== u.port),
            (this.xs = u.secure !== L);
        }
      }
      function M(u) {
        (this.method = u.method || "GET"),
          (this.uri = u.uri),
          (this.xd = !!u.xd),
          (this.xs = !!u.xs),
          (this.async = !1 !== u.async),
          (this.data = void 0 !== u.data ? u.data : null),
          (this.agent = u.agent),
          (this.isBinary = u.isBinary),
          (this.supportsBinary = u.supportsBinary),
          (this.enablesXDR = u.enablesXDR),
          (this.withCredentials = u.withCredentials),
          (this.requestTimeout = u.requestTimeout),
          (this.pfx = u.pfx),
          (this.key = u.key),
          (this.passphrase = u.passphrase),
          (this.cert = u.cert),
          (this.ca = u.ca),
          (this.ciphers = u.ciphers),
          (this.rejectUnauthorized = u.rejectUnauthorized),
          (this.extraHeaders = u.extraHeaders),
          this.create();
      }
      function p() {
        for (var u in M.requests)
          M.requests.hasOwnProperty(u) && M.requests[u].abort();
      }
      (U.exports = h),
        (U.exports.Request = M),
        b(h, N),
        (h.prototype.supportsBinary = !0),
        (h.prototype.request = function (u) {
          return (
            ((u = u || {}).uri = this.uri()),
            (u.xd = this.xd),
            (u.xs = this.xs),
            (u.agent = this.agent || !1),
            (u.supportsBinary = this.supportsBinary),
            (u.enablesXDR = this.enablesXDR),
            (u.withCredentials = this.withCredentials),
            (u.pfx = this.pfx),
            (u.key = this.key),
            (u.passphrase = this.passphrase),
            (u.cert = this.cert),
            (u.ca = this.ca),
            (u.ciphers = this.ciphers),
            (u.rejectUnauthorized = this.rejectUnauthorized),
            (u.requestTimeout = this.requestTimeout),
            (u.extraHeaders = this.extraHeaders),
            new M(u)
          );
        }),
        (h.prototype.doWrite = function (u, L) {
          var B = this.request({
              method: "POST",
              data: u,
              isBinary: "string" != typeof u && void 0 !== u,
            }),
            E = this;
          B.on("success", L),
            B.on("error", function (R) {
              E.onError("xhr post error", R);
            }),
            (this.sendXhr = B);
        }),
        (h.prototype.doPoll = function () {
          _("xhr poll");
          var u = this.request(),
            L = this;
          u.on("data", function (D) {
            L.onData(D);
          }),
            u.on("error", function (D) {
              L.onError("xhr poll error", D);
            }),
            (this.pollXhr = u);
        }),
        w(M.prototype),
        (M.prototype.create = function () {
          var u = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR,
          };
          (u.pfx = this.pfx),
            (u.key = this.key),
            (u.passphrase = this.passphrase),
            (u.cert = this.cert),
            (u.ca = this.ca),
            (u.ciphers = this.ciphers),
            (u.rejectUnauthorized = this.rejectUnauthorized);
          var L = (this.xhr = new H(u)),
            D = this;
          try {
            _("xhr open %s: %s", this.method, this.uri),
              L.open(this.method, this.uri, this.async);
            try {
              if (this.extraHeaders)
                for (var B in (L.setDisableHeaderCheck &&
                  L.setDisableHeaderCheck(!0),
                this.extraHeaders))
                  this.extraHeaders.hasOwnProperty(B) &&
                    L.setRequestHeader(B, this.extraHeaders[B]);
            } catch {}
            if ("POST" === this.method)
              try {
                L.setRequestHeader(
                  "Content-type",
                  this.isBinary
                    ? "application/octet-stream"
                    : "text/plain;charset=UTF-8"
                );
              } catch {}
            try {
              L.setRequestHeader("Accept", "*/*");
            } catch {}
            "withCredentials" in L &&
              (L.withCredentials = this.withCredentials),
              this.requestTimeout && (L.timeout = this.requestTimeout),
              this.hasXDR()
                ? ((L.onload = function () {
                    D.onLoad();
                  }),
                  (L.onerror = function () {
                    D.onError(L.responseText);
                  }))
                : (L.onreadystatechange = function () {
                    if (2 === L.readyState)
                      try {
                        var E = L.getResponseHeader("Content-Type");
                        ((D.supportsBinary &&
                          "application/octet-stream" === E) ||
                          "application/octet-stream; charset=UTF-8" === E) &&
                          (L.responseType = "arraybuffer");
                      } catch {}
                    4 === L.readyState &&
                      (200 === L.status || 1223 === L.status
                        ? D.onLoad()
                        : setTimeout(function () {
                            D.onError(
                              "number" == typeof L.status ? L.status : 0
                            );
                          }, 0));
                  }),
              _("xhr data %s", this.data),
              L.send(this.data);
          } catch (E) {
            return void setTimeout(function () {
              D.onError(E);
            }, 0);
          }
          typeof document < "u" &&
            ((this.index = M.requestsCount++), (M.requests[this.index] = this));
        }),
        (M.prototype.onSuccess = function () {
          this.emit("success"), this.cleanup();
        }),
        (M.prototype.onData = function (u) {
          this.emit("data", u), this.onSuccess();
        }),
        (M.prototype.onError = function (u) {
          this.emit("error", u), this.cleanup(!0);
        }),
        (M.prototype.cleanup = function (u) {
          if (!(typeof this.xhr > "u" || null === this.xhr)) {
            if (
              (this.hasXDR()
                ? (this.xhr.onload = this.xhr.onerror = S)
                : (this.xhr.onreadystatechange = S),
              u)
            )
              try {
                this.xhr.abort();
              } catch {}
            typeof document < "u" && delete M.requests[this.index],
              (this.xhr = null);
          }
        }),
        (M.prototype.onLoad = function () {
          var u;
          try {
            var L;
            try {
              L = this.xhr.getResponseHeader("Content-Type");
            } catch {}
            u =
              (("application/octet-stream" === L ||
                "application/octet-stream; charset=UTF-8" === L) &&
                this.xhr.response) ||
              this.xhr.responseText;
          } catch (D) {
            this.onError(D);
          }
          null != u && this.onData(u);
        }),
        (M.prototype.hasXDR = function () {
          return typeof XDomainRequest < "u" && !this.xs && this.enablesXDR;
        }),
        (M.prototype.abort = function () {
          this.cleanup();
        }),
        (M.requestsCount = 0),
        (M.requests = {}),
        typeof document < "u" &&
          ("function" == typeof attachEvent
            ? attachEvent("onunload", p)
            : "function" == typeof addEventListener &&
              addEventListener(
                "onpagehide" in z ? "pagehide" : "unload",
                p,
                !1
              ));
    },
    788: (U, v, V) => {
      var H = V(910),
        N = V(164),
        w = V(337),
        b = V(471),
        _ = V(379),
        z = V(462)("engine.io-client:polling");
      U.exports = h;
      var S = null != new (V(304))({ xdomain: !1 }).responseType;
      function h(M) {
        (!S || (M && M.forceBase64)) && (this.supportsBinary = !1),
          H.call(this, M);
      }
      b(h, H),
        (h.prototype.name = "polling"),
        (h.prototype.doOpen = function () {
          this.poll();
        }),
        (h.prototype.pause = function (M) {
          var m = this;
          function p() {
            z("paused"), (m.readyState = "paused"), M();
          }
          if (((this.readyState = "pausing"), this.polling || !this.writable)) {
            var u = 0;
            this.polling &&
              (z("we are currently polling - waiting to pause"),
              u++,
              this.once("pollComplete", function () {
                z("pre-pause polling complete"), --u || p();
              })),
              this.writable ||
                (z("we are currently writing - waiting to pause"),
                u++,
                this.once("drain", function () {
                  z("pre-pause writing complete"), --u || p();
                }));
          } else p();
        }),
        (h.prototype.poll = function () {
          z("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
        }),
        (h.prototype.onData = function (M) {
          var m = this;
          z("polling got data %s", M),
            w.decodePayload(M, this.socket.binaryType, function (u, L, D) {
              if (
                ("opening" === m.readyState && "open" === u.type && m.onOpen(),
                "close" === u.type)
              )
                return m.onClose(), !1;
              m.onPacket(u);
            }),
            "closed" !== this.readyState &&
              ((this.polling = !1),
              this.emit("pollComplete"),
              "open" === this.readyState
                ? this.poll()
                : z('ignoring poll - transport state "%s"', this.readyState));
        }),
        (h.prototype.doClose = function () {
          var M = this;
          function m() {
            z("writing close packet"), M.write([{ type: "close" }]);
          }
          "open" === this.readyState
            ? (z("transport open - closing"), m())
            : (z("transport not open - deferring close"), this.once("open", m));
        }),
        (h.prototype.write = function (M) {
          var m = this;
          this.writable = !1;
          var p = function () {
            (m.writable = !0), m.emit("drain");
          };
          w.encodePayload(M, this.supportsBinary, function (u) {
            m.doWrite(u, p);
          });
        }),
        (h.prototype.uri = function () {
          var M = this.query || {},
            m = this.secure ? "https" : "http",
            p = "";
          return (
            !1 !== this.timestampRequests && (M[this.timestampParam] = _()),
            !this.supportsBinary && !M.sid && (M.b64 = 1),
            (M = N.encode(M)),
            this.port &&
              (("https" === m && 443 !== Number(this.port)) ||
                ("http" === m && 80 !== Number(this.port))) &&
              (p = ":" + this.port),
            M.length && (M = "?" + M),
            m +
              "://" +
              (-1 !== this.hostname.indexOf(":")
                ? "[" + this.hostname + "]"
                : this.hostname) +
              p +
              this.path +
              M
          );
        });
    },
    687: (U, v, V) => {
      var S,
        h,
        H = V(910),
        N = V(337),
        w = V(164),
        b = V(471),
        _ = V(379),
        z = V(462)("engine.io-client:websocket");
      if (
        (typeof WebSocket < "u"
          ? (S = WebSocket)
          : typeof self < "u" && (S = self.WebSocket || self.MozWebSocket),
        typeof window > "u")
      )
        try {
          h = V(997);
        } catch {}
      var M = S || h;
      function m(p) {
        p && p.forceBase64 && (this.supportsBinary = !1),
          (this.perMessageDeflate = p.perMessageDeflate),
          (this.usingBrowserWebSocket = S && !p.forceNode),
          (this.protocols = p.protocols),
          this.usingBrowserWebSocket || (M = h),
          H.call(this, p);
      }
      (U.exports = m),
        b(m, H),
        (m.prototype.name = "websocket"),
        (m.prototype.supportsBinary = !0),
        (m.prototype.doOpen = function () {
          if (this.check()) {
            var p = this.uri(),
              u = this.protocols,
              L = {};
            this.isReactNative ||
              ((L.agent = this.agent),
              (L.perMessageDeflate = this.perMessageDeflate),
              (L.pfx = this.pfx),
              (L.key = this.key),
              (L.passphrase = this.passphrase),
              (L.cert = this.cert),
              (L.ca = this.ca),
              (L.ciphers = this.ciphers),
              (L.rejectUnauthorized = this.rejectUnauthorized)),
              this.extraHeaders && (L.headers = this.extraHeaders),
              this.localAddress && (L.localAddress = this.localAddress);
            try {
              this.ws =
                this.usingBrowserWebSocket && !this.isReactNative
                  ? u
                    ? new M(p, u)
                    : new M(p)
                  : new M(p, u, L);
            } catch (D) {
              return this.emit("error", D);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
              this.ws.supports && this.ws.supports.binary
                ? ((this.supportsBinary = !0),
                  (this.ws.binaryType = "nodebuffer"))
                : (this.ws.binaryType = "arraybuffer"),
              this.addEventListeners();
          }
        }),
        (m.prototype.addEventListeners = function () {
          var p = this;
          (this.ws.onopen = function () {
            p.onOpen();
          }),
            (this.ws.onclose = function () {
              p.onClose();
            }),
            (this.ws.onmessage = function (u) {
              p.onData(u.data);
            }),
            (this.ws.onerror = function (u) {
              p.onError("websocket error", u);
            });
        }),
        (m.prototype.write = function (p) {
          var u = this;
          this.writable = !1;
          for (var L = p.length, D = 0, B = L; D < B; D++)
            !(function (R) {
              N.encodePacket(R, u.supportsBinary, function (Q) {
                if (!u.usingBrowserWebSocket) {
                  var b2 = {};
                  R.options && (b2.compress = R.options.compress),
                    u.perMessageDeflate &&
                      ("string" == typeof Q ? Buffer.byteLength(Q) : Q.length) <
                        u.perMessageDeflate.threshold &&
                      (b2.compress = !1);
                }
                try {
                  u.usingBrowserWebSocket ? u.ws.send(Q) : u.ws.send(Q, b2);
                } catch {
                  z("websocket closed before onclose event");
                }
                --L ||
                  (u.emit("flush"),
                  setTimeout(function () {
                    (u.writable = !0), u.emit("drain");
                  }, 0));
              });
            })(p[D]);
        }),
        (m.prototype.onClose = function () {
          H.prototype.onClose.call(this);
        }),
        (m.prototype.doClose = function () {
          typeof this.ws < "u" && this.ws.close();
        }),
        (m.prototype.uri = function () {
          var p = this.query || {},
            u = this.secure ? "wss" : "ws",
            L = "";
          return (
            this.port &&
              (("wss" === u && 443 !== Number(this.port)) ||
                ("ws" === u && 80 !== Number(this.port))) &&
              (L = ":" + this.port),
            this.timestampRequests && (p[this.timestampParam] = _()),
            this.supportsBinary || (p.b64 = 1),
            (p = w.encode(p)).length && (p = "?" + p),
            u +
              "://" +
              (-1 !== this.hostname.indexOf(":")
                ? "[" + this.hostname + "]"
                : this.hostname) +
              L +
              this.path +
              p
          );
        }),
        (m.prototype.check = function () {
          return !(
            !M ||
            ("__initialize" in M && this.name === m.prototype.name)
          );
        });
    },
    304: (U, v, V) => {
      var H = V(764),
        N = V(675);
      U.exports = function (w) {
        var b = w.xdomain,
          _ = w.xscheme,
          z = w.enablesXDR;
        try {
          if (typeof XMLHttpRequest < "u" && (!b || H))
            return new XMLHttpRequest();
        } catch {}
        try {
          if (typeof XDomainRequest < "u" && !_ && z)
            return new XDomainRequest();
        } catch {}
        if (!b)
          try {
            return new N[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch {}
      };
    },
    337: (U, v, V) => {
      var z,
        H = V(593),
        N = V(988),
        w = V(933),
        b = V(498),
        _ = V(281);
      typeof ArrayBuffer < "u" && (z = V(958));
      var S = typeof navigator < "u" && /Android/i.test(navigator.userAgent),
        h = typeof navigator < "u" && /PhantomJS/i.test(navigator.userAgent),
        M = S || h;
      v.protocol = 3;
      var m = (v.packets = {
          open: 0,
          close: 1,
          ping: 2,
          pong: 3,
          message: 4,
          upgrade: 5,
          noop: 6,
        }),
        p = H(m),
        u = { type: "error", data: "parser error" },
        L = V(325);
      function b2(P, j, Y) {
        for (
          var X = new Array(P.length),
            J = b(P.length, Y),
            l2 = function (L2, V2, G2) {
              j(V2, function (T2, t1) {
                (X[L2] = t1), G2(T2, X);
              });
            },
            M2 = 0;
          M2 < P.length;
          M2++
        )
          l2(M2, P[M2], J);
      }
      (v.encodePacket = function (P, j, Y, X) {
        "function" == typeof j && ((X = j), (j = !1)),
          "function" == typeof Y && ((X = Y), (Y = null));
        var J = void 0 === P.data ? void 0 : P.data.buffer || P.data;
        if (typeof ArrayBuffer < "u" && J instanceof ArrayBuffer)
          return (function B(P, j, Y) {
            if (!j) return v.encodeBase64Packet(P, Y);
            var X = P.data,
              J = new Uint8Array(X),
              l2 = new Uint8Array(1 + X.byteLength);
            l2[0] = m[P.type];
            for (var M2 = 0; M2 < J.length; M2++) l2[M2 + 1] = J[M2];
            return Y(l2.buffer);
          })(P, j, X);
        if (typeof L < "u" && J instanceof L)
          return (function R(P, j, Y) {
            if (!j) return v.encodeBase64Packet(P, Y);
            if (M)
              return (function E(P, j, Y) {
                if (!j) return v.encodeBase64Packet(P, Y);
                var X = new FileReader();
                return (
                  (X.onload = function () {
                    v.encodePacket({ type: P.type, data: X.result }, j, !0, Y);
                  }),
                  X.readAsArrayBuffer(P.data)
                );
              })(P, j, Y);
            var X = new Uint8Array(1);
            return (X[0] = m[P.type]), Y(new L([X.buffer, P.data]));
          })(P, j, X);
        if (J && J.base64)
          return (function D(P, j) {
            return j("b" + v.packets[P.type] + P.data.data);
          })(P, X);
        var l2 = m[P.type];
        return (
          void 0 !== P.data &&
            (l2 += Y
              ? _.encode(String(P.data), { strict: !1 })
              : String(P.data)),
          X("" + l2)
        );
      }),
        (v.encodeBase64Packet = function (P, j) {
          var J,
            Y = "b" + v.packets[P.type];
          if (typeof L < "u" && P.data instanceof L) {
            var X = new FileReader();
            return (
              (X.onload = function () {
                var V2 = X.result.split(",")[1];
                j(Y + V2);
              }),
              X.readAsDataURL(P.data)
            );
          }
          try {
            J = String.fromCharCode.apply(null, new Uint8Array(P.data));
          } catch {
            for (
              var l2 = new Uint8Array(P.data),
                M2 = new Array(l2.length),
                L2 = 0;
              L2 < l2.length;
              L2++
            )
              M2[L2] = l2[L2];
            J = String.fromCharCode.apply(null, M2);
          }
          return (Y += btoa(J)), j(Y);
        }),
        (v.decodePacket = function (P, j, Y) {
          if (void 0 === P) return u;
          if ("string" == typeof P) {
            if ("b" === P.charAt(0))
              return v.decodeBase64Packet(P.substr(1), j);
            if (
              Y &&
              !1 ===
                (P = (function Q(P) {
                  try {
                    P = _.decode(P, { strict: !1 });
                  } catch {
                    return !1;
                  }
                  return P;
                })(P))
            )
              return u;
            var J = P.charAt(0);
            return Number(J) == J && p[J]
              ? P.length > 1
                ? { type: p[J], data: P.substring(1) }
                : { type: p[J] }
              : u;
          }
          J = new Uint8Array(P)[0];
          var l2 = w(P, 1);
          return (
            L && "blob" === j && (l2 = new L([l2])), { type: p[J], data: l2 }
          );
        }),
        (v.decodeBase64Packet = function (P, j) {
          var Y = p[P.charAt(0)];
          if (!z) return { type: Y, data: { base64: !0, data: P.substr(1) } };
          var X = z.decode(P.substr(1));
          return "blob" === j && L && (X = new L([X])), { type: Y, data: X };
        }),
        (v.encodePayload = function (P, j, Y) {
          "function" == typeof j && ((Y = j), (j = null));
          var X = N(P);
          return j && X
            ? L && !M
              ? v.encodePayloadAsBlob(P, Y)
              : v.encodePayloadAsArrayBuffer(P, Y)
            : P.length
            ? void b2(
                P,
                function l2(M2, L2) {
                  v.encodePacket(M2, !!X && j, !1, function (V2) {
                    L2(
                      null,
                      (function J(M2) {
                        return M2.length + ":" + M2;
                      })(V2)
                    );
                  });
                },
                function (M2, L2) {
                  return Y(L2.join(""));
                }
              )
            : Y("0:");
        }),
        (v.decodePayload = function (P, j, Y) {
          if ("string" != typeof P) return v.decodePayloadAsBinary(P, j, Y);
          var X;
          if (("function" == typeof j && ((Y = j), (j = null)), "" === P))
            return Y(u, 0, 1);
          for (var l2, M2, J = "", L2 = 0, V2 = P.length; L2 < V2; L2++) {
            var G2 = P.charAt(L2);
            if (":" === G2) {
              if (
                "" === J ||
                J != (l2 = Number(J)) ||
                J != (M2 = P.substr(L2 + 1, l2)).length
              )
                return Y(u, 0, 1);
              if (M2.length) {
                if (
                  ((X = v.decodePacket(M2, j, !1)),
                  u.type === X.type && u.data === X.data)
                )
                  return Y(u, 0, 1);
                if (!1 === Y(X, L2 + l2, V2)) return;
              }
              (L2 += l2), (J = "");
            } else J += G2;
          }
          return "" !== J ? Y(u, 0, 1) : void 0;
        }),
        (v.encodePayloadAsArrayBuffer = function (P, j) {
          if (!P.length) return j(new ArrayBuffer(0));
          b2(
            P,
            function Y(X, J) {
              v.encodePacket(X, !0, !0, function (l2) {
                return J(null, l2);
              });
            },
            function (X, J) {
              var l2 = J.reduce(function (V2, G2) {
                  var T2;
                  return (
                    V2 +
                    (T2 =
                      "string" == typeof G2
                        ? G2.length
                        : G2.byteLength).toString().length +
                    T2 +
                    2
                  );
                }, 0),
                M2 = new Uint8Array(l2),
                L2 = 0;
              return (
                J.forEach(function (V2) {
                  var G2 = "string" == typeof V2,
                    T2 = V2;
                  if (G2) {
                    for (
                      var N2 = new Uint8Array(V2.length), t1 = 0;
                      t1 < V2.length;
                      t1++
                    )
                      N2[t1] = V2.charCodeAt(t1);
                    T2 = N2.buffer;
                  }
                  M2[L2++] = G2 ? 0 : 1;
                  var x3 = T2.byteLength.toString();
                  for (t1 = 0; t1 < x3.length; t1++)
                    M2[L2++] = parseInt(x3[t1]);
                  for (
                    M2[L2++] = 255, N2 = new Uint8Array(T2), t1 = 0;
                    t1 < N2.length;
                    t1++
                  )
                    M2[L2++] = N2[t1];
                }),
                j(M2.buffer)
              );
            }
          );
        }),
        (v.encodePayloadAsBlob = function (P, j) {
          b2(
            P,
            function Y(X, J) {
              v.encodePacket(X, !0, !0, function (l2) {
                var M2 = new Uint8Array(1);
                if (((M2[0] = 1), "string" == typeof l2)) {
                  for (
                    var L2 = new Uint8Array(l2.length), V2 = 0;
                    V2 < l2.length;
                    V2++
                  )
                    L2[V2] = l2.charCodeAt(V2);
                  (l2 = L2.buffer), (M2[0] = 0);
                }
                var T2 = (
                    l2 instanceof ArrayBuffer ? l2.byteLength : l2.size
                  ).toString(),
                  t1 = new Uint8Array(T2.length + 1);
                for (V2 = 0; V2 < T2.length; V2++) t1[V2] = parseInt(T2[V2]);
                if (((t1[T2.length] = 255), L)) {
                  var x3 = new L([M2.buffer, t1.buffer, l2]);
                  J(null, x3);
                }
              });
            },
            function (X, J) {
              return j(new L(J));
            }
          );
        }),
        (v.decodePayloadAsBinary = function (P, j, Y) {
          "function" == typeof j && ((Y = j), (j = null));
          for (var X = P, J = []; X.byteLength > 0; ) {
            for (
              var l2 = new Uint8Array(X), M2 = 0 === l2[0], L2 = "", V2 = 1;
              255 !== l2[V2];
              V2++
            ) {
              if (L2.length > 310) return Y(u, 0, 1);
              L2 += l2[V2];
            }
            (X = w(X, 2 + L2.length)), (L2 = parseInt(L2));
            var G2 = w(X, 0, L2);
            if (M2)
              try {
                G2 = String.fromCharCode.apply(null, new Uint8Array(G2));
              } catch {
                var T2 = new Uint8Array(G2);
                for (G2 = "", V2 = 0; V2 < T2.length; V2++)
                  G2 += String.fromCharCode(T2[V2]);
              }
            J.push(G2), (X = w(X, L2));
          }
          var t1 = J.length;
          J.forEach(function (x3, N2) {
            Y(v.decodePacket(x3, j, !0), N2, t1);
          });
        });
    },
    593: (U) => {
      U.exports =
        Object.keys ||
        function (V) {
          var H = [],
            N = Object.prototype.hasOwnProperty;
          for (var w in V) N.call(V, w) && H.push(w);
          return H;
        };
    },
    281: (U) => {
      var h,
        M,
        m,
        v = String.fromCharCode;
      function V(u) {
        for (var E, R, L = [], D = 0, B = u.length; D < B; )
          (E = u.charCodeAt(D++)) >= 55296 && E <= 56319 && D < B
            ? 56320 == (64512 & (R = u.charCodeAt(D++)))
              ? L.push(((1023 & E) << 10) + (1023 & R) + 65536)
              : (L.push(E), D--)
            : L.push(E);
        return L;
      }
      function N(u, L) {
        if (u >= 55296 && u <= 57343) {
          if (L)
            throw Error(
              "Lone surrogate U+" +
                u.toString(16).toUpperCase() +
                " is not a scalar value"
            );
          return !1;
        }
        return !0;
      }
      function w(u, L) {
        return v(((u >> L) & 63) | 128);
      }
      function b(u, L) {
        if (0 == (4294967168 & u)) return v(u);
        var D = "";
        return (
          0 == (4294965248 & u)
            ? (D = v(((u >> 6) & 31) | 192))
            : 0 == (4294901760 & u)
            ? (N(u, L) || (u = 65533),
              (D = v(((u >> 12) & 15) | 224)),
              (D += w(u, 6)))
            : 0 == (4292870144 & u) &&
              ((D = v(((u >> 18) & 7) | 240)), (D += w(u, 12)), (D += w(u, 6))),
          D + v((63 & u) | 128)
        );
      }
      function z() {
        if (m >= M) throw Error("Invalid byte index");
        var u = 255 & h[m];
        if ((m++, 128 == (192 & u))) return 63 & u;
        throw Error("Invalid continuation byte");
      }
      function S(u) {
        var L, R;
        if (m > M) throw Error("Invalid byte index");
        if (m == M) return !1;
        if (((L = 255 & h[m]), m++, 0 == (128 & L))) return L;
        if (192 == (224 & L)) {
          if ((R = ((31 & L) << 6) | z()) >= 128) return R;
          throw Error("Invalid continuation byte");
        }
        if (224 == (240 & L)) {
          if ((R = ((15 & L) << 12) | (z() << 6) | z()) >= 2048)
            return N(R, u) ? R : 65533;
          throw Error("Invalid continuation byte");
        }
        if (
          240 == (248 & L) &&
          (R = ((7 & L) << 18) | (z() << 12) | (z() << 6) | z()) >= 65536 &&
          R <= 1114111
        )
          return R;
        throw Error("Invalid UTF-8 detected");
      }
      U.exports = {
        version: "2.1.2",
        encode: function _(u, L) {
          for (
            var D = !1 !== (L = L || {}).strict,
              B = V(u),
              E = B.length,
              R = -1,
              b2 = "";
            ++R < E;

          )
            b2 += b(B[R], D);
          return b2;
        },
        decode: function p(u, L) {
          var D = !1 !== (L = L || {}).strict;
          (h = V(u)), (M = h.length), (m = 0);
          for (var E, B = []; !1 !== (E = S(D)); ) B.push(E);
          return (function H(u) {
            for (var B, L = u.length, D = -1, E = ""; ++D < L; )
              (B = u[D]) > 65535 &&
                ((E += v((((B -= 65536) >>> 10) & 1023) | 55296)),
                (B = 56320 | (1023 & B))),
                (E += v(B));
            return E;
          })(B);
        },
      };
    },
    436: (U) => {
      var v = 1e3,
        V = 60 * v,
        H = 60 * V,
        N = 24 * H;
      function S(h, M, m) {
        if (!(h < M))
          return h < 1.5 * M
            ? Math.floor(h / M) + " " + m
            : Math.ceil(h / M) + " " + m + "s";
      }
      U.exports = function (h, M) {
        M = M || {};
        var m = typeof h;
        if ("string" === m && h.length > 0)
          return (function b(h) {
            if (!((h = String(h)).length > 100)) {
              var M =
                /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                  h
                );
              if (M) {
                var m = parseFloat(M[1]);
                switch ((M[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return 315576e5 * m;
                  case "days":
                  case "day":
                  case "d":
                    return m * N;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return m * H;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return m * V;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return m * v;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return m;
                  default:
                    return;
                }
              }
            }
          })(h);
        if ("number" === m && !1 === isNaN(h))
          return M.long
            ? (function z(h) {
                return (
                  S(h, N, "day") ||
                  S(h, H, "hour") ||
                  S(h, V, "minute") ||
                  S(h, v, "second") ||
                  h + " ms"
                );
              })(h)
            : (function _(h) {
                return h >= N
                  ? Math.round(h / N) + "d"
                  : h >= H
                  ? Math.round(h / H) + "h"
                  : h >= V
                  ? Math.round(h / V) + "m"
                  : h >= v
                  ? Math.round(h / v) + "s"
                  : h + "ms";
              })(h);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(h)
        );
      };
    },
    164: (U, v) => {
      (v.encode = function (V) {
        var H = "";
        for (var N in V)
          V.hasOwnProperty(N) &&
            (H.length && (H += "&"),
            (H += encodeURIComponent(N) + "=" + encodeURIComponent(V[N])));
        return H;
      }),
        (v.decode = function (V) {
          for (var H = {}, N = V.split("&"), w = 0, b = N.length; w < b; w++) {
            var _ = N[w].split("=");
            H[decodeURIComponent(_[0])] = decodeURIComponent(_[1]);
          }
          return H;
        });
    },
    312: (U) => {
      var v =
          /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        V = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      U.exports = function (b) {
        var _ = b,
          z = b.indexOf("["),
          S = b.indexOf("]");
        -1 != z &&
          -1 != S &&
          (b =
            b.substring(0, z) +
            b.substring(z, S).replace(/:/g, ";") +
            b.substring(S, b.length));
        for (var h = v.exec(b || ""), M = {}, m = 14; m--; )
          M[V[m]] = h[m] || "";
        return (
          -1 != z &&
            -1 != S &&
            ((M.source = _),
            (M.host = M.host
              .substring(1, M.host.length - 1)
              .replace(/;/g, ":")),
            (M.authority = M.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (M.ipv6uri = !0)),
          (M.pathNames = (function H(w, b) {
            var z = b.replace(/\/{2,9}/g, "/").split("/");
            return (
              ("/" == b.substr(0, 1) || 0 === b.length) && z.splice(0, 1),
              "/" == b.substr(b.length - 1, 1) && z.splice(z.length - 1, 1),
              z
            );
          })(0, M.path)),
          (M.queryKey = (function N(w, b) {
            var _ = {};
            return (
              b.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (z, S, h) {
                S && (_[S] = h);
              }),
              _
            );
          })(0, M.query)),
          M
        );
      };
    },
    38: (U, v, V) => {
      var H = V(800),
        N = V(113),
        w = V(797),
        b = V(462)("socket.io-client");
      U.exports = v = z;
      var _ = (v.managers = {});
      function z(S, h) {
        "object" == typeof S && ((h = S), (S = void 0)), (h = h || {});
        var B,
          M = H(S),
          m = M.source,
          p = M.id;
        return (
          h.forceNew ||
          h["force new connection"] ||
          !1 === h.multiplex ||
          (_[p] && M.path in _[p].nsps)
            ? (b("ignoring socket cache for %s", m), (B = w(m, h)))
            : (_[p] || (b("new io instance for %s", m), (_[p] = w(m, h))),
              (B = _[p])),
          M.query && !h.query && (h.query = M.query),
          B.socket(M.path, h)
        );
      }
      (v.protocol = N.protocol),
        (v.connect = z),
        (v.Manager = V(797)),
        (v.Socket = V(219));
    },
    797: (U, v, V) => {
      var H = V(92),
        N = V(219),
        w = V(264),
        b = V(113),
        _ = V(320),
        z = V(213),
        S = V(462)("socket.io-client:manager"),
        h = V(68),
        M = V(150),
        m = Object.prototype.hasOwnProperty;
      function p(u, L) {
        if (!(this instanceof p)) return new p(u, L);
        u && "object" == typeof u && ((L = u), (u = void 0)),
          ((L = L || {}).path = L.path || "/socket.io"),
          (this.nsps = {}),
          (this.subs = []),
          (this.opts = L),
          this.reconnection(!1 !== L.reconnection),
          this.reconnectionAttempts(L.reconnectionAttempts || 1 / 0),
          this.reconnectionDelay(L.reconnectionDelay || 1e3),
          this.reconnectionDelayMax(L.reconnectionDelayMax || 5e3),
          this.randomizationFactor(L.randomizationFactor || 0.5),
          (this.backoff = new M({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
          })),
          this.timeout(L.timeout ?? 2e4),
          (this.readyState = "closed"),
          (this.uri = u),
          (this.connecting = []),
          (this.lastPing = null),
          (this.encoding = !1),
          (this.packetBuffer = []);
        var D = L.parser || b;
        (this.encoder = new D.Encoder()),
          (this.decoder = new D.Decoder()),
          (this.autoConnect = !1 !== L.autoConnect),
          this.autoConnect && this.open();
      }
      (U.exports = p),
        (p.prototype.emitAll = function () {
          for (var u in (this.emit.apply(this, arguments), this.nsps))
            m.call(this.nsps, u) &&
              this.nsps[u].emit.apply(this.nsps[u], arguments);
        }),
        (p.prototype.updateSocketIds = function () {
          for (var u in this.nsps)
            m.call(this.nsps, u) && (this.nsps[u].id = this.generateId(u));
        }),
        (p.prototype.generateId = function (u) {
          return ("/" === u ? "" : u + "#") + this.engine.id;
        }),
        w(p.prototype),
        (p.prototype.reconnection = function (u) {
          return arguments.length
            ? ((this._reconnection = !!u), this)
            : this._reconnection;
        }),
        (p.prototype.reconnectionAttempts = function (u) {
          return arguments.length
            ? ((this._reconnectionAttempts = u), this)
            : this._reconnectionAttempts;
        }),
        (p.prototype.reconnectionDelay = function (u) {
          return arguments.length
            ? ((this._reconnectionDelay = u),
              this.backoff && this.backoff.setMin(u),
              this)
            : this._reconnectionDelay;
        }),
        (p.prototype.randomizationFactor = function (u) {
          return arguments.length
            ? ((this._randomizationFactor = u),
              this.backoff && this.backoff.setJitter(u),
              this)
            : this._randomizationFactor;
        }),
        (p.prototype.reconnectionDelayMax = function (u) {
          return arguments.length
            ? ((this._reconnectionDelayMax = u),
              this.backoff && this.backoff.setMax(u),
              this)
            : this._reconnectionDelayMax;
        }),
        (p.prototype.timeout = function (u) {
          return arguments.length ? ((this._timeout = u), this) : this._timeout;
        }),
        (p.prototype.maybeReconnectOnOpen = function () {
          !this.reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }),
        (p.prototype.open = p.prototype.connect =
          function (u, L) {
            if (
              (S("readyState %s", this.readyState),
              ~this.readyState.indexOf("open"))
            )
              return this;
            S("opening %s", this.uri), (this.engine = H(this.uri, this.opts));
            var D = this.engine,
              B = this;
            (this.readyState = "opening"), (this.skipReconnect = !1);
            var E = _(D, "open", function () {
                B.onopen(), u && u();
              }),
              R = _(D, "error", function (P) {
                if (
                  (S("connect_error"),
                  B.cleanup(),
                  (B.readyState = "closed"),
                  B.emitAll("connect_error", P),
                  u)
                ) {
                  var j = new Error("Connection error");
                  (j.data = P), u(j);
                } else B.maybeReconnectOnOpen();
              });
            if (!1 !== this._timeout) {
              var Q = this._timeout;
              S("connect attempt will timeout after %d", Q),
                0 === Q && E.destroy();
              var b2 = setTimeout(function () {
                S("connect attempt timed out after %d", Q),
                  E.destroy(),
                  D.close(),
                  D.emit("error", "timeout"),
                  B.emitAll("connect_timeout", Q);
              }, Q);
              this.subs.push({
                destroy: function () {
                  clearTimeout(b2);
                },
              });
            }
            return this.subs.push(E), this.subs.push(R), this;
          }),
        (p.prototype.onopen = function () {
          S("open"),
            this.cleanup(),
            (this.readyState = "open"),
            this.emit("open");
          var u = this.engine;
          this.subs.push(_(u, "data", z(this, "ondata"))),
            this.subs.push(_(u, "ping", z(this, "onping"))),
            this.subs.push(_(u, "pong", z(this, "onpong"))),
            this.subs.push(_(u, "error", z(this, "onerror"))),
            this.subs.push(_(u, "close", z(this, "onclose"))),
            this.subs.push(_(this.decoder, "decoded", z(this, "ondecoded")));
        }),
        (p.prototype.onping = function () {
          (this.lastPing = new Date()), this.emitAll("ping");
        }),
        (p.prototype.onpong = function () {
          this.emitAll("pong", new Date() - this.lastPing);
        }),
        (p.prototype.ondata = function (u) {
          this.decoder.add(u);
        }),
        (p.prototype.ondecoded = function (u) {
          this.emit("packet", u);
        }),
        (p.prototype.onerror = function (u) {
          S("error", u), this.emitAll("error", u);
        }),
        (p.prototype.socket = function (u, L) {
          var D = this.nsps[u];
          if (!D) {
            (D = new N(this, u, L)), (this.nsps[u] = D);
            var B = this;
            D.on("connecting", E),
              D.on("connect", function () {
                D.id = B.generateId(u);
              }),
              this.autoConnect && E();
          }
          function E() {
            ~h(B.connecting, D) || B.connecting.push(D);
          }
          return D;
        }),
        (p.prototype.destroy = function (u) {
          var L = h(this.connecting, u);
          ~L && this.connecting.splice(L, 1),
            !this.connecting.length && this.close();
        }),
        (p.prototype.packet = function (u) {
          S("writing packet %j", u);
          var L = this;
          u.query && 0 === u.type && (u.nsp += "?" + u.query),
            L.encoding
              ? L.packetBuffer.push(u)
              : ((L.encoding = !0),
                this.encoder.encode(u, function (D) {
                  for (var B = 0; B < D.length; B++)
                    L.engine.write(D[B], u.options);
                  (L.encoding = !1), L.processPacketQueue();
                }));
        }),
        (p.prototype.processPacketQueue = function () {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var u = this.packetBuffer.shift();
            this.packet(u);
          }
        }),
        (p.prototype.cleanup = function () {
          S("cleanup");
          for (var u = this.subs.length, L = 0; L < u; L++)
            this.subs.shift().destroy();
          (this.packetBuffer = []),
            (this.encoding = !1),
            (this.lastPing = null),
            this.decoder.destroy();
        }),
        (p.prototype.close = p.prototype.disconnect =
          function () {
            S("disconnect"),
              (this.skipReconnect = !0),
              (this.reconnecting = !1),
              "opening" === this.readyState && this.cleanup(),
              this.backoff.reset(),
              (this.readyState = "closed"),
              this.engine && this.engine.close();
          }),
        (p.prototype.onclose = function (u) {
          S("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.emit("close", u),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }),
        (p.prototype.reconnect = function () {
          if (this.reconnecting || this.skipReconnect) return this;
          var u = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            S("reconnect failed"),
              this.backoff.reset(),
              this.emitAll("reconnect_failed"),
              (this.reconnecting = !1);
          else {
            var L = this.backoff.duration();
            S("will wait %dms before reconnect attempt", L),
              (this.reconnecting = !0);
            var D = setTimeout(function () {
              u.skipReconnect ||
                (S("attempting reconnect"),
                u.emitAll("reconnect_attempt", u.backoff.attempts),
                u.emitAll("reconnecting", u.backoff.attempts),
                !u.skipReconnect &&
                  u.open(function (B) {
                    B
                      ? (S("reconnect attempt error"),
                        (u.reconnecting = !1),
                        u.reconnect(),
                        u.emitAll("reconnect_error", B.data))
                      : (S("reconnect success"), u.onreconnect());
                  }));
            }, L);
            this.subs.push({
              destroy: function () {
                clearTimeout(D);
              },
            });
          }
        }),
        (p.prototype.onreconnect = function () {
          var u = this.backoff.attempts;
          (this.reconnecting = !1),
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", u);
        });
    },
    320: (U) => {
      U.exports = function v(V, H, N) {
        return (
          V.on(H, N),
          {
            destroy: function () {
              V.removeListener(H, N);
            },
          }
        );
      };
    },
    219: (U, v, V) => {
      var H = V(113),
        N = V(264),
        w = V(898),
        b = V(320),
        _ = V(213),
        z = V(462)("socket.io-client:socket"),
        S = V(164),
        h = V(988);
      U.exports = p;
      var M = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1,
        },
        m = N.prototype.emit;
      function p(u, L, D) {
        (this.io = u),
          (this.nsp = L),
          (this.json = this),
          (this.ids = 0),
          (this.acks = {}),
          (this.receiveBuffer = []),
          (this.sendBuffer = []),
          (this.connected = !1),
          (this.disconnected = !0),
          (this.flags = {}),
          D && D.query && (this.query = D.query),
          this.io.autoConnect && this.open();
      }
      N(p.prototype),
        (p.prototype.subEvents = function () {
          if (!this.subs) {
            var u = this.io;
            this.subs = [
              b(u, "open", _(this, "onopen")),
              b(u, "packet", _(this, "onpacket")),
              b(u, "close", _(this, "onclose")),
            ];
          }
        }),
        (p.prototype.open = p.prototype.connect =
          function () {
            return (
              this.connected ||
                (this.subEvents(),
                this.io.reconnecting || this.io.open(),
                "open" === this.io.readyState && this.onopen(),
                this.emit("connecting")),
              this
            );
          }),
        (p.prototype.send = function () {
          var u = w(arguments);
          return u.unshift("message"), this.emit.apply(this, u), this;
        }),
        (p.prototype.emit = function (u) {
          if (M.hasOwnProperty(u)) return m.apply(this, arguments), this;
          var L = w(arguments),
            D = {
              type: (void 0 !== this.flags.binary ? this.flags.binary : h(L))
                ? H.BINARY_EVENT
                : H.EVENT,
              data: L,
              options: {},
            };
          return (
            (D.options.compress = !this.flags || !1 !== this.flags.compress),
            "function" == typeof L[L.length - 1] &&
              (z("emitting packet with ack id %d", this.ids),
              (this.acks[this.ids] = L.pop()),
              (D.id = this.ids++)),
            this.connected ? this.packet(D) : this.sendBuffer.push(D),
            (this.flags = {}),
            this
          );
        }),
        (p.prototype.packet = function (u) {
          (u.nsp = this.nsp), this.io.packet(u);
        }),
        (p.prototype.onopen = function () {
          if ((z("transport is open - connecting"), "/" !== this.nsp))
            if (this.query) {
              var u =
                "object" == typeof this.query
                  ? S.encode(this.query)
                  : this.query;
              z("sending connect packet with query %s", u),
                this.packet({ type: H.CONNECT, query: u });
            } else this.packet({ type: H.CONNECT });
        }),
        (p.prototype.onclose = function (u) {
          z("close (%s)", u),
            (this.connected = !1),
            (this.disconnected = !0),
            delete this.id,
            this.emit("disconnect", u);
        }),
        (p.prototype.onpacket = function (u) {
          if (u.nsp === this.nsp || (u.type === H.ERROR && "/" === u.nsp))
            switch (u.type) {
              case H.CONNECT:
                this.onconnect();
                break;
              case H.EVENT:
              case H.BINARY_EVENT:
                this.onevent(u);
                break;
              case H.ACK:
              case H.BINARY_ACK:
                this.onack(u);
                break;
              case H.DISCONNECT:
                this.ondisconnect();
                break;
              case H.ERROR:
                this.emit("error", u.data);
            }
        }),
        (p.prototype.onevent = function (u) {
          var L = u.data || [];
          z("emitting event %j", L),
            null != u.id &&
              (z("attaching ack callback to event"), L.push(this.ack(u.id))),
            this.connected ? m.apply(this, L) : this.receiveBuffer.push(L);
        }),
        (p.prototype.ack = function (u) {
          var L = this,
            D = !1;
          return function () {
            if (!D) {
              D = !0;
              var B = w(arguments);
              z("sending ack %j", B),
                L.packet({ type: h(B) ? H.BINARY_ACK : H.ACK, id: u, data: B });
            }
          };
        }),
        (p.prototype.onack = function (u) {
          var L = this.acks[u.id];
          "function" == typeof L
            ? (z("calling ack %s with %j", u.id, u.data),
              L.apply(this, u.data),
              delete this.acks[u.id])
            : z("bad ack %s", u.id);
        }),
        (p.prototype.onconnect = function () {
          (this.connected = !0),
            (this.disconnected = !1),
            this.emit("connect"),
            this.emitBuffered();
        }),
        (p.prototype.emitBuffered = function () {
          var u;
          for (u = 0; u < this.receiveBuffer.length; u++)
            m.apply(this, this.receiveBuffer[u]);
          for (this.receiveBuffer = [], u = 0; u < this.sendBuffer.length; u++)
            this.packet(this.sendBuffer[u]);
          this.sendBuffer = [];
        }),
        (p.prototype.ondisconnect = function () {
          z("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect");
        }),
        (p.prototype.destroy = function () {
          if (this.subs) {
            for (var u = 0; u < this.subs.length; u++) this.subs[u].destroy();
            this.subs = null;
          }
          this.io.destroy(this);
        }),
        (p.prototype.close = p.prototype.disconnect =
          function () {
            return (
              this.connected &&
                (z("performing disconnect (%s)", this.nsp),
                this.packet({ type: H.DISCONNECT })),
              this.destroy(),
              this.connected && this.onclose("io client disconnect"),
              this
            );
          }),
        (p.prototype.compress = function (u) {
          return (this.flags.compress = u), this;
        }),
        (p.prototype.binary = function (u) {
          return (this.flags.binary = u), this;
        });
    },
    800: (U, v, V) => {
      var H = V(312),
        N = V(462)("socket.io-client:url");
      U.exports = function w(b, _) {
        var z = b;
        (_ = _ || (typeof location < "u" && location)),
          null == b && (b = _.protocol + "//" + _.host),
          "string" == typeof b &&
            ("/" === b.charAt(0) &&
              (b = "/" === b.charAt(1) ? _.protocol + b : _.host + b),
            /^(https?|wss?):\/\//.test(b) ||
              (N("protocol-less url %s", b),
              (b = typeof _ < "u" ? _.protocol + "//" + b : "https://" + b)),
            N("parse %s", b),
            (z = H(b))),
          z.port ||
            (/^(http|ws)$/.test(z.protocol)
              ? (z.port = "80")
              : /^(http|ws)s$/.test(z.protocol) && (z.port = "443")),
          (z.path = z.path || "/");
        var h = -1 !== z.host.indexOf(":") ? "[" + z.host + "]" : z.host;
        return (
          (z.id = z.protocol + "://" + h + ":" + z.port),
          (z.href =
            z.protocol +
            "://" +
            h +
            (_ && _.port === z.port ? "" : ":" + z.port)),
          z
        );
      };
    },
    53: (U, v, V) => {
      var H = V(425),
        N = V(761),
        w = Object.prototype.toString,
        b =
          "function" == typeof Blob ||
          (typeof Blob < "u" && "[object BlobConstructor]" === w.call(Blob)),
        _ =
          "function" == typeof File ||
          (typeof File < "u" && "[object FileConstructor]" === w.call(File));
      function z(h, M) {
        if (!h) return h;
        if (N(h)) {
          var m = { _placeholder: !0, num: M.length };
          return M.push(h), m;
        }
        if (H(h)) {
          for (var p = new Array(h.length), u = 0; u < h.length; u++)
            p[u] = z(h[u], M);
          return p;
        }
        if ("object" == typeof h && !(h instanceof Date)) {
          for (var L in ((p = {}), h)) p[L] = z(h[L], M);
          return p;
        }
        return h;
      }
      function S(h, M) {
        if (!h) return h;
        if (h && h._placeholder) return M[h.num];
        if (H(h)) for (var m = 0; m < h.length; m++) h[m] = S(h[m], M);
        else if ("object" == typeof h) for (var p in h) h[p] = S(h[p], M);
        return h;
      }
      (v.deconstructPacket = function (h) {
        var M = [],
          p = h;
        return (
          (p.data = z(h.data, M)),
          (p.attachments = M.length),
          { packet: p, buffers: M }
        );
      }),
        (v.reconstructPacket = function (h, M) {
          return (h.data = S(h.data, M)), (h.attachments = void 0), h;
        }),
        (v.removeBlobs = function (h, M) {
          var p = 0,
            u = h;
          (function m(L, D, B) {
            if (!L) return L;
            if ((b && L instanceof Blob) || (_ && L instanceof File)) {
              p++;
              var E = new FileReader();
              (E.onload = function () {
                B ? (B[D] = this.result) : (u = this.result), --p || M(u);
              }),
                E.readAsArrayBuffer(L);
            } else if (H(L)) for (var R = 0; R < L.length; R++) m(L[R], R, L);
            else if ("object" == typeof L && !N(L))
              for (var Q in L) m(L[Q], Q, L);
          })(u),
            p || M(u);
        });
    },
    113: (U, v, V) => {
      var H = V(604)("socket.io-parser"),
        N = V(264),
        w = V(53),
        b = V(425),
        _ = V(761);
      function z() {}
      (v.protocol = 4),
        (v.types = [
          "CONNECT",
          "DISCONNECT",
          "EVENT",
          "ACK",
          "ERROR",
          "BINARY_EVENT",
          "BINARY_ACK",
        ]),
        (v.CONNECT = 0),
        (v.DISCONNECT = 1),
        (v.EVENT = 2),
        (v.ACK = 3),
        (v.ERROR = 4),
        (v.BINARY_EVENT = 5),
        (v.BINARY_ACK = 6),
        (v.Encoder = z),
        (v.Decoder = p);
      var S = v.ERROR + '"encode error"';
      function h(E) {
        var R = "" + E.type;
        if (
          ((v.BINARY_EVENT === E.type || v.BINARY_ACK === E.type) &&
            (R += E.attachments + "-"),
          E.nsp && "/" !== E.nsp && (R += E.nsp + ","),
          null != E.id && (R += E.id),
          null != E.data)
        ) {
          var Q = (function M(E) {
            try {
              return JSON.stringify(E);
            } catch {
              return !1;
            }
          })(E.data);
          if (!1 === Q) return S;
          R += Q;
        }
        return H("encoded %j as %s", E, R), R;
      }
      function p() {
        this.reconstructor = null;
      }
      function D(E) {
        (this.reconPack = E), (this.buffers = []);
      }
      function B(E) {
        return { type: v.ERROR, data: "parser error: " + E };
      }
      (z.prototype.encode = function (E, R) {
        H("encoding packet %j", E),
          v.BINARY_EVENT === E.type || v.BINARY_ACK === E.type
            ? (function m(E, R) {
                w.removeBlobs(E, function Q(b2) {
                  var P = w.deconstructPacket(b2),
                    j = h(P.packet),
                    Y = P.buffers;
                  Y.unshift(j), R(Y);
                });
              })(E, R)
            : R([h(E)]);
      }),
        N(p.prototype),
        (p.prototype.add = function (E) {
          var R;
          if ("string" == typeof E)
            (R = (function u(E) {
              var R = 0,
                Q = { type: Number(E.charAt(0)) };
              if (null == v.types[Q.type])
                return B("unknown packet type " + Q.type);
              if (v.BINARY_EVENT === Q.type || v.BINARY_ACK === Q.type) {
                for (var b2 = R + 1; "-" !== E.charAt(++R) && R != E.length; );
                var P = E.substring(b2, R);
                if (P != Number(P) || "-" !== E.charAt(R))
                  throw new Error("Illegal attachments");
                Q.attachments = Number(P);
              }
              if ("/" === E.charAt(R + 1)) {
                for (
                  b2 = R + 1;
                  ++R && "," !== (j = E.charAt(R)) && R !== E.length;

                );
                Q.nsp = E.substring(b2, R);
              } else Q.nsp = "/";
              var Y = E.charAt(R + 1);
              if ("" !== Y && Number(Y) == Y) {
                for (b2 = R + 1; ++R; ) {
                  var j;
                  if (null == (j = E.charAt(R)) || Number(j) != j) {
                    --R;
                    break;
                  }
                  if (R === E.length) break;
                }
                Q.id = Number(E.substring(b2, R + 1));
              }
              if (E.charAt(++R)) {
                var X = (function L(E) {
                  try {
                    return JSON.parse(E);
                  } catch {
                    return !1;
                  }
                })(E.substr(R));
                if (!1 === X || (Q.type !== v.ERROR && !b(X)))
                  return B("invalid payload");
                Q.data = X;
              }
              return H("decoded %s as %j", E, Q), Q;
            })(E)),
              v.BINARY_EVENT === R.type || v.BINARY_ACK === R.type
                ? ((this.reconstructor = new D(R)),
                  0 === this.reconstructor.reconPack.attachments &&
                    this.emit("decoded", R))
                : this.emit("decoded", R);
          else {
            if (!_(E) && !E.base64) throw new Error("Unknown type: " + E);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (R = this.reconstructor.takeBinaryData(E)) &&
              ((this.reconstructor = null), this.emit("decoded", R));
          }
        }),
        (p.prototype.destroy = function () {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }),
        (D.prototype.takeBinaryData = function (E) {
          if (
            (this.buffers.push(E),
            this.buffers.length === this.reconPack.attachments)
          ) {
            var R = w.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), R;
          }
          return null;
        }),
        (D.prototype.finishedReconstruction = function () {
          (this.reconPack = null), (this.buffers = []);
        });
    },
    761: (U) => {
      U.exports = function N(w) {
        return (
          (v && Buffer.isBuffer(w)) ||
          (V &&
            (w instanceof ArrayBuffer ||
              (function (w) {
                return "function" == typeof ArrayBuffer.isView
                  ? ArrayBuffer.isView(w)
                  : w.buffer instanceof ArrayBuffer;
              })(w)))
        );
      };
      var v =
          "function" == typeof Buffer && "function" == typeof Buffer.isBuffer,
        V = "function" == typeof ArrayBuffer;
    },
    604: (U, v, V) => {
      function _() {
        var S;
        try {
          S = v.storage.debug;
        } catch {}
        return (
          !S &&
            typeof process < "u" &&
            "env" in process &&
            (S = process.env.DEBUG),
          S
        );
      }
      ((v = U.exports = V(257)).log = function w() {
        return (
          "object" == typeof console &&
          console.log &&
          Function.prototype.apply.call(console.log, console, arguments)
        );
      }),
        (v.formatArgs = function N(S) {
          var h = this.useColors;
          if (
            ((S[0] =
              (h ? "%c" : "") +
              this.namespace +
              (h ? " %c" : " ") +
              S[0] +
              (h ? "%c " : " ") +
              "+" +
              v.humanize(this.diff)),
            h)
          ) {
            var M = "color: " + this.color;
            S.splice(1, 0, M, "color: inherit");
            var m = 0,
              p = 0;
            S[0].replace(/%[a-zA-Z%]/g, function (u) {
              "%%" !== u && (m++, "%c" === u && (p = m));
            }),
              S.splice(p, 0, M);
          }
        }),
        (v.save = function b(S) {
          try {
            null == S ? v.storage.removeItem("debug") : (v.storage.debug = S);
          } catch {}
        }),
        (v.load = _),
        (v.useColors = function H() {
          return (
            !!(
              typeof window < "u" &&
              window.process &&
              "renderer" === window.process.type
            ) ||
            (!(
              typeof navigator < "u" &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
            ) &&
              ((typeof document < "u" &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                (typeof window < "u" &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                (typeof navigator < "u" &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                (typeof navigator < "u" &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }),
        (v.storage =
          typeof chrome < "u" && typeof chrome.storage < "u"
            ? chrome.storage.local
            : (function z() {
                try {
                  return window.localStorage;
                } catch {}
              })()),
        (v.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33",
        ]),
        (v.formatters.j = function (S) {
          try {
            return JSON.stringify(S);
          } catch (h) {
            return "[UnexpectedJSONParseError]: " + h.message;
          }
        }),
        v.enable(_());
    },
    257: (U, v, V) => {
      function N(h) {
        var M;
        function m() {
          if (m.enabled) {
            var p = m,
              u = +new Date(),
              L = u - (M || u);
            (p.diff = L), (p.prev = M), (p.curr = u), (M = u);
            for (var D = new Array(arguments.length), B = 0; B < D.length; B++)
              D[B] = arguments[B];
            (D[0] = v.coerce(D[0])), "string" != typeof D[0] && D.unshift("%O");
            var E = 0;
            (D[0] = D[0].replace(/%([a-zA-Z%])/g, function (Q, b2) {
              if ("%%" === Q) return Q;
              E++;
              var P = v.formatters[b2];
              return (
                "function" == typeof P &&
                  ((Q = P.call(p, D[E])), D.splice(E, 1), E--),
                Q
              );
            })),
              v.formatArgs.call(p, D);
            var R = m.log || v.log || console.log.bind(console);
            R.apply(p, D);
          }
        }
        return (
          (m.namespace = h),
          (m.enabled = v.enabled(h)),
          (m.useColors = v.useColors()),
          (m.color = (function H(h) {
            var m,
              M = 0;
            for (m in h) (M = (M << 5) - M + h.charCodeAt(m)), (M |= 0);
            return v.colors[Math.abs(M) % v.colors.length];
          })(h)),
          (m.destroy = w),
          "function" == typeof v.init && v.init(m),
          v.instances.push(m),
          m
        );
      }
      function w() {
        var h = v.instances.indexOf(this);
        return -1 !== h && (v.instances.splice(h, 1), !0);
      }
      ((v = U.exports = N.debug = N.default = N).coerce = function S(h) {
        return h instanceof Error ? h.stack || h.message : h;
      }),
        (v.disable = function _() {
          v.enable("");
        }),
        (v.enable = function b(h) {
          v.save(h), (v.names = []), (v.skips = []);
          var M,
            m = ("string" == typeof h ? h : "").split(/[\s,]+/),
            p = m.length;
          for (M = 0; M < p; M++)
            !m[M] ||
              ("-" === (h = m[M].replace(/\*/g, ".*?"))[0]
                ? v.skips.push(new RegExp("^" + h.substr(1) + "$"))
                : v.names.push(new RegExp("^" + h + "$")));
          for (M = 0; M < v.instances.length; M++) {
            var u = v.instances[M];
            u.enabled = v.enabled(u.namespace);
          }
        }),
        (v.enabled = function z(h) {
          if ("*" === h[h.length - 1]) return !0;
          var M, m;
          for (M = 0, m = v.skips.length; M < m; M++)
            if (v.skips[M].test(h)) return !1;
          for (M = 0, m = v.names.length; M < m; M++)
            if (v.names[M].test(h)) return !0;
          return !1;
        }),
        (v.humanize = V(156)),
        (v.instances = []),
        (v.names = []),
        (v.skips = []),
        (v.formatters = {});
    },
    156: (U) => {
      var v = 1e3,
        V = 60 * v,
        H = 60 * V,
        N = 24 * H;
      function S(h, M, m) {
        if (!(h < M))
          return h < 1.5 * M
            ? Math.floor(h / M) + " " + m
            : Math.ceil(h / M) + " " + m + "s";
      }
      U.exports = function (h, M) {
        M = M || {};
        var m = typeof h;
        if ("string" === m && h.length > 0)
          return (function b(h) {
            if (!((h = String(h)).length > 100)) {
              var M =
                /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                  h
                );
              if (M) {
                var m = parseFloat(M[1]);
                switch ((M[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return 315576e5 * m;
                  case "days":
                  case "day":
                  case "d":
                    return m * N;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return m * H;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return m * V;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return m * v;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return m;
                  default:
                    return;
                }
              }
            }
          })(h);
        if ("number" === m && !1 === isNaN(h))
          return M.long
            ? (function z(h) {
                return (
                  S(h, N, "day") ||
                  S(h, H, "hour") ||
                  S(h, V, "minute") ||
                  S(h, v, "second") ||
                  h + " ms"
                );
              })(h)
            : (function _(h) {
                return h >= N
                  ? Math.round(h / N) + "d"
                  : h >= H
                  ? Math.round(h / H) + "h"
                  : h >= V
                  ? Math.round(h / V) + "m"
                  : h >= v
                  ? Math.round(h / v) + "s"
                  : h + "ms";
              })(h);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(h)
        );
      };
    },
    898: (U) => {
      U.exports = function v(V, H) {
        for (var N = [], w = (H = H || 0) || 0; w < V.length; w++)
          N[w - H] = V[w];
        return N;
      };
    },
    379: (U) => {
      "use strict";
      var b,
        v =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
          ),
        H = {},
        N = 0,
        w = 0;
      function _(h) {
        var M = "";
        do {
          (M = v[h % 64] + M), (h = Math.floor(h / 64));
        } while (h > 0);
        return M;
      }
      function S() {
        var h = _(+new Date());
        return h !== b ? ((N = 0), (b = h)) : h + "." + _(N++);
      }
      for (; w < 64; w++) H[v[w]] = w;
      (S.encode = _),
        (S.decode = function z(h) {
          var M = 0;
          for (w = 0; w < h.length; w++) M = 64 * M + H[h.charAt(w)];
          return M;
        }),
        (U.exports = S);
    },
    997: () => {},
  },
  (U) => {
    U((U.s = 470));
  },
]);
