const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const loaderUtils = require('loader-utils')
const uniI18n = require('@dcloudio/uni-cli-i18n')
const moduleAlias = require('module-alias')

require('./error-reporting')
require('../util/console')

const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

// 输出编译器版本等信息
const pagesPkg = require('@dcloudio/webpack-uni-pages-loader/package.json')
process.env.UNI_COMPILER_VERSION = ''
if (pagesPkg) {
  process.env.UNI_COMPILER_VERSION = pagesPkg['uni-app'].compilerVersion
}

const defaultInputDir = 'src'
if (process.env.UNI_INPUT_DIR && process.env.UNI_INPUT_DIR.indexOf('./') === 0) {
  process.env.UNI_INPUT_DIR = path.resolve(process.cwd(), process.env.UNI_INPUT_DIR)
}
process.env.UNI_INPUT_DIR = process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), defaultInputDir)

const {
  getManifestJson,
  isEnableUniPushV1,
  isEnableUniPushV2,
  isUniPushOffline,
  hasPushModule,
  isEnableSecureNetwork
} = require('@dcloudio/uni-cli-shared/lib/manifest')

const manifestJsonObj = getManifestJson()

process.env.UNI_APP_ID = manifestJsonObj.appid || ''
process.env.UNI_APP_NAME = manifestJsonObj.name || ''
process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || 'h5'
process.env.UNI_APP_VERSION_NAME = manifestJsonObj.versionName
process.env.UNI_APP_VERSION_CODE = manifestJsonObj.versionCode
process.env.VUE_APP_DARK_MODE = (manifestJsonObj[process.env.UNI_PLATFORM] || {}).darkmode || false

// 小程序 vue3 标记
if (process.env.UNI_PLATFORM.indexOf('mp-') === 0) {
  if (manifestJsonObj.vueVersion === '3' || manifestJsonObj.vueVersion === 3) {
    process.env.UNI_USING_VUE3 = true
    process.env.UNI_USING_VUE3_OPTIONS_API = true
  }
}
// v2 uni-push
if (isEnableUniPushV2(manifestJsonObj, process.env.UNI_PLATFORM)) {
  process.env.UNI_PUSH_V2 = true
  if (process.env.UNI_PLATFORM === 'app-plus' && isUniPushOffline(manifestJsonObj)) {
    process.env.UNI_PUSH_V2_OFFLINE = true
  }
} else if (isEnableUniPushV1(manifestJsonObj, process.env.UNI_PLATFORM)) {
  process.env.UNI_PUSH_V1 = true
}

if (hasPushModule(manifestJsonObj)) {
  process.env.UNI_PUSH_MODULE = true
}

// 初始化全局插件对象
global.uniPlugin = require('@dcloudio/uni-cli-shared/lib/plugin').init()

const platformOptions = manifestJsonObj[process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM] || {}
// 插件校验环境
global.uniPlugin.validate.forEach(validate => {
  validate(platformOptions, manifestJsonObj)
})
process.UNI_MANIFEST = manifestJsonObj

process.env.VUE_APP_NAME = manifestJsonObj.name

process.env.UNI_USING_V3_SCOPED = true

// 导出到小程序插件
process.env.UNI_MP_PLUGIN_EXPORT = JSON.stringify(Object.keys(platformOptions.plugins || {}).map(pluginName =>
  platformOptions.plugins[pluginName].export))

const isH5 = !process.env.UNI_SUB_PLATFORM && process.env.UNI_PLATFORM === 'h5'
const isProduction = process.env.NODE_ENV === 'production'

