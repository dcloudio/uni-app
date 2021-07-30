import { RuleSetRule } from 'webpack'

export function createBabelLoader(): RuleSetRule {
  return {
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
}
