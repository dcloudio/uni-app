'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs$1 = require('fs');
var path = require('path');
var debug = require('debug');
var merge = require('merge');
var jsoncParser = require('jsonc-parser');
var isRelative = require('licia/isRelative');
var WebSocket = require('ws');
var events = require('events');
var uuid = require('licia/uuid');
var stringify = require('licia/stringify');
var dateFormat = require('licia/dateFormat');
var waitUntil = require('licia/waitUntil');
var os = require('os');
var address = require('address');
var defaultGateway = require('default-gateway');
var isStr = require('licia/isStr');
var getPort = require('licia/getPort');
var qrCodeTerminal = require('qrcode-terminal');
var fs = require('licia/fs');
var isFn = require('licia/isFn');
var trim = require('licia/trim');
var startWith = require('licia/startWith');
var isNum = require('licia/isNum');
var sleep$1 = require('licia/sleep');
var isUndef$1 = require('licia/isUndef');
var child_process = require('child_process');
var toStr = require('licia/toStr');
var fsExtra = require('fs-extra');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default$1 = /*#__PURE__*/_interopDefaultLegacy(fs$1);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);
var isRelative__default = /*#__PURE__*/_interopDefaultLegacy(isRelative);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var uuid__default = /*#__PURE__*/_interopDefaultLegacy(uuid);
var stringify__default = /*#__PURE__*/_interopDefaultLegacy(stringify);
var dateFormat__default = /*#__PURE__*/_interopDefaultLegacy(dateFormat);
var waitUntil__default = /*#__PURE__*/_interopDefaultLegacy(waitUntil);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var address__default = /*#__PURE__*/_interopDefaultLegacy(address);
var defaultGateway__default = /*#__PURE__*/_interopDefaultLegacy(defaultGateway);
var isStr__default = /*#__PURE__*/_interopDefaultLegacy(isStr);
var getPort__default = /*#__PURE__*/_interopDefaultLegacy(getPort);
var qrCodeTerminal__default = /*#__PURE__*/_interopDefaultLegacy(qrCodeTerminal);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var isFn__default = /*#__PURE__*/_interopDefaultLegacy(isFn);
var trim__default = /*#__PURE__*/_interopDefaultLegacy(trim);
var startWith__default = /*#__PURE__*/_interopDefaultLegacy(startWith);
var isNum__default = /*#__PURE__*/_interopDefaultLegacy(isNum);
var sleep__default = /*#__PURE__*/_interopDefaultLegacy(sleep$1);
var isUndef__default = /*#__PURE__*/_interopDefaultLegacy(isUndef$1);
var toStr__default = /*#__PURE__*/_interopDefaultLegacy(toStr);

class Transport extends events.EventEmitter {
    constructor(ws) {
        super();
        this.ws = ws;
        this.ws.addEventListener("message", (event) => {
            this.emit("message", event.data);
        });
        this.ws.addEventListener("close", () => {
            this.emit("close");
        });
    }
    send(message, cb) {
        this.ws.send(message, cb);
    }
    close() {
        this.ws.close();
    }
}

