import type { UTSBundleOptions } from '@dcloudio/uts'
import path from 'path'
import { getArkTSAutoImports, getRuntimePackageName } from './utils'
import {
  addPluginInjectApis,
  getUTSCompiler,
  normalizeUTSResult,
  resolveUTSSourceMapPath,
} from '../utils'
import { parseUTSSyntaxError } from '../stacktrace'

interface BundleArkTSOptions {
  isX: boolean
  filename: string
  rootDir: string
  outDir: string
  sourceMap?: boolean
  uni_modules?: string[]
}

export async function bundleArkTS({
  isX,
  filename,
  rootDir,
  outDir,
  sourceMap,
  uni_modules,
}: BundleArkTSOptions) {
  const runtimePackageName = getRuntimePackageName(isX)
  const buildOptions: UTSBundleOptions = {
    hbxVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
    input: {
      root: rootDir,
      filename,
      paths: {
        '@dcloudio/uni-runtime': runtimePackageName,
      },
      uniModules: uni_modules,
      parseOptions: {
        tsx: true,
        noEarlyErrors: true,
        allowComplexUnionType: true,
        allowTsLitType: true,
      },
    },
    output: {
      errorFormat: 'json',
      outDir,
      package: '',
      imports: [],
      sourceMap: sourceMap ? path.resolve(resolveUTSSourceMapPath()) : false,
      extname: '.ets',
      logFilename: false,
      isPlugin: true,
      transform: {
        autoImportExternals: getArkTSAutoImports(isX),
        uniExtApiDefaultNamespace: '@dcloudio/uni-app-x-runtime',
      },
      treeshake: {
        noSideEffects: true,
      },
    },
  }
  const { bundle, UTSTarget } = getUTSCompiler()
  const result = await bundle(UTSTarget.ARKTS, buildOptions)

  if (!result) {
    return
  }
  if (result.error) {
    throw parseUTSSyntaxError(result.error, process.env.UNI_INPUT_DIR)
  }
  normalizeUTSResult('app-harmony', result)
  const deps: string[] = [filename]
  if (process.env.NODE_ENV === 'development') {
    if (result.deps) {
      deps.push(...result.deps)
    }
  }

  if (result.inject_apis && result.inject_apis.length) {
    addPluginInjectApis(result.inject_apis)
  }
  return result
}
