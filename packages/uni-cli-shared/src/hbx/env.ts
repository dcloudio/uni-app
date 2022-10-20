import path from 'path'
import BuiltinModule from 'module'
import { once } from '@dcloudio/uni-shared'

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
  return !!process.env.UNI_HBUILDERX_PLUGINS && !!process.env.RUN_BY_HBUILDERX
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
