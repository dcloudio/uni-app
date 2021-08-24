'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var debug = _interopDefault(require('debug'))
var isWindows = _interopDefault(require('licia/isWindows'))
require('address')
require('default-gateway')
require('licia/isStr')
var getPort = _interopDefault(require('licia/getPort'))
var fs = _interopDefault(require('fs'))
var child_process = _interopDefault(require('child_process'))
var sleep = _interopDefault(require('licia/sleep'))
var toStr = _interopDefault(require('licia/toStr'))
var waitUntil = _interopDefault(require('licia/waitUntil'))
var concat = _interopDefault(require('licia/concat'))
var dateFormat = _interopDefault(require('licia/dateFormat'))
var WebSocket = _interopDefault(require('ws'))
var events = require('events')
var uuid = _interopDefault(require('licia/uuid'))
var stringify = _interopDefault(require('licia/stringify'))

const qrCodeTerminal = require('qrcode-terminal')
const QrCodeReader = require('qrcode-reader')
const isWin = /^win/.test(process.platform)
function decodeQrCode(qrCode) {
  const buffer = new Buffer(qrCode, 'base64')
  return new Promise(async (resolve, reject) => {
    const img = await require('jimp').read(buffer)
    const qrCodeReader = new QrCodeReader()
    qrCodeReader.callback = function (error, value) {
      if (error) {
        return reject(error)
      }
      resolve(value.result)
    }
    qrCodeReader.decode(img.bitmap)
  })
}
async function resolvePort(port, defaultPort) {
  const newPort = await getPort(port || defaultPort)
  if (port && newPort !== port) {
    throw Error(`Port ${port} is in use, please specify another port`)
  }
  return newPort
}

class Transport extends events.EventEmitter {
  constructor(ws) {
    super()
    this.ws = ws
    this.ws.addEventListener('message', (event) => {
      this.emit('message', event.data)
    })
    this.ws.addEventListener('close', () => {
      this.emit('close')
    })
  }
  send(message) {
    this.ws.send(message)
  }
  close() {
    this.ws.close()
  }
}

const CLOSE_ERR_TIP = 'Connection closed'
class Connection extends events.EventEmitter {
  constructor(transport, puppet, namespace) {
    super()
    this.puppet = puppet
    this.namespace = namespace
    this.callbacks = new Map()
    this.transport = transport
    this.debug = debug('automator:protocol:' + this.namespace)
    this.onMessage = (msg) => {
      this.debug(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} ◀ RECV ${msg}`)
      const { id, method, error, result, params } = JSON.parse(msg)
      if (!id) {
        return this.puppet.emit(method, params)
      }
      const { callbacks } = this
      if (id && callbacks.has(id)) {
        const promise = callbacks.get(id)
        callbacks.delete(id)
        error ? promise.reject(Error(error.message)) : promise.resolve(result)
      }
    }
    this.onClose = () => {
      this.callbacks.forEach((promise) => {
        promise.reject(Error(CLOSE_ERR_TIP))
      })
    }
    this.transport.on('message', this.onMessage)
    this.transport.on('close', this.onClose)
  }
  send(method, params = {}, reflect = true) {
    if (reflect && this.puppet.adapter.has(method)) {
      return this.puppet.adapter.send(this, method, params)
    }
    const id = uuid()
    const data = stringify({
      id,
      method,
      params,
    })
    this.debug(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} SEND ► ${data}`)
    return new Promise((resolve, reject) => {
      try {
        this.transport.send(data)
      } catch (e) {
        reject(Error(CLOSE_ERR_TIP))
      }
      this.callbacks.set(id, {
        resolve,
        reject,
      })
    })
  }
  dispose() {
    this.transport.close()
  }
  static createDevtoolConnection(url, puppet) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url)
      ws.addEventListener('open', () => {
        resolve(new Connection(new Transport(ws), puppet, 'devtool'))
      })
      ws.addEventListener('error', reject)
    })
  }
  static createRuntimeConnection(port, puppet, timeout) {
    return new Promise((resolve, reject) => {
      debug('automator:runtime')(
        `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} port=${port}`
      )
      const wss = new WebSocket.Server({
        port,
      })
      waitUntil(
        async () => {
          if (puppet.runtimeConnection) {
            return true
          }
        },
        timeout,
        1e3
      ).catch(() => {
        wss.close()
        reject(
          'Failed to connect to runtime, please make sure the project is running'
        )
      })
      wss.on('connection', function connection(ws) {
        debug('automator:runtime')(
          `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} connected`
        )
        const connection = new Connection(new Transport(ws), puppet, 'runtime')
        // 可能会被重新连接，刷新成最新的
        puppet.setRuntimeConnection(connection)
        resolve(connection)
      })
      puppet.setRuntimeServer(wss)
    })
  }
}

