import { isArray } from '@vue/shared'

export type MPProtocolArgsValue = {
  name?: string
  value: any
}
type MPProtocolArgsValueObject = boolean | string | MPProtocolArgsValue
type MPProtocolArgsValueFunction = (
  val: any,
  fromArgs: any,
  toArgs: any
) => MPProtocolArgsValueObject
type MPProtocolArgsObject = {
  [key: string]: MPProtocolArgsValueObject | MPProtocolArgsValueFunction
}
type MPProtocolArgsFunction<T = any> = (
  fromArgs: T,
  toArgs: T
) => MPProtocolArgsObject | void

export type MPProtocolArgs = MPProtocolArgsObject | MPProtocolArgsFunction

type MPProtocolReturnValue = MPProtocolArgs
export type MPProtocolObject = {
  name?: string
  args?: MPProtocolArgs
  returnValue?: MPProtocolReturnValue
}
type MPProtocolFunction = (arg: unknown) => MPProtocolObject
type MPProtocol = MPProtocolObject | MPProtocolFunction

type MPProtocolsBase = {
  [key: string]: MPProtocol
}

type MPProdocolsReturnValue = {
  returnValue?: (
    methodName: string,
    res: Record<string, any>
  ) => Record<string, any>
}

export type MPProtocols = MPProtocolsBase | MPProdocolsReturnValue

export const previewImage: MPProtocol = {
  args(
    fromArgs: UniApp.PreviewImageOptions,
    toArgs: WechatMiniprogram.PreviewImageOption
  ) {
    let currentIndex = parseInt(fromArgs.current as string)
    if (isNaN(currentIndex)) {
      return
    }
    const urls = fromArgs.urls
    if (!isArray(urls)) {
      return
    }
    const len = urls.length
    if (!len) {
      return
    }
    if (currentIndex < 0) {
      currentIndex = 0
    } else if (currentIndex >= len) {
      currentIndex = len - 1
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex]
      toArgs.urls = urls.filter(
        (item, index) =>
          index < currentIndex ? item !== urls[currentIndex] : true
      )
    } else {
      toArgs.current = urls[0]
    }
    return {
      indicator: false,
      loop: false
    }
  }
}

export function addSafeAreaInsets(
  fromRes: any,
  toRes: UniApp.GetSystemInfoResult
) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.windowHeight - safeArea.bottom
    }
  }
}

export const getSystemInfo = {
  returnValue: addSafeAreaInsets
}

export const getSystemInfoSync = getSystemInfo

export const redirectTo = {}

export const createCanvasContext: MPProtocol = {
  returnValue(fromRes: any, toRes: UniApp.CanvasContext) {
    const measureText = fromRes.measureText
    toRes.measureText = function(
      text: string,
      callback: (measureText: UniApp.CanvasTextMetrics) => void
    ) {
      const textMetrics = measureText.call(this, text)
      if (typeof callback === 'function') {
        setTimeout(() => callback(textMetrics), 0)
      }
      return textMetrics
    }
  }
}
