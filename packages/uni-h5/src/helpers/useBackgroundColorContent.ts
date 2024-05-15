import { onActivated, watchEffect } from 'vue'
import { onThemeChange, parseTheme } from './theme'

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
    if (pageMeta.backgroundColorContent) {
      updateBackgroundColorContent(
        parseTheme({ backgroundColorContent: pageMeta.backgroundColorContent })
          .backgroundColorContent
      )
    }
  }

  onThemeChange(update)
  watchEffect(update)
  onActivated(update)
}
