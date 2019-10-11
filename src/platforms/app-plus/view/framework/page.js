const pageFactory = Object.create(null)

export function definePage (name, createPageVueComponent) {
  pageFactory[name] = createPageVueComponent
}

export function createPage (name, options = {}) {
  return new (pageFactory[name]())(options)
}
