/**
 * 地理位置适配。
 *
 * 公有版策略：
 *   1. **默认关闭**：`config.ts#enableLocation` 为 false 时，本模块直接 resolve 默认值，
 *      不调任何 uni / plus API；避免私有版"无脑调 getLocation 弹权限框"的合规风险。
 *   2. 即便开启，也走超时 + tryRun 双重兜底，绝不阻塞上报链路（修复缺陷 #10）。
 *   3. 不缓存：location 时效性强，由调用方自行决定缓存策略；
 *      session 维度的"启动一次"在 `domain/visit` 中包装。
 *
 * 字段映射：上行字段 `lat / lng`，类型 `string`（保持与私有版兼容）；
 * 失败时分别填 `''`，由 `domain/statData.ts` 决定是否丢字段。
 */

import { tryRun } from '../infra/safe'

export interface LocationResult {
  /** 纬度字符串；失败为空。 */
  lat: string
  /** 经度字符串；失败为空。 */
  lng: string
  /** 是否真实拿到位置（true 表示业务可用）。 */
  ok: boolean
}

const DEFAULT_RESULT: LocationResult = { lat: '', lng: '', ok: false }

interface UniLocationApi {
  getLocation?: (opts: {
    type?: string
    altitude?: boolean
    success?: (res: { latitude: number; longitude: number }) => void
    fail?: (e: unknown) => void
    complete?: () => void
  }) => void
}

function getUni(): UniLocationApi | undefined {
  return (globalThis as unknown as { uni?: UniLocationApi }).uni
}

export interface GetLocationOptions {
  /** 是否启用；建议从 `config.ts` 透传。默认 false 直接走兜底。 */
  enabled?: boolean
  /** 超时时间，默认 2000ms。 */
  timeoutMs?: number
  /** 坐标系：'wgs84' | 'gcj02'，默认 'wgs84'。 */
  type?: 'wgs84' | 'gcj02'
}

/**
 * 数字坐标转字符串。约束 6 位小数（公有版统一精度，避免不同平台差异）。
 *
 * 不直接 `.toFixed(6)`：toFixed 会对极小数字 (`1e-7`) 输出科学计数法到 string 时仍带尾零，
 * 这里 + 1e-9 后做 `Number.toFixed` 再去尾零，得到稳定字符串。
 */
function fmtCoord(n: number): string {
  if (typeof n !== 'number' || Number.isNaN(n) || !Number.isFinite(n)) return ''
  return Number(n.toFixed(6)).toString()
}

/**
 * 获取一次位置。任何路径都 resolve（永不 reject）。
 */
export function getLocation(
  opts: GetLocationOptions = {}
): Promise<LocationResult> {
  const { enabled = false, timeoutMs = 2000, type = 'wgs84' } = opts
  return new Promise<LocationResult>((resolve) => {
    if (!enabled) {
      resolve(DEFAULT_RESULT)
      return
    }
    const u = getUni()
    if (!u || typeof u.getLocation !== 'function') {
      resolve(DEFAULT_RESULT)
      return
    }
    let settled = false
    const finish = (r: LocationResult): void => {
      if (settled) return
      settled = true
      resolve(r)
    }
    const timer = setTimeout(() => finish(DEFAULT_RESULT), timeoutMs)

    tryRun(
      () =>
        u.getLocation!({
          type,
          success: (res) => {
            clearTimeout(timer)
            finish({
              lat: fmtCoord(res?.latitude as number),
              lng: fmtCoord(res?.longitude as number),
              ok: true,
            })
          },
          fail: () => {
            clearTimeout(timer)
            finish(DEFAULT_RESULT)
          },
        }),
      undefined
    )
  })
}
