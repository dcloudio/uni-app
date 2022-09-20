import { isInHBuilderX, resolveSourceMapPath } from '@dcloudio/uni-cli-shared'
import { capitalize } from '@vue/shared'
import { genUTSPlatformResource, getUtsCompiler, resolvePackage } from './utils'

function parseSwiftPackage(filename: string) {
  const res = resolvePackage(filename)
  if (!res) {
    return {
      namespace: '',
    }
  }
  const namespace =
    'UTSSDK' + (res.is_uni_modules ? 'Modules' : '') + capitalize(res.name)
  return {
    namespace,
  }
}

export async function compileSwift(filename: string) {
  // 开发阶段不编译
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    return
  }
  const { bundle, UtsTarget } = getUtsCompiler()
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // let time = Date.now()
  await bundle(UtsTarget.SWIFT, {
    input: {
      root: inputDir,
      filename,
    },
    output: {
      isPlugin: true,
      outDir: outputDir,
      package: parseSwiftPackage(filename).namespace,
      sourceMap: resolveSourceMapPath(),
      extname: 'swift',
      imports: ['DCUTSPlugin'],
      logFilename: true,
      noColor: isInHBuilderX(),
    },
  })

  genUTSPlatformResource(filename, {
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
  })
}
