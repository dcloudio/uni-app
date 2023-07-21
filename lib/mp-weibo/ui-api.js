import {
  canIUse
} from 'uni-core/service/api/base/can-i-use'
import {
  upx2px
} from 'uni-core/service/api/base/upx2px'
import {
  getLocation
} from 'uni-platform/service/api/location/get-location'
import {
  onCompassChange,
  stopCompass
} from 'uni-platform/service/api/device/compass'
import {
  getSystemInfoSync
} from 'uni-platform/service/api/device/get-system-info'

// TODO route

export default {
  canIUse,
  upx2px,
  getLocation,
  onCompassChange,
  stopCompass,
  getSystemInfoSync
}
