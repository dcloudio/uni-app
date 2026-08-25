import { getNativeApp } from '../../framework/app/app'

interface UasmNativeApp {
  loadUasm(module: string): unknown
}

export function loadUasm<T>(module: string): Promise<T> {
  return new Promise<T>((resolve) => {
    resolve(loadUasmSync<T>(module))
  })
}

export function loadUasmSync<T>(module: string): T {
  const app = getNativeApp() as unknown as UasmNativeApp
  return app.loadUasm(module) as T
}
