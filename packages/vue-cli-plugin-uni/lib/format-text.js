var validDivisionCharRE = /[\w).+\-_$\]]/

function parseFilters (exp) {
  var inSingle = false
  var inDouble = false
  var inTemplateString = false
  var inRegex = false
  var curly = 0
  var square = 0
  var paren = 0
  var lastFilterIndex = 0
  var c, prev, i, expression, filters

  for (i = 0; i < exp.length; i++) {
    prev = c
    c = exp.charCodeAt(i)
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) {
        inSingle = false
      }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) {
        inDouble = false
      }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) {
        inTemplateString = false
      }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) {
        inRegex = false
      }
    } else if (
      c === 0x7C && // pipe
            exp.charCodeAt(i + 1) !== 0x7C &&
            exp.charCodeAt(i - 1) !== 0x7C &&
            !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1
        expression = exp.slice(0, i).trim()
      } else {
        pushFilter()
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true
          break // "
        case 0x27:
          inSingle = true
          break // '
        case 0x60:
          inTemplateString = true
          break // `
        case 0x28:
          paren++
          break // (
        case 0x29:
          paren--
          break // )
        case 0x5B:
          square++
          break // [
        case 0x5D:
          square--
          break // ]
        case 0x7B:
          curly++
          break // {
        case 0x7D:
          curly--
          break // }
      }
      if (c === 0x2f) { // /
        var j = i - 1
        var p = (void 0)
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j)
          if (p !== ' ') {
            break
          }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim()
  } else if (lastFilterIndex !== 0) {
    pushFilter()
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
    lastFilterIndex = i + 1
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i])
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return ('_f("' + filter + '")(' + exp + ')')
  } else {
    var name = filter.slice(0, i)
    var args = filter.slice(i + 1)
    return ('_f("' + name + '")(' + exp + (args !== ')' ? ',' + args : args))
  }
}
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

function parseText (
  text
) {
  const tokens = []
  const rawTokens = []

  let lastIndex = defaultTagRE.lastIndex = 0
  let match, index, tokenValue

  while ((match = defaultTagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    var exp = parseFilters(match[1].trim())
    tokens.push(('_s(' + exp + ')'))
    rawTokens.push({
      '@binding': exp
    })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

module.exports = {
  postTransformNode (el) { // 重新格式化 text 节点,应该使用postTransformNode,但 mpvue 使用的 template-compiler 较老，导致 postTransformNode 时机不对
    const children = el.children
    if (children && children.length) {
      children.forEach(childEl => {
        if (childEl.text) {
          const text = childEl.text.trim()
          if (childEl.type === 2) {
            try {
              const {
                expression,
                tokens
              } = parseText(text)
              childEl.expression = expression
              childEl.tokens = tokens
              childEl.text = text
            } catch (e) {
              console.log(e)
            }
          } else {
            childEl.text = text
          }
        }
      })
    }
    return ''
  }
}
