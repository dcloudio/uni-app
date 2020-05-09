export const mocks = ['nodeId', 'componentName', '_componentId', 'uniquePrefix']

export function isPage () {
  return !this.ownerId
}

export function initRelation (detail) {
  this.dispatch('__l', detail)
}
