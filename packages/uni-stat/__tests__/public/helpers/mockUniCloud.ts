/**
 * mockUniCloud —— Phase 3 上报通道（uniCloud-callFunction / cloud object）测试替身。
 *
 * Phase 1 仅提供占位与最小契约，后续 Phase 8 channel 实现时再补完。
 */

export interface MockUniCloudOptions {
  /** importObject 调用时返回的对象方法表。 */
  cloudObject?: Record<string, (...args: unknown[]) => Promise<unknown>>
  /** init 调用时是否抛错；用于覆盖空间初始化失败路径。 */
  initThrows?: Error
}

export interface MockUniCloudController {
  /** 历史 importObject 调用记录。 */
  readonly imports: string[]
  /** 历史 init 配置记录。 */
  readonly initCalls: unknown[]
  /** 重置内部计数与历史。 */
  __reset(): void
}

export function installMockUniCloud(
  options: MockUniCloudOptions = {}
): MockUniCloudController {
  const imports: string[] = []
  const initCalls: unknown[] = []

  const uniCloud = {
    init(config: unknown): void {
      initCalls.push(config)
      if (options.initThrows) throw options.initThrows
    },
    importObject(name: string): unknown {
      imports.push(name)
      return options.cloudObject ?? {}
    },
  }

  ;(globalThis as unknown as { uniCloud: unknown }).uniCloud = uniCloud

  return {
    imports,
    initCalls,
    __reset(): void {
      imports.length = 0
      initCalls.length = 0
    },
  }
}

export function restoreMockUniCloud(): void {
  delete (globalThis as unknown as { uniCloud?: unknown }).uniCloud
}
