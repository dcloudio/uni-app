import { ComponentPublicInstance } from 'vue'
import { removePage } from '../../../service/framework/page/getCurrentPages'
import { closeWebview } from './webview'

export function closePage(
  page: ComponentPublicInstance,
  animationType: string,
  animationDuration?: number
) {
  removePage(page)
  closeWebview(page.$nativePage!, animationType, animationDuration)
}
