(function (at) {
  typeof define == "function" && define.amd ? define(at) : at();
})(function () {
  "use strict";
  function at(u) {
    if (u === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return u;
  }
  function mi(u, t) {
    (u.prototype = Object.create(t.prototype)),
      (u.prototype.constructor = u),
      (u.__proto__ = t);
  }
  /*!
   * GSAP 3.12.7
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var tt = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    Bt = { duration: 0.5, overwrite: !1, delay: 0 },
    Me,
    X,
    A,
    lt = 1e8,
    G = 1 / lt,
    De = Math.PI * 2,
    Er = De / 4,
    zr = 0,
    gi = Math.sqrt,
    Fr = Math.cos,
    Lr = Math.sin,
    B = function (t) {
      return typeof t == "string";
    },
    F = function (t) {
      return typeof t == "function";
    },
    mt = function (t) {
      return typeof t == "number";
    },
    Ae = function (t) {
      return typeof t > "u";
    },
    ht = function (t) {
      return typeof t == "object";
    },
    Q = function (t) {
      return t !== !1;
    },
    Re = function () {
      return typeof window < "u";
    },
    de = function (t) {
      return F(t) || B(t);
    },
    yi =
      (typeof ArrayBuffer == "function" && ArrayBuffer.isView) ||
      function () {},
    W = Array.isArray,
    Ee = /(?:-?\.?\d|\.)+/gi,
    xi = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Ut = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    ze = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    Ti = /[+-]=-?[.\d]+/,
    vi = /[^,'"\[\]\s]+/gi,
    Ir = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    E,
    _t,
    Fe,
    Le,
    et = {},
    pe = {},
    wi,
    bi = function (t) {
      return (pe = Xt(t, et)) && H;
    },
    Ie = function (t, e) {
      return console.warn(
        "Invalid property",
        t,
        "set to",
        e,
        "Missing plugin? gsap.registerPlugin()"
      );
    },
    Ht = function (t, e) {
      return !e && console.warn(t);
    },
    Pi = function (t, e) {
      return (t && (et[t] = e) && pe && (pe[t] = e)) || et;
    },
    Jt = function () {
      return 0;
    },
    Nr = { suppressEvents: !0, isStart: !0, kill: !1 },
    me = { suppressEvents: !0, kill: !1 },
    Vr = { suppressEvents: !0 },
    Ne = {},
    Tt = [],
    Ve = {},
    Si,
    it = {},
    Be = {},
    ki = 30,
    ge = [],
    Ue = "",
    Ye = function (t) {
      var e = t[0],
        i,
        r;
      if ((ht(e) || F(e) || (t = [t]), !(i = (e._gsap || {}).harness))) {
        for (r = ge.length; r-- && !ge[r].targetTest(e); );
        i = ge[r];
      }
      for (r = t.length; r--; )
        (t[r] && (t[r]._gsap || (t[r]._gsap = new er(t[r], i)))) ||
          t.splice(r, 1);
      return t;
    },
    Ct = function (t) {
      return t._gsap || Ye(ut(t))[0]._gsap;
    },
    Oi = function (t, e, i) {
      return (i = t[e]) && F(i)
        ? t[e]()
        : (Ae(i) && t.getAttribute && t.getAttribute(e)) || i;
    },
    Z = function (t, e) {
      return (t = t.split(",")).forEach(e) || t;
    },
    L = function (t) {
      return Math.round(t * 1e5) / 1e5 || 0;
    },
    I = function (t) {
      return Math.round(t * 1e7) / 1e7 || 0;
    },
    Yt = function (t, e) {
      var i = e.charAt(0),
        r = parseFloat(e.substr(2));
      return (
        (t = parseFloat(t)),
        i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r
      );
    },
    Br = function (t, e) {
      for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; );
      return r < i;
    },
    ye = function () {
      var t = Tt.length,
        e = Tt.slice(0),
        i,
        r;
      for (Ve = {}, Tt.length = 0, i = 0; i < t; i++)
        (r = e[i]),
          r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
    },
    Ci = function (t, e, i, r) {
      Tt.length && !X && ye(),
        t.render(e, i, X && e < 0 && (t._initted || t._startAt)),
        Tt.length && !X && ye();
    },
    Mi = function (t) {
      var e = parseFloat(t);
      return (e || e === 0) && (t + "").match(vi).length < 2
        ? e
        : B(t)
        ? t.trim()
        : t;
    },
    Di = function (t) {
      return t;
    },
    rt = function (t, e) {
      for (var i in e) i in t || (t[i] = e[i]);
      return t;
    },
    Ur = function (t) {
      return function (e, i) {
        for (var r in i)
          r in e || (r === "duration" && t) || r === "ease" || (e[r] = i[r]);
      };
    },
    Xt = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    },
    Ai = function u(t, e) {
      for (var i in e)
        i !== "__proto__" &&
          i !== "constructor" &&
          i !== "prototype" &&
          (t[i] = ht(e[i]) ? u(t[i] || (t[i] = {}), e[i]) : e[i]);
      return t;
    },
    xe = function (t, e) {
      var i = {},
        r;
      for (r in t) r in e || (i[r] = t[r]);
      return i;
    },
    te = function (t) {
      var e = t.parent || E,
        i = t.keyframes ? Ur(W(t.keyframes)) : rt;
      if (Q(t.inherit))
        for (; e; ) i(t, e.vars.defaults), (e = e.parent || e._dp);
      return t;
    },
    Yr = function (t, e) {
      for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; );
      return i < 0;
    },
    Ri = function (t, e, i, r, n) {
      var s = t[r],
        a;
      if (n) for (a = e[n]; s && s[n] > a; ) s = s._prev;
      return (
        s
          ? ((e._next = s._next), (s._next = e))
          : ((e._next = t[i]), (t[i] = e)),
        e._next ? (e._next._prev = e) : (t[r] = e),
        (e._prev = s),
        (e.parent = e._dp = t),
        e
      );
    },
    Te = function (t, e, i, r) {
      i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
      var n = e._prev,
        s = e._next;
      n ? (n._next = s) : t[i] === e && (t[i] = s),
        s ? (s._prev = n) : t[r] === e && (t[r] = n),
        (e._next = e._prev = e.parent = null);
    },
    vt = function (t, e) {
      t.parent &&
        (!e || t.parent.autoRemoveChildren) &&
        t.parent.remove &&
        t.parent.remove(t),
        (t._act = 0);
    },
    Mt = function (t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var i = t; i; ) (i._dirty = 1), (i = i.parent);
      return t;
    },
    Xr = function (t) {
      for (var e = t.parent; e && e.parent; )
        (e._dirty = 1), e.totalDuration(), (e = e.parent);
      return t;
    },
    Xe = function (t, e, i, r) {
      return (
        t._startAt &&
        (X
          ? t._startAt.revert(me)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(e, !0, r))
      );
    },
    qr = function u(t) {
      return !t || (t._ts && u(t.parent));
    },
    Ei = function (t) {
      return t._repeat ? qt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
    },
    qt = function (t, e) {
      var i = Math.floor((t = I(t / e)));
      return t && i === t ? i - 1 : i;
    },
    ve = function (t, e) {
      return (
        (t - e._start) * e._ts +
        (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      );
    },
    we = function (t) {
      return (t._end = I(
        t._start + (t._tDur / Math.abs(t._ts || t._rts || G) || 0)
      ));
    },
    be = function (t, e) {
      var i = t._dp;
      return (
        i &&
          i.smoothChildTiming &&
          t._ts &&
          ((t._start = I(
            i._time -
              (t._ts > 0
                ? e / t._ts
                : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
          )),
          we(t),
          i._dirty || Mt(i, t)),
        t
      );
    },
    zi = function (t, e) {
      var i;
      if (
        ((e._time ||
          (!e._dur && e._initted) ||
          (e._start < t._time && (e._dur || !e.add))) &&
          ((i = ve(t.rawTime(), e)),
          (!e._dur || ie(0, e.totalDuration(), i) - e._tTime > G) &&
            e.render(i, !0)),
        Mt(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (i = t; i._dp; )
            i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
        t._zTime = -1e-8;
      }
    },
    ct = function (t, e, i, r) {
      return (
        e.parent && vt(e),
        (e._start = I(
          (mt(i) ? i : i || t !== E ? ot(t, i, e) : t._time) + e._delay
        )),
        (e._end = I(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
        )),
        Ri(t, e, "_first", "_last", t._sort ? "_start" : 0),
        qe(e) || (t._recent = e),
        r || zi(t, e),
        t._ts < 0 && be(t, t._tTime),
        t
      );
    },
    Fi = function (t, e) {
      return (
        (et.ScrollTrigger || Ie("scrollTrigger", e)) &&
        et.ScrollTrigger.create(e, t)
      );
    },
    Li = function (t, e, i, r, n) {
      if ((Je(t, e, n), !t._initted)) return 1;
      if (
        !i &&
        t._pt &&
        !X &&
        ((t._dur && t.vars.lazy !== !1) || (!t._dur && t.vars.lazy)) &&
        Si !== st.frame
      )
        return Tt.push(t), (t._lazy = [n, r]), 1;
    },
    Gr = function u(t) {
      var e = t.parent;
      return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || u(e));
    },
    qe = function (t) {
      var e = t.data;
      return e === "isFromStart" || e === "isStart";
    },
    Wr = function (t, e, i, r) {
      var n = t.ratio,
        s =
          e < 0 ||
          (!e &&
            ((!t._start && Gr(t) && !(!t._initted && qe(t))) ||
              ((t._ts < 0 || t._dp._ts < 0) && !qe(t))))
            ? 0
            : 1,
        a = t._rDelay,
        o = 0,
        f,
        l,
        _;
      if (
        (a &&
          t._repeat &&
          ((o = ie(0, t._tDur, e)),
          (l = qt(o, a)),
          t._yoyo && l & 1 && (s = 1 - s),
          l !== qt(t._tTime, a) &&
            ((n = 1 - s),
            t.vars.repeatRefresh && t._initted && t.invalidate())),
        s !== n || X || r || t._zTime === G || (!e && t._zTime))
      ) {
        if (!t._initted && Li(t, e, r, i, o)) return;
        for (
          _ = t._zTime,
            t._zTime = e || (i ? G : 0),
            i || (i = e && !_),
            t.ratio = s,
            t._from && (s = 1 - s),
            t._time = 0,
            t._tTime = o,
            f = t._pt;
          f;

        )
          f.r(s, f.d), (f = f._next);
        e < 0 && Xe(t, e, i, !0),
          t._onUpdate && !i && nt(t, "onUpdate"),
          o && t._repeat && !i && t.parent && nt(t, "onRepeat"),
          (e >= t._tDur || e < 0) &&
            t.ratio === s &&
            (s && vt(t, 1),
            !i &&
              !X &&
              (nt(t, s ? "onComplete" : "onReverseComplete", !0),
              t._prom && t._prom()));
      } else t._zTime || (t._zTime = e);
    },
    $r = function (t, e, i) {
      var r;
      if (i > e)
        for (r = t._first; r && r._start <= i; ) {
          if (r.data === "isPause" && r._start > e) return r;
          r = r._next;
        }
      else
        for (r = t._last; r && r._start >= i; ) {
          if (r.data === "isPause" && r._start < e) return r;
          r = r._prev;
        }
    },
    Gt = function (t, e, i, r) {
      var n = t._repeat,
        s = I(e) || 0,
        a = t._tTime / t._tDur;
      return (
        a && !r && (t._time *= s / t._dur),
        (t._dur = s),
        (t._tDur = n ? (n < 0 ? 1e10 : I(s * (n + 1) + t._rDelay * n)) : s),
        a > 0 && !r && be(t, (t._tTime = t._tDur * a)),
        t.parent && we(t),
        i || Mt(t.parent, t),
        t
      );
    },
    Ii = function (t) {
      return t instanceof K ? Mt(t) : Gt(t, t._dur);
    },
    Kr = { _start: 0, endTime: Jt, totalDuration: Jt },
    ot = function u(t, e, i) {
      var r = t.labels,
        n = t._recent || Kr,
        s = t.duration() >= lt ? n.endTime(!1) : t._dur,
        a,
        o,
        f;
      return B(e) && (isNaN(e) || e in r)
        ? ((o = e.charAt(0)),
          (f = e.substr(-1) === "%"),
          (a = e.indexOf("=")),
          o === "<" || o === ">"
            ? (a >= 0 && (e = e.replace(/=/, "")),
              (o === "<" ? n._start : n.endTime(n._repeat >= 0)) +
                (parseFloat(e.substr(1)) || 0) *
                  (f ? (a < 0 ? n : i).totalDuration() / 100 : 1))
            : a < 0
            ? (e in r || (r[e] = s), r[e])
            : ((o = parseFloat(e.charAt(a - 1) + e.substr(a + 1))),
              f && i && (o = (o / 100) * (W(i) ? i[0] : i).totalDuration()),
              a > 1 ? u(t, e.substr(0, a - 1), i) + o : s + o))
        : e == null
        ? s
        : +e;
    },
    ee = function (t, e, i) {
      var r = mt(e[1]),
        n = (r ? 2 : 1) + (t < 2 ? 0 : 1),
        s = e[n],
        a,
        o;
      if ((r && (s.duration = e[1]), (s.parent = i), t)) {
        for (a = s, o = i; o && !("immediateRender" in a); )
          (a = o.vars.defaults || {}), (o = Q(o.vars.inherit) && o.parent);
        (s.immediateRender = Q(a.immediateRender)),
          t < 2 ? (s.runBackwards = 1) : (s.startAt = e[n - 1]);
      }
      return new N(e[0], s, e[n + 1]);
    },
    wt = function (t, e) {
      return t || t === 0 ? e(t) : e;
    },
    ie = function (t, e, i) {
      return i < t ? t : i > e ? e : i;
    },
    $ = function (t, e) {
      return !B(t) || !(e = Ir.exec(t)) ? "" : e[1];
    },
    Qr = function (t, e, i) {
      return wt(i, function (r) {
        return ie(t, e, r);
      });
    },
    Ge = [].slice,
    Ni = function (t, e) {
      return (
        t &&
        ht(t) &&
        "length" in t &&
        ((!e && !t.length) || (t.length - 1 in t && ht(t[0]))) &&
        !t.nodeType &&
        t !== _t
      );
    },
    Zr = function (t, e, i) {
      return (
        i === void 0 && (i = []),
        t.forEach(function (r) {
          var n;
          return (B(r) && !e) || Ni(r, 1)
            ? (n = i).push.apply(n, ut(r))
            : i.push(r);
        }) || i
      );
    },
    ut = function (t, e, i) {
      return A && !e && A.selector
        ? A.selector(t)
        : B(t) && !i && (Fe || !$t())
        ? Ge.call((e || Le).querySelectorAll(t), 0)
        : W(t)
        ? Zr(t, i)
        : Ni(t)
        ? Ge.call(t, 0)
        : t
        ? [t]
        : [];
    },
    We = function (t) {
      return (
        (t = ut(t)[0] || Ht("Invalid scope") || {}),
        function (e) {
          var i = t.current || t.nativeElement || t;
          return ut(
            e,
            i.querySelectorAll
              ? i
              : i === t
              ? Ht("Invalid scope") || Le.createElement("div")
              : t
          );
        }
      );
    },
    Vi = function (t) {
      return t.sort(function () {
        return 0.5 - Math.random();
      });
    },
    Bi = function (t) {
      if (F(t)) return t;
      var e = ht(t) ? t : { each: t },
        i = Dt(e.ease),
        r = e.from || 0,
        n = parseFloat(e.base) || 0,
        s = {},
        a = r > 0 && r < 1,
        o = isNaN(r) || a,
        f = e.axis,
        l = r,
        _ = r;
      return (
        B(r)
          ? (l = _ = { center: 0.5, edges: 0.5, end: 1 }[r] || 0)
          : !a && o && ((l = r[0]), (_ = r[1])),
        function (c, d, m) {
          var h = (m || e).length,
            p = s[h],
            g,
            x,
            T,
            v,
            y,
            b,
            P,
            S,
            w;
          if (!p) {
            if (((w = e.grid === "auto" ? 0 : (e.grid || [1, lt])[1]), !w)) {
              for (
                P = -1e8;
                P < (P = m[w++].getBoundingClientRect().left) && w < h;

              );
              w < h && w--;
            }
            for (
              p = s[h] = [],
                g = o ? Math.min(w, h) * l - 0.5 : r % w,
                x = w === lt ? 0 : o ? (h * _) / w - 0.5 : (r / w) | 0,
                P = 0,
                S = lt,
                b = 0;
              b < h;
              b++
            )
              (T = (b % w) - g),
                (v = x - ((b / w) | 0)),
                (p[b] = y =
                  f ? Math.abs(f === "y" ? v : T) : gi(T * T + v * v)),
                y > P && (P = y),
                y < S && (S = y);
            r === "random" && Vi(p),
              (p.max = P - S),
              (p.min = S),
              (p.v = h =
                (parseFloat(e.amount) ||
                  parseFloat(e.each) *
                    (w > h
                      ? h - 1
                      : f
                      ? f === "y"
                        ? h / w
                        : w
                      : Math.max(w, h / w)) ||
                  0) * (r === "edges" ? -1 : 1)),
              (p.b = h < 0 ? n - h : n),
              (p.u = $(e.amount || e.each) || 0),
              (i = i && h < 0 ? Hi(i) : i);
          }
          return (
            (h = (p[c] - p.min) / p.max || 0),
            I(p.b + (i ? i(h) : h) * p.v) + p.u
          );
        }
      );
    },
    $e = function (t) {
      var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (i) {
        var r = I(Math.round(parseFloat(i) / t) * t * e);
        return (r - (r % 1)) / e + (mt(i) ? 0 : $(i));
      };
    },
    Ui = function (t, e) {
      var i = W(t),
        r,
        n;
      return (
        !i &&
          ht(t) &&
          ((r = i = t.radius || lt),
          t.values
            ? ((t = ut(t.values)), (n = !mt(t[0])) && (r *= r))
            : (t = $e(t.increment))),
        wt(
          e,
          i
            ? F(t)
              ? function (s) {
                  return (n = t(s)), Math.abs(n - s) <= r ? n : s;
                }
              : function (s) {
                  for (
                    var a = parseFloat(n ? s.x : s),
                      o = parseFloat(n ? s.y : 0),
                      f = lt,
                      l = 0,
                      _ = t.length,
                      c,
                      d;
                    _--;

                  )
                    n
                      ? ((c = t[_].x - a),
                        (d = t[_].y - o),
                        (c = c * c + d * d))
                      : (c = Math.abs(t[_] - a)),
                      c < f && ((f = c), (l = _));
                  return (
                    (l = !r || f <= r ? t[l] : s),
                    n || l === s || mt(s) ? l : l + $(s)
                  );
                }
            : $e(t)
        )
      );
    },
    Yi = function (t, e, i, r) {
      return wt(W(t) ? !e : i === !0 ? !!(i = 0) : !r, function () {
        return W(t)
          ? t[~~(Math.random() * t.length)]
          : (i = i || 1e-5) &&
              (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - i / 2 + Math.random() * (e - t + i * 0.99)) / i
                ) *
                  i *
                  r
              ) / r;
      });
    },
    jr = function () {
      for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
        e[i] = arguments[i];
      return function (r) {
        return e.reduce(function (n, s) {
          return s(n);
        }, r);
      };
    },
    Hr = function (t, e) {
      return function (i) {
        return t(parseFloat(i)) + (e || $(i));
      };
    },
    Jr = function (t, e, i) {
      return qi(t, e, 0, 1, i);
    },
    Xi = function (t, e, i) {
      return wt(i, function (r) {
        return t[~~e(r)];
      });
    },
    tn = function u(t, e, i) {
      var r = e - t;
      return W(t)
        ? Xi(t, u(0, t.length), e)
        : wt(i, function (n) {
            return ((r + ((n - t) % r)) % r) + t;
          });
    },
    en = function u(t, e, i) {
      var r = e - t,
        n = r * 2;
      return W(t)
        ? Xi(t, u(0, t.length - 1), e)
        : wt(i, function (s) {
            return (s = (n + ((s - t) % n)) % n || 0), t + (s > r ? n - s : s);
          });
    },
    re = function (t) {
      for (var e = 0, i = "", r, n, s, a; ~(r = t.indexOf("random(", e)); )
        (s = t.indexOf(")", r)),
          (a = t.charAt(r + 7) === "["),
          (n = t.substr(r + 7, s - r - 7).match(a ? vi : Ee)),
          (i +=
            t.substr(e, r - e) +
            Yi(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5)),
          (e = s + 1);
      return i + t.substr(e, t.length - e);
    },
    qi = function (t, e, i, r, n) {
      var s = e - t,
        a = r - i;
      return wt(n, function (o) {
        return i + (((o - t) / s) * a || 0);
      });
    },
    rn = function u(t, e, i, r) {
      var n = isNaN(t + e)
        ? 0
        : function (d) {
            return (1 - d) * t + d * e;
          };
      if (!n) {
        var s = B(t),
          a = {},
          o,
          f,
          l,
          _,
          c;
        if ((i === !0 && (r = 1) && (i = null), s))
          (t = { p: t }), (e = { p: e });
        else if (W(t) && !W(e)) {
          for (l = [], _ = t.length, c = _ - 2, f = 1; f < _; f++)
            l.push(u(t[f - 1], t[f]));
          _--,
            (n = function (m) {
              m *= _;
              var h = Math.min(c, ~~m);
              return l[h](m - h);
            }),
            (i = e);
        } else r || (t = Xt(W(t) ? [] : {}, t));
        if (!l) {
          for (o in e) je.call(a, t, o, "get", e[o]);
          n = function (m) {
            return ii(m, a) || (s ? t.p : t);
          };
        }
      }
      return wt(i, n);
    },
    Gi = function (t, e, i) {
      var r = t.labels,
        n = lt,
        s,
        a,
        o;
      for (s in r)
        (a = r[s] - e),
          a < 0 == !!i && a && n > (a = Math.abs(a)) && ((o = s), (n = a));
      return o;
    },
    nt = function (t, e, i) {
      var r = t.vars,
        n = r[e],
        s = A,
        a = t._ctx,
        o,
        f,
        l;
      if (n)
        return (
          (o = r[e + "Params"]),
          (f = r.callbackScope || t),
          i && Tt.length && ye(),
          a && (A = a),
          (l = o ? n.apply(f, o) : n.call(f)),
          (A = s),
          l
        );
    },
    ne = function (t) {
      return (
        vt(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!X),
        t.progress() < 1 && nt(t, "onInterrupt"),
        t
      );
    },
    Wt,
    Wi = [],
    $i = function (t) {
      if (t)
        if (((t = (!t.name && t.default) || t), Re() || t.headless)) {
          var e = t.name,
            i = F(t),
            r =
              e && !i && t.init
                ? function () {
                    this._props = [];
                  }
                : t,
            n = {
              init: Jt,
              render: ii,
              add: je,
              kill: xn,
              modifier: yn,
              rawVars: 0,
            },
            s = {
              targetTest: 0,
              get: 0,
              getSetter: ei,
              aliases: {},
              register: 0,
            };
          if (($t(), t !== r)) {
            if (it[e]) return;
            rt(r, rt(xe(t, n), s)),
              Xt(r.prototype, Xt(n, xe(t, s))),
              (it[(r.prop = e)] = r),
              t.targetTest && (ge.push(r), (Ne[e] = 1)),
              (e =
                (e === "css"
                  ? "CSS"
                  : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
          }
          Pi(e, r), t.register && t.register(H, r, j);
        } else Wi.push(t);
    },
    C = 255,
    se = {
      aqua: [0, C, C],
      lime: [0, C, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, C],
      navy: [0, 0, 128],
      white: [C, C, C],
      olive: [128, 128, 0],
      yellow: [C, C, 0],
      orange: [C, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [C, 0, 0],
      pink: [C, 192, 203],
      cyan: [0, C, C],
      transparent: [C, C, C, 0],
    },
    Ke = function (t, e, i) {
      return (
        (t += t < 0 ? 1 : t > 1 ? -1 : 0),
        ((t * 6 < 1
          ? e + (i - e) * t * 6
          : t < 0.5
          ? i
          : t * 3 < 2
          ? e + (i - e) * (2 / 3 - t) * 6
          : e) *
          C +
          0.5) |
          0
      );
    },
    Ki = function (t, e, i) {
      var r = t ? (mt(t) ? [t >> 16, (t >> 8) & C, t & C] : 0) : se.black,
        n,
        s,
        a,
        o,
        f,
        l,
        _,
        c,
        d,
        m;
      if (!r) {
        if ((t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), se[t]))
          r = se[t];
        else if (t.charAt(0) === "#") {
          if (
            (t.length < 6 &&
              ((n = t.charAt(1)),
              (s = t.charAt(2)),
              (a = t.charAt(3)),
              (t =
                "#" +
                n +
                n +
                s +
                s +
                a +
                a +
                (t.length === 5 ? t.charAt(4) + t.charAt(4) : ""))),
            t.length === 9)
          )
            return (
              (r = parseInt(t.substr(1, 6), 16)),
              [r >> 16, (r >> 8) & C, r & C, parseInt(t.substr(7), 16) / 255]
            );
          (t = parseInt(t.substr(1), 16)), (r = [t >> 16, (t >> 8) & C, t & C]);
        } else if (t.substr(0, 3) === "hsl") {
          if (((r = m = t.match(Ee)), !e))
            (o = (+r[0] % 360) / 360),
              (f = +r[1] / 100),
              (l = +r[2] / 100),
              (s = l <= 0.5 ? l * (f + 1) : l + f - l * f),
              (n = l * 2 - s),
              r.length > 3 && (r[3] *= 1),
              (r[0] = Ke(o + 1 / 3, n, s)),
              (r[1] = Ke(o, n, s)),
              (r[2] = Ke(o - 1 / 3, n, s));
          else if (~t.indexOf("="))
            return (r = t.match(xi)), i && r.length < 4 && (r[3] = 1), r;
        } else r = t.match(Ee) || se.transparent;
        r = r.map(Number);
      }
      return (
        e &&
          !m &&
          ((n = r[0] / C),
          (s = r[1] / C),
          (a = r[2] / C),
          (_ = Math.max(n, s, a)),
          (c = Math.min(n, s, a)),
          (l = (_ + c) / 2),
          _ === c
            ? (o = f = 0)
            : ((d = _ - c),
              (f = l > 0.5 ? d / (2 - _ - c) : d / (_ + c)),
              (o =
                _ === n
                  ? (s - a) / d + (s < a ? 6 : 0)
                  : _ === s
                  ? (a - n) / d + 2
                  : (n - s) / d + 4),
              (o *= 60)),
          (r[0] = ~~(o + 0.5)),
          (r[1] = ~~(f * 100 + 0.5)),
          (r[2] = ~~(l * 100 + 0.5))),
        i && r.length < 4 && (r[3] = 1),
        r
      );
    },
    Qi = function (t) {
      var e = [],
        i = [],
        r = -1;
      return (
        t.split(bt).forEach(function (n) {
          var s = n.match(Ut) || [];
          e.push.apply(e, s), i.push((r += s.length + 1));
        }),
        (e.c = i),
        e
      );
    },
    Zi = function (t, e, i) {
      var r = "",
        n = (t + r).match(bt),
        s = e ? "hsla(" : "rgba(",
        a = 0,
        o,
        f,
        l,
        _;
      if (!n) return t;
      if (
        ((n = n.map(function (c) {
          return (
            (c = Ki(c, e, 1)) &&
            s +
              (e
                ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3]
                : c.join(",")) +
              ")"
          );
        })),
        i && ((l = Qi(t)), (o = i.c), o.join(r) !== l.c.join(r)))
      )
        for (f = t.replace(bt, "1").split(Ut), _ = f.length - 1; a < _; a++)
          r +=
            f[a] +
            (~o.indexOf(a)
              ? n.shift() || s + "0,0,0,0)"
              : (l.length ? l : n.length ? n : i).shift());
      if (!f)
        for (f = t.split(bt), _ = f.length - 1; a < _; a++) r += f[a] + n[a];
      return r + f[_];
    },
    bt = (function () {
      var u =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        t;
      for (t in se) u += "|" + t + "\\b";
      return new RegExp(u + ")", "gi");
    })(),
    nn = /hsl[a]?\(/,
    ji = function (t) {
      var e = t.join(" "),
        i;
      if (((bt.lastIndex = 0), bt.test(e)))
        return (
          (i = nn.test(e)),
          (t[1] = Zi(t[1], i)),
          (t[0] = Zi(t[0], i, Qi(t[1]))),
          !0
        );
    },
    ae,
    st = (function () {
      var u = Date.now,
        t = 500,
        e = 33,
        i = u(),
        r = i,
        n = 1e3 / 240,
        s = n,
        a = [],
        o,
        f,
        l,
        _,
        c,
        d,
        m = function h(p) {
          var g = u() - r,
            x = p === !0,
            T,
            v,
            y,
            b;
          if (
            ((g > t || g < 0) && (i += g - e),
            (r += g),
            (y = r - i),
            (T = y - s),
            (T > 0 || x) &&
              ((b = ++_.frame),
              (c = y - _.time * 1e3),
              (_.time = y = y / 1e3),
              (s += T + (T >= n ? 4 : n - T)),
              (v = 1)),
            x || (o = f(h)),
            v)
          )
            for (d = 0; d < a.length; d++) a[d](y, c, b, p);
        };
      return (
        (_ = {
          time: 0,
          frame: 0,
          tick: function () {
            m(!0);
          },
          deltaRatio: function (p) {
            return c / (1e3 / (p || 60));
          },
          wake: function () {
            wi &&
              (!Fe &&
                Re() &&
                ((_t = Fe = window),
                (Le = _t.document || {}),
                (et.gsap = H),
                (_t.gsapVersions || (_t.gsapVersions = [])).push(H.version),
                bi(pe || _t.GreenSockGlobals || (!_t.gsap && _t) || {}),
                Wi.forEach($i)),
              (l = typeof requestAnimationFrame < "u" && requestAnimationFrame),
              o && _.sleep(),
              (f =
                l ||
                function (p) {
                  return setTimeout(p, (s - _.time * 1e3 + 1) | 0);
                }),
              (ae = 1),
              m(2));
          },
          sleep: function () {
            (l ? cancelAnimationFrame : clearTimeout)(o), (ae = 0), (f = Jt);
          },
          lagSmoothing: function (p, g) {
            (t = p || 1 / 0), (e = Math.min(g || 33, t));
          },
          fps: function (p) {
            (n = 1e3 / (p || 240)), (s = _.time * 1e3 + n);
          },
          add: function (p, g, x) {
            var T = g
              ? function (v, y, b, P) {
                  p(v, y, b, P), _.remove(T);
                }
              : p;
            return _.remove(p), a[x ? "unshift" : "push"](T), $t(), T;
          },
          remove: function (p, g) {
            ~(g = a.indexOf(p)) && a.splice(g, 1) && d >= g && d--;
          },
          _listeners: a,
        }),
        _
      );
    })(),
    $t = function () {
      return !ae && st.wake();
    },
    k = {},
    sn = /^[\d.\-M][\d.\-,\s]/,
    an = /["']/g,
    on = function (t) {
      for (
        var e = {},
          i = t.substr(1, t.length - 3).split(":"),
          r = i[0],
          n = 1,
          s = i.length,
          a,
          o,
          f;
        n < s;
        n++
      )
        (o = i[n]),
          (a = n !== s - 1 ? o.lastIndexOf(",") : o.length),
          (f = o.substr(0, a)),
          (e[r] = isNaN(f) ? f.replace(an, "").trim() : +f),
          (r = o.substr(a + 1).trim());
      return e;
    },
    un = function (t) {
      var e = t.indexOf("(") + 1,
        i = t.indexOf(")"),
        r = t.indexOf("(", e);
      return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
    },
    fn = function (t) {
      var e = (t + "").split("("),
        i = k[e[0]];
      return i && e.length > 1 && i.config
        ? i.config.apply(
            null,
            ~t.indexOf("{") ? [on(e[1])] : un(t).split(",").map(Mi)
          )
        : k._CE && sn.test(t)
        ? k._CE("", t)
        : i;
    },
    Hi = function (t) {
      return function (e) {
        return 1 - t(1 - e);
      };
    },
    Ji = function u(t, e) {
      for (var i = t._first, r; i; )
        i instanceof K
          ? u(i, e)
          : i.vars.yoyoEase &&
            (!i._yoyo || !i._repeat) &&
            i._yoyo !== e &&
            (i.timeline
              ? u(i.timeline, e)
              : ((r = i._ease),
                (i._ease = i._yEase),
                (i._yEase = r),
                (i._yoyo = e))),
          (i = i._next);
    },
    Dt = function (t, e) {
      return (t && (F(t) ? t : k[t] || fn(t))) || e;
    },
    At = function (t, e, i, r) {
      i === void 0 &&
        (i = function (o) {
          return 1 - e(1 - o);
        }),
        r === void 0 &&
          (r = function (o) {
            return o < 0.5 ? e(o * 2) / 2 : 1 - e((1 - o) * 2) / 2;
          });
      var n = { easeIn: e, easeOut: i, easeInOut: r },
        s;
      return (
        Z(t, function (a) {
          (k[a] = et[a] = n), (k[(s = a.toLowerCase())] = i);
          for (var o in n)
            k[
              s + (o === "easeIn" ? ".in" : o === "easeOut" ? ".out" : ".inOut")
            ] = k[a + "." + o] = n[o];
        }),
        n
      );
    },
    tr = function (t) {
      return function (e) {
        return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
      };
    },
    Qe = function u(t, e, i) {
      var r = e >= 1 ? e : 1,
        n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1),
        s = (n / De) * (Math.asin(1 / r) || 0),
        a = function (l) {
          return l === 1 ? 1 : r * Math.pow(2, -10 * l) * Lr((l - s) * n) + 1;
        },
        o =
          t === "out"
            ? a
            : t === "in"
            ? function (f) {
                return 1 - a(1 - f);
              }
            : tr(a);
      return (
        (n = De / n),
        (o.config = function (f, l) {
          return u(t, f, l);
        }),
        o
      );
    },
    Ze = function u(t, e) {
      e === void 0 && (e = 1.70158);
      var i = function (s) {
          return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
        },
        r =
          t === "out"
            ? i
            : t === "in"
            ? function (n) {
                return 1 - i(1 - n);
              }
            : tr(i);
      return (
        (r.config = function (n) {
          return u(t, n);
        }),
        r
      );
    };
  Z("Linear,Quad,Cubic,Quart,Quint,Strong", function (u, t) {
    var e = t < 5 ? t + 1 : t;
    At(
      u + ",Power" + (e - 1),
      t
        ? function (i) {
            return Math.pow(i, e);
          }
        : function (i) {
            return i;
          },
      function (i) {
        return 1 - Math.pow(1 - i, e);
      },
      function (i) {
        return i < 0.5
          ? Math.pow(i * 2, e) / 2
          : 1 - Math.pow((1 - i) * 2, e) / 2;
      }
    );
  }),
    (k.Linear.easeNone = k.none = k.Linear.easeIn),
    At("Elastic", Qe("in"), Qe("out"), Qe()),
    (function (u, t) {
      var e = 1 / t,
        i = 2 * e,
        r = 2.5 * e,
        n = function (a) {
          return a < e
            ? u * a * a
            : a < i
            ? u * Math.pow(a - 1.5 / t, 2) + 0.75
            : a < r
            ? u * (a -= 2.25 / t) * a + 0.9375
            : u * Math.pow(a - 2.625 / t, 2) + 0.984375;
        };
      At(
        "Bounce",
        function (s) {
          return 1 - n(1 - s);
        },
        n
      );
    })(7.5625, 2.75),
    At("Expo", function (u) {
      return Math.pow(2, 10 * (u - 1)) * u + u * u * u * u * u * u * (1 - u);
    }),
    At("Circ", function (u) {
      return -(gi(1 - u * u) - 1);
    }),
    At("Sine", function (u) {
      return u === 1 ? 1 : -Fr(u * Er) + 1;
    }),
    At("Back", Ze("in"), Ze("out"), Ze()),
    (k.SteppedEase =
      k.steps =
      et.SteppedEase =
        {
          config: function (t, e) {
            t === void 0 && (t = 1);
            var i = 1 / t,
              r = t + (e ? 0 : 1),
              n = e ? 1 : 0,
              s = 1 - G;
            return function (a) {
              return (((r * ie(0, s, a)) | 0) + n) * i;
            };
          },
        }),
    (Bt.ease = k["quad.out"]),
    Z(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (u) {
        return (Ue += u + "," + u + "Params,");
      }
    );
  var er = function (t, e) {
      (this.id = zr++),
        (t._gsap = this),
        (this.target = t),
        (this.harness = e),
        (this.get = e ? e.get : Oi),
        (this.set = e ? e.getSetter : ei);
    },
    oe = (function () {
      function u(e) {
        (this.vars = e),
          (this._delay = +e.delay || 0),
          (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
            ((this._rDelay = e.repeatDelay || 0),
            (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
          (this._ts = 1),
          Gt(this, +e.duration, 1, 1),
          (this.data = e.data),
          A && ((this._ctx = A), A.data.push(this)),
          ae || st.wake();
      }
      var t = u.prototype;
      return (
        (t.delay = function (i) {
          return i || i === 0
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + i - this._delay),
              (this._delay = i),
              this)
            : this._delay;
        }),
        (t.duration = function (i) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i
              )
            : this.totalDuration() && this._dur;
        }),
        (t.totalDuration = function (i) {
          return arguments.length
            ? ((this._dirty = 0),
              Gt(
                this,
                this._repeat < 0
                  ? i
                  : (i - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur;
        }),
        (t.totalTime = function (i, r) {
          if (($t(), !arguments.length)) return this._tTime;
          var n = this._dp;
          if (n && n.smoothChildTiming && this._ts) {
            for (
              be(this, i), !n._dp || n.parent || zi(n, this);
              n && n.parent;

            )
              n.parent._time !==
                n._start +
                  (n._ts >= 0
                    ? n._tTime / n._ts
                    : (n.totalDuration() - n._tTime) / -n._ts) &&
                n.totalTime(n._tTime, !0),
                (n = n.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && i < this._tDur) ||
                (this._ts < 0 && i > 0) ||
                (!this._tDur && !i)) &&
              ct(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== i ||
              (!this._dur && !r) ||
              (this._initted && Math.abs(this._zTime) === G) ||
              (!i && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = i), Ci(this, i, r)),
            this
          );
        }),
        (t.time = function (i, r) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), i + Ei(this)) %
                  (this._dur + this._rDelay) || (i ? this._dur : 0),
                r
              )
            : this._time;
        }),
        (t.totalProgress = function (i, r) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * i, r)
            : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.rawTime() >= 0 && this._initted
            ? 1
            : 0;
        }),
        (t.progress = function (i, r) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) +
                  Ei(this),
                r
              )
            : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.rawTime() > 0
            ? 1
            : 0;
        }),
        (t.iteration = function (i, r) {
          var n = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (i - 1) * n, r)
            : this._repeat
            ? qt(this._tTime, n) + 1
            : 1;
        }),
        (t.timeScale = function (i, r) {
          if (!arguments.length) return this._rts === -1e-8 ? 0 : this._rts;
          if (this._rts === i) return this;
          var n =
            this.parent && this._ts ? ve(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +i || 0),
            (this._ts = this._ps || i === -1e-8 ? 0 : this._rts),
            this.totalTime(ie(-Math.abs(this._delay), this._tDur, n), r !== !1),
            we(this),
            Xr(this)
          );
        }),
        (t.paused = function (i) {
          return arguments.length
            ? (this._ps !== i &&
                ((this._ps = i),
                i
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : ($t(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      this.progress() === 1 &&
                        Math.abs(this._zTime) !== G &&
                        (this._tTime -= G)
                    ))),
              this)
            : this._ps;
        }),
        (t.startTime = function (i) {
          if (arguments.length) {
            this._start = i;
            var r = this.parent || this._dp;
            return (
              r && (r._sort || !this.parent) && ct(r, this, i - this._delay),
              this
            );
          }
          return this._start;
        }),
        (t.endTime = function (i) {
          return (
            this._start +
            (Q(i) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (t.rawTime = function (i) {
          var r = this.parent || this._dp;
          return r
            ? i &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
              ? ve(r.rawTime(i), this)
              : this._tTime
            : this._tTime;
        }),
        (t.revert = function (i) {
          i === void 0 && (i = Vr);
          var r = X;
          return (
            (X = i),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(i),
              this.totalTime(-0.01, i.suppressEvents)),
            this.data !== "nested" && i.kill !== !1 && this.kill(),
            (X = r),
            this
          );
        }),
        (t.globalTime = function (i) {
          for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
            (n = r._start + n / (Math.abs(r._ts) || 1)), (r = r._dp);
          return !this.parent && this._sat ? this._sat.globalTime(i) : n;
        }),
        (t.repeat = function (i) {
          return arguments.length
            ? ((this._repeat = i === 1 / 0 ? -2 : i), Ii(this))
            : this._repeat === -2
            ? 1 / 0
            : this._repeat;
        }),
        (t.repeatDelay = function (i) {
          if (arguments.length) {
            var r = this._time;
            return (this._rDelay = i), Ii(this), r ? this.time(r) : this;
          }
          return this._rDelay;
        }),
        (t.yoyo = function (i) {
          return arguments.length ? ((this._yoyo = i), this) : this._yoyo;
        }),
        (t.seek = function (i, r) {
          return this.totalTime(ot(this, i), Q(r));
        }),
        (t.restart = function (i, r) {
          return (
            this.play().totalTime(i ? -this._delay : 0, Q(r)),
            this._dur || (this._zTime = -1e-8),
            this
          );
        }),
        (t.play = function (i, r) {
          return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
        }),
        (t.reverse = function (i, r) {
          return (
            i != null && this.seek(i || this.totalDuration(), r),
            this.reversed(!0).paused(!1)
          );
        }),
        (t.pause = function (i, r) {
          return i != null && this.seek(i, r), this.paused(!0);
        }),
        (t.resume = function () {
          return this.paused(!1);
        }),
        (t.reversed = function (i) {
          return arguments.length
            ? (!!i !== this.reversed() &&
                this.timeScale(-this._rts || (i ? -1e-8 : 0)),
              this)
            : this._rts < 0;
        }),
        (t.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
        }),
        (t.isActive = function () {
          var i = this.parent || this._dp,
            r = this._start,
            n;
          return !!(
            !i ||
            (this._ts &&
              this._initted &&
              i.isActive() &&
              (n = i.rawTime(!0)) >= r &&
              n < this.endTime(!0) - G)
          );
        }),
        (t.eventCallback = function (i, r, n) {
          var s = this.vars;
          return arguments.length > 1
            ? (r
                ? ((s[i] = r),
                  n && (s[i + "Params"] = n),
                  i === "onUpdate" && (this._onUpdate = r))
                : delete s[i],
              this)
            : s[i];
        }),
        (t.then = function (i) {
          var r = this;
          return new Promise(function (n) {
            var s = F(i) ? i : Di,
              a = function () {
                var f = r.then;
                (r.then = null),
                  F(s) && (s = s(r)) && (s.then || s === r) && (r.then = f),
                  n(s),
                  (r.then = f);
              };
            (r._initted && r.totalProgress() === 1 && r._ts >= 0) ||
            (!r._tTime && r._ts < 0)
              ? a()
              : (r._prom = a);
          });
        }),
        (t.kill = function () {
          ne(this);
        }),
        u
      );
    })();
  rt(oe.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var K = (function (u) {
    mi(t, u);
    function t(i, r) {
      var n;
      return (
        i === void 0 && (i = {}),
        (n = u.call(this, i) || this),
        (n.labels = {}),
        (n.smoothChildTiming = !!i.smoothChildTiming),
        (n.autoRemoveChildren = !!i.autoRemoveChildren),
        (n._sort = Q(i.sortChildren)),
        E && ct(i.parent || E, at(n), r),
        i.reversed && n.reverse(),
        i.paused && n.paused(!0),
        i.scrollTrigger && Fi(at(n), i.scrollTrigger),
        n
      );
    }
    var e = t.prototype;
    return (
      (e.to = function (r, n, s) {
        return ee(0, arguments, this), this;
      }),
      (e.from = function (r, n, s) {
        return ee(1, arguments, this), this;
      }),
      (e.fromTo = function (r, n, s, a) {
        return ee(2, arguments, this), this;
      }),
      (e.set = function (r, n, s) {
        return (
          (n.duration = 0),
          (n.parent = this),
          te(n).repeatDelay || (n.repeat = 0),
          (n.immediateRender = !!n.immediateRender),
          new N(r, n, ot(this, s), 1),
          this
        );
      }),
      (e.call = function (r, n, s) {
        return ct(this, N.delayedCall(0, r, n), s);
      }),
      (e.staggerTo = function (r, n, s, a, o, f, l) {
        return (
          (s.duration = n),
          (s.stagger = s.stagger || a),
          (s.onComplete = f),
          (s.onCompleteParams = l),
          (s.parent = this),
          new N(r, s, ot(this, o)),
          this
        );
      }),
      (e.staggerFrom = function (r, n, s, a, o, f, l) {
        return (
          (s.runBackwards = 1),
          (te(s).immediateRender = Q(s.immediateRender)),
          this.staggerTo(r, n, s, a, o, f, l)
        );
      }),
      (e.staggerFromTo = function (r, n, s, a, o, f, l, _) {
        return (
          (a.startAt = s),
          (te(a).immediateRender = Q(a.immediateRender)),
          this.staggerTo(r, n, a, o, f, l, _)
        );
      }),
      (e.render = function (r, n, s) {
        var a = this._time,
          o = this._dirty ? this.totalDuration() : this._tDur,
          f = this._dur,
          l = r <= 0 ? 0 : I(r),
          _ = this._zTime < 0 != r < 0 && (this._initted || !f),
          c,
          d,
          m,
          h,
          p,
          g,
          x,
          T,
          v,
          y,
          b,
          P;
        if (
          (this !== E && l > o && r >= 0 && (l = o),
          l !== this._tTime || s || _)
        ) {
          if (
            (a !== this._time &&
              f &&
              ((l += this._time - a), (r += this._time - a)),
            (c = l),
            (v = this._start),
            (T = this._ts),
            (g = !T),
            _ && (f || (a = this._zTime), (r || !n) && (this._zTime = r)),
            this._repeat)
          ) {
            if (
              ((b = this._yoyo),
              (p = f + this._rDelay),
              this._repeat < -1 && r < 0)
            )
              return this.totalTime(p * 100 + r, n, s);
            if (
              ((c = I(l % p)),
              l === o
                ? ((h = this._repeat), (c = f))
                : ((y = I(l / p)),
                  (h = ~~y),
                  h && h === y && ((c = f), h--),
                  c > f && (c = f)),
              (y = qt(this._tTime, p)),
              !a &&
                this._tTime &&
                y !== h &&
                this._tTime - y * p - this._dur <= 0 &&
                (y = h),
              b && h & 1 && ((c = f - c), (P = 1)),
              h !== y && !this._lock)
            ) {
              var S = b && y & 1,
                w = S === (b && h & 1);
              if (
                (h < y && (S = !S),
                (a = S ? 0 : l % f ? f : l),
                (this._lock = 1),
                (this.render(a || (P ? 0 : I(h * p)), n, !f)._lock = 0),
                (this._tTime = l),
                !n && this.parent && nt(this, "onRepeat"),
                this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1),
                (a && a !== this._time) ||
                  g !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((f = this._dur),
                (o = this._tDur),
                w &&
                  ((this._lock = 2),
                  (a = S ? f : -1e-4),
                  this.render(a, !0),
                  this.vars.repeatRefresh && !P && this.invalidate()),
                (this._lock = 0),
                !this._ts && !g)
              )
                return this;
              Ji(this, P);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((x = $r(this, I(a), I(c))), x && (l -= c - (c = x._start))),
            (this._tTime = l),
            (this._time = c),
            (this._act = !T),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = r),
              (a = 0)),
            !a && c && !n && !h && (nt(this, "onStart"), this._tTime !== l))
          )
            return this;
          if (c >= a && r >= 0)
            for (d = this._first; d; ) {
              if (
                ((m = d._next), (d._act || c >= d._start) && d._ts && x !== d)
              ) {
                if (d.parent !== this) return this.render(r, n, s);
                if (
                  (d.render(
                    d._ts > 0
                      ? (c - d._start) * d._ts
                      : (d._dirty ? d.totalDuration() : d._tDur) +
                          (c - d._start) * d._ts,
                    n,
                    s
                  ),
                  c !== this._time || (!this._ts && !g))
                ) {
                  (x = 0), m && (l += this._zTime = -1e-8);
                  break;
                }
              }
              d = m;
            }
          else {
            d = this._last;
            for (var O = r < 0 ? r : c; d; ) {
              if (
                ((m = d._prev), (d._act || O <= d._end) && d._ts && x !== d)
              ) {
                if (d.parent !== this) return this.render(r, n, s);
                if (
                  (d.render(
                    d._ts > 0
                      ? (O - d._start) * d._ts
                      : (d._dirty ? d.totalDuration() : d._tDur) +
                          (O - d._start) * d._ts,
                    n,
                    s || (X && (d._initted || d._startAt))
                  ),
                  c !== this._time || (!this._ts && !g))
                ) {
                  (x = 0), m && (l += this._zTime = O ? -1e-8 : G);
                  break;
                }
              }
              d = m;
            }
          }
          if (
            x &&
            !n &&
            (this.pause(),
            (x.render(c >= a ? 0 : -1e-8)._zTime = c >= a ? 1 : -1),
            this._ts)
          )
            return (this._start = v), we(this), this.render(r, n, s);
          this._onUpdate && !n && nt(this, "onUpdate", !0),
            ((l === o && this._tTime >= this.totalDuration()) || (!l && a)) &&
              (v === this._start || Math.abs(T) !== Math.abs(this._ts)) &&
              (this._lock ||
                ((r || !f) &&
                  ((l === o && this._ts > 0) || (!l && this._ts < 0)) &&
                  vt(this, 1),
                !n &&
                  !(r < 0 && !a) &&
                  (l || a || !o) &&
                  (nt(
                    this,
                    l === o && r >= 0 ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  this._prom &&
                    !(l < o && this.timeScale() > 0) &&
                    this._prom())));
        }
        return this;
      }),
      (e.add = function (r, n) {
        var s = this;
        if ((mt(n) || (n = ot(this, n, r)), !(r instanceof oe))) {
          if (W(r))
            return (
              r.forEach(function (a) {
                return s.add(a, n);
              }),
              this
            );
          if (B(r)) return this.addLabel(r, n);
          if (F(r)) r = N.delayedCall(0, r);
          else return this;
        }
        return this !== r ? ct(this, r, n) : this;
      }),
      (e.getChildren = function (r, n, s, a) {
        r === void 0 && (r = !0),
          n === void 0 && (n = !0),
          s === void 0 && (s = !0),
          a === void 0 && (a = -1e8);
        for (var o = [], f = this._first; f; )
          f._start >= a &&
            (f instanceof N
              ? n && o.push(f)
              : (s && o.push(f),
                r && o.push.apply(o, f.getChildren(!0, n, s)))),
            (f = f._next);
        return o;
      }),
      (e.getById = function (r) {
        for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
          if (n[s].vars.id === r) return n[s];
      }),
      (e.remove = function (r) {
        return B(r)
          ? this.removeLabel(r)
          : F(r)
          ? this.killTweensOf(r)
          : (r.parent === this && Te(this, r),
            r === this._recent && (this._recent = this._last),
            Mt(this));
      }),
      (e.totalTime = function (r, n) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = I(
                st.time -
                  (this._ts > 0
                    ? r / this._ts
                    : (this.totalDuration() - r) / -this._ts)
              )),
            u.prototype.totalTime.call(this, r, n),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (e.addLabel = function (r, n) {
        return (this.labels[r] = ot(this, n)), this;
      }),
      (e.removeLabel = function (r) {
        return delete this.labels[r], this;
      }),
      (e.addPause = function (r, n, s) {
        var a = N.delayedCall(0, n || Jt, s);
        return (
          (a.data = "isPause"), (this._hasPause = 1), ct(this, a, ot(this, r))
        );
      }),
      (e.removePause = function (r) {
        var n = this._first;
        for (r = ot(this, r); n; )
          n._start === r && n.data === "isPause" && vt(n), (n = n._next);
      }),
      (e.killTweensOf = function (r, n, s) {
        for (var a = this.getTweensOf(r, s), o = a.length; o--; )
          Pt !== a[o] && a[o].kill(r, n);
        return this;
      }),
      (e.getTweensOf = function (r, n) {
        for (var s = [], a = ut(r), o = this._first, f = mt(n), l; o; )
          o instanceof N
            ? Br(o._targets, a) &&
              (f
                ? (!Pt || (o._initted && o._ts)) &&
                  o.globalTime(0) <= n &&
                  o.globalTime(o.totalDuration()) > n
                : !n || o.isActive()) &&
              s.push(o)
            : (l = o.getTweensOf(a, n)).length && s.push.apply(s, l),
            (o = o._next);
        return s;
      }),
      (e.tweenTo = function (r, n) {
        n = n || {};
        var s = this,
          a = ot(s, r),
          o = n,
          f = o.startAt,
          l = o.onStart,
          _ = o.onStartParams,
          c = o.immediateRender,
          d,
          m = N.to(
            s,
            rt(
              {
                ease: n.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: a,
                overwrite: "auto",
                duration:
                  n.duration ||
                  Math.abs(
                    (a - (f && "time" in f ? f.time : s._time)) / s.timeScale()
                  ) ||
                  G,
                onStart: function () {
                  if ((s.pause(), !d)) {
                    var p =
                      n.duration ||
                      Math.abs(
                        (a - (f && "time" in f ? f.time : s._time)) /
                          s.timeScale()
                      );
                    m._dur !== p && Gt(m, p, 0, 1).render(m._time, !0, !0),
                      (d = 1);
                  }
                  l && l.apply(m, _ || []);
                },
              },
              n
            )
          );
        return c ? m.render(0) : m;
      }),
      (e.tweenFromTo = function (r, n, s) {
        return this.tweenTo(n, rt({ startAt: { time: ot(this, r) } }, s));
      }),
      (e.recent = function () {
        return this._recent;
      }),
      (e.nextLabel = function (r) {
        return r === void 0 && (r = this._time), Gi(this, ot(this, r));
      }),
      (e.previousLabel = function (r) {
        return r === void 0 && (r = this._time), Gi(this, ot(this, r), 1);
      }),
      (e.currentLabel = function (r) {
        return arguments.length
          ? this.seek(r, !0)
          : this.previousLabel(this._time + G);
      }),
      (e.shiftChildren = function (r, n, s) {
        s === void 0 && (s = 0);
        for (var a = this._first, o = this.labels, f; a; )
          a._start >= s && ((a._start += r), (a._end += r)), (a = a._next);
        if (n) for (f in o) o[f] >= s && (o[f] += r);
        return Mt(this);
      }),
      (e.invalidate = function (r) {
        var n = this._first;
        for (this._lock = 0; n; ) n.invalidate(r), (n = n._next);
        return u.prototype.invalidate.call(this, r);
      }),
      (e.clear = function (r) {
        r === void 0 && (r = !0);
        for (var n = this._first, s; n; )
          (s = n._next), this.remove(n), (n = s);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          r && (this.labels = {}),
          Mt(this)
        );
      }),
      (e.totalDuration = function (r) {
        var n = 0,
          s = this,
          a = s._last,
          o = lt,
          f,
          l,
          _;
        if (arguments.length)
          return s.timeScale(
            (s._repeat < 0 ? s.duration() : s.totalDuration()) /
              (s.reversed() ? -r : r)
          );
        if (s._dirty) {
          for (_ = s.parent; a; )
            (f = a._prev),
              a._dirty && a.totalDuration(),
              (l = a._start),
              l > o && s._sort && a._ts && !s._lock
                ? ((s._lock = 1), (ct(s, a, l - a._delay, 1)._lock = 0))
                : (o = l),
              l < 0 &&
                a._ts &&
                ((n -= l),
                ((!_ && !s._dp) || (_ && _.smoothChildTiming)) &&
                  ((s._start += l / s._ts), (s._time -= l), (s._tTime -= l)),
                s.shiftChildren(-l, !1, -1 / 0),
                (o = 0)),
              a._end > n && a._ts && (n = a._end),
              (a = f);
          Gt(s, s === E && s._time > n ? s._time : n, 1, 1), (s._dirty = 0);
        }
        return s._tDur;
      }),
      (t.updateRoot = function (r) {
        if ((E._ts && (Ci(E, ve(r, E)), (Si = st.frame)), st.frame >= ki)) {
          ki += tt.autoSleep || 120;
          var n = E._first;
          if ((!n || !n._ts) && tt.autoSleep && st._listeners.length < 2) {
            for (; n && !n._ts; ) n = n._next;
            n || st.sleep();
          }
        }
      }),
      t
    );
  })(oe);
  rt(K.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var ln = function (t, e, i, r, n, s, a) {
      var o = new j(this._pt, t, e, 0, 1, or, null, n),
        f = 0,
        l = 0,
        _,
        c,
        d,
        m,
        h,
        p,
        g,
        x;
      for (
        o.b = i,
          o.e = r,
          i += "",
          r += "",
          (g = ~r.indexOf("random(")) && (r = re(r)),
          s && ((x = [i, r]), s(x, t, e), (i = x[0]), (r = x[1])),
          c = i.match(ze) || [];
        (_ = ze.exec(r));

      )
        (m = _[0]),
          (h = r.substring(f, _.index)),
          d ? (d = (d + 1) % 5) : h.substr(-5) === "rgba(" && (d = 1),
          m !== c[l++] &&
            ((p = parseFloat(c[l - 1]) || 0),
            (o._pt = {
              _next: o._pt,
              p: h || l === 1 ? h : ",",
              s: p,
              c: m.charAt(1) === "=" ? Yt(p, m) - p : parseFloat(m) - p,
              m: d && d < 4 ? Math.round : 0,
            }),
            (f = ze.lastIndex));
      return (
        (o.c = f < r.length ? r.substring(f, r.length) : ""),
        (o.fp = a),
        (Ti.test(r) || g) && (o.e = 0),
        (this._pt = o),
        o
      );
    },
    je = function (t, e, i, r, n, s, a, o, f, l) {
      F(r) && (r = r(n || 0, t, s));
      var _ = t[e],
        c =
          i !== "get"
            ? i
            : F(_)
            ? f
              ? t[
                  e.indexOf("set") || !F(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](f)
              : t[e]()
            : _,
        d = F(_) ? (f ? pn : sr) : ti,
        m;
      if (
        (B(r) &&
          (~r.indexOf("random(") && (r = re(r)),
          r.charAt(1) === "=" &&
            ((m = Yt(c, r) + ($(c) || 0)), (m || m === 0) && (r = m))),
        !l || c !== r || He)
      )
        return !isNaN(c * r) && r !== ""
          ? ((m = new j(
              this._pt,
              t,
              e,
              +c || 0,
              r - (c || 0),
              typeof _ == "boolean" ? gn : ar,
              0,
              d
            )),
            f && (m.fp = f),
            a && m.modifier(a, this, t),
            (this._pt = m))
          : (!_ && !(e in t) && Ie(e, r),
            ln.call(this, t, e, c, r, d, o || tt.stringFilter, f));
    },
    hn = function (t, e, i, r, n) {
      if (
        (F(t) && (t = ue(t, n, e, i, r)),
        !ht(t) || (t.style && t.nodeType) || W(t) || yi(t))
      )
        return B(t) ? ue(t, n, e, i, r) : t;
      var s = {},
        a;
      for (a in t) s[a] = ue(t[a], n, e, i, r);
      return s;
    },
    ir = function (t, e, i, r, n, s) {
      var a, o, f, l;
      if (
        it[t] &&
        (a = new it[t]()).init(
          n,
          a.rawVars ? e[t] : hn(e[t], r, n, s, i),
          i,
          r,
          s
        ) !== !1 &&
        ((i._pt = o = new j(i._pt, n, t, 0, 1, a.render, a, 0, a.priority)),
        i !== Wt)
      )
        for (f = i._ptLookup[i._targets.indexOf(n)], l = a._props.length; l--; )
          f[a._props[l]] = o;
      return a;
    },
    Pt,
    He,
    Je = function u(t, e, i) {
      var r = t.vars,
        n = r.ease,
        s = r.startAt,
        a = r.immediateRender,
        o = r.lazy,
        f = r.onUpdate,
        l = r.runBackwards,
        _ = r.yoyoEase,
        c = r.keyframes,
        d = r.autoRevert,
        m = t._dur,
        h = t._startAt,
        p = t._targets,
        g = t.parent,
        x = g && g.data === "nested" ? g.vars.targets : p,
        T = t._overwrite === "auto" && !Me,
        v = t.timeline,
        y,
        b,
        P,
        S,
        w,
        O,
        R,
        M,
        D,
        q,
        U,
        V,
        Y;
      if (
        (v && (!c || !n) && (n = "none"),
        (t._ease = Dt(n, Bt.ease)),
        (t._yEase = _ ? Hi(Dt(_ === !0 ? n : _, Bt.ease)) : 0),
        _ &&
          t._yoyo &&
          !t._repeat &&
          ((_ = t._yEase), (t._yEase = t._ease), (t._ease = _)),
        (t._from = !v && !!r.runBackwards),
        !v || (c && !r.stagger))
      ) {
        if (
          ((M = p[0] ? Ct(p[0]).harness : 0),
          (V = M && r[M.prop]),
          (y = xe(r, Ne)),
          h &&
            (h._zTime < 0 && h.progress(1),
            e < 0 && l && a && !d
              ? h.render(-1, !0)
              : h.revert(l && m ? me : Nr),
            (h._lazy = 0)),
          s)
        ) {
          if (
            (vt(
              (t._startAt = N.set(
                p,
                rt(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: g,
                    immediateRender: !0,
                    lazy: !h && Q(o),
                    startAt: null,
                    delay: 0,
                    onUpdate:
                      f &&
                      function () {
                        return nt(t, "onUpdate");
                      },
                    stagger: 0,
                  },
                  s
                )
              ))
            ),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (X || (!a && !d)) && t._startAt.revert(me),
            a && m && e <= 0 && i <= 0)
          ) {
            e && (t._zTime = e);
            return;
          }
        } else if (l && m && !h) {
          if (
            (e && (a = !1),
            (P = rt(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: a && !h && Q(o),
                immediateRender: a,
                stagger: 0,
                parent: g,
              },
              y
            )),
            V && (P[M.prop] = V),
            vt((t._startAt = N.set(p, P))),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (X ? t._startAt.revert(me) : t._startAt.render(-1, !0)),
            (t._zTime = e),
            !a)
          )
            u(t._startAt, G, G);
          else if (!e) return;
        }
        for (
          t._pt = t._ptCache = 0, o = (m && Q(o)) || (o && !m), b = 0;
          b < p.length;
          b++
        ) {
          if (
            ((w = p[b]),
            (R = w._gsap || Ye(p)[b]._gsap),
            (t._ptLookup[b] = q = {}),
            Ve[R.id] && Tt.length && ye(),
            (U = x === p ? b : x.indexOf(w)),
            M &&
              (D = new M()).init(w, V || y, t, U, x) !== !1 &&
              ((t._pt = S =
                new j(t._pt, w, D.name, 0, 1, D.render, D, 0, D.priority)),
              D._props.forEach(function (ft) {
                q[ft] = S;
              }),
              D.priority && (O = 1)),
            !M || V)
          )
            for (P in y)
              it[P] && (D = ir(P, y, t, U, w, x))
                ? D.priority && (O = 1)
                : (q[P] = S =
                    je.call(t, w, P, "get", y[P], U, x, 0, r.stringFilter));
          t._op && t._op[b] && t.kill(w, t._op[b]),
            T &&
              t._pt &&
              ((Pt = t),
              E.killTweensOf(w, q, t.globalTime(e)),
              (Y = !t.parent),
              (Pt = 0)),
            t._pt && o && (Ve[R.id] = 1);
        }
        O && ur(t), t._onInit && t._onInit(t);
      }
      (t._onUpdate = f),
        (t._initted = (!t._op || t._pt) && !Y),
        c && e <= 0 && v.render(lt, !0, !0);
    },
    _n = function (t, e, i, r, n, s, a, o) {
      var f = ((t._pt && t._ptCache) || (t._ptCache = {}))[e],
        l,
        _,
        c,
        d;
      if (!f)
        for (
          f = t._ptCache[e] = [], c = t._ptLookup, d = t._targets.length;
          d--;

        ) {
          if (((l = c[d][e]), l && l.d && l.d._pt))
            for (l = l.d._pt; l && l.p !== e && l.fp !== e; ) l = l._next;
          if (!l)
            return (
              (He = 1),
              (t.vars[e] = "+=0"),
              Je(t, a),
              (He = 0),
              o ? Ht(e + " not eligible for reset") : 1
            );
          f.push(l);
        }
      for (d = f.length; d--; )
        (_ = f[d]),
          (l = _._pt || _),
          (l.s = (r || r === 0) && !n ? r : l.s + (r || 0) + s * l.c),
          (l.c = i - l.s),
          _.e && (_.e = L(i) + $(_.e)),
          _.b && (_.b = l.s + $(_.b));
    },
    cn = function (t, e) {
      var i = t[0] ? Ct(t[0]).harness : 0,
        r = i && i.aliases,
        n,
        s,
        a,
        o;
      if (!r) return e;
      n = Xt({}, e);
      for (s in r)
        if (s in n)
          for (o = r[s].split(","), a = o.length; a--; ) n[o[a]] = n[s];
      return n;
    },
    dn = function (t, e, i, r) {
      var n = e.ease || r || "power1.inOut",
        s,
        a;
      if (W(e))
        (a = i[t] || (i[t] = [])),
          e.forEach(function (o, f) {
            return a.push({ t: (f / (e.length - 1)) * 100, v: o, e: n });
          });
      else
        for (s in e)
          (a = i[s] || (i[s] = [])),
            s === "ease" || a.push({ t: parseFloat(t), v: e[s], e: n });
    },
    ue = function (t, e, i, r, n) {
      return F(t)
        ? t.call(e, i, r, n)
        : B(t) && ~t.indexOf("random(")
        ? re(t)
        : t;
    },
    rr = Ue + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    nr = {};
  Z(rr + ",id,stagger,delay,duration,paused,scrollTrigger", function (u) {
    return (nr[u] = 1);
  });
  var N = (function (u) {
    mi(t, u);
    function t(i, r, n, s) {
      var a;
      typeof r == "number" && ((n.duration = r), (r = n), (n = null)),
        (a = u.call(this, s ? r : te(r)) || this);
      var o = a.vars,
        f = o.duration,
        l = o.delay,
        _ = o.immediateRender,
        c = o.stagger,
        d = o.overwrite,
        m = o.keyframes,
        h = o.defaults,
        p = o.scrollTrigger,
        g = o.yoyoEase,
        x = r.parent || E,
        T = (W(i) || yi(i) ? mt(i[0]) : "length" in r) ? [i] : ut(i),
        v,
        y,
        b,
        P,
        S,
        w,
        O,
        R;
      if (
        ((a._targets = T.length
          ? Ye(T)
          : Ht(
              "GSAP target " + i + " not found. https://gsap.com",
              !tt.nullTargetWarn
            ) || []),
        (a._ptLookup = []),
        (a._overwrite = d),
        m || c || de(f) || de(l))
      ) {
        if (
          ((r = a.vars),
          (v = a.timeline =
            new K({
              data: "nested",
              defaults: h || {},
              targets: x && x.data === "nested" ? x.vars.targets : T,
            })),
          v.kill(),
          (v.parent = v._dp = at(a)),
          (v._start = 0),
          c || de(f) || de(l))
        ) {
          if (((P = T.length), (O = c && Bi(c)), ht(c)))
            for (S in c) ~rr.indexOf(S) && (R || (R = {}), (R[S] = c[S]));
          for (y = 0; y < P; y++)
            (b = xe(r, nr)),
              (b.stagger = 0),
              g && (b.yoyoEase = g),
              R && Xt(b, R),
              (w = T[y]),
              (b.duration = +ue(f, at(a), y, w, T)),
              (b.delay = (+ue(l, at(a), y, w, T) || 0) - a._delay),
              !c &&
                P === 1 &&
                b.delay &&
                ((a._delay = l = b.delay), (a._start += l), (b.delay = 0)),
              v.to(w, b, O ? O(y, w, T) : 0),
              (v._ease = k.none);
          v.duration() ? (f = l = 0) : (a.timeline = 0);
        } else if (m) {
          te(rt(v.vars.defaults, { ease: "none" })),
            (v._ease = Dt(m.ease || r.ease || "none"));
          var M = 0,
            D,
            q,
            U;
          if (W(m))
            m.forEach(function (V) {
              return v.to(T, V, ">");
            }),
              v.duration();
          else {
            b = {};
            for (S in m)
              S === "ease" || S === "easeEach" || dn(S, m[S], b, m.easeEach);
            for (S in b)
              for (
                D = b[S].sort(function (V, Y) {
                  return V.t - Y.t;
                }),
                  M = 0,
                  y = 0;
                y < D.length;
                y++
              )
                (q = D[y]),
                  (U = {
                    ease: q.e,
                    duration: ((q.t - (y ? D[y - 1].t : 0)) / 100) * f,
                  }),
                  (U[S] = q.v),
                  v.to(T, U, M),
                  (M += U.duration);
            v.duration() < f && v.to({}, { duration: f - v.duration() });
          }
        }
        f || a.duration((f = v.duration()));
      } else a.timeline = 0;
      return (
        d === !0 && !Me && ((Pt = at(a)), E.killTweensOf(T), (Pt = 0)),
        ct(x, at(a), n),
        r.reversed && a.reverse(),
        r.paused && a.paused(!0),
        (_ ||
          (!f &&
            !m &&
            a._start === I(x._time) &&
            Q(_) &&
            qr(at(a)) &&
            x.data !== "nested")) &&
          ((a._tTime = -1e-8), a.render(Math.max(0, -l) || 0)),
        p && Fi(at(a), p),
        a
      );
    }
    var e = t.prototype;
    return (
      (e.render = function (r, n, s) {
        var a = this._time,
          o = this._tDur,
          f = this._dur,
          l = r < 0,
          _ = r > o - G && !l ? o : r < G ? 0 : r,
          c,
          d,
          m,
          h,
          p,
          g,
          x,
          T,
          v;
        if (!f) Wr(this, r, n, s);
        else if (
          _ !== this._tTime ||
          !r ||
          s ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 !== l) ||
          this._lazy
        ) {
          if (((c = _), (T = this.timeline), this._repeat)) {
            if (((h = f + this._rDelay), this._repeat < -1 && l))
              return this.totalTime(h * 100 + r, n, s);
            if (
              ((c = I(_ % h)),
              _ === o
                ? ((m = this._repeat), (c = f))
                : ((p = I(_ / h)),
                  (m = ~~p),
                  m && m === p ? ((c = f), m--) : c > f && (c = f)),
              (g = this._yoyo && m & 1),
              g && ((v = this._yEase), (c = f - c)),
              (p = qt(this._tTime, h)),
              c === a && !s && this._initted && m === p)
            )
              return (this._tTime = _), this;
            m !== p &&
              (T && this._yEase && Ji(T, g),
              this.vars.repeatRefresh &&
                !g &&
                !this._lock &&
                c !== h &&
                this._initted &&
                ((this._lock = s = 1),
                (this.render(I(h * m), !0).invalidate()._lock = 0)));
          }
          if (!this._initted) {
            if (Li(this, l ? r : c, s, n, _)) return (this._tTime = 0), this;
            if (a !== this._time && !(s && this.vars.repeatRefresh && m !== p))
              return this;
            if (f !== this._dur) return this.render(r, n, s);
          }
          if (
            ((this._tTime = _),
            (this._time = c),
            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
            (this.ratio = x = (v || this._ease)(c / f)),
            this._from && (this.ratio = x = 1 - x),
            c && !a && !n && !m && (nt(this, "onStart"), this._tTime !== _))
          )
            return this;
          for (d = this._pt; d; ) d.r(x, d.d), (d = d._next);
          (T && T.render(r < 0 ? r : T._dur * T._ease(c / this._dur), n, s)) ||
            (this._startAt && (this._zTime = r)),
            this._onUpdate &&
              !n &&
              (l && Xe(this, r, n, s), nt(this, "onUpdate")),
            this._repeat &&
              m !== p &&
              this.vars.onRepeat &&
              !n &&
              this.parent &&
              nt(this, "onRepeat"),
            (_ === this._tDur || !_) &&
              this._tTime === _ &&
              (l && !this._onUpdate && Xe(this, r, !0, !0),
              (r || !f) &&
                ((_ === this._tDur && this._ts > 0) || (!_ && this._ts < 0)) &&
                vt(this, 1),
              !n &&
                !(l && !a) &&
                (_ || a || g) &&
                (nt(this, _ === o ? "onComplete" : "onReverseComplete", !0),
                this._prom &&
                  !(_ < o && this.timeScale() > 0) &&
                  this._prom()));
        }
        return this;
      }),
      (e.targets = function () {
        return this._targets;
      }),
      (e.invalidate = function (r) {
        return (
          (!r || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(r),
          u.prototype.invalidate.call(this, r)
        );
      }),
      (e.resetTo = function (r, n, s, a, o) {
        ae || st.wake(), this._ts || this.play();
        var f = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
          l;
        return (
          this._initted || Je(this, f),
          (l = this._ease(f / this._dur)),
          _n(this, r, n, s, a, l, f, o)
            ? this.resetTo(r, n, s, a, 1)
            : (be(this, 0),
              this.parent ||
                Ri(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0
                ),
              this.render(0))
        );
      }),
      (e.kill = function (r, n) {
        if ((n === void 0 && (n = "all"), !r && (!n || n === "all")))
          return (
            (this._lazy = this._pt = 0),
            this.parent
              ? ne(this)
              : this.scrollTrigger && this.scrollTrigger.kill(!!X),
            this
          );
        if (this.timeline) {
          var s = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(r, n, Pt && Pt.vars.overwrite !== !0)
              ._first || ne(this),
            this.parent &&
              s !== this.timeline.totalDuration() &&
              Gt(this, (this._dur * this.timeline._tDur) / s, 0, 1),
            this
          );
        }
        var a = this._targets,
          o = r ? ut(r) : a,
          f = this._ptLookup,
          l = this._pt,
          _,
          c,
          d,
          m,
          h,
          p,
          g;
        if ((!n || n === "all") && Yr(a, o))
          return n === "all" && (this._pt = 0), ne(this);
        for (
          _ = this._op = this._op || [],
            n !== "all" &&
              (B(n) &&
                ((h = {}),
                Z(n, function (x) {
                  return (h[x] = 1);
                }),
                (n = h)),
              (n = cn(a, n))),
            g = a.length;
          g--;

        )
          if (~o.indexOf(a[g])) {
            (c = f[g]),
              n === "all"
                ? ((_[g] = n), (m = c), (d = {}))
                : ((d = _[g] = _[g] || {}), (m = n));
            for (h in m)
              (p = c && c[h]),
                p &&
                  ((!("kill" in p.d) || p.d.kill(h) === !0) &&
                    Te(this, p, "_pt"),
                  delete c[h]),
                d !== "all" && (d[h] = 1);
          }
        return this._initted && !this._pt && l && ne(this), this;
      }),
      (t.to = function (r, n) {
        return new t(r, n, arguments[2]);
      }),
      (t.from = function (r, n) {
        return ee(1, arguments);
      }),
      (t.delayedCall = function (r, n, s, a) {
        return new t(n, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: r,
          onComplete: n,
          onReverseComplete: n,
          onCompleteParams: s,
          onReverseCompleteParams: s,
          callbackScope: a,
        });
      }),
      (t.fromTo = function (r, n, s) {
        return ee(2, arguments);
      }),
      (t.set = function (r, n) {
        return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new t(r, n);
      }),
      (t.killTweensOf = function (r, n, s) {
        return E.killTweensOf(r, n, s);
      }),
      t
    );
  })(oe);
  rt(N.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    Z("staggerTo,staggerFrom,staggerFromTo", function (u) {
      N[u] = function () {
        var t = new K(),
          e = Ge.call(arguments, 0);
        return e.splice(u === "staggerFromTo" ? 5 : 4, 0, 0), t[u].apply(t, e);
      };
    });
  var ti = function (t, e, i) {
      return (t[e] = i);
    },
    sr = function (t, e, i) {
      return t[e](i);
    },
    pn = function (t, e, i, r) {
      return t[e](r.fp, i);
    },
    mn = function (t, e, i) {
      return t.setAttribute(e, i);
    },
    ei = function (t, e) {
      return F(t[e]) ? sr : Ae(t[e]) && t.setAttribute ? mn : ti;
    },
    ar = function (t, e) {
      return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
    },
    gn = function (t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    or = function (t, e) {
      var i = e._pt,
        r = "";
      if (!t && e.b) r = e.b;
      else if (t === 1 && e.e) r = e.e;
      else {
        for (; i; )
          (r =
            i.p +
            (i.m
              ? i.m(i.s + i.c * t)
              : Math.round((i.s + i.c * t) * 1e4) / 1e4) +
            r),
            (i = i._next);
        r += e.c;
      }
      e.set(e.t, e.p, r, e);
    },
    ii = function (t, e) {
      for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
    },
    yn = function (t, e, i, r) {
      for (var n = this._pt, s; n; )
        (s = n._next), n.p === r && n.modifier(t, e, i), (n = s);
    },
    xn = function (t) {
      for (var e = this._pt, i, r; e; )
        (r = e._next),
          (e.p === t && !e.op) || e.op === t
            ? Te(this, e, "_pt")
            : e.dep || (i = 1),
          (e = r);
      return !i;
    },
    Tn = function (t, e, i, r) {
      r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
    },
    ur = function (t) {
      for (var e = t._pt, i, r, n, s; e; ) {
        for (i = e._next, r = n; r && r.pr > e.pr; ) r = r._next;
        (e._prev = r ? r._prev : s) ? (e._prev._next = e) : (n = e),
          (e._next = r) ? (r._prev = e) : (s = e),
          (e = i);
      }
      t._pt = n;
    },
    j = (function () {
      function u(e, i, r, n, s, a, o, f, l) {
        (this.t = i),
          (this.s = n),
          (this.c = s),
          (this.p = r),
          (this.r = a || ar),
          (this.d = o || this),
          (this.set = f || ti),
          (this.pr = l || 0),
          (this._next = e),
          e && (e._prev = this);
      }
      var t = u.prototype;
      return (
        (t.modifier = function (i, r, n) {
          (this.mSet = this.mSet || this.set),
            (this.set = Tn),
            (this.m = i),
            (this.mt = n),
            (this.tween = r);
        }),
        u
      );
    })();
  Z(
    Ue +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (u) {
      return (Ne[u] = 1);
    }
  ),
    (et.TweenMax = et.TweenLite = N),
    (et.TimelineLite = et.TimelineMax = K),
    (E = new K({
      sortChildren: !1,
      defaults: Bt,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (tt.stringFilter = ji);
  var Rt = [],
    Pe = {},
    vn = [],
    fr = 0,
    wn = 0,
    ri = function (t) {
      return (Pe[t] || vn).map(function (e) {
        return e();
      });
    },
    ni = function () {
      var t = Date.now(),
        e = [];
      t - fr > 2 &&
        (ri("matchMediaInit"),
        Rt.forEach(function (i) {
          var r = i.queries,
            n = i.conditions,
            s,
            a,
            o,
            f;
          for (a in r)
            (s = _t.matchMedia(r[a]).matches),
              s && (o = 1),
              s !== n[a] && ((n[a] = s), (f = 1));
          f && (i.revert(), o && e.push(i));
        }),
        ri("matchMediaRevert"),
        e.forEach(function (i) {
          return i.onMatch(i, function (r) {
            return i.add(null, r);
          });
        }),
        (fr = t),
        ri("matchMedia"));
    },
    lr = (function () {
      function u(e, i) {
        (this.selector = i && We(i)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          (this.id = wn++),
          e && this.add(e);
      }
      var t = u.prototype;
      return (
        (t.add = function (i, r, n) {
          F(i) && ((n = r), (r = i), (i = F));
          var s = this,
            a = function () {
              var f = A,
                l = s.selector,
                _;
              return (
                f && f !== s && f.data.push(s),
                n && (s.selector = We(n)),
                (A = s),
                (_ = r.apply(s, arguments)),
                F(_) && s._r.push(_),
                (A = f),
                (s.selector = l),
                (s.isReverted = !1),
                _
              );
            };
          return (
            (s.last = a),
            i === F
              ? a(s, function (o) {
                  return s.add(null, o);
                })
              : i
              ? (s[i] = a)
              : a
          );
        }),
        (t.ignore = function (i) {
          var r = A;
          (A = null), i(this), (A = r);
        }),
        (t.getTweens = function () {
          var i = [];
          return (
            this.data.forEach(function (r) {
              return r instanceof u
                ? i.push.apply(i, r.getTweens())
                : r instanceof N &&
                    !(r.parent && r.parent.data === "nested") &&
                    i.push(r);
            }),
            i
          );
        }),
        (t.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (t.kill = function (i, r) {
          var n = this;
          if (
            (i
              ? (function () {
                  for (var a = n.getTweens(), o = n.data.length, f; o--; )
                    (f = n.data[o]),
                      f.data === "isFlip" &&
                        (f.revert(),
                        f.getChildren(!0, !0, !1).forEach(function (l) {
                          return a.splice(a.indexOf(l), 1);
                        }));
                  for (
                    a
                      .map(function (l) {
                        return {
                          g:
                            l._dur ||
                            l._delay ||
                            (l._sat && !l._sat.vars.immediateRender)
                              ? l.globalTime(0)
                              : -1 / 0,
                          t: l,
                        };
                      })
                      .sort(function (l, _) {
                        return _.g - l.g || -1 / 0;
                      })
                      .forEach(function (l) {
                        return l.t.revert(i);
                      }),
                      o = n.data.length;
                    o--;

                  )
                    (f = n.data[o]),
                      f instanceof K
                        ? f.data !== "nested" &&
                          (f.scrollTrigger && f.scrollTrigger.revert(),
                          f.kill())
                        : !(f instanceof N) && f.revert && f.revert(i);
                  n._r.forEach(function (l) {
                    return l(i, n);
                  }),
                    (n.isReverted = !0);
                })()
              : this.data.forEach(function (a) {
                  return a.kill && a.kill();
                }),
            this.clear(),
            r)
          )
            for (var s = Rt.length; s--; )
              Rt[s].id === this.id && Rt.splice(s, 1);
        }),
        (t.revert = function (i) {
          this.kill(i || {});
        }),
        u
      );
    })(),
    bn = (function () {
      function u(e) {
        (this.contexts = []), (this.scope = e), A && A.data.push(this);
      }
      var t = u.prototype;
      return (
        (t.add = function (i, r, n) {
          ht(i) || (i = { matches: i });
          var s = new lr(0, n || this.scope),
            a = (s.conditions = {}),
            o,
            f,
            l;
          A && !s.selector && (s.selector = A.selector),
            this.contexts.push(s),
            (r = s.add("onMatch", r)),
            (s.queries = i);
          for (f in i)
            f === "all"
              ? (l = 1)
              : ((o = _t.matchMedia(i[f])),
                o &&
                  (Rt.indexOf(s) < 0 && Rt.push(s),
                  (a[f] = o.matches) && (l = 1),
                  o.addListener
                    ? o.addListener(ni)
                    : o.addEventListener("change", ni)));
          return (
            l &&
              r(s, function (_) {
                return s.add(null, _);
              }),
            this
          );
        }),
        (t.revert = function (i) {
          this.kill(i || {});
        }),
        (t.kill = function (i) {
          this.contexts.forEach(function (r) {
            return r.kill(i, !0);
          });
        }),
        u
      );
    })(),
    Se = {
      registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
          e[i] = arguments[i];
        e.forEach(function (r) {
          return $i(r);
        });
      },
      timeline: function (t) {
        return new K(t);
      },
      getTweensOf: function (t, e) {
        return E.getTweensOf(t, e);
      },
      getProperty: function (t, e, i, r) {
        B(t) && (t = ut(t)[0]);
        var n = Ct(t || {}).get,
          s = i ? Di : Mi;
        return (
          i === "native" && (i = ""),
          t &&
            (e
              ? s(((it[e] && it[e].get) || n)(t, e, i, r))
              : function (a, o, f) {
                  return s(((it[a] && it[a].get) || n)(t, a, o, f));
                })
        );
      },
      quickSetter: function (t, e, i) {
        if (((t = ut(t)), t.length > 1)) {
          var r = t.map(function (l) {
              return H.quickSetter(l, e, i);
            }),
            n = r.length;
          return function (l) {
            for (var _ = n; _--; ) r[_](l);
          };
        }
        t = t[0] || {};
        var s = it[e],
          a = Ct(t),
          o = (a.harness && (a.harness.aliases || {})[e]) || e,
          f = s
            ? function (l) {
                var _ = new s();
                (Wt._pt = 0),
                  _.init(t, i ? l + i : l, Wt, 0, [t]),
                  _.render(1, _),
                  Wt._pt && ii(1, Wt);
              }
            : a.set(t, o);
        return s
          ? f
          : function (l) {
              return f(t, o, i ? l + i : l, a, 1);
            };
      },
      quickTo: function (t, e, i) {
        var r,
          n = H.to(
            t,
            rt(
              ((r = {}), (r[e] = "+=0.1"), (r.paused = !0), (r.stagger = 0), r),
              i || {}
            )
          ),
          s = function (o, f, l) {
            return n.resetTo(e, o, f, l);
          };
        return (s.tween = n), s;
      },
      isTweening: function (t) {
        return E.getTweensOf(t, !0).length > 0;
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = Dt(t.ease, Bt.ease)), Ai(Bt, t || {});
      },
      config: function (t) {
        return Ai(tt, t || {});
      },
      registerEffect: function (t) {
        var e = t.name,
          i = t.effect,
          r = t.plugins,
          n = t.defaults,
          s = t.extendTimeline;
        (r || "").split(",").forEach(function (a) {
          return (
            a &&
            !it[a] &&
            !et[a] &&
            Ht(e + " effect requires " + a + " plugin.")
          );
        }),
          (Be[e] = function (a, o, f) {
            return i(ut(a), rt(o || {}, n), f);
          }),
          s &&
            (K.prototype[e] = function (a, o, f) {
              return this.add(Be[e](a, ht(o) ? o : (f = o) && {}, this), f);
            });
      },
      registerEase: function (t, e) {
        k[t] = Dt(e);
      },
      parseEase: function (t, e) {
        return arguments.length ? Dt(t, e) : k;
      },
      getById: function (t) {
        return E.getById(t);
      },
      exportRoot: function (t, e) {
        t === void 0 && (t = {});
        var i = new K(t),
          r,
          n;
        for (
          i.smoothChildTiming = Q(t.smoothChildTiming),
            E.remove(i),
            i._dp = 0,
            i._time = i._tTime = E._time,
            r = E._first;
          r;

        )
          (n = r._next),
            (e ||
              !(
                !r._dur &&
                r instanceof N &&
                r.vars.onComplete === r._targets[0]
              )) &&
              ct(i, r, r._start - r._delay),
            (r = n);
        return ct(E, i, 0), i;
      },
      context: function (t, e) {
        return t ? new lr(t, e) : A;
      },
      matchMedia: function (t) {
        return new bn(t);
      },
      matchMediaRefresh: function () {
        return (
          Rt.forEach(function (t) {
            var e = t.conditions,
              i,
              r;
            for (r in e) e[r] && ((e[r] = !1), (i = 1));
            i && t.revert();
          }) || ni()
        );
      },
      addEventListener: function (t, e) {
        var i = Pe[t] || (Pe[t] = []);
        ~i.indexOf(e) || i.push(e);
      },
      removeEventListener: function (t, e) {
        var i = Pe[t],
          r = i && i.indexOf(e);
        r >= 0 && i.splice(r, 1);
      },
      utils: {
        wrap: tn,
        wrapYoyo: en,
        distribute: Bi,
        random: Yi,
        snap: Ui,
        normalize: Jr,
        getUnit: $,
        clamp: Qr,
        splitColor: Ki,
        toArray: ut,
        selector: We,
        mapRange: qi,
        pipe: jr,
        unitize: Hr,
        interpolate: rn,
        shuffle: Vi,
      },
      install: bi,
      effects: Be,
      ticker: st,
      updateRoot: K.updateRoot,
      plugins: it,
      globalTimeline: E,
      core: {
        PropTween: j,
        globals: Pi,
        Tween: N,
        Timeline: K,
        Animation: oe,
        getCache: Ct,
        _removeLinkedListItem: Te,
        reverting: function () {
          return X;
        },
        context: function (t) {
          return t && A && (A.data.push(t), (t._ctx = A)), A;
        },
        suppressOverwrites: function (t) {
          return (Me = t);
        },
      },
    };
  Z("to,from,fromTo,delayedCall,set,killTweensOf", function (u) {
    return (Se[u] = N[u]);
  }),
    st.add(K.updateRoot),
    (Wt = Se.to({}, { duration: 0 }));
  var Pn = function (t, e) {
      for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
        i = i._next;
      return i;
    },
    Sn = function (t, e) {
      var i = t._targets,
        r,
        n,
        s;
      for (r in e)
        for (n = i.length; n--; )
          (s = t._ptLookup[n][r]),
            s &&
              (s = s.d) &&
              (s._pt && (s = Pn(s, r)),
              s && s.modifier && s.modifier(e[r], t, i[n], r));
    },
    si = function (t, e) {
      return {
        name: t,
        rawVars: 1,
        init: function (r, n, s) {
          s._onInit = function (a) {
            var o, f;
            if (
              (B(n) &&
                ((o = {}),
                Z(n, function (l) {
                  return (o[l] = 1);
                }),
                (n = o)),
              e)
            ) {
              o = {};
              for (f in n) o[f] = e(n[f]);
              n = o;
            }
            Sn(a, n);
          };
        },
      };
    },
    H =
      Se.registerPlugin(
        {
          name: "attr",
          init: function (t, e, i, r, n) {
            var s, a, o;
            this.tween = i;
            for (s in e)
              (o = t.getAttribute(s) || ""),
                (a = this.add(
                  t,
                  "setAttribute",
                  (o || 0) + "",
                  e[s],
                  r,
                  n,
                  0,
                  0,
                  s
                )),
                (a.op = s),
                (a.b = o),
                this._props.push(s);
          },
          render: function (t, e) {
            for (var i = e._pt; i; )
              X ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), (i = i._next);
          },
        },
        {
          name: "endArray",
          init: function (t, e) {
            for (var i = e.length; i--; )
              this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
          },
        },
        si("roundProps", $e),
        si("modifiers"),
        si("snap", Ui)
      ) || Se;
  (N.version = K.version = H.version = "3.12.7"),
    (wi = 1),
    Re() && $t(),
    k.Power0,
    k.Power1,
    k.Power2,
    k.Power3,
    k.Power4,
    k.Linear,
    k.Quad,
    k.Cubic,
    k.Quart,
    k.Quint,
    k.Strong,
    k.Elastic,
    k.Back,
    k.SteppedEase,
    k.Bounce,
    k.Sine,
    k.Expo,
    k.Circ;
  /*!
   * CSSPlugin 3.12.7
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var hr,
    St,
    Kt,
    ai,
    Et,
    _r,
    oi,
    kn = function () {
      return typeof window < "u";
    },
    gt = {},
    zt = 180 / Math.PI,
    Qt = Math.PI / 180,
    Zt = Math.atan2,
    cr = 1e8,
    ui = /([A-Z])/g,
    On = /(left|right|width|margin|padding|x)/i,
    Cn = /[\s,\(]\S/,
    dt = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    fi = function (t, e) {
      return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
    },
    Mn = function (t, e) {
      return e.set(
        e.t,
        e.p,
        t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u,
        e
      );
    },
    Dn = function (t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b,
        e
      );
    },
    An = function (t, e) {
      var i = e.s + e.c * t;
      e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    dr = function (t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e);
    },
    pr = function (t, e) {
      return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
    },
    Rn = function (t, e, i) {
      return (t.style[e] = i);
    },
    En = function (t, e, i) {
      return t.style.setProperty(e, i);
    },
    zn = function (t, e, i) {
      return (t._gsap[e] = i);
    },
    Fn = function (t, e, i) {
      return (t._gsap.scaleX = t._gsap.scaleY = i);
    },
    Ln = function (t, e, i, r, n) {
      var s = t._gsap;
      (s.scaleX = s.scaleY = i), s.renderTransform(n, s);
    },
    In = function (t, e, i, r, n) {
      var s = t._gsap;
      (s[e] = i), s.renderTransform(n, s);
    },
    z = "transform",
    J = z + "Origin",
    Nn = function u(t, e) {
      var i = this,
        r = this.target,
        n = r.style,
        s = r._gsap;
      if (t in gt && n) {
        if (((this.tfm = this.tfm || {}), t !== "transform"))
          (t = dt[t] || t),
            ~t.indexOf(",")
              ? t.split(",").forEach(function (a) {
                  return (i.tfm[a] = yt(r, a));
                })
              : (this.tfm[t] = s.x ? s[t] : yt(r, t)),
            t === J && (this.tfm.zOrigin = s.zOrigin);
        else
          return dt.transform.split(",").forEach(function (a) {
            return u.call(i, a, e);
          });
        if (this.props.indexOf(z) >= 0) return;
        s.svg &&
          ((this.svgo = r.getAttribute("data-svg-origin")),
          this.props.push(J, e, "")),
          (t = z);
      }
      (n || e) && this.props.push(t, e, n[t]);
    },
    mr = function (t) {
      t.translate &&
        (t.removeProperty("translate"),
        t.removeProperty("scale"),
        t.removeProperty("rotate"));
    },
    Vn = function () {
      var t = this.props,
        e = this.target,
        i = e.style,
        r = e._gsap,
        n,
        s;
      for (n = 0; n < t.length; n += 3)
        t[n + 1]
          ? t[n + 1] === 2
            ? e[t[n]](t[n + 2])
            : (e[t[n]] = t[n + 2])
          : t[n + 2]
          ? (i[t[n]] = t[n + 2])
          : i.removeProperty(
              t[n].substr(0, 2) === "--"
                ? t[n]
                : t[n].replace(ui, "-$1").toLowerCase()
            );
      if (this.tfm) {
        for (s in this.tfm) r[s] = this.tfm[s];
        r.svg &&
          (r.renderTransform(),
          e.setAttribute("data-svg-origin", this.svgo || "")),
          (n = oi()),
          (!n || !n.isStart) &&
            !i[z] &&
            (mr(i),
            r.zOrigin &&
              i[J] &&
              ((i[J] += " " + r.zOrigin + "px"),
              (r.zOrigin = 0),
              r.renderTransform()),
            (r.uncache = 1));
      }
    },
    gr = function (t, e) {
      var i = { target: t, props: [], revert: Vn, save: Nn };
      return (
        t._gsap || H.core.getCache(t),
        e &&
          t.style &&
          t.nodeType &&
          e.split(",").forEach(function (r) {
            return i.save(r);
          }),
        i
      );
    },
    yr,
    li = function (t, e) {
      var i = St.createElementNS
        ? St.createElementNS(
            (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            t
          )
        : St.createElement(t);
      return i && i.style ? i : St.createElement(t);
    },
    pt = function u(t, e, i) {
      var r = getComputedStyle(t);
      return (
        r[e] ||
        r.getPropertyValue(e.replace(ui, "-$1").toLowerCase()) ||
        r.getPropertyValue(e) ||
        (!i && u(t, jt(e) || e, 1)) ||
        ""
      );
    },
    xr = "O,Moz,ms,Ms,Webkit".split(","),
    jt = function (t, e, i) {
      var r = e || Et,
        n = r.style,
        s = 5;
      if (t in n && !i) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        s-- && !(xr[s] + t in n);

      );
      return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? xr[s] : "") + t;
    },
    hi = function () {
      kn() &&
        window.document &&
        ((hr = window),
        (St = hr.document),
        (Kt = St.documentElement),
        (Et = li("div") || { style: {} }),
        li("div"),
        (z = jt(z)),
        (J = z + "Origin"),
        (Et.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (yr = !!jt("perspective")),
        (oi = H.core.reverting),
        (ai = 1));
    },
    Tr = function (t) {
      var e = t.ownerSVGElement,
        i = li(
          "svg",
          (e && e.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"
        ),
        r = t.cloneNode(!0),
        n;
      (r.style.display = "block"), i.appendChild(r), Kt.appendChild(i);
      try {
        n = r.getBBox();
      } catch {}
      return i.removeChild(r), Kt.removeChild(i), n;
    },
    vr = function (t, e) {
      for (var i = e.length; i--; )
        if (t.hasAttribute(e[i])) return t.getAttribute(e[i]);
    },
    wr = function (t) {
      var e, i;
      try {
        e = t.getBBox();
      } catch {
        (e = Tr(t)), (i = 1);
      }
      return (
        (e && (e.width || e.height)) || i || (e = Tr(t)),
        e && !e.width && !e.x && !e.y
          ? {
              x: +vr(t, ["x", "cx", "x1"]) || 0,
              y: +vr(t, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
          : e
      );
    },
    br = function (t) {
      return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && wr(t));
    },
    Ft = function (t, e) {
      if (e) {
        var i = t.style,
          r;
        e in gt && e !== J && (e = z),
          i.removeProperty
            ? ((r = e.substr(0, 2)),
              (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e),
              i.removeProperty(
                r === "--" ? e : e.replace(ui, "-$1").toLowerCase()
              ))
            : i.removeAttribute(e);
      }
    },
    kt = function (t, e, i, r, n, s) {
      var a = new j(t._pt, e, i, 0, 1, s ? pr : dr);
      return (t._pt = a), (a.b = r), (a.e = n), t._props.push(i), a;
    },
    Pr = { deg: 1, rad: 1, turn: 1 },
    Bn = { grid: 1, flex: 1 },
    Ot = function u(t, e, i, r) {
      var n = parseFloat(i) || 0,
        s = (i + "").trim().substr((n + "").length) || "px",
        a = Et.style,
        o = On.test(e),
        f = t.tagName.toLowerCase() === "svg",
        l = (f ? "client" : "offset") + (o ? "Width" : "Height"),
        _ = 100,
        c = r === "px",
        d = r === "%",
        m,
        h,
        p,
        g;
      if (r === s || !n || Pr[r] || Pr[s]) return n;
      if (
        (s !== "px" && !c && (n = u(t, e, i, "px")),
        (g = t.getCTM && br(t)),
        (d || s === "%") && (gt[e] || ~e.indexOf("adius")))
      )
        return (
          (m = g ? t.getBBox()[o ? "width" : "height"] : t[l]),
          L(d ? (n / m) * _ : (n / 100) * m)
        );
      if (
        ((a[o ? "width" : "height"] = _ + (c ? s : r)),
        (h =
          (r !== "rem" && ~e.indexOf("adius")) ||
          (r === "em" && t.appendChild && !f)
            ? t
            : t.parentNode),
        g && (h = (t.ownerSVGElement || {}).parentNode),
        (!h || h === St || !h.appendChild) && (h = St.body),
        (p = h._gsap),
        p && d && p.width && o && p.time === st.time && !p.uncache)
      )
        return L((n / p.width) * _);
      if (d && (e === "height" || e === "width")) {
        var x = t.style[e];
        (t.style[e] = _ + r), (m = t[l]), x ? (t.style[e] = x) : Ft(t, e);
      } else
        (d || s === "%") &&
          !Bn[pt(h, "display")] &&
          (a.position = pt(t, "position")),
          h === t && (a.position = "static"),
          h.appendChild(Et),
          (m = Et[l]),
          h.removeChild(Et),
          (a.position = "absolute");
      return (
        o && d && ((p = Ct(h)), (p.time = st.time), (p.width = h[l])),
        L(c ? (m * n) / _ : m && n ? (_ / m) * n : 0)
      );
    },
    yt = function (t, e, i, r) {
      var n;
      return (
        ai || hi(),
        e in dt &&
          e !== "transform" &&
          ((e = dt[e]), ~e.indexOf(",") && (e = e.split(",")[0])),
        gt[e] && e !== "transform"
          ? ((n = le(t, r)),
            (n =
              e !== "transformOrigin"
                ? n[e]
                : n.svg
                ? n.origin
                : Oe(pt(t, J)) + " " + n.zOrigin + "px"))
          : ((n = t.style[e]),
            (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) &&
              (n =
                (ke[e] && ke[e](t, e, i)) ||
                pt(t, e) ||
                Oi(t, e) ||
                (e === "opacity" ? 1 : 0))),
        i && !~(n + "").trim().indexOf(" ") ? Ot(t, e, n, i) + i : n
      );
    },
    Un = function (t, e, i, r) {
      if (!i || i === "none") {
        var n = jt(e, t, 1),
          s = n && pt(t, n, 1);
        s && s !== i
          ? ((e = n), (i = s))
          : e === "borderColor" && (i = pt(t, "borderTopColor"));
      }
      var a = new j(this._pt, t.style, e, 0, 1, or),
        o = 0,
        f = 0,
        l,
        _,
        c,
        d,
        m,
        h,
        p,
        g,
        x,
        T,
        v,
        y;
      if (
        ((a.b = i),
        (a.e = r),
        (i += ""),
        (r += ""),
        r === "auto" &&
          ((h = t.style[e]),
          (t.style[e] = r),
          (r = pt(t, e) || r),
          h ? (t.style[e] = h) : Ft(t, e)),
        (l = [i, r]),
        ji(l),
        (i = l[0]),
        (r = l[1]),
        (c = i.match(Ut) || []),
        (y = r.match(Ut) || []),
        y.length)
      ) {
        for (; (_ = Ut.exec(r)); )
          (p = _[0]),
            (x = r.substring(o, _.index)),
            m
              ? (m = (m + 1) % 5)
              : (x.substr(-5) === "rgba(" || x.substr(-5) === "hsla(") &&
                (m = 1),
            p !== (h = c[f++] || "") &&
              ((d = parseFloat(h) || 0),
              (v = h.substr((d + "").length)),
              p.charAt(1) === "=" && (p = Yt(d, p) + v),
              (g = parseFloat(p)),
              (T = p.substr((g + "").length)),
              (o = Ut.lastIndex - T.length),
              T ||
                ((T = T || tt.units[e] || v),
                o === r.length && ((r += T), (a.e += T))),
              v !== T && (d = Ot(t, e, h, T) || 0),
              (a._pt = {
                _next: a._pt,
                p: x || f === 1 ? x : ",",
                s: d,
                c: g - d,
                m: (m && m < 4) || e === "zIndex" ? Math.round : 0,
              }));
        a.c = o < r.length ? r.substring(o, r.length) : "";
      } else a.r = e === "display" && r === "none" ? pr : dr;
      return Ti.test(r) && (a.e = 0), (this._pt = a), a;
    },
    Sr = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    Yn = function (t) {
      var e = t.split(" "),
        i = e[0],
        r = e[1] || "50%";
      return (
        (i === "top" || i === "bottom" || r === "left" || r === "right") &&
          ((t = i), (i = r), (r = t)),
        (e[0] = Sr[i] || i),
        (e[1] = Sr[r] || r),
        e.join(" ")
      );
    },
    Xn = function (t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var i = e.t,
          r = i.style,
          n = e.u,
          s = i._gsap,
          a,
          o,
          f;
        if (n === "all" || n === !0) (r.cssText = ""), (o = 1);
        else
          for (n = n.split(","), f = n.length; --f > -1; )
            (a = n[f]),
              gt[a] && ((o = 1), (a = a === "transformOrigin" ? J : z)),
              Ft(i, a);
        o &&
          (Ft(i, z),
          s &&
            (s.svg && i.removeAttribute("transform"),
            (r.scale = r.rotate = r.translate = "none"),
            le(i, 1),
            (s.uncache = 1),
            mr(r)));
      }
    },
    ke = {
      clearProps: function (t, e, i, r, n) {
        if (n.data !== "isFromStart") {
          var s = (t._pt = new j(t._pt, e, i, 0, 0, Xn));
          return (s.u = r), (s.pr = -10), (s.tween = n), t._props.push(i), 1;
        }
      },
    },
    fe = [1, 0, 0, 1, 0, 0],
    kr = {},
    Or = function (t) {
      return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
    },
    Cr = function (t) {
      var e = pt(t, z);
      return Or(e) ? fe : e.substr(7).match(xi).map(L);
    },
    _i = function (t, e) {
      var i = t._gsap || Ct(t),
        r = t.style,
        n = Cr(t),
        s,
        a,
        o,
        f;
      return i.svg && t.getAttribute("transform")
        ? ((o = t.transform.baseVal.consolidate().matrix),
          (n = [o.a, o.b, o.c, o.d, o.e, o.f]),
          n.join(",") === "1,0,0,1,0,0" ? fe : n)
        : (n === fe &&
            !t.offsetParent &&
            t !== Kt &&
            !i.svg &&
            ((o = r.display),
            (r.display = "block"),
            (s = t.parentNode),
            (!s || (!t.offsetParent && !t.getBoundingClientRect().width)) &&
              ((f = 1), (a = t.nextElementSibling), Kt.appendChild(t)),
            (n = Cr(t)),
            o ? (r.display = o) : Ft(t, "display"),
            f &&
              (a
                ? s.insertBefore(t, a)
                : s
                ? s.appendChild(t)
                : Kt.removeChild(t))),
          e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
    },
    ci = function (t, e, i, r, n, s) {
      var a = t._gsap,
        o = n || _i(t, !0),
        f = a.xOrigin || 0,
        l = a.yOrigin || 0,
        _ = a.xOffset || 0,
        c = a.yOffset || 0,
        d = o[0],
        m = o[1],
        h = o[2],
        p = o[3],
        g = o[4],
        x = o[5],
        T = e.split(" "),
        v = parseFloat(T[0]) || 0,
        y = parseFloat(T[1]) || 0,
        b,
        P,
        S,
        w;
      i
        ? o !== fe &&
          (P = d * p - m * h) &&
          ((S = v * (p / P) + y * (-h / P) + (h * x - p * g) / P),
          (w = v * (-m / P) + y * (d / P) - (d * x - m * g) / P),
          (v = S),
          (y = w))
        : ((b = wr(t)),
          (v = b.x + (~T[0].indexOf("%") ? (v / 100) * b.width : v)),
          (y =
            b.y + (~(T[1] || T[0]).indexOf("%") ? (y / 100) * b.height : y))),
        r || (r !== !1 && a.smooth)
          ? ((g = v - f),
            (x = y - l),
            (a.xOffset = _ + (g * d + x * h) - g),
            (a.yOffset = c + (g * m + x * p) - x))
          : (a.xOffset = a.yOffset = 0),
        (a.xOrigin = v),
        (a.yOrigin = y),
        (a.smooth = !!r),
        (a.origin = e),
        (a.originIsAbsolute = !!i),
        (t.style[J] = "0px 0px"),
        s &&
          (kt(s, a, "xOrigin", f, v),
          kt(s, a, "yOrigin", l, y),
          kt(s, a, "xOffset", _, a.xOffset),
          kt(s, a, "yOffset", c, a.yOffset)),
        t.setAttribute("data-svg-origin", v + " " + y);
    },
    le = function (t, e) {
      var i = t._gsap || new er(t);
      if ("x" in i && !e && !i.uncache) return i;
      var r = t.style,
        n = i.scaleX < 0,
        s = "px",
        a = "deg",
        o = getComputedStyle(t),
        f = pt(t, J) || "0",
        l,
        _,
        c,
        d,
        m,
        h,
        p,
        g,
        x,
        T,
        v,
        y,
        b,
        P,
        S,
        w,
        O,
        R,
        M,
        D,
        q,
        U,
        V,
        Y,
        ft,
        Ce,
        _e,
        ce,
        Nt,
        Rr,
        xt,
        Vt;
      return (
        (l = _ = c = h = p = g = x = T = v = 0),
        (d = m = 1),
        (i.svg = !!(t.getCTM && br(t))),
        o.translate &&
          ((o.translate !== "none" ||
            o.scale !== "none" ||
            o.rotate !== "none") &&
            (r[z] =
              (o.translate !== "none"
                ? "translate3d(" +
                  (o.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              (o.rotate !== "none" ? "rotate(" + o.rotate + ") " : "") +
              (o.scale !== "none"
                ? "scale(" + o.scale.split(" ").join(",") + ") "
                : "") +
              (o[z] !== "none" ? o[z] : "")),
          (r.scale = r.rotate = r.translate = "none")),
        (P = _i(t, i.svg)),
        i.svg &&
          (i.uncache
            ? ((ft = t.getBBox()),
              (f = i.xOrigin - ft.x + "px " + (i.yOrigin - ft.y) + "px"),
              (Y = ""))
            : (Y = !e && t.getAttribute("data-svg-origin")),
          ci(t, Y || f, !!Y || i.originIsAbsolute, i.smooth !== !1, P)),
        (y = i.xOrigin || 0),
        (b = i.yOrigin || 0),
        P !== fe &&
          ((R = P[0]),
          (M = P[1]),
          (D = P[2]),
          (q = P[3]),
          (l = U = P[4]),
          (_ = V = P[5]),
          P.length === 6
            ? ((d = Math.sqrt(R * R + M * M)),
              (m = Math.sqrt(q * q + D * D)),
              (h = R || M ? Zt(M, R) * zt : 0),
              (x = D || q ? Zt(D, q) * zt + h : 0),
              x && (m *= Math.abs(Math.cos(x * Qt))),
              i.svg && ((l -= y - (y * R + b * D)), (_ -= b - (y * M + b * q))))
            : ((Vt = P[6]),
              (Rr = P[7]),
              (_e = P[8]),
              (ce = P[9]),
              (Nt = P[10]),
              (xt = P[11]),
              (l = P[12]),
              (_ = P[13]),
              (c = P[14]),
              (S = Zt(Vt, Nt)),
              (p = S * zt),
              S &&
                ((w = Math.cos(-S)),
                (O = Math.sin(-S)),
                (Y = U * w + _e * O),
                (ft = V * w + ce * O),
                (Ce = Vt * w + Nt * O),
                (_e = U * -O + _e * w),
                (ce = V * -O + ce * w),
                (Nt = Vt * -O + Nt * w),
                (xt = Rr * -O + xt * w),
                (U = Y),
                (V = ft),
                (Vt = Ce)),
              (S = Zt(-D, Nt)),
              (g = S * zt),
              S &&
                ((w = Math.cos(-S)),
                (O = Math.sin(-S)),
                (Y = R * w - _e * O),
                (ft = M * w - ce * O),
                (Ce = D * w - Nt * O),
                (xt = q * O + xt * w),
                (R = Y),
                (M = ft),
                (D = Ce)),
              (S = Zt(M, R)),
              (h = S * zt),
              S &&
                ((w = Math.cos(S)),
                (O = Math.sin(S)),
                (Y = R * w + M * O),
                (ft = U * w + V * O),
                (M = M * w - R * O),
                (V = V * w - U * O),
                (R = Y),
                (U = ft)),
              p &&
                Math.abs(p) + Math.abs(h) > 359.9 &&
                ((p = h = 0), (g = 180 - g)),
              (d = L(Math.sqrt(R * R + M * M + D * D))),
              (m = L(Math.sqrt(V * V + Vt * Vt))),
              (S = Zt(U, V)),
              (x = Math.abs(S) > 2e-4 ? S * zt : 0),
              (v = xt ? 1 / (xt < 0 ? -xt : xt) : 0)),
          i.svg &&
            ((Y = t.getAttribute("transform")),
            (i.forceCSS = t.setAttribute("transform", "") || !Or(pt(t, z))),
            Y && t.setAttribute("transform", Y))),
        Math.abs(x) > 90 &&
          Math.abs(x) < 270 &&
          (n
            ? ((d *= -1),
              (x += h <= 0 ? 180 : -180),
              (h += h <= 0 ? 180 : -180))
            : ((m *= -1), (x += x <= 0 ? 180 : -180))),
        (e = e || i.uncache),
        (i.x =
          l -
          ((i.xPercent =
            l &&
            ((!e && i.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-l) ? -50 : 0)))
            ? (t.offsetWidth * i.xPercent) / 100
            : 0) +
          s),
        (i.y =
          _ -
          ((i.yPercent =
            _ &&
            ((!e && i.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0)))
            ? (t.offsetHeight * i.yPercent) / 100
            : 0) +
          s),
        (i.z = c + s),
        (i.scaleX = L(d)),
        (i.scaleY = L(m)),
        (i.rotation = L(h) + a),
        (i.rotationX = L(p) + a),
        (i.rotationY = L(g) + a),
        (i.skewX = x + a),
        (i.skewY = T + a),
        (i.transformPerspective = v + s),
        (i.zOrigin = parseFloat(f.split(" ")[2]) || (!e && i.zOrigin) || 0) &&
          (r[J] = Oe(f)),
        (i.xOffset = i.yOffset = 0),
        (i.force3D = tt.force3D),
        (i.renderTransform = i.svg ? Gn : yr ? Mr : qn),
        (i.uncache = 0),
        i
      );
    },
    Oe = function (t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    di = function (t, e, i) {
      var r = $(e);
      return L(parseFloat(e) + parseFloat(Ot(t, "x", i + "px", r))) + r;
    },
    qn = function (t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        Mr(t, e);
    },
    Lt = "0deg",
    he = "0px",
    It = ") ",
    Mr = function (t, e) {
      var i = e || this,
        r = i.xPercent,
        n = i.yPercent,
        s = i.x,
        a = i.y,
        o = i.z,
        f = i.rotation,
        l = i.rotationY,
        _ = i.rotationX,
        c = i.skewX,
        d = i.skewY,
        m = i.scaleX,
        h = i.scaleY,
        p = i.transformPerspective,
        g = i.force3D,
        x = i.target,
        T = i.zOrigin,
        v = "",
        y = (g === "auto" && t && t !== 1) || g === !0;
      if (T && (_ !== Lt || l !== Lt)) {
        var b = parseFloat(l) * Qt,
          P = Math.sin(b),
          S = Math.cos(b),
          w;
        (b = parseFloat(_) * Qt),
          (w = Math.cos(b)),
          (s = di(x, s, P * w * -T)),
          (a = di(x, a, -Math.sin(b) * -T)),
          (o = di(x, o, S * w * -T + T));
      }
      p !== he && (v += "perspective(" + p + It),
        (r || n) && (v += "translate(" + r + "%, " + n + "%) "),
        (y || s !== he || a !== he || o !== he) &&
          (v +=
            o !== he || y
              ? "translate3d(" + s + ", " + a + ", " + o + ") "
              : "translate(" + s + ", " + a + It),
        f !== Lt && (v += "rotate(" + f + It),
        l !== Lt && (v += "rotateY(" + l + It),
        _ !== Lt && (v += "rotateX(" + _ + It),
        (c !== Lt || d !== Lt) && (v += "skew(" + c + ", " + d + It),
        (m !== 1 || h !== 1) && (v += "scale(" + m + ", " + h + It),
        (x.style[z] = v || "translate(0, 0)");
    },
    Gn = function (t, e) {
      var i = e || this,
        r = i.xPercent,
        n = i.yPercent,
        s = i.x,
        a = i.y,
        o = i.rotation,
        f = i.skewX,
        l = i.skewY,
        _ = i.scaleX,
        c = i.scaleY,
        d = i.target,
        m = i.xOrigin,
        h = i.yOrigin,
        p = i.xOffset,
        g = i.yOffset,
        x = i.forceCSS,
        T = parseFloat(s),
        v = parseFloat(a),
        y,
        b,
        P,
        S,
        w;
      (o = parseFloat(o)),
        (f = parseFloat(f)),
        (l = parseFloat(l)),
        l && ((l = parseFloat(l)), (f += l), (o += l)),
        o || f
          ? ((o *= Qt),
            (f *= Qt),
            (y = Math.cos(o) * _),
            (b = Math.sin(o) * _),
            (P = Math.sin(o - f) * -c),
            (S = Math.cos(o - f) * c),
            f &&
              ((l *= Qt),
              (w = Math.tan(f - l)),
              (w = Math.sqrt(1 + w * w)),
              (P *= w),
              (S *= w),
              l &&
                ((w = Math.tan(l)),
                (w = Math.sqrt(1 + w * w)),
                (y *= w),
                (b *= w))),
            (y = L(y)),
            (b = L(b)),
            (P = L(P)),
            (S = L(S)))
          : ((y = _), (S = c), (b = P = 0)),
        ((T && !~(s + "").indexOf("px")) || (v && !~(a + "").indexOf("px"))) &&
          ((T = Ot(d, "x", s, "px")), (v = Ot(d, "y", a, "px"))),
        (m || h || p || g) &&
          ((T = L(T + m - (m * y + h * P) + p)),
          (v = L(v + h - (m * b + h * S) + g))),
        (r || n) &&
          ((w = d.getBBox()),
          (T = L(T + (r / 100) * w.width)),
          (v = L(v + (n / 100) * w.height))),
        (w =
          "matrix(" +
          y +
          "," +
          b +
          "," +
          P +
          "," +
          S +
          "," +
          T +
          "," +
          v +
          ")"),
        d.setAttribute("transform", w),
        x && (d.style[z] = w);
    },
    Wn = function (t, e, i, r, n) {
      var s = 360,
        a = B(n),
        o = parseFloat(n) * (a && ~n.indexOf("rad") ? zt : 1),
        f = o - r,
        l = r + f + "deg",
        _,
        c;
      return (
        a &&
          ((_ = n.split("_")[1]),
          _ === "short" &&
            ((f %= s), f !== f % (s / 2) && (f += f < 0 ? s : -360)),
          _ === "cw" && f < 0
            ? (f = ((f + s * cr) % s) - ~~(f / s) * s)
            : _ === "ccw" && f > 0 && (f = ((f - s * cr) % s) - ~~(f / s) * s)),
        (t._pt = c = new j(t._pt, e, i, r, f, Mn)),
        (c.e = l),
        (c.u = "deg"),
        t._props.push(i),
        c
      );
    },
    Dr = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    },
    $n = function (t, e, i) {
      var r = Dr({}, i._gsap),
        n = "perspective,force3D,transformOrigin,svgOrigin",
        s = i.style,
        a,
        o,
        f,
        l,
        _,
        c,
        d,
        m;
      r.svg
        ? ((f = i.getAttribute("transform")),
          i.setAttribute("transform", ""),
          (s[z] = e),
          (a = le(i, 1)),
          Ft(i, z),
          i.setAttribute("transform", f))
        : ((f = getComputedStyle(i)[z]),
          (s[z] = e),
          (a = le(i, 1)),
          (s[z] = f));
      for (o in gt)
        (f = r[o]),
          (l = a[o]),
          f !== l &&
            n.indexOf(o) < 0 &&
            ((d = $(f)),
            (m = $(l)),
            (_ = d !== m ? Ot(i, o, f, m) : parseFloat(f)),
            (c = parseFloat(l)),
            (t._pt = new j(t._pt, a, o, _, c - _, fi)),
            (t._pt.u = m || 0),
            t._props.push(o));
      Dr(a, r);
    };
  Z("padding,margin,Width,Radius", function (u, t) {
    var e = "Top",
      i = "Right",
      r = "Bottom",
      n = "Left",
      s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function (
        a
      ) {
        return t < 2 ? u + a : "border" + a + u;
      });
    ke[t > 1 ? "border" + u : u] = function (a, o, f, l, _) {
      var c, d;
      if (arguments.length < 4)
        return (
          (c = s.map(function (m) {
            return yt(a, m, f);
          })),
          (d = c.join(" ")),
          d.split(c[0]).length === 5 ? c[0] : d
        );
      (c = (l + "").split(" ")),
        (d = {}),
        s.forEach(function (m, h) {
          return (d[m] = c[h] = c[h] || c[((h - 1) / 2) | 0]);
        }),
        a.init(o, d, _);
    };
  });
  var Ar = {
    name: "css",
    register: hi,
    targetTest: function (t) {
      return t.style && t.nodeType;
    },
    init: function (t, e, i, r, n) {
      var s = this._props,
        a = t.style,
        o = i.vars.startAt,
        f,
        l,
        _,
        c,
        d,
        m,
        h,
        p,
        g,
        x,
        T,
        v,
        y,
        b,
        P,
        S;
      ai || hi(),
        (this.styles = this.styles || gr(t)),
        (S = this.styles.props),
        (this.tween = i);
      for (h in e)
        if (
          h !== "autoRound" &&
          ((l = e[h]), !(it[h] && ir(h, e, i, r, t, n)))
        ) {
          if (
            ((d = typeof l),
            (m = ke[h]),
            d === "function" && ((l = l.call(i, r, t, n)), (d = typeof l)),
            d === "string" && ~l.indexOf("random(") && (l = re(l)),
            m)
          )
            m(this, t, h, l, i) && (P = 1);
          else if (h.substr(0, 2) === "--")
            (f = (getComputedStyle(t).getPropertyValue(h) + "").trim()),
              (l += ""),
              (bt.lastIndex = 0),
              bt.test(f) || ((p = $(f)), (g = $(l))),
              g ? p !== g && (f = Ot(t, h, f, g) + g) : p && (l += p),
              this.add(a, "setProperty", f, l, r, n, 0, 0, h),
              s.push(h),
              S.push(h, 0, a[h]);
          else if (d !== "undefined") {
            if (
              (o && h in o
                ? ((f =
                    typeof o[h] == "function" ? o[h].call(i, r, t, n) : o[h]),
                  B(f) && ~f.indexOf("random(") && (f = re(f)),
                  $(f + "") ||
                    f === "auto" ||
                    (f += tt.units[h] || $(yt(t, h)) || ""),
                  (f + "").charAt(1) === "=" && (f = yt(t, h)))
                : (f = yt(t, h)),
              (c = parseFloat(f)),
              (x = d === "string" && l.charAt(1) === "=" && l.substr(0, 2)),
              x && (l = l.substr(2)),
              (_ = parseFloat(l)),
              h in dt &&
                (h === "autoAlpha" &&
                  (c === 1 && yt(t, "visibility") === "hidden" && _ && (c = 0),
                  S.push("visibility", 0, a.visibility),
                  kt(
                    this,
                    a,
                    "visibility",
                    c ? "inherit" : "hidden",
                    _ ? "inherit" : "hidden",
                    !_
                  )),
                h !== "scale" &&
                  h !== "transform" &&
                  ((h = dt[h]), ~h.indexOf(",") && (h = h.split(",")[0]))),
              (T = h in gt),
              T)
            ) {
              if (
                (this.styles.save(h),
                v ||
                  ((y = t._gsap),
                  (y.renderTransform && !e.parseTransform) ||
                    le(t, e.parseTransform),
                  (b = e.smoothOrigin !== !1 && y.smooth),
                  (v = this._pt =
                    new j(this._pt, a, z, 0, 1, y.renderTransform, y, 0, -1)),
                  (v.dep = 1)),
                h === "scale")
              )
                (this._pt = new j(
                  this._pt,
                  y,
                  "scaleY",
                  y.scaleY,
                  (x ? Yt(y.scaleY, x + _) : _) - y.scaleY || 0,
                  fi
                )),
                  (this._pt.u = 0),
                  s.push("scaleY", h),
                  (h += "X");
              else if (h === "transformOrigin") {
                S.push(J, 0, a[J]),
                  (l = Yn(l)),
                  y.svg
                    ? ci(t, l, 0, b, 0, this)
                    : ((g = parseFloat(l.split(" ")[2]) || 0),
                      g !== y.zOrigin && kt(this, y, "zOrigin", y.zOrigin, g),
                      kt(this, a, h, Oe(f), Oe(l)));
                continue;
              } else if (h === "svgOrigin") {
                ci(t, l, 1, b, 0, this);
                continue;
              } else if (h in kr) {
                Wn(this, y, h, c, x ? Yt(c, x + l) : l);
                continue;
              } else if (h === "smoothOrigin") {
                kt(this, y, "smooth", y.smooth, l);
                continue;
              } else if (h === "force3D") {
                y[h] = l;
                continue;
              } else if (h === "transform") {
                $n(this, l, t);
                continue;
              }
            } else h in a || (h = jt(h) || h);
            if (
              T ||
              ((_ || _ === 0) && (c || c === 0) && !Cn.test(l) && h in a)
            )
              (p = (f + "").substr((c + "").length)),
                _ || (_ = 0),
                (g = $(l) || (h in tt.units ? tt.units[h] : p)),
                p !== g && (c = Ot(t, h, f, g)),
                (this._pt = new j(
                  this._pt,
                  T ? y : a,
                  h,
                  c,
                  (x ? Yt(c, x + _) : _) - c,
                  !T && (g === "px" || h === "zIndex") && e.autoRound !== !1
                    ? An
                    : fi
                )),
                (this._pt.u = g || 0),
                p !== g && g !== "%" && ((this._pt.b = f), (this._pt.r = Dn));
            else if (h in a) Un.call(this, t, h, f, x ? x + l : l);
            else if (h in t) this.add(t, h, f || t[h], x ? x + l : l, r, n);
            else if (h !== "parseTransform") {
              Ie(h, l);
              continue;
            }
            T ||
              (h in a
                ? S.push(h, 0, a[h])
                : typeof t[h] == "function"
                ? S.push(h, 2, t[h]())
                : S.push(h, 1, f || t[h])),
              s.push(h);
          }
        }
      P && ur(this);
    },
    render: function (t, e) {
      if (e.tween._time || !oi())
        for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
      else e.styles.revert();
    },
    get: yt,
    aliases: dt,
    getSetter: function (t, e, i) {
      var r = dt[e];
      return (
        r && r.indexOf(",") < 0 && (e = r),
        e in gt && e !== J && (t._gsap.x || yt(t, "x"))
          ? i && _r === i
            ? e === "scale"
              ? Fn
              : zn
            : (_r = i || {}) && (e === "scale" ? Ln : In)
          : t.style && !Ae(t.style[e])
          ? Rn
          : ~e.indexOf("-")
          ? En
          : ei(t, e)
      );
    },
    core: { _removeProperty: Ft, _getMatrix: _i },
  };
  (H.utils.checkPrefix = jt),
    (H.core.getStyleSaver = gr),
    (function (u, t, e, i) {
      var r = Z(u + "," + t + "," + e, function (n) {
        gt[n] = 1;
      });
      Z(t, function (n) {
        (tt.units[n] = "deg"), (kr[n] = 1);
      }),
        (dt[r[13]] = u + "," + t),
        Z(i, function (n) {
          var s = n.split(":");
          dt[s[1]] = r[s[0]];
        });
    })(
      "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
      "rotation,rotationX,rotationY,skewX,skewY",
      "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
    ),
    Z(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (u) {
        tt.units[u] = "px";
      }
    ),
    H.registerPlugin(Ar);
  var pi = H.registerPlugin(Ar) || H;
  pi.core.Tween;
  function Kn() {
    const u = document.documentElement,
      t = getComputedStyle(u);
    let e,
      i = "false",
      r = 0.4,
      n = "power2.inOut";
    const s =
      "background-primary,text-primary,text-secondary,link-primary,navbar";
    let a = {},
      o = {};
    s.split(",").forEach(function (h) {
      let p = t.getPropertyValue(`--light-mode--${h}`),
        g = t.getPropertyValue(`--dark-mode--${h}`);
      p.length &&
        (g.length || (g = p),
        (a[`--light-mode--${h}`] = p),
        (o[`--light-mode--${h}`] = g));
    });
    function f(h, p) {
      typeof pi < "u" && p
        ? pi.to(u, { ...h, duration: r, ease: n })
        : Object.keys(h).forEach(function (g) {
            u.style.setProperty(g, h[g]);
          });
    }
    function l(h, p) {
      h
        ? (localStorage.setItem("dark-mode", "true"),
          u.classList.add("dark-mode"),
          f(o, p),
          (i = "true"))
        : (localStorage.setItem("dark-mode", "false"),
          u.classList.remove("dark-mode"),
          f(a, p),
          (i = "false")),
        typeof e < "u" &&
          e.forEach(function (g) {
            g.setAttribute("aria-pressed", i);
          });
    }
    function _() {
      const h = document.querySelectorAll(".clock"),
        p = {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Australia/Sydney",
          hour12: !0,
        };
      h.forEach((g) => {
        let x = new Date(),
          T = x.toLocaleTimeString("en-AU", p);
        (g.textContent = T),
          setInterval(() => {
            (x = new Date()),
              (T = x.toLocaleTimeString("en-AU", p)),
              (g.textContent = T);
          }, 5e3);
      });
    }
    function c(h) {
      l(h.matches, !1);
    }
    const d = window.matchMedia("(prefers-color-scheme: dark)");
    d.addEventListener("change", (h) => {
      c(h);
    });
    let m = localStorage.getItem("dark-mode");
    m !== null ? l(m === "true", !1) : c(d),
      window.addEventListener("DOMContentLoaded", (h) => {
        _(),
          (e = document.querySelectorAll("[color-toggle]")),
          e.forEach(function (p) {
            p.setAttribute("aria-label", "View Dark Mode"),
              p.setAttribute("role", "button"),
              p.setAttribute("aria-pressed", i);
          }),
          e.forEach(function (p) {
            p.addEventListener("click", function () {
              let g = u.classList.contains("dark-mode");
              l(!g, !0);
            });
          });
      });
  }
  Kn();
});
