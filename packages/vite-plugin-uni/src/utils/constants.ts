// 其实应该直接通过 mainFields 来识别
export const BUILT_IN_MODULES = {
  'vue-router': {
    es: 'dist/vue-router.esm-bundler.js',
    cjs: 'dist/vue-router.cjs.js',
  },
  vuex: {
    es: 'dist/vuex.esm-bundler.js',
    cjs: 'dist/vuex.cjs.js',
  },
  '@dcloudio/uni-app': {
    es: 'dist/uni-app.es.js',
    cjs: 'dist/uni-app.cjs.js',
  },
  '@dcloudio/uni-cloud': {
    es: 'dist/uni-cloud.es.js',
    cjs: 'dist/uni-cloud.cjs.js',
  },
  '@dcloudio/uni-h5': {
    es: 'dist/uni-h5.es.js',
    cjs: 'dist/uni-h5.cjs.js',
  },
  '@dcloudio/uni-h5-vue': {
    es: 'dist/vue.runtime.esm.js',
    cjs: 'dist/vue.runtime.cjs.js',
    'es-compat': 'dist/vue.runtime.compat.esm.js',
    'cjs-compat': 'dist/vue.runtime.compat.cjs.js',
  },
  '@dcloudio/uni-i18n': {
    es: 'dist/uni-i18n.es.js',
    cjs: 'dist/uni-i18n.cjs.js',
  },
  '@dcloudio/uni-shared': {
    es: 'dist/uni-shared.es.js',
    cjs: 'dist/uni-shared.cjs.js',
  },
}
