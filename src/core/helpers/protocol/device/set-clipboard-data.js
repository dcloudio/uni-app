export const setClipboardData = {
  beforeSuccess () {
    uni.showToast({
      title: '内容已复制',
      icon: 'success',
      mask: false
    })
  }
}
