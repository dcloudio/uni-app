import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isUniPageFile } from '../json/pages'
import { requireUniHelpers } from '../utils'
import { getAssetFilenameById } from '../vite/plugins/vitejs/plugins/asset'

function initSharedDataOptions() {
  const compiler = require('@dcloudio/compiler-vapor-dom2')
  return {
    platform: process.env.UNI_UTS_PLATFORM!,
    compilerVaporDom2: compiler,
    utsCompiler: resolveUTSCompiler(),
    isUniPageFile,
    getSharedDataResult: compiler.getSharedDataResult,
    getAssetFilenameById,
  }
}
export function uniSharedDataPlugin(): Plugin {
  return requireUniHelpers().USDP(initSharedDataOptions())
}

export function initSourceFileCallback():
  | ((sourceFile: import('typescript').SourceFile) => void)
  | undefined {
  if (process.env.UNI_APP_X_DOM2 === 'true') {
    const { TSDBSF } = requireUniHelpers()
    const options = initSharedDataOptions()
    return (sourceFile) => {
      TSDBSF(sourceFile, options)
    }
  }
}
