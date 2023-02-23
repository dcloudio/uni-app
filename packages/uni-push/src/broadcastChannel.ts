import GtPush from '../lib/gtpush-min'

let channel: BroadcastChannel
export function postPushMessage(data: unknown) {
  if (!channel) {
    return
  }
  channel.postMessage(data)
}
export function initBroadcastChannel(gtPush: typeof GtPush) {
  if (typeof BroadcastChannel === 'undefined') {
    return
  }
  channel = new BroadcastChannel('uni-push')
  channel.onmessage = function ({ data }) {
    // @ts-expect-error
    uni.invokePushCallback(data)
  }

  // eslint-disable-next-line no-restricted-globals
  document.addEventListener('visibilitychange', function () {
    // eslint-disable-next-line no-restricted-globals
    if (document.visibilityState === 'visible') {
      gtPush.enableSocket(true)
    }
  })
}
