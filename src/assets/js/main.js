function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}
function onYouTubePlayerReady(e) {
    mejs.YouTubeApi.flashReady(e)
}
!function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length"in e && e.length
          , n = fe.type(e);
        return "function" !== n && !fe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function i(e, t, n) {
        if (fe.isFunction(t))
            return fe.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
        if (t.nodeType)
            return fe.grep(e, function(e) {
                return e === t !== n
            });
        if ("string" == typeof t) {
            if (Se.test(t))
                return fe.filter(t, e, n);
            t = fe.filter(t, e)
        }
        return fe.grep(e, function(e) {
            return fe.inArray(e, t) > -1 !== n
        })
    }
    function o(e, t) {
        do
            e = e[t];
        while (e && 1 !== e.nodeType);return e
    }
    function r(e) {
        var t = {};
        return fe.each(e.match(Ae) || [], function(e, n) {
            t[n] = !0
        }),
        t
    }
    function a() {
        ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", s),
        e.removeEventListener("load", s)) : (ie.detachEvent("onreadystatechange", s),
        e.detachEvent("onload", s))
    }
    function s() {
        (ie.addEventListener || "load" === e.event.type || "complete" === ie.readyState) && (a(),
        fe.ready())
    }
    function u(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(Le, "-$1").toLowerCase();
            if (n = e.getAttribute(i),
            "string" == typeof n) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Ne.test(n) ? fe.parseJSON(n) : n)
                } catch (e) {}
                fe.data(e, t, n)
            } else
                n = void 0
        }
        return n
    }
    function l(e) {
        var t;
        for (t in e)
            if (("data" !== t || !fe.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }
    function c(e, t, n, i) {
        if (Me(e)) {
            var o, r, a = fe.expando, s = e.nodeType, u = s ? fe.cache : e, l = s ? e[a] : e[a] && a;
            if (l && u[l] && (i || u[l].data) || void 0 !== n || "string" != typeof t)
                return l || (l = s ? e[a] = ne.pop() || fe.guid++ : a),
                u[l] || (u[l] = s ? {} : {
                    toJSON: fe.noop
                }),
                "object" != typeof t && "function" != typeof t || (i ? u[l] = fe.extend(u[l], t) : u[l].data = fe.extend(u[l].data, t)),
                r = u[l],
                i || (r.data || (r.data = {}),
                r = r.data),
                void 0 !== n && (r[fe.camelCase(t)] = n),
                "string" == typeof t ? (o = r[t],
                null == o && (o = r[fe.camelCase(t)])) : o = r,
                o
        }
    }
    function d(e, t, n) {
        if (Me(e)) {
            var i, o, r = e.nodeType, a = r ? fe.cache : e, s = r ? e[fe.expando] : fe.expando;
            if (a[s]) {
                if (t && (i = n ? a[s] : a[s].data)) {
                    fe.isArray(t) ? t = t.concat(fe.map(t, fe.camelCase)) : t in i ? t = [t] : (t = fe.camelCase(t),
                    t = t in i ? [t] : t.split(" ")),
                    o = t.length;
                    for (; o--; )
                        delete i[t[o]];
                    if (n ? !l(i) : !fe.isEmptyObject(i))
                        return
                }
                (n || (delete a[s].data,
                l(a[s]))) && (r ? fe.cleanData([e], !0) : de.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
            }
        }
    }
    function h(e, t, n, i) {
        var o, r = 1, a = 20, s = i ? function() {
            return i.cur()
        }
        : function() {
            return fe.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (fe.cssNumber[t] ? "" : "px"), c = (fe.cssNumber[t] || "px" !== l && +u) && ze.exec(fe.css(e, t));
        if (c && c[3] !== l) {
            l = l || c[3],
            n = n || [],
            c = +u || 1;
            do
                r = r || ".5",
                c /= r,
                fe.style(e, t, c + l);
            while (r !== (r = s() / u) && 1 !== r && --a)
        }
        return n && (c = +c || +u || 0,
        o = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        i && (i.unit = l,
        i.start = c,
        i.end = o)),
        o
    }
    function f(e) {
        var t = qe.split("|")
          , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length; )
                n.createElement(t.pop());
        return n
    }
    function p(e, t) {
        var n, i, o = 0, r = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
        if (!r)
            for (r = [],
            n = e.childNodes || e; null != (i = n[o]); o++)
                !t || fe.nodeName(i, t) ? r.push(i) : fe.merge(r, p(i, t));
        return void 0 === t || t && fe.nodeName(e, t) ? fe.merge([e], r) : r
    }
    function m(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++)
            fe._data(n, "globalEval", !t || fe._data(t[i], "globalEval"))
    }
    function g(e) {
        Re.test(e.type) && (e.defaultChecked = e.checked)
    }
    function v(e, t, n, i, o) {
        for (var r, a, s, u, l, c, d, h = e.length, v = f(t), y = [], b = 0; b < h; b++)
            if (a = e[b],
            a || 0 === a)
                if ("object" === fe.type(a))
                    fe.merge(y, a.nodeType ? [a] : a);
                else if (Ve.test(a)) {
                    for (u = u || v.appendChild(t.createElement("div")),
                    l = (He.exec(a) || ["", ""])[1].toLowerCase(),
                    d = Ue[l] || Ue._default,
                    u.innerHTML = d[1] + fe.htmlPrefilter(a) + d[2],
                    r = d[0]; r--; )
                        u = u.lastChild;
                    if (!de.leadingWhitespace && We.test(a) && y.push(t.createTextNode(We.exec(a)[0])),
                    !de.tbody)
                        for (a = "table" !== l || Qe.test(a) ? "<table>" !== d[1] || Qe.test(a) ? 0 : u : u.firstChild,
                        r = a && a.childNodes.length; r--; )
                            fe.nodeName(c = a.childNodes[r], "tbody") && !c.childNodes.length && a.removeChild(c);
                    for (fe.merge(y, u.childNodes),
                    u.textContent = ""; u.firstChild; )
                        u.removeChild(u.firstChild);
                    u = v.lastChild
                } else
                    y.push(t.createTextNode(a));
        for (u && v.removeChild(u),
        de.appendChecked || fe.grep(p(y, "input"), g),
        b = 0; a = y[b++]; )
            if (i && fe.inArray(a, i) > -1)
                o && o.push(a);
            else if (s = fe.contains(a.ownerDocument, a),
            u = p(v.appendChild(a), "script"),
            s && m(u),
            n)
                for (r = 0; a = u[r++]; )
                    Be.test(a.type || "") && n.push(a);
        return u = null ,
        v
    }
    function y() {
        return !0
    }
    function b() {
        return !1
    }
    function w() {
        try {
            return ie.activeElement
        } catch (e) {}
    }
    function k(e, t, n, i, o, r) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n,
            n = void 0);
            for (s in t)
                k(e, s, n, i, t[s], r);
            return e
        }
        if (null == i && null == o ? (o = n,
        i = n = void 0) : null == o && ("string" == typeof n ? (o = i,
        i = void 0) : (o = i,
        i = n,
        n = void 0)),
        o === !1)
            o = b;
        else if (!o)
            return e;
        return 1 === r && (a = o,
        o = function(e) {
            return fe().off(e),
            a.apply(this, arguments)
        }
        ,
        o.guid = a.guid || (a.guid = fe.guid++)),
        e.each(function() {
            fe.event.add(this, t, o, i, n)
        })
    }
    function x(e, t) {
        return fe.nodeName(e, "table") && fe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function S(e) {
        return e.type = (null !== fe.find.attr(e, "type")) + "/" + e.type,
        e
    }
    function T(e) {
        var t = ot.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function j(e, t) {
        if (1 === t.nodeType && fe.hasData(e)) {
            var n, i, o, r = fe._data(e), a = fe._data(t, r), s = r.events;
            if (s) {
                delete a.handle,
                a.events = {};
                for (n in s)
                    for (i = 0,
                    o = s[n].length; i < o; i++)
                        fe.event.add(t, n, s[n][i])
            }
            a.data && (a.data = fe.extend({}, a.data))
        }
    }
    function C(e, t) {
        var n, i, o;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(),
            !de.noCloneEvent && t[fe.expando]) {
                o = fe._data(t);
                for (i in o.events)
                    fe.removeEvent(t, i, o.handle);
                t.removeAttribute(fe.expando)
            }
            "script" === n && t.text !== e.text ? (S(t).text = e.text,
            T(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
            de.html5Clone && e.innerHTML && !fe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Re.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
    }
    function _(e, t, n, i) {
        t = re.apply([], t);
        var o, r, a, s, u, l, c = 0, d = e.length, h = d - 1, f = t[0], m = fe.isFunction(f);
        if (m || d > 1 && "string" == typeof f && !de.checkClone && it.test(f))
            return e.each(function(o) {
                var r = e.eq(o);
                m && (t[0] = f.call(this, o, r.html())),
                _(r, t, n, i)
            });
        if (d && (l = v(t, e[0].ownerDocument, !1, e, i),
        o = l.firstChild,
        1 === l.childNodes.length && (l = o),
        o || i)) {
            for (s = fe.map(p(l, "script"), S),
            a = s.length; c < d; c++)
                r = l,
                c !== h && (r = fe.clone(r, !0, !0),
                a && fe.merge(s, p(r, "script"))),
                n.call(e[c], r, c);
            if (a)
                for (u = s[s.length - 1].ownerDocument,
                fe.map(s, T),
                c = 0; c < a; c++)
                    r = s[c],
                    Be.test(r.type || "") && !fe._data(r, "globalEval") && fe.contains(u, r) && (r.src ? fe._evalUrl && fe._evalUrl(r.src) : fe.globalEval((r.text || r.textContent || r.innerHTML || "").replace(rt, "")));
            l = o = null
        }
        return e
    }
    function E(e, t, n) {
        for (var i, o = t ? fe.filter(t, e) : e, r = 0; null != (i = o[r]); r++)
            n || 1 !== i.nodeType || fe.cleanData(p(i)),
            i.parentNode && (n && fe.contains(i.ownerDocument, i) && m(p(i, "script")),
            i.parentNode.removeChild(i));
        return e
    }
    function A(e, t) {
        var n = fe(t.createElement(e)).appendTo(t.body)
          , i = fe.css(n[0], "display");
        return n.detach(),
        i
    }
    function $(e) {
        var t = ie
          , n = lt[e];
        return n || (n = A(e, t),
        "none" !== n && n || (ut = (ut || fe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
        t = (ut[0].contentWindow || ut[0].contentDocument).document,
        t.write(),
        t.close(),
        n = A(e, t),
        ut.detach()),
        lt[e] = n),
        n
    }
    function P(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    function M(e) {
        if (e in Tt)
            return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = St.length; n--; )
            if (e = St[n] + t,
            e in Tt)
                return e
    }
    function N(e, t) {
        for (var n, i, o, r = [], a = 0, s = e.length; a < s; a++)
            i = e[a],
            i.style && (r[a] = fe._data(i, "olddisplay"),
            n = i.style.display,
            t ? (r[a] || "none" !== n || (i.style.display = ""),
            "" === i.style.display && Oe(i) && (r[a] = fe._data(i, "olddisplay", $(i.nodeName)))) : (o = Oe(i),
            (n && "none" !== n || !o) && fe._data(i, "olddisplay", o ? n : fe.css(i, "display"))));
        for (a = 0; a < s; a++)
            i = e[a],
            i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[a] || "" : "none"));
        return e
    }
    function L(e, t, n) {
        var i = wt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }
    function F(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; r < 4; r += 2)
            "margin" === n && (a += fe.css(e, n + Ie[r], !0, o)),
            i ? ("content" === n && (a -= fe.css(e, "padding" + Ie[r], !0, o)),
            "margin" !== n && (a -= fe.css(e, "border" + Ie[r] + "Width", !0, o))) : (a += fe.css(e, "padding" + Ie[r], !0, o),
            "padding" !== n && (a += fe.css(e, "border" + Ie[r] + "Width", !0, o)));
        return a
    }
    function z(e, t, n) {
        var i = !0
          , o = "width" === t ? e.offsetWidth : e.offsetHeight
          , r = pt(e)
          , a = de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, r);
        if (o <= 0 || null == o) {
            if (o = mt(e, t, r),
            (o < 0 || null == o) && (o = e.style[t]),
            dt.test(o))
                return o;
            i = a && (de.boxSizingReliable() || o === e.style[t]),
            o = parseFloat(o) || 0
        }
        return o + F(e, t, n || (a ? "border" : "content"), i, r) + "px"
    }
    function I(e, t, n, i, o) {
        return new I.prototype.init(e,t,n,i,o)
    }
    function O() {
        return e.setTimeout(function() {
            jt = void 0
        }),
        jt = fe.now()
    }
    function D(e, t) {
        var n, i = {
            height: e
        }, o = 0;
        for (t = t ? 1 : 0; o < 4; o += 2 - t)
            n = Ie[o],
            i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function R(e, t, n) {
        for (var i, o = (W.tweeners[t] || []).concat(W.tweeners["*"]), r = 0, a = o.length; r < a; r++)
            if (i = o[r].call(n, t, e))
                return i
    }
    function H(e, t, n) {
        var i, o, r, a, s, u, l, c, d = this, h = {}, f = e.style, p = e.nodeType && Oe(e), m = fe._data(e, "fxshow");
        n.queue || (s = fe._queueHooks(e, "fx"),
        null == s.unqueued && (s.unqueued = 0,
        u = s.empty.fire,
        s.empty.fire = function() {
            s.unqueued || u()
        }
        ),
        s.unqueued++,
        d.always(function() {
            d.always(function() {
                s.unqueued--,
                fe.queue(e, "fx").length || s.empty.fire()
            })
        })),
        1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY],
        l = fe.css(e, "display"),
        c = "none" === l ? fe._data(e, "olddisplay") || $(e.nodeName) : l,
        "inline" === c && "none" === fe.css(e, "float") && (de.inlineBlockNeedsLayout && "inline" !== $(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")),
        n.overflow && (f.overflow = "hidden",
        de.shrinkWrapBlocks() || d.always(function() {
            f.overflow = n.overflow[0],
            f.overflowX = n.overflow[1],
            f.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (o = t[i],
            _t.exec(o)) {
                if (delete t[i],
                r = r || "toggle" === o,
                o === (p ? "hide" : "show")) {
                    if ("show" !== o || !m || void 0 === m[i])
                        continue;
                    p = !0
                }
                h[i] = m && m[i] || fe.style(e, i)
            } else
                l = void 0;
        if (fe.isEmptyObject(h))
            "inline" === ("none" === l ? $(e.nodeName) : l) && (f.display = l);
        else {
            m ? "hidden"in m && (p = m.hidden) : m = fe._data(e, "fxshow", {}),
            r && (m.hidden = !p),
            p ? fe(e).show() : d.done(function() {
                fe(e).hide()
            }),
            d.done(function() {
                var t;
                fe._removeData(e, "fxshow");
                for (t in h)
                    fe.style(e, t, h[t])
            });
            for (i in h)
                a = R(p ? m[i] : 0, i, d),
                i in m || (m[i] = a.start,
                p && (a.end = a.start,
                a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }
    function B(e, t) {
        var n, i, o, r, a;
        for (n in e)
            if (i = fe.camelCase(n),
            o = t[i],
            r = e[n],
            fe.isArray(r) && (o = r[1],
            r = e[n] = r[0]),
            n !== i && (e[i] = r,
            delete e[n]),
            a = fe.cssHooks[i],
            a && "expand"in a) {
                r = a.expand(r),
                delete e[i];
                for (n in r)
                    n in e || (e[n] = r[n],
                    t[n] = o)
            } else
                t[i] = o
    }
    function W(e, t, n) {
        var i, o, r = 0, a = W.prefilters.length, s = fe.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (o)
                return !1;
            for (var t = jt || O(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, r = 1 - i, a = 0, u = l.tweens.length; a < u; a++)
                l.tweens[a].run(r);
            return s.notifyWith(e, [l, r, n]),
            r < 1 && u ? n : (s.resolveWith(e, [l]),
            !1)
        }, l = s.promise({
            elem: e,
            props: fe.extend({}, t),
            opts: fe.extend(!0, {
                specialEasing: {},
                easing: fe.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: jt || O(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var i = fe.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(i),
                i
            },
            stop: function(t) {
                var n = 0
                  , i = t ? l.tweens.length : 0;
                if (o)
                    return this;
                for (o = !0; n < i; n++)
                    l.tweens[n].run(1);
                return t ? (s.notifyWith(e, [l, 1, 0]),
                s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]),
                this
            }
        }), c = l.props;
        for (B(c, l.opts.specialEasing); r < a; r++)
            if (i = W.prefilters[r].call(l, e, c, l.opts))
                return fe.isFunction(i.stop) && (fe._queueHooks(l.elem, l.opts.queue).stop = fe.proxy(i.stop, i)),
                i;
        return fe.map(c, R, l),
        fe.isFunction(l.opts.start) && l.opts.start.call(e, l),
        fe.fx.timer(fe.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function q(e) {
        return fe.attr(e, "class") || ""
    }
    function U(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var i, o = 0, r = t.toLowerCase().match(Ae) || [];
            if (fe.isFunction(n))
                for (; i = r[o++]; )
                    "+" === i.charAt(0) ? (i = i.slice(1) || "*",
                    (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }
    function V(e, t, n, i) {
        function o(s) {
            var u;
            return r[s] = !0,
            fe.each(e[s] || [], function(e, s) {
                var l = s(t, n, i);
                return "string" != typeof l || a || r[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l),
                o(l),
                !1)
            }),
            u
        }
        var r = {}
          , a = e === Kt;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }
    function Q(e, t) {
        var n, i, o = fe.ajaxSettings.flatOptions || {};
        for (i in t)
            void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
        return n && fe.extend(!0, e, n),
        e
    }
    function G(e, t, n) {
        for (var i, o, r, a, s = e.contents, u = e.dataTypes; "*" === u[0]; )
            u.shift(),
            void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
        if (o)
            for (a in s)
                if (s[a] && s[a].test(o)) {
                    u.unshift(a);
                    break
                }
        if (u[0]in n)
            r = u[0];
        else {
            for (a in n) {
                if (!u[0] || e.converters[a + " " + u[0]]) {
                    r = a;
                    break
                }
                i || (i = a)
            }
            r = r || i
        }
        if (r)
            return r !== u[0] && u.unshift(r),
            n[r]
    }
    function Y(e, t, n, i) {
        var o, r, a, s, u, l = {}, c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters)
                l[a.toLowerCase()] = e.converters[a];
        for (r = c.shift(); r; )
            if (e.responseFields[r] && (n[e.responseFields[r]] = t),
            !u && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            u = r,
            r = c.shift())
                if ("*" === r)
                    r = u;
                else if ("*" !== u && u !== r) {
                    if (a = l[u + " " + r] || l["* " + r],
                    !a)
                        for (o in l)
                            if (s = o.split(" "),
                            s[1] === r && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                a === !0 ? a = l[o] : l[o] !== !0 && (r = s[0],
                                c.unshift(s[1]));
                                break
                            }
                    if (a !== !0)
                        if (a && e["throws"])
                            t = a(t);
                        else
                            try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + r
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    function X(e) {
        return e.style && e.style.display || fe.css(e, "display")
    }
    function J(e) {
        if (!fe.contains(e.ownerDocument || ie, e))
            return !0;
        for (; e && 1 === e.nodeType; ) {
            if ("none" === X(e) || "hidden" === e.type)
                return !0;
            e = e.parentNode
        }
        return !1
    }
    function K(e, t, n, i) {
        var o;
        if (fe.isArray(t))
            fe.each(t, function(t, o) {
                n || on.test(e) ? i(e, o) : K(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i)
            });
        else if (n || "object" !== fe.type(t))
            i(e, t);
        else
            for (o in t)
                K(e + "[" + o + "]", t[o], n, i)
    }
    function Z() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    function ee() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function te(e) {
        return fe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    var ne = []
      , ie = e.document
      , oe = ne.slice
      , re = ne.concat
      , ae = ne.push
      , se = ne.indexOf
      , ue = {}
      , le = ue.toString
      , ce = ue.hasOwnProperty
      , de = {}
      , he = "1.12.4"
      , fe = function(e, t) {
        return new fe.fn.init(e,t)
    }
      , pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , me = /^-ms-/
      , ge = /-([\da-z])/gi
      , ve = function(e, t) {
        return t.toUpperCase()
    };
    fe.fn = fe.prototype = {
        jquery: he,
        constructor: fe,
        selector: "",
        length: 0,
        toArray: function() {
            return oe.call(this)
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : oe.call(this)
        },
        pushStack: function(e) {
            var t = fe.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e) {
            return fe.each(this, e)
        },
        map: function(e) {
            return this.pushStack(fe.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(oe.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ae,
        sort: ne.sort,
        splice: ne.splice
    },
    fe.extend = fe.fn.extend = function() {
        var e, t, n, i, o, r, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || fe.isFunction(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (o = arguments[s]))
                for (i in o)
                    e = a[i],
                    n = o[i],
                    a !== n && (l && n && (fe.isPlainObject(n) || (t = fe.isArray(n))) ? (t ? (t = !1,
                    r = e && fe.isArray(e) ? e : []) : r = e && fe.isPlainObject(e) ? e : {},
                    a[i] = fe.extend(l, r, n)) : void 0 !== n && (a[i] = n));
        return a
    }
    ,
    fe.extend({
        expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === fe.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === fe.type(e)
        }
        ,
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !fe.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== fe.type(e) || e.nodeType || fe.isWindow(e))
                return !1;
            try {
                if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (e) {
                return !1
            }
            if (!de.ownFirst)
                for (t in e)
                    return ce.call(e, t);
            for (t in e)
                ;
            return void 0 === t || ce.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ue[le.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && fe.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            }
            )(t)
        },
        camelCase: function(e) {
            return e.replace(me, "ms-").replace(ge, ve)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var i, o = 0;
            if (n(e))
                for (i = e.length; o < i && t.call(e[o], o, e[o]) !== !1; o++)
                    ;
            else
                for (o in e)
                    if (t.call(e[o], o, e[o]) === !1)
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(pe, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? fe.merge(i, "string" == typeof e ? [e] : e) : ae.call(i, e)),
            i
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (se)
                    return se.call(t, e, n);
                for (i = t.length,
                n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                    if (n in t && t[n] === e)
                        return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; )
                e[o++] = t[i++];
            if (n !== n)
                for (; void 0 !== t[i]; )
                    e[o++] = t[i++];
            return e.length = o,
            e
        },
        grep: function(e, t, n) {
            for (var i, o = [], r = 0, a = e.length, s = !n; r < a; r++)
                i = !t(e[r], r),
                i !== s && o.push(e[r]);
            return o
        },
        map: function(e, t, i) {
            var o, r, a = 0, s = [];
            if (n(e))
                for (o = e.length; a < o; a++)
                    r = t(e[a], a, i),
                    null != r && s.push(r);
            else
                for (a in e)
                    r = t(e[a], a, i),
                    null != r && s.push(r);
            return re.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, o;
            if ("string" == typeof t && (o = e[t],
            t = e,
            e = o),
            fe.isFunction(e))
                return n = oe.call(arguments, 2),
                i = function() {
                    return e.apply(t || this, n.concat(oe.call(arguments)))
                }
                ,
                i.guid = e.guid = e.guid || fe.guid++,
                i
        },
        now: function() {
            return +new Date
        },
        support: de
    }),
    "function" == typeof Symbol && (fe.fn[Symbol.iterator] = ne[Symbol.iterator]),
    fe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ue["[object " + t + "]"] = t.toLowerCase()
    });
    var ye = function(e) {
        function t(e, t, n, i) {
            var o, r, a, s, u, l, d, f, p = t && t.ownerDocument, m = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m)
                return n;
            if (!i && ((t ? t.ownerDocument || t : R) !== M && P(t),
            t = t || M,
            L)) {
                if (11 !== m && (l = ve.exec(e)))
                    if (o = l[1]) {
                        if (9 === m) {
                            if (!(a = t.getElementById(o)))
                                return n;
                            if (a.id === o)
                                return n.push(a),
                                n
                        } else if (p && (a = p.getElementById(o)) && O(t, a) && a.id === o)
                            return n.push(a),
                            n
                    } else {
                        if (l[2])
                            return K.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((o = l[3]) && k.getElementsByClassName && t.getElementsByClassName)
                            return K.apply(n, t.getElementsByClassName(o)),
                            n
                    }
                if (k.qsa && !U[e + " "] && (!F || !F.test(e))) {
                    if (1 !== m)
                        p = t,
                        f = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = D),
                        d = j(e),
                        r = d.length,
                        u = he.test(s) ? "#" + s : "[id='" + s + "']"; r--; )
                            d[r] = u + " " + h(d[r]);
                        f = d.join(","),
                        p = ye.test(e) && c(t.parentNode) || t
                    }
                    if (f)
                        try {
                            return K.apply(n, p.querySelectorAll(f)),
                            n
                        } catch (e) {} finally {
                            s === D && t.removeAttribute("id")
                        }
                }
            }
            return _(e.replace(se, "$1"), t, n, i)
        }
        function n() {
            function e(n, i) {
                return t.push(n + " ") > x.cacheLength && delete e[t.shift()],
                e[n + " "] = i
            }
            var t = [];
            return e
        }
        function i(e) {
            return e[D] = !0,
            e
        }
        function o(e) {
            var t = M.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function r(e, t) {
            for (var n = e.split("|"), i = n.length; i--; )
                x.attrHandle[n[i]] = t
        }
        function a(e, t) {
            var n = t && e
              , i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Q) - (~e.sourceIndex || Q);
            if (i)
                return i;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function l(e) {
            return i(function(t) {
                return t = +t,
                i(function(n, i) {
                    for (var o, r = e([], n.length, t), a = r.length; a--; )
                        n[o = r[a]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }
        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function d() {}
        function h(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++)
                i += e[t].value;
            return i
        }
        function f(e, t, n) {
            var i = t.dir
              , o = n && "parentNode" === i
              , r = B++;
            return t.first ? function(t, n, r) {
                for (; t = t[i]; )
                    if (1 === t.nodeType || o)
                        return e(t, n, r)
            }
            : function(t, n, a) {
                var s, u, l, c = [H, r];
                if (a) {
                    for (; t = t[i]; )
                        if ((1 === t.nodeType || o) && e(t, n, a))
                            return !0
                } else
                    for (; t = t[i]; )
                        if (1 === t.nodeType || o) {
                            if (l = t[D] || (t[D] = {}),
                            u = l[t.uniqueID] || (l[t.uniqueID] = {}),
                            (s = u[i]) && s[0] === H && s[1] === r)
                                return c[2] = s[2];
                            if (u[i] = c,
                            c[2] = e(t, n, a))
                                return !0
                        }
            }
        }
        function p(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var o = e.length; o--; )
                    if (!e[o](t, n, i))
                        return !1;
                return !0
            }
            : e[0]
        }
        function m(e, n, i) {
            for (var o = 0, r = n.length; o < r; o++)
                t(e, n[o], i);
            return i
        }
        function g(e, t, n, i, o) {
            for (var r, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (r = e[s]) && (n && !n(r, i, o) || (a.push(r),
                l && t.push(s)));
            return a
        }
        function v(e, t, n, o, r, a) {
            return o && !o[D] && (o = v(o)),
            r && !r[D] && (r = v(r, a)),
            i(function(i, a, s, u) {
                var l, c, d, h = [], f = [], p = a.length, v = i || m(t || "*", s.nodeType ? [s] : s, []), y = !e || !i && t ? v : g(v, h, e, s, u), b = n ? r || (i ? e : p || o) ? [] : a : y;
                if (n && n(y, b, s, u),
                o)
                    for (l = g(b, f),
                    o(l, [], s, u),
                    c = l.length; c--; )
                        (d = l[c]) && (b[f[c]] = !(y[f[c]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (l = [],
                            c = b.length; c--; )
                                (d = b[c]) && l.push(y[c] = d);
                            r(null , b = [], l, u)
                        }
                        for (c = b.length; c--; )
                            (d = b[c]) && (l = r ? ee(i, d) : h[c]) > -1 && (i[l] = !(a[l] = d))
                    }
                } else
                    b = g(b === a ? b.splice(p, b.length) : b),
                    r ? r(null , a, b, u) : K.apply(a, b)
            })
        }
        function y(e) {
            for (var t, n, i, o = e.length, r = x.relative[e[0].type], a = r || x.relative[" "], s = r ? 1 : 0, u = f(function(e) {
                return e === t
            }, a, !0), l = f(function(e) {
                return ee(t, e) > -1
            }, a, !0), c = [function(e, n, i) {
                var o = !r && (i || n !== E) || ((t = n).nodeType ? u(e, n, i) : l(e, n, i));
                return t = null ,
                o
            }
            ]; s < o; s++)
                if (n = x.relative[e[s].type])
                    c = [f(p(c), n)];
                else {
                    if (n = x.filter[e[s].type].apply(null , e[s].matches),
                    n[D]) {
                        for (i = ++s; i < o && !x.relative[e[i].type]; i++)
                            ;
                        return v(s > 1 && p(c), s > 1 && h(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < i && y(e.slice(s, i)), i < o && y(e = e.slice(i)), i < o && h(e))
                    }
                    c.push(n)
                }
            return p(c)
        }
        function b(e, n) {
            var o = n.length > 0
              , r = e.length > 0
              , a = function(i, a, s, u, l) {
                var c, d, h, f = 0, p = "0", m = i && [], v = [], y = E, b = i || r && x.find.TAG("*", l), w = H += null == y ? 1 : Math.random() || .1, k = b.length;
                for (l && (E = a === M || a || l); p !== k && null != (c = b[p]); p++) {
                    if (r && c) {
                        for (d = 0,
                        a || c.ownerDocument === M || (P(c),
                        s = !L); h = e[d++]; )
                            if (h(c, a || M, s)) {
                                u.push(c);
                                break
                            }
                        l && (H = w)
                    }
                    o && ((c = !h && c) && f--,
                    i && m.push(c))
                }
                if (f += p,
                o && p !== f) {
                    for (d = 0; h = n[d++]; )
                        h(m, v, a, s);
                    if (i) {
                        if (f > 0)
                            for (; p--; )
                                m[p] || v[p] || (v[p] = X.call(u));
                        v = g(v)
                    }
                    K.apply(u, v),
                    l && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(u)
                }
                return l && (H = w,
                E = y),
                m
            };
            return o ? i(a) : a
        }
        var w, k, x, S, T, j, C, _, E, A, $, P, M, N, L, F, z, I, O, D = "sizzle" + 1 * new Date, R = e.document, H = 0, B = 0, W = n(), q = n(), U = n(), V = function(e, t) {
            return e === t && ($ = !0),
            0
        }, Q = 1 << 31, G = {}.hasOwnProperty, Y = [], X = Y.pop, J = Y.push, K = Y.push, Z = Y.slice, ee = function(e, t) {
            for (var n = 0, i = e.length; n < i; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)", ae = new RegExp(ne + "+","g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$","g"), ue = new RegExp("^" + ne + "*," + ne + "*"), le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]","g"), de = new RegExp(re), he = new RegExp("^" + ie + "$"), fe = {
            ID: new RegExp("^#(" + ie + ")"),
            CLASS: new RegExp("^\\.(" + ie + ")"),
            TAG: new RegExp("^(" + ie + "|[*])"),
            ATTR: new RegExp("^" + oe),
            PSEUDO: new RegExp("^" + re),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)","i"),
            bool: new RegExp("^(?:" + te + ")$","i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)","i")
        }, pe = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = /'|\\/g, we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)","ig"), ke = function(e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        }, xe = function() {
            P()
        };
        try {
            K.apply(Y = Z.call(R.childNodes), R.childNodes),
            Y[R.childNodes.length].nodeType
        } catch (e) {
            K = {
                apply: Y.length ? function(e, t) {
                    J.apply(e, Z.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        k = t.support = {},
        T = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }
        ,
        P = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : R;
            return i !== M && 9 === i.nodeType && i.documentElement ? (M = i,
            N = M.documentElement,
            L = !T(M),
            (n = M.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)),
            k.attributes = o(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            k.getElementsByTagName = o(function(e) {
                return e.appendChild(M.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            k.getElementsByClassName = ge.test(M.getElementsByClassName),
            k.getById = o(function(e) {
                return N.appendChild(e).id = D,
                !M.getElementsByName || !M.getElementsByName(D).length
            }),
            k.getById ? (x.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && L) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ,
            x.filter.ID = function(e) {
                var t = e.replace(we, ke);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ) : (delete x.find.ID,
            x.filter.ID = function(e) {
                var t = e.replace(we, ke);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ),
            x.find.TAG = k.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : k.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, i = [], o = 0, r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[o++]; )
                        1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            }
            ,
            x.find.CLASS = k.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && L)
                    return t.getElementsByClassName(e)
            }
            ,
            z = [],
            F = [],
            (k.qsa = ge.test(M.querySelectorAll)) && (o(function(e) {
                N.appendChild(e).innerHTML = "<a id='" + D + "'></a><select id='" + D + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + ne + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || F.push("\\[" + ne + "*(?:value|" + te + ")"),
                e.querySelectorAll("[id~=" + D + "-]").length || F.push("~="),
                e.querySelectorAll(":checked").length || F.push(":checked"),
                e.querySelectorAll("a#" + D + "+*").length || F.push(".#.+[+~]")
            }),
            o(function(e) {
                var t = M.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && F.push("name" + ne + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                F.push(",.*:")
            })),
            (k.matchesSelector = ge.test(I = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && o(function(e) {
                k.disconnectedMatch = I.call(e, "div"),
                I.call(e, "[s!='']:x"),
                z.push("!=", re)
            }),
            F = F.length && new RegExp(F.join("|")),
            z = z.length && new RegExp(z.join("|")),
            t = ge.test(N.compareDocumentPosition),
            O = t || ge.test(N.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            V = t ? function(e, t) {
                if (e === t)
                    return $ = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                1 & n || !k.sortDetached && t.compareDocumentPosition(e) === n ? e === M || e.ownerDocument === R && O(R, e) ? -1 : t === M || t.ownerDocument === R && O(R, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return $ = !0,
                    0;
                var n, i = 0, o = e.parentNode, r = t.parentNode, s = [e], u = [t];
                if (!o || !r)
                    return e === M ? -1 : t === M ? 1 : o ? -1 : r ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                if (o === r)
                    return a(e, t);
                for (n = e; n = n.parentNode; )
                    s.unshift(n);
                for (n = t; n = n.parentNode; )
                    u.unshift(n);
                for (; s[i] === u[i]; )
                    i++;
                return i ? a(s[i], u[i]) : s[i] === R ? -1 : u[i] === R ? 1 : 0
            }
            ,
            M) : M
        }
        ,
        t.matches = function(e, n) {
            return t(e, null , null , n)
        }
        ,
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== M && P(e),
            n = n.replace(ce, "='$1']"),
            k.matchesSelector && L && !U[n + " "] && (!z || !z.test(n)) && (!F || !F.test(n)))
                try {
                    var i = I.call(e, n);
                    if (i || k.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return i
                } catch (e) {}
            return t(n, M, null , [e]).length > 0
        }
        ,
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== M && P(e),
            O(e, t)
        }
        ,
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== M && P(e);
            var n = x.attrHandle[t.toLowerCase()]
              , i = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
            return void 0 !== i ? i : k.attributes || !L ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }
        ,
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        t.uniqueSort = function(e) {
            var t, n = [], i = 0, o = 0;
            if ($ = !k.detectDuplicates,
            A = !k.sortStable && e.slice(0),
            e.sort(V),
            $) {
                for (; t = e[o++]; )
                    t === e[o] && (i = n.push(o));
                for (; i--; )
                    e.splice(n[i], 1)
            }
            return A = null ,
            e
        }
        ,
        S = t.getText = function(e) {
            var t, n = "", i = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += S(e)
                } else if (3 === o || 4 === o)
                    return e.nodeValue
            } else
                for (; t = e[i++]; )
                    n += S(t);
            return n
        }
        ,
        x = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(we, ke),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(we, ke),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = j(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, ke).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n : !n || (r += "",
                        "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(ae, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3)
                      , a = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === i && 0 === o ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, u) {
                        var l, c, d, h, f, p, m = r !== a ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !u && !s, b = !1;
                        if (g) {
                            if (r) {
                                for (; m; ) {
                                    for (h = t; h = h[m]; )
                                        if (s ? h.nodeName.toLowerCase() === v : 1 === h.nodeType)
                                            return !1;
                                    p = m = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [a ? g.firstChild : g.lastChild],
                            a && y) {
                                for (h = g,
                                d = h[D] || (h[D] = {}),
                                c = d[h.uniqueID] || (d[h.uniqueID] = {}),
                                l = c[e] || [],
                                f = l[0] === H && l[1],
                                b = f && l[2],
                                h = f && g.childNodes[f]; h = ++f && h && h[m] || (b = f = 0) || p.pop(); )
                                    if (1 === h.nodeType && ++b && h === t) {
                                        c[e] = [H, f, b];
                                        break
                                    }
                            } else if (y && (h = t,
                            d = h[D] || (h[D] = {}),
                            c = d[h.uniqueID] || (d[h.uniqueID] = {}),
                            l = c[e] || [],
                            f = l[0] === H && l[1],
                            b = f),
                            b === !1)
                                for (; (h = ++f && h && h[m] || (b = f = 0) || p.pop()) && ((s ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && (d = h[D] || (h[D] = {}),
                                c = d[h.uniqueID] || (d[h.uniqueID] = {}),
                                c[e] = [H, b]),
                                h !== t)); )
                                    ;
                            return b -= o,
                            b === i || b % i === 0 && b / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, r = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[D] ? r(n) : r.length > 1 ? (o = [e, e, "", n],
                    x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, o = r(e, n), a = o.length; a--; )
                            i = ee(e, o[a]),
                            e[i] = !(t[i] = o[a])
                    }) : function(e) {
                        return r(e, 0, o)
                    }
                    ) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = []
                      , n = []
                      , o = C(e.replace(se, "$1"));
                    return o[D] ? i(function(e, t, n, i) {
                        for (var r, a = o(e, null , i, []), s = e.length; s--; )
                            (r = a[s]) && (e[s] = !(t[s] = r))
                    }) : function(e, i, r) {
                        return t[0] = e,
                        o(t, null , r, n),
                        t[0] = null ,
                        !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(we, ke),
                    function(t) {
                        return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                    }
                }),
                lang: i(function(e) {
                    return he.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(we, ke).toLowerCase(),
                    function(t) {
                        var n;
                        do
                            if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return n = n.toLowerCase(),
                                n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === N
                },
                focus: function(e) {
                    return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !x.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return pe.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0; )
                        e.push(i);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t; )
                        e.push(i);
                    return e
                })
            }
        },
        x.pseudos.nth = x.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            x.pseudos[w] = s(w);
        for (w in {
            submit: !0,
            reset: !0
        })
            x.pseudos[w] = u(w);
        return d.prototype = x.filters = x.pseudos,
        x.setFilters = new d,
        j = t.tokenize = function(e, n) {
            var i, o, r, a, s, u, l, c = q[e + " "];
            if (c)
                return n ? 0 : c.slice(0);
            for (s = e,
            u = [],
            l = x.preFilter; s; ) {
                i && !(o = ue.exec(s)) || (o && (s = s.slice(o[0].length) || s),
                u.push(r = [])),
                i = !1,
                (o = le.exec(s)) && (i = o.shift(),
                r.push({
                    value: i,
                    type: o[0].replace(se, " ")
                }),
                s = s.slice(i.length));
                for (a in x.filter)
                    !(o = fe[a].exec(s)) || l[a] && !(o = l[a](o)) || (i = o.shift(),
                    r.push({
                        value: i,
                        type: a,
                        matches: o
                    }),
                    s = s.slice(i.length));
                if (!i)
                    break
            }
            return n ? s.length : s ? t.error(e) : q(e, u).slice(0)
        }
        ,
        C = t.compile = function(e, t) {
            var n, i = [], o = [], r = U[e + " "];
            if (!r) {
                for (t || (t = j(e)),
                n = t.length; n--; )
                    r = y(t[n]),
                    r[D] ? i.push(r) : o.push(r);
                r = U(e, b(o, i)),
                r.selector = e
            }
            return r
        }
        ,
        _ = t.select = function(e, t, n, i) {
            var o, r, a, s, u, l = "function" == typeof e && e, d = !i && j(e = l.selector || e);
            if (n = n || [],
            1 === d.length) {
                if (r = d[0] = d[0].slice(0),
                r.length > 2 && "ID" === (a = r[0]).type && k.getById && 9 === t.nodeType && L && x.relative[r[1].type]) {
                    if (t = (x.find.ID(a.matches[0].replace(we, ke), t) || [])[0],
                    !t)
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(r.shift().value.length)
                }
                for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (a = r[o],
                !x.relative[s = a.type]); )
                    if ((u = x.find[s]) && (i = u(a.matches[0].replace(we, ke), ye.test(r[0].type) && c(t.parentNode) || t))) {
                        if (r.splice(o, 1),
                        e = i.length && h(r),
                        !e)
                            return K.apply(n, i),
                            n;
                        break
                    }
            }
            return (l || C(e, d))(i, t, !L, n, !t || ye.test(e) && c(t.parentNode) || t),
            n
        }
        ,
        k.sortStable = D.split("").sort(V).join("") === D,
        k.detectDuplicates = !!$,
        P(),
        k.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(M.createElement("div"))
        }),
        o(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        k.attributes && o(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || r("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        o(function(e) {
            return null == e.getAttribute("disabled")
        }) || r(te, function(e, t, n) {
            var i;
            if (!n)
                return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }),
        t
    }(e);
    fe.find = ye,
    fe.expr = ye.selectors,
    fe.expr[":"] = fe.expr.pseudos,
    fe.uniqueSort = fe.unique = ye.uniqueSort,
    fe.text = ye.getText,
    fe.isXMLDoc = ye.isXML,
    fe.contains = ye.contains;
    var be = function(e, t, n) {
        for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (o && fe(e).is(n))
                    break;
                i.push(e)
            }
        return i
    }
      , we = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , ke = fe.expr.match.needsContext
      , xe = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
      , Se = /^.[^:#\[\.,]*$/;
    fe.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType ? fe.find.matchesSelector(i, e) ? [i] : [] : fe.find.matches(e, fe.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    fe.fn.extend({
        find: function(e) {
            var t, n = [], i = this, o = i.length;
            if ("string" != typeof e)
                return this.pushStack(fe(e).filter(function() {
                    for (t = 0; t < o; t++)
                        if (fe.contains(i[t], this))
                            return !0
                }));
            for (t = 0; t < o; t++)
                fe.find(e, i[t], n);
            return n = this.pushStack(o > 1 ? fe.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + e : e,
            n
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && ke.test(e) ? fe(e) : e || [], !1).length
        }
    });
    var Te, je = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Ce = fe.fn.init = function(e, t, n) {
        var i, o;
        if (!e)
            return this;
        if (n = n || Te,
        "string" == typeof e) {
            if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null , e, null ] : je.exec(e),
            !i || !i[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof fe ? t[0] : t,
                fe.merge(this, fe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)),
                xe.test(i[1]) && fe.isPlainObject(t))
                    for (i in t)
                        fe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            if (o = ie.getElementById(i[2]),
            o && o.parentNode) {
                if (o.id !== i[2])
                    return Te.find(e);
                this.length = 1,
                this[0] = o
            }
            return this.context = ie,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e,
        this.length = 1,
        this) : fe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(fe) : (void 0 !== e.selector && (this.selector = e.selector,
        this.context = e.context),
        fe.makeArray(e, this))
    }
    ;
    Ce.prototype = fe.fn,
    Te = fe(ie);
    var _e = /^(?:parents|prev(?:Until|All))/
      , Ee = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    fe.fn.extend({
        has: function(e) {
            var t, n = fe(e, this), i = n.length;
            return this.filter(function() {
                for (t = 0; t < i; t++)
                    if (fe.contains(this, n[t]))
                        return !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, o = this.length, r = [], a = ke.test(e) || "string" != typeof e ? fe(e, t || this.context) : 0; i < o; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && fe.find.matchesSelector(n, e))) {
                        r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? fe.uniqueSort(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? fe.inArray(this[0], fe(e)) : fe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(fe.uniqueSort(fe.merge(this.get(), fe(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    fe.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return be(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return be(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return be(e, "nextSibling")
        },
        prevAll: function(e) {
            return be(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return be(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return be(e, "previousSibling", n)
        },
        siblings: function(e) {
            return we((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return we(e.firstChild)
        },
        contents: function(e) {
            return fe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : fe.merge([], e.childNodes)
        }
    }, function(e, t) {
        fe.fn[e] = function(n, i) {
            var o = fe.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n),
            i && "string" == typeof i && (o = fe.filter(i, o)),
            this.length > 1 && (Ee[e] || (o = fe.uniqueSort(o)),
            _e.test(e) && (o = o.reverse())),
            this.pushStack(o)
        }
    });
    var Ae = /\S+/g;
    fe.Callbacks = function(e) {
        e = "string" == typeof e ? r(e) : fe.extend({}, e);
        var t, n, i, o, a = [], s = [], u = -1, l = function() {
            for (o = e.once,
            i = t = !0; s.length; u = -1)
                for (n = s.shift(); ++u < a.length; )
                    a[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = a.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            o && (a = n ? [] : "")
        }, c = {
            add: function() {
                return a && (n && !t && (u = a.length - 1,
                s.push(n)),
                function t(n) {
                    fe.each(n, function(n, i) {
                        fe.isFunction(i) ? e.unique && c.has(i) || a.push(i) : i && i.length && "string" !== fe.type(i) && t(i)
                    })
                }(arguments),
                n && !t && l()),
                this
            },
            remove: function() {
                return fe.each(arguments, function(e, t) {
                    for (var n; (n = fe.inArray(t, a, n)) > -1; )
                        a.splice(n, 1),
                        n <= u && u--
                }),
                this
            },
            has: function(e) {
                return e ? fe.inArray(e, a) > -1 : a.length > 0
            },
            empty: function() {
                return a && (a = []),
                this
            },
            disable: function() {
                return o = s = [],
                a = n = "",
                this
            },
            disabled: function() {
                return !a
            },
            lock: function() {
                return o = !0,
                n || c.disable(),
                this
            },
            locked: function() {
                return !!o
            },
            fireWith: function(e, n) {
                return o || (n = n || [],
                n = [e, n.slice ? n.slice() : n],
                s.push(n),
                t || l()),
                this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!i
            }
        };
        return c
    }
    ,
    fe.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", fe.Callbacks("once memory"), "resolved"], ["reject", "fail", fe.Callbacks("once memory"), "rejected"], ["notify", "progress", fe.Callbacks("memory")]]
              , n = "pending"
              , i = {
                state: function() {
                    return n
                },
                always: function() {
                    return o.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return fe.Deferred(function(n) {
                        fe.each(t, function(t, r) {
                            var a = fe.isFunction(e[t]) && e[t];
                            o[r[1]](function() {
                                var e = a && a.apply(this, arguments);
                                e && fe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? fe.extend(e, i) : i
                }
            }
              , o = {};
            return i.pipe = i.then,
            fe.each(t, function(e, r) {
                var a = r[2]
                  , s = r[3];
                i[r[1]] = a.add,
                s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock),
                o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i : this, arguments),
                    this
                }
                ,
                o[r[0] + "With"] = a.fireWith
            }),
            i.promise(o),
            e && e.call(o, o),
            o
        },
        when: function(e) {
            var t, n, i, o = 0, r = oe.call(arguments), a = r.length, s = 1 !== a || e && fe.isFunction(e.promise) ? a : 0, u = 1 === s ? e : fe.Deferred(), l = function(e, n, i) {
                return function(o) {
                    n[e] = this,
                    i[e] = arguments.length > 1 ? oe.call(arguments) : o,
                    i === t ? u.notifyWith(n, i) : --s || u.resolveWith(n, i)
                }
            };
            if (a > 1)
                for (t = new Array(a),
                n = new Array(a),
                i = new Array(a); o < a; o++)
                    r[o] && fe.isFunction(r[o].promise) ? r[o].promise().progress(l(o, n, t)).done(l(o, i, r)).fail(u.reject) : --s;
            return s || u.resolveWith(i, r),
            u.promise()
        }
    });
    var $e;
    fe.fn.ready = function(e) {
        return fe.ready.promise().done(e),
        this
    }
    ,
    fe.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? fe.readyWait++ : fe.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --fe.readyWait : fe.isReady) || (fe.isReady = !0,
            e !== !0 && --fe.readyWait > 0 || ($e.resolveWith(ie, [fe]),
            fe.fn.triggerHandler && (fe(ie).triggerHandler("ready"),
            fe(ie).off("ready"))))
        }
    }),
    fe.ready.promise = function(t) {
        if (!$e)
            if ($e = fe.Deferred(),
            "complete" === ie.readyState || "loading" !== ie.readyState && !ie.documentElement.doScroll)
                e.setTimeout(fe.ready);
            else if (ie.addEventListener)
                ie.addEventListener("DOMContentLoaded", s),
                e.addEventListener("load", s);
            else {
                ie.attachEvent("onreadystatechange", s),
                e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && ie.documentElement
                } catch (e) {}
                n && n.doScroll && !function t() {
                    if (!fe.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (n) {
                            return e.setTimeout(t, 50)
                        }
                        a(),
                        fe.ready()
                    }
                }()
            }
        return $e.promise(t)
    }
    ,
    fe.ready.promise();
    var Pe;
    for (Pe in fe(de))
        break;
    de.ownFirst = "0" === Pe,
    de.inlineBlockNeedsLayout = !1,
    fe(function() {
        var e, t, n, i;
        n = ie.getElementsByTagName("body")[0],
        n && n.style && (t = ie.createElement("div"),
        i = ie.createElement("div"),
        i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        n.appendChild(i).appendChild(t),
        "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
        e && (n.style.zoom = 1)),
        n.removeChild(i))
    }),
    function() {
        var e = ie.createElement("div");
        de.deleteExpando = !0;
        try {
            delete e.test
        } catch (e) {
            de.deleteExpando = !1
        }
        e = null
    }();
    var Me = function(e) {
        var t = fe.noData[(e.nodeName + " ").toLowerCase()]
          , n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
    }
      , Ne = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , Le = /([A-Z])/g;
    fe.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? fe.cache[e[fe.expando]] : e[fe.expando],
            !!e && !l(e)
        },
        data: function(e, t, n) {
            return c(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }),
    fe.fn.extend({
        data: function(e, t) {
            var n, i, o, r = this[0], a = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (o = fe.data(r),
                1 === r.nodeType && !fe._data(r, "parsedAttrs"))) {
                    for (n = a.length; n--; )
                        a[n] && (i = a[n].name,
                        0 === i.indexOf("data-") && (i = fe.camelCase(i.slice(5)),
                        u(r, i, o[i])));
                    fe._data(r, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                fe.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                fe.data(this, e, t)
            }) : r ? u(r, e, fe.data(r, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                fe.removeData(this, e)
            })
        }
    }),
    fe.extend({
        queue: function(e, t, n) {
            var i;
            if (e)
                return t = (t || "fx") + "queue",
                i = fe._data(e, t),
                n && (!i || fe.isArray(n) ? i = fe._data(e, t, fe.makeArray(n)) : i.push(n)),
                i || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = fe.queue(e, t)
              , i = n.length
              , o = n.shift()
              , r = fe._queueHooks(e, t)
              , a = function() {
                fe.dequeue(e, t)
            };
            "inprogress" === o && (o = n.shift(),
            i--),
            o && ("fx" === t && n.unshift("inprogress"),
            delete r.stop,
            o.call(e, a, r)),
            !i && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return fe._data(e, n) || fe._data(e, n, {
                empty: fe.Callbacks("once memory").add(function() {
                    fe._removeData(e, t + "queue"),
                    fe._removeData(e, n)
                })
            })
        }
    }),
    fe.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? fe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = fe.queue(this, e, t);
                fe._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && fe.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                fe.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1, o = fe.Deferred(), r = this, a = this.length, s = function() {
                --i || o.resolveWith(r, [r])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; a--; )
                n = fe._data(r[a], e + "queueHooks"),
                n && n.empty && (i++,
                n.empty.add(s));
            return s(),
            o.promise(t)
        }
    }),
    function() {
        var e;
        de.shrinkWrapBlocks = function() {
            if (null != e)
                return e;
            e = !1;
            var t, n, i;
            return n = ie.getElementsByTagName("body")[0],
            n && n.style ? (t = ie.createElement("div"),
            i = ie.createElement("div"),
            i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(i).appendChild(t),
            "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            t.appendChild(ie.createElement("div")).style.width = "5px",
            e = 3 !== t.offsetWidth),
            n.removeChild(i),
            e) : void 0
        }
    }();
    var Fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , ze = new RegExp("^(?:([+-])=|)(" + Fe + ")([a-z%]*)$","i")
      , Ie = ["Top", "Right", "Bottom", "Left"]
      , Oe = function(e, t) {
        return e = t || e,
        "none" === fe.css(e, "display") || !fe.contains(e.ownerDocument, e)
    }
      , De = function(e, t, n, i, o, r, a) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === fe.type(n)) {
            o = !0;
            for (s in n)
                De(e, t, s, n[s], !0, r, a)
        } else if (void 0 !== i && (o = !0,
        fe.isFunction(i) || (a = !0),
        l && (a ? (t.call(e, i),
        t = null ) : (l = t,
        t = function(e, t, n) {
            return l.call(fe(e), n)
        }
        )),
        t))
            for (; s < u; s++)
                t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
        return o ? e : l ? t.call(e) : u ? t(e[0], n) : r
    }
      , Re = /^(?:checkbox|radio)$/i
      , He = /<([\w:-]+)/
      , Be = /^$|\/(?:java|ecma)script/i
      , We = /^\s+/
      , qe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function() {
        var e = ie.createElement("div")
          , t = ie.createDocumentFragment()
          , n = ie.createElement("input");
        e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        de.leadingWhitespace = 3 === e.firstChild.nodeType,
        de.tbody = !e.getElementsByTagName("tbody").length,
        de.htmlSerialize = !!e.getElementsByTagName("link").length,
        de.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML,
        n.type = "checkbox",
        n.checked = !0,
        t.appendChild(n),
        de.appendChecked = n.checked,
        e.innerHTML = "<textarea>x</textarea>",
        de.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue,
        t.appendChild(e),
        n = ie.createElement("input"),
        n.setAttribute("type", "radio"),
        n.setAttribute("checked", "checked"),
        n.setAttribute("name", "t"),
        e.appendChild(n),
        de.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
        de.noCloneEvent = !!e.addEventListener,
        e[fe.expando] = 1,
        de.attributes = !e.getAttribute(fe.expando)
    }();
    var Ue = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Ue.optgroup = Ue.option,
    Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead,
    Ue.th = Ue.td;
    var Ve = /<|&#?\w+;/
      , Qe = /<tbody/i;
    !function() {
        var t, n, i = ie.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            n = "on" + t,
            (de[t] = n in e) || (i.setAttribute(n, "t"),
            de[t] = i.attributes[n].expando === !1);
        i = null
    }();
    var Ge = /^(?:input|select|textarea)$/i
      , Ye = /^key/
      , Xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Je = /^(?:focusinfocus|focusoutblur)$/
      , Ke = /^([^.]*)(?:\.(.+)|)/;
    fe.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, a, s, u, l, c, d, h, f, p, m, g = fe._data(e);
            if (g) {
                for (n.handler && (u = n,
                n = u.handler,
                o = u.selector),
                n.guid || (n.guid = fe.guid++),
                (a = g.events) || (a = g.events = {}),
                (c = g.handle) || (c = g.handle = function(e) {
                    return "undefined" == typeof fe || e && fe.event.triggered === e.type ? void 0 : fe.event.dispatch.apply(c.elem, arguments)
                }
                ,
                c.elem = e),
                t = (t || "").match(Ae) || [""],
                s = t.length; s--; )
                    r = Ke.exec(t[s]) || [],
                    f = m = r[1],
                    p = (r[2] || "").split(".").sort(),
                    f && (l = fe.event.special[f] || {},
                    f = (o ? l.delegateType : l.bindType) || f,
                    l = fe.event.special[f] || {},
                    d = fe.extend({
                        type: f,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && fe.expr.match.needsContext.test(o),
                        namespace: p.join(".")
                    }, u),
                    (h = a[f]) || (h = a[f] = [],
                    h.delegateCount = 0,
                    l.setup && l.setup.call(e, i, p, c) !== !1 || (e.addEventListener ? e.addEventListener(f, c, !1) : e.attachEvent && e.attachEvent("on" + f, c))),
                    l.add && (l.add.call(e, d),
                    d.handler.guid || (d.handler.guid = n.guid)),
                    o ? h.splice(h.delegateCount++, 0, d) : h.push(d),
                    fe.event.global[f] = !0);
                e = null
            }
        },
        remove: function(e, t, n, i, o) {
            var r, a, s, u, l, c, d, h, f, p, m, g = fe.hasData(e) && fe._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(Ae) || [""],
                l = t.length; l--; )
                    if (s = Ke.exec(t[l]) || [],
                    f = m = s[1],
                    p = (s[2] || "").split(".").sort(),
                    f) {
                        for (d = fe.event.special[f] || {},
                        f = (i ? d.delegateType : d.bindType) || f,
                        h = c[f] || [],
                        s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        u = r = h.length; r--; )
                            a = h[r],
                            !o && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (h.splice(r, 1),
                            a.selector && h.delegateCount--,
                            d.remove && d.remove.call(e, a));
                        u && !h.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || fe.removeEvent(e, f, g.handle),
                        delete c[f])
                    } else
                        for (f in c)
                            fe.event.remove(e, f + t[l], n, i, !0);
                fe.isEmptyObject(c) && (delete g.handle,
                fe._removeData(e, "events"))
            }
        },
        trigger: function(t, n, i, o) {
            var r, a, s, u, l, c, d, h = [i || ie], f = ce.call(t, "type") ? t.type : t, p = ce.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = i = i || ie,
            3 !== i.nodeType && 8 !== i.nodeType && !Je.test(f + fe.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."),
            f = p.shift(),
            p.sort()),
            a = f.indexOf(":") < 0 && "on" + f,
            t = t[fe.expando] ? t : new fe.Event(f,"object" == typeof t && t),
            t.isTrigger = o ? 2 : 3,
            t.namespace = p.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
            t.result = void 0,
            t.target || (t.target = i),
            n = null == n ? [t] : fe.makeArray(n, [t]),
            l = fe.event.special[f] || {},
            o || !l.trigger || l.trigger.apply(i, n) !== !1)) {
                if (!o && !l.noBubble && !fe.isWindow(i)) {
                    for (u = l.delegateType || f,
                    Je.test(u + f) || (s = s.parentNode); s; s = s.parentNode)
                        h.push(s),
                        c = s;
                    c === (i.ownerDocument || ie) && h.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = h[d++]) && !t.isPropagationStopped(); )
                    t.type = d > 1 ? u : l.bindType || f,
                    r = (fe._data(s, "events") || {})[t.type] && fe._data(s, "handle"),
                    r && r.apply(s, n),
                    r = a && s[a],
                    r && r.apply && Me(s) && (t.result = r.apply(s, n),
                    t.result === !1 && t.preventDefault());
                if (t.type = f,
                !o && !t.isDefaultPrevented() && (!l._default || l._default.apply(h.pop(), n) === !1) && Me(i) && a && i[f] && !fe.isWindow(i)) {
                    c = i[a],
                    c && (i[a] = null ),
                    fe.event.triggered = f;
                    try {
                        i[f]()
                    } catch (e) {}
                    fe.event.triggered = void 0,
                    c && (i[a] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = fe.event.fix(e);
            var t, n, i, o, r, a = [], s = oe.call(arguments), u = (fe._data(this, "events") || {})[e.type] || [], l = fe.event.special[e.type] || {};
            if (s[0] = e,
            e.delegateTarget = this,
            !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (a = fe.event.handlers.call(this, e, u),
                t = 0; (o = a[t++]) && !e.isPropagationStopped(); )
                    for (e.currentTarget = o.elem,
                    n = 0; (r = o.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                        e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r,
                        e.data = r.data,
                        i = ((fe.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, s),
                        void 0 !== i && (e.result = i) === !1 && (e.preventDefault(),
                        e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, a = [], s = t.delegateCount, u = e.target;
            if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; u != this; u = u.parentNode || this)
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                        for (i = [],
                        n = 0; n < s; n++)
                            r = t[n],
                            o = r.selector + " ",
                            void 0 === i[o] && (i[o] = r.needsContext ? fe(o, this).index(u) > -1 : fe.find(o, this, null , [u]).length),
                            i[o] && i.push(r);
                        i.length && a.push({
                            elem: u,
                            handlers: i
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }),
            a
        },
        fix: function(e) {
            if (e[fe.expando])
                return e;
            var t, n, i, o = e.type, r = e, a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = Xe.test(o) ? this.mouseHooks : Ye.test(o) ? this.keyHooks : {}),
            i = a.props ? this.props.concat(a.props) : this.props,
            e = new fe.Event(r),
            t = i.length; t--; )
                n = i[t],
                e[n] = r[n];
            return e.target || (e.target = r.srcElement || ie),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            a.filter ? a.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, o, r = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || ie,
                o = i.documentElement,
                n = i.body,
                e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0),
                e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)),
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a),
                e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== w() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === w() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (fe.nodeName(this, "input") && "checkbox" === this.type && this.click)
                        return this.click(),
                        !1
                },
                _default: function(e) {
                    return fe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n) {
            var i = fe.extend(new fe.Event, n, {
                type: e,
                isSimulated: !0
            });
            fe.event.trigger(i, null , t),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    fe.removeEvent = ie.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    : function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null ),
        e.detachEvent(i, n))
    }
    ,
    fe.Event = function(e, t) {
        return this instanceof fe.Event ? (e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? y : b) : this.type = e,
        t && fe.extend(this, t),
        this.timeStamp = e && e.timeStamp || fe.now(),
        void (this[fe.expando] = !0)) : new fe.Event(e,t)
    }
    ,
    fe.Event.prototype = {
        constructor: fe.Event,
        isDefaultPrevented: b,
        isPropagationStopped: b,
        isImmediatePropagationStopped: b,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = y,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = y,
            e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = y,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    fe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        fe.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this, o = e.relatedTarget, r = e.handleObj;
                return o && (o === i || fe.contains(i, o)) || (e.type = r.origType,
                n = r.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    de.submit || (fe.event.special.submit = {
        setup: function() {
            return !fe.nodeName(this, "form") && void fe.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target
                  , n = fe.nodeName(t, "input") || fe.nodeName(t, "button") ? fe.prop(t, "form") : void 0;
                n && !fe._data(n, "submit") && (fe.event.add(n, "submit._submit", function(e) {
                    e._submitBubble = !0
                }),
                fe._data(n, "submit", !0))
            })
        },
        postDispatch: function(e) {
            e._submitBubble && (delete e._submitBubble,
            this.parentNode && !e.isTrigger && fe.event.simulate("submit", this.parentNode, e))
        },
        teardown: function() {
            return !fe.nodeName(this, "form") && void fe.event.remove(this, "._submit")
        }
    }),
    de.change || (fe.event.special.change = {
        setup: function() {
            return Ge.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (fe.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
            }),
            fe.event.add(this, "click._change", function(e) {
                this._justChanged && !e.isTrigger && (this._justChanged = !1),
                fe.event.simulate("change", this, e)
            })),
            !1) : void fe.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Ge.test(t.nodeName) && !fe._data(t, "change") && (fe.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || fe.event.simulate("change", this.parentNode, e)
                }),
                fe._data(t, "change", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
                return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return fe.event.remove(this, "._change"),
            !Ge.test(this.nodeName)
        }
    }),
    de.focusin || fe.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            fe.event.simulate(t, e.target, fe.event.fix(e))
        };
        fe.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this
                  , o = fe._data(i, t);
                o || i.addEventListener(e, n, !0),
                fe._data(i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this
                  , o = fe._data(i, t) - 1;
                o ? fe._data(i, t, o) : (i.removeEventListener(e, n, !0),
                fe._removeData(i, t))
            }
        }
    }),
    fe.fn.extend({
        on: function(e, t, n, i) {
            return k(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return k(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj)
                return i = e.handleObj,
                fe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                this;
            if ("object" == typeof e) {
                for (o in e)
                    this.off(o, t, e[o]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t,
            t = void 0),
            n === !1 && (n = b),
            this.each(function() {
                fe.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                fe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return fe.event.trigger(e, t, n, !0)
        }
    });
    var Ze = / jQuery\d+="(?:null|\d+)"/g
      , et = new RegExp("<(?:" + qe + ")[\\s/>]","i")
      , tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
      , nt = /<script|<style|<link/i
      , it = /checked\s*(?:[^=]|=\s*.checked.)/i
      , ot = /^true\/(.*)/
      , rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , at = f(ie)
      , st = at.appendChild(ie.createElement("div"));
    fe.extend({
        htmlPrefilter: function(e) {
            return e.replace(tt, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, o, r, a, s, u = fe.contains(e.ownerDocument, e);
            if (de.html5Clone || fe.isXMLDoc(e) || !et.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (st.innerHTML = e.outerHTML,
            st.removeChild(r = st.firstChild)),
            !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || fe.isXMLDoc(e)))
                for (i = p(r),
                s = p(e),
                a = 0; null != (o = s[a]); ++a)
                    i[a] && C(o, i[a]);
            if (t)
                if (n)
                    for (s = s || p(e),
                    i = i || p(r),
                    a = 0; null != (o = s[a]); a++)
                        j(o, i[a]);
                else
                    j(e, r);
            return i = p(r, "script"),
            i.length > 0 && m(i, !u && p(e, "script")),
            i = s = o = null ,
            r
        },
        cleanData: function(e, t) {
            for (var n, i, o, r, a = 0, s = fe.expando, u = fe.cache, l = de.attributes, c = fe.event.special; null != (n = e[a]); a++)
                if ((t || Me(n)) && (o = n[s],
                r = o && u[o])) {
                    if (r.events)
                        for (i in r.events)
                            c[i] ? fe.event.remove(n, i) : fe.removeEvent(n, i, r.handle);
                    u[o] && (delete u[o],
                    l || "undefined" == typeof n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s),
                    ne.push(o))
                }
        }
    }),
    fe.fn.extend({
        domManip: _,
        detach: function(e) {
            return E(this, e, !0)
        },
        remove: function(e) {
            return E(this, e)
        },
        text: function(e) {
            return De(this, function(e) {
                return void 0 === e ? fe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ie).createTextNode(e))
            }, null , e, arguments.length)
        },
        append: function() {
            return _(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = x(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return _(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = x(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return _(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return _(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && fe.cleanData(p(e, !1)); e.firstChild; )
                    e.removeChild(e.firstChild);
                e.options && fe.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return fe.clone(this, e, t)
            })
        },
        html: function(e) {
            return De(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , i = this.length;
                if (void 0 === e)
                    return 1 === t.nodeType ? t.innerHTML.replace(Ze, "") : void 0;
                if ("string" == typeof e && !nt.test(e) && (de.htmlSerialize || !et.test(e)) && (de.leadingWhitespace || !We.test(e)) && !Ue[(He.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = fe.htmlPrefilter(e);
                    try {
                        for (; n < i; n++)
                            t = this[n] || {},
                            1 === t.nodeType && (fe.cleanData(p(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null , e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return _(this, arguments, function(t) {
                var n = this.parentNode;
                fe.inArray(this, e) < 0 && (fe.cleanData(p(this)),
                n && n.replaceChild(t, this))
            }, e)
        }
    }),
    fe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        fe.fn[e] = function(e) {
            for (var n, i = 0, o = [], r = fe(e), a = r.length - 1; i <= a; i++)
                n = i === a ? this : this.clone(!0),
                fe(r[i])[t](n),
                ae.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var ut, lt = {
        HTML: "block",
        BODY: "block"
    }, ct = /^margin/, dt = new RegExp("^(" + Fe + ")(?!px)[a-z%]+$","i"), ht = function(e, t, n, i) {
        var o, r, a = {};
        for (r in t)
            a[r] = e.style[r],
            e.style[r] = t[r];
        o = n.apply(e, i || []);
        for (r in t)
            e.style[r] = a[r];
        return o
    }, ft = ie.documentElement;
    !function() {
        function t() {
            var t, c, d = ie.documentElement;
            d.appendChild(u),
            l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
            n = o = s = !1,
            i = a = !0,
            e.getComputedStyle && (c = e.getComputedStyle(l),
            n = "1%" !== (c || {}).top,
            s = "2px" === (c || {}).marginLeft,
            o = "4px" === (c || {
                width: "4px"
            }).width,
            l.style.marginRight = "50%",
            i = "4px" === (c || {
                marginRight: "4px"
            }).marginRight,
            t = l.appendChild(ie.createElement("div")),
            t.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            t.style.marginRight = t.style.width = "0",
            l.style.width = "1px",
            a = !parseFloat((e.getComputedStyle(t) || {}).marginRight),
            l.removeChild(t)),
            l.style.display = "none",
            r = 0 === l.getClientRects().length,
            r && (l.style.display = "",
            l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            l.childNodes[0].style.borderCollapse = "separate",
            t = l.getElementsByTagName("td"),
            t[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            r = 0 === t[0].offsetHeight,
            r && (t[0].style.display = "",
            t[1].style.display = "none",
            r = 0 === t[0].offsetHeight)),
            d.removeChild(u)
        }
        var n, i, o, r, a, s, u = ie.createElement("div"), l = ie.createElement("div");
        l.style && (l.style.cssText = "float:left;opacity:.5",
        de.opacity = "0.5" === l.style.opacity,
        de.cssFloat = !!l.style.cssFloat,
        l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        de.clearCloneStyle = "content-box" === l.style.backgroundClip,
        u = ie.createElement("div"),
        u.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
        l.innerHTML = "",
        u.appendChild(l),
        de.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing,
        fe.extend(de, {
            reliableHiddenOffsets: function() {
                return null == n && t(),
                r
            },
            boxSizingReliable: function() {
                return null == n && t(),
                o
            },
            pixelMarginRight: function() {
                return null == n && t(),
                i
            },
            pixelPosition: function() {
                return null == n && t(),
                n
            },
            reliableMarginRight: function() {
                return null == n && t(),
                a
            },
            reliableMarginLeft: function() {
                return null == n && t(),
                s
            }
        }))
    }();
    var pt, mt, gt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (pt = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    }
    ,
    mt = function(e, t, n) {
        var i, o, r, a, s = e.style;
        return n = n || pt(e),
        a = n ? n.getPropertyValue(t) || n[t] : void 0,
        "" !== a && void 0 !== a || fe.contains(e.ownerDocument, e) || (a = fe.style(e, t)),
        n && !de.pixelMarginRight() && dt.test(a) && ct.test(t) && (i = s.width,
        o = s.minWidth,
        r = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = i,
        s.minWidth = o,
        s.maxWidth = r),
        void 0 === a ? a : a + ""
    }
    ) : ft.currentStyle && (pt = function(e) {
        return e.currentStyle
    }
    ,
    mt = function(e, t, n) {
        var i, o, r, a, s = e.style;
        return n = n || pt(e),
        a = n ? n[t] : void 0,
        null == a && s && s[t] && (a = s[t]),
        dt.test(a) && !gt.test(t) && (i = s.left,
        o = e.runtimeStyle,
        r = o && o.left,
        r && (o.left = e.currentStyle.left),
        s.left = "fontSize" === t ? "1em" : a,
        a = s.pixelLeft + "px",
        s.left = i,
        r && (o.left = r)),
        void 0 === a ? a : a + "" || "auto"
    }
    );
    var vt = /alpha\([^)]*\)/i
      , yt = /opacity\s*=\s*([^)]*)/i
      , bt = /^(none|table(?!-c[ea]).+)/
      , wt = new RegExp("^(" + Fe + ")(.*)$","i")
      , kt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , xt = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , St = ["Webkit", "O", "Moz", "ms"]
      , Tt = ie.createElement("div").style;
    fe.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = mt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": de.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, a, s = fe.camelCase(t), u = e.style;
                if (t = fe.cssProps[s] || (fe.cssProps[s] = M(s) || s),
                a = fe.cssHooks[t] || fe.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (o = a.get(e, !1, i)) ? o : u[t];
                if (r = typeof n,
                "string" === r && (o = ze.exec(n)) && o[1] && (n = h(e, t, o),
                r = "number"),
                null != n && n === n && ("number" === r && (n += o && o[3] || (fe.cssNumber[s] ? "" : "px")),
                de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"),
                !(a && "set"in a && void 0 === (n = a.set(e, n, i)))))
                    try {
                        u[t] = n
                    } catch (e) {}
            }
        },
        css: function(e, t, n, i) {
            var o, r, a, s = fe.camelCase(t);
            return t = fe.cssProps[s] || (fe.cssProps[s] = M(s) || s),
            a = fe.cssHooks[t] || fe.cssHooks[s],
            a && "get"in a && (r = a.get(e, !0, n)),
            void 0 === r && (r = mt(e, t, i)),
            "normal" === r && t in xt && (r = xt[t]),
            "" === n || n ? (o = parseFloat(r),
            n === !0 || isFinite(o) ? o || 0 : r) : r
        }
    }),
    fe.each(["height", "width"], function(e, t) {
        fe.cssHooks[t] = {
            get: function(e, n, i) {
                if (n)
                    return bt.test(fe.css(e, "display")) && 0 === e.offsetWidth ? ht(e, kt, function() {
                        return z(e, t, i)
                    }) : z(e, t, i)
            },
            set: function(e, n, i) {
                var o = i && pt(e);
                return L(e, n, i ? F(e, t, i, de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, o), o) : 0)
            }
        }
    }),
    de.opacity || (fe.cssHooks.opacity = {
        get: function(e, t) {
            return yt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style
              , i = e.currentStyle
              , o = fe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
              , r = i && i.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === fe.trim(r.replace(vt, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            "" === t || i && !i.filter) || (n.filter = vt.test(r) ? r.replace(vt, o) : r + " " + o)
        }
    }),
    fe.cssHooks.marginRight = P(de.reliableMarginRight, function(e, t) {
        if (t)
            return ht(e, {
                display: "inline-block"
            }, mt, [e, "marginRight"])
    }),
    fe.cssHooks.marginLeft = P(de.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(mt(e, "marginLeft")) || (fe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ht(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            }) : 0)) + "px"
    }),
    fe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        fe.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++)
                    o[e + Ie[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        },
        ct.test(e) || (fe.cssHooks[e + t].set = L)
    }),
    fe.fn.extend({
        css: function(e, t) {
            return De(this, function(e, t, n) {
                var i, o, r = {}, a = 0;
                if (fe.isArray(t)) {
                    for (i = pt(e),
                    o = t.length; a < o; a++)
                        r[t[a]] = fe.css(e, t[a], !1, i);
                    return r
                }
                return void 0 !== n ? fe.style(e, t, n) : fe.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return N(this, !0)
        },
        hide: function() {
            return N(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Oe(this) ? fe(this).show() : fe(this).hide()
            })
        }
    }),
    fe.Tween = I,
    I.prototype = {
        constructor: I,
        init: function(e, t, n, i, o, r) {
            this.elem = e,
            this.prop = n,
            this.easing = o || fe.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = i,
            this.unit = r || (fe.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = I.propHooks[this.prop];
            return this.options.duration ? this.pos = t = fe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : I.propHooks._default.set(this),
            this
        }
    },
    I.prototype.init.prototype = I.prototype,
    I.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = fe.css(e.elem, e.prop, ""),
                t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                fe.fx.step[e.prop] ? fe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[fe.cssProps[e.prop]] && !fe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : fe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    fe.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    fe.fx = I.prototype.init,
    fe.fx.step = {};
    var jt, Ct, _t = /^(?:toggle|show|hide)$/, Et = /queueHooks$/;
    fe.Animation = fe.extend(W, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return h(n.elem, e, ze.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            fe.isFunction(e) ? (t = e,
            e = ["*"]) : e = e.match(Ae);
            for (var n, i = 0, o = e.length; i < o; i++)
                n = e[i],
                W.tweeners[n] = W.tweeners[n] || [],
                W.tweeners[n].unshift(t)
        },
        prefilters: [H],
        prefilter: function(e, t) {
            t ? W.prefilters.unshift(e) : W.prefilters.push(e)
        }
    }),
    fe.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? fe.extend({}, e) : {
            complete: n || !n && t || fe.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !fe.isFunction(t) && t
        };
        return i.duration = fe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in fe.fx.speeds ? fe.fx.speeds[i.duration] : fe.fx.speeds._default,
        null != i.queue && i.queue !== !0 || (i.queue = "fx"),
        i.old = i.complete,
        i.complete = function() {
            fe.isFunction(i.old) && i.old.call(this),
            i.queue && fe.dequeue(this, i.queue)
        }
        ,
        i
    }
    ,
    fe.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(Oe).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i)
        },
        animate: function(e, t, n, i) {
            var o = fe.isEmptyObject(e)
              , r = fe.speed(t, n, i)
              , a = function() {
                var t = W(this, fe.extend({}, e), r);
                (o || fe._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            o || r.queue === !1 ? this.each(a) : this.queue(r.queue, a)
        },
        stop: function(e, t, n) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t,
            t = e,
            e = void 0),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , o = null != e && e + "queueHooks"
                  , r = fe.timers
                  , a = fe._data(this);
                if (o)
                    a[o] && a[o].stop && i(a[o]);
                else
                    for (o in a)
                        a[o] && a[o].stop && Et.test(o) && i(a[o]);
                for (o = r.length; o--; )
                    r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n),
                    t = !1,
                    r.splice(o, 1));
                !t && n || fe.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t, n = fe._data(this), i = n[e + "queue"], o = n[e + "queueHooks"], r = fe.timers, a = i ? i.length : 0;
                for (n.finish = !0,
                fe.queue(this, e, []),
                o && o.stop && o.stop.call(this, !0),
                t = r.length; t--; )
                    r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0),
                    r.splice(t, 1));
                for (t = 0; t < a; t++)
                    i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    fe.each(["toggle", "show", "hide"], function(e, t) {
        var n = fe.fn[t];
        fe.fn[t] = function(e, i, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(D(t, !0), e, i, o)
        }
    }),
    fe.each({
        slideDown: D("show"),
        slideUp: D("hide"),
        slideToggle: D("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        fe.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i)
        }
    }),
    fe.timers = [],
    fe.fx.tick = function() {
        var e, t = fe.timers, n = 0;
        for (jt = fe.now(); n < t.length; n++)
            e = t[n],
            e() || t[n] !== e || t.splice(n--, 1);
        t.length || fe.fx.stop(),
        jt = void 0
    }
    ,
    fe.fx.timer = function(e) {
        fe.timers.push(e),
        e() ? fe.fx.start() : fe.timers.pop()
    }
    ,
    fe.fx.interval = 13,
    fe.fx.start = function() {
        Ct || (Ct = e.setInterval(fe.fx.tick, fe.fx.interval))
    }
    ,
    fe.fx.stop = function() {
        e.clearInterval(Ct),
        Ct = null
    }
    ,
    fe.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    fe.fn.delay = function(t, n) {
        return t = fe.fx ? fe.fx.speeds[t] || t : t,
        n = n || "fx",
        this.queue(n, function(n, i) {
            var o = e.setTimeout(n, t);
            i.stop = function() {
                e.clearTimeout(o)
            }
        })
    }
    ,
    function() {
        var e, t = ie.createElement("input"), n = ie.createElement("div"), i = ie.createElement("select"), o = i.appendChild(ie.createElement("option"));
        n = ie.createElement("div"),
        n.setAttribute("className", "t"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        e = n.getElementsByTagName("a")[0],
        t.setAttribute("type", "checkbox"),
        n.appendChild(t),
        e = n.getElementsByTagName("a")[0],
        e.style.cssText = "top:1px",
        de.getSetAttribute = "t" !== n.className,
        de.style = /top/.test(e.getAttribute("style")),
        de.hrefNormalized = "/a" === e.getAttribute("href"),
        de.checkOn = !!t.value,
        de.optSelected = o.selected,
        de.enctype = !!ie.createElement("form").enctype,
        i.disabled = !0,
        de.optDisabled = !o.disabled,
        t = ie.createElement("input"),
        t.setAttribute("value", ""),
        de.input = "" === t.getAttribute("value"),
        t.value = "t",
        t.setAttribute("type", "radio"),
        de.radioValue = "t" === t.value
    }();
    var At = /\r/g
      , $t = /[\x20\t\r\n\f]+/g;
    fe.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0];
            {
                if (arguments.length)
                    return i = fe.isFunction(e),
                    this.each(function(n) {
                        var o;
                        1 === this.nodeType && (o = i ? e.call(this, n, fe(this).val()) : e,
                        null == o ? o = "" : "number" == typeof o ? o += "" : fe.isArray(o) && (o = fe.map(o, function(e) {
                            return null == e ? "" : e + ""
                        })),
                        t = fe.valHooks[this.type] || fe.valHooks[this.nodeName.toLowerCase()],
                        t && "set"in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                    });
                if (o)
                    return t = fe.valHooks[o.type] || fe.valHooks[o.nodeName.toLowerCase()],
                    t && "get"in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value,
                    "string" == typeof n ? n.replace(At, "") : null == n ? "" : n)
            }
        }
    }),
    fe.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = fe.find.attr(e, "value");
                    return null != t ? t : fe.trim(fe.text(e)).replace($t, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, a = r ? null : [], s = r ? o + 1 : i.length, u = o < 0 ? s : r ? o : 0; u < s; u++)
                        if (n = i[u],
                        (n.selected || u === o) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !fe.nodeName(n.parentNode, "optgroup"))) {
                            if (t = fe(n).val(),
                            r)
                                return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = fe.makeArray(t), a = o.length; a--; )
                        if (i = o[a],
                        fe.inArray(fe.valHooks.option.get(i), r) > -1)
                            try {
                                i.selected = n = !0
                            } catch (e) {
                                i.scrollHeight
                            }
                        else
                            i.selected = !1;
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    fe.each(["radio", "checkbox"], function() {
        fe.valHooks[this] = {
            set: function(e, t) {
                if (fe.isArray(t))
                    return e.checked = fe.inArray(fe(e).val(), t) > -1
            }
        },
        de.checkOn || (fe.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    });
    var Pt, Mt, Nt = fe.expr.attrHandle, Lt = /^(?:checked|selected)$/i, Ft = de.getSetAttribute, zt = de.input;
    fe.fn.extend({
        attr: function(e, t) {
            return De(this, fe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                fe.removeAttr(this, e)
            })
        }
    }),
    fe.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
                return "undefined" == typeof e.getAttribute ? fe.prop(e, t, n) : (1 === r && fe.isXMLDoc(e) || (t = t.toLowerCase(),
                o = fe.attrHooks[t] || (fe.expr.match.bool.test(t) ? Mt : Pt)),
                void 0 !== n ? null === n ? void fe.removeAttr(e, t) : o && "set"in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""),
                n) : o && "get"in o && null !== (i = o.get(e, t)) ? i : (i = fe.find.attr(e, t),
                null == i ? void 0 : i))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!de.radioValue && "radio" === t && fe.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, o = 0, r = t && t.match(Ae);
            if (r && 1 === e.nodeType)
                for (; n = r[o++]; )
                    i = fe.propFix[n] || n,
                    fe.expr.match.bool.test(n) ? zt && Ft || !Lt.test(n) ? e[i] = !1 : e[fe.camelCase("default-" + n)] = e[i] = !1 : fe.attr(e, n, ""),
                    e.removeAttribute(Ft ? n : i)
        }
    }),
    Mt = {
        set: function(e, t, n) {
            return t === !1 ? fe.removeAttr(e, n) : zt && Ft || !Lt.test(n) ? e.setAttribute(!Ft && fe.propFix[n] || n, n) : e[fe.camelCase("default-" + n)] = e[n] = !0,
            n
        }
    },
    fe.each(fe.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Nt[t] || fe.find.attr;
        zt && Ft || !Lt.test(t) ? Nt[t] = function(e, t, i) {
            var o, r;
            return i || (r = Nt[t],
            Nt[t] = o,
            o = null != n(e, t, i) ? t.toLowerCase() : null ,
            Nt[t] = r),
            o
        }
        : Nt[t] = function(e, t, n) {
            if (!n)
                return e[fe.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }),
    zt && Ft || (fe.attrHooks.value = {
        set: function(e, t, n) {
            return fe.nodeName(e, "input") ? void (e.defaultValue = t) : Pt && Pt.set(e, t, n)
        }
    }),
    Ft || (Pt = {
        set: function(e, t, n) {
            var i = e.getAttributeNode(n);
            if (i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)),
            i.value = t += "",
            "value" === n || t === e.getAttribute(n))
                return t
        }
    },
    Nt.id = Nt.name = Nt.coords = function(e, t, n) {
        var i;
        if (!n)
            return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }
    ,
    fe.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            if (n && n.specified)
                return n.value
        },
        set: Pt.set
    },
    fe.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Pt.set(e, "" !== t && t, n)
        }
    },
    fe.each(["width", "height"], function(e, t) {
        fe.attrHooks[t] = {
            set: function(e, n) {
                if ("" === n)
                    return e.setAttribute(t, "auto"),
                    n
            }
        }
    })),
    de.style || (fe.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var It = /^(?:input|select|textarea|button|object)$/i
      , Ot = /^(?:a|area)$/i;
    fe.fn.extend({
        prop: function(e, t) {
            return De(this, fe.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = fe.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = void 0,
                    delete this[e]
                } catch (e) {}
            })
        }
    }),
    fe.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
                return 1 === r && fe.isXMLDoc(e) || (t = fe.propFix[t] || t,
                o = fe.propHooks[t]),
                void 0 !== n ? o && "set"in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get"in o && null !== (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = fe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : It.test(e.nodeName) || Ot.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    de.hrefNormalized || fe.each(["href", "src"], function(e, t) {
        fe.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    de.optSelected || (fe.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    fe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        fe.propFix[this.toLowerCase()] = this
    }),
    de.enctype || (fe.propFix.enctype = "encoding");
    var Dt = /[\t\r\n\f]/g;
    fe.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, a, s, u = 0;
            if (fe.isFunction(e))
                return this.each(function(t) {
                    fe(this).addClass(e.call(this, t, q(this)))
                });
            if ("string" == typeof e && e)
                for (t = e.match(Ae) || []; n = this[u++]; )
                    if (o = q(n),
                    i = 1 === n.nodeType && (" " + o + " ").replace(Dt, " ")) {
                        for (a = 0; r = t[a++]; )
                            i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        s = fe.trim(i),
                        o !== s && fe.attr(n, "class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, a, s, u = 0;
            if (fe.isFunction(e))
                return this.each(function(t) {
                    fe(this).removeClass(e.call(this, t, q(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(Ae) || []; n = this[u++]; )
                    if (o = q(n),
                    i = 1 === n.nodeType && (" " + o + " ").replace(Dt, " ")) {
                        for (a = 0; r = t[a++]; )
                            for (; i.indexOf(" " + r + " ") > -1; )
                                i = i.replace(" " + r + " ", " ");
                        s = fe.trim(i),
                        o !== s && fe.attr(n, "class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : fe.isFunction(e) ? this.each(function(n) {
                fe(this).toggleClass(e.call(this, n, q(this), t), t)
            }) : this.each(function() {
                var t, i, o, r;
                if ("string" === n)
                    for (i = 0,
                    o = fe(this),
                    r = e.match(Ae) || []; t = r[i++]; )
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else
                    void 0 !== e && "boolean" !== n || (t = q(this),
                    t && fe._data(this, "__className__", t),
                    fe.attr(this, "class", t || e === !1 ? "" : fe._data(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++]; )
                if (1 === n.nodeType && (" " + q(n) + " ").replace(Dt, " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    }),
    fe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        fe.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null , e, n) : this.trigger(t)
        }
    }),
    fe.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var Rt = e.location
      , Ht = fe.now()
      , Bt = /\?/
      , Wt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    fe.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse)
            return e.JSON.parse(t + "");
        var n, i = null , o = fe.trim(t + "");
        return o && !fe.trim(o.replace(Wt, function(e, t, o, r) {
            return n && t && (i = 0),
            0 === i ? e : (n = o || t,
            i += !r - !o,
            "")
        })) ? Function("return " + o)() : fe.error("Invalid JSON: " + t)
    }
    ,
    fe.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t)
            return null ;
        try {
            e.DOMParser ? (i = new e.DOMParser,
            n = i.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"),
            n.async = "false",
            n.loadXML(t))
        } catch (e) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || fe.error("Invalid XML: " + t),
        n
    }
    ;
    var qt = /#.*$/
      , Ut = /([?&])_=[^&]*/
      , Vt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , Qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , Gt = /^(?:GET|HEAD)$/
      , Yt = /^\/\//
      , Xt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , Jt = {}
      , Kt = {}
      , Zt = "*/".concat("*")
      , en = Rt.href
      , tn = Xt.exec(en.toLowerCase()) || [];
    fe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: en,
            type: "GET",
            isLocal: Qt.test(tn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": fe.parseJSON,
                "text xml": fe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Q(Q(e, fe.ajaxSettings), t) : Q(fe.ajaxSettings, e)
        },
        ajaxPrefilter: U(Jt),
        ajaxTransport: U(Kt),
        ajax: function(t, n) {
            function i(t, n, i, o) {
                var r, d, y, b, k, S = n;
                2 !== w && (w = 2,
                u && e.clearTimeout(u),
                c = void 0,
                s = o || "",
                x.readyState = t > 0 ? 4 : 0,
                r = t >= 200 && t < 300 || 304 === t,
                i && (b = G(h, x, i)),
                b = Y(h, b, x, r),
                r ? (h.ifModified && (k = x.getResponseHeader("Last-Modified"),
                k && (fe.lastModified[a] = k),
                k = x.getResponseHeader("etag"),
                k && (fe.etag[a] = k)),
                204 === t || "HEAD" === h.type ? S = "nocontent" : 304 === t ? S = "notmodified" : (S = b.state,
                d = b.data,
                y = b.error,
                r = !y)) : (y = S,
                !t && S || (S = "error",
                t < 0 && (t = 0))),
                x.status = t,
                x.statusText = (n || S) + "",
                r ? m.resolveWith(f, [d, S, x]) : m.rejectWith(f, [x, S, y]),
                x.statusCode(v),
                v = void 0,
                l && p.trigger(r ? "ajaxSuccess" : "ajaxError", [x, h, r ? d : y]),
                g.fireWith(f, [x, S]),
                l && (p.trigger("ajaxComplete", [x, h]),
                --fe.active || fe.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t,
            t = void 0),
            n = n || {};
            var o, r, a, s, u, l, c, d, h = fe.ajaxSetup({}, n), f = h.context || h, p = h.context && (f.nodeType || f.jquery) ? fe(f) : fe.event, m = fe.Deferred(), g = fe.Callbacks("once memory"), v = h.statusCode || {}, y = {}, b = {}, w = 0, k = "canceled", x = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === w) {
                        if (!d)
                            for (d = {}; t = Vt.exec(s); )
                                d[t[1].toLowerCase()] = t[2];
                        t = d[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return 2 === w ? s : null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return w || (e = b[n] = b[n] || e,
                    y[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return w || (h.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (w < 2)
                            for (t in e)
                                v[t] = [v[t], e[t]];
                        else
                            x.always(e[x.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || k;
                    return c && c.abort(t),
                    i(0, t),
                    this
                }
            };
            if (m.promise(x).complete = g.add,
            x.success = x.done,
            x.error = x.fail,
            h.url = ((t || h.url || en) + "").replace(qt, "").replace(Yt, tn[1] + "//"),
            h.type = n.method || n.type || h.method || h.type,
            h.dataTypes = fe.trim(h.dataType || "*").toLowerCase().match(Ae) || [""],
            null == h.crossDomain && (o = Xt.exec(h.url.toLowerCase()),
            h.crossDomain = !(!o || o[1] === tn[1] && o[2] === tn[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))),
            h.data && h.processData && "string" != typeof h.data && (h.data = fe.param(h.data, h.traditional)),
            V(Jt, h, n, x),
            2 === w)
                return x;
            l = fe.event && h.global,
            l && 0 === fe.active++ && fe.event.trigger("ajaxStart"),
            h.type = h.type.toUpperCase(),
            h.hasContent = !Gt.test(h.type),
            a = h.url,
            h.hasContent || (h.data && (a = h.url += (Bt.test(a) ? "&" : "?") + h.data,
            delete h.data),
            h.cache === !1 && (h.url = Ut.test(a) ? a.replace(Ut, "$1_=" + Ht++) : a + (Bt.test(a) ? "&" : "?") + "_=" + Ht++)),
            h.ifModified && (fe.lastModified[a] && x.setRequestHeader("If-Modified-Since", fe.lastModified[a]),
            fe.etag[a] && x.setRequestHeader("If-None-Match", fe.etag[a])),
            (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", h.contentType),
            x.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Zt + "; q=0.01" : "") : h.accepts["*"]);
            for (r in h.headers)
                x.setRequestHeader(r, h.headers[r]);
            if (h.beforeSend && (h.beforeSend.call(f, x, h) === !1 || 2 === w))
                return x.abort();
            k = "abort";
            for (r in {
                success: 1,
                error: 1,
                complete: 1
            })
                x[r](h[r]);
            if (c = V(Kt, h, n, x)) {
                if (x.readyState = 1,
                l && p.trigger("ajaxSend", [x, h]),
                2 === w)
                    return x;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    x.abort("timeout")
                }, h.timeout));
                try {
                    w = 1,
                    c.send(y, i)
                } catch (e) {
                    if (!(w < 2))
                        throw e;
                    i(-1, e)
                }
            } else
                i(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return fe.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return fe.get(e, void 0, t, "script")
        }
    }),
    fe.each(["get", "post"], function(e, t) {
        fe[t] = function(e, n, i, o) {
            return fe.isFunction(n) && (o = o || i,
            i = n,
            n = void 0),
            fe.ajax(fe.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, fe.isPlainObject(e) && e))
        }
    }),
    fe._evalUrl = function(e) {
        return fe.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    fe.fn.extend({
        wrapAll: function(e) {
            if (fe.isFunction(e))
                return this.each(function(t) {
                    fe(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = fe(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return fe.isFunction(e) ? this.each(function(t) {
                fe(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = fe(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = fe.isFunction(e);
            return this.each(function(n) {
                fe(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                fe.nodeName(this, "body") || fe(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    fe.expr.filters.hidden = function(e) {
        return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : J(e)
    }
    ,
    fe.expr.filters.visible = function(e) {
        return !fe.expr.filters.hidden(e)
    }
    ;
    var nn = /%20/g
      , on = /\[\]$/
      , rn = /\r?\n/g
      , an = /^(?:submit|button|image|reset|file)$/i
      , sn = /^(?:input|select|textarea|keygen)/i;
    fe.param = function(e, t) {
        var n, i = [], o = function(e, t) {
            t = fe.isFunction(t) ? t() : null == t ? "" : t,
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = fe.ajaxSettings && fe.ajaxSettings.traditional),
        fe.isArray(e) || e.jquery && !fe.isPlainObject(e))
            fe.each(e, function() {
                o(this.name, this.value)
            });
        else
            for (n in e)
                K(n, e[n], t, o);
        return i.join("&").replace(nn, "+")
    }
    ,
    fe.fn.extend({
        serialize: function() {
            return fe.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = fe.prop(this, "elements");
                return e ? fe.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !fe(this).is(":disabled") && sn.test(this.nodeName) && !an.test(e) && (this.checked || !Re.test(e))
            }).map(function(e, t) {
                var n = fe(this).val();
                return null == n ? null : fe.isArray(n) ? fe.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(rn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(rn, "\r\n")
                }
            }).get()
        }
    }),
    fe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return this.isLocal ? ee() : ie.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || ee()
    }
    : Z;
    var un = 0
      , ln = {}
      , cn = fe.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in ln)
            ln[e](void 0, !0)
    }),
    de.cors = !!cn && "withCredentials"in cn,
    cn = de.ajax = !!cn,
    cn && fe.ajaxTransport(function(t) {
        if (!t.crossDomain || de.cors) {
            var n;
            return {
                send: function(i, o) {
                    var r, a = t.xhr(), s = ++un;
                    if (a.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (r in t.xhrFields)
                            a[r] = t.xhrFields[r];
                    t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                    t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (r in i)
                        void 0 !== i[r] && a.setRequestHeader(r, i[r] + "");
                    a.send(t.hasContent && t.data || null ),
                    n = function(e, i) {
                        var r, u, l;
                        if (n && (i || 4 === a.readyState))
                            if (delete ln[s],
                            n = void 0,
                            a.onreadystatechange = fe.noop,
                            i)
                                4 !== a.readyState && a.abort();
                            else {
                                l = {},
                                r = a.status,
                                "string" == typeof a.responseText && (l.text = a.responseText);
                                try {
                                    u = a.statusText
                                } catch (e) {
                                    u = ""
                                }
                                r || !t.isLocal || t.crossDomain ? 1223 === r && (r = 204) : r = l.text ? 200 : 404
                            }
                        l && o(r, u, l, a.getAllResponseHeaders())
                    }
                    ,
                    t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = ln[s] = n : n()
                },
                abort: function() {
                    n && n(void 0, !0)
                }
            }
        }
    }),
    fe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return fe.globalEval(e),
                e
            }
        }
    }),
    fe.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    fe.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = ie.head || fe("head")[0] || ie.documentElement;
            return {
                send: function(i, o) {
                    t = ie.createElement("script"),
                    t.async = !0,
                    e.scriptCharset && (t.charset = e.scriptCharset),
                    t.src = e.url,
                    t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null ,
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null ,
                        n || o(200, "success"))
                    }
                    ,
                    n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var dn = []
      , hn = /(=)\?(?=&|$)|\?\?/;
    fe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = dn.pop() || fe.expando + "_" + Ht++;
            return this[e] = !0,
            e
        }
    }),
    fe.ajaxPrefilter("json jsonp", function(t, n, i) {
        var o, r, a, s = t.jsonp !== !1 && (hn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0])
            return o = t.jsonpCallback = fe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            s ? t[s] = t[s].replace(hn, "$1" + o) : t.jsonp !== !1 && (t.url += (Bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
            t.converters["script json"] = function() {
                return a || fe.error(o + " was not called"),
                a[0]
            }
            ,
            t.dataTypes[0] = "json",
            r = e[o],
            e[o] = function() {
                a = arguments
            }
            ,
            i.always(function() {
                void 0 === r ? fe(e).removeProp(o) : e[o] = r,
                t[o] && (t.jsonpCallback = n.jsonpCallback,
                dn.push(o)),
                a && fe.isFunction(r) && r(a[0]),
                a = r = void 0
            }),
            "script"
    }),
    fe.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e)
            return null ;
        "boolean" == typeof t && (n = t,
        t = !1),
        t = t || ie;
        var i = xe.exec(e)
          , o = !n && [];
        return i ? [t.createElement(i[1])] : (i = v([e], t, o),
        o && o.length && fe(o).remove(),
        fe.merge([], i.childNodes))
    }
    ;
    var fn = fe.fn.load;
    fe.fn.load = function(e, t, n) {
        if ("string" != typeof e && fn)
            return fn.apply(this, arguments);
        var i, o, r, a = this, s = e.indexOf(" ");
        return s > -1 && (i = fe.trim(e.slice(s, e.length)),
        e = e.slice(0, s)),
        fe.isFunction(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (o = "POST"),
        a.length > 0 && fe.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments,
            a.html(i ? fe("<div>").append(fe.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, r || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    fe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        fe.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    fe.expr.filters.animated = function(e) {
        return fe.grep(fe.timers, function(t) {
            return e === t.elem
        }).length
    }
    ,
    fe.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, a, s, u, l, c = fe.css(e, "position"), d = fe(e), h = {};
            "static" === c && (e.style.position = "relative"),
            s = d.offset(),
            r = fe.css(e, "top"),
            u = fe.css(e, "left"),
            l = ("absolute" === c || "fixed" === c) && fe.inArray("auto", [r, u]) > -1,
            l ? (i = d.position(),
            a = i.top,
            o = i.left) : (a = parseFloat(r) || 0,
            o = parseFloat(u) || 0),
            fe.isFunction(t) && (t = t.call(e, n, fe.extend({}, s))),
            null != t.top && (h.top = t.top - s.top + a),
            null != t.left && (h.left = t.left - s.left + o),
            "using"in t ? t.using.call(e, h) : d.css(h)
        }
    },
    fe.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each(function(t) {
                    fe.offset.setOffset(this, e, t)
                });
            var t, n, i = {
                top: 0,
                left: 0
            }, o = this[0], r = o && o.ownerDocument;
            if (r)
                return t = r.documentElement,
                fe.contains(t, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()),
                n = te(r),
                {
                    top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                }) : i
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, i = this[0];
                return "fixed" === fe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(),
                t = this.offset(),
                fe.nodeName(e[0], "html") || (n = e.offset()),
                n.top += fe.css(e[0], "borderTopWidth", !0),
                n.left += fe.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - fe.css(i, "marginTop", !0),
                    left: t.left - n.left - fe.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && !fe.nodeName(e, "html") && "static" === fe.css(e, "position"); )
                    e = e.offsetParent;
                return e || ft
            })
        }
    }),
    fe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        fe.fn[e] = function(i) {
            return De(this, function(e, i, o) {
                var r = te(e);
                return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void (r ? r.scrollTo(n ? fe(r).scrollLeft() : o, n ? o : fe(r).scrollTop()) : e[i] = o)
            }, e, i, arguments.length, null )
        }
    }),
    fe.each(["top", "left"], function(e, t) {
        fe.cssHooks[t] = P(de.pixelPosition, function(e, n) {
            if (n)
                return n = mt(e, t),
                dt.test(n) ? fe(e).position()[t] + "px" : n
        })
    }),
    fe.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        fe.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            fe.fn[i] = function(i, o) {
                var r = arguments.length && (n || "boolean" != typeof i)
                  , a = n || (i === !0 || o === !0 ? "margin" : "border");
                return De(this, function(t, n, i) {
                    var o;
                    return fe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement,
                    Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? fe.css(t, n, a) : fe.style(t, n, i, a)
                }, t, r ? i : void 0, r, null )
            }
        })
    }),
    fe.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null , t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null , t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }),
    fe.fn.size = function() {
        return this.length
    }
    ,
    fe.fn.andSelf = fe.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return fe
    });
    var pn = e.jQuery
      , mn = e.$;
    return fe.noConflict = function(t) {
        return e.$ === fe && (e.$ = mn),
        t && e.jQuery === fe && (e.jQuery = pn),
        fe
    }
    ,
    t || (e.jQuery = e.$ = fe),
    fe
}),
function() {
    var e, t;
    e = window.jQuery || ("function" == typeof require ? require("jquery") : void 0),
    t = e(document),
    e.turbo = {
        version: "2.1.0",
        isReady: !1,
        use: function(e, n) {
            return t.off(".turbo").on("" + e + ".turbo", this.onLoad).on("" + n + ".turbo", this.onFetch)
        },
        addCallback: function(n) {
            return e.turbo.isReady && n(e),
            t.on("turbo:ready", function() {
                return n(e)
            })
        },
        onLoad: function() {
            return e.turbo.isReady = !0,
            t.trigger("turbo:ready")
        },
        onFetch: function() {
            return e.turbo.isReady = !1
        },
        register: function() {
            return e(this.onLoad),
            e.fn.ready = this.addCallback
        }
    },
    e.turbo.register(),
    e.turbo.use("page:load", "page:fetch")
}
.call(this),
function(e, t) {
    "use strict";
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n, i = e(document);
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return e("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return e("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(e) {
            var t = n.csrfToken();
            t && e.setRequestHeader("X-CSRF-Token", t)
        },
        refreshCSRFTokens: function() {
            e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(t, n, i) {
            var o = e.Event(n);
            return t.trigger(o, i),
            o.result !== !1
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e[0].href
        },
        isRemote: function(e) {
            return e.data("remote") !== t && e.data("remote") !== !1
        },
        handleRemote: function(i) {
            var o, r, a, s, u, l;
            if (n.fire(i, "ajax:before")) {
                if (s = i.data("with-credentials") || null ,
                u = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType,
                i.is("form")) {
                    o = i.data("ujs:submit-button-formmethod") || i.attr("method"),
                    r = i.data("ujs:submit-button-formaction") || i.attr("action"),
                    a = e(i[0]).serializeArray();
                    var c = i.data("ujs:submit-button");
                    c && (a.push(c),
                    i.data("ujs:submit-button", null )),
                    i.data("ujs:submit-button-formmethod", null ),
                    i.data("ujs:submit-button-formaction", null )
                } else
                    i.is(n.inputChangeSelector) ? (o = i.data("method"),
                    r = i.data("url"),
                    a = i.serialize(),
                    i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (o = i.data("method") || "get",
                    r = i.data("url"),
                    a = i.serialize(),
                    i.data("params") && (a = a + "&" + i.data("params"))) : (o = i.data("method"),
                    r = n.href(i),
                    a = i.data("params") || null );
                return l = {
                    type: o || "GET",
                    data: a,
                    dataType: u,
                    beforeSend: function(e, o) {
                        return o.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script),
                        !!n.fire(i, "ajax:beforeSend", [e, o]) && void i.trigger("ajax:send", e)
                    },
                    success: function(e, t, n) {
                        i.trigger("ajax:success", [e, t, n])
                    },
                    complete: function(e, t) {
                        i.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, n) {
                        i.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: n.isCrossDomain(r)
                },
                s && (l.xhrFields = {
                    withCredentials: s
                }),
                r && (l.url = r),
                n.ajax(l)
            }
            return !1
        },
        isCrossDomain: function(e) {
            var t = document.createElement("a");
            t.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = e,
                n.href = n.href,
                !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
            } catch (e) {
                return !0
            }
        },
        handleMethod: function(i) {
            var o = n.href(i)
              , r = i.data("method")
              , a = i.attr("target")
              , s = n.csrfToken()
              , u = n.csrfParam()
              , l = e('<form method="post" action="' + o + '"></form>')
              , c = '<input name="_method" value="' + r + '" type="hidden" />';
            u === t || s === t || n.isCrossDomain(o) || (c += '<input name="' + u + '" value="' + s + '" type="hidden" />'),
            a && l.attr("target", a),
            l.hide().append(c).appendTo("body"),
            l.submit()
        },
        formElements: function(t, n) {
            return t.is("form") ? e(t[0].elements).filter(n) : t.find(n)
        },
        disableFormElements: function(t) {
            n.formElements(t, n.disableSelector).each(function() {
                n.disableFormElement(e(this))
            })
        },
        disableFormElement: function(e) {
            var n, i;
            n = e.is("button") ? "html" : "val",
            i = e.data("disable-with"),
            i !== t && (e.data("ujs:enable-with", e[n]()),
            e[n](i)),
            e.prop("disabled", !0),
            e.data("ujs:disabled", !0)
        },
        enableFormElements: function(t) {
            n.formElements(t, n.enableSelector).each(function() {
                n.enableFormElement(e(this))
            })
        },
        enableFormElement: function(e) {
            var n = e.is("button") ? "html" : "val";
            e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.prop("disabled", !1),
            e.removeData("ujs:disabled")
        },
        allowAction: function(e) {
            var t, i = e.data("confirm"), o = !1;
            if (!i)
                return !0;
            if (n.fire(e, "confirm")) {
                try {
                    o = n.confirm(i)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
                t = n.fire(e, "confirm:complete", [o])
            }
            return o && t
        },
        blankInputs: function(t, n, i) {
            var o, r, a, s, u = e(), l = n || "input,textarea", c = t.find(l), d = {};
            return c.each(function() {
                o = e(this),
                o.is("input[type=radio]") ? (s = o.attr("name"),
                d[s] || (0 === t.find('input[type=radio]:checked[name="' + s + '"]').length && (a = t.find('input[type=radio][name="' + s + '"]'),
                u = u.add(a)),
                d[s] = s)) : (r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : !!o.val(),
                r === i && (u = u.add(o)))
            }),
            !!u.length && u
        },
        nonBlankInputs: function(e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"),
            t.stopImmediatePropagation(),
            !1
        },
        disableElement: function(e) {
            var i = e.data("disable-with");
            i !== t && (e.data("ujs:enable-with", e.html()),
            e.html(i)),
            e.bind("click.railsDisable", function(e) {
                return n.stopEverything(e)
            }),
            e.data("ujs:disabled", !0)
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.unbind("click.railsDisable"),
            e.removeData("ujs:disabled")
        }
    },
    n.fire(i, "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
        e.crossDomain || n.CSRFProtection(i)
    }),
    e(window).on("pageshow.rails", function() {
        e(e.rails.enableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableFormElement(t)
        }),
        e(e.rails.linkDisableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableElement(t)
        })
    }),
    i.on("ajax:complete", n.linkDisableSelector, function() {
        n.enableElement(e(this))
    }),
    i.on("ajax:complete", n.buttonDisableSelector, function() {
        n.enableFormElement(e(this))
    }),
    i.on("click.rails", n.linkClickSelector, function(t) {
        var i = e(this)
          , o = i.data("method")
          , r = i.data("params")
          , a = t.metaKey || t.ctrlKey;
        if (!n.allowAction(i))
            return n.stopEverything(t);
        if (!a && i.is(n.linkDisableSelector) && n.disableElement(i),
        n.isRemote(i)) {
            if (a && (!o || "GET" === o) && !r)
                return !0;
            var s = n.handleRemote(i);
            return s === !1 ? n.enableElement(i) : s.fail(function() {
                n.enableElement(i)
            }),
            !1
        }
        return o ? (n.handleMethod(i),
        !1) : void 0
    }),
    i.on("click.rails", n.buttonClickSelector, function(t) {
        var i = e(this);
        if (!n.allowAction(i) || !n.isRemote(i))
            return n.stopEverything(t);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var o = n.handleRemote(i);
        return o === !1 ? n.enableFormElement(i) : o.fail(function() {
            n.enableFormElement(i)
        }),
        !1
    }),
    i.on("change.rails", n.inputChangeSelector, function(t) {
        var i = e(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i),
        !1) : n.stopEverything(t)
    }),
    i.on("submit.rails", n.formSubmitSelector, function(i) {
        var o, r, a = e(this), s = n.isRemote(a);
        if (!n.allowAction(a))
            return n.stopEverything(i);
        if (a.attr("novalidate") === t)
            if (a.data("ujs:formnovalidate-button") === t) {
                if (o = n.blankInputs(a, n.requiredInputSelector, !1),
                o && n.fire(a, "ajax:aborted:required", [o]))
                    return n.stopEverything(i)
            } else
                a.data("ujs:formnovalidate-button", t);
        if (s) {
            if (r = n.nonBlankInputs(a, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(a)
                }, 13);
                var u = n.fire(a, "ajax:aborted:file", [r]);
                return u || setTimeout(function() {
                    n.enableFormElements(a)
                }, 13),
                u
            }
            return n.handleRemote(a),
            !1
        }
        setTimeout(function() {
            n.disableFormElements(a)
        }, 13)
    }),
    i.on("click.rails", n.formInputClickSelector, function(t) {
        var i = e(this);
        if (!n.allowAction(i))
            return n.stopEverything(t);
        var o = i.attr("name")
          , r = o ? {
            name: o,
            value: i.val()
        } : null
          , a = i.closest("form");
        0 === a.length && (a = e("#" + i.attr("form"))),
        a.data("ujs:submit-button", r),
        a.data("ujs:formnovalidate-button", i.attr("formnovalidate")),
        a.data("ujs:submit-button-formaction", i.attr("formaction")),
        a.data("ujs:submit-button-formmethod", i.attr("formmethod"))
    }),
    i.on("ajax:send.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.disableFormElements(e(this))
    }),
    i.on("ajax:complete.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.enableFormElements(e(this))
    }),
    e(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery),
function() {
    var e, t, n, i, o, r, a, s, u, l, c, d, h, f, p, m, g, v, y, b, w, k, x, S, T, j, C, _, E, A, $, P, M, N, L, F, z, I, O, D, R, H, B, W, q, U, V, Q, G, Y, X, J, K, Z, ee, te, ne = [].indexOf || function(e) {
        for (var t = 0, n = this.length; t < n; t++)
            if (t in this && this[t] === e)
                return t;
        return -1
    }
    , ie = function(e, t) {
        function n() {
            this.constructor = e
        }
        for (var i in t)
            oe.call(t, i) && (e[i] = t[i]);
        return n.prototype = t.prototype,
        e.prototype = new n,
        e.__super__ = t.prototype,
        e
    }, oe = {}.hasOwnProperty, re = [].slice, ae = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    N = {},
    h = 10,
    J = !1,
    O = null ,
    y = null ,
    P = null ,
    H = null ,
    te = null ,
    i = {
        BEFORE_CHANGE: "page:before-change",
        FETCH: "page:fetch",
        RECEIVE: "page:receive",
        CHANGE: "page:change",
        UPDATE: "page:update",
        LOAD: "page:load",
        RESTORE: "page:restore",
        BEFORE_UNLOAD: "page:before-unload",
        EXPIRE: "page:expire"
    },
    S = function(e) {
        var t;
        return e = new n(e),
        V(),
        d(),
        null != O && O.start(),
        J && (t = K(e.absolute)) ? (T(t),
        j(e, null , !1)) : j(e, Y)
    }
    ,
    K = function(e) {
        var t;
        if (t = N[e],
        t && !t.transitionCacheDisabled)
            return t
    }
    ,
    w = function(e) {
        return null == e && (e = !0),
        J = e
    }
    ,
    b = function(e) {
        if (null == e && (e = !0),
        l)
            return e ? null != O ? O : O = new r("html") : (null != O && O.uninstall(),
            O = null )
    }
    ,
    j = function(e, t, n) {
        return null == n && (n = !0),
        Z(i.FETCH, {
            url: e.absolute
        }),
        null != te && te.abort(),
        te = new XMLHttpRequest,
        te.open("GET", e.withoutHashForIE10compatibility(), !0),
        te.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"),
        te.setRequestHeader("X-XHR-Referer", H),
        te.onload = function() {
            var n;
            return Z(i.RECEIVE, {
                url: e.absolute
            }),
            (n = I()) ? (B(e),
            W(),
            f.apply(null , x(n)),
            M(),
            "function" == typeof t && t(),
            Z(i.LOAD)) : document.location.href = v() || e.absolute
        }
        ,
        O && n && (te.onprogress = function() {
            return function(e) {
                var t;
                return t = e.lengthComputable ? e.loaded / e.total * 100 : O.value + (100 - O.value) / 10,
                O.advanceTo(t)
            }
        }(this)),
        te.onloadend = function() {
            return te = null
        }
        ,
        te.onerror = function() {
            return document.location.href = e.absolute
        }
        ,
        te.send()
    }
    ,
    T = function(e) {
        return null != te && te.abort(),
        f(e.title, e.body),
        D(e),
        Z(i.RESTORE)
    }
    ,
    d = function() {
        var e;
        return e = new n(y.url),
        N[e.absolute] = {
            url: e.relative,
            body: document.body,
            title: document.title,
            positionY: window.pageYOffset,
            positionX: window.pageXOffset,
            cachedAt: (new Date).getTime(),
            transitionCacheDisabled: null != document.querySelector("[data-no-transition-cache]")
        },
        m(h)
    }
    ,
    F = function(e) {
        if (null == e && (e = h),
        /^[\d]+$/.test(e))
            return h = parseInt(e)
    }
    ,
    m = function(e) {
        var t, n, o, r, a, s;
        for (a = Object.keys(N),
        t = a.map(function(e) {
            return N[e].cachedAt
        }).sort(function(e, t) {
            return t - e
        }),
        s = [],
        n = 0,
        r = a.length; n < r; n++)
            o = a[n],
            N[o].cachedAt <= t[e] && (Z(i.EXPIRE, N[o]),
            s.push(delete N[o]));
        return s
    }
    ,
    f = function(t, n, o, r) {
        return Z(i.BEFORE_UNLOAD),
        document.title = t,
        document.documentElement.replaceChild(n, document.body),
        null != o && e.update(o),
        X(),
        r && k(),
        y = window.history.state,
        null != O && O.done(),
        Z(i.CHANGE),
        Z(i.UPDATE)
    }
    ,
    k = function() {
        var e, t, n, i, o, r, a, s, u, l, c, d;
        for (d = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),
        n = 0,
        o = d.length; n < o; n++)
            if (c = d[n],
            "" === (u = c.type) || "text/javascript" === u) {
                for (t = document.createElement("script"),
                l = c.attributes,
                i = 0,
                r = l.length; i < r; i++)
                    e = l[i],
                    t.setAttribute(e.name, e.value);
                c.hasAttribute("async") || (t.async = !1),
                t.appendChild(document.createTextNode(c.innerHTML)),
                s = c.parentNode,
                a = c.nextSibling,
                s.removeChild(c),
                s.insertBefore(t, a)
            }
    }
    ,
    Q = function(e) {
        return e.innerHTML = e.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi, ""),
        e
    }
    ,
    X = function() {
        var e, t;
        if (e = (t = document.querySelectorAll("input[autofocus], textarea[autofocus]"))[t.length - 1],
        e && document.activeElement !== e)
            return e.focus()
    }
    ,
    B = function(e) {
        if ((e = new n(e)).absolute !== H)
            return window.history.pushState({
                turbolinks: !0,
                url: e.absolute
            }, "", e.absolute)
    }
    ,
    W = function() {
        var e, t;
        if (e = te.getResponseHeader("X-XHR-Redirected-To"))
            return e = new n(e),
            t = e.hasNoHash() ? document.location.hash : "",
            window.history.replaceState(window.history.state, "", e.href + t)
    }
    ,
    v = function() {
        var e;
        if (null != (e = te.getResponseHeader("Location")) && new n(e).crossOrigin())
            return e
    }
    ,
    V = function() {
        return H = document.location.href
    }
    ,
    U = function() {
        return window.history.replaceState({
            turbolinks: !0,
            url: document.location.href
        }, "", document.location.href)
    }
    ,
    q = function() {
        return y = window.history.state
    }
    ,
    M = function() {
        var e;
        if (navigator.userAgent.match(/Firefox/) && !(e = new n).hasNoHash())
            return window.history.replaceState(y, "", e.withoutHash()),
            document.location.hash = e.hash
    }
    ,
    D = function(e) {
        return window.scrollTo(e.positionX, e.positionY)
    }
    ,
    Y = function() {
        return document.location.hash ? document.location.href = document.location.href : window.scrollTo(0, 0)
    }
    ,
    p = function(e) {
        var t, n, i;
        if (null == e || "object" != typeof e)
            return e;
        t = new e.constructor;
        for (n in e)
            i = e[n],
            t[n] = p(i);
        return t
    }
    ,
    z = function(e) {
        var t, n;
        return n = (null != (t = document.cookie.match(new RegExp(e + "=(\\w+)"))) ? t[1].toUpperCase() : void 0) || "",
        document.cookie = e + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",
        n
    }
    ,
    Z = function(e, t) {
        var n;
        return "undefined" != typeof Prototype && Event.fire(document, e, t, !0),
        n = document.createEvent("Events"),
        t && (n.data = t),
        n.initEvent(e, !0, !0),
        document.dispatchEvent(n)
    }
    ,
    L = function(e) {
        return !Z(i.BEFORE_CHANGE, {
            url: e
        })
    }
    ,
    I = function() {
        var e, t, n, i, o, r;
        if (t = function() {
            var e;
            return 400 <= (e = te.status) && e < 600
        }
        ,
        r = function() {
            var e;
            return null != (e = te.getResponseHeader("Content-Type")) && e.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
        }
        ,
        i = function(e) {
            var t, n, i, o, r;
            for (o = e.querySelector("head").childNodes,
            r = [],
            t = 0,
            n = o.length; t < n; t++)
                i = o[t],
                null != ("function" == typeof i.getAttribute ? i.getAttribute("data-turbolinks-track") : void 0) && r.push(i.getAttribute("src") || i.getAttribute("href"));
            return r
        }
        ,
        e = function(e) {
            var t;
            return P || (P = i(document)),
            t = i(e),
            t.length !== P.length || o(t, P).length !== P.length
        }
        ,
        o = function(e, t) {
            var n, i, o, r, a;
            for (e.length > t.length && (o = [t, e],
            e = o[0],
            t = o[1]),
            r = [],
            n = 0,
            i = e.length; n < i; n++)
                a = e[n],
                ne.call(t, a) >= 0 && r.push(a);
            return r
        }
        ,
        !t() && r() && (n = g(te.responseText),
        n && !e(n)))
            return n
    }
    ,
    x = function(t) {
        var n;
        return n = t.querySelector("title"),
        [null != n ? n.textContent : void 0, Q(t.querySelector("body")), e.get(t).token, "runScripts"]
    }
    ,
    e = {
        get: function(e) {
            var t;
            return null == e && (e = document),
            {
                node: t = e.querySelector('meta[name="csrf-token"]'),
                token: null != t && "function" == typeof t.getAttribute ? t.getAttribute("content") : void 0
            }
        },
        update: function(e) {
            var t;
            if (t = this.get(),
            null != t.token && null != e && t.token !== e)
                return t.node.setAttribute("content", e)
        }
    },
    g = function(e) {
        var t;
        return t = document.documentElement.cloneNode(),
        t.innerHTML = e,
        t.head = t.querySelector("head"),
        t.body = t.querySelector("body"),
        t
    }
    ,
    n = function() {
        function e(t) {
            return this.original = null != t ? t : document.location.href,
            this.original.constructor === e ? this.original : void this._parse()
        }
        return e.prototype.withoutHash = function() {
            return this.href.replace(this.hash, "").replace("#", "")
        }
        ,
        e.prototype.withoutHashForIE10compatibility = function() {
            return this.withoutHash()
        }
        ,
        e.prototype.hasNoHash = function() {
            return 0 === this.hash.length
        }
        ,
        e.prototype.crossOrigin = function() {
            return this.origin !== (new e).origin
        }
        ,
        e.prototype._parse = function() {
            var e;
            return (null != this.link ? this.link : this.link = document.createElement("a")).href = this.original,
            e = this.link,
            this.href = e.href,
            this.protocol = e.protocol,
            this.host = e.host,
            this.hostname = e.hostname,
            this.port = e.port,
            this.pathname = e.pathname,
            this.search = e.search,
            this.hash = e.hash,
            this.origin = [this.protocol, "//", this.hostname].join(""),
            0 !== this.port.length && (this.origin += ":" + this.port),
            this.relative = [this.pathname, this.search, this.hash].join(""),
            this.absolute = this.href
        }
        ,
        e
    }(),
    o = function(e) {
        function t(e) {
            return this.link = e,
            this.link.constructor === t ? this.link : (this.original = this.link.href,
            this.originalElement = this.link,
            this.link = this.link.cloneNode(!1),
            void t.__super__.constructor.apply(this, arguments))
        }
        return ie(t, e),
        t.HTML_EXTENSIONS = ["html"],
        t.allowExtensions = function() {
            var e, n, i, o;
            for (n = 1 <= arguments.length ? re.call(arguments, 0) : [],
            i = 0,
            o = n.length; i < o; i++)
                e = n[i],
                t.HTML_EXTENSIONS.push(e);
            return t.HTML_EXTENSIONS
        }
        ,
        t.prototype.shouldIgnore = function() {
            return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target()
        }
        ,
        t.prototype._anchored = function() {
            return (this.hash.length > 0 || "#" === this.href.charAt(this.href.length - 1)) && this.withoutHash() === (new n).withoutHash()
        }
        ,
        t.prototype._nonHtml = function() {
            return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + t.HTML_EXTENSIONS.join("|") + ")?$","g"))
        }
        ,
        t.prototype._optOut = function() {
            var e, t;
            for (t = this.originalElement; !e && t !== document; )
                e = null != t.getAttribute("data-no-turbolink"),
                t = t.parentNode;
            return e
        }
        ,
        t.prototype._target = function() {
            return 0 !== this.link.target.length
        }
        ,
        t
    }(n),
    t = function() {
        function e(e) {
            this.event = e,
            this.event.defaultPrevented || (this._extractLink(),
            this._validForTurbolinks() && (L(this.link.absolute) || ee(this.link.href),
            this.event.preventDefault()))
        }
        return e.installHandlerLast = function(t) {
            if (!t.defaultPrevented)
                return document.removeEventListener("click", e.handle, !1),
                document.addEventListener("click", e.handle, !1)
        }
        ,
        e.handle = function(t) {
            return new e(t)
        }
        ,
        e.prototype._extractLink = function() {
            var e;
            for (e = this.event.target; e.parentNode && "A" !== e.nodeName; )
                e = e.parentNode;
            if ("A" === e.nodeName && 0 !== e.href.length)
                return this.link = new o(e)
        }
        ,
        e.prototype._validForTurbolinks = function() {
            return null != this.link && !(this.link.shouldIgnore() || this._nonStandardClick())
        }
        ,
        e.prototype._nonStandardClick = function() {
            return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey
        }
        ,
        e
    }(),
    r = function() {
        function e(e) {
            this.elementSelector = e,
            this._trickle = ae(this._trickle, this),
            this.value = 0,
            this.content = "",
            this.speed = 300,
            this.opacity = .99,
            this.install()
        }
        var t;
        return t = "turbolinks-progress-bar",
        e.prototype.install = function() {
            return this.element = document.querySelector(this.elementSelector),
            this.element.classList.add(t),
            this.styleElement = document.createElement("style"),
            document.head.appendChild(this.styleElement),
            this._updateStyle()
        }
        ,
        e.prototype.uninstall = function() {
            return this.element.classList.remove(t),
            document.head.removeChild(this.styleElement)
        }
        ,
        e.prototype.start = function() {
            return this.advanceTo(5)
        }
        ,
        e.prototype.advanceTo = function(e) {
            var t;
            if (e > (t = this.value) && t <= 100) {
                if (this.value = e,
                this._updateStyle(),
                100 === this.value)
                    return this._stopTrickle();
                if (this.value > 0)
                    return this._startTrickle()
            }
        }
        ,
        e.prototype.done = function() {
            if (this.value > 0)
                return this.advanceTo(100),
                this._reset()
        }
        ,
        e.prototype._reset = function() {
            var e;
            return e = this.opacity,
            setTimeout(function(e) {
                return function() {
                    return e.opacity = 0,
                    e._updateStyle()
                }
            }(this), this.speed / 2),
            setTimeout(function(t) {
                return function() {
                    return t.value = 0,
                    t.opacity = e,
                    t._withSpeed(0, function() {
                        return t._updateStyle(!0)
                    })
                }
            }(this), this.speed)
        }
        ,
        e.prototype._startTrickle = function() {
            if (!this.trickling)
                return this.trickling = !0,
                setTimeout(this._trickle, this.speed)
        }
        ,
        e.prototype._stopTrickle = function() {
            return delete this.trickling
        }
        ,
        e.prototype._trickle = function() {
            if (this.trickling)
                return this.advanceTo(this.value + Math.random() / 2),
                setTimeout(this._trickle, this.speed)
        }
        ,
        e.prototype._withSpeed = function(e, t) {
            var n, i;
            return n = this.speed,
            this.speed = e,
            i = t(),
            this.speed = n,
            i
        }
        ,
        e.prototype._updateStyle = function(e) {
            return null == e && (e = !1),
            e && this._changeContentToForceRepaint(),
            this.styleElement.textContent = this._createCSSRule()
        }
        ,
        e.prototype._changeContentToForceRepaint = function() {
            return this.content = "" === this.content ? " " : ""
        }
        ,
        e.prototype._createCSSRule = function() {
            return this.elementSelector + "." + t + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + this.speed / 2 + "ms ease-in;\n  transform: translate3d(0,0,0);\n}"
        }
        ,
        e
    }(),
    c = function(e) {
        return setTimeout(e, 500)
    }
    ,
    E = function() {
        return document.addEventListener("DOMContentLoaded", function() {
            return Z(i.CHANGE),
            Z(i.UPDATE)
        }, !0)
    }
    ,
    $ = function() {
        if ("undefined" != typeof jQuery)
            return jQuery(document).on("ajaxSuccess", function(e, t) {
                if (jQuery.trim(t.responseText))
                    return Z(i.UPDATE)
            })
    }
    ,
    A = function(e) {
        var t, i;
        if (null != (i = e.state) ? i.turbolinks : void 0)
            return (t = N[new n(e.state.url).absolute]) ? (d(),
            T(t)) : ee(e.target.location.href)
    }
    ,
    _ = function() {
        return U(),
        q(),
        document.addEventListener("click", t.installHandlerLast, !0),
        window.addEventListener("hashchange", function() {
            return U(),
            q()
        }, !1),
        c(function() {
            return window.addEventListener("popstate", A, !1)
        })
    }
    ,
    C = void 0 !== window.history.state || navigator.userAgent.match(/Firefox\/2[6|7]/),
    u = window.history && window.history.pushState && window.history.replaceState && C,
    a = !navigator.userAgent.match(/CriOS\//),
    G = "GET" === (R = z("request_method")) || "" === R,
    l = u && a && G,
    s = document.addEventListener && document.createEvent,
    s && (E(),
    $()),
    l ? (ee = S,
    _()) : ee = function(e) {
        return document.location.href = e
    }
    ,
    this.Turbolinks = {
        visit: ee,
        pagesCached: F,
        enableTransitionCache: w,
        enableProgressBar: b,
        allowLinkExtensions: o.allowExtensions,
        supported: l,
        EVENTS: p(i)
    }
}
.call(this),
function(e, t) {
    var n = {
        catchMethods: {
            methodreturn: [],
            count: 0
        },
        init: function(t) {
            var n, i, o;
            t.originalEvent.origin.match(/vimeo/g) && "data"in t.originalEvent && (o = "string" === e.type(t.originalEvent.data) ? e.parseJSON(t.originalEvent.data) : t.originalEvent.data,
            o && (n = this.setPlayerID(o),
            n.length && (i = this.setVimeoAPIurl(n),
            o.hasOwnProperty("event") && this.handleEvent(o, n, i),
            o.hasOwnProperty("method") && this.handleMethod(o, n, i))))
        },
        setPlayerID: function(t) {
            return e("iframe[src*=" + t.player_id + "]")
        },
        setVimeoAPIurl: function(e) {
            return "http" !== e.attr("src").substr(0, 4) ? "https:" + e.attr("src").split("?")[0] : e.attr("src").split("?")[0]
        },
        handleMethod: function(e) {
            this.catchMethods.methodreturn.push(e.value)
        },
        handleEvent: function(t, n, i) {
            switch (t.event.toLowerCase()) {
            case "ready":
                for (var o in e._data(n[0], "events"))
                    o.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && n[0].contentWindow.postMessage(JSON.stringify({
                        method: "addEventListener",
                        value: o
                    }), i);
                if (n.data("vimeoAPICall")) {
                    for (var r = n.data("vimeoAPICall"), a = 0; a < r.length; a++)
                        n[0].contentWindow.postMessage(JSON.stringify(r[a].message), r[a].api);
                    n.removeData("vimeoAPICall")
                }
                n.data("vimeoReady", !0),
                n.triggerHandler("ready");
                break;
            case "seek":
                n.triggerHandler("seek", [t.data]);
                break;
            case "loadprogress":
                n.triggerHandler("loadProgress", [t.data]);
                break;
            case "playprogress":
                n.triggerHandler("playProgress", [t.data]);
                break;
            case "pause":
                n.triggerHandler("pause");
                break;
            case "finish":
                n.triggerHandler("finish");
                break;
            case "play":
                n.triggerHandler("play");
                break;
            case "cuechange":
                n.triggerHandler("cuechange")
            }
        }
    };
    jQuery(document).ready(function() {
        e("iframe[src*='vimeo.com']").each(function(t) {
            var n = e(this).attr("src");
            if (null === n.match(/player_id/g)) {
                var i = n.indexOf("?") === -1 ? "?" : "&"
                  , o = e.param({
                    api: 1,
                    player_id: "vvvvimeoVideo-" + t
                });
                e(this).attr("src", n + i + o)
            }
        })
    }),
    e(t).on("message", function(e) {
        n.init(e)
    }),
    e.vimeo = function(e, i, o) {
        var r = {}
          , a = n.catchMethods.methodreturn.length;
        if ("string" == typeof i && (r.method = i),
        void 0 !== typeof o && "function" != typeof o && (r.value = o),
        "iframe" === e.prop("tagName").toLowerCase() && r.hasOwnProperty("method"))
            if (e.data("vimeoReady"))
                e[0].contentWindow.postMessage(JSON.stringify(r), n.setVimeoAPIurl(e));
            else {
                var s = e.data("vimeoAPICall") ? e.data("vimeoAPICall") : [];
                s.push({
                    message: r,
                    api: n.setVimeoAPIurl(e)
                }),
                e.data("vimeoAPICall", s)
            }
        return "get" !== i.toString().substr(0, 3) && "paused" !== i.toString() || "function" != typeof o || (!function(e, i, o) {
            var r = t.setInterval(function() {
                n.catchMethods.methodreturn.length != e && (t.clearInterval(r),
                i(n.catchMethods.methodreturn[o]))
            }, 10)
        }(a, o, n.catchMethods.count),
        n.catchMethods.count++),
        e
    }
    ,
    e.fn.vimeo = function(t, n) {
        return e.vimeo(this, t, n)
    }
}(jQuery, window),
function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var n = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var i = document.head || document.getElementsByTagName("head")[0]
              , o = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}"
              , r = document.createElement("div");
            r.innerHTML = '<p>x</p><style id="fit-vids-style">' + o + "</style>",
            i.appendChild(r.childNodes[1])
        }
        return t && e.extend(n, t),
        this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            n.customSelector && t.push(n.customSelector);
            var i = e(this).find(t.join(","));
            i = i.not("object object"),
            i.each(function() {
                var t = e(this);
                if (!("embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                    var n = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height()
                      , i = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10)
                      , o = n / i;
                    if (!t.attr("id")) {
                        var r = "fitvid" + Math.floor(999999 * Math.random());
                        t.attr("id", r)
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * o + "%"),
                    t.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto);
var SC = SC || {};
SC.Widget = function(e) {
    function t(i) {
        if (n[i])
            return n[i].exports;
        var o = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    var n = {};
    return t.m = e,
    t.c = n,
    t.p = "",
    t(0)
}([function(e, t, n) {
    function i(e) {
        return !!("" === e || e && e.charCodeAt && e.substr)
    }
    function o(e) {
        return !!(e && e.constructor && e.call && e.apply)
    }
    function r(e) {
        return !(!e || 1 !== e.nodeType || "IFRAME" !== e.nodeName.toUpperCase())
    }
    function a(e) {
        var t, n = !1;
        for (t in _)
            if (_.hasOwnProperty(t) && _[t] === e) {
                n = !0;
                break
            }
        return n
    }
    function s(e) {
        var t, n, i;
        for (t = 0,
        n = M.length; t < n && (i = e(M[t]),
        i !== !1); t++)
            ;
    }
    function u(e) {
        var t, n, i, o = "";
        for ("//" === e.substr(0, 2) && (e = window.location.protocol + e),
        i = e.split("/"),
        t = 0,
        n = i.length; t < n && t < 3; t++)
            o += i[t],
            t < 2 && (o += "/");
        return o
    }
    function l(e) {
        return e.contentWindow ? e.contentWindow : e.contentDocument && "parentWindow"in e.contentDocument ? e.contentDocument.parentWindow : null
    }
    function c(e) {
        var t, n = [];
        for (t in e)
            e.hasOwnProperty(t) && n.push(e[t]);
        return n
    }
    function d(e, t, n) {
        n.callbacks[e] = n.callbacks[e] || [],
        n.callbacks[e].push(t)
    }
    function h(e, t) {
        var n, i = !0;
        return t.callbacks[e] = [],
        s(function(t) {
            if (n = t.callbacks[e] || [],
            n.length)
                return i = !1,
                !1
        }),
        i
    }
    function f(e, t, n) {
        var i, o, r = l(n);
        return !!r.postMessage && (i = n.getAttribute("src").split("?")[0],
        o = JSON.stringify({
            method: e,
            value: t
        }),
        "//" === i.substr(0, 2) && (i = window.location.protocol + i),
        i = i.replace(/http:\/\/(w|wt).soundcloud.com/, "https://$1.soundcloud.com"),
        void r.postMessage(o, i))
    }
    function p(e) {
        var t;
        return s(function(n) {
            if (n.instance === e)
                return t = n,
                !1
        }),
        t
    }
    function m(e) {
        var t;
        return s(function(n) {
            if (l(n.element) === e)
                return t = n,
                !1
        }),
        t
    }
    function g(e, t) {
        return function(n) {
            var i = o(n)
              , r = p(this)
              , a = !i && t ? n : null
              , s = i && !t ? n : null ;
            return s && d(e, s, r),
            f(e, a, r.element),
            this
        }
    }
    function v(e, t, n) {
        var i, o, r;
        for (i = 0,
        o = t.length; i < o; i++)
            r = t[i],
            e[r] = g(r, n)
    }
    function y(e, t, n) {
        return e + "?url=" + t + "&" + b(n)
    }
    function b(e) {
        var t, n, i = [];
        for (t in e)
            e.hasOwnProperty(t) && (n = e[t],
            i.push(t + "=" + ("start_track" === t ? parseInt(n, 10) : n ? "true" : "false")));
        return i.join("&")
    }
    function w(e, t, n) {
        var i, o, r = e.callbacks[t] || [];
        for (i = 0,
        o = r.length; i < o; i++)
            r[i].apply(e.instance, n);
        (a(t) || t === A.READY) && (e.callbacks[t] = [])
    }
    function k(e) {
        var t, n, i, o, r;
        try {
            n = JSON.parse(e.data)
        } catch (e) {
            return !1
        }
        return t = m(e.source),
        i = n.method,
        o = n.value,
        (!t || x(e.origin) === x(t.domain)) && (t ? (i === A.READY && (t.isReady = !0,
        w(t, N),
        h(N, t)),
        i !== A.PLAY || t.playEventFired || (t.playEventFired = !0),
        i !== A.PLAY_PROGRESS || t.playEventFired || (t.playEventFired = !0,
        w(t, A.PLAY, [o])),
        r = [],
        void 0 !== o && r.push(o),
        void w(t, i, r)) : (i === A.READY && P.push(e.source),
        !1))
    }
    function x(e) {
        return e.replace(F, "")
    }
    var S, T, j, C = n(1), _ = n(2), E = n(3), A = C.api, $ = C.bridge, P = [], M = [], N = "__LATE_BINDING__", L = "http://wt.soundcloud.dev:9200/", F = /^http(?:s?)/;
    window.addEventListener ? window.addEventListener("message", k, !1) : window.attachEvent("onmessage", k),
    e.exports = j = function(e, t, n) {
        if (i(e) && (e = document.getElementById(e)),
        !r(e))
            throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");
        t && (n = n || {},
        e.src = y(L, t, n));
        var o, a, s = m(l(e));
        return s && s.instance ? s.instance : (o = P.indexOf(l(e)) > -1,
        a = new S(e),
        M.push(new T(a,e,o)),
        a)
    }
    ,
    j.Events = A,
    window.SC = window.SC || {},
    window.SC.Widget = j,
    T = function(e, t, n) {
        this.instance = e,
        this.element = t,
        this.domain = u(t.getAttribute("src")),
        this.isReady = !!n,
        this.callbacks = {}
    }
    ,
    S = function() {}
    ,
    S.prototype = {
        constructor: S,
        load: function(e, t) {
            if (e) {
                t = t || {};
                var n = this
                  , i = p(this)
                  , o = i.element
                  , r = o.src
                  , a = r.substr(0, r.indexOf("?"));
                i.isReady = !1,
                i.playEventFired = !1,
                o.onload = function() {
                    n.bind(A.READY, function() {
                        var e, n = i.callbacks;
                        for (e in n)
                            n.hasOwnProperty(e) && e !== A.READY && f($.ADD_LISTENER, e, i.element);
                        t.callback && t.callback()
                    })
                }
                ,
                o.src = y(a, e, t)
            }
        },
        bind: function(e, t) {
            var n = this
              , i = p(this);
            return i && i.element && (e === A.READY && i.isReady ? setTimeout(t, 1) : i.isReady ? (d(e, t, i),
            f($.ADD_LISTENER, e, i.element)) : d(N, function() {
                n.bind(e, t)
            }, i)),
            this
        },
        unbind: function(e) {
            var t, n = p(this);
            n && n.element && (t = h(e, n),
            e !== A.READY && t && f($.REMOVE_LISTENER, e, n.element))
        }
    },
    v(S.prototype, c(_)),
    v(S.prototype, c(E), !0)
}
, function(e, t) {
    t.api = {
        LOAD_PROGRESS: "loadProgress",
        PLAY_PROGRESS: "playProgress",
        PLAY: "play",
        PAUSE: "pause",
        FINISH: "finish",
        SEEK: "seek",
        READY: "ready",
        OPEN_SHARE_PANEL: "sharePanelOpened",
        CLICK_DOWNLOAD: "downloadClicked",
        CLICK_BUY: "buyClicked",
        ERROR: "error"
    },
    t.bridge = {
        REMOVE_LISTENER: "removeEventListener",
        ADD_LISTENER: "addEventListener"
    }
}
, function(e) {
    e.exports = {
        GET_VOLUME: "getVolume",
        GET_DURATION: "getDuration",
        GET_POSITION: "getPosition",
        GET_SOUNDS: "getSounds",
        GET_CURRENT_SOUND: "getCurrentSound",
        GET_CURRENT_SOUND_INDEX: "getCurrentSoundIndex",
        IS_PAUSED: "isPaused"
    }
}
, function(e) {
    e.exports = {
        PLAY: "play",
        PAUSE: "pause",
        TOGGLE: "toggle",
        SEEK_TO: "seekTo",
        SET_VOLUME: "setVolume",
        NEXT: "next",
        PREV: "prev",
        SKIP: "skip"
    }
}
]),
function(e) {
    "use strict";
    e.fn.audioPlayer = function() {
        function t(e) {
            e.hasClass("processed") || (e.mediaelementplayer({
                audioHeight: 42,
                features: ["playpause", "progress", "current", "duration", "volume", "fullscreen"],
                pauseOtherPlayers: !0,
                timerRate: 1e3,
                success: function(t) {
                    var i = e.closest(".mejs-audio");
                    i.find(".mejs-time-rail").before('<div class="mejs-elapsed">00:00</div>').after('<div class="mejs-remaining" />'),
                    i.find(".mejs-horizontal-volume-slider").after('<div class="mejs-button mejs-loud-button"><button type="button" /></div>'),
                    t.addEventListener("loadeddata", function() {
                        n(t, i),
                        i.find(".mejs-loud-button button").on("click", function() {
                            t.setMuted(!1),
                            t.setVolume(1)
                        })
                    }, !1);
                    var o;
                    t.addEventListener("playing", function() {
                        o = setInterval(function() {
                            n(t, i)
                        }, 1e3)
                    }, !1),
                    t.addEventListener("pause", function() {
                        clearInterval(o)
                    }, !1),
                    t.addEventListener("seeked", function() {
                        n(t, i)
                    }, !1)
                },
                pluginPath: "",
                flashName: "/flashmediaelement-cdn.swf"
            }),
            e.addClass("processed"))
        }
        function n(e, t) {
            t.find(".mejs-elapsed").text(i(e.currentTime)),
            t.find(".mejs-remaining").text("-" + i(e.duration - e.currentTime))
        }
        function i(e) {
            var t = Math.floor(e / 3600)
              , n = Math.floor((e - 3600 * t) / 60)
              , i = Math.floor(e - 3600 * t - 60 * n);
            return t > 0 ? t += ":" : t = "",
            n < 10 && (n = "0" + n),
            i < 10 && (i = "0" + i),
            t + n + ":" + i
        }
        t(e(this))
    }
}(jQuery),
function() {
    "use strict";
    function e() {
        $(window).width() < 801 && ($("body").data("mobilejsloaded") || ($.getScript($("body").data("mobilejs")),
        $("body").data("mobilejsloaded", !0)))
    }
    function t() {
        $(".js-close-alert").on("click", function() {
            $(this).closest(".alerts").slideUp()
        })
    }
    $(document).ready(function() {
        function n(e, t) {
            return $(window).resize(function() {
                clearTimeout(t),
                t = setTimeout(e, 100)
            }),
            e
        }
        $("html").removeClass("no-js").addClass("js"),
        "ontouchend"in document && $("html").addClass("touch"),
        $(window).on("throttledresize, orientationchange", function() {
            e()
        }),
        n(function() {
            e()
        }),
        e(),
        $(".toggle-trigger").click(function() {
            $(this).toggleClass("active"),
            $(this).parent().nextAll(".toggle").slideToggle()
        }),
        t()
    });
    var n = null ;
    $(document).on("fixed-body", "body", function(e, t) {
        var i = $("html")
          , o = $(".page-background")
          , r = $(".header");
        null == n && (n = $(window).scrollTop()),
        "open" == t ? (r.addClass("fixed-body").removeClass("hide"),
        i.addClass("fixed-body").css({
            top: -n
        }),
        o.prepend("<div class='unfix-body'></div>")) : ($(".unfix-body").remove(),
        i.removeClass("fixed-body").css({
            top: 0
        }),
        $(document).scrollTop(n),
        n = null ,
        setTimeout(function() {
            r.removeClass("fixed-body").removeClass("hide")
        }, 300))
    })
}();
var mejs = mejs || {};
mejs.version = "2.15.1",
mejs.meIndex = 0,
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "application/x-mpegURL"]
    }],
    youtube: [{
        version: null ,
        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
    }],
    vimeo: [{
        version: null ,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
},
mejs.Utility = {
    encodeUrl: function(e) {
        return encodeURIComponent(e)
    },
    escapeHTML: function(e) {
        return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function(e) {
        var t = document.createElement("div");
        return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>',
        t.firstChild.href
    },
    getScriptPath: function(e) {
        for (var t, n, i, o, r, a, s = 0, u = "", l = "", c = document.getElementsByTagName("script"), d = c.length, h = e.length; s < d; s++) {
            for (o = c[s].src,
            n = o.lastIndexOf("/"),
            n > -1 ? (a = o.substring(n + 1),
            r = o.substring(0, n + 1)) : (a = o,
            r = ""),
            t = 0; t < h; t++)
                if (l = e[t],
                i = a.indexOf(l),
                i > -1) {
                    u = r;
                    break
                }
            if ("" !== u)
                break
        }
        return u
    },
    secondsToTimeCode: function(e, t, n, i) {
        "undefined" == typeof n ? n = !1 : "undefined" == typeof i && (i = 25);
        var o = Math.floor(e / 3600) % 24
          , r = Math.floor(e / 60) % 60
          , a = Math.floor(e % 60)
          , s = Math.floor((e % 1 * i).toFixed(3))
          , u = (t || o > 0 ? (o < 10 ? "0" + o : o) + ":" : "") + (r < 10 ? "0" + r : r) + ":" + (a < 10 ? "0" + a : a) + (n ? ":" + (s < 10 ? "0" + s : s) : "");
        return u
    },
    timeCodeToSeconds: function(e, t, n, i) {
        "undefined" == typeof n ? n = !1 : "undefined" == typeof i && (i = 25);
        var o = e.split(":")
          , r = parseInt(o[0], 10)
          , a = parseInt(o[1], 10)
          , s = parseInt(o[2], 10)
          , u = 0
          , l = 0;
        return n && (u = parseInt(o[3]) / i),
        l = 3600 * r + 60 * a + s + u
    },
    convertSMPTEtoSeconds: function(e) {
        if ("string" != typeof e)
            return !1;
        e = e.replace(",", ".");
        var t = 0
          , n = e.indexOf(".") != -1 ? e.split(".")[1].length : 0
          , i = 1;
        e = e.split(":").reverse();
        for (var o = 0; o < e.length; o++)
            i = 1,
            o > 0 && (i = Math.pow(60, o)),
            t += Number(e[o]) * i;
        return Number(t.toFixed(n))
    },
    removeSwf: function(e) {
        var t = document.getElementById(e);
        t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none",
        function() {
            4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    },
    removeObjectInIE: function(e) {
        var t = document.getElementById(e);
        if (t) {
            for (var n in t)
                "function" == typeof t[n] && (t[n] = null );
            t.parentNode.removeChild(t)
        }
    }
},
mejs.PluginDetector = {
    hasPluginVersion: function(e, t) {
        var n = this.plugins[e];
        return t[1] = t[1] || 0,
        t[2] = t[2] || 0,
        n[0] > t[0] || n[0] == t[0] && n[1] > t[1] || n[0] == t[0] && n[1] == t[1] && n[2] >= t[2]
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(e, t, n, i, o) {
        this.plugins[e] = this.detectPlugin(t, n, i, o)
    },
    detectPlugin: function(e, t, n, i) {
        var o, r, a, s = [0, 0, 0];
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
            if (o = this.nav.plugins[e].description,
            o && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                for (s = o.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."),
                r = 0; r < s.length; r++)
                    s[r] = parseInt(s[r].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject)
            try {
                a = new ActiveXObject(n),
                a && (s = i(a))
            } catch (e) {}
        return s
    }
},
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
    var t = []
      , n = e.GetVariable("$version");
    return n && (n = n.split(" ")[1].split(","),
    t = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)]),
    t
}),
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
    var t = [0, 0, 0, 0]
      , n = function(e, t, n, i) {
        for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]); )
            t[n] += i;
        t[n] -= i
    };
    return n(e, t, 0, 1),
    n(e, t, 1, 1),
    n(e, t, 2, 1e4),
    n(e, t, 2, 1e3),
    n(e, t, 2, 100),
    n(e, t, 2, 10),
    n(e, t, 2, 1),
    n(e, t, 3, 1),
    t
}),
mejs.MediaFeatures = {
    init: function() {
        var e, t, n = this, i = document, o = mejs.PluginDetector.nav, r = mejs.PluginDetector.ua.toLowerCase(), a = ["source", "track", "audio", "video"];
        n.isiPad = null !== r.match(/ipad/i),
        n.isiPhone = null !== r.match(/iphone/i),
        n.isiOS = n.isiPhone || n.isiPad,
        n.isAndroid = null !== r.match(/android/i),
        n.isBustedAndroid = null !== r.match(/android 2\.[12]/),
        n.isBustedNativeHTTPS = "https:" === location.protocol && (null !== r.match(/android [12]\./) || null !== r.match(/macintosh.* version.* safari/)),
        n.isIE = o.appName.toLowerCase().indexOf("microsoft") != -1 || null !== o.appName.toLowerCase().match(/trident/gi),
        n.isChrome = null !== r.match(/chrome/gi),
        n.isChromium = null !== r.match(/chromium/gi),
        n.isFirefox = null !== r.match(/firefox/gi),
        n.isWebkit = null !== r.match(/webkit/gi),
        n.isGecko = null !== r.match(/gecko/gi) && !n.isWebkit && !n.isIE,
        n.isOpera = null !== r.match(/opera/gi),
        n.hasTouch = "ontouchstart"in window,
        n.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (e = 0; e < a.length; e++)
            t = document.createElement(a[e]);
        n.supportsMediaTag = "undefined" != typeof t.canPlayType || n.isBustedAndroid;
        try {
            t.canPlayType("video/mp4")
        } catch (e) {
            n.supportsMediaTag = !1
        }
        n.hasSemiNativeFullScreen = "undefined" != typeof t.webkitEnterFullscreen,
        n.hasNativeFullscreen = "undefined" != typeof t.requestFullscreen,
        n.hasWebkitNativeFullScreen = "undefined" != typeof t.webkitRequestFullScreen,
        n.hasMozNativeFullScreen = "undefined" != typeof t.mozRequestFullScreen,
        n.hasMsNativeFullScreen = "undefined" != typeof t.msRequestFullscreen,
        n.hasTrueNativeFullScreen = n.hasWebkitNativeFullScreen || n.hasMozNativeFullScreen || n.hasMsNativeFullScreen,
        n.nativeFullScreenEnabled = n.hasTrueNativeFullScreen,
        n.hasMozNativeFullScreen ? n.nativeFullScreenEnabled = document.mozFullScreenEnabled : n.hasMsNativeFullScreen && (n.nativeFullScreenEnabled = document.msFullscreenEnabled),
        n.isChrome && (n.hasSemiNativeFullScreen = !1),
        n.hasTrueNativeFullScreen && (n.fullScreenEventName = "",
        n.hasWebkitNativeFullScreen ? n.fullScreenEventName = "webkitfullscreenchange" : n.hasMozNativeFullScreen ? n.fullScreenEventName = "mozfullscreenchange" : n.hasMsNativeFullScreen && (n.fullScreenEventName = "MSFullscreenChange"),
        n.isFullScreen = function() {
            return n.hasMozNativeFullScreen ? i.mozFullScreen : n.hasWebkitNativeFullScreen ? i.webkitIsFullScreen : n.hasMsNativeFullScreen ? null !== i.msFullscreenElement : void 0
        }
        ,
        n.requestFullScreen = function(e) {
            n.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : n.hasMozNativeFullScreen ? e.mozRequestFullScreen() : n.hasMsNativeFullScreen && e.msRequestFullscreen()
        }
        ,
        n.cancelFullScreen = function() {
            n.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : n.hasMozNativeFullScreen ? document.mozCancelFullScreen() : n.hasMsNativeFullScreen && document.msExitFullscreen()
        }
        ),
        n.hasSemiNativeFullScreen && r.match(/mac os x 10_5/i) && (n.hasNativeFullScreen = !1,
        n.hasSemiNativeFullScreen = !1)
    }
},
mejs.MediaFeatures.init(),
mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function(e) {
        this.currentTime = e
    },
    setMuted: function(e) {
        this.muted = e
    },
    setVolume: function(e) {
        this.volume = e
    },
    stop: function() {
        this.pause()
    },
    setSrc: function(e) {
        for (var t = this.getElementsByTagName("source"); t.length > 0; )
            this.removeChild(t[0]);
        if ("string" == typeof e)
            this.src = e;
        else {
            var n, i;
            for (n = 0; n < e.length; n++)
                if (i = e[n],
                this.canPlayType(i.type)) {
                    this.src = i.src;
                    break
                }
        }
    },
    setVideoSize: function(e, t) {
        this.width = e,
        this.height = t
    }
},
mejs.PluginMediaElement = function(e, t, n) {
    this.id = e,
    this.pluginType = t,
    this.src = n,
    this.events = {},
    this.attributes = {}
}
,
mejs.PluginMediaElement.prototype = {
    pluginElement: null ,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null ,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(),
        this.paused = !1)
    },
    load: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(),
        this.paused = !1)
    },
    pause: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(),
        this.paused = !0)
    },
    stop: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(),
        this.paused = !0)
    },
    canPlayType: function(e) {
        var t, n, i, o = mejs.plugins[this.pluginType];
        for (t = 0; t < o.length; t++)
            if (i = o[t],
            mejs.PluginDetector.hasPluginVersion(this.pluginType, i.version))
                for (n = 0; n < i.types.length; n++)
                    if (e == i.types[n])
                        return "probably";
        return ""
    },
    positionFullscreenButton: function(e, t, n) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), n)
    },
    hideFullscreenButton: function() {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function(e) {
        if ("string" == typeof e)
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)),
            this.src = mejs.Utility.absolutizeUrl(e);
        else {
            var t, n;
            for (t = 0; t < e.length; t++)
                if (n = e[t],
                this.canPlayType(n.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(n.src)),
                    this.src = mejs.Utility.absolutizeUrl(e);
                    break
                }
        }
    },
    setCurrentTime: function(e) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e),
        this.currentTime = e)
    },
    setVolume: function(e) {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.setVolume(100 * e) : this.pluginApi.setVolume(e),
        this.volume = e)
    },
    setMuted: function(e) {
        null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(),
        this.muted = e,
        this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(e),
        this.muted = e)
    },
    setVideoSize: function(e, t) {
        this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = e + "px",
        this.pluginElement.style.height = t + "px"),
        null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
    },
    setFullscreen: function(e) {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
    },
    enterFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function(e, t) {
        this.events[e] = this.events[e] || [],
        this.events[e].push(t)
    },
    removeEventListener: function(e, t) {
        if (!e)
            return this.events = {},
            !0;
        var n = this.events[e];
        if (!n)
            return !0;
        if (!t)
            return this.events[e] = [],
            !0;
        for (var i = 0; i < n.length; i++)
            if (n[i] === t)
                return this.events[e].splice(i, 1),
                !0;
        return !1
    },
    dispatchEvent: function(e) {
        var t, n, i = this.events[e];
        if (i)
            for (n = Array.prototype.slice.call(arguments, 1),
            t = 0; t < i.length; t++)
                i[t].apply(null , n)
    },
    hasAttribute: function(e) {
        return e in this.attributes
    },
    removeAttribute: function(e) {
        delete this.attributes[e]
    },
    getAttribute: function(e) {
        return this.hasAttribute(e) ? this.attributes[e] : ""
    },
    setAttribute: function(e, t) {
        this.attributes[e] = t
    },
    remove: function() {
        mejs.Utility.removeSwf(this.pluginElement.id),
        mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
},
mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function(e, t, n) {
        this.pluginMediaElements[e] = t,
        this.htmlMediaElements[e] = n
    },
    unregisterPluginElement: function(e) {
        delete this.pluginMediaElements[e],
        delete this.htmlMediaElements[e]
    },
    initPlugin: function(e) {
        var t = this.pluginMediaElements[e]
          , n = this.htmlMediaElements[e];
        if (t) {
            switch (t.pluginType) {
            case "flash":
                t.pluginElement = t.pluginApi = document.getElementById(e);
                break;
            case "silverlight":
                t.pluginElement = document.getElementById(t.id),
                t.pluginApi = t.pluginElement.Content.MediaElementJS
            }
            null != t.pluginApi && t.success && t.success(t, n)
        }
    },
    fireEvent: function(e, t, n) {
        var i, o, r, a = this.pluginMediaElements[e];
        if (a) {
            i = {
                type: t,
                target: a
            };
            for (o in n)
                a[o] = n[o],
                i[o] = n[o];
            r = n.bufferedTime || 0,
            i.target.buffered = i.buffered = {
                start: function() {
                    return 0
                },
                end: function() {
                    return r
                },
                length: 1
            },
            a.dispatchEvent(i.type, i)
        }
    }
},
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: .8,
    success: function() {},
    error: function() {}
},
mejs.MediaElement = function(e, t) {
    return mejs.HtmlMediaElementShim.create(e, t)
}
,
mejs.HtmlMediaElementShim = {
    create: function(e, t) {
        var n, i, o = mejs.MediaElementDefaults, r = "string" == typeof e ? document.getElementById(e) : e, a = r.tagName.toLowerCase(), s = "audio" === a || "video" === a, u = s ? r.getAttribute("src") : r.getAttribute("href"), l = r.getAttribute("poster"), c = r.getAttribute("autoplay"), d = r.getAttribute("preload"), h = r.getAttribute("controls");
        for (i in t)
            o[i] = t[i];
        return u = "undefined" == typeof u || null === u || "" == u ? null : u,
        l = "undefined" == typeof l || null === l ? "" : l,
        d = "undefined" == typeof d || null === d || "false" === d ? "none" : d,
        c = !("undefined" == typeof c || null === c || "false" === c),
        h = !("undefined" == typeof h || null === h || "false" === h),
        n = this.determinePlayback(r, o, mejs.MediaFeatures.supportsMediaTag, s, u),
        n.url = null !== n.url ? mejs.Utility.absolutizeUrl(n.url) : "",
        "native" == n.method ? (mejs.MediaFeatures.isBustedAndroid && (r.src = n.url,
        r.addEventListener("click", function() {
            r.play()
        }, !1)),
        this.updateNative(n, o, c, d)) : "" !== n.method ? this.createPlugin(n, o, l, c, d, h) : (this.createErrorMessage(n, o, l),
        this)
    },
    determinePlayback: function(e, t, n, i, o) {
        var r, a, s, u, l, c, d, h, f, p, m, g = [], v = {
            method: "",
            url: "",
            htmlMediaElement: e,
            isVideo: "audio" != e.tagName.toLowerCase()
        };
        if ("undefined" != typeof t.type && "" !== t.type)
            if ("string" == typeof t.type)
                g.push({
                    type: t.type,
                    url: o
                });
            else
                for (r = 0; r < t.type.length; r++)
                    g.push({
                        type: t.type[r],
                        url: o
                    });
        else if (null !== o)
            c = this.formatType(o, e.getAttribute("type")),
            g.push({
                type: c,
                url: o
            });
        else
            for (r = 0; r < e.childNodes.length; r++)
                l = e.childNodes[r],
                1 == l.nodeType && "source" == l.tagName.toLowerCase() && (o = l.getAttribute("src"),
                c = this.formatType(o, l.getAttribute("type")),
                m = l.getAttribute("media"),
                (!m || !window.matchMedia || window.matchMedia && window.matchMedia(m).matches) && g.push({
                    type: c,
                    url: o
                }));
        if (!i && g.length > 0 && null !== g[0].url && this.getTypeFromFile(g[0].url).indexOf("audio") > -1 && (v.isVideo = !1),
        mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function(e) {
            return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
        }
        ),
        mejs.MediaFeatures.isChromium && (e.canPlayType = function(e) {
            return null !== e.match(/video\/(webm|ogv|ogg)/gi) ? "maybe" : ""
        }
        ),
        n && ("auto" === t.mode || "auto_plugin" === t.mode || "native" === t.mode) && (!mejs.MediaFeatures.isBustedNativeHTTPS || t.httpsBasicAuthSite !== !0)) {
            for (i || (p = document.createElement(v.isVideo ? "video" : "audio"),
            e.parentNode.insertBefore(p, e),
            e.style.display = "none",
            v.htmlMediaElement = e = p),
            r = 0; r < g.length; r++)
                if ("video/m3u8" == g[r].type || "" !== e.canPlayType(g[r].type).replace(/no/, "") || "" !== e.canPlayType(g[r].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== e.canPlayType(g[r].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                    v.method = "native",
                    v.url = g[r].url;
                    break
                }
            if ("native" === v.method && (null !== v.url && (e.src = v.url),
            "auto_plugin" !== t.mode))
                return v
        }
        if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
            for (r = 0; r < g.length; r++)
                for (c = g[r].type,
                a = 0; a < t.plugins.length; a++)
                    for (d = t.plugins[a],
                    h = mejs.plugins[d],
                    s = 0; s < h.length; s++)
                        if (f = h[s],
                        null == f.version || mejs.PluginDetector.hasPluginVersion(d, f.version))
                            for (u = 0; u < f.types.length; u++)
                                if (c == f.types[u])
                                    return v.method = d,
                                    v.url = g[r].url,
                                    v;
        return "auto_plugin" === t.mode && "native" === v.method ? v : ("" === v.method && g.length > 0 && (v.url = g[0].url),
        v)
    },
    formatType: function(e, t) {
        return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
    },
    getTypeFromFile: function(e) {
        e = e.split("?")[0];
        var t = e.substring(e.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t) ? "video" : "audio") + "/" + this.getTypeFromExtension(t)
    },
    getTypeFromExtension: function(e) {
        switch (e) {
        case "mp4":
        case "m4v":
        case "m4a":
            return "mp4";
        case "webm":
        case "webma":
        case "webmv":
            return "webm";
        case "ogg":
        case "oga":
        case "ogv":
            return "ogg";
        default:
            return e
        }
    },
    createErrorMessage: function(e, t, n) {
        var i = e.htmlMediaElement
          , o = document.createElement("div");
        o.className = "me-cannotplay";
        try {
            o.style.width = i.width + "px",
            o.style.height = i.height + "px"
        } catch (e) {}
        t.customError ? o.innerHTML = t.customError : o.innerHTML = "" !== n ? '<a href="' + e.url + '"><img src="' + n + '" width="100%" height="100%" /></a>' : '<a href="' + e.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>",
        i.parentNode.insertBefore(o, i),
        i.style.display = "none",
        t.error(i)
    },
    createPlugin: function(e, t, n, i, o, r) {
        var a, s, u, l = e.htmlMediaElement, c = 1, d = 1, h = "me_" + e.method + "_" + mejs.meIndex++, f = new mejs.PluginMediaElement(h,e.method,e.url), p = document.createElement("div");
        f.tagName = l.tagName;
        for (var m = 0; m < l.attributes.length; m++) {
            var g = l.attributes[m];
            1 == g.specified && f.setAttribute(g.name, g.value)
        }
        for (s = l.parentNode; null !== s && "body" !== s.tagName.toLowerCase() && null != s.parentNode; ) {
            if ("p" === s.parentNode.tagName.toLowerCase()) {
                s.parentNode.parentNode.insertBefore(s, s.parentNode);
                break
            }
            s = s.parentNode
        }
        switch (e.isVideo ? (c = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== l.getAttribute("width") ? l.getAttribute("width") : t.defaultVideoWidth,
        d = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== l.getAttribute("height") ? l.getAttribute("height") : t.defaultVideoHeight,
        c = mejs.Utility.encodeUrl(c),
        d = mejs.Utility.encodeUrl(d)) : t.enablePluginDebug && (c = 320,
        d = 240),
        f.success = t.success,
        mejs.MediaPluginBridge.registerPluginElement(h, f, l),
        p.className = "me-plugin",
        p.id = h + "_container",
        e.isVideo ? l.parentNode.insertBefore(p, l) : document.body.insertBefore(p, document.body.childNodes[0]),
        u = ["id=" + h, "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (i ? "true" : "false"), "preload=" + o, "width=" + c, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + d, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam],
        null !== e.url && ("flash" == e.method ? u.push("file=" + mejs.Utility.encodeUrl(e.url)) : u.push("file=" + e.url)),
        t.enablePluginDebug && u.push("debug=true"),
        t.enablePluginSmoothing && u.push("smoothing=true"),
        t.enablePseudoStreaming && u.push("pseudostreaming=true"),
        r && u.push("controls=true"),
        t.pluginVars && (u = u.concat(t.pluginVars)),
        e.method) {
        case "silverlight":
            p.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + h + '" name="' + h + '" width="' + c + '" height="' + d + '" class="mejs-shim"><param name="initParams" value="' + u.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
            break;
        case "flash":
            mejs.MediaFeatures.isIE ? (a = document.createElement("div"),
            p.appendChild(a),
            a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + h + '" width="' + c + '" height="' + d + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + u.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : p.innerHTML = '<embed id="' + h + '" name="' + h + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + u.join("&") + '" width="' + c + '" height="' + d + '" scale="default"class="mejs-shim"></embed>';
            break;
        case "youtube":
            var v;
            e.url.lastIndexOf("youtu.be") != -1 ? (v = e.url.substr(e.url.lastIndexOf("/") + 1),
            v.indexOf("?") != -1 && (v = v.substr(0, v.indexOf("?")))) : v = e.url.substr(e.url.lastIndexOf("=") + 1),
            youtubeSettings = {
                container: p,
                containerId: p.id,
                pluginMediaElement: f,
                pluginId: h,
                videoId: v,
                height: d,
                width: c
            },
            mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
            break;
        case "vimeo":
            var y = h + "_player";
            if (f.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1),
            p.innerHTML = '<iframe src="//player.vimeo.com/video/' + f.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + y + '" width="' + c + '" height="' + d + '" frameborder="0" class="mejs-shim" id="' + y + '"></iframe>',
            "function" == typeof $f) {
                var b = $f(p.childNodes[0]);
                b.addEvent("ready", function() {
                    function e(e, t, n, i) {
                        var o = {
                            type: n,
                            target: t
                        };
                        "timeupdate" == n && (t.currentTime = o.currentTime = i.seconds,
                        t.duration = o.duration = i.duration),
                        t.dispatchEvent(o.type, o)
                    }
                    $.extend(b, {
                        playVideo: function() {
                            b.api("play")
                        },
                        stopVideo: function() {
                            b.api("unload")
                        },
                        pauseVideo: function() {
                            b.api("pause")
                        },
                        seekTo: function(e) {
                            b.api("seekTo", e)
                        },
                        setVolume: function(e) {
                            b.api("setVolume", e)
                        },
                        setMuted: function(e) {
                            e ? (b.lastVolume = b.api("getVolume"),
                            b.api("setVolume", 0)) : (b.api("setVolume", b.lastVolume),
                            delete b.lastVolume)
                        }
                    }),
                    b.addEvent("play", function() {
                        e(b, f, "play"),
                        e(b, f, "playing")
                    }),
                    b.addEvent("pause", function() {
                        e(b, f, "pause")
                    }),
                    b.addEvent("finish", function() {
                        e(b, f, "ended")
                    }),
                    b.addEvent("playProgress", function(t) {
                        e(b, f, "timeupdate", t)
                    }),
                    f.pluginElement = p,
                    f.pluginApi = b,
                    mejs.MediaPluginBridge.initPlugin(h)
                })
            } else
                console.warn("You need to include froogaloop for vimeo to work")
        }
        return l.style.display = "none",
        l.removeAttribute("autoplay"),
        f
    },
    updateNative: function(e, t) {
        var n, i = e.htmlMediaElement;
        for (n in mejs.HtmlMediaElement)
            i[n] = mejs.HtmlMediaElement[n];
        return t.success(i, i),
        i
    }
},
mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function() {
        if (!this.isIframeStarted) {
            var e = document.createElement("script");
            e.src = "//www.youtube.com/player_api";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t),
            this.isIframeStarted = !0
        }
    },
    iframeQueue: [],
    enqueueIframe: function(e) {
        this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(),
        this.iframeQueue.push(e))
    },
    createIframe: function(e) {
        var t = e.pluginMediaElement
          , n = new YT.Player(e.containerId,{
            height: e.height,
            width: e.width,
            videoId: e.videoId,
            playerVars: {
                controls: 0
            },
            events: {
                onReady: function() {
                    e.pluginMediaElement.pluginApi = n,
                    mejs.MediaPluginBridge.initPlugin(e.pluginId),
                    setInterval(function() {
                        mejs.YouTubeApi.createEvent(n, t, "timeupdate")
                    }, 250)
                },
                onStateChange: function(e) {
                    mejs.YouTubeApi.handleStateChange(e.data, n, t)
                }
            }
        })
    },
    createEvent: function(e, t, n) {
        var i = {
            type: n,
            target: t
        };
        if (e && e.getDuration) {
            t.currentTime = i.currentTime = e.getCurrentTime(),
            t.duration = i.duration = e.getDuration(),
            i.paused = t.paused,
            i.ended = t.ended,
            i.muted = e.isMuted(),
            i.volume = e.getVolume() / 100,
            i.bytesTotal = e.getVideoBytesTotal(),
            i.bufferedBytes = e.getVideoBytesLoaded();
            var o = i.bufferedBytes / i.bytesTotal * i.duration;
            i.target.buffered = i.buffered = {
                start: function() {
                    return 0
                },
                end: function() {
                    return o
                },
                length: 1
            }
        }
        t.dispatchEvent(i.type, i)
    },
    iFrameReady: function() {
        for (this.isLoaded = !0,
        this.isIframeLoaded = !0; this.iframeQueue.length > 0; ) {
            var e = this.iframeQueue.pop();
            this.createIframe(e)
        }
    },
    flashPlayers: {},
    createFlash: function(e) {
        this.flashPlayers[e.pluginId] = e;
        var t, n = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (t = document.createElement("div"),
        e.container.appendChild(t),
        t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + n + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + n + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    },
    flashReady: function(e) {
        var t = this.flashPlayers[e]
          , n = document.getElementById(e)
          , i = t.pluginMediaElement;
        i.pluginApi = i.pluginElement = n,
        mejs.MediaPluginBridge.initPlugin(e),
        n.cueVideoById(t.videoId);
        var o = t.containerId + "_callback";
        window[o] = function(e) {
            mejs.YouTubeApi.handleStateChange(e, n, i)
        }
        ,
        n.addEventListener("onStateChange", o),
        setInterval(function() {
            mejs.YouTubeApi.createEvent(n, i, "timeupdate")
        }, 250),
        mejs.YouTubeApi.createEvent(n, i, "canplay")
    },
    handleStateChange: function(e, t, n) {
        switch (e) {
        case -1:
            n.paused = !0,
            n.ended = !0,
            mejs.YouTubeApi.createEvent(t, n, "loadedmetadata");
            break;
        case 0:
            n.paused = !1,
            n.ended = !0,
            mejs.YouTubeApi.createEvent(t, n, "ended");
            break;
        case 1:
            n.paused = !1,
            n.ended = !1,
            mejs.YouTubeApi.createEvent(t, n, "play"),
            mejs.YouTubeApi.createEvent(t, n, "playing");
            break;
        case 2:
            n.paused = !0,
            n.ended = !1,
            mejs.YouTubeApi.createEvent(t, n, "pause");
            break;
        case 3:
            mejs.YouTubeApi.createEvent(t, n, "progress");
            break;
        case 5:
        }
    }
},
window.mejs = mejs,
window.MediaElement = mejs.MediaElement,
function(e, t) {
    "use strict";
    var n = {
        locale: {
            language: "",
            strings: {}
        },
        methods: {}
    };
    n.getLanguage = function() {
        var e = n.locale.language || window.navigator.userLanguage || window.navigator.language;
        return e.substr(0, 2).toLowerCase()
    }
    ,
    "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language),
    n.methods.checkPlain = function(e) {
        var t, n, i = {
            "&": "&amp;",
            '"': "&quot;",
            "<": "&lt;",
            ">": "&gt;"
        };
        e = String(e);
        for (t in i)
            i.hasOwnProperty(t) && (n = new RegExp(t,"g"),
            e = e.replace(n, i[t]));
        return e
    }
    ,
    n.methods.t = function(e, t) {
        return n.locale.strings && n.locale.strings[t.context] && n.locale.strings[t.context][e] && (e = n.locale.strings[t.context][e]),
        n.methods.checkPlain(e)
    }
    ,
    n.t = function(e, t) {
        if ("string" == typeof e && e.length > 0) {
            var i = n.getLanguage();
            return t = t || {
                context: i
            },
            n.methods.t(e, t)
        }
        throw {
            name: "InvalidArgumentException",
            message: "First argument is either not a string or empty."
        }
    }
    ,
    t.i18n = n
}(document, mejs),
function(e) {
    "use strict";
    "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
}(mejs.i18n.locale.strings),
function(e) {
    "use strict";
    "undefined" == typeof e.de && (e.de = {
        Fullscreen: "Vollbild",
        "Go Fullscreen": "Vollbild an",
        "Turn off Fullscreen": "Vollbild aus",
        Close: "Schlie\xdfen"
    })
}(mejs.i18n.locale.strings),
function(e) {
    "use strict";
    "undefined" == typeof e.zh && (e.zh = {
        Fullscreen: "\u5168\u87a2\u5e55",
        "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
        "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
        Close: "\u95dc\u9589"
    })
}(mejs.i18n.locale.strings),
"undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof ender && (mejs.$ = ender),
function(e) {
    mejs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: !1,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function(e) {
            return .05 * e.duration
        },
        defaultSeekForwardInterval: function(e) {
            return .05 * e.duration
        },
        setDimensions: !0,
        audioWidth: -1,
        audioHeight: -1,
        startVolume: .8,
        loop: !1,
        autoRewind: !0,
        enableAutosize: !0,
        alwaysShowHours: !1,
        showTimecodeFrameCount: !1,
        framesPerSecond: 25,
        autosizeProgress: !0,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        clickToPlayPause: !0,
        iPadUseNativeControls: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: !0,
        enableKeyboard: !0,
        pauseOtherPlayers: !0,
        keyActions: [{
            keys: [32, 179],
            action: function(e, t) {
                t.paused || t.ended ? e.play() : e.pause()
            }
        }, {
            keys: [38],
            action: function(e, t) {
                e.container.find(".mejs-volume-slider").css("display", "block"),
                e.isVideo && (e.showControls(),
                e.startControlsTimer());
                var n = Math.min(t.volume + .1, 1);
                t.setVolume(n)
            }
        }, {
            keys: [40],
            action: function(e, t) {
                e.container.find(".mejs-volume-slider").css("display", "block"),
                e.isVideo && (e.showControls(),
                e.startControlsTimer());
                var n = Math.max(t.volume - .1, 0);
                t.setVolume(n)
            }
        }, {
            keys: [37, 227],
            action: function(e, t) {
                if (!isNaN(t.duration) && t.duration > 0) {
                    e.isVideo && (e.showControls(),
                    e.startControlsTimer());
                    var n = Math.max(t.currentTime - e.options.defaultSeekBackwardInterval(t), 0);
                    t.setCurrentTime(n)
                }
            }
        }, {
            keys: [39, 228],
            action: function(e, t) {
                if (!isNaN(t.duration) && t.duration > 0) {
                    e.isVideo && (e.showControls(),
                    e.startControlsTimer());
                    var n = Math.min(t.currentTime + e.options.defaultSeekForwardInterval(t), t.duration);
                    t.setCurrentTime(n)
                }
            }
        }, {
            keys: [70],
            action: function(e) {
                "undefined" != typeof e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
            }
        }, {
            keys: [77],
            action: function(e) {
                e.container.find(".mejs-volume-slider").css("display", "block"),
                e.isVideo && (e.showControls(),
                e.startControlsTimer()),
                e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
            }
        }]
    },
    mejs.mepIndex = 0,
    mejs.players = {},
    mejs.MediaElementPlayer = function(t, n) {
        if (!(this instanceof mejs.MediaElementPlayer))
            return new mejs.MediaElementPlayer(t,n);
        var i = this;
        return i.$media = i.$node = e(t),
        i.node = i.media = i.$media[0],
        "undefined" != typeof i.node.player ? i.node.player : (i.node.player = i,
        "undefined" == typeof n && (n = i.$node.data("mejsoptions")),
        i.options = e.extend({}, mejs.MepDefaults, n),
        i.id = "mep_" + mejs.mepIndex++,
        mejs.players[i.id] = i,
        i.init(),
        i)
    }
    ,
    mejs.MediaElementPlayer.prototype = {
        hasFocus: !1,
        controlsAreVisible: !0,
        init: function() {
            var t = this
              , n = mejs.MediaFeatures
              , i = e.extend(!0, {}, t.options, {
                success: function(e, n) {
                    t.meReady(e, n)
                },
                error: function(e) {
                    t.handleError(e)
                }
            })
              , o = t.media.tagName.toLowerCase();
            if (t.isDynamic = "audio" !== o && "video" !== o,
            t.isDynamic ? t.isVideo = t.options.isVideo : t.isVideo = "audio" !== o && t.options.isVideo,
            n.isiPad && t.options.iPadUseNativeControls || n.isiPhone && t.options.iPhoneUseNativeControls)
                t.$media.attr("controls", "controls"),
                n.isiPad && null !== t.media.getAttribute("autoplay") && t.play();
            else if (n.isAndroid && t.options.AndroidUseNativeControls)
                ;
            else {
                if (t.$media.removeAttr("controls"),
                t.container = e('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media),
                t.container.addClass((n.isAndroid ? "mejs-android " : "") + (n.isiOS ? "mejs-ios " : "") + (n.isiPad ? "mejs-ipad " : "") + (n.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio ")),
                n.isiOS) {
                    var r = t.$media.clone();
                    t.container.find(".mejs-mediaelement").append(r),
                    t.$media.remove(),
                    t.$node = t.$media = r,
                    t.node = t.media = r[0]
                } else
                    t.container.find(".mejs-mediaelement").append(t.$media);
                t.controls = t.container.find(".mejs-controls"),
                t.layers = t.container.find(".mejs-layers");
                var a = t.isVideo ? "video" : "audio"
                  , s = a.substring(0, 1).toUpperCase() + a.substring(1);
                t.options[a + "Width"] > 0 || t.options[a + "Width"].toString().indexOf("%") > -1 ? t.width = t.options[a + "Width"] : "" !== t.media.style.width && null !== t.media.style.width ? t.width = t.media.style.width : null !== t.media.getAttribute("width") ? t.width = t.$media.attr("width") : t.width = t.options["default" + s + "Width"],
                t.options[a + "Height"] > 0 || t.options[a + "Height"].toString().indexOf("%") > -1 ? t.height = t.options[a + "Height"] : "" !== t.media.style.height && null !== t.media.style.height ? t.height = t.media.style.height : null !== t.$media[0].getAttribute("height") ? t.height = t.$media.attr("height") : t.height = t.options["default" + s + "Height"],
                t.setPlayerSize(t.width, t.height),
                i.pluginWidth = t.width,
                i.pluginHeight = t.height
            }
            mejs.MediaElement(t.$media[0], i),
            "undefined" != typeof t.container && t.controlsAreVisible && t.container.trigger("controlsshown")
        },
        showControls: function(e) {
            var t = this;
            e = "undefined" == typeof e || e,
            t.controlsAreVisible || (e ? (t.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200, function() {
                t.controlsAreVisible = !0,
                t.container.trigger("controlsshown")
            }),
            t.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200, function() {
                t.controlsAreVisible = !0
            })) : (t.controls.css("visibility", "visible").css("display", "block"),
            t.container.find(".mejs-control").css("visibility", "visible").css("display", "block"),
            t.controlsAreVisible = !0,
            t.container.trigger("controlsshown")),
            t.setControlsSize())
        },
        hideControls: function(t) {
            var n = this;
            t = "undefined" == typeof t || t,
            n.controlsAreVisible && !n.options.alwaysShowControls && (t ? (n.controls.stop(!0, !0).fadeOut(200, function() {
                e(this).css("visibility", "hidden").css("display", "block"),
                n.controlsAreVisible = !1,
                n.container.trigger("controlshidden")
            }),
            n.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function() {
                e(this).css("visibility", "hidden").css("display", "block");
            })) : (n.controls.css("visibility", "hidden").css("display", "block"),
            n.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"),
            n.controlsAreVisible = !1,
            n.container.trigger("controlshidden")))
        },
        controlsTimer: null ,
        startControlsTimer: function(e) {
            var t = this;
            e = "undefined" != typeof e ? e : 1500,
            t.killControlsTimer("start"),
            t.controlsTimer = setTimeout(function() {
                t.hideControls(),
                t.killControlsTimer("hide")
            }, e)
        },
        killControlsTimer: function() {
            var e = this;
            null !== e.controlsTimer && (clearTimeout(e.controlsTimer),
            delete e.controlsTimer,
            e.controlsTimer = null )
        },
        controlsEnabled: !0,
        disableControls: function() {
            var e = this;
            e.killControlsTimer(),
            e.hideControls(!1),
            this.controlsEnabled = !1
        },
        enableControls: function() {
            var e = this;
            e.showControls(!1),
            e.controlsEnabled = !0
        },
        meReady: function(e, t) {
            var n, i, o = this, r = mejs.MediaFeatures, a = t.getAttribute("autoplay"), s = !("undefined" == typeof a || null === a || "false" === a);
            if (!o.created) {
                if (o.created = !0,
                o.media = e,
                o.domNode = t,
                !(r.isAndroid && o.options.AndroidUseNativeControls || r.isiPad && o.options.iPadUseNativeControls || r.isiPhone && o.options.iPhoneUseNativeControls)) {
                    o.buildposter(o, o.controls, o.layers, o.media),
                    o.buildkeyboard(o, o.controls, o.layers, o.media),
                    o.buildoverlays(o, o.controls, o.layers, o.media),
                    o.findTracks();
                    for (n in o.options.features)
                        if (i = o.options.features[n],
                        o["build" + i])
                            try {
                                o["build" + i](o, o.controls, o.layers, o.media)
                            } catch (e) {}
                    o.container.trigger("controlsready"),
                    o.setPlayerSize(o.width, o.height),
                    o.setControlsSize(),
                    o.isVideo && (mejs.MediaFeatures.hasTouch ? o.$media.bind("touchstart", function() {
                        o.controlsAreVisible ? o.hideControls(!1) : o.controlsEnabled && o.showControls(!1)
                    }) : (o.clickToPlayPauseCallback = function() {
                        o.options.clickToPlayPause && (o.media.paused ? o.play() : o.pause())
                    }
                    ,
                    o.media.addEventListener("click", o.clickToPlayPauseCallback, !1),
                    o.container.bind("mouseenter mouseover", function() {
                        o.controlsEnabled && (o.options.alwaysShowControls || (o.killControlsTimer("enter"),
                        o.showControls(),
                        o.startControlsTimer(2500)))
                    }).bind("mousemove", function() {
                        o.controlsEnabled && (o.controlsAreVisible || o.showControls(),
                        o.options.alwaysShowControls || o.startControlsTimer(2500))
                    }).bind("mouseleave", function() {
                        o.controlsEnabled && (o.media.paused || o.options.alwaysShowControls || o.startControlsTimer(1e3))
                    })),
                    o.options.hideVideoControlsOnLoad && o.hideControls(!1),
                    s && !o.options.alwaysShowControls && o.hideControls(),
                    o.options.enableAutosize && o.media.addEventListener("loadedmetadata", function(e) {
                        o.options.videoHeight <= 0 && null === o.domNode.getAttribute("height") && !isNaN(e.target.videoHeight) && (o.setPlayerSize(e.target.videoWidth, e.target.videoHeight),
                        o.setControlsSize(),
                        o.media.setVideoSize(e.target.videoWidth, e.target.videoHeight))
                    }, !1)),
                    e.addEventListener("play", function() {
                        var e;
                        for (e in mejs.players) {
                            var t = mejs.players[e];
                            t.id == o.id || !o.options.pauseOtherPlayers || t.paused || t.ended || t.pause(),
                            t.hasFocus = !1
                        }
                        o.hasFocus = !0
                    }, !1),
                    o.media.addEventListener("ended", function() {
                        if (o.options.autoRewind)
                            try {
                                o.media.setCurrentTime(0)
                            } catch (e) {}
                        o.media.pause(),
                        o.setProgressRail && o.setProgressRail(),
                        o.setCurrentRail && o.setCurrentRail(),
                        o.options.loop ? o.play() : !o.options.alwaysShowControls && o.controlsEnabled && o.showControls()
                    }, !1),
                    o.media.addEventListener("loadedmetadata", function() {
                        o.updateDuration && o.updateDuration(),
                        o.updateCurrent && o.updateCurrent(),
                        o.isFullScreen || (o.setPlayerSize(o.width, o.height),
                        o.setControlsSize())
                    }, !1),
                    setTimeout(function() {
                        o.setPlayerSize(o.width, o.height),
                        o.setControlsSize()
                    }, 50),
                    o.globalBind("resize", function() {
                        o.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || o.setPlayerSize(o.width, o.height),
                        o.setControlsSize()
                    }),
                    "youtube" == o.media.pluginType && o.options.autoplay && o.container.find(".mejs-overlay-play").hide()
                }
                s && "native" == e.pluginType && o.play(),
                o.options.success && ("string" == typeof o.options.success ? window[o.options.success](o.media, o.domNode, o) : o.options.success(o.media, o.domNode, o))
            }
        },
        handleError: function(e) {
            var t = this;
            t.controls.hide(),
            t.options.error && t.options.error(e)
        },
        setPlayerSize: function(t, n) {
            var i = this;
            if (!i.options.setDimensions)
                return !1;
            if ("undefined" != typeof t && (i.width = t),
            "undefined" != typeof n && (i.height = n),
            i.height.toString().indexOf("%") > 0 || "100%" === i.$node.css("max-width") || i.$node[0].currentStyle && "100%" === i.$node[0].currentStyle.maxWidth) {
                var o = function() {
                    return i.isVideo ? i.media.videoWidth && i.media.videoWidth > 0 ? i.media.videoWidth : null !== i.media.getAttribute("width") ? i.media.getAttribute("width") : i.options.defaultVideoWidth : i.options.defaultAudioWidth
                }()
                  , r = function() {
                    return i.isVideo ? i.media.videoHeight && i.media.videoHeight > 0 ? i.media.videoHeight : null !== i.media.getAttribute("height") ? i.media.getAttribute("height") : i.options.defaultVideoHeight : i.options.defaultAudioHeight
                }()
                  , a = i.container.parent().closest(":visible").width()
                  , s = i.container.parent().closest(":visible").height()
                  , u = i.isVideo || !i.options.autosizeProgress ? parseInt(a * r / o, 10) : r;
                (isNaN(u) || 0 != s && u > s) && (u = s),
                "body" === i.container.parent()[0].tagName.toLowerCase() && (a = e(window).width(),
                u = e(window).height()),
                0 != u && 0 != a && (i.container.width(a).height(u),
                i.$media.add(i.container.find(".mejs-shim")).width("100%").height("100%"),
                i.isVideo && i.media.setVideoSize && i.media.setVideoSize(a, u),
                i.layers.children(".mejs-layer").width("100%").height("100%"))
            } else
                i.container.width(i.width).height(i.height),
                i.layers.children(".mejs-layer").width(i.width).height(i.height);
            var l = i.layers.find(".mejs-overlay-play")
              , c = l.find(".mejs-overlay-button");
            l.height(i.container.height() - i.controls.height()),
            c.css("margin-top", "-" + (c.height() / 2 - i.controls.height() / 2).toString() + "px")
        },
        setControlsSize: function() {
            var t = this
              , n = 0
              , i = 0
              , o = t.controls.find(".mejs-time-rail")
              , r = t.controls.find(".mejs-time-total")
              , a = (t.controls.find(".mejs-time-current"),
            t.controls.find(".mejs-time-loaded"),
            t.controls.find(".mejs-time"))
              , s = o.siblings()
              , u = s.last()
              , l = null ;
            if (t.container.is(":visible") && o.length && o.is(":visible")) {
                t.options && !t.options.autosizeProgress && (i = parseInt(o.css("width"))),
                0 !== i && i || (s.each(function() {
                    var t = e(this);
                    "absolute" != t.css("position") && t.is(":visible") && (n += e(this).outerWidth(!0))
                }),
                i = t.controls.width() - n - (o.outerWidth(!0) - o.width()) - 1);
                do
                    o.width(i),
                    a.width(i),
                    r.width(i - (r.outerWidth(!0) - r.width())),
                    "absolute" != u.css("position") && (l = u.position(),
                    i--);
                while (null != l && l.top > 0 && i > 0);t.setProgressRail && t.setProgressRail(),
                t.setCurrentRail && t.setCurrentRail()
            }
        },
        buildposter: function(t, n, i, o) {
            var r = this
              , a = e('<div class="mejs-poster mejs-layer"></div>').appendTo(i)
              , s = t.$media.attr("poster");
            "" !== t.options.poster && (s = t.options.poster),
            "" !== s && null != s ? r.setPoster(s) : a.hide(),
            o.addEventListener("play", function() {
                a.hide()
            }, !1),
            t.options.showPosterWhenEnded && t.options.autoRewind && o.addEventListener("ended", function() {
                a.show()
            }, !1)
        },
        setPoster: function(t) {
            var n = this
              , i = n.container.find(".mejs-poster")
              , o = i.find("img");
            0 == o.length && (o = e('<img width="100%" height="100%" />').appendTo(i)),
            o.attr("src", t),
            i.css({
                "background-image": "url(" + t + ")"
            })
        },
        buildoverlays: function(t, n, i, o) {
            var r = this;
            if (t.isVideo) {
                var a = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(i)
                  , s = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(i)
                  , u = e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(i).bind("click", function() {
                    r.options.clickToPlayPause && o.paused && o.play()
                });
                o.addEventListener("play", function() {
                    u.hide(),
                    a.hide(),
                    n.find(".mejs-time-buffering").hide(),
                    s.hide()
                }, !1),
                o.addEventListener("playing", function() {
                    u.hide(),
                    a.hide(),
                    n.find(".mejs-time-buffering").hide(),
                    s.hide()
                }, !1),
                o.addEventListener("seeking", function() {
                    a.show(),
                    n.find(".mejs-time-buffering").show()
                }, !1),
                o.addEventListener("seeked", function() {
                    a.hide(),
                    n.find(".mejs-time-buffering").hide()
                }, !1),
                o.addEventListener("pause", function() {
                    mejs.MediaFeatures.isiPhone || u.show()
                }, !1),
                o.addEventListener("waiting", function() {
                    a.show(),
                    n.find(".mejs-time-buffering").show()
                }, !1),
                o.addEventListener("loadeddata", function() {
                    a.show(),
                    n.find(".mejs-time-buffering").show()
                }, !1),
                o.addEventListener("canplay", function() {
                    a.hide(),
                    n.find(".mejs-time-buffering").hide()
                }, !1),
                o.addEventListener("error", function() {
                    a.hide(),
                    n.find(".mejs-time-buffering").hide(),
                    s.show(),
                    s.find("mejs-overlay-error").html("Error loading this resource")
                }, !1),
                o.addEventListener("keydown", function(e) {
                    r.onkeydown(t, o, e)
                }, !1)
            }
        },
        buildkeyboard: function(t, n, i, o) {
            var r = this;
            r.globalBind("keydown", function(e) {
                return r.onkeydown(t, o, e)
            }),
            r.globalBind("click", function(n) {
                t.hasFocus = 0 != e(n.target).closest(".mejs-container").length
            })
        },
        onkeydown: function(e, t, n) {
            if (e.hasFocus && e.options.enableKeyboard)
                for (var i = 0, o = e.options.keyActions.length; i < o; i++)
                    for (var r = e.options.keyActions[i], a = 0, s = r.keys.length; a < s; a++)
                        if (n.keyCode == r.keys[a])
                            return "function" == typeof n.preventDefault && n.preventDefault(),
                            r.action(e, t, n.keyCode),
                            !1;
            return !0
        },
        findTracks: function() {
            var t = this
              , n = t.$media.find("track");
            t.tracks = [],
            n.each(function(n, i) {
                i = e(i),
                t.tracks.push({
                    srclang: i.attr("srclang") ? i.attr("srclang").toLowerCase() : "",
                    src: i.attr("src"),
                    kind: i.attr("kind"),
                    label: i.attr("label") || "",
                    entries: [],
                    isLoaded: !1
                })
            })
        },
        changeSkin: function(e) {
            this.container[0].className = "mejs-container " + e,
            this.setPlayerSize(this.width, this.height),
            this.setControlsSize()
        },
        play: function() {
            this.load(),
            this.media.play()
        },
        pause: function() {
            try {
                this.media.pause()
            } catch (e) {}
        },
        load: function() {
            this.isLoaded || this.media.load(),
            this.isLoaded = !0
        },
        setMuted: function(e) {
            this.media.setMuted(e)
        },
        setCurrentTime: function(e) {
            this.media.setCurrentTime(e)
        },
        getCurrentTime: function() {
            return this.media.currentTime
        },
        setVolume: function(e) {
            this.media.setVolume(e)
        },
        getVolume: function() {
            return this.media.volume
        },
        setSrc: function(e) {
            this.media.setSrc(e)
        },
        remove: function() {
            var e, t, n = this;
            for (e in n.options.features)
                if (t = n.options.features[e],
                n["clean" + t])
                    try {
                        n["clean" + t](n)
                    } catch (e) {}
            n.isDynamic ? n.$node.insertBefore(n.container) : (n.$media.prop("controls", !0),
            n.$node.clone().insertBefore(n.container).show(),
            n.$node.remove()),
            "native" !== n.media.pluginType && n.media.remove(),
            delete mejs.players[n.id],
            "object" == typeof n.container && n.container.remove(),
            n.globalUnbind(),
            delete n.node.player
        }
    },
    function() {
        function t(t, i) {
            var o = {
                d: [],
                w: []
            };
            return e.each((t || "").split(" "), function(e, t) {
                var r = t + "." + i;
                0 === r.indexOf(".") ? (o.d.push(r),
                o.w.push(r)) : o[n.test(t) ? "w" : "d"].push(r)
            }),
            o.d = o.d.join(" "),
            o.w = o.w.join(" "),
            o
        }
        var n = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind = function(n, i, o) {
            var r = this;
            n = t(n, r.id),
            n.d && e(document).bind(n.d, i, o),
            n.w && e(window).bind(n.w, i, o)
        }
        ,
        mejs.MediaElementPlayer.prototype.globalUnbind = function(n, i) {
            var o = this;
            n = t(n, o.id),
            n.d && e(document).unbind(n.d, i),
            n.w && e(window).unbind(n.w, i)
        }
    }(),
    "undefined" != typeof e && (e.fn.mediaelementplayer = function(t) {
        return t === !1 ? this.each(function() {
            var t = e(this).data("mediaelementplayer");
            t && t.remove(),
            e(this).removeData("mediaelementplayer")
        }) : this.each(function() {
            e(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this,t))
        }),
        this
    }
    ,
    e(document).ready(function() {
        e(".mejs-player").mediaelementplayer()
    })),
    window.MediaElementPlayer = mejs.MediaElementPlayer
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        playpauseText: mejs.i18n.t("Play/Pause")
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildplaypause: function(t, n, i, o) {
            var r = this
              , a = e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + r.id + '" title="' + r.options.playpauseText + '" aria-label="' + r.options.playpauseText + '"></button></div>').appendTo(n).click(function(e) {
                return e.preventDefault(),
                o.paused ? o.play() : o.pause(),
                !1
            });
            o.addEventListener("play", function() {
                a.removeClass("mejs-play").addClass("mejs-pause")
            }, !1),
            o.addEventListener("playing", function() {
                a.removeClass("mejs-play").addClass("mejs-pause")
            }, !1),
            o.addEventListener("pause", function() {
                a.removeClass("mejs-pause").addClass("mejs-play")
            }, !1),
            o.addEventListener("paused", function() {
                a.removeClass("mejs-pause").addClass("mejs-play")
            }, !1)
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        stopText: "Stop"
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildstop: function(t, n, i, o) {
            var r = this;
            e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + r.id + '" title="' + r.options.stopText + '" aria-label="' + r.options.stopText + '"></button></div>').appendTo(n).click(function() {
                o.paused || o.pause(),
                o.currentTime > 0 && (o.setCurrentTime(0),
                o.pause(),
                n.find(".mejs-time-current").width("0px"),
                n.find(".mejs-time-handle").css("left", "0px"),
                n.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0)),
                n.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0)),
                i.find(".mejs-poster").show())
            })
        }
    })
}(mejs.$),
function(e) {
    e.extend(MediaElementPlayer.prototype, {
        buildprogress: function(t, n, i, o) {
            e('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(n),
            n.find(".mejs-time-buffering").hide();
            var r = this
              , a = n.find(".mejs-time-total")
              , s = n.find(".mejs-time-loaded")
              , u = n.find(".mejs-time-current")
              , l = n.find(".mejs-time-handle")
              , c = n.find(".mejs-time-float")
              , d = n.find(".mejs-time-float-current")
              , h = function(e) {
                if (e.originalEvent.changedTouches)
                    var t = e.originalEvent.changedTouches[0].pageX;
                else
                    var t = e.pageX;
                var n = a.offset()
                  , i = a.outerWidth(!0)
                  , r = 0
                  , s = 0
                  , u = 0;
                o.duration && (t < n.left ? t = n.left : t > i + n.left && (t = i + n.left),
                u = t - n.left,
                r = u / i,
                s = r <= .02 ? 0 : r * o.duration,
                f && s !== o.currentTime && o.setCurrentTime(s),
                mejs.MediaFeatures.hasTouch || (c.css("left", u),
                d.html(mejs.Utility.secondsToTimeCode(s)),
                c.show()))
            }
              , f = !1
              , p = !1;
            a.bind("mousedown touchstart", function(e) {
                if (1 === e.which || 0 === e.which)
                    return f = !0,
                    h(e),
                    r.globalBind("mousemove.dur touchmove.dur", function(e) {
                        h(e)
                    }),
                    r.globalBind("mouseup.dur touchend.dur", function() {
                        f = !1,
                        c.hide(),
                        r.globalUnbind(".dur")
                    }),
                    !1
            }).bind("mouseenter", function() {
                p = !0,
                r.globalBind("mousemove.dur", function(e) {
                    h(e)
                }),
                mejs.MediaFeatures.hasTouch || c.show()
            }).bind("mouseleave", function() {
                p = !1,
                f || (r.globalUnbind(".dur"),
                c.hide())
            }),
            o.addEventListener("progress", function(e) {
                t.setProgressRail(e),
                t.setCurrentRail(e)
            }, !1),
            o.addEventListener("timeupdate", function(e) {
                t.setProgressRail(e),
                t.setCurrentRail(e)
            }, !1),
            r.loaded = s,
            r.total = a,
            r.current = u,
            r.handle = l
        },
        setProgressRail: function(e) {
            var t = this
              , n = void 0 != e ? e.target : t.media
              , i = null ;
            n && n.buffered && n.buffered.length > 0 && n.buffered.end && n.duration ? i = n.buffered.end(0) / n.duration : n && void 0 != n.bytesTotal && n.bytesTotal > 0 && void 0 != n.bufferedBytes ? i = n.bufferedBytes / n.bytesTotal : e && e.lengthComputable && 0 != e.total && (i = e.loaded / e.total),
            null !== i && (i = Math.min(1, Math.max(0, i)),
            t.loaded && t.total && t.loaded.width(t.total.width() * i))
        },
        setCurrentRail: function() {
            var e = this;
            if (void 0 != e.media.currentTime && e.media.duration && e.total && e.handle) {
                var t = Math.round(e.total.width() * e.media.currentTime / e.media.duration)
                  , n = t - Math.round(e.handle.outerWidth(!0) / 2);
                e.current.width(t),
                e.handle.css("left", n)
            }
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: "<span> | </span>"
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildcurrent: function(t, n, i, o) {
            var r = this;
            e('<div class="mejs-time"><span class="mejs-currenttime">' + (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(n),
            r.currenttime = r.controls.find(".mejs-currenttime"),
            o.addEventListener("timeupdate", function() {
                t.updateCurrent()
            }, !1)
        },
        buildduration: function(t, n, i, o) {
            var r = this;
            n.children().last().find(".mejs-currenttime").length > 0 ? e(r.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (r.options.duration > 0 ? mejs.Utility.secondsToTimeCode(r.options.duration, r.options.alwaysShowHours || r.media.duration > 3600, r.options.showTimecodeFrameCount, r.options.framesPerSecond || 25) : (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(n.find(".mejs-time")) : (n.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"),
            e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (r.options.duration > 0 ? mejs.Utility.secondsToTimeCode(r.options.duration, r.options.alwaysShowHours || r.media.duration > 3600, r.options.showTimecodeFrameCount, r.options.framesPerSecond || 25) : (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(n)),
            r.durationD = r.controls.find(".mejs-duration"),
            o.addEventListener("timeupdate", function() {
                t.updateDuration()
            }, !1)
        },
        updateCurrent: function() {
            var e = this;
            e.currenttime && e.currenttime.html(mejs.Utility.secondsToTimeCode(e.media.currentTime, e.options.alwaysShowHours || e.media.duration > 3600, e.options.showTimecodeFrameCount, e.options.framesPerSecond || 25))
        },
        updateDuration: function() {
            var e = this;
            e.container.toggleClass("mejs-long-video", e.media.duration > 3600),
            e.durationD && (e.options.duration > 0 || e.media.duration) && e.durationD.html(mejs.Utility.secondsToTimeCode(e.options.duration > 0 ? e.options.duration : e.media.duration, e.options.alwaysShowHours, e.options.showTimecodeFrameCount, e.options.framesPerSecond || 25))
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        hideVolumeOnTouchDevices: !0,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildvolume: function(t, n, i, o) {
            if (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                var r = this
                  , a = r.isVideo ? r.options.videoVolume : r.options.audioVolume
                  , s = "horizontal" == a ? e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + r.id + '" title="' + r.options.muteText + '" aria-label="' + r.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(n) : e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + r.id + '" title="' + r.options.muteText + '" aria-label="' + r.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(n)
                  , u = r.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider")
                  , l = r.container.find(".mejs-volume-total, .mejs-horizontal-volume-total")
                  , c = r.container.find(".mejs-volume-current, .mejs-horizontal-volume-current")
                  , d = r.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle")
                  , h = function(e, t) {
                    if (!u.is(":visible") && "undefined" == typeof t)
                        return u.show(),
                        h(e, !0),
                        void u.hide();
                    if (e = Math.max(0, e),
                    e = Math.min(e, 1),
                    0 == e ? s.removeClass("mejs-mute").addClass("mejs-unmute") : s.removeClass("mejs-unmute").addClass("mejs-mute"),
                    "vertical" == a) {
                        var n = l.height()
                          , i = l.position()
                          , o = n - n * e;
                        d.css("top", Math.round(i.top + o - d.height() / 2)),
                        c.height(n - o),
                        c.css("top", i.top + o)
                    } else {
                        var r = l.width()
                          , i = l.position()
                          , f = r * e;
                        d.css("left", Math.round(i.left + f - d.width() / 2)),
                        c.width(Math.round(f))
                    }
                }
                  , f = function(e) {
                    var t = null
                      , n = l.offset();
                    if ("vertical" == a) {
                        var i = l.height()
                          , r = (parseInt(l.css("top").replace(/px/, ""), 10),
                        e.pageY - n.top);
                        if (t = (i - r) / i,
                        0 == n.top || 0 == n.left)
                            return
                    } else {
                        var s = l.width()
                          , u = e.pageX - n.left;
                        t = u / s
                    }
                    t = Math.max(0, t),
                    t = Math.min(t, 1),
                    h(t),
                    0 == t ? o.setMuted(!0) : o.setMuted(!1),
                    o.setVolume(t)
                }
                  , p = !1
                  , m = !1;
                s.hover(function() {
                    u.show(),
                    m = !0
                }, function() {
                    m = !1,
                    p || "vertical" != a || u.hide()
                }),
                u.bind("mouseover", function() {
                    m = !0
                }).bind("mousedown", function(e) {
                    return f(e),
                    r.globalBind("mousemove.vol", function(e) {
                        f(e)
                    }),
                    r.globalBind("mouseup.vol", function() {
                        p = !1,
                        r.globalUnbind(".vol"),
                        m || "vertical" != a || u.hide()
                    }),
                    p = !0,
                    !1
                }),
                s.find("button").click(function() {
                    o.setMuted(!o.muted)
                }),
                o.addEventListener("volumechange", function() {
                    p || (o.muted ? (h(0),
                    s.removeClass("mejs-mute").addClass("mejs-unmute")) : (h(o.volume),
                    s.removeClass("mejs-unmute").addClass("mejs-mute")))
                }, !1),
                r.container.is(":visible") && (h(t.options.startVolume),
                0 === t.options.startVolume && o.setMuted(!0),
                "native" === o.pluginType && o.setVolume(t.options.startVolume))
            }
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        usePluginFullScreen: !0,
        newWindowCallback: function() {
            return ""
        },
        fullscreenText: mejs.i18n.t("Fullscreen")
    }),
    e.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1,
        isNativeFullScreen: !1,
        isInIframe: !1,
        buildfullscreen: function(t, n, i, o) {
            if (t.isVideo) {
                if (t.isInIframe = window.location != window.parent.location,
                mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    var r = function() {
                        t.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (t.isNativeFullScreen = !0,
                        t.setControlsSize()) : (t.isNativeFullScreen = !1,
                        t.exitFullScreen()))
                    };
                    t.globalBind(mejs.MediaFeatures.fullScreenEventName, r)
                }
                var a = this
                  , s = (t.container,
                e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.fullscreenText + '" aria-label="' + a.options.fullscreenText + '"></button></div>').appendTo(n));
                if ("native" === a.media.pluginType || !a.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)
                    s.click(function() {
                        var e = mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen;
                        e ? t.exitFullScreen() : t.enterFullScreen()
                    });
                else {
                    var u = null
                      , l = function() {
                        var e, t = document.createElement("x"), n = document.documentElement, i = window.getComputedStyle;
                        return "pointerEvents"in t.style && (t.style.pointerEvents = "auto",
                        t.style.pointerEvents = "x",
                        n.appendChild(t),
                        e = i && "auto" === i(t, "").pointerEvents,
                        n.removeChild(t),
                        !!e)
                    }();
                    if (l && !mejs.MediaFeatures.isOpera) {
                        var c, d, h = !1, f = function() {
                            if (h) {
                                for (var e in p)
                                    p[e].hide();
                                s.css("pointer-events", ""),
                                a.controls.css("pointer-events", ""),
                                a.media.removeEventListener("click", a.clickToPlayPauseCallback),
                                h = !1
                            }
                        }, p = {}, m = ["top", "left", "right", "bottom"], g = function() {
                            var e = s.offset().left - a.container.offset().left
                              , t = s.offset().top - a.container.offset().top
                              , n = s.outerWidth(!0)
                              , i = s.outerHeight(!0)
                              , o = a.container.width()
                              , r = a.container.height();
                            for (c in p)
                                p[c].css({
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                });
                            p.top.width(o).height(t),
                            p.left.width(e).height(i).css({
                                top: t
                            }),
                            p.right.width(o - e - n).height(i).css({
                                top: t,
                                left: e + n
                            }),
                            p.bottom.width(o).height(r - i - t).css({
                                top: t + i
                            })
                        };
                        for (a.globalBind("resize", function() {
                            g()
                        }),
                        c = 0,
                        d = m.length; c < d; c++)
                            p[m[c]] = e('<div class="mejs-fullscreen-hover" />').appendTo(a.container).mouseover(f).hide();
                        s.on("mouseover", function() {
                            if (!a.isFullScreen) {
                                var e = s.offset()
                                  , n = t.container.offset();
                                o.positionFullscreenButton(e.left - n.left, e.top - n.top, !1),
                                s.css("pointer-events", "none"),
                                a.controls.css("pointer-events", "none"),
                                a.media.addEventListener("click", a.clickToPlayPauseCallback);
                                for (c in p)
                                    p[c].show();
                                g(),
                                h = !0
                            }
                        }),
                        o.addEventListener("fullscreenchange", function() {
                            a.isFullScreen = !a.isFullScreen,
                            a.isFullScreen ? a.media.removeEventListener("click", a.clickToPlayPauseCallback) : a.media.addEventListener("click", a.clickToPlayPauseCallback),
                            f()
                        }),
                        a.globalBind("mousemove", function(e) {
                            if (h) {
                                var t = s.offset();
                                (e.pageY < t.top || e.pageY > t.top + s.outerHeight(!0) || e.pageX < t.left || e.pageX > t.left + s.outerWidth(!0)) && (s.css("pointer-events", ""),
                                a.controls.css("pointer-events", ""),
                                h = !1)
                            }
                        })
                    } else
                        s.on("mouseover", function() {
                            null !== u && (clearTimeout(u),
                            delete u);
                            var e = s.offset()
                              , n = t.container.offset();
                            o.positionFullscreenButton(e.left - n.left, e.top - n.top, !0)
                        }).on("mouseout", function() {
                            null !== u && (clearTimeout(u),
                            delete u),
                            u = setTimeout(function() {
                                o.hideFullscreenButton()
                            }, 1500)
                        })
                }
                t.fullscreenBtn = s,
                a.globalBind("keydown", function(e) {
                    (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || a.isFullScreen) && 27 == e.keyCode && t.exitFullScreen()
                })
            }
        },
        cleanfullscreen: function(e) {
            e.exitFullScreen()
        },
        containerSizeTimeout: null ,
        enterFullScreen: function() {
            var t = this;
            if ("native" === t.media.pluginType || !mejs.MediaFeatures.isFirefox && !t.options.usePluginFullScreen) {
                if (e(document.documentElement).addClass("mejs-fullscreen"),
                normalHeight = t.container.height(),
                normalWidth = t.container.width(),
                "native" === t.media.pluginType)
                    if (mejs.MediaFeatures.hasTrueNativeFullScreen)
                        mejs.MediaFeatures.requestFullScreen(t.container[0]),
                        t.isInIframe && setTimeout(function n() {
                            if (t.isNativeFullScreen) {
                                var i = window.devicePixelRatio || 1
                                  , o = .002
                                  , r = i * e(window).width()
                                  , a = screen.width
                                  , s = Math.abs(a - r)
                                  , u = a * o;
                                s > u ? t.exitFullScreen() : setTimeout(n, 500)
                            }
                        }, 500);
                    else if (mejs.MediaFeatures.hasSemiNativeFullScreen)
                        return void t.media.webkitEnterFullscreen();
                if (t.isInIframe) {
                    var n = t.options.newWindowCallback(this);
                    if ("" !== n) {
                        if (!mejs.MediaFeatures.hasTrueNativeFullScreen)
                            return t.pause(),
                            void window.open(n, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        setTimeout(function() {
                            t.isNativeFullScreen || (t.pause(),
                            window.open(n, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                        }, 250)
                    }
                }
                t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"),
                t.containerSizeTimeout = setTimeout(function() {
                    t.container.css({
                        width: "100%",
                        height: "100%"
                    }),
                    t.setControlsSize()
                }, 500),
                "native" === t.media.pluginType ? t.$media.width("100%").height("100%") : (t.container.find(".mejs-shim").width("100%").height("100%"),
                t.media.setVideoSize(e(window).width(), e(window).height())),
                t.layers.children("div").width("100%").height("100%"),
                t.fullscreenBtn && t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"),
                t.setControlsSize(),
                t.isFullScreen = !0,
                t.container.find(".mejs-captions-text").css("font-size", screen.width / t.width * 1 * 100 + "%"),
                t.container.find(".mejs-captions-position").css("bottom", "45px")
            }
        },
        exitFullScreen: function() {
            var t = this;
            return clearTimeout(t.containerSizeTimeout),
            "native" !== t.media.pluginType && mejs.MediaFeatures.isFirefox ? void t.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(),
            e(document.documentElement).removeClass("mejs-fullscreen"),
            t.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight),
            "native" === t.media.pluginType ? t.$media.width(normalWidth).height(normalHeight) : (t.container.find(".mejs-shim").width(normalWidth).height(normalHeight),
            t.media.setVideoSize(normalWidth, normalHeight)),
            t.layers.children("div").width(normalWidth).height(normalHeight),
            t.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"),
            t.setControlsSize(),
            t.isFullScreen = !1,
            t.container.find(".mejs-captions-text").css("font-size", ""),
            void t.container.find(".mejs-captions-position").css("bottom", ""))
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        speeds: ["1.50", "1.25", "1.00", "0.75"],
        defaultSpeed: "1.00"
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildspeed: function(t, n, i, o) {
            var r = this;
            if ("native" == r.media.pluginType) {
                var a, s, u = '<div class="mejs-button mejs-speed-button"><button type="button">' + r.options.defaultSpeed + 'x</button><div class="mejs-speed-selector"><ul>';
                for (e.inArray(r.options.defaultSpeed, r.options.speeds) === -1 && r.options.speeds.push(r.options.defaultSpeed),
                r.options.speeds.sort(function(e, t) {
                    return parseFloat(t) - parseFloat(e)
                }),
                a = 0; a < r.options.speeds.length; a++)
                    u += '<li><input type="radio" name="speed" value="' + r.options.speeds[a] + '" id="' + r.options.speeds[a] + '" ',
                    r.options.speeds[a] == r.options.defaultSpeed ? (u += "checked=true ",
                    u += '/><label for="' + r.options.speeds[a] + '" class="mejs-speed-selected">' + r.options.speeds[a] + "x</label></li>") : u += '/><label for="' + r.options.speeds[a] + '">' + r.options.speeds[a] + "x</label></li>";
                u += "</ul></div></div>",
                t.speedButton = e(u).appendTo(n),
                t.playbackspeed = r.options.defaultSpeed,
                t.speedButton.on("click", "input[type=radio]", function() {
                    t.playbackspeed = e(this).attr("value"),
                    o.playbackRate = parseFloat(t.playbackspeed),
                    t.speedButton.find("button").text(t.playbackspeed + "x"),
                    t.speedButton.find(".mejs-speed-selected").removeClass("mejs-speed-selected"),
                    t.speedButton.find("input[type=radio]:checked").next().addClass("mejs-speed-selected")
                }),
                s = t.speedButton.find(".mejs-speed-selector"),
                s.height(this.speedButton.find(".mejs-speed-selector ul").outerHeight(!0) + t.speedButton.find(".mejs-speed-translations").outerHeight(!0)),
                s.css("top", -1 * s.height() + "px")
            }
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        hideCaptionsButtonWhenEmpty: !0,
        toggleCaptionsButtonWhenOnlyOne: !1,
        slidesSelector: ""
    }),
    e.extend(MediaElementPlayer.prototype, {
        hasChapters: !1,
        buildtracks: function(t, n, i, o) {
            if (0 !== t.tracks.length) {
                var r, a = this;
                if (a.domNode.textTracks)
                    for (r = a.domNode.textTracks.length - 1; r >= 0; r--)
                        a.domNode.textTracks[r].mode = "hidden";
                t.chapters = e('<div class="mejs-chapters mejs-layer"></div>').prependTo(i).hide(),
                t.captions = e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(i).hide(),
                t.captionsText = t.captions.find(".mejs-captions-text"),
                t.captionsButton = e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.tracksText + '" aria-label="' + a.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_none" value="none" checked="checked" /><label for="' + t.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(n);
                var s = 0;
                for (r = 0; r < t.tracks.length; r++)
                    "subtitles" == t.tracks[r].kind && s++;
                for (a.options.toggleCaptionsButtonWhenOnlyOne && 1 == s ? t.captionsButton.on("click", function() {
                    null === t.selectedTrack ? lang = t.tracks[0].srclang : lang = "none",
                    t.setTrack(lang)
                }) : (t.captionsButton.on("mouseenter focusin", function() {
                    e(this).find(".mejs-captions-selector").css("visibility", "visible")
                }).on("click", "input[type=radio]", function() {
                    lang = this.value,
                    t.setTrack(lang)
                }),
                t.captionsButton.on("mouseleave focusout", function() {
                    e(this).find(".mejs-captions-selector").css("visibility", "hidden")
                })),
                t.options.alwaysShowControls ? t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : t.container.bind("controlsshown", function() {
                    t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden", function() {
                    o.paused || t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                }),
                t.trackToLoad = -1,
                t.selectedTrack = null ,
                t.isLoadingTrack = !1,
                r = 0; r < t.tracks.length; r++)
                    "subtitles" == t.tracks[r].kind && t.addTrackButton(t.tracks[r].srclang, t.tracks[r].label);
                t.loadNextTrack(),
                o.addEventListener("timeupdate", function() {
                    t.displayCaptions()
                }, !1),
                "" !== t.options.slidesSelector && (t.slidesContainer = e(t.options.slidesSelector),
                o.addEventListener("timeupdate", function() {
                    t.displaySlides()
                }, !1)),
                o.addEventListener("loadedmetadata", function() {
                    t.displayChapters()
                }, !1),
                t.container.hover(function() {
                    t.hasChapters && (t.chapters.css("visibility", "visible"),
                    t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))
                }, function() {
                    t.hasChapters && !o.paused && t.chapters.fadeOut(200, function() {
                        e(this).css("visibility", "hidden"),
                        e(this).css("display", "block")
                    })
                }),
                null !== t.node.getAttribute("autoplay") && t.chapters.css("visibility", "hidden")
            }
        },
        setTrack: function(e) {
            var t, n = this;
            if ("none" == e)
                n.selectedTrack = null ,
                n.captionsButton.removeClass("mejs-captions-enabled");
            else
                for (t = 0; t < n.tracks.length; t++)
                    if (n.tracks[t].srclang == e) {
                        null === n.selectedTrack && n.captionsButton.addClass("mejs-captions-enabled"),
                        n.selectedTrack = n.tracks[t],
                        n.captions.attr("lang", n.selectedTrack.srclang),
                        n.displayCaptions();
                        break
                    }
        },
        loadNextTrack: function() {
            var e = this;
            e.trackToLoad++,
            e.trackToLoad < e.tracks.length ? (e.isLoadingTrack = !0,
            e.loadTrack(e.trackToLoad)) : (e.isLoadingTrack = !1,
            e.checkForTracks())
        },
        loadTrack: function(t) {
            var n = this
              , i = n.tracks[t]
              , o = function() {
                i.isLoaded = !0,
                n.enableTrackButton(i.srclang, i.label),
                n.loadNextTrack()
            };
            e.ajax({
                url: i.src,
                dataType: "text",
                success: function(e) {
                    "string" == typeof e && /<tt\s+xml/gi.exec(e) ? i.entries = mejs.TrackFormatParser.dfxp.parse(e) : i.entries = mejs.TrackFormatParser.webvtt.parse(e),
                    o(),
                    "chapters" == i.kind && n.media.addEventListener("play", function() {
                        n.media.duration > 0 && n.displayChapters(i)
                    }, !1),
                    "slides" == i.kind && n.setupSlides(i)
                },
                error: function() {
                    n.loadNextTrack()
                }
            })
        },
        enableTrackButton: function(t, n) {
            var i = this;
            "" === n && (n = mejs.language.codes[t] || t),
            i.captionsButton.find("input[value=" + t + "]").prop("disabled", !1).siblings("label").html(n),
            i.options.startLanguage == t && e("#" + i.id + "_captions_" + t).prop("checked", !0).trigger("click"),
            i.adjustLanguageBox()
        },
        addTrackButton: function(t, n) {
            var i = this;
            "" === n && (n = mejs.language.codes[t] || t),
            i.captionsButton.find("ul").append(e('<li><input type="radio" name="' + i.id + '_captions" id="' + i.id + "_captions_" + t + '" value="' + t + '" disabled="disabled" /><label for="' + i.id + "_captions_" + t + '">' + n + " (loading)</label></li>")),
            i.adjustLanguageBox(),
            i.container.find(".mejs-captions-translations option[value=" + t + "]").remove()
        },
        adjustLanguageBox: function() {
            var e = this;
            e.captionsButton.find(".mejs-captions-selector").height(e.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + e.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
        },
        checkForTracks: function() {
            var e = this
              , t = !1;
            if (e.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < e.tracks.length; i++)
                    if ("subtitles" == e.tracks[i].kind) {
                        t = !0;
                        break
                    }
                t || (e.captionsButton.hide(),
                e.setControlsSize())
            }
        },
        displayCaptions: function() {
            if ("undefined" != typeof this.tracks) {
                var e, t = this, n = t.selectedTrack;
                if (null !== n && n.isLoaded) {
                    for (e = 0; e < n.entries.times.length; e++)
                        if (t.media.currentTime >= n.entries.times[e].start && t.media.currentTime <= n.entries.times[e].stop)
                            return t.captionsText.html(n.entries.text[e]).attr("class", "mejs-captions-text " + (n.entries.times[e].identifier || "")),
                            void t.captions.show().height(0);
                    t.captions.hide()
                } else
                    t.captions.hide()
            }
        },
        setupSlides: function(e) {
            var t = this;
            t.slides = e,
            t.slides.entries.imgs = [t.slides.entries.text.length],
            t.showSlide(0)
        },
        showSlide: function(t) {
            if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                var n = this
                  , i = n.slides.entries.text[t]
                  , o = n.slides.entries.imgs[t];
                "undefined" == typeof o || "undefined" == typeof o.fadeIn ? n.slides.entries.imgs[t] = o = e('<img src="' + i + '">').on("load", function() {
                    o.appendTo(n.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                }) : o.is(":visible") || o.is(":animated") || o.fadeIn().siblings(":visible").fadeOut()
            }
        },
        displaySlides: function() {
            if ("undefined" != typeof this.slides) {
                var e, t = this, n = t.slides;
                for (e = 0; e < n.entries.times.length; e++)
                    if (t.media.currentTime >= n.entries.times[e].start && t.media.currentTime <= n.entries.times[e].stop)
                        return void t.showSlide(e)
            }
        },
        displayChapters: function() {
            var e, t = this;
            for (e = 0; e < t.tracks.length; e++)
                if ("chapters" == t.tracks[e].kind && t.tracks[e].isLoaded) {
                    t.drawChapters(t.tracks[e]),
                    t.hasChapters = !0;
                    break
                }
        },
        drawChapters: function(t) {
            var n, i, o = this, r = 0, a = 0;
            for (o.chapters.empty(),
            n = 0; n < t.entries.times.length; n++)
                i = t.entries.times[n].stop - t.entries.times[n].start,
                r = Math.floor(i / o.media.duration * 100),
                (r + a > 100 || n == t.entries.times.length - 1 && r + a < 100) && (r = 100 - a),
                o.chapters.append(e('<div class="mejs-chapter" rel="' + t.entries.times[n].start + '" style="left: ' + a.toString() + "%;width: " + r.toString() + '%;"><div class="mejs-chapter-block' + (n == t.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + t.entries.text[n] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(t.entries.times[n].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(t.entries.times[n].stop) + "</span></div></div>")),
                a += r;
            o.chapters.find("div.mejs-chapter").click(function() {
                o.media.setCurrentTime(parseFloat(e(this).attr("rel"))),
                o.media.paused && o.media.play()
            }),
            o.chapters.show()
        }
    }),
    mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            fl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    },
    mejs.TrackFormatParser = {
        webvtt: {
            pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function(t) {
                for (var n, i, o, r = 0, a = mejs.TrackFormatParser.split2(t, /\r?\n/), s = {
                    text: [],
                    times: []
                }; r < a.length; r++) {
                    if (n = this.pattern_timecode.exec(a[r]),
                    n && r < a.length) {
                        for (r - 1 >= 0 && "" !== a[r - 1] && (o = a[r - 1]),
                        r++,
                        i = a[r],
                        r++; "" !== a[r] && r < a.length; )
                            i = i + "\n" + a[r],
                            r++;
                        i = e.trim(i).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"),
                        s.text.push(i),
                        s.times.push({
                            identifier: o,
                            start: 0 === mejs.Utility.convertSMPTEtoSeconds(n[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(n[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(n[3]),
                            settings: n[5]
                        })
                    }
                    o = ""
                }
                return s
            }
        },
        dfxp: {
            parse: function(t) {
                t = e(t).filter("tt");
                var n, i, o = 0, r = t.children("div").eq(0), a = r.find("p"), s = t.find("#" + r.attr("style")), u = {
                    text: [],
                    times: []
                };
                if (s.length) {
                    var l = s.removeAttr("id").get(0).attributes;
                    if (l.length)
                        for (n = {},
                        o = 0; o < l.length; o++)
                            n[l[o].name.split(":")[1]] = l[o].value
                }
                for (o = 0; o < a.length; o++) {
                    var c, d = {
                        start: null ,
                        stop: null ,
                        style: null
                    };
                    if (a.eq(o).attr("begin") && (d.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("begin"))),
                    !d.start && a.eq(o - 1).attr("end") && (d.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(o - 1).attr("end"))),
                    a.eq(o).attr("end") && (d.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("end"))),
                    !d.stop && a.eq(o + 1).attr("begin") && (d.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(o + 1).attr("begin"))),
                    n) {
                        c = "";
                        for (var h in n)
                            c += h + ":" + n[h] + ";"
                    }
                    c && (d.style = c),
                    0 === d.start && (d.start = .2),
                    u.times.push(d),
                    i = e.trim(a.eq(o).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"),
                    u.text.push(i),
                    0 === u.times.start && (u.times.start = 2)
                }
                return u
            }
        },
        split2: function(e, t) {
            return e.split(t)
        }
    },
    3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function(e, t) {
        var n, i = [], o = "";
        for (n = 0; n < e.length; n++)
            o += e.substring(n, n + 1),
            t.test(o) && (i.push(o.replace(t, "")),
            o = "");
        return i.push(o),
        i
    }
    )
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function(e) {
                return "undefined" == typeof e.enterFullScreen ? null : e.isFullScreen ? mejs.i18n.t("Turn off Fullscreen") : mejs.i18n.t("Go Fullscreen")
            },
            click: function(e) {
                e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
            }
        }, {
            render: function(e) {
                return e.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute")
            },
            click: function(e) {
                e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
            }
        }, {
            isSeparator: !0
        }, {
            render: function() {
                return mejs.i18n.t("Download Video")
            },
            click: function(e) {
                window.location.href = e.media.currentSrc
            }
        }]
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function(t) {
            t.contextMenu = e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(),
            t.container.bind("contextmenu", function(e) {
                if (t.isContextMenuEnabled)
                    return e.preventDefault(),
                    t.renderContextMenu(e.clientX - 1, e.clientY - 1),
                    !1
            }),
            t.container.bind("click", function() {
                t.contextMenu.hide()
            }),
            t.contextMenu.bind("mouseleave", function() {
                t.startContextMenuTimer()
            })
        },
        cleancontextmenu: function(e) {
            e.contextMenu.remove()
        },
        isContextMenuEnabled: !0,
        enableContextMenu: function() {
            this.isContextMenuEnabled = !0
        },
        disableContextMenu: function() {
            this.isContextMenuEnabled = !1
        },
        contextMenuTimeout: null ,
        startContextMenuTimer: function() {
            var e = this;
            e.killContextMenuTimer(),
            e.contextMenuTimer = setTimeout(function() {
                e.hideContextMenu(),
                e.killContextMenuTimer()
            }, 750)
        },
        killContextMenuTimer: function() {
            var e = this.contextMenuTimer;
            null != e && (clearTimeout(e),
            delete e,
            e = null )
        },
        hideContextMenu: function() {
            this.contextMenu.hide()
        },
        renderContextMenu: function(t, n) {
            for (var i = this, o = "", r = i.options.contextMenuItems, a = 0, s = r.length; a < s; a++)
                if (r[a].isSeparator)
                    o += '<div class="mejs-contextmenu-separator"></div>';
                else {
                    var u = r[a].render(i);
                    null != u && (o += '<div class="mejs-contextmenu-item" data-itemindex="' + a + '" id="element-' + 1e6 * Math.random() + '">' + u + "</div>")
                }
            i.contextMenu.empty().append(e(o)).css({
                top: n,
                left: t
            }).show(),
            i.contextMenu.find(".mejs-contextmenu-item").each(function() {
                var t = e(this)
                  , n = parseInt(t.data("itemindex"), 10)
                  , o = i.options.contextMenuItems[n];
                "undefined" != typeof o.show && o.show(t, i),
                t.click(function() {
                    "undefined" != typeof o.click && o.click(i),
                    i.contextMenu.hide()
                })
            }),
            setTimeout(function() {
                i.killControlsTimer("rev3")
            }, 100)
        }
    })
}(mejs.$),
function(e) {
    e.extend(mejs.MepDefaults, {
        postrollCloseText: mejs.i18n.t("Close")
    }),
    e.extend(MediaElementPlayer.prototype, {
        buildpostroll: function(t, n, i) {
            var o = this
              , r = o.container.find('link[rel="postroll"]').attr("href");
            "undefined" != typeof r && (t.postroll = e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + o.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(i).hide(),
            o.media.addEventListener("ended", function() {
                e.ajax({
                    dataType: "html",
                    url: r,
                    success: function(e) {
                        i.find(".mejs-postroll-layer-content").html(e)
                    }
                }),
                t.postroll.show()
            }, !1))
        }
    })
}(mejs.$),
function(e) {
    "use strict";
    function t() {
        e(window).resize(),
        e(".audio-player").each(function() {
            e(this).hasClass("audio-player") && (e(this).data("initialized") || e(this).find("audio:not(.processed)").audioPlayer())
        })
    }
    function n() {
        function n(t) {
            t.hasClass("selected") || (o.find("a").removeClass("selected"),
            t.addClass("selected")),
            t.length > 0 && e(window).scrollTop(0);
            var n = t.attr("href")
              , r = i.children(":visible").not(n);
            if (r.hasClass("audio-player"))
                r.find(".mejs-pause button").click();
            else if (r.hasClass("video-player")) {
                var a = e(".video-embed iframe");
                a[0].contentWindow.postMessage({
                    method: "pause"
                }, a.attr("src").split("?")[0])
            }
            r.dgHide();
            var s = i.children(n);
            s.dgShow(function() {
                e(window).resize(),
                e(this).data("initialized", !0),
                t.length > 0 && e(window).scrollTop(0)
            })
        }
        t();
        var i = e(".media-player")
          , o = e(".js-media-menu")
          , r = o.find("li.js-download");
        if (window.location.hash.length > 0) {
            var a = o.find('a[href="' + window.location.hash + '"]').first();
            n(a)
        } else {
            var s = o.find(".media-menu__item").not(".js-download").children("a").first();
            s.length > 0 && n(o.find("a").first())
        }
        o.children("li").not(".js-download").on("click", function(t) {
            n(e(t.target).closest("li").find("a"))
        }),
        r.on("click", function(t) {
            if (e(t.target).is("li.js-download > .inner > a *, li.js-download > .inner > a"))
                return r.addClass("selected"),
                !1
        }),
        e("html").on("click", function(t) {
            var n = t.target;
            "undefined" == typeof t.target && (n = t.srcElement),
            e(n).is("li.js-download") || r.removeClass("selected")
        }),
        e(document).keyup(function(e) {
            27 === e.keyCode && r.removeClass("selected")
        })
    }
    e.fn.dgHide = function() {
        var t = e(this);
        return t.css({
            position: "absolute",
            visibility: "hidden",
            overflow: "hidden"
        }),
        this
    }
    ,
    e.fn.dgShow = function(t) {
        var n = this
          , i = e(this);
        return i.css({
            position: "static",
            visibility: "visible",
            overflow: "visible",
            display: "block"
        }),
        setTimeout(function() {
            t.call(n)
        }, 0),
        this
    }
    ,
    e(document).ready(function() {
        n()
    })
}(jQuery),
$(document).ready(function() {
    $(".video-embed, .vimeo, .vimeo-full").fitVids(),
    $(".js-media-menu .full_video a").on("click", function() {
        $("video,audio").each(function() {
            $(this)[0].pause()
        })
    })
}),
function() {
    $(function() {
        var e, t, n, i, o, r, a, s, u, l, c, d, h, f, p, m, g, v, y, b, w, k, x, S;
        return n = $(".share__button"),
        t = $(".card__inner"),
        e = $("body"),
        p = 1025,
        h = 769,
        l = 461,
        u = 461,
        y = 0,
        m = 0,
        v = 0,
        g = 0,
        f = 10,
        i = null ,
        k = "share__options",
        o = "." + k + ".-active",
        r = function() {
            return $(".share__options, .share__button").removeClass("-active"),
            t.removeClass("disabled").unbind("click")
        }
        ,
        S = function() {
            var e;
            return e = {
                width: $(window).width(),
                height: $(window).height()
            }
        }
        ,
        s = function(e) {
            return e.preventDefault(),
            e.stopPropagation(),
            r()
        }
        ,
        c = function(e, t, n) {
            return '<div class="share--modal"><div class="modal-share__container js-share-values" data-link="' + t + '" data-title="' + e + '"><div class="modal__title"><em>Share</em>' + e + '</div><a href="javascript:;" class="close-modal"><img class="img-svg" src="/assets/vector/close-4b1df093a5eb1d43cc81375beb8e5bf0ea54816ebf36513111746a47814c0091.svg"></img><span class="visually-hidden">Close</span></a>' + n.clone().wrap("<div>").parent().html() + "</div></div>"
        }
        ,
        d = function() {
            return '<div class="modal-overlay"></div>'
        }
        ,
        w = function(e) {
            var t;
            if (e)
                return t = $(e),
                y = t.outerWidth(),
                m = t.outerHeight(),
                v = t.offset().top - $(window).scrollTop(),
                g = t.offset().left
        }
        ,
        x = function(e, n) {
            var i;
            if (s(n),
            i = e.closest(".card__inner"),
            e.addClass("-active"),
            e.siblings(".share__options").addClass("-active"),
            i.length)
                return t.addClass("disabled").bind("click", function(e) {
                    return e.preventDefault()
                })
        }
        ,
        b = function(t, n) {
            var o, r, a, h, p, b, k, x;
            i = t,
            s(n),
            w(t),
            a = t.parent(".share"),
            h = t.siblings(".share__options"),
            k = a.data("title"),
            b = a.data("link"),
            x = S(),
            p = f,
            (x.width < l || x.height < u) && (p = 0),
            o = c(k, b, h),
            r = d(),
            e.trigger("modal-state", "open").prepend(o).prepend(r),
            setTimeout(function() {
                return $(".modal-overlay").addClass("-active")
            }, 100),
            $(".share--modal").css({
                top: v,
                left: g,
                width: y,
                height: m
            }).animate({
                top: p + "%",
                left: p + "%",
                bottom: p + "%",
                right: p + "%",
                width: 100 - 2 * p + "%",
                height: 100 - 2 * p + "%"
            }, 400, function() {
                return $(".share--modal").addClass("show-elements")
            })
        }
        ,
        a = function() {
            return e.trigger("modal-state", "close"),
            w(i),
            $(".modal-overlay").removeClass("-active"),
            $(".share--modal").removeClass("show-elements").delay(100).animate({
                top: v,
                left: g,
                width: y,
                height: m
            }, 200, function() {
                return $(".share--modal, .modal-overlay").delay(100).remove()
            })
        }
        ,
        e.on("click", ".share__button", function(e) {
            var t;
            return t = S(),
            t.width < p && t.height < h || t.width < h ? b($(this), e) : x($(this), e)
        }),
        $(document).on("click", function() {
            return r()
        }),
        e.on("click", ".close-modal", function() {
            a()
        }),
        $(document).keyup(function(e) {
            27 === e.keyCode && $(o).length && a()
        }),
        $(window).on("scroll", function() {
            var e, t, n, i, o, r;
            e = $("#resource-body"),
            e.length > 0 && (t = $(".share"),
            r = $(window).width(),
            o = $(document).scrollTop() + $(window).height(),
            i = r > 1024 ? 17 : -40,
            $(".share-placement").length > 0 && (n = $(".share-placement").offset().top - i),
            o >= n ? t.removeClass("fixed") : t.addClass("fixed"))
        })
    })
}
.call(this),
function e(t, n, i) {
    function o(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var u = "function" == typeof require && require;
                if (!s && u)
                    return u(a, !0);
                if (r)
                    return r(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND",
                l
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return o(n ? n : e)
            }, c, c.exports, e, t, n, i)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < i.length; a++)
        o(i[a]);
    return o
}({
    1: [function(e) {
        "use strict";
        function t(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        e("picturefill"),
        e("lazysizes");
        var n = e("./modules/toggle-active.es6")
          , i = t(n)
          , o = e("./modules/header.es6")
          , r = t(o)
          , a = e("./modules/header-search.es6")
          , s = t(a)
          , u = e("./modules/header-features.es6")
          , l = t(u)
          , c = e("./modules/header-menu.es6")
          , d = t(c)
          , h = e("./modules/mobile-detect.es6")
          , f = t(h)
          , p = e("./modules/grouping-index-navigation.es6")
          , m = t(p)
          , g = e("./modules/dropdown-list.es6")
          , v = t(g)
          , y = e("./modules/admin-tools.es6")
          , b = t(y)
          , w = e("./modules/highlighter.es6")
          , k = t(w)
          , x = e("./modules/layout-tweaks.es6")
          , S = t(x)
          , T = e("./modules/social-metrics.es6")
          , j = t(T)
          , C = e("./modules/social-sharing.es6")
          , _ = t(C)
          , E = e("./modules/modal-video.es6")
          , A = t(E)
          , P = e("./modules/modal-author.es6")
          , M = t(P)
          , N = e("./modules/popup.es6")
          , L = t(N)
          , F = e("./modules/scrollwatcher-setup.es6")
          , z = t(F)
          , I = e("./modules/series-navigation.es6")
          , O = t(I)
          , H = e("./modules/mailing-lists-subscription.es6")
          , B = t(H)
          , W = e("./modules/book-topic-layout.es6")
          , q = t(W)
          , U = e("./modules/image-shade.es6")
          , V = t(U)
          , Q = e("./modules/apj-load-more-link.es6")
          , G = t(Q)
          , Y = e("./modules/apj-popular-recent-toggle.es6")
          , X = t(Y)
          , J = e("./modules/apj-search-form.es6")
          , K = t(J)
          , Z = e("./singles/scripture-index.es6")
          , ee = t(Z);
        $(function() {
            (new i["default"]).execute(),
            (new r["default"]).execute(),
            (new d["default"]).execute(),
            (new l["default"]).execute(),
            (new s["default"]).execute(),
            (new m["default"]).execute(),
            (new v["default"]).execute(),
            (new b["default"]).execute(),
            (new z["default"]).execute(),
            (new j["default"]).execute(),
            (new _["default"]).execute(),
            (new A["default"]).execute(),
            (new M["default"]).execute(),
            (new L["default"]).execute(),
            (new S["default"]).execute(),
            (new O["default"]).execute(),
            (new B["default"]).execute(),
            (new q["default"]).execute(),
            (new V["default"]).execute(),
            (new G["default"]).execute(),
            (new X["default"]).execute(),
            (new K["default"]).execute();
            
        
            (new ee["default"]).execute(),
            window.picturefill(),
            new f["default"](navigator.userAgent).execute({
                desktop: function() {
                    (new k["default"]).execute()
                },
                ios: function() {
                    $("body").addClass("ios")
                }
            })
        })
    }
    , {
        "./modules/admin-tools.es6": 2,
        "./modules/apj-load-more-link.es6": 4,
        "./modules/apj-popular-recent-toggle.es6": 5,
        "./modules/apj-search-form.es6": 6,
        "./modules/book-topic-layout.es6": 8,
        "./modules/dropdown-list.es6": 9,
        "./modules/grouping-index-navigation.es6": 13,
        "./modules/header-features.es6": 14,
        "./modules/header-menu.es6": 15,
        "./modules/header-search.es6": 16,
        "./modules/header.es6": 17,
        "./modules/highlighter.es6": 18,
        "./modules/image-shade.es6": 19,
        "./modules/layout-tweaks.es6": 21,
        "./modules/mailing-lists-subscription.es6": 22,
        "./modules/mobile-detect.es6": 23,
        "./modules/modal-author.es6": 24,
        "./modules/modal-video.es6": 26,
        "./modules/popup.es6": 27,
       
        "./modules/scrollwatcher-setup.es6": 29,
        "./modules/series-navigation.es6": 32,
        "./modules/social-metrics.es6": 33,
        "./modules/social-sharing.es6": 34,
        "./modules/toggle-active.es6": 36,
        "./singles/scripture-index.es6": 39,
        lazysizes: 44,
        picturefill: 48
    }],
    2: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#admin-notice"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-close";
                i(this, e),
                this.$root = $(t),
                this.$close = this.$root.find(n)
            }
            return o(e, [{
                key: "_closeAdminTools",
                value: function() {
                    this.$root.hide()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$close.click(function(t) {
                        return e._closeAdminTools(t)
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    3: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e)
            }
            return o(e, null , [{
                key: "recordShare",
                value: function(e, t, n) {
                    ga("send", "event", "Shares", e + " - " + t.constructor.name, n)
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    4: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./initialize-audio-players.es6")
          , s = i(a)
          , u = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-apj-load-more-link"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-apj-spinner";
                o(this, e),
                this.root = t,
                this.spinner = n
            }
            return r(e, [{
                key: "_replaceLinkWithSpinner",
                value: function() {
                    $(this.spinner).show(),
                    $(this.root).hide()
                }
            }, {
                key: "_replaceSpinnerWithLink",
                value: function() {
                    $(this.root).show(),
                    $(this.spinner).hide()
                }
            }, {
                key: "_replaceSpinnerWithNewApjs",
                value: function(e, t) {
                    $(this.spinner).fadeOut({
                        queue: !1
                    }).slideUp({
                        queue: !1,
                        complete: function() {
                            $(this).remove()
                        }
                    });
                    var n = $(t).replaceAll($(this.root));
                    this._initializeAudioPlayers(n)
                }
            }, {
                key: "_initializeAudioPlayers",
                value: function(e) {
                    (new s["default"]).execute(e)
                }
            }, {
                key: "execute",
                value: function() {
                    $(document).on("ajax:before", this.root, this._replaceLinkWithSpinner.bind(this)),
                    $(document).on("ajax:success", this.root, this._replaceSpinnerWithNewApjs.bind(this)),
                    $(document).on("ajax:error", this.root, this._replaceSpinnerWithLink.bind(this))
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./initialize-audio-players.es6": 20
    }],
    5: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./initialize-audio-players.es6")
          , s = i(a)
          , u = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "a.js-load-grid-link"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-apj-grid"
                  , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".js-apj-spinner";
                o(this, e),
                this.root = t,
                this.spinner = i,
                this.pageLoadOnPopular = !1,
                this.$apjGrid = $(n),
                this.$popularLink = $(this.root + ":contains(Popular)")
            }
            return r(e, [{
                key: "_replaceApjsWithSpinner",
                value: function(e) {
                    this.$apjGrid.html($(this.spinner).show()),
                    $(this.root).toggleClass("selected"),
                    document.location.hash = $(e.target).data("hash")
                }
            }, {
                key: "_replaceSpinnerWithApjs",
                value: function(e, t) {
                    var n = this.$apjGrid.html(t);
                    this._initializeAudioPlayers(n),
                    this.pageLoadOnPopular === !0 && (this._scrollToPopularSection(),
                    this.pageLoadOnPopular = !1)
                }
            }, {
                key: "_isPopularSection",
                value: function() {
                    return "#popular" === document.location.hash
                }
            }, {
                key: "_popularSectionOffset",
                value: function() {
                    return this.$popularLink.offset().top - 100
                }
            }, {
                key: "_initializePopularSection",
                value: function() {
                    this.pageLoadOnPopular = !0,
                    this.$popularLink.click()
                }
            }, {
                key: "_scrollToPopularSection",
                value: function() {
                    this._isPopularSection() && window.scrollTo(0, this._popularSectionOffset())
                }
            }, {
                key: "_initializeAudioPlayers",
                value: function(e) {
                    (new s["default"]).execute(e)
                }
            }, {
                key: "execute",
                value: function() {
                    $(this.root).length > 0 && ($(document).on("ajax:before", this.root, this._replaceApjsWithSpinner.bind(this)),
                    $(document).on("ajax:success", this.root, this._replaceSpinnerWithApjs.bind(this)),
                    this._isPopularSection() && this._initializePopularSection(),
                    $(window).on("beforeunload", this._scrollToPopularSection.bind(this)))
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./initialize-audio-players.es6": 20
    }],
    6: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-apj-search-form"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-apj-search-results"
                  , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".js-clear-apj-search"
                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".js-apj-search-input"
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ".js-apj-submit-button";
                i(this, e),
                this.root = t,
                this.$root = $(t),
                this.$results = $(n),
                this.clearSearchButton = o,
                this.$searchInput = $(r),
                this.$searchSubmitButton = $(a),
                this.timer = 0
            }
            return o(e, [{
                key: "_displayResults",
                value: function(e, t) {
                    this.$results.html(t),
                    $(this.clearSearchButton).on("click", this._clearSearch.bind(this))
                }
            }, {
                key: "_clearSearch",
                value: function() {
                    this.$searchInput.val(""),
                    this._submitSearchForm()
                }
            }, {
                key: "_submitSearchForm",
                value: function() {
                    this.$root.submit()
                }
            }, {
                key: "_submitSearchFormWithDelay",
                value: function() {
                    clearTimeout(this.timer),
                    this.timer = setTimeout(this._submitSearchForm.bind(this), 350)
                }
            }, {
                key: "execute",
                value: function() {
                    $(document).on("ajax:success", this.root, this._displayResults.bind(this)),
                    this.$root.keyup(this._submitSearchFormWithDelay.bind(this)),
                    this.$searchSubmitButton.on("click", this._submitSearchForm.bind(this))
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    7: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                var n = []
                  , i = !0
                  , o = !1
                  , r = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (e) {
                    o = !0,
                    r = e
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (o)
                            throw r
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , s = e("./analytics-helper.es6")
          , u = i(s)
          , l = function() {
            function e(t, n, i) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".js-share-values";
                o(this, e),
                this.$body = $("body"),
                this.componentName = t,
                this.buttonSelector = n,
                this.shareInstance = i,
                this.valueSelector = r
            }
            return a(e, [{
                key: "_getShareValues",
                value: function(e) {
                    var t = $(e).closest(this.valueSelector)
                      , n = t.attr("data-link")
                      , i = {}.hasOwnProperty.call(this.shareInstance, "facebookAppId") && "Pull Quote" !== this.componentName
                      , o = i ? "" : t.attr("data-title");
                    return [n, o]
                }
            }, {
                key: "_share",
                value: function(e) {
                    var t = this._getShareValues(e.currentTarget)
                      , n = r(t, 2)
                      , i = n[0]
                      , o = n[1];
                    u["default"].recordShare(this.componentName, this.shareInstance, i),
                    this.shareInstance.basicShare(i, o),
                    e.preventDefault()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$body.on("click", this.buttonSelector, function(t) {
                        return e._share(t)
                    })
                }
            }]),
            e
        }();
        n["default"] = l
    }
    , {
        "./analytics-helper.es6": 3
    }],
    8: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("masonry-layout")
          , s = i(a)
          , u = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-book-topics"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-topic-group";
                o(this, e),
                this.root = t,
                this.group = n
            }
            return r(e, [{
                key: "execute",
                value: function() {
                    $(this.root).length > 0 && this.initializeMasonry()
                }
            }, {
                key: "initializeMasonry",
                value: function() {
                    this.layout = new s["default"](this.root,{
                        columnWidth: this.group,
                        itemSelector: this.group
                    })
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "masonry-layout": 45
    }],
    9: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$body = $("body")
            }
            return o(e, [{
                key: "openDropdown",
                value: function(e) {
                    var t = e.siblings(".dropdown-list__checkbox")
                      , n = e.siblings(".dropdown-list__content");
                    n.addClass("inactive"),
                    t.prop("checked", !0),
                    setTimeout(function() {
                        n.removeClass("inactive"),
                        n.addClass("active")
                    }, 100)
                }
            }, {
                key: "closeDropdown",
                value: function() {
                    var e = $(".dropdown-list__content")
                      , t = $(".dropdown-list__checkbox");
                    e.addClass("inactive"),
                    e.removeClass("active"),
                    setTimeout(function() {
                        t.prop("checked", !1)
                    }, 300)
                }
            }, {
                key: "updateDropdownText",
                value: function(e, t, n) {
                    e.find(".dropdown-list__button-text").text(t),
                    e.find(".dropdown-list__link").removeClass("selected"),
                    n.addClass("selected"),
                    this.closeDropdown()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$body.on("click", ".js-open-dropdown", function(t) {
                        t.preventDefault(),
                        t.stopPropagation();
                        var n = $(".dropdown-list__button[for=" + t.currentTarget.htmlFor + "]");
                        e.openDropdown(n)
                    }),
                    this.$body.on("click", ".dropdown-list__link", function(t) {
                        var n = $(t.target)
                          , i = n.closest(".dropdown-list")
                          , o = n.text();
                        e.updateDropdownText(i, o, n)
                    }),
                    this.$body.on("click touchend", function(t) {
                        if ($(".dropdown-list").length > 0) {
                            var n = document.querySelector(".dropdown-list")
                              , i = $(".dropdown-list__content.active").length > 0;
                            !$.contains(n, t.target) && i && e.closeDropdown()
                        }
                    }),
                    this.$body.on("keyup", function(t) {
                        27 === t.keyCode && $(".dropdown-list").length > 0 && e.closeDropdown()
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    10: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e)
            }
            return o(e, [{
                key: "share",
                value: function(e) {
                    var t = encodeURIComponent(e.subject)
                      , n = encodeURIComponent(e.body);
                    this._setLocationHref("mailto:?subject=" + t + "&body=" + n)
                }
            }, {
                key: "basicShare",
                value: function(e, t) {
                    this.share({
                        subject: t,
                        body: e
                    }, e)
                }
            }, {
                key: "_setLocationHref",
                value: function(e) {
                    window.location.href = e
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    11: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#facebook-app-id";
                i(this, e);
                var n = 575
                  , o = 400
                  , r = ($(window).width() - n) / 2
                  , a = ($(window).height() - o) / 2;
                this.facebookAppId = $(t).attr("data-value"),
                this.defaultWindowName = "Share a link on Facebook",
                this.baseUrl = "https://www.facebook.com/dialog/share?&display=popup",
                this.windowOptions = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + n + (",height=" + o) + (",top=" + a) + (",left=" + r)
            }
            return o(e, [{
                key: "share",
                value: function(e, t) {
                    var n = "&app_id=" + this.facebookAppId
                      , i = "&href=" + e
                      , o = "&redirect_uri=" + e
                      , r = "&quote=" + t
                      , a = "" + (this.baseUrl + n + i + o + r);
                    window.open(a, this.defaultWindowName, this.windowOptions)
                }
            }, {
                key: "basicShare",
                value: function(e, t) {
                    this.share(e, t)
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    12: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e);
                var t = 600
                  , n = 600
                  , o = ($(window).width() - t) / 2
                  , r = ($(window).height() - n) / 2;
                this.baseUrl = "https://plus.google.com/share?url=",
                this.defaultWindowName = "Share a link on Google Plus",
                this.windowOptions = "status=1,width=" + t + (",height=" + n) + (",top=" + r) + (",left=" + o)
            }
            return o(e, [{
                key: "share",
                value: function(e) {
                    window.open("" + this.baseUrl + e, this.defaultWindowName, this.windowOptions)
                }
            }, {
                key: "basicShare",
                value: function(e) {
                    this.share(e)
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    13: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = e("urijs")
          , a = function() {
            function e() {
                i(this, e),
                this.$typeSelect = $(".grouping-index-navigation-type select"),
                this.types = ["articles", "messages", "books", "interviews", "labs", "poems"],
                this.withGroupings = ["topics", "series", "authors", "scripture", "dates"]
            }
            return o(e, [{
                key: "_getNewPath",
                value: function(e) {
                    var t = e.split("/")
                      , n = this.$typeSelect.val();
                    return this._allPath(t) ? "/" + n + "/all" : this._withGroupingPath(t) ? this._getNewWithGroupingsPath(t, n) : this._byGroupingPath(t) ? "/" + n + "/" + t.slice(2, t.length).join("/") : "/" + n
                }
            }, {
                key: "_allPath",
                value: function(e) {
                    return "all" === e[e.length - 1];
                }
            }, {
                key: "_withGroupingPath",
                value: function(e) {
                    return $.inArray(e[1], this.withGroupings) > -1
                }
            }, {
                key: "_byGroupingPath",
                value: function(e) {
                    return e[2] && e[2].indexOf("by-") > -1
                }
            }, {
                key: "_groupingNotSpecified",
                value: function(e) {
                    return void 0 === e[2] || this._pathSegmentIsWithTypeFilter(e[2])
                }
            }, {
                key: "_pathSegmentIsWithTypeFilter",
                value: function(e) {
                    return this.types.some(function(t) {
                        return "with-" + t === e
                    })
                }
            }, {
                key: "_getNewWithGroupingsPath",
                value: function(e, t) {
                    if (this._groupingNotSpecified(e)) {
                        var n = "/" + e[1];
                        return "all-resources" === t ? n : "/" + e[1] + "/with-" + t
                    }
                    this.types.indexOf(e[e.length - 1]) > -1 && e.pop();
                    var i = e.join("/");
                    return "all-resources" === t ? i : i + "/" + t
                }
            }, {
                key: "_sortParamPresent",
                value: function() {
                    return window.location.href.includes("sort=")
                }
            }, {
                key: "_existingSortParam",
                value: function() {
                    var e = new r(window.location.href);
                    return e.search(!0).sort
                }
            }, {
                key: "_switchIndex",
                value: function() {
                    var e = window.location.pathname
                      , t = this._getNewPath(e);
                    this._sortParamPresent() && (t = t + "?sort=" + this._existingSortParam()),
                    window.location = t
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$typeSelect.on("change", function() {
                        return e._switchIndex()
                    })
                }
            }]),
            e
        }();
        n["default"] = a
    }
    , {
        urijs: 51
    }],
    14: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$body = $("body"),
                this.$features = $(".navigation__features")
            }
            return o(e, [{
                key: "_activate",
                value: function() {
                    this._getWindowWidth() < 1400 && this.$body.trigger("fixed-body", "open")
                }
            }, {
                key: "_deactivate",
                value: function() {
                    this.$body.trigger("fixed-body", "close")
                }
            }, {
                key: "_getWindowWidth",
                value: function() {
                    return $(window).width()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    $(document).on("navigation-features-activate", function() {
                        return e._activate()
                    }),
                    $(document).on("navigation-features-deactivate", function() {
                        return e._deactivate()
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    15: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$body = $("body"),
                this.$menu = $(".menu"),
                this.$menuTool = $(".header__tools__menu"),
                this.hideMenuTimeout = null
            }
            return o(e, [{
                key: "_toggleColors",
                value: function(e) {
                    "enter" === e ? this.$menuTool.addClass("hover") : this.$menuTool.removeClass("hover")
                }
            }, {
                key: "_activate",
                value: function() {
                    this._getWindowWidth() < 1400 && this.$body.trigger("fixed-body", "open"),
                    this.$menu.addClass("menu-drawer-visible").animate({
                        scrollTop: 0
                    }, 300),
                    clearTimeout(this.hideMenuTimeout)
                }
            }, {
                key: "_deactivate",
                value: function() {
                    var e = this;
                    this.$body.trigger("fixed-body", "close"),
                    this.hideMenuTimeout = setTimeout(function() {
                        e.$menu.removeClass("menu-drawer-visible")
                    }, 500)
                }
            }, {
                key: "_getWindowWidth",
                value: function() {
                    return $(window).width()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$menuTool.mouseenter(function() {
                        return e._toggleColors("enter")
                    }),
                    this.$menuTool.mouseleave(function() {
                        return e._toggleColors("leave")
                    }),
                    this.$menuTool.click(function() {
                        return e._toggleColors("leave")
                    }),
                    $(document).on("menu-drawer-activate", function() {
                        return e._activate()
                    }),
                    $(document).on("menu-drawer-deactivate", function() {
                        return e._deactivate()
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    16: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$body = $("body"),
                this.$menu = $(".header__tools__menu"),
                this.closeSearch = ".close-search",
                this.$searchInput = $(".gsc-input input"),
                this.$headerSearchInput = $(".header__search__input input"),
                this.$searchSubmit = $(".gsc-search-button"),
                this.$searchExample = $(".header__search__examples__list dd"),
                this.$searchInputContainer = $(".header__search__input"),
                this.closeSearchTimeout = null ,
                this.openSearchTimeout = null
            }
            return o(e, [{
                key: "_activate",
                value: function() {
                    var e = this;
                    this.$body.trigger("fixed-body", "open"),
                    clearTimeout(this.closeSearchTimeout),
                    this.$headerSearchInput.focus(),
                    this.openSearchTimeout = setTimeout(function() {
                        if (0 === $(e.closeSearch).length) {
                            var t = e.$menu.clone();
                            t.addClass("close-search").removeAttr("data-toggle"),
                            e.$menu.after(t)
                        }
                        e.$menu.hide()
                    }, 500)
                }
            }, {
                key: "_deactivate",
                value: function() {
                    var e = this;
                    this.$body.trigger("fixed-body", "close"),
                    clearTimeout(this.openSearchTimeout),
                    this.$searchInput.blur(),
                    this.closeSearchTimeout = setTimeout(function() {
                        $(e.closeSearch).remove(),
                        e.$menu.show()
                    }, 300)
                }
            }, {
                key: "_submit",
                value: function(e) {
                    var t = $(e.currentTarget)
                      , n = t.closest("form")
                      , i = n.find(this.$searchInput);
                    i.val() && n.submit()
                }
            }, {
                key: "_exampleSubmit",
                value: function(e) {
                    var t = $(e.currentTarget)
                      , n = this.$searchInputContainer.clone();
                    n.removeClass("gsc-input"),
                    n.children("input").attr("disabled", "disabled"),
                    this.$searchInputContainer.hide().after(n),
                    this.$searchInput.val(t.html()).closest("form").submit()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    $(document).on("global-search-activate", function() {
                        return e._activate()
                    }),
                    $(document).on("global-search-deactivate", function() {
                        return e._deactivate()
                    }),
                    this.$searchExample.click(function(t) {
                        return e._exampleSubmit(t)
                    }),
                    this.$searchSubmit.click(function(t) {
                        return e._submit(t)
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    17: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$header = $(".header"),
                this.$window = $(window),
                this.$body = $("body"),
                this.lastScrollTop = 0
            }
            return o(e, [{
                key: "_toggleHeaderShow",
                value: function() {
                    var e = this._getOffset();
                    this._toggleHideClass(e, this.lastScrollTop),
                    this.lastScrollTop = e
                }
            }, {
                key: "_toggleHideClass",
                value: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    t <= e.props().header_height ? this.$header.removeClass("hide") : n - t > e.props().show_buffer ? this.$header.removeClass("hide") : t - n > e.props().hide_buffer && this.$header.addClass("hide")
                }
            }, {
                key: "_getOffset",
                value: function() {
                    return $(document).scrollTop()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$window.scroll(function() {
                        return e._toggleHeaderShow()
                    })
                }
            }], [{
                key: "props",
                value: function() {
                    return {
                        hide_buffer: 10,
                        show_buffer: 15,
                        header_height: 60
                    }
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    18: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                var n = []
                  , i = !0
                  , o = !1
                  , r = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (e) {
                    o = !0,
                    r = e
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (o)
                            throw r
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , s = e("./selection.es6")
          , u = i(s)
          , l = e("./twitter-share.es6")
          , c = i(l)
          , d = e("./facebook-share.es6")
          , h = i(d)
          , f = e("./email-share.es6")
          , p = i(f)
          , m = e("./analytics-helper.es6")
          , g = i(m)
          , v = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-highlightable"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-share-popup"
                  , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".js-popup-twitter-badge"
                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".js-popup-facebook-badge"
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ".js-popup-email-badge";
                o(this, e),
                this.popupSelector = n,
                this.twitterSelector = i,
                this.facebookSelector = r,
                this.emailSelector = a,
                this.$content = $(t),
                this.$popup = $(this.popupSelector),
                this.selection = null ,
                this.topPopupOffset = -6,
                this.defaultUrl = window.location.href,
                this.twitterShare = new c["default"],
                this.facebookShare = new h["default"],
                this.emailShare = new p["default"]
            }
            return a(e, [{
                key: "_setSelection",
                value: function() {
                    this.selection = new u["default"]
                }
            }, {
                key: "_placePopup",
                value: function() {
                    var e = this
                      , t = this.selection.getCenterTopXY()
                      , n = r(t, 2)
                      , i = n[0]
                      , o = n[1]
                      , a = this.$popup.height()
                      , s = this.$popup.width()
                      , u = o - a + this.topPopupOffset
                      , l = i - s / 2;
                    this.$popup.css({
                        top: u,
                        left: l
                    }),
                    setTimeout(function() {
                        e.$popup.addClass("active")
                    }, 75)
                }
            }, {
                key: "_removePopup",
                value: function() {
                    this.$popup.removeClass("active"),
                    this.$popup.css({
                        top: "auto",
                        left: "auto"
                    })
                }
            }, {
                key: "_outsideContentHandler",
                value: function(e) {
                    this.$content.is(e.target) || 0 !== this.$content.has(e.target).length || this.$popup.is(e.target) || 0 !== this.$popup.has(e.target).length || this._removePopup()
                }
            }, {
                key: "_contentHandler",
                value: function() {
                    this._setSelection(),
                    this.selection.hasSelection() ? this._placePopup() : this._removePopup()
                }
            }, {
                key: "_clearSelection",
                value: function() {
                    this.selection && this.selection.clearSelection()
                }
            }, {
                key: "_isLeftClick",
                value: function(e) {
                    return 1 === e.which
                }
            }, {
                key: "_shareViaTwitter",
                value: function(e) {
                    var t = this.selection.getText();
                    g["default"].recordShare("Highlighter", this.twitterShare, this.defaultUrl),
                    this.twitterShare.basicShare(this.defaultUrl, t),
                    e.preventDefault()
                }
            }, {
                key: "_shareViaFacebook",
                value: function(e) {
                    var t = this.selection.getText();
                    g["default"].recordShare("Highlighter", this.facebookShare, this.defaultUrl),
                    this.facebookShare.basicShare(this.defaultUrl, t),
                    e.preventDefault()
                }
            }, {
                key: "_shareViaEmail",
                value: function(e) {
                    var t = this.selection.getText();
                    g["default"].recordShare("Highlighter", this.emailShare, this.defaultUrl),
                    this.emailShare.share({
                        subject: "Desiring God quote",
                        body: '"' + t + '" - ' + this.defaultUrl
                    }, this.defaultUrl),
                    e.preventDefault()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$content.mouseup(function(t) {
                        e._isLeftClick(t) && e._contentHandler()
                    }),
                    this.$content.mousedown(function(t) {
                        e._isLeftClick(t) && e._clearSelection()
                    }),
                    this.$popup.on("click", this.twitterSelector, function(t) {
                        return e._shareViaTwitter(t)
                    }),
                    this.$popup.on("click", this.facebookSelector, function(t) {
                        return e._shareViaFacebook(t)
                    }),
                    this.$popup.on("click", this.emailSelector, function(t) {
                        return e._shareViaEmail(t)
                    }),
                    $(document).mouseup(function(t) {
                        e._isLeftClick(t) && e._outsideContentHandler(t)
                    })
                }
            }]),
            e
        }();
        n["default"] = v
    }
    , {
        "./analytics-helper.es6": 3,
        "./email-share.es6": 10,
        "./facebook-share.es6": 11,
        "./selection.es6": 31,
        "./twitter-share.es6": 37
    }],
    19: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "set-shade-id"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "set-shade-src"
                  , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "get-shade-id"
                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "get-overlay-id";
                i(this, e),
                this.dataSetSelector = t,
                this.dataSetSrcSelector = n,
                this.dataGetSelector = o,
                this.dataBgOverlaySelector = r
            }
            return o(e, [{
                key: "getImageColorProps",
                value: function(e, t) {
                    var n = document.createElement("img");
                    n.src = e,
                    n.style.display = "none",
                    document.body.appendChild(n);
                    var i = 0
                      , o = 0
                      , r = {
                        r: 0,
                        g: 0,
                        b: 0
                    };
                    n.onload = function() {
                        var e = document.createElement("canvas");
                        e.width = n.width,
                        e.height = n.height;
                        var a = e.getContext("2d");
                        a.drawImage(n, 0, 0);
                        for (var s = a.getImageData(0, 0, e.width, e.height), u = s.data, l = 300, c = void 0, d = void 0, h = void 0, f = void 0, p = 0, m = u.length; p < m; p += 4) {
                            var g = u;
                            o += 1,
                            c = g[p],
                            d = g[p + 1],
                            h = g[p + 2];
                            var v = .2989 * c + .587 * d + .114 * h;
                            g[p] = -v * l + g[p] * (1 + l),
                            g[p + 1] = -v * l + g[p + 1] * (1 + l),
                            g[p + 2] = -v * l + g[p + 2] * (1 + l),
                            g[p] > 255 && (g[p] = 255),
                            g[p + 1] > 255 && (g[p] = 255),
                            g[p + 2] > 255 && (g[p] = 255),
                            g[p] < 0 && (g[p] = 0),
                            g[p + 1] < 0 && (g[p] = 0),
                            g[p + 2] < 0 && (g[p] = 0),
                            r.r += g[p],
                            r.g += g[p + 1],
                            r.b += g[p + 2],
                            f = Math.floor((c + d + h) / 3),
                            i += f
                        }
                        var y = Math.floor(i / (n.width * n.height))
                          , b = y < 180 ? "dark" : "light";
                        r.r = Math.floor(r.r / o),
                        r.g = Math.floor(r.g / o),
                        r.b = Math.floor(r.b / o);
                        var w = "light" === b ? "255, 255, 255, 0.3" : r.r + ", " + r.b + ", " + r.g + ", 0.2";
                        t([b, y, w])
                    }
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    $("[data-" + this.dataSetSelector + "]").each(function(t, n) {
                        var i = $(n).data(e.dataSetSelector)
                          , o = $(n).data(e.dataSetSrcSelector)
                          , r = $("[data-" + e.dataGetSelector + "='" + i + "']")
                          , a = $("[data-" + e.dataBgOverlaySelector + "='" + i + "']");
                        e.getImageColorProps(o, function(e) {
                            r.addClass("shade--" + e[0]).attr("data-brightness-value", e[1]),
                            a.css({
                                "background-color": "rgba(" + e[2] + ")"
                            })
                        })
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    20: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e)
            }
            return o(e, [{
                key: "execute",
                value: function(e) {
                    $(e).find(".audio-player").each(function(e, t) {
                        $(t).find("audio").audioPlayer()
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    21: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$hero = $(".hero"),
                this.$fullCanvasImage = $(".hero-full-canvas picture img")
            }
            return o(e, [{
                key: "resizeHero",
                value: function() {
                    this.$hero.addClass("show"),
                    $(window).height() > 920 ? this.$hero.height(700) : $(window).height() > 600 ? this.$hero.height($(window).height() - 200) : this.$hero.height(400),
                    42 * $(window).width() / 100 > this.$hero.height() + 220 ? this.$fullCanvasImage.addClass("wide") : this.$fullCanvasImage.removeClass("wide")
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.resizeHero(),
                    $(window).resize(function() {
                        return e.resizeHero()
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    22: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-subscribe"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-subscribe-checkboxes"
                  , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".js-subscribe-close"
                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "body"
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ".error-message"
                  , s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : ".js-subscribe-email";
                i(this, e),
                this.$root = $(t),
                this.$body = $(r),
                this.checkboxes = n,
                this.close = o,
                this.$checkboxes = this.$root.find(n),
                this.$close = this.$root.find(o),
                this.emailField = s,
                this.errorMessage = a
            }
            return o(e, [{
                key: "_openCheckboxes",
                value: function() {
                    this.$root.addClass("active"),
                    $(this.errorMessage).remove()
                }
            }, {
                key: "_closeCheckboxes",
                value: function(e) {
                    var t = "undefined" == typeof e.target ? e.srcElement : e.target;
                    (!$(t).parents().andSelf().is(this.$checkboxes) && !$(t).is($(this.emailField)) || $(t).parents().andSelf().is(this.$close)) && this.$root.removeClass("active")
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$body.on("focus", this.emailField, function(t) {
                        return e._openCheckboxes(t)
                    }),
                    this.$body.click(function(t) {
                        return e._closeCheckboxes(t)
                    }),
                    $(this.$root).on("ajax:success", function(t, n, i, o) {
                        $(t.currentTarget).html(o.responseText),
                        e.$checkboxes = e.$root.find(e.checkboxes),
                        e.$close = e.$root.find(e.close)
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    23: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e(t) {
                i(this, e),
                this.userAgentString = t
            }
            return o(e, [{
                key: "execute",
                value: function(e) {
                    this.isIOS() && "ios"in e && e.ios(),
                    this.isDesktop() && "desktop"in e && e.desktop()
                }
            }, {
                key: "isIOS",
                value: function() {
                    return /iPhone|iPad|iPod/i.test(this.userAgentString)
                }
            }, {
                key: "isDesktop",
                value: function() {
                    return !this.isIOS()
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    24: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./modal-base.es6")
          , s = i(a)
          , u = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-modal-author-origin";
                o(this, e),
                this.$origins = $(t),
                this.activeModalSelector = ".js-modal.open"
            }
            return r(e, [{
                key: "execute",
                value: function() {
                    this.$origins.length > 0 && new s["default"](this,this.$origins).execute()
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./modal-base.es6": 25
    }],
    25: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e(t, n) {
                var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "dark"
                  , s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : ".js-modal"
                  , u = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : ".js-modal-close"
                  , l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : ".js-modal-container"
                  , c = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : "body";
                i(this, e),
                this.that = t,
                this.onOpenCallback = o,
                this.onCloseCallback = r,
                this.modalSelector = s,
                this.theme = a,
                this.modalContainerSelector = l,
                this.$closeModal = $(u),
                this.activeModalSelector = s + ".open",
                this.$origins = n,
                this.$body = $(c)
            }
            return o(e, [{
                key: "_dimensions",
                value: function(e) {
                    var t = $(e);
                    return {
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: t.offset().top - $(window).scrollTop(),
                        left: t.offset().left
                    }
                }
            }, {
                key: "_initializeModal",
                value: function(e) {
                    var t = this
                      , n = $(e)
                      , i = this._dimensions(n)
                      , o = n.children(this.modalSelector);
                    o.width(i.width).height(i.height),
                    o.click(function(e) {
                        return t._overlayClickHandler(e)
                    })
                }
            }, {
                key: "_openModal",
                value: function(e) {
                    var t = this
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null ;
                    this.$body.trigger("fixed-body", "open");
                    var i = $(e)
                      , o = "#" + i.attr("id");
                    history.pushState(null , null , o);
                    var r = i.children(this.modalSelector)
                      , a = this._dimensions(i);
                    r.css({
                        top: a.top,
                        left: a.left
                    }).addClass("open").detach(),
                    this.$body.prepend(r),
                    r.animate({
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }, 400, function() {
                        r.addClass("show-elements"),
                        n && n(t.that)
                    })
                }
            }, {
                key: "_closeModal",
                value: function() {
                    var e = this
                      , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                      , n = $(this.activeModalSelector)
                      , i = $(this.activeModalSelector).data("id")
                      , o = $("#" + i)
                      , r = this._dimensions(o);
                    this.$body.trigger("fixed-body", "close"),
                    n.removeClass("show-elements").delay(100).animate({
                        top: r.top,
                        left: r.left,
                        width: r.width,
                        height: r.height
                    }, 400, function() {
                        t && t(e.that),
                        n.detach().removeClass("open"),
                        o.append(n).css({
                            top: 0,
                            left: 0
                        }),
                        history.pushState("", document.title, window.location.pathname)
                    })
                }
            }, {
                key: "_overlayClickHandler",
                value: function(e) {
                    var t = $(e.currentTarget).find(this.modalContainerSelector);
                    t.is(":visible") && !t.is(e.target) && 0 === t.has(e.target).length && this._closeModal()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$origins.each(function(t, n) {
                        return e._initializeModal(n)
                    }),
                    this.$origins.click(function(t) {
                        return e._openModal(t.currentTarget, e.onOpenCallback)
                    }),
                    this.$closeModal.click(function() {
                        return e._closeModal(e.onCloseCallback)
                    }),
                    $(this.modalSelector + " a").on("click", function() {
                        return e.$body.trigger("fixed-body", "close")
                    }),
                    $(window).on("popstate", function() {
                        return e._closeModal(e.onCloseCallback)
                    }),
                    this.$body.keyup(function(t) {
                        27 === t.keyCode && $(e.activeModalSelector).length > 0 && e._closeModal()
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    26: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./modal-base.es6")
          , s = i(a)
          , u = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-modal-video-origin";
                o(this, e),
                this.$origins = $(t),
                this.activeModalSelector = ".js-modal.open"
            }
            return r(e, [{
                key: "_iframe",
                value: function(e) {
                    var t = $(e).data("id")
                      , n = $("#modal-video-iframe-" + t);
                    return n
                }
            }, {
                key: "_play",
                value: function(e) {
                    setTimeout(function() {
                        return e._iframe(e.activeModalSelector).vimeo("play")
                    }, 1e3)
                }
            }, {
                key: "_pause",
                value: function(e) {
                    e._iframe(e.activeModalSelector).vimeo("pause")
                }
            }, {
                key: "execute",
                value: function() {
                    this.$origins.length > 0 && new s["default"](this,this.$origins,this._play,this._pause).execute()
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./modal-base.es6": 25
    }],
    27: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-popup-origin"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".js-popup"
                  , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".js-popup-content"
                  , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".popup-overlay"
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ".js-close-popup"
                  , s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "body";
                i(this, e),
                this.popupSelector = n,
                this.popupOriginSelector = t,
                this.popupContentSelector = o,
                this.popupOverlaySelector = r,
                this.popupCloseSelector = a,
                this.activePopupSelector = n + ".open",
                this.$origins = $(t),
                this.$body = $(s)
            }
            return o(e, [{
                key: "_dimensions",
                value: function(e) {
                    var t = $(e);
                    return {
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: t.offset().top - $(window).scrollTop(),
                        left: t.offset().left
                    }
                }
            }, {
                key: "_initializePopup",
                value: function(e) {
                    var t = $(e)
                      , n = t.children(this.popupSelector)
                      , i = $(window).width() < 950;
                    if (i) {
                        var o = this._dimensions(t);
                        n.width(o.width).height(o.height)
                    }
                }
            }, {
                key: "_openPopup",
                value: function(e) {
                    var t = this
                      , n = $(e)
                      , i = n.children(this.popupSelector)
                      , o = this._dimensions(n)
                      , r = $(window).width() < 460
                      , a = $(window).width() < 950
                      , s = {
                        top: "10%",
                        left: "10%",
                        width: "80%",
                        height: "80%"
                    };
                    if (a)
                        !function() {
                            i.css({
                                top: o.top,
                                left: o.left
                            }).addClass("open").detach(),
                            t.$body.trigger("fixed-body", "open").prepend(i),
                            t.$body.prepend('<div class="popup-overlay"></div>');
                            var e = $(t.popupOverlaySelector);
                            e.addClass("active"),
                            setTimeout(function() {
                                e.addClass("visible")
                            }, 200),
                            r && (s = {
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }),
                            i.animate(s, 300, function() {
                                i.addClass("show-elements")
                            })
                        }();
                    else {
                        this._closePopup();
                        var u = 10;
                        i.attr("style", ""),
                        i.addClass("open").css("bottom", o.height + u),
                        setTimeout(function() {
                            i.addClass("show-elements")
                        }, 100)
                    }
                }
            }, {
                key: "_closePopup",
                value: function() {
                    var e = this
                      , t = $(this.activePopupSelector)
                      , n = $(this.activePopupSelector).data("id")
                      , i = $(this.popupOverlaySelector)
                      , o = $("#" + n)
                      , r = $(window).width() < 950;
                    if (r) {
                        var a = this._dimensions(o);
                        t.removeClass("show-elements").delay(50).animate({
                            top: a.top,
                            left: a.left,
                            width: a.width,
                            height: a.height
                        }, 300, function() {
                            t.removeClass("open").detach(),
                            o.append(t).css({
                                top: 0,
                                left: 0
                            }),
                            e.$body.trigger("fixed-body", "close")
                        }),
                        i.removeClass("visible"),
                        setTimeout(function() {
                            i.removeClass("active").remove()
                        }, 300)
                    } else
                        t.removeClass("show-elements"),
                        t.removeClass("open").attr("style", "")
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$origins.length > 0 && (this.$origins.each(function(t, n) {
                        var i = $(n)
                          , o = i.children(e.popupSelector);
                        i.attr("id", "popup-id-" + t),
                        o.attr("data-id", "popup-id-" + t),
                        e._initializePopup(n)
                    }),
                    this.$origins.click(function(t) {
                        var n = $(e.activePopupSelector);
                        0 !== n.has(t.target).length || n.is(t.target) || e._openPopup(t.currentTarget)
                    }),
                    this.$body.on("click", this.popupCloseSelector, function() {
                        return e._closePopup()
                    }),
                    this.$body.on("click", function(t) {
                        var n = $(e.activePopupSelector)
                          , i = $(e.popupOriginSelector);
                        n.length > 0 && (0 !== n.has(t.target).length || n.is(t.target) || i.is(t.target) || e._closePopup())
                    }),
                    this.$body.keyup(function(t) {
                        27 === t.keyCode && $(e.activePopupSelector).length > 0 && e._closePopup()
                    }))
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    
    
    29: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./scrollwatcher.es6")
          , s = i(a)
          , u = function() {
            function e() {
                o(this, e)
            }
            return r(e, [{
                key: "execute",
                value: function() {
                    var e = new s["default"]
                      , t = new s["default"]
                      , n = new s["default"];
                    e.execute({
                        object: $(".js-scrollwatcher--utility-bar"),
                        target: $(".js-scrollwatcher--utility-bar-target"),
                        includeTargetHeight: !0,
                        origin: $(".js-scrollwatcher--utility-bar-origin"),
                        objectTriggerPoint: 1,
                        breakpoint: function() {
                            return !0
                        },
                        action: function() {
                            this.target.append(this.object),
                            this.object.addClass("moved")
                        },
                        reset: function() {
                            this.origin.append(this.object),
                            this.object.removeClass("moved")
                        }
                    }),
                    t.execute({
                        object: $(".js-scrollwatcher--resource-extras-side"),
                        target: $(".js-scrollwatcher--resource-extras-side-target"),
                        includeTargetHeight: !0,
                        origin: $(".js-scrollwatcher--resource-extras-side-origin"),
                        objectTriggerPoint: 1,
                        breakpoint: function() {
                            return window.innerWidth >= 1400
                        },
                        action: function() {
                            this.target.append(this.object),
                            this.object.addClass("moved")
                        },
                        reset: function() {
                            this.origin.append(this.object),
                            this.object.removeClass("moved")
                        }
                    }),
                    n.execute({
                        object: $(".js-scrollwatcher--download-or-purchase"),
                        target: $(".js-scrollwatcher--download-or-purchase-target"),
                        includeTargetHeight: !0,
                        origin: $(".js-scrollwatcher--download-or-purchase-origin"),
                        objectTriggerPoint: 1,
                        breakpoint: function() {
                            return window.innerWidth < 620
                        },
                        action: function() {
                            this.target.append(this.object),
                            this.object.addClass("moved")
                        },
                        reset: function() {
                            this.origin.append(this.object),
                            this.object.removeClass("moved")
                        }
                    })
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./scrollwatcher.es6": 30
    }],
    30: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.pageScrollPositionOnLoad = $(window).scrollTop(),
                this.previousScrollPosition = this.pageScrollPositionOnLoad
            }
            return o(e, [{
                key: "execute",
                value: function(e) {
                    var t = this.checkRequirements(e);
                    t && this.setup(e)
                }
            }, {
                key: "checkRequirements",
                value: function(e) {
                    var t = !0
                      , n = {
                        object: e.object.length > 0,
                        target: e.target.length > 0,
                        objectTriggerPoint: e.objectTriggerPoint >= 0 && e.objectTriggerPoint <= 1,
                        breakpoint: "function" == typeof e.breakpoint,
                        action: "function" == typeof e.action,
                        reset: "function" == typeof e.reset
                    };
                    for (var i in n)
                        if (n[i] === !1) {
                            t = !1;
                            break
                        }
                    return t
                }
            }, {
                key: "setup",
                value: function(e) {
                    var t = this;
                    $(window).on("load page:load", function() {
                        var n = e.object.attr("data-breakpoint-triggered-on-load");
                        void 0 === n && (t.getCoordinates(e),
                        t.watch(e))
                    }),
                    $(window).on("scroll", function() {
                        return t.watch(e)
                    }),
                    $(window).on("resize", function() {
                        return t.checkCoordinates(e)
                    })
                }
            }, {
                key: "watch",
                value: function(e) {
                    if (e.breakpoint()) {
                        var t = e.target.offset().top
                          , n = Number(e.object.attr("data-position"))
                          , i = $(window).scrollTop()
                          , o = e.includeTargetHeight ? e.target.outerHeight() : 0
                          , r = 0;
                        r = $(window).scrollTop() + n,
                        i < this.previousScrollPosition ? r < t + o && e.object.hasClass("triggered") && (e.object.removeClass("triggered"),
                        e.reset()) : r >= t + o && !e.object.hasClass("triggered") && (e.object.addClass("triggered"),
                        e.action()),
                        this.previousScrollPosition = i
                    }
                }
            }, {
                key: "getCoordinates",
                value: function(e) {
                    if (e.breakpoint()) {
                        var t = e.object
                          , n = e.objectTriggerPoint
                          , i = $(window).outerHeight()
                          , o = t.outerHeight(!0)
                          , r = t[0].offsetTop / i
                          , a = r * i + o * n;
                        t.attr("data-viewport-height", i),
                        t.attr("data-trigger-point", n),
                        t.attr("data-location-ratio", r),
                        t.attr("data-position", a),
                        t.attr("data-breakpoint-triggered-on-load", !0)
                    }
                }
            }, {
                key: "updateCoordinates",
                value: function(e) {
                    if (e.breakpoint()) {
                        var t = e.object
                          , n = t.outerHeight(!0)
                          , i = Number(t.attr("data-location-ratio"))
                          , o = $(window).outerHeight()
                          , r = Number(t.attr("data-trigger-point"))
                          , a = i * o + n * r;
                        t.attr("data-position", a)
                    }
                }
            }, {
                key: "checkCoordinates",
                value: function(e) {
                    void 0 === e.object.attr("data-breakpoint-triggered-on-load") && e.breakpoint() && this.getCoordinates(e),
                    e.breakpoint() ? (this.updateCoordinates(e),
                    this.watch(e)) : (e.object.removeClass("triggered"),
                    e.reset())
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    31: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.selection = window.getSelection(),
                this.text = $.trim(this.selection.toString()),
                this.selectionRect = this.selection.getRangeAt(0).getBoundingClientRect()
            }
            return o(e, [{
                key: "hasSelection",
                value: function() {
                    return this.text.length > 0
                }
            }, {
                key: "getText",
                value: function() {
                    return this.text
                }
            }, {
                key: "clearSelection",
                value: function() {
                    this.selection.empty ? this.selection.empty() : this.selection.removeAllRanges && this.selection.removeAllRanges()
                }
            }, {
                key: "getCenterTopXY",
                value: function() {
                    var e = window.pageYOffset || document.documentElement.scrollTop
                      , t = window.pageXOffset || document.documentElement.scrollLeft
                      , n = this.selectionRect.left + this.selectionRect.width / 2 + t
                      , i = this.selectionRect.top + e;
                    return [n, i]
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    32: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e),
                this.$body = $("body"),
                this.$menu = $(".menu"),
                this.$menuTool = $(".header__tools__menu"),
                this.event = "header__tools__menu",
                this.hideMenuTimeout = null ,
                this.drawerSelector = ".js-left-drawer",
                this.$drawer = $(this.drawerSelector),
                this.seriesListSelector = ".series-list",
                this.seriesListContentSelector = ".series-list__content",
                this.seriesListHeaderSelector = ".series-list__header",
                this.$seriesListHeader = $(this.seriesListHeaderSelector),
                this.seriesPath = $(".js-toggle-series-nav").data("series-path"),
                this.$spinner = $(".js-left-drawer-spinner")
            }
            return o(e, [{
                key: "openDrawer",
                value: function() {
                    $(window).width() < 1400 && this.$body.trigger("fixed-body", "open"),
                    clearTimeout(this.hideMenuTimeout),
                    this.$body.addClass("series-nav-active").addClass("mask"),
                    this.$drawer.addClass("active")
                }
            }, {
                key: "closeDrawer",
                value: function() {
                    var e = this;
                    this.$body.trigger("fixed-body", "close"),
                    this.hideMenuTimeout = setTimeout(function() {
                        e.$drawer.removeClass("active"),
                        e.$drawer.scrollTop(0),
                        e.$body.removeClass("mask")
                    }, 500),
                    this.$body.removeClass("series-nav-active")
                }
            }, {
                key: "setSeriesNavHeader",
                value: function() {
                    var e = $(this.seriesListHeaderSelector).outerHeight();
                    $(this.seriesListSelector).css("padding-top", e)
                }
            }, {
                key: "setCurrentItemPosition",
                value: function() {
                    var e = $('.series-list__item[href="' + this.currentPath() + '"]');
                    e.addClass("series-list__item--current"),
                    void 0 === e.attr("data-position") && e.attr("data-position", e.position().top);
                    var t = e.attr("data-position")
                      , n = e.parent().prev("li").children(".series-list__item").outerHeight()
                      , i = $(".series-list__header").outerHeight()
                      , o = t - i - n;
                    $(this.seriesListContentSelector).scrollTop(o)
                }
            }, {
                key: "currentPath",
                value: function() {
                    return window.location.pathname
                }
            }, {
                key: "moveShareButton",
                value: function() {
                    var e = $(".resource .share-placement")
                      , t = $(".resource .share-container");
                    $(".utility-bar").append(e).append(t)
                }
            }, {
                key: "handleScrolling",
                value: function() {
                    var e = this;
                    $(this.seriesListSelector).on("scroll", function() {
                        $(e.seriesListSelector).scrollTop() > 20 ? $(e.seriesListSelector).addClass("series-scrolled") : $(e.seriesListSelector).removeClass("series-scrolled")
                    })
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    if ($(document).on("page:change", function() {
                        0 !== $(e.drawerSelector).length && ($("html").removeClass("fixed-body"),
                        e.moveShareButton())
                    }),
                    this.$body.on("click", ".series-list__header a", function() {
                        return $("html").removeClass("fixed-body")
                    }),
                    this.$body.on("touchmove", ".unfix-body, .header.fixed-body", function(t) {
                        var n = document.querySelector(".header__tools")
                          , i = 1 === $('[data-active="menu-drawer"]').length;
                        0 !== $(e.drawerSelector).length ? t.preventDefault() : !$.contains(n, t.target) && i && t.preventDefault()
                    }),
                    this.$body.on("touchend", ".unfix-body", function() {
                        return e.$body.trigger("click")
                    }),
                    0 !== $(this.drawerSelector).length) {
                        this.$body.on("click", ".js-toggle-series-nav", function() {
                            e.$body.hasClass("series-nav-active") ? e.closeDrawer() : 0 === $(e.seriesListHeaderSelector).length ? (e.$spinner.show(),
                            e.openDrawer(),
                            e.$drawer.load(e.seriesPath, function() {
                                e.setSeriesNavHeader(),
                                e.setCurrentItemPosition(),
                                e.handleScrolling()
                            })) : (e.openDrawer(),
                            e.setSeriesNavHeader(),
                            e.setCurrentItemPosition())
                        });
                        var t = '.js-close-series-nav, .unfix-body, [data-toggle="navigation-features"], [data-toggle="menu-drawer"]';
                        this.$body.on("click", t, function() {
                            return e.closeDrawer()
                        }),
                        this.$drawer.on("mouseenter", ".series-list", function() {
                            return $("html").addClass("fixed-body")
                        }),
                        this.$drawer.on("mouseleave", ".series-list", function() {
                            return $("html").removeClass("fixed-body")
                        })
                    }
                }
            }, {
                key: "_getSeriesPartialPath",
                value: function() {
                    var e = window.location.pathname.replace(/\/$/, "");
                    return e + "/" + this.seriesId
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    33: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".social-sharing.live-social"
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".facebook-count"
                  , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".twitter-count";
                i(this, e),
                this.$body = $("body"),
                this.selector = t,
                this.facebookCountSelector = n,
                this.twitterCountSelector = o
            }
            return o(e, [{
                key: "_formatCountDisplay",
                value: function(e) {
                    return e > 999 ? (e / 1e3).toFixed(1) + "K" : e
                }
            }, {
                key: "_initializeSocialMetrics",
                value: function(e) {
                    var t = this
                      , n = $(e)
                      , i = n.attr("data-link");
                    $.get("http://graph.facebook.com/" + i).done(function(e) {
                        var i = t._formatCountDisplay(e.shares);
                        n.find(t.facebookCountSelector).html(i)
                    }),
                    $.getJSON("https://cdn.api.twitter.com/1/urls/count.json?callback=?&url=" + i).done(function(e) {
                        var i = t._formatCountDisplay(e.count);
                        n.find(t.twitterCountSelector).html(i)
                    })
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$body.find(this.selector).each(function(t, n) {
                        return e._initializeSocialMetrics(n)
                    })
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    34: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./facebook-share.es6")
          , s = i(a)
          , u = e("./email-share.es6")
          , l = i(u)
          , c = e("./twitter-share.es6")
          , d = i(c)
          , h = e("./google-share.es6")
          , f = i(h)
          , p = e("./basic-share.es6")
          , m = i(p)
          , g = function() {
            function e() {
                o(this, e)
            }
            return r(e, [{
                key: "execute",
                value: function() {
                    var e = "Main Share";
                    new m["default"](e,".js-main-facebook-badge",new s["default"]).execute(),
                    new m["default"](e,".js-main-twitter-badge",new d["default"]).execute();
                    var t = "Card";
                    new m["default"](t,".js-card-facebook-badge",new s["default"]).execute(),
                    new m["default"](t,".js-card-google-plus-badge",new f["default"]).execute(),
                    new m["default"](t,".js-card-twitter-badge",new d["default"]).execute(),
                    new m["default"](t,".js-card-email-badge",new l["default"]).execute();
                    var n = "Pull Quote";
                    new m["default"](n,".js-quote-twitter-badge",new d["default"],".js-pullquote-values").execute(),
                    new m["default"](n,".js-quote-facebook-badge",new s["default"],".js-pullquote-values").execute()
                }
            }]),
            e
        }();
        n["default"] = g
    }
    , {
        "./basic-share.es6": 7,
        "./email-share.es6": 10,
        "./facebook-share.es6": 11,
        "./google-share.es6": 12,
        "./twitter-share.es6": 37
    }],
    35: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e(t, n) {
                i(this, e),
                this.$element = $(t),
                this.activeData = n
            }
            return o(e, [{
                key: "hasAttr",
                value: function(e) {
                    return this.$element.is(e) || $(e).has(this.$element).length
                }
            }, {
                key: "isToggler",
                value: function() {
                    return this.hasAttr("[data-toggle]")
                }
            }, {
                key: "isCloser",
                value: function() {
                    return this.hasAttr("[data-toggle-close]")
                }
            }, {
                key: "isActiveToggler",
                value: function() {
                    return this.hasAttr("[data-toggle=" + this.activeData + "]")
                }
            }, {
                key: "isProtected",
                value: function() {
                    return this.hasAttr("[data-toggle-protect=" + this.activeData + "]")
                }
            }, {
                key: "isLink",
                value: function() {
                    return this.$element.is("[href]") || $("[href]").has(this.$element)
                }
            }, {
                key: "isLinkInProtectedArea",
                value: function() {
                    return !(!this.isProtected() || !this.isLink())
                }
            }, {
                key: "toggleFlag",
                value: function() {
                    return this.$element.closest("[data-toggle]").data("toggle")
                }
            }, {
                key: "shouldActivate",
                value: function() {
                    if (this.activeData) {
                        if (this.isProtected() && !this.isCloser())
                            return !0;
                        if (this.isCloser())
                            return !1
                    }
                    return !(!this.isToggler() || this.isActiveToggler())
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    36: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./target-element.es6")
          , s = i(a)
          , u = function() {
            function e() {
                o(this, e),
                this.$body = $("body"),
                this.scrollStatus = !1
            }
            return r(e, [{
                key: "_activeData",
                value: function() {
                    return $("body").attr("data-active")
                }
            }, {
                key: "_processEvent",
                value: function(e) {
                    if (this.scrollStatus === !1) {
                        var t = new s["default"]($(e.target),this._activeData());
                        t.shouldActivate() ? (t.isLinkInProtectedArea() || e.preventDefault(),
                        e.stopPropagation(),
                        this.$body.attr("data-active", t.toggleFlag()),
                        $(document).trigger(t.toggleFlag() + "-activate")) : "undefined" != typeof this._activeData() && this._activeData() !== !1 && ($(document).trigger(this._activeData() + "-deactivate"),
                        this.$body.removeAttr("data-active"))
                    }
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$body.on("click", function(t) {
                        return e._processEvent(t)
                    }),
                    $(window).scroll(function() {
                        e.scrollStatus = !0,
                        clearTimeout($.data(e, "scrollCheck")),
                        $.data(e, "scrollCheck", setTimeout(function() {
                            e.scrollStatus = !1
                        }, 250))
                    })
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./target-element.es6": 35
    }],
    37: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e() {
                i(this, e);
                var t = 575
                  , n = 400
                  , o = ($(window).width() - t) / 2
                  , r = ($(window).height() - n) / 2;
                this.defaultWindowName = "Share a link on Twitter",
                this.baseUrl = "https://twitter.com/intent/tweet?",
                this.windowOptions = "status=1,width=" + t + (",height=" + n) + (",top=" + r) + (",left=" + o)
            }
            return o(e, [{
                key: "share",
                value: function(e) {
                    var t = this.baseUrl + this.encode(e);
                    window.open(t, this.defaultWindowName, this.windowOptions)
                }
            }, {
                key: "encode",
                value: function(e) {
                    var t = [];
                    for (var n in e)
                        ({}).hasOwnProperty.call(e, n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                    return t.join("&")
                }
            }, {
                key: "basicShare",
                value: function(e, t) {
                    this.share({
                        url: e,
                        text: this.shortenText(t)
                    })
                }
            }, {
                key: "shortenText",
                value: function(e) {
                    var t = 140
                      , n = 22
                      , i = 1
                      , o = 3
                      , r = t - n - i;
                    return e.length > r ? e.slice(0, r - o) + "..." : e
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    38: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = function() {
            function e(t) {
                i(this, e),
                this.$bookLink = $(t),
                this.$book = this.$bookLink.parent(),
                this.$chaptersOuter = this.$bookLink.siblings(".chapters-outer-container"),
                this.$chaptersEl = this.$chaptersOuter.children(".chapters-container"),
                this.$allBooks = $(".js-scripture-list > li"),
                this.$chaptersContainer = $(".chapters-outer-container")
            }
            return o(e, [{
                key: "toggleChapterList",
                value: function() {
                    this.$book.hasClass("active") ? this.hideChapters() : (this.hideAllOtherBooks(),
                    this.showChapters(),
                    this.adjustRowPadding())
                }
            }, {
                key: "hideAllOtherBooks",
                value: function() {
                    this.$allBooks.removeClass("active"),
                    this.$allBooks.css({
                        "padding-top": 0
                    }),
                    this.$chaptersContainer.removeClass("active show")
                }
            }, {
                key: "showChapters",
                value: function() {
                    this.$book.addClass("active"),
                    this.$chaptersOuter.addClass("active show"),
                    this.$bookLink.find("i").addClass("show")
                }
            }, {
                key: "hideChapters",
                value: function() {
                    this.$book.removeClass("active"),
                    this.$allBooks.css({
                        "padding-top": 0
                    }),
                    this.$chaptersOuter.removeClass("active"),
                    this.$chaptersOuter.removeClass("show")
                }
            }, {
                key: "adjustRowPadding",
                value: function() {
                    var e = this.$chaptersOuter.height() + 50
                      , t = this._getWindowWidth()
                      , n = this.$book.data("row-id") + 1
                      , i = $("[data-row-id='" + n + "']")
                      , o = this.$book.closest(".js-testament").children("ol").children("[data-row-id='" + n + "']");
                    t > 600 ? i.css({
                        "padding-top": e
                    }) : o.css({
                        "padding-top": e
                    })
                }
            }, {
                key: "_getWindowWidth",
                value: function() {
                    return $(window).width()
                }
            }]),
            e
        }();
        n["default"] = r
    }
    , {}],
    39: [function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , a = e("./scripture-chapter-list-handler.es6")
          , s = i(a)
          , u = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".js-scripture-list";
                o(this, e),
                this.$scriptureBookList = $(t)
            }
            return r(e, [{
                key: "bookLinkClickHandler",
                value: function(e) {
                    new s["default"](e).toggleChapterList()
                }
            }, {
                key: "execute",
                value: function() {
                    var e = this;
                    this.$scriptureBookList.on("click", "a", function(t) {
                        return e.bookLinkClickHandler(t.target)
                    })
                }
            }]),
            e
        }();
        n["default"] = u
    }
    , {
        "./scripture-chapter-list-handler.es6": 38
    }],
    40: [function(e, t) {
        !function(e, n) {
            "use strict";
            "function" == typeof define && define.amd ? define(n) : "object" == typeof t && t.exports ? t.exports = n() : e.matchesSelector = n()
        }(window, function() {
            "use strict";
            var e = function() {
                var e = Element.prototype;
                if (e.matches)
                    return "matches";
                if (e.matchesSelector)
                    return "matchesSelector";
                for (var t = ["webkit", "moz", "ms", "o"], n = 0; n < t.length; n++) {
                    var i = t[n]
                      , o = i + "MatchesSelector";
                    if (e[o])
                        return o
                }
            }();
            return function(t, n) {
                return t[e](n)
            }
        })
    }
    , {}],
    41: [function(e, t) {
        !function(e, n) {
            "function" == typeof define && define.amd ? define(n) : "object" == typeof t && t.exports ? t.exports = n() : e.EvEmitter = n()
        }("undefined" != typeof window ? window : this, function() {
            "use strict";
            function e() {}
            var t = e.prototype;
            return t.on = function(e, t) {
                if (e && t) {
                    var n = this._events = this._events || {}
                      , i = n[e] = n[e] || [];
                    return i.indexOf(t) == -1 && i.push(t),
                    this
                }
            }
            ,
            t.once = function(e, t) {
                if (e && t) {
                    this.on(e, t);
                    var n = this._onceEvents = this._onceEvents || {}
                      , i = n[e] = n[e] || {};
                    return i[t] = !0,
                    this
                }
            }
            ,
            t.off = function(e, t) {
                var n = this._events && this._events[e];
                if (n && n.length) {
                    var i = n.indexOf(t);
                    return i != -1 && n.splice(i, 1),
                    this
                }
            }
            ,
            t.emitEvent = function(e, t) {
                var n = this._events && this._events[e];
                if (n && n.length) {
                    var i = 0
                      , o = n[i];
                    t = t || [];
                    for (var r = this._onceEvents && this._onceEvents[e]; o; ) {
                        var a = r && r[o];
                        a && (this.off(e, o),
                        delete r[o]),
                        o.apply(this, t),
                        i += a ? 0 : 1,
                        o = n[i]
                    }
                    return this
                }
            }
            ,
            e
        })
    }
    , {}],
    42: [function(e, t) {
        !function(n, i) {
            "function" == typeof define && define.amd ? define(["desandro-matches-selector/matches-selector"], function(e) {
                return i(n, e)
            }) : "object" == typeof t && t.exports ? t.exports = i(n, e("desandro-matches-selector")) : n.fizzyUIUtils = i(n, n.matchesSelector)
        }(window, function(e, t) {
            "use strict";
            var n = {};
            n.extend = function(e, t) {
                for (var n in t)
                    e[n] = t[n];
                return e
            }
            ,
            n.modulo = function(e, t) {
                return (e % t + t) % t
            }
            ,
            n.makeArray = function(e) {
                var t = [];
                if (Array.isArray(e))
                    t = e;
                else if (e && "number" == typeof e.length)
                    for (var n = 0; n < e.length; n++)
                        t.push(e[n]);
                else
                    t.push(e);
                return t
            }
            ,
            n.removeFrom = function(e, t) {
                var n = e.indexOf(t);
                n != -1 && e.splice(n, 1)
            }
            ,
            n.getParent = function(e, n) {
                for (; e != document.body; )
                    if (e = e.parentNode,
                    t(e, n))
                        return e
            }
            ,
            n.getQueryElement = function(e) {
                return "string" == typeof e ? document.querySelector(e) : e
            }
            ,
            n.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }
            ,
            n.filterFindElements = function(e, i) {
                e = n.makeArray(e);
                var o = [];
                return e.forEach(function(e) {
                    if (e instanceof HTMLElement) {
                        if (!i)
                            return void o.push(e);
                        t(e, i) && o.push(e);
                        for (var n = e.querySelectorAll(i), r = 0; r < n.length; r++)
                            o.push(n[r])
                    }
                }),
                o
            }
            ,
            n.debounceMethod = function(e, t, n) {
                var i = e.prototype[t]
                  , o = t + "Timeout";
                e.prototype[t] = function() {
                    var e = this[o];
                    e && clearTimeout(e);
                    var t = arguments
                      , r = this;
                    this[o] = setTimeout(function() {
                        i.apply(r, t),
                        delete r[o]
                    }, n || 100)
                }
            }
            ,
            n.docReady = function(e) {
                var t = document.readyState;
                "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
            }
            ,
            n.toDashed = function(e) {
                return e.replace(/(.)([A-Z])/g, function(e, t, n) {
                    return t + "-" + n
                }).toLowerCase()
            }
            ;
            var i = e.console;
            return n.htmlInit = function(t, o) {
                n.docReady(function() {
                    var r = n.toDashed(o)
                      , a = "data-" + r
                      , s = document.querySelectorAll("[" + a + "]")
                      , u = document.querySelectorAll(".js-" + r)
                      , l = n.makeArray(s).concat(n.makeArray(u))
                      , c = a + "-options"
                      , d = e.jQuery;
                    l.forEach(function(e) {
                        var n, r = e.getAttribute(a) || e.getAttribute(c);
                        try {
                            n = r && JSON.parse(r)
                        } catch (t) {
                            return void (i && i.error("Error parsing " + a + " on " + e.className + ": " + t))
                        }
                        var s = new t(e,n);
                        d && d.data(e, o, s)
                    })
                })
            }
            ,
            n
        })
    }
    , {
        "desandro-matches-selector": 40
    }],
    43: [function(e, t) {
        !function(e, n) {
            "use strict";
            "function" == typeof define && define.amd ? define(function() {
                return n()
            }) : "object" == typeof t && t.exports ? t.exports = n() : e.getSize = n()
        }(window, function() {
            "use strict";
            function e(e) {
                var t = parseFloat(e)
                  , n = e.indexOf("%") == -1 && !isNaN(t);
                return n && t
            }
            function t() {}
            function n() {
                for (var e = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, t = 0; t < l; t++) {
                    var n = u[t];
                    e[n] = 0
                }
                return e
            }
            function i(e) {
                var t = getComputedStyle(e);
                return t || s("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
                t
            }
            function o() {
                if (!c) {
                    c = !0;
                    var t = document.createElement("div");
                    t.style.width = "200px",
                    t.style.padding = "1px 2px 3px 4px",
                    t.style.borderStyle = "solid",
                    t.style.borderWidth = "1px 2px 3px 4px",
                    t.style.boxSizing = "border-box";
                    var n = document.body || document.documentElement;
                    n.appendChild(t);
                    var o = i(t);
                    r.isBoxSizeOuter = a = 200 == e(o.width),
                    n.removeChild(t)
                }
            }
            function r(t) {
                if (o(),
                "string" == typeof t && (t = document.querySelector(t)),
                t && "object" == typeof t && t.nodeType) {
                    var r = i(t);
                    if ("none" == r.display)
                        return n();
                    var s = {};
                    s.width = t.offsetWidth,
                    s.height = t.offsetHeight;
                    for (var c = s.isBorderBox = "border-box" == r.boxSizing, d = 0; d < l; d++) {
                        var h = u[d]
                          , f = r[h]
                          , p = parseFloat(f);
                        s[h] = isNaN(p) ? 0 : p
                    }
                    var m = s.paddingLeft + s.paddingRight
                      , g = s.paddingTop + s.paddingBottom
                      , v = s.marginLeft + s.marginRight
                      , y = s.marginTop + s.marginBottom
                      , b = s.borderLeftWidth + s.borderRightWidth
                      , w = s.borderTopWidth + s.borderBottomWidth
                      , k = c && a
                      , x = e(r.width);
                    x !== !1 && (s.width = x + (k ? 0 : m + b));
                    var S = e(r.height);
                    return S !== !1 && (s.height = S + (k ? 0 : g + w)),
                    s.innerWidth = s.width - (m + b),
                    s.innerHeight = s.height - (g + w),
                    s.outerWidth = s.width + v,
                    s.outerHeight = s.height + y,
                    s
                }
            }
            var a, s = "undefined" == typeof console ? t : function(e) {
                console.error(e)
            }
            , u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], l = u.length, c = !1;
            return r
        })
    }
    , {}],
    44: [function(e, t) {
        !function(e, n) {
            var i = n(e, e.document);
            e.lazySizes = i,
            "object" == typeof t && t.exports && (t.exports = i)
        }(window, function(e, t) {
            "use strict";
            if (t.getElementsByClassName) {
                var n, i = t.documentElement, o = e.Date, r = e.HTMLPictureElement, a = "addEventListener", s = "getAttribute", u = e[a], l = e.setTimeout, c = e.requestAnimationFrame || l, d = e.requestIdleCallback, h = /^picture$/i, f = ["load", "error", "lazyincluded", "_lazyloaded"], p = {}, m = Array.prototype.forEach, g = function(e, t) {
                    return p[t] || (p[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
                    p[t].test(e[s]("class") || "") && p[t]
                }, v = function(e, t) {
                    g(e, t) || e.setAttribute("class", (e[s]("class") || "").trim() + " " + t)
                }, y = function(e, t) {
                    var n;
                    (n = g(e, t)) && e.setAttribute("class", (e[s]("class") || "").replace(n, " "))
                }, b = function(e, t, n) {
                    var i = n ? a : "removeEventListener";
                    n && b(e, t),
                    f.forEach(function(n) {
                        e[i](n, t)
                    })
                }, w = function(e, n, i, o, r) {
                    var a = t.createEvent("CustomEvent");
                    return a.initCustomEvent(n, !o, !r, i || {}),
                    e.dispatchEvent(a),
                    a
                }, k = function(t, i) {
                    var o;
                    !r && (o = e.picturefill || n.pf) ? o({
                        reevaluate: !0,
                        elements: [t]
                    }) : i && i.src && (t.src = i.src)
                }, x = function(e, t) {
                    return (getComputedStyle(e, null ) || {})[t]
                }, S = function(e, t, i) {
                    for (i = i || e.offsetWidth; i < n.minSize && t && !e._lazysizesWidth; )
                        i = t.offsetWidth,
                        t = t.parentNode;
                    return i
                }, T = function() {
                    var e, n, i = [], o = function() {
                        var t;
                        for (e = !0,
                        n = !1; i.length; )
                            t = i.shift(),
                            t[0].apply(t[1], t[2]);
                        e = !1
                    }, r = function(r) {
                        e ? r.apply(this, arguments) : (i.push([r, this, arguments]),
                        n || (n = !0,
                        (t.hidden ? l : c)(o)))
                    };
                    return r._lsFlush = o,
                    r
                }(), j = function(e, t) {
                    return t ? function() {
                        T(e)
                    }
                    : function() {
                        var t = this
                          , n = arguments;
                        T(function() {
                            e.apply(t, n)
                        })
                    }
                }, C = function(e) {
                    var t, n = 0, i = 125, r = 666, a = r, s = function() {
                        t = !1,
                        n = o.now(),
                        e()
                    }, u = d ? function() {
                        d(s, {
                            timeout: a
                        }),
                        a !== r && (a = r)
                    }
                    : j(function() {
                        l(s)
                    }, !0);
                    return function(e) {
                        var r;
                        (e = e === !0) && (a = 44),
                        t || (t = !0,
                        r = i - (o.now() - n),
                        r < 0 && (r = 0),
                        e || r < 9 && d ? u() : l(u, r))
                    }
                }, _ = function(e) {
                    var t, n, i = 99, r = function() {
                        t = null ,
                        e()
                    }, a = function() {
                        var e = o.now() - n;
                        e < i ? l(a, i - e) : (d || r)(r)
                    };
                    return function() {
                        n = o.now(),
                        t || (t = l(a, i))
                    }
                }, E = function() {
                    var r, c, d, f, p, S, E, $, P, M, N, L, F, z, I, O = /^img$/i, D = /^iframe$/i, R = "onscroll"in e && !/glebot/.test(navigator.userAgent), H = 0, B = 0, W = 0, q = -1, U = function(e) {
                        W--,
                        e && e.target && b(e.target, U),
                        (!e || W < 0 || !e.target) && (W = 0)
                    }, V = function(e, n) {
                        var o, r = e, a = "hidden" == x(t.body, "visibility") || "hidden" != x(e, "visibility");
                        for (P -= n,
                        L += n,
                        M -= n,
                        N += n; a && (r = r.offsetParent) && r != t.body && r != i; )
                            a = (x(r, "opacity") || 1) > 0,
                            a && "visible" != x(r, "overflow") && (o = r.getBoundingClientRect(),
                            a = N > o.left && M < o.right && L > o.top - 1 && P < o.bottom + 1);
                        return a
                    }, Q = function() {
                        var e, o, a, u, l, h, f, m, g;
                        if ((p = n.loadMode) && W < 8 && (e = r.length)) {
                            o = 0,
                            q++,
                            null == z && ("expand"in n || (n.expand = i.clientHeight > 500 && i.clientWidth > 500 ? 500 : 370),
                            F = n.expand,
                            z = F * n.expFactor),
                            B < z && W < 1 && q > 2 && p > 2 && !t.hidden ? (B = z,
                            q = 0) : B = p > 1 && q > 1 && W < 6 ? F : H;
                            for (; o < e; o++)
                                if (r[o] && !r[o]._lazyRace)
                                    if (R)
                                        if ((m = r[o][s]("data-expand")) && (h = 1 * m) || (h = B),
                                        g !== h && (E = innerWidth + h * I,
                                        $ = innerHeight + h,
                                        f = h * -1,
                                        g = h),
                                        a = r[o].getBoundingClientRect(),
                                        (L = a.bottom) >= f && (P = a.top) <= $ && (N = a.right) >= f * I && (M = a.left) <= E && (L || N || M || P) && (d && W < 3 && !m && (p < 3 || q < 4) || V(r[o], h))) {
                                            if (te(r[o]),
                                            l = !0,
                                            W > 9)
                                                break
                                        } else
                                            !l && d && !u && W < 4 && q < 4 && p > 2 && (c[0] || n.preloadAfterLoad) && (c[0] || !m && (L || N || M || P || "auto" != r[o][s](n.sizesAttr))) && (u = c[0] || r[o]);
                                    else
                                        te(r[o]);
                            u && !l && te(u)
                        }
                    }, G = C(Q), Y = function(e) {
                        v(e.target, n.loadedClass),
                        y(e.target, n.loadingClass),
                        b(e.target, J)
                    }, X = j(Y), J = function(e) {
                        X({
                            target: e.target
                        })
                    }, K = function(e, t) {
                        try {
                            e.contentWindow.location.replace(t)
                        } catch (n) {
                            e.src = t
                        }
                    }, Z = function(e) {
                        var t, i, o = e[s](n.srcsetAttr);
                        (t = n.customMedia[e[s]("data-media") || e[s]("media")]) && e.setAttribute("media", t),
                        o && e.setAttribute("srcset", o),
                        t && (i = e.parentNode,
                        i.insertBefore(e.cloneNode(), e),
                        i.removeChild(e))
                    }, ee = j(function(e, t, i, o, r) {
                        var a, u, c, d, p, g;
                        (p = w(e, "lazybeforeunveil", t)).defaultPrevented || (o && (i ? v(e, n.autosizesClass) : e.setAttribute("sizes", o)),
                        u = e[s](n.srcsetAttr),
                        a = e[s](n.srcAttr),
                        r && (c = e.parentNode,
                        d = c && h.test(c.nodeName || "")),
                        g = t.firesLoad || "src"in e && (u || a || d),
                        p = {
                            target: e
                        },
                        g && (b(e, U, !0),
                        clearTimeout(f),
                        f = l(U, 2500),
                        v(e, n.loadingClass),
                        b(e, J, !0)),
                        d && m.call(c.getElementsByTagName("source"), Z),
                        u ? e.setAttribute("srcset", u) : a && !d && (D.test(e.nodeName) ? K(e, a) : e.src = a),
                        (u || d) && k(e, {
                            src: a
                        })),
                        T(function() {
                            e._lazyRace && delete e._lazyRace,
                            y(e, n.lazyClass),
                            g && !e.complete || (g ? U(p) : W--,
                            Y(p))
                        })
                    }), te = function(e) {
                        var t, i = O.test(e.nodeName), o = i && (e[s](n.sizesAttr) || e[s]("sizes")), r = "auto" == o;
                        (!r && d || !i || !e.src && !e.srcset || e.complete || g(e, n.errorClass)) && (t = w(e, "lazyunveilread").detail,
                        r && A.updateElem(e, !0, e.offsetWidth),
                        e._lazyRace = !0,
                        W++,
                        ee(e, t, r, o, i))
                    }, ne = function() {
                        if (!d) {
                            if (o.now() - S < 999)
                                return void l(ne, 999);
                            var e = _(function() {
                                n.loadMode = 3,
                                G()
                            });
                            d = !0,
                            n.loadMode = 3,
                            G(),
                            u("scroll", function() {
                                3 == n.loadMode && (n.loadMode = 2),
                                e()
                            }, !0)
                        }
                    };
                    return {
                        _: function() {
                            S = o.now(),
                            r = t.getElementsByClassName(n.lazyClass),
                            c = t.getElementsByClassName(n.lazyClass + " " + n.preloadClass),
                            I = n.hFac,
                            u("scroll", G, !0),
                            u("resize", G, !0),
                            e.MutationObserver ? new MutationObserver(G).observe(i, {
                                childList: !0,
                                subtree: !0,
                                attributes: !0
                            }) : (i[a]("DOMNodeInserted", G, !0),
                            i[a]("DOMAttrModified", G, !0),
                            setInterval(G, 999)),
                            u("hashchange", G, !0),
                            ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(e) {
                                t[a](e, G, !0)
                            }),
                            /d$|^c/.test(t.readyState) ? ne() : (u("load", ne),
                            t[a]("DOMContentLoaded", G),
                            l(ne, 2e4)),
                            r.length ? Q() : G()
                        },
                        checkElems: G,
                        unveil: te
                    }
                }(), A = function() {
                    var e, i = j(function(e, t, n, i) {
                        var o, r, a;
                        if (e._lazysizesWidth = i,
                        i += "px",
                        e.setAttribute("sizes", i),
                        h.test(t.nodeName || ""))
                            for (o = t.getElementsByTagName("source"),
                            r = 0,
                            a = o.length; r < a; r++)
                                o[r].setAttribute("sizes", i);
                        n.detail.dataAttr || k(e, n.detail)
                    }), o = function(e, t, n) {
                        var o, r = e.parentNode;
                        r && (n = S(e, r, n),
                        o = w(e, "lazybeforesizes", {
                            width: n,
                            dataAttr: !!t
                        }),
                        o.defaultPrevented || (n = o.detail.width,
                        n && n !== e._lazysizesWidth && i(e, r, o, n)))
                    }, r = function() {
                        var t, n = e.length;
                        if (n)
                            for (t = 0; t < n; t++)
                                o(e[t])
                    }, a = _(r);
                    return {
                        _: function() {
                            e = t.getElementsByClassName(n.autosizesClass),
                            u("resize", a)
                        },
                        checkElems: a,
                        updateElem: o
                    }
                }(), $ = function() {
                    $.i || ($.i = !0,
                    A._(),
                    E._())
                };
                return function() {
                    var t, i = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
                        srcAttr: "data-src",
                        srcsetAttr: "data-srcset",
                        sizesAttr: "data-sizes",
                        minSize: 40,
                        customMedia: {},
                        init: !0,
                        expFactor: 1.5,
                        hFac: .8,
                        loadMode: 2
                    };
                    n = e.lazySizesConfig || e.lazysizesConfig || {};
                    for (t in i)
                        t in n || (n[t] = i[t]);
                    e.lazySizesConfig = n,
                    l(function() {
                        n.init && $()
                    })
                }(),
                {
                    cfg: n,
                    autoSizer: A,
                    loader: E,
                    init: $,
                    uP: k,
                    aC: v,
                    rC: y,
                    hC: g,
                    fire: w,
                    gW: S,
                    rAF: T
                }
            }
        })
    }
    , {}],
    45: [function(e, t) {
        !function(n, i) {
            "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], i) : "object" == typeof t && t.exports ? t.exports = i(e("outlayer"), e("get-size")) : n.Masonry = i(n.Outlayer, n.getSize)
        }(window, function(e, t) {
            "use strict";
            var n = e.create("masonry");
            return n.compatOptions.fitWidth = "isFitWidth",
            n.prototype._resetLayout = function() {
                this.getSize(),
                this._getMeasurement("columnWidth", "outerWidth"),
                this._getMeasurement("gutter", "outerWidth"),
                this.measureColumns(),
                this.colYs = [];
                for (var e = 0; e < this.cols; e++)
                    this.colYs.push(0);
                this.maxY = 0
            }
            ,
            n.prototype.measureColumns = function() {
                if (this.getContainerWidth(),
                !this.columnWidth) {
                    var e = this.items[0]
                      , n = e && e.element;
                    this.columnWidth = n && t(n).outerWidth || this.containerWidth
                }
                var i = this.columnWidth += this.gutter
                  , o = this.containerWidth + this.gutter
                  , r = o / i
                  , a = i - o % i
                  , s = a && a < 1 ? "round" : "floor";
                r = Math[s](r),
                this.cols = Math.max(r, 1)
            }
            ,
            n.prototype.getContainerWidth = function() {
                var e = this._getOption("fitWidth")
                  , n = e ? this.element.parentNode : this.element
                  , i = t(n);
                this.containerWidth = i && i.innerWidth
            }
            ,
            n.prototype._getItemLayoutPosition = function(e) {
                e.getSize();
                var t = e.size.outerWidth % this.columnWidth
                  , n = t && t < 1 ? "round" : "ceil"
                  , i = Math[n](e.size.outerWidth / this.columnWidth);
                i = Math.min(i, this.cols);
                for (var o = this._getColGroup(i), r = Math.min.apply(Math, o), a = o.indexOf(r), s = {
                    x: this.columnWidth * a,
                    y: r
                }, u = r + e.size.outerHeight, l = this.cols + 1 - o.length, c = 0; c < l; c++)
                    this.colYs[a + c] = u;
                return s
            }
            ,
            n.prototype._getColGroup = function(e) {
                if (e < 2)
                    return this.colYs;
                for (var t = [], n = this.cols + 1 - e, i = 0; i < n; i++) {
                    var o = this.colYs.slice(i, i + e);
                    t[i] = Math.max.apply(Math, o)
                }
                return t
            }
            ,
            n.prototype._manageStamp = function(e) {
                var n = t(e)
                  , i = this._getElementOffset(e)
                  , o = this._getOption("originLeft")
                  , r = o ? i.left : i.right
                  , a = r + n.outerWidth
                  , s = Math.floor(r / this.columnWidth);
                s = Math.max(0, s);
                var u = Math.floor(a / this.columnWidth);
                u -= a % this.columnWidth ? 0 : 1,
                u = Math.min(this.cols - 1, u);
                for (var l = this._getOption("originTop"), c = (l ? i.top : i.bottom) + n.outerHeight, d = s; d <= u; d++)
                    this.colYs[d] = Math.max(c, this.colYs[d])
            }
            ,
            n.prototype._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var e = {
                    height: this.maxY
                };
                return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()),
                e
            }
            ,
            n.prototype._getContainerFitWidth = function() {
                for (var e = 0, t = this.cols; --t && 0 === this.colYs[t]; )
                    e++;
                return (this.cols - e) * this.columnWidth - this.gutter
            }
            ,
            n.prototype.needsResizeLayout = function() {
                var e = this.containerWidth;
                return this.getContainerWidth(),
                e != this.containerWidth
            }
            ,
            n
        })
    }
    , {
        "get-size": 43,
        outlayer: 47
    }],
    46: [function(e, t) {
        !function(n, i) {
            "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter", "get-size/get-size"], i) : "object" == typeof t && t.exports ? t.exports = i(e("ev-emitter"), e("get-size")) : (n.Outlayer = {},
            n.Outlayer.Item = i(n.EvEmitter, n.getSize))
        }(window, function(e, t) {
            "use strict";
            function n(e) {
                for (var t in e)
                    return !1;
                return t = null ,
                !0
            }
            function i(e, t) {
                e && (this.element = e,
                this.layout = t,
                this.position = {
                    x: 0,
                    y: 0
                },
                this._create())
            }
            function o(e) {
                return e.replace(/([A-Z])/g, function(e) {
                    return "-" + e.toLowerCase()
                })
            }
            var r = document.documentElement.style
              , a = "string" == typeof r.transition ? "transition" : "WebkitTransition"
              , s = "string" == typeof r.transform ? "transform" : "WebkitTransform"
              , u = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            }[a]
              , l = {
                transform: s,
                transition: a,
                transitionDuration: a + "Duration",
                transitionProperty: a + "Property",
                transitionDelay: a + "Delay"
            }
              , c = i.prototype = Object.create(e.prototype);
            c.constructor = i,
            c._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                },
                this.css({
                    position: "absolute"
                })
            }
            ,
            c.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }
            ,
            c.getSize = function() {
                this.size = t(this.element)
            }
            ,
            c.css = function(e) {
                var t = this.element.style;
                for (var n in e) {
                    var i = l[n] || n;
                    t[i] = e[n]
                }
            }
            ,
            c.getPosition = function() {
                var e = getComputedStyle(this.element)
                  , t = this.layout._getOption("originLeft")
                  , n = this.layout._getOption("originTop")
                  , i = e[t ? "left" : "right"]
                  , o = e[n ? "top" : "bottom"]
                  , r = this.layout.size
                  , a = i.indexOf("%") != -1 ? parseFloat(i) / 100 * r.width : parseInt(i, 10)
                  , s = o.indexOf("%") != -1 ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
                a = isNaN(a) ? 0 : a,
                s = isNaN(s) ? 0 : s,
                a -= t ? r.paddingLeft : r.paddingRight,
                s -= n ? r.paddingTop : r.paddingBottom,
                this.position.x = a,
                this.position.y = s
            }
            ,
            c.layoutPosition = function() {
                var e = this.layout.size
                  , t = {}
                  , n = this.layout._getOption("originLeft")
                  , i = this.layout._getOption("originTop")
                  , o = n ? "paddingLeft" : "paddingRight"
                  , r = n ? "left" : "right"
                  , a = n ? "right" : "left"
                  , s = this.position.x + e[o];
                t[r] = this.getXValue(s),
                t[a] = "";
                var u = i ? "paddingTop" : "paddingBottom"
                  , l = i ? "top" : "bottom"
                  , c = i ? "bottom" : "top"
                  , d = this.position.y + e[u];
                t[l] = this.getYValue(d),
                t[c] = "",
                this.css(t),
                this.emitEvent("layout", [this])
            }
            ,
            c.getXValue = function(e) {
                var t = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
            }
            ,
            c.getYValue = function(e) {
                var t = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
            }
            ,
            c._transitionTo = function(e, t) {
                this.getPosition();
                var n = this.position.x
                  , i = this.position.y
                  , o = parseInt(e, 10)
                  , r = parseInt(t, 10)
                  , a = o === this.position.x && r === this.position.y;
                if (this.setPosition(e, t),
                a && !this.isTransitioning)
                    return void this.layoutPosition();
                var s = e - n
                  , u = t - i
                  , l = {};
                l.transform = this.getTranslate(s, u),
                this.transition({
                    to: l,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }
            ,
            c.getTranslate = function(e, t) {
                var n = this.layout._getOption("originLeft")
                  , i = this.layout._getOption("originTop");
                return e = n ? e : -e,
                t = i ? t : -t,
                "translate3d(" + e + "px, " + t + "px, 0)"
            }
            ,
            c.goTo = function(e, t) {
                this.setPosition(e, t),
                this.layoutPosition()
            }
            ,
            c.moveTo = c._transitionTo,
            c.setPosition = function(e, t) {
                this.position.x = parseInt(e, 10),
                this.position.y = parseInt(t, 10)
            }
            ,
            c._nonTransition = function(e) {
                this.css(e.to),
                e.isCleaning && this._removeStyles(e.to);
                for (var t in e.onTransitionEnd)
                    e.onTransitionEnd[t].call(this)
            }
            ,
            c.transition = function(e) {
                if (!parseFloat(this.layout.options.transitionDuration))
                    return void this._nonTransition(e);
                var t = this._transn;
                for (var n in e.onTransitionEnd)
                    t.onEnd[n] = e.onTransitionEnd[n];
                for (n in e.to)
                    t.ingProperties[n] = !0,
                    e.isCleaning && (t.clean[n] = !0);
                if (e.from) {
                    this.css(e.from);
                    var i = this.element.offsetHeight;
                    i = null
                }
                this.enableTransition(e.to),
                this.css(e.to),
                this.isTransitioning = !0
            }
            ;
            var d = "opacity," + o(s);
            c.enableTransition = function() {
                if (!this.isTransitioning) {
                    var e = this.layout.options.transitionDuration;
                    e = "number" == typeof e ? e + "ms" : e,
                    this.css({
                        transitionProperty: d,
                        transitionDuration: e,
                        transitionDelay: this.staggerDelay || 0
                    }),
                    this.element.addEventListener(u, this, !1)
                }
            }
            ,
            c.onwebkitTransitionEnd = function(e) {
                this.ontransitionend(e)
            }
            ,
            c.onotransitionend = function(e) {
                this.ontransitionend(e)
            }
            ;
            var h = {
                "-webkit-transform": "transform"
            };
            c.ontransitionend = function(e) {
                if (e.target === this.element) {
                    var t = this._transn
                      , i = h[e.propertyName] || e.propertyName;
                    if (delete t.ingProperties[i],
                    n(t.ingProperties) && this.disableTransition(),
                    i in t.clean && (this.element.style[e.propertyName] = "",
                    delete t.clean[i]),
                    i in t.onEnd) {
                        var o = t.onEnd[i];
                        o.call(this),
                        delete t.onEnd[i]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }
            ,
            c.disableTransition = function() {
                this.removeTransitionStyles(),
                this.element.removeEventListener(u, this, !1),
                this.isTransitioning = !1
            }
            ,
            c._removeStyles = function(e) {
                var t = {};
                for (var n in e)
                    t[n] = "";
                this.css(t)
            }
            ;
            var f = {
                transitionProperty: "",
                transitionDuration: "",
                transitionDelay: ""
            };
            return c.removeTransitionStyles = function() {
                this.css(f)
            }
            ,
            c.stagger = function(e) {
                e = isNaN(e) ? 0 : e,
                this.staggerDelay = e + "ms"
            }
            ,
            c.removeElem = function() {
                this.element.parentNode.removeChild(this.element),
                this.css({
                    display: ""
                }),
                this.emitEvent("remove", [this])
            }
            ,
            c.remove = function() {
                return a && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
                    this.removeElem()
                }),
                void this.hide()) : void this.removeElem()
            }
            ,
            c.reveal = function() {
                delete this.isHidden,
                this.css({
                    display: ""
                });
                var e = this.layout.options
                  , t = {}
                  , n = this.getHideRevealTransitionEndProperty("visibleStyle");
                t[n] = this.onRevealTransitionEnd,
                this.transition({
                    from: e.hiddenStyle,
                    to: e.visibleStyle,
                    isCleaning: !0,
                    onTransitionEnd: t
                })
            }
            ,
            c.onRevealTransitionEnd = function() {
                this.isHidden || this.emitEvent("reveal")
            }
            ,
            c.getHideRevealTransitionEndProperty = function(e) {
                var t = this.layout.options[e];
                if (t.opacity)
                    return "opacity";
                for (var n in t)
                    return n
            }
            ,
            c.hide = function() {
                this.isHidden = !0,
                this.css({
                    display: ""
                });
                var e = this.layout.options
                  , t = {}
                  , n = this.getHideRevealTransitionEndProperty("hiddenStyle");
                t[n] = this.onHideTransitionEnd,
                this.transition({
                    from: e.visibleStyle,
                    to: e.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: t
                })
            }
            ,
            c.onHideTransitionEnd = function() {
                this.isHidden && (this.css({
                    display: "none"
                }),
                this.emitEvent("hide"))
            }
            ,
            c.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }
            ,
            i
        })
    }
    , {
        "ev-emitter": 41,
        "get-size": 43
    }],
    47: [function(e, t) {
        !function(n, i) {
            "use strict";
            "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(e, t, o, r) {
                return i(n, e, t, o, r)
            }) : "object" == typeof t && t.exports ? t.exports = i(n, e("ev-emitter"), e("get-size"), e("fizzy-ui-utils"), e("./item")) : n.Outlayer = i(n, n.EvEmitter, n.getSize, n.fizzyUIUtils, n.Outlayer.Item)
        }(window, function(e, t, n, i, o) {
            "use strict";
            function r(e, t) {
                var n = i.getQueryElement(e);
                if (!n)
                    return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (n || e)));
                this.element = n,
                l && (this.$element = l(this.element)),
                this.options = i.extend({}, this.constructor.defaults),
                this.option(t);
                var o = ++d;
                this.element.outlayerGUID = o,
                h[o] = this,
                this._create();
                var r = this._getOption("initLayout");
                r && this.layout()
            }
            function a(e) {
                function t() {
                    e.apply(this, arguments)
                }
                return t.prototype = Object.create(e.prototype),
                t.prototype.constructor = t,
                t
            }
            function s(e) {
                if ("number" == typeof e)
                    return e;
                var t = e.match(/(^\d*\.?\d*)(\w*)/)
                  , n = t && t[1]
                  , i = t && t[2];
                if (!n.length)
                    return 0;
                n = parseFloat(n);
                var o = p[i] || 1;
                return n * o
            }
            var u = e.console
              , l = e.jQuery
              , c = function() {}
              , d = 0
              , h = {};
            r.namespace = "outlayer",
            r.Item = o,
            r.defaults = {
                containerStyle: {
                    position: "relative"
                },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            };
            var f = r.prototype;
            i.extend(f, t.prototype),
            f.option = function(e) {
                i.extend(this.options, e)
            }
            ,
            f._getOption = function(e) {
                var t = this.constructor.compatOptions[e];
                return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
            }
            ,
            r.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer"
            },
            f._create = function() {
                this.reloadItems(),
                this.stamps = [],
                this.stamp(this.options.stamp),
                i.extend(this.element.style, this.options.containerStyle);
                var e = this._getOption("resize");
                e && this.bindResize()
            }
            ,
            f.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }
            ,
            f._itemize = function(e) {
                for (var t = this._filterFindItemElements(e), n = this.constructor.Item, i = [], o = 0; o < t.length; o++) {
                    var r = t[o]
                      , a = new n(r,this);
                    i.push(a)
                }
                return i
            }
            ,
            f._filterFindItemElements = function(e) {
                return i.filterFindElements(e, this.options.itemSelector)
            }
            ,
            f.getItemElements = function() {
                return this.items.map(function(e) {
                    return e.element
                })
            }
            ,
            f.layout = function() {
                this._resetLayout(),
                this._manageStamps();
                var e = this._getOption("layoutInstant")
                  , t = void 0 !== e ? e : !this._isLayoutInited;
                this.layoutItems(this.items, t),
                this._isLayoutInited = !0
            }
            ,
            f._init = f.layout,
            f._resetLayout = function() {
                this.getSize()
            }
            ,
            f.getSize = function() {
                this.size = n(this.element)
            }
            ,
            f._getMeasurement = function(e, t) {
                var i, o = this.options[e];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : o instanceof HTMLElement && (i = o),
                this[e] = i ? n(i)[t] : o) : this[e] = 0
            }
            ,
            f.layoutItems = function(e, t) {
                e = this._getItemsForLayout(e),
                this._layoutItems(e, t),
                this._postLayout()
            }
            ,
            f._getItemsForLayout = function(e) {
                return e.filter(function(e) {
                    return !e.isIgnored
                })
            }
            ,
            f._layoutItems = function(e, t) {
                if (this._emitCompleteOnItems("layout", e),
                e && e.length) {
                    var n = [];
                    e.forEach(function(e) {
                        var i = this._getItemLayoutPosition(e);
                        i.item = e,
                        i.isInstant = t || e.isLayoutInstant,
                        n.push(i)
                    }, this),
                    this._processLayoutQueue(n)
                }
            }
            ,
            f._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }
            ,
            f._processLayoutQueue = function(e) {
                this.updateStagger(),
                e.forEach(function(e, t) {
                    this._positionItem(e.item, e.x, e.y, e.isInstant, t)
                }, this)
            }
            ,
            f.updateStagger = function() {
                var e = this.options.stagger;
                return null === e || void 0 === e ? void (this.stagger = 0) : (this.stagger = s(e),
                this.stagger)
            }
            ,
            f._positionItem = function(e, t, n, i, o) {
                i ? e.goTo(t, n) : (e.stagger(o * this.stagger),
                e.moveTo(t, n))
            }
            ,
            f._postLayout = function() {
                this.resizeContainer()
            }
            ,
            f.resizeContainer = function() {
                var e = this._getOption("resizeContainer");
                if (e) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0),
                    this._setContainerMeasure(t.height, !1))
                }
            }
            ,
            f._getContainerSize = c,
            f._setContainerMeasure = function(e, t) {
                if (void 0 !== e) {
                    var n = this.size;
                    n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth),
                    e = Math.max(e, 0),
                    this.element.style[t ? "width" : "height"] = e + "px"
                }
            }
            ,
            f._emitCompleteOnItems = function(e, t) {
                function n() {
                    o.dispatchEvent(e + "Complete", null , [t])
                }
                function i() {
                    a++,
                    a == r && n()
                }
                var o = this
                  , r = t.length;
                if (!t || !r)
                    return void n();
                var a = 0;
                t.forEach(function(t) {
                    t.once(e, i)
                })
            }
            ,
            f.dispatchEvent = function(e, t, n) {
                var i = t ? [t].concat(n) : n;
                if (this.emitEvent(e, i),
                l)
                    if (this.$element = this.$element || l(this.element),
                    t) {
                        var o = l.Event(t);
                        o.type = e,
                        this.$element.trigger(o, n)
                    } else
                        this.$element.trigger(e, n)
            }
            ,
            f.ignore = function(e) {
                var t = this.getItem(e);
                t && (t.isIgnored = !0)
            }
            ,
            f.unignore = function(e) {
                var t = this.getItem(e);
                t && delete t.isIgnored
            }
            ,
            f.stamp = function(e) {
                e = this._find(e),
                e && (this.stamps = this.stamps.concat(e),
                e.forEach(this.ignore, this))
            }
            ,
            f.unstamp = function(e) {
                e = this._find(e),
                e && e.forEach(function(e) {
                    i.removeFrom(this.stamps, e),
                    this.unignore(e)
                }, this)
            }
            ,
            f._find = function(e) {
                if (e)
                    return "string" == typeof e && (e = this.element.querySelectorAll(e)),
                    e = i.makeArray(e)
            }
            ,
            f._manageStamps = function() {
                this.stamps && this.stamps.length && (this._getBoundingRect(),
                this.stamps.forEach(this._manageStamp, this))
            }
            ,
            f._getBoundingRect = function() {
                var e = this.element.getBoundingClientRect()
                  , t = this.size;
                this._boundingRect = {
                    left: e.left + t.paddingLeft + t.borderLeftWidth,
                    top: e.top + t.paddingTop + t.borderTopWidth,
                    right: e.right - (t.paddingRight + t.borderRightWidth),
                    bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
                }
            }
            ,
            f._manageStamp = c,
            f._getElementOffset = function(e) {
                var t = e.getBoundingClientRect()
                  , i = this._boundingRect
                  , o = n(e)
                  , r = {
                    left: t.left - i.left - o.marginLeft,
                    top: t.top - i.top - o.marginTop,
                    right: i.right - t.right - o.marginRight,
                    bottom: i.bottom - t.bottom - o.marginBottom
                };
                return r
            }
            ,
            f.handleEvent = i.handleEvent,
            f.bindResize = function() {
                e.addEventListener("resize", this),
                this.isResizeBound = !0
            }
            ,
            f.unbindResize = function() {
                e.removeEventListener("resize", this),
                this.isResizeBound = !1
            }
            ,
            f.onresize = function() {
                this.resize()
            }
            ,
            i.debounceMethod(r, "onresize", 100),
            f.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }
            ,
            f.needsResizeLayout = function() {
                var e = n(this.element)
                  , t = this.size && e;
                return t && e.innerWidth !== this.size.innerWidth
            }
            ,
            f.addItems = function(e) {
                var t = this._itemize(e);
                return t.length && (this.items = this.items.concat(t)),
                t
            }
            ,
            f.appended = function(e) {
                var t = this.addItems(e);
                t.length && (this.layoutItems(t, !0),
                this.reveal(t))
            }
            ,
            f.prepended = function(e) {
                var t = this._itemize(e);
                if (t.length) {
                    var n = this.items.slice(0);
                    this.items = t.concat(n),
                    this._resetLayout(),
                    this._manageStamps(),
                    this.layoutItems(t, !0),
                    this.reveal(t),
                    this.layoutItems(n)
                }
            }
            ,
            f.reveal = function(e) {
                if (this._emitCompleteOnItems("reveal", e),
                e && e.length) {
                    var t = this.updateStagger();
                    e.forEach(function(e, n) {
                        e.stagger(n * t),
                        e.reveal()
                    })
                }
            }
            ,
            f.hide = function(e) {
                if (this._emitCompleteOnItems("hide", e),
                e && e.length) {
                    var t = this.updateStagger();
                    e.forEach(function(e, n) {
                        e.stagger(n * t),
                        e.hide()
                    })
                }
            }
            ,
            f.revealItemElements = function(e) {
                var t = this.getItems(e);
                this.reveal(t)
            }
            ,
            f.hideItemElements = function(e) {
                var t = this.getItems(e);
                this.hide(t)
            }
            ,
            f.getItem = function(e) {
                for (var t = 0; t < this.items.length; t++) {
                    var n = this.items[t];
                    if (n.element == e)
                        return n
                }
            }
            ,
            f.getItems = function(e) {
                e = i.makeArray(e);
                var t = [];
                return e.forEach(function(e) {
                    var n = this.getItem(e);
                    n && t.push(n)
                }, this),
                t
            }
            ,
            f.remove = function(e) {
                var t = this.getItems(e);
                this._emitCompleteOnItems("remove", t),
                t && t.length && t.forEach(function(e) {
                    e.remove(),
                    i.removeFrom(this.items, e)
                }, this)
            }
            ,
            f.destroy = function() {
                var e = this.element.style;
                e.height = "",
                e.position = "",
                e.width = "",
                this.items.forEach(function(e) {
                    e.destroy()
                }),
                this.unbindResize();
                var t = this.element.outlayerGUID;
                delete h[t],
                delete this.element.outlayerGUID,
                l && l.removeData(this.element, this.constructor.namespace)
            }
            ,
            r.data = function(e) {
                e = i.getQueryElement(e);
                var t = e && e.outlayerGUID;
                return t && h[t]
            }
            ,
            r.create = function(e, t) {
                var n = a(r);
                return n.defaults = i.extend({}, r.defaults),
                i.extend(n.defaults, t),
                n.compatOptions = i.extend({}, r.compatOptions),
                n.namespace = e,
                n.data = r.data,
                n.Item = a(o),
                i.htmlInit(n, e),
                l && l.bridget && l.bridget(e, n),
                n
            }
            ;
            var p = {
                ms: 1,
                s: 1e3
            };
            return r.Item = o,
            r
        })
    }
    , {
        "./item": 46,
        "ev-emitter": 41,
        "fizzy-ui-utils": 42,
        "get-size": 43
    }],
    48: [function(e, t) {
        !function(e) {
            var t = navigator.userAgent;
            e.HTMLPictureElement && /ecko/.test(t) && t.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", function() {
                var t, n = document.createElement("source"), i = function(e) {
                    var t, i, o = e.parentNode;
                    "PICTURE" === o.nodeName.toUpperCase() ? (t = n.cloneNode(),
                    o.insertBefore(t, o.firstElementChild),
                    setTimeout(function() {
                        o.removeChild(t)
                    })) : (!e._pfLastSize || e.offsetWidth > e._pfLastSize) && (e._pfLastSize = e.offsetWidth,
                    i = e.sizes,
                    e.sizes += ",100vw",
                    setTimeout(function() {
                        e.sizes = i
                    }))
                }, o = function() {
                    var e, t = document.querySelectorAll("picture > img, img[srcset][sizes]");
                    for (e = 0; e < t.length; e++)
                        i(t[e])
                }, r = function() {
                    clearTimeout(t),
                    t = setTimeout(o, 99)
                }, a = e.matchMedia && matchMedia("(orientation: landscape)"), s = function() {
                    r(),
                    a && a.addListener && a.addListener(r)
                };
                return n.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                /^[c|i]|d$/.test(document.readyState || "") ? s() : document.addEventListener("DOMContentLoaded", s),
                r
            }())
        }(window),
        function(e, n, i) {
            "use strict";
            function o(e) {
                return " " === e || "\t" === e || "\n" === e || "\f" === e || "\r" === e
            }
            function r(t, n) {
                var i = new e.Image;
                return i.onerror = function() {
                    _[t] = !1,
                    ne()
                }
                ,
                i.onload = function() {
                    _[t] = 1 === i.width,
                    ne()
                }
                ,
                i.src = n,
                "pending"
            }
            function a() {
                D = !1,
                B = e.devicePixelRatio,
                R = {},
                H = {},
                b.DPR = B || 1,
                W.width = Math.max(e.innerWidth || 0, C.clientWidth),
                W.height = Math.max(e.innerHeight || 0, C.clientHeight),
                W.vw = W.width / 100,
                W.vh = W.height / 100,
                y = [W.height, W.width, B].join("-"),
                W.em = b.getEmValue(),
                W.rem = W.em
            }
            function s(e, t, n, i) {
                var o, r, a, s;
                return "saveData" === E.algorithm ? e > 2.7 ? s = n + 1 : (r = t - n,
                o = Math.pow(e - .6, 1.5),
                a = r * o,
                i && (a += .1 * o),
                s = e + a) : s = n > 1 ? Math.sqrt(e * t) : e,
                s > n
            }
            function u(e) {
                var t, n = b.getSet(e), i = !1;
                "pending" !== n && (i = y,
                n && (t = b.setRes(n),
                b.applySetCandidate(t, e))),
                e[b.ns].evaled = i
            }
            function l(e, t) {
                return e.res - t.res
            }
            function c(e, t, n) {
                var i;
                return !n && t && (n = e[b.ns].sets,
                n = n && n[n.length - 1]),
                i = d(t, n),
                i && (t = b.makeUrl(t),
                e[b.ns].curSrc = t,
                e[b.ns].curCan = i,
                i.res || te(i, i.set.sizes)),
                i
            }
            function d(e, t) {
                var n, i, o;
                if (e && t)
                    for (o = b.parseSet(t),
                    e = b.makeUrl(e),
                    n = 0; n < o.length; n++)
                        if (e === b.makeUrl(o[n].url)) {
                            i = o[n];
                            break
                        }
                return i
            }
            function h(e, t) {
                var n, i, o, r, a = e.getElementsByTagName("source");
                for (n = 0,
                i = a.length; n < i; n++)
                    o = a[n],
                    o[b.ns] = !0,
                    r = o.getAttribute("srcset"),
                    r && t.push({
                        srcset: r,
                        media: o.getAttribute("media"),
                        type: o.getAttribute("type"),
                        sizes: o.getAttribute("sizes")
                    })
            }
            function f(e, t) {
                function n(t) {
                    var n, i = t.exec(e.substring(h));
                    if (i)
                        return n = i[0],
                        h += n.length,
                        n
                }
                function i() {
                    var e, n, i, o, r, u, l, c, d, h = !1, p = {};
                    for (o = 0; o < s.length; o++)
                        r = s[o],
                        u = r[r.length - 1],
                        l = r.substring(0, r.length - 1),
                        c = parseInt(l, 10),
                        d = parseFloat(l),
                        X.test(l) && "w" === u ? ((e || n) && (h = !0),
                        0 === c ? h = !0 : e = c) : J.test(l) && "x" === u ? ((e || n || i) && (h = !0),
                        d < 0 ? h = !0 : n = d) : X.test(l) && "h" === u ? ((i || n) && (h = !0),
                        0 === c ? h = !0 : i = c) : h = !0;
                    h || (p.url = a,
                    e && (p.w = e),
                    n && (p.d = n),
                    i && (p.h = i),
                    i || n || e || (p.d = 1),
                    1 === p.d && (t.has1x = !0),
                    p.set = t,
                    f.push(p))
                }
                function r() {
                    for (n(V),
                    u = "",
                    l = "in descriptor"; ; ) {
                        if (c = e.charAt(h),
                        "in descriptor" === l)
                            if (o(c))
                                u && (s.push(u),
                                u = "",
                                l = "after descriptor");
                            else {
                                if ("," === c)
                                    return h += 1,
                                    u && s.push(u),
                                    void i();
                                if ("(" === c)
                                    u += c,
                                    l = "in parens";
                                else {
                                    if ("" === c)
                                        return u && s.push(u),
                                        void i();
                                    u += c
                                }
                            }
                        else if ("in parens" === l)
                            if (")" === c)
                                u += c,
                                l = "in descriptor";
                            else {
                                if ("" === c)
                                    return s.push(u),
                                    void i();
                                u += c
                            }
                        else if ("after descriptor" === l)
                            if (o(c))
                                ;
                            else {
                                if ("" === c)
                                    return void i();
                                l = "in descriptor",
                                h -= 1
                            }
                        h += 1
                    }
                }
                for (var a, s, u, l, c, d = e.length, h = 0, f = []; ; ) {
                    if (n(Q),
                    h >= d)
                        return f;
                    a = n(G),
                    s = [],
                    "," === a.slice(-1) ? (a = a.replace(Y, ""),
                    i()) : r()
                }
            }
            function p(e) {
                function t(e) {
                    function t() {
                        r && (a.push(r),
                        r = "")
                    }
                    function n() {
                        a[0] && (s.push(a),
                        a = [])
                    }
                    for (var i, r = "", a = [], s = [], u = 0, l = 0, c = !1; ; ) {
                        if (i = e.charAt(l),
                        "" === i)
                            return t(),
                            n(),
                            s;
                        if (c) {
                            if ("*" === i && "/" === e[l + 1]) {
                                c = !1,
                                l += 2,
                                t();
                                continue
                            }
                            l += 1
                        } else {
                            if (o(i)) {
                                if (e.charAt(l - 1) && o(e.charAt(l - 1)) || !r) {
                                    l += 1;
                                    continue
                                }
                                if (0 === u) {
                                    t(),
                                    l += 1;
                                    continue
                                }
                                i = " "
                            } else if ("(" === i)
                                u += 1;
                            else if (")" === i)
                                u -= 1;
                            else {
                                if ("," === i) {
                                    t(),
                                    n(),
                                    l += 1;
                                    continue
                                }
                                if ("/" === i && "*" === e.charAt(l + 1)) {
                                    c = !0,
                                    l += 2;
                                    continue
                                }
                            }
                            r += i,
                            l += 1
                        }
                    }
                }
                function n(e) {
                    return !!(c.test(e) && parseFloat(e) >= 0) || (!!d.test(e) || ("0" === e || "-0" === e || "+0" === e))
                }
                var i, r, a, s, u, l, c = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, d = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
                for (r = t(e),
                a = r.length,
                i = 0; i < a; i++)
                    if (s = r[i],
                    u = s[s.length - 1],
                    n(u)) {
                        if (l = u,
                        s.pop(),
                        0 === s.length)
                            return l;
                        if (s = s.join(" "),
                        b.matchesMedia(s))
                            return l
                    }
                return "100vw"
            }
            n.createElement("picture");
            var m, g, v, y, b = {}, w = !1, k = function() {}, x = n.createElement("img"), S = x.getAttribute, T = x.setAttribute, j = x.removeAttribute, C = n.documentElement, _ = {}, E = {
                algorithm: ""
            }, A = "data-pfsrc", $ = A + "set", P = navigator.userAgent, M = /rident/.test(P) || /ecko/.test(P) && P.match(/rv\:(\d+)/) && RegExp.$1 > 35, N = "currentSrc", L = /\s+\+?\d+(e\d+)?w/, F = /(\([^)]+\))?\s*(.+)/, z = e.picturefillCFG, I = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", O = "font-size:100%!important;", D = !0, R = {}, H = {}, B = e.devicePixelRatio, W = {
                px: 1,
                "in": 96
            }, q = n.createElement("a"), U = !1, V = /^[ \t\n\r\u000c]+/, Q = /^[, \t\n\r\u000c]+/, G = /^[^ \t\n\r\u000c]+/, Y = /[,]+$/, X = /^\d+$/, J = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, K = function(e, t, n, i) {
                e.addEventListener ? e.addEventListener(t, n, i || !1) : e.attachEvent && e.attachEvent("on" + t, n)
            }, Z = function(e) {
                var t = {};
                return function(n) {
                    return n in t || (t[n] = e(n)),
                    t[n]
                }
            }, ee = function() {
                var e = /^([\d\.]+)(em|vw|px)$/
                  , t = function() {
                    for (var e = arguments, t = 0, n = e[0]; ++t in e; )
                        n = n.replace(e[t], e[++t]);
                    return n
                }
                  , n = Z(function(e) {
                    return "return " + t((e || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
                });
                return function(t, i) {
                    var o;
                    if (!(t in R))
                        if (R[t] = !1,
                        i && (o = t.match(e)))
                            R[t] = o[1] * W[o[2]];
                        else
                            try {
                                R[t] = new Function("e",n(t))(W)
                            } catch (e) {}
                    return R[t]
                }
            }(), te = function(e, t) {
                return e.w ? (e.cWidth = b.calcListLength(t || "100vw"),
                e.res = e.w / e.cWidth) : e.res = e.d,
                e
            }, ne = function(e) {
                if (w) {
                    var t, i, o, r = e || {};
                    if (r.elements && 1 === r.elements.nodeType && ("IMG" === r.elements.nodeName.toUpperCase() ? r.elements = [r.elements] : (r.context = r.elements,
                    r.elements = null )),
                    t = r.elements || b.qsa(r.context || n, r.reevaluate || r.reselect ? b.sel : b.selShort),
                    o = t.length) {
                        for (b.setupRun(r),
                        U = !0,
                        i = 0; i < o; i++)
                            b.fillImg(t[i], r);
                        b.teardownRun(r)
                    }
                }
            };
            m = e.console && console.warn ? function(e) {
                console.warn(e)
            }
            : k,
            N in x || (N = "src"),
            _["image/jpeg"] = !0,
            _["image/gif"] = !0,
            _["image/png"] = !0,
            _["image/svg+xml"] = n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"),
            b.ns = ("pf" + (new Date).getTime()).substr(0, 9),
            b.supSrcset = "srcset"in x,
            b.supSizes = "sizes"in x,
            b.supPicture = !!e.HTMLPictureElement,
            b.supSrcset && b.supPicture && !b.supSizes && !function(e) {
                x.srcset = "data:,a",
                e.src = "data:,a",
                b.supSrcset = x.complete === e.complete,
                b.supPicture = b.supSrcset && b.supPicture
            }(n.createElement("img")),
            b.supSrcset && !b.supSizes ? !function() {
                var e = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw=="
                  , t = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  , i = n.createElement("img")
                  , o = function() {
                    var e = i.width;
                    2 === e && (b.supSizes = !0),
                    v = b.supSrcset && !b.supSizes,
                    w = !0,
                    setTimeout(ne)
                };
                i.onload = o,
                i.onerror = o,
                i.setAttribute("sizes", "9px"),
                i.srcset = t + " 1w," + e + " 9w",
                i.src = t
            }() : w = !0,
            b.selShort = "picture>img,img[srcset]",
            b.sel = b.selShort,
            b.cfg = E,
            b.DPR = B || 1,
            b.u = W,
            b.types = _,
            b.setSize = k,
            b.makeUrl = Z(function(e) {
                return q.href = e,
                q.href
            }),
            b.qsa = function(e, t) {
                return "querySelector"in e ? e.querySelectorAll(t) : []
            }
            ,
            b.matchesMedia = function() {
                return e.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? b.matchesMedia = function(e) {
                    return !e || matchMedia(e).matches
                }
                : b.matchesMedia = b.mMQ,
                b.matchesMedia.apply(this, arguments)
            }
            ,
            b.mMQ = function(e) {
                return !e || ee(e)
            }
            ,
            b.calcLength = function(e) {
                var t = ee(e, !0) || !1;
                return t < 0 && (t = !1),
                t
            }
            ,
            b.supportsType = function(e) {
                return !e || _[e]
            }
            ,
            b.parseSize = Z(function(e) {
                var t = (e || "").match(F);
                return {
                    media: t && t[1],
                    length: t && t[2]
                }
            }),
            b.parseSet = function(e) {
                return e.cands || (e.cands = f(e.srcset, e)),
                e.cands
            }
            ,
            b.getEmValue = function() {
                var e;
                if (!g && (e = n.body)) {
                    var t = n.createElement("div")
                      , i = C.style.cssText
                      , o = e.style.cssText;
                    t.style.cssText = I,
                    C.style.cssText = O,
                    e.style.cssText = O,
                    e.appendChild(t),
                    g = t.offsetWidth,
                    e.removeChild(t),
                    g = parseFloat(g, 10),
                    C.style.cssText = i,
                    e.style.cssText = o
                }
                return g || 16
            }
            ,
            b.calcListLength = function(e) {
                if (!(e in H) || E.uT) {
                    var t = b.calcLength(p(e));
                    H[e] = t ? t : W.width
                }
                return H[e]
            }
            ,
            b.setRes = function(e) {
                var t;
                if (e) {
                    t = b.parseSet(e);
                    for (var n = 0, i = t.length; n < i; n++)
                        te(t[n], e.sizes)
                }
                return t
            }
            ,
            b.setRes.res = te,
            b.applySetCandidate = function(e, t) {
                if (e.length) {
                    var n, i, o, r, a, u, d, h, f, p = t[b.ns], m = b.DPR;
                    if (u = p.curSrc || t[N],
                    d = p.curCan || c(t, u, e[0].set),
                    d && d.set === e[0].set && (f = M && !t.complete && d.res - .1 > m,
                    f || (d.cached = !0,
                    d.res >= m && (a = d))),
                    !a)
                        for (e.sort(l),
                        r = e.length,
                        a = e[r - 1],
                        i = 0; i < r; i++)
                            if (n = e[i],
                            n.res >= m) {
                                o = i - 1,
                                a = e[o] && (f || u !== b.makeUrl(n.url)) && s(e[o].res, n.res, m, e[o].cached) ? e[o] : n;
                                break
                            }
                    a && (h = b.makeUrl(a.url),
                    p.curSrc = h,
                    p.curCan = a,
                    h !== u && b.setSrc(t, a),
                    b.setSize(t))
                }
            }
            ,
            b.setSrc = function(e, t) {
                var n;
                e.src = t.url,
                "image/svg+xml" === t.set.type && (n = e.style.width,
                e.style.width = e.offsetWidth + 1 + "px",
                e.offsetWidth + 1 && (e.style.width = n))
            }
            ,
            b.getSet = function(e) {
                var t, n, i, o = !1, r = e[b.ns].sets;
                for (t = 0; t < r.length && !o; t++)
                    if (n = r[t],
                    n.srcset && b.matchesMedia(n.media) && (i = b.supportsType(n.type))) {
                        "pending" === i && (n = i),
                        o = n;
                        break
                    }
                return o
            }
            ,
            b.parseSets = function(e, t, n) {
                var o, r, a, s, u = t && "PICTURE" === t.nodeName.toUpperCase(), l = e[b.ns];
                (l.src === i || n.src) && (l.src = S.call(e, "src"),
                l.src ? T.call(e, A, l.src) : j.call(e, A)),
                (l.srcset === i || n.srcset || !b.supSrcset || e.srcset) && (o = S.call(e, "srcset"),
                l.srcset = o,
                s = !0),
                l.sets = [],
                u && (l.pic = !0,
                h(t, l.sets)),
                l.srcset ? (r = {
                    srcset: l.srcset,
                    sizes: S.call(e, "sizes")
                },
                l.sets.push(r),
                a = (v || l.src) && L.test(l.srcset || ""),
                a || !l.src || d(l.src, r) || r.has1x || (r.srcset += ", " + l.src,
                r.cands.push({
                    url: l.src,
                    d: 1,
                    set: r
                }))) : l.src && l.sets.push({
                    srcset: l.src,
                    sizes: null
                }),
                l.curCan = null ,
                l.curSrc = i,
                l.supported = !(u || r && !b.supSrcset || a && !b.supSizes),
                s && b.supSrcset && !l.supported && (o ? (T.call(e, $, o),
                e.srcset = "") : j.call(e, $)),
                l.supported && !l.srcset && (!l.src && e.src || e.src !== b.makeUrl(l.src)) && (null === l.src ? e.removeAttribute("src") : e.src = l.src),
                l.parsed = !0
            }
            ,
            b.fillImg = function(e, t) {
                var n, i = t.reselect || t.reevaluate;
                e[b.ns] || (e[b.ns] = {}),
                n = e[b.ns],
                (i || n.evaled !== y) && (n.parsed && !t.reevaluate || b.parseSets(e, e.parentNode, t),
                n.supported ? n.evaled = y : u(e))
            }
            ,
            b.setupRun = function() {
                U && !D && B === e.devicePixelRatio || a()
            }
            ,
            b.supPicture ? (ne = k,
            b.fillImg = k) : !function() {
                var t, i = e.attachEvent ? /d$|^c/ : /d$|^c|^i/, o = function() {
                    var e = n.readyState || "";
                    r = setTimeout(o, "loading" === e ? 200 : 999),
                    n.body && (b.fillImgs(),
                    t = t || i.test(e),
                    t && clearTimeout(r))
                }, r = setTimeout(o, n.body ? 9 : 99), a = function(e, t) {
                    var n, i, o = function() {
                        var r = new Date - i;
                        r < t ? n = setTimeout(o, t - r) : (n = null ,
                        e())
                    };
                    return function() {
                        i = new Date,
                        n || (n = setTimeout(o, t))
                    }
                }, s = C.clientHeight, u = function() {
                    D = Math.max(e.innerWidth || 0, C.clientWidth) !== W.width || C.clientHeight !== s,
                    s = C.clientHeight,
                    D && b.fillImgs()
                };
                K(e, "resize", a(u, 99)),
                K(n, "readystatechange", o)
            }(),
            b.picturefill = ne,
            b.fillImgs = ne,
            b.teardownRun = k,
            ne._ = b,
            e.picturefillCFG = {
                pf: b,
                push: function(e) {
                    var t = e.shift();
                    "function" == typeof b[t] ? b[t].apply(b, e) : (E[t] = e[0],
                    U && b.fillImgs({
                        reselect: !0
                    }))
                }
            };
            for (; z && z.length; )
                e.picturefillCFG.push(z.shift());
            e.picturefill = ne,
            "object" == typeof t && "object" == typeof t.exports ? t.exports = ne : "function" == typeof define && define.amd && define("picturefill", function() {
                return ne
            }),
            b.supPicture || (_["image/webp"] = r("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
        }(window, document)
    }
    , {}],
    49: [function(e, t, n) {
        !function(e, i) {
            "use strict";
            "object" == typeof n ? t.exports = i() : "function" == typeof define && define.amd ? define(i) : e.IPv6 = i(e)
        }(this, function(e) {
            "use strict";
            function t(e) {
                var t = e.toLowerCase()
                  , n = t.split(":")
                  , i = n.length
                  , o = 8;
                "" === n[0] && "" === n[1] && "" === n[2] ? (n.shift(),
                n.shift()) : "" === n[0] && "" === n[1] ? n.shift() : "" === n[i - 1] && "" === n[i - 2] && n.pop(),
                i = n.length,
                n[i - 1].indexOf(".") !== -1 && (o = 7);
                var r;
                for (r = 0; r < i && "" !== n[r]; r++)
                    ;
                if (r < o)
                    for (n.splice(r, 1, "0000"); n.length < o; )
                        n.splice(r, 0, "0000");
                for (var a, s = 0; s < o; s++) {
                    a = n[s].split("");
                    for (var u = 0; u < 3 && ("0" === a[0] && a.length > 1); u++)
                        a.splice(0, 1);
                    n[s] = a.join("")
                }
                var l = -1
                  , c = 0
                  , d = 0
                  , h = -1
                  , f = !1;
                for (s = 0; s < o; s++)
                    f ? "0" === n[s] ? d += 1 : (f = !1,
                    d > c && (l = h,
                    c = d)) : "0" === n[s] && (f = !0,
                    h = s,
                    d = 1);
                d > c && (l = h,
                c = d),
                c > 1 && n.splice(l, c, ""),
                i = n.length;
                var p = "";
                for ("" === n[0] && (p = ":"),
                s = 0; s < i && (p += n[s],
                s !== i - 1); s++)
                    p += ":";
                return "" === n[i - 1] && (p += ":"),
                p
            }
            function n() {
                return e.IPv6 === this && (e.IPv6 = i),
                this
            }
            var i = e && e.IPv6;
            return {
                best: t,
                noConflict: n
            }
        })
    }
    , {}],
    50: [function(e, t, n) {
        !function(e, i) {
            "use strict";
            "object" == typeof n ? t.exports = i() : "function" == typeof define && define.amd ? define(i) : e.SecondLevelDomains = i(e)
        }(this, function(e) {
            "use strict";
            var t = e && e.SecondLevelDomains
              , n = {
                list: {
                    ac: " com gov mil net org ",
                    ae: " ac co gov mil name net org pro sch ",
                    af: " com edu gov net org ",
                    al: " com edu gov mil net org ",
                    ao: " co ed gv it og pb ",
                    ar: " com edu gob gov int mil net org tur ",
                    at: " ac co gv or ",
                    au: " asn com csiro edu gov id net org ",
                    ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                    bb: " biz co com edu gov info net org store tv ",
                    bh: " biz cc com edu gov info net org ",
                    bn: " com edu gov net org ",
                    bo: " com edu gob gov int mil net org tv ",
                    br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                    bs: " com edu gov net org ",
                    bz: " du et om ov rg ",
                    ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                    ck: " biz co edu gen gov info net org ",
                    cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                    co: " com edu gov mil net nom org ",
                    cr: " ac c co ed fi go or sa ",
                    cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                    "do": " art com edu gob gov mil net org sld web ",
                    dz: " art asso com edu gov net org pol ",
                    ec: " com edu fin gov info med mil net org pro ",
                    eg: " com edu eun gov mil name net org sci ",
                    er: " com edu gov ind mil net org rochest w ",
                    es: " com edu gob nom org ",
                    et: " biz com edu gov info name net org ",
                    fj: " ac biz com info mil name net org pro ",
                    fk: " ac co gov net nom org ",
                    fr: " asso com f gouv nom prd presse tm ",
                    gg: " co net org ",
                    gh: " com edu gov mil org ",
                    gn: " ac com gov net org ",
                    gr: " com edu gov mil net org ",
                    gt: " com edu gob ind mil net org ",
                    gu: " com edu gov net org ",
                    hk: " com edu gov idv net org ",
                    hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                    id: " ac co go mil net or sch web ",
                    il: " ac co gov idf k12 muni net org ",
                    "in": " ac co edu ernet firm gen gov i ind mil net nic org res ",
                    iq: " com edu gov i mil net org ",
                    ir: " ac co dnssec gov i id net org sch ",
                    it: " edu gov ",
                    je: " co net org ",
                    jo: " com edu gov mil name net org sch ",
                    jp: " ac ad co ed go gr lg ne or ",
                    ke: " ac co go info me mobi ne or sc ",
                    kh: " com edu gov mil net org per ",
                    ki: " biz com de edu gov info mob net org tel ",
                    km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                    kn: " edu gov net org ",
                    kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                    kw: " com edu gov net org ",
                    ky: " com edu gov net org ",
                    kz: " com edu gov mil net org ",
                    lb: " com edu gov net org ",
                    lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                    lr: " com edu gov net org ",
                    lv: " asn com conf edu gov id mil net org ",
                    ly: " com edu gov id med net org plc sch ",
                    ma: " ac co gov m net org press ",
                    mc: " asso tm ",
                    me: " ac co edu gov its net org priv ",
                    mg: " com edu gov mil nom org prd tm ",
                    mk: " com edu gov inf name net org pro ",
                    ml: " com edu gov net org presse ",
                    mn: " edu gov org ",
                    mo: " com edu gov net org ",
                    mt: " com edu gov net org ",
                    mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                    mw: " ac co com coop edu gov int museum net org ",
                    mx: " com edu gob net org ",
                    my: " com edu gov mil name net org sch ",
                    nf: " arts com firm info net other per rec store web ",
                    ng: " biz com edu gov mil mobi name net org sch ",
                    ni: " ac co com edu gob mil net nom org ",
                    np: " com edu gov mil net org ",
                    nr: " biz com edu gov info net org ",
                    om: " ac biz co com edu gov med mil museum net org pro sch ",
                    pe: " com edu gob mil net nom org sld ",
                    ph: " com edu gov i mil net ngo org ",
                    pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                    pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                    pr: " ac biz com edu est gov info isla name net org pro prof ",
                    ps: " com edu gov net org plo sec ",
                    pw: " belau co ed go ne or ",
                    ro: " arts com firm info nom nt org rec store tm www ",
                    rs: " ac co edu gov in org ",
                    sb: " com edu gov net org ",
                    sc: " com edu gov net org ",
                    sh: " co com edu gov net nom org ",
                    sl: " com edu gov net org ",
                    st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                    sv: " com edu gob org red ",
                    sz: " ac co org ",
                    tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                    tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                    tw: " club com ebiz edu game gov idv mil net org ",
                    mu: " ac co com gov net or org ",
                    mz: " ac co edu gov org ",
                    na: " co com ",
                    nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                    pa: " abo ac com edu gob ing med net nom org sld ",
                    pt: " com edu gov int net nome org publ ",
                    py: " com edu gov mil net org ",
                    qa: " com edu gov mil net org ",
                    re: " asso com nom ",
                    ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                    rw: " ac co com edu gouv gov int mil net ",
                    sa: " com edu gov med net org pub sch ",
                    sd: " com edu gov info med net org tv ",
                    se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                    sg: " com edu gov idn net org per ",
                    sn: " art com edu gouv org perso univ ",
                    sy: " com edu gov mil net news org ",
                    th: " ac co go in mi net or ",
                    tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                    tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                    tz: " ac co go ne or ",
                    ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                    ug: " ac co go ne or org sc ",
                    uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                    us: " dni fed isa kids nsn ",
                    uy: " com edu gub mil net org ",
                    ve: " co com edu gob info mil net org web ",
                    vi: " co com k12 net org ",
                    vn: " ac biz com edu gov health info int name net org pro ",
                    ye: " co com gov ltd me net org plc ",
                    yu: " ac co edu gov org ",
                    za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                    zm: " ac co com edu gov net org sch "
                },
                has: function(e) {
                    var t = e.lastIndexOf(".");
                    if (t <= 0 || t >= e.length - 1)
                        return !1;
                    var i = e.lastIndexOf(".", t - 1);
                    if (i <= 0 || i >= t - 1)
                        return !1;
                    var o = n.list[e.slice(t + 1)];
                    return !!o && o.indexOf(" " + e.slice(i + 1, t) + " ") >= 0
                },
                is: function(e) {
                    var t = e.lastIndexOf(".");
                    if (t <= 0 || t >= e.length - 1)
                        return !1;
                    var i = e.lastIndexOf(".", t - 1);
                    if (i >= 0)
                        return !1;
                    var o = n.list[e.slice(t + 1)];
                    return !!o && o.indexOf(" " + e.slice(0, t) + " ") >= 0
                },
                get: function(e) {
                    var t = e.lastIndexOf(".");
                    if (t <= 0 || t >= e.length - 1)
                        return null ;
                    var i = e.lastIndexOf(".", t - 1);
                    if (i <= 0 || i >= t - 1)
                        return null ;
                    var o = n.list[e.slice(t + 1)];
                    return o ? o.indexOf(" " + e.slice(i + 1, t) + " ") < 0 ? null : e.slice(i + 1) : null
                },
                noConflict: function() {
                    return e.SecondLevelDomains === this && (e.SecondLevelDomains = t),
                    this
                }
            };
            return n
        })
    }
    , {}],
    51: [function(e, t, n) {
        !function(i, o) {
            "use strict";
            "object" == typeof n ? t.exports = o(e("./punycode"), e("./IPv6"), e("./SecondLevelDomains")) : "function" == typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], o) : i.URI = o(i.punycode, i.IPv6, i.SecondLevelDomains, i)
        }(this, function(e, t, n, i) {
            "use strict";
            function o(e, t) {
                var n = arguments.length >= 1
                  , i = arguments.length >= 2;
                if (!(this instanceof o))
                    return n ? i ? new o(e,t) : new o(e) : new o;
                if (void 0 === e) {
                    if (n)
                        throw new TypeError("undefined is not a valid argument for URI");
                    e = "undefined" != typeof location ? location.href + "" : ""
                }
                return this.href(e),
                void 0 !== t ? this.absoluteTo(t) : this
            }
            function r(e) {
                return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
            }
            function a(e) {
                return void 0 === e ? "Undefined" : String(Object.prototype.toString.call(e)).slice(8, -1)
            }
            function s(e) {
                return "Array" === a(e)
            }
            function u(e, t) {
                var n, i, o = {};
                if ("RegExp" === a(t))
                    o = null ;
                else if (s(t))
                    for (n = 0,
                    i = t.length; n < i; n++)
                        o[t[n]] = !0;
                else
                    o[t] = !0;
                for (n = 0,
                i = e.length; n < i; n++) {
                    var r = o && void 0 !== o[e[n]] || !o && t.test(e[n]);
                    r && (e.splice(n, 1),
                    i--,
                    n--)
                }
                return e
            }
            function l(e, t) {
                var n, i;
                if (s(t)) {
                    for (n = 0,
                    i = t.length; n < i; n++)
                        if (!l(e, t[n]))
                            return !1;
                    return !0
                }
                var o = a(t);
                for (n = 0,
                i = e.length; n < i; n++)
                    if ("RegExp" === o) {
                        if ("string" == typeof e[n] && e[n].match(t))
                            return !0
                    } else if (e[n] === t)
                        return !0;
                return !1
            }
            function c(e, t) {
                if (!s(e) || !s(t))
                    return !1;
                if (e.length !== t.length)
                    return !1;
                e.sort(),
                t.sort();
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] !== t[n])
                        return !1;
                return !0
            }
            function d(e) {
                var t = /^\/+|\/+$/g;
                return e.replace(t, "")
            }
            function h(e) {
                return escape(e)
            }
            function f(e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, h).replace(/\*/g, "%2A")
            }
            function p(e) {
                return function(t, n) {
                    return void 0 === t ? this._parts[e] || "" : (this._parts[e] = t || null ,
                    this.build(!n),
                    this)
                }
            }
            function m(e, t) {
                return function(n, i) {
                    return void 0 === n ? this._parts[e] || "" : (null !== n && (n += "",
                    n.charAt(0) === t && (n = n.substring(1))),
                    this._parts[e] = n,
                    this.build(!i),
                    this)
                }
            }
            var g = i && i.URI;
            o.version = "1.18.2";
            var v = o.prototype
              , y = Object.prototype.hasOwnProperty;
            o._parts = function() {
                return {
                    protocol: null ,
                    username: null ,
                    password: null ,
                    hostname: null ,
                    urn: null ,
                    port: null ,
                    path: null ,
                    query: null ,
                    fragment: null ,
                    duplicateQueryParameters: o.duplicateQueryParameters,
                    escapeQuerySpace: o.escapeQuerySpace
                }
            }
            ,
            o.duplicateQueryParameters = !1,
            o.escapeQuerySpace = !0,
            o.protocol_expression = /^[a-z][a-z0-9.+-]*$/i,
            o.idn_expression = /[^a-z0-9\.-]/i,
            o.punycode_expression = /(xn--)/i,
            o.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
            o.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
            o.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gi,
            o.findUri = {
                start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
                end: /[\s\r\n]|$/,
                trim: /[`!()\[\]{};:'".,<>?\xab\xbb\u201c\u201d\u201e\u2018\u2019]+$/
            },
            o.defaultPorts = {
                http: "80",
                https: "443",
                ftp: "21",
                gopher: "70",
                ws: "80",
                wss: "443"
            },
            o.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/,
            o.domAttributes = {
                a: "href",
                blockquote: "cite",
                link: "href",
                base: "href",
                script: "src",
                form: "action",
                img: "src",
                area: "href",
                iframe: "src",
                embed: "src",
                source: "src",
                track: "src",
                input: "src",
                audio: "src",
                video: "src"
            },
            o.getDomAttribute = function(e) {
                if (e && e.nodeName) {
                    var t = e.nodeName.toLowerCase();
                    if ("input" !== t || "image" === e.type)
                        return o.domAttributes[t]
                }
            }
            ,
            o.encode = f,
            o.decode = decodeURIComponent,
            o.iso8859 = function() {
                o.encode = escape,
                o.decode = unescape
            }
            ,
            o.unicode = function() {
                o.encode = f,
                o.decode = decodeURIComponent
            }
            ,
            o.characters = {
                pathname: {
                    encode: {
                        expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                        map: {
                            "%24": "$",
                            "%26": "&",
                            "%2B": "+",
                            "%2C": ",",
                            "%3B": ";",
                            "%3D": "=",
                            "%3A": ":",
                            "%40": "@"
                        }
                    },
                    decode: {
                        expression: /[\/\?#]/g,
                        map: {
                            "/": "%2F",
                            "?": "%3F",
                            "#": "%23"
                        }
                    }
                },
                reserved: {
                    encode: {
                        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                        map: {
                            "%3A": ":",
                            "%2F": "/",
                            "%3F": "?",
                            "%23": "#",
                            "%5B": "[",
                            "%5D": "]",
                            "%40": "@",
                            "%21": "!",
                            "%24": "$",
                            "%26": "&",
                            "%27": "'",
                            "%28": "(",
                            "%29": ")",
                            "%2A": "*",
                            "%2B": "+",
                            "%2C": ",",
                            "%3B": ";",
                            "%3D": "="
                        }
                    }
                },
                urnpath: {
                    encode: {
                        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                        map: {
                            "%21": "!",
                            "%24": "$",
                            "%27": "'",
                            "%28": "(",
                            "%29": ")",
                            "%2A": "*",
                            "%2B": "+",
                            "%2C": ",",
                            "%3B": ";",
                            "%3D": "=",
                            "%40": "@"
                        }
                    },
                    decode: {
                        expression: /[\/\?#:]/g,
                        map: {
                            "/": "%2F",
                            "?": "%3F",
                            "#": "%23",
                            ":": "%3A"
                        }
                    }
                }
            },
            o.encodeQuery = function(e, t) {
                var n = o.encode(e + "");
                return void 0 === t && (t = o.escapeQuerySpace),
                t ? n.replace(/%20/g, "+") : n
            }
            ,
            o.decodeQuery = function(e, t) {
                e += "",
                void 0 === t && (t = o.escapeQuerySpace);
                try {
                    return o.decode(t ? e.replace(/\+/g, "%20") : e)
                } catch (t) {
                    return e
                }
            }
            ;
            var b, w = {
                encode: "encode",
                decode: "decode"
            }, k = function(e, t) {
                return function(n) {
                    try {
                        return o[t](n + "").replace(o.characters[e][t].expression, function(n) {
                            return o.characters[e][t].map[n]
                        })
                    } catch (e) {
                        return n
                    }
                }
            };
            for (b in w)
                o[b + "PathSegment"] = k("pathname", w[b]),
                o[b + "UrnPathSegment"] = k("urnpath", w[b]);
            var x = function(e, t, n) {
                return function(i) {
                    var r;
                    r = n ? function(e) {
                        return o[t](o[n](e))
                    }
                    : o[t];
                    for (var a = (i + "").split(e), s = 0, u = a.length; s < u; s++)
                        a[s] = r(a[s]);
                    return a.join(e)
                }
            };
            o.decodePath = x("/", "decodePathSegment"),
            o.decodeUrnPath = x(":", "decodeUrnPathSegment"),
            o.recodePath = x("/", "encodePathSegment", "decode"),
            o.recodeUrnPath = x(":", "encodeUrnPathSegment", "decode"),
            o.encodeReserved = k("reserved", "encode"),
            o.parse = function(e, t) {
                var n;
                return t || (t = {}),
                n = e.indexOf("#"),
                n > -1 && (t.fragment = e.substring(n + 1) || null ,
                e = e.substring(0, n)),
                n = e.indexOf("?"),
                n > -1 && (t.query = e.substring(n + 1) || null ,
                e = e.substring(0, n)),
                "//" === e.substring(0, 2) ? (t.protocol = null ,
                e = e.substring(2),
                e = o.parseAuthority(e, t)) : (n = e.indexOf(":"),
                n > -1 && (t.protocol = e.substring(0, n) || null ,
                t.protocol && !t.protocol.match(o.protocol_expression) ? t.protocol = void 0 : "//" === e.substring(n + 1, n + 3) ? (e = e.substring(n + 3),
                e = o.parseAuthority(e, t)) : (e = e.substring(n + 1),
                t.urn = !0))),
                t.path = e,
                t
            }
            ,
            o.parseHost = function(e, t) {
                e = e.replace(/\\/g, "/");
                var n, i, o = e.indexOf("/");
                if (o === -1 && (o = e.length),
                "[" === e.charAt(0))
                    n = e.indexOf("]"),
                    t.hostname = e.substring(1, n) || null ,
                    t.port = e.substring(n + 2, o) || null ,
                    "/" === t.port && (t.port = null );
                else {
                    var r = e.indexOf(":")
                      , a = e.indexOf("/")
                      , s = e.indexOf(":", r + 1);
                    s !== -1 && (a === -1 || s < a) ? (t.hostname = e.substring(0, o) || null ,
                    t.port = null ) : (i = e.substring(0, o).split(":"),
                    t.hostname = i[0] || null ,
                    t.port = i[1] || null )
                }
                return t.hostname && "/" !== e.substring(o).charAt(0) && (o++,
                e = "/" + e),
                e.substring(o) || "/"
            }
            ,
            o.parseAuthority = function(e, t) {
                return e = o.parseUserinfo(e, t),
                o.parseHost(e, t)
            }
            ,
            o.parseUserinfo = function(e, t) {
                var n, i = e.indexOf("/"), r = e.lastIndexOf("@", i > -1 ? i : e.length - 1);
                return r > -1 && (i === -1 || r < i) ? (n = e.substring(0, r).split(":"),
                t.username = n[0] ? o.decode(n[0]) : null ,
                n.shift(),
                t.password = n[0] ? o.decode(n.join(":")) : null ,
                e = e.substring(r + 1)) : (t.username = null ,
                t.password = null ),
                e
            }
            ,
            o.parseQuery = function(e, t) {
                if (!e)
                    return {};
                if (e = e.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, ""),
                !e)
                    return {};
                for (var n, i, r, a = {}, s = e.split("&"), u = s.length, l = 0; l < u; l++)
                    n = s[l].split("="),
                    i = o.decodeQuery(n.shift(), t),
                    r = n.length ? o.decodeQuery(n.join("="), t) : null ,
                    y.call(a, i) ? ("string" != typeof a[i] && null !== a[i] || (a[i] = [a[i]]),
                    a[i].push(r)) : a[i] = r;
                return a
            }
            ,
            o.build = function(e) {
                var t = "";
                return e.protocol && (t += e.protocol + ":"),
                e.urn || !t && !e.hostname || (t += "//"),
                t += o.buildAuthority(e) || "",
                "string" == typeof e.path && ("/" !== e.path.charAt(0) && "string" == typeof e.hostname && (t += "/"),
                t += e.path),
                "string" == typeof e.query && e.query && (t += "?" + e.query),
                "string" == typeof e.fragment && e.fragment && (t += "#" + e.fragment),
                t
            }
            ,
            o.buildHost = function(e) {
                var t = "";
                return e.hostname ? (t += o.ip6_expression.test(e.hostname) ? "[" + e.hostname + "]" : e.hostname,
                e.port && (t += ":" + e.port),
                t) : ""
            }
            ,
            o.buildAuthority = function(e) {
                return o.buildUserinfo(e) + o.buildHost(e)
            }
            ,
            o.buildUserinfo = function(e) {
                var t = "";
                return e.username && (t += o.encode(e.username)),
                e.password && (t += ":" + o.encode(e.password)),
                t && (t += "@"),
                t
            }
            ,
            o.buildQuery = function(e, t, n) {
                var i, r, a, u, l = "";
                for (r in e)
                    if (y.call(e, r) && r)
                        if (s(e[r]))
                            for (i = {},
                            a = 0,
                            u = e[r].length; a < u; a++)
                                void 0 !== e[r][a] && void 0 === i[e[r][a] + ""] && (l += "&" + o.buildQueryParameter(r, e[r][a], n),
                                t !== !0 && (i[e[r][a] + ""] = !0));
                        else
                            void 0 !== e[r] && (l += "&" + o.buildQueryParameter(r, e[r], n));
                return l.substring(1)
            }
            ,
            o.buildQueryParameter = function(e, t, n) {
                return o.encodeQuery(e, n) + (null !== t ? "=" + o.encodeQuery(t, n) : "")
            }
            ,
            o.addQuery = function(e, t, n) {
                if ("object" == typeof t)
                    for (var i in t)
                        y.call(t, i) && o.addQuery(e, i, t[i]);
                else {
                    if ("string" != typeof t)
                        throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
                    if (void 0 === e[t])
                        return void (e[t] = n);
                    "string" == typeof e[t] && (e[t] = [e[t]]),
                    s(n) || (n = [n]),
                    e[t] = (e[t] || []).concat(n)
                }
            }
            ,
            o.removeQuery = function(e, t, n) {
                var i, r, l;
                if (s(t))
                    for (i = 0,
                    r = t.length; i < r; i++)
                        e[t[i]] = void 0;
                else if ("RegExp" === a(t))
                    for (l in e)
                        t.test(l) && (e[l] = void 0);
                else if ("object" == typeof t)
                    for (l in t)
                        y.call(t, l) && o.removeQuery(e, l, t[l]);
                else {
                    if ("string" != typeof t)
                        throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
                    void 0 !== n ? "RegExp" === a(n) ? !s(e[t]) && n.test(e[t]) ? e[t] = void 0 : e[t] = u(e[t], n) : e[t] !== String(n) || s(n) && 1 !== n.length ? s(e[t]) && (e[t] = u(e[t], n)) : e[t] = void 0 : e[t] = void 0
                }
            }
            ,
            o.hasQuery = function(e, t, n, i) {
                switch (a(t)) {
                case "String":
                    break;
                case "RegExp":
                    for (var r in e)
                        if (y.call(e, r) && t.test(r) && (void 0 === n || o.hasQuery(e, r, n)))
                            return !0;
                    return !1;
                case "Object":
                    for (var u in t)
                        if (y.call(t, u) && !o.hasQuery(e, u, t[u]))
                            return !1;
                    return !0;
                default:
                    throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter")
                }
                switch (a(n)) {
                case "Undefined":
                    return t in e;
                case "Boolean":
                    var d = Boolean(s(e[t]) ? e[t].length : e[t]);
                    return n === d;
                case "Function":
                    return !!n(e[t], t, e);
                case "Array":
                    if (!s(e[t]))
                        return !1;
                    var h = i ? l : c;
                    return h(e[t], n);
                case "RegExp":
                    return s(e[t]) ? !!i && l(e[t], n) : Boolean(e[t] && e[t].match(n));
                case "Number":
                    n = String(n);
                case "String":
                    return s(e[t]) ? !!i && l(e[t], n) : e[t] === n;
                default:
                    throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter")
                }
            }
            ,
            o.joinPaths = function() {
                for (var e = [], t = [], n = 0, i = 0; i < arguments.length; i++) {
                    var r = new o(arguments[i]);
                    e.push(r);
                    for (var a = r.segment(), s = 0; s < a.length; s++)
                        "string" == typeof a[s] && t.push(a[s]),
                        a[s] && n++
                }
                if (!t.length || !n)
                    return new o("");
                var u = new o("").segment(t);
                return "" !== e[0].path() && "/" !== e[0].path().slice(0, 1) || u.path("/" + u.path()),
                u.normalize()
            }
            ,
            o.commonPath = function(e, t) {
                var n, i = Math.min(e.length, t.length);
                for (n = 0; n < i; n++)
                    if (e.charAt(n) !== t.charAt(n)) {
                        n--;
                        break
                    }
                return n < 1 ? e.charAt(0) === t.charAt(0) && "/" === e.charAt(0) ? "/" : "" : ("/" === e.charAt(n) && "/" === t.charAt(n) || (n = e.substring(0, n).lastIndexOf("/")),
                e.substring(0, n + 1))
            }
            ,
            o.withinString = function(e, t, n) {
                n || (n = {});
                var i = n.start || o.findUri.start
                  , r = n.end || o.findUri.end
                  , a = n.trim || o.findUri.trim
                  , s = /[a-z0-9-]=["']?$/i;
                for (i.lastIndex = 0; ; ) {
                    var u = i.exec(e);
                    if (!u)
                        break;
                    var l = u.index;
                    if (n.ignoreHtml) {
                        var c = e.slice(Math.max(l - 3, 0), l);
                        if (c && s.test(c))
                            continue
                    }
                    var d = l + e.slice(l).search(r)
                      , h = e.slice(l, d).replace(a, "");
                    if (!n.ignore || !n.ignore.test(h)) {
                        d = l + h.length;
                        var f = t(h, l, d, e);
                        void 0 !== f ? (f = String(f),
                        e = e.slice(0, l) + f + e.slice(d),
                        i.lastIndex = l + f.length) : i.lastIndex = d
                    }
                }
                return i.lastIndex = 0,
                e
            }
            ,
            o.ensureValidHostname = function(t) {
                if (t.match(o.invalid_hostname_characters)) {
                    if (!e)
                        throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
                    if (e.toASCII(t).match(o.invalid_hostname_characters))
                        throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-]')
                }
            }
            ,
            o.noConflict = function(e) {
                if (e) {
                    var t = {
                        URI: this.noConflict()
                    };
                    return i.URITemplate && "function" == typeof i.URITemplate.noConflict && (t.URITemplate = i.URITemplate.noConflict()),
                    i.IPv6 && "function" == typeof i.IPv6.noConflict && (t.IPv6 = i.IPv6.noConflict()),
                    i.SecondLevelDomains && "function" == typeof i.SecondLevelDomains.noConflict && (t.SecondLevelDomains = i.SecondLevelDomains.noConflict()),
                    t
                }
                return i.URI === this && (i.URI = g),
                this
            }
            ,
            v.build = function(e) {
                return e === !0 ? this._deferred_build = !0 : (void 0 === e || this._deferred_build) && (this._string = o.build(this._parts),
                this._deferred_build = !1),
                this
            }
            ,
            v.clone = function() {
                return new o(this)
            }
            ,
            v.valueOf = v.toString = function() {
                return this.build(!1)._string
            }
            ,
            v.protocol = p("protocol"),
            v.username = p("username"),
            v.password = p("password"),
            v.hostname = p("hostname"),
            v.port = p("port"),
            v.query = m("query", "?"),
            v.fragment = m("fragment", "#"),
            v.search = function(e, t) {
                var n = this.query(e, t);
                return "string" == typeof n && n.length ? "?" + n : n
            }
            ,
            v.hash = function(e, t) {
                var n = this.fragment(e, t);
                return "string" == typeof n && n.length ? "#" + n : n
            }
            ,
            v.pathname = function(e, t) {
                if (void 0 === e || e === !0) {
                    var n = this._parts.path || (this._parts.hostname ? "/" : "");
                    return e ? (this._parts.urn ? o.decodeUrnPath : o.decodePath)(n) : n
                }
                return this._parts.urn ? this._parts.path = e ? o.recodeUrnPath(e) : "" : this._parts.path = e ? o.recodePath(e) : "/",
                this.build(!t),
                this
            }
            ,
            v.path = v.pathname,
            v.href = function(e, t) {
                var n;
                if (void 0 === e)
                    return this.toString();
                this._string = "",
                this._parts = o._parts();
                var i = e instanceof o
                  , r = "object" == typeof e && (e.hostname || e.path || e.pathname);
                if (e.nodeName) {
                    var a = o.getDomAttribute(e);
                    e = e[a] || "",
                    r = !1
                }
                if (!i && r && void 0 !== e.pathname && (e = e.toString()),
                "string" == typeof e || e instanceof String)
                    this._parts = o.parse(String(e), this._parts);
                else {
                    if (!i && !r)
                        throw new TypeError("invalid input");
                    var s = i ? e._parts : e;
                    for (n in s)
                        y.call(this._parts, n) && (this._parts[n] = s[n])
                }
                return this.build(!t),
                this
            }
            ,
            v.is = function(e) {
                var t = !1
                  , i = !1
                  , r = !1
                  , a = !1
                  , s = !1
                  , u = !1
                  , l = !1
                  , c = !this._parts.urn;
                switch (this._parts.hostname && (c = !1,
                i = o.ip4_expression.test(this._parts.hostname),
                r = o.ip6_expression.test(this._parts.hostname),
                t = i || r,
                a = !t,
                s = a && n && n.has(this._parts.hostname),
                u = a && o.idn_expression.test(this._parts.hostname),
                l = a && o.punycode_expression.test(this._parts.hostname)),
                e.toLowerCase()) {
                case "relative":
                    return c;
                case "absolute":
                    return !c;
                case "domain":
                case "name":
                    return a;
                case "sld":
                    return s;
                case "ip":
                    return t;
                case "ip4":
                case "ipv4":
                case "inet4":
                    return i;
                case "ip6":
                case "ipv6":
                case "inet6":
                    return r;
                case "idn":
                    return u;
                case "url":
                    return !this._parts.urn;
                case "urn":
                    return !!this._parts.urn;
                case "punycode":
                    return l
                }
                return null
            }
            ;
            var S = v.protocol
              , T = v.port
              , j = v.hostname;
            v.protocol = function(e, t) {
                if (void 0 !== e && e && (e = e.replace(/:(\/\/)?$/, ""),
                !e.match(o.protocol_expression)))
                    throw new TypeError('Protocol "' + e + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");
                return S.call(this, e, t)
            }
            ,
            v.scheme = v.protocol,
            v.port = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 !== e && (0 === e && (e = null ),
                e && (e += "",
                ":" === e.charAt(0) && (e = e.substring(1)),
                e.match(/[^0-9]/))))
                    throw new TypeError('Port "' + e + '" contains characters other than [0-9]');
                return T.call(this, e, t)
            }
            ,
            v.hostname = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 !== e) {
                    var n = {}
                      , i = o.parseHost(e, n);
                    if ("/" !== i)
                        throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]');
                    e = n.hostname
                }
                return j.call(this, e, t)
            }
            ,
            v.origin = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e) {
                    var n = this.protocol()
                      , i = this.authority();
                    return i ? (n ? n + "://" : "") + this.authority() : ""
                }
                var r = o(e);
                return this.protocol(r.protocol()).authority(r.authority()).build(!t),
                this
            }
            ,
            v.host = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e)
                    return this._parts.hostname ? o.buildHost(this._parts) : "";
                var n = o.parseHost(e, this._parts);
                if ("/" !== n)
                    throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]');
                return this.build(!t),
                this
            }
            ,
            v.authority = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e)
                    return this._parts.hostname ? o.buildAuthority(this._parts) : "";
                var n = o.parseAuthority(e, this._parts);
                if ("/" !== n)
                    throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]');
                return this.build(!t),
                this
            }
            ,
            v.userinfo = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e) {
                    var n = o.buildUserinfo(this._parts);
                    return n ? n.substring(0, n.length - 1) : n
                }
                return "@" !== e[e.length - 1] && (e += "@"),
                o.parseUserinfo(e, this._parts),
                this.build(!t),
                this
            }
            ,
            v.resource = function(e, t) {
                var n;
                return void 0 === e ? this.path() + this.search() + this.hash() : (n = o.parse(e),
                this._parts.path = n.path,
                this._parts.query = n.query,
                this._parts.fragment = n.fragment,
                this.build(!t),
                this)
            }
            ,
            v.subdomain = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e) {
                    if (!this._parts.hostname || this.is("IP"))
                        return "";
                    var n = this._parts.hostname.length - this.domain().length - 1;
                    return this._parts.hostname.substring(0, n) || ""
                }
                var i = this._parts.hostname.length - this.domain().length
                  , a = this._parts.hostname.substring(0, i)
                  , s = new RegExp("^" + r(a));
                return e && "." !== e.charAt(e.length - 1) && (e += "."),
                e && o.ensureValidHostname(e),
                this._parts.hostname = this._parts.hostname.replace(s, e),
                this.build(!t),
                this
            }
            ,
            v.domain = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if ("boolean" == typeof e && (t = e,
                e = void 0),
                void 0 === e) {
                    if (!this._parts.hostname || this.is("IP"))
                        return "";
                    var n = this._parts.hostname.match(/\./g);
                    if (n && n.length < 2)
                        return this._parts.hostname;
                    var i = this._parts.hostname.length - this.tld(t).length - 1;
                    return i = this._parts.hostname.lastIndexOf(".", i - 1) + 1,
                    this._parts.hostname.substring(i) || ""
                }
                if (!e)
                    throw new TypeError("cannot set domain empty");
                if (o.ensureValidHostname(e),
                !this._parts.hostname || this.is("IP"))
                    this._parts.hostname = e;
                else {
                    var a = new RegExp(r(this.domain()) + "$");
                    this._parts.hostname = this._parts.hostname.replace(a, e)
                }
                return this.build(!t),
                this
            }
            ,
            v.tld = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if ("boolean" == typeof e && (t = e,
                e = void 0),
                void 0 === e) {
                    if (!this._parts.hostname || this.is("IP"))
                        return "";
                    var i = this._parts.hostname.lastIndexOf(".")
                      , o = this._parts.hostname.substring(i + 1);
                    return t !== !0 && n && n.list[o.toLowerCase()] ? n.get(this._parts.hostname) || o : o
                }
                var a;
                if (!e)
                    throw new TypeError("cannot set TLD empty");
                if (e.match(/[^a-zA-Z0-9-]/)) {
                    if (!n || !n.is(e))
                        throw new TypeError('TLD "' + e + '" contains characters other than [A-Z0-9]');
                    a = new RegExp(r(this.tld()) + "$"),
                    this._parts.hostname = this._parts.hostname.replace(a, e)
                } else {
                    if (!this._parts.hostname || this.is("IP"))
                        throw new ReferenceError("cannot set TLD on non-domain host");
                    a = new RegExp(r(this.tld()) + "$"),
                    this._parts.hostname = this._parts.hostname.replace(a, e)
                }
                return this.build(!t),
                this
            }
            ,
            v.directory = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e || e === !0) {
                    if (!this._parts.path && !this._parts.hostname)
                        return "";
                    if ("/" === this._parts.path)
                        return "/";
                    var n = this._parts.path.length - this.filename().length - 1
                      , i = this._parts.path.substring(0, n) || (this._parts.hostname ? "/" : "");
                    return e ? o.decodePath(i) : i
                }
                var a = this._parts.path.length - this.filename().length
                  , s = this._parts.path.substring(0, a)
                  , u = new RegExp("^" + r(s));
                return this.is("relative") || (e || (e = "/"),
                "/" !== e.charAt(0) && (e = "/" + e)),
                e && "/" !== e.charAt(e.length - 1) && (e += "/"),
                e = o.recodePath(e),
                this._parts.path = this._parts.path.replace(u, e),
                this.build(!t),
                this
            }
            ,
            v.filename = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e || e === !0) {
                    if (!this._parts.path || "/" === this._parts.path)
                        return "";
                    var n = this._parts.path.lastIndexOf("/")
                      , i = this._parts.path.substring(n + 1);
                    return e ? o.decodePathSegment(i) : i
                }
                var a = !1;
                "/" === e.charAt(0) && (e = e.substring(1)),
                e.match(/\.?\//) && (a = !0);
                var s = new RegExp(r(this.filename()) + "$");
                return e = o.recodePath(e),
                this._parts.path = this._parts.path.replace(s, e),
                a ? this.normalizePath(t) : this.build(!t),
                this
            }
            ,
            v.suffix = function(e, t) {
                if (this._parts.urn)
                    return void 0 === e ? "" : this;
                if (void 0 === e || e === !0) {
                    if (!this._parts.path || "/" === this._parts.path)
                        return "";
                    var n, i, a = this.filename(), s = a.lastIndexOf(".");
                    return s === -1 ? "" : (n = a.substring(s + 1),
                    i = /^[a-z0-9%]+$/i.test(n) ? n : "",
                    e ? o.decodePathSegment(i) : i)
                }
                "." === e.charAt(0) && (e = e.substring(1));
                var u, l = this.suffix();
                if (l)
                    u = e ? new RegExp(r(l) + "$") : new RegExp(r("." + l) + "$");
                else {
                    if (!e)
                        return this;
                    this._parts.path += "." + o.recodePath(e)
                }
                return u && (e = o.recodePath(e),
                this._parts.path = this._parts.path.replace(u, e)),
                this.build(!t),
                this
            }
            ,
            v.segment = function(e, t, n) {
                var i = this._parts.urn ? ":" : "/"
                  , o = this.path()
                  , r = "/" === o.substring(0, 1)
                  , a = o.split(i);
                if (void 0 !== e && "number" != typeof e && (n = t,
                t = e,
                e = void 0),
                void 0 !== e && "number" != typeof e)
                    throw new Error('Bad segment "' + e + '", must be 0-based integer');
                if (r && a.shift(),
                e < 0 && (e = Math.max(a.length + e, 0)),
                void 0 === t)
                    return void 0 === e ? a : a[e];
                if (null === e || void 0 === a[e])
                    if (s(t)) {
                        a = [];
                        for (var u = 0, l = t.length; u < l; u++)
                            (t[u].length || a.length && a[a.length - 1].length) && (a.length && !a[a.length - 1].length && a.pop(),
                            a.push(d(t[u])))
                    } else
                        (t || "string" == typeof t) && (t = d(t),
                        "" === a[a.length - 1] ? a[a.length - 1] = t : a.push(t));
                else
                    t ? a[e] = d(t) : a.splice(e, 1);
                return r && a.unshift(""),
                this.path(a.join(i), n)
            }
            ,
            v.segmentCoded = function(e, t, n) {
                var i, r, a;
                if ("number" != typeof e && (n = t,
                t = e,
                e = void 0),
                void 0 === t) {
                    if (i = this.segment(e, t, n),
                    s(i))
                        for (r = 0,
                        a = i.length; r < a; r++)
                            i[r] = o.decode(i[r]);
                    else
                        i = void 0 !== i ? o.decode(i) : void 0;
                    return i
                }
                if (s(t))
                    for (r = 0,
                    a = t.length; r < a; r++)
                        t[r] = o.encode(t[r]);
                else
                    t = "string" == typeof t || t instanceof String ? o.encode(t) : t;
                return this.segment(e, t, n)
            }
            ;
            var C = v.query;
            return v.query = function(e, t) {
                if (e === !0)
                    return o.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                if ("function" == typeof e) {
                    var n = o.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
                      , i = e.call(this, n);
                    return this._parts.query = o.buildQuery(i || n, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace),
                    this.build(!t),
                    this
                }
                return void 0 !== e && "string" != typeof e ? (this._parts.query = o.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace),
                this.build(!t),
                this) : C.call(this, e, t)
            }
            ,
            v.setQuery = function(e, t, n) {
                var i = o.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                if ("string" == typeof e || e instanceof String)
                    i[e] = void 0 !== t ? t : null ;
                else {
                    if ("object" != typeof e)
                        throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
                    for (var r in e)
                        y.call(e, r) && (i[r] = e[r])
                }
                return this._parts.query = o.buildQuery(i, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
            }
            ,
            v.addQuery = function(e, t, n) {
                var i = o.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                return o.addQuery(i, e, void 0 === t ? null : t),
                this._parts.query = o.buildQuery(i, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
            }
            ,
            v.removeQuery = function(e, t, n) {
                var i = o.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                return o.removeQuery(i, e, t),
                this._parts.query = o.buildQuery(i, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
            }
            ,
            v.hasQuery = function(e, t, n) {
                var i = o.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                return o.hasQuery(i, e, t, n)
            }
            ,
            v.setSearch = v.setQuery,
            v.addSearch = v.addQuery,
            v.removeSearch = v.removeQuery,
            v.hasSearch = v.hasQuery,
            v.normalize = function() {
                return this._parts.urn ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
            }
            ,
            v.normalizeProtocol = function(e) {
                return "string" == typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(),
                this.build(!e)),
                this
            }
            ,
            v.normalizeHostname = function(n) {
                return this._parts.hostname && (this.is("IDN") && e ? this._parts.hostname = e.toASCII(this._parts.hostname) : this.is("IPv6") && t && (this._parts.hostname = t.best(this._parts.hostname)),
                this._parts.hostname = this._parts.hostname.toLowerCase(),
                this.build(!n)),
                this
            }
            ,
            v.normalizePort = function(e) {
                return "string" == typeof this._parts.protocol && this._parts.port === o.defaultPorts[this._parts.protocol] && (this._parts.port = null ,
                this.build(!e)),
                this
            }
            ,
            v.normalizePath = function(e) {
                var t = this._parts.path;
                if (!t)
                    return this;
                if (this._parts.urn)
                    return this._parts.path = o.recodeUrnPath(this._parts.path),
                    this.build(!e),
                    this;
                if ("/" === this._parts.path)
                    return this;
                t = o.recodePath(t);
                var n, i, r, a = "";
                for ("/" !== t.charAt(0) && (n = !0,
                t = "/" + t),
                "/.." !== t.slice(-3) && "/." !== t.slice(-2) || (t += "/"),
                t = t.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/"),
                n && (a = t.substring(1).match(/^(\.\.\/)+/) || "",
                a && (a = a[0])); ; ) {
                    if (i = t.search(/\/\.\.(\/|$)/),
                    i === -1)
                        break;
                    0 !== i ? (r = t.substring(0, i).lastIndexOf("/"),
                    r === -1 && (r = i),
                    t = t.substring(0, r) + t.substring(i + 3)) : t = t.substring(3)
                }
                return n && this.is("relative") && (t = a + t.substring(1)),
                this._parts.path = t,
                this.build(!e),
                this
            }
            ,
            v.normalizePathname = v.normalizePath,
            v.normalizeQuery = function(e) {
                return "string" == typeof this._parts.query && (this._parts.query.length ? this.query(o.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null ,
                this.build(!e)),
                this
            }
            ,
            v.normalizeFragment = function(e) {
                return this._parts.fragment || (this._parts.fragment = null ,
                this.build(!e)),
                this
            }
            ,
            v.normalizeSearch = v.normalizeQuery,
            v.normalizeHash = v.normalizeFragment,
            v.iso8859 = function() {
                var e = o.encode
                  , t = o.decode;
                o.encode = escape,
                o.decode = decodeURIComponent;
                try {
                    this.normalize()
                } finally {
                    o.encode = e,
                    o.decode = t
                }
                return this
            }
            ,
            v.unicode = function() {
                var e = o.encode
                  , t = o.decode;
                o.encode = f,
                o.decode = unescape;
                try {
                    this.normalize()
                } finally {
                    o.encode = e,
                    o.decode = t
                }
                return this
            }
            ,
            v.readable = function() {
                var t = this.clone();
                t.username("").password("").normalize();
                var n = "";
                if (t._parts.protocol && (n += t._parts.protocol + "://"),
                t._parts.hostname && (t.is("punycode") && e ? (n += e.toUnicode(t._parts.hostname),
                t._parts.port && (n += ":" + t._parts.port)) : n += t.host()),
                t._parts.hostname && t._parts.path && "/" !== t._parts.path.charAt(0) && (n += "/"),
                n += t.path(!0),
                t._parts.query) {
                    for (var i = "", r = 0, a = t._parts.query.split("&"), s = a.length; r < s; r++) {
                        var u = (a[r] || "").split("=");
                        i += "&" + o.decodeQuery(u[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"),
                        void 0 !== u[1] && (i += "=" + o.decodeQuery(u[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
                    }
                    n += "?" + i.substring(1)
                }
                return n += o.decodeQuery(t.hash(), !0)
            }
            ,
            v.absoluteTo = function(e) {
                var t, n, i, r = this.clone(), a = ["protocol", "username", "password", "hostname", "port"];
                if (this._parts.urn)
                    throw new Error("URNs do not have any generally defined hierarchical components");
                if (e instanceof o || (e = new o(e)),
                r._parts.protocol || (r._parts.protocol = e._parts.protocol),
                this._parts.hostname)
                    return r;
                for (n = 0; i = a[n]; n++)
                    r._parts[i] = e._parts[i];
                return r._parts.path ? (".." === r._parts.path.substring(-2) && (r._parts.path += "/"),
                "/" !== r.path().charAt(0) && (t = e.directory(),
                t = t ? t : 0 === e.path().indexOf("/") ? "/" : "",
                r._parts.path = (t ? t + "/" : "") + r._parts.path,
                r.normalizePath())) : (r._parts.path = e._parts.path,
                r._parts.query || (r._parts.query = e._parts.query)),
                r.build(),
                r
            }
            ,
            v.relativeTo = function(e) {
                var t, n, i, r, a, s = this.clone().normalize();
                if (s._parts.urn)
                    throw new Error("URNs do not have any generally defined hierarchical components");
                if (e = new o(e).normalize(),
                t = s._parts,
                n = e._parts,
                r = s.path(),
                a = e.path(),
                "/" !== r.charAt(0))
                    throw new Error("URI is already relative");
                if ("/" !== a.charAt(0))
                    throw new Error("Cannot calculate a URI relative to another relative URI");
                if (t.protocol === n.protocol && (t.protocol = null ),
                t.username !== n.username || t.password !== n.password)
                    return s.build();
                if (null !== t.protocol || null !== t.username || null !== t.password)
                    return s.build();
                if (t.hostname !== n.hostname || t.port !== n.port)
                    return s.build();
                if (t.hostname = null ,
                t.port = null ,
                r === a)
                    return t.path = "",
                    s.build();
                if (i = o.commonPath(r, a),
                !i)
                    return s.build();
                var u = n.path.substring(i.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
                return t.path = u + t.path.substring(i.length) || "./",
                s.build()
            }
            ,
            v.equals = function(e) {
                var t, n, i, r = this.clone(), a = new o(e), u = {}, l = {}, d = {};
                if (r.normalize(),
                a.normalize(),
                r.toString() === a.toString())
                    return !0;
                if (t = r.query(),
                n = a.query(),
                r.query(""),
                a.query(""),
                r.toString() !== a.toString())
                    return !1;
                if (t.length !== n.length)
                    return !1;
                u = o.parseQuery(t, this._parts.escapeQuerySpace),
                l = o.parseQuery(n, this._parts.escapeQuerySpace);
                for (i in u)
                    if (y.call(u, i)) {
                        if (s(u[i])) {
                            if (!c(u[i], l[i]))
                                return !1
                        } else if (u[i] !== l[i])
                            return !1;
                        d[i] = !0
                    }
                for (i in l)
                    if (y.call(l, i) && !d[i])
                        return !1;
                return !0
            }
            ,
            v.duplicateQueryParameters = function(e) {
                return this._parts.duplicateQueryParameters = !!e,
                this
            }
            ,
            v.escapeQuerySpace = function(e) {
                return this._parts.escapeQuerySpace = !!e,
                this
            }
            ,
            o
        })
    }
    , {
        "./IPv6": 49,
        "./SecondLevelDomains": 50,
        "./punycode": 52
    }],
    52: [function(e, t, n) {
        (function(e) {
            !function(i) {
                function o(e) {
                    throw new RangeError(N[e])
                }
                function r(e, t) {
                    for (var n = e.length, i = []; n--; )
                        i[n] = t(e[n]);
                    return i
                }
                function a(e, t) {
                    var n = e.split("@")
                      , i = "";
                    n.length > 1 && (i = n[0] + "@",
                    e = n[1]),
                    e = e.replace(M, ".");
                    var o = e.split(".")
                      , a = r(o, t).join(".");
                    return i + a
                }
                function s(e) {
                    for (var t, n, i = [], o = 0, r = e.length; o < r; )
                        t = e.charCodeAt(o++),
                        t >= 55296 && t <= 56319 && o < r ? (n = e.charCodeAt(o++),
                        56320 == (64512 & n) ? i.push(((1023 & t) << 10) + (1023 & n) + 65536) : (i.push(t),
                        o--)) : i.push(t);
                    return i
                }
                function u(e) {
                    return r(e, function(e) {
                        var t = "";
                        return e > 65535 && (e -= 65536,
                        t += z(e >>> 10 & 1023 | 55296),
                        e = 56320 | 1023 & e),
                        t += z(e)
                    }).join("")
                }
                function l(e) {
                    return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : x
                }
                function c(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                }
                function d(e, t, n) {
                    var i = 0;
                    for (e = n ? F(e / C) : e >> 1,
                    e += F(e / t); e > L * T >> 1; i += x)
                        e = F(e / L);
                    return F(i + (L + 1) * e / (e + j))
                }
                function h(e) {
                    var t, n, i, r, a, s, c, h, f, p, m = [], g = e.length, v = 0, y = E, b = _;
                    for (n = e.lastIndexOf(A),
                    n < 0 && (n = 0),
                    i = 0; i < n; ++i)
                        e.charCodeAt(i) >= 128 && o("not-basic"),
                        m.push(e.charCodeAt(i));
                    for (r = n > 0 ? n + 1 : 0; r < g; ) {
                        for (a = v,
                        s = 1,
                        c = x; r >= g && o("invalid-input"),
                        h = l(e.charCodeAt(r++)),
                        (h >= x || h > F((k - v) / s)) && o("overflow"),
                        v += h * s,
                        f = c <= b ? S : c >= b + T ? T : c - b,
                        !(h < f); c += x)
                            p = x - f,
                            s > F(k / p) && o("overflow"),
                            s *= p;
                        t = m.length + 1,
                        b = d(v - a, t, 0 == a),
                        F(v / t) > k - y && o("overflow"),
                        y += F(v / t),
                        v %= t,
                        m.splice(v++, 0, y)
                    }
                    return u(m)
                }
                function f(e) {
                    var t, n, i, r, a, u, l, h, f, p, m, g, v, y, b, w = [];
                    for (e = s(e),
                    g = e.length,
                    t = E,
                    n = 0,
                    a = _,
                    u = 0; u < g; ++u)
                        m = e[u],
                        m < 128 && w.push(z(m));
                    for (i = r = w.length,
                    r && w.push(A); i < g; ) {
                        for (l = k,
                        u = 0; u < g; ++u)
                            m = e[u],
                            m >= t && m < l && (l = m);
                        for (v = i + 1,
                        l - t > F((k - n) / v) && o("overflow"),
                        n += (l - t) * v,
                        t = l,
                        u = 0; u < g; ++u)
                            if (m = e[u],
                            m < t && ++n > k && o("overflow"),
                            m == t) {
                                for (h = n,
                                f = x; p = f <= a ? S : f >= a + T ? T : f - a,
                                !(h < p); f += x)
                                    b = h - p,
                                    y = x - p,
                                    w.push(z(c(p + b % y, 0))),
                                    h = F(b / y);
                                w.push(z(c(h, 0))),
                                a = d(n, v, i == r),
                                n = 0,
                                ++i
                            }
                        ++n,
                        ++t
                    }
                    return w.join("")
                }
                function p(e) {
                    return a(e, function(e) {
                        return $.test(e) ? h(e.slice(4).toLowerCase()) : e
                    })
                }
                function m(e) {
                    return a(e, function(e) {
                        return P.test(e) ? "xn--" + f(e) : e
                    })
                }
                var g = "object" == typeof n && n && !n.nodeType && n
                  , v = "object" == typeof t && t && !t.nodeType && t
                  , y = "object" == typeof e && e;
                y.global !== y && y.window !== y && y.self !== y || (i = y);
                var b, w, k = 2147483647, x = 36, S = 1, T = 26, j = 38, C = 700, _ = 72, E = 128, A = "-", $ = /^xn--/, P = /[^\x20-\x7E]/, M = /[\x2E\u3002\uFF0E\uFF61]/g, N = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, L = x - S, F = Math.floor, z = String.fromCharCode;
                if (b = {
                    version: "1.3.2",
                    ucs2: {
                        decode: s,
                        encode: u
                    },
                    decode: h,
                    encode: f,
                    toASCII: m,
                    toUnicode: p
                },
                "function" == typeof define && "object" == typeof define.amd && define.amd)
                    define("punycode", function() {
                        return b
                    });
                else if (g && v)
                    if (t.exports == g)
                        v.exports = b;
                    else
                        for (w in b)
                            b.hasOwnProperty(w) && (g[w] = b[w]);
                else
                    i.punycode = b
            }(this)
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}]
}, {}, [1]);
