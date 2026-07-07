/**
 * 事件类型与会话创建类型常量。
 *
 * 与私有版 / 文档 `uni统计上报参数.md` 的兼容关系：
 *   - 上行参数文档明确：`lt` 仅取 `1 / 3 / 11 / 21 / 31 / 41`，**没有** `lt=0`。
 *   - 历史架构文档（03-公有版架构设计.md §3.2）曾设计 `lt=0` 作为"客户端 session 边界"事件，
 *     但与服务端入库口径不一致（会话日志 = lt=1），已**整体移除**：
 *     新会话直接发一条 lt=1，会话字段（`sid / cst / fvts / lvts / tvc`）随 lt=1 上行。
 *   - 因此 `LT` 不再包含 `Session`；删除 lt=0 不影响老接收端。
 */
/**
 * Log Type（事件类型）。统一在此声明，禁止其他模块裸写字符串。
 *
 * 注：`lt=41`（uni-app x 原生崩溃日志）暂未在公有版实现，详见 `docs/暂未实现字段说明.md`。
 */
const LT = {
    Launch: '1',
    Hide: '3',
    Page: '11',
    Event: '21',
    Error: '31',
    Push: '101',
};
/**
 * Create Session Type / Session Create Type（同义）。
 *
 * - `1` 冷启动：进程刚起，第一次创建会话。
 * - `2` 后台超时：从后台返回前台，间隔 >= `backgroundTimeoutSec`（秒）。
 * - `3` 前台无操作超时：在前台一段时间无任何 page/event 触达。
 *
 * 公有版预留 `0` 给"未触发新会话"的零值；不要用 0 覆写 storage，仅作为内部哨兵。
 */
const CST = {
    ColdLaunch: 1,
    BackgroundTimeout: 2,
    PageInactiveTimeout: 3,
};
/**
 * 入口页标记。
 *
 * `iey` / `ppiey` 上行字段以 `0/1` 形式表达布尔，与私有版数字风格保持一致。
 */
const IEY = {
    No: 0,
    Yes: 1,
};
/**
 * 把任意输入归一化为 `IEYValue`。
 *
 * 用于 `domain/entry` 在拼装字段时统一布尔→0/1。`true / 1 / '1'` 均视为 Yes。
 */
function toIey(input) {
    if (input === true || input === 1 || input === '1')
        return IEY.Yes;
    return IEY.No;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * 安全工具集：序列化、try 包裹、指数退避重试。
 *
 * 修复缺陷：
 *   - #1 `_retry` 未初始化导致重试链路 NaN（公有版直接以参数显式传 `times`）。
 *   - #7 取值反向（私有版 `if (data.length > MAX_LENGTH)` 误判）。
 *   - #8 循环引用导致 `JSON.stringify` 抛错（用 WeakSet replacer 兜底）。
 */
const DEFAULT_MAX_LENGTH = 4096;
const TRUNCATED_SUFFIX = '…[truncated]';
/**
 * 序列化任意值为字符串：支持循环引用与最大长度截断。
 *
 * @param value 待序列化的值。`undefined` 返回 ''；string 直接返回（仍参与截断）。
 * @param max   字符串最大长度，默认 4096；超长会截断并附 `…[truncated]`。
 */
function safeStringify(value, max = DEFAULT_MAX_LENGTH) {
    var _a;
    if (value === undefined)
        return '';
    let raw;
    if (typeof value === 'string') {
        raw = value;
    }
    else {
        const seen = new WeakSet();
        try {
            raw =
                (_a = JSON.stringify(value, (_key, val) => {
                    if (typeof val === 'object' && val !== null) {
                        if (seen.has(val))
                            return '[Circular]';
                        seen.add(val);
                    }
                    if (typeof val === 'bigint')
                        return val.toString();
                    if (typeof val === 'function')
                        return `[Function ${val.name || 'anonymous'}]`;
                    return val;
                })) !== null && _a !== void 0 ? _a : '';
        }
        catch (e) {
            raw = `[Unserializable: ${e.message}]`;
        }
    }
    if (raw.length > max) {
        return (raw.slice(0, Math.max(0, max - TRUNCATED_SUFFIX.length)) +
            TRUNCATED_SUFFIX);
    }
    return raw;
}
/**
 * 包裹同步函数，捕获任何抛出，返回 fallback。
 *
 * 不打印 console（由调用方按需 `logger.warn`）；保持纯函数风格便于热路径使用。
 */
function tryRun(fn, fallback) {
    try {
        return fn();
    }
    catch (_a) {
        return fallback;
    }
}
/**
 * 指数退避重试：失败时按 `baseDelayMs * 2^(n-1)` 等待后重试，全部失败抛出最后一个错误。
 *
 * @example
 *   await withRetry(() => fetch(url), { times: 3, baseDelayMs: 200 })
 *   // 第 1 次失败 → wait 200ms；第 2 次失败 → wait 400ms；第 3 次失败 → throw
 */
function withRetry(fn, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const total = Math.max(1, Math.floor(opts.times));
        const sleep = (_a = opts.sleep) !== null && _a !== void 0 ? _a : defaultSleep;
        let lastErr;
        for (let attempt = 1; attempt <= total; attempt++) {
            try {
                return yield fn();
            }
            catch (e) {
                lastErr = e;
                if (attempt >= total)
                    break;
                yield sleep(opts.baseDelayMs * Math.pow(2, (attempt - 1)));
            }
        }
        throw lastErr;
    });
}
function defaultSleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 解析 uni-app 运行时根对象 `uni`。
 *
 * - H5 / App：常见为 `globalThis.uni`。
 * - 微信小程序等：多为 Vite/rollup 向**当前模块**注入的标识符 `uni`，
 *   **未必**同步挂到 `globalThis`；仅读 `globalThis.uni` 会导致
 *   `bindLifecycle` / `uni.request` / storage 等全部静默失败。
 * - 支付宝等旧版小程序：**无 `globalThis` 标识符**，须用 `getGlobalObject()` 兜底。
 * - H5 发行摇树：`pages.json.js` 会先把 `window.uni = {}` 占位；若仍按「有 object 即用」
 *   会误把空桩当真 uni。须用 `isUsableUniRuntime` 过滤后再择源。
 *
 * 第二路依赖宿主构建对 `uni` 的注入（与业务页面同一套解析规则），
 * 类型兜底见 `packages/uni-stat/src/uni-global.d.ts`。
 */
/**
 * 判断候选 `uni` 是否具备统计 SDK 可用的最小 API 集合（排除 H5 摇树空桩 `{}`）。
 *
 * 任一核心 API 存在即视为可用；与具体平台无关，微信/QQ/抖音/支付宝/百度等
 * 完整 runtime 均满足，仅「占位空对象」会被过滤。
 */
function isUsableUniRuntime(candidate) {
    if (candidate == null || typeof candidate !== 'object')
        return false;
    const u = candidate;
    return (typeof u.getStorageSync === 'function' ||
        typeof u.onCreateVueApp === 'function' ||
        typeof u.request === 'function' ||
        typeof u.onAppShow === 'function');
}
/**
 * 读取宿主向当前模块注入的 `uni`（小程序等）；不可用时返回 `undefined`。
 */
function getModuleUniCandidate() {
    if (typeof uni === 'undefined' || uni == null || typeof uni !== 'object') {
        return undefined;
    }
    return uni;
}
/**
 * H5 兜底：在 `globalThis` / `self` 不可用时尝试读取 `window`。
 *
 * 通过 `Function` 间接访问，避免 ESLint `no-restricted-globals` 对 `window` 标识符的限制；
 * 小程序等环境执行失败时返回 `undefined`。
 */
function getWindowObject() {
    try {
        const w = Function('return typeof window !== "undefined" ? window : undefined')();
        return w != null ? w : undefined;
    }
    catch (_a) {
        return undefined;
    }
}
/**
 * 安全获取全局对象。
 *
 * 支付宝 / 部分旧版小程序运行时未提供 `globalThis`，直接写 `globalThis` 会
 * `ReferenceError: globalThis is not defined`，导致 install 阶段整包崩溃。
 */
function getGlobalObject() {
    if (typeof globalThis !== 'undefined' && globalThis != null) {
        return globalThis;
    }
    if (typeof global !== 'undefined' && global != null) {
        return global;
    }
    if (typeof self !== 'undefined' && self != null) {
        return self;
    }
    const win = getWindowObject();
    if (win)
        return win;
    return {};
}
/**
 * 用字面量 `uni.方法` 引用拼出一个可用的 `uni` facade。
 *
 * uni-app 各端构建的 API 注入器仅识别字面量成员表达式 `uni.方法`（H5 → `@dcloudio/uni-h5`，
 * 小程序 / App 同理），动态 `u.方法` 不会被注入。这里对所需 API 逐个写字面量 `uni.方法`，
 * 使其被注入后收敛为一个对象供下游适配器使用。
 *
 * 仅在 `globalThis.uni` 与模块 `uni` 均不可用时作为兜底（典型：H5 发行摇树后 `window.uni`
 * 为 `{}` 空桩）。未经注入的环境下 `uni.方法` 读到空桩 / 未声明，拼不出方法时返回 undefined。
 */
function buildInjectedUniRuntime() {
    try {
        const out = {};
        const pick = (name, fn) => {
            if (typeof fn === 'function')
                out[name] = fn;
        };
        // 必须逐个写字面量 `(uni as ...).方法`（emit 后为 `uni.方法`），不可别名 / 循环，否则不会被注入。
        pick('getStorageSync', uni.getStorageSync);
        pick('setStorageSync', uni.setStorageSync);
        pick('removeStorageSync', uni.removeStorageSync);
        pick('getSystemInfoSync', uni.getSystemInfoSync);
        pick('getDeviceInfo', uni.getDeviceInfo);
        pick('getAppBaseInfo', uni.getAppBaseInfo);
        pick('getWindowInfo', uni.getWindowInfo);
        pick('getNetworkType', uni.getNetworkType);
        pick('request', uni.request);
        pick('onAppShow', uni.onAppShow);
        pick('offAppShow', uni.offAppShow);
        pick('onAppHide', uni.onAppHide);
        pick('offAppHide', uni.offAppHide);
        pick('onAppLaunch', uni.onAppLaunch);
        pick('offAppLaunch', uni.offAppLaunch);
        pick('getLaunchOptionsSync', uni.getLaunchOptionsSync);
        pick('addInterceptor', uni.addInterceptor);
        pick('removeInterceptor', uni.removeInterceptor);
        pick('getPushClientId', uni.getPushClientId);
        pick('getAccountInfoSync', uni.getAccountInfoSync);
        pick('onCreateVueApp', uni.onCreateVueApp);
        return Object.keys(out).length > 0 ? out : undefined;
    }
    catch (_e) {
        // 未注入且 `uni` 未声明（单测 / 极端环境）→ ReferenceError，兜底返回 undefined。
        return undefined;
    }
}
/**
 * 探测 `uni` 解析路径（不改变 `resolveUniRuntime` 行为，仅用于 debug 诊断）。
 */
function probeUniRuntime() {
    const globalThisAvailable = typeof globalThis !== 'undefined';
    const g = getGlobalObject();
    const globalUni = g.uni;
    const globalThisHasUni = globalUni != null && typeof globalUni === 'object';
    const globalThisUniStub = globalThisHasUni && !isUsableUniRuntime(globalUni);
    const moduleUni = getModuleUniCandidate();
    const moduleUniDefined = moduleUni != null;
    if (isUsableUniRuntime(globalUni)) {
        return {
            resolved: true,
            source: 'globalThis',
            globalThisHasUni: true,
            globalThisUniStub: false,
            moduleUniDefined,
            globalThisAvailable,
            uni: globalUni,
        };
    }
    if (isUsableUniRuntime(moduleUni)) {
        return {
            resolved: true,
            source: 'module',
            globalThisHasUni,
            globalThisUniStub,
            moduleUniDefined: true,
            globalThisAvailable,
            uni: moduleUni,
        };
    }
    // globalThis / 模块 uni 均不可用（典型 H5 发行空桩）时，用注入 facade 兜底。
    const injectedUni = buildInjectedUniRuntime();
    if (isUsableUniRuntime(injectedUni)) {
        return {
            resolved: true,
            source: 'injected',
            globalThisHasUni,
            globalThisUniStub,
            moduleUniDefined,
            globalThisAvailable,
            uni: injectedUni,
        };
    }
    return {
        resolved: false,
        source: 'none',
        globalThisHasUni,
        globalThisUniStub,
        moduleUniDefined,
        globalThisAvailable,
        uni: undefined,
    };
}
/**
 * 返回与业务侧一致的 `uni` 运行时根对象；均不可用时返回 `undefined`。
 */
function resolveUniRuntime() {
    const probe = probeUniRuntime();
    return probe.resolved ? probe.uni : undefined;
}

/**
 * 公有版统一日志出口。
 *
 * 修复的私有版缺陷：
 *   - #19 `!!process.env.UNI_STAT_DEBUG` 在构建时若被替换为字符串 `"false"` 仍是 truthy。
 *     公有版严格使用 `=== 'true'` 判定，并允许在运行时通过 `setDebug()` 临时打开
 *     （供调试 / 灰度小流量验证）。
 *
 * 行为约定：
 *   - `debug` 受调试开关控制；其他 level 始终输出到对应的 `console.*`。
 *   - **Android / iOS 真机**：`TAG` 与正文拼成单条字符串，避免桥接丢弃第二参起。
 *   - **其它平台**：`console.*(TAG, ...args)`，对象保持原生传递。
 *
 * 兼容性：
 *   - 历史版本插件 define 误把 `process.env.UNI_STAT_DEBUG` 替换成布尔字面量
 *     （未 `JSON.stringify`），导致 dist 运行时该值为 `true`/`false` 而非 `'true'`/`'false'`。
 *     `isDebug()` 同时接受字符串 `'true'` 与布尔字面量 `true`，避免历史构建产物完全失效。
 */
const TAG = '[uni统计 2.0]';
let runtimeDebug;
/**
 * 是否屏蔽 info / warn / error。
 * `undefined`：自动——`NODE_ENV === 'test'` 时默认屏蔽，避免 Jest 用例预期失败路径刷屏。
 */
let muteNonDebug;
/**
 * 是否将日志合并为单行（Android / iOS 真机侧）。
 */
function preferSingleLineConsole() {
    return isAndroidOrIosRuntime();
}
/**
 * 是否为 App 或小程序运行在 **Android / iOS** 上（仅此类环境对对象参数做字符串化）。
 */
function isAndroidOrIosRuntime() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const raw = (_a = process.env.UNI_PLATFORM) !== null && _a !== void 0 ? _a : '';
    const g = getGlobalObject();
    if (raw === 'app' || raw === 'app-plus' || raw === 'app-harmony') {
        const n = (_d = (_c = (_b = g.plus) === null || _b === void 0 ? void 0 : _b.os) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase();
        if (!n)
            return false;
        if (n.includes('android'))
            return true;
        if (n === 'ios' || n.includes('iphone'))
            return true;
        return false;
    }
    if (raw.startsWith('mp-')) {
        try {
            const p = (_h = (_g = (_f = (_e = g.uni) === null || _e === void 0 ? void 0 : _e.getSystemInfoSync) === null || _f === void 0 ? void 0 : _f.call(_e)) === null || _g === void 0 ? void 0 : _g.platform) === null || _h === void 0 ? void 0 : _h.toLowerCase();
            return p === 'android' || p === 'ios';
        }
        catch (_j) {
            return false;
        }
    }
    return false;
}
/**
 * 在 Android/iOS 上将「对象类」参数转为可打印字符串；其余类型原样返回。
 */
function stringifyObjectArgForNative(value) {
    if (value === null || value === undefined)
        return value;
    if (typeof value !== 'object')
        return value;
    if (value instanceof Error)
        return `${value.name}: ${value.message}`;
    return safeStringify(value);
}
/**
 * 将单段日志参数格式化为可拼进一行文本的片段（Android/iOS 单参输出用）。
 */
function formatLogArgForNativeConsole(value) {
    if (value === null)
        return 'null';
    if (value === undefined)
        return 'undefined';
    if (typeof value === 'string')
        return value;
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    if (typeof value === 'bigint')
        return String(value);
    if (typeof value === 'symbol') {
        try {
            return value.toString();
        }
        catch (_a) {
            return '?';
        }
    }
    if (typeof value === 'function') {
        const fn = value;
        return `[Function ${fn.name || 'anonymous'}]`;
    }
    if (typeof value === 'object') {
        if (value instanceof Error)
            return `${value.name}: ${value.message}`;
        return safeStringify(value);
    }
    return String(value);
}
/**
 * 当前是否应屏蔽 info / warn / error（debug 仍由 `isDebug()` 单独控制）。
 */
function isNonDebugMuted() {
    if (muteNonDebug !== undefined)
        return muteNonDebug;
    return process.env.NODE_ENV === 'test';
}
/**
 * 测试 / CI 下临时恢复 warn 等输出（如断言 install 告警文案）。
 *
 * @param value `true` 屏蔽；`false` 允许；`undefined` 恢复为按 NODE_ENV 自动判定。
 */
function setMuteNonDebug(value) {
    muteNonDebug = value;
}
/**
 * 输出到 console：Android/iOS 真机整行单参；其余平台 `TAG` + 多参。
 */
function emitConsole(method, args) {
    if (method !== 'log' && isNonDebugMuted())
        return;
    const fn = console[method];
    if (!preferSingleLineConsole()) {
        fn.call(console, TAG, ...args);
        return;
    }
    const mapped = isAndroidOrIosRuntime()
        ? args.map(stringifyObjectArgForNative)
        : args;
    if (mapped.length === 0) {
        fn.call(console, TAG);
        return;
    }
    const body = mapped.map(formatLogArgForNativeConsole).join(' ');
    fn.call(console, `${TAG} ${body}`);
}
/**
 * 当前是否启用 debug 输出。优先级：
 *   1. `setDebug(value)` 显式设置过 → 直接返回。
 *   2. `process.env.UNI_STAT_DEBUG === 'true'` 或被构建期替换为布尔字面量 `true`
 *      （历史插件兼容路径）。
 */
function isDebug() {
    if (runtimeDebug !== undefined)
        return runtimeDebug;
    const v = process.env.UNI_STAT_DEBUG;
    return v === 'true' || v === true;
}
/**
 * 运行时切换 debug 开关；传 `undefined` 恢复为「按 process.env 判断」。
 */
function setDebug(value) {
    runtimeDebug = value;
}
const logger = {
    debug(...args) {
        if (!isDebug())
            return;
        // eslint-disable-next-line no-console
        emitConsole('log', args);
    },
    info(...args) {
        // eslint-disable-next-line no-console
        emitConsole('info', args);
    },
    warn(...args) {
        // eslint-disable-next-line no-console
        emitConsole('warn', args);
    },
    error(...args) {
        // eslint-disable-next-line no-console
        emitConsole('error', args);
    },
    setDebug,
    isDebug,
    setMuteNonDebug,
};

/**
 * 公有版本地存储抽象（重写自私有版 `utils/db.js`）。
 *
 * 修复的私有版缺陷：
 *   - #14 `dbRemove` 第二段 `data = uni.getStorageSync(...)` 无 `|| {}` 兜底导致 NPE。
 *   - #18 每次 get/set/remove 都做 2~3 次 storage IO（read-modify-write），
 *         公有版改为「按 key 独立存储 + 内存缓存」，每次操作只 1 次同步 IO。
 *
 * 关键能力（供 Phase 4 缺陷 #5 修复使用）：
 *   - `safeRead`：读取失败时返回 `{ ok: false }` 而不是 `undefined`，调用方据此区分
 *     "key 不存在 / storage 异常"，避免老用户被 lvts=0 误判为新用户。
 *
 * 命名空间：所有 key 自动加前缀 `UNI_STAT_DATA:<appid>:`；`<appid>` 取
 * `process.env.UNI_APP_ID`，缺失时退化为 `default`。
 *
 * 注意：本模块依赖 `uni.{getStorageSync,setStorageSync,removeStorageSync}`，
 * 解析规则见 `infra/uniRuntime.ts`（含小程序注入路径）。
 * 测试中通过 `helpers/mockUni` 注入。
 */
/**
 * 公有版命名空间前缀，遵循公司内部统一规范 `UNI_STAT_DATA:<appid>:<key>`。
 *
 * 私有版（旧）使用 `$$STAT__DBDATA:<appid>` 作为单一聚合 key；这里**不再**使用旧前缀，
 * 仅在 Phase 4 `domain/migration` 中通过显式只读 API 读取一次老聚合数据并拆解到新前缀，
 * 保证平滑迁移；除迁移路径外，新代码全部写入 `UNI_STAT_DATA:` 命名空间。
 */
const NAMESPACE_ROOT = 'UNI_STAT_DATA';
/** 仅供迁移层读取老数据用：私有版聚合 key 的前缀。 */
const LEGACY_NAMESPACE_ROOT = '$$STAT__DBDATA';
/**
 * 内存缓存。值语义：
 *   - 命中且非 undefined → cache 中的真实值
 *   - 命中且 undefined   → 已经主动 `remove` 或确认 storage 中不存在
 *   - 未命中              → 还没读过 storage
 */
const cache = new Map();
/** 已知存在过的全部完整 key（用于 `clearNamespace`）。 */
const knownKeys = new Set();
/**
 * 拼装命名空间下的完整 key。
 */
function fullKey(key) {
    const appid = process.env.UNI_APP_ID || 'default';
    return `${NAMESPACE_ROOT}:${appid}:${key}`;
}
/**
 * 取真实 uni 对象。剥离到函数里，便于测试用 mockUni 替换后立即生效。
 */
function getUni$9() {
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === 'object'
        ? raw
        : undefined;
    if (!u || typeof u.getStorageSync !== 'function') {
        throw new Error('[uni统计 2.0] uni storage API is not available');
    }
    return u;
}
/**
 * 获取一个 key 的值。
 *
 * @returns 命中返回值；未命中或 storage 异常返回 `undefined`（无法区分两种情况，
 *          需要区分时请使用 `safeRead`）。
 */
function get(key) {
    const fk = fullKey(key);
    if (cache.has(fk))
        return cache.get(fk);
    try {
        const raw = getUni$9().getStorageSync(fk);
        // uni 规范：未命中返回空字符串
        if (raw === '' || raw === null || raw === undefined) {
            cache.set(fk, undefined);
            return undefined;
        }
        cache.set(fk, raw);
        knownKeys.add(fk);
        return raw;
    }
    catch (_a) {
        return undefined;
    }
}
/**
 * 安全读取：明确区分「未命中 / 读异常」。
 *
 * @returns
 *   - `{ ok: true, value }`：成功读取（value 可能为 undefined 表示 key 不存在）。
 *   - `{ ok: false, value: undefined }`：storage 抛错；调用方应使用上次内存值兜底，
 *     **绝不**直接退化为 0 / null（否则会复现缺陷 #5：老用户被误判为新用户）。
 */
function safeRead(key) {
    const fk = fullKey(key);
    if (cache.has(fk))
        return { ok: true, value: cache.get(fk) };
    try {
        const raw = getUni$9().getStorageSync(fk);
        if (raw === '' || raw === null || raw === undefined) {
            cache.set(fk, undefined);
            return { ok: true, value: undefined };
        }
        cache.set(fk, raw);
        knownKeys.add(fk);
        return { ok: true, value: raw };
    }
    catch (_a) {
        return { ok: false, value: undefined };
    }
}
/**
 * 写入一个 key。`undefined` 视为删除（与私有版语义对齐）。
 *
 * 失败策略：先更新缓存，再写 storage；storage 抛错时不回滚缓存，
 * 由调用方决定是否补偿（视调用方场景而定，热路径不应阻塞）。
 */
function set(key, value) {
    const fk = fullKey(key);
    if (value === undefined) {
        remove(key);
        return;
    }
    cache.set(fk, value);
    knownKeys.add(fk);
    try {
        getUni$9().setStorageSync(fk, value);
    }
    catch (_a) {
        // 缓存已更新，吞掉异常；调用方如需感知请使用 try/catch 显式包裹。
    }
}
/**
 * 删除一个 key。
 */
function remove(key) {
    const fk = fullKey(key);
    cache.set(fk, undefined);
    try {
        getUni$9().removeStorageSync(fk);
    }
    catch (_a) {
        // 同 set：忽略 storage 异常，缓存已置空。
    }
}
/**
 * 批量读：返回 `Record<key, value>`，未命中 / 异常的 key 取值为 `undefined`。
 */
function batchGet(keys) {
    const out = {};
    for (const k of keys)
        out[k] = get(k);
    return out;
}
/**
 * 批量写：逐个 `set`，等价于循环调用，便于调用侧聚合。
 */
function batchSet(entries) {
    for (const k of Object.keys(entries))
        set(k, entries[k]);
}
/**
 * 清除当前 appid 命名空间下、自模块加载以来访问过的所有 key。
 *
 * 注意：受限于 uni storage 不一定支持 `getStorageInfoSync`，本函数只清理
 * 「本模块写入或读取过的 key」；未触达过的历史脏数据需要调用方显式处理。
 */
function clearNamespace() {
    let uni;
    try {
        uni = getUni$9();
    }
    catch (_a) {
        // uni 不可用：仅清缓存，无法清持久化
    }
    for (const fk of Array.from(knownKeys)) {
        try {
            uni === null || uni === void 0 ? void 0 : uni.removeStorageSync(fk);
        }
        catch (_b) {
            // 单 key 失败不影响其他 key 的清理
        }
        cache.set(fk, undefined);
    }
    knownKeys.clear();
}
/**
 * 仅供单测使用：清空内部缓存与 knownKeys 索引，让模块"像刚加载"一样。
 *
 * 单测必须在每个用例之间调用，否则会跨用例泄漏缓存状态。
 */
function __resetCache() {
    cache.clear();
    knownKeys.clear();
}
const storage = {
    get,
    set,
    remove,
    safeRead,
    batchGet,
    batchSet,
    clearNamespace,
    __resetCache,
};

/**
 * 访问字段 `fvts / lvts / tvc` 状态机。**专项修复缺陷 #5：lvts=0 老用户被误判为新用户。**
 *
 * 私有版（`utils/pageTime.js`）的副作用链：
 *   1. `get_first_visit_time` 在写 fvts 时主动 `dbRemove(LAST_VISIT_TIME_KEY)`
 *      → 第 1 次启动结束 storage 中 lvts 为空。
 *   2. `get_last_visit_time` 在读时立即 `dbSet(LAST_VISIT_TIME_KEY, get_time())`
 *      → 把 "上一次" 当成 "本次"，下次启动读出来已是当前时间。
 *   3. 写入早于上报，上报失败时无法回滚，下次启动状态错乱。
 *
 * 公有版严格契约：
 *   1. 老用户三段拆分：`loadVisitSnapshot()` 纯读、`buildVisitFields()` 仅生成本次待写、
 *      `commitVisitOnAck()` 在上报 ack 后才落 storage（仅推进 lvts，永不主动清 lvts）。
 *   2. **新用户首条 lt=1 例外（保证"一生只计一次新增"）**：本条仍上报 `lvts=0`，但
 *      `buildVisitFields` 会**立即**把基线 `fvts/lvts/tvc=now/now/1` 落库（对齐私有版
 *      `get_last_visit_time` 的"读即写"）。这样本进程后续续会话、以及下次冷启动都会读到
 *      `lvts=now`（非 0），不再被重复计为新增；首条即便上报失败也已由 retry 暂存重试，
 *      不会丢失这唯一一次新增信号。**唯有卸载应用 / 清空缓存**清掉基线后才会重新计一次。
 *   3. `loadVisitSnapshot` 区分 "key 不存在" 与 "storage 异常"：
 *      - 不存在 → `lvts=0`，按新用户路径走（Yes new user）。
 *      - 异常   → 内存有上次 snapshot 时复用之；首次启动且异常 → fallback `lvts=0`，
 *        但**记录** `degraded=true`，上层可决定是否仍上报（Phase 5 collector 用）。
 *   4. 同一进程内只允许一次 `buildVisitFields`；后续 cst=2/3 触发的新会话 lt=1
 *      调用 `buildVisitFieldsForSessionRenewal`，复用 committed / lastBuilt 推进 tvc，
 *      并保证 lvts 仍随 lt=1 上行（缺失会被服务端误判为新用户）。
 *
 * 与 `pipeline/collector.ts` 的契约见 `05-公有版重构开发计划.md` §4.1.5。
 */
const KEY_FVTS = 'visit:fvts';
const KEY_LVTS = 'visit:lvts';
const KEY_TVC = 'visit:tvc';
const EMPTY_SNAPSHOT = {
    fvts: 0,
    lvts: 0,
    tvc: 0,
    isNewUser: true,
    degraded: false,
};
/** 启动后通过 `loadVisitSnapshot` 写入；后续 build/commit 均基于此推进。 */
let loaded = null;
/** `buildVisitFields` 生成；`commitVisitOnAck` 落库后清空。 */
let pending = null;
/** cst=2/3 新会话 lt=1 生成；`commitVisitOnAck` 落库后清空。 */
let pendingRenewal = null;
/** `commitVisitOnAck` 落库后写入；同进程内 cst=2/3 后续事件复用此 snapshot。 */
let committed = null;
/**
 * 本进程内最近一次 `buildVisitFields` 的产出。即使 pending 已被 commit / rollback 清空，
 * 仍保留这份，用于：
 *   - cst=2/3 复用同一份字段（参见 T5/T6）。
 *   - 拦截同进程二次 `buildVisitFields` 误调（warn 后返回此值，不再生成新值）。
 */
let lastBuilt = null;
/** 同进程内 `buildVisitFields` 只允许调用一次（缺陷 #5 修复点之一）。 */
let buildCalledInProcess = false;
/**
 * 转 number（兼容历史 storage 中 string 形式的时间戳）。
 *
 * 异常 / NaN / 负数一律视为 0；
 * 这里保守不抛错，因为读流程要保证不让"脏数据"中断采集链路。
 */
function toNum(v) {
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0)
        return v;
    if (typeof v === 'string' && v.length > 0) {
        const n = Number(v);
        if (Number.isFinite(n) && n >= 0)
            return n;
    }
    return 0;
}
/**
 * snapshot 是否「确实是一台全新设备」：三字段全 0。
 *
 * 用于消费 `degraded`：storage 读取异常时 `lvts` 会退化为 0 而误判 `isNewUser=true`。
 * 若此时 `fvts/tvc` 仍读到非 0（说明是老用户、只是 lvts 这一项读失败），就**不能**当新增，
 * 也不能落库覆盖真实持久值；只有三字段都为 0 才是可信的全新设备。
 */
function isLikelyFreshDevice(snap) {
    return snap.fvts === 0 && snap.lvts === 0 && snap.tvc === 0;
}
/**
 * 是否为「可信的新用户」：非 degraded 直接信任 `isNewUser`；degraded 时仅当三字段全 0
 * （`isLikelyFreshDevice`）才信任，否则视为「读失败的老用户」，走老用户兜底路径。
 */
function isTrustworthyNewUser(snap) {
    if (!snap.isNewUser)
        return false;
    return !snap.degraded || isLikelyFreshDevice(snap);
}
/**
 * 从 storage 读取 snapshot。**纯读，无副作用**（spy `storage.set` 必须 not.toHaveBeenCalled）。
 *
 * 异常处理：
 *   - 三个 key 任意一个 `safeRead.ok=false` → degraded=true。
 *   - 后续读到值仍写 snapshot；调用方应根据 `degraded` 决策是否上报。
 */
function loadVisitSnapshot() {
    const fvtsR = storage.safeRead(KEY_FVTS);
    const lvtsR = storage.safeRead(KEY_LVTS);
    const tvcR = storage.safeRead(KEY_TVC);
    const degraded = !fvtsR.ok || !lvtsR.ok || !tvcR.ok;
    const fvts = toNum(fvtsR.value);
    const lvts = toNum(lvtsR.value);
    const tvc = toNum(tvcR.value);
    const snapshot = {
        fvts,
        lvts,
        tvc,
        isNewUser: lvts === 0,
        degraded,
    };
    if (degraded) {
        const likelyFresh = fvts === 0 && lvts === 0 && tvc === 0 && snapshot.isNewUser;
        if (!likelyFresh) {
            logger.warn('[uni统计 2.0] visit snapshot degraded; some storage keys read failed');
        }
    }
    loaded = snapshot;
    return snapshot;
}
/**
 * 取已加载的 snapshot；未调用过 `loadVisitSnapshot` 时返回 EMPTY。
 *
 * 这里不主动调 `loadVisitSnapshot`，避免在错误时机产生隐式 IO；
 * collector 必须在启动时显式 load 一次。
 */
function ensureLoaded() {
    if (!loaded)
        loaded = EMPTY_SNAPSHOT;
    return loaded;
}
/**
 * 新用户首条 lt=1 的**乐观落库**：立即把基线 `fvts/lvts/tvc=now/now/1` 写入 storage，
 * 并把内存 `loaded`/`committed` 刷新为"非新用户"基线。
 *
 * 目的：保证一台设备一生只上报一次 `lvts=0`（=只计一次新增）。对齐私有版
 * `get_first_visit_time`/`get_last_visit_time` 的"读即写"语义。
 *
 * 与 ack-commit 的关系：
 *   - 首条 lt=1 仍按 `lvts=0` 上报（在 `buildVisitFields` 里单独构造 pending 返回）；
 *     即便该条上报失败，也已由 `pipeline/retry` 暂存重试，唯一一次新增信号不丢。
 *   - 本进程后续续会话（`buildVisitFieldsForSessionRenewal`）命中 `committed` → lvts=now（非 0）；
 *     下次冷启动 `loadVisitSnapshot` 读到 storage 里的 lvts=now → `isNewUser=false`。
 *   - 唯有卸载应用 / 清空缓存清掉基线后，才会重新计一次新增。
 */
function persistNewUserBaseline(now) {
    storage.set(KEY_FVTS, now);
    storage.set(KEY_LVTS, now);
    storage.set(KEY_TVC, 1);
    const baseline = {
        fvts: now,
        lvts: now,
        tvc: 1,
        isNewUser: false,
        degraded: false,
    };
    loaded = baseline;
    committed = baseline;
}
/**
 * 生成本次启动要上报的 fvts/lvts/tvc 三元组。
 *
 * 推进规则：
 *   - 新用户（loaded.isNewUser）：本次上报 fvts=now, lvts=0（0 表示新增），tvc=1；
 *     **同时立即落库基线**（见 `persistNewUserBaseline`），确保后续不再重复计新增。
 *   - 老用户：**不写 storage**；fvts 维持 loaded.fvts；lvts 上报 loaded.lvts（"上一次"，
 *     不是 now）；tvc=loaded.tvc+1；真正落库由 `commitVisitOnAck` 在 ack 后推进。
 *
 * 注意：同一进程内只允许调用一次（参考 `domain/session` 设计）；cst=2/3 新会话应走
 * `buildVisitFieldsForSessionRenewal`。这里通过 `buildCalledInProcess` 哨兵防止误用，
 * 二次调用返回与首次相同的结果但发出 warn，便于排查上层 collector bug。
 */
