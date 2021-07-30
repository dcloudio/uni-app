import { RuleSetRule } from 'webpack'
import { createOneOf } from './oneOf'

export function createCssLoaders(): RuleSetRule[] {
  return [
    {
      test: /\.css$/,
      oneOf: createOneOf(),
    },
    {
      test: /\.scss$/,
      oneOf: createOneOf(scssLoader),
    },
    {
      test: /\.sass$/,
      oneOf: createOneOf(sassLoader),
    },
    {
      test: /\.less$/,
      oneOf: createOneOf(lessLoader),
    },
    {
      test: /\.styl(us)?$/,
      oneOf: createOneOf(stylusLoader),
    },
  ]
}

const scssLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    additionalData: '@import "@/uni.scss";',
    sassOptions: {
      outputStyle: 'expanded',
    },
  },
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    additionalData: '@import "@/uni.sass"',
    sassOptions: {
      outputStyle: 'expanded',
      indentedSyntax: true,
    },
  },
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: false,
  },
}

const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    sourceMap: false,
    preferPathResolver: 'webpack',
  },
}
