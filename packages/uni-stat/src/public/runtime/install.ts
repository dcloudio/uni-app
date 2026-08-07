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

import {
  bindLifecycle,
  shouldBindUniAppLifecycle,
  tryBindUniAppLifecycle,
} from './lifecycleHooks'
import {
  type StatAppConfig,
  type StatAppOverrides,
  getStatApp,
} from './StatApp'

import { logBoot } from '../infra/debugLog'
import { logger } from '../infra/logger'
import { getGlobalObject, resolveUniRuntime } from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import type { LifecycleOptions } from './lifecycleHooks'

/**
 * 从 `process.env.UNI_STATISTICS_CONFIG`（plugin 注入的 manifest.uniStatistics 序列化串）
 * 读取业务配置，把已知行为字段映射为 StatApp.install 的 partial config。
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
 * ## 上行身份字段不从 manifest 读取
 *
 * `ak / v / ch` 均有更可信的数据源：`ak` 取构建期应用 AppID，`v` 取运行时版本，
 * App 端 `ch` 取 `plus.runtime.channel`。这些字段不应由
 * `manifest.uniStatistics` 静态覆盖，尤其多渠道包会因此被固定到默认渠道。
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
function parseInjectedUniStatistics(): Record<string, unknown> | undefined {
  const raw = process.env.UNI_STATISTICS_CONFIG as unknown
  if (raw == null) return undefined
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as Record<string, unknown>
  }
  if (typeof raw !== 'string') return undefined
  const trimmed = raw.trim()
  if (!trimmed || trimmed === 'undefined') return undefined
  try {
    const obj = JSON.parse(trimmed) as unknown
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return undefined
    return obj as Record<string, unknown>
  } catch (_e) {
    return undefined
  }
}

function readManifestStatConfig(): Partial<StatAppConfig> | undefined {
  try {
    const obj = parseInjectedUniStatistics()
    if (!obj) return undefined
    const cfg: Partial<StatAppConfig> = {}

    if (obj.channelVersion != null) {
      const v = String(obj.channelVersion)
      if (v === '1' || v === '2' || v === 'image') cfg.version = v
    }

    // === 公有版扩展：backgroundTimeout / pageInactiveTimeout（私有版无此字段）===
    // 同时兼容早期内部用的带 Sec 后缀别名；优先无后缀（与官方风格一致）。
    const bg = pickPositiveNumber(
      obj.backgroundTimeout,
      obj.backgroundTimeoutSec
    )
    if (bg !== undefined) cfg.backgroundTimeoutSec = bg

    const pi = pickPositiveNumber(
      obj.pageInactiveTimeout,
      obj.pageInactiveTimeoutSec
    )
    if (pi !== undefined) cfg.pageInactiveTimeoutSec = pi

    // === 私有版同名字段：reportInterval（私有版默认 10）===
    // 兼容旧公有版别名 reportIntervalSec；允许 0（私有版语义"立即上报"）。
    const ri = pickNonNegativeNumber(obj.reportInterval, obj.reportIntervalSec)
    if (ri !== undefined) cfg.reportIntervalSec = ri

    // === 私有版同名字段：collectItems.{uniPushClientID, uniStatPageLog} ===
    if (obj.collectItems && typeof obj.collectItems === 'object') {
      const items = obj.collectItems as Record<string, unknown>
      if (typeof items.uniPushClientID === 'boolean') {
        cfg.enablePush = items.uniPushClientID
      }
      if (typeof items.uniStatPageLog === 'boolean') {
        cfg.enablePageLog = items.uniStatPageLog
      }
    }

    return Object.keys(cfg).length > 0 ? cfg : undefined
  } catch (e) {
    logger.warn('[uni统计 2.0] readManifestStatConfig failed', e)
    return undefined
  }
}

/**
 * 将 manifest / JSON 中的数值候选标准化为正数（> 0）。
 * 兼容部分工具或手工编辑 manifest 时写成**字符串数字**（如 `"60"`）的情况。
 */
function normalizePositiveNumber(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return value > 0 ? value : undefined
  }
  if (typeof value === 'string') {
    const t = value.trim()
    if (t === '') return undefined
    const n = Number(t)
    if (Number.isFinite(n) && n > 0) return n
  }
  return undefined
}

