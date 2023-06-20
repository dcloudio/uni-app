import { handleProps, markMPComponent } from './wrapper/util'

const MPComponent = Component

function initHook (name, options) {
  const oldHook = options[name]
  options[name] = function (...args) {
    markMPComponent(this)
    const props = this.props
    if (props && props['data-com-type'] === 'wx') {
      handleProps(this)
    }
    if (oldHook) {
      return oldHook.apply(this, args)
    }
  }
}

if (!MPComponent.__$wrappered) {
  MPComponent.__$wrappered = true
  Component = function (options = {}) {
    initHook('onInit', options)
    return MPComponent(options)
  }
}
