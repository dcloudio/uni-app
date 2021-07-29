/**
 * rules:
 * - abc-def -> abcDef
 * - -abc-def -> AbcDef
 *
 * @param  {string} value
 * @return {string}
 */
exports.hyphenedToCamelCase = function hyphenedToCamelCase(value) {
  return value.replace(/-([a-z])/g, function(s, m) {
    return m.toUpperCase()
  })
}

/**
 * rules:
 * - abcDef -> abc-def
 * - AbcDef -> -abc-def
 *
 * @param  {string} value
 * @return {string}
 */
exports.camelCaseToHyphened = function camelCaseToHyphened(value) {
  return value.replace(/([A-Z])/g, function(s, m) {
    if (typeof m === 'string') {
      return '-' + m.toLowerCase()
    }
    return m
  })
}
