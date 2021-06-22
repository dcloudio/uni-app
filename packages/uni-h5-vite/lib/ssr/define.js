const defines = __DEFINES__
Object.keys(defines).forEach((key) => {
  const segments = key.split('.')
  let target = global
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (i === segments.length - 1) {
      target[segment] = defines[key]
    } else {
      target = target[segment] || (target[segment] = {})
    }
  }
})
const { createRpx2Unit } = require('@dcloudio/uni-shared')
const rpx2unit = createRpx2Unit(__UNIT__, __UNIT_RATIO__, __UNIT_PRECISION__)
const shared = require('@vue/shared')
const oldStringifyStyle = shared.stringifyStyle
shared.stringifyStyle = (styles) => rpx2unit(oldStringifyStyle(styles))
const serverRender = require('@vue/server-renderer')
const oldSsrRenderStyle = serverRender.ssrRenderStyle
serverRender.ssrRenderStyle = (raw) =>
  shared.isString(raw)
    ? rpx2unit(oldSsrRenderStyle(raw))
    : oldSsrRenderStyle(raw)