// uniCloud
if (!process.env.UNI_CLOUD_PROVIDER && process.env.UNI_CLOUD_SPACES) {
  process.env.UNI_CLOUD_PROVIDER = JSON.stringify([])
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (Array.isArray(spaces)) {
      const hasUniCloudSpace = spaces.length > 0
      if (spaces.length === 1) {
        const space = spaces[0]
        console.log(uniI18n.__('pluginUni.currentProjectDefaultSpaceId', {
          0: space.id
        }))
      }

      if (
        hasUniCloudSpace &&
        isH5 &&
        isProduction
      ) {
        console.warn(uniI18n.__('pluginUni.unicloudReleaseH5', {
          0: 'https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinh5'
        }))
      } else if (
        hasUniCloudSpace &&
        isH5 &&
        !isProduction
      ) {
        console.warn(uniI18n.__('pluginUni.unicloudShowedRunByHBuilderX', {
          0: 'https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinh5'
        }))
      }

      process.env.UNI_CLOUD_PROVIDER = JSON.stringify(spaces.map(space => {
        if (space.provider === 'tcb') {
          space.provider = 'tencent'
        }
        if (!space.provider && space.clientSecret) {
          space.provider = 'aliyun'
        }
        switch (space.provider) {
          case 'aliyun':
            return {
              provider: space.provider || 'aliyun',
              spaceName: space.name,
              spaceId: space.id,
              clientSecret: space.clientSecret,
              endpoint: space.apiEndpoint
            }
          case 'alipay': {
            return {
              provider: space.provider,
              spaceName: space.name,
              spaceId: space.id,
              spaceAppId: space.spaceAppId,
              accessKey: space.accessKey,
              secretKey: space.secretKey
            }
          }
          case 'tencent':
          default: {
            return {
              provider: space.provider,
              spaceName: space.name,
              spaceId: space.id
            }
          }
        }
      }))
    }
  } catch (e) {}
}

// 安全网络
process.env.UNI_SECURE_NETWORK_ENABLE = isEnableSecureNetwork(manifestJsonObj, process.env.UNI_PLATFORM)

// 初始化环境变量
process.env.UNI_CLI_CONTEXT = require('@dcloudio/uni-cli-shared/lib/util').getCLIContext()

const defaultOutputDir = './dist/' +
  (process.env.NODE_ENV === 'production' ? 'build' : 'dev') + '/' +
  (process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM)

process.env.UNI_OUTPUT_DEFAULT_DIR = path.resolve(process.env.UNI_CLI_CONTEXT, defaultOutputDir)
if (process.env.UNI_OUTPUT_DIR && process.env.UNI_OUTPUT_DIR.indexOf('./') === 0) {
  process.env.UNI_OUTPUT_DIR = path.resolve(process.cwd(), process.env.UNI_OUTPUT_DIR)
}

process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || 'h5'
process.env.VUE_APP_PLATFORM = process.env.UNI_PLATFORM
process.env.UNI_OUTPUT_DIR = process.env.UNI_OUTPUT_DIR || process.env.UNI_OUTPUT_DEFAULT_DIR
initUtsPlatform()

function initUtsPlatform () {
  if (process.env.UNI_APP_PLATFORM === 'android') {
    process.env.UNI_UTS_PLATFORM = 'app-android'
  }
  if (process.env.UNI_APP_PLATFORM === 'ios') {
    process.env.UNI_UTS_PLATFORM = 'app-ios'
  }
  if (process.env.UNI_PLATFORM === 'h5') {
    process.env.UNI_UTS_PLATFORM = 'web'
  } else {
    if (!process.env.UNI_UTS_PLATFORM) {
      process.env.UNI_UTS_PLATFORM = process.env.UNI_PLATFORM
    }
  }
  process.env.UNI_UTS_TARGET_LANGUAGE = 'javascript'
  if (process.env.UNI_UTS_PLATFORM === 'app-android') {
    process.env.UNI_UTS_TARGET_LANGUAGE = 'kotlin'
  } else if (process.env.UNI_UTS_PLATFORM === 'app-ios') {
    process.env.UNI_UTS_TARGET_LANGUAGE = 'swift'
  }
}

if (process.env.UNI_PLATFORM === 'app-plus') {
  process.env.UNI_OUTPUT_TMP_DIR = path.resolve(process.env.UNI_OUTPUT_DIR, '../.tmp/app-plus')
}

process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']

if (process.env.NODE_ENV === 'production') { // 发行模式,不启用 cache
  delete process.env.UNI_USING_CACHE
}

process.env.BROWSERSLIST_CONFIG = [
  path.resolve(process.env.UNI_INPUT_DIR, '.browserslistrc'),
  path.resolve(process.env.UNI_CLI_CONTEXT, 'package.json'),
  path.resolve(process.cwd(), 'package.json')
].find(file => fs.existsSync(file))

const {
  normalizePath,
  isSupportSubPackages,
  runByHBuilderX,
  getPagesJson
} = require('@dcloudio/uni-cli-shared')

process.env.RUN_BY_HBUILDERX = JSON.stringify(runByHBuilderX)

const {
  initUniModules
} = require('@dcloudio/uni-cli-shared/lib/uni_modules')

