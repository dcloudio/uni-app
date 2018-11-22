const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

const callbackIds = []

function _getEffectiveNetworkType () {
  const connectionType = navigator.connection.type
  let networkType = ''

  if (~['none', 'wifi', 'unknown'].indexOf(connectionType)) {
    networkType = connectionType
  } else {
    let effectiveType = navigator.connection.effectiveType
    if (effectiveType === 'slow-2g') {
      effectiveType = '2g'
    }
    networkType = effectiveType
  }
  return networkType
}

function changeHandler () {
  let isConnected = true
  const networkType = _getEffectiveNetworkType()
  if (networkType === 'none') {
    isConnected = false
  }
  callbackIds.forEach(callbackId => {
    callbackId && invoke(callbackId, {
      errMsg: 'onNetworkStatusChange:ok',
      isConnected: isConnected,
      networkType: networkType
    })
  })
}

export function onNetworkStatusChange (callbackId) {
  if (window.NetworkInformation) {
    callbackIds.push(callbackId)
    navigator.connection.onchange = changeHandler
  } else {
    callbackId && invoke(callbackId, {
      errMsg: 'onNetworkStatusChange:fail'
    })
  }
}

export function getNetworkType () {
  if (window.NetworkInformation) {
    return {
      errMsg: 'getNetworkType:ok',
      networkType: _getEffectiveNetworkType()
    }
  } else {
    return {
      errMsg: 'getNetworkType:fail'
    }
  }
}
