import {
  API_LOAD_FONT_FACE,
  LoadFontFaceProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import type {
  LoadFontFaceErrCode,
  LoadFontFaceOptions,
} from '@dcloudio/uni-app-x/types/uni'
import { getCurrentPage } from '@dcloudio/uni-core'
import { getNativeApp } from '../../framework/app/app'

function removeUrlWrap(source: string): string {
  // 考虑 url(xxx) format(xxx) 的情况，去掉 format(xxx)
  if (source.startsWith('url(')) {
    if (source.split('format(').length > 1) {
      source = source.split('format(')[0].trim()
    }
    source = source.substring(4, source.length - 1)
  }
  if (source.startsWith('"') || source.startsWith("'")) {
    source = source.substring(1, source.length - 1)
  }
  return source
}

function getLoadFontFaceOptions(
  options: LoadFontFaceOptions,
  res: AsyncApiRes<UniNamespace.LoadFontFaceOptions>
): NativeLoadFontFaceOptions {
  return {
    family: options.family,
    source: options.source,
    success: (_: any | null) => {
      res.resolve(null)
    },
    fail: (error: NativeLoadFontFaceFail) => {
      res.reject(
        // new LoadFontFaceErrorImpl(
        error.errMsg,
        error.errCode as LoadFontFaceErrCode
        // )
      )
    },
  } as NativeLoadFontFaceOptions
}

/**
 * uni.loadFontFace
 * 注意：iOS 目前不支持页面级别的加载，功能实际不生效。
 * 只支持全局加载
 */
export const loadFontFace = defineAsyncApi(
  API_LOAD_FONT_FACE,
  (options: LoadFontFaceOptions, res) => {
    options.source = removeUrlWrap(options.source as string)

    if (options.global === true) {
      const app = getNativeApp()
      const fontInfo = getLoadFontFaceOptions(options, res)
      app.loadFontFace(fontInfo)
    } else {
      const page = (getCurrentPage() as unknown as UniPage).vm

      if (!page) {
        res.reject('page is not ready', 99)
        // reject(new LoadFontFaceErrorImpl('page is not ready', 99), 99)
        return
      }

      if (page!.$fontFamilySet.has(options.family)) {
        return
      }

      page!.$fontFamilySet.add(options.family)
      const fontInfo = getLoadFontFaceOptions(options, res)
      page.$nativePage!.loadFontFace(fontInfo)
    }
  },
  LoadFontFaceProtocol
)
