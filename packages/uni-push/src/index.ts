import GtPush from '../lib/gtpush-min'
import { initPushNotification } from './route'

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
    uni.invokePushCallback({
      type: 'clientId',
      cid: '',
      errMsg: 'manifest.json->appid is required',
    })
  })
} else {
  // #ifdef APP
  initPushNotification()
  // #endif
  GtPush.init({
    appid,
    onError: (res) => {
      console.error(res.error)
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'clientId',
        cid: '',
        errMsg: res.error,
      })
    },
    onClientId: (res) => {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'clientId',
        cid: res.cid,
      })
    },
    onlineState: (res) => {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'lineState',
        online: res.online,
      })
    },
    onPushMsg: (res) => {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'pushMsg',
        message: res.message,
      })
    },
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
