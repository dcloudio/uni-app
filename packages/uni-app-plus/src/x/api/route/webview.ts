import { IPage } from '@dcloudio/uni-app-x/types/native'

export function showWebview(
  webview: IPage,
  animationType: string,
  animationDuration: number,
  showCallback: Function,
  delay?: number
) {
  // TODO options
  webview.startRender()
  webview.show()
}
