/// <reference types="@dcloudio/types" />
import { createLifeCycle as createLifeCycleBase, ComponentInternalInstance } from '@vue/composition-api'
import * as app from './app'
import * as mp from './mp'

const lifecycles: string[] = []

const createLifeCycle = <T extends Function>(lifecycle: string) => {
  lifecycles.push(lifecycle)
  const fn = createLifeCycleBase(lifecycle)
  return (callback: T, target?: ComponentInternalInstance | null) => {
    return fn(callback, target)
  }
}
if (typeof plus === 'object') {
  app.init()
} else if (typeof window === 'object' && 'document' in window) {
  // TODO H5
} else {
  mp.init(lifecycles)
}

export const onShow = createLifeCycle<App.AppInstance['onShow'] | Page.PageInstance['onShow']>('onShow')
export const onHide = createLifeCycle<App.AppInstance['onHide'] | Page.PageInstance['onHide']>('onHide')

export const onLaunch = createLifeCycle<App.AppInstance['onLaunch']>('onLaunch')
export const onError = createLifeCycle<App.AppInstance['onError']>('onError')
export const onPageNotFound = createLifeCycle<App.AppInstance['onPageNotFound']>('onPageNotFound')
export const onUnhandledRejection = createLifeCycle<App.AppInstance['onUnhandledRejection']>('onUnhandledRejection')
export const onThemeChange = createLifeCycle<App.AppInstance['onThemeChange']>('onThemeChange')
export const onUniNViewMessage = createLifeCycle<App.AppInstance['onUniNViewMessage']>('onUniNViewMessage')

export const onInit = createLifeCycle<Page.PageInstance['onInit']>('onInit')
export const onLoad = createLifeCycle<Page.PageInstance['onLoad']>('onLoad')
export const onReady = createLifeCycle<Page.PageInstance['onReady']>('onReady')
export const onUnload = createLifeCycle<Page.PageInstance['onUnload']>('onUnload')
export const onPullDownRefresh = createLifeCycle<Page.PageInstance['onPullDownRefresh']>('onPullDownRefresh')
export const onReachBottom = createLifeCycle<Page.PageInstance['onReachBottom']>('onReachBottom')
export const onShareAppMessage = createLifeCycle<Page.PageInstance['onShareAppMessage']>('onShareAppMessage')
export const onShareTimeline = createLifeCycle<Page.PageInstance['onShareTimeline']>('onShareTimeline')
export const onAddToFavorites = createLifeCycle<Page.PageInstance['onAddToFavorites']>('onAddToFavorites')
export const onPageScroll = createLifeCycle<Page.PageInstance['onPageScroll']>('onPageScroll')
export const onResize = createLifeCycle<Page.PageInstance['onResize']>('onResize')
export const onTabItemTap = createLifeCycle<Page.PageInstance['onTabItemTap']>('onTabItemTap')
export const onNavigationBarButtonTap = createLifeCycle<Page.PageInstance['onNavigationBarButtonTap']>('onNavigationBarButtonTap')
export const onBackPress = createLifeCycle<Page.PageInstance['onBackPress']>('onBackPress')
export const onNavigationBarSearchInputChanged = createLifeCycle<Page.PageInstance['onNavigationBarSearchInputChanged']>('onNavigationBarSearchInputChanged')
export const onNavigationBarSearchInputConfirmed = createLifeCycle<Page.PageInstance['onNavigationBarSearchInputConfirmed']>('onNavigationBarSearchInputConfirmed')
export const onNavigationBarSearchInputClicked = createLifeCycle<Page.PageInstance['onNavigationBarSearchInputClicked']>('onNavigationBarSearchInputClicked')
