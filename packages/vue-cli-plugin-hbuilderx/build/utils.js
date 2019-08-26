function resolve (module) {
  try {
    return require.resolve(module)
  } catch (e) {}
  return module
}

exports.cssLoaders = function (options) {
  options = options || {}
  const cssLoader = {
    loader: resolve('css-loader'),
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: resolve('postcss-loader'),
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    let loaders = options.useVue ? [cssLoader] : []
    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }
    if (loader) {
      loaders.push({
        loader: resolve(loader + '-loader'),
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.useVue) {
      return [resolve('vue-style-loader')].concat(loaders)
    } else {
      return loaders
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
