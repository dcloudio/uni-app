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
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var hasOwn$1 = function (val, key) { return hasOwnProperty$1.call(val, key); };
var isUndef$1 = function (v) {
    return v === undefined || v === null;
};
var isArray$1 = Array.isArray;
var isPromise = function (obj) {
    return !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function";
};
var cacheStringFunction = function (fn) {
    var cache = Object.create(null);
    return (function (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(function (str) {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
});
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction(function (str) {
    return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ""); });
});
var capitalize = cacheStringFunction(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});
var PATH_RE$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
function getPaths$1(path, data) {
    if (isArray$1(path)) {
        return path;
    }
    if (data && hasOwn$1(data, path)) {
        return [path];
    }
    var res = [];
    path.replace(PATH_RE$1, function (match, p1, offset, string) {
        res.push(offset ? string.replace(/\\(\\)?/g, "$1") : p1 || match);
        return string;
    });
    return res;
}
function getDataByPath$1(data, path) {
    var paths = getPaths$1(path, data);
    var dataPath;
    for (dataPath = paths.shift(); !isUndef$1(dataPath);) {
        if (null == (data = data[dataPath])) {
            return;
        }
        dataPath = paths.shift();
    }
    return data;
}
function findParent$1(vm) {
    var parent = vm.$parent;
    while (parent) {
        if (parent._$id) {
            return parent;
        }
        parent = parent.$parent;
    }
}
function getVmNodeId$1(vm) {
    {
        if (vm._$weex) {
            return vm._uid;
        }
        if (vm._$id) {
            return vm._$id;
        }
        if (vm.uid) {
            return vm.uid;
        }
        var parent_1 = findParent$1(vm);
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

function getPageId$1(page) {
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
        id: getPageId$1(page),
        path: getPagePath(page),
        query: getPageQuery(page),
    };
}
function getPageById$1(id) {
    return getCurrentPages().find(function (page) {
        return getPageId$1(getCompatiblePage(page)) === id;
    });
}
function getPageVm$1(id) {
    var page = getCompatiblePage(getPageById$1(id));
    return page && page.$vm;
}
function matchNodeId(vm, nodeId) {
    {
        return getVmNodeId$1(vm) === nodeId;
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
    var pageVm = getPageVm$1(pageId);
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
        data = path ? getDataByPath$1(vmData, path) : Object.assign({}, vmData);
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
        if (isUndef$1(result) && isUndef$1(functionDeclaration)) {
            // restoreUniMethod
            if (originUni[method]) {
                uni[method] = originUni[method];
                delete originUni[method];
            }
            return Promise.resolve();
        }
        var mockFn;
        if (!isUndef$1(functionDeclaration)) {
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
                var pages = getCurrentPages();
                var len = pages.length;
                if (len) {
                    var page = getCompatiblePage(pages[len - 1]);
                    if (page) {
                        if (
                        // @ts-expect-error
                        typeof UniElement !== "undefined") {
                            page.$viewToTempFilePath({
                                id: params.id,
                                offsetX: params.offsetX !== null ? params.offsetX : "0",
                                offsetY: params.offsetY !== null ? params.offsetY : "0",
                                wholeContent: params.fullPage == true,
                                path: params.path || "screenshot",
                                overwrite: true,
                                deviceShot: params.deviceShot,
                                area: params.area,
                                success: function (res) {
                                    // @ts-ignore
                                    var fileManager = uni.getFileSystemManager();
                                    fileManager.readFile({
                                        encoding: "base64",
                                        filePath: res.tempFilePath,
                                        success: function (readFileRes) {
                                            resolve({ data: readFileRes.data });
                                        },
                                        fail: function (err) {
                                            reject(Error("captureScreenshot fail: " + (err.message || err.errMsg)));
                                        },
                                    });
                                },
                                fail: function (err) {
                                    reject(Error("captureScreenshot fail: " + (err.message || err.errMsg)));
                                },
                            });
                        }
                        else {
                            // @ts-ignore
                            if (typeof (plus === null || plus === void 0 ? void 0 : plus.nativeObj) === "undefined") {
                                reject(Error("captureScreenshot fail: harmony does not support screenshot"));
                                return;
                            }
                            // @ts-ignore
                            var webview = page.$getAppWebview();
                            // @ts-ignore
                            var bitmap_1 = new plus.nativeObj.Bitmap("captureScreenshot", "captureScreenshot.png");
                            webview.draw(bitmap_1, function (res) {
                                var data = bitmap_1
                                    .toBase64Data()
                                    // android 获取到的结果，去掉前缀
                                    .replace("data:image/png;base64,", "")
                                    // ios 获取到的结果，去掉前缀
                                    .replace("data:image/(null);base64,", "");
                                bitmap_1.clear();
                                resolve({ data: data });
                            }, function (err) {
                                reject(Error("captureScreenshot fail: " + err.message));
                            }, {
                                wholeContent: !!params.fullPage,
                            });
                        }
                    }
                }
                else {
                    reject(Error("getCurrentPage fail."));
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
        return getData(getPageVm$1(params.pageId), params.path);
    },
    setData: function (params) {
        return setData(getPageVm$1(params.pageId), params.data);
    },
    callMethod: function (params) {
        var _a;
        var err = (_a = {},
            _a[CALL_METHOD_ERROR.VM_NOT_EXISTS] = "Page[" + params.pageId + "] not exists",
            _a[CALL_METHOD_ERROR.METHOD_NOT_EXISTS] = "page." + params.method + " not exists",
            _a);
        return new Promise(function (resolve, reject) {
            callMethod(getPageVm$1(params.pageId), params.method, params.args)
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
        callMethod(getPageVm$1(params.pageId), params.method, params.args).catch(function (type) {
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

function initPage$1(adapter) {
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

function initElement$1(adapter) {
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

function getDocument$1(pageId) {
    var page = getCurrentPages().find(function (page) { return get$PageByPage(page).id === pageId; });
    if (!page) {
        throw Error("page[" + pageId + "] not found");
    }
    var weex = page.$vm._$weex;
    if (!weex.document.__$weex__) {
        weex.document.__$weex__ = weex;
    }
    return weex.document;
}
var TAGS = {};
var U_TAGS = {};
["text", "image", "input", "textarea", "video", "web-view", "slider"].forEach(function (tag) {
    TAGS[tag] = true;
    U_TAGS["u-" + tag] = true;
});
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
function transTagName(el) {
    var tagName = el.type;
    if (U_TAGS[tagName]) {
        return tagName.replace("u-", "");
    }
    var componentName = el.__vue__ && el.__vue__.$options.name;
    if (componentName === "USlider") {
        return "slider";
    }
    if (componentName && BUILITIN_ALIAS.indexOf(componentName) !== -1) {
        return hyphenate(componentName);
    }
    return tagName;
}
function transEl$1(el) {
    var elem = {
        elementId: el.nodeId,
        tagName: transTagName(el),
        nvue: true,
    };
    var vm = el.__vue__;
    if (vm && !vm.$options.isReserved) {
        elem.nodeId = vm._uid;
    }
    if (elem.tagName === "video") {
        elem.videoId = elem.nodeId;
    }
    return elem;
}
function querySelectorByFn(node, match, result) {
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
        var childNode = children[i];
        if (match(childNode)) {
            if (result) {
                result.push(childNode);
            }
            else {
                return childNode;
            }
        }
        if (result) {
            querySelectorByFn(childNode, match, result);
        }
        else {
            var res = querySelectorByFn(childNode, match, result);
            if (res) {
                return res;
            }
        }
    }
    return result;
}
function querySelector(context, selector, result) {
    var matchSelector;
    var match;
    if (selector.indexOf("#") === 0) {
        matchSelector = selector.substr(1);
        match = function (node) { return node.attr && node.attr.id === matchSelector; };
    }
    else if (selector.indexOf(".") === 0) {
        matchSelector = selector.substr(1);
        match = function (node) {
            return node.classList && node.classList.indexOf(matchSelector) !== -1;
        };
    }
    if (match) {
        var ret_1 = querySelectorByFn(context, match, result);
        if (!ret_1) {
            throw Error("Node(" + selector + ") not exists");
        }
        return ret_1;
    }
    if (selector === "body") {
        return Object.assign({}, context, { type: "page" });
    }
    if (selector.indexOf("uni-") === 0) {
        selector = selector.replace("uni-", "");
    }
    var tagName = TAGS[selector] ? "u-" + selector : selector;
    var aliasTagName = BUILITIN.indexOf(tagName) !== -1 ? capitalize(camelize(tagName)) : "";
    var ret = querySelectorByFn(context, function (node) {
        return node.type === tagName ||
            (aliasTagName &&
                node.__vue__ &&
                node.__vue__.$options.name === aliasTagName);
    }, result);
    if (!ret) {
        throw Error("Node(" + selector + ") not exists");
    }
    return ret;
}
var DOM_PROPERTIES = [
    {
        test: function (names) {
            return (names.length === 2 &&
                names.indexOf("document.documentElement.scrollWidth") !== -1 &&
                names.indexOf("document.documentElement.scrollHeight") !== -1);
        },
        call: function (node) {
            var weex = node.__$weex__ || node.ownerDocument.__$weex__;
            return new Promise(function (resolve) {
                if (node.type === "scroll-view" && node.children.length === 1) {
                    node = node.children[0];
                }
                weex.requireModule("dom").getComponentRect(node.ref, function (res) {
                    if (res.result) {
                        resolve([res.size.width, res.size.height]);
                    }
                    else {
                        resolve([0, 0]);
                    }
                });
            });
        },
    },
    {
        test: function (names) {
            return (names.length === 1 && names[0] === "document.documentElement.scrollTop");
        },
        call: function (node) {
            var weex = node.__$weex__ || node.ownerDocument.__$weex__;
            return new Promise(function (resolve) {
                if (node.type === "scroll-view" && node.children.length === 1) {
                    node = node.children[0];
                }
                weex.requireModule("dom").getComponentRect(node.ref, function (res) {
                    resolve([(res.size && Math.abs(res.size.top)) || 0]);
                });
            });
        },
    },
    {
        test: function (names) {
            return (names.length === 2 &&
                names.indexOf("offsetWidth") !== -1 &&
                names.indexOf("offsetHeight") !== -1);
        },
        call: function (node) {
            var weex = node.__$weex__ || node.ownerDocument.__$weex__;
            return new Promise(function (resolve) {
                weex.requireModule("dom").getComponentRect(node.ref, function (res) {
                    if (res.result) {
                        resolve([res.size.width, res.size.height]);
                    }
                    else {
                        resolve([0, 0]);
                    }
                });
            });
        },
    },
    {
        test: function (names, node) {
            return names.length === 1 && names[0] === "innerText";
        },
        call: function (node) {
            return Promise.resolve([toText(node, []).join("")]);
        },
    },
];
function toText(node, res) {
    if (node.type === "u-text") {
        res.push(node.attr.value);
    }
    else {
        node.pureChildren.map(function (child) { return toText(child, res); });
    }
    return res;
}
function formatHTML$1(html) {
    return html.replace(/\n/g, "").replace(/<u-/g, "<").replace(/<\/u-/g, "</");
}
function toHTML(node, type) {
    if (type === "outer") {
        if (node.role === "body" && node.type === "scroll-view") {
            return "<page>" + formatHTML$1(toHTML(node, "inner")) + "</page>";
        }
        return formatHTML$1(node.toString());
    }
    return formatHTML$1(node.pureChildren.map(function (child) { return child.toString(); }).join(""));
}
var FUNCTIONS$1 = {
    input: {
        input: function (el, value) {
            el.setValue(value);
        },
    },
    textarea: {
        input: function (el, value) {
            el.setValue(value);
        },
    },
    "scroll-view": {
        scrollTo: function (el, x, y) {
            // TODO
            el.scrollTo(y);
        },
        scrollTop: function (el) {
            // TODO
            return 0;
        },
        scrollLeft: function (el) {
            // TODO
            return 0;
        },
        scrollWidth: function (el) {
            // TODO
            return 0;
        },
        scrollHeight: function (el) {
            // TODO
            return 0;
        },
    },
    swiper: {
        swipeTo: function (el, index) {
            el.__vue__.current = index;
        },
    },
    "movable-view": {
        moveTo: function (el, x, y) {
            var vm = el.__vue__;
            vm.x = x;
            vm.y = y;
        },
    },
    switch: {
        tap: function (el) {
            var vm = el.__vue__;
            vm.checked = !vm.checked;
        },
    },
    slider: {
        slideTo: function (el, value) {
            el.__vue__.value = value;
        },
    },
};
function getRoot(pageId) {
    var doc = getDocument$1(pageId);
    return doc.body;
}
var adapter$1 = {
    getWindow: function (pageId) {
        return getRoot(pageId);
    },
    getDocument: function (pageId) {
        return getRoot(pageId);
    },
    getEl: function (elementId, pageId) {
        var doc = getDocument$1(pageId);
        var element = doc.getRef(elementId);
        if (!element) {
            throw Error("element destroyed");
        }
        return element;
    },
    getOffset: function (node) {
        var weex = node.__$weex__ || node.ownerDocument.__$weex__;
        return new Promise(function (resolve) {
            weex.requireModule("dom").getComponentRect(node.ref, function (res) {
                if (res.result) {
                    resolve({
                        left: res.size.left,
                        top: res.size.top,
                    });
                }
                else {
                    resolve({
                        left: 0,
                        top: 0,
                    });
                }
            });
        });
    },
    querySelector: function (context, selector) {
        return Promise.resolve(transEl$1(querySelector(context, selector)));
    },
    querySelectorAll: function (context, selector) {
        return Promise.resolve({
            elements: querySelector(context, selector, []).map(function (el) {
                return transEl$1(el);
            }),
        });
    },
    queryProperties: function (context, names) {
        var options = DOM_PROPERTIES.find(function (options) {
            return options.test(names, context);
        });
        if (options) {
            return options.call(context).then(function (properties) { return ({
                properties: properties,
            }); });
        }
        return Promise.resolve({
            properties: names.map(function (name) {
                return getDataByPath$1(context, name);
            }),
        });
    },
    queryAttributes: function (context, names) {
        var attr = context.attr;
        return Promise.resolve({
            attributes: names.map(function (name) {
                if (name === "class") {
                    return (context.classList || []).join(" ");
                }
                return String(attr[name] || attr[camelize(name)] || "");
            }),
        });
    },
    queryStyles: function (context, names) {
        var style = context.style;
        return Promise.resolve({
            styles: names.map(function (name) { return style[name]; }),
        });
    },
    queryHTML: function (context, type) {
        return Promise.resolve({
            html: toHTML(context, type),
        });
    },
    dispatchTapEvent: function (el) {
        el.fireEvent("click", {
            timeStamp: Date.now(),
            target: el,
            currentTarget: el,
        }, true);
        return Promise.resolve();
    },
    dispatchLongpressEvent: function (el) {
        el.fireEvent("longpress", {
            timeStamp: Date.now(),
            target: el,
            currentTarget: el,
        }, true);
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
        el.fireEvent(type, Object.assign({
            timeStamp: Date.now(),
            target: el,
            currentTarget: el,
        }, eventInitDict), true);
        return Promise.resolve();
    },
    callFunction: function (el, functionName, args) {
        var fn = getDataByPath$1(FUNCTIONS$1, functionName);
        if (!fn) {
            return Promise.reject(Error(functionName + " not exists"));
        }
        return Promise.resolve({
            result: fn.apply(null, __spreadArrays([el], args)),
        });
    },
    triggerEvent: function (el, type, detail) {
        var vm = el.__vue__;
        if (vm) {
            vm.$trigger && vm.$trigger(type, {}, detail);
        }
        else {
            el.fireEvent(type, {
                timeStamp: Date.now(),
                target: el,
                currentTarget: el,
            }, false, { params: [{ detail: detail }] });
        }
        return Promise.resolve();
    },
};
var NativeAdapter = adapter$1;

function initNativeApi() {
    return Object.assign({}, initPage$1(NativeAdapter), initElement$1(NativeAdapter));
}

var E = function () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
};
E.prototype = {
    on: function (name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx,
        });
        return this;
    },
    once: function (name, callback, ctx) {
        var self = this;
        function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
    },
    emit: function (name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
    },
    off: function (name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
            for (var i = evts.length - 1; i >= 0; i--) {
                if (evts[i].fn === callback || evts[i].fn._ === callback) {
                    evts.splice(i, 1);
                    break;
                }
            }
            liveEvents = evts;
        }
        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
        liveEvents.length ? (e[name] = liveEvents) : delete e[name];
        return this;
    },
};
var Emitter = E;

function initBridge(subscribeNamespace) {
    var emitter = new Emitter();
    return {
        subscribe: function (event, callback, once) {
            if (once === void 0) { once = false; }
            emitter[once ? "once" : "on"](subscribeNamespace + "." + event, callback);
        },
        subscribeHandler: function (event, args, pageId) {
            emitter.emit(subscribeNamespace + "." + event, args, pageId);
        },
    };
}

var extend = Object.assign;

var UniXServiceJSBridge = /*#__PURE__*/ extend(initBridge("service"), {
    publishHandler: function (event, args, pageId) {
        UniViewJSBridge.subscribeHandler(event, args, pageId);
    },
});

var UniXViewJSBridge = /*#__PURE__*/ extend(initBridge("view"), {
    publishHandler: function (event, args, pageId) {
        UniServiceJSBridge.subscribeHandler(event, args, pageId);
    },
});

{
    // uni-app x 的 iOS 平台需要定制
    if (typeof UniServiceJSBridge === "undefined" &&
        typeof UniViewJSBridge === "undefined") {
        var __global__ = typeof globalThis === "undefined"
            ? Function("return this")()
            : globalThis;
        __global__.UniServiceJSBridge = UniXServiceJSBridge;
        __global__.UniViewJSBridge = UniXViewJSBridge;
    }
}
var Api$1 = {};
Object.keys(App$1).forEach(function (method) {
    Api$1["App." + method] = App$1[method];
});
Object.keys(Page$1).forEach(function (method) {
    Api$1["Page." + method] = Page$1[method];
});
Object.keys(Element$1).forEach(function (method) {
    Api$1["Element." + method] = Element$1[method];
});
var wsEndpoint = process.env.UNI_AUTOMATOR_WS_ENDPOINT;
var NVueApi;
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
            send$1(data);
            return true;
        }
        var isNVue = !!get$PageByPage(page).meta.isNVue;
        if (!isNVue) {
            UniServiceJSBridge.publishHandler("sendAutoMessage", {
                id: id,
                method: method,
                params: params,
            }, pageId);
            return true;
        }
        if (!NVueApi) {
            NVueApi = initNativeApi();
        }
        return NVueApi[method];
    };
    UniServiceJSBridge.subscribe("onAutoMessageReceive", function (res) {
        send$1(res);
    });
}
function send$1(data) {
    // TODO: 客户端修复之前的临时方案，用于解决定时器执行时机问题
    {
        setTimeout(function () {
            socketTask.send({ data: JSON.stringify(data) });
        }, 0);
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
    var fn = Api$1[method];
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
            return send$1(data);
        }
    }
    try {
        fn(params, send$1)
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
            return adapter.queryProperties(el, params.names);
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
        "Element.callContextMethod": function (params) {
            return adapter.callContextMethod(getEl(params), params.method, params.args);
        },
    };
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function (val, key) { return hasOwnProperty.call(val, key); };
var isUndef = function (v) {
    return v === undefined || v === null;
};
var isArray = Array.isArray;
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
    {
        if (vm._$weex) {
            return vm._uid;
        }
        if (vm._$id) {
            return vm._$id;
        }
        if (vm.uid) {
            return vm.uid;
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
function isTextElement(el) {
    return el.tagName === "TEXT" || el.tagName === "TEXTAREA";
}
function getChildrenText(node) {
    var result = "";
    // @ts-expect-error
    node.childNodes.forEach(function (child) {
        if (isTextElement(child)) {
            result += child.getAttribute("value");
        }
        else {
            result += getChildrenText(child);
        }
    });
    return result;
}
function removeUniPrefix(selector) {
    if (selector.startsWith("uni-")) {
        return selector.replace("uni-", "");
    }
    return selector;
}
function triggerEvent(el, type, detail) {
    var componentEvent = {
        input: {
            // @ts-ignore
            input: UniInputEvent,
            // @ts-ignore
            focus: UniInputFocusEvent,
            // @ts-ignore
            blur: UniInputBlurEvent,
        },
        textarea: {
            // @ts-ignore
            input: UniInputEvent,
        },
        "scroll-view": {
            // @ts-ignore
            scroll: UniScrollEvent,
            // @ts-ignore
            scrollend: UniScrollEvent,
            // @ts-ignore
            scrolltoupper: UniScrollToUpperEvent,
            // @ts-ignore
            scrolltolower: UniScrollToLowerEvent,
        },
    };
    var tagName = el.tagName.toLocaleLowerCase();
    if (componentEvent[tagName] &&
        componentEvent[tagName][type]) {
        var targetEvent = componentEvent[tagName][type];
        var event_1 = new targetEvent(type, {
            detail: detail,
        });
        if (detail) {
            Object.assign(event_1, {
                detail: detail,
            });
        }
        return Promise.resolve(el.dispatchEvent(type, 
        // @ts-expect-error
        event_1));
    }
    else {
        return Promise.reject(Error(tagName + " component " + type + " event not exists"));
    }
}
function getPageId(page) {
    return page.$nativePage.pageId;
}
function getPageById(id) {
    var pages = getCurrentPages();
    var result = null;
    pages.forEach(function (page) {
        if (getPageId(page.vm) == id) {
            result = page.vm;
        }
    });
    return result;
}
function getPageVm(id) {
    return getPageById(id);
}
function getElementById(pageId, elementId) {
    var page = getPageVm(pageId);
    if (page == null) {
        return "Page[" + pageId + "] not exists";
    }
    var element = page.$nativePage.document.getRealDomNodeById(elementId);
    return element || "element[" + elementId + "] not exists";
}

function transEl(el) {
    var _a, _b, _c;
    var elem = {
        elementId: el.id,
        tagName: el.tagName.toLocaleLowerCase().replace("uni-", ""),
    };
    var vm = el.__vueParentComponent;
    if (vm) {
        // ios 内置组件有两种类型
        // 1. view、button 这种 element 类型组件，其vm为外层组件实例
        // 2. picker-view 这种经过封装的组件，其vm为自身组件封装的实例, proxy.$options.rootElement不为空
        if (((_a = vm.ctx) === null || _a === void 0 ? void 0 : _a.$el) === el && !((_c = (_b = vm.proxy) === null || _b === void 0 ? void 0 : _b.$options) === null || _c === void 0 ? void 0 : _c.rootElement)) {
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
            // @ts-expect-error
            var inputEvent = new UniInputEvent("input", {
                detail: {
                    value: value,
                },
            });
            inputEvent.detail.value = value;
            el.dispatchEvent("input", 
            // @ts-expect-error
            inputEvent);
        },
    },
    textarea: {
        input: function (el, value) {
            // @ts-expect-error
            var inputEvent = new UniInputEvent("input", {
                detail: {
                    value: value,
                },
            });
            inputEvent.detail.value = value;
            el.dispatchEvent("input", 
            // @ts-expect-error
            inputEvent);
        },
    },
    "scroll-view": {
        scrollTo: function (el, x, y) {
            el.scrollLeft = x;
            el.scrollTop = y;
        },
        scrollTop: function (el) {
            return el.scrollTop;
        },
        scrollLeft: function (el) {
            return el.scrollLeft;
        },
        scrollWidth: function (el) {
            return el.scrollWidth;
        },
        scrollHeight: function (el) {
            return el.scrollHeight;
        },
    },
    swiper: {
        swipeTo: function (el, index) {
            el.setAttribute("current", index);
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
            el.setAttribute("value", value);
        },
    },
};
function getDocument(pageId) {
    var page = getCurrentPages().find(function (page) { return get$PageByPage(page).id === pageId; });
    if (!page) {
        throw Error("page[" + pageId + "] not found");
    }
    return getCompatiblePage(page).$el.parentNode;
}
var adapter = {
    getWindow: function (pageId) {
        var doc = getDocument(pageId);
        return doc.childNodes.length === 1 ? doc.childNodes[0] : doc;
    },
    getDocument: function (pageId) {
        return getDocument(pageId);
    },
    getEl: function (elementId, pageId) {
        var res = getElementById(pageId, elementId);
        if (typeof res == "string") {
            throw Error(res);
        }
        return res;
    },
    getOffset: function (node) {
        return Promise.resolve({
            left: node.offsetLeft,
            top: node.offsetTop,
        });
    },
    querySelector: function (context, selector) {
        selector = removeUniPrefix(selector);
        if (selector === "page") {
            //TODO h5平台？
            selector = "body";
        }
        return Promise.resolve(transEl(context.querySelector(selector)));
    },
    querySelectorAll: function (context, selector) {
        selector = removeUniPrefix(selector);
        var elements = [];
        var nodeList = context.querySelectorAll(selector);
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
                if (name == "innerText") {
                    // @ts-expect-error
                    if (isTextElement(context)) {
                        // @ts-expect-error
                        return context.getAttribute("value");
                    }
                    else {
                        // @ts-expect-error
                        return getChildrenText(context);
                    }
                }
                if (name == "value") {
                    // @ts-expect-error
                    return context.getAnyAttribute("value");
                }
                if (name == "offsetWidth") {
                    // @ts-expect-error
                    return context.offsetWidth;
                }
                if (name == "offsetHeight") {
                    // @ts-expect-error
                    return context.offsetHeight;
                }
                if (name === "document.documentElement.scrollWidth") {
                    // @ts-expect-error
                    return context.scrollWidth;
                }
                if (name === "document.documentElement.scrollHeight") {
                    // @ts-expect-error
                    return context.scrollHeight;
                }
                if (name === "document.documentElement.scrollTop") {
                    // @ts-expect-error
                    return context.scrollTop;
                }
                return (
                // @ts-expect-error
                context.getAttribute(name) || 
                // @ts-expect-error
                context[name](templateObject_1 || (templateObject_1 = __makeTemplateObject(["Element.getDOMProperties not support ", ""], ["Element.getDOMProperties not support ", ""])), name));
            }),
        });
    },
    queryAttributes: function (context, names) {
        return Promise.resolve({
            attributes: names.map(function (name) {
                // @ts-expect-error
                return String(context.getAnyAttribute(name));
            }),
        });
    },
    queryStyles: function (context, names) {
        // @ts-expect-error
        var style = context._style;
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
        // @ts-expect-error
        if (el.testClick) {
            // ios
            // @ts-expect-error
            el.testClick({});
        }
        else {
            // harmony
            el.dispatchEvent("click", 
            // @ts-expect-error
            new UniPointerEvent("click", 0, 0, 0, 0, 0, 0, 0, 0));
        }
        return Promise.resolve();
    },
    dispatchLongpressEvent: function (el) {
        this.dispatchTouchEvent(el, "longpress", {
            touches: [
                {
                    identifier: 1,
                    pageX: 0,
                    pageY: 0,
                    clientX: 0,
                    clientY: 0,
                    screenX: 0,
                    screenY: 0,
                },
            ],
            changedTouches: [
                {
                    identifier: 1,
                    pageX: 0,
                    pageY: 0,
                    clientX: 0,
                    clientY: 0,
                    screenX: 0,
                    screenY: 0,
                },
            ],
        });
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
        // @ts-expect-error
        var touches = createTouchList(eventInitDict.touches);
        // @ts-expect-error
        var changedTouches = createTouchList(eventInitDict.changedTouches);
        el.dispatchEvent(type, 
        // @ts-expect-error
        new UniTouchEvent(type, touches, changedTouches));
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
        return triggerEvent(el, type, detail);
    },
    callContextMethod: function (el, method, args) {
        if (el[method]) {
            return Promise.resolve(el[method].apply(el, args));
        }
        else {
            return Promise.reject(Error(method + " method not exists"));
        }
    },
};
function createTouchList(touchInits) {
    return touchInits.map(function (touch) {
        // @ts-expect-error
        var result = new UniTouch();
        result.identifier = touch.identifier;
        result.pageX = touch.pageX;
        result.pageY = touch.pageY;
        if (touch.screenX) {
            result.screenX = touch.screenX;
        }
        if (touch.screenY) {
            result.screenY = touch.screenY;
        }
        if (touch.clientX) {
            result.clientX = touch.clientX;
        }
        if (touch.clientY) {
            result.clientY = touch.clientY;
        }
        return result;
    });
}
var WebAdapter = adapter;
var templateObject_1;

function initWebApi() {
    return Object.assign({}, initPage(WebAdapter), initElement(WebAdapter));
}

var Api = initWebApi();
function send(data) {
    return UniViewJSBridge.publishHandler("onAutoMessageReceive", data);
}
UniViewJSBridge.subscribe("sendAutoMessage", function (_a) {
    var id = _a.id, method = _a.method, params = _a.params;
    var data = { id: id };
    // Heartbeat monitoring
    if (method == "ping") {
        data.result = "pong";
        send(data);
        return;
    }
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
