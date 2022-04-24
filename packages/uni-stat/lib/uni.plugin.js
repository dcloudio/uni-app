'use strict';

var debug = require('debug');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);

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
                // ssr 时不开启
                if (!uniCliShared.isSsr(env.command, config)) {
                    const statConfig = uniCliShared.getUniStatistics(inputDir, platform);
                    const uniCloudConfig = statConfig.uniCloud || {};
                    statVersion = statConfig.version === '2' ? '2' : '1';
                    isEnable = statConfig.enable === true;
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
                            if (isEnable) {
                                uniStatLog(`已开启 uni统计${statConfig.version}.0 版本`);
                            }
                        }
                    }
                    else {
                        if (isEnable) {
                            uniStatLog(uniCliShared.M['stat.warn.tip'].replace('{version}', '1.0'));
                        }
                    }
                    debug__default["default"]('uni:stat')('isEnable', isEnable);
                }
                process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson);
                return {
                    define: {
                        'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
                        'process.env.UNI_STAT_UNI_CLOUD': process.env.UNI_STAT_UNI_CLOUD || JSON.stringify({}),
                        'process.env.UNI_STAT_DEBUG': process.env.UNI_STAT_DEBUG || 'false',
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
