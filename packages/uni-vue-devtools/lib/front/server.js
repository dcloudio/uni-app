/* eslint-disable no-restricted-globals */
const _detectPort = require('detect-port');
const os = require('os')
const { createServer } = require('http')
const { Server } = require('socket.io')
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const colors = require('picocolors')
const open = require('open')
const { isInHBuilderX } = require('@dcloudio/uni-cli-shared')

exports.initDevtoolsServer = async () => {
  const network = getNetwork()
  const socketHost = process.env.__VUE_DEVTOOLS_HOST__ || network
  const socketPort = await detectPort(process.env.__VUE_DEVTOOLS_PORT__ || 8098)
  initSocketServer(socketHost, socketPort)

  const devtoolsPort = await detectPort(9098)

  let vueDevtoolsDirInHBuilderX

  if (isInHBuilderX()) {
    vueDevtoolsDirInHBuilderX = path.resolve(
      process.env.UNI_OUTPUT_DIR,
      '..',
      '.vue-devtools'
    )
    if (!fs.existsSync(vueDevtoolsDirInHBuilderX)) {
      fs.mkdirSync(vueDevtoolsDirInHBuilderX, { recursive: true })
    }
    fs.writeFileSync(`${vueDevtoolsDirInHBuilderX}/port.js`, `${devtoolsPort}`)
  }

  initFrontServer(socketHost, socketPort, network, devtoolsPort, vueDevtoolsDirInHBuilderX)

  return { socketHost, socketPort }
}

function getNetwork() {
  const networks = Object.values(os.networkInterfaces())
    .flatMap((nInterface) => nInterface ?? [])
    .filter(
      (detail) =>
        detail &&
        detail.address &&
        // Node < v18
        ((typeof detail.family === 'string' && detail.family === 'IPv4') ||
          // Node >= v18
          (typeof detail.family === 'number' && detail.family === 4))
    )
  for (let network of networks) {
    if (!network.address.includes('127.0.0.1')) {
      return network.address
    }
  }
}

function detectPort(port) {
  return _detectPort(port)
    .then(_port => {
      return port == _port ? port : detectPort(_port)
    })
    .catch(err => {
      console.log(colors.red(err))
    })
}

function initFrontServer(socketHost, socketPort, network, devtoolsPort, vueDevtoolsDirInHBuilderX) {
  app.use(express.static(__dirname))

  app.get('/', (_, res) => {
    res.send(fs.readFileSync(path.resolve(__dirname, `./app.html`)).toString())
  })

  app.get('/env', (_, res) => {
    res.send(
      `window.process = {
        env: {
          HOST: '${socketHost}',
          PORT: '${socketPort}',
        }
      } `
    )
  })

  app.listen(devtoolsPort, 'localhost', () => {
    const colorUrl = (url) => colors.cyan(url.replace(/:(\d+)\//, (_, port) => `:${colors.bold(port)}/`))
    const networkUrl = `http://${network}:${devtoolsPort}`

    console.log(`\n${colors.cyan('uni-vue-devtools')} ${colors.green('server running at:')}\n ${colors.green('➜')} ${colorUrl(networkUrl)}\n`)

    if (isInHBuilderX()) {
      fs.writeFileSync(`${vueDevtoolsDirInHBuilderX}/frontServer.js`, '')
    } else {
      open(`http:localhost:${devtoolsPort}`)
    }
  })

}

function initSocketServer(host, port) {
  const httpServer = createServer(app)
  const io = new Server(httpServer, {
    cors: {
      origin: true,
    },
  })
  // Middleman
  io.on('connection', function (socket) {
    // Disconnect any previously connected apps
    socket.broadcast.emit('vue-devtools-disconnect-backend')

    socket.on('vue-devtools-init', () => {
      socket.broadcast.emit('vue-devtools-init')
    })

    socket.on('disconnect', (reason) => {
      if (reason.indexOf('client')) {
        socket.broadcast.emit('vue-devtools-disconnect-devtools')
      }
    })

    socket.on('vue-message', data => {
      socket.broadcast.emit('vue-message', data)
    })
  })

  httpServer.listen(port, host)
}
