import { runByHBuilderX } from '../hbx/env'
import { parseManifestJsonOnce } from '../json'

export function initDefine(stringifyBoolean: boolean = false) {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  const isRunByHBuilderX = runByHBuilderX()
  const isDebug = !!manifestJson.debug
  return {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.UNI_DEBUG': stringifyBoolean
      ? JSON.stringify(isDebug)
      : isDebug,
    'process.env.UNI_APP_ID': JSON.stringify(manifestJson.appid || ''),
    'process.env.UNI_APP_NAME': JSON.stringify(manifestJson.name || ''),
    'process.env.UNI_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
    'process.env.UNI_COMPILER_VERSION': JSON.stringify(
      process.env.UNI_COMPILER_VERSION
    ),
    'process.env.RUN_BY_HBUILDERX': stringifyBoolean
      ? JSON.stringify(isRunByHBuilderX)
      : isRunByHBuilderX,
    'process.env.UNI_AUTOMATOR_WS_ENDPOINT': JSON.stringify(
      process.env.UNI_AUTOMATOR_WS_ENDPOINT
    ),
    'process.env.UNI_CLOUD_PROVIDER': JSON.stringify(
      process.env.UNI_CLOUD_PROVIDER
    ),
    'process.env.UNICLOUD_DEBUG': JSON.stringify(process.env.UNICLOUD_DEBUG),
    // 兼容旧版本
    'process.env.VUE_APP_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
  }
}
