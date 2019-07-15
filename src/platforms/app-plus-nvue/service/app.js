import Router from './router'

let appCtx

export function getApp () {
  return appCtx
}

export function registerApp (appVm, routes, plus) {
  appCtx = appVm
  appCtx.$router = new Router(routes, plus)
}
