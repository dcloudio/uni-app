export const PUBLIC_DIR = 'static'
export const EXTNAME_JS = ['.js', '.ts', '.jsx', '.tsx']
export const EXTNAME_TS = ['.ts', '.tsx']
export const EXTNAME_VUE = ['.vue', '.nvue', '.uvue']
export const EXTNAME_VUE_TEMPLATE = ['.vue', '.nvue', '.jsx', '.tsx']
export const EXTNAME_VUE_RE = /\.(vue|nvue)$/
export const EXTNAME_JS_RE = /\.(js|jsx|ts|tsx|mjs)$/
export const EXTNAME_TS_RE = /\.tsx?$/

export const extensions = [
  '.uts',
  '.mjs',
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
].concat(EXTNAME_VUE)

export const PAGES_JSON_JS = 'pages-json-js'
export const PAGES_JSON_UTS = 'pages-json-uts'
export const MANIFEST_JSON_JS = 'manifest-json-js'
export const MANIFEST_JSON_UTS = 'manifest-json-uts'

export const JSON_JS_MAP = {
  'pages.json': PAGES_JSON_JS,
  'manifest.json': MANIFEST_JSON_JS,
} as const
export const ASSETS_INLINE_LIMIT = 40 * 1024

export const APP_SERVICE_FILENAME = 'app-service.js'
export const APP_CONFIG = 'app-config.js'
export const APP_CONFIG_SERVICE = 'app-config-service.js'

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

export const KNOWN_ASSET_TYPES = [
  // images
  'png',
  'jpe?g',
  'gif',
  'svg',
  'ico',
  'webp',
  'avif',

  // media
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'aac',

  // fonts
  'woff2?',
  'eot',
  'ttf',
  'otf',

  // other
  'pdf',
  'txt',
]

export const DEFAULT_ASSETS_RE = new RegExp(
  `\\.(` + KNOWN_ASSET_TYPES.join('|') + `)(\\?.*)?$`
)

export const TEXT_STYLE = ['black', 'white']
