'use strict';

var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

var index = () => [
    uniCliShared.defineUniMainJsPlugin((opts) => {
        let isEnableV1 = false;
        let isEnableV2 = false;
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
                isEnableV1 = uniCliShared.isEnableUniPushV1(inputDir, platform);
                isEnableV2 = uniCliShared.isEnableUniPushV2(inputDir, platform);
                // v1
                if (isEnableV1) {
                    return;
                }
                if (!isEnableV2) {
                    return;
                }
                // v2
                isOffline = platform === 'app' && uniCliShared.isUniPushOffline(inputDir);
                if (isOffline) {
                    return;
                }
                return {
                    define: {
                        'process.env.UNI_PUSH_DEBUG': false,
                    },
                };
            },
            resolveId(id) {
                if (id === '@dcloudio/uni-push') {
                    return uniCliShared.resolveBuiltIn(path__default.default.join('@dcloudio/uni-push', isOffline || isEnableV1
                        ? 'dist/uni-push.plus.es.js'
                        : 'dist/uni-push.es.js'));
                }
            },
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                if (isEnableV1 || isEnableV2) {
                    return {
                        code: `import '@dcloudio/uni-push';` + code,
                        map: null,
                    };
                }
            },
        };
    }),
];

module.exports = index;
