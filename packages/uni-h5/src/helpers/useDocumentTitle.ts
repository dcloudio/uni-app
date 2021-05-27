import { watchEffect, onActivated } from 'vue'

export function useDocumentTitle(pageMeta: UniApp.PageRouteMeta) {
  function update() {
    document.title = pageMeta.navigationBar.titleText!
  }
  watchEffect(update)
  onActivated(update)
}
