import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isUniPageFile } from '../json/pages'
import { requireUniHelpers } from '../utils'
import { getAssetFilenameById } from '../vite/plugins/vitejs/plugins/asset'
import { isUniAppXAndroidJsEngine, isUniAppXAndroidNative } from '../x'
import { parseUniXAppAndroidPackage } from '../json/uni-x/manifest'
import { parseManifestJsonOnce } from '../json/manifest'

function initSharedDataOptions() {
  const compiler = require('@dcloudio/compiler-vapor-dom2')
  const manifest = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  return {
    platform: process.env.UNI_UTS_PLATFORM!,
    compilerVaporDom2: compiler,
    utsCompiler: resolveUTSCompiler(),
    isUniPageFile,
    getSharedDataResult: compiler.getSharedDataResult,
    getAssetFilenameById,
    uvueScriptEngine: isUniAppXAndroidNative() ? 'native' : 'js',
    compilerVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
    androidOptions: isUniAppXAndroidJsEngine()
      ? {
          package: parseUniXAppAndroidPackage(manifest.appid),
        }
      : undefined,
  }
}
export function uniSharedDataPlugin(): Plugin {
  return requireUniHelpers().USDP(initSharedDataOptions())
}

export function initSourceFileCallback():
  | ((sourceFile: import('typescript').SourceFile) => void)
  | undefined {
  if (process.env.UNI_APP_X_DOM2 === 'true' && isUniAppXAndroidNative()) {
    const { TSDBSF } = requireUniHelpers()
    const options = initSharedDataOptions()
    return (sourceFile) => {
      TSDBSF(sourceFile, options)
    }
  }
}

export function initUts2jsSharedDataOptions() {
  if (process.env.UNI_APP_X_DOM2 === 'true') {
    return {
      resolveFieldMeta: require('@dcloudio/compiler-vapor-dom2')
        .resolveSharedDataMeta,
    }
  }
}
