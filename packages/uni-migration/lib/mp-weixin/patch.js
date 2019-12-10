const fs = require('fs-extra')

const {
  normalizePath
} = require('./util')

const VANT_ASSETS = [{ // wxs array.constructor
  test(src) {
    return src.indexOf('array.wxs') !== -1
  },
  source(code) {
    return code.replace(`array && array.constructor === 'Array'`, `array && (array.constructor === 'Array' || (typeof Array !== 'undefined' && Array.isArray(array)))`)
  }
}, { // notify.js show 方法与 show 属性冲突
  test(src) {
    return src.indexOf('notify/notify.js') !== -1
  },
  source(code) {
    return code.replace(`show()`, 'showNotify()')
  }
}]

const PATCH_ASSETS = [
  ...VANT_ASSETS
]

const VANT_VUES = [{
  test(filepath) {
    return filepath.indexOf('/image/index.vue') !== -1
  },
  source(code) {
    // onLoad 与 onError 是生命周期函数名,需要替换为其他
    return code.replace(/onLoad/g, 'onImageLoad')
      .replace(/onError/g, 'onImageError')
  }
}, { // notify show方法与show属性冲突
  test(filepath) {
    return filepath.indexOf('/notify/index.vue') !== -1
  },
  source(code) {
    return code.replace(`show()`, 'showNotify()')
  }
}]

const PATCH_VUES = [
  ...VANT_VUES
]

function patchAsset(src, dest) {
  src = normalizePath(src)
  const options = PATCH_ASSETS.find(patch => patch.test(src))
  if (options) {
    console.log(`write: ${dest}`)
    fs.outputFileSync(dest, options.source(fs.readFileSync(src).toString()))
    return true
  }
  return false
}

function patchVue(file) {
  const filepath = normalizePath(file.path)
  const options = PATCH_VUES.find(patch => patch.test(filepath))
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
