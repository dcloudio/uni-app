import Vue = require('vue')

type MergeHook = (parentVal: undefined | Function[], childVal?: Function | Function[]) => void | Function[]

export function init() {
  const vueConstructor = (Vue.default ? Vue.default : Vue) as typeof Vue.default
  const defaultMergeHook = vueConstructor.config.optionMergeStrategies.mounted as MergeHook
  let onReadyFn: Function
  // 向后移动 onReady 触发时机，暂不改动主框架
  vueConstructor.config.optionMergeStrategies.mounted = function Le(parentVal: undefined | Function[], childVal?: Function | Function[]) {
    const res = defaultMergeHook.call(this, parentVal, childVal) as ReturnType<MergeHook>
    if (Array.isArray(res)) {
      let index: number
      if (onReadyFn) {
        index = res.indexOf(onReadyFn)
      } else {
        index = res.findIndex(fn => fn.toString().includes('onReady'))
        onReadyFn = res[index]
      }
      if (index !== -1) {
        res.splice(index, 1)
        res.push(onReadyFn)
      }
    }
    return res
  }
}
