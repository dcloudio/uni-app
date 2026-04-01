import {
  DEFAULT_APPID,
  type UniVitePlugin,
  parseManifestJsonOnce,
  resolveUTSCompiler,
} from '@dcloudio/uni-cli-shared'

export function uniAppXIOSEnginePlugin(): UniVitePlugin {
  const { getSwiftCompilerServer } = resolveUTSCompiler()
  const compilerServer = getSwiftCompilerServer()
  if (!compilerServer) {
    throw new Error(`项目使用了uts插件，正在安装 uts iOS 运行扩展...`)
  }
  if (compilerServer.checkEnv) {
    const { code, msg } = compilerServer.checkEnv()
    if (code) {
      console.error(msg)
    }
  }
  const appId =
    parseManifestJsonOnce(process.env.UNI_INPUT_DIR).appid || DEFAULT_APPID
  return {
    name: 'uni:app-x-ios',
    async writeBundle() {
      if (!compilerServer) {
        return
      }
      if (process.env.UNI_APP_X_DOM2_CPP_CHANGED === 'true') {
        const res = await compilerServer.compileCpp({
          appId,
          projectPath: process.env.UNI_INPUT_DIR,
          cppPath: process.env.UNI_APP_X_DOM2_CPP_DIR!,
        })
        if (res.code) {
          throw new Error(res.msg)
        }
      }
    },
  }
}
