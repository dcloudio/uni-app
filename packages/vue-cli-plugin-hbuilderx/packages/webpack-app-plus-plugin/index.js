const fs = require('fs')
const path = require('path')

const {
  log,
  done
} = require('@vue/cli-shared-utils')

let serviceCompiled = true
let viewCompiled = true


const serviceChangedFiles = []
const viewChangedFiles = []

let isFirst = true
class WebpackAppPlusPlugin {
  apply(compiler) {
    if (process.env.UNI_USING_V3) {

      const chunkVersions = {}

      const entry = compiler.options.entry()
      const isAppService = entry['app-service']
      const isAppView = entry['app-view']

      compiler.hooks.beforeCompile.tapAsync('WebpackAppPlusPlugin', (params, callback) => {
        isAppService && (serviceCompiled = false)
        isAppView && (viewCompiled = false)
        callback()
      })

      compiler.hooks.emit.tapAsync('WebpackAppPlusPlugin', (compilation, callback) => {

        isAppService && (serviceChangedFiles.length = 0)
        isAppView && (viewChangedFiles.length = 0)

        const changedChunks = compilation.chunks.filter(chunk => {
          const oldVersion = chunkVersions[chunk.name]
          chunkVersions[chunk.name] = chunk.hash
          return chunk.hash !== oldVersion
        })
        changedChunks.map(chunk => {
          if (Array.isArray(chunk.files)) {
            chunk.files.forEach(file => {
              if (isAppService) {
                !serviceChangedFiles.includes(file) && (serviceChangedFiles.push(file))
              } else if (isAppView) {
                !viewChangedFiles.includes(file) && (viewChangedFiles.push(file))
              }
            })
          }
        })
        callback()
      })

      compiler.hooks.done.tapPromise('WebpackAppPlusPlugin', compilation => {
        return new Promise((resolve, reject) => {
          isAppService && (serviceCompiled = true)
          isAppView && (viewCompiled = true)

          if (serviceCompiled && viewCompiled) {
            const changedFiles = [...new Set([...serviceChangedFiles, ...viewChangedFiles])]
            if (process.env.NODE_ENV === 'development') {
              if (!isFirst && changedFiles.length > 0) {
                done(`Build complete. FILES:` + JSON.stringify(changedFiles))
              } else {
                done(`Build complete. Watching for changes...`)
              }
              isFirst = false
            } else {
              done(`Build complete. `)
            }
          }

          resolve()
        })
      })
    } else {
      compiler.hooks.done.tapPromise('WebpackAppPlusPlugin', compilation => {
        return new Promise((resolve, reject) => {

          if (process.env.UNI_USING_NATIVE) {
            return resolve()
          }

          const callback = function() {
            fs.copyFileSync(path.resolve(process.env.UNI_OUTPUT_TMP_DIR,
                'manifest.json'),
              path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'))
            log()
            if (process.env.NODE_ENV === 'development') {
              done(`Build complete. Watching for changes...`)
            } else {
              done(`Build complete. `)
            }
            resolve()
          }
          // Copy manifest.json
          const wxmp = require(path.resolve(process.env.UNI_HBUILDERX_PLUGINS,
            'weapp-tools/lib'))
          try {
            wxmp(
              process.env.UNI_OUTPUT_TMP_DIR,
              process.env.UNI_OUTPUT_DIR,
              path.basename(process.env.UNI_INPUT_DIR),
              callback
            )
          } catch (e) {
            resolve()
            console.error(e.message)
          }
        })
      })
    }
  }
}

module.exports = WebpackAppPlusPlugin
