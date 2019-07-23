import {
  showWebview
} from './util'

export function navigateTo ({
  url,
  animationType,
  animationDuration
}) {
  const path = url.split('?')[0]

  UniServiceJSBridge.emit('onAppRoute', {
    type: 'navigateTo',
    path
  })

  showWebview(
    __registerPage({
      path
    }),
    animationType,
    animationDuration
  )
}
