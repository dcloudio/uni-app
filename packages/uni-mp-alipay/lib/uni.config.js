const fs = require('fs')
const path = require('path')
const {
  parseJson
} = require('@dcloudio/uni-cli-shared/lib/json')
const { getSubpackageRoots } = require('@dcloudio/uni-cli-shared/lib/pages')
const { normalizePath } = require('@dcloudio/uni-cli-shared/lib/util')

const COMPONENTS_DIR_NAME = 'mycomponents'

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
    subPackages: true,
    project: 'mini.project.json'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = [
      COMPONENTS_DIR_NAME,
      'customize-tab-bar',
      'preload.json',
      'sitemap.json'
    ]
    const dirs = getSubpackageRoots().map((root) => normalizePath(path.join(root, COMPONENTS_DIR_NAME)))
    copyOptions.push(...dirs)
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/' + COMPONENTS_DIR_NAME)
    })
    const extJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'ext.json')
    if (fs.existsSync(extJsonPath)) {
      copyOptions.push({
        from: extJsonPath,
        transform: content => JSON.stringify(parseJson(content.toString(), true), null, 2)
      })
    }
    if (process.env.UNI_MP_PLUGIN) {
      copyOptions.push({
        from: path.resolve(process.env.UNI_INPUT_DIR, 'plugin.json'),
        transform: content => JSON.stringify(parseJson(content.toString(), true))
      })
    }
    return copyOptions
  }
}
