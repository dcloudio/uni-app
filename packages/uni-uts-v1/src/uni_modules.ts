import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { type UniXCompiler, createUniXCompiler } from './tsc/compiler'
import type { CompilerOptions } from 'typescript'
import { isInHBuilderX, normalizePath, once } from './shared'
import { resolveCustomElements } from './utils'
import { camelize, capitalize } from '@vue/shared'

type TargetLanguage = Parameters<typeof createUniXCompiler>[1]

function createUniXTargetLanguageCompiler(
  platform: 'app-android' | 'app-ios' | 'app-harmony',
  language: TargetLanguage
) {
  const tscInputDir = path.join(process.env.UNI_APP_X_TSC_DIR, platform)
  return createUniXCompiler(
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
    language,
    {
      inputDir: tscInputDir,
      cacheDir: path.resolve(process.env.UNI_APP_X_TSC_CACHE_DIR, platform),
      outputDir: path.join(process.env.UNI_APP_X_UVUE_DIR, platform),
      paths: resolveUniXCompilerUniModulesPaths(
        platform,
        process.env.UNI_INPUT_DIR,
        tscInputDir
      ),
      normalizeFileName: normalizeNodeModules,
    }
  )
}

export function createUniXArkTSCompiler() {
  return createUniXTargetLanguageCompiler('app-harmony', 'ArkTS')
}

export const createUniXArkTSCompilerOnce = once(createUniXArkTSCompiler)

export function createUniXKotlinCompiler() {
  return createUniXTargetLanguageCompiler('app-android', 'Kotlin')
}
export const createUniXKotlinCompilerOnce = once(createUniXKotlinCompiler)

export function createUniXSwiftCompiler() {
  return createUniXTargetLanguageCompiler('app-ios', 'Swift')
}

export const createUniXSwiftCompilerOnce = once(createUniXSwiftCompiler)

function resolveUniXCompilerUniModulesPaths(
  platform: 'app-android' | 'app-ios' | 'app-harmony',
  inputDir: string,
  tscInputDir: string
) {
  const paths: CompilerOptions['paths'] = {}
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  if (fs.existsSync(uniModulesDir)) {
    fs.readdirSync(uniModulesDir).forEach((dir) => {
      const pluginPath = `@/uni_modules/${dir}`
      const pluginDir = path.resolve(uniModulesDir, dir)
      const utssdkDir = path.resolve(pluginDir, 'utssdk')
      const tscUtsSdkDir = path.resolve(
        tscInputDir,
        'uni_modules',
        dir,
        'utssdk'
      )
      // utssdk 插件
      if (fs.existsSync(utssdkDir)) {
        // 加密插件
        if (fs.existsSync(path.resolve(pluginDir, 'encrypt'))) {
          if (fs.existsSync(path.resolve(utssdkDir, 'interface.uts'))) {
            paths[pluginPath] = [path.resolve(tscUtsSdkDir, 'interface.uts.ts')]
          }
        } else {
          // 非加密插件
          // utssdk/app-android/index.uts
          if (fs.existsSync(path.resolve(utssdkDir, platform, 'index.uts'))) {
            paths[pluginPath] = [
              path.resolve(tscUtsSdkDir, platform, 'index.uts.ts'),
            ]
            // utssdk/index.uts
          } else if (fs.existsSync(path.resolve(utssdkDir, 'index.uts'))) {
            paths[pluginPath] = [path.resolve(tscUtsSdkDir, 'index.uts.ts')]
          }
        }
      }
    })
  }
  return paths
}

const NODE_MODULES_REGEX = /(\.\.\/)?node_modules/g

function normalizeNodeModules(str: string) {
  str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules')
  // HBuilderX 内置模块路径转换
  str = str.replace(
    /.*\/plugins\/uniapp-cli-vite\/node[-_]modules/,
    'node-modules'
  )
  if (!isInHBuilderX()) {
    // 内部测试
    if (str.includes('uni-app-next/packages/')) {
      str = str.replace(
        /.*\/uni-app-next\/packages\//,
        'node-modules/@dcloudio/'
      )
    }
  }

  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    str = str.replace('node-modules/@', 'node-modules/npm-scope-')
  }
  return str
}

