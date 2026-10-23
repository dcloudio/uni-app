import { resolveUTSCompiler } from '../uts'
import { initUts2jsExtApiOptions } from '../uts/extApi'
import { isNormalCompileTarget, requireUniHelpers } from '../utils'
import type { UasmTransformOptions } from '../uasm'
import type { UniVitePlugin } from '../vite'
import { createUniAppXScriptMacrosTransformer } from '../uts/scriptMacros'
import { initUts2jsSharedDataOptions } from './sharedData'

export interface UniVaporScriptPluginOptions {
  sharedDataLibName?: string
  sharedDataLibAsGlobal?: boolean
  uasm?: UasmTransformOptions
}

export function uniVaporScriptPlugin(
  options: UniVaporScriptPluginOptions = {}
): UniVitePlugin {
  const { uasm, ...sharedData } = options
  const { D2SP } = requireUniHelpers()
  const nodeEnv = process.env.UNI_NODE_ENV || process.env.NODE_ENV
  /**
   * 鸿蒙平台push、一键登录必须获取摇树结果，因此在非开发模式下或鸿蒙平台必须执行摇树逻辑
   */
  const extApi =
    isNormalCompileTarget() &&
    (nodeEnv !== 'development' ||
      process.env.UNI_UTS_PLATFORM === 'app-harmony')
      ? initUts2jsExtApiOptions()
      : undefined
  return D2SP({
    typescript: resolveUTSCompiler().getTypeScript(),
    createUniAppXScriptMacrosTransformer,
    extApi,
    uasm,
    sharedData: {
      ...initUts2jsSharedDataOptions(),
      ...sharedData,
    },
  })
}
