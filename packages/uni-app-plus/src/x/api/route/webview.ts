import { IPage } from '@dcloudio/uni-app-x/types/native'

export function showWebview(
  nPage: IPage,
  animationType: string,
  animationDuration: number,
  showCallback: Function,
  delay?: number
) {
  // TODO options
  nPage.startRender()
  nPage.show()
}

export function closeWebview(
  nPage: IPage,
  animationType: string,
  animationDuration?: number
) {
  // options
  nPage.close()
}
