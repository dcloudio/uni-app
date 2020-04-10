const fs = require('fs')
const path = require('path')

const {
  isInHBuilderX,
  isInHBuilderXAlpha,
  normalizeNodeModules
} = require('./util')

const {
  SCSS,
  SASS
} = require('./scss')

function getShadowCss () {
  let tagName = 'page'
  if (process.env.UNI_PLATFORM === 'h5') {
    tagName = 'body'
  }
  return `${tagName}::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}`
}

// 解决 vue-cli-service lint 时 UNI_PLATFORM 不存在
process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || 'h5'

const uniPluginOptions = global.uniPlugin.options || {}

const {
  vueContext: preprocessContext,
  nvueContext: nvuePreprocessContext
} = global.uniPlugin.preprocess
// TODO 暂时保留原有导出，减少影响，后续再整理一下
module.exports = {
  normalizeNodeModules,
  isInHBuilderX,
  isInHBuilderXAlpha,
  runByHBuilderX: isInHBuilderX || fs.existsSync(path.resolve(process.env.UNI_HBUILDERX_PLUGINS || '', 'weapp-tools')),
  getFlexDirection (json) {
    let flexDir = 'column'
    if (json && json['nvue'] && json['nvue']['flex-direction']) {
      flexDir = json['nvue']['flex-direction']
      const flexDirs = ['row', 'row-reverse', 'column', 'column-reverse']
      if (flexDirs.indexOf(flexDir) === -1) {
        flexDir = 'column'
      }
    }
    return flexDir
  },
  jsPreprocessOptions: {
    type: 'js',
    context: preprocessContext
  },
  cssPreprocessOptions: {
    type: 'css',
    context: preprocessContext
  },
  htmlPreprocessOptions: {
    type: 'html',
    context: preprocessContext
  },
  nvueCssPreprocessOptions: {
    type: 'css',
    context: nvuePreprocessContext
  },
  nvueJsPreprocessOptions: {
    type: 'js',
    context: nvuePreprocessContext
  },
  nvueHtmlPreprocessOptions: {
    type: 'html',
    context: nvuePreprocessContext
  },
  isSupportSubPackages () {
    return !!uniPluginOptions.subPackages
  },
  getPlatforms () {
    return global.uniPlugin.platforms
  },
  getPlatformGlobal () { // 目前仅mp-alipay有用
    return uniPluginOptions.global
  },
  getPlatformExts () { // 小程序扩展名
    return uniPluginOptions.extnames
  },
  getPlatformProject () { // 开发工具项目配置名
    return uniPluginOptions.project
  },
  getPlatformFilterTag () {
    return uniPluginOptions.filterTag
  },
  getPlatformVue (vueOptions) {
    return uniPluginOptions.vue || '@dcloudio/vue-cli-plugin-uni/packages/mp-vue'
  },
  getPlatformCssVars () {
    return uniPluginOptions.cssVars
  },
  getPlatformCssnano () {
    return {
      calc: false,
      orderedValues: false,
      mergeLonghand: false,
      mergeRules: false,
      cssDeclarationSorter: false,
      uniqueSelectors: false, // 标签排序影响头条小程序
      minifySelectors: false, // 标签排序影响头条小程序
      discardComments: false,
      discardDuplicates: false // 条件编译会导致重复
    }
  },
  getShadowCss,
  getShadowTemplate (colorType = 'grey') {
    let tagName = 'cover-image'
    if (process.env.UNI_PLATFORM === 'mp-toutiao') {
      tagName = 'image'
    }
    return `<${tagName} src="https://cdn.dcloud.net.cn/img/shadow-${colorType}.png" style="z-index:998;position:fixed;left:0;top:0;width:100%;height:3px;"/>`
  },
  getPlatformScss () {
    return SCSS
  },
  getPlatformSass () {
    return SASS
  },
  getBabelParserOptions () {
    return {
      sourceType: 'module',
      plugins: [
        'optionalChaining',
        'typescript',
        ['decorators', {
          decoratorsBeforeExport: true
        }],
        'classProperties'
      ]
    }
  }
}