export type UniXCompilerPlatform = 'app-android' | 'app-ios' | 'app-harmony'

export async function compileUniModuleWithTsc(
  platform: UniXCompilerPlatform,
  pluginDir: string,
  uniXCompiler: UniXCompiler,
  {
    rootFiles,
    preprocessor,
  }: {
    rootFiles?: string[] | ((platform: UniXCompilerPlatform) => string[])
    preprocessor: SyncUniModulesFilePreprocessor
  }
) {
  // 初始化编译器
  await uniXCompiler.init()
  // 同步资源
  await syncUniModuleFilesByCompiler(
    platform,
    uniXCompiler,
    pluginDir,
    preprocessor
  )

  // 添加入口
  const indexFileName = resolveTscUniModuleIndexFileName(platform, pluginDir)
  if (indexFileName) {
    await uniXCompiler.addRootFile(indexFileName)
  }
  const userRootFiles =
    typeof rootFiles === 'function' ? rootFiles(platform) : rootFiles
  if (userRootFiles && userRootFiles.length) {
    await uniXCompiler.addRootFiles(userRootFiles)
  }
  await uniXCompiler.close()
}

export async function syncUniModuleFilesByCompiler(
  platform: UniXCompilerPlatform,
  compiler: UniXCompiler,
  pluginDir: string,
  preprocessor: SyncUniModulesFilePreprocessor
) {
  const start = Date.now()
  const inputDir = process.env.UNI_INPUT_DIR
  const outputPluginDir = resolveOutputPluginDir(platform, inputDir, pluginDir)
  const uvueOutputPluginDir = resolveUVueOutputPluginDir(
    platform,
    inputDir,
    pluginDir
  )
  // 目前每次编译，都全量比对同步uni_modules目录下的文件，不然还要 watch dir
  const files = await syncUniModulesFiles(
    platform,
    pluginDir,
    outputPluginDir,
    true,
    preprocessor
  )
  const staticFiles = await syncUniModuleStaticFiles(
    pluginDir,
    uvueOutputPluginDir,
    preprocessor
  )
  if (staticFiles.length) {
    files.push(...staticFiles)
  }
  // copy vue files
  const vueFiles = await syncUniModuleVueFiles(
    pluginDir,
    uvueOutputPluginDir,
    preprocessor
  )
  if (vueFiles.length) {
    // 如果有组件，那将 uts 文件 copy 到 .uvue 目录下，避免 tsc 不 emit 相关的 uts 文件
    // 如果 tsc emit 了，那就会再次覆盖
    await syncUniModulesFiles(
      platform,
      pluginDir,
      uvueOutputPluginDir,
      false,
      preprocessor
    )
    compiler.debug(
      `${path.basename(pluginDir)} sync vue files(${vueFiles.length})`
    )
    files.push(...vueFiles)
  }

  // 如果是 customElements，且没有utssdk入口文件，需要自动生成一个
  const customElementsDir = path.resolve(pluginDir, 'customElements')
  if (fs.existsSync(customElementsDir)) {
    const customElements = Object.keys(resolveCustomElements(pluginDir))
    if (customElements.length) {
      const pluginId = path.basename(pluginDir)
      const customElementsCodes = customElements.map((name) => {
        if (platform === 'app-harmony') {
          // 鸿蒙不需要，在入口 index.generated.ets 中 define 了
          return `export * from '@/uni_modules/${pluginId}/customElements/${name}/${name}.uts'`
        } else {
          // 自动生成 customElements.define 代码，rust 那里会根据 define 来生成注册代码
          const codes: string[] = []
          const source = `@/uni_modules/${pluginId}/customElements/${name}/${name}.uts`
          const className = capitalize(camelize(name))
          const elementClassName = `${className}Element`
          codes.push(`import { ${elementClassName} } from '${source}'`)
          codes.push(
            `customElements.define('${name.replace(
              'uni-',
              ''
            )}', ${elementClassName})`
          )
          codes.push(`export * from '${source}'`)
          return codes.join('\n')
        }
      })

      const indexFileName = resolveTscUniModuleIndexFileName(
        platform,
        pluginDir
      )
      if (!indexFileName) {
        const indexFileName = path.resolve(
          resolveOutputPluginDir(
            platform,
            process.env.UNI_INPUT_DIR,
            pluginDir
          ),
          `utssdk/${platform}/index.uts.ts`
        )
        fs.outputFileSync(indexFileName, customElementsCodes.join('\n'))
      } else {
        const indexFileContent = fs.readFileSync(indexFileName, 'utf-8')
        customElementsCodes.forEach((code) => {
          if (!indexFileContent.includes(code)) {
            fs.appendFileSync(indexFileName, '\n' + code)
          }
        })
      }
    }
  }

  compiler.debug(
    `${path.basename(pluginDir)} sync files(${files.length})`,
    Date.now() - start
  )
}

