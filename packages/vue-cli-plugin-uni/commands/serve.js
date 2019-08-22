const {
  info,
  openBrowser,
  IpcMessenger
} = require('@vue/cli-shared-utils')

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  https: false
}

module.exports = (api, options) => {
  api.registerCommand('uni-serve', {
    description: 'start development server',
    usage: 'vue-cli-service uni-serve [options] [entry]',
    options: {
      '--open': `open browser on server start`,
      '--copy': `copy url to clipboard on server start`,
      '--mode': `specify env mode (default: development)`,
      '--host': `specify host (default: ${defaults.host})`,
      '--port': `specify port (default: ${defaults.port})`,
      '--https': `use https (default: ${defaults.https})`,
      '--public': `specify the public network URL for the HMR client`
    }
  }, async function serve (args) {
    info('Starting development server...')

    // although this is primarily a dev server, it is possible that we
    // are running it in a mode with a production env, e.g. in E2E tests.
    const isInContainer = checkInContainer()
    const isProduction = process.env.NODE_ENV === 'production'

    const url = require('url')
    const path = require('path')
    const chalk = require('chalk')
    const webpack = require('webpack')
    const WebpackDevServer = require('webpack-dev-server')
    const portfinder = require('portfinder')
    const prepareURLs = require('@vue/cli-service/lib/util/prepareURLs')
    const prepareProxy = require('@vue/cli-service/lib/util/prepareProxy')
    const launchEditorMiddleware = require('launch-editor-middleware')
    const validateWebpackConfig = require('@vue/cli-service/lib/util/validateWebpackConfig')
    const isAbsoluteUrl = require('@vue/cli-service/lib/util/isAbsoluteUrl')

    // resolve webpack config
    const webpackConfig = api.resolveWebpackConfig()

    // check for common config errors
    validateWebpackConfig(webpackConfig, api, options)

    // load user devServer options with higher priority than devServer
    // in webpck config
    const projectDevServerOptions = Object.assign(
      webpackConfig.devServer || {},
      options.devServer
    )

    // expose advanced stats
    if (args.dashboard) {
      const DashboardPlugin = require('@vue/cli-service/lib/webpack/DashboardPlugin');
      (webpackConfig.plugins = webpackConfig.plugins || []).push(new DashboardPlugin({
        type: 'serve'
      }))
    }

    // entry arg
    const entry = args._[0]
    if (entry) {
      webpackConfig.entry = {
        app: api.resolve(entry)
      }
    }

    // resolve server options
    const useHttps = args.https || projectDevServerOptions.https || defaults.https
    const protocol = useHttps ? 'https' : 'http'
    const host = args.host || process.env.HOST || projectDevServerOptions.host || defaults.host
    portfinder.basePort = args.port || process.env.PORT || projectDevServerOptions.port || defaults
      .port
    const port = await portfinder.getPortPromise()
    const rawPublicUrl = args.public || projectDevServerOptions.public
    const publicUrl = rawPublicUrl
      ? /^[a-zA-Z]+:\/\//.test(rawPublicUrl)
        ? rawPublicUrl
        : `${protocol}://${rawPublicUrl}`
      : null

    const urls = prepareURLs(
      protocol,
      host,
      port,
      isAbsoluteUrl(options.publicPath) ? '/' : options.publicPath
    )

    const proxySettings = prepareProxy(
      projectDevServerOptions.proxy,
      api.resolve('public')
    )

    // inject dev & hot-reload middleware entries
    if (!isProduction) {
      const sockjsUrl = publicUrl
      // explicitly configured via devServer.public
        ? `?${publicUrl}/sockjs-node`
        : isInContainer
        // can't infer public netowrk url if inside a container...
        // use client-side inference (note this would break with non-root publicPath)
          ? ``
        // otherwise infer the url
          : `?` + url.format({
            protocol,
            port,
            hostname: urls.lanUrlForConfig || 'localhost',
            pathname: '/sockjs-node'
          })
      const devClients = [
        // dev server client
        require.resolve(`webpack-dev-server/client`) + sockjsUrl,
        // hmr client
        require.resolve(projectDevServerOptions.hotOnly
          ? 'webpack/hot/only-dev-server'
          : 'webpack/hot/dev-server')
        // TODO custom overlay client
        // `@vue/cli-overlay/dist/client`
      ]
      if (process.env.APPVEYOR) {
        devClients.push(`webpack/hot/poll?500`)
      }
      // inject dev/hot client
      addDevClientToEntry(webpackConfig, devClients)
    }

    // create compiler
    const compiler = webpack(webpackConfig)

    // create server
    const server = new WebpackDevServer(compiler, Object.assign({
      clientLogLevel: 'none',
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [{
          from: /./,
          to: path.posix.join(options.publicPath, 'index.html')
        }]
      },
      contentBase: api.resolve('public'),
      watchContentBase: !isProduction,
      hot: !isProduction,
      quiet: true,
      compress: isProduction,
      publicPath: options.publicPath,
      overlay: isProduction // TODO disable this
        ? false : {
          warnings: false,
          errors: true
        }
    }, projectDevServerOptions, {
      https: useHttps,
      proxy: proxySettings,
      before (app, server) {
        // launch editor support.
        // this works with vue-devtools & @vue/cli-overlay
        app.use('/__open-in-editor', launchEditorMiddleware(() => console.log(
          `To specify an editor, sepcify the EDITOR env variable or ` +
                    `add "editor" field to your Vue project config.\n`
        )))
        // allow other plugins to register middlewares, e.g. PWA
        api.service.devServerConfigFns.forEach(fn => fn(app, server))
        // apply in project middlewares
        projectDevServerOptions.before && projectDevServerOptions.before(app,
          server)
      }
    }))

        ;
    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        server.close(() => {
          process.exit(0)
        })
      })
    })

    // on appveyor, killing the process with SIGTERM causes execa to
    // throw error
    if (process.env.VUE_CLI_TEST) {
      process.stdin.on('data', data => {
        if (data.toString() === 'close') {
          console.log('got close signal!')
          server.close(() => {
            process.exit(0)
          })
        }
      })
    }

    return new Promise((resolve, reject) => {
      // log instructions & open browser on first compilation complete
      let isFirstCompile = true
      compiler.hooks.done.tap('vue-cli-service uni-serve', stats => {
        if (stats.hasErrors()) {
          return
        }

        let copied = ''
        if (isFirstCompile && args.copy) {
          require('clipboardy').write(urls.localUrlForBrowser)
          copied = chalk.dim('(copied to clipboard)')
        }

        const networkUrl = publicUrl
          ? publicUrl.replace(/([^/])$/, '$1/')
          : urls.lanUrlForTerminal

        console.log()
        console.log(`  App running at:`)
        console.log(
          `  - Local:   ${chalk.cyan(urls.localUrlForTerminal)} ${copied}`
        )
        if (!isInContainer) {
          console.log(`  - Network: ${chalk.cyan(networkUrl)}`)
        } else {
          console.log()
          console.log(chalk.yellow(
            `  It seems you are running Vue CLI inside a container.`
          ))
          if (!publicUrl && options.publicPath && options.publicPath !== '/') {
            console.log()
            console.log(chalk.yellow(
              `  Since you are using a non-root publicPath, the hot-reload socket`
            ))
            console.log(chalk.yellow(
              `  will not be able to infer the correct URL to connect. You should`
            ))
            console.log(chalk.yellow(
              `  explicitly specify the URL via ${chalk.blue(`devServer.public`)}.`
            ))
            console.log()
          }
          console.log(chalk.yellow(
            `  Access the dev server via ${chalk.cyan(
              `${protocol}://localhost:<your container's external mapped port>${options.publicPath}`
            )}`
          ))
        }
        console.log()

        if (isFirstCompile) {
          isFirstCompile = false

          if (!isProduction) {
            // const buildCommand = hasProjectYarn(api.getCwd()) ? `yarn build` : `npm run build`
            // console.log(`  Note that the development build is not optimized.`)
            // console.log(`  To create a production build, run ${chalk.cyan(buildCommand)}.`)
          } else {
            console.log(`  App is served in production mode.`)
            console.log(`  Note this is for preview or E2E testing only.`)
          }
          console.log()

          if (args.open || projectDevServerOptions.open) {
            const pageUri = (projectDevServerOptions.openPage && typeof projectDevServerOptions
              .openPage === 'string')
              ? projectDevServerOptions.openPage
              : ''
            openBrowser(urls.localUrlForBrowser + pageUri)
          }

          // Send final app URL
          if (args.dashboard) {
            const ipc = new IpcMessenger()
            ipc.send({
              vueServe: {
                url: urls.localUrlForBrowser
              }
            })
          }

          // resolve returned Promise
          // so other commands can do api.service.run('serve').then(...)
          resolve({
            server,
            url: urls.localUrlForBrowser
          })
        } else if (process.env.VUE_CLI_TEST) {
          // signal for test to check HMR
          console.log('App updated')
        }
      })

      server.listen(port, host, err => {
        if (err) {
          reject(err)
        }
      })
    })
  })
}

function addDevClientToEntry (config, devClient) {
  const {
    entry
  } = config
  if (typeof entry === 'object' && !Array.isArray(entry)) {
    Object.keys(entry).forEach((key) => {
      entry[key] = devClient.concat(entry[key])
    })
  } else if (typeof entry === 'function') {
    config.entry = entry(devClient)
  } else {
    config.entry = devClient.concat(entry)
  }
}

// https://stackoverflow.com/a/20012536
function checkInContainer () {
  const fs = require('fs')
  if (fs.existsSync(`/proc/1/cgroup`)) {
    const content = fs.readFileSync(`/proc/1/cgroup`, 'utf-8')
    return /:\/(lxc|docker|kubepods)\//.test(content)
  }
}

module.exports.defaultModes = {
  serve: 'development'
}
