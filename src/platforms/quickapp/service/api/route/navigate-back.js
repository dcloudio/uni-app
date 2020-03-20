import router from '@system.router'

export function navigateBack ({
  delta
}) {
  // TODO delta
  router.back()
  return {
    errMsg: 'navigateBack:ok'
  }
}
