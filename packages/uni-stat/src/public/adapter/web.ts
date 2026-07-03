/**
 * H5 / Web 平台适配。
 *
 * 职责：采集仅 Web 端有意义的上行字段原料（如含协议的页面域名 `domain`）。
 * 非 H5 或运行时无 `window.location` 时一律返回空串，不抛错。
 */

import { getGlobalObject } from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import { isH5 } from './platform'

/** H5 Web 端上行字段原料。 */
export interface WebInfo {
  /**
   * 含协议的页面域名（如 `https://www.example.com`）。
   * 优先 `location.origin`；不可用时由 `protocol + host` 拼装。
   */
  domain: string
}

const EMPTY_WEB_INFO: WebInfo = { domain: '' }

let cached: WebInfo | null = null

/**
 * 从 `location` 解析上行 `domain`（`https://host` / `http://host` 形式）。
 *
 * 仅 `http:` / `https:` 协议有效；`file:` 等返回空串。
 */
function readWebDomainFromLocation(loc: {
  origin?: unknown
  protocol?: unknown
  host?: unknown
  hostname?: unknown
}): string {
  const protocol =
    typeof loc.protocol === 'string' ? loc.protocol.toLowerCase() : ''
  if (protocol !== 'http:' && protocol !== 'https:') return ''

  if (typeof loc.origin === 'string' && loc.origin.trim()) {
    return loc.origin.trim()
  }

  const host =
    typeof loc.host === 'string' && loc.host.trim()
      ? loc.host.trim()
      : typeof loc.hostname === 'string'
      ? loc.hostname.trim()
      : ''
  if (!host) return ''
  return `${protocol}//${host}`
}

/**
 * 读取 H5 页面 Web 信息。
 *
 * 非 H5、SSR 或无 `location` 时 `domain` 为空串。
 * 结果在进程内缓存（SPA 内 origin 通常不变）。
 */
export function getWebInfo(): WebInfo {
  if (!isH5()) return EMPTY_WEB_INFO
  if (cached !== null) return cached
  cached = tryRun(() => {
    const win = getGlobalObject() as {
      location?: {
        origin?: unknown
        protocol?: unknown
        host?: unknown
        hostname?: unknown
      }
    }
    const loc = win.location
    if (!loc) return EMPTY_WEB_INFO
    return { domain: readWebDomainFromLocation(loc) }
  }, EMPTY_WEB_INFO)
  return cached
}

/**
 * 读取 H5 上行 `domain`（含协议，如 `https://www.example.com`）。
 */
export function getWebDomain(): string {
  return getWebInfo().domain
}

/** 仅供单测：清空 Web 信息缓存。 */
export function __resetCache(): void {
  cached = null
}
