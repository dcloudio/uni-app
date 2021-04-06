import { extend } from '@vue/shared'

import { initBridge } from '../../helpers/bridge'

export const ServiceJSBridge = extend(initBridge('service'), {
  invokeOnCallback(name: string, res: unknown) {
    return UniServiceJSBridge.emit('api.' + name, res)
  },
})
