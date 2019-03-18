export function triggerLink (mpInstance) {
  mpInstance.triggerEvent('__l', mpInstance.$vm, {
    bubbles: true,
    composed: true
  })
}

export function handleLink (event) {
  if (!event.detail.$parent) {
    event.detail.$parent = this.$vm
    event.detail.$parent.$children.push(event.detail)

    event.detail.$root = this.$vm.$root
  }
}
