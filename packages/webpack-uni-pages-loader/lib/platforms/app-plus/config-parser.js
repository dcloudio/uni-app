function generatePageCode (pages) {
  return pages.map(pagePath => {
    return `__registerPage('${pagePath}',function(){
      const cacheKey = '${pagePath}-VueComponent'
      if(!this[cacheKey]){
        this[cacheKey] = Vue.extend(require('${pagePath}.vue').default)
      }
      return this[cacheKey]
    })`
  }).join('\n')
}

module.exports = function parseConfig (appJson) {
  return {
    name: 'app-config.js',
    content: `
import Vue from 'vue'
__registerConfig(${JSON.stringify(appJson)},Vue)
${generatePageCode(appJson.pages)}
`
  }
}
