import fs from 'fs'
import path from 'path'
import { isInHBuilderX, UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createDefine } from '../utils/features'

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
    }
  },
  configResolved(config) {
    // TODO 禁止 optimizeDeps
    ;(config as any).cacheDir = ''
  },
  handleHotUpdate: createHandleHotUpdate(),
  transformIndexHtml: createTransformIndexHtml(),
}
