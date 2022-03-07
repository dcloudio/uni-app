import GtPush from '../lib/gtpush-min'

if (process.env.UNI_PUSH_DEBUG) {
  GtPush.setDebugMode(true)
}

GtPush.init({
  appid: process.env.UNI_PUSH_APP_ID!,
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
