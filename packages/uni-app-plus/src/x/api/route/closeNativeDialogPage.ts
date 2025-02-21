import { getNativeApp } from '../../framework/app/app'
import { closeWebview } from './webview'
import { setStatusBarStyle } from '../../statusBar'
import { getVueApp } from '../../../service/framework/app/vueApp'

// 从 utils 中拆分该方法，避免导出时循环依赖，导致编译产物异常
function closeNativeDialogPage(
  dialogPage: UniPage,
  animationType?: string,
  animationDuration?: number,
  callback?: () => void
) {
  const webview = getNativeApp().pageManager.findPageById(
    dialogPage.vm!.$basePage.id + ''
  )
  if (webview) {
    closeWebview(
      webview,
      animationType || 'none',
      animationDuration || 0,
      () => {
        getVueApp().unmountPage(dialogPage.vm)
        setStatusBarStyle()
        callback?.()
      }
    )
  }
}

export default closeNativeDialogPage
