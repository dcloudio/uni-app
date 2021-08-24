!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(e){return!(!e||"undefined"==typeof e.length)}function t(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],c(e,this)}function r(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(r){return void f(n.promise,r)}i(n.promise,o)}else(1===e._state?i:f)(n.promise,e._value)})):e._deferreds.push(n)}function i(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var t=n.then;if(n instanceof o)return e._state=3,e._value=n,void u(e);if("function"==typeof t)return void c(function(e,n){return function(){e.apply(n,arguments)}}(t,n),e)}e._state=1,e._value=n,u(e)}catch(r){f(e,r)}}function f(e,n){e._state=2,e._value=n,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;t>n;n++)r(e,e._deferreds[n]);e._deferreds=null}function c(e,n){var t=!1;try{e(function(e){t||(t=!0,i(n,e))},function(e){t||(t=!0,f(n,e))})}catch(o){if(t)return;t=!0,f(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,n){var o=new this.constructor(t);return r(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,n,o)),o},o.prototype["finally"]=e,o.all=function(e){return new o(function(t,o){function r(e,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var u=n.then;if("function"==typeof u)return void u.call(n,function(n){r(e,n)},o)}i[e]=n,0==--f&&t(i)}catch(c){o(c)}}if(!n(e))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(t,r){if(!n(e))return r(new TypeError("Promise.race accepts an array"));for(var i=0,f=e.length;f>i;i++)o.resolve(e[i]).then(t,r)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=e):l.Promise=o});

function initPage(adapter) {
    return {
        "Page.getElement": function (params) {
            return adapter.querySelector(adapter.getDocument(params.pageId), params.selector);
        },
        "Page.getElements": function (params) {
            return adapter.querySelectorAll(adapter.getDocument(params.pageId), params.selector);
        },
        "Page.getWindowProperties": function (params) {
            return adapter.queryProperties(adapter.getWindow(params.pageId), params.names);
        },
    };
}

function initElement(adapter) {
    var getEl = function (params) { return adapter.getEl(params.elementId, params.pageId); };
    return {
        "Element.getElement": function (params) {
            return adapter.querySelector(getEl(params), params.selector);
        },
        "Element.getElements": function (params) {
            return adapter.querySelectorAll(getEl(params), params.selector);
        },
        "Element.getDOMProperties": function (params) {
            return adapter.queryProperties(getEl(params), params.names);
        },
        "Element.getProperties": function (params) {
            var el = getEl(params);
            var ctx = el.__vue__ || el.attr || {};
            return adapter.queryProperties(ctx, params.names);
        },
        "Element.getOffset": function (params) {
            return adapter.getOffset(getEl(params));
        },
        "Element.getAttributes": function (params) {
            return adapter.queryAttributes(getEl(params), params.names);
        },
        "Element.getStyles": function (params) {
            return adapter.queryStyles(getEl(params), params.names);
        },
        "Element.getHTML": function (params) {
            return adapter.queryHTML(getEl(params), params.type);
        },
        "Element.tap": function (params) {
            return adapter.dispatchTapEvent(getEl(params));
        },
        "Element.longpress": function (params) {
            return adapter.dispatchLongpressEvent(getEl(params));
        },
        "Element.touchstart": function (params) {
            return adapter.dispatchTouchEvent(getEl(params), "touchstart", params);
        },
        "Element.touchmove": function (params) {
            return adapter.dispatchTouchEvent(getEl(params), "touchmove", params);
        },
        "Element.touchend": function (params) {
            return adapter.dispatchTouchEvent(getEl(params), "touchend", params);
        },
        "Element.callFunction": function (params) {
            return adapter.callFunction(getEl(params), params.functionName, params.args);
        },
        "Element.triggerEvent": function (params) {
            return adapter.triggerEvent(getEl(params), params.type, params.detail);
        },
    };
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function (val, key) { return hasOwnProperty.call(val, key); };
var isUndef = function (v) {
    return v === undefined || v === null;
};
var isArray = Array.isArray;
var cacheStringFunction = function (fn) {
    var cache = Object.create(null);
    return (function (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction(function (str) {
    return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ""); });
});
var capitalize = cacheStringFunction(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});
var PATH_RE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
function getPaths(path, data) {
    if (isArray(path)) {
        return path;
    }
    if (data && hasOwn(data, path)) {
        return [path];
    }
    var res = [];
    path.replace(PATH_RE, function (match, p1, offset, string) {
        res.push(offset ? string.replace(/\\(\\)?/g, "$1") : p1 || match);
        return string;
    });
    return res;
}
function getDataByPath(data, path) {
    var paths = getPaths(path, data);
    var dataPath;
    for (dataPath = paths.shift(); !isUndef(dataPath);) {
        if (null == (data = data[dataPath])) {
            return;
        }
        dataPath = paths.shift();
    }
    return data;
}
function findParent(vm) {
    var parent = vm.$parent;
    while (parent) {
        if (parent._$id) {
            return parent;
        }
        parent = parent.$parent;
    }
}
function getVmNodeId(vm) {
    //@ts-ignore
    {
        if (vm._$weex) {
            return vm._uid;
        }
        if (vm._$id) {
            return vm._$id;
        }
        var parent_1 = findParent(vm);
        if (!vm.$parent) {
            return "-1";
        }
        var vnode = vm.$vnode;
        var context = vnode.context;
        // slot 内的组件，需要补充 context 的 id，否则可能与内部组件索引值一致，导致 id 冲突
        if (context && context !== parent_1 && context._$id) {
            return context._$id + ";" + parent_1._$id + "," + vnode.data.attrs._i;
        }
        return parent_1._$id + "," + vnode.data.attrs._i;
    }
}

