import { watchEffect, onActivated, useSSRContext } from 'vue'
import { UNI_SSR_TITLE } from '@dcloudio/uni-shared'
export function useDocumentTitle(pageMeta: UniApp.PageRouteMeta) {
  const ctx = (__NODE_JS__ && useSSRContext()) as Record<string, any>
  function update() {
    if (__NODE_JS__) {
      ctx![UNI_SSR_TITLE] = pageMeta.navigationBar.titleText
    } else {
      document.title = pageMeta.navigationBar.titleText!
    }
  }
  watchEffect(update)
  onActivated(update)
}
