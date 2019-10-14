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
if(uni.restoreGlobal){
  uni.restoreGlobal(plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
${generatePageCode(appJson.pages, appJson.page)}
`
  }
}
