import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isUniPageFile } from '../json/pages'
import { requireUniHelpers } from '../utils'
import { getAssetFilenameById } from '../vite/plugins/vitejs/plugins/asset'
export function uniSharedDataPlugin(): Plugin {
  const { USDP } = requireUniHelpers()
  const compiler = require('@dcloudio/compiler-vapor-dom2')
  return USDP({
    platform: process.env.UNI_UTS_PLATFORM!,
    compilerVaporDom2: compiler,
    utsCompiler: resolveUTSCompiler(),
    isUniPageFile,
    getSharedDataResult: compiler.getSharedDataResult,
    getAssetFilenameById,
  })
}
