const path = require('path')
const {
  resolveUTSCompiler,
  parseUniExtApiNamespacesOnce
} = require('./uts')
module.exports = function (content) {
  const callback = this.async()
  resolveUTSCompiler().compile(path.dirname(this.resourcePath), {
    isX: false,
    isPlugin: true,
    extApis: parseUniExtApiNamespacesOnce(
      process.env.UNI_UTS_PLATFORM,
      process.env.UNI_UTS_TARGET_LANGUAGE
    ),
    sourceMap: process.env.NODE_ENV === 'development'
  }).then(result => {
    if (result) {
      result.deps.forEach((dep) => {
        this.addDependency(dep)
      })
      callback(null, result.code)
    } else {
      callback(null, '')
    }
  }).catch(err => {
    callback(err)
  })
}
