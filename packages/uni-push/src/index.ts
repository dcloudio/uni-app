import GtPush from '../lib/gtpush-min'
import { initPushNotification } from './route'
import { initBroadcastChannel, postPushMessage } from './broadcastChannel'
import { createAppidRequiredError, initGtPush } from './shared'

// if (process.env.UNI_PUSH_DEBUG) {
//   GtPush.setDebugMode(true)
// }

// @ts-expect-error
uni.invokePushCallback({
  type: 'enabled',
})

const appid = process.env.UNI_APP_ID!
if (!appid) {
  Promise.resolve().then(() => {
    // @ts-expect-error
    uni.invokePushCallback(createAppidRequiredError())
  })
} else {
  // #ifdef APP
  initPushNotification()
  // #endif
  // #ifdef H5
  initBroadcastChannel(GtPush)
  // #endif
  initGtPush(appid, (data) => {
    // @ts-expect-error
    uni.invokePushCallback(data)
    // #ifdef H5
    postPushMessage(data)
    // #endif
  })
  // 仅在 jssdk 中监听
  // #ifdef APP
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
  // #endif
}
