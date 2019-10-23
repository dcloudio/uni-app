const {
  ID,
  hasOwn
} = require('../util')

const tags = require('../../../../uni-cli-shared/lib/tags')

// 仅限 view 层
module.exports = function parseComponent (el) {
  // 需要把自定义组件的 attrs, props 全干掉
  if (el.tag && !hasOwn(tags, el.tag.replace('v-uni-', ''))) {
    // 仅保留 ID
    el.attrs && (el.attrs = el.attrs.filter(attr => attr.name === ID))
  }
}
