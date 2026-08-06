import fs from 'fs-extra'
import path from 'node:path'
import type { Plugin } from 'vite'
import { normalizePath } from './utils'

export type UasmPlatform = 'app-android' | 'app-ios' | 'app-harmony'

export interface UasmArchResources {
  dir: string
  file: string
}

export interface UasmPlatformResources {
  dir: string
  archs: Record<string, UasmArchResources>
}

export interface UasmModule {
  name: string
  platforms: Partial<Record<UasmPlatform, UasmPlatformResources>>
}

export interface ResolvedUasmModule {
  name: string
  platform: UasmPlatform
  arch?: string
  dir: string
  file?: string
}

const UASM_PLATFORMS: UasmPlatform[] = ['app-android', 'app-ios', 'app-harmony']

let uasmModules: Record<string, UasmModule> = Object.create(null)

export function parseUniAppXTargetArchs(
  value = process.env.UNI_APP_X_TARGET_ARCHS
): string[] {
  if (!value) {
    return []
  }
  try {
    const targetArchs = JSON.parse(value)
    return Array.isArray(targetArchs)
      ? targetArchs.filter(
          (arch): arch is string => typeof arch === 'string' && !!arch
        )
      : []
  } catch {
    return []
  }
}

export function initUasmModules(inputDir: string) {
  uasmModules = scanUasmModules(inputDir, UASM_PLATFORMS)
  return uasmModules
}

export function uniUasmPlugin(inputDir = process.env.UNI_INPUT_DIR): Plugin {
  initUasmModules(inputDir)
  return {
    name: 'uni:uasm',
    apply: 'build',
  }
}

function scanUasmModules(
  inputDir: string,
  platformsToScan: readonly UasmPlatform[]
) {
  const modules: Record<string, UasmModule> = Object.create(null)
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  if (!fs.existsSync(uniModulesDir)) {
    return modules
  }

  fs.readdirSync(uniModulesDir, { withFileTypes: true }).forEach((entry) => {
    if (!isDirectoryEntry(uniModulesDir, entry)) {
      return
    }
    const platforms: UasmModule['platforms'] = {}
    for (const platform of platformsToScan) {
      const resources = scanUasmPlatform(inputDir, entry.name, platform)
      if (resources) {
        platforms[platform] = resources
      }
    }
    if (Object.keys(platforms).length) {
      modules[entry.name] = {
        name: entry.name,
        platforms,
      }
    }
  })
  return modules
}

export function getUasmModules() {
  return uasmModules
}

export function resolveUasmTargetArch(
  moduleName: string,
  platform: UasmPlatform,
  targetArchs = parseUniAppXTargetArchs()
): string | undefined {
  const archs = uasmModules[moduleName]?.platforms[platform]?.archs
  return archs && targetArchs.find((arch) => archs[arch])
}

export function resolveUasmModule(
  moduleName: string,
  platform: UasmPlatform,
  targetArchs = parseUniAppXTargetArchs()
): ResolvedUasmModule | undefined {
  return resolveUasmModuleFrom(uasmModules, moduleName, platform, targetArchs)
}

export function parseUasmModuleName(modulePath: string): string | undefined {
  const normalized = modulePath.replace(/^@?\//, '')
  return /^uni_modules\/([^/]+)$/.exec(normalized)?.[1]
}

export function resolveUasmLoadPath(
  modulePath: string,
  platform: UasmPlatform,
  isProduction = (process.env.UNI_NODE_ENV || process.env.NODE_ENV) !==
    'development',
  targetArchs = parseUniAppXTargetArchs()
): string | undefined {
  const moduleName = parseUasmModuleName(modulePath)
  if (!moduleName || !uasmModules[moduleName]?.platforms[platform]) {
    return
  }
  if (platform === 'app-ios') {
    return moduleName
  }
  if (isProduction) {
    return `lib${moduleName}.so`
  }
  return (
    resolveUasmModule(moduleName, platform, targetArchs)?.file || moduleName
  )
}

function resolveUasmModuleFrom(
  modules: Record<string, UasmModule>,
  moduleName: string,
  platform: UasmPlatform,
  targetArchs: string[]
): ResolvedUasmModule | undefined {
  const resources = modules[moduleName]?.platforms[platform]
  if (!resources) {
    return
  }
  if (platform === 'app-ios') {
    return {
      name: moduleName,
      platform,
      dir: resources.dir,
    }
  }
  const arch = targetArchs.find((arch) => resources.archs[arch])
  if (!arch) {
    return
  }
  const archResources = resources.archs[arch]
  return {
    name: moduleName,
    platform,
    arch,
    dir: archResources.dir,
    file: archResources.file,
  }
}

export function resolveUasmCopyAssets(
  platform: UasmPlatform,
  isProduction: boolean,
  targetArchs = parseUniAppXTargetArchs()
) {
  const resourceDir = platform === 'app-ios' ? 'frameworks' : 'libs'
  if (isProduction) {
    return [`uni_modules/*/uasm/${platform}/${resourceDir}/**/*`]
  }
  if (platform === 'app-ios' || !targetArchs.length) {
    return []
  }
  return Object.keys(uasmModules).reduce<string[]>((assets, moduleName) => {
    const resolved = resolveUasmModule(moduleName, platform, targetArchs)
    if (resolved) {
      assets.push(`${resolved.dir}/**/*`)
    }
    return assets
  }, [])
}

function scanUasmPlatform(
  inputDir: string,
  moduleName: string,
  platform: UasmPlatform
): UasmPlatformResources | undefined {
  const resourceDir = platform === 'app-ios' ? 'frameworks' : 'libs'
  const relativeDir = normalizePath(
    path.join('uni_modules', moduleName, 'uasm', platform, resourceDir)
  )
  const absoluteDir = path.resolve(inputDir, relativeDir)
  if (!fs.existsSync(absoluteDir)) {
    return
  }

  const resources: UasmPlatformResources = {
    dir: relativeDir,
    archs: Object.create(null),
  }
  if (platform !== 'app-ios') {
    fs.readdirSync(absoluteDir, { withFileTypes: true }).forEach((entry) => {
      if (!isDirectoryEntry(absoluteDir, entry)) {
        return
      }
      const relativeArchDir = normalizePath(path.join(relativeDir, entry.name))
      const file = normalizePath(
        path.join(relativeArchDir, `lib${moduleName}.so`)
      )
      if (!fs.existsSync(path.resolve(inputDir, file))) {
        return
      }
      resources.archs[entry.name] = {
        dir: relativeArchDir,
        file,
      }
    })
    if (!Object.keys(resources.archs).length) {
      return
    }
  }
  return resources
}

function isDirectoryEntry(parentDir: string, entry: fs.Dirent) {
  if (entry.isDirectory()) {
    return true
  }
  if (!entry.isSymbolicLink()) {
    return false
  }
  try {
    return fs.statSync(path.resolve(parentDir, entry.name)).isDirectory()
  } catch {
    return false
  }
}
