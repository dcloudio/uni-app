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
            // 必须使用 lib 模式
            name: 'components',
            fileName: 'output',
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
