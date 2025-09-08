import { invokeHook } from '@dcloudio/uni-core'
import { injectAppHooks } from '@dcloudio/uni-api'
import { ON_LAUNCH, ON_SHOW } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { initLaunchOptions } from '../../../service/framework/app/utils'
import { loadFontFaceByStyles } from '../utils'
import { useTheme } from '../theme'
import { setLaunchOptionsSync } from '../../api/base/getLaunchOptionsSync'
import { extend } from '@vue/shared'
import { getNativeApp } from './app'
import { setEnterOptionsSync } from '../../api/base/getEnterOptionsSync'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  injectAppHooks(appVm.$)
  const { entryPagePath, entryPageQuery, referrerInfo } = __uniConfig

  const args = initLaunchOptions({
    path: entryPagePath,
    query: entryPageQuery,
    referrerInfo: referrerInfo,
  })

  const app = getNativeApp()
  const schemaLink = app.getLaunchOptionsSync() ?? {
    appScheme: '',
    appLink: '',
  }
  const appScheme =
    schemaLink.appScheme?.length === 0 ? null : schemaLink.appScheme
  const appLink = schemaLink.appLink?.length === 0 ? null : schemaLink.appLink

  const launchOption = extend({}, args, { appScheme, appLink })

  // onLaunchOption
  setLaunchOptionsSync(launchOption)

  invokeHook(appVm, ON_LAUNCH, launchOption)

  // onShowOption
  const showOption = extend({}, launchOption)
  setEnterOptionsSync(showOption)
  invokeHook(appVm, ON_SHOW, showOption)

  // 加载全局字体
  const appStyle = appVm.$options.styles
  if (appStyle) {
    loadFontFaceByStyles(appStyle, true)
  }

  // darkmode
  useTheme()

  // TODO uni-app x
  // // https://tower.im/teams/226535/todos/16905/
  // const getAppState = weex.requireModule('plus').getAppState
  // const appState = getAppState && Number(getAppState())
  // if (appState === 2) {
  //   invokeHook(appVm, ON_HIDE, args)
  // }
}
