import { isPlainObject } from 'uni-shared'

import { initNavigationBarI18n } from 'uni-helpers/i18n'

function createButtonOnClick (index) {
  return function onClick (btn) {
    const pages = getCurrentPages()
    if (!pages.length) {
      return
    }
    btn.index = index
    const page = pages[pages.length - 1]
    page.$vm &&
      page.$vm.__call_hook &&
      page.$vm.__call_hook('onNavigationBarButtonTap', btn)
  }
}

function parseTitleNViewButtons (titleNView) {
  const buttons = titleNView.buttons
  if (!Array.isArray(buttons)) {
    return titleNView
  }
  buttons.forEach((btn, index) => {
    btn.onclick = createButtonOnClick(index)
  })
  return titleNView
}

export function parseTitleNView (id, routeOptions) {
  const windowOptions = routeOptions.window
  const titleNView = windowOptions.titleNView
  routeOptions.meta.statusBarStyle =
    windowOptions.navigationBarTextStyle === 'black' ? 'dark' : 'light'
  if (
    // 无头
    titleNView === false ||
    titleNView === 'false' ||
    (windowOptions.navigationStyle === 'custom' &&
      !isPlainObject(titleNView)) ||
    (windowOptions.transparentTitle === 'always' && !isPlainObject(titleNView))
  ) {
    return false
  }

  const titleImage = windowOptions.titleImage || ''
  const transparentTitle = windowOptions.transparentTitle || 'none'
  const titleNViewTypeList = {
    none: 'default',
    auto: 'transparent',
    always: 'float'
  }

  const navigationBarBackgroundColor =
    windowOptions.navigationBarBackgroundColor
  const ret = {
    autoBackButton: !routeOptions.meta.isQuit,
    titleText:
      titleImage === '' ? windowOptions.navigationBarTitleText || '' : '',
    titleColor:
      windowOptions.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
    type: titleNViewTypeList[transparentTitle],
    backgroundColor:
      /^#[a-z0-9]{6}$/i.test(navigationBarBackgroundColor) ||
      navigationBarBackgroundColor === 'transparent'
        ? navigationBarBackgroundColor
        : '#f7f7f7',
    tags:
      titleImage === ''
        ? []
        : [
          {
            tag: 'img',
            src: titleImage,
            position: {
              left: 'auto',
              top: 'auto',
              width: 'auto',
              height: '26px'
            }
          }
        ]
  }

  if (isPlainObject(titleNView)) {
    return initTitleNViewI18n(
      id,
      Object.assign(ret, parseTitleNViewButtons(titleNView))
    )
  }
  return initTitleNViewI18n(id, ret)
}

function initTitleNViewI18n (id, titleNView) {
  const i18nResult = initNavigationBarI18n(titleNView)
  if (!i18nResult) {
    return titleNView
  }
  const [titleTextI18n, searchInputPlaceholderI18n] = i18nResult
  if (titleTextI18n || searchInputPlaceholderI18n) {
    uni.onLocaleChange(() => {
      const webview = plus.webview.getWebviewById(id + '')
      if (!webview) {
        return
      }
      const newTitleNView = {}
      if (titleTextI18n) {
        newTitleNView.titleText = titleNView.titleText
      }
      if (searchInputPlaceholderI18n) {
        newTitleNView.searchInput = {
          placeholder: titleNView.searchInput.placeholder
        }
      }
      if (process.env.NODE_ENV !== 'production') {
        console.log('[uni-app] updateWebview', webview.id, newTitleNView)
      }
      webview.setStyle({
        titleNView: newTitleNView
      })
    })
  }
  return titleNView
}
