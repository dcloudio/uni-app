import fs from 'fs'
import path from 'path'
import colors from 'picocolors'
import {
  createLogger,
  createServer as createViteServer,
  ServerOptions,
  ViteDevServer,
  printHttpServerUrls,
} from 'vite'
import express from 'express'
import { parseManifestJson } from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { addConfigFile, cleanOptions, printStartupDuration } from './utils'

export async function createServer(options: CliOptions & ServerOptions) {
  const server = await createViteServer(
    addConfigFile({
      root: process.env.VITE_ROOT_DIR,
      mode: options.mode,
      logLevel: options.logLevel,
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
      root: process.env.VITE_ROOT_DIR,
      mode: options.mode,
      logLevel: options.logLevel,
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

  const logger = createLogger(options.logLevel)
  const serverOptions = vite.config.server || {}

  let port = options.port || serverOptions.port || 3000
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
