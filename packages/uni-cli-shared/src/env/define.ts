import { runByHBuilderX } from '../hbx/env'
import { getPlatformManifestJsonOnce, parseManifestJsonOnce } from '../json'

export function initDefine(stringifyBoolean: boolean = false) {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  const platformManifestJson = getPlatformManifestJsonOnce()
  const isRunByHBuilderX = runByHBuilderX()
  const isDebug = !!manifestJson.debug

  process.env['UNI_APP_ID'] = manifestJson.appid

  return {
    ...initCustomDefine(),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.UNI_DEBUG': stringifyBoolean
      ? JSON.stringify(isDebug)
      : isDebug,
    'process.env.UNI_APP_ID': JSON.stringify(manifestJson.appid || ''),
    'process.env.UNI_APP_NAME': JSON.stringify(manifestJson.name || ''),
    'process.env.UNI_APP_VERSION_NAME': JSON.stringify(
      manifestJson.versionName || ''
    ),
    'process.env.UNI_APP_VERSION_CODE': JSON.stringify(
      manifestJson.versionCode || ''
    ),
    'process.env.UNI_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
    'process.env.UNI_SUB_PLATFORM': JSON.stringify(
      process.env.UNI_SUB_PLATFORM || ''
    ),
    'process.env.UNI_MP_PLUGIN': JSON.stringify(
      process.env.UNI_MP_PLUGIN || ''
    ),
    'process.env.UNI_SUBPACKAGE': JSON.stringify(
      process.env.UNI_SUBPACKAGE || ''
    ),
    'process.env.UNI_COMPILER_VERSION': JSON.stringify(
      process.env.UNI_COMPILER_VERSION || ''
    ),
    'process.env.RUN_BY_HBUILDERX': stringifyBoolean
      ? JSON.stringify(isRunByHBuilderX)
      : isRunByHBuilderX,
    'process.env.UNI_AUTOMATOR_WS_ENDPOINT': JSON.stringify(
      process.env.UNI_AUTOMATOR_WS_ENDPOINT || ''
    ),
    'process.env.UNI_AUTOMATOR_APP_WEBVIEW_SRC': JSON.stringify(
      process.env.UNI_AUTOMATOR_APP_WEBVIEW_SRC || ''
    ),
    'process.env.UNI_CLOUD_PROVIDER': JSON.stringify(
      process.env.UNI_CLOUD_PROVIDER || ''
    ),
    'process.env.UNICLOUD_DEBUG': JSON.stringify(
      process.env.UNICLOUD_DEBUG || ''
    ),
    // 兼容旧版本
    'process.env.VUE_APP_PLATFORM': JSON.stringify(
      process.env.UNI_PLATFORM || ''
    ),
    'process.env.VUE_APP_DARK_MODE': JSON.stringify(
      platformManifestJson.darkmode || false
    ),
  }
}

function initCustomDefine() {
  let define: Record<string, string> = {}
  if (process.env.UNI_CUSTOM_DEFINE) {
    try {
      define = JSON.parse(process.env.UNI_CUSTOM_DEFINE)
    } catch (e: any) {}
  }
  return Object.keys(define).reduce<Record<string, string>>((res, name) => {
    res['process.env.' + name] = JSON.stringify(define[name])
    return res
  }, {})
}
