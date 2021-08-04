const path = require('path')
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
  },
  getWatchOptions () {
    return {
      ignored: [
        path.resolve(process.env.UNI_INPUT_DIR, '*.md'),
        path.resolve(process.env.UNI_INPUT_DIR, '.hbuilderx'),
        path.resolve(process.env.UNI_INPUT_DIR, '.editorconfig'),
        path.resolve(process.env.UNI_INPUT_DIR, '.gitignore'),
        path.resolve(process.env.UNI_INPUT_DIR, 'LICENSE'),
        path.resolve(process.env.UNI_INPUT_DIR, 'unpackage'),
        path.resolve(process.env.UNI_INPUT_DIR, 'uniCloud-aliyun'),
        path.resolve(process.env.UNI_INPUT_DIR, 'uniCloud-tcb'),
        path.resolve(process.env.UNI_INPUT_DIR, 'cloudfunctions-aliyun'),
        path.resolve(process.env.UNI_INPUT_DIR, 'cloudfunctions-tcb')
      ]
    }
  }
}
