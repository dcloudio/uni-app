import {
  type MPComponentInstance,
  initGetProvider,
} from '@dcloudio/uni-mp-core'
import { mocks } from '../runtime/parseOptions'
import { initWx } from './wx'
import { isFunction } from '@vue/shared'

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

if (!__GLOBAL__.canIUse('getAppBaseInfo')) {
  __GLOBAL__.getAppBaseInfo = __GLOBAL__.getSystemInfoSync
}

if (!__GLOBAL__.canIUse('getWindowInfo')) {
  __GLOBAL__.getWindowInfo = __GLOBAL__.getSystemInfoSync
}

if (!__GLOBAL__.canIUse('getDeviceInfo')) {
  __GLOBAL__.getDeviceInfo = __GLOBAL__.getSystemInfoSync
}

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
type HostThemeChangeCallback = (res: { hostTheme: string }) => void

const THEME_CALLBACK_MAP = new Map<
  number,
  [HostThemeChangeCallback, UniApp.OnThemeChangeCallback]
>()
let CALLBACK_ID = 0

export const onHostThemeChange = (callback: HostThemeChangeCallback) => {
  const onHostThemeChangeCallback: UniApp.OnThemeChangeCallback = (res) => {
    callback({ hostTheme: res.theme })
  }

  const id = ++CALLBACK_ID
  THEME_CALLBACK_MAP.set(id, [callback, onHostThemeChangeCallback])

  if (wx.onThemeChange) {
    wx.onThemeChange(onHostThemeChangeCallback)
  }

  return id
}

export const offHostThemeChange = (
  callbackId: number | HostThemeChangeCallback
) => {
  let id: number | undefined

  if (isFunction(callbackId)) {
    THEME_CALLBACK_MAP.forEach(([cb], key) => {
      if (cb === callbackId && id === undefined) {
        id = key
      }
    })
  } else {
    id = callbackId
  }

  if (id !== undefined && THEME_CALLBACK_MAP.has(id)) {
    const [, onHostThemeChangeCallback] = THEME_CALLBACK_MAP.get(id)!
    THEME_CALLBACK_MAP.delete(id)
    if (wx.offThemeChange) {
      wx.offThemeChange(onHostThemeChangeCallback)
    }
  }
}

//#endif
