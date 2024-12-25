import { rewriteConsole, setSendConsole } from '../console'

let isInit = false
function initUniWebviewRuntimeService() {
  if (isInit) return
  isInit = true
  rewriteConsole()
  setSendConsole(
    (data: string) => {
      sendToService(data)
    },
    {
      channel: `[web-view]${
        // @ts-expect-error
        window.__UNI_PAGE_ROUTE__ ? `[${window.__UNI_PAGE_ROUTE__}]` : ''
      }`,
    }
  )
  // 监听同步错误
  window.addEventListener('error', (event) => {
    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: serializeError(event.error),
    }
    sendToService(JSON.stringify(errorInfo))
  })
  // 监听Promise未处理的异步错误
  window.addEventListener('unhandledrejection', (event) => {
    const errorInfo = {
      message: 'Unhandled Promise Rejection',
      reason: serializeError(event.reason),
    }
    sendToService(JSON.stringify(errorInfo))
  })
}

function sendToService(data: string) {
  // 发送数据到 service 层
  const serviceMessage = {
    type: 'WEB_INVOKE_APPSERVICE',
    args: {
      data: {
        name: 'console',
        arg: data,
      },
    },
  }
  // @ts-expect-error
  if (window.__uniapp_x_postMessageToService) {
    // @ts-expect-error
    return window.__uniapp_x_postMessageToService(serviceMessage)
  } else {
    // @ts-expect-error
    return window.__uniapp_x_.postMessageToService(
      JSON.stringify(serviceMessage)
    )
  }
}

// 序列化错误对象
function serializeError(error: any): object {
  if (!error) return {}

  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
  }
}

initUniWebviewRuntimeService()
