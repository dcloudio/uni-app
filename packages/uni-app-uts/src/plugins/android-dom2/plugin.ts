import {
  type UniVitePlugin,
  resolveUTSCompiler,
  uvueOutDir,
} from '@dcloudio/uni-cli-shared'

export function uniAppXAndroidEnginePlugin(): UniVitePlugin {
  const { compileVaporApp, getKotlinCompilerServer } = resolveUTSCompiler()
  const compilerServer = getKotlinCompilerServer()
  if (!compilerServer) {
    throw new Error(`项目使用了uts插件，正在安装 uts Android 运行扩展...`)
  }
  const outputDir = process.env.UNI_OUTPUT_DIR
  const uvueOutputDir = uvueOutDir('app-android')
  return {
    name: 'uni:app-x-android',
    async writeBundle() {
      if (!compilerServer) {
        return
      }
      if (
        process.env.UNI_APP_X_DOM2_CPP_CHANGED === 'true' ||
        process.env.UNI_APP_X_DOM2_KT_CHANGED === 'true'
      ) {
        await compileVaporApp({
          filename: 'index.kt',
          changed: [],
          chunks: [],
          inputDir: uvueOutputDir,
          outputDir: outputDir,
        })
      }
    },
  }
}
