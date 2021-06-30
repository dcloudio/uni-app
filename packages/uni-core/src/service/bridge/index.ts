import { extend } from '@vue/shared'

import { initBridge } from '../../helpers/bridge'
export const ServiceJSBridge = /*#__PURE__*/ extend(
  initBridge('view' /* view 指的是 service 层订阅的是 view 层事件 */),
  {
    invokeOnCallback(name: string, res: unknown) {
      return UniServiceJSBridge.emit('api.' + name, res)
    },
  }
)