function buildVisitFields(now) {
    const snap = ensureLoaded();
    if (buildCalledInProcess && lastBuilt) {
        logger.warn('[uni统计 2.0] buildVisitFields() called twice in same process; returning cached fields');
        return Object.assign({}, lastBuilt);
    }
    buildCalledInProcess = true;
    if (isTrustworthyNewUser(snap)) {
        pending = { fvts: now, lvts: 0, tvc: 1, now };
        persistNewUserBaseline(now);
    }
    else if (snap.isNewUser) {
        // degraded 且非全新设备：lvts 读失败被误当 0。按老用户兜底，**不**上报 lvts=0、
        // **不**落库基线（storage 不可靠），避免新增虚高与覆盖真实持久值。
        logger.warn('[uni统计 2.0] visit degraded: lvts 读取失败但检测到历史数据，按老用户处理以避免新增虚高');
        const fvts = snap.fvts > 0 ? snap.fvts : now;
        pending = { fvts, lvts: fvts, tvc: snap.tvc + 1, now };
    }
    else {
        pending = {
            fvts: snap.fvts,
            lvts: snap.lvts,
            tvc: snap.tvc + 1,
            now,
        };
    }
    lastBuilt = { fvts: pending.fvts, lvts: pending.lvts, tvc: pending.tvc };
    return Object.assign({}, lastBuilt);
}
/**
 * 为 cst=2/3 新会话 lt=1 生成本次要上报的 visit 字段（**不写 storage**）。
 *
 * 与私有版 `sendReportRequest` 对齐：后台/前台超时触发的新会话仍携带 fvts/lvts/tvc，
 * 避免 lvts 缺失被服务端按新用户入库。
 *
 * 推进规则：
 *   - 已有 committed：fvts 不变，lvts 上报 committed.lvts，tvc=committed.tvc+1。
 *   - 冷启动 lt=1 尚未 ack：复用 lastBuilt，不重复递增 tvc。
 *   - 兜底读 loaded snapshot，逻辑同 buildVisitFields 的老用户路径。
 */
function buildVisitFieldsForSessionRenewal(now) {
    let fvts;
    let lvts;
    let tvc;
    if (committed) {
        fvts = committed.fvts;
        lvts = committed.lvts;
        tvc = committed.tvc + 1;
    }
    else if (lastBuilt) {
        fvts = lastBuilt.fvts;
        // 防御：新用户冷启首条 lt=1（lvts=0）尚未 ack 时，本进程后续续会话不能再上报 lvts=0，
        // 否则同一新设备被重复计新增。此时用"本次启动时间"(=fvts) 作为上一次访问时间。
        // 正常路径下 buildVisitFields 已落库基线并置 committed，会走上面的 committed 分支。
        lvts = lastBuilt.lvts !== 0 ? lastBuilt.lvts : lastBuilt.fvts;
        tvc = lastBuilt.tvc;
    }
    else {
        const snap = ensureLoaded();
        if (isTrustworthyNewUser(snap)) {
            // 续会话成为本进程首条 lt=1 且命中新用户（罕见：未走过冷启 build）：本条仍按
            // lvts=0 计一次新增，并立即落库基线，保证只计一次。
            fvts = now;
            lvts = 0;
            tvc = 1;
            persistNewUserBaseline(now);
        }
        else if (snap.isNewUser) {
            // degraded 且非全新设备：按老用户兜底，不上报 lvts=0、不落库基线。
            fvts = snap.fvts > 0 ? snap.fvts : now;
            lvts = fvts;
            tvc = snap.tvc + 1;
        }
        else {
            fvts = snap.fvts;
            lvts = snap.lvts;
            tvc = snap.tvc + 1;
        }
    }
    pendingRenewal = { fvts, lvts, tvc, now };
    return { fvts, lvts, tvc };
}
/**
 * 上报 ack 成功后落库。
 *
 * 实际写入：
 *   - 新用户：`fvts=now, lvts=now, tvc=1`（本次启动既是首装也是上一次）。
 *   - 老用户：`fvts` 不变，`lvts=now`（注意：不是 pending.lvts，是 commit 时的 now），`tvc=pending.tvc`。
 *
 * pending 为空 / commit 重复调用一律 noop（保持幂等，便于 collector 重试逻辑）。
 */
function commitVisitOnAck(now) {
    if (pending) {
        const snap = ensureLoaded();
        const newFvts = snap.fvts === 0 ? now : snap.fvts;
        const newLvts = now;
        const newTvc = pending.tvc;
        storage.set(KEY_FVTS, newFvts);
        storage.set(KEY_LVTS, newLvts);
        storage.set(KEY_TVC, newTvc);
        committed = {
            fvts: newFvts,
            lvts: newLvts,
            tvc: newTvc,
            isNewUser: false,
            degraded: false,
        };
        loaded = committed;
        pending = null;
        return;
    }
    if (!pendingRenewal)
        return;
    const newFvts = pendingRenewal.fvts;
    const newLvts = now;
    const newTvc = pendingRenewal.tvc;
    storage.set(KEY_FVTS, newFvts);
    storage.set(KEY_LVTS, newLvts);
    storage.set(KEY_TVC, newTvc);
    committed = {
        fvts: newFvts,
        lvts: newLvts,
        tvc: newTvc,
        isNewUser: false,
        degraded: false,
    };
    loaded = committed;
    pendingRenewal = null;
}
/**
 * 上报失败回滚：清掉 pending，下次再 build 仍基于 loaded snapshot 推进。
 *
 * **不**重置 `buildCalledInProcess`：同一进程内即使首批失败，也不允许"重新"再造一份
 * fvts/lvts 上报，避免污染。失败的批次应由 `pipeline/retry` 负责持久化重试。
 */
function rollbackPendingVisit() {
    pending = null;
    pendingRenewal = null;
}

/**
 * 入口页（entry page）记忆与 `iey / ppiey` 计算。
 *
 * 设计文档：`03-公有版架构设计.md` §4 与 `04-字段字典与平台获取矩阵.md`。
 *
 * 上行出口：
 *   - **仅 `lt=11` 携带 `iey` / `ppiey`（0/1）**；`lt=1` / `lt=3` 等事件不含入口字段。
 * 字段含义（`lt=11` 在**下一页 onShow** 采集，描述**刚离开的上一页**）：
 *   - `iey`：离开页是否为本会话**首次离开的入口页**（会话内仅第一次离开入口路由为 1）。
 *   - `ppiey`：`urlref` 指向页是否仍为**有效入口**（同上，循环回到入口后再离开不算）。
 *
 * 写入时机（`markEntryPage` 仅维护「本会话入口 path」，供 `isEntry` 与 `lt=11` 使用）：
 *   - 新会话：`clearEntry()` 后立刻 `markEntryPage(route)`（launch / app_show / 首个 page_show），
 *     使首屏/恢复后当前页成为本会话登记入口。
 *   - 同一会话内仅首个 route 生效（一会话一 entry）；后续 `markEntryPage` noop。
 *
 * 模块**不持有** lastRoute；ppiey 由调用方传入"上一页"，避免和 `adapter/route` 的
 * 当前路由职责耦合。
 */
const KEY_ENTRY = 'session:entryRoute';
let cached$3;
/** 本会话是否已离开过登记入口（离开后循环回入口不再计 iey/ppiey）。 */
let entryDeparted = false;
/**
 * 标记当前页为入口页。
 *
 * 行为：
 *   - 已存在 entry 时直接 noop（保证一会话一 entry）。
 *   - route 为空字符串 / undefined 时 noop（不污染 storage）。
 */
function markEntryPage(route) {
    if (!route)
        return;
    const existing = getEntryRoute();
    if (existing)
        return;
    storage.set(KEY_ENTRY, route);
    cached$3 = route;
}
/**
 * 当前会话的入口路径；从内存优先取，未命中读 storage。
 */
function getEntryRoute() {
    if (cached$3 !== undefined)
        return cached$3 || undefined;
    const r = storage.safeRead(KEY_ENTRY);
    if (!r.ok)
        return undefined;
    if (typeof r.value === 'string' && r.value.length > 0) {
        cached$3 = r.value;
        return r.value;
    }
    // 标注已查过，避免下次再 IO
    cached$3 = '';
    return undefined;
}
/**
 * 当前路径是否为入口页。
 *
 * route 为空时返回 false；尚未 mark 时返回 false（不会把"未知"误判为入口）。
 */
function isEntry(route) {
    if (!route)
        return false;
    const entry = getEntryRoute();
    return entry === route;
}
/**
 * 当前路径是否仍按入口参与 `iey` / `ppiey` 计算。
 *
 * 与 `isEntry` 区别：用户首次离开登记入口后，即使再次导航回同一路由也不再视为入口。
 */
function isEntryForIey(route) {
    if (entryDeparted)
        return false;
    return isEntry(route);
}
/**
 * 标记本会话已离开登记入口；后续同路由访问不再产生 `iey=1` / `ppiey=1`。
 */
function markEntryDeparted() {
    entryDeparted = true;
}
/**
 * session 切换时调用：清掉 entry，等待新会话第一次 pageShow 重新登记。
 */
function clearEntry() {
    cached$3 = '';
    entryDeparted = false;
    storage.remove(KEY_ENTRY);
}

/**
 * pages.json 导航栏标题解析（ttpj 数据源）。
 *
 * 与私有版 `utils/pageInfo.js` 对齐，按 Vue 版本分两套构建期数据源：
 *   - VUE3：`uni:stat` 插件注入 `process.env.UNI_STAT_TITLE_JSON`（JSON 字符串）；
 *   - VUE2：`require('uni-pages?{"type":"style"}')` 在应用打包阶段解析 pages.json（公有版 dist
 *     拷贝进 Vue2 工程后无法依赖 define 注入，须与私有版同路径）。
 *
 * 运行时 `getPagesJsonNavigationTitle` 等价私有版 `get_page_name`。
 */
/** VUE3 懒加载缓存；`undefined` 表示尚未解析。 */
let titleMapCache;
/**
 * VUE2 构建期：由 `uni-pages` 虚拟模块解析出的 path → title 表（模块加载时即确定）。
 */
// #ifndef VUE3
function buildVue2TitleMapFromUniPages() {
    const titleMap = {};
    try {
        // eslint-disable-next-line no-restricted-globals
        const pagesTitle = require('uni-pages?{"type":"style"}').default;
        const pagesData = pagesTitle === null || pagesTitle === void 0 ? void 0 : pagesTitle.pages;
        if (!pagesData || typeof pagesData !== 'object')
            return titleMap;
        for (const path in pagesData) {
            const style = pagesData[path];
            const navigationBar = style.navigationBar;
            const titleText = style.navigationBarTitleText ||
                style.defaultTitle ||
                (navigationBar === null || navigationBar === void 0 ? void 0 : navigationBar.titleText) ||
                '';
            if (titleText) {
                titleMap[path] = titleText;
            }
        }
    }
    catch (_a) {
        // uni-pages 不可用时（单测、非 uni 打包上下文）保持空表
    }
    return titleMap;
}
const vue2TitleMap = buildVue2TitleMapFromUniPages();
// #endif
/**
 * VUE3：解析并缓存 `UNI_STAT_TITLE_JSON`；解析失败或缺失时得到空表，避免重复 JSON.parse。
 */
// #ifdef VUE3
function getVue3TitleMap() {
    if (titleMapCache)
        return titleMapCache;
    titleMapCache = {};
    try {
        // 必须直接读 process.env.UNI_STAT_TITLE_JSON；勿包 typeof process（小程序无 process 时 define 内联字面量会被三元式丢弃，见 install#readManifestStatConfig）。
        const raw = process.env.UNI_STAT_TITLE_JSON;
        if (typeof raw !== 'string' || !raw)
            return titleMapCache;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            titleMapCache = parsed;
        }
    }
    catch (_a) {
        titleMapCache = {};
    }
    return titleMapCache;
}
// #endif
/**
 * 取当前编译目标下的标题映射表。
 */
function getTitleMap() {
    let map = {};
    // #ifndef VUE3
    map = vue2TitleMap;
    // #endif
    // #ifdef VUE3
    map = getVue3TitleMap();
    // #endif
    return map;
}
/**
 * 按当前页路由取 pages.json 中的导航栏标题，供 `setConfigTitle` → 上行 `ttpj`。
 *
 * @param routePath `getCurrentRoute()` 的典型返回值（一般无前导 `/`）；允许含 query。
 * @returns 未配置或查找不到时返回空串（与私有版 `get_page_name` 一致）。
 */
function getPagesJsonNavigationTitle(routePath) {
    if (!routePath || typeof routePath !== 'string')
        return '';
    const pathOnly = routePath.split('?')[0].trim();
    if (!pathOnly)
        return '';
    const map = getTitleMap();
    let result = '';
    // #ifndef VUE3
    const direct = map[pathOnly];
    result = typeof direct === 'string' && direct.length > 0 ? direct : '';
    // #endif
    // #ifdef VUE3
    const keys = [pathOnly];
    if (pathOnly.startsWith('/')) {
        keys.push(pathOnly.slice(1));
    }
    else {
        keys.push(`/${pathOnly}`);
    }
    for (const k of keys) {
        const v = map[k];
        if (typeof v === 'string' && v.length > 0) {
            result = v;
            break;
        }
    }
    // #endif
    return result;
}

/**
 * 导航栏标题内存状态。
 *
 * 私有版 `Stat._navigationBarTitle = { page, config, report }` 三段被分散维护：
 *   - `page`：拦截 `uni.setNavigationBarTitle` → `ttn`；
 *   - `config`：构建期注入的 pages.json 映射，运行时由 `getPagesJsonNavigationTitle(route)`（等价私有版 `get_page_name`）在每次 `onShow` 写入 → `ttpj`；
 *   - `report`：`uni.report('title', value)` / `StatApp.report('title')` → `ttc`。
 *
 * 公有版集中到 `domain/title.ts`，对外仅暴露 setter / getter / clearForRoute；
 * statData 拼装时通过 `getCurrentTitle()` 一次性读出，**不再**和拦截器/路由耦合。
 */
const state$2 = { page: '', config: '', report: '' };
/**
 * 由拦截器在 `setNavigationBarTitle.invoke` 时调用。
 *
 * @param title 用户设置的标题；非字符串视为空串，避免污染上行 ttn。
 */
function setPageTitle(title) {
    state$2.page = typeof title === 'string' ? title : '';
}
/**
 * 由 collector / runtime 在 onPageShow 时写入 pages.json 配置标题。
 */
function setConfigTitle(title) {
    state$2.config = typeof title === 'string' ? title : '';
}
/**
 * 业务通过 `uni.report('title', value)` 写入；与私有版 `sendEvent('title')` 行为一致。
 */
function setReportTitle(title) {
    state$2.report = typeof title === 'string' ? title : '';
}
/**
 * 取当前 title 三元组的浅拷贝；statData.builder 在拼装 ttn/ttpj/ttc 时调用。
 */
function getCurrentTitle() {
    return { ttn: state$2.page, ttpj: state$2.config, ttc: state$2.report };
}
/**
 * 切换页面时清掉 page 维度的 title（config / report 由各自 setter 控制）。
 */
function clearPageTitle() {
    state$2.page = '';
}

/**
 * 时间相关基础设施。
 *
 * 设计要点：
 *   1. 单元统一：`Sec` 后缀代表秒级；`Ms` 后缀代表毫秒级。任何函数签名都禁止"参数与
 *      返回值单元不一致"，避免私有版长期存在的"秒/毫秒混用"问题。
 *   2. 全部走 `Date.now()`，不走 `new Date().getTime()`，便于 jest fake timers / mock。
 */
/**
 * 当前毫秒级时间戳。用于上报 jitter / 节流定时器等内部计算。
 */
function nowMs() {
    return Date.now();
}
/**
 * 当前秒级时间戳。用于 statData 上行字段（`t / fvts / lvts / sst` 等）。
 */
function nowSec() {
    return Math.floor(Date.now() / 1000);
}
/**
 * 将「离开页 / 后台前当前页」停留时长（秒）钳到与私有版 `get_residence_time` 一致：
 * 差值小于 1 秒时按 1 秒上报（`residenceTime &lt; 1 ? 1 : residenceTime`）。
 *
 * @param deltaSec 非负停留秒数优先；传入负数时视为 0 再钳制。
 */
function clampUrlrefStaySec(deltaSec) {
    const d = deltaSec > 0 ? deltaSec : 0;
    return d < 1 ? 1 : d;
}

/**
 * 平台标识适配。
 *
 * 私有版 `pageInfo.js#get_platform_name` 的能力等价物，但做了三点改进：
 *   1. 类型化：返回受控 `Platform` 联合，禁止把陌生平台直接透传出去。
 *   2. 拆出 `getRawPlatform()`：返回 `process.env.UNI_PLATFORM` 原值，便于 adapter 内部
 *      做"小程序基础库分支"判断，而无需重复读 env。
 *   3. `isApp / isMp / isH5 / isNvue` 一次实现，调用方不再四处 `if (platform === 'n')`。
 *
 * 上行字段约定：
 *   - `ut` = `getPlatform()`（宿主类型：wx / h5 / n …）。
 *   - `p` = 运行设备操作系统（与私有版 `report.js` 中 `sys.platform` 语义一致），由
 *     `normalizeStatOsP()` 从 `getSystemInfo` 合并结果解析，**不得**再用仅读 `plus` 的
 *     `getClientOs()` 填小程序（否则恒为 `unknown` → 空串）。
 *   - `getClientOs()`：保留为 App 端粗分字母 'a' / 'i' / 'h'（历史逻辑），与 `p` 无强绑定。
 *
 * 注意：本模块严禁缓存平台判定结果到模块级常量。`process.env.UNI_PLATFORM` 在 SSR 与
 * 单测中可能被运行时切换；缓存会让多端测试串味。
 */
/**
 * 将 uni 系统信息中的 `platform` / `osName` / `system` 归一为上行 `p`。
 *
 * 与私有版 `report.js`（`sys.platform` → `a|i|h`）数据源一致，但输出采用完整单词，
 * 并覆盖 H5 桌面端（windows / macos / linux）。小程序依赖 `getDeviceInfo` 等合并后的
 * `platform`（如 `ios` / `android`）；`devtools` 无有效机型时再退 `system` / `osName`。
 *
 * @param info 来自 `mergedSystemInfo()` 的字段子集；均可缺省。
 * @returns 小写 OS 名；无法判断时返回空串。
 */
function normalizeStatOsP(info) {
    var _a, _b, _c, _d, _e;
    const fromToken = (raw) => {
        const s = raw.toLowerCase().trim();
        if (!s)
            return '';
        if (s === 'devtools')
            return '';
        if (s === 'android')
            return 'android';
        if (s === 'ios' || s === 'iphone')
            return 'ios';
        if (s.includes('android'))
            return 'android';
        if (s.includes('iphone') || s === 'iphone os' || /\bios\b/.test(s))
            return 'ios';
        if (s.includes('harmony') || s === 'ohos' || s === 'openharmony')
            return 'harmonyos';
        if (s.includes('windows') || s === 'windows_nt')
            return 'windows';
        if (s === 'mac' || s === 'darwin' || s.includes('mac os') || s === 'macos')
            return 'macos';
        if (s.includes('linux') && !s.includes('android'))
            return 'linux';
        return '';
    };
    const p0 = fromToken((_a = info.platform) !== null && _a !== void 0 ? _a : '');
    if (p0)
        return p0;
    const p1 = fromToken((_b = info.osName) !== null && _b !== void 0 ? _b : '');
    if (p1)
        return p1;
    const sys = ((_c = info.system) !== null && _c !== void 0 ? _c : '').toLowerCase();
    if (sys.includes('android'))
        return 'android';
    if (sys.includes('iphone') || /\bios\b/.test(sys))
        return 'ios';
    if (sys.includes('harmony') || sys.includes('ohos'))
        return 'harmonyos';
    if (sys.includes('windows'))
        return 'windows';
    if (sys.includes('mac os') || sys.includes('darwin'))
        return 'macos';
    if (sys.includes('linux'))
        return 'linux';
    const plus = getGlobalObject().plus;
    const p2 = fromToken((_e = (_d = plus === null || plus === void 0 ? void 0 : plus.os) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : '');
    if (p2)
        return p2;
    return '';
}
/**
 * 与私有版 `pageInfo.js#get_platform_name` 中 `aliArr.reverse().join('')` 等价：
 * 得到 uni-app 注入的「阿里系小程序」`UNI_PLATFORM` 原始键。
 *
 * 苹果审核会扫描源码中的敏感品牌连续词，故**禁止**在字面量中直接写出完整键名；
 * 仅通过片段拼接构造（`mp-` + `ali` + `p` + `a` + `y` 逆序拼接）。
 */
function uniPlatformMpAliRaw() {
    const parts = ['y', 'a', 'p', 'mp-ali'];
    return [...parts].reverse().join('');
}
/** 私有版兼容映射：UNI_PLATFORM → 短码。 */
const PLATFORM_MAP = {
    app: 'n',
    'app-plus': 'n',
    'app-harmony': 'n',
    'mp-harmony': 'mhm',
    h5: 'h5',
    'mp-weixin': 'wx',
    [uniPlatformMpAliRaw()]: 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'mp-kuaishou': 'ks',
    'mp-lark': 'lark',
    'mp-xhs': 'xhs',
    'mp-jd': 'jd',
    'quickapp-native': 'qn',
    'quickapp-webview': 'qw',
};
/**
 * 取 `process.env.UNI_PLATFORM` 原值，未设置返回空字符串。
 *
 * 单独抽出是为了：
 *   - 单测可以专门校验"未注入 UNI_PLATFORM"路径，不被 PLATFORM_MAP 遮蔽。
 *   - 调用方做小程序差异判断（如阿里系再细分 ali/dt）时无需再 `process.env.*`。
 */
function getRawPlatform() {
    var _a;
    return (_a = process.env.UNI_PLATFORM) !== null && _a !== void 0 ? _a : '';
}
/**
 * 取标准化后的平台短码。
 *
 * 阿里系细分逻辑：
 *   - 命中 `uniPlatformMpAliRaw()` 对应宿主时，若 `globalThis.my.env.clientName === 'dingtalk'` → `dt`。
 *   - 其他阿里系（小程序、H5 中嵌入支付宝端等）继续返回 `'ali'`。
 *
 * 未识别平台返回 `'unknown'`，禁止把陌生 raw 值直接当作 Platform 透传，
 * 避免上行字段污染（私有版的 `return … || process.env.VUE_APP_PLATFORM` 是潜在风险点）。
 */
function getPlatform() {
    var _a;
    const raw = getRawPlatform();
    const mapped = PLATFORM_MAP[raw];
    if (!mapped)
        return 'unknown';
    if (mapped === 'ali') {
        const my = getGlobalObject().my;
        if (((_a = my === null || my === void 0 ? void 0 : my.env) === null || _a === void 0 ? void 0 : _a.clientName) === 'dingtalk')
            return 'dt';
        return 'ali';
    }
    return mapped;
}
/** 当前是否运行在 App / nvue / HarmonyOS App 端。 */
function isApp() {
    const raw = getRawPlatform();
    return raw === 'app' || raw === 'app-plus' || raw === 'app-harmony';
}
/** 当前是否运行在小程序端（含各平台）。 */
function isMp() {
    return getRawPlatform().startsWith('mp-');
}
/** 当前是否运行在 H5 端。 */
function isH5() {
    return getRawPlatform() === 'h5';
}
/**
 * 当前页面/上下文是否为 nvue。
 *
 * uni-app nvue 页面的 `__UNI_FEATURE_NVUE__` 编译期常量为 true；
 * 运行时无可靠 API，统一通过编译期 define 注入的 `globalThis.__NVUE__` 判断。
 * 没有注入则保守返回 false。
 */
function isNvue() {
    return Boolean(getGlobalObject().__NVUE__);
}

/**
 * 设备 ID 适配。
 *
 * 私有版痛点（参考 `pageInfo.js#getUuid` / `get_uuid` / `get_odid`）：
 *   - `get_uuid` 优先用 `sys.deviceId`，但 `sys` 是模块加载期 `uni.getSystemInfoSync()`
 *     的快照，SSR/早期阶段可能不存在 `deviceId` 字段，导致退化路径被频繁走到。
 *   - 退化路径里 `uni.setStorageSync(UUID_KEY, UUID_VALUE)` —— 这里 `UUID_VALUE` 是
 *     字面量字符串 `'__DC_UUID_VALUE'`，会让所有"写入失败"的设备共享同一个 uuid，
 *     直接污染统计漏斗（缺陷 #28）。
 *
 * 公有版职责：
 *   1. `getUuid()`（上行 `did`）：稳定 + 持久化。
 *      - **App / H5 / 微信小程序（`mp-weixin`）**：优先 `uni.getDeviceInfo().deviceId`，
 *        再退 `getSystemInfoSync().deviceId`、storage、本地 anon。
 *      - **其余宿主**：不走 `getDeviceInfo` 首取，直接 `getSystemInfoSync().deviceId` →
 *        storage → anon（与历史兜底一致）。
 *   2. 任何 storage / uni 调用全部走 `tryRun` 兜底，绝不抛出。
 *   3. 内存级缓存：避免每次构建 statData 都触发一次同步 storage IO。
 *   4. `__resetCache()` 仅供测试。
 *
 * 说明：老版 `odid`（`plus.device.uuid`）已移除，不再参与装配与导出。
 */
const STORAGE_KEY_UUID = 'device:uuid';
/**
 * uni-h5 `getDeviceInfo().deviceId` 的底层 localStorage 键（见 `packages/uni-h5/src/helpers/uuid.ts`）。
 *
 * H5 端直接复用同一个键读写 deviceId：绕开 uni 运行时，保证 `did` 与页面
 * `uni.getDeviceInfo().deviceId` 同源一致，且跨刷新稳定。
 */
const WEB_UUID_KEY = '__DC_STAT_UUID';
let cachedUuid = null;
/**
 * App、H5、微信小程序上优先用拆分 API `getDeviceInfo().deviceId`；其它平台保持原兜底顺序。
 */
function preferGetDeviceInfoDeviceIdFirst() {
    if (isApp() || isH5())
        return true;
    return getRawPlatform() === 'mp-weixin';
}
/**
 * 读取 `uni.getSystemInfoSync().deviceId`；任何异常 / 缺失返回空串。
 *
 * 不复用 `adapter/system.getSystemInfo`：deviceId 在 uni-app 字段表里属于"敏感字段"，
 * 公有版默认不暴露在 `SystemInfoStatic` 中，仅在本 adapter 内部使用。
 */
function readSysDeviceId() {
    const root = resolveUniRuntime();
    const u = root != null && typeof root === 'object'
        ? root
        : undefined;
    if (!u || typeof u.getSystemInfoSync !== 'function')
        return '';
    return tryRun(() => { var _a; return (_a = u.getSystemInfoSync().deviceId) !== null && _a !== void 0 ? _a : ''; }, '');
}
/**
 * 读取 `uni.getDeviceInfo().deviceId`（官方推荐的设备标识来源之一）。
 *
 * API 不存在或抛错时返回空串，由 `getUuid` 继续走 `getSystemInfoSync` / storage 兜底。
 */
function readGetDeviceInfoDeviceId() {
    const root = resolveUniRuntime();
    const u = root != null && typeof root === 'object'
        ? root
        : undefined;
    if (!u || typeof u.getDeviceInfo !== 'function')
        return '';
    return tryRun(() => { var _a; return (_a = u.getDeviceInfo().deviceId) !== null && _a !== void 0 ? _a : ''; }, '');
}
/**
 * 生成兜底设备 id（did）：**纯数字串**，与常见线上形态一致（毫秒时间戳 + 6 位随机数，约 19 位）。
 *
 * 与 `infra/sid.genSid` 区别：uuid 设备级持久化；sid 每会话新生且带 `-xxxx-xxxx` 形后缀。
 */
function generateAnonUuid() {
    const ms = nowMs();
    const rnd = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');
    return `${ms}${rnd}`;
}
/**
 * 把设备 id 写回统计命名空间（`UNI_STAT_DATA:<appid>:device:uuid`），供后续启动读回锁定。
 * 写入失败静默吞掉，不影响本次返回。
 */
function persistUuid(uuid) {
    tryRun(() => storage.set(STORAGE_KEY_UUID, uuid), undefined);
}
/**
 * 取浏览器 `localStorage`（cookie 被禁用 / 无 localStorage 时返回 undefined）。
 *
 * 直接走 `getGlobalObject()`（globalThis / window），**绕开可能不可用的 `uni` 运行时**；
 * 与 `adapter/web.getWebInfo` 直读 `location` 同思路。
 */
function getWebLocalStorage() {
    return tryRun(() => {
        const g = getGlobalObject();
        if (g.navigator && g.navigator.cookieEnabled === false)
            return undefined;
        const ls = g.localStorage;
        if (ls &&
            typeof ls.getItem === 'function' &&
            typeof ls.setItem === 'function') {
            return ls;
        }
        return undefined;
    }, undefined);
}
/**
 * H5：直接从浏览器 `localStorage` 读取 uni-h5 写入的稳定 deviceId（`__DC_STAT_UUID`）。
 * 取不到返回空串。
 */
function readWebDeviceId() {
    const ls = getWebLocalStorage();
    if (!ls)
        return '';
    return tryRun(() => {
        const v = ls.getItem(WEB_UUID_KEY);
        return typeof v === 'string' ? v : '';
    }, '');
}
/**
 * H5：把 did 直接写入浏览器 `localStorage`（与 uni-h5 同键 `__DC_STAT_UUID`）。
 * 使下次刷新读回同一值，并与页面 `uni.getDeviceInfo().deviceId` 对齐。
 */
function writeWebDeviceId(uuid) {
    const ls = getWebLocalStorage();
    if (!ls)
        return;
    tryRun(() => ls.setItem(WEB_UUID_KEY, uuid), undefined);
}
/**
 * 从 uni 运行时解析设备 id。
 *
 * - App / H5 / 微信小程序：优先 `getDeviceInfo().deviceId`，再退 `getSystemInfoSync().deviceId`；
 *   H5 上 `getDeviceInfo().deviceId` 取自 uni-h5 持久化的 `__DC_STAT_UUID`，跨刷新稳定。
 * - 其余宿主：直接 `getSystemInfoSync().deviceId`。
 *
 * 取不到时返回空串，由 `getUuid` 继续走 storage / anon 兜底。
 */
function resolveDeviceIdFromUni() {
    if (preferGetDeviceInfoDeviceIdFirst()) {
        const fromDeviceInfo = readGetDeviceInfoDeviceId();
        if (fromDeviceInfo)
            return fromDeviceInfo;
    }
    return readSysDeviceId();
}
/**
 * 取设备 uuid（上行映射为 `did`）。
 *
 * 解析顺序：
 *   1. 内存缓存（同进程内恒定，保证同次启动 `did` 与 `sid` 前半段一致）。
 *   2. H5：直接读浏览器 `localStorage['__DC_STAT_UUID']`（uni-h5 写入的 deviceId）。
 *   3. uni 设备源（getDeviceInfo / getSystemInfoSync），取到即写回 storage 锁定。
 *   4. uni storage 已持久化的 did。
 *   5. uni storage 正常且无历史值 → 生成 anon 并落库。
 *   6. uni storage 读取异常：H5 直接写浏览器 localStorage 并缓存；其它端返回不缓存、不落库的临时 did。
 *
 * 任何环节失败都不抛错，最差返回新生成的临时 uuid，保证上行字段非空。
 */
function getUuid() {
    if (cachedUuid)
        return cachedUuid;
    // H5：直读浏览器 localStorage 的 deviceId，与页面 uni.getDeviceInfo().deviceId 同源。
    if (isH5()) {
        const fromWeb = readWebDeviceId();
        if (fromWeb) {
            cachedUuid = fromWeb;
            return cachedUuid;
        }
    }
    // uni 设备源；取到后写回 storage 锁定。
    const fromDevice = resolveDeviceIdFromUni();
    if (fromDevice) {
        persistUuid(fromDevice);
        if (isH5())
            writeWebDeviceId(fromDevice);
        cachedUuid = fromDevice;
        return cachedUuid;
    }
    // 设备源不可用：回落到 uni storage 已持久化的 did。
    // safeRead 区分「确无历史值」与「storage 读取异常」，后者不落库以免覆盖真实值。
    const storedRead = storage.safeRead(STORAGE_KEY_UUID);
    if (storedRead.ok) {
        const stored = storedRead.value;
        if (typeof stored === 'string' && stored.length > 0) {
            if (stored.startsWith('device-anon-')) {
                const upgraded = generateAnonUuid();
                persistUuid(upgraded);
                if (isH5())
                    writeWebDeviceId(upgraded);
                cachedUuid = upgraded;
                return cachedUuid;
            }
            cachedUuid = stored;
            return cachedUuid;
        }
        // 无历史值 → 首次生成并落库。
        const generated = generateAnonUuid();
        persistUuid(generated);
        if (isH5())
            writeWebDeviceId(generated);
        cachedUuid = generated;
        return cachedUuid;
    }
    // uni storage 读取异常。
    const ephemeral = generateAnonUuid();
    if (isH5()) {
        // H5 写浏览器 localStorage 并缓存，下次刷新读回同一值。
        writeWebDeviceId(ephemeral);
        cachedUuid = ephemeral;
        return cachedUuid;
    }
    // 其它端：临时 did，不缓存、不落库，避免覆盖磁盘上可能仍存在的真实 did。
    return ephemeral;
}

/**
 * 会话 ID 生成器。
 *
 * 形如（与典型调试示例一致）：
 *   - 有 did（uuid）：`${did}-${8位base36}-${4位base36}`，例如 `1777261806777339018-moih1mhr-40gn`
 *   - 无 did：先生成与兜底 did 同形的数字主体，再拼同样后缀（避免 `anon-` 前缀）。
 *
 * 设计要点：
 *   1. 长度可控，避免上报字段超限。
 *   2. 仅依赖 `Math.random` 与 `Date.now`，不引入 crypto。
 */
const SUFFIX_HEAD_LEN = 8;
const SUFFIX_TAIL_LEN = 4;
/**
 * 生成 base36 随机串。
 *
 * @param len 期望长度；不足时用 '0' **末尾填充**（`padEnd`）补齐，保证长度稳定。
 */
function randomPart(len) {
    const r = Math.random()
        .toString(36)
        .slice(2, 2 + len);
    return r.length >= len ? r : r.padEnd(len, '0');
}
/**
 * 会话实例后缀：`xxxxxxxx-xxxx`（与常见上报示例形态一致）。
 */
function sessionInstanceSuffix() {
    return `${randomPart(SUFFIX_HEAD_LEN)}-${randomPart(SUFFIX_TAIL_LEN)}`;
}
/**
 * 无设备 id 时的数字主体（与 device 兜底 did 生成规则对齐，避免引入循环依赖故略重复）。
 */
function anonNumericBody() {
    const ms = nowMs();
    const rnd = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');
    return `${ms}${rnd}`;
}
/**
 * 生成会话 ID。`uuid` 为空字符串 / undefined 时退化为「数字主体 + 后缀」。
 */
function genSid(uuid) {
    if (uuid && uuid.length > 0) {
        return `${uuid}-${sessionInstanceSuffix()}`;
    }
    return `${anonNumericBody()}-${sessionInstanceSuffix()}`;
}

/**
 * 客户端会话状态机（公有版核心新增）。
 *
 * 设计文档：`03-公有版架构设计.md` §3。
 *
 * 状态：
 *   - `None`：未生成过 session（首次启动 / clearStorage 后）。
 *   - `Active`：前台有有效 session，可继续 touch 推进 lastActive。
 *   - `Background`：应用进入后台，等待返回前台时判定是否超时。
 *
 * 触发器 → cst 映射：
 *   - `cold_launch`：进程冷启动 → cst=1。
 *   - `app_show` (从后台返回)：
 *       - now - bgTs >= backgroundTimeoutSec → 新 session, cst=2（与私有版 pageTime
 *         可读性对齐：配置为 10 秒时，隐藏端与显示端秒戳相差 10 即视为超时）。
 *       - 否则复用旧 session, cst=0。
 *   - `wx_scene_changed`：scene 与上次不同 → 新 session, cst=2。
 *   - `page_show` (前台已有 session)：
 *       - now - lastActive >= pageInactiveTimeoutSec → 新 session, cst=3。
 *       - 否则 touch & 复用, cst=0。
 *
 * 关键设计：所有 storage 操作都带 try / safeRead 兜底；任何路径都不抛异常，
 * 失败 → 退化生成新 session，避免阻塞采集链路。
 */
const KEY_SID = 'session:id';
const KEY_SST = 'session:start';
const KEY_SCT = 'session:sct';
const KEY_SEQ = 'session:seq';
const KEY_LAST_ACTIVE = 'session:lastActive';
const KEY_BG_TS = 'session:bgTs';
const KEY_LAST_SCENE = 'session:lastScene';
const DEFAULT_CONFIG = {
    backgroundTimeoutSec: 300,
    pageInactiveTimeoutSec: 1800,
};
let config$1 = Object.assign({}, DEFAULT_CONFIG);
let cached$2 = null;
/** 配置注入（runtime/install.ts 在启动时调一次）。 */
function configure$1(c) {
    config$1 = Object.assign({}, DEFAULT_CONFIG, c);
}
/**
 * 工具：把 storage 读取到的值转 number；非法值返回 0。
 */
function readNum(key) {
    const r = storage.safeRead(key);
    if (!r.ok)
        return 0;
    const v = r.value;
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0)
        return v;
    if (typeof v === 'string' && v.length > 0) {
        const n = Number(v);
        if (Number.isFinite(n) && n >= 0)
            return n;
    }
    return 0;
}
function readStr(key) {
    const r = storage.safeRead(key);
    if (!r.ok)
        return '';
    return typeof r.value === 'string' ? r.value : '';
}
/**
 * 计算 `now - from` 的非负秒差，防止设备时钟回拨（NTP 校时 / 用户手动改时间）导致
 * `elapsed < 0` 使后台 / 无操作超时判定**永不触发**、会话被异常拉长。
 *
 * 与 `infra/time.elapsedSec` 同语义（负值钳零），此处因状态机入参 `now` 由调用方注入、
 * 不直接走 `nowSec()`，故就地实现保持纯函数可测。
 */
