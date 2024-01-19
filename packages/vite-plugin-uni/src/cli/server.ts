import fs from 'fs'
import os from 'os'
import path from 'path'
import colors from 'picocolors'
import type {
  CommonServerOptions,
  InlineConfig,
  Logger,
  LoggerOptions,
  LogLevel,
  ResolvedConfig,
  ServerOptions,
  ViteDevServer,
} from 'vite'
import express from 'express'
import { parseManifestJson } from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { addConfigFile, cleanOptions, printStartupDuration } from './utils'
import { AddressInfo, Server } from 'net'

function createLogger(level?: LogLevel, options?: LoggerOptions) {
  return import('vite').then(({ createLogger }) => createLogger(level, options))
}

function createViteServer(inlineConfig?: InlineConfig) {
  return import('vite').then(({ createServer }) => createServer(inlineConfig))
}

export async function createServer(options: CliOptions & ServerOptions) {
  const server = await createViteServer(
    addConfigFile({
      root: process.env.VITE_ROOT_DIR,
      configFile: options.config,
      base: options.base,
      mode: options.mode,
      logLevel: options.logLevel || 'info',
      clearScreen: options.clearScreen,
      server: cleanOptions(options) as ServerOptions,
    })
  )
  await server.listen()

  const logger = server.config.logger

  logger.info(
    colors.cyan(`\n  vite v${require('vite/package.json').version}`) +
      colors.green(` dev server running at:\n`),
    {
      clear: !server.config.logger.hasWarned,
    }
  )

  server.printUrls()
  // printUrls 会在 nextTick 中输出
  process.nextTick(() => printStartupDuration(logger))

  return server
}

export async function createSSRServer(
  options: CliOptions & ServerOptions
): Promise<ViteDevServer> {
  const app = express()
  /**
   * @type {import('vite').ViteDevServer}
   */
  const vite = await createViteServer(
    addConfigFile({
      // custom: don't include HTML middlewares
      appType: 'custom',
      root: process.env.VITE_ROOT_DIR,
      configFile: options.config,
      base: options.base,
      mode: options.mode,
      logLevel: options.logLevel || 'info',
      clearScreen: options.clearScreen,
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    })
  )
  // use vite's connect instance as middleware
  app.use(vite.middlewares)
  app.use('*', async (req, res) => {
    try {
      const { h5 } = parseManifestJson(process.env.UNI_INPUT_DIR)
      const base = (h5 && h5.router && h5.router.base) || ''
      const url = req.originalUrl.replace(base, '')
      const template = await vite.transformIndexHtml(
        url,
        fs.readFileSync(
          path.resolve(process.env.VITE_ROOT_DIR!, 'index.html'),
          'utf-8'
        )
      )
      const render = (
        await vite.ssrLoadModule(
          path.resolve(process.env.UNI_INPUT_DIR, 'entry-server.js')
        )
      ).render

      const { title, headMeta, preloadLinks, appHtml, appContext } =
        await render(url)

      const icon = template.includes('rel="icon"')
        ? ''
        : '<link rel="icon" href="data:," />\n'

      const html = template
        .replace(/<title>(.*?)<\/title>/, `${icon}<title>${title}</title>`)
        .replace(`<!--head-meta-->`, headMeta)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-context-->`, appContext)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      vite && vite.ssrFixStacktrace(e)
      res.status(500).end(e.stack)
    }
  })

  const logger = await createLogger(options.logLevel)
  const serverOptions = vite.config.server || {}

  let port = options.port || serverOptions.port || 5173
  let hostname: string | undefined
  if (options.host === 'localhost') {
    // Use a secure default
    hostname = '127.0.0.1'
  } else if (options.host === undefined || options.host === true) {
    // probably passed --host in the CLI, without arguments
    hostname = undefined // undefined typically means 0.0.0.0 or :: (listen on all IPs)
  } else {
    hostname = options.host as string
  }
  return new Promise((resolve, reject) => {
    const onSuccess = () => {
      printHttpServerUrls(server, vite.config)
      process.nextTick(() => printStartupDuration(logger))
      resolve(vite)
    }
    const onError = (e: Error & { code?: string }) => {
      if (e.code === 'EADDRINUSE') {
        if (options.strictPort) {
          server.off('error', onError)
          reject(new Error(`Port ${port} is already in use`))
        } else {
          logger.info(`Port ${port} is in use, trying another one...`)
          app.listen(++port, hostname!, onSuccess).on('error', onError)
        }
      } else {
        server.off('error', onError)
        reject(e)
      }
    }
    const server = app.listen(port, hostname!, onSuccess).on('error', onError)
  })
}

function printHttpServerUrls(server: Server, config: ResolvedConfig): void {
  printCommonServerUrls(server, config.server, config)
}

function printCommonServerUrls(
  server: Server,
  options: CommonServerOptions,
  config: ResolvedConfig
): void {
  const address = server.address()
  const isAddressInfo = (x: any): x is AddressInfo => x?.address
  if (isAddressInfo(address)) {
    const hostname = resolveHostname(options.host)
    const protocol = options.https ? 'https' : 'http'
    printServerUrls(
      hostname,
      protocol,
      address.port,
      config.base,
      config.logger.info
    )
  }
}

function printServerUrls(
  hostname: Hostname,
  protocol: string,
  port: number,
  base: string,
  info: Logger['info']
): void {
  if (hostname.host === '127.0.0.1') {
    const url = `${protocol}://${hostname.name}:${colors.bold(port)}${base}`
    info(`  - Local: ${colors.cyan(url)}`)
    if (hostname.name !== '127.0.0.1') {
      info(`  - Network: ${colors.dim('use `--host` to expose')}`)
    }
  } else {
    Object.values(os.networkInterfaces())
      .flatMap((nInterface) => nInterface ?? [])
      .filter(
        (detail) =>
          detail &&
          detail.address &&
          // Node < v18
          ((typeof detail.family === 'string' && detail.family === 'IPv4') ||
            // Node >= v18
            // @ts-ignore
            (typeof detail.family === 'number' && detail.family === 4))
      )
      .map((detail) => {
        const type = detail.address.includes('127.0.0.1')
          ? '  - Local:   '
          : '  * Network: '
        const host = detail.address.replace('127.0.0.1', hostname.name)
        const url = `${protocol}://${host}:${colors.bold(port)}${base}`
        return `${type} ${colors.cyan(url)}`
      })
      .sort((msg1) => {
        return msg1.indexOf('- Local') > -1 ? -1 : 1
      })
      .forEach((msg, index, arr) => {
        if (arr.length - 1 === index) {
          info(msg.replace('* Network', '- Network'))
        } else {
          info(msg)
        }
      })
  }
}

interface Hostname {
  // undefined sets the default behaviour of server.listen
  host: string | undefined
  // resolve to localhost when possible
  name: string
}

function resolveHostname(optionsHost: string | boolean | undefined): Hostname {
  let host: string | undefined
  if (optionsHost === undefined || optionsHost === false) {
    // Use a secure default
    host = '127.0.0.1'
  } else if (optionsHost === true) {
    // If passed --host in the CLI without arguments
    host = undefined // undefined typically means 0.0.0.0 or :: (listen on all IPs)
  } else {
    host = optionsHost
  }

  // Set host name to localhost when possible, unless the user explicitly asked for '127.0.0.1'
  const name =
    (optionsHost !== '127.0.0.1' && host === '127.0.0.1') ||
    host === '0.0.0.0' ||
    host === '::' ||
    host === undefined
      ? 'localhost'
      : host

  return { host, name }
}
