const path = require('path')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  getPlatformExts
} = require('../shared')

const templateExt = getPlatformExts().template

const SLOTS_OUTPUT_PATH = '/[root]common/slots'

function getRelativePath (from, to) {
  let relativePath = path.relative(from, to)
  if (relativePath.indexOf('.') !== 0) {
    relativePath = './' + relativePath
  }
  return normalizePath(relativePath)
}

function getSlotsPath (root) {
  return SLOTS_OUTPUT_PATH.replace('[root]', root) + templateExt
}

module.exports = {
  getSlotsPath,
  getRelativePath
}