function resolveUniModuleGlobs() {
  const extname = `.{uts,ts,json}`
  const globs = [
    `*.uts`,
    `customElements/**/*${extname}`,
    // test-uts/common/**/*
    `common/**/*${extname}`,
    `utssdk/**/*${extname}`,
    // 不copy components目录了，不单独编译，启用vite走完整流程编译
    // `components/**/*`,
  ]
  return globs
}

function resolveUniModuleIgnoreGlobs(platform: UniXCompilerPlatform) {
  const globs = [
    `utssdk/app-android/config.json`,
    `utssdk/app-ios/config.json`,
    `utssdk/web/**/*`,
    `utssdk/mp-*/**/*`,
  ]
  if (platform === 'app-android' || platform === 'app-ios') {
    globs.push(`utssdk/app-harmony/**/*`)
  }
  if (platform === 'app-harmony') {
    globs.push(`utssdk/app-android/**/*`)
    globs.push(`utssdk/app-ios/**/*`)
  }
  return globs
}

function resolveUniModuleVueGlobs() {
  const extname = `.{vue,uvue}`
  const globs = [
    `utssdk/app-android/**/*${extname}`,
    `utssdk/app-ios/**/*${extname}`,
  ]
  return globs
}

export async function syncUTSFiles(
  pattern: string,
  cwd: string,
  outputDir: string,
  rename: boolean,
  preprocessor: SyncUniModulesFilePreprocessor,
  cache?: Record<string, number>
) {
  return fg(pattern, {
    cwd,
    absolute: false,
  }).then((files) => {
    return Promise.all(
      files.map(async (fileName) => {
        let needSync = true
        if (cache) {
          const lastModifiedCache = cache[fileName]
          const lastModified = (await fs.stat(path.resolve(cwd, fileName)))
            .mtimeMs
          if (lastModifiedCache && lastModifiedCache === lastModified) {
            needSync = false
          } else {
            cache[fileName] = lastModified
          }
        }
        if (needSync) {
          return syncUniModulesFile(
            fileName,
            cwd,
            outputDir,
            rename,
            preprocessor
          ).then(() => fileName)
        }
        return fileName
      })
    )
  })
}

async function syncUniModuleStaticFiles(
  pluginDir: string,
  outputPluginDir: string,
  preprocessor: SyncUniModulesFilePreprocessor
) {
  return syncUTSFiles(
    `static/**/*`,
    pluginDir,
    outputPluginDir,
    false,
    preprocessor
  )
}

