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
  if (my.canIUse('isIDE')) {
    // @ts-expect-error Property 'isIDE' does not exist on type 'typeof my'
    platform = my.isIDE ? 'devtools' : platform
  }
  result.platform = platform
}

function reviseScreenSize (result) {
  // 支付宝: 10.2.0+ 修正屏幕宽度和高度 https://opendocs.alipay.com/mini/api/gawhvz
  if (result.screen) {
    result.screenWidth = result.screen.width
    result.screenHeight = result.screen.height
  }
}

export default {
  returnValue: function (result) {
    reviseScreenSize(result)
    addUuid(result)
    addSafeAreaInsets(result)
    populateParameters(result)
    normalizePlatform(result)
  }
}
