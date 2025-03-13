import path from 'path'
import { initLocales } from '../../../i18n'
import {
  getPlatformManifestJsonOnce,
  normalizeNetworkTimeout,
} from '../../manifest'
import {
  getNVueCompiler,
  getNVueFlexDirection,
  getNVueStyleCompiler,
} from '../manifest'
import { parseArguments } from '../manifest/arguments'
import { getSplashscreen } from '../manifest/splashscreen'
import { normalizeThemeConfigOnce } from '../../theme'

interface AppUniConfig {
  pages: string[]
  globalStyle: UniApp.PagesJsonPageStyle
  nvue: {
    compiler: 'uni-app' | 'weex' | 'vue' | 'vite'
    styleCompiler: 'weex' | 'uni-app'
    'flex-direction': 'row' | 'row-reverse' | 'column' | 'column-reverse'
  }
  renderer: 'auto' | 'native'
  splashscreen: {
    alwaysShowBeforeRender: boolean
    autoclose: boolean
  }
  appname: string
  compilerVersion: string
  entryPagePath: string
  entryPageQuery: string
  realEntryPagePath: string
  networkTimeout: {
    request: number
    connectSocket: number
    uploadFile: number
    downloadFile: number
  }
  tabBar?: UniApp.UniConfig['tabBar']
  locale?: string
  fallbackLocale?: string
  locales?: Record<string, Record<string, string>>
  darkmode: boolean
  themeConfig: UniApp.ThemeJson
}

export function normalizeAppUniConfig(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
  const { autoclose, alwaysShowBeforeRender } = getSplashscreen(manifestJson)
  const platformConfig = getPlatformManifestJsonOnce()

  const config: AppUniConfig = {
    pages: [],
    globalStyle: pagesJson.globalStyle,
    nvue: {
      compiler: getNVueCompiler(manifestJson),
      styleCompiler: getNVueStyleCompiler(manifestJson),
      'flex-direction': getNVueFlexDirection(manifestJson),
    },
    renderer:
      manifestJson['app-plus']?.renderer === 'native' ? 'native' : 'auto',
    appname: manifestJson.name || '',
    splashscreen: {
      alwaysShowBeforeRender,
      autoclose,
    },
    compilerVersion: process.env.UNI_COMPILER_VERSION,
    ...parseEntryPagePath(pagesJson),
    networkTimeout: normalizeNetworkTimeout(manifestJson.networkTimeout),
    tabBar: pagesJson.tabBar,
    fallbackLocale: manifestJson.fallbackLocale,
    locales: initLocales(path.join(process.env.UNI_INPUT_DIR, 'locale')),
    darkmode: platformConfig.darkmode || false,
    themeConfig: normalizeThemeConfigOnce(platformConfig),
    // @ts-expect-error
    qqMapKey: platformConfig?.distribute?.sdkConfigs?.maps?.tencent?.key,
  }
  // TODO 待支持分包
  return JSON.stringify(config)
}

export function parseEntryPagePath(pagesJson: UniApp.PagesJson) {
  const res = {
    entryPagePath: '',
    entryPageQuery: '',
    realEntryPagePath: '',
  }
  if (!pagesJson.pages.length) {
    return res
  }
  res.entryPagePath = pagesJson.pages[0].path
  const argsJsonStr = parseArguments(pagesJson)
  if (argsJsonStr) {
    try {
      const args = JSON.parse(argsJsonStr)
      const entryPagePath = args.path || args.pathName
      const realEntryPagePath = res.entryPagePath
      if (entryPagePath && realEntryPagePath !== entryPagePath) {
        res.entryPagePath = entryPagePath
        res.entryPageQuery = args.query ? '?' + args.query : ''
        // non tabBar page
        if (
          !(pagesJson.tabBar?.list || []).find(
            (page) => page.pagePath === entryPagePath
          )
        ) {
          res.realEntryPagePath = realEntryPagePath
        }
      }
    } catch (e) {}
  }
  return res
}
