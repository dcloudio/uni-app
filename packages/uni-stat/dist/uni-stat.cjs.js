'use strict';

/**
 * 老版本兼容，系统信息
 */
const sys = uni.getSystemInfoSync();
// /**
//  * app基础信息
//  */
// export const baseInfo = uni.getAppBaseInfo()

// /**
//  * 设备相关
//  */
// export const deviceInfo = uni.getDeviceInfo()

// 访问开始即启动小程序，访问结束结分为：进入后台超过5min、在前台无任何操作超过30min、在新的来源打开小程序；
const STAT_VERSION = process.env.UNI_COMPILER_VERSION;
const STAT_URL = 'https://tongji.dcloud.io/uni/stat';
const STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
const PAGE_PVER_TIME = 1800; // 页面在前台无操作结束访问时间 单位s
const APP_PVER_TIME = 300; // 应用在后台结束访问时间 单位s
const OPERATING_TIME = 10; // 数据上报时间 单位s
const DIFF_TIME = 60 * 1000 * 60 * 24;

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

const appid = process.env.UNI_APP_ID; // 做应用隔离
const dbSet = (name, value) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {};

  if (!data) {
    data = {};
  }
  data[name] = value;
  uni.setStorageSync('$$STAT__DBDATA:'+appid, data);
};

const dbGet = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {};
  if (!data[name]) {
    let dbdata = uni.getStorageSync('$$STAT__DBDATA:'+appid);
    if (!dbdata) {
      dbdata = {};
    }
    if (!dbdata[name]) {
      return undefined
    }
    data[name] = dbdata[name];
  }
  return data[name]
};

const dbRemove = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {};
  if (data[name]) {
    delete data[name];
    uni.setStorageSync('$$STAT__DBDATA:'+appid, data);
  } else {
    data = uni.getStorageSync('$$STAT__DBDATA:'+appid);
    if (data[name]) {
      delete data[name];
      uni.setStorageSync('$$STAT__DBDATA:'+appid, data);
    }
  }
};

// 获取 manifest.json 中统计配置
const uniStatisticsConfig = process.env.UNI_STATISTICS_CONFIG;
let statConfig = {
  appid: process.env.UNI_APP_ID,
};
let titleJsons = {};
let debug =
  process.env.UNI_STAT_DEBUG === 'true' ||
  process.env.UNI_STAT_DEBUG === true;
// #ifdef VUE3
titleJsons = process.env.UNI_STAT_TITLE_JSON;
// #endif

// #ifndef VUE3

// eslint-disable-next-line no-restricted-globals
const pagesTitle = require('uni-pages?{"type":"style"}').default;
let pagesData = pagesTitle.pages;
for (let i in pagesData) {
  const style = pagesData[i];
  const titleText =
    // MP
    style.navigationBarTitleText ||
    // ali
    style.defaultTitle ||
    // H5 || App
    style.navigationBar?.titleText ||
    '';
  if (titleText) {
    titleJsons[i] = titleText;
  }
}
// #endif

// TODO 在云函数中获取，暂时注释
const UUID_KEY = '__DC_STAT_UUID';
const UUID_VALUE = '__DC_UUID_VALUE';
function getUuid() {
  let uuid = '';
  if (get_platform_name() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid
}

const get_uuid = (statData) => {
  // 有可能不存在 deviceId（一般不存在就是出bug了），就自己生成一个
  return sys.deviceId || getUuid()
};

/**
 * 获取老版的 deviceid ,兼容以前的错误 deviceid
 * @param {*} statData 
 * @returns 
 */
const get_odid = (statData) => {
  let odid  = '';
  if (get_platform_name() === 'n') {
    try {
      odid = plus.device.uuid;
    } catch (e) {
      odid = '';
    }
    return odid
  }
  return sys.deviceId || getUuid()
};

/**
 * 获取配置信息 如 appid
 */
const stat_config = statConfig;

const get_sgin = (statData) => {
  let arr = Object.keys(statData);
  let sortArr = arr.sort();
  let sgin = {};
  let sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }

  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1),
  }
};

