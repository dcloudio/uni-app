export function converPx(value: string) {
  if (/^-?\d+[ur]px$/i.test(value)) {
    return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
      return `${uni.upx2px(parseFloat(num))}px`
    })
    // eslint-disable-next-line no-useless-escape
  } else if (/^-?[\d\.]+$/.test(value)) {
    return `${value}px`
  }
  return value || ''
}