const onApisEventMap = new Map();
const ON_APIS = [
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
function isOnApi(api) {
    return ON_APIS.includes(api);
}
function isOffApi(api) {
    return api.startsWith("off") && ON_APIS.includes(api.replace("off", "on"));
}
function getOnApiByOffApi(offApi) {
    return offApi.replace("off", "on");
}
const socketTaskMap = new Map();
const initUni = (program) => {
    return new Proxy({}, {
        get(_, key) {
            if (key === "connectSocket") {
                return async (...args) => {
                    const id = `${Date.now()}-${Math.random()}`;
                    args[0].id = id;
                    return await program
                        .callUniMethod(key, ...args)
                        .then((res) => {
                        handleSuccessCallback(args[0], res);
                        socketTaskMap.set(id, new Map());
                        const socketTask = {
                            id,
                            onMessage: (callback) => {
                                program.socketEmitter({
                                    id,
                                    method: "onMessage",
                                });
                                socketTaskMap.get(id).set("onMessage", callback);
                            },
                            send: (options) => {
                                program
                                    .socketEmitter({
                                    id,
                                    method: "send",
                                    data: options.data,
                                })
                                    .then((res) => {
                                    handleSuccessCallback(options, res);
                                })
                                    .catch((error) => {
                                    handleFailCallback(options, error);
                                });
                            },
                            close: (options) => {
                                program
                                    .socketEmitter({
                                    id,
                                    method: "close",
                                    code: options.code,
                                    reason: options.reason,
                                })
                                    .then((res) => {
                                    handleSuccessCallback(options, res);
                                    socketTaskMap.delete(id);
                                })
                                    .catch((error) => {
                                    handleFailCallback(options, error);
                                });
                            },
                            onOpen: (callback) => {
                                program.socketEmitter({ id, method: "onOpen" });
                                socketTaskMap.get(id).set("onOpen", callback);
                            },
                            onClose: (callback) => {
                                program.socketEmitter({ id, method: "onClose" });
                                socketTaskMap.get(id).set("onClose", callback);
                            },
                            onError: (callback) => {
                                program.socketEmitter({ id, method: "onError" });
                                socketTaskMap.get(id).set("onError", callback);
                            },
                        };
                        socketTaskMap.get(id).set("socketTask", socketTask);
                        return socketTask;
                    })
                        .catch((error) => {
                        handleFailCallback(args[0], error);
                        return null;
                    });
                };
            }
            if (isOnApi(key)) {
                return (callback) => {
                    if (!onApisEventMap.has(key)) {
                        onApisEventMap.set(key, new Map());
                    }
                    const eventMap = onApisEventMap.get(key);
                    const id = `${Date.now()}-${Math.random()}`;
                    eventMap.set(id, callback);
                    program.callUniMethod(key, id);
                };
            }
            if (isOffApi(key)) {
                return async (callback) => {
                    const onApi = getOnApiByOffApi(key);
                    if (onApisEventMap.has(onApi)) {
                        if (callback) {
                            const eventMap = onApisEventMap.get(onApi);
                            eventMap.forEach((value, uuid) => {
                                if (value === callback) {
                                    eventMap.delete(uuid);
                                    program.callUniMethod(key, uuid);
                                }
                            });
                        }
                        else {
                            onApisEventMap.delete(onApi);
                            program.callUniMethod(key);
                        }
                    }
                };
            }
            return async (...args) => {
                return await program
                    .callUniMethod(key, ...args)
                    .then((res) => {
                    handleSuccessCallback(args[0], res);
                    return res;
                })
                    .catch((error) => {
                    handleFailCallback(args[0], error);
                    return error;
                });
            };
        },
    });
};
function handleSuccessCallback(options, res) {
    if ((options === null || options === void 0 ? void 0 : options.success) && typeof (options === null || options === void 0 ? void 0 : options.success) === "function") {
        res ? options.success(res) : options.success();
    }
    if ((options === null || options === void 0 ? void 0 : options.complete) && typeof (options === null || options === void 0 ? void 0 : options.complete) === "function") {
        res ? options.complete(res) : options.complete();
    }
}
function handleFailCallback(options, error) {
    if ((options === null || options === void 0 ? void 0 : options.fail) && typeof (options === null || options === void 0 ? void 0 : options.fail) === "function") {
        error ? options.fail(error) : options.fail();
    }
    if ((options === null || options === void 0 ? void 0 : options.complete) && typeof (options === null || options === void 0 ? void 0 : options.complete) === "function") {
        error ? options.complete(error) : options.complete();
    }
}
const handleOnApisCallback = (methodData, id) => {
    const eventMap = onApisEventMap.get(methodData.method);
    if (eventMap === null || eventMap === void 0 ? void 0 : eventMap.has(id)) {
        eventMap.get(id)(methodData.data);
    }
};
const handleSocketCallback = (method, id, res) => {
    const socketTask = socketTaskMap.get(id);
    if (socketTask === null || socketTask === void 0 ? void 0 : socketTask.has(method)) {
        socketTask.get(method)(res);
    }
};

/^win/.test(process.platform);
function printQrCode(content) {
    return new Promise((resolve) => {
        qrCodeTerminal__default["default"].generate(content, {
            small: true,
        }, (qrcode) => {
            process.stdout.write(qrcode);
            resolve(void 0);
        });
    });
}
function toArray(str) {
    if (isStr__default["default"](str)) {
        return [true, [str]];
    }
    return [false, str];
}
async function invokeManyToMany(fn, str) {
    const [isSingle, strArr] = toArray(str);
    const result = await fn(strArr);
    return isSingle ? result[0] : result;
}
async function resolvePort(port, defaultPort) {
    const newPort = await getPort__default["default"](port || defaultPort);
    if (port && newPort !== port) {
        throw Error(`Port ${port} is in use, please specify another port`);
    }
    return newPort;
}
function getWsEndpoint(port) {
    let host;
    try {
        // This can only return an IPv4 address
        const result = defaultGateway__default["default"].v4.sync();
        host = address__default["default"].ip(result && result.interface);
        if (host) {
            // Check if the address is a private ip
            // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
            if (!/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(host)) {
                // Address is not private, so we will discard it
                host = undefined;
            }
        }
    }
    catch (_e) {
        // ignored
    }
    return "ws://" + (host || "localhost") + ":" + port;
}
function requireModule(id) {
    try {
        return require(id);
    }
    catch (e) {
        return require(require.resolve(id, { paths: [process.cwd()] }));
    }
}

const CLOSE_ERR_TIP = "Connection closed";
class Connection extends events.EventEmitter {
    constructor(transport, puppet, namespace) {
        super();
        this.puppet = puppet;
        this.namespace = namespace;
        this.callbacks = new Map();
        this.transport = transport;
        this.isAlive = true;
        this.id = Date.now();
        this.exConnectionClosed = false;
        this.debug = debug__default["default"]("automator:protocol:" + this.namespace);
        this.onMessage = (msg) => {
            var _a, _b, _c;
            this.isAlive = true;
            // 心跳检测
            if (process.env.UNI_APP_X === "true" && msg === '"pong"') {
                return;
            }
            const { id, method, error, result, params } = JSON.parse(msg);
            // 如果有超长的数据（主要是截屏的时候），则截短之后再输出日志，以避免大量无效内容充斥日志记录
            if (((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.length) > 1024 * 10) {
                let truncateMsg = JSON.stringify({
                    id,
                    method,
                    error,
                    result: Object.assign(Object.assign({}, result), { data: result.data.substring(0, 30) + "...<more>" }),
                    params,
                });
                this.debug(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} ◀ RECV ${truncateMsg}`);
            }
            else {
                this.debug(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} ◀ RECV ${msg}`);
            }
            if ((_b = result === null || result === void 0 ? void 0 : result.method) === null || _b === void 0 ? void 0 : _b.startsWith("on")) {
                handleOnApisCallback(result, id);
                return;
            }
            if ((_c = result === null || result === void 0 ? void 0 : result.method) === null || _c === void 0 ? void 0 : _c.startsWith("Socket.")) {
                const _method = result.method.replace("Socket.", "");
                handleSocketCallback(_method, result.id, result.data);
                return;
            }
            if (!id) {
                return this.puppet.emit(method, params);
            }
            const { callbacks } = this;
            if (id && callbacks.has(id)) {
                const promise = callbacks.get(id);
                callbacks.delete(id);
                error
                    ? promise.reject(Error(error.message || error.detailMessage || error.errMsg))
                    : promise.resolve(result);
            }
        };
        this.onClose = () => {
            this.callbacks.forEach((promise) => {
                promise.reject(Error(CLOSE_ERR_TIP));
            });
        };
        this.transport.on("message", this.onMessage);
        this.transport.on("close", this.onClose);
    }
    isBroken() {
        return !!this.exConnectionClosed;
    }
    send(method, params = {}, reflect = true) {
        if (reflect && this.puppet.adapter.has(method)) {
            return this.puppet.adapter.send(this, method, params);
        }
        // 如果连接已中断，则快速失败，避免无谓等待超时
        if (this.exConnectionClosed) {
            throw this.exConnectionClosed;
        }
        const id = uuid__default["default"]();
        const data = stringify__default["default"]({
            id,
            method,
            params,
        });
        if (method !== "ping") {
            this.debug(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} SEND ► ${data}`);
        }
        return new Promise((resolve, reject) => {
            // 正常情况下，this.transport.send() 之后将会根据执行结果触发 resolve 或者 reject，
            // 当调用 this.transport.send() 的时候发现连接已中断（比如应用发生闪退），会抛出异常直接触发 reject。
            // 但是，如果继续调用 this.transport.send()，即 sendAfterClose，则只会通过 callback 报错，
            // 不会抛出异常，也不会再触发 resolve 或者 reject。
            try {
                this.transport.send(data, (err) => {
                    if (!err)
                        return;
                    // 当出现 sendAfterClose 的时候会同步调用这个 callback
                    reject(Error(CLOSE_ERR_TIP));
                });
            }
            catch (e) {
                // 连接中断
                reject(Error(CLOSE_ERR_TIP));
            }
            this.callbacks.set(id, {
                resolve,
                reject,
            });
        }).catch((ex) => {
            // 检查连接中断并记录
            if (ex.message === CLOSE_ERR_TIP) {
                this.exConnectionClosed = ex;
            }
            throw ex;
        });
    }
    dispose() {
        // 主动关闭连接的时候，先清理掉所有 callbacks，以避免其 reject 的时候导致测试进程中断
        this.callbacks.clear();
        this.transport.close();
    }
    // 目前仅用于 uni-app x app 端检测应用崩溃
    startHeartbeat() {
        if (process.env.UNI_APP_X === "true") {
            if (process.env.UNI_APP_PLATFORM === "android") {
                this.startXAndroidHeartbeat();
            }
            else if (process.env.UNI_APP_PLATFORM === "ios") {
                this.startXIosHeartbeat();
            }
        }
    }
    startXAndroidHeartbeat() {
        const heartbeatIntervalMap = new Map();
        const heartbeatIntervalTime = 5000;
        const adb = requireModule("adbkit");
        const platform = os__default["default"].platform();
        const packageName = "io.dcloud.uniappx";
        let ADBCommandAppIsLaunch = "";
        let ADBCommandAppCrashLog = "";
        if (platform === "darwin") {
            ADBCommandAppIsLaunch = 'ps | grep "u0_a"';
            ADBCommandAppCrashLog = `logcat -b crash | grep -C 10 ${packageName}`;
        }
        else if (platform === "win32") {
            ADBCommandAppIsLaunch = 'dumpsys activity | findstr "Run"';
            ADBCommandAppCrashLog = "logcat | findstr UncaughtExceptionHandler";
        }
        heartbeatIntervalMap.set(this.id, setInterval(async () => {
            if (!this.isAlive) {
                const tool = adb.createClient();
                const devices = await tool.listDevices();
                if (!devices.length) {
                    throw Error(`Device not found`);
                }
                const id = devices[0].id;
                const props = await tool.getProperties(id);
                const isEmulator = props["ro.kernel.qemu"] === "1" ||
                    props["ro.hardware"] === "goldfish";
                if (isEmulator && platform === "win32") {
                    ADBCommandAppCrashLog = "logcat | grep UncaughtExceptionHandler";
                }
                // 检测应用是否启动
                tool.shell(id, ADBCommandAppIsLaunch).then(function (conn) {
                    let res = "";
                    let timeoutTimer;
                    conn.on("data", function (data) {
                        res += data.toString();
                        timeoutTimer && clearTimeout(timeoutTimer);
                        timeoutTimer = setTimeout(() => {
                            if (!res.includes("io.dcloud.uniapp")) {
                                // 对测试设备进行截图
                                tool.shell(id, "screencap -p /sdcard/uni-automator-screenshot-when-uniapp-un-active.png");
                                console.log("ADBCommandAppIsLaunch", ADBCommandAppIsLaunch);
                                console.log("ADBCommandAppIsLaunch res", res);
                                console.log("Stop the test process.");
                            }
                        }, 50);
                    });
                });
                // 输出崩溃日志
                tool.shell(id, ADBCommandAppCrashLog).then((conn) => {
                    let res = "";
                    let timeoutTimer;
                    conn.on("data", (data) => {
                        res += data.toString();
                        timeoutTimer && clearTimeout(timeoutTimer);
                        timeoutTimer = setTimeout(() => {
                            console.log(`crash log: ${res}`);
                        }, 50);
                    });
                });
                clearInterval(heartbeatIntervalMap.get(this.id));
                heartbeatIntervalMap.delete(this.id);
                this.dispose();
                return;
            }
            this.send("ping").catch((_) => {
                // 拦截 sendAfterClose 触发的异常，避免在测试结束后干扰生成测试报告
            });
            this.isAlive = false;
        }, heartbeatIntervalTime));
    }
    startXIosHeartbeat() {
        const heartbeatIntervalMap = new Map();
        const heartbeatIntervalTime = 5000;
        heartbeatIntervalMap.set(this.id, setInterval(async () => {
            if (!this.isAlive) {
                // TODO: ios 目前没有办法判断应用是否存活以及获取崩溃日志
                // 所以 socket 通信没有响应时就默认崩溃了，后续客户端提供获取日志方法，可再进行优化
                console.log("Stop the test process.");
                clearInterval(heartbeatIntervalMap.get(this.id));
                heartbeatIntervalMap.delete(this.id);
                this.dispose();
                return;
            }
            this.send("ping").catch((_) => {
                // 拦截 sendAfterClose 触发的异常，避免在测试结束后干扰生成测试报告
            });
            this.isAlive = false;
        }, heartbeatIntervalTime));
    }
    static createDevtoolConnection(url, puppet) {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket__default["default"](url);
            ws.addEventListener("open", () => {
                resolve(new Connection(new Transport(ws), puppet, "devtool"));
            });
            ws.addEventListener("error", reject);
        });
    }
    static createRuntimeConnection(port, puppet, timeout) {
        return new Promise((resolve, reject) => {
            debug__default["default"]("automator:runtime")(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} port=${port}`);
            const wss = new WebSocket__default["default"].Server({
                port,
            });
            waitUntil__default["default"](async () => {
                if (puppet.runtimeConnection) {
                    return true;
                }
            }, timeout, 1e3).catch(() => {
                wss.close();
                reject("Failed to connect to runtime, please make sure the project is running");
            });
            wss.on("connection", function connection(ws) {
                debug__default["default"]("automator:runtime")(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} connected`);
                const connection = new Connection(new Transport(ws), puppet, "runtime");
                // 可能会被重新连接，刷新成最新的
                puppet.setRuntimeConnection(connection);
                if (process.env.UNI_AUTOMATOR_NEED_RESTART_BETWEEN_TEST) {
                    global.socketConnected = true;
                }
                else {
                    connection.startHeartbeat();
                }
                resolve(connection);
            });
            puppet.setRuntimeServer(wss);
        });
    }
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var TYPES;
(function (TYPES) {
    TYPES["RUNTIME"] = "runtime";
    TYPES["DEVTOOL"] = "devtool";
})(TYPES || (TYPES = {}));
function wrapper(type, descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (params) {
        const fn = await (method === null || method === void 0 ? void 0 : method.call(this, params));
        return fn(type);
    };
    return descriptor;
}
function runtime(target, propertyName, descriptor) {
    return wrapper(TYPES.RUNTIME, descriptor);
}
function devtool(target, propertyName, descriptor) {
    return wrapper(TYPES.DEVTOOL, descriptor);
}
class Base {
    constructor(puppet) {
        this.puppet = puppet;
    }
    invoke(method, params) {
        return async (type) => {
            if (!this.puppet.devtoolConnection) {
                return this.puppet.runtimeConnection.send(method, params);
            }
            return (type === TYPES.DEVTOOL
                ? this.puppet.devtoolConnection
                : this.puppet.runtimeConnection).send(method, params);
        };
    }
    on(method, listener) {
        this.puppet.on(method, listener);
    }
}

class Element$1 extends Base {
    constructor(puppet, options) {
        super(puppet);
        this.id = options.elementId;
        this.pageId = options.pageId;
        this.nodeId = options.nodeId;
        this.videoId = options.videoId;
    }
    async getData(params) {
        return this.invokeMethod("Element.getData", params);
    }
    async setData(params) {
        return this.invokeMethod("Element.setData", params);
    }
    async callMethod(params) {
        return this.invokeMethod("Element.callMethod", params);
    }
    async getElement(params) {
        return this.invokeMethod("Element.getElement", params);
    }
    async getElements(params) {
        return this.invokeMethod("Element.getElements", params);
    }
    async getOffset() {
        return this.invokeMethod("Element.getOffset");
    }
    async getHTML(params) {
        return this.invokeMethod("Element.getHTML", params);
    }
    async getAttributes(params) {
        return this.invokeMethod("Element.getAttributes", params);
    }
    async getStyles(params) {
        return this.invokeMethod("Element.getStyles", params);
    }
    async getDOMProperties(params) {
        return this.invokeMethod("Element.getDOMProperties", params);
    }
    async getProperties(params) {
        return this.invokeMethod("Element.getProperties", params);
    }
    async tap() {
        return this.invokeMethod("Element.tap");
    }
    async longpress() {
        return this.invokeMethod("Element.longpress");
    }
    async touchstart(params) {
        return this.invokeMethod("Element.touchstart", params);
    }
    async touchmove(params) {
        return this.invokeMethod("Element.touchmove", params);
    }
    async touchend(params) {
        return this.invokeMethod("Element.touchend", params);
    }
    async triggerEvent(params) {
        return this.invokeMethod("Element.triggerEvent", params);
    }
    async callFunction(params) {
        return this.invokeMethod("Element.callFunction", params);
    }
    async callContextMethod(params) {
        return this.invokeMethod("Element.callContextMethod", params);
    }
    invokeMethod(method, params = {}) {
        params.elementId = this.id;
        params.pageId = this.pageId;
        this.nodeId && (params.nodeId = this.nodeId);
        this.videoId && (params.videoId = this.videoId);
        return this.invoke(method, params);
    }
}
__decorate([
    runtime
], Element$1.prototype, "getData", null);
__decorate([
    runtime
], Element$1.prototype, "setData", null);
__decorate([
    runtime
], Element$1.prototype, "callMethod", null);
__decorate([
    devtool
], Element$1.prototype, "getElement", null);
__decorate([
    devtool
], Element$1.prototype, "getElements", null);
__decorate([
    devtool
], Element$1.prototype, "getOffset", null);
__decorate([
    devtool
], Element$1.prototype, "getHTML", null);
__decorate([
    devtool
], Element$1.prototype, "getAttributes", null);
__decorate([
    devtool
], Element$1.prototype, "getStyles", null);
__decorate([
    devtool
], Element$1.prototype, "getDOMProperties", null);
__decorate([
    devtool
], Element$1.prototype, "getProperties", null);
__decorate([
    devtool
], Element$1.prototype, "tap", null);
__decorate([
    devtool
], Element$1.prototype, "longpress", null);
__decorate([
    devtool
], Element$1.prototype, "touchstart", null);
__decorate([
    devtool
], Element$1.prototype, "touchmove", null);
__decorate([
    devtool
], Element$1.prototype, "touchend", null);
__decorate([
    devtool
], Element$1.prototype, "triggerEvent", null);
__decorate([
    devtool
], Element$1.prototype, "callFunction", null);
__decorate([
    devtool
], Element$1.prototype, "callContextMethod", null);

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isUndef = (v) => {
    return v === undefined || v === null;
};
const isArray = Array.isArray;
const PATH_RE$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
function getPaths(path, data) {
    if (isArray(path)) {
        return path;
    }
    if (data && hasOwn(data, path)) {
        return [path];
    }
    const res = [];
    path.replace(PATH_RE$1, function (match, p1, offset, string) {
        res.push(offset ? string.replace(/\\(\\)?/g, "$1") : p1 || match);
        return string;
    });
    return res;
}
function getDataByPath(data, path) {
    const paths = getPaths(path, data);
    let dataPath;
    for (dataPath = paths.shift(); !isUndef(dataPath);) {
        if (null == (data = data[dataPath])) {
            return;
        }
        dataPath = paths.shift();
    }
    return data;
}

const util$1 = require("util");
const useDomPropertyTags = [
    "scrollLeft",
    "scrollTop",
    "scrollWidth",
    "scrollHeight",
];
class Element {
    constructor(puppet, options, elementMap) {
        this.puppet = puppet;
        this.id = options.elementId;
        this.pageId = options.pageId;
        this.nodeId = options.nodeId || null;
        this.videoId = options.videoId || null;
        this.tagName = options.tagName;
        this.nvue = options.nvue;
        this.elementMap = elementMap;
        Element.allElementMaps.add(elementMap);
        // 统一格式化为 page
        if (this.tagName === "body" || this.tagName === "page-body") {
            this.tagName = "page";
        }
        this.api = new Element$1(puppet, options);
    }
    toJSON() {
        return JSON.stringify({
            id: this.id,
            tagName: this.tagName,
            pageId: this.pageId,
            nodeId: this.nodeId,
            videoId: this.videoId,
        });
    }
    toString() {
        return this.toJSON();
    }
    [util$1.inspect.custom]() {
        return this.toJSON();
    }
    async $(selector) {
        try {
            const element = await this.api.getElement({ selector });
            return Element.create(this.puppet, Object.assign({}, element, {
                pageId: this.pageId,
            }), this.elementMap);
        }
        catch (e) {
            return null;
        }
    }
    async $$(selector) {
        const { elements } = await this.api.getElements({ selector });
        return elements.map((elem) => Element.create(this.puppet, Object.assign({}, elem, {
            pageId: this.pageId,
        }), this.elementMap));
    }
    async size() {
        const [width, height] = await this.domProperty([
            "offsetWidth",
            "offsetHeight",
        ]);
        return {
            width,
            height,
        };
    }
    async offset() {
        const { left, top } = await this.api.getOffset();
        return {
            left,
            top,
        };
    }
    async text() {
        return this.domProperty("innerText");
    }
    async attribute(name) {
        if (!isStr__default["default"](name)) {
            throw Error("name must be a string");
        }
        return (await this.api.getAttributes({ names: [name] })).attributes[0];
    }
    async value() {
        if (this.puppet.isX &&
            (process.env.UNI_APP_PLATFORM === "ios" ||
                process.env.UNI_PLATFORM == "h5")) {
            // X 中从 element 上取的值才是真实的
            return this.domProperty("value");
        }
        else {
            return this.property("value");
        }
    }
    async property(name) {
        if (!isStr__default["default"](name)) {
            throw Error("name must be a string");
        }
        if (this.puppet.checkProperty) {
            let props = this.publicProps;
            if (!props) {
                this.publicProps = props = await this._property("__propPublic");
            }
            if (!props[name]) {
                throw Error(`${this.tagName}.${name} not exists`);
            }
        }
        if (this.puppet.isX && process.env.UNI_PLATFORM === "h5") {
            // 2.0 web 端 scrollLeft 等信息从 element 上获取
            if (useDomPropertyTags.includes(name)) {
                return await this.domProperty(name);
            }
        }
        return this._property(name);
    }
    async html() {
        return (await this.api.getHTML({ type: "inner" })).html;
    }
    async outerHtml() {
        return (await this.api.getHTML({ type: "outer" })).html;
    }
    async style(name) {
        if (!isStr__default["default"](name)) {
            throw Error("name must be a string");
        }
        return (await this.api.getStyles({ names: [name] })).styles[0];
    }
    async tap() {
        return this.api.tap();
    }
    async longpress() {
        if (this.nvue ||
            (process.env.UNI_APP_X === "true" &&
                (process.env.UNI_APP_PLATFORM === "ios" ||
                    process.env.UNI_APP_PLATFORM === "android" ||
                    process.env.UNI_PLATFORM == "h5" ||
                    process.env.UNI_PLATFORM == "app-harmony"))) {
            return this.api.longpress();
        }
        await this.touchstart();
        await sleep__default["default"](350);
        return this.touchend();
    }
    async trigger(type, detail) {
        const event = {
            type,
        };
        if (!isUndef__default["default"](detail)) {
            event.detail = detail;
        }
        return this.api.triggerEvent(event);
    }
    async touchstart(options) {
        return this.api.touchstart(options);
    }
    async touchmove(options) {
        return this.api.touchmove(options);
    }
    async touchend(options) {
        return this.api.touchend(options);
    }
    async domProperty(name) {
        return invokeManyToMany(async (names) => (await this.api.getDOMProperties({ names })).properties, name);
    }
    _property(name) {
        return invokeManyToMany(async (names) => (await this.api.getProperties({ names })).properties, name);
    }
    send(method, params) {
        params.elementId = this.id;
        params.pageId = this.pageId;
        this.nodeId && (params.nodeId = this.nodeId);
        this.videoId && (params.videoId = this.videoId);
        return this.puppet.send(method, params);
    }
    async callFunction(functionName, ...args) {
        return (await this.api.callFunction({
            functionName,
            args,
        })).result;
    }
    static create(puppet, options, elementMap) {
        let element = elementMap.get(options.elementId);
        if (element) {
            return element;
        }
        let ElementClass;
        if (options.nodeId) {
            ElementClass = CustomElement;
        }
        else {
            switch (options.tagName.toLowerCase()) {
                case "input":
                    ElementClass = InputElement;
                    break;
                case "textarea":
                    ElementClass = TextareaElement;
                    break;
                case "scroll-view":
                    ElementClass = ScrollViewElement;
                    break;
                case "swiper":
                    ElementClass = SwiperElement;
                    break;
                case "movable-view":
                    ElementClass = MovableViewElement;
                    break;
                case "switch":
                    ElementClass = SwitchElement;
                    break;
                case "slider":
                    ElementClass = SliderElement;
                    break;
                case "video":
                    ElementClass = ContextElement;
                    break;
                default:
                    ElementClass = Element;
            }
        }
        element = new ElementClass(puppet, options, elementMap);
        elementMap.set(options.elementId, element);
        return element;
    }
    static clearAllElementMaps() {
        Element.allElementMaps.forEach((map) => map.clear());
    }
}
Element.allElementMaps = new Set();
class CustomElement extends Element {
    async setData(data) {
        return this.api.setData({ data });
    }
    async data(path) {
        const data = {};
        if (path) {
            data.path = path;
        }
        if (process.env.UNI_APP_X === "true" &&
            process.env.UNI_APP_PLATFORM === "android" &&
            process.env.UNI_AUTOMATOR_APP_WEBVIEW !== "true") {
            const result = (await this.api.getData(data)).data;
            return path ? getDataByPath(result, path) : result;
        }
        return (await this.api.getData(data)).data;
    }
    async callMethod(method, ...args) {
        return (await this.api.callMethod({
            method,
            args,
        })).result;
    }
}
class InputElement extends Element {
    async input(value) {
        return this.callFunction("input.input", value);
    }
}
class TextareaElement extends Element {
    async input(value) {
        return this.callFunction("textarea.input", value);
    }
}
class ScrollViewElement extends Element {
    async scrollTo(x, y) {
        return this.callFunction("scroll-view.scrollTo", x, y);
    }
    async property(name) {
        if (name === "scrollTop") {
            return this.callFunction("scroll-view.scrollTop");
        }
        else if (name === "scrollLeft") {
            return this.callFunction("scroll-view.scrollLeft");
        }
        return super.property(name);
    }
    async scrollWidth() {
        return this.callFunction("scroll-view.scrollWidth");
    }
    async scrollHeight() {
        return this.callFunction("scroll-view.scrollHeight");
    }
}
class SwiperElement extends Element {
    async swipeTo(index) {
        return this.callFunction("swiper.swipeTo", index);
    }
}
class MovableViewElement extends Element {
    async moveTo(x, y) {
        return this.callFunction("movable-view.moveTo", x, y);
    }
    async property(name) {
        if (name === "x") {
            return this._property("_translateX");
        }
        else if (name === "y") {
            return this._property("_translateY");
        }
        return super.property(name);
    }
}
class SwitchElement extends Element {
    async tap() {
        return this.callFunction("switch.tap");
    }
}
class SliderElement extends Element {
    async slideTo(value) {
        return this.callFunction("slider.slideTo", value);
    }
}
class ContextElement extends Element {
    async callContextMethod(method, ...args) {
        const result = await this.api.callContextMethod({
            method,
            args,
        });
        return result;
    }
}
function clearAllElementMaps() {
    return Element.clearAllElementMaps();
}

class Page$1 extends Base {
    constructor(puppet, options) {
        super(puppet);
        this.id = options.id;
    }
    async getData(params) {
        return this.invokeMethod("Page.getData", params);
    }
    async setData(params) {
        return this.invokeMethod("Page.setData", params);
    }
    async callMethod(params) {
        return this.invokeMethod("Page.callMethod", params);
    }
    async callMethodWithCallback(params) {
        return this.invokeMethod("Page.callMethodWithCallback", params);
    }
    async getElement(params) {
        return this.invokeMethod("Page.getElement", params);
    }
    async getElements(params) {
        return this.invokeMethod("Page.getElements", params);
    }
    async getWindowProperties(params) {
        return this.invokeMethod("Page.getWindowProperties", params);
    }
    invokeMethod(method, params = {}) {
        params.pageId = this.id;
        return this.invoke(method, params);
    }
}
__decorate([
    runtime
], Page$1.prototype, "getData", null);
__decorate([
    runtime
], Page$1.prototype, "setData", null);
__decorate([
    runtime
], Page$1.prototype, "callMethod", null);
__decorate([
    runtime
], Page$1.prototype, "callMethodWithCallback", null);
__decorate([
    devtool
], Page$1.prototype, "getElement", null);
__decorate([
    devtool
], Page$1.prototype, "getElements", null);
__decorate([
    devtool
], Page$1.prototype, "getWindowProperties", null);

const util = require("util");
class Page {
    constructor(puppet, options) {
        this.puppet = puppet;
        this.id = options.id;
        this.path = options.path;
        this.query = options.query;
        this.elementMap = new Map();
        this.api = new Page$1(puppet, options);
    }
    toJSON() {
        return JSON.stringify({ id: this.id, path: this.path, query: this.query });
    }
    toString() {
        return this.toJSON();
    }
    [util.inspect.custom]() {
        return this.toJSON();
    }
    async waitFor(condition, timeout = 0) {
        if (isNum__default["default"](condition)) {
            return await sleep__default["default"](condition);
        }
        else if (isFn__default["default"](condition)) {
            return waitUntil__default["default"](condition, timeout, 50);
        }
        else if (isStr__default["default"](condition)) {
            return waitUntil__default["default"](async () => {
                // 2.0 使用 waitFor('选择器') 等待页面渲染完成，$$ 调整为 $ 优化性能
                if (process.env.UNI_APP_X === "true") {
                    const elm = await this.$(condition);
                    return !!elm;
                }
                else {
                    const elms = await this.$$(condition);
                    return elms.length > 0;
                }
            }, timeout, 50);
        }
    }
    async $(selector) {
        try {
            const page = await this.api.getElement({ selector });
            return Element.create(this.puppet, Object.assign({
                selector,
            }, page, {
                pageId: this.id,
            }), this.elementMap);
        }
        catch (t) {
            return null;
        }
    }
    async $$(selector) {
        const { elements } = await this.api.getElements({ selector });
        return elements.map((elem) => Element.create(this.puppet, Object.assign({
            selector,
        }, elem, {
            pageId: this.id,
        }), this.elementMap));
    }
    async data(path) {
        const payload = {};
        if (path) {
            payload.path = path;
        }
        if (process.env.UNI_APP_X === "true" &&
            process.env.UNI_APP_PLATFORM === "android" &&
            process.env.UNI_AUTOMATOR_APP_WEBVIEW !== "true") {
            const result = (await this.api.getData(payload)).data;
            return path ? getDataByPath(result, path) : result;
        }
        return (await this.api.getData(payload)).data;
    }
    async setData(data) {
        return this.api.setData({ data });
    }
    async size() {
        const [width, height] = await this.windowProperty([
            "document.documentElement.scrollWidth",
            "document.documentElement.scrollHeight",
        ]);
        return {
            width,
            height,
        };
    }
    async callMethod(method, ...args) {
        return (await this.api.callMethod({
            method,
            args,
        })).result;
    }
    async callMethodWithCallback(method, ...args) {
        return await this.api.callMethodWithCallback({
            method,
            args,
        });
    }
    async scrollTop() {
        return this.windowProperty("document.documentElement.scrollTop");
    }
    async windowProperty(names) {
        const isSingle = isStr__default["default"](names);
        if (isSingle) {
            names = [names];
        }
        const { properties } = await this.api.getWindowProperties({
            names: names,
        });
        return isSingle ? properties[0] : properties;
    }
    static create(puppet, options, pageMap) {
        let page = pageMap.get(options.id);
        if (page) {
            //update query & path (部分页面id被锁定，如tabBar页面)
            page.path = options.path;
            page.query = options.query;
            return page;
        }
        page = new Page(puppet, options);
        pageMap.set(options.id, page);
        return page;
    }
}

class App extends Base {
    async getPageStack() {
        return this.invoke("App.getPageStack");
    }
    async callUniMethod(params) {
        return this.invoke("App.callUniMethod", params);
    }
    async getCurrentPage() {
        return this.invoke("App.getCurrentPage");
    }
    async mockUniMethod(params) {
        return this.invoke("App.mockUniMethod", params);
    }
    async captureScreenshotByRuntime(params) {
        return this.invoke("App.captureScreenshot", params);
    }
    async captureScreenshotWithDeviceByRuntime(params) {
        return this.invoke("App.captureScreenshotWithDevice", params);
    }
    async socketEmitter(params) {
        return this.invoke("App.socketEmitter", params);
    }
    async callFunction(params) {
        return this.invoke("App.callFunction", params);
    }
    async captureScreenshot(params) {
        return this.invoke("App.captureScreenshot", params);
    }
    async adbCommand(params) {
        return this.invoke("App.adbCommand", params);
    }
    async swipe(params) {
        return this.invoke("App.swipe", params);
    }
    async tap(params) {
        return this.invoke("App.tap", params);
    }
    async keyboardInput(params) {
        return this.invoke("App.keyboardInput", params);
    }
    async start(params) {
        return this.invoke("App.start", params);
    }
    async exit() {
        return this.invoke("App.exit");
    }
    async addBinding(params) {
        return this.invoke("App.addBinding", params);
    }
    async enableLog() {
        return this.invoke("App.enableLog");
    }
    onLogAdded(listener) {
        return this.on("App.logAdded", listener);
    }
    onBindingCalled(listener) {
        return this.on("App.bindingCalled", listener);
    }
    onExceptionThrown(listener) {
        return this.on("App.exceptionThrown", listener);
    }
}
__decorate([
    runtime
], App.prototype, "getPageStack", null);
__decorate([
    runtime
], App.prototype, "callUniMethod", null);
__decorate([
    runtime
], App.prototype, "getCurrentPage", null);
__decorate([
    runtime
], App.prototype, "mockUniMethod", null);
__decorate([
    runtime
], App.prototype, "captureScreenshotByRuntime", null);
__decorate([
    runtime
], App.prototype, "captureScreenshotWithDeviceByRuntime", null);
__decorate([
    runtime
], App.prototype, "socketEmitter", null);
__decorate([
    devtool
], App.prototype, "callFunction", null);
__decorate([
    devtool
], App.prototype, "captureScreenshot", null);
__decorate([
    devtool
], App.prototype, "adbCommand", null);
__decorate([
    devtool
], App.prototype, "swipe", null);
__decorate([
    devtool
], App.prototype, "tap", null);
__decorate([
    devtool
], App.prototype, "keyboardInput", null);
__decorate([
    devtool
], App.prototype, "start", null);
__decorate([
    devtool
], App.prototype, "exit", null);
__decorate([
    devtool
], App.prototype, "addBinding", null);
__decorate([
    devtool
], App.prototype, "enableLog", null);

class Tool extends Base {
    async getInfo() {
        return this.invoke("Tool.getInfo");
    }
    async enableRemoteDebug(params) {
        return this.invoke("Tool.enableRemoteDebug");
    }
    async close() {
        return this.invoke("Tool.close");
    }
    async getTestAccounts() {
        return this.invoke("Tool.getTestAccounts");
    }
    onRemoteDebugConnected(listener) {
        this.puppet.once("Tool.onRemoteDebugConnected", listener);
        // mp-baidu
        this.puppet.once("Tool.onPreviewConnected", listener);
    }
}
__decorate([
    devtool
], Tool.prototype, "getInfo", null);
__decorate([
    devtool
], Tool.prototype, "enableRemoteDebug", null);
__decorate([
    devtool
], Tool.prototype, "close", null);
__decorate([
    devtool
], Tool.prototype, "getTestAccounts", null);

function sleep(timeout) {
    return new Promise((e) => setTimeout(e, timeout));
}
function isFnStr(str) {
    return (isStr__default["default"](str) &&
        ((str = trim__default["default"](str)), startWith__default["default"](str, "function") || startWith__default["default"](str, "() =>")));
}
class Program extends events.EventEmitter {
    constructor(puppet, options) {
        super();
        this.puppet = puppet;
        this.options = options;
        this.pageMap = new Map();
        this.appBindings = new Map();
        this.appApi = new App(puppet);
        this.toolApi = new Tool(puppet);
        this.appApi.onLogAdded((msg) => {
            this.emit("console", msg);
        });
        this.appApi.onBindingCalled(({ name, args }) => {
            try {
                const fn = this.appBindings.get(name);
                fn && fn(...args);
            }
            catch (t) { }
        });
        this.appApi.onExceptionThrown((error) => {
            this.emit("exception", error);
        });
    }
    async pageStack() {
        return (await this.appApi.getPageStack()).pageStack.map((page) => Page.create(this.puppet, page, this.pageMap));
    }
    async navigateTo(url) {
        return this.changeRoute("navigateTo", url);
    }
    async redirectTo(url) {
        return this.changeRoute("redirectTo", url);
    }
    async navigateBack() {
        return this.changeRoute("navigateBack");
    }
    async reLaunch(url) {
        // 如果检测到连接已断开...
        if (process.env.UNI_AUTOMATOR_FAILOVER_ON_RELAUNCH &&
            this.puppet.runtimeConnection.isBroken()) {
            // 仅处理支持“重新拉起应用”的平台
            if (this.puppet.platform === "app-plus" ||
                this.puppet.platform === "app-harmony") {
                // 如果检测到连接已断开，则重新拉起应用再执行 reLaunch
                await this.start("jest");
                // 等待新的连接替换掉旧的连接
                await waitUntil__default["default"](() => !this.puppet.runtimeConnection.isBroken(), 5000, 50).catch((_) => {
                    throw new Error("re-launch failed");
                });
            }
            // TODO: 针对 web 平台也应该有对应的方案
        }
        return this.changeRoute("reLaunch", url);
    }
    async switchTab(url) {
        return this.changeRoute("switchTab", url);
    }
    async currentPage() {
        const { id, path, query } = await this.appApi.getCurrentPage();
        return Page.create(this.puppet, { id, path, query }, this.pageMap);
    }
    async systemInfo() {
        return this.callUniMethod("getSystemInfoSync");
    }
    async callUniMethod(method, ...args) {
        return (await this.appApi.callUniMethod({ method, args })).result;
    }
    async mockUniMethod(method, result, ...args) {
        if (isFn__default["default"](result) || isFnStr(result)) {
            return this.appApi.mockUniMethod({
                method,
                functionDeclaration: result.toString(),
                args,
            });
        }
        return this.appApi.mockUniMethod({ method, result });
    }
    async restoreUniMethod(method) {
        return this.appApi.mockUniMethod({ method });
    }
    async evaluate(appFunction, // tslint:disable-line
    ...args) {
        return (await this.appApi.callFunction({
            functionDeclaration: appFunction.toString(),
            args,
        })).result;
    }
    async pageScrollTo(scrollTop) {
        await this.callUniMethod("pageScrollTo", {
            scrollTop,
            duration: 0,
        });
    }
    async close() {
        try {
            await this.appApi.exit();
        }
        catch (t) { }
        await sleep(1e3);
        this.puppet.disposeRuntimeServer();
        await this.toolApi.close();
        this.disconnect();
    }
    async start(from) {
        if (from) {
            clearAllElementMaps();
        }
        await this.appApi.start(from);
    }
    async teardown() {
        return this[this.options.teardown === "disconnect" ? "disconnect" : "close"]();
    }
    async remote(auto) {
        if (!this.puppet.devtools.remote) {
            return console.warn(`Failed to enable remote, ${this.puppet.devtools.name} is unimplemented`);
        }
        const { qrCode } = await this.toolApi.enableRemoteDebug({ auto });
        qrCode && (await printQrCode(qrCode));
        const connectedPromise = new Promise((resolve) => {
            this.toolApi.onRemoteDebugConnected(async () => {
                await sleep(1e3);
                resolve(void 0);
            });
        });
        const runtimePromise = new Promise((resolve) => {
            this.puppet.setRemoteRuntimeConnectionCallback(() => {
                resolve(void 0);
            });
        });
        return Promise.all([connectedPromise, runtimePromise]);
    }
    disconnect() {
        this.puppet.dispose();
    }
    on(event, listener) {
        if (event === "console") {
            this.appApi.enableLog();
        }
        super.on(event, listener);
        return this;
    }
    async exposeFunction(name, bindingFunction) {
        if (this.appBindings.has(name)) {
            throw Error(`Failed to expose function with name ${name}: already exists!`);
        }
        this.appBindings.set(name, bindingFunction);
        await this.appApi.addBinding({ name });
    }
    async checkVersion() { }
    async screenshot(options) {
        let method = "captureScreenshot";
        if (this.puppet.isX) {
            if (this.puppet.platform === "app-plus" ||
                this.puppet.platform === "app-harmony") {
                method = (options === null || options === void 0 ? void 0 : options.deviceShot) ? "captureScreenshotWithDeviceByRuntime"
                    : "captureScreenshotByRuntime";
            }
        }
        const { data } = await this.appApi[method]({
            id: options === null || options === void 0 ? void 0 : options.id,
            fullPage: options === null || options === void 0 ? void 0 : options.fullPage,
            deviceShot: options === null || options === void 0 ? void 0 : options.deviceShot,
            area: options === null || options === void 0 ? void 0 : options.area,
            offsetX: options === null || options === void 0 ? void 0 : options.offsetX,
            offsetY: options === null || options === void 0 ? void 0 : options.offsetY,
        });
        if (!(options === null || options === void 0 ? void 0 : options.path))
            return data;
        await fs__default["default"].writeFile(options.path, data, "base64");
    }
    async testAccounts() {
        return (await this.toolApi.getTestAccounts()).accounts;
    }
    async changeRoute(method, url) {
        if (this.puppet.isVue3 &&
            process.env.UNI_PLATFORM === "h5" &&
            method !== "navigateBack") {
            const { __id__ } = await this.callUniMethod(method, {
                url,
                isAutomatedTesting: true,
            });
            const startTime = Date.now();
            return await waitUntil__default["default"](async () => {
                if (Date.now() - startTime > 10000) {
                    throw Error(`${method} to ${url} failed, unable to get the correct current page`);
                }
                let page;
                try {
                    page = await this.currentPage();
                }
                catch (e) {
                    return false;
                }
                // @ts-ignore
                if (page.id === __id__) {
                    return page;
                }
                return false;
            }, 0, 1000);
        }
        await this.callUniMethod(method, {
            url,
        });
        await sleep(1e3);
        return await this.currentPage();
    }
    async socketEmitter(options) {
        return this.appApi.socketEmitter(options);
    }
    async adbCommand(command) {
        if (process.env.UNI_APP_PLATFORM === "android") {
            return await this.appApi.adbCommand(command);
        }
        else {
            return Error("Program.adbCommand is only supported on the app android platform");
        }
    }
    async swipe(options) {
        return await this.appApi.swipe(options);
    }
    async tap(options) {
        return await this.appApi.tap(options);
    }
    async keyboardInput(params) {
        return await this.appApi.keyboardInput(params);
    }
}

class Adapter {
    constructor(options) {
        this.options = options;
    }
    has(method) {
        return !!this.options[method];
    }
    send(connection, method, params) {
        const option = this.options[method];
        if (!option) {
            return Promise.reject(Error(`adapter for ${method} not found`));
        }
        const reflect = option.reflect;
        if (!reflect) {
            return Promise.reject(Error(`${method}'s reflect is required`));
        }
        if (option.params) {
            params = option.params(params);
        }
        if (typeof reflect === "function") {
            return reflect(connection.send.bind(connection), params);
        }
        else {
            method = reflect;
        }
        return connection.send(method, params);
    }
}

const debugPuppet = debug__default["default"]("automator:puppet");
const AUTOMATOR_JSON_FILE = ".automator.json";
function tryRequire(path) {
    try {
        return require(path);
    }
    catch (e) { }
}
function resolveAutomatorJson(projectPath, platform, mode) {
    let json;
    let jsonPath;
    if (process.env.UNI_OUTPUT_DIR) {
        jsonPath = path__default["default"].join(process.env.UNI_OUTPUT_DIR, `../.automator/${platform}`, AUTOMATOR_JSON_FILE);
        json = tryRequire(jsonPath);
    }
    else {
        jsonPath = path__default["default"].join(projectPath, `dist/${mode}/.automator/${platform}`, AUTOMATOR_JSON_FILE);
        json = tryRequire(jsonPath);
        if (!json) {
            jsonPath = path__default["default"].join(projectPath, `unpackage/dist/${mode}/.automator/${platform}`, AUTOMATOR_JSON_FILE);
            json = tryRequire(jsonPath);
        }
    }
    debugPuppet(`${jsonPath}=>${JSON.stringify(json)}`);
    return json;
}
function equalWsEndpoint(projectPath, port, platform, mode) {
    const json = resolveAutomatorJson(projectPath, platform, mode);
    if (!json || !json.wsEndpoint) {
        return false;
    }
    const version = require("../package.json").version;
    if (json.version !== version) {
        debugPuppet(`unmet=>${json.version}!==${version}`);
        return false;
    }
    const wsEndpoint = getWsEndpoint(port);
    debugPuppet(`wsEndpoint=>${wsEndpoint}`);
    return json.wsEndpoint === wsEndpoint;
}
class Puppet extends events.EventEmitter {
    constructor(platform, target) {
        super();
        this.isX = false;
        this.isVue3 = false;
        if (process.env.UNI_APP_X === "true") {
            this.isX = true;
        }
        if (target) {
            this.target = target;
        }
        else {
            this.target = null;
            if (platform === "h5") {
                try {
                    this.target = requireModule(`@dcloudio/uni-h5/lib/h5/uni.automator.js`);
                }
                catch (e) { }
            }
            if (!this.target) {
                this.target = requireModule(`@dcloudio/uni-${platform === "app" ? "app-plus" : platform}/lib/uni.automator.js`);
            }
        }
        if (!this.target) {
            throw Error("puppet is not provided");
        }
        this.platform = platform;
        this.adapter = new Adapter(this.target.adapter || {});
    }
    setCompiler(compiler) {
        this.compiler = compiler;
    }
    setRuntimeServer(wss) {
        this.wss = wss;
    }
    setRemoteRuntimeConnectionCallback(callback) {
        this.remoteRuntimeConnectionCallback = callback;
    }
    setRuntimeConnection(connection) {
        this.runtimeConnection = connection;
        if (this.remoteRuntimeConnectionCallback) {
            this.remoteRuntimeConnectionCallback();
            this.remoteRuntimeConnectionCallback = null;
        }
    }
    setDevtoolConnection(connection) {
        this.devtoolConnection = connection;
    }
    disposeRuntimeServer() {
        this.wss && this.wss.close();
    }
    disposeRuntime() {
        this.runtimeConnection.dispose();
    }
    disposeDevtool() {
        this.compiler && this.compiler.stop();
        this.devtoolConnection && this.devtoolConnection.dispose();
    }
    dispose() {
        this.disposeRuntime();
        this.disposeDevtool();
        this.disposeRuntimeServer();
    }
    send(method, params) {
        return this.runtimeConnection.send(method, params);
    }
    validateProject(projectPath) {
        const required = this.target.devtools.required;
        if (!required) {
            return true;
        }
        return !required.find((file) => !fs__default$1["default"].existsSync(path__default["default"].join(projectPath, file)));
    }
    validateDevtools(options) {
        const validate = this.target.devtools.validate;
        if (validate) {
            return validate(options, this);
        }
        return Promise.resolve(options);
    }
    createDevtools(devtoolsProjectPath, options, timeout) {
        const create = this.target.devtools.create;
        if (create) {
            options.timeout = timeout;
            return create(devtoolsProjectPath, options, this);
        }
        return Promise.resolve();
    }
    shouldCompile(projectPath, port, options, devtoolsOptions) {
        this.compiled = true;
        const shouldCompile = this.target.shouldCompile;
        if (shouldCompile) {
            this.compiled = shouldCompile(options, devtoolsOptions);
        }
        else {
            if (options.compile === true) {
                this.compiled = true;
            }
            else {
                if (process.env.UNI_AUTOMATOR_COMPILE === "false") {
                    return false;
                }
                //自动检测
                this.compiled = !equalWsEndpoint(projectPath, port, this.platform, this.mode);
            }
        }
        return this.compiled;
    }
    beforeCompile() {
        this.target.beforeCompile &&
            this.target.beforeCompile(path__default["default"].resolve(__dirname, ".."));
    }
    afterCompile() {
        this.target.afterCompile && this.target.afterCompile();
    }
    get checkProperty() {
        return this.platform === "mp-weixin";
    }
    get devtools() {
        return this.target.devtools;
    }
    get mode() {
        const mode = this.target.mode;
        if (mode) {
            return mode;
        }
        return process.env.NODE_ENV === "production" ? "build" : "dev";
    }
}

const debugCompiler = debug__default["default"]("automator:compiler");
const SIGNAL_DONE = "DONE  Build complete";
const SIGNAL_FAILED = "DONE  Build failed";
const SIGNAL_DONE_H5 = "- Network";
const SIGNAL_DONE_VITE_H5 = "> Network";
const SIGNAL_DONE_VITE_H5_CLI = "➜  Network";
const PATH_RE = /The\s+(.*)\s+directory is ready/;
class Compiler {
    constructor(puppet) {
        this.puppet = puppet;
        this.puppet.setCompiler(this);
    }
    compile(options) {
        const mode = this.puppet.mode;
        const platform = this.puppet.platform;
        let silent = options.silent;
        const autoPort = options.port;
        const autoHost = options.host;
        const npmScript = `${mode}:${platform}`;
        const projectPath = options.projectPath;
        const [command, cliArgs] = this.getSpawnArgs(options, npmScript);
        cliArgs.push("--auto-port");
        cliArgs.push(toStr__default["default"](autoPort));
        if (autoHost) {
            cliArgs.push("--auto-host");
            cliArgs.push(autoHost);
        }
        const cliOptions = {
            cwd: options.cliPath,
            env: Object.assign(Object.assign({}, process.env), { NODE_ENV: mode === "build" ? "production" : "development" }),
        };
        return new Promise((resolve, reject) => {
            const onError = (err) => {
                reject(err);
            };
            const onStdoutData = (data) => {
                const msg = data.toString().trim();
                !silent && console.log(msg);
                if (msg.includes(SIGNAL_DONE_H5) ||
                    msg.includes(SIGNAL_DONE_VITE_H5) ||
                    msg.includes(SIGNAL_DONE_VITE_H5_CLI)) {
                    const networkUrl = msg.match(/Network:(.*)/)[1].trim();
                    // H5 DONE
                    debugCompiler(`url: ${networkUrl}`);
                    resolve({ path: networkUrl });
                }
                else if (msg.includes(SIGNAL_FAILED)) {
                    reject(msg);
                }
                else if (msg.includes(SIGNAL_DONE)) {
                    const matches = msg.match(PATH_RE);
                    let outputDir = "";
                    if (matches && matches.length > 1) {
                        outputDir = path__default["default"].join(projectPath, matches[1]);
                    }
                    else {
                        const outputPlatformDir = this.puppet.isX && platform === "app-plus" ? "app" : platform;
                        outputDir = path__default["default"].join(projectPath, `dist/${mode}/${outputPlatformDir}`);
                        // 兼容 vue3 cli 输出目录 app-plus 改为 app
                        if (!fsExtra.existsSync(outputDir) && outputDir.endsWith("app-plus")) {
                            outputDir = outputDir.substring(0, outputDir.length - 8) + "app";
                        }
                        if (!fsExtra.existsSync(outputDir)) {
                            outputDir = process.env.UNI_OUTPUT_DIR;
                        }
                    }
                    this.puppet.afterCompile();
                    silent = true; // 编译已完成
                    this.stop();
                    resolve({
                        path: process.env.UNI_AUTOMATOR_APP_WEBVIEW === "true"
                            ? process.env.UNI_OUTPUT_DIR
                            : outputDir,
                    });
                }
            };
            debugCompiler(`${command} ${cliArgs.join(" ")} %o`, cliOptions);
            this.cliProcess = child_process.spawn(command, cliArgs, cliOptions);
            this.cliProcess.on("error", onError);
            this.cliProcess.stdout.on("data", onStdoutData);
            this.cliProcess.stderr.on("data", onStdoutData);
        });
    }
    stop() {
        this.cliProcess && this.cliProcess.kill("SIGTERM");
    }
    getSpawnArgs(options, npmScript) {
        let pkg;
        const cliPath = options.cliPath;
        try {
            pkg = require(path__default["default"].join(cliPath, "package.json"));
        }
        catch (e) { }
        let vue3 = this.puppet.isX;
        if (pkg) {
            if (pkg.devDependencies &&
                pkg.devDependencies["@dcloudio/vite-plugin-uni"]) {
                vue3 = true;
            }
            if (!vue3 &&
                pkg.dependencies &&
                pkg.dependencies["@dcloudio/vite-plugin-uni"]) {
                vue3 = true;
            }
            if (pkg.scripts) {
                // 兼容 vue3 cli 项目命令 dev:app-plus 改为 dev:app
                if (!pkg.scripts[npmScript] && npmScript.endsWith("app-plus")) {
                    npmScript = npmScript.substring(0, npmScript.length - 8) + "app";
                }
                if (pkg.scripts[npmScript]) {
                    return [
                        process.env.UNI_NPM_PATH ||
                            (/^win/.test(process.platform) ? "npm.cmd" : "npm"),
                        ["run", npmScript, "--"],
                    ];
                }
            }
        }
        this.puppet.isVue3 = vue3;
        if (["android", "ios"].includes(process.env.UNI_OS_NAME)) {
            process.env.UNI_APP_PLATFORM = process.env.UNI_OS_NAME;
        }
        let outputPlatformDir = this.puppet.platform;
        if (this.puppet.platform === "app-plus" && this.puppet.isX) {
            if (process.env.UNI_APP_PLATFORM === "android") {
                outputPlatformDir = "app-android";
            }
            else if (process.env.UNI_APP_PLATFORM === "ios") {
                outputPlatformDir = "app-ios";
            }
            else {
                outputPlatformDir = "app";
            }
        }
        process.env.UNI_INPUT_DIR = options.projectPath;
        process.env.UNI_OUTPUT_DIR = path__default["default"].join(options.projectPath, `unpackage/dist/${this.puppet.mode}/${outputPlatformDir}`);
        if (!process.env.UNI_HBUILDERX_PLUGINS) {
            if (fsExtra.existsSync(path__default["default"].resolve(cliPath, "../about"))) {
                process.env.UNI_HBUILDERX_PLUGINS = path__default["default"].dirname(cliPath);
            }
        }
        this.puppet.beforeCompile();
        if (vue3) {
            const platform = this.puppet.platform === "app-plus" ? "app" : this.puppet.platform;
            process.env.UNI_PLATFORM = platform;
            return [
                process.env.UNI_NODE_PATH || "node",
                [
                    require.resolve("@dcloudio/vite-plugin-uni/bin/uni.js", {
                        paths: [cliPath],
                    }),
                    "-p",
                    platform,
                ],
            ];
        }
        return [
            process.env.UNI_NODE_PATH || "node",
            [path__default["default"].join(cliPath, "bin/uniapp-cli.js")],
        ];
    }
}

const debugLauncher = debug__default["default"]("automator:launcher");
const PORT = 9520;
// 2.0 android 进一步优化超时时间为 2 分钟
const TIMEOUT = process.env.UNI_APP_X === "true" && process.env.UNI_APP_PLATFORM === "android"
    ? 12e4
    : 24e4;
function exit(msg) {
    throw Error(msg);
}
class Launcher {
    async launch(options) {
        // 1.校验参数
        const { port, cliPath, timeout, projectPath } = await this.validate(options);
        let devtools = {};
        if (options.platform === "app" ||
            options.platform === "app-plus" ||
            options.platform === "app-harmony") {
            devtools = options.app || options["app-plus"];
            if (process.env.UNI_APP_X === "true") {
                if (devtools["uni-app-x"]) {
                    devtools = merge.recursive(true, devtools, devtools["uni-app-x"]);
                }
            }
            delete devtools["uni-app-x"];
        }
        else {
            devtools = options[options.platform];
        }
        if (!devtools) {
            devtools = {};
        }
        devtools.projectPath = projectPath;
        debugLauncher(devtools);
        this.puppet = new Puppet(options.platform, devtools.puppet);
        devtools = await this.puppet.validateDevtools(devtools);
        // 2.编译
        let shouldCompile = this.puppet.shouldCompile(projectPath, port, options, devtools);
        let devtoolsProjectPath = process.env.UNI_OUTPUT_DIR || projectPath;
        if (!shouldCompile) {
            if (!this.puppet.validateProject(devtoolsProjectPath)) {
                devtoolsProjectPath = path__default["default"].join(projectPath, "dist/" + this.puppet.mode + "/" + this.puppet.platform);
                if (!this.puppet.validateProject(devtoolsProjectPath)) {
                    devtoolsProjectPath = path__default["default"].join(projectPath, "unpackage/dist/" + this.puppet.mode + "/" + this.puppet.platform);
                    if (!this.puppet.validateProject(devtoolsProjectPath)) {
                        shouldCompile = true;
                    }
                }
            }
        }
        if (shouldCompile) {
            this.puppet.compiled = options.compile = true;
            this.compiler = new Compiler(this.puppet);
            const compilerResult = await this.compiler.compile({
                host: options.host,
                port,
                cliPath,
                projectPath,
                silent: !!options.silent,
            });
            if (compilerResult.path) {
                devtoolsProjectPath = compilerResult.path;
            }
        }
        const promises = [];
        // 3.runtime
        promises.push(this.createRuntimeConnection(port, timeout));
        // 4.devtool
        promises.push(this.puppet.createDevtools(devtoolsProjectPath, devtools, timeout));
        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(([runtimeConnection, devtoolConnection]) => {
                runtimeConnection &&
                    this.puppet.setRuntimeConnection(runtimeConnection);
                devtoolConnection &&
                    this.puppet.setDevtoolConnection(devtoolConnection);
                debug__default["default"]("automator:program")("ready");
                const teardown = devtools.teardown || "disconnect";
                resolve(new Program(this.puppet, { teardown, port }));
            })
                .catch((err) => reject(err));
        });
    }
    resolveCliPath(cliPath) {
        if (!cliPath) {
            return cliPath;
        }
        try {
            const { dependencies, devDependencies } = require(path__default["default"].join(cliPath, "package.json"));
            if (hasCliDeps(devDependencies) || hasCliDeps(dependencies)) {
                return cliPath;
            }
        }
        catch (e) { }
    }
    resolveProjectPath(projectPath, options) {
        if (!projectPath) {
            projectPath = process.env.UNI_INPUT_DIR || process.cwd();
        }
        if (isRelative__default["default"](projectPath)) {
            projectPath = path__default["default"].resolve(projectPath);
        }
        if (!fs__default$1["default"].existsSync(projectPath)) {
            exit(`Project path ${projectPath} doesn't exist`);
        }
        return projectPath;
    }
    async validate(options) {
        const projectPath = this.resolveProjectPath(options.projectPath, options);
        let cliPath = process.env.UNI_CLI_PATH || options.cliPath;
        cliPath = this.resolveCliPath(cliPath || "");
        !cliPath && (cliPath = this.resolveCliPath(process.cwd()));
        !cliPath && (cliPath = this.resolveCliPath(projectPath));
        if (!cliPath) {
            throw Error("cliPath is not provided");
        }
        // 没指定的情况下自动读取
        if (process.env.UNI_APP_X !== "false") {
            const manifest = this.getManifestJson(projectPath);
            if (process.env.UNI_APP_X === "true" || "uni-app-x" in manifest) {
                process.env.UNI_APP_X = "true";
                if (manifest.appid) {
                    process.env.UNI_APP_ID = manifest.appid;
                }
            }
        }
        if (process.env.UNI_AUTOMATOR_HOST) {
            options.host = process.env.UNI_AUTOMATOR_HOST;
        }
        if (process.env.UNI_AUTOMATOR_PORT) {
            options.port = parseInt(process.env.UNI_AUTOMATOR_PORT);
        }
        const port = await resolvePort(options.port || PORT);
        const timeout = options.timeout || TIMEOUT;
        return {
            port,
            cliPath,
            timeout,
            projectPath,
        };
    }
    getManifestJson(projectPath) {
        if (projectPath) {
            const manifestJsonPath = path__default["default"].join(projectPath, "manifest.json");
            if (fs__default$1["default"].existsSync(manifestJsonPath)) {
                return jsoncParser.parse(fs__default$1["default"].readFileSync(manifestJsonPath, "utf8"));
            }
        }
        return {};
    }
    async createRuntimeConnection(port, timeout) {
        return Connection.createRuntimeConnection(port, this.puppet, timeout);
    }
}
function hasCliDeps(deps) {
    if (!deps) {
        return false;
    }
    return !!(deps["@dcloudio/vue-cli-plugin-uni"] || deps["@dcloudio/vite-plugin-uni"]);
}

class Automator {
    constructor() {
        this.launcher = new Launcher();
    }
    // async connect(options: IConnectOptions) {
    //   return this.launcher.connect(options);
    // }
    async launch(options) {
        return this.launcher.launch(options);
    }
}

exports.Automator = Automator;
exports.initUni = initUni;
