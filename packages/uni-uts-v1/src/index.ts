import { isArray } from '@vue/shared'
import { join, relative } from 'path'

import { runKotlinProd, runKotlinDev, resolveAndroidDepFiles } from './kotlin'
import { runSwiftProd, runSwiftDev, resolveIOSDepFiles } from './swift'

import { genProxyCode, resolvePlatformIndex, resolveRootIndex } from './code'
import { ERR_MSG_PLACEHOLDER, resolvePackage } from './utils'
import { parseUtsSwiftPluginStacktrace } from './stacktrace'
import { resolveUtsPluginSourceMapFile } from './sourceMap'
import { isWindows } from './shared'
import {
  generateCodeFrameWithKotlinStacktrace,
  generateCodeFrameWithSwiftStacktrace,
} from './legacy'
import {
  checkCompile,
  genManifestFile,
  initCheckOptionsEnv,
  restoreDex,
  restoreSourceMap,
  storeDex,
  storeSourceMap,
} from './manifest'

export const sourcemap = {
  generateCodeFrameWithKotlinStacktrace,
  generateCodeFrameWithSwiftStacktrace,
}

export * from './sourceMap'

export { compile as toKotlin } from './kotlin'
export { compile as toSwift } from './swift'

function parseErrMsg(code: string, errMsg: string) {
  return code.replace(ERR_MSG_PLACEHOLDER, errMsg)
}

function compileErrMsg(id: string) {
  return `uts插件[${id}]编译失败，无法使用`
}

