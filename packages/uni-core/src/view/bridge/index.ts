import { extend } from '@vue/shared'

import { initBridge } from '../../helpers/bridge'
import { invokeServiceMethod } from './invokeServiceMethod'

export const ViewJSBridge = /*#__PURE__*/ extend(
  /*#__PURE__*/ initBridge('service'),
  {
    invokeServiceMethod,
  }
)

export {
  subscribeViewMethod,
  unsubscribeViewMethod,
  registerViewMethod,
  unregisterViewMethod,
} from './subscribeViewMethod'
