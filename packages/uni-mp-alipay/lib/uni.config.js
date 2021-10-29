const path = require('path')
const { parseJson } = require('@dcloudio/uni-cli-shared/lib/json')

module.exports = {
  options: {
    global: 'my',
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px',
      '--window-left': '0px',
      '--window-right': '0px'
    },
    extnames: {
      style: '.acss',
      template: '.axml',
      filter: '.sjs'
    },
    filterTag: 'sjs',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = ['mycomponents']
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/mycomponents')
    })

    if (process.env.UNI_MP_PLUGIN) {
      copyOptions.push({
        from: path.resolve(process.env.UNI_INPUT_DIR, 'plugin.json'),
        transform: content => JSON.stringify(parseJson(content.toString(), true))
      })
    }

    return copyOptions
  }
}
