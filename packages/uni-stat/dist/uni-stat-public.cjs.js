'use strict';

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
 *   - 不强制对对象 `JSON.stringify`（避免吞掉运行时类型信息，方便控制台展开）。
 *
 * 兼容性：
 *   - 历史版本插件 define 误把 `process.env.UNI_STAT_DEBUG` 替换成布尔字面量
 *     （未 `JSON.stringify`），导致 dist 运行时该值为 `true`/`false` 而非 `'true'`/`'false'`。
 *     `isDebug()` 同时接受字符串 `'true'` 与布尔 `true`，避免历史构建产物完全失效。
 */
const TAG = '[uni统计公有版]';
let runtimeDebug;
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
        console.log(TAG, ...args);
    },
    info(...args) {
        // eslint-disable-next-line no-console
        console.info(TAG, ...args);
    },
    warn(...args) {
        // eslint-disable-next-line no-console
        console.warn(TAG, ...args);
    },
    error(...args) {
        // eslint-disable-next-line no-console
        console.error(TAG, ...args);
    },
    setDebug,
    isDebug,
};

/**
 * 解析 uni-app 运行时根对象 `uni`。
 *
 * - H5 / App：常见为 `globalThis.uni`。
 * - 微信小程序等：多为 Vite/rollup 向**当前模块**注入的标识符 `uni`，
 *   **未必**同步挂到 `globalThis`；仅读 `globalThis.uni` 会导致
 *   `bindLifecycle` / `uni.request` / storage 等全部静默失败。
 *
 * 第二路依赖宿主构建对 `uni` 的注入（与业务页面同一套解析规则），
 * 类型兜底见 `packages/uni-stat/src/uni-global.d.ts`。
 */
/**
 * 返回与业务侧一致的 `uni` 运行时根对象；均不可用时返回 `undefined`。
 */
