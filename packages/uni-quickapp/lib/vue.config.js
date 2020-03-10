global.framework = {}

const chainWebpack = require('./chain-webpack')
const configureWebpack = require('./configure-webpack')

module.exports = {
  chainWebpack,
  configureWebpack
}
