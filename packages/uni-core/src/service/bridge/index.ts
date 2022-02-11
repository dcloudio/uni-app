import { extend } from '@vue/shared'

import { initBridge } from '../../helpers/bridge'
import { invokeOnCallback } from './invokeOnCallback'
import { invokeViewMethod, invokeViewMethodKeepAlive } from './invokeViewMethod'

export const ServiceJSBridge = /*#__PURE__*/ extend(
  /*#__PURE__*/ initBridge(
    'view' /* view 指的是 service 层订阅的是 view 层事件 */
  ),
  {
    invokeOnCallback,
    invokeViewMethod,
    invokeViewMethodKeepAlive,
  }
)

export {
  registerServiceMethod,
  subscribeServiceMethod,
} from './subscribeServiceMethod'
