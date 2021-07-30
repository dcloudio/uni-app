export function createVueLoaderPlugin() {
  const { VueLoaderPlugin } = require('../../../../lib/vue-loader')
  return new VueLoaderPlugin()
}
