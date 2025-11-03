type Name =
  | 'navigateTo'
  | 'navigateBack'
  | 'switchTab'
  | 'reLaunch'
  | 'redirectTo'
  | 'postMessage'
type WebInvokeData = {
  name: Name
  arg: any
}
export type WebInvokeAppService = (
  webInvokeData: WebInvokeData,
  pageId: number | number[]
) => void

export const onWebInvokeAppService: WebInvokeAppService = ({ name, arg }) => {
  if (name === 'postMessage') {
    // TODO 小程序后退、组件销毁、分享时通知
  } else {
    switch (name) {
      case 'navigateTo':
        uni.navigateTo(arg)
        break
      case 'navigateBack':
        uni.navigateBack(arg)
        break
      case 'switchTab':
        uni.switchTab(arg)
        break
      case 'reLaunch':
        uni.reLaunch(arg)
        break
      case 'redirectTo':
        uni.redirectTo(arg)
        break
    }
  }
}