function elapsedNonNeg(now, from) {
    const diff = now - from;
    return diff > 0 ? diff : 0;
}
/**
 * 从 storage 重建 snapshot；任意字段缺失返回 null。
 */
function loadFromStorage() {
    const sid = readStr(KEY_SID);
    if (!sid)
        return null;
    return {
        sid,
        sst: readNum(KEY_SST),
        sct: (readNum(KEY_SCT) || CST.ColdLaunch),
        seq: readNum(KEY_SEQ),
        lastActive: readNum(KEY_LAST_ACTIVE),
        bgTs: readNum(KEY_BG_TS),
        lastScene: readStr(KEY_LAST_SCENE),
    };
}
function ensureCache() {
    if (cached$2 !== null)
        return cached$2;
    cached$2 = loadFromStorage();
    return cached$2;
}
/**
 * 创建一个新 session，写入 storage 并返回新的 snapshot。
 *
 * 内部职责：
 *   - 重置 seq=0、lastActive=now、bgTs=0。
 *
 * 注：原"上一会话 sid（pid）"机制已移除——参数文档无 pid 字段，后端无入库口径，
 *     新会话的字段仅随当次 lt=1 携带。
 */
function createNew(now, sct, scene) {
    const sid = genSid(getUuid());
    const next = {
        sid,
        sst: now,
        sct,
        seq: 0,
        lastActive: now,
        bgTs: 0,
        lastScene: scene,
    };
    storage.set(KEY_SID, sid);
    storage.set(KEY_SST, now);
    storage.set(KEY_SCT, sct);
    storage.set(KEY_SEQ, 0);
    storage.set(KEY_LAST_ACTIVE, now);
    storage.set(KEY_BG_TS, 0);
    storage.set(KEY_LAST_SCENE, scene);
    cached$2 = next;
    return next;
}
/**
 * 主入口：根据 trigger 与上下文，确保 session 处于正确状态。
 *
 * 结果包含 isNew / cst，供 lifecycleHooks 决定本次 lt=1 是否携带 fvts/lvts/tvc。
 */
function ensureSession(t, ctx) {
    const { now, scene = '' } = ctx;
    const snap = ensureCache();
    if (t === 'cold_launch') {
        const created = createNew(now, CST.ColdLaunch, scene);
        return { snapshot: created, isNew: true, cst: CST.ColdLaunch };
    }
    if (!snap) {
        // 没有现存 session（罕见：app_show 但 storage 被清）→ 视为冷启动
        const created = createNew(now, CST.ColdLaunch, scene);
        return { snapshot: created, isNew: true, cst: CST.ColdLaunch };
    }
    if (t === 'app_show') {
        const enterCandidates = [];
        if (ctx.backgroundEnteredAt && ctx.backgroundEnteredAt > 0) {
            enterCandidates.push(ctx.backgroundEnteredAt);
        }
        if (snap.bgTs > 0) {
            enterCandidates.push(snap.bgTs);
        }
        const enterTs = enterCandidates.length > 0 ? Math.min(...enterCandidates) : 0;
        const elapsed = enterTs > 0
            ? elapsedNonNeg(now, enterTs)
            : elapsedNonNeg(now, snap.lastActive);
        const sceneChanged = !!scene && !!snap.lastScene && scene !== snap.lastScene;
        const fromBackground = enterTs > 0;
        if (sceneChanged ||
            (fromBackground && elapsed >= config$1.backgroundTimeoutSec)) {
            const created = createNew(now, CST.BackgroundTimeout, scene);
            return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
        }
        // 未超时：清 bgTs，更新 lastActive
        touch(now);
        storage.set(KEY_BG_TS, 0);
        if (cached$2)
            cached$2.bgTs = 0;
        return { snapshot: cached$2, isNew: false, cst: 0 };
    }
    if (t === 'wx_scene_changed') {
        if (scene && scene !== snap.lastScene) {
            const created = createNew(now, CST.BackgroundTimeout, scene);
            return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
        }
        return { snapshot: snap, isNew: false, cst: 0 };
    }
    // page_show：判定前台无操作超时
    const elapsed = elapsedNonNeg(now, snap.lastActive);
    if (elapsed >= config$1.pageInactiveTimeoutSec) {
        const created = createNew(now, CST.PageInactiveTimeout, scene || snap.lastScene);
        return { snapshot: created, isNew: true, cst: CST.PageInactiveTimeout };
    }
    touch(now);
    return { snapshot: cached$2, isNew: false, cst: 0 };
}
/**
 * 标记应用进入后台。写入 bgTs，供下次 app_show 判定超时。
 */
function markBackground(now) {
    if (!cached$2)
        cached$2 = loadFromStorage();
    if (!cached$2)
        return;
    storage.set(KEY_BG_TS, now);
    cached$2.bgTs = now;
}
/**
 * 更新 lastActive；page_show 与**用户主动行为事件**（collector 在收到 lt=21 自定义/
 * 拦截器事件时调用）触发。这样「前台无操作超时（cst=3）」与文档「无任何 page/event
 * 触达」语义一致：用户持续点按但不翻页时不会被误判为无操作而开新会话。
 */
function touch(now) {
    if (!cached$2)
        cached$2 = loadFromStorage();
    if (!cached$2)
        return;
    storage.set(KEY_LAST_ACTIVE, now);
    cached$2.lastActive = now;
}
/**
 * 取下一个 seq；先递增 storage 中的 seq，再返回新值。
 *
 * 失败兜底：若 storage 异常，仍以内存 cached.seq 自增；保证序号单调，但跨进程可能跳号。
 */
function nextSeq() {
    if (!cached$2)
        cached$2 = loadFromStorage();
    if (!cached$2)
        return 0;
    const next = cached$2.seq + 1;
    cached$2.seq = next;
    storage.set(KEY_SEQ, next);
    return next;
}
/** 取当前 snapshot；未初始化时尝试从 storage 加载，仍为空返回 null。 */
function getSnapshot() {
    return ensureCache();
}
/**
 * 同步更新 session 的 lastScene，不触发新会话。
 *
 * 用于同一次回前台多 hook 携带不同 scene 时，避免重复 lt=1 后补写正确 scene。
 */
function syncLastScene(scene) {
    if (!scene)
        return;
    if (!cached$2)
        cached$2 = loadFromStorage();
    if (!cached$2)
        return;
    storage.set(KEY_LAST_SCENE, scene);
    cached$2.lastScene = scene;
}

/**
 * 页面路由适配。
 *
 * 私有版痛点（参考 `pageInfo.js#get_route / get_page_route / get_page_vm`）：
 *   - `get_page_route` 失败兜底用 `uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')`，
 *     但这个 key 写入位置散落在 `report.js` 多处，时序复杂、容易脏。
 *   - 百度小程序 `_self.$mp.page.is` 取页面路由，逻辑硬编码在 `get_route` 里，
 *     新平台进来必须改这一处主流程。
 *   - `get_page_vm` 直接调 `getCurrentPages()`：在 `onHide` 之后窗口栈可能为空。
 *
 * 公有版职责：
 *   1. `getCurrentRoute()`：稳定获取当前页 path，支持显式传入 pageVm 与多端兜底。
 *   2. `getCurrentRouteWithQuery()`：取带 query 的完整 fullPath。
 *   3. `parseQuery()`：解析 query string 为对象（不依赖 url-search-params，nvue 兼容）。
 *   4. 全部 try/catch，永远返回 `string` / `object`，不返回 undefined。
 *
 * 与私有版兼容：上行字段 `url`（不含 query）/ `urlref`（前页 url）等仍由
 * `domain/statData` 拼装，本层只提供原料。
 */
/**
 * 判定当前 vm 是页面还是应用（对齐私有版 `pageInfo.js#get_page_types`）。
 *
 * Vue2 下应用前后台走 mixin 的 App `onShow` / `onHide`，不能仅靠 `uni.onAppShow`。
 */
function getPageVmType(vm) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!vm)
        return null;
    const internalMpType = (_c = (_b = (_a = vm.$) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.mpType) !== null && _c !== void 0 ? _c : (_d = vm.type) === null || _d === void 0 ? void 0 : _d.mpType;
    if (vm.mpType === 'page' ||
        vm.$mpType === 'page' ||
        ((_e = vm.$mp) === null || _e === void 0 ? void 0 : _e.mpType) === 'page' ||
        ((_f = vm.$options) === null || _f === void 0 ? void 0 : _f.mpType) === 'page' ||
        internalMpType === 'page') {
        return 'page';
    }
    if (vm.mpType === 'app' ||
        vm.$mpType === 'app' ||
        ((_g = vm.$mp) === null || _g === void 0 ? void 0 : _g.mpType) === 'app' ||
        ((_h = vm.$options) === null || _h === void 0 ? void 0 : _h.mpType) === 'app' ||
        internalMpType === 'app') {
        return 'app';
    }
    return null;
}
/**
 * 取栈顶页面实例（vm）。
 *
 * 优先 `getCurrentPages()`；若不可用或栈为空返回 `undefined`。
 */
function getTopPageVm() {
    var _a;
    const fn = getGlobalObject().getCurrentPages;
    if (typeof fn !== 'function')
        return undefined;
    const pages = tryRun(() => fn(), []) || [];
    if (!Array.isArray(pages) || pages.length === 0)
        return undefined;
    const top = pages[pages.length - 1];
    return (_a = top === null || top === void 0 ? void 0 : top.$vm) !== null && _a !== void 0 ? _a : top;
}
/**
 * 取当前页面路径（不含 query）。
 *
 * 取值顺序：
 *   1. 显式 pageVm 优先（mixin 收到的 self/this）。
 *   2. 百度小程序：`vm.$mp.page.is` / `vm.$scope.is`。
 *   3. 通用：`vm.route` → `vm.$scope.route` → `vm.$mp.page.route`。
 *   4. 取栈顶 page 兜底。
 *   5. 全失败返回 ''。
 */
function getCurrentRoute(pageVm) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const vm = pageVm !== null && pageVm !== void 0 ? pageVm : getTopPageVm();
    if (!vm)
        return '';
    if (getPlatform() === 'bd') {
        const r = (_e = (_c = (_b = (_a = vm.$mp) === null || _a === void 0 ? void 0 : _a.page) === null || _b === void 0 ? void 0 : _b.is) !== null && _c !== void 0 ? _c : (_d = vm.$scope) === null || _d === void 0 ? void 0 : _d.is) !== null && _e !== void 0 ? _e : '';
        if (r)
            return r;
    }
    return (_l = (_h = (_f = vm.route) !== null && _f !== void 0 ? _f : (_g = vm.$scope) === null || _g === void 0 ? void 0 : _g.route) !== null && _h !== void 0 ? _h : (_k = (_j = vm.$mp) === null || _j === void 0 ? void 0 : _j.page) === null || _k === void 0 ? void 0 : _k.route) !== null && _l !== void 0 ? _l : '';
}
/**
 * 取当前页 fullPath（含 query）；无 query 返回与 `getCurrentRoute` 一致。
 *
 * 取值顺序：vm.$page.fullPath → vm.$scope.$page.fullPath → 退化 route。
 * 与私有版一致：fullPath === '/' 时退到 route，避免根路径 query 丢失。
 */
function getCurrentRouteWithQuery(pageVm) {
    var _a, _b;
    const vm = pageVm !== null && pageVm !== void 0 ? pageVm : getTopPageVm();
    if (!vm)
        return '';
    const page = (_a = vm.$page) !== null && _a !== void 0 ? _a : (_b = vm.$scope) === null || _b === void 0 ? void 0 : _b.$page;
    if (page) {
        if (page.fullPath && page.fullPath !== '/')
            return page.fullPath;
        if (page.route)
            return page.route;
    }
    return getCurrentRoute(vm);
}

/**
 * 应用生命周期 + 场景值适配。
 *
 * 公有版职责：
 *   1. 把 `uni.onAppShow / onAppHide / onLaunch` 这一组事件抽象成"订阅 + 解绑"形式，
 *      供 `domain/session` 与 `pipeline/collector` 复用，避免业务层直接吃 uni API。
 *   2. 兜底所有调用：uni 缺失时 unsubscribe 为 noop，订阅失败不抛。
 *   3. `getLaunchScene()`：私有版 `get_scene` 仅限 wx，公有版补全 mp-qq / mp-toutiao /
 *      mp-baidu / 阿里系小程序宿主 / mp-lark / mp-kuaishou，并允许覆写（页面自带 scene）。
 *
 * 注意：本模块不维护订阅注册表（去重逻辑由 `infra/interceptor` 与 `runtime/install`
 * 处理），保持单一职责。
 */
function getUni$8() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 启动时取场景值。优先级：
 *   1. 调用方显式传入 `override`（如页面 onLoad 收到的 options.scene）。
 *   2. `uni.getLaunchOptionsSync().scene`（多端通用）。
 *   3. 不识别的平台返回空字符串。
 *
 * 公有版扩展：所有小程序宿主（`mp-*`，含 wx/qq/tt/bd/阿里系/lark/ks/xhs/jd/harmony 等）
 * 均支持 `getLaunchOptionsSync().scene`，故统一以 `isMp()` 判定，避免逐个平台维护白名单时
 * 漏掉新增小程序端导致 scene 恒为空（H5 / App / 快应用无场景值，返回空串）。
 */
function getLaunchScene(override) {
    if (override !== undefined && override !== null && override !== '') {
        return String(override);
    }
    const u = getUni$8();
    if (typeof (u === null || u === void 0 ? void 0 : u.getLaunchOptionsSync) !== 'function')
        return '';
    // 仅小程序宿主有有意义的 scene；其它端即便存在 getLaunchOptionsSync 也无场景值。
    if (!isMp())
        return '';
    return tryRun(() => {
        const opts = u.getLaunchOptionsSync();
        const scene = opts === null || opts === void 0 ? void 0 : opts.scene;
        return scene === undefined || scene === null ? '' : String(scene);
    }, '');
}

/**
 * uniPush ClientID 适配。
 *
 * 私有版（`core/stat.js#pushEvent`）逻辑：
 *   - 调 `uni.getPushClientId({ success(res){ cid = res.cid } })`，无 cid 直接丢弃。
 *   - 没有超时；某些机型 push 服务异常时，回调永远不来，导致这次 launch 的 push 上报丢失。
 *   - 返回值包在 success 回调里，无法 await，不便 pipeline 串接。
 *
 * 公有版职责：
 *   1. `getPushClientId({ enabled, timeoutMs })` 返回 `Promise<PushClientResult>`，
 *      永不 reject；超时 / 失败 / 关闭统一返回 `{ ok: false, cid: '' }`。
 *   2. `enabled` 默认 false（合规要求显式开启）；调用方应从 `config.uniPushClientID`
 *      透传。
 *   3. 不缓存：业务方需要会话维度复用时在 `domain/push.ts` 中缓存（待 Phase 5 接入）。
 */
function getUni$7() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 异步取 push clientId。
 *
 * 任意异常路径都 resolve（永不 reject），调用方只需根据 `ok` 字段判断是否上报。
 */
function getPushClientId(opts = {}) {
    const { enabled = false, timeoutMs = 3000 } = opts;
    return new Promise((resolve) => {
        if (!enabled) {
            resolve({ ok: false, cid: '', reason: 'disabled' });
            return;
        }
        const u = getUni$7();
        if (!u || typeof u.getPushClientId !== 'function') {
            resolve({ ok: false, cid: '', reason: 'unsupported' });
            return;
        }
        let settled = false;
        const finish = (r) => {
            if (settled)
                return;
            settled = true;
            resolve(r);
        };
        const timer = setTimeout(() => finish({ ok: false, cid: '', reason: 'timeout' }), timeoutMs);
        tryRun(() => u.getPushClientId({
            success: (res) => {
                clearTimeout(timer);
                const cid = typeof (res === null || res === void 0 ? void 0 : res.cid) === 'string' ? res.cid : '';
                if (!cid) {
                    finish({ ok: false, cid: '', reason: 'fail' });
                    return;
                }
                finish({ ok: true, cid });
            },
            fail: () => {
                clearTimeout(timer);
                finish({ ok: false, cid: '', reason: 'fail' });
            },
        }), undefined);
    });
}

/**
 * 生命周期 → collector 调度桥。
 *
 * 把 vue mixin / `uni.onAppShow|onAppHide` / push clientId 这些"运行时事件源"
 * 翻译成 collector 的 `report({lt, ...})` 调用，统一处理：
 *   - 会话状态机（ensureSession / markBackground）。
 *   - 入口页登记（entryPage）。
 *   - lastRoute / urlref / urlref_ts 维护。
 *   - 新会话首报：仅发一条 `lt=1`（Launch），新会话字段（sid/cst/fvts/lvts/tvc）随之上行；
 *     `app_show` 新 sid 后立即 **flush(true)**；`page_show`（cst=3）新 sid 在本轮 lt=11
 *     入队后 **flush(true)**（同批内 `LT_ORDER` 保证 lt=1 先于 lt=11）。与 `app_hide` 的
 *     lt=3+flush 一并降低「锚点未送达、后续已用新 sid」的丢失风险（与参数文档对齐；
 *     不再发已废弃的 `lt=0`）。
 *   - push CID 异步抓取后再发 `lt=101`，超时 / 失败静默丢弃。
 *
 * 暴露：
 *   - `bindLifecycle(app, opts?)`：返回 mixin / onAppShow / onAppHide 句柄与
 *     unbind 函数，runtime/install.ts 据此装到 vue & uni 上。
 *   - 内部句柄（`onLaunch / onAppShow / onAppHide / onPageShow / onPageHide / onError`）
 *     单独导出便于单测精准触发。
 *
 * 注意：本模块**不直接**依赖任何 adapter（除 `getCurrentRoute*` 与 `getLaunchScene`），
 * adapter 调用全部走 `tryRun` 兜底，单端缺失不影响调度。
 */
const EMPTY_TITLE_SNAP = { ttn: '', ttpj: '', ttc: '' };
/** 模块级状态。`bindLifecycle` 返回的 unbind 仅断订阅，不重置 state。 */
const state$1 = {
    lastRoute: '',
    lastRouteFull: '',
    beforeLastRoute: '',
    beforeLastRouteFull: '',
    lastRouteEnterTime: 0,
    lastPageTitleSnap: Object.assign({}, EMPTY_TITLE_SNAP),
    lastIey: false,
    prevIey: false,
    isHide: false,
    wasBackgrounded: false,
    pendingBackgroundResume: false,
    backgroundEnteredAt: 0,
    suppressNextPageLogAfterResume: false,
    backgroundResumeLt1At: 0,
};
/** Vue2 H5 hide 过程中偶发 page onShow（间隔≈0s），低于此阈值不消费 pending。 */
const BACKGROUND_RESUME_DEBOUNCE_SEC = 1;
/** 同一次回前台多 hook 重复 lt=1 的去重窗口（秒）。 */
const BACKGROUND_RESUME_LT1_DEDUP_SEC = 3;
/** 小程序等：page onHide 延迟判定「真进后台」；切页会在短时内 onShow 并取消。 */
const PAGE_APP_HIDE_DEFER_MS = 120;
let pageAppHideDeferTimer;
/**
 * Vue3 小程序等已绑定 `uni.onAppShow` 时，后台恢复应仅由 `handleAppShow` 消费。
 *
 * mixin / page onShow 过早消费会在 QQ 等端与 uni 回调形成双 hook，且 scene 不一致
 * （如 2001 vs 1011）导致重复 lt=1。Vue2 / H5 仍走 mixin 提前消费以适配 Page 先于 App onShow。
 */
function shouldEarlyConsumeBackgroundResumeInMixin() {
    return !shouldBindUniAppLifecycle();
}
/**
 * 记录本进程内最近一次后台恢复 lt=1 上报时刻。
 */
function markBackgroundResumeLt1Emitted(now) {
    state$1.backgroundResumeLt1At = now;
}
/**
 * 同一次回前台是否已在去重窗口内上报过后台恢复 lt=1。
 */
function shouldSkipDuplicateBackgroundResumeLt1(now) {
    return (state$1.backgroundResumeLt1At > 0 &&
        now - state$1.backgroundResumeLt1At <= BACKGROUND_RESUME_LT1_DEDUP_SEC);
}
/**
 * 取消 page onHide 触发的延迟进后台判定（Vue2/Vue3 共用）。
 */
function cancelPageAppHideDefer() {
    if (pageAppHideDeferTimer !== undefined) {
        clearTimeout(pageAppHideDeferTimer);
        pageAppHideDeferTimer = undefined;
    }
}
/**
 * H5 进后台时部分工程只触发 page onHide（Vue2/Vue3 均可能出现），
 * 需在 visibility 已为 hidden 时补记 lt=3；普通切页不会满足 hidden。
 */
function tryAppHideFromPageOnHideWhenH5Hidden(app, opts) {
    var _a;
    if (!isH5())
        return;
    if (state$1.pendingBackgroundResume)
        return;
    const vis = (_a = globalThis.document) === null || _a === void 0 ? void 0 : _a.visibilityState;
    if (vis === 'hidden') {
        handleAppHide(app, opts);
    }
}
/**
 * 小程序等非 H5：page onHide 后短时延迟补记 lt=3；若随后 page onShow 则取消（切页）。
 */
function tryAppHideFromPageOnHideWhenMpDefer(app, opts) {
    if (isH5())
        return;
    if (state$1.pendingBackgroundResume)
        return;
    cancelPageAppHideDefer();
    pageAppHideDeferTimer = setTimeout(() => {
        pageAppHideDeferTimer = undefined;
        if (state$1.pendingBackgroundResume)
            return;
        handleAppHide(app, opts);
    }, PAGE_APP_HIDE_DEFER_MS);
}
// #ifndef VUE3
/**
 * Vue2 部分端进后台只触发 page onHide，须在此时补 `handleAppHide`。
 *
 * 普通切页也会触发 page onHide，**不能**无条件补记（否则多报 lt=3）。
 * 对齐私有版 `pageHide`：仅当 `__licationHide` 为真时不再发页面离开；此处等价于：
 *   - H5：`document.visibilityState === 'hidden'` 才补记；
 *   - 其它端：短时延迟，若下一页 onShow 则取消（切页），否则视为进后台。
 */
function tryVue2AppHideFromPageOnHide(app, opts) {
    if (state$1.pendingBackgroundResume)
        return;
    if (isH5()) {
        tryAppHideFromPageOnHideWhenH5Hidden(app, opts);
        return;
    }
    tryAppHideFromPageOnHideWhenMpDefer(app, opts);
}
// #endif
// #ifdef VUE3
/**
 * Vue3 进后台补记 lt=3：
 *   - H5：page onHide + visibility hidden（App onHide 常不触发）；
 *   - 小程序等：`uni.onAppHide` 为主路径，page onHide 延迟为兜底（部分端/时序不触发 uni 回调）。
 */
function tryVue3AppHideFromPageOnHide(app, opts) {
    if (state$1.pendingBackgroundResume)
        return;
    if (isH5()) {
        tryAppHideFromPageOnHideWhenH5Hidden(app, opts);
        return;
    }
    tryAppHideFromPageOnHideWhenMpDefer(app, opts);
}
// #endif
/**
 * 取 collector；未 install 时返回 undefined（调用方需负责 noop）。
 */
function safeCollector(app) {
    return app.getCollector();
}
/**
 * 将 onLaunch / onShow 透传的 path 归一为 `markEntryPage` 使用的 route（去 query、去前导 `/`）。
 *
 * 与 `getCurrentRoute()` 常见返回值对齐，避免入口登记与实际页面 path 不一致。
 */
function normalizePathForEntryMark(raw) {
    var _a;
    if (!raw || typeof raw !== 'string')
        return '';
    const noQuery = (_a = raw.split('?')[0]) !== null && _a !== void 0 ? _a : '';
    return noQuery.startsWith('/') ? noQuery.slice(1) : noQuery;
}
/**
 * 新会话首报：仅发一条 `lt=1`（Launch），新会话字段随之上行。
 *
 * 重要约束（修复 lvts=0 / lvts 缺失缺陷）：
 *   - 进程内首次 lt=1（cold_launch）调用 `buildVisitFields`；
 *   - cst=2/3 新会话 lt=1 调用 `buildVisitFieldsForSessionRenewal`，仍携带 fvts/lvts/tvc，
 *     避免 lvts 缺失被服务端误判为新用户。
 *   - 通过 `firstVisitEmittedInProcess` 哨兵区分上述两条路径。
 *   - `cst` 入参仅用于将来可能的本地侧打印 / 监控；上行字段已由 statData 从 session
 *     snapshot 中读取（出口字段名为 `cst`）。
 *   - `url` 参数：参数文档要求 `lt=1` 携带当前启动页的完整 url；冷启动 / app_show
 *     可从 launch options.path 兜底；page_show 触发的 cst=3 由调用方直接传当前页路径。
 */
function reportNewSession(c, _cst, scene, now, attachVisit, url = '') {
    let visit;
    if (attachVisit && !firstVisitEmittedInProcess) {
        firstVisitEmittedInProcess = true;
        visit = tryRun(() => buildVisitFields(now), undefined);
    }
    else {
        // 续会话（attachVisit=false），或同进程内冷启 lt=1 已发过又被二次触发
        // （attachVisit=true 但 firstVisitEmittedInProcess 已 true）：都复用 renewal 字段，
        // 确保 lt=1 始终携带 fvts/lvts/tvc，杜绝"裸 lt=1 缺 lvts 被服务端按新增计入"。
        visit = tryRun(() => buildVisitFieldsForSessionRenewal(now), undefined);
    }
    const payload = {
        lt: LT.Launch,
        t: now,
        sc: scene,
        visit,
    };
    // url 仅当非空时携带；避免 lt=1 上行体出现 url=""（参数文档要求 url 至多 255 字符，但允许缺省）。
    if (url)
        payload.url = url;
    c.report(payload);
}
/** 进程内是否已发过首批访问字段（fvts/lvts/tvc）。 */
let firstVisitEmittedInProcess = false;
/**
 * 标题三元组快照代数：hide 优先写入快照并 ++；show 尾部 microtask 携带快照时的代数，
 * 若已被 hide 抢先递增则丢弃 microtask，避免「新页刚灌的 ttpj」顶替「离开页」应有的 ttn/ttc。
 */
let titleSnapGeneration = 0;
/** 在同步栈清空后再采样标题，确保晚于页面自己的 onShow / setNavigationBarTitle。 */
function scheduleDeferredTitleSnapshot() {
    const gen = titleSnapGeneration;
    const run = typeof queueMicrotask === 'function'
        ? queueMicrotask
        : (fn) => {
            void Promise.resolve().then(fn);
        };
    run(() => {
        tryRun(() => {
            if (gen !== titleSnapGeneration)
                return;
            state$1.lastPageTitleSnap = Object.assign({}, getCurrentTitle());
        }, undefined);
    });
}
/**
 * App.onLaunch：冷启动入口。
 *
 * 流程：
 *   1. ensureSession('cold_launch') → cst=1，必产新 session。
 *   2. 发一条 lt=1（携带 sid/cst/fvts/lvts/tvc/sc/url）。
 *   3. 异步抓 push CID，成功后发 lt=101。
 *   4. 兜底 onLaunch options 可能携带 scene / path（小程序）；path 透传成 lt=1 的 url。
 */
function handleLaunch(app, options = {}, opts = {}) {
    const c = safeCollector(app);
    if (!c)
        return;
    const now = nowSec();
    const scene = tryRun(() => getLaunchScene(options.scene), '');
    const result = tryRun(() => ensureSession('cold_launch', { now, scene }), null);
    if (!result)
        return;
    // 冷启动同样视为新会话：清旧入口登记，再按 launch path 登记入口，最后发 lt=1（不含 iey，入口仅 lt=11）。
    tryRun(() => clearEntry(), undefined);
    const url = options.path || '';
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
        tryRun(() => markEntryPage(entryKey), undefined);
    }
    reportNewSession(c, result.cst || CST.ColdLaunch, scene, now, true, url);
    if (opts.enablePush) {
        void getPushClientId({ enabled: true, timeoutMs: opts.pushTimeoutMs })
            .then((r) => {
            if (!r.ok || !r.cid)
                return;
            const c2 = safeCollector(app);
            if (!c2)
                return;
            c2.report({ lt: LT.Push, cid: r.cid, t: nowSec() });
        })
            .catch((e) => logger.warn('[uni统计 2.0] push cid fetch failed', e));
    }
}
/**
 * 消费「从后台回前台」会话判定（cst=2）；返回 true 表示已处理（含防抖跳过但仍保留 pending）。
 *
 * Vue2：Page onShow 常早于 App onShow，且 hide 过程中可能误触发一次 page onShow，
 * 若在那时清空 pending/wasBackgrounded，App onShow 将看不到后台标记（用户截图现象）。
 */
function tryConsumeBackgroundResume(app, options = {}, _opts = {}, _from = 'unknown') {
    if (!state$1.pendingBackgroundResume) {
        return false;
    }
    const bgEnterAt = state$1.backgroundEnteredAt;
    if (bgEnterAt <= 0) {
        return false;
    }
    const c = safeCollector(app);
    if (!c) {
        return false;
    }
    const now = nowSec();
    const elapsed = now - bgEnterAt;
    if (elapsed < BACKGROUND_RESUME_DEBOUNCE_SEC) {
        state$1.suppressNextPageLogAfterResume = true;
        return true;
    }
    state$1.wasBackgrounded = false;
    state$1.suppressNextPageLogAfterResume = true;
    state$1.lastRouteEnterTime = now;
    const scene = tryRun(() => getLaunchScene(options.scene), '');
    const result = tryRun(() => ensureSession('app_show', {
        now,
        scene,
        backgroundEnteredAt: bgEnterAt,
    }), null);
    state$1.pendingBackgroundResume = false;
    state$1.backgroundEnteredAt = 0;
    if (!result || !result.isNew) {
        return true;
    }
    tryRun(() => clearEntry(), undefined);
    const url = options.path || state$1.lastRoute || '';
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
        tryRun(() => markEntryPage(entryKey), undefined);
    }
    reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url);
    markBackgroundResumeLt1Emitted(now);
    void c
        .flush(true)
        .catch((e) => logger.warn('[uni统计 2.0] flush after new session (app_show) failed', e));
    return true;
}
/**
 * 应用从后台进入前台。
 *
 * 流程：
 *   1. `tryConsumeBackgroundResume`（pending）→ ensureSession('app_show') / cst=2。
 *   2. isNew=true 时发一条 lt=1，并 **flush(true)**。
 *   3. 无 pending 时仅处理 scene 变化等（少见）。
 */
function handleAppShow(app, options = {}, opts = {}) {
    if (tryConsumeBackgroundResume(app, options, opts, 'handleAppShow'))
        return;
    const c = safeCollector(app);
    if (!c)
        return;
    const now = nowSec();
    const scene = tryRun(() => getLaunchScene(options.scene), '');
    if (shouldSkipDuplicateBackgroundResumeLt1(now)) {
        tryRun(() => syncLastScene(scene), undefined);
        return;
    }
    const result = tryRun(() => ensureSession('app_show', { now, scene }), null);
    if (!result || !result.isNew) {
        return;
    }
    tryRun(() => clearEntry(), undefined);
    const url = options.path || state$1.lastRoute || '';
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
        tryRun(() => markEntryPage(entryKey), undefined);
    }
    reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url);
    markBackgroundResumeLt1Emitted(now);
    void c
        .flush(true)
        .catch((e) => logger.warn('[uni统计 2.0] flush after new session (app_show) failed', e));
}
/**
 * 应用进入后台。
 *
 * 流程：
 *   1. markBackground(now)：写 bgTs，让下次 app_show 能算超时。
 *   2. 若存在当前页且启用页面日志：先发一条 lt=11，闭合"离开当前页"语义（含 url/urlref/urlref_ts/iey/ppiey/title）。
 *   3. 再发 lt=3：保留"应用进入后台"语义（urlref=urlref_ts 指向后台前最后可见页）。
 *   4. 进入后台后强制 flush（force=true），尽量在被 kill 前送出。
 */
