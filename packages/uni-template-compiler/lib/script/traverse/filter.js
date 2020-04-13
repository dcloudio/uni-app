const t = require('@babel/types')

const {
  VAR_FILTER
} = require('../../constants')

const GLOBAL_METHODS = [
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent'
]

const GLOBAL_OBJECTS = {
  Math: [
    'abs',
    'acos',
    'asin',
    'atan',
    'atan2',
    'ceil',
    'cos',
    'exp',
    'floor',
    'log',
    'max',
    'min',
    'pow',
    'random',
    'round',
    'sin',
    'sqrt',
    'tan'
  ],
  JSON: [
    'stringify',
    'parse'
  ]
}

const BUILT_IN_METHODS = [
  // number
  'toString',
  'toLocaleString',
  'valueOf',
  'toFixed',
  'toExponential',
  'toPrecision',
  // string
  // 'toString',
  // 'valueOf',
  'charAt',
  'charCodeAt',
  'concat',
  'indexOf',
  'lastIndexOf',
  'localeCompare',
  'match',
  'replace',
  'search',
  'slice',
  'split',
  'substring',
  'toLowerCase',
  'toLocaleLowerCase',
  'toUpperCase',
  'toLocaleUpperCase',
  'trim',
  // boolean
  // 'toString',
  // 'valueOf',
  // object
  // 'toString',
  // function
  // 'toString',
  // array
  // 'toString',
  // 'concat',
  'join',
  'pop',
  'push',
  'reverse',
  'shift',
  // 'slice',
  'sort',
  'splice',
  'unshift',
  // 'indexOf',
  // 'lastIndexOf',
  'every',
  'some',
  'forEach',
  'map',
  'filter',
  'reduce',
  'reduceRight'
]

function getGlobalMethodFilter (callExpr) {
  const callee = callExpr.callee
  if (callee) {
    const name = callee.name
    if (name && GLOBAL_METHODS.includes(name)) {
      return t.callExpression(
        t.memberExpression(
          t.identifier(VAR_FILTER),
          t.identifier(name)
        ),
        callExpr.arguments
      )
    }
  }
  return false
}

function getGlobalObjectFilter (callExpr) {
  const callee = callExpr.callee
  if (t.isMemberExpression(callee)) {
    const object = callee.object
    const property = callee.property
    const propertyName = property.name || property.value
    const methods = GLOBAL_OBJECTS[object.name]
    if (methods && methods.includes(propertyName)) {
      return t.callExpression(
        t.memberExpression(
          t.identifier(VAR_FILTER),
          t.identifier(propertyName)
        ),
        callExpr.arguments
      )
    }
  }
  return false
}

function getMemberFilter (callExpr) {
  const callee = callExpr.callee
  if (t.isMemberExpression(callee)) {
    const property = callee.property
    const propertyName = property.name || property.value
    if (BUILT_IN_METHODS.includes(propertyName)) {
      return t.callExpression(
        t.memberExpression(
          t.identifier(VAR_FILTER),
          t.identifier(propertyName)
        ),
        [
          callee.object,
          ...callExpr.arguments
        ]
      )
    }
  }
}

function processFilter (callExpr, path) {
  const globalMethodFilter = getGlobalMethodFilter(callExpr)
  if (globalMethodFilter) {
    path.replaceWith(globalMethodFilter)
    return true
  }
  const globalObjectFilter = getGlobalObjectFilter(callExpr)
  if (globalObjectFilter) {
    path.replaceWith(globalObjectFilter)
    return true
  }
  const memberFilter = getMemberFilter(callExpr)
  if (memberFilter) {
    path.replaceWith(memberFilter)
    return true
  }
  return false
}

module.exports = processFilter
