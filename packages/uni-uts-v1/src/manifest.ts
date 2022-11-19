import md5 from 'md5-file'
import glob from 'fast-glob'
import { normalizePath } from './shared'
export async function genManifest(pluginDir: string) {
  const files = await glob(normalizePath(pluginDir) + '/**/*')
  await Promise.all(files.map((file) => md5(file)))
}
