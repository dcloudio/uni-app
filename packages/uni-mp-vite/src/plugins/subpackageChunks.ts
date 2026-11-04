import path from 'path'
import type { GetModuleInfo } from 'rollup'
import {
  normalizeMiniProgramFilename,
  resolveMiniProgramComponentPackageRoot,
} from '@dcloudio/uni-cli-shared'
import {
  getSubPackageRootByFilename,
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPathInfo,
  parseVirtualPagePathInfo,
} from './entry'
import { parseIndependentRoot } from './independentUtils'

/** Resolve consumers at mini-program entry boundaries, not the synthetic App
 * imports used to discover pages. Shared modules keep one instance in main. */
export function resolveSingleSubpackage(
  id: string,
  getModuleInfo: GetModuleInfo,
  inputDir: string
): string | undefined {
  const pending = new Set([id])
  let packageRoot: string | undefined
  // Deliberately scoped to this traversal: watch builds can change ownership,
  // and caching a partial result while visiting a cycle is not sound.
  for (const current of pending) {
    if (parseIndependentRoot(current)) {
      return
    }
    let root: string | undefined
    let boundary = false
    if (isUniPageUrl(current)) {
      const page = parseVirtualPagePathInfo(current)
      if (page.root) return
      root = getSubPackageRootByFilename(page.filepath, inputDir)
      boundary = true
    } else if (isUniComponentUrl(current)) {
      const component = parseVirtualComponentPathInfo(current)
      if (component.root) return
      const filename = normalizeMiniProgramFilename(
        path.resolve(inputDir, component.filepath),
        inputDir
      )
      // Use final placement: a component shared by two subpackages lives in
      // main, so all of its synchronous dependencies must remain accessible.
      root = filename.startsWith('uni_modules/')
        ? resolveMiniProgramComponentPackageRoot(
            filename,
            component.packageRoot
          )
        : getSubPackageRootByFilename(filename, inputDir)
      boundary = true
    }
    if (boundary) {
      if (!root || (packageRoot && packageRoot !== root)) return
      packageRoot = root
      continue
    }
    const info = getModuleInfo(current)
    if (!info || info.isEntry) return
    const importers = [...info.importers, ...info.dynamicImporters]
    if (!importers.length) return
    for (const importer of importers) {
      pending.add(importer)
    }
  }
  return packageRoot
}
