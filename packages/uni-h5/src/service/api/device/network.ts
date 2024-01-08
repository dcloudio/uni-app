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
// 注意：框架对on类的API已做了统一的前置处理（仅首次调用on方法时，会调用具体的平台on实现，后续调用，框架不会再调用，实现时，直接监听平台事件即可）
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
// 注意：框架对off类的API已做了统一的前置处理（仅当框架内不存在对应的on监听时，会调用具体的平台off实现，若还存在事件，框架不会再调用，具体实现时，直接移除平台事件即可）
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
  (_args, { resolve }) => {
    const connection = getConnection()
    let networkType = 'unknown'
    if (connection) {
      // 现代浏览器拿不到这部分逻辑，主要走 effectiveType
      networkType = connection.type
      // 数据网络
      if (networkType === 'cellular' && connection.effectiveType) {
        networkType = connection.effectiveType.replace('slow-', '')
      } else if (!['none', 'wifi'].includes(networkType)) {
        networkType = 'unknown'
      }
    } else if (navigator.onLine === false) {
      networkType = 'none'
    } else if (!networkType && connection.effectiveType) {
      // mac/ios 不支持，h5 模式下可能会因为用户隐私的原因，无法获取到具体网络状态
      networkType = connection.effectiveType
    }
    return resolve({ networkType })
  }
)
