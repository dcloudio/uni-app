'use strict';

var debug = require('debug');
var isWindows = require('licia/isWindows');
var getPort = require('licia/getPort');
var QrCodeReader = require('qrcode-reader');
var fs = require('fs');
var child_process = require('child_process');
var sleep = require('licia/sleep');
var toStr = require('licia/toStr');
var waitUntil = require('licia/waitUntil');
var concat = require('licia/concat');
var dateFormat = require('licia/dateFormat');
var WebSocket = require('ws');
var events = require('events');
var uuid = require('licia/uuid');
var stringify = require('licia/stringify');
var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);
var isWindows__default = /*#__PURE__*/_interopDefaultLegacy(isWindows);
var getPort__default = /*#__PURE__*/_interopDefaultLegacy(getPort);
var QrCodeReader__default = /*#__PURE__*/_interopDefaultLegacy(QrCodeReader);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);
var sleep__default = /*#__PURE__*/_interopDefaultLegacy(sleep);
var toStr__default = /*#__PURE__*/_interopDefaultLegacy(toStr);
var waitUntil__default = /*#__PURE__*/_interopDefaultLegacy(waitUntil);
var concat__default = /*#__PURE__*/_interopDefaultLegacy(concat);
var dateFormat__default = /*#__PURE__*/_interopDefaultLegacy(dateFormat);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var uuid__default = /*#__PURE__*/_interopDefaultLegacy(uuid);
var stringify__default = /*#__PURE__*/_interopDefaultLegacy(stringify);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

/^win/.test(process.platform);
function decodeQrCode(qrCode) {
    const buffer = new Buffer(qrCode, "base64");
    return new Promise(async (resolve, reject) => {
        const img = await require("jimp").read(buffer);
        const qrCodeReader = new QrCodeReader__default["default"]();
        qrCodeReader.callback = function (error, value) {
            if (error) {
                return reject(error);
            }
            resolve(value.result);
        };
        qrCodeReader.decode(img.bitmap);
    });
}
async function resolvePort(port, defaultPort) {
    const newPort = await getPort__default["default"](port || defaultPort);
    if (port && newPort !== port) {
        throw Error(`Port ${port} is in use, please specify another port`);
    }
    return newPort;
}
function requireModule(id) {
    try {
        return require(id);
    }
    catch (e) {
        return require(require.resolve(id, { paths: [process.cwd()] }));
    }
}

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
const socketTaskMap = new Map();
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

