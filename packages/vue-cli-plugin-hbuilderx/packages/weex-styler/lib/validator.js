var util = require('./util')

// http://www.w3.org/TR/css3-color/#html4
var BASIC_COLOR_KEYWORDS = {
  black: '#000000',
  silver: '#C0C0C0',
  gray: '#808080',
  white: '#FFFFFF',
  maroon: '#800000',
  red: '#FF0000',
  purple: '#800080',
  fuchsia: '#FF00FF',
  green: '#008000',
  lime: '#00FF00',
  olive: '#808000',
  yellow: '#FFFF00',
  navy: '#000080',
  blue: '#0000FF',
  teal: '#008080',
  aqua: '#00FFFF'
}

// http://www.w3.org/TR/css3-color/#svg-color
var EXTENDED_COLOR_KEYWORDS = {
  aliceblue: '#F0F8FF',
  antiquewhite: '#FAEBD7',
  aqua: '#00FFFF',
  aquamarine: '#7FFFD4',
  azure: '#F0FFFF',
  beige: '#F5F5DC',
  bisque: '#FFE4C4',
  black: '#000000',
  blanchedalmond: '#FFEBCD',
  blue: '#0000FF',
  blueviolet: '#8A2BE2',
  brown: '#A52A2A',
  burlywood: '#DEB887',
  cadetblue: '#5F9EA0',
  chartreuse: '#7FFF00',
  chocolate: '#D2691E',
  coral: '#FF7F50',
  cornflowerblue: '#6495ED',
  cornsilk: '#FFF8DC',
  crimson: '#DC143C',
  cyan: '#00FFFF',
  darkblue: '#00008B',
  darkcyan: '#008B8B',
  darkgoldenrod: '#B8860B',
  darkgray: '#A9A9A9',
  darkgreen: '#006400',
  darkgrey: '#A9A9A9',
  darkkhaki: '#BDB76B',
  darkmagenta: '#8B008B',
  darkolivegreen: '#556B2F',
  darkorange: '#FF8C00',
  darkorchid: '#9932CC',
  darkred: '#8B0000',
  darksalmon: '#E9967A',
  darkseagreen: '#8FBC8F',
  darkslateblue: '#483D8B',
  darkslategray: '#2F4F4F',
  darkslategrey: '#2F4F4F',
  darkturquoise: '#00CED1',
  darkviolet: '#9400D3',
  deeppink: '#FF1493',
  deepskyblue: '#00BFFF',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1E90FF',
  firebrick: '#B22222',
  floralwhite: '#FFFAF0',
  forestgreen: '#228B22',
  fuchsia: '#FF00FF',
  gainsboro: '#DCDCDC',
  ghostwhite: '#F8F8FF',
  gold: '#FFD700',
  goldenrod: '#DAA520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#ADFF2F',
  grey: '#808080',
  honeydew: '#F0FFF0',
  hotpink: '#FF69B4',
  indianred: '#CD5C5C',
  indigo: '#4B0082',
  ivory: '#FFFFF0',
  khaki: '#F0E68C',
  lavender: '#E6E6FA',
  lavenderblush: '#FFF0F5',
  lawngreen: '#7CFC00',
  lemonchiffon: '#FFFACD',
  lightblue: '#ADD8E6',
  lightcoral: '#F08080',
  lightcyan: '#E0FFFF',
  lightgoldenrodyellow: '#FAFAD2',
  lightgray: '#D3D3D3',
  lightgreen: '#90EE90',
  lightgrey: '#D3D3D3',
  lightpink: '#FFB6C1',
  lightsalmon: '#FFA07A',
  lightseagreen: '#20B2AA',
  lightskyblue: '#87CEFA',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#B0C4DE',
  lightyellow: '#FFFFE0',
  lime: '#00FF00',
  limegreen: '#32CD32',
  linen: '#FAF0E6',
  magenta: '#FF00FF',
  maroon: '#800000',
  mediumaquamarine: '#66CDAA',
  mediumblue: '#0000CD',
  mediumorchid: '#BA55D3',
  mediumpurple: '#9370DB',
  mediumseagreen: '#3CB371',
  mediumslateblue: '#7B68EE',
  mediumspringgreen: '#00FA9A',
  mediumturquoise: '#48D1CC',
  mediumvioletred: '#C71585',
  midnightblue: '#191970',
  mintcream: '#F5FFFA',
  mistyrose: '#FFE4E1',
  moccasin: '#FFE4B5',
  navajowhite: '#FFDEAD',
  navy: '#000080',
  oldlace: '#FDF5E6',
  olive: '#808000',
  olivedrab: '#6B8E23',
  orange: '#FFA500',
  orangered: '#FF4500',
  orchid: '#DA70D6',
  palegoldenrod: '#EEE8AA',
  palegreen: '#98FB98',
  paleturquoise: '#AFEEEE',
  palevioletred: '#DB7093',
  papayawhip: '#FFEFD5',
  peachpuff: '#FFDAB9',
  peru: '#CD853F',
  pink: '#FFC0CB',
  plum: '#DDA0DD',
  powderblue: '#B0E0E6',
  purple: '#800080',
  red: '#FF0000',
  rosybrown: '#BC8F8F',
  royalblue: '#4169E1',
  saddlebrown: '#8B4513',
  salmon: '#FA8072',
  sandybrown: '#F4A460',
  seagreen: '#2E8B57',
  seashell: '#FFF5EE',
  sienna: '#A0522D',
  silver: '#C0C0C0',
  skyblue: '#87CEEB',
  slateblue: '#6A5ACD',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#FFFAFA',
  springgreen: '#00FF7F',
  steelblue: '#4682B4',
  tan: '#D2B48C',
  teal: '#008080',
  thistle: '#D8BFD8',
  tomato: '#FF6347',
  turquoise: '#40E0D0',
  violet: '#EE82EE',
  wheat: '#F5DEB3',
  white: '#FFFFFF',
  whitesmoke: '#F5F5F5',
  yellow: '#FFFF00',
  yellowgreen: '#9ACD32'
}

