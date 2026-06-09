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

/**
 * 解析当前平台对应的 manifest 平台节点。
 *
 * 与 `uni-cli-shared#getPlatformManifestJson` 行为保持一致：app → app-plus/plus，
 * h5 → web/h5，uni-app x 的 app-android/app-ios/app 走各自分支，其余平台取同名节点。
 *
 * 逻辑内聚在 uni-stat 插件内（仅依赖 `parseManifestJsonOnce`），避免依赖
 * HBuilderX 内置旧版 uni-cli-shared 可能缺失的新导出（如 `getUniStatistics`）。
 *
 * @param manifest 已解析的 manifest.json 对象
 * @param platform 目标平台；缺省读 `process.env.UNI_PLATFORM`
 */
function getPlatformManifest(manifest, platform) {
    const isX = process.env.UNI_APP_X === 'true';
    if (!platform) {
        platform = process.env.UNI_PLATFORM;
    }
    if (isX) {
        if (platform === 'app-android' || platform === 'app-ios') {
            return (manifest === null || manifest === void 0 ? void 0 : manifest[platform]) || (manifest === null || manifest === void 0 ? void 0 : manifest['app']) || {};
        }
        else if (platform === 'app') {
            return ((manifest === null || manifest === void 0 ? void 0 : manifest[process.env.UNI_UTS_PLATFORM]) || (manifest === null || manifest === void 0 ? void 0 : manifest['app']) || {});
        }
    }
    if (platform === 'app') {
        return (manifest === null || manifest === void 0 ? void 0 : manifest['app-plus']) || (manifest === null || manifest === void 0 ? void 0 : manifest['plus']) || {};
    }
    if (platform === 'h5') {
        return (manifest === null || manifest === void 0 ? void 0 : manifest.web) || (manifest === null || manifest === void 0 ? void 0 : manifest.h5) || {};
    }
    return (platform && (manifest === null || manifest === void 0 ? void 0 : manifest[platform])) || {};
}
/**
 * 根据 manifest 判定是否自动开启统计（是否向 main 注入统计运行时）。
 *
 * ## 范围
 *
 * 仅控制 `shouldAutoImportStatRuntime`；**不**影响 `plugin/index.ts` 对
 * `UNI_STATISTICS_CONFIG` 等 define 的注入（配置合并仍走 `getUniStatistics`）。
 *
 * ## enable 判定规则（仅以 `enable` 是否显式存在作为覆盖条件）
 *
 * 子平台存在 `uniStatistics` 但只配置了 `debug` / `reportInterval` 等、未写 `enable` 时，
 * **不视为**子节点覆盖，仍继承根节点 `enable`。
 *
 * 判定顺序：
 *   1. 子平台 `uniStatistics.enable` 已显式配置（`true` / `false`）→ 以子为准；
 *   2. 否则，根 `uniStatistics.enable` 已显式配置 → 继承根；
 *   3. 否则（根/子均无 `enable`，或均无 `uniStatistics` 节点）→ **默认开启**。
 *
 * ## 用例矩阵
 *
 * | 根 enable | 子 uniStatistics | 子 enable | 结果   |
 * |-----------|------------------|-----------|--------|
 * | false     | 有               | true      | 开启   |
 * | true      | 有               | false     | 关闭   |
 * | true      | 无               | —         | 开启   |
 * | false     | 无               | —         | 关闭   |
 * | false     | 有（仅 debug 等）| 未配置    | 关闭   |
 * | 无节点    | 有               | true      | 开启   |
 * | 无节点    | 有               | false     | 关闭   |
 * | 无节点    | 无               | —         | 开启   |
 * | 无节点    | 有（仅非 enable）| 未配置    | 开启   |
 *
 * @param inputDir 工程输入目录
 * @param platform 目标平台；缺省读 `process.env.UNI_PLATFORM`
 */
function isUniStatisticsEnabled(inputDir, platform) {
    var _a;
    const manifest = uniCliShared.parseManifestJsonOnce(inputDir);
    const root = manifest === null || manifest === void 0 ? void 0 : manifest.uniStatistics;
    const platformStat = (_a = getPlatformManifest(manifest, platform)) === null || _a === void 0 ? void 0 : _a.uniStatistics;
    if (platformStat && platformStat.enable !== undefined) {
        return platformStat.enable !== false;
    }
    if (root && root.enable !== undefined) {
        return root.enable !== false;
    }
    return true;
}
/**
 * 当前是否为 uni-app x 编译目标。
 * x 运行时暂无 `onCreateVueApp` / `vue.mixin` 等页面统计注入能力。
 */
