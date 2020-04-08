const path = require('path')

const {
  getJson,
  parseJson
} = require('./json')

const defaultRouter = {
  mode: 'hash',
  base: '/'
}

const defaultAsync = {
  loading: 'AsyncLoading',
  error: 'AsyncError',
  delay: 200,
  timeout: 60000
}

const networkTimeout = {
  request: 60000,
  connectSocket: 60000,
  uploadFile: 60000,
  downloadFile: 60000
}

function getManifestJson () {
  return getJson('manifest.json')
}

function parseManifestJson (content) {
  return parseJson(content)
}

function getNetworkTimeout (manifestJson) {
  if (!manifestJson) {
    manifestJson = getManifestJson()
  }
  return Object.assign({}, networkTimeout, manifestJson.networkTimeout || {})
}

function getH5Options (manifestJson) {
  if (!manifestJson) {
    manifestJson = getManifestJson()
  }

  const h5 = manifestJson[process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM] || {}

  h5.appid = (manifestJson.appid || '').replace('__UNI__', '')

  h5.title = h5.title || manifestJson.name || ''

  h5.router = Object.assign({}, defaultRouter, h5.router || {})

  h5['async'] = Object.assign({}, defaultAsync, h5['async'] || {})

  let base = h5.router.base

  if (!base.startsWith('/') && !base.startsWith('./')) {
    base = '/' + base
  }
  if (!base.endsWith('/')) {
    base = base + '/'
  }
  // 相对路径仅支持 hash 模式
  if (base.startsWith('./')) {
    h5.router.mode = defaultRouter.mode
  }

  h5.router.base = base

  if (process.env.NODE_ENV === 'production') { // 生产模式，启用 publicPath
    h5.publicPath = h5.publicPath || base

    if (!h5.publicPath.endsWith('/')) {
      h5.publicPath = h5.publicPath + '/'
    }
  } else { // 其他模式，启用 base
    if (base.startsWith('./')) {
      // 在开发模式, publicPath 如果为 './' webpack-dev-server 匹配文件时会失败
      h5.publicPath = base.substr(1)
    } else {
      h5.publicPath = base
    }
  }

  /* eslint-disable no-mixed-operators */
  h5.template = h5.template && path.resolve(process.env.UNI_INPUT_DIR, h5.template) || path.resolve(__dirname,
    '../../../../public/index.html')

  h5.devServer = h5.devServer || {}

  // 插件修改 h5Options
  global.uniPlugin.configureH5.forEach(configureH5 => {
    configureH5(h5)
  })

  return h5
}

module.exports = {
  getManifestJson,
  parseManifestJson,
  getNetworkTimeout,
  getH5Options
}