var LENGTH_REGEXP = /^[-+]?\d*\.?\d+(\S*)$/
var SUPPORT_CSS_UNIT = ['px', 'pt', 'wx']

if(process.env.UNI_USING_NVUE_COMPILER){
  SUPPORT_CSS_UNIT.push('upx')
  SUPPORT_CSS_UNIT.push('rpx')
}

var ANYTHING_VALIDATOR = function ANYTHING_VALIDATOR(v) {
  return { value: v }
}

/**
 * the values below is valid
 * - number
 * - number + 'px'
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: number|null
 * - reason(k, v, result)
 */
var LENGTH_VALIDATOR = function LENGTH_VALIDATOR(v) {
  v = (v || '').toString()
  var match = v.match(LENGTH_REGEXP)

  if (match) {
    var unit = match[1]
    if (!unit) {
      return {value: parseFloat(v)}
    }
    else if (SUPPORT_CSS_UNIT.indexOf(unit) > -1) {
      return {value: v}
    }
    else {
      return {
        value: parseFloat(v),
        reason: function reason(k, v, result) {
          return 'NOTE: unit `' + unit + '` is not supported and property value `' + v + '` is autofixed to `' + result + '`'
        }
      }
    }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (only number and pixel values are supported)'
    }
  }
}

/**
 * the values below is valid
 * - number {1,4}
 * - number + 'px' {1,4}
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: number|null
 * - reason(k, v, result)
 */
var SHORTHAND_LENGTH_VALIDATOR = function SHORTHAND_LENGTH_VALIDATOR(v) {
  v = (v || '').toString()
  var value = []
  var reason = []
  var results = v.split(/\s+/).map(LENGTH_VALIDATOR)
  for (var i = 0; i < results.length; ++i) {
    var res = results[i]
    if (!res.value) {
      value = null
      reason = res.reason
      break
    }
    value.push(res.value)
    reason.push(res.reason)
  }

  if (!value) {
    return {
      value: value,
      reason: reason
    }
  } else {
    return {
      value: value.join(' '),
      reason: function (k, v, result) {
        return reason.map(function (res) {
          if (typeof res === 'function') {
            return res(k, v, result)
          }
        }).join('\n')
      }
    }
  }
}

/**
 * the values below is valid
 * - hex color value (#xxxxxx or #xxx)
 * - basic and extended color keywords in CSS spec
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: string|null
 * - reason(k, v, result)
 */
