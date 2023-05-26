const tags = require('./tags')

const {
  getJson,
  parseJson
} = require('./json')

const {
  getH5Options,
  getManifestJson,
  getNetworkTimeout,
  parseManifestJson
} = require('./manifest.js')

const {
  getMainEntry,
  getNVueMainEntry,
  parseEntry,
  parsePages,
  getPagesJson,
  parsePagesJson
} = require('./pages')

const {
  md5,
  hasOwn,
  hasModule,
  hashify,
  camelize,
  hyphenate,
  removeExt,
  normalizePath,
  getComponentName,
  convertStaticStyle,
  getTemplatePath,
  createSource,
  deleteAsset,
  showRunPrompt
} = require('./util')

const {
  getFlexDirection,
  getPlatformProject,
  isSupportSubPackages,
  getPlatforms,
  getPlatformScss,
  getPlatformSass,
  runByHBuilderX,
  isInHBuilderX,
  isInHBuilderXAlpha,
  getPlatformExts,
  getPlatformTarget,
  getShadowCss,
  getPlatformCssVars,
  getPlatformCssnano,
  getShadowTemplate,
  jsPreprocessOptions,
  cssPreprocessOptions,
  htmlPreprocessOptions,
  nvueJsPreprocessOptions,
  nvueCssPreprocessOptions,
  nvueHtmlPreprocessOptions,
  getPlatformGlobal,
  getPlatformStat,
  getPlatformPush,
  getPlatformUniCloud
} = require('./platform')

const uts = require('./uts')

const { parseTheme, initTheme } = require('./theme')

module.exports = {
  uts,
  md5,
  tags,
  hasOwn,
  getJson,
  parseJson,
  hashify,
  hasModule,
  camelize,
  hyphenate,
  removeExt,
  normalizePath,
  parseEntry,
  parsePages,
  getH5Options,
  getMainEntry,
  getNVueMainEntry,
  getPagesJson,
  getManifestJson,
  getNetworkTimeout,
  runByHBuilderX,
  isInHBuilderX,
  isInHBuilderXAlpha,
  isSupportSubPackages,
  getPlatforms,
  getFlexDirection,
  getPlatformScss,
  getPlatformSass,
  getPlatformExts,
  getPlatformTarget,
  getPlatformProject,
  getShadowCss,
  getPlatformCssVars,
  getPlatformCssnano,
  getShadowTemplate,
  parsePagesJson,
  parseManifestJson,
  getComponentName,
  convertStaticStyle,
  getTemplatePath,
  createSource,
  deleteAsset,
  showRunPrompt,
  jsPreprocessOptions,
  cssPreprocessOptions,
  htmlPreprocessOptions,
  nvueJsPreprocessOptions,
  nvueCssPreprocessOptions,
  nvueHtmlPreprocessOptions,
  getPlatformGlobal,
  getPlatformStat,
  getPlatformPush,
  getPlatformUniCloud,
  parseTheme,
  initTheme
}
