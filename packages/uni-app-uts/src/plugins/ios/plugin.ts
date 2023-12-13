import fs from 'fs-extra'
import {
  APP_SERVICE_FILENAME,
  UniVitePlugin,
  emptyDir,
  injectCssPlugin,
  injectCssPostPlugin,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { configResolved, createUniOptions } from '../utils'
import { uniAppCssPlugin } from './css'

export function uniAppIOSPlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR

  // 开始编译时，清空输出目录
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  emptyOutDir()
  return {
    name: 'uni:app-uts',
    apply: 'build',
    uni: createUniOptions(),
    config() {
      return {
        base: '/', // 强制 base
        build: {
          emptyOutDir: false,
          assetsInlineLimit: 0,
          rollupOptions: {
            input: resolveMainPathOnce(inputDir),
            external: ['vue', '@vue/shared'],
            output: {
              name: 'AppService',
              banner: ``,
              format: 'iife',
              entryFileNames: APP_SERVICE_FILENAME,
              globals: {
                vue: 'Vue',
                '@vue/shared': 'uni.VueShared',
              },
            },
          },
        },
      }
    },
    configResolved(config) {
      configResolved(config)
      injectCssPlugin(config)
      injectCssPostPlugin(config, uniAppCssPlugin())
    },
  }
}
