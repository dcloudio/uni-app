'use strict';

var fs = require('fs');
var path = require('path');
var debug = require('debug');
var jsoncParser = require('jsonc-parser');
var fs$1 = require('fs-extra');
var parser = require('postcss-selector-parser');
var dateFormat = require('licia/dateFormat');
var util = require('util');
var child_process = require('child_process');
var dns = require('dns');
var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);
var fs__default$1 = /*#__PURE__*/_interopDefaultLegacy(fs$1);
var parser__default = /*#__PURE__*/_interopDefaultLegacy(parser);
var dateFormat__default = /*#__PURE__*/_interopDefaultLegacy(dateFormat);
var dns__default = /*#__PURE__*/_interopDefaultLegacy(dns);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

debug__default["default"]("automator:devtool");
function transform(selectors) {
    selectors.walk((selector) => {
        if (selector.type === "tag") {
            const value = selector.value;
            if (value === "page") {
                {
                    selector.value = "body";
                }
            }
            else {
                selector.value = "uni-" + value;
            }
        }
    });
}
function transSelector(method) {
    return {
        reflect: async (send, params) => send(method, params, false),
        params(params) {
            if (params.selector) {
                params.selector = parser__default["default"](transform).processSync(params.selector);
            }
            return params;
        },
    };
}
const methods = [
    "Page.getElement",
    "Page.getElements",
    "Element.getElement",
    "Element.getElements",
];
function initAdapter(adapter) {
    methods.forEach((method) => {
        adapter[method] = transSelector(method);
    });
}

const isWin = /^win/.test(process.platform);
const normalizePath = (path) => isWin ? path.replace(/\\/g, "/") : path;
function requireModule(id) {
    try {
        return require(id);
    }
    catch (e) {
        return require(require.resolve(id, { paths: [process.cwd()] }));
    }
}

const debugLauncher = debug__default["default"]("automator:launcher");
const APPID = "HBuilder";
const APPID_X = "__UNI__uniappx";
const PACKAGE = "io.dcloud.HBuilder";
const PACKAGE_X = "io.dcloud.uniappx";
const ACTIVITY = "io.dcloud.PandoraEntry";
const ACTIVITY_X = "io.dcloud.uniapp.UniAppActivity";
const readdir = util.promisify(fs__default["default"].readdir);
const stat = util.promisify(fs__default["default"].stat);
async function getFiles(dir) {
    const subdirs = await readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = path.resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}
