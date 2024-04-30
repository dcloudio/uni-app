import { ON_RESIZE, debounce } from '@dcloudio/uni-shared'

export function onWebviewResize(webview: PlusWebviewWebviewObject) {
  const { emit } = UniServiceJSBridge
  const onResize = function ({
    width,
    height,
  }: {
    width: number
    height: number
  }) {
    const landscape = Math.abs(plus.navigator.getOrientation()) === 90
    const res = {
      deviceOrientation: landscape ? 'landscape' : 'portrait',
      size: {
        windowWidth: Math.ceil(width),
        windowHeight: Math.ceil(height),
      },
    }
    emit(ON_RESIZE, res, parseInt(webview.id!)) // Page lifecycle
  }
  webview.addEventListener(
    'resize' as any,
    debounce(onResize, 50, { setTimeout, clearTimeout })
  )
}
