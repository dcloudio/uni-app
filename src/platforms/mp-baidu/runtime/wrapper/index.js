export function initPage (pageOptions) {
  initComponent(pageOptions)
}

export function initComponent (componentOptions) {
  componentOptions.messages = {
    '__l': handleLink
  }
}

export function triggerLink (mpInstance, vueOptions) {
  mpInstance.dispatch('__l', mpInstance.$vm || vueOptions)
}

export function handleLink (event) {
  const target = event.value
  if (target.$mp) {
    if (!target.$parent) {
      target.$parent = this.$vm
      target.$parent.$children.push(target)

      target.$root = this.$vm.$root
    }
  } else {
    if (!target.parent) {
      target.parent = this.$vm
    }
  }
}