var elementMap = new Map();
function getElId(element) {
    var elementId = element._id;
    if (!elementId) {
        elementId = v4();
        element._id = elementId;
        elementMap.set(elementId, { id: elementId, element: element });
    }
    return elementId;
}
function isValidEl(el) {
    if (el) {
        var tagName = el.tagName;
        return tagName.indexOf("UNI-") === 0 || tagName === "BODY";
    }
    return false;
}
function transEl(el) {
    if (!isValidEl(el)) {
        throw Error("no such element");
    }
    var elem = {
        elementId: getElId(el),
        tagName: el.tagName.toLocaleLowerCase().replace("uni-", ""),
    };
    var vm = el.__vue__;
    if (vm) {
        if (vm.$parent && vm.$parent.$el === el) {
            vm = vm.$parent;
        }
        if (vm && !vm.$options.isReserved) {
            elem.nodeId = getVmNodeId(vm);
        }
    }
    if (elem.tagName === "video") {
        elem.videoId = elem.nodeId;
    }
    return elem;
}
function formatHTML(html) {
    return html
        .replace(/\n/g, "")
        .replace(/(<uni-text[^>]*>)(<span[^>]*>[^<]*<\/span>)(.*?<\/uni-text>)/g, "$1$3")
        .replace(/<\/?[^>]*>/g, function (replacement) {
        if (-1 < replacement.indexOf("<body")) {
            return "<page>";
        }
        else if ("</body>" === replacement) {
            return "</page>";
        }
        else if (0 !== replacement.indexOf("<uni-") &&
            0 !== replacement.indexOf("</uni-")) {
            return "";
        }
        return replacement
            .replace(/uni-/g, "")
            .replace(/ role=""/g, "")
            .replace(/ aria-label=""/g, "");
    });
}
var FUNCTIONS = {
    input: {
        input: function (el, value) {
            var vm = el.__vue__;
            vm.valueSync = value;
            vm.$triggerInput({}, { value: value });
        },
    },
    textarea: {
        input: function (el, value) {
            var vm = el.__vue__;
            vm.valueSync = value;
            vm.$triggerInput({}, { value: value });
        },
    },
    "scroll-view": {
        scrollTo: function (el, x, y) {
            var main = el.__vue__.$refs.main;
            main.scrollLeft = x;
            main.scrollTop = y;
        },
        scrollTop: function (el) {
            return el.__vue__.$refs.main.scrollTop;
        },
        scrollLeft: function (el) {
            return el.__vue__.$refs.main.scrollLeft;
        },
        scrollWidth: function (el) {
            return el.__vue__.$refs.main.scrollWidth;
        },
        scrollHeight: function (el) {
            return el.__vue__.$refs.main.scrollHeight;
        },
    },
    swiper: {
        swipeTo: function (el, index) {
            el.__vue__.current = index;
        },
    },
    "movable-view": {
        moveTo: function (el, x, y) {
            el.__vue__._animationTo(x, y);
        },
    },
    switch: {
        tap: function (el) {
            el.click();
        },
    },
    slider: {
        slideTo: function (el, value) {
            var vm = el.__vue__;
            var slider = vm.$refs["uni-slider"];
            var offsetWidth = slider.offsetWidth;
            var boxLeft = slider.getBoundingClientRect().left;
            vm.value = value;
            vm._onClick({
                x: ((value - vm.min) * offsetWidth) / (vm.max - vm.min) + boxLeft,
            });
        },
    },
};
var adapter = {
    getWindow: function (pageId) {
        return window;
    },
    getDocument: function (pageId) {
        return document;
    },
    getEl: function (elementId) {
        var element = elementMap.get(elementId);
        if (!element) {
            throw Error("element destroyed");
        }
        return element.element;
    },
    getOffset: function (node) {
        var rect = node.getBoundingClientRect();
        return Promise.resolve({
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
        });
    },
    querySelector: function (context, selector) {
        if (selector === "page") {
            //TODO h5平台？
            selector = "body";
        }
        return Promise.resolve(transEl(context.querySelector(selector)));
    },
    querySelectorAll: function (context, selector) {
        var elements = [];
        var nodeList = document.querySelectorAll(selector);
        [].forEach.call(nodeList, function (node) {
            try {
                elements.push(transEl(node));
            }
            catch (e) { }
        });
        return Promise.resolve({ elements: elements });
    },
    queryProperties: function (context, names) {
        return Promise.resolve({
            properties: names.map(function (name) {
                var value = getDataByPath(context, name);
                if (name === "document.documentElement.scrollTop" && value === 0) {
                    value = getDataByPath(context, "document.body.scrollTop");
                }
                return value;
            }),
        });
    },
    queryAttributes: function (context, names) {
        return Promise.resolve({
            attributes: names.map(function (name) {
                return String(context.getAttribute(name));
            }),
        });
    },
    queryStyles: function (context, names) {
        var style = getComputedStyle(context);
        return Promise.resolve({
            styles: names.map(function (name) { return style[name]; }),
        });
    },
    queryHTML: function (context, type) {
        return Promise.resolve({
            html: formatHTML(type === "outer" ? context.outerHTML : context.innerHTML),
        });
    },
    dispatchTapEvent: function (el) {
        el.click();
        return Promise.resolve();
    },
    dispatchLongpressEvent: function (el) {
        return Promise.resolve();
    },
    dispatchTouchEvent: function (el, type, eventInitDict) {
        if (!eventInitDict) {
            eventInitDict = {};
        }
        if (!eventInitDict.touches) {
            eventInitDict.touches = [];
        }
        if (!eventInitDict.changedTouches) {
            eventInitDict.changedTouches = [];
        }
        if (!eventInitDict.touches.length) {
            eventInitDict.touches.push({
                identifier: Date.now(),
                target: el,
            });
        }
        var touches = eventInitDict.touches.map(function (touch) { return new Touch(touch); });
        var changedTouches = eventInitDict.changedTouches.map(function (touch) { return new Touch(touch); });
        el.dispatchEvent(new TouchEvent(type, {
            cancelable: true,
            bubbles: true,
            touches: touches,
            targetTouches: [],
            changedTouches: changedTouches,
        }));
        return Promise.resolve();
    },
    callFunction: function (el, functionName, args) {
        var fn = getDataByPath(FUNCTIONS, functionName);
        if (!fn) {
            return Promise.reject(Error(functionName + " not exists"));
        }
        return Promise.resolve({
            result: fn.apply(null, __spreadArrays([el], args)),
        });
    },
    triggerEvent: function (el, type, detail) {
        var vm = el.__vue__;
        vm.$trigger && vm.$trigger(type, {}, detail);
        return Promise.resolve();
    },
};

