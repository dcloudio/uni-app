const {
  getPlatformCssnano
} = require('@dcloudio/uni-cli-shared')

module.exports = function initCssnanoOptions (webpackConfig) {
  const module = webpackConfig.module
  // TODO 临时 hack calc:false 看看 vue cli 后续是否开放 cssnano 的配置
  const cssnanoOptions = {
    sourceMap: false,
    plugins: [require('cssnano')({
      preset: ['default', getPlatformCssnano()]
    })]
  }

  module.rule('css').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('css').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('css').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('css').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

  module.rule('postcss').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('postcss').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('postcss').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('postcss').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

  module.rule('scss').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('scss').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('scss').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('scss').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

  module.rule('sass').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('sass').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('sass').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('sass').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

  module.rule('less').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('less').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('less').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('less').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

  module.rule('stylus').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('stylus').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
  module.rule('stylus').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
    cssnanoOptions)
  module.rule('stylus').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
}
