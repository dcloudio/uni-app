import type { ClassDeclaration } from 'typescript'
import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isUniPageFile } from '../json/pages'
import { normalizePath } from '../utils'
interface SharedDataResult {
  className: string
  renderElementCode: string
  renderNativeViewCode: string
}
const sharedDataCache: Map<string, SharedDataResult> = new Map()

export function setSharedDataClassName(key: string, className: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.className = className
  } else {
    sharedDataCache.set(key, {
      className,
      renderElementCode: '',
      renderNativeViewCode: '',
    })
  }
}

export function setSharedDataElementCode(key: string, code: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.renderElementCode = code
  } else {
    sharedDataCache.set(key, {
      className: '',
      renderElementCode: code,
      renderNativeViewCode: '',
    })
  }
}

export function setSharedDataNativeViewCode(key: string, code: string) {
  if (sharedDataCache.has(key)) {
    sharedDataCache.get(key)!.renderNativeViewCode = code
  } else {
    sharedDataCache.set(key, {
      className: '',
      renderElementCode: '',
      renderNativeViewCode: code,
    })
  }
}

export function getSharedDataResult(key: string) {
  return (
    sharedDataCache.get(key) || {
      className: '',
      renderElementCode: '',
      renderNativeViewCode: '',
    }
  )
}

function emitSharedData(className: string, code: string) {
  console.log(className, code)
}

export function uniSharedDataPlugin(): Plugin {
  const { genSharedData, TARGET_PLATFORM, TARGET_LANGUAGE, COMPONENT_TYPE } =
    require('@dcloudio/compiler-vapor-dom2') as typeof import('../../lib/dom2/app/@vue/compiler-vapor-dom2')
  const { getTypeScript, toCppCode } = resolveUTSCompiler()

  function getTargetPlatform(): (typeof TARGET_PLATFORM)[keyof typeof TARGET_PLATFORM] {
    if (process.env.UNI_UTS_PLATFORM === 'app-android') {
      return TARGET_PLATFORM.APP_ANDROID
    }
    if (process.env.UNI_UTS_PLATFORM === 'app-ios') {
      return TARGET_PLATFORM.APP_IOS
    }
    if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
      return TARGET_PLATFORM.APP_HARMONY
    }
    throw new Error(`Unsupported platform: ${process.env.UNI_UTS_PLATFORM}`)
  }
  function getTargetLanguage(): (typeof TARGET_LANGUAGE)[keyof typeof TARGET_LANGUAGE] {
    if (process.env.UNI_UTS_PLATFORM === 'app-android') {
      return TARGET_LANGUAGE.KOTLIN
    }
    if (process.env.UNI_UTS_PLATFORM === 'app-ios') {
      return TARGET_LANGUAGE.SWIFT
    }
    if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
      return TARGET_LANGUAGE.CPP
    }
    throw new Error(`Unsupported platform: ${process.env.UNI_UTS_PLATFORM}`)
  }

  const targetPlatform = getTargetPlatform()
  const targetLanguage = getTargetLanguage()

  async function transformRenderElementCode(code: string) {
    if (targetPlatform === TARGET_PLATFORM.APP_HARMONY) {
      return toCppCode({ code })
    }
    throw new Error(`Unsupported platform: ${targetPlatform}`)
  }

  async function transformRenderNativeViewCode(code: string) {
    if (targetPlatform === TARGET_PLATFORM.APP_HARMONY) {
      return toCppCode({ code })
    }
    throw new Error(`Unsupported platform: ${targetPlatform}`)
  }
  return {
    name: 'uni:shared-data',
    async transform(code, id) {
      const moduleInfo = this.getModuleInfo(id)
      if (moduleInfo && moduleInfo.meta.uniSharedData) {
        const { decls } = moduleInfo.meta.uniSharedData as {
          decls: ClassDeclaration[]
        }
        const filename = normalizePath(id.split('?')[0])
        const componentType = isUniPageFile(filename)
          ? COMPONENT_TYPE.PAGE
          : COMPONENT_TYPE.COMPONENT
        const { className, renderElementCode, renderNativeViewCode } =
          getSharedDataResult(filename)
        if (className) {
          const options: Parameters<typeof genSharedData>[1] = {
            platform: targetPlatform,
            targetLanguage: targetLanguage,
            componentType,
            ts: getTypeScript(),
            renderElementCode: await transformRenderElementCode(
              renderElementCode
            ),
            renderNativeViewCode: await transformRenderNativeViewCode(
              renderNativeViewCode
            ),
          }
          const { code } = genSharedData(decls, options)
          emitSharedData(className, code)
        }
      }
    },
  }
}