initUniModules()

const pagesJsonObj = getPagesJson()
// 读取分包
process.UNI_SUBPACKAGES = {}
if (Array.isArray(pagesJsonObj.subPackages)) {
  pagesJsonObj.subPackages.forEach(subPackage => {
    if (subPackage && subPackage.root) {
      const {
        name,
        root,
        independent
      } = subPackage
      process.UNI_SUBPACKAGES[root] = {
        name,
        root,
        independent
      }
    }
  })
}

process.UNI_PAGES = pagesJsonObj

if (manifestJsonObj.debug) {
  process.env.VUE_APP_DEBUG = true
}

process.UNI_STAT_CONFIG = {
  appid: manifestJsonObj.appid
}

// 默认启用 自定义组件模式
// if (isInHBuilderXAlpha) {
let usingComponentsAbsent = false
if (!hasOwn(platformOptions, 'usingComponents')) {
  usingComponentsAbsent = true
}
platformOptions.usingComponents = true
// }

if (process.env.UNI_PLATFORM === 'h5') {
  const optimization = platformOptions.optimization
  if (optimization) {
    // 发行模式且主动启用优化
    const treeShaking = optimization.treeShaking
    if (
      treeShaking &&
      treeShaking.enable &&
      process.env.NODE_ENV === 'production'
    ) {
      process.env.UNI_OPT_TREESHAKINGNG = true
      process.UNI_USER_APIS = new Set()
      if (Array.isArray(treeShaking.modules) && treeShaking.modules.length) {
        const {
          parseUserApis
        } = require('@dcloudio/uni-cli-shared/lib/api')
        try {
          const modules = require('@dcloudio/uni-h5/lib/modules.json')
          process.UNI_USER_APIS = parseUserApis(treeShaking.modules || [], modules)
        } catch (e) {}
      }
    }
    if (optimization.prefetch) {
      process.env.UNI_OPT_PREFETCH = true
    }
    if (optimization.preload) {
      process.env.UNI_OPT_PRELOAD = true
    }
  }
  const indexCssBuffer = fs.readFileSync(require.resolve('@dcloudio/uni-h5/dist/index.css'))
  process.env.VUE_APP_INDEX_CSS_HASH = loaderUtils.getHashDigest(indexCssBuffer, 'md5', 'hex', 8)
  let indexDarkCssBuffer = ''
  try {
    indexDarkCssBuffer = fs.readFileSync(require.resolve('@dcloudio/uni-h5/dist/index.dark.css'))
    process.env.VUE_APP_INDEX_DARK_CSS_HASH = loaderUtils.getHashDigest(indexDarkCssBuffer, 'md5', 'hex', 8)
  } catch (error) {
    process.env.VUE_APP_INDEX_DARK_CSS_HASH = ''
  }
}

if (process.env.UNI_PLATFORM === 'mp-qq') { // QQ小程序 强制自定义组件模式
  platformOptions.usingComponents = true
}

let isNVueCompiler = true
if (process.env.UNI_PLATFORM === 'app-plus') {
  if (platformOptions.nvueCompiler === 'weex') {
    isNVueCompiler = false
  }

  delete process.env.UNI_USING_CACHE
  if (platformOptions.renderer === 'native') {
    process.env.UNI_USING_V3_NATIVE = true
  } else {
    process.env.UNI_USING_V3 = true
    platformOptions.usingComponents = true
  }
  process.env.UNI_OUTPUT_TMP_DIR = ''
  // isNVueCompiler = true // v3 目前仅支持 uni-app 模式

  // v3 支持指定 js 混淆（仅发行模式）
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.UNI_USING_V3
  ) {
    const resources = platformOptions.confusion &&
      platformOptions.confusion.resources
    const resourcesKeys = resources &&
      Object.keys(resources).filter(filepath => path.extname(filepath) === '.js')
    if (resourcesKeys && resourcesKeys.length) {
      process.UNI_CONFUSION = resourcesKeys.map(filepath =>
        normalizePath(path.resolve(process.env.UNI_INPUT_DIR, filepath))
      )
    }
  }
} else { // 其他平台，待确认配置方案
  if (
    manifestJsonObj['app-plus'] &&
    manifestJsonObj['app-plus'].nvueCompiler === 'weex'
  ) {
    isNVueCompiler = false
  }
}

if (isNVueCompiler) {
  process.env.UNI_USING_NVUE_COMPILER = true
}

