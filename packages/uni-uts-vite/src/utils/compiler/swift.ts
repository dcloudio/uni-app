import { isInHBuilderX, resolveSourceMapPath } from '@dcloudio/uni-cli-shared'
import { genUTSPlatformResource, getUtsCompiler, resolvePackage } from './utils'

export function parseSwiftPackage(filename: string) {
  const res = resolvePackage(filename)
  if (!res) {
    return ''
  }
  return 'UTSSDK' + (res.is_uni_modules ? 'Modules' : '') + res.name
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
  await bundle({
    target: UtsTarget.SWIFT,
    input: {
      root: inputDir,
      filename,
    },
    output: {
      outDir: outputDir,
      package: '',
      sourceMap: resolveSourceMapPath(),
      extname: 'kt',
      imports: [],
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
