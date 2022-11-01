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

export function normalizeAppManifestJson(
  userManifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  const manifestJson = initRecursiveMerge(
    initDefaultManifestJson(),
    userManifestJson
  )
  pagesJson = initTheme(manifestJson, pagesJson)
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
