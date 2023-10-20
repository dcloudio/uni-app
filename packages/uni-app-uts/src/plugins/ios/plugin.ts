import fs from 'fs-extra'
import {
  APP_SERVICE_FILENAME,
  UniVitePlugin,
  emptyDir,
  polyfillCode,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { createUniOptions } from '../utils'
import type { Plugin } from 'vite'

const REMOVED_PLUGINS = [
  'vite:build-metadata',
  'vite:modulepreload-polyfill',
  'vite:css',
  'vite:esbuild',
  'vite:wasm-helper',
  'vite:worker',
  // 'vite:asset', // replace
  'vite:wasm-fallback',
  'vite:define',
  'vite:css-post',
  'vite:build-html',
  'vite:html-inline-proxy',
  'vite:worker-import-meta-url',
  'vite:asset-import-meta-url',
  'vite:force-systemjs-wrap-complete',
  'vite:watch-package-data',
  'commonjs',
  'vite:data-uri',
  'vite:dynamic-import-vars',
  'vite:import-glob',
  'vite:build-import-analysis',
  'vite:esbuild-transpile',
  'vite:terser',
  'vite:reporter',
]

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
          assetsInlineLimit: 0,
          rollupOptions: {
            input: resolveMainPathOnce(inputDir),
            external: ['vue', '@vue/shared'],
            output: {
              name: 'AppService',
              banner: polyfillCode,
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
      const plugins = config.plugins as Plugin[]
      const len = plugins.length
      for (let i = len - 1; i >= 0; i--) {
        const plugin = plugins[i]
        if (REMOVED_PLUGINS.includes(plugin.name)) {
          plugins.splice(i, 1)
        }
      }
    },
  }
}
