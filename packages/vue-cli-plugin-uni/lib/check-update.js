const fs = require('fs')
const os = require('os')
const path = require('path')

class Upate {
  constructor () {
    this._https = null
    this._crypto = null
    this._interval = this.DEFAULT_INTERVAL
    this._platform = process.env.UNI_PLATFORM
    this._fileData = {}
    this._compilerVersion = ''
    this._isAlpha = false
    this._uniId = ''
    this._appId = ''
    this._wt = 0
    this._lc = ''
    this._lcin = []
  }

  get uniId () {
    return this._uniId
  }

  set uniId (value) {
    this._uniId = value
  }

  get appId () {
    return this._appId
  }

  set appId (value) {
    this._appId = value
  }

  get compilerVersion () {
    return this._compilerVersion
  }

  set compilerVersion (value) {
    this._compilerVersion = value
  }

  get isAlpha () {
    return this._isAlpha
  }

  set isAlpha (value) {
    this._isAlpha = value
  }

  get wt () {
    return this._wt
  }

  set wt (value) {
    this._wt = value
  }

  get lc () {
    return this._lc
  }

  set lc (value) {
    this._lc = value
  }

  get lcin () {
    return this._lcin
  }

  set lcin (value) {
    this._lcin = value
  }

  get versionType () {
    return (this.isAlpha ? 'a' : 'r')
  }

  get https () {
    if (this._https == null) {
      this._https = require('https')
    }
    return this._https
  }

  get crypto () {
    if (this._crypto == null) {
      this._crypto = require('crypto')
    }
    return this._crypto
  }

  getBuildType () {
    return (process.env.NODE_ENV === 'production' ? 'build' : 'dev')
  }

  async check () {
    await this.readFile()

    const fileData = this._fileData
    const currentDate = Date.now()

    if (!fileData.lastCheck || (Math.abs(currentDate - fileData.lastCheck) > this._interval)) {
      this._fileData.lastCheck = currentDate
      this.checkUpdate()
    } else {
      if (fileData.newVersion && fileData.newVersion !== this.compilerVersion) {
        console.log()
        console.log(fileData.note)
      }
    }

    await this.update()
  }

  async readFile () {
    const filePath = await this.getFilePath()
    let fileData = {}
    if (fs.existsSync(filePath)) {
      fileData = require(filePath)
    } else {
      fileData.vid = this._buildUUID()
    }

    if (!fileData[this._platform]) {
      fileData[this._platform] = {}
    }

    this._fileData = fileData
  }

  async update () {
    const bt = this.getBuildType()
    const info = this._fileData[this._platform]
    const count = parseInt(info[bt] || 0)
    info[bt] = (count + 1)

    this.writeFile()
  }

  async writeFile (file) {
    try {
      const filePath = await this.getFilePath()
      const content = JSON.stringify(file || this._fileData)
      fs.writeFileSync(filePath, content, 'utf8')
    } catch (error) {
    }
  }

  checkUpdate () {
    const postData = JSON.stringify({
      id: this.getPostData()
    })

    var responseData = ''
    const req = this.https.request({
      hostname: this.HOST,
      path: this.PATH,
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res) => {
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        responseData += chunk
      })
      res.on('end', () => {
        this.checkUpdateSuccess(JSON.parse(responseData))
      })
    })
    req.write(postData)
    req.end()
  }

  getPostData () {
    var data = JSON.parse(JSON.stringify(this._fileData))
    data.device = this._getMD5(this._getMac())
    data.appid = this.uniId
    data.vtype = this.versionType
    data.vcode = this.compilerVersion
    data.wt = this._wt
    data.lc = this._lc
    data.in = this._lcin

    delete data.lastCheck

    if (this.appId) {
      data[this._platform].appid = this.appId
    }
    if (data.appid) {
      delete data.vid
    } else {
      delete data.appid
    }

    return JSON.stringify(data)
  }

  checkUpdateSuccess (data) {
    if (data.code !== 0) {
      return
    }

    var fileData = {
      vid: this._fileData.vid,
      lastCheck: this._fileData.lastCheck
    }

    if (data.isUpdate === true) {
      fileData.newVersion = data.newVersion
      fileData.note = data.note
    }

    this.writeFile(fileData)
  }

  async getFilePath () {
    const rootDir = os.tmpdir()
    const fileName = this._getMD5(process.env.UNI_INPUT_DIR)
    return path.join(rootDir, `${this.UPDATE_FILE_NAME}_${fileName}.json`)
  }

  _getMac () {
    let mac
    const network = os.networkInterfaces()
    for (const key in network) {
      const array = network[key]
      for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (!item.family || (item.mac && item.mac === '00:00:00:00:00:00')) {
          continue
        }
        if (item.family === 'IPv4' || item.family === 'IPv6') {
          mac = item.mac
          break
        }
      }
    }
    return mac
  }

  _getMD5 (str) {
    return this.crypto.createHash('md5').update(str).digest('hex')
  }

  _buildUUID () {
    var result = ''
    for (let i = 0; i < 4; i++) {
      result += (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    }
    return 'UNI_' + result.toUpperCase()
  }
}
Object.assign(Upate.prototype, {
  HOST: 'uniapp.dcloud.net.cn',
  PATH: '/update/cli',
  UPDATE_FILE_NAME: 'uni_app_cli_update',
  DEFAULT_TIME: 2000,
  DEFAULT_INTERVAL: 1000 * 60 * 60 * 24
})

function getLc () {
  const result = []
  const localeDir = path.join(process.env.UNI_CLI_CONTEXT, 'src/locale')
  if (!fs.existsSync(localeDir)) {
    return result
  }

  const files = fs.readdirSync(localeDir)
  for (let i = files.length - 1; i >= 0; i--) {
    const filePath = files[i]
    const extName = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase()
    if (extName !== 'json') {
      continue
    }

    if (files[i].indexOf('uni-app.') < 0) {
      result.push(filePath.substring(0, filePath.lastIndexOf('.')))
    }
  }
  return result
}

module.exports = async function checkUpdate () {
  const {
    isInHBuilderX,
    getManifestJson
  } = require('@dcloudio/uni-cli-shared')

  if (isInHBuilderX) { // 仅 cli 提供检测更新
    return
  }

  const plp = require('@dcloudio/webpack-uni-pages-loader/package.json')
  const ppj = require(path.join(process.env.UNI_CLI_CONTEXT, 'package.json'))
  const manifest = getManifestJson()

  try {
    const update = new Upate()
    update.compilerVersion = plp['uni-app'].compilerVersion
    update.isAlpha = ppj.devDependencies['@dcloudio/vue-cli-plugin-uni'].includes('alpha')
    update.uniId = manifest.appid
    const appIdKey = process.env.UNI_PLATFORM.includes('quickapp') ? 'package' : 'appid'
    update.appId = manifest[process.env.UNI_PLATFORM] ? (manifest[process.env.UNI_PLATFORM][appIdKey] || '') : ''
    const cf = manifest['mp-weixin'] ? manifest['mp-weixin'].cloudfunctionRoot : ''
    update.wt = (cf && cf.length) ? 1 : 0
    update.lc = manifest.locale ? manifest.locale : ''
    update.lcin = getLc().join(',')
    update.check()
  } catch (e) {
  }
}
