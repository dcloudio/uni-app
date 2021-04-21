interface PageCssVars {
  '--window-top'?: string
  '--window-bottom'?: string
  '--window-left'?: string
  '--window-right'?: string
  '--window-margin'?: string
  '--top-window-height'?: string
}
const style = document.documentElement.style

function updateCssVar(cssVars: Record<string, any>) {
  Object.keys(cssVars).forEach((name) => {
    style.setProperty(name, cssVars[name])
  })
}

export function updatePageCssVar(cssVars: PageCssVars) {
  return updateCssVar(cssVars)
}

interface AppCssVar {
  '--status-bar-height'?: string
  '--tab-bar-height'?: string
}

export function updateAppCssVar(cssVars: AppCssVar) {
  return updateCssVar(cssVars)
}
