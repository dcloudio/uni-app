const {
  ID,
  C_IS,
  V_IF,
  V_FOR,
  V_ELSE_IF,
  isVar
} = require('../util')

const parseTextExpr = require('./text-parser')

function parseIs (el, genVar) {
  if (!el.component) {
    return
  }
  if (isVar(el.component)) {
    el.component = genVar(C_IS, el.component)
  }
}

function parseIf (el, createGenVar, isScopedSlot) {
  if (!el.if) {
    return
  }
  if (el.slotTarget && el.tag === 'template') { // new v-slot
    isScopedSlot = false
  }
  el.ifConditions.forEach(con => {
    if (isVar(con.exp)) {
      con.exp = createGenVar(con.block.attrsMap[ID], isScopedSlot)(con.block.elseif ? V_ELSE_IF : V_IF, con.exp)
    }
  })
  el.if = createGenVar(el.attrsMap[ID], isScopedSlot)(V_IF, el.if)
}

function parseFor (el, createGenVar, isScopedSlot) {
  if (el.for && isVar(el.for)) {
    el.for = createGenVar(el.forId, isScopedSlot)(V_FOR, `{forItems:${el.for}}`)
    return true
  }
}

function parseBinding (el, genVar) {
  el.staticClass && (el.staticClass = genVar('sc', el.staticClass))
  el.classBinding && (el.classBinding = genVar('c', el.classBinding))
  el.styleBinding && (el.styleBinding = genVar('s', el.styleBinding))
}

function parseDirs (el, genVar, ignoreDirs = []) {
  el.directives && el.directives.forEach(dir => {
    if (ignoreDirs.indexOf(dir.name) === -1) {
      dir.value && (dir.value = genVar('v-' + dir.name, dir.value))
      dir.isDynamicArg && (dir.arg = genVar('v-' + dir.name + '-arg', dir.arg))
    }
  })
}

function parseAttrs (el, genVar) {
  el.attrs && el.attrs.forEach(attr => {
    if (
      attr.name !== ID &&
      attr.name.indexOf('change:') !== 0 && // wxs change:prop
      isVar(attr.value) &&
      attr.value.indexOf('_$') !== 0 // 已被提前处理过了，如 wxs prop:_$gc(2,'change:prop')
    ) {
      attr.value = genVar('a-' + attr.name, attr.value)
    }
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
  parseIs,
  parseIf,
  parseFor,
  parseText,
  parseDirs,
  parseAttrs,
  parseProps,
  parseBinding
}
