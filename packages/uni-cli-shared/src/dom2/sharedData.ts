interface SharedDataResult {
  className: string
  elementCode: string
  nativeViewCode: string
}
const sharedDataCache: Map<string, SharedDataResult> = new Map()

export function setSharedDataClassName(key: string, className: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.className = className
  } else {
    sharedDataCache.set(key, { className, elementCode: '', nativeViewCode: '' })
  }
}

export function setSharedDataElementCode(key: string, code: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.elementCode = code
  } else {
    sharedDataCache.set(key, {
      className: '',
      elementCode: code,
      nativeViewCode: '',
    })
  }
}

export function setSharedDataNativeViewCode(key: string, code: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.nativeViewCode = code
  } else {
    sharedDataCache.set(key, {
      className: '',
      elementCode: '',
      nativeViewCode: code,
    })
  }
}

export function getSharedDataResult(key: string) {
  return sharedDataCache.get(key) || { elementCode: '', nativeViewCode: '' }
}
