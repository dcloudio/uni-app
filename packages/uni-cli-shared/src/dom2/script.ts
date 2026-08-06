import type { Plugin } from 'vite'
import { resolveUTSCompiler } from '../uts'
import { isNormalCompileTarget, requireUniHelpers } from '../utils'
import { initUts2jsSharedDataOptions } from './sharedData'

export interface UniVaporScriptPluginOptions {
  sharedDataLibName?: string
  sharedDataLibAsGlobal?: boolean
}

export function uniVaporScriptPlugin(
  options: UniVaporScriptPluginOptions = {}
): Plugin {
  const { D2SP } = requireUniHelpers()
  if (!D2SP) {
    // TODO 临时兼容尚未提供 D2SP 的旧版 uni_helpers，版本统一后删除。
    return { name: 'uni:vapor-script' }
  }
  const nodeEnv = process.env.UNI_NODE_ENV || process.env.NODE_ENV
  return D2SP({
    typescript: resolveUTSCompiler().getTypeScript(),
    collectExtApi:
      isNormalCompileTarget() &&
      (process.env.UNI_UTS_PLATFORM === 'app-harmony' ||
        nodeEnv !== 'development'),
    sharedData: {
      ...initUts2jsSharedDataOptions(),
      ...options,
    },
  })
}
