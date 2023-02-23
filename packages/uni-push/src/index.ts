import GtPush from '../lib/gtpush-min'
import { initPushNotification } from './route'
import { initBroadcastChannel, postPushMessage } from './broadcastChannel'

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
  // #ifdef H5
  initBroadcastChannel(GtPush)
  // #endif
  // #ifdef MP || APP
  if (typeof uni.onAppShow === 'function') {
    uni.onAppShow(() => {
      GtPush.enableSocket(true)
    })
  }
  // #endif
  GtPush.init({
    appid,
    onError: (res) => {
      console.error(res.error)
      const data = {
        type: 'clientId',
        cid: '',
        errMsg: res.error,
      }
      // @ts-expect-error
      uni.invokePushCallback(data)
      // #ifdef H5
      postPushMessage(data)
      // #endif
    },
    onClientId: (res) => {
      const data = {
        type: 'clientId',
        cid: res.cid,
      }
      // @ts-expect-error
      uni.invokePushCallback(data)
      // #ifdef H5
      postPushMessage(data)
      // #endif
    },
    onlineState: (res) => {
      const data = {
        type: 'lineState',
        online: res.online,
      }
      // @ts-expect-error
      uni.invokePushCallback(data)
      // #ifdef H5
      postPushMessage(data)
      // #endif
    },
    onPushMsg: (res) => {
      const data = {
        type: 'pushMsg',
        message: res.message,
      }
      // @ts-expect-error
      uni.invokePushCallback(data)
      // #ifdef H5
      postPushMessage(data)
      // #endif
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
