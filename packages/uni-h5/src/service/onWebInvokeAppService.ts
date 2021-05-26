type Name =
  | 'navigateTo'
  | 'navigateBack'
  | 'switchTab'
  | 'reLaunch'
  | 'redirectTo'
  | 'postMessage'

export function onWebInvokeAppService(
  { name, arg }: { name: Name; arg: any },
  pageId: number
) {
  if (name === 'postMessage') {
    // TODO 小程序后退、组件销毁、分享时通知
  } else {
    uni[name](arg)
  }
}
