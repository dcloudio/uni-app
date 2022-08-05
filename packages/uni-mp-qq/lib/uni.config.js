const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR_NAME = 'wxcomponents'

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
      style: '.qss',
      template: '.qml',
      filter: '.wxs'
    },
    filterTag: 'wxs',
    project: 'project.config.json',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const CopyWebpackPluginVersion = Number(require('copy-webpack-plugin/package.json').version.split('.')[0])
    const copyOptions = [
      // 'sitemap.json',
      // 'ext.json',
      'custom-tab-bar'
    ]
    const workers = platformOptions.workers
    workers && copyOptions.push(workers)

    const wxcomponentsDir = path.resolve(process.env.UNI_INPUT_DIR, COMPONENTS_DIR_NAME)
    const ignore = ['**/*.vue', '**/*.css'] // v3 会自动转换生成vue,css文件，需要过滤

    if (fs.existsSync(wxcomponentsDir)) {
      copyOptions.push(Object.assign({
        from: wxcomponentsDir,
        to: COMPONENTS_DIR_NAME
      }, CopyWebpackPluginVersion > 5 ? {
        globOptions: { ignore }
      } : {
        ignore
      }))
    }
    global.uniModules.forEach(module => {
      const wxcomponentsDir = path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules', module, COMPONENTS_DIR_NAME)
      if (fs.existsSync(wxcomponentsDir)) {
        copyOptions.push(Object.assign({
          from: wxcomponentsDir,
          to: 'uni_modules/' + module + '/' + COMPONENTS_DIR_NAME
        }, CopyWebpackPluginVersion > 5 ? {
          globOptions: { ignore }
        } : {
          ignore
        }))
      }
    })
    return copyOptions
  }
}
