export function setPageMeta ({
  pageStyle,
  rootFontSize
}) {
  const pageElm = document.querySelector('uni-page-body') || document.body
  pageElm.setAttribute('style', pageStyle)
  if (rootFontSize && document.documentElement.style.fontSize !== rootFontSize) {
    document.documentElement.style.fontSize = rootFontSize
  }
}
