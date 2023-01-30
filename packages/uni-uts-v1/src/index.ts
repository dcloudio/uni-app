import { extend, isArray } from '@vue/shared'
import { join, relative } from 'path'

import {
  runKotlinProd,
  runKotlinDev,
  resolveAndroidDepFiles,
  checkAndroidVersionTips,
} from './kotlin'
import {
  runSwiftProd,
  runSwiftDev,
  resolveIOSDepFiles,
  checkIOSVersionTips,
} from './swift'

import {
  genProxyCode,
  resolvePlatformIndex,
  resolvePlatformIndexFilename,
  resolveRootIndex,
} from './code'
import {
  ERR_MSG_PLACEHOLDER,
  genConfigJson,
  resolveAndroidComponents,
  resolveIOSComponents,
  resolvePackage,
} from './utils'
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
import { cacheTips } from './manifest/utils'
import { compileEncrypt, isEncrypt } from './encrypt'

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

function warn(msg: string) {
  console.warn(`提示：${msg}`)
}

export async function compile(pluginDir: string) {
  const pkg = resolvePackage(pluginDir)
  if (!pkg) {
    return
  }
  // 加密插件
  if (isEncrypt(pluginDir)) {
    return compileEncrypt(pluginDir)
  }
  const cacheDir = process.env.HX_DEPENDENCIES_DIR
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const utsPlatform = process.env.UNI_UTS_PLATFORM

  const pluginRelativeDir = relative(inputDir, pluginDir)
  const androidComponents = resolveAndroidComponents(
    pluginDir,
    pkg.is_uni_modules
  )
  const iosComponents = resolveIOSComponents(pluginDir, pkg.is_uni_modules)

  const env = initCheckOptionsEnv()
  const deps: string[] = []
  const code = await genProxyCode(
    pluginDir,
    extend({ androidComponents, iosComponents }, pkg)
  )
  let errMsg = ''
  if (process.env.NODE_ENV !== 'development') {
    // 生产模式 支持同时生成 android 和 ios 的 uts 插件
    if (utsPlatform === 'app-android' || utsPlatform === 'app') {
      let filename =
        resolvePlatformIndex('app-android', pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      if (!filename && Object.keys(androidComponents).length) {
        filename = resolvePlatformIndexFilename('app-android', pluginDir, pkg)
      }
      if (filename) {
        await getCompiler('kotlin').runProd(filename, androidComponents)
        if (cacheDir) {
          // 存储 sourcemap
          storeSourceMap(
            'app-android',
            pluginRelativeDir,
            outputDir,
            cacheDir,
            pkg.is_uni_modules
          )
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
      let filename =
        resolvePlatformIndex('app-ios', pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      if (!filename && Object.keys(androidComponents).length) {
        filename = resolvePlatformIndexFilename('app-ios', pluginDir, pkg)
      }
      if (filename) {
        await getCompiler('swift').runProd(filename, iosComponents)
        if (cacheDir) {
          storeSourceMap(
            'app-ios',
            pluginRelativeDir,
            outputDir,
            cacheDir,
            pkg.is_uni_modules
          )
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
    const compilerType = utsPlatform === 'app-android' ? 'kotlin' : 'swift'
    const versionTips = getCompiler(compilerType).checkVersionTips(
      pkg.id,
      pluginDir,
      pkg.is_uni_modules
    )
    // iOS windows 平台，标准基座不编译
    if (utsPlatform === 'app-ios') {
      if (isWindows) {
        process.env.UNI_UTS_TIPS = `iOS手机在windows上真机运行时uts插件代码修改需提交云端打包自定义基座才能生效`
        return {
          code: parseErrMsg(code, errMsg),
          deps,
        }
      }
      // ios 模拟器不支持
      if (process.env.HX_RUN_DEVICE_TYPE === 'ios_simulator') {
        process.env.UNI_UTS_TIPS = `iOS手机在模拟器运行暂不支持uts插件，如需调用uts插件请使用自定义基座`
        return {
          code: parseErrMsg(code, compileErrMsg(pkg.id)),
          deps,
        }
      }
    }
    if (utsPlatform === 'app-android' || utsPlatform === 'app-ios') {
      const components =
        utsPlatform === 'app-android' ? androidComponents : iosComponents
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
          // 处理 config.json
          genConfigJson(
            utsPlatform,
            components,
            pluginRelativeDir,
            pkg.is_uni_modules,
            inputDir,
            outputDir
          )

          console.log(cacheTips(pkg.id))

          if (res.tips) {
            warn(res.tips)
          }
          if (versionTips) {
            warn(versionTips)
          }

          return {
            code: parseErrMsg(code, errMsg),
            // 所有文件加入依赖
            deps: res.files.map((name) => join(pluginDir, name)),
          }
        }
      }
      let filename =
        resolvePlatformIndex(utsPlatform, pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)

      if (!filename && Object.keys(androidComponents).length) {
        filename = resolvePlatformIndexFilename(utsPlatform, pluginDir, pkg)
      }

      if (filename) {
        deps.push(filename)
        if (utsPlatform === 'app-android') {
          deps.push(...resolveAndroidDepFiles(filename))
        } else {
          deps.push(...resolveIOSDepFiles(filename))
        }
        // 处理 config.json
        genConfigJson(
          utsPlatform,
          components,
          pluginRelativeDir,
          pkg.is_uni_modules,
          inputDir,
          outputDir
        )
        const res = await getCompiler(compilerType).runDev(filename, components)
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
              warn(tips)
            }
            if (versionTips) {
              warn(versionTips)
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
      checkVersionTips: checkIOSVersionTips,
    }
  }
  return {
    runProd: runKotlinProd,
    runDev: runKotlinDev,
    checkVersionTips: checkAndroidVersionTips,
  }
}
