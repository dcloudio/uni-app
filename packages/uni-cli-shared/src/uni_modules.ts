import path from 'path'
import fs from 'fs-extra'
import { recursive } from 'merge'
import { once } from '@dcloudio/uni-shared'
import { isArray } from '@vue/shared'
import {
  parseKotlinPackageWithPluginId,
  parseSwiftPackageWithPluginId,
} from './uts'

type DefineOptions = {
  name?: string
  app?:
    | boolean
    | {
        js?: boolean
        kotlin?: boolean
        swift?: boolean
      }
  [key: string]: any
}

type Define = string | string[] | Record<string, string | DefineOptions> | false
type Defines = {
  [name: string]: Define
}

export interface Exports {
  [name: string]: Define | Defines | false
}

type UTSTargetLanguage = typeof process.env.UNI_UTS_TARGET_LANGUAGE

export const parseUniExtApiNamespacesOnce = once(
  (language: UTSTargetLanguage) => {
    const extApis = parseUniExtApiNamespacesJsOnce(language)
    const namespaces: Record<string, [string, string]> = {}
    Object.keys(extApis).forEach((name) => {
      const options = extApis[name]
      let source = options[0]
      const pluginId = path.basename(options[0])
      if (language === 'kotlin') {
        source = parseKotlinPackageWithPluginId(pluginId, true)
      } else if (language === 'swift') {
        source = parseSwiftPackageWithPluginId(pluginId, true)
      }
      namespaces[name] = [source, options[1]]
    })
    return namespaces
  }
)

export const parseUniExtApiNamespacesJsOnce = once(
  (language: UTSTargetLanguage) => {
    const extApis = parseUniExtApis(true, language)
    const namespaces: Record<string, [string, string]> = {}
    Object.keys(extApis).forEach((name) => {
      const options = extApis[name]
      if (isArray(options) && options.length >= 2) {
        namespaces[name.replace('uni.', '')] = [options[0], options[1]]
      }
    })
    return namespaces
  }
)

export function parseUniExtApis(
  vite = true,
  language: UTSTargetLanguage = 'javascript'
) {
  const uniModulesDir = path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules')
  if (!fs.existsSync(uniModulesDir)) {
    return {}
  }
  let platform = process.env.UNI_PLATFORM
  if (platform === 'h5') {
    platform = 'web'
  } else if (platform === 'app-plus') {
    platform = 'app'
  }
  const injects: Injects = {}
  fs.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
    // 必须以 uni- 开头
    if (!uniModuleDir.startsWith('uni-')) {
      return
    }
    const pkgPath = path.resolve(uniModulesDir, uniModuleDir, 'package.json')
    if (!fs.existsSync(pkgPath)) {
      return
    }
    try {
      const exports = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
        ?.uni_modules?.['uni-ext-api'] as Exports | undefined
      if (exports) {
        const curInjects = parseInjects(
          vite,
          platform,
          `@/uni_modules/${uniModuleDir}`,
          exports
        )
        if (platform === 'app') {
          Object.keys(curInjects).forEach((name) => {
            const options = curInjects[name]
            // js 平台禁用了
            if (Array.isArray(options) && options.length === 3) {
              if (
                options[2] &&
                (options[2] as any)[
                  language === 'javascript' ? 'js' : language
                ] === false
              ) {
                delete curInjects[name]
              }
            }
          })
        }
        Object.assign(injects, curInjects)
      }
    } catch (e) {}
  })
  return injects
}

type Inject = string | string[]
type Injects = {
  [name: string]:
    | string
    | [string, string]
    | [string, string, DefineOptions['app']]
    | false
}
/**
 *  uni:'getBatteryInfo'
 * import getBatteryInfo from '..'
 *
 * uni:['getBatteryInfo']
 * import { getBatteryInfo } from '..'
 *
 * uni:['openLocation','chooseLocation']
 * import { openLocation, chooseLocation } from '..'
 *
 * uni:{
 *  onUserCaptureScreen: "onCaptureScreen"
 *  offUserCaptureScreen: "offCaptureScreen"
 * }
 *
 * uni.getBatteryInfo = getBatteryInfo
 * @param source
 * @param globalObject
 * @param define
 * @returns
 */
export function parseInjects(
  vite = true,
  platform: UniApp.PLATFORM,
  source: string,
  exports: Exports = {}
) {
  let rootDefines: Defines = {}
  Object.keys(exports).forEach((name) => {
    if (name.startsWith('uni')) {
      rootDefines[name] = exports[name] as Inject
    }
  })
  const platformDefines = exports[platform] as false | Defines
  // 该平台不支持
  if (platformDefines === false) {
    return {}
  }
  if (platformDefines) {
    rootDefines = recursive(true, rootDefines, platformDefines)
  }
  const injects: Injects = {}
  for (const key in rootDefines) {
    Object.assign(
      injects,
      parseInject(vite, platform, source, 'uni', rootDefines[key])
    )
  }
  return injects
}

export function parseInject(
  vite = true,
  platform: UniApp.PLATFORM,
  source: string,
  globalObject: string,
  define: Define
) {
  const injects: Injects = {}
  if (define === false) {
  } else if (typeof define === 'string') {
    // {'uni.getBatteryInfo' : '@dcloudio/uni-getbatteryinfo'}
    injects[globalObject + '.' + define] = vite ? source : [source, 'default']
  } else if (Array.isArray(define)) {
    // {'uni.getBatteryInfo' : ['@dcloudio/uni-getbatteryinfo','getBatteryInfo]}
    define.forEach((d) => {
      injects[globalObject + '.' + d] = [source, d]
    })
  } else {
    const keys = Object.keys(define)
    keys.forEach((d) => {
      if (typeof define[d] === 'string') {
        injects[globalObject + '.' + d] = [source, define[d] as string]
      } else {
        const defineOptions = define[d] as DefineOptions
        if (defineOptions[platform] !== false) {
          if (platform === 'app') {
            injects[globalObject + '.' + d] = [
              source,
              defineOptions.name || d,
              defineOptions.app,
            ]
          } else {
            injects[globalObject + '.' + d] = [source, defineOptions.name || d]
          }
        }
      }
    })
  }
  return injects
}
