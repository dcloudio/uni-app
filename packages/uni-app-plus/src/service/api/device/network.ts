import { NETWORK_TYPES } from '../constants'
import { defineAsyncApi, defineOffApi, defineOnApi } from '@dcloudio/uni-api'

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

// 注意：框架对on类的API已做了统一的前置处理（仅首次调用on方法时，会调用具体的平台on实现，后续调用，框架不会再调用，实现时，直接监听平台事件即可）
export const onNetworkStatusChange = defineOnApi<OnNetworkStatusChange>(
  API_ON_NETWORK_STATUS_CHANGE,
  () => {
    ;(plus as any).globalEvent.addEventListener('netchange', networkListener)
  }
)
// 注意：框架对off类的API已做了统一的前置处理（仅当框架内不存在对应的on监听时，会调用具体的平台off实现，若还存在事件，框架不会再调用，具体实现时，直接移除平台事件即可）
export const offNetworkStatusChange = defineOffApi<
  typeof uni.offNetworkStatusChange
>('offNetworkStatusChange', () => {
  ;(plus as any).globalEvent.removeEventListener('netchange', networkListener)
})

export const getNetworkType = defineAsyncApi<typeof uni.getNetworkType>(
  'getNetworkType',
  (_args, { resolve }) => {
    let networkType =
      NETWORK_TYPES[plus.networkinfo.getCurrentType()] || 'unknown'
    return resolve({ networkType })
  }
)
