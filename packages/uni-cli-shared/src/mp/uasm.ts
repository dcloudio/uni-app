import fs from 'node:fs'
import { sync } from 'fast-glob'
import MagicString from 'magic-string'
import path from 'node:path'
import type { Plugin } from 'vite'
import {
  type UasmTransformOptions,
  type UasmWebLoadDescriptor,
  createLoadUasmTransformer,
  parseUasmModuleName,
} from '../uasm'
import type { UniViteCopyPluginTarget } from '../vite/plugins/copy'

export type UasmMiniProgramPlatform = 'mp-weixin' | 'mp-alipay'

const UASM_MARKER = '/* @uni-uasm-mini-program */'
const MODULE_INIT_RE = /\bvar\s+Module\s*=\s*moduleArg\s*;?/g
const MODULE_INIT_TEST_RE = /\bvar\s+Module\s*=\s*moduleArg\s*;?/
const IMPORT_META_URL_RE = /import\.meta\.url/g
const TOP_LEVEL_WEBASSEMBLY_BINDING_RE =
  /^\s*(?:const|let|var)\s+WebAssembly\s*=/
const TOP_LEVEL_WINDOW_BINDING_RE =
  /^\s*(?:const|let|var)\s+window\s*=\s*globalThis\b/
const LOCATE_FILE_RE = /\bModule\[['"]locateFile['"]\]\s*=/
const INSTANTIATE_WASM_RE = /\bModule\[['"]instantiateWasm['"]\]\s*=/
const RUNTIME_ERROR_INIT_RE = /\bWebAssembly\.RuntimeError\s*=/

export interface MiniProgramUasmTransformOptions {
  webAssemblyGlobal: string
  wasmFile: string
  generateMap?: boolean
}

export interface MiniProgramUasmTransformResult {
  code: string
  map?: ReturnType<MagicString['generateMap']>
}

const MINI_PROGRAM_UASM_CONFIG = {
  'mp-weixin': {
    webAssemblyGlobal: 'WXWebAssembly',
    entryPath: 'uasm/mp-weixin',
    transformPath: 'uasm/mp-weixin',
    wasmPath: 'uasm/mp-weixin',
    workerOutputPath: undefined,
  },
  'mp-alipay': {
    webAssemblyGlobal: 'MYWebAssembly',
    entryPath: 'uasm/mp-alipay',
    transformPath: 'workers/mp-alipay',
    wasmPath: 'uasm/mp-alipay',
    workerOutputPath: 'workers/mp-alipay',
  },
} as const

export function initUasmMiniProgramTransformOptions(
  platform: UasmMiniProgramPlatform,
  inputDir = process.env.UNI_INPUT_DIR
): UasmTransformOptions {
  return {
    resolve(modulePath) {
      return resolveUasmMiniProgramLoad(modulePath, platform, inputDir)
    },
    createLoadUasmTransformer(options) {
      return createLoadUasmTransformer({
        ...options,
        methodNames: ['loadUasm'],
        resolveError(modulePath) {
          const moduleName = parseUasmModuleName(modulePath)
          const config = MINI_PROGRAM_UASM_CONFIG[platform]
          const entry = moduleName
            ? `uni_modules/${moduleName}/${config.entryPath}/${moduleName}.js`
            : `uni_modules/<插件ID>/${config.entryPath}/<插件ID>.js`
          return `无法加载 uasm 插件[${modulePath}]，请确认插件路径正确，且插件已提供入口文件 ${entry}`
        },
      })
    },
  }
}

export function resolveUasmMiniProgramLoad(
  modulePath: string,
  platform: UasmMiniProgramPlatform,
  inputDir = process.env.UNI_INPUT_DIR
): UasmWebLoadDescriptor | undefined {
  const moduleName = parseUasmModuleName(modulePath)
  if (!moduleName) {
    return
  }
  const entry = path.posix.join(
    'uni_modules',
    moduleName,
    MINI_PROGRAM_UASM_CONFIG[platform].entryPath,
    `${moduleName}.js`
  )
  if (!fs.existsSync(path.resolve(inputDir, entry))) {
    return
  }
  return {
    id: moduleName,
    entry: `@/${entry}`,
    import: 'static',
  }
}

export function uniMiniProgramUasmPlugin(
  platform: UasmMiniProgramPlatform,
  inputDir = process.env.UNI_INPUT_DIR
): Plugin {
  const config = MINI_PROGRAM_UASM_CONFIG[platform]
  const entryRe = new RegExp(
    `/uni_modules/([^/]+)/${config.transformPath}/([^/]+)\\.js$`
  )
  return {
    name: 'uni:mini-program-uasm',
    enforce: 'pre',
    transform(source, id) {
      const filename = id.split('?', 1)[0]
      const normalized = filename.replaceAll(path.sep, '/')
      const match = normalized.match(entryRe)
      if (
        !match ||
        match[1] !== match[2] ||
        !MODULE_INIT_TEST_RE.test(source)
      ) {
        return
      }
      const moduleName = match[1]
      return transformMiniProgramUasmEntry(source, filename, moduleName, config)
    },
    generateBundle(_options, bundle) {
      const emittedFiles = new Set<string>()
      resolveMiniProgramUasmWorkerFiles(platform, inputDir).forEach(
        ({ filename, moduleName, relativePath, outputFile }) => {
          if (bundle[outputFile] || emittedFiles.has(outputFile)) {
            throw new Error(`UASM 小程序 Worker 产物冲突：${outputFile}`)
          }
          emittedFiles.add(outputFile)
          const source = fs.readFileSync(filename, 'utf8')
          const code =
            relativePath === `${moduleName}.js`
              ? transformMiniProgramUasmEntry(
                  source,
                  filename,
                  moduleName,
                  config
                ).code
              : source
          this.emitFile({ type: 'asset', fileName: outputFile, source: code })
        }
      )
    },
  }
}

export function resolveMiniProgramUasmWorkerPaths(
  platform: UasmMiniProgramPlatform,
  inputDir = process.env.UNI_INPUT_DIR
) {
  return resolveMiniProgramUasmWorkerFiles(platform, inputDir).map(
    ({ outputFile }) => outputFile
  )
}

export function createMiniProgramUasmCopyTarget(
  platform: keyof typeof MINI_PROGRAM_UASM_CONFIG
): UniViteCopyPluginTarget {
  return {
    src: [
      `uni_modules/*/uasm/${platform}/**/*.wasm`,
      `uni_modules/*/uasm/${platform}/**/*.wasm.br`,
    ],
    get dest() {
      return process.env.UNI_OUTPUT_DIR
    },
  }
}

function resolveMiniProgramUasmWorkerFiles(
  platform: UasmMiniProgramPlatform,
  inputDir: string | undefined
) {
  const config = MINI_PROGRAM_UASM_CONFIG[platform]
  if (!config.workerOutputPath || !inputDir) {
    return []
  }
  const workerEntryRe = new RegExp(
    `/uni_modules/([^/]+)/${config.transformPath}/(.+\\.js)$`
  )
  return sync(`uni_modules/*/${config.transformPath}/**/*.js`, {
    cwd: inputDir,
    absolute: true,
  }).flatMap((filename) => {
    const normalized = filename.replaceAll(path.sep, '/')
    const match = normalized.match(workerEntryRe)
    if (
      !match ||
      !resolveUasmMiniProgramLoad(`uni_modules/${match[1]}`, platform, inputDir)
    ) {
      return []
    }
    const relativePath = match[2]
    return [
      {
        filename,
        moduleName: match[1],
        relativePath,
        outputFile: path.posix.join(config.workerOutputPath!, relativePath),
      },
    ]
  })
}

function resolveMiniProgramUasmWasmFile(
  filename: string,
  moduleName: string,
  config: (typeof MINI_PROGRAM_UASM_CONFIG)[UasmMiniProgramPlatform]
) {
  const moduleDir = path.resolve(path.dirname(filename), '../..')
  const wasmFile = [`${moduleName}.wasm`, `${moduleName}.wasm.br`].find(
    (file) => fs.existsSync(path.resolve(moduleDir, config.wasmPath, file))
  )
  if (!wasmFile) {
    throw new Error(`UASM 小程序 JS[${filename}] 未找到对应的 WASM 文件`)
  }
  return wasmFile
}

function transformMiniProgramUasmEntry(
  source: string,
  filename: string,
  moduleName: string,
  config: (typeof MINI_PROGRAM_UASM_CONFIG)[UasmMiniProgramPlatform]
) {
  const wasmFile = resolveMiniProgramUasmWasmFile(filename, moduleName, config)
  return transformMiniProgramUasmJs(source, {
    webAssemblyGlobal: config.webAssemblyGlobal,
    // 静态导入后入口 JS 会被合并进业务代码，WASM 必须使用代码包内路径。
    wasmFile: path.posix.join(
      'uni_modules',
      moduleName,
      config.wasmPath,
      wasmFile
    ),
  })
}

export function transformMiniProgramUasmJs(
  source: string,
  options: MiniProgramUasmTransformOptions
): MiniProgramUasmTransformResult {
  if (source.includes(UASM_MARKER)) {
    return { code: source }
  }

  const moduleMatches = Array.from(source.matchAll(MODULE_INIT_RE))
  if (moduleMatches.length !== 1) {
    throw new Error(
      `UASM 小程序 JS 的 Module 初始化位置必须唯一，实际找到 ${moduleMatches.length} 处`
    )
  }

  const match = moduleMatches[0]
  const moduleStart = match.index!
  const moduleEnd = moduleStart + match[0].length
  const magicString = new MagicString(source)

  for (const importMetaMatch of source.matchAll(IMPORT_META_URL_RE)) {
    const start = importMetaMatch.index!
    magicString.overwrite(start, start + importMetaMatch[0].length, "''")
  }

  magicString.prepend(
    `${createRuntimePrelude(source, options.webAssemblyGlobal)}\n`
  )
  const moduleInit = createModuleInit(source, options.wasmFile)
  if (moduleInit) {
    magicString.appendLeft(moduleEnd, moduleInit)
  }

  return {
    code: magicString.toString(),
    map:
      options.generateMap === false
        ? undefined
        : magicString.generateMap({ hires: true }),
  }
}

function createRuntimePrelude(source: string, webAssemblyGlobal: string) {
  const prelude = [UASM_MARKER]
  if (!TOP_LEVEL_WINDOW_BINDING_RE.test(source)) {
    prelude.push('const window = globalThis;')
  }
  if (!TOP_LEVEL_WEBASSEMBLY_BINDING_RE.test(source)) {
    prelude.push(`const WebAssembly = ${webAssemblyGlobal};`)
  }
  if (!RUNTIME_ERROR_INIT_RE.test(source)) {
    prelude.push(
      `if (!WebAssembly.RuntimeError) {
  class RuntimeError extends Error {}
  WebAssembly.RuntimeError = RuntimeError;
}`
    )
  }
  return prelude.join('\n')
}

function createModuleInit(source: string, wasmFile: string) {
  const moduleInit: string[] = []
  if (!LOCATE_FILE_RE.test(source)) {
    moduleInit.push(
      'Module["locateFile"] = function(filename) { return filename; };'
    )
  }
  if (!INSTANTIATE_WASM_RE.test(source)) {
    moduleInit.push(`Module["instantiateWasm"] = function(imports, successCallback) {
  WebAssembly.instantiate(${JSON.stringify(wasmFile)}, imports).then(result => {
    successCallback(result.instance);
  });
  return {};
};`)
  }
  return moduleInit.length ? `\n${moduleInit.join('\n')}` : ''
}
