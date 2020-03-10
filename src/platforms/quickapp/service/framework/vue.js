const injectRef = Object.getPrototypeOf(global) || global

const vueOptions = Object.create(null)

function Vue (options) {
  if (options && options.store) {
    vueOptions.store = options.store
  }
}

Vue.use = function (plugin) {
  (vueOptions.uses || (vueOptions.uses = [])).push(plugin)
}

Vue.mixin = function (mixin) {
  (vueOptions.mixins || (vueOptions.mixins = [])).push(mixin)
}

Vue.component = function () {}

injectRef.__VueOptions = vueOptions

// 目前仅支持 store, use, mixin

export default Vue
