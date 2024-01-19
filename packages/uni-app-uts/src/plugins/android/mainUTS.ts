import {
  MANIFEST_JSON_UTS,
  PAGES_JSON_UTS,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'

import type { Plugin } from 'vite'
import { createTryResolve, parseImports } from './utils'

export function uniAppMainPlugin(): Plugin {
  const mainUTS = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  return {
    name: 'uni:app-main',
    apply: 'build',
    async transform(code, id) {
      if (normalizePath(id) === mainUTS) {
        code = await parseImports(
          code,
          createTryResolve(id, this.resolve.bind(this))
        )
        return {
          code: `import './${MANIFEST_JSON_UTS}'
          import './${PAGES_JSON_UTS}'
          ${code}
          `,
          map: null,
        }
      }
    },
  }
}
