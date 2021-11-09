import fs from 'fs'
import path from 'path'
import { isH5CustomElement, isH5NativeTag } from '@dcloudio/uni-shared'
import {
  isInHBuilderX,
  resolveMainPathOnce,
  transformMatchMedia,
  transformTapToClick,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createDefine } from '../utils/features'
import { isSsr } from '../utils'
import { esbuildPrePlugin } from './esbuild/esbuildPrePlugin'
import { external } from './configureServer/ssr'
import { createConfigureServer } from './configureServer'

export const UniH5Plugin: UniVitePlugin = {
  name: 'vite:uni-h5',
  uni: {
    copyOptions: {
      assets: ['hybrid/html'],
    },
    compilerOptions: {
      isNativeTag: isH5NativeTag,
      isCustomElement: isH5CustomElement,
      nodeTransforms: [transformTapToClick, transformMatchMedia],
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
        entries: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
        exclude: external,
        esbuildOptions: {
          plugins: [esbuildPrePlugin()],
        },
      },
      define: createDefine(env.command, config),
      server: {
        host: true,
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
  configureServer: createConfigureServer(),
  handleHotUpdate: createHandleHotUpdate(),
  transformIndexHtml: createTransformIndexHtml(),
}
