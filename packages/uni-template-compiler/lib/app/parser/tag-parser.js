const {
  hasOwn,
  elements
} = require('../util')

const tags = require('@dcloudio/uni-cli-shared/lib/tags')

// 仅限 view 层
module.exports = function parseTag (el) {
  const tag = el.tag
  const element = elements.find(element => tag === element || 'uni-' + tag === element)
  if (element) {
    el.tag = element
    return
  }
  if (el.tag.indexOf('v-uni-') !== 0 && hasOwn(tags, el.tag)) {
    el.tag = 'v-uni-' + el.tag
  }
}
