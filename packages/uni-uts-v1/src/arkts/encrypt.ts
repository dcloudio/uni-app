import path, { join, relative } from 'path'
import type { CompileResult } from '../index'
import { normalizePath } from '../shared'
import { requireUTSPluginCode, requireUniHelpers } from '../utils'

export async function compileEncrypt(
  pluginDir: string,
  _isX = false
): Promise<CompileResult> {
  return compileEncryptByUniHelpers(pluginDir)
}

async function compileEncryptByUniHelpers(pluginDir: string) {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const pluginId = path.basename(pluginDir)
  const pluginRelativeDir = relative(inputDir, pluginDir)
  const outputPluginDir = normalizePath(join(outputDir, pluginRelativeDir))
  const cachePluginDir = path.resolve(
    process.env.UNI_MODULES_ENCRYPT_CACHE_DIR!,
    pluginRelativeDir
  )
  const encryptHarFile = join(cachePluginDir, 'module.har')

  const { DUMB } = requireUniHelpers()
  try {
    await DUMB(
      path.basename(pluginRelativeDir),
      encryptHarFile,
      join(outputPluginDir, 'utssdk', 'app-harmony', 'module.har')
    )
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
  return {
    dir: outputPluginDir,
    code: requireUTSPluginCode(pluginId, false),
    deps: [] as string[],
    encrypt: true,
    inject_apis: [],
    scoped_slots: [],
    custom_elements: {},
  }
}
