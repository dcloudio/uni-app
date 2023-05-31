export function initAppStatusbar(
  manifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  const titleColor =
    pagesJson.pages[0].style.navigationBar.titleColor ||
    pagesJson.globalStyle.navigationBar.titleColor ||
    '#000000'
  const backgroundColor =
    pagesJson.globalStyle.navigationBar.backgroundColor || '#000000'

  manifestJson.plus.statusbar = {
    immersed: 'supportedDevice',
    style: titleColor === '#ffffff' ? 'light' : 'dark',
    background: backgroundColor,
  }
  return manifestJson
}
