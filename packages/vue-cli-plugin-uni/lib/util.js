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
  },
  getAutomatorCode () {
    const automator = `@dcloudio/uni-${process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM}/dist/automator`
    return process.env.UNI_AUTOMATOR_WS_ENDPOINT ? `import '${automator}';` : ''
  }
}
