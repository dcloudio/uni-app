function findVmById (id, vm) {
  if (id === vm._$id) {
    return vm
  }
  const childVms = vm.$children
  const len = childVms.length
  for (let i = 0; i < len; i++) {
    const childVm = findVmById(id, childVms[i])
    if (childVm) {
      return childVm
    }
  }
}

export function findElm (component, pageVm) {
  if (!pageVm) {
    return console.error('page is not ready')
  }
  if (!component) {
    return pageVm.$el
  }
  if (__PLATFORM__ === 'app-plus') {
    if (typeof component === 'string') {
      const componentVm = findVmById(component, pageVm)
      if (!componentVm) {
        throw new Error(`Not Found：Page[${pageVm.$page.id}][${component}]`)
      }
      return componentVm.$el
    }
  }
  return component.$el
}

export function elementMatchesPolyfill (Element) {
  if (!Element.matches) {
    Element.matches =
        Element.matchesSelector ||
        Element.mozMatchesSelector ||
        Element.msMatchesSelector ||
        Element.oMatchesSelector ||
        Element.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s)
          var i = matches.length
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1
        }
  }
  return Element
}
