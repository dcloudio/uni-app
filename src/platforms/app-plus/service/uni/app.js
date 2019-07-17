import Router from 'uni-platform/service/uni/router/index'

let appCtx

export function getApp () {
  return appCtx
}

function initListeners ({
  plus
}) {
  plus.key.addEventListener('backbutton', () => {
    appCtx.$router.go(-1)
  })
}

export function registerApp (appVm, instanceContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerApp`)
  }
  appCtx = appVm
  appCtx.$router = new Router(instanceContext)
  initListeners(instanceContext)
}
