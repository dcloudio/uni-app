import { ON_SHOW } from '@dcloudio/uni-shared'
import { invokeHook } from '@dcloudio/uni-core'
import { DialogPage } from '../../framework/page/dialogPage'
import { closeNativeDialogPage } from './utils'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/uni'

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
   * - slide-out-right: 横向向右侧滑出屏幕动画
   * - slide-out-left: 横向向左侧滑出屏幕动画
   * - slide-out-top: 竖向向上侧滑出屏幕动画
   * - slide-out-bottom: 竖向向下侧滑出屏幕动画
   * - fade-out: 从不透明到透明逐渐隐藏动画
   * - zoom-in: 从大逐渐缩小关闭动画
   * - zoom-fade-in: 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画
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

export const closeDialogPage = (options?: CloseDialogPageOptions) => {
  const currentPages = getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  if (!currentPage) {
    triggerFailCallback(options, 'currentPage is null')
    return
  }
  // @ts-expect-error
  if (options?.animationType === 'pop-out') {
    options.animationType = 'none'
  }

  if (options?.dialogPage) {
    const dialogPage = options?.dialogPage!
    if (!(dialogPage instanceof DialogPage)) {
      triggerFailCallback(options, 'dialogPage is not a valid page')
      return
    }
    const parentPage = dialogPage.$getParentPage!()
    if (parentPage && currentPages.indexOf(parentPage) !== -1) {
      const parentDialogPages = parentPage.$getDialogPages()
      const index = parentDialogPages.indexOf(dialogPage)
      parentDialogPages.splice(index, 1)
      closeNativeDialogPage(dialogPage, options?.animationType || 'none')
      if (index > 0 && index === parentDialogPages.length) {
        invokeHook(
          parentDialogPages[parentDialogPages.length - 1].$vm!,
          ON_SHOW
        )
      }
    } else {
      triggerFailCallback(options, 'dialogPage is not a valid page')
      return
    }
  } else {
    // @ts-expect-error
    const dialogPages = currentPage.$getDialogPages()
    for (let i = dialogPages.length - 1; i >= 0; i--) {
      closeNativeDialogPage(dialogPages[i], options?.animationType || 'none')
      if (i > 0) {
        invokeHook(dialogPages[i - 1].$vm!, ON_SHOW)
      }
    }
    dialogPages.length = 0
  }

  const successOptions = { errMsg: 'closeDialogPage: ok' }
  options?.success?.(successOptions)
  options?.complete?.(successOptions)
}

function triggerFailCallback(
  options: CloseDialogPageOptions | undefined,
  errMsg: string
) {
  const failOptions = new UniError(
    'uni-openDialogPage',
    4,
    `openDialogPage: fail, ${errMsg}`
  )
  options?.fail?.(failOptions)
  options?.complete?.(failOptions)
}
