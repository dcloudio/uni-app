import {
  onAddToFavorites,
  onAppHide,
  onAppShow,
  onBackPress,
  onError,
  onHide,
  onLaunch,
  onLoad,
  onNavigationBarButtonTap,
  onNavigationBarSearchInputChanged,
  onNavigationBarSearchInputConfirmed,
  onNavigationBarSearchInputFocusChanged,
  onPageHide,
  onPageNotFound,
  onPageScroll,
  onPageShow,
  onResize,
  onShareAppMessage,
  onShareTimeline,
  onShow,
  onTabItemTap,
  onThemeChange,
  onUnhandledRejection,
} from '@dcloudio/uni-app'
import { expectType } from './'

describe('apiLifecycle', () => {
  onLaunch((options) => {
    expectType<string>(options!.path)
    expectType<Record<string, string | undefined>>(options!.query)
    expectType<number>(options!.scene)
  })
  onError((err) => {
    expectType<string>(err)
  })
  onThemeChange(({ theme }) => {
    expectType<'dark' | 'light'>(theme)
  })
  onPageNotFound(({ path, query }) => {
    expectType<string>(path)
    expectType<Record<string, string | undefined>>(query)
  })
  onUnhandledRejection(({ promise, reason }) => {
    expectType<Promise<any>>(promise)
    expectType<string>(reason)
  })
  onAppShow((option) => {
    expectType<string>(option!.path)
  })
  onAppHide(() => {})
  onShow(() => {})
  onHide(() => {})
  onPageShow(() => {})
  onPageHide(() => {})
  onLoad((options) => {
    expectType<any>(options!.a)
  })
  onResize((res) => {
    expectType<number>(res.size!.windowHeight)
    expectType<number>(res.size!.windowWidth)
  })
  onBackPress(({ from }) => {
    expectType<'backbutton' | 'navigateBack'>(from)
  })
  onPageScroll(({ scrollTop }) => {
    expectType<number>(scrollTop)
  })
  onTabItemTap(({ index, pagePath, text }) => {
    expectType<number>(index)
    expectType<string>(pagePath)
    expectType<string>(text)
  })
  onShareTimeline(() => {
    return {
      title: '',
      query: '',
      imageUrl: '',
    }
  })
  onAddToFavorites(({ webviewUrl }) => {
    expectType<string | undefined>(webviewUrl)
    return {
      title: '',
      query: '',
      imageUrl: '',
    }
  })
  onShareAppMessage(({ from, target, webViewUrl }) => {
    expectType<string>(from)
    expectType<any>(target)
    expectType<string | undefined>(webViewUrl)
    return {
      title: '',
      path: '',
      imageUrl: '',
    }
  })
  onNavigationBarButtonTap(({ index }) => {
    expectType<number>(index)
  })
  onNavigationBarSearchInputChanged(({ text }) => {
    expectType<string>(text)
  })
  onNavigationBarSearchInputConfirmed(({ text }) => {
    expectType<string>(text)
  })
  onNavigationBarSearchInputFocusChanged(({ focus }) => {
    expectType<boolean>(focus)
  })
})
