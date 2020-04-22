if (process.env.UNI_USING_V3) {
  module.exports = require('./index.v3.js')
} else {
  const postcss = require('postcss')
  const selectorParser = require('postcss-selector-parser')
  const valueParser = require('postcss-value-parser')

  const {
    getPlatformCssVars
  } = require('@dcloudio/uni-cli-shared')

  const CSS_TAGS = require('./tags')
  const {
    unit,
    walk
  } = valueParser

  const defaultOpts = {
    px: false
  }

  const cssVars = getPlatformCssVars()

  const transformSelector = (complexSelector, transformer) => {
    return selectorParser(transformer).processSync(complexSelector)
  }

  const parseWord = function (node, opts) {
    const pair = unit(node.value)
    if (pair) {
      const num = Number(pair.number)
      let u = pair.unit.toLowerCase()
      if (u === 'px' && process.UNI_TRANSFORM_PX) { // TODO px 转换为 upx
        u = 'upx'
      }
      if (process.env.UNI_PLATFORM === 'h5') {
        if (u === 'upx' || u === 'rpx') {
          node.value = `%?${num}?%`
        }
      } else {
        if (u === 'upx') {
          node.value = num + 'rpx'
        }
        // fixed 百度目前1rpx会转换成小数点 vw，导致边框之类的显示有问题
        if (process.env.UNI_PLATFORM === 'mp-baidu') {
          if (num === 1 && (u === 'upx' || u === 'rpx')) {
            node.value = '1px'
          }
        }
      }
    }
  }

  const isInsideKeyframes = function (rule) {
    return (
      rule.parent && rule.parent.type === 'atrule' && /^(-\w+-)?keyframes$/.test(rule.parent.name)
    )
  }

  const tranformValue = function (decl, opts) {
    return valueParser(decl.value)
      .walk(node => {
        if (node.type === 'word') {
          parseWord(node, opts)
        } else if (node.type === 'function') {
          if (node.value === 'url') {
            return false
          }
          if (node.value === 'var') {
            let cssVarValue = false
            walk(node.nodes, n => {
              if (n.type === 'word') {
                if (cssVars.hasOwnProperty(n.value)) { // 目前仅考虑 nodes 长度为0
                  cssVarValue = cssVars[n.value]
                }
              }
            })
            if (cssVarValue !== false) {
              node.type = 'word'
              node.value = cssVarValue
              delete node.before
              delete node.after
              delete node.nodes
            }
            return false
          } else {
            walk(node.nodes, n => {
              if (n.type === 'word') {
                parseWord(n, opts)
              }
            })
          }
        }
      })
      .toString()
  }

  const TAGS = [
    'ad',
    'audio',
    'button',
    'camera',
    'canvas',
    'checkbox',
    'checkbox-group',
    'cover-image',
    'cover-view',
    'form',
    'functional-page-navigator',
    'icon',
    'image',
    'input',
    'label',
    'live-player',
    'live-pusher',
    'map',
    'movable-area',
    'movable-view',
    'navigator',
    'official-account',
    'open-data',
    'picker',
    'picker-view',
    'picker-view-column',
    'progress',
    'radio',
    'radio-group',
    'rich-text',
    'scroll-view',
    'slider',
    'swiper',
    'swiper-item',
    'switch',
    'text',
    'textarea',
    'video',
    'view',
    'web-view'
  ]

  const BG_PROPS = [
    'background',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'background-attachment'
  ]

  let rewriteUrl
  /**
   * 转换 upx
   * 转换 px
   */
  module.exports = postcss.plugin('postcss-uniapp-plugin', function (opts) {
    opts = {
      ...defaultOpts,
      ...opts
    }
    return function (root, result) {
      if (!rewriteUrl) {
        rewriteUrl = require('@dcloudio/uni-cli-shared/lib/url-loader').rewriteUrl
      }
      rewriteUrl(root)

      if (process.env.UNI_PLATFORM === 'h5') {
        // Transform CSS AST here

        const bgDecls = []

        root.walkRules(rule => {
          let hasPage = false
          // Transform each rule here
          if (!isInsideKeyframes(rule)) {
            // rule.selectors == comma seperated selectors
            // a, b.c {} => ["a", "b.c"]
            rule.selectors = rule.selectors.map(complexSelector => {
              // complexSelector => simpleSelectors
              // "a.b#c" => ["a", ".b", "#c"]
              if (complexSelector === 'page') {
                hasPage = true
              }
              return transformSelector(complexSelector, simpleSelectors =>
                // only process type selector, leave alone class & id selectors
                simpleSelectors.walkTags(tag => {
                  if (tag.value === 'page') {
                    tag.value = 'uni-page-body'
                  } else if (~TAGS.indexOf(tag.value) && tag.value.substring(
                    0, 4) !== 'uni-') {
                    tag.value = 'uni-' + tag.value
                  }
                })
              )
            })
          }
          // handle upx unit
          rule.walkDecls(decl => {
            if (hasPage) {
              if (BG_PROPS.indexOf(decl.prop) !== -1) {
                bgDecls.push(decl.clone())
              }
            }
            // Transform each property declaration here
            decl.value = tranformValue(decl, opts)
          })
        })

        if (bgDecls.length) {
          const rule = postcss.rule({
            selector: 'body.?%PAGE?%'
          })
          bgDecls.forEach(decl => rule.append(decl))
          root.append(rule)
        }
      } else {
        root.walkRules(rule => {
          const selectors = transformSelector(rule.selectors.join(','), function (selectors) {
            selectors.walkUniversals(node => {
              node.parent.remove()
            })
          })
          if (!selectors) {
            return rule.remove()
          }
          rule.selectors = selectors.split(',')

          // handle upx unit
          rule.walkDecls(decl => {
            const raws = decl.raws
            if (raws) {
              if (raws.before && raws.before.indexOf(';') !== -1) {
                raws.before = raws.before.replace(/;/g, '')
              }
              if (raws.after && raws.after.indexOf(';') !== -1) {
                raws.after = raws.after.replace(/;/g, '')
              }
            }
            // Transform each property declaration here
            decl.value = tranformValue(decl, opts)
          })
          if (process.env.UNI_PLATFORM !== 'quickapp-vue') {
            rule.selectors = rule.selectors.map(complexSelector => {
              return transformSelector(complexSelector, simpleSelectors => {
                return simpleSelectors.walkTags(tag => {
                  const k = tag.value
                  const v = CSS_TAGS[k]
                  if (v) {
                    tag.value = v === 'r'
                      ? `._${k}` : v
                  }
                })
              })
            })
          }
        })
      }
    }
  })
}
