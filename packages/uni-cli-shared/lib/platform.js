const fs = require('fs')
const path = require('path')

const {
  normalizePath
} = require('./util')

const {
  SCSS,
  SASS
} = require('./scss')

const uniRuntime = '@dcloudio/vue-cli-plugin-uni/packages/mp-vue'
const mpvueRuntime = '@dcloudio/vue-cli-plugin-uni/packages/mpvue'
const megaloRuntime = '@dcloudio/vue-cli-plugin-uni/packages/megalo'

const uniCompiler = '@dcloudio/uni-template-compiler'
const mpvueCompiler = '@dcloudio/vue-cli-plugin-uni/packages/mpvue-template-compiler'
const megaloCompiler = '@megalo/template-compiler'

function getShadowCss () {
  let tagName = 'page'
  if (process.env.UNI_PLATFORM === 'h5') {
    tagName = 'body'
  }
  return `${tagName}::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}`
}

function getCopyOption (file, options) {
  if (file === 'wxcomponents') {
    if (!options) {
      options = {}
    }
    // 不拷贝vue,css(这些可能是 uni-migration 转换二来的)
    options.ignore = ['**/*.vue', '**/*.css']
  }
  if (path.isAbsolute(file)) {
    if (fs.existsSync(file)) {
      return Object.assign({
        from: file,
        to: path.resolve(process.env.UNI_OUTPUT_DIR)
      }, options)
    }
  }
  const from = path.resolve(process.env.UNI_INPUT_DIR, file)
  if (fs.existsSync(from)) {
    return Object.assign({
      from,
      to: path.resolve(process.env.UNI_OUTPUT_DIR, file)
    }, options)
  }
}

function getCopyOptions (files, options = {}, subPackages = true) {
  const copyOptions = []
  files.forEach(file => {
    // 主包
    const copyOption = getCopyOption(file, options)
    if (copyOption) {
      copyOptions.push(copyOption)
    }
    if (subPackages) {
      // 分包
      Object.keys(process.UNI_SUBPACKAGES).forEach(root => { // 分包静态资源
        const subCopyOption = getCopyOption(path.join(root, file), options)
        if (subCopyOption) {
          copyOptions.push(subCopyOption)
        }
      })
    }
  })
  return copyOptions
}

function getStaticCopyOptions (assetsDir) {
  const ignore = []

  Object.keys(PLATFORMS).forEach(platform => {
    if (process.env.UNI_PLATFORM !== platform) {
      ignore.push(platform + '/**/*')
    }
  })

  return getCopyOptions(
    [assetsDir], {
      ignore
    }
  )
}

