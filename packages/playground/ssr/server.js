const fs = require('fs')
const path = require('path')
const express = require('express')

async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p)
  const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  const manifest = require('./dist/client/ssr-manifest.json')
  const app = express()
  app.use(require('compression')())
  app.use(
    require('serve-static')(resolve('dist/client'), {
      index: false,
    })
  )
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      const render = require('./dist/server/entry-server.js').render
      const [appHtml, preloadLinks, appContext] = await render(url, manifest)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-context-->`, appContext)
      res
        .status(200)
        .set({
          'Content-Type': 'text/html',
        })
        .end(html)
    } catch (e) {
      res.status(500).end(e.stack)
    }
  })

  return app
}

createServer().then((app) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
)
