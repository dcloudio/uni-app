export {
  initBehavior
}
  from '../../../mp-weixin/runtime/wrapper/index'

const instances = Object.create(null)

export const mocks = ['__route__', '__webviewId__', '__nodeid__']

export function initPage (pageOptions) {
  return initComponent(pageOptions)
}

export function initComponent (componentOptions) {
  if (componentOptions.properties) { // ref
    componentOptions.properties.vueRef = {
      type: String,
      value: ''
    }
  }
  return Component(componentOptions)
}

export function initRefs (vm) {
  const mpInstance = vm.$scope
  mpInstance.selectAllComponents('.vue-ref', (components) => {
    components.forEach(component => {
      const ref = component.data.vueRef // 头条的组件 dataset 竟然是空的
      vm.$refs[ref] = component.$vm || component
    })
  })
  mpInstance.selectAllComponents('.vue-ref-in-for', (forComponents) => {
    forComponents.forEach(component => {
      const ref = component.data.vueRef
      if (!vm.$refs[ref]) {
        vm.$refs[ref] = []
      }
      vm.$refs[ref].push(component.$vm || component)
    })
  })
}

export function triggerLink (mpInstance) {
  const nodeId = mpInstance.__nodeid__ + ''
  const webviewId = mpInstance.__webviewId__ + ''

  instances[webviewId + '_' + nodeId] = mpInstance.$vm

  mpInstance.triggerEvent('__l', {
    nodeId,
    webviewId
  }, {
    bubbles: true,
    composed: true
  })
}
// TODO 目前有 bug，composed 不生效
export function handleLink (event) {
  const nodeId = event.detail.nodeId
  const webviewId = event.detail.webviewId

  const childVm = instances[webviewId + '_' + nodeId]

  if (childVm) {
    childVm.$parent = this.$vm
    childVm.$parent.$children.push(event.detail)

    childVm.$root = this.$vm.$root
    delete instances[webviewId + '_' + nodeId]
  }
}