/**
 * 将候选标准化为非负数（>= 0），用于 `reportInterval`。
 */
function normalizeNonNegativeNumber(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return value >= 0 ? value : undefined
  }
  if (typeof value === 'string') {
    const t = value.trim()
    if (t === '') return undefined
    const n = Number(t)
    if (Number.isFinite(n) && n >= 0) return n
  }
  return undefined
}

/**
 * 在多个候选值中按顺序取**第一个有效的正数**（> 0），其余忽略。
 * 用于 manifest 字段的"主名 / 别名"二选一解析（如 `backgroundTimeout` / `backgroundTimeoutSec`）。
 *
 * 注意：私有版历史允许 `0` 表示"立即上报"，但仅 `reportInterval` 一项有此语义；
 * timeout 类字段 0 表示"立即超时"，不合理，本函数统一过滤为 undefined。
 */
function pickPositiveNumber(...candidates: unknown[]): number | undefined {
  for (const c of candidates) {
    const n = normalizePositiveNumber(c)
    if (n !== undefined) return n
  }
  return undefined
}

/**
 * 同 `pickPositiveNumber`，但允许 `0`（用于 `reportInterval` 表达"立即上报"语义）。
 */
function pickNonNegativeNumber(...candidates: unknown[]): number | undefined {
  for (const c of candidates) {
    const n = normalizeNonNegativeNumber(c)
    if (n !== undefined) return n
  }
  return undefined
}

interface UniGlobal {
  onCreateVueApp?: (
    cb: (app: { mixin: (m: Record<string, unknown>) => void }) => void
  ) => void
  /** 与 lifecycleHooks.bindLifecycle 订阅一致；用于判定 uni 是否已就绪。 */
  onAppShow?: (
    cb: (e: { scene?: string | number; path?: string }) => void
  ) => void
  onAppHide?: (cb: () => void) => void
  report?: (type: string, value?: unknown) => void
}

function getUni(): UniGlobal | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniGlobal) : undefined
}

/** Vue3 下晚就绪 API 重试次数（50ms 间隔，约 1s）。 */
const UNI_HOOK_RETRY_MAX = 20
const UNI_HOOK_RETRY_MS = 50

/** 已排队或已执行的 vue mixin 注入，避免重复。 */
let vueMixinMounted = false
let vueMixinRetryTimer: ReturnType<typeof setTimeout> | undefined

/** install 是否已经触发过（不论成功失败）。 */
let bootstrapped = false
/** 已注册到全局的 unbind，便于 __reset。 */
let lastUnbind: (() => void) | undefined
/** 晚就绪时重试 `uni.onAppShow` 的定时器。 */
let uniHookRetryTimer: ReturnType<typeof setTimeout> | undefined

export interface InstallOptions {
  /** StatApp.install 的业务配置。 */
  config?: Partial<StatAppConfig>
  /** StatApp.install 的测试 / 高级 overrides。 */
  overrides?: StatAppOverrides
  /** lifecycleHooks.bindLifecycle 的可选项（push 开关、emitSession 等）。 */
  lifecycle?: LifecycleOptions
  /** 测试用：跳过 vue.mixin 注入（避免污染未启动 vue 的测试环境）。 */
  skipVueMixin?: boolean
  /** 测试用：跳过 `uni.report = ...` 全局赋值。 */
  skipUniReport?: boolean
}

/**
 * 入口装配。重复调用时立即返回。
 *
 * 失败任意子步骤都吞掉日志，不抛回。
 */
