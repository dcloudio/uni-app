import { type Ref, onActivated, watchEffect } from 'vue'
import { onThemeChange, parseTheme } from './theme'

export function updateBackgroundColorContent(
  backgroundColorContent: string,
  element?: HTMLElement
) {
  if (__NODE_JS__) {
    return
  }
  element = element || document.body
  if (backgroundColorContent) {
    element.style.setProperty(
      '--background-color-content',
      backgroundColorContent
    )
  } else {
    element.style.removeProperty('--background-color-content')
  }
}

export function useBackgroundColorContent(
  pageMeta: UniApp.PageRouteMeta,
  pageBody?: Ref<HTMLElement | null>
) {
  function update() {
    if (__NODE_JS__ || (pageBody && !pageBody.value)) {
      return
    }
    const element = pageBody ? pageBody.value! : document.body
    if (pageMeta.backgroundColorContent) {
      updateBackgroundColorContent(
        parseTheme({ backgroundColorContent: pageMeta.backgroundColorContent })
          .backgroundColorContent,
        element
      )
    } else {
      updateBackgroundColorContent('transparent', element)
    }
  }

  onThemeChange(update)
  watchEffect(update)
  onActivated(update)
}
