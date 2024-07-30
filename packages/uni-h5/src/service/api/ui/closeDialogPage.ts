import { defineSyncApi } from '@dcloudio/uni-api'
import type { UniDialogPage } from '../../../framework/setup/page'
import { getPageInstanceByVm } from '../../../framework/setup/utils'
import type { ComponentPublicInstance } from 'vue'
import { invokeHook } from '@dcloudio/uni-core'
import { ON_SHOW, ON_UNLOAD } from '@dcloudio/uni-shared'
/**
 *
 * 文档: []()
 */
type CloseDialogPageSuccess = AsyncApiResult
type CloseDialogPageFail = AsyncApiResult
type CloseDialogPageComplete = AsyncApiResult
interface CloseDialogPageOptions {
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
    | 'slide-out-right'
    | 'slide-out-left'
    | 'slide-out-top'
    | 'slide-out-bottom'
    | 'fade-out'
    | 'zoom-in'
    | 'zoom-fade-in'
    | 'pop-out'
  /**
   * 页面间通信接口，用于监听被打开页面发送到当前页面的数据
   */
  events?: any

  dialogPage?: UniDialogPage
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: CloseDialogPageSuccess) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: CloseDialogPageFail) => void
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: CloseDialogPageComplete) => void
}

type CloseDialogPage = (options?: CloseDialogPageOptions) => void

export const closeDialogPage = defineSyncApi<CloseDialogPage>(
  'closeDialogPage',
  (options?: CloseDialogPageOptions) => {
    const currentPages = getCurrentPages()
    const currentPage = currentPages[currentPages.length - 1]
    if (!currentPages) {
      const failOptions = { errMsg: 'currentPage is null' }
      options?.fail?.(failOptions)
      options?.complete?.(failOptions)
      return
    }

    if (options?.dialogPage) {
      const dialogPage = options?.dialogPage!
      const parentPage = dialogPage.$getParentPage?.()
      if (parentPage && currentPages.indexOf(parentPage) !== -1) {
        const parentDialogPages = parentPage.$getDialogPages()
        const index = parentDialogPages.indexOf(dialogPage)
        parentDialogPages.splice(index, 1)
        invokeHook(dialogPage.$vm!, ON_UNLOAD)
        if (index === parentDialogPages.length) {
          invokeHook(
            parentDialogPages[parentDialogPages.length - 1].$vm!,
            ON_SHOW
          )
        }
      } else {
        const failOptions = {
          errMsg: 'closeDialogPage: fail, dialogPage is not a valid page',
        }
        options?.fail?.(failOptions)
        options?.complete?.(failOptions)
        return
      }
    } else {
      const dialogPages = getPageInstanceByVm(
        currentPage as ComponentPublicInstance
      )!.$dialogPages.value as UniDialogPage[]
      dialogPages.forEach((dialogPage) => {
        invokeHook(dialogPage.$vm!, ON_UNLOAD)
      })
      dialogPages.length = 0
    }

    const successOptions = { errMsg: 'closeDialogPage: ok' }
    options?.success?.(successOptions)
    options?.complete?.(successOptions)
  }
)
