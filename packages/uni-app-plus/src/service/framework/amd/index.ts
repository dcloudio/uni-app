const registry = {
  promises: {} as Record<string, Promise<unknown>>,
  resolves: {} as Record<string, (v: unknown) => void>,
  getDependencyPromise: function (name: string) {
    if (!this.promises[name]) {
      const resolves = this.resolves
      this.promises[name] = new Promise(function (resolve) {
        resolves[name] = resolve
      })
    }
    return this.promises[name]
  },
  resolve: function (name: string, value: unknown) {
    this.getDependencyPromise(name)
    this.resolves[name](value)
    delete this.resolves[name]
  },
}

export function define(name: string, deps: string[], definition: Function) {
  require(deps, (...args: unknown[]) => {
    registry.resolve(name, definition.apply(null, args))
  })
}

export function require(deps: string[], definition: Function) {
  Promise.all(deps.map(registry.getDependencyPromise, registry)).then(function (
    result
  ) {
    definition.apply(null, result)
  })
}
