const utils = require('./utils')

const uniqueBy = utils.uniqueBy

class WebpackErrorsPlugin {
  constructor (options) {
    options = options || {}
    this.sourceRoot = options.sourceRoot
    this.onErrors = options.onErrors
    this.onWarnings = options.onWarnings
  }

  apply (compiler) {
    const doneFn = stats => {
      const hasErrors = stats.hasErrors()
      const hasWarnings = stats.hasWarnings()

      if (hasErrors && this.onErrors) {
        this.onErrors(extractErrorsFromStats(stats, 'errors'))
        return
      }

      if (hasWarnings && this.onWarnings) {
        this.onWarnings(extractErrorsFromStats(stats, 'warnings'))
      }
    }

    if (compiler.hooks) {
      const plugin = {
        name: 'UniAppErrorsWebpackPlugin'
      }
      compiler.hooks.done.tap(plugin, doneFn)
    } else {
      compiler.plugin('done', doneFn)
    }
  }
}

function extractErrorsFromStats (stats, type) {
  if (isMultiStats(stats)) {
    const errors = stats.stats
      .reduce((errors, stats) => errors.concat(extractErrorsFromStats(stats, type)), [])
    // Dedupe to avoid showing the same error many times when multiple
    // compilers depend on the same module.
    return uniqueBy(errors, error => error.message)
  }
  return stats.compilation[type]
}

function isMultiStats (stats) {
  return stats.stats
}

module.exports = WebpackErrorsPlugin
