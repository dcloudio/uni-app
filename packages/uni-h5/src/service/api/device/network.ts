import { defineOnApi, defineOffApi, defineAsyncApi } from '@dcloudio/uni-api'

type OnNetworkStatusChange = typeof uni.onNetworkStatusChange

const API_ON_NETWORK_STATUS_CHANGE = 'onNetworkStatusChange'

function networkListener() {
  getNetworkType().then(({ networkType }) => {
    UniServiceJSBridge.invokeOnCallback<OnNetworkStatusChange>(
      API_ON_NETWORK_STATUS_CHANGE,
      {
        isConnected: networkType !== 'none',
        networkType,
      }
    )
  })
}

function getConnection() {
  return (
    (navigator as any).connection ||
    (navigator as any).webkitConnection ||
    (navigator as any).mozConnection
  )
}

export const onNetworkStatusChange = defineOnApi<OnNetworkStatusChange>(
  API_ON_NETWORK_STATUS_CHANGE,
  () => {
    const connection = getConnection()
    if (connection) {
      connection.addEventListener('change', networkListener)
    } else {
      window.addEventListener('offline', networkListener)
      window.addEventListener('online', networkListener)
    }
  }
)

export const offNetworkStatusChange = defineOffApi<
  typeof uni.offNetworkStatusChange
>('offNetworkStatusChange', () => {
  const connection = getConnection()
  if (connection) {
    connection.removeEventListener('change', networkListener)
  } else {
    window.removeEventListener('offline', networkListener)
    window.removeEventListener('online', networkListener)
  }
})

export const getNetworkType = defineAsyncApi<typeof uni.getNetworkType>(
  'getNetworkType',
  () => {
    const connection = getConnection()
    let networkType = 'unknown'
    if (connection) {
      networkType = connection.type
      if (networkType === 'cellular' && connection.effectiveType) {
        networkType = connection.effectiveType.replace('slow-', '')
      } else if (!['none', 'wifi'].includes(networkType)) {
        networkType = 'unknown'
      }
    } else if (navigator.onLine === false) {
      networkType = 'none'
    }
    return Promise.resolve({ networkType })
  }
)
