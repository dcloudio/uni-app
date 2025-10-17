const path = require('path')
const { getSubpackageRoots } = require('@dcloudio/uni-cli-shared/lib/pages')
const { normalizePath } = require('@dcloudio/uni-cli-shared/lib/util')

const COMPONENTS_DIR_NAME = 'jdcomponents'

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
      style: '.jxss',
      template: '.jxml',
      filter: '.jds'
    },
    filterTag: 'jds',
    subPackages: true,
    project: 'project.config.json'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = [COMPONENTS_DIR_NAME, 'custom-tab-bar', 'project.config.json']
    const dirs = getSubpackageRoots().map((root) => normalizePath(path.join(root, COMPONENTS_DIR_NAME)))
    copyOptions.push(...dirs)
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/' + COMPONENTS_DIR_NAME)
    })
    return copyOptions
  }
}
