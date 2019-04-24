export const mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__']

export function initPage (pageOptions) {
  return initComponent(pageOptions)
}

export function initComponent (componentOptions) {
  return Component(componentOptions)
}

export function initBehavior (options) {
  return Behavior(options)
}
export function initRefs (vm) {
  const mpInstance = vm.$scope
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = {}
      const components = mpInstance.selectAllComponents('.vue-ref')
      components.forEach(component => {
        const ref = component.dataset.ref
        $refs[ref] = component.$vm || component
      })
      const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for')
      forComponents.forEach(component => {
        const ref = component.dataset.ref
        if (!$refs[ref]) {
          $refs[ref] = []
        }
        $refs[ref].push(component.$vm || component)
      })
      return $refs
    }
  })
}
export function triggerLink (mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true
  })
}

export function handleLink (event) {
  if (event.detail.$mp) { // vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm
      event.detail.$parent.$children.push(event.detail)

      event.detail.$root = this.$vm.$root
    }
  } else { // vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm
    }
  }
}
