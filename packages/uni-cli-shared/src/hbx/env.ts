import fs from 'fs'
import path from 'path'
import BuiltinModule from 'module'
import { pathToFileURL } from 'url'
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
const initializedModulePaths = new Set<string>()

function getPackageName(specifier: string) {
  if (
    !specifier ||
    specifier.startsWith('.') ||
    specifier.startsWith('/') ||
    specifier.startsWith('\\') ||
    specifier.startsWith('#') ||
    specifier.includes(':') ||
    /[\\%?#]/.test(specifier)
  ) {
    return
  }
  const segments = specifier.split('/')
  if (
    segments.some(
      (segment) => !segment || segment === '.' || segment === '..'
    ) ||
    (specifier.startsWith('@') &&
      (segments.length < 2 || segments[0].length === 1))
  ) {
    return
  }
  const packageName = specifier.startsWith('@')
    ? segments.slice(0, 2).join('/')
    : segments[0]
  return packageName
}

function canFallbackToNodeModules(
  specifier: string,
  error: unknown,
  nodeModulesPath: string
) {
  const code = (error as NodeJS.ErrnoException)?.code
  if (code !== 'ERR_MODULE_NOT_FOUND') {
    return false
  }
  const packageName = getPackageName(specifier)
  return (
    !!packageName && fs.existsSync(path.resolve(nodeModulesPath, packageName))
  )
}

export function initModulePaths() {
  if (!isInHBuilderX()) {
    return
  }
  const nodeModulesPath = path.resolve(
    process.env.UNI_CLI_CONTEXT,
    'node_modules'
  )
  if (initializedModulePaths.has(nodeModulesPath)) {
    return
  }
  const parentURL = pathToFileURL(
    path.resolve(process.env.UNI_CLI_CONTEXT, 'package.json')
  ).href
  const moduleApi = BuiltinModule as unknown as {
    register?: (specifier: string, parentURL: URL) => void
    registerHooks?: (hooks: {
      resolve: (
        specifier: string,
        context: { parentURL?: string },
        nextResolve: (
          specifier: string,
          context: { parentURL?: string }
        ) => { url: string; shortCircuit?: boolean }
      ) => { url: string; shortCircuit?: boolean }
    }) => unknown
  }

  const Module =
    module.constructor.length > 1 ? module.constructor : BuiltinModule

  const oldNodeModulePaths = (Module as any)._nodeModulePaths
  ;(Module as any)._nodeModulePaths = function (from: string) {
    const paths = oldNodeModulePaths.call(this, from) as string[]
    if (!paths.includes(nodeModulesPath)) {
      paths.push(nodeModulesPath)
    }
    return paths
  }

  if (moduleApi.registerHooks) {
    moduleApi.registerHooks({
      resolve(specifier, context, nextResolve) {
        try {
          return nextResolve(specifier, context)
        } catch (error) {
          if (!canFallbackToNodeModules(specifier, error, nodeModulesPath)) {
            throw error
          }
          return nextResolve(specifier, { ...context, parentURL })
        }
      },
    })
    initializedModulePaths.add(nodeModulesPath)
    return
  }

  // Node 的 ESM 解析不会使用 _nodeModulePaths，需要单独回退到 HBuilderX 内置依赖。
  const register = moduleApi.register
  if (register) {
    const nodeModulesURL = pathToFileURL(nodeModulesPath + path.sep).href
    const loader = `
import { existsSync } from 'node:fs'

const parentURL = ${JSON.stringify(parentURL)}
const nodeModulesURL = ${JSON.stringify(nodeModulesURL)}

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (error) {
    if (
      error?.code !== 'ERR_MODULE_NOT_FOUND' ||
      !specifier ||
      specifier.startsWith('.') ||
      specifier.startsWith('/') ||
      specifier.startsWith('\\\\') ||
      specifier.startsWith('#') ||
      specifier.includes(':') ||
      /[\\\\%?#]/.test(specifier)
    ) {
      throw error
    }
    const segments = specifier.split('/')
    if (
      segments.some(
        (segment) => !segment || segment === '.' || segment === '..'
      ) ||
      (specifier.startsWith('@') &&
        (segments.length < 2 || segments[0].length === 1))
    ) {
      throw error
    }
    const packageName = specifier.startsWith('@')
      ? segments.slice(0, 2).join('/')
      : segments[0]
    if (!existsSync(new URL(packageName + '/', nodeModulesURL))) {
      throw error
    }
    return nextResolve(specifier, { ...context, parentURL })
  }
}
`
    register(
      `data:text/javascript,${encodeURIComponent(loader)}`,
      pathToFileURL(process.env.UNI_CLI_CONTEXT + path.sep)
    )
  }
  initializedModulePaths.add(nodeModulesPath)
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
