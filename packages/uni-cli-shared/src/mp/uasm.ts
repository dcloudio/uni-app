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
  let workerFiles: ReturnType<typeof resolveMiniProgramUasmWorkerFiles> = []
  return {
    name: 'uni:mini-program-uasm',
    enforce: 'pre',
    buildStart() {
      workerFiles = resolveMiniProgramUasmWorkerFiles(platform, inputDir)
      for (const {
        filename,
        moduleName,
        relativePath,
        wasmDir,
      } of workerFiles) {
        this.addWatchFile(filename)
        if (relativePath === `${moduleName}.js`) {
          // 监听依赖目录，缺失的 WASM 通过写入或重命名恢复后都能重建。
          this.addWatchFile(wasmDir)
        }
      }
    },
    transform(source, id) {
      const filename = id.split('?', 1)[0]
      if (
        filename.endsWith('.js') &&
        filename.includes('uni_modules') &&
        MODULE_INIT_TEST_RE.test(source)
      ) {
        return transformMiniProgramUasmEntry(source, filename, platform)
      }
    },
    generateBundle(_options, bundle) {
      const emittedFiles = new Set<string>()
      workerFiles.forEach(
        ({ filename, moduleName, relativePath, outputFile }) => {
          if (bundle[outputFile] || emittedFiles.has(outputFile)) {
            throw new Error(`UASM 小程序 Worker 产物冲突：${outputFile}`)
          }
          emittedFiles.add(outputFile)
          const source = fs.readFileSync(filename, 'utf8')
          const code =
            relativePath === `${moduleName}.js`
              ? transformMiniProgramUasmEntry(source, filename, platform)!.code
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
  const config = MINI_PROGRAM_UASM_CONFIG[platform]
  return {
    src: [
      `uni_modules/*/uasm/${platform}/**/*.wasm`,
      `uni_modules/*/uasm/${platform}/**/*.wasm.br`,
      // 非 JS 资源直接复制，避免为代码转换额外读取 WASM 等二进制文件。
      ...(config.workerOutputPath
        ? [`uni_modules/*/uasm/${platform}/workers/**/!(*.js)`]
        : []),
    ],
    get dest() {
      return process.env.UNI_OUTPUT_DIR
    },
  }
}

function resolveMiniProgramUasmConfig(
  moduleDir: string,
  platform: UasmMiniProgramPlatform
) {
  const config = MINI_PROGRAM_UASM_CONFIG[platform]
  const workerDir = `${config.entryPath}/workers`
  // 按插件选择目录；新目录即使为空，也不回退到旧目录。
  if (
    config.workerOutputPath &&
    fs
      .statSync(path.join(moduleDir, workerDir), { throwIfNoEntry: false })
      ?.isDirectory()
  ) {
    return {
      ...config,
      transformPath: workerDir,
      wasmPath: workerDir,
      workerOutputPath: path.posix.join(
        'uni_modules',
        path.basename(moduleDir),
        workerDir
      ),
    }
  }
  return config
}

function resolveMiniProgramUasmWorkerFiles(
  platform: UasmMiniProgramPlatform,
  inputDir: string | undefined
) {
  if (!MINI_PROGRAM_UASM_CONFIG[platform].workerOutputPath || !inputDir) {
    return []
  }
  return sync(`uni_modules/*/uasm/${platform}`, {
    cwd: inputDir,
    onlyDirectories: true,
  }).flatMap((platformPath) => {
    const modulePath = platformPath.split('/').slice(0, 2).join('/')
    if (!resolveUasmMiniProgramLoad(modulePath, platform, inputDir)) {
      return []
    }
    const moduleDir = path.resolve(inputDir, modulePath)
    const config = resolveMiniProgramUasmConfig(moduleDir, platform)
    const workerDir = path.join(moduleDir, config.transformPath)
    return sync('**/*.js', { cwd: workerDir }).map((relativePath) => ({
      filename: path.join(workerDir, relativePath),
      moduleName: path.basename(moduleDir),
      relativePath,
      outputFile: path.posix.join(config.workerOutputPath!, relativePath),
      wasmDir: path.join(moduleDir, config.wasmPath),
    }))
  })
}

function resolveMiniProgramUasmWasmFile(
  filename: string,
  moduleName: string,
  wasmDir: string
) {
  const wasmFile = [`${moduleName}.wasm`, `${moduleName}.wasm.br`].find(
    (file) => fs.existsSync(path.resolve(wasmDir, file))
  )
  if (!wasmFile) {
    throw new Error(`UASM 小程序 JS[${filename}] 未找到对应的 WASM 文件`)
  }
  return wasmFile
}

function transformMiniProgramUasmEntry(
  source: string,
  filename: string,
  platform: UasmMiniProgramPlatform
) {
  const match = filename
    .replaceAll(path.sep, '/')
    .match(/^(.*\/uni_modules\/([^/]+))\/(.+)\/([^/]+)\.js$/)
  if (!match || match[2] !== match[4]) {
    return
  }
  const [, moduleDir, moduleName, entryDir] = match
  const config = resolveMiniProgramUasmConfig(moduleDir, platform)
  if (entryDir !== config.transformPath) {
    return
  }
  const wasmFile = resolveMiniProgramUasmWasmFile(
    filename,
    moduleName,
    path.join(moduleDir, config.wasmPath)
  )
  return transformMiniProgramUasmJs(source, {
    webAssemblyGlobal: config.webAssemblyGlobal,
    // 小程序 WASM API 使用代码包内路径，不依赖 JS 的输出位置。
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
