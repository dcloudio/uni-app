import path, { join, relative } from 'path'
import fs from 'fs-extra'
import { makeLegalIdentifier } from '@rollup/pluginutils'
import type { APP_PLATFORM } from './manifest/utils'
import { normalizePath, resolveSourceMapPath } from './shared'
import {
  type KotlinCompilerServer,
  addInjectApis,
  addInjectComponents,
  compileAndroidDex,
  createStderrListener,
  resolveDexFile,
  resolveJarPath,
} from './kotlin'
import { getCompilerServer } from './utils'
import { restoreDex } from './manifest'
import { sync } from 'fast-glob'
import { resolveDexCacheFile } from './manifest/dex'

export function isEncrypt(pluginDir: string) {
  return fs.existsSync(path.resolve(pluginDir, 'encrypt'))
}

export function isUTSModules(pluginDir: string) {
  return fs.existsSync(path.resolve(pluginDir, 'utssdk'))
}

function createRollupCommonjsCode(
  _pluginDir: string,
  pluginRelativeDir: string
) {
  const name = makeLegalIdentifier(pluginRelativeDir)
  return `
import * as commonjsHelpers from "\0commonjsHelpers.js"
const ${name} = uni.requireUTSPlugin('${normalizePath(pluginRelativeDir)}')
export default /*@__PURE__*/commonjsHelpers.getDefaultExportFromCjs(${name});
export { ${name} as __moduleExports };
`
}
function createWebpackCommonjsCode(pluginRelativeDir: string) {
  return `
module.exports = uni.requireUTSPlugin('${normalizePath(pluginRelativeDir)}')
`
}

