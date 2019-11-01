import {
  transformCSS
} from '../../upx'

export function parseStyleUnit(styles) {
  let newStyles = {}
  const stylesStr = JSON.stringify(styles)
  if (~stylesStr.indexOf('upx') || ~stylesStr.indexOf('rpx')) {
    try {
      newStyles = JSON.parse(transformCSS(stylesStr))
    } catch (e) {
      newStyles = styles
      console.error(e)
    }
  } else {
    newStyles = JSON.parse(stylesStr)
  }

  return newStyles
}
