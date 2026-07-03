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

import { resolveUniRuntime } from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import { isMp } from './platform'

export interface AppShowEvent {
  /** uni 透传的 path 字段（小程序场景），其他端可能为空。 */
  path?: string
  /** uni 透传的 query。 */
  query?: Record<string, unknown>
  /** 场景值（小程序）。 */
  scene?: string | number
  /** 转发来源信息（部分平台）。 */
  shareTicket?: string
  /** 任意原始字段。 */
  [k: string]: unknown
}

interface UniLifecycleApi {
  onAppShow?: (cb: (e: AppShowEvent) => void) => void
  onAppHide?: (cb: () => void) => void
  onAppLaunch?: (cb: (e: AppShowEvent) => void) => void
  offAppShow?: (cb: (e: AppShowEvent) => void) => void
  offAppHide?: (cb: () => void) => void
  offAppLaunch?: (cb: (e: AppShowEvent) => void) => void
  getLaunchOptionsSync?: () => AppShowEvent
}

function getUni(): UniLifecycleApi | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniLifecycleApi) : undefined
}

/**
 * 通用 on/off 包装。失败 / 缺失 API 时返回 noop unsubscribe。
 *
 * 抽出泛型函数避免 `onAppShow/Hide/Launch` 三段重复。
 */
function bind<E>(
  on: ((cb: (e: E) => void) => void) | undefined,
  off: ((cb: (e: E) => void) => void) | undefined,
  cb: (e: E) => void
): () => void {
  if (typeof on !== 'function') {
    return () => {
      /* noop */
    }
  }
  const wrapped = (e: E): void => {
    tryRun(() => cb(e), undefined)
  }
  tryRun(() => on(wrapped), undefined)
  return () => {
    if (typeof off === 'function') {
      tryRun(() => off(wrapped), undefined)
    }
  }
}

/** 订阅应用进入前台。 */
export function onAppShow(cb: (e: AppShowEvent) => void): () => void {
  const u = getUni()
  return bind<AppShowEvent>(u?.onAppShow, u?.offAppShow, cb)
}

/** 订阅应用进入后台。 */
export function onAppHide(cb: () => void): () => void {
  const u = getUni()
  return bind<void>(u?.onAppHide, u?.offAppHide, cb)
}

/**
 * 订阅冷启动事件。
 *
 * 多数端在 mixin 注入的 `onLaunch` 之外没有独立 onAppLaunch；本函数对 unmissing 的
 * `uni.onAppLaunch` 做兼容（H5/部分平台支持），其他端调用方应在 vue mixin 里走
 * `App.onLaunch`，由 `runtime/install.ts` 统一桥接。
 */
export function onAppLaunch(cb: (e: AppShowEvent) => void): () => void {
  const u = getUni()
  return bind<AppShowEvent>(u?.onAppLaunch, u?.offAppLaunch, cb)
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
export function getLaunchScene(override?: string | number): string {
  if (override !== undefined && override !== null && override !== '') {
    return String(override)
  }
  const u = getUni()
  if (typeof u?.getLaunchOptionsSync !== 'function') return ''
  // 仅小程序宿主有有意义的 scene；其它端即便存在 getLaunchOptionsSync 也无场景值。
  if (!isMp()) return ''
  return tryRun(() => {
    const opts = u.getLaunchOptionsSync!()
    const scene = opts?.scene
    return scene === undefined || scene === null ? '' : String(scene)
  }, '')
}