class Launcher {
    constructor(options) {
        this.isX = false;
        if (process.env.UNI_APP_X === "true") {
            this.isX = true;
        }
        this.id = options.id;
        this.app = options.executablePath;
        this.appid =
            options.appid || process.env.UNI_APP_ID || (this.isX ? APPID_X : APPID);
        this.package = options.package || (this.isX ? PACKAGE_X : PACKAGE);
        this.activity = options.activity || (this.isX ? ACTIVITY_X : ACTIVITY);
        this.projectPath = options.projectPath;
    }
    shouldPush() {
        return this.exists(this.FILE_APP_SERVICE)
            .then(() => {
            debugLauncher(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} ${this.FILE_APP_SERVICE} exists`);
            return false;
        })
            .catch(() => {
            debugLauncher(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} ${this.FILE_APP_SERVICE} not exists`);
            return true;
        });
    }
    push(from) {
        return getFiles(from)
            .then((files) => {
            const pushes = files.map((file) => {
                const to = normalizePath(path.join(this.DIR_WWW, path.relative(from, file)));
                debugLauncher(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} push ${file} ${to}`);
                return this.pushFile(file, to);
            });
            return Promise.all(pushes);
        })
            .then((res) => true);
    }
    get FILE_APP_SERVICE() {
        return `${this.DIR_WWW}/app-service.js`;
    }
}

const debugClient$2 = debug__default["default"]("automator:simctl");
function padZero$1(str) {
    const num = parseInt(str);
    return num > 9 ? String(num) : "0" + num;
}
class IOS extends Launcher {
    constructor() {
        super(...arguments);
        this.bundleVersion = "";
    }
    async init() {
        const Simctl = requireModule("node-simctl").Simctl;
        this.tool = new Simctl({ udid: this.id });
        try {
            await this.tool.bootDevice();
        }
        catch (e) { }
        await this.initSDCard();
        debugClient$2(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} init ${this.id}`);
    }
    async initSDCard() {
        const appInfo = await this.tool.appInfo(this.package);
        debugClient$2(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} appInfo ${appInfo}`);
        const matches = appInfo.match(/DataContainer\s+=\s+"(.*)"/);
        if (!matches) {
            return Promise.resolve("");
        }
        const versionMatches = appInfo.match(/CFBundleVersion\s+=\s+(.*);/);
        if (!versionMatches) {
            return Promise.resolve("");
        }
        this.sdcard = matches[1].replace("file:", "");
        this.bundleVersion = versionMatches[1];
        debugClient$2(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} install ${this.sdcard}`);
    }
    async version() {
        return Promise.resolve(this.bundleVersion);
    }
    formatVersion(version) {
        const versions = version.split(".");
        if (versions.length !== 3) {
            return version;
        }
        return versions[0] + padZero$1(versions[1]) + padZero$1(versions[2]);
    }
    async install() {
        debugClient$2(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} install ${this.app}`);
        await this.tool.installApp(this.app);
        await this.tool.grantPermission(this.package, "all");
        await this.initSDCard();
        return Promise.resolve(true);
    }
    async start() {
        debugClient$2("ios simulator start");
        try {
            await this.tool.terminateApp(this.package);
        }
        catch (e) {
            console.error("ios simulator start terminateApp fail", e);
        }
        try {
            await this.tool.launchApp(this.package);
        }
        catch (e) {
            console.error("ios simulator start launchApp fail", e);
            console.error(e);
        }
        return Promise.resolve(true);
    }
    async exit() {
        await this.tool.terminateApp(this.package);
        await this.tool.shutdownDevice();
        return Promise.resolve(true);
    }
    exists(file) {
        return fs__default$1["default"].existsSync(file)
            ? Promise.resolve(true)
            : Promise.reject(Error(`${file} not exists`));
    }
    pushFile(from, to) {
        return Promise.resolve(fs__default$1["default"].copySync(from, to));
    }
    adbCommand(_) {
        return new Promise((_, reject) => {
            reject("adbCommand only for App Android!");
        });
    }
    getDensity(reject, eventName, callback) {
        child_process.exec(`idb connect ${this.id} && idb describe --udid ${this.id}`, (error, stdout, _) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(`${eventName} fail: ${error}`);
                return;
            }
            const densityStartPosition = stdout.indexOf("density=");
            const densityEndPosition = stdout.indexOf(",", densityStartPosition);
            const densityStr = stdout
                .substring(densityStartPosition + 8, densityEndPosition)
                .trim();
            const density = parseFloat(densityStr);
            callback(density);
        });
    }
    async captureScreenshot(params) {
        const base64string = await Promise.resolve(await this.tool.getScreenshot());
        return new Promise((resolve, reject) => {
            var _a, _b;
            if (((_a = params === null || params === void 0 ? void 0 : params.area) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = params === null || params === void 0 ? void 0 : params.area) === null || _b === void 0 ? void 0 : _b.y) !== undefined) {
                const Jimp = require("jimp");
                Jimp.read(Buffer.from(base64string, "base64"))
                    .then((img) => {
                    this.getDensity(reject, "captureScreenshot", (density) => {
                        const x = params.area.x * density;
                        const y = params.area.y * density;
                        let width = img.bitmap.width - x;
                        if (params.area.width) {
                            width = Math.min(width, params.area.width * density);
                        }
                        let height = img.bitmap.height - y;
                        if (params.area.height) {
                            height = Math.min(height, params.area.height * density);
                        }
                        img
                            .crop(x, y, width, height)
                            .getBase64Async(Jimp.MIME_PNG)
                            .then((data) => {
                            resolve(data.replace("data:image/png;base64,", ""));
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            else {
                resolve(base64string);
            }
        });
    }
    swipe(options) {
        // idb 工具传入的就是逻辑像素, 不需要处理像素比
        return new Promise((resolve) => {
            const { startPoint, endPoint, duration } = options;
            child_process.exec(`idb connect ${this.id} && idb ui swipe ${startPoint.x} ${startPoint.y} ${endPoint.x} ${endPoint.y} --duration ${duration ? duration / 1000 : 0.1} --udid ${this.id}`, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    resolve(`swipe fail: ${error}`);
                    return;
                }
                resolve(`swipe success`);
            });
        });
    }
    tap(options) {
        // idb 工具传入的就是逻辑像素, 不需要处理像素比
        return new Promise((resolve) => {
            const { x, y, duration } = options;
            const roundedX = Math.round(x);
            const roundedY = Math.round(y);
            child_process.exec(`idb connect ${this.id} && idb ui tap ${roundedX} ${roundedY} --duration ${duration ? duration / 1000 : 0} --udid ${this.id}`, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    resolve(`tap fail: ${error}`);
                    return;
                }
                resolve(`tap success`);
            });
        });
    }
    keyboardInput(options) {
        return new Promise((resolve) => {
            child_process.exec(`idb connect ${this.id} && idb ui text ${options.text} --udid ${this.id}`, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    resolve(`tap fail: ${error}`);
                    return;
                }
                resolve(`keyboardInput success`);
            });
        });
    }
    get DIR_WWW() {
        if (process.env.UNI_APP_X === "true") {
            // 目前固定为 apps/__UNI__uniappx/www 而非 apps/appid/www
            return `${this.sdcard}/Documents/uni-app-x/apps/__UNI__uniappx/www/`;
        }
        return `${this.sdcard}/Documents/Pandora/apps/${this.appid}/www/`;
    }
}

const adb = requireModule("adbkit");
const debugClient$1 = debug__default["default"]("automator:adb");
const $EXTERNAL_STORAGE = "$EXTERNAL_STORAGE";
class Android extends Launcher {
    constructor() {
        super(...arguments);
        this.needStart = true;
    }
    async init() {
        console.log("app-plus/launcher/android.ts init start");
        // 修复特定 node 版本(17+/18+) bug https://github.com/nodejs/node/issues/40702
        // @ts-expect-error
        if (dns__default["default"].setDefaultResultOrder !== undefined) {
            // @ts-expect-error
            dns__default["default"].setDefaultResultOrder("ipv4first");
        }
        console.log("app-plus/launcher/android.ts init before adb.createClient");
        // adbkit 异常时，可能不会关闭 socket
        this.tool = adb.createClient();
        console.log("app-plus/launcher/android.ts init after adb.createClient");
        debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} init ${await this.tool.version()}`);
        console.log("app-plus/launcher/android.ts init after debugClient init this.tool.version");
        if (!this.id) {
            console.log("app-plus/launcher/android.ts init before listDevices");
            const devices = await this.tool.listDevices();
            if (!devices.length) {
                throw Error(`Device not found`);
            }
            console.log("app-plus/launcher/android.ts init this.id", this.id);
            this.id = devices[0].id;
        }
        console.log("app-plus/launcher/android.ts init before echo ${$EXTERNAL_STORAGE}");
        this.sdcard = (await this.shell(this.COMMAND_EXTERNAL)).trim();
        console.log("app-plus/launcher/android.ts init after echo ${$EXTERNAL_STORAGE}", this.sdcard);
        debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} init ${this.id} ${this.sdcard}`);
        console.log("app-plus/launcher/android.ts init after debugClient init this.id this.sdcard");
    }
    root() {
        return this.tool
            .root(this.id)
            .then(() => {
            debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} root ${this.id} ${this.sdcard}`);
        })
            .catch((e) => {
            debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} root ${this.id} ${e}`);
        });
    }
    version() {
        return this.shell(this.COMMAND_VERSION).then((output) => {
            const matches = output.match(/versionName=(.*)/);
            if (matches && matches.length > 1) {
                return matches[1];
            }
            return "";
        });
    }
    formatVersion(version) {
        return version;
    }
    async install() {
        let grant = true;
        try {
            const props = await this.tool.getProperties(this.id);
            const version = props["ro.build.version.release"].split(".")[0];
            if (parseInt(version) < 6) {
                grant = false;
            }
        }
        catch (e) { }
        debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} install ${this.app} permission=${grant}`);
        if (grant) {
            const Command = requireModule("adbkit/lib/adb/command.js");
            const oldSend = Command.prototype._send;
            Command.prototype._send = function send(data) {
                if (data.indexOf("shell:pm install -r ") === 0) {
                    data = data.replace("shell:pm install -r ", "shell:pm install -r -g ");
                    debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} ${data} `);
                }
                return oldSend.call(this, data);
            };
        }
        return this.tool.install(this.id, this.app).then(() => {
            debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} installed`);
            this.init();
            console.log("app-plus/launcher/android.ts this.tool.install after this.init");
        });
    }
    start(from) {
        if (!this.needStart && !from) {
            return Promise.resolve();
        }
        return this.exit().then(() => this.shell(this.COMMAND_START));
    }
    exit() {
        return this.shell(this.COMMAND_STOP);
    }
    getDensity(callback) {
        this.tool.shell(this.id, "wm density").then((conn) => {
            let res = "";
            let timeoutTimer;
            conn.on("data", (data) => {
                res += data.toString();
                timeoutTimer && clearTimeout(timeoutTimer);
                timeoutTimer = setTimeout(() => {
                    var _a;
                    const density = parseInt((_a = res.split(":")[1]) === null || _a === void 0 ? void 0 : _a.trim());
                    callback(density ? density / 160 : 1);
                }, 50);
            });
        });
    }
    captureScreenshot(params) {
        const self = this;
        return this.tool.screencap(this.id).then((stream) => {
            return new Promise((resolve, reject) => {
                const chunks = [];
                stream.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                stream.on("end", function () {
                    var _a, _b;
                    if (((_a = params.area) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = params.area) === null || _b === void 0 ? void 0 : _b.y) !== undefined) {
                        const Jimp = require("jimp");
                        Jimp.read(Buffer.concat(chunks))
                            .then((img) => {
                            self.getDensity((density) => {
                                var _a, _b, _c, _d;
                                const x = params.area.x * density;
                                const y = params.area.y * density;
                                let width = img.bitmap.width - x;
                                if ((_a = params.area) === null || _a === void 0 ? void 0 : _a.width) {
                                    width = Math.min(width, ((_b = params.area) === null || _b === void 0 ? void 0 : _b.width) * density);
                                }
                                let height = img.bitmap.height - y;
                                if ((_c = params.area) === null || _c === void 0 ? void 0 : _c.height) {
                                    height = Math.min(height, ((_d = params.area) === null || _d === void 0 ? void 0 : _d.height) * density);
                                }
                                img
                                    .crop(x, y, width, height)
                                    .getBase64Async(Jimp.MIME_PNG)
                                    .then((data) => {
                                    resolve(data.replace("data:image/png;base64,", ""));
                                })
                                    .catch((err) => {
                                    reject(err);
                                });
                            });
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    }
                    else {
                        resolve(Buffer.concat(chunks).toString("base64"));
                    }
                });
            });
        });
    }
    adbCommand(command) {
        return new Promise((resolve) => {
            this.tool.shell(this.id, command).then((conn) => {
                let res = "";
                let timeoutTimer;
                conn.on("data", (data) => {
                    res += data.toString();
                    timeoutTimer && clearTimeout(timeoutTimer);
                    timeoutTimer = setTimeout(() => {
                        resolve(res);
                    }, 50);
                });
                // 部分命令 conn 无法响应，延迟 resolve 兜底
                setTimeout(() => {
                    resolve(res);
                }, 1500);
            });
        });
    }
    swipe(options) {
        return new Promise((resolve) => {
            this.getDensity((density) => {
                const startPointX = options.startPoint.x * density;
                const startPointY = options.startPoint.y * density;
                const endPointX = options.endPoint.x * density;
                const endPointY = options.endPoint.y * density;
                // 先声明命令字符串再传入 tool.shell 才符合预期，否则 duration 不符合预期
                const command = `input swipe ${startPointX} ${startPointY} ${endPointX} ${endPointY} ${options.duration || 100}`;
                this.tool.shell(this.id, command).then((conn) => {
                    let res = "";
                    let timeoutTimer;
                    conn.on("data", (data) => {
                        res += data.toString();
                        timeoutTimer && clearTimeout(timeoutTimer);
                        timeoutTimer = setTimeout(() => {
                            resolve(res);
                        }, 50);
                    });
                    // 部分命令 conn 无法响应，延迟 resolve 兜底
                    setTimeout(() => {
                        resolve(res);
                    }, 1500);
                });
            });
        });
    }
    keyboardInput(options) {
        return new Promise((resolve) => {
            this.tool
                .shell(this.id, `input text ${options.text}`)
                .then((conn) => {
                let res = "";
                let timeoutTimer;
                conn.on("data", (data) => {
                    res += data.toString();
                    timeoutTimer && clearTimeout(timeoutTimer);
                    timeoutTimer = setTimeout(() => {
                        resolve(res);
                    }, 50);
                });
                // 部分命令 conn 无法响应，延迟 resolve 兜底
                setTimeout(() => {
                    resolve(res);
                }, 1500);
            });
        });
    }
    tap(options) {
        return new Promise((resolve) => {
            this.getDensity((density) => {
                const x = options.x * density;
                const y = options.y * density;
                const command = `input swipe ${x} ${y} ${x} ${y} ${options.duration || 0}`;
                this.tool.shell(this.id, command).then((conn) => {
                    let res = "";
                    let timeoutTimer;
                    conn.on("data", (data) => {
                        res += data.toString();
                        timeoutTimer && clearTimeout(timeoutTimer);
                        timeoutTimer = setTimeout(() => {
                            resolve(res);
                        }, 50);
                    });
                    // 部分命令 conn 无法响应，延迟 resolve 兜底
                    setTimeout(() => {
                        resolve(res);
                    }, 1500);
                });
            });
        });
    }
    exists(file) {
        return this.tool.stat(this.id, file);
    }
    pushFile(from, to) {
        return this.tool.push(this.id, from, to);
    }
    async push(from) {
        if (!process.env.UNI_HBUILDERX_PLUGINS) {
            return super.push(from);
        }
        const pushResourcesPath = path__default["default"].join(process.env.UNI_HBUILDERX_PLUGINS, "launcher", "out", "export", "pushResources.js");
        const adbPath = process.env.HX_CONFIG_ADB_PATH ||
            path__default["default"].join(process.env.UNI_HBUILDERX_PLUGINS, "launcher-tools", "tools", "adbs", "adb");
        const filePaths = [pushResourcesPath, adbPath];
        const filePromises = filePaths.map((filePath) => {
            return fs__default["default"].promises
                .access(filePath, fs__default["default"].constants.F_OK)
                .then(() => `${filePath} exists`)
                .catch(() => `${filePath} not exists`);
        });
        return Promise.all(filePromises)
            .then(() => {
            const { PushResources } = require(pushResourcesPath);
            const pushResources = new PushResources({
                adbPath,
                appid: process.env.UNI_TEST_BASE_APPID || this.appid,
                uuid: this.id,
                packageName: process.env.UNI_TEST_BASE_PACKAGE_NAME || this.package,
                sourcePath: from,
                runTimeLog(options) {
                    var _a, _b, _c;
                    if (Array.isArray(options.contents.hyperlinks)) {
                        options.contents.hyperlinks.forEach((item) => {
                            var _a;
                            if (((_a = item.link) === null || _a === void 0 ? void 0 : _a.indexOf("leaking objects")) > -1) {
                                console.error("\x1b[1;91m%s\x1b[0m", `$MEMORY_LEAK$: ${JSON.stringify(item)} $MEMORY_LEAK$`);
                            }
                        });
                    }
                    if (((_b = (_a = options.contents) === null || _a === void 0 ? void 0 : _a.logStr) === null || _b === void 0 ? void 0 : _b.indexOf("---BEGIN:EXCEPTION---")) > -1) {
                        const errorTagIndex = (_c = options.contents.logStr) === null || _c === void 0 ? void 0 : _c.indexOf("---BEGIN:EXCEPTION---");
                        console.error("\x1b[1;91m%s\x1b[0m", `$RUNTIME_ERROR$: ${options.contents.logStr.substring(errorTagIndex + 21)} $RUNTIME_ERROR$`);
                    }
                },
            });
            pushResources.start();
            this.needStart = false;
            return true;
        })
            .catch(async (err) => {
            console.log("pushResources or adb not exists: ", err);
            return await super.push(from);
        });
    }
    shell(command) {
        debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} SEND ► ${command}`);
        return this.tool
            .shell(this.id, command)
            .then(adb.util.readAll)
            .then((output) => {
            const res = output.toString();
            debugClient$1(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} ◀ RECV ${res}`);
            return res;
        });
    }
    get DIR_WWW() {
        return `/storage/emulated/0/Android/data/${this.package}/apps/${this.appid}/www`;
    }
    get COMMAND_EXTERNAL() {
        return `echo ${$EXTERNAL_STORAGE}`;
    }
    get COMMAND_VERSION() {
        return `dumpsys package ${this.package}`;
    }
    get COMMAND_STOP() {
        return `am force-stop ${this.package}`;
    }
    get COMMAND_START() {
        return `am start -n ${this.package}/${this.activity} --es appid ${this.appid} --ez needUpdateApp false --ez reload true --ez externalStorage true`;
    }
}

