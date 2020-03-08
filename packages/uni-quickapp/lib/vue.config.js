require('./env')

const chainWebpack = require('./chain-webpack')
const configureWebpack = require('./configure-webpack')

module.exports = {
  chainWebpack,
  configureWebpack
}
