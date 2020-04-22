const fs = require('fs')
const path = require('path')

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
    const jsConfigPath = path.resolve(process.env.UNI_INPUT_DIR, 'jsconfig.json')
    if (fs.existsSync(jsConfigPath)) {
      return [jsConfigPath]
    }
    return [path.resolve(__dirname, 'assets/jsconfig.json')]
  },
  configureWebpack () {
    return {
      devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map'
    }
  }
}
