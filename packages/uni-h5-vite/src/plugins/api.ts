import type { Plugin } from 'vite'
import type { OutputChunk } from 'rollup'
import { AliYunCloudAuthWebSDK } from '../utils'

export function uniApiPlugin(): Plugin {
  let isEnableFacialRecognition = false
  let isInserted = false
  return {
    name: 'uni:h5-api',
    apply: 'build',
    enforce: 'pre',
    async generateBundle(_options, bundle) {
      if (!isEnableFacialRecognition) {
        const filesNames = Object.keys(bundle)
        for (const fileName of filesNames) {
          const chunk = bundle[fileName] as OutputChunk
          if (chunk && chunk.type === 'chunk' && chunk.code) {
            isEnableFacialRecognition =
              chunk.code.includes('getFacialRecognitionMetaInfo') ||
              chunk.code.includes('window.getMetaInfo')
          }
        }
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler() {
        if (!isEnableFacialRecognition || isInserted) {
          return
        }
        isInserted = true
        // 追加框架css
        return [
          {
            tag: 'script',
            attrs: {
              src: AliYunCloudAuthWebSDK,
            },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}
