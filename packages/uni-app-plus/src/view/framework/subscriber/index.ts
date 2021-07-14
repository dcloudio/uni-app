import { VD_SYNC, INVOKE_VIEW_API } from '../../../constants'
import { onVdSync } from '../dom'
import { onInvokeViewApi } from './invokeViewApi'

export function initSubscribeHandlers() {
  const { subscribe } = UniViewJSBridge
  subscribe(VD_SYNC, onVdSync)
  subscribe(INVOKE_VIEW_API, onInvokeViewApi)
}
