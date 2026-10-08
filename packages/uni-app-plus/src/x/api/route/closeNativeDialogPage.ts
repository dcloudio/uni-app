import { getNativeApp } from '../../framework/app/app'
import { closeWebview } from './webview'
import { setStatusBarStyle } from '../../statusBar'
import { getVueApp } from '../../../service/framework/app/vueApp'
import { cancelDialogPageNavigatorLock } from '../../framework/page/dialogPage'

// 从 utils 中拆分该方法，避免导出时循环依赖，导致编译产物异常
function closeNativeDialogPage(
  dialogPage: UniPage,
  animationType?: string,
  animationDuration?: number,
  callback?: () => void
) {
  const pageId =
    dialogPage.vm?.$basePage.id ?? (dialogPage as any).__nativePageId
  if (pageId == null) {
    return
  }
  const webview = getNativeApp().pageManager.findPageById(pageId + '')
  if (webview) {
    // show 动画结束前关闭时，部分平台不会再触发 show completion，需在关闭路径释放路由锁
    cancelDialogPageNavigatorLock(dialogPage)
    closeWebview(
      webview,
      animationType || 'none',
      animationDuration || 0,
      () => {
        if (dialogPage.vm) {
          getVueApp().unmountPage(dialogPage.vm)
        }
        setStatusBarStyle()
        callback?.()
      }
    )
  }
}

export default closeNativeDialogPage
