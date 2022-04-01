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
  const cdn = getShadowCdn()
  return `${tagName}::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(${cdn}/img/shadow-grey.png)}100%{background-image:url(${cdn}/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(${cdn}/img/shadow-grey.png)}100%{background-image:url(${cdn}/img/shadow-grey.png)}}`
}
const cdns = {
  'mp-weixin': 1,
  'mp-alipay': 2,
  'mp-baidu': 3,
  'mp-toutiao': 4,
  'mp-qq': 5,
  'mp-360': 7,
  'mp-dingtalk': 8,
  'mp-kuaishou': 9,
  'mp-lark': 10,
  'mp-jd': 11,
  'mp-xhs': 12,
  'quickapp-webview-huawei': 200,
  'quickapp-webview-union': 201
}

function getShadowCdn () {
  const index = cdns[process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM] || ''
  return `https://cdn${index}.dcloud.net.cn`
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
  runByHBuilderX: isInHBuilderX || fs.existsSync(path.resolve(process.env.UNI_HBUILDERX_PLUGINS || '',
    'weapp-tools')),
  getFlexDirection (json) {
    let flexDir = 'column'
    if (json && json.nvue && json.nvue['flex-direction']) {
      flexDir = json.nvue['flex-direction']
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
  getMPRuntimePath () {
    if (process.env.UNI_USING_VUE3) {
      try {
        return require.resolve('@dcloudio/uni-' + process.env.UNI_PLATFORM + '/dist/uni.mp.esm.js')
      } catch (error) {
        throw new Error('Vue3 项目暂不支持当前小程序')
      }
    }
    return require.resolve('@dcloudio/uni-' + process.env.UNI_PLATFORM)
  },
  getPlatformVue (vueOptions) {
    if (uniPluginOptions.vue) {
      return uniPluginOptions.vue
    }
    if (process.env.UNI_USING_VUE3) {
      return '@dcloudio/uni-mp-vue'
    }
    return '@dcloudio/vue-cli-plugin-uni/packages/mp-vue'
  },
  getPlatformCssVars () {
    return uniPluginOptions.cssVars || {}
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
    if (process.env.UNI_PLATFORM === 'mp-toutiao' || process.env.UNI_PLATFORM === 'mp-lark' || process.env.UNI_PLATFORM === 'mp-xhs') {
      tagName = 'image'
    }
    return `<${tagName} src="${getShadowCdn()}/img/shadow-${colorType}.png" style="z-index:998;position:fixed;left:0;top:0;width:100%;height:3px;"/>`
  },
  getPlatformScss () {
    return SCSS
  },
  getPlatformSass () {
    return SASS
  },
  getPlatformStat () {
    if (!process.env.UNI_USING_STAT) {
      return ''
    }
    return process.env.UNI_USING_STAT === '2' ? 'import \'@dcloudio/uni-stat/dist/uni-cloud-stat.es.js\';'
      : 'import \'@dcloudio/uni-stat/dist/uni-stat.es.js\';'
  },
  getBabelParserOptions () {
    return {
      sourceType: 'module',
      plugins: [
        ['pipelineOperator', {
          proposal: 'minimal'
        }],
        'doExpressions',
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
