export default function onWebInvokeAppService ({
  name,
  arg
}, pageId) {
  if (name === 'postMessage') {
    // TODO 小程序后退、组件销毁、分享时通知
  } else {
    uni[name](arg)
  }
}
