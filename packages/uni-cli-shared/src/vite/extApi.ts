import type { Plugin } from 'vite'
import { isUTSProxy } from '../uts'

export function uniUniModulesExtApiPlugin(): Plugin {
  return {
    name: 'uni:uni-modules_ext-api',
    apply: 'build',
    load(id) {
      if (isUTSProxy(id)) {
        return ''
      }
    },
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        console.log('fileName', fileName)
      })
    },
  }
}