const debugClient = debug__default["default"]("automator:simctl");
function padZero(str) {
    const num = parseInt(str);
    return num > 9 ? String(num) : "0" + num;
}
class Harmony extends Launcher {
    constructor() {
        super(...arguments);
        this.bundleVersion = "harmony bundle version";
        this.hdcPath = os__default["default"].platform() === "win32"
            ? `${this.app}/sdk/default/openharmony/toolchains/hdc.exe`
            : `${this.app}/Contents/sdk/default/openharmony/toolchains/hdc`;
        this.compiled = false;
    }
    async init() {
        debugClient(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} init in harmony ${this.id}`);
    }
    async version() {
        return Promise.resolve(this.bundleVersion);
    }
    formatVersion(version) {
        if (!version) {
            return this.bundleVersion;
        }
        const versions = version.split(".");
        if (versions.length !== 3) {
            return version;
        }
        return versions[0] + padZero(versions[1]) + padZero(versions[2]);
    }
    async install() {
        debugClient(`${dateFormat__default["default"]("yyyy-mm-dd HH:MM:ss:l")} install ${this.app}`);
        return Promise.resolve(true);
    }
    async start(from) {
        debugClient("harmony start");
        if (!this.app) {
            return Promise.reject("executablePath is required");
        }
        if (!this.projectPath) {
            return Promise.reject("projectPath is required");
        }
        // 找到 launcher 插件中提供的 HarmonyLauncher 工具类
        const hxRoot = process.env.HX_APP_ROOT || ".";
        const { HarmonyLauncher, run } = require(path__default["default"].join(hxRoot, "plugins/launcher/out/export/HarmonyLauncher"));
        if (process.env.UNI_OUTPUT_DIR && // 经过了编译器处理之后此环境变量非空
            !from && // 配置为每次在测试例之间重新拉起应用时 from 非空
            !this.compiled // 在一次测试过程中再次拉起应用时（一般是在检测到应用闪退后重新拉起）compiled 非空
        ) {
            // 如果 start() 方法被再次调用，一定是因为需要重新拉起应用，此时不再需要重新构建
            this.compiled = true;
            // 经过了编译环节，则鸿蒙重新打包、安装、运行
            await run({
                devToolsPath: this.app,
                projectPath: this.projectPath,
                compilePath: process.env.UNI_OUTPUT_DIR,
                udid: this.id,
                getui_appid: process.env.UNI_getui_appid || "",
                harmony_client_id: process.env.UNI_harmony_client_id || "",
                getui_verify_appid: process.env.UNI_getui_verify_appid || "",
            });
        }
        else {
            // 鸿蒙工程无需重新打包、安装，直接重新运行即可
            const harmonyLauncher = new HarmonyLauncher();
            await harmonyLauncher.init({
                devToolsPath: this.app,
                projectPath: this.projectPath,
                compilePath: "",
                udid: this.id,
                getui_appid: process.env.UNI_getui_appid || "",
                harmony_client_id: process.env.UNI_harmony_client_id || "",
                getui_verify_appid: process.env.UNI_getui_verify_appid || "",
            });
            await harmonyLauncher.runHap();
        }
        return Promise.resolve(true);
    }
    async exit() {
        await this.tool.terminateApp(this.package);
        await this.tool.shutdownDevice();
        return Promise.resolve(true);
    }
    exists(file) {
        return fs__default$1["default"].existsSync(file)
            ? Promise.resolve(true)
            : Promise.reject(Error(`${file} not exists`));
    }
    pushFile(from, to) {
        return Promise.resolve(Promise.resolve());
    }
    adbCommand(_) {
        return new Promise((_, reject) => {
            reject("adbCommand only for App Android!");
        });
    }
    getDensity(reject, eventName, callback) {
        child_process.exec(`"${this.hdcPath}" -t ${this.id} shell hidumper -s DisplayManagerService -a -a`, (error, stdout, stderr) => {
            if (error) {
                reject(`${eventName} fail: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`${eventName} fail: ${stderr}`);
                return;
            }
            const DensityStartPosition = stdout.indexOf("Density:");
            const DensityEndPosition = stdout.indexOf("DensityInCurResolution", DensityStartPosition);
            const densityStr = stdout.slice(DensityStartPosition + 8, DensityEndPosition);
            const density = parseFloat(densityStr);
            callback(density);
        });
    }
    async captureScreenshot(params) {
        return new Promise((resolve, reject) => {
            // 截图
            child_process.exec(`"${this.hdcPath}" -t ${this.id} shell snapshot_display -f /data/local/tmp/screenshot.jpeg`, (error, _, stderr) => {
                if (error) {
                    reject(`captureScreenshot fail: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`captureScreenshot fail: ${stderr}`);
                    return;
                }
                // 转存到本地
                child_process.exec(`"${this.hdcPath}" -t ${this.id} file recv /data/local/tmp/screenshot.jpeg ./screenshot.png`, (error, _, stderr) => {
                    var _a, _b;
                    if (error) {
                        reject(`captureScreenshot fail: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        reject(`captureScreenshot fail: ${stderr}`);
                        return;
                    }
                    // 读取为 Buffer
                    const fileData = fs__default$1["default"].readFileSync("./screenshot.png");
                    // 转为 base64
                    const base64 = fileData.toString("base64");
                    // 删除本地文件
                    fs__default$1["default"].unlinkSync("./screenshot.png");
                    if (((_a = params.area) === null || _a === void 0 ? void 0 : _a.x) !== undefined &&
                        ((_b = params.area) === null || _b === void 0 ? void 0 : _b.y) !== undefined) {
                        const Jimp = require("jimp");
                        Jimp.read(Buffer.from(base64, "base64")).then((img) => {
                            this.getDensity(reject, "captureScreenshot", (density) => {
                                const x = Math.floor(params.area.x * density);
                                const y = Math.floor(params.area.y * density);
                                let width = img.bitmap.width - x;
                                if (params.area.width) {
                                    width = Math.min(width, Math.floor(params.area.width * density));
                                }
                                let height = img.bitmap.height - y;
                                if (params.area.height) {
                                    height = Math.min(height, Math.floor(params.area.height * density));
                                }
                                img
                                    .crop(x, y, width, height)
                                    .getBase64Async(Jimp.MIME_PNG)
                                    .then((data) => {
                                    resolve(data.replace("data:image/png;base64,", ""));
                                })
                                    .catch((err) => {
                                    reject(err);
                                });
                            });
                        });
                    }
                    else {
                        resolve(base64);
                    }
                });
            });
        });
    }
    swipe(options) {
        return new Promise((resolve, reject) => {
            this.getDensity(reject, "swipe", (density) => {
                const maxDistance = Math.max(Math.abs(options.endPoint.x - options.startPoint.x), Math.abs(options.endPoint.y - options.startPoint.y));
                let duration = (maxDistance * density) / (options.duration / 1000);
                if (duration < 200) {
                    duration = 200;
                }
                else if (duration > 40000) {
                    duration = 40000;
                }
                const commandSwipe = `"${this.hdcPath}" -t ${this.id} shell uitest uiInput swipe ${options.startPoint.x * density} ${options.startPoint.y * density} ${options.endPoint.x * density} ${options.endPoint.y * density} ${duration}`;
                child_process.exec(commandSwipe, (error, _, stderr) => {
                    if (error) {
                        reject(`swipe fail: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        reject(`swipe fail: ${stderr}`);
                        return;
                    }
                    resolve(`swipe success`);
                });
            });
        });
    }
    tap(options) {
        return new Promise((resolve, reject) => {
            this.getDensity(reject, "tap", (density) => {
                const commandTap = `"${this.hdcPath}" -t ${this.id} shell uitest uiInput ${options.duration && options.duration >= 350 ? "longClick" : "click"} ${options.x * density} ${options.y * density}`;
                child_process.exec(commandTap, (error, _, stderr) => {
                    if (error) {
                        reject(`tap fail: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        reject(`tap fail: ${stderr}`);
                        return;
                    }
                    resolve(`tap success`);
                });
            });
        });
    }
    keyboardInput(options) {
        return new Promise((resolve, reject) => {
            if (options.x === undefined || options.y === undefined) {
                reject(`keyboardInput fail: harmony keyboardInput x or y is undefined`);
                return;
            }
            this.getDensity(reject, "keyboardInput", (density) => {
                const commandTap = `"${this.hdcPath}" -t ${this.id} shell uitest uiInput inputText ${options.x * density} ${options.y * density} ${options.text}`;
                child_process.exec(commandTap, (error, _, stderr) => {
                    if (error) {
                        reject(`keyboardInput fail: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        reject(`keyboardInput fail: ${stderr}`);
                        return;
                    }
                    resolve(`keyboardInput success`);
                });
            });
        });
    }
    get DIR_WWW() {
        return "";
    }
}

const debugDevtools = debug__default["default"]("automator:devtool");
let launcher;
let install = false;
function createLauncher(platform, options) {
    if (platform === "ios") {
        return new IOS(options);
    }
    if (platform === "harmony") {
        return new Harmony(options);
    }
    return new Android(options);
}
const VERSIONS_RE = {
    android: /android_version=(.*)/,
    ios: /iphone_version=(.*)/,
};
function getVersion(version, platform) {
    if (version.endsWith(".txt")) {
        try {
            const versionStr = fs__default["default"].readFileSync(version).toString();
            const matches = versionStr.match(VERSIONS_RE[platform]);
            if (matches) {
                return matches[1];
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    return version;
}
async function validateDevtools(options, puppet) {
    options.platform = (options.platform || process.env.UNI_OS_NAME).toLocaleLowerCase();
    Object.assign(options, options[options.platform]);
    launcher = createLauncher(options.platform, options);
    await launcher.init(); // check device
    const version = await launcher.version();
    if (!version) {
        install = true;
    }
    else if (options.version) {
        const newVersion = launcher.formatVersion(getVersion(options.version, options.platform));
        debugDevtools(`version: ${version}`);
        debugDevtools(`newVersion: ${newVersion}`);
        if (newVersion !== version) {
            install = true;
        }
    }
    if (install) {
        if (!options.executablePath) {
            throw Error(`app-plus->${options.platform}->executablePath is not provided`);
        }
        if (!fs__default["default"].existsSync(options.executablePath)) {
            throw Error(`${options.executablePath} not exists`);
        }
    }
    return options;
}
async function createDevtools(projectPath, options, puppet) {
    if (install) {
        //install
        await launcher.install();
    }
    if (install || puppet.compiled || (await launcher.shouldPush())) {
        await launcher.push(projectPath);
        // 当 push 文件时，Android 11 需要延迟 start，否则可能启动太快，导致读取内容不正确
        // await sleep(1000);
    }
    await launcher.start();
}
const adapter = {
    "Tool.close": {
        reflect: async () => { },
    },
    "App.start": {
        reflect: async (send, params) => {
            return launcher.start(params);
        },
    },
    "App.exit": {
        reflect: async () => launcher.exit(),
    },
    "App.enableLog": {
        reflect: () => Promise.resolve(),
    },
    // "App.captureScreenshot": {
    //   reflect: async (send, params) => {
    //     const data = await launcher.captureScreenshot(params);
    //     debugDevtools(`App.captureScreenshot ${data.length}`);
    //     return {
    //       data,
    //     };
    //   },
    // },
    "App.captureScreenshotWithDevice": {
        reflect: async (send, params) => {
            const data = await launcher.captureScreenshot(params);
            debugDevtools(`App.captureScreenshot ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.adbCommand": {
        reflect: async (send, params) => {
            const data = await launcher.adbCommand(params);
            debugDevtools(`App.adbCommand ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.swipe": {
        reflect: async (send, params) => {
            const data = await launcher.swipe(params);
            debugDevtools(`App.swipe ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.tap": {
        reflect: async (send, params) => {
            const data = await launcher.tap(params);
            debugDevtools(`App.tap ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.keyboardInput": {
        reflect: async (send, params) => {
            const data = await launcher.keyboardInput(params);
            debugDevtools(`App.keyboardInput ${data.length}`);
            return {
                data,
            };
        },
    },
};
initAdapter(adapter);
const puppet = {
    devtools: {
        name: "App",
        paths: [],
        required: ["manifest.json", "app-service.js"],
        validate: validateDevtools,
        create: createDevtools,
    },
    adapter,
    beforeCompile(automatorDir) {
        if (process.env.UNI_INPUT_DIR &&
            process.env.UNI_AUTOMATOR_APP_WEBVIEW === "true") {
            const manifestJson = jsoncParser.parse(fs$1.readFileSync(path__default["default"].resolve(process.env.UNI_INPUT_DIR, "manifest.json"), "utf8"));
            const baseDir = path__default["default"].resolve(process.env.UNI_INPUT_DIR, "unpackage", ".automator", "app-webview");
            // 修改 input、output
            process.env.UNI_INPUT_DIR = path__default["default"].resolve(baseDir, "src");
            process.env.UNI_OUTPUT_DIR = path__default["default"].resolve(baseDir, "unpackage", "dist", "dev");
            // 拷贝 app-webview 模板
            if (fs$1.existsSync(process.env.UNI_INPUT_DIR)) {
                fs$1.emptyDirSync(process.env.UNI_INPUT_DIR);
            }
            fs$1.copySync(path__default["default"].resolve(automatorDir, "lib", "app-webview", "project"), process.env.UNI_INPUT_DIR);
            // 修改 manifest.json name、appid
            const newManifestJson = jsoncParser.parse(fs$1.readFileSync(path__default["default"].resolve(process.env.UNI_INPUT_DIR, "manifest.json"), "utf8"));
            fs$1.writeFileSync(path__default["default"].resolve(process.env.UNI_INPUT_DIR, "manifest.json"), JSON.stringify(Object.assign(Object.assign({}, newManifestJson), { name: manifestJson.name || "", appid: manifestJson.appid || "" }), null, 2));
        }
        else {
            if (
            // 模拟器
            process.env.UNI_INPUT_DIR &&
                process.env.UNI_OS_NAME === "ios" &&
                launcher.app &&
                launcher.app.endsWith(".app")) {
                // iOS 平台需要处理模拟器uts插件copy
                // 检查是否包含 uts 插件，根据 process.env.UNI_INPUT_DIR 遍历 uni_modules 目录下的插件，是否包含 utssdk 目录，包含，说明是uts插件
                const uniModulesDir = path__default["default"].resolve(process.env.UNI_INPUT_DIR, "uni_modules");
                if (!fs__default["default"].existsSync(uniModulesDir))
                    return;
                const hasUTSModule = fs$1.readdirSync(uniModulesDir).some((dir) => fs$1.existsSync(path__default["default"].resolve(uniModulesDir, dir, "utssdk")));
                if (!hasUTSModule) {
                    return;
                }
                // 如果包含，设置相关环境变量
                process.env.HX_DEPENDENCIES_DIR = path__default["default"].join(process.env.UNI_OUTPUT_DIR, "../../../cache/.automator/uts_standard_simulator");
                process.env.HX_RUN_DEVICE_TYPE = "ios_simulator";
                // 读取模拟器目录/Frameworks/DCloudUTSFoundation.framework/uts-info.json
                if (launcher.app) {
                    process.env.UTS_BASE_INFO = fs__default["default"].readFileSync(path__default["default"].resolve(launcher.app, "Frameworks/DCloudUTSFoundation.framework/uts-info.json"), "utf8");
                }
                if (!process.env.HX_Version && process.env.UNI_HBUILDERX_PLUGINS) {
                    process.env.HX_Version = require(path__default["default"].join(process.env.UNI_HBUILDERX_PLUGINS, "about", "package.json")).version;
                }
                debugDevtools(`HX_DEPENDENCIES_DIR`, process.env.HX_DEPENDENCIES_DIR);
                debugDevtools(`UTS_BASE_INFO`, process.env.UTS_BASE_INFO);
            }
        }
    },
    afterCompile() {
        if (process.env.HX_RUN_DEVICE_TYPE === "ios_simulator" && launcher.app) {
            const resources = path__default["default"].resolve(process.env.HX_DEPENDENCIES_DIR, "Resources");
            const modules = path__default["default"].resolve(process.env.HX_DEPENDENCIES_DIR, "modules");
            const hasResources = fs__default["default"].existsSync(resources);
            const hasModules = fs__default["default"].existsSync(modules);
            //需要把基座 copy 到临时目录
            const temp = getIOSSimulatorTemp(path__default["default"].basename(launcher.app));
            if (!hasResources && !hasModules) {
                return;
            }
            if (fs$1.existsSync(temp)) {
                fs$1.emptyDirSync(temp);
            }
            fs$1.copySync(launcher.app, temp);
            launcher.app = temp;
            if (hasResources) {
                fs$1.copySync(resources, path__default["default"].resolve(launcher.app));
            }
            if (hasModules) {
                const moduleNames = [];
                fs$1.readdirSync(modules).forEach((dir) => {
                    if (dir.endsWith(".framework")) {
                        moduleNames.push(dir);
                        fs$1.copySync(path__default["default"].join(modules, dir), path__default["default"].resolve(launcher.app, "Frameworks", dir));
                    }
                });
                moduleNames.forEach((moduleName) => {
                    const cmd = `'${process.env.UNI_HBUILDERX_PLUGINS}/launcher-tools/tools/uts/optool' 'install' '-c' 'weak' '-p' '@rpath/${moduleName}/${moduleName.replace(".framework", "")}' '-t' '${launcher.app}'`;
                    try {
                        const res = child_process.execSync(cmd);
                        debugDevtools(cmd, res.toString());
                    }
                    catch (e) {
                        console.error(e.message);
                        console.error(e.stdout.toString());
                    }
                });
            }
            if (hasResources || hasModules) {
                const res = child_process.execSync(`codesign -fs "-" "${launcher.app}"`);
                debugDevtools(`codesign success`, res.toString());
            }
        }
    },
};
function getIOSSimulatorTemp(name) {
    return path__default["default"].resolve(process.env.HX_DEPENDENCIES_DIR, ".automator/" + name);
}

module.exports = puppet;
