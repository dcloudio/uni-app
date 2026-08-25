interface WebUasmDescriptor {
  id: string
  loader: () => Promise<{ default: unknown }>
}

const uasmCache = new Map<string, Promise<unknown>>()

export function loadUasm<T>(module: string): Promise<T> {
  const descriptor = module as unknown as WebUasmDescriptor
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
