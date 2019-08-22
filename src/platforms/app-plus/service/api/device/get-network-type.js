import {
  NETWORK_TYPES
} from '../constants'

export function getNetworkType () {
  return {
    errMsg: 'getNetworkType:ok',
    networkType: NETWORK_TYPES[plus.networkinfo.getCurrentType()]
  }
}
