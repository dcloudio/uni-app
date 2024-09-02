const path = require('path')
const {
  resolveUTSCompiler,
  parseUniExtApiNamespacesOnce
} = require('./uts')
const {
  parseUTSModuleDeps,
  resolveOutputPluginDir,
  resolveUVueOutputPluginDir,
  resolveTscUniModuleIndexFileName,
  syncUniModuleFilesByCompiler
} = require('./uni_modules')
const {
  parseJson
} = require('../json')
const {
  dataToEsm
} = require('./dataToEsm')
const {
  getUniXKotlinCompiler,
  getUniXSwiftCompiler,
  getChangedFiles,
  getUTSPlugins
} = require('./uts-webpack-plugin')

const uniModulesSyncFilePreprocessors = {
  '.json' (content) {
    // TODO 目前的 preJson 有问题，需要明确app-android/app-ios
    return dataToEsm(parseJson(content, true), {
      namedExports: true,
      preferConst: true
    })
  }
}

module.exports = async function (content) {
  const callback = this.async()

  const uniXKotlinCompiler = getUniXKotlinCompiler()
  const uniXSwiftCompiler = getUniXSwiftCompiler()

  const inputDir = process.env.UNI_INPUT_DIR

  const compilePlugin = async (pluginDir) => {
    const pluginId = path.basename(pluginDir)

    const utsPlugins = getUTSPlugins()
    const changedFiles = getChangedFiles()
    if (uniXKotlinCompiler) {
      await uniXKotlinCompiler.init()
      await syncUniModuleFilesByCompiler(
        uniXKotlinCompiler,
        pluginDir,
        resolveOutputPluginDir('app-android', inputDir, pluginDir),
        resolveUVueOutputPluginDir('app-android', inputDir, pluginDir),
        uniModulesSyncFilePreprocessors
      )
    }

    if (uniXSwiftCompiler) {
      await uniXSwiftCompiler.init()
      await syncUniModuleFilesByCompiler(
        uniXSwiftCompiler,
        pluginDir,
        resolveOutputPluginDir('app-ios', inputDir, pluginDir),
        resolveUVueOutputPluginDir('app-ios', inputDir, pluginDir),
        uniModulesSyncFilePreprocessors
      )
    }

    if (!utsPlugins.has(pluginId)) {
      utsPlugins.add(pluginId)
      if (uniXKotlinCompiler) {
        const indexFileName = resolveTscUniModuleIndexFileName(
          'app-android',
          resolveOutputPluginDir('app-android', inputDir, pluginDir)
        )
        if (indexFileName) {
          await uniXKotlinCompiler.addRootFile(indexFileName)
        }
      }
      if (uniXSwiftCompiler) {
        const indexFileName = resolveTscUniModuleIndexFileName(
          'app-ios',
          resolveOutputPluginDir('app-ios', inputDir, pluginDir)
        )
        if (indexFileName) {
          await uniXSwiftCompiler.addRootFile(indexFileName)
        }
      }
    }

    // 处理uni_modules中的文件变更
    const files = changedFiles.get(pluginId)
    if (files) {
      // 仅限watch模式是会生效
      changedFiles.delete(pluginId)
      if (uniXKotlinCompiler) {
        await uniXKotlinCompiler.invalidate(files)
      }
      if (uniXSwiftCompiler) {
        await uniXSwiftCompiler.invalidate(files)
      }
    }

    const pkgJson = require(path.join(pluginDir, 'package.json'))
    const compiler = resolveUTSCompiler()
    // 处理依赖的 uts 插件
    const deps = parseUTSModuleDeps(
      pkgJson.uni_modules?.dependencies || [],
      process.env.UNI_INPUT_DIR
    )
    if (deps.length) {
      for (const dep of deps) {
        await compilePlugin(
          path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules', dep)
        )
      }
    }
    return compiler.compile(pluginDir, {
      isX: false,
      isPlugin: true,
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
      sourceMap: process.env.NODE_ENV === 'development',
      uni_modules: deps
      // 暂不提供
      // async kotlinAutoImports() {}
      // async swiftAutoImports() {}
    })
  }

  const pluginDir = path.dirname(this.resourcePath)

  compilePlugin(pluginDir).then(result => {
    if (result) {
      result.deps.forEach((dep) => {
        this.addDependency(dep)
      })
      callback(null, result.code)
    } else {
      callback(null, '')
    }
  }).catch(err => {
    callback(err)
  })
}
