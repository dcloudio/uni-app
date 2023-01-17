'use strict';

var fs = require('fs');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);

// eslint-disable-next-line no-restricted-globals
const { initDevtoolsServer } = require('../lib/front/server.js');
let copied = false;
let initializedServer = false;
const uniVueDevtoolsPlugin = () => {
    return {
        name: 'uni:vue-devtools',
        config() {
            return new Promise(async (resolve) => {
                let __VUE_DEVTOOLS_HOSTS__ = '';
                let __VUE_DEVTOOLS_PORT__ = 8098;
                let __VUE_DEVTOOLS_TEST_PORT__;
                if (process.env.__VUE_PROD_DEVTOOLS__ && !initializedServer) {
                    initializedServer = true;
                    const { socketHosts, socketPort, testConnectionPort } = await initDevtoolsServer();
                    __VUE_DEVTOOLS_HOSTS__ = socketHosts;
                    __VUE_DEVTOOLS_PORT__ = socketPort;
                    __VUE_DEVTOOLS_TEST_PORT__ = testConnectionPort;
                }
                resolve({
                    define: {
                        __VUE_PROD_DEVTOOLS__: process.env.__VUE_PROD_DEVTOOLS__ === 'true',
                        __VUE_DEVTOOLS_HOST__: JSON.stringify(process.env.__VUE_DEVTOOLS_HOST__ || 'localhost'),
                        __VUE_DEVTOOLS_HOSTS__: JSON.stringify(__VUE_DEVTOOLS_HOSTS__),
                        __VUE_DEVTOOLS_PORT__: JSON.stringify(__VUE_DEVTOOLS_PORT__),
                        __VUE_DEVTOOLS_TEST_PORT__: JSON.stringify(__VUE_DEVTOOLS_TEST_PORT__),
                    },
                });
            });
        },
        generateBundle() {
            if (copied || process.env.__VUE_PROD_DEVTOOLS__ !== 'true') {
                return;
            }
            copied = true;
            const vueDevtoolsDir = path__default.default.resolve(process.env.UNI_OUTPUT_DIR, 'vue-devtools');
            if (!fs__default.default.existsSync(vueDevtoolsDir)) {
                fs__default.default.mkdirSync(vueDevtoolsDir, { recursive: true });
            }
            fs__default.default.copyFileSync(path__default.default.resolve(__dirname, '../lib/mp/backend.js'), path__default.default.resolve(vueDevtoolsDir, 'backend.js'));
            fs__default.default.copyFileSync(path__default.default.resolve(__dirname, '../lib/mp/hook.js'), path__default.default.resolve(vueDevtoolsDir, 'hook.js'));
        },
    };
};
var index = () => {
    return [
        uniVueDevtoolsPlugin(),
        uniCliShared.defineUniMainJsPlugin((opts) => {
            const devtoolsPath = uniCliShared.normalizePath(path__default.default.resolve(__dirname, '..'));
            let devtoolsCode = `;import '${devtoolsPath}';`;
            if (uniCliShared.isMiniProgramPlatform()) {
                devtoolsCode += `require('./vue-devtools/hook.js');require('./vue-devtools/backend.js');`;
            }
            else {
                const dir = process.env.UNI_PLATFORM === 'app' ? 'app' : 'web';
                devtoolsCode += `import '${devtoolsPath}/lib/${dir}/hook.js';import '${devtoolsPath}/lib/${dir}/backend.js';`;
            }
            return {
                name: 'uni:vue-devtools-main-js',
                enforce: 'post',
                transform(code, id) {
                    if (process.env.__VUE_PROD_DEVTOOLS__ !== 'true') {
                        return;
                    }
                    if (!opts.filter(id)) {
                        return;
                    }
                    return {
                        code: devtoolsCode + code,
                        map: null,
                    };
                },
            };
        }),
    ];
};

module.exports = index;
