import { hasOwn } from '@vue/shared'

import {
  API_CAN_I_USE,
  type API_TYPE_CAN_I_USE,
  CanIUseProtocol,
  defineSyncApi,
} from '@dcloudio/uni-api'

export const canIUse = defineSyncApi<API_TYPE_CAN_I_USE>(
  API_CAN_I_USE,
  (schema: string) => {
    if (hasOwn(uni, schema)) {
      return true
    }
    return false
  },
  CanIUseProtocol
)
