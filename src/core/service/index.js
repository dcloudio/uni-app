import initOn from './bridge/on'
import initSubscribe from './bridge/subscribe'

import {
  uni
} from './uni'

import {
  getApp,
  getCurrentPages
}
  from './plugins/app'

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
  from './plugins/app'
