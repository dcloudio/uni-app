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

/** 每次输出统一计算模块归属，在页面、组件及固定 vendor 处停止追溯。 */
export function resolveSubpackageRoots(
  moduleIds: Iterable<string>,
  getModuleInfo: GetModuleInfo,
  inputDir: string,
  resolveVendorChunk: (id: string) => string | undefined
): Map<string, string | undefined> {
  // 未出现在 roots 中表示未知；已存在但值为 undefined 表示必须留在主包。
  const roots = new Map<string, string | undefined>()
  const dependents = new Map<string, Set<string>>()
  const pending = new Set(moduleIds)
  const queue: string[] = []
  for (const current of pending) {
    let root: string | undefined
    let boundary = !!parseIndependentRoot(current)
    if (!boundary && isUniPageUrl(current)) {
      const page = parseVirtualPagePathInfo(current)
      root = page.root
        ? undefined
        : getSubPackageRootByFilename(page.filepath, inputDir)
      boundary = true
    } else if (!boundary && isUniComponentUrl(current)) {
      const component = parseVirtualComponentPathInfo(current)
      if (!component.root) {
        const filename = normalizeMiniProgramFilename(
          path.resolve(inputDir, component.filepath),
          inputDir
        )
        // 共享组件最终位于主包，其依赖也必须留在主包。
        root = filename.startsWith('uni_modules/')
          ? resolveMiniProgramComponentPackageRoot(
              filename,
              component.packageRoot
            )
          : getSubPackageRootByFilename(filename, inputDir)
      }
      boundary = true
    }
    const info = getModuleInfo(current)
    // 已被消除的重导出模块不能固定依赖归属，动态入口及保留的模块可以。
    if (
      !boundary &&
      info &&
      (info.isIncluded !== false ||
        info.isEntry ||
        info.dynamicImporters.length)
    ) {
      const vendorChunk = resolveVendorChunk(current)
      if (vendorChunk) {
        root = getSubPackageRootByFilename(vendorChunk, inputDir)
        boundary = true
      }
    }
    const importers = info ? [...info.importers, ...info.dynamicImporters] : []
    if (boundary || !info || info.isEntry || !importers.length) {
      roots.set(current, root)
      queue.push(current)
      continue
    }
    for (const importer of importers) {
      pending.add(importer)
      let dependencies = dependents.get(importer)
      if (!dependencies) {
        dependents.set(importer, (dependencies = new Set()))
      }
      dependencies.add(current)
    }
  }
  // 归属最多从未知变为单一分包，再变为主包；每条边最多传播两次。
  // 循环内传播到稳定后再返回结果，不缓存遍历到一半的归属。
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index]
    const root = roots.get(current)
    for (const dependency of dependents.get(current) || []) {
      if (!roots.has(dependency)) {
        roots.set(dependency, root)
      } else if (roots.get(dependency) && roots.get(dependency) !== root) {
        roots.set(dependency, undefined)
      } else {
        continue
      }
      queue.push(dependency)
    }
  }
  return roots
}
