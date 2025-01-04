export {
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  onError,
  offError,
  onSocketOpen,
  onSocketMessage,
} from '@dcloudio/uni-mp-core'
import { navigateTo as _navigateTo } from '@dcloudio/uni-mp-core'
export const navigateTo = _navigateTo()
