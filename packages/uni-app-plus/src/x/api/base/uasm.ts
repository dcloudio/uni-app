import { getNativeApp } from '../../framework/app/app'

interface UasmNativeApp {
  loadUasm(module: string): unknown
}

export function loadUasm<T>(module: string): Promise<T> {
  return new Promise<T>((resolve) => {
    const app = getNativeApp() as unknown as UasmNativeApp
    resolve(app.loadUasm(module) as T)
  })
}
