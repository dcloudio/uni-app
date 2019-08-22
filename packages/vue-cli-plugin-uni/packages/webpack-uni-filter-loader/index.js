const path = require('path')
const loaderUtils = require('loader-utils')
const {
  normalizeNodeModules
} = require('@dcloudio/uni-cli-shared/lib/platform')

module.exports = function(source, map) {
  const params = loaderUtils.parseQuery(this.resourceQuery)
  if (process.env.UNI_PLATFORM === 'h5') { // h5
    this.callback(
      null,
      `export default function (Component) {
       (Component.options.wxs||(Component.options.wxs={}))['${params.module}'] = (function(module){
       ${source.trim()}
       return module.exports
       })({exports:{}});
     }`,
      map
    )
  } else { // mp
    if (params.issuerPath) {
      const resourcePath = normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, this.resourcePath))
      this.emitFile(resourcePath, source)
    }
    this.callback(null, `export default {}`, map)
  }
}
