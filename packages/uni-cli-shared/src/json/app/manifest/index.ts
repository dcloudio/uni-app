import { extend } from '@vue/shared'
import { initRecursiveMerge } from './merge'
import { initDefaultManifestJson } from './defaultManifestJson'
import { initAppStatusbar } from './statusbar'
import { initPlus } from './plus'
import { initNVue } from './nvue'
import { initArguments } from './arguments'
import { initSafearea } from './safearea'
import { initSplashscreen } from './splashscreen'
import { initConfusion } from './confusion'
import { initUniApp } from './uniApp'
import { initLaunchwebview } from './launchwebview'
import { initCheckSystemWebview } from './checksystemwebview'
import { initTabBar } from './tabBar'
import { initI18n } from './i18n'
import { initTheme } from '../../theme'
import { getPlatformManifestJson } from '../../manifest'

export function normalizeAppManifestJson(
  userManifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  const manifestJson = initRecursiveMerge(
    initDefaultManifestJson(),
    userManifestJson
  )
  const manifestJsonPlatform = getPlatformManifestJson(manifestJson)
  const { pages, globalStyle, tabBar } = initTheme(
    manifestJsonPlatform,
    pagesJson
  )
  extend(pagesJson, JSON.parse(JSON.stringify({ pages, globalStyle, tabBar })))
  initAppStatusbar(manifestJson, pagesJson)
  initArguments(manifestJson, pagesJson)
  initPlus(manifestJson, pagesJson)
  initNVue(manifestJson, pagesJson)
  initSafearea(manifestJson, pagesJson)
  initSplashscreen(manifestJson, userManifestJson)
  initConfusion(manifestJson)
  initUniApp(manifestJson)
  // 依赖 initArguments 先执行
  initTabBar(
    initLaunchwebview(manifestJson, pagesJson),
    manifestJson,
    pagesJson
  )
  // 依赖 initUniApp 先执行
  initCheckSystemWebview(manifestJson)

  return initI18n(manifestJson)
}

export * from './env'
export {
  APP_CONFUSION_FILENAME,
  isConfusionFile,
  hasConfusionFile,
} from './confusion'
export {
  getNVueCompiler,
  getNVueStyleCompiler,
  getNVueFlexDirection,
} from './nvue'
export { parseArguments } from './arguments'
