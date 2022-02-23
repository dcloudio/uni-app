import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { getStatusbarHeight } from '../../../../helpers/statusBar'
import { isTabBarPage } from '../../../../helpers/plus'
import tabBar from '../../app/tabBar'
import { backbuttonListener } from '../../app/utils'
import { normalizeSubNVueStyle } from '@dcloudio/uni-core'

interface Extras {
  __uniapp_host: string
  __uniapp_origin: string
  __uniapp_origin_id: string
  __uniapp_origin_type: string
  __uniapp_mask?: string
  __uniapp_mask_id?: string
}

export interface PlusWebviewWebviewObjectWithExtras
  extends PlusWebviewWebviewObject,
    Extras {}

export function initSubNVues(
  webview: PlusWebviewWebviewObject,
  path: string,
  routeMeta: UniApp.PageRouteMeta
) {
  const subNVues = routeMeta.subNVues || []
  subNVues.forEach((subNVue) => {
    if (!subNVue.path) {
      return
    }
    interface StyleExt extends PlusWebviewWebviewStyles {
      uniNView?: {
        path: string
        defaultFontSize?: number
        viewport?: number
      }
    }
    const style: StyleExt = normalizeSubNVueStyle(
      (subNVue.style || {}) as Record<string, unknown>
    )
    const isNavigationBar = subNVue.type === 'navigationBar'
    const isPopup = subNVue.type === 'popup'

    style.uniNView = {
      path: subNVue.path.replace('.nvue', '.js'),
      defaultFontSize: (__uniConfig as any).defaultFontSize,
      viewport: (__uniConfig as any).viewport,
    }

    const extras: Extras = {
      __uniapp_host: path,
      __uniapp_origin: style.uniNView.path.split('?')[0].replace('.js', ''),
      __uniapp_origin_id: webview.id,
      __uniapp_origin_type: (webview as any).__uniapp_type,
    }

    interface MaskWebview extends PlusWebviewWebviewObject {
      popupSubNVueWebviews: Record<string, PlusWebviewWebviewObject>
    }
    let maskWebview: MaskWebview

    if (isNavigationBar) {
      style.position = 'dock'
      style.dock = 'top'
      style.top = '0'
      style.width = '100%'
      style.height = String(NAVBAR_HEIGHT + getStatusbarHeight())
      delete style.left
      delete style.right
      delete style.bottom
      delete style.margin
    } else if (isPopup) {
      style.position = 'absolute'
      if (isTabBarPage(path)) {
        maskWebview = tabBar as any
      } else {
        maskWebview = webview as MaskWebview
      }
      extras.__uniapp_mask = style.mask || 'rgba(0,0,0,0.5)'
      extras.__uniapp_mask_id = maskWebview.id
    }

    delete style.mask
    const subNVueWebview = plus.webview.create('', subNVue.id, style, extras)

    if (isPopup) {
      if (!maskWebview!.popupSubNVueWebviews) {
        maskWebview!.popupSubNVueWebviews = {}
      }
      maskWebview!.popupSubNVueWebviews[subNVueWebview.id] = subNVueWebview
      const hideSubNVue = function () {
        maskWebview.setStyle({
          mask: 'none',
        })
        subNVueWebview.hide('auto')
      }
      maskWebview!.addEventListener('maskClick', hideSubNVue)
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
    } else {
      webview.append(subNVueWebview)
    }
  })
}
