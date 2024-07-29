import { NavigateToOptions, defineSyncApi } from '@dcloudio/uni-api'

import {
  DialogPage,
  type UniDialogPage,
  homeDialogPages,
} from '../../../framework/setup/page'
import { EventChannel } from '@dcloudio/uni-shared'
import { getPageInstanceByVm } from '../../../framework/setup/utils'
import type { ComponentPublicInstance } from 'vue'

/**
 *
 * 文档: []()
 */

interface OpenDialogPageSuccess {
  /**
   * 回调信息
   */
  errMsg: string
  /**
   * 和被打开页面进行通信
   */
  eventChannel: EventChannel
}

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
   * - pop-in: 从右侧平移入栈动画效果
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
    | 'pop-in'
  /**
   * 页面间通信接口，用于监听被打开页面发送到当前页面的数据
   */
  events?: any

  parentPage?: Page.PageInstance
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: OpenDialogPageSuccess) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: any) => void
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: any) => void
}

type OpenDialogPage = (options: OpenDialogPageOptions) => UniDialogPage | null

export const openDialogPage = defineSyncApi<OpenDialogPage>(
  'openDialogPage',
  (options: OpenDialogPageOptions): UniDialogPage | null => {
    const targetRoute = __uniRoutes.find((route) => {
      return options.url.indexOf(route.meta.route) !== -1
    })
    const dialogPage = new DialogPage(options.url, targetRoute!.component)

    const currentPages = getCurrentPages()
    const currentPage = currentPages[currentPages.length - 1]
    if (!currentPage) {
      homeDialogPages.push(dialogPage)
    } else {
      dialogPage.$parentPage = currentPage
      getPageInstanceByVm(
        currentPage as ComponentPublicInstance
      )!.$dialogPages.value.push(dialogPage)
    }

    const successOptions = {
      errMsg: 'openDialogPage: ok',
      eventChannel: new EventChannel(0, options.events),
    }
    options.success?.(successOptions)
    options.complete?.(successOptions)

    return dialogPage
  },
  {
    url: {
      type: String,
      required: true,
    },
  },
  // @ts-expect-error
  NavigateToOptions
)
