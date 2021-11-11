const promises: Record<string, Promise<unknown>> = {
  require: new Promise(function (resolve) {
    resolves.require = req
  }),
}

const resolves: Record<string, (...args: any[]) => void> = {}

function deps(name: string) {
  if (!promises[name]) {
    promises[name] = new Promise(function (resolve) {
      resolves[name] = resolve
    })
  }
  return promises[name]
}

function resolve(name: string) {
  deps(name)
  resolves[name]()
  delete resolves[name]
}

export type Define = typeof def
export type Require = typeof req
export type Exports = Record<string, any>

export function def(
  name: string,
  deps: string[],
  definition: (...args: any[]) => void
) {
  req(deps, () => resolve(name))
}

export function req(modules: string[], definition: (...args: any[]) => void) {
  Promise.all(modules.map(deps)).then((result) =>
    definition.apply(null, result)
  )
}