export async function compile(pluginDir: string) {
  const pkg = resolvePackage(pluginDir)
  if (!pkg) {
    return
  }
  const cacheDir = process.env.HX_DEPENDENCIES_DIR
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const utsPlatform = process.env.UNI_UTS_PLATFORM
  const pluginRelativeDir = relative(inputDir, pluginDir)
  const env = initCheckOptionsEnv()
  const deps: string[] = []
  const code = await genProxyCode(pluginDir, pkg)
  let errMsg = ''
  if (process.env.NODE_ENV !== 'development') {
    // 生产模式 支持同时生成 android 和 ios 的 uts 插件
    if (utsPlatform === 'app-android' || utsPlatform === 'app') {
      const filename =
        resolvePlatformIndex('app-android', pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      if (filename) {
        await getCompiler('kotlin').runProd(filename)
        if (cacheDir) {
          genManifestFile('app-android', {
            pluginDir,
            env,
            cacheDir,
            pluginRelativeDir,
            is_uni_modules: pkg.is_uni_modules,
          })
        }
      }
    }
    if (utsPlatform === 'app-ios' || utsPlatform === 'app') {
      const filename =
        resolvePlatformIndex('app-ios', pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      if (filename) {
        await getCompiler('swift').runProd(filename)
        if (cacheDir) {
          genManifestFile('app-ios', {
            pluginDir,
            env,
            cacheDir,
            pluginRelativeDir,
            is_uni_modules: pkg.is_uni_modules,
          })
        }
      }
    }
  } else {
    // iOS windows 平台，标准基座不编译
    if (utsPlatform === 'app-ios') {
      if (isWindows) {
        process.env.UNI_UTS_TIPS = `iOS手机在windows上真机运行时uts插件代码修改需提交云端打包自定义基座才能生效`
        return {
          code: parseErrMsg(code, errMsg),
          deps,
        }
      }
      if (process.env.HX_USE_BASE_TYPE === 'standard') {
        process.env.UNI_UTS_TIPS = `iOS手机在标准基座真机或模拟器运行暂不支持uts插件，如需调用uts插件请使用自定义基座`
        return {
          code: parseErrMsg(code, errMsg),
          deps,
        }
      }
    }
    if (utsPlatform === 'app-android' || utsPlatform === 'app-ios') {
      let tips = ''
      // dev 模式
      if (cacheDir) {
        // 检查缓存
        // let start = Date.now()
        // console.log('uts插件[' + pkg.id + ']start', start)
        const res = await checkCompile(
          utsPlatform,
          process.env.HX_USE_BASE_TYPE,
          {
            id: pkg.id,
            env,
            cacheDir,
            outputDir,
            pluginDir,
            pluginRelativeDir,
            is_uni_modules: pkg.is_uni_modules,
          }
        )
        if (res.tips) {
          tips = res.tips
        }
        // console.log('uts插件[' + pkg.id + ']end', Date.now())
        // console.log('uts插件[' + pkg.id + ']缓存检查耗时：', Date.now() - start)
        if (!res.expired) {
          if (utsPlatform === 'app-android') {
            restoreDex(pluginRelativeDir, outputDir, pkg.is_uni_modules)
          }

          // 还原 sourcemap
          restoreSourceMap(
            utsPlatform,
            pluginRelativeDir,
            outputDir,
            cacheDir,
            pkg.is_uni_modules
          )

          if (res.tips) {
            console.warn(res.tips)
          }

          return {
            code: parseErrMsg(code, errMsg),
            // 所有文件加入依赖
            deps: res.files.map((name) => join(pluginDir, name)),
          }
        }
      }
      const filename =
        resolvePlatformIndex(utsPlatform, pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      const compilerType = utsPlatform === 'app-android' ? 'kotlin' : 'swift'

      if (filename) {
        deps.push(filename)
        if (utsPlatform === 'app-android') {
          deps.push(...resolveAndroidDepFiles(filename))
        } else {
          deps.push(...resolveIOSDepFiles(filename))
        }

        const res = await getCompiler(compilerType).runDev(filename)
        if (res) {
          if (isArray(res.deps) && res.deps.length) {
            // 添加其他文件的依赖
            deps.push(...res.deps)
          }
          let isSuccess = false
          if (res.type === 'swift') {
            if (res.code) {
              errMsg = compileErrMsg(pkg.id)
              console.error(
                `error: ` +
                  (await parseUtsSwiftPluginStacktrace({
                    stacktrace: res.msg,
                    sourceMapFile: resolveUtsPluginSourceMapFile(
                      'swift',
                      filename,
                      inputDir,
                      outputDir
                    ),
                    sourceRoot: inputDir,
                  }))
              )
            } else {
              isSuccess = true
            }
          } else if (res.type === 'kotlin') {
            if (res.changed.length) {
              isSuccess = true
            }
          }
          if (isSuccess) {
            // 生成缓存文件
            if (cacheDir) {
              // 存储 sourcemap
              storeSourceMap(
                utsPlatform,
                pluginRelativeDir,
                outputDir,
                cacheDir,
                pkg.is_uni_modules
              )
              // 生成 manifest
              genManifestFile(utsPlatform, {
                pluginDir,
                env,
                cacheDir,
                pluginRelativeDir,
                is_uni_modules: pkg.is_uni_modules,
              })
            }
            if (tips) {
              console.warn(tips)
            }
          }
          const files: string[] = []
          if (process.env.UNI_APP_UTS_CHANGED_FILES) {
            try {
              files.push(...JSON.parse(process.env.UNI_APP_UTS_CHANGED_FILES))
            } catch (e) {}
          }
          if (res.changed && res.changed.length) {
            files.push(...res.changed)
            // 需要缓存 dex 文件
            if (cacheDir && res.type === 'kotlin') {
              res.changed.forEach((file) => {
                if (file.endsWith('classes.dex')) {
                  storeDex(join(outputDir, file), pluginRelativeDir, outputDir)
                }
              })
            }
          } else {
            if (res.type === 'kotlin') {
              errMsg = compileErrMsg(pkg.id)
            }
          }
          process.env.UNI_APP_UTS_CHANGED_FILES = JSON.stringify([
            ...new Set(files),
          ])
        } else {
          errMsg = compileErrMsg(pkg.id)
        }
      }
    }
  }
  return {
    code: parseErrMsg(code, errMsg),
    deps,
  }
}

function getCompiler(type: 'kotlin' | 'swift') {
  if (type === 'swift') {
    return {
      runProd: runSwiftProd,
      runDev: runSwiftDev,
    }
  }
  return {
    runProd: runKotlinProd,
    runDev: runKotlinDev,
  }
}
