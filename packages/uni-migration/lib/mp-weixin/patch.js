const fs = require('fs-extra')

const {
  normalizePath
} = require('./util')

const VANT_ASSETS = [{ // wxs array.constructor
  test(src) {
    return src.indexOf('array.wxs') !== -1
  },
  source(code) {
    return code.replace(`array.constructor === 'Array'`, 'Array.isArray(array)')
  }
}]

const PATCH_ASSETS = [
  ...VANT_ASSETS
]

const VANT_VUES = [{
  test(file) {
    return normalizePath(file.path).indexOf('/image/index.vue') !== -1
  },
  source(code) {
    // onLoad 与 onError 是生命周期函数名,需要替换为其他
    return code.replace(/onLoad/g, 'onImageLoad')
      .replace(/onError/g, 'onImageError')
  }
}]

const PATCH_VUES = [
  ...VANT_VUES
]

function patchAsset(src, dest) {
  const options = PATCH_ASSETS.find(patch => patch.test(src))
  if (options) {
    console.log(`write: ${dest}`)
    fs.outputFileSync(dest, options.source(fs.readFileSync(src).toString()))
    return true
  }
  return false
}

function patchVue(file) {
  const options = PATCH_VUES.find(patch => patch.test(file))
  if (options) {
    file.content = options.source(file.content)
  }
}

const VANT_WRAPPERS = [
  function test(filepath) {
    return filepath.indexOf('/cell/index') !== -1
  },
  function test(filepath) {
    return filepath.indexOf('/sticky/index') !== -1
  }
]

const PATCH_WRAPPERS = [
  ...VANT_WRAPPERS
]

function patchWrapper(filepath) {
  filepath = normalizePath(filepath)
  return !!PATCH_WRAPPERS.find(test => test(filepath))
}

module.exports = {
  vue: patchVue,
  asset: patchAsset,
  wrapper: patchWrapper
}
