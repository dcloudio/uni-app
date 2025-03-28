import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import type { MessageType } from './utils'

interface NormalizeResult {
  name?: string
  type: string
  subType?: string
  className?: string
  description?: string
  value?: any
}

interface ObjectResultValue {
  properties: Array<NormalizeResult>
}
interface ObjectResult extends NormalizeResult {
  value: ObjectResultValue
}
interface ArrayResultValue {
  properties: Array<NormalizeResult>
}
interface ArrayResult extends NormalizeResult {
  value: ArrayResultValue
}
interface SetResultEntry {
  value: NormalizeResult
}
interface SetResultValue {
  entries: Array<SetResultEntry>
}
interface SetResult extends NormalizeResult {
  value: SetResultValue
}
interface MapResultEntry {
  key: NormalizeResult
  value: NormalizeResult
}
interface MapResultValue {
  entries: Array<MapResultEntry>
}
interface MapResult extends NormalizeResult {
  value: MapResultValue
}

export interface Message {
  type: MessageType
  args: Array<any>
}

export function formatMessage(
  type: MessageType,
  args: Array<any | null>
): Message {
  try {
    return {
      type,
      args: formatArgs(args),
    }
  } catch (e) {
    // originalConsole.error(e)
  }
  return {
    type,
    args: [],
  }
}

export function formatArgs(args: Array<any | null>) {
  return args.map((arg) => formatArg(arg))
}

export function formatArg(arg: any | null, depth: number = 0): NormalizeResult {
  if (depth >= 7) {
    return {
      type: 'object',
      value: '[Maximum depth reached]',
    }
  }
  const type = typeof arg
  switch (type) {
    case 'string':
      return formatString(arg as string)
    case 'number':
      return formatNumber(arg as number)
    case 'boolean':
      return formatBoolean(arg as boolean)
    case 'object':
      try {
        // 鸿蒙里边 object 可能包含 nativePtr 指针，该指针 typeof 是 object
        // 但是又不能访问上边的任意属性，否则会报：TypeError: Can not get Prototype on non ECMA Object
        // 所以这里需要捕获异常，防止报错
        return formatObject(arg as object, depth)
      } catch (e) {
        return {
          type: 'object',
          value: {
            properties: [],
          },
        }
      }
    case 'undefined':
      return formatUndefined()
    case 'function':
      return formatFunction(arg as Function)
    case 'symbol':
      if (__HARMONY__) {
        return formatUnknown('symbol', arg as unknown)
      } else {
        return formatSymbol(arg as symbol)
      }

    case 'bigint':
      return formatBigInt(arg as unknown)
  }
}

function formatFunction(value: Function): NormalizeResult {
  return {
    type: 'function',
    value: `function ${value.name}() {}`,
  }
}

function formatUndefined(): NormalizeResult {
  return {
    type: 'undefined',
  }
}

function formatBoolean(value: boolean): NormalizeResult {
  return {
    type: 'boolean',
    value: String(value),
  }
}

function formatNumber(value: number): NormalizeResult {
  return {
    type: 'number',
    value: String(value),
  }
}

function formatBigInt(value: unknown): NormalizeResult {
  return {
    type: 'bigint',
    value: String(value),
  }
}

function formatString(value: string): NormalizeResult {
  return {
    type: 'string',
    value,
  }
}

function formatSymbol(value: symbol): NormalizeResult {
  return {
    type: 'symbol',
    value: value.description,
  }
}

function formatUnknown(type: string, value: unknown): NormalizeResult {
  return {
    type,
    value: String(value),
  }
}

