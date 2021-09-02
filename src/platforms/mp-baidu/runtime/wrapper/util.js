export const mocks = ['nodeId', 'componentName', '_componentId', 'uniquePrefix']

export function isPage () {
  // 百度小程序组件的id，某些情况下可能是number类型的0，不能直接return !this.ownerId 判断当前组件是否是Page
  // 否则会导致mounted不执行
  // 基础库 3.290.33 及以上 ownerId 为 null
  return typeof this.ownerId === 'undefined' || this.ownerId === null
}

export function initRelation (detail) {
  this.dispatch('__l', detail)
}
