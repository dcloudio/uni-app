const AsyncDependenciesBlock = require('webpack/lib/AsyncDependenciesBlock')
const RequireAsyncDependency = require('./RequireAsyncDependency')

class RequireAsyncDependenciesBlock extends AsyncDependenciesBlock {
  constructor (request, range, groupOptions, module, loc, originModule) {
    super(groupOptions, module, loc, request)
    this.range = range
    const dep = new RequireAsyncDependency(request, originModule, this)
    dep.loc = loc
    this.addDependency(dep)
  }
}

module.exports = class RequireAsyncDependenciesBlockParserPlugin {
  constructor (options) {
    this.options = options
  }

  apply (parser) {
    parser.hooks.call
      .for('require.async').tap('RequireAsyncDependenciesBlockParserPlugin', expr => {
        const param = parser.evaluateExpression(expr.arguments[0])

        const { options: importOptions } = parser.parseCommentOptions(expr.range)
        let chunkName = null
        if (importOptions && importOptions.webpackChunkName !== undefined) {
          chunkName = importOptions.webpackChunkName
        }
        const groupOptions = { name: chunkName }

        const depBlock = new RequireAsyncDependenciesBlock(
          param.string,
          expr.range,
          groupOptions,
          parser.state.module,
          expr.loc,
          parser.state.module
        )

        parser.state.current.addBlock(depBlock)
        return true
      })
  }
}