const debugDevtools = debug('automator:devtool')
function resolveDevtoolsPath(cliPath, puppet) {
  const paths = puppet.devtools.paths.slice(0)
  if (cliPath) {
    paths.unshift(cliPath)
  }
  for (const cliPath of paths) {
    if (fs.existsSync(cliPath)) {
      return cliPath
    }
  }
  throw Error(
    `${puppet.devtools.name} not found, please specify executablePath option`
  )
}
async function validateDevtools(options, puppet) {
  const cliPath = resolveDevtoolsPath(options.executablePath, puppet)
  let port = options.port || puppet.devtools.defaultPort
  if (options.launch !== false) {
    try {
      port = await resolvePort(port)
    } catch (e) {
      // console.log(`Port ${port} is in use, try to connect directly`);
      options.launch = false
    }
  } else {
    const newPort = await getPort(port)
    if (port === newPort) {
      options.launch = true
      // console.log(`try to launch ${this.puppet.devtools.name}`);
    }
  }
  return Object.assign(Object.assign({}, options), { port, cliPath })
}
async function connectTool(options, puppet) {
  let connection
  try {
    connection = await Connection.createDevtoolConnection(
      options.wsEndpoint,
      puppet
    )
  } catch (e) {
    throw Error(
      `Failed connecting to ${options.wsEndpoint}, check if target project window is opened with automation enabled`
    )
  }
  return connection
}
async function createDevtools(projectPath, options, puppet) {
  const {
    port,
    cliPath,
    timeout,
    cwd = '',
    account = '',
    args = [],
    launch = true,
  } = options
  let launchFailed = false
  let connectFailed = false
  if (launch !== false) {
    const spawnOptions = {
      stdio: 'ignore',
    }
    //@ts-ignore
    {
      spawnOptions.detached = true
    }
    cwd && (spawnOptions.cwd = cwd)
    let spawnArgs = concat(args, [])
    //@ts-ignore
    {
      spawnArgs = concat(spawnArgs, ['auto', '--project'])
    }
    spawnArgs = concat(spawnArgs, [projectPath, '--auto-port', toStr(port)])
    account && (spawnArgs = concat(spawnArgs, ['--auto-account', account]))
    try {
      debugDevtools('%s %o %o', cliPath, spawnArgs, spawnOptions)
      const cliProcess = child_process.spawn(cliPath, spawnArgs, spawnOptions)
      cliProcess.on('error', (err) => {
        launchFailed = true
      })
      cliProcess.on('exit', () => {
        setTimeout(() => {
          connectFailed = true
        }, 15e3)
      })
      // TODO unref?
      cliProcess.unref()
    } catch (err) {
      launchFailed = false
    }
  } else {
    setTimeout(() => {
      connectFailed = true
    }, 15e3)
  }
  const connection = await waitUntil(
    async () => {
      try {
        if (launchFailed || connectFailed) {
          return true
        }
        const connection = await connectTool(
          { wsEndpoint: `ws://127.0.0.1:${port}` },
          puppet
        )
        return connection
      } catch (err) {}
    },
    timeout,
    1e3
  )
  if (launchFailed) {
    throw Error(
      `Failed to launch ${puppet.devtools.name}, please make sure cliPath is correctly specified`
    )
  }
  if (connectFailed) {
    throw Error(
      `Failed to launch ${puppet.devtools.name} , please make sure http port is open`
    )
  }
  await sleep(5e3)
  debugDevtools(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} connected`)
  return connection
}

function wrapper(fnStr) {
  if (fnStr[fnStr.length - 1] === '}') {
    return fnStr.replace('{', '{\nvar uni = wx;\n')
  }
  return fnStr.replace('=>', '=>{\nvar uni = wx;\nreturn ') + '}'
}
const puppet = {
  devtools: {
    name: 'Wechat web devTools',
    remote: true,
    automator: true,
    paths: [
      isWindows
        ? 'C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat'
        : '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
    ],
    required: ['project.config.json', 'app.json', 'app.js'],
    defaultPort: 9420,
    validate: validateDevtools,
    async create(projectPath, options, puppet) {
      const connection = await createDevtools(projectPath, options, puppet)
      if (!puppet.compiled) {
        debug('automator:devtool')('initRuntimeAutomator')
        connection.send('App.callWxMethod', {
          method: '$$initRuntimeAutomator',
          args: [],
        })
      } else {
        debug('automator:devtool')('Waiting for runtime automator')
      }
      return connection
    },
  },
  adapter: {
    'Tool.enableRemoteDebug': {
      reflect: async (send, params) => {
        let { qrCode } = await send('Tool.enableRemoteDebug', params, false)
        qrCode && (qrCode = await decodeQrCode(qrCode))
        return { qrCode }
      },
    },
    // "App.callUniMethod": {
    //   reflect: "App.callWxMethod",
    // },
    'App.callFunction': {
      reflect: async (send, params) => {
        return send(
          'App.callFunction',
          Object.assign(Object.assign({}, params), {
            functionDeclaration: wrapper(params.functionDeclaration),
          }),
          false
        )
      },
    },
    'Element.getHTML': {
      reflect: async (send, params) => {
        return { html: (await send('Element.getWXML', params, false)).wxml }
      },
    },
  },
}

module.exports = puppet
