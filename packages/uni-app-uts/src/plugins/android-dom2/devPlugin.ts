import {
  DEFAULT_APPID,
  type UniVitePlugin,
  parseManifestJsonOnce,
  requireUniHelpers,
  resolveUTSCompiler,
  uvueOutDir,
} from '@dcloudio/uni-cli-shared'
import path from 'path'
import fs from 'fs-extra'

export function uniAppXAndroidEngineDevPlugin(): UniVitePlugin {
  const { compileVaporApp, getKotlinCompilerServer } = resolveUTSCompiler()
  const compilerServer = getKotlinCompilerServer()
  if (!compilerServer) {
    console.error(`项目使用了uts插件，正在安装 uts Android 运行扩展...`)
    process.exit(0)
  }
  const outputDir = process.env.UNI_OUTPUT_DIR
  const uvueOutputDir = uvueOutDir('app-android')
  const { UKF } = requireUniHelpers()
  const appId =
    parseManifestJsonOnce(process.env.UNI_INPUT_DIR).appid || DEFAULT_APPID
  return {
    name: 'uni:app-x-android-dev',
    async writeBundle() {
      if (!compilerServer) {
        return
      }
      const { changed, files } = UKF()
      await compileVaporApp({
        filename: 'index.kt',
        changed: changed,
        chunks: files,
        inputDir: uvueOutputDir,
        outputDir: outputDir,
      })
      const soOutDir = process.env.UNI_APP_X_DOM2_SO_DIR!
      const res = await compilerServer.compileCpp({
        appId,
        projectPath: process.env.UNI_INPUT_DIR,
        cppPath: process.env.UNI_APP_X_DOM2_CPP_DIR!,
        outDir: soOutDir,
      })
      if (res.code) {
        throw new Error(res.msg)
      }
      const soList = res.data?.soList
      if (!soList || !soList.length) {
        return
      }
      soList.forEach((so) => {
        const soFile = path.resolve(soOutDir, so)
        const targetSoFile = path.resolve(outputDir, so)
        fs.copySync(soFile, targetSoFile)
      })
    },
  }
}
