module.exports = function(content) {
    this.cacheable && this.cacheable()
    return `<scroll-view :scroll-y="true" :enableBackToTop="true" bubble="true" style="flex-direction:column">${content}</scroll-view>`
}
