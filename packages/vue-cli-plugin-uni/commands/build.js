const path = require('path')

const {
  runByHBuilderX
} = require('@dcloudio/uni-cli-shared')

const defaults = {
  clean: true,
  target: 'app',
  'unsafe-inline': true
}

const modifyConfig = (config, fn) => {
  if (Array.isArray(config)) {
    config.forEach(c => fn(c))
  } else {
    fn(config)
  }
}

module.exports = (api, options) => {
  api.registerCommand('uni-build', {
    description: 'build for production',
    usage: 'vue-cli-service uni-build [options]',
    options: {
      '--watch': `watch for changes`,
      '--minimize': `Tell webpack to minimize the bundle using the TerserPlugin.`
    }
  }, async (args) => {
    for (const key in defaults) {
      if (args[key] == null) {
        args[key] = defaults[key]
      }
    }

    args.entry = args.entry || args._[0]

    process.env.VUE_CLI_BUILD_TARGET = args.target

    await build(args, api, options)

    delete process.env.VUE_CLI_BUILD_TARGET
  })
}

function getWebpackConfig (api, args, options) {
  const validateWebpackConfig = require('@vue/cli-service/lib/util/validateWebpackConfig')
  // resolve raw webpack config
  const webpackConfig = require('@vue/cli-service/lib/commands/build/resolveAppConfig')(api, args, options)

  // check for common config errors
  validateWebpackConfig(webpackConfig, api, options, args.target)

  if (args.watch) {
    modifyConfig(webpackConfig, config => {
      config.watch = true
    })
  }

  if (args.minimize && process.env.NODE_ENV !== 'production') {
    modifyConfig(webpackConfig, config => {
      config.optimization.minimize = true
      config.optimization.namedModules = false
    })
  } else {
    modifyConfig(webpackConfig, config => {
      if (!config.optimization) {
        config.optimization = {}
      }
      config.optimization.namedModules = false
    })
  }
  return webpackConfig
}

function getWebpackConfigs (api, args, options) {
  if (!process.env.UNI_USING_V3) {
    return [getWebpackConfig(api, args, options)]
  }
  const pluginOptions = (options.pluginOptions || (options.pluginOptions = {}))
  pluginOptions['uni-app-plus'] = {
    service: true
  }
  options.publicPath = '/'
  const serviceWebpackConfig = getWebpackConfig(api, args, options)
  delete pluginOptions['uni-app-plus']['service']
  pluginOptions['uni-app-plus']['view'] = true
  options.publicPath = './'
  const viewWebpackConfig = getWebpackConfig(api, args, options)
  return [serviceWebpackConfig, viewWebpackConfig]
}

async function build (args, api, options) {
  const fs = require('fs-extra')
  const chalk = require('chalk')
  const webpack = require('webpack')

  const {
    log,
    done,
    logWithSpinner,
    stopSpinner
  } = require('@vue/cli-shared-utils')

  const runByAliIde = process.env.BUILD_ENV === 'ali-ide'

  log()

  if (!runByHBuilderX && !runByAliIde) {
    logWithSpinner(`开始编译当前项目至 ${process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM} 平台...`)
  }

  const targetDir = api.resolve(options.outputDir)

  const webpackConfigs = getWebpackConfigs(api, args, options)

  if (process.env.NODE_ENV === 'production') {
    try {
      fs.emptyDir(path.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules/.cache'))
    } catch (e) {}
  }

  if (args.clean || process.env.UNI_PLATFORM === 'app-plus') {
    await fs.emptyDir(targetDir)
  }

  if (process.env.UNI_USING_NATIVE) {
    webpackConfigs.length = 0
  }

  if (process.env.UNI_USING_NATIVE || (process.UNI_NVUE_ENTRY && Object.keys(process.UNI_NVUE_ENTRY).length)) {
    webpackConfigs.push(require('@dcloudio/vue-cli-plugin-hbuilderx/build/webpack.nvue.conf.js')(process.UNI_NVUE_ENTRY))
  }

  return new Promise((resolve, reject) => {
    webpack(webpackConfigs, (err, stats) => {
      if (!runByHBuilderX && !runByAliIde) {
        stopSpinner(false)
      }
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        /* eslint-disable prefer-promise-reject-errors */
        return reject(`Build failed with errors.`)
      }

      if (!args.silent && process.env.UNI_PLATFORM !== 'app-plus') {
        const targetDirShort = path.relative(
          api.service.context,
          process.env.UNI_OUTPUT_DIR
        )

        if (!args.watch) {
          const dirMsg = runByHBuilderX ? ''
            : `The ${chalk.cyan(targetDirShort)} directory is ready to be deployed.`
          done(`Build complete. ${dirMsg}`)
        } else {
          const dirMsg = runByHBuilderX ? '' : `The ${chalk.cyan(targetDirShort)} directory is ready. `
          done(`Build complete. ${dirMsg}Watching for changes...`)
        }
      }

      resolve()
    })
  })
}

module.exports.defaultModes = {
  'uni-build': process.env.NODE_ENV
}