const PLATFORMS = {
  'h5': {
    global: '',
    exts: false,
    vue: '@dcloudio/vue-cli-plugin-uni/packages/h5-vue',
    compiler: false,
    megalo: false,
    filterTag: 'wxs',
    subPackages: false,
    cssVars: {
      '--status-bar-height': '0px'
    },
    copyWebpackOptions ({
      assetsDir
    }) {
      const indexCssCopyOptions = [{
        from: require.resolve('@dcloudio/uni-h5/dist/index.css'),
        to: assetsDir,
        transform (content) {
          if (process.env.NODE_ENV === 'production') {
            return content + getShadowCss()
          }
          return content
        }
      }]
      const VUE_APP_INDEX_CSS_HASH = process.env.VUE_APP_INDEX_CSS_HASH
      if (VUE_APP_INDEX_CSS_HASH) {
        const {
          getH5Options
        } = require('./manifest')
        const {
          template
        } = getH5Options()
        const to = path.join(assetsDir, `[name].${VUE_APP_INDEX_CSS_HASH}.[ext]`)
        if (process.env.NODE_ENV === 'production') {
          const templateContent = fs.readFileSync(template, { encoding: 'utf8' })
          if (/\bVUE_APP_INDEX_CSS_HASH\b/.test(templateContent)) {
            indexCssCopyOptions[0].to = to
          }
        } else {
          const indexCssCopyOption = Object.assign({}, indexCssCopyOptions[0])
          indexCssCopyOption.to = to
          indexCssCopyOptions.push(indexCssCopyOption)
        }
      }
      return [
        ...getStaticCopyOptions(assetsDir),
        ...indexCssCopyOptions,
        ...getCopyOptions(['hybrid/html'])
      ]
    }
  },
  'app-plus': {
    global: 'wx',
    exts: {
      style: '.wxss',
      template: '.wxml',
      filter: '.wxs'
    },
    vue: mpvueRuntime,
    compiler: mpvueCompiler,
    megalo: false,
    filterTag: 'wxs',
    subPackages: false,
    cssVars: {},
    copyWebpackOptions ({
      assetsDir,
      vueOptions
    }) {
      if (
        vueOptions &&
        vueOptions.pluginOptions &&
        vueOptions.pluginOptions['uni-app-plus'] &&
        vueOptions.pluginOptions['uni-app-plus']['view']
      ) { // app-view 无需拷贝资源(app-service 已经做了)
        return []
      }

      const files = ['hybrid/html']
      let wxcomponents = []
      if (!process.env.UNI_USING_NATIVE && !process.env.UNI_USING_V3) {
        wxcomponents = getCopyOptions(['wxcomponents'], {
          to: path.resolve(process.env.UNI_OUTPUT_TMP_DIR, 'wxcomponents')
        })
      }
      let template = []
      let view = []
      if (process.env.UNI_USING_V3) {
        view = getCopyOptions([
          require.resolve('@dcloudio/uni-app-plus/dist/view.css'),
          require.resolve('@dcloudio/uni-app-plus/dist/view.umd.min.js')
        ])
        template = [
          ...getCopyOptions([path.resolve(__dirname, '../template/common')]),
          ...getCopyOptions([path.resolve(__dirname, '../template/v3')])
        ]
      }
      return [
        ...view,
        ...template,
        ...getStaticCopyOptions(assetsDir),
        ...wxcomponents,
        ...getCopyOptions(files)
      ]
    }
  },
  'mp-qq': {
    global: 'wx',
    exts: {
      style: '.qss',
      template: '.qml',
      filter: '.wxs'
    },
    vue: mpvueRuntime,
    compiler: mpvueCompiler,
    megalo: false,
    filterTag: 'wxs',
    subPackages: true,
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    project: 'project.config.json',
    copyWebpackOptions ({
      assetsDir
    }) {
      return [
        ...getStaticCopyOptions(assetsDir),
        ...getCopyOptions(['wxcomponents'])
      ]
    }
  },
  'mp-weixin': {
    global: 'wx',
    exts: {
      style: '.wxss',
      template: '.wxml',
      filter: '.wxs'
    },
    vue: mpvueRuntime,
    compiler: mpvueCompiler,
    megalo: false,
    filterTag: 'wxs',
    subPackages: true,
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    project: 'project.config.json',
    copyWebpackOptions ({
      assetsDir,
      manifestPlatformOptions
    }) {
      const files = [
        'sitemap.json',
        'ext.json',
        'custom-tab-bar'
      ]
      if (manifestPlatformOptions.workers) {
        files.push(manifestPlatformOptions.workers)
      }
      return [
        ...getStaticCopyOptions(assetsDir),
        ...getCopyOptions(['wxcomponents']),
        ...getCopyOptions(files, {}, false)
      ]
    }
  },
  'mp-baidu': {
    global: 'swan',
    exts: {
      style: '.css',
      template: '.swan',
      filter: '.filter.js'
    },
    vue: megaloRuntime,
    compiler: megaloCompiler,
    megalo: 'swan',
    filterTag: 'filter',
    subPackages: true,
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    project: 'project.swan.json',
    copyWebpackOptions ({
      assetsDir
    }) {
      return [
        ...getStaticCopyOptions(assetsDir),
        ...getCopyOptions(['swancomponents'])
      ]
    }
  },
  'mp-alipay': {
    global: 'my',
    exts: {
      style: '.acss',
      template: '.axml',
      filter: '.sjs'
    },
    vue: megaloRuntime,
    compiler: megaloCompiler,
    megalo: 'alipay',
    filterTag: 'sjs',
    subPackages: true,
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    copyWebpackOptions ({
      assetsDir
    }) {
      return [
        ...getStaticCopyOptions(assetsDir),
        ...getCopyOptions(['mycomponents'])
      ]
    }
  },
  'mp-toutiao': {
    global: 'tt',
    exts: {
      style: '.ttss',
      template: '.ttml'
    },
    vue: megaloRuntime,
    compiler: megaloCompiler,
    megalo: 'tt',
    subPackages: false,
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px'
    },
    project: 'project.tt.json',
    copyWebpackOptions ({
      assetsDir
    }) {
      return [
        ...getStaticCopyOptions(assetsDir),
        ...getCopyOptions(['ttcomponents'])
      ]
    }
  }
}
// 解决 vue-cli-service lint 时 UNI_PLATFORM 不存在
process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || 'h5'

const platform = PLATFORMS[process.env.UNI_PLATFORM]

const preprocessContext = {}

Object.keys(PLATFORMS).forEach(platform => {
  preprocessContext[platform.toUpperCase()] = false
})

preprocessContext[process.env.UNI_PLATFORM.toUpperCase()] = true

preprocessContext['MP'] = false
preprocessContext['APP'] = false
preprocessContext['APP-PLUS-NVUE'] = false
preprocessContext['APP_PLUS_NVUE'] = false

preprocessContext['APP-VUE'] = false
preprocessContext['APP_VUE'] = false
preprocessContext['APP-NVUE'] = false
preprocessContext['APP_NVUE'] = false

if (process.env.UNI_PLATFORM === 'app-plus') {
  preprocessContext['APP-VUE'] = true
  preprocessContext['APP_VUE'] = true
}

if (process.env.UNI_PLATFORM.indexOf('mp-') === 0) {
  preprocessContext['MP'] = true
}

if (process.env.UNI_PLATFORM.indexOf('app-') === 0) {
  preprocessContext['APP'] = true
}

