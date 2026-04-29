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

import { bindLifecycle } from './lifecycleHooks'
import {
  type StatAppConfig,
  type StatAppOverrides,
  getStatApp,
} from './StatApp'
import { logBoot } from '../infra/debugLog'
import { logger } from '../infra/logger'
import { resolveUniRuntime } from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import type { LifecycleOptions } from './lifecycleHooks'

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
function readManifestStatConfig(): Partial<StatAppConfig> | undefined {
  try {
    const raw = process.env.UNI_STATISTICS_CONFIG
    if (!raw || typeof raw !== 'string') return undefined
    const obj = JSON.parse(raw) as Record<string, unknown>
    if (!obj || typeof obj !== 'object') return undefined
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

    if (typeof obj.ak === 'string' && obj.ak) cfg.ak = obj.ak
    if (typeof obj.v === 'string') cfg.v = obj.v
    if (typeof obj.ch === 'string') cfg.ch = obj.ch

    return Object.keys(cfg).length > 0 ? cfg : undefined
  } catch (e) {
    logger.warn('[uni-stat] readManifestStatConfig failed', e)
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

/**
 * 判定 `uni` 是否已具备生命周期绑定所需 API。
 *
 * 部分环境下 `uni` 仅作为**构建注入的模块标识符**存在，不在 `globalThis.uni`；
 * 已统一由 `infra/uniRuntime#resolveUniRuntime` 解析（含注入路径）。
 */
function isUniLifecycleReady(): boolean {
  const u = getUni()
  return !!(u && typeof u.onAppShow === 'function')
}

/** install 是否已经触发过（不论成功失败）。 */
let bootstrapped = false
/** 已注册到全局的 unbind，便于 __reset。 */
let lastUnbind: (() => void) | undefined

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
    logBoot({
      channel: cfgBoot?.version ?? 'image',
      reportIntervalSec: cfgBoot?.reportIntervalSec ?? 0,
      ak: cfgBoot?.ak ?? '',
      appName,
      debugFromManifest:
        process.env.UNI_STAT_DEBUG === 'true' ||
        (process.env.UNI_STAT_DEBUG as unknown) === true,
    })
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

    if (!opts.skipVueMixin) {
      tryRun(() => mountVueMixin(mixin), undefined)
    }

    if (!opts.skipUniReport) {
      tryRun(() => mountUniReport(app), undefined)
    }
  }

  if (isUniLifecycleReady()) {
    finishLifecycleInstall()
    return
  }

  queueMicrotask(() => {
    if (isUniLifecycleReady()) {
      finishLifecycleInstall()
      return
    }
    setTimeout(() => {
      if (!isUniLifecycleReady()) {
        logger.warn(
          '[uni-stat] uni 运行时仍未就绪（缺少 onAppShow），统计生命周期绑定已推迟；若仍无采集日志请检查入口脚本加载顺序或延后引入 uni-stat-public'
        )
      }
      finishLifecycleInstall()
    }, 0)
  })
}

/**
 * 把 mixin 装到 vue 实例上。优先走 `uni.onCreateVueApp`（VUE3）；缺失时回退
 * `require('vue').mixin`（VUE2 / 兼容层）。两者都没有则记录 warn，不抛。
 */
function mountVueMixin(mixin: Record<string, unknown>): void {
  const u = getUni()
  if (u && typeof u.onCreateVueApp === 'function') {
    u.onCreateVueApp((vueApp) => {
      tryRun(() => vueApp.mixin(mixin), undefined)
    })
    return
  }
  // VUE2 兼容；用 eval('require') 防止打包工具静态解析失败。
  const req = (globalThis as unknown as { require?: (m: string) => unknown })
    .require
  if (typeof req === 'function') {
    const Vue = tryRun<{
      default?: { mixin?: (m: Record<string, unknown>) => void }
      mixin?: (m: Record<string, unknown>) => void
    }>(
      () => req('vue') as { mixin?: (m: Record<string, unknown>) => void },
      {} as { mixin?: (m: Record<string, unknown>) => void }
    )
    const target = Vue?.default ?? Vue
    if (target && typeof target.mixin === 'function') {
      tryRun(() => target.mixin!(mixin), undefined)
      return
    }
  }
  logger.warn(
    '[uni-stat] no vue mixin entry available; lifecycle not bound to vue'
  )
}

/**
 * 把 `uni.report` 桥到 StatApp.report。
 */
function mountUniReport(app: ReturnType<typeof getStatApp>): void {
  const u = getUni()
  if (!u) return
  ;(u as { report?: (type: string, value?: unknown) => void }).report = (
    type,
    value
  ): void => {
    app.report(type, value)
  }
}

/** 仅供测试：重置 install 哨兵；调用方应同时调 `__resetStatApp()`。 */
export function __resetInstall(): void {
  if (lastUnbind) tryRun(() => lastUnbind!(), undefined)
  lastUnbind = undefined
  bootstrapped = false
}
