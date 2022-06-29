import { addSafeAreaInsets } from './enhance-system-info'
import { sortObject } from 'uni-shared'

export default {
  returnValue: function (result) {
    addSafeAreaInsets(result)

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }))
  }
}
