import {
  isObject
} from 'uni-shared'

export const mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__']

export function findVmByVueId (vm, vuePid) {
  const $children = vm.$children
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i]
    if (childVm.$scope._$vueId === vuePid) {
      return childVm
    }
  }
  // 反向递归查找
  let parentVm
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

function selectAllComponents (mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector) || []
  components.forEach(component => {
    const ref = component.dataset.ref
    $refs[ref] = component.$vm || toSkip(component)
    if (__PLATFORM__ === 'mp-weixin') {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(scopedComponent => {
          selectAllComponents(scopedComponent, selector, $refs)
        })
      }
    }
  })
}

export function syncRefs (refs, newRefs) {
  const oldKeys = new Set(...Object.keys(refs))
  const newKeys = Object.keys(newRefs)
  newKeys.forEach(key => {
    const oldValue = refs[key]
    const newValue = newRefs[key]
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(value => oldValue.includes(value))) {
      return
    }
    refs[key] = newValue
    oldKeys.delete(key)
  })
  oldKeys.forEach(key => {
    delete refs[key]
  })
  return refs
}

export function initRefs (vm) {
  const mpInstance = vm.$scope
  const refs = {}
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = {}
      selectAllComponents(mpInstance, '.vue-ref', $refs)
      // TODO 暂不考虑 for 中的 scoped
      const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || []
      forComponents.forEach(component => {
        const ref = component.dataset.ref
        if (!$refs[ref]) {
          $refs[ref] = []
        }
        $refs[ref].push(component.$vm || toSkip(component))
      })
      return syncRefs(refs, $refs)
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

export function markMPComponent (component) {
  // 在 Vue 中标记为小程序组件
  const IS_MP = '__v_isMPComponent'
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  })
  return component
}

export function toSkip (obj) {
  const OB = '__ob__'
  const SKIP = '__v_skip'
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: {
        [SKIP]: true
      }
    })
  }
  return obj
}

const WORKLET_RE = /_(.*)_worklet_factory_/
export function initWorkletMethods (mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE)
      if (matches) {
        const workletName = matches[1]
        mpMethods[name] = vueMethods[name]
        mpMethods[workletName] = vueMethods[workletName]
      }
    })
  }
}
