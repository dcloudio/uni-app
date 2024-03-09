import {
  defineAsyncApi,
  API_LOAD_FONT_FACE,
  LoadFontFaceProtocol,
} from '@dcloudio/uni-api'
import {
  LoadFontFaceErrCode,
  LoadFontFaceOptions,
} from '@dcloudio/uni-app-x/types/uni'
import { ComponentPublicInstance } from 'vue'
import { getCurrentPage } from '@dcloudio/uni-core'
import { getNativeApp } from '../../framework/app/app'

// export abstract class LoadFontFaceError extends UniError {
//   abstract override errCode: LoadFontFaceErrCode
// }

// class LoadFontFaceErrorImpl extends LoadFontFaceError {
//   override errCode: LoadFontFaceErrCode
//   constructor(
//     errMsg: string,
//     errCode: LoadFontFaceErrCode = 4,
//     data: any | null = null,
//     cause: Error | null = null,
//     errSubject: string = ''
//   ) {
//     super()
//     this.errMsg = errMsg
//     this.errCode = errCode
//     this.data = data
//     this.cause = cause
//     this.errSubject = errSubject
//   }
// }

const SOURCE_REG = /(.+\.((ttf)|(otf)|(woff2?))$)|(^(http|https):\/\/.+)/

function removeUrlWrap(source: string): string {
  if (source.startsWith('url(')) {
    source = source.substring(4, source.length - 1)
  }
  if (source.startsWith('"') || source.startsWith("'")) {
    source = source.substring(1, source.length - 1)
  }
  return source
}

function checkOptionSource(
  options: LoadFontFaceOptions,
  res: AsyncApiRes<UniNamespace.LoadFontFaceOptions>
): boolean {
  options.source = removeUrlWrap(options.source)
  if (!SOURCE_REG.test(options.source)) {
    // const err = new LoadFontFaceErrorImpl(
    //   'loadFontFace:fail, source is invalid.',
    //   101
    // )
    res.reject('loadFontFace:fail, source is invalid.', 101)
    return false
  }
  return true
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

// core
export const loadFontFace = defineAsyncApi(
  API_LOAD_FONT_FACE,
  (options: LoadFontFaceOptions, res) => {
    if (options.global === true) {
      if (checkOptionSource(options, res)) {
        const app = getNativeApp()
        const fontInfo = getLoadFontFaceOptions(options, res)
        app.loadFontFace(fontInfo)
      }
    } else {
      const page = getCurrentPage() as unknown as ComponentPublicInstance

      if (!page) {
        res.reject('page is not ready', 99)
        // reject(new LoadFontFaceErrorImpl('page is not ready', 99), 99)
        return
      }

      if (page!.$fontFamilySet.has(options.family)) {
        return
      }

      if (checkOptionSource(options, res)) {
        page!.$fontFamilySet.add(options.family)
        const fontInfo = getLoadFontFaceOptions(options, res)
        page.$nativePage!.loadFontFace(fontInfo)
      }
    }
  },
  LoadFontFaceProtocol
)
