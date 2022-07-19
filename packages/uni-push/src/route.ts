interface OnPushMessageSuccess {
  type: 'click' | 'receive'
  data: {
    title: string
    content: string
    payload: unknown
    forceNotification?: boolean
    path?: string
  }
}
export function initPushRoute() {
  uni.onPushMessage((res: OnPushMessageSuccess) => {
    if (res.data && res.data.path && res.type === 'receive') {
      // 仅 App 端
      if (typeof plus !== 'undefined' && plus.push) {
        // 创建通知栏，并屏蔽消息的继续传递
        plus.push.createMessage(
          res.data.content,
          JSON.stringify(res.data.payload),
          {
            title: res.data.title,
            forceNotification: true,
            path: res.data.path,
          } as any
        )
      }
    }
  })
}