var COLOR_VALIDATOR = function COLOR_VALIDATOR(v) {
  v = (v || '').toString()

  if (v.match(/^#[0-9a-fA-F]{6}$/)) {
    return {value: v}
  }

  if (v.match(/^#[0-9a-fA-F]{3}$/)) {
    return {
      value: '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3],
      reason: function reason(k, v, result) {
        return 'NOTE: property value `' + v + '` is autofixed to `' + result + '`'
      }
    }
  }

  if (EXTENDED_COLOR_KEYWORDS[v]) {
    return {
      value: EXTENDED_COLOR_KEYWORDS[v],
      reason: function reason(k, v, result) {
        return 'NOTE: property value `' + v + '` is autofixed to `' + result + '`'
      }
    }
  }

  var arrColor, r, g, b, a
  var RGB_REGEXP = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/gi
  var RGBA_REGEXP = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/gi
  if (arrColor = RGB_REGEXP.exec(v)) {
    r = parseInt(arrColor[1])
    g = parseInt(arrColor[2])
    b = parseInt(arrColor[3])
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return {value: 'rgb(' + [r, g, b].join(',') + ')'}
    }
  }
  if (arrColor = RGBA_REGEXP.exec(v)) {
    r = parseInt(arrColor[1])
    g = parseInt(arrColor[2])
    b = parseInt(arrColor[3])
    a = parseFloat(arrColor[4])
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
      return {value: 'rgba(' + [r, g, b, a].join(',') + ')'}
    }
  }
  if (v === 'transparent') {
    return {value: 'rgba(0,0,0,0)'}
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not valid for `' + util.camelCaseToHyphened(k) + '`'
    }
  }
}

/**
 * only integer or float value is valid
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: number|null
 * - reason(k, v, result)
 */
var NUMBER_VALIDATOR = function NUMBER_VALIDATOR(v) {
  v = (v || '').toString()
  var match = v.match(LENGTH_REGEXP)

  if (match && !match[1]) {
    return {value: parseFloat(v)}
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (only number is supported)'
    }
  }
}

/**
 * only integer value is valid
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: number|null
 * - reason(k, v, result)
 */
var INTEGER_VALIDATOR = function INTEGER_VALIDATOR(v) {
  v = (v || '').toString()

  if (v.match(/^[-+]?\d+$/)) {
    return {value: parseInt(v, 10)}
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (only integer is supported)'
    }
  }
}

/**
 * transition-property: only css property is valid
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: string|null
 * - reason(k, v, result)
 */
var TRANSITION_PROPERTY_VALIDATOR = function TRANSITION_PROPERTY_VALIDATOR(v) {
  v = (v || '').toString()
  v = v.split(/\s*,\s*/).map(util.hyphenedToCamelCase).join(',')

  if (v.split(/\s*,\s*/).every(p => !!validatorMap[p])) {
    return {value: v}
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (only css property is valid)'
    }
  }
}

/**
 * transition-duration & transition-delay: only number of seconds or milliseconds is valid
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: number|null
 * - reason(k, v, result)
 */
var TRANSITION_INTERVAL_VALIDATOR = function TRANSITION_INTERVAL_VALIDATOR(v) {
  v = (v || 0).toString()
  var match, num, ret

  if (match = v.match(/^\d*\.?\d+(ms|s)?$/)) {
    num = parseFloat(match[0])
    if (!match[1]) {
      ret = {value: parseInt(num)}
    }
    else {
      if (match[1] === 's') {
        num *= 1000
      }
      ret = {
        value: parseInt(num),
        reason: function reason(k, v, result) {
          return 'NOTE: property value `' + v + '` is autofixed to `' + result + '`'
        }
      }
    }
    return ret
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (only number of seconds and milliseconds is valid)'
    }
  }
}

/**
 * transition-timing-function: only linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n) is valid
 *
 * @param {string} v
 * @return {function} a function to return
 * - value: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)|null
 * - reason(k, v, result)
 */
var TRANSITION_TIMING_FUNCTION_VALIDATOR = function TRANSITION_TIMING_FUNCTION_VALIDATOR(v) {
  v = (v || '').toString()

  if (v.match(/^linear|ease|ease-in|ease-out|ease-in-out$/)) {
    return {value: v}
  }

  var match, ret
  var NUM_REGEXP = /^[-]?\d*\.?\d+$/
  if (match = v.match(/^cubic-bezier\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)$/)) {
    /* istanbul ignore else */
    if (match[1].match(NUM_REGEXP) && match[2].match(NUM_REGEXP) && match[3].match(NUM_REGEXP) && match[4].match(NUM_REGEXP)) {
      ret = [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])].join(',')
      return {value: 'cubic-bezier(' + ret + ')'}
    }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (supported values are: `linear`|`ease`|`ease-in`|`ease-out`|`ease-in-out`|`cubic-bezier(n,n,n,n)`)'
    }
  }
}

var TRANSFORM_VALIDATOR = function TRANSFORM_VALIDATOR (v) {
  // TODO
  return { value: v }
}

/**
 * generate a function to check whether a value is in `list`
 * - first value: default, could be removed
 * - not in `list`: error
 *
 * @param  {Array} list
 * @return {function} a function(v) which returns a function to return
 * - value: string|null
 * - reason(k, v, result)
 */
