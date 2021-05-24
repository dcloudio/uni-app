import fs from 'fs'
import { OutputAsset, OutputChunk } from 'rollup'
import { Plugin, ResolvedConfig } from 'vite'

import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'

export const buildInCssSet = new Set<string>()

export function isCombineBuiltInCss(config: ResolvedConfig) {
  return config.command === 'build' && config.build.cssCodeSplit
}

export function uniCssPlugin(config: ResolvedConfig): Plugin {
  return {
    name: 'vite:uni-css',
    apply: 'build',
    generateBundle(_opts, bundle) {
      if (!isCombineBuiltInCss(config) || !buildInCssSet.size) {
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
        entryCssAsset.source +=
          '\n' + generateBuiltInCssCode([...buildInCssSet])
      }
    },
  }
}

function generateBuiltInCssCode(cssImports: string[]) {
  return cssImports
    .map((cssImport) => fs.readFileSync(resolveBuiltIn(cssImport), 'utf8'))
    .join('\n')
}
