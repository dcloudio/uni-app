'use strict'
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(
  path.join(__dirname, './server/index.html'),
  'utf-8'
)
const manifest = require('./server/ssr-manifest.json')
const render = require('./server/entry-server.js').render

exports.main = async (event) => {
  const [appHtml, preloadLinks, appContext] = await render(event.path, manifest)
  const html = template
    .replace(`<!--preload-links-->`, preloadLinks)
    .replace(`<!--app-html-->`, appHtml)
    .replace(`<!--app-context-->`, appContext)
  return {
    mpserverlessComposedResponse: true, // 使用阿里云返回集成响应是需要此字段为true
    statusCode: 200,
    headers: {
      'content-type': 'text/html',
    },
    body: html,
  }
}