var BUILITIN = [
    "movable-view",
    "picker",
    "ad",
    "button",
    "checkbox-group",
    "checkbox",
    "form",
    "icon",
    "label",
    "movable-area",
    "navigator",
    "picker-view-column",
    "picker-view",
    "progress",
    "radio-group",
    "radio",
    "rich-text",
    "u-slider",
    "swiper-item",
    "swiper",
    "switch",
];
var BUILITIN_ALIAS = BUILITIN.map(function (tag) { return capitalize(camelize(tag)); });

function initWebApi() {
    return Object.assign({}, initPage(adapter), initElement(adapter));
}

var Api = initWebApi();
function send(data) {
    return UniViewJSBridge.publishHandler("onAutoMessageReceive", data);
}
UniViewJSBridge.subscribe("sendAutoMessage", function (_a) {
    var id = _a.id, method = _a.method, params = _a.params;
    var data = { id: id };
    var fn = Api[method];
    if (!fn) {
        data.error = {
            message: method + " unimplemented",
        };
        return send(data);
    }
    try {
        fn(params)
            .then(function (res) {
            res && (data.result = res);
        })
            .catch(function (err) {
            data.error = {
                message: err.message,
            };
        })
            .finally(function () {
            send(data);
        });
    }
    catch (err) {
        data.error = {
            message: err.message,
        };
        send(data);
    }
});