function resolveUniRuntime() {
    const g = globalThis;
    if (g.uni != null && typeof g.uni === 'object') {
        return g.uni;
    }
    // 宿主注入：小程序 vendor 中常见，且不在 globalThis 上
    if (typeof uni !== 'undefined' && uni != null && typeof uni === 'object') {
        return uni;
    }
    return undefined;
}

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
function getUni$8() {
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === 'object'
        ? raw
        : undefined;
    if (!u || typeof u.getStorageSync !== 'function') {
        throw new Error('[uni统计公有版] uni storage API is not available');
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
        const raw = getUni$8().getStorageSync(fk);
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
        const raw = getUni$8().getStorageSync(fk);
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
        getUni$8().setStorageSync(fk, value);
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
        getUni$8().removeStorageSync(fk);
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
        uni = getUni$8();
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
 *   1. 三段拆分：`loadVisitSnapshot()` 纯读、`buildVisitFields()` 仅生成本次待写、
 *      `commitVisitOnAck()` 在上报 ack 后才落 storage。
 *   2. **禁止**任何函数同时写 fvts 与 lvts；fvts 仅在 `commitVisitOnAck` 中且只在
 *      "首次启动" 路径写一次，永不主动清 lvts。
 *   3. `loadVisitSnapshot` 区分 "key 不存在" 与 "storage 异常"：
 *      - 不存在 → `lvts=0`，按新用户路径走（Yes new user）。
 *      - 异常   → 内存有上次 snapshot 时复用之；首次启动且异常 → fallback `lvts=0`，
 *        但**记录** `degraded=true`，上层可决定是否仍上报（Phase 5 collector 用）。
 *   4. 同一进程内只允许一次 `buildVisitFields`；后续 cst=2/3 触发的事件**不调用**本函数，
 *      由 collector 直接复用 `getCommitted()` 的内存 snapshot 继续推进 tvc/lvts。
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
        isNewUser: fvts === 0 || lvts === 0,
        degraded,
    };
    if (degraded) {
        logger.warn('[uni-stat] visit snapshot degraded; some storage keys read failed');
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
 * 生成本次启动要上报的 fvts/lvts/tvc 三元组（**不写 storage**）。
 *
 * 推进规则：
 *   - 新用户（loaded.isNewUser）：本次 fvts=now, lvts=0（仍上报 0 表示新用户），tvc=1。
 *   - 老用户：fvts 维持 loaded.fvts；lvts 上报 loaded.lvts（"上一次"，不是 now）；tvc=loaded.tvc+1。
 *
 * 注意：同一进程内只允许调用一次（参考 `domain/session` 设计），后续 cst=2/3 事件
 * 不携带 fvts/lvts/tvc。这里通过 `buildCalledInProcess` 哨兵防止误用，二次调用返回
 * 与首次相同的结果但发出 warn，便于排查上层 collector bug。
 */
function buildVisitFields(now) {
    const snap = ensureLoaded();
    if (buildCalledInProcess && lastBuilt) {
        logger.warn('[uni-stat] buildVisitFields() called twice in same process; returning cached fields');
        return Object.assign({}, lastBuilt);
    }
    buildCalledInProcess = true;
    if (snap.isNewUser) {
        pending = { fvts: now, lvts: 0, tvc: 1, now };
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
 * 上报 ack 成功后落库。
 *
 * 实际写入：
 *   - 新用户：`fvts=now, lvts=now, tvc=1`（本次启动既是首装也是上一次）。
 *   - 老用户：`fvts` 不变，`lvts=now`（注意：不是 pending.lvts，是 commit 时的 now），`tvc=pending.tvc`。
 *
 * pending 为空 / commit 重复调用一律 noop（保持幂等，便于 collector 重试逻辑）。
 */
function commitVisitOnAck(now) {
    if (!pending)
        return;
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
}
/**
 * 上报失败回滚：清掉 pending，下次再 build 仍基于 loaded snapshot 推进。
 *
 * **不**重置 `buildCalledInProcess`：同一进程内即使首批失败，也不允许"重新"再造一份
 * fvts/lvts 上报，避免污染。失败的批次应由 `pipeline/retry` 负责持久化重试。
 */
function rollbackPendingVisit() {
    pending = null;
}

/**
 * 入口页（entry page）记忆与 `iey / ppiey` 计算。
 *
 * 设计文档：`03-公有版架构设计.md` §4 与 `04-字段字典与平台获取矩阵.md`。
 *
 * 上行出口：
 *   - **仅 `lt=11` 携带 `iey` / `ppiey`（0/1）**；`lt=1` / `lt=3` 等事件不含入口字段。
 * 字段含义（`lt=11` 在**下一页 onShow** 采集，描述**刚离开的上一页**）：
 *   - `iey`：离开页是否为本会话**入口页**。
 *   - `ppiey`：`urlref` 指向页（再上一层来源）是否入口页。
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
let cached$2;
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
    cached$2 = route;
}
/**
 * 当前会话的入口路径；从内存优先取，未命中读 storage。
 */
function getEntryRoute() {
    if (cached$2 !== undefined)
        return cached$2 || undefined;
    const r = storage.safeRead(KEY_ENTRY);
    if (!r.ok)
        return undefined;
    if (typeof r.value === 'string' && r.value.length > 0) {
        cached$2 = r.value;
        return r.value;
    }
    // 标注已查过，避免下次再 IO
    cached$2 = '';
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
 * session 切换时调用：清掉 entry，等待新会话第一次 pageShow 重新登记。
 */
function clearEntry() {
    cached$2 = '';
    storage.remove(KEY_ENTRY);
}

/**
 * pages.json 导航栏标题解析（ttpj 数据源）。
 *
 * 私有版在 `utils/pageInfo.js` 构建阶段把 `pages.json` 各页的
 * `style.navigationBarTitleText` / `style.navigationBar.titleText` 扫进 `titleJsons`，
 * 运行时 `get_page_name(routepath)` 按路由 path 取值写入 `_navigationBarTitle.config`，
 * 最终在 request 拼进上行 `ttpj`。
 *
 * 公有版走同一构建注入：`uni:stat` 插件（`src/plugin/index.ts`）生成
 * `process.env.UNI_STAT_TITLE_JSON`（JSON 字符串），键为 `parsePagesJson().pages[].path`，
 * 值为导航标题文案。本模块在运行时解析并做路由 key 归一化（有无前导 `/`、是否带 query）。
 */
/** 懒加载缓存；`undefined` 表示尚未解析。 */
let titleMapCache;
/**
 * 解析并缓存 `UNI_STAT_TITLE_JSON`；解析失败或缺失时得到空表，避免重复 JSON.parse。
 */
function getTitleMap() {
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
/**
 * 按当前页路由取 pages.json 中的导航栏标题，供 `setConfigTitle` → 上行 `ttpj`。
 *
 * @param routePath `getCurrentRoute()` 的典型返回值（一般无前导 `/`，与插件写入的 key 对齐）；允许含 query。
 * @returns 未配置或查找不到时返回空串（与私有版 `get_page_name` 一致）。
 */
function getPagesJsonNavigationTitle(routePath) {
    if (!routePath || typeof routePath !== 'string')
        return '';
    const pathOnly = routePath.split('?')[0].trim();
    if (!pathOnly)
        return '';
    const map = getTitleMap();
    const keys = [pathOnly];
    if (pathOnly.startsWith('/')) {
        keys.push(pathOnly.slice(1));
    }
    else {
        keys.push(`/${pathOnly}`);
    }
    for (const k of keys) {
        const v = map[k];
        if (typeof v === 'string' && v.length > 0)
            return v;
    }
    return '';
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
 *   - `p` = `getPlatform()`（与私有版兼容；新平台扩充直接加 case 即可）。
 *   - 客户端 OS（用于风控）= `getClientOs()`：'a' / 'i' / 'h' / 'unknown'。
 *
 * 注意：本模块严禁缓存平台判定结果到模块级常量。`process.env.UNI_PLATFORM` 在 SSR 与
 * 单测中可能被运行时切换；缓存会让多端测试串味。
 */
/** 私有版兼容映射：UNI_PLATFORM → 短码。 */
const PLATFORM_MAP = {
    app: 'n',
    'app-plus': 'n',
    'app-harmony': 'n',
    'mp-harmony': 'mhm',
    h5: 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
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
 *   - 命中 `mp-alipay` 时若 `globalThis.my.env.clientName === 'dingtalk'` → `dt`。
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
        const my = globalThis.my;
        if (((_a = my === null || my === void 0 ? void 0 : my.env) === null || _a === void 0 ? void 0 : _a.clientName) === 'dingtalk')
            return 'dt';
        return 'ali';
    }
    return mapped;
}
/**
 * 取客户端操作系统粗分类。仅在 App 与 HarmonyOS App 上有意义：
 *   - 'a' = Android
 *   - 'i' = iOS
 *   - 'h' = HarmonyOS（plus 不可用、UNI_PLATFORM=app-harmony）
 *   - 'unknown' = 其他端
 *
 * 优先读 `globalThis.plus.os.name`；无 plus 时按 UNI_PLATFORM 退化判断。
 */
function getClientOs() {
    var _a, _b;
    const raw = getRawPlatform();
    const plus = globalThis.plus;
    const name = (_b = (_a = plus === null || plus === void 0 ? void 0 : plus.os) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (name) {
        if (name.includes('android'))
            return 'a';
        if (name === 'ios' || name === 'iphone os')
            return 'i';
        if (name.includes('harmony'))
            return 'h';
    }
    if (raw === 'app-harmony' || raw === 'mp-harmony')
        return 'h';
    return 'unknown';
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
 * 设备 ID 适配。
 *
 * 私有版痛点（参考 `pageInfo.js#getUuid` / `get_uuid` / `get_odid`）：
 *   - `get_uuid` 优先用 `sys.deviceId`，但 `sys` 是模块加载期 `uni.getSystemInfoSync()`
 *     的快照，SSR/早期阶段可能不存在 `deviceId` 字段，导致退化路径被频繁走到。
 *   - 退化路径里 `uni.setStorageSync(UUID_KEY, UUID_VALUE)` —— 这里 `UUID_VALUE` 是
 *     字面量字符串 `'__DC_UUID_VALUE'`，会让所有"写入失败"的设备共享同一个 uuid，
 *     直接污染统计漏斗（缺陷 #28）。
 *   - `get_odid` 调用了 `getUuid()`（递归同样缺陷），但 odid 的语义本应是"老 deviceid"，
 *     新生成的 fallback 不该走 odid 路径。
 *
 * 公有版职责：
 *   1. `getUuid()`：稳定 + 持久化。优先 `plus.runtime.getDCloudId()`（App 端）；
 *      其次 `system.deviceId`（小程序基础库）；都没有则生成 `anon-...` 并落 storage。
 *   2. `getOdid()`：仅 App 端有意义（`plus.device.uuid`），其他端固定空串，**不递归**。
 *   3. 任何 storage / plus 调用全部走 `tryRun` 兜底，绝不抛出。
 *   4. 内存级缓存：避免每次构建 statData 都触发一次同步 storage IO。
 *   5. `__resetCache()` 仅供测试。
 *
 * 与私有版上行字段兼容：仍然落到 `ud / odid` 字段（在 `domain/statData.ts` 拼装）。
 */
const STORAGE_KEY_UUID = 'device:uuid';
let cachedUuid = null;
let cachedOdid = null;
/** 取 plus 全局，剥离到函数里便于 mock。 */
function getPlus$1() {
    return globalThis.plus;
}
/**
 * 读取 `uni.getSystemInfoSync().deviceId`；任何异常 / 缺失返回空串。
 *
 * 不复用 `adapter/system.getSystemInfo`：deviceId 在 uni-app 字段表里属于"敏感字段"，
 * 公有版默认不暴露在 `SystemInfoStatic` 中，仅在本 adapter 内部使用。
 */
function readSysDeviceId() {
    const u = globalThis.uni;
    if (!u || typeof u.getSystemInfoSync !== 'function')
        return '';
    return tryRun(() => { var _a; return (_a = u.getSystemInfoSync().deviceId) !== null && _a !== void 0 ? _a : ''; }, '');
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
 * 取设备 uuid。优先级：内存缓存 → plus.runtime.getDCloudId（App）→ system.deviceId
 * → storage 历史值 → 新生成 anon 并落库。
 *
 * 任何环节失败都不抛错，最差情况返回新生成的 anon uuid（仅当次进程内有效），
 * 调用方据此能保证字段非空（避免私有版 `''` 上报后被丢弃）。
 */
function getUuid() {
    if (cachedUuid)
        return cachedUuid;
    if (isApp()) {
        const plus = getPlus$1();
        const dcloudId = tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _a === void 0 ? void 0 : _a.getDCloudId) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : ''; }, '');
        if (dcloudId) {
            cachedUuid = dcloudId;
            return cachedUuid;
        }
    }
    const sysDeviceId = readSysDeviceId();
    if (sysDeviceId) {
        cachedUuid = sysDeviceId;
        return cachedUuid;
    }
    const stored = storage.get(STORAGE_KEY_UUID);
    if (typeof stored === 'string' && stored.length > 0) {
        if (stored.startsWith('device-anon-')) {
            const upgraded = generateAnonUuid();
            tryRun(() => storage.set(STORAGE_KEY_UUID, upgraded), undefined);
            cachedUuid = upgraded;
            return cachedUuid;
        }
        cachedUuid = stored;
        return cachedUuid;
    }
    const generated = generateAnonUuid();
    tryRun(() => storage.set(STORAGE_KEY_UUID, generated), undefined);
    cachedUuid = generated;
    return cachedUuid;
}
/**
 * 取老版 device id（odid）。仅 App 端有真值（`plus.device.uuid`），其他端固定空串。
 *
 * 对比私有版：
 *   - 不再"找不到就调 getUuid()" —— 那会让 odid 与 uuid 在小程序端一致，
 *     破坏服务端"通过 odid 识别 v1 老设备"的语义。
 *   - 任何异常返回 ''，由 `domain/statData.ts` 自行决定是否丢字段。
 */
function getOdid() {
    if (cachedOdid !== null)
        return cachedOdid;
    if (!isApp()) {
        cachedOdid = '';
        return cachedOdid;
    }
    const plus = getPlus$1();
    cachedOdid = tryRun(() => { var _a, _b; return (_b = (_a = plus === null || plus === void 0 ? void 0 : plus.device) === null || _a === void 0 ? void 0 : _a.uuid) !== null && _b !== void 0 ? _b : ''; }, '');
    return cachedOdid;
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
 * @param len 期望长度；不足时用 '0' 左填充以保证视觉与碰撞概率稳定。
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
let cached$1 = null;
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
    if (cached$1 !== null)
        return cached$1;
    cached$1 = loadFromStorage();
    return cached$1;
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
    cached$1 = next;
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
        const elapsed = now - (snap.bgTs || snap.lastActive);
        const sceneChanged = !!scene && !!snap.lastScene && scene !== snap.lastScene;
        if (sceneChanged ||
            (snap.bgTs > 0 && elapsed >= config$1.backgroundTimeoutSec)) {
            const created = createNew(now, CST.BackgroundTimeout, scene);
            return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
        }
        // 未超时：清 bgTs，更新 lastActive
        touch(now);
        storage.set(KEY_BG_TS, 0);
        if (cached$1)
            cached$1.bgTs = 0;
        return { snapshot: cached$1, isNew: false, cst: 0 };
    }
    if (t === 'wx_scene_changed') {
        if (scene && scene !== snap.lastScene) {
            const created = createNew(now, CST.BackgroundTimeout, scene);
            return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
        }
        return { snapshot: snap, isNew: false, cst: 0 };
    }
    // page_show：判定前台无操作超时
    const elapsed = now - snap.lastActive;
    if (elapsed >= config$1.pageInactiveTimeoutSec) {
        const created = createNew(now, CST.PageInactiveTimeout, scene || snap.lastScene);
        return { snapshot: created, isNew: true, cst: CST.PageInactiveTimeout };
    }
    touch(now);
    return { snapshot: cached$1, isNew: false, cst: 0 };
}
/**
 * 标记应用进入后台。写入 bgTs，供下次 app_show 判定超时。
 */
function markBackground(now) {
    if (!cached$1)
        cached$1 = loadFromStorage();
    if (!cached$1)
        return;
    storage.set(KEY_BG_TS, now);
    cached$1.bgTs = now;
}
/**
 * 更新 lastActive；page_show / 用户操作时调用。
 */
function touch(now) {
    if (!cached$1)
        cached$1 = loadFromStorage();
    if (!cached$1)
        return;
    storage.set(KEY_LAST_ACTIVE, now);
    cached$1.lastActive = now;
}
/**
 * 取下一个 seq；先递增 storage 中的 seq，再返回新值。
 *
 * 失败兜底：若 storage 异常，仍以内存 cached.seq 自增；保证序号单调，但跨进程可能跳号。
 */
function nextSeq() {
    if (!cached$1)
        cached$1 = loadFromStorage();
    if (!cached$1)
        return 0;
    const next = cached$1.seq + 1;
    cached$1.seq = next;
    storage.set(KEY_SEQ, next);
    return next;
}
/** 取当前 snapshot；未初始化时尝试从 storage 加载，仍为空返回 null。 */
function getSnapshot() {
    return ensureCache();
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
 * 取栈顶页面实例（vm）。
 *
 * 优先 `getCurrentPages()`；若不可用或栈为空返回 `undefined`。
 */
function getTopPageVm() {
    var _a;
    const fn = globalThis
        .getCurrentPages;
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
 *      mp-baidu / mp-alipay / mp-lark / mp-kuaishou，并允许覆写（页面自带 scene）。
 *
 * 注意：本模块不维护订阅注册表（去重逻辑由 `infra/interceptor` 与 `runtime/install`
 * 处理），保持单一职责。
 */
function getUni$7() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 启动时取场景值。优先级：
 *   1. 调用方显式传入 `override`（如页面 onLoad 收到的 options.scene）。
 *   2. `uni.getLaunchOptionsSync().scene`（多端通用）。
 *   3. 不识别的平台返回空字符串。
 *
 * 公有版扩展：除 wx 外，mp-qq / mp-toutiao / mp-baidu / mp-alipay / mp-lark /
 * mp-kuaishou 都已支持 `getLaunchOptionsSync`，统一走该入口。
 */
function getLaunchScene(override) {
    if (override !== undefined && override !== null && override !== '') {
        return String(override);
    }
    const u = getUni$7();
    if (typeof (u === null || u === void 0 ? void 0 : u.getLaunchOptionsSync) !== 'function')
        return '';
    const platform = getPlatform();
    if (platform !== 'wx' &&
        platform !== 'qq' &&
        platform !== 'tt' &&
        platform !== 'bd' &&
        platform !== 'ali' &&
        platform !== 'lark' &&
        platform !== 'ks') {
        return '';
    }
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
function getUni$6() {
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
        const u = getUni$6();
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
 *     与 `docs/uni统计上报参数.md` 口径对齐（不再发已废弃的 `lt=0`）。
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
};
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
 * 重要约束（修复 lvts=0 缺陷）：
 *   - `fvts/lvts/tvc` **只在进程首报**（cold_launch 触发的首次 ensureSession）携带；
 *     cst=2（后台超时）/ cst=3（前台无操作超时）创建的新 session **不**带。
 *   - 通过 `firstVisitEmittedInProcess` 哨兵保证全进程只调用一次 `buildVisitFields`。
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
            .catch((e) => logger.warn('[uni-stat] push cid fetch failed', e));
    }
}
/**
 * 应用从后台进入前台。
 *
 * 流程：
 *   1. ensureSession('app_show') → 命中 backgroundTimeout 时新 session（cst=2）。
 *   2. isNew=true 时发一条 lt=1；否则 noop。
 */
function handleAppShow(app, options = {}, _opts = {}) {
    const c = safeCollector(app);
    if (!c)
        return;
    const now = nowSec();
    const scene = tryRun(() => getLaunchScene(options.scene), '');
    const result = tryRun(() => ensureSession('app_show', { now, scene }), null);
    if (!result || !result.isNew)
        return;
    tryRun(() => clearEntry(), undefined);
    // cst=2：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
    // url 优先取 options.path；拿不到就用上次记录的 lastRoute（用户回到的页面通常即此）。
    const url = options.path || state$1.lastRoute || '';
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
        tryRun(() => markEntryPage(entryKey), undefined);
    }
    reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url);
}
/**
 * 应用进入后台。
 *
 * 流程：
 *   1. markBackground(now)：写 bgTs，让下次 app_show 能算超时。
 *   2. 发 lt=3：`urlref` = 当前页（用户最后看到的页面），`urlref_ts` = 该页停留秒数（与私有版一致，不足 1 秒按 1 秒）。
 *   3. 进入后台后强制 flush（force=true），尽量在被 kill 前送出。
 */
function handleAppHide(app) {
    const c = safeCollector(app);
    if (!c)
        return;
    const now = nowSec();
    tryRun(() => markBackground(now), undefined);
    const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
    const stayed = clampUrlrefStaySec(deltaStay);
    c.report({
        lt: LT.Hide,
        t: now,
        urlref: state$1.lastRoute,
        urlref_ts: stayed,
    });
    void c
        .flush(true)
        .catch((e) => logger.warn('[uni-stat] flush on hide failed', e));
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
 *   - `iey` / `ppiey`：分别对应**离开页**是否入口、`urlref` 指向页是否入口（与字段字典「上级页面」口径一致）。
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
    const now = nowSec();
    const result = tryRun(() => ensureSession('page_show', { now }), null);
    if (!result)
        return;
    const route = tryRun(() => getCurrentRoute(vm), '');
    const url = tryRun(() => getCurrentRouteWithQuery(vm), '') || route;
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
        // cst=3：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
        // 注意：lt=1（新会话首报）**不受** enablePageLog 控制 —— 与私有版语义一致，
        // is_page_report 仅拦截 pageShow/pageHide，不影响 launch/appShow/appHide。
        reportNewSession(c, result.cst || CST.PageInactiveTimeout, '', now, false, url);
    }
    // 存在上一页 → 发 lt=11：描述「离开的上一页」，而非当前 vm 所在页。
    if (state$1.lastRoute && opts.enablePageLog !== false) {
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
    }
    // 轮换路由链：当前页在下一轮成为「上一页」。
    state$1.beforeLastRoute = state$1.lastRoute;
    state$1.beforeLastRouteFull = state$1.lastRouteFull;
    state$1.prevIey = state$1.lastIey;
    state$1.lastIey = !!route && tryRun(() => isEntry(route), false);
    state$1.lastRoute = route;
    state$1.lastRouteFull = url;
    state$1.lastRouteEnterTime = now;
    // 不在此处同步快照：此时 lastRoute 已指向新页，getCurrentTitle 会是新页 ttpj+空 ttn，造成顶替。
    // 离开页快照见 handlePageHide（优先）；否则见 scheduleDeferredTitleSnapshot。
    scheduleDeferredTitleSnapshot();
    state$1.isHide = false;
}
/**
 * Page.onHide / Page.onUnload：页面隐藏 / 卸载。
 *
 * 私有版用 `isHide` 区分 onUnload 是隐藏还是真离开；本模块同样兼容。
 *
 * 公有版调整（与 `docs/uni统计上报参数.md` 对齐）：
 *   - `lt=11` 不在 onHide 上报，统一在下一次 `handlePageShow` 上报离开页闭环数据。
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
        logger.warn('[uni-stat] handleError failed', err);
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
function getUni$5() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 装配 vue mixin + uni 全局生命周期。
 *
 * 与私有版 `src/index.js` 行为差异：
 *   - 拆 onLaunch / onAppShow / onAppHide / onPageShow / onPageHide 五个独立调度，
 *     避免 mixin 内夹带"如何判定 page/app"的脏逻辑。
 *   - vue mixin 仍维持 `onLaunch/onLoad/onShow/onHide/onUnload/onError` 五段，与 vue
 *     生命周期 1:1，便于上层调试。
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
            handlePageShow(app, this, opts);
        },
        onHide() {
            handlePageHide(app);
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
    const u = getUni$5();
    let appShowCb;
    let appHideCb;
    if (u && typeof u.onAppShow === 'function') {
        appShowCb = (e) => handleAppShow(app, e !== null && e !== void 0 ? e : {}, opts);
        tryRun(() => u.onAppShow(appShowCb), undefined);
    }
    if (u && typeof u.onAppHide === 'function') {
        appHideCb = () => handleAppHide(app);
        tryRun(() => u.onAppHide(appHideCb), undefined);
    }
    return {
        mixin,
        unbind() {
            if (!bound)
                return;
            bound = false;
            const cur = getUni$5();
            if (appShowCb && cur && typeof cur.offAppShow === 'function') {
                tryRun(() => cur.offAppShow(appShowCb), undefined);
            }
            if (appHideCb && cur && typeof cur.offAppHide === 'function') {
                tryRun(() => cur.offAppHide(appHideCb), undefined);
            }
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
 * 注意：这里**不再**硬编码 `'3'`。`'3'` 是统计 SDK 协议版本（用于私有版 1/2/3
 * 三套实现的入口分发），由 `src/plugin/index.ts` 的 `statVersion` 控制；
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
 * 单条事件序列化后允许的最大字节数。
 *
 * 阈值取舍：
 *   - 6KB 是 image GET URL 上限（火山 TLS WebTrack）；扣掉 host / ProjectId / TopicId /
 *     Source / Time 等固定 query 约 200B，留给 `Logs=encodeURIComponent(payload.requests)`
 *     大约 5800B。
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
 * 与 `IMAGE_REPORT_DEFAULTS` 的 6KB URL 上限对应：`encodeURIComponent` 保守按 3x
 * 膨胀比估，4KB 原文恰好对应 ~12KB encoded —— 但中文场景多见 ASCII，实际膨胀 ~1.2x，
 * 留 25% buffer 后取 4KB 作为切片阈值。超阈值时 collector flush 会按事件数 + 字节数
 * 双阈值切多个 ReportPayload，逐个发送。
 */
const BATCH_REQUESTS_MAX_BYTES = 4 * 1024;
/** 单批最多容纳的事件数；与字节阈值取 min 作为切片边界。 */
const BATCH_MAX_EVENTS = 30;
/**
 * 单条 retry 队列条目允许的最大重放次数。
 *
 * 设置原因：`recoverRetry` 每次冷启串行重放历史 payload，对永久错误（例如曾经误塞入
 * 队列的超长 payload、协议早期版本的脏数据）只会反复 fail，永远卡在队列前部把后续
 * 健康 payload 也拖死。超过本阈值后由 `markAttempt` 自动 ack 删除（死信清理）。
 */
const RETRY_MAX_ATTEMPTS = 5;
const IMAGE_REPORT_DEFAULTS = {
    host: 'https://tls-cn-beijing.volces.com',
    projectId: '9fad19a2-b7f1-47f5-87ff-8621f545ab61',
    topicId: '99b55c91-ed80-406e-b205-e9d18aca744d',
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
            logger.warn('[uni-stat] cloud importObject threw', e);
            return undefined;
        }
    }
    function once(payload) {
        const receiver = getReceiver();
        if (!receiver || typeof receiver.report !== 'function') {
            return Promise.reject(new Error('uniCloud space unavailable'));
        }
        return Promise.resolve(receiver.report(payload)).then(() => undefined);
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
                    logger.warn('[uni-stat] cloud channel send failed after retries', e);
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
 *   [uni统计公有版] === 统计数据采集：应用启动 (lt=1) ===
 *   [uni统计公有版] {lt: '1', t: 1714123456, ut: 'h5', ...}
 *   [uni统计公有版] === 采集结束 ===
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
    var _a, _b;
    if (!logger.isDebug())
        return;
    logger.debug('=== uni 统计公有版已启用 ===');
    // 通道: ${info.channel} |
    logger.debug(`上报间隔: ${info.reportIntervalSec}s | 应用APPID: ${info.ak || '<未注入>'}${info.appName ? ` | 应用名: ${info.appName}` : ''}`);
    if (typeof info.backgroundTimeoutSec === 'number' ||
        typeof info.pageInactiveTimeoutSec === 'number') {
        logger.debug(`会话阈值: 后台超时 backgroundTimeoutSec=${(_a = info.backgroundTimeoutSec) !== null && _a !== void 0 ? _a : '?'}s | 前台无操作 pageInactiveTimeoutSec=${(_b = info.pageInactiveTimeoutSec) !== null && _b !== void 0 ? _b : '?'}s（若为 300/1800 多为 manifest 未注入 build，仍走默认值）`);
    }
    if (info.debugFromManifest) {
        logger.debug('调试模式：已从 manifest.uniStatistics.debug 自动开启');
    }
    logger.debug('=== 后续将在每次采集 / 上报时输出过程日志 ===');
}
/**
 * 即将上报：取出 batch、选定 channel 后调用。
 *
 * 文案示意：
 *   ```text
 *   // 通道=${info.channel}
 *   [uni统计公有版] === 准备上报： 共 4 条事件 (lt=1×1, lt=11×2, lt=21×1) [_id=p-xxxx] ===
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
 *   - image 通道 GET URL 超过 `maxUrlLength`（例如 81718 > 6144），重发同一份必定再次超长；
 *   - 通道未配置（`image channel not configured`、`http endpoint missing`），换网络也救不了；
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
/**
 * 构建 collector。返回 API 对象，所有方法绑定 deps 闭包。
 */
function createCollector(deps) {
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
            const ctx = Object.assign({}, input, {
                t,
                session: sessionForCtx,
            });
            const data = deps.builder.build(ctx);
            // 调试日志打印完整对象（含空串）；入队发送侧去掉 '' 键以缩短 image URL
            logCollect(data);
            deps.queue.enqueue(omitEmptyStringFieldsForUpload(data));
            if (deps.queue.shouldFlush()) {
                flush(false).catch((e) => logger.warn('[uni-stat] auto-flush failed', e));
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
    function flush() {
        return __awaiter(this, arguments, void 0, function* (force = false) {
            var _a, _b, _c, _d, _e;
            if (!deps.queue.shouldFlush(force))
                return;
            const snapshot = deps.queue.flush();
            if (!snapshot)
                return;
            const channel = deps.selectChannel();
            if (!channel) {
                logger.warn('[uni-stat] no channel available, rollback batch');
                logNoChannel({ bucket: snapshot });
                deps.queue.rollback(snapshot);
                return;
            }
            // 切片阈值 = min(全局配置, 通道物理上限)
            //   - 全局：BATCH_REQUESTS_MAX_BYTES（业务可调）
            //   - 通道：image GET URL 经 encodeURIComponent 膨胀，原文不能按 URL 上限直接用
            //     → 由 image channel 自身反推（见 image.ts maxRequestBytes）
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
            if (chunks.length === 0)
                return;
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
            let okEvents = 0;
            let failedEvents = 0;
            let allOk = true;
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
                    failedEvents += sliceEvents;
                    if (isPermanentChannelError(e)) {
                        // 永久错：丢弃本片，不 persist、不污染下次冷启
                        logger.warn('[uni-stat] channel send permanent error, drop slice', e, 'sliceBytes=' + requests.length);
                        logReportFailureReason({ error: e, persistedId: undefined });
                        continue;
                    }
                    logger.warn('[uni-stat] channel send failed; persist for retry', e);
                    const id = deps.retry.persist(payload);
                    if (!id) {
                        logger.warn('[uni-stat] retry.persist returned no id, drop slice');
                    }
                    logReportFailureReason({ error: e, persistedId: id });
                }
            }
            if (allOk) {
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
                logger.warn('[uni-stat] recoverRetry: no channel available');
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
                        logger.warn('[uni-stat] recoverRetry permanent error, ack & drop', e, 'id=' + payload._id);
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
                    logger.warn('[uni-stat] recoverRetry item failed, will retry next launch', e);
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
    return { report, flush, recoverRetry };
}

/**
 * 1.0 通道：HTTP POST 上报。
 *
 * 兼容私有版同协议（`uni.request(POST STAT_URL)`），并修复其历史缺陷：
 *   - #1 `_retry` 未初始化导致 NaN：本实现以 `withRetry({times})` 显式控制。
 *   - #16 H5 fallback `new Image()` 在 nvue/微信小程序运行时会抛 `Image is not defined`：
 *     本实现仅在确认 `typeof Image !== 'undefined'` 时使用 image 通道，否则退回 `uni.request`。
 *
 * 接口契约：
 *   - `available()`：在任何 uni 平台都返回 true（HTTP 是兜底通道）。
 *   - `send(payload)`：成功 resolve；3 次重试全失败抛错（供 retry.persist 落盘）。
 *   - 不缓存任何状态；每次 `send` 是无状态的。
 */
function getUni$4() {
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
    const ImageCtor = globalThis.Image;
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
        const u = getUni$4();
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
            const u = getUni$4();
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
                    logger.warn('[uni-stat] http channel send failed after retries', e);
                    throw e;
                }
            });
        },
    };
}

