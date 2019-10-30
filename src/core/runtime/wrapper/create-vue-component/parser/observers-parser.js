function parseSinglePath (path) {
  return path.split('.')
}

function parseMultiPaths (paths) {
  return paths.split(',').map(path => parseSinglePath(path))
}

export function parseObservers (observers, vueComponentOptions) {
  if (!observers) {
    return
  }

  const {
    mpObservers
  } = vueComponentOptions

  Object.keys(observers).forEach(path => {
    mpObservers.push({
      paths: parseMultiPaths(path),
      observer: observers[path]
    })
  })
}
