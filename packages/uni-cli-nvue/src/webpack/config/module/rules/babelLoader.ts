import { RuleSetRule } from 'webpack'
import { resolveLoader } from '../../../loader'
const preprocessLoader = {
  loader: resolveLoader('preprocess'),
  options: {
    type: ['js'],
  },
}
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
      preprocessLoader,
    ],
  }
}
