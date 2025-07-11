import type { Plugin } from 'vite'
import {
  MINI_PROGRAM_PAGE_RUNTIME_HOOKS,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SHARE_TIMELINE,
} from '@dcloudio/uni-shared'
import {
  enableSourceMap,
  isUniPageSetupAndTs,
  isUniPageSetupAndUts,
  isUniPageSfcFile,
} from '@dcloudio/uni-cli-shared'
import { MagicString } from '@vue/compiler-sfc'

type RuntimeHooks = keyof typeof MINI_PROGRAM_PAGE_RUNTIME_HOOKS

export function uniRuntimeHooksPlugin(): Plugin {
  return {
    name: 'uni:mp-runtime-hooks',
    enforce: 'post',
    async transform(source, id) {
      const isSetupJs = isUniPageSfcFile(id)
      const isSetupTs = !isSetupJs && isUniPageSetupAndTs(id)
      const isSetupUts = !isSetupJs && isUniPageSetupAndUts(id)
      const isTypedSetup = isSetupTs || isSetupUts
      if (!isSetupJs && !isSetupTs && !isSetupUts) {
        return null
      }
      if (isSetupJs && !source.includes('_sfc_main')) {
        return null
      }
      if (isTypedSetup && !source.includes('defineComponent')) {
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
      if (
        matches.includes(ON_SHARE_TIMELINE) ||
        matches.includes(ON_SHARE_CHAT)
      ) {
        matches.push(ON_SHARE_APP_MESSAGE)
      }
      const hooks = new Set<RuntimeHooks>(matches as RuntimeHooks[])
      let flag = 0
      for (const hook of hooks) {
        flag |= MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]
      }

      if (isSetupJs) {
        source = source + `;_sfc_main.__runtimeHooks = ${flag};`
      } else if (isTypedSetup) {
        source =
          require('@vue/compiler-sfc').rewriteDefault(
            source,
            '_sfc_defineComponent'
          ) +
          `\n_sfc_defineComponent.__runtimeHooks = ${flag};\nexport default _sfc_defineComponent`
      }
      return {
        code: source,
        map: enableSourceMap()
          ? new MagicString(source).generateMap()
          : { mappings: '' },
      }
    },
  }
}