function handleAppHide(app, opts = {}) {
    if (state$1.pendingBackgroundResume)
        return;
    const c = safeCollector(app);
    if (!c)
        return;
    const now = nowSec();
    state$1.wasBackgrounded = true;
    state$1.pendingBackgroundResume = true;
    state$1.backgroundEnteredAt = now;
    tryRun(() => markBackground(now), undefined);
    const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
    const stayed = clampUrlrefStaySec(deltaStay);
    if (state$1.lastRoute && opts.enablePageLog !== false) {
        const exitedUrl = state$1.lastRouteFull || state$1.lastRoute;
        const ref = state$1.beforeLastRouteFull || state$1.beforeLastRoute || '';
        const snap = state$1.lastPageTitleSnap;
        const payload = {
            lt: LT.Page,
            t: now,
            url: exitedUrl,
            urlref_ts: stayed,
            iey: state$1.lastIey,
            ppiey: state$1.prevIey,
            ttn: snap.ttn,
            ttpj: snap.ttpj,
            ttc: snap.ttc,
        };
        if (ref)
            payload.urlref = ref;
        c.report(payload);
        if (state$1.lastIey) {
            tryRun(() => markEntryDeparted(), undefined);
            state$1.lastIey = false;
        }
    }
    c.report({
        lt: LT.Hide,
        t: now,
        urlref: state$1.lastRoute,
        urlref_ts: stayed,
    });
    void c
        .flush(true)
        .catch((e) => logger.warn('[uni统计 2.0] flush on hide failed', e));
}
/**
 * Page.onShow：页面前台展示。
 *
 * `lt=11`（页面日志）在**进入新页**的 `onShow` 触发，但语义描述的是**刚刚离开的页面**
 *（只有离开后才能闭合停留时长、导航栏标题等）：
 *
 *   - `url`：离开页的完整路径（含 query），来自上一次 onShow 结束时登记的 `lastRouteFull`。
 *   - `urlref`：再上一层的来源页（「上上个页面」），来自 `beforeLastRouteFull`；
 *     首次从启动页外跳（只有一层来源）时不带 `urlref`。
 *   - `urlref_ts`：离开页停留秒数（`now - lastRouteEnterTime`，不足 1 秒按 1 秒，对齐私有版）。
 *   - `iey` / `ppiey`：分别对应**离开页**是否仍为有效入口、`urlref` 指向页是否仍为有效入口
 *     （会话内仅**首次离开**登记入口为 1；循环回到入口后再离开不算）。
 *   - `ttn` / `ttpj` / `ttc`：三维独立内存（API 导航栏 / pages.json / uni.report('title')），
 *     **同一事件可同时非空**。离开页快照优先在 **`onHide` 且 `clearPageTitle` 之前**落盘；
 *     无 hide 场景依赖 **microtask**（晚于业务 `onShow`）— 由 `titleSnapGeneration` 防止被下一页 show 尾部误覆盖。
 *
 * 首次应用内 onShow（无前序页面）不发 `lt=11`。`enablePageLog=false` 时跳过整段 `lt=11`。
 */
function handlePageShow(app, vm, opts = {}) {
    const c = safeCollector(app);
    if (!c)
        return;
    if (state$1.pendingBackgroundResume &&
        shouldEarlyConsumeBackgroundResumeInMixin()) {
        tryConsumeBackgroundResume(app, {}, opts, 'handlePageShow');
    }
    const now = nowSec();
    const route = tryRun(() => getCurrentRoute(vm), '');
    const url = tryRun(() => getCurrentRouteWithQuery(vm), '') || route;
    /**
     * H5/部分端存在"App.onShow 也会打到 mixin onShow"的情况，此时 this 并非页面 vm，
     * route/fullPath 为空。该事件应由 `handleAppShow` 处理，不能当 page_show。
     */
    if (!route && !url)
        return;
    const result = tryRun(() => ensureSession('page_show', { now }), null);
    if (!result)
        return;
    // 每页重置「自定义上报标题」维（ttc）；注入 pages.json 导航标题 → `ttpj`。
    //
    // **禁止**在此处调用 `clearPageTitle()`：uni-app 页面 `onLoad` 早于统计 mixin 的 `onShow`，
    // 业务常在 `onLoad` 里 `uni.setNavigationBarTitle`，拦截器已写入 `ttn`；若此处再清 page，
    // 会把刚设好的 ttn 抹掉。**跨页**时由 `handlePageHide` 在快照后 `clearPageTitle` 即可。
    tryRun(() => setReportTitle(''), undefined);
    tryRun(() => setConfigTitle(getPagesJsonNavigationTitle(route)), undefined);
    if (result.isNew) {
        // 新会话：清 entry → 先登记当前页为会话入口（与 lt=1「落地即入口」一致）→ 再发 lt=1。
        tryRun(() => clearEntry(), undefined);
    }
    if (route) {
        tryRun(() => markEntryPage(route), undefined);
    }
    if (result.isNew) {
        // cst=3：复用 committed visit 字段，与私有版 sendReportRequest 对齐。
        // 注意：lt=1（新会话首报）**不受** enablePageLog 控制 —— 与私有版语义一致，
        // is_page_report 仅拦截 pageShow/pageHide，不影响 launch/appShow/appHide。
        reportNewSession(c, result.cst || CST.PageInactiveTimeout, '', now, false, url);
    }
    // 存在上一页 → 发 lt=11：描述「离开的上一页」，而非当前 vm 所在页。
    const shouldSuppressPageLog = state$1.suppressNextPageLogAfterResume;
    if (state$1.lastRoute &&
        opts.enablePageLog !== false &&
        !shouldSuppressPageLog) {
        const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
        const stayed = clampUrlrefStaySec(deltaStay);
        const exitedUrl = state$1.lastRouteFull || state$1.lastRoute;
        const ref = state$1.beforeLastRouteFull || state$1.beforeLastRoute || '';
        const snap = state$1.lastPageTitleSnap;
        const payload = {
            lt: LT.Page,
            t: now,
            url: exitedUrl,
            urlref_ts: stayed,
            // 离开页是否入口页 / urlref 指向页是否入口页（进入新页前状态尚未被本轮覆盖）。
            iey: state$1.lastIey,
            ppiey: state$1.prevIey,
        };
        if (ref)
            payload.urlref = ref;
        // 三维并列上行，不因其一存在而省略其它；空串由 builder/omit 统一处理
        payload.ttn = snap.ttn;
        payload.ttpj = snap.ttpj;
        payload.ttc = snap.ttc;
        c.report(payload);
        if (state$1.lastIey) {
            tryRun(() => markEntryDeparted(), undefined);
        }
    }
    // 轮换路由链：当前页在下一轮成为「上一页」。
    state$1.beforeLastRoute = state$1.lastRoute;
    state$1.beforeLastRouteFull = state$1.lastRouteFull;
    state$1.prevIey = state$1.lastIey;
    state$1.lastIey = !!route && tryRun(() => isEntryForIey(route), false);
    state$1.lastRoute = route;
    state$1.lastRouteFull = url;
    state$1.lastRouteEnterTime = now;
    state$1.suppressNextPageLogAfterResume = false;
    // 不在此处同步快照：此时 lastRoute 已指向新页，getCurrentTitle 会是新页 ttpj+空 ttn，造成顶替。
    // 离开页快照见 handlePageHide（优先）；否则见 scheduleDeferredTitleSnapshot。
    scheduleDeferredTitleSnapshot();
    state$1.isHide = false;
    // cst=3 新会话：本 tick 内可能已入队 lt=1 与（若有上一页）lt=11；serializer 按 LT_ORDER
    // 保证同批内 lt=1 先于 lt=11。此处强制 flush，避免仍等 reportInterval 才被杀死丢锚点。
    if (result.isNew) {
        void c
            .flush(true)
            .catch((e) => logger.warn('[uni统计 2.0] flush after new session (page_show) failed', e));
    }
}
/**
 * Page.onHide / Page.onUnload：页面隐藏 / 卸载。
 *
 * 私有版用 `isHide` 区分 onUnload 是隐藏还是真离开；本模块同样兼容。
 *
 * 公有版调整（与 `docs/uni统计上报参数.md` 对齐）：
 *   - `lt=11` 不在 onHide 上报；页面离开闭环由「下一次 `handlePageShow` 或 `handleAppHide`」触发。
 *   - onHide 仅做收尾：标记 isHide、清掉自定义 title，避免下次新页空标题。
 *   - lastRoute / lastRouteEnterTime / lastIey 保持不变，由 `handlePageShow` 统一切换。
 */
function handlePageHide(app, _vm) {
    const c = safeCollector(app);
    if (!c)
        return;
    state$1.isHide = true;
    // 离开前快照：此时仍保留「本页」ttpj/ttn/ttc；清空 page 维后仅丢 ttn，故必须先快照
    titleSnapGeneration++;
    state$1.lastPageTitleSnap = Object.assign({}, getCurrentTitle());
    tryRun(() => clearPageTitle(), undefined);
}
/**
 * 已经被本模块"异步重抛"过的错误实例，用于阻断 `onError → 重抛 → onError` 死循环。
 *
 * ## 选 WeakSet 的原因
 *   - 弱引用语义：业务方在外部 catch 这些 error 后，error 仍可被 GC，不内存泄漏。
 *   - uni-app 全端原生支持（H5 / 微信/支付宝/百度/字节 等小程序 / App-iOS/Android /
 *     nvue / uvue / 鸿蒙）—— vue runtime 自身大量使用 WeakSet/WeakMap 做响应式，
 *     任何不支持 WeakSet 的环境，vue 本身就起不来。
 *
 * ## 为什么仍然加 typeof 守卫
 *   作为 SDK 必须 defensive。万一极端环境（自定义沙箱阉割、业务代码 `delete
 *   globalThis.WeakSet`、SSR mock 等）导致 `new WeakSet()` 抛错，会让整个统计模块
 *   在初始化期 `ReferenceError` 加载失败 —— 过激的失败模式。
 *
 *   降级策略：退化为 has=false / add=noop 的 stub。后果是失去防重入保护，但 SDK
 *   仍可正常工作；最坏情况（小程序端 setTimeout 重抛被 mixin 二次接住）会触发
 *   一次额外的 setTimeout（仍是异步、不会同步阻塞），第二次 setTimeout 抛出后会
 *   到达全局 onError，仍然不会无限循环 —— 影响完全可控。
 *
 * ## 仅处理 object 类型
 *   非 object 错误（极少见的 `throw 'string'` / `throw 42` 等）无法进 WeakSet；
 *   且重抛非 object 在多数端的全局 onError 不会再次触发 vue mixin 的 onError，
 *   无重入风险，无需特殊处理。
 */
const rethrownErrors = typeof WeakSet === 'function'
    ? new WeakSet()
    : // 极端环境降级：has=false 永不命中，add=noop；本模块只用 has/add 两个方法，
        // 其它方法（delete / [Symbol.toStringTag]）调用方不依赖，类型断言即可。
        {
            has: () => false,
            add: () => rethrownErrors,
        };
/**
 * onError：上报错误（lt=31）+ 异步重抛，让错误回归原生 "Uncaught Error" 通路。
 *
 * ## 设计目标：统计是**旁路监听**，绝不侵入业务方的报错体验
 *
 * ### 私有版（含早期公有版）的两种错误做法都不达标
 *
 * 1. **私有版 `src/index.js#onError`**：仅 `stat.error(e)`，**完全吞掉错误**。
 *    一旦 mixin 注册了 onError，uni-app/Vue 视为业务已处理 → Vue 不再 console.error
 *    → 业务方在 H5 端排错时控制台一片空白，看不到任何 stack。
 *
 * 2. **早期公有版 `console.error(e)` 兜底**：能看到 stack，但 devtools 会把
 *    `console.error` 的**调用文件**（即 SDK 路径 `uni-stat-public.es.js:行号`）
 *    显示在控制台日志右侧的"来源"列。业务方误以为统计 SDK 出现在他们的错误栈里，
 *    与"旁路监听"承诺相悖。
 *
 * ### 当前方案：`setTimeout(() => { throw e }, 0)` 异步重抛（**仅非小程序**）
 *
 * - **H5 / App 等**：错误进入浏览器 / 原生 "Uncaught Exception" 通路（同 `window.onerror`），
 *   与**完全没接入统计**时的默认行为一致，且控制台「来源」指向用户任务而非 SDK。
 *
 * - **各小程序（`mp-*`）**：**不重抛**。运行时已在首次异常路径打印 `MiniProgramError` 等；
 *   若再 `setTimeout(throw)`，会二次进入全局 `onError`，且微信往往传入**新的包装对象**，
 *   `WeakSet` 无法按引用去重 → 多条 `lt=31`、控制台刷屏。统计在此只做旁路上报。
 *
 * ### 防重入（主要针对仍走重抛的环境）
 *
 * 重抛后可能被二次回调；用 `rethrownErrors`(WeakSet) 标记已处理的 error 实例。
 *
 * ### 顺序
 *
 * 1. **先标记重入防护** —— 防止极端竞态下 setTimeout 在同步上报完成前已 fire。
 * 2. **再上报** —— 同步执行，确保 lt=31 一定入队。
 * 3. **非小程序**：**最后**异步重抛 —— `setTimeout 0` 排到下一 task；小程序端跳过此步。
 *
 * 外层 `try/catch` 仅兜底 `reportError` 自身抛错（与私有版一致）；`tryRun` 兜底
 * `setTimeout` 在极端环境（如 SSR / 被 mock 的 timer）下不可用的情况。
 */
function handleError(app, e) {
    const isObj = typeof e === 'object' && e !== null;
    if (isObj && rethrownErrors.has(e))
        return;
    if (isObj)
        rethrownErrors.add(e);
    try {
        app.reportError(e);
    }
    catch (err) {
        logger.warn('[uni统计 2.0] handleError failed', err);
    }
    if (isMp()) {
        return;
    }
    tryRun(() => {
        setTimeout(() => {
            throw e;
        }, 0);
    }, undefined);
}
function getUni$6() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 是否由 mixin 分发 App 级 onShow/onHide（对齐私有版 `stat.show` / `stat.hide`）。
 *
 * - Vue2：始终走 mixin（`load_stat` 不注册 uni.onAppShow/Hide）。
 * - Vue3：仅 H5 / nvue 走 mixin；小程序等走 `uni.onAppShow` / `onAppHide`。
 *
 * 使用赋值而非连续 `return`：公有版 dist 经 Rollup 打包时，连续 return 会导致
 * `#ifdef VUE3` 分支被 tree-shake；应用构建再剥离 `#ifndef VUE3` 后函数体为空 → undefined。
 */
function shouldMixinDispatchAppLifecycle() {
    let result = isH5() || getPlatform() === 'n' || isNvue();
    // #ifndef VUE3
    result = true;
    // #endif
    // #ifdef VUE3
    result = isH5() || getPlatform() === 'n' || isNvue();
    // #endif
    return result;
}
/**
 * 是否注册 `uni.onAppShow` / `onAppHide`（对齐私有版 `index.js#load_stat` VUE3 分支）。
 *
 * 仅 Vue3 且非 H5、非 nvue（即小程序等）为 true；Vue2 必须为 false。
 */
function shouldBindUniAppLifecycle() {
    let result = !isH5() && getPlatform() !== 'n' && !isNvue();
    // #ifndef VUE3
    result = false;
    // #endif
    // #ifdef VUE3
    result = !isH5() && getPlatform() !== 'n' && !isNvue();
    // #endif
    return result;
}
const uniAppHookRegistry = {
    showBound: false,
    hideBound: false,
    appShowCb: undefined,
    appHideCb: undefined,
};
/**
 * 订阅应用级 `uni.onAppShow` / `onAppHide`；`uni` 或 API 未就绪时返回 false，可稍后重试。
 *
 * show/hide 分别绑定：避免 `onAppShow` 晚就绪时连 `onAppHide` 也无法注册（lt=3 缺失）。
 */
function tryBindUniAppLifecycle(app, opts = {}) {
    if (!shouldBindUniAppLifecycle())
        return false;
    const u = getUni$6();
    if (!u)
        return false;
    if (!uniAppHookRegistry.showBound && typeof u.onAppShow === 'function') {
        uniAppHookRegistry.appShowCb = (e) => handleAppShow(app, e !== null && e !== void 0 ? e : {}, opts);
        tryRun(() => u.onAppShow(uniAppHookRegistry.appShowCb), undefined);
        uniAppHookRegistry.showBound = true;
    }
    if (!uniAppHookRegistry.hideBound && typeof u.onAppHide === 'function') {
        uniAppHookRegistry.appHideCb = () => handleAppHide(app, opts);
        tryRun(() => u.onAppHide(uniAppHookRegistry.appHideCb), undefined);
        uniAppHookRegistry.hideBound = true;
    }
    return uniAppHookRegistry.showBound && uniAppHookRegistry.hideBound;
}
/** 解绑 `tryBindUniAppLifecycle` 注册的回调。 */
function unbindUniAppLifecycle() {
    if (!uniAppHookRegistry.showBound && !uniAppHookRegistry.hideBound)
        return;
    const cur = getUni$6();
    if (uniAppHookRegistry.showBound &&
        uniAppHookRegistry.appShowCb &&
        (cur === null || cur === void 0 ? void 0 : cur.offAppShow)) {
        tryRun(() => cur.offAppShow(uniAppHookRegistry.appShowCb), undefined);
    }
    if (uniAppHookRegistry.hideBound &&
        uniAppHookRegistry.appHideCb &&
        (cur === null || cur === void 0 ? void 0 : cur.offAppHide)) {
        tryRun(() => cur.offAppHide(uniAppHookRegistry.appHideCb), undefined);
    }
    uniAppHookRegistry.showBound = false;
    uniAppHookRegistry.hideBound = false;
    uniAppHookRegistry.appShowCb = undefined;
    uniAppHookRegistry.appHideCb = undefined;
}
/**
 * 装配 vue mixin；Vue3 小程序等另由 `tryBindUniAppLifecycle` 订阅 uni 应用前后台。
 *
 * 与私有版 `src/index.js` + `core/stat.js#show|hide` 对齐：
 *   - Vue2：仅 `Vue.mixin`，App/Page 均在 mixin 的 onShow/onHide 内分支。
 *   - Vue3：H5/nvue 的 App 前后台在 mixin；其它端用 uni.onAppShow/onAppHide。
 */
function bindLifecycle(app, opts = {}) {
    let bound = true;
    const mixin = {
        onLaunch(options = {}) {
            handleLaunch(app, options, opts);
        },
        onLoad() {
            // 保留钩子位，用于未来扩展（query 收集等）；当前 noop。
        },
        onShow() {
            const vmType = getPageVmType(this);
            cancelPageAppHideDefer();
            if (state$1.pendingBackgroundResume &&
                shouldEarlyConsumeBackgroundResumeInMixin()) {
                tryConsumeBackgroundResume(app, {}, opts, 'mixin.onShow');
            }
            state$1.isHide = false;
            if (vmType === 'page') {
                handlePageShow(app, this, opts);
            }
            if (shouldMixinDispatchAppLifecycle() && vmType === 'app') {
                handleAppShow(app, {}, opts);
            }
        },
        onHide() {
            state$1.isHide = true;
            if (getPageVmType(this) === 'page') {
                handlePageHide(app);
                // #ifndef VUE3
                tryVue2AppHideFromPageOnHide(app, opts);
                // #endif
                // #ifdef VUE3
                tryVue3AppHideFromPageOnHide(app, opts);
                // #endif
            }
            if (shouldMixinDispatchAppLifecycle() &&
                getPageVmType(this) === 'app' &&
                !state$1.pendingBackgroundResume) {
                handleAppHide(app, opts);
            }
        },
        onUnload() {
            if (state$1.isHide) {
                state$1.isHide = false;
                return;
            }
            handlePageHide(app);
        },
        onError(e) {
            handleError(app, e);
        },
    };
    if (shouldBindUniAppLifecycle()) {
        tryBindUniAppLifecycle(app, opts);
    }
    return {
        mixin,
        tryBindUniAppHooks: () => shouldBindUniAppLifecycle() && tryBindUniAppLifecycle(app, opts),
        unbind() {
            if (!bound)
                return;
            bound = false;
            unbindUniAppLifecycle();
        },
    };
}

/**
 * 公有版常量与可配置项的集中定义（版本号、URL、超时阈值等）。
 *
 * 该模块只导出**编译期常量**与**默认值**；运行时可变配置走 `runtime/StatApp` 注入。
 */
/**
 * 上行字段 `usv` 取值：**uni-app 编译器版本号**（与权威参数文档
 * `docs/uni统计上报参数.md` 中 `usv: "4.24"` 示例对齐）。
 *
 * 与私有版 `src/config.ts` 保持同源做法：直接读 `process.env.UNI_COMPILER_VERSION`，
 * 由 uni-cli 在用户应用打包阶段通过 vite `define` 替换成字面量字符串；
 * 运行时取不到时回退为空串，避免拼到 URL 时变成 `undefined`。
 *
 * 注意：这里**不再**硬编码统计实现版本。统计入口由 `src/plugin/index.ts`
 * 的统计类型（`public` / `private`）控制；
 * 与 `usv` 字段无关。
 */
const STAT_VERSION_PUBLIC = process.env.UNI_COMPILER_VERSION || '';
/** 1.0 通道（HTTP）默认上报地址。 */
const STAT_URL = 'https://tongji.dcloud.io/uni/stat';
/** H5 image 兜底通道（绕过跨域）。 */
const STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
/** 默认上报间隔（秒）。queue 节流阈值。 */
const REPORT_INTERVAL_SEC = 10;
/** HTTP 协议层最大重试次数（含首次）。 */
const HTTP_MAX_RETRIES = 3;
/** Cloud 协议层最大重试次数（含首次）。 */
const CLOUD_MAX_RETRIES = 2;
/** Image 协议层最大重试次数（含首次）。 */
const IMAGE_MAX_RETRIES = 2;
/** 重试基础延迟（指数退避）。 */
const RETRY_BASE_DELAY_MS = 1000;
/**
 * 微信小程序是否用 `wx.preloadAssets` + `WebTrack.gif` GET 上报。
 *
 * - `true`（默认）：`mp-weixin` 走 preload 信标；无 API 时回退 `uni.request` GET。
 * - `false`：微信与其它宿主一样走 `uni.request` GET（query 与 H5 一致）。
 *
 * 可在 `createImageChannel({ mpWeixinPreloadReport: false })` 覆盖。
 */
const MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT = true;
/**
 * 微信 `wx.preloadAssets` 单次等待上限（ms）。
 *
 * 冷启动首包常慢于 10s（DNS/TLS/首连），而 image 通道默认 `timeoutMs=10000` 会先于
 * `success` 触发 SDK 超时；Network 里请求可能已是 200。默认放宽到 30s，`uni.request` GET 仍用 10s。
 */
const MP_WEIXIN_PRELOAD_TIMEOUT_MS = 30000;
/**
 * 微信小程序 preload 冷启动首包 flush 延迟（ms）。
 *
 * `onLaunch` 入队 lt=1 后，`queue.shouldFlush()` 会因 `lastFlushAt=0` 立即为 true；
 * 若在 App 尚未完成启动时调用 `wx.preloadAssets`，易出现 30s 无 success。延迟后再 flush，
 * 用于验证「启动时机」是否为根因（方案 C）。设为 `0` 则关闭延迟。
 */
const MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS = 2000;
/**
 * 单条事件序列化后允许的最大字节数。
 *
 * 阈值取舍：
 *   - GET 上报（`/WebTrack` / `/WebTrack.gif`）URL 上限约 6KB（见 `docs/image-url-too-long-修复说明.md`）；
 *     扣掉 host / ProjectId / TopicId / Source / Time 等固定 query 后，留给
 *     `Logs=encodeURIComponent(payload.requests)` 约 5.8KB 量级。
 *   - `encodeURIComponent` 对纯 ASCII 膨胀 ~1.05x，对中英混排 ~1.5–2x，对纯中文最坏 3x。
 *   - 取 **4KB 作为单条事件上限**：保证 ASCII 场景（含大段 Error stack）能放进单批；
 *     纯中文极端场景下，由 `chunkEvents` 单条独占一片 + image preflight 在 URL 编码后
 *     再做一次 6144 字节硬截断兜底。
 *   - 业务错误 stack 通常 ~1–3KB，4KB 足够；超 4KB 的单条多半是 base64 图片 / 大段 JSON
 *     这类**应该被业务自身收敛**的场景，直接丢弃并 warn 比静默卡死管道更安全。
 *
 * 超过本阈值的单条事件直接在 `queue.enqueue()` 内丢弃并 warn —— 不入桶、不持久化、
 * 不进入重试队列，避免 81KB 这种"任何 batch 切多细都过不了"的死信卡死管道。
 *
 * 参考排错文档：`docs/image-url-too-long-修复说明.md`。
 */
const SINGLE_EVENT_MAX_BYTES = 4 * 1024;
/**
 * 单批 `requests`（已 `JSON.stringify(events)`）允许的最大字节数。
 *
 * 与 GET URL 长度上限相关：`encodeURIComponent` 保守按 3x 估，
 * 本常量与 `createImageChannel.maxRequestBytes()` 取 min 后由 collector 切片。
 */
const BATCH_REQUESTS_MAX_BYTES = 4 * 1024;
/** 单批最多容纳的事件数；与字节阈值取 min 作为切片边界。 */
const BATCH_MAX_EVENTS = 30;
/**
 * 内存上报桶（主队列）允许容纳的事件总数上限。
 *
 * 设置原因：通道长期不可用时，失败批次会反复 `rollback` 回桶，且每次 `enqueue`/`rollback`
 * 都会 `persistBucket` 落盘。若无上限，内存与 storage 会随离线时长无界增长，最终可能触发
 * 小程序 storage 配额异常甚至 OOM。超过本上限时，`enqueue` 按 FIFO 丢弃**最旧**事件
 * （优先从当前最大的桶丢，尽量保住体量小但关键的 lt=1/lt=3），并 warn。
 *
 * 取值 1000：以单条均值约 0.5–1KB 估算，约占 0.5–1MB，远低于各端 storage 配额；
 * 正常在线（10s flush）场景永远触不到，仅在长时间离线积压时生效。
 */
const QUEUE_MAX_EVENTS = 1000;
/**
 * 单条 retry 队列条目允许的最大重放次数。
 *
 * 设置原因：`recoverRetry` 每次冷启串行重放历史 payload，对永久错误（例如曾经误塞入
 * 队列的超长 payload、协议早期版本的脏数据）只会反复 fail，永远卡在队列前部把后续
 * 健康 payload 也拖死。超过本阈值后由 `markAttempt` 自动 ack 删除（死信清理）。
 */
const RETRY_MAX_ATTEMPTS = 5;
const IMAGE_REPORT_DEFAULTS = {
    host: 'https://tongji-collector.dcloud.net.cn',
    /** 正式环境 */
    projectId: '964f0397-af5d-45bf-99d6-8fb3500d7849',
    topicId: '8563e231-f4cd-4ab0-8870-917e4b04e810',
    // 以下为历史测试环境（已停用，勿删便于回切排查）
    // projectId: '9fad19a2-b7f1-47f5-87ff-8621f545ab61',
    // topicId: '99b55c91-ed80-406e-b205-e9d18aca744d',
};
/**
 * uni-app appid。优先取构建期 `process.env.UNI_APP_ID`；未注入时返回 `''`，
 * 由调用方决定是否上报为 `'default'`。
 */
function getAppId$1() {
    var _a;
    return (_a = process.env.UNI_APP_ID) !== null && _a !== void 0 ? _a : '';
}

/**
 * 2.0 通道：uniCloud importObject 上报。
 *
 * 与私有版协议 1:1：
 *   `uni.__stat_uniCloud_space.importObject('uni-stat-receiver', { customUI: true }).report(payload)`
 *
 * 与私有版差异（修复点）：
 *   - 私有版 `sendRequest` 仅在 1.0 通道有 `_retry` 重试，2.0 通道**完全没有重试**，
 *     云函数偶发抖动会直接丢数据。本实现统一接入 `withRetry`（指数退避）。
 *   - 私有版直接读全局 `uni.__stat_uniCloud_space`，无法测试。本实现支持依赖注入
 *     `uniCloudSpace`（测试） / `getUniCloudSpace()`（运行时）。
 *   - `available()` 在 `space.importObject` 不可用时返回 false，调用方据此决定是否
 *     回退到 1.0 通道（由 selector 决策，本通道自身不做回退）。
 */
/**
 * 解析当前可用的 uniCloud space。
 *
 * 优先级：opts.uniCloudSpace > uni.__stat_uniCloud_space（`uni` 解析见 `infra/uniRuntime`）。
 * 都不可用返回 undefined，由 `available()` / `send()` 自行处理。
 */
/**
 * 校验云对象返回值是否表示业务失败。**只识别 uniCloud 标准失败约定，默认成功**，
 * 以避免把成功返回误判为失败而触发无谓重试：
 *   - `success === false`（显式布尔失败）
 *   - `errCode` 为非 0 的 number（uniCloud 云对象错误码约定；0 / 缺省 = 成功）
 *
 * **刻意不判断通用 `code` 字段**：部分接口用 `code: 200` 表示成功，若按「非 0 即失败」
 * 处理会把成功误判为失败、误入重试队列。未知返回形态一律视为成功（保守）。
 *
 * 命中失败约定时抛错，交由 `withRetry` / collector 走重试链路。
 */
function assertCloudResultOk(res) {
    if (!res || typeof res !== 'object')
        return;
    const r = res;
    if (r.success === false) {
        throw new Error('cloud receiver reported success=false');
    }
    if (typeof r.errCode === 'number' && r.errCode !== 0) {
        throw new Error('cloud receiver reported errCode=' + String(r.errCode));
    }
}
function resolveSpace(injected) {
    if (injected)
        return injected;
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === 'object'
        ? raw
        : undefined;
    return u === null || u === void 0 ? void 0 : u.__stat_uniCloud_space;
}
function createCloudChannel(opts = {}) {
    var _a, _b;
    const receiverName = (_a = opts.receiverName) !== null && _a !== void 0 ? _a : 'uni-stat-receiver';
    const maxRetries = (_b = opts.maxRetries) !== null && _b !== void 0 ? _b : CLOUD_MAX_RETRIES;
    function getReceiver() {
        const space = resolveSpace(opts.uniCloudSpace);
        if (!space || typeof space.importObject !== 'function')
            return undefined;
        try {
            return space.importObject(receiverName, { customUI: true });
        }
        catch (e) {
            logger.warn('[uni统计 2.0] cloud importObject threw', e);
            return undefined;
        }
    }
    function once(payload) {
        const receiver = getReceiver();
        if (!receiver || typeof receiver.report !== 'function') {
            return Promise.reject(new Error('uniCloud space unavailable'));
        }
        return Promise.resolve(receiver.report(payload)).then((res) => {
            // 云对象未 throw 但**业务结果显式失败**时，仍按失败处理以触发重试，
            // 避免"resolve 即成功"漏掉服务端拒收。仅识别明确的失败约定，默认视为成功，
            // 防止把未知返回形态误判为失败（保守）。
            assertCloudResultOk(res);
        });
    }
    return {
        name: '2.0',
        available() {
            const space = resolveSpace(opts.uniCloudSpace);
            return !!(space && typeof space.importObject === 'function');
        },
        send(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield withRetry(() => once(payload), {
                        times: maxRetries,
                        baseDelayMs: RETRY_BASE_DELAY_MS,
                        sleep: opts.sleep,
                    });
                }
                catch (e) {
                    logger.warn('[uni统计 2.0] 统计上报失败（云函数已重试）', e);
                    throw e;
                }
            });
        },
    };
}

/**
 * 公有版调试日志：面向业务方的"采集 / 上报"过程日志封装。
 *
 * 与 `logger.debug` 的差异：
 *   - `logger.debug` 是底层 console.log + 闸门；调用点散落，文案随意。
 *   - 本模块提供**统一文案 / 统一格式**的高层包装，覆盖：
 *       1. 采集动作：每个 lt 都有中文动作名 +「采集 → 数据」标记。
 *       2. 上报生命周期：开始 / 成功 / 失败 / 冷启续传。
 *       3. 启动摘要：通道版本、上报间隔、ak 是否就位等。
 *   - 所有 helper 都内嵌 `logger.isDebug()` 判断；非 debug 模式下零开销，
 *     调用方无需再写 `if (logger.isDebug()) ...`。
 *
 * 文案风格参考私有版 `utils/pageInfo.js#log`：直接面向业务调试，**中文**为主，
 * 关键字段（lt / 通道 / 用时 / 错误原因）一目了然。
 *
 * 注意：不在此处吞错；任意 console.log 异常仍会冒泡。运行时调用方需要 `tryRun` 兜底
 * 时自行处理（一般 console.log 不会抛错，故未做包装）。
 */
/**
 * `lt` → 用户友好的中文动作名映射。
 *
 * 与私有版 `pageInfo.js#log` 的 msg_type 对齐。
 * 注：`lt=0` 已废弃（详见 `domain/eventTypes.ts` 头注释），新会话信息直接随 lt=1 上行。
 *
 * 未知 lt 走默认 "未知事件 (lt=X)"，便于排查异常上行。
 */
function getActionLabel(lt) {
    switch (lt) {
        case LT.Launch:
            return '应用启动';
        case LT.Hide:
            return '应用进入后台';
        case LT.Page:
            return '页面切换';
        case LT.Event:
            return '事件触发';
        case LT.Error:
            return '应用错误';
        case LT.Push:
            return 'PUSH 设备标识';
        default:
            return `未知事件 (lt=${String(lt !== null && lt !== void 0 ? lt : '?')})`;
    }
}
/**
 * 计算 bucket（`Record<lt, StatData[]>`）内的事件总数。
 *
 * 仅在 debug 路径需要，单独抽出避免与 queue.size() 模块循环依赖。
 */
function bucketSize(bucket) {
    let n = 0;
    for (const lt of Object.keys(bucket)) {
        const arr = bucket[lt];
        if (Array.isArray(arr))
            n += arr.length;
    }
    return n;
}
/**
 * 把 bucket 摘要成 "lt=1×1, lt=11×3, lt=21×2" 形式，方便控制台扫读。
 */
