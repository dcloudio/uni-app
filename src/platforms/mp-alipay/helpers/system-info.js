import { getStorageSync } from './storage'
import { addSafeAreaInsets, populateParameters } from '../../mp-weixin/helpers/enhance-system-info'

const UUID_KEY = '__DC_STAT_UUID'
let deviceId
function addUuid (result) {
  deviceId = deviceId || getStorageSync(UUID_KEY)
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7)
    __GLOBAL__.setStorage({
      key: UUID_KEY,
      data: deviceId
    })
  }
  result.deviceId = deviceId
}

function normalizePlatform (result) {
  let platform = result.platform ? result.platform.toLowerCase() : 'devtools'
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools'
  }
  result.platform = platform
}

export default {
  returnValue: function (result) {
    addUuid(result)
    addSafeAreaInsets(result)
    normalizePlatform(result)
    populateParameters(result)
  }
}
