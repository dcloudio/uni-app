import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isUniPageFile } from '../json/pages'
import { requireUniHelpers } from '../utils'
import { getAssetFilenameById } from '../vite/plugins/vitejs/plugins/asset'
export function uniSharedDataPlugin(): Plugin {
  const { USDP } = requireUniHelpers()
  const compiler = require('@dcloudio/compiler-vapor-dom2')
  return USDP({
    compilerVaporDom2: compiler,
    utsCompiler: resolveUTSCompiler(),
    isUniPageFile,
    getSharedDataResult: compiler.getSharedDataResult,
    getAssetFilenameById,
  })
}
