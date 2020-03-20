// 目前仅支持 store, use, mixin, component, prototype

let store
const mixins = []
const plugins = []
const components = []

// fake
function Vue (options) {
  if (options && options.store) {
    store = options.store
  }
}

Vue.prototype.$mount = function () {}

Vue.config = {}

Vue.use = function (plugin) {
  const isVuex = plugin.Store && plugin.mapState
  if (isVuex) {
    const exports = {}
    /* eslint-disable no-undef */
    context.VueFactory(exports, {} /* document */, {} /* quickappHelper */)
    plugin.install(exports.Vue)
  } else {
    plugins.push(plugin)
  }
}

Vue.mixin = function (mixin) {
  mixins.push(mixin)
}

Vue.component = function (id, definition) {
  components.push({
    id,
    definition
  })
}

const injectRef = Object.getPrototypeOf(global) || global

injectRef.__VuePlugin = {
  install (PageVue, options) {
    mixins.forEach(mixin => {
      PageVue.mixin(mixin)
    })

    plugins.forEach(plugin => {
      PageVue.use(plugin)
    })

    components.forEach(({
      id,
      definition
    }) => {
      PageVue.component(id, definition)
    })

    Object.keys(Vue.prototype).forEach(name => {
      if (name !== '$mount') {
        PageVue.prototype[name] = Vue.prototype[name]
      }
    })

    store && (PageVue.prototype.$store = store)
  }
}

export default Vue
