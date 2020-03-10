// 目前仅支持 store, use, mixin, component

let store
const mixins = []
const plugins = []
const components = []

function Vue (options) {
  if (options && options.store) {
    store = options.store
  }
}

Vue.use = function (plugin) {
  plugins.push(plugin)
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
  install (Vue, options) {
    mixins.forEach(mixin => {
      Vue.mixin(mixin)
    })

    plugins.forEach(plugin => {
      Vue.use(plugin)
    })

    components.forEach(({
      id,
      definition
    }) => {
      Vue.component(id, definition)
    })

    store && (Vue.prototype.$store = store)
  }
}

export default Vue
