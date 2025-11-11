
const RequireAsyncDependenciesBlockParserPlugin = require('./RequireAsyncDependenciesBlockParserPlugin')
const RequireAsyncDependency = require('./RequireAsyncDependency')

class RequireAsyncPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const options = this.options
    compiler.hooks.compilation.tap('RequireAsyncPlugin',

      (compilation, { normalModuleFactory }) => {
        compilation.dependencyFactories.set(RequireAsyncDependency, normalModuleFactory)
        compilation.dependencyTemplates.set(RequireAsyncDependency, new RequireAsyncDependency.Template())

        const handler = (parser, parserOptions) => {
          new RequireAsyncDependenciesBlockParserPlugin(options).apply(parser)
        }

        normalModuleFactory.hooks.parser.for('javascript/auto').tap('RequireAsyncDependenciesBlockParserPlugin', handler)
        normalModuleFactory.hooks.parser.for('javascript/dynamic').tap('RequireAsyncDependenciesBlockParserPlugin', handler)
        normalModuleFactory.hooks.parser.for('javascript/esm').tap('RequireAsyncDependenciesBlockParserPlugin', handler)
      }
    )
  }
}
module.exports = RequireAsyncPlugin
