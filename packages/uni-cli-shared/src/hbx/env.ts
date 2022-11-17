import path from 'path'
import BuiltinModule from 'module'
import { once } from '@dcloudio/uni-shared'
import { resolveBuiltIn } from '../resolve'
import { isWindows } from '../utils'

export const isInHBuilderX = once(() => {
  try {
    const { name } = require(path.resolve(
      process.cwd(),
      '../about/package.json'
    ))
    if (name === 'about') {
      process.env.UNI_HBUILDERX_PLUGINS = path.resolve(process.cwd(), '..')
      return true
    }
  } catch (e) {
    // console.error(e)
  }
  return false
})

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

export function fixBinaryPath() {
  // cli 工程在 HBuilderX 中运行
  if (!isInHBuilderX() && runByHBuilderX()) {
    if (!isWindows) {
      process.env.ESBUILD_BINARY_PATH = path.join(
        resolveBuiltIn('esbuild/package.json'),
        '../bin/esbuild'
      )
    }
    try {
      if (isWindows) {
        process.env.UTS_BINARY_PATH = resolveBuiltIn(
          '@dcloudio/uts-win32-x64-msvc'
        )
      } else {
        // 强制使用 arm64 也不行，会报错：have 'arm64', need 'x86_64'
        // process.env.UTS_BINARY_PATH = resolveBuiltIn('@dcloudio/uts-darwin-arm64')
      }
    } catch (e) {}
  }
}
