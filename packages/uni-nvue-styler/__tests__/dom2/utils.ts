import {
  DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
  type ParseDom2StaticStyleOptions,
} from '../../src/dom2/types'

export const TEST_OPTIONS_LIST: ParseDom2StaticStyleOptions[] = [
  // harmony平台
  {
    platform: DOM2_APP_PLATFORM.APP_HARMONY,
    target: DOM2_APP_TARGET.DOM_C,
  },
  {
    platform: DOM2_APP_PLATFORM.APP_HARMONY,
    target: DOM2_APP_TARGET.NV_C,
  },
]
