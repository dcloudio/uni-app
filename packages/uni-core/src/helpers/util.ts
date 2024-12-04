import { isString } from '@vue/shared'
export function PolySymbol(name: string) {
  return Symbol(__DEV__ ? '[uni-app]: ' + name : name)
}

function hasRpx(str: string) {
  str = str + ''
  return str.indexOf('rpx') !== -1 || str.indexOf('upx') !== -1
}

export function rpx2px(str: string | number): number
export function rpx2px(str: string, replace: true): string
export function rpx2px(str: string | number, replace = false) {
  if (replace) {
    return rpx2pxWithReplace(str as string)
  }
  if (__NODE_JS__) {
    return parseInt(str + '')
  }
  if (isString(str)) {
    const res = parseInt(str) || 0
    if (hasRpx(str)) {
      return uni.upx2px(res)
    }
    return res
  }
  return str
}

function rpx2pxWithReplace(str: string) {
  if (__NODE_JS__) {
    return str
  }
  if (!hasRpx(str)) {
    return str
  }
  return str.replace(/(\d+(\.\d+)?)[ru]px/g, (_a, b) => {
    return uni.upx2px(parseFloat(b)) + 'px'
  })
}

export function get$pageByPage(
  page: UniPage | Page.PageInstance<AnyObject, {}>
): Page.PageInstance['$page'] {
  return __X__
    ? (page as UniPage).vm.$basePage
    : (page as Page.PageInstance<AnyObject, {}>).$page
}

export function isBuiltInElement(target: HTMLElement): boolean {
  if (__X__ && __PLATFORM__ === 'h5') {
    // @ts-expect-error use private property
    return !!target.__isUniElement
  }
  return target.tagName.indexOf('UNI-') === 0
}
