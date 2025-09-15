'use strict';

var index_js = require('./index.js');

//@ts-ignore
const automator = new index_js.Automator();
let JestNodeEnvironment;
let isHighVersion = false;
try {
    JestNodeEnvironment = require("jest-environment-node");
}
catch (e) {
    JestNodeEnvironment = require(require.resolve("jest-environment-node", {
        paths: [process.cwd()],
    }));
}
if (JestNodeEnvironment) {
    if (JestNodeEnvironment.TestEnvironment) {
        isHighVersion = true;
        JestNodeEnvironment = JestNodeEnvironment.TestEnvironment;
    }
}
class UniAutomatorEnvironment extends JestNodeEnvironment {
    constructor(config, context) {
        var _a, _b;
        super(isHighVersion ? { projectConfig: config } : config, context);
        if (process.env.UNI_AUTOMATOR_CONFIG) {
            this.launchOptions = require(process.env.UNI_AUTOMATOR_CONFIG);
        }
        else {
            this.launchOptions = config.testEnvironmentOptions
                ? config.testEnvironmentOptions
                : config.projectConfig.testEnvironmentOptions;
        }
        if ((_a = this.launchOptions) === null || _a === void 0 ? void 0 : _a.web) {
            Object.assign(this.launchOptions, { h5: this.launchOptions.web });
        }
        if ((_b = this.launchOptions) === null || _b === void 0 ? void 0 : _b.app) {
            Object.assign(this.launchOptions, { "app-plus": this.launchOptions.app });
        }
    }
    async setup() {
        await super.setup();
        const globalThis = global;
        if (!globalThis.__init__) {
            globalThis.__init__ = true;
            // 必须启用runInBand,否则会launch多次
            this.launchOptions.platform =
                this.launchOptions.platform || process.env.UNI_PLATFORM;
            globalThis.program = await automator.launch(this.launchOptions);
            if (this.launchOptions.devtools && this.launchOptions.devtools.remote) {
                await globalThis.program.remote(true);
            }
        }
        else {
            if (!globalThis.program) {
                throw Error(`Program init failed`);
            }
            if (this.launchOptions.platform.startsWith("app") &&
                process.env.UNI_AUTOMATOR_NEED_RESTART_BETWEEN_TEST) {
                // 重置 socketConnected 状态
                global.socketConnected = false;
                // 重启基座
                await globalThis.program.start("jest");
                // 等待 socket 连接后进行下一个测试
                await new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (global.socketConnected) {
                            clearInterval(interval);
                            resolve(true);
                        }
                    }, 500);
                });
            }
        }
        this.global.program = globalThis.program;
        this.global.uni = index_js.initUni(globalThis.program);
    }
    async teardown() {
        await super.teardown();
    }
}

module.exports = UniAutomatorEnvironment;
