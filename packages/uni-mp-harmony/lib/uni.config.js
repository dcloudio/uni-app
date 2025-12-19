const fs = require('fs')
const path = require('path')
const {
  parseJson
} = require('@dcloudio/uni-cli-shared/lib/json')

const SIGN_DIR_NAME = 'sign'
// TODO quickapp ide 有bug，不识别项目根目录 sign，暂时拷贝到 .quickapp 目录
const SIGN_OUT_DIR_NAME = '.quickapp/sign'

function getSignCopyOption () {
  const signDir = path.resolve(process.env.UNI_INPUT_DIR, SIGN_DIR_NAME)
  if (fs.existsSync(signDir)) {
    return {
      from: signDir,
      to: SIGN_OUT_DIR_NAME
    }
  }
}

module.exports = {
  options: {
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px',
      '--window-left': '0px',
      '--window-right': '0px'
    },
    extnames: {
      style: '.css',
      template: '.hxml',
      filter: '.hjs'
    },
    filterTag: 'hjs',
    subPackages: true
  },
  validate (platformOptions, manifestJson) {
    Object.assign(platformOptions, manifestJson['mp-harmony'] || {}, platformOptions)
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['ascf.config.json']
    let jsConfigPath = path.resolve(process.env.UNI_INPUT_DIR, 'jsconfig.json')
    if (!fs.existsSync(jsConfigPath)) {
      jsConfigPath = path.resolve(__dirname, 'assets/jsconfig.json')
    }
    copyOptions.push(jsConfigPath)

    const signCopyOption = getSignCopyOption()
    if (signCopyOption) {
      copyOptions.push(signCopyOption)
    }

    const extJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'ext.json')
    if (fs.existsSync(extJsonPath)) {
      copyOptions.push({
        from: extJsonPath,
        transform: content => JSON.stringify(parseJson(content.toString(), true), null, 2)
      })
    }

    return copyOptions
  }
}
