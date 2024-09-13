import type { Plugin } from 'vite'
import { isUTSProxy } from '../uts'
import { resolveMainPathOnce } from '../resolve'

export function uniUniModulesExtApiPlugin(): Plugin {
  return {
    name: 'uni:uni-modules_ext-api',
    apply: 'build',
    config() {
      return {
        build: {
          lib: {
            entry: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
            formats: ['es'],
          },
        },
      }
    },
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
