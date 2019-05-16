export const mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__']

export function findVmByVueId (vm, vuePid) {
  const $children = vm.$children
  // 优先查找直属
  let parentVm = $children.find(childVm => childVm.$scope._$vueId === vuePid)
  if (parentVm) {
    return parentVm
  }
  // 反向递归查找
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid)
    if (parentVm) {
      return parentVm
    }
  }
}

export function initBehavior (options) {
  return Behavior(options)
}

export function isPage () {
  return !!this.route
}

export function initRelation (detail) {
  this.triggerEvent('__l', detail)
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

export function handleLink (event) {
  const {
    vuePid,
    vueOptions
  } = event.detail || event.value // detail 是微信,value 是百度(dipatch)

  let parentVm

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid)
  }

  if (!parentVm) {
    parentVm = this.$vm
  }

  vueOptions.parent = parentVm
}
