const {
  done
} = require('@vue/cli-shared-utils')

class WebpackAppPlusNVuePlugin {
  apply(compiler) {

    let isFirst = !process.env.UNI_USING_NATIVE && !process.env.UNI_USING_V3_NATIVE

    const chunkVersions = {}
    const changedFiles = []
    compiler.hooks.emit.tapAsync('webpack-uni-nvue', (compilation, callback) => {
      changedFiles.length = 0
      const changedChunks = compilation.chunks.filter(chunk => {
        const oldVersion = chunkVersions[chunk.name]
        chunkVersions[chunk.name] = chunk.hash
        return chunk.hash !== oldVersion
      })
      changedChunks.map(chunk => {
        if (Array.isArray(chunk.files)) {
          chunk.files.forEach(file => {
            !changedFiles.includes(file) && (changedFiles.push(file))
          })
        }
      })
      callback()
    })
    compiler.hooks.done.tapPromise('webpack-uni-nvue', compilation => {
      return new Promise((resolve, reject) => {
        if (isFirst) {
          isFirst = false
        } else {
          if (process.env.NODE_ENV === 'development') {
            if (
              changedFiles.length > 0 &&
              !changedFiles.find(file => file === 'app-config.js' || file === 'app-service.js')
            ) {
              done(`Build complete. PAGES:` + JSON.stringify(changedFiles))
            } else {
              done(`Build complete. Watching for changes...`)
            }
          } else {
            done(`Build complete. `)
          }
        }
        resolve()
      })
    })
  }
}

module.exports = WebpackAppPlusNVuePlugin
