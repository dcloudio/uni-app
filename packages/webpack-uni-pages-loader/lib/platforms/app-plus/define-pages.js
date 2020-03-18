function generatePageCode (pages, pageOptions) {
  return pages.map(pagePath => {
    if (pageOptions[pagePath].nvue) {
      return ''
    }
    return `__definePage('${pagePath}',function(){return Vue.extend(require('${pagePath}.vue').default)})`
  }).join('\n')
}

module.exports = function definePages (appJson) {
  return {
    name: 'define-pages.js',
    content: `
if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}
if(uni.restoreGlobal){
  uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
${generatePageCode(appJson.pages, appJson.page)}
`
  }
}
