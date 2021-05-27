import { watchEffect, onActivated, useSSRContext } from 'vue'
import { UNI_SSR_TITLE } from '@dcloudio/uni-shared'

export function updateDocumentTitle(title: string) {
  if (__NODE_JS__) {
    const ctx = useSSRContext()
    ctx![UNI_SSR_TITLE] = title
  } else {
    document.title = title
  }
}

export function useDocumentTitle(pageMeta: UniApp.PageRouteMeta) {
  function update() {
    updateDocumentTitle(pageMeta.navigationBar.titleText!)
  }
  watchEffect(update)
  onActivated(update)
}