const debugDevtools = debug__default["default"]("automator:devtool");
function resolveDevtoolsPath(cliPath, puppet) {
    const paths = puppet.devtools.paths.slice(0);
    if (cliPath) {
        paths.unshift(cliPath);
    }
    for (const cliPath of paths) {
        if (fs__default["default"].existsSync(cliPath)) {
            return cliPath;
        }
    }
    throw Error(`${puppet.devtools.name} not found, please specify executablePath option`);
}
async function validateDevtools(options, puppet) {
    const cliPath = resolveDevtoolsPath(options.executablePath, puppet);
    let port = options.port || puppet.devtools.defaultPort;
    if (options.launch !== false) {
        try {
            port = await resolvePort(port);
        }
        catch (e) {
            // console.log(`Port ${port} is in use, try to connect directly`);
            options.launch = false;
        }
    }
    else {
        const newPort = await getPort__default["default"](port);
        if (port === newPort) {
            options.launch = true;
            // console.log(`try to launch ${this.puppet.devtools.name}`);
        }
    }
    return Object.assign(Object.assign({}, options), { port,
        cliPath });
}
async function connectTool(options, puppet) {
    let connection;
    try {
        connection = await Connection.createDevtoolConnection(options.wsEndpoint, puppet);
    }
    catch (e) {
        throw Error(`Failed connecting to ${options.wsEndpoint}, check if target project window is opened with automation enabled`);
    }
    return connection;
}
async function createDevtools(projectPath, options, puppet) {
    const { port, cliPath, timeout, cwd = "", account = "", args = [], launch = true, } = options;
    let launchFailed = false;
    let connectFailed = false;
    if (launch !== false) {
        const spawnOptions = {
            stdio: "ignore",
        };
        {
            spawnOptions.detached = true;
        }
        cwd && (spawnOptions.cwd = cwd);
        let spawnArgs = concat__default["default"](args, []);
        {
            spawnArgs = concat__default["default"](spawnArgs, ["auto", "--project"]);
        }
        spawnArgs = concat__default["default"](spawnArgs, [projectPath, "--auto-port", toStr__default["default"](port)]);
        account && (spawnArgs = concat__default["default"](spawnArgs, ["--auto-account", account]));
        try {
            debugDevtools("%s %o %o", cliPath, spawnArgs, spawnOptions);
            const cliProcess = child_process__default["default"].spawn(cliPath, spawnArgs, spawnOptions);
            cliProcess.on("error", (err) => {
                launchFailed = true;
            });
            cliProcess.on("exit", () => {
                setTimeout(() => {
                    connectFailed = true;
                }, 15e3);
            });
            // TODO unref?
            cliProcess.unref();
        }
        catch (err) {
            launchFailed = false;
        }
    }
    else {
        setTimeout(() => {
            connectFailed = true;
        }, 15e3);
    }
    const connection = await waitUntil__default["default"](async () => {
        try {
            if (launchFailed || connectFailed) {
                return true;
            }
            const connection = await connectTool({ wsEndpoint: `ws://127.0.0.1:${port}` }, puppet);
            return connection;
        }
        catch (err) { }
    }, timeout, 1e3);
    if (launchFailed) {
        throw Error(`Failed to launch ${puppet.devtools.name}, please make sure cliPath is correctly specified`);
    }
    if (connectFailed) {
        throw Error(`Failed to launch ${puppet.devtools.name} , please make sure http port is open`);
    }
    await sleep__default["default"](5e3);
    debugDevtools(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} connected`);
    return connection;
}

function wrapper(fnStr) {
    if (fnStr[fnStr.length - 1] === "}") {
        return fnStr.replace("{", "{\nvar uni = wx;\n");
    }
    return fnStr.replace("=>", "=>{\nvar uni = wx;\nreturn ") + "}";
}
const puppet = {
    devtools: {
        name: "Wechat web devTools",
        remote: true,
        automator: true,
        paths: [
            isWindows__default["default"]
                ? "C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat"
                : "/Applications/wechatwebdevtools.app/Contents/MacOS/cli",
        ],
        required: ["project.config.json", "app.json", "app.js"],
        defaultPort: 9420,
        validate: validateDevtools,
        async create(projectPath, options, puppet) {
            const connection = await createDevtools(projectPath, options, puppet);
            if (!puppet.compiled) {
                debug__default["default"]("automator:devtool")("initRuntimeAutomator");
                connection.send("App.callWxMethod", {
                    method: "$$initRuntimeAutomator",
                    args: [],
                });
            }
            else {
                debug__default["default"]("automator:devtool")("Waiting for runtime automator");
            }
            return connection;
        },
    },
    adapter: {
        "Tool.enableRemoteDebug": {
            reflect: async (send, params) => {
                let { qrCode } = await send("Tool.enableRemoteDebug", params, false);
                qrCode && (qrCode = await decodeQrCode(qrCode));
                return { qrCode };
            },
        },
        // "App.callUniMethod": {
        //   reflect: "App.callWxMethod",
        // },
        "App.callFunction": {
            reflect: async (send, params) => {
                return send("App.callFunction", Object.assign(Object.assign({}, params), { functionDeclaration: wrapper(params.functionDeclaration) }), false);
            },
        },
        "Element.getHTML": {
            reflect: async (send, params) => {
                return { html: (await send("Element.getWXML", params, false)).wxml };
            },
        },
    },
};

module.exports = puppet;
