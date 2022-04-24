import GtPush from '../lib/gtpush-min'

// if (process.env.UNI_PUSH_DEBUG) {
//   GtPush.setDebugMode(true)
// }

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
  GtPush.init({
    appid,
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
}