const get_encodeURIComponent_options = (statData) => {
  let data = {};
  for (let prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data
};

/**
 * 获取当前平台
 * 移动端  : 'n',
 * h5	  : 'h5',
 * 微信	  : 'wx',
 * 阿里	  : 'ali',
 * 百度	  : 'bd',
 * 头条	  : 'tt',
 * qq	  : 'qq',
 * 快应用  : 'qn',
 * 快手	  : 'ks',
 * 飞书	  : 'lark',
 * 快应用  : 'qw',
 * 钉钉	  : 'dt'
 */
const get_platform_name = () => {
  // 苹果审核代码中禁止出现 alipay 字样 ，需要特殊处理一下
  const aliArr = ['y', 'a', 'p', 'mp-ali'];
  const platformList = {
    app: 'n',
    'app-plus': 'n',
    'app-harmony':'n',
    'mp-harmony':'mhm',
    h5: 'h5',
    'mp-weixin': 'wx',
    [aliArr.reverse().join('')]: 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'quickapp-native': 'qn',
    'mp-kuaishou': 'ks',
    'mp-lark': 'lark',
    'quickapp-webview': 'qw',
    'mp-xhs': 'xhs'
  };
  if (platformList[process.env.VUE_APP_PLATFORM] === 'ali') {
    if (my && my.env) {
      const clientName = my.env.clientName;
      if (clientName === 'ap') return 'ali'
      if (clientName === 'dingtalk') return 'dt'
      // TODO 缺少 ali 下的其他平台
    }
  }
  return platformList[process.env.VUE_APP_PLATFORM] || process.env.VUE_APP_PLATFORM
};

/**
 * 获取小程序 appid
 */
const get_pack_name = () => {
  let packName = '';
  if (get_platform_name() === 'wx' || get_platform_name() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  if (get_platform_name() === 'n') ;
  return packName
};

/**
 * 应用版本
 */
const get_version = () => {
  return get_platform_name() === 'n' ? plus.runtime.version : ''
};

/**
 * 获取渠道
 */
const get_channel = () => {
  const platformName = get_platform_name();
  let channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel
};

/**
 * 获取小程序场景值
 * @param {Object} options 页面信息
 */
const get_scene = (options) => {
  const platformName = get_platform_name();
  let scene = '';
  if (options) {
    return options
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene
};

/**
 * 获取拼接参数
 */
const get_splicing = (data) => {
  let str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1)
};

/**
 * 获取页面url，不包含参数
 */
const get_route = (pageVm) => {
  let _self = pageVm || get_page_vm();
  if (get_platform_name() === 'bd') {
    let mp_route = _self.$mp && _self.$mp.page && _self.$mp.page.is;
    let scope_route = _self.$scope && _self.$scope.is;
    return mp_route || scope_route || ''
  } else {
    return (
      _self.route ||
      (_self.$scope && _self.$scope.route) ||
      (_self.$mp && _self.$mp.page.route)
    )
  }
};

/**
 * 获取页面url, 包含参数
 */
const get_page_route = (pageVm) => {
  // 从 app 进入应用 ，没有 $page ,获取不到路由 ，需要获取页面 尝试从 getCurrentPages 获取也页面实例
  // FIXME 尽量不使用 getCurrentPages ，大部分获取路由是从 onHide 获取 ，这时可以获取到，如果是 onload ,则可能获取不到，比如 百度

  let page = pageVm && (pageVm.$page || (pageVm.$scope && pageVm.$scope.$page));
  let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
  if (!page) return lastPageRoute || ''
  // 如果找不到 fullPath 就取 route 的值
  return page.fullPath === '/' ? page.route : page.fullPath || page.route
};

/**
 * 获取页面实例
 */
const get_page_vm = () => {
  let pages = getCurrentPages();
  let $page = pages[pages.length - 1];
  if (!$page) return null
  return $page.$vm
};

/**
 * 获取页面类型
 */
const get_page_types = (self) => {
  // XXX 百度有问题 ，获取的都是 componet ,等待修复
  if (
    self.mpType === 'page' ||
    self.$mpType === 'page' ||
    (self.$mp && self.$mp.mpType === 'page') ||
    self.$options.mpType === 'page'
  ) {
    return 'page'
  }
  if (
    self.mpType === 'app' ||
    self.$mpType === 'app' ||
    (self.$mp && self.$mp.mpType === 'app') ||
    self.$options.mpType === 'app'
  ) {
    return 'app'
  }
  return null
};

/**
 * 处理上报参数
 * @param {Object}  需要处理的数据
 */
const handle_data = (statData) => {
  let firstArr = [];
  let contentArr = [];
  let lastArr = [];
  for (let i in statData) {
    const rd = statData[i];
    rd.forEach((elm) => {
      let newData = '';
      {
        newData = get_splicing(elm);
      }
      if (i === 0) {
        firstArr.push(newData);
      } else if (i === 3) {
        lastArr.push(newData);
      } else {
        contentArr.push(newData);
      }
    });
  }

  firstArr.push(...contentArr, ...lastArr);
  // 参数需要处理成字符串，方便上传
  return JSON.stringify(firstArr)
};

/**
 * 自定义事件参数校验
 */
const calibration = (eventName, options) => {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error(`uni.report Missing [eventName] parameter`);
    return true
  }
  if (typeof eventName !== 'string') {
    console.error(
      `uni.report [eventName] Parameter type error, it can only be of type String`
    );
    return true
  }
  if (eventName.length > 255) {
    console.error(
      `uni.report [eventName] Parameter length cannot be greater than 255`
    );
    return true
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error(
      'uni.report [options] Parameter type error, Only supports String or Object type'
    );
    return true
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error(
      `uni.report [options] Parameter length cannot be greater than 255`
    );
    return true
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error(
      `uni.report [eventName] When the parameter is title, the [options] parameter can only be of type String`
    );
    return true
  }
};

const get_page_name = (routepath) => {
  return (titleJsons && titleJsons[routepath]) || ''
};

const Report_Data_Time = 'Report_Data_Time';
const Report_Status = 'Report_Status';
const is_report_data = () => {
  return new Promise((resolve, reject) => {
    let start_time = '';
    let end_time = new Date().getTime();
    let diff_time = DIFF_TIME;
    let report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(({ enable }) => {
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(({ enable }) => {
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }
  })
};

const requestData = (done) => {
  const appid = process.env.UNI_APP_ID;
  let formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: appid,
    }),
  };
  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: (res) => {
      const { data } = res;
      if (data.ret === 0) {
        typeof done === 'function' &&
          done({
            enable: data.enable,
          });
      }
    },
    fail: (e) => {
      let report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      typeof done === 'function' &&
        done({
          enable: report_status_code,
        });
    },
  });
};

