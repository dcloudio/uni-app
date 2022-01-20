const uniI18n = require('@dcloudio/uni-cli-i18n')

function isPlainObject (a) {
  if (a === null) {
    return false
  }
  return typeof a === 'object'
}

module.exports = {
  initCustomScript (name, pkgPath) {
    const pkg = require(pkgPath)
    const uniAppOptions = pkg['uni-app']

    let scriptOptions = false

    if (uniAppOptions && uniAppOptions.scripts) {
      scriptOptions = uniAppOptions.scripts[name]
    }

    if (!scriptOptions) {
      console.error(`package.json->uni-app->scripts->${name} ${uniI18n.__('cliShared.doesNotExist')}`)
      process.exit(0)
    }

    if (!scriptOptions.env || !scriptOptions.env.UNI_PLATFORM) {
      console.error(uniI18n.__('cliShared.requireConfigUniPlatform', {
        0: `package.json->uni-app->scripts->${name}->env `
      }))
      process.exit(0)
    }

    if (isPlainObject(scriptOptions.define)) {
      Object.keys(uniAppOptions.scripts).forEach(scriptName => {
        if (scriptName !== name) {
          const define = uniAppOptions.scripts[scriptName].define
          Object.keys(define).forEach(name => {
            if (typeof scriptOptions.define[name] !== 'undefined') {
              delete define[name]
            } else {
              define[name] = false
            }
          })
          Object.assign(scriptOptions.define, define)
        }
      })
    }

    process.env.UNI_PLATFORM = scriptOptions.env.UNI_PLATFORM

    process.env.UNI_SCRIPT = name
    process.UNI_SCRIPT_ENV = scriptOptions.env || {}
    process.UNI_SCRIPT_DEFINE = scriptOptions.define || {}

    return scriptOptions
  }
}
