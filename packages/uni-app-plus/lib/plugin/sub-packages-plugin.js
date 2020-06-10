const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

function optimizeChunk(chunk) {
  if (!chunk) {
    return
  }
  const subPackages = Object.keys(process.UNI_SUBPACKAGES).map(root => `${root}/app-sub-service`)
  const chunks = Array.from(chunk.groupsIterable)[0].chunks
  Array.from(chunk.groupsIterable)[0].chunks = chunks.filter(chunk => !subPackages.includes(normalizePath(chunk.id)))
}

class SubPackagesPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('SubPackagesPlugin', compilation => {
      compilation.hooks.afterOptimizeChunkIds.tap('SubPackagesPlugin', chunks => {
        optimizeChunk(chunks.find(chunk => chunk.id === 'app-service'))
      })
    })
  }
}

module.exports = SubPackagesPlugin
