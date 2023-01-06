export {
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
}
  from 'uni-core/service/api/plugin/push'

const host = wx.getAppBaseInfo().host
export const shareVideoMessage =
host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage
