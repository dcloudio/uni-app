import { initSubscribeHandlers } from './subscriber'
import { preventDoubleTap } from './gesture'

export function initView() {
  initSubscribeHandlers()
  preventDoubleTap()
}
