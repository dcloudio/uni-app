import {
  capitalize,
  hasOwn,
  isArray,
  isObject,
  isPlainObject,
  isString,
  makeMap,
  toRawType,
} from '@vue/shared'

export const CHOOSE_SIZE_TYPES = ['original', 'compressed']
export const CHOOSE_SOURCE_TYPES = ['album', 'camera']

export const HTTP_METHODS = [
  'GET',
  'OPTIONS',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'TRACE',
  'CONNECT',
  'PATCH',
]

export function elemInArray<T = string>(str: T, arr: T[]) {
  if (!str || arr.indexOf(str) === -1) {
    return arr[0]
  }
  return str
}

export function elemsInArray(
  strArr: string[] | string | undefined,
  optionalVal: string[]
) {
  if (
    !isArray(strArr) ||
    strArr.length === 0 ||
    strArr.find((val) => optionalVal.indexOf(val) === -1)
  ) {
    return optionalVal
  }
  return strArr
}

function validateProtocolFail(name: string, msg: string) {
  console.warn(`${name}: ${msg}`)
}

function validateProtocol(
  name: string,
  data: Record<string, any>,
  protocol?: ApiProtocol<any>,
  onFail?: (name: string, msg: string) => void
) {
  if (!onFail) {
    onFail = validateProtocolFail
  }
  for (const key in protocol) {
    const errMsg = validateProp(
      key,
      data[key],
      protocol[key as keyof typeof protocol],
      !hasOwn(data, key)
    )
    if (isString(errMsg)) {
      onFail(name, errMsg)
    }
  }
}

export function validateProtocols(
  name: string,
  args: any[],
  protocol?: ApiProtocols<any>,
  onFail?: (name: string, msg: string) => void
) {
  if (!protocol) {
    return
  }
  if (!isArray(protocol)) {
    return validateProtocol(
      name,
      args[0] || Object.create(null),
      protocol,
      onFail
    )
  }
  const len = protocol.length
  const argsLen = args.length
  for (let i = 0; i < len; i++) {
    const opts = protocol[i]
    const data = Object.create(null)
    if (argsLen > i) {
      data[opts.name!] = args[i]
    }
    validateProtocol(name, data, { [opts.name!]: opts }, onFail)
  }
}

function validateProp(
  name: string,
  value: unknown,
  prop: ProtocolOptions | ProtocolType<any>,
  isAbsent: boolean
) {
  if (!isPlainObject(prop)) {
    prop = { type: prop }
  }
  const { type, required, validator } = prop as ProtocolOptions
  // required!
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"'
  }
  // missing but optional
  if (value == null && !required) {
    return
  }
  // type check
  if (type != null) {
    let isValid = false
    const types = isArray(type) ? type : [type]
    const expectedTypes: string[] = []
    // value is valid as long as one of the specified types match
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i])
      expectedTypes.push(expectedType || '')
      isValid = valid
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes)
    }
  }
  // custom validator
  if (validator) {
    return validator(value)
  }
}

const isSimpleType = /*#__PURE__*/ makeMap(
  'String,Number,Boolean,Function,Symbol'
)

type AssertionResult = {
  valid: boolean
  expectedType: string
}

function assertType(
  value: unknown,
  type: ProtocolConstructor
): AssertionResult {
  let valid
  const expectedType = getType(type)
  if (isSimpleType(expectedType)) {
    const t = typeof value
    valid = t === expectedType.toLowerCase()
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type
    }
  } else if (expectedType === 'Object') {
    valid = isObject(value)
  } else if (expectedType === 'Array') {
    valid = isArray(value)
  } else {
    if (__PLATFORM__ === 'app') {
      // App平台ArrayBuffer等参数跨实例传输，无法通过 instanceof 识别
      valid = value instanceof type || toRawType(value) === getType(type)
    } else {
      valid = value instanceof type
    }
  }
  return {
    valid,
    expectedType,
  }
}

function getInvalidTypeMessage(
  name: string,
  value: unknown,
  expectedTypes: string[]
): string {
  let message =
    `Invalid args: type check failed for args "${name}".` +
    ` Expected ${expectedTypes.map(capitalize).join(', ')}`
  const expectedType = expectedTypes[0]
  const receivedType = toRawType(value)
  const expectedValue = styleValue(value, expectedType)
  const receivedValue = styleValue(value, receivedType)
  // check if we need to specify expected value
  if (
    expectedTypes.length === 1 &&
    isExplicable(expectedType) &&
    !isBoolean(expectedType, receivedType)
  ) {
    message += ` with value ${expectedValue}`
  }
  message += `, got ${receivedType} `
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`
  }
  return message
}

function getType(ctor: ProtocolConstructor): string {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function styleValue(value: unknown, type: string): string {
  if (type === 'String') {
    return `"${value}"`
  } else if (type === 'Number') {
    return `${Number(value)}`
  } else {
    return `${value}`
  }
}

function isExplicable(type: string): boolean {
  const explicitTypes = ['string', 'number', 'boolean']
  return explicitTypes.some((elem) => type.toLowerCase() === elem)
}

function isBoolean(...args: string[]): boolean {
  return args.some((elem) => elem.toLowerCase() === 'boolean')
}
