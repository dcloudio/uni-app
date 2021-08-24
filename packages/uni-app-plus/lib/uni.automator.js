'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var fs = _interopDefault(require('fs'))
var debug = _interopDefault(require('debug'))
var parser = _interopDefault(require('postcss-selector-parser'))
var fs$1 = _interopDefault(require('fs-extra'))
var dateFormat = _interopDefault(require('licia/dateFormat'))
var path = require('path')
var util = require('util')
require('address')
require('default-gateway')
require('licia/isStr')
require('licia/getPort')

function transform(selectors) {
  selectors.walk((selector) => {
    if (selector.type === 'tag') {
      const value = selector.value
      if (value === 'page') {
        //@ts-ignore
        {
          selector.value = 'body'
        }
      } else {
        selector.value = 'uni-' + value
      }
    }
  })
}
function transSelector(method) {
  return {
    reflect: async (send, params) => send(method, params, false),
    params(params) {
      if (params.selector) {
        params.selector = parser(transform).processSync(params.selector)
      }
      return params
    },
  }
}
const methods = [
  'Page.getElement',
  'Page.getElements',
  'Element.getElement',
  'Element.getElements',
]
function initAdapter(adapter) {
  methods.forEach((method) => {
    adapter[method] = transSelector(method)
  })
}

const qrCodeTerminal = require('qrcode-terminal')
const QrCodeReader = require('qrcode-reader')
const isWin = /^win/.test(process.platform)
const normalizePath = (path) => (isWin ? path.replace(/\\/g, '/') : path)

const debugLauncher = debug('automator:launcher')
const APPID = 'HBuilder'
const PACKAGE = 'io.dcloud.HBuilder'
const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)
async function getFiles(dir) {
  const subdirs = await readdir(dir)
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir)
      return (await stat(res)).isDirectory() ? getFiles(res) : res
    })
  )
  return files.reduce((a, f) => a.concat(f), [])
}
class Launcher {
  constructor(options) {
    this.id = options.id
    this.app = options.executablePath
    this.appid = options.appid || APPID
    this.package = options.package || PACKAGE
  }
  shouldPush() {
    return this.exists(this.FILE_APP_SERVICE)
      .then(() => {
        debugLauncher(
          `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} ${
            this.FILE_APP_SERVICE
          } exists`
        )
        return false
      })
      .catch(() => {
        debugLauncher(
          `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} ${
            this.FILE_APP_SERVICE
          } not exists`
        )
        return true
      })
  }
  push(from) {
    return getFiles(from)
      .then((files) => {
        const pushs = files.map((file) => {
          const to = normalizePath(
            path.join(this.DIR_WWW, path.relative(from, file))
          )
          debugLauncher(
            `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} push ${file} ${to}`
          )
          return this.pushFile(file, to)
        })
        return Promise.all(pushs)
      })
      .then((res) => true)
  }
  get FILE_APP_SERVICE() {
    return `${this.DIR_WWW}/app-service.js`
  }
}

const debugClient = debug('automator:simctl')
function padZero(str) {
  const num = parseInt(str)
  return num > 9 ? String(num) : '0' + num
}
class IOS extends Launcher {
  constructor() {
    super(...arguments)
    this.bundleVersion = ''
  }
  async init() {
    const Simctl = require('node-simctl').Simctl
    this.tool = new Simctl({ udid: this.id })
    try {
      await this.tool.bootDevice()
    } catch (e) {}
    await this.initSDCard()
    debugClient(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} init ${this.id}`)
  }
  async initSDCard() {
    const appInfo = await this.tool.appInfo(this.package)
    debugClient(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} appInfo ${appInfo}`)
    const matches = appInfo.match(/DataContainer\s+=\s+"(.*)"/)
    if (!matches) {
      return Promise.resolve('')
    }
    const versionMatches = appInfo.match(/CFBundleVersion\s+=\s+(.*);/)
    if (!versionMatches) {
      return Promise.resolve('')
    }
    this.sdcard = matches[1].replace('file:', '')
    this.bundleVersion = versionMatches[1]
    debugClient(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} install ${this.sdcard}`)
  }
  async version() {
    return Promise.resolve(this.bundleVersion)
  }
  formatVersion(version) {
    const versions = version.split('.')
    if (versions.length !== 3) {
      return version
    }
    return versions[0] + padZero(versions[1]) + padZero(versions[2])
  }
  async install() {
    debugClient(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} install ${this.app}`)
    await this.tool.installApp(this.app)
    await this.tool.grantPermission(this.package, 'all')
    await this.initSDCard()
    return Promise.resolve(true)
  }
  async start() {
    try {
      await this.tool.terminateApp(this.package)
      await this.tool.launchApp(this.package)
    } catch (e) {}
    return Promise.resolve(true)
  }
  async exit() {
    await this.tool.terminateApp(this.package)
    await this.tool.shutdownDevice()
    return Promise.resolve(true)
  }
  async captureScreenshot() {
    return Promise.resolve(await this.tool.getScreenshot())
  }
  exists(file) {
    return fs$1.existsSync(file)
      ? Promise.resolve(true)
      : Promise.reject(Error(`${file} not exists`))
  }
  pushFile(from, to) {
    return Promise.resolve(fs$1.copySync(from, to))
  }
  get DIR_WWW() {
    return `${this.sdcard}/Documents/Pandora/apps/${this.appid}/www/`
  }
}

