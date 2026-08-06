import { getNativeApp } from '../../framework/app/app'

declare function __uniLoadUASM(module: string): unknown

interface UasmNativeApp {
  convert2AbsFullPath(inputPath: string): string
}

export function loadUASM<T>(module: string): Promise<T> {
  return new Promise<T>((resolve) => {
    const modulePath = module.startsWith('uni_modules/')
      ? (getNativeApp() as unknown as UasmNativeApp).convert2AbsFullPath(module)
      : module
    resolve(__uniLoadUASM(modulePath) as T)
  })
}
