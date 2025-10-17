const path = require('path')
const { copyMiniProgramThemeJson } = require('@dcloudio/uni-cli-shared/lib/theme')
const { getSubpackageRoots } = require('@dcloudio/uni-cli-shared/lib/pages')
const { normalizePath } = require('@dcloudio/uni-cli-shared/lib/util')

const COMPONENTS_DIR_NAME = 'ttcomponents'

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
      style: '.ttss',
      template: '.ttml',
      filter: 'sjs'
    },
    filterTag: 'sjs',
    subPackages: true,
    project: 'project.lark.json',
    darkmode: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = [COMPONENTS_DIR_NAME]
    const dirs = getSubpackageRoots().map((root) => normalizePath(path.join(root, COMPONENTS_DIR_NAME)))
    copyOptions.push(...dirs)
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/' + COMPONENTS_DIR_NAME)
    })

    copyOptions.push(copyMiniProgramThemeJson(platformOptions, vueOptions))

    return copyOptions
  }
}
