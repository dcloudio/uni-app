const {
  normalizePath,
  isInHBuilderX
} = require('@dcloudio/uni-cli-shared/lib/util')
const plp = require('@dcloudio/webpack-uni-pages-loader/package.json')

class ErrorReport {
  static get instance () {
    if (this._instance == null) {
      this._instance = new ErrorReport()
    }
    return this._instance
  }

  constructor () {
    this._instance = null
    this._os = null
    this._https = null
    this._crypto = null
    this._cacheList = []
    this._UNI_INPUT_DIR_REG = new RegExp(normalizePath(process.env.UNI_INPUT_DIR), 'g')
    this._UNI_CLI_CONTEXT_REG = new RegExp(normalizePath(process.env.UNI_CLI_CONTEXT), 'g')
  }

  get os () {
    if (this._os == null) {
      this._os = require('os')
    }
    return this._os
  }

  get https () {
    if (this._https == null) {
      this._https = require('https')
    }
    return this._https
  }

  report (type, err = '') {
    if (!this._shouldReport(err)) {
      return
    }

    if (typeof err === 'object') {
      try {
        err = err.toString()
      } catch (e) {}
    }

    err = normalizePath(err) || ''
    err = err.replace(this._UNI_INPUT_DIR_REG, 'UNI_INPUT_DIR')
    err = err.replace(this._UNI_CLI_CONTEXT_REG, 'UNI_CLI_CONTEXT')

    const data = JSON.stringify({
      di: this._getMD5(this._getMac()),
      np: process.platform,
      nv: process.version,
      cp: process.env.UNI_PLATFORM,
      cv: plp['uni-app'].compilerVersion,
      hx: isInHBuilderX ? 1 : 0,
      et: type,
      em: err
    })

    var hash = this._getMD5(data)

    if (this._cacheList.includes(hash)) {
      return
    }

    this._cacheList.push(hash)

    setTimeout(() => {
      this._doReport(data)
    }, 10)
  }

  _doReport (data) {
    const req = this.https.request({
      hostname: this.HOST,
      port: 443,
      path: this.PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    })
    req.write(data)
    req.end()
  }

  _shouldReport (err = '') {
    try {
      const errMsg = err.toString()

      const errorIndex = this.EXCLUDE_ERROR_LIST.findIndex(item => errMsg.includes(item))
      if (errorIndex >= 0) {
        return false
      }

      // 目前简单的上报逻辑为：错误信息中包含@dcloudio包名
      if (
        errMsg.includes('@dcloudio') &&
        !errMsg.includes('Errors compiling template')
      ) {
        return true
      }
    } catch (e) {}
    return false
  }

  _getMD5 (str) {
    return this.crypto.createHash('md5').update(str).digest('hex')
  }

  _getMac () {
    let mac
    const network = this.os.networkInterfaces()
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

  get crypto () {
    if (this._crypto == null) {
      this._crypto = require('crypto')
    }
    return this._crypto
  }
}
Object.assign(ErrorReport.prototype, {
  HOST: '96f0e031-f37a-48ef-84c7-2023f6360c0a.bspapp.com',
  PATH: '/http/uni-app-compiler',
  EXCLUDE_ERROR_LIST: ['uni-app-compiler', 'Error: ENOENT: no such file or directory']
})

function report (type, err) {
  ErrorReport.instance.report(type, err)
}

global.__error_reporting__ = report

process
  .on('unhandledRejection', (reason, p) => {
    global.__error_reporting__ && global.__error_reporting__('unhandledRejection', reason)
  })
  .on('uncaughtException', err => {
    global.__error_reporting__ && global.__error_reporting__('uncaughtException', err.stack)
  })
