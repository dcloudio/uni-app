import type { Plugin, ResolvedConfig } from 'vite'
import { MINI_PROGRAM_PAGE_RUNTIME_HOOKS } from '@dcloudio/uni-shared'
import {
  isUniPageSetupAndTs,
  isUniPageSfcFile,
  withSourcemap,
} from '@dcloudio/uni-cli-shared'
import { MagicString } from '@vue/compiler-sfc'

type RuntimeHooks = keyof typeof MINI_PROGRAM_PAGE_RUNTIME_HOOKS

export function uniRuntimeHooksPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:mp-runtime-hooks',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
    },
    async transform(source, id) {
      const isSetupJs = isUniPageSfcFile(id)
      const isSetupTs = !isSetupJs && isUniPageSetupAndTs(id)
      if (!isSetupJs && !isSetupTs) {
        return null
      }
      if (isSetupJs && !source.includes('_sfc_main')) {
        return null
      }
      if (isSetupTs && !source.includes('defineComponent')) {
        return null
      }
      const matches = source.match(
        new RegExp(
          `(${Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS).join('|')})`,
          'g'
        )
      )
      if (!matches) {
        return null
      }
      if (matches.includes('onShareTimeline')) {
        matches.push('onShareAppMessage')
      }
      const hooks = new Set<RuntimeHooks>(matches as RuntimeHooks[])
      let flag = 0
      for (const hook of hooks) {
        flag |= MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]
      }

      if (isSetupJs) {
        source = source + `;_sfc_main.__runtimeHooks = ${flag};`
      } else if (isSetupTs) {
        source =
          require('@vue/compiler-sfc').rewriteDefault(
            source,
            '_sfc_defineComponent'
          ) +
          `\n_sfc_defineComponent.__runtimeHooks = ${flag};\nexport default _sfc_defineComponent`
      }
      return {
        code: source,
        map: withSourcemap(resolvedConfig)
          ? new MagicString(source).generateMap()
          : { mappings: '' },
      }
    },
  }
}
