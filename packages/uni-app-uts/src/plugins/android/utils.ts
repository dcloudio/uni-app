import fs from 'fs'
import path from 'path'
import { ImportSpecifier, init, parse } from 'es-module-lexer'
import {
  AutoImportOptions,
  createResolveErrorMsg,
  createRollupError,
  initAutoImportOptions,
  normalizeNodeModules,
  normalizePath,
  offsetToStartAndEnd,
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

import AutoImport from 'unplugin-auto-import/vite'
import { once } from '@dcloudio/uni-shared'
import type { SourceMapInput, PluginContext } from 'rollup'
import { Position, SourceLocation } from '@vue/compiler-core'

import { createCompilerError } from './uvue/compiler/errors'

export const UVUE_CLASS_NAME_PREFIX = 'Gen'

export const DEFAULT_APPID = 'HBuilder'

export const ENTRY_FILENAME = 'main.uts'

export function wrapResolve(
  resolve: PluginContext['resolve']
): PluginContext['resolve'] {
  return async (source, importer, options) => {
    try {
      return await resolve(source, importer, options)
    } catch (e) {
      // import "@/pages/logo.png" 可能会报 Cannot find module 错误
    }
    return null
  }
}

export function createTryResolve(
  importer: string,
  resolve: PluginContext['resolve'],
  offsetStart?: Position,
  origCode: string = ''
) {
  return async (
    source: string,
    code: string,
    { ss, se }: ImportSpecifier
  ): Promise<boolean | void> => {
    const resolved = await wrapResolve(resolve)(source, importer)
    if (!resolved) {
      const { start, end } = offsetToStartAndEnd(code, ss, se)
      if (offsetStart) {
        if (start.line === 1) {
          start.column = start.column + offsetStart.column
          if (end.line === 1) {
            end.column = end.column + offsetStart.column
          }
        }
        const offsetLine = offsetStart.line - 1
        start.line = start.line + offsetLine
        end.line = end.line + offsetLine
      }
      throw createResolveError(
        origCode || code,
        createResolveErrorMsg(source, importer),
        start,
        end
      )
    }
  }
}

export async function parseImports(
  code: string,
  tryResolve?: ReturnType<typeof createTryResolve>
) {
  await init
  let res: ReturnType<typeof parse> = [[], [], false]
  try {
    res = parse(code)
  } catch (err: any) {
    const message = err.message
    if (message) {
      const matches = message.match(/@:(\d+):(\d+)/)
      if (matches) {
        throw createRollupError(
          '',
          '',
          createCompilerError(
            0,
            {
              start: {
                offset: 0,
                line: parseInt(matches[1]),
                column: parseInt(matches[2]),
              },
            } as SourceLocation,
            { 0: `Parse error` },
            ''
          ),
          code
        )
      }
    }
    throw err
  }
  const imports = res[0]
  const importsCode: string[] = []
  for (const specifier of imports) {
    const source = code.slice(specifier.s, specifier.e)
    if (tryResolve) {
      const res = await tryResolve(source, code, specifier)
      if (res === false) {
        // 忽略该import
        continue
      }
    }
    importsCode.push(`import "${source}"`)
  }

  return importsCode.concat(parseUniExtApiImports(code)).join('\n')
}

export function createResolveError(
  code: string,
  msg: string,
  start: Position,
  end: Position
) {
  return createRollupError(
    '',
    '',
    createCompilerError(
      0,
      {
        start,
        end,
      } as SourceLocation,
      { 0: msg },
      ''
    ),
    code
  )
}

// @ts-expect-error 暂时不用
function genImportsCode(code: string, imports: readonly ImportSpecifier[]) {
  const chars = code.split('')
  const keepChars: number[] = []
  imports.forEach(({ ss, se }) => {
    for (let i = ss; i <= se; i++) {
      keepChars.push(i)
    }
  })
  for (let i = 0; i < chars.length; i++) {
    if (!keepChars.includes(i)) {
      const char = chars[i]
      if (char !== '\r' && char !== '\n') {
        chars[i] = ' '
      }
    }
  }
  return chars.join('')
}

function parseUniExtApiImports(code: string): string[] {
  if (!process.env.UNI_UTS_PLATFORM) {
    return []
  }
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
      if (!space.provider && space.clientSecret) {
        space.provider = 'aliyun'
      }
      switch (space.provider) {
        case 'aliyun':
          return {
            provider: space.provider || 'aliyun',
            spaceName: space.name,
            spaceId: space.id,
            clientSecret: space.clientSecret,
            endpoint: space.apiEndpoint,
          }
        case 'alipay': {
          return {
            provider: space.provider,
            spaceName: space.name,
            spaceId: space.id,
            spaceAppId: space.spaceAppId,
            accessKey: space.accessKey,
            secretKey: space.secretKey,
          }
        }
        case 'tencent':
        default: {
          return {
            provider: space.provider,
            spaceName: space.name,
            spaceId: space.id,
          }
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
    console.error((e as Error).message)
    process.exit(1)
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

export const initAutoImportOnce = once(initAutoImport)

function initAutoImport(autoImportOptions?: AutoImportOptions) {
  const options = initAutoImportOptions(
    process.env.UNI_UTS_PLATFORM,
    autoImportOptions || {}
  )
  if ((options.imports as any[]).length === 0) {
    return {
      transform(code: string, id: string) {
        return { code }
      },
    }
  }
  const autoImport = AutoImport(options) as {
    transform(
      code: string,
      id: string
    ): Promise<{ code: string; map?: SourceMapInput }>
  }
  const { transform } = autoImport
  autoImport.transform = async function (code, id) {
    const result = await transform.call(this, code, id)
    if (result) {
      return result
    }
    return { code }
  }
  return autoImport
}

const autoImports: Record<string, [[string, string]]> = {}

export function getAutoImports() {
  return autoImports
}

export function addAutoImports(source: string, imports: [string, string]) {
  if (!autoImports[source]) {
    autoImports[source] = [imports]
  } else {
    if (!autoImports[source].find((item) => item[0] === imports[0])) {
      autoImports[source].push(imports)
    }
  }
}
