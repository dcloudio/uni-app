import path from 'path'
import fs from 'fs-extra'

import type { UTSResult } from '@dcloudio/uts'

import {
  D8_DEFAULT_ARGS,
  type RunKotlinBuildResult,
  type RunKotlinDevResult,
  createStderrListener,
  getUniModulesCacheJars,
  getUniModulesEncryptCacheJars,
  getUniModulesJars,
  kotlinDir,
  parseUTSModuleConfigJsonJars,
  parseUTSModuleLibsJars,
  resolveKotlincArgs,
} from '../kotlin'
import {
  addPluginInjectComponents,
  getKotlinCompilerServer,
  getPluginInjectApis,
  getPluginInjectComponents,
  parseInjectModules,
  resolveUniAppXSourceMapPath,
} from '../utils'
import {
  type KotlinManifestCache,
  hbuilderKotlinCompileErrorFormatter,
} from '../stacktrace/kotlin'
import type { CompileAppOptions } from '.'

let isFirst = true
let checkConfigJsonDeps = true

export type RunUVueKotlinDevOptions = Pick<
  CompileAppOptions,
  'inputDir' | 'outputDir' | 'uni_modules' | 'pageCount'
>

export async function runUVueKotlinDev(
  options: RunUVueKotlinDevOptions,
  result: RunKotlinDevResult,
  hasCache: boolean
) {
  result.type = 'kotlin'
  const { inputDir, outputDir, pageCount, uni_modules } = options
  const kotlinRootOutDir = kotlinDir(outputDir)
  const kotlinDexOutDir = kotlinDexDir(kotlinRootOutDir)
  const kotlinSrcOutDir = kotlinSrcDir(kotlinRootOutDir)
  const kotlinChangedFiles = parseKotlinChangedFiles(
    result,
    kotlinSrcOutDir,
    kotlinDexOutDir,
    outputDir
  )
  const kotlinMainFile = path.resolve(kotlinSrcOutDir, result.filename!)
  // 开发模式下，需要生成 dex
  if (fs.existsSync(kotlinMainFile)) {
    if (!kotlinChangedFiles.length) {
      if (isFirst) {
        isFirst = false
        console.log(
          `检测到编译缓存有效，跳过编译。详见：https://uniapp.dcloud.net.cn/uni-app-x/compiler/#cache`
        )
      }
    } else {
      const compilerServer = getKotlinCompilerServer()
      if (!compilerServer) {
        throw new Error(`项目使用了uts插件，正在安装 uts Android 运行扩展...`)
      }
      // 检查是否有缓存文件
      if (isFirst) {
        isFirst = false
        if (hasCache) {
          console.log(
            `检测到编译缓存部分失效，开始差量编译。详见：https://uniapp.dcloud.net.cn/uni-app-x/compiler/#cache`
          )
        }
      }
      const {
        getDefaultJar,
        getKotlincHome,
        compile: compileDex,
        checkDependencies,
      } = compilerServer

      const libsJars = parseUTSModuleLibsJars(uni_modules)

      let hasError = false
      const configJsonJars = await parseUTSModuleConfigJsonJars(
        2,
        uni_modules,
        checkDependencies!,
        checkConfigJsonDeps,
        () => {
          hasError = true
        }
      )
      // 发生错误需要重新check
      checkConfigJsonDeps = hasError

      // console.log('uni_modules', uni_modules)
      // console.log('libsJars', libsJars)
      // console.log('configJsonJars', configJsonJars)

      const cacheDir = process.env.HX_DEPENDENCIES_DIR || ''
      const kotlinClassOutDir = kotlinClassDir(kotlinRootOutDir)
      const waiting = { done: undefined }

      const jars = getDefaultJar(2)
        // 加密插件已经迁移到普通插件目录了，理论上不需要了
        .concat(getUniModulesEncryptCacheJars(cacheDir)) // 加密插件jar
        .concat(getUniModulesCacheJars(cacheDir)) // 普通插件jar
        .concat(getUniModulesJars(outputDir)) // cli版本插件jar（没有指定cache的时候）
        .concat(configJsonJars) // 插件config.json依赖
        .concat(libsJars) // 插件本地libs

      const compileOptions = {
        version: 'v2',
        pageCount,
        kotlinc: resolveKotlincArgs(
          kotlinChangedFiles,
          kotlinClassOutDir,
          getKotlincHome(),
          [kotlinClassOutDir].concat(jars)
        ).concat(['-module-name', `main-${+Date.now()}`]),
        d8: D8_DEFAULT_ARGS.concat(
          jars.flatMap((jar) => {
            return ['--classpath', jar]
          })
        ),
        kotlinOutDir: kotlinClassOutDir,
        dexOutDir: kotlinDexOutDir,
        inputDir: kotlinSrcOutDir,
        stderrListener: createStderrListener(
          kotlinSrcOutDir,
          resolveUniAppXSourceMapPath(kotlinRootOutDir),
          waiting,
          hbuilderKotlinCompileErrorFormatter
        ),
      }
      result.kotlinc = true
      // console.log('DEX编译参数:', compileOptions)
      const { code, msg, data } = await compileDex(compileOptions, inputDir)
      // 等待 stderrListener 执行完毕
      if (waiting.done) {
        await waiting.done
      }
      // console.log('DEX编译结果:', code, data)
      if (!code && data) {
        result.changed = data.dexList
        syncDexList(data.dexList, kotlinDexOutDir, outputDir)
      } else {
        // 编译失败，需要调整缓存的 manifest.json
        if (result.changed.length) {
          const manifest = readKotlinManifestJson(kotlinSrcOutDir)
          if (manifest && manifest.files) {
            result.changed.forEach((file) => {
              delete manifest.files[file]
            })
            writeKotlinManifestJson(kotlinSrcOutDir, manifest)
          }
          result.changed = []
        }

        if (msg) {
          console.error(msg)
        }
      }
    }
  }
  return result
}

