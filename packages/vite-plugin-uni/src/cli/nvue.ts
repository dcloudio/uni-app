import {
  parseManifestJsonOnce,
  getAppRenderer,
  getAppCodeSpliting,
  getNVueCompiler,
  getNVueStyleCompiler,
} from '@dcloudio/uni-cli-shared'

export function initNVueEnv() {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  if (getAppRenderer(manifestJson) === 'native') {
    process.env.UNI_RENDERER = 'native'
    return (
      console.error(
        `当前项目启用了纯原生渲染，请在manifest.json中切换vue版本为2之后，再重新运行。`
      ),
      process.exit(1)
    )
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
  if (getAppCodeSpliting(manifestJson)) {
    process.env.UNI_APP_CODE_SPLITING = 'true'
  }
}
