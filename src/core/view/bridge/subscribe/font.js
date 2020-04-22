export function loadFontFace ({
  options,
  callbackId
}) {
  const { family, source, desc = {} } = options
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
