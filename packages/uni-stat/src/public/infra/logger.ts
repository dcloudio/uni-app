/**
 * 公有版统一日志出口。
 *
 * 修复的私有版缺陷：
 *   - #19 `!!process.env.UNI_STAT_DEBUG` 在构建时若被替换为字符串 `"false"` 仍是 truthy。
 *     公有版严格使用 `=== 'true'` 判定，并允许在运行时通过 `setDebug()` 临时打开
 *     （供调试 / 灰度小流量验证）。
 *
 * 行为约定：
 *   - `debug` 受调试开关控制；其他 level 始终输出到对应的 `console.*`。
 *   - **默认（非 Android / iOS 真机侧）**：`console.*(TAG, ...args)`，对象保持原生传递。
 *   - **Android 或 iOS**（App 看 `plus.os`；`mp-*` 看 `uni.getSystemInfoSync().platform`）：
 *     仅将 **对象类参数**（含数组、Date；`Error` 转为可读短串）用 `safeStringify` 等压成字符串；
 *     再与 `TAG`、其它参数 **拼成单条字符串** 输出（部分真机 / HBuilderX 桥接只转发 `console.*` 的
 *     **第一个参数**，多参会丢失）。**其它平台**仍为 `console.*(TAG, ...args)`。
 *
 * 兼容性：
 *   - 历史版本插件 define 误把 `process.env.UNI_STAT_DEBUG` 替换成布尔字面量
 *     （未 `JSON.stringify`），导致 dist 运行时该值为 `true`/`false` 而非 `'true'`/`'false'`。
 *     `isDebug()` 同时接受字符串 `'true'` 与布尔字面量 `true`，避免历史构建产物完全失效。
 */

import { safeStringify } from './safe'

const TAG = '[uni统计公有版]'

let runtimeDebug: boolean | undefined

/**
 * 是否为 App 或小程序运行在 **Android / iOS** 上（仅此类环境对对象参数做字符串化）。
 */
function isAndroidOrIosRuntime(): boolean {
  const raw = process.env.UNI_PLATFORM ?? ''
  if (raw === 'app' || raw === 'app-plus' || raw === 'app-harmony') {
    const n = (
      globalThis as unknown as { plus?: { os?: { name?: string } } }
    ).plus?.os?.name?.toLowerCase()
    if (!n) return false
    if (n.includes('android')) return true
    if (n === 'ios' || n.includes('iphone')) return true
    return false
  }
  if (raw.startsWith('mp-')) {
    try {
      const p = (
        globalThis as unknown as {
          uni?: { getSystemInfoSync?: () => { platform?: string } }
        }
      ).uni
        ?.getSystemInfoSync?.()
        ?.platform?.toLowerCase()
      return p === 'android' || p === 'ios'
    } catch {
      return false
    }
  }
  return false
}

/**
 * 在 Android/iOS 上将「对象类」参数转为可打印字符串；其余类型原样返回。
 */
function stringifyObjectArgForNative(value: unknown): unknown {
  if (value === null || value === undefined) return value
  if (typeof value !== 'object') return value
  if (value instanceof Error) return `${value.name}: ${value.message}`
  return safeStringify(value)
}

/**
 * 将单段日志参数格式化为可拼进一行文本的片段（Android/iOS 单参输出用）。
 */
function formatLogArgForNativeConsole(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (typeof value === 'bigint') return String(value)
  if (typeof value === 'symbol') {
    try {
      return value.toString()
    } catch {
      return '?'
    }
  }
  if (typeof value === 'function') {
    const fn = value as (...args: unknown[]) => unknown
    return `[Function ${fn.name || 'anonymous'}]`
  }
  if (typeof value === 'object') {
    if (value instanceof Error) return `${value.name}: ${value.message}`
    return safeStringify(value)
  }
  return String(value)
}

/**
 * 输出到 console：非 Android/iOS 保持多参；Android/iOS 对象转字符串并 **整行单参** 输出。
 */
function emitConsole(
  method: 'log' | 'info' | 'warn' | 'error',
  args: unknown[]
): void {
  const fn = console[method]
  if (!isAndroidOrIosRuntime()) {
    fn.call(console, TAG, ...args)
    return
  }
  const mapped = args.map(stringifyObjectArgForNative)
  if (mapped.length === 0) {
    fn.call(console, TAG)
    return
  }
  const body = mapped.map(formatLogArgForNativeConsole).join(' ')
  fn.call(console, `${TAG} ${body}`)
}

/**
 * 当前是否启用 debug 输出。优先级：
 *   1. `setDebug(value)` 显式设置过 → 直接返回。
 *   2. `process.env.UNI_STAT_DEBUG === 'true'` 或被构建期替换为布尔字面量 `true`
 *      （历史插件兼容路径）。
 */
function isDebug(): boolean {
  if (runtimeDebug !== undefined) return runtimeDebug
  const v = process.env.UNI_STAT_DEBUG as unknown
  return v === 'true' || v === true
}

/**
 * 运行时切换 debug 开关；传 `undefined` 恢复为「按 process.env 判断」。
 */
function setDebug(value: boolean | undefined): void {
  runtimeDebug = value
}

export const logger = {
  debug(...args: unknown[]): void {
    if (!isDebug()) return
    // eslint-disable-next-line no-console
    emitConsole('log', args)
  },
  info(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    emitConsole('info', args)
  },
  warn(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    emitConsole('warn', args)
  },
  error(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    emitConsole('error', args)
  },
  setDebug,
  isDebug,
}