if (platformOptions.nvueStyleCompiler === 'uni-app') {
  process.env.UNI_USING_NVUE_STYLE_COMPILER = true
} else {
  platformOptions.nvueStyleCompiler = 'weex'
}

if (platformOptions.usingComponents === true) {
  if (process.env.UNI_PLATFORM !== 'h5') {
    process.env.UNI_USING_COMPONENTS = true
  }
  if (process.env.UNI_PLATFORM === 'app-plus') {
    process.env.UNI_USING_V8 = true
  }
}

// 兼容历史配置 betterScopedSlots
const modes = ['legacy', 'auto', 'augmented']
const scopedSlotsCompiler = !platformOptions.scopedSlotsCompiler && platformOptions.betterScopedSlots ? modes[2]
  : platformOptions.scopedSlotsCompiler
process.env.SCOPED_SLOTS_COMPILER = modes.includes(scopedSlotsCompiler) ? scopedSlotsCompiler : modes[1]
// 快手小程序、小红书小程序 抽象组件编译报错，如未指定 legacy 固定为 augmented 模式
if ((process.env.UNI_PLATFORM === 'mp-kuaishou' || process.env.UNI_PLATFORM === 'mp-xhs') && process.env
  .SCOPED_SLOTS_COMPILER !== modes[0]) {
  process.env.SCOPED_SLOTS_COMPILER = modes[2]
}
const slotMultipleInstance = !!platformOptions.slotMultipleInstance
// 配置 slotMultipleInstance 时，切换 scopedSlotsCompiler 的值 auto 为 augmented 模式
if (slotMultipleInstance && process.env.SCOPED_SLOTS_COMPILER === modes[1]) {
  process.env.SCOPED_SLOTS_COMPILER = modes[2]
}
process.env.SLOT_MULTIPLE_INSTANCE = (slotMultipleInstance).toString()

process.env.MERGE_VIRTUAL_HOST_ATTRIBUTES = (!!platformOptions.mergeVirtualHostAttributes).toString()

process.env.UNI_STATISTICS_CONFIG = '""'
process.env.UNI_STAT_UNI_CLOUD = '""'
process.env.UNI_STAT_DEBUG = '""'
if (
  process.env.UNI_USING_COMPONENTS ||
  process.env.UNI_PLATFORM === 'h5'
) { // 自定义组件模式或 h5 平台
  const uniStatistics = Object.assign(
    manifestJsonObj.uniStatistics || {},
    platformOptions.uniStatistics || {}
  )

  if (uniStatistics.enable === true) {
    const uniStatLog = (text) => {
      console.log()
      console.warn(text)
      console.log()
    }
    const version = Number(uniStatistics.version) === 2 ? '2' : '1'
    process.env.UNI_USING_STAT = version
    // 获取服务空间配置信息
    const uniCloudConfig = uniStatistics.uniCloud || {}
    process.env.UNI_STATISTICS_CONFIG = JSON.stringify(uniStatistics)
    process.env.UNI_STAT_UNI_CLOUD = JSON.stringify(uniCloudConfig)
    process.env.UNI_STAT_DEBUG = uniStatistics.debug === true ? 'true' : 'false'

    if (process.env.NODE_ENV === 'production') {
      if (!process.UNI_STAT_CONFIG.appid) {
        uniStatLog(uniI18n.__('pluginUni.uniStatisticsNoAppid', {
          0: 'https://ask.dcloud.net.cn/article/36303'
        }))
      } else {
        if (!uniStatistics.version) {
          uniStatLog(uniI18n.__('pluginUni.uniStatisticsNoVersion', {
            0: 'https://uniapp.dcloud.io/uni-stat-v2.html'
          }))
        } else {
          uniStatLog(`已开启 uni统计${uniStatistics.version}.0 版本`)
          if (version === '2') {
            uniStatLog(
              '【重要】因 HBuilderX 3.4.9 版本起，uni统计2.0 调整了安卓端 deviceId 获取方式，导致 uni统计2.0 App-Android平台部分统计数据不准确。如使用了HBuilderX 3.4.9 - 3.6.4版本且开通了uni统计2.0的应用，需要使用HBuilderX3.6.7及以上版本重新发布应用并升级 uniAdmin 云函数解决，详见：https://ask.dcloud.net.cn/article/40097'
            )
          }
        }
      }
    } else {
      if (!uniStatistics.version) {
        uniStatLog(uniI18n.__('pluginUni.uniStatisticsNoVersion', {
          0: 'https://uniapp.dcloud.io/uni-stat-v2.html'
        }))
      } else {
        uniStatLog(`已开启 uni统计${uniStatistics.version}.0 版本`)
        if (version === '2') {
          uniStatLog(
            '【重要】因 HBuilderX 3.4.9 版本起，uni统计2.0 调整了安卓端 deviceId 获取方式，导致 uni统计2.0 App-Android平台部分统计数据不准确。如使用了HBuilderX 3.4.9 - 3.6.4版本且开通了uni统计2.0的应用，需要使用HBuilderX3.6.7及以上版本重新发布应用并升级 uniAdmin 云函数解决，详见：https://ask.dcloud.net.cn/article/40097'
          )
        }
      }
    }
  }
}

