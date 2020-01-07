const path = require('path')

const loaderUtils = require('loader-utils')

module.exports = function(source, map) {
  const params = loaderUtils.parseQuery(this.resourceQuery)
  // v3 app-plus
  if (process.env.UNI_PLATFORM === 'app-plus' && process.env.UNI_USING_V3) {
    this.callback(
      null,
      `export default function (Component) {
${source.trim()}
}`,
      map
    )
  }
  return source
}
