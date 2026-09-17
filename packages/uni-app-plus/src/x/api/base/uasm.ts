import { getNativeApp } from '../../framework/app/app'

interface UasmNativeApp {
  loadUASM(module: string): unknown
}

export function loadUASM<T>(module: string): Promise<T> {
  return new Promise<T>((resolve) => {
    const app = getNativeApp() as unknown as UasmNativeApp
    resolve(app.loadUASM(module) as T)
  })
}
