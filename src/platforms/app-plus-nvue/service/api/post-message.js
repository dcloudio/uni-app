import {
  UNIAPP_SERVICE_NVUE_ID
} from './util'

export function initPostMessage (nvue) {
  const plus = nvue.requireModule('plus')
  return {
    postMessage (data) {
      plus.postMessage(data, UNIAPP_SERVICE_NVUE_ID)
    }
  }
}
