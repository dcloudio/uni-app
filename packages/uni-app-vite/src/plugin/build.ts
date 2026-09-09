import fs from 'fs'
import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'

import {
  emptyDir,
  isInHybridNVue,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { nvueOutDir } from '../utils'

export function buildOptions(
  {
    appService,
    renderer,
  }: { renderer: 'native' | undefined; appService: boolean },
  userConfig: UserConfig,
  _: ConfigEnv
): UserConfig['build'] {
  type BuildSourcemap = boolean | 'inline' | 'hidden'
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  function emptyNVueDir() {
    const nvueOutputDir = nvueOutDir()
    if (fs.existsSync(nvueOutputDir)) {
      emptyDir(nvueOutputDir)
    }
  }
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  if (renderer === 'native') {
    if (appService) {
      // 仅编译 main.js+App.vue 的时候才清空
      emptyNVueDir()
      emptyOutDir()
    }
  } else {
    if (isInHybridNVue(userConfig)) {
      emptyNVueDir()
    } else {
      emptyOutDir()
    }
  }
  const sourcemapSetting = process.env.UNI_APP_SOURCEMAP
  // false 时直接关闭 sourcemap，避免构建阶段继续生成和处理映射，能明显减少
  // rollup decode/encode 以及后续 map 合并的耗时；代价是调试定位能力下降。
  let sourcemap: BuildSourcemap = false
  if (sourcemapSetting === 'true') {
    sourcemap = 'hidden'
  } else if (sourcemapSetting === 'false') {
    sourcemap = false
  } else if (userConfig.build?.sourcemap) {
    sourcemap = 'inline'
  }
  return {
    // App 端目前仅提供 inline
    sourcemap,
    emptyOutDir: false, // 不清空输出目录，否则会影响 webpack 的输出
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: resolveMainPathOnce(inputDir),
      output: {
        sourcemapPathTransform(relativeSourcePath, sourcemapPath) {
          const sourcePath = normalizePath(
            path.relative(
              inputDir,
              path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
            )
          )
          if (sourcePath.startsWith('..')) {
            return ''
          }
          return 'uni-app:///' + sourcePath
        },
        codeSplitting: true,
        chunkFileNames(chunk) {
          if (chunk.isDynamicEntry && chunk.facadeModuleId) {
            const filepath = path.relative(inputDir, chunk.facadeModuleId)
            return normalizePath(
              filepath.replace(path.extname(filepath), '.js')
            )
          }
          return '[name].js'
        },
      },
    },
  }
}
