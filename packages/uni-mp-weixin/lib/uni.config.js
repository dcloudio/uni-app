const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR_NAME = 'wxcomponents'

module.exports = {
  options: {
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    extnames: {
      style: '.wxss',
      template: '.wxml',
      filter: '.wxs'
    },
    filterTag: 'wxs',
    project: 'project.config.json',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = [
      'sitemap.json',
      'ext.json',
      'custom-tab-bar'
    ]
    const workers = platformOptions.workers
    workers && copyOptions.push(workers)

    const wxcomponentsDir = path.resolve(process.env.UNI_INPUT_DIR, COMPONENTS_DIR_NAME)
    if (fs.existsSync(wxcomponentsDir)) {
      copyOptions.push({
        from: wxcomponentsDir,
        to: COMPONENTS_DIR_NAME,
        ignore: ['**/*.vue', '**/*.css'] // v3 会自动转换生成vue,css文件，需要过滤
      })
    }
    return copyOptions
  },
  configureWebpack () {
    return {
      devtool: process.env.NODE_ENV === 'production' ? false : 'source-map'
    }
  }
}
