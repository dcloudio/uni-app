import path from 'path'
import BuiltinModule from 'module'
import { once } from '@dcloudio/uni-shared'
import { resolveBuiltIn } from '../resolve'
import { isWindows } from '../utils'
import { isInHBuilderX } from './utils'

export { isInHBuilderX } from './utils'

export const runByHBuilderX = once(() => {
  return (
    !!process.env.UNI_HBUILDERX_PLUGINS &&
    (!!process.env.RUN_BY_HBUILDERX || !!process.env.HX_Version)
  )
})

/**
 * 增加 node_modules
 */
export function initModulePaths() {
  if (!isInHBuilderX()) {
    return
  }
  const Module =
    module.constructor.length > 1 ? module.constructor : BuiltinModule

  const nodeModulesPath = path.resolve(
    process.env.UNI_CLI_CONTEXT,
    'node_modules'
  )

  const oldNodeModulePaths = (Module as any)._nodeModulePaths
  ;(Module as any)._nodeModulePaths = function (from: string) {
    const paths = oldNodeModulePaths.call(this, from) as string[]
    if (!paths.includes(nodeModulesPath)) {
      paths.push(nodeModulesPath)
    }
    return paths
  }
}

function resolveEsbuildModule(name: string) {
  try {
    return path.dirname(
      require.resolve(name + '/package.json', {
        paths: [path.dirname(resolveBuiltIn('esbuild/package.json'))],
      })
    )
  } catch (e) {}
  return ''
}

export function fixBinaryPath() {
  // cli 工程在 HBuilderX 中运行
  if (!isInHBuilderX() && runByHBuilderX()) {
    if (isWindows) {
      const win64 = resolveEsbuildModule('esbuild-windows-64')
      if (win64) {
        process.env.ESBUILD_BINARY_PATH = path.join(win64, 'esbuild.exe')
      }
    } else {
      const arm64 = resolveEsbuildModule('esbuild-darwin-arm64')
      if (arm64) {
        process.env.ESBUILD_BINARY_PATH = path.join(arm64, 'bin/esbuild')
      }
    }
  }
}
