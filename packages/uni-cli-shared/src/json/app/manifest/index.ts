import { initRecursiveMerge } from './merge'
import { initDefaultManifestJson } from './defaultManifestJson'
import { initAppStatusbar } from './statusbar'
import { initPlus } from './plus'
import { initNVue } from './nvue'
import { initArguments } from './arguments'
import { initSafearea } from './safearea'
import { initSplashscreen } from './splashscreen'

export function normalizeAppManifestJson(
  userManifestJson: Record<string, any>,
  pagesJson: Record<string, any>
) {
  const manifestJson = initDefaultManifestJson()

  initAppStatusbar(manifestJson, pagesJson)
  initRecursiveMerge(manifestJson, userManifestJson)
  initArguments(manifestJson, pagesJson)
  initPlus(manifestJson, userManifestJson)
  initNVue(manifestJson, pagesJson)
  initSafearea(manifestJson, pagesJson)
  initSplashscreen(manifestJson, userManifestJson)
  return manifestJson
}

export {
  getNVueCompiler,
  getNVueStyleCompiler,
  getNVueFlexDirection,
} from './nvue'
