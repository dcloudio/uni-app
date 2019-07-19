import {
  showWebview
} from './util'

export default function navigateTo ({
  path,
  animationType,
  animationDuration
}, {
  __registerPage
}) {
  showWebview(
    __registerPage({
      path
    }),
    animationType,
    animationDuration
  )
}
