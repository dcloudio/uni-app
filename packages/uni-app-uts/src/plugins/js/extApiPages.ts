import type { OutputChunk } from 'rollup'
import type { Plugin } from 'vite'
import { getUniXPagePaths } from '@dcloudio/uni-cli-shared'
import path from 'path'

export function replaceExtApiPagePaths(): Plugin {
  const pagePaths = getUniXPagePaths()
  const systemPagePaths: Record<string, string> = pagePaths.reduce(
    (acc, pagePath) => {
      acc['/' + pagePath] = `uni:${path.basename(pagePath)}`
      return acc
    },
    {} as Record<string, string>
  )
  return {
    name: 'uni:replace-page-paths',
    generateBundle(_, bundle) {
      if (Object.keys(systemPagePaths).length) {
        Object.keys(bundle).forEach((key) => {
          if (key.endsWith('.js')) {
            const chunk = bundle[key] as OutputChunk
            let newCode = chunk.code
            Object.keys(systemPagePaths).forEach((path) => {
              if (newCode.includes(path)) {
                newCode = newCode.replace(
                  new RegExp(path, 'g'),
                  systemPagePaths[path]
                )
              }
            })
            chunk.code = newCode
          }
        })
      }
    },
  }
}
