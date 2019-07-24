export {
  unpack,
  invoke
}
  from 'uni-core/service/bridge'

export function requireNativePlugin (name) {
  return uni.requireNativePlugin(name)
}

/**
 * 触发 service 层，与 onMethod 对应
 */
export function publish (name, res) {
  return UniServiceJSBridge.emit('api.' + name, res)
}
