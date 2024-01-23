import getRealPath from 'uni-platform/helpers/get-real-path'

export function loadFontFace ({ options, callbackId }) {
  let { family, source, desc = {} } = options
  if (source.startsWith('url("') || source.startsWith('url(\'')) {
    source = `url('${getRealPath(source.substring(5, source.length - 2))}')`
  } else if (source.startsWith('url(')) {
    source = `url('${getRealPath(source.substring(4, source.length - 1))}')`
  } else {
    source = getRealPath(source)
  }

  const fonts = document.fonts
  if (fonts) {
    const fontFace = new FontFace(family, source, desc)
    fontFace
      .load()
      .then(() => {
        fonts.add(fontFace)
        UniViewJSBridge.publishHandler('onLoadFontFaceCallback', {
          callbackId,
          data: {
            errMsg: 'loadFontFace:ok'
          }
        })
      })
      .catch(error => {
        UniViewJSBridge.publishHandler('onLoadFontFaceCallback', {
          callbackId,
          data: {
            errMsg: `loadFontFace:fail ${error}`
          }
        })
      })
  } else {
    var style = document.createElement('style')
    style.innerText = `@font-face{font-family:"${family}";src:${source};font-style:${desc.style};font-weight:${desc.weight};font-stretch:${desc.stretch};unicode-range:${desc.unicodeRange};font-variant:${desc.variant};font-feature-settings:${desc.featureSettings};}`
    document.head.appendChild(style)
    UniViewJSBridge.publishHandler('onLoadFontFaceCallback', {
      callbackId,
      data: {
        errMsg: 'loadFontFace:ok'
      }
    })
  }
}
