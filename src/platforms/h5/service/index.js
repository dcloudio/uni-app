import initOn from 'uni-core/service/bridge/on'
import initSubscribe from 'uni-core/service/bridge/subscribe'

import {
  uni
} from 'uni-service-api'

import {
  getApp,
  getCurrentPages
}
  from 'uni-core/service/plugins/app'

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
