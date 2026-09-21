interface UasmDescriptor {
  id: string
  loader: () => Promise<{ default: unknown }>
}

const uasmCache = new Map<string, Promise<unknown>>()

/**
 * 加载经过编译器处理的 UASM 模块。
 *
 * module 在运行时是编译器生成的 descriptor，而不是用户直接传入的插件路径。
 */
export function loadUasm<T>(module: string): Promise<T> {
  const descriptor = module as unknown as UasmDescriptor
  if (
    !descriptor ||
    typeof descriptor.id !== 'string' ||
    typeof descriptor.loader !== 'function'
  ) {
    return Promise.reject(new Error('uni.loadUasm 参数未经过编译处理'))
  }

  let promise = uasmCache.get(descriptor.id)
  if (!promise) {
    promise = descriptor.loader().then((loaded) => {
      if (typeof loaded.default !== 'function') {
        throw new Error(`uasm 插件[${descriptor.id}]的默认导出必须是函数`)
      }
      return loaded.default()
    })
    uasmCache.set(descriptor.id, promise)
    promise.catch(() => {
      if (uasmCache.get(descriptor.id) === promise) {
        uasmCache.delete(descriptor.id)
      }
    })
  }
  return promise as Promise<T>
}
