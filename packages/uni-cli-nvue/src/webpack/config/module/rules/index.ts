import { RuleSetRule } from 'webpack'
export const rules: RuleSetRule[] = [
  {
    test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
    loader: 'vue-loader',
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
        },
      },
    ],
  },
]
