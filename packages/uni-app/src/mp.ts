import Vue from 'vue'

interface SetupFunction extends Function {
  lifecycles?: string[]
}

function updateLifeCycle(lifecycles: string[], setupLifecycles: string[], fn?: SetupFunction) {
  if (fn) {
    if (fn.lifecycles) {
      fn.lifecycles.forEach(item => {
        if (!setupLifecycles.includes(item)) {
          setupLifecycles.push(item)
        }
      })
    } else {
      const fnString = fn.toString()
      lifecycles.forEach(item => {
        if (!setupLifecycles.includes(item) && (new RegExp(`\\b(${item})\\b`)).test(fnString)) {
          setupLifecycles.push(item)
        }
      })
    }
  }
}

export function init(lifecycles: string[]) {
  // 通过 setup 函数简易分析使用到的生命周期，合并至 options 中
  // TODO 编译过程静态分析 或 将页面 Vue 组件创建移至小程序组件创建之前
  let setup = Vue.config.optionMergeStrategies.setup
  const extend = Vue.extend
  Vue.extend = function () {
    const extendedVue = extend.apply(this, arguments)
    const newOptions = extendedVue.options
    const setup: SetupFunction | undefined = newOptions.setup
    if (setup && setup.lifecycles) {
      setup.lifecycles.forEach(item => {
        newOptions[item] = newOptions[item] || [function noop() { }]
      })
    }
    return extendedVue
  }
  Object.defineProperty(Vue.config.optionMergeStrategies, 'setup', {
    set(fn) {
      setup = fn
    },
    get() {
      return function (to: Function, from: Function) {
        if (typeof setup === 'function') {
          const newSetup: SetupFunction = setup.apply(this, arguments)
          newSetup.lifecycles = newSetup.lifecycles || []
          updateLifeCycle(lifecycles, newSetup.lifecycles, from)
          updateLifeCycle(lifecycles, newSetup.lifecycles, to)
          return newSetup
        }
      }
    }
  })
}
