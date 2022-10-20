import { isInHBuilderX } from '@dcloudio/uni-cli-shared'
import { capitalize } from '@vue/shared'
import {
  genUTSPlatformResource,
  getUtsCompiler,
  moveRootIndexSourceMap,
  resolvePackage,
  resolveUTSSourceMapPath,
} from './utils'

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

export async function runSwiftProd(filename: string) {
  // 文件有可能是 app-android 里边的，因为编译到 ios 时，为了保证不报错，可能会去读取 android 下的 uts
  if (filename.includes('app-android')) {
    return
  }
  await compile(filename)
  genUTSPlatformResource(filename, {
    inputDir: process.env.UNI_INPUT_DIR,
    outputDir: process.env.UNI_OUTPUT_DIR,
    platform: 'app-ios',
    extname: '.swift',
  })
}

export async function runSwiftDev(_filename: string) {}

async function compile(filename: string) {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    return console.error('process.env.UNI_HBUILDERX_PLUGINS is not found')
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
      sourceMap: resolveUTSSourceMapPath(filename),
      extname: 'swift',
      imports: ['DCUTSPlugin'],
      logFilename: true,
      noColor: isInHBuilderX(),
    },
  })
  moveRootIndexSourceMap(filename, {
    inputDir: process.env.UNI_INPUT_DIR,
    outputDir: process.env.UNI_OUTPUT_DIR,
    platform: 'app-ios',
    extname: '.swift',
  })
}
