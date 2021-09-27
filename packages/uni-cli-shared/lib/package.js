const uniI18n = require('@dcloudio/uni-cli-i18n')

const PLATFORMS = [
  'h5',
  'app-plus',
  'mp-weixin',
  'mp-qq',
  'mp-baidu',
  'mp-alipay',
  'mp-toutiao'
]

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
      console.error(uniI18n.__('cliShared.requireConfigUniPlatform', { 0: `package.json->uni-app->scripts->${name}->env ` }))
      process.exit(0)
    }

    if (PLATFORMS.indexOf(scriptOptions.env.UNI_PLATFORM) === -1) {
      console.error(uniI18n.__('cliShared.supportPlatform', { 0: 'UNI_PLATFORM', 1: JSON.stringify(PLATFORMS) }))
      process.exit(0)
    }

    process.env.UNI_PLATFORM = scriptOptions.env.UNI_PLATFORM

    process.env.UNI_SCRIPT = name
    process.UNI_SCRIPT_ENV = scriptOptions.env || {}
    process.UNI_SCRIPT_DEFINE = scriptOptions.define || {}

    return scriptOptions
  }
}
