import { resolveUTSCompiler } from '../uts'
import { initUts2jsExtApiOptions } from '../uts/extApi'
import { isNormalCompileTarget, requireUniHelpers } from '../utils'
import type { UasmTransformOptions } from '../uasm'
import type { UniVitePlugin } from '../vite'
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
  const extApi =
    isNormalCompileTarget() && nodeEnv !== 'development'
      ? initUts2jsExtApiOptions()
      : undefined
  return D2SP({
    typescript: resolveUTSCompiler().getTypeScript(),
    extApi,
    uasm,
    sharedData: {
      ...initUts2jsSharedDataOptions(),
      ...sharedData,
    },
  })
}
