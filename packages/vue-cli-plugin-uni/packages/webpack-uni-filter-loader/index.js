const path = require('path')

const loaderUtils = require('loader-utils')

const t = require('@babel/types')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const {
  normalizeNodeModules
} = require('@dcloudio/uni-cli-shared/lib/platform')

module.exports = function(source, map) {
  const params = loaderUtils.parseQuery(this.resourceQuery)
  if (
    process.env.UNI_PLATFORM === 'h5' ||
    (
      process.env.UNI_PLATFORM === 'app-plus' &&
      process.env.UNI_USING_V3
    )
  ) { // h5 or v3 app-plus
    this.callback(
      null,
      `export default function (Component) {
       (Component.options.wxs||(Component.options.wxs={}))['${params.module}'] = (function(module){
       ${source.trim()}
       return module.exports
       })({exports:{}});
     }`,
      map
    )
  } else { // mp
    const callMethods = new Set()
    if (source.indexOf('callMethod') !== -1) {
      traverse(parser.parse(source, {
        sourceType: 'module'
      }), {
        MemberExpression(path, state) {
          const property = path.node.property
          const parentNode = path.parent
          if (
            (
              property.name === 'callMethod' ||
              property.value === 'callMethod'
            ) &&
            t.isCallExpression(parentNode) &&
            t.isLiteral(parentNode.arguments[0])
          ) {
            callMethods.add(parentNode.arguments[0].value)
          }
        }
      })
    }
    if (params.issuerPath) {
      const resourcePath = normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, this.resourcePath))
      this.emitFile(resourcePath, source)
    }
    this.callback(null,
      `export default function (Component) {
       if(!Component.options.wxsCallMethods){
         Component.options.wxsCallMethods = []
       }
       ${[...callMethods].map(method=>{
           return "Component.options.wxsCallMethods.push('"+method+"')"
       }).join('\n')}
     }`,
      map)
  }
}
