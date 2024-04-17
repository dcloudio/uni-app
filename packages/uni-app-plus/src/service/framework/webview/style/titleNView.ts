import { isArray } from '@vue/shared'
import { ON_NAVIGATION_BAR_BUTTON_TAP, formatLog } from '@dcloudio/uni-shared'
import { initNavigationBarI18n, invokeHook } from '@dcloudio/uni-core'
export function initTitleNView(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const { navigationBar } = routeMeta
  if (navigationBar.style === 'custom') {
    return false
  }
  let autoBackButton = true
  if (routeMeta.isQuit) {
    autoBackButton = false
  }
  const titleNView: PlusWebviewWebviewTitleNViewStyles = {
    autoBackButton,
  }
  Object.keys(navigationBar).forEach((name) => {
    const value = navigationBar[name as keyof UniApp.PageNavigationBar]
    if (name === 'titleImage' && value) {
      titleNView.tags = createTitleImageTags(value as string)
    } else if (name === 'buttons' && isArray(value)) {
      titleNView.buttons = (value as UniApp.PageNavigationBar['buttons'])!.map(
        (button, index) => {
          ;(button as any).onclick = createTitleNViewBtnClick(index)
          return button
        }
      )
    } else {
      titleNView[name as keyof PlusWebviewWebviewTitleNViewStyles] =
        value as any
    }
  })

  webviewStyle.titleNView = initTitleNViewI18n(titleNView, routeMeta)
}

function initTitleNViewI18n(
  titleNView: PlusWebviewWebviewTitleNViewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const i18nResult = initNavigationBarI18n(titleNView)
  if (!i18nResult) {
    return titleNView
  }
  const [titleTextI18n, searchInputPlaceholderI18n] = i18nResult
  if (titleTextI18n || searchInputPlaceholderI18n) {
    uni.onLocaleChange(() => {
      const webview = plus.webview.getWebviewById(routeMeta.id + '')
      if (!webview) {
        return
      }
      const newTitleNView: PlusWebviewWebviewTitleNViewStyles = {}
      if (titleTextI18n) {
        newTitleNView.titleText = titleNView.titleText
      }
      if (searchInputPlaceholderI18n) {
        newTitleNView.searchInput = {
          placeholder: titleNView.searchInput!.placeholder,
        }
      }
      if (__DEV__) {
        console.log(formatLog('updateWebview', webview.id, newTitleNView))
      }
      webview.setStyle({
        titleNView: newTitleNView,
      })
    })
  }
  return titleNView
}

function createTitleImageTags(titleImage: string) {
  return [
    {
      tag: 'img' as 'img',
      src: titleImage,
      position: {
        left: 'auto',
        top: 'auto',
        width: 'auto',
        height: '26px',
      },
    },
  ]
}

function createTitleNViewBtnClick(index: number) {
  return function onClick(btn: UniApp.PageNavigationBarButton) {
    ;(btn as any).index = index
    invokeHook(ON_NAVIGATION_BAR_BUTTON_TAP, btn)
  }
}
