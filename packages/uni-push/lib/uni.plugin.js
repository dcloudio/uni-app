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
        let configModulePush = false;
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
                configModulePush = uniCliShared.hasPushModule(inputDir);
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
                    let file = 'dist/uni-push.es.js';
                    if (isEnableV1) {
                        file = 'dist/uni-push-v1.plus.es.js';
                    }
                    else if (isOffline) {
                        file = 'dist/uni-push.plus.es.js';
                    }
                    return uniCliShared.resolveBuiltIn(path__default.default.join('@dcloudio/uni-push', file));
                }
            },
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                // 如果启用了v1，但是没有配置module.push，不需要注入
                if (isEnableV1 && !configModulePush) {
                    return;
                }
                // 如果启用了v2+offline，但是没有配置module.push，不需要注入
                if (isEnableV2 && isOffline && !configModulePush) {
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
