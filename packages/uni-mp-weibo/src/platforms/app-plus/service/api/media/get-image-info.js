import {
  warpPlusMethod
} from '../util'
import {
  TEMP_PATH
} from '../constants'

export const getImageInfo = warpPlusMethod('io', 'getImageInfo', options => {
  options.savePath = options.filename = TEMP_PATH + '/download/'
  return options
})
