export * from './cssScoped'
export * from './copy'
export * from './inject'
export * from './mainJs'
export * from './jsonJs'
export * from './console'
export * from './dynamicImportPolyfill'
export * from './uts/uni_modules'
export * from './uts/uvue'
export * from './uts/ext-api'
export * from './easycom'
export * from './json'
export * from './pre'
export * from './sourceMap'
export { uniViteSfcSrcImportPlugin } from './sfc'

export { assetPlugin, parseAssets, getAssetHash } from './vitejs/plugins/asset'
export {
  isCSSRequest,
  cssPlugin,
  cssPostPlugin,
  minifyCSS,
  cssLangRE,
  commonjsProxyRE,
  rewriteScssReadFileSync,
  getCssDepMap,
} from './vitejs/plugins/css'

export {
  generateCodeFrame,
  locToStartAndEnd,
  offsetToStartAndEnd,
} from './vitejs/utils'
