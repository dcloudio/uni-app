import { RuleSetRule } from 'webpack'

export const babelLoader: RuleSetRule = {
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        babelrc: false,
      },
    },
  ],
}