export async function compileEncrypt(pluginDir: string, isX = false) {
  if (isX && !fs.existsSync(path.resolve(pluginDir, 'utssdk'))) {
    return compileEncryptByUniHelpers(pluginDir)
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const utsPlatform = process.env.UNI_UTS_PLATFORM as APP_PLATFORM
  const isRollup = !!process.env.UNI_UTS_USING_ROLLUP
  const pluginRelativeDir = relative(inputDir, pluginDir)
  const outputPluginDir = normalizePath(join(outputDir, pluginRelativeDir))
  let code = isX
    ? ''
    : isRollup
    ? createRollupCommonjsCode(pluginDir, pluginRelativeDir)
    : createWebpackCommonjsCode(pluginRelativeDir)
  if (process.env.NODE_ENV !== 'development') {
    // 生成wgt，无需复制加密插件目录
    const needCopy = !(process.env.UNI_APP_PRODUCTION_TYPE === 'WGT')
    if (needCopy) {
      // 复制插件目录
      fs.copySync(pluginDir, join(outputDir, pluginRelativeDir))
    }
    return {
      dir: outputPluginDir,
      code,
      deps: [] as string[],
      encrypt: true,
      inject_apis: [],
      meta: { commonjs: { isCommonJS: true } },
    }
  }
  const cacheDir = process.env.HX_DEPENDENCIES_DIR!
  if (!isX) {
    // 读取缓存目录的 js code
    const indexJsPath = resolveJsCodeCacheFilename(
      utsPlatform,
      cacheDir,
      pluginRelativeDir
    )
    if (fs.existsSync(indexJsPath)) {
      code = fs.readFileSync(indexJsPath, 'utf-8') + code
    } else {
      console.error(
        `uts插件[${path.basename(pluginDir)}]不存在，请重新打包自定义基座`
      )
    }
  } else {
    const jarPath = resolveJarCacheFilename(cacheDir, pluginRelativeDir)
    if (!fs.existsSync(jarPath)) {
      console.error(
        `uts插件[${path.basename(pluginDir)}]不存在，请重新打包自定义基座`
      )
    }
  }
  return {
    dir: outputPluginDir,
    code,
    deps: [] as string[],
    encrypt: true,
    inject_apis: [],
    meta: { commonjs: { isCommonJS: true } },
  }
}

export function resolveJsCodeCacheFilename(
  platform: APP_PLATFORM,
  cacheDir: string,
  pluginRelativeDir: string
) {
  return join(cacheDir, platform, 'uts', pluginRelativeDir, 'index.js')
}

function resolveJarCacheFilename(cacheDir: string, pluginRelativeDir: string) {
  return join(cacheDir, 'app-android', 'uts', pluginRelativeDir, 'index.jar')
}

async function compileEncryptByUniHelpers(pluginDir: string) {
  // 目前仅Android会进来
  const cacheDir = process.env.HX_DEPENDENCIES_DIR || ''
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const pluginRelativeDir = relative(inputDir, pluginDir)
  const outputPluginDir = normalizePath(join(outputDir, pluginRelativeDir))
  // 读取缓存文件
  const cachePluginDir = path.resolve(
    process.env.UNI_MODULES_ENCRYPT_CACHE_DIR!,
    pluginRelativeDir
  )

  const cacheFile = resolveDexCacheFile(pluginRelativeDir, cacheDir)
  if (cacheFile) {
    // 已有缓存
    restoreDex(pluginRelativeDir, cacheDir, outputDir, true)
    const assets = path.resolve(cachePluginDir, 'assets')
    if (fs.existsSync(assets)) {
      fs.copySync(assets, path.resolve(outputDir, pluginRelativeDir, 'assets'))
    }
    return {
      dir: outputPluginDir,
      code: 'export default {}',
      deps: [] as string[],
      encrypt: true,
      inject_apis: [],
    }
  }

  const pkg = require(path.resolve(cachePluginDir, 'package.json'))
  if (process.env.NODE_ENV !== 'development') {
    // 生成wgt，无需复制加密插件目录
    const needCopy = !(process.env.UNI_APP_PRODUCTION_TYPE === 'WGT')
    if (needCopy) {
      // 复制encrypt
      fs.copySync(
        path.resolve(pluginDir, 'encrypt'),
        join(outputDir, pluginRelativeDir, 'encrypt')
      )
      // 复制加密kt文件
      fs.copySync(cachePluginDir, join(outputDir, pluginRelativeDir), {
        filter: (src) => src.endsWith('.kt'),
      })
      // 复制资源文件
      fs.copySync(
        path.resolve(cachePluginDir, 'assets'),
        join(outputDir, 'assets')
      )
    }
    const inject_apis = pkg.uni_modules?.artifacts?.apis || []
    addInjectApis(inject_apis)
    addInjectComponents(pkg.uni_modules?.artifacts?.components || [])
    return {
      dir: outputPluginDir,
      code: 'export default {}',
      deps: [] as string[],
      encrypt: true,
      inject_apis,
    }
  }
  // development
  if (process.env.UNI_HBUILDERX_PLUGINS) {
    const { DUM } = require(path.join(
      process.env.UNI_HBUILDERX_PLUGINS,
      'uni_helpers'
    ))

    const ktFiles: Record<string, string> = sync('**/*.kt', {
      absolute: false,
      cwd: cachePluginDir,
    }).reduce((files, file) => {
      files[path.resolve(cachePluginDir, file)] = path.resolve(
        process.env.UNI_OUTPUT_DIR,
        pluginRelativeDir,
        file
      )
      return files
    }, {})
    const errMsg = await DUM(path.basename(pluginRelativeDir), ktFiles)
    if (errMsg) {
      console.error(errMsg)
      process.exit(0)
    }

    const jarFile = resolveJarPath(
      'app-android',
      cacheDir,
      pluginRelativeDir,
      'index.kt'
    )
    const waiting = { done: undefined }
    const kotlinFiles = Object.values(ktFiles)
    const depJars =
      require(path.resolve(pluginDir, 'package.json')).uni_modules
        ?.dependencies || []

    const compilerServer = getCompilerServer<KotlinCompilerServer>(
      'uniapp-runextension'
    )
    if (!compilerServer) {
      throw new Error(`项目使用了uts插件，正在安装 uts Android 运行扩展...`)
    }
    const { code, msg } = await compileAndroidDex(
      true,
      compilerServer,
      kotlinFiles,
      jarFile,
      '',
      depJars,
      createStderrListener(outputDir, resolveSourceMapPath(), waiting)
    )
    // 等待 stderrListener 执行完毕
    if (waiting.done) {
      await waiting.done
    }
    try {
      kotlinFiles.forEach((file) => {
        fs.removeSync(file)
      })
    } catch (e) {}
    if (!code) {
      const dexFile = resolveDexFile(jarFile)
      if (fs.existsSync(dexFile)) {
        restoreDex(pluginRelativeDir, cacheDir, outputDir, true)
      }
    } else if (msg) {
      console.error(msg)
    }

    const assets = path.resolve(cachePluginDir, 'assets')
    if (fs.existsSync(assets)) {
      fs.copySync(assets, path.resolve(outputDir, pluginRelativeDir, 'assets'))
    }
  }

  return {
    dir: outputPluginDir,
    code: 'export default {}',
    deps: [] as string[],
    encrypt: true,
    inject_apis: [],
  }
}
