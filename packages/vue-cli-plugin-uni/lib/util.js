let partialIdentifier = false
module.exports = {
  getPartialIdentifier () {
    if (!partialIdentifier) {
      partialIdentifier = {
        UNI_COMPILER_VERSION: require('../package.json').version
      }
      Object.keys(process.env).forEach(name => {
        if (name.indexOf('UNI_') === 0) {
          partialIdentifier[name] = process.env[name]
        }
      })
    }
    return partialIdentifier
  }
}
