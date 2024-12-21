import { rewriteConsole, setSendConsole } from './console'

function initUniWebviewRuntimeService() {
  rewriteConsole()
  setSendConsole((data: string) => {
    // TODO: 发送数据到 service 层
  })
}

initUniWebviewRuntimeService()
