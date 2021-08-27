import fs from 'fs'
import path from 'path'
import { isInHBuilderX, UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createDefine } from '../utils/features'
import { isSsr } from '../utils'
import { ViteDevServer } from 'vite'

const external = [
  '@dcloudio/uni-app',
  '@dcloudio/uni-cloud',
  '@dcloudio/uni-h5',
  '@dcloudio/uni-h5-vue',
  '@dcloudio/uni-i18n',
  '@dcloudio/uni-shared',
  '@dcloudio/uni-stat',
  '@vue/shared',
  'vue',
  'vue-i18n',
  'vue-router',
  'vuex',
]

export const UniH5Plugin: UniVitePlugin = {
  name: 'vite:uni-h5',
  uni: {
    copyOptions: {
      assets: ['hybrid/html'],
    },
    transformEvent: {
      tap: 'click',
    },
  },
  config(config, env) {
    if (isInHBuilderX()) {
      if (
        !fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'index.html'))
      ) {
        console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`)
        process.exit()
      }
    }
    return {
      optimizeDeps: {
        exclude: ['@dcloudio/uni-h5', '@dcloudio/uni-h5-vue'],
      },
      define: createDefine(env.command, config),
      server: {
        fs: {
          strict: false,
        },
      },
      ssr: {
        external,
      },
      build: {
        rollupOptions: {
          // resolveSSRExternal 会判定package.json，hbx 工程可能没有，通过 rollup 来配置
          external: isSsr(env.command, config) ? external : [],
        },
      },
    }
  },
  configResolved(config) {
    // TODO 禁止 optimizeDeps
    ;(config as any).cacheDir = ''
  },
  configureServer(server: ViteDevServer) {
    const { ssrLoadModule } = server
    let added = false
    server.ssrLoadModule = (url) => {
      const res = ssrLoadModule(url)
      if (!added) {
        // HBuilderX项目，根目录可能没有package.json，导致 ssrExternals 不生效
        added = true
        if ((server as any)._ssrExternals) {
          const { _ssrExternals } = server as unknown as {
            _ssrExternals: string[]
          }
          external.forEach((module) => {
            if (!_ssrExternals.includes(module)) {
              _ssrExternals.push(module)
            }
          })
        }
      }
      return res
    }
  },
  handleHotUpdate: createHandleHotUpdate(),
  transformIndexHtml: createTransformIndexHtml(),
}
