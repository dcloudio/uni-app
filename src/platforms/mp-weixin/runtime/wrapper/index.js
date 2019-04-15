export function initPage () {

}

export function initComponent () {

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
