let nativeApp: IApp

export function getNativeApp() {
  return nativeApp
}

export function setNativeApp(app: IApp) {
  nativeApp = app
}

export function getPageManager() {
  return nativeApp.pageManager
}
