import { RuleSetRule } from 'webpack'

export const vueLoader: RuleSetRule = {
  test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
  use: [
    {
      loader: 'vue-loader',
      options: {
        hotReload: false,
        compiler: require('../../../../../lib/weex-template-compiler'),
      },
    },
  ],
}
