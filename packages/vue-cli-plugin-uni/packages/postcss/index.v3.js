const selectorParser = require('postcss-selector-parser')
const postcss = require('postcss')

const {
  initTheme,
  parseTheme,
  getJson,
  getManifestJson,
  tags
} = require('@dcloudio/uni-cli-shared')

const TAGS = Object.keys(tags)
const pageJson = getJson('pages.json', true)

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

  // darkmode
  if (
    process.env.VUE_APP_DARK_MODE === 'true' &&
    root.source.input.file.indexOf('App.vue') !== -1
  ) {
    const pageBGC = (pageJson.globalStyle || {}).backgroundColor || ''
    if (pageBGC.indexOf('@') === 0) {
      // app 端 webpack-uni-pages-loader/lib/index-new.js 执行晚于 postCss
      initTheme(getManifestJson())
      ;['dark', 'light'].forEach(theme => {
        const { backgroundColor } = parseTheme({ backgroundColor: pageBGC }, theme)
        if (backgroundColor !== 'undefined') {
          const mediaRoot = postcss.parse(`
            /* #ifndef APP-NVUE*/
            @media (prefers-color-scheme: ${theme}) {
              body,
              uni-page-body {
                background-color: ${backgroundColor};
              }
            }
            /* #endif */
          `)
          root.nodes = [...mediaRoot.nodes, ...root.nodes]
        }
      })
    }
  }
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
