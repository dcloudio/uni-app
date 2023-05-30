const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default
const babelGenerate = require('@babel/generator').default
const babelTemplate = require('@babel/template').default
const uniI18n = require('@dcloudio/uni-cli-i18n')

const {
  METHOD_RENDER_LIST,
  METHOD_RESOLVE_SCOPED_SLOTS,
  METHOD_CREATE_ELEMENT
} = require('./constants')

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
const customizeRE = /:/g
const camelizeRE = /-(\w)/g
const hyphenateRE = /\B([A-Z])/g

const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

function getCode (node) {
  return babelGenerate(t.cloneDeep(node), {
    compact: true,
    jsescOption: {
      quotes: 'single',
      minimal: true
    }
  }).code
}

function traverseKey (ast, state) {
  let forKey = false
  babelTraverse(ast, {
    noScope: true,
    ObjectProperty (path) {
      if (forKey) {
        return
      }
      if (path.node.key.name === 'key') {
        forKey = path.node.value
        path.stop()
      }
    },
    CallExpression (path) {
      if (path.node.callee.name === METHOD_RENDER_LIST) {
        path.stop()
      } else if (path.node.callee.name === METHOD_RESOLVE_SCOPED_SLOTS) {
        path.skip()
      }
    }
  })
  return forKey
}

function traverseFilter (ast, state) {
  const filterModules = state.options.filterModules
  if (!filterModules.length) {
    return false
  }
  let isFilter = false
  babelTraverse(ast, {
    noScope: true,
    Identifier (path) {
      if (filterModules.includes(path.node.name)) {
        const parentNode = path.parent
        if ( // t.msg || t['msg']
          t.isMemberExpression(parentNode) &&
          parentNode.object === path.node &&
          (
            t.isIdentifier(parentNode.property) ||
            t.isLiteral(parentNode.property)
          )
        ) {
          isFilter = true
          path.stop()
        }
      }
    }
  })
  return isFilter
}

function wrapper (code, reverse = false) {
  return reverse ? `{{!(${code})}}` : `{{${code}}}`
}

