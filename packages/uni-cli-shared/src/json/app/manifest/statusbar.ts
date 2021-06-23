export function initAppStatusbar(
  manifestJson: Record<string, any>,
  pagesJson: Record<string, any>
) {
  const {
    navigationBarTextStyle = 'white',
    navigationBarBackgroundColor = '#000000',
  } = pagesJson.globalStyle || {}

  manifestJson.plus.statusbar = {
    immersed: 'supportedDevice',
    style: navigationBarTextStyle === 'black' ? 'dark' : 'light',
    background: navigationBarBackgroundColor,
  }
}