function genEnumValidator(list) {
  return function ENUM_VALIDATOR(v) {
    var index = list.indexOf(v)
    if (index > 0) {
      return {value: v}
    }
    if (index === 0) {
      return {
        value: v,
        reason: function reason(k, v, result) {
          return 'NOTE: property value `' + v + '` is the DEFAULT value for `' + util.camelCaseToHyphened(k) + '` (could be removed)'
        }
      }
    }
    else {
      return {
        value: null,
        reason: function reason(k, v, result) {
          return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (supported values are: `' + list.join('`|`') + '`)'
        }
      }
    }
  }
}

function FLEW_WRAP_VALIDATOR (v) {
  var list = ['nowrap', 'wrap', 'wrap-reverse']
  var index = list.indexOf(v)
  if (index > 0) {
    return {
      value: v,
      reason: function reason(k, v, result) {
        return 'NOTE: the ' + util.camelCaseToHyphened(k) + ' property may have compatibility problem on native'
      }
    }
  }
  if (index === 0) {
    return {
      value: v,
      reason: function reason(k, v, result) {
        return 'NOTE: property value `' + v + '` is the DEFAULT value for `' + util.camelCaseToHyphened(k) + '` (could be removed)'
      }
    }
  }
  else {
    return {
      value: null,
      reason: function reason(k, v, result) {
        return 'ERROR: property value `' + v + '` is not supported for `' + util.camelCaseToHyphened(k) + '` (supported values are: `' + list.join('`|`') + '`)'
      }
    }
  }
}

