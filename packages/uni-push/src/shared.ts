import GtPush from '../lib/gtpush-min'

export type PushCallbackData =
  | {
      type: 'enabled'
      offline?: boolean
    }
  | {
      type: 'clientId'
      cid: string
      errMsg?: string
    }
  | {
      type: 'lineState'
      online: boolean
    }
  | {
      type: 'pushMsg'
      message: unknown
    }

export type PushCallback = (data: PushCallbackData) => void

export function createAppidRequiredError(): PushCallbackData {
  return {
    type: 'clientId',
    cid: '',
    errMsg: 'manifest.json->appid is required',
  }
}

export function initGtPush(appid: string, onCallback: PushCallback) {
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
      onCallback({
        type: 'clientId',
        cid: '',
        errMsg: res.error,
      })
    },
    onClientId: (res) => {
      onCallback({
        type: 'clientId',
        cid: res.cid,
      })
    },
    onlineState: (res) => {
      onCallback({
        type: 'lineState',
        online: res.online,
      })
    },
    onPushMsg: (res) => {
      onCallback({
        type: 'pushMsg',
        message: res.message,
      })
    },
  })
}
