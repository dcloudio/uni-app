import { EventChannel, ON_HIDE, parseUrl } from '@dcloudio/uni-shared'
import { getCurrentPage, getRouteMeta, invokeHook } from '@dcloudio/uni-core'

import { ANI_DURATION, ANI_SHOW } from '../../../service/constants'
import { showWebview } from './webview'
import type { ComponentPublicInstance } from 'vue'
import { beforeRoute, createNormalizeUrl } from '@dcloudio/uni-api'
import { DialogPage, homeDialogPages } from '../../framework/page/dialogPage'
import { registerDialogPage } from '../../framework/page/register'
import { getWebviewId } from '../../../service/framework/webview/utils'

/**
 *
 * 文档: []()
 */
type OpenDialogPageSuccess = AsyncApiResult
type OpenDialogPageFail = AsyncApiResult
type OpenDialogPageComplete = AsyncApiResult
interface OpenDialogPageOptions {
  /**
   * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
   */
  url: string | string.PageURIString
  /**
   * 窗口显示的动画类型
   * - auto: 自动选择动画效果
   * - none: 无动画效果
   * - slide-in-right: 从右侧横向滑动效果
   * - slide-in-left: 左侧横向滑动效果
   * - slide-in-top: 从上侧竖向滑动效果
   * - slide-in-bottom: 从下侧竖向滑动效果
   * - fade-in: 从透明到不透明逐渐显示效果
   * - zoom-out: 从小到大逐渐放大显示效果
   * - zoom-fade-out: 从小到大逐渐放大并且从透明到不透明逐渐显示效果
   */
  animationType?:
    | 'auto'
    | 'none'
    | 'slide-in-right'
    | 'slide-in-left'
    | 'slide-in-top'
    | 'slide-in-bottom'
    | 'fade-in'
    | 'zoom-out'
    | 'zoom-fade-out'
  /**
   * 页面间通信接口，用于监听被打开页面发送到当前页面的数据
   */
  events?: any
  /**
   * 要绑定的父级页面实例
   */
  parentPage?: ComponentPublicInstance
  /**
   * 是否禁用按键盘 ESC 时关闭
   */
  disableEscBack?: boolean
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: OpenDialogPageSuccess) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: OpenDialogPageFail) => void
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: OpenDialogPageComplete) => void
}

export const openDialogPage = (options: OpenDialogPageOptions) => {
  const { url, events, animationType } = options
  if (!options.url) {
    triggerFailCallback(options, 'url is required')
    return null
  }

  const normalizeUrl = createNormalizeUrl('navigateTo')
  const errMsg = normalizeUrl(options.url, {})
  if (errMsg) {
    triggerFailCallback(options, errMsg)
    return null
  }
  const targetRoute = __uniRoutes.find((route) => {
    return options.url.indexOf(route.meta.route) !== -1
  })
  if (!targetRoute) {
    triggerFailCallback(options, `page '${options.url}' is not found`)
    return null
  }

  let parentPage = options.parentPage || null
  const currentPages = getCurrentPages()
  if (parentPage) {
    if (currentPages.indexOf(parentPage) === -1) {
      triggerFailCallback(options, 'parentPage is not a valid page')
      return null
    }
  }
  if (currentPages.length && !parentPage) {
    parentPage = currentPages[
      currentPages.length - 1
    ] as ComponentPublicInstance
  }
  const dialogPage = new DialogPage({
    route: url,
    $getParentPage: () => parentPage,
    component: null,
  })

  if (!parentPage) {
    homeDialogPages.push(dialogPage)
  } else {
    const dialogPages = parentPage.$getDialogPages()
    if (dialogPages.length) {
      invokeHook(dialogPages[dialogPages.length - 1].$vm!, ON_HIDE)
    }
    dialogPages.push(dialogPage)
  }

  const { path, query } = parseUrl(url)
  const [aniType, aniDuration] = initAnimation(path, animationType)

  const noAnimation = aniType === 'none' || aniDuration === 0
  function callback(page: IPage) {
    showWebview(page, aniType, aniDuration, () => {
      beforeRoute()
    })
  }
  // 有动画时先执行 show
  const page = registerDialogPage(
    { url, path, query, openType: 'openDialogPage' },
    dialogPage,
    noAnimation ? undefined : callback,
    // 有动画时延迟创建 vm
    noAnimation ? 0 : 1
  )
  if (noAnimation) {
    callback(page)
  }

  const successOptions = {
    errMsg: 'openDialogPage: ok',
    eventChannel: new EventChannel(getWebviewId() + 1, events),
  }
  options.success?.(successOptions)
  options.complete?.(successOptions)

  return dialogPage
}

function triggerFailCallback(options: OpenDialogPageOptions, errMsg: string) {
  const failOptions = new UniError(
    'uni-openDialogPage',
    4,
    `openDialogPage: fail, ${errMsg}`
  )
  options.fail?.(failOptions)
  options.complete?.(failOptions)
}

function initAnimation(path: string, animationType?: string) {
  // 首页去除动画
  if (!getCurrentPage()) {
    return ['none', 0] as const
  }
  const { globalStyle } = __uniConfig
  const meta = getRouteMeta(path)!
  let _animationType =
    animationType || meta.animationType || globalStyle.animationType || ANI_SHOW
  if (_animationType == 'pop-in') {
    _animationType = 'none'
  }
  return [
    _animationType,
    meta.animationDuration || globalStyle.animationDuration || ANI_DURATION,
  ] as const
}
