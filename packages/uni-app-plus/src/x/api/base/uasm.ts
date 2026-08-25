import { getNativeApp } from '../../framework/app/app'

interface UasmNativeApp {
  loadUasm(module: string): unknown
}

export function loadUasm<T>(module: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const result = loadUasmSync<T>(module)
    if (result == null) {
      reject(new Error(`uni.loadUasm[${module}] 加载失败`))
      return
    }
    resolve(result)
  })
}

export function loadUasmSync<T>(module: string): T | null {
  const app = getNativeApp() as unknown as UasmNativeApp
  return app.loadUasm(module) as T | null
}