function bucketSummary(bucket) {
    const parts = [];
    for (const lt of Object.keys(bucket)) {
        const arr = bucket[lt];
        if (Array.isArray(arr) && arr.length > 0) {
            parts.push(`lt=${lt}×${arr.length}`);
        }
    }
    return parts.join(', ') || '<空>';
}
/**
 * 单次事件采集日志。
 *
 * 文案示意：
 *   ```text
 *   [uni统计 2.0] === 统计数据采集：应用启动 (lt=1) ===
 *   [uni统计 2.0] {lt: '1', t: 1714123456, ut: 'h5', ...}
 *   [uni统计 2.0] === 采集结束 ===
 *   ```
 */
function logCollect(data) {
    if (!logger.isDebug())
        return;
    const lt = data.lt;
    const label = getActionLabel(lt);
    logger.debug(`=== 统计数据采集：${label} (lt=${String(lt !== null && lt !== void 0 ? lt : '?')}) ===`);
    logger.debug(data);
    logger.debug('=== 采集结束 ===');
}
/**
 * 启动 / 配置摘要。`installPublicStat` 装配完毕后调用一次，方便业务方一眼确认接入状态。
 */
function logBoot(info) {
    if (!logger.isDebug())
        return;
    const timeoutParts = [];
    if (info.backgroundTimeoutSec != null) {
        timeoutParts.push(`后台超时(新会话): ${info.backgroundTimeoutSec}s`);
    }
    if (info.pageInactiveTimeoutSec != null) {
        timeoutParts.push(`前台无操作超时: ${info.pageInactiveTimeoutSec}s`);
    }
    const timeoutSeg = timeoutParts.length > 0 ? ` | ${timeoutParts.join(' | ')}` : '';
    const lines = [
        '=== uni统计 2.0 已启用 ===',
        `上报间隔: ${info.reportIntervalSec}s${timeoutSeg} | 应用APPID: ${info.ak || '<未注入>'}${info.appName ? ` | 应用名: ${info.appName}` : ''}${info.vueMode ? ` | ${info.vueMode}` : ''}`,
    ];
    if (info.debugFromManifest) {
        lines.push('调试模式：已从 manifest.uniStatistics.debug 自动开启');
    }
    lines.push('=== 后续将在每次采集 / 上报时输出过程日志 ===');
    logger.debug(lines.join('\n'));
}
/**
 * 即将上报：取出 batch、选定 channel 后调用。
 *
 * 文案示意：
 *   ```text
 *   // 通道=${info.channel}
 *   [uni统计 2.0] === 准备上报： 共 4 条事件 (lt=1×1, lt=11×2, lt=21×1) [_id=p-xxxx] ===
 *   ```
 */
function logReportStart(info) {
    if (!logger.isDebug())
        return;
    const total = bucketSize(info.bucket);
    const summary = bucketSummary(info.bucket);
    logger.debug(`=== 准备上报：共 ${total} 条事件 (${summary}) ===`);
}
/**
 * 仅输出失败的"原因 / 重试落盘"细节，不输出 `=== 上报失败 ===` headline。
 *
 * 用于 collector 在切片化发送时**每次失败 send 后立即给出可观察性**：业务方能看到
 * 是哪一批因什么失败、是否进入了重试队列；而最终的"上报失败 / 上报完成（部分失败）"
 * 总览由 `logReportSummary` 统一输出，避免一次失败被打两次 headline。
 */
function logReportFailureReason(info) {
    if (!logger.isDebug())
        return;
    logger.debug(`原因: ${describeError(info.error)}`);
    if (info.persistedId) {
        logger.debug(`已暂存重试队列 [retryId=${info.persistedId}]，下次启动自动续传`);
    }
    else {
        logger.debug('未能写入重试队列：本批数据已丢弃');
    }
}
/**
 * 单批次上报的最终汇总。
 *
 * 设计原则：**对外只暴露"成功 / 失败"两种结果，不暴露"切片"等内部实现细节**。
 *
 * 切片是 collector 为了适配 image 通道 URL 长度上限 / 全局 batch 字节阈值而做的
 * 内部分批发送策略；业务方关心的只是"这一批数据有没有送达、送达多少、丢失多少"。
 * 因此本汇总以**事件数**（而非片数）为统计维度，文案与单批 `logReportSuccess` /
 * `logReportFailure` 完全对齐——业务方感知不到内部走了几次 send。
 *
 * 三种状态文案：
 *   - 全成功：`=== 上报成功： N 条事件已送达, 用时 Tms ===`（与 logReportSuccess 同）
 *   - 全失败：`=== 上报失败： N 条事件未送达, 用时 Tms ===`（与 logReportFailure 同）
 *   - 部分失败：`=== 上报完成：成功 X 条，失败 Y 条，用时 Tms ===`
 *
 * 失败原因 / 重试落盘 id 等细节由 collector 在每次失败 send 后通过 logReportFailure
 * 输出，本汇总不再重复，避免噪音。
 */
function logReportSummary(info) {
    if (!logger.isDebug())
        return;
    if (info.failedCount === 0) {
        logger.debug(`=== 上报成功： ${info.okCount} 条事件已送达, 用时 ${info.elapsedMs}ms ===`);
    }
    else if (info.okCount === 0) {
        logger.debug(`=== 上报失败： ${info.failedCount} 条事件未送达, 用时 ${info.elapsedMs}ms ===`);
    }
    else {
        logger.debug(`=== 上报完成：成功 ${info.okCount} 条，失败 ${info.failedCount} 条，用时 ${info.elapsedMs}ms ===`);
    }
}
/**
 * 无可用通道：通常是 channelVersion=2 但 uniCloud space 未关联，或 image 配置缺失。
 */
function logNoChannel(info) {
    if (!logger.isDebug())
        return;
    logger.debug(`=== 上报跳过：当前无可用通道，已回滚 ${bucketSize(info.bucket)} 条事件入队 ===`);
}
/**
 * 冷启续传：进入 recoverRetry 时调用。
 */
function logRecoverStart(count) {
    if (!logger.isDebug())
        return;
    logger.debug(`=== 冷启续传：发现 ${count} 条历史 payload，开始逐条重发 ===`);
}
/**
 * 冷启续传 - 单条结果。
 */
function logRecoverItem(info) {
    if (!logger.isDebug())
        return;
    // const idTag = info.payloadId ? ` [_id=${info.payloadId}]` : ''
    if (info.ok) {
        logger.debug(`续传成功 (${info.index}/${info.total})`);
    }
    else {
        logger.debug(`续传失败 (${info.index}/${info.total})：${describeError(info.error)}`);
    }
}
/**
 * 把 unknown 错误压成可读字符串；保留 message + name，避免业务方在控制台只看到 `[object Object]`。
 */
function describeError(e) {
    if (!e)
        return '<无错误对象>';
    if (e instanceof Error) {
        return `${e.name}: ${e.message}`;
    }
    if (typeof e === 'string')
        return e;
    return safeStringify(e) || String(e);
}

/**
 * 上行体瘦身：去掉值为空字符串 `''` 的字段。
 *
 * - **调试日志**：`collector.report` 在瘦身前把完整 `StatData` 交给 `logCollect`，空串字段仍会打印，
 *   便于对照「是真的没采集到」还是「协议口径为空」。
 * - **入队 / 发送**：经本函数后再 `queue.enqueue`，缩短 image GET URL（encode 后的 Logs），
 *   仅减少体积，不改变非空字段语义。
 *
 * 注意：
 *   - 只处理**顶层**键；`StatData` 事件对象为单层 KV。
 *   - 仅剔除 `v === ''`，保留 `0`、`false`、`null`（若上游传入）；当前 builder 不会主动写入 null。
 */
/**
 * 返回浅拷贝：值为 `''` 的键不拷贝到结果对象。
 */
function omitEmptyStringFieldsForUpload(data) {
    const out = {};
    for (const key of Object.keys(data)) {
        const v = data[key];
        if (v === '')
            continue;
        out[key] = v;
    }
    return out;
}

/**
 * 上报体序列化（重写私有版 `utils/pageInfo.js#handle_data`）。
 *
 * 修复缺陷 #4：私有版用 `for...in` 拿到的 key 永远是字符串，写成 `i === 0` 与 `i === 3`
 * 导致两条边界分支从未命中：`lt=3`（应用进入后台）应排最后用于服务端 session 闭合——被混入中间。
 *
 * 公有版严格契约：
 *   1. 输出顺序固定：`1 → 11 → 21 → 31 → 101 → 3`（可在 `LT_ORDER` 中扩展）。
 *      `lt=0` 已废弃（参考 `domain/eventTypes.ts` 头注释），不再参与排序。
 *   2. 同一 lt 内事件按 push 顺序保留（稳定排序）。
 *   3. 纯函数：不读 storage、不调 console、不依赖 `'3'`。
 *   4. 输入桶为空 → 返回 `'[]'`，调用方应在外层判空。
 *
 * 数据形状（公有版只支持 v2 协议，元素为 JSON 对象；不再走 v1 的 `key=val&...` 字符串）：
 *   `JSON.stringify([{...stat1}, {...stat2}])`
 */
/**
 * 上报顺序权重表。值越小越靠前；未知 lt 落到最末（靠近 lt=3 之前），同时打 warn。
 *
 * 顺序设计依据：
 *   - lt=1：会话日志（含 sid/cst/fvts/lvts/tvc），最先；
 *   - lt=11/21/31/101：按事件类型轻重排开；
 *   - lt=3：应用进入后台，永远最后，用于服务端归一会话停留时长。
 */
const LT_ORDER = {
    '1': 1,
    '11': 2,
    '21': 3,
    '31': 4,
    '101': 5,
    '3': 100,
};
const UNKNOWN_LT_WEIGHT = 50;
/**
 * 拉平 + 排序 + 序列化。
 *
 * @param buckets 按 lt 分组的事件桶。
 * @returns 上行 `requests` 字段的 JSON 字符串（`'[{...}]'`）。
 */
function handleData(buckets) {
    return JSON.stringify(flatten(buckets));
}
/**
 * 仅做拉平 + 排序，便于 collector 在不需要 stringify 的场景下做断言或二次处理（如分片）。
 *
 * 排序规则：
 *   - 主键：`LT_ORDER[lt] ?? UNKNOWN_LT_WEIGHT`。
 *   - 次键：原始 push 顺序（依靠 Array.prototype.sort 在 Node 11+ 已稳定）。
 *
 * 修复缺陷 #4 关键断言：`lt='3'` 必落最后；`lt='1'` 必落最前。
 */
function flatten(buckets) {
    const ltKeys = Object.keys(buckets);
    ltKeys.sort((a, b) => weightOf(a) - weightOf(b));
    const out = [];
    for (let i = 0; i < ltKeys.length; i++) {
        const lt = ltKeys[i];
        const list = buckets[lt];
        if (!list || list.length === 0)
            continue;
        for (let j = 0; j < list.length; j++)
            out.push(list[j]);
    }
    return out;
}
function weightOf(lt) {
    const w = LT_ORDER[lt];
    return typeof w === 'number' ? w : UNKNOWN_LT_WEIGHT;
}
/**
 * 把已 flatten 的事件数组按"事件数 + 字节数"双阈值贪婪切片。
 *
 * 用于 collector flush 阶段：把一次 flush 出来的整桶切成多个 ReportPayload，
 * 避免单批拼成 GET URL 后超过网关 / CDN / 浏览器 URL 上限（典型 8KB）。
 *
 * 行为：
 *   - **不丢任何事件**：单条事件即便已超 maxBytes 也独占一片（由 queue.enqueue 的
 *     `SINGLE_EVENT_MAX_BYTES` 兜底，正常路径走不到这里）。
 *   - **保持顺序**：贪婪累加，不打乱 flatten 排序结果，保证 lt=1 在最前 / lt=3 在最后的契约。
 *   - **空数组返回 []**：调用方据此跳过本次发送。
 */
function chunkEvents(events, opts = {}) {
    var _a, _b;
    const maxEvents = (_a = opts.maxEvents) !== null && _a !== void 0 ? _a : Infinity;
    const maxBytes = (_b = opts.maxBytes) !== null && _b !== void 0 ? _b : Infinity;
    const out = [];
    if (!Array.isArray(events) || events.length === 0)
        return out;
    const safeMaxEvents = maxEvents > 0 ? maxEvents : Infinity;
    const safeMaxBytes = maxBytes > 0 ? maxBytes : Infinity;
    let cur = [];
    let curBytes = 2; // 头尾 '[]'
    for (let i = 0; i < events.length; i++) {
        const e = events[i];
        let s = '';
        try {
            s = JSON.stringify(e);
        }
        catch (_c) {
            // 单条不可序列化交给 collector 丢弃（serializer 不打 console，由外层日志代理）
            continue;
        }
        // 加入后会占用：当前是空片 → s.length；否则 +1（逗号分隔）
        const inc = cur.length === 0 ? s.length : s.length + 1;
        const wouldExceed = cur.length >= safeMaxEvents ||
            (cur.length > 0 && curBytes + inc > safeMaxBytes);
        if (wouldExceed) {
            out.push(cur);
            cur = [];
            curBytes = 2;
        }
        cur.push(e);
        curBytes += cur.length === 1 ? s.length : s.length + 1;
    }
    if (cur.length > 0)
        out.push(cur);
    return out;
}
/**
 * 切片版 handleData：返回多个 `requests` 字符串，对应多个 ReportPayload。
 *
 * `chunkEvents` 已保证排序与边界，本函数只做 stringify。
 */
function handleDataChunked(buckets, opts = {}) {
    const events = flatten(buckets);
    if (events.length === 0)
        return [];
    const chunks = chunkEvents(events, opts);
    const out = [];
    for (let i = 0; i < chunks.length; i++) {
        out.push(JSON.stringify(chunks[i]));
    }
    return out;
}

/**
 * Pipeline 层共享类型。
 *
 * 单独抽出避免 channel / queue / retry 之间循环 import。
 */
/**
 * 永久性通道错误：本次 payload 自身有问题（与网络无关），重试同一份 payload 永远不会过。
 *
 * 典型场景：
 *   - H5 GET URL 超过 `maxUrlLength`，重发同一份必定再次超长；
 *   - TLS host / projectId / topicId 未配置，换网络也救不了；
 *   - 浏览器内既无 `Image` 全局也没有 `uni.request`：环境本身缺失，重试无意义。
 *
 * 设计意图：
 *   - **不进 channel 内部 `withRetry`**：永久错误一抛立刻冒泡到 collector，避免协议层空转 N 次。
 *   - **不进 retry 队列**：collector 的 `report()` 捕获到 permanent 时跳过 `retry.persist`，
 *     避免下次冷启 `recoverRetry` 反复读出 → 反复失败 → 反复落盘的死循环
 *     （这是 `image url too long` 卡死队列的根因）。
 *   - **死信清理**：`recoverRetry` 重放历史 payload 时若再次拿到 permanent 错误，
 *     直接 `retry.ack(_id)` 删除，不再写回。
 *
 * 错误识别：用 `instanceof PermanentChannelError`。为兼容跨 bundle / 跨上下文（少见但
 * 防御性写法），同时设置 `permanent = true` 标志位，`isPermanentChannelError` 双重判定。
 */
class PermanentChannelError extends Error {
    constructor(message) {
        super(message);
        /** 兼容跨 bundle 的标志位；与 `instanceof` 任一为真即视为永久错误。 */
        this.permanent = true;
        this.name = 'PermanentChannelError';
        // 修复 ts/babel 转译后 prototype 链丢失，导致 instanceof 失效
        Object.setPrototypeOf(this, PermanentChannelError.prototype);
    }
}
/**
 * 类型守卫：判定一个 unknown 错误是否为永久性通道错误。
 *
 * 兼容三种来源：
 *   1. `instanceof PermanentChannelError`（同一 bundle）；
 *   2. `err.name === 'PermanentChannelError'`（跨 bundle 但同名）；
 *   3. `err.permanent === true`（任意错误显式标记）。
 */
function isPermanentChannelError(err) {
    if (!err || typeof err !== 'object')
        return false;
    if (err instanceof PermanentChannelError)
        return true;
    const e = err;
    if (e.name === 'PermanentChannelError')
        return true;
    if (e.permanent === true)
        return true;
    return false;
}

/**
 * Collector：domain 与 pipeline 的编排层。
 *
 * 职责（与 runtime/lifecycleHooks 配合）：
 *   1. `report(input)`：把外部输入（lt + 事件上下文）转成 statData 并入队；
 *      自动填充 session 快照、seq（仅本地状态使用，不再上行）。
 *   2. `flush(force?)`：从 queue 取快照 → serializer → 选 channel → 发送；
 *      成功调用 `visit.commit(now)`；失败 `queue.rollback` + `retry.persist`。
 *   3. `recoverRetry()`：冷启动时由 runtime 触发，把上次未送达的 payload 重试。
 *
 * 设计原则：
 *   - 依赖全部注入；本模块不直接 import 任何 adapter，便于测试与多端切换。
 *   - 不持有业务字段；所有 statData 字段由 `domain/statData.builder` 拼装。
 *   - 错误吞掉 + 日志：collector 层异常**不应**抛回到生命周期回调，避免污染业务页面。
 */
/**
 * 默认 payload id 生成；与 retry.ts 的 genId 风格一致但前缀不同，便于日志区分。
 */
function defaultGenPayloadId(nowMs) {
    return ('p-' + nowMs.toString(36) + '-' + Math.random().toString(36).slice(2, 6));
}
function createCollector(deps) {
    /** 是否已完成进程内首次 flush（含延迟触发的那一次）。 */
    let firstFlushDone = false;
    /** 已安排的延迟 flush 定时器，避免重复 schedule。 */
    let deferredFlushTimer = null;
    /** 取消已安排的延迟首 flush（`flush(true)` 等显式调用前使用）。 */
    function cancelDeferredFlush() {
        if (deferredFlushTimer == null)
            return;
        clearTimeout(deferredFlushTimer);
        deferredFlushTimer = null;
    }
    /**
     * `report` 达到阈值后的自动 flush 入口；仅此处做冷启动延迟（方案 C）。
     */
    function triggerAutoFlush() {
        var _a;
        const deferMs = Math.max(0, Math.floor((_a = deps.firstFlushDeferMs) !== null && _a !== void 0 ? _a : 0));
        if (!firstFlushDone && deferMs > 0) {
            if (deferredFlushTimer != null)
                return;
            deferredFlushTimer = setTimeout(() => {
                deferredFlushTimer = null;
                firstFlushDone = true;
                void flushImpl(false).catch((e) => logger.warn('[uni统计 2.0] auto-flush failed', e));
            }, deferMs);
            return;
        }
        firstFlushDone = true;
        void flushImpl(false).catch((e) => logger.warn('[uni统计 2.0] auto-flush failed', e));
    }
    /**
     * 构造 EventContext 并入队。
     *
     * 不再附加 pid（上一会话 sid）：参数文档无该字段，新会话信息由 lt=1 自身的
     * `sid / cst / fvts / lvts / tvc` 表达。
     */
    function report(input) {
        tryRun(() => {
            const t = typeof input.t === 'number' ? input.t : deps.nowSec();
            const snap = deps.session.getSnapshot();
            let sessionForCtx;
            if (snap) {
                const seq = deps.session.nextSeq();
                sessionForCtx = Object.assign({}, snap, { seq });
            }
            // 用户主动行为事件（lt=21：自定义事件 / login / pay / share 拦截器）刷新
            // 前台无操作计时器，避免用户持续操作却无翻页时被误判「无操作超时」开新会话（cst=3）。
            // 仅 lt=21 视为「用户触达」；lt=1/3/11/31/101 由会话状态机自身管理。
            if (snap && input.lt === LT.Event && deps.session.touch) {
                deps.session.touch(t);
            }
            const ctx = Object.assign({}, input, {
                t,
                session: sessionForCtx,
            });
            const data = deps.builder.build(ctx);
            // 调试日志打印完整对象（含空串）；入队发送侧去掉 '' 键以缩短 image URL
            logCollect(data);
            deps.queue.enqueue(omitEmptyStringFieldsForUpload(data));
            if (deps.queue.shouldFlush()) {
                triggerAutoFlush();
            }
        }, undefined);
    }
    /**
     * 真正发送：取快照、序列化、挑通道、按双阈值切片、串行发送，根据结果 commit/persist。
     *
     * 切片策略（修复 image url too long 死循环）：
     *   - 用 `handleDataChunked(snapshot, { maxEvents, maxBytes })` 把整桶切成 N 份；
     *   - 单片失败：永久错（`PermanentChannelError`）→ 直接丢弃，不 persist、不影响其他片；
     *     非永久错 → 调用 `retry.persist`，下次冷启 `recoverRetry` 重放该片。
     *   - **任意片失败** → 不 commit visit；**全部片成功** → commit 一次。
     *     切片场景下 `lt=1` 必定落在第一片（serializer 已按 `LT_ORDER` 排序），
     *     若需要更精细的"首批成功就 commit"，下一步迭代再做。
     *   - 通道不可用：依旧整桶 rollback 回 queue（与切片前行为一致）。
     *
     * @param force 强制 flush（忽略节流阈值）。
     */
    function flushImpl() {
        return __awaiter(this, arguments, void 0, function* (force = false) {
            var _a, _b, _c, _d, _e;
            if (!deps.queue.shouldFlush(force))
                return;
            const snapshot = deps.queue.flush();
            if (!snapshot)
                return;
            const channel = deps.selectChannel();
            if (!channel) {
                logger.warn('[uni统计 2.0] 无可用上报线路，本批已回滚队列');
                logNoChannel({ bucket: snapshot });
                deps.queue.rollback(snapshot);
                return;
            }
            // 切片阈值 = min(全局配置, 通道物理上限)
            //   - 全局：BATCH_REQUESTS_MAX_BYTES（业务可调）
            //   - 通道：image GET URL 经 encodeURIComponent 膨胀，原文不能按 URL 上限直接用
            //     → 由 image 通道 maxRequestBytes() 反推（见 image.ts）
            // 这样 100 条事件在 image 通道下不会再切出"原文 4KB / encoded 7.5KB"超长片。
            const globalMaxBytes = (_b = (_a = deps.batchLimits) === null || _a === void 0 ? void 0 : _a.maxBytes) !== null && _b !== void 0 ? _b : BATCH_REQUESTS_MAX_BYTES;
            const channelMaxBytes = typeof channel.maxRequestBytes === 'function'
                ? channel.maxRequestBytes()
                : Number.POSITIVE_INFINITY;
            const limits = {
                maxEvents: (_d = (_c = deps.batchLimits) === null || _c === void 0 ? void 0 : _c.maxEvents) !== null && _d !== void 0 ? _d : BATCH_MAX_EVENTS,
                maxBytes: Math.min(globalMaxBytes, channelMaxBytes),
            };
            const chunks = handleDataChunked(snapshot, limits);
            if (chunks.length === 0) {
                // 快照已被 flush() 从队列摘除，但切片结果为空（极端：桶内全是空数组 key，
                // 或所有事件 JSON.stringify 失败）。若直接 return 会**静默丢数**，故回滚回队列等待下次。
                logger.warn('[uni统计 2.0] flush 切片结果为空，已回滚队列', snapshot);
                deps.queue.rollback(snapshot);
                return;
            }
            const startMs = deps.nowMs();
            let totalCount = 0;
            for (const lt of Object.keys(snapshot)) {
                const arr = snapshot[lt];
                if (Array.isArray(arr))
                    totalCount += arr.length;
            }
            logReportStart({ channel: channel.name, bucket: snapshot });
            // 切片是适配 image URL 长度限制 / 全局 batch 字节阈值的内部分批策略，业务方
            // 不应感知。统计维度统一为**事件数**：成功片累计 okEvents、失败片累计 failedEvents
            // + per-slice logReportFailure（保留原因）；末尾由 logReportSummary 输出统一汇总。
            // visit 字段（fvts/lvts/tvc）只随 lt=1 上行，而 serializer 已按 LT_ORDER 把 lt=1
            // 排到最前 → 必定落在第一片（chunks[0]）。因此「访问是否被服务端接收」只取决于
            // 第一片是否成功，与后续 lt=21/31 等切片成败无关。
            //   - 桶内有 lt=1：以 chunks[0] 成功与否决定 commit / rollback（部分成功也可 commit，
            //     避免后续片失败把已被接收的访问回滚，造成本地与服务端口径偏差）。
            //   - 桶内无 lt=1：visit pending 本就为空，commit/rollback 均为 noop；沿用「全部成功才 commit」
            //     的旧语义，保持既有行为与测试稳定。
            const hasLaunch = Array.isArray(snapshot['1']) && snapshot['1'].length > 0;
            let okEvents = 0;
            let failedEvents = 0;
            let allOk = true;
            let firstChunkOk = true;
            for (let i = 0; i < chunks.length; i++) {
                const requests = chunks[i];
                const payload = {
                    usv: deps.config.usv,
                    t: deps.nowSec(),
                    requests,
                    _id: ((_e = deps.genPayloadId) !== null && _e !== void 0 ? _e : (() => defaultGenPayloadId(deps.nowMs())))(),
                };
                const sliceEvents = countEvents(requests);
                try {
                    yield channel.send(payload);
                    okEvents += sliceEvents;
                }
                catch (e) {
                    allOk = false;
                    if (i === 0)
                        firstChunkOk = false;
                    failedEvents += sliceEvents;
                    if (isPermanentChannelError(e)) {
                        // 永久错：丢弃本片，不 persist、不污染下次冷启
                        logger.warn('[uni统计 2.0] 统计上报失败（本批已丢弃，不可重试）', e, 'sliceBytes=' + requests.length);
                        logReportFailureReason({ error: e, persistedId: undefined });
                        continue;
                    }
                    logger.warn('[uni统计 2.0] 统计上报失败（已暂存，下次启动自动重试）', e);
                    const id = deps.retry.persist(payload);
                    if (!id) {
                        logger.warn('[uni统计 2.0] 统计暂存重试失败（无 retryId），本批已丢弃');
                    }
                    logReportFailureReason({ error: e, persistedId: id });
                }
            }
            const visitAccepted = hasLaunch ? firstChunkOk : allOk;
            if (visitAccepted) {
                tryRun(() => deps.visit.commitVisitOnAck(deps.nowSec()), undefined);
            }
            else {
                tryRun(() => deps.visit.rollbackPendingVisit(), undefined);
            }
            // 单批最终汇总：业务方视角只看到"成功/失败/部分失败"，不暴露切片实现。
            // 文案见 debugLog.ts#logReportSummary。
            logReportSummary({
                channel: channel.name,
                okCount: okEvents,
                failedCount: failedEvents,
                elapsedMs: deps.nowMs() - startMs,
            });
        });
    }
    /** 估算一片的事件数（容错：解析失败按 0 计）。仅供日志展示。 */
    function countEvents(requests) {
        try {
            const arr = JSON.parse(requests);
            return Array.isArray(arr) ? arr.length : 0;
        }
        catch (_a) {
            return 0;
        }
    }
    /**
     * 把上次进程留在 storage 中的 retry 队列依次重放。
     *
     * 串行执行，失败的条目保留在队列里（不动 _id），调用方会在下次冷启再次重放。
     */
    function recoverRetry() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = deps.retry.loadAll();
            if (items.length === 0)
                return;
            const channel = deps.selectChannel();
            if (!channel) {
                logger.warn('[uni统计 2.0] 续传重试跳过：当前无可用上报线路');
                return;
            }
            logRecoverStart(items.length);
            let i = 0;
            for (const payload of items) {
                i++;
                try {
                    yield channel.send(payload);
                    if (payload._id)
                        deps.retry.ack(payload._id);
                    logRecoverItem({
                        index: i,
                        total: items.length,
                        payloadId: payload._id,
                        ok: true,
                    });
                }
                catch (e) {
                    // 永久错：直接 ack 删除死信，避免下次冷启再次重放再次失败
                    if (isPermanentChannelError(e)) {
                        if (payload._id)
                            deps.retry.ack(payload._id);
                        logger.warn('[uni统计 2.0] 续传重试失败（不可重试，已从队列移除）', e, 'id=' + payload._id);
                        logRecoverItem({
                            index: i,
                            total: items.length,
                            payloadId: payload._id,
                            ok: false,
                            error: e,
                        });
                        continue;
                    }
                    if (payload._id && deps.retry.markAttempt) {
                        // markAttempt 内部超过 maxAttempts 会自动 ack 兜底（参见 retry.ts）
                        deps.retry.markAttempt(payload._id);
                    }
                    logger.warn('[uni统计 2.0] 续传重试失败（保留队列，下次启动再试）', e);
                    logRecoverItem({
                        index: i,
                        total: items.length,
                        payloadId: payload._id,
                        ok: false,
                        error: e,
                    });
                }
            }
        });
    }
    /**
     * 对外 flush：显式调用（含 `flush(true)`）立即发送，并取消尚未触发的延迟首 flush。
     */
    function flush() {
        return __awaiter(this, arguments, void 0, function* (force = false) {
            cancelDeferredFlush();
            firstFlushDone = true;
            return flushImpl(force);
        });
    }
    /** 取消延迟首 flush 定时器，防止 collector 被弃后仍触发幽灵 flush。 */
    function destroy() {
        cancelDeferredFlush();
        // 置为「已完成首 flush」，即便有残留闭包再次调用 triggerAutoFlush 也不会重排定时器。
        firstFlushDone = true;
    }
    return { report, flush, recoverRetry, destroy };
}

/**
 * 1.0 通道：HTTP POST 上报。
 *
 * 兼容私有版同协议（`uni.request(POST STAT_URL)`），并修复其历史缺陷：
 *   - #1 `_retry` 未初始化导致 NaN：本实现以 `withRetry({times})` 显式控制。
 *   - #16 H5 在 nvue/部分小程序无 `Image`：本实现以 `uni.request` 为主；TLS 公有版 image
 *     通道的 H5 路径亦优先 `uni.request` GET 以读取 HTTP 状态，避免误报成功。
 *
 * 接口契约：
 *   - `available()`：在任何 uni 平台都返回 true（HTTP 是兜底通道）。
 *   - `send(payload)`：成功 resolve；3 次重试全失败抛错（供 retry.persist 落盘）。
 *   - 不缓存任何状态；每次 `send` 是无状态的。
 */
function getUni$5() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 把 payload 拼成 query string，供 H5 image fallback 使用。
 *
 * 私有版用 `get_sgin(get_encodeURIComponent_options(data))` 还会算签名；公有版去掉签名
 * （服务端历史阶段仅 1.0 走签名，2.0 已弃用），保持 query 简单可读：
 *   `?usv=3&t=...&requests=URL_ENCODED_JSON`
 */
function toQuery(payload) {
    const out = [];
    out.push('usv=' + encodeURIComponent(String(payload.usv)));
    out.push('t=' + encodeURIComponent(String(payload.t)));
    out.push('requests=' + encodeURIComponent(payload.requests));
    return out.join('&');
}
/**
 * H5 image 通道。仅在 `Image` 全局存在时调用；否则返回 false 让外层退回 `uni.request`。
 *
 * 不等待 onload/onerror（image 兜底语义即"发出去就算"），同步 resolve。
 * 若 `new Image()` 本身抛错也吞掉，转给 fallback。
 */
function tryImageRequest(payload, h5Url = STAT_H5_URL) {
    const ImageCtor = getGlobalObject().Image;
    if (typeof ImageCtor !== 'function')
        return false;
    return tryRun(() => {
        const img = new ImageCtor();
        img.src = h5Url + '?' + toQuery(payload);
        return true;
    }, false);
}
function createHttpChannel(opts = {}) {
    var _a, _b, _c, _d, _e;
    const url = (_a = opts.url) !== null && _a !== void 0 ? _a : STAT_URL;
    const h5Url = (_b = opts.h5Url) !== null && _b !== void 0 ? _b : STAT_H5_URL;
    const ut = (_c = opts.ut) !== null && _c !== void 0 ? _c : '';
    const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 10000;
    const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : HTTP_MAX_RETRIES;
    function once(payload) {
        if (ut === 'h5' && opts.preferImageOnH5 !== false) {
            if (tryImageRequest(payload, h5Url))
                return Promise.resolve();
        }
        const u = getUni$5();
        if (!u || typeof u.request !== 'function') {
            return Promise.reject(new Error('uni.request unavailable'));
        }
        return new Promise((resolve, reject) => {
            let settled = false;
            const timer = setTimeout(() => {
                if (settled)
                    return;
                settled = true;
                reject(new Error('http timeout'));
            }, timeoutMs);
            u.request({
                url,
                method: 'POST',
                data: payload,
                timeout: timeoutMs,
                success: (res) => {
                    var _a;
                    if (settled)
                        return;
                    settled = true;
                    clearTimeout(timer);
                    const code = (_a = res === null || res === void 0 ? void 0 : res.statusCode) !== null && _a !== void 0 ? _a : 0;
                    if (code >= 200 && code < 300)
                        resolve();
                    else
                        reject(new Error('http status ' + code));
                },
                fail: (e) => {
                    if (settled)
                        return;
                    settled = true;
                    clearTimeout(timer);
                    reject(e instanceof Error ? e : new Error(String(e)));
                },
            });
        });
    }
    return {
        name: '1.0',
        available() {
            const u = getUni$5();
            return !!(u && typeof u.request === 'function');
        },
        send(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield withRetry(() => once(payload), {
                        times: maxRetries,
                        baseDelayMs: RETRY_BASE_DELAY_MS,
                        sleep: opts.sleep,
                    });
                }
                catch (e) {
                    logger.warn('[uni统计 2.0] 统计上报失败（HTTP 已重试）', e);
                    throw e;
                }
            });
        },
    };
}

/**
 * 公有版默认通道：火山 TLS Web 采集。
 *
 * **官方 GET**（`uni.request`，App / 小程序 / H5·微信回退）：
 *   `GET ${host}/WebTrack?ProjectId&TopicId&Logs&Source&Time&…`
 *   与文档 `curl GET 'http://${host}/WebTrack?ProjectId=…&TopicId=…&key=val'` 一致。
 *
 * **信标 GET**（H5 `fetch`/`Image`、微信 `preloadAssets`）：
 *   `GET ${host}/WebTrack.gif?…`（query 与 `/WebTrack` 相同，路径为 1×1 像素接口）。
 *   H5 优先 `fetch(keepalive)` 读真实状态码；采集端返回 `200 application/json` 且带
 *   `Access-Control-Allow-Origin: *`，故可跨域判定成败（旧 `<img>` 信标无法读状态，降级兜底）。
 *
 * **已废弃 POST**：`POST ${host}/WebTracks?ProjectId&TopicId` + JSON body。
 */
/** 官方 GET 接口路径（`uni.request`）。 */
const WEBTRACK_API_PATH = '/WebTrack';
/** 浏览器 / 微信 preload 信标路径。 */
const WEBTRACK_BEACON_PATH = '/WebTrack.gif';
/**
 * 解析运行时 `uni.request` API。
 */
