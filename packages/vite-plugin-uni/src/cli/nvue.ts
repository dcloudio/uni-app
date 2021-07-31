import {
  parseManifestJsonOnce,
  getNVueCompiler,
  getNVueStyleCompiler,
} from '@dcloudio/uni-cli-shared'

function initNVueCompilerOptions() {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  const nvueCompilerOptions = {
    compiler: 'uni-app',
    styleCompiler: 'weex',
  }
  if (getNVueCompiler(manifestJson) === 'uni-app') {
    nvueCompilerOptions.compiler = 'uni-app'
  }
  if (getNVueStyleCompiler(manifestJson) === 'uni-app') {
    nvueCompilerOptions.styleCompiler = 'uni-app'
  }
  return nvueCompilerOptions
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
  const options = initNVueCompilerOptions()
  if (mode === 'prod') {
    await nvue.runWebpackBuild(options)
  } else {
    await nvue.runWebpackDev(options)
  }
}
