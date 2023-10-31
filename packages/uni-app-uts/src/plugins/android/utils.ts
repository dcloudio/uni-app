import fs from 'fs'
import path from 'path'
import { init, parse } from 'es-module-lexer'
import {
  normalizeNodeModules,
  normalizePath,
  parseUniExtApiNamespacesJsOnce,
  removeExt,
} from '@dcloudio/uni-cli-shared'
import {
  camelize,
  capitalize,
  isArray,
  isPlainObject,
  isString,
} from '@vue/shared'

export const UVUE_CLASS_NAME_PREFIX = 'Gen'

export const DEFAULT_APPID = 'HBuilder'

export const ENTRY_FILENAME = 'index.uts'

export async function parseImports(code: string) {
  await init
  const [imports] = parse(code)
  return imports
    .map(({ s, e }) => {
      return `import "${code.slice(s, e)}"`
    })
    .concat(parseUniExtApiImports(code))
    .join('\n')
}

function parseUniExtApiImports(code: string): string[] {
  const extApis = parseUniExtApiNamespacesJsOnce(
    process.env.UNI_UTS_PLATFORM,
    process.env.UNI_UTS_TARGET_LANGUAGE
  )
  const pattern = /uni\.(\w+)/g
  const apis = new Set<string>()
  let match
  while ((match = pattern.exec(code)) !== null) {
    apis.add(match[1])
  }
  const imports: string[] = []
  apis.forEach((api) => {
    const extApi = extApis[api]
    if (extApi) {
      imports.push(`import "${extApi[0]}"`)
    }
  })
  return imports
}

export function kotlinOutDir() {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.kotlin')
}

export function uvueOutDir() {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.uvue')
}

export function isVue(filename: string) {
  return filename.endsWith('.vue') || filename.endsWith('.uvue')
}

export function stringifyMap(obj: unknown, ts = false) {
  return serialize(obj, ts)
}

function serialize(obj: unknown, ts = false): string {
  if (isString(obj)) {
    return `"${obj}"`
  } else if (isPlainObject(obj)) {
    const entries = Object.entries(obj).map(
      ([key, value]) => `[${serialize(key, ts)},${serialize(value, ts)}]`
    )
    if (entries.length) {
      return `utsMapOf([${entries.join(',')}])`
    }
    if (ts) {
      return `utsMapOf<string, any | null>()`
    }
    return `utsMapOf()`
  } else if (isArray(obj)) {
    return `[${obj.map((item) => serialize(item, ts)).join(',')}]`
  } else {
    return String(obj)
  }
}

export function parseUTSRelativeFilename(filename: string) {
  if (!path.isAbsolute(filename)) {
    return filename
  }
  return normalizeNodeModules(
    path.relative(process.env.UNI_INPUT_DIR, filename)
  )
}

export function parseUTSImportFilename(filename: string) {
  if (!path.isAbsolute(filename)) {
    return filename
  }
  return normalizePath(
    path.join(
      uvueOutDir(),
      normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, filename))
    )
  )
}

type UniCloudSpace = {
  provider: string
  spaceName: string
  spaceId: string
  clientSecret?: string
  endpoint?: string
  workspaceFolder?: string
}

let uniCloudSpaceList: Array<UniCloudSpace>
export function getUniCloudSpaceList(): Array<UniCloudSpace> {
  if (uniCloudSpaceList) {
    return uniCloudSpaceList
  }
  if (!process.env.UNI_CLOUD_SPACES) {
    uniCloudSpaceList = []
    return uniCloudSpaceList
  }
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (!Array.isArray(spaces)) {
      uniCloudSpaceList = []
      return uniCloudSpaceList
    }
    uniCloudSpaceList = spaces.map((space) => {
      if (space.provider === 'tcb') {
        space.provider = 'tencent'
      }
      if (space.clientSecret) {
        return {
          provider: space.provider,
          spaceName: space.name,
          spaceId: space.id,
          clientSecret: space.clientSecret,
          endpoint: space.apiEndpoint,
          workspaceFolder: space.workspaceFolder,
        }
      } else {
        return {
          provider: space.provider,
          spaceName: space.name,
          spaceId: space.id,
          workspaceFolder: space.workspaceFolder,
        }
      }
    })
  } catch (e) {
    console.error(e)
  }
  uniCloudSpaceList = uniCloudSpaceList || []
  if (uniCloudSpaceList.length > 1) {
    console.warn('Multi uniCloud space is not supported yet.')
  }
  return uniCloudSpaceList
}

// TODO copy from uni-uts-v1 compiler, should be refactor
type UniCloudObjectInfo = {
  name: string
  methodList: string[]
}

export function getUniCloudObjectInfo(
  uniCloudSpaceList: Array<UniCloudSpace>
): Array<UniCloudObjectInfo> {
  let uniCloudWorkspaceFolder = process.env.UNI_INPUT_DIR.endsWith('src')
    ? path.resolve(process.env.UNI_INPUT_DIR, '..')
    : process.env.UNI_INPUT_DIR
  let serviceProvider = 'aliyun'
  if (uniCloudSpaceList && uniCloudSpaceList.length > 0) {
    const space = uniCloudSpaceList[0]
    if (space.workspaceFolder) {
      uniCloudWorkspaceFolder = space.workspaceFolder
    }
    serviceProvider = space.provider === 'tencent' ? 'tcb' : space.provider
  } else {
    serviceProvider =
      ['aliyun', 'tcb', 'alipay'].find((item) =>
        fs.existsSync(path.resolve(uniCloudWorkspaceFolder, 'uniCloud-' + item))
      ) || 'aliyun'
  }
  try {
    const { getWorkspaceObjectInfo } = require('../../../lib/unicloud-utils')
    return getWorkspaceObjectInfo(uniCloudWorkspaceFolder, serviceProvider)
  } catch (e) {
    console.error(e)
    return []
  }
}

const extApiComponents: Set<string> = new Set()
export function addExtApiComponents(components: string[]) {
  components.forEach((component) => {
    extApiComponents.add(component)
  })
}

export function getExtApiComponents() {
  return extApiComponents
}

export function genClassName(fileName: string, prefix: string = 'Gen') {
  return (
    prefix +
    capitalize(
      camelize(
        verifySymbol(
          removeExt(
            normalizeNodeModules(fileName)
              .replace(/[\/|_]/g, '-')
              .replace(/-+/g, '-')
          )
        )
      )
    )
  )
}

function isValidStart(c: string): boolean {
  return !!c.match(/^[A-Za-z_-]$/)
}

function isValidContinue(c: string): boolean {
  return !!c.match(/^[A-Za-z0-9_-]$/)
}

function verifySymbol(s: string) {
  const chars = Array.from(s)

  if (isValidStart(chars[0]) && chars.slice(1).every(isValidContinue)) {
    return s
  }

  const buf: string[] = []
  let hasStart = false

  for (const c of chars) {
    if (!hasStart && isValidStart(c)) {
      hasStart = true
      buf.push(c)
    } else if (isValidContinue(c)) {
      buf.push(c)
    }
  }

  if (buf.length === 0) {
    buf.push('_')
  }

  return buf.join('')
}
