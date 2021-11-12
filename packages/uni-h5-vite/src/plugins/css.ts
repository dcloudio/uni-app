import fs from 'fs'
import { OutputAsset, OutputChunk } from 'rollup'
import type { Plugin, ResolvedConfig } from 'vite'

import { buildInCssSet, resolveBuiltIn } from '@dcloudio/uni-cli-shared'

function isCombineBuiltInCss(config: ResolvedConfig) {
  return config.command === 'build' && config.build.cssCodeSplit
}

export function uniCssPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite:uni-h5-css',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
    },
    generateBundle(_opts, bundle) {
      // 将内置组件样式，合并进入首页
      if (!isCombineBuiltInCss(resolvedConfig) || !buildInCssSet.size) {
        return
      }
      const chunks = Object.values(bundle)
      const entryChunk = chunks.find(
        (chunk) => chunk.type === 'chunk' && chunk.isEntry
      ) as OutputChunk | undefined
      if (!entryChunk) {
        return
      }
      const entryName = entryChunk.name
      const entryCssAsset = chunks.find(
        ({ name }) => name === entryName + '.css'
      ) as OutputAsset
      if (entryCssAsset) {
        entryCssAsset.source =
          generateBuiltInCssCode([...buildInCssSet]) +
          '\n' +
          entryCssAsset.source
      }
    },
  }
}

function generateBuiltInCssCode(cssImports: string[]) {
  return cssImports
    .map((cssImport) => fs.readFileSync(resolveBuiltIn(cssImport), 'utf8'))
    .join('\n')
}
