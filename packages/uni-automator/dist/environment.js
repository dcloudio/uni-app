'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var NodeEnvironment = _interopDefault(require('jest-environment-node'));
var Automator = _interopDefault(require('./index.js'));

const automator = new Automator();
class UniAutomatorEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config);
        if (process.env.UNI_AUTOMATOR_CONFIG) {
            this.launchOptions = require(process.env.UNI_AUTOMATOR_CONFIG);
        }
        else {
            this.launchOptions = config.testEnvironmentOptions;
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
        }
        this.global.program = globalThis.program;
    }
    async teardown() {
        await super.teardown();
    }
}

module.exports = UniAutomatorEnvironment;
