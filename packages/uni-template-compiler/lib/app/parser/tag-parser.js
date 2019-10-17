const {
  hasOwn
} = require('../util')

const {
  getTagName
} = require('../../h5')

const tags = require('../../../../uni-cli-shared/lib/tags')

// 仅限 view 层
module.exports = function parseTag (el) {
  el.tag = getTagName(el.tag)
  if (el.tag.indexOf('v-uni-') !== 0 && hasOwn(tags, el.tag)) {
    el.tag = 'v-uni-' + el.tag
  }
}
