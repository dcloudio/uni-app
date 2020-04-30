const defaultApp = {
  globalData: {}
}

function wrapper (def) {
  if (def.__$processed) {
    return def
  }
  const methods = def.methods
  if (methods) {
    Object.keys(methods).forEach(name => {
      def[name] = methods[name]
    })
    delete def.methods
  }
  // merge defaultApp
  Object.keys(defaultApp).forEach(name => {
    if (name !== 'globalData') {
      def[name] = defaultApp[name]
    }
  })
  if (!def.globalData) {
    def.globalData = {}
  }
  Object.assign(def.globalData, defaultApp.globalData)
  def.__$processed = true
  return def
}

export function getApp ({
  allowDefault = false
} = {}) {
  /* eslint-disable no-undef */
  if (inst.$def) {
    return wrapper(inst.$def)
  }
  if (allowDefault) { // 返回默认实现
    return defaultApp
  }
}
