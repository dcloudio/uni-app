import type { Plugin } from 'vite'
import { MINI_PROGRAM_PAGE_RUNTIME_HOOKS } from '@dcloudio/uni-shared'
import { isUniPageSfcFile } from '@dcloudio/uni-cli-shared'

type RuntimeHooks = keyof typeof MINI_PROGRAM_PAGE_RUNTIME_HOOKS

export function uniRuntimeHooksPlugin(): Plugin {
  return {
    name: 'uni:mp-runtime-hooks',
    enforce: 'post',
    async transform(source, id) {
      if (!isUniPageSfcFile(id)) {
        return null
      }
      if (!source.includes('_sfc_main')) {
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
      return {
        code: source + `;_sfc_main.__runtimeHooks = ${flag};`,
        map: { mappings: '' },
      }
    },
  }
}
