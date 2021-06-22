import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { resolveMainPathOnce, UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'

const UniAppPlugin: UniVitePlugin = {
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
}

export default [
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  UniAppPlugin,
]