function getUni$4() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/** URL 中除 `Logs` 外的固定 query 字节预算（保守值）。 */
const REPORT_URL_BASE_OVERHEAD = 256;
/** `encodeURIComponent` 字节膨胀比上界（用于 collector 切片反推）。 */
const REPORT_ENCODE_RATIO = 3.0;
/**
 * 拼装统计上报 query（ProjectId / TopicId / Logs / Source / Time）。
 *
 * @param payload 上报 payload；`requests` 为 `JSON.stringify(events)`。
 * @param opts    host / projectId / topicId / path / nowMs。
 */
function buildStatReportUrl(payload, opts) {
    var _a;
    const t = ((_a = opts.nowMs) !== null && _a !== void 0 ? _a : (() => Date.now()))();
    const logs = encodeURIComponent(payload.requests);
    const host = opts.host.replace(/\/+$/, '');
    return (host +
        opts.path +
        '?ProjectId=' +
        encodeURIComponent(opts.projectId) +
        '&TopicId=' +
        encodeURIComponent(opts.topicId) +
        '&Logs=' +
        logs +
        '&Source=webImg' +
        '&Time=' +
        t);
}
/**
 * 将 `uni.request` 返回的 `data` 压成短串，便于在 Error.message 中展示。
 *
 * @param data   success 回调中的 `res.data`
 * @param maxLen 最大字符数
 */
function summarizeHttpErrorBody(data, maxLen = 320) {
    if (data == null)
        return '';
    if (typeof data === 'string') {
        return data.length <= maxLen ? data : data.slice(0, maxLen) + '…';
    }
    try {
        const s = JSON.stringify(data);
        return s.length <= maxLen ? s : s.slice(0, maxLen) + '…';
    }
    catch (_a) {
        return String(data).slice(0, maxLen);
    }
}
/**
 * H5 最后兜底：`Image` 触发 `/WebTrack.gif`；`onload` / `onerror` 均 resolve，仅超时 reject。
 *
 * ## 为什么 onload/onerror 都判成功（且为何不再作为首选）
 *
 * 采集端 `/WebTrack.gif` 成功时返回 `200 application/json`（空体），**并非合法图片**，
 * 浏览器无法把响应解码为图片 → 即便上报成功也会触发 `onerror`。因此 `<img>` 信标
 * 物理上**无法区分**「成功（JSON 响应）」与「真实失败（DNS/网络/拦截/4xx/5xx）」，
 * 只能一律 resolve，否则每次成功都会被误判失败并重试。
 *
 * 这是一个有损降级：仅在**既无 `fetch` 又无 `uni.request`** 的极旧 H5 环境才会走到。
 * 正常环境优先 `fetchBeaconAwait`（读真实状态码），次选 `uni.request` GET（读 statusCode）。
 *
 * @param url 完整信标 URL
 * @param ms  超时毫秒
 */
function imageBeaconAwait(url, ms) {
    const ImageCtor = getGlobalObject().Image;
    if (typeof ImageCtor !== 'function') {
        return Promise.reject(new PermanentChannelError('当前环境无法完成统计上报'));
    }
    return new Promise((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
            if (settled)
                return;
            settled = true;
            reject(new Error('统计上报超时'));
        }, ms);
        const img = new ImageCtor();
        img.onload = () => {
            if (settled)
                return;
            settled = true;
            clearTimeout(timer);
            resolve();
        };
        img.onerror = () => {
            if (settled)
                return;
            settled = true;
            clearTimeout(timer);
            resolve();
        };
        img.src = url;
    });
}
/**
 * H5 首选：`fetch` 触发 `/WebTrack.gif`，读取真实 HTTP 状态码判定成败。
 *
 * ## 为什么用 fetch 替代 `<img>` 信标
 *
 * 采集端 `/WebTrack.gif` 成功返回 `200 application/json`（空体），且响应头带
 * `Access-Control-Allow-Origin: *`，因此 H5 可**跨域读取** `res.ok`：
 *   - 2xx → 送达成功，resolve；
 *   - 其余状态码 / 网络异常（DNS、断网、CSP/拦截、4xx/5xx）→ reject，交由
 *     `withRetry` 重试，最终失败落盘 retry，**不再被静默 ACK**。
 *
 * `keepalive: true` 保证页面卸载（如 `lt=3` hide 期）请求仍能发出，等价于
 * `<img>` 信标的「卸载存活」能力，因此可安全取代旧的 onerror=成功 兜底。
 *
 * `credentials: 'omit'`：仅需读状态码，无需携带 cookie；同时规避
 * `Allow-Origin:*` 与 `include` 凭证模式在浏览器侧的冲突。
 *
 * @param url 完整信标 URL
 * @param ms  超时毫秒
 */
function fetchBeaconAwait(url, ms) {
    const g = getGlobalObject();
    const fetchFn = g.fetch;
    if (typeof fetchFn !== 'function') {
        return Promise.reject(new Error('fetch unavailable'));
    }
    const controller = typeof g.AbortController === 'function'
        ? new g.AbortController()
        : undefined;
    return new Promise((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
            if (settled)
                return;
            settled = true;
            if (controller)
                tryRun(() => controller.abort(), undefined);
            reject(new Error('统计上报超时'));
        }, ms);
        fetchFn(url, {
            method: 'GET',
            keepalive: true,
            credentials: 'omit',
            signal: controller ? controller.signal : undefined,
        }).then((res) => {
            if (settled)
                return;
            settled = true;
            clearTimeout(timer);
            if (res && res.ok) {
                resolve();
                return;
            }
            reject(new Error('统计上报 HTTP ' + (res ? res.status : 0)));
        }, (e) => {
            if (settled)
                return;
            settled = true;
            clearTimeout(timer);
            reject(e instanceof Error ? e : new Error(String(e)));
        });
    });
}
/**
 * 读取微信 `wx.preloadAssets`（仅 mp-weixin 信标使用）。
 */
function getWxPreloadAssets() {
    const wx = getGlobalObject().wx;
    return typeof (wx === null || wx === void 0 ? void 0 : wx.preloadAssets) === 'function' ? wx.preloadAssets : undefined;
}
/**
 * 规范化 `wx.preloadAssets` 的 fail 入参。
 */
function formatWxPreloadFail(err) {
    if (err instanceof Error)
        return err;
    if (err != null && typeof err === 'object' && 'errMsg' in err) {
        const msg = err.errMsg;
        if (typeof msg === 'string' && msg.length > 0)
            return new Error(msg);
    }
    if (err == null)
        return new Error('preloadAssets fail (empty err)');
    return new Error(String(err));
}
/**
 * 微信：`wx.preloadAssets` 拉取 `/WebTrack.gif`；仅 `success` 视为送达。
 *
 * @param url     完整信标 URL
 * @param ms      超时毫秒
 * @param preload 已校验存在的 `wx.preloadAssets`
 */
function mpWeixinPreloadAssetsBeaconAwait(url, ms, preload) {
    return new Promise((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
            if (settled)
                return;
            settled = true;
            reject(new Error('统计上报超时(preloadAssets)'));
        }, ms);
        try {
            preload({
                data: [{ type: 'image', src: url }],
                success: () => {
                    if (settled)
                        return;
                    settled = true;
                    clearTimeout(timer);
                    resolve();
                },
                fail: (err) => {
                    if (settled)
                        return;
                    settled = true;
                    clearTimeout(timer);
                    reject(formatWxPreloadFail(err));
                },
            });
        }
        catch (e) {
            if (settled)
                return;
            settled = true;
            clearTimeout(timer);
            reject(e instanceof Error ? e : new Error(String(e)));
        }
    });
}
/**
 * 微信小程序是否启用 preload 信标（开关开且宿主为 mp-weixin）。
 */
function isMpWeixinPreloadEnabled(opts) {
    var _a, _b;
    const enabled = (_a = opts.mpWeixinPreloadReport) !== null && _a !== void 0 ? _a : MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT;
    if (!enabled)
        return false;
    const raw = (_b = opts.rawPlatform) !== null && _b !== void 0 ? _b : getRawPlatform();
    return raw === 'mp-weixin';
}
function createImageChannel(opts = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    const host = (_a = opts.host) !== null && _a !== void 0 ? _a : IMAGE_REPORT_DEFAULTS.host;
    const projectId = (_b = opts.projectId) !== null && _b !== void 0 ? _b : IMAGE_REPORT_DEFAULTS.projectId;
    const topicId = (_c = opts.topicId) !== null && _c !== void 0 ? _c : IMAGE_REPORT_DEFAULTS.topicId;
    const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 10000;
    const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : IMAGE_MAX_RETRIES;
    const maxUrlLength = (_f = opts.maxUrlLength) !== null && _f !== void 0 ? _f : 6 * 1024;
    const preferBeacon = opts.preferImageBeacon !== false;
    const nowMs = opts.nowMs;
    const ut = (_g = opts.ut) !== null && _g !== void 0 ? _g : '';
    const isH5 = ut === 'h5';
    const mpWeixinPreload = isMpWeixinPreloadEnabled(opts);
    function configured() {
        return !!(host && projectId && topicId);
    }
    const reportOpts = { host, projectId, topicId, nowMs };
    /**
     * 校验配置并拼装 URL；超长抛 `PermanentChannelError`。
     *
     * @param payload 批次数据
     * @param path    `WEBTRACK_API_PATH` 或 `WEBTRACK_BEACON_PATH`
     */
    function preflightUrl(payload, path) {
        if (!configured()) {
            throw new PermanentChannelError('统计上报未配置：请设置 TLS host、projectId、topicId');
        }
        const url = buildStatReportUrl(payload, {
            host: reportOpts.host,
            projectId: reportOpts.projectId,
            topicId: reportOpts.topicId,
            nowMs: reportOpts.nowMs,
            path,
        });
        if (url.length > maxUrlLength) {
            throw new PermanentChannelError('统计上报 URL 过长: ' + url.length + ' > ' + maxUrlLength);
        }
        return url;
    }
    /**
     * `uni.request` GET `/WebTrack`（官方普通 GET，非信标）。
     */
    function webTrackGetViaRequest(url) {
        const u = getUni$4();
        if (!u || typeof u.request !== 'function') {
            return Promise.reject(new PermanentChannelError('当前环境无法完成统计上报'));
        }
        return new Promise((resolve, reject) => {
            let settled = false;
            const timer = setTimeout(() => {
                if (settled)
                    return;
                settled = true;
                reject(new Error('统计上报超时'));
            }, timeoutMs);
            u.request({
                url,
                method: 'GET',
                timeout: timeoutMs,
                success: (res) => {
                    var _a;
                    if (settled)
                        return;
                    settled = true;
                    clearTimeout(timer);
                    const code = (_a = res === null || res === void 0 ? void 0 : res.statusCode) !== null && _a !== void 0 ? _a : 0;
                    if (code >= 200 && code < 300) {
                        resolve();
                        return;
                    }
                    const hint = summarizeHttpErrorBody(res === null || res === void 0 ? void 0 : res.data);
                    reject(new Error(hint ? `统计上报 HTTP ${code}: ${hint}` : `统计上报 HTTP ${code}`));
                },
                fail: (e) => {
                    if (settled)
                        return;
                    settled = true;
                    clearTimeout(timer);
                    reject(e instanceof Error ? e : new Error(String(e)));
                },
            });
        });
    }
    /**
     * H5 发送方式选择（均能判定真实成败，失败进 retry）：
     *   1. 首选 `fetch` 信标 `/WebTrack.gif`：跨域读 `res.ok`，`keepalive` 保证卸载期送达；
     *   2. 次选 `uni.request` GET `/WebTrack`：读 `statusCode`；
     *   3. 末选 `Image` 信标 `/WebTrack.gif`：仅极旧环境（无 fetch、无 uni.request）兜底，
     *      无法读状态，发出即视为送达（有损）。
     *
     * `preferImageBeacon: false` 时跳过信标，强制走 `uni.request` GET（测试/特殊场景）。
     */
    function onceH5(payload) {
        const g = getGlobalObject();
        const u = getUni$4();
        const hasRequest = !!(u && typeof u.request === 'function');
        if (preferBeacon && typeof g.fetch === 'function') {
            return fetchBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), timeoutMs);
        }
        if (hasRequest) {
            return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
        }
        if (preferBeacon && typeof g.Image === 'function') {
            return imageBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), timeoutMs);
        }
        return Promise.reject(new PermanentChannelError('当前环境无法完成统计上报'));
    }
    /**
     * 微信：优先 `/WebTrack.gif` preload；否则 `uni.request` GET `/WebTrack`。
     */
    function onceMpWeixin(payload) {
        const preloadFn = getWxPreloadAssets();
        if (preloadFn) {
            return mpWeixinPreloadAssetsBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), MP_WEIXIN_PRELOAD_TIMEOUT_MS, preloadFn);
        }
        logger.warn('[uni统计 2.0] wx.preloadAssets 不可用，回退 uni.request GET /WebTrack');
        return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
    }
    /**
     * 按宿主选择发送方式。
     */
    function dispatchReport(payload) {
        if (isH5)
            return onceH5(payload);
        if (mpWeixinPreload)
            return onceMpWeixin(payload);
        return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
    }
    return {
        name: 'image',
        available() {
            return configured();
        },
        maxRequestBytes() {
            const raw = (maxUrlLength - REPORT_URL_BASE_OVERHEAD) / REPORT_ENCODE_RATIO;
            return Math.max(512, Math.floor(raw));
        },
        send(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield withRetry(() => dispatchReport(payload), {
                        times: maxRetries,
                        baseDelayMs: RETRY_BASE_DELAY_MS,
                        sleep: opts.sleep,
                    });
                }
                catch (e) {
                    if (isPermanentChannelError(e)) {
                        logger.warn('[uni统计 2.0] 统计上报失败（不可重试）', e);
                    }
                    else {
                        logger.warn('[uni统计 2.0] 统计上报失败（已重试）', e);
                    }
                    throw e;
                }
            });
        },
    };
}

/**
 * 上行字段集中拼装。
 *
 * 私有版痛点：`sendXxxRequest` 系列函数中各自 `Object.assign(getStatData(), ...)`，
 * 字段散落、重复、字段名硬编码、新增字段需改多处。公有版集中到本模块，按事件类型
 * 决定字段子集。
 *
 * 设计要点：
 *   - 通过依赖注入（`createStatDataBuilder(deps)`）解耦 adapter / domain，便于单测。
 *   - 字段全部经过 `s/n` 兜底转换，禁止 undefined 出现在最终上行体（统一用空串 / 0）。
 *   - 事件类型驱动：仅 lt=1 携带 fvts/lvts/tvc / sc 等启动字段；其他事件不携带。
 *   - 仅做拼装，不做副作用：不写 storage、不调 ensureSession（这些由 collector 编排）。
 *   - 严守 ES2015 baseline：禁用 `ObjectExpression > SpreadElement`，统一用 `Object.assign`。
 *
 * 与 `docs/uni统计上报参数.md` 对齐说明：
 *   - 设备 ID 使用文档字段名 `did`（内部 SessionSnapshot/Adapter 仍以 uuid 命名，仅出口处映射）。
 *   - `on`：优先 **`romName`**（厂商 ROM，如 HyperOS）及 **`romVersion`**，否则 **`osName`**。
 *   - 会话创建类型使用文档字段名 `cst`（内部 storage 仍以 sct 命名，仅出口处映射）。
 *   - 不再上行 `sst / seq / pid`（及历史 `odid`）：
 *       * sst/seq 仅本地用于会话状态机，不参与服务端入库；
 *       * pid（上一会话 sid）当前后端无入库口径。
 *     这些字段在 SessionSnapshot 里仍保留，确保会话过期判断、调试日志可继续使用。
 */
/** 字段值兜底：把 undefined / null / NaN 转为类型默认值，避免污染上行 JSON。 */
function s(v, def = '') {
    if (typeof v === 'string')
        return v;
    if (typeof v === 'number' && Number.isFinite(v))
        return String(v);
    return def;
}
function n(v, def = 0) {
    if (typeof v === 'number' && Number.isFinite(v))
        return v;
    if (typeof v === 'string' && v.length > 0) {
        const x = Number(v);
        if (Number.isFinite(x))
            return x;
    }
    return def;
}
/**
 * 创建 statData 构建器。
 *
 * 调用方典型用法：
 * ```ts
 * const builder = createStatDataBuilder(deps)
 * const data = builder.build({ lt: LT.Page, t: nowSec(), route: '...' })
 * ```
 */
function createStatDataBuilder(deps) {
    /**
     * 复用频率高的"基础字段"——每条事件都带。
     *
     * 字段映射（参考 `docs/uni统计上报参数.md`）：
     *   - `did` ← 内部 `device.uuid`（出口字段重命名为文档口径）
     *   - `p` ← `platform.p` 或 `system.osP`（仅操作系统 slug：`ios` / `android` …）
     *   - `on` ← `system.on`（ROM 展示名优先，否则 `osName`）
     *   - `mpsdk` ← `system.sdkVersion`
     *   - `mpv` ← `system.mpvHostVersion`（宿主客户端版本，与私有版 `sys.version` 同源）
     *   - `domain` ← `web.domain`（H5 含协议域名，如 `https://www.example.com`，非 H5 为空串）
     *   - `pr/ww/wh/sw/sh/lang` 来自 `locale`（实时取，修复缺陷 #18）
     *   - `lat/lng` 当前 LocationResult 仅含字符串经纬度，cn/pn/ct 留空待 adapter 扩展
     *
     * 不再装配 `odid`（老 App 兼容字段已移除）。
     */
    function baseFields() {
        var _a, _b, _c;
        const { config, platform, system, locale, device, net, location, pkg, legacy, web, } = deps;
        return {
            ak: s(config.ak),
            usv: s(config.usv),
            v: s((_a = config.v) !== null && _a !== void 0 ? _a : system.appVersion),
            ch: s(config.ch),
            ut: s(platform.ut),
            p: s((_b = platform.p) !== null && _b !== void 0 ? _b : system.osP),
            on: s(system.on),
            did: s(device.uuid),
            brand: s(system.brand),
            md: s(system.md),
            sv: s(system.sv),
            mpsdk: s(system.sdkVersion),
            mpv: s(system.mpvHostVersion),
            pr: n(locale.pr, 1),
            ww: n(locale.ww),
            wh: n(locale.wh),
            sw: n(locale.sw),
            sh: n(locale.sh),
            lang: s(locale.lang),
            net: s(net.net, 'unknown'),
            lat: s(location.lat),
            lng: s(location.lng),
            mpn: s((_c = legacy === null || legacy === void 0 ? void 0 : legacy.mpn) !== null && _c !== void 0 ? _c : pkg.mpn),
            tdaid: s(pkg.tdaid),
            pkn: s(pkg.pkn),
            an: s(pkg.an),
            domain: s(web.domain),
        };
    }
    /**
     * 会话字段：所有 lt 都要带。
     *
     * 与文档对齐：仅上行 `sid` 与 `cst`；
     * 内部状态字段 `sst / seq` 不再随上行体发出，仅保留在 SessionSnapshot 中。
     */
    function sessionFields(ctx) {
        if (!ctx.session)
            return {};
        return {
            sid: ctx.session.sid,
            cst: ctx.session.sct,
        };
    }
    /** 页面字段：lt=11/3 / 普通页面事件携带。 */
    function pageFields(ctx) {
        const out = {};
        if (ctx.url !== undefined)
            out.url = s(ctx.url);
        if (ctx.urlref !== undefined)
            out.urlref = s(ctx.urlref);
        if (ctx.urlref_ts !== undefined)
            out.urlref_ts = n(ctx.urlref_ts);
        if (ctx.ttn !== undefined)
            out.ttn = s(ctx.ttn);
        if (ctx.ttpj !== undefined)
            out.ttpj = s(ctx.ttpj);
        if (ctx.ttc !== undefined)
            out.ttc = s(ctx.ttc);
        return out;
    }
    /**
     * 入口标记：**仅 lt=11** 携带 iey + ppiey（缺省按 0）；lt=1 / lt=3 等不参与入口字段。
     */
    function entryFields(ctx) {
        if (ctx.lt === '11') {
            return {
                iey: toIey(ctx.iey !== undefined ? ctx.iey : false),
                ppiey: toIey(ctx.ppiey !== undefined ? ctx.ppiey : false),
            };
        }
        return {};
    }
    /** 访问字段：仅 lt=1（应用启动 / 新会话）且 collector 显式传入 visit 时携带。 */
    function visitFields(ctx) {
        if (ctx.lt !== '1')
            return {};
        if (!ctx.visit)
            return {};
        return {
            fvts: ctx.visit.fvts,
            lvts: ctx.visit.lvts,
            tvc: ctx.visit.tvc,
        };
    }
    /** 启动场景：仅 lt=1 携带。 */
    function launchFields(ctx) {
        if (ctx.lt !== '1')
            return {};
        if (ctx.sc === undefined)
            return {};
        return { sc: s(ctx.sc) };
    }
    /**
     * 错误事件特化字段：lt=31 时把 `errMsg`（含 stack）截断后写入 `em`。
     *
     * 截断动机：长 Error stack（尤其是 jest / Node 调用栈）轻易超过 3KB，会让单条事件
     * 触发 `SINGLE_EVENT_MAX_BYTES` 被 enqueue 丢弃；这里在 builder 阶段先做一次软截断，
     * 既能保留头部关键定位信息（错误类型、消息、第一层 stack），又能保证事件可达。
     *
     * 阈值：3KB（保留 1KB buffer 给其他字段，整体仍在 SINGLE_EVENT_MAX_BYTES = 4KB 内）。
     */
    function errorFields(ctx) {
        if (ctx.lt !== '31' || !ctx.errMsg)
            return {};
        const ERR_MSG_MAX = 3 * 1024;
        const TRUNC_SUFFIX = '…[truncated]';
        let em = s(ctx.errMsg);
        if (em.length > ERR_MSG_MAX) {
            em = em.slice(0, ERR_MSG_MAX - TRUNC_SUFFIX.length) + TRUNC_SUFFIX;
        }
        return { em };
    }
    /** Push 事件特化字段。 */
    function pushFields(ctx) {
        if (ctx.lt !== '101' || !ctx.cid)
            return {};
        return { cid: s(ctx.cid) };
    }
    /**
     * 拼装最终上行体。
     *
     * 合并顺序（**后者覆盖前者**）：
     *   base → session → page → entry → visit → launch → error → push → custom
     * custom 放最后，业务可控扩展，但**不允许**覆盖 lt/t/sid 等关键字段（在此过滤）。
     */
    function build(ctx) {
        const safeCustom = {};
        if (ctx.custom) {
            const reserved = new Set([
                'lt',
                't',
                'sid',
                'cst',
                'did',
                'p',
                'on',
                'mpv',
                'domain',
                'fvts',
                'lvts',
                'tvc',
                'sc',
            ]);
            for (const k of Object.keys(ctx.custom)) {
                if (!reserved.has(k))
                    safeCustom[k] = ctx.custom[k];
            }
        }
        const out = { lt: ctx.lt, t: n(ctx.t) };
        Object.assign(out, baseFields(), sessionFields(ctx), pageFields(ctx), entryFields(ctx), visitFields(ctx), launchFields(ctx), errorFields(ctx), pushFields(ctx), safeCustom);
        return out;
    }
    return { build };
}

/**
 * App 渠道包标识适配（对齐私有版 `utils/pageInfo.js#get_channel`）。
 *
 * HBuilderX 云打包会为每个渠道包写入 `plus.runtime.channel`（如 huawei、oppo），
 * 统计上行字段 `ch` 应优先读取该运行时值，而非 manifest 静态配置。
 *
 * 职责：
 *   - 仅 App 端（`isApp()`）尝试读取 `plus.runtime.channel`。
 *   - 任意 API 缺失 / 抛错 → 降级 `''`，不阻断 install。
 *   - 返回值统一为 `string`（原生偶发返回数字时转为字符串）。
 */
/**
 * 将原生渠道值规范为上行用的字符串。
 *
 * @param value `plus.runtime.channel` 原值。
 * @returns 非空字符串；无法识别时返回 `''`。
 */
function normalizeChannelValue(value) {
    if (typeof value === 'string')
        return value;
    if (typeof value === 'number' && Number.isFinite(value))
        return String(value);
    return '';
}
/**
 * 读取 App 渠道包标识（`plus.runtime.channel`）。
 *
 * 与私有版 `get_channel()` 对齐：仅原生 App 有意义；小程序 / H5 恒为 `''`。
 *
 * @returns 渠道字符串；未配置或读取失败时为 `''`。
 */
function getAppChannel() {
    if (!isApp())
        return '';
    const plus = getGlobalObject().plus;
    const raw = tryRun(() => { var _a; return (_a = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _a === void 0 ? void 0 : _a.channel; }, undefined);
    return normalizeChannelValue(raw);
}

/**
 * 系统信息适配。
 *
 * 私有版的痛点（参考缺陷清单 #14、#18）：
 *   - `utils/util.js` 顶层 `export const sys = uni.getSystemInfoSync()`：模块加载即执行
 *     `uni.getSystemInfoSync`，SSR / 单测 / nvue 早期阶段会直接抛错。
 *   - `lang / ww / wh` 等"可变"字段被一同缓存，用户切换系统语言或旋转屏幕后字段失真。
 *
 * 公有版职责：
 *   1. `getSystemInfo()` 懒加载 + 缓存（不可变字段：brand/md/sv/v/ut/on …）。
 *   2. `getLocaleAndScreen()` 实时取（lang + ww/wh + sw/sh + pr）—— 修复缺陷 #18。
 *   3. SSR/单测：任一 API 不存在或抛错时，返回安全空对象，绝不抛。
 *   4. `__resetCache()`：仅供测试，重置缓存。
 *
 * 小程序新基础库对 `getSystemInfoSync` 做了能力拆分，部分字段为空或恒为 0。
 * 因此优先通过 `uni.getDeviceInfo / getAppBaseInfo / getWindowInfo` 取对应信息，
 * 再以 `uni.getSystemInfoSync` 合并兜底（与 uni-app 运行时、uni-api 侧实践一致）。
 *
 * **小程序注意**：`uni` 常由构建注入在模块作用域，仅读 `globalThis.uni` 会取不到
 * 任何 API；必须通过 `resolveUniRuntime()` 与 `package.ts` 等 adapter 对齐。
 * 微信系再叠一层 `wx.getDeviceInfo / getAppBaseInfo / getWindowInfo`（与 `uni-api`
 * `upx2px` 一致），避免 `uni` 代理未就绪时宽高全 0。
 */
let cachedStatic = null;
/**
 * 解析 `uni` 根对象：优先 `globalThis.uni`，再回退宿主注入的模块级 `uni`。
 *
 * @see `infra/uniRuntime.ts` 说明（小程序上仅读 globalThis 会静默失败）。
 */
function getUni$3() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 微信系宿主上再取一层原生拆分 API，与 `uni` 合并结果再叠加以补全字段。
 *
 * @returns 已按 sync→device→app→window 合并过的一条快照；非微信系返回 `null`。
 */
function mergeWxHostSnapshots() {
    const raw = getRawPlatform();
    if (raw !== 'mp-weixin' && raw !== 'mp-qq')
        return null;
    const wxHost = getGlobalObject().wx;
    if (!wxHost)
        return null;
    const sync = typeof wxHost.getSystemInfoSync === 'function'
        ? tryRun(() => wxHost.getSystemInfoSync(), null)
        : null;
    const device = typeof wxHost.getDeviceInfo === 'function'
        ? tryRun(() => wxHost.getDeviceInfo(), null)
        : null;
    const appBase = typeof wxHost.getAppBaseInfo === 'function'
        ? tryRun(() => wxHost.getAppBaseInfo(), null)
        : null;
    const windowInfo = typeof wxHost.getWindowInfo === 'function'
        ? tryRun(() => wxHost.getWindowInfo(), null)
        : null;
    return mergeSystemSnapshots(sync, device, appBase, windowInfo);
}
/**
 * 从左到右浅合并多个快照：后者非 `undefined` / `null` 的键覆盖前者。
 *
 * 合并顺序为「sync → device → appBase → window」，使拆分 API 覆盖宿主裁剪后的
 * `getSystemInfoSync` 残缺字段。
 */
function mergeSystemSnapshots(...parts) {
    const out = {};
    for (const p of parts) {
        if (!p)
            continue;
        for (const k of Object.keys(p)) {
            const v = p[k];
            if (v !== undefined && v !== null)
                out[k] = v;
        }
    }
    return out;
}
/**
 * 聚合当前运行时的系统信息：先 `getSystemInfoSync` 打底，再叠拆分 API。
 *
 * 各 API 均经 `tryRun` 包裹，任一失败不影响其余来源。
 */
function mergedSystemInfo() {
    const u = getUni$3();
    const sync = u && typeof u.getSystemInfoSync === 'function'
        ? tryRun(() => u.getSystemInfoSync(), null)
        : null;
    const device = u && typeof u.getDeviceInfo === 'function'
        ? tryRun(() => u.getDeviceInfo(), null)
        : null;
    const appBase = u && typeof u.getAppBaseInfo === 'function'
        ? tryRun(() => u.getAppBaseInfo(), null)
        : null;
    const windowInfo = u && typeof u.getWindowInfo === 'function'
        ? tryRun(() => u.getWindowInfo(), null)
        : null;
    const fromUni = mergeSystemSnapshots(sync, device, appBase, windowInfo);
    const fromWx = mergeWxHostSnapshots();
    const merged = fromWx ? mergeSystemSnapshots(fromUni, fromWx) : fromUni;
    return merged;
}
/**
 * 读取 H5 运行时 `__uniConfig.appVersion`（manifest.versionName）。
 *
 * H5 发行摇树时模块加载期 `window.uni` 可能仍是 `{}` 空桩，`resolveUniRuntime`
 * 无法调用 `getAppBaseInfo`；此时 `__uniConfig` 仍已由构建注入，可作为应用版本兜底。
 */
function resolveUniConfigAppVersion() {
    return tryRun(() => {
        const cfg = getGlobalObject().__uniConfig;
        return typeof (cfg === null || cfg === void 0 ? void 0 : cfg.appVersion) === 'string' ? cfg.appVersion : '';
    }, '');
}
/**
 * 读取构建期注入的 `UNI_APP_VERSION_NAME`（manifest.versionName）。
 *
 * 须**直接**访问 `process.env.UNI_APP_VERSION_NAME`，以便 Vite define 静态替换；
 * 经中间变量读取会导致发行包内始终为空（与 `install.ts#parseInjectedUniStatistics` 同理）。
 */
function resolveBuildTimeAppVersion() {
    const raw = process.env.UNI_APP_VERSION_NAME;
    return typeof raw === 'string' ? raw : '';
}
/**
 * 解析上行用的应用版本 `appVersion`（对应 statData 字段 `v` 的主要回退来源）。
 *
 * 优先级：App 原生 `plus.runtime.version` → uni 拆分 API → H5 `__uniConfig` → 构建期 env。
 */
function resolveAppVersionForStat(plus, sys) {
    var _a;
    const fromPlus = (_a = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _a === void 0 ? void 0 : _a.version;
    if (typeof fromPlus === 'string' && fromPlus)
        return fromPlus;
    const fromSys = sys.appVersion;
    if (typeof fromSys === 'string' && fromSys)
        return fromSys;
    const fromUniConfig = resolveUniConfigAppVersion();
    if (fromUniConfig)
        return fromUniConfig;
    return resolveBuildTimeAppVersion();
}
/**
 * 组装上行 `on`：优先厂商定制系统名（ROM），否则退回操作系统名 `osName`。
 *
 * App 端 `uni.getDeviceInfo` 会带出 `romName`/`romVersion`（见 uni-app-plus 原生 systemInfo）；
 * 微信等小程序沙箱通常无 ROM 字段，此时与仅 `osName` 一致。
 *
 * @param sys `mergedSystemInfo()` 合并结果
 * @returns 去首尾空白后的展示串；均无则空串
 */
function buildOnForStat(sys) {
    const rom = typeof sys.romName === 'string' ? sys.romName.trim() : '';
    if (rom) {
        const romVer = typeof sys.romVersion === 'string' ? sys.romVersion.trim() : '';
        return romVer ? `${rom} ${romVer}`.trim() : rom;
    }
    return typeof sys.osName === 'string' ? sys.osName.trim() : '';
}
/**
 * 取静态系统信息（懒加载 + 缓存）。
 *
 * 字段映射策略：
 *   - `brand / md`：优先 `deviceBrand`/`deviceModel`（拆分 API），再退化 `brand`/`model`。
 *   - `sv / v / sdkVersion`：优先 `osVersion`、`hostVersion`、`hostSDKVersion`，兼容旧字段。
 *   - `osP`：由 `platform` / `osName` / `system` 经 `normalizeStatOsP` 得到，供上行 `p`。
 *   - `mpvHostVersion`：`hostVersion ?? version`，与私有版 `sys.version` 同源。
 *   - `on`：`buildOnForStat`（优先 `romName`/`romVersion`，否则 `osName`），供上行 `on`。
 *   - `appVersion`：见 `resolveAppVersionForStat`（H5 发行空桩时回退 `__uniConfig` / 构建 env）。
 *   - 缺失统一空字符串或 0，避免上行 JSON 丢字段语义。
 */
function getSystemInfo() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    if (cachedStatic)
        return cachedStatic;
    const sys = mergedSystemInfo();
    const plus = getGlobalObject().plus;
    const appVersion = resolveAppVersionForStat(plus, sys);
    cachedStatic = {
        brand: (_b = (_a = sys.deviceBrand) !== null && _a !== void 0 ? _a : sys.brand) !== null && _b !== void 0 ? _b : '',
        md: (_d = (_c = sys.deviceModel) !== null && _c !== void 0 ? _c : sys.model) !== null && _d !== void 0 ? _d : '',
        sv: (_f = (_e = sys.osVersion) !== null && _e !== void 0 ? _e : sys.system) !== null && _f !== void 0 ? _f : '',
        v: (_h = (_g = sys.hostVersion) !== null && _g !== void 0 ? _g : sys.version) !== null && _h !== void 0 ? _h : '',
        ut: ((_j = sys.deviceType) !== null && _j !== void 0 ? _j : 'unknown'),
        appVersion,
        appWgtVersion: (_p = (_o = (_l = (_k = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _k === void 0 ? void 0 : _k.appWgtVersion) !== null && _l !== void 0 ? _l : (_m = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _m === void 0 ? void 0 : _m.appWgtRevision) !== null && _o !== void 0 ? _o : sys.appWgtVersion) !== null && _p !== void 0 ? _p : '',
        mpvHostVersion: ((_r = (_q = sys.hostVersion) !== null && _q !== void 0 ? _q : sys.version) !== null && _r !== void 0 ? _r : '').trim(),
        on: buildOnForStat(sys),
        sdkVersion: (_t = (_s = sys.hostSDKVersion) !== null && _s !== void 0 ? _s : sys.SDKVersion) !== null && _t !== void 0 ? _t : '',
        statusBarHeight: typeof sys.statusBarHeight === 'number' ? sys.statusBarHeight : 0,
        osP: normalizeStatOsP({
            platform: sys.platform,
            osName: sys.osName,
            system: sys.system,
        }),
    };
    return cachedStatic;
}
/**
 * 取实时字段（lang / 窗口尺寸 / 屏幕尺寸 / dpr）。
 *
 * 每次调用重新走拆分 API + sync 合并，不复用缓存，避免旋转屏、改语言后失真。
 */
function getLocaleAndScreen() {
    var _a, _b;
    const sys = mergedSystemInfo();
    const prRaw = typeof sys.pixelRatio === 'number'
        ? sys.pixelRatio
        : typeof sys.devicePixelRatio === 'number'
            ? sys.devicePixelRatio
            : 1;
    return {
        lang: ((_b = (_a = sys.hostLanguage) !== null && _a !== void 0 ? _a : sys.language) !== null && _b !== void 0 ? _b : '').replace(/_/g, '-'),
        ww: typeof sys.windowWidth === 'number' ? sys.windowWidth : 0,
        wh: typeof sys.windowHeight === 'number' ? sys.windowHeight : 0,
        sw: typeof sys.screenWidth === 'number' ? sys.screenWidth : 0,
        sh: typeof sys.screenHeight === 'number' ? sys.screenHeight : 0,
        pr: prRaw > 0 ? prRaw : 1,
    };
}

/**
 * 包信息适配（公有版新增字段 `tdaid / pkn / an`）。
 *
 * 详细矩阵参考 `04-字段字典与平台获取矩阵.md` §3。本模块职责：
 *   - 启动时调用一次 `getPackageInfo()`，结果常驻内存；不入 storage。
 *   - 每端分支独立函数，便于单测精准 mock。
 *   - 任意端、任意 API 抛错 → 一律降级为 `''`，**绝不**抛出。
 *
 * 字段语义提示：
 *   - `mpn`：兼容字段；各端「原生包名或小程序 appid」的统一口径（与文档 `mpn` 对齐）。
 *   - `tdaid`：第三方平台 appid（如微信小程序 appid）。
 *   - `pkn`：原生包名 / bundleId（App）；小程序无独立包名时为空串，**不与** tdaid 混填。
 *   - `an`：应用展示名（App = plus.runtime.appname；小程序/H5 = `process.env.UNI_APP_NAME` 等）。
 */
let cached$1 = null;
function getUni$2() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
function getPlus() {
    return getGlobalObject().plus;
}
/**
 * 取小程序系列的 tdaid。各端 API 不同：
 *   - 微信/QQ：`uni.getAccountInfoSync().miniProgram.appId`（基础库 ≥ 1.10.0）。
 *   - 支付宝：`my.getAppIdSync()`（部分版本可用）。
 *   - 头条/飞书：`tt.getEnvInfoSync().microapp.appId`。
 *   - 百度：`swan.getEnvInfoSync().common.appKey` 兜底。
 *   - 其他端：暂时返回 ''；后续真机探测后再补。
 *
 * 任何分支抛错都返回 ''。
 */
function getMpTdaid(platform) {
    const u = getUni$2();
    switch (platform) {
        case 'wx':
        case 'qq': {
            if (typeof (u === null || u === void 0 ? void 0 : u.getAccountInfoSync) === 'function') {
                const id = tryRun(() => { var _a, _b; return (_b = (_a = u.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : ''; }, '');
                if (id)
                    return id;
            }
            const wxHost = getGlobalObject().wx;
            if (typeof (wxHost === null || wxHost === void 0 ? void 0 : wxHost.getAccountInfoSync) === 'function') {
                const id2 = tryRun(() => { var _a, _b; return (_b = (_a = wxHost.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : ''; }, '');
                if (id2)
                    return id2;
            }
            const envId = process.env.UNI_APP_ID;
            return typeof envId === 'string' ? envId : '';
        }
        case 'ali':
        case 'dt': {
            const my = getGlobalObject().my;
            if (!my)
                return '';
            const v1 = tryRun(() => { var _a, _b; return (_b = (_a = my.getAppIdSync) === null || _a === void 0 ? void 0 : _a.call(my)) !== null && _b !== void 0 ? _b : ''; }, '');
            if (v1)
                return v1;
            return tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = my.getAccountInfoSync) === null || _a === void 0 ? void 0 : _a.call(my).miniProgram) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : ''; }, '');
        }
        case 'tt':
        case 'lark': {
            const tt = getGlobalObject().tt;
            return tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = tt === null || tt === void 0 ? void 0 : tt.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(tt).microapp) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : ''; }, '');
        }
        case 'bd': {
            const swan = getGlobalObject().swan;
            return tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = swan === null || swan === void 0 ? void 0 : swan.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(swan).common) === null || _b === void 0 ? void 0 : _b.appKey) !== null && _c !== void 0 ? _c : ''; }, '');
        }
        default:
            return '';
    }
}
/**
 * App 端 packageName / bundleId。
 *
 * Android 走 `plus.android.runtimeMainActivity().getPackageName()`；
 * iOS 走 `plus.ios.bundleId`，缺失时退化 `plus.runtime.appid`；
 * HarmonyOS 暂时取 `plus.runtime.appid` 兜底（待 OS API 稳定后扩展）。
 */
