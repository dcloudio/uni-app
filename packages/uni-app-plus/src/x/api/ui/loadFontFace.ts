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
import type { ComponentPublicInstance } from 'vue'

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
  res: AsyncApiRes<UniNamespace.LoadFontFaceOptions> | null
): NativeLoadFontFaceOptions {
  return {
    family: options.family,
    source: options.source,
    success: (_: any | null) => {
      res?.resolve(null)
    },
    fail: (error: NativeLoadFontFaceFail) => {
      res?.reject(
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
    if (options.global === true) {
      appLoadFontFace(options, res)
    } else {
      const page = getCurrentPage() as unknown as UniPage
      if (!page.vm) {
        res.reject('page is not ready', 99)
        // reject(new LoadFontFaceErrorImpl('page is not ready', 99), 99)
        return
      }

      pageLoadFontFace(page.vm, options, res)
    }
  },
  LoadFontFaceProtocol
)

export const appLoadFontFace = (
  options: LoadFontFaceOptions,
  res: AsyncApiRes<UniNamespace.LoadFontFaceOptions> | null
) => {
  options.source = removeUrlWrap(options.source as string)
  const app = getNativeApp()
  const fontInfo = getLoadFontFaceOptions(options, res)
  app.loadFontFace(fontInfo)
}

export const pageLoadFontFace = (
  pageVm: ComponentPublicInstance,
  options: LoadFontFaceOptions,
  res: AsyncApiRes<UniNamespace.LoadFontFaceOptions> | null
) => {
  if (pageVm.$fontFamilySet.has(options.family)) {
    return
  }
  options.source = removeUrlWrap(options.source as string)
  pageVm.$fontFamilySet.add(options.family)
  const fontInfo = getLoadFontFaceOptions(options, res)
  pageVm.$nativePage!.loadFontFace(fontInfo)
}
