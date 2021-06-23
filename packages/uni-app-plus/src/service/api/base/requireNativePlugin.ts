declare const weex: any
declare const __requireNativePlugin__: any

export function requireNativePlugin(pluginName: string) {
  /* eslint-disable no-undef */
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName)
  }
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName)
}
