import { initOn } from './on'
import { initSubscribe } from './subscribe'

export function initService() {
  if (__NODE_JS__) {
    return
  }
  initOn()
  initSubscribe()
}