const adb = require('adbkit')
const debugClient$1 = debug('automator:adb')
const $EXTERNAL_STORAGE = '$EXTERNAL_STORAGE'
class Android extends Launcher {
  async init() {
    // adbkit 异常时，可能不会关闭 socket
    this.tool = adb.createClient()
    if (!this.id) {
      const devices = await this.tool.listDevices()
      if (!devices.length) {
        throw Error(`Device not found`)
      }
      this.id = devices[0].id
    }
    this.sdcard = (await this.shell(this.COMMAND_EXTERNAL)).trim()
    debugClient$1(
      `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} init ${this.id} ${this.sdcard}`
    )
  }
  version() {
    return this.shell(this.COMMAND_VERSION).then((output) => {
      const matches = output.match(/versionName=(.*)/)
      if (matches && matches.length > 1) {
        return matches[1]
      }
      return ''
    })
  }
  formatVersion(version) {
    return version
  }
  async install() {
    let grant = true
    try {
      const props = await this.tool.getProperties(this.id)
      const version = props['ro.build.version.release'].split('.')[0]
      if (parseInt(version) < 6) {
        grant = false
      }
    } catch (e) {}
    debugClient$1(
      `${dateFormat('yyyy-mm-dd HH:MM:ss:l')} install ${
        this.app
      } permission=${grant}`
    )
    if (grant) {
      const Command = require('adbkit/lib/adb/command.js')
      const oldSend = Command.prototype._send
      Command.prototype._send = function send(data) {
        if (data.indexOf('shell:pm install -r ') === 0) {
          data = data.replace('shell:pm install -r ', 'shell:pm install -r -g ')
          debugClient$1(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} ${data} `)
        }
        return oldSend.call(this, data)
      }
    }
    return this.tool.install(this.id, this.app).then(() => this.init())
  }
  start() {
    return this.exit().then(() => this.shell(this.COMMAND_START))
  }
  exit() {
    return this.shell(this.COMMAND_STOP)
  }
  captureScreenshot() {
    return this.tool.screencap(this.id).then((stream) => {
      return new Promise((resolve) => {
        const chunks = []
        stream.on('data', function (chunk) {
          chunks.push(chunk)
        })
        stream.on('end', function () {
          resolve(Buffer.concat(chunks).toString('base64'))
        })
      })
    })
  }
  exists(file) {
    return this.tool.stat(this.id, file)
  }
  pushFile(from, to) {
    return this.tool.push(this.id, from, to)
  }
  shell(command) {
    debugClient$1(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} SEND ► ${command}`)
    return this.tool
      .shell(this.id, command)
      .then(adb.util.readAll)
      .then((output) => {
        const res = output.toString()
        debugClient$1(`${dateFormat('yyyy-mm-dd HH:MM:ss:l')} ◀ RECV ${res}`)
        return res
      })
  }
  get DIR_WWW() {
    return `${this.sdcard}/Android/data/${this.package}/apps/${this.appid}/www`
  }
  get COMMAND_EXTERNAL() {
    return `echo ${$EXTERNAL_STORAGE}`
  }
  get COMMAND_VERSION() {
    return `dumpsys package ${this.package}`
  }
  get COMMAND_STOP() {
    return `am force-stop ${this.package}`
  }
  get COMMAND_START() {
    return `am start -n ${this.package}/io.dcloud.PandoraEntry --es ${this.appid} --ez needUpdateApp false --ez reload true`
  }
}

const debugDevtools = debug('automator:devtool')
let launcher
let install = false
function createLauncher(platform, options) {
  if (platform === 'ios') {
    return new IOS(options)
  }
  return new Android(options)
}
const VERSIONS_RE = {
  android: /android_version=(.*)/,
  ios: /iphone_version=(.*)/,
}
function getVersion(version, platform) {
  if (version.endsWith('.txt')) {
    try {
      const versionStr = fs.readFileSync(version).toString()
      const matches = versionStr.match(VERSIONS_RE[platform])
      if (matches) {
        return matches[1]
      }
    } catch (e) {
      console.error(e)
    }
  }
  return version
}
async function validateDevtools(options, puppet) {
  options.platform = (
    options.platform || process.env.UNI_OS_NAME
  ).toLocaleLowerCase()
  Object.assign(options, options[options.platform])
  launcher = createLauncher(options.platform, options)
  await launcher.init() // check device
  const version = await launcher.version()
  if (!version) {
    install = true
  } else if (options.version) {
    const newVersion = launcher.formatVersion(
      getVersion(options.version, options.platform)
    )
    debugDevtools(`version: ${version}`)
    debugDevtools(`newVersion: ${newVersion}`)
    if (newVersion !== version) {
      install = true
    }
  }
  if (install) {
    if (!options.executablePath) {
      throw Error(
        `app-plus->${options.platform}->executablePath is not provided`
      )
    }
    if (!fs.existsSync(options.executablePath)) {
      throw Error(`${options.executablePath} not exists`)
    }
  }
  return options
}
async function createDevtools(projectPath, options, puppet) {
  if (install) {
    //install
    await launcher.install()
  }
  if (install || puppet.compiled || (await launcher.shouldPush())) {
    await launcher.push(projectPath)
  }
  await launcher.start()
}
const adapter = {
  'Tool.close': {
    reflect: async () => {},
  },
  'App.exit': {
    reflect: async () => launcher.exit(),
  },
  'App.enableLog': {
    reflect: () => Promise.resolve(),
  },
  'App.captureScreenshot': {
    reflect: async (send, params) => {
      const data = await launcher.captureScreenshot(params)
      debugDevtools(`App.captureScreenshot ${data.length}`)
      return {
        data,
      }
    },
  },
}
initAdapter(adapter)
const puppet = {
  devtools: {
    name: 'App',
    paths: [],
    required: ['manifest.json', 'app-service.js'],
    validate: validateDevtools,
    create: createDevtools,
  },
  adapter,
}

module.exports = puppet
