/* eslint-disable no-undef */
if (typeof __VueOptions !== 'undefined') {
  // 将 main.js 中的 store，use，mixin 同步到 page
  const {
    uses,
    mixins,
    store
  } = __VueOptions
  uses && uses.forEach(use => {
    Vue.use(use)
  })
  mixins && mixins.forEach(mixin => {
    Vue.mixin(mixin)
  })
  store && (Vue.prototype.$store = store)
}
