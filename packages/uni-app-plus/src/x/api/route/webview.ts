import { IPage } from '@dcloudio/uni-app-x/types/native'

export function showWebview(
  nPage: IPage,
  animationType: string,
  animationDuration: number,
  showCallback: () => void,
  delay?: number
) {
  nPage.startRender()
  nPage.show(
    new Map<string, any>([
      ['animationType', animationType],
      ['animationDuration', animationDuration],
    ]),
    showCallback
  )
}

export function closeWebview(
  nPage: IPage,
  animationType: string,
  animationDuration?: number,
  callback?: () => void
) {
  const options = new Map<string, any>([['animationType', animationType]])
  if (typeof animationDuration === 'number') {
    options.set('animationDuration', animationDuration)
  }
  nPage.close(options, callback)
}