function formatObject(value: object, depth: number): NormalizeResult {
  if (value === null) {
    return {
      type: 'null',
    }
  }

  if (!__HARMONY__) {
    if (isComponentPublicInstance(value)) {
      return formatComponentPublicInstance(value, depth)
    }

    if (isComponentInternalInstance(value)) {
      return formatComponentInternalInstance(value, depth)
    }

    if (isUniElement(value)) {
      return formatUniElement(value, depth)
    }

    if (isCSSStyleDeclaration(value)) {
      return formatCSSStyleDeclaration(value, depth)
    }
  }

  if (Array.isArray(value)) {
    return {
      type: 'object',
      subType: 'array',
      value: {
        properties: value.map(
          (v: any | null, i: number): NormalizeResult =>
            formatArrayElement(v, i, depth + 1)
        ),
      },
    } as ArrayResult
  }
  if (value instanceof Set) {
    return {
      type: 'object',
      subType: 'set',
      className: 'Set',
      description: `Set(${value.size})`,
      value: {
        entries: Array.from(value).map(
          (v: any | null): SetResultEntry => formatSetEntry(v, depth + 1)
        ),
      },
    } as SetResult
  }
  if (value instanceof Map) {
    return {
      type: 'object',
      subType: 'map',
      className: 'Map',
      description: `Map(${value.size})`,
      value: {
        entries: Array.from(value.entries()).map(
          (v: Array<any | null>): MapResultEntry => formatMapEntry(v, depth + 1)
        ),
      },
    } as MapResult
  }

  if (value instanceof Promise) {
    return {
      type: 'object',
      subType: 'promise',
      value: {
        properties: [],
      },
    } as ObjectResult
  }
  if (value instanceof RegExp) {
    return {
      type: 'object',
      subType: 'regexp',
      value: String(value),
      className: 'Regexp',
    }
  }
  if (value instanceof Date) {
    return {
      type: 'object',
      subType: 'date',
      value: String(value),
      className: 'Date',
    }
  }
  if (value instanceof Error) {
    return {
      type: 'object',
      subType: 'error',
      value: value.message || String(value),
      className: value.name || 'Error',
    }
  }
  let className: string | undefined = undefined
  if (!__HARMONY__) {
    const constructor = value.constructor
    if (constructor) {
      // @ts-expect-error
      if (constructor.get$UTSMetadata$) {
        // @ts-expect-error
        className = constructor.get$UTSMetadata$().name
      }
    }
  }
  let entries = Object.entries(value)
  if (isHarmonyBuilderParams(value)) {
    entries = entries.filter(
      ([key]) => key !== 'modifier' && key !== 'nodeContent'
    )
  }
  return {
    type: 'object',
    className,
    value: {
      properties: entries.map(
        (entry: [string, any | null]): NormalizeResult =>
          formatObjectProperty(entry[0], entry[1], depth + 1)
      ),
    },
  } as ObjectResult
}

function isHarmonyBuilderParams(value: any) {
  return value.modifier && value.modifier._attribute && value.nodeContent
}

function isComponentPublicInstance(
  value: any
): value is ComponentPublicInstance {
  return value.$ && isComponentInternalInstance(value.$)
}

function isComponentInternalInstance(
  value: any
): value is ComponentInternalInstance {
  return value.type && value.uid != null && value.appContext
}

function formatComponentPublicInstance(
  value: ComponentPublicInstance,
  depth: number
) {
  return {
    type: 'object',
    className: 'ComponentPublicInstance',
    value: {
      properties: Object.entries(value.$.type).map(
        ([name, value]): NormalizeResult =>
          formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function formatComponentInternalInstance(
  value: ComponentInternalInstance,
  depth: number
) {
  return {
    type: 'object',
    className: 'ComponentInternalInstance',
    value: {
      properties: Object.entries(value.type).map(
        ([name, value]): NormalizeResult =>
          formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function isUniElement(value: any): value is UniElement {
  return value.style && value.tagName != null && value.nodeName != null
}

function formatUniElement(value: UniElement, depth: number) {
  return {
    type: 'object',
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value)
        .filter(([name]) =>
          [
            'id',
            'tagName',
            'nodeName',
            'dataset',
            'offsetTop',
            'offsetLeft',
            'style',
          ].includes(name)
        )
        .map(
          ([name, value]): NormalizeResult =>
            formatObjectProperty(name, value, depth + 1)
        ),
    },
  }
}

function isCSSStyleDeclaration(
  value: any
): value is CSSStyleDeclaration & { $styles: Record<string, string | null> } {
  return (
    typeof value.getPropertyValue === 'function' &&
    typeof value.setProperty === 'function' &&
    value.$styles
  )
}

function formatCSSStyleDeclaration(
  style: CSSStyleDeclaration & { $styles: Record<string, string | null> },
  depth: number
) {
  return {
    type: 'object',
    value: {
      properties: Object.entries(style.$styles).map(([name, value]) =>
        formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function formatObjectProperty(name: string, value: any | null, depth: number) {
  const result = formatArg(value, depth)
  result.name = name
  return result
}

function formatArrayElement(value: any | null, index: number, depth: number) {
  const result = formatArg(value, depth)
  result.name = `${index}`
  return result
}

function formatSetEntry(value: any | null, depth: number): SetResultEntry {
  return {
    value: formatArg(value, depth),
  }
}

function formatMapEntry(
  value: Array<any | null>,
  depth: number
): MapResultEntry {
  return {
    key: formatArg(value[0], depth),
    value: formatArg(value[1], depth),
  }
}
