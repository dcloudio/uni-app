import fs from 'fs'
import path from 'path'
import { type ImportSpecifier, init, parse } from 'es-module-lexer'
import {
  createResolveErrorMsg,
  createRollupError,
  getUTSEasyComAutoImports,
  normalizeNodeModules,
  offsetToStartAndEnd,
  parseUniExtApiNamespacesJsOnce,
} from '@dcloudio/uni-cli-shared'
import { isArray, isPlainObject, isString } from '@vue/shared'

import { type Import, createUnimport } from 'unimport'

import type { /*SourceMapInput, */ PluginContext } from 'rollup'
import type { Position, SourceLocation } from '@vue/compiler-core'

import { createCompilerError } from './uvue/compiler/errors'

export const UVUE_CLASS_NAME_PREFIX = 'Gen'

export const DEFAULT_APPID = '__UNI__uniappx'

export const ENTRY_FILENAME = () =>
  process.env.UNI_APP_X_TSC === 'true' ? 'main.uts.ts' : 'main.uts'

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
  let res: ReturnType<typeof parse> = [[], [], false, false]
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

export function tscOutDir() {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.tsc')
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

export function parseUTSRelativeFilename(filename: string, root?: string) {
  if (!path.isAbsolute(filename)) {
    return filename
  }
  return normalizeNodeModules(
    path.relative(root ?? process.env.UNI_INPUT_DIR, filename)
  )
}

export function parseUTSImportFilename(filename: string) {
  if (!path.isAbsolute(filename)) {
    return filename
  }
  return (
    '@/' +
    normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, filename))
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
        case 'dcloud':
          return {
            provider: space.provider || 'aliyun',
            spaceName: space.name,
            spaceId: space.id,
            clientSecret: space.clientSecret,
            endpoint: space.apiEndpoint,
            workspaceFolder: space.workspaceFolder,
          }
        case 'alipay': {
          return {
            provider: space.provider,
            spaceName: space.name,
            spaceId: space.id,
            spaceAppId: space.spaceAppId,
            accessKey: space.accessKey,
            secretKey: space.secretKey,
            workspaceFolder: space.workspaceFolder,
          }
        }
        case 'tencent':
        default: {
          return {
            provider: space.provider,
            spaceName: space.name,
            spaceId: space.id,
            workspaceFolder: space.workspaceFolder,
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
      ['aliyun', 'tcb', 'alipay', 'dcloud'].find((item) =>
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

export async function transformAutoImport(
  code: string,
  id: string,
  ignore: string[] = []
) {
  const { matchedImports } = await detectAutoImports(code, id, ignore)
  if (matchedImports.length) {
    return {
      code: code + '\n' + genAutoImportsCode(matchedImports),
    }
  }
  return { code }
}

export function genAutoImportsCode(imports: Import[]) {
  const codes: string[] = []
  imports.forEach(({ name, as, from }) => {
    if (as && name !== as) {
      codes.push(
        `import { ${name} as ${as} } from "${parseUTSImportFilename(from)}"`
      )
    } else {
      codes.push(`import { ${name}  } from "${parseUTSImportFilename(from)}"`)
    }
  })
  return codes.join('\n')
}

let detectImports: DetectImports

export function transformUniCloudMixinDataCom(code: string) {
  // 将 uniCloud.mixinDatacom 替换为 uniCloudMixinDatacom
  // 然后 autoImport 会自动导入 uniCloudMixinDatacom
  if (code.includes('uniCloud.mixinDatacom')) {
    return code.replace(/uniCloud\.mixinDatacom/g, 'uniCloudMixinDatacom')
  }
  return code
}

export function detectAutoImports(
  code: string,
  id: string,
  ignore: string[] = []
) {
  // 目前硬编码
  if (id.includes('index.module.uts')) {
    return { matchedImports: [] }
  }
  if (!detectImports) {
    detectImports = initAutoImport().detectImports
  } else {
    const autoImports = getUTSEasyComAutoImports()
    const sources = Object.keys(autoImports)
    if (detectImports.key !== sources.sort().join(',')) {
      detectImports = initAutoImport().detectImports
    }
  }

  return detectImports(code, id, ignore)
}

type DetectImports = {
  key: string
  (code: string, id: string, ignore: string[]): Promise<{
    matchedImports: Import[]
  }>
}

function initAutoImport(): {
  detectImports: DetectImports
} {
  const autoImports = getUTSEasyComAutoImports()
  const sources = Object.keys(autoImports)
  if (!sources.length) {
    const detectImports = async (
      _code: string,
      _id: string,
      _ignore: string[] = []
    ) => {
      return { matchedImports: [] }
    }
    detectImports.key = 'default'
    return {
      detectImports,
    }
  }

  const imports: Import[] = []
  sources.forEach((source) => {
    autoImports[source].forEach(([name, as]) => {
      imports.push({
        name,
        as,
        from: source,
      })
    })
  })
  const { detectImports: uniDetectImports } = createUnimport({
    imports,
  })
  const detectImports = async function (
    code: string,
    id: string,
    ignore: string[] = []
  ) {
    // const start = Date.now()
    const result = await uniDetectImports(code)
    // console.log('detectImports[' + id + ']耗时:' + (Date.now() - start))
    return {
      matchedImports: result.matchedImports.filter((item) => {
        if (item.as && item.name !== item.as) {
          return !ignore.includes(item.as)
        }
        return !ignore.includes(item.name)
      }),
    }
  }
  detectImports.key = sources.sort().join(',')
  return {
    detectImports,
  }
}
