// 不支持的 API 列表
const TODOS = [
  'hideKeyboard'
]

function createTodoMethod (contextName, methodName) {
  return function unsupported () {
    console.error(`__PLATFORM_TITLE__ ${contextName}暂不支持${methodName}`)
  }
}
// 需要做转换的 API 列表
const protocols = {
  request: {
    args (fromArgs) {
      // TODO
      // data 不支持 ArrayBuffer
      // method 不支持 TRACE, CONNECT
      // dataType 可取值为 string/json
      return {
        method: 'method'
      }
    }
  },
  connectSocket: {
    args: {
      method: false
    }
  },
  previewImage: {
    args: {
      indicator: false,
      loop: false
    }
  },
  getRecorderManager: {
    returnValue (fromRet) {
      fromRet.onFrameRecorded = createTodoMethod('RecorderManager', 'onFrameRecorded')
    }
  },
  getBackgroundAudioManager: {
    returnValue (fromRet) {
      fromRet.onPrev = createTodoMethod('BackgroundAudioManager', 'onPrev')
      fromRet.onNext = createTodoMethod('BackgroundAudioManager', 'onNext')
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  }
}

TODOS.forEach(todoApi => {
  protocols[todoApi] = false
})

export default protocols
