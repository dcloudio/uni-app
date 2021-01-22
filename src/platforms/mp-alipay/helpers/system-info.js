import { v4 as uuidv4 } from 'uuid'
import { getStorageSync } from './storage'

const UUID_KEY = '__DC_UUID'
let uuid
function addUuid (result) {
  uuid = uuid || getStorageSync(UUID_KEY)
  if (!uuid) {
    uuid = uuidv4()
    __GLOBAL__.setStorage({
      key: UUID_KEY,
      data: uuid
    })
  }
  result.uuid = uuid
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
  }
}
