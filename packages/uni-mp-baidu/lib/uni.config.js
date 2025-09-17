const fs = require('fs')
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
      template: '.swan',
      filter: '.filter.js'
    },
    filterTag: 'filter',
    project: 'project.swan.json',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['swancomponents']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/swancomponents')
    })
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
