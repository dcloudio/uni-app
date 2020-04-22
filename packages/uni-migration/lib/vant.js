const path = require('path')
const fs = require('fs-extra')

const {
  normalizePath
} = require('./util')

module.exports = function patchVant (files, assets, out) {
  files.forEach(file => {
    const filepath = normalizePath(file.path)
    let changed = false
    if (filepath.indexOf('/image/index.vue') !== -1) {
      changed = true
      // onLoad 与 onError 是生命周期函数名,需要替换为其他
      file.content = file.content
        .replace(/onLoad/g, 'onImageLoad')
        .replace(/onError/g, 'onImageError')
      changed = true
    } else if (filepath.indexOf('/notify/index.vue') !== -1) {
      changed = true
      // notify show方法与show属性冲突
      file.content = file.content.replace('show()', 'showNotify()')
    }
    changed && fs.outputFileSync(file.path, file.content)
  })
  assets.forEach(asset => {
    if (typeof asset === 'string') {
      const dest = normalizePath(path.resolve(out, asset))
      if (dest.indexOf('array.wxs') !== -1) {
        // 兼容 Array.isArray
        const content = fs.readFileSync(dest, 'utf8').toString()
          .replace('array && array.constructor === \'Array\'',
            'array && (array.constructor === \'Array\' || (typeof Array !== \'undefined\' && Array.isArray(array)))')
        fs.outputFileSync(dest, content)
      } else if (dest.indexOf('notify/notify.js') !== -1) {
        // notify.js show 方法与 show 属性冲突
        const content = fs.readFileSync(dest, 'utf8').toString()
          .replace('show()', 'showNotify()')
        fs.outputFileSync(dest, content)
      }
    }
  })
}
