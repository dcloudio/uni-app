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
import { getGlobalObject, resolveUniRuntime } from '../infra/uniRuntime'

import { getRawPlatform, isApp, isH5 } from './platform'

const STORAGE_KEY_UUID = 'device:uuid'

/**
 * uni-h5 `getDeviceInfo().deviceId` 的底层 localStorage 键（见 `packages/uni-h5/src/helpers/uuid.ts`）。
 *
 * H5 端直接复用同一个键读写 deviceId：绕开 uni 运行时，保证 `did` 与页面
 * `uni.getDeviceInfo().deviceId` 同源一致，且跨刷新稳定。
 */
const WEB_UUID_KEY = '__DC_STAT_UUID'

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
 * 把设备 id 写回统计命名空间（`UNI_STAT_DATA:<appid>:device:uuid`），供后续启动读回锁定。
 * 写入失败静默吞掉，不影响本次返回。
 */
function persistUuid(uuid: string): void {
  tryRun(() => storage.set(STORAGE_KEY_UUID, uuid), undefined)
}

/**
 * 取浏览器 `localStorage`（cookie 被禁用 / 无 localStorage 时返回 undefined）。
 *
 * 直接走 `getGlobalObject()`（globalThis / window），**绕开可能不可用的 `uni` 运行时**；
 * 与 `adapter/web.getWebInfo` 直读 `location` 同思路。
 */
function getWebLocalStorage():
  | { getItem(k: string): string | null; setItem(k: string, v: string): void }
  | undefined {
  return tryRun(() => {
    const g = getGlobalObject() as {
      navigator?: { cookieEnabled?: boolean }
      localStorage?: {
        getItem(k: string): string | null
        setItem(k: string, v: string): void
      }
    }
    if (g.navigator && g.navigator.cookieEnabled === false) return undefined
    const ls = g.localStorage
    if (
      ls &&
      typeof ls.getItem === 'function' &&
      typeof ls.setItem === 'function'
    ) {
      return ls
    }
    return undefined
  }, undefined)
}

/**
 * H5：直接从浏览器 `localStorage` 读取 uni-h5 写入的稳定 deviceId（`__DC_STAT_UUID`）。
 * 取不到返回空串。
 */
function readWebDeviceId(): string {
  const ls = getWebLocalStorage()
  if (!ls) return ''
  return tryRun(() => {
    const v = ls.getItem(WEB_UUID_KEY)
    return typeof v === 'string' ? v : ''
  }, '')
}

/**
 * H5：把 did 直接写入浏览器 `localStorage`（与 uni-h5 同键 `__DC_STAT_UUID`）。
 * 使下次刷新读回同一值，并与页面 `uni.getDeviceInfo().deviceId` 对齐。
 */
function writeWebDeviceId(uuid: string): void {
  const ls = getWebLocalStorage()
  if (!ls) return
  tryRun(() => ls.setItem(WEB_UUID_KEY, uuid), undefined)
}

/**
 * 从 uni 运行时解析设备 id。
 *
 * - App / H5 / 微信小程序：优先 `getDeviceInfo().deviceId`，再退 `getSystemInfoSync().deviceId`；
 *   H5 上 `getDeviceInfo().deviceId` 取自 uni-h5 持久化的 `__DC_STAT_UUID`，跨刷新稳定。
 * - 其余宿主：直接 `getSystemInfoSync().deviceId`。
 *
 * 取不到时返回空串，由 `getUuid` 继续走 storage / anon 兜底。
 */
function resolveDeviceIdFromUni(): string {
  if (preferGetDeviceInfoDeviceIdFirst()) {
    const fromDeviceInfo = readGetDeviceInfoDeviceId()
    if (fromDeviceInfo) return fromDeviceInfo
  }
  return readSysDeviceId()
}

/**
 * 取设备 uuid（上行映射为 `did`）。
 *
 * 解析顺序：
 *   1. 内存缓存（同进程内恒定，保证同次启动 `did` 与 `sid` 前半段一致）。
 *   2. H5：直接读浏览器 `localStorage['__DC_STAT_UUID']`（uni-h5 写入的 deviceId）。
 *   3. uni 设备源（getDeviceInfo / getSystemInfoSync），取到即写回 storage 锁定。
 *   4. uni storage 已持久化的 did。
 *   5. uni storage 正常且无历史值 → 生成 anon 并落库。
 *   6. uni storage 读取异常：H5 直接写浏览器 localStorage 并缓存；其它端返回不缓存、不落库的临时 did。
 *
 * 任何环节失败都不抛错，最差返回新生成的临时 uuid，保证上行字段非空。
 */
export function getUuid(): string {
  if (cachedUuid) return cachedUuid

  // H5：直读浏览器 localStorage 的 deviceId，与页面 uni.getDeviceInfo().deviceId 同源。
  if (isH5()) {
    const fromWeb = readWebDeviceId()
    if (fromWeb) {
      cachedUuid = fromWeb
      return cachedUuid
    }
  }

  // uni 设备源；取到后写回 storage 锁定。
  const fromDevice = resolveDeviceIdFromUni()
  if (fromDevice) {
    persistUuid(fromDevice)
    if (isH5()) writeWebDeviceId(fromDevice)
    cachedUuid = fromDevice
    return cachedUuid
  }

  // 设备源不可用：回落到 uni storage 已持久化的 did。
  // safeRead 区分「确无历史值」与「storage 读取异常」，后者不落库以免覆盖真实值。
  const storedRead = storage.safeRead<string>(STORAGE_KEY_UUID)
  if (storedRead.ok) {
    const stored = storedRead.value
    if (typeof stored === 'string' && stored.length > 0) {
      if (stored.startsWith('device-anon-')) {
        const upgraded = generateAnonUuid()
        persistUuid(upgraded)
        if (isH5()) writeWebDeviceId(upgraded)
        cachedUuid = upgraded
        return cachedUuid
      }
      cachedUuid = stored
      return cachedUuid
    }
    // 无历史值 → 首次生成并落库。
    const generated = generateAnonUuid()
    persistUuid(generated)
    if (isH5()) writeWebDeviceId(generated)
    cachedUuid = generated
    return cachedUuid
  }

  // uni storage 读取异常。
  const ephemeral = generateAnonUuid()
  if (isH5()) {
    // H5 写浏览器 localStorage 并缓存，下次刷新读回同一值。
    writeWebDeviceId(ephemeral)
    cachedUuid = ephemeral
    return cachedUuid
  }
  // 其它端：临时 did，不缓存、不落库，避免覆盖磁盘上可能仍存在的真实 did。
  return ephemeral
}

/** 仅供单测：清除内存缓存。生产代码不应调用。 */
export function __resetCache(): void {
  cachedUuid = null
}