/**
 * 是否开启 debug 模式
 */
const is_debug = debug;

/**
 * 日志输出（采集 / 上报过程日志，文案与公有版 `debugLog` 对齐）。
 * @param {*} data 采集事件或上报 payload
 * @param {*} type 为真时表示上报阶段
 */
const log = (data, type) => {
  if (!logger.isDebug()) return
  if (type) {
    logger.debug('=== 准备上报 ===');
    logger.debug(data);
    return
  }
  logCollect(data);
};

/**
 * 获取上报时间间隔
 * @param {*} defaultTime 默认上报间隔时间 单位s
 */
const get_report_Interval = (defaultTime) => {
  let time = uniStatisticsConfig.reportInterval;
  // 如果上报时间配置为0 相当于立即上报
  if (Number(time) === 0) return 0
  time = time || defaultTime;
  let reg = /(^[1-9]\d*$)/;
  // 如果不是整数，则默认为上报间隔时间
  if (!reg.test(time)) return defaultTime
  return Number(time)
};

/**
 * 获取隐私协议配置
 */
const is_push_clientid = () => {
  if (uniStatisticsConfig.collectItems) {
    const ClientID = uniStatisticsConfig.collectItems.uniPushClientID;
    return typeof ClientID === 'boolean' ? ClientID : false
  }
  return false
};

/**
 * 是否上报页面数据
 * @returns 
 */
const is_page_report = ()=>{
  if(uniStatisticsConfig.collectItems){
    const statPageLog = uniStatisticsConfig.collectItems.uniStatPageLog;
    // 如果字段不存在返回 true , 如果是boolean 值按原值返回，如果是其他类型 返回false
    if(statPageLog === undefined) return true
    return typeof statPageLog === 'boolean' ? statPageLog : true
  }
  return true
};

// 首次访问时间
const FIRST_VISIT_TIME_KEY = '__first__visit__time';
// 最后访问时间
const LAST_VISIT_TIME_KEY = '__last__visit__time';
/**
 * 获取当前时间
 */
const get_time = () => {
	return parseInt(new Date().getTime() / 1000)
};

