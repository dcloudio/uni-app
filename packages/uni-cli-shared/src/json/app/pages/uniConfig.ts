import { normalizeNetworkTimeout } from '../../manifest'
import {
  getNVueCompiler,
  getNVueFlexDirection,
  getNVueStyleCompiler,
} from '../manifest'
import { getLocales } from './locale'

interface AppUniConfig {
  pages: string[]
  globalStyle: UniApp.PagesJsonPageStyle
  nvue: {
    compiler: 'uni-app' | 'weex' | 'vue'
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
}

export function normalizeAppUniConfig(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
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
      alwaysShowBeforeRender: process.env
        .UNI_SPLASHSCREEN_ALWAYSSHOWBEFORERENDER
        ? true
        : false,
      autoclose: process.env.UNI_SPLASHSCREEN_AUTOCLOSE ? true : false,
    },
    compilerVersion: process.env.UNI_COMPILER_VERSION,
    entryPagePath: pagesJson.pages[0].path,
    networkTimeout: normalizeNetworkTimeout(manifestJson.networkTimeout),
    tabBar: pagesJson.tabBar,
    locales: getLocales(process.env.UNI_INPUT_DIR),
  }
  // TODO 待支持分包
  return JSON.stringify(config)
}
