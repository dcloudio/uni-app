import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isUniPageFile } from '../json/pages'
import { requireUniHelpers } from '../utils'
interface SharedDataResult {
  className: string
  renderElementCode: string
  renderNativeViewCode: string
}
const sharedDataCache: Map<string, SharedDataResult> = new Map()

export function setSharedDataClassName(key: string, className: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.className = className
  } else {
    sharedDataCache.set(key, {
      className,
      renderElementCode: '',
      renderNativeViewCode: '',
    })
  }
}

export function setSharedDataElementCode(key: string, code: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.renderElementCode = code
  } else {
    sharedDataCache.set(key, {
      className: '',
      renderElementCode: code,
      renderNativeViewCode: '',
    })
  }
}

export function setSharedDataNativeViewCode(key: string, code: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.renderNativeViewCode = code
  } else {
    sharedDataCache.set(key, {
      className: '',
      renderElementCode: '',
      renderNativeViewCode: code,
    })
  }
}

export function getSharedDataResult(key: string) {
  return (
    sharedDataCache.get(key) || {
      className: '',
      renderElementCode: '',
      renderNativeViewCode: '',
    }
  )
}

export function uniSharedDataPlugin(): Plugin {
  const { USDP } = requireUniHelpers()
  return USDP({
    compilerVaporDom2: require('@dcloudio/compiler-vapor-dom2'),
    utsCompiler: resolveUTSCompiler(),
    isUniPageFile,
    getSharedDataResult,
  })
}
