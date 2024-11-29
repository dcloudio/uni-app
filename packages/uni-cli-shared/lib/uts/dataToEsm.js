const reservedWords =
  'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'
const builtins =
  'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(' '))
forbiddenIdentifiers.add('')
const makeLegalIdentifier = function makeLegalIdentifier (str) {
  let identifier = str
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/[^$_a-zA-Z0-9]/g, '_')
  if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
    identifier = `_${identifier}`
  }
  return identifier || '_'
}

function stringify (obj) {
  return (JSON.stringify(obj) || 'undefined').replace(/[\u2028\u2029]/g, (char) =>
    `\\u${`000${char.charCodeAt(0).toString(16)}`.slice(-4)}`)
}

function serializeArray (arr, indent, baseIndent) {
  let output = '['
  const separator = indent ? `\n${baseIndent}${indent}` : ''
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i]
    output += `${i > 0 ? ',' : ''}${separator}${serialize(key, indent, baseIndent + indent)}`
  }
  return `${output}${indent ? `\n${baseIndent}` : ''}]`
}

function serializeObject (obj, indent, baseIndent) {
  let output = '{'
  const separator = indent ? `\n${baseIndent}${indent}` : ''
  const entries = Object.entries(obj)
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    const stringKey = makeLegalIdentifier(key) === key ? key : stringify(key)
    output +=
      `${i > 0 ? ',' : ''}${separator}${stringKey}:${indent ? ' ' : ''}${serialize(value, indent, baseIndent + indent)}`
  }
  return `${output}${indent ? `\n${baseIndent}` : ''}}`
}

function serialize (obj, indent, baseIndent) {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return serializeArray(obj, indent, baseIndent)
    }
    if (obj instanceof Date) {
      return `new Date(${obj.getTime()})`
    }
    if (obj instanceof RegExp) {
      return obj.toString()
    }
    return serializeObject(obj, indent, baseIndent)
  }
  if (typeof obj === 'number') {
    if (obj === Infinity) {
      return 'Infinity'
    }
    if (obj === -Infinity) {
      return '-Infinity'
    }
    if (obj === 0) {
      return 1 / obj === Infinity ? '0' : '-0'
    }

    if (isNaN(obj)) {
      return 'NaN'
    }
  }
  if (typeof obj === 'symbol') {
    const key = Symbol.keyFor(obj)
    // eslint-disable-next-line no-undefined
    if (key !== undefined) {
      return `Symbol.for(${stringify(key)})`
    }
  }
  if (typeof obj === 'bigint') {
    return `${obj}n`
  }
  return stringify(obj)
}
// isWellFormed exists from Node.js 20
const hasStringIsWellFormed = 'isWellFormed' in String.prototype

function isWellFormedString (input) {
  // @ts-expect-error String::isWellFormed exists from ES2024. tsconfig lib is set to ES6
  if (hasStringIsWellFormed) {
    return input.isWellFormed()
  }
  // https://github.com/tc39/proposal-is-usv-string/blob/main/README.md#algorithm
  return !/\p{Surrogate}/u.test(input)
}

function dataToEsm (data, options = {}) {
  var _a, _b
  const t = options.compact ? '' : 'indent' in options ? options.indent : '\t'
  const _ = options.compact ? '' : ' '
  const n = options.compact ? '' : '\n'
  const declarationType = options.preferConst ? 'const' : 'var'
  if (options.namedExports === false ||
    typeof data !== 'object' ||
    Array.isArray(data) ||
    data instanceof Date ||
    data instanceof RegExp ||
    data === null) {
    const code = serialize(data, options.compact ? null : t, '')
    const magic = _ || (/^[{[\-\/]/.test(code) ? '' : ' ') // eslint-disable-line no-useless-escape
    return `export default${magic}${code};`
  }
  let maxUnderbarPrefixLength = 0
  for (const key of Object.keys(data)) {
    const underbarPrefixLength = (_b = (_a = key.match(/^(_+)/)) === null || _a === undefined ? undefined : _a[0]
      .length) !==
      null && _b !== undefined ? _b : 0
    if (underbarPrefixLength > maxUnderbarPrefixLength) {
      maxUnderbarPrefixLength = underbarPrefixLength
    }
  }
  const arbitraryNamePrefix = `${'_'.repeat(maxUnderbarPrefixLength + 1)}arbitrary`
  let namedExportCode = ''
  const defaultExportRows = []
  const arbitraryNameExportRows = []
  for (const [key, value] of Object.entries(data)) {
    if (key === makeLegalIdentifier(key)) {
      if (options.objectShorthand) {
        defaultExportRows.push(key)
      } else {
        defaultExportRows.push(`${key}:${_}${key}`)
      }
      namedExportCode +=
        `export ${declarationType} ${key}${_}=${_}${serialize(value, options.compact ? null : t, '')};${n}`
    } else {
      defaultExportRows.push(`${stringify(key)}:${_}${serialize(value, options.compact ? null : t, '')}`)
      if (options.includeArbitraryNames && isWellFormedString(key)) {
        const variableName = `${arbitraryNamePrefix}${arbitraryNameExportRows.length}`
        namedExportCode +=
          `${declarationType} ${variableName}${_}=${_}${serialize(value, options.compact ? null : t, '')};${n}`
        arbitraryNameExportRows.push(`${variableName} as ${JSON.stringify(key)}`)
      }
    }
  }
  const arbitraryExportCode = arbitraryNameExportRows.length > 0
    ? `export${_}{${n}${t}${arbitraryNameExportRows.join(`,${n}${t}`)}${n}};${n}`
    : ''
  const defaultExportCode = `export default${_}{${n}${t}${defaultExportRows.join(`,${n}${t}`)}${n}};${n}`
  return `${namedExportCode}${arbitraryExportCode}${defaultExportCode}`
};

module.exports = {
  dataToEsm
}
