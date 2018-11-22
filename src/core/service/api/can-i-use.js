import {
  hasOwn
} from 'uni-shared'

import platformSchema from 'uni-platform/helpers/can-i-use'
// TODO 待处理其他 API 的检测

export function canIUse (schema) {
  if (hasOwn(platformSchema, schema)) {
    return platformSchema[schema]
  }
  return true
}
