const fs = require('fs')

function generatePageCode (pages, pageOptions) {
  return pages.map(pagePath => {
    if (pageOptions[pagePath].nvue) {
      return ''
    }
    return `__definePage('${pagePath}',function(){return Vue.extend(require('${pagePath}.vue?mpType=page').default)})`
  }).join('\n')
}

function generateUniConfig (appJson, isAppView) {
  return isAppView ? `window.__uniConfig = ${JSON.stringify({ window: appJson.window }, null)};` : ''
}

function generatePolyfill () {
  return fs.readFileSync(require.resolve('@dcloudio/uni-cli-shared/lib/uni-polyfill.js'), { encoding: 'utf8' })
}

module.exports = function definePages (appJson, isAppView) {
  return {
    name: 'define-pages.js',
    content: `
${generatePolyfill()}
${generateUniConfig(appJson, isAppView)}
if(uni.restoreGlobal){
  uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
${generatePageCode(appJson.pages, appJson.page)}
`
  }
}