var PROP_NAME_GROUPS = {
  boxModel: {
    display: genEnumValidator(['flex']),
    width: LENGTH_VALIDATOR,
    height: LENGTH_VALIDATOR,
    overflow: genEnumValidator(['hidden']),
    padding: SHORTHAND_LENGTH_VALIDATOR,
    paddingLeft: LENGTH_VALIDATOR,
    paddingRight: LENGTH_VALIDATOR,
    paddingTop: LENGTH_VALIDATOR,
    paddingBottom: LENGTH_VALIDATOR,
    margin: SHORTHAND_LENGTH_VALIDATOR,
    marginLeft: LENGTH_VALIDATOR,
    marginRight: LENGTH_VALIDATOR,
    marginTop: LENGTH_VALIDATOR,
    marginBottom: LENGTH_VALIDATOR,
    borderWidth: LENGTH_VALIDATOR,
    borderLeftWidth: LENGTH_VALIDATOR,
    borderTopWidth: LENGTH_VALIDATOR,
    borderRightWidth: LENGTH_VALIDATOR,
    borderBottomWidth: LENGTH_VALIDATOR,
    borderColor: COLOR_VALIDATOR,
    borderLeftColor: COLOR_VALIDATOR,
    borderTopColor: COLOR_VALIDATOR,
    borderRightColor: COLOR_VALIDATOR,
    borderBottomColor: COLOR_VALIDATOR,
    borderStyle: genEnumValidator(['dotted', 'dashed', 'solid']),
    borderTopStyle: genEnumValidator(['dotted', 'dashed', 'solid']),
    borderRightStyle: genEnumValidator(['dotted', 'dashed', 'solid']),
    borderBottomStyle: genEnumValidator(['dotted', 'dashed', 'solid']),
    borderLeftStyle: genEnumValidator(['dotted', 'dashed', 'solid']),
    borderRadius: LENGTH_VALIDATOR,
    borderBottomLeftRadius: LENGTH_VALIDATOR,
    borderBottomRightRadius: LENGTH_VALIDATOR,
    borderTopLeftRadius: LENGTH_VALIDATOR,
    borderTopRightRadius: LENGTH_VALIDATOR
  },
  flexbox: {
    flex: NUMBER_VALIDATOR,
    flexWrap: FLEW_WRAP_VALIDATOR,
    flexDirection: genEnumValidator(['column', 'row', 'column-reverse', 'row-reverse']),
    justifyContent: genEnumValidator(['flex-start', 'flex-end', 'center', 'space-between','space-around']),
    alignItems: genEnumValidator(['stretch', 'flex-start', 'flex-end', 'center'])
  },
  position: {
    position: genEnumValidator(['relative', 'absolute', 'sticky', 'fixed']),
    top: LENGTH_VALIDATOR,
    bottom: LENGTH_VALIDATOR,
    left: LENGTH_VALIDATOR,
    right: LENGTH_VALIDATOR,
    zIndex: INTEGER_VALIDATOR
  },
  common: {
    opacity: NUMBER_VALIDATOR,
    boxShadow: ANYTHING_VALIDATOR,
    backgroundColor: COLOR_VALIDATOR,
    backgroundImage: ANYTHING_VALIDATOR
  },
  text: {
    lines: INTEGER_VALIDATOR,
    color: COLOR_VALIDATOR,
    fontSize: LENGTH_VALIDATOR,
    fontStyle: genEnumValidator(['normal', 'italic']),
    fontFamily: ANYTHING_VALIDATOR,
    fontWeight: genEnumValidator(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']),
    textDecoration: genEnumValidator(['none', 'underline', 'line-through']),
    textAlign: genEnumValidator(['left', 'center', 'right']),
    textOverflow: genEnumValidator(['clip', 'ellipsis', 'unset', 'fade']),
    lineHeight: LENGTH_VALIDATOR
  },
  transition: {
    transitionProperty: TRANSITION_PROPERTY_VALIDATOR,
    transitionDuration: TRANSITION_INTERVAL_VALIDATOR,
    transitionDelay: TRANSITION_INTERVAL_VALIDATOR,
    transitionTimingFunction: TRANSITION_TIMING_FUNCTION_VALIDATOR
  },
  transform: {
    transform: TRANSFORM_VALIDATOR,
    transformOrigin: TRANSFORM_VALIDATOR,// fixed by xxxxxx
  },
  customized: {
    itemSize: LENGTH_VALIDATOR,
    itemColor: COLOR_VALIDATOR,
    itemSelectedColor: COLOR_VALIDATOR,
    textColor: COLOR_VALIDATOR,
    timeColor: COLOR_VALIDATOR,
    textHighlightColor: COLOR_VALIDATOR
  }
}

var SUGGESTED_PROP_NAME_GROUP = {
  background: 'backgroundColor'
}

var validatorMap = {}

/**
 * flatten `PROP_NAME_GROUPS` to `validatorMap`
 */
function genValidatorMap() {
  var groupName, group, name
  for (groupName in PROP_NAME_GROUPS) {
    group = PROP_NAME_GROUPS[groupName]
    for (name in group) {
      validatorMap[name] = group[name]
    }
  }
}

genValidatorMap()

/**
 * validate a CSS name/value pair
 *
 * @param  {string} name   camel cased
 * @param  {string} value
 * @return {object}
 * - value:string or null
 * - log:{reason:string} or undefined
 */
function validate(name, value) {
  var result, log
  var validator = validatorMap[name]

  if (typeof validator === 'function') {
    if (typeof value !== 'function') {
      result = validator(value)
    }
    /* istanbul ignore else */
    else {
      result = {value: value}
    }
    if (result.reason) {
      log = {reason: result.reason(name, value, result.value)}
    }
  }
  else {
    // ensure number type, no `px`
    /* istanbul ignore else */
    if (typeof value !== 'function') {
      var match = value.match(LENGTH_REGEXP)
      if (match && (!match[1] || SUPPORT_CSS_UNIT.indexOf(match[1]) === -1)) {
        value = parseFloat(value)
      }
    }
    result = {value: value}
    var suggestedName = SUGGESTED_PROP_NAME_GROUP[name]
    var suggested = suggestedName ? ', suggest `' + util.camelCaseToHyphened(suggestedName) + '`' : ''
    log = {reason: 'WARNING: `' + util.camelCaseToHyphened(name) + '` is not a standard property name (may not be supported)' + suggested}
  }
  return {
    value: result.value,
    log: log
  }
}

module.exports = {
  BASIC_COLOR_KEYWORDS: BASIC_COLOR_KEYWORDS,
  EXTENDED_COLOR_KEYWORDS: EXTENDED_COLOR_KEYWORDS,

  LENGTH_VALIDATOR: LENGTH_VALIDATOR,
  COLOR_VALIDATOR: COLOR_VALIDATOR,
  NUMBER_VALIDATOR: NUMBER_VALIDATOR,
  INTEGER_VALIDATOR: INTEGER_VALIDATOR,
  genEnumValidator: genEnumValidator,

  TRANSITION_PROPERTY_VALIDATOR: TRANSITION_PROPERTY_VALIDATOR,
  TRANSITION_DURATION_VALIDATOR: TRANSITION_INTERVAL_VALIDATOR,
  TRANSITION_DELAY_VALIDATOR: TRANSITION_INTERVAL_VALIDATOR,
  TRANSITION_TIMING_FUNCTION_VALIDATOR: TRANSITION_TIMING_FUNCTION_VALIDATOR,

  PROP_NAME_GROUPS: PROP_NAME_GROUPS,

  map: validatorMap,
  validate: validate
}
