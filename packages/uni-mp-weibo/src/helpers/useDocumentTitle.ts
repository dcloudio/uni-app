import { watchEffect, onActivated, ssrContextKey } from 'vue'
import { UNI_SSR_TITLE, ON_NAVIGATION_BAR_CHANGE } from '@dcloudio/uni-shared'
import { getApp } from '../framework/setup/app'

export function updateDocumentTitle(title: string) {
  if (__NODE_JS__) {
    // setNavigationBarTitle 可能是异步调用，此时使用 useSSRContext 获取，可能没有 instance
    const ssrContext = getApp().$.appContext.provides[ssrContextKey]
    if (ssrContext) {
      ssrContext[UNI_SSR_TITLE] = title
    }
  } else {
    document.title = title
  }
  UniServiceJSBridge.emit(ON_NAVIGATION_BAR_CHANGE, { titleText: title })
}

export function useDocumentTitle(pageMeta: UniApp.PageRouteMeta) {
  function update() {
    updateDocumentTitle(pageMeta.navigationBar.titleText!)
  }
  watchEffect(update)
  onActivated(update)
}
