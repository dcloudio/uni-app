import { cac } from 'cac'
import chalk from 'chalk'
import { LogLevel, createLogger, ServerOptions, BuildOptions } from 'vite'
import { build, buildSSR } from './build'
import { createServer, createSSRServer } from './server'

import { initEnv, PLATFORMS } from './utils'

const cli = cac('uni')

export interface CliOptions {
  '--'?: string[]

  platform?: string
  p?: string
  ssr?: boolean

  debug?: boolean | string
  d?: boolean | string
  filter?: string
  f?: string
  logLevel?: LogLevel
  l?: LogLevel
  clearScreen?: boolean
}

cli
  .option('-p, --platform [platform]', '[string] ' + PLATFORMS.join(' | '), {
    default: 'h5',
  })
  .option('-ssr', '[boolean] server-side rendering', {
    default: false,
  })
  .option('-l, --logLevel <level>', `[string] silent | error | warn | all`)
  .option('--clearScreen', `[boolean] allow/disable clear screen when logging`)
  .option('-d, --debug [feat]', `[string | boolean] show debug logs`)
  .option('-f, --filter <filter>', `[string] filter debug logs`)

cli
  .command('')
  .alias('dev')
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--https', `[boolean] use TLS + HTTP/2`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .option('--cors', `[boolean] enable CORS`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option(
    '--force',
    `[boolean] force the optimizer to ignore the cache and re-bundle`
  )
  .action(async (options: CliOptions & ServerOptions) => {
    initEnv(options)
    try {
      await (options.ssr ? createSSRServer(options) : createServer(options))
    } catch (e) {
      createLogger(options.logLevel).error(
        chalk.red(`error when starting dev server:\n${e.stack}`)
      )
      process.exit(1)
    }
  })

cli
  .command('build')
  .option('--outDir <dir>', `[string] output directory (default: dist)`)
  .option(
    '--assetsInlineLimit <number>',
    `[number] static asset base64 inline threshold in bytes (default: 4096)`
  )
  .option(
    '--sourcemap',
    `[boolean] output source maps for build (default: false)`
  )
  .option(
    '--minify [minifier]',
    `[boolean | "terser" | "esbuild"] enable/disable minification, ` +
      `or specify minifier to use (default: terser)`
  )
  .option('--manifest', `[boolean] emit build manifest json`)
  .option('--ssrManifest', `[boolean] emit ssr manifest json`)
  .option(
    '--emptyOutDir',
    `[boolean] force empty outDir when it's outside of root`
  )
  .option('-m, --mode <mode>', `[string] set env mode`)
  .option('-w, --watch', `[boolean] rebuilds when modules have changed on disk`)
  .action(async (options: CliOptions & BuildOptions) => {
    initEnv(options)
    try {
      await (options.ssr ? buildSSR(options) : build(options))
    } catch (e) {
      createLogger(options.logLevel).error(
        chalk.red(`error during build:\n${e.stack}`)
      )
      process.exit(1)
    }
  })

cli.help()
cli.version(require('../../package.json').version)
cli.parse()
