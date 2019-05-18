import parseComponent from 'uni-platform/runtime/wrapper/component-parser'

export default function createComponent (vueOptions) {
  if (__PLATFORM__ === 'mp-alipay') {
    return my.createComponent(parseComponent(vueOptions))
  } else {
    return Component(parseComponent(vueOptions))
  }
}
