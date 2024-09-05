const path = require('path')
const fs = require('fs-extra')
const {
  resolveUTSCompiler
} = require('./uts')
const {
  normalizePath
} = require('../util')
const {
  runByHBuilderX
} = require('../platform')

class WebpackUTSPlugin {
  apply (compiler) {
    compiler.hooks.watchRun.tapAsync('WatchRun', (comp, done) => {
      let changedFileNames = []
      if (comp.modifiedFiles) { // webpack5
        changedFileNames = Array.from(comp.modifiedFiles)
      } else if (comp.watchFileSystem?.watcher?.mtimes) { // webpack4
        changedFileNames = Object.keys(comp.watchFileSystem.watcher.mtimes)
      }
      if (changedFileNames.length) {
        // console.log('====================================')
        // console.log('NEW BUILD FILES CHANGED:', changedFileNames)
        // console.log('====================================')
        const uniModulesDir = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules'))
        changedFileNames.forEach(fileName => {
          fileName = normalizePath(fileName)
          if (fileName.startsWith(uniModulesDir)) {
            // 仅处理uni_modules中的文件
            const plugin = fileName.slice(uniModulesDir.length + 1).split('/')[0]
            if (utsPlugins.has(plugin)) {
              const changeFile = {
                fileName,
                event: 'update' // 写死 update
              }
              if (!changedFiles.has(plugin)) {
                changedFiles.set(plugin, [changeFile])
              } else {
                changedFiles.get(plugin).push(changeFile)
              }
            }
          }
        })
      }
      return done()
    })
    compiler.hooks.done.tapPromise('webpack-uts-done', async () => {
      if (process.env.NODE_ENV !== 'development') {
        if (uniXKotlinCompiler) {
          await uniXKotlinCompiler.close()
        }
        if (uniXSwiftCompiler) {
          await uniXSwiftCompiler.close()
        }
      }
    })
  }
}
let uniXKotlinCompiler = null
let uniXSwiftCompiler = null
const utsPlugins = new Set()
const changedFiles = new Map()

function getUTSPlugins () {
  return utsPlugins
}

function getChangedFiles () {
  return changedFiles
}

function getUniXKotlinCompiler () {
  if (uniXKotlinCompiler) {
    return uniXKotlinCompiler
  }
  const {
    createUniXKotlinCompilerOnce
  } = resolveUTSCompiler()

  uniXKotlinCompiler = runByHBuilderX && process.env.UNI_APP_X_TSC === 'true' &&
    (process.env.UNI_UTS_PLATFORM === 'app-android' ||
      process.env.UNI_UTS_PLATFORM === 'app' ||
      process.env.UNI_UTS_PLATFORM === 'app-plus')
    ? createUniXKotlinCompilerOnce()
    : null
  if (uniXKotlinCompiler) {
    const tscDir = path.resolve(process.env.UNI_OUTPUT_DIR, '../.tsc/app-android')
    const uvueDir = path.resolve(process.env.UNI_OUTPUT_DIR, '../.uvue/app-android')
    try {
      if (fs.existsSync(tscDir)) {
        fs.emptyDirSync(tscDir)
      }
      if (fs.existsSync(uvueDir)) {
        fs.emptyDirSync(uvueDir)
      }
    } catch (e) {}
  }
  return uniXKotlinCompiler
}

function getUniXSwiftCompiler () {
  if (uniXSwiftCompiler) {
    return uniXSwiftCompiler
  }
  const {
    createUniXSwiftCompilerOnce
  } = resolveUTSCompiler()

  uniXSwiftCompiler =
    runByHBuilderX && process.env.UNI_APP_X_TSC === 'true' &&
    (process.env.UNI_UTS_PLATFORM === 'app-ios' ||
      process.env.UNI_UTS_PLATFORM === 'app' ||
      process.env.UNI_UTS_PLATFORM === 'app-plus')
      ? createUniXSwiftCompilerOnce()
      : null

  if (uniXSwiftCompiler) {
    const tscDir = path.resolve(process.env.UNI_OUTPUT_DIR, '../.tsc/app-ios')
    const uvueDir = path.resolve(process.env.UNI_OUTPUT_DIR, '../.uvue/app-ios')
    try {
      if (fs.existsSync(tscDir)) {
        fs.emptyDirSync(tscDir)
      }
      if (fs.existsSync(uvueDir)) {
        fs.emptyDirSync(uvueDir)
      }
    } catch (e) {}
  }
  return uniXSwiftCompiler
}
module.exports = {
  getUTSPlugins,
  getChangedFiles,
  getUniXKotlinCompiler,
  getUniXSwiftCompiler,
  WebpackUTSPlugin
}
