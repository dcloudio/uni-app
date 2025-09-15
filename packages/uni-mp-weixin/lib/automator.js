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
function isXByPage(page) {
    return !!(page === null || page === void 0 ? void 0 : page.getElementById);
}
function getCompatiblePage(page) {
    return isXByPage(page) ? page.vm : page;
}
function get$PageByPageVm(page) {
    return isXByPage(page.$page) ? page.$basePage : page.$page;
}

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
function getNodeId$1(scope) {
    return scope.__wxExparserNodeId__ || scope.nodeId || scope.id;
}
function matchNodeId(vm, nodeId) {
    return vm.$scope && getNodeId$1(vm.$scope) === nodeId;
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
                if (typeof data[name] == "object") {
                    Object.keys(data[name]).forEach(function (key) {
                        if (vm[name]) {
                            vm[name][key] = data[name][key];
                        }
                    });
                }
                else {
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
var socketTask;
function send(data) {
    // TODO: 客户端修复之前的临时方案，用于解决定时器执行时机问题
    {
        socketTask.send({ data: JSON.stringify(data) });
    }
}
function onMessage(res) {
    var _a = JSON.parse(res.data), id = _a.id, method = _a.method, params = _a.params;
    var data = { id: id };
    var fn = Api[method];
    if (!fn) {
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
    //@ts-ignore
    wx.$$initRuntimeAutomator = initRuntimeAutomator;
    setTimeout(function () {
        //@ts-ignore
        wx.$$initRuntimeAutomator();
    }, 500);
}

export { send };
