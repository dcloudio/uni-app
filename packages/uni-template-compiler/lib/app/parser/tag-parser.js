const {
  hasOwn
} = require('../util')

const tags = require('@dcloudio/uni-cli-shared/lib/tags')

// 仅限 view 层
module.exports = function parseTag (el) {
  const tag = el.tag
  // web components
  // TODO use list
  if (tag === 'view' || tag === 'uni-view') {
    el.tag = 'uni-view'
    return
  }
  if (el.tag.indexOf('v-uni-') !== 0 && hasOwn(tags, el.tag)) {
    el.tag = 'v-uni-' + el.tag
  }
}