function isUniAppXCompile() {
    return process.env.UNI_APP_X === 'true';
}
/**
 * 是否应向 main 入口自动 import 统计运行时。
 * uni-app x 一律跳过自动 import；define 配置注入仍保留，供后续适配或业务手动 import。
 *
 * @param inputDir 工程输入目录
 * @param platform 目标平台；缺省读 `process.env.UNI_PLATFORM`。传入以支持分平台 enable 覆盖。
 */
function shouldAutoImportStatRuntime(inputDir, platform) {
    if (isUniAppXCompile()) {
        return false;
    }
    return isUniStatisticsEnabled(inputDir, platform);
}

/**
 * 解析统计版本类型（公有版 / 私有版）。
 * - 优先 `type`；缺失时回退旧版 `version`（2=private，其余=public）。
 */
function resolveUniStatisticsType(statConfig) {
    var _a;
    const type = String((_a = statConfig === null || statConfig === void 0 ? void 0 : statConfig.type) !== null && _a !== void 0 ? _a : '').trim();
    if (type === 'public' || type === 'private') {
        return type;
    }
    const versionNum = Number(statConfig === null || statConfig === void 0 ? void 0 : statConfig.version);
    return versionNum === 2 ? 'private' : 'public';
}
const uniStatLog = once((text) => {
    console.log();
    console.warn(text);
    console.log();
});
/** 与 `public/config.ts#MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT` 保持一致。 */
const MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT = true;
/** 公有版小程序 GET 上报域名（与 `public/config.ts#IMAGE_REPORT_DEFAULTS.host` 一致）。 */
const STAT_MP_REQUEST_DOMAIN = 'tongji-collector.dcloud.net.cn';
const STAT_MP_DOMAIN_DOC_URL = 'https://uniapp.dcloud.net.cn/uni-stat-public.html';
/**
 * 构建期「统计已开启」提示文案（不依赖 i18n 占位符，避免 HBuilderX 内置文案仍为 `{version}` 时原样输出）。
 * - public：已开启 uni 统计 2.0
 * - private：已开启 uni 统计 2.0（私有版）
 */
function formatStatEnabledTip(statType) {
    return statType === 'private'
        ? '已开启 uni统计 2.0（私有版）'
        : '已开启 uni统计 2.0';
}
/**
 * 构建期小程序 request 合法域名提示（单条合并「已开启」与域名说明）。
 */
function formatMpStatDomainTip() {
    return `已开启 uni统计 2.0，为保障数据正常上报，请在小程序后台配置 request 合法域名：${STAT_MP_REQUEST_DOMAIN}。详情：${STAT_MP_DOMAIN_DOC_URL}`;
}
/**
 * 是否需要在构建期提示配置小程序 request 合法域名。
 * 微信默认 preload 信标不走 uni.request，无需配置；开关关闭时与其它小程序一致。
 */
function shouldShowMpDomainTip(platform, statType) {
    if (statType !== 'public' || !platform.startsWith('mp-')) {
        return false;
    }
    if (platform === 'mp-weixin' && MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT) {
        return false;
    }
    return true;
}
/**
 * 输出构建期「统计已开启」提示：小程序公有版（需配置域名）走合并文案，其余走简短文案。
 */
function logStatEnabledTip(platform, statType) {
    if (shouldShowMpDomainTip(platform, statType)) {
        uniStatLog(formatMpStatDomainTip());
        return;
    }
    uniStatLog(formatStatEnabledTip(statType));
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
                    // enable 开关：仅以子/根 `enable` 是否显式存在为准（子优先 → 继承根 → 默认开启），
                    // 详见 `runtimeEnable.ts#isUniStatisticsEnabled` 用例矩阵。
                    // uni-app x 不支持自动 import（见 shouldAutoImportStatRuntime），但仍注入 define 配置。
                    isEnable = shouldAutoImportStatRuntime(inputDir, platform);
                    statType = resolveUniStatisticsType(statConfig);
                    if (isEnable) {
                        const uniCloudConfig = statConfig.uniCloud || {};
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
                                logStatEnabledTip(platform, statType);
                            }
                        }
                        else {
                            logStatEnabledTip(platform, statType);
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