function genCode (node, noWrapper = false, reverse = false, quotes = true) {
  if (t.isStringLiteral(node)) {
    return reverse ? `!(${node.value})` : node.value
  } else if (t.isIdentifier(node)) {
    return noWrapper ? node.name : wrapper(node.name, reverse)
  }
  let code = getCode(node)
  if (quotes) {
    code = code.replace(/"/g, '\'')
  }
  return noWrapper ? code : wrapper(code, reverse)
}

function getForIndexIdentifier (id) {
  return `__i${id}__`
}

function getForKey (forKey, forIndex, state) {
  if (forKey) {
    if (t.isIdentifier(forKey)) {
      if (forIndex !== forKey.name) { // 非 forIndex
        if (state.options.platform.name === 'mp-baidu') return getCode(forKey)
        return '*this'
      } else {
        // TODO
        // state.tips.add(`非 h5 平台 v-for 循环不支持使用索引值 ${forIndex} 作为 key,详情参考:https://uniapp.dcloud.io/use?id=key`)
        return forKey.name
      }
    } else if (t.isMemberExpression(forKey)) {
      if (state.options.platform.name === 'mp-baidu') return getCode(forKey)
      return forKey.property.name || forKey.property.value
    } else {
      state.tips.add(uniI18n.__('templateCompiler.noH5KeyNoSupportExpression', { 0: getCode(forKey), 1: 'https://uniapp.dcloud.io/use?id=key' }))
    }
  }
  return ''
}

function processMemberProperty (node, state) {
  if (node.computed) {
    const property = node.property
    if (t.isNumericLiteral(property)) {
      node.property = t.identifier('__$n' + property.value)
    } else if (!t.isStringLiteral(property)) {
      if (!hasOwn(state.options, '__m__')) {
        state.options.__m__ = 0
        state.options.replaceCodes = {}
      }
      const identifier = '__$m' + (state.options.__m__++) + '__'
      const code = { property }
      code.toString = function () {
        return `'+${genCode(this.property, true)}+'`
      }
      state.options.replaceCodes[identifier] = code
      if (state.computedProperty) {
        state.computedProperty[identifier] = property
      }
      node.property = t.identifier(identifier)
    }
    node.computed = false
  }
}

function replaceMemberExpression (stringLiteral, state) {
  let code = `'${stringLiteral.value}'`
  const replaceCodes = state.options.replaceCodes
  if (replaceCodes) {
    const options = {}
    Object.keys(replaceCodes).forEach(key => {
      const newCode = code.replace(new RegExp(key.replace('$', '\\$'), 'g'), `'+%%${key}%%+'`)
      if (newCode !== code) {
        options[key] = replaceCodes[key].property
        code = newCode
      }
    })
    const buildRequire = babelTemplate(code, { syntacticPlaceholders: true })
    if (Object.keys(options).length) {
      const ast = buildRequire(options)
      return ast.expression
    }
  }
  return stringLiteral
}

function processMemberExpression (element, state) {
  // item['order']=>item.order
  if (t.isMemberExpression(element)) {
    element = t.cloneDeep(element)
    if (t.isStringLiteral(element.property)) {
      element.computed = false
    }
    // item[itemIndex[0]] = item[__$0__]
    // item[1]=item['1']
    processMemberProperty(element, state)

    babelTraverse(element, {
      noScope: true,
      MemberExpression (path) {
        processMemberProperty(path.node, state)
      }
    })

    babelTraverse(element, {
      noScope: true,
      MemberExpression (path) {
        if (t.isStringLiteral(path.node.property)) {
          path.node.computed = false
        }
      },
      StringLiteral (path) {
        path.replaceWith(t.identifier(path.node.value))
      }
    })
  }
  return element
}

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const tags = require('@dcloudio/uni-cli-shared/lib/tags')

const {
  isBuiltInComponent
} = require('@dcloudio/uni-cli-shared/lib/pages')

const {
  getTagName
} = require('./h5')

function isComponent (tagName) {
  if (
    tagName === 'block' ||
    tagName === 'component' ||
    tagName === 'template' ||
    tagName === 'keep-alive'
  ) {
    return false
  }
  // mp-weixin 底层支持 page-meta,navigation-bar
  if (process.env.UNI_PLATFORM === 'mp-weixin') {
    if (isBuiltInComponent(tagName)) {
      return false
    }
  }
  return !hasOwn(tags, getTagName(tagName.replace(/^v-uni-/, '')))
}

function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * 微信、QQ小程序模板支持的简单类型
 * @param {*} node
 */
function isSimpleObjectExpression (node) {
  return t.isObjectExpression(node) && node.properties.length && !node.properties.find(({
    key,
    value
  }) => !t.isIdentifier(key) || !(t.isIdentifier(value) || t.isStringLiteral(value) || t.isBooleanLiteral(value) ||
    t.isNumericLiteral(value) || t.isNullLiteral(value)))
}
/**
 * 是否包含转义引号
 * @param {*} path
 * @returns {boolean}
 */
function hasEscapeQuote (path) {
  let has = false
  function hasEscapeQuote (node) {
    const quote = node.extra ? node.extra.raw[0] : '"'
    if (node.value.includes(quote)) {
      return true
    }
  }
  if (path.isStringLiteral()) {
    return hasEscapeQuote(path.node)
  } else {
    path.traverse({
      noScope: true,
      StringLiteral (path) {
        if (hasEscapeQuote(path.node)) {
          has = true
          path.stop()
        }
      },
      TemplateElement (path) {
        if (path.node.value.cooked.includes('\'')) {
          has = true
          path.stop()
        }
      }
    })
  }
  return has
}
/**
 * 是否包含属性 length 访问
 * @param {*} path
 * @returns {boolean}
 */
function hasLengthProperty (path) {
  let has = false
  function hasLengthProperty (node) {
    const property = node.property
    // 暂不考虑动态拼接和模板字符串
    return t.isIdentifier(property, { name: 'length' }) || t.isStringLiteral(property, { value: 'length' })
  }
  if (path.isMemberExpression()) {
    return hasLengthProperty(path.node)
  } else {
    path.traverse({
      noScope: true,
      MemberExpression (path) {
        if (hasLengthProperty(path.node)) {
          has = true
          path.stop()
        }
      }
    })
  }
  return has
}

function isRootElement (path) {
  const result = path.findParent(path => (path.isCallExpression() && path.get('callee').isIdentifier({ name: METHOD_CREATE_ELEMENT })) || path.isReturnStatement())
  return result.isReturnStatement()
}

/**
 * 事件绑定是否存在成员表达式 => obj.click2()
 * @param {*} path
 * @returns {boolean}
*/
const hasMemberExpression = (funcPath) => {
  let result = false

  funcPath.get('body').traverse({
    CallExpression (path) {
      if (t.isMemberExpression(path.node.callee)) {
        result = true
        path.stop()
      }
    }
  })
  return result
}

module.exports = {
  hasOwn,
  isUnaryTag: makeMap(
    'image,area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
  ),
  isComponent,
  genCode,
  getCode,
  camelize,
  customize: cached((str) => {
    return camelize(str.replace(customizeRE, '-'))
  }),
  capitalize: cached(str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }),
  hyphenate: cached((str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  }),
  getForKey,
  traverseKey,
  traverseFilter,
  getComponentName: cached((str) => {
    if (str.indexOf('wx-') === 0) {
      return str.replace('wx-', 'weixin-')
    }
    return str
  }),
  processMemberExpression,
  replaceMemberExpression,
  getForIndexIdentifier,
  isSimpleObjectExpression,
  hasEscapeQuote,
  hasLengthProperty,
  isRootElement,
  hasMemberExpression
}
