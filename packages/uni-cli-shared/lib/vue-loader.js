const defaultOptions = {
  compiler: require('@dcloudio/uni-template-compiler'),
  hotReload: false,
  cacheDirectory: false,
  cacheIdentifier: false
}

const defaultCompilerOptions = {
  preserveWhitespace: false
}

module.exports = {
  test: [/\.vue$/, /\.nvue$/],
  loader: require.resolve('@dcloudio/vue-cli-plugin-uni/packages/vue-loader'),
  options (options = {}, compilerOptions = {}) {
    return Object.assign({},
      defaultOptions,
      options, {
        compilerOptions: Object.assign({}, defaultCompilerOptions, compilerOptions)
      })
  }
}