/**
 * 公有版默认通道：火山 TLS WebTrack.gif 图片像素上报。
 *
 * 上行格式：
 *   `${host}/WebTrack.gif?ProjectId=${pid}&TopicId=${tid}&Logs=${URI(JSON.stringify(logs))}&Source=webImg&Time=${Date.now()}`
 *
 * 设计要点：
 *   - 首选 `new Image().src=...`：浏览器/H5/部分小程序均可用，**不受 CORS 限制**，命中即认为送达。
 *   - 浏览器以外环境（App / 部分小程序无 Image 全局）：退回 `uni.request({ method: 'GET' })`，
 *     成功状态码 `2xx` 视为送达。
 *   - 上行体积保护：`payload.requests` 已是 `JSON.stringify(events)`，再 `encodeURIComponent` 后塞入 URL；
 *     单条 batch 超过 `maxUrlLength`（默认 6KB）时抛出 `PermanentChannelError`，
 *     **不进入 `withRetry`**——同一份 payload 重发同一份必然再次超长，避免空转 N 次；
 *     上层 collector 捕获到 `PermanentChannelError` 后会跳过 `retry.persist`，避免反复落盘。
 *   - 配置缺失（host/projectId/topicId 任一为空）：同样抛 `PermanentChannelError`，避免脏数据持久化死循环。
 *   - 不做"重试 = 业务错"的兜底：网络抖动一律由 `withRetry` 处理；最终失败由 collector → retry.persist 接管。
 *
 * 与 cloud / http 通道一致：
 *   - `available()`：host/projectId/topicId 均非空即可（不要求 Image 一定存在，因为有 uni.request 兜底）。
 *   - `send(payload)`：成功 resolve、失败 reject。
 *   - 不缓存任何状态。
 */