async function syncUniModuleVueFiles(
  pluginDir: string,
  outputPluginDir: string,
  preprocessor: SyncUniModulesFilePreprocessor
) {
  return fg(resolveUniModuleVueGlobs(), {
    cwd: pluginDir,
    absolute: false,
  }).then((files) => {
    return Promise.all(
      files.map((fileName) =>
        syncUniModulesFile(
          fileName,
          pluginDir,
          outputPluginDir,
          false,
          preprocessor
        ).then(() => fileName)
      )
    )
  })
}

async function syncUniModulesFiles(
  platform: UniXCompilerPlatform,
  pluginDir: string,
  outputPluginDir: string,
  rename: boolean,
  preprocessor: SyncUniModulesFilePreprocessor
) {
  return fg(resolveUniModuleGlobs(), {
    cwd: pluginDir,
    absolute: false,
    ignore: resolveUniModuleIgnoreGlobs(platform),
  }).then((files) => {
    return Promise.all(
      files.map((fileName) =>
        syncUniModulesFile(
          fileName,
          pluginDir,
          outputPluginDir,
          rename,
          preprocessor
        ).then(() => fileName)
      )
    )
  })
}

export type SyncUniModulesFilePreprocessor = (
  code: string,
  fileName: string
) => Promise<string>

async function syncUniModulesFile(
  relativeFileName: string,
  pluginDir: string,
  outputPluginDir: string,
  rename: boolean,
  preprocessor: SyncUniModulesFilePreprocessor
) {
  const src = path.resolve(pluginDir, relativeFileName)
  if (rename) {
    const extname = path.extname(relativeFileName)
    if (['.uts', '.json', '.vue', '.uvue'].includes(extname)) {
      // test.uts => test.uts.ts
      // test.json => test.json.ts
      return writeFile(
        src,
        path.resolve(outputPluginDir, relativeFileName + '.ts'),
        preprocessor
      )
    }
  }
  return copyFile(src, path.resolve(outputPluginDir, relativeFileName))
}

const utsModuleFileCaches = new Map<string, number>()

async function writeFile(
  src: string,
  dest: string,
  preprocessor: SyncUniModulesFilePreprocessor
) {
  const stat = await fs.stat(src)
  const key = src + ',' + dest
  if (utsModuleFileCaches.get(key) === stat.mtimeMs) {
    return
  }
  utsModuleFileCaches.set(key, stat.mtimeMs)
  return preprocessor(fs.readFileSync(src, 'utf-8'), src).then((content) =>
    fs.outputFile(dest, content)
  )
}

async function copyFile(src: string, dest: string) {
  const stat = await fs.stat(src)
  const key = src + ',' + dest
  if (utsModuleFileCaches.get(key) === stat.mtimeMs) {
    return
  }
  utsModuleFileCaches.set(key, stat.mtimeMs)
  return fs.copy(src, dest, { overwrite: true })
}

export function resolveOutputPluginDir(
  platform: UniXCompilerPlatform,
  inputDir: string,
  pluginDir: string
) {
  return path.join(
    process.env.UNI_APP_X_TSC_DIR,
    platform,
    path.relative(inputDir, pluginDir)
  )
}
export function resolveUVueOutputPluginDir(
  platform: UniXCompilerPlatform,
  inputDir: string,
  pluginDir: string
) {
  return path.join(
    process.env.UNI_APP_X_UVUE_DIR,
    platform,
    path.relative(inputDir, pluginDir)
  )
}

export function resolveTscUniModuleIndexFileName(
  platform: UniXCompilerPlatform,
  pluginDir: string
) {
  pluginDir = resolveOutputPluginDir(
    platform,
    process.env.UNI_INPUT_DIR,
    pluginDir
  )
  let indexFileName = path.resolve(pluginDir, `utssdk/${platform}/index.uts.ts`)
  if (fs.existsSync(indexFileName)) {
    return indexFileName
  }
  indexFileName = path.resolve(pluginDir, 'utssdk/index.uts.ts')
  if (fs.existsSync(indexFileName)) {
    return indexFileName
  }
}
