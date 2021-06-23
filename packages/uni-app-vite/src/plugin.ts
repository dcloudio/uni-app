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
        lib: {
          name: 'AppService',
          entry: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
          formats: ['iife'],
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            entryFileNames: 'app-service.js',
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }
  },
  configResolved() {
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    if (getNVueCompiler(manifestJson) === 'uni-app') {
      process.env.UNI_USING_NVUE_COMPILER = 'uni-app'
    }
    if (getNVueStyleCompiler(manifestJson) === 'uni-app') {
      process.env.UNI_USING_NVUE_STYLE_COMPILER = 'uni-app'
    }
  },
}
