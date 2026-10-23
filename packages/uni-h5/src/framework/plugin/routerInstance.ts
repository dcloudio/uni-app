import type { Router } from 'vue-router'

// Vapor 不支持 globalProperties，框架级导航 API 从这里读取 Router。
let router: Router

export function setRouterInstance(value: Router) {
  router = value
}

export function getRouterInstance() {
  return router
}
