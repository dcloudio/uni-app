/**
 * mockPlus —— App-Plus 端 plus.* API 替身（Phase 3 adapter/system / adapter/package 才用到）。
 *
 * Phase 1 仅提供最小骨架，后续按需扩展 navigator/runtime/networkinfo/push 等命名空间。
 */

interface PlusGlobal {
  [key: string]: unknown
}

const plusBackupStack: Array<PlusGlobal | undefined> = []

export interface MockPlusOptions {
  /** os 信息，对应 plus.os.name / plus.os.version。 */
  os?: { name?: string; version?: string }
  /** runtime 信息，对应 plus.runtime.appid / version / channel。 */
  runtime?: { appid?: string; version?: string; channel?: string }
  /** push 客户端 ID 提供器，对应 plus.push.getClientInfoAsync。 */
  pushClientId?: string
  /** 任意要覆盖 / 追加的 plus.* 字段。 */
  patch?: Record<string, unknown>
}

export function installMockPlus(options: MockPlusOptions = {}): PlusGlobal {
  const previous = (globalThis as unknown as { plus?: PlusGlobal }).plus
  plusBackupStack.push(previous)

  const plus: PlusGlobal = {
    ...(previous ?? {}),
    os: { name: 'Android', version: '14', ...(options.os ?? {}) },
    runtime: {
      appid: '__UNI__TEST',
      version: '0.0.0',
      channel: 'test',
      ...(options.runtime ?? {}),
    },
    push: {
      getClientInfoAsync(cb: (info: { clientid: string }) => void): void {
        cb({ clientid: options.pushClientId ?? '' })
      },
    },
    ...options.patch,
  }

  ;(globalThis as unknown as { plus: PlusGlobal }).plus = plus
  return plus
}

export function restoreMockPlus(): void {
  const previous = plusBackupStack.pop()
  if (previous === undefined) {
    delete (globalThis as unknown as { plus?: PlusGlobal }).plus
  } else {
    ;(globalThis as unknown as { plus: PlusGlobal }).plus = previous
  }
}
