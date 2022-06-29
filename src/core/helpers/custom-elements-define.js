/**
 * customElements.define
 */
(function () {
  const defineProperty = Object.defineProperty
  const createElement = document.createElement
  const classes = new Map()
  const registry = new Map()

  if ('customElements' in window && customElements && customElements.define) {
    return
  }

  function HTMLBuiltIn () {
    const constructor = this.constructor
    if (!classes.has(constructor)) {
      throw new TypeError('Illegal constructor')
    }
    const is = classes.get(constructor)
    const element = createElement.call(document, is)
    return Object.setPrototypeOf(element, constructor.prototype)
  }

  defineProperty(HTMLBuiltIn.prototype = HTMLElement.prototype, 'constructor', {
    value: HTMLBuiltIn
  })
  defineProperty(window, 'HTMLElement', {
    configurable: true,
    value: HTMLBuiltIn
  })
  defineProperty(document, 'createElement', {
    configurable: true,
    value: function value (name, options) {
      const is = options && options.is
      const Class = is ? registry.get(is) : registry.get(name)
      return Class ? new Class() : createElement.call(document, name)
    }
  })
  defineProperty(window, 'customElements', {
    configurable: true,
    value: {
      define: function define (is, Class) {
        if (registry.has(is)) {
          throw new Error('the name "'.concat(is, '" has already been used with this registry'))
        }
        classes.set(Class, is)
        registry.set(is, Class)
      }
    }
  })
})()
