import type { Rolldown } from 'vite'
import { preJs } from '@dcloudio/uni-cli-shared'

const JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/

export function rolldownPrePlugin(): Rolldown.Plugin {
  return {
    name: 'uni:dep-scan',
    transform(code, id) {
      if (JS_TYPES_RE.test(id) && code.includes('#endif')) {
        return {
          code: preJs(code, id),
          map: null,
        }
      }
    },
  }
}
