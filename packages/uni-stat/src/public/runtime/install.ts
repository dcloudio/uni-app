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
import { tryRun } from '../infra/safe'

import type { LifecycleOptions } from './lifecycleHooks'

/**
 * 从 `process.env.UNI_STATISTICS_CONFIG`（plugin 注入的 manifest.uniStatistics 序列化串）
 * 读取业务配置，把已知字段映射为 StatApp.install 的 partial config。
 *
 * 与 plugin（packages/uni-stat/src/plugin/index.ts）约定字段：
 *   - `version`：**模块版本**（1=私有 1.0 / 2=私有 2.0 / 3=公有版），由 plugin 决定加载哪个
 *     dist。本函数运行在公有版内部，已是 version=3 的语境，**不再**透传该字段。
 *   - `channelVersion`：可选；公有版**通道版本**（`'1'` = HTTP 1.0、`'2'` = uniCloud 2.0、
 *     `'image'` = 火山 TLS WebTrack.gif，公有版默认）。manifest 里没写则走默认 'image'。
 *   - `backgroundTimeoutSec / pageInactiveTimeoutSec / reportIntervalSec`：直传 number。
 *   - `ak / v / ch`：可选；测试 / 灰度需要时可手工指定。
 *
 * 注意：image 通道的 `host / projectId / topicId` 是 **SDK 内部接入参数**，由维护者直接
 * 在 `public/config.ts#IMAGE_REPORT_DEFAULTS` 中维护，**不**通过 manifest 暴露给业务方。
 *
 * 任意 JSON 解析 / 字段类型异常都吞掉，回到默认值；此处**不能**抛错，否则会阻塞自动 install。
 */
function readManifestStatConfig(): Partial<StatAppConfig> | undefined {
  try {
    const env =
      (typeof process !== 'undefined' && process.env) ||
      ({} as Record<string, string | undefined>)
    const raw = env.UNI_STATISTICS_CONFIG
    if (!raw || typeof raw !== 'string') return undefined
    const obj = JSON.parse(raw) as Record<string, unknown>
    if (!obj || typeof obj !== 'object') return undefined
    const cfg: Partial<StatAppConfig> = {}
    if (obj.channelVersion != null) {
      const v = String(obj.channelVersion)
      if (v === '1' || v === '2' || v === 'image') cfg.version = v
    }
    if (
      typeof obj.backgroundTimeoutSec === 'number' &&
      obj.backgroundTimeoutSec >= 0
    ) {
      cfg.backgroundTimeoutSec = obj.backgroundTimeoutSec
    }
    if (
      typeof obj.pageInactiveTimeoutSec === 'number' &&
      obj.pageInactiveTimeoutSec >= 0
    ) {
      cfg.pageInactiveTimeoutSec = obj.pageInactiveTimeoutSec
    }
    if (
      typeof obj.reportIntervalSec === 'number' &&
      obj.reportIntervalSec >= 0
    ) {
      cfg.reportIntervalSec = obj.reportIntervalSec
    }
    if (typeof obj.ak === 'string' && obj.ak) cfg.ak = obj.ak
    if (typeof obj.v === 'string') cfg.v = obj.v
    if (typeof obj.ch === 'string') cfg.ch = obj.ch
    // imageReport.host/projectId/topicId 是内部接入参数，由 SDK 维护者直接维护，
    // 此处**不解析** manifest 中的同名字段，避免业务方误以为可以自定义后端。
    return Object.keys(cfg).length > 0 ? cfg : undefined
  } catch (e) {
    logger.warn('[uni-stat] readManifestStatConfig failed', e)
    return undefined
  }
}

interface UniGlobal {
  onCreateVueApp?: (
    cb: (app: { mixin: (m: Record<string, unknown>) => void }) => void
  ) => void
  report?: (type: string, value?: unknown) => void
}

function getUni(): UniGlobal | undefined {
  return (globalThis as unknown as { uni?: UniGlobal }).uni
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

  const { mixin, unbind } = bindLifecycle(app, opts.lifecycle)
  lastUnbind = unbind

  if (!opts.skipVueMixin) {
    tryRun(() => mountVueMixin(mixin), undefined)
  }

  if (!opts.skipUniReport) {
    tryRun(() => mountUniReport(app), undefined)
  }

  // 启动摘要：debug 模式下输出一次配置概览，方便业务方确认接入状态。
  // 非 debug 模式 logBoot 自身判断后立即返回，无副作用。
  tryRun(() => {
    const cfg = app.getConfig()
    const env =
      (typeof process !== 'undefined' && process.env) ||
      ({} as Record<string, string | undefined>)
    const appName = (env.UNI_APP_NAME as string | undefined) || ''
    logBoot({
      channel: cfg?.version ?? 'image',
      reportIntervalSec: cfg?.reportIntervalSec ?? 0,
      ak: cfg?.ak ?? '',
      appName,
      debugFromManifest:
        env.UNI_STAT_DEBUG === 'true' ||
        (env.UNI_STAT_DEBUG as unknown) === true,
    })
  }, undefined)
}

/**
 * 把 mixin 装到 vue 实例上。优先走 `uni.onCreateVueApp`（VUE3）；缺失时回退
 * `require('vue').mixin`（VUE2 / 兼容层）。两者都没有则记录 warn，不抛。
 */
function mountVueMixin(mixin: Record<string, unknown>): void {
  const u = getUni()
  if (u && typeof u.onCreateVueApp === 'function') {
    u.onCreateVueApp((app) => {
      tryRun(() => app.mixin(mixin), undefined)
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
