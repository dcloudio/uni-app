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
            if (el.__vueParentComponent) {
                ctx = Object.assign({}, ctx, el.__vueParentComponent.attrs, el.__vueParentComponent.props);
            }
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
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
var isPromise = function (obj) {
    return !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function";
};
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
function getVmNodeId(vm) {
    {
        return vm._uid || vm.uid;
    }
}
function toCamelCase(str) {
    return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}
function isXByPage(page) {
    return !!(page === null || page === void 0 ? void 0 : page.getElementById);
}
function getCompatiblePage(page) {
    return isXByPage(page) ? page.vm : page;
}
function get$PageByPage(page) {
    return isXByPage(page) ? page.vm.$basePage : page.$page;
}
function get$PageByPageVm(page) {
    return isXByPage(page.$page) ? page.$basePage : page.$page;
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
        return (tagName.indexOf("UNI-") === 0 ||
            tagName === "BODY" ||
            // v-pre => V-UNI-
            tagName.indexOf("V-UNI-") === 0 ||
            // uvue3 web
            // @ts-expect-error
            el.__isUniElement);
    }
    return false;
}
function transEl(el) {
    var _a, _b;
    if (!isValidEl(el)) {
        throw Error("no such element");
    }
    var elem = {
        elementId: getElId(el),
        tagName: el.tagName.toLocaleLowerCase().replace("uni-", ""),
    };
    // vue2
    if (el.__vue__) {
        var vm = el.__vue__;
        if (vm) {
            if (vm.$parent && vm.$parent.$el === el) {
                vm = vm.$parent;
            }
            if (vm && !((_a = vm.$options) === null || _a === void 0 ? void 0 : _a.isReserved)) {
                elem.nodeId = getVmNodeId(vm);
            }
        }
    }
    else {
        // __vnode 在 production 环境中未暴露，改为 __vueParentComponent
        // android 和 ios 在 view 层无法获取自定义组件实例，先屏蔽掉
        {
            var vm = el.__vueParentComponent;
            if (vm) {
                if (vm.subTree.el === el) {
                    vm = vm.parent;
                }
                if (!((_b = vm.type) === null || _b === void 0 ? void 0 : _b.__reserved)) {
                    elem.nodeId = getVmNodeId(vm);
                }
            }
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
function getVm(el) {
    if (el.__vue__) {
        return {
            isVue3: false,
            vm: el.__vue__,
        };
    }
    else {
        return {
            isVue3: true,
            vm: el.__vueParentComponent,
        };
    }
}
function getScrollViewMain(el) {
    var _a = getVm(el), isVue3 = _a.isVue3, vm = _a.vm;
    if (!isVue3) {
        return vm.$refs.main;
    }
    else {
        return vm.exposed.$getMain();
    }
}
var FUNCTIONS = {
    input: {
        input: function (el, value) {
            var _a = getVm(el), isVue3 = _a.isVue3, vm = _a.vm;
            if (!isVue3) {
                vm.valueSync = value;
                vm.$triggerInput({}, { value: value });
            }
            else {
                vm.exposed && vm.exposed.$triggerInput({ value: value });
            }
        },
    },
    textarea: {
        input: function (el, value) {
            var _a = getVm(el), isVue3 = _a.isVue3, vm = _a.vm;
            if (!isVue3) {
                vm.valueSync = value;
                vm.$triggerInput({}, { value: value });
            }
            else {
                vm.exposed && vm.exposed.$triggerInput({ value: value });
            }
        },
    },
    "scroll-view": {
        scrollTo: function (el, x, y) {
            var main = getScrollViewMain(el);
            main.scrollLeft = x;
            main.scrollTop = y;
        },
        scrollTop: function (el) {
            var main = getScrollViewMain(el);
            return main.scrollTop;
        },
        scrollLeft: function (el) {
            var main = getScrollViewMain(el);
            return main.scrollLeft;
        },
        scrollWidth: function (el) {
            var main = getScrollViewMain(el);
            return main.scrollWidth;
        },
        scrollHeight: function (el) {
            var main = getScrollViewMain(el);
            return main.scrollHeight;
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
                var value = getDataByPath(context, toCamelCase(name));
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
        return new Promise(function (resolve) {
            el.dispatchEvent(new TouchEvent("touchstart", {
                cancelable: true,
                bubbles: true,
                touches: createTouchList([
                    {
                        identifier: 1,
                        target: el,
                        pageX: 0,
                        pageY: 0,
                        clientX: 0,
                        clientY: 0,
                        screenX: 0,
                        screenY: 0,
                    },
                ]),
                targetTouches: createTouchList([]),
                changedTouches: createTouchList([
                    {
                        identifier: 1,
                        target: el,
                        pageX: 0,
                        pageY: 0,
                        clientX: 0,
                        clientY: 0,
                        screenX: 0,
                        screenY: 0,
                    },
                ]),
            }));
            setTimeout(function () {
                resolve();
            }, 400);
        });
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
                identifier: 1,
                target: el,
            });
        }
        eventInitDict.touches.forEach(function (touch) {
            touch.target = el;
        });
        eventInitDict.changedTouches.forEach(function (touch) {
            touch.target = el;
        });
        var touches = createTouchList(eventInitDict.touches);
        var changedTouches = createTouchList(eventInitDict.changedTouches);
        var targetTouches = createTouchList([]);
        el.dispatchEvent(new TouchEvent(type, {
            cancelable: true,
            bubbles: true,
            touches: touches,
            targetTouches: targetTouches,
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
        if (vm === null || vm === void 0 ? void 0 : vm.$trigger) {
            vm.$trigger(type, {}, detail);
        }
        else {
            // 简单支持 vue3 input focus blur
            switch (type) {
                case "focus":
                    // @ts-expect-error
                    el.focus();
                    break;
                case "blur":
                    var inputEl = el.getElementsByTagName("input")[0];
                    inputEl.blur();
                    break;
            }
        }
        return Promise.resolve();
    },
};
function createTouchList(touchInits) {
    var _a;
    var touches = touchInits.map(function (touch) { return createTouch(touch); });
    if (document.createTouchList) {
        return (_a = document).createTouchList.apply(_a, touches);
    }
    return touches;
}
function createTouch(touch) {
    if (document.createTouch) {
        return document.createTouch(window, touch.target, touch.identifier, touch.pageX, touch.pageY, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
    }
    return new Touch(touch);
}
var WebAdapter = adapter;

function initWebApi() {
    return Object.assign({}, initPage(WebAdapter), initElement(WebAdapter));
}

var Api$1 = initWebApi();
function send$1(data) {
    return UniViewJSBridge.publishHandler("onAutoMessageReceive", data);
}
UniViewJSBridge.subscribe("sendAutoMessage", function (_a) {
    var id = _a.id, method = _a.method, params = _a.params;
    var data = { id: id };
    // Heartbeat monitoring
    if (method == "ping") {
        data.result = "pong";
        send$1(data);
        return;
    }
    var fn = Api$1[method];
    if (!fn) {
        data.error = {
            message: method + " unimplemented",
        };
        return send$1(data);
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
            send$1(data);
        });
    }
    catch (err) {
        data.error = {
            message: err.message,
        };
        send$1(data);
    }
});

function getPageId(page) {
    var _a;
    if (page.__wxWebviewId__) {
        //mp-weixin
        return page.__wxWebviewId__;
    }
    if (page.privateProperties) {
        //mp-baidu
        return page.privateProperties.slaveId;
    }
    if (get$PageByPageVm(page)) {
        //h5 and app-plus
        return (_a = get$PageByPageVm(page)) === null || _a === void 0 ? void 0 : _a.id;
    }
}
function getPagePath(page) {
    return page.route || page.uri;
}
function getPageQuery(page) {
    return page.options || (page.$page && page.$page.options) || {};
}
function parsePage(page) {
    return {
        id: getPageId(page),
        path: getPagePath(page),
        query: getPageQuery(page),
    };
}
function getPageById(id) {
    return getCurrentPages().find(function (page) {
        return getPageId(getCompatiblePage(page)) === id;
    });
}
function getPageVm(id) {
    var page = getCompatiblePage(getPageById(id));
    return page && page.$vm;
}
function matchNodeId(vm, nodeId) {
    {
        return vm._uid === nodeId || vm.uid === nodeId;
    }
}
function findComponentVm(vm, nodeId, isVue3) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (isVue3 === void 0) { isVue3 = false; }
    var res;
    if (isVue3) {
        if (vm.component && matchNodeId(vm.component, nodeId)) {
            res = vm.component;
        }
        else {
            var children = [];
            if (vm.children instanceof Array) {
                children = vm.children;
            }
            else if (((_b = (_a = vm.component) === null || _a === void 0 ? void 0 : _a.subTree) === null || _b === void 0 ? void 0 : _b.children) &&
                ((_d = (_c = vm.component) === null || _c === void 0 ? void 0 : _c.subTree) === null || _d === void 0 ? void 0 : _d.children) instanceof Array) {
                children = vm.component.subTree.children;
            }
            else if (((_h = (_g = (_f = (_e = vm.component) === null || _e === void 0 ? void 0 : _e.subTree) === null || _f === void 0 ? void 0 : _f.component) === null || _g === void 0 ? void 0 : _g.subTree) === null || _h === void 0 ? void 0 : _h.children) &&
                ((_m = (_l = (_k = (_j = vm.component) === null || _j === void 0 ? void 0 : _j.subTree) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.subTree) === null || _m === void 0 ? void 0 : _m.children) instanceof Array) {
                children = vm.component.subTree.component.subTree.children;
            }
            children.find(function (child) {
                res = findComponentVm(child, nodeId, true);
                return res;
            });
        }
    }
    else {
        if (vm) {
            if (matchNodeId(vm, nodeId)) {
                res = vm;
            }
            else {
                vm.$children.find(function (child) {
                    res = findComponentVm(child, nodeId);
                    return res;
                });
            }
        }
    }
    return res;
}
function getComponentVm(pageId, nodeId) {
    var pageVm = getPageVm(pageId);
    if (!pageVm) {
        return;
    }
    return isVue3(pageVm)
        ? findComponentVm(pageVm.$.subTree, nodeId, true)
        : findComponentVm(pageVm, nodeId);
}
function getData(vm, path) {
    var data;
    var vmData = vm.$data || vm.data;
    if (vm.exposed) {
        vmData = __assign(__assign({}, vmData), vm.exposed);
    }
    else if (vm.$ && vm.$.exposed) {
        vmData = __assign(__assign({}, vmData), vm.$.exposed);
    }
    if (vm) {
        data = path ? getDataByPath(vmData, path) : Object.assign({}, vmData);
    }
    return Promise.resolve({ data: data });
}
function setData(vm, data) {
    if (vm) {
        var _isVue3_1 = isVue3(vm);
        Object.keys(data).forEach(function (name) {
            if (_isVue3_1) {
                // 支持 page.setData 更新 composition API 响应式数据
                if (vm.$.exposed != null) {
                    var vmData_1 = vm.$.exposed;
                    if (typeof data[name] == "object") {
                        Object.keys(data[name]).forEach(function (key) {
                            if (vmData_1[name]) {
                                vmData_1[name][key] = data[name][key];
                            }
                        });
                    }
                    else {
                        vmData_1[name] = data[name];
                    }
                }
                else {
                    // Page => $data component => data
                    var vmData = vm.$data || vm.data;
                    vmData[name] = data[name];
                }
            }
            else {
                // 支持微信小程序 page.setData 更新 composition API 响应式数据
                {
                    vm[name] = data[name];
                }
            }
        });
    }
    return Promise.resolve();
}
var CALL_METHOD_ERROR;
(function (CALL_METHOD_ERROR) {
    CALL_METHOD_ERROR["VM_NOT_EXISTS"] = "VM_NOT_EXISTS";
    CALL_METHOD_ERROR["METHOD_NOT_EXISTS"] = "METHOD_NOT_EXISTS";
})(CALL_METHOD_ERROR || (CALL_METHOD_ERROR = {}));
function callMethod(vm, method, args) {
    if (isVue3(vm)) {
        vm = vm.$vm || vm.ctx;
    }
    return new Promise(function (resolve, reject) {
        var _a;
        var _b;
        if (!vm) {
            return reject(CALL_METHOD_ERROR.VM_NOT_EXISTS);
        }
        if (!vm[method] && !((_b = vm.$.exposed) === null || _b === void 0 ? void 0 : _b[method])) {
            return reject(CALL_METHOD_ERROR.METHOD_NOT_EXISTS);
        }
        var ret = vm[method]
            ? vm[method].apply(vm, args)
            : (_a = vm.$.exposed)[method].apply(_a, args);
        isPromise(ret)
            ? ret.then(function (res) {
                resolve({ result: res });
            })
            : resolve({ result: ret });
    });
}
function isVue3(vm) {
    return !vm.$children;
}
function isInUniXWebview() {
    return (typeof window !== "undefined" &&
        // @ts-expect-error
        (window.__uniapp_x_ || window.__uniapp_x_postMessage));
}
var postMessageId = 1;
var postMessageCallbacks = {};
function postMessageToUniXWebView(data, callback) {
    var _a;
    var id = 0;
    if (callback) {
        id = postMessageId++;
        postMessageCallbacks[id] = callback;
    }
    var message = {
        data: {
            id: id,
            type: "automator",
            data: data,
        },
    };
    console.log("postMessageToUniXWebView", message);
    // @ts-expect-error
    if ((_a = window === null || window === void 0 ? void 0 : window.__uniapp_x_) === null || _a === void 0 ? void 0 : _a.postMessage) {
        // @ts-expect-error
        window.__uniapp_x_.postMessage(JSON.stringify(message));
        // @ts-expect-error
    }
    else if (window === null || window === void 0 ? void 0 : window.__uniapp_x_postMessage) {
        // 兼容 ios
        // @ts-expect-error
        window.__uniapp_x_postMessage({
            data: message,
        });
    }
}
function onPostMessageFromUniXWebView(id, res, error) {
    console.log("onPostMessageFromUniXWebView", id, res, error, postMessageCallbacks);
    var callback = postMessageCallbacks[id];
    if (callback) {
        delete postMessageCallbacks[id];
        callback(error, res);
    }
}

var socketInstanceMap = new Map();
var connectSocket = function (id, url) {
    return new Promise(function (resolve, reject) {
        var socketTask = uni.connectSocket({
            url: url,
            success: function () {
                resolve({ result: { errMsg: "connectSocket:ok" } });
            },
            fail: function () {
                reject({ result: { errMsg: "connectSocket:fail" } });
            },
        });
        socketInstanceMap.set(id, { instance: socketTask, isOpend: false });
        socketTask.onOpen(function (data) {
            socketInstanceMap.get(id).isOpend = true;
            socketInstanceMap.get(id).openData = data;
        });
    });
};
var firstSocketTaskEmitter = function (options) {
    return new Promise(function (resolve, reject) {
        var socketInstanceData = socketInstanceMap.values().next().value;
        if (!socketInstanceData) {
            reject({ errMsg: "socketTask not exists." });
        }
        else {
            var method_1 = options.method;
            if (method_1 === "onOpen") {
                return handleOnOpen(socketInstanceData, resolve);
            }
            if (method_1.startsWith("on")) {
                return socketInstanceData.instance[method_1](function (data) {
                    resolve(data);
                });
            }
            if (method_1 === "sendMessage") {
                method_1 = "send";
            }
            socketInstanceData.instance[method_1](__assign(__assign({}, options), { success: function (result) {
                    resolve({ result: result });
                    method_1 === "close" &&
                        socketInstanceMap.delete(socketInstanceMap.keys().next().value);
                },
                fail: function (error) {
                    reject(error);
                } }));
        }
    });
};
var socketEmitter = function (params) {
    return new Promise(function (resolve, reject) {
        if (!socketInstanceMap.has(params.id)) {
            reject({ errMsg: "socketTask not exists." });
        }
        else {
            var socketInstanceData = socketInstanceMap.get(params.id);
            var socketTask = socketInstanceData.instance;
            var method_2 = params.method;
            var id_1 = params.id;
            if (method_2 == "onOpen") {
                return handleOnOpen(socketInstanceData, resolve);
            }
            if (method_2.startsWith("on")) {
                return socketTask[method_2](function (data) {
                    resolve({ method: "Socket." + method_2, id: id_1, data: data });
                });
            }
            socketTask[method_2](__assign(__assign({}, params), { success: function (result) {
                    resolve(result);
                    method_2 === "close" && socketInstanceMap.delete(params.id);
                },
                fail: function (error) {
                    reject(error);
                } }));
        }
    });
};
function handleOnOpen(socketInstanceData, resolve) {
    var isOpend = socketInstanceData.isOpend;
    if (isOpend) {
        resolve({
            data: socketInstanceData.openData,
        });
    }
    else {
        var timer_1 = setInterval(function () {
            if (socketInstanceData.isOpend) {
                clearInterval(timer_1);
                resolve(socketInstanceData.openData);
            }
        }, 200);
        setTimeout(function () {
            clearInterval(timer_1);
        }, 2000);
    }
}

var SYNC_APIS = [
    "stopRecord",
    "getRecorderManager",
    "pauseVoice",
    "stopVoice",
    "pauseBackgroundAudio",
    "stopBackgroundAudio",
    "getBackgroundAudioManager",
    "createAudioContext",
    "createInnerAudioContext",
    "createVideoContext",
    "createCameraContext",
    "createMapContext",
    "canIUse",
    "startAccelerometer",
    "stopAccelerometer",
    "startCompass",
    "stopCompass",
    "hideToast",
    "hideLoading",
    "showNavigationBarLoading",
    "hideNavigationBarLoading",
    "navigateBack",
    "createAnimation",
    "pageScrollTo",
    "createSelectorQuery",
    "createCanvasContext",
    "createContext",
    "drawCanvas",
    "hideKeyboard",
    "stopPullDownRefresh",
    "arrayBufferToBase64",
    "base64ToArrayBuffer",
];
var onApisEventMap = new Map();
var ON_APIS = [
    "onCompassChange",
    "onThemeChange",
    "onUserCaptureScreen",
    "onWindowResize",
    "onMemoryWarning",
    "onAccelerometerChange",
    "onKeyboardHeightChange",
    "onNetworkStatusChange",
    "onPushMessage",
    "onLocationChange",
    "onGetWifiList",
    "onWifiConnected",
    "onWifiConnectedWithPartialInfo",
    "onSocketOpen",
    "onSocketError",
    "onSocketMessage",
    "onSocketClose",
];
var originUni = {};
var SYNC_API_RE = /^\$|Sync$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var MOCK_API_BLACKLIST_RE = /^on|^off/;
function isSyncApi(method) {
    return SYNC_API_RE.test(method) || SYNC_APIS.indexOf(method) !== -1;
}
function canIMock(method) {
    return !MOCK_API_BLACKLIST_RE.test(method);
}
var App = {
    getPageStack: function () {
        return Promise.resolve({
            pageStack: getCurrentPages().map(function (page) {
                return parsePage(getCompatiblePage(page));
            }),
        });
    },
    getCurrentPage: function () {
        var pages = getCurrentPages();
        var len = pages.length;
        return new Promise(function (resolve, reject) {
            if (!len) {
                reject(Error("getCurrentPages().length=0"));
            }
            else {
                resolve(parsePage(getCompatiblePage(pages[len - 1])));
            }
        });
    },
    callUniMethod: function (params, send) {
        var method = params.method;
        var args = params.args;
        return new Promise(function (resolve, reject) {
            if (method === "connectSocket") {
                connectSocket(args[0]["id"], args[0]["url"])
                    .then(function (res) { return resolve(res); })
                    .catch(function (err) { return reject(err); });
                return;
            }
            if (ON_APIS.includes(method)) {
                if (!onApisEventMap.has(method)) {
                    onApisEventMap.set(method, new Map());
                }
                var uuid_1 = args[0];
                var callback_1 = function (data) {
                    send({ id: uuid_1, result: { method: method, data: data } });
                };
                if (method.startsWith("onSocket")) {
                    firstSocketTaskEmitter({ method: method.replace("Socket", "") })
                        .then(function (res) { return callback_1(res); })
                        .catch(function (err) { return callback_1(err); });
                }
                else {
                    onApisEventMap.get(method).set(uuid_1, callback_1);
                    // @ts-ignore
                    uni[method](callback_1);
                }
                return resolve({ result: null });
            }
            if (method.startsWith("off") &&
                ON_APIS.includes(method.replace("off", "on"))) {
                var onMethod = method.replace("off", "on");
                if (onApisEventMap.has(onMethod)) {
                    var uuid = args[0];
                    if (uuid !== undefined) {
                        var callback = onApisEventMap.get(onMethod).get(uuid);
                        // @ts-ignore
                        uni[method](callback);
                        onApisEventMap.get(onMethod).delete(uuid);
                    }
                    else {
                        var callbacks = onApisEventMap.get(onMethod);
                        callbacks.forEach(function (callback) {
                            // @ts-ignore
                            uni[method](callback);
                        });
                        onApisEventMap.delete(onMethod);
                    }
                }
                return resolve({ result: null });
            }
            if (method.indexOf("Socket") > 0) {
                return firstSocketTaskEmitter(__assign({ method: method.replace("Socket", "") }, args[0]))
                    .then(function (res) { return resolve(res); })
                    .catch(function (err) { return reject(err); });
            }
            if (!uni[method]) {
                return reject(Error("uni." + method + " not exists"));
            }
            if (isSyncApi(method)) {
                return resolve({
                    result: uni[method].apply(uni, args),
                });
            }
            var params = [
                Object.assign({}, args[0] || {}, {
                    success: function (result) {
                        var timeout = method === "pageScrollTo" ? 350 : 0;
                        setTimeout(function () {
                            resolve({ result: result });
                        }, timeout);
                    },
                    fail: function (res) {
                        reject(Error(res.errMsg.replace(method + ":fail ", "")));
                    },
                }),
            ];
            uni[method].apply(uni, params);
        });
    },
    mockUniMethod: function (params) {
        var method = params.method;
        if (!uni[method]) {
            throw Error("uni." + method + " not exists");
        }
        if (!canIMock(method)) {
            throw Error("You can't mock uni." + method);
        }
        // TODO getOwnPropertyDescriptor?
        var result = params.result;
        var functionDeclaration = params.functionDeclaration;
        if (isUndef(result) && isUndef(functionDeclaration)) {
            // restoreUniMethod
            if (originUni[method]) {
                uni[method] = originUni[method];
                delete originUni[method];
            }
            return Promise.resolve();
        }
        var mockFn;
        if (!isUndef(functionDeclaration)) {
            mockFn = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return new Function("return " + functionDeclaration)().apply(mockFn, args.concat(params.args));
            };
        }
        else {
            //result
            mockFn = isSyncApi(method)
                ? function () {
                    return result;
                }
                : function (params) {
                    setTimeout(function () {
                        var isFail = result.errMsg && result.errMsg.indexOf(":fail") !== -1;
                        if (isFail) {
                            params.fail && params.fail(result);
                        }
                        else {
                            params.success && params.success(result);
                        }
                        params.complete && params.complete(result);
                    }, 4);
                };
        }
        mockFn.origin = originUni[method] || uni[method];
        if (!originUni[method]) {
            originUni[method] = uni[method];
        }
        uni[method] = mockFn;
        return Promise.resolve();
    },
    captureScreenshot: function (params) {
        return new Promise(function (resolve, reject) {
            {
                if (isInUniXWebview()) {
                    postMessageToUniXWebView({
                        action: "captureScreenshot",
                        args: params,
                    }, function (err, res) {
                        if (err) {
                            reject(Error("captureScreenshot fail: " + err));
                        }
                        else {
                            resolve(res);
                        }
                    });
                }
                else {
                    reject(Error("captureScreenshot fail: supported only on the app platform."));
                }
            }
        });
    },
    socketEmitter: function (params) {
        return new Promise(function (resolve, reject) {
            socketEmitter(params)
                .then(function (res) { return resolve(res); })
                .catch(function (err) { return reject(err); });
        });
    },
};
var App$1 = App;

var Page = {
    getData: function (params) {
        return getData(getPageVm(params.pageId), params.path);
    },
    setData: function (params) {
        return setData(getPageVm(params.pageId), params.data);
    },
    callMethod: function (params) {
        var _a;
        var err = (_a = {},
            _a[CALL_METHOD_ERROR.VM_NOT_EXISTS] = "Page[" + params.pageId + "] not exists",
            _a[CALL_METHOD_ERROR.METHOD_NOT_EXISTS] = "page." + params.method + " not exists",
            _a);
        return new Promise(function (resolve, reject) {
            callMethod(getPageVm(params.pageId), params.method, params.args)
                .then(function (res) { return resolve(res); })
                .catch(function (type) {
                reject(Error(err[type]));
            });
        });
    },
    callMethodWithCallback: function (params) {
        var _a;
        var err = (_a = {},
            _a[CALL_METHOD_ERROR.VM_NOT_EXISTS] = "callMethodWithCallback:fail, Page[" + params.pageId + "] not exists",
            _a[CALL_METHOD_ERROR.METHOD_NOT_EXISTS] = "callMethodWithCallback:fail, page." + params.method + " not exists",
            _a);
        var callback = params.args[params.args.length - 1];
        callMethod(getPageVm(params.pageId), params.method, params.args).catch(function (type) {
            callback({ errMsg: err[type] });
        });
    },
};
var Page$1 = Page;

function getNodeId(params) {
    return params.nodeId || params.elementId;
}
var Element = {
    getData: function (params) {
        return getData(getComponentVm(params.pageId, getNodeId(params)), params.path);
    },
    setData: function (params) {
        return setData(getComponentVm(params.pageId, getNodeId(params)), params.data);
    },
    callMethod: function (params) {
        var _a;
        var nodeId = getNodeId(params);
        var err = (_a = {},
            _a[CALL_METHOD_ERROR.VM_NOT_EXISTS] = "Component[" + params.pageId + ":" + nodeId + "] not exists",
            _a[CALL_METHOD_ERROR.METHOD_NOT_EXISTS] = "component." + params.method + " not exists",
            _a);
        return new Promise(function (resolve, reject) {
            callMethod(getComponentVm(params.pageId, nodeId), params.method, params.args)
                .then(function (res) { return resolve(res); })
                .catch(function (type) {
                reject(Error(err[type]));
            });
        });
    },
};
var Element$1 = Element;

{
    // uni x 页面调用该方法主动初始化自动化测试
    window.initRuntimeAutomator = initRuntimeAutomator;
    // uni x 页面调用该方法执行回调
    window.onPostMessageFromUniXWebView = onPostMessageFromUniXWebView;
}
var Api = {};
Object.keys(App$1).forEach(function (method) {
    Api["App." + method] = App$1[method];
});
Object.keys(Page$1).forEach(function (method) {
    Api["Page." + method] = Page$1[method];
});
Object.keys(Element$1).forEach(function (method) {
    Api["Element." + method] = Element$1[method];
});
var wsEndpoint = process.env.UNI_AUTOMATOR_WS_ENDPOINT;
var fallback;
var socketTask;
{
    fallback = function (id, method, params, data) {
        var pageId = params.pageId;
        var page = findPageByPageId(pageId);
        if (!page) {
            data.error = {
                message: "page[" + pageId + "] not exists",
            };
            send(data);
            return true;
        }
        !!get$PageByPage(page).meta.isNVue;
        {
            UniServiceJSBridge.publishHandler("sendAutoMessage", {
                id: id,
                method: method,
                params: params,
            }, pageId);
            return true;
        }
    };
    UniServiceJSBridge.subscribe("onAutoMessageReceive", function (res) {
        send(res);
    });
}
function send(data) {
    // TODO: 客户端修复之前的临时方案，用于解决定时器执行时机问题
    {
        socketTask.send({ data: JSON.stringify(data) });
    }
}
function findPageByPageId(pageId) {
    var pages = getCurrentPages();
    if (!pageId) {
        return pages[pages.length - 1];
    }
    return pages.find(function (page) { return get$PageByPage(page).id === pageId; });
}
function onMessage(res) {
    var _a = JSON.parse(res.data), id = _a.id, method = _a.method, params = _a.params;
    var data = { id: id };
    var fn = Api[method];
    if (!fn) {
        if (fallback) {
            var result = fallback(id, method, params, data);
            if (result === true) {
                return;
            }
            fn = result;
        }
        if (!fn) {
            data.error = {
                message: method + " unimplemented",
            };
            return send(data);
        }
    }
    try {
        fn(params, send)
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
}
function initRuntimeAutomator(options) {
    if (options === void 0) { options = {}; }
    socketTask = uni.connectSocket({
        url: options.wsEndpoint || wsEndpoint,
        complete: function () { },
    });
    socketTask.onMessage(onMessage);
    socketTask.onOpen(function (res) {
        options.success && options.success();
        console.log("已开启自动化测试...");
    });
    socketTask.onError(function (res) {
        console.log("automator.onError", res);
    });
    socketTask.onClose(function () {
        options.fail && options.fail({ errMsg: "$$initRuntimeAutomator:fail" });
        console.log("automator.onClose");
    });
}
{
    setTimeout(function () {
        if (isInUniXWebview()) {
            // 通知 uni x 当前页面已经 ready
            postMessageToUniXWebView({
                action: "ready",
            });
        }
        else {
            // 自动化测试发行模式，写死了 0000 端口
            if (wsEndpoint && wsEndpoint.endsWith(":0000")) {
                return;
            }
            initRuntimeAutomator();
        }
    }, 500);
}
