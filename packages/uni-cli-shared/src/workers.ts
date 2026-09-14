import type { Plugin, ViteDevServer } from 'vite'
import type {
  DiagnosticWithLocation,
  Node,
  SourceFile,
  TransformationContext,
  TransformerFactory,
  VisitResult,
} from 'typescript'
import type {
  SyncUniModulesFilePreprocessor,
  UniXCompiler,
} from '@dcloudio/uni-uts-v1'
import path from 'path'
import fs from 'fs-extra'
import debug from 'debug'
import { sync } from 'fast-glob'
import { normalizePath } from './utils'
import { parseManifestJsonOnce } from './json'
import { resolveUTSCompiler, tscOutDir } from './uts'
import {
  createAppAndroidUniModulesSyncFilePreprocessorOnce,
  createAppHarmonyUniModulesSyncFilePreprocessorOnce,
  createAppIosUniModulesSyncFilePreprocessorOnce,
} from './vite/plugins/uts/uni_modules'
import { resolveBuiltIn } from './resolve'
import { initSourceFileCallback, initUts2jsSharedDataOptions } from './dom2'
import { initUasmTransformerCreator } from './uasm'

const debugWorkers = debug('uni:workers')

type TypeScriptCompiler = typeof import('typescript')

export interface WorkerSourceEdit {
  start: number
  end: number
  content: string
}

export interface WorkerTransformOptions {
  extname?: string
  rewriteRootDir?: string
  resolve(): Record<string, string>
}

export interface WorkerTransformerOptions extends WorkerTransformOptions {
  typescript: TypeScriptCompiler
  platform?: 'app-android' | 'app-ios' | 'app-harmony' | 'mp-weixin' | 'web'
  dom2?: boolean
  targetLanguage?: 'Kotlin' | 'Swift' | 'JavaScript' | 'ArkTS'
  onSourceEdit?: (edit: WorkerSourceEdit) => void
  reportDiagnostic(
    context: TransformationContext,
    diagnostic: DiagnosticWithLocation
  ): void
}

export interface WorkerTransformPluginOptions extends WorkerTransformOptions {
  createWorkerTransformer: typeof createWorkerTransformer
}

let workersRootDir: string | null = null
let workersRootDirs: string[] = []
let workers: Record<string, string> = {}
export function getWorkers() {
  return workers
}

function createWorkerDiagnostic(
  options: WorkerTransformerOptions,
  sourceFile: SourceFile,
  node: Node,
  messageText: string
): DiagnosticWithLocation {
  return {
    file: sourceFile,
    start: node.getStart(sourceFile),
    length: node.getWidth(sourceFile),
    code: 0,
    category: options.typescript.DiagnosticCategory.Error,
    messageText,
  }
}

