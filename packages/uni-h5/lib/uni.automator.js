'use strict';

var debug = require('debug');
var parser = require('postcss-selector-parser');
var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);
var parser__default = /*#__PURE__*/_interopDefaultLegacy(parser);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const debugDevtools = debug__default["default"]("automator:devtool");
function transform(selectors) {
    selectors.walk((selector) => {
        if (selector.type === "tag") {
            const value = selector.value;
            if (value === "page") {
                {
                    selector.value = "uni-page-body";
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

/^win/.test(process.platform);
function requireModule(id) {
    try {
        return require(id);
    }
    catch (e) {
        return require(require.resolve(id, { paths: [process.cwd()] }));
    }
}

const browserTypes = ["chromium", "firefox", "webkit"];
let hasPlaywright = false;
try {
    hasPlaywright = !!requireModule("playwright");
}
catch (e) { }
const browserDevtoolsMap = new Map();
function getBrowserDevtools(browser = "chromium") {
    const browserType = browser
        ? browserTypes.includes(browser)
            ? browser
            : browserTypes[0]
        : browserTypes[0];
    let browserDevtools = browserDevtoolsMap.get(browserType);
    if (!browserDevtools) {
        browserDevtools = createBrowserDevtools(browserType);
        browserDevtoolsMap.set(browserType, browserDevtools);
    }
    return browserDevtools;
}
function createBrowserDevtools(browserType) {
    if (browserType === "webkit") {
        return createPlaywright("webkit");
    }
    else if (browserType === "firefox") {
        return createPlaywright("firefox");
    }
    if (hasPlaywright) {
        return createPlaywright("chromium");
    }
    throw new Error("Playwright dependency not found, please install playwright!");
}
function createPlaywright(browserType) {
    const playwright = requireModule("playwright");
    let browser;
    let page;
    return {
        type: browserType,
        provider: "playwright",
        async open(url, options, puppet) {
            browser = await playwright[browserType].launch(options.options);
            if (browserType === "firefox") {
                options.contextOptions.isMobile = false;
            }
            debugDevtools(`browser.newContext ${JSON.stringify(options.contextOptions)}`);
            const context = await browser.newContext(options.contextOptions);
            page = await context.newPage();
            page.on("console", (msg) => {
                puppet.emit("App.logAdded", { type: msg.type(), args: [msg.text()] });
            });
            page.on("pageerror", (err) => {
                puppet.emit("App.exceptionThrown", err);
            });
            await page.goto(options.url || url);
            await page.waitForTimeout(1000);
        },
        close() {
            return browser.close();
        },
        screenshot(fullPage = false) {
            let params = { fullPage };
            if (process.env.UNI_AUTOMATOR_WEB_SCREENSHOT_NO_NAVIGATION_BAR === "true") {
                // 截图产物移除导航栏
                params = {
                    fullPage,
                    clip: {
                        x: 0,
                        y: 44,
                        width: Number.MAX_VALUE,
                        height: Number.MAX_VALUE,
                    },
                };
            }
            return page.screenshot(params).then((res) => res.toString("base64"));
        },
        swipe(options) {
            return new Promise(async (resolve) => {
                // mouse.wheel Mouse wheel is not supported in mobile WebKit
                // page.mouse.move can't scroll
                const { startPoint, endPoint } = options;
                await page.evaluate(([startPoint, endPoint]) => {
                    window.scrollBy({
                        left: startPoint.x - endPoint.x,
                        top: startPoint.y - endPoint.y,
                        behavior: "smooth",
                    });
                }, [startPoint, endPoint]);
                resolve(`swipe success`);
            });
        },
        tap(options) {
            return new Promise(async (resolve) => {
                const { x, y, duration } = options;
                await page.mouse.move(x, y);
                await page.mouse.down();
                await page.waitForTimeout(duration || 0);
                await page.mouse.up();
                resolve(`tap success`);
            });
        },
        keyboardInput(options) {
            return new Promise(async (resolve) => {
                await page.keyboard.type(options.text);
                resolve(`keyboardInput success`);
            });
        },
    };
}

async function validateDevtools(options) {
    var _a;
    options.options = options.options || {};
    if (options.executablePath && !options.options.executablePath) {
        options.options.executablePath = options.executablePath;
    }
    // playwright
    options.contextOptions = {
        viewport: Object.assign({ width: 375, height: 667 }, (options.options.defaultViewport || {})),
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: ((_a = options.options.defaultViewport) === null || _a === void 0 ? void 0 : _a.deviceScaleFactor) || 2,
    };
    options.options.defaultViewport = Object.assign({ width: 375, height: 667, deviceScaleFactor: 2, hasTouch: true, isMobile: true }, (options.options.defaultViewport || {}));
    if (!options.teardown) {
        options.teardown =
            options.options.headless === false ? "disconnect" : "close";
    }
    return options;
}
let browserDevtools;
async function createDevtools(url, options, puppet) {
    if (options.executablePath) {
        await new Promise((resolve, reject) => {
            const { exec } = require("node:child_process");
            if (/^win/.test(process.platform)) {
                const chromeTemporaryDataDir = "C:\\Users\\Public\\AppData\\Local\\chrome";
                if (!fs__default["default"].existsSync(chromeTemporaryDataDir)) {
                    fs__default["default"].mkdirSync(chromeTemporaryDataDir, { recursive: true });
                }
                exec(`start ${options.executablePath} --user-data-dir=${chromeTemporaryDataDir} ${url}`, (error) => {
                    if (error) {
                        console.error(`open ${options.executablePath} fail, ${error}`);
                        throw Error(error);
                    }
                });
                // window 浏览器启动后不会触发回调(只有错误弹框关闭或者浏览器关闭才会触发)，默认 1s 后 resolve
                setTimeout(() => {
                    resolve(null);
                }, 1000);
            }
            else {
                exec(`open -a "${options.executablePath}" ${url}`, (error) => {
                    if (error) {
                        console.error(`open ${options.executablePath} fail, ${error}`);
                        reject(error);
                    }
                    resolve(null);
                });
            }
        });
    }
    else {
        browserDevtools = getBrowserDevtools(process.env.BROWSER);
        debugDevtools(`createDevtools ${browserDevtools.provider +
            " " +
            browserDevtools.type +
            " " +
            JSON.stringify(options)}`);
        await browserDevtools.open(url, options, puppet);
    }
}
const adapter = {
    "Tool.close": {
        reflect: async () => {
            await browserDevtools.close();
        },
    },
    "App.start": {
        reflect: async () => { },
    },
    "App.exit": {
        reflect: async () => { },
    },
    "App.enableLog": {
        reflect: () => Promise.resolve(),
    },
    "App.captureScreenshot": {
        reflect: async (send, params) => {
            const data = await browserDevtools.screenshot(!!params.fullPage);
            debugDevtools(`App.captureScreenshot ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.swipe": {
        reflect: async (send, params) => {
            const data = await browserDevtools.swipe(params);
            debugDevtools(`App.swipe ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.tap": {
        reflect: async (send, params) => {
            const data = await browserDevtools.tap(params);
            debugDevtools(`App.tap ${data.length}`);
            return {
                data,
            };
        },
    },
    "App.keyboardInput": {
        reflect: async (send, params) => {
            const data = await browserDevtools.keyboardInput(params);
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
        name: "browser",
        paths: [],
        validate: validateDevtools,
        create: createDevtools,
    },
    shouldCompile(options, devtoolsOptions) {
        if (devtoolsOptions.url) {
            return false;
        }
        return true;
    },
    adapter,
};

module.exports = puppet;
