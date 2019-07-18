import {
  showWebview
} from './webview'

export default function initNavigateTo ({
  __registerPage
}) {
  return function navigateTo (path, {
    animationType,
    animationDuration
  }) {
    showWebview(
      __registerPage({
        path
      }),
      animationType,
      animationDuration
    )
  }
}