export type RunUVueKotlinBuildOptions = Pick<
  CompileAppOptions,
  'extApiComponents' | 'extApis'
>

export async function runUVueKotlinBuild(
  options: RunUVueKotlinBuildOptions,
  result: UTSResult
) {
  ;(result as RunKotlinBuildResult).type = 'kotlin'
  addPluginInjectComponents(options.extApiComponents)
  ;(result as RunKotlinBuildResult).inject_modules = parseInjectModules(
    (result.inject_apis || []).concat(getPluginInjectApis()),
    options.extApis || {},
    getPluginInjectComponents()
  )
  ;(result as RunKotlinBuildResult).kotlinc = false
  return result as RunKotlinBuildResult
}

function syncDexList(
  dexList: string[],
  kotlinDexOutDir: string,
  outputDir: string
) {
  dexList.forEach((dex) => {
    const dexFile = path.resolve(kotlinDexOutDir, dex)
    const targetDexFile = path.resolve(outputDir, dex)
    fs.copySync(dexFile, targetDexFile)
  })
}

export function kotlinSrcDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'src')
}

function kotlinDexDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'dex')
}

function kotlinClassDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'class')
}

function resolveDexByKotlinFile(kotlinDexOutDir: string, kotlinFile: string) {
  return path.join(
    path.resolve(kotlinDexOutDir, kotlinFile).replace('.kt', ''),
    'classes.dex'
  )
}

function parseKotlinChangedFiles(
  result: RunKotlinDevResult,
  kotlinSrcOutDir: string,
  kotlinDexOutDir: string,
  outputDir: string
) {
  // 解析发生变化的
  const kotlinChangedFiles = result.changed.map((file) => {
    const dexFile = resolveDexByKotlinFile(kotlinDexOutDir, file)
    // 如果kt文件变化，则删除对应的dex文件
    if (fs.existsSync(dexFile)) {
      fs.unlinkSync(dexFile)
    }
    return path.resolve(kotlinSrcOutDir, file)
  })
  // 解析未发生变化，但dex不存在的
  ;['index.kt', ...(result.chunks || [])].forEach((chunk) => {
    const chunkFile = path.resolve(kotlinSrcOutDir, chunk)
    if (!kotlinChangedFiles.includes(chunkFile)) {
      const dexFile = resolveDexByKotlinFile(kotlinDexOutDir, chunk)
      if (fs.existsSync(dexFile)) {
        // 如果缓存的dex文件存在，则不需要重新编译，但需要确定outputDir中存在dex文件
        const targetDexFile = resolveDexByKotlinFile(outputDir, chunk)
        if (!fs.existsSync(targetDexFile)) {
          fs.copySync(dexFile, targetDexFile)
        }
      } else {
        kotlinChangedFiles.push(chunkFile)
      }
    }
  })
  return kotlinChangedFiles
}

export function readKotlinManifestJson(
  kotlinSrcOutDir: string
): KotlinManifestCache | undefined {
  const file = path.resolve(kotlinSrcOutDir, '.manifest.json')
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  }
}

function writeKotlinManifestJson(
  kotlinSrcOutDir: string,
  manifest: KotlinManifestCache
) {
  fs.writeFileSync(
    path.resolve(kotlinSrcOutDir, '.manifest.json'),
    JSON.stringify(manifest)
  )
}
