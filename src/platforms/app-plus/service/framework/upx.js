import {
  getRpx2Unit,
  createRpx2Unit
} from 'uni-shared'

const rpx2unit = createRpx2Unit(getRpx2Unit().unit, getRpx2Unit().unitRatio, getRpx2Unit().unitPrecision)
const REGEX_UPX = /(\d+(\.\d+)?)[r|u]px/g

export function transformCSS (css) {
  const config = __uniConfig.globalStyle || __uniConfig.window || {}
  if (config.dynamicRpx === true) {
    return rpx2unit(css)
  }

  return css.replace(REGEX_UPX, (a, b) => {
    return uni.upx2px(parseInt(b) || 0)
  })
}