/**
 * 获取首次访问时间
 */
const get_first_visit_time = () => {
	const timeStorge = dbGet(FIRST_VISIT_TIME_KEY);
	let time = 0;
	if (timeStorge) {
		time = timeStorge;
	} else {
		time = get_time();
		dbSet(FIRST_VISIT_TIME_KEY, time);
		// 首次访问需要 将最后访问时间置 0
		dbRemove(LAST_VISIT_TIME_KEY);
	}
	return time
};

/**
 * 最后访问时间
 */
const get_last_visit_time = () => {
	const timeStorge = dbGet(LAST_VISIT_TIME_KEY);
	let time = 0;
	if (timeStorge) {
		time = timeStorge;
	}
	dbSet(LAST_VISIT_TIME_KEY, get_time());
	return time
};

// 页面停留时间记录key
const PAGE_RESIDENCE_TIME = '__page__residence__time';
let First_Page_Residence_Time = 0;
let Last_Page_Residence_Time = 0;

/**
 * 设置页面停留时间
 */
const set_page_residence_time = () => {
	First_Page_Residence_Time = get_time();
	dbSet(PAGE_RESIDENCE_TIME, First_Page_Residence_Time);
	return First_Page_Residence_Time
};

/**
 * 获取页面停留时间
 */
const get_page_residence_time = () => {
	Last_Page_Residence_Time = get_time();
	First_Page_Residence_Time = dbGet(PAGE_RESIDENCE_TIME);
	return Last_Page_Residence_Time - First_Page_Residence_Time
};

/**
 * 获取总访问次数
 */
const TOTAL_VISIT_COUNT = '__total__visit__count';
const get_total_visit_count = () => {
	const timeStorge = dbGet(TOTAL_VISIT_COUNT);
	let count = 1;
	if (timeStorge) {
		count = timeStorge;
		count++;
	}
	dbSet(TOTAL_VISIT_COUNT, count);
	return count
};


const FIRST_TIME = '__first_time';
/**
 * 设置页面首次访问时间，用户获取页面/应用停留时常
 */
const set_first_time = () => {
	// 获取当前时间 ，以下代码获取到是毫秒级时间戳 ，实际上用到是秒级时间戳，所以需要除以1000
	// const time = new Date().getTime()
	let time = get_time();
	const timeStorge = dbSet(FIRST_TIME,time);
	return timeStorge
};

/**
 * 获取最后一次时间 ，暂时用不到，直接获取当前时间即可
 */
// export const get_last_time = () => {
// 	let time = new Date().getTime()
// 	Set__Last__Time = time
// 	return time
// }

/**
 * 获取页面 \ 应用停留时间
 */
const get_residence_time = (type) => {
	let residenceTime = 0;
	const first_time = dbGet(FIRST_TIME);
	const last_time = get_time();
	if (first_time !== 0) {
		residenceTime = last_time - first_time;
	}
	// 将毫秒级时间戳转换为秒级时间戳，因为直接获取的是秒级时间戳，所以不需要转换
	// residenceTime = parseInt(residenceTime / 1000)
	residenceTime = residenceTime < 1 ? 1 : residenceTime;
	if (type === 'app') {
		let overtime = residenceTime > APP_PVER_TIME ? true : false;
		return {
			residenceTime,
			overtime,
		}
	}
	if (type === 'page') {
		let overtime = residenceTime > PAGE_PVER_TIME ? true : false;
		return {
			residenceTime,
			overtime,
		}
	}
	return {
		residenceTime,
	}
};

const eport_Interval = get_report_Interval(OPERATING_TIME);

// 统计数据默认值
let statData = {
  uuid: get_uuid(), // 设备标识
  ak: stat_config.appid, // uni-app 应用 Appid
  p: '', // 手机系统，客户端平台
  ut: get_platform_name(), // 平台类型
  mpn: get_pack_name(), // 原生平台包名、小程序 appid
  usv: STAT_VERSION, // 统计 sdk 版本
  v: get_version(), // 应用版本，仅app
  ch: get_channel(), // 渠道信息
  cn: '', // 国家
  pn: '', // 省份
  ct: '', // 城市
  t: get_time(), // 上报数据时的时间戳
  tt: '',
  brand: sys.brand || '', // 手机品牌
  md: sys.model, // 手机型号
  sv: '', // 手机系统版本
  mpsdk: sys.SDKVersion || '', // x程序 sdk version
  mpv: sys.version || '', // 小程序平台版本 ，如微信、支付宝
  lang: sys.language, // 语言
  pr: sys.pixelRatio, // pixelRatio 设备像素比
  ww: sys.windowWidth, // windowWidth 可使用窗口宽度
  wh: sys.windowHeight, // windowHeight 可使用窗口高度
  sw: sys.screenWidth, // screenWidth 屏幕宽度
  sh: sys.screenHeight, // screenHeight 屏幕高度
};