/** 将标准 JS/TS 中的 uni.createWorker 路径转换为编译后的 worker 路径。 */
export function createWorkerTransformer(
  options: WorkerTransformerOptions
): TransformerFactory<SourceFile> {
  const { typescript, reportDiagnostic } = options
  return (context) => {
    const { factory } = context
    const workerMap = options.resolve()
    const autoImports = new Map<
      string,
      import('typescript').ImportDeclaration
    >()
    return (sourceFile) => {
      const visitor = (node: Node): VisitResult<Node> => {
        if (
          typescript.isCallExpression(node) &&
          node.arguments.length >= 1 &&
          typescript.isPropertyAccessExpression(node.expression) &&
          node.expression.name.text === 'createWorker' &&
          typescript.isIdentifier(node.expression.expression) &&
          node.expression.expression.escapedText === 'uni'
        ) {
          if (
            options.targetLanguage === 'JavaScript' &&
            (options.platform === 'app-ios' ||
              (options.platform === 'app-android' && options.dom2))
          ) {
            reportDiagnostic(
              context,
              createWorkerDiagnostic(
                options,
                sourceFile,
                node,
                '当前平台 uvue 页面中暂不支持使用 uni.createWorker 创建 worker，目前仅 uts 插件中支持'
              )
            )
          }
          const firstArg = node.arguments[0]
          if (
            !typescript.isStringLiteral(firstArg) &&
            !typescript.isNoSubstitutionTemplateLiteral(firstArg)
          ) {
            reportDiagnostic(
              context,
              createWorkerDiagnostic(
                options,
                sourceFile,
                firstArg,
                'uni.createWorker(workerPath) 的 workerPath 参数必须是字符串字面量'
              )
            )
          } else {
            let workerPath = firstArg.text
            if (workerPath.startsWith('/')) {
              workerPath = workerPath.slice(1)
            }
            if (
              workerPath &&
              workerMap[workerPath] &&
              (options.targetLanguage === 'Kotlin' ||
                options.targetLanguage === 'Swift')
            ) {
              const workerIdent = factory.createIdentifier(
                workerMap[workerPath]
              )
              if (!autoImports.has(workerPath)) {
                autoImports.set(
                  workerPath,
                  factory.createImportDeclaration(
                    undefined,
                    factory.createImportClause(
                      false,
                      undefined,
                      factory.createNamedImports([
                        factory.createImportSpecifier(
                          false,
                          undefined,
                          workerIdent
                        ),
                      ])
                    ),
                    factory.createStringLiteral(`@/${workerPath}`),
                    undefined
                  )
                )
              }
              return factory.updateCallExpression(
                node,
                node.expression,
                node.typeArguments,
                [
                  factory.createArrowFunction(
                    undefined,
                    undefined,
                    [],
                    factory.createTypeReferenceNode(
                      factory.createIdentifier('WorkerTaskImpl'),
                      undefined
                    ),
                    factory.createToken(
                      typescript.SyntaxKind.EqualsGreaterThanToken
                    ),
                    factory.createNewExpression(workerIdent, undefined, [])
                  ),
                  ...node.arguments.slice(1),
                ]
              )
            }
            if (workerPath && workerMap[workerPath] && options.extname) {
              let outputPath = workerPath.replace('.uts', options.extname)
              if (
                options.rewriteRootDir &&
                outputPath.includes('uni_modules/')
              ) {
                outputPath = `/${options.rewriteRootDir}/${outputPath}`
              }
              options.onSourceEdit?.({
                start: firstArg.getStart(sourceFile),
                end: firstArg.getEnd(),
                content: JSON.stringify(outputPath),
              })
              return factory.updateCallExpression(
                node,
                node.expression,
                node.typeArguments,
                [
                  factory.createStringLiteral(outputPath),
                  ...node.arguments.slice(1),
                ]
              )
            } else if (workerPath && !workerMap[workerPath]) {
              reportDiagnostic(
                context,
                createWorkerDiagnostic(
                  options,
                  sourceFile,
                  firstArg,
                  `Worker[${workerPath}]路径不存在或未正确实现`
                )
              )
            }
          }
        }
        return typescript.visitEachChild(node, visitor, context)
      }
      const transformed = typescript.visitNode(
        sourceFile,
        visitor
      ) as SourceFile
      if (!autoImports.size) {
        return transformed
      }
      return factory.updateSourceFile(
        transformed,
        [...autoImports.values(), ...transformed.statements],
        transformed.isDeclarationFile,
        transformed.referencedFiles,
        transformed.typeReferenceDirectives,
        transformed.hasNoDefaultLib,
        transformed.libReferenceDirectives
      )
    }
  }
}

export function resolveWorkersRootDir() {
  // 默认是 workers
  return workersRootDir || 'workers'
}

export function getWorkersRootDirs() {
  return workersRootDirs
}

export function initWorkerTransformOptions(): WorkerTransformPluginOptions {
  return {
    extname: '.js',
    rewriteRootDir: resolveWorkersRootDir(),
    resolve: () => getWorkers(),
    createWorkerTransformer,
  }
}

