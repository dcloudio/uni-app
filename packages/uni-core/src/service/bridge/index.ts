import { extend } from '@vue/shared'

import { initBridge } from '../../helpers/bridge'

export const ServiceJSBridge = /*#__PURE__*/ extend(initBridge('service'), {
  invokeOnCallback(name: string, res: unknown) {
    return UniServiceJSBridge.emit('api.' + name, res)
  },
})
