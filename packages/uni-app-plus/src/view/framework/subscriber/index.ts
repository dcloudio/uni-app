import { VD_SYNC } from '../../../constants'
import { onVdSync } from './vdom'

export function initSubscribeHandlers() {
  const { subscribe } = UniViewJSBridge
  subscribe(VD_SYNC, onVdSync)
}
