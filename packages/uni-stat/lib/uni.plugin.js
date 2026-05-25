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
/**
 * 构建期「统计已开启」提示文案（不依赖 i18n 占位符，避免 HBuilderX 内置文案仍为 `{version}` 时原样输出）。
 */
function formatStatEnabledTip(statType) {
    return `已开启 uni统计${statType === 'public' ? '公有版' : '私有版'}`;
}
var index = () => [
    uniCliShared.defineUniMainJsPlugin((opts) => {
        /**
         * 统计类型（仅用于新编译器）：
         * - public：公有版（uni-stat-public）
         * - private：私有版（uni-cloud-stat）
         *
         * 兼容策略：
         * - 优先读取 manifest.uniStatistics.type（public/private）
         * - type 缺失或非法时，回退旧版 version（2=private，其余=public）
         */
        let statType = 'public';
        let isEnable = false;
        const stats = {
            '@dcloudio/uni-stat': uniCliShared.resolveBuiltIn('@dcloudio/uni-stat/dist/uni-stat.es.js'),
            '@dcloudio/uni-cloud-stat': uniCliShared.resolveBuiltIn('@dcloudio/uni-stat/dist/uni-cloud-stat.es.js'),
            '@dcloudio/uni-stat-public': uniCliShared.resolveBuiltIn('@dcloudio/uni-stat/dist/uni-stat-public.es.js'),
        };
        return {
            name: 'uni:stat',
            enforce: 'pre',
            config(config, env) {
                var _a, _b, _c, _d, _e;
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
                // 注意：勿在此对 mp- + UNI_APP_X 提前 return。
                // 提前 return 会导致后续未执行 getUniStatistics / UNI_STATISTICS_CONFIG，
                // 小程序公有版运行时 manifest（backgroundTimeout / reportInterval 等）全部丢失，仍走默认值；
                // H5 不走 mp- 分支故无此问题。标题 JSON 与统计配置在同一套 define 末尾统一注入。
                // ssr 时不开启
                if (!uniCliShared.isSsr(env.command, config)) {
                    const statConfig = uniCliShared.getUniStatistics(inputDir, platform);
                    // 始终注入完整 manifest.uniStatistics（与 enable 无关）。
                    // enable 仅控制是否自动 import 统计入口；业务手动 import 或 enable:false 调试时，
                    // 运行时仍须能读到 backgroundTimeout / reportInterval 等字段。
                    process.env.UNI_STATISTICS_CONFIG = JSON.stringify(statConfig);
                    process.env.UNI_STAT_DEBUG = statConfig.debug ? 'true' : 'false';
                    isEnable = statConfig.enable === true;
                    if (isEnable) {
                        const uniCloudConfig = statConfig.uniCloud || {};
                        const type = String(statConfig.type || '').trim();
                        if (type === 'public' || type === 'private') {
                            statType = type;
                        }
                        else {
                            const versionNum = Number(statConfig.version);
                            statType = versionNum === 2 ? 'private' : 'public';
                        }
                        process.env.UNI_STAT_UNI_CLOUD = JSON.stringify(uniCloudConfig);
                        // 公有版字段 `an` 兜底：注入 manifest.json#name 到 process.env.UNI_APP_NAME，
                        // 由 `public/adapter/package.ts#getEnvAppName` 读取。任意阶段读 manifest 失败
                        // 都走 try/catch，不阻断构建。
                        try {
                            const manifestForName = uniCliShared.parseManifestJsonOnce(inputDir);
                            if (manifestForName && typeof manifestForName.name === 'string') {
                                process.env.UNI_APP_NAME = manifestForName.name;
                            }
                        }
                        catch (e) {
                            debug__default.default('uni:stat')('parse manifest for UNI_APP_NAME failed', e);
                        }
                        if (process.env.NODE_ENV === 'production') {
                            const manifestJson = uniCliShared.parseManifestJsonOnce(inputDir);
                            if (!manifestJson.appid) {
                                uniStatLog(uniCliShared.M['stat.warn.appid']);
                                isEnable = false;
                            }
                            else {
                                if (!statConfig.type && !statConfig.version) {
                                    uniStatLog(uniCliShared.M['stat.warn.version']);
                                }
                                else {
                                    uniStatLog(formatStatEnabledTip(statType));
                                }
                            }
                        }
                        else {
                            if (!statConfig.type && !statConfig.version) {
                                uniStatLog(uniCliShared.M['stat.warn.version']);
                            }
                            else {
                                uniStatLog(formatStatEnabledTip(statType));
                            }
                        }
                    }
                    debug__default.default('uni:stat')('isEnable', isEnable, 'type', statType);
                }
                process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson);
                return {
                    define: {
                        // 与 UNI_APP_NAME 同理：外层 JSON.stringify 才能得到合法的内联字符串字面量
                        'process.env.UNI_STAT_TITLE_JSON': JSON.stringify((_a = process.env.UNI_STAT_TITLE_JSON) !== null && _a !== void 0 ? _a : '{}'),
                        'process.env.UNI_STAT_UNI_CLOUD': JSON.stringify((_b = process.env.UNI_STAT_UNI_CLOUD) !== null && _b !== void 0 ? _b : '{}'),
                        // 注意：define 的 value 是「替换后的源码字面量」，必须 JSON.stringify 一次，
                        // 否则 'true' / 'false' 字符串会被当成布尔字面量替换进源码，导致
                        // dist 中 `process.env.UNI_STAT_DEBUG === 'true'` 永远等于 false（公有版调试日志失效根因）。
                        'process.env.UNI_STAT_DEBUG': JSON.stringify((_c = process.env.UNI_STAT_DEBUG) !== null && _c !== void 0 ? _c : 'false'),
                        // 与 UNI_STAT_TITLE_JSON 同理：`statConfig` 已是 JSON 字符串，若不经
                        // JSON.stringify 再包一层，esbuild/vite define 会把串内 `"` 当成源码边界，
                        // 运行时替换结果残缺 → JSON.parse 失败 → readManifestStatConfig 静默回退，
                        // manifest 里的 backgroundTimeout / pageInactiveTimeout 等全部丢失（表现为默认 300/1800）。
                        'process.env.UNI_STATISTICS_CONFIG': JSON.stringify((_d = process.env.UNI_STATISTICS_CONFIG) !== null && _d !== void 0 ? _d : '{}'),
                        'process.env.UNI_APP_NAME': JSON.stringify((_e = process.env.UNI_APP_NAME) !== null && _e !== void 0 ? _e : ''),
                    },
                };
            },
            resolveId(id) {
                return stats[id] || null;
            },
            transform(code, id) {
                if (isEnable && opts.filter(id)) {
                    // 新编译器只保留类型分流：
                    //   public  → @dcloudio/uni-stat-public
                    //   private → @dcloudio/uni-cloud-stat
                    //
                    // 兼容旧配置：
                    //   type 缺失时回退 version（2=private，其余=public）
                    const importPath = statType === 'private'
                        ? '@dcloudio/uni-cloud-stat'
                        : '@dcloudio/uni-stat-public';
                    return {
                        code: code + `;import '${importPath}';`,
                        map: null,
                    };
                }
            },
        };
    }),
];

module.exports = index;
