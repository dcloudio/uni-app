const path = require('path')
const {
  parseJson
} = require('@dcloudio/uni-cli-shared/lib/json')

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
      template: '.xhsml',
      filter: '.sjs'
    },
    filterTag: 'sjs',
    project: 'project.config.json',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = [
      'xhscomponents',
      'sitemap.json',
      'project.private.config.json'
    ]
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/xhscomponents')
    })
    copyOptions.push({
      from: path.resolve(process.env.UNI_INPUT_DIR, 'ext.json'),
      transform: content => JSON.stringify(parseJson(content.toString(), true), null, 2)
    })
    return copyOptions
  }
}