if (process.UNI_SCRIPT_DEFINE && Object.keys(process.UNI_SCRIPT_DEFINE).length) {
  Object.keys(process.UNI_SCRIPT_DEFINE).forEach(name => {
    preprocessContext[name] = process.UNI_SCRIPT_DEFINE[name]
  })
}

Object.keys(preprocessContext).forEach(platform => {
  if (platform.indexOf('-') !== -1) {
    preprocessContext[platform.replace(/-/g, '_')] = preprocessContext[platform]
  }
})

const nvuePreprocessContext = Object.assign({}, preprocessContext, {
  'APP-VUE': false,
  'APP_VUE': false,
  'APP-NVUE': true,
  'APP_NVUE': true,
  'APP-PLUS-NVUE': true,
  'APP_PLUS_NVUE': true
})

const isInHBuilderX = fs.existsSync(path.resolve(process.env.UNI_CLI_CONTEXT, 'bin/uniapp-cli.js'))

let isInHBuilderXAlpha = false

if (isInHBuilderX) {
  try {
    if (require(path.resolve(process.env.UNI_CLI_CONTEXT, '../about/package.json')).alpha) {
      isInHBuilderXAlpha = true
    }
  } catch (e) {

  }
}

let sourceRoot = false

function devtoolModuleFilenameTemplate (info) {
  if (!sourceRoot) {
    if (isInHBuilderX) {
      sourceRoot = normalizePath(process.env.UNI_INPUT_DIR)
    } else {
      sourceRoot = normalizePath(process.env.UNI_CLI_CONTEXT)
    }
  }
  let filePath = false
  const absoluteResourcePath = normalizePath(info.absoluteResourcePath)
  if (
    absoluteResourcePath.indexOf(sourceRoot) !== -1 &&
    (
      absoluteResourcePath.endsWith('.js') ||
      absoluteResourcePath.endsWith('.ts')
    )
  ) {
    filePath = normalizePath(path.relative(sourceRoot, absoluteResourcePath))
    if (
      filePath.indexOf('node_modules/@dcloudio') === 0 ||
      filePath.indexOf('node_modules/vue-loader') === 0 ||
      filePath.indexOf('node_modules/webpack') === 0
    ) {
      filePath = false
    }
  } else if (
    !info.moduleId &&
    (
      absoluteResourcePath.endsWith('.vue') ||
      absoluteResourcePath.endsWith('.nvue')
    )
  ) {
    if (
      absoluteResourcePath.indexOf('src') !== 0 &&
      absoluteResourcePath.indexOf('node-modules') !== 0
    ) {
      filePath = normalizePath(path.relative(sourceRoot, absoluteResourcePath))
    } else {
      filePath = absoluteResourcePath
    }
  }
  if (
    filePath &&
    filePath !== 'main.js' &&
    filePath !== 'main.ts' &&
    filePath !== 'src/main.js' &&
    filePath !== 'src/main.ts'
  ) {
    return `uni-app:///${filePath}`
  }
}

const NODE_MODULES_REGEX = /(\.\.\/)?node_modules/g

function normalizeNodeModules (str) {
  str = str.replace(NODE_MODULES_REGEX, 'node-modules')
  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    str = str.replace('node-modules/@', 'node-modules/npm-scope-')
  }
  return str
}

module.exports = {
  normalizeNodeModules,
  isInHBuilderX,
  isInHBuilderXAlpha,
  runByHBuilderX: isInHBuilderX || fs.existsSync(path.resolve(process.env.UNI_HBUILDERX_PLUGINS || '', 'weapp-tools')),
  devtoolModuleFilenameTemplate,
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
    return platform.subPackages
  },
  getPlatforms () {
    return Object.keys(PLATFORMS)
  },
  getPlatformCopy () {
    return platform.copyWebpackOptions
  },
  getPlatformGlobal () {
    return platform.global
  },
  getPlatformExts () {
    return platform.exts
  },
  getPlatformTarget () {
    return platform.megalo
  },
  getPlatformProject () {
    return platform.project
  },
  getPlatformFilterTag () {
    return platform.filterTag
  },
  getPlatformVue (vueOptions) {
    if (process.env.UNI_PLATFORM === 'h5' && vueOptions && vueOptions.runtimeCompiler) {
      return '@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.esm.js'
    }
    if (process.env.UNI_PLATFORM === 'app-plus' && process.env.UNI_USING_V3) {
      return '@dcloudio/uni-app-plus/dist/service.runtime.esm.js'
    }
    if (process.env.UNI_USING_COMPONENTS) {
      return uniRuntime
    }
    return platform.vue
  },
  getPlatformCompiler () {
    if (process.env.UNI_USING_COMPONENTS || process.env.UNI_PLATFORM === 'h5') {
      return require(uniCompiler)
    }
    return require(platform.compiler)
  },
  getPlatformCssVars () {
    return platform.cssVars
  },
  getPlatformCssnano () {
    return {
      calc: false,
      orderedValues: false,
      mergeLonghand: false,
      mergeRules: false,
      cssDeclarationSorter: false,
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
  }
}
