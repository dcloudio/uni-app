const createHash = require('webpack/lib/util/createHash')

module.exports = class CustomModuleIdsPlugin {
  constructor (options) {
    this.options = Object.assign({
      prefix: '',
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 4
    }, options || {})
  }

  apply (compiler) {
    const options = this.options
    compiler.hooks.compilation.tap('CustomModuleIdsPlugin', compilation => {
      const usedIds = new Set()
      compilation.hooks.beforeModuleIds.tap('CustomModuleIdsPlugin', modules => {
        for (const module of modules) {
          if (module.id !== null) {
            continue
          }
          const libIdent = module.libIdent
            ? module.libIdent({
              context: options.context || compiler.options.context
            }) : null
          let id = options.custom && options.custom(libIdent, module)
          if (!id && libIdent) {
            const hash = createHash(options.hashFunction)
            hash.update(options.prefix + libIdent)
            const hashId = (hash.digest(options.hashDigest))
            let len = options.hashDigestLength
            while (usedIds.has(hashId.substr(0, len))) len++
            id = hashId.substr(0, len)
            usedIds.add(id)
          }
          if (id) {
            module.id = id
          }
        }
      })
    })
  }
}
