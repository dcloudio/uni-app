import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import {
  parseManifestJsonOnce,
  resolveMainPathOnce,
  UniVitePlugin,
  getNVueCompiler,
  getNVueStyleCompiler,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

export const UniAppPlugin: UniVitePlugin = {
  name: 'vite:uni-app',
  uni: {
    compilerOptions: {
      isNativeTag: isServiceNativeTag,
      isCustomElement: isServiceCustomElement,
    },
    transformEvent: {
      tap: 'click',
    },
  },
  config() {
    return {
      build: {
        rollupOptions: {
          input: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
          external: ['vue'],
          output: {
            name: 'AppService',
            format: 'iife',
            entryFileNames: 'app-service.js',
            manualChunks: undefined,
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }
  },
  configResolved(config) {
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    if (getNVueCompiler(manifestJson) === 'uni-app') {
      process.env.UNI_USING_NVUE_COMPILER = 'uni-app'
    }
    if (getNVueStyleCompiler(manifestJson) === 'uni-app') {
      process.env.UNI_USING_NVUE_STYLE_COMPILER = 'uni-app'
    }
    // 移除 vite 内置的 css post 处理
    const index = config.plugins.findIndex((p) => p.name === 'vite:css-post')
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1)
    }
  },
  resolveId(id) {
    if (id === 'vue') {
      return resolveBuiltIn('@dcloudio/uni-app-vue')
    }
  },
}
