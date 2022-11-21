import { statSync } from 'fs'
import { join } from 'path'
import md5 from 'md5-file'
import glob from 'fast-glob'

type APP_PLATFORM = 'app' | 'app-android' | 'app-ios'

const fileCaches = new Map<
  string,
  {
    mtimeMs: number
    md5: string
  }
>()

interface ManifestFile {
  md5: {
    'built-in': string
  }
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

interface GenManifestJsonBaseOptions {
  pluginDir: string
  env: Record<string, unknown>
}
interface GenManifestJsonOptions extends GenManifestJsonBaseOptions {
  files: {
    [file: string]: ManifestFile
  }
}
interface GenPlatformManifestJsonOptions extends GenManifestJsonBaseOptions {
  files: string[]
  commonFiles: {
    [file: string]: ManifestFile
  }
}

function genManifestJson(options: GenManifestJsonOptions) {
  return {
    version: VERSION,
    ...options,
  }
}

export async function genPlatformManifestJson({
  pluginDir,
  files,
  env,
  commonFiles,
}: GenPlatformManifestJsonOptions) {
  return genManifestJson({
    pluginDir,
    env,
    files: {
      ...commonFiles,
      ...(await genManifestFiles(pluginDir, files)),
    },
  })
}

export async function genManifests(
  pluginDir: string,
  {
    is_uni_modules,
    env,
  }: {
    is_uni_modules: boolean
    env: Record<string, unknown>
  }
) {}

async function genManifestFiles(dir: string, files: string[]) {
  const manifestFiles: Manifest['files'] = {}
  await Promise.all(
    files.map((file) =>
      hash(join(dir, file)).then((hash) => {
        manifestFiles[file] = { md5: { 'built-in': hash } }
      })
    )
  )
  return manifestFiles
}

export async function resolvePluginCommonFiles(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return glob(['*', (is_uni_modules ? 'utssdk/' : '') + 'common/**/*'], {
    cwd: pluginDir,
  })
}

export async function resolvePluginAndroidFiles(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return resolvePluginPlatformFiles('app-android', pluginDir, is_uni_modules)
}

export async function resolvePluginIOSFiles(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return resolvePluginPlatformFiles('app-ios', pluginDir, is_uni_modules)
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

export function checkManifestBase(manifest: Manifest) {
  if (manifest.version !== VERSION) {
    return false
  }
}
