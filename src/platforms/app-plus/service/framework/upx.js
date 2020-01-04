const REGEX_UPX = /(\d+(\.\d+)?)[r|u]px/g

export function transformCSS (css) {
  return css.replace(REGEX_UPX, (a, b) => {
    return uni.upx2px(parseInt(b) || 0) + 'px'
  })
}
