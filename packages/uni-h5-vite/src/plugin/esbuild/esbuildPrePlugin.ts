import fs from 'fs'
import path from 'path'
import type { Loader, Plugin } from 'esbuild'
import { preJs } from '@dcloudio/uni-cli-shared'

export const JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/

export function esbuildPrePlugin(): Plugin {
  return {
    name: 'uni:dep-scan',
    setup(build) {
      build.onLoad({ filter: JS_TYPES_RE }, ({ path: id }) => {
        let ext = path.extname(id).slice(1)
        if (ext === 'mjs') ext = 'js'
        if (fs.existsSync(id)) {
          let contents = fs.readFileSync(id, 'utf-8')
          if (contents.includes('#endif')) {
            contents = preJs(contents, id)
          }
          return {
            loader: ext as Loader,
            contents,
          }
        }
      })
    },
  }
}
