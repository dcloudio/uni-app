const path = require('path')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

function resolve(...args) {
  return normalizePath(path.resolve.apply(path, [__dirname, ...args]))
}

const srcPath = resolve('../../src/')
const coreApiPath = resolve('../../src/core/service/api')
const platformApiPath = resolve('../../src/platforms/' + process.env.UNI_PLATFORM + '/service/api')

const apis = require('../../src/core/helpers/apis')

process.UNI_SERVICE_API_MANIFEST = Object.create(null)

module.exports = function({
  types: t
}) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          state.file.opts.file = normalizePath(state.file.opts.filename)
          state.file.opts.isCore = state.file.opts.file.indexOf(coreApiPath) === 0
          state.file.opts.isPlatform = state.file.opts.file.indexOf(platformApiPath) === 0
        },
        exit(path, state) {
          const {
            file,
            methods,
            exports,
            isPlatform
          } = state.file.opts
          if (exports && exports.length) {
            const deps = []
            methods && methods.forEach(method => {
              deps.push(['', method])
            })
            const filepath = file.replace(srcPath, '')
            exports.forEach(exportName => {
              if (process.UNI_SERVICE_API_MANIFEST[exportName]) {
                console.warn(`API[${exportName}] 冲突:`)
                console.warn(process.UNI_SERVICE_API_MANIFEST[exportName][0])
                console.warn(filepath)
                if (isPlatform) { //  优先使用 platform
                  process.UNI_SERVICE_API_MANIFEST[exportName] = [filepath, deps]
                  console.warn(`优先使用` + filepath)
                }
              } else {
                process.UNI_SERVICE_API_MANIFEST[exportName] = [filepath, deps]
              }
            })
          }
        }
      },
      ExportNamedDeclaration(path, state) {
        const {
          file,
          isCore,
          isPlatform
        } = state.file.opts
        if ((isCore || isPlatform) && t.isFunctionDeclaration(path.node.declaration)) {
          (state.file.opts.exports || (state.file.opts.exports = [])).push(path.node.declaration.id.name)
        }
      },
      CallExpression(path, state) {
        const {
          file,
          isCore,
          isPlatform
        } = state.file.opts

        if (
          isCore &&
          path.node.callee.name === 'invokeMethod'
        ) {
          (state.file.opts.methods || (state.file.opts.methods = new Set())).add(path.node.arguments[0].value)
        }
      }
    }
  }
}
