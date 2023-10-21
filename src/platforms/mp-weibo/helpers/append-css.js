export default function appendCss (css, cssId, replace = false) {
  let style = document.getElementById(cssId)
  if (style && replace) {
    style.parentNode.removeChild(style)
    style = null
  }
  if (!style) {
    style = document.createElement('style')
    style.type = 'text/css'
    cssId && (style.id = cssId)
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  style.appendChild(document.createTextNode(css))
}
