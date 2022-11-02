const selectorParser = require('postcss-selector-parser')

const {
  tags
} = require('@dcloudio/uni-cli-shared')

const TAGS = Object.keys(tags)

const transformSelector = (complexSelector, transformer) => {
  return selectorParser(transformer).processSync(complexSelector)
}
const isInsideKeyframes = function (rule) {
  return (
    rule.parent && rule.parent.type === 'atrule' && /^(-\w+-)?keyframes$/.test(rule.parent.name)
  )
}

let rewriteUrl

function once (root) {
  if (!rewriteUrl) {
    rewriteUrl = require('@dcloudio/uni-cli-shared/lib/url-loader').rewriteUrl
  }
  rewriteUrl(root)

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

const version = Number(require('postcss/package.json').version.split('.')[0])

if (version < 8) {
  const postcss = require('postcss')
  module.exports = postcss.plugin('postcss-uniapp-plugin', function (opts) {
    return once
  })
} else {
  module.exports = function (opts) {
    return {
      postcssPlugin: 'postcss-uniapp-plugin',
      Once: once
    }
  }

  module.exports.postcss = true
}
