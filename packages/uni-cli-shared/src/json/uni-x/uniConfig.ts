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
  pageSelectorBackgroundColor?: unknown
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
  const pageSelectorBackgroundColor = (pagesJson as any)
    .pageSelectorBackgroundColor
  if (pageSelectorBackgroundColor) {
    config.pageSelectorBackgroundColor = pageSelectorBackgroundColor
  }
  // TODO 待支持分包
  return config
}
