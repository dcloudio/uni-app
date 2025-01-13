import {
  type MPComponentInstance,
  initGetProvider,
} from '@dcloudio/uni-mp-core'
import { mocks } from '../runtime/parseOptions'
import { initWx } from './wx'
import { isArray, isFunction } from '@vue/shared'

export const getProvider = initGetProvider({
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'],
})

function initComponentMocks(
  component:
    | WechatMiniprogram.Component.TrivialInstance
    | WechatMiniprogram.Page.TrivialInstance
) {
  const res: MPComponentInstance = Object.create(null)
  mocks.forEach((name) => {
    res[name] = component[name]
  })
  return res
}
/**
 * 微信小程序内部会 Object.keys(vm)，导致告警
 * Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
 * @returns
 */
export function createSelectorQuery() {
  const query = wx.createSelectorQuery()
  const oldIn = query.in
  query.in = function newIn(
    component:
      | WechatMiniprogram.Component.TrivialInstance
      | WechatMiniprogram.Page.TrivialInstance
  ) {
    if (component.$scope) {
      // fix skyline 微信小程序内部无法读取component导致报错
      return oldIn.call(this, component.$scope)
    }
    return oldIn.call(this, initComponentMocks(component))
  }
  return query
}

const wx = initWx()
let baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo()
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync()
}
const host = baseInfo ? baseInfo.host : null
export const shareVideoMessage =
  host && host.env === 'SAAASDK'
    ? wx.miniapp.shareVideoMessage
    : wx.shareVideoMessage

//#if _X_
const THEME_CALLBACK: Array<
  [HostThemeChangeCallback, UniApp.OnThemeChangeCallback]
> = []

type HostThemeChangeCallback = (res: { hostTheme: string }) => void
export const onHostThemeChange = (callback: HostThemeChangeCallback) => {
  const onHostThemeChangeCallback: UniApp.OnThemeChangeCallback = (res) => {
    callback({ hostTheme: res.theme })
  }
  const index = THEME_CALLBACK.push([callback, onHostThemeChangeCallback]) - 1
  wx.onThemeChange && wx.onThemeChange(onHostThemeChangeCallback)
  return index
}
export const offHostThemeChange = (
  callbackId: number | HostThemeChangeCallback
) => {
  if (isFunction(callbackId)) {
    callbackId = THEME_CALLBACK.findIndex(
      ([callback]) => callback === callbackId
    )
  }
  if (callbackId > -1) {
    const arr = THEME_CALLBACK.splice(callbackId, 1)[0]
    isArray(arr) && wx.offThemeChange && wx.offThemeChange(arr[1])
  }
}
//#endif
