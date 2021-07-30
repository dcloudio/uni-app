import { RuleSetRule } from 'webpack'
import { createOneOf } from './oneOf'

export function createCssLoaders(): RuleSetRule[] {
  return [
    {
      test: /\.css$/,
      oneOf: createOneOf()
    },
    {
      test: /\.scss$/,
      oneOf: createOneOf(scssLoader)
    },
    {
      test: /\.sass$/,
      oneOf: createOneOf(sassLoader)
    },
    {
      test: /\.less$/,
      oneOf: createOneOf(lessLoader)
    },
    {
      test: /\.styl(us)?$/,
      oneOf: createOneOf(stylusLoader)
    }
  ]
}

const scssLoader = {
  loader: require.resolve('sass-loader'),
  options: {
    sourceMap: false,
    additionalData: '@import "@/uni.scss";',
    sassOptions: {
      outputStyle: 'expanded'
    }
  }
}

const sassLoader = {
  loader: require.resolve('sass-loader'),
  options: {
    sourceMap: false,
    additionalData: '@import "@/uni.sass"',
    sassOptions: {
      outputStyle: 'expanded',
      indentedSyntax: true
    }
  }
}

const lessLoader = {
  loader: require.resolve('less-loader'),
  options: {
    sourceMap: false
  }
}

const stylusLoader = {
  loader: require.resolve('stylus-loader'),
  options: {
    sourceMap: false,
    preferPathResolver: 'webpack'
  }
}
