import type { Plugin, ViteDevServer } from 'vite'
import { AliYunCloudAuthWebSDK } from '../utils'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import type { OutputChunk } from 'rollup'

let enableFacialRecognition = false

function isEnableFacialRecognition() {
  return enableFacialRecognition
}

function setEnableFacialRecognition(enable: boolean) {
  enableFacialRecognition = enable
}

function checkGetMetaInfo(code: string) {
  return code.includes('window.getMetaInfo')
}

function checkFacialRecognition(code: string) {
  return code.includes('getFacialRecognitionMetaInfo')
}

export function uniApiPlugin(): Plugin {
  let viteServer: ViteDevServer | undefined = undefined
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  return {
    name: 'uni:h5-api',
    enforce: 'pre',
    configureServer(server) {
      viteServer = server
    },
    transform(code, id) {
      if (!viteServer) return
      // 通过transform阶段识别，仅判断inputDir内部的文件，避免框架文件影响
      if (
        !isEnableFacialRecognition() &&
        normalizePath(id).startsWith(inputDir)
      ) {
        if (checkFacialRecognition(code)) {
          setEnableFacialRecognition(true)
          // 开发模式触发重新刷新
          viteServer.hot.send({
            type: 'full-reload',
            path: '*',
          })
        }
      }
    },
    generateBundle(_options, bundle) {
      if (viteServer) return
      if (!isEnableFacialRecognition()) {
        const filesNames = Object.keys(bundle)
        for (const fileName of filesNames) {
          const chunk = bundle[fileName] as OutputChunk
          if (chunk && chunk.type === 'chunk' && chunk.code) {
            setEnableFacialRecognition(
              checkFacialRecognition(chunk.code) || checkGetMetaInfo(chunk.code)
            )
          }
        }
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler() {
        if (!isEnableFacialRecognition()) {
          return
        }
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