export function installPublicStat(opts: InstallOptions = {}): void {
  if (bootstrapped) return
  bootstrapped = true

  // 优先级：opts.config（手动覆盖） > manifest.uniStatistics（plugin 注入） > 默认值。
  // 这样业务/灰度同学既能在 manifest 里改超时阈值（生产路径），
  // 也能用 installPublicStat({ config: {...} }) 在测试环境强行覆盖（接入调试）。
  // 注意：manifest 仅解析行为配置，不解析 ak/v/ch；App 渠道始终由 plus.runtime.channel 决定。
  const fromManifest = readManifestStatConfig()
  const finalConfig: Partial<StatAppConfig> = Object.assign(
    {},
    fromManifest,
    opts.config
  )

  const app = getStatApp()
  tryRun(() => app.install(finalConfig, opts.overrides), undefined)

  // 启动摘要：与生命周期解耦，保证 StatApp.install 完成后立刻可打印（不依赖 uni 是否已挂载）。
  tryRun(() => {
    const cfgBoot = app.getConfig()
    const appName = process.env.UNI_APP_NAME || ''
    const injected = parseInjectedUniStatistics()
    const bootBase: Parameters<typeof logBoot>[0] = {
      channel: cfgBoot?.version ?? 'image',
      reportIntervalSec: cfgBoot?.reportIntervalSec ?? 0,
      ak: cfgBoot?.ak ?? '',
      appName,
      debugFromManifest:
        process.env.UNI_STAT_DEBUG === 'true' ||
        (process.env.UNI_STAT_DEBUG as unknown) === true,
    }
    // 仅当 manifest 显式配置了超时项时才在 debug 启动摘要中展示（默认值 300/1800 不刷屏）。
    if (injected != null) {
      if (
        injected.backgroundTimeout != null ||
        injected.backgroundTimeoutSec != null
      ) {
        bootBase.backgroundTimeoutSec = cfgBoot?.backgroundTimeoutSec
      }
      if (
        injected.pageInactiveTimeout != null ||
        injected.pageInactiveTimeoutSec != null
      ) {
        bootBase.pageInactiveTimeoutSec = cfgBoot?.pageInactiveTimeoutSec
      }
    }
    // #ifndef VUE3
    logBoot(Object.assign({}, bootBase, { vueMode: 'Vue2' }))
    // #endif
    // #ifdef VUE3
    logBoot(Object.assign({}, bootBase, { vueMode: 'Vue3' }))
    // #endif
  }, undefined)

  /**
   * 装配 vue mixin 与 uni 生命周期；与 logBoot 解耦，便于在 uni 晚就绪时延后执行。
   */
  const finishLifecycleInstall = (): void => {
    // 把 collectItems 的开关透传给 lifecycleHooks：
    //   - uniPushClientID → enablePush（决定是否抓取 push CID 上报 lt=101）
    //   - uniStatPageLog  → enablePageLog（决定是否上报 lt=11 页面切换事件）
    // 调用方通过 opts.lifecycle 显式传入的值优先级最高，未指定时用 manifest 默认。
    const cfg = app.getConfig()
    const lifecycleOpts = Object.assign(
      {},
      {
        enablePush: cfg?.enablePush ?? false,
        enablePageLog: cfg?.enablePageLog ?? true,
      },
      opts.lifecycle
    )

    const { mixin, unbind } = bindLifecycle(app, lifecycleOpts)
    lastUnbind = unbind

    // 与私有版 load_stat 一致：同步注入 mixin，不等待 uni.onAppShow（Vue2 根本不注册该项）。
    if (!opts.skipVueMixin) {
      tryRun(() => mountVueMixin(mixin), undefined)
    }

    if (!opts.skipUniReport) {
      tryRun(() => mountUniReport(app), undefined)
    }

    // 私有版：仅 Vue3 且非 H5/nvue 注册 uni 应用前后台。
    if (
      shouldBindUniAppLifecycle() &&
      !tryBindUniAppLifecycle(app, lifecycleOpts)
    ) {
      scheduleUniAppHookRetry(() => tryBindUniAppLifecycle(app, lifecycleOpts))
    }
  }

  finishLifecycleInstall()
}

/**
 * 仅 Vue3 小程序等重试 `uni.onAppShow` / `onAppHide`；Vue2 不调用。
 */
