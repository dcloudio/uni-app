import {
  findVmByVueId,
  initRefs as initRefsBase,
  toSkip
} from '../../../mp-weixin/runtime/wrapper/util'

export const mocks = ['__route__', '__webviewId__', '__nodeid__', '__nodeId__']

export function isPage () {
  return this.__nodeid__ === 0 || this.__nodeId__ === 0
}

export function initRefs (vm) {
  const mpInstance = vm.$scope
  /* eslint-disable no-undef */
  const minorVersion = parseInt(tt.getSystemInfoSync().SDKVersion.split('.')[1])
  if (minorVersion > 16) {
    initRefsBase(vm)
  } else {
    mpInstance.selectAllComponents('.vue-ref', (components) => {
      components.forEach(component => {
        const ref = component.dataset.ref
        vm.$refs[ref] = component.$vm || toSkip(component)
      })
    })
    mpInstance.selectAllComponents('.vue-ref-in-for', (forComponents) => {
      forComponents.forEach(component => {
        const ref = component.dataset.ref
        if (!vm.$refs[ref]) {
          vm.$refs[ref] = []
        }
        vm.$refs[ref].push(component.$vm || toSkip(component))
      })
    })
  }
}

export const instances = Object.create(null)
export const components = Object.create(null)

export function initRelation ({
  vuePid,
  mpInstance
}) {
  // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  const nodeId = (mpInstance.__nodeId__ || mpInstance.__nodeid__) + ''
  const webviewId = mpInstance.__webviewId__ + ''

  instances[webviewId + '_' + nodeId] = mpInstance.$vm

  this.triggerEvent('__l', {
    vuePid,
    nodeId,
    webviewId
  })
}

export function handleLink ({
  detail: {
    vuePid,
    nodeId,
    webviewId
  }
}) {
  const vm = instances[webviewId + '_' + nodeId]
  if (!vm) {
    return
  }

  let parentVm

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid)
  }

  if (!parentVm) {
    parentVm = this.$vm
  }

  vm.$parent = parentVm
  vm.$root = parentVm.$root
  parentVm.$children.push(vm)

  vm.__call_hook('created')
  vm.__call_hook('beforeMount')
  vm._isMounted = true
  vm.__call_hook('mounted')
  vm.__call_hook('onReady')
}
