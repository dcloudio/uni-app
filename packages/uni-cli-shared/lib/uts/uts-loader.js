const path = require('path')
const {
  resolveUTSCompiler,
  parseUniExtApiNamespacesOnce
} = require('./uts')
const {
  parseUTSModuleDeps
} = require('./uni_modules')
const {
  dataToEsm
} = require('./dataToEsm')
const {
  getUniXKotlinCompiler,
  getUniXSwiftCompiler,
  getChangedFiles,
  getUTSPlugins
} = require('./uts-webpack-plugin')

function createUniModulesSyncFilePreprocessor (
  platform,
  utsPlatform
) {
  const initPreprocessContext = require('../preprocess')
  const {
    vueContext: preContext
  } = initPreprocessContext(
    platform,
    global.uniPlugin.platforms
  )
  if (utsPlatform === 'app-android') {
    preContext.APP_ANDROID = true
  }
  if (utsPlatform === 'app-ios') {
    preContext.APP_IOS = true
  }
  const {
    preprocess
  } = require('@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/preprocess/lib/preprocess')

  function preJs (jsCode) {
    return preprocess(jsCode, preContext, {
      type: 'js'
    })
  }

  function preHtml (htmlCode) {
    return preprocess(htmlCode, preContext, {
      type: 'html'
    })
  }

  return async (content, fileName) => {
    const extname = path.extname(fileName)
    if (extname === '.json') {
      return dataToEsm(JSON.parse(preJs(content)), {
        namedExports: true,
        preferConst: true
      })
    } else if (extname === '.uts' || extname === '.ts') {
      return preJs(content)
    } else if (extname === '.uvue' || extname === '.vue') {
      return preJs(preHtml(content))
    }
    return content
  }
}

function once (fn, ctx = null) {
  let res
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args)
      fn = null
    }
    return res
  }
}

const createAppAndroidUniModulesSyncFilePreprocessorOnce = once(
  () => {
    return createUniModulesSyncFilePreprocessor('app', 'app-android')
  }
)

const createAppIosUniModulesSyncFilePreprocessorOnce = once(
  () => {
    return createUniModulesSyncFilePreprocessor('app', 'app-ios')
  }
)

module.exports = async function (content) {
  const callback = this.async()

  const uniXKotlinCompiler = getUniXKotlinCompiler()
  const uniXSwiftCompiler = getUniXSwiftCompiler()

  const {
    syncUniModuleFilesByCompiler,
    resolveTscUniModuleIndexFileName
  } = resolveUTSCompiler()

  const compilePlugin = async (pluginDir) => {
    const pluginId = path.basename(pluginDir)

    const utsPlugins = getUTSPlugins()
    const changedFiles = getChangedFiles()
    if (uniXKotlinCompiler) {
      await uniXKotlinCompiler.init()
      await syncUniModuleFilesByCompiler(
        'app-android',
        uniXKotlinCompiler,
        pluginDir,
        createAppAndroidUniModulesSyncFilePreprocessorOnce()
      )
    }

    if (uniXSwiftCompiler) {
      await uniXSwiftCompiler.init()
      await syncUniModuleFilesByCompiler(
        'app-ios',
        uniXSwiftCompiler,
        pluginDir,
        createAppIosUniModulesSyncFilePreprocessorOnce()
      )
    }

    if (!utsPlugins.has(pluginId)) {
      utsPlugins.add(pluginId)
      if (uniXKotlinCompiler) {
        const indexFileName = resolveTscUniModuleIndexFileName(
          'app-android',
          pluginDir
        )
        if (indexFileName) {
          await uniXKotlinCompiler.addRootFile(indexFileName)
        }
      }
      if (uniXSwiftCompiler) {
        const indexFileName = resolveTscUniModuleIndexFileName(
          'app-ios',
          pluginDir
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
