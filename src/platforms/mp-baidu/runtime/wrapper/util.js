export const mocks = ['nodeId', 'componentName', '_componentId']

export function isPage () {
  return !this.ownerId
}

export function initRelation (detail) {
  this.dispatch('__l', detail)
}