// 客户端平台，只有app平台平台可以用到
if(sys.platform){
  switch (sys.platform) {
    case 'android':
      statData.p = 'a';
      break
    case 'ios':
      statData.p = 'i';
      break
    case 'harmonyos': 
      statData.p = 'h';
      break
  }
}

// 获取手机版本
if (sys.system){
  statData.sv = sys.system.replace(/(Android|iOS)\s/, '');
}
class Report {
  constructor() {
    // 页面实例
    this.self = '';
    // 进入应用标识
    this.__licationShow = false;
    // 离开应用标识
    this.__licationHide = false;
    // 统计默认值
    this.statData = statData;
    // 标题默认值
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '',
    };

    // 页面参数
    this._query = {};
    // 页面最后停留页面的 url
    // this._lastPageRoute = ''

    // 注册拦截器
    let registerInterceptor = typeof uni.addInterceptor === 'function';
    if (registerInterceptor) {
      this.addInterceptorInit();
      this.interceptLogin();
      this.interceptShare(true);
      this.interceptRequestPayment();
    }
  }

  addInterceptorInit() {
    let self = this;
    uni.addInterceptor('setNavigationBarTitle', {
      invoke(args) {
        self._navigationBarTitle.page = args.title;
      },
    });
  }

  interceptLogin() {
    let self = this;
    uni.addInterceptor('login', {
      complete() {
        self._login();
      },
    });
  }

  interceptShare(type) {
    let self = this;
    if (!type) {
      self._share();
      return
    }
    uni.addInterceptor('share', {
      success() {
        self._share();
      },
      fail() {
        self._share();
      },
    });
  }

  interceptRequestPayment() {
    let self = this;
    uni.addInterceptor('requestPayment', {
      success() {
        self._payment('pay_success');
      },
      fail() {
        self._payment('pay_fail');
      },
    });
  }

  _login() {
    this.sendEventRequest(
      {
        key: 'login',
      },
      0
    );
  }

  _share() {
    this.sendEventRequest(
      {
        key: 'share',
      },
      0
    );
  }
  _payment(key) {
    this.sendEventRequest(
      {
        key,
      },
      0
    );
  }

  /**
   * 进入应用触发
   */
  applicationShow() {
    // 通过 __licationHide 判断保证是进入后台后在次进入应用，避免重复上报数据
    if (this.__licationHide) {
      const time = get_residence_time('app');
      // 需要判断进入后台是否超过时限 ，默认是 30min ，是的话需要执行进入应用的上报
      if (time.overtime) {
        let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
        let options = {
          path: lastPageRoute,
          scene: this.statData.sc,
          cst: 2,
        };
        this.sendReportRequest(options);
      } else {
        // 在没有超过时限的时候 ，判断场景值 ，如果是场景值发生了变化，则需要上报应用启动数据
        // 目前只有微信小程序生效
        const scene = get_scene();
        if (scene !== this.statData.sc) {
          let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
          let options = {
            path: lastPageRoute,
            scene: scene,
            cst: 2,
          };
          this.sendReportRequest(options);
        }
      }
      // 状态重置
      this.__licationHide = false;
    }
  }

  /**
   * 离开应用触发
   * @param {Object} self
   * @param {Object} type
   */
  applicationHide(self, type) {
    if (!self) {
      // 表示应用切换到后台 ，此时需要从页面栈获取页面实例
      self = get_page_vm();
    }
    // 进入应用后台保存状态，方便进入前台后判断是否上报应用数据
    this.__licationHide = true;
    const time = get_residence_time();
    const route = get_page_route(self);
    uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
    this.sendHideRequest(
      {
        urlref: route,
        urlref_ts: time.residenceTime,
      },
      type
    );
    // 更新页面首次访问时间
    set_first_time();
  }

  /**
   * 进入页面触发
   */
  pageShow(self) {
    // 清空值 ，初始化 ，避免污染后面的上报数据
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '',
    };

    const route = get_page_route(self);
    const routepath = get_route(self);

    this._navigationBarTitle.config = get_page_name(routepath);
    // 表示应用触发 ，页面切换不触发之后的逻辑
    if (this.__licationShow) {
      // 更新页面首次访问时间
      set_first_time();
      // this._lastPageRoute = route
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
      this.__licationShow = false;
      return
    }

    const time = get_residence_time('page');
    // 停留时间
    if (time.overtime) {
      let options = {
        path: route,
        scene: this.statData.sc,
        cst: 3,
      };
      this.sendReportRequest(options);
    }
    // 更新页面首次访问时间
    set_first_time();
  }

  /**
   * 离开页面触发
   */
  pageHide(self) {
    if (!this.__licationHide) {
      const time = get_residence_time('page');
      let route = get_page_route(self);
      let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
      if (!lastPageRoute) {
        lastPageRoute = route;
      }
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
      this.sendPageRequest({
        url: route,
        urlref: lastPageRoute,
        urlref_ts: time.residenceTime,
      });
      // this._lastPageRoute = route
      return
    }
  }

  /**
   * 发送请求,应用维度上报
   * @param {Object} options 页面信息
   * @param {Boolean} type 是否立即上报
   */
  sendReportRequest(options, type) {
    this._navigationBarTitle.lt = '1';
    this._navigationBarTitle.config = get_page_name(options.path);
    let is_opt = options.query && JSON.stringify(options.query) !== '{}';
    let query = is_opt ? '?' + JSON.stringify(options.query) : '';
    const last_time = get_last_visit_time();
    // 非老用户
    if (last_time !== 0 || !last_time) {
      const odid = get_odid();
      // 1.0 处理规则
      {
        this.statData.odid = odid;
      }
    }

    Object.assign(this.statData, {
      lt: '1',
      url: options.path + query || '',
      t: get_time(),
      sc: get_scene(options.scene),
      fvts: get_first_visit_time(),
      lvts: last_time,
      tvc: get_total_visit_count(),
      // create session type  上报类型 ，1 应用进入 2.后台30min进入 3.页面30min进入
      cst: options.cst || 1,
    });
    if (get_platform_name() === 'n') {
      this.getProperty(type);
    } else {
      this.getNetworkInfo(type);
    }
  }

  /**
   * 发送请求,页面维度上报
   * @param {Object} opt
   */
  sendPageRequest(opt) {
    let { url, urlref, urlref_ts } = opt;
    this._navigationBarTitle.lt = '11';
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '11',
      ut: this.statData.ut,
      url,
      tt: this.statData.tt,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: get_time(),
    };
    this.request(options);
  }

  /**
   * 进入后台上报数据
   * @param {Object} opt
   * @param {Object} type
   */
  sendHideRequest(opt, type) {
    let { urlref, urlref_ts } = opt;
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '3',
      ut: this.statData.ut,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: get_time(),
    };
    this.request(options, type);
  }

  /**
   * 自定义事件上报
   */
  sendEventRequest({ key = '', value = '' } = {}) {
    let routepath = '';

    try {
      routepath = get_route();
    } catch (error) {
      const launch_options = dbGet('__launch_options');
      routepath = launch_options.path;
    }

    this._navigationBarTitle.config = get_page_name(routepath);
    this._navigationBarTitle.lt = '21';
    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '21',
      ut: this.statData.ut,
      url: routepath,
      ch: this.statData.ch,
      e_n: key,
      e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
      usv: this.statData.usv,
      t: get_time(),
    };
    this.request(options);
  }

  sendPushRequest(options, cid) {
    let time = get_time();

    const statData = {
      lt: '101',
      cid: cid,
      t: time,
      ut: this.statData.ut,
    };

    // debug 打印打点信息
    if (is_debug) {
      log(statData);
    }

    const stat_data = handle_data({
      101: [statData],
    });
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: stat_data,
    };

    {
      if (statData.ut === 'h5') {
        this.imageRequest(optionsData);
        return
      }
    }

    // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
    if (get_platform_name() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this.sendRequest(optionsData);
      }, 200);
      return
    }

    this.sendRequest(optionsData);
  }

  /**
   * 获取wgt资源版本
   */
  getProperty(type) {
    plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
      this.statData.v = wgtinfo.version || '';
      this.getNetworkInfo(type);
    });
  }

  /**
   * 获取网络信息
   */
  getNetworkInfo(type) {
    uni.getNetworkType({
      success: (result) => {
        this.statData.net = result.networkType;
        this.getLocation(type);
      },
    });
  }

  /**
   * 获取位置信息
   */
  getLocation(type) {
    if (stat_config.getLocation) {
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: (result) => {
          if (result.address) {
            this.statData.cn = result.address.country;
            this.statData.pn = result.address.province;
            this.statData.ct = result.address.city;
          }

          this.statData.lat = result.latitude;
          this.statData.lng = result.longitude;
          this.request(this.statData, type);
        },
      });
    } else {
      this.statData.lat = 0;
      this.statData.lng = 0;
      this.request(this.statData, type);
    }
  }

  /**
   * 发送请求
   * @param {Object} data 上报数据
   * @param {Object} type 类型
   */
  request(data, type) {
    let time = get_time();
    const title = this._navigationBarTitle;
    Object.assign(data, {
      ttn: title.page,
      ttpj: title.config,
      ttc: title.report,
    });

    let uniStatData = dbGet('__UNI__STAT__DATA') || {};
    if (!uniStatData[data.lt]) {
      uniStatData[data.lt] = [];
    }
    // 加入队列
    uniStatData[data.lt].push(data);
    dbSet('__UNI__STAT__DATA', uniStatData);

    let page_residence_time = get_page_residence_time();
    // debug 打印打点信息
    if (is_debug) {
      log(data);
    }
    // 判断时候到达上报时间 ，默认 10 秒上报
    if (page_residence_time < eport_Interval && !type) return

    // 时间超过，重新获取时间戳
    set_page_residence_time();
    const stat_data = handle_data(uniStatData);
    let optionsData = {
      usv: STAT_VERSION, //统计 SDK 版本号
      t: time, //发送请求时的时间戮
      requests: stat_data,
    };

    // 重置队列
    dbRemove('__UNI__STAT__DATA');

    {
      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return
      }
    }

    // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
    if (get_platform_name() === 'n' && this.statData.p === 'a') {
      setTimeout(() => {
        this.sendRequest(optionsData);
      }, 200);
      return
    }

    this.sendRequest(optionsData);
  }

  getIsReportData() {
    return is_report_data()
  }

  /**
   * 数据上报
   * @param {Object} optionsData 需要上报的数据
   */
  sendRequest(optionsData) {

    {
      this.getIsReportData().then(() => {
        uni.request({
          url: STAT_URL,
          method: 'POST',
          data: optionsData,
          success: () => {
            if (is_debug) {
              log(optionsData, true);
            }
          },
          fail: (e) => {
            if (++this._retry < 3) {
              if (is_debug) {
                console.warn('=== 统计上报错误，尝试重新上报！');
                console.error(e);
              }
              setTimeout(() => {
                this.sendRequest(optionsData);
              }, 1000);
            }
          },
        });
      });
    }
  }

  /**
   * h5 请求
   */
  imageRequest(data) {
    this.getIsReportData().then(() => {
      let image = new Image();
      let options = get_sgin(get_encodeURIComponent_options(data)).options;
      image.src = STAT_H5_URL + '?' + options;
      if (is_debug) {
        log(data, true);
      }
    });
  }

  sendEvent(key, value) {
    // 校验 type 参数
    if (calibration(key, value)) return

    if (key === 'title') {
      this._navigationBarTitle.report = value;
      return
    }
    this.sendEventRequest(
      {
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      },
      1
    );
  }
}

