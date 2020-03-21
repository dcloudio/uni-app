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

    if (uniAppOptions && uniAppOptions['scripts']) {
      scriptOptions = uniAppOptions['scripts'][name]
    }

    if (!scriptOptions) {
      console.error(`package.json->uni-app->scripts->${name} 不存在`)
      process.exit(0)
    }

    if (!scriptOptions.env || !scriptOptions.env.UNI_PLATFORM) {
      console.error(`package.json->uni-app->scripts->${name}->env 不存在,必须配置 env->UNI_PLATFORM 基础平台`)
      process.exit(0)
    }

    if (PLATFORMS.indexOf(scriptOptions.env.UNI_PLATFORM) === -1) {
      console.error(`UNI_PLATFORM 支持以下平台 ${JSON.stringify(PLATFORMS)}`)
      process.exit(0)
    }

    process.env.UNI_PLATFORM = scriptOptions.env.UNI_PLATFORM

    process.UNI_SCRIPT_ENV = scriptOptions.env || {}
    process.UNI_SCRIPT_DEFINE = scriptOptions.define || {}

    return scriptOptions
  }
}
