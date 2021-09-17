import initOn from 'uni-core/service/bridge/on'
import initSubscribe from 'uni-core/service/bridge/subscribe'

import {
  uni
} from 'uni-core/service/uni'

import {
  getApp,
  getCurrentPages
}
  from 'uni-core/service/plugins/app'
import {
  initI18n
} from 'uni-helpers/i18n'

initI18n()

initOn(UniServiceJSBridge.on, {
  getApp,
  getCurrentPages
})

initSubscribe(UniServiceJSBridge.subscribe, {
  getApp,
  getCurrentPages
})

export default uni
export {
  getApp,
  getCurrentPages
}
  from 'uni-core/service/plugins/app'
