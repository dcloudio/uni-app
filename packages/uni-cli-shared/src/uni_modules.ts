import path from 'path'
import fs from 'fs-extra'
import { recursive } from 'merge'

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

export function parseUniExtApis(vite = true) {
  const uniModulesDir = path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules')
  if (!fs.existsSync(uniModulesDir)) {
    return {}
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
        Object.assign(
          injects,
          parseInjects(
            vite,
            process.env.UNI_PLATFORM === 'h5'
              ? 'web'
              : process.env.UNI_PLATFORM,
            `@/uni_modules/${uniModuleDir}`,
            exports
          )
        )
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
