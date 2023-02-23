/* eslint-disable no-restricted-globals */
const _detectPort = require('detect-port');
const os = require('os')
const { createServer } = require('http')
const { Server } = require('socket.io')
const express = require('express')
const app = express()
const testConnectionApp = express()
const path = require('path')
const fs = require('fs')
const colors = require('picocolors')
const open = require('open')
const { isInHBuilderX } = require('@dcloudio/uni-cli-shared')

const __DEFAULT_VUE_DEVTOOLS_PORT__ = 8098

exports.initDevtoolsServer = async () => {
  const socketHosts = getNetworks()
  const socketPort = await detectPort(process.env.__VUE_DEVTOOLS_PORT__ || __DEFAULT_VUE_DEVTOOLS_PORT__)
  // HBuilderX 调试按钮未处理防抖，额外做一次端口校验
  _detectPort(socketPort)
    .then(_port => {
      if(socketPort == _port){
        initSocketServer(socketPort)
      }
    })
    .catch(err => {
      console.log(colors.red(err))
    })

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
  // HBuilderX 调试按钮未处理防抖，额外做一次端口校验
  _detectPort(devtoolsPort)
    .then(_port => {
      if(devtoolsPort == _port){
        initFrontServer(socketPort, devtoolsPort, vueDevtoolsDirInHBuilderX)
      }
    })
    .catch(err => {
      console.log(colors.red(err))
    })

  // 针对多网卡情况，需要遍历 socketHosts 尝试连接，确认可用 ip
  const testConnectionPort = await detectPort(9500)
  testConnectionApp.get('/', (_, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.send({message: 'test connection ok!'})
  })
  testConnectionApp.listen(testConnectionPort, '0.0.0.0', () => {
  })
  return { socketHosts, socketPort, testConnectionPort }
}


function getNetworks() {
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

  let result = ''
  for (let network of networks) {
    if (!network.address.includes('127.0.0.1')) {
      if(result){
        result += ','
      }
      result += network.address
    }
  }
  return result
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

function initFrontServer(socketPort, devtoolsPort, vueDevtoolsDirInHBuilderX) {
  app.use(express.static(__dirname))

  app.get('/', (_, res) => {
    res.send(fs.readFileSync(path.resolve(__dirname, `./app.html`)).toString())
  })

  app.get('/env', (_, res) => {
    res.send(
      `window.process = {
        env: {
          platform: '${process.env.UNI_PLATFORM}',
          PORT: '${socketPort}',
        }
      } `
    )
  })

  app.listen(devtoolsPort, 'localhost', () => {
    const colorUrl = (url) => colors.cyan(url.replace(/:(\d+)\//, (_, port) => `:${colors.bold(port)}/`))
    const networkUrl = `http://localhost:${devtoolsPort}`

    console.log(`\n${colors.cyan('uni-vue-devtools')} ${colors.green('server running at:')}\n ${colors.green('➜')} ${colorUrl(networkUrl)}\n`)

    if (isInHBuilderX()) {
      fs.writeFileSync(`${vueDevtoolsDirInHBuilderX}/frontServer.js`, '')
    } else {
      open(`http:localhost:${devtoolsPort}`)
    }
  })

}

function initSocketServer(port) {
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

  httpServer.listen(port, '0.0.0.0')
}
