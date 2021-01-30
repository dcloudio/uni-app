const UUID_KEY = '__DC_STAT_UUID'
let deviceId
function addUuid (result) {
  deviceId = deviceId || __GLOBAL__.getStorageSync(UUID_KEY)
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7)
    __GLOBAL__.setStorage({
      key: UUID_KEY,
      data: deviceId
    })
  }
  result.deviceId = deviceId
}

function addSafeAreaInsets (result) {
  if (result.safeArea) {
    const safeArea = result.safeArea
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom
    }
  }
}

export default {
  returnValue: function (result) {
    addUuid(result)
    addSafeAreaInsets(result)
  }
}
