import path from 'path'
import fs from 'fs-extra'
import type { UTSTargetLanguage } from './uts'

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

export function parseUniExtApis(
  vite = true,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage = 'javascript'
) {
  if (!process.env.UNI_INPUT_DIR) {
    return {}
  }
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
    const uniModuleRootDir = path.resolve(uniModulesDir, uniModuleDir)
    const pkgPath = path.resolve(uniModuleRootDir, 'package.json')
    if (!fs.existsSync(pkgPath)) {
      return
    }
    try {
      let exports: Exports | undefined
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      if (pkg && pkg.uni_modules && pkg.uni_modules['uni-ext-api']) {
        exports = pkg.uni_modules['uni-ext-api']
      }
      if (exports) {
        const curInjects = parseInjects(
          vite,
          platform,
          language,
          `@/uni_modules/${uniModuleDir}`,
          uniModuleRootDir,
          exports
        )
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
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage,
  source: string,
  uniModuleRootDir: string,
  exports: Exports = {}
) {
  let rootDefines: Defines = {}
  Object.keys(exports).forEach((name) => {
    if (name.startsWith('uni')) {
      rootDefines[name] = exports[name] as Inject
    }
  })
  const injects: Injects = {}
  if (Object.keys(rootDefines).length) {
    const hasPlatformFile = uniModuleRootDir
      ? fs.existsSync(path.resolve(uniModuleRootDir, 'utssdk', 'index.uts')) ||
        fs.existsSync(path.resolve(uniModuleRootDir, 'utssdk', platform))
      : true

    for (const key in rootDefines) {
      Object.assign(
        injects,
        parseInject(
          vite,
          platform,
          language,
          source,
          'uni',
          rootDefines[key],
          hasPlatformFile
        )
      )
    }
  }
  return injects
}

function parseInject(
  vite = true,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  language: UTSTargetLanguage,
  source: string,
  globalObject: string,
  define: Define,
  hasPlatformFile: boolean
) {
  const injects: Injects = {}
  if (define === false) {
  } else if (typeof define === 'string') {
    // {'uni.getBatteryInfo' : '@dcloudio/uni-getbatteryinfo'}
    if (hasPlatformFile) {
      injects[globalObject + '.' + define] = vite ? source : [source, 'default']
    }
  } else if (Array.isArray(define)) {
    // {'uni.getBatteryInfo' : ['@dcloudio/uni-getbatteryinfo','getBatteryInfo]}
    if (hasPlatformFile) {
      define.forEach((d) => {
        injects[globalObject + '.' + d] = [source, d]
      })
    }
  } else {
    const keys = Object.keys(define)
    keys.forEach((d) => {
      if (typeof define[d] === 'string') {
        if (hasPlatformFile) {
          injects[globalObject + '.' + d] = [source, define[d] as string]
        }
      } else {
        const defineOptions = define[d] as DefineOptions
        const p =
          platform === 'app-android' || platform === 'app-ios'
            ? 'app'
            : platform
        if (!(p in defineOptions)) {
          if (hasPlatformFile) {
            injects[globalObject + '.' + d] = [source, defineOptions.name || d]
          }
        } else {
          if (defineOptions[p] !== false) {
            if (p === 'app') {
              const appOptions = defineOptions.app
              if (isPlainObject(appOptions)) {
                if (language === 'javascript') {
                  if (appOptions.js === false) {
                    return
                  }
                } else if (language === 'kotlin') {
                  if (appOptions.kotlin === false) {
                    return
                  }
                } else if (language === 'swift') {
                  if (appOptions.swift === false) {
                    return
                  }
                }
              }
              injects[globalObject + '.' + d] = [
                source,
                defineOptions.name || d,
                defineOptions.app,
              ]
            } else {
              injects[globalObject + '.' + d] = [
                source,
                defineOptions.name || d,
              ]
            }
          }
        }
      }
    })
  }
  return injects
}

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)

function isPlainObject(val: unknown): val is object {
  return toTypeString(val) === '[object Object]'
}
