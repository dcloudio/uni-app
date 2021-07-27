import { RuleSetRule } from 'webpack'
export const rules: RuleSetRule[] = [
  {
    test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
    loader: 'vue-loader',
  },
]
