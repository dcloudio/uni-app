import {
  isPlainObject
}
  from 'uni-shared'

export function parseTitleNView (routeOptions) {
  const windowOptions = routeOptions.window
  const titleNView = windowOptions.titleNView
  if ( // 无头
    titleNView === false ||
    titleNView === 'false' ||
    (
      windowOptions.navigationStyle === 'custom' &&
      !isPlainObject(titleNView)
    )
  ) {
    return false
  }

  const ret = {
    autoBackButton: !routeOptions.meta.isQuit,
    backgroundColor: windowOptions.navigationBarBackgroundColor || '#000000',
    titleText: windowOptions.navigationBarTitleText || '',
    titleColor: windowOptions.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff'
  }

  if (isPlainObject(titleNView)) {
    return Object.assign(ret, titleNView)
  }

  return ret
}