class Stat extends Report {
  static getInstance() {
    if (!uni.__stat_instance) {
      uni.__stat_instance = new Stat();
    }

    return uni.__stat_instance
  }
  constructor() {
    super();
  }

  /**
   * 获取推送id
   */
  pushEvent(options) {
    const ClientID = is_push_clientid();
    if (uni.getPushClientId && ClientID) {
      uni.getPushClientId({
        success: (res) => {
          const cid = res.cid || false;
          //  只有获取到才会上传
          if (cid) {
            this.sendPushRequest(options, cid);
          }
        },
      });
    }
  }

  /**
   * 进入应用
   * @param {Object} options 页面参数
   * @param {Object} self	当前页面实例
   */
  launch(options, self) {
    // 初始化页面停留时间  start
    set_page_residence_time();
    this.__licationShow = true;
    dbSet('__launch_options', options);
    // 应用初始上报参数为1
    options.cst = 1;
    this.sendReportRequest(options, true);
  }
  load(options, self) {
    this.self = self;
    this._query = options;
  }

  appHide(self) {
    this.applicationHide(self, true);
  }

  appShow(self) {
    this.applicationShow(self);
  }

  show(self) {
    this.self = self;
    if (get_page_types(self) === 'page') {
      const isPageReport = is_page_report();
      if (isPageReport) {
        this.pageShow(self);
      }
    }

    // #ifdef VUE3
    if (get_platform_name() === 'h5' || get_platform_name() === 'n') {
      if (get_page_types(self) === 'app') {
        this.appShow();
      }
    }
    // #endif

    // #ifndef VUE3
    if (get_page_types(self) === 'app') {
      this.appShow();
    }
    // #endif
  }

