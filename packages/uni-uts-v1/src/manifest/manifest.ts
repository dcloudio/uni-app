import { existsSync, outputFileSync, readFileSync, statSync } from 'fs-extra'
import { join } from 'path'
import md5 from 'md5-file'
import glob from 'fast-glob'
import type { APP_PLATFORM } from './utils'

const fileCaches = new Map<
  string,
  {
    mtimeMs: number
    md5: string
  }
>()

interface ManifestFile {
  md5: string
}

const VERSION = '1'

export interface Manifest {
  version: typeof VERSION
  env: Record<string, unknown>
  files: {
    [file: string]: ManifestFile
  }
}

/**
 * 计算文件 md5（有缓存）
 * @param file
 * @returns
 */
export async function hash(file: string) {
  const cache = fileCaches.get(file)
  const stat = statSync(file)
  if (cache && cache.mtimeMs === stat.mtimeMs) {
    return cache.md5
  }
  return md5(file).then((value) => {
    fileCaches.set(file, { mtimeMs: stat.mtimeMs, md5: value })
    return value
  })
}

interface GenManifestJsonOptions {
  pluginDir: string
  env: Record<string, unknown>
  files?: string[]
  is_uni_modules: boolean
}

export interface GenManifestFileOptions {
  cacheDir: string
  pluginRelativeDir: string
  is_uni_modules: boolean
  env: Record<string, unknown>
  pluginDir: string
  files?: string[]
}

export async function genManifestFile(
  platform: APP_PLATFORM,
  {
    files,
    pluginDir,
    env,
    cacheDir,
    pluginRelativeDir,
    is_uni_modules,
  }: GenManifestFileOptions
) {
  outputFileSync(
    resolveManifestFilename(platform, pluginRelativeDir, cacheDir),
    JSON.stringify(
      await genManifestJson(platform, {
        pluginDir,
        files,
        env,
        is_uni_modules,
      }),
      null,
      2
    )
  )
  return true
}

export async function genManifestJson(
  platform: APP_PLATFORM,
  { pluginDir, files, env, is_uni_modules }: GenManifestJsonOptions
): Promise<Manifest> {
  if (!files) {
    files = await resolvePluginFiles(platform, pluginDir, is_uni_modules)
  }
  if (!files) {
    files = []
  }
  return {
    version: VERSION,
    env,
    files: await genManifestFiles(pluginDir, files),
  }
}

async function genManifestFiles(dir: string, files: string[]) {
  const manifestFiles: Manifest['files'] = {}
  // 优先 uts 文件
  files = files.sort((a, b) => {
    const aUts = a.endsWith('.uts')
    const bUts = b.endsWith('.uts')
    if (aUts && bUts) {
      return a > b ? 1 : -1
    }
    if (aUts) {
      return -1
    }
    return 1
  })
  const md5Arr = await Promise.all(files.map((file) => hash(join(dir, file))))
  files.forEach((name, index) => {
    manifestFiles[name] = {
      md5: md5Arr[index],
    }
  })
  return manifestFiles
}

async function resolvePluginCommonFiles(
  pluginDir: string,
  is_uni_modules: boolean
) {
  const patterns = ['*']
  if (is_uni_modules) {
    patterns.push('common/**/*')
    patterns.push('customElements/**/*')
    patterns.push('utssdk/*.uts')
    patterns.push('utssdk/common/**/*')
    // TODO 还需要处理非平台目录的其他目录文件
    // 比如 utssdk/lib/**/* lib不是其他平台目录
  } else {
    patterns.push('common/**/*')
  }
  return glob(patterns, {
    ignore: ['changelog.md', 'readme.md'],
    cwd: pluginDir,
  })
}

export async function resolvePluginFiles(
  platform: APP_PLATFORM,
  pluginDir: string,
  is_uni_modules: boolean
) {
  return Promise.all([
    resolvePluginCommonFiles(pluginDir, is_uni_modules),
    resolvePluginPlatformFiles(platform, pluginDir, is_uni_modules),
  ]).then((files) => files.flat())
}

async function resolvePluginPlatformFiles(
  platform: APP_PLATFORM,
  pluginDir: string,
  is_uni_modules: boolean
) {
  return glob((is_uni_modules ? 'utssdk/' : '') + platform + '/**/*', {
    cwd: pluginDir,
  })
}

export async function checkManifest(
  manifest: Manifest,
  {
    env,
    files,
    pluginDir,
  }: { pluginDir: string; files: string[]; env: Record<string, unknown> }
) {
  if (manifest.version !== VERSION) {
    return false
  }
  if (isEnvExpired(manifest.env, env)) {
    return false
  }
  return checkFiles(manifest.files, files, pluginDir)
}

/**
 * 判断 env 是否过期
 * @param value
 * @param other
 * @returns
 */
function isEnvExpired(
  value: Record<string, unknown>,
  other: Record<string, unknown>
) {
  const valueKeys = Object.keys(value)
  const otherKeys = Object.keys(other)
  if (valueKeys.length !== otherKeys.length) {
    return true
  }
  if (valueKeys.find((name) => value[name] !== other[name])) {
    return true
  }
  return false
}

/**
 * 判断文件列表是否过期
 * @param files
 * @param filenames
 * @returns
 */
async function checkFiles(
  files: Manifest['files'],
  filenames: string[],
  pluginDir: string
) {
  const oldFilenames = Object.keys(files)
  // 第一步：优先判断文件列表长度
  if (oldFilenames.length !== filenames.length) {
    return false
  }
  // 第二步：判断文件列表
  if (oldFilenames.find((name) => !filenames.includes(name))) {
    return false
  }
  // 第三步：判断文件 md5
  for (const name of oldFilenames) {
    const md5 = await hash(join(pluginDir, name))
    if (files[name].md5 !== md5) {
      return name
    }
  }
  return true
}

export function hasCustomResources(files: string[], resources: string[]) {
  if (files.some((file) => isCustomResources(file, resources))) {
    return true
  }
}

export function isCustomResources(file: string, resources: string[]) {
  return resources.some((res) => file.includes(res))
}

function resolveManifestFilename(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  cacheDir: string
) {
  return join(cacheDir, platform, 'uts', pluginRelativeDir, 'manifest.json')
}

export function resolveManifestJson(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  cacheDir: string
) {
  const file = resolveManifestFilename(platform, pluginRelativeDir, cacheDir)
  if (existsSync(file)) {
    try {
      return JSON.parse(readFileSync(file, 'utf8')) as Manifest
    } catch (e) {}
  }
}
