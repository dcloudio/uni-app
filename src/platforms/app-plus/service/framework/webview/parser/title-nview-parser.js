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

  const titleImage = windowOptions.titleImage || ''
  const transparentTitle = windowOptions.transparentTitle || 'none'
  const titleNViewTypeList = {
    'none': 'default',
    'auto': 'transparent',
    'always': 'float'
  }

  const ret = {
    autoBackButton: !routeOptions.meta.isQuit,
    titleText: titleImage === '' ? windowOptions.navigationBarTitleText || '' : '',
    titleColor: windowOptions.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
    type: titleNViewTypeList[transparentTitle],
    backgroundColor: transparentTitle !== 'always' ? windowOptions.navigationBarBackgroundColor || '#000000' : 'rgba(0,0,0,0)',
    tags: titleImage === '' ? [] : [{
      'tag': 'img',
      'src': titleImage,
      'position': {
        'left': 'auto',
        'top': 'auto',
        'width': 'auto',
        'height': '26px'
      }
    }]
  }

  routeOptions.meta.statusBarStyle = windowOptions.navigationBarTextStyle === 'black' ? 'dark' : 'light'

  if (isPlainObject(titleNView)) {
    return Object.assign(ret, titleNView)
  }

  return ret
}
