import {
  hasOwn
} from 'uni-shared'

import platformSchema from 'uni-platform/helpers/can-i-use'
import api from 'uni-service-api'
// TODO 待处理其他 API 的检测

export function canIUse (schema) {
  if (hasOwn(platformSchema, schema)) {
    return platformSchema[schema]
  }
  if (hasOwn(api, schema)) {
    return true
  }
  return false
}
