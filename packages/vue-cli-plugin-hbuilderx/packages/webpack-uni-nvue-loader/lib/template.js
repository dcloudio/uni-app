module.exports = function(content) {
  this.cacheable && this.cacheable()
  if (content.indexOf('recycle-list') === -1) {
    return `<scroll-view :scroll-y="true" :enableBackToTop="true" bubble="true" style="flex-direction:column">${content}</scroll-view>`
  }
  return content
}
