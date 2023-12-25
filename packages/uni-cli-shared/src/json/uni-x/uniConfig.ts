import { parseEntryPagePath } from '../app/pages/uniConfig'

interface AppXUniConfig {
  pages: unknown[]
  globalStyle: unknown
  appname: string
  compilerVersion: string
  fallbackLocale: unknown
  tabBar: unknown
}

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
  // TODO 待支持分包
  return JSON.stringify(config)
}
