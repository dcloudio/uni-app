import { normalizeNetworkTimeout } from '../../manifest'
import {
  getNVueCompiler,
  getNVueFlexDirection,
  getNVueStyleCompiler,
} from '../manifest'

interface AppUniConfig {
  pages: string[]
  window: UniApp.PagesJsonPageStyle
  nvue: {
    compiler: 'uni-app' | 'weex'
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
}

export function normalizeAppUniConfig(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
  const config: AppUniConfig = {
    pages: [],
    window: pagesJson.globalStyle,
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
    entryPagePath: '', //TODO
    networkTimeout: normalizeNetworkTimeout(manifestJson.networkTimeout),
  }
  return JSON.stringify(config)
}
