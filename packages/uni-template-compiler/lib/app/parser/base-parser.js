const {
  ID,
  V_IF,
  V_FOR,
  V_ELSE_IF,
  isVar
} = require('../util')

const parseTextExpr = require('./text-parser')

function parseIf (el, createGenVar) {
  if (!el.if) {
    return
  }
  el.ifConditions.forEach(con => {
    if (isVar(con.exp)) {
      con.exp = createGenVar(con.block.attrsMap[ID])(con.block.elseif ? V_ELSE_IF : V_IF, con.exp)
    }
  })
  el.if = createGenVar(el.attrsMap[ID])(V_IF, el.if)
}

function parseFor (el, createGenVar) {
  if (el.for && isVar(el.for)) {
    el.for = createGenVar(el.forId)(V_FOR, `{forItems:${el.for}}`)
    return true
  }
}

function parseBinding (el, genVar) {
  el.classBinding && (el.classBinding = genVar('c', el.classBinding))
  el.styleBinding && (el.styleBinding = genVar('s', el.styleBinding))
}

function parseDirs (el, genVar) {
  el.directives && el.directives.forEach(dir => {
    dir.value && (dir.value = genVar('v-' + dir.name, dir.value))
    dir.isDynamicArg && (dir.arg = genVar('v-' + dir.name + '-arg', dir.arg))
  })
}

function parseAttrs (el, genVar) {
  el.attrs && el.attrs.forEach(attr => {
    attr.name !== ID && isVar(attr.value) && (attr.value = genVar('a-' + attr.name, attr.value))
  })
}

function parseProps (el, genVar) {
  el.props && el.props.forEach(prop => {
    isVar(prop.value) && (prop.value = genVar('a-' + prop.name, prop.value))
  })
}

function parseText (el, parent, state) {
  // fixed by xxxxxx 注意：保持平台一致性，trim 一下
  el.parent && (el.parent = parent)
  el.expression = parseTextExpr(el.text.trim(), false, state).expression
}

module.exports = {
  parseIf,
  parseFor,
  parseText,
  parseDirs,
  parseAttrs,
  parseProps,
  parseBinding
}
