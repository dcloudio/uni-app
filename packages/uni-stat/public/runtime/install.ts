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
import { type StatAppConfig, type StatAppOverrides, getStatApp } from './StatApp'
import { logger } from '../infra/logger'
import { tryRun } from '../infra/safe'

import type { LifecycleOptions } from './lifecycleHooks'

interface UniGlobal {
  onCreateVueApp?: (cb: (app: { mixin: (m: Record<string, unknown>) => void }) => void) => void
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

  const app = getStatApp()
  tryRun(() => app.install(opts.config, opts.overrides), undefined)

  const { mixin, unbind } = bindLifecycle(app, opts.lifecycle)
  lastUnbind = unbind

  if (!opts.skipVueMixin) {
    tryRun(() => mountVueMixin(mixin), undefined)
  }

  if (!opts.skipUniReport) {
    tryRun(() => mountUniReport(app), undefined)
  }
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
  const req = (globalThis as unknown as { require?: (m: string) => unknown }).require
  if (typeof req === 'function') {
    const Vue = tryRun<{ default?: { mixin?: (m: Record<string, unknown>) => void }; mixin?: (m: Record<string, unknown>) => void }>(
      () => req('vue') as { mixin?: (m: Record<string, unknown>) => void },
      {} as { mixin?: (m: Record<string, unknown>) => void },
    )
    const target = Vue?.default ?? Vue
    if (target && typeof target.mixin === 'function') {
      tryRun(() => target.mixin!(mixin), undefined)
      return
    }
  }
  logger.warn('[uni-stat] no vue mixin entry available; lifecycle not bound to vue')
}

/**
 * 把 `uni.report` 桥到 StatApp.report。
 */
function mountUniReport(app: ReturnType<typeof getStatApp>): void {
  const u = getUni()
  if (!u) return
  ;(u as { report?: (type: string, value?: unknown) => void }).report = (type, value): void => {
    app.report(type, value)
  }
}

/** 仅供测试：重置 install 哨兵；调用方应同时调 `__resetStatApp()`。 */
export function __resetInstall(): void {
  if (lastUnbind) tryRun(() => lastUnbind!(), undefined)
  lastUnbind = undefined
  bootstrapped = false
}
