/* @flow */

const parseFilters = require('./filter-parser')

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g

const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})

module.exports = function parseText (
  text,
  delimiters,
  state
) {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      if (!state.service) {
        tokens.push(JSON.stringify(tokenValue))
      }
    }
    // tag token
    const exp = parseFilters(match[1].trim())
    tokens.push(`(${state.genVar('t' + (state.childIndex) + '-' + (state.index++), '_s(' + exp + ')')})`)
    rawTokens.push({
      '@binding': exp
    })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    if (!state.service) {
      tokens.push(JSON.stringify(tokenValue))
    }
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