function getUni$3() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
/**
 * 估算 image GET URL 中"非 Logs"部分的固定字节预算：
 *   `https://tls-cn-beijing.volces.com/WebTrack.gif?ProjectId=<uuid>&TopicId=<uuid>&Logs=&Source=webImg&Time=<13>`
 * 约 240B；保守取 256B，让 chunkEvents 留一点 headroom。
 */
const IMAGE_URL_BASE_OVERHEAD = 256;
/**
 * `encodeURIComponent` 字节膨胀比的上界估算（取最坏值，避免任意业务下切片仍超长）：
 *   - 纯 ASCII JSON `{"a":1}` → `%7B%22a%22%3A1%7D` ≈ 2.0–2.3x
 *   - 中英混排实测 ≈ 1.8x
 *   - **纯中文 3.0x**（每个汉字 UTF-8 占 3B，`%E4%B8%AD` 占 9 字符 → 3x）
 *
 * 取 **3.0** 作为安全上界：覆盖任意 unicode 业务事件名 / 错误堆栈。
 *
 * 取 3.0 的代价：默认 `maxUrlLength=6144` 时单片原文上限 ≈ (6144-256)/3 ≈ 1962B。
 * 100 条 ~440B 中英混排事件会切成约 23 片，比理论最少（13 片）多 ~10 片，
 * 但能保证**任意业务（包括纯中文）下 URL 都不超 6KB**，无需依赖 preflight 兜底。
 */
