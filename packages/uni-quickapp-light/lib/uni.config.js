const fs = require('fs')
const path = require('path')

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
      '--window-bottom': '0px'
    },
    extnames: {
      style: '.css',
      template: '.qxml',
      filter: '.qjs'
    },
    filterTag: 'qjs'
  },
  validate (platformOptions, manifestJson) {
    if (!platformOptions.package) {
      console.warn('manifest.json->quickapp-light 缺少 package 配置')
    }
    if (!platformOptions.icon) {
      console.warn('manifest.json->quickapp-light 缺少 icon 配置')
    }
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = []
    let jsConfigPath = path.resolve(process.env.UNI_INPUT_DIR, 'jsconfig.json')
    if (!fs.existsSync(jsConfigPath)) {
        jsConfigPath = path.resolve(__dirname, 'assets/jsconfig.json')
    }
    copyOptions.push(jsConfigPath)

    const signCopyOption = getSignCopyOption()
    if (signCopyOption) {
      copyOptions.push(signCopyOption)
    }

    return copyOptions
  },
  configureWebpack () {
    return {
      devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map'
    }
  }
}
