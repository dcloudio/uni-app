import {
  TITLEBAR_HEIGHT
} from '../../../constants'

import {
  backbuttonListener
} from '../../backbutton'

import {
  isTabBarPage
} from '../../../bridge'

import {
  getStatusbarHeight
} from '../../../api/util'

import tabBar from '../../tab-bar'

function initPopupSubNVue (subNVueWebview, style, maskWebview) {
  if (!maskWebview.popupSubNVueWebviews) {
    maskWebview.popupSubNVueWebviews = {}
  }

  maskWebview.popupSubNVueWebviews[subNVueWebview.id] = subNVueWebview

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `UNIAPP[webview][${maskWebview.id}]:add.popupSubNVueWebview[${subNVueWebview.id}]`
    )
  }

  const hideSubNVue = function () {
    maskWebview.setStyle({
      mask: 'none'
    })
    subNVueWebview.hide('auto')
  }
  maskWebview.addEventListener('maskClick', hideSubNVue)
  let isRemoved = false // 增加个 remove 标记，防止出错
  subNVueWebview.addEventListener('show', () => {
    if (!isRemoved) {
      plus.key.removeEventListener('backbutton', backbuttonListener)
      plus.key.addEventListener('backbutton', hideSubNVue)
      isRemoved = true
    }
  })
  subNVueWebview.addEventListener('hide', () => {
    if (isRemoved) {
      plus.key.removeEventListener('backbutton', hideSubNVue)
      plus.key.addEventListener('backbutton', backbuttonListener)
      isRemoved = false
    }
  })
  subNVueWebview.addEventListener('close', () => {
    delete maskWebview.popupSubNVueWebviews[subNVueWebview.id]
    if (isRemoved) {
      plus.key.removeEventListener('backbutton', hideSubNVue)
      plus.key.addEventListener('backbutton', backbuttonListener)
      isRemoved = false
    }
  })
}

function initNormalSubNVue (subNVueWebview, style, webview) {
  webview.append(subNVueWebview)
}

function initSubNVue (subNVue, routeOptions, webview) {
  if (!subNVue.path) {
    return
  }
  const style = subNVue.style || {}
  const isNavigationBar = subNVue.type === 'navigationBar'
  const isPopup = subNVue.type === 'popup'

  delete style.type

  if (isPopup && !subNVue.id) {
    console.warn('subNVue[' + subNVue.path + '] 尚未配置 id')
  }
  // TODO lazyload

  style.uniNView = {
    path: subNVue.path.replace('.nvue', '.js'),
    defaultFontSize: __uniConfig.defaultFontSize,
    viewport: __uniConfig.viewport
  }

  const extras = {
    __uniapp_host: routeOptions.path,
    __uniapp_origin: style.uniNView.path.split('?')[0].replace('.js', ''),
    __uniapp_origin_id: webview.id,
    __uniapp_origin_type: webview.__uniapp_type
  }

  let maskWebview

  if (isNavigationBar) {
    style.position = 'dock'
    style.dock = 'top'
    style.top = 0
    style.width = '100%'
    style.height = TITLEBAR_HEIGHT + getStatusbarHeight()
    delete style.left
    delete style.right
    delete style.bottom
    delete style.margin
  } else if (isPopup) {
    style.position = 'absolute'
    if (isTabBarPage(routeOptions.path)) {
      maskWebview = tabBar
    } else {
      maskWebview = webview
    }
    extras.__uniapp_mask = style.mask || 'rgba(0,0,0,0.5)'
    extras.__uniapp_mask_id = maskWebview.id
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `UNIAPP[webview][${webview.id}]:create[${subNVue.id}]:${JSON.stringify(style)}`
    )
  }
  delete style.mask
  const subNVueWebview = plus.webview.create('', subNVue.id, style, extras)

  if (isPopup) {
    initPopupSubNVue(subNVueWebview, style, maskWebview)
  } else {
    initNormalSubNVue(subNVueWebview, style, webview)
  }
}

export function initSubNVues (routeOptions, webview) {
  const subNVues = routeOptions.window.subNVues
  if (!subNVues || !subNVues.length) {
    return
  }
  subNVues.forEach(subNVue => {
    initSubNVue(subNVue, routeOptions, webview)
  })
}
