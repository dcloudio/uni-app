import type { Plugin, ViteDevServer } from 'vite'
import { AliYunCloudAuthWebSDK } from '../utils'
import { normalizePath } from '@dcloudio/uni-cli-shared'

let enableFacialRecognition = false

function isEnableFacialRecognition() {
  return enableFacialRecognition
}

function setEnableFacialRecognition(enable: boolean) {
  enableFacialRecognition = enable
}

function checkFacialRecognition(code: string) {
  return (
    code.includes('getFacialRecognitionMetaInfo') ||
    code.includes('window.getMetaInfo')
  )
}

export function uniApiPlugin(): Plugin {
  let viteServer: ViteDevServer | undefined = undefined
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  return {
    name: 'uni:h5-api',
    enforce: 'post',
    configureServer(server) {
      viteServer = server
    },
    transform(code, id) {
      // 通过transform阶段识别，仅判断inputDir内部的文件，避免框架文件影响
      if (
        !isEnableFacialRecognition() &&
        normalizePath(id).startsWith(inputDir)
      ) {
        if (checkFacialRecognition(code)) {
          setEnableFacialRecognition(true)
          if (viteServer) {
            // 开发模式触发重新刷新
            viteServer.ws.send({
              type: 'full-reload',
              path: '*',
            })
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
