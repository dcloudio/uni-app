const {
  hasOwn
} = require('../util')

const tags = require('@dcloudio/uni-cli-shared/lib/tags')

// 仅限 view 层
module.exports = function parseTag (el) {
  if (el.tag.indexOf('v-uni-') !== 0 && hasOwn(tags, el.tag)) {
    el.tag = 'v-uni-' + el.tag
  }
}
