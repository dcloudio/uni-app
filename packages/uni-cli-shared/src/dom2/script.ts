import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isNormalCompileTarget, requireUniHelpers } from '../utils'
import { initUts2jsSharedDataOptions } from './sharedData'

export interface UniVaporScriptPluginOptions {
  sharedDataLibName?: string
  sharedDataLibAsGlobal?: boolean
  uasm?: {
    targetArchs?: string[]
    resolve(modulePath: string): string | undefined
  }
}

export function initUts2jsExtApiOptions() {
  return {
    collectExtApiUsageAst: requireUniHelpers().CEAU,
  }
}

export function uniVaporScriptPlugin(
  options: UniVaporScriptPluginOptions = {}
): Plugin {
  const { uasm, ...sharedData } = options
  const { D2SP } = requireUniHelpers()
  const nodeEnv = process.env.UNI_NODE_ENV || process.env.NODE_ENV
  return D2SP({
    typescript: resolveUTSCompiler().getTypeScript(),
    collectExtApi: isNormalCompileTarget() && nodeEnv !== 'development',
    ...(uasm
      ? { uasm: { targetArchs: uasm.targetArchs, resolve: uasm.resolve } }
      : {}),
    sharedData: {
      ...initUts2jsSharedDataOptions(),
      ...sharedData,
    },
  })
}
