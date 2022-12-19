const path = require('path')
const {
  resolveUTSCompiler
} = require('./uts')
module.exports = function (content) {
  const callback = this.async()
  resolveUTSCompiler().compile(path.dirname(this.resourcePath)).then(result => {
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
