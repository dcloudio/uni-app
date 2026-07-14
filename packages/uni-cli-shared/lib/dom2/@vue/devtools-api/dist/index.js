// uni-app x 暂不支持 @vue/devtools-api，保留新旧版本的运行时导出以兼容依赖加载
export function addCustomCommand() {}

export function addCustomTab() {}

export function onDevToolsClientConnected() {
  return Promise.resolve()
}

export function onDevToolsConnected() {
  return Promise.resolve()
}

export function removeCustomCommand() {}

export function setupDevToolsPlugin() {}

export const setupDevtoolsPlugin = setupDevToolsPlugin

export function isPerformanceSupported() {
  return false
}

export function now() {
  return Date.now()
}
