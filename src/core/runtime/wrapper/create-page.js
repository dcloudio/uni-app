import parsePage from 'uni-platform/runtime/wrapper/page-parser'

export default function createPage (vuePageOptions) {
  if (__PLATFORM__ === 'mp-alipay' || __PLATFORM__ === 'mp-xhs') {
    return Page(parsePage(vuePageOptions))
  } else {
    return Component(parsePage(vuePageOptions))
  }
}
