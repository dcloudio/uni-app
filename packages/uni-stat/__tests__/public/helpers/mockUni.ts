/**
 * mockUni —— 把 mockStorage 等替身挂载到 `global.uni`，供 public/ 模块在测试中使用。
 *
 * 仓库根 `scripts/setupJestEnv.ts` 已经预置了 `(global as any).uni = { ... }`，
 * 但没有 storage 系列方法。本工具在测试用例的 `beforeEach` 中调用 `installMockUni()`
 * 注入；`afterEach` 调用 `restoreMockUni()` 回滚到上一次的 uni 镜像，避免用例间污染。
 */

import { type MockStorageController, createMockStorage } from './mockStorage'

interface UniGlobal {
  [key: string]: unknown
}

/** 备份栈：支持嵌套 install/restore。 */
const uniBackupStack: Array<UniGlobal | undefined> = []

export interface MockUniOptions {
  /** 自定义 storage 控制器；不传则自动创建一个新的。 */
  storage?: MockStorageController
  /** 平台标识（adapter/platform 在 Phase 3 才用，这里先透传给 process.env.UNI_PLATFORM）。 */
  platform?: string
  /** 任意要覆盖 / 追加的 uni.* 字段。 */
  patch?: Record<string, unknown>
}

export interface MockUniHandle {
  /** 当前用例使用的 storage 控制器，便于断言 storage 终态。 */
  storage: MockStorageController
  /** 当前 global.uni 的引用。 */
  uni: UniGlobal
}

/**
 * 安装 mock uni。每次调用都会备份当前 `global.uni` 后再覆盖，以便 restore。
 */
export function installMockUni(options: MockUniOptions = {}): MockUniHandle {
  const storage = options.storage ?? createMockStorage()

  // 备份当前 global.uni（可能是 setupJestEnv 已经塞过一份）
  const previous = (globalThis as unknown as { uni?: UniGlobal }).uni
  uniBackupStack.push(previous)

  const uni: UniGlobal = {
    ...(previous ?? {}),
    getStorageSync: storage.getStorageSync,
    setStorageSync: storage.setStorageSync,
    removeStorageSync: storage.removeStorageSync,
    clearStorageSync: storage.clearStorageSync,
    ...options.patch,
  }

  // installPublicStat / bindLifecycle 依赖 onAppShow|onAppHide 判定就绪。
  const lifecycleHooks: Array<(...args: unknown[]) => void> = []
  if (typeof uni.onAppShow !== 'function') {
    uni.onAppShow = (cb: (...args: unknown[]) => void): (() => void) => {
      lifecycleHooks.push(cb)
      return () => {}
    }
  }
  if (typeof uni.onAppHide !== 'function') {
    uni.onAppHide = (cb: () => void): (() => void) => {
      lifecycleHooks.push(cb as (...args: unknown[]) => void)
      return () => {}
    }
  }

  ;(globalThis as unknown as { uni: UniGlobal }).uni = uni

  if (options.platform) {
    // process.env.UNI_PLATFORM 在 @dcloudio/types 中被窄化为枚举字面量类型，
    // 测试场景需要任意字符串注入，这里走 Record 断言绕过。
    ;(process.env as Record<string, string | undefined>).UNI_PLATFORM =
      options.platform
  }

  return { storage, uni }
}

/**
 * 卸载 mock uni，恢复到上一次 install 之前的 global.uni 镜像。
 * 必须在 `afterEach` 中调用，避免用例污染。
 */
export function restoreMockUni(): void {
  const previous = uniBackupStack.pop()
  if (previous === undefined) {
    delete (globalThis as unknown as { uni?: UniGlobal }).uni
  } else {
    ;(globalThis as unknown as { uni: UniGlobal }).uni = previous
  }
  // 同上，走 Record 断言绕开 @dcloudio/types 的窄化。
  delete (process.env as Record<string, string | undefined>).UNI_PLATFORM
}
