const {
  ID,
  hasOwn
} = require('./util')

const tags = require('../../../uni-cli-shared/lib/tags')

const {
  getTagName
} = require('../h5')

// 仅限 view 层
module.exports = function parseComponent (el) {
  // TODO 需要把自定义组件的 attrs, props 全干掉
  el.tag = getTagName(el.tag)
  if (!hasOwn(tags, el.tag)) {
    el.attrs = el.attrs.filter(attr => attr.name === ID)
  }
}
