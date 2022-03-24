'use strict';

var path = require('path');
var debug = require('debug');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);

const debugPush = debug__default["default"]('uni:push');
var index = () => [
    uniCliShared.defineUniMainJsPlugin((opts) => {
        let isEnable = false;
        let isOffline = false;
        return {
            name: 'uni:push',
            enforce: 'pre',
            config(config, env) {
                if (uniCliShared.isSsr(env.command, config)) {
                    return;
                }
                const inputDir = process.env.UNI_INPUT_DIR;
                const platform = process.env.UNI_PLATFORM;
                isEnable = uniCliShared.isEnableUniPushV2(inputDir, platform);
                if (!isEnable) {
                    return;
                }
                isOffline = platform === 'app' && uniCliShared.isUniPushOffline(inputDir);
                if (isOffline) {
                    return;
                }
                debugPush('deubg', debug__default["default"]);
                return {
                    define: {
                        'process.env.UNI_PUSH_DEBUG': !!debug__default["default"],
                    },
                };
            },
            resolveId(id) {
                if (id === '@dcloudio/uni-push') {
                    return uniCliShared.resolveBuiltIn(path__default["default"].join('@dcloudio/uni-push', isOffline ? 'dist/uni-push.plus.es.js' : 'dist/uni-push.es.js'));
                }
            },
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                if (isEnable) {
                    return {
                        code: code + `;import '@dcloudio/uni-push';`,
                        map: null,
                    };
                }
            },
        };
    }),
];

module.exports = index;
