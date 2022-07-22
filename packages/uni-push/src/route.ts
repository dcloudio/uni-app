export function initPushNotification() {
  // 仅 App 端
  if (typeof plus !== 'undefined' && plus.push) {
    plus.push.addEventListener('click', (result) => {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'click',
        message: result,
      })
    })
    uni.onPushMessage((res) => {
      if (
        res.type === 'receive' &&
        res.data &&
        (res.data as any).force_notification
      ) {
        // 创建通知栏
        uni.createPushMessage(res.data)
        // 阻止其他监听器继续监听
        ;(res as any).stopped = true
      }
    })
  }
}
