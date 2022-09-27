import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import { recursive } from 'merge'
import { isArray, isPlainObject, isString } from '@vue/shared'
import { UNI_MODULES_EXPORTS } from '../../constants'
import { parseJson } from '../../json'

export function uniModulesExportsPlugin({
  enable,
}: {
  enable: boolean
}): Plugin {
  return {
    name: 'uni:modules:exports',
    resolveId(id) {
      if (id === UNI_MODULES_EXPORTS) {
        return UNI_MODULES_EXPORTS
      }
    },
    load(id) {
      if (id !== UNI_MODULES_EXPORTS) {
        return
      }
      // 未启用
      if (!enable) {
        return ''
      }
      const uniModulesDir = path.resolve(
        process.env.UNI_INPUT_DIR,
        'uni_modules'
      )
      if (!fs.existsSync(uniModulesDir)) {
        return ''
      }
      const importCodes: string[] = []
      const assignCodes: string[] = []
      fs.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
        const pkgPath = path.resolve(
          uniModulesDir,
          uniModuleDir,
          'package.json'
        )
        if (!fs.existsSync(pkgPath)) {
          return
        }
        const exports = parseJson(fs.readFileSync(pkgPath, 'utf8'))?.uni_modules
          ?.exports as Exports | undefined
        if (exports) {
          const [exportsImportCodes, exportsAssignCodes] = parseExports(
            process.env.UNI_PLATFORM === 'h5'
              ? 'web'
              : process.env.UNI_PLATFORM,
            `@/uni_modules/${uniModuleDir}`,
            exports
          )
          importCodes.push(...exportsImportCodes)
          assignCodes.push(...exportsAssignCodes)
        }
      })
      if (!importCodes.length) {
        return ''
      }
      return `${importCodes.join('\n')}
${assignCodes.join('\n')}`
    },
  }
}

type Define = string | string[] | Record<string, string>
type Defines = {
  [name: string]: Define
}

interface Exports {
  [name: string]: Define | Defines | false
}

export function parseExports(
  platform: UniApp.PLATFORM,
  source: string,
  exports: Exports = {}
): [string[], string[]] {
  const rootDefines: Defines = {}
  Object.keys(exports).forEach((name) => {
    if (name.startsWith('uni')) {
      rootDefines[name] = exports[name] as Define
    }
  })
  const platformDefines = exports[platform] as false | Defines
  // 该平台不支持
  if (platformDefines === false) {
    return [[], []]
  }
  return parseDefines(source, recursive(true, rootDefines, platformDefines))
}

export function parseDefines(
  source: string,
  defines: Defines = {}
): [string[], string[]] {
  const importCodes: string[] = []
  const assignCodes: string[] = []
  Object.keys(defines).forEach((name) => {
    const [defineImportCodes, defineAssignCodes] = parseDefine(
      source,
      name,
      defines[name]
    )
    importCodes.push(...defineImportCodes)
    assignCodes.push(...defineAssignCodes)
  })
  return [importCodes, assignCodes]
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
function parseDefine(
  source: string,
  globalObject: string,
  define: Define
): [string[], string[]] {
  const importCodes: string[] = []
  const assignCodes: string[] = []
  if (isString(define)) {
    importCodes.push(`import ${define} from '${source}'`)
    assignCodes.push(`${globalObject}.${define} = ${define}`)
  } else if (isArray(define)) {
    importCodes.push(`import { ${define.join(', ')} } from '${source}'`)
    define.forEach((d) => {
      assignCodes.push(`${globalObject}.${d} = ${d}`)
    })
  } else if (isPlainObject(define)) {
    const keys = Object.keys(define)
    const specifiers: string[] = []

    keys.forEach((d) => {
      if (d !== define[d]) {
        specifiers.push(`${define[d]} as ${d}`)
      } else {
        specifiers.push(d)
      }
      assignCodes.push(`${globalObject}.${d} = ${d}`)
    })
    importCodes.push(`import { ${specifiers.join(', ')} } from '${source}'`)
  }
  return [importCodes, assignCodes]
}
