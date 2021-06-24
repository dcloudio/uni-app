export function initNVue(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta,
  path: string
) {
  if (path && routeMeta.isNVue) {
    ;(webviewStyle as any).uniNView = {
      path,
      defaultFontSize: (__uniConfig as any).defaultFontSize,
      viewport: (__uniConfig as any).viewport,
    }
  }
}
