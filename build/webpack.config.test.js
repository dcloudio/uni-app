const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, '../', dir)

const pkg = require('../package.json')

let service = process.VUE_CLI_SERVICE
if (!service || process.env.VUE_CLI_API_MODE) {
  const Service = require('@vue/cli-service')
  service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
  service.init(process.env.VUE_CLI_MODE || process.env.NODE_ENV)
}

const config = service.resolveWebpackConfig()

config.resolve.alias = {
  '@': resolve('src'),
  'uni-core': resolve('src/core'),
  'uni-view': resolve('src/core/view'),
  'uni-service': resolve('src/core/service'),
  'uni-shared': resolve('src/shared'),
  'uni-mixins': resolve('src/core/view/mixins'),
  'uni-helpers': resolve('src/core/helpers'),
  'uni-platform': resolve('src/platforms/' + process.env.UNI_PLATFORM),
  'uni-components': resolve('src/core/view/components')
}

const isEslintLoader = config.module.rules[config.module.rules.length - 1].enforce

if (isEslintLoader) {
  config.module.rules.splice(config.module.rules.length - 1, 1)
} else {
  throw new Error('eslint-loader is undefined')
}

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(pkg.version),
    __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM)
  }),
  new webpack.ProvidePlugin({
    'console': [resolve('src/core/helpers/console'), 'default'],
    'UniViewJSBridge': [resolve('src/core/view/bridge/index')],
    'UniServiceJSBridge': [resolve('src/core/service/bridge/index')]
  })
])
module.exports = config
