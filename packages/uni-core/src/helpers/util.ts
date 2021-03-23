export function PolySymbol(name: string) {
  return Symbol(__DEV__ ? '[uni-app]: ' + name : name)
}

export function rpx2px(str: string | number) {
  if (typeof str === 'string') {
    const res = parseInt(str) || 0
    if (str.indexOf('rpx') !== -1 || str.indexOf('upx') !== -1) {
      return uni.upx2px(res)
    }
    return res
  }
  return str
}
