const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR_NAME = 'wxcomponents'

function getComponentsCopyOption () {
  if (process.env.UNI_OUTPUT_TMP_DIR) { // TODO v3不需要，即将废弃
    const componentsDir = path.resolve(process.env.UNI_INPUT_DIR, COMPONENTS_DIR_NAME)
    if (fs.existsSync(componentsDir)) {
      return {
        from: componentsDir,
        to: COMPONENTS_DIR_NAME,
        ignore: ['**/*.vue', '**/*.css']
      }
    }
  }
}

module.exports = {
  options: {
    extnames: { // TODO v3不需要此配置
      style: '.wxss',
      template: '.wxml',
      filter: '.wxs'
    },
    filterTag: 'wxs',
    subPackages: true
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = []
    const componentsCopyOption = getComponentsCopyOption()
    if (componentsCopyOption) {
      copyOptions.push(componentsCopyOption)
    }
    copyOptions.push('hybrid/html')
    global.uniModules.forEach(module => {
      copyOptions.push('uni_modules/' + module + '/hybrid/html')
    })
    if (process.env.UNI_USING_V3) { // TODO 将仅保留v3逻辑
      copyOptions.push(path.resolve(__dirname, '../dist/view.css'))
      copyOptions.push(path.resolve(__dirname, '../dist/view.umd.min.js'))
      // TODO 后续common与v3目录应该合并
      copyOptions.push(path.resolve(__dirname, process.env.UNI_USING_NVUE_COMPILER ? '../template/common'
        : '../template/weex'))
      copyOptions.push(path.resolve(__dirname, '../template/v3'))
    }
    return copyOptions
  },
  chainWebpack (config, vueOptions) {
    const isAppService = vueOptions.pluginOptions && !!vueOptions.pluginOptions['uni-app-plus'].service
    if (isAppService) {
      const subPackages = Object.keys(process.UNI_SUBPACKAGES)
      if (process.env.UNI_OPT_SUBPACKAGES && subPackages.length) {
        config
          .plugin('uni-app-plus-subpackages')
          .use(require('./plugin/sub-packages-plugin'))
      }
    }
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        if (!args[0].terserOptions.output) {
          args[0].terserOptions.output = {}
        }
        args[0].terserOptions.output.ascii_only = true
        return args
      })
    }
  }
}
