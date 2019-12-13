const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

const callbackIds = []

function changeHandler () {
  const {
    networkType
  } = getNetworkType()
  callbackIds.forEach(callbackId => {
    invoke(callbackId, {
      errMsg: 'onNetworkStatusChange:ok',
      isConnected: networkType !== 'none',
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

export function getNetworkType () {
  const connection = navigator.connection || navigator.webkitConnection
  let networkType = 'unknown'
  if (connection) {
    networkType = connection.type
    if (networkType === 'cellular') {
      if (connection.effectiveType) {        
        networkType = connection.effectiveType.replace("slow-", "");      
      }
    } else if (!['none', 'wifi'].includes(networkType)) {
      networkType = 'unknown'
    }
  } else if (navigator.onLine === false) {
    networkType = 'none'
  }
  return {
    errMsg: 'getNetworkType:ok',
    networkType
  }
}
