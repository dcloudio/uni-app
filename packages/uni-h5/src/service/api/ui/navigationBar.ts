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
import { getCurrentPageMeta } from '@dcloudio/uni-core'
import { updateDocumentTitle } from '../../../helpers/useDocumentTitle'

function setNavigationBar(
  pageMeta: UniApp.PageRouteMeta | undefined,
  type: string,
  args: Record<string, any>,
  resolve: () => void,
  reject: (err: string) => void
) {
  if (!pageMeta) {
    return reject('page not found')
  }
  const { navigationBar } = pageMeta

  switch (type) {
    case API_SET_NAVIGATION_BAR_COLOR:
      const { frontColor, backgroundColor, animation } = args
      const { duration, timingFunc } = animation
      if (frontColor) {
        navigationBar.titleColor =
          frontColor === '#000000' ? '#000000' : '#ffffff'
      }
      if (backgroundColor) {
        navigationBar.backgroundColor = backgroundColor
      }
      navigationBar.duration = duration + 'ms'
      navigationBar.timingFunc = timingFunc
      // TODO
      // UniServiceJSBridge.emit('onNavigationBarChange', {
      //   textColor: frontColor === '#000000' ? '#000' : '#fff',
      //   backgroundColor: navigationBar.backgroundColor,
      // })
      break
    case API_SHOW_NAVIGATION_BAR_LOADING:
      navigationBar.loading = true
      break
    case API_HIDE_NAVIGATION_BAR_LOADING:
      navigationBar.loading = false
      break
    case API_SET_NAVIGATION_BAR_TITLE:
      const { title } = args
      navigationBar.titleText = title
      if (__NODE_JS__) {
        // watch 无效，主动更新 title
        updateDocumentTitle(args.title)
      }
      // TODO isCurrentPage逻辑主要是navigationBar组件使用
      // if (isCurrentPage(page)) {
      //   // 仅当前页面
      //   document.title = title
      // }
      // TODO
      // UniServiceJSBridge.emit('onNavigationBarChange', {
      //   titleText: title,
      // })

      break
  }
  resolve()
}

export const setNavigationBarColor =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_COLOR>(
    API_SET_NAVIGATION_BAR_COLOR,
    (args, { resolve, reject }) => {
      setNavigationBar(
        getCurrentPageMeta(),
        API_SET_NAVIGATION_BAR_COLOR,
        args,
        resolve,
        reject
      )
    },
    SetNavigationBarColorProtocol,
    SetNavigationBarColorOptions
  )

export const showNavigationBarLoading =
  defineAsyncApi<API_TYPE_SHOW_NAVIGATION_BAR_LOADING>(
    API_SHOW_NAVIGATION_BAR_LOADING,
    (args, { resolve, reject }) => {
      setNavigationBar(
        getCurrentPageMeta(),
        API_SHOW_NAVIGATION_BAR_LOADING,
        args || {},
        resolve,
        reject
      )
    }
  )

export const hideNavigationBarLoading =
  defineAsyncApi<API_TYPE_HIDE_NAVIGATION_BAR_LOADING>(
    API_HIDE_NAVIGATION_BAR_LOADING,
    (args, { resolve, reject }) => {
      setNavigationBar(
        getCurrentPageMeta(),
        API_HIDE_NAVIGATION_BAR_LOADING,
        args || {},
        resolve,
        reject
      )
    }
  )

export const setNavigationBarTitle =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_TITLE>(
    API_SET_NAVIGATION_BAR_TITLE,
    (args, { resolve, reject }) => {
      setNavigationBar(
        getCurrentPageMeta(),
        API_SET_NAVIGATION_BAR_TITLE,
        args,
        resolve,
        reject
      )
    },
    SetNavigationBarTitleProtocol
  )
