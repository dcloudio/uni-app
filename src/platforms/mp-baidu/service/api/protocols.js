// 不支持的 API 列表
const TODOS = [
	'hideKeyboard'
]

// 需要做转换的 API 列表
const protocols = {
  request: {
    args (fromArgs) {
      // TODO
      // data 不支持 ArrayBuffer
      // method 不支持 TRACE, CONNECT
      // dataType 可取值为 string/json
      return fromArgs
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
    returnValue: {
      onFrameRecorded: false
      // TODO start 方法的参数有差异，暂时没有提供配置处理。
    }
  },
  getBackgroundAudioManager: {
    returnValue: {
      buffered: false,
      webUrl: false,
      protocol: false,
      onPrev: false,
      onNext: false
    }
  },
  createInnerAudioContext: {
    returnValue: {
      buffered: false
    }
  },
  createVideoContext: {
    returnValue: {
      playbackRate: false
    }
  },
  scanCode: {
    onlyFromCamera: false,
    scanType: false
  }
}

TODOS.forEach(todoApi => {
  protocols[todoApi] = false
})

export default protocols