const IMAGE_ENCODE_RATIO = 3.0;
/**
 * 拼装最终请求 URL。导出供测试/调试用。
 *
 * @param payload  上报 payload；其中 `requests` 已是 `JSON.stringify(events)`。
 * @param opts     host/projectId/topicId 与 nowMs。
 */
function buildImageReportUrl(payload, opts) {
    var _a;
    const t = ((_a = opts.nowMs) !== null && _a !== void 0 ? _a : (() => Date.now()))();
    // payload.requests 已经是 JSON 字符串（事件数组），无需再次 stringify
    const logs = encodeURIComponent(payload.requests);
    const host = opts.host.replace(/\/+$/, '');
    return (host +
        '/WebTrack.gif' +
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
 * 优先使用浏览器/H5 的 `new Image()`：仅触发 GET，不读响应；图片 onload/onerror 都视为已送达
 * （图片像素 1x1，服务端只关心 query 落库）。
 *
 * 返回 `true`：当前环境支持 Image，已发出请求。
 * 返回 `false`：缺少 Image 全局或构造抛错，调用方应退回 `uni.request`。
 */
function tryImageBeacon(url) {
    const ImageCtor = globalThis.Image;
    if (typeof ImageCtor !== 'function')
        return false;
    return tryRun(() => {
        const img = new ImageCtor();
        img.src = url;
        return true;
    }, false);
}
function createImageChannel(opts = {}) {
    var _a, _b, _c, _d, _e, _f;
    const host = (_a = opts.host) !== null && _a !== void 0 ? _a : IMAGE_REPORT_DEFAULTS.host;
    const projectId = (_b = opts.projectId) !== null && _b !== void 0 ? _b : IMAGE_REPORT_DEFAULTS.projectId;
    const topicId = (_c = opts.topicId) !== null && _c !== void 0 ? _c : IMAGE_REPORT_DEFAULTS.topicId;
    const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 10000;
    const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : IMAGE_MAX_RETRIES;
    const maxUrlLength = (_f = opts.maxUrlLength) !== null && _f !== void 0 ? _f : 6 * 1024;
    const preferBeacon = opts.preferImageBeacon !== false;
    const nowMs = opts.nowMs;
    /** 是否填齐了发包必备参数。 */
    function configured() {
        return !!(host && projectId && topicId);
    }
    /**
     * 入口预检：识别永久性错误（不可通过重试自愈），直接抛 PermanentChannelError 让上层立即丢弃。
     *
     * 在 send() 内做一次，比放在 once() 里更稳：永久错绝不进入 withRetry 的重试循环。
     */
    function preflight(payload) {
        if (!configured()) {
            throw new PermanentChannelError('image channel not configured');
        }
        const url = buildImageReportUrl(payload, {
            host,
            projectId,
            topicId,
            nowMs,
        });
        if (url.length > maxUrlLength) {
            throw new PermanentChannelError('image url too long: ' + url.length + ' > ' + maxUrlLength);
        }
        return url;
    }
    /**
     * 单次发送（已构好 URL）。**只处理网络层错误**，不再判断超长 / 配置缺失（已在 preflight）。
     */
    function once(url) {
        if (preferBeacon && tryImageBeacon(url)) {
            return Promise.resolve();
        }
        const u = getUni$3();
        if (!u || typeof u.request !== 'function') {
            // 环境本身既无 Image 也无 uni.request，重试不会自愈 → 永久错
            return Promise.reject(new PermanentChannelError('no Image and uni.request unavailable'));
        }
        return new Promise((resolve, reject) => {
            let settled = false;
            const timer = setTimeout(() => {
                if (settled)
                    return;
                settled = true;
                reject(new Error('image timeout'));
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
                    if (code >= 200 && code < 400)
                        resolve();
                    else
                        reject(new Error('image status ' + code));
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
        name: 'image',
        available() {
            // 配置齐全即可：浏览器无 Image 时仍能走 uni.request 兜底
            return configured();
        },
        /**
         * 反推单批 `requests` 原文字节上限：
         *   原文 ≤ (maxUrlLength - IMAGE_URL_BASE_OVERHEAD) / IMAGE_ENCODE_RATIO
         *
         * 例：默认 `maxUrlLength = 6144`，IMAGE_URL_BASE_OVERHEAD = 256，IMAGE_ENCODE_RATIO = 2.5
         *   → 原文上限 = (6144 - 256) / 2.5 ≈ 2355 字节
         * collector 取该值与全局 `BATCH_REQUESTS_MAX_BYTES` 的 min 作为切片阈值；
         * 实测可让"100 条 ~440B 事件"切成 ~20 片，每片 encode 后稳定 < 6KB。
         *
         * 下限保护：512B（避免 `maxUrlLength` 配置过小导致单条事件都放不下）。
         */
        maxRequestBytes() {
            const raw = (maxUrlLength - IMAGE_URL_BASE_OVERHEAD) / IMAGE_ENCODE_RATIO;
            return Math.max(512, Math.floor(raw));
        },
        send(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                // 1) 入口预检：永久错直接抛，**不进 withRetry**，避免协议层空转
                let url;
                try {
                    url = preflight(payload);
                }
                catch (e) {
                    if (isPermanentChannelError(e)) {
                        logger.warn('[uni-stat] image channel permanent error, skip retry', e);
                    }
                    throw e;
                }
                // 2) 网络层重试
                try {
                    yield withRetry(() => once(url), {
                        times: maxRetries,
                        baseDelayMs: RETRY_BASE_DELAY_MS,
                        sleep: opts.sleep,
                    });
                }
                catch (e) {
                    // 重试过程中若拿到 permanent（理论上极少：环境 API 在重试间消失），同样冒泡
                    if (isPermanentChannelError(e)) {
                        logger.warn('[uni-stat] image channel permanent error during retry', e);
                    }
                    else {
                        logger.warn('[uni-stat] image channel send failed after retries', e);
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
 *   - 会话创建类型使用文档字段名 `cst`（内部 storage 仍以 sct 命名，仅出口处映射）。
 *   - 不再上行 `sst / seq / pid / odid`：
 *       * sst/seq 仅本地用于会话状态机，不参与服务端入库；
 *       * pid（上一会话 sid）当前后端无入库口径；
 *       * odid 由文档明确剔除。
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
     *   - `mpsdk` ← `system.sdkVersion`
     *   - `pr/ww/wh/sw/sh/lang` 来自 `locale`（实时取，修复缺陷 #18）
     *   - `lat/lng` 当前 LocationResult 仅含字符串经纬度，cn/pn/ct 留空待 adapter 扩展
     *
     * 不再上行 `odid`：文档无此字段；保留 `device.odid` 仅供调试与未来兼容场景。
     */
    function baseFields() {
        var _a;
        const { config, platform, system, locale, device, net, location, pkg, legacy, } = deps;
        return {
            ak: s(config.ak),
            usv: s(config.usv),
            v: s((_a = config.v) !== null && _a !== void 0 ? _a : system.appVersion),
            ch: s(config.ch),
            ut: s(platform.ut),
            p: s(platform.p),
            did: s(device.uuid),
            brand: s(system.brand),
            md: s(system.md),
            sv: s(system.sv),
            mpsdk: s(system.sdkVersion),
            mpv: s(system.appWgtVersion),
            pr: n(locale.pr, 1),
            ww: n(locale.ww),
            wh: n(locale.wh),
            sw: n(locale.sw),
            sh: n(locale.sh),
            lang: s(locale.lang),
            net: s(net.net, 'unknown'),
            lat: s(location.lat),
            lng: s(location.lng),
            mpn: s(legacy === null || legacy === void 0 ? void 0 : legacy.mpn),
            tdaid: s(pkg.tdaid),
            pkn: s(pkg.pkn),
            an: s(pkg.an),
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
 * 系统信息适配。
 *
 * 私有版的痛点（参考缺陷清单 #14、#18）：
 *   - `utils/util.js` 顶层 `export const sys = uni.getSystemInfoSync()`：模块加载即执行
 *     `uni.getSystemInfoSync`，SSR / 单测 / nvue 早期阶段会直接抛错。
 *   - `lang / ww / wh` 等"可变"字段被一同缓存，用户切换系统语言或旋转屏幕后字段失真。
 *
 * 公有版职责：
 *   1. `getSystemInfo()` 懒加载 + 缓存（不可变字段：brand/md/sv/v/ut/sw/sh/pr/svv …）。
 *   2. `getLocaleAndScreen()` 实时取（lang + ww/wh + sw/sh + pr）—— 修复缺陷 #18。
 *   3. SSR/单测：当 `uni.getSystemInfoSync` 不存在或抛错时，返回安全空对象，绝不抛。
 *   4. `__resetCache()`：仅供测试，重置缓存。
 *
 * 设计取舍：
 *   - 虽然 uni-app 4.x 已拆出 `getDeviceInfo / getAppBaseInfo / getWindowInfo` 等细粒度
 *     API，但公有版要兼容老基础库（私有版同款覆盖范围），统一基于 `getSystemInfoSync`
 *     做 superset 解析。后续如需细分，再扩展独立函数。
 */
let cachedStatic = null;
/**
 * 通过 `tryRun` 安全调用 `uni.getSystemInfoSync`；失败/缺失返回 `null`。
 *
 * 不直接 `try/catch`：保持与 `infra/safe` 风格一致，错误一律走 `tryRun` 内的
 * 静默 logger，避免污染上层链路。
 */
function safeGetSystemInfo() {
    var _a;
    const u = globalThis.uni;
    if (!u || typeof u.getSystemInfoSync !== 'function')
        return null;
    return (_a = tryRun(() => u.getSystemInfoSync(), null)) !== null && _a !== void 0 ? _a : null;
}
/**
 * 取静态系统信息（懒加载 + 缓存）。
 *
 * 字段映射策略：
 *   - `brand / md / sv / v / ut`：优先取 uni-app 4.x 拆分字段（osName/deviceModel 等），
 *     退化到 system/model 兼容老基础库。
 *   - 任何字段缺失统一空字符串/0，而非 undefined，避免上行 JSON 序列化时丢字段。
 */
function getSystemInfo() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (cachedStatic)
        return cachedStatic;
    const sys = (_a = safeGetSystemInfo()) !== null && _a !== void 0 ? _a : {};
    const plus = globalThis.plus;
    cachedStatic = {
        brand: (_b = sys.brand) !== null && _b !== void 0 ? _b : '',
        md: (_d = (_c = sys.deviceModel) !== null && _c !== void 0 ? _c : sys.model) !== null && _d !== void 0 ? _d : '',
        sv: (_f = (_e = sys.osVersion) !== null && _e !== void 0 ? _e : sys.system) !== null && _f !== void 0 ? _f : '',
        v: (_g = sys.version) !== null && _g !== void 0 ? _g : '',
        ut: ((_h = sys.deviceType) !== null && _h !== void 0 ? _h : 'unknown'),
        appVersion: (_l = (_k = (_j = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _j === void 0 ? void 0 : _j.version) !== null && _k !== void 0 ? _k : sys.appVersion) !== null && _l !== void 0 ? _l : '',
        appWgtVersion: (_r = (_q = (_o = (_m = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _m === void 0 ? void 0 : _m.appWgtVersion) !== null && _o !== void 0 ? _o : (_p = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _p === void 0 ? void 0 : _p.appWgtRevision) !== null && _q !== void 0 ? _q : sys.appWgtVersion) !== null && _r !== void 0 ? _r : '',
        sdkVersion: (_s = sys.SDKVersion) !== null && _s !== void 0 ? _s : '',
        statusBarHeight: typeof sys.statusBarHeight === 'number' ? sys.statusBarHeight : 0,
    };
    return cachedStatic;
}
/**
 * 取实时字段（lang / 窗口尺寸 / 屏幕尺寸 / dpr）。
 *
 * 修复缺陷 #18：每次调用都重新读取 `uni.getSystemInfoSync()`，不复用任何缓存。
 * 如调用方需要"启动时一次"的语义，应在调用层显式缓存，而非依赖本模块。
 */
function getLocaleAndScreen() {
    var _a, _b;
    const sys = (_a = safeGetSystemInfo()) !== null && _a !== void 0 ? _a : {};
    return {
        lang: (_b = sys.language) !== null && _b !== void 0 ? _b : '',
        ww: typeof sys.windowWidth === 'number' ? sys.windowWidth : 0,
        wh: typeof sys.windowHeight === 'number' ? sys.windowHeight : 0,
        sw: typeof sys.screenWidth === 'number' ? sys.screenWidth : 0,
        sh: typeof sys.screenHeight === 'number' ? sys.screenHeight : 0,
        pr: typeof sys.pixelRatio === 'number' ? sys.pixelRatio : 1,
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
 *   - `tdaid`：第三方平台 appid（小程序 = 平台分配的 appid；App = manifest appid）。
 *   - `pkn`：包名（App = packageName / bundleId；小程序回填 tdaid，避免空字段）。
 *   - `an`：应用名（App = plus.runtime.appname；其他端 = `process.env.UNI_APP_NAME`）。
 */
let cached = null;
function getUni$2() {
    const u = resolveUniRuntime();
    return u != null && typeof u === 'object' ? u : undefined;
}
function getPlus() {
    return globalThis.plus;
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
    var _a;
    const u = getUni$2();
    switch (platform) {
        case 'wx':
        case 'qq':
            if (((_a = u === null || u === void 0 ? void 0 : u.canIUse) === null || _a === void 0 ? void 0 : _a.call(u, 'getAccountInfoSync')) && u.getAccountInfoSync) {
                return tryRun(() => { var _a, _b; return (_b = (_a = u.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : ''; }, '');
            }
            return '';
        case 'ali':
        case 'dt': {
            const my = globalThis.my;
            if (!my)
                return '';
            const v1 = tryRun(() => { var _a, _b; return (_b = (_a = my.getAppIdSync) === null || _a === void 0 ? void 0 : _a.call(my)) !== null && _b !== void 0 ? _b : ''; }, '');
            if (v1)
                return v1;
            return tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = my.getAccountInfoSync) === null || _a === void 0 ? void 0 : _a.call(my).miniProgram) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : ''; }, '');
        }
        case 'tt':
        case 'lark': {
            const tt = globalThis.tt;
            return tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = tt === null || tt === void 0 ? void 0 : tt.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(tt).microapp) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : ''; }, '');
        }
        case 'bd': {
            const swan = globalThis.swan;
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
    return tryRun(() => { var _a, _b; return (_b = (_a = globalThis.document) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : ''; }, '');
}
/**
 * 启动时获取一次包信息；结果缓存于内存。
 *
 * 所有字段保证返回 `string`；缺失统一为 `''`，符合 `domain/statData.ts` 的字段处理约定。
 */
function getPackageInfo() {
    if (cached)
        return cached;
    const platform = getPlatform();
    getRawPlatform();
    let tdaid = '';
    let pkn = '';
    let an = '';
    if (isApp()) {
        tdaid = tryRun(() => { var _a, _b, _c; return (_c = (_b = (_a = getPlus()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.appid) !== null && _c !== void 0 ? _c : ''; }, '');
        pkn = getAppPkn() || tdaid;
        an = getAppName() || getEnvAppName();
    }
    else if (isMp()) {
        tdaid = getMpTdaid(platform);
        // 小程序无包名概念，约定 pkn = tdaid，避免空字段
        pkn = tdaid;
        an = getEnvAppName();
    }
    else if (isH5()) {
        tdaid = '';
        pkn = '';
        an = getH5AppName();
    }
    else {
        // unknown / 快应用等：尝试 env 注入即可
        tdaid = '';
        pkn = '';
        an = getEnvAppName();
    }
    cached = { tdaid, pkn, an };
    return cached;
}

const registry = new Map();
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
            try {
                getUni$1().removeInterceptor(api);
            }
            catch (_a) {
                // 即使解绑失败也应保证下次重装时不带本次 handlers
            }
        }
        else {
            reinstall(api);
        }
    };
}
/**
 * 把 registry 中某个 api 的全部 handlers 合并成一个 fanout 拦截器，重新挂到 uni。
 */
function reinstall(api) {
    const set = registry.get(api);
    if (!set || set.size === 0)
        return;
    const fanout = {
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
    try {
        const uni = getUni$1();
        // 先 remove 再 add，避免不同 uni 实现对"重复 add"行为不一致
        try {
            uni.removeInterceptor(api);
        }
        catch (_a) {
            /* ignore */
        }
        uni.addInterceptor(api, fanout);
    }
    catch (_b) {
        // uni 不可用（例如 nvue 早期阶段）：保留 registry，等下次 reinstall 时再尝试
    }
}
function getUni$1() {
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === 'object'
        ? raw
        : undefined;
    if (!u)
        throw new Error('[uni统计公有版] uni interceptor API is not available');
    return u;
}
/**
 * 仅供单测使用：清空 registry，让本模块「像刚加载」一样。
 */
function __reset() {
    registry.clear();
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
    const u = globalThis.uni;
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
        logger.info('[uni-stat] migrated legacy keys', migrated);
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
            logger.warn('[uni-stat] cloud channel unavailable and fallback disabled, drop batch');
            return undefined;
        }
        if (opts.http && opts.http.available()) {
            logger.warn('[uni-stat] cloud channel unavailable, fallback to http channel');
            return opts.http;
        }
        logger.warn('[uni-stat] no channel available');
        return undefined;
    }
    // image（默认）：image > http
    if (opts.image && opts.image.available())
        return opts.image;
    if (!fallback) {
        if (opts.image) {
            // 仅在 image 已构造但失效时给出警告，便于排查；未构造视为正常的"未启用"
            logger.warn('[uni-stat] image channel unavailable and fallback disabled, drop batch');
        }
        return undefined;
    }
    if (opts.http && opts.http.available()) {
        if (opts.image) {
            // 同上，仅在 image 已构造但失效时打印降级日志
            logger.warn('[uni-stat] image channel unavailable, fallback to http channel');
        }
        return opts.http;
    }
    logger.warn('[uni-stat] no channel available');
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
let restored = false;
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
        logger.warn('[uni-stat] queue persist failed', e);
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
        logger.warn('[uni-stat] enqueue dropped: missing lt', data);
        return;
    }
    let serialized = '';
    try {
        serialized = JSON.stringify(data);
    }
    catch (e) {
        logger.warn('[uni-stat] enqueue dropped: stringify failed', e);
        return;
    }
    if (serialized.length > singleEventMaxBytes) {
        logger.warn('[uni-stat] enqueue dropped: single event too large', 'lt=' + lt, 'bytes=' + serialized.length, 'limit=' + singleEventMaxBytes);
        return;
    }
    restoreOnce();
    if (!state.bucket[lt])
        state.bucket[lt] = [];
    state.bucket[lt].push(data);
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
    persistBucket();
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
        logger.warn('[uni-stat] retry queue overflow, drop oldest', dropped === null || dropped === void 0 ? void 0 : dropped.id);
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
            logger.warn('[uni-stat] retry item expired, drop', it.id);
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
            logger.warn('[uni-stat] retry item exceeded maxAttempts, drop as dead letter', id, 'attempts=' + it.attempts);
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
                .catch((e) => logger.warn('[uni-stat] recoverRetry failed', e));
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
        this.collector = undefined;
        this.collectorDeps = undefined;
        this.httpChannel = undefined;
        this.cloudChannel = undefined;
        this.imageChannel = undefined;
        this.config = undefined;
        this.installed = false;
    }
    normalizeConfig(c) {
        var _a, _b, _c, _d, _e;
        return {
            ak: (_a = c.ak) !== null && _a !== void 0 ? _a : getAppId$1(),
            v: c.v,
            ch: (_b = c.ch) !== null && _b !== void 0 ? _b : '',
            version: (_c = c.version) !== null && _c !== void 0 ? _c : 'image',
            backgroundTimeoutSec: (_d = c.backgroundTimeoutSec) !== null && _d !== void 0 ? _d : 300,
            pageInactiveTimeoutSec: (_e = c.pageInactiveTimeoutSec) !== null && _e !== void 0 ? _e : 1800,
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
        const clientOs = getClientOs();
        const builder = createStatDataBuilder({
            config: { ak: cfg.ak, usv: STAT_VERSION_PUBLIC, v: cfg.v, ch: cfg.ch },
            platform: {
                ut: platformShort,
                p: clientOs === 'unknown' ? '' : clientOs,
            },
            system: tryRun(() => getSystemInfo(), {
                brand: '',
                md: '',
                sv: '',
                v: '',
                ut: 'unknown',
                appVersion: '',
                appWgtVersion: '',
                sdkVersion: '',
                statusBarHeight: 0,
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
                uuid: tryRun(() => getUuid(), ''),
                odid: tryRun(() => getOdid(), ''),
            },
            net: { net: 'unknown', raw: '' },
            location: { lat: '', lng: '', ok: false },
            pkg: tryRun(() => getPackageInfo(), { tdaid: '', pkn: '', an: '' }),
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
            },
            config: { usv: STAT_VERSION_PUBLIC },
            nowMs,
            nowSec,
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
function readManifestStatConfig() {
    try {
        const raw = process.env.UNI_STATISTICS_CONFIG;
        if (!raw || typeof raw !== 'string')
            return undefined;
        const obj = JSON.parse(raw);
        if (!obj || typeof obj !== 'object')
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
        logger.warn('[uni-stat] readManifestStatConfig failed', e);
        return undefined;
    }
}
/**
 * 构建期 manifest 注入核对（面向小程序 / H5 差异排查）。
 *
 * 使用 `logger.info` 输出（不依赖 manifest.debug），便于在微信开发者工具直接复制粘贴给维护者。
 * 仅输出类型、长度、顶层键名及对会话阈值相关的字段**原文**（不含整段 JSON，避免泄露 ak）。
 *
 * @param fromManifest `readManifestStatConfig` 映射后的结果，便于对照「注入原文 → 映射结果」。
 */
function logManifestBuildInjectDiagnostics(fromManifest) {
    if (typeof process !== 'undefined' &&
        process.env.NODE_ENV === 'test') {
        return;
    }
    try {
        // 只使用 initDefine / uni:stat 已声明的 `process.env.XXX` 字面量；勿读 `UNI_APP_X` 等未进
        // `initDefine` 的键：小程序无 `process` 时，未替换的 `process.env.*` 会直接 ReferenceError。
        const raw = process.env.UNI_STATISTICS_CONFIG;
        let parsedKeys = [];
        let parseError;
        const sample = {};
        if (typeof raw === 'string' && raw.length > 0) {
            try {
                const o = JSON.parse(raw);
                parsedKeys = Object.keys(o);
                Object.assign(sample, {
                    enable: o.enable,
                    version: o.version,
                    reportInterval: o.reportInterval,
                    reportIntervalSec: o.reportIntervalSec,
                    backgroundTimeout: o.backgroundTimeout,
                    backgroundTimeoutSec: o.backgroundTimeoutSec,
                    pageInactiveTimeout: o.pageInactiveTimeout,
                    pageInactiveTimeoutSec: o.pageInactiveTimeoutSec,
                });
            }
            catch (e) {
                parseError = e instanceof Error ? e.message : String(e);
            }
        }
        logger.info('[manifest 构建注入诊断] 请整段复制给排查（len=0：define 未替换或曾对 env 误包 typeof process）', {
            UNI_PLATFORM: process.env.UNI_PLATFORM,
            UNI_STAT_DEBUG: process.env.UNI_STAT_DEBUG,
            UNI_STATISTICS_CONFIG_type: raw === undefined ? 'undefined' : typeof raw,
            UNI_STATISTICS_CONFIG_len: typeof raw === 'string' ? raw.length : 0,
            json_parse_ok: parseError === undefined &&
                typeof raw === 'string' &&
                raw.length > 0,
            json_parse_error: parseError,
            parsed_top_keys: parsedKeys,
            parsed_sample_stat_fields: sample,
            readManifestStatConfig_keys: fromManifest
                ? Object.keys(fromManifest)
                : [],
            readManifestStatConfig_timeouts: fromManifest
                ? {
                    backgroundTimeoutSec: fromManifest.backgroundTimeoutSec,
                    pageInactiveTimeoutSec: fromManifest.pageInactiveTimeoutSec,
                    reportIntervalSec: fromManifest.reportIntervalSec,
                }
                : undefined,
        });
    }
    catch (e) {
        logger.warn('[uni-stat] manifest 构建注入诊断输出失败（小程序请勿读取未 define 的 process.env）', e);
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
/**
 * 判定 `uni` 是否已具备生命周期绑定所需 API。
 *
 * 部分环境下 `uni` 仅作为**构建注入的模块标识符**存在，不在 `globalThis.uni`；
 * 已统一由 `infra/uniRuntime#resolveUniRuntime` 解析（含注入路径）。
 */
function isUniLifecycleReady() {
    const u = getUni();
    return !!(u && typeof u.onAppShow === 'function');
}
/** install 是否已经触发过（不论成功失败）。 */
let bootstrapped = false;
/** 已注册到全局的 unbind，便于 __reset。 */
let lastUnbind;
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
    logManifestBuildInjectDiagnostics(fromManifest);
    const finalConfig = Object.assign({}, fromManifest, opts.config);
    const app = getStatApp();
    tryRun(() => app.install(finalConfig, opts.overrides), undefined);
    // 启动摘要：与生命周期解耦，保证 StatApp.install 完成后立刻可打印（不依赖 uni 是否已挂载）。
    tryRun(() => {
        var _a, _b, _c;
        const cfgBoot = app.getConfig();
        const appName = process.env.UNI_APP_NAME || '';
        logBoot({
            channel: (_a = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.version) !== null && _a !== void 0 ? _a : 'image',
            reportIntervalSec: (_b = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.reportIntervalSec) !== null && _b !== void 0 ? _b : 0,
            ak: (_c = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.ak) !== null && _c !== void 0 ? _c : '',
            appName,
            debugFromManifest: process.env.UNI_STAT_DEBUG === 'true' ||
                process.env.UNI_STAT_DEBUG === true,
            backgroundTimeoutSec: cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.backgroundTimeoutSec,
            pageInactiveTimeoutSec: cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.pageInactiveTimeoutSec,
        });
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
        if (!opts.skipVueMixin) {
            tryRun(() => mountVueMixin(mixin), undefined);
        }
        if (!opts.skipUniReport) {
            tryRun(() => mountUniReport(app), undefined);
        }
    };
    if (isUniLifecycleReady()) {
        finishLifecycleInstall();
        return;
    }
    queueMicrotask(() => {
        if (isUniLifecycleReady()) {
            finishLifecycleInstall();
            return;
        }
        setTimeout(() => {
            if (!isUniLifecycleReady()) {
                logger.warn('[uni-stat] uni 运行时仍未就绪（缺少 onAppShow），统计生命周期绑定已推迟；若仍无采集日志请检查入口脚本加载顺序或延后引入 uni-stat-public');
            }
            finishLifecycleInstall();
        }, 0);
    });
}
/**
 * 把 mixin 装到 vue 实例上。优先走 `uni.onCreateVueApp`（VUE3）；缺失时回退
 * `require('vue').mixin`（VUE2 / 兼容层）。两者都没有则记录 warn，不抛。
 */
function mountVueMixin(mixin) {
    var _a;
    const u = getUni();
    if (u && typeof u.onCreateVueApp === 'function') {
        u.onCreateVueApp((vueApp) => {
            tryRun(() => vueApp.mixin(mixin), undefined);
        });
        return;
    }
    // VUE2 兼容；用 eval('require') 防止打包工具静态解析失败。
    const req = globalThis
        .require;
    if (typeof req === 'function') {
        const Vue = tryRun(() => req('vue'), {});
        const target = (_a = Vue === null || Vue === void 0 ? void 0 : Vue.default) !== null && _a !== void 0 ? _a : Vue;
        if (target && typeof target.mixin === 'function') {
            tryRun(() => target.mixin(mixin), undefined);
            return;
        }
    }
    logger.warn('[uni-stat] no vue mixin entry available; lifecycle not bound to vue');
}
/**
 * 把 `uni.report` 桥到 StatApp.report。
 */
function mountUniReport(app) {
    const u = getUni();
    if (!u)
        return;
    u.report = (type, value) => {
        app.report(type, value);
    };
}
/** 仅供测试：重置 install 哨兵；调用方应同时调 `__resetStatApp()`。 */
function __resetInstall() {
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

exports.__resetInstall = __resetInstall;
exports.__resetStatApp = __resetStatApp;
exports.getStatApp = getStatApp;
exports.installPublicStat = installPublicStat;
