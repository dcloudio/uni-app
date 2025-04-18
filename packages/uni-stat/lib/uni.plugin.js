'use strict';

var debug = require('debug');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var debug__default = /*#__PURE__*/_interopDefault(debug);

function once(fn, ctx = null) {
    let res;
    return ((...args) => {
        if (fn) {
            res = fn.apply(ctx, args);
            fn = null;
        }
        return res;
    });
}

const uniStatLog = once((text) => {
    console.log();
    console.warn(text);
    console.log();
});
var index = () => [
    uniCliShared.defineUniMainJsPlugin((opts) => {
        let statVersion = '1';
        let isEnable = false;
        const stats = {
            '@dcloudio/uni-stat': uniCliShared.resolveBuiltIn('@dcloudio/uni-stat/dist/uni-stat.es.js'),
            '@dcloudio/uni-cloud-stat': uniCliShared.resolveBuiltIn('@dcloudio/uni-stat/dist/uni-cloud-stat.es.js'),
        };
        return {
            name: 'uni:stat',
            enforce: 'pre',
            config(config, env) {
                var _a;
                if (!uniCliShared.isNormalCompileTarget()) {
                    // 不需要统计
                    return;
                }
                const inputDir = process.env.UNI_INPUT_DIR;
                const platform = process.env.UNI_PLATFORM;
                const titlesJson = Object.create(null);
                uniCliShared.parsePagesJson(inputDir, platform).pages.forEach((page) => {
                    var _a;
                    const style = page.style || {};
                    const titleText = 
                    // MP
                    style.navigationBarTitleText ||
                        (
                        // H5 || App
                        (_a = style.navigationBar) === null || _a === void 0 ? void 0 : _a.titleText) ||
                        '';
                    if (titleText) {
                        titlesJson[page.path] = titleText;
                    }
                });
                // 小程序 X 模式下，需要将标题信息注入到环境中
                if (process.env.UNI_APP_X === 'true') {
                    if ((_a = process.env.UNI_PLATFORM) === null || _a === void 0 ? void 0 : _a.startsWith('mp-')) {
                        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson);
                        return {
                            define: {
                                'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
                            },
                        };
                    }
                }
                // ssr 时不开启
                if (!uniCliShared.isSsr(env.command, config)) {
                    const statConfig = uniCliShared.getUniStatistics(inputDir, platform);
                    isEnable = statConfig.enable === true;
                    if (isEnable) {
                        const uniCloudConfig = statConfig.uniCloud || {};
                        // 获取manifest.json 统计配置，插入环境变量中
                        process.env.UNI_STATISTICS_CONFIG = JSON.stringify(statConfig);
                        statVersion = Number(statConfig.version) === 2 ? '2' : '1';
                        process.env.UNI_STAT_UNI_CLOUD = JSON.stringify(uniCloudConfig);
                        process.env.UNI_STAT_DEBUG = statConfig.debug ? 'true' : 'false';
                        if (process.env.NODE_ENV === 'production') {
                            const manifestJson = uniCliShared.parseManifestJsonOnce(inputDir);
                            if (!manifestJson.appid) {
                                uniStatLog(uniCliShared.M['stat.warn.appid']);
                                isEnable = false;
                            }
                            else {
                                if (!statConfig.version) {
                                    uniStatLog(uniCliShared.M['stat.warn.version']);
                                }
                                else {
                                    uniStatLog(`已开启 uni统计${statVersion}.0 版本`);
                                }
                            }
                        }
                        else {
                            if (!statConfig.version) {
                                uniStatLog(uniCliShared.M['stat.warn.version']);
                            }
                            else {
                                uniStatLog(uniCliShared.M['stat.warn.tip'].replace('{version}', `${statVersion}.0`));
                            }
                        }
                    }
                    debug__default.default('uni:stat')('isEnable', isEnable);
                }
                process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson);
                return {
                    define: {
                        'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
                        'process.env.UNI_STAT_UNI_CLOUD': process.env.UNI_STAT_UNI_CLOUD,
                        'process.env.UNI_STAT_DEBUG': process.env.UNI_STAT_DEBUG,
                        'process.env.UNI_STATISTICS_CONFIG': process.env.UNI_STATISTICS_CONFIG,
                    },
                };
            },
            resolveId(id) {
                return stats[id] || null;
            },
            transform(code, id) {
                if (isEnable && opts.filter(id)) {
                    return {
                        code: code +
                            `;import '@dcloudio/uni${statVersion === '2' ? '-cloud' : ''}-stat';`,
                        map: null,
                    };
                }
            },
        };
    }),
];

module.exports = index;
