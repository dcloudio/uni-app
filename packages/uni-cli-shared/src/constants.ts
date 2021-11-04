export const PUBLIC_DIR = 'static'
export const EXTNAME_JS = ['.js', '.ts', '.jsx', '.tsx']
export const EXTNAME_VUE = ['.vue', '.nvue']
export const EXTNAME_VUE_RE = /\.(vue|nvue)$/
export const EXTNAME_JS_RE = /\.[jt]sx?$/

export const ASSETS_INLINE_LIMIT = 40 * 1024

export const BINDING_COMPONENTS = '__BINDING_COMPONENTS__'
// APP 平台解析页面后缀的优先级
export const PAGE_EXTNAME_APP = ['.nvue', '.vue', '.tsx', '.jsx', '.js']
// 其他平台解析页面后缀的优先级
export const PAGE_EXTNAME = ['.vue', '.nvue', '.tsx', '.jsx', '.js']

export const H5_API_STYLE_PATH = '@dcloudio/uni-h5/style/api/'
export const H5_FRAMEWORK_STYLE_PATH = '@dcloudio/uni-h5/style/framework/'
export const H5_COMPONENTS_STYLE_PATH = '@dcloudio/uni-h5/style/'
export const BASE_COMPONENTS_STYLE_PATH = '@dcloudio/uni-components/style/'

export const COMMON_EXCLUDE = [
  /\/pages\.json\.js$/,
  /\/manifest\.json\.js$/,
  /\/vite\//,
  /\/@vue\//,
  /\/vue-router\//,
  /\/vuex\//,
  /\/vue-i18n\//,
  /\/@dcloudio\/uni-h5-vue/,
  /\/@dcloudio\/uni-shared/,
  /\/@dcloudio\/uni-h5\/style/,
  /\/@dcloudio\/uni-components\/style/,
]
