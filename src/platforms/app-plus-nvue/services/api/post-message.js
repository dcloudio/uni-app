import {
  UNIAPP_SERVICE_NVUE_ID
} from './util'

export function initPostMessage (plus) {
  return {
    postMessage (data) {
      plus.postMessage(data, UNIAPP_SERVICE_NVUE_ID)
    }
  }
}
