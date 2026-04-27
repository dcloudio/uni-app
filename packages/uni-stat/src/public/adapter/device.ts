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

import { tryRun } from '../infra/safe'
import { storage } from '../infra/storage'
import { nowMs } from '../infra/time'

import { isApp } from './platform'

const STORAGE_KEY_UUID = 'device:uuid'

let cachedUuid: string | null = null
let cachedOdid: string | null = null

interface PlusRuntimeLike {
  runtime?: { getDCloudId?: () => string }
  device?: { uuid?: string }
}

/** 取 plus 全局，剥离到函数里便于 mock。 */
function getPlus(): PlusRuntimeLike | undefined {
  return (globalThis as unknown as { plus?: PlusRuntimeLike }).plus
}

/**
 * 读取 `uni.getSystemInfoSync().deviceId`；任何异常 / 缺失返回空串。
 *
 * 不复用 `adapter/system.getSystemInfo`：deviceId 在 uni-app 字段表里属于"敏感字段"，
 * 公有版默认不暴露在 `SystemInfoStatic` 中，仅在本 adapter 内部使用。
 */
function readSysDeviceId(): string {
  const u = (
    globalThis as unknown as {
      uni?: { getSystemInfoSync?: () => { deviceId?: string } }
    }
  ).uni
  if (!u || typeof u.getSystemInfoSync !== 'function') return ''
  return tryRun(() => u.getSystemInfoSync!().deviceId ?? '', '')
}

/**
 * 生成 anon-${base36(now)}-${rand} 形式的兜底 uuid。
 *
 * 与 `infra/sid.genSid` 区别：sid 每次会话都重新生成，uuid 是设备级单例，
 * 因此格式上加 `device-anon-` 前缀以便日志中分辨来源。
 */
function generateAnonUuid(): string {
  const r = Math.random().toString(36).slice(2, 12).padEnd(10, '0')
  return `device-anon-${nowMs().toString(36)}-${r}`
}

/**
 * 取设备 uuid。优先级：内存缓存 → plus.runtime.getDCloudId（App）→ system.deviceId
 * → storage 历史值 → 新生成 anon 并落库。
 *
 * 任何环节失败都不抛错，最差情况返回新生成的 anon uuid（仅当次进程内有效），
 * 调用方据此能保证字段非空（避免私有版 `''` 上报后被丢弃）。
 */
export function getUuid(): string {
  if (cachedUuid) return cachedUuid

  if (isApp()) {
    const plus = getPlus()
    const dcloudId = tryRun(() => plus?.runtime?.getDCloudId?.() ?? '', '')
    if (dcloudId) {
      cachedUuid = dcloudId
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
    cachedUuid = stored
    return cachedUuid
  }

  const generated = generateAnonUuid()
  tryRun(() => storage.set(STORAGE_KEY_UUID, generated), undefined)
  cachedUuid = generated
  return cachedUuid
}

/**
 * 取老版 device id（odid）。仅 App 端有真值（`plus.device.uuid`），其他端固定空串。
 *
 * 对比私有版：
 *   - 不再"找不到就调 getUuid()" —— 那会让 odid 与 uuid 在小程序端一致，
 *     破坏服务端"通过 odid 识别 v1 老设备"的语义。
 *   - 任何异常返回 ''，由 `domain/statData.ts` 自行决定是否丢字段。
 */
export function getOdid(): string {
  if (cachedOdid !== null) return cachedOdid
  if (!isApp()) {
    cachedOdid = ''
    return cachedOdid
  }
  const plus = getPlus()
  cachedOdid = tryRun(() => plus?.device?.uuid ?? '', '')
  return cachedOdid
}

/** 仅供单测：清除内存缓存。生产代码不应调用。 */
export function __resetCache(): void {
  cachedUuid = null
  cachedOdid = null
}
