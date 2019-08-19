const fs = require('fs')
const path = require('path')

const {
  log,
  done
} = require('@vue/cli-shared-utils')

class WebpackAppPlusPlugin {
  apply(compiler) {
    compiler.hooks.done.tapPromise('WebpackAppPlusPlugin', compilation => {
      return new Promise((resolve, reject) => {
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

        if (process.env.UNI_USING_NATIVE) {
          return resolve()
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

module.exports = WebpackAppPlusPlugin
