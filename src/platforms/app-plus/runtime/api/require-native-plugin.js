export function requireNativePlugin (pluginName) {
  /* eslint-disable no-undef */
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName)
  }
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName)
}
