export const PUBLIC_DIR = 'static'
export const EXTNAME_JS = ['.js', '.ts', '.jsx', '.tsx', '.uts']
export const EXTNAME_TS = ['.ts', '.tsx']
export const EXTNAME_VUE = ['.vue', '.nvue', '.uvue']
export const X_EXTNAME_VUE = ['.uvue', '.vue']
export const EXTNAME_VUE_TEMPLATE = ['.vue', '.nvue', '.uvue', '.jsx', '.tsx']
export const EXTNAME_VUE_RE = /\.(vue|nvue|uvue)$/
export const EXTNAME_JS_RE = /\.(js|jsx|ts|uts|tsx|mjs)$/
export const EXTNAME_TS_RE = /\.tsx?$/

export const SPECIAL_CHARS = {
  WARN_BLOCK: '\u202A', // 警告块前后标识
  ERROR_BLOCK: '\u202B', // 错误块前后标识
}

const COMMON_EXTENSIONS = [
  '.uts',
  '.mjs',
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
]
export const extensions = COMMON_EXTENSIONS.concat(EXTNAME_VUE)

export const uni_app_x_extensions = COMMON_EXTENSIONS.concat(['.uvue', '.vue'])

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

export const X_PAGE_EXTNAME = ['.uvue', '.vue', '.tsx', '.jsx', '.js']
export const X_PAGE_EXTNAME_APP = ['.uvue', '.tsx', '.jsx', '.js']

export const H5_API_STYLE_PATH = '@dcloudio/uni-h5/style/api/'
export const H5_FRAMEWORK_STYLE_PATH = '@dcloudio/uni-h5/style/framework/'
export const H5_COMPONENTS_STYLE_PATH = '@dcloudio/uni-h5/style/'
export const BASE_COMPONENTS_STYLE_PATH = '@dcloudio/uni-components/style/'
export const X_BASE_COMPONENTS_STYLE_PATH = '@dcloudio/uni-components/style-x/'

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
