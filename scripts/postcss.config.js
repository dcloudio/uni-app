const {
  uniPostcssPlugin,
  parseRpx2UnitOnce,
} = require('@dcloudio/uni-cli-shared')
module.exports = {
  plugins: [
    uniPostcssPlugin(
      Object.assign(
        { page: process.env.UNI_PLATFORM === 'h5' ? 'uni-page-body' : 'body' },
        parseRpx2UnitOnce(process.env.UNI_INPUT_DIR)
      )
    ),
    require('autoprefixer')(),
  ],
}
