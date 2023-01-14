export {
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
}
  from 'uni-core/service/api/plugin/push'

let baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo()
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync()
}
const host = baseInfo ? baseInfo.host : null
export const shareVideoMessage =
  host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage
