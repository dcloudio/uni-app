import { onActivated, watchEffect } from 'vue'

export function updateBackgroundColorContent(backgroundColorContent: string) {
  if (__NODE_JS__) {
    return
  }
  if (backgroundColorContent) {
    document.body.style.setProperty(
      '--background-color-content',
      backgroundColorContent
    )
  } else {
    document.body.style.removeProperty('--background-color-content')
  }
}

export function useBackgroundColorContent(pageMeta: UniApp.PageRouteMeta) {
  function update() {
    updateBackgroundColorContent(pageMeta.backgroundColorContent || '')
  }
  watchEffect(update)
  onActivated(update)
}
