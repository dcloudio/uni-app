import type { ComponentPublicInstance } from 'vue'
import {
  API_HIDE_NAVIGATION_BAR_LOADING,
  API_SET_NAVIGATION_BAR_COLOR,
  API_SET_NAVIGATION_BAR_TITLE,
  API_SHOW_NAVIGATION_BAR_LOADING,
  type API_TYPE_HIDE_NAVIGATION_BAR_LOADING,
  type API_TYPE_SET_NAVIGATION_BAR_COLOR,
  type API_TYPE_SET_NAVIGATION_BAR_TITLE,
  type API_TYPE_SHOW_NAVIGATION_BAR_LOADING,
  SetNavigationBarColorOptions,
  SetNavigationBarColorProtocol,
  SetNavigationBarTitleProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getWebview } from '@dcloudio/uni-app-plus/src/service/utils'
import type { StatusBarStyle } from '../../../helpers/statusBar'

interface SetNavigationBarTitleOptions
  extends UniApp.SetNavigationBarTitleOptions {
  __page__?: ComponentPublicInstance
}

export const setNavigationBarTitle =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_TITLE>(
    API_SET_NAVIGATION_BAR_TITLE,
    (
      { __page__, title }: SetNavigationBarTitleOptions,
      { resolve, reject }
    ) => {
      const webview = getWebview(__page__)
      if (webview) {
        const style = webview.getStyle()
        if (style && style.titleNView) {
          webview.setStyle({
            titleNView: {
              titleText: title,
            },
          })
        }
        resolve()
      } else {
        reject()
      }
    },
    SetNavigationBarTitleProtocol
  )

export const showNavigationBarLoading =
  defineAsyncApi<API_TYPE_SHOW_NAVIGATION_BAR_LOADING>(
    API_SHOW_NAVIGATION_BAR_LOADING,
    (_, { resolve }) => {
      plus.nativeUI.showWaiting('', {
        modal: false,
      })
      resolve()
    }
  )

export const hideNavigationBarLoading =
  defineAsyncApi<API_TYPE_HIDE_NAVIGATION_BAR_LOADING>(
    API_HIDE_NAVIGATION_BAR_LOADING,
    (_, { resolve }) => {
      plus.nativeUI.closeWaiting()
      resolve()
    }
  )

function setPageStatusBarStyle(statusBarStyle: StatusBarStyle) {
  const pages = getCurrentPages()
  if (!pages.length) {
    return
  }
  // 框架内部页面跳转会从这里获取style配置
  pages[pages.length - 1].$page.statusBarStyle = statusBarStyle
}

interface SetNavigationbarColorOptions
  extends UniApp.SetNavigationbarColorOptions {
  __page__?: ComponentPublicInstance
}

export const setNavigationBarColor =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_COLOR>(
    API_SET_NAVIGATION_BAR_COLOR,
    (
      { __page__, frontColor, backgroundColor }: SetNavigationbarColorOptions,
      { resolve, reject }
    ) => {
      const webview = getWebview(__page__)
      if (webview) {
        const styles: PlusWebviewWebviewTitleNViewStyles = {}
        if (frontColor) {
          styles.titleColor = frontColor
        }
        if (backgroundColor) {
          styles.backgroundColor = backgroundColor
        }
        const statusBarStyle = frontColor === '#000000' ? 'dark' : 'light'
        plus.navigator.setStatusBarStyle(statusBarStyle)

        // 用户调用api时同时改变当前页配置，这样在系统调用设置时，可以避免覆盖用户设置
        setPageStatusBarStyle(statusBarStyle)

        const style = webview.getStyle()
        if (style && style.titleNView) {
          if (style.titleNView.autoBackButton) {
            styles.backButton = styles.backButton || {}
            styles.backButton.color = frontColor
          }
          webview.setStyle({
            titleNView: styles,
          })
        }
        resolve()
      } else {
        reject()
      }
    },
    SetNavigationBarColorProtocol,
    SetNavigationBarColorOptions
  )