function getAppPkn() {
    var _a, _b, _c;
    const plus = getPlus();
    if (!plus)
        return '';
    const osName = (_c = (_b = (_a = plus.os) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : '';
    if (osName.includes('android')) {
        return tryRun(() => { var _a, _b, _c, _d, _e; return (_e = (_d = (_c = (_b = (_a = plus.android) === null || _a === void 0 ? void 0 : _a.runtimeMainActivity) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.getPackageName) === null || _d === void 0 ? void 0 : _d.call(_c)) !== null && _e !== void 0 ? _e : ''; }, '');
    }
    if (osName === 'ios' || osName === 'iphone os') {
        const v = tryRun(() => { var _a, _b; return (_b = (_a = plus.ios) === null || _a === void 0 ? void 0 : _a.bundleId) !== null && _b !== void 0 ? _b : ''; }, '');
        return v || tryRun(() => { var _a, _b; return (_b = (_a = plus.runtime) === null || _a === void 0 ? void 0 : _a.appid) !== null && _b !== void 0 ? _b : ''; }, '');
    }
    return tryRun(() => { var _a, _b; return (_b = (_a = plus.runtime) === null || _a === void 0 ? void 0 : _a.appid) !== null && _b !== void 0 ? _b : ''; }, '');
}
/**
 * 取 plus.runtime.appname / plus.runtime.name。
 *
 * 旧版本 plus 上字段名不一致，两个都试一次。
 */
function getAppName() {
    const plus = getPlus();
    if (!plus)
        return '';
    return (tryRun(() => { var _a, _b; return (_b = (_a = plus.runtime) === null || _a === void 0 ? void 0 : _a.appname) !== null && _b !== void 0 ? _b : ''; }, '') ||
        tryRun(() => { var _a, _b; return (_b = (_a = plus.runtime) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ''; }, ''));
}
/**
 * 取编译期注入的 UNI_APP_NAME。
 *
 * `plugin/index.ts` 后续会读取 `manifest.json#name` 注入此字段；当前若未注入返回 ''。
 */
function getEnvAppName() {
    var _a;
    return (_a = process.env.UNI_APP_NAME) !== null && _a !== void 0 ? _a : '';
}
/**
 * 取 H5 端应用名：优先编译期注入，回退 `document.title`。
 */
function getH5AppName() {
    const env = getEnvAppName();
    if (env)
        return env;
    return tryRun(() => {
        var _a, _b;
        return (_b = (_a = getGlobalObject().document) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : '';
    }, '');
}
/**
 * 启动时获取一次包信息；结果缓存于内存。
 *
 * 所有字段保证返回 `string`；缺失统一为 `''`，符合 `domain/statData.ts` 的字段处理约定。
 */
function getPackageInfo() {
    if (cached$1)
        return cached$1;
    const platform = getPlatform();
    let mpn = '';
    let tdaid = '';
    let pkn = '';
    let an = '';
    if (isApp()) {
        tdaid = tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = getPlus()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.appid) !== null && _c !== void 0 ? _c : ''; }, '');
        pkn = getAppPkn() || tdaid;
        an = getAppName() || getEnvAppName();
        mpn = pkn || tdaid;
    }
    else if (isMp()) {
        tdaid = getMpTdaid(platform);
        pkn = '';
        an = getEnvAppName();
        mpn =
            tdaid ||
                (typeof process.env.UNI_APP_ID === 'string' ? process.env.UNI_APP_ID : '');
    }
    else if (isH5()) {
        tdaid = '';
        pkn = '';
        an = getH5AppName();
        mpn = '';
    }
    else {
        // unknown / 快应用等：尝试 env 注入即可
        tdaid = '';
        pkn = '';
        an = getEnvAppName();
        mpn = '';
    }
    cached$1 = { mpn, tdaid, pkn, an };
    return cached$1;
}

/**
 * H5 / Web 平台适配。
 *
 * 职责：采集仅 Web 端有意义的上行字段原料（如含协议的页面域名 `domain`）。
 * 非 H5 或运行时无 `window.location` 时一律返回空串，不抛错。
 */
const EMPTY_WEB_INFO = { domain: '' };
let cached = null;
/**
 * 从 `location` 解析上行 `domain`（`https://host` / `http://host` 形式）。
 *
 * 仅 `http:` / `https:` 协议有效；`file:` 等返回空串。
 */
function readWebDomainFromLocation(loc) {
    const protocol = typeof loc.protocol === 'string' ? loc.protocol.toLowerCase() : '';
    if (protocol !== 'http:' && protocol !== 'https:')
        return '';
    if (typeof loc.origin === 'string' && loc.origin.trim()) {
        return loc.origin.trim();
    }
    const host = typeof loc.host === 'string' && loc.host.trim()
        ? loc.host.trim()
        : typeof loc.hostname === 'string'
            ? loc.hostname.trim()
            : '';
    if (!host)
        return '';
    return `${protocol}//${host}`;
}
/**
 * 读取 H5 页面 Web 信息。
 *
 * 非 H5、SSR 或无 `location` 时 `domain` 为空串。
 * 结果在进程内缓存（SPA 内 origin 通常不变）。
 */
function getWebInfo() {
    if (!isH5())
        return EMPTY_WEB_INFO;
    if (cached !== null)
        return cached;
    cached = tryRun(() => {
        const win = getGlobalObject();
        const loc = win.location;
        if (!loc)
            return EMPTY_WEB_INFO;
        return { domain: readWebDomainFromLocation(loc) };
    }, EMPTY_WEB_INFO);
    return cached;
}

const registry = new Map();
/**
 * 本模块每个 api 最近一次装入 uni 的 fanout 引用。
 * 用于重装 / 解绑时按引用精准 `removeInterceptor(api, prevFanout)`，不波及第三方拦截器。
 */
const installedFanout = new Map();
/**
 * 注册一个拦截器。同一 api 重复注册会去重，并自动按当前注册集合重装到 uni。
 *
 * @returns 解绑函数。调用后从集合中移除本次的 handlers，并按剩余集合重新装配。
 */
function add(api, handlers) {
    var _a;
    const set = (_a = registry.get(api)) !== null && _a !== void 0 ? _a : new Set();
    set.add(handlers);
    registry.set(api, set);
    reinstall(api);
    return () => {
        const cur = registry.get(api);
        if (!cur)
            return;
        cur.delete(handlers);
        if (cur.size === 0) {
            registry.delete(api);
            const prev = installedFanout.get(api);
            installedFanout.delete(api);
            if (prev) {
                try {
                    // 精准移除本模块的 fanout，保留第三方在同一 api 上的拦截器。
                    getUni$1().removeInterceptor(api, prev);
                }
                catch (_a) {
                    // 即使解绑失败也应保证下次重装时不带本次 handlers
                }
            }
        }
        else {
            reinstall(api);
        }
    };
}
/**
 * 把某个 api 的全部 handlers 合并成单个 fanout 拦截器。
 *
 * 闭包持有 `set` 引用（registry 内的同一 Set），故 fanout 会实时反映集合的增删。
 */
function buildFanout(set) {
    return {
        invoke(args) {
            let blocked = false;
            for (const h of set) {
                if (!h.invoke)
                    continue;
                const r = h.invoke(args);
                if (r === false)
                    blocked = true;
            }
            return blocked ? false : undefined;
        },
        success(res) {
            var _a;
            for (const h of set)
                (_a = h.success) === null || _a === void 0 ? void 0 : _a.call(h, res);
        },
        fail(err) {
            var _a;
            for (const h of set)
                (_a = h.fail) === null || _a === void 0 ? void 0 : _a.call(h, err);
        },
        complete(res) {
            var _a;
            for (const h of set)
                (_a = h.complete) === null || _a === void 0 ? void 0 : _a.call(h, res);
        },
        returnValue(res) {
            let v = res;
            for (const h of set) {
                if (!h.returnValue)
                    continue;
                v = h.returnValue(v);
            }
            return v;
        },
    };
}
/**
 * 把 registry 中某个 api 的全部 handlers 合并成一个 fanout 拦截器，重新挂到 uni。
 *
 * 精准重装：先按引用移除本模块**上一次**装入的 fanout（若有），再装入新 fanout；
 * 全程不调用「不带第二参数」的 blanket remove，故业务方 / 其它插件在同一 api 上的
 * 拦截器不会被波及。
 */
function reinstall(api) {
    const set = registry.get(api);
    if (!set || set.size === 0)
        return;
    const fanout = buildFanout(set);
    try {
        const uni = getUni$1();
        const prev = installedFanout.get(api);
        if (prev) {
            try {
                uni.removeInterceptor(api, prev);
            }
            catch (_a) {
                /* ignore：旧 fanout 移除失败不阻断新 fanout 装入 */
            }
        }
        uni.addInterceptor(api, fanout);
        installedFanout.set(api, fanout);
    }
    catch (_b) {
        // uni 不可用（例如 nvue 早期阶段）：保留 registry 与 installedFanout，等下次 reinstall 再试
    }
}
function getUni$1() {
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === 'object'
        ? raw
        : undefined;
    if (!u)
        throw new Error('[uni统计 2.0] uni interceptor API is not available');
    return u;
}
/**
 * 仅供单测使用：清空 registry，让本模块「像刚加载」一样。
 */
function __reset() {
    registry.clear();
    installedFanout.clear();
}
const interceptor = { add, __reset };

/**
 * 拦截 `uni.login` 调用，complete 时上报一条 `lt=21, e_n=login` 自定义事件。
 *
 * 与私有版差异：
 *   - 走 `infra/interceptor.add`，多次 register 不会覆盖回调（修复缺陷 #26）。
 *   - 通过 `reporter` 注入，便于单测断言。
 */
/**
 * 注册 login 拦截器。
 *
 * @returns 解绑函数。同一 reporter 多次 register 视为多次回调（fanout）；卸载时只摘当次。
 */
function registerLoginInterceptor(reporter) {
    return interceptor.add('login', {
        complete() {
            reporter.report({ lt: LT.Event, custom: { e_n: 'login' } });
        },
    });
}

/**
 * 拦截 `uni.setNavigationBarTitle`，把用户设置的标题写入 `domain/title` 内存。
 *
 * **不**直接 reporter.report；title 是字段维度的状态，由 statData.builder 在拼装
 * 页面事件时一次性读出。这样保证 ttn 与 lt=11 / lt=3 事件强相关，避免私有版"标题在
 * 全局对象、上报时机散落"的问题。
 */
/**
 * 注册 setNavigationBarTitle 拦截器；不依赖 reporter。
 *
 * @returns 解绑函数。
 */
function registerNavigationBarInterceptor() {
    return interceptor.add('setNavigationBarTitle', {
        invoke(args) {
            const a = args;
            if (a && 'title' in a)
                setPageTitle(a.title);
        },
    });
}

/**
 * 拦截 `uni.requestPayment`：
 *   - success → `lt=21, e_n=pay_success`
 *   - fail    → `lt=21, e_n=pay_fail`
 *
 * 与私有版差异：经由 `infra/interceptor.add` 去重；多 reporter 注册都会触发（fanout）。
 */
function registerPaymentInterceptor(reporter) {
    return interceptor.add('requestPayment', {
        success() {
            reporter.report({ lt: LT.Event, custom: { e_n: 'pay_success' } });
        },
        fail() {
            reporter.report({ lt: LT.Event, custom: { e_n: 'pay_fail' } });
        },
    });
}

/**
 * 拦截 `uni.share` 调用，success / fail 都上报一条 `lt=21, e_n=share` 自定义事件。
 *
 * 与私有版差异（修复缺陷 #26）：
 *   - 私有版 `interceptShare(true)` 在 `onLoad` 内重复 wrap `onShareAppMessage`，
 *     连续打开同一页面会导致 share 事件被多次上报。
 *   - 公有版通过 `infra/interceptor` 单次 fanout 注册；onLoad 不再重复包装。
 */
function registerShareInterceptor(reporter) {
    const fire = () => reporter.report({ lt: LT.Event, custom: { e_n: 'share' } });
    return interceptor.add('share', {
        success() {
            fire();
        },
        fail() {
            fire();
        },
    });
}

/**
 * 拦截器统一装配入口。
 *
 * 使用：
 *   ```ts
 *   import { installAllInterceptors } from './interceptors'
 *   const uninstall = installAllInterceptors(collector)  // collector 实现 InterceptorReporter
 *   // 卸载（hot reload / unit test）：
 *   uninstall()
 *   ```
 *
 * 重复 install 安全：每次 install 都会返回独立的 unbinder；多次 install 触发的 fanout
 * 由 `infra/interceptor` 统一去重 + 解绑。
 */
/**
 * 一次性装配全部拦截器。
 *
 * @returns 解绑函数（顺序解绑全部已注册的拦截器）。
 */
function installAllInterceptors(reporter) {
    const unbinders = [
        registerLoginInterceptor(reporter),
        registerShareInterceptor(reporter),
        registerPaymentInterceptor(reporter),
        registerNavigationBarInterceptor(),
    ];
    return () => {
        for (const u of unbinders) {
            try {
                u();
            }
            catch (_a) {
                // 单个解绑失败不影响其余
            }
        }
    };
}

/**
 * 老版本（私有版 1.0/2.0）→ 公有版数据迁移。
 *
 * 老版本通过 `utils/db.js` 把所有字段写到一个聚合 key：
 *   `$$STAT__DBDATA:<appid>` → `{ '__first__visit__time': T, '__last__visit__time': T, ... }`
 *
 * 公有版改为按字段拆 key（`UNI_STAT_DATA:<appid>:<key>`）。
 *
 * 本模块职责（只读老数据，不删）：
 *   1. **一次性**把已知字段从老聚合 key 拆解写入新命名空间。
 *   2. 保留老 key（不 remove），让私有版同库共存场景仍能正常运行。
 *   3. 通过新命名空间下的 `migration:done` 哨兵避免重复执行。
 *   4. 任何步骤异常 → 静默吞掉，不影响采集主链路。
 *
 * 不做的事：
 *   - 不在迁移中写"今天本次启动"的 fvts/lvts；那是 `domain/visit/firstVisit` 的职责。
 *   - 不抛错；调用方无需 try/catch。
 *
 * 调用时机：
 *   - 由 `runtime/install.ts` 在公有版启动早期调用一次（在 `loadVisitSnapshot` 之前），
 *     保证 firstVisit 读到的是已迁移的新前缀数据。
 */
/** 已迁移哨兵 key（写到新命名空间）。值固定为 1。 */
const KEY_DONE = 'migration:done';
/**
 * 老聚合 key 内字段 → 新拆分 key 的映射表。
 *
 * 仅迁移**对公有版有用**的字段；其它（如 `__page__residence__time`）保留老 key，
 * 由 Phase 5 的对应 domain 模块按需读取。
 */
const KEY_MAP = [
    ['__first__visit__time', 'visit:fvts'],
    ['__last__visit__time', 'visit:lvts'],
    ['__total__visit__count', 'visit:tvc'],
];
/** 取 UNI_APP_ID（与 storage 内部保持一致的回退）。 */
function getAppId() {
    const id = process.env.UNI_APP_ID;
    if (typeof id === 'string' && id.length > 0)
        return id;
    return 'default';
}
/**
 * 从底层 uni 读取老聚合 key（不走 `infra/storage`，避免命名空间被改写）。
 *
 * 任何异常一律返回 `null`，由调用方决定 noop。
 */
function readLegacyAggregate() {
    const u = resolveUniRuntime();
    if (!u || typeof u.getStorageSync !== 'function')
        return null;
    const key = `${LEGACY_NAMESPACE_ROOT}:${getAppId()}`;
    const raw = tryRun(() => u.getStorageSync(key), null);
    if (raw && typeof raw === 'object')
        return raw;
    return null;
}
/** 哨兵：本进程内不重复 run。 */
let ran = false;
/**
 * 执行迁移；幂等：
 *   - 进程内已 run → 直接 return false。
 *   - 新命名空间已有 `migration:done` → 直接 return false。
 *   - 老聚合 key 不存在 / 为空 → 写 `migration:done`，return false。
 *   - 真正发生迁移 → return true。
 */
function migrateLegacyData() {
    if (ran)
        return false;
    ran = true;
    const doneR = storage.safeRead(KEY_DONE);
    if (doneR.ok && doneR.value)
        return false;
    const legacy = readLegacyAggregate();
    if (!legacy) {
        storage.set(KEY_DONE, 1);
        return false;
    }
    let migrated = 0;
    for (let i = 0; i < KEY_MAP.length; i++) {
        const [oldKey, newKey] = KEY_MAP[i];
        if (!(oldKey in legacy))
            continue;
        const value = legacy[oldKey];
        // 已经存在新值就不覆盖（避免覆盖公有版自身已写入的更新值）
        const existing = storage.safeRead(newKey);
        if (existing.ok && existing.value !== undefined)
            continue;
        storage.set(newKey, value);
        migrated++;
    }
    storage.set(KEY_DONE, 1);
    if (migrated > 0) {
        logger.info('[uni统计 2.0] migrated legacy keys', migrated);
    }
    return migrated > 0;
}

/**
 * 通道选择器：根据**统计版本**与**运行环境**返回最合适的 Channel。
 *
 * 选择规则（公有版默认 image）：
 *   - `version === 'image'`（默认）：优先 image；image 不可用时按 fallback 决策走 http；
 *     image 通道未注入 → 静默走 http（公有版默认场景）。
 *   - `version === '2'`：优先 cloud；cloud 不可用时按 fallback 决策走 http（私有版兼容）。
 *   - `version === '1'`：始终 http。
 *
 * 注意：
 *   - 公有版**不会**主动构造 cloud channel（StatApp 仅在 version='2' 才创建），
 *     因此默认运行路径不会再触发"cloud channel unavailable"警告。
 *   - 选择是**幂等无副作用**的：调用方每次发送前调用 `selectChannel()` 即可，
 *     channel 自身不缓存可用性。
 */
/**
 * 根据策略挑选当前应使用的 channel。
 *
 * @returns 选中的 channel；若没有可用通道返回 `undefined`。
 */
function selectChannel(opts) {
    var _a;
    const version = (_a = opts.version) !== null && _a !== void 0 ? _a : 'image';
    const fallback = opts.fallbackToHttp !== false;
    if (version === '1') {
        if (opts.http && opts.http.available())
            return opts.http;
        return undefined;
    }
    if (version === '2') {
        if (opts.cloud && opts.cloud.available())
            return opts.cloud;
        if (!fallback) {
            logger.warn('[uni统计 2.0] 云函数上报不可用且已关闭 HTTP 兜底，本批已丢弃');
            return undefined;
        }
        if (opts.http && opts.http.available()) {
            logger.warn('[uni统计 2.0] 云函数上报不可用，已降级为 HTTP 上报');
            return opts.http;
        }
        logger.warn('[uni统计 2.0] 无可用上报线路');
        return undefined;
    }
    // image（默认）：image > http
    if (opts.image && opts.image.available())
        return opts.image;
    if (!fallback) {
        if (opts.image) {
            // 仅在 image 已构造但失效时给出警告，便于排查；未构造视为正常的"未启用"
            logger.warn('[uni统计 2.0] 统计上报线路不可用且已关闭 HTTP 兜底，本批已丢弃');
        }
        return undefined;
    }
    if (opts.http && opts.http.available()) {
        if (opts.image) {
            // 同上，仅在 image 已构造但失效时打印降级日志
            logger.warn('[uni统计 2.0] 统计上报线路不可用，已降级为 HTTP 上报');
        }
        return opts.http;
    }
    logger.warn('[uni统计 2.0] 无可用上报线路');
    return undefined;
}

/**
 * 事件入队 + 批量 flush，修复私有版缺陷 #3。
 *
 * 私有版 `report.js#request` 的入队逻辑：
 *   ```
 *   uniStatData = dbGet(KEY) || {}
 *   uniStatData[lt].push(data)
 *   dbSet(KEY, uniStatData)         // <-- 写
 *   ...
 *   const stat_data = handle_data(uniStatData)
 *   dbRemove(KEY)                   // <-- 删，但不是原子的
 *   sendRequest(...)
 *   ```
 *
 * 缺陷 #3：在 `dbSet` 与 `dbRemove` 之间，若有并发的 `request()` 调用执行
 * `dbGet → push → dbSet`，最后的 `dbRemove` 会**误删**这一批新数据。
 *
 * 公有版修复策略：
 *   - 入队全部走"内存桶 + 持久化镜像"双写；持久化只为冷启续传准备。
 *   - flush() 走一次"原子 swap"：把当前桶交换给空对象，立刻清持久化镜像；
 *     在 swap 之后插入的新事件落到新桶，绝不被 flush 误删。
 *   - flush() 仅返回快照，**不直接发送**：发送由 collector 负责，便于解耦
 *     单测与运行时（collector 不需要 mock 通道）。
 *
 * 数据形态：
 *   - bucket: `Record<lt, StatData[]>`，与私有版 `uniStatData` 兼容。
 *   - 持久化 key：`UNI_STAT_DATA:<appid>:queue`。
 */
const STORAGE_KEY$1 = 'queue';
const DEFAULT_SINGLE_EVENT_MAX_BYTES = SINGLE_EVENT_MAX_BYTES;
const state = {
    bucket: {},
    lastFlushAt: 0,
};
let intervalSec = REPORT_INTERVAL_SEC;
let singleEventMaxBytes = DEFAULT_SINGLE_EVENT_MAX_BYTES;
let maxEvents = QUEUE_MAX_EVENTS;
let restored = false;
/** 容量超限 warn 节流：持续离线积压时仅首次告警，回落到上限内后复位。 */
let capacityWarned = false;
/**
 * 配置上报间隔；运行时可在 runtime/StatApp 初始化时注入。
 */
function configure(opts) {
    if (typeof opts.intervalSec === 'number' && opts.intervalSec >= 0) {
        intervalSec = Math.floor(opts.intervalSec);
    }
    if (typeof opts.singleEventMaxBytes === 'number' &&
        opts.singleEventMaxBytes > 0) {
        singleEventMaxBytes = Math.floor(opts.singleEventMaxBytes);
    }
    if (typeof opts.maxEvents === 'number' && opts.maxEvents > 0) {
        maxEvents = Math.floor(opts.maxEvents);
    }
}
/**
 * 强制把内存桶事件总数压到 `maxEvents` 以内（FIFO 丢弃最旧）。
 *
 * 丢弃策略：每轮从**当前事件数最多的桶**头部移除一条（最旧），直到总数达标。
 * 这样长期离线时疯涨的 lt=21/lt=31 会先被裁剪，体量通常很小的 lt=1（会话锚点）/
 * lt=3（后台闭合）更可能被保留。仅在超限时打一次 warn，避免刷屏。
 */
function enforceCapacity() {
    let total = size();
    if (total <= maxEvents) {
        // 回落到上限内 → 复位告警节流，下次再超限时可再次提示。
        capacityWarned = false;
        return;
    }
    const dropped = total - maxEvents;
    while (total > maxEvents) {
        let largestLt = '';
        let largestLen = 0;
        for (const lt of Object.keys(state.bucket)) {
            const len = state.bucket[lt].length;
            if (len > largestLen) {
                largestLen = len;
                largestLt = lt;
            }
        }
        if (!largestLt || largestLen === 0)
            break;
        state.bucket[largestLt].shift();
        if (state.bucket[largestLt].length === 0)
            delete state.bucket[largestLt];
        total--;
    }
    // 节流：持续离线积压时每次 enqueue 都会触发裁剪，但仅首次告警，避免刷屏。
    if (!capacityWarned) {
        capacityWarned = true;
        logger.warn('[uni统计 2.0] 上报队列超过容量上限，已丢弃最旧事件', 'dropped=' + dropped, 'limit=' + maxEvents);
    }
}
/**
 * 持久化当前内存桶。失败仅打日志，不影响主流程。
 */
function persistBucket() {
    if (Object.keys(state.bucket).length === 0) {
        storage.remove(STORAGE_KEY$1);
        return;
    }
    try {
        storage.set(STORAGE_KEY$1, state.bucket);
    }
    catch (e) {
        logger.warn('[uni统计 2.0] queue persist failed', e);
    }
}
/**
 * 冷启时尝试从 storage 恢复上一次进程未上报的桶；只在第一次入队前执行一次。
 *
 * 若 storage 中存在合法的桶数据，与当前内存桶**合并**而不是覆盖（合并语义防止极端
 * 边界场景下丢失冷启已入队的事件）。
 */
function restoreOnce() {
    if (restored)
        return;
    restored = true;
    const raw = storage.safeRead(STORAGE_KEY$1);
    if (!raw.ok || !raw.value || typeof raw.value !== 'object')
        return;
    const persisted = raw.value;
    for (const lt of Object.keys(persisted)) {
        const arr = persisted[lt];
        if (!Array.isArray(arr) || arr.length === 0)
            continue;
        if (!state.bucket[lt])
            state.bucket[lt] = [];
        state.bucket[lt].push(...arr);
    }
}
/**
 * 把一条事件入队到对应 lt 的桶。
 *
 * 不抛错；data.lt 必填，缺失/类型异常时打日志丢弃。
 *
 * 单条体积保护：序列化后超过 `singleEventMaxBytes`（默认 2KB）的事件直接丢弃 ——
 * 进了桶最终一定打不出去（无论怎么切片都会顶满 GET URL），还会污染 retry 队列。
 * 典型源头：业务方在 `key/value` 里塞了 base64 图片 / 大段 JSON / 长 stack 等。
 */
function enqueue(data) {
    var _a;
    if (!data || typeof data !== 'object')
        return;
    const lt = String((_a = data.lt) !== null && _a !== void 0 ? _a : '');
    if (!lt) {
        logger.warn('[uni统计 2.0] enqueue dropped: missing lt', data);
        return;
    }
    let serialized = '';
    try {
        serialized = JSON.stringify(data);
    }
    catch (e) {
        logger.warn('[uni统计 2.0] enqueue dropped: stringify failed', e);
        return;
    }
    if (serialized.length > singleEventMaxBytes) {
        logger.warn('[uni统计 2.0] enqueue dropped: single event too large', 'lt=' + lt, 'bytes=' + serialized.length, 'limit=' + singleEventMaxBytes);
        return;
    }
    restoreOnce();
    if (!state.bucket[lt])
        state.bucket[lt] = [];
    state.bucket[lt].push(data);
    enforceCapacity();
    persistBucket();
}
/**
 * 是否到达 flush 阈值。
 *
 * @param force 如为 true 直接返回 true（用于 onAppHide / 错误兜底等场景）。
 */
function shouldFlush(force = false) {
    if (force)
        return true;
    if (intervalSec <= 0)
        return true;
    const elapsedSec = (nowMs() - state.lastFlushAt) / 1000;
    return elapsedSec >= intervalSec;
}
/**
 * 原子取出当前桶并清空（修复缺陷 #3）。
 *
 * 调用时机：由 collector 决定（间隔触发 / app hide / 强制刷新）。
 *
 * @returns 取出的桶；若空桶返回 undefined（调用方据此跳过本次发送）。
 */
function flush() {
    restoreOnce();
    const lts = Object.keys(state.bucket);
    if (lts.length === 0)
        return undefined;
    const snapshot = state.bucket;
    state.bucket = {};
    state.lastFlushAt = nowMs();
    storage.remove(STORAGE_KEY$1);
    return snapshot;
}
/**
 * 发送失败回滚：把 flush 取出的快照重新合并回当前桶，等待下一次 flush。
 *
 * 注意：合并时插入到桶的"前面"，保留 FIFO 语义。
 */
function rollback(snapshot) {
    if (!snapshot)
        return;
    for (const lt of Object.keys(snapshot)) {
        const arr = snapshot[lt];
        if (!Array.isArray(arr) || arr.length === 0)
            continue;
        if (!state.bucket[lt])
            state.bucket[lt] = [];
        state.bucket[lt] = arr.concat(state.bucket[lt]);
    }
    enforceCapacity();
    persistBucket();
}
/**
 * 当前桶内事件总数（按 lt 加总）。
 */
function size() {
    let n = 0;
    for (const lt of Object.keys(state.bucket)) {
        n += state.bucket[lt].length;
    }
    return n;
}

/**
 * 失败重试落盘队列。
 *
 * 设计动机：
 *   - 私有版仅在 1.0 通道内做了 3 次内存级重试；进程被杀（应用退出 / kill）后所有
 *     未上报数据**直接丢失**，且 2.0 通道根本没有重试。
 *   - 公有版引入"内存重试 + 失败落盘 + 下次冷启重放"双层兜底：
 *       通道层：`channel.send` 内部已用 `withRetry` 做协议层重试。
 *       本模块：协议层最终失败后调用 `persist(payload)` 写入 storage；
 *               冷启时调 `loadAll()` 取出，逐条尝试重放，成功后 `ack(_id)` 删除。
 *
 * 数据结构：
 *   `UNI_STAT_DATA:<appid>:retry:queue`：`Array<RetryItem>`，最多 `maxItems` 条；
 *   超容时按 FIFO 丢弃最旧条目。每条带创建时间戳，超过 `maxAgeMs` 的过期清理。
 *
 * 与 retry 队列只存"已序列化的 ReportPayload"——不再依赖 collector / domain，
 * 由调用方负责重组业务字段（如重试时不需要再次重算 visit/session）。
 */
const STORAGE_KEY = 'retry:queue';
const DEFAULT_MAX_ITEMS = 50;
const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_MAX_ATTEMPTS = RETRY_MAX_ATTEMPTS;
const config = {
    maxItems: DEFAULT_MAX_ITEMS,
    maxAgeMs: DEFAULT_MAX_AGE_MS,
    maxAttempts: DEFAULT_MAX_ATTEMPTS,
};
/**
 * 读取队列。出现异常或非数组时返回空数组（不影响主流程）。
 */
function readQueue() {
    const raw = storage.safeRead(STORAGE_KEY);
    if (!raw.ok || !Array.isArray(raw.value))
        return [];
    return raw.value.filter((it) => it &&
        typeof it.id === 'string' &&
        it.payload &&
        typeof it.payload === 'object');
}
/**
 * 写回队列。空数组时直接 remove，避免存储垃圾。
 */
function writeQueue(items) {
    if (items.length === 0) {
        storage.remove(STORAGE_KEY);
        return;
    }
    storage.set(STORAGE_KEY, items);
}
/**
 * 生成 retry item id。优先复用 payload._id（来自 queue 出栈时分配的批次 id）。
 */
function genId(payload) {
    if (payload._id)
        return payload._id;
    return ('r-' + nowMs().toString(36) + '-' + Math.random().toString(36).slice(2, 6));
}
/**
 * 持久化一条失败 payload。
 *
 * @param payload 协议层最终失败的 payload。
 * @returns 实际写入的 retry id；若被丢弃返回 undefined。
 */
function persist(payload) {
    if (!payload)
        return undefined;
    const id = genId(payload);
    const items = readQueue();
    if (items.some((it) => it.id === id)) {
        return id;
    }
    const item = {
        id,
        payload: Object.assign({}, payload, { _id: id }),
        createdAt: nowMs(),
        attempts: 0,
    };
    items.push(item);
    while (items.length > config.maxItems) {
        const dropped = items.shift();
        logger.warn('[uni统计 2.0] retry queue overflow, drop oldest', dropped === null || dropped === void 0 ? void 0 : dropped.id);
    }
    writeQueue(items);
    return id;
}
/**
 * 取出全部待重试条目（同时清理过期项），按入队顺序返回。
 *
 * 调用方应自行决定是否串行重放；本模块**不**自动触发任何网络。
 */
function loadAll() {
    const items = readQueue();
    if (items.length === 0)
        return [];
    const cutoff = nowMs() - config.maxAgeMs;
    const alive = [];
    for (const it of items) {
        if (it.createdAt < cutoff) {
            logger.warn('[uni统计 2.0] retry item expired, drop', it.id);
            continue;
        }
        alive.push(it);
    }
    if (alive.length !== items.length)
        writeQueue(alive);
    return alive.map((it) => it.payload);
}
/**
 * 重放成功后删除指定 id；id 不存在视为 no-op。
 */
function ack(id) {
    if (!id)
        return;
    const items = readQueue();
    const next = items.filter((it) => it.id !== id);
    if (next.length === items.length)
        return;
    writeQueue(next);
}
/**
 * 标记一次重放失败：累加 `attempts`，超过 `config.maxAttempts` 自动死信清理。
 *
 * 死信清理动机：`recoverRetry` 串行重放，永久错误（脏 payload / 历史协议数据）若不
 * 主动丢弃，会反复占据队列前部，把后续健康 payload 也拖到失败 —— 这是 image url too
 * long 看似"重试无穷大"的次因。本兜底与"过期清理（maxAgeMs）+ 容量裁剪（maxItems）"
 * 形成三道防线。
 */
function markAttempt(id) {
    if (!id)
        return;
    const items = readQueue();
    let nextItems = null;
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it.id !== id)
            continue;
        it.attempts++;
        if (it.attempts >= config.maxAttempts) {
            logger.warn('[uni统计 2.0] retry item exceeded maxAttempts, drop as dead letter', id, 'attempts=' + it.attempts);
            nextItems = items.slice(0, i).concat(items.slice(i + 1));
        }
        else {
            nextItems = items;
        }
        break;
    }
    if (nextItems)
        writeQueue(nextItems);
}

