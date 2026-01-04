import { parseEntryPagePath } from '../app/pages/uniConfig'

interface AppXUniConfig {
  pages: unknown[]
  globalStyle: unknown
  appname: string
  compilerVersion: string
  fallbackLocale: unknown
  tabBar: unknown
  entryPagePath: string
  entryPageQuery?: string
  conditionUrl?: string
  realEntryPagePath?: string
  themeConfig?: unknown
}

// app-config.js 内容
export function normalizeAppXUniConfig(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
  const config: AppXUniConfig = {
    pages: [],
    globalStyle: pagesJson.globalStyle,
    appname: manifestJson.name || '',
    compilerVersion: process.env.UNI_COMPILER_VERSION,
    ...parseEntryPagePath(pagesJson),
    tabBar: pagesJson.tabBar,
    fallbackLocale: manifestJson.fallbackLocale,
  }
  if (config.realEntryPagePath) {
    config.conditionUrl = config.entryPagePath
    config.entryPagePath = config.realEntryPagePath
  }
  // darkmode
  if (pagesJson.themeConfig) {
    config.themeConfig = pagesJson.themeConfig
  }
  // TODO 待支持分包
  return config
}

type StyleIsolation = 'app-shared' | 'isolated'

export function normalizeStyleIsolation(pagesJson: UniApp.PagesJson): string {
  let styleIsolation: Record<string, StyleIsolation> = {}
  let globalStyleIsolation: StyleIsolation | null = null
  if (pagesJson.globalStyle?.styleIsolation) {
    globalStyleIsolation = pagesJson.globalStyle
      .styleIsolation as StyleIsolation
  }
  const styleIsolationSupportedValues = ['app-shared', 'isolated']
  if (
    globalStyleIsolation &&
    !styleIsolationSupportedValues.includes(globalStyleIsolation)
  ) {
    globalStyleIsolation = null
  }
  pagesJson.pages.forEach((page) => {
    let pageStyleIsolation: StyleIsolation | null = null
    if (page.style?.styleIsolation) {
      pageStyleIsolation = page.style.styleIsolation as StyleIsolation
    }
    if (
      pageStyleIsolation &&
      !styleIsolationSupportedValues.includes(pageStyleIsolation)
    ) {
      pageStyleIsolation = null
    }
    const finalStyleIsolation: StyleIsolation =
      pageStyleIsolation || globalStyleIsolation || 'app-shared'
    // 仅记录 isolated 页面，因为 app-shared 是默认值
    if (finalStyleIsolation === 'isolated') {
      styleIsolation[page.path + '.uvue'] = finalStyleIsolation
    }
  })

  return JSON.stringify(styleIsolation)
}
