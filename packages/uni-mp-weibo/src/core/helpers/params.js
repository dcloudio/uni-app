import {
  isFn,
  hasOwn,
  toRawType,
  isPlainObject
} from 'uni-shared'

export default function validateParam (key, paramTypes, paramsData) {
  const paramOptions = paramTypes[key]
  const absent = !hasOwn(paramsData, key)
  let value = paramsData[key]

  const booleanIndex = getTypeIndex(Boolean, paramOptions.type)
  if (booleanIndex > -1) {
    if (absent && !hasOwn(paramOptions, 'default')) {
      value = false
    }
  }
  if (value === undefined) {
    if (hasOwn(paramOptions, 'default')) {
      const paramDefault = paramOptions.default
      value = isFn(paramDefault) ? paramDefault() : paramDefault
      paramsData[key] = value // 默认值
    }
  }

  return assertParam(paramOptions, key, value, absent, paramsData)
}

function assertParam (
  paramOptions,
  name,
  value,
  absent,
  paramsData
) {
  if (paramOptions.required && absent) {
    return `Missing required parameter \`${name}\``
  }

  if (value == null && !paramOptions.required) {
    const validator = paramOptions.validator
    if (validator) {
      return validator(value, paramsData)
    }
    return
  }
  let type = paramOptions.type
  let valid = !type || type === true
  const expectedTypes = []
  if (type) {
    if (!Array.isArray(type)) {
      type = [type]
    }
    for (let i = 0; i < type.length && !valid; i++) {
      const assertedType = assertType(value, type[i])
      expectedTypes.push(assertedType.expectedType || '')
      valid = assertedType.valid
    }
  }

  if (!valid) {
    return getInvalidTypeMessage(name, value, expectedTypes)
  }

  const validator = paramOptions.validator
  if (validator) {
    return validator(value, paramsData)
  }
}

const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/

function assertType (value, type) {
  let valid
  const expectedType = getType(type)
  if (simpleCheckRE.test(expectedType)) {
    const t = typeof value
    valid = t === expectedType.toLowerCase()
    if (!valid && t === 'object') {
      valid = value instanceof type
    }
  } else if (value.byteLength >= 0) {
    valid = true
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value)
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value)
  } else {
    // TODO 页面传入的ArrayBuffer使用instanceof ArrayBuffer返回false，暂做此修改
    valid = value instanceof type || toRawType(value) === getType(type)
  }
  return {
    valid,
    expectedType
  }
}

function getType (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (let i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  let message = `parameter \`${name}\`.` +
		` Expected ${expectedTypes.join(', ')}`
  const expectedType = expectedTypes[0]
  const receivedType = toRawType(value)
  const expectedValue = styleValue(value, expectedType)
  const receivedValue = styleValue(value, receivedType)
  if (expectedTypes.length === 1 &&
		isExplicable(expectedType) &&
		!isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`
  }
  message += `, got ${receivedType} `
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return `"${value}"`
  } else if (type === 'Number') {
    return `${Number(value)}`
  } else {
    return `${value}`
  }
}

const explicitTypes = ['string', 'number', 'boolean']

function isExplicable (value) {
  return explicitTypes.some(elem => value.toLowerCase() === elem)
}

function isBoolean (...args) {
  return args.some(elem => elem.toLowerCase() === 'boolean')
}
