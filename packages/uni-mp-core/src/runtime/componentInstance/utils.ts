import { ComponentPublicInstance } from 'vue'
import { extend, isObject, hyphenate } from '@vue/shared'
import { cache, getDataByPath } from '@dcloudio/uni-shared'

export function getValue(
  this: ComponentPublicInstance,
  dataPath: string,
  target: Record<string, any>
) {
  return getDataByPath(target || this, dataPath)
}

export function getClass(dynamicClass: unknown, staticClass: string) {
  return renderClass(staticClass, dynamicClass)
}

export function getStyle(dynamicStyle: unknown, staticStyle: string) {
  if (!dynamicStyle && !staticStyle) {
    return ''
  }
  var dynamicStyleObj = normalizeStyleBinding(dynamicStyle)
  var styleObj = staticStyle
    ? extend(staticStyle, dynamicStyleObj)
    : dynamicStyleObj
  return Object.keys(styleObj as any)
    .map(function (name) {
      return hyphenate(name) + ':' + (styleObj as any)[name]
    })
    .join(';')
}
function toObject(arr: unknown[]) {
  var res = {}
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

function normalizeStyleBinding(bindingStyle: unknown) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

var parseStyleText = cache(function parseStyleText(cssText) {
  var res = {}
  var listDelimiter = /;(?![^(]*\))/g
  var propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter)
      tmp.length > 1 && ((res as any)[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
})

function isDef(v: unknown) {
  return v !== undefined && v !== null
}

function renderClass(staticClass: string, dynamicClass: unknown) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat(a?: string, b?: string) {
  return a ? (b ? a + ' ' + b : a) : b || ''
}

function stringifyClass(value: unknown) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray(value: unknown[]) {
  var res = ''
  var stringified
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
      if (res) {
        res += ' '
      }
      res += stringified
    }
  }
  return res
}

function stringifyObject(value: Record<string, any>) {
  var res = ''
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' '
      }
      res += key
    }
  }
  return res
}