function scheduleUniAppHookRetry(tryBind: () => boolean): void {
  if (uniHookRetryTimer) {
    clearTimeout(uniHookRetryTimer)
    uniHookRetryTimer = undefined
  }
  let attempts = 0
  const tick = (): void => {
    if (tryBind()) return
    if (++attempts >= UNI_HOOK_RETRY_MAX) {
      logger.warn(
        '[uni统计 2.0] Vue3 小程序：uni.onAppShow 暂不可用，应用前后台统计可能缺失'
      )
      return
    }
    uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS)
  }
  uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS)
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
function tryRegisterVueAppMixin(mixin: Record<string, unknown>): boolean {
  try {
    ;(uni as UniGlobal).onCreateVueApp!((vueApp) => {
      tryRun(() => vueApp.mixin(mixin), undefined)
    })
    return true
  } catch (_e) {
    // uni 未声明且未经 inject 替换（单测等）
  }
  const u = getUni()
  if (u && typeof u.onCreateVueApp === 'function') {
    u.onCreateVueApp((vueApp) => {
      tryRun(() => vueApp.mixin(mixin), undefined)
    })
    return true
  }
  return false
}
// #endif

function mountVueMixin(mixin: Record<string, unknown>): void {
  if (vueMixinMounted) return

  // #ifndef VUE3
  if (mountVue2GlobalMixin(mixin)) {
    vueMixinMounted = true
  }
  // #endif

  // #ifdef VUE3
  if (tryRegisterVueAppMixin(mixin)) {
    vueMixinMounted = true
    return
  }
  scheduleVueAppMixinRetry(mixin)
  // #endif
}

// #ifdef VUE3
/**
 * Vue3：`onCreateVueApp` 晚就绪时短重试（对齐私有版仅注册一次 hook 的语义）。
 */
function scheduleVueAppMixinRetry(mixin: Record<string, unknown>): void {
  if (vueMixinMounted) return
  if (vueMixinRetryTimer) return
  let attempts = 0
  const tick = (): void => {
    vueMixinRetryTimer = undefined
    if (vueMixinMounted) return
    if (tryRegisterVueAppMixin(mixin)) {
      vueMixinMounted = true
      return
    }
    if (++attempts >= UNI_HOOK_RETRY_MAX) {
      if (!vueMixinMounted) {
        logger.warn(
          '[uni统计 2.0] Vue3: onCreateVueApp 在重试后仍不可用，页面级 mixin 未注入'
        )
      }
      return
    }
    vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS)
  }
  vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS)
}
// #endif

/**
 * Vue2 全局 mixin（与私有版 `index.js` 中 `require('vue').mixin` 一致）。
 *
 * @returns 是否注入成功
 */
function mountVue2GlobalMixin(mixin: Record<string, unknown>): boolean {
  // eslint-disable-next-line no-restricted-globals
  const Vue = require('vue') as {
    default?: { mixin?: (m: Record<string, unknown>) => void }
    mixin?: (m: Record<string, unknown>) => void
  }
  const target = Vue.default ?? Vue
  if (target && typeof target.mixin === 'function') {
    tryRun(() => target.mixin!(mixin), undefined)
    return true
  }
  logger.warn('[uni统计 2.0] Vue2: vue.mixin 不可用，请检查是否已安装 vue 依赖')
  return false
}

/**
 * 把 `uni.report` 桥到 StatApp.report。
 *
 * H5 发行摇树时 `resolveUniRuntime` 会跳过 `{}` 空桩，但业务仍可能通过
 * `window.uni.report` 调用；故在可用 runtime 缺失时回退 `getGlobalObject().uni`。
 */
function mountUniReport(app: ReturnType<typeof getStatApp>): void {
  const g = getGlobalObject()
  const u = (getUni() ?? g.uni) as UniGlobal | undefined
  if (!u || typeof u !== 'object') return
  ;(u as { report?: (type: string, value?: unknown) => void }).report = (
    type,
    value
  ): void => {
    app.report(type, value)
  }
}

/** 仅供测试：重置 install 哨兵；调用方应同时调 `__resetStatApp()`。 */
export function __resetInstall(): void {
  if (uniHookRetryTimer) {
    clearTimeout(uniHookRetryTimer)
    uniHookRetryTimer = undefined
  }
  if (vueMixinRetryTimer) {
    clearTimeout(vueMixinRetryTimer)
    vueMixinRetryTimer = undefined
  }
  vueMixinMounted = false
  if (lastUnbind) tryRun(() => lastUnbind!(), undefined)
  lastUnbind = undefined
  bootstrapped = false
}
