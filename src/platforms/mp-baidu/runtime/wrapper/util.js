export const mocks = ['nodeId']

export function isPage () {
  return !this.ownerId
}

export function initRelation (detail) {
  this.dispatch('__l', detail)
}
