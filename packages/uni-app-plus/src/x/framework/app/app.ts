let nativeApp: IApp | undefined

export function getNativeApp() {
  return nativeApp!
}

export function setNativeApp(app: IApp | undefined) {
  nativeApp = app
}

export function getPageManager() {
  return nativeApp!.pageManager
}
