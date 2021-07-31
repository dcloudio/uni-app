import {
  parseManifestJsonOnce,
  getNVueCompiler,
  getNVueStyleCompiler,
} from '@dcloudio/uni-cli-shared'
import { getRenderer } from '../../../uni-cli-shared/dist/json/app/manifest/nvue'

export function initNVueEnv() {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  if (getRenderer(manifestJson) === 'native') {
    process.env.UNI_RENDERER = 'native'
  }
  const nvueCompiler = getNVueCompiler(manifestJson)
  if (nvueCompiler === 'uni-app') {
    process.env.UNI_NVUE_COMPILER = 'uni-app'
  } else if (nvueCompiler === 'vue') {
    process.env.UNI_NVUE_COMPILER = 'vue'
  }
  if (getNVueStyleCompiler(manifestJson) === 'uni-app') {
    process.env.UNI_NVUE_STYLE_COMPILER = 'uni-app'
  }
}

export async function runNVue(mode: 'prod' | 'dev') {
  let hasCliNVue = false
  try {
    if (require.resolve('@dcloudio/uni-cli-nvue')) {
      hasCliNVue = true
    }
  } catch (e) {}
  if (!hasCliNVue) {
    return
  }
  let nvue
  try {
    nvue = require('@dcloudio/uni-cli-nvue')
  } catch (e) {
    console.error(e)
  }
  if (!nvue) {
    return
  }
  if (process.env.UNI_NVUE_COMPILER === 'vue') {
    return
  }
  if (mode === 'prod') {
    await nvue.runWebpackBuild()
  } else {
    await nvue.runWebpackDev()
  }
}