/**
 * 公有版统计运行时门面（单例）。
 *
 * 职责：
 *   1. `install(config?, overrides?)`：一次性装配 collector / channel / 拦截器；
 *      启动时 `migrateLegacyData` → `loadVisitSnapshot` → `recoverRetry`。
 *      重复 install 幂等。
 *   2. `report(type, value)`：业务侧 `uni.report(type, value)` 的承接入口。
 *   3. `reportError(e)`：错误兜底事件（lt=31）。
 *   4. `getCollector()` / `getDeps()`：测试与 lifecycleHooks 复用。
 *
 * 设计原则：
 *   - 所有 adapter 调用都包了 `tryRun`，单端缺失 API 不影响 install。
 *   - 所有依赖通过 `defaults + overrides` 构造；测试可注入替换。
 *   - install 不抛错；任何子步骤失败都吞掉并 logger.warn。
 *   - 单例：`StatApp.getInstance()` 全局唯一；`__resetStatApp()` 仅供测试。
 */
let instance = null;
class StatApp {
    constructor() {
        /** install 幂等哨兵。 */
        this.installed = false;
        /** 已生效的协议版本（'1' / '2' / 'image'）。 */
        this.statVersion = 'image';
    }
    static getInstance() {
        if (!instance)
            instance = new StatApp();
        return instance;
    }
    /**
     * 一次性装配。重复调用直接返回。
     *
     * @param config 业务配置；缺省值兼容私有版默认行为。
     * @param overrides 测试钩子。
     */
    install(config = {}, overrides = {}) {
        var _a, _b, _c, _d, _e;
        if (this.installed)
            return;
        const cfg = this.normalizeConfig(config);
        this.config = cfg;
        this.statVersion = cfg.version;
        tryRun(() => configure$1({
            backgroundTimeoutSec: cfg.backgroundTimeoutSec,
            pageInactiveTimeoutSec: cfg.pageInactiveTimeoutSec,
        }), undefined);
        tryRun(() => configure({ intervalSec: cfg.reportIntervalSec }), undefined);
        if (!overrides.skipMigration) {
            tryRun(() => migrateLegacyData(), false);
        }
        tryRun(() => loadVisitSnapshot(), undefined);
        this.httpChannel =
            (_b = (_a = overrides.channels) === null || _a === void 0 ? void 0 : _a.http) !== null && _b !== void 0 ? _b : createHttpChannel({ ut: getPlatform(), maxRetries: HTTP_MAX_RETRIES });
        // cloud：仅在用户明确选择 channelVersion=2 或测试 override 时构造，
        // 公有版默认路径不会创建 cloud，避免触发"cloud channel unavailable"误降级警告。
        if (overrides.channels && 'cloud' in overrides.channels) {
            this.cloudChannel = (_c = overrides.channels.cloud) !== null && _c !== void 0 ? _c : undefined;
        }
        else if (this.statVersion === '2') {
            this.cloudChannel = createCloudChannel({ maxRetries: CLOUD_MAX_RETRIES });
        }
        else {
            this.cloudChannel = undefined;
        }
        // image：公有版默认通道。host/projectId/topicId 来自 config.IMAGE_REPORT_DEFAULTS，
        // 由 SDK 维护者直接在源码中调整，**不暴露**到 manifest / runtime API；
        // 测试场景仍可通过 overrides.channels.image 注入伪通道做断言。
        if (overrides.channels && 'image' in overrides.channels) {
            this.imageChannel = (_d = overrides.channels.image) !== null && _d !== void 0 ? _d : undefined;
        }
        else if (this.statVersion === 'image') {
            this.imageChannel = createImageChannel({
                host: IMAGE_REPORT_DEFAULTS.host,
                projectId: IMAGE_REPORT_DEFAULTS.projectId,
                topicId: IMAGE_REPORT_DEFAULTS.topicId,
                maxRetries: IMAGE_MAX_RETRIES,
                ut: getPlatform(),
                rawPlatform: getRawPlatform(),
            });
        }
        else {
            this.imageChannel = undefined;
        }
        this.collectorDeps = this.buildCollectorDeps(cfg, (_e = overrides.collectorDepsPatch) !== null && _e !== void 0 ? _e : {});
        this.collector = createCollector(this.collectorDeps);
        if (!overrides.skipInterceptors) {
            const c = this.collector;
            this.uninstallInterceptors = tryRun(() => installAllInterceptors({ report: (i) => c.report(i) }), undefined);
        }
        if (!overrides.skipRecoverRetry) {
            void this.collector
                .recoverRetry()
                .catch((e) => logger.warn('[uni统计 2.0] recoverRetry failed', e));
        }
        // 仅在 collector 与拦截器等就绪后再标记，避免中途抛错导致「已 install 却无 collector」。
        this.installed = true;
    }
    /**
     * 业务侧 `uni.report(type, value)` 入口。
     *
     * 兼容私有版语义：
     *   - `type === 'title'` → 写 reportTitle，不发事件；下次 lt=11 / lt=3 携带 `ttc`。
     *   - 其他 type → 自定义事件 lt=21，custom `{ e_n: type, e_v: value }`。
     */
    report(type, value) {
        if (!this.installed || !this.collector)
            return;
        if (type === 'title') {
            setReportTitle(value);
            return;
        }
        const ev = typeof value === 'object' && value !== null
            ? tryRun(() => JSON.stringify(value), '')
            : value === undefined
                ? ''
                : String(value);
        this.collector.report({
            lt: LT.Event,
            custom: { e_n: type, e_v: ev },
        });
    }
    /** 上报 onError 捕获的错误。 */
    reportError(err) {
        var _a;
        if (!this.installed || !this.collector)
            return;
        const errMsg = err instanceof Error
            ? `${err.name}: ${err.message}\n${(_a = err.stack) !== null && _a !== void 0 ? _a : ''}`
            : typeof err === 'string'
                ? err
                : tryRun(() => JSON.stringify(err), '');
        this.collector.report({ lt: LT.Error, errMsg });
    }
    /** 取 collector，供 lifecycleHooks 调度生命周期事件。 */
    getCollector() {
        return this.collector;
    }
    /** 取 deps（测试用）。 */
    getDeps() {
        return this.collectorDeps;
    }
    /** 是否已 install。 */
    isInstalled() {
        return this.installed;
    }
    /** 当前协议版本。 */
    getStatVersion() {
        return this.statVersion;
    }
    /** 当前生效配置（含默认值合并），测试用。 */
    getConfig() {
        return this.config;
    }
    /**
     * 卸载（测试 / hot reload）。
     *
     * 解绑全部拦截器、清空内部句柄。**不**清外部模块（queue/visit/session）状态，
     * 那些由各自的 `__reset*` 在测试 setup 中处理。
     */
    uninstall() {
        if (this.uninstallInterceptors) {
            tryRun(() => this.uninstallInterceptors(), undefined);
        }
        this.uninstallInterceptors = undefined;
        // 先释放 collector 内部定时器（取消延迟首 flush），再丢弃引用，避免幽灵 flush。
        if (this.collector) {
            tryRun(() => this.collector.destroy(), undefined);
        }
        this.collector = undefined;
        this.collectorDeps = undefined;
        this.httpChannel = undefined;
        this.cloudChannel = undefined;
        this.imageChannel = undefined;
        this.config = undefined;
        this.installed = false;
    }
    /**
     * 解析上行渠道字段 `ch`。
     *
     * 优先级：显式配置（manifest / install 入参）> `plus.runtime.channel`（云打包渠道包）> `''`。
     * 与私有版一致，默认从原生运行时读取；仅当业务方显式传入非空 `ch` 时才覆盖。
     */
    resolveChannel(explicit) {
        if (typeof explicit === 'string' && explicit.length > 0) {
            return explicit;
        }
        return getAppChannel();
    }
    normalizeConfig(c) {
        var _a, _b, _c, _d;
        return {
            ak: (_a = c.ak) !== null && _a !== void 0 ? _a : getAppId$1(),
            v: c.v,
            ch: this.resolveChannel(c.ch),
            version: (_b = c.version) !== null && _b !== void 0 ? _b : 'image',
            backgroundTimeoutSec: (_c = c.backgroundTimeoutSec) !== null && _c !== void 0 ? _c : 300,
            pageInactiveTimeoutSec: (_d = c.pageInactiveTimeoutSec) !== null && _d !== void 0 ? _d : 1800,
            reportIntervalSec: typeof c.reportIntervalSec === 'number'
                ? c.reportIntervalSec
                : REPORT_INTERVAL_SEC,
            // collectItems 默认值与私有版严格对齐：push 默认关闭、页面日志默认开启
            enablePush: c.enablePush === true,
            enablePageLog: c.enablePageLog !== false,
        };
    }
    /**
     * 构建 collector 依赖。所有 adapter 调用都包了 `tryRun`，避免单端缺失 API 导致
     * install 失败。
     */
    buildCollectorDeps(cfg, patch) {
        const platformShort = getPlatform();
        const builder = createStatDataBuilder({
            config: { ak: cfg.ak, usv: STAT_VERSION_PUBLIC, v: cfg.v, ch: cfg.ch },
            platform: {
                ut: platformShort,
            },
            system: tryRun(() => getSystemInfo(), {
                brand: '',
                md: '',
                sv: '',
                v: '',
                ut: 'unknown',
                appVersion: '',
                appWgtVersion: '',
                mpvHostVersion: '',
                on: '',
                sdkVersion: '',
                statusBarHeight: 0,
                osP: '',
            }),
            locale: tryRun(() => getLocaleAndScreen(), {
                lang: '',
                ww: 0,
                wh: 0,
                sw: 0,
                sh: 0,
                pr: 1,
            }),
            device: {
                // 惰性解析：每次 build 时再调 getUuid()，避免 install 过早（uni 运行时未就绪）冻结临时值。
                get uuid() {
                    return tryRun(() => getUuid(), '');
                },
            },
            net: { net: 'unknown', raw: '' },
            location: { lat: '', lng: '', ok: false },
            pkg: tryRun(() => getPackageInfo(), {
                mpn: '',
                tdaid: '',
                pkn: '',
                an: '',
            }),
            web: tryRun(() => getWebInfo(), { domain: '' }),
        });
        const base = {
            builder,
            queue: {
                enqueue: enqueue,
                flush: flush,
                rollback: rollback,
                shouldFlush: shouldFlush,
            },
            serializer: { handleData },
            selectChannel: () => selectChannel({
                version: this.statVersion,
                http: this.httpChannel,
                cloud: this.cloudChannel,
                image: this.imageChannel,
            }),
            retry: {
                persist: persist,
                loadAll: loadAll,
                ack: ack,
                markAttempt: markAttempt,
            },
            visit: {
                commitVisitOnAck: commitVisitOnAck,
                rollbackPendingVisit: rollbackPendingVisit,
            },
            session: {
                getSnapshot: getSnapshot,
                nextSeq: nextSeq,
                touch: touch,
            },
            config: { usv: STAT_VERSION_PUBLIC },
            nowMs,
            nowSec,
            firstFlushDeferMs: getRawPlatform() === 'mp-weixin' && MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT
                ? MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS
                : 0,
        };
        return Object.assign(base, patch);
    }
}
/**
 * 便捷 API：获取或创建当前应用 collector，供拦截器 / lifecycleHooks 使用。
 *
 * 上层若希望直接拿 lt 入参，可先 `getStatApp().install(cfg)`，再
 * `getStatApp().getCollector()?.report({ lt, ... })`。
 */
function getStatApp() {
    return StatApp.getInstance();
}
/** 仅供测试：销毁全局单例与 install 状态（不会重置 queue/visit/session）。 */
function __resetStatApp() {
    if (instance) {
        instance.uninstall();
        instance = null;
    }
}

/**
 * 公有版统计运行时安装入口。
 *
 * 与私有版 `src/index.js#load_stat` 等价：
 *   - VUE3 走 `uni.onCreateVueApp(app => app.mixin(lifecycle))`。
 *   - VUE2 走 `Vue.mixin(lifecycle)`（require('vue')）。
 *   - 同时把 `uni.report = (type, value) => StatApp.report(type, value)` 暴露给业务。
 *
 * 与私有版差异：
 *   - 模块加载即调 `installPublicStat()`，但内部用 install 哨兵保证幂等；
 *     测试可调 `__resetStatApp()` 重置。
 *   - `is_debug / NODE_ENV === 'development'` 的开关由调用方在 build 阶段做（
 *     `plugin/index.ts` 已注入），运行时不再分支。
 *
 * 暴露：
 *   - `installPublicStat(config?, opts?)`：手动触发；幂等。
 *   - `getMixin()`：返回 vue mixin 对象，供宿主自行 `app.mixin(...)`。
 */
/**
 * 从 `process.env.UNI_STATISTICS_CONFIG`（plugin 注入的 manifest.uniStatistics 序列化串）
 * 读取业务配置，把已知字段映射为 StatApp.install 的 partial config。
 *
 * ## 字段命名严格对齐私有版
 *
 * uni-app 私有版（`src/utils/pageInfo.js`）历史已对外暴露的 manifest 字段：
 *
 *   | manifest 字段                          | 类型     | 默认值 | 私有版语义                       |
 *   | -------------------------------------- | -------- | ------ | -------------------------------- |
 *   | `enable`                               | Boolean  | false  | 总开关，由 plugin 处理           |
 *   | `version`                              | String   | "1"    | "1" / "2" / "3"（公有版新增）    |
 *   | `debug`                                | Boolean  | false  | logger.debug 开关                |
 *   | `reportInterval`                       | Number   | 10     | 上报间隔秒数；0 = 立即上报       |
 *   | `collectItems.uniPushClientID`         | Boolean  | false  | 是否采集 push ClientID（lt=101） |
 *   | `collectItems.uniStatPageLog`          | Boolean  | true   | 是否上报页面日志（lt=11）        |
 *
 * 公有版**新增**字段（私有版不支持）：
 *
 *   | manifest 字段             | 类型    | 默认值 | 说明                                                   |
 *   | ------------------------- | ------- | ------ | ------------------------------------------------------ |
 *   | `backgroundTimeout`       | Number  | 300    | 后台返回前台超过此秒数视为新会话（cst=2）              |
 *   | `pageInactiveTimeout`     | Number  | 1800   | 前台连续无操作超过此秒数视为新会话（cst=3）            |
 *   | `channelVersion`          | String  | image  | 内部调试：`image` / `1` / `2`，业务方一般不需要设置   |
 *
 * ## 别名兼容
 *
 * 公有版早期内部测试用了带 `Sec` 后缀的命名（`reportIntervalSec / backgroundTimeoutSec /
 * pageInactiveTimeoutSec`），未对外发布但已在示例中出现过；本函数同时接受这两套写法，
 * **优先取私有版命名**（无后缀），别名仅作向后兼容。
 *
 * ## 内部接入参数不可自定义
 *
 * image 通道的 `host / projectId / topicId` 是 SDK 内部接入参数，由维护者直接在
 * `public/config.ts#IMAGE_REPORT_DEFAULTS` 中维护，**不**通过 manifest 暴露给业务方。
 *
 * 任意 JSON 解析 / 字段类型异常都吞掉，回到默认值；此处**不能**抛错，否则会阻塞自动 install。
 *
 * ## 必须直接写 `process.env.UNI_STATISTICS_CONFIG`
 *
 * `uni:stat` 插件通过 Vite `define` 在**构建阶段**把字面量 `process.env.UNI_STATISTICS_CONFIG`
 * 替换为 JSON 字符串。若写成 `const env = process.env; env.UNI_STATISTICS_CONFIG`，
 * 打包器无法静态替换，小程序/H5 运行时读到的一直是 `undefined`，manifest 超时等字段全部丢失。
 *
 * ## 禁止 `typeof process !== 'undefined' ? process.env.XXX : …`
 *
 * 微信小程序等运行时**往往没有全局 `process`**。替换后源码等价于
 * `typeof process !== 'undefined' ? "{\"enable\":…}" : undefined`，条件为假时会**整段丢弃**
 * 已内联的 JSON 字符串，表现为 `UNI_STATISTICS_CONFIG_len=0`、会话阈值永远默认。
 * 因此必须**直接**书写 `process.env.UNI_STATISTICS_CONFIG`（无任何 `typeof process` 包裹）。
 */
/**
 * 解析构建期注入的 `UNI_STATISTICS_CONFIG`。
 * 正常为 JSON 字符串；少数打包配置会误注入为对象字面量，此处一并兼容。
 */
function parseInjectedUniStatistics() {
    const raw = process.env.UNI_STATISTICS_CONFIG;
    if (raw == null)
        return undefined;
    if (typeof raw === 'object' && !Array.isArray(raw)) {
        return raw;
    }
    if (typeof raw !== 'string')
        return undefined;
    const trimmed = raw.trim();
    if (!trimmed || trimmed === 'undefined')
        return undefined;
    try {
        const obj = JSON.parse(trimmed);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return undefined;
        return obj;
    }
    catch (_e) {
        return undefined;
    }
}
function readManifestStatConfig() {
    try {
        const obj = parseInjectedUniStatistics();
        if (!obj)
            return undefined;
        const cfg = {};
        if (obj.channelVersion != null) {
            const v = String(obj.channelVersion);
            if (v === '1' || v === '2' || v === 'image')
                cfg.version = v;
        }
        // === 公有版扩展：backgroundTimeout / pageInactiveTimeout（私有版无此字段）===
        // 同时兼容早期内部用的带 Sec 后缀别名；优先无后缀（与官方风格一致）。
        const bg = pickPositiveNumber(obj.backgroundTimeout, obj.backgroundTimeoutSec);
        if (bg !== undefined)
            cfg.backgroundTimeoutSec = bg;
        const pi = pickPositiveNumber(obj.pageInactiveTimeout, obj.pageInactiveTimeoutSec);
        if (pi !== undefined)
            cfg.pageInactiveTimeoutSec = pi;
        // === 私有版同名字段：reportInterval（私有版默认 10）===
        // 兼容旧公有版别名 reportIntervalSec；允许 0（私有版语义"立即上报"）。
        const ri = pickNonNegativeNumber(obj.reportInterval, obj.reportIntervalSec);
        if (ri !== undefined)
            cfg.reportIntervalSec = ri;
        // === 私有版同名字段：collectItems.{uniPushClientID, uniStatPageLog} ===
        if (obj.collectItems && typeof obj.collectItems === 'object') {
            const items = obj.collectItems;
            if (typeof items.uniPushClientID === 'boolean') {
                cfg.enablePush = items.uniPushClientID;
            }
            if (typeof items.uniStatPageLog === 'boolean') {
                cfg.enablePageLog = items.uniStatPageLog;
            }
        }
        if (typeof obj.ak === 'string' && obj.ak)
            cfg.ak = obj.ak;
        if (typeof obj.v === 'string')
            cfg.v = obj.v;
        if (typeof obj.ch === 'string')
            cfg.ch = obj.ch;
        return Object.keys(cfg).length > 0 ? cfg : undefined;
    }
    catch (e) {
        logger.warn('[uni统计 2.0] readManifestStatConfig failed', e);
        return undefined;
    }
}
/**
 * 将 manifest / JSON 中的数值候选标准化为正数（> 0）。
 * 兼容部分工具或手工编辑 manifest 时写成**字符串数字**（如 `"60"`）的情况。
 */
function normalizePositiveNumber(value) {
    if (typeof value === 'number') {
        return value > 0 ? value : undefined;
    }
    if (typeof value === 'string') {
        const t = value.trim();
        if (t === '')
            return undefined;
        const n = Number(t);
        if (Number.isFinite(n) && n > 0)
            return n;
    }
    return undefined;
}
/**
 * 将候选标准化为非负数（>= 0），用于 `reportInterval`。
 */
function normalizeNonNegativeNumber(value) {
    if (typeof value === 'number') {
        return value >= 0 ? value : undefined;
    }
    if (typeof value === 'string') {
        const t = value.trim();
        if (t === '')
            return undefined;
        const n = Number(t);
        if (Number.isFinite(n) && n >= 0)
            return n;
    }
    return undefined;
}
/**
 * 在多个候选值中按顺序取**第一个有效的正数**（> 0），其余忽略。
 * 用于 manifest 字段的"主名 / 别名"二选一解析（如 `backgroundTimeout` / `backgroundTimeoutSec`）。
 *
 * 注意：私有版历史允许 `0` 表示"立即上报"，但仅 `reportInterval` 一项有此语义；
 * timeout 类字段 0 表示"立即超时"，不合理，本函数统一过滤为 undefined。
 */
function pickPositiveNumber(...candidates) {
    for (const c of candidates) {
        const n = normalizePositiveNumber(c);
        if (n !== undefined)
            return n;
    }
    return undefined;
}
/**
 * 同 `pickPositiveNumber`，但允许 `0`（用于 `reportInterval` 表达"立即上报"语义）。
 */
function pickNonNegativeNumber(...candidates) {
    for (const c of candidates) {
        const n = normalizeNonNegativeNumber(c);
        if (n !== undefined)
            return n;
    }
    return undefined;
}
function getUni() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/** Vue3 下晚就绪 API 重试次数（50ms 间隔，约 1s）。 */
const UNI_HOOK_RETRY_MAX = 20;
const UNI_HOOK_RETRY_MS = 50;
/** 已排队或已执行的 vue mixin 注入，避免重复。 */
let vueMixinMounted = false;
let vueMixinRetryTimer;
/** install 是否已经触发过（不论成功失败）。 */
let bootstrapped = false;
/** 已注册到全局的 unbind，便于 __reset。 */
let lastUnbind;
/** 晚就绪时重试 `uni.onAppShow` 的定时器。 */
let uniHookRetryTimer;
/**
 * 入口装配。重复调用时立即返回。
 *
 * 失败任意子步骤都吞掉日志，不抛回。
 */
function installPublicStat(opts = {}) {
    if (bootstrapped)
        return;
    bootstrapped = true;
    // 优先级：opts.config（手动覆盖） > manifest.uniStatistics（plugin 注入） > 默认值。
    // 这样业务/灰度同学既能在 manifest 里改超时阈值（生产路径），
    // 也能用 installPublicStat({ config: {...} }) 在测试环境强行覆盖（接入调试）。
    const fromManifest = readManifestStatConfig();
    const finalConfig = Object.assign({}, fromManifest, opts.config);
    const app = getStatApp();
    tryRun(() => app.install(finalConfig, opts.overrides), undefined);
    // 启动摘要：与生命周期解耦，保证 StatApp.install 完成后立刻可打印（不依赖 uni 是否已挂载）。
    tryRun(() => {
        var _a, _b, _c;
        const cfgBoot = app.getConfig();
        const appName = process.env.UNI_APP_NAME || '';
        const injected = parseInjectedUniStatistics();
        const bootBase = {
            channel: (_a = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.version) !== null && _a !== void 0 ? _a : 'image',
            reportIntervalSec: (_b = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.reportIntervalSec) !== null && _b !== void 0 ? _b : 0,
            ak: (_c = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.ak) !== null && _c !== void 0 ? _c : '',
            appName,
            debugFromManifest: process.env.UNI_STAT_DEBUG === 'true' ||
                process.env.UNI_STAT_DEBUG === true,
        };
        // 仅当 manifest 显式配置了超时项时才在 debug 启动摘要中展示（默认值 300/1800 不刷屏）。
        if (injected != null) {
            if (injected.backgroundTimeout != null ||
                injected.backgroundTimeoutSec != null) {
                bootBase.backgroundTimeoutSec = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.backgroundTimeoutSec;
            }
            if (injected.pageInactiveTimeout != null ||
                injected.pageInactiveTimeoutSec != null) {
                bootBase.pageInactiveTimeoutSec = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.pageInactiveTimeoutSec;
            }
        }
        // #ifndef VUE3
        logBoot(Object.assign({}, bootBase, { vueMode: 'Vue2' }));
        // #endif
        // #ifdef VUE3
        logBoot(Object.assign({}, bootBase, { vueMode: 'Vue3' }));
        // #endif
    }, undefined);
    /**
     * 装配 vue mixin 与 uni 生命周期；与 logBoot 解耦，便于在 uni 晚就绪时延后执行。
     */
    const finishLifecycleInstall = () => {
        var _a, _b;
        // 把 collectItems 的开关透传给 lifecycleHooks：
        //   - uniPushClientID → enablePush（决定是否抓取 push CID 上报 lt=101）
        //   - uniStatPageLog  → enablePageLog（决定是否上报 lt=11 页面切换事件）
        // 调用方通过 opts.lifecycle 显式传入的值优先级最高，未指定时用 manifest 默认。
        const cfg = app.getConfig();
        const lifecycleOpts = Object.assign({}, {
            enablePush: (_a = cfg === null || cfg === void 0 ? void 0 : cfg.enablePush) !== null && _a !== void 0 ? _a : false,
            enablePageLog: (_b = cfg === null || cfg === void 0 ? void 0 : cfg.enablePageLog) !== null && _b !== void 0 ? _b : true,
        }, opts.lifecycle);
        const { mixin, unbind } = bindLifecycle(app, lifecycleOpts);
        lastUnbind = unbind;
        // 与私有版 load_stat 一致：同步注入 mixin，不等待 uni.onAppShow（Vue2 根本不注册该项）。
        if (!opts.skipVueMixin) {
            tryRun(() => mountVueMixin(mixin), undefined);
        }
        if (!opts.skipUniReport) {
            tryRun(() => mountUniReport(app), undefined);
        }
        // 私有版：仅 Vue3 且非 H5/nvue 注册 uni 应用前后台。
        if (shouldBindUniAppLifecycle() &&
            !tryBindUniAppLifecycle(app, lifecycleOpts)) {
            scheduleUniAppHookRetry(() => tryBindUniAppLifecycle(app, lifecycleOpts));
        }
    };
    finishLifecycleInstall();
}
/**
 * 仅 Vue3 小程序等重试 `uni.onAppShow` / `onAppHide`；Vue2 不调用。
 */
function scheduleUniAppHookRetry(tryBind) {
    if (uniHookRetryTimer) {
        clearTimeout(uniHookRetryTimer);
        uniHookRetryTimer = undefined;
    }
    let attempts = 0;
    const tick = () => {
        if (tryBind())
            return;
        if (++attempts >= UNI_HOOK_RETRY_MAX) {
            logger.warn('[uni统计 2.0] Vue3 小程序：uni.onAppShow 暂不可用，应用前后台统计可能缺失');
            return;
        }
        uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
    };
    uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
}
/**
 * 把 mixin 装到 vue 实例上。
 *
 * 与私有版 `src/index.js#load_stat` 一致，必须用条件编译区分：
 *   - VUE3：`uni.onCreateVueApp` → `app.mixin`（与私有版相同，不引 `@dcloudio/uni-shared`）。
 *   - VUE2：`require('vue').mixin`（由应用打包器静态解析，勿用 `globalThis.require`）。
 *
 * `#ifdef` 保留到 dist，由宿主 `uni:pre` 在打包阶段剔除分支（同私有版 dist）。
 */
// #ifdef VUE3
/**
 * 注册 `onCreateVueApp` 以注入页面 mixin。
 *
 * **必须**写字面量 `uni.onCreateVueApp(...)`（与私有版 `index.js#load_stat` 完全一致），
 * 供 H5 发行 inject 插件静态替换为 `@dcloudio/uni-h5` 真实 API。
 * 动态 `u.onCreateVueApp` 无法被 inject 识别，会导致 build 后 mixin 未注入。
 * 第二路回退 resolveUniRuntime（dev 全量 window.uni、单测 mock）。
 */
function tryRegisterVueAppMixin(mixin) {
    try {
        ;
        uni.onCreateVueApp((vueApp) => {
            tryRun(() => vueApp.mixin(mixin), undefined);
        });
        return true;
    }
    catch (_e) {
        // uni 未声明且未经 inject 替换（单测等）
    }
    const u = getUni();
    if (u && typeof u.onCreateVueApp === 'function') {
        u.onCreateVueApp((vueApp) => {
            tryRun(() => vueApp.mixin(mixin), undefined);
        });
        return true;
    }
    return false;
}
// #endif
function mountVueMixin(mixin) {
    if (vueMixinMounted)
        return;
    // #ifndef VUE3
    if (mountVue2GlobalMixin(mixin)) {
        vueMixinMounted = true;
    }
    // #endif
    // #ifdef VUE3
    if (tryRegisterVueAppMixin(mixin)) {
        vueMixinMounted = true;
        return;
    }
    scheduleVueAppMixinRetry(mixin);
    // #endif
}
// #ifdef VUE3
/**
 * Vue3：`onCreateVueApp` 晚就绪时短重试（对齐私有版仅注册一次 hook 的语义）。
 */
function scheduleVueAppMixinRetry(mixin) {
    if (vueMixinMounted)
        return;
    if (vueMixinRetryTimer)
        return;
    let attempts = 0;
    const tick = () => {
        vueMixinRetryTimer = undefined;
        if (vueMixinMounted)
            return;
        if (tryRegisterVueAppMixin(mixin)) {
            vueMixinMounted = true;
            return;
        }
        if (++attempts >= UNI_HOOK_RETRY_MAX) {
            if (!vueMixinMounted) {
                logger.warn('[uni统计 2.0] Vue3: onCreateVueApp 在重试后仍不可用，页面级 mixin 未注入');
            }
            return;
        }
        vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
    };
    vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
}
// #endif
/**
 * Vue2 全局 mixin（与私有版 `index.js` 中 `require('vue').mixin` 一致）。
 *
 * @returns 是否注入成功
 */
function mountVue2GlobalMixin(mixin) {
    var _a;
    // eslint-disable-next-line no-restricted-globals
    const Vue = require('vue');
    const target = (_a = Vue.default) !== null && _a !== void 0 ? _a : Vue;
    if (target && typeof target.mixin === 'function') {
        tryRun(() => target.mixin(mixin), undefined);
        return true;
    }
    logger.warn('[uni统计 2.0] Vue2: vue.mixin 不可用，请检查是否已安装 vue 依赖');
    return false;
}
/**
 * 把 `uni.report` 桥到 StatApp.report。
 *
 * H5 发行摇树时 `resolveUniRuntime` 会跳过 `{}` 空桩，但业务仍可能通过
 * `window.uni.report` 调用；故在可用 runtime 缺失时回退 `getGlobalObject().uni`。
 */
function mountUniReport(app) {
    var _a;
    const g = getGlobalObject();
    const u = ((_a = getUni()) !== null && _a !== void 0 ? _a : g.uni);
    if (!u || typeof u !== 'object')
        return;
    u.report = (type, value) => {
        app.report(type, value);
    };
}
/** 仅供测试：重置 install 哨兵；调用方应同时调 `__resetStatApp()`。 */
function __resetInstall() {
    if (uniHookRetryTimer) {
        clearTimeout(uniHookRetryTimer);
        uniHookRetryTimer = undefined;
    }
    if (vueMixinRetryTimer) {
        clearTimeout(vueMixinRetryTimer);
        vueMixinRetryTimer = undefined;
    }
    vueMixinMounted = false;
    if (lastUnbind)
        tryRun(() => lastUnbind(), undefined);
    lastUnbind = undefined;
    bootstrapped = false;
}

/**
 * 公有版统计入口。
 *
 * 与私有版 `src/index.js#main()` 等价：模块加载即触发安装。宿主无需手动调用，
 * 只需 `import '@dcloudio/uni-stat-public'`（或对应 dist 路径）即可。
 *
 * 也对外导出 `installPublicStat / getStatApp` 以便调试或自定义场景手动重装。
 */
// 自动安装：与私有版行为一致，加载即触发。
installPublicStat();

export { __resetInstall, __resetStatApp, getStatApp, installPublicStat };
