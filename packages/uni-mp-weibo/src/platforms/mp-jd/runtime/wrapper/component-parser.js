import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-parser'

export default function parseComponent (vueComponentOptions, needVueOptions) {
  const [componentOptions, vueOptions] = parseBaseComponent(vueComponentOptions, true)
  // 京东小程序 lifetimes 存在兼容问题
  const lifetimes = componentOptions.lifetimes
  Object.keys(lifetimes).forEach(key => {
    componentOptions[key] = lifetimes[key]
  })
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions
}
