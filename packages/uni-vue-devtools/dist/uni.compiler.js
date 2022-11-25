'use strict';

var fs = require('fs');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

// eslint-disable-next-line no-restricted-globals
const { initDevtoolsServer } = require('../lib/front/server.js');
const uniVueDevtoolsPlugin = () => {
    let copied = false;
    return {
        name: 'uni:vue-devtools',
        config() {
            return new Promise(async (resolve) => {
                let __VUE_DEVTOOLS_HOST__ = 'localhost';
                let __VUE_DEVTOOLS_PORT__ = 8098;
                if (process.env.__VUE_PROD_DEVTOOLS__) {
                    const { socketHost, socketPort } = await initDevtoolsServer();
                    __VUE_DEVTOOLS_HOST__ = socketHost;
                    __VUE_DEVTOOLS_PORT__ = socketPort;
                }
                resolve({
                    define: {
                        __VUE_PROD_DEVTOOLS__: process.env.__VUE_PROD_DEVTOOLS__ === 'true',
                        __VUE_DEVTOOLS_HOST__: JSON.stringify(`${__VUE_DEVTOOLS_HOST__}`),
                        __VUE_DEVTOOLS_PORT__: JSON.stringify(`${__VUE_DEVTOOLS_PORT__}`),
                    },
                });
            });
        },
        generateBundle() {
            // 仅处理小程序
            if (!uniCliShared.isMiniProgramPlatform()) {
                return;
            }
            if (copied || process.env.__VUE_PROD_DEVTOOLS__ !== 'true') {
                return;
            }
            copied = true;
            const vueDevtoolsDir = path__default["default"].resolve(process.env.UNI_OUTPUT_DIR, 'vue-devtools');
            if (!fs__default["default"].existsSync(vueDevtoolsDir)) {
                fs__default["default"].mkdirSync(vueDevtoolsDir, { recursive: true });
            }
            fs__default["default"].copyFileSync(path__default["default"].resolve(__dirname, '../lib/mp/backend.js'), path__default["default"].resolve(vueDevtoolsDir, 'backend.js'));
            fs__default["default"].copyFileSync(path__default["default"].resolve(__dirname, '../lib/mp/hook.js'), path__default["default"].resolve(vueDevtoolsDir, 'hook.js'));
        },
    };
};
var index = () => {
    return [
        uniVueDevtoolsPlugin(),
        uniCliShared.defineUniMainJsPlugin((opts) => {
            let devtoolsCode = `;import '@dcloudio/uni-vue-devtools';`;
            if (uniCliShared.isMiniProgramPlatform()) {
                devtoolsCode += `require('./vue-devtools/hook.js');require('./vue-devtools/backend.js');`;
            }
            else {
                const dir = process.env.UNI_PLATFORM === 'app' ? 'app' : 'web';
                devtoolsCode += `import '@dcloudio/uni-vue-devtools/lib/${dir}/hook.js';import '@dcloudio/uni-vue-devtools/lib/${dir}/backend.js';`;
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