/**
 * 遍历目录下的所有uts文件，读取文件内容，正则匹配出定义的worker，返回文件名和类名的映射关系
 * export class MyWorkerTask extends WorkerTaskImpl {}
 * @param dir
 */
export function initWorkers(workersDirs: string[], rootDir: string) {
  workers = {}
  for (const workersDir of workersDirs) {
    const dir = path.join(rootDir, workersDir)
    if (!fs.existsSync(dir)) {
      continue
    }
    sync('**/*.uts', { cwd: dir }).forEach((file) => {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8')
      const match = content.match(/class\s+(.*)\s+extends\s+WorkerTaskImpl/)
      if (match && match[1]) {
        const key = normalizePath(path.join(workersDir, file))
        workers[key] = match[1]
      }
    })
  }
  debugWorkers('workers', workers)
  return workers
}

export function uniWorkersPlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const platform = process.env.UNI_UTS_PLATFORM
  const resolveWorkers = () => getWorkers()
  function refreshWorkers() {
    workersRootDirs = resolveWorkersDir(inputDir)
    initWorkers(workersRootDirs, inputDir)
    return Object.keys(getWorkers()).length > 0
  }
  refreshWorkers()
  const preprocessor =
    platform === 'app-android'
      ? createAppAndroidUniModulesSyncFilePreprocessorOnce(false)
      : platform === 'app-ios'
      ? createAppIosUniModulesSyncFilePreprocessorOnce(false)
      : platform === 'app-harmony'
      ? createAppHarmonyUniModulesSyncFilePreprocessorOnce(false)
      : null
  const cache: Record<string, number> = {}

  const uniXKotlinCompiler =
    platform === 'app-android'
      ? resolveUTSCompiler().createUniXKotlinCompilerOnce({
          resolveWorkers,
          createWorkerTransformer,
          loadUasmTransformer: initUasmTransformerCreator('app-android'),
          sharedData: initUts2jsSharedDataOptions(),
          sourceFileCallback: initSourceFileCallback(),
        })
      : null

  const uniXSwiftCompiler =
    platform === 'app-ios'
      ? resolveUTSCompiler().createUniXSwiftCompilerOnce({
          resolveWorkers,
          createWorkerTransformer,
          loadUasmTransformer: initUasmTransformerCreator('app-ios'),
          sharedData: initUts2jsSharedDataOptions(),
        })
      : null

  const uniXArkTSCompiler =
    platform === 'app-harmony'
      ? resolveUTSCompiler().createUniXArkTSCompilerOnce({
          resolveWorkers,
          createWorkerTransformer,
          sharedData: initUts2jsSharedDataOptions(),
        })
      : null

  return {
    name: 'uni-workers',
    enforce: 'pre',
    async buildStart() {
      if (refreshWorkers()) {
        if (preprocessor) {
          await syncWorkersFiles(platform, inputDir, preprocessor, cache)
        }
      }
      // 需要等待 workers 文件同步完之后，添加到 rootFiles 中，触发 tsc 的编译
      if (uniXKotlinCompiler) {
        await initUniXCompilerRootWorkers(
          tscOutDir('app-android'),
          uniXKotlinCompiler
        )
      }
      if (uniXSwiftCompiler) {
        await initUniXCompilerRootWorkers(
          tscOutDir('app-ios'),
          uniXSwiftCompiler
        )
      }
      if (uniXArkTSCompiler) {
        await initUniXCompilerRootWorkers(
          tscOutDir('app-harmony'),
          uniXArkTSCompiler
        )
      }
    },
  }
}

async function syncWorkersFiles(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  inputDir: string,
  preprocessor: SyncUniModulesFilePreprocessor,
  cache?: Record<string, number>
) {
  if (
    platform !== 'app-harmony' &&
    platform !== 'app-android' &&
    platform !== 'app-ios'
  ) {
    return
  }
  const workersDirs = resolveWorkersDir(inputDir)
  if (workersDirs.length) {
    const { syncUTSFiles } = resolveUTSCompiler()
    for (const workersDir of workersDirs) {
      await syncUTSFiles(
        normalizePath(path.join(workersDir, '**/*.uts')),
        inputDir,
        tscOutDir(platform as 'app-android' | 'app-ios' | 'app-harmony'),
        true,
        preprocessor,
        cache
      )
    }
  }
}

