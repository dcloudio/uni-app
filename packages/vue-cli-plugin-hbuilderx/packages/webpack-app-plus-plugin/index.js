const fs = require('fs')
const path = require('path')

const {
  log,
  done
} = require('@vue/cli-shared-utils')

let serviceCompiled = true
let viewCompiled = true
      
class WebpackAppPlusPlugin {
  apply(compiler) {
    if (process.env.UNI_USING_V3) {
      const isAppService = compiler.options.entry['app-service']
      const isAppView = compiler.options.entry['app-view']
      compiler.hooks.beforeCompile.tapAsync('WebpackAppPlusPlugin', (params, callback) => {
        isAppService && (serviceCompiled = false)
        isAppView && (viewCompiled = false)
        callback()
      })
      compiler.hooks.done.tapPromise('WebpackAppPlusPlugin', compilation => {
        return new Promise((resolve, reject) => {
          isAppService && (serviceCompiled = true)
          isAppView && (viewCompiled = true)

          if (serviceCompiled && viewCompiled) {
            if (process.env.NODE_ENV === 'development') {
              done(`Build complete. Watching for changes...`)
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
