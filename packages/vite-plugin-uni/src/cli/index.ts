import type { LogLevel } from 'vite'
import { cac } from 'cac'
import { fixBinaryPath } from '@dcloudio/uni-cli-shared'
import { PLATFORMS } from './utils'
import { runBuild, runDev } from './action'

fixBinaryPath()

const cli = cac('uni')

export interface CliOptions {
  '--'?: string[]

  c?: boolean | string
  config?: string

  platform?: string
  p?: string
  ssr?: boolean

  base?: string
  debug?: boolean | string
  d?: boolean | string
  filter?: string
  f?: string
  logLevel?: LogLevel
  l?: LogLevel
  m?: string
  mode?: string
  clearScreen?: boolean

  autoHost?: string
  autoPort?: number

  devtools?: boolean
  devtoolsHost?: string
  devtoolsPort?: number

  subpackage?: string
  plugin?: string
}

cli
  .option('-c, --config <file>', `[string] use specified config file`)
  .option('-p, --platform [platform]', '[string] ' + PLATFORMS.join(' | '), {
    default: 'h5',
  })
  .option('--base <path>', `[string] public base path (default: /)`)
  .option('-ssr', '[boolean] server-side rendering', {
    default: false,
  })
  .option('-l, --logLevel <level>', `[string] silent | error | warn | all`)
  .option('--clearScreen', `[boolean] allow/disable clear screen when logging`)
  .option('-d, --debug [feat]', `[string | boolean] show debug logs`)
  .option('-f, --filter <filter>', `[string] filter debug logs`)
  .option('-m, --mode <mode>', `[string] set env mode`)
  .option(
    '--minify [minifier]',
    `[boolean | "terser" | "esbuild"] enable/disable minification, ` +
      `or specify minifier to use (default: terser)`
  )
  .option('--autoHost [autoHost]', `[string] specify automator hostname`)
  .option('--autoPort [autoPort]', `[number] specify automator port`)
  .option('--devtools', `[boolean] enable devtools`)
  .option('--devtoolsHost [devtoolsHost]', `[string] specify devtools hostname`)
  .option('--devtoolsPort [devtoolsPort]', `[number] specify devtools port`)
  .option('--subpackage [subpackage]', `[string] specify subpackage to build`)
  .option('--plugin [plugin]', `[string] specify plugin to build`)

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
  .action(runDev)

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
  .option('--manifest', `[boolean] emit build manifest json`)
  .option('--ssrManifest', `[boolean] emit ssr manifest json`)
  .option(
    '--emptyOutDir',
    `[boolean] force empty outDir when it's outside of root`,
    {
      default: true,
    }
  )
  .option('-w, --watch', `[boolean] rebuilds when modules have changed on disk`)
  .action(runBuild)

cli.help()
cli.version(require('../../package.json').version)
cli.parse()
