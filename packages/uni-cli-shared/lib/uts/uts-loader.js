const path = require('path')
const {
  resolveUTSCompiler,
  parseUniExtApiNamespacesOnce
} = require('./uts')
const {
  parseUTSModuleDeps
} = require('./uni_modules')
module.exports = async function (content) {
  const callback = this.async()

  const compilePlugin = async (pluginDir) => {
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