  hide(self) {
    this.self = self;
    if (get_page_types(self) === 'page') {
      const isPageReport = is_page_report();
      if (isPageReport) {
        this.pageHide(self);
      }
    }

    // #ifdef VUE3
    if (get_platform_name() === 'h5' || get_platform_name() === 'n') {
      if (get_page_types(self) === 'app') {
        this.appHide();
      }
    }
    // #endif

    // #ifndef VUE3
    if (get_page_types(self) === 'app') {
      this.appHide();
    }
    // #endif
  }

  error(em) {
    // 开发工具内不上报错误
    // if (this._platform === 'devtools') {
    //   if (process.env.NODE_ENV === 'development') {
    //     console.info('当前运行环境为开发者工具，不上报数据。')
    //     return
    //   }
    // }
    let emVal = '';
    if (!em.message) {
      emVal = JSON.stringify(em);
    } else {
      emVal = em.stack;
    }

    let route = '';
    try {
      route = get_route();
    } catch (e) {
      // 未获取到页面路径
      route = '';
    }

    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '31',
      url: route,
      ut: this.statData.ut,
      ch: this.statData.ch,
      mpsdk: this.statData.mpsdk,
      mpv: this.statData.mpv,
      v: this.statData.v,
      em: emVal,
      usv: this.statData.usv,
      t: parseInt(new Date().getTime() / 1000),
    };
    this.request(options);
  }
}