if (process.env.UNI_USING_COMPONENTS) { // 是否启用分包优化
  if (platformOptions.optimization) {
    if (
      isSupportSubPackages() &&
      platformOptions.optimization.subPackages &&
      Object.keys(process.UNI_SUBPACKAGES).length
    ) {
      process.env.UNI_OPT_SUBPACKAGES = true
    }
  }
}

const warningMsg =
  usingComponentsAbsent
    ? '该应用之前可能是非自定义组件模式，目前以自定义组件模式运行。非自定义组件已于2019年11月1日起停止支持。详见：https://ask.dcloud.net.cn/article/36385'
    : 'uni-app已于2019年11月1日起停止支持非自定义组件模式 [详情](https://ask.dcloud.net.cn/article/36385)'

const needWarning = !platformOptions.usingComponents || usingComponentsAbsent
let hasNVue = false
const compileModeUrl = 'https://ask.dcloud.net.cn/article/36074'
if (process.env.UNI_USING_NATIVE || process.env.UNI_USING_V3_NATIVE) {
  const compileMode = (process.env.UNI_USING_V3_NATIVE ? '（v3）' : '') + '：' + (isNVueCompiler ? 'uni-app' : 'weex')
  console.log(uniI18n.__('pluginUni.nvueCompileModeForDetail', {
    0: compileMode,
    1: compileModeUrl
  }))
} else if (process.env.UNI_PLATFORM !== 'h5' && process.env.UNI_PLATFORM !== 'quickapp-native') {
  try {
    const info = process.env.UNI_COMPILER_VERSION
    if (process.env.UNI_PLATFORM === 'app-plus') {
      if (process.env.UNI_USING_V3) {
        console.log(info)
      } else {
        const glob = require('glob')
        hasNVue = !!glob.sync('pages/**/*.nvue', {
          cwd: process.env.UNI_INPUT_DIR
        }).length
        if (hasNVue) {
          console.log(info)
          if (needWarning) {
            console.log(warningMsg)
          }
          console.log(uniI18n.__('pluginUni.nvueCompileModeForDetail', {
            0: (isNVueCompiler ? 'uni-app' : 'weex'),
            1: compileModeUrl
          }))
        } else {
          console.log(info)
          if (needWarning) {
            console.log(warningMsg)
          }
        }
      }
    } else {
      if (needWarning) {
        console.log(warningMsg)
      }
    }
  } catch (e) {}
}
if (process.env.NODE_ENV !== 'production') { // 运行模式性能提示
  let perfMsg = uniI18n.__('pluginUni.runDebugMode')
  if (hasNVue) { // app-nvue
    perfMsg = perfMsg + uniI18n.__('pluginUni.runDebugModeNvue')
  } else if (process.env.UNI_PLATFORM.indexOf('mp-') === 0) { // 小程序
    perfMsg = perfMsg + uniI18n.__('pluginUni.runDebugModeMP')
  }
  console.log(perfMsg)
}

// 将 template-compiler 指向修订后的版本
moduleAlias.addAlias('vue-template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/vue-template-compiler')
moduleAlias.addAlias('@megalo/template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/@megalo/template-compiler')
moduleAlias.addAlias('mpvue-template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/mpvue-template-compiler')
// vue-loader
moduleAlias.addAlias('vue-loader', '@dcloudio/vue-cli-plugin-uni/packages/vue-loader')
// sass-loader
moduleAlias.addAlias('sass-loader', '@dcloudio/vue-cli-plugin-uni/packages/sass-loader')

