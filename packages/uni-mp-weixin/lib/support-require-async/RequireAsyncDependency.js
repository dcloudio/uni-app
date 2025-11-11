const path = require('path')
const ImportDependency = require('webpack/lib/dependencies/ImportDependency')

class RequireAsyncDependency extends ImportDependency {

};

RequireAsyncDependency.Template = class ImportDependencyTemplate {
  apply (dep, source, runtime) {
    let content = runtime.moduleExports({
      module: dep.module,
      request: dep.request
    })

    // 目前只支持相对路径引用
    const relativePath = path.relative(dep.originModule.context, dep.module.userRequest)
    // 利用 require.async 加载分包中的资源，取代web环境下的 __webpack_require__.e(...)
    content = `require.async("${relativePath}").then(function(){return ${content} })`
    source.replace(dep.block.range[0], dep.block.range[1] - 1, content)
  }
}

module.exports = RequireAsyncDependency
