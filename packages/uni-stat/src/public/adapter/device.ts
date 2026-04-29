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

import { tryRun } from '../infra/safe'
import { storage } from '../infra/storage'
import { nowMs } from '../infra/time'
import { resolveUniRuntime } from '../infra/uniRuntime'

import { getRawPlatform, isApp, isH5 } from './platform'

const STORAGE_KEY_UUID = 'device:uuid'

let cachedUuid: string | null = null

/**
 * App、H5、微信小程序上优先用拆分 API `getDeviceInfo().deviceId`；其它平台保持原兜底顺序。
 */
function preferGetDeviceInfoDeviceIdFirst(): boolean {
  if (isApp() || isH5()) return true
  return getRawPlatform() === 'mp-weixin'
}

/**
 * 读取 `uni.getSystemInfoSync().deviceId`；任何异常 / 缺失返回空串。
 *
 * 不复用 `adapter/system.getSystemInfo`：deviceId 在 uni-app 字段表里属于"敏感字段"，
 * 公有版默认不暴露在 `SystemInfoStatic` 中，仅在本 adapter 内部使用。
 */
function readSysDeviceId(): string {
  const root = resolveUniRuntime()
  const u =
    root != null && typeof root === 'object'
      ? (root as { getSystemInfoSync?: () => { deviceId?: string } })
      : undefined
  if (!u || typeof u.getSystemInfoSync !== 'function') return ''
  return tryRun(() => u.getSystemInfoSync!().deviceId ?? '', '')
}

/**
 * 读取 `uni.getDeviceInfo().deviceId`（官方推荐的设备标识来源之一）。
 *
 * API 不存在或抛错时返回空串，由 `getUuid` 继续走 `getSystemInfoSync` / storage 兜底。
 */
function readGetDeviceInfoDeviceId(): string {
  const root = resolveUniRuntime()
  const u =
    root != null && typeof root === 'object'
      ? (root as { getDeviceInfo?: () => { deviceId?: string } })
      : undefined
  if (!u || typeof u.getDeviceInfo !== 'function') return ''
  return tryRun(() => u.getDeviceInfo!().deviceId ?? '', '')
}

/**
 * 生成兜底设备 id（did）：**纯数字串**，与常见线上形态一致（毫秒时间戳 + 6 位随机数，约 19 位）。
 *
 * 与 `infra/sid.genSid` 区别：uuid 设备级持久化；sid 每会话新生且带 `-xxxx-xxxx` 形后缀。
 */
function generateAnonUuid(): string {
  const ms = nowMs()
  const rnd = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0')
  return `${ms}${rnd}`
}

/**
 * 取设备 uuid（上行映射为 `did`）。
 *
 * 优先级：内存缓存 →（App/H5/mp-weixin）`getDeviceInfo().deviceId` →
 * `getSystemInfoSync().deviceId` → storage 历史值 → 新生成 anon 并落库。
 *
 * 任何环节失败都不抛错，最差情况返回新生成的 anon uuid（仅当次进程内有效），
 * 调用方据此能保证字段非空（避免私有版 `''` 上报后被丢弃）。
 */
export function getUuid(): string {
  if (cachedUuid) return cachedUuid

  if (preferGetDeviceInfoDeviceIdFirst()) {
    const fromDeviceInfo = readGetDeviceInfoDeviceId()
    if (fromDeviceInfo) {
      cachedUuid = fromDeviceInfo
      return cachedUuid
    }
  }

  const sysDeviceId = readSysDeviceId()
  if (sysDeviceId) {
    cachedUuid = sysDeviceId
    return cachedUuid
  }

  const stored = storage.get<string>(STORAGE_KEY_UUID)
  if (typeof stored === 'string' && stored.length > 0) {
    if (stored.startsWith('device-anon-')) {
      const upgraded = generateAnonUuid()
      tryRun(() => storage.set(STORAGE_KEY_UUID, upgraded), undefined)
      cachedUuid = upgraded
      return cachedUuid
    }
    cachedUuid = stored
    return cachedUuid
  }

  const generated = generateAnonUuid()
  tryRun(() => storage.set(STORAGE_KEY_UUID, generated), undefined)
  cachedUuid = generated
  return cachedUuid
}

/** 仅供单测：清除内存缓存。生产代码不应调用。 */
export function __resetCache(): void {
  cachedUuid = null
}