if (process.env.UNI_USING_V3 && process.env.UNI_PLATFORM === 'app-plus') {
  moduleAlias.addAlias('./runtime/getUrl.js', '@dcloudio/vue-cli-plugin-uni/lib/app-plus/getUrl.js')
  moduleAlias.addAlias('../runtime/getUrl.js', '@dcloudio/vue-cli-plugin-uni/lib/app-plus/getUrl.js')
  moduleAlias.addAlias('vue-style-loader', '@dcloudio/vue-cli-plugin-uni/packages/app-vue-style-loader')
}

if (process.env.UNI_PLATFORM === 'h5') {
  moduleAlias.addAlias('vue-style-loader', '@dcloudio/vue-cli-plugin-uni/packages/h5-vue-style-loader')
}

if (process.env.UNI_PLATFORM === 'mp-toutiao' || process.env.UNI_PLATFORM === 'mp-lark') {
  // !important 始终带有一个空格
  moduleAlias.addAlias(
    'postcss-normalize-whitespace',
    '@dcloudio/vue-cli-plugin-uni/packages/postcss-normalize-whitespace'
  )
}

if (runByHBuilderX) {
  const oldError = console.error
  console.error = function (msg) {
    if (typeof msg === 'string' && msg.includes(
      '[BABEL] Note: The code generator has deoptimised the styling of')) {
      const filePath = msg.replace('[BABEL] Note: The code generator has deoptimised the styling of ', '').split(
        ' as ')[0]
      console.log('[' + uniI18n.__('warning') + '] `' + path.relative(process.env.UNI_INPUT_DIR, filePath) +
        '` 文件体积超过 500KB，已跳过压缩以及 ES6 转 ES5 的处理，手机端使用过大的js库影响性能。')
    } else {
      oldError.apply(console, arguments)
      // TODO 如果是首次运行遇到错误直接退出
    }
  }
}

if (
  process.env.UNI_USING_CACHE &&
  process.env.UNI_PLATFORM !== 'h5' &&
  !process.env.UNI_USING_V3 &&
  !process.env.UNI_USING_NATIVE &&
  !process.env.UNI_USING_V3_NATIVE
) { // 使用 cache, 拷贝 cache 的 json
  const cacheJsonDir = path.resolve(
    process.env.UNI_CLI_CONTEXT,
    'node_modules/.cache/uni-pages-loader/' + process.env.UNI_PLATFORM
  )
  if (!fs.existsSync(cacheJsonDir)) { //  创建 cache 目录
    mkdirp(cacheJsonDir)
  } else {
    require('@dcloudio/uni-cli-shared/lib/cache').restore()
  }
}

const {
  initAutoImportComponents,
  initAutoImportScanComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

process.UNI_AUTO_SCAN_COMPONENTS = !(pagesJsonObj.easycom && pagesJsonObj.easycom.autoscan === false)
initAutoImportComponents(pagesJsonObj.easycom)
if (process.UNI_AUTO_SCAN_COMPONENTS) {
  initAutoImportScanComponents()
}

global.uniPlugin.configureEnv.forEach(configureEnv => {
  configureEnv()
})

if (
  process.env.UNI_PLATFORM === 'h5' ||
  (
    process.env.UNI_PLATFORM === 'app-plus' &&
    process.env.UNI_USING_V3
  )
) {
  const migrate = require('@dcloudio/uni-migration')
  const wxcomponentDirs = [path.resolve(process.env.UNI_INPUT_DIR, 'wxcomponents')]
  global.uniModules.forEach(module => {
    wxcomponentDirs.push(path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules', module, 'wxcomponents'))
  })
  wxcomponentDirs.forEach(wxcomponentsDir => {
    if (fs.existsSync(wxcomponentsDir)) { // 转换 mp-weixin 小程序组件
      try {
        migrate(wxcomponentsDir, false, {
          silent: true // 不输出日志
        })
      } catch (err) {
        console.warn(err)
      }
    }
  })
}

if (process.env.UNI_PLATFORM.startsWith('mp-')) {
  console.log(uniI18n.__('pluginUni.mpBrowserKernelDifference', {
    0: 'https://uniapp.dcloud.io/matter?id=mp'
  }))
}

runByHBuilderX && console.log(uniI18n.__('compiling'))

module.exports = {
  manifestPlatformOptions: platformOptions
}
