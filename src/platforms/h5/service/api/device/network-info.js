const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

const callbackIds = []
const NONE = 'none'

function changeHandler () {
  const {
    networkType
  } = getNetworkType()
  callbackIds.forEach(callbackId => {
    invoke(callbackId, {
      errMsg: 'onNetworkStatusChange:ok',
      isConnected: networkType !== NONE,
      networkType
    })
  })
}

export function onNetworkStatusChange (callbackId) {
  const connection = navigator.connection || navigator.webkitConnection
  callbackIds.push(callbackId)
  if (connection) {
    connection.addEventListener('change', changeHandler)
  } else {
    window.addEventListener('offline', changeHandler)
    window.addEventListener('online', changeHandler)
  }
}

export function offNetworkStatusChange (callbackId) {
  // 暂不支持移除所有监听
  if (callbackId) {
    const index = callbackIds.indexOf(callbackId)
    if (index >= 0) {
      callbackIds.splice(index, 1)
    }
  }
  if (!callbackIds.length) {
    const connection = navigator.connection || navigator.webkitConnection
    if (connection) {
      connection.removeEventListener('change', changeHandler)
    } else {
      window.removeEventListener('offline', changeHandler)
      window.removeEventListener('online', changeHandler)
    }
  }
}

export function getNetworkType () {
  const connection = navigator.connection || navigator.webkitConnection
  let networkType = 'unknown'
  if (connection) {
    const effectiveType = connection.effectiveType
    networkType = connection.type
    if (networkType === 'cellular' && effectiveType) {
      networkType = effectiveType.replace('slow-', '')
    } else if ((!networkType || networkType === NONE) && effectiveType) {
      // mac/ios 不支持，h5 模式下可能会因为用户隐私的原因，无法获取到具体网络状态
      // 在鸿蒙 Web 组件中 networkType 为 none 但是 effectiveType 有值
      networkType = effectiveType
    } else if (![NONE, 'wifi'].includes(networkType)) {
      networkType = 'unknown'
    }
  } else if (navigator.onLine === false) {
    networkType = NONE
  }
  return {
    errMsg: 'getNetworkType:ok',
    networkType
  }
}
