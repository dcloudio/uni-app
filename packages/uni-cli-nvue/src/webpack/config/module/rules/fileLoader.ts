import { RuleSetRule } from 'webpack'

export function createFileLoader(): RuleSetRule {
  return {
    test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath: 'assets',
          outputPath: 'assets',
        },
      },
    ],
  }
}
