import { UTSJSONObject, UTSValueIterable } from '../global/index'
import {
  IDENTIFIER,
  UTS_CLASS_METADATA_KIND,
  UTS_CLASS_METADATA_KIND_LIST,
} from '../utils/index'
import { UTSError } from './Error'

type UTSTypeFieldType = {
  type: Function
  optional: boolean
  jsonField?: string
}

interface UTSMetadata {
  name: string
  kind: UTS_CLASS_METADATA_KIND
  interfaces?: Function[] | undefined // type不含此项
  fields?: Record<string, UTSTypeFieldType> // class与interface不含此项
}

type UTSTypeMetadata = Required<UTSMetadata>

function isUTSMetadata(metadata: any): metadata is UTSMetadata {
  return !!(
    metadata &&
    UTS_CLASS_METADATA_KIND_LIST.includes(metadata.kind) &&
    metadata.interfaces
  )
}

function isNativeType(proto: Function) {
  return !proto || proto === Object.prototype
}

const utsMetadataKey = IDENTIFIER.UTS_METADATA

/**
 * 处理复杂的继承关系。
 * 例如：
 * class A extends abstract class B，abstract class B implements interface C
 * new A() instanceof C -> true
 */

function getParentTypeList(type: Function) {
  const metadata = utsMetadataKey in type ? type[utsMetadataKey] : {}
  let interfaces: Function[] = []
  if (!isUTSMetadata(metadata)) {
    interfaces = []
  } else {
    interfaces = metadata.interfaces || []
  }
  const proto = Object.getPrototypeOf(type)
  if (!isNativeType(proto)) {
    interfaces.push(proto.constructor)
  }
  return interfaces
}

function isImplementationOf(
  leftType: Function,
  rightType: Function,
  visited: Function[] = []
): boolean {
  if (isNativeType(leftType)) {
    return false
  }
  if (leftType === rightType) {
    return true
  }
  visited.push(leftType)
  const parentTypeList = getParentTypeList(leftType)
  return parentTypeList.some((parentType) => {
    if (visited.includes(parentType)) {
      return false
    }
    return isImplementationOf(parentType, rightType, visited)
  })
}

export function isInstanceOf(value: any, type: Function) {
  if (type === UTSValueIterable) {
    return value && value[Symbol.iterator]
  }
  const isNativeInstanceofType = value instanceof type
  if (isNativeInstanceofType || typeof value !== 'object' || value === null) {
    return isNativeInstanceofType
  }
  const proto = Object.getPrototypeOf(value).constructor
  return isImplementationOf(proto, type)
}

function isBaseType(type: any) {
  return type === Number || type === String || type === Boolean
}

function isUnknownType(type: any) {
  return type === 'Unknown'
}

function isAnyType(type: any) {
  return type === 'Any'
}

export function isUTSType(type: any): type is typeof UTSType {
  return type && type.prototype && type.prototype instanceof UTSType
}

export interface Constructible {
  new (...args: any[]): any
}

function normalizeGenericValue(
  value: any,
  genericType: any,
  isJSONParse: boolean = false
) {
  return value == null
    ? null
    : isBaseType(genericType) ||
      isUnknownType(genericType) ||
      isAnyType(genericType)
    ? value
    : genericType === Array
    ? new Array(...value)
    : new genericType(value, undefined, isJSONParse)
}

export class UTSType {
  [key: string]: any
  static get$UTSMetadata$(...args: any[]): UTSTypeMetadata {
    return {
      name: '',
      kind: UTS_CLASS_METADATA_KIND.TYPE,
      interfaces: [],
      fields: {},
    }
  }
  protected get $UTSMetadata$() {
    return UTSType.get$UTSMetadata$()
  }

  // TODO 缓存withGenerics结果
  static withGenerics(
    parent: Constructible,
    generics: Array<any>,
    isJSONParse: boolean = false
  ): Constructible {
    // 仅JSON.parse uni.request内报错，其他地方不报错
    // generic类型为UTSType子类或Array或基础类型，否则报错
    if (isJSONParse) {
      const illegalGeneric = generics.find(
        (item) =>
          !(
            item === Array ||
            isBaseType(item) ||
            isUnknownType(item) ||
            isAnyType(item) ||
            item === UTSJSONObject ||
            (item.prototype && item.prototype instanceof UTSType)
          )
      )
      if (illegalGeneric) {
        throw new Error(
          'Generic is not UTSType or Array or UTSJSONObject or base type, generic: ' +
            illegalGeneric
        )
      }
    }
    if (parent === Array) {
      // 不带泛型的Array有一部分不会进入这里，需要在构造type时处理
      return class UTSArray extends UTSType {
        constructor(options: any[], isJSONParse: boolean = false) {
          if (!Array.isArray(options)) {
            throw new UTSError(
              `Failed to contruct type, ${options} is not an array`
            )
          }
          super()
          // @ts-expect-error
          return options.map((item) => {
            return normalizeGenericValue(item, generics[0], isJSONParse)
          })
        }
      }
    } else if (parent === Map || parent === WeakMap) {
      return class UTSMap extends UTSType {
        constructor(options: any, isJSONParse: boolean = false) {
          if (options == null || typeof options !== 'object') {
            throw new UTSError(
              `Failed to contruct type, ${options} is not an object`
            )
          }
          super()
          const obj = new parent()
          for (const key in options) {
            obj.set(
              normalizeGenericValue(key, generics[0], isJSONParse),
              normalizeGenericValue(options[key], generics[1], isJSONParse)
            )
          }
          return obj
        }
      }
    } else if (isUTSType(parent)) {
      return class VirtualClassWithGenerics extends parent {
        static get$UTSMetadata$() {
          return parent.get$UTSMetadata$(...generics)
        }
        constructor(
          options: any,
          metadata: any = VirtualClassWithGenerics.get$UTSMetadata$(),
          isJSONParse: boolean = false
        ) {
          // @ts-expect-error
          super(options, metadata, isJSONParse)
        }
      }
    } else {
      return parent
    }
  }
  constructor() {}
  static initProps(
    options: Record<string, any>,
    metadata: UTSTypeMetadata,
    isJSONParse: boolean = false
  ) {
    const obj: Record<string, any> = {}
    if (!metadata.fields) {
      return obj
    }
    for (const key in metadata.fields) {
      const { type, optional, jsonField } = metadata.fields[key]
      const realKey = isJSONParse ? jsonField || key : key
      if (options[realKey] == null) {
        if (optional) {
          obj[key] = null
          continue
        } else {
          throw new UTSError(
            `Failed to contruct type, missing required property: ${key}`
          )
        }
      }
      if (isUTSType(type)) {
        // 带有泛型的数组会走此分支
        obj[key] = isJSONParse
          ? // @ts-expect-error
            new type(options[realKey], undefined, isJSONParse)
          : options[realKey]
      } else if (type === Array) {
        // 不带泛型的数组会走此分支
        if (!Array.isArray(options[realKey])) {
          throw new UTSError(
            `Failed to contruct type, property ${key} is not an array`
          )
        }
        obj[key] = options[realKey]
      } else {
        obj[key] = options[realKey]
      }
    }
    return obj
  }
}