export function resolveWorkersDir(inputDir: string): Array<string> {
  const workersDirs: string[] = []
  const manifestJson = parseManifestJsonOnce(inputDir)
  if (manifestJson.workers) {
    let workersDir: string | undefined =
      typeof manifestJson.workers === 'string'
        ? manifestJson.workers
        : manifestJson.workers.path
    if (workersDir) {
      workersDir = normalizePath(workersDir)
      const dir = path.join(inputDir, workersDir)
      if (fs.existsSync(dir)) {
        workersRootDir = workersDir
        workersDirs.push(workersDir)
      }
    }
  }
  // 遍历uni_modules插件目录是否有workers目录
  const uniModulesDir = path.join(inputDir, 'uni_modules')
  if (fs.existsSync(uniModulesDir)) {
    fs.readdirSync(uniModulesDir).forEach((dir) => {
      if (fs.existsSync(path.join(uniModulesDir, dir, 'workers'))) {
        workersDirs.push('uni_modules/' + dir + '/workers')
      }
    })
  }
  debugWorkers('workersDirs', workersDirs)
  return workersDirs
}

export function normalizeJavaScriptWorkerSource(content: string) {
  const code = content
    // 移除 export，worker 入口按普通脚本加载，不需要导出任务类。
    .replace(
      /export\s+class\s+(.*)\s+extends\s+WorkerTaskImpl\s*{/,
      'class $1 extends WorkerTaskImpl {'
    )
  // 保持模块语义，避免 uts2js 同时登记 .uts/.ts 快照时把任务类放到全局作用域导致重复声明。
  return /(^|\n)\s*(import|export)\s/m.test(code) ? code : `${code}\nexport {}`
}

export function genAlipayWorkerRuntimeImportCode(
  file: string,
  workerRootDir: string = resolveWorkersRootDir()
) {
  let workerRuntimePath = normalizePath(
    path.relative(path.dirname(file), path.join(workerRootDir, 'uni-worker.js'))
  )
  if (!workerRuntimePath.startsWith('.')) {
    workerRuntimePath = './' + workerRuntimePath
  }
  return `import '${workerRuntimePath}';`
}

export function resolveMiniProgramWorkerPaths(
  workerRootDir: string = resolveWorkersRootDir()
) {
  return Object.keys(getWorkers()).map((key) => {
    if (key.startsWith('uni_modules')) {
      key = workerRootDir + '/' + key
    }
    return key.replace(/\.uts$/, '.js')
  })
}

export function uniJavaScriptWorkersPlugin(): Plugin {
  // 仅小程序平台外置 uni-worker，支付宝小程序 worker 不支持 require，单独使用 ES module 版本。
  const platform = process.env.UNI_UTS_PLATFORM || ''
  const external = platform.startsWith('mp-')
  const isMpAlipay = platform === 'mp-alipay'
  let workerPolyfillCode = ''
  let isWrite = false
  const UniAppWorkerJSName = external ? 'uni-worker.mp.js' : 'uni-worker.web.js'
  const workerRuntimeFileName = isMpAlipay
    ? 'uni-worker.alipay.js'
    : UniAppWorkerJSName
  let viteServer: ViteDevServer | null = null
  const workersRootPaths: string[] = []
  const workerPolyfillPath = `@dcloudio/uni-app/dist-x/${workerRuntimeFileName}`
  const workerPolyfillAbsPath = normalizePath(
    resolveBuiltIn(workerPolyfillPath)
  )
  function isWorkerFile(id: string) {
    if (workersRootPaths.length) {
      return workersRootPaths.some((dir) => id.startsWith(dir))
    }
    return false
  }
  function parseWorkerEntryFile(workerJsPath: string) {
    const workerPath = workerJsPath.slice(1).replace('.js', '.uts')
    if (workerPath in workers) {
      return normalizePath(path.resolve(process.env.UNI_INPUT_DIR, workerPath))
    }
  }
  function parseWorkerClass(id: string) {
    const filename = id.split('?')[0]
    if (isWorkerFile(filename)) {
      const workerPath = normalizePath(
        path.relative(process.env.UNI_INPUT_DIR, filename)
      )
      return workers[workerPath] || ''
    }
    return false
  }
  return {
    name: 'uni:javascript-workers',
    configureServer(server) {
      viteServer = server
    },
    buildStart() {
      if (!workerPolyfillCode && Object.keys(getWorkers()).length) {
        workerPolyfillCode = fs.readFileSync(workerPolyfillAbsPath, 'utf-8')
      }
      workersRootPaths.length = 0
      for (const workersRootDir of getWorkersRootDirs()) {
        workersRootPaths.push(
          normalizePath(
            path.resolve(process.env.UNI_INPUT_DIR!, workersRootDir)
          )
        )
      }
    },
    resolveId(id) {
      // uni.createWorker('workers/request/index.uts')
      // 编译阶段调整为 uni.createWorker('workers/request/index.js')，确保开发和运行时都是用.js后缀加载
      // 不调整成js后缀或.uts?import这些格式， vite 是不会走transform逻辑的，而是直接读取文件内容
      if (viteServer) {
        const workerEntryFile = parseWorkerEntryFile(id)
        if (workerEntryFile) {
          return workerEntryFile
        }
        if (id === workerPolyfillPath) {
          return workerPolyfillAbsPath
        }
      }
    },
    load(id) {
      const filename = id.split('?')[0]
      const workerClass = parseWorkerClass(filename)
      if (workerClass === false) {
        return
      }
      if (fs.existsSync(filename)) {
        let code =
          (viteServer ? `import '${workerPolyfillPath}';` : '') +
          normalizeJavaScriptWorkerSource(fs.readFileSync(filename, 'utf-8'))
        // 如果是入口文件，需要追加初始化代码
        if (workerClass) {
          code += `\n;new ${workerClass}().entry()`
        }
        return code
      }
    },
    generateBundle(_, bundle) {
      const workerPaths = resolveMiniProgramWorkerPaths()
      if (workerPaths.length) {
        Object.keys(bundle).forEach((file) => {
          if (workerPaths.includes(file)) {
            const chunk = bundle[file]
            if (chunk.type === 'chunk') {
              const workerCode = external
                ? isMpAlipay
                  ? genAlipayWorkerRuntimeImportCode(file)
                  : `require('${normalizePath(
                      path.relative(
                        path.dirname(file),
                        path.join(resolveWorkersRootDir(), 'uni-worker.js')
                      )
                    )}')`
                : workerPolyfillCode
              chunk.code = `${workerCode}\n${chunk.code}`
            }
          }
        })
      }
    },
    writeBundle() {
      if (external && Object.keys(getWorkers()).length && !isWrite) {
        isWrite = true
        // 写入uni-worker.js
        fs.outputFileSync(
          path.resolve(
            process.env.UNI_OUTPUT_DIR!,
            resolveWorkersRootDir(),
            'uni-worker.js'
          ),
          workerPolyfillCode
        )
      }
    },
  }
}

export async function initUniXCompilerRootWorkers(
  rootDir: string,
  compiler: UniXCompiler
) {
  const workers = getWorkers()
  if (Object.keys(workers).length) {
    for (const key in workers) {
      const file = path.join(rootDir, key + '.ts')
      if (fs.existsSync(file)) {
        if (!compiler.hasRootFile(file)) {
          await compiler.addRootFile(file)
        }
      }
    }
  }
}
