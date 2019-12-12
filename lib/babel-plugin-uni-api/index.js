const path = require('path')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

function resolve(...args) {
  return normalizePath(path.resolve.apply(path, [__dirname, ...args]))
}

const srcPath = resolve('../../src/')
const protocolPath = resolve('../../src/core/helpers/protocol')
const coreApiPath = resolve('../../src/core/service/api')
const platformApiPath = resolve('../../src/platforms/' + process.env.UNI_PLATFORM + '/service/api')

const apis = require('../apis')

process.UNI_SERVICE_API_MANIFEST = Object.create(null)
process.UNI_SERVICE_API_PROTOCOL = Object.create(null)

function parseProtocolExport({
  file,
  exports
}) {
  const filepath = file.replace(srcPath, '')
  exports.forEach(exportName => {
    if (process.UNI_SERVICE_API_PROTOCOL[exportName]) {
      console.warn(`API[${exportName}] 冲突:`)
      console.warn(process.UNI_SERVICE_API_PROTOCOL[exportName])
      console.warn(filepath)
    } else {
      process.UNI_SERVICE_API_PROTOCOL[exportName] = filepath
    }
  })
}

function parseApiExport({
  file,
  methods,
  exports,
  isPlatform
}) {
  const deps = []
  methods && methods.forEach(method => {
    deps.push(['', method])
  })
  const filepath = file.replace(srcPath, '')
  exports.forEach(exportName => {
    if (process.UNI_SERVICE_API_MANIFEST[exportName]) {
      console.warn('\n')
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

const CONTEXTS = ['VideoContext', 'MapContext', 'EditorContext']

function parseExports(node, t, file) {
  if (t.isFunctionDeclaration(node)) {
    return [node.id.name]
  } else if (
    t.isVariableDeclaration(node) &&
    node.declarations.length === 1
  ) {
    return [node.declarations[0].id.name]
  } else if (Array.isArray(node) && node.length) {
    return node.map(specifier => {
      return specifier.exported.name
    })
  } else {
    if (t.isClassDeclaration(node) && CONTEXTS.includes(node.id.name)) {
      // ignore
      return
    }
    console.warn('\n')
    console.warn(`${file} 解析 export 失败`, node)
  }
}

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
          state.file.opts.isProtocol = state.file.opts.file.indexOf(protocolPath) === 0
        },
        exit(path, state) {
          const {
            exports,
            isProtocol
          } = state.file.opts
          if (exports && exports.length) {
            if (isProtocol) {
              parseProtocolExport(state.file.opts)
            } else {
              parseApiExport(state.file.opts)
            }
          }
        }
      },
      ExportNamedDeclaration(path, state) {
        const {
          file,
          isCore,
          isPlatform,
          isProtocol
        } = state.file.opts
        if (isCore || isPlatform || isProtocol) {
          const exports = parseExports(path.node.declaration || path.node.specifiers, t, file)
          if (Array.isArray(exports)) {
            (state.file.opts.exports || (state.file.opts.exports = [])).push(...exports)
          }
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
