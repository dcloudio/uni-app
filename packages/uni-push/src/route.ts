interface OnPushMessageSuccess {
  type: 'click' | 'receive'
  data: {
    title: string
    content: string
    payload: unknown
    forceNotification?: boolean
    path?: string
  }
  stopped?: boolean
}
export function initPushRoute() {
  // @ts-expect-error
  uni.onPushMessage((res: OnPushMessageSuccess) => {
    if (res.data && res.data.path) {
      if (res.type === 'click') {
        const url = res.data.path
        // 优先使用 navigateTo
        uni.navigateTo({
          url,
          fail(result) {
            // 说明是 tabBar 页面，必须使用 switchTab
            if (result.errMsg.indexOf('tabbar')) {
              uni.switchTab({
                url,
              })
            }
          },
        })
      } else if (res.type === 'receive') {
        // 仅 App 端
        if (typeof plus !== 'undefined' && plus.push) {
          // 创建通知栏，并屏蔽消息的继续传递
          plus.push.createMessage(
            res.data.content,
            JSON.stringify(res.data.payload),
            {
              title: res.data.title,
              path: res.data.path,
            } as any
          )
          // 内部属性，停止传播
          res.stopped = true
        }
      }
    }
  })
}
