const fs = require('fs')
const path = require('path')
const uniI18n = require('@dcloudio/uni-cli-i18n')

const {
  log,
  done
} = require('@vue/cli-shared-utils')

const { showRunPrompt } = require('@dcloudio/uni-cli-shared')

let nvueCompiled = true
let serviceCompiled = true
let viewCompiled = true

const nvueChangedFiles = []
const serviceChangedFiles = []
const viewChangedFiles = []

let isFirst = true

let compiling = false
class WebpackAppPlusPlugin {
  apply (compiler) {
    if (process.env.UNI_USING_V3) {
      const chunkVersions = {}

      const entry = compiler.options.entry()
      const isAppService = !!entry['app-service']
      const isAppView = !!entry['app-view']

      const isAppNVue = !isAppService && !isAppView

      compiler.hooks.invalid.tap('WebpackAppPlusPlugin', (fileName, changeTime) => {
        if (!compiling) {
          compiling = true
          console.log(uniI18n.__('performingHotReload'))
        }
      })

      compiler.hooks.beforeCompile.tapAsync('WebpackAppPlusPlugin', (params, callback) => {
        isAppNVue && (nvueCompiled = false)
        isAppService && (serviceCompiled = false)
        isAppView && (viewCompiled = false)
        callback()
      })

      compiler.hooks.emit.tapAsync('WebpackAppPlusPlugin', (compilation, callback) => {
        compilation.chunks.forEach(chunk => {
          const oldVersion = chunkVersions[chunk.name]
          chunkVersions[chunk.name] = chunk.hash
          if (chunk.hash !== oldVersion && Array.isArray(chunk.files)) {
            chunk.files.forEach(file => {
              if (isAppService) {
                !serviceChangedFiles.includes(file) && (serviceChangedFiles.push(file))
              } else if (isAppView) {
                !viewChangedFiles.includes(file) && (viewChangedFiles.push(file))
              } else if (isAppNVue) {
                !nvueChangedFiles.includes(file) && (nvueChangedFiles.push(file))
              }
            })
          }
        })
        callback()
      })

      compiler.hooks.done.tapPromise('WebpackAppPlusPlugin', stats => {
        return new Promise((resolve, reject) => {
          isAppNVue && (nvueCompiled = true)
          isAppService && (serviceCompiled = true)
          isAppView && (viewCompiled = true)
          if (serviceCompiled && viewCompiled && nvueCompiled) {
            if (process.env.NODE_ENV === 'development') {
              const changedFiles = [...new Set([
                ...serviceChangedFiles,
                ...viewChangedFiles,
                ...nvueChangedFiles
              ])]
              let utsChangedFiles = []
              try {
                utsChangedFiles = JSON.parse(process.env.UNI_APP_UTS_CHANGED_FILES || '[]')
                if (utsChangedFiles.length) {
                  changedFiles.push(...utsChangedFiles)
                }
                process.env.UNI_APP_UTS_CHANGED_FILES = ''
              } catch (e) {}
              if (!isFirst && changedFiles.length > 0) {
                if (serviceChangedFiles.length === 0 && viewChangedFiles.length === 0 && utsChangedFiles
                  .length === 0) {
                  // 仅 nvue 页面发生变化
                  done('Build complete. PAGES:' + JSON.stringify(changedFiles))
                } else {
                  done('Build complete. FILES:' + JSON.stringify(changedFiles))
                }
              } else {
                // if (!stats.hasErrors()) {
                !process.env.UNI_AUTOMATOR_WS_ENDPOINT && done('Build complete. Watching for changes...')
                showRunPrompt()
                // };
              }
              isFirst = false
            } else {
              done('Build complete. ')
              showRunPrompt()
            }
            nvueChangedFiles.length = 0
            serviceChangedFiles.length = 0
            viewChangedFiles.length = 0
            compiling = false
          }
          resolve()
        })
      })
    } else {
      compiler.hooks.done.tapPromise('WebpackAppPlusPlugin', stats => {
        return new Promise((resolve, reject) => {
          if (process.env.UNI_USING_NATIVE || process.env.UNI_USING_V3_NATIVE) {
            return resolve()
          }

          const callback = function () {
            fs.copyFileSync(path.resolve(process.env.UNI_OUTPUT_TMP_DIR,
              'manifest.json'),
            path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'))
            log()
            if (process.env.NODE_ENV === 'development') {
              done('Build complete. Watching for changes...')
            } else {
              done('Build complete. ')
            }
            showRunPrompt()
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