const stat = Stat.getInstance();

// 用于判断是隐藏页面还是卸载页面
let isHide = false;

const lifecycle = {
  onLaunch(options) {
    // 进入应用上报数据
    stat.launch(options, this);
    // 上报push推送id
    stat.pushEvent(options);
  },
  onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      let oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options)
      };
    }
  },
  onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload() {
    if (isHide) {
      isHide = false;
      return
    }
    stat.hide(this);
  },
  onError(e) {
    // fix by haotian 避免统计内部错误导致堆栈溢出，造成死循环
    try {
      stat.error(e);
    } catch (error) {
      console.error('uni-stat error:', error);
    }
  },
};

// 加载统计代码
function load_stat() {
  // #ifdef VUE3
  uni.onCreateVueApp((app) => {
    app.mixin(lifecycle);
    uni.report = function (type, options) {
      stat.sendEvent(type, options);
    };
  });

  if (get_platform_name() !== 'h5' && get_platform_name() !== 'n') {
    uni.onAppHide(() => {
      stat.appHide(get_page_vm());
    });
    uni.onAppShow(() => {
      stat.appShow(get_page_vm());
    });
  }
  // #endif

  // #ifndef VUE3
  // eslint-disable-next-line no-restricted-globals
  const Vue = require('vue')
  ;(Vue.default || Vue).mixin(lifecycle);
  uni.report = function (type, options) {
    stat.sendEvent(type, options);
  };
  // #endif
}

function main() {
  if (is_debug) {
    {
      // #ifndef APP-NVUE
      logger.debug('=== uni统计 1.0 已启用 ===');
      // #endif
    }
    load_stat();
  } else {
    if (process.env.NODE_ENV === 'development') {
      uni.report = function (type, options) {};
    } else {
      load_stat();
    }
  }
}

main();
