const instances = Object.create(null)

export function initPage (pageOptions) {
  initComponent(pageOptions)
}

export function initComponent (componentOptions) {
  if (componentOptions.properties) { // ref
    componentOptions.properties.vueRef = {
      type: String,
      value: ''
    }
  }
  const oldAttached = componentOptions.lifetimes.attached
  componentOptions.lifetimes.attached = function () {
    oldAttached.call(this)
    // TODO 需要处理动态变化后的 refs
    initRefs.call(this)
  }
}

function initRefs () {
  this.selectAllComponents('.vue-ref', (components) => {
    components.forEach(component => {
      const ref = component.data.vueRef // 头条的组件 dataset 竟然是空的
      this.$vm.$refs[ref] = component.$vm || component
    })
  })
  this.selectAllComponents('.vue-ref-in-for', (forComponents) => {
    forComponents.forEach(component => {
      const ref = component.data.vueRef
      if (!this.$vm.$refs[ref]) {
        this.$vm.$refs[ref] = []
      }
      this.$vm.$refs[ref].push(component.$vm || component)
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
