const postcss = require('postcss')
const selectorParser = require('postcss-selector-parser')

const TAGS = Object.keys(require('@dcloudio/uni-cli-shared').tags)

const transformSelector = (complexSelector, transformer) => {
  return selectorParser(transformer).processSync(complexSelector)
}
const isInsideKeyframes = function (rule) {
  return (
    rule.parent && rule.parent.type === 'atrule' && /^(-\w+-)?keyframes$/.test(rule.parent.name)
  )
}
module.exports = postcss.plugin('postcss-uniapp-plugin', function (opts) {
  return function (root, result) {
    root.walkRules(rule => {
      // Transform each rule here
      if (!isInsideKeyframes(rule)) {
        // rule.selectors == comma seperated selectors
        // a, b.c {} => ["a", "b.c"]
        rule.selectors = rule.selectors.map(complexSelector =>
          // complexSelector => simpleSelectors
          // "a.b#c" => ["a", ".b", "#c"]
          transformSelector(complexSelector, simpleSelectors => {
            // only process type selector, leave alone class & id selectors
            return simpleSelectors.walkTags(tag => {
              if (tag.value === 'page') {
                tag.value = 'body'
              } else if (~TAGS.indexOf(tag.value) && tag.value.substring(
                  0, 4) !== 'uni-') {
                tag.value = 'uni-' + tag.value
              }
            })
          })
        )
      }
    })
  }
})
