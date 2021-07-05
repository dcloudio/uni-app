(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  (function() {
    var n = window.Document.prototype.createElement, p2 = window.Document.prototype.createElementNS, aa = window.Document.prototype.importNode, ba = window.Document.prototype.prepend, ca = window.Document.prototype.append, da = window.DocumentFragment.prototype.prepend, ea = window.DocumentFragment.prototype.append, q = window.Node.prototype.cloneNode, r = window.Node.prototype.appendChild, t = window.Node.prototype.insertBefore, u = window.Node.prototype.removeChild, v = window.Node.prototype.replaceChild, w = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"), y = window.Element.prototype.attachShadow, z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), A = window.Element.prototype.getAttribute, B = window.Element.prototype.setAttribute, C = window.Element.prototype.removeAttribute, D = window.Element.prototype.getAttributeNS, E2 = window.Element.prototype.setAttributeNS, F = window.Element.prototype.removeAttributeNS, G = window.Element.prototype.insertAdjacentElement, H = window.Element.prototype.insertAdjacentHTML, fa = window.Element.prototype.prepend, ha = window.Element.prototype.append, ia = window.Element.prototype.before, ja = window.Element.prototype.after, ka = window.Element.prototype.replaceWith, la = window.Element.prototype.remove, ma = window.HTMLElement, I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), na = window.HTMLElement.prototype.insertAdjacentElement, oa = window.HTMLElement.prototype.insertAdjacentHTML;
    var pa = new Set();
    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(a) {
      return pa.add(a);
    });
    function qa(a) {
      var b = pa.has(a);
      a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
      return !b && a;
    }
    var ra = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function J(a) {
      var b = a.isConnected;
      if (b !== void 0)
        return b;
      if (ra(a))
        return true;
      for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
        a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
      return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }
    function K(a) {
      var b = a.children;
      if (b)
        return Array.prototype.slice.call(b);
      b = [];
      for (a = a.firstChild; a; a = a.nextSibling)
        a.nodeType === Node.ELEMENT_NODE && b.push(a);
      return b;
    }
    function L(a, b) {
      for (; b && b !== a && !b.nextSibling; )
        b = b.parentNode;
      return b && b !== a ? b.nextSibling : null;
    }
    function M(a, b, c) {
      for (var f = a; f; ) {
        if (f.nodeType === Node.ELEMENT_NODE) {
          var d = f;
          b(d);
          var e = d.localName;
          if (e === "link" && d.getAttribute("rel") === "import") {
            f = d.import;
            c === void 0 && (c = new Set());
            if (f instanceof Node && !c.has(f))
              for (c.add(f), f = f.firstChild; f; f = f.nextSibling)
                M(f, b, c);
            f = L(a, d);
            continue;
          } else if (e === "template") {
            f = L(a, d);
            continue;
          }
          if (d = d.__CE_shadowRoot)
            for (d = d.firstChild; d; d = d.nextSibling)
              M(d, b, c);
        }
        f = f.firstChild ? f.firstChild : L(a, f);
      }
    }
    function N() {
      var a = !(O === null || O === void 0 || !O.noDocumentConstructionObserver), b = !(O === null || O === void 0 || !O.shadyDomFastWalk);
      this.h = [];
      this.a = [];
      this.f = false;
      this.shadyDomFastWalk = b;
      this.C = !a;
    }
    function P(a, b, c, f) {
      var d = window.ShadyDom;
      if (a.shadyDomFastWalk && d && d.inUse) {
        if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll)
          for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++)
            c(a[b]);
      } else
        M(b, c, f);
    }
    function sa(a, b) {
      a.f = true;
      a.h.push(b);
    }
    function ta(a, b) {
      a.f = true;
      a.a.push(b);
    }
    function Q(a, b) {
      a.f && P(a, b, function(c) {
        return R(a, c);
      });
    }
    function R(a, b) {
      if (a.f && !b.__CE_patched) {
        b.__CE_patched = true;
        for (var c = 0; c < a.h.length; c++)
          a.h[c](b);
        for (c = 0; c < a.a.length; c++)
          a.a[c](b);
      }
    }
    function S(a, b) {
      var c = [];
      P(a, b, function(d) {
        return c.push(d);
      });
      for (b = 0; b < c.length; b++) {
        var f = c[b];
        f.__CE_state === 1 ? a.connectedCallback(f) : T(a, f);
      }
    }
    function U(a, b) {
      var c = [];
      P(a, b, function(d) {
        return c.push(d);
      });
      for (b = 0; b < c.length; b++) {
        var f = c[b];
        f.__CE_state === 1 && a.disconnectedCallback(f);
      }
    }
    function V(a, b, c) {
      c = c === void 0 ? {} : c;
      var f = c.D, d = c.upgrade || function(g) {
        return T(a, g);
      }, e = [];
      P(a, b, function(g) {
        a.f && R(a, g);
        if (g.localName === "link" && g.getAttribute("rel") === "import") {
          var h = g.import;
          h instanceof Node && (h.__CE_isImportDocument = true, h.__CE_registry = document.__CE_registry);
          h && h.readyState === "complete" ? h.__CE_documentLoadHandled = true : g.addEventListener("load", function() {
            var k = g.import;
            if (!k.__CE_documentLoadHandled) {
              k.__CE_documentLoadHandled = true;
              var l = new Set();
              f && (f.forEach(function(m) {
                return l.add(m);
              }), l.delete(k));
              V(a, k, { D: l, upgrade: d });
            }
          });
        } else
          e.push(g);
      }, f);
      for (b = 0; b < e.length; b++)
        d(e[b]);
    }
    function T(a, b) {
      try {
        var c = b.ownerDocument, f = c.__CE_registry;
        var d = f && (c.defaultView || c.__CE_isImportDocument) ? W(f, b.localName) : void 0;
        if (d && b.__CE_state === void 0) {
          d.constructionStack.push(b);
          try {
            try {
              if (new d.constructorFunction() !== b)
                throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (k) {
            throw b.__CE_state = 2, k;
          }
          b.__CE_state = 1;
          b.__CE_definition = d;
          if (d.attributeChangedCallback && b.hasAttributes()) {
            var e = d.observedAttributes;
            for (d = 0; d < e.length; d++) {
              var g = e[d], h = b.getAttribute(g);
              h !== null && a.attributeChangedCallback(b, g, null, h, null);
            }
          }
          J(b) && a.connectedCallback(b);
        }
      } catch (k) {
        X(k);
      }
    }
    N.prototype.connectedCallback = function(a) {
      var b = a.__CE_definition;
      if (b.connectedCallback)
        try {
          b.connectedCallback.call(a);
        } catch (c) {
          X(c);
        }
    };
    N.prototype.disconnectedCallback = function(a) {
      var b = a.__CE_definition;
      if (b.disconnectedCallback)
        try {
          b.disconnectedCallback.call(a);
        } catch (c) {
          X(c);
        }
    };
    N.prototype.attributeChangedCallback = function(a, b, c, f, d) {
      var e = a.__CE_definition;
      if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b))
        try {
          e.attributeChangedCallback.call(a, b, c, f, d);
        } catch (g) {
          X(g);
        }
    };
    function ua(a, b, c, f) {
      var d = b.__CE_registry;
      if (d && (f === null || f === "http://www.w3.org/1999/xhtml") && (d = W(d, c)))
        try {
          var e = new d.constructorFunction();
          if (e.__CE_state === void 0 || e.__CE_definition === void 0)
            throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");
          if (e.namespaceURI !== "http://www.w3.org/1999/xhtml")
            throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");
          if (e.hasAttributes())
            throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");
          if (e.firstChild !== null)
            throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");
          if (e.parentNode !== null)
            throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");
          if (e.ownerDocument !== b)
            throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");
          if (e.localName !== c)
            throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
          return e;
        } catch (g) {
          return X(g), b = f === null ? n.call(b, c) : p2.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, R(a, b), b;
        }
      b = f === null ? n.call(b, c) : p2.call(b, f, c);
      R(a, b);
      return b;
    }
    function X(a) {
      var b = a.message, c = a.sourceURL || a.fileName || "", f = a.line || a.lineNumber || 0, d = a.column || a.columnNumber || 0, e = void 0;
      ErrorEvent.prototype.initErrorEvent === void 0 ? e = new ErrorEvent("error", { cancelable: true, message: b, filename: c, lineno: f, colno: d, error: a }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", false, true, b, c, f), e.preventDefault = function() {
        Object.defineProperty(this, "defaultPrevented", { configurable: true, get: function() {
          return true;
        } });
      });
      e.error === void 0 && Object.defineProperty(e, "error", { configurable: true, enumerable: true, get: function() {
        return a;
      } });
      window.dispatchEvent(e);
      e.defaultPrevented || console.error(a);
    }
    function va() {
      var a = this;
      this.a = void 0;
      this.w = new Promise(function(b) {
        a.g = b;
      });
    }
    va.prototype.resolve = function(a) {
      if (this.a)
        throw Error("Already resolved.");
      this.a = a;
      this.g(a);
    };
    function wa(a) {
      var b = document;
      this.g = void 0;
      this.b = a;
      this.a = b;
      V(this.b, this.a);
      this.a.readyState === "loading" && (this.g = new MutationObserver(this.A.bind(this)), this.g.observe(this.a, { childList: true, subtree: true }));
    }
    function xa(a) {
      a.g && a.g.disconnect();
    }
    wa.prototype.A = function(a) {
      var b = this.a.readyState;
      b !== "interactive" && b !== "complete" || xa(this);
      for (b = 0; b < a.length; b++)
        for (var c = a[b].addedNodes, f = 0; f < c.length; f++)
          V(this.b, c[f]);
    };
    function Y(a) {
      this.j = new Map();
      this.l = new Map();
      this.u = new Map();
      this.o = false;
      this.s = new Map();
      this.i = function(b) {
        return b();
      };
      this.c = false;
      this.m = [];
      this.b = a;
      this.v = a.C ? new wa(a) : void 0;
    }
    Y.prototype.B = function(a, b) {
      var c = this;
      if (!(b instanceof Function))
        throw new TypeError("Custom element constructor getters must be functions.");
      ya(this, a);
      this.j.set(a, b);
      this.m.push(a);
      this.c || (this.c = true, this.i(function() {
        return za(c);
      }));
    };
    Y.prototype.define = function(a, b) {
      var c = this;
      if (!(b instanceof Function))
        throw new TypeError("Custom element constructors must be functions.");
      ya(this, a);
      Aa(this, a, b);
      this.m.push(a);
      this.c || (this.c = true, this.i(function() {
        return za(c);
      }));
    };
    function ya(a, b) {
      if (!qa(b))
        throw new SyntaxError("The element name '" + b + "' is not valid.");
      if (W(a, b))
        throw Error("A custom element with name '" + (b + "' has already been defined."));
      if (a.o)
        throw Error("A custom element is already being defined.");
    }
    function Aa(a, b, c) {
      a.o = true;
      var f;
      try {
        var d = c.prototype;
        if (!(d instanceof Object))
          throw new TypeError("The custom element constructor's prototype is not an object.");
        var e = function(m) {
          var x = d[m];
          if (x !== void 0 && !(x instanceof Function))
            throw Error("The '" + m + "' callback must be a function.");
          return x;
        };
        var g = e("connectedCallback");
        var h = e("disconnectedCallback");
        var k = e("adoptedCallback");
        var l = (f = e("attributeChangedCallback")) && c.observedAttributes || [];
      } catch (m) {
        throw m;
      } finally {
        a.o = false;
      }
      c = {
        localName: b,
        constructorFunction: c,
        connectedCallback: g,
        disconnectedCallback: h,
        adoptedCallback: k,
        attributeChangedCallback: f,
        observedAttributes: l,
        constructionStack: []
      };
      a.l.set(b, c);
      a.u.set(c.constructorFunction, c);
      return c;
    }
    Y.prototype.upgrade = function(a) {
      V(this.b, a);
    };
    function za(a) {
      if (a.c !== false) {
        a.c = false;
        for (var b = [], c = a.m, f = new Map(), d = 0; d < c.length; d++)
          f.set(c[d], []);
        V(a.b, document, { upgrade: function(k) {
          if (k.__CE_state === void 0) {
            var l = k.localName, m = f.get(l);
            m ? m.push(k) : a.l.has(l) && b.push(k);
          }
        } });
        for (d = 0; d < b.length; d++)
          T(a.b, b[d]);
        for (d = 0; d < c.length; d++) {
          for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++)
            T(a.b, g[h]);
          (e = a.s.get(e)) && e.resolve(void 0);
        }
        c.length = 0;
      }
    }
    Y.prototype.get = function(a) {
      if (a = W(this, a))
        return a.constructorFunction;
    };
    Y.prototype.whenDefined = function(a) {
      if (!qa(a))
        return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
      var b = this.s.get(a);
      if (b)
        return b.w;
      b = new va();
      this.s.set(a, b);
      var c = this.l.has(a) || this.j.has(a);
      a = this.m.indexOf(a) === -1;
      c && a && b.resolve(void 0);
      return b.w;
    };
    Y.prototype.polyfillWrapFlushCallback = function(a) {
      this.v && xa(this.v);
      var b = this.i;
      this.i = function(c) {
        return a(function() {
          return b(c);
        });
      };
    };
    function W(a, b) {
      var c = a.l.get(b);
      if (c)
        return c;
      if (c = a.j.get(b)) {
        a.j.delete(b);
        try {
          return Aa(a, b, c());
        } catch (f) {
          X(f);
        }
      }
    }
    window.CustomElementRegistry = Y;
    Y.prototype.define = Y.prototype.define;
    Y.prototype.upgrade = Y.prototype.upgrade;
    Y.prototype.get = Y.prototype.get;
    Y.prototype.whenDefined = Y.prototype.whenDefined;
    Y.prototype.polyfillDefineLazy = Y.prototype.B;
    Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;
    function Z(a, b, c) {
      function f(d) {
        return function(e) {
          for (var g = [], h = 0; h < arguments.length; ++h)
            g[h] = arguments[h];
          h = [];
          for (var k = [], l = 0; l < g.length; l++) {
            var m = g[l];
            m instanceof Element && J(m) && k.push(m);
            if (m instanceof DocumentFragment)
              for (m = m.firstChild; m; m = m.nextSibling)
                h.push(m);
            else
              h.push(m);
          }
          d.apply(this, g);
          for (g = 0; g < k.length; g++)
            U(a, k[g]);
          if (J(this))
            for (g = 0; g < h.length; g++)
              k = h[g], k instanceof Element && S(a, k);
        };
      }
      c.prepend !== void 0 && (b.prepend = f(c.prepend));
      c.append !== void 0 && (b.append = f(c.append));
    }
    function Ba(a) {
      Document.prototype.createElement = function(b) {
        return ua(a, this, b, null);
      };
      Document.prototype.importNode = function(b, c) {
        b = aa.call(this, b, !!c);
        this.__CE_registry ? V(a, b) : Q(a, b);
        return b;
      };
      Document.prototype.createElementNS = function(b, c) {
        return ua(a, this, c, b);
      };
      Z(a, Document.prototype, { prepend: ba, append: ca });
    }
    function Ca(a) {
      function b(f) {
        return function(d) {
          for (var e = [], g = 0; g < arguments.length; ++g)
            e[g] = arguments[g];
          g = [];
          for (var h = [], k = 0; k < e.length; k++) {
            var l = e[k];
            l instanceof Element && J(l) && h.push(l);
            if (l instanceof DocumentFragment)
              for (l = l.firstChild; l; l = l.nextSibling)
                g.push(l);
            else
              g.push(l);
          }
          f.apply(this, e);
          for (e = 0; e < h.length; e++)
            U(a, h[e]);
          if (J(this))
            for (e = 0; e < g.length; e++)
              h = g[e], h instanceof Element && S(a, h);
        };
      }
      var c = Element.prototype;
      ia !== void 0 && (c.before = b(ia));
      ja !== void 0 && (c.after = b(ja));
      ka !== void 0 && (c.replaceWith = function(f) {
        for (var d = [], e = 0; e < arguments.length; ++e)
          d[e] = arguments[e];
        e = [];
        for (var g = [], h = 0; h < d.length; h++) {
          var k = d[h];
          k instanceof Element && J(k) && g.push(k);
          if (k instanceof DocumentFragment)
            for (k = k.firstChild; k; k = k.nextSibling)
              e.push(k);
          else
            e.push(k);
        }
        h = J(this);
        ka.apply(this, d);
        for (d = 0; d < g.length; d++)
          U(a, g[d]);
        if (h)
          for (U(a, this), d = 0; d < e.length; d++)
            g = e[d], g instanceof Element && S(a, g);
      });
      la !== void 0 && (c.remove = function() {
        var f = J(this);
        la.call(this);
        f && U(a, this);
      });
    }
    function Da(a) {
      function b(d, e) {
        Object.defineProperty(d, "innerHTML", { enumerable: e.enumerable, configurable: true, get: e.get, set: function(g) {
          var h = this, k = void 0;
          J(this) && (k = [], P(a, this, function(x) {
            x !== h && k.push(x);
          }));
          e.set.call(this, g);
          if (k)
            for (var l = 0; l < k.length; l++) {
              var m = k[l];
              m.__CE_state === 1 && a.disconnectedCallback(m);
            }
          this.ownerDocument.__CE_registry ? V(a, this) : Q(a, this);
          return g;
        } });
      }
      function c(d, e) {
        d.insertAdjacentElement = function(g, h) {
          var k = J(h);
          g = e.call(this, g, h);
          k && U(a, h);
          J(g) && S(a, h);
          return g;
        };
      }
      function f(d, e) {
        function g(h, k) {
          for (var l = []; h !== k; h = h.nextSibling)
            l.push(h);
          for (k = 0; k < l.length; k++)
            V(a, l[k]);
        }
        d.insertAdjacentHTML = function(h, k) {
          h = h.toLowerCase();
          if (h === "beforebegin") {
            var l = this.previousSibling;
            e.call(this, h, k);
            g(l || this.parentNode.firstChild, this);
          } else if (h === "afterbegin")
            l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);
          else if (h === "beforeend")
            l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);
          else if (h === "afterend")
            l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);
          else
            throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        };
      }
      y && (Element.prototype.attachShadow = function(d) {
        d = y.call(this, d);
        if (a.f && !d.__CE_patched) {
          d.__CE_patched = true;
          for (var e = 0; e < a.h.length; e++)
            a.h[e](d);
        }
        return this.__CE_shadowRoot = d;
      });
      z && z.get ? b(Element.prototype, z) : I && I.get ? b(HTMLElement.prototype, I) : ta(a, function(d) {
        b(d, { enumerable: true, configurable: true, get: function() {
          return q.call(this, true).innerHTML;
        }, set: function(e) {
          var g = this.localName === "template", h = g ? this.content : this, k = p2.call(document, this.namespaceURI, this.localName);
          for (k.innerHTML = e; 0 < h.childNodes.length; )
            u.call(h, h.childNodes[0]);
          for (e = g ? k.content : k; 0 < e.childNodes.length; )
            r.call(h, e.childNodes[0]);
        } });
      });
      Element.prototype.setAttribute = function(d, e) {
        if (this.__CE_state !== 1)
          return B.call(this, d, e);
        var g = A.call(this, d);
        B.call(this, d, e);
        e = A.call(this, d);
        a.attributeChangedCallback(this, d, g, e, null);
      };
      Element.prototype.setAttributeNS = function(d, e, g) {
        if (this.__CE_state !== 1)
          return E2.call(this, d, e, g);
        var h = D.call(this, d, e);
        E2.call(this, d, e, g);
        g = D.call(this, d, e);
        a.attributeChangedCallback(this, e, h, g, d);
      };
      Element.prototype.removeAttribute = function(d) {
        if (this.__CE_state !== 1)
          return C.call(this, d);
        var e = A.call(this, d);
        C.call(this, d);
        e !== null && a.attributeChangedCallback(this, d, e, null, null);
      };
      Element.prototype.removeAttributeNS = function(d, e) {
        if (this.__CE_state !== 1)
          return F.call(this, d, e);
        var g = D.call(this, d, e);
        F.call(this, d, e);
        var h = D.call(this, d, e);
        g !== h && a.attributeChangedCallback(this, e, g, h, d);
      };
      na ? c(HTMLElement.prototype, na) : G && c(Element.prototype, G);
      oa ? f(HTMLElement.prototype, oa) : H && f(Element.prototype, H);
      Z(a, Element.prototype, { prepend: fa, append: ha });
      Ca(a);
    }
    var Ea = {};
    function Fa(a) {
      function b() {
        var c = this.constructor;
        var f = document.__CE_registry.u.get(c);
        if (!f)
          throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
        var d = f.constructionStack;
        if (d.length === 0)
          return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, R(a, d), d;
        var e = d.length - 1, g = d[e];
        if (g === Ea)
          throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
        d[e] = Ea;
        Object.setPrototypeOf(g, c.prototype);
        R(a, g);
        return g;
      }
      b.prototype = ma.prototype;
      Object.defineProperty(HTMLElement.prototype, "constructor", { writable: true, configurable: true, enumerable: false, value: b });
      window.HTMLElement = b;
    }
    function Ga(a) {
      function b(c, f) {
        Object.defineProperty(c, "textContent", { enumerable: f.enumerable, configurable: true, get: f.get, set: function(d) {
          if (this.nodeType === Node.TEXT_NODE)
            f.set.call(this, d);
          else {
            var e = void 0;
            if (this.firstChild) {
              var g = this.childNodes, h = g.length;
              if (0 < h && J(this)) {
                e = Array(h);
                for (var k = 0; k < h; k++)
                  e[k] = g[k];
              }
            }
            f.set.call(this, d);
            if (e)
              for (d = 0; d < e.length; d++)
                U(a, e[d]);
          }
        } });
      }
      Node.prototype.insertBefore = function(c, f) {
        if (c instanceof DocumentFragment) {
          var d = K(c);
          c = t.call(this, c, f);
          if (J(this))
            for (f = 0; f < d.length; f++)
              S(a, d[f]);
          return c;
        }
        d = c instanceof Element && J(c);
        f = t.call(this, c, f);
        d && U(a, c);
        J(this) && S(a, c);
        return f;
      };
      Node.prototype.appendChild = function(c) {
        if (c instanceof DocumentFragment) {
          var f = K(c);
          c = r.call(this, c);
          if (J(this))
            for (var d = 0; d < f.length; d++)
              S(a, f[d]);
          return c;
        }
        f = c instanceof Element && J(c);
        d = r.call(this, c);
        f && U(a, c);
        J(this) && S(a, c);
        return d;
      };
      Node.prototype.cloneNode = function(c) {
        c = q.call(this, !!c);
        this.ownerDocument.__CE_registry ? V(a, c) : Q(a, c);
        return c;
      };
      Node.prototype.removeChild = function(c) {
        var f = c instanceof Element && J(c), d = u.call(this, c);
        f && U(a, c);
        return d;
      };
      Node.prototype.replaceChild = function(c, f) {
        if (c instanceof DocumentFragment) {
          var d = K(c);
          c = v.call(this, c, f);
          if (J(this))
            for (U(a, f), f = 0; f < d.length; f++)
              S(a, d[f]);
          return c;
        }
        d = c instanceof Element && J(c);
        var e = v.call(this, c, f), g = J(this);
        g && U(a, f);
        d && U(a, c);
        g && S(a, c);
        return e;
      };
      w && w.get ? b(Node.prototype, w) : sa(a, function(c) {
        b(c, { enumerable: true, configurable: true, get: function() {
          for (var f = [], d = this.firstChild; d; d = d.nextSibling)
            d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);
          return f.join("");
        }, set: function(f) {
          for (; this.firstChild; )
            u.call(this, this.firstChild);
          f != null && f !== "" && r.call(this, document.createTextNode(f));
        } });
      });
    }
    var O = window.customElements;
    function Ha() {
      var a = new N();
      Fa(a);
      Ba(a);
      Z(a, DocumentFragment.prototype, { prepend: da, append: ea });
      Ga(a);
      Da(a);
      a = new Y(a);
      document.__CE_registry = a;
      Object.defineProperty(window, "customElements", { configurable: true, enumerable: true, value: a });
    }
    O && !O.forcePolyfill && typeof O.define == "function" && typeof O.get == "function" || Ha();
    window.__CE_installPolyfill = Ha;
  }).call(self);
  var view = "uni-view {\n  display: block;\n}\nuni-view[hidden] {\n  display: none;\n}\n";
  const VD_SYNC = "vdSync";
  const ON_WEBVIEW_READY = "onWebviewReady";
  function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
  const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  const EMPTY_OBJ = {};
  const NOOP = () => {
  };
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  function formatLog(module, ...args) {
    return `[${Date.now()}][${module}]\uFF1A${args.map((arg) => JSON.stringify(arg)).join(" ")}`;
  }
  const ATTR_MAP = {
    class: ".c",
    style: ".s",
    onClick: ".e0",
    onChange: ".e1",
    onInput: ".e2",
    onLoad: ".e3",
    onError: ".e4",
    onTouchstart: ".e5",
    onTouchmove: ".e6",
    onTouchcancel: ".e7",
    onTouchend: ".e8",
    onLongpress: ".e9",
    onTransitionend: ".ea",
    onAnimationstart: ".eb",
    onAnimationiteration: ".ec",
    onAnimationend: ".ed",
    onTouchforcechange: ".ee"
  };
  const COMPONENT_MAP = {
    VIEW: 1,
    IMAGE: 2,
    TEXT: 3,
    "#text": 4,
    "#comment": 5,
    NAVIGATOR: 6,
    FORM: 7,
    BUTTON: 8,
    INPUT: 9,
    LABEL: 10,
    RADIO: 11,
    CHECKBOX: 12,
    "CHECKBOX-GROUP": 13,
    AD: 14,
    AUDIO: 15,
    CAMERA: 16,
    CANVAS: 17,
    "COVER-IMAGE": 18,
    "COVER-VIEW": 19,
    EDITOR: 20,
    "FUNCTIONAL-PAGE-NAVIGATOR": 21,
    ICON: 22,
    "RADIO-GROUP": 23,
    "LIVE-PLAYER": 24,
    "LIVE-PUSHER": 25,
    MAP: 26,
    "MOVABLE-AREA": 27,
    "MOVABLE-VIEW": 28,
    "OFFICIAL-ACCOUNT": 29,
    "OPEN-DATA": 30,
    PICKER: 31,
    "PICKER-VIEW": 32,
    "PICKER-VIEW-COLUMN": 33,
    PROGRESS: 34,
    "RICH-TEXT": 35,
    "SCROLL-VIEW": 36,
    SLIDER: 37,
    SWIPER: 38,
    "SWIPER-ITEM": 39,
    SWITCH: 40,
    TEXTAREA: 41,
    VIDEO: 42,
    "WEB-VIEW": 43
  };
  const DECODED_ATTR_MAP = /* @__PURE__ */ Object.keys(ATTR_MAP).reduce((map, name) => {
    map[ATTR_MAP[name]] = name;
    return map;
  }, Object.create(null));
  function decodeAttr(name) {
    return DECODED_ATTR_MAP[name] || name;
  }
  const DECODED_COMPONENT_ARR = /* @__PURE__ */ Object.keys(COMPONENT_MAP).reduce((arr, name) => {
    arr.push(name.toLowerCase());
    return arr;
  }, [""]);
  function decodeTag(tag) {
    return DECODED_COMPONENT_ARR[tag] || tag;
  }
  const E = function() {
  };
  E.prototype = {
    on: function(name, callback, ctx) {
      var e = this.e || (this.e = {});
      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx
      });
      return this;
    },
    once: function(name, callback, ctx) {
      var self2 = this;
      function listener() {
        self2.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },
    emit: function(name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;
      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }
      return this;
    },
    off: function(name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];
      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }
      liveEvents.length ? e[name] = liveEvents : delete e[name];
      return this;
    }
  };
  function initBridge(subscribeNamespace) {
    const emitter = new E();
    return {
      on(event, callback) {
        return emitter.on(event, callback);
      },
      once(event, callback) {
        return emitter.once(event, callback);
      },
      off(event, callback) {
        return emitter.off(event, callback);
      },
      emit(event, ...args) {
        return emitter.emit(event, ...args);
      },
      subscribe(event, callback, once = false) {
        emitter[once ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
      },
      unsubscribe(event, callback) {
        emitter.off(`${subscribeNamespace}.${event}`, callback);
      },
      subscribeHandler(event, args, pageId2) {
        {
          console.log(formatLog(subscribeNamespace, "subscribeHandler", pageId2, event, args));
        }
        emitter.emit(`${subscribeNamespace}.${event}`, args, pageId2);
      }
    };
  }
  const ViewJSBridge = /* @__PURE__ */ initBridge("service");
  const targetMap = new WeakMap();
  const effectStack = [];
  let activeEffect;
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect2 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect2();
    }
    return effect2;
  }
  function stop(effect2) {
    if (effect2.active) {
      cleanup(effect2);
      if (effect2.options.onStop) {
        effect2.options.onStop();
      }
      effect2.active = false;
    }
  }
  let uid = 0;
  function createReactiveEffect(fn, options) {
    const effect2 = function reactiveEffect() {
      if (!effect2.active) {
        return fn();
      }
      if (!effectStack.includes(effect2)) {
        cleanup(effect2);
        try {
          enableTracking();
          effectStack.push(effect2);
          activeEffect = effect2;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect2.id = uid++;
    effect2.allowRecurse = !!options.allowRecurse;
    effect2._isEffect = true;
    effect2.active = true;
    effect2.raw = fn;
    effect2.deps = [];
    effect2.options = options;
    return effect2;
  }
  function cleanup(effect2) {
    const { deps } = effect2;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect2);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
    }
  }
  new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  function unref(ref) {
    return isRef(ref) ? ref.value : ref;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  const stack = [];
  function warn(msg, ...args) {
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
        trace
      ]);
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = type;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    {
      console.error(err);
    }
  }
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPreFlushCbs = [];
  let activePreFlushCbs = null;
  let preFlushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  let currentPreFlushParentJob = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(job) {
    let start = flushIndex + 1;
    let end = queue.length;
    const jobId = getId(job);
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJobId = getId(queue[middle]);
      middleJobId < jobId ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
      const pos = findInsertionIndex(job);
      if (pos > -1) {
        queue.splice(pos, 0, job);
      } else {
        queue.push(job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queueCb(cb, activeQueue, pendingQueue, index) {
    if (!isArray(cb)) {
      if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
        pendingQueue.push(cb);
      }
    } else {
      pendingQueue.push(...cb);
    }
    queueFlush();
  }
  function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
      currentPreFlushParentJob = parentJob;
      activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
      pendingPreFlushCbs.length = 0;
      for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
        activePreFlushCbs[preFlushIndex]();
      }
      activePreFlushCbs = null;
      preFlushIndex = 0;
      currentPreFlushParentJob = null;
      flushPreFlushCbs(seen, parentJob);
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    flushPreFlushCbs(seen);
    queue.sort((a, b) => getId(a) - getId(b));
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (false)
            ;
          callWithErrorHandling(job, null, 14);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs();
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      const count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        const instance = fn.ownerInstance;
        const componentName = instance && getComponentName(instance.type);
        warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const INITIAL_WATCHER_VALUE = {};
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = !!source._shallow;
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some(isReactive);
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else
          ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(source, instance, 2);
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup2) {
            cleanup2();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup2;
    let onInvalidate = (fn) => {
      cleanup2 = runner.options.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
      };
    };
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!runner.active) {
        return;
      }
      if (cb) {
        const newValue = runner();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup2) {
            cleanup2();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
            onInvalidate
          ]);
          oldValue = newValue;
        }
      } else {
        runner();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      scheduler = () => {
        if (!instance || instance.isMounted) {
          queuePreFlushCb(job);
        } else {
          job();
        }
      };
    }
    const runner = effect(getter, {
      lazy: true,
      onTrack,
      onTrigger,
      scheduler
    });
    recordInstanceBoundEffect(runner, instance);
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = runner();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(runner, instance && instance.suspense);
    } else {
      runner();
    }
    return () => {
      stop(runner);
      if (instance) {
        remove(instance.effects, runner);
      }
    };
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    return doWatch(getter, cb.bind(publicThis), options, this);
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, seen = new Set()) {
    if (!isObject(value) || seen.has(value) || value["__v_skip"]) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    cache.set(base, resolved);
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose")
        ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    destroyed: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(extend(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend(Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  const getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = extend(Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => () => queueJob(i.update),
    $nextTick: (i) => nextTick.bind(i.proxy),
    $watch: (i) => instanceWatch.bind(i)
  });
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 0:
              return setupState[key];
            case 1:
              return data[key];
            case 3:
              return ctx[key];
            case 2:
              return props[key];
          }
        } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
          accessCache[key] = 0;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 1;
          return data[key];
        } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
          accessCache[key] = 2;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 3;
          return ctx[key];
        } else {
          accessCache[key] = 4;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance, "get", key);
        }
        return publicGetter(instance);
      } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 3;
        return ctx[key];
      } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
        {
          return globalProperties[key];
        }
      } else
        ;
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        setupState[key] = value;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
      } else if (hasOwn(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
      let normalizedProps;
      return accessCache[key] !== void 0 || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    }
  };
  extend({}, PublicInstanceProxyHandlers, {
    get(target, key) {
      if (key === Symbol.unscopables) {
        return;
      }
      return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
      const has = key[0] !== "_" && !isGloballyWhitelisted(key);
      return has;
    }
  });
  let currentInstance = null;
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        }
      }));
    }
  }
  function recordInstanceBoundEffect(effect2, instance = currentInstance) {
    if (instance) {
      (instance.effects || (instance.effects = [])).push(effect2);
    }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  const svgNS = "http://www.w3.org/2000/svg";
  const doc = typeof document !== "undefined" ? document : null;
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is, props) => {
      const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    cloneNode(el) {
      const cloned = el.cloneNode(true);
      if (`_value` in el) {
        cloned._value = el._value;
      }
      return cloned;
    },
    insertStaticContent(content, parent, anchor, isSVG, cached) {
      if (cached) {
        let first2;
        let last2;
        let i = 0;
        let l = cached.length;
        for (; i < l; i++) {
          const node = cached[i].cloneNode(true);
          if (i === 0)
            first2 = node;
          if (i === l - 1)
            last2 = node;
          parent.insertBefore(node, anchor);
        }
        return [first2, last2];
      }
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (anchor) {
        let insertionPoint;
        let usingTempInsertionPoint = false;
        if (anchor instanceof Element) {
          insertionPoint = anchor;
        } else {
          usingTempInsertionPoint = true;
          insertionPoint = isSVG ? doc.createElementNS(svgNS, "g") : doc.createElement("div");
          parent.insertBefore(insertionPoint, anchor);
        }
        insertionPoint.insertAdjacentHTML("beforebegin", content);
        if (usingTempInsertionPoint) {
          parent.removeChild(insertionPoint);
        }
      } else {
        parent.insertAdjacentHTML("beforeend", content);
      }
      let first = before ? before.nextSibling : parent.firstChild;
      const last = anchor ? anchor.previousSibling : parent.lastChild;
      const ret = [];
      while (first) {
        ret.push(first);
        if (first === last)
          break;
        first = first.nextSibling;
      }
      return ret;
    }
  };
  function patchClass(el, value, isSVG) {
    if (value == null) {
      value = "";
    }
    if (isSVG) {
      el.setAttribute("class", value);
    } else {
      const transitionClasses = el._vtc;
      if (transitionClasses) {
        value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
      }
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    const style = el.style;
    if (!next) {
      el.removeAttribute("style");
    } else if (isString(next)) {
      if (prev !== next) {
        const current = style.display;
        style.cssText = next;
        if ("_vod" in el) {
          style.display = current;
        }
      }
    } else {
      for (const key in next) {
        setStyle(style, key, next[key]);
      }
      if (prev && !isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean = isSpecialBooleanAttr(key);
      if (value == null || isBoolean && value === false) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    if (key === "value" && el.tagName !== "PROGRESS") {
      el._value = value;
      const newValue = value == null ? "" : value;
      if (el.value !== newValue) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (value === "" && type === "boolean") {
        el[key] = true;
        return;
      } else if (value == null && type === "string") {
        el[key] = "";
        el.removeAttribute(key);
        return;
      } else if (type === "number") {
        el[key] = 0;
        el.removeAttribute(key);
        return;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
  }
  let _getNow = Date.now;
  let skipTimestampCheck = false;
  if (typeof window !== "undefined") {
    if (_getNow() > document.createEvent("Event").timeStamp) {
      _getNow = () => performance.now();
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  let cachedNow = 0;
  const p = Promise.resolve();
  const reset = () => {
    cachedNow = 0;
  };
  const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    return [hyphenate(name.slice(2)), options];
  }
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      const timeStamp = e.timeStamp || _getNow();
      if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
      }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn(e2));
    } else {
      return value;
    }
  }
  const nativeOnRE = /^on[a-z]/;
  const forcePatchProp = (_, key) => key === "value";
  const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    switch (key) {
      case "class":
        patchClass(el, nextValue, isSVG);
        break;
      case "style":
        patchStyle(el, prevValue, nextValue);
        break;
      default:
        if (isOn(key)) {
          if (!isModelListener(key)) {
            patchEvent(el, key, prevValue, nextValue, parentComponent);
          }
        } else if (shouldSetAsProp(el, key, nextValue, isSVG)) {
          patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
        } else {
          if (key === "true-value") {
            el._trueValue = nextValue;
          } else if (key === "false-value") {
            el._falseValue = nextValue;
          }
          patchAttr(el, key, nextValue, isSVG);
        }
        break;
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML") {
        return true;
      }
      if (key in el && nativeOnRE.test(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  extend({ patchProp, forcePatchProp }, nodeOps);
  function updateCssVar(cssVars) {
    const style = document.documentElement.style;
    Object.keys(cssVars).forEach((name) => {
      style.setProperty(name, cssVars[name]);
    });
  }
  function disableScrollListener(evt) {
    evt.preventDefault();
  }
  let testReachBottomTimer;
  let lastScrollHeight = 0;
  function createScrollListener({
    onPageScroll,
    onReachBottom,
    onReachBottomDistance
  }) {
    let ticking = false;
    let hasReachBottom = false;
    let reachBottomLocking = true;
    const isReachBottom = () => {
      const { scrollHeight } = document.documentElement;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const isBottom = scrollY > 0 && scrollHeight > windowHeight && scrollY + windowHeight + onReachBottomDistance >= scrollHeight;
      const heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance;
      if (isBottom && (!hasReachBottom || heightChanged)) {
        lastScrollHeight = scrollHeight;
        hasReachBottom = true;
        return true;
      }
      if (!isBottom && hasReachBottom) {
        hasReachBottom = false;
      }
      return false;
    };
    const trigger = () => {
      onPageScroll && onPageScroll(window.pageYOffset);
      function testReachBottom() {
        if (isReachBottom()) {
          onReachBottom && onReachBottom();
          reachBottomLocking = false;
          setTimeout(function() {
            reachBottomLocking = true;
          }, 350);
          return true;
        }
      }
      if (onReachBottom && reachBottomLocking) {
        if (testReachBottom())
          ;
        else {
          testReachBottomTimer = setTimeout(testReachBottom, 300);
        }
      }
      ticking = false;
    };
    return function onScroll() {
      clearTimeout(testReachBottomTimer);
      if (!ticking) {
        requestAnimationFrame(trigger);
      }
      ticking = true;
    };
  }
  const APP_SERVICE_ID = "__uniapp__service";
  const UniViewJSBridge$1 = /* @__PURE__ */ extend(ViewJSBridge, {
    publishHandler
  });
  let pageId;
  function publishHandler(event, args = {}) {
    if (!pageId) {
      pageId = plus.webview.currentWebview().id;
    }
    {
      console.log(`[${Date.now()}][View]: ` + pageId + " " + event + " " + JSON.stringify(args));
    }
    plus.webview.postMessageToUniNView({
      type: "subscribeHandler",
      args: {
        type: event,
        data: args,
        pageId
      }
    }, APP_SERVICE_ID);
  }
  const ACTION_TYPE_PAGE_CREATE = 1;
  const ACTION_TYPE_PAGE_CREATED = 2;
  const ACTION_TYPE_CREATE = 3;
  const ACTION_TYPE_INSERT = 4;
  const ACTION_TYPE_REMOVE = 5;
  const ACTION_TYPE_SET_ATTRIBUTE = 6;
  const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
  const ACTION_TYPE_SET_TEXT = 8;
  const elements = new Map();
  function $(id) {
    return elements.get(id);
  }
  function createElement(id, tag) {
    const element = document.createElement(decodeTag(tag));
    elements.set(id, element);
    return element;
  }
  function setElementAttr(element, name, value) {
    element.setAttribute(decodeAttr(name), value);
  }
  function onNodeCreate(id, tag) {
    return createElement(id, decodeTag(tag));
  }
  function onNodeInsert(nodeId, parentNodeId, refNodeId, nodeJson) {
    const element = $(nodeId);
    $(parentNodeId).insertBefore(initElement(element, nodeJson), $(refNodeId));
  }
  function initElement(element, { a, s }) {
    initAttribute(element, a);
    return element;
  }
  function initAttribute(element, attr) {
    if (!attr) {
      return;
    }
    Object.keys(attr).forEach((name) => setElementAttr(element, name, attr[name]));
  }
  function onNodeRemove(nodeId, parentNodeId) {
  }
  function onNodeRemoveAttr(nodeId, name) {
  }
  function onNodeSetAttr(nodeId, name, value) {
  }
  function onNodeSetText(nodeId, text) {
  }
  function onPageCreate({
    route,
    disableScroll,
    onPageScroll,
    onPageReachBottom,
    onReachBottomDistance,
    statusbarHeight,
    windowTop,
    windowBottom
  }) {
    const pageId2 = plus.webview.currentWebview().id;
    window.__id__ = pageId2;
    document.title = `${route}[${pageId2}]`;
    initCssVar(statusbarHeight, windowTop, windowBottom);
    if (disableScroll) {
      document.addEventListener("touchmove", disableScrollListener);
    } else if (onPageScroll || onPageReachBottom) {
      initPageScroll(onPageScroll, onPageReachBottom, onReachBottomDistance);
    }
  }
  function initCssVar(statusbarHeight, windowTop, windowBottom) {
    const cssVars = {
      "--window-left": "0px",
      "--window-right": "0px",
      "--window-top": windowTop + "px",
      "--window-bottom": windowBottom + "px",
      "--status-bar-height": statusbarHeight + "px"
    };
    {
      console.log(formatLog("initCssVar", cssVars));
    }
    updateCssVar(cssVars);
  }
  function initPageScroll(onPageScroll, onPageReachBottom, onReachBottomDistance) {
    const opts = {};
    if (onPageScroll) {
      opts.onPageScroll = (scrollTop) => {
        UniViewJSBridge.publishHandler("onPageScroll", { scrollTop });
      };
    }
    if (onPageReachBottom) {
      opts.onReachBottomDistance = onReachBottomDistance;
      opts.onReachBottom = () => UniViewJSBridge.publishHandler("onReachBottom");
    }
    requestAnimationFrame(() => document.addEventListener("scroll", createScrollListener(opts)));
  }
  function onPageCreated() {
  }
  function onVdSync(actions) {
    actions.forEach((action) => {
      switch (action[0]) {
        case ACTION_TYPE_PAGE_CREATE:
          return onPageCreate(action[1]);
        case ACTION_TYPE_PAGE_CREATED:
          return onPageCreated();
        case ACTION_TYPE_CREATE:
          return onNodeCreate(action[1], action[2]);
        case ACTION_TYPE_INSERT:
          return onNodeInsert(action[1], action[2], action[3], action[4]);
        case ACTION_TYPE_REMOVE:
          return onNodeRemove(action[1], action[2]);
        case ACTION_TYPE_SET_ATTRIBUTE:
          return onNodeSetAttr(action[1], action[2], action[3]);
        case ACTION_TYPE_REMOVE_ATTRIBUTE:
          return onNodeRemoveAttr(action[1], action[2]);
        case ACTION_TYPE_SET_TEXT:
          return onNodeSetText(action[1], action[2]);
      }
    });
  }
  function initSubscribeHandlers() {
    const { subscribe } = UniViewJSBridge;
    subscribe(VD_SYNC, onVdSync);
  }
  function preventDoubleTap() {
    if (String(navigator.vendor).indexOf("Apple") === 0) {
      let firstEvent = null;
      let timeout;
      document.documentElement.addEventListener("click", (event) => {
        const TIME_MAX = 450;
        const PAGE_MAX = 44;
        clearTimeout(timeout);
        if (firstEvent && Math.abs(event.pageX - firstEvent.pageX) <= PAGE_MAX && Math.abs(event.pageY - firstEvent.pageY) <= PAGE_MAX && event.timeStamp - firstEvent.timeStamp <= TIME_MAX) {
          event.preventDefault();
        }
        firstEvent = event;
        timeout = setTimeout(() => {
          firstEvent = null;
        }, TIME_MAX);
      });
    }
  }
  function initView() {
    initSubscribeHandlers();
    preventDoubleTap();
  }
  window.UniViewJSBridge = UniViewJSBridge$1;
  function onWebviewReady() {
    initView();
    UniViewJSBridge$1.publishHandler(ON_WEBVIEW_READY);
  }
  if (typeof plus !== "undefined") {
    onWebviewReady();
  } else {
    document.addEventListener("plusready", onWebviewReady);
  }
});
